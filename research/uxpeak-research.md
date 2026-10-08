# What good UI/UX is, according to UX Peak (@uxpeak)

Research from 12 transcripts (≈26k words) of the channel's principle videos. UX Peak
is a small course-funnel channel (21 long-form videos, 1 short): roughly half are
Figma prototyping tutorials (3D carousels, scroll effects, smart animate), the other
half are "tips / junior-vs-senior / redesign / psychology" videos that sell the UI/UX
Playbook ebook, the Design Mastery course and (2026) UX Peak Plus. Every principle
video carries a ~90s sponsor read (own course + Mobbin). Numbers are their practitioner
defaults or uncited "studies"; A/B "results" (2% → 7%, 22% → 48%) are anecdotal and
unverifiable — treat all of it as [H] unless it coincides with a platform standard.

Skipped on purpose: 8 pure tool tutorials (Figma carousel, Dora, Midjourney, scroll
prototyping). Blocked by YouTube 429 after 4 attempts: the single most-viewed principle
video (GGg61sdEjeI). Three videos read contained no auditable rules (see §9).

Legend (video → short code used below):

| Code | ID | Title (views) |
|------|----|---------------|
| T1 | 8pMUkEbAM7g | Top 5 UX/UI tips, part 1 (274k) |
| T2 | gG4urkinFQI | Top 5 UX/UI tips, part 2 (94k) |
| T3 | Xzh8xjimmp8 | Top 5 advanced UX/UI tips, part 3 (136k) |
| JS | YlN28RNChl0 | Junior to Senior UX/UI designer (257k) |
| PSY | 2TlIg3VokY8 | UX psychology behind apps people can't stop using (570k) |
| AB | zr37ibqXl1U | Top 3 UX/UI redesigns (A/B: paywall, ride, booking) (118k) |
| EC | oYskl2ZBoBc | Ecommerce page redesign: 3.5× conversion (70k) |
| NAV | wLJ40GV2XEc | How to design a great bottom mobile navigation bar (221k) |
| WEB | SIoOS6tFw1Y | Design a modern website from scratch (211k) |

Coverage column: **yes** = already in the skill · **partial** = idea present, this
specific check missing · **no** = absent. File = `ux-audit/references/<file>`.

---

## 1. Their core stance

1. **Every element asks the user a question; the question decides whether they act or
   hesitate.** Screen A asks "is this worth $19/mo?", screen B asks "can I try it free?"
   (AB). Hard question → "later" → never.
2. **Senior = fewer decisions for the user, not prettier pixels.** Every junior→senior
   redesign removes a tap, a field, a choice or a doubt (JS, T2, T3).
3. **Specificity is trust.** "Start in two taps" beats "quick setup"; "4.9 · 221
   reviews" beats "5 stars · 200 reviews"; "delivery in 23 minutes" beats "fast" (AB, EC).
4. **Fine doesn't convert.** A screen with nothing wrong (clear title, visible price,
   working button) is still a form; the winning screen makes the user feel the outcome
   first (AB booking).
5. **Study shipped products, not Dribbble** — the Mobbin pitch, but the underlying rule
   (copy structure from proven flows, never from unshipped shots) matches Gabe.

## 2. Visual craft — concrete rules

