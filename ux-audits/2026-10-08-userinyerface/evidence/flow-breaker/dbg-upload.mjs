import { launch, open, sleep, goStep, hit, hitText, E } from "./lib.mjs";
const b = await launch(); const { page, con } = await open(b, 1440);
await goStep(page, 1);
const form = `[...document.querySelectorAll("*")].map(e => e.__vue__).find(v => v && v.$options._componentTag === "ui-avatar-and-interests")`;
// let the app open its dialog (registers its change listener), then cancel it and set the file on the same input
const [fc] = await Promise.all([page.waitForFileChooser({ timeout: 5000 }), hit(page, ".avatar-and-interests__upload-button", 1440)]);
const inputHandle = await page.evaluateHandle(`${form}.fileDialog.fileInput`);
await page.evaluate((i) => { i.style.display = "none"; document.body.appendChild(i); }, inputHandle);
await fc.accept(["./test-avatar.png"]).catch((e) => console.log("accept err", e.message));
await sleep(1000);
console.log("after accept:", await page.evaluate((i) => ({ files: i.files.length, isConnected: i.isConnected }), inputHandle), await page.evaluate(`!!${form}.avatarImage`));
await inputHandle.uploadFile("./test-avatar.png");
await sleep(1000);
console.log("after uploadFile:", await page.evaluate((i) => ({ files: i.files.length }), inputHandle), await page.evaluate(`!!${form}.avatarImage`));
await page.evaluate((i) => i.dispatchEvent(new Event("change")), inputHandle); await sleep(1000);
console.log("after manual change:", await page.evaluate(`(${form}.avatarImage || "").slice(0,30)`), !!(await page.$(".avatar-and-interests__avatar-image")));
await b.close();
