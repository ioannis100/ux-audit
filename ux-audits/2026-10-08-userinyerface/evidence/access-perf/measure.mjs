// Contrast/targets (extract-design.js), focus visibility crops, reflow 320, 200% zoom proxy,
// text-spacing, reduced motion, time-to-feedback, T&C modal. Never types into "Choose Password".
import puppeteer from "puppeteer-core";
import fs from "node:fs";
const E = new URL(".", import.meta.url).pathname;
const X = fs.readFileSync("~/.claude/skills/ux-audit/scripts/extract-design.js", "utf8");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await puppeteer.launch({ headless: true,
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const R = {};
const fresh = async (w, h, mobile = false, dsf = mobile ? 2 : 1) => {
  const page = await (await browser.createBrowserContext()).newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: dsf, isMobile: mobile, hasTouch: mobile });
  await page.goto("https://userinyerface.com/game.html", { waitUntil: "load", timeout: 25000 }).catch(() => {});
  await sleep(3000);
  return page;
};
const setStep = (page, i) => page.evaluate((i) => {
  const g = [...document.querySelectorAll("*")].map((e) => e.__vue__).find((v) => v && (v.$options.name || v.$options._componentTag) === "ui-game");
  g.activePageIndex = i; g.currentPageIndex = i; g.timerModalIsActive = false;
}, i);
const overflow = (page) => page.evaluate(() => {
  const vw = document.documentElement.clientWidth;
  const wide = [...document.querySelectorAll("body *")].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && (r.right > vw + 1 || r.left < -1); })
    .filter((e) => !e.closest(".dropdown__list")).slice(0, 8).map((e) => { const r = e.getBoundingClientRect(); return `${e.tagName}.${String(e.className).split(" ")[0]} [${Math.round(r.left)}..${Math.round(r.right)}]`; });
  return { innerWidth, clientWidth: vw, scrollWidth: document.documentElement.scrollWidth, hScroll: document.documentElement.scrollWidth > vw, offenders: wide };
});

// 1) extract-design on steps 1-4 at 390 and 1440
for (const [w, h, m] of [[390, 844, true], [1440, 900, false]]) {
  const page = await fresh(w, h, m);
  for (const i of [0, 1, 2, 3]) {
    if (i) { await setStep(page, i); await sleep(1200); }
    const rep = await page.evaluate(X);
    fs.writeFileSync(`${E}extract-step${i + 1}-${w}.json`, JSON.stringify(rep, null, 2));
  }
  await page.close();
}

// 2) Focus visibility crops at 1440: focus Cancel (step1) and Next (step2), unfocused vs focused
{
  const page = await fresh(1440, 900);
  const crop = async (sel, name) => {
    const r = await page.evaluate((sel) => { const e = [...document.querySelectorAll("button")].find((b) => b.innerText.trim() === sel); e.scrollIntoView({ block: "center", behavior: "instant" }); const r = e.getBoundingClientRect(); return { x: r.x - 20, y: r.y - 20, width: r.width + 40, height: r.height + 40 }; }, sel);
    await page.screenshot({ path: `${E}focus-${name}-blurred.png`, clip: r });
    await page.evaluate((sel) => [...document.querySelectorAll("button")].find((b) => b.innerText.trim() === sel).focus(), sel);
    await page.keyboard.press("Shift"); // keyboard modality for :focus-visible
    await page.screenshot({ path: `${E}focus-${name}-focused.png`, clip: r });
    const fv = await page.evaluate(() => document.activeElement.matches(":focus-visible"));
    return fv;
  };
  R.focusVisibleMatches = { cancel: await crop("Cancel", "step1-cancel") };
  await setStep(page, 1); await sleep(1000);
  R.focusVisibleMatches.next2 = await crop("Next", "step2-next");
  // T&C modal semantics (opened by mouse; the link has no href so keyboard can't open it)
  await setStep(page, 0); await sleep(800);
  await page.evaluate(() => document.querySelector(".login-form__terms-conditions-underline").click());
  await sleep(800);
  R.tcModal = await page.evaluate(() => {
    const m = document.querySelector(".modal"); if (!m) return null;
    const content = document.querySelector(".terms-and-conditions__text-content"); const cs = getComputedStyle(content.parentElement);
    return { role: m.getAttribute("role"), ariaModal: m.getAttribute("aria-modal"), focusInside: m.contains(document.activeElement), active: document.activeElement.tagName,
      textOverflow: cs.overflow, contentTabIndex: content.tabIndex, acceptBtn: (() => { const b = [...m.querySelectorAll("button")].find((b) => /Accept/.test(b.innerText)); if (!b) return null; const s = getComputedStyle(b.parentElement); return { parentCls: b.parentElement.className, opacity: s.opacity, pointer: s.pointerEvents, visibility: s.visibility }; })() };
  });
  // keyboard: Tab into modal, then PageDown/ArrowDown x20, does the text move?
  const top0 = await page.evaluate(() => document.querySelector(".terms-and-conditions__text-content").getBoundingClientRect().top);
  const tabs = []; for (let i = 0; i < 12; i++) { await page.keyboard.press("Tab"); tabs.push(await page.evaluate(() => document.activeElement.tagName + ":" + (document.activeElement.innerText || document.activeElement.className).trim().slice(0, 25))); }
  for (let i = 0; i < 20; i++) await page.keyboard.press("PageDown");
  const top1 = await page.evaluate(() => document.querySelector(".terms-and-conditions__text-content").getBoundingClientRect().top);
  R.tcModal.tabSeq = tabs; R.tcModal.keyboardScrollMovedPx = Math.round(top0 - top1);
  await page.keyboard.press("Escape"); await sleep(300);
  R.tcModal.escapeCloses = !(await page.evaluate(() => !!document.querySelector(".modal")));
  await page.screenshot({ path: `${E}tc-modal-1440.png` });
  await page.close();
}

