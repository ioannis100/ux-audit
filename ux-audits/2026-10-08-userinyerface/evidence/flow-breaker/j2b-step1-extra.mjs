// J2 extras: naive typing into prefilled fields, Reset desync of the T&C checkbox, Enter key, ext list.
import { launch, open, sleep, shot, save, hit, hitText } from "./lib.mjs";
const browser = await launch();
const out = {};
const ld = (page) => page.evaluate(() => { const lf = [...document.querySelectorAll("*")].map((e) => e.__vue__).find((v) => v && v.$options._componentTag === "ui-login-form"); return { emailName: lf.loginData.emailName, emailDomain: lf.loginData.emailDomain, emailExt: lf.loginData.emailExt, dontAccept: lf.loginData.dontAcceptTermsConditions, boxChecked: document.querySelector("#accept-terms-conditions").checked, tcError: lf.termsAndConditionsError, tcErrorText: document.querySelector(".login-form__terms-conditions-error")?.innerText || null, vals: [...document.querySelectorAll('input[placeholder="Your email"],input[placeholder="Domain"]')].map((i) => i.value), url: location.href }; });
for (const w of [390, 1440]) {
  const { page } = await open(browser, w);
  const r = {};
  await hitText(page, ".cookies button", "Not really, no", w); await sleep(300);
  // Naive: tap into "Your email" and "Domain" and type, no clearing
  await hit(page, 'input[placeholder="Your email"]', w); await page.keyboard.type("test", { delay: 20 });
  await hit(page, 'input[placeholder="Domain"]', w); await page.keyboard.type("example", { delay: 20 });
  r.naive = await ld(page);
  await shot(page, `j2b-naive-typing-${w}`);
  // Focus behaviour: does focusing clear the fake placeholder text?
  r.inputType = await page.$$eval(".login-form input", (l) => l.map((i) => ({ ph: i.placeholder, type: i.type, autocomplete: i.autocomplete, inputmode: i.inputMode, tabIndex: i.tabIndex, label: i.labels?.length || 0, aria: i.getAttribute("aria-label") })));
  // Enter key in the email field
  await hit(page, 'input[placeholder="Your email"]', w); await page.keyboard.press("Enter"); await sleep(500);
  r.afterEnter = await ld(page);
  // Reset then inspect the checkbox vs model
  await hit(page, ".login-form .checkbox__box", w); await sleep(200);
  r.beforeReset = await ld(page);
  await hitText(page, ".login-form a", "Reset", w); await sleep(300);
  r.afterReset = await ld(page);
  await shot(page, `j2b-after-reset-${w}`);
  await hitText(page, ".login-form a.button--secondary", "Next", w); await sleep(300);
  r.afterResetNext = await ld(page);
  await shot(page, `j2b-after-reset-next-${w}`);
  // Tick it once more (user tries to fix) -> state?
  await hit(page, ".login-form .checkbox__box", w); await sleep(200);
  r.afterResetTickAgain = await ld(page);
  r.extList = await page.$$eval(".login-form .dropdown__list-item", (l) => l.map((e) => e.innerText.trim()));
  out[w] = r;
}
save("j2b-step1-extra", out);
console.log(JSON.stringify(out, null, 1));
await browser.close();
