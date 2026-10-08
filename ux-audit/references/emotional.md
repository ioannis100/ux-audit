# Emotional UX, delight, trust, engagement, ethics

Load for every audit. This is what separates "works" from "people love it and come
back". It is also the layer most audits skip.

## The governing rule: Walter's hierarchy

functional → reliable → usable → **pleasurable**

Never recommend surface delight while a lower layer fails. Confetti on a broken flow
is worse than either alone. In the report, delight recommendations come *after* the
fixes they depend on.

## Norman's three levels — audit each

| Level | Question | Signals to check |
|-------|----------|------------------|
| **Visceral** (first ~50ms, Lindgaard 2006) | Does it look trustworthy and appealing at a glance? | Polish, image quality, color harmony, type quality, alignment, no default-browser leftovers, no broken images, consistent icon style. **Flash test**: look at the first screenshot for 0.5s, then at it blurred (`document.body.style.filter='blur(8px)'`, screenshot); rate appeal 1–100 beside the competitor's — only gestalt counts (balance, colour harmony, image quality, whitespace); the verdict forms in ~50ms and is stable |
| **Behavioral** (in use) | Does it feel fast, predictable, in control? | Response time, feedback, undo, no surprises, motion that explains |
| **Reflective** (afterwards) | What does using it say about me? Would I tell someone? | Brand values visible, shareable achievements, identity ("this gets me"), a story |

## Delight: deep before surface (NN/g)

- **Deep delight** = flow. Needs anticipated, friction gone. Remembered addresses,
  smart defaults, instant search, forgiving input, zero-config start. This drives
  retention.
- **Surface delight** = momentary. Animation, illustration, witty copy, easter eggs.
  Fragile; annoying on the 50th repeat. Must be brief, skippable, non-blocking.
- Recommend deep delight first. For surface delight, name the *exact moment* it goes
  (first project created, payment success, streak milestone) — not "add more delight".

## Emotional journey map (do this per core flow)

For each core flow, walk it and write one line per step:
`step → what the user feels (anxious / confused / bored / confident / proud) → why`.

Then mark:
- **The peak** (best or worst moment). Is the worst moment softened? Is there a
  positive peak at all?
- **The end**. What is the last thing they see? Confirmation, receipt, logout,
  cancellation, empty state after deleting. A flat "Success." is a wasted end.
- **Anxiety spikes**: payment, sharing personal data, irreversible actions, waiting
  with no info, errors. Each needs an explicit reducer (below).

Peak-end (Kahneman): fix the worst moment and design the ending — those two shape
memory more than the average of everything else.

**Peak-end playbook** (Gabe):
1. Exactly **one** designed peak per core flow — after the core task, at a milestone, or
   at the highest-effort step. Several peaks = none.
2. The peak shows personalized value ("made for me"): a plan built in front of the user,
   or tags explaining why this pick fits them at the decision moment (Airbnb, Ahead).
3. Design the end separately: completion cue (check, summary card, haptic) + reaffirmed
   progress + one next step. An optional polite reciprocal action (rate, tip, share) is
   fine if skippable (Uber).
4. The return nudge is gentle and value-framed ("See you tomorrow"), never guilt.
5. **Vacuum pass**: every wait screen, error and long form gets care — reassuring
   microcopy, help offered before it's asked for, waits used productively. Negative
   moments are remembered as strongly as peaks.

## Anxiety reducers

- **Errors** — keep input, say exactly what to do, never blame, no codes up front.
- **Payments** — order summary visible throughout; total cost (incl. shipping/tax)
  before the card form (48% of abandoners cite extra costs, Baymard); state when the
  card is charged; security cue next to card fields (~25% abandon over card trust);
  confirmation number + email receipt.
- **Waits** — say what's happening and how long. See motion.md for thresholds.
- **Destructive actions** — undo beats confirm dialogs (users click through confirms
  on autopilot). If confirm, name the consequence: "Delete 3 files".
- **Commitment** — free trial: say when it ends and remind before charging.

## Trust signals

Real contact info; visible pricing; reviews including negative ones; return/privacy
policy near the CTA; guest checkout (26% abandon when forced to register); current,
polished visuals (Stanford Web Credibility: polish strongly drives credibility); no
stock-photo-only humans; consistent brand across every screen and email.

