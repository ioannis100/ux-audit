# visual-craft — findings
Coverage: 9/9 screens in my scope at both widths, plus extras: landing, /register, all 10 /welcome steps (owl intros, hdyhau, learningReason, proficiency + selected, courseOverview, dailyGoal + selected, notificationPrimer, choosePath), lesson default / correct banner / incorrect banner, 2 mid-lesson owl interstitials, the 8-screen post-lesson sequence (Lesson Complete → Score ×2 → streak → streak goal → quests → gems → profile prompt), /learn, 3 error URLs. That is 30+ states per width in light theme. Dark theme: lesson → /learn at 390, plus landing/register/welcome under a dark preference.
Not reached / not done: dark theme at 1440; lessons 2–3; the extractor on a competitor's first screen (the brief names no direct competitor, only Apple/Revolut for feel); hearts-intro screenshot at 390 (I only got it at 1440, `1440-light/06b-lesson-hearts-intro.png`).
Viewports/devices: headless Chrome via puppeteer-core with `orchestrator/duo.mjs`. 390×844 @2x touch and 1440×900 @2x. `prefers-color-scheme` emulated as light, and as dark where stated. **The rig's default is dark** (this Mac is in dark mode), so captures without the emulation show the dark theme. Other auditors' screenshots may be dark for this reason.
Evidence root: `evidence/visual-craft/`. `<w>-<scheme>/<screen>.png` + `.json` (`extract` = `scripts/extract-design.js`; `probe` = per-button and per-text computed styles). Scripts: `capture.mjs`, `landing-scroll.mjs`, `verify.mjs`, `summarize.py`. Contact sheets: `sheet-*.png`.

The owl, characters and challenge pictures are excluded from type and token counts. The notificationPrimer browser-permission mock-up (BLOCK/ALLOW) is excluded from contrast counts.

---

## F-VISUAL-CRAFT-01 [P2] In light theme, the label on every primary button is white on bright green or blue at 2.1–2.4:1
- User experiences: GET STARTED, CHECK, CONTINUE, CREATE A PROFILE, the cookie buttons and the /learn unit banner all use white 15px bold caps on #58cc02 (2.09:1) or #1cb0f6 (2.44:1). People with normal vision read them easily. Low-vision users and people outdoors in sunlight get a blurry word on the control they press most often, about 20 times per lesson.
- Where: every light-theme surface. Landing hero + sticky nav, /welcome CONTINUE, lesson CHECK/CONTINUE (`player-next`), post-lesson CONTINUE (green and blue), /learn "SECTION 1, UNIT 1 · Order at a café" header.
- Evidence: button fills sampled from pixels (the extractor reports these as `unknownBackground` because the fill is painted on a child element). #58cc02 in `390-light/07-post-00.png`, `08-learn-fold.png`, `landing-scroll/00.png`; #1cb0f6 in `07-post-05.png`. Labels are #ffffff at 15px/700 (`probe.buttons`). White on #58cc02 = 2.09:1, on #1cb0f6 = 2.44:1, on the incorrect-state red #ff4b4b = 3.30:1. WCAG 1.4.3 needs 4.5:1 here (15px bold is not large text). **The dark theme already solves this**: fill #93d333 with a #131f24 label = 9.29:1 (`390-dark/*`). The company knows the fix and applies it in only one theme.
- Why it matters: this is the highest-traffic text in the product. Strictly, a WCAG AA failure maps to P1. I rate it P2 because the user can still find and use the control without reading it (fixed bottom position, full width, 50px, colour, 3D lip), and the label is one learned word. The accessibility auditor owns the final severity.
- Fix: use the label treatment the dark theme already has. Light theme: label #ffffff → #131f24 on #58cc02 (8.05:1) and on #1cb0f6 (6.88:1). If brand insists on white labels, the fill has to darken to ≈ #2f6f00 (6.19:1), which no longer reads as Duolingo green. The dark label keeps the brand fill.
- Effort: M (one button token, but a brand sign-off)
- Confidence: high

