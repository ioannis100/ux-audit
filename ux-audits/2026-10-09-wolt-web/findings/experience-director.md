# experience-director — findings
Coverage: 12 of 13 inventory screens/states visited, 19 transitions recorded (17 matrix rows plus 2
repeats). Visited: city page (first visit + cookie sheet, scrolled to the footer, return visit),
Restaurants list, search (empty + "burger"), "See all" (`/quickest-delivery-venues`), venue
(Delulu, plus McDonald's via a card), guest sign-in sheet, item modal (options, quantity), after
add (bar, offer pill), basket sheet (steppers, upsell grid), Go to checkout → account wall, deal
"Show details", favourite heart (guest), "Continue order?" return modal, desktop venue → basket.
Not reached: everything signed in (checkout totals and fees, payment, tracking, ratings, saved
favourites, Wolt+ membership), dark theme, the Foody flash test, an Uber Eats benchmark recording.
Viewports/devices: 390×844 @2x touch, light forced (headless Chrome, puppeteer-core); 1440×900 once
for venue → basket. Run between 02:30 and 03:30 Cyprus time. **Closure-dependent observations are labelled [night]**:
"Closing soon" badges, the "closing at 03:00" toast, "Schedule order · Opens …" cards, closed items in
search, and the R12 truth check. A daytime pass would show fewer of these. Screenshots come from headless Chrome, not the built-in browser.
Evidence: `evidence/experience-director/` (scripts `*.mjs`, screenshots `j*/d-*`, `motion/`,
`transition-matrix.md`, `reward-measurements.md`, `*-results.json`).

**Calibration note for the skill:** `capture-motion.mjs` spec mode has no theme option. On this
dark-mode Mac every spec capture would have rendered dark (`theme-check.mjs` → `dark? true`). I ran
the same engine through `recordOnPage` on light-forced pages (`run-motion.mjs`). Add `"theme"` to
the spec.

## North star
Feels like: **Wolt's own calm clarity** (the playbook already holds it up as the food benchmark),
with **Uber Eats'** certainty about price and offers, and **Apple's** restraint and shared-element
continuity. The steppers already feel like Wolt at its best; navigation and the money/offer moments
don't. Moments that decide the feel: card → venue (§3.6), menu browsing (§3.7), item sheet with live
price (§3.5), add → bar (§3.5), basket (§3.5/§3.9), checkout handoff (§3.9), offer progress (§3.12),
return / "your usual" (§3.15).

## Moment map
| # | Journey → moment | Clarity | Feel now (/10) | States missing | Benchmark | Evidence |
|---|---|---|---|---|---|---|
| 1 | J1 first visit → cookie sheet | **gap** (reject is the faintest control) | 3 | equal-weight reject | §5, emotional.md gate | `j1-01-city-first-visit-cookie-light.png`, `cookie-check.mjs` |
| 2 | J1 city page first screen | ok: tiles, then a promo banner, then carousels; ~70 px empty band under the address row | 6 | — | §3.1 | `j1-02-city-after-cookie-light.png` |
| 3 | J1 tap Restaurants tile | **gap**: 1.1–1.9 s with no visible response; error page in 2 of 10 attempts | 2 | pressed, busy | §3.7 | `motion/tile-restaurants-to-list-run1-filmstrip.png` |
| 4 | J1 search open / type | ok when typing; the empty state is a blank dimmed page | 6 | empty-state suggestions | §3.7 | `j1-12…`, `j1-13…`, `motion/search-open-filmstrip.png` |
| 5 | J1 carousel card → venue | ok; ~1.1 s dead, then skeleton, then content, then a sheet cuts in | 3 | pressed, shared element | §3.6 | `motion/city-to-venue-filmstrip.png` |
| 6 | J2 venue arrival → sign-in sheet | **gap**: "Log in or sign up to start ordering" although a guest can order up to checkout | 3 | — | §3.2 | `j2-01…`, walk2 log: menu at 4,949 ms, sheet at 5,384 ms |
| 7 | J2 item card → modal | ok; ~650 ms dead, not anchored, Escape lost in that window | 4 | pressed | §3.6 | `motion/item-modal-open-*`, `item-modal-interrupt-*` |
| 8 | J2 options + quantity, live price on the button | ok: "Add to order €10.50" → "€21.00" at qty 2 | 8 | — | §3.5 | walk2 log |
| 9 | J2 Add to order → bar | ok | 6 | — | §3.5 | `motion/add-to-order-filmstrip.png` |
| 10 | J2 card / basket steppers | ok | 8 | — | §3.5, Wolt "quantity jump" | `motion/reward/*`, `reward-results.json` |
| 11 | J2 offer progress (€5 over €12) | **gap**: crossing the threshold is silent; terms say "SELECT AT CHECKOUT" | 4 | success / unlocked | §3.12 | `j2-09-over12-offer-light.png`, `checks-results.json` |
| 12 | J2 basket sheet | ok; checkout button looks disabled for ~700 ms; the upsell grid pops in late | 6 | — | §3.6 | `motion/bar-to-basket-filmstrip.png` |
| 13 | J2 Go to checkout → wall (end) | **gap**: a hard cut to a full-screen account wall that never mentions the order | 3 | — | §3.9 | `motion/basket-to-checkout-wall-filmstrip.png`, `j2-08…` |
| 14 | J3 return to city with a saved basket | **gap**: no trace of the basket on the city page or in the header | 3 | resume entry | §3.15 | `j3-04…`, `checks-results.json` (`cityHeaderCartish: []`) |
| 15 | J3 back into the venue | ok: "Continue order? No / Yes" restores it; "No" discards it without saying so | 6 | — | §3.15 | `j3-06-venue-return-light.png` |
| 16 | J3 favourite heart (guest) | ok (clear wall) | 3 | optimistic fill | §3.4 | `j3-07…`, `motion/venue-favourite-guest-*` |
| 17 | Desktop venue → basket | ok; the floating offer pill (400×48 at y 836) covers the item cards under it | 6 | hover on item cards (no computed change) | §3.6 | `d-0*.png`, walk4 log |

## Motion table (from the transition matrix)
Headline: **6 hard cuts across 17 rows, 0 blank frames, 3 dead waits over 0.6 s.** Worst three:
tile → list (2), item-modal interrupt (3), city → venue (3). Full matrix:
`evidence/experience-director/transition-matrix.md`.

| Element / transition | Now (measured) | After (spec) | Why |
|---|---|---|---|
| Category tile → list | first visible feedback 1,081–1,918 ms; hard cut to skeleton; error page for ~1.2 s in 2/10 | `:active` scale .97 100 ms `cubic-bezier(.2,0,0,1)` [S M3]; keep the old screen, `startViewTransition` around the route push; skeleton ≤ 100 ms after paint | §3.7, motion.md "route without a hole" |
| Venue card → venue | ~1.1 s dead, skeleton cut, content 1.6–2.0 s, sheet cut 2.25 s | shared element card image → hero, spring 0.4 s, bounce 0 [S]; no sheet on arrival (F-EXP-03) | law 3, §3.6 |
| Item card → modal | 42 ms faint change, modal at 694 ms, slide ~120 ms from the screen edge, image later | open on pointer-up from data already on the card; image grows from the card, 300 ms `cubic-bezier(.2,0,0,1)` | law 2, §3.6 |
| Modal open + Escape at 100 ms | not interruptible: modal still opens at 968 ms | abortable open; Escape/back always wins | motion.md interruptible |
| Add to order → modal close | modal leaves in 1 frame (74.9% of the screen at 408 ms) | sheet exit 200 ms `cubic-bezier(.3,0,.8,.15)` [S M3 accel] while the bar bumps | motion.md exits |
| Add → bar arrives | bar text at 442–455 ms; slide 645–827 ms | bar visible within 100 ms of the tap (optimistic), bump 1 → 1.06 → 1 250 ms [H] | §3.5, law 2 |
| Bar → basket sheet | 205 ms, 300 ms `cubic-bezier(.1,.8,.2,1)`; checkout button pale until ~709 ms; grid fades in ~850–990 ms | render the button at full contrast from frame 1; reserve the grid's height (skeleton) | §3.6 |
| Basket → checkout | hard cut at ~129 ms to a full-screen wall | sign-in as a sheet over the basket (M-04) | §3.9 |
| Back to city | 568 ms, hard cut | `@view-transition { navigation: auto }` 180/260 ms fade + 16 px slide | motion.md |
| Search field expand | `margin-right` 400 ms (layout property) | `transform: scaleX` or a clip-path reveal, 200 ms | motion.md "transform and opacity only" |
| Steppers (card / basket) | 15–53 ms; pop 335 ms; total overshoot 225 ms | keep | already benchmark-level |

## M-01 "I tapped Restaurants and nothing happened, then an error flashed" · Clarity gap + Feel gap · impact H · effort M
- Now: on a tile tap the screen does not visibly change for 1,081–1,918 ms (first-change values of
  1–122 ms are a few pixels). It then hard-cuts to a skeleton and loads the list 3.0–3.9 s after the
  tap. In 2 of 10 attempts the error page "Argh, something went wrong! … Go back to discovery" filled
  the screen from ~700–844 ms to ~2,100 ms and then recovered by itself
  (`motion/tile-restaurants-to-list-run1-filmstrip.png`, `…-reduced-run1-…`; 0 of 5 in
  `checks-results.json`, 0 of 1 in walk3).
- Feels like: "did it register? … it broke … oh, it worked." The user taps twice or backs out.
- Benchmark: Uber Eats and Wolt's own native app keep the previous screen and show a pressed tile
  (§3.7: skeleton within 100 ms; never a fake or intermediate error).
- Redesign: pressed state on every tile and card; keep the city page until the list route has data,
  then transition; never render the error route while a retry or the first fetch is still pending.
- Spec: tile `:active` scale .97 / opacity .9, 100 ms `cubic-bezier(.2,0,0,1)` [S]; skeleton by
  100 ms after paint if the data is late; crossfade skeleton → list 150–200 ms.
- Web: `tile.addEventListener('click', e => { e.preventDefault(); document.startViewTransition?.(() => router.push(href)) ?? router.push(href); })`
  with `::view-transition-old(root){animation:180ms cubic-bezier(.4,0,1,1) both fade-out}`
  `::view-transition-new(root){animation:260ms cubic-bezier(.2,0,0,1) both fade-in}`.
- Remove: the error state as a transitional render.
- Requires: F-EXP-02.
- Reduced motion / 100th use: a crossfade of ≤ 150 ms; it is a pure speed cue, so it still feels
  right on the 100th use.
- Why it works: Doherty threshold; law 2 (never make the user wait without a sign).
- Never: a fake minimum loader.

## M-02 "I passed €12 and nothing told me I'd earned the €5" · Clarity gap · impact H · effort S
- Now: below the threshold the pill says "€5 off on orders over €12 · Add €1.5 more" (correct
  distance). At €14.50 and later €84.00 the "Add" line just disappears. Nothing says "unlocked", the
  €5 is in no total ("Go to checkout €84.00"), and the pill rotates to "Deal applied · €0 delivery
  fee". The terms say "For new users with a local phone number … ***SELECT AT CHECKOUT*** Valid for
  14 days from registration" (`reward-measurements.md`, `checks-results.json`).
- Feels like: at the moment I earned something, the product goes quiet, and I may never learn I have
  to select it.
- Benchmark: goal-gradient payoff (§3.12, reward.md §2 ingredient 4); Uber Eats shows the promotion
  as a line in the total.
- Redesign: at the crossing, the pill turns to the success state: "✓ €5 off unlocked · select it at
  checkout · new customers". In the basket, add a line "€5 off (applied at checkout if eligible)
  −€5.00" with the eligibility text. If the user isn't eligible, the nudge never says "Add €1.5 more".
- Spec: tier 2 (reward.md §3): pill fill from neutral to green 300 ms `cubic-bezier(.2,0,0,1)`,
  check icon `scale` .6 → 1 with overshoot 250 ms (reuse the existing `offerAssistantIconBounce`);
  the basket total rolls with `tabular-nums` over 300 ms. Native: `.sensoryFeedback(.success)` /
  `CONFIRM`.
- Web: `pill.animate([{background:'var(--surface)'},{background:'var(--success-weak)'}],{duration:300,easing:'cubic-bezier(.2,0,0,1)',fill:'forwards'})`.
- Remove: the silent drop of the "Add" line; the rotation that replaces the €5 message with the
  delivery-fee message at the moment of crossing.
- Requires: F-EXP-04.
- Reduced motion / 100th use: a colour change and the text only. It fires once per order at the
  crossing, so it stays meaningful.
- Why it works: endowed progress → completion; informational copy (reward.md §1.5, §1.6).
- Never: confetti on spending (R3), or "unlocked" for someone who isn't eligible (R11).

## M-03 "I tapped a burger and waited" · Feel gap · impact M · effort M
- Now: item tap → a faint change at 42 ms, then nothing until the modal slides up from the bottom
  edge at 694 ms. The image arrives ~260 ms later. Escape pressed 100 ms after the tap is ignored and
  the modal still opens (`motion/item-modal-interrupt-filmstrip.png`). Closing is good (350 ms
  ease, backdrop 250 ms).
- Feels like: a small hitch on the most-repeated tap of the menu.
- Benchmark: §3.6 shared element (Airbnb, Photos); law 3.
- Redesign: open the sheet on pointer-up with the card's own data (name, price, image are already
  in the DOM). Load option groups inside the open sheet with a skeleton. Grow the card image into
  the hero.
