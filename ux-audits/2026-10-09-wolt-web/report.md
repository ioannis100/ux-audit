# UX audit: Wolt (web + Android app, guest), 2026-10-09

Team: experience-director (lead), first-timer, visual-craft, access-perf on wolt.com; a native-android
auditor on the Wolt app 26.40.1 (emulator); 4 verifiers (accessibility, ethics and trust, "Now" claims
and performance, native). Guest only, light theme forced, Limassol (Cyprus), fake GPS at Limassol
Marina for the app. Brief: `brief.md`. Findings: `findings/`. Verdicts: `verification/`.

**Run time: ~02:30–04:00 Cyprus time.** Many venues were closed or closing; observations that depend
on it are labelled [night]. Signed-in flows (payment, tracking, Wolt+, favourites, ratings) were not
reached, so Pull and Trust are judged on what a guest meets.

## 1. Verdict

Wolt's craft is real: a measured, token-driven system (Direction 12/15), steppers that answer in
27–107 ms and never drop a tap, honest "Closing soon", labelled sponsored items, and no upsell pushed
on guests. The app is clearly better than the website for a guest: no sign-up sheet on the venue, and
the full price with fees before any account. **But at the moments that decide trust, Wolt leans on the
user:** the cookie sheet makes rejecting the faintest choice, the app's consent screen pre-ticks
marketing pushes and emails, and the app celebrates "€5 off" in the basket that checkout then leaves
off by default. **And a guest's work evaporates:** "Continue order? No" deletes the basket, leaving the
app wipes the guest, the carts tab errors, and the website's checkout ends on a full-screen account
wall that never mentions the order. Would it take off as it is? It already has; these are the leaks a
market leader can afford and a challenger can't.

## 2. Scorecard

| | Score /10 | Evidence |
|---|---|---|
| **Overall** | **5.8** | 0.7 × 5.8 + 0.3 × 5.75; no open P0 (F-NATIVE-01 verified P0 → P1) |
| Clarity | 6 | browsing is clear; gaps: tile tap 1.06–1.45 s with no change, untrue "sign up to start ordering", the €5 unlock silent (web) and not applied (app), "No" deletes the basket |
| Feel | 6 | steppers benchmark-level (basket 27–41 ms, count pop 335 ms); minus 6 hard cuts in 17 transitions, 0.6–1.4 s dead taps, the app's 0.5–1 s spinner holes, haptics only on some "+" buttons |
| Pull | 5 | per-occasion product, no streaks needed; but a guest's saved basket is invisible, the app forgets the guest, nothing waits on day 2 (signed-in pull not seen) |
| Trust | **4 (capped)** | honest checkout total in the app, no fake urgency; two confirmed dark patterns (cookie weighting, pre-ticked consent) cap it at 4; the €5 celebration not in the total |
| Craft | 8 | Direction 12/15; type 12–48 scale, 4 px grid, 3,279 product tokens, one action colour at 7.6:1, real dark theme |
| Usability · Accessibility · Performance · Content | 6 · 6 · 5 · 6 | dead ends and data loss · 2 P1 + many P2 (web), TalkBack duplicates (app) · lab venue LCP 20–24 s (inflated; 2.5 s unthrottled), app Home 17–24% janky frames · hidden offer terms, "(1% vol)" on every drink, raw GPS address |

Heuristic expert scores, not measured usability. Compared with the Duolingo calibration run (7.1),
Wolt's guest experience scores lower mainly on Trust and Pull, not on craft.

## 2b. Recommendations

**Must-do**
1. **Make consent honest.** Cookie sheet: "Use only necessary" as a button of the same size and weight
   as "Allow"; app: marketing push and email **unticked** by default (GDPR consent must be opt-in;
   CNIL asks for equal-level refuse/accept). Confidence high (both verified) · effect: removes a legal
   and trust exposure; opt-in rates will drop and become real · test: none needed, it's a fix.
