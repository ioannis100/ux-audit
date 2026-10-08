// visual-craft: states — pips over time, errors, T&C modal, confirm modal, cookie dismissed, help collapsed, timer modal, end screen, 390 overflow source.
// No password typed. Fake values only per brief.
import puppeteer from "puppeteer-core";
import fs from "node:fs";
const E = new URL(".", import.meta.url).pathname;
const EXTRACT = fs.readFileSync("~/.claude/skills/ux-audit/scripts/extract-design.js", "utf8");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await puppeteer.launch({ headless: true, executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const log = [];
const L = (m) => { const s = `${new Date().toISOString().slice(11, 19)} ${m}`; log.push(s); console.log(s); };
const G = `[...document.querySelectorAll("*")].map(e=>e.__vue__).find(v=>v&&(v.$options.name||v.$options._componentTag)==="ui-game")`;
const open = async (w, h, mobile) => {
  const page = await (await browser.createBrowserContext()).newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile });
  await page.goto("https://userinyerface.com/game.html", { waitUntil: "load", timeout: 25000 }).catch(() => {});
  await sleep(2500);
  return page;
};
// click the smallest visible element whose own trimmed text === t
const clickText = (page, t) => page.evaluate((t) => {
  const vis = (e) => { const r = e.getBoundingClientRect(), s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none"; };
  const c = [...document.querySelectorAll("a,button,span,div,label,li")].filter((e) => vis(e) && (e.innerText || "").trim().replace(/\s+/g, " ") === t);
  c.sort((a, b) => a.getBoundingClientRect().width * a.getBoundingClientRect().height - b.getBoundingClientRect().width * b.getBoundingClientRect().height);
  if (!c[0]) return false; c[0].click(); return c[0].tagName + "." + c[0].className;
}, t);
const modalInfo = (page) => page.evaluate(() => {
  const vis = (e) => { const r = e.getBoundingClientRect(), s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none" && +s.opacity > 0; };
  return [...document.querySelectorAll("[class*=modal], [class*=terms-and-conditions], [class*=error], [class*=finish], [class*=help-form]")].filter(vis).slice(0, 25).map((e) => {
    const s = getComputedStyle(e), r = e.getBoundingClientRect();
    return { cls: String(e.className).slice(0, 60), text: e.innerText.trim().replace(/\s+/g, " ").slice(0, 160), x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), color: s.color, bg: s.backgroundColor, font: `${s.fontWeight} ${s.fontSize}/${s.lineHeight}`, radius: s.borderRadius, shadow: s.boxShadow.slice(0, 60), border: `${s.borderTopWidth} ${s.borderTopColor}` };
  });
});
const shot = async (page, name, full = false) => { await page.screenshot({ path: `${E}${name}.png`, fullPage: full }); fs.writeFileSync(`${E}${name}.json`, JSON.stringify({ extract: await page.evaluate(EXTRACT), modal: await modalInfo(page) }, null, 2)); L(`shot ${name}`); };

for (const [w, h, mobile] of [[1440, 900, false], [390, 844, true]]) {
  // 1. pips over time + 390 overflow source
  let page = await open(w, h, mobile);
  if (w === 1440) for (let i = 0; i < 4; i++) { const st = await page.evaluate(`(()=>{const g=${G};return [g.currentPageIndex,g.activePageIndex]})()`); await page.screenshot({ path: `${E}pips-1440-t${i}.png`, clip: { x: 520, y: 430, width: 400, height: 200 } }); L(`pips t${i}: card page index ${st[0]} / highlighted pip index ${st[1]}`); await sleep(1000); }
  if (mobile) { const wide = await page.evaluate(() => [...document.querySelectorAll("body *")].map((e) => { const r = e.getBoundingClientRect(); return { cls: String(e.className).slice(0, 50), tag: e.tagName, right: Math.round(r.right), w: Math.round(r.width), minW: getComputedStyle(e).minWidth }; }).filter((x) => x.right > 390).sort((a, b) => b.right - a.right).slice(0, 12)); fs.writeFileSync(`${E}overflow-390.json`, JSON.stringify(wide, null, 2)); L(`390 wider-than-viewport elements: ${wide.slice(0, 5).map((x) => x.tag + "." + x.cls + " r=" + x.right + " w=" + x.w + " minW=" + x.minW).join(" | ")}`); }
  // 2. step 1: Next with empty form → error state
  L(`[${w}] step1 click Next (empty): ${await clickText(page, "Next")}`); await sleep(800); await shot(page, `step1-error-${w}`, true);
  // 3. T&C modal
  L(`[${w}] click T&C: ${await clickText(page, "Terms & Conditions")}`); await sleep(1200); await shot(page, `modal-terms-${w}`);
  await page.evaluate(`(()=>{const g=${G};g.termsAndConditionsVisible=false})()`); L(`[${w}] T&C has no visible close; hidden via state`); await sleep(800);
  // 4. Cancel → confirm modal
  L(`[${w}] click Cancel: ${await clickText(page, "Cancel")}`); await sleep(1000); await shot(page, `modal-confirm-${w}`);
  await page.evaluate(`(()=>{const g=${G};g.confirmModalIsActive=false})()`);
  // 5. cookie banner: "Not really, no"
  L(`[${w}] cookies click "Not really, no": ${await clickText(page, "Not really, no")}`); await sleep(800);
  L(`[${w}] cookiesIsActive after: ${await page.evaluate(`${G}.cookiesIsActive`)}`); await shot(page, `cookie-dismissed-${w}`);
  // 6. help widget collapse arrow
  L(`[${w}] help toggle: ${await page.evaluate(() => { const b = document.querySelector(".help-form button"); b && b.click(); return !!b; })}`); await sleep(1200); await shot(page, `help-toggled-${w}`);
  // 7. step 3 Next empty → errors
  await page.evaluate(`(()=>{const g=${G};g.currentPageIndex=2})()`); await sleep(1000);
  L(`[${w}] step3 Next (empty): ${await clickText(page, "Next")}`); await sleep(1000); await shot(page, `step3-error-${w}`, true);
  await page.evaluate(`(()=>{const g=${G};g.personalDetailsPageErrors=null})()`);
  // 8. step 4 Validate with nothing selected
  await page.evaluate(`(()=>{const g=${G};g.currentPageIndex=3})()`); await sleep(1000);
  L(`[${w}] step4 Validate (none): ${await clickText(page, "Validate")}`); await sleep(1000); await shot(page, `step4-error-${w}`, true);
  // 9. timer modal: wait until the game clock passes 60 s (fires at seconds%60===0)
  if (process.env.SKIP_TIMER) { await page.evaluate(`(()=>{const g=${G};g.gameFinished=true})()`); await sleep(1500); await shot(page, `end-${w}`, true); await page.close(); continue; }
  const t0 = Date.now();
  while (!(await page.evaluate(`${G}.timerModalIsActive`)) && Date.now() - t0 < 75000) await sleep(1000);
  L(`[${w}] timer modal active=${await page.evaluate(`${G}.timerModalIsActive`)} after waiting ${Math.round((Date.now() - t0) / 1000)}s more`); await shot(page, `modal-timer-${w}`);
  // 10. end screen (state jump)
  await page.evaluate(`(()=>{const g=${G};g.timerModalIsActive=false;g.gameFinished=true})()`); await sleep(1500); await shot(page, `end-${w}`, true);
  await page.close();
}
fs.writeFileSync(E + "scenarios-log.txt", log.join("\n"));
await browser.close();