// 3) Reflow at 320, 200% zoom proxy (720x450 CSS px = 1440x900 at 200%), text spacing at 390
R.reflow = {};
for (const [label, w, h, m, dsf] of [["320", 320, 640, true, 2], ["zoom200", 720, 450, false, 2]]) {
  const page = await fresh(w, h, m, dsf);
  R.reflow[label] = {};
  for (const i of [0, 1, 2, 3]) {
    if (i) { await setStep(page, i); await sleep(1200); }
    R.reflow[label][`step${i + 1}`] = await overflow(page);
    await page.screenshot({ path: `${E}reflow-${label}-step${i + 1}.png`, fullPage: true });
  }
  await page.close();
}
{
  const page = await fresh(390, 844, true);
  await page.addStyleTag({ content: "*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important} p{margin-bottom:2em!important}" });
  await sleep(500);
  R.textSpacing = await page.evaluate(() => [...document.querySelectorAll("button,input,.dropdown__field,a")].filter((e) => e.getBoundingClientRect().width > 0)
    .map((e) => ({ t: (e.innerText || e.value || "").trim().slice(0, 25), clipX: e.scrollWidth > e.clientWidth + 1, clipY: e.scrollHeight > e.clientHeight + 1 })).filter((x) => x.clipX || x.clipY));
  await page.screenshot({ path: `${E}text-spacing-390-step1.png`, fullPage: true });
  await page.close();
}

// 4) Reduced motion: does anything change?
{
  const page = await (await browser.createBrowserContext()).newPage();
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("https://userinyerface.com/game.html", { waitUntil: "load", timeout: 25000 }).catch(() => {});
  await sleep(3000);
  const probe = () => page.evaluate(() => ({ rm: matchMedia("(prefers-reduced-motion: reduce)").matches, anims: document.getAnimations().map((a) => (a.animationName || a.transitionProperty || a.constructor.name) + "@" + (a.effect && a.effect.target ? String(a.effect.target.className).slice(0, 30) : "")).slice(0, 12), animCount: document.getAnimations().length, timer: document.querySelector(".timer").innerText }));
  R.reducedMotion = { step1: await probe() };
  await setStep(page, 1); await sleep(800);
  R.reducedMotion.step2 = await probe();
  // help widget "Send to bottom": 14 s collapse transition under reduced motion?
  await page.evaluate(() => document.querySelector(".help-form__send-to-bottom-button").click());
  await sleep(300);
  R.reducedMotion.helpCollapse = await page.evaluate(() => ({ transition: getComputedStyle(document.querySelector(".help-form")).transition, h: document.querySelector(".help-form").getBoundingClientRect().height }));
  await sleep(5000);
  R.reducedMotion.helpCollapseAfter5s = await page.evaluate(() => document.querySelector(".help-form").getBoundingClientRect().height);
  await page.close();
}

