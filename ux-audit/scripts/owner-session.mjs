// Owner sign-in for audits, without anyone but the owner typing a password.
//   node <skill>/scripts/owner-session.mjs open   <audit> <login-url>   # opens a separate Chrome profile; the owner signs in
//   node <skill>/scripts/owner-session.mjs export <audit> <domain>      # writes <audit>/storageState.json (mode 600); prints counts only
//   node <skill>/scripts/owner-session.mjs check  <audit> <url>         # a fresh headless context with the session: lands logged in?
//   node <skill>/scripts/owner-session.mjs clean  <audit>               # closes that Chrome, deletes the profile and the session file
// Run from the audit folder (puppeteer-core installed there). The profile (<audit>/owner-profile/) and
// storageState*.json must be git-ignored (`ux-audits/*/owner-profile/`, `ux-audits/*/storageState*.json`).
// Agents load the session with: page.setCookie(...JSON.parse(fs.readFileSync(state)).cookies) before navigating.
// Never print cookie values; never commit the session; run `clean` at the end of the audit.
import { spawn, execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const CHROME = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9333;
const [cmd, auditArg, arg] = process.argv.slice(2);
if (!cmd || !auditArg) { console.error("usage: see the header of owner-session.mjs"); process.exit(1); }
const audit = path.resolve(auditArg), profile = path.join(audit, "owner-profile"), state = path.join(audit, "storageState.json");
const puppeteer = () => createRequire(path.join(process.cwd(), "/"))("puppeteer-core");

if (cmd === "open") {
  const child = spawn(CHROME, [`--user-data-dir=${profile}`, `--remote-debugging-port=${PORT}`, "--no-first-run", "--no-default-browser-check", arg || "about:blank"], { detached: true, stdio: "ignore" });
  child.unref();
  console.log(`opened a separate Chrome profile (${profile}) on ${arg}; ask the owner to sign in, then run export`);
} else if (cmd === "export") {
  const b = await puppeteer().connect({ browserURL: `http://127.0.0.1:${PORT}`, defaultViewport: null });
  const pages = (await b.pages()).filter((x) => /^https?:/.test(x.url()));
  let p = pages.find((x) => arg && new URL(x.url()).hostname.endsWith(arg)) || pages[0];
  if (!p) { p = await b.newPage(); await p.goto(`https://${arg}`, { waitUntil: "load" }).catch(() => {}); }
  const { cookies } = await (await p.createCDPSession()).send("Network.getAllCookies");
  const mine = cookies.filter((c) => !arg || c.domain.replace(/^\./, "").endsWith(arg));
  const origin = new URL(p.url()).origin;
  const ls = await p.evaluate(() => Object.fromEntries(Object.entries(localStorage))).catch(() => ({}));
  fs.writeFileSync(state, JSON.stringify({ cookies: mine, origins: [{ origin, localStorage: ls }] }), { mode: 0o600 });
  console.log(`saved ${mine.length} cookies and ${Object.keys(ls).length} localStorage keys → ${state} (mode 600)`);
  b.disconnect();
} else if (cmd === "check") {
  const st = JSON.parse(fs.readFileSync(state, "utf8"));
  const b = await puppeteer().launch({ headless: true, executablePath: CHROME });
  const p = await (await b.createBrowserContext()).newPage();
  await p.setCookie(...st.cookies.map(({ name, value, domain, path: pth, expires, httpOnly, secure, sameSite }) => ({ name, value, domain, path: pth, expires, httpOnly, secure, ...(sameSite ? { sameSite } : {}) })));
  await p.goto(arg, { waitUntil: "load", timeout: 30000 }).catch(() => {});
  console.log(`${arg} → ${p.url()} | redirected to a login page: ${/log-?in|sign-?in/i.test(p.url())}`);
  await b.close();
} else if (cmd === "clean") {
  try { execFileSync("pkill", ["-f", `user-data-dir=${profile}`]); } catch {} // no leading dashes: BSD pkill reads them as options
  await new Promise((r) => setTimeout(r, 1500));
  fs.rmSync(state, { force: true });
  fs.rmSync(profile, { recursive: true, force: true });
  console.log(`closed the sign-in Chrome, deleted ${profile} and ${state}`);
} else { console.error(`unknown command ${cmd}`); process.exit(1); }
