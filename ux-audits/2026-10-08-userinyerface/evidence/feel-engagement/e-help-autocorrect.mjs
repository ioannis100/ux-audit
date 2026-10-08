// Help widget: type a plain request and see what the "autocorrect" does to it; does Help send anything?
import { E, sleep, launch, open } from "./lib.mjs";
const b = await launch();
for (let run = 1; run <= 3; run++) {
  const { page, reqs } = await open(b); await sleep(2600);
  const n0 = reqs.length;
  await page.click(".help-form__text-area");
  await page.keyboard.type("I cannot finish this form please help ", { delay: 40 });
  await sleep(300);
  const v = await page.evaluate(() => document.querySelector(".help-form__text-area").value);
  await page.click(".help-form__help-button"); await sleep(800);
  const resp = await page.evaluate(() => ({ resp: document.querySelector(".help-form__response")?.innerText, value: document.querySelector(".help-form__text-area").value }));
  console.log(`run ${run}: typed "I cannot finish this form please help " -> "${v}" | after Help: ${JSON.stringify(resp)} | new requests after Help: ${JSON.stringify(reqs.slice(n0).filter((r) => r.t > 0).map((r) => r.u.slice(0, 60)))}`);
  if (run === 1) await page.screenshot({ path: `${E}e-help-autocorrect-1440.png` });
  await page.close();
}
await b.close();
