# Reward layer: small wins that feel good, honestly (the "dopamine pass")

How Duolingo, Revolut, Apple and the best games make each action pay back, what the
evidence says about why it works, and where it turns into manipulation. Used by
`experience-director` step 2c and by `mockup-maker`. Sources and full evidence:
`research/dopamine/` (`neuroscience.md`, `apps-in-practice.md`, `sensory-feedback.md`,
`casino-psychology.md`, `ethics-regulation.md`).

Tags: **[PR]** peer-reviewed · **[S]** platform or company-stated · **[O]** observed ·
**[REG]** law or regulator · **[BK]** academic book · **[H]** heuristic or our starting value. Company results are
self-reported relative lifts.

**Language rule.** No study has measured dopamine release while someone uses an app
(the one PET study, Westbrook 2021, N = 22, is correlational). In reports, describe
effects as behaviour ("feels caused by the tap", "raises repeat completion"), never as
"a dopamine hit".

## 1. What the evidence says (the facts every rule below rests on)

1. **Surprise drives the signal, not the reward.** Dopamine bursts code "better than
   expected"; a fully predicted reward gives about zero (Schultz 1997/2016) [PR]. So an
   identical reward every time fades, and the biggest moment belongs to what the user
   couldn't fully predict: a first, a personal best, a milestone.
2. **Anticipation is where the action is.** With learning, the response moves from the
   reward to the cue before it ("wanting", Berridge & Robinson) [PR]. A short build-up
   (a balance rolling, a bar filling, a 3-tap reveal) is part of the reward.
3. **Uncertainty adds pull and is the casino lever.** The anticipatory signal peaks at a
   50% chance (Fiorillo 2003) [PR]. Honest uncertainty (will the courier be early?) is
   fine; engineered or paid uncertainty is the red line (§7).
4. **Speed makes it feel caused by me.** On a virtual button, feedback reads as
   simultaneous at 5–50 ms (haptic), 20–70 ms (sound), 30–85 ms (visual); quality drops
   above ~70–100 ms (haptic, sound) and ~100–150 ms (visual) (Kaaresoja et al. 2014)
   [PR]. Beyond ~2 s without a cue, people stop linking outcome to action (Shanks 1989
   via Buehner & May 2003) [PR, medium]. A visible "it's coming" cue bridges a delay.
5. **Progress with an honest head start.** 2 of 10 stamps pre-filled: 34% completion vs
   19% for a blank 8-stamp card (Nunes & Drèze 2006) [PR]; people speed up near the goal
   (Kivetz 2006) [PR]. A bar that moves slowly early on *increases* drop-off (Villar 2013,
   32 experiments) [PR].
6. **Competence feedback beats prizes.** Expected tangible rewards lower intrinsic
   motivation (d ≈ −0.3 to −0.4); informational positive feedback raises it (d ≈ +0.33)
   (Deci, Koestner & Ryan 1999, 128 studies) [PR]. Over a third of feedback
   interventions lower performance, especially self-focused praise (Kluger & DeNisi 1996)
   [PR]. Duolingo: growth-mindset coaching +7.2% D14 vs plain praise [S].
7. **Juice is an inverted U.** None and extreme both lose to medium/high (Kao 2020,
   N = 3,018) [PR]. Feedback contingent on success raises motivation; amplified feedback
   lowers it (Kao et al. CHI 2024, N = 1,699, pre-registered) [PR]. Players rate juicy
   versions higher yet perform worse (Juul & Begy 2016) [PR].
8. **Repetition kills it; variety and breaks restore it.** Habituation (Rankin 2009) [PR];
   gamification effects drop after ~4 weeks and partly recover (Rodrigues 2022) [PR].
   No study gives a repetition count, so the auditor measures, not assumes.
9. **Forgiving beats flashy for streaks.** Broken streaks lower later engagement, less
   when repairable (Silverman & Barasch 2023, 7 studies) [PR]. Duolingo: one lesson
   instead of an XP goal, freezes and a weekend amulet helped; the streak animation alone
   +1.7% D7 for new learners [S]. Lowering the bar to one exercise did not lift DAU [S].
10. **Cheap beats elaborate.** Duolingo's app-icon red dot: +6% DAU, ~20 min of work;
    leaderboards +17% learning time; streak wager +14% D7 [S]. Clash Royale removed chest
    timers in 2025 for instant post-battle drops [S]: remove the wait before a reward.
