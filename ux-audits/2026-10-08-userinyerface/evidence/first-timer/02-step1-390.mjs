// Jordan, phone 390x844, real time from tapping HERE: step 1 (account), cookie banner, help widget,
// T&C, Next with the password left EMPTY (hard rule: never type into "Choose Password"), Cancel, Reset,
// the 60 s timer modal, then refresh. Timestamps = seconds since the game page loaded.
import fs from "node:fs";
import { E, sleep, launch, newPage, go, logger, inventory } from "./lib.mjs";
const browser = await launch();
const page = await newPage(browser);
await go(page, "https://userinyerface.com/");
await sleep(1500);
await page.tap(".start__link");
await page.waitForNavigation({ waitUntil: "load", timeout: 25000 }).catch(() => {});
let T0 = Date.now();
await page.evaluate(() => (document.documentElement.style.scrollBehavior = "auto"));
const log = logger(page, () => T0);
const stap = async (sel) => { const el = typeof sel === "string" ? await page.$(sel) : sel; const bb = await el.boundingBox(); try { await el.tap(); return { tapped: true, bb }; } catch (e) { await el.evaluate((x) => x.click()); return { tapped: false, bb, note: "not tappable by touch (" + e.message.slice(0, 40) + "); DOM click used" }; } };
const shot = (n) => page.screenshot({ path: E + n });
const out = {};
await log("game.html loaded after tapping HERE", page.url());
await shot("s1-390-t0.png");
// 5-second test frame + fake pagination check (pips cycle?)
const pips = [];
for (let i = 0; i < 5; i++) {
  pips.push(await page.evaluate(() => [...document.querySelectorAll(".pagination *")].filter((e) => /active|selected|current/.test(e.className)).map((e) => e.innerText.trim()).join(",") || document.querySelector(".pagination")?.innerHTML.slice(0, 200)));
  if (i === 1) await shot("s1-390-t1.png");
  await sleep(1000);
}
await shot("s1-390-5s.png");
await log("pagination active pip sampled each second for 5 s", pips);
out.inv5s = await page.evaluate(`(${inventory})()`);
out.text5s = await page.evaluate(() => document.body.innerText);
out.layout = await page.evaluate(() => {
  const r = (s) => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return { y: Math.round(b.y), h: Math.round(b.height), w: Math.round(b.width), x: Math.round(b.x) }; };
  return { cookies: r(".cookies"), help: r(".help-form"), timer: r(".timer"), pagination: r(".pagination"), card: r(".login-form__container"), rules: r(".password-check"), docH: document.documentElement.scrollHeight, iw: innerWidth };
});
await log("layout measured", out.layout);

// Cookie banner: "Yes" first (does nothing?), then "Not really, no".
const cookieBtns = await page.$$(".cookies button");
await cookieBtns[1]?.tap();
await sleep(600);
await log("tap cookie 'Yes'", await page.evaluate(() => !!document.querySelector(".cookies")) ? "banner still there, nothing happened" : "banner gone");
await shot("s1-390-cookie-yes-tapped.png");
await cookieBtns[0]?.tap();
await sleep(600);
await log("tap cookie 'Not really, no'", await page.evaluate(() => !!document.querySelector(".cookies")) ? "banner still there" : "banner gone");
await shot("s1-390-cookie-dismissed.png");

