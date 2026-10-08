# access-perf — findings
Coverage: 9/9 inventory areas reached on journey 1: landing, /register, all 9 /welcome steps, /lesson (select, assist, match, correct and wrong result banners, "review your mistakes" round), lesson-complete, then the post-lesson screens (score unlock, streak, streak goal, daily quests, gems, profile prompt → LATER) → /learn. 5 full guest runs (1 keyboard-only desktop, 3 tap-driven mobile, 1 at 200% zoom), plus landing and reflow passes.
Not reached: the hearts intro modal ("Each mistake costs 1 heart"). It appeared in the orchestrator's run but not in any of my 5 runs, with 1–2 deliberate wrong answers in each, so it looks like an experiment arm. Lesson 1 only served select, assist and match, so I never saw a word-bank, typing or listening challenge. Lessons 2 and 3 were not in my scope.
Viewports/devices: headless Chrome (puppeteer-core, software GL). 390×844 @2x touch, 320×568, 1440×900 desktop, 640×400 desktop (= 1280×800 at 200% zoom). **Theme:** Duolingo follows `prefers-color-scheme`, and headless Chrome on this Mac inherits **dark**. Every contrast number below names its theme. Light was forced with `emulateMediaFeatures`. The landing page and /register are light-only.
Not checked: device step 9 (no native or real-device run: TalkBack/VoiceOver, font-scale, real reduced motion, jank, dark mode on a device); a real screen-reader pass (I walked Chrome's accessibility tree instead); CrUX field data (the PageSpeed Insights API returned "Quota exceeded" — `evidence/access-perf/psi-mobile.json`); slow-3G throttling of /welcome and /lesson; Lighthouse on /lesson (it is guest-session state, not a URL); whether matched pairs in the match challenge expose a state; a grayscale screenshot (the result banners carry text headings, checked in the DOM instead).

## F-ACCESS-PERF-01 [P1] Keyboard users can't see where they are: no focus indicator anywhere in the core flow
- User experiences: Pressing Tab moves focus, but nothing on screen changes. A sighted keyboard user picking a reason, a level or a daily goal in onboarding has no idea which card Space will select or whether CONTINUE is focused.
- Where: /register course cards → every /welcome option card (radio) and CONTINUE → lesson SKIP, CHECK, quit X and the choice cards.
- Evidence: for each element I took a screenshot while it held focus from a real Tab keypress, then blurred it and took the same clip again. In every case the two PNGs are **byte-identical** (`cmp` = identical):
  - Spanish card: `evidence/access-perf/kb/focus-01-spanish-card-on.png` / `-off.png`
  - onboarding radios: `focus-04-option-hdyhau-2-*`, `focus-07-option-proficiency-4-*`
  - CONTINUE: `focus-03-continue-_welcome-1-*`, `focus-05-continue-hdyhau-2-*`
  - lesson SKIP, CHECK, quit X and choice: `kb/lesson-focus-{0,1,3,4}-*-on/off.png` (log in `focus-lesson.mjs` output)
  - Computed style on every focused button: `outline-style: none`. extract-design counts 4 rules that remove the outline and 1 `:focus-visible` rule (`layout/extract-welcome-390-light.json` → focus).
- Why it matters: this fails WCAG 2.4.7 Focus Visible (AA). In the lesson the number-key shortcuts get keyboard users through without seeing focus. In onboarding there is nothing to fall back on: you Tab blind, press Space and hope.
- Fix: `:focus-visible { outline: 3px solid #1cb0f6; outline-offset: 3px; border-radius: inherit; }` on `button, [role=radio], a`. On the choice cards, reuse the existing selected-card blue border at 50% opacity as the focus state, so focus and selection look related but different.
- Effort: S
- Confidence: high

## F-ACCESS-PERF-02 [P1] Screen-reader users aren't told whether their answer was right
- User experiences: After CHECK, a sighted user sees a green or red banner and hears a chime. A screen-reader user hears only "CONTINUE, button", because focus jumps to CONTINUE. "Nicely done!" or "Correct solution: gato" is never announced.
- Where: /lesson → CHECK → result banner (`blame blame-correct` / `blame-incorrect`).
- Evidence: `kb/log.txt` → "live regions at blame: NONE | focus: button test=player-next name="CONTINUE"". The accessibility tree at that moment (`kb/ax-blame.json`) has `heading "Amazing!"` sitting before the focused `button "CONTINUE"`. Nothing in it is `aria-live`, `role=status` or `role=alert`, and CONTINUE's accessible name doesn't mention the result.
- Why it matters: this fails WCAG 4.1.3 Status Messages (AA). Right-or-wrong feedback is the whole learning loop. A blind learner has to arrow back after every answer to find out, roughly 15 times a lesson. The chime is the only cue, and correct and wrong use different mp3s (`…2c89653a93f6.mp3` and `…4ca73b4de13a.mp3`), so a user has to learn the two sounds.
- Fix: render the banner inside `<div role="status" aria-live="polite">` that is in the DOM before CHECK and filled on grading, e.g. "Correct. Nicely done!" or "Incorrect. Correct solution: gato". Or keep the focus move and give the button `aria-describedby` pointing at the banner heading and solution.
- Effort: S
- Confidence: high for the DOM facts. A real VoiceOver/NVDA pass would confirm what is actually spoken.

## F-ACCESS-PERF-03 [P1] Lesson-complete score and streak can't be read by assistive tech: XP reads as "0 1 2 3 4 5 6 7 8 9 0 1 2 …"
- User experiences: A sighted user sees "TOTAL XP 13" and "GOOD! 67%". A screen reader reads two strips of digits per card ("0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9") and never the value. On the streak screen it reads "day streak" with no number.
- Where: /lesson → Lesson Complete (XP and accuracy cards) → the "1 day streak" screen.
- Evidence:
  - Accessibility tree after the count-up settled: `kb/ax-post-31.json` has 40 `StaticText` digit nodes and no "13", "67" or "92". Same in `motion-normal-light/ax-complete-settled.json`.
  - `document.body.innerText` on all 4 runs reads "TOTAL XP 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 GREAT! 0 1 2 … %" (`motion-*/log.txt`).
  - Streak: `kb/ax-post-36.json` = `"day streak" "Th" "F" "Sa" "Su" "M"`, while the screenshot `kb/post-36.png` shows a big "1".
  - The week row doesn't expose which day is done (the visual cue is a check icon).
- Why it matters: this fails WCAG 1.3.1 Info and Relationships (A), and 1.1.1 for the streak number. These are the reward moments the product is built around (XP, accuracy, streak), and they are empty for a blind learner. This is the payoff of the core loop, not decoration.
- Fix: put `aria-hidden="true"` on the rolling digit columns and add a sibling `<span class="sr-only">13 XP</span>`. Do the same for accuracy ("67% accuracy") and the streak ("1 day streak"). For the week row, use `aria-label="Thursday, done"` on each day.
- Effort: S
- Confidence: high

## F-ACCESS-PERF-04 [P1] In the light theme, the main buttons and reward headlines fail contrast: CHECK, CONTINUE and "Lesson Complete!"
- User experiences: On a light-mode device (most phones by default), every primary button label is white on bright green at 2.09:1. The "Lesson Complete!" title is yellow on white at 1.55:1. In sunlight or with low vision these are hard to read.
- Where (light theme): onboarding and lesson CONTINUE/CHECK; the result banners; lesson-complete; the profile prompt; landing; the cookie banner.
- Evidence: pixel-sampled background with CSS text colour (`probe.mjs`), plus exact hex ratios:

| Element (light) | fg / bg | ratio | needs |
|---|---|---|---|
| CHECK, CONTINUE (onboarding, lesson, complete), white on #58cc02 | #fff / #58cc02 | **2.09** | 4.5 |
| Wrong-answer CONTINUE | #fff / #ff4b4b | **3.30** | 4.5 |
| Correct banner heading "Nicely done!" (24px bold) | #58a700 / #d7ffb8 | **2.72** | 3 |
| "Lesson Complete!" (25px bold) | #ffc800 / #fff | **1.55** | 3 |
| "TOTAL XP" card label (13px bold) | #fff / #ffc800 | **1.55** | 4.5 |
| LATER (profile prompt) | #afafaf / #fff | **2.19** | 4.5 |
| CREATE A PROFILE, REJECT ALL, ACCEPT COOKIES | #fff / #1cb0f6 | **2.44** | 4.5 |
| Landing "research shows that it works", Cookie Policy | #1cb0f6 / #fff | **2.44** | 4.5 |
| Landing green h2 ("free. fun. effective.", 36px) | #58cc02 / #fff | **2.08** | 3 |
| Landing footer links (67 items) | #a5ed6e / #58cc02 | **1.48** | 4.5 |
| "42M learners" on /register | #777 / #fff | **4.48** | 4.5 |

  - Sources: `motion-normal-light/probes.json`, `layout/probes-lesson-light.json` (welcome CONTINUE), `layout/probes-landing-light.json`, and Lighthouse `lh-landing-mobile.json` → color-contrast (91 failing nodes).
  - These independently match visual-craft's numbers (2.09, 2.44, 1.55, 2.19). My pixel probe reads 1.51 and 2.14 on a quantised #fcfcfc background. Against true #fff they are 1.55 and 2.19.
  - **Dark theme** (`motion-normal-dark/probes.json`): passes. CHECK/CONTINUE #131f24 on #90d030 = 9.0, "Lesson Complete!" = 11.1, wrong-answer heading = 3.36 (large). The one dark-theme failure is LATER, #52656d on #131f24 = **2.75**.
- Why it matters: this fails WCAG 1.4.3 (AA) on the most-pressed control in the product, hundreds of times per user per week. The dark theme proves the brand survives dark text on green: it already ships #131f24 on green.
- Fix: in light, use #131f24 or #1a3d00 text on #58cc02 (≥ 7:1), or darken the button to #3c8a00 with white text (≈ 4.6:1). "Lesson Complete!" in #b37a00 (≈ 3.3:1 large), or keep the yellow and add a #8a5a00 text shadow or outline. LATER in #6f6f6f (5.0:1). Footer links #ffffff on #3c8a00.
- Effort: M (design-token change, tested across both themes)
- Confidence: high

## F-ACCESS-PERF-05 [P1] Pinch-to-zoom is turned off on every page
- User experiences: A low-vision user on Android Chrome tries to pinch-zoom the lesson or the tiny cookie text, and nothing happens.
- Where: `<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">` on the landing page and on /lesson.
- Evidence: `layout/log.txt` ("landing meta viewport", "lesson meta viewport"); Lighthouse `meta-viewport` failed on both runs (`lh-landing-mobile.json`).
- Why it matters: this fails WCAG 1.4.4 Resize Text (AA). iOS Safari ignores `user-scalable=no`. Android Chrome honours it unless the user has found "Force enable zoom" in accessibility settings. The layout itself survives zoom (see Strengths), so blocking it buys nothing.
- Fix: `content="width=device-width,initial-scale=1"`. If double-tap zoom on choice cards is the worry, set `touch-action: manipulation` on the cards.
- Effort: S
- Confidence: high for the markup. Medium for real-device impact (no Android run, step 9).

## F-ACCESS-PERF-06 [P1] The lesson's quit button and the onboarding back button have no name, and hearts and progress are invisible to assistive tech
- User experiences: A screen-reader user hears just "button" as the first thing on every lesson and onboarding screen, with no clue it means quit or back. Hearts are read as a bare "5". The lesson progress bar isn't exposed at all, so a blind learner can't tell how far through the lesson they are.
- Where: /lesson → `quit-button` (X); /welcome → back arrow; lesson header → hearts and progress.
- Evidence: `kb/ax-select.json`, `kb/ax-assist.json`, `kb/ax-match.json` → first node `button ""`, then `StaticText "5"`, with no `progressbar` role. Onboarding Tab stops start with `button test=- name=""` on all 9 steps (`kb/log.txt`). Landing: Lighthouse `button-name` fails on one button (`lh-landing-mobile.json`).
- Why it matters: this fails WCAG 4.1.2 Name, Role, Value (A) on the only exit from a lesson, and 1.3.1 for hearts and progress. A lesson is completable without these, so it is P1 for the A failure, not P0.
- Fix: `aria-label="Quit lesson"` and `aria-label="Back"`. Hearts: `aria-label="5 hearts left"`. Progress: `role="progressbar" aria-valuemin=0 aria-valuemax=100 aria-valuenow={pct} aria-label="Lesson progress"`.
- Effort: S
- Confidence: high

## F-ACCESS-PERF-07 [P2] Mobile landing page in the lab: the hero appears after ~12 s and the page responds after ~15 s, carrying 1.5 MB of JavaScript including reCAPTCHA and Google sign-in
- User experiences: On a mid-range phone on 4G (Lighthouse's simulated profile), the landing page shows text at 2.6–4.2 s, but the hero illustration, which is the largest paint, arrives at 12–13 s and the page is fully interactive at about 15 s.
- Where: https://www.duolingo.com, mobile.
- Evidence:
  - Lighthouse mobile, 2 runs (`lh-landing-mobile.json`, `lh-landing-mobile-run2.json`): Performance 56 / 62, FCP 4.2 / 2.6 s, **LCP 12.0 / 12.8 s**, **TTI 15.4 / 15.7 s**, TBT 290 / 300 ms, CLS 0. Both runs warn "page loaded too slowly to finish".
  - Desktop (`lh-landing-desktop.json`): Performance 68, LCP 2.8 s (the LCP element is the OneTrust cookie text), TBT 40 ms, CLS 0.
  - 28 scripts, 1,496 KB transferred. The largest are reCAPTCHA 348 KB, app 318 KB, chunk 4779 238 KB, GTM 185 KB, OneTrust 109 KB and Google Identity Services 101 KB. Unused JS is about 770 KB.
  - The mobile LCP image (`picture._1Bvko > img`, the splash illustration) is "not discoverable in initial document" and has no `fetchpriority`, so it is client-rendered.
- Why it matters: in lab terms this is poor LCP (> 4 s). Field CrUX was unavailable (quota), so I can't say what real users get. Loading reCAPTCHA and Google sign-in on a page whose job is "GET STARTED" taxes every visitor for a feature only returning sign-ins use.
- Fix: server-render or preload the hero `<img fetchpriority="high">` in the initial HTML. Lazy-load reCAPTCHA and GSI on "I ALREADY HAVE AN ACCOUNT" or on reaching /register. Defer GTM until after the load event.
- Effort: M
- Confidence: medium (lab only, simulated throttling). CrUX p75 would raise it.

## F-ACCESS-PERF-08 [P2] On phones, keyboard focus disappears under the cookie banner on the landing page
- User experiences: A keyboard or switch user who tabs past the cookie banner without answering it lands on GET STARTED and then I ALREADY HAVE AN ACCOUNT. Both are completely hidden under the banner.
- Where: landing, 390×844, cookie banner open (it covers y 537–844).
- Evidence: `obscured.mjs` output: Tab 5 = GET STARTED, centre y=737, and `elementFromPoint` there returns the COOKIE BANNER. Tab 6 = I ALREADY HAVE AN ACCOUNT, centre y=799, same. Screenshot: `layout/landing-390-focus-get-started-under-banner.png`.
- Why it matters: this fails WCAG 2.4.11 Focus Not Obscured (AA). It's P2 rather than P1 because the banner is first in the Tab order (REJECT ALL is Tab 1), so most keyboard users clear it first. Users who skip it lose the main CTA.
- Fix: while the banner is open, add `scroll-padding-bottom: <banner height>` to `html`, or make the banner a non-modal region that page focus scrolls clear of.
- Effort: S
- Confidence: high

## F-ACCESS-PERF-09 [P3] The quit X and the onboarding back arrow are 18×18 px touch targets
- User experiences: On a phone, the X that leaves a lesson is a small target (measured 18×18 CSS px).
- Where: /lesson `quit-button`; /welcome back arrow (both `button._1gEmM._7jW2t`).
- Evidence: `motion-normal-light/extract-lesson.json` and `layout/extract-welcome-390-light.json` → targetsUnder24px: 18×18.
- Why it matters: it passes WCAG 2.5.8 through the spacing exception (nothing else is within 24 px), but it is well under the 44 pt iOS / 48 dp Android guidance. The cost is small: a missed tap on a rarely used escape.
- Fix: `padding: 13px; margin: -13px` so the hit area is 44×44 and the icon stays 18 px.
- Effort: S
- Confidence: high

## F-ACCESS-PERF-10 [P3] About 2 s of "•••" on the last CONTINUE before Lesson Complete
- User experiences: After the final answer, the CONTINUE button turns into three loading dots, and the celebration starts about 2.3–2.7 s later.
- Where: last challenge → CONTINUE → lesson-complete.
- Evidence: screencast frames `motion-normal-dark/frames/00311.jpg`–`01997.jpg` (dots); the complete screen first appears by +2293 ms (reduced run) and +2.7–3.0 s (normal run). Contact sheet: `celebration-normal-vs-reduced.png`.
- Why it matters: it isn't broken. There's a busy state, so it's within the 1–10 s "show progress" band. But it is the one wait in a lesson that otherwise responds in under 60 ms, and it sits right before the reward.
- Fix: start the lesson-complete transition optimistically (character and title first) while the session POST finishes, and roll the XP number in when the response lands.
- Effort: M
- Confidence: low. This is headless with software GL and the session POST timed on this rig's network; a real phone and network would settle it.

## Checked and passed (calibration notes)
- **Reflow:** lesson at 320×568 has no horizontal scroll and no clipped text (`layout/lesson-320.png`, scrollWidth 320). WCAG 1.4.12 text-spacing override at 390 shows no clipping (`layout/lesson-390-textspacing.png`). At 200% (640×400) the lesson reflows with no horizontal scroll (`layout/zoom200-lesson.png`). CHECK sits at y 390–440 of a 400 px viewport (partly below the fold), but the page scrolls (scrollHeight 460) and Enter triggers CHECK anyway. At 200%, the cookie banner covers about 65% of /register until dismissed (`layout/zoom200-after-pick.png`), which is allowed because it can be dismissed.
- **Flashing (WCAG 2.3.1):** I screencast the full lesson-complete sequence plus post-screens: 1,417 frames at about 30 fps in the light run, 640 / 357 frames in the dark normal / reduced runs. Opposing luminance swings of 0.1 or more, counted per 65×70 px block, peaked at 2–3 per second and never went above 3. The 3/s case was the CONTINUE button area in the reduced run (a press state, not the celebration). Pass, with the caveat that screencast frames arrive only on change, so this can undercount.
- **Colour alone:** correct and wrong results each carry a text heading ("Nicely done!" vs "Correct solution: …") and different icons, so colour isn't the only cue.

## Strengths
- The lesson is fully keyboard-operable with real shortcuts: number keys 1–9 and 0 pick choices and match tokens (the numbers show on the cards and are part of the accessible names, e.g. `radio "gato 3"`), and Enter does CHECK then CONTINUE. I finished all 15 challenges, every onboarding step, the 8 post-lesson screens and LATER (2 Tabs) without a mouse.
- Feedback is instant: from CHECK to a painted result banner took a median of about 42 ms (range 24–59 ms over 12 keyboard answers on desktop; 40–93 ms over 30 taps at 390, with outliers of 224, 261 and 432 ms while 3–4 browsers ran in parallel), and the correct or wrong sound started about 20–46 ms after input.
- Reduced motion is honoured where it matters: with `prefers-reduced-motion: reduce`, Lesson Complete arrives with the final XP and accuracy already shown, a static character, no sparkle bursts and no card-by-card reveal. Frames changing in the 10 s after the last CONTINUE: 84 reduced vs 241 normal, and nothing moves after +2.9 s (`celebration-normal-vs-reduced.png`). This is done in JS: there are 0 `prefers-reduced-motion` CSS rules across the landing page's 9 stylesheets.

## Brutal questions
- **Who can't finish the core journey?** Nobody is fully locked out: every step works by keyboard, and choices are properly labelled radios. But screen-reader users play a lesson where nothing tells them whether they were right (F-02), and finish to a score that reads as random digits (F-03). Sighted keyboard users go through onboarding blind (F-01). Low-vision light-mode users get 2.09:1 on the one button they press most, and on Android can't pinch to zoom (F-04, F-05).
- **Biggest speed problem a user actually feels:** the mobile landing page, where the hero appears at 12–13 s in the lab with 1.5 MB of JS including reCAPTCHA and Google sign-in (F-07). Inside the product, speed is excellent: answer feedback under 60 ms. The only wait is about 2 s of dots before Lesson Complete (F-10, low confidence).

## Interaction log
| # | Action | What happened | Time |
|---|---|---|---|
| 1 | Lighthouse mobile ×2 and desktop on / | perf 56/62 mobile, 68 desktop; LCP 12.0/12.8 s mobile, 2.8 s desktop | ~3 min |
| 2 | Keyboard: /register, Tab ×7 → Spanish, Enter | → /welcome; focus lands on BODY; card focus not visible | 3 s |
| 3 | Keyboard: cookie banner after Enter-pick | Banner not rendered (0×0) when the course is picked by keyboard; it shows only after a pointer tap. No barrier | – |
| 4 | Keyboard: /welcome × 9 steps (Tab → radio, Space, Tab → CONTINUE, Enter) | All 9 steps passed. CONTINUE isn't in the Tab order until enabled (native `disabled`). Digit "1" does nothing in onboarding | 64 s |
| 5 | First keyboard run (abandoned) | After Space + an extra Enter on the learningReason radio, CONTINUE showed "•••" for 3+ min (`kb/welcome-05…24-learningReason-*.png`). Didn't reproduce across 2 later keyboard runs or 3 mouse runs, so not reported | – |
| 6 | Keyboard: lesson, 15 challenges by digit keys + Enter (2 wrong on purpose) | Every answer graded; match by digit pairs works; result never announced (no live region) | 90 s |
| 7 | Keyboard: lesson-complete → score → streak → goal → quests → gems → profile prompt | All reachable by Tab/Enter. My script pressed Enter on the focused CREATE A PROFILE and reached the sign-up form; I typed nothing and left by a Terms link. Later runs: LATER = 2 Tabs, then /learn | 45 s |
| 8 | Tap runs at 390 (dark normal, dark reduced, light normal), 10–11 answers each | Tap → banner painted 40–93 ms (3 outliers 224–432 ms); sound +21–201 ms | ~3 min each |
| 9 | Screencast of the completion sequence, normal vs reduced | Reduced: static final state by +2.3 s; normal: animation to about +9 s; no flash over 3/s | – |
| 10 | 320 px reflow, text spacing, 200% zoom (640×400) | All pass; CHECK partly below the fold at 200% | ~2 min |
| 11 | Landing Tab order at 390 with banner open | REJECT ALL, ACCEPT, a focusable root container (junk stop), logo, GET STARTED (under banner), I ALREADY HAVE (under banner) | 10 s |
| 12 | PageSpeed Insights API | "Quota exceeded", so no field data | – |

Reproduction scripts: `evidence/access-perf/{kb,motion,layout,zoom,focus-lesson,obscured,probe,sheet}.mjs` (run from the audit folder: `node evidence/access-perf/motion.mjs normal|reduced dark|light`).
