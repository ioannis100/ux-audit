// J3b: step 2 upload + valid Next + double-tap Next + Cancel, and phone help-widget overlap at max scroll.
import { launch, open, sleep, shot, save, probe, game, goStep, hit, hitText, E } from "./lib.mjs";
// Same bytes as <audit>/evidence/test-avatar.png, copied to a path without ":" (Chrome could not read the file from the "UI:UX-skill" path).
const AVATAR = "./test-avatar.png";
const browser = await launch();
const out = {};
const form = `[...document.querySelectorAll("*")].map(e => e.__vue__).find(v => v && v.$options._componentTag === "ui-avatar-and-interests")`;
const tapInterest = async (page, label, w) => {
  const h = await page.evaluateHandle((label) => [...document.querySelectorAll(".avatar-and-interests__interests-list__item")].find((e) => e.innerText.trim() === label)?.querySelector(".checkbox__box"), label);
  return hit(page, h.asElement(), w);
};
async function upload(page, w) {
  const [fc] = await Promise.all([page.waitForFileChooser({ timeout: 5000 }), hit(page, ".avatar-and-interests__upload-button", w)]);
  const t = Date.now();
  await fc.accept([AVATAR]);
  await page.waitForFunction(() => document.querySelector(".avatar-and-interests__avatar-image"), { timeout: 5000 }).catch(() => {});
  return Date.now() - t;
}
const overlap = (page) => page.evaluate(() => {
  scrollTo(0, document.documentElement.scrollHeight);
  const hf = document.querySelector(".help-form").getBoundingClientRect();
  const chk = (e) => { const r = e.getBoundingClientRect(); const t = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return { y: Math.round(r.y), covered: !(t === e || e.contains(t)) && String(t?.className).slice(0, 30) }; };
  const items = [...document.querySelectorAll(".avatar-and-interests__interests-list__item")];
  return { scrollY, helpTop: Math.round(hf.y), helpBottom: Math.round(hf.bottom), vvH: visualViewport.height,
    coveredInterests: items.filter((i) => chk(i.querySelector(".checkbox__box")).covered).map((i) => i.innerText.trim()),
    next: chk([...document.querySelectorAll(".avatar-and-interests-page button")].find((b) => b.innerText.trim() === "Next")),
    cancel: chk([...document.querySelectorAll(".avatar-and-interests-page button")].find((b) => b.innerText.trim() === "Cancel")) };
});
for (const w of [390, 1440]) {
  const { page, con } = await open(browser, w);
  await goStep(page, 1);
  const r = {};
  r.overlapAtMaxScroll = await overlap(page);
  await shot(page, `j3b-max-scroll-${w}`);
  if (w === 390) { // collapse the help widget the only way offered
    await hitText(page, ".help-form button", "Send to bottom", w); await sleep(2500);
    r.overlapAfterSendToBottom = await overlap(page);
    await shot(page, `j3b-after-send-to-bottom-${w}`);
  }
  await tapInterest(page, "Unselect all", w); await sleep(200);
  for (const l of ["Ponies", "Polo", "Dough"]) await tapInterest(page, l, w);
  r.uploadMs = await upload(page, w);
  r.afterUpload = await page.evaluate(`(() => { const f = ${form}; return { hasAvatar: !!f.avatarImage, mime: (f.avatarImage || "").slice(0, 22), shown: !!document.querySelector(".avatar-and-interests__avatar-image"), count: f.countInterests() }; })()`);
  await shot(page, `j3b-after-upload-${w}`);
  // Re-open dialog and cancel it: avatar hidden but still valid?
  const [fc2] = await Promise.all([page.waitForFileChooser({ timeout: 5000 }), hit(page, ".avatar-and-interests__upload-button", w)]);
  await fc2.cancel(); await sleep(400);
  r.afterReopenCancel = await page.evaluate(`(() => { const f = ${form}; return { avatarDataKept: !!f.avatarImage, avatarShown: !!document.querySelector(".avatar-and-interests__avatar-image") }; })()`);
  await shot(page, `j3b-after-reopen-cancel-${w}`);
  // Double-tap Next
  const box = await page.evaluate(() => { const b = [...document.querySelectorAll(".avatar-and-interests-page button")].find((e) => e.innerText.trim() === "Next"); b.scrollIntoView({ block: "center" }); const r = b.getBoundingClientRect(); const t = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return { x: r.x + r.width / 2 - visualViewport.offsetLeft, y: r.y + r.height / 2 - visualViewport.offsetTop, top: t === b || b.contains(t) ? "self" : String(t?.className) }; });
  r.nextTop = box.top;
  await page.evaluate(() => { window.__mut = 0; new MutationObserver((l) => (window.__mut += l.length)).observe(document.body, { subtree: true, childList: true, attributes: true }); });
  if (w === 390) { await page.touchscreen.tap(box.x, box.y); await sleep(80); await page.touchscreen.tap(box.x, box.y); }
  else await page.mouse.click(box.x, box.y, { count: 2, delay: 40 });
  await sleep(300);
  r.doubleNext = { stepAfter: await game(page, "g.currentPageIndex"), stepCompleteLogs: con.filter((c) => /step complete/.test(c)).length, mutationsIn300ms: await page.evaluate(() => window.__mut) };
  await shot(page, `j3b-after-double-next-${w}`);
  // Single-tap path in a fresh context to measure feedback of a valid Next
  out[w] = r;
}
for (const w of [390, 1440]) {
  const { page, con } = await open(browser, w);
  await goStep(page, 1);
  if (w === 390) { await hitText(page, ".help-form button", "Send to bottom", w); await sleep(400); }
  await tapInterest(page, "Unselect all", w);
  for (const l of ["Ponies", "Polo", "Dough"]) await tapInterest(page, l, w);
  await upload(page, w);
  out[w].singleValidNext = await probe(page, `j3b-valid-next-${w}`, () => hitText(page, ".avatar-and-interests-page button", "Next", w));
  out[w].singleValidNext.stepAfter = await game(page, "g.currentPageIndex");
  out[w].singleValidNext.scrollYAfter = await page.evaluate(() => scrollY);
  // Back to step 2 via game state -> is step-2 data preserved?
  await goStep(page, 1);
  out[w].reenterStep2 = await page.evaluate(`(() => { const f = ${form}; return { hasAvatar: !!f.avatarImage, count: f.countInterests() }; })()`);
  // Cancel on step 2
  await hitText(page, ".avatar-and-interests-page button", "Cancel", w).catch(async () => { await hitText(page, ".help-form button", "Send to bottom", w); await hitText(page, ".avatar-and-interests-page button", "Cancel", w); });
  await sleep(400);
  out[w].cancelOnStep2 = { step: await game(page, "g.currentPageIndex"), confirmModal: await game(page, "g.confirmModalIsActive"), step1Email: await page.$eval('input[placeholder="Your email"]', (e) => e.value).catch(() => null) };
  await shot(page, `j3b-cancel-step2-${w}`);
}
save("j3b-step2-upload", out);
console.log(JSON.stringify(out, null, 1));
await browser.close();
