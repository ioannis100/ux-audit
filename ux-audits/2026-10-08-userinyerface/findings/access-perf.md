# access-perf — findings
Coverage: 6/6 screens (Home, steps 1–4, end screen) plus 6 states: cookie banner, timer modal (fired naturally at 00:01:00 and forced), T&C modal, step-2 error list, step-3 error modal, help widget collapse. Steps 2–4 and the end screen were reached by setting `ui-game` state. Every jump set **both** `currentPageIndex` and `activePageIndex`, so the corrected brief snippet was already applied. The card text confirms the real step in each snapshot: `ax-step2/3/4.txt` read "2 / 4", "3 / 4", "4 / 4". `gameFinished` was set for the end screen, so the real step 1→2 and captcha→end transitions were not observed. Not reached: Cancel-confirm modal semantics (read from `game.html` only), avatar upload (not needed for this role). Nothing was typed into "Choose Password".
Viewports/devices: puppeteer-core headless Chrome at 1440×900, 390×844 @2x touch, 320×640 @2x, 720×450 @2x (stand-in for 200% zoom on 1440×900), and 390 at 400 kbps / 400 ms RTT. Lighthouse 13 mobile (simulated slow 4G, 4× CPU) and desktop. The accessibility tree came from `page.accessibility.snapshot()`. I did not use the built-in browser tab, because the pane is hidden and puppeteer covered the same reads. No real VoiceOver or NVDA pass.
Evidence dir: `evidence/access-perf/` (scripts `kbd.mjs`, `measure.mjs`, `ttf.mjs`, `targets.mjs`, `home.mjs`, `country.mjs` reproduce everything).

**Brutal answers.** *Who can't finish at all?* Keyboard-only users, screen-reader users and switch users. Keyboard users fail at step 1, because no form field, checkbox or the Next link can get focus. Screen-reader users fail at step 1 too: the T&C checkbox doesn't exist in the accessibility tree. The step-4 captcha also exposes 0 of its 16 images and 0 of its 16 checkboxes. Voice-control users fail as well, because the only names are "Placeholder..." and unlabeled flags. *Biggest speed problem a user feels:* the whole page is hidden by `v-cloak` until a **463 KB uncompressed, uncached** `app.js` downloads and runs. The result is a blank screen: mobile Lighthouse LCP 4.5 s, and about 15 s blank at 400 kbps. Then 2 s after content appears, the cookie banner shoves the form 324 px down (CLS 0.394).

---

## F-ACCESS-01 [P0] Keyboard users cannot fill in a single field: inputs, checkboxes, dropdowns and step-1 "Next" are all out of the tab order
- User experiences: Pressing Tab on step 1 cycles through: cookie "Not really, no" → "Yes" → step dots 1–4 → **Cancel** → help-widget arrow → help textarea → "Send to bottom" → back to the top. The password, email, domain, extension, T&C checkbox, **Next** and Reset never get focus, so the only primary action a keyboard user can reach is Cancel.
- Where: All steps. Step 2: only "Download image" and Next are reachable. The upload link and all 21 interests are not. Step 3: only the 4 numeric-stepper arrows and Next/Cancel are reachable. First name, surname, street, zip and city (5 text fields), the Title, Country and Day/Month/Year dropdowns, gender and age are not. Step 4: only the gallery scroll container and Validate are reachable. None of the 16 captcha checkboxes are.
- Evidence: `kbd.json` → `step1.tab` … `step4.tab` (30–40 Tab presses each, logged in the interaction log). Root causes in `app.js`:
  - The `ui-input` template (module 38) hard-codes `tabindex=-1`: `<input @blur=onBlur … tabindex=-1 :type=type v-model=internal>`.
  - `app.css`: `.checkbox input[type=checkbox]{display:none}`. `focus()` on `#accept-terms-conditions` returns `false`.
  - Dropdowns (modules 24/28) are `<div class=dropdown__header @click>` with `tabIndex -1`, no role and no `aria-expanded`. The gender toggle (72) is a pair of `<div @click>`. The age slider (60) listens only to `mousedown`/`touchstart`.
  - Step-1 Next, Reset, T&C, "upload" and help "Help" are `<a @click>` **with no href**, so they aren't focusable.
