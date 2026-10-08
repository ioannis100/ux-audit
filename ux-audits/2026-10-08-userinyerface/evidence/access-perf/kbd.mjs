// Keyboard-only pass + accessibility-tree walk, steps 1-4, cookie banner, timer modal.
// Never types into "Choose Password". Steps 2-4 reached by setting ui-game state (per brief).
import puppeteer from "puppeteer-core";
import fs from "node:fs";
const E = new URL(".", import.meta.url).pathname;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await puppeteer.launch({ headless: true,
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const out = {};
const log = (...a) => { console.log(...a); (out.log ||= []).push(a.join(" ")); };

const page = await (await browser.createBrowserContext()).newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("https://userinyerface.com/game.html", { waitUntil: "load", timeout: 25000 }).catch(() => {});
await sleep(3000); // cookie banner shows at t=2s

const setStep = (i) => page.evaluate((i) => {
  const g = [...document.querySelectorAll("*")].map((e) => e.__vue__).find((v) => v && (v.$options.name || v.$options._componentTag) === "ui-game");
  g.activePageIndex = i; g.currentPageIndex = i;
}, i);
const focusInfo = () => page.evaluate(() => {
  const e = document.activeElement; const r = e.getBoundingClientRect(); const s = getComputedStyle(e);
  return { tag: e.tagName, cls: String(e.className).slice(0, 50), text: (e.innerText || e.value || e.placeholder || "").trim().replace(/\s+/g, " ").slice(0, 40),
    x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height),
    outline: s.outlineStyle + " " + s.outlineWidth + " " + s.outlineColor, boxShadow: s.boxShadow };
});
// Inventory of interactive things vs what is keyboard-reachable
const inventory = () => page.evaluate(() => {
  const vis = (e) => { const r = e.getBoundingClientRect(), s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none"; };
  const all = [...document.querySelectorAll("input,button,a,textarea,select,[class*=dropdown__header],[class*=toggle-buttons] > div,.checkbox,.slider__handle,.pagination__button,.modal__close-copyright span")];
  return all.map((e) => ({ tag: e.tagName, type: e.type || null, cls: String(e.className).slice(0, 45),
    text: (e.innerText || e.placeholder || e.value || "").trim().replace(/\s+/g, " ").slice(0, 30),
    visible: vis(e), tabIndex: e.tabIndex, href: e.getAttribute && e.getAttribute("href"), display: getComputedStyle(e).display }));
});
const tabWalk = async (label, n = 30) => {
  await page.evaluate(() => { document.activeElement && document.activeElement.blur(); window.scrollTo(0, 0); });
  const seq = [];
  for (let i = 0; i < n; i++) { await page.keyboard.press("Tab"); seq.push(await focusInfo()); }
  log(`TAB ${label}:`, seq.map((f) => `${f.tag}:${f.text || f.cls}`).join(" -> "));
  return seq;
};
const ax = async (label) => {
  const snap = await page.accessibility.snapshot({ interestingOnly: true });
  const flat = []; const walk = (n, d = 0) => { flat.push(`${"  ".repeat(d)}${n.role} "${(n.name || "").slice(0, 60)}"${n.value !== undefined ? " value=" + n.value : ""}${n.checked !== undefined ? " checked=" + n.checked : ""}${n.focusable ? " [focusable]" : ""}`); (n.children || []).forEach((c) => walk(c, d + 1)); };
  walk(snap); fs.writeFileSync(`${E}ax-${label}.txt`, flat.join("\n")); return flat;
};

// ---------- Step 1 + cookie banner
out.step1 = { inventory: await inventory(), cookieBanner: await page.evaluate(() => { const c = document.querySelector(".cookies"); if (!c) return null; const r = c.getBoundingClientRect(); return { role: c.getAttribute("role"), ariaLive: c.getAttribute("aria-live"), rect: [r.x, r.y, r.width, r.height].map(Math.round), position: getComputedStyle(c).position, activeElementInside: c.contains(document.activeElement) }; }) };
log("cookie banner:", JSON.stringify(out.step1.cookieBanner));
await page.screenshot({ path: `${E}kbd-step1-initial-1440.png` });
out.step1.tab = await tabWalk("step1");
out.step1.ax = await ax("step1");
await page.screenshot({ path: `${E}kbd-step1-after-tabs-1440.png` });
// Can keyboard tick the T&C checkbox? Focus is wherever; try Space/Enter on whatever is focused and see if T&C state changes
const tcState = () => page.evaluate(() => { const i = document.getElementById("accept-terms-conditions"); return i ? { checked: i.checked, display: getComputedStyle(i).display, tabIndex: i.tabIndex } : null; });
log("T&C input:", JSON.stringify(await tcState()));
// Try focusing the T&C input programmatically (what AT would need)
log("T&C focus():", await page.evaluate(() => { const i = document.getElementById("accept-terms-conditions"); i.focus(); return document.activeElement === i; }));
// Next via keyboard: focus Next button if reachable, press Enter, look for errors and aria-live
const next1 = await page.evaluate(() => { const b = [...document.querySelectorAll("a,button")].find((e) => /^Next$/i.test(e.innerText.trim())); return b ? { tag: b.tagName, href: b.getAttribute("href"), tabIndex: b.tabIndex } : null; });
log("Step1 Next element:", JSON.stringify(next1));
// Submit step 1 with the mouse (password left empty, per brief) to read the error semantics
const before = await page.evaluate(() => document.body.innerText.length);
await page.evaluate(() => { const b = [...document.querySelectorAll("a,button")].find((e) => /^Next$/i.test(e.innerText.trim())); b.click(); });
await sleep(800);
out.step1.afterNext = await page.evaluate(() => {
  const errs = [...document.querySelectorAll("[class*=error], [class*=invalid], .password-check__password-rule")].filter((e) => e.getBoundingClientRect().height > 0)
    .map((e) => ({ cls: String(e.className).slice(0, 50), text: e.innerText.trim().slice(0, 80), role: e.getAttribute("role"), live: e.closest("[aria-live]") ? "yes" : "no", id: e.id }));
  const inputs = [...document.querySelectorAll("input")].map((i) => ({ ph: i.placeholder, type: i.type, ariaInvalid: i.getAttribute("aria-invalid"), describedby: i.getAttribute("aria-describedby"), cls: i.className, autocomplete: i.getAttribute("autocomplete"), labels: i.labels ? i.labels.length : 0 }));
  return { errs, inputs, active: document.activeElement.tagName + "." + document.activeElement.className, liveRegions: document.querySelectorAll("[aria-live],[role=alert],[role=status]").length };
});
log("after Next step1:", JSON.stringify(out.step1.afterNext));
await page.screenshot({ path: `${E}kbd-step1-after-next-1440.png` });
await ax("step1-after-next");

// ---------- Dropdown keyboard test (email extension) : focus header? press Enter/ArrowDown
out.dropdown = await page.evaluate(() => { const d = document.querySelector(".dropdown__header"); return d ? { tabIndex: d.tabIndex, role: d.getAttribute("role"), ariaExpanded: d.getAttribute("aria-expanded") } : null; });
log("dropdown header:", JSON.stringify(out.dropdown));

// ---------- Cookie banner via keyboard? Already in tab walk; record whether its buttons were reached
log("cookie buttons reached in tab walk:", out.step1.tab.some((f) => /Not really|Yes/.test(f.text)));

// ---------- Steps 2..4
for (const i of [1, 2, 3]) {
  await setStep(i); await sleep(1200);
  const k = `step${i + 1}`;
  out[k] = { inventory: await inventory() };
  out[k].tab = await tabWalk(k, 40);
  out[k].ax = await ax(k);
  await page.screenshot({ path: `${E}kbd-${k}-1440.png` });
}
// Step 4: captcha semantics
out.captcha = await page.evaluate(() => {
  const imgs = [...document.querySelectorAll(".captcha-gallery__image-container")];
  const cbs = [...document.querySelectorAll(".captcha-gallery input[type=checkbox]")];
  return { title: (document.querySelector(".captcha-gallery h3") || {}).innerText, images: imgs.length, imgsAreCssBackgrounds: imgs.every((e) => e.tagName === "DIV" && /url/.test(e.style.backgroundImage)), anyAlt: imgs.some((e) => e.getAttribute("aria-label") || e.getAttribute("title")), checkboxes: cbs.length, checkboxDisplay: cbs[0] && getComputedStyle(cbs[0]).display, audioOrAlt: !!document.querySelector(".captcha-gallery audio, .captcha-gallery [class*=audio], .captcha-gallery [class*=alternative]") };
});
log("captcha:", JSON.stringify(out.captcha));

// ---------- Headings / landmarks
out.outline = await page.evaluate(() => ({ h: [...document.querySelectorAll("h1,h2,h3,h4")].map((h) => h.tagName + ":" + h.innerText.trim().slice(0, 40)), main: !!document.querySelector("main,[role=main]"), form: document.querySelectorAll("form").length, lang: document.documentElement.lang, title: document.title }));
log("outline (step4):", JSON.stringify(out.outline));

// ---------- Timer modal: wait until 60 s of timer
const t0 = Date.now();
let fired = null;
while (Date.now() - t0 < 75000) {
  const s = await page.evaluate(() => { const g = [...document.querySelectorAll("*")].map((e) => e.__vue__).find((v) => v && (v.$options.name || v.$options._componentTag) === "ui-game"); return { m: g.timerModalIsActive, t: (document.querySelector(".timer") || {}).innerText }; });
  if (s.m) { fired = s; break; }
  await sleep(1000);
}
log("timer modal fired:", JSON.stringify(fired));
if (fired) {
  out.timerModal = await page.evaluate(() => {
    const m = document.querySelector(".modal"); const r = m.getBoundingClientRect();
    return { role: m.getAttribute("role"), ariaModal: m.getAttribute("aria-modal"), labelledby: m.getAttribute("aria-labelledby"), focusInside: m.contains(document.activeElement), active: document.activeElement.tagName + "." + document.activeElement.className, text: m.innerText.replace(/\s+/g, " "), rect: [r.x, r.y, r.width, r.height].map(Math.round), inertBehind: !!document.querySelector("[inert],[aria-hidden=true]") };
  });
  log("timer modal semantics:", JSON.stringify(out.timerModal));
  await page.screenshot({ path: `${E}kbd-timer-modal-1440.png` });
  await page.keyboard.press("Escape"); await sleep(400);
  log("after Escape modal open:", await page.evaluate(() => !!document.querySelector(".modal")));
  const tm = []; for (let i = 0; i < 12; i++) { await page.keyboard.press("Tab"); const f = await focusInfo(); tm.push(`${f.tag}:${f.text || f.cls}`); }
  log("TAB with timer modal open:", tm.join(" -> "));
  out.timerModal.tab = tm;
  // Is the modal reachable/closable by Enter on its button?
  const closed = await page.evaluate(() => { const b = [...document.querySelectorAll(".modal button")].map((b) => b.innerText.trim()); return b; });
  log("timer modal buttons:", JSON.stringify(closed));
  await page.screenshot({ path: `${E}kbd-timer-modal-after-tabs-1440.png` });
}
fs.writeFileSync(E + "kbd.json", JSON.stringify(out, null, 2));
await browser.close();