// Email local part: tap and type like a person (no select-all first).
const email = await page.$('input[placeholder="Your email"]');
await email.tap();
await sleep(300);
const focusInfo = await page.evaluate(() => { const e = document.activeElement; return { val: e.value, selStart: e.selectionStart, selEnd: e.selectionEnd, type: e.type, inputmode: e.inputMode, autocomplete: e.autocomplete }; });
await log("tap 'Your email' field", focusInfo);
await page.keyboard.type("test", { delay: 60 });
await log("type 'test'", await page.evaluate(() => document.activeElement.value));
await shot("s1-390-email-typed-naively.png");
// Fix it: select all and retype
await page.evaluate(() => document.activeElement.select());
await page.keyboard.type("test", { delay: 60 });
await log("select-all + type 'test'", await page.evaluate(() => document.activeElement.value));
// Domain
const dom = await page.$('input[placeholder="Domain"]');
await dom.tap();
await page.evaluate(() => document.activeElement.select());
await page.keyboard.type("example", { delay: 60 });
await log("domain: select-all + type 'example'", await page.evaluate(() => document.activeElement.value));
// Blur test: tab away and back; what if I typed "Your" (prefix of placeholder)?
// Extension dropdown
await page.tap(".login-form .dropdown__header");
await sleep(500);
await shot("s1-390-ext-dropdown-open.png");
const extItems = await page.$$eval(".login-form .dropdown__list-item", (els) => els.map((e) => { const r = e.getBoundingClientRect(); return { t: e.innerText.trim(), y: Math.round(r.y), h: Math.round(r.height), vis: r.height > 0 }; }));
await log("open extension dropdown", extItems);
const com = (await page.$$(".login-form .dropdown__list-item"))[extItems.findIndex((i) => i.t === ".com")];
await com?.tap().catch(async () => com.click());
await sleep(400);
await log("pick '.com'", await page.$eval(".login-form .dropdown__field", (e) => e.innerText));
await shot("s1-390-email-filled.png");

// T&C checkbox: read state, then tap the BOX only
out.tcBefore = await page.evaluate(() => ({ checked: document.querySelector("#accept-terms-conditions").checked, label: document.querySelector(".login-form__terms-conditions").innerText }));
await log("T&C checkbox state at arrival", out.tcBefore);

// Next with password EMPTY, T&C untouched -> what errors do I get?
const nextA = await page.evaluateHandle(() => [...document.querySelectorAll("a")].find((e) => e.innerText.trim() === "Next"));
await nextA.tap();
await sleep(600);
out.afterNext1 = await page.evaluate(() => ({ text: document.querySelector(".login-form-with-pw-check")?.innerText, pwClass: document.querySelector('input[placeholder="Choose Password"]')?.className, emailClass: document.querySelector('input[placeholder="Your email"]')?.className, tcErr: document.querySelector(".login-form__terms-conditions-error")?.innerText || null, pwColor: getComputedStyle(document.querySelector('input[placeholder="Choose Password"]')).borderColor + " / " + getComputedStyle(document.querySelector('input[placeholder="Choose Password"]')).backgroundColor }));
await log("tap Next (password empty, T&C box untouched)", out.afterNext1);
await shot("s1-390-next-empty-pw.png");
await page.screenshot({ path: E + "s1-390-next-empty-pw-full.png", fullPage: true });

