// J1 home keyboard pass + accessibility tree; end screen (gameFinished) semantics.
import puppeteer from "puppeteer-core";
import fs from "node:fs";
const E = new URL(".", import.meta.url).pathname;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await puppeteer.launch({ headless: true,
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const R = {};
const page = await (await browser.createBrowserContext()).newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("https://userinyerface.com/", { waitUntil: "load", timeout: 25000 }).catch(() => {});
await sleep(2500);
const seq = [];
for (let i = 0; i < 10; i++) { await page.keyboard.press("Tab"); seq.push(await page.evaluate(() => { const e = document.activeElement; const s = getComputedStyle(e); return `${e.tagName}:${(e.innerText || e.className).trim().slice(0, 20)} href=${e.getAttribute("href")} outline=${s.outlineStyle}/${s.outlineWidth}`; })); }
R.homeTab = seq;
R.homeLinks = await page.evaluate(() => [...document.querySelectorAll("a,button")].map((e) => ({ tag: e.tagName, text: e.innerText.trim().slice(0, 30), href: e.getAttribute("href"), cls: e.className, cursor: getComputedStyle(e).cursor })));
const ax = await page.accessibility.snapshot();
const flat = []; const walk = (n, d = 0) => { flat.push(`${"  ".repeat(d)}${n.role} "${(n.name || "").slice(0, 70)}"`); (n.children || []).forEach((c) => walk(c, d + 1)); }; walk(ax);
fs.writeFileSync(`${E}ax-home.txt`, flat.join("\n"));
// Does Enter on the HERE link (keyboard) navigate?
const here = await page.evaluate(() => { const a = document.querySelector("a.start__link"); if (!a) return null; a.focus(); return document.activeElement === a; });
if (here) { await Promise.all([page.waitForNavigation({ timeout: 15000 }).catch(() => {}), page.keyboard.press("Enter")]); R.enterOnHere = page.url(); }
await sleep(2500);
// End screen
await page.evaluate(() => { const g = [...document.querySelectorAll("*")].map((e) => e.__vue__).find((v) => v && (v.$options.name || v.$options._componentTag) === "ui-game"); g.gameFinished = true; g.currentPageIndex = -1; });
await sleep(2000);
R.end = await page.evaluate(() => { const i = document.querySelector(".end-screen__image"); return i ? { alt: i.alt, src: i.src, w: i.naturalWidth, h: i.naturalHeight, focus: document.activeElement.tagName, live: !!document.querySelector("[aria-live]"), h1: [...document.querySelectorAll("h1")].map((h) => h.innerText) } : null; });
await page.screenshot({ path: `${E}end-screen-1440.png` });
fs.writeFileSync(E + "home.json", JSON.stringify(R, null, 2));
console.log(JSON.stringify(R, null, 1)); console.log(flat.join("\n"));
await browser.close();
