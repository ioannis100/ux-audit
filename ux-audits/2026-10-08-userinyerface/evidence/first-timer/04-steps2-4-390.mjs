// Jordan, phone 390x844: steps 2-4 reached by setting ui-game.currentPageIndex (brief rule: step 1 cannot
// pass without a password). Inside each step the real UI is used: taps, typing fake values, Next, Validate.
import fs from "node:fs";
import { E, sleep, launch, newPage, go, logger, game, inventory } from "./lib.mjs";
const browser = await launch();
const page = await newPage(browser);
await go(page, "https://userinyerface.com/game.html");
const T0 = Date.now();
const log = logger(page, () => T0);
const shot = (n, full) => page.screenshot({ path: E + n, fullPage: !!full });
const stap = async (sel) => { let el = typeof sel === "string" ? await page.$(sel) : sel; if (el && el.asElement) el = el.asElement(); if (!el) return { missing: true };
  await el.evaluate((x) => x.scrollIntoView({ block: "center", behavior: "instant" })); await sleep(150);
  const cover = await el.evaluate((x) => { const r = x.getBoundingClientRect(); const h = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return !h || x.contains(h) || h.contains(x) ? null : (h.className || h.tagName).toString().slice(0, 40); });
  if (cover) { coverHits.push({ target: await el.evaluate((x) => (x.innerText || x.className).toString().trim().slice(0, 30)), coveredBy: cover }); }
  if (cover) { await el.evaluate((x) => x.click()); return { tapped: false, cover, note: "touch target covered; DOM click used to continue" }; }
  try { await el.tap(); return { tapped: true, cover }; } catch (e) { await el.evaluate((x) => x.click()); return { tapped: false, cover, note: "not touch-tappable; DOM click used" }; } };
const coverHits = [];
const helpAway = async () => { const h = await page.$(".help-form:not(.is-hidden) .help-form__send-to-bottom-button"); if (h) { await h.evaluate((x) => x.click()); await sleep(300); return true; } return false; };
const byText = (sel, t) => page.evaluateHandle((sel, t) => [...document.querySelectorAll(sel)].find((e) => e.innerText.trim() === t), sel, t);
const out = {};
await page.evaluate(() => (document.documentElement.style.scrollBehavior = "auto"));
await sleep(2600);
await stap((await page.$$(".cookies button"))[0]);
const setStep = (i) => page.evaluate((g, i) => { const G = eval(g); G.currentPageIndex = i; }, game, i);

