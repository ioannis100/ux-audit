# Wolt (web + Android app, guest): summary, 2026-10-09

## Recommendations
**Must-do**
1. **Honest consent:** equal-weight "Use only necessary" on the cookie sheet; marketing push and email
   unticked by default in the app.
2. **Make the €5 true:** "€5 off unlocked · new customers · select at checkout" at the crossing, and the
   €5 pre-selected at checkout (it is celebrated in the app basket, then left off by default).
3. **Never lose a guest's basket:** keep the app's guest session after Back, fix the carts tab, a resume
   card on Home, "Start a new order / Continue (1 item · €10.50)" instead of "No / Yes".
4. **Sign-in as a sheet over the basket** at checkout; drop the untrue "sign up to start ordering" sheet.
5. **Two accessibility P1s (web):** the desktop search Tab trap; names on the cuisine tile links.

**Good to have:** pressed states + view transitions (tile, item sheet, app spinner pages) · "Remove" out of
the primary slot + Undo · Add to order that feels physical (≤ 100 ms bar, bump, consistent haptics) ·
fees on the web basket · guest favourites on the device · real order counts instead of "Popular".

**Useful, lower priority:** faint deal and alcohol labels (and the wrong "1% vol" data) · search empty
state · closed/removed venue screens · lab performance · street address instead of GPS in the app.

**Black (informed choice):** persuasion through loss aversion and urgency; some consider it unethical,
delivery apps use it. Passing the gate: a resume card with the real last-order time (B-01, verified with
two amendments), one saved-cart push with a valid opt-in and quiet hours (B-02), a loss-framed
notification ask after the first order (B-03). Never: pre-ticked consent, celebrating savings not in the
total (both present today), fake urgency, drip pricing, confetti on payment. Details: report §2b.

## Verdict
Strong craft (Direction 12/15, steppers 27–41 ms, honest "Closing soon", labelled ads); the app beats the
website for guests. Trust and pull leak at the money and return moments: the cookie sheet, pre-ticked
consent, a €5 celebrated but not applied, a basket that "No", Back or an error makes disappear.

## Scorecard
**Overall 5.8/10** · Clarity 6 · Feel 6 · Pull 5 · Trust 4 (capped: two confirmed dark patterns) · Craft 8
· health: Usability 6 · Accessibility 6 · Performance 5 · Content 6. Guest only, run at 02:30–04:00 Cyprus
time. Heuristic expert scores, not measured usability.

## Calibration notes for the skill (run 2)
- **Scores:** Wolt's guest experience 5.8 vs Duolingo 7.1, driven by Trust (capped) and Pull; Craft 8 for
  both. The skill separated "beautiful" from "trustworthy", as the anchors intend.
- **Verification:** 49 items; no finding rejected outright, but 4 sub-claims rejected, 8 severities
  changed (including a P0 → P1), 9 duplicates merged, 4 sets of numbers corrected.
- **Black tier:** 4 candidates proposed, 1 failed the gate in verification (order counts: no easy out).
- **Skill fixes this run exposed:**
  1. Audit food/retail during the market's opening hours; the brief must state the local time.
  2. `extract-design.js`: text inside `role="img"` with an `aria-label` (and `aria-hidden` children) is
     not text to check for contrast (Wolt's €€€ meter: 84–165 false failures per screen).
  3. `capture-motion.mjs` spec mode needs a `"theme"` option (default light); it rendered dark on this Mac.
  4. Agents had no `adb` on PATH, so a vibration log came back empty: `native-android.mjs` needs a
     `vibrations` command that uses the SDK path, and briefs must not tell agents to call `adb` directly.
  5. Helpers and specs must target visible elements: `cart-view-button` matched a 0×0 header copy whose
     real click hit the logo.
  6. Native guest setups that need the owner (Terms) are fragile: save an emulator snapshot after setup
     (`adb emu avd snapshot save audit-ready`) so agents and verifiers can restore instead of asking again.
