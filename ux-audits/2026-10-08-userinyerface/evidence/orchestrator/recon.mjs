// Orchestrator recon: live-DOM inventory of userinyerface.com (visible headless Chrome).
import puppeteer from "puppeteer-core";
import fs from "node:fs";
const E = new URL(".", import.meta.url).pathname;
const browser = await puppeteer.launch({ headless: true,
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const ctx = await browser.createBrowserContext();
const page = await ctx.newPage();
await page.setViewport({ width: 1440, height: 900 });
const reqs = [];
page.on("request", (r) => reqs.push(r.method() + " " + r.url().slice(0, 100)));
await page.goto("https://userinyerface.com", { waitUntil: "load", timeout: 25000 }).catch(() => {}); await new Promise((r) => setTimeout(r, 2500));
await page.screenshot({ path: E + "home-1440.png" });
const inv = (label) => page.evaluate((label) => {
  const vis = (e) => { const r = e.getBoundingClientRect(), s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none"; };
  const els = [...document.querySelectorAll("a,button,input,select,textarea,label,[class*=link],[class*=button],[class*=checkbox]")].filter(vis)
    .map((e) => ({ tag: e.tagName, type: e.type || null, cls: String(e.className).slice(0, 50), text: (e.innerText || e.value || e.placeholder || "").trim().replace(/\s+/g, " ").slice(0, 60) }));
  const vueEls = [...document.querySelectorAll("*")].filter((e) => e.__vue__);
  const root = vueEls[0]?.__vue__.$root;
  const comps = vueEls.map((e) => e.__vue__).filter((v, i, a) => a.indexOf(v) === i)
    .map((v) => ({ name: v.$options.name || v.$options._componentTag || "anon", data: Object.keys(v.$data || {}).slice(0, 25) }));
  return { label, url: location.href, title: document.title, text: document.body.innerText.replace(/\s+/g, " ").slice(0, 600), els, comps: comps.slice(0, 15), rootData: root ? JSON.stringify(root.$data).slice(0, 400) : null };
}, label);
const out = { home: await inv("home") };
// Click the obvious "HERE" / next link to reach the game.
const clicked = await page.evaluate(() => {
  const c = [...document.querySelectorAll("a,span,button")].find((e) => /^HERE$/i.test(e.innerText.trim()));
  if (c) { c.click(); return c.tagName + " " + c.className; } return null;
});
await new Promise((r) => setTimeout(r, 1500));
out.clickedHere = clicked;
out.game = await inv("game");
await page.screenshot({ path: E + "game-1440.png" });
out.requests = reqs;
fs.writeFileSync(E + "recon.json", JSON.stringify(out, null, 2));
console.log(JSON.stringify({ home: out.home.text, clicked, game: out.game.text, comps: out.game.comps, rootData: out.game.rootData, nEls: out.game.els.length, reqs: reqs.filter(r=>!/fonts|\.png|\.svg|\.woff/.test(r)) }, null, 1));
await browser.close();