- Spec: `view-transition-name: item-<id>` on the card image and the modal image; sheet 300 ms
  `cubic-bezier(.2,0,0,1)`, exit 200 ms; option skeleton ≤ 100 ms.
- Native: `.matchedGeometryEffect(id: item.id, in: ns)`; Compose `SharedTransitionLayout`.
- Remove: the network-gated open.
- Reduced motion: a 150 ms fade-in of the sheet.
- Never: hide where the content came from.

## M-04 "Go to checkout ends my evening on a login wall" · Clarity gap + end of journey · impact H · effort M
- Now: a hard cut (~129 ms) to a full-screen "Create an account or log in" that never mentions the
  basket. The venue sheet earlier said "Log in or sign up to start ordering", which isn't true: I
  ordered up to here as a guest.
- Feels like: the work I just did disappeared; this is the worst moment and it is also the end.
- Benchmark: §3.9 / §3.2 (value before account; an Apple-Pay-style express path; Baymard: forced
  accounts drive 18% of abandonment).
- Redesign: present sign-in as a sheet over the still-visible basket, titled "Sign in to send your
  €10.50 order to Delulu", with "Your basket is saved" under the buttons. Move the venue-arrival
  sheet to this moment instead (F-EXP-03).
- Spec: sheet 300 ms `cubic-bezier(.2,0,0,1)` over a 40% backdrop; the basket summary stays visible
  above the detent.
