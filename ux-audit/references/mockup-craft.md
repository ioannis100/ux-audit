# Mock-up craft: making a redesign look and feel premium, in the product's own identity

Loaded by `agents/mockup-maker.md`. The bar is Wolt, Uber Eats, Revolut, Duolingo and Apple
for **execution**: a stranger should not be able to tell the mock-up from a shipped screen
of a top-10 app. The owner, though, must recognise it at a glance as **their** app.
Sources, cited per rule: **[FD]** `anthropic-skills:frontend-design` · **[AD]**
`anthropic-skills:apple-design` (`references/hig/*.md`) · **[IMP]** impeccable 4.5
(github.com/pbakaus/impeccable, `.agent/skills/impeccable/reference/*.md`, read as text).

**Craft is execution within the identity, not a new aesthetic.** The brief is
`evidence/mockup-maker/identity.json` (mockup-maker step 0): the product's logo, fonts,
palette, surfaces, radii, icon style and navigation. "The brief wins: pinned tenant fonts
and colours override taste" [IMP SKILL] is a hard rule here, and the render check enforces
it (`foreignFonts`, `foreignColors`, `logoMissing`). What craft adds is spacing, hierarchy,
states, motion and imagery quality.

**A mock-up is an *Operate* surface.** The diner came to do a job, so the platform's
standard shell and the product's own controls stay [IMP mode-operate]. Find the **one
signature move** inside the product's existing components (its selected-card style, its
progress bars, its photo hero), not in a new look. Change identity only where a finding
requires it, as close to the original as possible, and log it in the Identity changes table.

Advice marked **(bold variant only)** below applies only to a `<screen>-bold.html` that
the owner explicitly asked for in Phase 0. It never applies to the default mock-up.

## 1. Type
- **The product's fonts, nothing else.** Use the families in `identity.json`, at the
  weights the product uses. Pinned tenant fonts win over taste [IMP SKILL]. Build
  hierarchy with size, weight, tracking and space, not with a new face. A face that leaked
  onto one route through a bug (a finding) is not identity: go back to the product's font.
- **Display face (bold variant only).** Two families at most; a display face carries the
  restaurant's voice in a few places, and isn't the platform default [AD typography
  "minimize typefaces"; IMP typeset, craft-floor; FD]. Even then, prefer a face the product
  already ships over a new one. Self-host or use Google Fonts, with metric-close fallbacks.
- **Role scale, not loose sizes.** About 6 roles for a phone: display 28–34 /
  title 20–22 / headline 17 / body 15–16 / footnote 13 / caption 11–12. 11 px is the
  floor; body is 17 pt on iOS [AD typography; IMP ios]. Each step must differ visibly
  in size *or* weight; neighbouring roles that look alike are a defect [IMP typeset].
