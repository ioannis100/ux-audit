// J2 step 1: every control except the password field (never typed into).
import { launch, open, sleep, shot, save, text, probe, game, clickText, hit, hitText } from "./lib.mjs";
let W;
const EMAIL = 'input[placeholder="Your email"]', DOMAIN = 'input[placeholder="Domain"]';
const browser = await launch();
const out = {};
const state = (page) => page.evaluate(() => {
  const lf = [...document.querySelectorAll("*")].map((e) => e.__vue__).find((v) => v && v.$options._componentTag === "ui-login-form");
  const vis = (e) => e && e.getBoundingClientRect().width > 0;
  const q = (s) => document.querySelector(s);
  return {
    loginData: lf && { ...lf.loginData, password: lf.loginData.password ? "(non-empty)" : "" },
    emailError: lf?.emailError, passwordError: lf?.passwordError, tcError: lf?.termsAndConditionsError,
    fieldValues: [...document.querySelectorAll(".login-form input[type=text]")].map((i) => i.placeholder === "Choose Password" ? "(pw field: " + (i.value === "Choose Password" ? "shows 'Choose Password'" : "other") + ")" : i.value),
    inputClasses: [...document.querySelectorAll(".login-form input[type=text]")].map((i) => i.className),
    tcChecked: q("#accept-terms-conditions")?.checked,
    extShown: q(".login-form .dropdown__field")?.innerText,
    visibleErrorText: [...document.querySelectorAll("[class*=error]")].filter(vis).map((e) => e.innerText.trim()),
    pwPanel: q(".password-check")?.innerText.replace(/\s+/g, " "),
  };
});
async function setText(page, sel, value) {
  await hit(page, sel, W);
  await page.$eval(sel, (e) => e.select());
  await page.keyboard.press("Backspace");
  if (value) await page.keyboard.type(value, { delay: 15 });
}
const obscured = [];
async function pickExt(page, label) {
  const top = await page.evaluate(() => { const h = document.querySelector(".login-form .dropdown__header"); h.scrollIntoView({ block: "center" }); const r = h.getBoundingClientRect(); const t = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return h.contains(t) ? null : String(t?.className); });
  if (top) obscured.push("ext dropdown header covered by: " + top);
  await hit(page, ".login-form .dropdown__header", W);
  await sleep(300);
  if (!(await page.$eval(".login-form .dropdown", (e) => e.classList.contains("open")))) { obscured.push("real click did not open dropdown; opened via DOM"); await page.$eval(".login-form .dropdown__header", (e) => e.click()); await sleep(300); }
  await hitText(page, ".login-form .dropdown__list-item", label, W);
  await sleep(200);
}
const clickNext = (page) => hitText(page, ".login-form a.button--secondary", "Next", W).then((top) => { if (top !== "self") obscuredLog.push("Next covered by " + top); });
const obscuredLog = [];

