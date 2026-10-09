import { realpathSync } from "node:fs";
import { fileURLToPath } from "node:url";
// Fits measured property samples ([{t: ms, v: number}], e.g. translateY or scale read every frame)
// to what a designer would write: duration, a cubic-bezier (named if it matches a platform token)
// or a spring (damping ratio, response, SwiftUI-style bounce). Pure, no dependencies.
//   node lib/motion-fit.mjs --selftest
// Spring maths (mass 1): overshoot OS = exp(-ζπ/√(1-ζ²)) → ζ; first peak tp = π/ωd, ωn = ωd/√(1-ζ²);
// response = 2π/ωn (SwiftUI `duration`), bounce = 1 − ζ (benchmark-apps §2), stiffness = ωn², damping = 2ζωn.

export const NAMED = {
  linear: [0, 0, 1, 1], ease: [0.25, 0.1, 0.25, 1], "ease-in": [0.42, 0, 1, 1], "ease-out": [0, 0, 0.58, 1],
  "ease-in-out": [0.42, 0, 0.58, 1], "M3 standard / emphasized": [0.2, 0, 0, 1],
  "M3 emphasized-decelerate": [0.05, 0.7, 0.1, 1], "M3 emphasized-accelerate": [0.3, 0, 0.8, 0.15],
  "M2 standard": [0.4, 0, 0.2, 1], "ease-out-quart": [0.25, 1, 0.5, 1], "ease-out-expo": [0.16, 1, 0.3, 1],
};
const SETTLE = 0.002; // within 0.2% of the travel = settled (values read from the page are exact; long ease-out tails matter)

// y of a cubic-bezier(x1,y1,x2,y2) at time fraction x (0..1)
export function bezier(x1, y1, x2, y2, x) {
  const bx = (t) => 3 * (1 - t) ** 2 * t * x1 + 3 * (1 - t) * t ** 2 * x2 + t ** 3;
  const by = (t) => 3 * (1 - t) ** 2 * t * y1 + 3 * (1 - t) * t ** 2 * y2 + t ** 3;
  let lo = 0, hi = 1, t = x;
  for (let i = 0; i < 30; i++) { const v = bx(t); if (Math.abs(v - x) < 1e-5) break; if (v < x) lo = t; else hi = t; t = (lo + hi) / 2; }
  return by(t);
}

// Find where the motion starts and settles, and express it as progress u (0 → 1) over time s (0 → 1).
export function normalize(samples) {
  if (samples.length < 3) return null;
  const v0 = samples[0].v, v1 = samples.at(-1).v, span = v1 - v0;
  if (Math.abs(span) < 1e-6) return null;
  const u = samples.map(({ t, v }) => ({ t, u: (v - v0) / span }));
  const iStart = Math.max(0, u.findIndex((p) => Math.abs(p.u) > SETTLE) - 1);
  let iEnd = u.length - 1;
  while (iEnd > iStart && Math.abs(u[iEnd - 1].u - 1) <= SETTLE) iEnd--;
  const t0 = u[iStart].t, t1 = u[iEnd].t, dur = t1 - t0 || 1;
  const pts = u.slice(iStart, iEnd + 1).map((p) => ({ s: (p.t - t0) / dur, u: p.u, ms: p.t - t0 }));
  const peak = pts.reduce((m, p) => (p.u > m.u ? p : m), pts[0]);
  return { from: v0, to: v1, startMs: t0, durationMs: Math.round(dur), pts, overshoot: Math.max(0, peak.u - 1), peakMs: peak.ms };
}

const rmse = (pts, f) => Math.sqrt(pts.reduce((a, p) => a + (f(p.s) - p.u) ** 2, 0) / pts.length);

export function fitBezier(n) {
  const score = (c) => rmse(n.pts, (s) => bezier(...c, s));
  let named = null;
  for (const [name, c] of Object.entries(NAMED)) { const e = score(c); if (!named || e < named.rmse) named = { name, params: c, rmse: e }; }
  let best = { params: named.params, rmse: named.rmse };
  const grid = (cx, cy, step, r) => {
    for (let a = cx[0] - r; a <= cx[0] + r + 1e-9; a += step) for (let b = cy[0] - r; b <= cy[0] + r + 1e-9; b += step)
      for (let c = cx[1] - r; c <= cx[1] + r + 1e-9; c += step) for (let d = cy[1] - r; d <= cy[1] + r + 1e-9; d += step) {
        if (a < 0 || a > 1 || c < 0 || c > 1) continue;
        const p = [a, b, c, d].map((x) => +x.toFixed(3)), e = score(p);
        if (e < best.rmse) best = { params: p, rmse: e };
      }
  };
  grid([0.5, 0.5], [0.5, 0.5], 0.1, 0.5);                       // coarse: x in 0..1, y in 0..1
  for (const step of [0.05, 0.02]) grid([best.params[0], best.params[2]], [best.params[1], best.params[3]], step, step * 3);
  return { type: "bezier", named: named.rmse < 0.03 ? named.name : null, namedNearest: named.name, namedRmse: +named.rmse.toFixed(3),
    params: best.params, css: `cubic-bezier(${best.params.join(", ")})`, rmse: +best.rmse.toFixed(3) };
}

