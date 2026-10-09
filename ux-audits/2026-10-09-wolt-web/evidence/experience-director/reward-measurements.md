# Reward measurements — Wolt web (reward.md §8)

Date 2026-10-09, between 02:30 and 03:30 Cyprus time (late night: many venues showed "Closing soon",
which was true). Fresh guest each run. 390×844 @2x, touch, `prefers-color-scheme: light` forced,
headless Chrome (puppeteer-core, swiftshader GL) on a Mac in dark mode.

## Method
- **Sound and vibration:** the §8 logger is injected before load by `launch()` in
  `evidence/orchestrator/wolt.mjs`. It patches `HTMLMediaElement.play`,
  `AudioBufferSourceNode.start` and `navigator.vibrate`, with timestamps on `performance.now()`.
  Attribution rule: a sound or haptic belongs to an action only if it fires after that action and
  before the next one.
- **DOM acknowledgement** (`reward.mjs`): a capture-phase `pointerdown` listener stamps t0, and
  MutationObservers on the touched card, the visible "View order" bar or checkout button, and
  `document.body` stamp the first mutation. Taps are `page.mouse.click(..., {delay: 50})`, so **every
  DOM number includes the 50 ms press hold** (pointer-up and click land at about +50 ms).
- **Visual acknowledgement:** `recordOnPage` from `capture-motion.mjs` (colour-aware screencast
  diff). `firstChangeMs` counts from the action, which here is a JS `.click()` with no press hold.
- **Network:** XHR and fetch requests between pointer-down and the end of the 1.5 s window.
- **Headless caveats:** no device audio latency, no real touch, desktop-class CPU (a phone is
  slower; nothing was re-run at `cpu: 4`), and `navigator.vibrate` is present but nothing calls it.
  None of these numbers applies to the native iOS or Android apps.

## Results

| Action | n | Visual ack (ms) | DOM ack (ms, incl. 50 ms press) | Bar/total updated (ms) | Network gating? | Sound | Vibrate |
|---|---|---|---|---|---|---|---|
| Add to order (item modal) | 3 (+2 screencasts) | button press scale at 34–47 | body 3–92 (modal closing) | bar text **442–455** (n=2; on the first add the bar is created, not updated) | no | 0 | 0 |
| Card "+" with no count (direct add, no options) | 1 screencast ×2 | 107–124 | — | bar slides up with the "Deal applied" pill | — | 0 | 0 |
| Card stepper + | 10 DOM, 5 screencasts | **20–48** (median 26) | 62–84 (median 69) | bar 4→13 items, all 10 taps counted | 1 of 10 taps sent a request; none waited on it | 0 | 0 |
| Card stepper − | 5 | — | 65–72 (median 71) | yes | — | 0 | 0 |
| Basket stepper + | 5 DOM, 3 screencasts (+2 in the matrix run) | **15–53** | 55–69 (target), body 1–69 | `CartViewNextStepButton` total, same frame | 1 `POST …/order-xp/web/v2/pages/checkout` (price recalculation), not waited on | 0 | 0 |
| Basket upsell + | 2 screencasts | 22–112 | — | total and count | — | 0 | 0 |
| Favourite heart (guest) | 1 | 42 | — | — (account wall) | — | 0 | 0 |

`__fx` across all runs: **0 web-audio starts, 0 `navigator.vibrate` calls**. The only `media` entries
are two HLS discovery videos (`…/discovery/*.m3u8`) that autoplay on the city page at load
(`walk1-city.mjs` output). They are not tied to any action; the carousel has a pause button.

Animations on the reward beats (from `document.getAnimations()`):
- card count: `pop-up` 335 ms `cubic-bezier(0.1, 0.8, 0.2, 1)`;
- basket total: `translate` 338 ms `cubic-bezier(0.1,0.8,0.2,1)` + `scale` 225 ms
  `cubic-bezier(0.25, 3, 0.1, 2.5)` (overshoot);
- offer pill: `offerAssistantIconBounce` 350 ms ease-out plus a green radial ripple of ~700 ms
  (1,049–1,770 ms after Add to order), shown with "Deal applied · €0 delivery fee".

## Density (one guest run of journey 2)
Run: venue → item modal → Add to order → stepper +1 → open basket → upsell + → Go to checkout. That
is 7 user actions, about 9 s of interaction excluding reading, and **4 tier ≥ 1 beats**:
1. the bar appears with the count (tier 1, at ~650 ms);
2. the "Deal applied" pill and ripple (tier 2-ish, 1.0–1.8 s; recorded on the first add of a run; later adds not checked);
3. the card count pop (tier 1);
4. the basket total bounce (tier 1).

Longest stretch with no acknowledgement inside the loop: **item tap → modal, ~650 ms**. Outside the
loop: tile → list (1.1–1.9 s), city → venue (~1.1 s), the sign-in sheet that interrupts the menu
~435 ms after it paints, and the run **ends on an account wall** (no reward).
Benchmark (Uber Eats web guest): **not recorded** in this run.

## Offer threshold (the commerce reward ladder)
- Below €12 the offer assistant reads "€5 off on orders over €12 · Add €1.5 more · +1". The distance
  is correct (€12 − €10.50).
- Crossing €12 (€14.50, and €84.00 later) only removes "Add €1.5 more". There is **no "unlocked"
  state, the €5 never appears in any total** ("Go to checkout €84.00"), and the visible pill rotates
  to "Deal applied · €0 delivery fee" (`walk3-results.json`, `reward-results.json`,
  `j2-09-over12-offer-light.png`).
- Terms behind "Show details" (`checks-results.json`): "For new users with a local phone number …
  Cannot be combined with other promotions … ***SELECT AT CHECKOUT*** Valid for 14 days from
  registration". Checkout is behind sign-in, so I could not verify whether it is applied.
