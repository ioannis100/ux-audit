// J1: home -> game. Measures the decoy "NO" button vs the "HERE" link, timing, overflow.
import { launch, open, sleep, shot, save, text, probe } from "./lib.mjs";
const browser = await launch();
const out = {};
for (const w of [390, 1440]) {
  const { page, net, con, loadMs } = await open(browser, w, "https://userinyerface.com/");
  const r = { loadMs };
  await shot(page, `j1-home-${w}`);
  r.layout = await page.evaluate(() => {
    const box = (e) => { if (!e) return null; const b = e.getBoundingClientRect(), s = getComputedStyle(e); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height), font: s.fontSize, color: s.color, bg: s.backgroundColor, cursor: s.cursor, deco: s.textDecorationLine }; };
    return { no: box(document.querySelector(".start__button")), here: box(document.querySelector(".start__link")), underlinedClick: box(document.querySelector(".start__paragraph ~ p u, p u")),
      docW: document.documentElement.scrollWidth, docH: document.documentElement.scrollHeight, innerW: innerWidth, innerH: innerHeight };
  });
  // Click the big "NO" button: what happens?
  r.noClick = await probe(page, `j1-home-no-click-${w}`, () => page.click(".start__button"));
  r.urlAfterNo = page.url();
  // Click the underlined word "click" (it looks like a link)
  await page.evaluate(() => [...document.querySelectorAll("u")].find((u) => u.innerText.trim() === "click")?.click());
  await sleep(500);
  r.urlAfterUnderlinedClick = page.url();
  // Click HERE
  const t = Date.now();
  await Promise.all([page.waitForNavigation({ waitUntil: "load", timeout: 25000 }).catch(() => {}), page.click(".start__link")]);
  r.hereToGameLoadMs = Date.now() - t;
  r.urlAfterHere = page.url();
  await sleep(2500);
  await shot(page, `j1-game-landing-${w}`);
  r.gameText = (await text(page)).slice(0, 500);
  r.console = con; r.requests = net.length;
  out[w] = r;
}
save("j1-home", out);
console.log(JSON.stringify(out, null, 1));
await browser.close();
