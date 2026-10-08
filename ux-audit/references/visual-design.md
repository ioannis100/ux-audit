# Visual design: typography, spacing, layout, color

Load for every audit. Prefer **measured** values from `scripts/extract-design.js`
over eyeballing screenshots. Every claim below should cite a measured number.

## Typography

| Check | Good | Flag |
|-------|------|------|
| Body size | Web ≥ 16px; iOS Body 17pt; Android Body Large 16sp | Body < 16px on web; any text < 12px (iOS min 11pt) — except platform tab-bar labels (iOS 10pt, M3 12sp) |
| Units | rem / sp / Dynamic Type | Fixed px/pt everywhere (breaks user scaling) |
| Line height, body | 1.4–1.6 | < 1.3 or > 1.8 on paragraphs |
| Line height, headings | 1.0–1.3 (tighter as size grows) | Headings at 1.5+ look loose and disconnected |
| Measure | 45–75 chars/line, ~66 ideal; `max-width: 60–75ch` | > 80 chars (full-width paragraphs on desktop) or < 35 |
| Distinct sizes | One modular scale (1.125–1.333 apps, up to 1.5–1.618 marketing) or a hand-tuned scale (12/14/16/18/20/24/30/36/48/60/72) | > 8–10 sizes, or sizes 1px apart (15/16/17) = no system |
| Families | 1–2 (+ mono if needed) | 3+ families; two near-identical sans-serifs |
| Weights | 2–3 (400 / 500–600 / 700) | < 400 for UI text; 5+ weights in use |
| Text colors | 2–3 (primary / secondary / tertiary) | Many near-identical grays |
| Letter-spacing | Caps & small labels +0.05–0.1em; display > 32px −0.01 to −0.02em; body 0 | Tracked-out body; tight all-caps |
| Numerals | `tabular-nums` in tables, prices, timers, counters; hero metrics in tabular/mono digits with decimals one size step smaller | Jittering numbers in live counters; big counters that reflow as digits grow |
| Per-screen budget [H] | ≤ 4 sizes and ≤ 2 weights on any single screen (Gabe) | 6 sizes or 4 weights on one screen = no system, even if the site-wide scale is fine |
| Alignment mixing | Heading and its body share one alignment | Centred heading over left-aligned body (or vice versa) in one block |
| Baseline | Mixed sizes on one line align on the baseline | Vertically centred mixed sizes (value + unit, price + period) |
| Data hierarchy [H] | In label/value pairs the value is larger or heavier, the label smaller and muted | Label louder than its value |
| Measure (px proxy) | Body ≤ ~600px wide at 16–18px, even inside wide containers | Body text stretched across a 960–1200px container |
| Tuning | Line-height, weight and tracking tuned together — the same font looks premium or broken on these alone; borrow a proven ramp from a well-designed site in the same font | Default tracking on 48px+ headings; stock line-height everywhere |
| Alignment | One strong left edge | Centered body text > 3 lines; justified text on web |
| Font loading | `font-display: swap`/`optional`; preload 1–2 critical WOFF2; fallback metric overrides | Invisible text on load (FOIT); > ~4 font files on first load; layout shift when font swaps |

Hierarchy comes from **weight and color first, size second** (Refactoring UI). If the
only hierarchy tool used is size, the page will feel shouty or flat.

**Typeface signals [H]** — check the personality fits the brand and audience:
geometric sans → modern/tech · humanist sans → friendly/approachable ·
transitional/old-style serif → editorial/trust/heritage · slab → sturdy/bold ·
rounded → playful/casual · mono → technical.
Defaulting to the framework's stock font (Inter/Roboto/system everywhere) is not a
defect, but it's a missed personality opportunity worth one suggestion for
consumer products.

## Spacing and layout

