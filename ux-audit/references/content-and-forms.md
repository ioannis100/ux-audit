# Content, microcopy, onboarding, forms

Load when the product has forms, onboarding, empty states, or meaningful copy (almost
always). For deep conversion work on marketing pages, hand off to the `cro`,
`onboarding`, `signup`, `copywriting` skills — this file covers the UX floor.

## Microcopy

- Plain language, ~grade 7–9. Front-load the first 2 words of headings and links.
- **Buttons = verb + object**: "Save changes", "Create invoice", "Pay $42.10".
  Flag "OK", "Submit", "Yes", "Click here", "Learn more" without context (WCAG 2.4.4).
- Destructive buttons name the consequence: "Delete 3 files".
- Dialog buttons answer the dialog's question ("Discard draft?" → "Discard" / "Keep editing").
- Sentence case for UI text; no ALL CAPS paragraphs.
- No internal jargon, enum names, raw IDs, `null`, `undefined`, `NaN`, `[object Object]`.
- **Label = actual action**: the button names what really happens ("Claim rewards"),
  not a related concept ("Earn tokens").
- **Context redundancy**: delete words the heading already supplies (under "Voting",
  "Last 10 votes" → "Last 10"). Small savings compound across an app.
- **Ambiguity read**: read each label literally ("Commit time" = committing time?). If
  it parses two ways, rewrite.
- **Labels last** (Refactoring UI): combined or value-only phrasing — "12 in stock",
  "Posted 3h ago", "$42 · 2 items", not "In stock: 12". Where a label is needed,
  de-emphasise it and emphasise the value.
- **Instruction = design failure** (Norman, Krug): if an element needs "Click here
  to…", "Swipe to…" or a how-to paragraph, fix the signifier, not the copy. Any
  instruction ≤ 1 line; welcome/intro paragraphs deleted.
- The verb names the real action, positively: "Start my free trial" ✓; "Start my
  journey" on an add-to-cart ✗.

## Error message formula (NN/g)

1. Visible, next to the field, icon + color (not color alone).
2. What happened, in human terms.
3. How to fix it, with an example of the expected format.
4. Polite, no blame, codes secondary.
5. User's input preserved.
6. Focus moved or error announced for screen readers.

Flag: "Invalid input", "Error 500", "Something went wrong" with no next step, form
cleared after a failed submit.

## Empty states (NN/g)

Explain why it's empty → teach what goes here → one direct CTA (or sample/template
content). Empty states are prime real estate for personality and for teaching —
flag blank panels and bare "No data".

Three kinds to check: first-use (never had data), user-cleared (inbox zero — celebrate),
no-results (offer to broaden search, fix typos).

## Onboarding and time-to-value

- Count steps, screens and decision points from landing → first meaningful outcome
  (target < 60s). Every step is a cost unless it buys a visibly personalized first
  screen or qualifies buyers (onboarding paradox — see engagement-retention.md).
- Empty dashboards get sample data so the first screen isn't blank.
- Defer sign-up and permission prompts until value has been shown.
- Learn by doing > tutorial carousels (users skip deck-of-cards tutorials).
- Contextual, just-in-time tips > upfront tours.
- Pre-fill and pre-credit (endowed progress).
- Progressive disclosure: core visible, advanced behind "More options"; ≤ ~2 levels deep.

## Forms (Baymard, NN/g)

| Check | Good | Flag |
|-------|------|------|
| Field count | ~8 fields suffice for most checkouts; field count matters more than step count | Avg checkout has 11.3 fields / 23.48 form elements — anything near that is bloated |
| Name | Single "Full name" field where possible | Split first/last by default (89% of sites) |
| Address line 2 | Collapsed behind a link | Shown by default (75% of sites) |
| Labels | Top-aligned, always visible; required *and* optional marked | Placeholder-only labels |
| Layout | Single column; field width matches expected input | Multi-column forms; full-width ZIP field |
| Inline validation | On blur, not on keystroke; remove error once fixed; positive confirmation | No inline validation (31% of sites); errors while still typing |
| Input types | Correct `type`/`inputmode` (email, tel, numeric); `autocomplete` tokens (1.3.5) | Full keyboard for a number; no autofill |
| Paste | Allowed in password and OTP fields | Paste blocked |
| Checkout | Guest checkout; total cost before payment; security cue at card fields | Forced account; surprise fees at the last step |
| Submit | Busy state, double-submit blocked, success state with next step | Button does nothing visible for 1s+ |
| Smart defaults | Every field pre-filled with the most common value (70–90% of users never change a default); the CTA may state the outcome ("Show 12 results") | Fully blank booking/search form |
| Selection over typing | Predictable answer sets (job title, goal, reason) as chips of the common answers + "Other" | Free-text field for a predictable answer |
| Input method [H] | Slider / wheel for one-time bounded setup values (age, height); text field, stepper or numeric keypad for frequent precise entry (grams, amounts) | Slider for repeated precise entry |
| Control placement | Radio/checkbox left of its label, in reading order | Control after its label |
| Commit button | Shows the total ("Reserve · €445 total"); cancellation/refund line directly under it | Total only on the next screen |

Cart abandonment averages ~70%. Top reasons: extra costs 48%, forced account 26%,
card trust ~25%, long/complicated checkout ~18–22%.

## Transactional and status screens [H]

- Empty search is never blank: recents, popular, personalised suggestions.
- Expose content directly: a list hidden behind a promo banner that needs a tap
  ("Discover 100+ recipes →") = interaction-cost flag; surface the top items.
- People and companies identified by avatar or logo; coloured initials only as fallback.
- Dates show day names and duration ("Fri 28 Mar → Wed 2 Apr · 5 nights").
- Status/tracking: a headline stating the state ("Your order is on the way"), key facts
  with icons, a human contact (photo, name, call/message), a visual step timeline — not
  a list of dates.
- Finance/transfer: amount is the hero field with the currency selector inside it;
  recipient as avatar + name + account; "new balance after" visible before confirm;
  with several accounts, source and destination both shown and switchable.
