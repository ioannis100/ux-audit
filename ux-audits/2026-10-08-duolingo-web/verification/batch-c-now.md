# Verification batch C: "Now" evidence of M-01..M-05, reward measurements, first-run findings

Rig: headless Chrome (puppeteer-core, SwiftShader), 390×844 @2x touch, **light theme forced**
(`prefers-color-scheme: light` before navigation). Four fresh guests, no credentials typed:
- `v-lessons.mjs`: onboarding (first option on each screen; reason "Support my education", goal 5 min), then
  L1 (one deliberate miss at c2) and L2 (no misses) as the same guest.
- `v-variant.mjs`: reason "Prepare for travel", goal 20 min, L1 with no misses, every frame kept (`FRAMES=1`), then /shop.
- `v-quit.mjs`: quit lesson 1 after one answer, then END SESSION, then a return visit.
- `v-quitmotion.mjs`: the quit X held for 150 ms, then an early close.

One Lighthouse mobile run. Everything is in `evidence/verifier/`: logs `v-*-log.txt`, per-action JSON and
filmstrips in `motion/`, screenshots in `shots/`, `green-frames.mjs` (colour-based frame read),
`lh-landing-mobile-verify.json`.

`F-ID | verdict | severity (orig → final) | one-line reason | duplicate-of`

