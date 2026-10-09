# visual-craft — findings
Coverage: 11 of 12 inventory screens/states at 390×844 and 1440×900 in light, and the same set at 390 in dark. Screens: cookie sheet, city page, venue A (Delulu, open), venue A's sign-in sheet on arrival, venue B (Thymari Old Port, closed / "Schedule order"), item modal, after add, basket sheet, sign-in wall, search with no results (`/search?q=zzqxvbnm`), a removed venue (`/restaurant/this-venue-does-not-exist-xyz`), and an unknown URL (`/en/this-page-does-not-exist-xyz`). The unknown URL redirects to the wolt.com landing page; there is no 404 screen.
Not reached: **the Restaurants list.** For a guest with no address, both `/en/cyp/limassol/restaurants` and the tile's own href `/stores/category/restaurants?...` redirect, to the city page and to `/en/discovery`. Dark mode was not captured at 1440. Food photography, venue logos and advertiser banners (McDonald's) are treated as content and excluded from type and token judgements.
Viewports/devices: headless Chrome through `evidence/orchestrator/wolt.mjs`: 390×844 @2x with touch, and 1440×900 @2x. `prefers-color-scheme` is forced per run. Every screenshot is named `<screen>-<width>-<theme>.png`, with an `extract-design.js` and probe JSON beside it.
Evidence folder: `evidence/visual-craft/`. Scripts: `capture.mjs`, `capture2.mjs`, `probe2.mjs`, `crops.mjs`, `cookie.mjs`, `gap.mjs`, `foody.mjs`. The per-screen digest is in `summary.txt`.

**Verdict up front:** this is a strong, deliberate system. Most failures are in secondary text colours and on edge screens, not in the core look.

