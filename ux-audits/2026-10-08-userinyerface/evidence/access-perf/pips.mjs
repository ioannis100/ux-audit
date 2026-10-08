// Verify the step pips cycle on their own (activePageIndex) while the card stays on "1 / 4".
import puppeteer from "puppeteer-core";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await puppeteer.launch({ headless: true, executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const page = await (await browser.createBrowserContext()).newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("https://userinyerface.com/game.html", { waitUntil: "load", timeout: 25000 }).catch(() => {});
await sleep(2500);
const s = [];
for (let i = 0; i < 6; i++) { s.push(await page.evaluate(() => [...document.querySelectorAll(".pagination__button")].findIndex((b) => b.classList.contains("is-active")) + 1 + " card=" + document.querySelector(".page-indicator").innerText)); await sleep(1000); }
console.log(s.join(" | "));
await browser.close();