- Remove: the arrival sheet; the full-screen cut.
- Never: lose the basket on sign-in; pre-tick marketing consent.

## M-05 "I came back and the app forgot my basket (it didn't)" · Clarity gap / pull · impact H · effort S
- Now: after adding an item and returning to the city page, there is no basket entry anywhere
  (`cityHeaderCartish: []`, `j3-04…`). The basket only shows up again inside Delulu as a "Continue
  order?" modal with "No / Yes"; "No" discards it without saying so.
- Redesign: P-01 below. In the modal, rename the buttons "Start a new order" / "Continue (1 item ·
  €10.50)".
- Never: auto-submit or auto-add.

## Reward layer
Density: **4 rewarded beats per guest journey-2 run (7 actions, ~9 s of interaction)**. The longest
dead stretch inside the loop is item tap → modal, ~650 ms. Outside the loop: tile → list,
1.1–1.9 s. The run ends on an account wall. Benchmark Uber Eats: **not recorded**.

| Action / moment | Frequency | Ack now (ms, measured) | Channels now V/H/S | Progress shown | Next reward named | Tier now → target | Red-line tests | Gap → fix |
|---|---|---|---|---|---|---|---|---|
| Card stepper + | every add | 20–48 visual (n=5) | V / – / – | count + bar total | — | 1 → 1 ✓ | — | keep |
| Basket stepper + | frequent | 15–53 visual (n=4) | V (overshoot on the total) / – / – | total | — | 1 → 1 ✓ | — | keep |
| Add to order (modal) | every item | press 34–47; bar text 442–455 (n=2) | V / – / – | bar count | €5 line ("Add €1.5 more") ✓ | 1 → 1, faster | R3 pass | M-03 |
| First add → "Deal applied · €0 delivery fee" | once per run | pill + green ripple 1,049–1,770 ms | V / – / – | — | — | 2 → 1–2 ✓ | R2 provisional pass (fee with an address not visible to a guest) | — |
| Crossing €12 | once per order | **none** | – | the "Add" line disappears | ✗ | 0 → 2 | R11 conditions one tap away; not in the nudge | **M-02** |
| Favourite heart | rare | 42 → account wall | V | — | — | 0 → 1 (local favourite) | — | P-02 |
| Go to checkout (end) | once | hard cut to the wall | V | ✗ | ✗ | negative → 1 (calm handoff) | R7 n/a (no countdown) | **M-04** |
Sound 0, vibrate 0 across all runs (web; expected, and fine: reward.md §4 says no web haptics on
iPhone).

