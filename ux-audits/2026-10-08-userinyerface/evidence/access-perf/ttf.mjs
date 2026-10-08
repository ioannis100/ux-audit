// Time-to-feedback (timer ticks excluded), checkbox visual state polling, step-3 Next under help widget,
// timer-modal Lock via keyboard, slow-network cold load. Never types into "Choose Password".
import puppeteer from "puppeteer-core";
import fs from "node:fs";
const E = new URL(".", import.meta.url).pathname;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await puppeteer.launch({ headless: true,
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const R = {};
const fresh = async (w = 1440, h = 900) => {
  const page = await (await browser.createBrowserContext()).newPage();
  await page.setViewport({ width: w, height: h });
  await page.goto("https://userinyerface.com/game.html", { waitUntil: "load", timeout: 25000 }).catch(() => {});
  await sleep(3000);
  return page;
};
const game = `[...document.querySelectorAll("*")].map((e) => e.__vue__).find((v) => v && (v.$options.name || v.$options._componentTag) === "ui-game")`;
const setStep = (page, i) => page.evaluate(`(() => { const g = ${game}; g.activePageIndex = ${i}; g.currentPageIndex = ${i}; })()`);
const install = (page) => page.evaluate(() => {
  window.__t = [];
  document.addEventListener("pointerdown", () => { window.__t0 = performance.now(); window.__first = null; }, true);
  new MutationObserver((ms) => {
    if (!window.__t0 || window.__first != null) return;
    if (ms.every((m) => (m.target.nodeType === 1 ? m.target : m.target.parentElement).closest(".timer"))) return; // ignore timer ticks
    window.__first = performance.now() - window.__t0;
    requestAnimationFrame(() => setTimeout(() => window.__t.push({ firstDomChangeMs: Math.round(window.__first), nextPaintMs: Math.round(performance.now() - window.__t0) }), 0));
  }).observe(document.body, { subtree: true, childList: true, attributes: true, characterData: true });
});
const at = async (page, fn) => page.evaluate(`(() => { const e = (${fn})(); if (!e) return null; e.scrollIntoView({block:"center",behavior:"instant"}); const r = e.getBoundingClientRect(); const x = r.x + Math.min(r.width/2, 30), y = r.y + r.height/2; const hit = document.elementFromPoint(x, y); return { x, y, hitIsTarget: e === hit || e.contains(hit), hit: hit && hit.className && String(hit.className).slice(0,40) }; })()`);
const timeClick = async (page, label, fn) => {
  const p = await at(page, fn); if (!p) return (R[label] = "not found");
  await page.evaluate(() => { window.__t = []; });
  await page.mouse.click(p.x, p.y); await sleep(1500);
  R[label] = { hitIsTarget: p.hitIsTarget, hit: p.hit, ...(await page.evaluate(() => window.__t[0] || { result: "no DOM change in 1.5s (timer ticks excluded)" })) };
};
// checkbox: poll the check icon opacity per frame
const timeCheckbox = async (page, label, sel) => {
  const p = await at(page, `() => document.querySelector("${sel} .checkbox__box")`);
  await page.evaluate((sel) => {
    const box = document.querySelector(sel); const chk = box.querySelector(".checkbox__check"); const inp = box.querySelector("input");
    window.__cb = { start: null, samples: [] };
    document.addEventListener("pointerdown", () => { window.__cb.start = performance.now(); const loop = () => { const t = performance.now() - window.__cb.start; window.__cb.samples.push([Math.round(t), inp.checked, +getComputedStyle(chk).opacity]); if (t < 600) requestAnimationFrame(loop); }; requestAnimationFrame(loop); }, { capture: true, once: true });
  }, sel);
  await page.mouse.click(p.x, p.y); await sleep(900);
  const cb = await page.evaluate(() => window.__cb.samples);
  const first = cb.find((s) => s[2] > 0.05) || null; const full = cb.find((s) => s[2] >= 0.99) || null;
  R[label] = { hitIsTarget: p.hitIsTarget, before: cb[0], firstVisibleChangeMs: first && first[0], fullyShownMs: full && full[0], last: cb[cb.length - 1] };
};

{
  const page = await fresh(); await install(page);
  await timeClick(page, "step1 Next (password empty)", `() => [...document.querySelectorAll("a")].find((e) => e.innerText.trim() === "Next")`);
  await timeCheckbox(page, "step1 T&C checkbox (untick)", ".login-form__section .checkbox");
  await timeClick(page, "cookie Yes", `() => [...document.querySelectorAll("button")].find((e) => e.innerText.trim() === "Yes")`);
  await timeClick(page, "pagination button 2", `() => document.querySelectorAll(".pagination__button")[1]`);
  await timeClick(page, "cookie Not really, no", `() => [...document.querySelectorAll("button")].find((e) => e.innerText.trim() === "Not really, no")`);
  await setStep(page, 1); await sleep(1000);
  await timeCheckbox(page, "step2 interest checkbox", ".avatar-and-interests__interests-list__item .checkbox");
  await timeClick(page, "step2 Next (incomplete)", `() => [...document.querySelectorAll("button")].find((e) => e.innerText.trim() === "Next")`);
  R.step2Spinner = await page.evaluate(() => { const s = document.querySelector(".spinner"); const r = s.getBoundingClientRect(); return { w: r.width, h: r.height, opacity: getComputedStyle(s).opacity, display: getComputedStyle(s).display, visibility: getComputedStyle(s).visibility }; });
  await setStep(page, 2); await sleep(1000);
  // Step-3 Next at its true centre: is it covered by the help widget at 1440x900?
  R.step3NextCovered = await page.evaluate(() => { const b = [...document.querySelectorAll("button")].find((e) => e.innerText.trim() === "Next"); b.scrollIntoView({ block: "center", behavior: "instant" }); const r = b.getBoundingClientRect(); const pts = [[r.x + 5, r.y + r.height / 2], [r.x + r.width / 2, r.y + r.height / 2], [r.right - 5, r.y + r.height / 2]]; return { rect: [r.x, r.y, r.width, r.height].map(Math.round), hits: pts.map(([x, y]) => { const h = document.elementFromPoint(x, y); return b === h || b.contains(h) ? "Next" : String(h.className).slice(0, 30); }) }; });
  await page.screenshot({ path: `${E}step3-next-under-help-1440.png` });
  await timeClick(page, "step3 Next (empty fields)", `() => [...document.querySelectorAll("button")].find((e) => e.innerText.trim() === "Next")`);
  R.step3ErrorModal = await page.evaluate(() => { const m = document.querySelector(".personal-details-errors-modal"); return m ? { text: m.innerText.replace(/\s+/g, " ").slice(0, 400), role: m.getAttribute("role"), ariaModal: m.getAttribute("aria-modal"), focusInside: m.contains(document.activeElement), active: document.activeElement.tagName + ":" + (document.activeElement.innerText || "").slice(0, 20) } : null; });
  await page.screenshot({ path: `${E}step3-error-modal-1440.png` });
  // Keyboard: can the error modal be dismissed with keys? Tab x6 then Enter on what is focused
  const seq = []; for (let i = 0; i < 8; i++) { await page.keyboard.press("Tab"); seq.push(await page.evaluate(() => document.activeElement.tagName + ":" + (document.activeElement.innerText || document.activeElement.className).trim().slice(0, 20))); }
  R.step3ErrorModalTab = seq;
  await page.keyboard.press("Escape"); await sleep(300);
  R.step3ErrorModalEscCloses = !(await page.evaluate(() => !!document.querySelector(".personal-details-errors-modal")));
  await page.close();
}
// Timer modal: force it open, Tab to Lock, Enter -> is ©lose removed?
{
  const page = await fresh();
  await page.evaluate(`(() => { const g = ${game}; g.timerModalIsActive = true; })()`); await sleep(500);
  const before = await page.evaluate(() => ({ close: !!document.querySelector(".modal__close-copyright"), closeTag: (document.querySelector(".modal__close-copyright span") || {}).tagName, closeTab: (document.querySelector(".modal__close-copyright span") || {}).tabIndex }));
  await page.evaluate(() => [...document.querySelectorAll(".modal button")].find((b) => b.innerText.trim() === "Lock").focus());
  await page.keyboard.press("Enter"); await sleep(400);
  const after = await page.evaluate(() => ({ close: !!document.querySelector(".modal__close-copyright"), buttons: [...document.querySelectorAll(".modal button")].map((b) => b.innerText.trim()), timer: document.querySelector(".timer").innerText }));
  await sleep(3000);
  after.timerAfter3s = await page.evaluate(() => document.querySelector(".timer").innerText);
  await page.screenshot({ path: `${E}timer-modal-locked-1440.png` });
  R.timerModalLock = { before, after };
  await page.close();
}
// Slow network cold load at 390 (400 kbps, 400 ms RTT): blank until app.js arrives?
{
  const page = await (await browser.createBrowserContext()).newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const cdp = await page.createCDPSession();
  await cdp.send("Network.enable");
  await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 400, downloadThroughput: (400 * 1024) / 8, uploadThroughput: (400 * 1024) / 8 });
  const reqs = {}; page.on("requestfinished", (r) => { reqs[r.url().split("?")[0].slice(0, 70)] = Date.now(); });
  const t0 = Date.now();
  page.goto("https://userinyerface.com/game.html", { waitUntil: "load", timeout: 90000 }).catch(() => {});
  R.slow = [];
  for (const t of [3000, 8000, 12000, 16000, 22000, 30000]) {
    await sleep(Math.max(0, t - (Date.now() - t0)));
    const s = await page.evaluate(() => ({ cloaked: !!document.querySelector("[v-cloak]"), visibleText: document.body ? document.body.innerText.trim().length : 0, timer: (document.querySelector(".timer") || {}).innerText })).catch((e) => ({ err: String(e).slice(0, 50) }));
    R.slow.push({ t, ...s });
    await page.screenshot({ path: `${E}slow-390-${t}ms.png` }).catch(() => {});
  }
  R.slowRequestsFinishedAtMs = Object.fromEntries(Object.entries(reqs).map(([u, t]) => [u, t - t0]));
  await page.close();
}
fs.writeFileSync(E + "ttf.json", JSON.stringify(R, null, 2));
console.log(JSON.stringify(R, null, 1));
await browser.close();
