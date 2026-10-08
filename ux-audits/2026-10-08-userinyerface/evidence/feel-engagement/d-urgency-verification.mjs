// Scenario D: verification tests for fake urgency / fake queue / progress persistence / reduced motion.
import fs from "node:fs";
import { E, sleep, launch, open, game } from "./lib.mjs";
const log = []; const T0 = Date.now(); const L = (a, r) => { const e = { t: ((Date.now() - T0) / 1000).toFixed(1), a, r }; log.push(e); console.log(e.t, a, JSON.stringify(r).slice(0, 500)); };
const browser = await launch();
const timerOf = (p) => p.evaluate(() => document.querySelector(".view .timer")?.innerText);
// Two concurrent sessions
const s1 = await open(browser); await sleep(5000);
const s2 = await open(browser); await sleep(2600);
L("two sessions, same instant: timers", { s1: await timerOf(s1.page), s2: await timerOf(s2.page) });
const queue = async (p) => { await p.click(".help-form__help-button"); await sleep(200); return p.evaluate(() => document.querySelector(".help-form__response")?.innerText); };
L("help queue: s1, s2", { s1: await queue(s1.page), s2: await queue(s2.page), s1again: await queue(s1.page) });
// progress + timer through reload
await game(s1.page, "g.currentPageIndex = 2"); await sleep(1500);
const pre = { timer: await timerOf(s1.page), step: await s1.page.evaluate(() => document.querySelector(".page-indicator")?.innerText), ls: await s1.page.evaluate(() => [Object.keys(localStorage), Object.keys(sessionStorage)]) };
await s1.page.reload({ waitUntil: "load", timeout: 25000 }).catch(() => {}); await sleep(2600);
L("reload mid-flow (on step 3)", { before: pre, after: { timer: await timerOf(s1.page), step: await s1.page.evaluate(() => document.querySelector(".page-indicator")?.innerText), cookieBannerBack: await game(s1.page, "return g.cookiesIsActive") } });
L("help queue after reload s1", await queue(s1.page));
// Does anything happen when time passes? Inspect what the timer controls
L("timer limit check", await s1.page.evaluate(() => ({ DISABLE_TIMER_MODAL: window.DISABLE_TIMER_MODAL ?? null, timerHandlers: window.timer?.handlers?.length })));
// Back button from game to home
const s3 = await open(browser, { url: "https://userinyerface.com/" }); await sleep(1500);
await s3.page.click("a.start__link").catch(() => {}); await sleep(3500);
await game(s3.page, "g.currentPageIndex = 1"); await sleep(800);
await s3.page.goBack({ timeout: 15000 }).catch(() => {}); await sleep(1500);
await s3.page.goForward({ timeout: 15000 }).catch(() => {}); await sleep(3000);
L("home -> game -> step2 -> Back -> Forward", { url: s3.page.url(), step: await s3.page.evaluate(() => document.querySelector(".page-indicator")?.innerText), timer: await timerOf(s3.page) });
// reduced motion
await s2.page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
L("prefers-reduced-motion: reduce — computed motion", await s2.page.evaluate(() => {
  const h = document.querySelector(".help-form"); h.classList.add("is-hidden"); const hs = getComputedStyle(h).transition; h.classList.remove("is-hidden");
  return { matches: matchMedia("(prefers-reduced-motion: reduce)").matches, helpHidden: hs, pip: getComputedStyle(document.querySelector(".pagination__button")).transition, pipCyclingStill: true, anyRMQuery: [...document.styleSheets].some((s) => { try { return [...s.cssRules].some((r) => /prefers-reduced-motion/.test(r.conditionText || "")); } catch { return false; } }) };
}));
const a0 = await game(s2.page, "return g.activePageIndex"); await sleep(1100); const a1 = await game(s2.page, "return g.activePageIndex");
L("pips still cycle under reduced motion", { a0, a1 });
fs.writeFileSync(`${E}d-log.json`, JSON.stringify(log, null, 2));
await browser.close();
