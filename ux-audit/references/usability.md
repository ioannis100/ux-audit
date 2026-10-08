# Usability foundations

Load for every audit. These are the floor: Walter's hierarchy says nothing above
"usable" matters while these fail.

Confidence tags: **[S]** established standard, **[H]** practitioner heuristic —
report [H] items as suggestions, never as violations.

## Nielsen's 10 heuristics — what to check

| # | Heuristic | Concrete check | Detect by |
|---|-----------|----------------|-----------|
| 1 | Visibility of system status | Every action gives feedback < 100ms; ops > 1s show progress; current location shown (active nav, breadcrumb); feedback proportionate — > 1 interruptive message per step trains users to ignore all of them | Interaction (tap + 300ms screenshot diff) |
| 2 | Match the real world | User vocabulary, not DB/internal terms ("SKU_ID", "null", enum names); familiar ordering | Screenshot, copy read |
| 3 | User control & freedom | Undo/back/cancel on every flow; modals close via Esc, X, backdrop; no dead ends | Interaction |
| 4 | Consistency & standards | Same component looks/behaves the same everywhere; platform conventions (Jakob) | Screenshot across screens, computed-style diff |
| 5 | Error prevention | Constraints over messages (pickers, masks, disabled impossibles); undo > confirm for destructive; **slip-proofing** (Norman): controls with different consequences never look alike or sit adjacent (Delete beside Save, "Cancel" beside "Cancel subscription"); any mode (edit/view, tool, caps) visible at all times or removed; leaving with unsaved work prompts first | Interaction |
| 6 | Recognition over recall | Visible options, recents, autocomplete; labels persist after typing (no placeholder-only labels) | Screenshot of filled form |
| 7 | Flexibility & efficiency | Shortcuts, bulk actions, remembered prefs, smart defaults | Interaction, code |
| 8 | Aesthetic & minimalist | Every element earns its place; one primary CTA per view | Squint test |
| 9 | Error recovery | Plain language, precise cause, constructive fix, input preserved (see content-and-forms.md) | Trigger every error path |
| 10 | Help | Contextual, searchable, consistent location (WCAG 3.2.6, A) | Screenshot |

Severity (Nielsen 0–4) = frequency × impact × persistence:
0 not a problem · 1 cosmetic · 2 minor · 3 major · 4 catastrophe (fix before release).

## Laws of UX — checkable forms

- **Fitts** — primary CTAs large and near the user's current focus. On mobile, frequent
  actions in the bottom-third thumb zone; on desktop, edges/corners are cheap targets.
  Flag: small target far from the content it acts on; primary action top-right on a phone.
- **Hick** — decision time ∝ log₂(choices). Flag > ~7 top-level nav items, > 1 primary
  CTA per view, long flat settings lists. Fix: chunk, default, progressive disclosure.
- **Jakob** — users expect your product to work like the ones they already use. Logo
  top-left → home, cart top-right, magnifier = search, gear = settings, swipe-back works.
  A deviation needs a reason worth the relearning cost.
- **Chunking** — working memory ≈ 4±1 chunks (Cowan 2001; Miller's 7±2 is the upper
  bound). Group into 3–5. Chunk long numbers (4-4-4-4 card, 3-3-4 phone).
- **Doherty threshold** — productivity jumps when response < 400ms. If the real work
  can't be that fast, *show something* within 400ms (optimistic UI, skeleton).
- **Tesler** — complexity can't be removed, only moved. The system should absorb it:
  address autocomplete, card-type detection, timezone inference, smart parsing of
  pasted input.
- **Aesthetic-usability** — perceived usability follows the look even after use
  (Tractinsky 2000); prettier versions score higher on perceived usability and *worse*
  on task time (Tuch 2012). Judge by task success. If Craft scores ≥ 7/10 and a
  core task fails, raise that finding one severity level — the halo hides it from the
  team's own testing.
- **Von Restorff** — only one thing per view should stand out. Flag "everything is
  highlighted" (multiple filled buttons, badges everywhere, competing accent colors).
- **Serial position** — first and last items remembered best. Key nav items at the
  ends; key content at start and end of lists/pages.
- **Goal gradient + endowed progress** — effort accelerates near a goal; a pre-filled
  progress card hit 34% completion vs 19% blank (Nunes & Drèze 2006). Show progress,
  pre-credit completed steps ("Account created ✓").
- **Zeigarnik** — unfinished tasks stick. "Continue where you left off", completion
  meters. Ethical use only — no nagging.
- **Peak-end** — experiences are judged by their most intense moment and their end.
  Always audit the worst moment and the final screen of each journey (see emotional.md).
- **Postel** — accept liberally, display conservatively: card/phone numbers with or
  without spaces, dashes, brackets or country code; several date formats; trimmed
  whitespace; case-insensitive email; paste always allowed; normalise on display. Every
  "invalid format" error on input a human would call correct = finding.
- **Mapping** (Norman) — controls laid out like what they control: slider/arrow
  direction matches value direction, a control sits beside its target, sequences run in
  reading direction. Flag crossed, mirrored or arbitrary mappings.
- **Similarity / common region** (Gestalt) — same look = same function. Two actions
  sharing a style with different consequences (two blue links, one navigates, one
  deletes) = finding. A border or background groups only related items.
- **Selective attention** — critical notices (price changes, errors, security,
  deadlines) never look like ads (boxed, bright, right rail, promo-shaped); put them
  inline in the content flow.