- Why it matters: Fails WCAG 2.1.1 Keyboard (A). Keyboard users can't create an account at all. That includes motor-impaired, switch, voice-control and power users. It's also an EAA/ADA exposure.
- Fix:
  - Delete `tabindex=-1` from the `ui-input` template and from the password `ui-input` in the login form.
  - Make checkboxes visually hidden instead of removed: `.checkbox input[type=checkbox]{position:absolute;opacity:0;width:1px;height:1px}`.
  - Swap every `<a @click>` for `<button type="button">` (Next → `type="submit"`).
  - Replace the custom dropdowns with native `<select>`, gender with a radio group, and the age slider with `<input type="number">`. Better still, derive age from the birthdate.
- Effort: M
- Confidence: high (source + measured Tab sequence on all 4 steps)

## F-ACCESS-02 [P0] Screen-reader users can't see the checkboxes, the captcha or the countries, and hear "Placeholder..." for every field
- User experiences:
  - Step 1: VoiceOver reads "Choose Password, edit text, *Choose Password*". The field sounds pre-filled, because `ui-input` puts the placeholder into the **value** (`internal: this.value || this.placeholder`). The T&C checkbox isn't announced at all. The listener hears only "I do not accept the Terms & Conditions" as plain text, so they can't know it's ticked or tick it.
  - Step 2: they hear 21 interest words with no checkboxes.
  - Step 3: five identical "Placeholder..., edit text" fields. The visible labels (First name, Zip, City…) are loose text that isn't associated.
  - Step 4: "Almost done!… Select all pictures with glasses", then straight to "Validate", because **the 16 images and 16 checkboxes are absent from the tree**.
- Where: All steps, plus the step-3 Country dropdown.
- Evidence:
  - `ax-step1.txt` to `ax-step4.txt`.
  - `kbd.json → captcha`: `{"images":16,"imgsAreCssBackgrounds":true,"anyAlt":false,"checkboxes":16,"checkboxDisplay":"none","audioOrAlt":false}`.
  - Every `<input>` has `labels: 0`, no `aria-*` anywhere in `app.js` (0 occurrences), and no `role` attributes.
  - Country list (`country.mjs`, `country-dropdown-open-390.png`): **236 options, 0 with text, 0 with aria-label/title**, each a 32×32 flag. On touch every flag stays `filter: grayscale(1)`, because colour only comes back on `:hover`.
  - Lighthouse's `label` audit misses the inputs because it accepts placeholders. That makes it an unreliable signal here.
- Why it matters: Fails 1.1.1 Non-text Content (A), with no captcha alternative. Also fails 1.3.1 Info and Relationships (A), 4.1.2 Name, Role, Value (A), 3.3.2 Labels or Instructions (A) and 2.5.3 Label in Name (A). A blind user can't get past step 1. Even with the code-level fixes, the image captcha needs a non-visual path.
- Fix:
  - Add `<label for>` to every input, using the visible text. Stop writing the placeholder into `value`.
  - Expose the real checkboxes (see F-01) inside a `<label>` that wraps the text. Fix the T&C wording to "I accept…" and leave it unticked.
  - Captcha: drop the image grid in favour of an invisible/behavioural check (honeypot, Cloudflare Turnstile). If it stays, give each image a meaningful `alt` and offer an audio or text alternative.
  - Country: a native `<select>` with country names, flags decorative (`aria-hidden`), no grayscale.
- Effort: M
- Confidence: high (accessibility tree + DOM). Medium on the exact VoiceOver phrasing, which a real VoiceOver pass would confirm.

## F-ACCESS-03 [P1] Nothing shows where keyboard focus is
- User experiences: Tabbing moves focus, but no button, input, textarea, step dot or modal control changes at all. Sighted keyboard users are navigating blind.
- Where: Whole game. The only rings anywhere are the browser defaults on the home-page "HERE" link and the step-4 scroll container.
- Evidence:
  - `app.css` sets `outline:0` on `.button`, `.input`, `.help-form__text-area`, `.pagination__button`, `.numeric-stepper__*` and `.start__button`, and contains **zero** `:focus`/`:focus-visible` rules.
  - Every tab stop in `kbd.json` reports `outline: none 0px`, `box-shadow: none`.
  - `focus-step1-cancel-{blurred,focused}.png` and `focus-step2-next-{blurred,focused}.png` are **pixel-identical** (PIL diff bbox `None`) even though `:focus-visible` matched.
