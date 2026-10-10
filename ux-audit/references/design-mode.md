# Design mode: specify a page or flow that doesn't exist yet

For "design our payment page", "what should the onboarding look like", "spec the provider dashboard":
a page or flow with no live version, or one being rebuilt from a brief. The output is a buildable
spec (and optional mock-ups) built from the same research and rules the audits use, so it is
right **before** it ships instead of after an audit. Everything is in the product's identity.

## 0. Inputs (ask once, default the rest)
- **Product and page:** what the product is, which page or flow, for whom (which side, if two-sided),
  platforms (web, iOS, Android).
- **Identity source:** the live product (extract tokens with `extract-design.js` and the
  `mockup-maker.md` step 0 identity capture), a design system, Figma, or screenshots. If the product
  doesn't exist yet, say so and use neutral tokens the owner can swap.
- **Constraints:** stack, payment provider, markets (law: EU/UK/US), what data exists, what the
  backend can and can't do yet.
- **Goal and metric:** what this page must move (conversion, completion, trust, repeat use).

## 1. Classify and find the moment
`app-types.md` §1 for the product; then the page's moment types in `benchmark-apps.md` §3 (e.g. a
payment page = 3.9 submit/checkout/pay + 3.10 money success + 3.11 errors) and the vertical recipe
(`marketplace.md` §2, `classifieds.md` §2–3, the food/fintech rows in `benchmark-apps.md` §4).

## 2. Jobs, questions and anxieties
Write what the user must **know**, **decide** and **feel safe about** on this page, in their words
("How much in total?", "When am I charged?", "What if the pro doesn't show up?"). Each becomes a
content block or a state; the biggest anxiety gets the most prominent answer (`emotional.md`
anxiety reducers). What happens next must be visible before the commit.

## 3. Benchmarks: same category, then across categories
2–3 category leaders' version of this page (users will expect their conventions; Jakob's law) and
at least two cross-category donors for its key moment (`app-types.md` §3). Walk them live where
reachable (guest, read-only, the `_contract.md` pacing) and cite what you observed [O]; otherwise
cite the research files. Never invent a competitor's detail.

## 4. The page, specified
- **Structure:** blocks in order, what is above the fold on a phone, the one primary action.
- **Copy:** exact strings for headings, buttons, helper text, errors, confirmations, in the product's
  voice and languages; no generic "Submit / Something went wrong".
- **Components × states:** every component with every state from `micro-interactions.md` §1.2 and
  §2–6 (rest, pressed, focus, disabled, busy, success, error, empty, loading, offline), plus edge data
  (long names, zero, maximum, other currencies or languages). A table, no gaps.
- **Motion and feedback:** sized by `reward.md` §3 (money stays calm), tokens from `benchmark-apps.md`
  §2, haptics by meaning, reduced-motion versions, web and native snippets.
- **Accessibility:** names, roles, focus order, live announcements, contrast in the product's colours,
  targets, zoom.
- **Performance:** what must render first, budgets (feedback < 100 ms, no blocking spinners), what to
  prefetch.

## 5. Trust, ethics and law, applied to the design
Run the relevant red-line checklists **as design requirements** (pass by construction): `reward.md` §7
(R-tests), `marketplace.md` §4 (M1 fees, M7 guarantee, M8 off-platform, M10 disputes…),
`classifieds.md` §4, `emotional.md` ethics gate, consent unticked by default, total price from the
first view. List each with how the design satisfies it. Legal points that depend on the business's
status are written as **questions for the owner**, not assumptions.

## 6. Options in the four tiers
The spec is the **Must-do** version. Add **Good to have** and **Useful** enhancements, and a **Black
(informed choice)** list per `black-ux.md` (gate and test for each, plus the "never" items for this
page) so the owner decides knowingly.

## 7. Metrics and test
Events to log (view, first interaction, errors by type, commit, success, abandonment step), the
success metric and guardrail metrics, and the cheapest test (A/B, 5-user test, fake door).

## 8. Mock-ups (optional, if asked)
`mockup-maker` in design mode: no Before frame; the features come from the spec's component list
(declared in `#parity`), the identity from step 0 (`#identity`); one frame per key state (default,
busy, success, error); must pass `render-mockup.mjs`.

## 9. Review before handing over
A `verifier` (or the orchestrator, solo) reads the spec against this file: every state defined, every
anxiety answered, every red line satisfied, every benchmark claim sourced, every number tagged
[S]/[O]/[H], open questions listed. Fix gaps, then hand over.

## Output: `ux-audits/YYYY-MM-DD-<product>-design-<page>/design.md`
```
# Design: <page> for <product>
Context and classification · Goal and metric
## Jobs, questions, anxieties
## Benchmarks (same-category · cross-category, each [O] or sourced)
## The page: structure · copy · components × states table · motion and haptics · accessibility · performance
## Trust and red lines (requirement → how the design meets it) · Questions for the owner
## Recommendations: Must-do (the spec) · Good to have · Useful · Black (informed choice)
## Metrics and test plan
## Mock-ups (links), if made
```
Keep it ≤ ~300 lines; it is a build document for a developer or another agent.
