// Measure one element's motion exactly: every animation frame it reads the element's transform
// (x, y, scale, rotation), opacity and box, plus the declared CSS/WAAPI timing (getAnimations), then
// fits each changing channel to a duration + cubic-bezier (named when it matches a platform token)
// or a spring (damping ratio, response, bounce, SwiftUI/Compose equivalents). Use it for the small
// details: a press scale, a sheet opening, a count pop, a toggle thumb, a toast.
//
// Run from the audit folder, where puppeteer-core is installed:
//   node <skill>/scripts/sample-motion.mjs <url> --target "<css>" --action "<css>"|"js:<code>" \
//        [--ms 1200] [--theme light|dark] [--reduced] [--viewport 390x844] [--name n] [--out dir]
//   import { sampleOnPage } from "<skill>/scripts/sample-motion.mjs";   // on your own live page
//   const r = await sampleOnPage(page, { target: ".sheet", action: { click: ".open" }, name: "sheet-open", out: "evidence/<role>/motion" });
//   node <skill>/scripts/sample-motion.mjs --selftest
// --target: the element that moves (it may not exist before the action: a sheet, a toast). The first
// VISIBLE match is sampled each frame. --action: a click (real mouse, 50 ms press, on the first visible
// match) or js:<code>. To measure a press state, use --action "press:<css>" (mouse down, held for --ms,
// released away from the element so no click fires). Reads transform plus the individual CSS scale,
// translate and rotate properties. A full page load during the action is reported (pageLoad: true).
// Output <out>/<name>.sample.json: declared[] (exact CSS/WAAPI duration, delay, easing per property),
// appearMs, channels{tx,ty,scale,rotate,opacity,width,height}: startMs (after the action), durationMs,
// type bezier (css, named, rmse) | spring (dampingRatio, bounce, responseS, stiffness, swiftui, compose).
// styleChanges[]: filter, box-shadow, colours, borders, outline, top, clip-path on the element and its
// ::before/::after, from → to with the frames they changed in (presses are often a shadow or filter, not a scale).
// Press states: headless Chrome applies CSS :active to mouse presses only without touch emulation, so
// measure presses at a desktop viewport (the output warns when touch emulation is on).
// Reading: declared values are what the code says; channels are what the user sees (JS springs and
// libraries only show up there). Headless at 60 Hz: ±17 ms on start and duration.
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fitChannel, selftest as fitSelftest } from "./lib/motion-fit.mjs";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const SAMPLER = (target) => `(() => {
  const visible = (e) => { const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0 && getComputedStyle(e).visibility !== "hidden"; };
  window.__sm = { frames: [], decl: {}, on: true, styles: [], last: {} };
  const PROPS = ["filter", "box-shadow", "background-color", "color", "border-top-width", "border-bottom-width", "border-top-color", "outline-width", "outline-color", "top", "clip-path"];
  const tick = (ts) => {
    if (!__sm.on) return;
    const el = [...document.querySelectorAll(${JSON.stringify(target)})].find(visible);
    if (!el) __sm.frames.push({ t: ts, present: 0 });
    else {
      const cs = getComputedStyle(el), m = new DOMMatrix(cs.transform === "none" ? undefined : cs.transform), b = el.getBoundingClientRect();
      // CSS individual transform properties (scale: .8; translate: 0 4px; rotate: 5deg) stack on top of transform
      const sc = cs.scale && cs.scale !== "none" ? +cs.scale.split(" ")[0] : 1, tr = cs.translate && cs.translate !== "none" ? cs.translate.split(" ").map(parseFloat) : [0, 0];
      const ro = cs.rotate && cs.rotate !== "none" ? parseFloat(cs.rotate.split(" ").pop()) : 0;
      __sm.frames.push({ t: ts, present: 1, tx: m.m41 + (tr[0] || 0), ty: m.m42 + (tr[1] || 0), scale: Math.hypot(m.a, m.b) * sc, rotate: Math.atan2(m.b, m.a) * 180 / Math.PI + ro,
        opacity: +cs.opacity, width: b.width, height: b.height, x: b.x, y: b.y });
      for (const ps of ["", "::before", "::after"]) { const c = ps ? getComputedStyle(el, ps) : cs; if (ps && c.content === "none") continue;
        for (const k of PROPS) { const key = (ps || "") + k, v = c.getPropertyValue(k);
          if (__sm.last[key] !== v) { __sm.styles.push({ t: ts, key, v }); __sm.last[key] = v; } } }
      for (const a of el.getAnimations({ subtree: true })) {
        const t = a.effect?.getTiming?.() || {}, kf = a.effect?.getKeyframes?.() || [];
        const prop = a.transitionProperty || a.animationName || [...new Set(kf.flatMap((k) => Object.keys(k)))].filter((k) => !/^(offset|easing|composite|computedOffset)$/.test(k)).join(",");
        const key = a.constructor.name + ":" + prop + ":" + (a.effect?.target?.className || "");
        __sm.decl[key] ||= { kind: a.constructor.name, property: prop, target: (a.effect?.target?.tagName || "").toLowerCase() + (typeof a.effect?.target?.className === "string" && a.effect.target.className ? "." + a.effect.target.className.trim().split(/\\s+/).slice(0, 2).join(".") : ""),
          duration: t.duration, delay: t.delay, easing: t.easing !== "linear" ? t.easing : kf[0]?.easing || "linear", seenAt: ts };
      }
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
})()`;