2. **Make the €5 true at every step** (M-02, M-NAT-01): at the crossing say "€5 off unlocked · new
   customers · select it at checkout", and pre-select it at checkout (or auto-apply the best eligible
   offer); show the eligibility in the nudge itself. Confidence high · effect: fewer "I was promised
   €5" moments, higher redemption · test: A/B, redemption rate and support contacts about promos.
3. **Never lose a guest's basket** (M-05, M-NAT-05, F-NATIVE-04/05, F-FT-03): keep the app's guest
   session after Back; fix the carts tab; a "Your basket at Delulu · 1 item · €10.50 · Continue" card
   on Home; rename "Continue order? No / Yes" to "Start a new order / Continue (1 item · €10.50)".
   Confidence high · effect: basket recovery · test: A/B on the resume card.
4. **Sign-in as a sheet over the basket** at checkout, titled "Sign in to send your €10.50 order to
   Delulu", and drop the venue-arrival sheet whose "to start ordering" isn't true (M-04, F-FT-06).
   Confidence medium · effect: checkout conversion for new users · test: A/B, sign-ups per basket.
5. **Two accessibility P1s** (web): stop the desktop header search from trapping Tab; put
   `aria-label="{cuisine}, {n} places"` on every cuisine tile link (the carousel empties off-screen
   tiles). Confidence high · effect: keyboard and screen-reader users can navigate · test: axe + one
   VoiceOver/TalkBack pass.

**Good to have**
6. Pressed states and view transitions: tile → list without a dead second or an error flash (M-01);
   open the item sheet from the card's own data, image grows from the card (M-03); app: bind cached
   data before the transition, no white spinner page (M-NAT-04). Medium · perceived speed · A/B time-to-first-add.
7. Destructive action out of the primary slot: "Update order" as the big button, "Remove from order"
   as text, a 5 s Undo snackbar (M-NAT-02). High · fewer accidental deletions.
8. Add to order that feels physical: bar visible ≤ 100 ms (optimistic), bump 1 → 1.06 → 1 over 250 ms;
   app: `CONFIRM` haptic on add and `SEGMENT_TICK` on steppers, consistently (M-NAT-03). Medium · feel.
9. Show fees and total on the web basket before the account wall, as the app already does (F-FT-04). Medium · trust.
10. Guest favourites saved on the device, merged on sign-in (P-02). Medium · return visits.
11. Real order counts on the 3 most-ordered dishes instead of an unexplained "Popular" (moved here from
    the Black tier by the verifier: a printed count can't be switched off, so it's plain information). Low.

**Useful, lower priority**
12. Contrast: deal "Show details" (2.8:1 → `#145367`), the alcohol label (1.84:1 → `#6F6B68`), the
    landing hero (white on cyan ~2:1 → navy); status-badge overlay ≥ 54% black. Fix the data too:
    every drink at Thymari reads "(1% vol)".
13. Search: an empty state with suggestions; animate the field with `transform`, not `margin-right`.
14. Edge screens: removed venue (grey hero), closed venue (see-through sticky bar) [night]; desktop
    offer pill covering cards; tabular figures for prices.
15. Performance: hero image in the initial HTML, less JS before first paint (lab LCP inflated but the
    direction holds); app Home jank and a video carousel that ignores "Remove animations".
16. App: show the address as a street name, not GPS coordinates; tapping "Search" focuses the field.

**Black (informed choice)**

Black UX is persuasion that works *through* a bias (loss aversion, urgency, social proof) rather than by
making the product better. Some people consider it unethical; delivery apps use it widely. Each item
below passed the skill's gate (the user's own goal, true, easy out, not for the vulnerable, a harm
metric) and is listed so you can choose knowingly (`references/black-ux.md`).

- **B-01 Resume card with the real last-order time** ("Your basket at Delulu is waiting · last orders
  03:15"). *Works:* loss aversion on the user's own unfinished order + a true deadline (Kahneman &
  Tversky; goal gradient). *Black because:* late-night urgency can push an order someone paused on
  purpose. *Risk:* fake urgency is illegal; this must use real hours. *Gate (verified, with two
  amendments):* last-order time, not closing time; a × that hides the card and keeps the basket; off
  for alcohol/Adults Only baskets. *Test:* basket recovery vs refunds and clears after midnight.
