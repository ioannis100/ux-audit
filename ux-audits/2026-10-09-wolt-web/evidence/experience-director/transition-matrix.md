# Transition matrix — Wolt web, 390×844 (touch, light forced), 2026-10-09 (02:30–03:30 Cyprus time)

Method: `motion.json` run by `run-motion.mjs`, which calls `recordOnPage` from
`<skill>/scripts/capture-motion.mjs` on a fresh guest context per capture (`launch()` from
`evidence/orchestrator/wolt.mjs`). I did not use capture-motion's spec mode because it cannot force
`prefers-color-scheme`, and this Mac is in dark mode: headless Chrome reported `dark? true`
(`theme-check.mjs`). Each row was captured once normally and once with `prefers-reduced-motion: reduce`.
The JSON and filmstrip for every row are in `motion/`. Timings come from desktop Chrome with no CPU
throttle and vary by about ±50 ms per frame. "First change" counts from pointer-down.
Run log: `motion/_run-mobile.log`. bar-to-basket, card-stepper-plus and the basket rows were re-run
after a selector fix: there are two `cart-view-button` nodes and the first is 0×0. The first
bar-to-basket capture clicked (0,0), hit the Wolt logo and opened /discovery. That came from my
harness, not from the product. All basket recordings were re-checked: every `finalUrl` stays on
`/restaurant/delulu-burgers-shakes?cart=open` (or on the venue for basket-close). The card-stepper-plus
capture also clicked a 0×0 collapsed `+` and recorded nothing; it is renamed
`motion/INVALID-zero-size-target-*`, and its row uses the `reward.mjs` screencasts instead.
**Closure-dependent (run at ~02:30–03:30 Cyprus time):** the closing toast and the "Closing soon"
badges in the city → venue row are night-time states.