| Check | Good | Flag |
|-------|------|------|
| Grid | 8pt base, 4pt half-steps; scale non-linear with adjacent steps ≥ ~25% apart: 4/8/12/16/24/32/48/64/96/128/192 | > ~12 unique spacing values, off-scale odd values (13, 22, 37px), or steps 2px apart (14/16/18 as spacing) = no scale |
| Proximity | Space within a group < space between groups; label closer to its own field than the previous one | Equal spacing everywhere ("floaty"), or labels equidistant between fields |
| Relationship ratio [H] | Between-group gap ≈ 2× within-group: 16→32, 24→48; heading 1× from its own body, 2× from the block above; CTA ~2× below its text | Heading equidistant between the previous paragraph and its own; CTA glued to the text |
| Hierarchy | Squint/blur test: one most important element is obvious, primary CTA identifiable | Nothing stands out, or everything does |
| Whitespace | Generous for consumer; dense is fine for expert tools if consistent | Cramped cards, text touching edges, < 16px page gutter on mobile |
| Consistency | 1–2 border radii, 3–5 **fixed** elevation levels (each a soft ambient + a tight direct shadow; hover raises, press lowers), one button height per size, one icon set (stroke sets stay consistent most easily), ≤ 2–3 tints per hue, a fixed set of opacity values | Radii 4/6/8/10/12 mixed; ad-hoc shadow blur/offset values; mixed outline + filled icon sets; ad-hoc tints and opacities (drift) |
| Separators | Borders are the last resort: prefer shadow, background change or spacing | Border + shadow on one element; a divider on every list row |
| Scaled assets | Icons drawn at 16–24px never scaled past ~1.5× (wrap in a shape instead); screenshots cropped, not shrunk below legibility; user images in fixed-ratio `object-fit: cover` containers with a subtle inset border | Blurry upscaled icons; illegible downscaled screenshots; background bleed around user images |
| Visual complexity (fold) | Above the fold: few distinct hues, ≤ 3–4 text sizes, few bounded regions; layout follows category convention (logo top-left, nav top, search/cart top-right, one hero + one CTA). Low complexity + conventional layout wins at 50ms (Tuch 2012); complexity + colourfulness explain ~half of appeal (Reinecke 2013). Measure: `extract-design.js` → `fold` | Most complex *and* least conventional of the compared screens = P2 |
| Corners [H] | Continuous corners (squircle) on large radii read as premium | Plain arcs on big cards/app icons in a premium product |
| Tables | Numbers right-aligned, text left-aligned | Centered numeric columns |
| Scanning | Front-loaded headings; F/Z pattern respected; users read ~20–28% of words | Key info buried mid-paragraph |
| Responsive | Content-driven breakpoints; no horizontal scroll at 320px (WCAG 1.4.10) | Sideways scroll on phone; desktop layout squeezed |

## Color

| Check | Good | Flag |
|-------|------|------|
| Text contrast (WCAG 2.2) | ≥ 4.5:1 normal; ≥ 3:1 large (≥ 24px or ≥ 18.66px bold) | Below — the #1 failure on the web (83.9% of top home pages, WebAIM 2026) |
| Non-text contrast (1.4.11) | ≥ 3:1 for input borders, icons, focus rings, chart marks | Light-gray input borders on white; placeholder used as a label |
| APCA (advisory only) | Lc 75 body 16px, Lc 90 small body, Lc 60 large/non-body, Lc 45 large headlines | Report alongside WCAG, never instead of it |
| Palette role [H] | ~60% neutral / 30% secondary / 10% accent; accent reserved for actions and state | Accent used decoratively so CTAs don't stand out |
| Accent dose [H] | Strongest colour only on the primary CTA and a few meaning-bearing marks (current state, one emphasised word); destructive actions default to secondary styling — red belongs on the confirm step or when deletion is the screen's primary action | Accent dominates (stressful, "everything screams") OR barely appears (dull, no focal point); primary button in red reads as an error |
| Contrast budget | Highest contrast reserved for the action that drives the core outcome; secondary actions and low-priority content deliberately lowered. Per element: does this help users see what they need, when they need it? | Everything equally loud |
| Hue count [H] | One brand hue + its tints/shades; flat fills when unsure | 3+ unrelated hues; gradients where a flat fill reads clearer |
| Tinted surfaces [H] | Secondary buttons / highlighted cards = primary at ~5% fill or ~5% border | Secondary actions in a second unrelated colour |
| Text via opacity [H] | Neutral text at ~100 / 80% (large) / 60–70% (small), each re-checked ≥ 4.5:1; final values as real hex | Opacity-dimmed or hover-faded text failing contrast |
| Text on colour | Secondary text on a coloured surface is a tint of that hue (lower contrast via lightness/saturation), re-checked ≥ 4.5:1 | Grey or white-at-opacity on colour (reads washed out) |
| Palette depth [H] | Defined up front: 8–10 greys, 5–10 shades per hue (base ≈ 500, 900 for text on tints, 100 for tinted surfaces) | Shades invented inline = drift |
| Charts | Neutral marks + one accent for the current/important value; simple beats fancy | Rainbow series where one value matters; decorative 3D/gradient charts |
| Semantic colors | Consistent error/warning/success/info; tokens (`--color-danger`) | Brand accent == error red; dozens of raw hex values |
| Color alone (1.4.1) | Errors, links, status, chart series have a second cue (icon, text, underline, pattern) | Red border only on error; links distinguished by color only in body text |
| Dark mode | ~#121212 surfaces; text at ~87/60/38% emphasis; desaturated brand colors; elevation via lighter surfaces | Pure #000 + pure #FFF (halation); saturated colors vibrating; images/logos without dark variants; only one theme passes contrast |

