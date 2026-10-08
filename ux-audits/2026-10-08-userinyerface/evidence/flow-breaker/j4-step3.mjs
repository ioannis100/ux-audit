// J4 step 3 personal details (reached via g.currentPageIndex = 2). Every field via real pointer input.
import { launch, open, sleep, shot, save, probe, game, goStep, hit, hitText } from "./lib.mjs";
const browser = await launch();
const out = {};
const PD = `[...document.querySelectorAll("*")].map(e => e.__vue__).find(v => v && v.$options._componentTag === "ui-personal-details")`;
const data = (page) => page.evaluate(`(() => { const p = ${PD}; return p ? JSON.parse(JSON.stringify(p.data)) : null; })()`);
const modalText = (page) => page.evaluate(() => document.querySelector(".personal-details-errors-modal")?.innerText.replace(/\s+/g, " ").trim() || null);
const cell = (label) => `[...document.querySelectorAll(".personal-details__property-item-tr-row")].find(r => r.querySelector(".personal-details__td-label")?.innerText.trim() === "${label}")`;
const cellHandle = async (page, label, sub) => (await page.evaluateHandle(`${cell(label)}?.querySelector("${sub}")`)).asElement();
async function typeField(page, label, value, w) {
  const el = await cellHandle(page, label, "input");
  await hit(page, el, w);
  await el.evaluate((e) => e.select());
  await page.keyboard.press("Backspace");
  if (value) await page.keyboard.type(value, { delay: 10 });
}
async function blur(page, w) { await hit(page, await cellHandle(page, "Age", ".personal-details__td-label") || ".personal-details h3", w).catch(() => {}); }
async function pick(page, root, itemIndexOrText, w) { // root: element handle of a .dropdown
  await hit(page, await root.$(".dropdown__header"), w); await sleep(250);
  const item = await root.evaluateHandle((d, it) => { const items = [...d.querySelectorAll(".dropdown__list > *")]; return typeof it === "number" ? items[it] : items.find((e) => e.innerText.trim() === it); }, itemIndexOrText);
  const top = await hit(page, item.asElement(), w); await sleep(250);
  return top;
}
const closeErr = (page, w) => hitText(page, ".personal-details-errors-modal button", "OK", w).then(() => sleep(250)).catch(() => {});
async function next(page, w) { await hitText(page, ".personal-details button", "Next", w); await sleep(350); const m = await modalText(page); if (m) await closeErr(page, w); return m; }
async function dragAge(page, target, w) {
  const g = await page.evaluate(`(() => { const s = ${cell("Age")}.querySelector(".slider"); const h = s.querySelector(".slider__handle"); h.scrollIntoView({ block: "center" }); const r = s.getBoundingClientRect(), hr = h.getBoundingClientRect(); return { left: r.left, width: r.width, hx: hr.x + hr.width / 2, hy: hr.y + hr.height / 2, ox: visualViewport.offsetLeft, oy: visualViewport.offsetTop }; })()`);
  const tx = g.left + (target / 200) * g.width;
  if (w === 390) { await page.touchscreen.touchStart(g.hx - g.ox, g.hy - g.oy); await page.touchscreen.touchMove(tx - g.ox, g.hy - g.oy); await page.touchscreen.touchEnd(); }
  else { await page.mouse.move(g.hx, g.hy); await page.mouse.down(); await page.mouse.move(tx, g.hy, { steps: 5 }); await page.mouse.up(); }
  await sleep(200);
  return { sliderWidth: g.width, yearsPerPx: +(200 / g.width).toFixed(3), shown: await page.evaluate(`${cell("Age")}.querySelector(".slider__handle").innerText.trim()`), stored: (await data(page)).age };
}
for (const w of [390, 1440]) {
  const { page, con } = await open(browser, w);
  const r = { indicator: await goStep(page, 2) };
  r.coveredByHelpAtLoad = await page.evaluate(() => {
    const out = []; const hf = document.querySelector(".help-form");
    for (const y of [0, document.documentElement.scrollHeight]) { scrollTo(0, y);
      for (const e of document.querySelectorAll(".personal-details input, .personal-details .dropdown__header, .personal-details .dropdown__opener, .personal-details button, .slider__handle, .toggle-button")) {
        const b = e.getBoundingClientRect(); if (b.bottom < 0 || b.top > innerHeight) continue;
        const t = document.elementFromPoint(b.x + b.width / 2, b.y + b.height / 2);
        if (t && hf.contains(t)) out.push(`${e.className.split(" ")[0]}:${(e.innerText || e.value || "").trim().slice(0, 14)}@scrollY${Math.round(scrollY)}`);
      } }
    return [...new Set(out)];
  });
  await hitText(page, ".help-form button", "Send to bottom", w); await sleep(15000); // is-hidden shrinks over 14 s (app.css)
  r.initialData = await data(page);
  r.initialUI = await page.evaluate(() => ({ inputs: [...document.querySelectorAll(".personal-details input")].map((i) => i.value), labels: [...document.querySelectorAll(".personal-details__td-label")].map((l) => l.innerText.trim()), gender: [...document.querySelectorAll(".toggle-button")].map((b) => b.innerText.trim() + (b.classList.contains("selected") ? "*" : "")), age: document.querySelector(".slider__handle")?.innerText, scrollW: document.documentElement.scrollWidth }));
  await shot(page, `j4-step3-initial-${w}`); await shot(page, `j4-step3-initial-full-${w}`, true);
  // 1. Empty Next: one error at a time — count Next presses needed to see all problems while fixing one by one
  r.emptyNext = await probe(page, `j4-empty-next-${w}`, () => hitText(page, ".personal-details button", "Next", w));
  r.emptyNextModal = await modalText(page);
  await closeErr(page, w);
  r.errorSequence = [];
  const fixes = [
    ["firstname", () => typeField(page, "First name", "Test", w)],
    ["title Mr", async () => pick(page, await cellHandle(page, "Title", ".dropdown"), "Mr", w)],
    ["surname", () => typeField(page, "Surname", "User", w)],
    ["street", () => typeField(page, "Street", "Test street 1", w)],
    ["zip", () => typeField(page, "Zip", "1000", w)],
    ["city", () => typeField(page, "City", "Testville", w)],
    ["country (item 20)", async () => pick(page, await cellHandle(page, "Country", ".dropdown"), 20, w)],
    ["birthdate 1 / January / 1990", async () => { const dds = await page.$$(".date-dropdowns .dropdown"); await pick(page, dds[0], "1", w); await pick(page, dds[1], "January", w); await pick(page, dds[2], "1990", w); }],
    ["age 36 (drag)", async () => { r.ageDrag = await dragAge(page, 36.4, w); }],
  ];
  for (const [name, fix] of fixes) { await fix(); await blur(page, w); await sleep(150); r.errorSequence.push({ after: name, modal: await next(page, w), step: await game(page, "g.currentPageIndex") }); }
  r.dataAfterFill = await data(page);
  r.ui = await page.evaluate(() => ({ countryShown: [...document.querySelectorAll(".country-dropdown .dropdown__field")].map((e) => e.innerText.trim()), countryItemsText: [...document.querySelectorAll(".country-dropdown .dropdown__list > *")].slice(0, 5).map((e) => e.innerText.trim()), countryCount: document.querySelectorAll(".country-dropdown .dropdown__list > *").length,
    monthOrder: [...document.querySelectorAll(".date-dropdown__container--month .dropdown__list > *")].map((e) => e.innerText.trim()), yearFirstLast: (() => { const y = [...document.querySelectorAll(".date-dropdown__container--year .dropdown__list > *")].map((e) => e.innerText.trim()); return [y[0], y[y.length - 1], y.length, y.indexOf("1990")]; })(), titleItems: [...document.querySelectorAll(".personal-details .dropdown:not(.country-dropdown) .dropdown__list > *")].slice(0, 2).map((e) => e.innerText.trim()) }));
  await shot(page, `j4-filled-mr-male-${w}`, true);
  // 2. Title Mr + Gender Male -> ?
  r.mrMale = r.errorSequence.at(-1);
  // Toggle gender to Female and try again
  await hitText(page, ".toggle-button", "Female", w); await sleep(200);
  r.genderAfterFemaleTap = await page.evaluate(() => [...document.querySelectorAll(".toggle-button")].map((b) => b.innerText.trim() + (b.classList.contains("selected") ? "*" : "")));
  r.dataBeforeFinal = await data(page);
  // Double-tap Next on a valid form: does it skip the captcha?
  const box = await page.evaluate(() => { const b = [...document.querySelectorAll(".personal-details button")].find((e) => e.innerText.trim() === "Next"); b.scrollIntoView({ block: "center" }); const r = b.getBoundingClientRect(); const t = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return { x: r.x + r.width / 2 - visualViewport.offsetLeft, y: r.y + r.height / 2 - visualViewport.offsetTop, top: t === b || b.contains(t) ? "self" : String(t?.className) }; });
  r.nextTopBeforeFinal = box.top;
  if (w === 390) { await page.touchscreen.tap(box.x, box.y); await sleep(80); await page.touchscreen.tap(box.x, box.y); }
  else await page.mouse.click(box.x, box.y, { count: 2, delay: 40 });
  await sleep(400);
  r.mrFemaleDoubleNext = { modal: await modalText(page), step: await game(page, "g.currentPageIndex"), indicator: await page.$eval(".page-indicator", (e) => e.innerText).catch(() => null), stepCompleteLogs: con.filter((c) => /step complete/.test(c)).length };
  await shot(page, `j4-after-mr-female-next-${w}`);
  out[w] = r;
}
// 3. Postel / edge values + Cancel (fresh contexts)
for (const w of [390, 1440]) {
  const { page } = await open(browser, w);
  await goStep(page, 2);
  await hitText(page, ".help-form button", "Send to bottom", w); await sleep(15000);
  const r = {};
  // Age slider sweep: which integer ages can a pointer reach?
  const g = await page.evaluate(`(() => { const s = ${cell("Age")}.querySelector(".slider"); const h = s.querySelector(".slider__handle"); h.scrollIntoView({ block: "center" }); const r = s.getBoundingClientRect(), hr = h.getBoundingClientRect(); return { left: r.left, width: r.width, hx: hr.x + hr.width / 2, hy: hr.y + hr.height / 2, ox: visualViewport.offsetLeft, oy: visualViewport.offsetTop }; })()`);
  const seen = new Set();
  if (w === 390) await page.touchscreen.touchStart(g.hx - g.ox, g.hy - g.oy); else { await page.mouse.move(g.hx, g.hy); await page.mouse.down(); }
  for (let x = Math.floor(g.left); x <= Math.ceil(g.left + g.width); x++) {
    if (w === 390) await page.touchscreen.touchMove(x - g.ox, g.hy - g.oy); else await page.mouse.move(x, g.hy);
    seen.add(+(await page.evaluate(`(() => { const s = ${cell("Age")}.querySelector(".slider"); const v = s.__vue__ || [...document.querySelectorAll("*")].map(e => e.__vue__).find(v => v && v.$options._componentTag === "ui-slider"); return Math.round(v.internalValue); })()`)));
  }
  if (w === 390) await page.touchscreen.touchEnd(); else await page.mouse.up();
  const missing = []; for (let a = 0; a <= 100; a++) if (!seen.has(a)) missing.push(a);
  r.ageSweep = { sliderWidth: g.width, distinctValues: seen.size, unreachableAges0to100: missing };
  r.firstNameVariants = {};
  for (const v of ["P", "Pl", "Placeholder", "  Test  ", "O'Brien-Łukasz", "😀", "x".repeat(120)]) {
    await typeField(page, "First name", v, w); await blur(page, w); await sleep(150);
    r.firstNameVariants[v.length > 30 ? "x*120" : v] = { shown: (await page.evaluate(`${cell("First name")}.querySelector("input").value`)).slice(0, 30), stored: String((await data(page)).firstname).slice(0, 30), modal: await next(page, w) };
  }
  // Typing then tapping Next without leaving the field (commit-on-blur)
  await typeField(page, "First name", "Test", w);
  r.typeThenNextImmediately = { modal: await next(page, w), stored: (await data(page)).firstname };
  // zip variants accepted?
  r.zip = {};
  for (const v of ["B-1000", " 1000 ", "SW1A 1AA", "1"]) { await typeField(page, "Zip", v, w); await blur(page, w); r.zip[v] = String((await data(page)).zip); }
  // Box / Number steppers: min, max
  const down = await cellHandle(page, "Box", ".numeric-stepper__button--down");
  for (let i = 0; i < 3; i++) await hit(page, down, w);
  r.boxAfter3Down = (await data(page)).box;
  // Cancel on step 3
  await hitText(page, ".personal-details button", "Cancel", w); await sleep(400);
  r.cancel = { confirmModal: await game(page, "g.confirmModalIsActive"), text: await page.evaluate(() => [...document.querySelectorAll(".modal")].map((m) => m.innerText.replace(/\s+/g, " ")).join(" | ")) };
  await shot(page, `j4-cancel-modal-${w}`);
  out[`edge-${w}`] = r;
}
save("j4-step3", out);
console.log(JSON.stringify(out, null, 1));
await browser.close();
