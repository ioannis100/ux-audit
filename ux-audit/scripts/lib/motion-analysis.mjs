import { realpathSync } from "node:fs";
// Shared frame analysis for capture-motion.mjs (CDP screencast) and capture-video-motion.mjs (any
// screen recording). Pure Node, no dependencies (Node >= 22.2 for zlib.crc32).
// Frames are [{t: ms, lum: Uint8Array, rgb?: Uint8Array}], all the same size, W (130) px wide; lum is
// grayscale 0-255 (0.299 R + 0.587 G + 0.114 B), rgb (optional, 3 bytes per pixel) makes change
// detection colour-aware: a light-green-on-white state change has almost no luma change. Field meanings: header of capture-motion.mjs and
// references/motion.md -> "Transitions and motion audit".
//   node lib/motion-analysis.mjs --selftest
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

export const PIX = 12, MOVE = 0.001, FIRST = 0.0005, IDLE = 120, WIN = 150, LONG = 50, CELL = 156, W = 130; // tuning knobs
const round = (x) => Math.round(x);

export const diff = (a, b) => {
  let s = 0, c = 0;
  for (let i = 0; i < a.length; i++) { const d = Math.abs(a[i] - b[i]); s += d; if (d > PIX) c++; }
  return { mad: s / a.length / 255, changed: c / a.length };
};
// change between two frames: per-pixel max channel difference when both carry rgb, else luma
export const fdiff = (fa, fb) => {
  if (!fa.rgb || !fb.rgb) return diff(fa.lum, fb.lum);
  const a = fa.rgb, b = fb.rgb, n = a.length / 3; let s = 0, c = 0;
  for (let i = 0; i < a.length; i += 3) { const d = Math.max(Math.abs(a[i] - b[i]), Math.abs(a[i + 1] - b[i + 1]), Math.abs(a[i + 2] - b[i + 2])); s += d; if (d > PIX) c++; }
  return { mad: s / n / 255, changed: c / n };
};
// true when b is mostly a (vertically or horizontally) shifted copy of a: scroll or slide, not a cut
export function moved(a, b, mad) {
  const H = a.length / W, prof = (l, rows) => Array.from({ length: rows ? H : W }, (_, k) => { let s = 0; for (let j = 0; j < (rows ? W : H); j++) s += rows ? l[k * W + j] : l[j * W + k]; return s / (rows ? W : H); });
  const best = (p, q, n) => { let bo = 0, be = Infinity; for (let o = -(n >> 1); o <= n >> 1; o++) { let e = 0, c = 0; for (let k = Math.max(0, o); k < Math.min(n, n + o); k++) { e += Math.abs(q[k] - p[k - o]); c++; } if (c > n / 3 && e / c < be) { be = e / c; bo = o; } } return bo; };
  const shifted = (dx, dy) => { let s = 0, c = 0; for (let y = Math.max(0, dy); y < Math.min(H, H + dy); y++) for (let x = Math.max(0, dx); x < Math.min(W, W + dx); x++) { s += Math.abs(b[y * W + x] - a[(y - dy) * W + x - dx]); c++; } return s / c / 255; };
  const dy = best(prof(a, true), prof(b, true), H), dx = best(prof(a, false), prof(b, false), W);
  return (dy && shifted(0, dy) < 0.6 * mad) || (dx && shifted(dx, 0) < 0.6 * mad); // images loading mid-scroll leave residue
}
export function easingOf(frames, from, to, tStart, tEnd) {
  const total = fdiff(frames[from], frames[to]).mad || 1e-9, span = tEnd - tStart || 1;
  const pts = [[0, 0]];
  for (let i = from + 1; i <= to; i++) pts.push([(frames[i].t - tStart) / span, Math.min(1, Math.max(0, 1 - fdiff(frames[i], frames[to]).mad / total))]);
  const at = (u) => { let p = 0; for (const [x, y] of pts) if (x <= u + 1e-9) p = y; return p; }; // step-hold, frames are discrete
  const profile = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].map((u) => +at(u).toFixed(2));
  const [p25, p50, p75] = [at(0.25), at(0.5), at(0.75)];
  const easing = p50 >= 0.65 ? "ease-out" : p50 <= 0.35 ? "ease-in" : p25 < 0.2 && p75 > 0.8 ? "ease-in-out" : "linear-ish";
  return { easing, profile };
}
// t0 = the action (pointer-down / tap mark), same clock as frames[].t
export function analyze(frames, t0) {
  let b = 0;
  for (let i = 0; i < frames.length; i++) if (frames[i].t <= t0) b = i;
  const at = (t) => { let k = b; for (let i = b; i < frames.length; i++) if (frames[i].t <= t) k = i; return k; };
  const std = (l) => { let m = 0, v = 0; for (const x of l) m += x; m /= l.length; for (const x of l) v += (x - m) ** 2; return Math.sqrt(v / l.length); };
  const steps = [], segs = [], cuts = [], blank = [];
  let firstChangeMs = null;
  for (let i = b + 1; i < frames.length; i++) {
    const d = fdiff(frames[i - 1], frames[i]), ms = round(frames[i].t - t0);
    steps.push([ms, +(d.changed * 100).toFixed(2), i, d.mad]);
    if (firstChangeMs === null && fdiff(frames[b], frames[i]).changed > FIRST) firstChangeMs = ms;
    // hard cut: one frame carries >= 70% of the change seen across +-WIN ms (no intermediate frames)
    if (d.changed > 0.1 && !moved(frames[i - 1].lum, frames[i].lum, diff(frames[i - 1].lum, frames[i].lum).mad)) {
      const win = fdiff(frames[at(frames[i].t - WIN)], frames[at(frames[i].t + WIN)]).mad || 1e-9;
      if (d.mad / win >= 0.7) cuts.push({ atMs: ms, changedPct: +(d.changed * 100).toFixed(1), ratio: +(d.mad / win).toFixed(2) });
    }
    if (i < frames.length - 1 && std(frames[i].lum) < 4) { // near-uniform frame = blank screen
      const end = round(frames[i + 1].t - t0), last = blank.at(-1);
      if (last && last[1] === ms) last[1] = end; else blank.push([ms, end]);
    }
  }
  for (const s of steps) {
    if (s[1] / 100 <= MOVE && s[3] <= MOVE) continue; // small-but-wide changes (fade tails) still count
    const last = segs.at(-1);
    if (last && frames[s[2]].t - frames[last.to].t <= IDLE) { last.to = s[2]; last.moves.push(s); } else segs.push({ from: s[2] - 1, to: s[2], moves: [s] });
  }
  const segments = segs.map((g) => {
    const tFirst = frames[g.moves[0][2]].t, tEnd = frames[g.to].t, tStart = Math.max(frames[g.from].t, tFirst - 17);
    const startMs = round(tStart - t0), endMs = round(tEnd - t0), cut = cuts.some((c) => c.atMs >= startMs && c.atMs <= endMs);
    const gaps = g.moves.slice(1).map((s, k) => frames[s[2]].t - frames[g.moves[k][2]].t).filter((x) => x > LONG).map(round);
    return {
      startMs, endMs, frames: g.moves.length,
      fps: g.moves.length > 1 ? round((g.moves.length - 1) / ((tEnd - tFirst) / 1000)) : null,
      changedPct: +(fdiff(frames[g.from], frames[g.to]).changed * 100).toFixed(1), cut,
      ...(cut || g.moves.length < 3 ? { easing: "n/a", profile: [] } : easingOf(frames, g.from, g.to, tStart, tEnd)),
      stallsMs: gaps,
    };
  });
  const settledMs = segments.length ? segments.at(-1).endMs : null;
  return {
    firstChangeMs, settledMs, motionMs: settledMs !== null && firstChangeMs !== null ? settledMs - firstChangeMs : null,
    hardCut: cuts.some((c) => c.changedPct > 25), cuts, blankMs: blank.reduce((a, [s, e]) => a + e - s, 0), blank, segments,
    steps: steps.map(([ms, pct]) => [ms, pct]), baseIndex: b,
  };
}

