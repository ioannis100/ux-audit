# Verification batch B: ethics gate and reward red lines
Rig: headless Chrome via `evidence/orchestrator/duo.mjs`, 390×844 @2x touch. **Theme forced to light**
(`emulateMediaFeatures prefers-color-scheme: light`) before the first navigation in every run.
Seven fresh guests: A (L1–L3, quit probes in L2/L4), B (L1, tap-to-skip probe), C and D (L1–L3 → Legendary START,
with a guard that aborts every non-GET request), Q0 (quit at challenge 0, then /shop), and three primer guests
(BLOCK / ALLOW / CONTINUE). Guest state was read from the guest's own JWT:
`GET /2017-06-30/users/<id>?fields=streak,gems,shopItems,streakData`.
Evidence: `evidence/verifier-b/` (`main.mjs`, `primer.mjs`, `bundles.mjs`, `main-{A,B,C,D,Q0}-log.txt`,
`primer*-log.txt`, `legendary-bundle-grep.txt`, `shots/`). No email or password was typed, nothing was bought, no trial was started, and no CTA in a purchase drawer was tapped.

## Verdicts
F-ID | verdict | severity (orig → final) | one-line reason | duplicate-of
---|---|---|---|---
F-EXP-01 | CONFIRMED (severity adjusted) | P1 → **P2** | Reproduced twice (A-Q2, A-Q4). The sheet shows a teary Duo with "Wait, don't go! You'll lose your progress if you quit now", a filled 358×50 KEEP LEARNING and a 125×48 text-link END SESSION. The loss it states is true: END SESSION lands on /learn with the node still at START. The sheet only appears once there is progress to lose (quit at challenge 0 skips it, Q0). The decline label is neutral, the exit is 2 taps with no bonus and no second confirm. It is emotional pressure, not confirmshaming. See the reasoning below. | —
F-EXP-03 | CONFIRMED on copy, REJECTED on the freeze premise | P2 → P2 | The 0/2 freeze count holds only before lesson 1. All 4 guests get 2 free freezes the moment lesson 1 completes (`shopItems: streak_freeze qty 2, purchasePrice 0`, purchaseDate = the Lesson Complete second), about 7 s before the streak screen. ED's 0/2 shop read came from a streak-0 guest (`hearts-log.txt` header "0 / 500"). The fix "auto-equip 1 free freeze" already exists. The real gap is saying so. | F-FIRST-TIMER-02
F-FIRST-TIMER-02 | CONFIRMED | P2 → P2 | Settled with 4/4 fresh guests. API before L1: `shopItems: []`, /shop "0 / 2" (Q0). At the streak screen and after it: 2 equipped, granted free. 5 copy variants were seen and every one says or implies a missed day resets the streak. That is untrue by the shop's own definition ("remain in place for one full day of inactivity"). Loss-framed and inaccurate, but no guilt or shaming, and nothing paid is at stake, so it is a P2 streak-checklist gap rather than a red R12. Residual: a multi-day guest run would prove the freeze actually fires. | — (primary)
F-EXP-02 | CONFIRMED | P2 → P2 | 9 taps from Lesson Complete to /learn (A, B, C, D). The Score unlock offers its first tappable control 4.1 s after the CONTINUE tap (A 4125 ms; B 4111 ms even with a mid-screen tap at +409 ms, so tapping does not skip it). The streak-goal screen's only controls are 4 goal tiles and a disabled I CAN DO IT, with no close, skip or back (4/4). **R10 is misapplied.** The core service (the lesson) was already delivered, and the pledge has no prize, terms or spend. It is a forced commitment, i.e. a missing skip, and belongs to this chain-length P2, not to a red line. | —
F-FIRST-TIMER-01 | CONFIRMED | P2 → P2 | Same root cause and same sequence as F-EXP-02. Merge them, keeping FT-01's "show the 6 words learned" point. | F-EXP-02
F-FIRST-TIMER-05 | CONFIRMED on placement, REJECTED as deceptive | P2 → P2 | The drawn BLOCK is a real button (`block-button`) that advances **without** calling `requestPermission` (primer-log). The drawn ALLOW and the CONTINUE button each call it once, and on "denied" the flow continues with no re-ask. Every button does what its label says, and nothing is granted without the real browser prompt. That makes it a standard soft-ask primer, not a dark pattern. Correct the finding's "the only exit, CONTINUE" (BLOCK is a no-ask exit). What remains P2: the ask comes before any value, and the primary CONTINUE defaults to the real prompt. | —
F-EXP-05 | CONFIRMED | P2 → P2 | "Time to create a profile!" after every completed lesson: A L1/L2/L3, B L1, C L1, D L1/L2. New detail: for a guest, Legendary START +40 XP opens the same ask as a modal (D). It is nagging by repetition, but it comes at end-of-lesson breaks, LATER is one tap, and the stated reason is true (guest progress unsaved). Not P1. | —
Red lines (ED) R5 | CONFIRMED pass | — | Each chain ends on /learn, and the next lesson needs a node tap plus START (no auto-start). Lesson Complete summarises XP and accuracy. The quit sheet carries no offer. The Legendary "play more" screen has a full-width NO THANKS. | —
Red lines (ED) R6 | CONFIRMED pass (guest web) | — | /shop lists only gem prices (Refill Hearts 350, Streak Freeze 200). There is no currency symbol in the /shop body text and no gems-for-money item (A, B, C, D, Q0). Signed-in and native stay UNCERTAIN. | —
Red lines (ED) R11 | UNCERTAIN → pass on guest web; amber, signed-in untested | — | The offer reads "Prove you're a legend / Complete this extra-hard challenge… / START +40 XP / NO THANKS", with no cost shown. For a guest, START opens the profile modal and nothing is spent (the guard blocked only `excess.duolingo.com/batch` telemetry POSTs). The web bundle (`4800-*.js`, `LEGENDARY_WITH_GEMS`) shows that signed-in free users instead get a drawer: "Single challenge" priced in gems plus a Super "Unlimited challenges" CTA. So the cost appears after START but before any spend. That is drip disclosure of a virtual cost, amber rather than red. A signed-in run would settle it. | —

