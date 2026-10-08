# experience-director — findings
Coverage: Journeys 1–3 complete at 390×844 (light theme forced): landing → /register → 11 onboarding
screens → lesson 1 (2 deliberate mistakes) → full 9-screen end chain → /learn → lesson 2 (perfect) →
chain → lesson 3 under `prefers-reduced-motion` (1 mistake) → chain → /learn, Quests and Leaderboards
tabs. Extra runs: quit sheet (KEEP LEARNING, early-close, END SESSION), hearts to zero, guest shop,
desktop lesson + chain at 1440×900, 3 fast lessons for pacing. 24 transitions recorded (matrix), 160+
per-action recordings. Not reached: Legendary challenge (not tapped: may start a gem/Super flow),
path chest contents, leagues (guest not placed after 3 lessons), multi-day streak, milestones 7/30/100,
pushes, signed-in features, native app, real-device haptics.
Viewports/devices: headless Chrome (puppeteer-core, SwiftShader GL, CPU 1×) at 390×844 @2x touch and
1440×900; `/welcome` dark in the capture-motion strips only (rig default). All timings are bot timings;
latency method and caveats: `evidence/experience-director/reward-measurements.md` § Method.

## North star
Feels like: **Duolingo itself** (the brief's north star), so every score below is "how close is the web
build to Duolingo-grade", judged against the skill's anchors, not the brand's reputation. Apple (motion
restraint, Reduce Motion, calm confirms) and Revolut (number rolls, points that name what they buy) are
the comparison lenses. Moments that decide the feel (habit/learning recipe, benchmark-apps §4): first
value before sign-up (3.2) · in-task feedback on the validation frame (3.10) · combo (3.10) · session-end
peak (3.10) · streak tick + forgiveness (3.14) · return to the path (3.12/3.15) · quitting.

## Moment map
| # | Journey → moment | Clarity | Feel now (/10) | States missing | Benchmark | Evidence |
|---|---|---|---|---|---|---|
| 1 | J1 landing → GET STARTED | ok (cookie banner covers the CTA until answered; Accept/Reject equal weight) | 5 (page swap, hard cut @150 ms) | — | §3.1 | `shots/j1-00-landing.png`, `motion/t01-*` |
| 2 | J1 onboarding, 11 screens | ok: one question per screen, progress bar | 7 per screen; journey 5: 19 taps / 81 s bot to first value, 2–3 s of type-in choreography per screen | — | §3.2 "value in screen 1–2" | `shots/j1-ob*.png`, `motion-onboarding/` |
| 3 | J1 choice tap | ok | 9 (selected 20 ms, word audio 9 ms after release) | — | §3.3 | `motion/L*-c*-choice-tap*` |
| 4 | J1/J2 CHECK → correct | ok | 8 (colour 29 ms, sound 15 ms, banner 400 ms; generic praise; reduce ignored) | haptic (web) | §3.10 | `motion/L1-c00-check-filmstrip.png` |
| 5 | J1 CHECK → incorrect | **gap**: right answer only as text; the grid doesn't point at it | 7 | — | §3.11 | `motion/L1-c02-check-filmstrip.png` |
| 6 | Combo (N IN A ROW, 5/10 interstitials) | ok | 8 | — | §3.10, reward §1.1 | `shots/X1-s00.png`, `motion/L2-s00-*` |
| 7 | Mistake review ("PREVIOUS MISTAKE") | ok, fair | 8 | — | §3.11 | `shots/L1-s00.png` |
| 8 | Lesson complete | ok | 8 (busy dots → fanfare + count-up in one frame, 0.66–1.86 s) | — | §3.10 | `motion/L2-c11-continue*` |
| 9 | Lesson-1 end chain (9 taps) | gap: forced streak-goal pick, no skip | **5** (each beat good; ≥ 4 s unskippable Score, 608 ms white frame, profile ask) | skip | §3.10 "≤ 3 screens, skippable" | `shots/L1-s01…s09.png` |
| 10 | Streak start | ok | 6 (silent; 2/4 copy variants warn; freeze 0/2 and unmentioned) | sound | §3.14 | `shots/L1-s04.png`, `shots/X2-s04.png`, `shots/H-shop-full.png` |
| 11 | J3 return to /learn | ok: ring fills on the node, START bubble, chest ahead | 7 | — | §3.12 saga map | `motion/L1-s09-tap-LATER-filmstrip.png` |
| 12 | J2 path → next lesson | ok | 5 (popover anchored, then a white frame and an unanchored fade) | — | §3.6 | `motion/P2-tap-start-filmstrip.png` |
| 13 | Quit | ok | 6 (no pressed state on X; early close ignored) · ethics flag F-EXP-01 | pressed | §3.11, §5 | `shots/Q1-quit-sheet.png` |
| 14 | Hearts | ok | 7 (clear intro; free refill at 0; no paywall) | — | engagement-retention Paywalls | `shots/H-c0-hearts-intro.png`, `shots/H0-final.png` |
| 15 | END SESSION in the first-ever lesson | **gap**: lands back on "How much Spanish do you know?" | 4 | — | §3.11 | `shots/Q5-after-end-0.png` |
| 16 | Desktop lesson + chain | ok (number-key hints, sidebar names "Complete 2 more lessons to start competing") | 8 | — | — | `shots/D1-*.png` |