// gaps > LONG ms between consecutive timestamps (rAF ticks, or video frames while something moves)
export function longFrames(times) {
  const gaps = times.slice(1).map((t, i) => round(t - times[i])).filter((g) => g > LONG);
  return { count: gaps.length, worstMs: gaps.length ? Math.max(...gaps) : 0, list: gaps.slice(0, 20) };
}

// ---------- filmstrip: 10 frames from t0 to settled + 150 ms, labelled +ms, red label = cut frame ----------
export function filmstripPicks(frames, a, t0) {
  const end = Math.max(300, (a.settledMs ?? 0) + 150), picks = [], labels = [];
  for (let k = 0; k < 10; k++) {
    const ts = t0 + (end * k) / 9; let idx = a.baseIndex;
    frames.forEach((f, i) => { if (f.t <= ts) idx = i; });
    picks.push(idx); labels.push({ text: `+${round((end * k) / 9)}ms`, cut: a.cuts.some((c) => Math.abs(frames[idx].t - t0 - c.atMs) < 2) });
  }
  return { picks, labels, end };
}

// 5x7 bitmap glyphs (rows top to bottom, 5 bits each, MSB = left), drawn at 2x
const FONT = {
  "0": [14, 17, 19, 21, 25, 17, 14], "1": [4, 12, 4, 4, 4, 4, 14], "2": [14, 17, 1, 2, 4, 8, 31], "3": [31, 2, 4, 2, 1, 17, 14],
  "4": [2, 6, 10, 18, 31, 2, 2], "5": [31, 16, 30, 1, 1, 17, 14], "6": [6, 8, 16, 30, 17, 17, 14], "7": [31, 1, 2, 4, 8, 8, 8],
  "8": [14, 17, 17, 14, 17, 17, 14], "9": [14, 17, 17, 15, 1, 2, 12], "+": [0, 4, 4, 31, 4, 4, 0], "-": [0, 0, 0, 31, 0, 0, 0],
  m: [0, 0, 26, 21, 21, 21, 21], s: [0, 0, 15, 16, 14, 1, 30], ".": [0, 0, 0, 0, 0, 12, 12], " ": [0, 0, 0, 0, 0, 0, 0],
};
// cells = [{w, h, rgb: Buffer w*h*3}] (all the same size, normally CELL px wide) -> PNG Buffer
export function composeFilmstrip(cells, labels) {
  const { w, h } = cells[0], Wd = cells.length * (w + 6) + 6, Hd = h + 34, img = Buffer.alloc(Wd * Hd * 3, 0x11);
  const put = (x, y, c) => { if (x >= 0 && y >= 0 && x < Wd && y < Hd) img.set(c, (y * Wd + x) * 3); };
  cells.forEach((cell, k) => {
    const X = 6 + k * (w + 6);
    for (let y = 0; y < h; y++) cell.rgb.copy(img, ((28 + y) * Wd + X) * 3, y * w * 3, (y + 1) * w * 3);
    const col = labels[k].cut ? [0xff, 0x5a, 0x5a] : [0xff, 0xff, 0xff];
    [...labels[k].text].forEach((ch, n) => (FONT[ch] || FONT[" "]).forEach((row, r) => {
      for (let b = 0; b < 5; b++) if (row & (16 >> b)) for (let d = 0; d < 4; d++) put(X + n * 12 + b * 2 + (d & 1), 5 + r * 2 + (d >> 1), col);
    }));
  });
  const raw = Buffer.alloc((Wd * 3 + 1) * Hd);
  for (let y = 0; y < Hd; y++) img.copy(raw, y * (Wd * 3 + 1) + 1, y * Wd * 3, (y + 1) * Wd * 3); // filter byte 0 per row
  const chunk = (type, data) => {
    const len = Buffer.alloc(4), body = Buffer.concat([Buffer.from(type), data]), crc = Buffer.alloc(4);
    len.writeUInt32BE(data.length); crc.writeUInt32BE(zlib.crc32(body));
    return Buffer.concat([len, body, crc]);
  };
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(Wd, 0); ihdr.writeUInt32BE(Hd, 4); ihdr[8] = 8; ihdr[9] = 2; // 8-bit RGB
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk("IHDR", ihdr), chunk("IDAT", zlib.deflateSync(raw)), chunk("IEND", Buffer.alloc(0))]);
}