// ---------- STEP 2 ----------
await setStep(1);
await sleep(800);
await shot("s2-390-arrive.png");
await log("card indicator after jump", await page.evaluate(() => document.querySelector(".page-indicator")?.innerText));
await sleep(4000);
await shot("s2-390-5s.png");
await shot("s2-390-full.png", true);
out.s2 = await page.evaluate(() => ({
  text: document.querySelector(".avatar-and-interests-page")?.innerText,
  checked: [...document.querySelectorAll(".avatar-and-interests__interests-list__item")].map((e) => [e.innerText.trim(), e.querySelector("input").checked]),
  sizes: (() => { const b = document.querySelector(".avatar-and-interests__interests-list .checkbox__box"); const r = b.getBoundingClientRect(); return { box: [Math.round(r.width), Math.round(r.height)], font: getComputedStyle(b.closest(".avatar-and-interests__interests-list__item")).fontSize }; })(),
  upload: (() => { const a = document.querySelector(".avatar-and-interests__upload-button"); const r = a.getBoundingClientRect(), s = getComputedStyle(a); return { w: Math.round(r.width), h: Math.round(r.height), color: s.color, deco: s.textDecorationLine, font: s.fontSize }; })(),
  download: (() => { const a = [...document.querySelectorAll("button")].find((b) => /Download image/.test(b.innerText)); const r = a.getBoundingClientRect(), s = getComputedStyle(a); return { w: Math.round(r.width), h: Math.round(r.height), bg: s.backgroundColor }; })(),
}));
await log("step 2 arrival: interests and their initial state", { checked: out.s2.checked.filter((c) => c[1]).length + "/" + out.s2.checked.length + " pre-ticked", sizes: out.s2.sizes, upload: out.s2.upload, download: out.s2.download });
// Next right away
await stap(await byText(".avatar-and-interests-page button", "Next"));
await sleep(500);
await log("tap Next immediately", await page.evaluate(() => document.querySelector(".avatar-and-interests__errors")?.innerText || "no error"));
await shot("s2-390-next-errors.png");
await shot("s2-390-next-errors-full.png", true);
await log("covered-tap check so far", coverHits.slice());
await log("dismiss help widget via 'Send to bottom' (it covers the interests list)", await helpAway());
await stap(await byText(".avatar-and-interests-page button", "Next"));
await sleep(500);
await log("tap Next again, help widget gone", await page.evaluate(() => document.querySelector(".avatar-and-interests__errors")?.innerText || "no error"));
await shot("s2-390-next-errors-b.png");
// "Download image" — what does it do? (would download a placeholder image; do NOT keep the file)
out.dlLabel = "source: download('images/avatar_placeholder.png') — not tapped to avoid a download";
// Upload
const [fc] = await Promise.all([page.waitForFileChooser({ timeout: 5000 }).catch(() => null), stap(".avatar-and-interests__upload-button")]);
if (fc) await fc.accept([process.env.AVATAR || E + "../test-avatar.png"]);
await sleep(1200);
out.avatarViaChooser = await page.evaluate(() => !!document.querySelector(".avatar-and-interests__avatar-image"));
if (!out.avatarViaChooser) { const fi = await page.evaluateHandle(() => document.querySelector(".avatar-and-interests").__vue__.fileDialog.fileInput); await fi.uploadFile(E + "../test-avatar.png").catch(() => {}); await fi.evaluate((e) => e.dispatchEvent(new Event("change"))); }
if (false) { const fi = await page.evaluateHandle(() => document.querySelector(".avatar-and-interests").__vue__.fileDialog.fileInput); await fi.uploadFile(E + "../test-avatar.png"); await fi.evaluate((e) => e.dispatchEvent(new Event("change"))); }
await sleep(1500);
await log("tap 'upload' link + choose test-avatar.png", { chooser: !!fc, hasAvatar: await page.evaluate(() => !!document.querySelector(".avatar-and-interests__avatar-image")) });
// Interests: as a person — untick until 3 remain? First try 'Unselect all'
const items = await page.$$(".avatar-and-interests__interests-list__item");
const labels = await Promise.all(items.map((i) => i.evaluate((e) => e.innerText.trim())));
const unsel = items[labels.indexOf("Unselect all")];
await stap(await unsel.$(".checkbox__box"));
await sleep(400);
await log("tap 'Unselect all' (a checkbox in the list)", await page.evaluate(() => [...document.querySelectorAll(".avatar-and-interests__interests-list__item")].filter((e) => e.querySelector("input").checked).map((e) => e.innerText.trim())));
// tap 3 interests
for (const l of ["Ponies", "Purple", "Cotton"]) await stap(await items[labels.indexOf(l)].$(".checkbox__box"));
await sleep(300);
const checkedNow = await page.evaluate(() => [...document.querySelectorAll(".avatar-and-interests__interests-list__item")].filter((e) => e.querySelector("input").checked).map((e) => e.innerText.trim()));
await log("tap Ponies, Purple, Cotton", checkedNow);
// Tap a label text (not the box) — does the label toggle?
await stap(await items[labels.indexOf("Snails")].$("span:not(.checkbox):not(.checkbox__box):not(.icon)"));
await sleep(300);
await log("tap the WORD 'Snails'", await page.evaluate(() => { const it = [...document.querySelectorAll(".avatar-and-interests__interests-list__item")].find((e) => e.innerText.trim() === "Snails"); return it ? it.querySelector("input")?.checked : "item gone: " + document.querySelector(".game")?.innerText.slice(0, 200); }));
// Touch taps above toggle the wrong item (see 07-probe-interests2.mjs). Continue with DOM clicks on the real inputs.
await page.evaluate(() => { const items = [...document.querySelectorAll(".avatar-and-interests__interests-list__item")]; const f = (n) => items.find((e) => e.innerText.trim() === n).querySelector("input"); const u = f("Unselect all"); if (!u.checked) u.click(); else { u.click(); u.click(); } for (const it of items) if (it.querySelector("input").checked) it.querySelector("input").click(); for (const n of ["Ponies", "Purple", "Cotton"]) f(n).click(); });
await sleep(300);
await log("(DOM clicks) leave exactly Ponies, Purple, Cotton ticked", await page.evaluate(() => ({ ticked: [...document.querySelectorAll(".avatar-and-interests__interests-list__item")].filter((e) => e.querySelector("input").checked).map((e) => e.innerText.trim()), avatar: !!document.querySelector(".avatar-and-interests__avatar-image") })));
await shot("s2-390-ready.png");
const tNext2 = Date.now();
await stap(await byText(".avatar-and-interests-page button", "Next"));
await sleep(800);
await log("tap Next with avatar + 3 interests", await page.evaluate((g) => ({ step: eval(g).currentPageIndex, err: document.querySelector(".avatar-and-interests__errors")?.innerText || null }), game));

