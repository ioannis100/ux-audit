// visual-craft: screenshots + extract-design.js + targeted computed-style probes per step/width.
// No password typed. Steps 2-4 reached via ui-game.activePageIndex (brief-approved).
import puppeteer from "puppeteer-core";
import fs from "node:fs";
const E = new URL(".", import.meta.url).pathname;
const EXTRACT = fs.readFileSync("~/.claude/skills/ux-audit/scripts/extract-design.js", "utf8");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await puppeteer.launch({ headless: true,
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const widths = (process.argv[2] || "1440,390,320").split(",").map(Number);

// Probe: computed styles + contrast for the elements a sign-up form lives or dies by.
const PROBE = () => {
  const parse = (c) => { const m = (c || "").match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
  const blend = (t, b) => ({ r: t.r * t.a + b.r * (1 - t.a), g: t.g * t.a + b.g * (1 - t.a), b: t.b * t.a + b.b * (1 - t.a), a: 1 });
  const lum = ({ r, g, b }) => { const f = (v) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4); return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return +((x + 0.05) / (y + 0.05)).toFixed(2); };
  const bgOf = (el) => { const L = []; for (let n = el; n; n = n.parentElement) { const s = getComputedStyle(n); const c = parse(s.backgroundColor); if (c && c.a > 0) { L.push(c); if (c.a >= 1) break; } } let base = { r: 255, g: 255, b: 255, a: 1 }; for (const l of L.reverse()) base = blend(l, base); return base; };
  const hex = (c) => c ? "#" + [c.r, c.g, c.b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("") : null;
  const vis = (e) => { const r = e.getBoundingClientRect(), s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none" && +s.opacity > 0; };
  const info = (e, extra = {}) => {
    const s = getComputedStyle(e), r = e.getBoundingClientRect(), bg = bgOf(e), fg = parse(s.color);
    const o = { text: (e.innerText || e.value || "").trim().replace(/\s+/g, " ").slice(0, 40), cls: String(e.className).slice(0, 60), x: Math.round(r.x), y: Math.round(r.y + scrollY), w: Math.round(r.width), h: Math.round(r.height),
      color: hex(fg), bg: hex(bg), contrast: fg ? ratio(fg.a < 1 ? blend(fg, bg) : fg, bg) : null, font: `${s.fontWeight} ${s.fontSize}/${s.lineHeight} ${s.fontFamily.split(",")[0]}`,
      border: `${s.borderTopWidth} ${s.borderTopStyle} ${hex(parse(s.borderTopColor))}`, borderVsBg: parse(s.borderTopColor) && parseFloat(s.borderTopWidth) > 0 ? ratio(parse(s.borderTopColor), bgOf(e.parentElement || e)) : null,
      radius: s.borderTopLeftRadius, padding: s.padding, deco: s.textDecorationLine, transform: s.textTransform, letterSpacing: s.letterSpacing, align: s.textAlign, ...extra };
    return o;
  };
  const q = (sel) => [...document.querySelectorAll(sel)].filter(vis);
  const out = {};
  out.buttons = q("button, a[class*=button], .button--secondary, .button-container__secondary a").map((e) => info(e));
  out.inputs = q("input:not([type=hidden]), textarea, .dropdown__field").map((e) => {
    const ph = getComputedStyle(e, "::placeholder"); const pc = parse(ph.color); const bg = bgOf(e);
    return info(e, { placeholder: e.placeholder || null, placeholderColor: hex(pc), placeholderContrast: pc && e.placeholder ? ratio(pc.a < 1 ? blend(pc, bg) : pc, bg) : null, maxLength: e.maxLength > 0 ? e.maxLength : null, type: e.type || null });
  });
  out.labels = q("label, .personal-details__label, [class*=label], h1, h2, h3, h4, p, .avatar-and-interests__title, [class*=title], [class*=instruction], [class*=rule], li").filter((e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1)).map((e) => info(e)).slice(0, 80);
  out.pips = q(".pagination__button").map((e) => info(e, { active: e.classList.contains("is-active"), boxShadow: getComputedStyle(e).boxShadow }));
  out.checkboxes = q(".checkbox__box, .checkbox").map((e) => info(e, { checked: !!e.closest(".checkbox")?.querySelector("input")?.checked })).slice(0, 30);
  out.images = q("img, [style*=background-image]").map((e) => ({ src: (e.currentSrc || getComputedStyle(e).backgroundImage || "").split("/").pop().slice(0, 60), natural: e.naturalWidth ? `${e.naturalWidth}x${e.naturalHeight}` : null, rendered: `${Math.round(e.getBoundingClientRect().width)}x${Math.round(e.getBoundingClientRect().height)}`, fit: getComputedStyle(e).objectFit, filter: getComputedStyle(e).filter, alt: e.alt ?? null })).slice(0, 30);
  const g = [...document.querySelectorAll("*")].map((e) => e.__vue__).find((v) => v && (v.$options.name || v.$options._componentTag) === "ui-game");
  out.state = g ? { page: g.activePageIndex, cookies: g.cookiesIsActive, timerModal: g.timerModalIsActive, confirm: g.confirmModalIsActive, terms: g.termsAndConditionsVisible } : null;
  out.doc = { w: document.documentElement.scrollWidth, h: document.documentElement.scrollHeight, iw: innerWidth };
  return out;
};

const gotoGame = async (w, h, mobile, url = "https://userinyerface.com/game.html") => {
  const page = await (await browser.createBrowserContext()).newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile });
  await page.goto(url, { waitUntil: "load", timeout: 25000 }).catch(() => {});
  await sleep(2500);
  return page;
};
const setStep = (page, idx) => page.evaluate((idx) => { const g = [...document.querySelectorAll("*")].map((e) => e.__vue__).find((v) => v && (v.$options.name || v.$options._componentTag) === "ui-game"); g.currentPageIndex = idx; }, idx); // currentPageIndex drives the card; activePageIndex only drives the (fake, auto-cycling) pips
const snap = async (page, name) => {
  await page.screenshot({ path: `${E}${name}.png`, fullPage: true });
  const ext = await page.evaluate(EXTRACT);
  const probe = await page.evaluate(PROBE);
  fs.writeFileSync(`${E}${name}.json`, JSON.stringify({ extract: ext, probe }, null, 2));
  console.log("saved", name, ext.page?.viewport, "overflow", ext.page?.horizontalOverflow, "doc", probe.doc);
};

for (const w of widths) {
  const mobile = w < 768, h = w === 1440 ? 900 : 844;
  // Home
  let page = await gotoGame(w, h, mobile, "https://userinyerface.com/");
  await snap(page, `home-${w}`);
  await page.close();
  // Game steps (cookie banner present)
  page = await gotoGame(w, h, mobile);
  await page.screenshot({ path: `${E}step1-${w}-viewport.png` });
  await snap(page, `step1-${w}`);
  for (const idx of [1, 2, 3]) { await setStep(page, idx); await sleep(1200); await snap(page, `step${idx + 1}-${w}`); if (idx === 3) await page.screenshot({ path: `${E}step4-${w}-viewport.png` }); }
  await page.close();
}
await browser.close();
