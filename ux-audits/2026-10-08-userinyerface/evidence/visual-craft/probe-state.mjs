import puppeteer from "puppeteer-core";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await puppeteer.launch({ headless: true, executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const page = await (await browser.createBrowserContext()).newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("https://userinyerface.com/game.html", { waitUntil: "load", timeout: 25000 }).catch(() => {});
await sleep(2500);
console.log(await page.evaluate(() => {
  const g = [...document.querySelectorAll("*")].map((e) => e.__vue__).find((v) => v && (v.$options.name || v.$options._componentTag) === "ui-game");
  return JSON.stringify({ data: Object.keys(g.$data), vals: Object.fromEntries(Object.entries(g.$data).map(([k, v]) => [k, typeof v === "object" ? JSON.stringify(v)?.slice(0, 120) : v])), computed: Object.keys(g.$options.computed || {}), methods: Object.keys(g.$options.methods || {}) }, null, 1);
}));
console.log(await page.evaluate(() => document.querySelector('meta[name=viewport]')?.content));
await browser.close();
