# What good UI/UX is, according to Tim Gabe (@timgabe)

Research from 38 transcripts (≈65k words) of his principle-focused videos — the most
viewed UI craft videos plus the full "addictive apps" / retention / teardown series.
Skipped: pure Figma/Framer tool tutorials. Six videos were blocked by YouTube rate
limits (8pt grid, UI skill in the AI era, Irresistible Apps, Retention 101, Twisted
Psychology, Second Visit). Numbers are his practitioner defaults and the studies he
cites — treat them as strong starting points, not laws.

---

## 1. His core philosophy

1. **Emotion is the moat.** Building is a commodity now (APIs, no-code, AI). Being
   useful is table stakes; what makes an app take off is how people feel when they close
   it. Efficiency-only apps get used but never bonded with — and get replaced.
2. **Foundation → interface → emotion, in that order.** His 3-layer model: get the core
   task fast first, then use the interface as a "trust badge" (judged in ~50ms), then
   integrate emotion. Layers 1–2 get you into the top 10%; layer 3 makes the outliers.
3. **Seniority = subtraction.** Every level-up he shows is a removal: fewer fonts,
   sizes, weights, colours, words, CTAs, steps. Art direction is deciding what to remove.
4. **One governing idea.** Great apps commit to a point of view ("gentle awakening")
   that every screen serves. Mixing every reference you like ("Frankenstein") scores
   *worse* than doing nothing.
5. **Psychology over features.** Hick, Fitts, Zeigarnik, peak-end, loss aversion,
   social comparison, variable reward — he treats these as design levers, not trivia.
6. **Borrow what's proven.** Copy structure (section layouts, type ramps) from sites
   that already work; never copy style.

## 2. Visual craft — the concrete rules

**Typography**
- One font family is enough (two max). Safe picks: Inter, DM Sans, Montserrat, Poppins;
  serif: Merriweather, Lora, Source Serif.
- Per screen: ≤ 4 sizes and ≤ 2 weights. Six sizes / four weights = fail.
- Line height: headings 1.1–1.3, body 1.3–1.5. Tracking −1 to −2% on headings only.
- Body 18px on landing pages, ~20px for long reading; ~600px max text width (50–75 chars).
- Never mix alignment in one block; centre only headings and ≤ 3-line chunks.
- The same font looks premium or broken depending only on line-height, weight and
  tracking — tune all three, or copy a proven ramp from a great site.

**Spacing — "relationship advice"**
- 8pt grid; every value divisible by 4 or 8.
- Related things sit 1× apart, unrelated 2×: heading→its body 16, previous block→heading
  32; text group 24 → buttons 48.
- Landing pages: section padding ≥ 120–160px, text↔image 80–96px, card padding ~32px.
- Hold the grid, then break it 1–3 times on purpose (full-bleed carousel, logo marquee)
  — a "wave" rhythm. Uniform gaps everywhere look undesigned.

**Colour**
- 60-30-10, or 3 roles: base, primary, neutral text.
- The strongest colour goes only on the primary CTA (or one emphasised word).
  Overused accent = stressful; underused = dull.
- One hue + tints. Secondary buttons / highlighted cards = primary at ~5%.
- Text hierarchy via neutral opacity (~80% large, 60–70% small) — re-check contrast.

**Detail ("the last 20%")**
- Primary button: 1px white top inner shadow + soft drop shadow; secondary: 5% primary
  border; cards reuse it. At most one soft glow behind the hero.
- Reuse one visual motif to link related parts of the UI.
- One illustration style, one stroke icon set; never mix photos with flat illustrations.

**His 5-axis screen review:** copy · visuals · colour · fonts · spacing — pass/half/fail.

## 3. Emotional design — his frameworks

**Gift, not receipt** (reward moments). A receipt says "Congratulations" flatly. A gift
has three stages: *anticipation* (tap to open, card flips) → *reveal with weight*
(visual + haptic + sound; multiple items revealed one at a time; rare ones look
different) → *afterglow* (share card, badge, next goal). Spotify Wrapped is a ceremony;
its copies are reports. Find your most transactional moment and give it weight.

