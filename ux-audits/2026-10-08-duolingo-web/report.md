# UX audit: Duolingo web (calibration run), 2026-10-08

Team: experience-director (lead), first-timer, visual-craft, access-perf; 3 verifiers (accessibility,
ethics and red lines, "Now" claims and reward measurements). Guest only, light theme forced unless
stated, headless Chrome at 390×844 touch and 1440×900. Brief: `brief.md`. Findings: `findings/`.
Verdicts: `verification/`. Reward measurements: `evidence/experience-director/reward-measurements.md`.

## 1. Verdict

Inside a lesson, Duolingo web is benchmark-grade: the answer colour lands 27–29 ms after CHECK and the
feedback sound 14–15 ms after release (two independent runs, n = 21 and n = 30), every tap answers, and
73 recorded CHECK/CONTINUE transitions had zero blank frames. The reward ladder is dense (25–30 rewarded
beats in a perfect 12-challenge lesson) and honest (hearts refill free on lesson 1; no upsell seen in 3
reward chains, the hearts-out path or the shop). **What holds it back is everything around the lesson:**
11 onboarding screens before the first word (two of the answers change nothing), a 9-tap reward chain
after the first lesson with a 4.1 s unskippable animation and a pledge you can't skip, a day-1 streak
screen that warns "your streak will reset" while the learner already holds 2 free freezes, and a quit
sheet with a crying owl. **The biggest real problem is accessibility:** no visible keyboard focus, right
or wrong never announced to screen readers, rewards unreadable by assistive tech, and the light theme's
main buttons at 2.1–2.4:1. Would it take off as it is? It already has; the web build would keep more
first-day learners with a shorter first chain and a day-1 streak that protects instead of warns.

Assumptions and sources: guest web only (no profile, leagues, multi-day streaks, pushes or the native
app); timings are headless bot timings (no device audio latency, CPU 1×); Lighthouse is lab-only (CrUX
quota exceeded).

## 2. Scorecard

| | Score /10 | Evidence |
|---|---|---|
| **Overall** | **7.1** | 0.7 × 7.6 + 0.3 × 6.0; no open P0 |
| Clarity | 7 | lessons impossible to misread; gaps: wrong-answer grid (M-01), 11-screen onboarding, nine unlabelled meters on /learn, quitting lesson 1 re-asks the level (F-FT-03) |
| Feel | 8 | 27 ms / 14 ms acknowledgement, 0 blank frames in 73 transitions; minus: identical sound 29/29, silent combo interstitials, 9-tap first chain, white frame entering a lesson |
| Pull | 8 | daily ritual, path ring, streak, quests, free freezes, combo; minus: day-1 warning copy, a guest's progress is unsaved and nothing reaches them tomorrow (web guest) |
| Trust | 7 | no money pressure, honest hearts, honest profile ask; minus: crying-owl quit sheet (P2), inaccurate streak warning (P2) |
| Craft | 8 | Direction 13/15 (PoV 5, Consistency 4, Execution 4); one button system over 40+ buttons, 2 families, 2 weights |
| Usability · Accessibility · Performance · Content | 7 · **4** · 6 · 7 | 6 confirmed P1 accessibility failures; in-lesson response excellent, landing lab LCP 12.1 s; kind, blame-free copy with generic praise and one inaccurate warning |

Heuristic expert scores, not measured usability. First audit of this product: no deltas.

# Part 1: Feel & pull

## 3. Make it feel like Duolingo (the app already is the north star)

The decisive moments: first value before sign-up (§3.2), the validation frame of every answer (§3.10),
the combo, the session-end peak, the day-1 streak tick and its forgiveness (§3.14), the return to the
path, and quitting. Duolingo nails the first three; the web build loses ground on the last four.

## 4. Top redesigns

All "Now" claims verified (`verification/batch-c-now.md`) unless noted.

