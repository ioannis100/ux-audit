// Shared helpers for feel-engagement scenarios. Never types into the password field.
import puppeteer from "puppeteer-core";
export const E = new URL(".", import.meta.url).pathname;
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export const URL_GAME = "https://userinyerface.com/game.html";

export async function launch() {
  return puppeteer.launch({ headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
}

export async function open(browser, { w = 1440, h = 900, mobile = false, url = URL_GAME } = {}) {
  const ctx = await browser.createBrowserContext();
  const page = await ctx.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile });
  const reqs = [];
  page.on("request", (r) => reqs.push({ t: Date.now(), m: r.method(), u: r.url().slice(0, 140) }));
  const t0 = Date.now();
  await page.goto(url, { waitUntil: "load", timeout: 25000 }).catch(() => {});
  return { ctx, page, reqs, loadMs: Date.now() - t0 };
}

// ui-game's own state: currentPageIndex is the real step (0..3); activePageIndex is the cycling pagination.
export const game = (page, fn, arg) => page.evaluate((fnSrc, arg) => {
  const g = [...document.querySelectorAll("*")].map((e) => e.__vue__).find((v) => v && (v.$options.name || v.$options._componentTag) === "ui-game");
  return new Function("g", "arg", fnSrc)(g, arg);
}, fn, arg);

export const styleOf = (page, sel, props = ["color", "backgroundColor", "borderColor", "borderWidth", "outlineStyle", "outlineWidth", "boxShadow", "transform", "cursor", "opacity", "textDecorationLine", "fontSize", "fontWeight"]) =>
  page.evaluate((sel, props) => {
    const e = typeof sel === "string" ? document.querySelector(sel) : null;
    if (!e) return null;
    const s = getComputedStyle(e), r = e.getBoundingClientRect();
    const o = { w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y), text: (e.innerText || "").trim().slice(0, 40), tag: e.tagName, disabledAttr: e.disabled ?? null, tabIndex: e.tabIndex };
    for (const p of props) o[p] = s[p];
    return o;
  }, sel, props);

// default / hover / pressed (mousedown, then move off before mouseup so no click fires) / focus
export async function states(page, sel) {
  const out = { default: await styleOf(page, sel) };
  if (!out.default) return null;
  const box = await page.evaluate((sel) => { const e = document.querySelector(sel); document.documentElement.style.scrollBehavior = "auto"; e.scrollIntoView({ block: "center", behavior: "instant" }); const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; }, sel);
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await sleep(400);
  out.hover = await styleOf(page, sel);
  await page.mouse.down(); await sleep(120);
  out.pressed = await styleOf(page, sel);
  await page.mouse.move(2, 2); await page.mouse.up(); await sleep(300);
  await page.evaluate((sel) => document.querySelector(sel).focus(), sel); await sleep(300);
  out.focus = await styleOf(page, sel);
  out.focusIsActive = await page.evaluate((sel) => document.activeElement === document.querySelector(sel), sel);
  await page.evaluate(() => document.activeElement && document.activeElement.blur());
  const diff = {};
  for (const k of ["hover", "pressed", "focus"]) {
    diff[k] = Object.keys(out.default).filter((p) => !["text", "x", "y"].includes(p) && JSON.stringify(out.default[p]) !== JSON.stringify(out[k][p])).map((p) => `${p}: ${out.default[p]} -> ${out[k][p]}`);
  }
  out.diff = diff;
  return out;
}

export const text = (page) => page.evaluate(() => document.body.innerText.replace(/\s+/g, " ").trim());
