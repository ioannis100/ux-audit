# first-timer — findings
Persona "Jordan": new to Limassol, hungry, on a phone, never used Wolt, mildly distracted, leaves the moment it stops being worth it.

Coverage: 9/9 guest screens in the brief's inventory (city page, cookie sheet, Restaurants list, search, venue, venue sign-in sheet, item modal, after-add bar + offer assistant, basket, checkout sign-in wall), plus Order details/address sheet, favourite wall, user menu, return visit (city + venue), "Continue order?" dialog, search empty/no-results/typo states. Foody home page (flash test, view only).
Not reached: signed-in checkout, payment, fees as charged, order tracking, favourites, Wolt+ membership (no Wolt+ block was rendered for a guest at this hour; `highlighted-carousel-wolt-plus-image` absent), notifications, desktop (another agent's scope), dark theme.
Viewports/devices: headless Chrome via `evidence/orchestrator/wolt.mjs`, 390×844 @2x, touch, **light theme forced**, fresh context per scenario. Every screenshot below is light theme.
**Time-of-day caveat:** the run happened 02:45–03:05 Cyprus time (EEST). Most venues were "Closing soon" or "Closed"; the same 4–6 venues fill every carousel. I did not count that thinness as a finding. A daytime re-run is needed for F-FT-05.
Never signed in, never typed email/phone/password. Address used: the public landmark "Limassol Marina" only.

## Sign-in prompt log (every time Wolt asked who I am)
| # | When | Form | Copy | How to close | Pushiness |
|---|------|------|------|--------------|-----------|
| S1 | +1.2 s to +1.5 s after tapping the first venue of a session (3 runs: 1211, 1534, 1204 ms) | Bottom sheet, 635 of 844 px (75%), dims the venue | "Log in or sign up to start ordering from Delulu Burgers & Shakes" + Google / Apple / Facebook / email | X (40×40 at top-right), Esc, tap on backdrop: all work, 1 tap | Medium-high. It arrives before you've seen a single dish, and "to start ordering" is untrue because a guest can build a basket. It doesn't come back on reload or on a second venue (sessionStorage `woltcom-contextual-login-venue-dismissed`) but does come back in every new session/tab (`46-basket-new-tab.png`). |
| S2 | Tap "Go to checkout €10.50" | Full-screen page | "Create an account or log in / Log in below or create a new Wolt account." | **No X, Esc does nothing, no backdrop.** Only the browser back button. The basket survives back | Hard wall. Expected at checkout, but it's a dead end with no context (`24-checkout-signin-wall.png`, `26-wall-after-esc.png`) |
| S3 | Tap the heart (Favorite) on the venue | Same full-screen wall | Same generic copy, nothing about favourites | Same: no X, Esc and a top tap both do nothing; only browser back | Hard, and unexplained (`40-favourite-tap.png`) |
| S4 | Tap the avatar (user menu) | Dropdown: "Login or register / Language" | — | Esc | Fine. The user asked for it |
| S5 | Return visit (new tab, same browser) → venue | S1 again, then the "Continue order?" dialog stacked behind it | — | as S1 | Two interruptions before the menu (`46`, `46b`) |

## F-FT-01 [P1] "Go to checkout" swaps my order for a generic account wall with no way out but the browser back
- User experiences: I tap "Go to checkout €10.50" and the whole screen becomes "Create an account or log in" with three social buttons and an email field. There's no venue, no burger, no price and no close button. Esc does nothing. I can't tell whether my order still exists. The heart (favourite) leads to the same wall.
- Where: Journey 2 → basket → `CartViewNextStepButton` → `auth-modal`; also venue → Favorite heart.
- Evidence: `24-checkout-signin-wall.png`. Wall buttons enumerated: only Google/Apple/Facebook (3 buttons, no close) (`j2-wall-address.mjs`). Esc leaves the wall open (`26-wall-after-esc.png`). Browser back closes it and the basket is still "1 View order €10.50" (`27-wall-after-back.png`). Favourite: same wall, Esc and backdrop tap both leave it open (`j3-basket-persist.mjs`, `40-favourite-tap.png`). Compare S1 on the venue, which closes three ways.
- Why it matters: this is the moment of highest intent and the worst moment of the journey. Nielsen #3 (user control): a full-screen dead end, and in an installed PWA or in-app browser there's often no visible back button. Forced account creation is the cause of 26% of checkout abandonment (Baymard). Uber Eats web also requires sign-in, so the wall itself is the category norm. The failures are the lost context and the missing exit. The same component closes three ways on the venue and zero ways here (Jakob, consistency).
- Fix: keep the wall as a sheet over the basket, not a page swap. Title: "Log in to order from Delulu Burgers & Shakes · €10.50". Put a one-line order summary (venue logo + "1 item · €10.50") at the top. Add an X (40×40, top-right) and Esc/backdrop close that return to the basket. For the heart: "Log in to save Delulu to your favourites". Keep the order context on every auth entry point.
- Effort: S
- Confidence: high (4 reproductions across 3 scripts).

## F-FT-02 [P1] The cookie sheet makes "Use only necessary" the quietest choice and "Allow" the loudest (ethics gate: visual interference)
- User experiences: before I see anything, a sheet covers the bottom half with a paragraph and two big filled buttons, "Manage" and "Allow". The privacy-friendly choice is grey text above them that I first read as part of the paragraph.
- Where: first visit, any page → cookie sheet.
- Evidence: `01-city-first-visit.png`. Measured: "Use only necessary" is a 144×24 px text button, colour rgb(111,107,104) on white (5.28:1, readable). "Manage" is a 326×46 light-blue fill and "Allow" a 326×46 saturated-blue fill, weight 700 (`j1-city.mjs`, `misc-checks.mjs`). Competitor Foody does the same or worse: "Accept required ›" is an inline link at the end of the paragraph, against a full-width white "Accept all" (`f01-foody-first-visit.png`).
- Why it matters: emotional.md ethics gate, "Visual interference" and "Cookie walls without an equally prominent Reject all": confirmed, so P1. The EDPB cookie-banner taskforce treats unequal prominence of reject as non-compliant. To its credit the copy is honest and names both outcomes, and the reject option is listed first. The failure is visual weight only.
- Fix: give "Use only necessary" the same 326×46 button as "Allow", same style (two equal secondary buttons, or both filled), with "Manage" as the text link. Order: "Use only necessary" / "Allow all", side by side or stacked at equal size.
- Effort: S
- Confidence: high (measured).

## F-FT-03 [P2] A returning guest's saved basket is silently deleted by "No", by tapping outside or by Esc on "Continue order?"
- User experiences: I come back, the venue asks "Continue order? You've got a cart saved for this restaurant…" with **No** / **Yes**. "No" already has the focus ring. A second earlier I closed the sign-in sheet by tapping outside it, so I tap outside this one too, and my basket is gone with no undo.
- Where: Journey 3 → reload or new session → venue → "Continue order?" dialog.
- Evidence: `45-basket-after-reload.png`. `j3-continue.mjs`, 5 runs, `localStorage.STORED_ORDERS` checked before/after: **No** → `{}` and bar "0 View order €0.00"; **Esc** → `{}`; **backdrop tap** ×2 → `{}` both times; **Yes** → basket kept (`{"delulu-burgers-shakes":1}`, "1 View order €10.50"). `document.activeElement` = "No" on open.
- Why it matters: Nielsen #5 slip-proofing. The dismissive gestures (outside tap, Esc) and the default-focused button all have the destructive outcome. The S1 sheet one second earlier teaches exactly the gesture that empties the basket here. Dialog buttons should answer the question (content-and-forms.md): "No" to "Continue order?" doesn't say what it deletes. One item is cheap to rebuild. A 6-item group basket with options is not.
- Fix: buttons "Start a new order" (secondary) / "Continue order" (primary, default focus). Backdrop and Esc = keep the basket (non-destructive). If "Start a new order" is chosen, show a 5 s toast "Basket cleared · Undo". Better still, skip the dialog: restore the basket and show "Your saved basket is back · Clear".
- Effort: S
- Confidence: high.

## F-FT-04 [P2] I can't find out what I'll pay before creating an account
- User experiences: the basket shows the burger (€10.50) and "Go to checkout €10.50". Cards say "€0.00" next to a bike icon. A toast said "Deal applied €0 delivery fee". I still don't know if there's a service fee, a small-order fee or a different total, and the only way to find out is to sign up.
- Where: Journey 2 → basket (`?cart=open`), with and without an address.
- Evidence: basket text has no "fee", "service", "subtotal" or "total" line (`basket-text.txt`, `22-basket.png`). After setting the address to "Limassol Marina" via Order details, the basket still shows no fee lines (`37-basket-with-address.png`, `j2-address3.mjs`: regex for delivery|service|fee|total|subtotal → empty). The next tap is the account wall (F-FT-01).
- Why it matters: anxiety reducer #1 for payments is total cost before commitment. 48% of abandoners cite extra costs (Baymard). Here the commitment asked is an identity, not a card, but it's still a commitment made blind. Not rated as a hidden-cost dark pattern because I couldn't see the signed-in checkout.
- Fix: in the basket, under the items: "Subtotal €10.50 · Delivery €0.00 (deal) · Service fee €x.xx · **Total €x.xx**". Make the CTA "Go to checkout · €x.xx total". If a fee depends on the address, say "Service fee from €x, exact at checkout".
- Effort: M
- Confidence: medium. A signed-in checkout pass (the brief puts it out of scope) would show whether fees appear there, which would raise this or close it.

## F-FT-05 [P2] Order details shows both "Delivery" and "Pickup" struck through, with no explanation
- User experiences: I tap "Choose location" to set my address. The sheet's first thing is a toggle where **both** options are crossed out and greyed, yet "Standard 35–45 min" is selected below. I think: can I get this food at all?
- Where: venue → "Choose location" → Order details sheet.
- Evidence: `28-choose-location.png`, `33-where-marina.png`. Both buttons `disabled=true`, Delivery `aria-pressed=true`, no aria-label, title or helper text (`j2-address2.mjs`). Tapping Pickup does nothing and shows no message (`31-order-details-pickup-tap.png`). Cyprus time 02:55, venue "Open until 03:30".
- Why it matters: Nielsen #1 and #9. An unavailable state with no reason is an anxiety spike mid-flow. Strikethrough reads as "cancelled/unavailable" in commerce, and a screen reader announces only "Delivery, dimmed".
- Fix: show only the available mode as a selected label, or keep the toggle and add one line under it: "Pickup isn't offered by this venue" / "Delivery only after 02:00". Use `aria-describedby` for the reason.
- Effort: S
- Confidence: medium. Likely tied to the hour and the venue; re-check in daytime and on a pickup-enabled venue.

## F-FT-06 [P2] The venue greets me with a sign-up sheet before I've seen the menu, and its headline isn't true
- User experiences: 1.2 s after tapping a burger place, 75% of the screen becomes "Log in or sign up to start ordering from Delulu Burgers & Shakes". I nearly bounced because I thought Wolt needs an account even to look. Closing it showed I could browse and fill a basket as a guest.
- Where: Journey 2 → first venue of each session → S1.
- Evidence: `10-venue-signin-sheet.png`. Timing 1211/1534/1204 ms (`j2-venue-signin.mjs`). Rect y=209, h=635 of 844. It closes by X (1 tap, `12-venue-after-close.png`), Esc and backdrop (`14-after-backdrop-tap.png`), so credit for easy exit. Returns in each new session (`46-basket-new-tab.png`).
- Why it matters: flow protection (usability.md) says no modals during the core task. Onboarding paradox says defer sign-up until value is shown. Label ≠ actual action: "to start ordering" is false. On return it stacks with the "Continue order?" dialog (two interruptions before the menu).
- Fix: drop the arrival sheet. Ask at the natural boundary (first "Add to order" or checkout) with true copy: "Log in to save your basket and get €5 off your first order". If it stays, make it a 1-line dismissible banner under the hero, never a 75% sheet.
- Effort: S
- Confidence: high.

## F-FT-07 [P2] Day 2: nothing is waiting for a returning guest
- User experiences: I closed the tab with a burger in my basket. Next visit the city page is pixel-for-pixel the same: no "Your Delulu basket is waiting", no recently viewed, and the favourite heart is locked behind an account. The only thing that might pull me back is the €5 first-order offer, which every newcomer gets.
- Where: Journey 3 → new tab, same browser → `/en/cyp/limassol`.
- Evidence: `42-return-city.png` vs `02-city-after-cookies.png` (same top). `localStorage.STORED_ORDERS` still holds the Delulu basket, but the city page shows no cart or continue cue (`j3-return.mjs`, `j3-basket-persist.mjs` (c): "cart cue: none"). The saved basket only resurfaces as the F-FT-03 dialog if I happen to open the same venue. Favourite → wall (S3).
- Why it matters: engagement-retention.md Day 0: "If nothing is waiting, they won't come back". Motivation (a basket waiting) exists but is invisible, so the Fogg check fails on trigger and ability. A saved-basket cue uses necessary storage only, so it fits the "only necessary" cookie choice.
- Fix: on the city page, under the header, show a card "Your basket at Delulu Burgers & Shakes · 1 item · €10.50 · Continue →" (one tap back to `?cart=open`), with an × to clear. Let guests heart venues locally ("Saved on this device · Log in to keep them everywhere").
- Effort: M
- Confidence: high on absence; medium on pull (no notifications or email possible for a guest).

## F-FT-08 [P3] Numbers without labels, and four ways to write the same offer
- User experiences: on every card I read "🛵 €0.00 · 40–50 min · 🙂 8.4". Is €0.00 the food? Delivery? Is 8.4 out of 5 or 10? The offers read "5 € off (spend 12 €)", "€5 off on orders over €12", "-€5 on your first order" and "Add €1.5 more" next to an unexplained "+1".
- Where: Restaurants list, search results, venue, offer assistant.
- Evidence: `05-restaurants.png`, `07-search-burger.png`, `21b-after-add-+4.5s.png`, `city-text.txt`. "+1" isn't a button (`probe-labels.mjs`: offer assistant has 0 buttons). The rating's accessible name is just "Rating".
- Why it matters: Nielsen #2 / #4. A newcomer has to decode Wolt-specific shorthand at every decision. "€1.5" also breaks currency formatting.
- Fix: "Free delivery" instead of "€0.00" (or "Delivery €0.00"). "8.4/10" or "8.4 ★ (10-point)" on first exposure. One offer pattern: "€5 off orders over €12". "Add €1.50 more". "+1" → "+1 more deal".
- Effort: S
- Confidence: high.

## F-FT-09 [P3] Small first-screen and basket rough edges
- User experiences: (a) the city page opens with an empty ~40 px band under the header, which reads as something that failed to load (`02-city-after-cookies.png`; probe: empty `MainDiscoveryContent` div, h=40, at y≈125–165). (b) An empty search shows a blank strip, with no popular searches or cuisines (`06b-search-open-3s.png`, after 3 s). (c) The basket's "Recommended for you" lists 22 upsell cards (sauces, drinks) under one burger, and one has a placeholder image ("Sweet Potato fries", `23-basket-bottom.png`). My own basket item carries a "Popular" badge too (`22-basket.png`).
- Why it matters: (a) visceral polish; (b) "empty search is never blank" (content-and-forms.md); (c) Hick. The checkout CTA is sticky, so there's no harm beyond noise.
- Fix: remove or collapse the empty container. Seed empty search with 6 cuisine chips (Burger, Souvlaki, Pizza…). Cap basket upsell at 4 with "See more". Hide the "Popular" badge inside the basket. Hide items without images from upsell.
- Effort: S
- Confidence: high for a, b and c's counts; low for (a)'s cause.

## Strengths (only real ones, max 3)
- Search is fast and forgiving: "burgr" finds Delulu, "suvlaki" finds souvlaki places and a "Chicken suvlaki sandwich", and results show dishes with prices (`07-search-burger.png`, `09-search-burgr.png`, `09-search-suvlaki.png`).
- A guest can go from the city page to a priced basket with zero typing. The Restaurants list shows real dishes and prices per venue, with a skeleton by +400 ms (`04-restaurants-+400ms.png`, `05-restaurants.png`). The item modal total updates live ("Add to order €10.50" → "€21.00" at qty 2).
- Sponsored placements say "Sponsored", and closed venues say "Closed / Schedule order · Opens 11:00 AM". No disguised ads and no fake urgency seen.

## 5-second test (city page, after cookies, `02-city-after-cookies.png`)
- What is it: "Wolt, a delivery app for Limassol: restaurants, groceries, and a lot of other shops." Got it in about 2 s from the tiles and food photos. No words say "delivery" until "Fastest delivery" at the fold.
- Who it's for: anyone in Limassol who wants something brought to them.
- What to do first: tap "Restaurants" (first tile) or a venue card. Passed. Before the cookie choice, though, the first 5 seconds are about cookies, not food (`01-city-first-visit.png`).

## Flash test (0.5 s look + 8 px blur, 390×844 light)
| | Wolt | Foody |
|---|---|---|
| First view (cookie sheet up) | 64. Dimmed food tiles behind a white sheet, calm blue CTAs (`01`, `01b`) | 55. Floating basket illustration + orange swooshes, black cookie slab over the bottom third (`f01`, `f01b`) |
| After cookies | **72.** Pastel category tiles, real food photography, one strong yellow McDonald's banner, generous whitespace. Loses points for the empty band at top and the banner shouting louder than the brand (`02`, `02b`) | **58.** Clean, but the hero eats ~75% of the fold with a floating lipstick/broccoli product shot and rotating "Order Coffee / Souvlaki online in 1'". No real venue visible until scroll. Bright green "Order now" competes with the orange brand (`f02`, `f02b`) |
Gestalt verdict: Wolt reads as a calm, real marketplace and Foody as a marketing page. Wolt wins the glance. Its weakest pixel is the top band.

## Krug's five questions (city page above the fold)
1. What is this? Partly. No tagline. Inferred from tiles; "delivery" first appears at y≈606.
2. What can I do here? Yes: 16 category tiles, venue carousels.
3. What do they have? Yes: categories + named venues with ETA.
4. Why here rather than elsewhere? **No.** No reason above the fold (Foody: "3.500+ stores · card, cash or PayPal"). Only the McDonald's €5 banner.
5. Where do I start? Yes: "Restaurants" is the first tile. 16 equal tiles is a lot (Hick), but the first slot is right.

## Trunk test (cover the content, 2 s)
| Element | Restaurants list (`05`) | Venue (`21`) |
|---|---|---|
| Site ID | ✓ Wolt logo | ✓ white logo on photo |
| Page name | ✓ "Restaurants" (H1) | ✓ venue name |
| Main sections | ✗ none (logo/back only) | ✗ none |
| Local nav | ✓ filters + cuisine circles | ✓ menu categories (lower on page) |
| You are here | ✗ no breadcrumb or active state above the fold | ✗ breadcrumbs only in the footer |
| Search | ✓ | ✓ in-venue search |
4/6 on both. Normal for mobile food apps (Uber Eats web is the same). Not raised as a finding.

## Time-to-value and counts (Journey 1+2, guest)
- Cold load of `/en/cyp/limassol`: 6.2 s to `load` (headless, lab). Cookie decision: ~3 s human reading.
- First felt value (real dishes with prices on the Restaurants list): **≈ 12 s** (load + cookie + tile tap 2.3–3 s). Well under the 60 s target.
- Item in basket: ≈ 25–30 s. Checkout wall reached: ≈ 40 s.
- Screens to the wall: 6 (city → restaurants → venue → item modal → basket → wall). Inputs typed: 0. Permission prompts: 0. Interruptions: 3 (cookie sheet, venue sign-in sheet, wall). Decision points: cookie (3 options), category (16), venue (~8 open at this hour), item options (5 optional add-ons), upsell (22), checkout → account method (4).

## Emotional journey map
- City, cookie sheet → **mildly annoyed**: I want food and get a legal paragraph with the "no" option whispered. *Anxiety spike (privacy).*
- City after cookies → **reassured / hungry**: real photos, calm colours, "Restaurants" right there.
- Restaurants list → **confident**: dishes with prices, ETAs, ratings. Only "€0.00" and "8.4" make me squint.
- Search "burger" → **pleased**: instant, forgiving, dish-level results. *Best moment.*
- Tap venue → sign-in sheet → **put off, briefly anxious**: "do I have to sign up just to look?" Easy X saves it. *Anxiety spike (personal data).*
- Venue menu → **interested**: big hero, rating, "Open until 03:30", €5 deal.
- Item modal → **in control**: clear price, add-ons priced, live total.
- Add to order → **small win**: bar with "1 · €10.50", "Deal applied €0 delivery fee", "Add €1.5 more" for €5 off. A good nudge, though "+1" is cryptic.
- Choose location → **confused**: both modes struck out. *Anxiety spike (can I even get this?).*
- Basket → **uncertain**: what's the total? 22 upsell cards, no fee lines. *Anxiety spike (money).*
- Go to checkout → **trapped / deflated**: whole screen replaced by a generic account page, no order, no X. ***Worst moment, and it is also the ending of the guest journey.***
- Return next day → **ambushed**: sign-in sheet, then "Continue order? No/Yes". Tapping outside loses my basket.
- Peak: search results. End: the wall. Peak-end says this guest remembers the wall.

## Trust check at first glance
- Email? **Yes.** Polished, consistent, known brand, real venue photos, sponsored labels, honest cookie text.
- Card? **Not yet.** I haven't seen a total (F-FT-04). The page that asks for my identity doesn't show what it's for (F-FT-01), and I'm still unsure what the struck-through Delivery means (F-FT-05). What undermines it: blind commitment, not the look.

## Day-2 test
Closing it, nothing would bring me back tomorrow except hunger and the generic "€5 off your first order". My saved basket exists but is invisible from the home page (F-FT-07), and trying to resume it can delete it (F-FT-03). Favourites, the one free "investment" a guest could make, are gated behind an account. Nothing is waiting for me.

## Empty, error and loading states hit as a newcomer
- Loading: Restaurants list skeleton at +400 ms, shaped like the final layout. Teaches. ✓ (`04-restaurants-+400ms.png`)
- No search results ("qzxvburgr"): friendly explorer illustration + "No results found", but no suggestion, no "Try burger, pizza…", no spelling hint. Half a state (`08-search-noresults.png`). Typos close to real words are auto-corrected, which mostly prevents this.
- Empty search: blank (F-FT-09b).
- Unavailable modes: unexplained strikethrough (F-FT-05).
- Deep link `/en/cyp/limassol/stores/category/restaurants` without its query string redirected a fresh guest to `/en/discovery` (`probe-links` run, now deleted; seen once). Not raised: one observation, low confidence.

## Three measures per task (persona rating /10)
| Task | Completed | Time | Rating |
|---|---|---|---|
| 1 Browse to choose | Yes | ≈ 12 s to dishes, ≈ 20 s to a venue | 8 |
| 2 Order up to checkout | Yes, to the wall (stop) | ≈ 40 s | 5 |
| 3 Return / pull | Partly: basket recoverable only via "Yes" | — | 3 |

## Brutal questions
- **At which exact second would a real newcomer quit?** Two exits. The uncommitted browser leaves at **≈ 15 s**, when the venue's 75% "Log in or sign up to start ordering" sheet lands 1.2 s after they tap their first restaurant, before they've seen a dish. The committed one leaves at **≈ 40 s**, on the full-screen account wall that hides their order, total and exit.
- **What did the product fail to make me feel?** That I'm welcome before I hand over who I am, and sure of what I'll pay. It never made me feel anything was waiting for me tomorrow.

## Hesitations
`H-xx | screen → moment | what I thought I should do | what actually happened | seconds lost | screenshot`
- H-01 | City → cookie sheet | look for a "Reject" button equal to "Allow" | the reject option is grey text above two filled buttons; I read it as part of the paragraph | 3 | 01-city-first-visit.png
- H-02 | City → first screen | wait for the blank band under the header to fill | it never fills (empty 40 px container) | 1 | 02-city-after-cookies.png
- H-03 | Restaurants list → card meta | work out what "🛵 €0.00" and "🙂 8.4" mean | no labels; guessed "free delivery" and "out of 10" | 3 | 05-restaurants.png
- H-04 | Venue → arrival sheet | decide whether to leave, since it says I must log in "to start ordering" | X closed it; guests can browse and add | 4 | 10-venue-signin-sheet.png
- H-05 | Venue → header "Limassol" vs "Choose location" pill | figure out which one sets my delivery address | the pill opens "Order details"; header pill not tested | 2 | 12-venue-after-close.png
- H-06 | Order details → Delivery/Pickup toggle | decide whether delivery is possible right now | both disabled and struck through, no reason; "Standard 35–45 min" still selected | 5 | 28-choose-location.png
- H-07 | After add → offer assistant "+1" | tap "+1" to add one more | it isn't a button; nothing happened | 2 | 21b-after-add-+4.5s.png
- H-08 | Basket → total | find delivery/service fees and a total | only the item price and "Go to checkout €10.50" | 5 | 22-basket.png
- H-09 | Checkout wall → exit | find an X or tap Esc to get back to my order | no X, Esc ignored; had to use browser back | 4 | 24-checkout-signin-wall.png
- H-10 | Venue → heart | expect "saved" or "log in to save favourites" | generic full-screen account wall, no close | 3 | 40-favourite-tap.png
- H-11 | Return → "Continue order? No / Yes" | work out what "No" does; tap outside to dismiss it like the previous sheet | No, outside tap and Esc all delete the basket | 3 | 45-basket-after-reload.png

## Interaction log (action → what happened → time)
1. Cold open `/en/cyp/limassol` → cookie sheet over dimmed city page → 6.2 s to load (`j1-city.mjs`)
2. "Use only necessary" → sheet gone, city page → <1.2 s
3. Tap "Restaurants" tile → skeleton at +400 ms, list at ~2.3–3 s (URL carries `rootCategory` + `linkSource` params) (`j1-browse.mjs`)
4. Tap search icon → input focused, blank panel → 1.2 s; typed "burger" → results by ~2.5 s (`j1-search.mjs`)
5. "qzxvburgr" → "No results found" illustration; "burgr", "suvlaki" → correct results (`misc-checks.mjs`)
6. Tap Delulu card in Restaurants → venue + sign-in sheet at +1.2 s; X closes in 1 tap; Esc closes; backdrop closes; not shown again on reload or a second venue (`j2-venue-signin.mjs`)
7. Tap first item → item modal ~1.5 s; qty + → "Add to order €21.00"; − → €10.50 (`j2-order.mjs`)
8. "Add to order" → +200 ms no bar yet; by +1.5 s "1 View order €10.50" + "Deal applied €0 delivery fee"; by +4.5 s "€5 off on orders over €12 · Add €1.5 more +1"; no sound or vibration (fxLog `[]`)
9. "View order" → basket sheet: comment, item, 22 upsell cards, sticky "1 Go to checkout €10.50" → 2.2 s
10. "Go to checkout" → full-screen account wall, no close → 2.5 s. **Stopped here.** Browser back → basket intact (`j2-wall-address.mjs`)
11. "Choose location" → Order details, both modes struck through; Where → typed "Limassol Marina" → picked suggestion → Continue → Done → ETA 45–55 min; basket still shows no fees (`j2-address2.mjs`, `j2-address3.mjs`)
12. Heart → account wall; Esc and top tap don't close; back closes (`j3-basket-persist.mjs`)
13. New tab → city page: no basket cue; venue → sign-in sheet again, then "Continue order?" (`j3-return.mjs`)
14. Reload → "Continue order?": No / Esc / backdrop ×2 → basket deleted; Yes → basket kept; default focus = No (`j3-continue.mjs`)
15. Foody cold open → hero + black cookie slab; "Accept required" (inline link) → hero "Order Coffee online in 1'" + "Order now" (`flash-foody.mjs`). View only, no sign-up.

All scripts and evidence: `./ux-audits/2026-10-09-wolt-web/evidence/first-timer/`.