**Overall feel score: 7/10.** The in-lesson loop is benchmark-grade (9 on acknowledgement); the score is
pulled down by what surrounds it: a 9-tap first chain, unanchored entry into lessons, a silent and
loss-framed streak start, and a guilt-styled quit sheet.

## Motion table (≤ 15 rows, from the transition matrix in step 2b)
Headline: 2 hard cuts (landing → register; register → welcome, rig-affected), 4 blank gaps (608 ms
Lesson complete → Score, 54 ms path → lesson, 96 ms Quests tab, rig route loads), worst 3: Score unlock
(≥ 4 s, no button), path START → lesson (white frame, unanchored), quit X (no pressed state, early close
ignored). 73 recorded CHECK/CONTINUE transitions: 0 blank frames. Full matrix:
`evidence/experience-director/transition-matrix.md`.

| Element / transition | Now (measured) | After (spec) | Why |
|---|---|---|---|
| CHECK → banner | colour +29 ms, sound +15 ms after release; `clip-path` 400 ms `ease`, `width` 400 ms `ease`, 200 ms overshoot | keep; move the bar to `transform: scaleX()` 300–400 ms `cubic-bezier(.2,0,0,1)` [H] | `width` is a layout property; the rest is benchmark-level |
| Same, reduced motion | identical 4 animations under `reduce` | banner and bar: ≤ 150 ms opacity / instant fill; keep sound and colour [S Apple] | Reduce Motion ignored |
| Incorrect | wrong card stays blue, right card unmarked | right card gets the green outline + check 200 ms; wrong card red tint 150 ms [H] | clarity: show where the answer was |
| Lesson complete → Score unlock | 608 ms white frame, ≥ 4 s hop, no button | crossfade 200 ms; Score beat ≤ 1.5 s, tap anywhere skips [H] | §3.10 skippable; blank = "app restarted" |
| Path START → lesson | 54 ms white frame, 250 ms fade from nowhere | scale from the node: `transform-origin` = node centre, 0.94→1 + fade 280 ms `cubic-bezier(.2,0,0,1)`, no blank [H] | law 3: motion anchored to its source |
| Quit X | no pressed state; sheet +81 ms after release; close at +100 ms ignored | `:active` scale .92 80 ms; sheet as a spring that accepts a close mid-flight (WAAPI `reverse()`) | §3.3, interruptible |
| Streak flame | 1000 ms transforms, silent | keep the motion; add the hero sound once a day (first lesson only) | reward §3 tier 4 |
| Gems earned | static "You earned 5 gems!", header 505 static | roll the header balance 500 → 505, 400 ms `tabular-nums` (Revolut) | numbers changing = progress felt |
| Tab switch Learn ↔ Quests | 96 ms blank, no indicator motion | indicator slides 200 ms `ease-out`, content crossfade 150 ms [H] | §3.7 |

