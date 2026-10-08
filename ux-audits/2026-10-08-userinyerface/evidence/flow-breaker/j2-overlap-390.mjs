// At 390: what sits on top of each step-1 control after it is scrolled into view (help widget overlap?).
import { launch, open, sleep, shot, save, clickText } from "./lib.mjs";
const b = await launch(); const { page } = await open(b, 390);
await clickText(page, ".cookies button", "Not really, no"); await sleep(400);
const res = await page.evaluate(() => {
  const hf = getComputedStyle(document.querySelector(".help-form"));
  const targets = { email: 'input[placeholder="Your email"]', domain: 'input[placeholder="Domain"]', ext: ".login-form .dropdown__header", checkbox: ".login-form .checkbox__box", tcLink: ".login-form__terms-conditions", next: ".login-form a.button--secondary", cancel: ".login-form .button-container__primary button", reset: ".login-form a.u-right" };
  const out = { helpPos: hf.position, helpBottom: hf.bottom, helpRight: hf.right, helpRect: (() => { const r = document.querySelector(".help-form").getBoundingClientRect(); return [r.x, r.y, r.width, r.height].map(Math.round); })() };
  for (const [k, s] of Object.entries(targets)) {
    const e = document.querySelector(s); e.scrollIntoView({ block: "nearest" });
    const r = e.getBoundingClientRect(); const pts = [[r.x + r.width / 2, r.y + r.height / 2], [r.x + 2, r.y + 2], [r.right - 2, r.bottom - 2]];
    out[k] = { rect: [r.x, r.y, r.width, r.height].map(Math.round), scrollY, coveredBy: pts.map(([x, y]) => { const t = document.elementFromPoint(x, y); return e.contains(t) || t === e ? "self" : String(t?.className).slice(0, 40); }) };
  }
  return out;
});
// Scroll Next into view the way a user would (scroll to bottom) and screenshot
await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
await sleep(300);
await shot(page, "j2-390-scrolled-bottom-help-overlap");
res.atBottom = await page.evaluate(() => { const e = document.querySelector(".login-form a.button--secondary"); const r = e.getBoundingClientRect(); const t = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return { nextRect: [r.x, r.y, r.width, r.height].map(Math.round), top: t === e ? "self" : String(t?.className), scrollY, docH: document.documentElement.scrollHeight }; });
// Real tap on Next where it is at the bottom
const nr = res.atBottom.nextRect; await page.touchscreen.tap(nr[0] + nr[2] / 2, nr[1] + nr[3] / 2); await sleep(400);
res.afterTapNext = await page.evaluate(() => [...document.querySelectorAll("*")].map((e) => e.__vue__).find((v) => v && v.$options._componentTag === "ui-login-form")?.emailError);
await shot(page, "j2-390-after-tap-next");
// Horizontal overflow at 390
res.hOverflow = await page.evaluate(() => ({ scrollW: document.documentElement.scrollWidth, wide: [...document.querySelectorAll("body *")].filter((e) => e.getBoundingClientRect().right > innerWidth + 1).map((e) => e.className).filter((c) => typeof c === "string" && c).slice(0, 12) }));
save("j2-overlap-390", res); console.log(JSON.stringify(res, null, 1)); await b.close();