**Peak-end playbook.** Map the journey → pick exactly ONE peak (after the core task, a
milestone or the hardest step) that shows personalized value → design the ending
separately (celebrate, reaffirm progress, one next step) → gentle return nudge, never
guilt → "vacuum pass" over waits, errors and long forms.

**Polish is trust.** In money, crypto and health apps every micro-interaction is a
trust signal (Phantom, Revolut). Premium price needs premium craft: scrubbable glowing
charts, a 3D card that catches light.

**Characters must react.** Duolingo's mascot has expressions, lip-sync and idle
animation; a static mascot is wasted. Put personality on the core surface (Carrot
Weather's reacting headline), not just the splash screen.

**Live feedback.** Waits should show the system is alive (Perplexity's reactive dots).

## 4. Retention and engagement

- **Day 0 is everything**: 77% of users gone in 3 days; 82–89% of subscriptions start
  on install day. Value within 60 seconds. Ask: what's waiting for them on day 2?
- **Onboarding paradox**: shortest path by default (Granola: 2 screens). Long quizzes
  (Cal AI, Noom) only work if they visibly personalize the first screen or filter buyers.
- **Decision-point count**: Netflix has ~6 choices before you watch, RealShort 0. Each
  unnecessary choice is an exit ramp. Mine workarounds (Skip Intro: 136M presses/day).
- **Gamification**: points/badges/leaderboards are the scoreboard, not the game. 3+
  stacked mechanics reverses engagement (S-curve). Each mechanic must show real skill
  gain (competence test). One master progress measure beats 20 badges.
- **Streaks** turn from "want to" into obligation after ~30 days: give goal choice,
  freezes, an off switch, and never destroy banked value.
- **Leaderboards**: shrink the cohort until the median user can win; show the
  comparison at the moment of completion; add human recognition (Peloton callouts).
- **Investment**: every session should make the product better *for this user*
  ("1,095 nights tracked"). Put AI inside familiar surfaces (Discover Weekly = a
  playlist), not a separate AI mode.
- **Win mapping**: ask for ratings, shares and upgrades right after wins, never after
  errors. Make win screens screenshot-worthy; celebrate identity ("night owl"), not counts.
- **Paywalls**: a trust screen. Exact charge date, "No payment due now", day-by-day
  trial timeline (Blinkist: +23% conversion, −55% complaints). One-tap trial. Structure
  beats price. Gate at depth (Busuu's second language), never the beginner's first need.
- **Landing pages**: one CTA (1 CTA 13.5% vs 3 CTAs 10.5% conversion), outcome over
  specs, a fast-scroll test per section (what / why / what next), show real product output.

## 5. Where I'd push back

He openly says manipulative mechanics are "your call" and praises some (rigged win
rates, loss-framed progress made "visually disappointing", guilt, slot-machine reveals,
a deliberately annoying free tier). The skill keeps a hard ethics gate instead: these
are flagged as findings, alongside things he himself criticizes (RealShort's hidden
coin pricing, Robinhood's trade confetti — fined $7.5M). Use his mechanics only where
the behaviour they reinforce is good for the user.

A few of his Figma demo timings (800ms page transitions, 300ms ease-in hovers) conflict
with platform motion guidance; the skill keeps 200–500ms and ease-out.

## 6. What changed in the ux-audit skill

- New `landing-pages.md` and `engagement-retention.md` reference files.
- Sharper rules in typography, spacing, colour, motion, microcopy and onboarding.
- A **Direction score** (/15): Point of View, Consistency, Execution.
- A **purpose-vs-completion** test, a competitor benchmark step, and engagement
  ideas that must name their engine and the business metric they move.
- New dark patterns: currency obfuscation, obligation/shame streaks, rigged outcomes,
  celebration tied to risky actions, coercive free tiers.
