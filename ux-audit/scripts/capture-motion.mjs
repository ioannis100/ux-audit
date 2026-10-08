// Record one interaction or navigation and measure how it moves: first feedback, duration,
// hard cuts, approximate easing, long frames, and which CSS/WAAPI animations ran.
//
// Run from the audit folder, where puppeteer-core is installed (no other dependencies):
//   node <skill>/scripts/capture-motion.mjs <url> "<css selector>"|"js:<code>" [name] [--reduced] [--out dir]
//   node <skill>/scripts/capture-motion.mjs spec.json          # several captures, see below
//   node <skill>/scripts/capture-motion.mjs --selftest         # checks the analysis on synthetic frames
//
// spec.json: { "out": "evidence/motion", "viewport": {"width":390,"height":844}, "ua": "...",
//   "cpu": 1, "alsoReduced": false, "captures": [ { "name": "home-to-menu", "url": "https://…",
//   "setup": [steps], "action": step | [steps], "record": 2500 } ] }
// A step is one of {goto:url} {click:css} {clickText:regex} {tap:[x,y]} {js:code} {key:"Escape"} {wait:ms}.
// Interruptible? Use an action list such as [{clickText:"^Item$"}, {wait:100}, {tap:[195,80]}].
// Each capture runs in a fresh browser context: goto url (+3.5 s), setup steps, then the action is
// recorded with the CDP screencast (frames arrive only when the screen changes) plus an in-page
// rAF logger. Clicks are real mouse events (down, 50 ms, up), so pressed states show.
//
// FRAMES=1 also dumps every frame as <out>/<name>-frames/<ms>.jpg (ms after the action; negative = before).
// ONLY=<regex> runs only the captures whose name matches.
// Writes <out>/<name>.json and <out>/<name>-filmstrip.png (10 frames, labelled +ms after the
// action; red label = hard-cut frame). JSON fields: firstChangeMs, settledMs, motionMs, hardCut
// (a cut over > 25% of the screen), cuts[] (one frame carries >= 70% of the change across +-150 ms
// and is not a scroll/slide), blank[] / blankMs (near-uniform frames = flash or hole), segments[] (bursts of change split by >120 ms of stillness: startMs, endMs, fps, changedPct,
// cut, easing, profile = progress at 10%…100% of the segment), longFrames (rAF gaps > 50 ms),
// animations[] (document.getAnimations(): duration, easing, props, layoutProps), steps[] ([ms,
// % pixels changed vs previous frame]). Read it with references/motion.md → "Transitions and
// motion audit". Numbers come from a desktop Chrome: pass "cpu": 4 to approximate a mid phone.
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { analyze, selftest, longFrames, filmstripPicks, composeFilmstrip, W, CELL } from "./lib/motion-analysis.mjs";

const IPHONE = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const round = (x) => Math.round(x);

// ---------- browser side ----------
const LOGGER = `(() => { const seen = new WeakSet(); window.__mo = { raf: [], anims: [] };
  const LAYOUT = /^(width|height|top|left|right|bottom|inset|margin|padding|max-height|max-width|min-height)/;
  const tick = () => { const now = performance.timeOrigin + performance.now(); __mo.raf.push(now);
    try { for (const a of document.getAnimations()) { if (seen.has(a)) continue; seen.add(a);
      const e = a.effect, t = e?.getTiming?.() || {}, kf = e?.getKeyframes?.() || [], tg = e?.target;
      const props = [...new Set(kf.flatMap((k) => Object.keys(k)))].filter((k) => !/^(offset|easing|composite|computedOffset)$/.test(k));
      const cls = tg && typeof tg.className === "string" ? "." + tg.className.trim().split(/\\s+/).slice(0, 3).join(".") : "";
      __mo.anims.push({ at: now, kind: a.constructor.name, name: a.animationName || a.transitionProperty || a.id || "",
        target: (tg?.tagName || "").toLowerCase() + cls, pseudo: e?.pseudoElement || "", duration: t.duration, delay: t.delay,
        easing: t.easing && t.easing !== "linear" ? t.easing : kf[0]?.easing || "linear", iterations: t.iterations,
        props, layoutProps: props.some((p) => LAYOUT.test(p.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase()))) }); } } catch {}
    requestAnimationFrame(tick); };
  requestAnimationFrame(tick); })();`;

