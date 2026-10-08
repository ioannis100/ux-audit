#!/usr/bin/env node
// Android emulator/device toolkit for audit agents: a thin CLI over adb + emulator. No dependencies.
// SDK: $ANDROID_HOME, $ANDROID_SDK_ROOT or ~/Library/Android/sdk. Device: -s <serial>, $ANDROID_SERIAL,
// or the only one attached. Coordinates for tap/swipe are device PIXELS (dump gives px and dp).
//
// Devices   start [avd] [--port 5556] [--read-only] [--window] [--timeout 180]   stop   devices
//           Parallel agents on one AVD: EVERY instance needs --read-only, each its own --port (5554, 5556…),
//           then pass -s emulator-<port>. Each boot starts from the saved snapshot: nothing persists.
// Apps      install <apk>   launch <pkg> [activity]   open <url> [--pkg com.android.chrome]
//           chrome-setup | chrome-unsetup   (skip Chrome's first-run screens via the debug-app command line)
// Input     tap x y   tap-label <regex>   swipe x1 y1 x2 y2 [ms]   text "<text>"   key <KEYCODE|n>   wait <ms>
// Capture   screenshot <out.png>
//           record start <name> [--out dir]   mark <label>   record stop      (screenrecord, 180 s cap)
//           dump [out.json]                   (uiautomator → JSON nodes with px + dp bounds)
//           a11y-report [dump.json] [--out f] [--scope WebView] (live dump if no file; scope = subtree)
// Perf      jank <pkg> --do "swipe 540 1800 540 600 300" [--do …] [--out f]
//           (gfxinfo for hwui-drawn UI + SurfaceFlinger timestats per layer for Chrome/WebView/SurfaceView)
// Settings  settings show | font-scale <x> | reduce-motion on|off | dark on|off | reset
//           font-scale-check [--scales 1.0,2.0] [--out dir] [--name n] [--scope WebView]
//           NOTE: Chrome (tested: this image) does not apply Android font scale to web pages; use it on native apps
// Self-check: --selftest
//
// While a recording runs, every tap/swipe/text/key (and `mark`) is stamped into <name>.marks.json
// (host ms, and videoS on the video's timeline); `record stop` prints the capture-video-motion.mjs command
// with --marks. screenrecord writes frames only when the screen changes (VFR) and caps at 180 s.
import { execFileSync, spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { parseArgs } from "node:util";
import { fileURLToPath } from "node:url";

const SDK = [process.env.ANDROID_HOME, process.env.ANDROID_SDK_ROOT, path.join(os.homedir(), "Library/Android/sdk")]
  .find((p) => p && fs.existsSync(path.join(p, "platform-tools/adb")));
const ADB = SDK ? path.join(SDK, "platform-tools/adb") : "adb";
const EMU = SDK ? path.join(SDK, "emulator/emulator") : "emulator";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const MIN_DP = 48; // Android touch-target minimum (Material / Accessibility Scanner)

// ---------- pure parsing (covered by --selftest) ----------
const ENT = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" };
const unescape = (s) => s.replace(/&(#x?[0-9a-f]+|\w+);/gi, (m, e) =>
  e[0] === "#" ? String.fromCodePoint(e[1] === "x" ? parseInt(e.slice(2), 16) : +e.slice(1)) : ENT[e] ?? m);

export function parseDump(xml, density) {
  const k = 160 / density, nodes = [], stack = [];
  for (const m of xml.matchAll(/<(\/?)node\b([^>]*?)(\/?)>/g)) {
    if (m[1]) { stack.pop(); continue; }
    const a = {};
    for (const [, key, v] of m[2].matchAll(/([\w-]+)="([^"]*)"/g)) a[key] = unescape(v);
    const b = (a.bounds.match(/-?\d+/g) || [0, 0, 0, 0]).map(Number);
    const n = {
      i: nodes.length, parent: stack.at(-1) ?? null, depth: stack.length,
      class: a.class, text: a.text || "", desc: a["content-desc"] || "", hint: a.hint || "",
      id: a["resource-id"] || "", pkg: a.package,
      clickable: a.clickable === "true", longClickable: a["long-clickable"] === "true",
      checkable: a.checkable === "true", checked: a.checked === "true", focusable: a.focusable === "true",
      enabled: a.enabled !== "false", scrollable: a.scrollable === "true", password: a.password === "true",
      px: b, dp: { x: Math.round(b[0] * k), y: Math.round(b[1] * k), w: Math.round((b[2] - b[0]) * k), h: Math.round((b[3] - b[1]) * k) },
    };
    nodes.push(n);
    if (!m[3]) stack.push(n.i);
  }
  return nodes;
}

// TalkBack reads a node's own text/content-desc; a clickable container with neither speaks its
// non-focusable descendants' text. Same approximation here.
export function labelOf(nodes, n) {
  const own = n.desc || n.text || n.hint;
  if (own) return own.trim();
  const parts = [];
  for (let j = n.i + 1; j < nodes.length && nodes[j].depth > n.depth; j++) {
    const c = nodes[j];
    if (c.clickable || c.focusable) { // skip a separately focusable subtree
      const d = c.depth; while (j + 1 < nodes.length && nodes[j + 1].depth > d) j++; continue;
    }
    if (c.desc || c.text) parts.push((c.desc || c.text).trim());
  }
  return parts.join(" ").trim();
}

export function subtree(nodes, re) { // [first, end) index range of the first node matching class/id/label
  const r = nodes.find((n) => re.test(n.class) || re.test(n.id) || re.test(n.text) || re.test(n.desc));
  if (!r) throw new Error(`--scope /${re.source}/ matched no node`);
  let e = r.i + 1; while (e < nodes.length && nodes[e].depth > r.depth) e++;
  return [r.i, e];
}

export function a11yReport(nodes, screen, range = [0, nodes.length]) {
  const [W, H] = screen || [nodes[0]?.px[2], nodes[0]?.px[3]];
  const onScreen = (n) => n.i >= range[0] && n.i < range[1] && n.px[2] > n.px[0] && n.px[3] > n.px[1] && n.px[2] > 0 && n.px[3] > 0 && n.px[0] < W && n.px[1] < H;
  const act = nodes.filter((n) => (n.clickable || n.longClickable || n.checkable) && n.enabled && onScreen(n))
    .map((n) => ({ i: n.i, class: n.class, id: n.id, label: labelOf(nodes, n), dp: n.dp, px: n.px }));
  const unlabelled = act.filter((a) => !a.label);
  // uiautomator clips bounds to the visible area: a node touching the viewport's top/bottom edge is cut, not small
  const vp = nodes[range[0]].px, cut = (a) => a.px[1] <= vp[1] + 2 || a.px[3] >= Math.min(vp[3], H) - 2;
  const small = act.filter((a) => (a.dp.w < MIN_DP || a.dp.h < MIN_DP) && !cut(a));
  const byLabel = {};
  for (const a of act) if (a.label) (byLabel[a.label.toLowerCase()] ??= []).push(a.i);
  const duplicates = Object.entries(byLabel).filter(([, v]) => v.length > 1).map(([label, ids]) => ({ label, count: ids.length, nodes: ids }))
    .sort((a, b) => b.count - a.count);
  const focusOrder = nodes.filter((n) => (n.focusable || n.clickable) && onScreen(n))
    .map((n) => ({ i: n.i, label: labelOf(nodes, n) || "(unlabelled)", class: n.class.split(".").pop(), dp: n.dp }));
  return { counts: { actionable: act.length, unlabelled: unlabelled.length, smallTargets: small.length, duplicateLabels: duplicates.length, focusStops: focusOrder.length },
    unlabelled, smallTargets: small, duplicates, focusOrder };
}

export function parseGfx(txt) {
  return txt.split(/\*\* Graphics info for pid /).slice(1).map((blk) => {
    const num = (re) => { const m = blk.match(re); return m ? +m[1] : null; };
    return {
      pid: num(/^(\d+)/), process: (blk.match(/\[([^\]]+)\]/) || [])[1],
      totalFrames: num(/Total frames rendered: (\d+)/), jankyFrames: num(/Janky frames: (\d+)/),
      jankyPct: num(/Janky frames: \d+ \(([\d.]+)%\)/),
      p50: num(/^50th percentile: (\d+)ms/m), p90: num(/^90th percentile: (\d+)ms/m),
      p95: num(/^95th percentile: (\d+)ms/m), p99: num(/^99th percentile: (\d+)ms/m),
      missedVsync: num(/Number Missed Vsync: (\d+)/), slowUi: num(/Number Slow UI thread: (\d+)/),
      deadlineMissed: num(/Number Frame deadline missed: (\d+)/),
    };
  });
}

// SurfaceFlinger per-layer timestats: the only frame data for content hwui never draws (Chrome/WebView web
// content, games, video: gfxinfo reports 0 frames for them). Frames are present-to-present intervals.
// ponytail: intervals >= 200 ms are counted as idle gaps between gestures, not jank; a real 200 ms+ stall
// mid-scroll lands there too, so read idleGaps next to the recording.
export function parseSF(txt, pkg) {
  return txt.split(/^layerName = /m).slice(1).filter((b) => b.split("\n")[0].includes(pkg)).map((b) => {
    const num = (re) => { const m = b.match(re); return m ? +m[1] : null; };
    const hist = (b.match(/present2present histogram is as below:\n(.*)/) || [])[1] || "";
    const bins = [...hist.matchAll(/(\d+)ms=(\d+)/g)].map((m) => [+m[1], +m[2]]).filter(([, c]) => c);
    const moving = bins.filter(([ms]) => ms < 200), n = moving.reduce((s, [, c]) => s + c, 0);
    const pct = (q) => { let acc = 0; for (const [ms, c] of moving) if ((acc += c) >= q * n) return ms; return null; };
    const vsync = 1000 / (num(/displayRefreshRate = (\d+)/) || 60), slow = moving.filter(([ms]) => ms > 1.5 * vsync).reduce((s, [, c]) => s + c, 0);
    return { layer: b.split("\n")[0].trim(), totalFrames: num(/totalFrames = (\d+)/), droppedFrames: num(/droppedFrames = (\d+)/),
      averageFPS: num(/averageFPS = ([\d.]+)/), intervals: n, slowPct: n ? +(100 * slow / n).toFixed(1) : null,
      p50: pct(0.5), p90: pct(0.9), p95: pct(0.95), p99: pct(0.99), idleGaps: bins.filter(([ms]) => ms >= 200).reduce((s, [, c]) => s + c, 0) };
  }).filter((l) => l.totalFrames);
}

// Compare text nodes between two font scales. Text is the key (first occurrence).
export function fontScaleDiff(base, big, screenH, inA = () => true, inB = () => true) {
  const texts = (ns, keep) => { const m = new Map(); for (const n of ns) { if (!keep(n)) continue; const t = (n.text || n.desc).trim(); if (t && !m.has(t)) m.set(t, n); } return m; };
  const A = texts(base, inA), B = texts(big, inB), out = { responded: null, ellipsised: [], notGrown: [], vanished: [], overlaps: [] };
  const vis = (n) => n.px[3] > 0 && n.px[1] < screenH && n.px[3] > n.px[1];
  const cut = (n) => { // clipped by the bottom/top of its scrolling container (uiautomator clips bounds)
    let p = n.parent; while (p != null && !big[p].scrollable) p = big[p].parent;
    const c = p == null ? [0, 0, 0, screenH] : big[p].px;
    return n.px[3] >= c[3] - 2 || n.px[1] <= c[1] + 2;
  };
  for (const [t, a] of A) {
    if (!vis(a)) continue;
    const b = B.get(t);
    if (!b) { out.vanished.push({ text: t, dp: a.dp }); continue; }
    if (/(…|\.\.\.)$/.test(t) === false && [...B.keys()].some((k) => k !== t && /(…|\.\.\.)$/.test(k) && t.startsWith(k.replace(/(…|\.\.\.)$/, "")))) out.ellipsised.push({ text: t });
    // text that wraps or grows at 2× must get taller; a box that did not grow is clipped/single-line truncated
    if (a.text && vis(b) && !cut(b) && a.dp.h >= 8 && b.dp.h < a.dp.h * 1.25) out.notGrown.push({ text: t, h1: a.dp.h, h2: b.dp.h, w2: b.dp.w });
  }
  for (const [k] of B) if (/(…|\.\.\.)$/.test(k) && !A.has(k)) out.ellipsised.push({ text: k });
  const both = [...A].filter(([t, a]) => a.text && vis(a) && B.has(t) && a.dp.h >= 8);
  // share of text boxes that got taller: ~0% means the app (or Chrome for web pages) ignores the font scale
  out.responded = both.length ? Math.round(100 * both.filter(([t, a]) => B.get(t).dp.h >= a.dp.h * 1.25).length / both.length) : null;
  const tb = [...B.values()].filter((n) => n.text && vis(n) && inB(n));
  const inter = (p, q) => Math.max(0, Math.min(p[2], q[2]) - Math.max(p[0], q[0])) * Math.max(0, Math.min(p[3], q[3]) - Math.max(p[1], q[1]));
  const area = (p) => (p[2] - p[0]) * (p[3] - p[1]);
  const anc = (ns, x, y) => { for (let p = ns[y].parent; p != null; p = ns[p].parent) if (p === x) return true; return false; };
  for (let x = 0; x < tb.length; x++) for (let y = x + 1; y < tb.length; y++) {
    const p = tb[x], q = tb[y], o = inter(p.px, q.px);
    if (o > 0.2 * Math.min(area(p.px), area(q.px)) && !anc(big, p.i, q.i) && !anc(big, q.i, p.i)) {
      const a1 = A.get(p.text.trim()), a2 = A.get(q.text.trim());
      if (!(a1 && a2 && inter(a1.px, a2.px) > 0)) out.overlaps.push({ a: p.text, b: q.text });
    }
  }
  return out;
}

// ---------- device plumbing ----------
let SERIAL = process.env.ANDROID_SERIAL;
const adbRaw = (args, opt = {}) => execFileSync(ADB, args, { encoding: opt.buffer ? null : "utf8", maxBuffer: 1 << 28, stdio: ["ignore", "pipe", opt.quiet ? "ignore" : "pipe"] });
const adb = (...args) => adbRaw(["-s", serial(), ...args]);
const sh = (cmd) => adb("shell", cmd).trim();
function listDevices() {
  return adbRaw(["devices"]).split("\n").slice(1).map((l) => l.split(/\s+/)).filter((p) => p[1] === "device").map((p) => p[0]);
}
function serial() {
  if (SERIAL) return SERIAL;
  const d = listDevices();
  if (d.length !== 1) throw new Error(d.length ? `several devices (${d.join(", ")}): pass -s <serial>` : "no device: run `start` first");
  return (SERIAL = d[0]);
}
const density = () => { const o = sh("wm density"); return +((o.match(/Override density: (\d+)/) || o.match(/Physical density: (\d+)/))[1]); };
const screenPx = () => sh("wm size").match(/(\d+)x(\d+)\s*$/).slice(1).map(Number);
const STATE = () => path.join(os.tmpdir(), `ux-native-android-${serial()}.json`);
const state = () => { try { return JSON.parse(fs.readFileSync(STATE(), "utf8")); } catch { return {}; } };
const save = (s) => fs.writeFileSync(STATE(), JSON.stringify(s, null, 1));
function mark(label) {
  const s = state();
  if (!s.rec) return;
  s.rec.marks.push({ label, ms: Date.now() - s.rec.startedAt });
  save(s);
}

async function dumpXml() {
  for (let tries = 0; tries < 4; tries++) { // "could not get idle state" while something animates
    try {
      const o = sh("uiautomator dump /sdcard/ux-dump.xml");
      if (/dumped to/i.test(o)) return adb("exec-out", "cat /sdcard/ux-dump.xml");
    } catch {}
    await sleep(700);
  }
  throw new Error("uiautomator dump failed 4× (screen never idle?)");
}
async function dump(out) {
  const d = density(), nodes = parseDump(await dumpXml(), d), res = { serial: serial(), density: d, screenPx: screenPx(), at: new Date().toISOString(), nodes };
  if (out) { fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true }); fs.writeFileSync(out, JSON.stringify(res, null, 1)); }
  return res;
}