- **B-02 One saved-cart push** (app), 45–60 min after leaving a non-empty cart, only with a valid
  notification opt-in, never 22:00–07:00, max one per cart, "Don't remind me about carts" in the
  notification. *Works:* endowment + loss aversion. *Black because:* pulls a spend the user paused.
  *Risk:* invalid if sent under the pre-ticked marketing consent. *Test:* cart recovery vs channel
  disables and uninstalls. *(Gate checked by the auditor; not separately verified.)*
- **B-03 Loss-framed notification ask after the first order** (app): "Don't miss your courier: get a
  buzz when they're 2 minutes away." [Allow] [Not now], asked once. *Works:* loss framing on an
  outcome the user owns. *Black because:* a mild fear lever on a system permission. *Test:* opt-in
  rate vs disables within 30 days.

*Never recommended here, for awareness:* pre-ticking consent (present today, F-NATIVE-03); celebrating a
saving the total doesn't contain (present today, F-NATIVE-01); countdowns or "Closing soon" that aren't
true; "only 2 left" without stock data; fees revealed only at the final step (drip pricing: unverified
here, needs a signed-in pass); confetti on payment; marketing pushes sent through order-status channels.

# Part 1: Feel & pull

## 3. Make it feel like Wolt at its best

Wolt's own steppers are the benchmark the rest of the flow should meet: instant, live price on the
button, a small count pop. The moments that decide the feel: card → venue (§3.6), menu browsing, item
sheet with live price (§3.5), add → bar, basket, the checkout handoff (§3.9), offer progress (§3.12) and
the return (§3.15). The first four are close; the last four lose the user.

## 4. Top redesigns (all "Now" claims verified; numbers are the verifiers' where they differ)

### M-NAT-01 / M-02 "I unlocked €5 off" should still be true at checkout · Trust · impact H · effort M
- **Now (app):** reaching €12+ fills the "Unlock savings" bar, turns it green and bursts (~1.2 s);
  checkout shows "Do not apply offers" selected under "More ways to save — Pick one", whose only other
  option is the €5 (14,90 € → 9,90 € when picked, reproduced at a second open venue). The terms say
  "new users with a local phone number … SELECT AT CHECKOUT … cannot be combined", yet it stacks with
  free delivery. **Now (web):** the "Add €1.5 more" line disappears at €12.00 with no unlocked state; the
  conditions are one tap away and missing from the nudge.
- **Redesign:** at the crossing: "✓ €5 off unlocked · new customers · select at checkout"; in the
  basket a row "€5 off (at checkout if eligible) −€5.00"; at checkout pre-select the €5 (or auto-apply
  the best eligible offer) with an easy untick.
- **Spec:** pill neutral → success fill 300 ms `cubic-bezier(.2,0,0,1)`, check icon .6 → 1 with
  overshoot 250 ms; total rolls with `tabular-nums` 300 ms; app `CONFIRM` haptic at the unlock.
- **Web:** `pill.animate([{background:'var(--surface)'},{background:'var(--success-weak)'}],{duration:300,easing:'cubic-bezier(.2,0,0,1)',fill:'forwards'})`
  **Native:** `view.performHapticFeedback(HapticFeedbackConstants.CONFIRM)` in the unlock callback.
- **Reduced motion / 100th use:** colour + text only; once per order, still meaningful.
- **Never:** celebrate a saving the total doesn't contain; say "unlocked" to someone who isn't eligible.

### M-05 / M-NAT-05 A guest who comes back finds their basket · Pull · impact H · effort M
- **Now:** web: no trace of the basket on the city page; inside the venue "Continue order? No / Yes"
  opens with focus on No, and No, Esc or a tap outside delete it with no undo. App: one Back from Home
  and relaunch returns the guest to onboarding (same process; address and 22,50 € cart gone; confirmed
  by the orchestrator); "Shopping carts" errors 2/2, "Order again" is blank.
