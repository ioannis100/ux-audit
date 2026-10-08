// Measure motion in ANY screen recording: `simctl io recordVideo` (.mov/.mp4), `adb screenrecord`,
// a real iPhone/Android screen recording the owner sends over, or a recording of a website.
// Same analysis, filmstrip and JSON shape as capture-motion.mjs (lib/motion-analysis.mjs).
// Needs only Node >= 22.2 and ffmpeg (FFMPEG=/path/to/ffmpeg to override). Runs from any cwd.
//
//   node <skill>/scripts/capture-video-motion.mjs <video> [--name n] [--out dir]
//        [--marks 3.42,7.10] [--from s] [--to s] [--crop w:h:x:y] [--max-fps 120]
//   node <skill>/scripts/capture-video-motion.mjs --selftest
//
// Times are seconds on the video's own timeline (what ffprobe / QuickTime show).
// --marks   action (tap) times. One capture per mark, named <name>-1, <name>-2… (just <name> for one
//           mark); each runs to the next mark. firstChangeMs = first visible change after the mark.
//           Without marks, t0 = --from (or the first frame) and firstChangeMs is "first change in the clip".
//           `native-ios.mjs record stop` prints ready-made --marks (every simulator touch-down, from backboardd's log).
// --from/--to  cut to a time window. --max-fps  frames closer than 1/max-fps are dropped (default 120).
// --crop    an ffmpeg crop (w:h:x:y, expressions allowed: "iw:ih-260:0:140"). Crop away the status bar
//           and browser chrome when it matters: a blank web page inside Safari's chrome is NOT a
//           near-uniform frame, so blank[] only works on the content area.
// Writes <out>/<name>.json + <out>/<name>-filmstrip.png. Fields as in capture-motion.mjs, except:
// longFrames = frame gaps > 50 ms while something moves (VFR recordings send no frames while still),
// animations = [] (no DOM), plus video, markS, window, crop, sourceFps.
// Simulator marks come from backboardd's touch-down log: a JS touchstart repaint measured 37-45 ms after
// the mark, so firstChangeMs includes <= ~40 ms of pipeline. Device recordings carry no touch times: give
// marks by eye (frame before the first pressed state) or turn on Android "Show taps".
// Known limit: a parallax push (UIKit navigation) trips cuts[] at ~17-24%; read the strip.
// Read references/motion.md -> "Transitions and motion audit".
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
import { analyze, filmstripPicks, composeFilmstrip, W, CELL } from "./lib/motion-analysis.mjs";

const FFMPEG = process.env.FFMPEG || "ffmpeg";
const round = (x) => Math.round(x);

function ffmpeg(args) {
  return new Promise((resolve, reject) => {
    const p = spawn(FFMPEG, ["-hide_banner", "-nostdin", ...args]), out = [], err = [];
    p.stdout.on("data", (d) => out.push(d)); p.stderr.on("data", (d) => err.push(d));
    p.on("error", (e) => reject(new Error(`ffmpeg not runnable (${FFMPEG}): ${e.message}`)));
    p.on("close", (code) => code ? reject(new Error(Buffer.concat(err).toString().split("\n").slice(-6).join("\n"))) : resolve({ out: Buffer.concat(out), err: Buffer.concat(err).toString() }));
  });
}
// split a stream of binary PPMs ("P6\n<w> <h>\n255\n" + w*h*3 bytes)
function ppms(buf) {
  const res = [];
  for (let o = 0; o < buf.length;) {
    const head = buf.subarray(o, o + 40).toString("latin1"), m = /^P6\s+(\d+)\s+(\d+)\s+255\s/.exec(head);
    if (!m) throw new Error("unexpected ffmpeg output");
    const w = +m[1], h = +m[2], start = o + m[0].length;
    res.push({ w, h, rgb: buf.subarray(start, start + w * h * 3) }); o = start + w * h * 3;
  }
  return res;
}
const lumOf = (rgb) => { const l = new Uint8Array(rgb.length / 3); for (let i = 0; i < l.length; i++) l[i] = (rgb[i * 3] * 0.299 + rgb[i * 3 + 1] * 0.587 + rgb[i * 3 + 2] * 0.114) | 0; return l; };