| Rule | Src | Tag | Skill |
|------|-----|-----|-------|
| Differentiate information with weight, size, colour and icons; label/value pairs all in one style = no hierarchy | T1 | H | yes — visual-design.md (hierarchy via weight/colour) |
| **Value louder than label**: in metrics the number ("591") is the big/heavy element, the label ("Sales") small and muted. Labels bigger than values = wrong element emphasised | T1, JS | H | partial — visual-design.md has hierarchy, not this check |
| Rank elements by importance *before* designing; then assign size/colour/position/contrast in that order | T1 | H | yes — usability.md reduction filter |
| Shadows soft and low-contrast; harsh/dark offset shadows = unprofessional | T1 | H | yes — visual-design.md depth |
| **Tint the shadow to the background hue** (purple-tinted shadow on a lilac surface); pure gray/black shadows on coloured backgrounds clash | T1 | H | **no** |
| Line height as %, not px; headings 110–130%, paragraphs 140–170% (~150% optimal); bigger text → smaller ratio | WEB | H | yes — visual-design.md 1.0–1.3 / 1.4–1.6 |
| Type system: H1–H3 + 3 paragraph sizes + 3 UI-label weights (semibold/medium/regular) as named styles | WEB | H | yes — distinct-sizes / weights rows |
| Letter-spacing left at default ("not recommended for beginners") | WEB | H | **contradicts** Gabe (−1 to −2% on headings) and visual-design.md; skill keeps tracking rule |
| Headings white, paragraphs dark-gray on dark theme → hierarchy by colour | WEB | H | yes — 2–3 text colours |
| Text on photos: unify image style first; a dark overlay on mismatched stock photos fixes neither contrast nor coherence. Prefer isolated images on solid tinted cards | T3 | H | partial — landing-pages.md scrim rule; coherence test |
| One icon style per surface; same complexity across icons (no one detailed icon among minimal ones) | NAV | H | yes — one icon set |
| Avatars/logos identify people and companies; coloured-initial circles are the fallback, not the design | T2 | H | partial — usability.md edge-case "missing avatar" |
| Section rhythm (1920 desktop): title→paragraph 32px, heading block→cards 80px, card padding 40–70px, nav floats 24px from top | WEB | H | partial — landing-pages.md has 16–24 / 80–96 / ~32 |
| Grid at 1920: 4 columns, 200px margins, 30px gutters | WEB | H | **differs** from Gabe/landing-pages.md (12-col, 120–160 / 20–24 at 1440). Skill keeps 12-col |
| Radii: 16 buttons, 24 cards & nav, 25 pills, 32 large containers — four radii on one page | WEB | H | **contradicts** visual-design.md "1–2 radii". Skill rule holds |
| Blurred gradient "aurora" copied behind *every* section; background-blur 33–48 on every card for a "glassy" look | WEB | H | **contradicts** "one glow behind hero" and "glassmorphism with no purpose". landing-pages.md allows a low-opacity echo — keep that, not per-section glows |
| Dark theme justified by audience (16–26) and evening use; primary red reserved for CTAs, pink/blue as secondary accents | WEB | H | yes — 60-30-10, accent dose, dark-mode row |
| Disabled carousel arrow visibly dimmed so only the live direction looks clickable | WEB | H | yes — motion.md disabled state |
| Emoji as semantic state cues next to options (sleep quality), enlarged when selected | JS | H | partial-contradiction — visual-design.md lists "emoji as icons" as an AI-look tell. Allow as *meaning-bearing state*, not as icon set |

## 3. Mobile bottom navigation (NAV — the channel's one deep, auditable video)

| Rule | Tag | Skill |
|------|-----|-------|
| 3–5 tabs; 6 is the hard ceiling (smaller targets + choice paralysis beyond) | S (HIG/M3 say 3–5) | **no** |
| Contents = top-level, most-frequent destinations only: home/feed, search/discover, create, messages/notifications, profile. Never help, logout, legal, back/forward or a logo (those belong to top nav — Jakob) | H | **no** |
| Centre slot may hold the primary CTA (create / order / post) — prominent and reachable on large phones | H | **no** |
| Icon ~24px; label 10–12pt, single line, short; two-line labels = flag | S (M3 24dp / 12sp; HIG 10pt) | **no** — and visual-design.md "any text < 12px" would wrongly flag HIG 10pt tab labels |
| Hit area ≥ 44×44; 24×24 causes mistaps | S | yes — accessibility-performance.md |
| Sits above the 34pt home-indicator safe area; never overlaps or hides the indicator | S | **no** |
| Active state carries ≥ 2 visual changes (outline→fill + colour, or colour + bolder label). Changing only the label colour = too weak | H | **no** |
| One icon style across tabs; the filled variant is reserved for the selected tab | H | partial — one icon set |
| Nav surface neutral (white / light gray / dark); brand colour reserved for on-screen actions; no per-tab colours; top and bottom bars share one palette | H | partial — accent dose |
| Separate nav from content with one of: 1px border, background tint (white page → light-gray bar), or a small soft shadow above. No separation = the "pro mistake" | H | **no** |
| Inactive icons/labels: reduce opacity, keep hue; must still pass 3:1 | S (1.4.11) | yes — non-text contrast |
| Badges: top-right of icon, small, optional outline ring, legible digits, only for essential updates | H | partial — "badges everywhere" flag |
| Icons simple and conventional (magnifier, not binoculars) | H | yes — Jakob row |
| Know the audience: icon-only acceptable for young tech-savvy users; older/less-confident users need labels | H | partial |
| Motion: tap feedback (colour/scale/ripple), indicator slides between tabs, screen content fades/slides — never a hard snap | H | partial — motion.md pressed state; no tab-switch rule |
| Design for 2–3 device widths; test on a real device (Figma Mirror) | H | process — skip |