- Why it matters: Fails 2.4.7 Focus Visible (AA). Even where keyboard access exists (Cancel, Next on steps 2–3, cookie buttons), users can't tell what Enter will trigger, and on step 1 the focused primary-looking button is **Cancel**.
- Fix: `:focus-visible{outline:3px solid #fff;outline-offset:2px;box-shadow:0 0 0 5px #0c58da}`. Use dark-on-light inside white cards, e.g. `.login-form :focus-visible{outline-color:#132a42}`. Remove the `outline:0` declarations.
- Effort: S
- Confidence: high

## F-ACCESS-04 [P1] The "Hurry up" timer modal returns every 60 s and can't be closed from the keyboard; its keyboard-reachable "Lock" removes the only close control
- User experiences: At 00:01:00 a full-screen 60% black overlay appears. Focus stays behind it, on whatever was focused before (the cookie "Yes" in my run). Escape does nothing. Tab walks the hidden page behind the overlay (pagination, Validate, help widget…). The only way out is a grey "©lose 2026" `<span>` (mouse-only, contrast 1.94:1). The single button a keyboard user *can* reach is "Lock". Pressing it removes ©lose entirely, leaving just "Unlock". The game timer keeps running throughout (00:00:04 → 00:00:07 while locked).
- Where: Game, every minute (`if (seconds % 60 === 0 && !window.DISABLE_TIMER_MODAL) timerModalIsActive = true`). The source comment says "every 30 seconds".
- Evidence: `kbd.json → timerModal`:
  - `{"role":null,"ariaModal":null,"focusInside":false}`, and `after Escape modal open: true`.
  - "TAB with timer modal open: BUTTON:1 → … → Validate → Lock → help-form… → Not really, no".
  - `ttf.json → timerModalLock`: before `{close:true, closeTag:"SPAN", closeTab:-1}`, after Enter on Lock `{close:false, buttons:["Unlock"]}`.
  - Screenshots `kbd-timer-modal-after-tabs-1440.png`, `timer-modal-locked-1440.png`. Contrast `extract-timer-modal-1440.json`: modal timer 1.94:1 at 32 px (needs 3:1), ©lose 1.94:1 at 14 px, Lock white on green 2.26:1.
- Why it matters: Fails 2.1.1 (A), because the close control can't be operated by keyboard. Also fails 2.4.3 Focus Order (A), 4.1.2 (A), 2.4.11 Focus Not Obscured (AA, focus sits under the overlay) and 1.4.3 (AA). A keyboard or screen-reader user gets an unexplained, undismissable overlay every minute. Screen readers never announce it. Same pattern on the step-3 error modal (`ttf.json → step3ErrorModal`: no role, focus left on Next, Esc doesn't close) and the T&C modal (`measure.json → tcModal`: no role, focus on BODY, Esc doesn't close, text can't be scrolled by keyboard, 0 px moved after 20× PageDown, so Accept stays disabled).
- Fix: Drop the recurring modal. A real sign-up has no reason to interrupt. If any modal stays, use `<dialog>` with `showModal()`. That gives focus moved inside, a native Escape-to-close, an inert background and focus returned on close. Use a real `<button>Close</button>` and no "Lock" that removes it. Give the T&C content `tabindex="0"` and native `overflow:auto` scrolling, and stop gating Accept on scroll position.
- Effort: S (dialog) / M (T&C scroller)
- Confidence: high