## F-VISUAL-CRAFT-02 [P2] After a mistake, the correct answer (the thing to learn) is the smallest and faintest text on the screen
- User experiences: after a wrong answer, a 24px bold red "Correct solution:" heading sits over the answer "perro" in 15px medium red on pink. The eye lands on the label, not the word the learner has to remember. The label is louder than the value.
- Where: lesson → incorrect banner (`blame-incorrect`), 390 and 1440, both themes.
- Evidence: `390-light/06-lesson-incorrect.png/.json`: label 24px/700 #ea2b2b; value "perro" 15px/500 #ea2b2b on #ffdfe0 = **3.46:1**. 1440: 24px vs 17px (`1440-light/06-lesson-incorrect.json`). Dark: value at 3.25:1 (`390-dark/06-lesson-incorrect.json`). Correct banner: "Awesome!" #58a700 on #d7ffb8 = 2.72:1 at 24px bold (large text needs 3:1), and the chosen card's text #58a700 on white = 3.02:1.
- Why it matters: data-hierarchy rule (the value is larger or heavier than its label). Retrieval after an error is when the learner is most ready to encode the answer, and the layout spends its weight on the frame.
- Fix: swap the weights. Label "Correct solution:" 24px/700 → 17px/700. Answer 15px/500 → 20–24px/700 in #a52a2a (5.70:1 on #ffdfe0) or #b8282a (5.0:1). "Awesome!" #58a700 → #478700 (3.99:1, passes large text).
- Effort: S
- Confidence: high

## F-VISUAL-CRAFT-03 [P2] Brand and reward colours are used as text on white, and the reward peaks fail contrast hardest
- User experiences: the headline of the biggest reward moment, "Lesson Complete!", is yellow on white at 1.55:1. "All Daily Quests complete!" is the same. "day streak" is orange at 2.18:1. On /learn, the next-step labels START and JUMP HERE? are at 2.06–2.09:1, and the lesson's NEW WORD tag is at 2.54:1. In light theme the payoff copy is the faintest copy in the flow.
- Where: post-lesson `07-post-02` (Lesson Complete), `07-post-05` (streak), `07-post-07` (quests); /learn path; lesson header tag.
- Evidence: `390-light/07-post-02.json`: "Lesson Complete!" 25px/700 #ffc800 on #fff = 1.55:1. `07-post-07.json`: 32px #ffc800 = 1.55:1, and the progress label "10 / 10" #cd7900 on #ffc800 = 2.13:1. `07-post-05.json`: "day streak" 28px #ff9600 = 2.18:1. `08-learn-fold.json`: START #58cc02 2.09:1, JUMP HERE? #00cd9c 2.06:1. `04-lesson-default.json`: NEW WORD 16px #ce82ff 2.54:1. All of these pass in dark theme (`390-dark/07-post-02.json`: 0 failures).
- Why it matters: the colour does carry the meaning (gold = reward). But the words are the reward message, and at 1.55:1 they read as decoration. Contrast budget: the most important line of the screen gets the least contrast.
- Fix: keep the hue on shapes and badges, and darken the text one step from the existing palette. Text #ffc800 → #a86200 (4.76:1) or #cd7900 (3.32:1, which passes at these large sizes). #ff9600 → #b35f00 (4.61:1). START/JUMP HERE text → #2d7a00 (5.39:1) / #00866a (4.55:1). NEW WORD #ce82ff → #9b4dca (4.87:1). The yellow XP card border and the flame stay as they are.
- Effort: S
- Confidence: high

## F-VISUAL-CRAFT-04 [P2] Error screens fail the hundredth-screen test: three different 404 experiences, one unstyled and one blank
- User experiences: a stale or mistyped link shows one of three different pages. One is a bare "404 Not Found" in Times New Roman with no logo, no link and no viewport meta (tiny text on a phone). One is a blank dark screen. One is a legacy page in a different typeface (din-round), with a grey wordmark and "follow us on Twitter or Facebook". None of them has a button back to learning.
- Where: `/learn/zz-not-a-page` and `/this-page-does-not-exist` → raw server 404. `/course/zz/zz` → empty dark SPA shell. `/zz-not-a-page` → redirects to `/errors/404.html`.
- Evidence: `390-light/09-404.png` (Times, black, `fonts: Times`). `verify/404_learn_zz-not-a-page.png` (`viewportMeta:false, links:0`). `verify/404_course_zz_zz.png` (blank). `verify/404_zz-not-a-page.png` (`font: din-round…`, `links: 4`). Script: `verify.mjs`.
- Why it matters: everywhere else the system holds perfectly (see Strengths), and these screens are where it breaks. The `/learn/...` case is a raw dead end, the only way out is editing the URL, and it looks like a broken site rather than Duolingo.
- Fix: one SPA-rendered 404 for every unknown route. Use duolingo-sans, the existing sad-owl asset, 25px/700 #3c3c3c heading, 17px/500 body text in #737373, and the standard 50px primary button "BACK TO LEARNING" → /learn (or / for guests). Retire `/errors/404.html` and the server-level Times page.
- Effort: S–M
- Confidence: high (reproduced on 4 URLs)