## 4. Inputs, selection and forms

| Rule | Src | Tag | Skill |
|------|-----|-----|-------|
| **Smart defaults**: pre-select the most common value in every field; 70–90% of users never change a default and read it as a recommendation. Blank booking form = decision fatigue (jam study 24 → 6 flavours: 3% → 30%) | PSY | H | yes — usability.md "defaults for the majority" |
| CTA states the result: "Search · 12 results" instead of "Search" | PSY | H | **no** |
| **Input method by frequency**: sliders / scroll wheels for one-time, bounded setup values (age, height, weight); text field / stepper / numeric input for frequent, precise entry (logging 350 g). Slider for repeated precise entry = flag | T3 | H | **no** |
| **Selection over typing**: when the answer set is predictable (job title, goal) show chips of the most common answers + "Other" with free text — removes typos and inconsistent data | JS | H | **no** |
| Options as selectable cards (label + icon/colour) instead of a bare radio list | T2 | H | partial — usability.md visible options |
| Radio/checkbox control sits **left** of its label, in reading order (F-pattern) | JS | H | **no** |
| Selected state ≥ 2 changes (colour + size/weight); live feedback text updates with the selection ("Your sleep was good — aim for 8h") | JS | H | partial — motion.md states |
| Single-value choice on mobile: swipeable/curved slider beats a 5-item list; compare to yesterday ("2h more than last night") | JS | H | partial — emotional.md deep delight |
| Personalise task headings with the user's name; conversational phrasing ("How long did you sleep last night?") | JS | H | partial |

## 5. Content exposure, search, states, personalisation