### M-02 "I finished my first lesson, why am I still tapping?" · Feel · impact H · effort M
- **Now:** 9 taps from Lesson Complete to the path (Score unlock → Score progress → streak → streak-goal
  pick → "2x more likely" → quests → gems → profile ask). The Score unlock offers its first control
  4.1 s after CONTINUE and a mid-screen tap doesn't skip it; a 608 ms white frame precedes it; the streak
  goal has no skip, close or back. Lessons 2–3 have 3–4 taps. The six words just learned are never shown.
- **Redesign:** 4 beats: ① Lesson Complete with the 6 new words ② "Day 1" streak with Score and quest as
  chips ③ streak goal as an optional card with "Not now" ④ one profile ask per day, framed as protecting
  the streak.
- **Spec:** each beat ≤ 1.5 s of motion, tap anywhere skips; 200 ms crossfade between beats; no blank frame [H].
- **Web:** `document.startViewTransition(() => setBeat(n + 1))`;
  `::view-transition-new(root){animation:220ms cubic-bezier(.2,0,0,1) both fade-in}`. **Native:**
  `TabView(selection:$beat).tabViewStyle(.page)` + `.onTapGesture { beat += 1 }`.
- **Remove:** the standalone Score-progress screen, the second "2x more likely" screen, the white frame.
- **Reduced motion / 100th use:** beats fade in 150 ms; repeat lessons already get 3 beats.
- **Why:** one designed peak per flow; skippable rewards respect the stopping cue (reward.md §5).
- **Never:** an upsell or a forced commitment between reward beats.

