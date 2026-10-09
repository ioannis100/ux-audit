# native-android — findings
Coverage: 15/16 native screens and 31 states: Home, Restaurants, Search/Explore, search results, venue, item sheet (new
item + edit-mode for an item already in the cart), image viewer, basket (collapsed + expanded stepper), checkout (top +
summary), Offers and savings, register wall, Orders and carts (both tabs), Profile (guest → sign-in screen), relaunch →
Welcome/country/consent. Dark mode (4 screens), font scale 1.0 → 2.0 (4 screens), Remove animations (5 transitions),
jank ×2 on Home and on the venue menu.
Not reached: in-venue category tabs (the app has none; menu is one long scroll), the "Cancel" button of "Continue order?"
(would discard the cart, not pressed), pushes (permission never requested for a guest), sign-in, pay, tracking, Wolt+.
**Run ended on the Welcome/consent screen** (see F-NATIVE-04): the guest setup was lost after Back-exit + relaunch, and I
did not accept the Terms on the owner's behalf. The device is at "Welcome!" with Cyprus selected, Terms unticked.
Viewports/devices: emulator-5554, AVD Medium_Phone, Android 17 (16 KB page image), 1080×2400 @420 dpi (411×914 dp),
Wolt `com.wolt.android` 26.40.1 (targetSdk 36), guest, fake GPS Limassol Marina, light theme unless stated.
Emulator, not a phone: no motor (haptics = what the app *requested*), Mac CPU, VFR recordings, `first` includes
~70–150 ms adb input latency. Timings compare screens; they are not phone numbers.
Evidence: `evidence/native-android/` (screens `NN-*.png`, dumps `*.json`, `rec/` recordings + filmstrips,
`transition-matrix.md`, `reward-measurements.md`, `a11y-*.json`, `font/`, `dark/`, `jank/`).

## North star
Feels like: **Wolt's own web calm + Uber Eats' native cart confidence**, with Apple-grade restraint on money moments.
Moments that decide the feel on Android: venue entry, Add to order, the offer progress/unlock, basket edit, checkout total,
and the return (reopening the app with a cart).

## Native vs web (where it matters; web findings by first-timer / visual-craft, not repeated)
| Moment | Android app | wolt.com (web agents) | Verdict |
|---|---|---|---|
| Venue arrival as guest | menu straight away, no sheet (`03-venue.png`) | sign-up sheet on arrival (F-FT-06) | **app better** |
| Price before account | full checkout with Item subtotal, Service fee 1,48 €, Delivery, Total, offers (`11b-checkout-summary.png`) | generic account wall at "Go to checkout" (F-FT-01, F-FT-04) | **app better** |
| Offer unlock | celebrated in basket, then **not applied** at checkout by default (F-NATIVE-01) | progress pill seen; checkout not reachable as guest | app worse on truth; web can't show it |
| Returning to a venue with a cart | "Continue order?" modal, buttons "Continue order" / "Cancel" (F-NATIVE-10) | same dialog, "No" deletes (F-FT-03) | equal; app's "Cancel" is even vaguer |
| Consent | marketing push + email **pre-ticked** (F-NATIVE-03) | cookie sheet visual interference (F-FT-02) | both fail the ethics gate, differently |
| Return as guest | guest session gone after Back-exit (F-NATIVE-04); carts tab errors (F-NATIVE-05) | "nothing waiting" (F-FT-07) | **app worse** |
| Haptics / sound | 0 requested, no UI sounds | none possible on iOS web; fxLog `[]` | app wastes a native advantage |