- **Redesign:** persist the guest session; a resume card on Home/city page (B-01 adds the honest time);
  buttons "Start a new order" / "Continue (1 item · €10.50)" with focus on Continue; Undo after a clear.
- **Spec:** card fades in 200 ms; one tap to the venue with the basket open; never auto-orders.

### M-04 "Go to checkout ends on a login wall" · Clarity · impact H · effort M
- **Now (web):** a hard cut (105 ms) to a full-screen "Create an account or log in" with no close
  button and no mention of the order; browser back works and the basket survives; Esc closes the basket
  underneath while the wall stays. The venue-arrival sheet earlier said "Log in or sign up to start
  ordering", which isn't true.
- **Redesign:** sign-in as a sheet over the visible basket: "Sign in to send your €10.50 order to
  Delulu · Your basket is saved"; remove the arrival sheet.
- **Spec:** sheet 300 ms `cubic-bezier(.2,0,0,1)` over a 40% backdrop; basket summary stays above the detent.

### M-01 "I tapped Restaurants and nothing happened" · Feel · impact H · effort M
- **Now:** 1,060–1,446 ms with no visible change (12/12), no pressed state, then a hard cut to a
  skeleton; an "Argh, something went wrong!" page flashed in 2 of 34 attempts and recovered by itself.
- **Redesign:** pressed state on every tile; keep the city page until the list has data, then a view
  transition; never render the error route while the first fetch is pending.
- **Spec:** `:active` scale .97, 100 ms `cubic-bezier(.2,0,0,1)`; `::view-transition-old(root){animation:180ms cubic-bezier(.4,0,1,1) both fade-out}` `::view-transition-new(root){animation:260ms cubic-bezier(.2,0,0,1) both fade-in}`.
- **Reduced motion:** ≤ 150 ms crossfade.

### M-03 "I tapped a burger and waited" · Feel · impact M · effort M
- **Now:** cold first open 613–966 ms (median ~720 ms) before the modal, warm 140–193 ms; Escape 100 ms
  after the tap is ignored 4/4; a 173 ms white frame in 1 of 8 cold opens.
- **Redesign:** open on pointer-up from the card's data; load options inside the open sheet; grow the
  card image into the hero; Escape/back always wins.
- **Spec:** `view-transition-name: item-<id>`, sheet 300 ms in / 200 ms out; native `matchedGeometryEffect` / `SharedTransitionLayout`.

### M-NAT-02 The big button should never delete · Clarity · impact H · effort S
- **Now (app):** opening an item already in the basket turns the bottom button into a red "Remove"
  (or "Remove all 8,00 €") where "Add to order" was; one tap removes, no confirm, no undo, and the
  earned offer silently re-locks.
- **Redesign:** primary "Update order" (disabled until something changes); "Remove from order" as a
  text button; a 5 s snackbar "Removed Classic Fries ×2 · Undo"; `REJECT` haptic on remove.

### M-NAT-03 Make Add to order feel physical · Feel · impact M · effort S
- **Now (app):** 69 ms first change, no haptic on Add to order, steppers, unlock or remove; only the
  small "+" buttons request one (3/3). Web: bar text at ~463 ms.
- **Redesign:** bar bump 1 → 1.06 → 1 (spring, damping 0.6, stiffness 800) + `CONFIRM`; steppers
  `SEGMENT_TICK` (API 34) else `CLOCK_TICK`; web: show the bar ≤ 100 ms after the tap.

## 4b. Motion & transitions

