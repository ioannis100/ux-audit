// Real hit areas of the custom checkboxes/dropdowns/toggles at 390 (incl. the zoom-out caused by overflow),
// timer-modal contrast, grayscale of the step-1 error state. Never types into "Choose Password".
import puppeteer from "puppeteer-core";
import fs from "node:fs";
const E = new URL(".", import.meta.url).pathname;
const X = fs.readFileSync("~/.claude/skills/ux-audit/scripts/extract-design.js", "utf8");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await puppeteer.launch({ headless: true,
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const game = `[...document.querySelectorAll("*")].map((e) => e.__vue__).find((v) => v && (v.$options.name || v.$options._componentTag) === "ui-game")`;
const R = {};
const page = await (await browser.createBrowserContext()).newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await page.goto("https://userinyerface.com/game.html", { waitUntil: "load", timeout: 25000 }).catch(() => {});
await sleep(3000);
const measure = () => page.evaluate(() => {
  const scale = 390 / innerWidth; // layout viewport wider than the device -> page is zoomed out
  const box = (e) => { const r = e.getBoundingClientRect(); return { w: +r.width.toFixed(1), h: +r.height.toFixed(1), effW: +(r.width * scale).toFixed(1), effH: +(r.height * scale).toFixed(1) }; };
  const q = (s) => [...document.querySelectorAll(s)].filter((e) => e.getBoundingClientRect().width > 0);
  const out = { innerWidth, scale: +scale.toFixed(3), visualViewportScale: visualViewport.scale };
  const lab = q(".checkbox__label"); if (lab.length) out.checkboxLabel = { n: lab.length, ...box(lab[0]), labelTextInside: lab[0].innerText.trim().length > 0 };
  const dd = q(".dropdown__list-item"); if (dd.length) out.dropdownItem = { n: dd.length, ...box(dd[0]) };
  const tg = q(".toggle-button"); if (tg.length) out.toggle = box(tg[0]);
  const sh = q(".slider__handle"); if (sh.length) out.sliderHandle = box(sh[0]);
  const ns = q(".numeric-stepper__button"); if (ns.length) out.stepper = box(ns[0]);
  const hc = q(".help-form__close-button"); if (hc.length) out.helpClose = box(hc[0]);
  const up = q(".avatar-and-interests__upload-button"); if (up.length) out.uploadLink = box(up[0]);
  const tc = q(".login-form__terms-conditions-underline"); if (tc.length) out.tcLink = box(tc[0]);
  const body = getComputedStyle(document.body).fontSize; out.bodyFontPx = body; out.effBodyFontPx = +(parseFloat(body) * scale).toFixed(1);
  return out;
});
R.step1 = await measure();
await page.screenshot({ path: `${E}targets-step1-390.png` });
// Error state, grayscale for colour-alone check
await page.evaluate(() => [...document.querySelectorAll("a")].find((e) => e.innerText.trim() === "Next").click());
await sleep(600);
await page.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; const f = document.querySelector(".login-form"); window.scrollTo({ top: f.getBoundingClientRect().top + scrollY - 40, behavior: "instant" }); });
await page.screenshot({ path: `${E}step1-errors-390.png` });
await page.emulateVisionDeficiency("achromatopsia");
await page.screenshot({ path: `${E}step1-errors-390-grayscale.png` });
await page.emulateVisionDeficiency("none");
R.step1ErrorClasses = await page.evaluate(() => [...document.querySelectorAll(".login-form input.input")].map((i) => i.placeholder + ":" + i.className + ":" + getComputedStyle(i).borderColor));
for (const i of [1, 2, 3]) {
  await page.evaluate(`(() => { const g = ${game}; g.activePageIndex = ${i}; g.currentPageIndex = ${i}; })()`); await sleep(1200);
  if (i === 2) { // open the Title dropdown to measure items
    await page.evaluate(() => document.querySelector(".dropdown__header").click()); await sleep(600);
  }
  R[`step${i + 1}`] = await measure();
  await page.screenshot({ path: `${E}targets-step${i + 1}-390.png` });
}
// Timer modal contrast (1440, white modal)
await page.setViewport({ width: 1440, height: 900 }); await sleep(500);
await page.evaluate(`(() => { const g = ${game}; g.timerModalIsActive = true; })()`); await sleep(600);
const rep = await page.evaluate(X);
fs.writeFileSync(`${E}extract-timer-modal-1440.json`, JSON.stringify(rep, null, 2));
R.timerModalContrast = rep.color.contrastExamples.filter((c) => /lose|00:|Hurry|Lock/.test(c.text));
fs.writeFileSync(E + "targets.json", JSON.stringify(R, null, 2));
console.log(JSON.stringify(R, null, 1));
await browser.close();