| From → to | Trigger | First change | Settled | Hard cut | Blank | Anchored | Easing (CSS / measured) | Interruptible | Reduced motion | Score /10 | Benchmark § |
|---|---|---|---|---|---|---|---|---|---|---|---|
| City → venue (McDonald's card) | tap card | 120 ms (tiny); skeleton at ~1,100 ms | 2,392 ms | yes (sign-in sheet cuts in at 2,253 ms) | 0 | no: skeleton cut, no shared element | no CSS animations; JS | n/t | same cuts (2,444 ms) | **3** | §3.6 |
| City → Restaurants list | tap `tile-restaurants` | 1–122 ms (barely visible); skeleton at 1,081–1,918 ms | 3,000–3,856 ms | yes | 0 | no | none | n/t | same | **2**: in 2 of 4 captures the error page "Argh, something went wrong!" showed from ~700–844 ms to ~2,100 ms before the list loaded (`tile-restaurants-to-list-run1-filmstrip.png`, `…-reduced-run1-…`). It did not appear in 6 other attempts (`checks-results.json`, 5 polled at 100 ms; walk3 once), so it is intermittent: 2 of 10 | §3.7 |
| City → search open | tap search | 6 ms | 2,547 ms (logo redraw) | yes (backdrop at 361–521 ms) | 0 | yes: the field expands in place | `margin-right` 400 ms `cubic-bezier(.2,.6,.4,1)`, a **layout property**; backdrop 300 ms | n/t | the expand is removed, backdrop kept | **6** | §3.7 |
| Venue → back to city | `history.back()` | 568 ms | 3,955 ms | yes (551–912 ms) | 0 | no | none | n/t | cut, 1,489 ms | **4** | §3.6 |
| Venue → item modal | tap item card | 42 ms (faint); modal at **694 ms** | 1,284 ms | no | 0 | **no**: rises from the bottom edge, not from the card; the image loads in later (~956–1,065 ms) | slide of ~120 ms (694–813 ms) | **no** (next row) | cut | **4** | §3.6 |
| Item modal → close (X) | tap X | 90 ms | 488 ms | no | 0 | returns to the bottom edge | sheet `transform` 350 ms `ease`, backdrop `opacity` 250 ms `ease` | n/t | hard cut, 251 ms | **7** | §3.6 |
| Item modal open → Escape after 100 ms | tap, wait 100, Esc | 53 ms | 1,520 ms | no | 0 | — | — | **no**: Escape is lost; the modal still opens at ~968 ms and the URL ends on the item | same | **3** | motion.md "interruptible" |
| Item modal → Add to order → bar | tap `product-modal.submit` | 34–47 ms (button `scale` 200 ms) | 1,770–2,100 ms | **yes**: modal leaves in one frame at 343–408 ms (74.9% of the screen) | 0 | no: the bar slides up at ~645–827 ms, away from the button | the "Deal applied" pill: `offerAssistantIconBounce` 350 ms ease-out + green ripple 1,049–1,770 ms; long frame 222 ms | n/t | same cut; bounce removed (15 vs 32 animations) | **6** | §3.5 |
| Card "+" (no count yet) → added directly | tap card + | 107–124 ms | 1,437 ms | no | 0 | yes: the count appears on the card's own stepper | bar + "Deal applied" ripple | n/t | ripple removed, ease-out | **7** | §3.5 |
| Card stepper + | tap + | **20–48 ms** (n=5, `motion/reward/card-plus-visual-*`) | 419–429 ms | no | 0 | yes | count `pop-up` 335 ms `cubic-bezier(.1,.8,.2,1)` | yes (10 fast taps, no lost tap) | not captured | **8** | §3.5 |
| Card stepper − | tap − | DOM 65–72 ms after pointer-down (n=5, 50 ms of it is the press); one screencast 371 ms (n=1, captured while the stepper collapsed) | 489 ms | no | 0 | yes | `pop-up` 335 ms | — | 340 ms, no animation | **7** | §3.5 |
| "View order" bar → basket sheet | tap bar | 188–205 ms | 1,124–1,127 ms | no | 0 | **no**: a full-height sheet rises; it does not grow from the bar | `opacity` + `transform` 300 ms `cubic-bezier(.1,.8,.2,1)`; "Recommended" grid fades in at ~850–990 ms; "Go to checkout" looks disabled (pale) until ~709 ms | n/t | opacity only | **6** | §3.6 |
| Basket stepper + | tap + | 15–53 ms (n=4) | 185–427 ms | no | 0 | yes | `translate` 338 ms `cubic-bezier(.1,.8,.2,1)` + `scale` 225 ms `cubic-bezier(.25,3,.1,2.5)` (overshoot) | yes | 18 ms, no animation | **8** | §3.5 |
| Basket upsell card + | tap + | 22–112 ms | 379–669 ms | no | 0 | partly: the item is inserted into the list and pushes it down 250 ms `cubic-bezier(.45,0,.55,1)` | | n/t | ease-out, 554 ms | **7** | §3.5 |
| Basket → close | tap X | 69 ms | 361–383 ms | no | 0 | back to the bottom edge | 250 ms `cubic-bezier(.1,.8,.2,1)`; exit 250 / entrance 300 = 0.83 | n/t | 127–143 ms | **8** | §3.6 |
| Basket → "Go to checkout" (sign-in wall) | tap | 22–27 ms | 164–248 ms | **yes**: full-screen "Create an account or log in" at ~129 ms | 0 | no | Apple button spinner 1,500 ms | n/t | same cut | **3**: the motion is fine; the moment is a wall | §3.9 |
| Venue → favourite heart (guest) | tap heart | 42 ms | 237 ms | no | 0 | no: the account wall opens; the heart never fills | | n/t | n/t | **3** | §3.4 |

**Headline:** 6 hard cuts across 17 rows (city → venue, tile → list, search backdrop, back, Add to
order closing the modal, basket → wall). 0 blank frames. 3 waits with no feedback for longer than 0.6 s:
tile → list (1.1–1.9 s), city → venue (~1.1 s), item tap → modal (~650 ms). Worst three: tile → list (2),
item-modal interrupt (3), city → venue (3). Best: the steppers (8), basket close (8). Reduced motion
is honoured on in-screen motion (basket stepper and close lose their animation; the sheet becomes a
cut) but does not change the route-level cuts.

## Target motion for rows ≤ 5

1. **Tile / card → list or venue** (§3.6, motion.md "route change without a hole"): pressed state
   ≤ 100 ms on the tile (`:active{transform:scale(.97);transition:transform 100ms cubic-bezier(.2,0,0,1)}`),
   then keep the outgoing screen until the incoming one can paint and wrap the router push:
   `document.startViewTransition(() => router.push(href))`. Give the tapped card image
   `view-transition-name: venue-hero-<id>` and the venue hero the same name, spring 0.35–0.45 s, bounce 0.
   Skeleton ≤ 100 ms if data is late. Never render the error route as an intermediate state.
   Native: `.navigationTransition(.zoom(sourceID: venue.id, in: ns))`; Compose `SharedTransitionLayout`.
2. **Item card → item modal**: open the sheet on pointer-up with the data already on the card (name,
   price, image are in the DOM), and fetch the options inside the open sheet. Grow the card image into
   the modal hero (`view-transition-name: item-<id>`), 300 ms `cubic-bezier(.2,0,0,1)`. Close on Escape
   or back at any point (an AbortController on the open).
3. **Back to city**: restore with `@view-transition { navigation: auto; }` plus a 12–24 px slide and a
   180/260 ms fade (motion.md snippet); keep the carousel's scroll position.
4. **Basket → wall**: keep the basket underneath and present the sign-in as a sheet titled with the
   order ("Sign in to send your €10.50 order to Delulu"). See M-04.
