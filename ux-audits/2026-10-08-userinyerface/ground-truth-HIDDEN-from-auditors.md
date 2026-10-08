# Ground truth — patterns planted in User Inyerface (orchestrator only, hidden from auditors)

Sources:
- **[G]** GIGAZINE walkthrough (2019-07-07).
- **[W]** press summaries in the search results: Creative Bloq, UBC ETEC540 student write-ups, derStandard. Their wording: "green instead of red for negative affirmations", "underlines and different colour text that are not links", "must/should/can wording", "double negatives", "hiding commands", "delete content before typing", "vague captcha language", "age slider".
- **[S]** read directly in `app.js`.

| # | Pattern | Where | Source |
|---|---------|-------|--------|
| 1 | Big green "NO" that looks like the go button; the real link is a small "HERE" | Home | G, W |
| 2 | Underlined / differently coloured text that isn't a link ("click", "next page") | Home | G, W |
| 3 | Cookie banner: alarming red, loaded question ("is that a problem for you?"), button weighting/labels confusing; banner reappears/persists | All steps | G, W |
| 4 | Running timer shown prominently (pressure) | All steps | G |
| 5 | "Hurry up, time is ticking!" modal after ~1 min, covers screen, blocks interaction | All steps | G, S |
| 6 | Modal close control is not a real close (enlarged icon); "Lock/Unlock" buttons in red/green with inverted meaning | Timer modal | G, S |
| 7 | Help widget: "Send" button labelled "to bottom" — it just slides the widget away, no help given | All steps | G |
| 8 | Prominent filled primary button is "Cancel"; "Next" is a faint text button on the left | Step 1 (+ other steps) | G, W |
| 9 | Placeholder text is real value text that must be deleted before typing ("Choose Password", "Placeholder...") | Step 1, step 3 | W, S (`clear(){ internal = placeholder }`) |
| 10 | Password field is `type=text` (password shown in clear) | Step 1 | S |
| 11 | Password field `tabindex=-1` (unreachable by Tab) | Step 1 | S |
| 12 | Password rules with confusing modal verbs (requires / should / must / needs / can) | Step 1 | W, S |
| 13 | Absurd password rule: needs ≥ 1 letter of your email | Step 1 | S |
| 14 | Fake rule: "can have at least 1 cyrillic character" (always true) | Step 1 | S |
| 15 | Rules shown in low-contrast / tiny text | Step 1 | G |
| 16 | Email split into local part / domain / TLD dropdown ("other") | Step 1 | S / observed |
| 17 | Double-negative T&C checkbox ("I do not accept…"), state confusing | Step 1 | W |
| 18 | Error messages without clear guidance | Step 1+ | G |
| 19 | Avatar: "upload" is a tiny inline link while the button says "Download image" | Step 2 | S / observed |
| 20 | Interests: "Select all" / "Unselect all" mixed into the option list as checkboxes; must pick exactly 3 | Step 2 | S / observed |
| 21 | Nonsense / irrelevant interest options | Step 2 | observed |
| 22 | Personal details: illogical field order/grouping (Zip before City, Street/Box/Number split, Title mid-form) | Step 3 | observed |
| 23 | Age control is a slider (hard-to-set age) separate from birthdate | Step 3 | W, S (slider component) |
| 24 | Gender choice as a limited/odd control | Step 3 | observed |
| 25 | Captcha with vague instructions ("bows", "light pictures", "glasses"), randomised | Step 4 | G, W |
| 26 | Step pips 1–4 coloured green/white misleadingly (green ≠ done) | All steps | W ("misleading symbols and colours") |
| 27 | Hidden commands that would speed things up | Various | W (unspecified) |
| 28 | Tiny font / poor visibility overall | Step 1 | G |

Recall scoring: count a pattern as caught if a verified (or clearly evidenced P3) finding
names the same element and the same defect. 28 items; items 21, 24 and 27 are vague and
reported separately as "soft".