export async function analyzeVideo(video, { name = path.basename(video).replace(/\.[^.]+$/, ""), out = "motion", marks = [], from = 0, to = null, crop = null, maxFps = 120 } = {}) {
  // the same select runs in both passes, so frame n means the same frame in each
  const select = `select='between(t\\,${from}\\,${to ?? 1e9})*(isnan(prev_selected_t)+gte(t-prev_selected_t\\,${(0.9 / maxFps).toFixed(5)}))'`;
  const pre = [select, crop && `crop=${crop}`].filter(Boolean);
  const io = (vf) => ["-i", video, "-an", "-vf", vf, "-fps_mode", "passthrough", "-f", "image2pipe", "-c:v", "ppm", "pipe:1"];
  const p1 = await ffmpeg(io([...pre, "showinfo", `scale=${W}:-2:flags=area`].join(",")).toSpliced(0, 0, "-loglevel", "info"));
  const times = [...p1.err.matchAll(/Parsed_showinfo.*?pts_time:\s*([-\d.e]+)/g)].map((m) => +m[1] * 1000);
  const imgs = ppms(p1.out);
  if (imgs.length !== times.length) throw new Error(`frame/timestamp mismatch: ${imgs.length} frames, ${times.length} timestamps`);
  if (imgs.length < 2) throw new Error("fewer than 2 frames in the window");
  const frames = imgs.map((im, i) => ({ t: times[i], lum: lumOf(im.rgb) }));
  const sourceFps = +(/Stream #\d+:\d+.*Video:.*?([\d.]+) fps/.exec(p1.err)?.[1] ?? NaN) || null;

  const t0s = marks.length ? marks.map((s) => s * 1000) : [frames[0].t];
  const runs = t0s.map((t0, k) => {
    const end = t0s[k + 1] ?? Infinity, fr = frames.filter((f) => f.t < end);
    const a = analyze(fr, t0), strip = filmstripPicks(fr, a, t0);
    return { k, t0, fr, a, strip };
  });
  // pass 2: the picked frames at filmstrip size
  const want = [...new Set(runs.flatMap((r) => r.strip.picks))].sort((x, y) => x - y);
  const p2 = await ffmpeg(io([...pre, `select='${want.map((n) => `eq(n\\,${n})`).join("+")}'`, `scale=${CELL}:-2:flags=area`].join(",")));
  const cells = new Map(ppms(p2.out).map((c, i) => [want[i], c]));

  fs.mkdirSync(out, { recursive: true });
  return runs.map(({ k, t0, fr, a, strip }) => {
    const nm = runs.length > 1 ? `${name}-${k + 1}` : name;
    fs.writeFileSync(path.join(out, `${nm}-filmstrip.png`), composeFilmstrip(strip.picks.map((n) => cells.get(n)), strip.labels));
    const gaps = a.segments.flatMap((s) => s.stallsMs);
    const { baseIndex, ...rest } = a;
    const result = {
      name: nm, video: path.resolve(video), markS: marks.length ? marks[k] : null, window: [from, to], crop, sourceFps,
      framesCaptured: fr.filter((f) => f.t >= t0).length, ...rest,
      longFrames: { count: gaps.length, worstMs: gaps.length ? Math.max(...gaps) : 0, list: gaps.slice(0, 20) },
      animations: [], filmstrip: `${nm}-filmstrip.png`,
    };
    fs.writeFileSync(path.join(out, `${nm}.json`), JSON.stringify(result, null, 1));
    return result;
  });
}

export const summary = (r) => `${r.name}: first ${r.firstChangeMs}ms · settled ${r.settledMs}ms · hardCut ${r.hardCut}${r.cuts.length ? " @" + r.cuts.map((c) => c.atMs).join(",") : ""} · blank ${r.blankMs}ms · segments ${r.segments.map((s) => `${s.startMs}-${s.endMs}${s.cut ? "CUT" : ""} ${s.easing} ${s.fps ?? "-"}fps`).join(" | ")} · long frames ${r.longFrames.count}`;

async function selftest() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "cvm-")), ok = (c, msg, x) => { if (!c) { console.error("FAIL:", msg, JSON.stringify(x)); process.exitCode = 1; } };
  // 240 fps white page fading in from black over 300 ms at t=1 s (linear), tapped at 0.9 s
  await ffmpeg(["-f", "lavfi", "-i", "color=c=white:s=390x844:r=240:d=2,fade=t=in:st=1:d=0.3", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-y", path.join(dir, "fade.mp4")]);
  const [f] = await analyzeVideo(path.join(dir, "fade.mp4"), { out: dir, marks: [0.9] });
  ok(f.firstChangeMs >= 95 && f.firstChangeMs <= 130 && !f.hardCut && f.segments.length === 1, "fade timing", f.segments);
  ok(f.segments[0].fps >= 100 && f.segments[0].fps <= 125, "fps cap to 120", f.segments[0].fps);
  ok(Math.abs(f.motionMs - 300) <= 25 && f.segments[0].easing === "linear-ish", "fade duration/easing", [f.motionMs, f.segments[0].easing]);
  // 60 fps hard cut: static colour bars, then white at 1 s; two marks; window 0.5–1.8 s
  await ffmpeg(["-f", "lavfi", "-i", "smptebars=s=390x844:r=60:d=1[a];color=c=white:s=390x844:r=60:d=1[b];[a][b]concat", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-y", path.join(dir, "cut.mp4")]);
  const rs = await analyzeVideo(path.join(dir, "cut.mp4"), { out: dir, name: "cut", marks: [0.95, 1.5], from: 0.5, to: 1.8 });
  ok(rs.length === 2 && rs[0].hardCut && Math.abs(rs[0].firstChangeMs - 50) <= 20, "cut", rs[0].cuts);
  ok(rs[1].segments.length === 0 && rs[1].firstChangeMs === null, "still after the cut", rs[1].segments);
  ok(fs.statSync(path.join(dir, "cut-1-filmstrip.png")).size > 1000, "filmstrip written");
  console.log(process.exitCode ? "selftest FAILED" : `selftest passed (${dir})`);
}

// realpath: the skill is usually run through the ~/.claude/skills symlink
if (process.argv[1] && fs.realpathSync(process.argv[1]) === fs.realpathSync(fileURLToPath(import.meta.url))) {
  const argv = process.argv.slice(2);
  if (argv[0] === "--selftest") await selftest();
  else {
    const opt = (f) => { const i = argv.indexOf(f); return i < 0 ? null : argv.splice(i, 2)[1]; };
    const name = opt("--name"), out = opt("--out"), marks = opt("--marks"), from = opt("--from"), to = opt("--to"), crop = opt("--crop"), maxFps = opt("--max-fps");
    if (!argv[0] || !fs.existsSync(argv[0])) { console.error("usage: see the header of capture-video-motion.mjs"); process.exit(1); }
    const rs = await analyzeVideo(argv[0], {
      ...(name && { name }), out: path.resolve(out || "motion"), marks: marks ? marks.split(",").map(Number) : [],
      from: from ? +from : 0, to: to ? +to : null, crop, maxFps: maxFps ? +maxFps : 120,
    });
    for (const r of rs) console.log(summary(r));
  }
}