## Redesign "Now" claims
- M-01 | CONFIRMED | impact M (unchanged) | After a wrong pick (V1-c02, "water"), the tapped papá card stays blue. The right card (the bottle) is unchanged, and at 390×844 its label "agua" sits under the red banner, so the learner gets only the banner word (`shots/V1-c02-result-incorrect.png`). | —
- M-02 | CONFIRMED | impact H (unchanged) | 9 taps from Lesson complete to the path in 2 of 2 first lessons (V1, VV), in the stated order. The white gap after Lesson complete measured 605 ms (theirs 608). The Score animation still had no button at +4.2 s (`motion/V1-s02-tap-CONTINUE-filmstrip.png`). On the streak goal screen, I CAN DO IT! is the only button and it stays disabled until a goal is picked (no skip). | —
- M-03a (silent, warning copy) | CONFIRMED | impact H | No sound when the streak screen arrives (`V1-s04-tap-CONTINUE` sounds: none). All 3 day-1 copies I saw are reset warnings: "Practice each day so your streak won't reset!", "But your streak will reset if you don't practice tomorrow. Watch out!", "Tip: Skipping a day resets your streak. Don't forget tomorrow!". That is 3 of 3, worse than the 2 of 4 reported. | —
- M-03b ("a new guest has 0/2 Streak Freezes") | REJECTED | — | This holds only before the first lesson is completed. Their /shop read came from the hearts-test guest with streak 0 (`hearts-log.txt`: "0 / 2 EQUIPPED"). My guest, right after lesson 1 (streak 1, 505 gems, nothing bought), shows **"2 / 2 EQUIPPED"** (`shots/VV-shop.png`). So the proposed fix (auto-equip 1 free freeze) is already in the product, with 2. What is really wrong: the streak screen never mentions the 2 equipped freezes, so "your streak will reset if you don't practice tomorrow" is false for this learner. The fix should be "say the 2 freezes are equipped" and drop the auto-equip proposal. | —
- M-04 | CONFIRMED | impact M (unchanged) | 29 of 29 correct CHECKs across 3 lessons played the same file, `37d8f0b39dcfe63872192c89653a93f6.mp3`. It also plays on the last pair of every match. I saw 10 generic praise strings: Excellent!, Nice!, Great!, Nicely done!, Amazing!, Great job!, Correct!, Nice job!, Good job!, Awesome!. No XP and no next combo threshold appear inside the lesson. Their two lists (reward-measurements vs M-04) differ by one string each, and the union matches mine. | —
- M-05 | CONFIRMED | impact M (unchanged) | The quit sheet shows a teary Duo, "Wait, don't go! You'll lose your progress if you quit now", a big KEEP LEARNING button and an END SESSION text link (`shots/VQ-sheet.png`). With the X held for 150 ms, no screencast frame was emitted before release, so the X has no pressed state. First pixel came ~100 ms after release (theirs 81 ms). A close tap 100 ms into the open hit `HTML` and the sheet stayed open, with the same caveat as theirs (it aimed at the button's in-flight position). | —

## Reward measurements (`evidence/experience-director/reward-measurements.md`)
| Claim | Theirs | Mine | Verdict |
|---|---|---|---|
| CHECK → answer colour (first pixel > 2 %, after release) | median 29 ms (23–41), n 21 | **median 27 ms**, IQR 24–34, range 21–104 (one outlier), n 30 | CONFIRMED |
| CHECK → feedback sound (call time) | median 15 ms (10–22) | **median 14 ms**, IQR 12–15, range 11–34, n 30 | CONFIRMED |
| CHECK → banner in DOM | median 12 ms | median 12 ms (9–32) | CONFIRMED |
| Match: second token of a pair → visual | median 90 ms (20–170), "over 85 ms" | **~20–40 ms**: the pair turns green 1 frame after release (4 of 4 taps; previous frame still blue). Sound 9–26 ms (`Match_Correct_A_A_0x.mp3`) | **REJECTED as a number.** Their 90 ms comes from luminance-diff steps, which barely register light green on white (my luminance steps put the same taps at 136–154 ms). A colour read of every frame (`green-frames.mjs` on `motion/VV-c*-match-pair*-frames/`) shows the pair matches within the 85 ms threshold. The five-ingredient row "Match pair: visual 90 ms… partial" should read **pass**. |
| Same correct-answer mp3 | 40 / 40 | **29 / 29** | CONFIRMED |
| Praise copy | ~9 generic variants | 10 seen in 29 | CONFIRMED |
| "N IN A ROW" | from the 2nd correct | from the 2nd correct in 3 of 3 lessons (2…11); resets after a miss | CONFIRMED |
| Combo interstitials at 5 and 10 | full Duo interstitial with **sound** and combo copy ("Cool! 5 in a row!") | Interstitials appeared at **5 of 5** mid-lesson thresholds (V1@5, V2@5, V2@10, VV@5, VV@10). **0 of 5 played a sound on arrival.** Only **1 of 5** named the combo ("Outstanding! 10 in a row!"). The rest were generic: "You're getting good at this!", "Your hard work is paying off!" ×2, and "Good effort!" after a perfect 10 (`shots/V2-s01.png`). | **Timing CONFIRMED; "sound" REJECTED.** Their 19 ms sound was recorded on the tap that *leaves* the interstitial, and it is the next challenge's TTS prompt (`…/oscares/…069e7df74511`, next challenge "Write this in English"). Their own arrival recording `L2-c04-continue` is silent too. The "Combo milestone" (tier 3) and "Encouragement" (tier 1) rows are the same slot with rotating copy. Mostly it is a silent tier 1–2 beat, not a tier 3. |
| Beats in a perfect 12-challenge lesson | ~30 | V2 (12 challenges, 3 matches): 12 tier-2 + 15 pair dings + 2 interstitials + 1 complete = 30. VV (12 challenges, 2 matches): 12 + 10 + 2 + 1 = 25 | CONFIRMED as **~25–30** (depends on the number of match challenges); the 2 interstitials are not tier 3 (see above) |

## Findings
- F-FIRST-TIMER-03 | CONFIRMED | P2 → P2 | Reproduced on a fresh guest. Answered "I'm new to Spanish", answered one challenge, then X → END SESSION. The learner lands on /learn under "How much Spanish do you know?" with CONTINUE disabled (`shots/VQ-after-end.png`). A return visit to duolingo.com shows the same modal again (`v-quit-log.txt`). Detail: "with no confirmation" applies only when quitting at 0 answers; after 1 answer the quit sheet appears first and the result is the same. Why P2 and not P3: this is the rubric's "visible inconsistency" (a question answered 20 s earlier, asked again with no explanation). It hits the newcomer who already hesitated, and it persists across visits. The cost is 2 taps, so it is not P1. | —
- F-EXP-07 | CONFIRMED | P3 → P2 | Same root cause and same screen as F-FIRST-TIMER-03; merge. | F-FIRST-TIMER-03
- F-FIRST-TIMER-04 | CONFIRMED | P2 → P2 | **11 screens** recounted in 2 more runs: intro ×2, hdyhau, learningReason, proficiency, courseOverview, dailyGoal, notificationPrimer, choosePath, then the "hard to stay motivated…" and "…fun like a game!" pair. That is 11 CONTINUE taps, 5 choices and 1 permission screen, at 53 s bot wall time. "Two answers change nothing visible" is stronger than stated. The courseOverview text is identical for education, travel and career (4 runs in total). Goal 5 min vs 20 min gives the same first lesson, the same "All Daily Quests complete! Earn 10 XP", and the same "Nice job reaching your daily goal!" after one ~2-min lesson, even on a 20-min goal. Confidence medium → high. Side note: the order of the hdyhau and reason options is shuffled per guest. | —
- F-ACCESS-PERF-07 | CONFIRMED (lab-only) | P2 → P2 | My rerun (Lighthouse mobile, simulated throttling): Performance 56, FCP 4.2 s, **LCP 12.1 s**, TTI 15.4 s, TBT 330 ms, CLS 0. 27 scripts / 1,496 KB, and the same "page loaded too slowly to finish" warning, so 3 of 3 runs give 12.0–12.8 s. On this Mac, unthrottled observed LCP is 1.5 s. Why the number is plausible and not a rig artefact: the LCP element (splash `picture._1Bvko > img`) is not discoverable in the initial HTML and has no `fetchpriority`, so it waits for the app JS. reCAPTCHA alone costs 1.46 s of main-thread CPU and the app bundle 0.84 s. Behind ~1.5 MB of JS on simulated slow 4G with 4× CPU, a late hero is expected. Treat the absolute 12 s as a pessimistic Lantern estimate: Lantern counts every request before the observed LCP, and the trace never reached network-quiet. Real-user p75 is unknown (PSI/CrUX quota exhausted). It must stay labelled "lab, simulated throttling". | —

## Counts
CONFIRMED 9 (M-01, M-02, M-03a, M-04, M-05, F-FIRST-TIMER-03, F-EXP-07, F-FIRST-TIMER-04, F-ACCESS-PERF-07).
REJECTED 1 (M-03b, the "0/2 freezes" premise).
Reward measurements: 7 of 9 claims CONFIRMED. 2 corrected: match-pair visual ~90 ms is really 20–40 ms; the combo interstitial is silent and mostly generic.
Severity changes: F-EXP-07 P3 → P2 as a duplicate of F-FIRST-TIMER-03.
