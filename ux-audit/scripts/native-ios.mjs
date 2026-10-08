// iOS Simulator helper for audit agents: a thin wrapper over `xcrun simctl` (Xcode only, no installs).
// <dev> = a UDID, an exact device name (booted / newest runtime wins) or "booted".
//
//   node native-ios.mjs list                         devices (ux-audit-* clones marked)
//   node native-ios.mjs clone <role> [source]        own simulator per agent: ux-audit-<role> (reused if it exists);
//                                                    source defaults to the newest-runtime "iPhone 17 Pro"/first iPhone
//   node native-ios.mjs boot|shutdown <dev>          boot waits until the device is ready
//   node native-ios.mjs delete <dev>                 only deletes ux-audit-* devices
//   node native-ios.mjs erase <dev>                  factory-reset a ux-audit-* clone (clones inherit the source's
//                                                    Safari storage, logins and settings: erase for a first visit)
//   node native-ios.mjs install <dev> <App.app> | launch <dev> <bundle-id> [args…] | terminate <dev> <bundle-id>
//   node native-ios.mjs open <dev> <url>             deep link, or a website in Mobile Safari
//   node native-ios.mjs screenshot <dev> <file.png>
//   node native-ios.mjs record start <dev> <file.mp4> | record mark <file.mp4> | record stop <file.mp4>
//        start returns once the first frame is recorded. Every touch-down (MCP tool taps included) is read
//        from backboardd's log with its ms timestamp; stop prints the capture-video-motion.mjs command with
//        those times as --marks. `mark` adds a manual wall-clock mark (fallback; tool-call latency makes it late).
//   node native-ios.mjs ui <dev> appearance light|dark | content_size <size> | increase_contrast enabled|disabled
//        sizes: extra-small … large (default) … extra-extra-extra-large, accessibility-medium … accessibility-extra-extra-extra-large
//   node native-ios.mjs reduce-motion <dev> on|off   then relaunch the app under test (verified in Mobile Safari via probe; UIKit apps not verified)
//   node native-ios.mjs status-bar <dev> clean|clear 9:41, full bars, full battery
//   node native-ios.mjs probe <dev> [shot.png]       opens a local page in Safari and reports what WebKit sees:
//                                                    prefers-reduced-motion, prefers-contrast, prefers-color-scheme
//   node native-ios.mjs reset <dev>                  light, large text, contrast off, reduce motion off, status bar cleared
//   node native-ios.mjs a11y <dev>                   accessibility tree as JSON via axe or idb, if installed
//
// Taps, swipes and typing are NOT here (simctl has none): use the iOS Simulator MCP tool
// (mcp__Claude_Code_iOS_Simulator__control: tap/swipe/text/button/open_url/screenshot, device = the clone's UDID).
// Known quirk (iOS 26.5): `ui increase_contrast enabled` reaches running apps only through the change
// notification; an app launched afterwards (Safari included) reads it as off. This tool toggles it
// off→on to re-send the notification, so set it AFTER launching the app, and confirm with `probe`.
import { execFileSync, spawn } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";

