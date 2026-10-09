# Verification batch C: "Now" evidence, measurements, performance
Verifier, 2026-10-09, 03:28–04:05 Cyprus time (night). All captures: headless Chrome via `launch()` from
`evidence/orchestrator/wolt.mjs`, 390×844 @2x touch, **light forced** (`prefers-color-scheme: light`;
every capture checked `dark? false`), fresh guest context per run unless stated. Recordings use `recordOnPage`
from `<skill>/scripts/capture-motion.mjs` (colour-aware). Guest only, stopped at the checkout wall.
Scripts, logs and filmstrips: `evidence/verifier/` (`v-tile.mjs`, `v-item.mjs`, `v-reward.mjs`,
`v-states.mjs`, `v-thymari.mjs`, `v-moments.mjs`, `v-cross.mjs`, `*-results.json`, `*.log`, `motion/`).
**Night note:** Delulu was open at 03:28 (first probe) and showed "Closed · Opens at 18:00 · Schedule order"
from ~03:30. Its item modal, card steppers and basket still worked, so the timings below still apply. The first
"Add to order" in `v-moments.mjs` did not add anything on the closed venue.

## Verdicts
`F-ID | verdict | severity (orig → final) | one-line reason | duplicate-of`

- M-01 (Now) | CONFIRMED, numbers corrected | n/a | 12/12 recorded taps: no visible change until **1,060–1,446 ms**. Their range was 1,081–1,918. The first "change" at 109–143 ms is a few pixels, and there is no pressed state on the tile. Then a hard cut to the skeleton (12/12); list cards in the DOM at 2.1–3.7 s (24 runs); settled 2.6–3.9 s. The error flash did **not** recur (0/24, see F-EXP-02), so "2 of 10" becomes "2 of 34, all in the first session". | —
- F-EXP-02 | CONFIRMED (feedback gap) / UNCERTAIN (error flash) | P2 → P2 | The 1.1–1.4 s dead tap alone keeps P2. I alternated 12 screencast-recorded and 12 unrecorded fresh-guest runs, each with an in-page detector checking every 25 ms that survives navigation: **0/12 recorded, 0/12 unrecorded** showed "Argh, something went wrong!". Their filmstrip (`…run1-filmstrip.png`) shows it was real (+844 → +1,688 ms). So recording load is **not sufficient** to cause it (it didn't appear in 12 recorded runs); it may contribute, but I can't prove that. The rate is ~6% at most and may come from a backend or hydration hiccup at that hour. To settle it: field error logs, or ≥50 runs at different hours. Restate the finding as "rare (2/34)". | —
- M-02 (Now) | CONFIRMED | n/a | `v-cross.mjs`: Fries ×1 shows "Add €8 more", ×2 "Add €4 more". At **€12.00 and €16.00** the "Add …" line just disappears ("€5 off on orders over €12 +1"); there's no unlocked state. Not reproduced: the pill did **not** switch to "Deal applied · €0 delivery fee" at the crossing in my run. It showed that only on the first add. Drop "rotates at the moment of crossing", or mark it n=1. Side note: the pill drops the "Add" line at exactly €12.00 although the offer says "over €12". | F-EXP-04
- M-03 (Now) | CONFIRMED, numbers corrected | n/a | Cold first item tap, n=8 fresh guests: faint change at 42–54 ms, then the modal (first ≥ 2% frame) at **613–966 ms, median ~720 ms**. Warm opens: 140–193 ms (n=8). Escape at +100 ms was ignored **4/4**, and the modal was open at the end each time. One of the 8 cold opens showed a **173 ms white blank frame** before the modal (`motion/item-cold-7-filmstrip.png`), which matches F-AP-10's 1 of 2. | F-EXP-05 / F-AP-10
- M-04 (Now) | CONFIRMED | n/a | Go to checkout: full-screen cut at **105 ms** (theirs ~129). The wall's copy, "Create an account or log in · Log in below or create a new Wolt account.", never mentions the order or basket (`m04-wall-390-light.png`). Stopped there. | F-EXP-03 (related, not duplicate)
- M-05 (Now) | CONFIRMED | n/a | After an add plus a city reload: header basket items `[]`, 0 visible cart buttons, no "View order" or "Continue order" text. Back at the venue: "Continue order? You've got a cart saved … No / Yes" (`m05-*.png`). | F-EXP-07 (for the No/Yes part)
- F-EXP-05 | CONFIRMED, duplicate | P2 → P2 | Same root cause and same moment as F-AP-10. Keep one finding. "~650 ms" understates it: the measured value is ~0.6–1.0 s, median ~0.72 s at CPU ×1 (F-AP-10 measured 0.87 s at CPU ×4). Keep the Escape-ignored part (4/4); F-AP-10 lacks it. | F-AP-10
- F-AP-10 | CONFIRMED (merge with F-EXP-05) | P2 → P2 | Settled number for the merged finding: **cold first tap → modal 0.61–0.97 s (median 0.72 s, n=8, CPU ×1), warm 0.14–0.19 s, white frame in 1/8 (+AP 1/2), Escape in the first 100 ms ignored 4/4.** | F-EXP-05
- F-EXP-08 | CONFIRMED | P3 → P3 | Tap search: input focused, a blurred, dimmed city page beneath, and no suggestions, recents or chips (`search-open-390-light.png`). The `margin-right` 400 ms `cubic-bezier(.2,.6,.4,1)` layout animation was re-observed; the backdrop is a hard cut (`hardCut: true`). | —
- Reward: steppers 15–53 ms + 335 ms pop | CONFIRMED with method caveat | n/a | Mine, from **pointer-down** with real taps (50 ms press hold): card + **100–107 ms** (n=4), basket + **27–41 ms** (n=3). Their 20–48 ms card number came from a JS `.click()` with no press hold, so it counts from the click; subtract the hold and the numbers agree (~50–57 ms after release). Re-observed: `pop-up` **335 ms** `cubic-bezier(0.1,0.8,0.2,1)` on every card +, and the basket total `translate` 338 ms plus `scale` 225 ms `cubic-bezier(0.25,3,0.1,2.5)`. The count text and bar update in the same frame. State "≤ ~100 ms from pointer-down" for the card stepper, not 20–48. | —
- Reward: Add to order acknowledgement | CONFIRMED | n/a | n=3: button press visible at **32–42 ms** (theirs 34–47), bar text changes at **463–464 ms** (theirs 442–455). Animations: button `scale` 200 ms; sheet exit `transform` 350 ms / `opacity` 250 ms. | —
- Reward: 0 sounds / 0 vibrations | CONFIRMED | n/a | `__fx` over 10 measured actions (3 add, 4 card +, 3 basket +): empty, 0 media, 0 web-audio, 0 vibrate. Each `fx` window ran from an action to the next action, so nothing was left to attribute. | —
- Transition matrix headline (6 hard cuts / 17 rows, 0 blank) | CONFIRMED with one correction | n/a | I re-recorded the 3 worst rows, light forced. Tile → list: hard cut 12/12, 0 blank. Item-modal interrupt: no cut, Escape lost 4/4, 0 blank. City → venue (McDonald's Polemidia [night]): hard cut 3/3 at 1,692–2,889 ms, when the sign-in sheet cuts in; first ≥ 2% change at 1,021–1,705 ms; 0 blank. **Correction:** "0 blank frames" is not true for the venue → item modal row: a 79–173 ms white frame occurs in ~1 of 8–10 cold opens. Ranking of the worst three holds. | —
- F-AP-09 | CONFIRMED, lab only | P2 → P2 | One Lighthouse mobile rerun on the Delulu venue (`lh-venue-mobile-verify.json`): Perf 24, FCP 6.8 s, **LCP 23.8 s**, TBT **2.87 s**, CLS **0.106**, TTI 26.9 s; 4G simulated, CPU ×4; host benchmarkIndex 4,034 (a normal fast Mac, not a weak rig). Same LCP element (the hero `<img fetchpriority=high>`); long tasks of 1,164 / 681 / 466 ms in `9584-*.js`. Unthrottled **observed** LCP 2.5 s, of which **render delay is 1.6 s** after a 0.36 s image load. The 20–24 s LCP is a Lantern simulation artefact in size; it is not a measured time. The direction is plausible: the hero waits on JS even on a fast machine, and TBT around 3 s reproduces on all three runs. Keep it lab-only and directional, and don't quote "20 s" as user time. | —
- F-VISUAL-CRAFT-04 | CONFIRMED | P2 → P3 | Reproduced at 390 and 1440 (`venue-404-*-light.png`): a grey gradient header 0–~300 px (the `HEADER` element is 360 px with 0 images); "As one journey ends, another begins" at y≈775 of 844 (390) and y≈780 of 900 (1440). "Below the fold on desktop" is wrong: the headline is on the first screen at both sizes, right at the bottom. This is a rare route (dead links), and the message is still readable on the first screen, so it's craft: P3. | —
- F-VISUAL-CRAFT-05 | CONFIRMED (visual), premise corrected | P2 → P3 [night] | Reproduced on Thymari (Closed · Opens at 11:00): the Greek-menu text peeks out between the offer pill and "Schedule order" (`venue-thymari-old-port-390-light.png`). But these are not three floating layers. `menu-language-selector` is **static in-flow content** (y 740–840). The only overlay is one sticky container (z 3, y 758–844) holding the pill and the CTA (`cart-view-button`, which reads "Schedule order" when the venue is closed). The banner shows through a gap in that container that has no opaque background, and it scrolls into view normally. **Day state:** an open venue with an empty basket has no bottom bar and no pill (`experience-director/j2-02-venue-menu-light.png`, "Open until 03:30"), so on first paint the banner would be fully visible. The overlap is closed-venue only, or appears after an add on an open venue, once the user has usually scrolled past the banner. Fix: give the sticky stack an opaque background or gradient, plus bottom padding on the content equal to the stack height. The proposed "one stack including the banner" treats in-flow content as a layer. | —

Counts: CONFIRMED 15 (4 with corrected numbers or premise, 1 duplicate pair merged), REJECTED 0, UNCERTAIN 1 (the F-EXP-02
error-flash rate; the feedback part of F-EXP-02 is confirmed). Severity changes: F-VISUAL-CRAFT-04 P2→P3,
F-VISUAL-CRAFT-05 P2→P3 [night]. Duplicates: F-EXP-05 = F-AP-10.

## Numbers side by side
| Measure | Auditor | Verifier (this run) |
|---|---|---|
| Tile → first visible change | 1,081–1,918 ms (n=4) | 1,060–1,446 ms (n=12) |
| Tile error flash | 2/10 | 0/24 (12 recorded, 12 not) → 2/34 overall |
| Item cold open → modal | 694 ms (ED, n=1); 762 / 870 ms (AP, CPU 1/4) | 613–966 ms, median ~720 (n=8, CPU 1) |
| Item warm open | 157 / 315 ms (AP) | 140–193 ms (n=8) |
| Escape at +100 ms ignored | 1/1 | 4/4 |
| White frame on cold open | 1/2 (AP); matrix says 0 | 1/8 (173 ms) |
| City → venue first ≥ 2% / sheet cut | ~1,100 / 2,253 ms | 1,021–1,705 / 1,692–2,889 ms (n=3) |
| Card stepper + visual ack | 20–48 ms (from JS click) | 100–107 ms (from pointer-down, 50 ms hold) |
| Basket stepper + | 15–53 ms | 27–41 ms |
| Count pop | 335 ms | 335 ms |
| Add to order: press / bar text | 34–47 / 442–455 ms | 32–42 / 463–464 ms |
| Checkout → wall cut | ~129 ms | 105 ms |
| Sounds / vibrations | 0 / 0 | 0 / 0 (10 actions) |
| Venue mobile LCP / TBT / CLS (lab) | 20.7–23.6 s / 2.96–3.14 s / 0.106 | 23.8 s / 2.87 s / 0.106; observed LCP 2.5 s |