| Rule | Src | Tag | Skill |
|------|-----|-----|-------|
| **Expose content directly**: never put a list behind a promo banner that needs a tap ("Discover 100+ recipes →"); show the top 10 items on the surface (interaction cost) | T2 | H | **no** |
| Empty **search** screen is never blank: recent searches, popular items, personalised suggestions | T3 | H | partial — content-and-forms.md covers no-results only |
| Empty state = why it's empty + illustration + 2–3 actionable tips + one CTA ("Create new project") | T2 | H | yes — content-and-forms.md |
| **Lifecycle personalisation**: home adapts to new (goal setup + trending), returning (today's plan) and power users (stats first, then plan). One screen for everyone = missed opportunity | T3 | H | **no** |
| Order/status screens: headline states the state ("Your order is on the way"), delivery window + address with icons, courier as a human (photo, name, call/message), history as a visual step timeline not a date list | T3 | H | **no** |
| Category screens: consistent isolated imagery on solid tinted backgrounds; busy photo tiles slow scanning | T3 | H | partial — coherence test |
| Homepage freshness: a "trending this week" block keeps content changing | WEB | H | partial — engagement-retention.md session-2 hook |
| CTA carries a live count ("See all artists (1,250)") — sets expectation of abundance | WEB | H | **no** |

## 6. Conversion psychology (PSY, AB, EC)

| Rule | Src | Tag | Skill |
|------|-----|-----|-------|
| **Never start at 0%**: count account creation as step 1 so the first screen shows ~20% (car-wash stamps: 2 pre-filled → ~2× completion); LinkedIn profile strength is never zero | PSY | S (Nunes & Drèze) | yes — usability.md goal gradient |
| **Reciprocity**: give a real partial result (score, top issues) before asking to sign up; blurring the whole report behind "Create an account" = holding results hostage | PSY | H | partial — "defer sign-up" exists; the blurred-result flag does not |
| **Endowment before sign-up**: let the user choose/build (name, colours, card style, first lesson) before the account wall; button says "Continue", not "Sign up" | PSY | H | partial — investment section |
| **Loss framing**: show the actual files that will be lost + countdown; dismiss reads "I'll risk it" | PSY | H | **contradicts** emotional.md ethics gate (confirmshaming, fake urgency). Flag, don't adopt |
| **Contrast effect**: show an add-on next to the main price with a relative label ("$50 — just 2.6%"); never a cost in isolation | PSY | H | **no** — adopt only with true numbers |
| Paywall headline explains **how the trial works**, not the feature list; day-by-day timeline (today / day 5 reminder / day 7 charge) | AB | H | yes — engagement-retention.md trust screen |
| Button verb **"Start"**, never "Subscribe…" (commitment weight); possessive "my free trial"; a specific step count under it ("Start in two taps") | AB | H | partial — "trial start is one tap"; no copy rule |
| Paywall hero shows **real content** (actual game characters), not decorative art | AB | H | partial — landing-pages.md hero rule, not paywalls |
| One price, not a range (users anchor on the top number) | AB | H | yes — engagement-retention.md |
| Reframe cost as convenience: ETA next to price ("2 min away"); a one-word value badge ("Cheaper"); confirm the destination before showing options (commitment-consistency) | AB | H | **no** |
| Booking: photo fills the top half (not a thumbnail); badges (Superhost, Guest favourite, "1 of 24 photos"); sensory title ("steps from the sand") | AB | H | partial — assets > 50% on landing pages only |
| Dates with **day names + duration** ("Fri 28 Mar → Wed 2 Apr · 5 nights") — saves the mental math | AB | H | **no** |
| **Button shows the total** ("Reserve · €445 total"); **free-cancellation line directly under the CTA** answers the #1 objection | AB | H | partial — emotional.md total-before-payment; not on the button, no cancellation line |
| Strike-through anchor + "−31%" badge | AB | H | partial — ethics: must be a real prior price (EU Omnibus 30-day rule) |
| PDP: **status badge above the title** (Best-seller / New / Top-rated — halo effect) | EC | H | **no** |
| PDP hero shows the product **in use** (powder next to the mixed drink), not isolated on white (imagination gap) | EC | H | partial — landing-pages.md "product in context" |
| **Specific, non-round numbers**: "4.9 · 221 reviews", "500+ sold this week" with icon; round 100/200/500 read as fake | EC | H | **no** |
| Options as **visible swatches** (≤ ~5) with icons, not a dropdown; **tooltip at the hesitation point** on hover/tap ("Light, tart, not overly sweet") | EC | H | partial — visible options; no tooltip-at-hesitation rule |
| Plan choice as side-by-side cards; recommended card tinted + "Most popular" + reassurance inside (save 15%, cancel anytime, priority dispatch); one-time purchase click reveals bundle tiers (progressive disclosure) | EC | H | partial-contradiction — emotional.md flags preselection. Allow when the pre-selected plan is genuinely best value and the alternative is equally visible |
| **Trust badges answer the audience's real fears** (third-party tested, 60-day guarantee, 100% vegan), not generic expectations (free shipping, made in USA) | EC | H | partial — emotional.md trust signals |
| Soften button copy: "Add to cart → start my journey" | EC | H | **contradicts** content-and-forms.md "label = actual action". Keep the verb; put the motivational line as subtext |

## 7. Transactional / finance flows (JS)

| Rule | Tag | Skill |
|------|-----|-------|
| Recent recipients + search replace a "Choose from history" button; one CTA on the transfer screen | H | partial — recognition over recall |
| **Amount is the hero field**; currency selector tucked inside the field corner (secondary, assumes same currency most of the time) | H | **no** |
| Recipient shown with avatar/icon + name + account — recognition prevents wrong-recipient transfers | H | partial |
| **"New balance after this transfer"** displayed before confirming | H | **no** |
| Multiple accounts: show source *and* destination account, switchable before confirming | H | **no** |

## 8. Where UX Peak contradicts Tim Gabe or the references

- **Tracking**: UX Peak says leave letter-spacing alone; Gabe/skill tighten display type
  −1 to −2%. Keep the skill rule (it's a measured, reversible tune).
- **Grid**: 4 columns / 200px margins / 30px gutters at 1920 vs 12-col / 120–160 / 20–24
  at 1440. Not a real conflict (different viewport), but 4-col is too coarse for
  audits — keep 12-col.
- **Radii and glows**: their own build uses 4 radii and a blurred gradient behind every
  section plus glass cards everywhere — exactly what visual-design.md flags. Their
  *advice* (one shadow language, neutral nav, one icon style) is consistent with the
  skill; their *execution* in WEB is not. Cite the advice, not the file.
- **Ethics**: "show what they'll lose", "I'll risk it" dismiss, countdowns, "progress,
  even a fake one, creates real momentum", pre-selected subscription — all land in the
  skill's dark-pattern list (confirmshaming, fake urgency, preselection). As with Gabe,
  keep the hard gate: endowed progress must count *real* completed steps; strike-through
  prices must be real prior prices; dismiss buttons stay neutral.
- **Button copy**: "Start my journey" vs the skill's verb+object / actual-action rule.
  Skill wins; their good version is "Start my free trial" (verb + the real thing).
- **Emoji**: used as meaning-bearing state cues — acceptable; keep flagging emoji *as
  the icon set*.
- **Tab-bar labels at 10pt** are HIG-correct; visual-design.md's blanket "< 12px" flag
  needs the exception.
- Agreement with Gabe everywhere else: thumb zone, one CTA, trial timeline + reminder,
  single price over range, show real product output, specificity, recents, soft shadows,
  line-height ranges, dark-gray body on dark theme.

## 9. What the skill is missing

**visual-design.md**
- Depth and detail: "Shadow colour is tinted toward the surface behind it (background
  hue at low opacity). Pure gray/black shadows on a coloured background = flag [H]."
- Typography table, new row "Data hierarchy": "In metric/value pairs the value is the
  larger or heavier element and the label is smaller and muted. Label louder than its
  value = wrong element emphasised [H]."
- Body-size row, add exception: "Platform tab-bar labels (iOS 10pt, Material 12sp) are
  not a < 12px violation."
- AI-look tells: qualify "emoji as icons" → "emoji used as the icon set (emoji as a
  meaning-bearing state cue, e.g. mood scale, is fine)".

