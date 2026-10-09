# Reward measurements: Wolt Android 26.40.1 (emulator-5554), 2026-10-09 03:04–03:24

## Method
- **Haptics:** `adb -s emulator-5554 shell dumpsys vibrator_manager` before and after every key action
  (`vib-00-baseline.txt`, `vib-05-add.txt`, `vib-99-end.txt`). The log records app vibrations *and*
  `View.performHapticFeedback` calls with the requesting package (the baseline shows the launcher's
  `performHapticFeedback(constant=0)` entry with its package name), so the method can see app haptics.
  The emulator has no motor: this says what the app *requested*, not how it feels.
- **Sound:** `dumpsys audio` player history + `dumpsys media.audio_flinger` tracks for uid 10233 (`audio-dumpsys.txt`).
- **Visual acknowledgement:** screenrecord + `capture-video-motion.mjs` (`rec/*.json`); `first` includes ~70–150 ms
  injected-input latency. Stepper presses were sent as 100 ms holds (`swipe x y x y 100`): plain `input tap`
  (~0 ms down/up) was ignored by the stepper 4/4 times, a 150 ms hold worked 1/1 (emulator artefact, not a finding).
- Attribution rule (reward.md §8): a sound/haptic belongs to an action only if it fires after it and before the next.

## Haptics
| Action | Wolt vibration / performHapticFeedback entries | n |
|---|---|---|
| Add to order (item sheet) | 0 | 2 |
| Sheet stepper + / − | 0 | 3 |
| Basket stepper expand | 0 | 2 |
| Add that unlocks "€5 off over €12" (celebration) | 0 | 1 |
| Remove all (destructive) | 0 | 1 |
| Go to checkout, offer radio select, register wall | 0 | 1 each |
| **Whole session** | **0** (`grep -c com.wolt vib-99-end.txt` = 0; only 6 launcher entries in history) | — |

VIBRATE permission is granted (`dumpsys package`). Notification channels (order progress, arriving, delayed,
rejected, robot delivery…) declare vibration + **custom per-status sounds** (`android.resource://com.wolt.android/…`),
so the app's haptic/sound language lives only in pushes, which a guest never gets (POST_NOTIFICATIONS
`granted=false`, never requested).

## Sound
- In-app UI sounds: **none**. All 10 Wolt AudioTracks (USAGE_MEDIA, volume −inf) open only while Home is on screen
  (03:03:36–03:04:44, 03:15:13–03:16:31) and last 2–7 s: muted hero-carousel videos, not feedback.

## Acknowledgement (first visible change after touch-down)
| Action | First change | Main beat done | Channels V/H/S | Tier now → target |
|---|---|---|---|---|
| Item card tap → sheet | 69 ms | ~690 ms | V / – / – | 0 → 0 |
| Add to order | 69 ms | 786 ms (sheet out, card badge "1", View order bar + offer pill) | V / – / – | 1 → 1 (+ CONFIRM haptic, bar bump) |
| Stepper + / − | 12 / 7 ms | 145 / 141 ms (number roll + live price) | V / – / – | 1 → 1 (+ SEGMENT_TICK) |
| Add that crosses €12 | 37 ms | bar full ~+600 ms, green pill + particle burst ~+1.0–1.9 s, section gone +2.3 s | V / – / – | 2 → 2 (+ CONFIRM), **but the reward isn't applied at checkout** |
| Basket open | 102 ms | 1318 ms | V / – / – | 0 |
| Go to checkout | 115 ms | 3332 ms | V / – / – | 0 |
| Remove all | ~100 ms | sheet closes, badge gone, offer re-locks to "Add 1,50 € more"; **no confirm, no undo** | V / – / – | n/a (needs undo) |

## Reward ladder and density (one core-loop run: venue → item → add → basket → add 2nd item → checkout)
Tier ≥ 1 beats: (1) Add → card badge + View order bar; (2) offer pill "Add 1,50 € more" (next reward named);
(3) stepper roll; (4) unlock celebration (tier 2); (5) "Deal applied · 0 € delivery fee" toast → **5 beats**, all
visual-only. Longest stretch without a beat: browse → venue (Home → Restaurants → Search → venue), ~3 screen loads, two of
them ~0.5–1.0 s white spinners. Negative beat: checkout shows the celebrated €5 under "More ways to save" with
"Do not apply offers" selected (Total 19,98 € vs 14,98 € once picked).
Benchmark run (Uber Eats / Duolingo on device): **not recorded**.

## Red-line tests (reward.md §7)
| # | Result | Evidence |
|---|---|---|
| R1 near-miss | n/a | no chance mechanics |
| R2 loss disguised as a win | **FAIL (guest, default state)** | celebration `rec/t10-add-unlocks-offer*`, `rec/frames5/t10-unlock-tile.png`; checkout default `11b-checkout-summary.png` (Total 19,98 €, applied −3,39 € only); `12-offers-and-savings.png` ("Do not apply offers" ticked); after selecting `12b`/`12c` Total 14,98 € (−8,39 €). Net value of the celebrated reward at default = 0 €. |
| R3 celebrating spending | amber pass | the burst celebrates a discount threshold in the basket, ~1.2 s, not the payment; nothing at checkout or pay |
| R4 paid randomness | n/a | |
| R5 removed stopping cues | pass | no auto-reorder; finite carousels |
| R6 credits hide money | n/a | no credits seen (Wolt+ not reached) |
| R7 speed-ups on money | n/t | pay step behind sign-in |
| R8 fake control | n/a | |
| R9 sticky exits | n/a | |
| R10 forced gamification | pass | |
| R11 opaque bonus conditions | **FAIL** | the "over €12" condition is stated, the real condition (must be picked manually at checkout, "Pick one of the following") is not shown in venue or basket |
| R12 loss-framed guilt | pass | register wall and dialogs neutral |

Device settings after the run: font 1.0, animator/transition/window scales 1.0, night no (`settings reset` run after
reduce-motion, dark and each font check).