const SETTINGS = { font_scale: ["system", "1.0"], animator_duration_scale: ["global", "1.0"], transition_animation_scale: ["global", "1.0"], window_animation_scale: ["global", "1.0"] };
const getS = (k) => { const v = sh(`settings get ${SETTINGS[k][0]} ${k}`); return v === "null" ? SETTINGS[k][1] : v; };
function putS(k, v) {
  const s = state();
  s.orig ??= {};
  if (!(k in s.orig)) s.orig[k] = getS(k); // remember the first value we overwrote
  save(s);
  sh(`settings put ${SETTINGS[k][0]} ${k} ${v}`);
}
function night(on) {
  const s = state();
  s.orig ??= {};
  if (!("night" in s.orig)) s.orig.night = /yes/.test(sh("cmd uimode night")) ? "yes" : "no";
  save(s);
  sh(`cmd uimode night ${on}`);
}
function settingsShow() {
  return { ...Object.fromEntries(Object.keys(SETTINGS).map((k) => [k, getS(k)])), night: sh("cmd uimode night") };
}

// ---------- commands ----------
async function cmd(argv) {
  const { values: o, positionals: p } = parseArgs({ args: argv, allowPositionals: true, strict: false,
    options: { serial: { type: "string", short: "s" }, port: { type: "string" }, "read-only": { type: "boolean" }, window: { type: "boolean" },
      timeout: { type: "string" }, out: { type: "string" }, pkg: { type: "string" }, do: { type: "string", multiple: true },
      scales: { type: "string" }, scope: { type: "string" }, name: { type: "string" } } });
  if (o.serial) SERIAL = o.serial;
  const [c, ...a] = p;
  const log = (x) => console.log(typeof x === "string" ? x : JSON.stringify(x, null, 1));
  switch (c) {
    case "devices": return log(adbRaw(["devices", "-l"]).trim());
    case "start": {
      const avd = a[0] || execFileSync(EMU, ["-list-avds"], { encoding: "utf8" }).trim().split("\n")[0];
      const port = o.port || "5554", args = ["-avd", avd, "-port", port, "-no-snapshot-save", "-no-boot-anim", "-no-audio"];
      if (!o.window) args.push("-no-window");
      if (o["read-only"]) args.push("-read-only");
      const logf = path.join(os.tmpdir(), `ux-emulator-${port}.log`);
      spawn(EMU, args, { detached: true, stdio: ["ignore", fs.openSync(logf, "w"), fs.openSync(logf, "a")] }).unref();
      SERIAL = `emulator-${port}`;
      const t0 = Date.now(), limit = +(o.timeout || 180) * 1000;
      while (Date.now() - t0 < limit) {
        const fatal = fs.readFileSync(logf, "utf8").match(/^(FATAL|ERROR).*$/m);
        if (fatal) throw new Error(`emulator: ${fatal[0].replace(/\s+/g, " ")}`);
        try { if (sh("getprop sys.boot_completed") === "1") { sh("input keyevent KEYCODE_WAKEUP"); sh("wm dismiss-keyguard"); return log(`${SERIAL} booted in ${Math.round((Date.now() - t0) / 1000)} s (log ${logf})`); } } catch {}
        await sleep(2000);
      }
      throw new Error(`boot timed out; see ${logf}`);
    }
    case "stop": adb("emu", "kill"); return log(`stopped ${serial()}`);
    case "install": return log(adb("install", "-r", "-g", a[0]).trim());
    case "launch": return log(a[1] ? sh(`am start -W -n ${a[0]}/${a[1]}`) : sh(`monkey -p ${a[0]} -c android.intent.category.LAUNCHER 1`));
    case "open": // the application_id extra makes Chrome reuse one tab instead of opening a new tab per call
      mark(`open ${a[0]}`);
      return log(sh(`am start -W -a android.intent.action.VIEW -d '${a[0]}'${o.pkg ? ` -p ${o.pkg} --es com.android.browser.application_id ux-audit` : ""}`));
    case "chrome-setup": // Chrome reads this file only for the debug app; it skips the FRE (no sign-in, no terms screen)
      sh("echo 'chrome --disable-fre --no-default-browser-check --no-first-run --force-renderer-accessibility --disable-features=SigninPromo' > /data/local/tmp/chrome-command-line");
      sh("am set-debug-app --persistent com.android.chrome"); sh("am force-stop com.android.chrome");
      return log("chrome: first-run skipped (undo: chrome-unsetup)");
    case "chrome-unsetup": sh("am clear-debug-app"); sh("rm -f /data/local/tmp/chrome-command-line"); return log("chrome: debug-app cleared");
    case "tap": mark(`tap ${a[0]} ${a[1]}`); return sh(`input tap ${a[0]} ${a[1]}`);
    case "tap-label": { // first node whose TalkBack label matches the regex (clickable ones first)
      const { nodes } = await dump(), re = new RegExp(a.join(" "), "i");
      const hits = nodes.filter((n) => n.px[2] > n.px[0] && re.test(labelOf(nodes, n))).sort((x, y) => y.clickable - x.clickable);
      if (!hits.length) throw new Error(`no node labelled /${re.source}/`);
      const [l, t, r, b] = hits[0].px, x = (l + r) >> 1, y = (t + b) >> 1;
      mark(`tap-label ${a.join(" ")}`); sh(`input tap ${x} ${y}`);
      return log(`tapped "${labelOf(nodes, hits[0]).slice(0, 60)}" at ${x},${y}`);
    }
    case "swipe": mark(`swipe ${a.join(" ")}`); return sh(`input swipe ${a[0]} ${a[1]} ${a[2]} ${a[3]} ${a[4] || 300}`);
    case "text": mark(`text`); return sh(`input text '${a.join(" ").replace(/'/g, "").replace(/ /g, "%s")}'`);
    case "key": mark(`key ${a[0]}`); return sh(`input keyevent ${/^\d+$/.test(a[0]) ? a[0] : a[0].replace(/^(KEYCODE_)?/, "KEYCODE_")}`);
    case "wait": return sleep(+a[0]);
    case "mark": return mark(a.join(" "));
    case "screenshot": {
      fs.mkdirSync(path.dirname(path.resolve(a[0])), { recursive: true });
      fs.writeFileSync(a[0], adbRaw(["-s", serial(), "exec-out", "screencap", "-p"], { buffer: true }));
      return log(a[0]);
    }
    case "record": {
      const s = state();
      if (a[0] === "start") {
        if (s.rec) throw new Error(`already recording ${s.rec.name}; run record stop`);
        const name = a[1] || "rec", remote = `/sdcard/ux-${name}.mp4`;
        const child = spawn(ADB, ["-s", serial(), "shell", "screenrecord", "--time-limit", "180", "--bit-rate", "8000000", remote], { detached: true, stdio: "ignore" });
        child.unref();
        const startedAt = Date.now();
        let videoStartMs = null; // host ms when screenrecord is up on the device ≈ video t=0
        for (let i = 0; i < 60 && videoStartMs == null; i++) { try { sh("pidof screenrecord"); videoStartMs = Date.now() - startedAt; } catch { await sleep(30); } }
        s.rec = { name, remote, out: path.resolve(o.out || "."), startedAt, videoStartMs, marks: [] };
        save(s);
        await sleep(400); // let the encoder emit its first frame before the first action
        return log(`recording ${name} (max 180 s)`);
      }
      if (a[0] === "stop") {
        if (!s.rec) throw new Error("not recording");
        const r = s.rec, stoppedMs = Date.now() - r.startedAt;
        try { sh("pkill -INT screenrecord"); } catch {}
        for (let i = 0; i < 20; i++) { try { sh("pidof screenrecord"); await sleep(300); } catch { break; } }
        await sleep(500);
        fs.mkdirSync(r.out, { recursive: true });
        const mp4 = path.join(r.out, `${r.name}.mp4`);
        adb("pull", r.remote, mp4); sh(`rm -f ${r.remote}`);
        const v0 = r.videoStartMs ?? 300, marks = r.marks.map((m) => ({ ...m, videoS: +((m.ms - v0) / 1000).toFixed(3) }));
        fs.writeFileSync(path.join(r.out, `${r.name}.marks.json`), JSON.stringify({ video: `${r.name}.mp4`,
          clock: "ms = host ms since record start; videoS = seconds on the video timeline (ms - videoStartMs)", videoStartMs: v0, stoppedMs, marks }, null, 1));
        delete s.rec; save(s);
        if (stoppedMs > 179000) console.error("warning: hit screenrecord's 180 s limit; the end is missing");
        log(mp4);
        return log(`analyse: node ${path.join(path.dirname(fileURLToPath(import.meta.url)), "capture-video-motion.mjs")} ${mp4} --name ${r.name} --out ${r.out}${marks.length ? ` --marks ${marks.map((m) => m.videoS).join(",")}` : ""}`);
      }
      throw new Error("record start <name> | record stop");
    }
    case "dump": { const d = await dump(a[0]); return log(`${d.nodes.length} nodes, density ${d.density}${a[0] ? ` → ${a[0]}` : ""}`); }
    case "a11y-report": {
      const d = a[0] ? JSON.parse(fs.readFileSync(a[0], "utf8")) : await dump();
      const r = a11yReport(d.nodes, d.screenPx, o.scope ? subtree(d.nodes, new RegExp(o.scope, "i")) : undefined);
      if (o.out) fs.writeFileSync(o.out, JSON.stringify(r, null, 1));
      log(r.counts);
      for (const u of r.unlabelled.slice(0, 15)) log(`UNLABELLED ${u.class} ${u.id} ${u.dp.w}×${u.dp.h}dp @${u.dp.x},${u.dp.y}`);
      for (const t of r.smallTargets.slice(0, 15)) log(`SMALL ${t.dp.w}×${t.dp.h}dp "${t.label.slice(0, 50)}"`);
      for (const x of r.duplicates.slice(0, 10)) log(`DUPLICATE ×${x.count} "${x.label.slice(0, 60)}"`);
      return;
    }
    case "jank": {
      const pkg = a[0];
      sh(`dumpsys gfxinfo ${pkg} reset`); sh("dumpsys SurfaceFlinger --timestats -enable -clear");
      for (const step of o.do || []) await cmd(step.match(/"[^"]*"|\S+/g).map((x) => x.replace(/^"|"$/g, "")).concat(o.serial ? ["-s", o.serial] : []));
      await sleep(500);
      const raw = sh(`dumpsys gfxinfo ${pkg}`), procs = parseGfx(raw), sfRaw = sh("dumpsys SurfaceFlinger --timestats -dump"), layers = parseSF(sfRaw, pkg);
      sh("dumpsys SurfaceFlinger --timestats -disable");
      if (o.out) { fs.writeFileSync(o.out, JSON.stringify({ pkg, actions: o.do || [], gfxinfo: procs, surfaceflinger: layers }, null, 1)); fs.writeFileSync(o.out.replace(/\.json$/, "") + ".txt", raw + "\n\n" + sfRaw); }
      return log({ gfxinfo: procs, surfaceflinger: layers });
    }
    case "settings": {
      const [what, v] = a;
      if (what === "font-scale") putS("font_scale", v);
      else if (what === "reduce-motion") for (const k of Object.keys(SETTINGS).slice(1)) putS(k, v === "off" ? "1.0" : "0");
      else if (what === "dark") night(v === "off" ? "no" : "yes");
      else if (what === "reset") {
        const s = state(), orig = s.orig || {};
        for (const k of Object.keys(SETTINGS)) sh(`settings put ${SETTINGS[k][0]} ${k} ${orig[k] ?? SETTINGS[k][1]}`);
        sh(`cmd uimode night ${orig.night || "no"}`);
        delete s.orig; save(s);
      } else if (what !== "show") throw new Error("settings show | font-scale <x> | reduce-motion on|off | dark on|off | reset");
      return log(settingsShow());
    }
    case "font-scale-check": {
      const scales = (o.scales || "1.0,2.0").split(","), out = o.out || ".", name = o.name || "font", H = screenPx()[1], dumps = [];
      const was = getS("font_scale");
      try {
        for (const sc of scales) {
          putS("font_scale", sc); await sleep(2500);
          const d = await dump(path.join(out, `${name}-${sc}.json`));
          await cmd(["screenshot", path.join(out, `${name}-${sc}.png`)]);
          dumps.push(d);
        }
      } finally { sh(`settings put system font_scale ${was}`); }
      const sc = (d) => { if (!o.scope) return () => true; const [lo, hi] = subtree(d.nodes, new RegExp(o.scope, "i")); return (n) => n.i >= lo && n.i < hi; };
      const r = fontScaleDiff(dumps[0].nodes, dumps.at(-1).nodes, H, sc(dumps[0]), sc(dumps.at(-1)));
      fs.writeFileSync(path.join(out, `${name}-check.json`), JSON.stringify({ scales, ...r }, null, 1));
      return log({ respondedPct: r.responded, ellipsised: r.ellipsised.length, notGrown: r.notGrown.length, vanished: r.vanished.length, overlaps: r.overlaps.length, file: path.join(out, `${name}-check.json`) });
    }
    default:
      console.log(fs.readFileSync(new URL(import.meta.url), "utf8").split("\nimport ")[0].replace(/^#!.*\n/, "").replace(/^\/\/ ?/gm, ""));
  }
}

function selftest() {
  const xml = `<?xml version='1.0' ?><hierarchy rotation="0"><node index="0" text="" resource-id="" class="android.widget.FrameLayout" package="p" content-desc="" clickable="false" focusable="false" enabled="true" bounds="[0,0][1080,2400]">` +
    `<node index="0" text="" resource-id="p:id/fab" class="android.widget.ImageButton" package="p" content-desc="" clickable="true" focusable="true" enabled="true" bounds="[0,100][105,205]" />` +
    `<node index="1" text="" resource-id="" class="android.widget.LinearLayout" package="p" content-desc="" clickable="true" focusable="true" enabled="true" bounds="[0,200][1080,400]"><node index="0" text="Tom &amp; Jerry" class="android.widget.TextView" package="p" content-desc="" clickable="false" focusable="false" enabled="true" bounds="[10,210][500,260]" /></node>` +
    `<node index="2" text="Add one" class="android.widget.Button" package="p" content-desc="" clickable="true" focusable="true" enabled="true" bounds="[0,500][300,700]" />` +
    `<node index="3" text="" class="android.widget.Button" package="p" content-desc="Add one" clickable="true" focusable="true" enabled="true" bounds="[0,800][300,1000]" /></node></hierarchy>`;
  const n = parseDump(xml, 420), assert = (c, m) => { if (!c) { console.error("FAIL", m); process.exit(1); } };
  assert(n.length === 6 && n[3].parent === 2 && n[3].depth === 2 && n[4].parent === 0, "tree");
  assert(n[1].dp.w === 40 && n[3].text === "Tom & Jerry", "dp + entities");
  const r = a11yReport(n, [1080, 2400]);
  assert(r.counts.actionable === 4 && r.unlabelled.length === 1 && r.unlabelled[0].id === "p:id/fab", "unlabelled");
  assert(a11yReport(n, [1080, 2400], subtree(n, /LinearLayout/)).counts.actionable === 1, "scope");
  assert(r.smallTargets.length === 1 && r.duplicates[0].count === 2 && r.focusOrder[1].label === "Tom & Jerry", "targets/dupes/inherited label");
  const g = parseGfx("** Graphics info for pid 42 [com.x] **\nTotal frames rendered: 200\nJanky frames: 30 (15.00%)\n50th percentile: 8ms\n90th percentile: 21ms\n95th percentile: 30ms\n99th percentile: 65ms\nNumber Missed Vsync: 3\n");
  assert(g[0].totalFrames === 200 && g[0].jankyPct === 15 && g[0].p99 === 65 && g[0].process === "com.x", "gfx");
  const sf = parseSF("layerName = SurfaceView[com.x/A](BLAST)#1\ntotalFrames = 100\ndroppedFrames = 2\ndisplayRefreshRate = 60 fps\naverageFPS = 50.5\npresent2present histogram is as below:\n16ms=80 17ms=10 33ms=9 500ms=1\nlatch2present histogram is as below:\n1ms=99\nlayerName = Other#2\ntotalFrames = 5\n", "com.x");
  assert(sf.length === 1 && sf[0].intervals === 99 && sf[0].p50 === 16 && sf[0].p95 === 33 && sf[0].slowPct === 9.1 && sf[0].idleGaps === 1, "surfaceflinger");
  const big = parseDump(xml.replace("[10,210][500,260]", "[10,210][500,262]").replace('text="Add one"', 'text="Add o…"'), 420);
  const f = fontScaleDiff(n, big, 2400);
  assert(f.notGrown.some((x) => x.text === "Tom & Jerry") && f.vanished.some((x) => x.text === "Add one" ) === false && f.ellipsised.some((x) => x.text === "Add o…") && f.responded === 0, "font diff");
  console.log("selftest PASS (tree, dp, labels, targets, duplicates, gfxinfo, surfaceflinger, font-scale diff)");
}

if (process.argv[1] && fs.realpathSync(process.argv[1]) === fs.realpathSync(fileURLToPath(import.meta.url)))
  (process.argv[2] === "--selftest" ? Promise.resolve(selftest()) : cmd(process.argv.slice(2))).catch((e) => { console.error(String(e.stderr || e.message || e).trim()); process.exit(1); });