- **Weights:** Regular / Medium / Semibold / Bold. No Thin or Light in UI [AD typography].
- **Tracking:** tighten display type (−0.01 to −0.03 em, never below −0.04 em) and open
  small caps labels (+0.04 to +0.08 em) [IMP craft-floor; AD typography "adjust tracking
  in mockups"].
- **Money and times** use `font-variant-numeric: tabular-nums` in ink, never in the brand
  colour [IMP typeset; ux-audit F-VIS-01 pattern]. Use one `Intl.NumberFormat` for the
  whole file.
- **Light text on dark** gets a little more line-height and tracking and one step more
  weight [IMP typeset]. Use `text-wrap: balance` on headings.

## 2. Spacing and layout
- **A 4 px base scale:** 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 [IMP layout]. Use 16 px
  side margins on phones. Every value comes from the scale.
- **Rhythm through contrast:** tight inside a group (4–8), generous between groups
  (24–32), and more space above a heading than below it [IMP craft-floor, layout].
  Group by proximity before adding a container [IMP layout; AD layout "group related
  items"].
- **Squint test:** blurred, you can still see the primary action, the secondary block and
  the groups, in that order [IMP layout]. The most important item comes first in
  reading order [AD layout].
- **Cards are earned.** No grid of identical icon + title + text tiles as the page
  structure, and never cards inside cards [IMP craft-floor]. Use photo-led rows, full-bleed
  heroes and lists with hairline separators instead (Wolt and Apple Music shelves).
- **Safe areas:** leave the status bar zone and a 34 px home-indicator zone free. Sticky
  bars sit above it [AD layout; IMP ios]. Targets are ≥ 44×44 even when the visible mark
  is smaller [AD accessibility; IMP layout].

## 3. Colour and depth
- **Build roles, not swatches:** canvas, raised surface, ink, secondary ink, action,
  selection, separator, success / warning / error [IMP colorize]. Define them as tokens
  on `:root`.
- **Roles come from the identity.** Map each role to the product's own colour in
  `identity.json`; the product's canvas stays its canvas (white stays white). Tints and
  shades of the **same hue** are fine where a finding needs them (contrast, a selected
  state the product already draws that way). No new hues, no new canvas tint.
- **One owner per colour.** The strongest brand colour owns one region or role (the
  primary action, the progress, the selected state) and isn't sprinkled around [IMP
  colorize; AD color "one tint drives interactive elements"]. Polish a grey screen with
  one accent through spacing, photos and states, not by adding colours [IMP mode-operate].
- **Tinted neutrals (bold variant only).** A warm canvas (e.g. `#f6f3ee`) for a food
  product, and secondary text derived from the surface hue [IMP craft-floor, colorize].
  In the default mock-up, use the product's own neutrals exactly.
- **Depth means a real shadow:** an offset plus a soft blur, layered (a 1 px contact shadow
  + a wide ambient one). Never a zero-offset coloured glow or a hard `4px 4px 0` block
  [IMP craft-floor]. Use materials (blur) only behind bars and sheets, where they
  separate layers [AD materials; IMP ios].
- **Contrast:** text ≥ 4.5:1, large text ≥ 3:1, icons and focus rings ≥ 3:1 in every state,
  including text on photos (add a scrim gradient) [AD accessibility; IMP colorize].
- **Dark mode is composed, not inverted**; the notes page supports both [AD dark-mode].
  The phones stay in the theme the product uses on that surface: never switch a light
  product's screens to dark (or back) for drama.

## 4. Imagery
- **Food first, big.** The dish photo is the appetite trigger. A hero is 16:9 or taller and
  rows are 88–96 px, `object-fit: cover`, with a radius that matches the container
  [ux-audit F-VIS-04; AD layout "extend content to fill the screen"].
- **One art direction:** the same angle, surface and light across a rail. Put the strongest
  photo in the hero and drop off-category images from a themed rail [IMP polish
  "coherence"; ux-audit F-VIS-05].
- **Set a focal point** (`object-position`) on portrait sources cropped to landscape, and add
  a scrim under any text [AD images; IMP colorize].
- **Request sized variants** (e.g. Supabase `/render/image/…?width=`) at 2× the box, and
  set `width`/`height` so nothing shifts. Show a dish-tinted background while loading,
  never a flat grey box [IMP polish; AD images].
- **Real photos only.** No stock and no AI fill. A dashed placeholder marks what's missing
  (agent rule 1).

## 5. Iconography
- **The product's family, drawn:** inline SVG in the product's icon style (e.g. lucide:
  outline, 2 px, round caps), one stroke width, matching the weight of the text next to
  it [AD icons; IMP craft-floor].
- **Never use Unicode glyphs or emoji as icons** (●●●, ⚡, ✓, →) [IMP craft-floor]. The
  status bar is SVG too.
- Optically centre asymmetric icons (play, arrow). Every icon-only button has a name
  [AD icons].

## 6. Motion polish
- **One authored moment per screen**, taken from the product (add-to-cart fly, stage
  advance, the pickup code). Feedback, state and continuity carry the rest. Don't fade
  every section in the same way [IMP animate, craft-floor; FD "one orchestrated moment"].
- **Timing:** 100–150 ms feedback, 150–300 ms state change, 300–500 ms sheet or view,
  500–800 ms only for the authored moment. Exit faster than entry [IMP animate].
  Use the motion tokens in `benchmark-apps.md` §2.
- **Easing:** decelerate on arrival, `cubic-bezier(.2,0,0,1)` or `(.16,1,.3,1)`. Use
  overshoot only for rewards (stamp, bump). Never linear for movement; no reflex bounce
  [IMP animate; benchmark-apps §2].
- **Every press answers:** `scale(.96–.97)` within 80–100 ms on `:active` / `pointerdown`,
  and a spring back [benchmark-apps §3.3]. Frequent actions stay quiet [AD motion "avoid
  motion on frequent interactions"].
- **Animate transform, opacity, clip-path, filter and shadow**, not width, height or top.
  Interruptible and never blocking: people can act mid-animation [IMP animate; AD motion
  "let people cancel motion"].
- **Reward beats** follow the tier ladder and specs in `reward.md` §3–4: routine actions
  tier 0–1, earned steps tier 2, completion tier 3, money calm.
- **Reduced motion** means fewer, gentler movements, not none. Swap spatial movement for a
  crossfade and keep state changes legible [IMP animate; AD motion "make motion optional"].

## 7. AI-slop tells (any one makes it a template)
- A new face, palette or canvas the product doesn't have: the mock-up has become someone
  else's app.
- Inter / Roboto / system as the *only* face **when the product uses something else** (if
  Inter is the product's font, it is identity, not slop); purple-to-blue gradients;
  gradient text [FD; IMP craft-floor].
- An eyebrow or kicker label above every heading; section numbers 01/02/03 [IMP
  craft-floor].
- Identical icon + title + text cards as the page structure; nested cards [IMP
  craft-floor].
- Glass or blur as decoration; zero-offset coloured glows; hard offset shadows [IMP
  craft-floor].
- A thick coloured `border-left` on callouts or cards [IMP craft-floor].
- Emoji or Unicode as icons; unthemed browser defaults (blue focus ring, grey scrollbar,
  default selection colour) [IMP craft-floor "browser surfaces"].
- Every element the same radius, the same shadow and the same spacing, so nothing leads
  [IMP layout].
- Generic copy ("Fresh flavours, delivered fast") instead of the product's own facts
  [IMP craft-floor "copy"; FD].
- Dashboard-style big numbers, progress rings or sparklines standing in for content [IMP
  craft-floor].

## 8. Pre-flight checklist (score each 0/1; ship at ≥ 11/13, items 1–4 mandatory)
1. **Parity:** every inventoried feature is present or listed as removed by report ID.
2. **Truth:** only real content; every placeholder is dashed and named in the notes.
3. **Render check:** 0 errors, 0 broken images, 0 contrast failures, 0 missing features,
   0 foreign fonts, 0 foreign colours, logo found.
4. **Identity kept:** same logo, fonts, palette and surfaces, component shapes and radii,
   icon style and navigation as `identity.json`; every change is in the Identity changes
   table with a report ID; next to the Before screenshot, the owner sees their own app.
5. **Squint:** the primary action, the secondary block and the groups read in order.
6. **Type:** the product's families only, about 6 roles that differ visibly, tabular money.
7. **Spacing:** every value is on the 4 px scale, with tight groups and generous breaks.
8. **Colour:** roles mapped to the identity; the brand colour owns one region; the
   product's own neutrals.
9. **Depth:** layered offset shadows; blur only behind bars and sheets.
10. **Imagery:** big, coherent, focal-pointed, sized; no flat grey placeholders.
11. **Icons:** the product's SVG family, one stroke; no glyph or emoji icons.
12. **Motion:** press feedback on every control, one authored moment, state transitions,
    reduced-motion path.
13. **No slop tells** from §7, and the swap test: with the logo covered, it's still
    recognisably *this* product.