Red-line results:
- R1 near-miss: n/a, no chance reveals.
- R2 loss disguised as a win: provisional pass. The only celebration is "€0 delivery fee"; every
  guest listing shows €0.00 delivery and I couldn't see the fee with an address.
- R3 celebrating spending: pass on what was reached. The ripple celebrates a deal, not the add;
  checkout was not reached.
- R4 paid randomness: n/a.
- R5 stopping cues: pass. The city page ends in the footer (5,318–5,604 px); the autoplaying
  discovery videos have a pause control.
- R6 credits: n/a for guests.
- R7 speed-ups on money: n/a, checkout not reached; no countdowns on the basket.
- R8 fake control: n/a.
- R9 sticky exits: n/a (Wolt+ cancel not reachable).
- R10 forced gamification: pass.
- R11 opaque bonus: pass on the ratio (€12 for €5, 2.4×; terms one tap away), **partial on
  disclosure**: the nudge omits "new users only, select at checkout" (F-EXP-04, P2).
- R12 guilt: pass. No guilt or urgency copy. A grep for only/left/hurry/ends in/limited on the city
  page and venue returned 0. "Closing soon" [night] is true: venue "Closes at 03:00" and a toast "This
  restaurant is closing at 03:00. Your order may not be accepted." at 02:47 local.