## Moment map
| # | Journey → moment | Clarity | Feel now (/10) | States missing | Benchmark | Evidence |
|---|---|---|---|---|---|---|
| 1 | J1 Home first screen | gap: address shows raw GPS `34°40'18.60996"N 33°2'28.71204"E` | 5 | — | §3.1 | `00-start.png` |
| 2 | J1 Home → Restaurants | ok | 4 (0.9–1.0 s white spinner, 2/2) | skeleton | §3.7 | `rec/t01*`, `rec/t01b*` |
| 3 | J1 Search | gap: field not focused (`mInputShown=false`) | 5 | focus | §3.6 | `02-search-delulu.png` |
| 4 | J1 Result → venue | ok | 4 (~0.5–1.0 s white spinner) | skeleton/shared element | §3.6 | `rec/t03*` |
| 5 | J2 Item sheet | ok, live price on CTA | 6 | — | §3.6 | `04-item-sheet.png` |
| 6 | J2 Add to order | ok | 6 (no bump, no haptic) | haptic, bar bump | §3.5 | `rec/t05*`, `vib-05-add.txt` |
| 7 | J2 Offer progress + unlock | **gap: says unlocked, isn't applied** | 7 feel / 2 truth | applied-state copy | §3.12 | `rec/frames5/t10-unlock-tile.png`, `12*.png` |
| 8 | J2 Edit item in cart | **gap: primary slot = red "Remove all"** | 2 | undo, confirm | §3.11 | `08b-edit-sheet.png`, `rec/frames5/rm-remove-all-tile.png` |
| 9 | J2 Checkout | ok, honest fee breakdown | 6 | — | §3.9 | `11*.png` |
| 10 | J2 Register wall | gap: generic, no close | 3 | close, context | §3.2 | `13-register-wall.png` |
| 11 | J3 Orders and carts | **broken** | 1 | empty state, cart | §3.15 | `16*.png` |
| 12 | J3 Reopen app | **broken: back to onboarding** | 0 | session persistence | §3.15 | `20*.png`, `21*.png` |

## Motion table (from `evidence/native-android/transition-matrix.md`)
Headline: 1 hard cut (search pill), 0 counted blank frames, 2 spinner holes on white (~0.5–1.0 s) on Restaurants and
venue entry that vanish with animations off; worst: register wall (3), Restaurants entry (4), venue entry (4).
| Element / transition | Now (measured) | After (spec) | Why |
|---|---|---|---|
| Home → Restaurants | slide 15–442 ms ease-out, then white + spinner to ~+1.2–1.3 s; RM run: content at 91–260 ms | keep slide, render cached list in the entering screen; skeleton only if no data at +100 ms [H] | the wait is self-inflicted (RM run proves data present) |
| Result → venue | ease-in-out 78–479 ms, spinner +520→+1040 ms, hero pops | shared element: row logo → venue logo, 350–450 ms `FastOutSlowIn`, menu skeleton | object constancy (§3.6) |
| Item sheet open / close | 7–686 ms / 456 ms, from bottom | 300–350 ms open, 220–250 ms close, spring no bounce [S M3] | 686 ms is over the 150–350 ms sheet budget |
| Add to order | 786 ms, bar appears, no bump | bar 1 → 1.06 → 1 over 250 ms + `CONFIRM` haptic [H] | §3.5 |
| Stepper | 141–145 ms roll | keep; add `SEGMENT_TICK` | already good |
| Offer unlock | bar → green pill + particle burst ~1.2 s, then gone | same, + `CONFIRM`, then persist "€5 off applied ✓" line | afterglow + truth |
| Home video carousel | autoplays under Remove animations | stop autoplay when `ANIMATOR_DURATION_SCALE == 0` | WCAG 2.2.2, motion.md |

## M-NAT-01 "I unlocked €5 off" should still be true at checkout · Clarity gap · impact H · effort M
- Now: adding fries to reach 18,50 € fills the "Unlock savings" bar, turns it green and fires a particle burst (~1.2 s,
  `rec/frames5/t10-unlock-tile.png`), then the section disappears. Checkout: "1 offer applied · 1 available",
  Total **19,98 €**; the €5 sits under "More ways to save — Pick one" with **"Do not apply offers" ticked**
  (`11b`, `12`). Picking it: Total **14,98 €** (`12c`). The venue pill even reverts to "5 € off on orders over 12 €"
  with "+1" after re-entry (`19-venue-scrolled.png`).
- Feels like: "they told me I'd won, then quietly charged me full price."
- Benchmark: Uber Eats/Deliveroo show the applied promo as a line in the basket total; Apple Pay sheets never change the
  number after you've seen it (benchmark-apps §3.9).
- Redesign: auto-apply the best eligible combination; after the unlock beat, keep a persistent row in the basket
  "€5 off applied ✓ — you save €8,39" and put the discounted total on the CTA ("Go to checkout · 14,98 €").
  If offers really are exclusive, say so at the unlock ("Pick at checkout: €5 off or free delivery") and pre-select the
  larger one.
- Spec: pill → applied row crossfade 200 ms; total rolls with `AnimatedContent` 300 ms; `CONFIRM` haptic at the unlock.
- Native: `view.performHapticFeedback(HapticFeedbackConstants.CONFIRM)` in the unlock callback (API 30+, `CONTEXT_CLICK` below).
- Remove: "Do not apply offers" as the default radio when an eligible offer exists.
- Requires: F-NATIVE-01.
- Reduced motion / 100th use: crossfade only; the applied row is information, so it still pays on the 100th order.
- Never: celebrate a saving the total doesn't contain.