**Goodwill ledger** (Krug) — drainers: hidden support contact, hidden prices or
shipping, format punishment, unneeded data asked, puffery, amateur visuals, broken
things. Fillers: total cost up front, a FAQ answering real questions,
printable/exportable records, an apology when you can't help. Net the ledger per core
flow.

## Celebration and success states

- Mark meaningful milestones only: first project, first payment received, goal hit,
  streak milestone. Not every save.
- Proportionate and brief (< ~1–2s), skippable, honours `prefers-reduced-motion`.
- Always pair with a clear next step — the celebration is the "end" of one loop and
  the trigger of the next.
- Size by **consequence to the user** (a match or first sale can be full-screen), not
  by effort. Big wins should be screenshot-worthy with a share action; ask for ratings
  or referrals right after them, never after errors. Full gift sequence:
  `engagement-retention.md` → Reward moments.

## Character, polish and positioning (Gabe)

- **Emotion is the moat** once building is a commodity: how people feel when they close
  the app is what makes them talk about it. Efficiency-only apps get used, never bonded
  with. Digital has no tone of voice or body language — the relationship must be designed.
- **Mascots must react**: expressions for right/wrong/idle, encouragement after errors,
  idle animation so it feels alive (Duolingo's 2022 character system, Phantom's ghost).
  A static mascot is wasted personality. Never mocks loss.
- **Core-surface personality beats edge decoration**: if the main screen is still a raw
  table, a mascot on the loading screen is decoration. Can the core data lead with a
  human, interpreted headline (Carrot Weather)? Put personality where users are daily.
- **Polish is trust in scary domains** (money, crypto, health, insurance): every
  micro-interaction is a trust signal and jank reads as risk. Warm, friendly visuals
  lower intimidation; never assume the user knows the domain's rules.
- **Feel tracks positioning**: a premium price needs premium craft (Revolut: rich first
  run, scrubbable glowing charts, a 3D card that catches light).
- **Emotional anchoring**: colour, motion and sound set the intended mood before the
  core task (Headspace slows you down on open).
- **Spend emotion where it pays**: pick the 2–3 moments where emotional design moves a
  business metric and concentrate there rather than everywhere.

## Personality and voice

NN/g tone dimensions: funny↔serious, formal↔casual, respectful↔irreverent,
enthusiastic↔matter-of-fact.
- **Voice** must be consistent across screens, emails, notifications, errors.
- **Tone** must adapt: playful in empty states and success; calm and plain in errors,
  payments, data loss, security. Never a joke where the user just lost something.
- Typeface, color, motion style and illustration must tell the same personality as
  the words (see visual-design.md, typeface signals).

## Engagement and retention

Load `engagement-retention.md` for activation, onboarding paradox, reward moments
(gift vs receipt), progression, streaks, social comparison, investment, AI surfaces,
win mapping and paywalls. Engagement ideas only count after the ethics gate below.

## Ethics gate: dark patterns (always flag, P1)

