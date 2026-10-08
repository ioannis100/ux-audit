# visual-craft — findings
Coverage: 6/6 inventory screens (home, steps 1–4, game chrome) + 9 states: cookie banner (shown + dismissed), help widget (default + toggled), step-1 empty-submit error, T&C modal, Cancel confirm modal, timer modal (observed live at 00:01:00), step-3 error modal, step-4 empty Validate, end screen. **Steps 2–4 and the end screen were reached by setting `ui-game` state; the step-1 → 2 transition and the real path to the end screen were not observed.** Note for the orchestrator: the brief's snippet is wrong. `activePageIndex` only drives the decorative pips; the card is `currentPageIndex` (app.js:1253–1255). Every screenshot of steps 2–4 in this folder uses `currentPageIndex`.
Not reached: open dropdown lists (title, country, day/month/year), avatar after upload, step-2 validation errors, modals at 320.
Viewports/devices: puppeteer headless Chrome (visible-equivalent, `document.hidden=false`). 1440×900 @1x, 390×844 @2x mobile+touch, 320×844 @2x mobile+touch. The built-in Browser pane was not used because the brief says it is hidden.
Evidence: `evidence/visual-craft/`: `capture.mjs`, `scenarios.mjs`, `extra.mjs` (reproductions), `{home,step1..4}-{1440,390,320}.{png,json}` (extract-design.js + computed-style probe), state shots `step1-error-*`, `modal-terms-*`, `modal-confirm-1440`, `modal-timer-stacked-on-terms-*`, `step3-error-*`, `step4-error-*`, `cookie-dismissed-*`, `help-toggled-*`, `end-*`, `pips-1440-t0..t3.png`, `step1-typed-1440.png`, `overflow-390.json`, `extra.json`, `scenarios-log*.txt`, `app.css`/`app.js` (source snapshot used for file:line).

---

## F-VC-01 [P1] On step 1 the only button that looks clickable is Cancel. Next is a pale grey word you can barely see.
- User experiences: the card has one filled button, and it is labelled "Cancel". The action that moves the sign-up forward is a 30×16 px grey word in the corner that shows a default arrow cursor and looks disabled. On the next screens the styling flips: Next becomes a white outline and Cancel becomes a solid green button. There is no stable "this is the main action" signal anywhere in the flow.
- Where: Game, steps 1–4 and the confirm modal, button row.
- Evidence (computed style, `step{1..4}-1440.json` → probe.buttons):
  | Screen | Next / forward action | Cancel | Other |
  |---|---|---|---|
  | Step 1 | `a.button--secondary`: 30×16, text #b5bbc0 on #fff **1.94:1**, 14.4px/400, no box, `cursor:default` (app.css `.login-form .button--secondary`) | `button--solid button--blue`: **186×40**, #fff on #0c58da 6.13:1, centred, widest element | Reset: same as Next, 1.94:1 |
  | Step 2 | `button--stroked button--white`: 214×40, white outline on blue (outside the card) | `button--solid button--green`: 204×40, #fff on #29c566 **2.26:1** | — |
  | Step 3 | stroked white, 140×40 | solid green, 140×40, 2.26:1 | — |
  | Step 4 | "Validate": solid blue, 140×40 | — | — |
  | Confirm modal | — | "Yes" solid #ff0000, "Cancel" solid #29c566 | equal weight |
  Squint test on `step1-1440.png`: the blue Cancel bar is the only thing that survives the blur inside the card.
- Why it matters: a primary action has to be recognisable before it is read (Refactoring UI; NN/g on button hierarchy). Here the visual primary is the action that throws the user's input away, and the real primary changes form on every step (text link → outline → filled). Users either click Cancel, or hunt for the way forward on every step.
- Fix: use one button system across all four steps and the modals.
  - Primary (Next / Validate): `background #0c58da; color #fff; font 600 16px/1; height 44px; min-width 160px; border-radius 4px`. Place it on the right of the row, inside the card.
  - Secondary (Back / Cancel): `background transparent; color #0c58da; border 1px solid #0c58da` (6.13:1). Place it on the left.
  - Reset: delete it. If it must stay, make it a tertiary text button in `#5f6b76` (5.45:1) and remove `cursor:default`.
  - Remove `button--green` from every action button.