async function locate(page, step) {
  const r = await page.evaluate((sel, re) => {
    const el = sel ? document.querySelector(sel) : [...document.querySelectorAll("button,a,[role=button],[role=tab],[role=option],h2,h3,h4,label")]
      .find((e) => new RegExp(re, "i").test((e.innerText || e.getAttribute("aria-label") || "").trim()));
    if (!el) return null;
    el.scrollIntoView({ block: "center", behavior: "instant" });
    const b = el.getBoundingClientRect();
    return { x: b.x + b.width / 2, y: b.y + b.height / 2, label: (el.innerText || el.getAttribute("aria-label") || "").trim().slice(0, 40) };
  }, step.click || null, step.clickText || null);
  if (!r) throw new Error(`not found: ${step.click || step.clickText}`);
  return r;
}
async function run(page, step, pre) {
  if (step.goto) await page.goto(step.goto, { waitUntil: "load", timeout: 25000 }).catch(() => {});
  if (step.click || step.clickText) { const p = pre || (await locate(page, step)); await page.mouse.click(p.x, p.y, { delay: 50 }); }
  if (step.js) await page.evaluate(`(async () => { ${step.js} })()`);
  if (step.tap) await page.mouse.click(step.tap[0], step.tap[1], { delay: 50 });
  if (step.key) await page.keyboard.press(step.key);
  if (step.wait) await sleep(step.wait);
}

async function capture(browser, spec, c, reduced, out) {
  const name = c.name + (reduced ? "-reduced" : "");
  const vp = spec.viewport || { width: 390, height: 844 };
  const ctx = await browser.createBrowserContext();
  const page = await ctx.newPage();
  await page.setViewport({ ...vp, deviceScaleFactor: 2, isMobile: vp.width < 800, hasTouch: vp.width < 800 });
  await page.setUserAgent(spec.ua || (vp.width < 800 ? IPHONE : (await browser.userAgent()).replace("Headless", "")));
  if (reduced) await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.evaluateOnNewDocument(LOGGER);
  const cdp = await page.createCDPSession();
  if (spec.cpu > 1) await cdp.send("Emulation.setCPUThrottlingRate", { rate: spec.cpu });
  await run(page, { goto: c.url, wait: 3500 });
  for (const s of c.setup || []) await run(page, s);
  const actions = [].concat(c.action);
  const pre = actions[0].click || actions[0].clickText ? await locate(page, actions[0]) : null;
  await sleep(400);
  const shots = [];
  cdp.on("Page.screencastFrame", (f) => { shots.push({ t: f.metadata.timestamp * 1000, data: f.data }); cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }).catch(() => {}); });
  await cdp.send("Page.startScreencast", { format: "jpeg", quality: 70, maxWidth: vp.width, maxHeight: vp.height, everyNthFrame: 1 });
  await sleep(600);
  await page.evaluate(() => { __mo.raf = []; __mo.anims = []; }).catch(() => {});
  const t0 = Date.now();
  for (const [i, s] of actions.entries()) await run(page, s, i === 0 ? pre : null);
  await sleep(c.record || 2500);
  await cdp.send("Page.stopScreencast").catch(() => {});
  const mo = (await page.evaluate(() => window.__mo).catch(() => null)) || { raf: [], anims: [] };
  const finalUrl = page.url();
  await ctx.close();
  if (shots.length < 2) return { name, error: "fewer than 2 screencast frames" };

  // decode on a blank page: canvas → grayscale, downscaled 3x
  const dec = await browser.newPage();
  const lums = await dec.evaluate(async (urls, W) => {
    window.__imgs = []; const out = [], c = document.createElement("canvas"), x = c.getContext("2d", { willReadFrequently: true });
    for (const u of urls) {
      const img = new Image(); img.src = "data:image/jpeg;base64," + u; await img.decode(); __imgs.push(img);
      const h = Math.round((img.height * W) / img.width); c.width = W; c.height = h; x.drawImage(img, 0, 0, W, h);
      const d = x.getImageData(0, 0, W, h).data; let s = "";
      for (let i = 0; i < d.length; i += 4) s += String.fromCharCode((d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114) | 0);
      out.push(btoa(s));
    }
    return out;
  }, shots.map((s) => s.data), W);
  if (process.env.FRAMES) { const d = path.join(out, `${name}-frames`); fs.mkdirSync(d, { recursive: true }); shots.forEach((s) => fs.writeFileSync(path.join(d, `${String(round(s.t - t0)).padStart(5, "0")}.jpg`), Buffer.from(s.data, "base64"))); }
  const frames = shots.map((s, i) => ({ t: s.t, lum: new Uint8Array(Buffer.from(lums[i], "base64")) }));
  const a = analyze(frames, t0);

  const { picks, labels, end } = filmstripPicks(frames, a, t0);
  const cells = await dec.evaluate((picks, w) => picks.map((p) => {
    const im = __imgs[p], h = Math.round((im.height * w) / im.width), c = document.createElement("canvas"), x = c.getContext("2d");
    c.width = w; c.height = h; x.drawImage(im, 0, 0, w, h);
    const d = x.getImageData(0, 0, w, h).data; let s = "";
    for (let i = 0; i < d.length; i += 4) s += String.fromCharCode(d[i], d[i + 1], d[i + 2]);
    return { w, h, rgb: btoa(s) };
  }), picks, CELL);
  await dec.close();
  const png = composeFilmstrip(cells.map((c) => ({ ...c, rgb: Buffer.from(c.rgb, "base64") })), labels);
  fs.writeFileSync(path.join(out, `${name}-filmstrip.png`), png);

  const { baseIndex, ...rest } = a;
  const result = {
    name, url: c.url, finalUrl, action: c.action, reducedMotion: reduced, cpu: spec.cpu || 1, framesCaptured: shots.length,
    ...rest, longFrames: longFrames(mo.raf.filter((t) => t >= t0 && t <= t0 + end)),
    animations: mo.anims.filter((x) => x.at >= t0 - 50).map(({ at, ...x }) => ({ startMs: round(at - t0), ...x })).slice(0, 40),
    filmstrip: `${name}-filmstrip.png`,
  };
  fs.writeFileSync(path.join(out, `${name}.json`), JSON.stringify(result, null, 1));
  return result;
}