// Untick "I do not accept" via the box
await page.tap(".login-form .checkbox__box");
await sleep(400);
await log("tap the T&C checkbox box", await page.evaluate(() => document.querySelector("#accept-terms-conditions").checked));
// Tap the label text (what you'd normally do to tick a box)
await page.tap(".login-form__terms-conditions-underline");
await sleep(800);
const tcOpen = await page.evaluate(() => !!document.querySelector(".terms-and-conditions"));
await log("tap the words 'Terms & Conditions'", tcOpen ? "T&C modal opened" : "nothing");
await shot("s1-390-tc-modal.png");
if (tcOpen) {
  out.tc = await page.evaluate(() => { const c = document.querySelector(".terms-and-conditions__text-content"); const b = document.querySelector(".terms-and-conditions__accept-button-container"); return { title: document.querySelector(".terms-and-conditions__title").innerText, first: c.innerText.slice(0, 300), len: c.innerText.length, scrollH: c.scrollHeight, clientH: c.clientHeight, acceptCls: b.className, cheat: document.querySelector(".terms-and-conditions")?.innerText.match(/cheating[^.]*\./)?.[0] || null, placeholders: (c.innerText.match(/\[insert[^\]]*\]/gi) || []).length }; });
  await log("read T&C modal", out.tc);
  // Try Accept before scrolling
  await page.tap(".terms-and-conditions__accept-button-container button");
  await sleep(400);
  await log("tap Accept without scrolling", await page.evaluate(() => !!document.querySelector(".terms-and-conditions")) ? "still open (disabled)" : "closed");
  // Swipe up 5 times like a person, measure progress
  const box = await (await page.$(".terms-and-conditions__text-content")).boundingBox();
  const prog = [];
  const tSw = Date.now();
  for (let i = 0; i < 5; i++) {
    const cdp = await page.createCDPSession();
    await cdp.send("Input.synthesizeScrollGesture", { x: Math.round(box.x + box.width / 2), y: Math.round(box.y + box.height * 0.8), yDistance: -Math.round(box.height * 0.6), speed: 1200, gestureSourceType: "touch" });
    prog.push(await page.evaluate(() => { const c = document.querySelector(".terms-and-conditions__text-content"); return [Math.round(c.scrollTop), c.scrollHeight - c.clientHeight, getComputedStyle(c.firstElementChild || c).transform]; }));
  }
  await log("5 full-height swipes on the T&C text", { prog, ms: Date.now() - tSw });
  await shot("s1-390-tc-after-5-swipes.png");
  // Also wheel
  const p2 = [];
  for (let i = 0; i < 10; i++) { await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await page.mouse.wheel({ deltaY: 400 }); await sleep(80); }
  p2.push(await page.evaluate(() => { const c = document.querySelector(".terms-and-conditions__text-content"); return [Math.round(c.scrollTop), c.scrollHeight - c.clientHeight, c.style.transform || getComputedStyle(c).transform]; }));
  await log("10 wheel ticks (deltaY 400)", p2);
  // Is there any close / escape?
  await page.keyboard.press("Escape");
  await sleep(300);
  await log("press Escape on T&C", await page.evaluate(() => !!document.querySelector(".terms-and-conditions")) ? "still open, no close control" : "closed");
  // Reach bottom via the component's own scroll controller to see the accept path, then accept
  const reached = await page.evaluate(() => { const v = document.querySelector(".terms-and-conditions").__vue__; v.setBottomReached(true); return v.reachedBottom; });
  await page.tap(".terms-and-conditions__accept-button-container button");
  await sleep(500);
  await log("(state-set bottom reached) tap Accept", await page.evaluate(() => document.querySelector(".terms-and-conditions") ? "still open" : "closed; T&C box checked = " + document.querySelector("#accept-terms-conditions").checked));
}
// Next again (password still empty)
const nextB = await page.evaluateHandle(() => [...document.querySelectorAll("a")].find((e) => e.innerText.trim() === "Next"));
await nextB.tap();
await sleep(500);
out.afterNext2 = await page.evaluate(() => ({ tcErr: document.querySelector(".login-form__terms-conditions-error")?.innerText || null, box: document.querySelector("#accept-terms-conditions").checked, pwClass: document.querySelector('input[placeholder="Choose Password"]')?.className, rules: document.querySelector(".password-check")?.innerText }));
await log("tap Next again (password still empty)", out.afterNext2);
await shot("s1-390-next-2.png");

// Help widget
const help0 = await page.evaluate(() => { const h = document.querySelector(".help-form"); const r = h.getBoundingClientRect(); return { cls: h.className, y: Math.round(r.y), h: Math.round(r.height), w: Math.round(r.width) }; });
await log("help widget geometry", help0);
await page.tap(".help-form__close-button");
await sleep(500);
await shot("s1-390-help-chevron-tapped.png");
await log("tap help chevron (looks like 'collapse')", await page.evaluate(() => { const h = document.querySelector(".help-form"); return { cls: h.className, h: Math.round(h.getBoundingClientRect().height) }; }));
await page.tap(".help-form__text-area");
await page.keyboard.type("where is this ", { delay: 80 });
await page.keyboard.type("form going ", { delay: 80 });
await log("type in help: 'where is this form going '", await page.$eval(".help-form__text-area", (e) => e.value));
out.helpTap = await stap(".help-form__help-button");
await sleep(400);
await log("tap 'Help' " + JSON.stringify(out.helpTap), await page.evaluate(() => document.querySelector(".help-form__response")?.innerText || "no response"));
out.helpTap = await stap(".help-form__help-button");
await sleep(300);
await log("tap 'Help' again", await page.evaluate(() => document.querySelector(".help-form__response")?.innerText || "no response"));
await shot("s1-390-help-response.png");
out.sendTap = await stap(".help-form__send-to-bottom-button");
await sleep(500);
await log("tap 'Send to bottom'", await page.evaluate(() => { const h = document.querySelector(".help-form"); return { cls: h.className, h: Math.round(h.getBoundingClientRect().height), text: h.querySelector("textarea").value }; }));
await shot("s1-390-help-sent-to-bottom.png");

