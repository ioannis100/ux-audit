// J3 step 2 (reached via game state: currentPageIndex = 1): avatar + 3 interests.
import { launch, open, sleep, shot, save, probe, game, goStep, hit, hitText, E } from "./lib.mjs";
const AVATAR = E + "../test-avatar.png";
const browser = await launch();
const out = {};
const st = (page) => page.evaluate(() => {
  const f = [...document.querySelectorAll("*")].map((e) => e.__vue__).find((v) => v && v.$options._componentTag === "ui-avatar-and-interests");
  const items = [...document.querySelectorAll(".avatar-and-interests__interests-list__item")].map((e) => ({ label: e.innerText.trim(), checked: e.querySelector("input").checked }));
  return { step: [...document.querySelectorAll("*")].map((e) => e.__vue__).find((v) => v && v.$options._componentTag === "ui-game")?.currentPageIndex,
    checkedVisible: items.filter((i) => i.checked).map((i) => i.label), counted: f ? f.countInterests() : null, hasAvatar: f ? !!f.avatarImage : null,
    errors: [...document.querySelectorAll(".avatar-and-interests__error")].map((e) => e.innerText.trim()), order: items.map((i) => i.label).join(", ") };
});
const tapInterest = async (page, label, w) => {
  const h = await page.evaluateHandle((label) => [...document.querySelectorAll(".avatar-and-interests__interests-list__item")].find((e) => e.innerText.trim() === label)?.querySelector(".checkbox__box"), label);
  return hit(page, h.asElement(), w);
};
const next = (page, w) => hitText(page, ".avatar-and-interests-page button", "Next", w);
for (const w of [390, 1440]) {
  const { page, net, con } = await open(browser, w);
  await goStep(page, 1);
  const r = {};
  r.initial = await st(page);
  r.layout = await page.evaluate(() => { const b = (s) => { const e = typeof s === "string" ? document.querySelector(s) : s; if (!e) return null; const r = e.getBoundingClientRect(); return [r.x, r.y, r.width, r.height].map(Math.round); };
    const btn = (t) => [...document.querySelectorAll(".avatar-and-interests button, .avatar-and-interests-page button")].find((e) => e.innerText.trim() === t);
    return { uploadLink: b(".avatar-and-interests__upload-button"), downloadBtn: b(btn("Download image")), next: b(btn("Next")), cancel: b(btn("Cancel")), checkbox: b(".avatar-and-interests__interests-list .checkbox__box"), scrollW: document.documentElement.scrollWidth,
      nextStyle: (() => { const s = getComputedStyle(btn("Next")); return [s.backgroundColor, s.color, s.borderColor]; })(), cancelStyle: (() => { const s = getComputedStyle(btn("Cancel")); return [s.backgroundColor, s.color]; })(), downloadStyle: (() => { const s = getComputedStyle(btn("Download image")); return [s.backgroundColor, s.color]; })(), uploadStyle: (() => { const s = getComputedStyle(document.querySelector(".avatar-and-interests__upload-button")); return [s.color, s.textDecorationLine, s.cursor]; })() }; });
  await shot(page, `j3-step2-initial-${w}`); await shot(page, `j3-step2-initial-full-${w}`, true);
  // 1. Next with defaults
  r.nextDefaults = await probe(page, `j3-next-defaults-${w}`, () => next(page, w));
  r.afterNextDefaults = await st(page);
  await shot(page, `j3-next-defaults-full-${w}`, true);
  // 2. Tap the label text "Ponies" (not the box)
  const before = (await st(page)).checkedVisible.includes("Ponies");
  const lh = await page.evaluateHandle(() => [...document.querySelectorAll(".avatar-and-interests__interests-list__item span")].find((e) => e.innerText.trim() === "Ponies"));
  await hit(page, lh.asElement(), w); await sleep(200);
  r.labelTapTogglesPonies = before !== (await st(page)).checkedVisible.includes("Ponies");
  // 3. Unselect all / Select all
  r.unselectAllTop = await tapInterest(page, "Unselect all", w); await sleep(300);
  r.afterUnselectAll = await st(page);
  await tapInterest(page, "Select all", w); await sleep(300);
  r.afterSelectAll = await st(page);
  await tapInterest(page, "Unselect all", w); await sleep(300);
  // 4. Pick 4, Next
  for (const l of ["Ponies", "Polo", "Dough", "Snails"]) await tapInterest(page, l, w);
  await next(page, w); await sleep(300);
  r.with4 = await st(page);
  await tapInterest(page, "Snails", w); await sleep(200);
  await next(page, w); await sleep(300);
  r.with3NoAvatar = await st(page);
  await shot(page, `j3-3-interests-no-avatar-${w}`, true);
  // 5. Download image button (downloads denied, request logged)
  const n0 = net.length;
  await hitText(page, ".avatar-and-interests button", "Download image", w); await sleep(1500);
  r.downloadRequests = net.slice(n0).map((n) => `${n.m || "FAIL " + n.fail} ${n.u}`);
  r.afterDownload = await st(page);
  // 6. Upload avatar
  const t = Date.now();
  const [fc] = await Promise.all([page.waitForFileChooser({ timeout: 5000 }), hit(page, ".avatar-and-interests__upload-button", w)]);
  r.fileChooserAccept = fc.isMultiple() ? "multiple" : "single";
  await fc.accept([AVATAR]);
  await page.waitForFunction(() => document.querySelector(".avatar-and-interests__avatar-image"), { timeout: 5000 }).catch(() => {});
  r.uploadMs = Date.now() - t;
  r.afterUpload = await st(page);
  await shot(page, `j3-after-upload-${w}`);
  // 7. Cancel upload dialog after a successful upload: is the avatar hidden but still "valid"?
  // (skipped: re-opening dialog then dismissing needs fc.cancel)
  const [fc2] = await Promise.all([page.waitForFileChooser({ timeout: 5000 }), hit(page, ".avatar-and-interests__upload-button", w)]);
  await fc2.cancel(); await sleep(400);
  r.afterReopenAndCancelDialog = { ...(await st(page)), avatarVisible: !!(await page.$(".avatar-and-interests__avatar-image")) };
  await shot(page, `j3-after-cancelled-reupload-${w}`);
  // 8. Next -> step 3 ; feedback
  r.validNext = await probe(page, `j3-valid-next-${w}`, () => next(page, w));
  r.afterValidNext = await st(page);
  r.console = con.filter((c) => !/Timer::/.test(c));
  out[w] = r;
}
// 9. Double-tap Next on a valid step 2 (does it skip step 3?) and Cancel on step 2
for (const w of [390, 1440]) {
  const { page, con } = await open(browser, w);
  await goStep(page, 1);
  await tapInterest(page, "Unselect all", w); await sleep(200);
  for (const l of ["Ponies", "Polo", "Dough"]) await tapInterest(page, l, w);
  const [fc] = await Promise.all([page.waitForFileChooser({ timeout: 5000 }), hit(page, ".avatar-and-interests__upload-button", w)]);
  await fc.accept([AVATAR]); await sleep(800);
  const box = await page.evaluate(() => { const b = [...document.querySelectorAll(".avatar-and-interests-page button")].find((e) => e.innerText.trim() === "Next"); b.scrollIntoView({ block: "center" }); const r = b.getBoundingClientRect(); return { x: r.x + r.width / 2 - visualViewport.offsetLeft, y: r.y + r.height / 2 - visualViewport.offsetTop }; });
  if (w === 390) { await page.touchscreen.tap(box.x, box.y); await sleep(60); await page.touchscreen.tap(box.x, box.y); }
  else await page.mouse.click(box.x, box.y, { count: 2 });
  await sleep(500);
  const what = await page.evaluate(({ x, y }) => { const t = document.elementFromPoint(x, y); return t?.innerText?.trim().slice(0, 20) || t?.className; }, box);
  out[`doubleNext-${w}`] = { stepAfter: await game(page, "g.currentPageIndex"), stepCompleteLogs: con.filter((c) => /step complete/.test(c)).length, elementNowUnderPointer: what };
  await shot(page, `j3-double-next-${w}`);
  // Cancel on step 2 (from fresh step 2 state)
  await goStep(page, 1);
  await sleep(300);
  await hitText(page, ".avatar-and-interests-page button", "Cancel", w); await sleep(400);
  out[`cancel-${w}`] = { step: await game(page, "g.currentPageIndex"), confirmModal: await game(page, "g.confirmModalIsActive") };
  await shot(page, `j3-cancel-${w}`);
}
save("j3-step2", out);
console.log(JSON.stringify(out, null, 1));
await browser.close();