const sim = (...a) => execFileSync("xcrun", ["simctl", ...a], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const die = (m) => { console.error(m); process.exit(1); };
const devices = () => Object.entries(JSON.parse(sim("list", "devices", "available", "-j")).devices)
  .flatMap(([rt, ds]) => ds.map((d) => ({ ...d, runtime: rt.replace(/.*SimRuntime\./, "") })))
  .sort((a, b) => (b.state === "Booted") - (a.state === "Booted") || b.runtime.localeCompare(a.runtime, undefined, { numeric: true }));
function dev(x) {
  if (!x) die("missing <dev>");
  if (x === "booted") return devices().find((d) => d.state === "Booted")?.udid || die("no booted simulator");
  const d = devices().find((d) => d.udid === x) || devices().find((d) => d.name === x);
  return d ? d.udid : die(`no simulator "${x}" (node native-ios.mjs list)`);
}
const recFile = (f) => `${f}.rec.json`;
const alive = (pid) => { try { process.kill(pid, 0); return true; } catch { return false; } };
const PROBE = `<meta name=viewport content="width=device-width"><style>body{margin:0}div{height:30vh;background:red}
@media (prefers-reduced-motion:reduce){#a{background:lime}}@media (prefers-contrast:more){#b{background:lime}}
@media (prefers-color-scheme:dark){#c{background:lime}}</style><div id=a></div><div id=b></div><div id=c></div>`;

const [cmd, ...a] = process.argv.slice(2);
switch (cmd) {
  case "list":
    for (const d of devices()) console.log(`${d.name.startsWith("ux-audit-") ? "*" : " "} ${d.name.padEnd(28)} ${d.udid}  ${d.state.padEnd(9)} ${d.runtime}`);
    break;
  case "clone": {
    if (!a[0]) die("usage: clone <role> [source]");
    const name = `ux-audit-${a[0]}`, have = devices().find((d) => d.name === name);
    if (have) { console.log(have.udid); break; }
    const phones = devices().filter((d) => /^iPhone/.test(d.name));
    const src = a[1] ? dev(a[1]) : (phones.find((d) => d.name === "iPhone 17 Pro" && d.state === "Shutdown") || phones.find((d) => d.state === "Shutdown"))?.udid;
    if (!src) die("no shut-down iPhone to clone from; pass a source");
    console.log(sim("clone", src, name)); // clone needs the source shut down
    break;
  }
  case "boot": { const u = dev(a[0]); try { sim("bootstatus", u, "-b"); } catch (e) { die(e.stderr || e.message); } console.log(`booted ${u}`); break; }
  case "shutdown": { const u = dev(a[0]); try { sim("shutdown", u); } catch {} console.log(`shut down ${u}`); break; }
  case "delete": {
    const d = devices().find((d) => d.udid === dev(a[0]));
    if (!d.name.startsWith("ux-audit-")) die(`refusing to delete "${d.name}": only ux-audit-* clones`);
    try { sim("shutdown", d.udid); } catch {}
    sim("delete", d.udid); console.log(`deleted ${d.name}`);
    break;
  }
  case "erase": { // first-visit state: clones inherit the source's apps, Safari storage and settings
    const d = devices().find((d) => d.udid === dev(a[0]));
    if (!d.name.startsWith("ux-audit-")) die(`refusing to erase "${d.name}": only ux-audit-* clones`);
    try { sim("shutdown", d.udid); } catch {}
    sim("erase", d.udid); console.log(`erased ${d.name} (shut down; boot it again)`);
    break;
  }
  case "install": console.log(sim("install", dev(a[0]), a[1]) || "installed"); break;
  case "launch": console.log(sim("launch", "--terminate-running-process", dev(a[0]), ...a.slice(1))); break;
  case "terminate": try { sim("terminate", dev(a[0]), a[1]); } catch {} console.log("terminated"); break;
  case "open": sim("openurl", dev(a[0]), a[1]); console.log(`opened ${a[1]}`); break;
  case "screenshot": sim("io", dev(a[0]), "screenshot", a[1]); console.log(a[1]); break;
  case "record": {
    const [op, x, y] = a;
    if (op === "start") {
      const u = dev(x), file = y, log = `${file}.log`;
      if (!file) die("usage: record start <dev> <file.mp4>");
      const bg = (args, out) => { const p = spawn("xcrun", ["simctl", ...args], { detached: true, stdio: ["ignore", fs.openSync(out, "w"), fs.openSync(out, "a")] }); p.unref(); return p.pid; };
      // every touch-down, timestamped by backboardd (host clock, ms): these become the --marks
      const logPid = bg(["spawn", u, "log", "stream", "--level", "debug", "--style", "compact", "--predicate", 'process == "backboardd" AND category == "TouchEvents"'], `${file}.touches.log`);
      await sleep(1000);
      const pid = bg(["io", u, "recordVideo", "--codec=h264", "--force", file], log);
      for (let i = 0; i < 500 && !/Recording started/.test(fs.readFileSync(log, "utf8")); i++) await sleep(10);
      if (!/Recording started/.test(fs.readFileSync(log, "utf8"))) { process.kill(pid, "SIGINT"); process.kill(logPid, "SIGINT"); die(`recording did not start:\n${fs.readFileSync(log, "utf8")}`); }
      fs.writeFileSync(recFile(file), JSON.stringify({ pid, logPid, udid: u, startEpochMs: Date.now(), marks: [] }));
      console.log(`recording ${file} (pid ${pid}); taps are timestamped automatically`);
    } else if (op === "mark") {
      const r = JSON.parse(fs.readFileSync(recFile(x), "utf8")), s = +((Date.now() - r.startEpochMs) / 1000).toFixed(3);
      r.marks.push(s); fs.writeFileSync(recFile(x), JSON.stringify(r)); console.log(s);
    } else if (op === "stop") {
      const r = JSON.parse(fs.readFileSync(recFile(x), "utf8"));
      for (const p of [r.pid, r.logPid]) if (p && alive(p)) process.kill(p, "SIGINT");
      for (let i = 0; i < 300 && alive(r.pid); i++) await sleep(50);
      const touches = fs.existsSync(`${x}.touches.log`) ? fs.readFileSync(`${x}.touches.log`, "utf8").split("\n")
        .map((l) => /^(\d{4}-\d\d-\d\d) (\d\d:\d\d:\d\d\.\d+) .*new contact for pathIndex/.exec(l)).filter(Boolean)
        .map((m) => +((new Date(`${m[1]}T${m[2]}`) - r.startEpochMs) / 1000).toFixed(3)).filter((s) => s >= 0) : [];
      const marks = touches.length ? touches : r.marks;
      r.touches = touches; fs.writeFileSync(recFile(x), JSON.stringify(r));
      console.log(x);
      console.log(`touch-downs (s): ${touches.join(",") || "none logged"}${r.marks.length ? `; manual marks: ${r.marks.join(",")}` : ""}`);
      console.log(`node <skill>/scripts/capture-video-motion.mjs ${x}${marks.length ? ` --marks ${marks.join(",")}` : ""} --out <audit>/evidence/<role>/motion`);
    } else die("usage: record start <dev> <file> | mark <file> | stop <file>");
    break;
  }
  case "ui": {
    const u = dev(a[0]);
    if (a[1] === "increase_contrast" && a[2] === "enabled") sim("ui", u, "increase_contrast", "disabled"); // re-send the notification
    console.log(sim("ui", u, ...a.slice(1)) || `${a[1]} ${a[2] ?? ""}`.trim());
    break;
  }
  case "reduce-motion": {
    const u = dev(a[0]), on = a[1] === "on";
    sim("spawn", u, "defaults", "write", "com.apple.Accessibility", "ReduceMotionEnabled", "-bool", on ? "true" : "false");
    console.log(`reduce motion ${on ? "on" : "off"} (ReduceMotionEnabled=${sim("spawn", u, "defaults", "read", "com.apple.Accessibility", "ReduceMotionEnabled")}); relaunch the app under test, confirm with probe`);
    break;
  }
  case "status-bar": {
    const u = dev(a[0]);
    if (a[1] === "clear") sim("status_bar", u, "clear");
    else sim("status_bar", u, "override", "--time", "9:41", "--dataNetwork", "wifi", "--wifiMode", "active", "--wifiBars", "3",
      "--cellularMode", "active", "--cellularBars", "4", "--batteryState", "charged", "--batteryLevel", "100");
    console.log(`status bar ${a[1] === "clear" ? "cleared" : "clean (9:41)"}`);
    break;
  }
  case "probe": {
    // Simulator shares the Mac's network, so 127.0.0.1 here is reachable from Mobile Safari (data: URLs are refused).
    const u = dev(a[0]), shot = a[1] || `${os.tmpdir()}/ux-audit-probe-${u}.png`;
    const srv = http.createServer((q, r) => { r.setHeader("content-type", "text/html"); r.setHeader("cache-control", "no-store"); r.end(PROBE); });
    await new Promise((r) => srv.listen(0, "127.0.0.1", r));
    sim("openurl", u, `http://127.0.0.1:${srv.address().port}/?${Date.now()}`);
    await sleep(4000);
    sim("io", u, "screenshot", shot); srv.close();
    // the 3 bands are 30vh each under Safari's top bar: sample the middle of each (x = middle)
    const px = (y) => execFileSync("ffmpeg", ["-v", "error", "-i", shot, "-vf", `crop=1:1:iw/2:ih*${y}`, "-f", "rawvideo", "-pix_fmt", "rgb24", "-"]);
    const on = (y) => { const [r, g] = px(y); return g > 200 && r < 80 ? true : r > 200 && g < 80 ? false : "unreadable"; };
    console.log(JSON.stringify({ reducedMotion: on(0.2), increasedContrast: on(0.45), dark: on(0.7), screenshot: shot }));
    break;
  }
  case "reset": {
    const u = dev(a[0]);
    sim("ui", u, "appearance", "light"); sim("ui", u, "content_size", "large"); sim("ui", u, "increase_contrast", "disabled");
    sim("spawn", u, "defaults", "write", "com.apple.Accessibility", "ReduceMotionEnabled", "-bool", "false"); sim("status_bar", u, "clear");
    console.log("reset: light, large, contrast off, reduce motion off, status bar cleared");
    break;
  }
  case "a11y": {
    const u = dev(a[0]), has = (b) => { try { execFileSync("which", [b], { stdio: "ignore" }); return true; } catch { return false; } };
    if (has("axe")) console.log(execFileSync("axe", ["describe-ui", "--udid", u], { encoding: "utf8" }));
    else if (has("idb")) console.log(execFileSync("idb", ["ui", "describe-all", "--udid", u, "--json"], { encoding: "utf8" }));
    else {
      console.log(`a11y tree: not available. Install one (owner's decision, not the agent's):
  axe: brew install cameroncooke/axe/axe        (then: axe describe-ui --udid ${u})
  idb: brew tap facebook/fb && brew install idb-companion && pip3 install fb-idb
Fallback without them:
  - screenshots at content_size accessibility-extra-extra-extra-large, increase_contrast, dark: read clipping, truncation, contrast by eye;
  - websites: the accessibility tree from Chrome (agents/access-perf.md step 2) — WebKit's differs in detail;
  - own app with source: an XCUITest that prints XCUIApplication().debugDescription (labels, traits, frames);
  - by hand: Xcode > Open Developer Tool > Accessibility Inspector, target the simulator.
Report VoiceOver labels and traits as "not checked" otherwise.`);
      process.exitCode = 2;
    }
    break;
  }
  default:
    die("usage: see the header of native-ios.mjs");
}