Top 3 missing micro-rewards:
1. **€5 unlocked** (M-02): tier 2, spec above. 100th use: once per order, fine.
2. **Optimistic bar on Add** (M-03 companion): the bar shows the new count within 100 ms of the tap
   (today 442–455 ms), with a bump of 1 → 1.06 → 1 over 250 ms [H].
   Web: `bar.animate([{transform:'scale(1)'},{transform:'scale(1.06)'},{transform:'scale(1)'}],{duration:250,easing:'cubic-bezier(.2,0,0,1)'})`.
   Native: `.contentTransition(.numericText())` on the count + `.sensoryFeedback(.impact(weight:.light))`.
   Reduced motion: count change only. 100th use: tier 1, silent, fine.
3. **Local favourite for guests** (P-02): the heart fills on frame 1, scale 1 → 1.2 → 1 over 400 ms
   [H, §3.4], saved to `localStorage` and merged on sign-in. Toast: "Saved on this device · sign in to
   keep it everywhere". Reduced motion: fill only.

## Pull plan
Hook trace (guest web): trigger = an occasion (hunger, a late night, a search) → action = browse,
add → reward = the food (not reached) and the deal pill → **investment = a basket saved per venue,
which loads no trigger**. It is invisible on the city page and favourites are walled.
**Missing link: investment → next trigger.**
Habit-zone verdict: food recurs weekly at best → no streaks. Use ritual and utility triggers.

- **P-01 Resume card** · city page, first row under the tiles · "Your basket at Delulu · 1 item · €10.50 ·
  Continue" + "Clear" · benchmark: Domino's "Your usual" / Uber Eats cart · spec: a card that fades
  in 200 ms, one tap to the venue with `?cart=open` · metric: basket recovery rate · ethics: never
  auto-order; one-tap clear.
- **P-02 Guest favourites** · the heart works locally (see the reward layer) and builds a "Your places" row on
  the city page · benchmark: Airbnb wishlist §3.4 · metric: guest return visits, then sign-up after
  the 2nd favourite · ethics: say "on this device".
- **P-03 Honest offer progress** · M-02 · metric: offer redemption · ethics: eligibility in the same line.
- **P-04 "Open late near you" ritual row** · night hours only, using real opening times (Wolt already
  has "Late night groceries") · benchmark: Discover Weekly's fixed slot §3.15 · metric: late-session
  conversion · ethics: no alcohol-first ordering of the row; no countdowns.
- Share-worthy moment: none reachable as a guest on web. The candidate is Wolt's delivered/arrival
  illustration moment (signed in, not audited).