## F-ACCESS-05 [P1] Errors are never announced or tied to their fields
- User experiences: Pressing Next on step 1 with empty fields adds "Please do NOT forget to accept our terms and conditions" in 12 px red (4.0:1). The fields are unchanged and still blue-bordered, with no message saying which field is wrong. Focus stays on Next. A screen reader says nothing. Step 2 adds "Please upload a picture / Please choose 3 interests" silently. Step 3 opens a modal that shows **one** error at a time ("Invalid first name"), with focus left behind it.
- Where: Steps 1–3 validation.
- Evidence:
  - `kbd.json → step1.afterNext`: `liveRegions: 0`, every input `ariaInvalid:null, describedby:null`. `targets.json → step1ErrorClasses`: all borders stay `rgb(12, 88, 218)`.
  - `ttf.json → step2Errors {live:false, role:null, active:"BUTTON:Next"}` and `step3ErrorModal`.
  - Screenshots `step1-errors-390.png`, `ttf-step2-after-next-1440.png`, `step3-error-modal-1440.png`.
- Why it matters: Fails 3.3.1 Error Identification (A), 4.1.3 Status Messages (AA) and 1.3.1 (A). Blind users don't learn that submission failed. Sighted users have to hunt. Baymard: inline, field-level errors are the baseline.
- Fix:
  - Put each error under its field with an `id`, then set `aria-describedby` and `aria-invalid="true"` on the field.
  - Add a summary `<div role="alert">` listing every error, with each item linking to its field. Move focus to the first invalid field.
  - Show all step-3 errors at once, inline, not in a modal.
- Effort: M
- Confidence: high

## F-ACCESS-06 [P1] Key text and buttons fail contrast, including the only way forward on step 1
- User experiences: Step 1's "Next" and "Reset" are pale grey on white (1.94:1). The five password rules are green on blue (2.71:1 at 13 px). The filled green "Cancel" on steps 2–3 is white on green (2.26:1). "upload" is 3.48:1. Cookie "Not really, no" is white on red (4.0:1). The T&C error is red on white at 12 px (4.0:1). The modal timer and ©lose are 1.94:1.
- Where: Steps 1–3, cookie banner, timer modal.
- Evidence: `extract-step{1..4}-{390,1440}.json → color.contrastExamples` (8 failures on step 1, 3 on step 2, 2 on step 3, 1 on step 4) and `extract-timer-modal-1440.json`. Lighthouse `color-contrast` fails on the same nodes (`lh-mobile.json`).
- Why it matters: Fails 1.4.3 Contrast (AA). Low-vision users and anyone on a phone in daylight can't find Next, the one control that advances step 1. They also can't read the password rules they're required to satisfy.
- Fix: Next as a solid primary `#0c58da` button with white text (6.0:1). Rules white on `#0c58da` (6.0:1). Green buttons `#1e7e45` with white text (≥4.6:1). Error text `#c00000` (5.9:1) at ≥14 px. Grey `#b5bbc0` → `#6b7378` (4.6:1).
- Effort: S
- Confidence: high

## F-ACCESS-07 [P1] The password field shows the password in clear text and password managers can't recognise it
- User experiences: The "Choose Password" input is `type="text"` with no `autocomplete` and no `name`, and its value is pre-filled with the words "Choose Password". The password appears on screen as typed. Password managers won't offer to generate or save one. The rules require a "cyrillic character" and "1 letter of your email", which is a memory/transcription burden with no manager to carry it.
- Where: Step 1, first field.
- Evidence: `kbd.json → step1.afterNext.inputs[0]`: `{"ph":"Choose Password","type":"text","autocomplete":null,"labels":0}`. Source module 42: `<ui-input ref=input-password … type=text tabindex=-1 placeholder="Choose Password">`. `ax-step1.txt`: `textbox "Choose Password" value=Choose Password`. Paste isn't blocked (0 `paste` handlers in `app.js`). Nothing was typed into the field (per brief), so this comes from DOM and source only.
- Why it matters: Fails 3.3.8 Accessible Authentication (AA), because password-manager support is the sanctioned mechanism and it's defeated here. Shoulder-surfing exposure on a sign-up form is a trust breaker.
- Fix: `<input type="password" name="new-password" autocomplete="new-password" id="pw">` with a `<label for="pw">`, an empty value, and a show/hide toggle button. Email: `type="email" autocomplete="email"` as one field. Splitting it into local part / domain / extension also blocks autofill.
- Effort: S
- Confidence: high