11. **Celebrating money actions backfires.** Massachusetts v Robinhood: $7.5M (2024),
    order bars celebration tied to trading frequency [REG]. Gamification raised trading
    ~5% in an RCT and attracted lower-literacy users (Chapkovski et al. 2024) [PR].
    Calm reassurance for money; celebration for the user's own goals.

## 2. The five ingredients (check every repeated action and every result moment)

| # | Ingredient | Pass when | Evidence |
|---|---|---|---|
| 1 | **Instant acknowledgement** | visual change ≤ 85 ms (aim ≤ 50), haptic ≤ 50 ms, sound ≤ 70 ms after the tap; main beat done ≤ ~1 s; anything slower shows a cue at once | §1.4 |
| 2 | **Sensory hit in sync, sized by tier** | motion + haptic (+ optional sound) fire in the same frame; haptic never trails the visual by > ~50 ms; sound may lead by ≤ ~40 ms (ITU-R BT.1359: detectable at +45 / −125 ms) | sensory §4.4 [S][H] |
| 3 | **Visible progress** | the user sees how far they are and the step they just made; honest head start for steps really done; fast-then-slow, never slow-then-fast | §1.5 |
| 4 | **Next reward named** | the next concrete thing is in view: "3 orders to a free tiramisu", "2 lessons to day 7" | goal gradient §1.5 |
| 5 | **Earned surprise** | now and then something better than expected, free and earned (a first, a personal best, a hidden milestone); form varies, meaning stays fixed | §1.1, §1.8 |

