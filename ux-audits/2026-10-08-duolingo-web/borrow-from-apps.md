# Borrow & adapt: Duolingo web (Apple and Revolut only, per the brief)

Duolingo is the north star, so this file is short. Evidence for "now" lives in
`findings/experience-director.md` and `evidence/experience-director/reward-measurements.md`.
Specs are starting values [H] unless tagged.

## Borrow from Revolut
### RevPoints → "gems that name what they buy"
- As-is fits? translate: gems already exist (guest starts with 500, +5 per daily quest) but nothing says
  what they are for; the shop is a separate tab (`shots/H-shop-full.png`).
- Our version: the "You earned 5 gems!" screen · copy "505 gems · enough for 2 Streak Freezes" + an
  "Equip one" button (free choice, 200 gems each) · spec: chip fades in 200 ms after the chest art;
  benchmark-apps §3.12 · metric: freeze equip rate, D7 retention · effort S · builds on M-03.
- Ethics: gems are earned only on this surface (R6 pass); never add a money price beside a "you're short"
  message.
- Don't copy: abstract balances, silent expiry, prize draws tied to points.

### Number roll on balances → header counters that move
- As-is fits? yes: streak, gems and XP change after every chain, and the header updates silently.
- Our version: on return to /learn, the header gem count rolls 500 → 505 and the streak 0 → 1 · spec
  400 ms ease-out, `font-variant-numeric: tabular-nums`, `aria-live="polite"` on the final value
  (reward.md §4) · metric: none on its own (feel) · effort S.
- Ethics: fine; never roll a number to push spending.
- Don't copy: live-rate watching loops.

## Borrow from Apple
### Pause Rings → a free day-1 Streak Freeze
- As-is fits? translate: the freeze is Duolingo's pause, but a new guest has 0/2 equipped.
- Our version: auto-equip 1 free freeze on the first streak day; the streak screen says "Miss a day? Your
  free Streak Freeze has you covered." · spec: M-03 · metric: D2/D7 retention, streak-break rate ·
  effort S.
- Ethics: forgiveness from day 1 (reward §5); no paid restore as the only escape.
- Don't copy: unpausable goals.

### Activity ring closure → the chosen daily goal, visible
- As-is fits? translate: the learner picks "5 min / day · Casual" in onboarding, then never sees it close.
- Our version: a thin ring around the header flame fills with each lesson and closes on the goal · spec:
  SVG `stroke-dashoffset` 300 ms `cubic-bezier(.2,0,0,1)`; native `.sensoryFeedback(.success)` on close
  (benchmark-apps §3.12) · metric: daily-goal completion · effort M.
- Ethics: a floor, not a stretch; no counting past 100% as pressure.
- Don't copy: rings that guilt on missed days.

### Reduce Motion behaviour → lesson feedback that honours it
- As-is fits? yes: lesson feedback runs identical animations under `prefers-reduced-motion`.
- Our version: banner fade ≤ 150 ms, instant bar fill + highlight, no overshoot; colour, sound kept ·
  metric: n/a (accessibility) · effort S · builds on F-EXP-04.

### Calm confirmation → the quit sheet
- As-is fits? yes: Apple confirms without emotion.
- Our version: "Leave this lesson? Answers so far won't be saved." [Keep going] [Leave], equal weight,
  neutral Duo · effort S · builds on F-EXP-01.

## Top 5 ideas to build first
| # | Idea (apps) | Builds on | Impact | Effort | Score | Metric | Cheapest test |
|---|---|---|---|---|---|---|---|
| 1 | Free day-1 freeze, said out loud (Apple Pause Rings) | M-03, F-EXP-03 | H | S | 9 | D2/D7 retention | A/B on new guests |
| 2 | Gems name what they buy + equip (Revolut RevPoints) | Reward layer | H | S | 9 | freeze equip rate | A/B copy on the gems screen |
| 3 | Header counters roll (Revolut) | M-02 | M | S | 6 | — (feel) | 5-user test |
| 4 | Reduced-motion lesson feedback (Apple) | F-EXP-04 | M | S | 6 | — (a11y) | ship |
| 5 | Daily-goal ring closes (Apple rings) | P-01 | M | M | 4 | daily-goal completion | fake door on the header ring |
