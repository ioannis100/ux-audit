// Step 3 country dropdown: are options text or flag-only? grayscale filter? Screenshot open list at 390.
import puppeteer from "puppeteer-core";
const E = new URL(".", import.meta.url).pathname;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await puppeteer.launch({ headless: true, executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const page = await (await browser.createBrowserContext()).newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await page.goto("https://userinyerface.com/game.html", { waitUntil: "load", timeout: 25000 }).catch(() => {});
await sleep(3000);
await page.evaluate(() => { const g = [...document.querySelectorAll("*")].map((e) => e.__vue__).find((v) => v && (v.$options.name || v.$options._componentTag) === "ui-game"); g.activePageIndex = 2; g.currentPageIndex = 2; g.cookiesIsActive = false; });
await sleep(1200);
const hdr = await page.evaluate(() => { const h = document.querySelector(".country-dropdown .dropdown__header"); h.scrollIntoView({ block: "start", behavior: "instant" }); const r = h.getBoundingClientRect(); return { x: r.x + 20, y: r.y + r.height / 2 }; });
await page.touchscreen.tap(hdr.x, hdr.y); await sleep(800);
const r = await page.evaluate(() => { const it = [...document.querySelectorAll(".country-dropdown .dropdown__list > div")]; const r0 = it[0].getBoundingClientRect(); return { items: it.length, withText: it.filter((e) => e.innerText.trim()).length, withAriaOrTitle: it.filter((e) => e.getAttribute("aria-label") || e.title).length, filter: getComputedStyle(it[0]).filter, size: [r0.width, r0.height].map(Math.round), open: document.querySelector(".country-dropdown").className }; });
console.log(JSON.stringify(r));
await page.screenshot({ path: `${E}country-dropdown-open-390.png` });
await browser.close();