## M-NAT-02 Edit sheet: the big button should never delete · Clarity gap · impact H · effort S
- Now: opening an item already in the cart shows a red full-width **"Remove all 8,00 €"** (or "Remove 10,50 €") where
  "Add to order" was. One tap removed 2 fries, no confirm, no undo, and the earned offer silently re-locked
  ("Add 1,50 € more") (`rec/frames5/rm-remove-all-tile.png`). I did it by accident while recording.
- Redesign: primary = "Update order" (disabled until something changes) or "Done"; destructive = text button "Remove from
  order" under it; any removal shows a 5 s Snackbar "Removed Classic Fries ×2 · Undo".
- Spec: Snackbar `SnackbarDuration.Long`, `REJECT` haptic on remove, `CONFIRM` on undo.
- Never: a destructive action in the same slot, size and colour weight as the constructive one.

## M-NAT-03 Make Add to order feel physical · Feel gap · impact M · effort S
- Now: 69 ms first change, sheet slides away, card "+" becomes "1", View order bar fades in; 0 haptics (whole session,
  `reward-measurements.md`).
- Redesign: bar bump 1 → 1.06 → 1 (250 ms spring, damping 0.6, stiffness 800) + count crossfade + `CONFIRM`; stepper
  `SEGMENT_TICK` per step (API 34) else `CLOCK_TICK`.
- Native:
  ```kotlin
  val view = LocalView.current
  LaunchedEffect(cartCount) { if (cartCount > prev) { view.performHapticFeedback(HapticFeedbackConstants.CONFIRM); bump.animateTo(1.06f, spring(0.6f, 800f)); bump.animateTo(1f) } }
  Modifier.graphicsLayer { scaleX = bump.value; scaleY = bump.value }
  ```
- Reduced motion / 100th use: no scale, keep haptic + count; tier 1 stays small enough for the 100th add.

## M-NAT-04 Kill the 1-second spinner holes · Feel gap · impact M · effort M
- Now: Restaurants and venue show a white page with a spinner ~0.5–1.0 s (2/2 runs on Restaurants); with animations off
  the same screen had content at 91 ms (`rec/rm-t01*`), so the data is there and the wait is tied to the transition.
- Redesign: bind cached data in the entering screen before the transition starts; shared element row-logo → venue logo;
  skeleton only if nothing arrives by +100 ms; crossfade 150–200 ms.
- Native: Compose `SharedTransitionLayout` + `Modifier.sharedElement(rememberSharedContentState("logo-$venueId"), …)`.

## M-NAT-05 A guest who comes back finds their cart · Clarity gap · impact H · effort M
- Now: Orders and carts → "Order again" blank, "Shopping carts" → "Something unexpected happened 😕" (2/2) while an
  18,50 € cart existed; Home shows no cart; Back-exit + relaunch drops the guest to onboarding (F-NATIVE-04/05).
- Redesign: persist the guest session; Home's first row "Your cart at Delulu · 3 items · 18,50 € — Continue" (one tap,
  never auto-submits); Shopping carts lists it; empty states say what goes there.

## Reward layer
Density: 5 tier ≥ 1 beats per core-loop run (venue → add → basket → add → checkout), all visual; 0 haptic, 0 sound.
Longest dead stretch: browse → venue (two ~0.5–1.0 s spinner holes). Benchmark: not recorded.
| Action / moment | Frequency | Ack now (ms) | Channels V/H/S | Progress shown | Next reward named | Tier now → target | Red-line tests | Gap → fix |
|---|---|---|---|---|---|---|---|---|
| Add to order | every item | 69 | V/–/– | count badge + bar | yes, "Add 1,50 € more" | 1 → 1 + haptic | pass | M-NAT-03 |
| Stepper ± | frequent | 7–12 | V/–/– | number roll + price | — | 1 → 1 + tick | pass | M-NAT-03 |
| Offer unlock | per order | 37 (burst +1.0–1.9 s) | V/–/– | 87% bar → full | yes | 2 → 2, but untrue | **R2 fail, R11 fail** | M-NAT-01 |
| Remove | rare | ~100 | V/–/– | offer re-locks silently | — | n/a → undo | — | M-NAT-02 |
| Checkout total | per order | 115 | V/–/– | fee breakdown | — | money: calm ✓ | R3 pass | M-NAT-01 |
Red-line results: R1 n/a · **R2 FAIL** · R3 amber pass · R4 n/a · R5 pass · R6 n/a · R7 n/t · R8 n/a · R9 n/a · R10 pass ·
**R11 FAIL** · R12 pass. Evidence per row in `evidence/native-android/reward-measurements.md`.
Top 3 missing micro-rewards: applied-saving afterglow (M-NAT-01), add-to-order haptic + bump (M-NAT-03), undo snackbar as a
"safe" beat (M-NAT-02).

