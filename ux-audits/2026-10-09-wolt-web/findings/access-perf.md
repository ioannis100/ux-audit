# access-perf — findings
Coverage: 5/5 in-scope screens (city page, venue, item modal, basket, sign-in wall after "Go to checkout"), plus the cookie sheet, the guest sign-in sheet on venue arrival and the header search dialog. That is 14 states in all. Keyboard-only: journeys 1–2 end to end on desktop, with 173 Tab stops logged. Full accessibility tree (`interestingOnly: false`): venue, item modal, venue after add, basket, city.
Not reached: everything behind sign-in (checkout, payment, tracking, favourites, Wolt+). Paste into the email/OTP field was not tested, because the brief forbids typing an email.
Not checked: device step 9 (real-device screen readers, TalkBack/VoiceOver, Android/iOS font scale, haptics, jank) is out of scope for this run. CrUX/PageSpeed field data: the PSI API returned 429 (quota), so every performance number below is **lab only**.
Viewports/devices: headless Chrome via puppeteer-core in the audit folder. 390×844 touch @2x (primary), 1440×900 desktop (keyboard pass), 320×640 (reflow), 640×400 / 720×450 / 768×512 / 1280×400 (200% / 150% zoom equivalents), 844×390 phone landscape. **Light theme forced** for every number unless marked dark. Dark theme exists (it follows the system setting) and was checked separately for contrast. Lighthouse 13.5.0, simulated throttling.

Severity rule used: a WCAG A/AA failure on a control the core journey depends on, where the user has no easy way round it, is P1. A narrow AA failure with an obvious workaround is P2, and the criterion is named so the orchestrator can re-rank.

---

## F-AP-01 [P1] On desktop, tabbing into the header search opens a dialog that keeps Tab cycling round the header until you press Esc
- User experiences: A keyboard user on any desktop page presses Tab three times (logo → "Limassol" → search). Putting focus on the search box opens a search overlay, and from then on Tab cycles **logo → search → Close → logo …**. The page content is unreachable until they press Esc or activate "Close". Nothing on screen says so: the overlay is empty when it opens.
- Where: header on every page (city page and venue verified) → `SearchInput` → `HeaderSearchModalRoot`.
- Evidence: `evidence/access-perf/kb1-city.mjs` output. After the cookie sheet, 25 Tab stops cycled `HeaderWoltLogoLink → SearchInput → HeaderSearchModalCloseButton` ×8. Same on the venue: `kb5-venue-tabs.mjs` (12 stops, 4 identical loops). Esc → focus back on search, next Tab → "Log in" (`kb2-search-trap.mjs`). Enter on Close does the same (`kb6-search-close.mjs`). The dialog is `role="dialog"` with no `aria-modal`, no name and empty text (`kb5` log). Screenshot: `kb-venue-search-dialog-1440-light.png`, `kb-search-dialog-open-1440-light.png`. Lighthouse also flags an unnamed dialog (`aria-dialog-name`, the cookie dialog) on the city page.
- Why it matters: WCAG 3.2.1 On Focus (A): receiving focus must not start a change of context, and this opens a focus-capturing overlay. It also fails 2.4.3 Focus Order in practice. Every keyboard and switch user meets it within three keystrokes on every page, before reaching a single restaurant. Esc does get you out, but only if you guess it.
- Fix: Open the overlay on input or Enter, not on focus. If it must open on focus, don't trap Tab: let Tab leave the header and close the overlay on `focusout`. Give the dialog `aria-modal="true"` and `aria-label="Search Wolt"` if it stays a dialog.
- Effort: S
- Confidence: high (reproduced 4×, city and venue). The mobile layout uses an icon button and is not affected.

## F-AP-02 [P1] The 19 cuisine tiles on the city page are links with no name, so a screen reader announces "link" 19 times
- User experiences: A blind user browsing Limassol by cuisine (Pizza, Sushi, Kebab, Burger…) hears "link, link, link…" with no destination. Their links list shows 19 blank entries.
- Where: city page → "Categories" section (`MainDiscoveryContent`) → each tile's overlay `<a>`.
- Evidence: `evidence/access-perf/city-unnamed.mjs` (CDP full AX tree): **19 unnamed links at 390 px, 16 at 1440 px**, all `<a class="ZimtOC …" href="/en/cyp/limassol/category/pizza"></a>`: empty anchor, no `aria-label` or `aria-labelledby`, and the visible name is in a sibling `h3`. `city-ax.mjs`: "link: ×16" is the most duplicated name on the page.
- Why it matters: WCAG 2.4.4 Link Purpose and 4.1.2 Name, Role, Value (A). This is one of the two browse routes in journey 1. Wolt already solves this correctly on item cards (`aria-labelledby="item-card-content-…"`), so this is an omitted attribute, not a design problem.
- Fix: `<a href="/en/cyp/limassol/category/pizza" aria-labelledby="{id of the tile's h3}">`, the same pattern as `horizontal-item-card-button`.
- Effort: S
- Confidence: high