## Borrow & adapt (short; long version: `borrow-from-apps.md`)
| App | Mechanic | As-is fits? | Our version | Don't copy |
|---|---|---|---|---|
| Uber Eats | upfront price | translate | "€5 off unlocked · applied at checkout" line in the bar and basket (M-02) | fees after the commit button |
| Uber Eats | cart badge / order again | translate | resume card on the city page (P-01) | auto-add, pre-ticked extras |
| Uber Eats | Uber One | keep Wolt's restraint | Wolt+ only as a filter chip for guests (observed); saving shown at checkout | membership upsell between add and basket |
| Apple | shared-element zoom | yes | card → venue, card → item (M-01/M-03) | zoom on the steppers |
| Apple | calm Pay check | yes (signed-in) | 300–400 ms check, order number + ETA range | confetti on payment |
Top 5: (1) €5 unlocked line, (2) resume card, (3) sign-in sheet over the basket, (4) shared element +
pressed states, (5) local guest favourites.

## Black recommendations
Some people consider the techniques below unethical: they work through loss aversion and social
pressure, not through a better product. Top apps use them. Each is listed with its risk so the
owner can choose knowingly, and each passed the black-ux.md §2 gate as adapted here.

B-01 "Your basket at Delulu is waiting · Delulu closes at 03:30"
- What top apps do: Domino's / Uber Eats cart reminders; Duolingo's true-deadline framing.
- For this product: the P-01 resume card adds the venue's real closing time when it is ≤ 60 min away.
  It shows on the city page only, never as a push to guests, and only when the basket is non-empty.
- Why it works: loss aversion on the user's own unfinished order + a true deadline · [PR] Kahneman &
  Tversky; goal gradient.
- Why it's black: urgency late at night can push an order someone half-abandoned on purpose.
- Risk: fake urgency is illegal (EU Omnibus, FTC). This one is true (verified: closing times match
  the venue page and its toast).
- Gate: user's goal ✓ (their own basket) · true ✓ (real closing time) · easy out ✓ ("Clear" on the
  card) · not for the vulnerable ✓ (off for baskets with alcohol or Adults Only items) · guardrail:
  basket-clear rate and cancelled/refunded orders after 00:00.
- Test: A/B card with vs without the closing line; win = basket recovery; harm = late-night refunds,
  clears · confidence medium.

B-02 Real item popularity ("Ordered 140 times this week")
- What top apps do: counts on items, not people (Instagram, Uber Eats "Popular").
- For this product: replace the unexplained "Popular" badge with a true count on the 3 most ordered
  items per venue.
- Why it works: social proof on items · [PR] Sherman 2016 (reward of social signals).
- Why it's black: herding; it can bury new or small dishes.
- Risk: fake counts are illegal; the counts must come from real orders.
- Gate: user's goal ✓ · true ✓ (order data) · easy out ✓ (no pressure copy) · vulnerable ✓ (not on
  alcohol or Adults Only) · guardrail: dish-level refund rate.
- Test: A/B count vs badge; win = time to first add; harm = complaints · confidence low (I couldn't
  verify what "Popular" is based on).

Persuasion Wolt already uses, judged with black-ux.md §5:
- **"Closing soon" / closing toast [night]:** true, not a finding.
- **"Add €1.5 more" near-goal nudge:** distance true; conditions omitted → P2 content (F-EXP-04). The
  fix keeps the lever.
- **"Deal applied" ripple:** fine (R2 provisional).
- **Cookie sheet:** fails the gate → P1 (F-EXP-01).
- **Arrival sign-in sheet:** inaccurate copy ("to start ordering") → P2 (F-EXP-03); recommend an A/B
  that moves it to checkout.

Never recommended here: fake "Closing soon" or countdowns that reset; "only 2 left" on dishes without
stock data; drip pricing (a basket total that leaves out service or delivery fees added after
"Go to checkout": **unverified here**, as the guest basket shows "Go to checkout €10.50" and the
terms mention a service fee; needs a signed-in pass); confetti on placing an order (R3); prize draws
tied to spending (R4); shaming the decline on the cookie sheet or the wall.

## Emotional journey (guest, phone)
1. Open → the cookie sheet: **mildly pressured** (Allow is the big blue button, reject is grey text).
2. City page → **oriented**: tiles, a promo, carousels.
3. Tap Restaurants → **unsure** (1–2 s of nothing), sometimes **alarmed** (error page). ← worst moment
4. Card → venue → **interrupted**: "Log in or sign up to start ordering" over a menu that just painted.
5. Item → **appetite**, live price on the button. Add → **acknowledged** (bar, "Deal applied" ripple). ← peak
6. Steppers → **in control** (instant).
7. Cross €12 → **nothing** (missed peak).
8. Go to checkout → **stopped**: full-screen account wall. ← end
Peak: the first add's deal ripple. Worst: the tile tap (M-01). End: the wall (M-04).
Redesign the end first: the order stays visible, the sign-in is framed as sending it.

