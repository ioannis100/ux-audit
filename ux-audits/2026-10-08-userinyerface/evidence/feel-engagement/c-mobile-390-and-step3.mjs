// Scenario C: 390x844 touch (banner, tap targets, pressed states, overlaps, modals, end) + 1440 step-3 overlap/cancel/error probe.
import fs from "node:fs";
import { E, sleep, launch, open, game, styleOf } from "./lib.mjs";
const log = []; const T0 = Date.now(); const L = (a, r) => { const e = { t: ((Date.now() - T0) / 1000).toFixed(1), a, r }; log.push(e); console.log(e.t, a, JSON.stringify(r).slice(0, 600)); };
const browser = await launch();
const hitTest = (page, sel) => page.evaluate((sel) => { const e = document.querySelector(sel); if (!e) return null; e.scrollIntoView({ block: "center", behavior: "instant" }); const r = e.getBoundingClientRect(); const top = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return { sel, box: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`, topmost: top === e || e.contains(top) ? "self" : `${top?.tagName}.${String(top?.className).slice(0, 40)}` }; }, sel);
// ---- 1440 step 3 probe (results in c-out-part1.txt)
if (process.env.STEP3) {
  const { page } = await open(browser); await sleep(2600);
  await page.click(".cookies .align__cell:first-child button").catch(() => {});
  await game(page, "g.currentPageIndex = 2"); await sleep(1000);
  const nx = ".personal-details__bottom-button-container .align__cell:first-child button", cx = ".personal-details__bottom-button-container .align__cell:last-child button";
  L("1440 step3: what receives a click at Next/Cancel centre (help widget open)", [await hitTest(page, nx), await hitTest(page, cx)]);
  await page.screenshot({ path: `${E}c-step3-help-overlap-1440.png` });
  await page.click(".help-form__send-to-bottom-button"); await sleep(14500);
  L("1440 step3 after 'Send to bottom' + 14.5s", [await hitTest(page, nx), await hitTest(page, cx)]);
  await page.click(cx); await sleep(500);
  L("1440 step3 Cancel ->", await game(page, "return { confirm: g.confirmModalIsActive }"));
  await page.screenshot({ path: `${E}c-step3-cancel-confirm-1440.png` });
  await page.evaluate(() => [...document.querySelectorAll(".modal button")].find((b) => b.innerText.trim() === "Cancel")?.click()); await sleep(400);
  await page.click(nx); await sleep(600);
  L("1440 step3 Next with all empty -> error modal", await page.evaluate(() => document.querySelector(".personal-details-errors-modal")?.innerText.replace(/\s+/g, " ")));
  await page.screenshot({ path: `${E}c-step3-error-modal-1440.png` });
  await page.close();
}
// ---- 390 touch
{
  const { page } = await open(browser, { w: 390, h: 844, mobile: true }); await sleep(2700);
  L("390 innerWidth", await page.evaluate(() => innerWidth));
  await page.screenshot({ path: `${E}c-cookie-banner-390.png` });
  const banner = await page.evaluate(() => { const c = document.querySelector(".cookies").getBoundingClientRect(); return { bannerH: Math.round(c.height), pctOfViewport: Math.round(c.height / innerHeight * 100), buttons: [...document.querySelectorAll(".cookies button")].map((b) => { const r = b.getBoundingClientRect(), s = getComputedStyle(b); return `"${b.innerText}" ${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)} bg:${s.backgroundColor} border:${s.borderColor} fs:${s.fontSize} rightEdge:${Math.round(r.right)}`; }), overflowX: document.documentElement.scrollWidth }; });
  L("390 cookie banner", banner);
  // touch pressed state on cookie 'Not really, no' and step-1 Cancel
  const pressed = async (sel) => { const r = await page.evaluate((sel) => { const e = document.querySelector(sel); e.scrollIntoView({ block: "center", behavior: "instant" }); const b = e.getBoundingClientRect(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 }; }, sel); const d = await styleOf(page, sel); await page.touchscreen.touchStart(r.x, r.y); await sleep(150); const p = await styleOf(page, sel); await page.touchscreen.touchMove(5, 5); await page.touchscreen.touchEnd(); await sleep(200); return { sel, changed: Object.keys(d).filter((k) => !["x", "y", "text"].includes(k) && d[k] !== p[k]).map((k) => `${k}: ${d[k]} -> ${p[k]}`) }; };
  L("390 touch pressed (finger down 150ms)", [await pressed(".cookies .align__cell:first-child button"), await pressed(".login-form .button-container__primary button")]);
  await page.evaluate(() => scrollTo(0, 0)); await sleep(300);
  const tapSel = async (sel) => { const p = await page.evaluate((sel) => { const e = document.querySelector(sel); e.scrollIntoView({ block: "center", behavior: "instant" }); const r = e.getClientRects()[0]; return { x: r.x + Math.min(r.width / 2, 40), y: r.y + r.height / 2 }; }, sel); await page.touchscreen.tap(p.x, p.y); };
  await tapSel(".cookies .align__cell:first-child button"); await sleep(600);
  L("390 after tapping 'Not really, no'", await game(page, "return g.cookiesIsActive"));
  const targets = await page.evaluate(() => [".login-form .button-container__secondary a", ".login-form .button-container__primary button", ".login-form a.u-right", ".login-form .checkbox__box", ".login-form__terms-conditions", ".help-form__help-button", ".help-form__close-button", ".help-form__send-to-bottom-button", ".pagination__button"].map((s) => { const e = document.querySelector(s); const r = e.getBoundingClientRect(); return `${s} ${Math.round(r.width)}x${Math.round(r.height)}`; }));
  L("390 step-1 target sizes (CSS px)", targets);
  L("390 hit-tests step 1", [await hitTest(page, ".login-form .button-container__primary button"), await hitTest(page, ".login-form .button-container__secondary a"), await hitTest(page, ".login-form a.u-right"), await hitTest(page, ".pagination__button")]);
  await page.evaluate(() => scrollTo(0, 0)); await page.screenshot({ path: `${E}c-step1-390.png` });
  await page.screenshot({ path: `${E}c-step1-390-full.png`, fullPage: true });
  await tapSel(".login-form__terms-conditions"); await sleep(700);
  L("390 tap on T&C label text opened modal?", await game(page, "return { modal: g.termsAndConditionsVisible, tcChecked: document.querySelector('#accept-terms-conditions').checked }"));
  if (!(await game(page, "return g.termsAndConditionsVisible"))) await page.evaluate(() => document.querySelector(".login-form__terms-conditions").click()); await sleep(700);
  await page.screenshot({ path: `${E}c-terms-modal-390.png` });
  L("390 T&C modal", await page.evaluate(() => { const c = document.querySelector(".terms-and-conditions__text-content"); return c ? { clientH: c.clientHeight, scrollable: c.scrollHeight - c.clientHeight } : null; }));
  // touch-drag scroll rate on T&C
  const cb = await page.evaluate(() => { const r = document.querySelector(".terms-and-conditions__text-content").getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height - 20, top: r.y + 20 }; });
  for (let i = 0; i < 5; i++) { await page.touchscreen.touchStart(cb.x, cb.y); for (let s = 1; s <= 8; s++) { await page.touchscreen.touchMove(cb.x, cb.y - (cb.y - cb.top) * s / 8); await sleep(16); } await page.touchscreen.touchEnd(); await sleep(150); }
  L("390 T&C: 5 full-height finger swipes -> scrollTop", await page.evaluate(() => document.querySelector(".terms-and-conditions__text-content").scrollTop));
  await game(page, "g.termsAndConditionsVisible = false"); await sleep(300);
  // wait for timer modal
  let t; while (!(await game(page, "return g.timerModalIsActive"))) { await sleep(500); if ((t = (Date.now() - T0)) > 200000) break; }
  await sleep(400); await page.screenshot({ path: `${E}c-timer-modal-390.png` });
  L("390 timer modal close affordance", await page.evaluate(() => { const c = document.querySelector(".modal .modal__close-copyright span"); const r = c?.getBoundingClientRect(); return c ? `${c.innerText} ${Math.round(r.width)}x${Math.round(r.height)} at ${Math.round(r.x)},${Math.round(r.y)}` : null; }));
  await page.evaluate(() => document.querySelector(".modal .modal__close-copyright span").click()); await sleep(300);
  // end screen at 390
  await game(page, "g.currentPageIndex = 3"); await sleep(1000);
  await page.screenshot({ path: `${E}c-step4-390.png` });
  const want = await page.evaluate(() => { const v = document.querySelector(".captcha-gallery").__vue__; return v.galleryImages.map((im, i) => (im && im.value ? i : -1)).filter((i) => i >= 0); });
  for (const i of want) { const h = await page.evaluateHandle((i) => { const v = document.querySelector(".captcha-gallery").__vue__; const el = v.$refs["captchaCheckbox" + i][0].$el.querySelector(".checkbox__box"); el.scrollIntoView({ block: "center", behavior: "instant" }); return el; }, i); await h.click(); await sleep(80); }
  await tapSel(".captcha-gallery__button-container button"); await sleep(2500);
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({ path: `${E}c-end-screen-390.png` });
  L("390 end screen", await page.evaluate(() => ({ end: !!document.querySelector(".end-screen"), text: document.body.innerText.replace(/\s+/g, " ").trim(), docH: document.documentElement.scrollHeight })));
}
fs.writeFileSync(`${E}c-log.json`, JSON.stringify(log, null, 2));
await browser.close();
