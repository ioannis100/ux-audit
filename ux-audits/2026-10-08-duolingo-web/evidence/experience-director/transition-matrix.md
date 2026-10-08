# Duolingo web: transition matrix (experience-director)

Light theme forced, 390×844 @2x touch unless noted. Two capture paths:
- `scripts/capture-motion.mjs motion.json` (fresh context per capture, `alsoReduced: true`) for the
  landing routes → `motion-cm/` (note: this script cannot force light mode, so `/welcome` there renders
  dark; the rig's inherited dark mode).
- In-session recordings with the same analysis lib (`lib.mjs rec()` → CDP screencast +
  `motion-analysis.mjs`) for everything after onboarding, because lesson states need a live guest
  session (~36 s to reach) → `motion/`, `motion-onboarding/`. L3 was played under
  `prefers-reduced-motion: reduce` for the reduced column.

Times are from pointer-down (the synthetic tap holds 50 ms; "after release" = minus ~50 ms).
Headless SwiftShader, CPU 1×; route loads are rig-slow (brief).

| # | From → to | Trigger | First change | Settled | Hard cut | Blank | Anchored | Easing (CSS / measured) | Interruptible | Reduced motion | Score /10 | Benchmark § | Evidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Landing → /register | GET STARTED | 20 ms (press) | 162 ms | **yes** @145–162 | 0 | no | none (page swap) | n/a | identical cut (`motion-cm/…-reduced.json`) | 3 | route change (motion.md), §3.6 | `motion/t01-landing-to-register*`, `motion-cm/landing-getstarted-to-register*` |
| 2 | /register → /welcome | tap Spanish | 92 ms (cookie banner) | 9 s headless | yes @168, @2832 | 383 ms | no | course grid replaced by a 3-dot loader, then cut | n/a | same cut, 201 ms blank | 3 (rig-inflated; not scored as a finding) | §3.8 waits | `motion-cm/register-tap-spanish-to-welcome*` |
| 3 | Onboarding option pick | tap option | ~25 ms after release | 0.38–0.99 s | no | 0 | yes (in place) | selected state, CSS `ease` | — | not tested | 8 | §3.3 | `motion-onboarding/*-pick*` |
| 4 | Onboarding screen → screen (×11) | CONTINUE | 1–34 ms | **1.35–3.07 s** | no | 0 | **yes**: Duo stays, progress bar grows, bubble retypes | button → 3-dot busy (1200 ms loop) on saves; options fade out/in, `ease` 300–700 ms | — | not tested | 7 (clear, but 2–3 s of choreography before each answer) | §3.2 | `motion-onboarding/*-continue*` |
| 5 | Last onboarding screen → /lesson | CONTINUE | 33 ms | 3.06 s | no | **1538 ms white** then LOADING owl + tip | no | — | n/a | n/a | 4 (rig-inflated load; loader content is honest) | §3.8 | `motion-onboarding/t-ob10-choosePath-continue*` |
| 6 | Challenge: choice tap → selected | tap | 20 ms | 74 ms | no | 0 | yes | instant | n/a | n/a | 9 | §3.3 | `motion/L*-c*-choice-tap*` |
| 7 | **CHECK → correct banner** | CHECK | 24 ms press; colour 29 ms after release | median 626 ms | no | 0 | yes (banner rises from the button area; colour on the tapped card) | banner `clip-path` 400 ms `ease`; progress `width` 400 ms `ease` (layout property); pop 200 ms `cubic-bezier(.35,1.8,.35,.83)` | n/a | **same 4 animations under reduce** (`L3r-c*-check.json`) | 8 | §3.10 effort success (in-task), habit recipe | `motion/L1-c00-check-filmstrip.png` |
| 8 | **CHECK → incorrect banner** | CHECK | same | 270–1607 ms | no | 0 | partial: the wrong card stays blue, the right card is **not** highlighted | as 7 + heart pulse 500 ms `ease` | n/a | same under reduce | 7 | §3.11 | `motion/L1-c02-check-filmstrip.png` |
| 9 | CONTINUE → next challenge | CONTINUE | 16 ms; 34 ms after release | median 482 ms | no | 0 | in place | `opacity` + `transform` 400 ms `ease-out` | n/a | same under reduce | 8 | §3.7 | `motion/L*-c*-continue*` |
| 10 | Match pair | 2nd token | 46 ms | ~409 ms | no | 0 | yes | 100 ms press `linear`, 150–180 ms fades | n/a | n/a | 7 (visual 90 ms median after release, max 170) | §3.4 | `motion/L*-c*-match-pair*` |
| 11 | Challenge → combo interstitial ("5 in a row!") | CONTINUE | 20 ms | 731 ms | no | 0 | Duo slides in from the left edge | 400 ms `ease-out` + 1800 ms `ease-out` | n/a | not observed under reduce (L3 had an encouragement screen: 470 ms) | 8 | §3.10 | `motion/L2-s00-tap-CONTINUE*` |
| 12 | Last challenge → **Lesson complete** | CONTINUE | 22–32 ms (button → 3-dot loader) | screen at 656–1858 ms, settles +1.9 s | swap, not a cut over blank | 0 | no (full-screen replace) | character + XP count-up; fanfare in the same frame | n/a | under reduce the same loader (40 anims) and swap | 7 | §3.10 | `motion/L1-c13-continue*`, `L2-c11-continue*`, `L3r-c13-continue*` |
| 13 | Lesson complete → Score unlocked (L1) | CONTINUE | 24 ms | 4.06 s+ | no | **608 ms white frame** | no | Duo hop animation ≥ 4 s, **no button visible** in any frame | not skippable observed | L3 (reduce): still 3.5 s of segments, 64 ms blank | 4 | §3.10 "≤ 3 screens, skippable" | `motion/L1-s01-tap-CONTINUE-frames/` |
| 14 | Score → Score progress → Streak | CONTINUE | 18 ms | 4.0 s | no | 0 | no | flame `transform` 1000 ms `cubic-bezier(0.74,0,0.11,…)`, opacity 133–300 ms `linear`; **no sound** | n/a | reduce: 616 ms, **hard cut** (the reduced variant exists here) | 7 | §3.14 | `motion/L1-s03-tap-CONTINUE*`, `L3r-s03-tap-CONTINUE*` |
| 15 | Streak → goal → quests → gems → profile | CONTINUE / pick | 1–30 ms | 0.15–1.65 s each | no | 0 | no | quest bar `width` 400 ms `ease` | n/a | — | 6 (each fine; 9 taps in total) | §3.10 | `motion/L1-s0[4-8]*` |
| 16 | Profile LATER → /learn | LATER | 12 ms | ~0.94 s to path, 4.1 s with ring | no | 0 | partly: the node's progress ring fills 1500 ms `ease` | header shell at 470 ms, then path | n/a | same under reduce (23 anims) | 7 | §3.12 | `motion/L1-s09-tap-LATER-filmstrip.png` |
| 17 | Path node → popover | tap node | 10 ms | 394 ms | no | 0 | **yes** (popover from the node) | 300 ms `ease` | — | same | 8 | §3.6 | `motion/P2-tap-path-node*` |
| 18 | Popover START → lesson | START | 24 ms | 302 ms | no | **54 ms white** (41 under reduce) | **no** (white frame, then a fade) | 250 ms `ease` | n/a | same | 5 | §3.6 shared element | `motion/P2-tap-start-filmstrip.png` |
| 19 | Learn → Quests / Leaderboards tab | tab | 31 / 81 ms | 340 / 317 ms | no / near-cut | 96 ms / 0 | no indicator motion | none | n/a | — | 5 | §3.7 tab switch | `motion/J3-tab-*` |
| 20 | Quests → Learn tab | tab | 114 ms | 2.4 s | no | 0 | path rebuilds with ring animation | 1500 ms `ease` | n/a | — | 6 | §3.7 | `motion/J3-tab-Learn*` |
| 21 | Lesson → quit sheet | X | **136 ms (no pressed state; 81 ms after release)** | 502 ms | no | 0 | yes (bottom sheet + scrim) | sheet 400 ms `ease-in-out`, scrim 300 ms `ease` | **no**: a close tap 100 ms into the open did not land; the sheet finished opening and stayed (`Q3`) | not tested | 6 | §3.6 sheets | `motion/Q1-quit-open*`, `Q3-quit-interrupt-filmstrip.png` |
| 22 | Quit sheet → back to lesson | KEEP LEARNING | 29 ms | 423 ms | no | 0 | yes | 400 ms `ease-in-out` (exit = entrance length) | — | — | 7 | §3.6 | `motion/Q2-quit-keep-learning*` |
| 23 | Quit sheet → END SESSION (first-ever lesson) | END SESSION | 109 ms | 4.7 s | no | 0 | no | lands back on the onboarding question "How much Spanish do you know?" | — | — | 4 (clarity: you quit a lesson and get a quiz) | §3.11 | `motion/Q4-quit-end-session*`, `shots/Q5-after-end-0.png` |
| 24 | Desktop CHECK → banner (1440×900) | CHECK | 17–73 ms | — | no | 0 | yes | same set + `_3qS6D` 400 ms | — | — | 8 | §3.10 | `motion/D1-c*-check*` |

## Headline
- **Hard cuts:** 2 between core screens (landing → register; register → welcome, rig-affected), plus a
  hard cut in the reduced-motion streak variant (acceptable there).
- **Blank gaps:** 608 ms white frame Lesson complete → Score (L1), 54 ms white frame path → lesson,
  96 ms on the Quests tab, and rig-inflated route loads (383 ms, 1538 ms).
- **Worst 3:** (13) the ≥ 4 s unskippable Score unlock after the first lesson; (18) path START → lesson
  through a white frame, unanchored; (21) quit X with no pressed state and a sheet that ignores an
  early close.
- **Best:** (6)(7)(9) the in-lesson loop: acknowledgement in 1–2 frames, sound 15 ms after release,
  400 ms banner, no blank frames across 60+ recorded challenge transitions.
- **Reduced motion:** ignored inside lessons (identical `getAnimations()` sets under reduce);
  partially honoured in the post-lesson chain (streak screen 4.0 s → 0.6 s).
