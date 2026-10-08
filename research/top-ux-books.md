# Top-rated UX/UI books — what they add to the audit skill

Researched 2026-10-07. All ratings were read from the book's Goodreads edition page or the
named Amazon regional page via web search on that date; Amazon.com blocks direct fetch, so
where .com was not surfaced the regional store is named. Goodreads counts merge editions.

## Method

Score = Goodreads rating and volume + Amazon rating/volume + appearances in six retrievable
"best UX books" lists: Untitled UI (19 books, 2026), Eleken (37, 2025), UXtweak practitioner
survey (327 UX pros, 40+ countries, net-recommendation score), NN/g "Recommended UI books"
(2007, academic skew), UX Playbook (10, 2026), Grauberg (10, 2025). Smashing and IxDF publish
no single ranked list (Smashing names Krug and Norman in passing; counted as 0).
Books whose content is not UI/UX-auditable (process or general psychology) are ranked but
not selected — noted per row.

## Candidates

| Book | Goodreads | Amazon | Lists (of 6) | Note |
|---|---|---|---|---|
| The Design of Everyday Things (Norman) | 4.15 · 49,407 | 4.6 · 8,269 (.com, Revised ed.) | 5 | Foundational; UXtweak #7 |
| Hooked (Eyal) | 4.12 · 49,777 | 4.5 · 9,008 (.ca); 4.4 · 9,037 (.co.uk) | 2 | Engagement + ethics |
| Don't Make Me Think, Revisited (Krug) | 4.24 · 30,838 | 4.6 · 4,535 (.com) | 5 | Highest-rated mass-market UX book; UXtweak #4 |
| Sprint (Knapp) | 4.18 · 23,873 | 4.6 · 2,968 (.com) | 3 | Process, not auditable — excluded |
| Thinking, Fast and Slow (Kahneman) | 4.16 · 619,324 | n/r (Audible 4.44 · 20,059) | 0 | Not a UI/UX book; its UX-relevant laws arrive via Laws of UX — excluded |
| The Elements of Typographic Style (Bringhurst) | 4.26 · 9,103 | 4.6 · 189 | 0 | Print typography; web rules already in visual-design.md |
| Lean UX (Gothelf) | 3.99 · 6,701 | 4.5 · 622 (2nd ed.) | 4 | Process |
| 100 Things Every Designer… (Weinschenk) | 4.09 · 6,335 | 4.7 · 554 (.in) | 3 | Runner-up |
| Universal Principles of Design (Lidwell) | 4.16 · 5,881 | 4.6 · 1,084 (Kindle) | 2 | Reference, overlaps Laws of UX |
| Emotional Design (Norman) | 3.95 · 5,603 | n/r | 1 | Three levels already in emotional.md |
| The Elements of User Experience (Garrett) | 4.01 · 4,135 | 4.5 · 448 (2nd ed.) | 4 | Strategy planes; little to audit |
| About Face (Cooper) | 4.07 · 3,534 | n/r | 4 | UXtweak #1; runner-up |
| Designing for Emotion (Walter) | 3.96 · 2,669 | n/r | 1 | Hierarchy already governs emotional.md |
| Refactoring UI (Wathan & Schoger) | 4.64 · 2,248 | Not on Amazon; 30,000+ copies sold direct | 0 | Highest rating of any candidate |
| Designing Interfaces (Tidwell) | 3.83 · 2,022 | n/r | 2 | Pattern catalogue; UXtweak #6 |
| Articulating Design Decisions (Greever) | 4.14 · 1,744 | n/r | 1 | Stakeholder comms |
| Laws of UX, 2nd ed. (Yablonski) | 4.33 · 1,689 | 4.6 · 704 (.de); 4.6 · 79 (.co.uk) | 1 | Most audit-shaped |
| Microinteractions (Saffer) | 4.01 · 1,016 | n/r | 1 | Anatomy already in motion.md |
| Butterick's Practical Typography | 4.38 · 230 | n/r (free web book) | 0 | Niche |
| Practical UI (Dannaway) | 4.51 · 208 | Gumroad 4.9 · 158 | 0 | Too few ratings to rank |