## F-AP-03 [P2] After "Add to order", keyboard users are 97 Tab stops from "View order", and screen-reader users hear only "1"
- User experiences: After adding the burger with the keyboard, focus correctly returns to the item card. The basket button ("1 View order €10.50") sits in the header, though. Tabbing forward passes every remaining menu item, the venue info and the 40-link footer: **97 stops**. Shift+Tab is ~22 stops back and runs through the search trap in F-AP-01. A screen-reader user gets no "Added Classic Smashed Cheeseburger" message. The live regions say "1" (two `aria-live=polite` counters) and "€5 off on orders over €12 · Add €1.5 more · +1".
- Where: venue → item modal → Add to order → `cart-view-button`.
- Evidence: `kb3-venue-journey.mjs` → `kb3-run-d1440.txt` ("View order reached after 97 Tab stops from where focus landed after Add", stops 043–139). Live region text before and after the add is in the same log. Screenshot: `kb-after-add-d1440-light.png`, `kb-view-order-focused-d1440-light.png`.
- Why it matters: Add → basket is the money path. WCAG 4.1.3 Status Messages is met only literally: "1" doesn't say what changed. The basket entry point comes earlier in DOM order than the content the user just acted on.
- Fix: Announce `"{item} added. {n} items, €{total}"` in one polite live region. After Add, also expose a "View order" control near the item, or move `cart-view-button` in DOM order to after `<main>` (it is visually a footer bar on mobile anyway). A "Skip to basket" link in the skip-link set would also do it.
- Effort: S–M
- Confidence: high

## F-AP-04 [P2] "Go to checkout" opens the sign-in wall but leaves focus on the button behind it
- User experiences: A screen-reader user activates "Go to checkout" and hears nothing new. Focus stays on "1 Go to checkout €10.50", which now sits behind an `aria-modal` dialog. The next Tab jumps into the dialog ("Continue with Google").
- Where: basket → `CartViewNextStepButton` → `auth-modal` (end of journey 2; stopped there).
- Evidence: `ax-tree.mjs`: "auth wall focus after 3s: CartViewNextStepButton … inDialog" and then "next Tab: MethodSelect.Google". The same happens on desktop (`kb3-run-d1440.txt`: `focusIn: false`). Screenshot `ax-auth-wall-390-light.png`.
- Why it matters: WCAG 2.4.3 Focus Order. The item modal and basket do this correctly (focus goes to "Close the dialog"), so the wall is the odd one out. It is the moment the user most needs to know the flow changed.
- Fix: Move focus to the dialog heading ("Log in or sign up…", `tabindex="-1"`) or to the first control when the auth dialog mounts, as the other two dialogs already do.
- Effort: S
- Confidence: high

## F-AP-05 [P2] Every quantity control contains an invisible 1×1 px focus stop that screen readers can't see
- User experiences: Tabbing through the item modal or a basket line lands on an extra stop between the options and "Remove one". Visually it's a dot. A screen reader says nothing, because the element is `aria-hidden="true"`.
- Where: item modal `product-modal.quantity`, and basket `CartItemStepper` on every line.
- Evidence: `dom-qty.mjs`: `<input id="stepper" type="number" … aria-hidden="true" … value="1">` with `tabIndex 0` and rect 1×1. The same applies to `CartItemStepper`. The AX snapshot of each is `null`. Tab logs: stops 033, 141 and 170 in `kb3-run-d1440.txt`. Focus diff 0.0% in `focus-diff-d1440.txt`.
- Why it matters: WCAG 4.1.2 (and axe `aria-hidden-focus`). The user pays a silent, invisible stop on every stepper. The count itself is announced elsewhere (`<label>Count<span aria-live>1</span>`), so it is not blocking.
- Fix: `tabindex="-1"` on the hidden number inputs. Or drop `aria-hidden` and make the input the real spinbutton, with `aria-label="Quantity, Classic Smashed Cheeseburger"`.
- Effort: S
- Confidence: high