Web matrix (`evidence/experience-director/transition-matrix.md`): **6 hard cuts in 17 rows, 1 blank
frame (173 ms, item cold open, 1/8)**. Worst 3, re-recorded by the verifier: tile → list (cut 12/12),
item-modal interrupt (Escape lost 4/4), city → venue (sign-in sheet cuts in 3/3 at 1.7–2.9 s). App
(`evidence/native-android/transition-matrix.md`): Restaurants and venues open on a white spinner page
for ~0.5–1.0 s although content was ready at 91 ms with animations off; reduced motion turns
transitions into cuts (good) but the Home video carousel keeps playing.

| Transition | Now | After |
|---|---|---|
| Tile → list | 1.06–1.45 s no change, hard cut | pressed 100 ms + view transition |
| Card → venue | ~1.1 s dead, skeleton cut, sheet cut | shared element card → hero, spring 0.4 s, no sheet |
| Item card → modal | ~720 ms cold, not interruptible | open from card data, 300 ms, Escape wins |
| Add → bar | text ~463 ms | ≤ 100 ms optimistic + bump |
| Steppers | 27–107 ms, pop 335 ms | keep (benchmark) |
| Basket → checkout | hard cut to a wall | sheet over the basket |
| Search open | `margin-right` 400 ms, blank dim page | `transform` 200 ms + suggestions |

## 4c. Borrow & adapt (Uber Eats, Apple)

Long version: `borrow-from-apps.md`. Top 5: (1) Uber Eats' promotion as a line in the total → M-02;
(2) Uber Eats' persistent cart → resume card; (3) Apple's sheet over context → sign-in over the basket;
(4) Apple's shared-element zoom → card → venue / item; (5) Apple's undo-on-delete → M-NAT-02.
Keep Wolt's restraint: Wolt+ appears to guests only as a filter chip.

## 4d. Reward layer

**Web:** 4 rewarded beats per guest order run (7 actions, ~9 s), all visual; 0 sounds, 0 vibrations
(expected on web). **App:** 5 beats, all visual; haptics only on small "+" buttons; no UI sounds.
Longest dead stretch: tile → list (web), the spinner holes (app). Benchmark Uber Eats: not recorded.

| Moment | Ack (verified) | Tier now → target | Note |
|---|---|---|---|
| Card stepper + | 100–107 ms incl. 50 ms press hold | 1 → 1 | keep |
| Basket stepper + | 27–41 ms, pop 335 ms | 1 → 1 | keep |
| Add to order | press 32–42 ms, bar 463 ms | 1 → 1, faster | M-NAT-03 |
| "Deal applied · €0 delivery" | ripple ~1–1.8 s | 2 → 2 | new-users-only, shown to every guest |
| Crossing €12 | web: none · app: burst, not applied | 0/untrue → 2, true | M-02 / M-NAT-01 |

**Red lines (verified):** R2 provisional pass on web (fee not visible to a guest), the app's unlock is a
celebration the total doesn't contain → handled as P1 trust finding F-NATIVE-01 (the total is honest,
so not a hidden charge) · R3 pass · R5 pass · R10 pass · R11 disclosure gap (P2), not a fail ·
R12 pass ("Closing soon" true where checked) · R1, R4, R6, R7, R8, R9 n/a.

## 5. Clarity map
- Cookie sheet: the reject option is the faintest control.
- Restaurants tile: 1–1.5 s of nothing; rarely an error page.
- Venue arrival (web): "Log in or sign up to start ordering", untrue for guests.
- Offer: "Add €1.5 more" vanishes at €12 with no unlocked state; conditions hidden.
- Order details: Delivery and Pickup both struck through, no reason [night, needs a daytime check].
- Checkout (web): a wall with no close and no order context.
- "Continue order? No / Yes": No deletes the basket.
- App: address shown as GPS coordinates; "Search" tap doesn't focus the field.

## 6. Pull plan
Hook trace (guest): occasion → browse, add → the deal pill → **investment: a saved basket that triggers
nothing** (invisible on web, lost on app relaunch); notifications never requested in the app. Habit
zone: weekly at best → no streaks; ritual and utility triggers.
- **P-01 Resume card** (Must-do 3, B-01). **P-02 Guest favourites on the device.** **P-03 Honest offer
  progress** (Must-do 2). **P-04 "Open late near you"** row at night with real hours, never
  alcohol-first. App: the notification ask after the first order (B-03), a weekly "your usual" push at
  the user's past order hour, ≤ 1 a week, quiet hours 22–07.