**usability.md** — new subsection "Mobile bottom navigation / tab bar" (NAV):
- "3–5 tabs; 6 = flag. Contents are top-level, high-frequency destinations only
  (home/feed, search, create, messages/notifications, profile). Help, logout, legal,
  back/forward or a logo in the tab bar = P2 (Jakob)."
- "Centre slot may be the primary action (create / order / post)."
- "Icon ~24px; label 10–12pt, one line. Hit area ≥ 44×44. Bar sits above the 34pt
  home-indicator safe area and never overlaps it."
- "Active tab shows ≥ 2 visual changes (outline→fill + colour, or colour + bolder
  label). Label-colour-only = flag. One icon style; the filled variant is reserved for
  the selected tab."
- "Nav surface is neutral (white / light gray / dark); brand colour stays on in-content
  actions; no per-tab colours; top and bottom bars share one palette."
- "Bar is separated from content by a 1px border, a background tint, or a small soft
  shadow. No separation = flag."
- "Inactive items dimmed by opacity, not a new hue; still ≥ 3:1."
- "Badges top-right, small, outlined, legible digits, essential notifications only."

**content-and-forms.md**
- Forms table, new row "Input method": "Sliders / scroll wheels for one-time, bounded
  setup values (age, height); text field / stepper / numeric keypad for frequent,
  precise entry (food grams, amounts). Slider for repeated precise entry = flag."
- "Selection over typing: when the answer set is predictable (job title, goal, reason),
  show chips of the most common answers + 'Other' with free text."
- "Smart defaults: every field pre-filled with the most common value (70–90% of users
  never change a default). A fully blank booking/search form = flag. The CTA may state
  the outcome: 'Show 12 results'."
- "Radio/checkbox control sits left of its label, in reading order."
- "Empty search is never blank: recents, popular, personalised suggestions."
- "Expose content directly: a list hidden behind a promotional banner that needs a tap
  ('Discover 100+ recipes →') = interaction-cost flag; surface the top items."