- **Paradox of the active user** — users start immediately and never read manuals.
  Tours skippable in one tap; UI learnable in-task; mandatory ≥ 3-screen tour = P2.
- **Three measures, not one** — effectiveness, efficiency and satisfaction are weakly
  correlated (Frøkjær, Hertzum & Hornbæk 2000). Report completion, time and the
  persona's rating separately for each task; never infer one from another.

## Flow-level checks

- Count steps and screens from landing to first meaningful outcome (time-to-value).
- Count steps to cancel/delete account vs to sign up — asymmetry is a dark pattern.
- Walk every journey's unhappy path: no network, invalid input, empty data, expired
  session, permission denied, back button mid-flow, refresh mid-flow.
- Every screen answers: where am I, what can I do, what just happened, what next?
- **Ambiguous forks, not clicks** (Krug) — a step is one click only if the user is ~90%
  sure which option is right without thinking; an ambiguous fork counts as three.
  Report the fork, not the click count.
- **Trunk test** (Krug) — land on a random interior page, cover the content, identify
  in ~2s: site/app ID, page name, main sections, local nav, "you are here", search.
  Every page except home and forms shows all six.
- **Page names** — every page has one visible name that frames its content, is the
  most prominent text, and matches the link that led there.
- **Flow protection** — during the core task no modals, upsells, surveys, rating asks
  or notifications; interruptions only at natural boundaries (after completion).
- **Conceptual-model walkthrough** — before each action write what you expect; after,
  what happened. Any mismatch is a gulf-of-execution or gulf-of-evaluation finding —
  name the missing signifier or feedback.

## Mobile bottom navigation / tab bar ([S] where HIG/M3, else [H])

- 3–5 tabs (HIG, M3); 6 = flag. Top-level, high-frequency destinations only (home,
  search, create, inbox, profile). Help, logout, legal, back or a logo in the bar = P2.
- Centre slot may hold the primary action (create / order / post).
- Icon ~24px; label 10–12pt (iOS 10pt, M3 12sp), one line — **not** a < 12px text
  violation. Hit area ≥ 44×44. Bar clears the 34pt home-indicator safe area.
- Active tab shows ≥ 2 visual changes (outline→fill + colour, or colour + weight).
  Label-colour-only = flag. One icon style; filled variant reserved for the selected tab.
- Surface is neutral (white / light grey / dark); brand colour stays on in-content
  actions; no per-tab colours; top and bottom bars share one palette.
- Separated from content by a 1px border, a background tint or a soft shadow. None =
  flag. Inactive items dimmed by opacity, still ≥ 3:1.
- Badges top-right, small, legible digits, essential notifications only.
- Tab switch: pressed feedback < 100ms, indicator slides, content cross-fades or slides
  200–300ms (see motion.md).

## Cognitive load checklist (borrowed from impeccable)

- ≤ 4 items per visual group; ≤ 4 visible options at a decision point.
- Nothing the user must remember from a previous screen (show it again).
- One primary action per view; secondary actions visually quieter.
- Progressive disclosure for anything advanced.
- Defaults chosen for the majority; required decisions minimized.
- No unexplained icons — label or tooltip anything not universally understood.
- Consistent terminology: one name per concept across the whole product
  (build the term inventory from `extract-design.js` → `copy.labels`).
- Reduction filter: can this element be removed? Would anyone need to be told it exists?
  Is its visual weight proportional to its importance?

## Edge-case data (borrowed from emil's break-ui)

Real products ship broken on mundane data, not on "aaaa". Check every list/card with:
count of 0 (empty state), count of 1 ("1 members"), very large counts (1,284,903),
long names and long translations (German ≈ +30%), missing avatar/image, missing
optional fields, very old and future dates, RTL if localized. Change the data, not the
component, to test.

## Purpose and outcome checks (Gabe)

- **Purpose vs completion**: for each core action, picture the user's real physical and
  mental state at that moment (half-asleep, one-handed, walking, anxious). Does the
  feature achieve the actual outcome, or only register completion? (An alarm a
  half-asleep tap can dismiss "works" but fails its purpose.) Technically-works-but-
  defeats-itself = P1/P2; propose the purpose-fit mechanic.
- **Hick at first run**: does a new user land on ONE obvious action (Apple Fitness
  "Let's go") or a menu of 30?
- **Fitts under distraction**: on-the-move or one-handed contexts need oversized core
  actions in thumb reach (Waze).
- **Outcome-first**: what's the shortest line from user to outcome? Which steps are
  mechanical, and which would users happily never do again? Repetitive utility steps are
  candidates for smart defaults or AI doing them outright.
- **Decision points and workarounds**: see engagement-retention.md → Friction audit.

## Evaluation coverage and measured usability

- A single evaluator finds 20–51% of problems (Nielsen & Molich 1990); 5 users find
  ~85% on average but as few as 55% (Nielsen & Landauer 1993; Faulkner 2003). Team
  mode: ≥ 3 independent agents walk each core journey. Solo mode: head the report
  "single-evaluator pass — expect ~1/3 coverage". When recommending research: 5 users
  per round, iterate — not one 15-user round.
- Never present a heuristic score as a measured usability score. If SUS data exists:
  mean 68 (Sauro) / ≈ 70 (Bangor 2008); < 50 unacceptable; ≈ 80 top decile. If none,
  recommend UMUX-Lite (2 items: "capabilities meet my requirements", "easy to use";
  Lewis 2013) on the post-task screen.
