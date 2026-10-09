# Benchmark apps: how the most-used apps make moments feel, and how to transplant it

Load for every Team audit; the `experience-director` lives in this file. It is distilled
from six teardowns in `research/teardowns/` (habit-wellness, games-reward, social-feed,
fintech, platform-craft, food-ordering), which hold the sources and full detail.

**How to read the specs.** Almost no company publishes its animation timings.
- **[S]**: stated by the company or platform (Apple, Material, the app's blog).
- **[O]**: observed (the teardown says how).
- **[H]**: a recommended starting value, **not** a measurement of the app named.

Never present an [H] value as "what Duolingo does". Say "Duolingo-style; start at X".
Every recommendation in a report names: the moment, the benchmark app, the mechanism,
the spec, a web and/or native snippet, and the "never".

---

## 1. Ten laws of pull (what the winners share)

1. **The first screen is the core action.** Snapchat opens on the camera (~40 opens a
   day [S]), TikTok on a playing video, Cash App on the keypad, Domino's on "Your usual".
   Zero taps to value.
2. **Never make the user wait. Do the work early and show success optimistically.**
   Instagram starts uploading before you press Share; likes fill on frame 1 and roll back
   on failure.
3. **Feedback happens where the finger is, and motion is anchored to its source.**
   Things grow from what you touched and return there (Photos, Airbnb, the Dynamic
   Island); the heart bursts at the tap point (TikTok).
4. **Visible real work beats a spinner.** Uber's car, Domino's stages, WhatsApp's ticks.
   Operational transparency raises perceived quality (+22.2% in Buell, Kim & Tsay 2017).
   Fake progress breaks trust the first time the user notices.
5. **Two loops, visibly linked.** A short action feeds a long meta (a lesson → the
   streak and league; an order → the stamp card). Animate the link: the star flies to
   the counter.
6. **Reveal in beats and end on the peak.** Three beats (tap, tap, burst) with the last
   one biggest; the final 1.5–3 s of a flow is the moment people remember (peak-end).
7. **Medium juice on 5–10 key moments, restraint everywhere else.** Juice follows an
   inverted U (Kao 2020; amplified feedback can backfire, Ballou 2024). Frequent actions
   get no motion (Apple HIG); Linear and WhatsApp feel fastest because they barely
   animate.
8. **Confirmation, not celebration, for money.** The Apple Pay checkmark is calm.
   Celebration is for effort and user-chosen goals (rings, milestones, recaps), never for
   spending, trading or betting (Robinhood: $7.5M settlement, 2024).
9. **Pull comes from the user's own changing data and from rituals.** Balances, progress,
   unread stacks with a finite end, "on this day", Wrapped, Monday's Discover Weekly,
   Community Day. Scheduled novelty is honest pull; "we miss you" is not.
10. **Personality absorbs failure.** A character, an illustration or a line of copy
    turns an error into play (Duo, King Robert, Wolt's illustrations). Never shame.

---

## 2. Motion tokens (map one set across platforms)

| Use | iOS (SwiftUI) [S] | Android (M3) [S] | Web |
|---|---|---|---|
| Default UI change | `.smooth` (duration 0.5, bounce 0) | Standard spring / `cubic-bezier(0.2,0,0,1)` emphasized | `transition: transform .3s cubic-bezier(.2,0,0,1)` or Motion `{type:"spring", visualDuration:.35, bounce:0}` |
| Snappy control feedback | `.snappy` (bounce ~0.15) | Fast spatial spring | spring via CSS `linear()` easing |
| Playful / reward | `.bouncy` (bounce ~0.3) | Expressive spatial spring | `cubic-bezier(.34,1.56,.64,1)` back-ease, or Motion `bounce:.3` |
| Tiny state change (tick, crossfade) | `.contentTransition(.symbolEffect(.replace))` | M3 Short3–4 (150–200 ms) | `opacity` 150–200 ms |
| Numbers changing | `.contentTransition(.numericText())` | `AnimatedContent` | `font-variant-numeric: tabular-nums` + a 200–300 ms count |
| Haptic: success / error / select / light | `.sensoryFeedback(.success / .error / .selection / .impact(weight:.light))` | `HapticFeedbackConstants.CONFIRM / REJECT / CLOCK_TICK` | none on iOS Safari; `navigator.vibrate(10)` Android-only |

Conversion: damping ζ = 1 − bounce; stiffness k = (2π / duration)². Never use linear
easing for movement (WWDC23). Gestures: carry the finger's velocity into the spring and
rubber-band at the edges. Reduced motion: replace spatial motion with a crossfade and
keep haptics and text (`prefers-reduced-motion`, `accessibilityReduceMotion`,
`ANIMATOR_DURATION_SCALE`).

---

## 3. Moment playbook (by moment type)

Each rule: **do** · like · because · spec · web / native · never.

### 3.1 Launch and first screen
- **Do:** open on the core action or the habitual task ("Your usual" card, camera, keypad,
  current order). **Like:** Snapchat, Cash App, Domino's Easy Order. **Because:** no
  navigation before intent. **Spec:** core-ready ≤ 1 s, tracked as a metric; promos below
  the fold. **Web:** SSR the card, `fetchpriority="high"` on its image. **Native:** defer
  SDK init until after the first frame. **Never:** a splash, carousel or interstitial before
  the core action.

### 3.2 Onboarding and first value
- **Do:** deliver value before any account, permission or paywall; ask at the first save
  or order. **Like:** Duolingo's first lesson, Calm's first breath, TikTok's first swipe,
  Airbnb browsing, Apple Pay express. **Because:** time-to-value predicts activation
  (Headspace lost 38% in a long onboarding [S, second-hand]). **Spec:** value in screen 1–2.
  **Web:** an anonymous session merged on sign-in. **Native:** Sign in with Apple /
  Credential Manager after the first success. **Never:** a 17-step quiz or contacts/push
  permission before value.
- **Do:** right after the first success, ask for a small commitment (pick a goal: 3 chips).
  **Like:** Duolingo's "Commit to my goal". **Never:** pre-select the hardest goal.
- **Do:** anchor a habit to an existing routine ("after I wake up" chips mapped to editable
  times). **Like:** Headspace. **Because:** implementation intentions (d ≈ 0.65).

### 3.3 Primary button press
- **Do:** anticipation squash and an overshoot release. **Like:** candy swaps and juicy UI.
  **Spec:** press scale 0.96 in ~80 ms; release spring back to 1 with a slight overshoot
  [H]. **Web:** `:active{transform:scale(.96);transition:transform 80ms}` and a spring on
  release. **Native:** a `ButtonStyle` on `isPressed` + `.spring(response:0.3,
  dampingFraction:0.6)`; Compose `graphicsLayer` scale from `collectIsPressedAsState()`.
  **Never:** juice a purchase button without a confirm step.
- **Do:** busy state inside the same button within 100 ms, fixed width, double-submit
  blocked; step text if > 1 s ("Sending to the kitchen…"). **Never:** fake delays.

### 3.4 Favourite, like, save
- **Do:** fill the icon on frame 1 with a small pop and a light haptic; sync in the
  background and roll back with a toast. **Like:** Instagram's heart, Airbnb's wishlist,
  Spotify "+". **Because:** a cheap investment loads a future trigger. **Spec:** scale
  1 → 1.2 → 1, `.snappy` / bouncy spring 0.35–0.45 s [H]. **Web:**
  `el.animate([{transform:'scale(1)'},{transform:'scale(1.2)'},{transform:'scale(1)'}],{duration:400,easing:'cubic-bezier(.2,0,0,1)'})`.
  **Native:** `.symbolEffect(.bounce, value:)` + `.sensoryFeedback(.impact(weight:.light))`.
  **Never:** wait for the server before filling the icon.

### 3.5 Add to cart / add item
- **Do:** a persistent cart bar with count and **all-in** total that bumps on add. **Like:**
  Wolt, Uber Eats. **Spec:** bar 1 → 1.06 → 1 over 250 ms spring, count crossfade, light
  haptic [H]. **Never:** auto-added sides or pre-ticked extras (EU CRD Art. 22).
- **Do:** fly the item to the cart or counter (FLIP, curved path 400–600 ms, target bump
  1.15) [H]. **Like:** Royal Match stars to the meta. **Because:** a visible effort →
  progress link (goal gradient).
- **Do:** live price on the sticky add button ("Add · €12.50") updating with options.
  **Because:** 40% abandon over unexpected extra costs (Baymard, 2025).

### 3.6 Navigation into detail, sheets and secondary content
- **Do:** a shared-element transition, growing the tapped image into the hero and
  reversing on back. **Like:** Airbnb, Photos. **Because:** object constancy. **Spec:**
  spring 0.35–0.5 s, bounce 0 [S presets], interruptible. **Web:**
  `view-transition-name` + `document.startViewTransition()`. **Native:**
  `.navigationTransition(.zoom(sourceID:in:))` / `matchedGeometryEffect`; Compose
  `SharedTransitionLayout`. **Never:** a crossfade that hides where content came from.
- **Do:** secondary content (reviews, options, comments) in a bottom sheet over the live
  primary, with detents ~50% / full. **Like:** TikTok comments, Apple sheets. **Web:**
  `<dialog>` + drag `translateY`. **Native:** `.presentationDetents([.medium,.large])`;
  `ModalBottomSheet`. **Never:** a full-page navigation that loses scroll position.

### 3.7 Browsing, lists and scrolling
- **Do:** category tabs synced with scroll in both directions. **Like:** Wolt and Uber Eats
  menus. **Spec:** underline slides 200 ms ease-out [H]. **Web:** `IntersectionObserver`,
  `position:sticky`, `scroll-margin-top`. **Native:** `ScrollViewReader` /
  `ScrollableTabRow`. **Never:** hijack scroll speed.
- **Do:** big visual items as one-item full-screen paging with n+1/n+2 preloaded. **Like:**
  TikTok, Reels. **Spec:** hard snap, first frame < 100 ms. **Web:**
  `scroll-snap-type:y mandatory; scroll-snap-stop:always`. **Never:** remove the exit.
- **Do:** finite lists end with an explicit "all caught up" card and one useful next action.
  **Like:** Instagram. **Because:** stopping cues restore agency (and the EU DSA).
- **Do:** skeleton within 100 ms, matching the final layout. **Never:** a fake minimum
  loader time.
- **Do:** dead ends (no results) auto-offer the nearest valid path with no extra tap.
  **Like:** Royal Match's free reshuffle.

### 3.8 Waiting for something real (order, ride, processing)
- **Do:** named real stages that change on real events, a gliding marker, and one hero
  number. **Like:** the Domino's Tracker, Uber, Wolt's countdown. **Because:** the labor
  illusion and operational transparency (+22.2% perceived quality). **Spec:** stage dot
  fills 300 ms ease-out, then a 1.5 s pulse on the current stage, light haptic per change
  [H]; ETA digits use a numeric transition; update the ETA only on changes ≥ 3 min [H].
  **Web:** SSE for status, `tabular-nums`. **Native:** `.contentTransition(.numericText())`.
  **Never:** stages that move on a timer while presented as live. A timed step must be
  labelled "estimated", and no stage may claim an action nobody performs: NPR (2026) found
  the Domino's "Quality Check" step runs on a timer and stays up while the box waits.
- **Do:** an ETA **range** ("19:40–19:50") from real data; push the reason for a delay
  before the user notices. **Because:** ranges cut dissatisfaction when late; lateness
  costs more than earliness helps.
- **Do:** waits of minutes to hours → a Live Activity / ongoing notification, alerting only
  on milestones. **Spec:** ≤ 8 h; dismiss 15–30 min after the end [S Apple].
- **Do:** a short calm wait → one slow breathing shape instead of a spinner (10 s cycle,
  ease-in-out). **Like:** Calm. **Never:** to mask a wait you should fix.
- **Do:** 3–5 illustrations in the brand's style for the states. **Like:** Wolt.

### 3.9 Submit, checkout and pay
- **Do:** preview the outcome above the button ("you pay / they get / arrives"), with
  static numbers while the user reads. **Like:** Phantom's simulation. **Because:**
  predicted consequences build certainty.
- **Do:** one button labelled with the final total ("Pay €27.40"); Apple Pay / Google Pay
  first; guest by default; account after purchase. **Like:** Apple Pay HIG, aggregators.
  **Because:** forced accounts drive 18% of abandonment (Baymard, 2025). **Web:** Payment Request
  API, `aria-busy`. **Never:** a fee after this button.
- **Do:** do the work before the commit (validate or upload when the last field gets
  focus). **Like:** Instagram's early upload. **Never:** charge before the explicit commit.

### 3.10 Success
Reward sizing, specs and red-line tests for every moment below: `reward.md`.
- **Money or transaction success:** a calm checkmark drawn over ~300–400 ms [H] with a
  success haptic at the end of the stroke, the order number, ETA and the first stage
  already ticked (endowed progress). **Like:** Apple Pay, Domino's "placed". **Web:** SVG
  `stroke-dashoffset`. **Native:** `.sensoryFeedback(.success)` / `CONFIRM`. **Never:**
  confetti or a reward for spending.
- **Effort success (finished lesson, workout, goal):** a dedicated full-screen moment
  ending on the peak with ≤ 3 recap facts and progress toward the *next* goal; numbers
  count up. **Like:** Duolingo's lesson-complete chain, Strava. **Spec:** ≤ 3 screens,
  skippable. **Never:** upsells between reward screens.
- **Milestone peaks:** a fixed ladder (7 / 30 / 100 / 365) with a visibly transformed hero
  and a share card. **Spec:** start at `.spring(duration:0.6, bounce:0.2)` [S example];
  web confetti ≤ 1 s. **Like:** Duolingo milestones.
- **Automatic finale:** leftover value converted into a visible bonus, 1.5–3 s,
  skippable. **Like:** Candy Crush's Sugar Crush.
- **The end of a journey:** a named feeling plus one optional action ("Enjoy, Maria" +
  one-tap rating). **Like:** Domino's "mmm!". Rate the food and the service/delivery
  separately, with one-tap thumbs per dish and a comment box only after a thumbs-down
  (Wolt, Uber Eats). **Never:** a 5-question survey.

### 3.11 Errors and invalid actions
- **Do:** an invalid action springs back to its origin (~250 ms with a small overshoot,
  error haptic). **Like:** a failed candy swap. **Because:** motion explains the rule
  without a modal. **Never:** a screen shake or shame copy.
- **Do:** money failure says what happened, whether money moved, and offers a human ("Not
  charged. Declined by your bank. Try another card / Talk to us"). **Like:** the remedies
  the CFPB required of Cash App. **Never:** a generic "Something went wrong".
- **Do:** let personality absorb failure: a ≤ 1.5 s reaction, a one-line joke and a clear
  retry. **Like:** King Robert, Duo.

### 3.12 Progress, points, collection, loyalty
- **Do:** one closing ring for daily or weekly goals, counting past 100% and pausable.
  **Like:** Apple Fitness. **Spec:** fill `.smooth` 0.5 s; on close one success haptic + a
  burst < 1 s. **Web:** SVG `stroke-dasharray`.
- **Do:** a long path as a map with the current node pulsing and the next 2–3 visible.
  **Like:** the Candy Crush saga map. **Never:** show all 1,000 nodes.
- **Do:** collection as a silhouette grid; a new tile flips or colours in over ~400 ms.
  **Like:** the Pokédex.
- **Do:** a loyalty stamp card with rewards at 3 / 6 / 10 and 2 stamps endowed at sign-up
  with a stated reason. **Like:** Domino's relaunch. **Because:** goal gradient + endowed
  progress (34% vs 19% completion, Nunes & Drèze 2006). **Spec:** stamp lands with a
  300 ms spring + light haptic [H].
- **Do:** a rewards balance shows the next concrete thing it buys ("3 orders to a free
  tiramisu"). **Like:** RevPoints. **Never:** points that silently expire, or prize draws
  tied to spending.
- **Do:** progress as a side effect of the normal task (round-ups into named pots).
  **Like:** Monzo. **Never:** auto-enrol money moves.

### 3.13 Reward reveal
- **Do:** a 3-beat tap-to-reveal of a **fixed** reward: each tap scales 1 → 1.12 (60 ms)
  → 1 (spring ~400 ms, damping ~0.5), light haptic on beats 1–2, success haptic + particle
  burst on beat 3 [H]. **Like:** Clash Royale's Lucky Drop. **Because:** staged
  anticipation drives reward-prediction signals. **Never:** paid or variable value, or any
  purchase inside the reveal.

### 3.14 Streaks and habits
- **Do:** a tiny qualifying action (≤ 1 screen) with the stretch goal kept separate; the
  tick gets its own screen (count → +1 → icon change, success haptic). **Like:** Duolingo
  ("one lesson keeps the streak", +3.3% D14 retention [S]).
- **Do:** grace from day 1 (≥ 1 free freeze a week, auto-applied, "Your streak was
  protected"). **Like:** Duolingo freezes, Strava backfill.
- **Do:** in sensitive domains (money, health, kids), cumulative totals by default and the
  consecutive streak opt-in. **Like:** Headspace.
- **Do:** match the cadence to the behaviour: daily for 5-minute learning, weekly for
  workouts, per-ritual for ordering food. **Habit-zone gate:** streaks only if the core
  action plausibly recurs ≥ weekly.
- **Never:** streaks between two people, paid restores, guilt pushes, a crying mascot.

### 3.15 Return: what pulls users back with no task
- **Your usual:** the last order or task as one tap at the top of home (Domino's,
  aggregators' "order again"). Never auto-submit.
- **Freshness cues:** a finite, visible unread stack (story rings, unopened snaps), never
  faked.
- **One claimable item on open** (Clash Royale's daily reward): one tile, one tap, the
  3-beat reveal. Never countdowns that reset.
- **Appointments:** a visible countdown plus one push when it completes (Clash's chest
  timers, Live Activities). Never sell the skip.
- **Rituals:** a fixed weekday and hour (Community Day, Discover Weekly Monday). Never many
  surprise "today only!" events.
- **Ambient presence:** a widget showing today's state with one tap to the task (the
  Duolingo widget). Never a guilt image.
- **Memories:** "on this day" from the user's own past, at most weekly, with a hide
  control (Photos, Snapchat).
- **Recap:** 6–10 vertical cards of the user's own data plus a 9:16 share card, the same
  week every year; celebrate choices, never mock (Wrapped, Year in Monzo, Duolingo YIR —
  adding a percentile increased sharing [S]).

### 3.16 Notifications
- **Do:** transactional and specific within seconds (title = venue or merchant; body =
  what, how much, ETA). **Like:** Monzo. **Never:** "You have an update".
- **Do:** marketing pushes rotate templates (≥ 8, no repeat within 7 days, ≤ 1/day), are
  sent near the user's habitual time, back off when ignored and say so. **Like:** Duolingo's
  bandit (+0.5% DAU, +2% new-user retention [S]). For food: ≤ 1 a week, timed to the user's
  own ordering ritual.
- **Do:** opt-in follows and quiet hours (22:00–07:00 by default). **Never:** guilt copy,
  fake urgency, streak pushes at night.

### 3.17 Social
- **Do:** one-tap effort recognition (kudos), optimistic, notified in batches. **Like:**
  Strava. **Never:** public zero counts or rankings by kudos.
- **Do:** small, similar, weekly cohorts with promotion zones and a Monday reset. **Like:**
  Duolingo Leagues. **Never:** global leaderboards for novices or of spending.
- **Do:** counts on items, not on people ("popular tonight" on dishes; personal counts
  private). **Like:** Instagram's hidden-likes option.
- **Do:** reciprocal requests in small opt-in groups. **Like:** Clash Royale clans.

### 3.18 Identity and ownership
- **Do:** one ownable artefact the user makes: a card design, a theme, a profile.
  **Like:** Monzo's coral card (67% word of mouth [S]), Cash Card drawing, Revolut's card
  designer. **Because:** the IKEA effect. **Never:** charge for the first design.
- **Do:** personalise the environment early (voice, theme, goal level) → ownership.

---

## 4. Recipes by app type (which moments decide the feel)

| App type | The 5–8 moments to redesign first |
|---|---|
| **Food ordering / restaurant** | Launch with "Your usual" (3.1) · menu tabs synced with scroll (3.7) · item sheet with live price (3.5) · add-to-cart bump + fly (3.5) · checkout with total on button + wallet pay (3.9) · calm confirmation with the first stage ticked (3.10) · real-stage tracker + ETA range (3.8) · "Enjoy" end + one-tap rating (3.10) · stamp card with endowed stamps (3.12) · ritual-timed push (3.16). Edge vs aggregators: "Same prices as in the restaurant · no service fee". |
| **Table booking** | Party size → date → tappable chips of real slots → confirm, < 30 s for a returning guest; "Add to calendar" + a reminder at the guest's chosen time. Never a fake "1 table left". |
| **Fintech / payments** | Keypad or task home (3.1) · outcome preview (3.9) · honest pending (3.3) · calm success (3.10) · honest failure (3.11) · freeze/unfreeze toggle with undo · spend notification within seconds (3.16) · own-data pull (3.15). Motion restraint is the brand. |
| **Habit / learning / wellness** | First value before sign-up (3.2) · tiny unit + streak tick (3.14) · in-task feedback on the same frame as validation (rising tone + light haptic) · session-end peak (3.10) · milestones ladder (3.10) · weekly cohorts (3.17) · widget (3.15). |
| **Content / social / feed** | Launch on content (3.1) · paging or snapping (3.7) · double-tap like at the touch point (3.4) · sheets over the live primary (3.6) · finite stacks + caught-up card (3.7, 3.15). |
| **Tools / SaaS** | Optimistic writes, < 100 ms response, ⌘K and shortcuts, **no motion** on frequent actions (Linear) · shared-element into detail (3.6) · honest progress (3.8). |
| **Marketing / landing page** | 5-second clarity: what, for whom, why here (3.2) · one primary CTA, the same everywhere · proof before the ask · scroll restraint: no scroll-jacking, a loader ≤ 1 s · a short form or a one-tap contact (3.9) · pull = a reason to return or to share (a calculator, a demo, a recap). Load `landing-pages.md` too. |
| **Service marketplace: clients** | Task-first search with price + next slot (2 taps) · short brief → 3–5 pros the client picks · total price from first view · instant book within the pro's rules, or an SLA countdown + alternatives · "you pay when it's done" (held, auto-release) · statuses on the way → arrived → done · blind two-sided reviews with sub-scores · "Book Maria again" + maintenance reminders. Full recipe and tests: `marketplace.md` |
| **Service marketplace: providers** | Money before commit (cost per lead and per won job, no hidden credits) · lead card with scope, distance and how many pros got it · saved replies, calendar, quiet hours · published ranking and tier rules with grace periods · reason + human review on any restriction. `marketplace.md` §3 |
| **Classifieds: buyers** | Vertical's main dimension first · filters with live counts · map + draw (+ commute for property) · decision-summary cards with a separate paid label · listing facts with "Ask seller" chips · price context with a method · saved searches with instant/daily/weekly alerts · "never pay before viewing" at contact. `classifieds.md` |
| **Classifieds: sellers and businesses** | Photo-first posting with editable AI draft · price range from comparables · Free/Top/VIP compared on one screen in € with an end date · honest per-ad stats · sold → "sell another" · feed health and lead inbox for businesses. `classifieds.md` §3 |
| **Marketplace / booking (Airbnb-like)** | Value before account (3.2) · wishlist heart (3.4) · shared-element listing (3.6) · total price upfront (3.9) · recap / memories (3.15). |

---

## 5. The ethical line (applies to every rule above)

Pull is legitimate when it comes from real value, the user's own data, rituals the user
chose and honest progress. It is manipulation, and a **P1 finding** under the
`emotional.md` ethics gate, when it uses:
- celebration of spending, trading, betting or deposits (Robinhood: $7.5M);
- streaks between people, paid streak restores, guilt or night pushes, a crying mascot
  (the Snapchat streak suits, 2025–2026);
- paid or variable-value randomness (loot boxes, prize draws tied to spending);
- fake progress, fake stages, fake scarcity, countdowns that reset;
- drip pricing, pre-ticked extras, a "was" price that isn't the 30-day low (EU PID 6a,
  UK DMCC 2025);
- autoplay that adds items or spends money; infinite feeds with no stopping cue;
- read receipts used to pressure a person.

The test: would the user thank you for the mechanic if they saw how it worked?
Severity follows `emotional.md`: a confirmed pattern from the gate is P1; judgment items
are P2.
