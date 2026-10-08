# Engagement, retention, gamification, monetization UX

Load when the product has repeat use, accounts, gamification, social features, trials,
paywalls or in-app currency. Everything here sits under the ethics gate in
`emotional.md`: a mechanic that converts but works against the user is a finding, not
an opportunity. Most patterns and numbers come from Tim Gabe's app teardowns
(@timgabe) and the studies he cites; treat numbers as context, not thresholds.

## Day 0 is the whole game

- ~77% of app users are gone within 3 days; 82–89% of subscription starts happen on
  install day; 55% of 3-day-trial cancellations happen on day 0.
- Time from launch to first *felt* value: target < 60s (Tinder, Breathwrk, Granola).
  Name the aha event explicitly; count screens and decisions before it.
- **What pulls them into session 2?** A result waiting, a ritual time, an open loop, a
  cohort, a personalized artifact. If nothing is waiting, they won't come back. Check
  all three at the same moment (Fogg 2009 [H]): motivation (a result or value
  waiting), ability (one tap to it), trigger (notification, ritual time, open loop). A
  trigger with nothing waiting is nagging, not retention.

## Onboarding paradox

- Default: the shortest path to tangible value (Granola: sign in → mic → value in your
  next meeting).
- Long onboarding (quiz, 20–100+ screens; Cal AI, Noom) is justified only if it (a)
  visibly personalizes the first screen, or (b) qualifies buyers in a deep-pain niche.
  Test: change the quiz answers — does the first screen change? If not, the quiz is pure
  cost.
- A permission that *is* the value (mic for a recorder, camera for a scanner) may be
  asked immediately; defer all others until value is shown.
- Many steps: a thin progress bar, not "Step 1 of 12", before the first value hit.
- A real first session (a breathing session, a first puzzle with guided hints) beats
  slides. Value-prop slides go in one swipeable screen, not N screens.
- Personalize the environment early (voice, speed, theme, goal level) → ownership.
- Too little guidance is also a failure: core setup should appear within ~5 screens.
- **Reciprocity before the wall**: a usable partial result (score, top issues) shown
  before any sign-up ask; the full result blurred behind "Create an account" = P2. Let
  the user choose or build something (name, palette, first lesson) before the account
  step — that button says "Continue", not "Sign up".
- **Lifecycle home**: home adapts to new (goal setup + trending), returning (today's
  plan) and power users (stats first). Identical home for all three = suggestion.

## Friction audit

- **Decision-point count**: list every choice from cold open to core value (Netflix ~6,
  RealShort 0). Each one that doesn't protect the user from a real mistake is an exit
  ramp → autoplay, swipe-next, smart default.
- **Workaround mining**: where do users repeatedly do something manually (scrub,
  retype, re-filter, copy-paste)? That's the Skip-Intro opportunity (15% were
  fast-forwarding intros → 136M presses/day). Fix 1–3 per audit.
- Key actions within ~3 taps from anywhere they're needed.
- Every feature passes a stated filter (Raycast: faster, less cognitive load, fits the
  keyboard flow) — or it's clutter.

## Hook trace (Eyal) — before judging any mechanic

For each intended habit, one line: external trigger → internal trigger (the emotion it
answers) → minimal action → reward type (tribe / hunt / self) → investment (what is
stored; which future trigger it loads). Any blank = the loop won't close; recommend the
missing link, never "more engagement".

- **Habit-zone gate** — habit mechanics (streaks, daily rewards, XP) only when the core
  action plausibly recurs ≥ weekly. Less frequent products get utility triggers
  (calendar, digest, saved search); gamifying an annual task = finding. Intake: ask what
  % of users hit the team's own "habitual" frequency; < ~5% means habit mechanics are
  premature.
- **Ability scorecard** (Fogg) — score each core action on time, money, physical
  effort, brain cycles, social deviance, non-routine; fix the costliest before adding
  motivation. A non-routine step required on every use = P2.
- **Owned triggers** — push/email opt-in asked only after the first felt reward
  (unless the notification *is* the value); every notification answers a named internal
  trigger and lands one tap from the action. Generic "we miss you" pushes = P2.
- **Variability source** — name it: social/UGC (infinite) vs fixed content (finite,
  decays). Fixed-content products with no social or generative layer get a variability
  recommendation before any new reward.
- **Investment timing** — ask for user work (profile, follow, rate, invite, import)
  right after a variable reward, never before the first; each investment visibly loads
  a future trigger.

## Reward moments: gift, not receipt

Find every moment the product hands the user a result: payout, score, match, report,
milestone, recap, unlock. A **receipt** states it flatly ("Congratulations" modal,
balance changes silently). A **gift** has three stages (Berridge: dopamine tracks
anticipation, not the reward):

1. **Anticipation** — a short, *user-initiated* beat (tap to open, card flips, chest
   shakes). Only where the user opted into a reveal; never on operational flows; never
   fake system latency; always skippable.
2. **Reveal with weight** — visual + haptic (+ sound that respects silent mode).
   Multiple items → reveal one at a time (each resets anticipation). Rare or big results
   look visibly different.
3. **Afterglow** — a beat to enjoy it, then a next step: share card, badge,
   screenshot-able stat, "next milestone in 3 days".

"Given" beats "accessed" (Kahneman/Tversky): recaps and payouts should be unwrapped,
not just viewable. Spotify Wrapped is a ceremony; most copies are reports.
Size the celebration by **consequence to the user** (a match, a first sale → full
screen), not by effort — and never inflate trivial events.

## Progression architecture (decoration vs architecture)

- **One master measure** — one visible cumulative metric (level, lifetime total, rating)
  beats 20 scattered badges.