for (const w of [390, 1440]) {
  W = w;
  const { page, net, con } = await open(browser, w);
  const r = {};
  try {
  // Cookie banner timing (fires at timer tick seconds===2)
  r.atLoad = await state(page);
  r.layout = await page.evaluate(() => {
    const b = (s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), right: Math.round(r.right) }; };
    const btn = [...document.querySelectorAll("button,a")].filter((e) => e.getBoundingClientRect().width > 0).map((e) => { const r = e.getBoundingClientRect(), s = getComputedStyle(e); return { t: e.innerText.trim().replace(/\s+/g, " ").slice(0, 20), x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), bg: s.backgroundColor, color: s.color, tag: e.tagName, href: e.getAttribute("href"), tabIndex: e.tabIndex }; });
    return { cookies: b(".cookies"), card: b(".login-form__container"), pw: b('input[placeholder="Choose Password"]'), email: b('input[placeholder="Your email"]'), domain: b('input[placeholder="Domain"]'), ext: b(".login-form .dropdown"), tc: b(".login-form__terms-conditions"), help: b(".help-form"), scrollW: document.documentElement.scrollWidth, scrollH: document.documentElement.scrollHeight, btn };
  });
  await shot(page, `j2-step1-load-${w}`);
  await shot(page, `j2-step1-load-full-${w}`, true);
  // Dismiss cookies with "Not really, no"
  await hitText(page, ".cookies button", "Not really, no", W).catch((e) => (r.cookieErr = e.message));
  await sleep(400);
  // Keyboard: Tab order
  await page.evaluate(() => document.activeElement?.blur());
  r.tabOrder = [];
  for (let i = 0; i < 14; i++) {
    await page.keyboard.press("Tab");
    r.tabOrder.push(await page.evaluate(() => { const e = document.activeElement; return e ? `${e.tagName}.${String(e.className).slice(0, 30)}:${(e.innerText || e.placeholder || "").trim().slice(0, 18)}` : null; }));
  }
  // 1. Empty submit
  r.emptyNext = await probe(page, `j2-empty-next-${w}`, () => clickNext(page));
  r.afterEmptyNext = await state(page);
  await shot(page, `j2-empty-next-full-${w}`, true);
  // 2. Fill email + ext, leave T&C pre-ticked ("I do not accept"), Next
  await setText(page, EMAIL, "test");
  await setText(page, DOMAIN, "example");
  await pickExt(page, ".com");
  r.afterFill = await state(page);
  r.nextWithTcTicked = await probe(page, `j2-next-tc-ticked-${w}`, () => clickNext(page));
  r.afterNextTcTicked = await state(page);
  await shot(page, `j2-next-tc-ticked-full-${w}`, true);
  // 2b. Naive user: tap into prefilled field and type without clearing
  await hit(page, 'input[placeholder="Domain"]', W);
  await page.keyboard.type("example", { delay: 15 });
  r.naiveDomainType = await state(page);
  await shot(page, `j2-naive-type-domain-${w}`);
  // Postel / edge variants on the email local part (domain + .com set)
  r.postel = {};
  await setText(page, DOMAIN, "example");
  for (const v of ["you", "Your", "y", "  Test.User  ", "TEST", "test@example.com", "test+tag", "tëst", "😀", "a".repeat(80)]) {
    await setText(page, EMAIL, v);
    await hit(page, ".login-form h3, .page-indicator", W).catch(() => {}); // blur
    await sleep(150);
    const s = await state(page);
    await hitText(page, ".login-form a.button--secondary", "Next", W); await sleep(200);
    const s2 = await state(page);
    r.postel[v.length > 20 ? "a x80" : v] = { shown: s.fieldValues[1].slice(0, 30), stored: s.loginData.emailName.slice(0, 30), emailErrorAfterNext: s2.emailError };
  }
  // Domain typed with its TLD, extension left on "other"
  await setText(page, EMAIL, "test");
  await setText(page, DOMAIN, "example.com");
  await pickExt(page, "other");
  await hitText(page, ".login-form a.button--secondary", "Next", W); await sleep(200);
  r.domainWithTldExtOther = await state(page);
  await shot(page, `j2-domain-with-tld-ext-other-${w}`);
  await setText(page, DOMAIN, "example");
  await pickExt(page, ".com");
  // 3. Click the T&C label text: does it toggle the checkbox or open a modal?
  r.tcLinkTop = await hit(page, ".login-form__terms-conditions", W);
  await sleep(600);
  r.tcLabelClick = { modal: await game(page, "g.termsAndConditionsVisible"), tcChecked: await page.$eval("#accept-terms-conditions", (e) => e.checked) };
  await shot(page, `j2-tc-modal-${w}`);
  r.tcModal = await page.evaluate(() => {
    const c = document.querySelector(".terms-and-conditions__text-content");
    const acc = document.querySelector(".terms-and-conditions__accept-button-container");
    return { scrollH: c?.scrollHeight, clientH: c?.clientHeight, closeAffordance: !!document.querySelector(".modal__close-copyright"), acceptClass: acc?.className, cheat: [...document.querySelectorAll(".terms-and-conditions__text-content p")].map((p) => p.innerText).find((t) => /cheating/.test(t))?.split("\n").pop(), placeholders: (c?.innerText.match(/\[Insert company or website name\]/gi) || []).length, words: c?.innerText.split(/\s+/).length };
  });
  // Accept before scrolling
  await hitText(page, ".terms-and-conditions button", "Accept", W).catch(() => {});
  await sleep(300);
  r.tcAcceptBeforeScroll = await game(page, "g.termsAndConditionsVisible");
  // Escape key / backdrop click
  await page.keyboard.press("Escape"); await sleep(200);
  await page.mouse.click(5, 5); await sleep(200);
  r.tcAfterEscAndBackdrop = await game(page, "g.termsAndConditionsVisible");
  // Wheel scroll rate: 40 wheel events of deltaY 100 over the text
  const tb = await page.$eval(".terms-and-conditions__text", (e) => { const r = e.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
  await page.mouse.move(tb.x, tb.y);
  const readPos = () => page.evaluate(() => { const c = document.querySelector(".terms-and-conditions__text-content"); const t = getComputedStyle(c).transform; return { scrollTop: c.scrollTop, transform: t, inner: c.firstElementChild?.getBoundingClientRect().top }; });
  r.tcScrollStart = await readPos();
  const t0 = Date.now();
  for (let i = 0; i < 40; i++) { await page.mouse.wheel({ deltaY: 100 }); await sleep(30); }
  r.tcScrollAfter40Wheels = { ...(await readPos()), ms: Date.now() - t0 };
  // ALT "cheat" wheel
  await page.keyboard.down("Alt");
  for (let i = 0; i < 40; i++) { await page.mouse.wheel({ deltaY: 100 }); await sleep(30); }
  await page.keyboard.up("Alt");
  r.tcScrollAfter40AltWheels = await readPos();
  r.tcReachedBottom = await page.evaluate(() => [...document.querySelectorAll("*")].map((e) => e.__vue__).find((v) => v && v.$options._componentTag === "ui-terms-and-conditions")?.reachedBottom);
  await shot(page, `j2-tc-after-scroll-${w}`);
  // Leave modal: keep wheeling with alt until bottom (max 400), else force-close via game state
  for (let i = 0; i < 400 && !r.tcReachedBottom2; i++) {
    await page.keyboard.down("Alt"); await page.mouse.wheel({ deltaY: 100 }); await page.keyboard.up("Alt");
    if (i % 20 === 0) r.tcReachedBottom2 = await page.evaluate(() => [...document.querySelectorAll("*")].map((e) => e.__vue__).find((v) => v && v.$options._componentTag === "ui-terms-and-conditions")?.reachedBottom);
  }
  r.tcAltWheelsToBottom = r.tcReachedBottom2 ? "reached" : "not reached in 400 alt-wheels";
  await hitText(page, ".terms-and-conditions button", "Accept", W).catch(() => {});
  await sleep(300);
  r.tcAfterAccept = { modal: await game(page, "g.termsAndConditionsVisible"), tcChecked: await page.$eval("#accept-terms-conditions", (e) => e.checked) };
  if (r.tcAfterAccept.modal) { await game(page, "(g.showTermsAndConditions(false), true)"); r.tcForcedClosed = true; await sleep(300); }
  // 4. Untick the checkbox itself
  r.checkboxTop = await hit(page, ".login-form .checkbox__box", W);
  await sleep(200);
  r.afterUntick = await state(page);
  r.nextPwEmpty = await probe(page, `j2-next-pw-empty-${w}`, () => clickNext(page));
  r.afterNextPwEmpty = await state(page);
  r.stillStep1 = await game(page, "g.currentPageIndex");
  await shot(page, `j2-next-pw-empty-full-${w}`, true);
  // 5. Double-click Next
  const clicksBefore = con.filter((c) => /step complete/.test(c)).length;
  await page.evaluate(() => { const a = [...document.querySelectorAll(".login-form a.button--secondary")].find((e) => e.innerText.trim() === "Next"); a.click(); a.click(); });
  await sleep(300);
  r.doubleNext = { stepCompleteLogs: con.filter((c) => /step complete/.test(c)).length - clicksBefore, page: await game(page, "g.currentPageIndex") };
  // 6. Reset
  r.reset = await probe(page, `j2-reset-${w}`, () => hitText(page, ".login-form a", "Reset", W));
  r.afterReset = await state(page);
  // 7. Cancel -> confirm modal
  r.cancel = await probe(page, `j2-cancel-modal-${w}`, () => hitText(page, ".login-form button", "Cancel", W));
  r.cancelModal = await page.evaluate(() => { const m = [...document.querySelectorAll(".modal")].find((e) => /cancel/i.test(e.innerText)); return m && { text: m.innerText.replace(/\s+/g, " "), btns: [...m.querySelectorAll("a,button")].map((b) => { const s = getComputedStyle(b); return { t: b.innerText.trim(), bg: s.backgroundColor, href: b.getAttribute("href") }; }) }; });
  await hitText(page, ".modal button", "Cancel", W); await sleep(300);
  r.afterModalCancel = { modal: await game(page, "g.confirmModalIsActive"), url: page.url() };
  await hitText(page, ".login-form button", "Cancel", W); await sleep(300);
  const tY = Date.now();
  await Promise.all([page.waitForNavigation({ timeout: 15000 }).catch(() => {}), hitText(page, ".modal a", "Yes", W)]);
  r.afterModalYes = { url: page.url(), ms: Date.now() - tY };
  await sleep(1500);
  await shot(page, `j2-after-cancel-yes-${w}`);
  r.obscured = obscured.splice(0).concat(obscuredLog.splice(0));
  r.console = con.filter((c) => !/Timer::/.test(c));
  r.nonStaticRequests = net.filter((n) => n.m === "POST" || /collect|analytics|gtm/.test(n.u)).map((n) => `${n.m || "FAIL"} ${n.u}`);
  } catch (e) { r.ERROR = e.message; await shot(page, `j2-ERROR-${w}`); }
  out[w] = r;
}
save("j2-step1", out);
console.log(JSON.stringify(out, null, 1).slice(0, 20000));
await browser.close();
