// Render and check a mock-up made by agents/mockup-maker.md.
// Usage (from the audit folder, where puppeteer-core is installed):
//   node <skill>/scripts/render-mockup.mjs mockups/<screen>.html
// Writes <screen>-overview.png, <screen>-<phone id>.png and, when a phone's `.scroll` overflows,
// <screen>-<phone id>-full.png next to the HTML. Prints JSON: console errors, broken images,
// contrast failures measured with extract-design.js on the mock-up itself, and feature parity:
// every entry of <script type="application/json" id="parity">[{"feature","selector"} | {"feature","removed":"<report ID>"}]
// must resolve in at least one After phone (.phone[id]). All of errors, brokenImages,
// contrastFailures and missingFeatures must be empty or 0. hiddenFeatures (in the DOM but not
// visible in the rendered state) is a prompt to check, not a failure.
// Identity (mockup-maker step 0): <script type="application/json" id="identity">{"fonts":["Inter"],
// "colors":["#00bfff",...],"hueTolerance":12,"logo":"#p1 [data-identity=logo]","changes":[{"what","from","to","id"}]}</script>.
// Every text element, surface, border, gradient, shadow and SVG paint inside the After phones is checked:
// foreignFonts (first font-family not in `fonts`; system and emoji faces allowed) and foreignColors
// (a colour not within 2/channel of one listed in `colors` or `changes`, and not a same-hue tint or shade
// of a vivid listed colour: hue within hueTolerance and HSL saturation within satTolerance, default .3).
// True greys (channel spread < 6) are skipped; photos (<img>, <video>, url() backgrounds) are never read.
// foreignFonts.count, foreignColors.count must be 0, logoMissing false and identityError null.
// A product with no logo declares "noLogo": "<reason>" instead of "logo".
// Drift audit of an existing mock-up: pass <audit>/evidence/mockup-maker/identity.json as a second argument;
// its "check" object replaces the embedded block.
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const require = createRequire(path.join(process.cwd(), "/"));
const puppeteer = require("puppeteer-core");
const file = path.resolve(process.argv[2] || "");
if (!fs.existsSync(file)) { console.error("usage: node render-mockup.mjs <mockup.html>"); process.exit(1); }
const out = file.replace(/\.html$/, "");
const extract = fs.readFileSync(new URL("./extract-design.js", import.meta.url), "utf8");
const chrome = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const browser = await puppeteer.launch({ headless: true, executablePath: chrome, args: ["--allow-file-access-from-files"] });
const page = await browser.newPage();
await page.setViewport({ width: 1720, height: 1000 });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
await page.goto("file://" + encodeURI(file), { waitUntil: "load", timeout: 30000 }).catch(() => {});
await new Promise((r) => setTimeout(r, 3000));
// Lazy images below a phone's fold would be skipped by the broken-image check and blank in -full.png: load them all.
await page.evaluate(() => Promise.race([
  Promise.all([...document.images].map((i) => { i.loading = "eager"; return i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; }); })),
  new Promise((r) => setTimeout(r, 15000)),
]).then(() => Promise.all([...document.images].map((i) => i.decode().catch(() => {})))));
await page.screenshot({ path: `${out}-overview.png`, fullPage: true });

