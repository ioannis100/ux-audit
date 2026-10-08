# Audit brief — userinyerface.com

Date: 2026-10-08 · Mode: Team · First audit. Audit folder (`<audit>`):
`./ux-audits/2026-10-08-userinyerface`

## Product

"User Inyerface" (Bagaar / Verhaert Digital): a web "game" in which the visitor completes
a 4-step sign-up/onboarding form against a running timer. **Audit it as if it were a real
sign-up flow**: same severities, same evidence standard, as for any product. Do not
soften or excuse anything because the site may be intentional; the owner wants to see
what the skill catches. Never cite "it's satire" as mitigation.

- Platform: web, responsive meta viewport. Vue 2 single-page app (`/app.js`, 462 KB;
  `/app.css`, 36 KB). Fonts: Google Fonts Poppins 900 + Nunito. GA + GTM analytics.
- URLs: home https://userinyerface.com → "HERE" link → https://userinyerface.com/game.html
- Personality (inferred, assumption): playful · challenging · tongue-in-cheek.
- Goal (as a real product would have): **completion of the sign-up flow**, fast and
  accurate (the home page says "fill in the form as fast and accurate as possible").
- Persona for judgement: someone asked to create an account on a new service.
- Real-user evidence: none. Competitor benchmark: none (compare against established
  form/sign-up practice in the references — Baymard, NN/g, GOV.UK patterns).

## Safety (owner-approved rules for this audit)

- You MAY type **obviously fake** values into non-password fields: e.g. email
  `test` @ `example` + `.com`, names "Test", "User", city "Testville", zip "1000",
  street "Test street 1", birthdate 01/01/1990. Nothing else, no real data.
- You MAY upload `<audit>/evidence/test-avatar.png` (a plain grey 200×200 square) to the
  avatar field, and tick/untick checkboxes, dropdowns, the cookie banner, the help widget.
- **NEVER type anything into the "Choose Password" field** (not even a fake value; this
  is a hard rule). Evaluate the password rules from their visible text, from what
  happens when you submit with the field empty, and from `app.js` source.
- **Steps 2–4 are reached by setting the game's own state**, since step 1 can't pass
  without a password. In the browser JS tool or `page.evaluate`:
  ```js
  const g = [...document.querySelectorAll("*")].map(e => e.__vue__)
    .find(v => v && (v.$options.name || v.$options._componentTag) === "ui-game");
  g.currentPageIndex = 1;  // the CARD: 1 → "2 / 4", 2 → "3 / 4", 3 → "4 / 4" (captcha)
  g.activePageIndex = 1;   // only the pips; they also cycle on their own every second
  ```
  **Corrected 2026-10-08:** an earlier version set only `activePageIndex`, which moves
  the pips but leaves the card on "1 / 4". Confirm the card's "n / 4" text after jumping.
  Within steps 2–4 use the real UI (type, click, Next) to test behaviour. Report this
  state jump in your coverage line: the transition step 1 → 2 itself was not observed.
- Network: `app.js` contains no fetch/XHR/beacon; only GA pageviews leave the browser.
  Check the network log anyway when you submit something.

## Screen inventory (from the live DOM, 2026-10-08)

