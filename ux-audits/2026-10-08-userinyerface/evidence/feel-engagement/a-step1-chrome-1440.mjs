// Scenario A @1440: cookie banner, fake pagination, step-1 control states, T&C, confirm modal, help widget, timer modal.
import fs from "node:fs";
import { E, sleep, launch, open, game, styleOf, states, text } from "./lib.mjs";
const log = []; const L = (a, r) => { const e = { t: ((Date.now() - T0) / 1000).toFixed(1), a, r }; log.push(e); console.log(e.t, a, typeof r === "string" ? r : JSON.stringify(r).slice(0, 300)); };
const browser = await launch();
const T0 = Date.now();
const { page, reqs, loadMs } = await open(browser);
const cdp = await page.createCDPSession();
const cookies = async () => (await cdp.send("Network.getAllCookies")).cookies.map((c) => `${c.domain}:${c.name}`);
L("load", { loadMs });
L("cookies-at-load-before-any-click", await cookies());
await sleep(2600);
L("banner", await game(page, "return { cookiesIsActive: g.cookiesIsActive, timer: document.querySelector('.timer').innerText }"));
await page.screenshot({ path: `${E}a-cookie-banner-1440.png` });
// fake pagination sampling
const pips = [];
for (let i = 0; i < 16; i++) { pips.push(await game(page, "return [g.activePageIndex, g.currentPageIndex, document.querySelector('.page-indicator').innerText, document.querySelector('.pagination__button.is-active')?.innerText]")); await sleep(250); }
L("pagination samples (activePageIndex, currentPageIndex, card indicator, highlighted pip) every 250ms", pips);
L("T&C checkbox initial", await page.evaluate(() => ({ checked: document.querySelector("#accept-terms-conditions").checked, label: document.querySelector(".login-form__terms-conditions").innerText })));
// control states
const S = {};
S.cookieNo = await states(page, ".cookies .align__cell:first-child button");
S.cookieYes = await states(page, ".cookies .cookies__button");
L("states cookie", { no: S.cookieNo, yes: S.cookieYes });
await page.click(".cookies .cookies__button"); await sleep(800);
L("after click 'Yes' (it IS a problem)", await game(page, "return { cookiesIsActive: g.cookiesIsActive }"));
await page.screenshot({ path: `${E}a-after-cookie-yes-1440.png` });
await page.click(".cookies .align__cell:first-child button"); await sleep(800);
L("after click 'Not really, no'", { state: await game(page, "return { cookiesIsActive: g.cookiesIsActive }"), cookies: await cookies() });
S.next = await states(page, ".login-form .button-container__secondary a.button--secondary");
S.cancel = await states(page, ".login-form .button-container__primary button");
S.reset = await states(page, ".login-form a.u-right");
S.tcBox = await states(page, ".login-form .checkbox__box");
S.tcInput = await states(page, "#accept-terms-conditions");
S.emailInput = await states(page, ".login-form .align__cell input");
S.extDropdown = await states(page, ".login-form .dropdown__header");
S.pip = await states(page, ".pagination__button");
S.helpSendBottom = await states(page, ".help-form__send-to-bottom-button");
S.helpLink = await states(page, ".help-form__help-button");
S.helpUp = await states(page, ".help-form__close-button");
fs.writeFileSync(`${E}a-control-states-1440.json`, JSON.stringify(S, null, 2));
for (const [k, v] of Object.entries(S)) L(`state-diff ${k}`, v ? { size: `${v.default.w}x${v.default.h}`, tag: v.default.tag, cursor: v.default.cursor, tabIndex: v.default.tabIndex, bg: v.default.backgroundColor, color: v.default.color, ...v.diff, focusIsActive: v.focusIsActive } : "missing");
// keyboard path
await page.mouse.click(700, 5); const tabs = [];
for (let i = 0; i < 14; i++) { await page.keyboard.press("Tab"); tabs.push(await page.evaluate(() => { const e = document.activeElement; const s = getComputedStyle(e); return `${e.tagName}.${String(e.className).slice(0, 30)} "${(e.innerText || e.placeholder || "").trim().slice(0, 20)}" outline:${s.outlineStyle}/${s.outlineWidth} shadow:${s.boxShadow}`; })); }
L("Tab x14 sequence", tabs);
// dropdown open/close timing
await page.click(".login-form .dropdown__header"); await sleep(60);
const dd = [];
for (let i = 0; i < 8; i++) { dd.push(await page.evaluate(() => { const l = document.querySelector(".login-form .dropdown__list"); const s = getComputedStyle(l); return `${Math.round(l.getBoundingClientRect().height)}px op${(+s.opacity).toFixed(2)}`; })); await sleep(80); }
L("email-ext dropdown open, height/opacity every 80ms", dd);
await page.screenshot({ path: `${E}a-dropdown-open-1440.png` });
await page.click(".login-form .dropdown__header"); await sleep(700);
// submit empty (password left empty by rule)
await page.click(".login-form .button-container__secondary a.button--secondary"); await sleep(600);
L("Next with all empty: errors", await page.evaluate(() => ({ tcError: document.querySelector(".login-form__terms-conditions-error")?.innerText, inputBorders: [...document.querySelectorAll(".login-form input")].map((i) => getComputedStyle(i).borderColor), rules: [...document.querySelectorAll(".password-check__password-rule")].map((e) => [e.innerText, getComputedStyle(e).color]) , step: document.querySelector(".page-indicator").innerText })));
await page.screenshot({ path: `${E}a-step1-next-empty-1440.png` });
// untick via the box (label for=)
await page.click(".login-form .checkbox__box"); await sleep(400);
L("after clicking checkbox box", await page.evaluate(() => ({ checked: document.querySelector("#accept-terms-conditions").checked, err: document.querySelector(".login-form__terms-conditions-error")?.innerText || null })));
await page.click(".login-form .checkbox__box"); await sleep(300);
// click the label text -> T&C modal
await page.click(".login-form__terms-conditions"); await sleep(800);
L("click on label text 'I do not accept the Terms & Conditions'", await game(page, "return { termsVisible: g.termsAndConditionsVisible, checked: document.querySelector('#accept-terms-conditions').checked }"));
await page.screenshot({ path: `${E}a-terms-modal-1440.png` });
L("T&C modal", await page.evaluate(() => { const c = document.querySelector(".terms-and-conditions__text-content"); return { title: document.querySelector(".terms-and-conditions__title")?.innerText, scrollH: c.scrollHeight, clientH: c.clientHeight, acceptCls: document.querySelector(".terms-and-conditions__accept-button-container").className, acceptOpacity: getComputedStyle(document.querySelector(".terms-and-conditions__accept-button-container")).opacity, closeVisible: !!document.querySelector(".modal__close-copyright"), cheat: c.innerText.match(/alt[^.]*\./i)?.[0] || null }; }));
await page.keyboard.press("Escape"); await sleep(300);
await page.mouse.click(30, 450); await sleep(300);
await page.click(".terms-and-conditions__accept-button-container button"); await sleep(400);
L("after Escape, backdrop click, Accept click before scrolling", await game(page, "return { termsVisible: g.termsAndConditionsVisible }"));
const cbox = await (await page.$(".terms-and-conditions__text-content")).boundingBox();
await page.mouse.move(cbox.x + 100, cbox.y + 100);
const st0 = await page.evaluate(() => document.querySelector(".terms-and-conditions__text-content").scrollTop);
for (let i = 0; i < 20; i++) { await page.mouse.wheel({ deltaY: 100 }); await sleep(30); }
await sleep(500);
const st1 = await page.evaluate(() => document.querySelector(".terms-and-conditions__text-content").scrollTop);
L("20 wheel ticks of deltaY 100 -> scrollTop px", { before: st0, after: st1 });
// how many ticks to bottom at that rate
const sh = await page.evaluate(() => { const c = document.querySelector(".terms-and-conditions__text-content"); return c.scrollHeight - c.clientHeight; });
L("ticks needed to reach bottom at measured rate", { scrollable: sh, perTick: (st1 - st0) / 20, ticks: Math.round(sh / ((st1 - st0) / 20 || 1)) });
// get out: alt-wheel cheat
await page.keyboard.down("Alt");
for (let i = 0; i < 400; i++) { await page.mouse.wheel({ deltaY: 400 }); if (i % 20 === 0) { const b = await game(page, "return g.$children.length"); } }
await page.keyboard.up("Alt"); await sleep(800);
const reached = await page.evaluate(() => { const c = document.querySelector(".terms-and-conditions__text-content"); return { top: c.scrollTop, max: c.scrollHeight - c.clientHeight, acceptCls: document.querySelector(".terms-and-conditions__accept-button-container").className }; });
L("after alt+wheel x400", reached);
await page.click(".terms-and-conditions__accept-button-container button"); await sleep(500);
L("after Accept", await game(page, "return { termsVisible: g.termsAndConditionsVisible, tcCheckboxStillChecked_meaningNotAccepted: document.querySelector('#accept-terms-conditions').checked }"));
if (await game(page, "return g.termsAndConditionsVisible")) { await game(page, "g.termsAndConditionsVisible = false"); L("forced T&C closed via state (could not exit)", ""); }
// Cancel -> confirm modal
await page.click(".login-form .button-container__primary button"); await sleep(600);
L("confirm modal", await page.evaluate(() => { const m = document.querySelector(".modal"); return m ? { text: m.innerText.replace(/\s+/g, " "), btns: [...m.querySelectorAll("a,button")].map((b) => { const s = getComputedStyle(b); return `${b.tagName} "${b.innerText}" bg:${s.backgroundColor} href:${b.getAttribute("href")}`; }) } : null; }));
await page.screenshot({ path: `${E}a-confirm-modal-1440.png` });
await page.keyboard.press("Escape"); await sleep(200);
L("Escape on confirm modal", await game(page, "return g.confirmModalIsActive"));
await page.evaluate(() => [...document.querySelectorAll(".modal button")].find((b) => b.innerText.trim() === "Cancel").click()); await sleep(400);
L("click modal 'Cancel'", await game(page, "return { confirm: g.confirmModalIsActive, step: g.currentPageIndex }"));
// Help widget
await page.click(".help-form__help-button"); await sleep(300);
const q1 = await page.evaluate(() => document.querySelector(".help-form__response")?.innerText);
await page.click(".help-form__help-button"); await sleep(300);
const q2 = await page.evaluate(() => document.querySelector(".help-form__response")?.innerText);
L("Help link twice", { q1, q2 });
await page.screenshot({ path: `${E}a-help-queue-1440.png` });
await page.click(".help-form__send-to-bottom-button");
const closeAt = Date.now(); const hs = [];
let modalShot = false, reopenAt = null;
while (Date.now() - closeAt < 62000) {
  const s = await page.evaluate(() => { const h = document.querySelector(".help-form"); const g = [...document.querySelectorAll("*")].map((e) => e.__vue__).find((v) => v && (v.$options.name || v.$options._componentTag) === "ui-game"); return { h: Math.round(h.getBoundingClientRect().height), hidden: h.classList.contains("is-hidden"), timer: document.querySelector(".view .timer").innerText, modal: g.timerModalIsActive }; });
  hs.push(`${((Date.now() - closeAt) / 1000).toFixed(0)}s h${s.h}${s.hidden ? " hidden" : ""} ${s.timer}${s.modal ? " TIMER-MODAL" : ""}`);
  if (!s.hidden && reopenAt === null && Date.now() - closeAt > 1500) reopenAt = (Date.now() - closeAt) / 1000;
  if (s.modal && !modalShot) {
    modalShot = true; await sleep(300);
    await page.screenshot({ path: `${E}a-timer-modal-1440.png` });
    L("timer modal", await page.evaluate(() => { const m = [...document.querySelectorAll(".modal")].pop(); return { text: m.innerText.replace(/\s+/g, " "), btn: [...m.querySelectorAll("button")].map((b) => `${b.innerText} bg:${getComputedStyle(b).backgroundColor}`), close: (() => { const c = m.querySelector(".modal__close-copyright"); if (!c) return null; const s = getComputedStyle(c); return { text: c.innerText, color: s.color, size: s.fontSize, cursor: getComputedStyle(c.firstElementChild).cursor }; })() }; }));
  }
  await sleep(1000);
}
L("help widget after 'Send to bottom' (sampled 1/s), reopenAt(s)", { reopenAt, hs });
// Timer modal: Lock / Unlock / ©lose
if (await game(page, "return g.timerModalIsActive")) {
  await page.evaluate(() => [...document.querySelectorAll(".modal button")].find((b) => /Lock/.test(b.innerText)).click()); await sleep(300);
  L("after Lock", await page.evaluate(() => ({ close: !!document.querySelector(".modal .modal__close-copyright"), btn: [...document.querySelectorAll(".modal button")].map((b) => b.innerText) })));
  await page.screenshot({ path: `${E}a-timer-modal-locked-1440.png` });
  await page.evaluate(() => [...document.querySelectorAll(".modal button")].find((b) => /Unlock/.test(b.innerText)).click()); await sleep(300);
  await page.keyboard.press("Escape"); await sleep(200);
  L("Escape on timer modal", await game(page, "return g.timerModalIsActive"));
  await page.evaluate(() => document.querySelector(".modal .modal__close-copyright span").click()); await sleep(400);
  L("after ©lose click", await game(page, "return { modal: g.timerModalIsActive, timer: document.querySelector('.view .timer').innerText }"));
}
L("total requests", { n: reqs.length, hosts: [...new Set(reqs.map((r) => new URL(r.u).host))] });
fs.writeFileSync(`${E}a-log.json`, JSON.stringify(log, null, 2));
await browser.close();