## F-ACCESS-08 [P1] Content doesn't fit a phone: horizontal scroll at 390 and 320, so text and targets shrink
- User experiences: On a 390-wide phone the layout is 453 px wide. The cookie "Yes" button and the step-1 card's right edge (dropdown, "Reset") are cut off at the screen edge. Chrome Android will instead zoom the page out to about 86%, shrinking 16 px text to about 13.8 px. At 320 px the page is 452 px wide and needs horizontal scrolling on every step.
- Where: All steps. The offenders are the cookie banner's button row (`div.align` 40..428) and the step dots (`ul.pagination` 0..336, i.e. 4×48 px plus 3×48 px gaps).
- Evidence: `measure.json → reflow.320` (scrollWidth 452/438/428/428 vs clientWidth 320) and `reflow-320-step{1..4}.png`. `targets.json`: innerWidth 453 at a 390 device, scale 0.861, effective body text 13.8 px. See `targets-step1-390.png`.
- The 720×450 (200% zoom) proxy passed, with no overflow on any step.
- Text-spacing override (1.4.12) clips "Your email", "Not really, no" and "Send to bottom" (`measure.json → textSpacing`, `text-spacing-390-step1.png`). That's minor.
- Why it matters: Fails 1.4.10 Reflow (AA). It also undermines every touch target on mobile (F-09).
- Fix: Wrap the cookie row and drop the 140 px min-width at small widths: `@media (max-width:480px){.cookies .align{flex-wrap:wrap}.button{min-width:0}}`. Step dots: `.pagination__item:not(:last-child){padding-right:clamp(12px,4vw,48px)}`. Cookie banner: `padding:16px; font-size:16px` on mobile instead of 40 px / 24 px, which currently takes 320 of 844 px.
- Effort: S
- Confidence: medium. Headless Chrome reported `visualViewport.scale 1` but innerWidth 453, so whether a real phone shows a cut-off edge or an 86% zoom-out needs a device check. Both outcomes fail.

## F-ACCESS-09 [P1] Checkboxes and steppers are far below minimum target size, and the label text isn't clickable
- User experiences: The tappable part of each interest checkbox is the 15×16 px box only. "Ponies" sits outside the `<label>`, so tapping the word does nothing. Captcha boxes are 18×18. The T&C box is 18×16, and its text is a link that opens the T&C modal instead of ticking. The step-3 Box/Number up/down arrows are 20×19. The help widget's collapse arrow is 24×24. After the 390 zoom-out (F-08) these become about 13–18 px. Age can only be set by dragging the slider.
- Where: Steps 1–4, help widget.
- Evidence: `targets.json`. Interests `checkboxLabel 15×16 (eff 13.4×14.2), labelTextInside:false`. Captcha `18×18 (eff 16.4)`. Steppers `20×19 (eff 18.2×17.3)`. helpClose `24×24 (eff 20.7)`. Country flags 32×32 (`country.mjs`). The extractor counts 4 targets under 24 px on step 3 and 6–10 under 44 px per step (`extract-step*-390.json → interaction`). Slider template (module 60): `@mousedown/@touchstart` only.
- Why it matters: Fails 2.5.8 Target Size Minimum (AA, <24 px) and 2.5.7 Dragging Movements (AA, slider). Below the 44 pt iOS / 48 dp Android floor, people with tremor and anyone tapping one-handed miss.
- Fix: Put the text inside the label (`<label><input type=checkbox> Ponies</label>`) and make the whole row the target, at least 44 px high. Steppers: native `<input type="number">` or 44×44 buttons. Help close: 44×44 with `aria-label="Minimise help"`. Age: number input or computed from birthdate.
- Effort: S
- Confidence: high

