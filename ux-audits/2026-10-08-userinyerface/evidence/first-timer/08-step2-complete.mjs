// Step 2 completed for real (390): upload test avatar, Unselect all, tick 3, Next. Also: what does unticking "Select all" do?
import { E, sleep, launch, newPage, go, game } from "./lib.mjs";
const browser = await launch();
const page = await newPage(browser);
await go(page, "https://userinyerface.com/game.html");
await sleep(2600);
await page.evaluate(() => document.querySelector(".cookies button")?.click());
await page.evaluate((g) => { eval(g).currentPageIndex = 1; }, game);
await sleep(800);
console.log("card:", await page.$eval(".page-indicator", (e) => e.innerText));
await page.evaluate(() => document.querySelector(".help-form__send-to-bottom-button").click());
const ticked = () => page.evaluate(() => [...document.querySelectorAll(".avatar-and-interests__interests-list__item")].filter((e) => e.querySelector("input").checked).map((e) => e.innerText.trim()));
const clickItem = (n) => page.evaluate((n) => [...document.querySelectorAll(".avatar-and-interests__interests-list__item")].find((e) => e.innerText.trim() === n).querySelector("input").click(), n);
await clickItem("Unselect all"); await sleep(300); console.log("after Unselect all:", await ticked());
await clickItem("Unselect all"); await sleep(300); console.log("Unselect all again (now unticked->ticked):", await ticked());
await clickItem("Select all"); await sleep(300); console.log("tick Select all:", await ticked());
await clickItem("Select all"); await sleep(300); console.log("UNtick Select all:", (await ticked()).length, "ticked");
await clickItem("Unselect all"); await sleep(300); console.log("Unselect all:", await ticked());
for (const n of ["Ponies", "Purple", "Cotton"]) await clickItem(n);
await sleep(300); console.log("after 3:", await ticked());
// upload
const up = await page.$(".avatar-and-interests__upload-button");
const [fc] = await Promise.all([page.waitForFileChooser({ timeout: 5000 }).catch(() => null), up.evaluate((x) => x.click())]);
console.log("chooser", !!fc);
if (fc) await fc.accept([process.env.AVATAR || E + "../test-avatar.png"]);
for (let i = 0; i < 10; i++) { await sleep(500); if (await page.$(".avatar-and-interests__avatar-image")) break; }
console.log("avatar shown:", !!(await page.$(".avatar-and-interests__avatar-image")), await page.evaluate(() => document.querySelector(".avatar-and-interests").__vue__.validation));
if (!(await page.$(".avatar-and-interests__avatar-image"))) {
  const fi = await page.evaluateHandle(() => document.querySelector(".avatar-and-interests").__vue__.fileDialog.fileInput);
  console.log("input files:", await fi.evaluate((e) => e.files.length));
  await fi.evaluate((e) => e.dispatchEvent(new Event("change"))); await sleep(1500);
  console.log("fileDialog state:", await page.evaluate(() => { const v = document.querySelector(".avatar-and-interests").__vue__; const d = v.fileDialog; return { result: String(d.result).slice(0, 40), hasReader: !!d.fileReader, handler: !!d.handleFileChosen, avatarImage: String(v.avatarImage).slice(0, 40), uid: v._uid, sameAsRef: v.$parent.$refs["avatar-and-interests-form"] === v }; }));
  console.log("after manual change event (headless detached-input limitation):", !!(await page.$(".avatar-and-interests__avatar-image")));
}
await page.screenshot({ path: E + "s2-390-completed-before-next.png" });
const t = Date.now();
await page.evaluate(() => [...document.querySelectorAll(".avatar-and-interests-page button")].find((b) => b.innerText.trim() === "Next").click());
await sleep(800);
console.log("after Next:", await page.evaluate((g) => ({ step: eval(g).currentPageIndex, card: document.querySelector(".page-indicator")?.innerText, err: document.querySelector(".avatar-and-interests__errors")?.innerText || null }), game));
await browser.close();