## 7. Emotional journey
Pressured (cookie sheet) → oriented (city page) → unsure, sometimes alarmed (tile tap; **worst**) →
interrupted (arrival sheet) → appetite and acknowledgement (item, add, "Deal applied"; **peak**) → in
control (steppers) → nothing (crossing €12, a missed peak) → stopped (account wall; **end**). In the app
the peak is real (the unlock burst) and the ending contradicts it (the €5 isn't in the total).

## 8. Benchmark gap
Uber Eats shows a promotion as a line in the total and keeps the cart visible; Apple keeps context under
a sheet and offers undo on delete. Wolt's own app beats wolt.com on the guest path; the website should
copy the app's honest checkout summary.

# Part 2: Fix (P0/P1 only)

No open P0 (F-NATIVE-01 verified P0 → P1).

1. **Cookie sheet visual interference** (F-FT-02 = F-EXP-01 = F-VISUAL-CRAFT-03) · reject is a 144×24
   grey text button, "Allow" a 326×46 saturated fill at weight 700 (4.3× the area) in a blocking modal ·
   fix: equal-weight buttons · effort S · verified (low end of P1: copy honest, reject one tap, 5.3:1).
2. **Pre-ticked marketing consent** (F-NATIVE-03, app) · push and email "from Wolt and its partners"
   ticked before input, Terms unticked; boxes lack TalkBack labels · fix: unticked by default, labels ·
   effort S · verified from two captures 24 min apart.
3. **€5 celebrated, not applied** (F-NATIVE-01, app) · see M-NAT-01 · effort M · verified at a second venue.
4. **Leaving the app wipes the guest** (F-NATIVE-04) · Back from Home + relaunch → onboarding, cart and
   address gone, no process restart · fix: persist the guest session · effort M · verified by the orchestrator.
5. **Carts tab broken** (F-NATIVE-05) · "Shopping carts" errors 2/2 with a cart present; "Order again"
   blank · effort S–M · verified.
6. **Desktop search traps Tab** (F-AP-01, WCAG 2.1.2/3.2.1) · tabbing onto search opens an unnamed dialog
   and Tab cycles logo → search → Close until Esc · fix: open on Enter/click, name the dialog, release
   focus · effort S · verified 4/4.
7. **19 unnamed cuisine links** (F-AP-02, WCAG 2.4.4/4.1.2) · off-screen carousel tiles render as empty
   links · fix: `aria-label="{name}, {n} places"` on every tile link (not from the h3; there isn't one)
   · effort S · verified (cause corrected by the verifier).

## 10. What's genuinely working
- Steppers: 27–41 ms, a 335 ms count pop, no lost taps in 10 fast taps.
- The app's guest checkout shows item subtotal, service fee, delivery, discounts and total before any account.
- No fake urgency; "Closing soon" matched the venue's hours; sponsored items labelled (~5.3:1).
- A real design system: type scale, 4 px grid, three-tier tokens, one action colour at 7.6:1, real dark theme.
- The app respects Remove animations for transitions and scales text to 200% without truncation.

## 11. Not checked
Everything signed in (payment, fees on the final screen → the drip-pricing question, tracking, ratings,
favourites, Wolt+, referrals); real orders and pushes; iOS app; real devices (haptic feel, 120 Hz);
VoiceOver/TalkBack by a person (trees and a11y-report only); field performance (CrUX quota); daytime
behaviour (run at 02:30–04:00, venues closing); Uber Eats benchmark recordings; the restaurant list for a
guest without an address (redirects); the desktop checkout wall and favourite-heart wall (verifier).

## 12. Appendix

**P2:** F-FT-01 checkout wall with no close (P1 → P2) · F-FT-03 (= F-EXP-07) "No" deletes the basket ·
F-FT-04 no fees before the account (web) · F-FT-05 Delivery/Pickup struck through [night] · F-FT-06 (=
F-EXP-03) untrue arrival sheet · F-FT-07 nothing waits on day 2 · F-EXP-02 tile dead time + rare error ·
F-EXP-04 offer conditions hidden, silent at €12 · F-EXP-05 (= F-AP-10) cold item open ~720 ms ·
F-VISUAL-CRAFT-01 faint "Show details" / "(1% vol)" (P1 → P2) · F-VISUAL-CRAFT-02 landing hero ~2:1
(P1 → P2) · F-AP-03 basket 97 Tab stops away, no "added" announcement · F-AP-04 focus left behind the
wall · F-AP-06 no focus ring on modal −/+ · F-AP-07 stacked modals on desktop first visit · F-AP-08
checkout sinks at 200% zoom / landscape · F-AP-09 lab perf (venue LCP 23.8 s simulated, 2.5 s
unthrottled; TBT 2.87 s) · F-AP-12 "Add one more" ×45 · F-NATIVE-02 "Remove" in the primary slot (P1 → P2)
· F-NATIVE-07 spinner holes · F-NATIVE-08 TalkBack "Add one" ×6, screen behind sheets reachable ·
F-NATIVE-09 raw GPS address · F-NATIVE-10 ambiguous "Cancel" on Continue order · F-NATIVE-11 register
wall forgets the order · F-NATIVE-12 Home jank, carousel ignores Remove animations.

**P3:** F-EXP-06 desktop offer pill covers cards · F-EXP-08 search opens on a blank dim page ·
F-VISUAL-CRAFT-04 removed venue (P2 → P3) · F-VISUAL-CRAFT-05 closed venue's see-through sticky bar
(P2 → P3) [night] · F-VISUAL-CRAFT-06…09 desktop basket gap, 72 px band, proportional digits, "Popular"
in the CTA fill · F-AP-05 focusable hidden input (rejected as a P2; P3 markup) · F-AP-11 status badge
overlay on white photos (P2 → P3) · F-AP-13 grouped · F-NATIVE-06 haptics inconsistent (P2 → P3) ·
F-NATIVE-13 Search tap doesn't focus · F-NATIVE-14 200% text breaks mid-word · F-NATIVE-15 not 16 KB
page-size compatible (engineering) · F-FT-08/09 small rough edges.

**Rejected or corrected by verifiers:** F-NATIVE-01 P0 → P1 (checkout total honest; the pill never says
"applied"); F-NATIVE-06 "0 haptics" (the "+" buttons request one; the auditor's log was empty because
`adb` wasn't on its PATH); F-AP-05 focus "0% change" (a ring does show); F-AP-11 badge contrast measured
on white instead of the photo; F-AP-02 cause (carousel empties off-screen tiles, not a missing h3);
"0 blank frames" (1 of 8 cold item opens); error flash "2 of 10" (2 of 34 overall); legal wording on
cookie prominence (CNIL equal level, EDPB case by case); B-02 order counts failed the Black gate (moved
to Good to have).

**Coverage:** experience-director 12/13 screens, 19 transitions · first-timer 9/9 guest screens, flash
test Wolt 72 vs Foody 58 · visual-craft 11/12 screens at 2 sizes and 2 themes · access-perf journeys 1–2
by keyboard, trees, 6 Lighthouse runs · native-android journeys 1–3, a11y-report, font scale, jank,
reduced motion, dark · 4 verifiers: 49 items, 0 outright rejections of a finding, 4 sub-claims
rejected, 8 severity changes, 9 duplicates merged.

**Nielsen /40:** 26, the orchestrator's estimate from the verified findings (visibility 2, match 3,
control 2, consistency 3, error prevention 2, recognition 3, flexibility 3, aesthetic 3, recovery 2,
help 3).

**Calibration notes for the skill:** `summary.md`.
