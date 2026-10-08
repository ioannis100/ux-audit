# Duolingo web: reward-layer measurements [O]

Run: 2026-10-08, guest learner, Spanish from scratch, light theme forced
(`prefers-color-scheme: light`), 390×844 @2x touch emulation (desktop pass 1440×900 for the CHECK
values marked D). 3 lessons in a row as the same guest (L1: 2 deliberate mistakes; L2: no mistakes;
L3: 1 deliberate mistake, run under `prefers-reduced-motion: reduce`), plus a quit test, a
hearts-to-zero test, a desktop lesson and 3 fast discovery lessons (X1–X3) for pacing.
Scripts: `full.mjs`, `quit.mjs`, `extra.mjs`, `desktop.mjs`, `disc.mjs` (all in this folder; helpers in
`lib.mjs`, `play.mjs`). Raw per-action JSON + filmstrips: `motion/`, `motion-onboarding/`.

## Method (read before quoting any number)

| What | How it was measured | Precision / caveat |
|---|---|---|
| Tap time | In-page `pointerdown` and `pointerup` listeners (capture phase, `performance.now()`). The synthetic tap is mouse-down, **50 ms hold**, mouse-up; Duolingo acts on click (release), so latencies below are **from pointer-up** unless marked "from down". | exact to 1 ms in page clock |
| First DOM change | rAF poll for the result banner (`[data-test~=blame-correct/incorrect]`), header text, CHECK/CONTINUE label | one frame (≤ 16.7 ms) |
| First pixel | CDP screencast frame timestamps vs the tap (`lib.mjs rec()`, analysed with the skill's `scripts/lib/motion-analysis.mjs`) | frame-quantised (~16–33 ms); headless Chrome, SwiftShader GL, CPU 1× (a mid phone is slower) |
| Sound | Hooked `HTMLMediaElement.prototype.play` and `AudioBufferSourceNode.prototype.start` (`duo.mjs`) | the **call** time; real audio output latency on a device (tens of ms) is not included |
| Vibrate | Hooked `navigator.vibrate` | 0 calls everywhere. Desktop Chrome with mobile emulation, not an Android UA: says nothing about Android Chrome or the native app |
| Animations | `document.getAnimations()` logged every frame (name, duration, easing, target) | CSS/WAAPI only; Rive/canvas/JS-driven motion is visible in frames but not listed |
| Durations | Bot time, wall clock. Recorded runs include ~0.5 s pre-roll + 1–4 s recording per action. Fast runs (X1–X3) use ~1.5 s waits | **not human pacing**; human think time was not measured |

Headless caveats: route loads (`/register` → `/welcome`, `/welcome` → `/lesson`) take 2–8 s headless
(brief: rig, not the user's network); load-dependent numbers are excluded from scores. No haptics,
no notifications, no multi-day behaviour, no native app.

## 1. Acknowledgement latency per action (phone unless D)

| Action | n | Pressed / first pixel (from down) | First result pixel after release | DOM result after release | Sound after release | Vibrate | Settled (from down) |
|---|---|---|---|---|---|---|---|
| Choice tap (select / assist) | 18 | median 20 ms (15–33) | median 20 ms (14–33) selected state | — | **median 9 ms** (5–19): the word's voice clip | 0 | median 74 ms |
| Word-bank token tap | 9 | median 31 ms (18–33) | — | — | voice clip | 0 | 31 ms |
| **CHECK → result** (correct + incorrect, L1+L2) | 21 | median 24 ms (9–36) button press | **median 29 ms** (23–41) answer colour | **median 12 ms** (7–20) banner in DOM | **median 15 ms** (10–22) feedback mp3 | 0 | median 626 ms (266–2246) |
| CHECK → result, reduced motion (L3) | 12 | 29 ms | 31 ms | 13 ms | 16 ms | 0 | 632 ms |
| CHECK → result, desktop 1440×900 (D) | 11 | 17–73 ms | — | 11–16 ms | 14–18 ms | 0 | — |
| Match: second token of a pair | 10 | median 46 ms | median 90 ms (20–170) pair greys out | 13 ms (last pair: banner) | **median 15 ms** (6–28): word + `Match_Correct_A_A_01.mp3` | 0 | ~409 ms |
| Match: wrong pair | 1 | — | — | — | 17 ms: `Match_Incorrect.mp3` (+ heart −1) | 0 | — |
| CONTINUE → next challenge | 26 | median 16 ms | median 34 ms (22–48) | header swap ~12 ms | — | 0 | median 482 ms |
| Onboarding option pick | 5 | median 27 ms | median 25 ms | — | none | 0 | 0.38–0.99 s |
| Onboarding CONTINUE | 11 | median 32 ms | median 31 ms (3-dot busy state in the button) | — | none (1 of 11: Duo voice at +1.78 s) | 0 | 1.35–3.07 s (owl bubble types in, options fade in) |
| Last CONTINUE → **Lesson complete** | 3 | 22–32 ms (button → 3-dot loader, 1200 ms loop) | screen at **656–1858 ms** (L3, L2, L1) | same frame as sound | **fanfare in the same frame as the screen** (657 / 713 / 1860 ms) | 0 | +1.9 s after the swap (character + XP count-up) |
| Combo interstitial ("Cool! 5 in a row!") | 2 | 20 ms | — | — | 19 ms (`…069e7df74511`) | 0 | 731 ms |
| Quit X → sheet | 1 | **no pressed state**; first pixel 136 ms from down = **81 ms after release** | — | — | none | 0 | 502 ms |

Ingredient 1 thresholds from `reward.md` (visual ≤ 85 ms, sound ≤ 70 ms): **every in-lesson action passes
with margin**; the only miss is the quit X (no pressed state, 81 ms after release).
Channel sync (ingredient 2): sound vs DOM result on CHECK differs by 2–4 ms; pixel lags DOM by one
frame. No haptic channel on web.

## 2. The reward ladder actually used

| Moment | Frequency | What fires (V / S / H) | Tier now |
|---|---|---|---|
| Choice / token tap | every tap | selected state + the word spoken (S is content, not reward) | 0 |
| **Correct answer** | ~9–11 per lesson | answer card turns green (~29 ms), green banner slides up (`clip-path` 400 ms `ease`), progress bar grows (`width` 400 ms `ease`) with a glint, 200 ms pop `cubic-bezier(.35,1.8,.35,.83)`, sparkle on the card; one fixed "correct" mp3 (the same file on 40 of 40 recorded correct CHECKs, phone + desktop); rotating praise copy (9 variants seen: Great job!, Nice!, Good job!, Nicely done!, Correct!, Excellent!, Amazing!, Awesome!, Great!) | 2 |
| Combo | from the 2nd correct in a row | "N IN A ROW" label above the bar (2…11 seen); bar turns orange/yellow from 5 | 1 → 2 |
| Combo milestone | at 5 and 10 in a row (L2: both) | full interstitial: Duo slides in, sound, copy ("Cool! 5 in a row!", "Outstanding! 10 in a row!", "You're the best!", "Super impressive!", "I'm so proud of you!") | 3 |
| Mistake | each wrong answer | red banner "Correct solution: agua", distinct mp3, heart −1 with a 500 ms pulse on the heart; wrong item re-queued at the end ("Let's review the exercises you missed!", tagged PREVIOUS MISTAKE) | — (informational + a loss) |
| First mistake ever | once | modal "Each mistake costs 1 heart! Stay sharp and focused to keep your hearts. You got this!" | — |
| Hearts at 0 | once (lesson 1, guest) | modal "You ran out of hearts. Have a free refill on us to keep going!" REFILL FOR FREE; no Super / paywall | — |
| Encouragement | 1–2 per lesson | Duo + one line ("Keep going! Practice makes perfect.", "You're getting good at this!") | 1 |
| **Lesson complete** | every lesson | busy dots → fanfare + character animation + "Lesson Complete!" + XP / accuracy or combo card counting up | 3 |
| Score unlocked | first lesson only (+ a progress beat on L3) | ≥ 4 s Duo hop animation with no button, then "You unlocked your Duolingo Spanish Score!" 1 → progress bar 1–2; **no sound** | 4 (first-ever) |
| **Streak start** | first lesson of the day | flame + "1 day streak", week row Th–M, 1000 ms transforms; **no sound**; copy rotates (4 variants seen, 2 warnings: "But your streak will reset if you don't practice tomorrow. Watch out!", "Tip: Skipping a day resets your streak. Don't forget tomorrow!") | 3–4 |
| Streak goal | first lesson | forced choice 7/14/30/50 days (I CAN DO IT! disabled until one is picked; no skip), then "You'll be 2x more likely to complete the course!" | ask, not reward |
| Daily quest | first lesson of the day | "All Daily Quests complete! Earn 10 XP 10/10" bar fill (`width` 400 ms) | 2 |
| Gems | first lesson of the day | "You earned 5 gems! Nice job reaching your daily goal!" chest art; **no sound; header balance does not roll** | 2 |
| Same-day lesson 2 | — | Lesson complete → "Day 2 of your streak starts tomorrow!" / "Come back tomorrow for streak day 2!" | 2 |
| Legendary offer | after L3 (unit node complete) | "Prove you're a legend… START +40 XP / NO THANKS" (cost not stated on this screen; not tapped) | offer |
| Path return | after every chain | node's progress ring fills (`1500 ms ease`), START bubble on the next node, chest 3 nodes ahead | 1 |
| Milestones (7/30/100…) | — | not reachable in one day | not recorded |

## 3. Reward density

| Lesson | Challenges (incl. review) | Tier-2 result beats | Tier-1 beats | Tier-3+ beats | Bot time first challenge → Lesson complete | Longest stretch with no tier ≥ 1 beat |
|---|---|---|---|---|---|---|
| L1 (2 mistakes) | 14 | 12 (10 correct + 2 match completions) | 10 match-pair dings, 8 combo labels | 1 in lesson (Lesson complete) + chain: Score unlock, streak start, quest, gems (4) | 150 s recorded | 2 challenges (a wrong answer gives no reward) |
| L2 (perfect) | 12 | 12 (9 + 3 matches) | 15 pair dings, 10 combo labels | 2 combo interstitials + Lesson complete + streak "day 2" | 142 s recorded | 1 challenge |
| L3 (1 mistake, reduced motion) | 14 | 13 | ~10 pair dings, 9 combo labels | 1 interstitial + Lesson complete + Score progress | 164 s recorded | 2 challenges |
| X1–X3 (fast, perfect) | 12 / 11 / 11 | — | — | — | **82 s / 77 s / 77 s** | — |

- Beats per lesson (tier ≥ 1, in-lesson only): **~30 in a 12-challenge perfect lesson** (12 tier-2 +
  15 tier-1 dings + 2 tier-3 combos + 1 lesson complete), i.e. **≥ 1 tier-2 beat per challenge**.
- Longest dead stretch **inside** a lesson = one challenge's think time (app-imposed minimum between
  two result beats: CONTINUE transition 0.48 s + the next answer). Bot gap median 9.8–10.7 s recorded,
  ~6.5 s fast; human pacing **not measured**.
- Longest dead stretch **overall**: first run, GET STARTED → first correct answer = 11 onboarding
  screens, 19 taps, **81 s** bot time with recording (36 s with the fast helper), with no tier ≥ 1
  reward (progress bar and Duo's speech only).
- Dead stretch inside the reward chain: Score unlock plays **≥ 4.06 s** with no button visible in any
  frame (`motion/L1-s01-tap-CONTINUE-frames/`).
- Chain length after the lesson: **L1 9 taps** (complete, Score, Score progress, streak, streak goal ×2,
  quests, gems, profile), **L2 3**, **L3 4**. Fast bot: 22 s for L1's chain.
- Benchmark run: Duolingo is the benchmark; Apple/Revolut runs **not recorded**.

## 4. Five ingredients per repeated action and result moment

| Action / moment | 1 Ack ≤ 85 ms V / ≤ 70 ms S | 2 Channels in sync | 3 Progress visible | 4 Next reward named | 5 Earned surprise | 100th use |
|---|---|---|---|---|---|---|
| Choice tap | pass (20 / 9 ms) | pass | n/a | n/a | n/a | yes (tiny, content audio) |
| CHECK correct | pass (29 / 15 ms) | pass (S–DOM 2–4 ms; no H on web) | pass (bar + combo label) | **partial**: the next combo threshold and the lesson's XP are not shown during the lesson | pass (combo interstitial at 5/10, bar colour change) | mostly: copy varies, sound identical 40/40; praise is generic, not informational |
| CHECK incorrect | pass | pass | pass (item re-queued, review is announced) | n/a | n/a | the heart loss repeats every time |
| Match pair | pass for sound (15 ms); visual 90 ms median, max 170 ms (over 85 ms) | partial | pass (pairs grey out) | n/a | n/a | yes |
| Lesson complete | busy cue at once, result 0.66–1.86 s (network) | pass (fanfare same frame) | pass (XP, accuracy/combo; path ring fills after) | pass (L2: "Day 2 of your streak starts tomorrow"; path START +10 XP) | pass first time (Score unlock), none on L2/L3 | L1 chain of 9 taps will not survive repetition; L2/L3 chains of 3–4 do |
| Streak start | pass | **visual only, no sound** | pass (week row) | pass ("Day 2 starts tomorrow") | n/a | loss-framed copy on 2/4 variants |
| Quest / gems | pass | visual only | pass (10/10 bar) | **fail**: gems shown without what they buy; header balance doesn't roll | — | — |

## 5. Red-line tests R1–R12 (reward.md §7)

| # | Result | Evidence |
|---|---|---|
| R1 near-miss | n/a | no random reveal in 3 lessons + hearts-out; path chest not opened |
| R2 loss as win | **pass** | every celebration (lesson, combo, quests, gems, streak) has net value ≥ 0; nothing paid |
| R3 celebrating spending | n/a | no spend flow reached; guest shop sells nothing for money |
| R4 paid randomness | n/a (not reachable) | no random reward seen; chest contents not tested |
| R5 stopping cues | **pass** | each lesson has a fixed end, the chain ends on the path, the next lesson never auto-starts; quests say "Quests refresh every day" |
| R6 credits hide money | **pass on this surface / UNCERTAIN elsewhere** | 500–505 gems shown with no money value, but the guest web shop (`shots/H-shop-full.png`) sells only Refill Hearts 350 gems and Streak Freeze 200 gems, no gems for money. Signed-in / native gem purchases not tested |
| R7 speed-ups on money | n/a | no money action |
| R8 fake control | n/a | no chance element |
| R9 sticky exits | **pass** | quit = 2 taps (X, END SESSION), no bonus to stay. See R12 for the copy |
| R10 forced gamification | **fail (narrow)** | after lesson 1 the streak-goal screen has no skip: I CAN DO IT! stays disabled until a 7/14/30/50-day goal is picked (`shots/L1-s05.png`, `L1-s06.png`); lessons themselves are usable without the game layer |
| R11 opaque bonus conditions | UNCERTAIN | "Prove you're a legend… START +40 XP" shows no cost or condition (`shots/L3r-s04.png`); not tapped (could start a gem/Super flow) |
| R12 loss-framed guilt | **fail** | quit sheet: Duo with teary eyes + "Wait, don't go! You'll lose your progress if you quit now", KEEP LEARNING as the big button, END SESSION as a text link (`shots/Q1-quit-sheet.png`); streak screen warnings "…Watch out!" on day 1 (2 of 4 variants). No guilt pushes tested (out of scope) |

Hearts / paywall pressure: 1 heart per mistake (also per wrong match pair), hearts carry over between
lessons (5 → 3 after L1, still 3 before L2, 2 after L3), at 0 a **free** refill in lesson 1. No Super /
Max upsell appeared anywhere in 3 lessons, 3 chains, the hearts-out path or the shop (0 of 3 chains
had an upsell between reward screens). Streak Freeze: **0 / 2 equipped** for a new guest, 200 gems, not
mentioned on the streak screen.
