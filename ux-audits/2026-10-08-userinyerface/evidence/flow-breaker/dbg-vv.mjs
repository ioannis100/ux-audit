import { launch, open, sleep, shot } from "./lib.mjs";
const b = await launch(); const { page } = await open(b, 390);
const vv = () => page.evaluate(() => ({ innerW: innerWidth, innerH: innerHeight, scale: visualViewport.scale, vvW: visualViewport.width, vvH: visualViewport.height, offL: visualViewport.offsetLeft, offT: visualViewport.offsetTop, docW: document.documentElement.scrollWidth, clientW: document.documentElement.clientWidth, cookie: !!document.querySelector(".cookies"), modal: [...document.querySelectorAll(".modal")].map((m) => m.innerText.slice(0, 40)) }));
console.log("load", await vv());
await sleep(3000); console.log("+3s", await vv());
await b.close();