- Effort: S
- Confidence: high (computed styles plus screenshots at all three widths).

## F-VC-02 [P1] Step 1 fields: hint text, typed text and borders all sit at 1.94:1, and an error turns the fields brand blue
- User experiences: the email you type appears in the same pale grey as the "Your email" hint (`step1-typed-1440.png`: "…mainexample" is indistinguishable from the hint). The field outlines barely show against the white card. After an empty submit, the only error signal is a line of 10.8 px red text, and the field borders change to **blue**, which is the brand colour, not an error colour (`step1-error-1440.png`).
- Where: Step 1, password / email / domain inputs, and the error line under the T&C row.
- Evidence: `.input--gray{border-color:#b5bbc0;color:#b5bbc0}` and `::placeholder{color:#b5bbc0}` (app.css). Measured on #fff: text **1.94:1** (needs 4.5), border **1.94:1** (non-text needs 3:1, WCAG 1.4.11). Input font is 12.96 px. The error text `.login-form__terms-conditions-error` is #ff0000, 10.8 px, 4.0:1 (`modal-terms-1440.json`).
- Why it matters: this fails WCAG 1.4.3 and 1.4.11. Typed values that look like hints make users re-type or believe a field is empty. The error state depends on colour alone (1.4.1), and the colour it uses means "normal" everywhere else on the site.
- Fix:
  - Value text: #b5bbc0 → `#1f2933` (≈15:1) at **16px**, which also stops iOS zooming into the field.
  - Placeholder: #b5bbc0 → `#6b7580` (4.69:1).
  - Border: #b5bbc0 → `#8a939b` (3.12:1).
  - Error state: `border-color:#c40000` (6.27:1), a 2px left border or an icon, and a message under the field in 14 px `#c40000`.
- Effort: S
- Confidence: high.

## F-VC-03 [P1] The step pips are fake progress: the "current" pip cycles every second, whatever step you are on
- User experiences: while you work on step 1, the highlighted pip moves from 2 to 3 to 1 to 2, one step per second. The pip highlighted at the moment you look is a random step. The card's "1 / 4" and the pips disagree almost all the time.
- Where: Game chrome, `.pagination__button` ×4 above the card, on every step.
- Evidence:
  - app.js:1253 `activePageIndex: -1, // Used by fake pagination`; app.js:1278–1284 increments it on every timer tick.
  - `pips-1440-t0..t3.png` with the log "card page index 0 / highlighted pip 1, 2, 0, 1" (`scenarios-log-run1.txt`).
  - Colours: inactive pip is #fff on #29c566 **2.26:1**. Active pip is #29c566 on #fff, also 2.26:1. Mid-transition it is #def6e7 on #4ace7e, 1.77:1.
  - The pips are `<button>`s 48×48 that do nothing.
