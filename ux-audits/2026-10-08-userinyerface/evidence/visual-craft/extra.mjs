// visual-craft extras: confirm modal via the real Cancel button, typed-value vs placeholder legibility (fake values only, never the password field), captcha image integrity.
import puppeteer from "puppeteer-core";
import fs from "node:fs";
const E = new URL(".", import.meta.url).pathname;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const G = `[...document.querySelectorAll("*")].map(e=>e.__vue__).find(v=>v&&(v.$options.name||v.$options._componentTag)==="ui-game")`;
const browser = await puppeteer.launch({ headless: true, executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const out = {};
const page = await (await browser.createBrowserContext()).newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("https://userinyerface.com/game.html", { waitUntil: "load", timeout: 25000 }).catch(() => {});
await sleep(2500);
await page.click(".cookies button.button--transparent").catch(() => {}); await sleep(500);
// typed values in step 1 (email local part + domain only)
const ins = await page.$$(".login-form input[type=text]");
await ins[1].type("test"); await ins[2].type("example");
await page.screenshot({ path: `${E}step1-typed-1440.png`, clip: { x: 500, y: 440, width: 460, height: 320 } });
out.step1Typed = await page.evaluate(() => [...document.querySelectorAll(".login-form input")].map((i) => ({ ph: i.placeholder, value: i.value, color: getComputedStyle(i).color, cls: i.className })));
// confirm modal via the real Cancel <button>
await page.click(".login-form button.button--blue"); await sleep(1200);
out.confirm = await page.evaluate(`(()=>{const g=${G};return {confirm:g.confirmModalIsActive, modals:[...document.querySelectorAll('.modal')].filter(m=>m.offsetWidth).map(m=>m.innerText.replace(/\\s+/g,' ').slice(0,200))}})()`);
await page.screenshot({ path: `${E}modal-confirm-1440.png` });
out.confirmButtons = await page.evaluate(() => [...document.querySelectorAll(".modal button, .modal .button, .modal span")].filter((e) => e.offsetWidth).map((e) => { const s = getComputedStyle(e); return { text: e.innerText.trim().slice(0, 30), cls: String(e.className).slice(0, 50), color: s.color, bg: s.backgroundColor, font: s.fontSize, w: e.offsetWidth, h: e.offsetHeight }; }));
await page.evaluate(`(()=>{const g=${G};g.confirmModalIsActive=false;g.currentPageIndex=2})()`); await sleep(1000);
// step 3 typed value vs placeholder
const s3 = await page.$$(".personal-details input[type=text]");
await s3[0].type("Test");
const r = await page.evaluate(() => { const i = document.querySelectorAll(".personal-details input[type=text]"); const a = i[0].getBoundingClientRect(); window.scrollTo(0, a.top + scrollY - 120); return null; });
await sleep(300);
await page.screenshot({ path: `${E}step3-typed-vs-placeholder-1440.png`, clip: { x: 120, y: 60, width: 1200, height: 260 } });
// step 4 captcha images: load each background url, record natural size + rendered box, 3 reloads of the gallery
out.captcha = [];
for (let k = 0; k < 3; k++) {
  await page.evaluate(`(()=>{const g=${G};g.currentPageIndex=3})()`); await sleep(1500);
  out.captcha.push(await page.evaluate(async () => {
    const cells = [...document.querySelectorAll(".captcha-gallery__image-container")];
    const instr = document.querySelector(".captcha-gallery > h3")?.innerText;
    const res = await Promise.all(cells.map((c) => new Promise((ok) => { const url = (getComputedStyle(c).backgroundImage.match(/url\("?(.*?)"?\)/) || [])[1]; const im = new Image(); im.onload = () => ok({ url: url.split("/").slice(-2).join("/"), nat: `${im.naturalWidth}x${im.naturalHeight}`, box: `${c.offsetWidth}x${c.offsetHeight}` }); im.onerror = () => ok({ url, broken: true, box: `${c.offsetWidth}x${c.offsetHeight}` }); im.src = url; })));
    return { instr, res };
  }));
  await page.evaluate(`(()=>{const g=${G};g.currentPageIndex=2})()`); await sleep(500);
}
fs.writeFileSync(`${E}extra.json`, JSON.stringify(out, null, 2));
console.log(JSON.stringify({ step1Typed: out.step1Typed, confirm: out.confirm, confirmButtons: out.confirmButtons }, null, 1));
for (const c of out.captcha) console.log(c.instr, "broken:", c.res.filter((x) => x.broken).length, c.res.map((x) => x.nat + "@" + x.box + (x.broken ? "!BROKEN " + x.url : "")).join(" "));
await browser.close();