- "People and companies are identified by avatar or logo; coloured initials are the
  fallback only."
- "Status/tracking screens: a headline stating the state ('Your order is on the way'),
  key facts with icons, a human contact (photo, name, call/message), and a visual step
  timeline — not a list of dates."
- "Dates show day names and duration ('Fri 28 Mar → Wed 2 Apr · 5 nights')."
- "The commit button shows the total ('Reserve · €445 total'); the cancellation/refund
  line sits directly under it."
- Finance/transfer: "Amount is the hero field; currency selector tucked inside it.
  Recipient shown with avatar + name + account. 'New balance after' is visible before
  confirming. With multiple accounts, source and destination are both shown and
  switchable before confirm."
- Microcopy: add the positive form of the button rule — "Verb names the real action:
  'Start my free trial' ✓, 'Start my journey' (for add-to-cart) ✗."

**engagement-retention.md**
- Onboarding: "Lifecycle personalisation — home adapts to new (goal setup + trending),
  returning (today's plan) and power users (stats first). Identical home for all three =
  suggestion."
- Onboarding: "Reciprocity — a usable partial result (score, top issues) is shown before
  any sign-up ask; the full result blurred/locked behind 'Create an account' = P2."
- Onboarding: "Investment before the wall — let the user choose or build something
  (name, palette, first lesson) before the account step; that button says 'Continue',
  not 'Sign up'."
- Paywalls: "Headline explains how the trial works, not the feature list. Button verb is
  'Start' (never 'Subscribe'), possessive ('my free trial'), with a specific step count
  beneath ('Start in two taps'). Hero shows real content, not decorative art."
- Paywalls/pricing: "Reframe cost as convenience where true: ETA or time saved next to
  the price; one-word value badge ('Cheaper'). Add-ons shown relative to the main
  purchase ('2.6% of your order') — true numbers only."
- New block "Product pages (EC)": "Status badge above the title (Best-seller / New /
  Top-rated); product shown in use, not isolated on white; specific non-round proof
  ('4.9 · 221 reviews', '500+ sold this week'); options as visible swatches with a
  description at the hesitation point (hover/tap tooltip); plan cards side by side with
  the recommended one tinted + 'Most popular' + reassurance inside (save %, cancel
  anytime) — pre-selection allowed only when it is genuinely best value and the
  alternative is equally visible; trust badges answer the audience's specific fears
  (third-party tested, 60-day guarantee), not generic expectations (free shipping)."
- Landing/home: "A CTA may carry a live count ('See all artists (1,250)')."

**emotional.md** — ethics gate additions
- "Fake reference prices — strike-through anchors that were never the real price (EU
  Omnibus: show the lowest price of the prior 30 days)."
- "Loss-framed dismiss copy ('I'll risk it') = confirmshaming; countdowns must be real."
- "Endowed progress counts real completed steps only — never 'fake' progress."

**motion.md**
- "Tab switch: pressed feedback < 100ms, active indicator slides to the new tab,
  content cross-fades or slides (200–300ms). A hard snap = flag."

## 10. Blocked / not read

- **GGg61sdEjeI** — "This UI/UX Redesign Will Teach You More Than 100 Tutorials
  Combined" (434k, Aug 2026). HTTP 429 on the subtitle fetch, 4 attempts incl. a 2-min
  back-off and an alternate player client. The most-viewed principle video — retry.
- Read, no auditable rules: **Dn8vQGO4RoE** (7 award-site showcase), **03Xw8UyC6uo**
  (design-thinking process overview), **BZ0QER_0ZWI** (2023 trends: 3D models, custom
  cursors, scroll storytelling, neon glows, minimalism, huge type — only "one glow to
  guide the eye to the CTA" is a rule, already in visual-design.md).
- Skipped as tool tutorials: _kUq8p94NnU, 5cqpf1rdeFc, GFYc5ZT-vFI, J6DjxHXXZGw,
  xgk5N4rCJIw, cJmbncvBYJM, 6lSvKk7lTl0, rI4A7whqvgo, short 8IpIo3SQOI0.