## Measured system (the basis for the scores)
- **Type:** two families. DD Scoop (Wolt's brand face) is used only for H1/H2. Everything else uses the platform system stack. Across product screens the sizes are **12 / 14 / 16 / 20 / 24 / 32 / 48**, a clean hand-tuned scale; the landing page adds 36/53/60/72. Each screen uses 4–5 sizes. Heading line-heights are tight and correct: H1 32/35 (1.09), H2 20/24 (1.2), item title 16/22. Description paragraphs use 1.43 (14/20). No text is under 12px on any screen. No uppercase text is missing tracking (all caps in the menu, like "BURGER BOOSTERS" and "SMASHED PATTY", come from venue data, not from `text-transform`).
- **Spacing:** 11 distinct values on the city page and 16–21 on venue, modal and basket screens. Almost all sit on a 4px grid. The off-grid values are a consistent 2px and 6px half-step (6px is used 189–560 times per screen) and one 54px.
- **Radii:** 12px dominates (cards and images, 109–547 uses per screen). Also in use: 8px (thumbnails), 16/20/24px (deal cards, CTAs, sheets), 9999px (pills), 50% (icon buttons) and 4px (checkboxes). Each radius maps to a role. 1–4 shadow levels per screen. CTAs share one 3-layer recipe: `0 4 6 / 0 8 12 / 0 16 24`, each at 7% black.
- **Colour:** a white canvas with navy text `#272B42`, grey secondary text `#6F6B68` (5.3:1), a teal link colour `#145367`, and one action fill, sky `#66CBF0` with navy `#08303E` label text (computed **7.6:1**). Secondary actions use a 5% tint, `#DCF7FF`. The brand blue `#009DE0` appears only on "Show details" (see F-01).
- **Tokens:** 3,279 custom properties in three tiers: `--base-color-neutral-0…100` in steps of 5, then `--usage-color-*`, then `--comp-color-*`, plus `--usage-motion-*` and `--comp-space-*`. These are product-owned names, not framework defaults, so the token test passes.
- **Dark mode:** fully supported and follows `prefers-color-scheme`. Surfaces are navy-tinted, not black: `#161929` → `#1C1F31` → `#202337`, so elevation comes from lighter surfaces. Text is `#E3DEDA` (primary) and `#949AB9` (secondary). The accent is lightened to `#71D2F6`. Contrast failures in dark (excluding decorative ones): 2, on 2 screens. Screenshots: `*-390-dark.png`.
- **Fold (city page, 390):** 6 hues, 4 text sizes, 60 bounded regions. The hues come from the 6 pastel category tiles and the advertiser banner. The layout is conventional (wordmark top-left, address, search and account top-right). The Foody landing page has 1 hue, 4 sizes and 11 regions, but it is an address-entry page, not a discovery page. The like-for-like comparison is Wolt's own landing page: 3 hues, 6 sizes, 6 regions (`page-404-390-light.json`).
- **Excluded as a false positive:** 84 of the city page's 84 light-mode "failures" (165 at 1440) are the faded `€€€` steps of the price-level meter (`rgba(32,33,37,.28)`, 1.8:1). That element is `role="img" aria-label="Cheap"` with `aria-hidden` children. It is a graphic scale whose meaning comes from the dark step and the label, so it is not a text failure.

## F-VISUAL-CRAFT-01 [P1] Deal "Show details" links and alcohol-strength labels are too faint to read
- User experiences: on every venue, the only link to a deal's terms is 12px bright blue on pale blue. On drinks, the alcohol strength "(1% vol)" is pale beige on white. Both fade out at arm's length or in sunlight.
- Where: Venue → "Deals & benefits" card → "Show details". Venue B menu → drink rows → "(1% vol)", next to the "18+" badge.
- Evidence:
  - "Show details": `12px/600 #009DE0` on `#EBF7FC` measures **2.81:1** at 390 and **2.72:1** at 1440 on `#E8F3F8` (needs 4.5:1). It appears on every venue screen. Files: `venue-a-390-light.json`, `basket-390-light.json`, `probe2-390.txt`. Visual check: `crop-show-details-390-light.png`.
  - "(1% vol)": `12px #C3BEB9` on `#FFFFFF` measures **1.84:1**, 10 instances (`venue-b-390-light.json`). In dark it is `#3B415E` on `#0A0C17`, **1.95:1**. Visual check: `crop-vol-390-light.png`.
  - In dark, "Show details" passes. Only the light theme fails.
- Why it matters: WCAG 1.4.3 AA. The deal is the venue's main promotional hook, and its terms (minimum spend, which items count) sit behind a link people can't read. Alcohol strength is regulated product information, styled here as disabled text.
- Fix: "Show details": `#009DE0` → the teal link token already used elsewhere, `#145367` (7.8:1 on `#EBF7FC`). Or keep the blue but darken it to `#0072A3` (4.9:1). "(1% vol)": `#C3BEB9` → the secondary text grey `#6F6B68` (5.3:1). In dark: `#3B415E` → `#949AB9` (7.0:1).
- Effort: S
- Confidence: high (measured in both viewports and confirmed in element crops)

## F-VISUAL-CRAFT-02 [P1] wolt.com's landing hero, where every bad URL lands, puts white text on cyan at about 2:1
- User experiences: anyone landing on wolt.com, including anyone who follows a broken link, sees the headline, the "Delivered sustainably" pill, "Log in for saved addresses" and "Popular around you right now" as washed-out white on bright cyan.
- Where: `https://wolt.com/` (an unknown path such as `/en/this-page-does-not-exist-xyz` redirects here) → hero.
- Evidence: `page-404-390-light.png`, `page-404-1440-light.png` and their `.json` files. White on `#33CEEC` measures **1.87:1** at 14px. White on `#00C2E8` measures **2.13:1** at 16px. The headline "EVERYTHING. DELIVERED." is white on `#00C2E8` at 53px (390) / 72px (1440); I computed **2.13:1**, and large text needs 3:1. The extractor didn't count the headline, so this value is hand-computed with the same formula. The dark theme renders the same hero.
- Why it matters: WCAG 1.4.3 AA fails on the brand's front door. The product UI avoids the problem by putting navy text on sky blue (7.6:1). The landing page doesn't use that rule.
- Fix: apply the product's own pairing. Set hero text to `#08303E` on the cyan (6.6:1). Or keep white text and darken the field to `#0077A8` (5.0:1), which passes for every hero string. Pills: `rgba(255,255,255,.2)` fill with `#08303E` text.
- Effort: S
- Confidence: high for the pills and link (extractor), medium-high for the headline (hand-computed against a solid fill; verify in DevTools).

## F-VISUAL-CRAFT-03 [P2] The cookie sheet makes "Allow" a large filled button and "Use only necessary" plain grey text
- User experiences: the privacy-preserving choice looks like a footnote. "Allow" is the biggest, boldest and only fully coloured thing on the sheet.
- Where: first visit, any page → cookie sheet.
- Evidence: `cookie-390-light.png` and `cookie.mjs`. "Use only necessary" measures **144×24 px**, with no fill and no border, in `#6F6B68` 16px/500. "Manage" measures **326×46**, filled `#DCF7FF`, 16/500. "Allow" measures **326×46**, filled `#66CBF0` (the primary action colour), in `#08303E` **16/700**. The reject option also misses the 44px target height.
- Why it matters: the accent rule says the strongest colour marks the action that drives the user's outcome. Here it marks the consent the business wants, and the equal-weight option is visually demoted. This crosses into the ethics gate (black-ux owns the verdict). In visual terms, the contrast budget is spent on the business's choice.
- Fix: give "Use only necessary" and "Allow" the same component, `326×46`, both with the `#DCF7FF` secondary fill and 16/600 text. Remove the 700 weight from Allow. Move "Manage" to a text link below them.
- Effort: S
- Confidence: high

## F-VISUAL-CRAFT-04 [P2] A removed venue shows an empty grey hero and pushes its message to the bottom of the screen
- User experiences: a dead venue link shows a 300–360px grey gradient band where the venue photo would be. The explanation, "As one journey ends, another begins", starts at y≈775 of 844 on a phone and below the fold on desktop.
- Where: `/restaurant/<slug-that-no-longer-exists>` (`venue-404-390-light.png`, `venue-404-1440-light.png`).
- Evidence: in the screenshots the grey band runs from 0 to ~300px CSS (390) and 0 to 360px (1440). The 390 extract shows the whole screen holds only 3 text sizes and 3 bounded regions, so most of the first screen is empty chrome. At 390 a second illustration is cropped at the fold, a person's head cut off at y≈745 CSS (390).
- Why it matters: hundredth-screen test. The hero screens are carefully composed, but this state reuses the venue template shell with no image and leaves a placeholder that looks like a failed load.
- Fix: drop the venue hero shell on this route. Start the page with the illustration at 160px height and the message at 32/700 directly under the header. Put one primary CTA ("Browse restaurants in Limassol", sky fill) within the first 400px. Remove the second illustration.
- Effort: S
- Confidence: high

## F-VISUAL-CRAFT-05 [P2] On a closed venue, three floating layers stack at the bottom and the translation notice shows through as garbled text
- User experiences: at the bottom of Thymari's first screen, the offer pill sits on top of the "This menu is in Greek…" banner, and the "Schedule order" bar sits on top of both. A sliver of the banner's text peeks out between the two as cut-off letters.
- Where: Venue B (closed) at 390 → bottom of the first screen.
- Evidence: `venue-b-390-light.png`, y≈1460–1550 in the 2x screenshot, ≈730–775 CSS. The offer pill (`offer-assistant-message`) overlaps a partly hidden banner line, and the CTA starts 4px below the pill.
- Why it matters: this is the only screen where layering breaks the otherwise clean surface. It reads as a bug and hides a real feature (menu translation).
- Fix: run one bottom stack with an 8px gap: translation banner, then offer pill, then CTA. The pill and banner should never overlap. Or show only one of the pill and the banner at a time: the banner on arrival, the pill after the first add.
- Effort: M
- Confidence: medium (one closed venue at 390; would rise with an open venue that also shows the translation banner)

## F-VISUAL-CRAFT-06 [P3] The desktop basket leaves about 165px of empty space between your item and the recommendations
- User experiences: with one item in the basket, the side sheet shows the item, then a large blank gap, then "Recommended for you". It looks like something failed to load.
- Where: 1440 → basket sheet (`basket-1440-light.png`).
- Evidence: the item block ends at ≈212px CSS (the "Popular" badge bottom, measured from the screenshot), and the "Recommended for you" heading starts at **376px** (`probe2-1440.txt`). That is a ≈165px gap, against 16px between the elements inside the item group. The 390 sheet has no such gap (`basket-390-light.png`). The two viewports also order the sheet differently: the order comment is at the top on the phone and pinned at the bottom on desktop.
- Why it matters: relationship ratio. Between-group space should be about 2× within-group, so 32px here, not ~10×.
- Fix: remove the item list's min-height. Use 32px between the last item and the "Recommended" heading.
- Effort: S
- Confidence: medium (the item-block bottom is read from the screenshot, ±5px)

## F-VISUAL-CRAFT-07 [P3] The phone city page opens with a ~72px blank band above the category tiles
- User experiences: on the busiest screen, the first thing under the header is empty space.
- Where: City page at 390, between the address row and the tiles.
- Evidence: `gap.mjs`. The content container starts at 107px with 16px top padding, and the tiles start at **179px**. The band holds a 40px-high carousel-arrow button row that is laid out but shows nothing on touch. At 1440 the same row holds the visible ← → arrows (`city-1440-light.png`). Screenshot: `city-390-light.png`, y 210–355 in the 2x image.
- Why it matters: 72 of 844px above the fold are spent on controls that a touch user never sees.
- Fix: below 768px, set the arrow row to `display:none`, not invisible. The tiles then start at 123px.
- Effort: S
- Confidence: high

## F-VISUAL-CRAFT-08 [P3] Prices use proportional digits, and each screen uses 4 weights and 5 sizes
- User experiences: in the option list, right-aligned prices like "+€4.00" and "+€1.00" don't line up on their digits. The UI hierarchy uses four weights where two or three would do.
- Where: Item modal option rows, venue and city price text. All screens for weights.
- Evidence: `font-variant-numeric: normal` on every price element sampled (36 on the city page, 37 on venue A, the option prices in `probe2-390.txt`). The edges differ in `item-modal-390-light.png` (+€4.00 vs +€1.00). The extract records weights **400/500/600/700** on every screen and **5 sizes** on the city, venue, basket and after-add screens. The skill's per-screen budget is ≤ 4 sizes and ≤ 2 weights.
- Why it matters: polish only. Nothing is misread, but columns of prices are where tabular figures pay off.
- Fix: `font-variant-numeric: tabular-nums` on the price tokens (`--comp-type-price*`). Fold 500 into 400 for metadata and keep 600 for titles and 700 for display only.
- Effort: S
- Confidence: high

## F-VISUAL-CRAFT-09 [P3] "Popular" badges use the same fill as the checkout button
- User experiences: in the basket, three "Popular" pills and the "Go to checkout" bar share the same sky fill, so the CTA is not the only sky-coloured thing on screen.
- Where: basket sheet, item modal, venue cards.
- Evidence: `basket-390-light.png`: three badges filled `#66CBF0` (rgb 102,203,240) plus the CTA. The city page probe counts 20 elements with that fill. The CTA still wins on size (358×54) and position.
- Why it matters: accent dose. The strongest colour is meant for the action, and badges dilute it.
- Fix: badges → `#DCF7FF` fill with `#145367` text (the existing secondary tint). Keep `#66CBF0` for CTAs and the selected state.
- Effort: S
- Confidence: high

## Also noted (not findings)
- "Continue with Facebook" is white on `#3975EA`, **4.14:1** (sign-in sheet and wall). It follows the third party's brand button. A darker `#1A5FD9` would pass at 5.7:1.
- Search with no results (`search-empty-*.png`) holds the system visually (same explorer illustration, DD Scoop heading, 3 sizes). But it is a heading and a picture with no next step, so I'm handing it to the usability and content roles.
- An unknown URL silently redirects to the landing page, so a 404 screen doesn't exist. Handing this to usability.
- The bundle declares `@font-face` for sibling DoorDash-family faces (DD Norms, TT Norms, SQ Market, Caviar-Market, Source Serif) and `--cb-*` / `--al-*` tokens, but only DD Scoop loads (`fontsLoaded`). No user cost.

## Craft tests
- **Squint:** pass. On every screen the sky CTA bar with its price is the single strongest blob (item modal, basket, venue B). On the city page, the category tiles and the advertiser banner compete.
- **Swap:** pass. Without the wordmark, it is still recognisably Wolt from the sky-on-navy CTA, the DD Scoop headings, the pastel 3D category tiles and the curved bottom edge of the venue hero.
- **Signature:** pass, more than 5 elements: the script wordmark; DD Scoop rounded headings; navy-on-sky CTAs with the price inside; pastel 3D category objects; the arched venue hero edge with a centred logo tile; the smiley-face rating; the explorer illustration family on empty and error states.
- **Token:** pass. Tiered, product-named tokens (base, usage, component).
- **Coherence:** pass. One 3D object style for categories, one flat illustration family for states, one outline icon set (16/32px).
- **Frankenstein:** pass in the product. The landing hero (white on cyan, all-caps display) is the one surface with a different colour rule (F-02).
- **Unthemed defaults:** pass. Checkboxes, inputs, focus rings and the search field are all themed.
- **Hundredth screen:** half. Sign-in and search-empty hold. The removed-venue page and the 404 redirect don't (F-04).
- **5-axis quick scan:** copy **pass** · visuals **pass** · colour **half** (F-01, F-02, F-09) · type **pass** (a clean scale; the weight count is P3) · spacing **half** (F-05, F-06, F-07). No axis fails.

## Direction score: 12 / 15
- **Governing idea:** "A calm white canvas where the food and the pastel 3D objects carry the colour, one soft sky-blue marks every action with navy text, and a rounded brand face plus a script wordmark supply the friendliness." It is applied on the city page, venue, modal, basket, sign-in and dark mode.
- **Point of View 4/5:** a clear, owned idea (sky on navy, DD Scoop, 3D tiles, arched venue hero). It falls short of 5 because the discovery page hands much of its fold to advertiser banners (McDonald's yellow/red), so the calm canvas is not fully Wolt's own on its most-viewed screen.
- **Consistency 4/5:** the type scale (12–48) and radius roles hold across 11 screens, 2 viewports and 2 themes, and dark mode is a real second theme. Loses a point to the landing hero's separate colour rule and the removed-venue template.
- **Execution 4/5 (VisAWI):**
  - Simplicity: the core flow is high; the city fold is busy (60 regions, 6 hues).
  - Diversity: good, with photography, 3D objects and flat illustration each kept to its own role.
  - Colourfulness: restrained UI, with colour coming from content.
  - Craftsmanship: high (tokens, shadows, tight heading line-heights), minus faint secondary text and layer collisions (F-01, F-05).

## Personality coherence (brief: calm, fast, trustworthy, a little playful)
- **Calm.** Shows: white canvas, one accent, navy text, no gradients in the product UI. Breaks: the city fold has 6 hues, a rotating advertiser banner and 60 bounded regions, and the venue B bottom stack piles three layers on top of each other.
- **Fast.** Shows: the price is inside every CTA ("Add to order €10.50", "Go to checkout €10.50"), there is a sticky bottom bar, and the steppers sit on the cards. Breaks: the 72px of dead space at the top of the phone city page.
- **Trustworthy.** Shows: consistent tokens, real dark mode, readable primary text (navy at ≥ 7:1). Breaks: deal terms and alcohol strength in faint text (F-01), and the consent sheet's visual weighting (F-03).
- **A little playful.** Shows: script wordmark, smiley rating, explorer illustrations, 3D tiles. It reaches the core surface (venue rating, tiles), not only the empty states. Nothing to remove. The playful notes are already restrained.
- **Price tier:** mass-market delivery; the feel matches (friendly, not luxury).

**Brutal questions.**
- Would it pass as a top-10 app in its category on looks alone? **Yes.** Next to Foody's first screen (Roboto only, an orange arc and broccoli, a black cookie sheet), Wolt is clearly the more crafted product.
- Swap the logo and could you tell whose it is? **Yes**, from the sky-on-navy CTA, DD Scoop and the 3D category tiles.
- The gaps are faint secondary text (light theme), one off-system landing hero, and edge screens that weren't designed (removed venue, 404).

## Strengths
- One owned action colour with a correct pairing: `#66CBF0` fill with `#08303E` text, 7.6:1, used for every primary CTA, each carrying the price.
- A real, tiered token system and a real dark theme, with navy-tinted elevated surfaces and lightened accents. In dark, no failures beyond the alcohol label and the Facebook button.
- A disciplined type scale (12/14/16/20/24/32/48) with correctly tight heading line-heights, and no text under 12px anywhere.

## Interaction log
| # | Action | What happened | Time |
|---|---|---|---|
| 1 | `capture.mjs 390 844 1 light`: fresh guest, city | Cookie sheet shown; "Use only necessary" via helper; city captured + extract | ~3.5s load + 0.6s |
| 2 | → `/en/cyp/limassol/restaurants` | Redirected to the city page (`log-390-light.txt`) | 3.5s |
| 3 | → Delulu venue | Sign-in sheet on arrival (captured), closed with X | 3.5s + 0.8s |
| 4 | Tap first item card | Item modal opened (390), URL unchanged at 390 | 2.0s |
| 5 | "Add to order" → "View order" → basket | Basket `?cart=open`; "Go to checkout €10.50" | 2.0s + 2.5s |
| 6 | "Go to checkout" | Sign-in wall "Create an account or log in". **Stopped.** | 2.5s |
| 7 | → Thymari Old Port | Closed venue, "Schedule order" CTA, bottom-stack overlap | 3.5s |
| 8 | → `/search?q=zzqxvbnm` | "No results found" + illustration only | 3.5s |
| 9 | → removed-venue slug | Grey hero shell + "As one journey ends…" | 3.5s |
| 10 | → `/en/this-page-does-not-exist-xyz` | Redirected to the wolt.com landing page | 3.5s |
| 11 | Same run at 1440 light and 390 dark | Light 1440: item click changed the URL, but the modal and basket didn't render within 2s (first pass) | — |
| 12 | `capture2.mjs` at 1440: waited for `product-modal.submit` / `CartViewNextStepButton` | Modal (centred, with the address popover still open behind it), basket side sheet, sign-in wall captured | modal ≤ 10s wait |
| 13 | → `/stores/category/restaurants` (the tile's href) | Redirected to `/en/discovery` at both widths | 4s |
| 14 | `probe2.mjs`, `crops.mjs`, `cookie.mjs`, `gap.mjs`: measurement only | Values cited above; cookie sheet measured without clicking | — |
| 15 | `foody.mjs`: Foody first screen at 390/1440, viewed only, no clicks | 1 hue / 4 sizes / 11–14 regions; Roboto only | 4s |