const shots = [`${path.basename(out)}-overview.png`];
const phones = await page.$$(".phone[id]");
for (const p of phones) {
  const name = `${out}-${await p.evaluate((e) => e.id)}.png`;
  await p.screenshot({ path: name });
  shots.push(path.basename(name));
  // Below-the-fold content: unroll the phone's scroller once so the agent can see all of it.
  if (await p.evaluate((e) => { const s = e.querySelector(".scroll"); return !!s && s.scrollHeight > s.clientHeight + 4; })) {
    const full = `${out}-${await p.evaluate((e) => e.id)}-full.png`;
    await p.evaluate((e) => { const s = e.querySelector(".scroll"); s.scrollTop = 0; e.dataset.h = e.style.height; e.style.height = s.scrollHeight + "px"; s.dataset.o = s.style.cssText; s.style.height = "100%"; s.style.overflow = "visible"; });
    await p.screenshot({ path: full });
    await p.evaluate((e) => { e.style.height = e.dataset.h; const s = e.querySelector(".scroll"); s.style.cssText = s.dataset.o; });
    shots.push(path.basename(full));
  }
}
const parity = await page.evaluate(() => {
  const el = document.getElementById("parity");
  if (!el) return { declared: 0, removed: [], missing: ["no <script id=\"parity\"> block: run the feature inventory (mockup-maker step 1)"], hidden: [] };
  let list; try { list = JSON.parse(el.textContent); } catch (e) { return { declared: 0, removed: [], missing: ["parity JSON does not parse: " + e.message], hidden: [] }; }
  const phones = [...document.querySelectorAll(".phone[id]")];
  const r = { declared: list.length, removed: [], missing: [], hidden: [] };
  for (const f of list) {
    if (f.removed) { r.removed.push(`${f.feature} (removed per ${f.removed})`); continue; }
    let hits = [];
    try { hits = phones.map((p) => p.querySelector(f.selector)).filter(Boolean); } catch { r.missing.push(`${f.feature}: invalid selector ${f.selector}`); continue; }
    if (!hits.length) r.missing.push(`${f.feature}: ${f.selector}`);
    else if (!hits.some((h) => h.getClientRects().length && getComputedStyle(h).visibility !== "hidden")) r.hidden.push(`${f.feature}: ${f.selector}`);
  }
  return r;
});
const idFile = process.argv[3] && JSON.parse(fs.readFileSync(path.resolve(process.argv[3]), "utf8"));
const identity = await page.evaluate((given) => {
  const el = document.getElementById("identity");
  if (!given && !el) return { error: 'no <script type="application/json" id="identity"> block: run identity capture (mockup-maker step 0)' };
  let id; try { id = given || JSON.parse(el.textContent); } catch (e) { return { error: "identity JSON does not parse: " + e.message }; }
  const probe = document.body.appendChild(document.createElement("i"));
  const norm = (c) => { probe.style.color = ""; probe.style.color = c; return probe.style.color ? getComputedStyle(probe).color : null; };
  const parse = (c) => { const m = c && c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
  const hsl = ({ r, g, b }) => {
    const [R, G, B] = [r / 255, g / 255, b / 255], max = Math.max(R, G, B), min = Math.min(R, G, B), d = max - min, l = (max + min) / 2;
    const h = !d ? 0 : ((max === R ? ((G - B) / d) % 6 : max === G ? (B - R) / d + 2 : (R - G) / d + 4) * 60 + 360) % 360;
    return { h, s: d ? d / (1 - Math.abs(2 * l - 1)) : 0, spread: d * 255 };
  };
  const hex = ({ r, g, b }) => "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
  const listed = [...(id.colors || []), ...(id.changes || []).flatMap((c) => [c.from, c.to])].map(norm).map(parse).filter(Boolean);
  const vivid = listed.map((c) => ({ ...c, ...hsl(c) })).filter((c) => c.spread >= 38); // ponytail: "vivid" = channel spread ≥ 38; tinted neutrals must be listed exactly
  const tol = id.hueTolerance ?? 12, satTol = id.satTolerance ?? 0.3;
  const ok = (c) => {
    if (c.a < 0.1) return true;
    const x = hsl(c);
    if (x.spread < 6) return true; // true grey
    if (listed.some((L) => Math.abs(L.r - c.r) <= 2 && Math.abs(L.g - c.g) <= 2 && Math.abs(L.b - c.b) <= 2)) return true;
    return vivid.some((V) => Math.min(Math.abs(x.h - V.h), 360 - Math.abs(x.h - V.h)) <= tol && Math.abs(x.s - V.s) <= satTol);
  };
  const fonts = (id.fonts || []).map((f) => f.toLowerCase());
  const system = /^(-apple-system|blinkmacsystemfont|system-ui|ui-sans-serif|ui-monospace|ui-rounded|sans-serif|monospace|sf pro.*|sf mono|sfmono-regular|sf compact.*|menlo|roboto|apple color emoji|segoe ui emoji|segoe ui symbol|noto color emoji)$/;
  const where = (e) => { const p = e.closest(".phone[id]"); const c = [...e.classList].slice(0, 2).join("."); return `#${p.id} ${e.tagName.toLowerCase()}${c ? "." + c : ""}`; };
  const badColors = new Map(), badFonts = new Map();
  const note = (map, key, e, prop) => { const v = map.get(key) || { hits: 0, example: `${where(e)} (${prop})` }; v.hits++; map.set(key, v); };
  const paint = (e, prop, value) => { for (const m of String(value || "").matchAll(/rgba?\([^)]+\)/g)) { const c = parse(m[0]); if (c && !ok(c)) note(badColors, hex(c), e, prop); } };
  const SKIP = /^(IMG|VIDEO|CANVAS|PICTURE|SOURCE|IFRAME|SCRIPT|STYLE|svg|symbol|defs|title)$/;
  for (const e of document.querySelectorAll(".phone[id], .phone[id] *")) {
    if (SKIP.test(e.tagName)) continue;
    const s = getComputedStyle(e);
    if (e.matches(".phone[id]")) { paint(e, "canvas", s.backgroundColor); paint(e, "canvas", s.backgroundImage.replace(/url\([^)]*\)/g, "")); continue; } // its box-shadow is the device bezel
    if (e instanceof SVGElement) { paint(e, "fill", s.fill); paint(e, "stroke", s.stroke); if (e.tagName === "stop") paint(e, "stop-color", s.stopColor); continue; }
    const text = [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) || /^(INPUT|TEXTAREA|SELECT)$/.test(e.tagName);
    if (text) {
      paint(e, "color", s.color);
      const fam = s.fontFamily.split(",")[0].replace(/["']/g, "").trim();
      if (!fonts.includes(fam.toLowerCase()) && !system.test(fam.toLowerCase())) note(badFonts, fam, e, "font-family");
    }
    for (const st of [s, getComputedStyle(e, "::before"), getComputedStyle(e, "::after")]) {
      if (st !== s && st.content === "none") continue;
      paint(e, "background", st.backgroundColor);
      paint(e, "background-image", st.backgroundImage.replace(/url\([^)]*\)/g, ""));
      paint(e, "box-shadow", st.boxShadow);
      for (const side of ["Top", "Right", "Bottom", "Left"]) if (parseFloat(st[`border${side}Width`]) > 0 && st[`border${side}Style`] !== "none") paint(e, "border", st[`border${side}Color`]);
    }
  }
  probe.remove();
  const top = (map) => [...map].sort((a, b) => b[1].hits - a[1].hits).slice(0, 8).map(([k, v]) => ({ value: k, ...v }));
  const sum = (map) => [...map.values()].reduce((n, v) => n + v.hits, 0);
  let logoMissing = !id.noLogo;
  if (id.logo) { try { logoMissing = !document.querySelector(id.logo); } catch { logoMissing = true; } }
  return { error: null, changes: (id.changes || []).length, foreignFonts: { count: sum(badFonts), examples: top(badFonts) }, foreignColors: { count: sum(badColors), examples: top(badColors) }, logoMissing };
}, idFile ? idFile.check || idFile : null);
const brokenImages = await page.evaluate(() => [...document.images].filter((i) => i.complete && !i.naturalWidth).map((i) => i.src));
const design = await page.evaluate(extract);
await browser.close();

console.log(JSON.stringify({
  screenshots: shots,
  errors,
  brokenImages,
  contrastFailures: design.color?.contrastFailures ?? null,
  contrastExamples: design.color?.contrastExamples ?? [],
  featuresDeclared: parity.declared,
  missingFeatures: parity.missing,
  removedFeatures: parity.removed,
  hiddenFeatures: parity.hidden,
  identityError: identity.error,
  identityChanges: identity.changes ?? 0,
  foreignFonts: identity.foreignFonts ?? null,
  foreignColors: identity.foreignColors ?? null,
  logoMissing: identity.logoMissing ?? true,
}, null, 2));