// ---------- STEP 3 ----------
await helpAway();
const onS3 = await page.evaluate((g) => eval(g).currentPageIndex === 2, game);
if (!onS3) await setStep(2);
await sleep(800);
await shot("s3-390-arrive.png");
await log("card indicator after jump", await page.evaluate(() => document.querySelector(".page-indicator")?.innerText));
await sleep(4000);
await shot("s3-390-5s.png");
await shot("s3-390-full.png", true);
out.s3 = await page.evaluate(`(${inventory})()`);
out.s3labels = await page.evaluate(() => [...document.querySelectorAll(".personal-details__td-label")].map((e) => e.innerText));
await log("step 3 arrival: fields", { labels: out.s3labels, inputs: out.s3.filter((i) => i.tag === "INPUT").map((i) => `${i.value}|${i.w}x${i.h}|${i.font}`) });
// Next immediately
await stap(await byText(".personal-details button", "Next"));
await sleep(500);
await log("tap Next immediately", await page.evaluate(() => document.querySelector(".personal-details-errors-modal")?.innerText || "no modal"));
await shot("s3-390-error-modal.png");
await stap(await byText(".personal-details-errors-modal button", "OK"));
await sleep(300);
// Fill text fields like a person: tap, type (no select-all)
const tInputs = await page.$$(".personal-details input.input");
await stap(tInputs[0]); await tInputs[0].evaluate((e) => e.focus()); await page.keyboard.type("Test", { delay: 40 });
await log("tap 'First name' field, type 'Test'", await page.evaluate(() => document.activeElement.value));