## Reasoning for the calibration ask: F-EXP-01 at P2, not P1
- **Not confirmshaming.** Brignull's test is whether the *decline option* shames the user ("No thanks, I don't want to learn"). Here the decline reads "END SESSION", which is neutral.
- **Not a false or inflated loss.** The stated consequence is accurate and proportionate: one lesson's partial answers. The sheet is suppressed when there is nothing to lose (Q0). R12's target is "you'll lose everything" when that is untrue or out of proportion.
- **What is manipulative is the tears.** "Wait, don't go!" plus a crying mascot is an emotional appeal laid on top of an honest warning, and the exit is visually demoted (filled button vs text link). It fails the reflection test mildly. Users would keep the warning but not the guilt.
- **User cost.** At most a few seconds, or finishing a free lesson the user had already started. Exit is 2 taps, with no bonus to stay, no loop, no money and no data. Luguri & Strahilevitz's "mild ≠ lower severity" result concerns consent to a paid plan. It does not transfer to an in-session exit with no downstream cost.
- **Proposed rule for `reward.md` R12 / `emotional.md`:** a mascot or emotional appeal on an exit is **P2** when the stated loss is true and proportionate, the decline label is neutral, and the exit is ≤ 2 taps. It is **P1** when any of these holds: the loss is false or inflated, the decline label shames, the guilt reaches outside the session (pushes, emails), or it gates money, cancellation or data.

## Freeze conflict, settled
| Guest | Before L1 (API) | At streak screen (API) | /shop after L1 | Streak copy seen |
|---|---|---|---|---|
| A | `shopItems: []`, streak 0, gems 500 | streak_freeze ×2, price 0, granted 20:46:21 UTC (Lesson Complete 20:46:22) | 2 / 2 EQUIPPED | "Practicing daily grows your streak, but skipping a day resets it!" (L1), "Tip: Your streak will reset if you don't practice tomorrow. Watch out!" (L2) |
| B | `[]` | ×2, price 0, granted 20:48:48 (LC 20:48:49) | 2 / 2 EQUIPPED | "Practice each day so your streak won't reset!" |
| C | `[]` | ×2, price 0 | 2 / 2 EQUIPPED | "But your streak will reset if you don't practice tomorrow. Watch out!" |
| D | `[]` | ×2 | (not read) | L1 as in A; L2 "Tip: Skipping a day resets your streak. Don't forget tomorrow!" |
| Q0 (no lesson) | `[]` | — | **0 / 2**, GET FOR 200 | — |

The grant happens on completing lesson 1 and does not vary by variant: it held in 4/4 guests. Both auditors described real states. ED's was the pre-lesson one.

## New observation (not filed; for the orchestrator)
- [P3] For a guest, the Legendary offer's START +40 XP leads straight to a sign-up modal, and the offer never says so (`shots/D-L3-legendary-after-start.png`). Honest copy would be "Create a profile to try Legendary".