## F-EXP-01 [P1] Cookie sheet makes "Use only necessary" the faintest option
- User experiences: two large blue buttons ("Manage", "Allow") and a small grey text line for
  rejecting.
- Where: first visit, any page → cookie bottom sheet.
- Evidence: `j1-01-city-first-visit-cookie-light.png`; `cookie-check.mjs`:
  - "Use only necessary": text only, `rgb(111,107,104)` on a transparent background, 144×24 px;
  - "Manage": `rgb(220,247,255)` fill, 326×46;
  - "Allow": `rgb(102,203,240)` fill, bold, 326×46, at the bottom (thumb zone).
- Why it matters: visual interference (emotional.md gate; EDPB guidance; CNIL fines for unequal
  reject). The tap target is also 24 px tall (below 44 px).
- Fix: three equal buttons, or "Use only necessary" and "Allow" as twin filled buttons of the same
  size and weight (326×46), "Manage" as the text link.
- Effort: S · Confidence: high.

## F-EXP-02 [P2] Restaurants tile: no feedback for 1–2 s and an intermittent error page
- User experiences: the tap seems ignored; sometimes "Argh, something went wrong!" flashes, then the
  list loads on its own.
- Where: city page → `tile-restaurants` → `/stores/category/restaurants`.
- Evidence:
  - feedback: first visible change at 1,081–1,918 ms in 4/4 captures;
  - the error page: 2/10 attempts, ~700–2,100 ms
    (`motion/tile-restaurants-to-list-run1-filmstrip.png`, `…-reduced-run1-…`), 0/5 polled
    (`checks-results.json`), 0/1 in walk3.
  - console error at the time: "Not signed in with the identity provider." (FedCM; probably
    unrelated).
- Why it matters: no feedback for > 1 s breaks the tap → result link; an error page during a
  successful load breaks trust.
- Fix: M-01 (pressed state, keep the screen, never render the error route mid-load).
- Effort: M · Confidence: medium (raise it: a real-phone recording; the error appeared only in
  screencast-recorded runs, which may add timing pressure).

## F-EXP-03 [P2] The venue sign-in sheet says ordering needs an account; it doesn't until checkout
- User experiences: ~435 ms after the menu paints, a sheet covers it: "Log in or sign up to start
  ordering from Delulu Burgers & Shakes".
- Where: the first venue visit of every fresh guest (Delulu 5/5 runs, McDonald's 1/1; not on a
  second visit in the same session, 1/1); desktop too (`d-01-venue-arrival-1440-light.png`).
- Evidence: walk2 log (menu 4,949 ms, sheet 5,384 ms); `j2-01…`; ordering to the basket works
  without it.
- Why it matters: inaccurate copy on a nag, interrupting at the moment of choosing (black-ux.md §5:
  inaccurate → P2); value before account (§3.2).
- Fix: drop it on arrival; ask at "Go to checkout" (M-04). If kept, copy "Sign in to save your basket
  and see delivery fees" and a "Browse as guest" button of equal weight.
- Effort: S · Confidence: high.

## F-EXP-04 [P2] The €5 offer nudge hides its conditions and goes silent when earned
- User experiences: "Add €1.5 more" for €5 off. After adding, nothing confirms it, and the terms say
  it only applies to new users with a local phone number and must be **selected at checkout**.
- Where: venue → offer pill → basket.
- Evidence: `reward-measurements.md` "Offer threshold"; `checks-results.json` `dealDetails`;
  `j2-09-over12-offer-light.png`.
- Why it matters: near-goal pressure must state its terms up front (black-ux.md catalogue, R11). A
  user who never sees "select at checkout" can lose the €5 they spent toward.
- Fix: M-02 (eligibility in the nudge; an "unlocked · select at checkout" state; a line in the basket).
- Effort: S · Confidence: medium (checkout not reached: it may auto-apply there).

## F-EXP-05 [P2] Item modal: ~650 ms dead tap, and back/Escape in that window is ignored
- Evidence: `motion/item-modal-open-filmstrip.png` (modal at 694 ms),
  `motion/item-modal-interrupt-filmstrip.png` (Escape at 100 ms; the modal still opens at 968 ms).
- Fix: M-03. Effort M · Confidence: high on this desktop-class CPU; slower on phones.

