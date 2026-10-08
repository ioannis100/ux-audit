// Jordan, phone 390x844: 5-second test, flash test (0.5 s + blur), first taps on the home page.
import fs from "node:fs";
import { E, sleep, launch, newPage, go, inventory } from "./lib.mjs";
const browser = await launch();
const page = await newPage(browser);
const loadMs = await go(page, "https://userinyerface.com/");
// Flash test: what the eye gets in the first ~0.5 s after paint.
await sleep(500);
await page.screenshot({ path: E + "home-390-flash-0.5s.png" });
await sleep(2000);
await page.screenshot({ path: E + "home-390-5s.png" });
await page.screenshot({ path: E + "home-390-full.png", fullPage: true });
await page.evaluate(() => (document.body.style.filter = "blur(8px)"));
await page.screenshot({ path: E + "home-390-blur.png" });
await page.evaluate(() => (document.body.style.filter = ""));
const info = await page.evaluate((inv) => ({
  title: document.title, iw: innerWidth, docH: document.documentElement.scrollHeight,
  text: document.body.innerText, inv: eval(`(${inv})`)(),
  styles: ["p", ".start__button", ".start__link", ".start__highlight", "u"].map((s) => { const e = document.querySelector(s); if (!e) return null; const c = getComputedStyle(e), r = e.getBoundingClientRect(); return { s, font: c.fontSize, weight: c.fontWeight, color: c.color, bg: c.backgroundColor, cursor: c.cursor, deco: c.textDecorationLine, x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }; }),
}), inventory.toString());
// First instinct: tap the biggest button on screen ("NO").
const before = page.url();
await page.tap(".start__button");
await sleep(1200);
const afterNo = { url: page.url(), changed: page.url() !== before };
await page.screenshot({ path: E + "home-390-after-tap-NO.png" });
// Then tap the words "next page" (highlighted, looks like the target).
await page.tap(".start__highlight").catch((e) => (afterNo.highlightErr = e.message));
await sleep(1200);
const afterHighlight = page.url();
// Then the actual link "HERE".
const tHere = Date.now();
await page.tap(".start__link");
await page.waitForNavigation({ waitUntil: "load", timeout: 25000 }).catch(() => {});
const afterHere = { url: page.url(), ms: Date.now() - tHere };
fs.writeFileSync(E + "home-390.json", JSON.stringify({ loadMs, info, afterNo, afterHighlight, afterHere }, null, 2));
console.log(JSON.stringify({ loadMs, afterNo, afterHighlight, afterHere, styles: info.styles, text: info.text }, null, 1));
await browser.close();