Color also carries emotion. Check that palette temperature and saturation match the
intended personality (calm finance app with neon alerts everywhere is a mismatch).

## Craft tests (borrowed from interface-design and impeccable)

- **Swap test** — if you swapped the logo, would this look like any template? Then
  it has no identity. Recommend the 1–2 places identity should show.
- **Squint test** — blur the screenshot: hierarchy and primary CTA still obvious?
- **Signature test** — name 5 specific elements that are unique to this product.
  Can't? Personality is missing.
- **Token test** — do the design token names belong to this product, or are they
  framework defaults (`blue-500`, `gray-200` everywhere)?
- **Unthemed defaults** — browser-default selection color, scrollbars, focus ring,
  date pickers and autofill yellow left untouched on an otherwise styled product.

- **Coherence test** — one illustration/photo style, one icon set, CTA colour traceable
  to the brand or the assets, imagery echoed across sections.
- **Frankenstein test** — components from several design languages (card styles, radii,
  type rhythm that don't match) = too many references, no single direction. Recommend
  cutting influences, not adding.
- **Hundredth-screen test** — compare one deep, rarely visited screen (settings, an
  error, an empty state) with the hero screens. The system must hold on screen 100.
- **Gabe 5-axis quick scan** — copy, visuals, colour, type, spacing: pass / half / fail
  each. Any fail = a P2 craft finding.
- **Direction rubric** — score Execution against the VisAWI facets: simplicity,
  diversity, colourfulness, craftsmanship (Moshagen & Thielsch 2010), one line each.

## Depth and detail (the last 20%) [H]

- One shadow language: primary button = 1px white top inner shadow + soft low-opacity
  drop shadow; secondary = ~5% primary border + the same shadow; cards reuse it.
- At most one low-opacity blurred glow behind the hero visual.
- Shadow colour is tinted toward the surface behind it (background hue at low
  opacity); pure grey/black shadows on a coloured background = flag.
- Motif reuse: one recurring cue (same dot, shape, colour) links related regions that
  describe the same thing (e.g. the pulsing "current" dot in a chart and on its control).
- Imagery shares one style and the palette. Mixed 3D + flat + stock = finding.
- When unsure, subtract: simple-and-clear beats fancy-and-unclear. Lead personality
  fixes with what to remove before what to add.

Generic "AI-generated look" tells (flag as P3 personality findings, not defects):
purple-to-blue gradients on white, gradient text in generic colours unrelated to the
brand or product imagery, interchangeable icon-in-circle feature cards in a 3-up grid
(grids themselves are fine), over-worked surfaces (stacked skeuomorphic shadows, blur +
gradient + glow on one element), uppercase eyebrow labels on every section, 01/02/03
numbering on things that aren't steps, thick colored left-border callouts, the
big-number "hero metric" block, emoji used as the icon set (emoji as a meaning-bearing
cue, e.g. a mood scale, is fine), glassmorphism with no purpose.
