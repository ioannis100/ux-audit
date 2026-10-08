// Shared helpers for the first-timer (Jordan) walk. No password is ever typed.
import puppeteer from "puppeteer-core";
export const E = new URL(".", import.meta.url).pathname;
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function launch() {
  return puppeteer.launch({ headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
}

export async function newPage(browser, w = 390, h = 844) {
  const ctx = await browser.createBrowserContext();
  const page = await ctx.newPage();
  const mobile = w < 768;
  await page.setViewport({ width: w, height: h, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile });
  const net = [];
  page.on("request", (r) => net.push(`${r.method()} ${r.url().slice(0, 90)}`));
  page.__net = net;
  return page;
}

export async function go(page, url) {
  const t = Date.now();
  await page.goto(url, { waitUntil: "load", timeout: 25000 }).catch(() => {});
  return Date.now() - t;
}

// Interaction log with wall-clock seconds since `t0` and the on-screen timer.
export function logger(page, t0) {
  const log = [];
  const fn = async (action, result) => {
    const timer = await page.evaluate(() => document.querySelector(".timer")?.innerText || "").catch(() => "");
    const row = { t: +((Date.now() - t0()) / 1000).toFixed(1), timer, action, result };
    log.push(row);
    console.log(JSON.stringify(row));
  };
  fn.rows = log;
  return fn;
}

export const game = `[...document.querySelectorAll("*")].map(e => e.__vue__).find(v => v && (v.$options.name || v.$options._componentTag) === "ui-game")`;

// Visible interactive inventory with geometry + font size.
export const inventory = () => {
  const vis = (e) => { const r = e.getBoundingClientRect(), s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none" && +s.opacity > 0; };
  return [...document.querySelectorAll("a,button,input,textarea,[class*=dropdown__field],.toggle-button,.checkbox__box,label")].filter(vis).map((e) => {
    const r = e.getBoundingClientRect(), s = getComputedStyle(e);
    return { tag: e.tagName, type: e.type || null, cls: String(e.className).slice(0, 50), text: (e.innerText || "").trim().replace(/\s+/g, " ").slice(0, 40),
      value: e.value ?? null, placeholder: e.placeholder || null, inputmode: e.inputMode || null, autocomplete: e.autocomplete || null, tabindex: e.getAttribute("tabindex"),
      x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), font: s.fontSize, color: s.color, bg: s.backgroundColor };
  });
};