// ---------- CLI ----------
const argv = process.argv.slice(2);
if (argv[0] === "--selftest") { selftest(); process.exit(0); }
const flag = (f) => { const i = argv.indexOf(f); return i < 0 ? null : argv.splice(i, f === "--out" ? 2 : 1)[f === "--out" ? 1 : 0]; };
const outArg = flag("--out"), reducedArg = flag("--reduced") !== null;
let spec;
if (argv[0]?.endsWith(".json")) spec = JSON.parse(fs.readFileSync(argv[0], "utf8"));
else if (argv[1]) {
  const action = argv[1].startsWith("js:") ? { js: argv[1].slice(3) } : { click: argv[1] };
  spec = { captures: [{ name: argv[2] || "capture", url: argv[0], action }], alsoReduced: reducedArg };
} else { console.error("usage: see the header of capture-motion.mjs"); process.exit(1); }
const out = path.resolve(outArg || spec.out || "motion");
fs.mkdirSync(out, { recursive: true });
const puppeteer = createRequire(path.join(process.cwd(), "/"))("puppeteer-core");
const browser = await puppeteer.launch({ headless: true, executablePath: process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const only = process.env.ONLY ? new RegExp(process.env.ONLY) : null;
for (const c of spec.captures.filter((c) => !only || only.test(c.name))) {
  for (const reduced of spec.alsoReduced ? [false, true] : [reducedArg]) {
    try {
      const r = await capture(browser, spec, c, reduced, out);
      console.log(r.error ? `${r.name}: ${r.error}` : `${r.name}: first ${r.firstChangeMs}ms · settled ${r.settledMs}ms · hardCut ${r.hardCut}${r.cuts.length ? " @" + r.cuts.map((c) => c.atMs).join(",") : ""} · blank ${r.blankMs}ms · segments ${r.segments.map((s) => `${s.startMs}-${s.endMs}${s.cut ? "CUT" : ""} ${s.easing} ${s.fps ?? "-"}fps`).join(" | ")} · long frames ${r.longFrames.count} · anims ${r.animations.length}`);
    } catch (e) { console.log(`${c.name}${reduced ? "-reduced" : ""}: FAILED ${e.message}`); }
  }
}
await browser.close();