- Why it matters: a progress indicator that lies breaks trust (NN/g, visibility of system status). Using green for "not current" turns the usual meaning upside down, because green normally means "done".
- Fix:
  - Bind `is-active` to `currentPageIndex` and delete the tick handler in app.js:1279–1284.
  - Use three states: done = `#0c58da` fill with a ✓; current = `#fff` fill, `#0c58da` text, 2px `#fff` ring; upcoming = `transparent`, 2px `rgba(255,255,255,.7)` border, `#fff` text (6.13:1 on #0c58da).
  - Render the pips as `<ol>`/`<li>`, not buttons.
- Effort: S
- Confidence: high.

## F-VC-04 [P1] Phones don't reflow: fixed 436–438 px cards force the whole game to zoom out to 86% at 390 px and 71% at 320 px
- User experiences: on a phone, every step renders shrunk. The page lays out at 453 px and Chrome scales it to fit. At 320 px the step-1 input text is effectively **9.2 px**, the password rules 9.2 px, and the error line 7.6 px. The cookie banner is sized to the device width, so it covers only the left 70% of the zoomed page (`step1-320.png`, `step4-390.png`).
- Where: Game, all steps, at 390 and 320 (home reflows fine: `home-320.json` innerWidth 320).
- Evidence:
  - extract-design `page.viewport`: step1-390 → **453×979**, step2-390 → 438, step3/4-390 → 429; step1-320 → **452×1193**.
  - `overflow-390.json`: widest boxes are `.login-form__container-copy-2` (right edge 452, width 436) and `-copy-1` (444).
  - app.css: `.login-form{width:436px}`, `.avatar-and-interests__form{width:438px}`, and the decorative stacked "copy" cards offset 8/16 px.
  - Effective size = CSS px × 320/452.
- Why it matters: WCAG 1.4.10 Reflow (320 CSS px) fails. All the small type in F-VC-02 and F-VC-11 drops below legible size on exactly the device most sign-ups happen on.
- Fix: `.login-form, .login-form__container, .login-form__container-copy-1, -copy-2 {width:100%; max-width:436px}` and `.avatar-and-interests__form{width:100%; max-width:438px; box-sizing:border-box}`. Hide the copy cards below 480 px (`@media (max-width:480px){.login-form__container-copy-1,.login-form__container-copy-2{display:none}}`). Use a 16 px page gutter.
- Effort: S
- Confidence: high.

## F-VC-05 [P1] The help widget sits on top of the form on phones, covers Next at 320 px, and stays above modal backdrops
- User experiences: on a phone, a 303×228 navy panel is pinned over the form. At 390 it covers the pips and the top of the card (`step1-390-viewport.png`, `step3-390.png`). At 320 it sits over the Next / Cancel / Reset row and the password rules (`step1-320.png`). Pressing its arrow made it **taller**, not smaller (`help-toggled-1440.png`: top edge 672 → 622). When a modal opens, the widget stays bright above the dark backdrop (`modal-confirm-1440.png`, `step3-error-1440.png`).
- Where: Game chrome, `.help-form`.
- Evidence: app.css `.help-form{position:fixed;bottom:0;right:56px;width:303px;height:228px;z-index:200}` and `.modal{z-index:150}`. The `right:56px` offset at a 390 px viewport also makes the page wider than the screen.
- Why it matters: it hides the primary action on the device class with the least room. A z-index above modals breaks the modal's focus metaphor: the backdrop says "only this dialog matters" and the widget contradicts it.
- Fix: collapse by default to a 48×48 launcher (`bottom:16px; right:16px; border-radius:24px`). Expand on tap into a bottom sheet at `width:100%` below 480 px. Set `.help-form{z-index:100}` (below `.modal` 150). The arrow must reduce `height` to 48 px.
- Effort: S
- Confidence: high.

## F-VC-06 [P1] Step 3 on phones: each label sits closer to the field above it than to its own field, and the two columns interleave
- User experiences: on a phone, "Zip" appears right under the first-name box with a big gap before its own box. The fields run First name → Zip → Title → City → Surname → Country, so name and address parts alternate (`step3-390.png`).
- Where: Step 3, personal details, below 1024 px.
- Evidence: in the `@media (max-width:1024px)` block of app.css, `.personal-details__td-label{padding-bottom:24px; margin-bottom:20px}`. That puts the label **44 px** above its own input, but only `.personal-details__td-cell{padding-bottom:30px}` = **30 px** below the previous input. The DOM order is row-major across the two desktop columns (probe.labels in `step3-1440.json`: First name/Zip, Title/City, Surname/Country, Street/Box, Number/Birthdate, Age/Gender).
- Why it matters: Gestalt proximity. A label must be closer to its own field than to the previous one (between-group ≈ 2× within-group). Users will attach labels to the wrong boxes. The interleaved order splits name and address into alternating fragments.
- Fix: label → field gap **8 px** (`padding-bottom:0; margin-bottom:8px`). Field → next label gap **24 px**. Reorder the markup into two fieldsets, "About you" (Title, First name, Surname, Birthdate, Gender) and "Address" (Street, Number, Box, Zip, City, Country), each with a 16 px/600 legend and 32 px between fieldsets.
- Effort: M
- Confidence: high (CSS values plus screenshot).

## F-VC-07 [P1] Step 3: hint text, typed values and labels are the same blue, so you can't tell an empty field from a filled one
- User experiences: every text box shows "Placeholder..." in exactly the colour and size real input would have. Box and Number show a pre-filled "1", and Age shows "0". Labels use the same blue, only lighter in weight. Before submitting, you cannot see at a glance which fields still need filling.
- Where: Step 3, all inputs.
- Evidence: `.input--blue{color:#0c58da}` and `.input--blue::placeholder{color:#0c58da}`. Probe on `step3-1440.json`: value text and placeholder are both **#0c58da 16px/400**. Labels are #0c58da 16px/**300**. All 6.13:1, so this is not a contrast failure; it is a failure to separate roles. The placeholder copy is the literal word "Placeholder...".
- Why it matters: placeholders must look different from values (NN/g, "Placeholders in form fields are harmful"). Here labels, hints and values are one style, so hierarchy collapses and users submit "empty-looking" fields that are actually filled, or the other way round.
- Fix: labels `#1f2933` 14px/600. Values `#1f2933` 16px/400. Placeholders `#6b7580` (4.69:1) with real example text ("e.g. 1000"), or no placeholder at all. Keep `#0c58da` for the focus border only (2 px). Remove the default "1" and "0" values.
- Effort: S
- Confidence: high.

## F-VC-08 [P2] Checkboxes: unchecked is a solid blue square, so "on" and "off" differ only by a 13 px tick. On step 2, commands are styled exactly like options.
- User experiences: on the captcha, every unticked box is already a filled blue square, which reads as "selected". On step 2 all 21 interest boxes load ticked, and "Select all" / "Unselect all" sit inside the third column in the same style as "Ponies" and "Mullets" (`step2-1440.png`).
- Where: `.checkbox__box`, used in step 1 (T&C), step 2 (interests) and step 4 (captcha).
- Evidence:
  - app.css `.checkbox__box{background-color:#3498db;border:1px solid #1a6190;width:18px;height:18px}` in both states. Only `.checkbox__check` toggles visibility.
  - Step 2 boxes are 15×15 (`.checkbox.small`).
  - Probe: step 2 interests checked = true ×21 at load; step 4 checked = false ×16 with the same fill.
  - The interest grid is 3 columns × 7 rows with 25 px row pitch for 15 px boxes; target size 15×17 (below 24×24, WCAG 2.5.8).
- Why it matters: checkbox state must be readable without comparing boxes. The unchecked style here is the conventional checked style. Commands mixed in as options get ticked by accident and break the "choose 3" task.
- Fix:
  - Unchecked: `background:#fff; border:2px solid #6b7580` (4.69:1).
  - Checked: `background:#0c58da; border-color:#0c58da` with a white 14 px tick.
  - Box size 20×20 inside a 44 px-tall label row.
  - Move "Select all / Unselect all" out of the grid into a text-button row above it, 14px/600 #0c58da.
  - Show a live "2 of 3 chosen" counter next to the "Choose 3 interests" heading.
- Effort: S
- Confidence: high.

## F-VC-09 [P2] Captcha tiles are letterboxed photos of random size; tiles sit blank while 2000–3500 px originals load into 184×92 boxes
- User experiences: the 4×4 grid looks ragged. Each photo has a different width and height inside its cell, some are tiny (the sunglasses tile), and on a re-shuffle two tiles showed nothing but a thin line for over a second (`step4-error-1440.png`, row 1 col 2 and row 3 col 2).
- Where: Step 4, `.captcha-gallery__image-container`.
- Evidence:
  - app.css `.captcha-gallery__cell-image{height:100px}` and `.captcha-gallery__image-container{background-size:contain}`. Every box is 184×92, but `extra.json` natural sizes over three shuffles range from **225×225 and 362×139 up to 3000×2400 and 3500×2497**. Aspect ratios run from 1:1 to 2.6:1, so the visible image width varies.
  - No image was actually broken (0/48 failed in `extra.json`); the blank tiles are load latency.
  - Each checkbox sits 10 px below its photo with no shared hit area.
- Why it matters: in an image-recognition task, inconsistent framing and empty tiles make the instruction harder to judge ("is the blank one a light picture?"). The whole tile should be the target, as in established captcha patterns.
- Fix: square tiles via `aspect-ratio:1; background-size:cover; background-position:center; border-radius:4px` (or `<img object-fit:cover>`). Serve 2× = 368 px WebP thumbnails, under 30 KB each. Make the whole tile the `<label>`, with the selected state as a `3px solid #0c58da` inset ring plus a corner check. Show a `#e6e9ec` skeleton until each image's `onload` fires.
- Effort: M
- Confidence: high.

## F-VC-10 [P2] Colour has no meaning: green means cancel, inactive, hint, success and decoy; red means consent, danger and error
- User experiences: you can't use colour to predict what something does. Green #29c566 is the Cancel button (steps 2–3, confirm modal), the "not current" pips, the home-page intro, the password rules, the "Lock" button in the timer modal, the "OK" in the error modal, the success headline and the home-page "NO" decoy. Pure red #ff0000 is the cookie banner, the destructive "Yes" and the T&C error. Brand blue is both the step-1 Cancel and the "error" field border.
- Where: site-wide.
- Evidence (contrast on its real background, from the extract JSONs):
  - #fff on #29c566 **2.26:1** (Cancel, pips, NO, OK, Lock)
  - #29c566 on #0c58da **2.71:1** (home intro at 24px/weight 100, password rules 13px, end screen "YOU ARE AWESOME!")
  - #fff on #ff0000 **4.0:1** ("Not really, no", 16px)
  - `rgba(255,255,255,.4)` on #0c58da **2.19:1** (home "next page")
  - Fold hue count: 3 hue buckets on every game step (0, 150, 210), all fully saturated.
- Why it matters: semantic colour (danger, success, primary) is how users act without reading. Here it actively misleads, and most green-on-anything text fails WCAG 1.4.3.
- Fix: define 4 tokens and use each for one meaning only.
  - `--primary:#0c58da` for actions and current state.
  - `--success:#1a7f43`: white on it is 5.05:1; use it only for done pips and the end screen.
  - `--danger:#c40000`: 6.27:1; use it for errors and the destructive confirm only.
  - `--neutral-600:#5f6b76`: 5.45:1; use it for hints.
  - Remove #29c566 and #ff0000 from text and button fills. Green text on blue has no fix by tint: set it in `#fff`.
- Effort: M
- Confidence: high.

## F-VC-11 [P2] Typography: no type system, 16 sizes, body below 16 px, and the two webfonts are loaded but never used
- User experiences: text looks like an unstyled default (Helvetica on Mac, Arial or Roboto elsewhere). Running text is small: inputs 12.96 px, password rules 13 px, T&C body 12 px, error line 10.8 px, "to bottom" 11.2 px. Sizes drift by fractions of a pixel from step to step.
- Where: site-wide.
- Evidence:
  - extract-design `typography.families` = only `sans-serif` on every screen (`body{font-family:sans-serif}` in app.css). `Poppins` appears only in `.logo__icon`, which is an SVG background.
  - Two render-blocking `<link>`s in game.html pull Poppins 900 plus **8 Nunito styles**; `fontsLoaded` shows neither.
  - Distinct sizes across screens: 10.8, 11.2, 12, 12.8, 12.96, 13, 13.33, 14, 14.4, 16, 18, 18.72, 23, 24, 25, 32 (**16 sizes**; 12.8/12.96/13 and 14/14.4 are steps under 0.5 px apart).
  - Per screen: 8 sizes on steps 1, 3 and 4 (budget ≤ 4). Weights 100/300/400/700. Home intro uses `font-weight:lighter` (100) at 24 px in green, 2.71:1.
- Why it matters: small, thin and low-contrast text compounds with F-VC-04's 71% zoom. Two unused font requests add blocking round-trips (the brief notes a ~19 s cold load).
- Fix: either use Nunito (`body{font-family:Nunito,system-ui,sans-serif}`, link only weights 400/600/700 with `&display=swap`), or drop both links. Scale **14 / 16 / 20 / 24 / 32**: inputs and body 16, helper and error 14, step titles 20, modal titles 24, timer 32 with `font-variant-numeric:tabular-nums`. Weights 400/600/700 only; never 100 or 300 for text on colour.
- Effort: S
- Confidence: high.

## F-VC-12 [P2] Modals fail the hundredth-screen test: no visible close, a disabled-looking Accept, a 1.94:1 "©lose", and modals stacking on modals
- User experiences: the Terms modal has no visible close, and its only button, "Accept", is rendered pale and disabled-looking (`modal-terms-1440.png`). The timer modal shows the elapsed time in pale grey, and its close control is the text "©lose 2026" in #b5bbc0 at 14 px, which reads as a copyright footer. The timer modal opened on top of the still-open Terms modal, giving two scrims (`modal-timer-stacked-on-terms-1440.png`). The error modal on step 3 lists one error at a time ("Invalid first name") with a green OK.
- Where: `.modal` (Terms, timer, confirm, step-3 errors).
- Evidence:
  - `modal-timer-stacked-on-terms-1440.json` contrast failures: "00:01:00" **1.94:1**, "©lose 2026" **1.94:1**, "Lock" 2.26:1.
  - app.css `.modal__close-copyright{color:#b5bbc0; font-size:14px}`.
  - Terms body is 12px/normal, 640 px measure (≈110 characters per line), with a 5 px custom scrollbar (`terms-and-conditions__text-scrollbar` 5×300).
  - Timer modal fires every 60 s (`seconds % 60 === 0`, app.js:1293), observed at 00:01:00 on both widths.
  - Each modal has a different button vocabulary (blue-pale Accept, green Lock, red/green Yes/Cancel, green OK). The shared parts (8 px radius, 720/480 px widths, 24 px/700 titles) are consistent.
- Why it matters: deep screens are where a design system proves itself. Here every modal invents its own buttons, and the close affordance is disguised. Users get stuck in a modal or close the wrong thing.
- Fix: one modal template.
  - Title 24px/700 #1f2933.
  - Body 16px/1.5 with `max-width:66ch`.
  - A visible 44×44 ✕ top-right (`aria-label="Close"`).
  - Footer: primary button right and secondary left, as in F-VC-01.
  - Never open a second modal while one is open; queue it.
  - Timer readout `#1f2933`, tabular numerals.
  - Terms: native scroll, and enable Accept only via the copy ("Scroll to the end to accept"), not via 50% opacity.
- Effort: M
- Confidence: high.

## F-VC-13 [P2] The cookie banner is the loudest thing on the site: pure #ff0000, 156 px tall on desktop, about 323 px of an 844 px phone screen
- User experiences: on load, a full-width alarm-red band appears above everything (it pops in at second 2, app.js:1287). "Yes" is the heavy white 24 px button and "Not really, no" is light 16 px text, so the eye goes to "Yes", which in this question's phrasing means "it is a problem". On phones the message wraps to one word per line (`step1-390-viewport.png`).
- Where: Game chrome, `.cookies`.
- Evidence: `.cookies{background-color:red;padding:40px}`, `.cookies__message{font-size:24px}`. Measured 1440×156 px at 1440 (`step1-1440.json` probe). At 390 it fills about 323 CSS px of the first 844 px screen (`step1-390-viewport.png`). Contrast: #fff on #ff0000 **4.0:1** for the 16 px button (fails 4.5). "Yes" is 140×48 with radius 0, the only 0-radius button on the site.
- Why it matters: error red for a routine consent prompt reads as an alarm. Uneven button weight on a consent choice is a recognised dark-pattern cue (EDPB guidance on equal prominence). The banner also pushes the form below the fold on phones.
- Fix: a bottom bar or card at `max-height:30vh` with `background:#132a42` (the help widget's navy, already in the palette), 16 px text in #fff, and two buttons of **equal** style (both outline #fff, 44 px tall, radius 4 px) worded "Accept" and "Reject". Remove `#ff0000`.
- Effort: S
- Confidence: high.

## F-VC-14 [P1] Home: the way in is plain black text, and a big green "NO" button takes all the attention
- User experiences: the most prominent element is a 108 px green circle with a drop shadow and "NO" in it. The only working entry point, "HERE", is plain black 16 px text: not underlined, not coloured, and it shows a text cursor. "click" is underlined but isn't a link, and "next page" is faded white at 2.19:1.
- Where: Home, the start block.
- Evidence:
  - `home-1440.png`.
  - app.css `.start__link{color:inherit;cursor:text;text-decoration:none}`, `.start__button{height:108px;width:108px;background-color:#29c566;box-shadow:0 4px 4px rgba(0,0,0,.4)}`, `.start__highlight{color:rgba(255,255,255,.4)}`.
  - `home-1440.json`: **7/7** text elements fail contrast (intro 2.71:1 at weight 100, "Please click HERE…" #000 on #0c58da 3.42:1, "NO" 2.26:1).
- Why it matters: this is J1, finding the way in. Squint test: the decoy wins and the real link is invisible. Links must be recognisable without hovering (WCAG 1.4.1, NN/g on link affordance).
- Fix: make the entry a real primary button, "Start", styled per F-VC-01 (or #fff fill with #0c58da text, 6.13:1, 48 px tall). Delete the "NO" circle. Intro text `#fff` 20px/400 (6.13:1). Remove the faded `.start__highlight`.
- Effort: S
- Confidence: high.

## F-VC-15 [P2] Field widths ignore the expected input: a 370 px zip, a 124 px email address, a 420 px house number
- User experiences: on step 3 a 4-digit zip and a box number get the same 370 px box as a city, and "Number" gets 420 px with a spinner. On step 1 the email local part gets 124 px (about 13 characters at 12.96 px), while the password gets 372 px. Width gives no hint of what goes where.
- Where: Step 1 email row; step 3 grid at 1440.
- Evidence: probe.inputs, `step1-1440.json` (password 372×40, email 124×40, domain 124×40, extension dropdown 80×38) and `step3-1440.json` (left column 420 wide, right column 370; Day 123 / Month 115 / Year 115).
- Why it matters: field width is a cue to expected length (Baymard; GOV.UK width classes). Mismatched widths slow entry and make short fields look like long ones.
- Fix:
  - Step 1: one email field, 100% width, `type=email`, 16 px.
  - Step 3, GOV.UK-style widths: Zip `width:10ch`, Number `6ch` and Box `6ch` side by side (no spinners), Day/Month `4ch`, Year `6ch`. Names, street and city stay full width.
  - One label column of 120 px, and a 24 px gap between rows.
- Effort: S
- Confidence: high.

---

## Craft tests
- **Squint:** fails. Step 1's primary-looking element is Cancel; home's is the "NO" decoy.
- **Swap:** passes. The layered "UI" mark and the saturated blue are recognisable. **Signature:** the layered logo, the full-bleed #0c58da field, the stacked "copy" cards behind the form, the green pips and the navy help widget. That is 5 elements, but only the logo and the blue are deliberate. **Token:** framework-ish (`button--blue`, `button--green`, `input--gray`), not product tokens. **Unthemed defaults:** native number spinners on Box and Number (Arial 13.33 px buttons, 20×19), and a monospace textarea in the help widget.
- **Coherence / Frankenstein:** the shell (blue field, white 8 px cards) is coherent. Inside it the buttons, checkboxes, modals and banner each follow a different language. Radii are 0 / 2 / 3 / 4 / 8 / 24 / 54 / 50%.
- **Hundredth screen:** fails (F-VC-12). The end screen puts green-on-blue 2.71:1 type and a white-boxed GIF under a card that still shows the captcha.
- **Gabe 5-axis:** copy fail · visuals half · colour fail · type fail · spacing half (8 px base mostly holds; off-grid 10/19/27/30/50 on step 3).
- **Direction score: 6/15.** Point of View 2: as a sign-up product there is no governing idea; the only consistent principle is contradiction. Consistency 1: button roles, colour roles and checkbox states change per screen. Execution 3. VisAWI: simplicity low (8 sizes and 3 saturated hues per screen), diversity medium, colourfulness high but harsh (three fully saturated primaries), craftsmanship middling (clean radii and cards, broken reflow and contrast).
- **Brutal answers:** this would not pass as a top-10 sign-up flow on looks; it fails basic contrast on its primary colours. Swap the logo and the blue field still identifies it, but nothing inside the card does.

## Strengths (only real ones)
- The brand blue #0c58da carries white text at 6.13:1, a solid base for a primary colour.
- Card and modal shells are consistent: 8 px radius, white, one shadow (`0 0 7px rgba(0,0,0,.08)`).
- The layered "UI" logo is a distinctive mark.

## Interaction log
| Action | Result | Time |
|---|---|---|
| Load game.html at 1440, 390, 320 (fresh context each) | Cookie banner at 2 s; `innerWidth` 453 at 390 and 452 at 320 (zoom-out) | ~3–19 s load |
| Set `activePageIndex` per brief | Only the pips changed; card stayed "1 / 4". Switched to `currentPageIndex` | immediate |
| Sample pips 4× at 1 s intervals | Highlighted pip 2 → 3 → 1 → 2 while card = 1/4 | 4 s |
| Step 1: click Next with empty fields | 10.8 px red T&C error; field borders grey → blue | <1 s |
| Click "Terms & Conditions" | Terms modal; no visible close; Accept looks disabled | ~1 s |
| Click "©lose" (text match) | Failed; closed via state | — |
| Click Cancel `<button>` | Confirm modal: red "Yes" / green "Cancel"; help widget stays above backdrop | ~1 s |
| Click "Not really, no" | `cookiesIsActive=false`, banner gone | <1 s |
| Click help arrow | Widget grew 50 px taller | 0.2 s transition |
| Typed "test" / "example" into email local part and domain (never the password field) | Domain read "Domainexample" in #b5bbc0, same as the hint | — |
| Step 3: Next with empty fields | Modal "Please fill in all fields correctly: Invalid first name", green OK | ~1 s |
| Step 4: Validate with nothing ticked | No error; grid re-shuffled to a new instruction; 2 tiles blank while loading | ~1 s |
| Wait on step 4 | Timer modal "Hurry up, time is ticking!" at 00:01:00 (stacked on the Terms modal in run 1) | 42–47 s extra wait |
| Set `gameFinished=true` | End screen under the captcha card: green 2.71:1 headline plus GIF | — |
| Captcha natural sizes, 3 shuffles | 0/48 broken; sources 225×225 to 3500×2497 into 184×92 | — |