## F-ACCESS-10 [P1] Blank screen until a 463 KB uncompressed, uncached script runs: mobile LCP 4.5 s, 15 s blank on a slow connection
- User experiences: On mobile the screen stays empty (only the blue background) until `app.js` arrives and Vue mounts. `#app` carries `v-cloak`, so even the static logo, timer and form are hidden. On a 400 kbps / 400 ms connection the page was blank at 3, 8 and 12 s and only rendered by 16 s, with `app.js` finished at 14.7 s. Every repeat visit downloads it again.
- Where: `game.html` load (same bundle on home).
- Evidence:
  - `lh-mobile.json`: Performance 63, FCP 2.0 s, **LCP 4.5 s (poor)**, TTI 6.2 s, Speed Index 3.7 s, TBT 80 ms, 693 KiB total. LCP element `div.logo__icon` (request not discoverable, element render delay 714 ms).
  - `lh-desktop.json`: Performance 92, LCP 1.1 s.
  - `curl -I app.js`: `content-length: 462611`, **no `content-encoding`, no `cache-control`** (server: AmazonS3). Lighthouse `document-latency-insight`: "No compression applied". `cache-insight`: app.js/app.css/SVGs cache lifetime 0, 518 KiB wasted on repeat visits.
  - `gzip -9 app.js` = 113,983 B, a **75% saving**. `unused-javascript`: 49% of app.js (226 KB) unused. `unminified-javascript`: 117 KB.
  - Render-blocking Poppins CSS costs 816 ms. Two analytics stacks load: UA `analytics.js` (21 KB) **and** GTM `gtag/js` (163 KB, 472 KB parsed).
  - Slow-network run `ttf.json → slow` and `slowRequestsFinishedAtMs`. Screenshots `slow-390-{3000..30000}ms.png`.
- Why it matters: LCP > 4 s is "poor". A third of users abandon at 5–8 s with no feedback, and this page gives none. It's a static form that should paint in under 1 s.
- Fix:
  1. Turn on gzip/brotli: S3 + CloudFront "Compress objects automatically", or upload pre-compressed with `Content-Encoding`.
  2. Fingerprint assets and send `Cache-Control: public, max-age=31536000, immutable` for `app.[hash].js/css`.
  3. Remove `v-cloak` from the shell, or server-render the static chrome, so the logo/heading paint before JS.
  4. Use the runtime-only Vue build with precompiled templates (drops the ~30% template compiler) and minify app code.
  5. Pick one analytics tag, deferred.
  6. `<link rel=preload as=font>` Poppins with `&display=swap`, or self-host.
- Effort: S (1, 2, 5) / M (3, 4)
- Confidence: high (lab). No CrUX/field data checked.

## F-ACCESS-11 [P1] The cookie banner drops in 2 s after load and shoves the form 324 px down; "Yes" does nothing
- User experiences: At 00:00:02 a red banner is inserted *above* the content in normal flow, so everything jumps down 324 px on a phone (156 px on desktop). A user who has just reached for the first field taps whatever slid under their finger. "Yes" (the visually dominant white button) has no click handler. Only the low-contrast "Not really, no" dismisses it. The banner isn't a region or dialog and is never announced.
- Where: Game load, all viewports.
- Evidence: `lh-mobile.json → cls-culprits-insight`: `div.view__content` shifted to top 324, **CLS 0.394 (poor)**; desktop 0.116. Source: `if (seconds === 2 && !cookiesWasActive) cookiesIsActive = true`. The template (module 21) has `<ui-button class=cookies__button color=white>Yes</ui-button>` with no `@click`. `ttf.json`: clicking Yes produced no banner change. "Not really, no" removed it in 20 ms. `kbd.json → step1.cookieBanner {role:null, ariaLive:null, position:"static"}`.
- Why it matters: CLS > 0.25 is a poor Core Web Vital, and here the shift lands exactly when the user starts. A dead primary button breaks trust. An unannounced consent prompt fails 4.1.3 (AA).
- Fix: Render the banner on first paint as `position:fixed; bottom:0` (no shift). Wire both buttons. Use `role="region" aria-label="Cookie consent"`, or a non-modal dialog that receives focus once. Use the plain choices "Accept" / "Reject", given equal weight.
- Effort: S
- Confidence: high