## F-AP-06 [P2] The item modal's −/+ quantity buttons show no focus indicator
- User experiences: Tabbing through the item modal, the focus ring disappears on "Remove one" and "Add one more", then reappears on "Add to order". The grey circle behind each icon is the same focused or not.
- Where: item modal → `product-modal.quantity.decrement` and `.increment` (desktop keyboard). The basket steppers do get a 3px ring.
- Evidence: computed style while `:focus-visible`: `outline: none 3px; box-shadow: none`, and `::before`/`::after` have no ring (`final-probes.mjs` log). Crops: `focus-modal-steppers-sheet-1440-light.png` (focused vs unfocused). Pixel diff focused vs unfocused: 0.0% (−) and 2.8% (+), which is the neighbour (`focus-diff-d1440.txt` stops 034, 035).
- Why it matters: WCAG 2.4.7 Focus Visible (AA). It is narrow, because every other stop on the journey has a clear 3px `rgb(35,116,143)` ring, but this is the quantity control on the core path.
- Fix: Use the button component's ring here as well: `.stepper button:focus-visible { box-shadow: 0 0 0 3px rgb(35 116 143); }`
- Effort: S
- Confidence: high

## F-AP-07 [P2] On a desktop first visit to a venue, two modals stack: focus is in the sign-in sheet while the cookie banner sits on top and can't be reached
- User experiences: A keyboard user deep-linking to a venue sees the cookie banner over a dimmed sign-in sheet. Tab cycles the six sign-in controls under the overlay (Google, Apple, Facebook, email, privacy link, close). The cookie choice can't be reached until they close the sign-in sheet with Esc. Tabbing past the empty email field turns it red: "Please enter a valid email."
- Where: `/restaurant/delulu-burgers-shakes`, fresh guest, 1440×900. At 390 px the order is right: cookie first, then the sheet takes focus correctly.
- Evidence: `kb4-stacked-modals.mjs`: focus at arrival = `modal-close-button` under `consents-banner-overlay` (z-index 100001). Eight Tabs never reach `decline-button`. After Esc, "Use only necessary" is reachable in 1 Tab. Screenshot `kb-venue-arrival-stacked-tab8-1440-light.png` shows the red error on the untouched field.
- Why it matters: WCAG 2.4.3 / 2.4.11 (focus sits in a layer the overlay covers), plus 3.3.1-style premature error on a field the user never typed in. Every first-time keyboard visitor from search lands here.
- Fix: Don't open the sign-in sheet while the consent dialog is open; queue it until consent is answered, which is what mobile already does. Validate email on submit, not on blur of an empty field.
- Effort: S
- Confidence: high

