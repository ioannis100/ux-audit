// Inventory all 4 game steps + modals by setting ui-game's own page index (no password typed).
import puppeteer from "puppeteer-core";
import fs from "node:fs";
const E = new URL(".", import.meta.url).pathname;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await puppeteer.launch({ headless: true,
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const out = {};
for (const [w, h, mobile] of [[1440, 900, false], [390, 844, true]]) {
  const page = await (await browser.createBrowserContext()).newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile });
  await page.goto("https://userinyerface.com/game.html", { waitUntil: "load", timeout: 25000 }).catch(() => {});
  await sleep(2500);
  const snap = (label) => page.evaluate((label) => {
    const vis = (e) => { const r = e.getBoundingClientRect(), s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none" && +s.opacity > 0; };
    const g = [...document.querySelectorAll("*")].map((e) => e.__vue__).find((v) => v && (v.$options.name || v.$options._componentTag) === "ui-game");
    const els = [...document.querySelectorAll("a,button,input,select,textarea,label,[class*=button],[class*=checkbox],[class*=dropdown],[class*=modal],[class*=cookie],[class*=help]")].filter(vis)
      .map((e) => { const r = e.getBoundingClientRect(); return { tag: e.tagName, type: e.type || null, cls: String(e.className).slice(0, 45), text: (e.innerText || e.value || e.placeholder || "").trim().replace(/\s+/g, " ").slice(0, 50), x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }; });
    return { label, page: g && g.activePageIndex, cookies: g && g.cookiesIsActive, timerModal: g && g.timerModalIsActive, pagesMeta: g && JSON.stringify(g.pages).slice(0, 300), text: document.body.innerText.replace(/\s+/g, " ").slice(0, 900), els: els.slice(0, 60) };
  }, label);
  const k = `${w}`;
  out[k] = [await snap("step1+initial")];
  await page.screenshot({ path: `${E}step1-${w}.png` });
  for (const idx of [1, 2, 3]) {
    await page.evaluate((idx) => { const g = [...document.querySelectorAll("*")].map((e) => e.__vue__).find((v) => v && (v.$options.name || v.$options._componentTag) === "ui-game"); g.activePageIndex = idx; if ("currentPageIndex" in g) g.currentPageIndex = idx; }, idx);
    await sleep(1200);
    out[k].push(await snap(`step${idx + 1}`));
    await page.screenshot({ path: `${E}step${idx + 1}-${w}.png` });
  }
  await sleep(30000); // let timers/modals fire
  out[k].push(await snap("after+30s"));
  await page.screenshot({ path: `${E}after30s-${w}.png` });
}
fs.writeFileSync(E + "recon2.json", JSON.stringify(out, null, 2));
for (const [k, v] of Object.entries(out)) for (const s of v) console.log(k, s.label, "| page", s.page, "| cookies", s.cookies, "| timerModal", s.timerModal, "\n  ", s.text.slice(0, 420), "\n   els:", s.els.map((e) => `${e.tag}:${e.text || e.cls}`).slice(0, 18).join(" · "));
await browser.close();