## F-VISUAL-CRAFT-05 [P2] The "no" option is the faintest control on the screen (LATER, SKIP)
- User experiences: on the profile prompt, LATER is #afafaf on white at 2.19:1 and its explanation is #999 at 2.85:1, while CREATE A PROFILE gets a saturated blue fill. Desktop SKIP in the lesson is also #afafaf, 2.19:1. Both are enabled buttons, but they are styled like disabled ones.
- Where: `07-post-09` profile prompt (390 + 1440). 1440 lesson footer SKIP.
- Evidence: `390-light/07-post-09.json` (LATER 15px/700 #afafaf = 2.19:1; body "Create a profile to save…" 18px/500 #999999 = 2.85:1). `1440-light/04-lesson-default.json` (SKIP 17px/700 #afafaf). The same #afafaf is used for real disabled states (CHECK before a choice), so "enabled but secondary" and "disabled" look identical.
- Why it matters: WCAG 1.4.3 failure on an enabled control. It also makes the decline option look unavailable. That is a mild asymmetry, not a hidden option, but the ethics/reward auditor should weigh it.
- Fix: secondary-button label #afafaf → #777777 or #737373 (4.74:1), keeping the white fill and the #e5e5e5 border with its lip. Body #999999 → #737373. Keep #afafaf for disabled only.
- Effort: S
- Confidence: high

## F-VISUAL-CRAFT-06 [P2] Landing footer: 40+ links, including Privacy, Terms and "Do Not Sell or Share", at 1.49:1
- User experiences: the footer's light-green links on brand green are barely readable. That includes the privacy and legal links, which are the reason a footer exists.
- Where: landing footer, 390 and 1440.
- Evidence: `1440-light/landing-scroll/08.png`, `390-light/landing-scroll/09–10.png`. `verify` + `landing-scroll.mjs` output: footer bg #58cc02, links #a5ed6e 15px/700 = **1.49:1**, headings #d7ffb8 19px/700 = 1.88:1, site-language links 13px at 1.49:1. The extractor reported 88 of the 94 checked text nodes on the landing page failing, and nearly all of them are this footer.
- Why it matters: low traffic, but the failure is severe and lands on legal and privacy navigation. (The fullPage screenshot repeats content on this page; use the per-viewport `landing-scroll/` shots.)
- Fix: darken the footer field and keep the light-green type. Footer bg #58cc02 → #2b6500 gives links #d7ffb8 at 6.37:1 and white headings at 7.08:1. Alternatively keep the bg and set links to #1f4a00 (4.93:1).
- Effort: S
- Confidence: high

## F-VISUAL-CRAFT-07 [P3] The type scale has 12 app sizes that are 1px apart (15/16/17, 18/19/20, 24/25)
- User experiences: nothing breaks, and per screen the budget mostly holds. But the lesson-correct screen pairs a 25px question with a 24px "Awesome!", and 13 / 14 / 15 / 16 / 17 sit side by side as label sizes. It reads as tuned by eye per screen, not as a scale.
- Where: all app surfaces.
- Evidence: aggregated over 390-light app screens: sizes {13,14,15,16,17,18,19,20,24,25,28,32}; 1440 adds 22 (`summarize.py`, aggregate block in my run). Per screen: lesson-correct 5 sizes (15,16,17,24,25); /learn 5 (15,16,17,19,25); most other screens 2–4. Weights: only 500/700 across 325+ text nodes (excellent). Off-grid spacing values recur (5, 6, 10, 14, 18, 22, 25, 30), but the vertical rhythm reads cleanly, so I don't count that as a defect.
- Why it matters: system drift only. No reading failure can be shown, hence P3.
- Fix: collapse to 13 / 15 / 17 / 20 / 25 / 32 (app) + 48 / 64 (marketing, feather). That means 14→13, 16→15 (badge tags), 18/19→17 or 20, 24→25, 28→32.
- Effort: M
- Confidence: high

## F-VISUAL-CRAFT-08 [P3] Secondary grey #777777 misses AA by 0.02 everywhere
- User experiences: no visible problem, since 4.48:1 vs 4.5:1 can't be seen. It is a technical fail repeated on dozens of nodes.
- Where: /register learner counts ("42M learners" ×40), courseOverview subtitles, choosePath descriptions, streak and gems copy, landing body copy, /learn "Section 2".
- Evidence: `02-register-fold.json` (40 fails at 4.48:1), `03-welcome-05-courseOverview.json`, `07-post-05.json`, `07-post-08.json`, `08-learn-fold.json`.
- Fix: token #777777 → #737373 (4.74:1). One value, visually identical.
- Effort: S
- Confidence: high

## F-VISUAL-CRAFT-09 [P3] The selected-state label colour fails contrast, though the state is double-cued
- User experiences: a tapped option turns its label blue #1899d6 (3.2:1), and in the lesson the correct pick turns green #58a700 (3.02:1). The selection is also shown by a blue border and tint, so meaning survives. The label itself just gets harder to read at the moment of choice.
- Where: proficiency, dailyGoal, lesson choice cards (selected / correct), 390 + 1440.
- Evidence: `03-welcome-04-proficiency-selected.json`, `03-welcome-06-dailyGoal-selected.json` (17px/700 #1899d6 = 3.2:1), `06-lesson-incorrect.json` ("agua" selected 3.2:1), `05-lesson-correct.json` ("gato" #58a700 3.02:1).
- Fix: selected text #1899d6 → #1272a0 (5.33:1) and keep the #1cb0f6 border/tint. Correct text #58a700 → #2d7a00 (5.39:1).
- Effort: S
- Confidence: high

## F-VISUAL-CRAFT-10 [P3] Landing: the hero headline is smaller than every section headline, and mobile body copy is centred across 5 lines
- User experiences: at 1440 the hero H1 "The most fun way to learn…" is 32px duolingo-sans, while "free. fun. effective." below it is 48px and "learn anytime, anywhere" is 64px (feather). The page gets louder as you scroll away from the CTA. At 390 the section paragraphs are centred over 5 lines.
- Where: landing, 1440 and 390.
- Evidence: `1440-light/01-landing-full.json` probe texts (32 / 48 / 64px). `390-light/01-landing-full.json` (body 17px centred, w=307, 5 lines; `landing-scroll-sheet.png`). Fold complexity is low and conventional (2 hues, 2–4 text sizes, 3–5 bounded regions at both widths), which is good.
- Why it matters: landing-page rule that the hero heading is the largest. The hero still works because the illustration carries it, so this is P3.
- Fix: H1 32px → 48px at 1440 (feather or duolingo-sans 700, −0.02em tracking like the 64px heads already use) and 36px at 390. Left-align body paragraphs over 3 lines at 390, or cut them to 3 lines.
- Effort: S
- Confidence: medium (taste-adjacent; measured inversion is certain)

## F-VISUAL-CRAFT-11 [P3] Small seams: CTA colour alternates in the post-lesson run, the theme flips at signup, and /welcome scrolls 5px sideways
- User experiences: (a) in the 8 screens after a lesson, the same CONTINUE role is green, then blue ×3 (Score, Score, streak), then green again. (b) A user with dark mode on gets a white landing page and white /register, then /welcome turns #131f24, a full-screen flash at the handoff. (c) On /welcome at 390 the page can be panned 5px sideways.
- Evidence: (a) `sheet-390-lesson-a.png`, `sheet-390-lesson-b.png`. (b) `verify.mjs` output: under dark preference `/` and `/register` body bg rgb(255,255,255), `/welcome` rgb(19,31,36); `verify/dark-pref-register.png`. (c) `verify.mjs`: innerWidth 390, scrollWidth 395, `scrollTo(300)` → scrollX 5; the cause is a 390px-wide SVG span offset 5px.
- Fix: (a) one colour per role, green for "continue"; keep blue for feature-branded screens only if it is a deliberate rule, and write it down. (b) Give /register the dark tokens it already has in-app, or force light through /welcome. (c) `overflow-x: clip` on the funboarding root, or `left: 0; width: 100%` on the offending SVG wrapper.
- Effort: S
- Confidence: high

---

## Craft tests
- **Squint:** pass at every screen. One saturated full-width button at a fixed bottom position always wins. The lesson question (25–32px, #3c3c3c) is clearly the second read.
- **Swap:** pass. With the logo removed, the feather lowercase heads, the rounded duolingo-sans, the 4px "lip" on every button and card, and the illustration style still identify it.
- **Signature (5):** the 3D bottom-lip on every control (`border-bottom 4px`), Duo speaking through typed speech bubbles, feather lowercase display type, the flat-geometric character cast, and gold/orange reward objects (XP bolt, flame, chest).
- **Token:** brand-specific values (#58cc02, #1cb0f6, #ffc800, #ff9600, #ce82ff, #131f24 dark surface), not framework defaults. Class names are hashed, so token names can't be read.
- **Coherence:** pass. One illustration library across landing, onboarding, lesson and rewards, and one icon style. **Frankenstein:** fails only on the error pages (F-04).
- **Unthemed defaults:** the server 404 (Times) and the reCAPTCHA badge sitting off-canvas on /welcome. Nothing else.
- **Hundredth screen:** fail (F-04).
- **5-axis scan:** copy pass · visuals pass · colour **half** (light-theme text contrast, F-01/03/05/06) · type half (1px-apart scale, F-07) · spacing pass. No axis fails.

## Direction score: 13/15
Governing idea: **learning as a toy.** Chunky, rounded, tactile objects with a 3D lip, in a flat, saturated illustration world, narrated by one character.
- **Point of View 5/5:** the idea is unmistakable and runs from the marketing hero to the 25th lesson card.
- **Consistency 4/5:** one button component everywhere (50px high, 0/4px lip, 15px/700 caps +0.8px ≈ 0.053em; radius 12 on marketing, 16 in-app), 2 families, 2 weights. Loses a point for the error pages, the 1px-apart scale, and the green/blue CONTINUE alternation.
- **Execution 4/5** (VisAWI): *simplicity* high, with 1 primary action per screen and 2–5 text sizes per screen. *Diversity* high, with each of 8 post-lesson screens having its own composition inside one grammar. *Colourfulness* high, but light theme pays for it in text contrast (F-01/03), which dark theme does not. *Craftsmanship* high: tuned caps tracking, −0.02em on 64px display, 1.41 body line-height, 49–63 chars per line on desktop, a proper dark theme (#131f24, not #000) that flips CTA labels to dark.

## Personality coherence (playful · encouraging · effortless)
- **Playful:** shows in the rounded type, feather display, the lip-press controls and the characters, on the core lesson surface and not only the splash. Breaks on the 404s (Times / legacy din-round).
- **Encouraging:** shows in the owl interstitials ("You're getting good at this!") and in Awesome!/Nice! banners. Breaks where the reward headline is the faintest text (F-03) and where the incorrect banner shouts the label in red over a whispered answer (F-02).
- **Effortless:** shows in one CTA per screen, always in the same 50px spot, and no competing chrome in the lesson. Breaks in small ways: the 5px sideways wobble on /welcome and the white→dark theme flip at signup.
- **Price tier:** freemium consumer. It feels more finished than its category, and the dark theme is better executed than the light one.

## Brutal questions
- **Top-10 in category on looks alone?** Yes. It is the category's visual reference.
- **Logo swapped, could anyone tell?** Yes, from the lip-buttons, the feather heads and the illustration cast alone.
- What would embarrass it next to Apple: white-on-#58cc02 at 2.09:1 on its main button, and a Times New Roman 404.

## Strengths
- One button system holds on 40+ buttons across marketing, onboarding, lesson and rewards: 50px high, 4px lip, identical caps tracking (`probe.buttons`, all screens).
- Strict type economy: 2 families, 2 weights (500/700) over 325+ text nodes; body line-height 1.41; measure 37–63 chars.
- The dark theme is the better-built theme: #131f24 surfaces, dark CTA labels at 9.29:1, zero contrast failures on the lesson-complete screen (`390-dark/`).

## Interaction log
- `capture.mjs 390|1440 dark` (first pass, rig default): landing → /register → Spanish → 10 /welcome steps → lesson, about 60s each. Then I tapped the quit (X) to reach a confirm sheet. It quit straight back to the onboarding proficiency screen with no confirm, at lesson start, with no progress. That run was discarded, and I learned the rig defaults to dark.
- `capture.mjs 390|1440 light` (≈70s each): landing (fold + full), /register, every /welcome step with 1.5s wait for the typed bubble, lesson default. I answered with the session JSON (`POST /2023-05-23/sessions` → `correctIndex`): cat ✓ (correct banner captured), dog ✗ on purpose (incorrect banner, hearts 5→4), match, assist.
- First lesson pass stalled on an owl interstitial ("Awesome! You're working hard…"), which has no challenge element. I rewrote the loop to treat no-challenge screens as interstitials.
- `capture.mjs 390 light lesson`, `1440 light lesson`, `390 dark lesson` (≈90s each): full lesson to completion (accuracy 92%, 15 XP), 8 post-lesson screens, LATER on the profile prompt, then /learn and the 404.
- `landing-scroll.mjs 390|1440`: per-viewport landing screenshots (fullPage repeats content here), footer colour facts.
- `verify.mjs` (≈40s): theme per surface under a dark preference; /welcome sideways scroll (scrollTo 300 → 5, swipe → 5); three 404 URLs.
- Contrast for button fills and candidate fixes: pixel samples with PIL + WCAG formula, values quoted in each finding.