Plus **informational copy**: say what improved ("3 in a row", "ready 4 min faster than
last time"), not generic praise (§1.6).

## 3. Intensity ladder: size by consequence and frequency

The more often a reward fires, the smaller it is (Apple, Android, Material [S]; every
cross-app winner [S/O]).

| Tier | When | Visual | Haptic iOS / Android | Sound |
|---|---|---|---|---|
| 0 Acknowledge | every tap | pressed state ≤ 85 ms, 100 ms scale/opacity | none (system controls add their own) | none |
| 1 Confirm | routine success: added, saved, toggled | check or colour change 150–250 ms | `.selection` / impact `.light` · `CONFIRM`, `TOGGLE_ON`, `SEGMENT_TICK` | none by default |
| 2 Reward | earned step: correct answer, stamp, stage reached | fill or spring 300–500 ms + small accent | `.success` · `CONFIRM` | optional short rising 2-note earcon |
| 3 Celebrate | session or goal complete | full-screen moment ≤ 1–2 s, skippable, ends on the next step | `.success` (+ optional Core Haptics rise) · `CONFIRM` or Composition `QUICK_RISE`→`CLICK` | optional hero sound |
| 4 Milestone | rare: first-ever, streak 7/30/100 | tier 3 + unique art or copy | a custom pattern used **only** here | unique hero sound |
| Money | payment, transfer, top-up, trade | calm check drawn ~300–400 ms, amount, what happens next | `.success` · `CONFIRM` | at most a short confirm chime |

Tier values are starting values built from platform tokens [S] + [H], not measurements of
any named app. Never: confetti or win sounds on money going out (§7).

## 4. Spec table (web + native)

| Reward | Motion | iOS | Android | Web | Reduced motion |
|---|---|---|---|---|---|
| Tap acknowledge | scale .97 / opacity, 100 ms `cubic-bezier(0.2,0,0,1)` (M3 short2) [S] | — | — | `:active` + `pointerdown` | opacity only |
| Correct / step success | colour + check 200–300 ms; spring M3 expressive fast (damping 0.6 / stiffness 800) or SwiftUI `.snappy` [S] | `UINotificationFeedbackGenerator .success` | `HapticFeedbackConstants.CONFIRM` (API 30) / Compose `Confirm` | `navigator.vibrate(15)` Android Chrome only [H]; Web Audio after first gesture | crossfade ≤ 150 ms; keep haptic + sound |
| Error | no punishment; inline text; spring back to origin ~250 ms [H] | `.error` | `REJECT` | `vibrate([15,60,15])` [H] | no movement; colour + icon + text |
| Progress fill | spring, never linear: SwiftUI `.smooth` 0.5 s or M3 standard (0.9 / 700) [S] | `.selection` per discrete step, sparingly; `.success` on completion | `SEGMENT_TICK` per step; `CONFIRM` on completion | `transition: width 300–500ms cubic-bezier(0.2,0,0,1)` | jump + brief highlight |
| Number / balance roll | `.contentTransition(.numericText(value:))` (iOS 17) / `AnimatedContent`; 300–600 ms ease-out [H] | none or `.impact(.light)` at the end | none or `CONFIRM` at the end | rAF tween, `tabular-nums`, `aria-live="polite"` on the final value | final value at once |
| Money success | circle → check stroke ~300–400 ms, hold [H] | `.success` | `CONFIRM` | SVG `stroke-dashoffset` | static check fades in ≤ 150 ms |
| Goal complete | ≤ 1–2 s, skippable; confetti ≤ 1 s (canvas-confetti defaults: 50 particles, spread 45) [S] | `.success` | `CONFIRM` | canvas-confetti with **`disableForReducedMotion: true`** (default is false) | static badge fades in; keep haptic + sound |

**Platform rules** [S]:
- iOS: call `prepare()` on the generator *before* the event; use each haptic only for
  its documented meaning; haptics optional.
- Android: `performHapticFeedback` (no permission, respects user setting); "less is
  more"; a buzzy vibration is worse than none; key-click 10–20 ms; avoid
  `createOneShot` for feedback.
- **No web haptics on iPhone:** Safari never shipped the Vibration API; Firefox removed
  it in v129. The hidden `<input type="checkbox" switch>` trick is fragile; never make it
  load-bearing [S/O].
- **Sound is a bonus layer, never the only channel.** iOS: `AVAudioSession` category
  `.ambient` (honours the silent switch). Android: `USAGE_ASSISTANCE_SONIFICATION`, play
  only in normal ringer mode [H]. Web: resume `AudioContext` inside the first tap. Offer a
  sound toggle; most people use phones muted (69% watch video sound-off in public [H]).
  Repeated sounds vary slightly in timbre; rising = positive, falling = ending
  (Material 2) [S].
- **Accessibility:** reduced motion swaps movement for fades and keeps the haptic, sound
  and end state (Apple) [S]; WCAG 2.3.3 (AAA) reduced motion, 2.3.1 (A) ≤ 3 flashes per
  second. A celebration never stands between the user and the next action; let people
  skip it.

## 5. Density, the 100th use, and pacing

- **Reward density** = tier ≥ 1 beats per run of the core loop, plus the longest stretch
  (seconds) with none. Measure it from recordings of this product and, where reachable,
  of the benchmark app. **There is no published optimal number**; never quote one for an
  app you didn't record. Judge against the inverted U: long dead stretches in the core
  loop = too little; a celebration on every routine action, or one that delays the next
  action, = too much.
- **100th use:** would it still feel good on the 100th repeat? Routine actions stay at
  tier 0–1. Vary copy and art within a tier, keep haptic and sound meaning fixed (Apple
  consistency) [S]. Plan variety for the ~4-week novelty dip (§1.8).
- **Floors, not stretches:** the daily or weekly goal is the minimum a busy user hits;
  the stretch is separate and optional (Duolingo, Apple rings) [S].
- **Forgiveness built in:** freeze or repair from day 1, "your streak was protected",
  hide-the-streak option in sensitive domains [PR][S].
- **Remove the wait before a reward**, or fill it with visible progress (§1.10).
- **Natural stopping points:** "done for today", "all caught up". Breaks restore
  enjoyment, and regulators ask for stopping cues (§7) [PR, medium][REG].

## 6. Borrow from games and casinos, honestly

| Psychology | Casino / game origin | Honest app version | Food example | Fintech example |
|---|---|---|---|---|
| Contingent instant feedback | result right after each spin | tier 0–2 on every action | "added" pulse + light haptic | "sent" check + amount |
| Anticipation before a reveal | reel spin, chest | short build-up before an outcome that is **real and not bought** | ETA narrowing as the courier nears | month-end "you saved €X" reveal |
| Proportional celebration | win jingle | celebrate only net-positive outcomes the user earned, scaled to size | the 10th order's free dish | savings goal hit |
| Visible progress | bonus meter, collect-a-set | deterministic progress to a stated goal | stamp card 7/10 | "emergency fund 60%" |
| Earned, transparent bonus | free spins, comps | rules stated up front, earned by real value | "free delivery after 3 orders this month" | cashback rate shown before purchase |
| Sense of control | stop button (illusory) | **real** choices with visible effect | build-your-own bowl preview | pick a round-up rule, see its effect |
| Honest closure | GB net-position display | a period summary that ends the loop | "Delivered: rate & done" | "This month: in €X, out €Y" |

A 3-tap reveal of a **fixed, earned** reward is fine (benchmark-apps §3.13). Choice
raises perceived value (Langer 1975: a chosen ticket priced ~4× an assigned one) [PR]:
use it only where the choice is real.

## 7. Red lines (the ethics gate's reward tests)

**Green:** celebrates the user's own chosen goal; informational; opt-out; forgiving;
has a stopping point. **Amber (needs its safeguard):** free mystery rewards (odds
shown, no purchase, no minors), streaks tied to ordering (freeze, never punish not
spending), points (money value always beside them), one-tap reorder (total + undo),
personalised offers (exclude at-risk signals), badges and leaderboards (small cohorts,
opt-in), engagement pushes (quiet hours, user's goal). **Red:** below.

| # | Red pattern | Test (record screen + network; pass/fail with evidence) | Basis |
|---|---|---|---|
| R1 | **Near-miss engineering** | ≥ 50 reveals across test accounts; "almost" stops vs segment share; losing copy "so close" | Reid 1986; Clark 2009 [PR] |
| R2 | **Loss disguised as a win** | for every celebration compute the user's net value (discount − added fees; reward − required spend); fail if ≤ 0 | Dixon 2010/2014 [PR]; UKGC RTS 14F [REG] |
| R3 | **Celebrating spending** | effects on checkout, top-up, deposit, trade: anything beyond a calm confirmation | MA v Robinhood 2024 [REG]; Chapkovski 2024 [PR] |
| R4 | **Paid randomness** | trace every random reward to its trigger; fail if bought directly or via bought currency, or odds hidden | Zendle & Cairns 2018 (r ≈ .26–.27 with problem gambling) [PR]; Belgium, Brazil [REG] |
| R5 | **Removed stopping cues** | auto-reorder without fresh confirmation; no spend/time summary; offers fired on exit; endless feed with no end state | Schüll 2012 [BK]; UKGC autoplay ban; EU DSA TikTok/Meta preliminary findings 2026 [REG] |
| R6 | **Credits hide money** | taps and arithmetic to learn the money value; bundles vs prices; fail if no money value beside balances | Raghubir & Srivastava 2008 [PR]; Brignull "currency confusion" |
| R7 | **Speed-ups on money** | seconds and taps intent → irreversible money action; skippable review; countdowns on payment | UKGC 2.5 s spin, turbo ban [REG] |
| R8 | **Fake control over chance** | network log: result arrives before the user's "stop" tap | Langer 1975; Ladouceur 2005 [PR] |
| R9 | **Sticky exits** | steps out vs steps in; bonuses to cancel a withdrawal or cancellation | UKGC RTS 14 [REG]; FTC Amazon $2.5B [REG] |
| R10 | **Forced gamification** | is the core service gated behind a game, spin or draw? prize terms visible before play? (a missing skip on a pledge or goal screen after value is delivered is a usability P2, not R10) | EU CPC v Temu 2024 [REG] |
| R11 | **Opaque bonus conditions** | spend needed to unlock vs bonus; > 10× or not stated up front | UKGC 10× wagering cap [REG] |
| R12 | **Loss-framed guilt** | streak copy, mascot nags, "you'll lose everything" pushes | Brignull confirmshaming; ICO Children's Code std 5 [REG] |

**Severity:** a confirmed red pattern is **P1** (ethics gate); **P0** when it makes users
lose money they didn't intend (R2/R11 in a payment flow) or targets minors in a money
flow. Without the test run, it is UNCERTAIN.
**R12 on an exit** (a sad mascot, "Wait, don't go!"): **P2** when the stated loss is true and
proportionate, the decline label is neutral and leaving takes ≤ 2 taps; **P1** when the loss is
false or inflated, the decline label shames, the guilt reaches outside the session (pushes,
emails), or it stands in front of money, cancelling or data. Loss-framed but inaccurate copy with
nothing at stake (a streak "will reset" while a freeze is equipped) is a P2 content finding.

**Minors** (any product children plausibly use): streaks, autoplay, algorithmic feeds,
night pushes and visible like counts **off by default**; no reward loops for time spent
(EU DSA Art. 28 guidelines 2025, ICO std 5, NY SAFE for Kids, CA SB 976) [REG].

**Marketplaces:** also run M1–M12 in `marketplace.md` §4 (fees, sponsored ranking, review
provenance and gating, blind reveal, badges, guarantees, off-platform, scams, disputes, provider
credits and pressure).

**Legal-but-contested persuasion** (truthful loss framing, guilt-tinged mascot voice, wagers,
leagues, free chance rewards) is not a red line: see `black-ux.md` for when to recommend it.

**Reflection test** (stronger than Eyal's self-test): would the user, seeing exactly how
the mechanic works, still want it? (Allcott et al. 2022: ~31% of social-media use comes
from self-control problems) [PR].

## 8. Measuring it (method, so the numbers hold up)

- **Sound and vibration:** log them in the page with timestamps on the same clock as your actions
  (`performance.now()`), injected before load:
  ```js
  await page.evaluateOnNewDocument(() => { window.__fx = []; const log = (k, s) => __fx.push({ t: Math.round(performance.now()), k, s: String(s || "").slice(-60) });
    const play = HTMLMediaElement.prototype.play; HTMLMediaElement.prototype.play = function () { log("media", this.currentSrc); return play.apply(this, arguments); };
    const start = AudioBufferSourceNode.prototype.start; AudioBufferSourceNode.prototype.start = function () { log("webaudio", this.buffer?.duration); return start.apply(this, arguments); };
    if (navigator.vibrate) { const v = navigator.vibrate.bind(navigator); navigator.vibrate = (p) => { log("vibrate", JSON.stringify(p)); return v(p); }; } });
  ```
  **Attribution rule:** a sound or haptic belongs to an action only if it fires after that action
  and **before the next one**. A sound logged on the tap that leaves a screen is the next screen's,
  not this one's (a Duolingo combo screen was once credited with the next prompt's voice).
- **Visual acknowledgement:** `capture-motion.mjs` (colour-aware change detection); on a deep state,
  `recordOnPage(page, …)` from the same script records on your live page without reloading.
- Report the method and n next to every number; headless timings exclude device audio latency.

## 9. Observed values (benchmarks recorded by this skill, not quoted)

| App · surface · date | Value | n / method |
|---|---|---|
| Duolingo web, lesson · 2026-10-08 | CHECK → answer colour 27–29 ms; feedback sound 14–15 ms; word audio on choice tap 9 ms | n = 21 and n = 30, two independent runs, headless, after release |
| Duolingo web | 25–30 rewarded beats (tier ≥ 1) in a perfect 12-challenge lesson; ≥ 1 tier-2 beat per challenge | 2 runs |
| Duolingo web | the same correct-answer sound on every correct answer (29/29, 40/40); ~10 generic praise lines | 2 runs |
| Duolingo web | "N IN A ROW" from the 2nd correct answer; full-screen combo beats at 5 and 10 in a row, **silent** | 5/5 |
| Duolingo web | first-lesson reward chain 9 taps (4.1 s unskippable Score unlock); later lessons 3–4 taps | 4 guests |
| Duolingo web | 2 free Streak Freezes auto-equipped the second lesson 1 completes; day-1 copy warns anyway | 4/4 guests, API |
| Duolingo web | 0 blank frames in 73 in-lesson transitions; 0 `navigator.vibrate` calls | 1 run |

These are one product on one surface: compare like with like, and record the benchmark yourself when
you can (`ux-audits/2026-10-08-duolingo-web/`).

## 10. Output: the reward map (experience-director step 2c)

```
## Reward layer
Density: <n> rewarded beats per core-loop run (<seconds> run), longest dead stretch <s> s
(benchmark <app>: <n> per run, recorded | not recorded).
| Action / moment | Frequency | Ack now (ms, measured) | Channels now V/H/S | Progress shown | Next reward named | Tier now → target | Red-line tests | Gap → fix (M-xx) |
Red-line results: R1–R12 pass / fail / n/a, each with evidence.
Top 3 missing micro-rewards, each with the §4 spec, web + native snippet, reduced-motion
version and the 100th-use check.
```
