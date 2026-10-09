# interaction-detail — findings
Coverage: 6/6 screens of journeys 1–2 that a guest can reach (city page, venue, item modal, after-add venue, basket, the checkout sign-in wall, reached once on purpose under a slow network). I went from the city page straight to the venue; the Restaurants list page was not exercised (other agents covered it). Venue: **Thymari Old Port**. Delulu Burgers & Shakes was closed at 16:50 Cyprus time ("Opens at 18:00"): a dish tap there opens an "Order details / Schedule" sheet instead of the item modal (`inv-modal-390-light.png` from the first inventory run) [closed venue]. I covered 24 component types, measured 31 with `sample-motion.mjs` (press, open/close, toggle, count) and checked the state rules of 20 against the CSS (`rules.json`).
Not reached: anything behind sign-in (favourites, checkout, payment, tracking). Never signed in, never typed credentials, no order.
Viewports/devices: headless Chrome, light theme forced. 390×844 @2x touch for the grid, counts, gestures and network states; 1280×800 for hover and press (`:active` needs a mouse without touch emulation). I also ran one reduced-motion pass. No native or device work (the brief keeps the emulator for native-android).
Evidence: `evidence/interaction-detail/` (scripts `*.mjs`, logs `*.log`, `motion/*.sample.json`, screenshots `*-390-light.png` / `*-1280-light.png`).

## Identity tokens read from the product
- **Accent / fills:** primary fill `rgb(102,203,240)` → hover `rgb(86,190,227)` → pressed `rgb(74,177,213)`. Brand surface `#DCF7FF` → `rgb(194,242,255)` → `rgb(153,229,255)`. Brand text `rgb(20,83,103)` → `rgb(14,66,83)` → `rgb(8,48,62)`. Focus ring 3 px `rgb(35,116,143)`. Every interactive token comes in default/hovered/pressed (`--cb-color-…-pressed`, `--al-color-…-pressed`).
- **Radius:** 8 px (lists), 12 px (cards, ~210 per venue), 20 px, full pills (tabs, steppers, icon buttons).
- **Shadow:** stacked 7% layers (`0 4px 6px / 0 8px 12px / 0 16px 24px rgba(0,0,0,.07)`), `--cb-shadow-medium` on the sticky bar.
- **Easing / durations already declared:** cards `cubic-bezier(.45,0,.55,1)`: hover 250 ms to `scale(1.03)`, press 150 ms to `.98` (upsell `.96`). al-Button (Add to order): `scale` 200 ms `cubic-bezier(.2,.6,.4,1)` to `.94`. Stepper icon 50 ms `cubic-bezier(.4,0,.2,1)`. Dialog open 300 ms `cubic-bezier(.1,.8,.2,1)`, close 250 ms. Radio check `zoomIn` 300 ms, press `cubic-bezier(.36,.1,.5,1.9)`. Count pop measured as a spring of ~300 ms with ~50% overshoot. City tiles `scale` 200 ms `ease`. Reduced motion is guarded (`@not (prefers-reduced-motion)`, `transition:none`).
- **Two button families** live side by side: `al-Button` (Add to order) shrinks on press; `cbc_Button` ("View order" bar, "Go to checkout", "Add comment") only darkens, with `transition: none`.

