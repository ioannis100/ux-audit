// Scenario B @1440: steps 2-4 (reached by setting ui-game currentPageIndex), control states, errors, captcha, end screen.
import fs from "node:fs";
import { E, sleep, launch, open, game, states, text } from "./lib.mjs";
const log = []; const T0 = Date.now(); const L = (a, r) => { const e = { t: ((Date.now() - T0) / 1000).toFixed(1), a, r }; log.push(e); console.log(e.t, a, typeof r === "string" ? r : JSON.stringify(r).slice(0, 400)); };
const browser = await launch();
const { page } = await open(browser);
await sleep(2600);
await page.click(".cookies .align__cell:first-child button").catch(() => {}); await sleep(400);
await game(page, "g.currentPageIndex = 1"); await sleep(1200);
const countChecked = () => page.evaluate(() => [...document.querySelectorAll(".avatar-and-interests__interests-list__item")].map((i) => [i.innerText.trim(), i.querySelector("input").checked]));
let c = await countChecked();
L("step2 interests on arrival (label, checked)", { checked: c.filter((x) => x[1]).length, of: c.length, list: c.map((x) => `${x[0]}${x[1] ? "[x]" : "[ ]"}`).join(" ") });
await page.screenshot({ path: `${E}b-step2-arrival-1440.png` });
const S = {};
S.s2Next = await states(page, ".avatar-and-interests-page__buttons .align__cell:first-child button");
S.s2Cancel = await states(page, ".avatar-and-interests-page__buttons .align__cell:last-child button");
S.s2Download = await states(page, ".avatar-and-interests__avatar-upload-button");
S.s2UploadLink = await states(page, ".avatar-and-interests__upload-button");
S.s2InterestBox = await states(page, ".avatar-and-interests__interests-list .checkbox__box");
for (const [k, v] of Object.entries(S)) L(`state-diff ${k}`, v ? { size: `${v.default.w}x${v.default.h}`, tag: v.default.tag, cursor: v.default.cursor, bg: v.default.backgroundColor, color: v.default.color, border: v.default.borderColor, fs: v.default.fontSize, ...v.diff } : "missing");
await page.click(".avatar-and-interests-page__buttons .align__cell:first-child button"); await sleep(500);
L("step2 Next with defaults", await page.evaluate(() => [...document.querySelectorAll(".avatar-and-interests__error")].map((e) => e.innerText)));
// Unselect all
const clickInterest = async (label) => { const h = await page.evaluateHandle((label) => [...document.querySelectorAll(".avatar-and-interests__interests-list__item")].find((i) => i.innerText.trim() === label).querySelector(".checkbox__box"), label); await h.click(); await sleep(200); };
await clickInterest("Unselect all");
c = await countChecked(); L("after clicking 'Unselect all'", { checked: c.filter((x) => x[1]).map((x) => x[0]) });
for (const l of ["Ponies", "Polo", "Dough"]) await clickInterest(l);
c = await countChecked(); L("after ticking 3", { checked: c.filter((x) => x[1]).map((x) => x[0]) });
// Cancel on step 2 (no confirm?) then come back
await page.click(".avatar-and-interests-page__buttons .align__cell:last-child button"); await sleep(600);
L("step2 Cancel ->", await game(page, "return { step: g.currentPageIndex, confirm: g.confirmModalIsActive, indicator: document.querySelector('.page-indicator').innerText }"));
await game(page, "g.currentPageIndex = 1"); await sleep(800);
c = await countChecked(); L("back on step2 after Cancel: work kept?", { checked: c.filter((x) => x[1]).length });
await clickInterest("Unselect all"); for (const l of ["Ponies", "Polo", "Dough"]) await clickInterest(l);
const t0 = Date.now();
const [fc] = await Promise.all([page.waitForFileChooser({ timeout: 5000 }), page.click(".avatar-and-interests__upload-button")]);
await fc.accept([E + "../test-avatar.png"]);
let shown = false; while (Date.now() - t0 < 4000 && !(shown = await page.evaluate(() => !!document.querySelector(".avatar-and-interests__avatar-image")))) await sleep(50);
L("avatar upload via file chooser -> image shown (detached <input type=file>; puppeteer accept)", { shown, ms: Date.now() - t0 });
if (!shown) {
  const b64 = fs.readFileSync(E + "../test-avatar.png").toString("base64");
  await page.evaluate((d) => { const v = document.querySelector(".avatar-and-interests").__vue__; v.onAvatarComplete(d); }, "data:image/png;base64," + b64); await sleep(500);
  L("avatar set via component onAvatarComplete(test-avatar dataURL) [tooling fallback]", await page.evaluate(() => ({ shown: !!document.querySelector(".avatar-and-interests__avatar-image"), spinnerStillRendered: !!document.querySelector(".avatar-and-interests__spinner") && getComputedStyle(document.querySelector(".avatar-and-interests__spinner")).display })));
}
await page.screenshot({ path: `${E}b-step2-filled-1440.png` });
await page.click(".avatar-and-interests-page__buttons .align__cell:first-child button"); await sleep(1000);
L("step2 Next (valid) -> transition", await game(page, "return { step: g.currentPageIndex, indicator: document.querySelector('.page-indicator').innerText }"));
// step 3
await page.screenshot({ path: `${E}b-step3-arrival-1440.png` });
S.s3Next = await states(page, ".personal-details__bottom-button-container .align__cell:first-child button");
S.s3Cancel = await states(page, ".personal-details__bottom-button-container .align__cell:last-child button");
S.s3Toggle = await states(page, ".toggle-button");
for (const k of ["s3Next", "s3Cancel", "s3Toggle"]) { const v = S[k]; L(`state-diff ${k}`, v ? { size: `${v.default.w}x${v.default.h}`, tag: v.default.tag, cursor: v.default.cursor, bg: v.default.backgroundColor, color: v.default.color, ...v.diff } : "missing"); }
L("gender toggle initial", await page.evaluate(() => [...document.querySelectorAll(".toggle-button")].map((b) => `${b.innerText}${b.classList.contains("selected") ? "*" : ""}`)));
await (await page.$$(".toggle-button"))[0].click(); await sleep(200);
const g1 = await page.evaluate(() => [...document.querySelectorAll(".toggle-button")].map((b) => `${b.innerText}${b.classList.contains("selected") ? "*" : ""}`));
await (await page.$$(".toggle-button"))[0].click(); await sleep(200);
const g2 = await page.evaluate(() => [...document.querySelectorAll(".toggle-button")].map((b) => `${b.innerText}${b.classList.contains("selected") ? "*" : ""}`));
L("click 'Male' twice", { first: g1, second: g2 });
await page.click(".personal-details__bottom-button-container .align__cell:last-child button"); await sleep(500);
L("step3 Cancel -> confirm?", await game(page, "return { confirm: g.confirmModalIsActive }"));
await page.screenshot({ path: `${E}b-step3-cancel-confirm-1440.png` });
await page.evaluate(() => [...document.querySelectorAll(".modal button")].find((b) => b.innerText.trim() === "Cancel")?.click()); await sleep(400);
await page.click(".personal-details__bottom-button-container .align__cell:first-child button"); await sleep(600);
L("step3 Next empty -> error modal", await page.evaluate(() => { const m = document.querySelector(".personal-details-errors-modal"); return m ? m.innerText.replace(/\s+/g, " ") : null; }));
await page.screenshot({ path: `${E}b-step3-error-modal-1440.png` });
await page.evaluate(() => [...document.querySelectorAll(".modal button")].find((b) => b.innerText.trim() === "OK")?.click()); await sleep(300);
// step 4
await game(page, "g.currentPageIndex = 3"); await sleep(1200);
const cap = () => page.evaluate(() => document.querySelector(".captcha-gallery h3")?.innerText);
L("step4 instruction", { h2: await page.evaluate(() => document.querySelector(".captcha-gallery h2")?.innerText), h3: await cap(), containerScrollTop: await page.evaluate(() => document.querySelector(".captcha-gallery__container").scrollTop) });
await page.screenshot({ path: `${E}b-step4-arrival-1440.png` });
S.validate = await states(page, ".captcha-gallery__button-container button");
L("state-diff validate", { size: `${S.validate.default.w}x${S.validate.default.h}`, bg: S.validate.default.backgroundColor, cursor: S.validate.default.cursor, ...S.validate.diff });
const before = await cap();
await page.click(".captcha-gallery__button-container button"); await sleep(600);
L("Validate with nothing selected", { before, after: await cap(), anyErrorText: await page.evaluate(() => /wrong|error|try again|incorrect/i.test(document.querySelector(".captcha-gallery").innerText)), step: await game(page, "return g.currentPageIndex") });
// solve properly through the UI
const want = await page.evaluate(() => { const v = [...document.querySelectorAll(".captcha-gallery")].map((e) => e.__vue__)[0]; return v.galleryImages.map((im, i) => im && im.value ? i : -1).filter((i) => i >= 0); });
for (const i of want) { const h = await page.evaluateHandle((i) => { const v = document.querySelector(".captcha-gallery").__vue__; const r = v.$refs["captchaCheckbox" + i]; const el = r[0].$el.querySelector(".checkbox__box"); el.scrollIntoView({ block: "center" }); return el; }, i); await h.click(); await sleep(120); }
L("captcha ticked indexes", { title: await cap(), want });
const tv = Date.now();
await page.click(".captcha-gallery__button-container button");
const endSamples = [];
for (let i = 0; i < 8; i++) { endSamples.push(await page.evaluate(() => ({ end: !!document.querySelector(".end-screen"), timer: document.querySelector(".view .timer")?.innerText }))); await sleep(500); }
L("Validate (correct) -> end screen", { ms: Date.now() - tv, endSamples });
await page.evaluate(() => scrollTo(0, 0));
await page.screenshot({ path: `${E}b-end-screen-1440.png`, fullPage: true });
L("end screen content", await page.evaluate(() => ({ text: document.body.innerText.replace(/\s+/g, " ").trim(), links: [...document.querySelectorAll("a,button")].filter((e) => e.getBoundingClientRect().width).map((e) => `${e.tagName}:${(e.innerText || e.title || "").trim().slice(0, 30)}`), gif: (() => { const i = document.querySelector(".end-screen__image"); return i ? { natural: `${i.naturalWidth}x${i.naturalHeight}`, alt: i.alt } : null; })(), help: !!document.querySelector(".help-form"), pagination: !!document.querySelector(".pagination") })));
await sleep(3000);
L("timer 3s after end (stopped?)", await page.evaluate(() => document.querySelector(".view .timer")?.innerText));
fs.writeFileSync(`${E}b-control-states-1440.json`, JSON.stringify(S, null, 2));
fs.writeFileSync(`${E}b-log.json`, JSON.stringify(log, null, 2));
await browser.close();