## F-AP-08 [P2] At 200% zoom and in phone landscape, "Go to checkout" stops being pinned and sinks ~2,950 px below 20 upsell cards
- User experiences: A low-vision user at 200% zoom on a 1280×800 or 1440×900 laptop (viewport 640×400 / 720×450 CSS px) opens the basket. The checkout button is no longer a sticky footer, and they must scroll past the whole "Recommended for you" grid to find it. The same happens on a phone held sideways (844×390).
- Where: basket sheet → `CartViewNextStepButton`.
- Evidence: `zoom-basket.mjs`: button top at **2955 px in a 400 px viewport** (640×400), 2955 (720×450), 2962 (768×512), 2962 (1280×400), 2962 (844×390 landscape, `final-probes.mjs`). At 640×700 it is pinned (`sticky`) at 630 of 700. Screenshot `reflow-zoom200-basket-light.png`, `landscape-844x390-basket-light.png`.
- Why it matters: Not a WCAG failure (it's reachable, there is no horizontal scroll, and dropping sticky chrome at short heights is defensible). But the people who zoom pay seven screens of upsell before they can pay. That costs the business conversions and looks like upsell-first ordering.
- Fix: When the sticky footer is dropped for short viewports, render the "Go to checkout" row **above** "Recommended for you" (after the order lines and comment), or keep a 48 px compact pinned bar.
- Effort: S
- Confidence: high (5 viewports)

## F-AP-09 [P2] Mobile lab performance is poor: 3 s of main-thread blocking, and the venue hero is the slowest paint
- User experiences: On a mid-range phone (Lighthouse mobile: 4× CPU, slow 4G), the city page shows content at ~5 s and the venue at 4.5–6.7 s. The JavaScript then keeps the main thread busy for ~3 s (TBT), so early taps lag. On Slow 3G the venue is a **blank white screen for the first ~10 s** with no loader, then server-rendered content with blurred image placeholders.
- Where: city page, Delulu venue.
- Evidence (lab, two mobile runs each):

  | Page | Perf | FCP | LCP | TBT | CLS | TTI | JS boot-up | Bytes |
  |---|---|---|---|---|---|---|---|---|
  | City mobile (`lh-city-mobile.json`, `-run2`) | 27 / 27 | 4.9 s | **8.6 / 9.2 s** (hero promo `<video poster>`) | 3.41 / 3.30 s | 0.019 | 29 s | 8.3 / 7.6 s | 7.1 / 11.6 MB |
  | Venue mobile (`lh-venue-mobile.json`, `-run2`) | 25 / 24 | 4.5 / 6.7 s | **20.7 / 23.6 s** (hero `<img fetchpriority=high>`) | 3.14 / 2.96 s | **0.106** (`<main>` shift) | 27 s | 6.7 / 6.4 s | 4.0 MB |
  | City desktop | 51 | 1.7 s | 2.1 s | 570 ms | 0.008 | 6.3 s | 2.0 s | 7.2 MB |
  | Venue desktop | 39 | 5.3 s | 5.3 s | 390 ms | 0.06 | 8.8 s | 1.4 s | 4.1 MB |

  Render-blocking CSS: Lighthouse estimates 1.8 s (city mobile), 2.2 s (venue mobile) and 4.4 s (venue desktop) of savings across ~10 chunked CSS files. Unused JS ≈1.1 MB per page. Longest task 1.2–1.5 s in `9584-….js`. Slow-3G strip: `slow3g-venue-strip-390-light.png` (frame labels are nominal, because screenshots drifted under throttling).
- Why it matters: LCP > 4 s and TBT > 600 ms are "poor". The venue hero LCP is simulated (the observed unthrottled breakdown was ~2.3 s: TTFB 318 ms, load delay 768 ms, load 512 ms, render delay 743 ms), so treat 20 s as directional. Still, the hero waits ~0.75 s on JS after download, and the 3 s TBT is real on both runs.
- Fix: Inline critical CSS for the venue header and first menu section, and defer the other CSS chunks. Split `9584-*.js` and defer analytics/AppsFlyer until after first input. Server-render the hero `<img>` with width/height so render delay drops. Reserve the `<main>` offset that shifts by 0.106.
- Effort: L
- Confidence: medium. Lab only, two runs per page, and PSI/CrUX was unavailable (429). This becomes P1 if CrUX p75 LCP on mobile is > 4 s.

## F-AP-10 [P2] The first item tap on a venue gives ~0.75–0.87 s of nothing before the modal appears
- User experiences: Tap a dish and nothing visibly happens for most of a second: no pressed state, then the modal cuts in. In one of two runs a white frame flashed for 79–166 ms first. Later taps open in 0.16–0.32 s.
- Where: venue → `horizontal-item-card-button` → `product-modal`.
- Evidence: `item-open-ttf.mjs`: cold open, first meaningful change **762 ms** (CPU 1) and **870 ms** (CPU 4). The change before that was 0% of pixels. Warm opens: 157 ms and 315 ms. Filmstrips `motion/open-item-filmstrip.png` (blank frame at +812 ms), `motion/item-open-first-cpu1-filmstrip.png`, `motion/open-item-reduced-filmstrip.png` (771 ms, no blank).
- Why it matters: Doherty threshold of 400 ms, and the 100 ms acknowledgment target. It is the first interaction on every venue visit, so every user feels it.
- Fix: Show the card's pressed state on `pointerdown` (scale 0.98 or a tint, 100 ms). Prefetch the item-modal chunk on venue idle (`requestIdleCallback(() => import(/* modal */))`) and keep the old frame until the modal can paint (no white frame).
- Effort: S–M
- Confidence: medium-high (2 sessions × 2 CPU rates).

## F-AP-11 [P2] Small status and offer text fails contrast in the light theme
- User experiences: "Closing soon", "Opens 11:00 AM", "Schedule order" and "Temporarily offline" over the city-page venue images, and the "Show details" link on venue deal banners, are hard to read for low-vision users and in sunlight.
- Where: city page venue cards (57 instances); venue → "Deals & benefits" banners (also visible behind the item modal and basket).
- Evidence: `ex-city-390-light.json`: white 12 px on `rgb(132,132,132)` = **3.71:1** (×28 "Schedule order", ×10 "Closing soon", ×7 "Temporarily offline", ×12 "Opens …"). `ex-venue-390-light.json`: `rgb(0,157,224)` 12 px on `rgb(235,247,252)` = **2.81:1** "Show details". Dark theme: venue and basket 0 failures (`ex-*-390-dark.json`). The "€€/€€€" price-level dimmed glyphs are 1.8:1 (light) and 2.52:1 (dark), but those are the "inactive" half of a scale and are covered under P3.
- Why it matters: WCAG 1.4.3 (AA, needs 4.5:1). Open or closed is the deciding fact when choosing a venue.
- Fix: Badge background `rgba(32,33,37,.80)` on the image (≥ 7:1 with white). "Show details" → `rgb(0,108,156)` on `#EBF7FC` (≈ 5.4:1), or 14 px semibold with ≥ 4.5:1.
- Effort: S
- Confidence: high (computed; visually confirmed in `ex-city-390-light.png`)

## F-AP-12 [P2] 45 quick-add buttons are all called "Add one more", so the button list can't tell dishes apart
- User experiences: A screen-reader user pulling up the buttons list on the venue hears "Add one more" 45 times. In the basket, 21 upsell "+" buttons are also "Add one more". On the city page there are 12 "Previous" and 12 "Next" carousel buttons with no carousel named. The label is also wrong for an item not yet in the basket.
- Where: venue item-card "+" buttons; basket "Recommended for you" "+"; city carousels.
- Evidence: `ax-tree.mjs` output: "dup names >2: button:Add one more ×45" (venue after add), "×21" (basket). `city-ax.mjs`: "button:Previous ×12 | button:Next ×12".
- Why it matters: Beyond-WCAG tree walk: names must make sense out of context (2.4.6 / 2.4.9 territory). Basket stepper buttons have the same problem once there are 2+ lines ("Remove one", "Remove item" with no item).
- Fix: `aria-label="Add Classic Fries, €4.00"`. In the basket: `"Remove one Classic Smashed Cheeseburger"`. Carousels: `aria-label="Next — Fastest delivery"`, or wrap each carousel in a `<section aria-labelledby>`.
- Effort: S
- Confidence: high

## F-AP-13 [P3] Smaller items, grouped
- **Headings and landmarks:** the city page h1 is "Discovery" (not "Limassol"), followed by an empty h2. The basket exposes both "h2 Your order" and "h1 Your order". There are five unnamed `navigation` landmarks. The cookie dialog has no accessible name (Lighthouse `aria-dialog-name`). Both search fields are named only by placeholder. (`ax-*.txt`, `city-ax.mjs`)
- **Touch targets ≥ 24 but < 44 px on phone:** Favorite 36×36, basket steppers 40×40, menu category chips 36 tall, header search and user menu 40×40, "More info" (i) 20×20 (isolated, so it passes the 2.5.8 spacing exception). The cookie sheet's privacy-preserving "Use only necessary" is the smallest target at 144×24, against "Allow" at 326×46 (`kb4` log); the ethics question belongs to another auditor. (`targets.mjs`)
- **Reduced motion:** the city hero gallery stops auto-advancing under `prefers-reduced-motion`, but the first slide's 4 s video keeps looping (`video-probe.mjs`, `hero-probe.mjs`). A named "Pause the gallery" control exists, so WCAG 2.2.2 is met.
- **320 px:** the floating "Show more" pill covers the "+" of the left upsell card (`reflow-320-basket-light.png`). Item names and descriptions are line-clamped on cards at 320 px and 200%, but the full text is in the modal and in the accessible name.
- **Venue mobile CLS 0.106** (`<main>` shift, both runs): just over "good".
- **Sign-in sheet (desktop):** Facebook button text is 4.13:1 (Lighthouse `color-contrast`, `lh-venue-desktop.json`).

---

## Strengths
- The item modal and basket are well-built dialogs: `aria-modal`, named by their heading. Focus moves to Close on open, Tab wraps inside, Esc closes, and focus returns to the trigger (the card, or "View order") (`kb3-run-d1440.txt`).
- `prefers-reduced-motion` is honoured in practice: stepper, basket and close transforms drop to opacity-only or 0 animations (open-basket 26 → 24 opacity-only, basket ± 5 → 0), and the hero gallery stops auto-advancing (`motion/*-reduced.json`).
- Add and the steppers acknowledge fast: first visible change 28–39 ms, settled ≤ 0.5 s. There is no horizontal scroll at 320 px or at 200% zoom, the light-theme venue and basket have only 2 contrast failures out of 179 and 237 texts, and dark theme has none (`motion-rm.mjs`, `reflow.mjs`).

## Answers to the brutal questions
- **Who can't complete the core journey?** Nobody is fully blocked: a keyboard-only or screen-reader user can reach the sign-in wall. But a desktop keyboard user who doesn't think to press Esc is stuck in the header search loop (F-AP-01) before seeing a single venue. A screen-reader user browsing by cuisine meets 19 blank links (F-AP-02), and after adding, gets "1" and a 97-stop trek to the basket (F-AP-03).
- **Biggest speed problem a user feels:** on a phone, the heavy JS. Lab TBT is ~3 s and boot-up 6–8 s, and the first tap on a dish gives ~0.8 s of nothing (F-AP-09, F-AP-10).

## Interaction log
| # | Action | What happened | Time |
|---|---|---|---|
| 1 | City, desktop, fresh guest: load | Cookie dialog (aria-modal) has focus on "Privacy Statement"; Tab 1 = "Use only necessary" | — |
| 2 | Enter on "Use only necessary" | Banner closed, focus → body | ~1 s |
| 3 | Tab ×25 | Logo → Limassol → search opens dialog → Close → logo … loop ×8 | 120 ms/stop |
| 4 | Esc in search dialog | Dialog closed, focus on search, next Tab = Log in | 0.6 s |
| 5 | Venue, desktop, fresh guest | Sign-in sheet has focus under the cookie overlay; 8 Tabs never reach the cookie banner; empty email turns red | — |
| 6 | Esc → Tab → Enter | Sign-in closed, cookie reached in 1 Tab, dismissed | ~2 s |
| 7 | Tab to first item card | 23 stops (with one Esc out of search) | — |
| 8 | Enter on card | Item modal open, focus on Close; Tab 13 stops to "Add to order"; wraps to Close | 1.5 s wait |
| 9 | Esc | Modal closed, focus back on the card | 0.9 s |
| 10 | Enter, Tab to Add, Enter | Item added, focus on card; live regions "1", "Add €1.5 more", "Deal applied €0 delivery fee" | 1.5 s |
| 11 | Tab to "View order" | 97 stops (items, footer, wrap, header) | — |
| 12 | Enter on View order | Basket open, focus on Close; 28 stops to "Go to checkout" (20 upsell cards); wraps | 2 s |
| 13 | Esc / reopen / Enter on Go to checkout | Sign-in wall opens; focus stays on the button behind it. **STOP** | 3 s |
| 14 | Phone 390: tap card (cold) | First visible change 762 ms (CPU 1) / 870 ms (CPU 4); warm 157–315 ms | measured |
| 15 | Modal "+", Add to order, basket ± | First change 28–39 ms; settled ≤ 0.5 s (Add 1.8 s incl. bar and offer message) | measured |
| 16 | Same under prefers-reduced-motion | Transforms removed; the item modal still appears at ~771 ms | measured |
| 17 | 320 / 640×400 / 844×390 / text-spacing override | No horizontal scroll; checkout unpinned at ≤ 512 px tall | — |
| 18 | Lighthouse ×6 (mobile ×2 per page, desktop ×1) | See F-AP-09 | ~1 min each |
| 19 | PSI field data | HTTP 429 quota, not available | — |

Scripts (reproduction): `evidence/access-perf/*.mjs`, `diff-crops.py`. Raw: `kb3-run-d1440.txt`, `kb3-stops-d1440b.json`, `focus-diff-d1440.txt`, `ax-*.json/txt`, `ex-*-390-{light,dark}.json`, `lh-*.json`, `motion/*.json` + filmstrips.