| # | Screen / state | What the DOM contains |
|---|----------------|------------------------|
| 0 | Home `/` | Intro text, a large "NO" element, "Please click HERE to GO to the next page" (only `a.start__link` "HERE" proceeds) |
| G | Game chrome (all steps) | **Cookie banner on load** (red, full width: "This site uses cookies, is that a problem for you?" · "Not really, no" · "Yes"); logo; **running timer** `00:00:00`; 4 round step buttons `1 2 3 4`; card with "n / 4"; **help widget** bottom-right ("How can we help?", textarea, "Help" link, "Send to bottom" button, a collapse arrow) |
| 1 | Step 1 account | Inputs (all `type="text"`): "Choose Password" (372×40), "Your email" (124 wide), "@", "Domain", dropdown "other" (email extension); checkbox **"I do not accept the Terms & Conditions"** (rendered pre-ticked at load: verify); buttons "Next" (text-styled), **"Cancel"** (filled primary), "Reset"; 5 password rules listed under the card |
| 2 | Step 2 profile | "This is me", "To complete your profile, please upload any image." `a` "upload", button "Download image"; "Choose 3 interests": 21 checkboxes (Ponies, Polo, Dough, …) incl. "Select all" and "Unselect all" mixed into the list; Next / Cancel |
| 3 | Step 3 personal details | First name, Zip, Title (dropdown), City, Surname, Country (dropdown), Street, Box, Number, Birthdate Day/Month/Year, Age (shows 0), Gender Male/Female; inputs show "Placeholder..."; Next / Cancel |
| 4 | Step 4 captcha | "Almost done! Now we just need proof that you are human." + a randomised instruction ("Select all light pictures" / "Select all pictures with glasses"), checkbox image grid, "Validate" |
| M | Modals / timed states | `ui-game` has `timerModalIsActive`, `confirmModalIsActive`, `termsAndConditionsVisible`, `cookiesIsActive`/`cookiesWasActive`. The timer modal had not fired after 37 s: **wait up to 120 s** on a step to observe it. Also: the Terms & Conditions link, Cancel's confirm modal, the end screen after Validate (if reachable) |

Screenshots: `evidence/orchestrator/step{1,2,3,4}-{1440,390}.png`, `after30s-*.png`,
`home-1440.png`, `game-1440.png`. Raw inventory: `evidence/orchestrator/recon2.json`.
Observed at 390: the cookie banner takes ~320 px of an 844 px screen, the help widget
overlaps the step buttons.

## Core journeys

1. **J1 Start**: home → find the way into the game.
2. **J2 Step 1 account**: email (local part + domain + extension), T&C, Next/Cancel/Reset,
   error messages when submitting incomplete (password left empty by rule).
3. **J3 Step 2 profile**: upload avatar, choose exactly 3 interests, Next.
4. **J4 Step 3 personal details**: every field, the dropdowns, birthdate + age, Next.
5. **J5 Step 4 captcha**: understand the instruction, select, Validate, end state.
6. **J6 Interruptions**: cookie banner, help widget, timer modal, page pips 1–4,
   Cancel/confirm, browser back/refresh mid-flow (does progress survive?).

Viewports: **390×844** (phone, touch) and **1440×900** (desktop). Also 320 for reflow.

## Tooling and environment caveats (read before touching the page)

- Built-in browser (`mcp__Claude_Browser__*`): your own tab via `tabs_create`, `tabId`
  on every call. **The Browser pane is currently hidden**, so built-in screenshots fail.
  Use the built-in tab for DOM/text/accessibility-tree reads (`read_page`, `get_page_text`,
  `javascript_tool`) and **visible Chrome via puppeteer-core** for screenshots, typing,
  timing, scrolling and modals.
- puppeteer-core is installed at `<audit>/node_modules`. Put scripts in
  `<audit>/evidence/<role>/*.mjs`. Working example:
  `<audit>/evidence/orchestrator/recon2.mjs` (launch, viewport, reach steps, snapshot).
- **Loading:** `waitUntil: "networkidle0"` never settles on this site, and the first cold
  `load` can take ~19 s (Google Fonts + GA). Use
  `await page.goto(url, { waitUntil: "load", timeout: 25000 }).catch(() => {})` then wait
  2.5 s. Use a fresh `browser.createBrowserContext()` per scenario so the cookie banner
  and timer start fresh.
- Uploading: `const [fc] = await Promise.all([page.waitForFileChooser(), page.click("a.upload-button, a[class*=upload]")]); await fc.accept([path])`.
  Inspect the selector first.
- Measurement: `<skill>/scripts/extract-design.js` via `page.evaluate(src)` or the JS tool.
  Exclude decorative art (the logo's layered "UI" mark) from type/token counts.
- Lighthouse for vitals (Chrome installed):
  `npx -y lighthouse https://userinyerface.com/game.html --output=json --output-path=<audit>/evidence/access-perf/lh-mobile.json --quiet --chrome-flags=--headless`
  and `--preset=desktop`.
- Reduced motion cannot be emulated in the built-in browser; in puppeteer use
  `page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }])`.

## Output

`<audit>/findings/<role>.md` in the contract's format; evidence in
`<audit>/evidence/<role>/`. Reply with counts, top 3, blockers only.