export function fitSpring(n) {
  const os = n.overshoot, L = Math.log(os);
  const zeta = -L / Math.sqrt(Math.PI ** 2 + L ** 2);
  const wn = Math.PI / (n.peakMs / 1000) / Math.sqrt(1 - zeta ** 2);
  return { type: "spring", overshootPct: +(os * 100).toFixed(1), dampingRatio: +zeta.toFixed(2), bounce: +(1 - zeta).toFixed(2),
    responseS: +((2 * Math.PI) / wn).toFixed(2), stiffness: Math.round(wn ** 2), damping: +(2 * zeta * wn).toFixed(1),
    swiftui: `.spring(duration: ${((2 * Math.PI) / wn).toFixed(2)}, bounce: ${(1 - zeta).toFixed(2)})`,
    compose: `spring(dampingRatio = ${zeta.toFixed(2)}f, stiffness = ${Math.round(wn ** 2)}f)` };
}

// One channel → what a designer would write. Overshoot ≥ 1.5% is read as a spring, else a bezier
// (a critically damped spring and an ease-out look alike; both are reported for those).
export function fitChannel(samples) {
  const n = normalize(samples);
  if (!n) return null;
  const base = { from: +n.from.toFixed(3), to: +n.to.toFixed(3), startMs: Math.round(n.startMs), durationMs: n.durationMs, frames: n.pts.length };
  if (n.pts.length < 4) return { ...base, note: "too few frames to fit (≤ 3): a cut or a very short change" };
  return n.overshoot >= 0.015 ? { ...base, ...fitSpring(n), alsoBezier: fitBezier(n) } : { ...base, ...fitBezier(n) };
}

export function selftest() {
  const fails = [], ok = (c, m) => c || fails.push(m);
  const fromBezier = (c, ms, fps = 60) => Array.from({ length: Math.round((ms / 1000) * fps) + 12 }, (_, i) => {
    const t = (i * 1000) / fps - 50; return { t: t + 1000, v: 100 * (t <= 0 ? 0 : t >= ms ? 1 : bezier(...c, t / ms)) };
  });
  const b = fitChannel(fromBezier([0.2, 0, 0, 1], 300));
  ok(b.type === "bezier" && b.named === "M3 standard / emphasized" && Math.abs(b.durationMs - 300) <= 34, "bezier M3 300ms " + JSON.stringify(b));
  const e = fitChannel(fromBezier([0.42, 0, 0.58, 1], 450));
  ok(e.named === "ease-in-out" && Math.abs(e.durationMs - 450) <= 34, "ease-in-out 450ms " + JSON.stringify(e));
  const spring = (zeta, response, fps = 60) => { const wn = (2 * Math.PI) / response, wd = wn * Math.sqrt(1 - zeta ** 2);
    return Array.from({ length: fps * 2 }, (_, i) => { const t = i / fps; return { t: 1000 + t * 1000, v: t === 0 ? 0 : 1 - Math.exp(-zeta * wn * t) * (Math.cos(wd * t) + (zeta / Math.sqrt(1 - zeta ** 2)) * Math.sin(wd * t)) }; }); };
  const s = fitChannel(spring(0.6, 0.4));
  ok(s.type === "spring" && Math.abs(s.dampingRatio - 0.6) <= 0.05 && Math.abs(s.responseS - 0.4) <= 0.05, "spring ζ.6 r.4 " + JSON.stringify(s));
  const s2 = fitChannel(spring(0.8, 0.35));
  ok(s2.type === "spring" && Math.abs(s2.dampingRatio - 0.8) <= 0.06 && Math.abs(s2.bounce - 0.2) <= 0.06, "spring ζ.8 " + JSON.stringify(s2));
  ok(fitChannel([{ t: 0, v: 0 }, { t: 16, v: 0 }, { t: 33, v: 1 }, { t: 50, v: 1 }]).note, "cut");
  console.log(fails.length ? "FAIL\n" + fails.join("\n") : "selftest PASS (bezier M3, ease-in-out, springs ζ 0.6 and 0.8, cut)");
  if (fails.length) process.exitCode = 1;
}
if (process.argv[2] === "--selftest" && process.argv[1] && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) selftest();
