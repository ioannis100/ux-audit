// 390: captcha checkbox hit-tests with the help widget open, then solve with it collapsed and capture the end screen.
import { E, sleep, launch, open, game } from "./lib.mjs";
const b = await launch();
const { page } = await open(b, { w: 390, h: 844, mobile: true }); await sleep(2700);
await page.evaluate(() => document.querySelector(".cookies .align__cell:first-child button").click()); await sleep(300);
await game(page, "g.currentPageIndex = 3"); await sleep(1200);
const hits = async () => page.evaluate(() => { const v = document.querySelector(".captcha-gallery").__vue__; return v.galleryImages.map((im, i) => i).map((i) => { const el = v.$refs["captchaCheckbox" + i][0].$el.querySelector(".checkbox__box"); el.scrollIntoView({ block: "center", behavior: "instant" }); const r = el.getBoundingClientRect(); const t = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return el === t || el.contains(t) ? "ok" : String(t?.className).split(" ")[0]; }); });
const h1 = await hits();
console.log("help open: blocked checkboxes", h1.filter((x) => x !== "ok").length, "/", h1.length, JSON.stringify(h1));
await page.screenshot({ path: `${E}c3-step4-help-open-390.png` });
await page.evaluate(() => document.querySelector(".help-form__send-to-bottom-button").click()); await sleep(14500);
const h2 = await hits();
console.log("help collapsed: blocked", h2.filter((x) => x !== "ok").length, JSON.stringify(h2));
const want = await page.evaluate(() => { const v = document.querySelector(".captcha-gallery").__vue__; return [v.gallery.title, v.galleryImages.map((im, i) => (im && im.value ? i : -1)).filter((i) => i >= 0)]; });
console.log("gallery", JSON.stringify(want));
for (const i of want[1]) { const p = await page.evaluate((i) => { const v = document.querySelector(".captcha-gallery").__vue__; const el = v.$refs["captchaCheckbox" + i][0].$el.querySelector(".checkbox__box"); el.scrollIntoView({ block: "center", behavior: "instant" }); const r = el.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; }, i); await page.touchscreen.tap(p.x, p.y); await sleep(100); }
const vb = await page.evaluate(() => { const e = document.querySelector(".captcha-gallery__button-container button"); e.scrollIntoView({ block: "center", behavior: "instant" }); const r = e.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
await page.touchscreen.tap(vb.x, vb.y); await sleep(2500);
await page.evaluate(() => scrollTo(0, 0));
console.log("end?", await page.evaluate(() => ({ end: !!document.querySelector(".end-screen"), text: document.body.innerText.replace(/\s+/g, " ").trim().slice(0, 200) })));
await page.screenshot({ path: `${E}c3-end-screen-390.png` });
await b.close();
