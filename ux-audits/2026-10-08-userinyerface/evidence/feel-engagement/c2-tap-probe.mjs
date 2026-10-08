// 390 touch: does a real tap on the cookie buttons dismiss the banner? What is under the finger?
import { E, sleep, launch, open, game } from "./lib.mjs";
const b = await launch();
for (const run of [1, 2]) {
  const { page } = await open(b, { w: 390, h: 844, mobile: true }); await sleep(2700);
  const pt = await page.evaluate(() => { const e = document.querySelector(".cookies .align__cell:first-child button"); const r = e.getBoundingClientRect(); const x = r.x + r.width / 2, y = r.y + r.height / 2; const top = document.elementFromPoint(x, y); return { x, y, top: `${top.tagName} "${top.innerText?.slice(0, 20)}"`, vw: innerWidth, vv: visualViewport.width, scale: visualViewport.scale }; });
  console.log("run", run, "point", JSON.stringify(pt));
  if (run === 1) await page.touchscreen.tap(pt.x, pt.y); else await page.tap(".cookies .align__cell:first-child button");
  await sleep(700);
  console.log("run", run, run === 1 ? "touchscreen.tap(x,y)" : "page.tap(sel)", "-> cookiesIsActive", await game(page, "return g.cookiesIsActive"));
  if (run === 1) { await page.screenshot({ path: `${E}c2-after-tap-390.png` }); }
}
await b.close();
