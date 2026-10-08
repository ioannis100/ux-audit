import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({ headless: true, executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
for (const ua of [null, "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"]) {
  const page = await (await browser.createBrowserContext()).newPage();
  if (ua) await page.setUserAgent(ua);
  const log = [];
  page.on("response", (r) => log.push(r.status() + " " + r.url().slice(0, 70)));
  page.on("requestfailed", (r) => log.push("FAIL " + r.failure()?.errorText + " " + r.url().slice(0, 70)));
  const t = Date.now();
  try { await page.goto("https://userinyerface.com", { waitUntil: "load", timeout: 15000 }); } catch (e) { log.push("goto: " + e.message.slice(0, 60)); }
  await new Promise((r) => setTimeout(r, 4000));
  const st = await page.evaluate(() => ({ rs: document.readyState, title: document.title, len: document.body?.innerText.length })).catch((e) => "eval: " + e.message.slice(0, 60));
  console.log(JSON.stringify({ ua: ua ? "chrome-ua" : "headless-ua", ms: Date.now() - t, st, log: log.slice(0, 12) }));
}
await browser.close();