- **Competence test** — does each mechanic show the user got *better at the real thing*
  (auto-flagged personal records, ELO, readiness, "100 actual rides"), or only that they
  opened the app? Badge theater = P2.
- **S-curve** — count stacked mechanics on one loop (streaks, points, XP, badges,
  challenges, leaderboards). 3+ is likely past the peak: the game buries the real task
  (Habitica). Recommend removing before adding.
- **Engines** — prefer anticipation (staged reveals) and completion (partially filled
  rings, Gestalt closure; Apple rings drove 49.5% behavior change) over loss engines.
- **Predictable core, bounded surprise** — rewards mostly transparent and earnable, with
  occasional unexpected bonuses. Variable rewards on earned in-product content are fine;
  paid randomization or money-adjacent randomness is not.
- **No dead ceiling** — can a committed user "finish" the app? Uncapped lifetime totals,
  seasons that reset rank but keep earned status, next-tier previews.
- **Close next threshold** (Zeigarnik) — the next win is visibly near; ≤ 2–3 open loops
  per screen.

## Streaks

Streaks drift from "want to" into obligation over ~30 days. Checklist:
user-chosen goal level · freeze/repair reachable · rest days · an off switch · not the
only retention lever · no guilt pushes at night · a broken streak never destroys banked
value. Missing items = P2. Streaks aimed at minors, or with paid repair as the only
escape = P1 (regulatory focus: Snapchat litigation 2024, proposed EU Digital Fairness Act).

- Bounded in-session stakes are fine (Forest: your tree dies if you leave *this*
  session). Cumulative, ever-growing loss (a 400-day streak) is where obligation starts.
- **Shame scan**: red overage numbers, broken-streak alarms, "You missed your goal",
  guilt copy. Replace with expected misses + adaptive targets (MacroFactor). Shame also
  corrupts the product's data — users stop logging honestly.

## Social comparison

- A leaderboard without psychology is a glorified list. **Winnability**: shrink the
  cohort until the median user can plausibly win (local, same segment, age band,
  friends). Global board by default = P2.
- Show the comparison **at the moment of completion**, not buried in a tab; keep a hide
  option; global ranking stays opt-in.
- Add recognition of effort (kudos, named callouts, personal records), not just rank.
  Human recognition (Peloton instructors) multiplies any mechanic.
- **Rejection-proof**: hide negative social signals (who declined, seen-not-replied,
  low rank); reveal mutual positives (Tinder double opt-in).
- **Live presence**: online counts, active avatars, reactions ("2,312 online") make a
  space feel alive. Must be real.
- **Shared ritual**: can a solo activity become same-time, same-content with a cohort
  (Ladder)?

## Investment and compounding value

- Does each core action make the product better *for this user* — is a 6-month user
  measurably better served than a 10-day one? Is session 1,000 different from session 10?
- Is the accumulated investment visible ("1,095 nights tracked", "your taste profile")?
- Are deposits automatic (every transaction trains it), not homework (rating chores)?
- Raw user data must be exportable (EU Data Act); learned personalization is a
  legitimate moat. Flag lock-in by withholding the user's own data.
- Does each feature unlock or connect to another, so discovery continues after day 1?

## AI and new tech

- **Trojan horse**: tech inside a familiar surface (a playlist, the search bar, the
  inbox) beats a separate "AI mode" that makes the tech the hero.
- **Primitive reset**: if the tech changes the core action, rebuild the primary action
  around it (Cal AI: camera *is* the home screen; correction is the exception) instead of
  bolting it onto the old flow.
- **Outcome-first**: for repetitive utility steps, ask "does the user need to do this at
  all?" Keep visible UI where privacy or dense comparison matters; let AI work in the
  background there (flag anomalies, predict, nudge).
- Waits during AI work: motion that reacts to the real system state (streaming,
  voice-reactive dots) — see motion.md.

## Asks, sharing, growth loops (win mapping)

- Map the 2–3 biggest wins. Rating, share, referral and upgrade prompts fire right after
  them. Any ask after an error, a wait, a paywall rejection or a confusing step = P2.
- Is the win screen screenshot-worthy (big, branded, personal) with a share action?
- Recaps and milestones celebrate **who the user is** ("a night owl who does their best
  work after 9pm"), not counts ("10 tasks"). Test: would they say "this is so me"?
- Does the product live where users already work (integrations with real actions)?

## Paywalls and trials

- **Trust screen**: shown after the user has felt value; exact charge date and amount;
  "No payment due now" when true; reminder promise; how to cancel; trial as a day-by-day
  timeline (Blinkist: +23% conversion, −55% complaints, churn unchanged).
- Trial start is one tap. Single price beats a range (Uber's certainty effect).
- Paywall copy [H]: headline explains how the trial works, not the feature list; button
  verb "Start" (never "Subscribe"), possessive ("my free trial"), step count beneath
  ("Start in two taps"); hero shows real content, not decorative art.
- Structure beats price: plan count, trial length per plan, localized currency and
  language outrank price tests (weekly-with-trial ≈ 7× the 12-month LTV of weekly
  without). Framing matters ("guest pass" +7%).
- Gate where engagement meets intent (a second language, a power feature), never a
  beginner's first need. Locked items shown in context with a "Pro" label.
- Contextual upsell enhances what the user is doing right now (Boost while matching);
  it never interrupts the core loop.
- Free → paid as a gradient with the gate at a natural peak. A free tier made
  deliberately punitive (an ad longer than the content) = coercive friction, P2.
- In-app currency: flat per-item price? clean exchange ratios? running spend total
  visible? price stable as the user goes deeper? Failing these = "anti-calculator" dark
  pattern, P1.
- Recommend an experiment cadence (top apps run ~15 paywall tests a year) → hand off to
  `paywalls` / `ab-testing`.
