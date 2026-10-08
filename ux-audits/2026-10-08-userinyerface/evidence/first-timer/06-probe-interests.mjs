// Probe: tapping interest checkboxes on a 390 phone — which box actually toggles?
import { E, sleep, launch, newPage, go, game } from "./lib.mjs";
const browser = await launch();
const page = await newPage(browser);
await go(page, "https://userinyerface.com/game.html");
await sleep(2600);
await page.evaluate(() => document.querySelector(".cookies button")?.click());
await page.evaluate((g) => { eval(g).currentPageIndex = 1; }, game);
await sleep(800);
await page.evaluate(() => document.querySelector(".help-form__send-to-bottom-button").click());
await sleep(500);
const state = () => page.evaluate(() => [...document.querySelectorAll(".avatar-and-interests__interests-list__item")].filter((e) => !e.querySelector("input").checked).map((e) => e.innerText.trim()));
for (const name of ["Ponies", "Purple", "Cotton", "Unselect all"]) {
  const h = await page.evaluateHandle((n) => [...document.querySelectorAll(".avatar-and-interests__interests-list__item")].find((e) => e.innerText.trim() === n).querySelector(".checkbox__box"), name);
  await h.evaluate((x) => x.scrollIntoView({ block: "center", behavior: "instant" })); await sleep(200);
  const bb = await h.boundingBox();
  const at = await page.evaluate((x, y) => { const e = document.elementFromPoint(x, y); return (e.className || e.tagName) + " / " + e.closest(".avatar-and-interests__interests-list__item")?.innerText.trim(); }, bb.x + bb.width / 2, bb.y + bb.height / 2);
  await page.touchscreen.tap(bb.x + bb.width / 2, bb.y + bb.height / 2); await sleep(400);
  console.log(name, JSON.stringify(bb), "hit:", at, "-> unchecked now:", await state(), "scrollY", await page.evaluate(() => scrollY));
}
console.log(await page.evaluate(() => [...document.querySelectorAll(".avatar-and-interests__interests-list__item")].slice(0, 6).map((e) => [e.innerText.trim(), e.querySelector("label").htmlFor, e.querySelector("input").id])));
// mouse click instead of touch
for (const name of ["Purple", "Cotton"]) {
  const h = await page.evaluateHandle((n) => [...document.querySelectorAll(".avatar-and-interests__interests-list__item")].find((e) => e.innerText.trim() === n).querySelector(".checkbox__box"), name);
  const bb = await h.boundingBox();
  await page.mouse.click(bb.x + bb.width / 2, bb.y + bb.height / 2); await sleep(400);
  console.log("mouse", name, "-> unchecked now:", await state());
  await h.evaluate((x) => x.click()); await sleep(400);
  console.log("DOM click", name, "-> unchecked now:", await state());
}
await page.screenshot({ path: E + "probe-interests.png" });
await browser.close();
