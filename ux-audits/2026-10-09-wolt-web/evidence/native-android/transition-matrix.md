# Transition matrix: Wolt Android 26.40.1 (emulator-5554, light, font 1.0)

Method: `native-android.mjs record start/stop` (screenrecord, VFR, ~43–60 fps) → `capture-video-motion.mjs --marks <tap> --crop iw:ih-200:0:120`.
Emulator, Mac CPU: timings compare screens, they are not phone numbers. `first` includes ~70–150 ms adb input latency.
Files: `rec/<name>.json` + `rec/<name>-filmstrip.png`; reduced motion = `rec/rm-*` (Remove animations: all three animator scales 0).
Platform baseline (`_contract-native.md`): Android Settings sub-screen ~560 ms fade-through, ~170 ms reduced, no blank frame.

| # | From → to | Trigger | First change | Settled | Hard cut | Blank | Anchored | Easing | Interruptible | Reduced motion | Score /10 | Benchmark § |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Home → Restaurants | tile tap | 28 / 42 ms (2 runs) | 2809 / 1825 ms | no | 0 frames counted, but **white page + spinner +330→+1315 ms (run 1), +300→+1200 ms (run 2)** | no (screen slide) | ease-out 15–442 ms | n/t | cut at 81 ms, **content at 91–260 ms, no spinner** | 4 | §3.6, §3.7 |
| 2 | Restaurants → Search (Explore) | Search pill | 22 ms | 777 ms | **yes @212 ms** (pill jumps bottom → top) | 0 | no | n/a | n/t | not recorded | 5 | §3.6 |
| 3 | Search result → venue | row tap | 95 ms | 4528 ms (incl. closing toast) | no (cut flag @1362 on content pop) | **white + spinner +520→+1040 ms** | no (logo/hero don't grow from the row) | ease-in-out 78–479 | n/t | not recorded | 4 | §3.6 |
| 4 | Venue → item sheet | card tap | 69 ms | motion 7–686 ms | no | 0 | partly (sheet from bottom, not from card) | ease-in-out | n/t | cut at 48 ms | 6 | §3.6 |
| 5 | Item sheet → venue | Back | 5 ms | 456 ms | no | 0 | yes (reverse) | ease-in | n/t | cut | 7 | §3.6 |
| 6 | Add to order (sheet → venue + bar) | button | 69 ms | 786 ms | no | 0 | no fly-to-cart; card "+" becomes "1" badge | ease-in | n/t | cut at 44 ms | 6 | §3.5 |
| 7 | Venue → basket | View order bar | 102 ms | 1318 ms | no | 0 | bar → full sheet | ease-out | n/t | cut at 144 ms, images fade | 6 | §3.6 |
| 8 | Basket qty "1" → stepper | tap | 59 ms | 342 ms, auto-collapses at ~2.0 s | no | 0 | yes (expands in place) | linear-ish | n/t | not recorded | 6 | §3.5 |
| 9 | Sheet stepper + / − | press | 12 / 7 ms | 145 / 141 ms | no | 0 | yes | number roll | yes | not recorded | 8 | §3.5, §2 numbers |
| 10 | Add that crosses €12 (offer unlock) | Add to order | 37 ms | 2272 ms | no | 0 | yes (bar fills → green pill + particle burst ~1.2–1.9 s → section replaced) | ease-out | n/t | not recorded | 7 (feel) / 2 (truth, see F-NATIVE-01) | §3.12, §3.10 |
| 11 | Basket → checkout | Go to checkout | 115 ms | 3332 ms (map tiles) | no | 0 | no | ease-out | n/t | not recorded | 6 | §3.9 |
| 12 | Checkout → register wall | "Need to register" | 86 ms | 3169 ms | no | 0 | no | ease-out | n/t | not recorded | 3 | §3.9 |
| 13 | Register wall → checkout | Back | 6 ms | 756 ms | no | 0 | yes | ease-in-out | n/t | not recorded | 7 | §3.6 |
| 14 | Back chain checkout → basket → venue → results → Explore → Restaurants | Back ×5 | 1–90 ms | 372–484 ms each | no | 0 | yes; scroll + query preserved | mixed | n/t | not recorded | 7 | Android baseline 560 ms |
| 15 | Restaurants → Home | Back | 126 ms | 2520 ms (hero video restarts) | no | 0 | yes | ease-out | n/t | not recorded | 6 | §3.7 |
| 16 | Home → Orders and carts | bag icon | 59 ms | 359 ms | no | 0 | sheet | ease-out | n/t | not recorded | 6 (then blank body / error: F-NATIVE-05) | §3.15 |
| 17 | Home hero carousel (idle) | auto | — | — | slide jumps | 0 | — | — | pause button 28 dp | **still auto-advances and plays video with Remove animations on** (`rm-home-idle`) | 4 | WCAG 2.2.2 / motion.md |

Headline: 1 hard cut (search pill), 0 counted blank frames, but **2 "spinner holes" of ~0.5–1.0 s on white** (Restaurants, venue) that disappear when animations are off (data was already there, row 1 RM run). Worst three: register wall (3), Restaurants entry (4), venue entry (4). Best: stepper number roll (8). Reduced motion: transitions honoured (sheets and screens become cuts); the home video carousel is not.

n/t = not tested (interrupt captures were not recorded on device).