## Pull plan (native-specific only; the web agents own the rest)
- Hook trace: trigger (push) → **missing for guests**: POST_NOTIFICATIONS never requested (`granted=false`), while 10+
  order-status channels with custom sounds exist. Action → reward (menu, offers) → investment (cart) → **lost** on relaunch.
  Missing links: trigger and investment persistence.
- Habit zone: weekly per occasion (brief). Mechanisms: P-01 saved-cart card on Home (M-NAT-05); P-02 permission ask at the
  moment of value (after the first order, "Tell me when the courier is 2 min away"), not at launch; P-03 one weekly
  "your usual" push at the user's own past order hour, ≤ 1/week, quiet hours 22–07; P-04 a home-screen widget showing a
  live order (Live Update/progress notification on Android 16+). Share-worthy: the order-arrival push with its own sound.

## Borrow & adapt
Covered by the web experience-director; native-specific: Uber Eats' persistent cart pill with all-in total (→ M-NAT-01/05),
Duolingo's "haptic on correct, tick on select" mapping (→ M-NAT-03), Apple's undo-on-delete (→ M-NAT-02).

## Black recommendations
Black UX means techniques that work through a bias (loss aversion, guilt, defaults) rather than by making the product
better. Many people consider them unethical; top apps use them anyway. Listed so the owner can choose knowingly; only
native mechanics that pass the gate are included.

B-01 Saved-cart nudge push
- What top apps do: Uber Eats / Deliveroo remind about an abandoned basket.
- For this product: one push 45–60 min after a guest/user leaves a non-empty cart: "Your Delulu order is saved — 18,50 €,
  €5 off already counts." Only if notifications were opted into; never between 22:00–07:00; max one per cart; one-tap
  "Don't remind me about carts" in the notification action.
- Why it works: loss aversion + endowment (the cart is theirs) · evidence: endowed progress (Nunes & Drèze 2006) [PR].
- Why it's black: pulls a spend the user had paused; can feed late-night ordering.
- Risk: ePrivacy/GDPR if sent under the pre-ticked marketing consent (must use valid opt-in); DSA Art. 25.
- Gate: user's goal ✓ (they built the cart) · true ✓ (only if the offer really applies) · easy out ✓ · not for the
  vulnerable ✓ (exclude alcohol/"Adults Only" venues and night hours) · guardrail: notification disables, uninstalls.
- Test: A/B 50/50, win = cart recovery within 24 h, harm = channel-disable rate and refunds · confidence medium.

B-02 Loss-framed notification-permission ask at the moment of value
- What top apps do: Duolingo/Uber ask with a reason right after value.
- For this product: after an order is placed: "Don't miss your courier — get a buzz when they're 2 minutes away."
  [Allow] [Not now]; ask once, re-ask only after a missed courier.
- Why it works: loss framing (missing the courier) on a real, user-owned outcome · [S] Duolingo permission timing.
- Why it's black: mild fear lever on a system permission.
- Risk: low; the ask must not bundle marketing.
- Gate: user's goal ✓ · true ✓ · easy out ✓ · not for the vulnerable ✓ · guardrail: later channel disables.
- Test: ask-after-order vs never-asked (current); win = opt-in rate, harm = disable rate in 30 days · confidence medium.