## M-01 "I got it wrong, but which one was right?" · Clarity gap · impact M · effort S
- Now: on a wrong answer the banner says "Correct solution: agua" (`shots/L1-c02-result-incorrect.png`);
  the tapped wrong card stays blue-selected and the right card in the grid is unchanged
  (`motion/L1-c02-check-filmstrip.png`). The learner must map a word in the banner back to a picture.
- Feels like: "wait, which was agua?", at the exact moment learning should happen.
- Benchmark: Candy Crush's invalid swap explains the rule with motion, not a modal (§3.11); Duolingo's
  own correct path already colours the tapped card in 1–2 frames.
- Redesign: outline the correct card green with a check, tint the wrong pick red, in the same frame as
  the banner.
- Spec: right card: border + check icon fade 200 ms `cubic-bezier(.2,0,0,1)`; wrong card: red tint
  150 ms; no shake [H]. Sound unchanged (+15 ms).
- Web: `.choice[data-correct="true"].revealed{box-shadow:0 0 0 2px var(--green);transition:box-shadow .2s cubic-bezier(.2,0,0,1)}`
  Native: `.overlay(alignment:.topTrailing){ if revealed { Image(systemName:"checkmark.circle.fill").transition(.opacity) } }`
- Remove: nothing.
- Reduced motion / 100th use: no motion needed; colour + icon is the whole change; still useful on the
  100th mistake.
- Why it works: informational feedback beats generic signals (Deci 1999, reward §1.6).
- Never: shake, red flash, or shame copy.

## M-02 "I finished my first lesson, why am I still tapping?" · Feel gap · impact H · effort M
- Now: after lesson 1, **9 taps** before the path (Lesson complete → Score unlocked → Score progress →
  1 day streak → streak goal pick → "2x more likely" → Daily Quests → 5 gems → create profile LATER),
  including a **≥ 4.06 s** Score animation with no button (`motion/L1-s01-tap-CONTINUE-frames/`), a
  **608 ms white frame** before it, and a streak-goal screen with **no skip**. L2/L3 chains are 3–4 taps,
  so the problem is the first one, the one that sets the habit. 22 s at bot speed.
- Feels like: the peak (Lesson complete) is followed by a queue; by the profile ask, the afterglow is gone.
- Benchmark: benchmark-apps §3.10 "≤ 3 screens, skippable, never upsells between reward screens";
  peak-end: exactly one designed peak per flow (emotional.md).
- Redesign (4 beats): ① Lesson complete (unchanged). ② "Day 1" streak with the Score and the quest as
  two chips under it ("Spanish Score 1 · Daily quest ✓ +5 gems"). ③ Streak goal as an optional card with
  "Not now" (or ask after lesson 2, when the learner has chosen to come back once). ④ Profile ask framed
  as protecting the streak, once per day, not after every lesson.
- Spec: each beat ≤ 1.5 s of motion, tap anywhere to skip; crossfade 200 ms between beats; no blank
  frame [H].
- Web: `document.startViewTransition(() => setBeat(n+1))` with
  `::view-transition-old(root){animation:160ms ease-in both fade-out}` `::view-transition-new(root){animation:220ms cubic-bezier(.2,0,0,1) both fade-in}`
  Native: `TabView(selection:$beat).tabViewStyle(.page)` + `.onTapGesture { beat += 1 }`.
- Remove: the standalone Score progress screen, the "2x more likely" second screen, the white frame.
- Reduced motion / 100th use: beats appear with a 150 ms fade; repeat lessons already get 3 beats.
- Why it works: fewer, bigger beats keep the peak the last strong memory; skippability respects the
  stopping cue (reward §5).
- Never: an upsell or a forced commitment between reward beats.

## M-03 "Day 1 of my streak" should feel safe, not like a warning · Feel gap + ethics · impact H · effort S
- Now: the streak start is visual only (no sound recorded; `motion/L1-s03-tap-CONTINUE.json` sounds: [])
  and 2 of the 4 copy variants seen are warnings: "But your streak will reset if you don't practice
  tomorrow. Watch out!" (`evidence/experience-director/desktop-log.txt` D1 s5, `shots/D1-s05.png`), "Tip: Skipping a day resets your streak. Don't forget
  tomorrow!" (`shots/X2-s04.png`). A new guest has **0/2 Streak Freezes**, priced 200 gems
  (`shots/H-shop-full.png`), and the streak screen never mentions them.
