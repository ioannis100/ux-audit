import { launch, open, sleep, shot, clickText } from "./lib.mjs";
const b = await launch(); const { page } = await open(b, 390);
const info = () => page.evaluate(() => { const h = document.querySelector(".login-form .dropdown__header"); const r = h.getBoundingClientRect(); const top = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return { hdr: [r.x, r.y, r.width, r.height], topAtCenter: top && top.className, cookies: getComputedStyle(document.querySelector(".cookies") || document.body).position, scrollY }; });
console.log(await info());
await clickText(page, ".cookies button", "Not really, no"); await sleep(400);
console.log(await info());
await page.click(".login-form .dropdown__header").catch((e) => console.log("click err", e.message)); await sleep(500);
console.log(await page.evaluate(() => ({ cls: document.querySelector(".login-form .dropdown").className,
  items: [...document.querySelectorAll(".login-form .dropdown__list-item")].map((e) => { const r = e.getBoundingClientRect(); return [e.innerText, Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)]; }) })));
await shot(page, "dbg-dropdown-open-390"); await b.close();