## Detail grid
| Component | Instances | States present | Missing | Measured (ms, curve/spring, styleChanges) | Gap |
|---|---|---|---|---|---|
| Primary CTA "Add to order €x" (al-Button) | 1 per modal | rest, hover (bg), pressed, focus-visible, live price label | busy/success: ~430 ms hold with no state, then the modal cuts out | press `scale` 1→.94 200 ms `ease` (+19 ms), bg `rgb(74,177,213)` +2 ms (`press-modal-submit`); label price updates in the same frame as qty (`B. qty + text`, t=0) | No feedback between the press and the result (ED owns the wait; I measured that it's client time, see D-03) |
| "View order" bar / "Go to checkout" (cbc_Button) | 1 + 1 | rest, hover, pressed (bg only), focus | press scale, bump on change, count/price roll | press: bg only, `transition:none`, +7–25 ms, no geometry (`press-cart-view-button`, `press-basket-checkout`); 5 consecutive "+" → bar, badge, count and price: **no change on the target** in any sample (`plus-bar*.sample.json`) | The money/count surface never moves (D-05); press language differs from Add to order (D-06) |
| Quick "+" on dish cards (div role=button) | 45 per venue + 20 upsell | desktop hover only (card lifts 1.03, + tint) | **pressed: none**. On desktop, pressing *removes* the hover lift and tint | `stateDiff`: hover → press = card `1.03 → 1`, + bg `rgb(194,242,255) → rgb(220,247,255)` (back to rest) (`plus-card.mjs`); CSS press rule `.i6jerpd:active:enabled svg{scale(.8)}` never matches a `div` (`probe-stepper.log`: `enabledMatches:false` ×23) | F-DET-02, D-01 |
| Item card (row) | ~45 | hover lift 1.03 + shadow (≥640 px), pressed .98, focus | source-anchored open; on phones, an SPA open | press .98 150 ms ease-in-out, +15 ms (`press-venue-item-card`) | Phone: first open is a full page load (F-DET-01, D-02) |
| Card counter (collapsed "1" badge → − n +) | 1 per added dish | collapsed badge, expands on tap, stays expanded | count pop (the modal and the basket have one) | "+" → value 2 at +9 ms, **no motion** (`plus-card-count.sample.json`) | D-05 |
| Modal quantity −/+ (real buttons) | 2 | hover 1.08, pressed .8, value pop | — | press scale 1→.8 50 ms (+4 ms); value pop spring 317 ms, ζ0.22, ~50% overshoot (`modal-qty-value`) | Benchmark-level, keep |
| Basket line stepper | per line | value pop, live totals | undo on "Remove item"; announcement | value pop out 133 ms / back 167 ms; total, line cost and CTA price change at +4–11 ms, no roll (`basket-plus-value`) | F-DET-03, D-04 |
| Option radio | per group | pressed .9 (overshoot curve), check zooms in, focus | — | press 200 ms spring-like (25% over), +36 ms (`press-modal-option-radio`); select: check grows 733 ms spring ζ0.73 (`modal-radio-select`) | Good |
| City category tile | 16 | hover 1.02, pressed .94 + colour | — | `scale` 200 ms `ease`, +7 ms (`press-city-tile`) | Good |
| City venue card | ~60 | pressed .98, hover colour only | desktop hover lift (menu and upsell cards have one) | press `scale` 150 ms ease-in-out +10 ms; hover: link colour only (`hover-city-venue-card-1280-light.png`) | D-11 |
| Deal card ("€5 off… Show details") | 2 | hover 1.03, pressed .98 | — | press 183 ms, +2 ms | Good |
| Favourite heart | 1 | hover/pressed bg + overlay 100 ms ease-out | guest: no fill; a sign-in dialog instead (expected, not reached) | +21 ms overlay (`press-venue-favourite`); tap → "Create an account or log in" (`m-c-favourite-guest-390-light.png`) | Out of scope (sign-in) |
| Menu category tabs | ~19 | hover bg/colour, active pill | pressed; pill movement; scroll continuity | press: none (`desktop.log`); active pill swaps at +81 ms; **scroll jumps 1,346 px in one frame** (`mobile-d.log` (b)) | D-07 |
| Icon close (X) | 2 | hover/pressed bg 120 ms ease-out | modal exit motion | X on the item modal: the modal is gone the next frame (`modal-close-x`: "no change on the target", closed) | D-03 |
| Item modal (sheet look on phones) | 1 | opens (warm SPA +1 ms) | drag to dismiss; exit motion; phone cold open = page load | drag 300 px from its top: sheet moved **0 px** at every step (`mobile-a.log` C) | D-03, D-08 |
| Basket dialog | 1 | open scale .9→1 + fade 267 ms ease-out-expo; close .975 + fade 233 ms; **interruptible**; reduced motion drops the scale | source (it grows from screen centre, not from the bar) | open +53–119 ms; Escape at +100 ms reverses from the current opacity, 6/6 runs (`interrupt.log`); reduced: no scale (`basket-open-reduced`) | D-09 |
| Search fields (header, menu) | 2 | hover bg 70–150 ms, focus ring 3 px, no-results with "Clear search" | — | English "salad"/"souvlaki" find Greek dishes (15/53 results) (`search.mjs`) | Good |
| Offer pill (`offer-assistant-message`, role=status) | 1 | live text, polite region | settled text | after Add: "€5 off… +1" → "Deal applied" → "Deal applied €0 delivery fee" within 34 ms, then flips back at ~3.5 s (`mobile-a.log` E, `mobile-d.log` c) | D-12 (ED owns the offer story) |
| Toast / snackbar | 0 | — | the whole component | none anywhere in J1–2 | D-04 |
| Empty basket | 1 | "No items in your order · Your order is lonely without items" + action | — | `m-b-basket-after-remove-390-light.png` | Good |
| Network states (Add to order) | — | works offline (local basket) | — | slow 3G and offline: identical timeline, bar at ~440 ms (`mobile-d.log` c) | Calibration: no busy state needed for the network |
| Go to checkout (slow network) | 1 | — | — | sign-in wall at +37 ms (client-side) (`m-d-checkout-slow-1s-390-light.png`) | End of journey 2 |

## Gestures
| Gesture | Where | Follows finger | Velocity | Edge | Haptic | Gap |
|---|---|---|---|---|---|---|
| Horizontal swipe | City carousels (`scroll-snap-type: x mandatory`) | yes, 1:1 after a 15 px slop (20→5 … 200→185) | yes: 185 → 261 px after release | snaps | n/a on web | none |
| Drag down | Item modal (rounded top, sheet look on phones) | **no**: 0 px for a 300 px drag | — | — | — | D-08 |
| Drag down | Basket (full-screen dialog on phones) | no (0 px) | — | — | — | Low value at full height; X and Escape work |
| Tap menu tab | Venue sticky tabs | n/a | — | — | — | 1,346 px scroll in one frame (D-07) |
| Pull to refresh / long-press / swipe rows | — | not offered on web | | | | Not prescribed |

## Detail score: 6/10
Wolt's design system has real pressed, hover and focus states, a springy count pop and an interruptible basket, and it respects reduced motion. But the tap people make most (the dish "+") has a press rule that can never fire. The basket bar and card counts jump without motion. The two CTA families press differently. The item modal cuts out on close and, on phones, opens with a full page load.

## D-01 Dish "+" · give the most-tapped button a pressed state that actually fires · Must-do · frequency H
- Now: 45 "+" per venue plus 20 in the basket upsell are `div role="button"`. Their press rule `.i6jerpd:active:enabled svg { transform: scale(.8) }` and their hover rule `:hover:enabled` need `:enabled`, which a `div` never matches (`probe-stepper.log`: 23/23 `enabledMatches:false`). Measured press: **nothing** on touch. On desktop the press removes the hover lift and tint, so it looks lighter, not pressed (`plus-card.mjs`). The real `<button>` steppers in the modal show the intended detail: scale .8 in 50 ms, +4 ms (`press-modal-qty-plus`).
- Add: the same 50 ms squeeze Wolt already designed, plus the pressed tint, on every "+".
- Spec: icon `scale(.8)` 50 ms `cubic-bezier(.4,0,.2,1)` [O, Wolt's own], release 150 ms `cubic-bezier(.2,.6,.4,1)` [O, al-Button]. Pill bg `#99E5FF` (surface-brand-pressed). Visible ≤ 50 ms after touchstart.
- Web: make it a `<button type="button" aria-label="Add one more: <dish>">` (this also fixes F-AP-12's names), or change the selector:
  ```css
  .i6jerpd:active:not([aria-disabled="true"]) svg { transform: scale(.8); }
  .i6jerpd:hover:not([aria-disabled="true"]):not(:active) svg { transform: scale(1.08); }
  .i6jerpd:active { background-color: var(--cb-color-bg-surface-brand-pressed); }
  ```
  Keep the card's `:has(.itxtujg:active)` .98 on the card body, never on the "+" (the "+" must not shrink the whole card).
- Native: n/a (web). The Android app already sends a CLICK haptic on these (`micro-interactions.md` §9).
- Reduced motion / 100th use: keep the tint, drop the scale. 50 ms stays invisible noise at the 100th use, which is right for tier 0.
- Benchmark: Wolt modal stepper 50 ms [O]. Duolingo press one frame (+18 ms) [O].

## D-02 Item card · open the first dish in place on phones, and keep my place in the menu · Must-do · frequency H
- Now: see F-DET-01. On phones the first dish tap is a full document load (`navType: navigate`, a fresh `performance.now()`, URL gains `?linkSource=woltcom-app-handover-on-action-venue-item`). The modal shows at **954–1,610 ms** (6 phone runs). Behind the modal the venue is reloaded at **scrollY 0**: you tapped at 576. Desktop is an SPA open at **109–116 ms** with scroll kept (1 run).
- Add: the same in-place open phones already get from the second dish on, from the first tap. After closing, the menu is exactly where the user left it.
- Spec: open on pointer-up from data already on the card; press .98 150 ms (exists); modal content from cache ≤ 100 ms; scroll position preserved (diff = 0 px).
- Web: let the card's click handler `preventDefault()` and push the item route client-side even before the "app handover" logic loads; if a document load is ever needed, `history.scrollRestoration = "manual"` and restore `scrollY` from `sessionStorage` on the menu route.
- Reduced motion / 100th use: same.
- Benchmark: Wolt desktop 109–116 ms [O]. Verifier warm open 140–193 ms [O].

## D-03 Item modal · leave the way it came, on X, Escape and Add · Must-do · frequency H
- Now: closing with X makes the modal vanish the next frame (`modal-close-x`: present, then gone, no channel). Add to order: ~430 ms with only the press scale, then the same one-frame cut (ED measured the cut at 408 ms). New here: offline and on slow 3G the timeline is identical (modal gone at 433–440 ms both times, `mobile-d.log` c). The 430 ms is client-side, not network, so it can be removed.
- Add: an exit that reverses the entrance, and drop the 430 ms hold (the basket is local, so the result is already known).
- Spec: exit `translateY(24px)` + fade 200 ms `cubic-bezier(.3,0,.8,.15)` (≈ 70–80% of the 250–300 ms entrance) [S M3]. Escape or a second tap at any point reverses it (the basket dialog already does this, see Strengths). On Add, start the exit on the press release (≤ 100 ms) and bump the bar as the sheet leaves (D-05).
- Web: `dialog.animate([{opacity:1,transform:'none'},{opacity:0,transform:'translateY(24px)'}],{duration:200,easing:'cubic-bezier(.3,0,.8,.15)'}).finished.then(close)`, or the dialog's existing 250 ms close transition, which the basket already uses.
- Reduced motion / 100th use: 120 ms fade only. 200 ms is short enough for the 100th dish.
- Benchmark: Wolt basket close 233 ms [O]; ED motion table row "Add to order → modal close".

## D-04 Basket "Remove item" · undo, and say it happened · Must-do · frequency L
- Now: see F-DET-03. One tap on the trash removed a 5-portion line (€15.00). No confirm, no undo, nothing announced. The polite count region just empties; the assertive region stays empty (`mobile-b.log`). There is no toast component anywhere in J1–2.
- Add: remove at once (no confirm), then a 5 s snackbar "Removed 5 × Κοτόπουλο Σουβλάκι · Undo" above the CTA. Undo restores the line with its options.
- Spec: in 200 ms (rise 16 px + fade), out 150 ms; 5 s [S M2: 4–10 s]; `role="status"`; Undo is a text button in brand text colour; one at a time. Native: `REJECT` / `.warning` haptic on remove (as M-NAT-02).
- Web: keep the removed line in memory for 5 s; render `<div role="status" class="snackbar">Removed … <button>Undo</button></div>`.
- Reduced motion / 100th use: fade only. Rare by nature, so no fatigue.
- Benchmark: [H] starting value; M-NAT-02 prescribes the same for the Android edit sheet.

## D-05 Basket bar, card counter · make counts and the total move when they change · Good to have · frequency H
- Now: 5 consecutive "+" presses: the bar, its count badge, its count, its price and the card count all show **no change on the target** (`plus-bar.sample.json`, `plus-bar-badge`, `plus-bar-count`, `plus-bar-price`, `plus-card-count`). Text flips at +9–14 ms. The same number *does* pop in the modal and the basket (spring ~300 ms, ~50% overshoot). So the venue page, where people add most, is the one place it's flat.
- Add: reuse Wolt's own count pop on the bar badge and the card counter; a small bar bump; the price rolls.
- Spec: badge and counter: the existing pop (spring ~300 ms, bounce ~0.5 [O]). Bar `scale` 1 → 1.03 → 1 over 250 ms `cubic-bezier(.2,.6,.4,1)` (full-width bars need less than the 1.06 in `benchmark-apps` §3.5). Price: digits roll 200 ms with `font-variant-numeric: tabular-nums` (VC-08 already asks for tabular figures). Native app: CLICK haptic on "+" [O Android].
- Web: `badge.animate([{transform:'scale(1)'},{transform:'scale(1.25)'},{transform:'scale(1)'}],{duration:300,easing:'cubic-bezier(.34,1.56,.64,1)'})` keyed on the count. Bar: same with 1.03. Price: a 2-row `translateY` digit roll per changed digit.
- Reduced motion / 100th use: crossfade the digits 120 ms, no bump. The bump stays ≤ 3% so it doesn't wear out.
- Benchmark: Wolt basket stepper pop 335 ms, total overshoot 225 ms [O, verifier]; ED proposes the bar bump for the first add, and this extends it to every "+".

## D-06 "View order" and "Go to checkout" · one press language for every primary CTA · Good to have · frequency H
- Now: Add to order (al-Button) presses to `scale(.94)` in 200 ms. "View order" and "Go to checkout" (cbc_Button) only switch bg, `transition: none`, with no geometry (`press-cart-view-button`, `press-basket-checkout`: +7–25 ms, colour only). In the flow those are three presses in a row, and the money buttons are the flattest.
- Add: the al-Button press on cbc_Button primaries, scaled down for full-width bars.
- Spec: `scale: .97` (full width; .94 on a 358 px bar moves its edges 11 px), 120 ms `cubic-bezier(.2,.6,.4,1)` in, 200 ms out; keep the pressed bg.
- Web: `.cbc_Button_rootClass_f04:active:not(:disabled){ scale:.97; transition: scale 120ms cubic-bezier(.2,.6,.4,1) }` plus the base `transition: scale 200ms cubic-bezier(.2,.6,.4,1)`, guarded by `@media (prefers-reduced-motion: no-preference)`.
- Reduced motion / 100th use: bg only (today's behaviour).
- Benchmark: Wolt al-Button .94 / 200 ms [O]; `micro-interactions.md` §2 primary button.

## D-07 Menu tabs · pressed state, a glide instead of a 1,346 px jump, a pill that travels · Good to have · frequency M
- Now: tapping "ΟΡΕΚΤΙΚΑ" at scrollY 700: scroll jumps **700 → 2,046 in one frame** (+47 ms); the active pill swaps at +81 ms with no motion (`mobile-d.log` b). Tabs have hover but **no pressed state** (`desktop.log` venue-category-tab).
- Add: a pressed tint; jump to ~600 px before the section, then glide the last stretch; the brand pill slides from the old tab to the new one.
- Spec: press bg `--cb-color-bg-surface-brand-pressed` ≤ 50 ms; glide 300 ms `cubic-bezier(.2,0,0,1)` over the last ≤ 600 px; pill `transform: translateX` + width 200 ms ease-out; the section heading tints for 600 ms on arrival.
- Web: `scrollTo({top: target-600, behavior:'instant'}); requestAnimationFrame(()=>scrollTo({top:target, behavior:'smooth'}))`; pill as one absolutely positioned element moved with `transform`.
- Reduced motion / 100th use: instant jump + heading tint only.
- Benchmark: `benchmark-apps` §3.7 (underline 200 ms [H]); motion.md "Scroll jump".

## D-08 Item modal on phones · follow the finger down, dismiss on a flick · Good to have · frequency M
- Now: the modal looks like a bottom sheet on phones (rounded top, 101 px gap, `m-modal-390-light.png`), but a 300 px drag from its top moved it **0 px** at every step and it stayed open (`mobile-a.log` C).
- Add: drag to dismiss from the image/header area while the content is scrolled to top.
- Spec: 1:1 follow, rubber-band upward (×0.3); dismiss past 25% of height or a velocity > 0.5 px/ms; otherwise spring back (bounce 0, 300 ms). Backdrop opacity tracks the drag.
- Web: pointer events on the header, `transform: translateY()` while dragging, `el.animate` for the settle using the release velocity.
- Reduced motion / 100th use: drag still works; the settle becomes a 120 ms fade.
- Benchmark: `micro-interactions.md` §4 sheet; [H].

## D-09 Basket · grow from the bar you tapped · Good to have · frequency M
- Now: the basket opens with `scale .9 → 1` + fade, 267 ms ease-out-expo, from the **screen centre** (`basket-open-2`). The thing you tapped is the bar at the bottom. It's well tuned otherwise (interruptible, reduced-motion aware).
- Add: the same animation, anchored to the bar.
- Spec: `transform-origin: 50% calc(100% - 40px)`; scale .92 → 1 + `translateY(24px → 0)` 300 ms `cubic-bezier(.1,.8,.2,1)` (Wolt's token); close reverses to the bar, 250 ms.
- Web: set `transform-origin` on the dialog panel from the bar's `getBoundingClientRect()` before opening.
- Reduced motion / 100th use: unchanged (already fade-only under reduce).
- Benchmark: motion.md "Unanchored motion"; `benchmark-apps` §3.6.

## D-10 Card counter · collapse back to the badge after a pause · Useful · frequency M
- Now: after tapping the "1" badge, the − n + stepper stays expanded with no end: still expanded 3.5 s later (`mobile-b.log`, `m-b-card-stepper-after-idle-390-light.png`). It covers part of the dish photo, and every touched dish keeps one open.
- Add: collapse to the badge 2.5 s after the last interaction or on scroll.
- Spec: width collapse via `clip-path`/`transform` 200 ms `cubic-bezier(.45,0,.55,1)` (Wolt's card curve), the badge pops in with the existing count pop.
- Reduced motion / 100th use: 120 ms fade.
- Benchmark: [H].

## D-11 City venue cards · the same hover lift as menu cards (desktop) · Useful · frequency M (desktop)
- Now: city venue cards only change link colour on hover (`hover-city-venue-card-1280-light.png`). Menu item cards and upsell cards lift to `scale(1.03)` with a shadow crossfade over 250 ms.
- Add: the menu-card hover on venue cards.
- Spec: `scale(1.03)` 250 ms `cubic-bezier(.45,0,.55,1)`, `::after` shadow opacity 0 → 1, `(hover:hover)` only.
- Reduced motion / 100th use: shadow only.
- Benchmark: Wolt's own item card [O].

## D-12 Offer pill · settle on one message instead of flashing three · Useful · frequency M
- Now: after Add, the pill text goes "€5 off on orders over €12 +1" → "Deal applied" → "Deal applied €0 delivery fee" in 34 ms, then switches back to "€5 off… Add €9 more" at ~3.5 s (`mobile-a.log` E, `mobile-d.log` c). It's a `role=status` region, so a screen reader may queue several of these.
- Add: compute the final message first, then crossfade once.
- Spec: one text change per add; crossfade 150 ms; the next rotation no sooner than 4 s; announce only the final text.
- Reduced motion / 100th use: no crossfade.
- Benchmark: [H]. (ED's M-02 owns what the pill should say.)

## F-DET-01 [P2] On a phone, the first dish you open reloads the whole venue; close it and you're back at the top of the menu
- User experiences: I scroll down the menu, tap a dish, wait about a second, and close it. The menu is back at the top, and I have to scroll back to where I was.
- Where: venue → first `horizontal-item-card-button` tap of a page load → item modal, 390×844 touch.
- Evidence: `mobile-c.mjs` part (1), `mobile-c.log`. 6/6 phone runs (3 printed by the first, crashed run, 3 saved): `window.__mark` set before the tap doesn't survive. `navigation` type is `navigate` with a new document (`docAgeMs` 1,768–2,384); URL gains `?linkSource=woltcom-app-handover-on-action-venue-item`. Modal seen at 954–1,610 ms. `scrollY` 576 → 0, still 0 after closing. Desktop 1280: mark survives, scroll 539 kept, modal at 109–116 ms. Second dish in the same phone session: no reload (mark survives). It also breaks the sampler: `sample-motion` reports `__sm is not defined` on this tap.
- Why it matters: this is the root cause behind F-AP-10 and F-EXP-05 (the dead ~0.7–0.9 s first tap) and adds a cost they didn't capture: lost place. That's object constancy and Nielsen #3 on the most-repeated browse action. It hits every phone visitor once per venue visit.
- Fix: D-02 (SPA open from the first tap; never let the item link do a document navigation on the venue route; restore scroll if it ever does).
- Effort: S–M
- Confidence: high on phones (6 runs, 2 sessions); desktop n=1.

## F-DET-02 [P2] The dish "+" button has no pressed state on touch, and on desktop the press makes it look less pressed
- User experiences: I tap "+" on a dish and nothing on the button changes until the count or the modal appears. On a laptop, pressing it makes the card *drop* from its hover lift and the "+" goes paler.
- Where: venue → every `horizontal-item-card-stepperIncrement` (45 per venue) and basket upsell `ItemCardStepperIncrement` (20).
- Evidence: `probe-stepper.log` (`DIV role=button`, `:enabled` false ×23); `rules.json` (`.i6jerpd:active:enabled svg{scale(.8)}`, `.i6jerpd:hover:enabled:not(:active) svg{scale(1.08)}`); `desktop.log` venue-quick-add / card-stepper-plus / basket-upsell-plus press: NONE; `plus-card.mjs`: hover → press = card 1.03 → 1, "+" bg `rgb(194,242,255)` → `rgb(220,247,255)`. Control: the modal's real `<button>` steppers press to .8 in 50 ms (`press-modal-qty-plus`).
- Why it matters: rule 1 of `micro-interactions.md` (answer within 100 ms) fails on the highest-frequency control in the product. It's also a dead design: the team specified the press and the selector cancels it.
- Fix: D-01 (selector change or a real `<button>`).
- Effort: S
- Confidence: high (CSS + measured on 3 instances).

## F-DET-03 [P2] "Remove item" in the basket deletes the whole line at once, with no undo and no announcement
- User experiences: I tap the trash next to "5 ×" a dish to remove one, and all five are gone with their options. No "Undo". A screen reader hears nothing.
- Where: basket (`?cart=open`) → `CartItemStepperClear` (aria-label "Remove item"), sitting beside "Remove one".
- Evidence: `mobile-b.log` "remove → text": the dialog text becomes "No items in your order…" at +236 ms; live regions before `["/polite:5", …, "/assertive:"]`, after `["/polite:", …, "/assertive:"]`; `m-b-basket-after-remove-390-light.png`. No toast component appears anywhere in J1–2.
- Why it matters: `micro-interactions.md` §2 Destructive action (undo instead of nothing); WCAG 4.1.3 status messages. Re-adding means reopening the dish (a page load on a phone, F-DET-01) and re-picking options. The same pattern on Android is F-NATIVE-02 (P1 there because it's the primary button; here it's an icon beside "Remove one", so P2).
- Fix: D-04.
- Effort: S
- Confidence: high (n=1, deterministic).

## Strengths (only real ones, max 3, one line each)
- The basket dialog is interruptible: Escape at +100 ms reverses it from its current opacity, 6/6 runs (`interrupt.log`). It closes faster than it opens (233 vs 267 ms) and drops its scale under reduced motion.
- A real state system: every token has hover and pressed variants, and cards, tiles, deal cards, radios and the Add to order button all press within 2–36 ms in Wolt's own curves; the count pop (spring ~300 ms) is benchmark-level.
- Adding works offline and on 2G-class latency with an identical timeline (local basket), and English menu search finds Greek dishes ("salad" 15, "souvlaki" 53).

## Answers to the brutal questions
- **Tap done 50 times a session with the least feedback:** the dish "+". Its press rule can never fire, and the bar and count it changes don't move (F-DET-02, D-01, D-05).
- **Component missing the most states:** the "View order" bar: no press geometry, no bump, no count or price motion, and it doesn't act as the source of the basket (D-05, D-06, D-09).
- **Where something appears from nowhere:** the basket, which grows from the screen centre instead of the bar. And on phones the first item modal, which arrives after a full page load that throws away your scroll (F-DET-01).
- **3 details that would most change how finished it feels:** D-01 (dish "+" press), D-02 (first dish in place, place kept), D-05 (counts and total that move).

## Notes for the orchestrator (new tool trial)
- `sample-motion.mjs` reads `transform` but not the individual CSS `scale`/`translate`/`rotate` properties. Wolt's al-Button and tiles use `scale:`, so those presses showed up only as width/height channels. The fit works, but the channel name misleads. Suggest reading `cs.scale` and `cs.translate` too.
- `press:` releases on the target, which clicks it (it navigates, adds, or would open the sign-in wall). I added a capture-phase click blocker during timed presses (`desktop.mjs` `BLOCK`). Worth building in as `press-noclick:`.
- When a value changes and changes back during the sample, `styleChanges` prints `from → to` with identical values (e.g. `color rgb(14,66,83) → rgb(14,66,83)`). Printing the peak would help.
- The sampler throws `__sm is not defined` when the action triggers a document load. Catching that and reporting "document navigation" would turn the error into a finding (it found F-DET-01).

## Interaction log
| # | Action | What happened | Time |
|---|---|---|---|
| 1 | Inventory city → Delulu → first item (390) | Delulu closed until 18:00: "Order details / Schedule" sheet instead of the item modal [closed venue] | — |
| 2 | Open-venue probe (McDonald's, Thymari) | Thymari open until 02:45, item modal opens | ~2 s |
| 3 | Desktop hover + press on 24 components (`desktop.mjs`) | states table above; quick "+", tabs, see-all: no press | press feedback 2–54 ms where present |
| 4 | CSS state rules (`probe-rules.mjs`) | found `:active:enabled` on `div role=button` | — |
| 5 | Phone: first dish tap ×6 + desktop ×1 (`mobile-c.mjs`) | phone: full reload, scroll 576 → 0; desktop SPA | 954–1,610 ms / 109–116 ms |
| 6 | Modal qty +/−, radio, drag 300 px, X (`mobile-a.mjs`) | value pop spring 317 ms; drag 0 px; X = one-frame cut | text at +0 ms |
| 7 | Add to order (warm) | bar + card count + offer text at +407 ms; offer text flips 3× in 34 ms | 407–441 ms |
| 8 | Badge tap → expanded stepper → "+" ×5 (`mobile-b/d`) | counts change at +9–14 ms, no motion on bar/badge/price/count (normal and reduced) | — |
| 9 | Basket open / + / drag / remove / close | open 267 ms from centre; + pop; drag 0 px; remove: no undo, no announcement; close 233 ms | — |
| 10 | Basket open + Escape at 100 ms ×6 (`interrupt.mjs`) | reverses from current state, closed every time | ~330 ms to gone |
| 11 | Menu tab tap at scrollY 700 | 1,346 px jump in one frame, pill swaps at +81 ms | 47–81 ms |
| 12 | Add to order on slow 3G and offline | identical to normal; modal gone ~440 ms; no error | 433–440 ms |
| 13 | Go to checkout on slow 3G (journey 2 stop) | sign-in wall at +37 ms; stopped there | 37 ms |
| 14 | Favourite heart as guest | "Create an account or log in" dialog; closed it | ~1 s |
| 15 | Menu search "zzqx" / "salad" / "souvlaki" / "σαλάτα" | "No results found · Clear search" / 15 / 53 / 12 results | ≤ 1.5 s |
| 16 | City carousel swipe 200 px | 1:1 after 15 px slop, momentum to 261, snaps | — |