### M-03 Day 1 of a streak should feel safe, not like a warning · Feel + trust · impact H · effort S
- **Now:** every one of 5 day-1 copy variants says or implies a missed day resets the streak ("…Watch
  out!", "Don't forget tomorrow!"). Yet each guest is granted **2 free Streak Freezes, auto-equipped, the
  second lesson 1 completes** (4/4 guests, API-verified), which the screen never mentions. The screen is
  silent. *(Correction by verifier: the auditor's "a new guest has 0/2 freezes" holds only before lesson 1.)*
- **Redesign:** say the protection out loud: "Day 1! One lesson a day keeps it going. Miss a day? Your 2
  Streak Freezes have you covered." Play the existing hero sound on the first lesson of the day.
- **Spec:** freeze chip fades in 200 ms after the count lands; sound synced to the count (lead ≤ 40 ms);
  native `.sensoryFeedback(.success)` / `CONFIRM` at the count [S/H].
- **Web:** `<p class="freeze-chip" aria-live="polite">2 Streak Freezes equipped (free)</p>`.
- **Remove:** "Watch out!" and "Don't forget tomorrow!".
- **Why:** forgiveness, not threat, is what moved Duolingo's own streak numbers (Silverman & Barasch
  2023; reward.md §1.9). **Never:** paid repair as the only escape, a crying flame.

### M-01 "I got it wrong, but which one was right?" · Clarity · impact M · effort S
- **Now:** after a wrong answer the banner says "Correct solution: agua"; the grid doesn't mark the right
  card, and the answer is the faintest text on screen (15 px red on pink, 3.46:1, under a 24 px label).
- **Redesign:** outline the correct card green with a check and tint the wrong pick, in the banner's frame;
  make the answer the largest text in the banner.
- **Spec:** border + check fade 200 ms `cubic-bezier(.2,0,0,1)`; wrong card tint 150 ms; no shake [H].
- **Web:** `.choice[data-correct="true"].revealed{box-shadow:0 0 0 2px var(--green);transition:box-shadow .2s cubic-bezier(.2,0,0,1)}`
  **Native:** `.overlay(alignment:.topTrailing){ if revealed { Image(systemName:"checkmark.circle.fill").transition(.opacity) } }`
- **Reduced motion / 100th use:** colour + icon only; useful on every mistake. **Never:** shake or shame.

### M-04 Say what improved, not "Great job!" · Feel · impact M · effort S
- **Now:** the same correct-answer sound on 29/29 (and 40/40) correct answers; ~10 generic praise lines;
  the combo interstitials at 5 and 10 in a row are **silent** and named the combo once in 5 ("Good
  effort!" after a perfect 10). The next reward is never named in-lesson.
- **Redesign:** on specific events, informational copy: "agua: fixed! You missed it earlier", "New word:
  leche ✓", "2 more for 5 in a row"; give the 5/10 interstitials the combo count and a short rising earcon.
- **Spec:** same banner and timing; informational copy on ≤ 1 in 3 answers so it stays a surprise [H];
  vary the correct sound's timbre slightly across a session (Material 2 repetition rule) [S].
- **Why:** informational feedback raises motivation, generic praise can lower it (Deci 1999; Kluger &
  DeNisi 1996); identical rewards habituate (reward.md §1.1, §1.8).

### M-05 Quit with honesty, not tears · Trust · impact M · effort S
- **Now:** after at least one answer, X opens a sheet with a teary Duo, "Wait, don't go! You'll lose your
  progress if you quit now", a filled 358×50 KEEP LEARNING and a 125×48 text-link END SESSION. The stated
  loss is true; the exit takes 2 taps; quitting before any answer skips the sheet. The X has no pressed
  state and an early close is ignored.
- **Redesign:** neutral Duo; "Leave this lesson? Answers so far won't be saved." with two equal buttons
  [Keep going] [Leave]; better still, save partial progress and drop the warning.
- **Spec:** X `:active{transform:scale(.92);transition:transform 80ms}`; the sheet as an interruptible
  spring (WAAPI `reverse()` on a second tap) [H].
- **Never:** emotion on an exit, a demoted decline.

### M-06 Enter a lesson from the node you tapped · Feel · impact L · effort S
- **Now:** START → a 54 ms white frame, then a 250 ms fade from nowhere (`motion/P2-tap-start-filmstrip.png`).
- **Redesign:** scale from the node: `transform-origin` at the node centre, 0.94 → 1 + fade 280 ms
  `cubic-bezier(.2,0,0,1)`, no blank [H]. Reduced motion: 150 ms fade.

## 4b. Motion & transitions

24-row matrix: `evidence/experience-director/transition-matrix.md`. **Headline:** 2 hard cuts (landing →
register; register → welcome, rig-affected), 4 blank gaps (608 ms Lesson Complete → Score, 54 ms path →
lesson, 96 ms Quests tab, rig route loads); 0 blank frames in 73 in-lesson transitions. **Worst 3:** the
Score unlock (4.1 s, unskippable), path START → lesson (white frame, unanchored), quit X (no pressed state).

| Transition | Now (measured) | After |
|---|---|---|
| CHECK → banner | colour +27–29 ms, sound +14–15 ms; `clip-path` 400 ms, `width` 400 ms, 200 ms pop | keep; animate the bar with `transform: scaleX()` 300–400 ms |
| Same, reduced motion | pop removed; banner wipe, bar fill and heart pulse still run (partial) | ≤ 150 ms opacity, instant fill + highlight |
| Lesson Complete → Score | 608 ms white, 4.1 s, no button | 200 ms crossfade, ≤ 1.5 s, tap skips |
| Path START → lesson | white frame, unanchored fade | scale from the node, 280 ms |
| Gems earned | static "You earned 5 gems!" | header rolls 500 → 505, 400 ms `tabular-nums` |
| Tab switch | 96 ms blank | indicator slides 200 ms, content crossfade 150 ms |

## 4c. Borrow & adapt (Apple, Revolut)

Long version: `borrow-from-apps.md`. Top 5 (impact × ease):
1. **Revolut "points name what they buy":** "You earned 5 gems · 505 = 2 Streak Freezes · Equip" (9).
2. **Apple Pause Rings:** say the free freezes out loud on day 1 (M-03) (9).
3. **Revolut number roll:** XP, gem and streak counters roll after the chain, 300–600 ms, `aria-live`
   final value (6).
4. **Apple Reduce Motion:** lesson feedback becomes ≤ 150 ms fades (6).
5. **Apple ring closure:** the daily goal chosen in onboarding closes visibly around the streak flame (4).

## 4d. Reward layer

**Density:** 25–30 tier ≥ 1 beats per perfect 12-challenge lesson (verified), at least one tier-2 beat per
challenge; ~77–82 s per lesson at bot pace. **Longest dead stretch:** onboarding, 11 screens / ~19 taps /
53–81 s at bot pace before the first reward; then the 4.1 s Score animation. Benchmark apps not recorded.

| Moment | Ack (measured) | Channels | Tier now → target | Note |
|---|---|---|---|---|
| Choice tap | 20 ms visual, 9 ms word audio | V · S | 0 → 0 | pass |
| CHECK correct | 27–29 ms visual, 14–15 ms sound | V · S | 2 → 2 | identical sound 29/29 → M-04 |
| Match pair | 20–40 ms (verifier; auditor's 90 ms rejected) | V · S | 1 → 1 | pass |
| 5 / 10 in a row | appears 5/5, **silent** 5/5 | V | 2 → 3 | name the combo, add an earcon |
| Lesson Complete | busy at once; screen 0.66–1.86 s; fanfare same frame | V · S | 3 → 3 | pass |
| Streak day 1 | silent; warning copy | V | 3 → 4 | M-03 |
| Gems / quests | static | V | 2 → 2 | name what gems buy (4c #1) |

No haptics: web has no vibration on iPhone and the page made 0 `navigator.vibrate` calls (desktop
emulation; Android Chrome not checked).

**Red lines (verified):** R2 pass · R5 pass · R6 pass (guest web: gem prices only) · R9 pass · R11 pass on
guest web (Legendary shows no cost; a guest's START opens the profile ask; the signed-in gem/Super path is
amber, untested) · **R12: two P2s, not red** — the quit sheet (true loss, neutral decline, 2-tap exit; the
tears are the manipulative part) and the day-1 streak copy (loss-framed and inaccurate). R10 does not
apply: the missing skip on the streak pledge is a usability gap, not forced gamification. R1, R3, R4, R7,
R8 n/a. No upsell in any reward chain.

## 5. Clarity map

- Onboarding: two answers (learning reason; 5 vs 20-minute goal) change nothing you can see
  (`evidence/first-timer/`, `verification/batch-c-now.md`).
- Notification ask before the first word, via a drawn browser prompt; the screen scrolls 16 px sideways
  at 390 (`primer-light-*`). Not deceptive: BLOCK advances without asking.
- Wrong answer: which card was right? (M-01).
- /learn: icon-only tabs and four unlabelled numbers; nine meters met by the end of lesson 1.
- Quitting lesson 1 lands on "How much Spanish do you know?" again, and the modal returns on the next
  visit (F-FIRST-TIMER-03, P2).
- The node you just played still says START (P3).

## 6. Pull plan

Hook trace: trigger (none for a web guest) → one ~1.5-min lesson → combo, lesson complete, streak, quest,
gems → streak 1, path ring, XP. **Missing link: the external trigger and the stored investment** — a
guest's progress is unsaved and nothing reaches them tomorrow. Habit-zone gate: daily, pass.
- **P-01 Tomorrow card** on the path after the last chain: "Day 2 starts tomorrow · 1 lesson keeps it ·
  Freezes ready"; one card, dismissible; metric D1 return; no countdown or guilt.
- **P-02 One profile ask, at the peak:** after the day-1 streak beat, "Save your streak: create a free
  profile"; once a day (now after every lesson); LATER equal height.
- **P-03 Tomorrow's quest preview** on the quest chip.
- **P-04 League unlock named on phone** ("2 more lessons to join Bronze"), already on desktop.
- **Share-worthy moment:** the perfect-lesson combo ("11 in a row") as a 9:16 card, optional.

## 7. Emotional journey

Curious (landing) → playful, then impatient (11 onboarding screens) → confident (first challenge) → proud,
instantly (correct, +15 ms sound) → small sting (mistake; worst in-lesson) → **peak** (Lesson Complete) →
afterglow turning into a queue (9 taps) → pride turned into a warning (streak copy) → guilt if they quit
(**worst overall**) → oriented (path ring filled). Fix order: quit sheet, first chain, day-1 streak copy.

## 8. Benchmark gap

Against its own best moments and Apple/Revolut: Apple's Reduce Motion swaps every movement, Duolingo web
keeps the per-answer wipe and fill; Revolut points name what they buy, Duolingo gems don't; Apple's calm
confirmations would replace the crying quit sheet. The native app (not audited) may already close some
of these.

# Part 2: Fix (P0/P1 only)

No P0. Six P1, all accessibility, all CONFIRMED in 5 fresh runs (`verification/batch-a-access.md`).

1. **No visible keyboard focus anywhere in the core flow** (WCAG 2.4.7). Focused and blurred screenshots
   byte-identical on course cards, onboarding options and lesson choices, light and dark. Fix:
   `:focus-visible{outline:3px solid #1cb0f6;outline-offset:2px}` on every control. Effort S.
2. **Right or wrong is never announced to screen readers** (4.1.3). No live region; focus jumps to
   CONTINUE. Fix: `<div role="status" aria-live="polite">` updated with "Correct" / "Incorrect. Correct
   solution: agua" in the CHECK handler. Effort S.
3. **Lesson Complete XP and the streak are unreadable** (1.3.1). XP reads as 40 single digits; the streak
   reads "day streak" with no number. Fix: `aria-hidden="true"` on the digit strips plus a visually hidden
   final value; expose the streak count. Effort S.
4. **Light-theme contrast fails on the main buttons and reward text** (1.4.3). White on #58cc02 2.09:1,
   on #1cb0f6 2.44:1; "Lesson Complete!" 1.55:1; "day streak" 2.13:1; NEW WORD 2.48:1; LATER/SKIP
   #afafaf 2.14–2.19:1; footer links 1.49:1. Dark theme passes (CHECK 9.01:1). Fix: ship dark theme's
   label treatment in light: #131f24 labels on the existing fills (8.05:1 green, 6.88:1 blue); darker
   text tokens for brand-coloured headlines. *(Verifier: the auditor's #3c8a00 fix is 4.35:1 and fails;
   merges F-VISUAL-CRAFT-01/03/05/06.)* Effort M.
5. **Pinch-zoom disabled** (`user-scalable=no` on the landing page and /lesson; 1.4.4). Real cost on
   Android. Fix: remove `user-scalable=no` and `maximum-scale`. Effort S.
6. **Unnamed controls:** lesson quit X and the onboarding back arrow (18×18 px) have no name; hearts read
   as a bare "5" (4.1.2). Fix: `aria-label="Quit lesson"`, `aria-label="Back"`, "5 hearts left"; label the
   existing `role="progressbar"` "Lesson progress". *(Verifier: the progress bar IS exposed; that sub-claim
   was rejected.)* Effort S.

## 10. What's genuinely working

- In-lesson acknowledgement: colour 27–29 ms, sound 14–15 ms, word audio 9 ms, 0 blank frames in 73 transitions.
- Honest busy states (CONTINUE becomes loading dots; the fanfare lands in the same frame).
- Hearts don't sell: free refill on the first heart-out; no upsell in any reward chain.
- One visual system: one button family over 40+ buttons, 2 type families, 2 weights; recognisable without the logo.
- The lesson is fully keyboard-operable (1–9/0 pick, Enter checks); reflow at 320 px and 200% zoom pass.

## 11. Not checked

Native iOS/Android apps; real devices (haptics, 120 Hz motion, device audio latency, iOS Safari, Android
Chrome); VoiceOver/TalkBack (Chrome's accessibility tree only); field data (CrUX quota exceeded); real
users; signed-in features (profile, friends, leagues, shop with money, Legendary pricing, notifications
over days); multi-day streak and whether a freeze saves it; milestones 7/30/100; the hearts-intro modal
(appeared once, likely an experiment arm); the path chest; slow-3G throttling.

## 12. Appendix

**P2 (one line each):**
- F-EXP-02 / F-FIRST-TIMER-01: 9-tap first chain → M-02.
- F-EXP-03 / F-FIRST-TIMER-02: day-1 streak warns while 2 freezes are equipped → M-03.
- M-05 / F-EXP-01: crying-owl quit sheet (P1 → P2 by verifier; see calibration notes).
- F-EXP-05: profile ask after every lesson (LATER is one tap, reason true).
- F-FIRST-TIMER-03 (= F-EXP-07, P3 → P2): quitting lesson 1 re-asks the level question.
- F-FIRST-TIMER-04: 11 onboarding screens; two answers change nothing (confidence raised to high).
- F-FIRST-TIMER-05: notification ask before value; screen overflows to 406 px. Not deceptive.
- F-FIRST-TIMER-06: icon-only tabs, four unlabelled numbers on /learn.
- F-VISUAL-CRAFT-02: the correct answer is the faintest text after a mistake → M-01.
- F-VISUAL-CRAFT-04: three different 404 pages, none links back to learning.
- F-ACCESS-PERF-07: landing lab LCP 12.1 s / TTI 15.4 s, 1.5 MB JS (hero waits for the app bundle;
  reCAPTCHA 1.46 s main thread); unthrottled 1.5 s. Lab only.
- F-ACCESS-PERF-08: on phones, keyboard focus sits under the cookie banner; Escape doesn't dismiss it.

**P3:** F-EXP-04 reduced motion only partly honoured (P2 → P3, AAA) · F-EXP-06 white frame entering a
lesson → M-06 · F-EXP-08 quit X no pressed state · F-VISUAL-CRAFT-07 12 type sizes 1 px apart ·
F-VISUAL-CRAFT-08 secondary grey #777 misses AA by 0.02 · F-VISUAL-CRAFT-09 selected label 3.2:1 ·
F-VISUAL-CRAFT-10 hero headline smaller than section headlines · F-VISUAL-CRAFT-11 small seams ·
F-ACCESS-PERF-09 18 px quit and back targets · F-ACCESS-PERF-10 ~2 s of dots before Lesson Complete ·
F-FIRST-TIMER-07 cookie banner over GET STARTED · F-FIRST-TIMER-08 the fold doesn't say "free" ·
F-FIRST-TIMER-09 finished node still says START · new: a guest's Legendary START +40 XP leads to the
profile ask without saying so.

**Rejected or corrected by verifiers:** progress bar "not exposed" (it is a labelled-less
`role="progressbar"`); match-pair "90 ms" (20–40 ms; luminance method missed light green); combo
interstitials "with sound" (silent; the logged sound was the next prompt); "new guest has 0/2 freezes"
(2/2 granted at lesson 1); R10 fail (not applicable); notification primer "deceptive" (BLOCK skips the
real prompt); three contrast fix values.

**Coverage:** experience-director 16 moments, 24 transitions, 160+ recordings · first-timer journeys 1
and 3, flash test vs Babbel (74 vs 77 clean; 66 vs 55 as first seen) · visual-craft 9 screens × 2
viewports, both themes · access-perf 9/9 areas, 5 viewports · verifiers 31 items, 0 outright rejections,
2 partial, 7 severity or duplicate changes.

**Nielsen /40:** 31, the orchestrator's estimate from the verified findings, not an agent
measurement (visibility 4, match 4, control 2, consistency 3, error prevention 3, recognition 3,
flexibility 4, aesthetic 3, recovery 3, help 2).

**Calibration notes for the skill (this run's purpose):** see `summary.md`.