## F-ACCESS-12 [P1] Moving and auto-updating content can't be paused, and reduced-motion is ignored
- User experiences:
  - The game timer ticks every second for the whole session, with no pause (Lock doesn't stop it).
  - The step dots change highlight every second, on a loop (`pips.mjs`).
  - "Send to bottom" collapses the help panel over **14 s**, and it re-opens on its own 50 s later.
  - Step 2 runs a 12-element infinite spinner animation in a 0-height box.
  - The end screen loops a 64-frame, 3.2 s, 654 KB GIF forever.
  - With `prefers-reduced-motion: reduce` on, none of this changes.
- Where: Game chrome, help widget, step 2, end screen.
- Evidence:
  - `app.css` has 0 `prefers-reduced-motion` rules.
  - `measure.json → reducedMotion`: `rm:true`, step 2 shows 16 running animations including 12 × `spinner`. Help `transition: height 14s ease-out`, height 220 → 109 px after 5 s.
  - Source `INTERVAL = 50000` (help re-open) and `Timer::start setInterval 1000`.
  - GIF: PIL `frames 64, total 3200 ms, loop 0`. `end-screen-1440.png`.
- There's **no actual time limit**: the timer counts up and nothing in `app.js` fails the user at a deadline, so 2.2.1 Timing Adjustable doesn't apply. The pressure is the per-minute modal (F-04).
- Why it matters: Fails 2.2.2 Pause, Stop, Hide (A), since auto-updating and moving content runs > 5 s next to the form. Moving and updating content distracts users with attention or vestibular disorders. A screen reader would also pick up the changing timer text if it were ever made live.
- Fix: Remove the ticking timer from a sign-up form, or hide it behind a "Show timer" toggle. Help-widget collapse ≤ 200 ms with no auto re-open. Hide the spinner when it isn't loading. Show the end-screen GIF as a static frame with a play button. Add `@media (prefers-reduced-motion: reduce){*,*::before,*::after{animation:none!important;transition:none!important}}`.
- Effort: S
- Confidence: high

## F-ACCESS-13 [P2] The help widget covers the step-3 "Next" button and has unnamed, unfocusable controls
- User experiences: On a 1440×900 laptop the fixed 303×228 help panel sits on top of step 3's Next. Clicking its centre or right side hits the panel, not Next. On a 390 phone it covers Next and most of Cancel at the bottom of step 3. Its collapse arrow is announced as "button" with no name. The textarea has no label. "Help" is an `<a>` without href, so keyboard users can't trigger it.
- Where: Help widget on all steps. The collision is measured on step 3.
- Evidence: `ttf.json → step3NextCovered`: rect 1020,792,140×40; hit test at left/centre/right → `["Next","help-form__container","help-form__text-area"]`. `step3-next-under-help-1440.png`, `country-dropdown-open-390.png` (bottom). Lighthouse `button-name` and `label` fail on these nodes.
- Why it matters: 2.4.11 Focus Not Obscured (AA) and 4.1.2 (A). Mouse users click the wrong thing on the step's primary action.
- Fix: Start the widget collapsed as a 56 px launcher. Add `padding-bottom` to the page equal to the launcher height. Use `aria-label="Minimise help"` on the arrow and `<label for>` on the textarea. Make "Help" a `<button>`.
- Effort: S
- Confidence: high

## F-ACCESS-14 [P2] No page structure: no h1, no main landmark, step dots are four dead tab stops with no "current" state
- User experiences: A screen-reader user jumping by headings finds "How can we help?" (the help widget) on every step and, on step 1, nothing else: no h1, no `main`. The step dots 1–4 are real buttons that take 4 Tab presses per cycle but do nothing when pressed. None is marked current. The highlighted dot isn't progress at all: it **cycles on its own every second** (2→3→4→1→2→3 while the card stays on "1 / 4"), so it never tells anyone which step they're on.
- Where: Game chrome.
- Evidence: `kbd.json → outline` (`h1` absent, `main:false`, one `<form>` only on step 1). `extract-*.json → semantics.h1Count: 0`. Lighthouse `landmark-one-main` fails. Pagination template (module 54) has no `@click` and no `aria-current`. `pips.mjs`: active dot over 6 s = `2,3,4,1,2,3` with the card text fixed at `1 / 4`. `ttf.json → "pagination button 2"`: no response. `kbd-step1-after-tabs-1440.png`, `ttf-step3-errors-1440.png`.
- Why it matters: Fails 1.3.1 (A) and 2.4.6 Headings and Labels (AA). Users can't orient, and can't tell how far through the flow they are.
- Fix: Wrap the card in `<main>` with `<h1>Create your account — step 1 of 4</h1>`. Make the dots a non-interactive `<ol aria-label="Progress">` with `aria-current="step"` on the real step.
- Effort: S
- Confidence: high

## Strengths
- Mouse/touch feedback is fast. Next, cookie dismissal and checkbox clicks change the DOM in 15–27 ms and paint within 49–61 ms. Checkbox state flips within one frame (≤20 ms), with a 250 ms fade (`ttf.json`).
- Main-thread cost is low. TBT is 80 ms on mobile and 0 ms on desktop, with 0.2 s script bootup. The speed problem is bytes and caching, not CPU.
- The J1 entry works by keyboard. "HERE" is a real `<a href="/game.html">` with the default focus ring, and Enter navigates (`home.json`). `lang="en"` is set and the end-screen image has alt text.

## Interaction log
| # | Action | Result | Time |
|---|--------|--------|------|
| 1 | Lighthouse mobile + desktop on game.html (background) | Perf 63 / 92; LCP 4.5 s / 1.1 s; CLS 0.394 / 0.116 | ~2 min total |
| 2 | Fresh context 1440, load, wait 3 s, Tab ×30 on step 1 | Cycle of 11 stops: cookie×2, dots×4, Cancel, help×3, BODY. 0 form fields, no Next | — |
| 3 | `focus()` on T&C checkbox input | `false` (display:none) | — |
| 4 | Click step-1 Next (password empty, per rule) | T&C error + rules shown; 0 live regions; focus unchanged | 24 ms DOM / 58 ms paint |
| 5 | State jump → steps 2, 3, 4; Tab ×40 each | Step 2: Download image, Next, Cancel. Step 3: 4 stepper arrows, Next, Cancel. Step 4: container, Validate | — |
| 6 | Wait on step 4 until timer 00:01:00 | Timer modal fired at 00:01:00; focus stayed behind; Esc no effect | ~55 s wait |
| 7 | Tab ×12 with timer modal open | Focus walked the page under the overlay; reached "Lock" only | — |
| 8 | Forced timer modal, Enter on Lock | ©lose removed, only "Unlock" left; timer kept running | 400 ms |
| 9 | Focus Cancel / step-2 Next, screenshot vs blurred | Pixel-identical | — |
| 10 | Open T&C (mouse), Tab ×12, PageDown ×20, Esc | Focus on BODY; text moved 0 px; Accept disabled; Esc no effect | — |
| 11 | Click cookie "Yes" | Banner stays | no response |
| 12 | Click step dot 2 | Nothing | no response |
| 13 | Click cookie "Not really, no" | Banner removed | 20 ms / 53 ms |
| 14 | Click interest checkbox (step 2) | State changes in the first frame; 250 ms fade | ≤20 ms |
| 15 | Click step-2 Next (incomplete) | Error list, not announced, focus on Next | 15 ms / 49 ms |
| 16 | Hit-test step-3 Next at 1440 | Centre and right covered by help widget | — |
| 17 | Click step-3 Next (left edge) | Error modal "Invalid first name" (one error); no role; Esc no effect | 1 ms / 5 ms |
| 18 | 390 / 320 / 720@2x reflow on 4 steps | 390 → 453 layout; 320 → 452 scrollWidth; 720 OK | — |
| 19 | Text-spacing override at 390 | 3 controls clip | — |
| 20 | Reduced motion emulated | No change; spinner ×12 running; help collapse 14 s | 5 s observed |
| 21 | Cold load at 390, 400 kbps / 400 ms RTT | Blank at 3/8/12 s; rendered by 16 s; app.js done 14.7 s | ~15 s blank |
| 22 | Step 3 Country dropdown tap at 390 | 236 flag-only options, grayscale, no text | — |
| 23 | Home Tab ×10, Enter on HERE | NO → HERE (focus ring) → BODY; Enter navigates to /game.html | — |
| 25 | Watch the step dots for 6 s on step 1 | Active dot cycles 2→3→4→1→2→3; card stays "1 / 4" | 1 s per change |
| 24 | gameFinished = true | End screen h1, GIF loops forever, focus on BODY, no announcement | — |