const fill = async (idx, v) => { await stap(tInputs[idx]); await tInputs[idx].evaluate((e) => { e.focus(); e.select(); }); await page.keyboard.type(v, { delay: 30 }); };
const inputLabels = await Promise.all(tInputs.map((i) => i.evaluate((e) => e.closest(".personal-details__property-item-tr-row")?.querySelector(".personal-details__td-label")?.innerText)));
await log("text inputs in DOM order", inputLabels);
const vals = { "First name": "Test", Zip: "1000", City: "Testville", Surname: "User", Street: "Test street 1" };
for (let i = 0; i < inputLabels.length; i++) if (vals[inputLabels[i]]) await fill(i, vals[inputLabels[i]]);
await page.tap("h3").catch(() => {}); // blur
await sleep(300);
await log("filled text fields (select-all + type)", await page.$$eval(".personal-details input.input", (els) => els.map((e) => e.value)));
// Title dropdown
const dds = await page.$$(".personal-details .dropdown");
const ddLabel = async (d) => d.evaluate((e) => e.closest(".personal-details__property-item-tr-row")?.querySelector(".personal-details__td-label")?.innerText);
const ddNames = await Promise.all(dds.map(ddLabel));
await log("dropdowns in DOM order", ddNames);
const openDd = async (i) => { await stap(await dds[i].$(".dropdown__header")); await sleep(400); return dds[i].$$eval(".dropdown__list-item", (els) => els.map((e) => e.innerText.trim())); };
const pick = async (i, text) => { const its = await dds[i].$$(".dropdown__list-item"); for (const it of its) if ((await it.evaluate((e) => e.innerText.trim())) === String(text)) { const r = await stap(it); await sleep(300); return r; } return "not found"; };
const titleIdx = ddNames.indexOf("Title");
await log("open Title", await openDd(titleIdx));
await shot("s3-390-title-open.png");
await pick(titleIdx, "Mr");
// Country
const cIdx = ddNames.indexOf("Country");
const cItems = await openDd(cIdx);
const cInfo = await dds[cIdx].evaluate((d) => { const l = d.querySelector(".dropdown__list"); const it = d.querySelectorAll(".dropdown__list-item, .country-dropdown__item, .dropdown__list > div"); return { n: it.length, firstText: [...it].slice(0, 3).map((e) => e.innerText.trim() || e.className), listH: Math.round(l.getBoundingClientRect().height), scrollH: l.scrollHeight }; });
await log("open Country", cInfo);
await shot("s3-390-country-open.png");
// pick Belgium by index (items have no text?)
const belgium = await page.evaluate(() => { const v = [...document.querySelectorAll("*")].map((e) => e.__vue__).find((v) => v && v.countries); return v ? v.countries.findIndex((c) => c.name === "Belgium") : -1; });
const cEls = await dds[cIdx].$$(".dropdown__list > div");
if (belgium >= 0 && cEls[belgium]) { const r = await stap(cEls[belgium]); await sleep(300); await log("pick Belgium (item #" + belgium + ", text-less flag row)", { r, field: await dds[cIdx].$eval(".dropdown__field", (e) => e.innerText.trim()) }); }
await shot("s3-390-country-picked.png");
// Birthdate
const dIdx = ddNames.indexOf("Birthdate");
const dayItems = await openDd(dIdx); await pick(dIdx, 1);
const monthItems = await openDd(dIdx + 1);
await log("open Month", monthItems);
await shot("s3-390-month-open.png");
await pick(dIdx + 1, "January");
const yearItems = await openDd(dIdx + 2);
await log("open Year", { first: yearItems.slice(0, 3), last: yearItems.slice(-2), n: yearItems.length, pos1990: yearItems.indexOf("1990") });
await pick(dIdx + 2, 1990);
await log("birthdate fields now", await page.$$eval(".date-dropdowns .dropdown__field", (els) => els.map((e) => e.innerText.trim())));
// Age slider: drag the handle
const handle = await page.$(".slider__handle");
const track = await page.$(".slider");
const hb = await handle.boundingBox(), tb = await track.boundingBox();
await log("age slider geometry", { handle: hb, track: tb, value: await handle.evaluate((e) => e.innerText) });
const target = 36; // born 1990-01-01, today 2026-10-08
const tx = tb.x + (tb.width * target) / 200;
await page.touchscreen.touchStart(hb.x + hb.width / 2, hb.y + hb.height / 2);
for (let k = 1; k <= 10; k++) await page.touchscreen.touchMove(hb.x + hb.width / 2 + ((tx - hb.x - hb.width / 2) * k) / 10, hb.y + hb.height / 2);
await page.touchscreen.touchEnd();
await sleep(300);
await log("drag Age handle toward 36 by touch", await handle.evaluate((e) => e.innerText));
await shot("s3-390-age.png");
// Gender: leave default (Male) as a man choosing Mr would
out.gender = await page.$$eval(".toggle-button", (els) => els.map((e) => [e.innerText, e.className]));
await log("gender toggle state (left as-is with Title=Mr)", out.gender);
// Steppers
out.steppers = await page.$$eval(".numeric-stepper", (els) => els.map((e) => { const r = e.getBoundingClientRect(); return { text: e.innerText.trim(), w: Math.round(r.width), h: Math.round(r.height), btn: [...e.querySelectorAll("button")].map((b) => { const q = b.getBoundingClientRect(); return [Math.round(q.width), Math.round(q.height)]; }) }; }));
await log("Box / Number steppers", out.steppers);
// Next -> errors one at a time
const errs = [];
for (let k = 0; k < 6; k++) {
  await helpAway();
  await stap(await byText(".personal-details button", "Next"));
  await sleep(500);
  const m = await page.evaluate((g) => ({ modal: document.querySelector(".personal-details-errors-modal")?.innerText || null, step: eval(g).currentPageIndex }), game);
  errs.push(m);
  if (!m.modal) break;
  await shot(`s3-390-error-${k}.png`);
  await stap(await byText(".personal-details-errors-modal button", "OK"));
  await sleep(300);
  if (/Gender and title/.test(m.modal)) { // flip gender to the other button and retry
    const g = await page.$$(".toggle-button"); await stap(g[1]); await sleep(200);
    errs.push({ action: "tapped 'Female' to satisfy 'Gender and title don't match' with Title=Mr" });
  } else if (/Age and birth/.test(m.modal)) {
    const v = await page.$eval(".slider__handle", (e) => e.innerText); errs.push({ ageShown: v });
    break;
  } else break;
}
await log("Next with everything filled (loop over error modal)", errs);
out.s3errors = errs;
// If stuck on age, set the slider via component to continue
if (await page.evaluate((g) => eval(g).currentPageIndex === 2, game)) {
  await page.evaluate(() => { const v = document.querySelector(".personal-details").__vue__; v.data.age = 36; });
  await stap(await byText(".personal-details button", "Next")); await sleep(500);
  await log("(state) age=36, Next", await page.evaluate((g) => ({ modal: document.querySelector(".personal-details-errors-modal")?.innerText || null, step: eval(g).currentPageIndex }), game));
  if (await page.evaluate(() => !!document.querySelector(".personal-details-errors-modal"))) { await stap(await byText(".personal-details-errors-modal button", "OK")); }
}

