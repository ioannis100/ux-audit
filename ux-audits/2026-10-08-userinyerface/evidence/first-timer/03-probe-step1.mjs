// Probe: does tapping Next / the T&C words / the checkbox actually change state, and what is visible?
import { E, sleep, launch, newPage, go, game } from "./lib.mjs";
const browser = await launch();
const page = await newPage(browser);
await go(page, "https://userinyerface.com/game.html");
await sleep(3500);
const st = () => page.evaluate((g) => { const G = eval(g); const lf = G.$children.find((c) => c.$refs && c.$refs["login-form"])?.$refs["login-form"]; return { tcVisible: G.termsAndConditionsVisible, emailError: lf?.emailError, pwError: lf?.passwordError, tcError: lf?.termsAndConditionsError, dont: lf?.loginData.dontAcceptTermsConditions, boxChecked: document.querySelector("#accept-terms-conditions").checked, vv: [visualViewport.width, visualViewport.height, visualViewport.scale], iw: innerWidth, sw: document.documentElement.scrollWidth }; }, game);
console.log("initial", await st());
const pw = await page.$eval('input[placeholder="Choose Password"]', (e) => [e.className, getComputedStyle(e).borderColor, getComputedStyle(e).color]);
console.log("pw field before Next", pw);
const cb = await page.$$(".cookies button"); await cb[0].tap(); await sleep(400);
const next = await page.evaluateHandle(() => [...document.querySelectorAll("a")].find((e) => e.innerText.trim() === "Next"));
console.log("next box", await next.boundingBox());
await next.tap(); await sleep(500);
console.log("after tap Next", await st(), await page.$eval('input[placeholder="Choose Password"]', (e) => [e.className, getComputedStyle(e).borderColor, getComputedStyle(e).color]));
await page.screenshot({ path: E + "probe-after-next.png" });
await next.click(); await sleep(500);
console.log("after click Next", await st(), await page.evaluate(() => document.querySelector(".login-form__terms-conditions-error")?.innerText));
await page.screenshot({ path: E + "probe-after-next-click.png" });
// checkbox
const box = await page.$(".login-form .checkbox__box"); console.log("box", await box.boundingBox());
await box.tap(); await sleep(400); console.log("after tap box", await st());
await page.$eval("#accept-terms-conditions", (e) => e.click()); await sleep(300); console.log("after input.click()", await st());
// words
const w = await page.$(".login-form__terms-conditions-underline"); console.log("words", await w.boundingBox());
await w.tap(); await sleep(600); console.log("after tap words", await st());
await w.click(); await sleep(600); console.log("after click words", await st(), !!(await page.$(".terms-and-conditions")));
await page.screenshot({ path: E + "probe-tc.png" });
await browser.close();