- Feels like: a rule and a threat on day 1, before any attachment exists.
- Benchmark: Duolingo's own published lesson: freezes and repair blunt the broken-streak drop
  (Silverman & Barasch 2023; reward §1.9); Apple Pause Rings (§3.12, §3.14 "grace from day 1").
- Redesign: auto-equip 1 free freeze on the first streak day and say so. Copy: "Day 1! One lesson a day
  keeps it going. Miss a day? Your free Streak Freeze has you covered." Play the existing hero sound once
  (first lesson of the day only).
- Spec: flame motion unchanged (1000 ms); freeze chip fades in 200 ms after the count lands; sound
  synced to the count, ≤ 40 ms lead [S ITU / H]; native `.sensoryFeedback(.success)` /
  `HapticFeedbackConstants.CONFIRM` at the count.
- Web: `if (isFirstLessonToday) heroSound.play()` inside the CONTINUE handler (the gesture already
  unlocked audio); `<p class="freeze-chip" aria-live="polite">Streak Freeze equipped (free)</p>`.
- Remove: "Watch out!" and "Don't forget tomorrow!" variants.
- Reduced motion / 100th use: count appears without the flame motion; sound + haptic stay. It fires once
  a day, so the 100th time is day 100, which is a milestone anyway.
- Why it works: forgiveness from day 1 keeps the streak a "want to" (engagement-retention, Streaks).
- Never: paid repair as the only escape, night pushes, a crying flame.

## M-04 Say what improved, not "Great job!" · Feel gap (reward ingredient 4/informational) · impact M · effort S
- Now: 9 generic praise strings rotate on correct answers (Excellent!, Nice job!, Great!, Awesome!,
  Nicely done!, Good job!, Correct!, Nice!, Amazing!); the sound is the same file on 40/40 correct
  CHECKs. The next reward (combo threshold, lesson XP) is never named inside the lesson.