// ---------- STEP 4 ----------
await helpAway();
if (await page.evaluate((g) => eval(g).currentPageIndex !== 3, game)) await setStep(3);
await sleep(1000);
await shot("s4-390-arrive.png");
await log("card indicator after jump", await page.evaluate(() => document.querySelector(".page-indicator")?.innerText));
await sleep(4000);
await shot("s4-390-5s.png");
await shot("s4-390-full.png", true);
out.s4 = await page.evaluate(() => { const c = document.querySelector(".captcha-gallery__container"); const cell = document.querySelector(".captcha-gallery__image-container"); const cb = document.querySelector(".captcha-gallery .checkbox__box"); const r = cell.getBoundingClientRect(); return { h2: document.querySelector(".captcha-gallery h2").innerText, h3: document.querySelector(".captcha-gallery h3").innerText, scrollTop: c.scrollTop, scrollH: c.scrollHeight, clientH: c.clientHeight, cell: [Math.round(r.width), Math.round(r.height)], cb: [Math.round(cb.getBoundingClientRect().width), Math.round(cb.getBoundingClientRect().height)], nChecks: document.querySelectorAll(".captcha-gallery input[type=checkbox]").length }; });
await log("step 4 arrival", out.s4);
// Wrong attempt: Validate with nothing ticked
const title1 = out.s4.h3;
await stap(await byText(".captcha-gallery button", "Validate"));
await sleep(600);
await log("tap Validate with nothing ticked", { instructionNow: await page.$eval(".captcha-gallery h3", (e) => e.innerText), before: title1, anyMessage: await page.evaluate(() => document.querySelector(".captcha-gallery")?.innerText.replace(/\s+/g, " ").slice(0, 200)) });
await shot("s4-390-after-wrong.png");
// Real attempt: every image here is a 'true' image in the source data -> tick all 16
const boxes = await page.$$(".captcha-gallery .checkbox__box");
for (const b of boxes) await stap(b);
await sleep(300);
await log("tick all 16 boxes", await page.$$eval(".captcha-gallery input[type=checkbox]", (els) => els.filter((e) => e.checked).length));
await shot("s4-390-all-ticked.png");
await stap(await byText(".captcha-gallery button", "Validate"));
await sleep(1500);
out.end = await page.evaluate((g) => ({ finished: eval(g).gameFinished, text: document.querySelector(".end-screen")?.innerText || null, timer: document.querySelector(".timer")?.innerText }), game);
await log("tap Validate", out.end);
await shot("end-390.png");
await shot("end-390-full.png", true);
await sleep(3000);
await log("3 s later: timer still running?", await page.$eval(".timer", (e) => e.innerText));
out.net = page.__net.filter((r) => !/fonts|\.png|\.jpg|\.svg|\.gif|\.css|\.woff/.test(r));
out.log = log.rows; out.coverHits = coverHits;
fs.writeFileSync(E + "steps2-4-390.json", JSON.stringify(out, null, 2));
await browser.close();
