// Shared helpers for flow-breaker scripts. Never types into the password field.
import puppeteer from "puppeteer-core";
import fs from "node:fs";
export const E = new URL(".", import.meta.url).pathname;
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export const VP = {
  390: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  1440: { width: 1440, height: 900, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
};
export async function launch() {
  return puppeteer.launch({ headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
}
// Fresh context per scenario; records network + console.
export async function open(browser, w, url = "https://userinyerface.com/game.html") {
  const ctx = await browser.createBrowserContext();
  const page = await ctx.newPage();
  await page.setViewport(VP[w]);
  const net = [], con = [];
  page.on("request", (r) => net.push({ t: Date.now(), m: r.method(), u: r.url().slice(0, 140) }));
  page.on("requestfailed", (r) => net.push({ t: Date.now(), fail: r.failure()?.errorText, u: r.url().slice(0, 140) }));
  page.on("console", (m) => con.push(`${m.type()}: ${m.text().slice(0, 160)}`));
  page.on("pageerror", (e) => con.push("pageerror: " + e.message.slice(0, 160)));
  // Block downloads (Download image button): record, don't save.
  const cdp = await page.createCDPSession();
  await cdp.send("Browser.setDownloadBehavior", { behavior: "deny" }).catch(() => {});
  const t0 = Date.now();
  await page.goto(url, { waitUntil: "load", timeout: 25000 }).catch(() => {});
  await sleep(2500);
  return { ctx, page, net, con, loadMs: Date.now() - t0 };
}
export const G = `[...document.querySelectorAll("*")].map(e => e.__vue__).find(v => v && (v.$options.name || v.$options._componentTag) === "ui-game")`;
export const game = (page, expr) => page.evaluate(`(() => { const g = ${G}; return (${expr}); })()`);
// Jump to a real step (currentPageIndex drives the rendered component; activePageIndex is the fake pip carousel).
export async function goStep(page, idx) {
  await game(page, `(g.currentPageIndex = ${idx}, g.cookiesIsActive = false, true)`);
  await sleep(800);
  const ind = await page.$eval(".page-indicator", (e) => e.innerText.trim()).catch(() => null);
  if (ind !== `${idx + 1} / 4`) throw new Error(`goStep(${idx}): card shows "${ind}"`);
  return ind;
}
export const shot = (page, name, full = false) => page.screenshot({ path: E + name + ".png", fullPage: full });
export const save = (name, obj) => fs.writeFileSync(E + name + ".json", JSON.stringify(obj, null, 2));
export const text = (page) => page.evaluate(() => document.body.innerText.replace(/\s+/g, " ").trim());
// Click element by visible text (exact, trimmed) among selector matches.
export async function clickText(page, sel, txt, opts = {}) {
  const h = await page.evaluateHandle((sel, txt) => [...document.querySelectorAll(sel)].find((e) => e.innerText.trim().replace(/\s+/g, " ") === txt && e.getBoundingClientRect().width > 0), sel, txt);
  const el = h.asElement();
  if (!el) throw new Error(`no ${sel} "${txt}"`);
  await el.click(opts);
  return el;
}
// Feedback probe: mutate-count + screenshot +300ms after an action.
export async function probe(page, name, action) {
  await page.evaluate(() => { window.__mut = 0; window.__mo?.disconnect(); window.__mo = new MutationObserver((l) => (window.__mut += l.length)); window.__mo.observe(document.body, { subtree: true, childList: true, attributes: true, characterData: true }); });
  const t = Date.now();
  await action();
  await sleep(300);
  const m = await page.evaluate(() => window.__mut);
  await shot(page, name);
  return { name, mutationsIn300ms: m, ms: Date.now() - t };
}
// Real pointer hit at element centre (tap on phone, click on desktop). Reports what is on top first.
export async function hit(page, target, w) {
  const el = typeof target === "string" ? await page.$(target) : target;
  if (!el) throw new Error("hit: no element " + target);
  const info = await el.evaluate((e) => { e.scrollIntoView({ block: "center", inline: "nearest", behavior: "instant" }); const r = e.getBoundingClientRect(); const x = r.x + r.width / 2, y = r.y + r.height / 2; const t = document.elementFromPoint(x, y); return { x: x - visualViewport.offsetLeft, y: y - visualViewport.offsetTop, top: e === t || e.contains(t) ? "self" : String(t?.className || t?.tagName).slice(0, 50) }; });
  if (w === 390) await page.touchscreen.tap(info.x, info.y); else await page.mouse.click(info.x, info.y);
  return info.top;
}
export async function hitText(page, sel, txt, w) {
  const h = await page.evaluateHandle((sel, txt) => [...document.querySelectorAll(sel)].find((e) => e.innerText.trim().replace(/\s+/g, " ") === txt && e.getBoundingClientRect().width > 0), sel, txt);
  if (!h.asElement()) throw new Error(`no ${sel} "${txt}"`);
  return hit(page, h.asElement(), w);
}