n/r = not retrieved.

## Top 5

1. **The Design of Everyday Things** — the largest UX-specific rating pool (49k), 4.6 on Amazon, in 5 of 6 lists.
2. **Don't Make Me Think, Revisited** — 4.24 on 31k ratings is the best rating of any book above 5k ratings; 5 of 6 lists.
3. **Hooked** — 50k Goodreads ratings and ~9k Amazon reviews; the only top-volume book covering the skill's engagement, retention and dark-pattern scope.
4. **Refactoring UI** — 4.64 is the highest rating in the field, 30k+ paid copies with no retail channel; the only candidate with quantified visual rules.
5. **Laws of UX** — 4.33 Goodreads / 4.6 Amazon, 2024 second edition; every chapter is already a check, so it is the cleanest test of the skill's coverage.

Runners-up: *About Face* (survey #1, but 4.07 and mostly process; its auditable residue — excise, posture, undo — is one bullet below) and *100 Things* (more volume than Laws of UX, lower rating, mostly overlapping psychology).

## 1. The Design of Everyday Things (Norman, rev. 2013)

Norman's argument is that "human error" is design error: a product must make possible actions
discoverable (signifiers, affordances, constraints, natural mappings), tell a coherent story of
how it works (conceptual model), and close both gulfs — execution (how do I do it?) and
evaluation (what happened?) — with immediate, proportionate feedback. Slips and mistakes are
designed out with constraints and forcing functions, never blamed on users.

| Rule (check) | Tag | In skill? |
|---|---|---|
| Every interactive element carries a visible signifier, and no non-interactive element carries one (underlined non-links, raised non-buttons, card-shaped static panels = false signifiers) | S | partial — motion.md covers true signifiers only |
| Natural mapping: controls laid out like what they control — slider/arrow direction matches value direction, control sits beside its target, sequences run in reading direction | S | no |
| Feedback is immediate (< 100ms), says what changed, and is proportionate — > 1 interruptive message per step trains users to ignore all of them | S | partial — usability.md #1 has immediacy, not proportionality |
| Conceptual-model test: from the UI alone a new user predicts what an action will do and can explain afterwards what happened; any surprise in the walkthrough = gulf finding | H | partial — usability.md "where am I / what just happened" |
| Constraints before messages; forcing functions on dangerous paths — interlock (confirm naming the consequence), lock-in (prompt before leaving unsaved work), lock-out (dangerous state unreachable by accident) | S | partial — undo > confirm exists; lock-in missing |
| Slip-proofing: controls with different consequences never look alike or sit adjacent (Delete beside Save); modes visible at all times or removed | S | partial — motion.md "modes minimal" |
| If an element needs an instruction label to be used, the signifier failed — fix the control, not the copy | H | partial — content-and-forms flags "Click here" |
| Errors are design findings: explain, keep input, offer the fix, never blame | S | yes — content-and-forms.md error formula |

## 2. Don't Make Me Think, Revisited (Krug, 3rd ed. 2014)

People don't read pages, they scan; they don't choose the best option, they satisfice; they
don't learn how things work, they muddle through. Krug's three laws follow: don't make me think;
clicks are free as long as each is a mindless, unambiguous choice; cut half the words, then half
again. The book's checkable core is navigation (persistent nav, page names, the trunk test), the
home page's five questions, the "reservoir of goodwill", and a testing cadence of three users
one morning a month — one user early beats fifty late.

| Rule (check) | Tag | In skill? |
|---|---|---|
| Count ambiguous forks, not clicks: a step is one click only if the user is ~90% sure which option is right; an ambiguous fork counts as three | H | no — skill counts steps/decision points |
| Halve the words twice: no happy talk (welcome/intro paragraphs), no instruction blocks; any instruction ≤ 1 line | H | partial — microcopy rules |
| Clickability is obvious at a glance; on mobile, flat styling still gives buttons a fill, border or shape — bare text actions = finding | S | partial — motion.md trigger discoverable |
| Persistent navigation on every page except home and forms: site ID (links home), sections, utilities, search, "you are here" marker; forms get a reduced nav | S | partial — usability.md #1 "current location shown" |
| Every page has one visible name that frames its content, is the most prominent text, and matches the words of the link that led there | S | no |
| Trunk test: on a random interior page with content covered, identify in ~2s site ID, page name, sections, local nav, you-are-here, search | H | no |
| Home page answers above the fold: What is this? What can I do here? What do they have? Why here and not elsewhere? Where do I start? — with a 6–8-word differentiating tagline beside the logo | H | partial — landing-pages.md fast-scroll test; tagline missing |
| Goodwill drainers: hidden support contact/prices/shipping, format punishment ("no dashes"), unneeded data asked, puffery, amateur look, broken things; fillers: total cost up front, real FAQ, printable/exportable, an apology when you can't help | H | partial — emotional.md trust signals; format punishment missing |

## 3. Hooked (Eyal, 2014)

Habits form when a user passes repeatedly through trigger → action → variable reward →
investment, and each pass makes the next more likely because investment stores value and loads
the next trigger. External triggers (paid, earned, relationship, owned) hand off to internal ones
(boredom, loneliness, uncertainty); action follows Fogg's B = MAT, with ability the cheapest
lever; rewards vary across tribe, hunt and self; the manipulation matrix (does the maker use it,
does it improve users' lives) is the ethics test the skill already quotes.

| Rule (check) | Tag | In skill? |
|---|---|---|
| Hook trace per intended habit: external trigger → internal trigger (which emotion) → minimal action → reward type → investment (what's stored, which future trigger it loads); any blank = loop won't close | H | partial — rewards and investment covered separately, no loop trace |
| Habit-zone gate: habit mechanics (streaks, daily rewards, XP) only when the core action plausibly recurs ≥ weekly; otherwise utility triggers (calendar, digest), not gamification | H | no |
| Ability first: score each core action on Fogg's six simplicity factors — time, money, physical effort, brain cycles, social deviance, non-routine — fix the costliest before adding motivation | H | partial — friction audit counts decisions only |
| Owned triggers (push/email) requested only after the first felt reward; every notification answers a named internal trigger and lands one tap from the action; "we miss you" pushes = P2 | H | partial — permission deferral rule exists |
| Reward type named: tribe (social validation), hunt (information/resources) or self (mastery/completion); none identifiable = no reward design; coercive copy → reactance | H | partial — reward moments; taxonomy absent |
| Variability source named: fixed content is finite and decays; flag content products with no social/UGC/generative novelty layer | H | partial — "bounded surprise" covers the other side |
| Investment asked right after a variable reward, never before the first; each investment visibly loads a future trigger (follow → notification) | H | partial — asks after wins, "loads trigger" absent |
| Habit-testing intake: % of users hitting the defined "habitual" frequency; < ~5% = habit mechanics premature | H | no |

Covered already: manipulation matrix → emotional.md ethics gate ("would you use it yourself").

## 4. Refactoring UI (Wathan & Schoger, 2018)

A developer's book of visual-design rules with numbers attached: define systems up front (type
scale, spacing scale, palette, shadows) so no decision is made from an infinite range; build
hierarchy from weight and colour before size; de-emphasise to emphasise; treat labels, borders
and grey text as last resorts; and never scale icons or screenshots. Most of its typography is
already in visual-design.md; the gaps are colour-on-colour, palette depth, shadows, borders,
labels and images.

| Rule (check) | Tag | In skill? |
|---|---|---|
| Fixed type scale, no arbitrary sizes: 12/14/16/18/20/24/30/36/48/60/72 px; 2 weights (400–500, 600–700), 2–3 text colours; hierarchy from weight and colour first | H | yes — visual-design.md typography table |
| Spacing/sizing scale is non-linear with adjacent steps ≥ ~25% apart: 4/8/12/16/24/32/48/64/96/128/192/256/384/512/640/768 | H | partial — 8pt grid listed; ≥ 25% rule and large steps absent |
| Secondary text on a coloured background is a tint of that hue (lower contrast via lightness/saturation), never grey or white-at-opacity | H | no |
| Labels are a last resort: "12 in stock" not "In stock: 12"; where a label is needed, de-emphasise it and emphasise the value | H | partial — content-and-forms "context redundancy" |
| Palette defined up front in HSL: 8–10 greys, 5–10 shades per hue (9 is the sweet spot), base ≈ 500, 900 for text on tints, 100 for tinted surfaces; gradient stops within 30° of hue | H | partial — tokens/raw hex flagged; depth rule absent |
| 5 fixed elevation levels, each one soft ambient + one tight direct shadow; hover raises, press lowers | H | partial, conflicting — visual-design.md says ≤ 3 levels |
| Borders are the last separator: prefer shadow, background change or spacing; dividers on every list row or border + shadow on one element = finding | H | no |
| Icons drawn at 16–24px never scaled past ~1.5× (wrap in a shape); screenshots never downscaled below legibility (crop instead); user-uploaded images in a fixed-ratio container, object-fit: cover, subtle inset border | H | no |

Also covered: line-height tracks measure and size; caps tracked out, display tracked in; centre
≤ 3 lines; numbers right-aligned; unthemed browser defaults. Not covered, minor: baseline-align
mixed sizes; destructive buttons default to secondary styling, red only on the confirm step.

## 5. Laws of UX, 2nd ed. (Yablonski, 2024)

Ten psychology laws (Jakob, Fitts, Hick, Miller, Postel, Peak–End, Aesthetic–Usability, Von
Restorff, Tesler, Doherty) each framed as a design check, plus two closing chapters on method
and ethics. The second edition adds Paradox of Choice, Complexity Bias, Flow, Paradox of the
Active User, Selective Attention and Personalization as considerations. The companion site adds
Gestalt laws, Occam, Pareto, Parkinson, Serial Position, Zeigarnik and Goal-Gradient.

| Rule (check) | Tag | In skill? |
|---|---|---|
| Jakob, Fitts, Hick, Miller/chunking, Doherty 400ms, Peak–End, Aesthetic–Usability, Von Restorff, Tesler, Serial Position, Zeigarnik, Goal-Gradient | S | yes — usability.md Laws of UX section |
| Postel: accept phone/card numbers with or without spaces, dashes, parentheses, country codes; several date formats; trimmed whitespace; case-insensitive email; paste allowed; normalise on display. Any "invalid format" error on input a human would call correct = finding | S | no |
| Paradox of the Active User: users start immediately and never read manuals; tours skippable in one tap, UI learnable in-task; mandatory ≥ 3-screen tour = P2 | S | partial — "learn by doing > carousels" |
| Choice overload: commercial decision points (plans, tiers, product grids) ≤ 3–4 options with a recommended default; long lists get facets | H | partial — Hick row, not pricing-specific |
| Flow: no modals, upsells, surveys, rating asks or notifications mid-task; interruptions only at natural boundaries | H | partial — upsell-only rule in engagement-retention.md |
| Selective attention / banner blindness: critical notices never use ad-like treatment (boxed, bright, right rail); they sit inline in the content flow | S | no |
| Gestalt similarity and common region: same look = same function (two different actions sharing a style = finding); a border/background groups only related items | S | partial — proximity only |
| Mental model: where the product deliberately diverges from what users bring (Jakob), onboarding addresses exactly that divergence | H | partial — Jakob row |

## What the skill is missing

Rules below are new or materially sharper than what the reference files hold today.

**usability.md → Laws of UX section**
- "**Postel** — be liberal in what you accept, conservative in what you show: phone/card numbers with or without spaces, dashes, parentheses or country code; dates in several formats; trimmed whitespace; case-insensitive email; paste always allowed; normalise on display. Flag every 'invalid format' error on input a human would call correct (Krug: punishing users for not doing it your way)."
- "**Mapping** (Norman) — controls are laid out like what they control: slider/arrow direction matches value direction, a control sits beside its target, sequences run in reading direction. Flag crossed, mirrored or arbitrary mappings."
- "**Similarity / common region** (Gestalt) — same look = same function; two different actions sharing a style (two blue text links, one navigates, one deletes) = finding. A border or background groups only related items."
- "**Selective attention** — critical notices (price changes, errors, security, deadlines) never use ad-like treatment (boxed, bright, right rail, promo-shaped); place them inline in the content flow."
- "**Paradox of the active user** — users start immediately and never read manuals. Tours skippable in one tap; UI learnable in-task; mandatory ≥ 3-screen tour = P2."

**usability.md → Nielsen table, row 1 and row 5**
- Row 1 append: "Feedback is proportionate — not every action earns a toast; > 1 interruptive message per step trains users to ignore all of them."
- Row 5 append: "**Slip-proofing**: controls with different consequences never look alike or sit adjacent (Delete beside Save, 'Cancel' beside 'Cancel subscription'); any mode (edit/view, tool, caps) is visible at all times or removed; leaving a screen with unsaved work prompts first (lock-in)."

**usability.md → Flow-level checks**
- "**Ambiguous forks, not clicks** (Krug) — a step counts as one click only if the user is ~90% sure which option is right without thinking; each ambiguous fork counts as three. Report the fork, not the click count."
- "**Trunk test** (Krug) — land on a random interior page, cover the content, identify in ~2s: site ID, page name, main sections, local nav, 'you are here', search. Every page except home and forms shows all six."
- "**Page names** — every page has one visible name that frames its content, is the most prominent text, and matches the words of the link that led there."
- "**Flow protection** — during the core task no modals, upsells, surveys, rating asks or notifications; interruptions only at natural boundaries (after completion, between items)."
- "**Conceptual-model walkthrough** — before each action, write what you expect; after, what happened. Any mismatch is a gulf-of-execution or gulf-of-evaluation finding, with the missing signifier or feedback named."

**visual-design.md → Spacing and layout / Color / Consistency**
- Spacing row: "Scale is non-linear, adjacent steps ≥ ~25% apart: 4/8/12/16/24/32/48/64/96/128/192/256/384/512/640/768. Steps 2px apart (14/16/18 as spacing) = no scale."
- New Color row: "**Text on colour** — secondary text on a coloured surface is a tint of that hue (lower contrast via lightness/saturation), never grey or white-at-opacity (reads washed out). Re-check ≥ 4.5:1 after."
- New Color row: "**Palette depth** — defined up front in HSL: 8–10 greys, 5–10 shades per hue (9 typical), base ≈ 500, 900 for text on tints, 100 for tinted surfaces; gradient stops within 30° of hue. Shades invented inline = drift."
- Amend Consistency row: "≤ 3 shadow levels" → "3–5 fixed elevation levels, each one soft large ambient + one tight direct shadow; hover raises, press lowers. Ad-hoc blur/offset values = finding."
- New row: "**Separators** — borders are the last resort: prefer shadow, background change or spacing. Border + shadow on one element, or a divider on every list row, = finding."
- New row: "**Scaled assets** — icons drawn at 16–24px never scaled past ~1.5× (wrap in a shape instead); screenshots never downscaled below legibility (crop or partial); user-uploaded images in a fixed-ratio container with object-fit: cover and a subtle inset border (no background bleed)."
- Typography row: "Mixed sizes on one line align on the baseline, not the vertical centre."
- Accent dose append: "Destructive actions default to secondary/tertiary styling; red belongs on the confirm step or when deletion is the screen's primary action."

**content-and-forms.md → Microcopy**
- "**Labels last** (Refactoring UI) — prefer combined or value-only phrasing: '12 in stock', 'Posted 3h ago', '$42 · 2 items', not 'In stock: 12'. Where a label is needed, de-emphasise it and emphasise the value."
- "**Instruction = design failure** (Norman, Krug) — if an element needs 'Click here to…', 'Swipe to…' or a how-to paragraph, fix the signifier, not the copy. Any instruction ≤ 1 line; welcome/intro paragraphs deleted."

**landing-pages.md → Structure / CTAs**
- "**Five questions above the fold** (Krug): What is this? What can I do here? What do they have? Why here and not elsewhere? Where do I start? Plus a 6–8-word tagline beside the logo that says what the product is and how it differs — 'best-in-class' fluff fails."
- "**Choice overload** — plan/tier pickers ≤ 3–4 options with one recommended default; ≥ 5 undifferentiated options = P2."

**engagement-retention.md → new 'Hook trace' block above Reward moments**
- "For each intended habit, one line: external trigger → internal trigger (the emotion it answers) → minimal action → reward type (tribe / hunt / self) → investment (what is stored; which future trigger it loads). Any blank = the loop will not close; recommend the missing link, never 'more engagement'."
- "**Habit-zone gate** — habit mechanics (streaks, daily rewards, XP) only when the core action plausibly recurs ≥ weekly. Less frequent products get utility triggers (calendar, digest, saved search); gamifying an annual task = finding."
- "**Ability scorecard** (Fogg) — score each core action on time, money, physical effort, brain cycles, social deviance, non-routine; fix the costliest before adding motivation. A non-routine step required on every use = P2."
- "**Owned triggers** — push/email opt-in asked only after the first felt reward (except where the notification is the value); every notification answers a named internal trigger and lands one tap from the action. Generic 'we miss you' pushes = P2."
- "**Variability source** — name it: social/UGC (infinite) vs fixed content (finite, decays). Fixed-content products with no social or generative layer get a variability recommendation before any new reward."
- "**Investment timing** — ask for user work (profile, follow, rate, invite, import) right after a variable reward, never before the first; each investment visibly loads a future trigger."
- Audit intake: "Ask for the % of users hitting the team's own 'habitual' frequency; < ~5% means habit mechanics are premature (Eyal's habit-testing threshold)."

**emotional.md → Trust signals**
- "**Goodwill ledger** (Krug) — drainers: hidden support contact, prices or shipping; format punishment; unneeded data asked; puffery; amateur visuals; broken things. Fillers: total cost up front; a FAQ that answers real questions; printable/exportable records; an apology when you can't help. Net the ledger per core flow."

**Runner-up residue (About Face), usability.md → Flow-level checks**
- "**Excise** (Cooper) — any step that serves the software rather than the user's goal (confirmations, re-login, save prompts, manual refresh, re-entering context) is excise; list it per flow and target zero on the happy path."

## Sources

- Goodreads edition pages, 2026-10-07: Krug 18197267 · Norman 840 · Eyal 22668729 · Wathan 43190966 · Yablonski 50611580 · Cooper 289062 · Tidwell 51718559 · Weinschenk 10778139 · Lidwell 18881237 · Norman 841 · Kahneman 11468377 · Saffer 17239285 · Walter 12910715 · Gothelf 13436116 · Garrett 1867 · Greever 25520974 · Knapp 25814544 · Dannaway 75519891 · Bringhurst 44735 · Butterick 18244760
- Amazon: amazon.com Norman Revised (0465050654), Krug Revisited (0321965515), Knapp (150112174X), Gothelf 2e, Garrett 2e, Bringhurst; amazon.ca/.co.uk Eyal (1591847788); amazon.de Yablonski (149205531X); amazon.in Weinschenk; Lidwell Kindle (B00A3T5UO4). Refactoring UI: refactoringui.com ("30,000+ copies").
- Lists: untitledui.com/blog/ux-design-books · eleken.co/blog-posts/ui-ux-books · blog.uxtweak.com/ux-books-and-ux-design-books · nngroup.com/articles/recommended-user-interface-books · uxplaybook.org/articles/10-best-ux-design-books-2026 · grauberg.co/resources/ux-books
- Content: jonyablonski.com/articles/2024/laws-of-ux-the-2nd-edition (2nd-ed. additions); sglavoie.com Refactoring UI summary (8–10 greys, 5–10 shades, 9 sweet spot, 30° gradients, 45–75 ch, 5 shadow levels); readingraphics.com Don't Make Me Think summary (nav elements, home-page list, one morning a month).