async function act(page, action, holdMs) {
  if (action.js) return page.evaluate(`(async () => { ${action.js} })()`);
  const sel = action.click || action.press;
  const p = await page.evaluate((s) => {
    const el = [...document.querySelectorAll(s)].find((e) => { const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0; });
    if (!el) return null; const b = el.getBoundingClientRect(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 };
  }, sel);
  if (!p) throw new Error(`no visible element for ${sel}`);
  await page.mouse.move(p.x, p.y); await page.mouse.down();
  await sleep(action.press ? holdMs : 50);
  if (!action.press) await page.mouse.up();
}

export async function sampleOnPage(page, { target, action, ms = 1200, name = "sample", out = "motion" }) {
  fs.mkdirSync(out, { recursive: true });
  await page.evaluate(SAMPLER(target));
  await sleep(150);
  const t0 = await page.evaluate(() => performance.now()), startUrl = page.url();
  await act(page, action, ms);
  await sleep(action.press ? 0 : ms);
  if (action.press) { await page.mouse.move(1, 1, { steps: 2 }); await page.mouse.up(); } // released elsewhere: no click fires
  // 4. a full page load wipes the sampler: report it as a result, not a crash
  const raw = await page.evaluate(() => (window.__sm ? (__sm.on = false, { frames: __sm.frames, decl: Object.values(__sm.decl), styles: __sm.styles }) : null)).catch(() => null);
  if (!raw) {
    const result = { name, target, action, url: page.url(), pageLoad: true, startUrl,
      note: "the action caused a full page load (or the page was replaced): the sampler was reset, so no frames. That is itself an observation: an in-app open would keep the page and its scroll position." };
    fs.writeFileSync(path.join(out, `${name}.sample.json`), JSON.stringify(result, null, 1));
    return result;
  }
  const fr = raw.frames.filter((f) => f.t >= t0 - 34);
  const first = fr.find((f) => f.present), appearMs = fr[0]?.present ? 0 : first ? Math.round(first.t - t0) : null;
  const channels = {};
  for (const k of ["tx", "ty", "scale", "rotate", "opacity", "width", "height"]) {
    if ((k === "width" || k === "height") && channels.scale) continue; // the box only echoes the scale
    const s = fr.filter((f) => f.present).map((f) => ({ t: f.t - t0, v: f[k] }));
    if (s.length < 2 || Math.max(...s.map((x) => x.v)) - Math.min(...s.map((x) => x.v)) < (k === "scale" || k === "opacity" ? 0.005 : 0.5)) continue;
    // a press or a pop goes out and back: fit the outward leg and the return leg separately
    const vals = s.map((x) => x.v), endV = vals.at(-1), startV = vals[0];
    const far = vals.reduce((bi, v, i) => (Math.abs(v - startV) > Math.abs(vals[bi] - startV) ? i : bi), 0);
    const returns = Math.abs(endV - startV) < 0.2 * Math.abs(vals[far] - startV);
    channels[k] = returns ? { outAndBack: true, out: fitChannel(s.slice(0, far + 1)), back: fitChannel(s.slice(far)), peak: +vals[far].toFixed(3) } : fitChannel(s);
  }
  // non-geometric state changes (filter, shadow, colour, border, outline) on the element and its ::before/::after
  const styleChanges = [];
  for (const key of [...new Set(raw.styles.map((x) => x.key))]) {
    const seq = raw.styles.filter((x) => x.key === key), before = seq.filter((x) => x.t < t0).at(-1), after = seq.filter((x) => x.t >= t0);
    if (!after.length || !before) continue;
    const to = after.at(-1).v, via = to === before.v ? [...new Set(after.map((x) => x.v).filter((v) => v !== before.v))] : undefined;
    styleChanges.push({ key, from: before.v, to, ...(via ? { returned: true, via } : {}), firstMs: Math.round(after[0].t - t0), lastMs: Math.round(after.at(-1).t - t0), steps: after.length });
  }
  const touch = await page.evaluate(() => matchMedia("(pointer: coarse)").matches);
  const result = { name, target, action, url: page.url(), styleChanges,
    ...(action.press && touch ? { pressNote: "touch emulation is on: headless Chrome doesn't apply CSS :active to mouse presses under touch emulation; measure press states with --viewport 1280x800 (or check the :active rules in CSS)" } : {}), reducedMotion: await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches),
    theme: await page.evaluate(() => (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")),
    framesSampled: fr.length, appearMs, declared: raw.decl.map(({ seenAt, ...d }) => ({ ...d, seenMs: Math.round(seenAt - t0) })), channels };
  fs.writeFileSync(path.join(out, `${name}.sample.json`), JSON.stringify(result, null, 1));
  return result;
}

export function summary(r) {
  if (r.pageLoad) return `${r.name}: FULL PAGE LOAD (${r.startUrl} → ${r.url}); ${r.note}`;
  const ch = Object.entries(r.channels).map(([k, c]) => {
    const one = (x) => !x ? "?" : x.note ? x.note : `${x.durationMs}ms ${x.type === "spring" ? `spring ζ${x.dampingRatio} bounce ${x.bounce} (${x.overshootPct}% over)` : x.named || x.css}`;
    return c.outAndBack ? `${k}: out ${one(c.out)} → peak ${c.peak} → back ${one(c.back)}` : `${k}: from ${c.from} to ${c.to}, starts +${c.startMs}ms, ${one(c)}`;
  });
  const st = r.styleChanges.map((c) => `${c.key} ${c.from} → ${c.returned ? `${c.via.join(" / ")} → back` : c.to} (+${c.firstMs}${c.lastMs !== c.firstMs ? `–${c.lastMs}` : ""}ms)`);
  return `${r.name}: ${r.appearMs !== null ? `appears +${r.appearMs}ms · ` : ""}${[...ch, ...st].join(" · ") || "no change on the target"}${r.pressNote ? ` · NOTE: ${r.pressNote}` : ""} · declared: ${r.declared.map((d) => `${d.property} ${d.duration}ms ${d.easing}`).join("; ") || "none"}`;
}

const isMain = process.argv[1] && fs.realpathSync(process.argv[1]) === fs.realpathSync(fileURLToPath(import.meta.url));
if (isMain) {
  const argv = process.argv.slice(2);
  if (argv[0] === "--selftest") fitSelftest();
  else {
    const opt = (f, d) => { const i = argv.indexOf(f); return i < 0 ? d : argv[i + 1]; }, has = (f) => argv.includes(f);
    const url = argv[0], target = opt("--target"), a = opt("--action");
    if (!url || !target || !a) { console.error("usage: see the header of sample-motion.mjs"); process.exit(1); }
    const action = a.startsWith("js:") ? { js: a.slice(3) } : a.startsWith("press:") ? { press: a.slice(6) } : { click: a };
    const [w, h] = (opt("--viewport", "390x844")).split("x").map(Number);
    const puppeteer = createRequire(path.join(process.cwd(), "/"))("puppeteer-core");
    const browser = await puppeteer.launch({ headless: true, executablePath: process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
    const page = await (await browser.createBrowserContext()).newPage();
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 2, isMobile: w < 800, hasTouch: w < 800 });
    await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: opt("--theme", "light") }, ...(has("--reduced") ? [{ name: "prefers-reduced-motion", value: "reduce" }] : [])]);
    await page.goto(url, { waitUntil: "load", timeout: 25000 }).catch(() => {});
    await sleep(2500);
    const r = await sampleOnPage(page, { target, action, ms: +opt("--ms", 1200), name: opt("--name", "sample"), out: path.resolve(opt("--out", "motion")) });
    console.log(summary(r));
    await browser.close();
  }
}