// Cancel (the filled, primary-looking button)
const cancel = await page.evaluateHandle(() => [...document.querySelectorAll(".login-form button")].find((e) => e.innerText.trim() === "Cancel"));
await cancel.tap();
await sleep(500);
out.cancelModal = await page.evaluate(() => document.querySelector(".modal")?.innerText || null);
await log("tap 'Cancel' (filled primary button)", out.cancelModal);
await shot("s1-390-cancel-modal.png");
// In the modal, tap the green "Cancel" (= cancel the cancel)
const mCancel = await page.evaluateHandle(() => [...document.querySelectorAll(".modal button")].find((e) => e.innerText.trim() === "Cancel"));
await mCancel.tap();
await sleep(400);
await log("in modal tap green 'Cancel'", await page.evaluate(() => ({ modal: !!document.querySelector(".modal"), url: location.pathname, email: document.querySelector('input[placeholder="Your email"]')?.value })));

// Reset
const reset = await page.evaluateHandle(() => [...document.querySelectorAll("a")].find((e) => e.innerText.trim() === "Reset"));
await reset.tap();
await sleep(400);
await log("tap 'Reset'", await page.evaluate(() => ({ email: document.querySelector('input[placeholder="Your email"]').value, domain: document.querySelector('input[placeholder="Domain"]').value, ext: document.querySelector(".login-form .dropdown__field").innerText, tc: document.querySelector("#accept-terms-conditions").checked })));
await shot("s1-390-after-reset.png");

// Wait for the timer modal (fires when seconds % 60 === 0)
const tW = Date.now();
while (Date.now() - tW < 75000) { if (await page.evaluate(() => !!document.querySelector(".modal") && /time is ticking/i.test(document.querySelector(".modal").innerText))) break; await sleep(250); }
out.timerModal = await page.evaluate(() => { const m = document.querySelector(".modal"); return m ? { text: m.innerText, html: m.innerHTML.slice(0, 600) } : null; });
await log("timer modal", out.timerModal);
await shot("s1-390-timer-modal.png");
if (out.timerModal) {
  await sleep(2000);
  await shot("s1-390-timer-modal-2s.png");
  await page.keyboard.press("Escape"); await sleep(300);
  await log("Escape on timer modal", await page.evaluate(() => !!document.querySelector(".modal")) ? "still open" : "closed");
  await page.mouse.click(10, 10); await sleep(300);
  await log("tap backdrop", await page.evaluate(() => !!document.querySelector(".modal")) ? "still open" : "closed");
  const closeEl = await page.$(".modal__close-copyright span");
  out.closeGeom = closeEl ? await closeEl.evaluate((e) => { const r = e.getBoundingClientRect(), s = getComputedStyle(e); return { text: e.parentElement.innerText, w: Math.round(r.width), h: Math.round(r.height), font: s.fontSize, color: s.color }; }) : null;
  await log("close control found", out.closeGeom);
  if (closeEl) { await closeEl.tap(); await sleep(400); }
  await log("tap '©lose'", await page.evaluate(() => !!document.querySelector(".modal")) ? "still open" : "closed");
}
// Refresh mid-flow: does anything survive?
await page.evaluate(() => { document.querySelector('input[placeholder="Your email"]').value; });
const emailEl = await page.$('input[placeholder="Your email"]');
await emailEl.tap(); await page.evaluate(() => document.activeElement.select()); await page.keyboard.type("test");
const timerBefore = await page.$eval(".timer", (e) => e.innerText);
await page.reload({ waitUntil: "load", timeout: 25000 }).catch(() => {});
await sleep(1500);
await log("reload mid-step-1", await page.evaluate((tb) => ({ timerBefore: tb, timerAfter: document.querySelector(".timer")?.innerText, email: document.querySelector('input[placeholder="Your email"]')?.value, cookies: !!document.querySelector(".cookies") }), timerBefore));
out.net = page.__net.filter((r) => !/fonts|\.png|\.jpg|\.svg|\.gif|\.css/.test(r));
out.log = log.rows;
fs.writeFileSync(E + "step1-390.json", JSON.stringify(out, null, 2));
await browser.close();
