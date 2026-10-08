import { launch, open, sleep, shot, hitText, hit, game } from "./lib.mjs";
const b = await launch(); const { page } = await open(b, 390);
const st = () => page.evaluate(() => { const lf = [...document.querySelectorAll("*")].map((e) => e.__vue__).find((v) => v && v.$options._componentTag === "ui-login-form"); return { cookie: !!document.querySelector(".cookies"), emailError: lf.emailError, tcErr: lf.termsAndConditionsError, scrollY, modals: [...document.querySelectorAll(".modal")].length, active: document.activeElement.className }; });
console.log("cookie tap top:", await hitText(page, ".cookies button", "Not really, no", 390)); await sleep(400); console.log(await st());
console.log("next top:", await hitText(page, ".login-form a.button--secondary", "Next", 390)); await sleep(400); console.log(await st());
await shot(page, "dbg-390-after-next");
console.log("next top 2:", await hitText(page, ".login-form a.button--secondary", "Next", 390)); await sleep(400); console.log(await st());
await b.close();