Deceptive or illegal patterns below are findings. Truthful persuasion (loss-framed but
accurate streaks, leagues, a mascot's voice, free chance rewards) is judged with
`black-ux.md` §5 and can be recommended in the report's Black tier.

Every pattern below is **P1** when confirmed. **Judgment items are P2**, outside the
gate:
- a coercive free tier;
- generic "we miss you" pushes;
- gaps on the streak checklist;
- default-global leaderboards.

Eyal's test: would you use it yourself, and does it materially improve users' lives?
If not, it's manipulation. Flag any of these (Brignull / deceptive.design, FTC, EU DSA):

- **Obstruction** — roach motel; cancel harder than sign-up.
- **Forced continuity** — silent trial-to-paid.
- **Hidden costs / drip pricing** — fees revealed at the last step.
- **Sneak into basket**, **preselection**, pre-ticked opt-ins.
- **Confirmshaming** — "No thanks, I hate saving money".
- **Fake urgency / fake scarcity** — countdowns that reset, "Only 2 left!" that isn't true.
- **Trick questions** — double negatives.
- **Visual interference** — "decline" as a faint ghost link, "accept" as a big button.
- **Disguised ads**, **nagging**, **friend spam**, **privacy zuckering**.
- **Cookie walls** without an equally prominent "Reject all".
- **Currency obfuscation ("anti-calculator")** — variable per-item coin prices, awkward
  bundle ratios, no running spend total, prices rising the deeper you go.
- **Obligation and shame mechanics** (an emotional appeal on an exit is P2 when the stated loss is
  true, the decline is neutral and leaving takes ≤ 2 taps; see `reward.md` §7) — streaks with no pause or exit, banked progress
  destroyed on a missed day ("visually disappointing" loss), guilt pushes, red-number
  shaming, public status that makes quitting a public admission.
- **Hidden outcome manipulation** — rigging results (e.g. keeping users near a 50% win
  rate) while presenting them as fair.
- **Celebration tied to risky or money actions** — Robinhood's trade confetti was removed
  and fined $7.5M (Massachusetts, 2024). Never reward frequency of trading, betting,
  spending or health-risky behaviour.
- **Coercive free tier** (judgment, P2) — friction made deliberately unpleasant to force
  payment (an ad longer than the content).
- **Fake reference prices** — strike-through anchors that were never the real price
  (EU Omnibus: show the lowest price of the prior 30 days).
- **Fake activity / social proof** — "12 people viewing", "bought 3 min ago",
  testimonials of uncertain origin.
- **Pressured selling** — pricier option preselected or pushed on the path.
- **Fake progress** — endowed progress or progress bars not backed by real completed
  steps. Loss-framed dismiss copy ("I'll risk it") is confirmshaming.

- **Reward manipulation** — near-misses, losses celebrated as wins, celebrating
  spending, paid randomness, removed stopping cues, credits hiding money, speed-ups on
  money: run the R1–R12 tests in `reward.md` §7.

**Verify, don't assume**: reload — does the countdown reset? Compare two sessions — do
stock and viewer counts change honestly? Check the network log for urgency/social-proof
widget vendors (~11% of 11K shops ran them, more on popular sites — Mathur 2019). A
fake-urgency finding without one of these tests is UNCERTAIN, not CONFIRMED. **Mild
patterns are not lower severity**: in a 1,963-person RCT they more than doubled
acceptance of a dubious paid plan (11.3% → 25.4%) with no backlash; aggressive ones
reached 37.2% (Luguri & Strahilevitz 2021).

These carry legal risk (FTC: $2.5B Amazon Prime settlement, Sept 2025; EU DSA Art. 25)
as well as trust cost. Recommend the honest alternative, not just removal.

## Delight guardrails (borrowed from impeccable `delight`)

- Write a one-sentence **delight thesis** for the product before suggesting any
  delight ("Finishing a workout should feel like a high-five from a coach").
- Size the celebration to the effort and consequence of the action.
- Never fake progress or fake loading to seem busy/smart.
- No jokes about loss, money, privacy or health.
- It must still feel good on the 100th use — otherwise make it first-time-only.
- **Mode split**: Persuade/Experience surfaces (landing, onboarding, games, social) can
  carry personality throughout. Operate/Read surfaces (dashboards, editors, settings)
  keep delight for first use, completion, and recovery only.

## Emotional score anchors (/10)

Score each, with one line of evidence:

| Dimension | 0 | 5 | 10 |
|-----------|---|---|---|
| First impression (visceral) | Broken/amateur, distrust in 5s | Clean but generic template | Distinctive, polished, instantly trustworthy |
| Feel in use (behavioral) | Laggy, surprising, no feedback | Works, some dead taps or waits | Instant, predictable, every action acknowledged |
| Anxiety handling | High-stakes steps unexplained, errors blame | Basic confirmations | Every high-stakes step reassures; errors guide |
| Peak & end | Worst moment unaddressed, flat endings | Endings exist but are bland | Designed positive peak; endings celebrate + point onward |
| Personality coherence | Copy, type, color, motion disagree | Consistent but bland | One clear, fitting personality across every surface |
| Reward moments | Receipts only — results land flat | Celebration but no anticipation or afterglow | Gift sequence on key moments, ethically scoped, share-ready |
| Ethical engagement | Dark patterns present | Neutral | Habit loops that serve the user, easy exit, honest |