- Feels like: pleasant, then wallpaper by lesson 3.
- Benchmark: reward §1.6 (informational feedback raises motivation, self-focused praise can lower it;
  Duolingo's own growth-mindset copy +7.2% D14 [S]).
- Redesign: on specific events, swap the generic line for information: review item fixed ("agua: fixed!
  You missed it earlier"), new word learned ("New word: leche ✓"), combo approaching ("2 more for a
  streak of 5").
- Spec: same banner, same timing; copy only; at most 1 in 3 answers gets informational copy so it
  stays a surprise [H].
- Web/Native: copy table keyed by event type; no motion change.
- Remove: nothing; keep the generic set as the default.
- Reduced motion / 100th use: copy-only; varies by content, so it survives repetition better than praise.
- Why it works: competence feedback (reward §1.6) and the goal gradient (next reward named).
- Never: inflated praise on trivial items or comparisons to other learners in-lesson.

## M-05 Quit with honesty, not tears · Ethics (see F-EXP-01) · impact M · effort S
- Now / Redesign / Never: in F-EXP-01 below. Motion part: X gets a pressed state (`:active{transform:scale(.92);transition:transform 80ms}`)
  and the sheet becomes interruptible (WAAPI animation reversed on a second tap) [H].

## Reward layer
Density: **~30 tier ≥ 1 beats per 12-challenge lesson** (12 tier-2 results, ~15 match dings, 2 combo
interstitials, 1 lesson complete); ≥ 1 tier-2 beat per challenge; bot time 77–82 s per lesson (fast) /
142–164 s (recorded); longest dead stretch inside a lesson = one challenge's think time (human not
measured), 2 challenges after a mistake; longest overall = onboarding: 11 screens, 19 taps, 81 s bot to
the first reward; inside the chain, the ≥ 4 s unskippable Score animation. Benchmark Apple/Revolut runs
not recorded. Full tables: `evidence/experience-director/reward-measurements.md`.

| Action / moment | Frequency | Ack now (measured, after release) | Channels V/H/S | Progress shown | Next reward named | Tier now → target | Red-line tests | Gap → fix |
|---|---|---|---|---|---|---|---|---|
| Choice tap | every tap | 20 ms V, 9 ms S | V · – · S | — | — | 0 → 0 | — | none |
| CHECK correct | ~10/lesson | 29 ms V, 12 ms DOM, 15 ms S | V · – · S | bar + "N IN A ROW" | no | 2 → 2 | pass | M-04 |
| CHECK incorrect | 0–2/lesson | same | V · – · S + heart −1 | item re-queued | — | — | R12 n/a here | M-01 |
| Match pair | ~5/match | 90 ms V (max 170), 15 ms S | V · – · S | pairs grey out | — | 1 → 1 | — | V to ≤ 85 ms |
| Combo 5/10 | 0–2/lesson | 20 ms | V · – · S | colour of bar | no ("2 more to 5") | 3 → 3 | pass | M-04 |
| Lesson complete | per lesson | busy at once; screen 0.66–1.86 s | V · – · S same frame | XP, accuracy, ring | yes (L2) | 3 → 3 | R2 pass | M-02 |
| Score unlock | once | ≥ 4 s, no button | V only | 1 → 2 bar | yes | 4 → 3, skippable | — | M-02 |
| Streak start | daily | ok | V only (no sound) | week row | yes | 3 → 4 on day 1 | **R12 fail (copy)** | M-03 |
| Quest / gems | daily | ok | V only | 10/10 bar | **no**: gems without what they buy | 2 → 2 | R6 pass (guest shop: no money) | Borrow #1 |
| Quit | rare | 81 ms, no pressed | V | — | — | — | **R12 fail** | F-EXP-01 |

Red-line results: R1 n/a · R2 pass · R3 n/a · R4 n/a (chest not opened) · R5 pass · R6 pass on the guest
web surface, UNCERTAIN signed-in/native · R7 n/a · R8 n/a · R9 pass · **R10 fail (narrow)**: the
lesson-1 streak-goal screen has no skip · R11 UNCERTAIN (Legendary offer states no cost) · **R12 fail**:
quit sheet + day-1 streak warnings. No Super/Max upsell seen in 3 chains, hearts-out or the shop.

Top 3 missing micro-rewards: (1) M-03 streak day 1: sound + a free freeze said out loud; (2) gems that
name what they buy + a balance roll (Borrow #1); (3) informational result copy (M-04). Specs above.

## Pull plan
- **Hook trace:** trigger (external: none for a web guest; notification primer is an illustration only,
  no profile) → action (one ~1.5-min lesson, path START +10 XP) → reward (combo, lesson complete, streak,
  quest, gems) → investment (streak 1, path ring, XP, Score 1, quest progress). **Missing link: the
  external trigger and the stored investment.** A guest's progress is unsaved ("Create a profile to save
  your progress"), and nothing reaches the learner tomorrow.
- **Habit-zone gate:** daily lessons, cadence matches the mechanics. Pass.
- **P-01 Tomorrow card** (path top, after the last chain of the day): "Day 2 starts tomorrow · 1 lesson
  keeps it · Freeze ready" · benchmark Duolingo widget / Apple rings (§3.15) · spec: one card, 200 ms fade,
  dismissible · metric D1 return · ethics: no countdown, no guilt.
- **P-02 One profile ask, at the peak, framed as protection:** after the day-1 streak beat, "Save your
  streak: create a free profile", LATER once per day max (now 3/3 lessons) · metric profile creation
  rate per guest · ethics: LATER equal-height, never repeated in-session.
- **P-03 Tomorrow's quest preview** on the quest-complete chip ("Tomorrow: earn 20 XP → chest") · Clash
  appointment, honest (§3.15) · metric D1 · ethics: real quest, no reset tricks.
- **P-04 League unlock named on phone** ("2 more lessons to join Bronze League", already on desktop's
  sidebar, missing on the 390 px path) · §3.17 · metric lessons/day · ethics: small cohorts, opt-out.
- **Share-worthy moment:** the perfect-lesson combo ("11 in a row") on Lesson complete: a 9:16 card with
  the combo count and Score, share optional.

## Borrow & adapt (Apple and Revolut only)
| App · mechanic | As-is fits? why | Our version | Don't copy |
|---|---|---|---|
| Revolut · RevPoints → the next thing | translate: gems already exist, they just don't name a goal | "You earned 5 gems · 505 = 2 Streak Freezes" + one-tap equip; header gem count rolls 500→505 in 400 ms `tabular-nums` · metric freeze equip rate, D7 · effort S | abstract balances, silent expiry, prize draws |
| Revolut · number roll on balances | yes: XP, gems and streak change after every chain | roll header counters after the chain, 300–600 ms ease-out, `aria-live` final value (reward §4) · effort S | rolling money-like numbers to push spend |
| Apple · Pause Rings / forgiving rings | translate: freeze = pause | M-03: 1 free freeze auto-equipped on day 1, "Your streak is protected" · effort S | unpausable streak, paid restores |
| Apple · ring closure for a daily goal | translate: the "5 min/day Casual" goal is chosen in onboarding but never shown closing | a ring around the streak flame in the header closes with one success haptic (native) / 300 ms fill (web) when the daily goal is met · effort M | counting past 100% as pressure |
| Apple · Reduce Motion behaviour | yes | lesson feedback becomes ≤ 150 ms fades under `prefers-reduced-motion`, sound/colour kept · effort S | removing feedback entirely |
| Apple · calm confirmations | yes for exits | the quit sheet as a neutral confirm (F-EXP-01) · effort S | mascot emotion on an exit |

Top 5 ideas (impact × ease): 1 free day-1 freeze said out loud (Apple Pause Rings → M-03) 9 · 2 gems
name what they buy + equip (Revolut RevPoints → Reward layer) 9 · 3 header counters roll (Revolut → M-02) 6 ·
4 reduced-motion lesson feedback (Apple → F-EXP-04) 6 · 5 daily-goal ring closes (Apple rings → P-01) 4. Long version: `borrow-from-apps.md`.

## Emotional journey
- Landing → curious; the cookie sheet covers the CTA first (neutral, equal-weight choice).
- Onboarding (11 screens) → playful, then mildly impatient: 2–3 s of choreography before each answer,
  and "How did you hear about Duolingo?" before any value.
- First challenge → confident (picture + audio, impossible to misread).
- Correct → proud, instantly (+15 ms sound). Combo → rising.
- Mistake → a small sting (red + a heart taken) **worst in-lesson moment**, softened by "Correct
  solution" and the fair review at the end.
- Lesson complete → **the peak** (fanfare, character, count-up).
- Score / streak / goal / quests / gems / profile → afterglow turning into a queue (9 taps); the streak's
  "Watch out!" turns pride into a warning.
- Quit (if they quit) → guilt (teary Duo) **worst overall moment**.
- End → the path with the ring filled and START on the next node: oriented, an honest end.
Fix order: the quit sheet (worst), the first chain (protect the peak), the day-1 streak copy (the end).

## F-EXP-01 [P1] Quitting a lesson shows a teary mascot and "Wait, don't go!"
- User experiences: tapping X mid-lesson raises a sheet with Duo's eyes welling up, "Wait, don't go!
  You'll lose your progress if you quit now", a large blue KEEP LEARNING and END SESSION as a small text
  link.
- Where: J2 lesson → X (`quit-button`) → sheet (`notification-button` / `notification-drawer-no-thanks-button`).
- Evidence: `shots/Q1-quit-sheet.png`, `shots/Q4-sheet-before-end.png` (reproduced in 2 sessions);
  `motion/Q1-quit-open-filmstrip.png`.
- Why it matters: benchmark-apps §5 and §3.14 list "a crying mascot" and guilt as the ethical line;
  reward.md R12 (loss-framed guilt) fails. The factual part ("you'll lose this lesson's progress") is
  honest and useful; the emotional part pressures a user who chose to stop, and the exit is visually
  demoted. Mild in degree (2 taps out, no bonus to stay), but it is exactly the pattern the gate names.
- Fix: neutral Duo, informational copy, two equal-weight buttons: "Leave this lesson? Answers so far
  won't be saved." [Keep going] [Leave]. If feasible, save partial progress and say "Saved up to
  question 3" so the warning disappears.
- Effort: S
- Confidence: high on what is shown; medium on severity (the gate's P1 for a crying mascot is applied
  as written; the orchestrator may calibrate it to P2 given the honest copy and the 2-tap exit).

## F-EXP-02 [P2] The first lesson's reward chain is 9 taps long, with a forced streak-goal pick and a ≥ 4 s unskippable animation
- User experiences: 9 screens between "Lesson Complete!" and the path; the Score animation plays ≥ 4 s
  with no button; the streak goal cannot be skipped (R10, narrow); a white frame flashes for 608 ms.
- Where: J1 lesson 1 → end chain.
- Evidence: `shots/L1-s01.png`…`L1-s09.png`; `motion/L1-s01-tap-CONTINUE-frames/` (no button in any frame
  to 4061 ms); `motion/L1-s01-tap-CONTINUE.json` blankMs 608; I CAN DO IT! disabled until a goal is picked
  (`shots/L1-s05.png`).
- Why it matters: §3.10 "≤ 3 screens, skippable"; the peak decays into a queue on the very session that
  should form the habit; a forced commitment is a game gate before the core service.
- Fix: M-02.
- Effort: M
- Confidence: high (reproduced in 3 phone runs and the desktop run).

## F-EXP-03 [P2] Day-1 streak copy warns instead of protecting; freezes exist but start at 0 and are never mentioned
- User experiences: "But your streak will reset if you don't practice tomorrow. Watch out!" on the first
  streak day; the Streak Freeze is 0/2 equipped and costs 200 gems in the shop.
- Where: J1 end chain → streak screen; Shop.
- Evidence: 4 copy variants across runs (`full-log.txt`, `disc-stdout.txt`), `shots/X2-s04.png`,
  `shots/H-shop-full.png`.
- Why it matters: streak checklist gap ("freeze reachable", "no shame") = P2 per emotional.md /
  engagement-retention Streaks; Duolingo's own published wins came from forgiveness, not threat
  (reward §1.9).
- Fix: M-03.
- Effort: S
- Confidence: high on copy and shop state; medium on whether a freeze auto-equips later (multi-day not
  tested).

## F-EXP-04 [P2] Lesson feedback ignores prefers-reduced-motion
- User experiences: with Reduce Motion on, the result banner still slides (400 ms `clip-path`), the bar
  grows (400 ms `width`), the 200 ms overshoot pop and the 500 ms heart pulse still run, on every answer.
- Where: every CHECK in a lesson.
- Evidence: `motion/L3r-c*-check.json` (12 recordings under `reduce`) list the same animations as
  `L1-c*-check.json`; the chain partly honours it (streak screen 4.0 s → 0.6 s, `L3r-s03-tap-CONTINUE.json`).
  CSS probe inconclusive (21 of 24 stylesheets cross-origin).
- Why it matters: WCAG 2.3.3 (AAA); the most repeated motion in the product is the one not reduced.
  Medium motion, so P2 rather than P1.
- Fix: under `@media (prefers-reduced-motion: reduce)` swap the banner slide for a 150 ms opacity fade,
  set the bar fill to instant + highlight, drop the overshoot; keep colour and sound.
- Effort: S
- Confidence: high.

## F-EXP-05 [P2] The profile ask follows every lesson
- User experiences: "Time to create a profile!" after lesson 1, 2 and 3 of the same session; LATER is the
  secondary button each time.
- Where: end of every chain (`create-profile-later`).
- Evidence: `full-log.txt` L1 s9, L2 s4, L3r s5; desktop D1 s10.
- Why it matters: asks belong after the biggest win, once (engagement-retention Win mapping); repeated
  in-session it is nagging. Not filed as P1 because each ask states a real consequence (a guest's
  progress is unsaved) and LATER is one tap.
- Fix: P-02 (once a day, at the streak peak, framed as protecting the streak).
- Effort: S
- Confidence: high.

## F-EXP-06 [P3] Entering a lesson from the path flashes white and isn't anchored to the node
- Evidence: `motion/P2-tap-start-filmstrip.png` (white frame at +100 ms, blankMs 54; 41 under reduce),
  then a 250 ms fade. Fix: Motion table row "Path START → lesson". Effort S. Confidence high.

## F-EXP-07 [P3] Quitting the very first lesson drops the learner back into the onboarding quiz
- Evidence: END SESSION in lesson 1 → "How much Spanish do you know?" (`shots/Q5-after-end-0.png`,
  `extra-log.txt`). Fix: land on the path with lesson 1 as the START node, keep onboarding answers.
  Effort S. Confidence medium (one run).

## F-EXP-08 [P3] Quit X has no pressed state and the sheet ignores an early close
- Evidence: first pixel 81 ms after release, only from the sheet (`motion/Q1-quit-open.json`); a close
  tap 100 ms into the open did not land (`motion/Q3-quit-interrupt-filmstrip.png`). Fix: M-05. Effort S.
  Confidence medium (the early tap targeted the button's in-flight position).

## Strengths (only real ones, max 3)
- In-lesson acknowledgement is benchmark-grade: answer colour 29 ms and feedback sound 15 ms after release, word audio 9 ms on every choice tap, 0 blank frames in 73 recorded CHECK/CONTINUE transitions.
- Honest busy states: the CONTINUE button turns into loading dots while the lesson saves, and the fanfare lands on the same frame as the result.
- Hearts don't sell: first heart-out in lesson 1 is a free refill, and no Super/Max upsell appeared in 3 chains, the hearts-out path or the shop.

## Answers to the brutal questions
- Moment a user would describe to a friend: the combo ("I got 11 in a row") and Lesson complete.
- Longest stretch without payback: onboarding (19 taps, 81 s bot) before the first reward; in a lesson,
  one challenge; after lesson 1, the ≥ 4 s Score animation.
- Where they don't know what to do: after a wrong answer (which card was right?) and after quitting
  lesson 1 (why the quiz again?).
- What would make them open it tomorrow: a stored, protected investment: a free freeze said out loud,
  one profile ask at the peak, and a tomorrow card.
- 3 changes that would most change the feel: M-02 (first chain to 4 beats), M-03 (day-1 streak with
  sound and a free freeze), F-EXP-01 (honest quit sheet).
- Borrowed mechanic to build first: Revolut-style "gems name what they buy": "505 gems = 2 Streak
  Freezes · Equip", with the header rolling 500 → 505.

## Interaction log (abridged; full logs in `evidence/experience-director/*-log.txt`)
| Step | Action → what happened | Time |
|---|---|---|
| 1 | Landing: REJECT ALL → GET STARTED → /register | hard cut 162 ms |
| 2 | Tap Spanish → /welcome (rig load) | 2–9 s |
| 3 | 11 onboarding screens, 5 picks (YouTube/News…, career, new to Spanish, 5 min/day, from scratch) | 75 s with recording |
| 4 | L1: 12 challenges + 2 review; wrong at #2 and #6; hearts 5 → 3 | 150 s to Lesson complete |
| 5 | L1 chain: 9 taps (streak goal: 7 days) → LATER → /learn | ~45 s recorded |
| 6 | /learn: node ring 1/3, START → popover START +10 XP → L2 | 0.3 s + 0.3 s |
| 7 | L2 perfect: interstitials at 5 and 10 in a row → chain of 3 | 142 s |
| 8 | L3 under reduce: wrong at #3, review, chain of 4 incl. Legendary NO THANKS | 164 s |
| 9 | Quests tab (45 min left, 10/10), Leaderboards ("Complete a lesson to join") | 0.3 s each |
| 10 | Quit test: X → sheet → KEEP LEARNING; early close; END SESSION → onboarding quiz | — |
| 11 | Hearts test: 5 wrong + 1 wrong match pair → 0 → "free refill on us" | — |
| 12 | Shop: Refill Hearts 350 gems, Streak Freeze 200 gems, 0/2 equipped; no money prices | — |
| 13 | Desktop 1440×900 lesson + chain (same timings; sidebar names the league unlock) | 150 s |