## F-EXP-06 [P3] Desktop: the floating offer pill covers menu cards
- Evidence: walk4 `offerPill` 400×48 at (520, 836) on 1440×900, with `horizontal-item-card-button`
  under it; my first card click hit the pill (`d-02-venue-1440-light.png`).
- Fix: dock the pill into the right-hand column next to the header "View order", or give the menu
  bottom padding equal to the pill height + 16 px. Effort S · Confidence: high.

## F-EXP-07 [P3] "Continue order? No / Yes": "No" silently discards the saved basket
- Evidence: `j3-06-venue-return-light.png`, `checks-results.json` `returnModal`.
- Fix: "Start a new order" / "Continue · 1 item · €10.50". Effort S · Confidence: high.

## F-EXP-08 [P3] Search opens onto a blank dimmed page
- Evidence: `j1-12-search-open-light.png`; `motion/search-open-*` (and a `margin-right` 400 ms
  layout animation).
- Fix: recent searches (local) + 6 category chips + "Open now" in the empty state; animate the field
  with `transform`. Effort S · Confidence: high.

## Strengths (only real ones)
- The steppers are benchmark-level: 15–53 ms visual acknowledgement, a 335 ms count pop, an
  overshoot on the total, no lost taps over 10 fast taps, and no network gating.
- The item modal's live price on the button ("Add to order €21.00" at qty 2) and the exact "Add €1.5
  more" distance are honest and clear.
- Restraint: no fake urgency or guilt copy, sponsored content labelled ("Sponsored", 14 px,
  `rgb(111,107,104)` on white ≈ 5.3:1), Wolt+ not pushed at guests, and reduced motion honoured
  for in-screen motion.

## Interaction log
| # | Action | What happened | Time |
|---|---|---|---|
| 1 | open `/en/cyp/limassol` (fresh guest) | load event 2.3 s; cookie sheet | — |
| 2 | "Use only necessary" | sheet closes; city page | — |
| 3 | scroll the city page to the footer | 21 carousels, sponsored at y≈1,519 of 5,318 px; 2 HLS videos autoplay | — |
| 4 | tap Restaurants tile (×4 recorded, ×6 polled) | 1.1–1.9 s nothing; error page 2/10; list at 3.0–3.9 s | 3.0–3.9 s |
| 5 | tap search, type "burger" | blank dim page; results: restaurants + related items | 6 ms first change |
| 6 | tap "See all" | `/quickest-delivery-venues` | — |
| 7 | tap a venue card | skeleton ~1.1 s, content ~1.7–2.0 s, closing toast [night], sign-in sheet 2.25 s | 2.4 s |
| 8 | close the sign-in sheet | 300 ms sheet exit | 0.3 s |
| 9 | tap an item | modal at 694 ms | 1.3 s |
| 10 | qty + / − in the modal | button reads €21.00 / €10.50 | 200 ms each |
| 11 | Add to order | press 34–47 ms; modal cut 408 ms; bar 645–827 ms; "Deal applied" ripple to 1,770 ms | 1.8–2.1 s |
| 12 | card stepper + ×10, − ×5 | all counted, 20–48 ms visual | <0.5 s each |
| 13 | add Classic Fries (card +) to pass €12 | "Add €1.5 more" disappears; no unlocked state | — |
| 14 | open basket (bar) | sheet 300 ms; grid at ~0.9 s | 1.1 s |
| 15 | basket + / upsell + | 15–112 ms; total bounces | <0.7 s |
| 16 | Go to checkout | full-screen account wall at ~129 ms. **Stopped here** | 0.25 s |
| 17 | heart (guest) | account wall | 0.24 s |
| 18 | back to city, reload | no basket trace | — |
| 19 | reopen the venue | "Continue order? No / Yes" → Yes restores "1 View order €10.50" | — |
| 20 | Show details on the €5 deal | terms incl. "new users … SELECT AT CHECKOUT" | — |
| 21 | desktop venue → item → add → basket | sign-in modal on arrival; address popover opens with the item modal; header "View order" top-right; right drawer basket | — |


Selector note (from the orchestrator, applied): `cart-view-button` matches a 0×0 header copy first.
Every bar click in my scripts picks the copy with a non-zero `getBoundingClientRect()`. Every basket
recording's `finalUrl` was checked and stays on the venue with `?cart=open`. One invalid capture was
renamed `INVALID-zero-size-target-*`.