export function selftest() {
  const px = W * 12, fill = (v) => new Uint8Array(px).fill(v);
  const cut = analyze([{ t: 0, lum: fill(0) }, { t: 150, lum: fill(255) }], 100);
  console.assert(cut.hardCut && cut.firstChangeMs === 50, "hard cut not detected", cut);
  const fade = [{ t: 0, lum: fill(0) }];
  for (let t = 16; t <= 304; t += 16) { const u = (t - 16) / 288; fade.push({ t: 100 + t, lum: fill(round(255 * (1 - (1 - u) ** 3))) }); }
  const f = analyze(fade, 100);
  console.assert(!f.hardCut && f.segments.length === 1 && f.segments[0].easing === "ease-out" && f.motionMs > 200, "fade misread", f.segments);
  const lin = [{ t: 0, lum: fill(0) }];
  for (let t = 16; t <= 304; t += 16) lin.push({ t: 100 + t, lum: fill(round(255 * t / 304)) });
  console.assert(analyze(lin, 100).segments[0].easing === "linear-ish", "linear misread");
  const slow = [{ t: 0, lum: fill(0) }]; // a janky 24 fps fade is still a fade, not a run of cuts
  for (let k = 1; k <= 5; k++) slow.push({ t: 100 + k * 60, lum: fill(k * 51) });
  console.assert(!analyze(slow, 100).hardCut, "janky fade read as a cut");
  const tex = (off) => { const l = new Uint8Array(W * 60); for (let y = 0; y < 60; y++) for (let x = 0; x < W; x++) l[y * W + x] = ((y + off) * 37 + x * 11) % 7 < 3 ? 230 : 20; return l; };
  const scroll = [{ t: 0, lum: tex(0) }]; for (let k = 1; k <= 10; k++) scroll.push({ t: 100 + k * 16, lum: tex(k * 3) });
  console.assert(!analyze(scroll, 100).hardCut, "scroll read as a cut");
  const rgbFill = (r, g, b) => { const a = new Uint8Array(px * 3); for (let i = 0; i < a.length; i += 3) { a[i] = r; a[i + 1] = g; a[i + 2] = b; } return a; };
  const iso = analyze([{ t: 0, lum: fill(180), rgb: rgbFill(180, 180, 180) }, { t: 150, lum: fill(180), rgb: rgbFill(150, 210, 120) }], 100);
  console.assert(iso.firstChangeMs === 50, "same-brightness colour change missed", iso.firstChangeMs);
  const lf = longFrames([0, 16, 33, 120, 136]);
  console.assert(lf.count === 1 && lf.worstMs === 87, "longFrames wrong", lf);
  const { picks, labels } = filmstripPicks(fade, f, 100);
  console.assert(picks.length === 10 && picks[0] === 0 && labels[0].text === "+0ms", "filmstrip picks wrong", picks, labels);
  const png = composeFilmstrip(picks.map(() => ({ w: 4, h: 3, rgb: Buffer.alloc(36, 200) })), labels);
  const ihdr = png.subarray(16, 24), raw = zlib.inflateSync(png.subarray(41, png.length - 16)); // IHDR at 8, IDAT data at 41, IDAT crc + IEND = 16
  console.assert(png.subarray(1, 4).toString() === "PNG" && ihdr.readUInt32BE(0) === 106 && ihdr.readUInt32BE(4) === 37 && raw.length === (106 * 3 + 1) * 37, "PNG composer wrong");
  console.log("selftest done (no assertion output above = pass)");
}

if (process.argv[2] === "--selftest" && process.argv[1] && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) selftest();