Never recommended (relevant here): pre-ticked marketing consent (already present → F-NATIVE-03); celebrating a saving
the total doesn't include (R2, F-NATIVE-01); haptic or confetti on payment; "only 2 left"/countdown pushes that reset;
marketing pushes under order-status channels (they bypass the user's channel choices).

## Emotional journey
Home: busy but inviting (address in raw GPS = slight doubt) → Restaurants/venue: a second of white each time (impatience)
→ item + add: competent, quiet → **peak: the green unlock burst** → checkout: honest fees (relief) → **worst: the €5 isn't
in the total**, and the register wall has no context → end: leaving and coming back wipes everything. The peak is real
but the ending contradicts it; fix the ending first (M-NAT-01, M-NAT-05).

## F-NATIVE-01 [P0] The basket celebrates "€5 off unlocked", but checkout leaves it off by default and charges €5 more
- User experiences: I add fries, the "Unlock savings" bar fills, turns green and bursts; at checkout my Total is
  19,98 € and the €5 is hidden under "More ways to save" with "Do not apply offers" ticked.
- Where: J2 → basket "Unlock savings" → checkout → Offers and savings.
- Evidence: `rec/t10-add-unlocks-offer*`, `rec/frames5/t10-unlock-tile.png` (bar → green pill + particle burst);
  `11b-checkout-summary.png` (Item subtotal 18,50 €, Service fee 1,48 €, Delivery 3,39 → 0,00 €, Total 19,98 €,
  Applied offers −3,39 €, "1 offer applied · 1 available"); `12-offers-and-savings.png` ("Pick one of the following":
  "5 € off on orders over 12 €" ○, "Do not apply offers" ●); after one tap `12b`/`12c`/`12d`: "2 offers applied",
  Item subtotal 13,50 €, Total 14,98 €, Applied −8,39 €. The offers stack; the app just doesn't pick it.
- Why it matters: reward.md R2 (a celebration whose net value at the default is 0) and R11 (the real condition, "pick it at
  checkout", is shown nowhere before checkout); in a payment flow that is P0 when users pay money they didn't intend. It
  also makes the best reward moment in the app a trust breaker.
- Fix: auto-apply the best eligible combination; show "€5 off applied ✓" in the basket and the discounted total on
  "Go to checkout"; if exclusive, say so at unlock and pre-select the larger saving (M-NAT-01).
- Effort: M
- Confidence: medium. Verified for a guest at checkout, 1 run; the pay step is behind sign-in, so the default for a
  signed-in user is unverified (would raise to high: same check signed in, and on the web basket).

## F-NATIVE-02 [P1] One tap on the primary button of an item already in the cart deletes it, with no confirm or undo
- User experiences: I open fries already in my order to check them, press the big button where "Add to order" always
  is, and they vanish; my €5 offer re-locks.
- Where: venue or basket → item already in cart → bottom bar.
- Evidence: `08b-edit-sheet.png` (red "Remove 10,50 €" with stepper at 1); `rec/rm-t05-add*` + `rec/frames5/rm-remove-all-tile.png`
  ("Remove all 8,00 €" tapped at video 3.01 s → sheet closes, View order 18,50 → 10,50 €, offer "Add 1,50 € more"), no
  Snackbar in the 4 s after. Happened to me unintentionally.
- Why it matters: destructive action in the constructive slot (same place, size and weight); error prevention (Nielsen),
  data loss of the user's own choices; reward loss.
- Fix: M-NAT-02 (primary "Update order"/"Done", text-button "Remove from order", 5 s Undo Snackbar).
- Effort: S
- Confidence: high (2 states observed: "Remove", "Remove all").

## F-NATIVE-03 [P1] The welcome consent screen pre-ticks marketing pushes and promotional emails "from Wolt and its partners"
- User experiences: before I've done anything, both marketing boxes are already ticked; only the Terms box is empty.
- Where: first launch / re-onboarding → "Welcome!" → after choosing the country.
- Evidence: orchestrator `evidence/orchestrator/n-05.png` + `n-05.json` (setup, 03:00); **re-observed by me at 03:24**
  after F-NATIVE-04 sent the guest back to onboarding: `21c-consent-rerun.png` / `.json`: both marketing checkables
  `checked=true` immediately after picking Cyprus, Terms `checked=false`. I did not press Continue or accept anything.
- Why it matters: ethics gate "preselection / pre-ticked opt-ins"; GDPR Art. 4(11)/7 and Recital 32, CJEU Planet49
  (C-673/17): silence or pre-ticked boxes are not consent; ePrivacy Art. 13 for marketing email. "Partners" widens it.
- Fix: both boxes unticked by default; ask for push permission at the moment of value (B-02), marketing email later.
- Effort: S
- Confidence: high.

## F-NATIVE-04 [P1] Leaving the app with Back and reopening it throws a guest back to onboarding
- User experiences: I back out of Wolt, tap its icon, and I'm on "Almost everything delivered" → guest → country →
  Terms → consent again; my session (and my reachable cart) is gone.
- Where: Home → system Back (exits to launcher) → launch.
- Evidence: `dark/home-dark.png` (named for the dark pass) shows the Android launcher after Back from Home; `20-relaunch.png` (system 16 KB compatibility
  dialog), `20b-after-relaunch.png` (sign-in screen), `20c-after-guest.png` / `21a-welcome-country.png` (country empty
  again). Same process before and after (`pidof com.wolt.android` = 6152, `am_proc_start` only at 02:59:53): not a
  process death, the guest state is tied to the activity. n = 1.
- Why it matters: the return journey (J3) starts with a 5-step re-onboarding including Terms and consent; Back-to-exit is
  the most common way Android users leave an app.
- Fix: persist the guest session and cart in storage; restore Home directly.
- Effort: M
- Confidence: medium (1 reproduction; I could not repeat it without accepting Terms; raise by repeating with the owner).

## F-NATIVE-05 [P1] "Orders and carts" can't show a guest's cart: one tab is blank, the other errors
- User experiences: I have a 18,50 € cart; the bag icon opens "Your orders" with an empty white page; "Shopping carts"
  says "Something unexpected happened 😕 … try again soon"; "Try again" gives the same.
- Where: Home → bag icon (Orders and carts).
- Evidence: `16-orders-carts.png` (Order again: no content, no empty state, dump has 5 nodes), `16b-shopping-carts.png`,
  `16c-try-again.png` (2/2). Home shows no cart entry (`15-home-return.png`, `15b-home-bottom-crop.png`: no badge).
- Why it matters: the only "where's my order?" entry fails for every guest; the cart can only be found by re-finding the venue.
- Fix: list guest carts locally; empty state "No carts yet — items you add are saved here"; Home cart card (M-NAT-05).
- Effort: M
- Confidence: high for this guest (2/2); signed-in not checked.

## F-NATIVE-06 [P2] The app never uses the phone's haptics: 0 requests across the whole order flow
- User experiences: adding to the order, stepping quantities, unlocking a deal and deleting items all feel the same: silent glass.
- Where: every core action.
- Evidence: `vib-00-baseline.txt` vs `vib-05-add.txt` vs `vib-99-end.txt`: 0 `com.wolt` entries (launcher entries prove
  `performHapticFeedback` is logged); VIBRATE granted. `reward-measurements.md`.
- Why it matters: reward.md §2 ingredient 2 (sensory hit in sync); Android's CONFIRM/REJECT/SEGMENT_TICK are free and
  respect the user's setting; the web can't do this on iPhone, the app can.
- Fix: M-NAT-03 (CONFIRM on add/unlock, SEGMENT_TICK on stepper, REJECT on remove).
- Effort: S
- Confidence: medium (emulator; verify on a Pixel by feel).

## F-NATIVE-07 [P2] Restaurants and every venue open on a white page with a spinner for ~0.5–1 s even when the data is cached
- User experiences: each tap into a list or venue costs a second of white.
- Evidence: `rec/t01-home-to-restaurants-filmstrip.png` (+330→+1315 ms), `rec/t01b-…run2` (+300→+1200 ms),
  `rec/t03-list-to-venue-filmstrip.png` (+520→+1040 ms); with Remove animations the same Restaurants screen had content at
  91 ms (`rec/rm-t01-home-to-restaurants-filmstrip.png`).
- Why it matters: perceived performance (skeleton ≤ 100 ms, no blank between screens); 2–3 of these per browse.
- Fix: M-NAT-04.
- Effort: M
- Confidence: medium (emulator CPU; the RM comparison is the strong part).

## F-NATIVE-08 [P2] TalkBack hears "Add one" ×6 and "1" with no item names, and can reach the screen behind open sheets
- User experiences (TalkBack): in the basket six buttons all read "Add one"; my line item's quantity reads only "1".
- Evidence: `a11y-basket.json` (6 unlabelled `itemCountWidget`, DUPLICATE ×6 "add one", qty widget label "1" 72×44 dp);
  `a11y-venue.json`, `a11y-item-sheet.json`: venue nodes (Add one, Share, More, See all) remain in the tree under the open
  item sheet (34 actionables, 23 small) — my `tap-label "^Add one$"` resolved to the basket card *behind* an open sheet.
  Small targets: "Add one" 44×44 dp, sheet − / + 40×56 dp, Back/Share/More/Close 40×40 dp, carousel pause 28×28 dp.
  Good: option rows read "SMASHED PATTY, count 0, price + 4,00 €"; sheet stepper "Number of items: 1".
- Why it matters: WCAG 4.1.2 / 2.4.6; Android 48 dp target guidance; modal content must hide what's behind it.
- Fix: contentDescription "Add Classic Fries, 4,00 €" / "Quantity of Classic Smashed Cheeseburger: 1, double-tap to
  change"; `importantForAccessibility="noHideDescendants"` (or Compose `Modifier.semantics { isTraversalGroup… }` + dialog
  semantics) on the background while a sheet is open; 48 dp touch areas via `minimumInteractiveComponentSize()`.
- Effort: S
- Confidence: medium for traversal (from the uiautomator tree; confirm with TalkBack swipe-through), high for labels/sizes.

## F-NATIVE-09 [P2] The delivery address is shown as raw GPS coordinates everywhere
- User experiences: the header says `34°40'18.60996"N 33°2'28.71204"E`; checkout calls it "Other".
- Evidence: `00-start.png`, `01-restaurants.png`, `11-checkout.png`; setup had resolved "M2CR+PH6, Limassol 3042"
  (`orchestrator/n-07.json`). At font 2.0 it truncates to "34°40'18.60996"N 3…" (`font/home-2.0.png`).
- Why it matters: "where is this going?" is the trust question before paying; coordinates read like a bug.
- Fix: show the reverse-geocoded label (street/plus code + area), coordinates never.
- Effort: S · Confidence: medium (could stem from the fake GPS fix; the setup screen resolved it fine).

## F-NATIVE-10 [P2] Re-entering a venue with a saved cart interrupts with "Continue order?" and an ambiguous "Cancel"
- Evidence: `18-venue-after-jank.png`, `18-continue-dialog.json` (2/2 re-entries); copy "continue this order or start a
  new one", buttons "Continue order" / "Cancel". Not pressed (would likely discard, cf. web F-FT-03).
- Fix: no modal; restore the cart and show "Start a new order" as a secondary action in the basket.
- Effort: S · Confidence: high (dialog), low (what Cancel does).

## F-NATIVE-11 [P2] The register wall forgets my order and has no on-screen way out
- Evidence: `13-register-wall.png`, `13.json`: only "Continue with Google", "Other options"; generic "Almost everything
  delivered"; exit only via system Back (`rec/t13-back-from-wall`, state kept). Better than web: it comes after a full
  price breakdown.
- Fix: sheet over checkout: "Create an account to order from Delulu · 14,98 €" + close (X), keep the order visible.
- Effort: S · Confidence: high.

## F-NATIVE-12 [P2] Home is the janky screen and its video carousel ignores "Remove animations"
- Evidence: `jank/home-1.json` 23.8% janky, p95 36 ms; `jank/home-2.json` 16.9%, p95 32 ms (vs venue 1.2% / 0.3%, p95 22 ms);
  `rec/rm-home-idle-filmstrip.png`: slides still auto-advance (~4.7 s) and videos play with all animator scales 0;
  10 muted AudioTracks only while Home is visible (`audio-dumpsys.txt`). Pause button 28×28 dp.
- Why it matters: "likely janky on a mid phone" (> 10% slow frames); WCAG 2.2.2 is met by the pause button but reduced
  motion isn't honoured.
- Fix: stop autoplay and show a still frame when `ValueAnimator.areAnimatorsEnabled()` is false; pause off-screen videos;
  48 dp pause target.
- Effort: S · Confidence: medium (emulator CPU).

## F-NATIVE-13 [P3] Tapping "Search" doesn't focus the field
- Evidence: `02-search-delulu.png`; `dumpsys input_method` `mInputShown=false`, served view a ConstraintLayout; second tap
  needed (`mInputShown=true`).
- Fix: request focus + show IME on open. Effort: S · Confidence: medium (emulator keyboard settings).

## F-NATIVE-14 [P3] At 200% text, labels break mid-word and the CTA price clips
- Evidence: `font/home-2.0.png` ("Restau/rants", "Grocer/ies", "Wellbe/ing"), `font/item-sheet-2.0.png` ("Add to order
  4,00 €" wraps, price clipped at the button edge). Text scales well overall: respondedPct 81 / 86 / 100 / 100 (home,
  venue, basket, item sheet), 0 ellipsised.
- Fix: `hyphenationFrequency`/`Hyphens.Auto` or allow 2-line tiles with whole words; CTA min-height wrap-content.
- Effort: S · Confidence: high.

## F-NATIVE-15 [P3] The build isn't 16 KB page-size compatible (engineering)
- Evidence: system dialog on relaunch (`20-relaunch.png`, `20-16kb-dialog.txt`): 24 libs not 16 KB aligned (libsentry,
  libmapbox-maps, libcrashlytics, libyoga…); app runs in compatibility mode.
- Why it matters: Google Play requires 16 KB support for apps targeting Android 15+; 16 KB devices show this dialog.
- Fix: rebuild with NDK r28+/AGP 8.5.1+ and updated SDKs. Effort: M · Confidence: medium (emulator image is 16 KB).

## Strengths
- A guest can build a cart and see the full honest price (service fee, delivery, discounts, total) before any account,
  and no sign-up sheet blocks the venue: clearly better than wolt.com.
- The quantity stepper (number roll 141–145 ms, live CTA price) and the offer progress bar with "Add 1,50 € more" are
  well-sized tier-1/2 rewards; the unlock burst is the right size (~1.2 s, non-blocking).
- Respects system settings where it matters most: transitions become cuts with Remove animations, text scales to 200%
  without ellipsis, no notification or other permission prompt before value.

## Interaction log
| Time | Action | What happened | Time taken |
|---|---|---|---|
| 03:04 | Start state check, `settings show`, vibrator baseline | Home, font 1.0, animations 1.0 | — |
| 03:04 | Tap Restaurants (rec t01) | slide, white + spinner ~1 s, list | settled 2.8 s |
| 03:05 | Tap Search (rec t02), type | Explore opens, field unfocused; 2nd tap focuses | 0.8 s |
| 03:05 | Back with query | returns to Explore, query cleared | — |
| 03:06 | Tap Delulu result (rec t03) | white + spinner ~0.5 s, venue, closing toast, "Deal applied" | 4.5 s |
| 03:06 | Item sheet open/close (rec t04) | 686 ms / 456 ms | — |
| 03:07 | Add to order (rec t05), vib check | badge 1, View order 10,50 €, "Add 1,50 € more"; 0 haptics | 0.8 s |
| 03:07 | View order (rec t06) | basket, Unlock savings 87% | 1.3 s |
| 03:08 | Basket qty tap (rec t07/t08) | stepper expands, collapses at ~2 s; fast 2nd tap opened edit sheet | — |
| 03:09 | Edit sheet | red "Remove 10,50 €" primary; `input tap` on + ignored, 150 ms hold works | — |
| 03:10 | Fries sheet + ×2 (rec t09) | roll 141–145 ms, 0 haptics | — |
| 03:11 | Add fries (rec t10) | bar fills → green burst → section replaced; Go to checkout 18,50 € | 2.3 s |
| 03:12 | Go to checkout (rec t11) | full checkout, Total 19,98 €, "1 offer applied · 1 available" | 3.3 s |
| 03:13 | Offers and savings; select €5 radio | "Do not apply" was default; after select Total 14,98 € | — |
| 03:14 | Need to register (rec t12) → Back (rec t13) | generic wall, no close; Back keeps checkout | 3.2 s / 0.8 s |
| 03:14 | Back ×5 (rec t14), Back to Home (rec t15) | state preserved, 372–484 ms each | — |
| 03:15 | Orders and carts (rec t16) | blank "Order again"; "Shopping carts" error ×2 | — |
| 03:16 | Profile | sign-in screen; Back | — |
| 03:16 | Notification/audio dumps | POST_NOTIFICATIONS not requested; only muted hero video tracks | — |
| 03:17 | Jank Home ×2 | 23.8% / 16.9% janky | — |
| 03:17 | Re-enter venue | "Continue order?" → Continue order | — |
| 03:18 | Jank venue ×2 | 1.2% / 0.3% | — |
| 03:19 | Remove animations on; rec rm-t04/05/06 | cuts; accidental "Remove all 8,00 €" removed fries | — |
| 03:20 | rm-home-idle, rm-t01; `settings reset`; t01b | carousel still autoplays; RM content 91 ms; normal run spinner again | — |
| 03:20–03:22 | font-scale-check home, venue (dialog again → Continue), basket, item sheet | 81/86/100/100% responded | — |
| 03:22 | Dark on → basket, item sheet, venue; Back ×3 exited the app; `settings reset` | dark fine; launcher shown | — |
| 03:23 | Launch Wolt | 16 KB dialog → OK; sign-in screen | — |
| 03:24 | Other options → Continue as a guest → country Cyprus | consent with marketing pre-ticked; **stopped, Terms not accepted** | — |
| 03:24 | Final vibrator dump, `settings show` | 0 Wolt haptics; settings at defaults | — |