// 5) Time-to-feedback (mouse clicks, real events): Next step1 -> error visible; checkbox -> checked; Next step2 -> errors; cookie
{
  const page = await fresh(1440, 900);
  await page.evaluate(() => {
    window.__t = []; window.__t0 = 0;
    document.addEventListener("pointerdown", () => { window.__t0 = performance.now(); window.__first = null; }, true);
    new MutationObserver(() => { if (window.__t0 && window.__first == null) { window.__first = performance.now() - window.__t0; requestAnimationFrame(() => setTimeout(() => window.__t.push({ mut: window.__first, paint: performance.now() - window.__t0 }), 0)); } })
      .observe(document.body, { subtree: true, childList: true, attributes: true, characterData: true });
  });
  const clickTime = async (label, find) => {
    const box = await page.evaluate(find);
    if (!box) return (R.ttf ||= {})[label] = "not found";
    await page.evaluate(() => { window.__t = []; });
    await page.mouse.click(box.x, box.y);
    await sleep(1500);
    (R.ttf ||= {})[label] = await page.evaluate(() => window.__t[0] || "no DOM change within 1.5s");
  };
  const center = (fn) => `(() => { const e = (${fn})(); if (!e) return null; e.scrollIntoView({block:"center",behavior:"instant"}); const r = e.getBoundingClientRect(); return { x: r.x + r.width/2, y: r.y + r.height/2 }; })()`;
  await clickTime("step1-Next(empty)", center(`() => [...document.querySelectorAll("a")].find((e) => e.innerText.trim() === "Next")`));
  await clickTime("step1-T&C-checkbox", center(`() => document.querySelector(".login-form__section .checkbox__box")`));
  await clickTime("cookie-Yes", center(`() => [...document.querySelectorAll("button")].find((e) => e.innerText.trim() === "Yes")`));
  await clickTime("pagination-2", center(`() => document.querySelectorAll(".pagination__button")[1]`));
  await clickTime("cookie-Not-really-no", center(`() => [...document.querySelectorAll("button")].find((e) => e.innerText.trim() === "Not really, no")`));
  await setStep(page, 1); await sleep(1000);
  await clickTime("step2-interest-checkbox", center(`() => document.querySelector(".avatar-and-interests__interests-list .checkbox__box")`));
  await clickTime("step2-Next(incomplete)", center(`() => [...document.querySelectorAll("button")].find((e) => e.innerText.trim() === "Next")`));
  await page.screenshot({ path: `${E}ttf-step2-after-next-1440.png` });
  R.step2Errors = await page.evaluate(() => { const e = document.querySelector(".avatar-and-interests__errors"); return e ? { text: e.innerText.replace(/\s+/g, " "), live: !!e.closest("[aria-live]"), role: e.getAttribute("role"), active: document.activeElement.tagName + ":" + document.activeElement.innerText } : null; });
  await setStep(page, 2); await sleep(1000);
  await clickTime("step3-Next(empty)", center(`() => [...document.querySelectorAll("button")].find((e) => e.innerText.trim() === "Next")`));
  R.step3Errors = await page.evaluate(() => { const m = document.querySelector(".personal-details-errors-modal"); return m ? { text: m.innerText.replace(/\s+/g, " ").slice(0, 300), role: m.getAttribute("role"), focusInside: m.contains(document.activeElement), active: document.activeElement.tagName + ":" + document.activeElement.innerText.slice(0, 20) } : null; });
  await page.screenshot({ path: `${E}ttf-step3-errors-1440.png` });
  await page.close();
}
// 6) Throttled (Slow 4G-ish) cold load at 390: what is on screen at 1s, 3s, 6s
{
  const page = await (await browser.createBrowserContext()).newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const cdp = await page.createCDPSession();
  await cdp.send("Network.enable");
  await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 400, downloadThroughput: (400 * 1024) / 8, uploadThroughput: (400 * 1024) / 8 });
  const t0 = Date.now();
  page.goto("https://userinyerface.com/game.html", { waitUntil: "load", timeout: 60000 }).catch(() => {});
  R.slow = [];
  for (const t of [1500, 4000, 8000, 14000]) {
    await sleep(t - (Date.now() - t0));
    const s = await page.evaluate(() => ({ app: !!document.querySelector(".game"), cloak: !!document.querySelector("[v-cloak]"), textLen: document.body ? document.body.innerText.length : 0 })).catch((e) => ({ err: String(e).slice(0, 60) }));
    R.slow.push({ t, ...s });
    await page.screenshot({ path: `${E}slow3g-390-${t}ms.png` }).catch(() => {});
  }
  await page.close();
}
fs.writeFileSync(E + "measure.json", JSON.stringify(R, null, 2));
console.log(JSON.stringify(R, null, 1).slice(0, 9000));
await browser.close();
