# App mechanics: what to borrow from the most-used apps, and how to make it yours

Load for the experience-director's **Borrow & adapt** step, and whenever the owner names
an app they admire. `benchmark-apps.md` says how a *moment* should feel and gives its
spec; this file is for **ideation**: which signature mechanics of widely used apps this
product can adapt, remix or reinvent, and how to translate each one so it fits. Never
answer "no streaks" and stop: name the mechanic, why it works, and the version that fits.

**Sources.** The teardowns in `research/teardowns/`: **HW** habit-wellness · **GR**
games-reward · **SF** social-feed · **FT** fintech · **PC** platform-craft · **FO**
food-ordering. Tags as there: **[S]** company-stated, **[O]** observed, **[H]**
practitioner claim. "—" means no published effect; the mechanism is the argument. Specs
live in `benchmark-apps.md` (§ numbers in the first column): link to them, don't restate.

**Engines** (the words the Engine column uses). Keep the engine, change the surface:
variable reward · anticipation (staged reveal, appointment) · endowed progress · goal
gradient · closure (Zeigarnik, finite stacks) · loss aversion · competence · identity /
IKEA effect · ritual · reciprocity · small-cohort comparison · social proof on items ·
certainty / control · operational transparency · peak-end · personality · novelty ·
time-to-value.

---

## 1. Catalogue

Columns: **Mechanic (§)** · **What the user experiences** · **Engine** · **Evidence** ·
**Fits when** (cadence · context · data it needs) · **Don't copy** (the harmful version).

### Habit and wellness

| Mechanic (§) | User experiences | Engine | Evidence | Fits when | Don't copy |
|---|---|---|---|---|---|
| **Duolingo** · one short lesson a day → streak, league, quests (HW §1) | | | | | |
| Streak tick on its own screen, goal chosen after day 1 (3.14, 3.2) | count → +1 → the flame changes; "Commit to my goal" 7/14/30 | loss aversion that grows with length; identity; commitment | new streak animations +1.7% D7; 7-day streak → 2.4× next-day return [S] (HW D1, D3) | core action recurs ≥ weekly; a per-user event log; unit = the behaviour's own cadence | a tick hidden in a toast; a tick when nothing was earned; pre-selecting the hardest goal |
| Tiny qualifying action + free freeze (3.14) | one lesson keeps the streak; a freeze silently saves a missed day | ability (Fogg); repair blunts the "what-the-hell" drop | one lesson = streak: +3.3% D14 [S]; 2 freezes +0.38% DAL [S]; repair weakens the broken-streak drop (Silverman & Barasch 2023) (HW D4–D5) | any streak; grace ships on day 1 | paid repair, gems for freezes, a quota the user can fail on a bad day |
| Lesson-complete chain (3.10) | "Lesson complete!" → stat cards → streak → league | peak-end; goal gradient toward several goals | — [O] Lazyweb capture (HW D7) | an effortful task with a clear end | > 3 screens; upsells between reward screens |
| Leagues (3.17) | a weekly board of ~30 similar learners; promotion zones; Monday reset | small-cohort comparison; fresh start (Dai 2014) | Leaderboards test raised lessons started and completed [S]; ~30 per cohort [H] (HW D8) | weekly activity per user; enough similar users | global boards; ranking people by spend; Friend-Streak-style shared streaks (+22% [S], but the Snapchat-suit pattern) |
| Duo's personality (3.11) | a character that reacts to right, wrong and idle (Rive state machines) | personality absorbs failure | [S] "Building character" blog (HW D6) | a voice the brand can sustain on every surface | sad-owl guilt; a crying mascot; "Duo is dead" jokes that end in an upsell |
| Reminders that back off + widget (3.16, 3.15) | rotating copy near your usual time; "we'll stop sending them"; widget shows today done/not | novelty vs habituation; ambient cue | bandit +0.5% DAU, +2% new-user retention [S]; widget users retained better [S] (HW D10) | push opt-in; a habitual time in the data | guilt copy; pushes that can't be muted |
| **Strava** · record → kudos → go again (HW §4) | | | | | |
| Kudos (3.17) | one tap on a friend's effort | effort recognition; reciprocity | 14B kudos in a year [S]; exercise is socially contagious (Aral & Nicolaides 2017) | a two-sided effort | public zero counts; ranking by kudos |
| Medals only from the 2nd attempt | personal bests; none on a first try | competence; self-comparison | [S] support glossary | a repeated, measurable effort | unearned medals |
| Local Legend | most efforts on a segment in a rolling 90 days earns a laurel | consistency status open to non-elites | [S] 2020 launch | a repeat behaviour at a place | status bought with volume of spend |
| Weekly streak + backfill (3.14) | ≥ 1 activity per Mon–Sun week; a late upload restores it | forgiving cadence; repair | [S] support | weekly behaviour | banners that can't be muted [S] |
| Year in Sport (3.15) | scene-by-scene recap, each scene shareable | identity; annual anticipation | [S]; went subscription-only Dec 2025 | a year of data | paywalling what users had free |
| **Headspace** · Today → one short session (HW §2) | | | | | |
| Today, sized to the moment | one tap to a session for morning / afternoon / night | choice reduction + a time-of-day cue | [S] Apple "Behind the Design" | content that maps to time of day | a catalogue as home |
| Routine-anchored scheduling (3.2) | "after I wake up" chips → an editable reminder time | implementation intentions (d ≈ 0.65) | [O] Appcues | a habit with a natural anchor | a default time the user didn't pick |
| Streak toggle, totals first (3.14) | profile stats lead; the run streak can be switched off | respect for anxious users | [S] help centre | money, health, kids | resetting banked totals |
| Paywall timeline | today / reminder / charge, then the reminder is sent | honesty lowers purchase anxiety | [O] capture | any trial | no pre-charge reminder |
| Soft characters | blob figures carry hard feelings | lowering threat | [S] qualitative only | scary or sad states | red alert banners |

### Games (transplant the reward loop, never the monetisation)

| Mechanic (§) | User experiences | Engine | Evidence | Fits when | Don't copy |
|---|---|---|---|---|---|
| **Clash Royale** · 3-min battle → rewards → upgrade (GR §1) | | | | | |
| Lucky Drop 3-tap reveal (3.13) | tap a container 3×; each tap can upgrade it; cards burst out | anticipation; reward-prediction peaks at p ≈ 0.5 (Fiorillo 2003) | 3 taps, upgrade odds 20/25/30%, pity since Oct 2025 [S] | a reward the user earned, at any cadence | paid or variable *value*; a purchase inside the reveal |
| Timed chest = appointment (3.15) | a chest unlocks in hours; 4 slots | Zeigarnik; appointment | timers suit "the widest audience" [S] | a real wait with a known end | selling the skip; pings before it's ready |
| Free reward for showing up (3.15) | one claimable item on open | the session needs a goal | — [H] | something real to claim, at the product's cadence | countdowns that reset; a daily claim in a weekly product |
| Trophy Road (3.12) | a road of named stops; each unlocks new art and cards | goal gradient + novelty at each stop | — | a long progression with visible unlocks | an abstract % bar |
| Clan donations (3.17) | request a card; clanmates donate and earn XP | reciprocity; pull from people | — | a small opt-in group with a shared need | obligation; open global groups |
| Fixed emotes | pre-set laugh / cry reactions | social presence without toxicity | — | any two-sided moment | free-text taunts |
| **Candy Crush** · level → star → one node on the map (GR §2) | | | | | |
| Escalating praise ("Sweet!" → "Divine!") | bigger combos, bigger voice and type | variable praise; luck felt as skill ("luck in the right places" [S]) | juice dose-response (Kao 2020) | rare, genuinely better outcomes | praise on every action |
| Sugar Crush finale (3.10) | leftover moves detonate into points, no input | peak-end | — | a flow with leftover value to convert | confetti on money out |
| Saga map (3.12) | a winding path; the avatar moves one node; next nodes visible | goal gradient; endowed progress | — | a long path of discrete steps | all 1,000 nodes; friends' faces without opt-in |
| Invalid swap springs back (3.11) | the candy bounces home | motion explains the rule | — | any invalid drag or action | modal errors; screen shake |
| Near-miss + paid "+5 moves" | "so close!" and an offer | near-miss arousal | more arousing, stronger urge to continue (Larche 2017, J. Gambling Studies) | only as honest "1 step left" | **any paid offer at the near-miss** (the slot pattern) |
| **Pokémon GO** · walk → catch → hatch → collect (GR §3) | | | | | |
| Graded skill (Nice / Great / Excellent) | a shrinking ring; a grade on the throw | competence; mastery | multipliers unpublished [S]; community figures [H] | a skill the user repeats and improves | grades tied to money or public by default |
| Wobble 1…2…3…click (3.8) | staged beats before the result | staged anticipation | — | a backend that really takes that long | fake delay for suspense |
| Egg hatches by distance | 2–12 km walked → crack-crack-burst | effort-linked delayed reward | +1,473 steps/day, faded by week 6 (Althoff 2016; Howe 2016) | a behaviour the user wants anyway; a renewal plan | rewards for spending; no plan for decay |
| Pokédex silhouettes (3.12) | unseen entries greyed; caught ones in colour | completion drive; identity | — | a finite, browsable set | random purchasable items |
| Community Day (3.15) | a fixed monthly slot when everyone plays | ritual + synchronous presence | — | a slot the business can staff every time | many surprise "today only!" events |
| **Royal Match** · level → star → restore the castle (GR §4) | | | | | |
| Star flies to the meta (3.5) | the earned star travels into the castle counter | visible effort → progress link | "the most transplantable moment" (GR) — | a short loop that feeds a long one | flying points for spending |
| Free reshuffle when stuck (3.7) | no moves → a free reshuffle | removes dead ends | [H] | any empty or stuck state | a paywall at the dead end |
| King Robert | a comic king delivers hints and failure jokes | personality absorbs failure | — | a character with a sustained voice | guilt; mocking a loss |

### Social and feed

| Mechanic (§) | User experiences | Engine | Evidence | Fits when | Don't copy |
|---|---|---|---|---|---|
| **Instagram** · Stories ring → feed → like → post (SF §1) | | | | | |
| Optimistic double-tap like (3.4) | heart pops, icon fills on frame 1 | low-effort feedback; reward learning | "perform actions optimistically" [S]; Lindström 2021 | any save or favourite | waiting for the server; public counts on people |
| Early upload (3.9) | press Share and it's already there | perceived speed | [S] Krieger | a submit with pre-work | charging before the commit |
| Stories ring + segments (3.15) | ring on unseen; one bar per item shows what's left | closure; freshness | [S] launch; no causal study | real new content on a rhythm | a ring with nothing new |
| 24-hour expiry | items vanish after a day | low stakes; honest scarcity | [S] 2016 | content that really expires | countdown pressure on a buy button |
| "You're all caught up" (3.7) | a checkmark divider at the end | stopping cue; agency | [S] 2018; EU DSA 2026 finding on TikTok | any long list | backfilling with filler |
| **TikTok** · open → video playing → swipe (SF §2) | | | | | |
| Opens on a playing video (3.1) | no grid, no choice | time-to-value; no choice overload | 260 videos in week 1 = "habit" [S, court filing] | a ranked item the product can pick | sound on in a non-media app |
| One item per screen (3.7) | every swipe is a vote the ranker learns from | variable reward; learning | [H] Eugene Wei | big visual items + skip data | no exit; no end |
| Heart at the touch point (3.4) | the burst appears where the finger tapped | direct manipulation | [O] | taps on media | covering controls |
| Sound disc → cluster | tap the sound → every video using it | collection; remix | [O] | a shared attribute across items | — |
| Comments half-sheet (3.6) | comments over the still-playing video | context kept | [O] | secondary content | full-page navigation that loses scroll |
| **Snapchat** · camera → snap → streak (SF §3) | | | | | |
| Opens on the camera (3.1) | a viewfinder in one beat | first screen = core action | "Time to Camera Ready" metric; ~40 opens a day [S] | an obvious core action | a splash or ad first |
| Delivered / opened states (3.8) | sent → delivered → opened icons | certainty; reciprocity | [O] | a two-sided process with real events | "seen" used to pressure a person |
| Memories (3.15) | "on this day" past snaps | nostalgia; identity | [O] | a history worth resurfacing | resurfacing hidden or deleted things |
| Snapstreak (the harmful baseline) | fire + count with a friend; hourglass; paid restore | loss aversion + social obligation | named in Utah v. Snap 2025 [S filing]; no causal study | **only** as a solo, pausable streak | shared streaks, paid restores, hourglasses aimed at minors |
| **YouTube** · home / Shorts → watch → subscribe (SF §4) | | | | | |
| Context-aware like (~20 variants, ~1 s) | the thumb plays a category-themed animation | novelty inside a repeated action | [H] 9to5Google | a repeated action over categories | random *rewards* of real value |
| Up-next card, not autoplay (3.7) | an end card the user taps | agency | autoplay lowers agency (Lukoff 2021); teen default off [S] | any sequence | auto-advance that adds items or spends money |
| Subscribe + bell (3.16) | opt-in pushes per creator | a trigger the user chose | [O] | content that updates | pushes without opt-in |

### Money

| Mechanic (§) | User experiences | Engine | Evidence | Fits when | Don't copy |
|---|---|---|---|---|---|
| **Monzo** · tap card → instant push → feed → Pots (FT §1) | | | | | |
| Hot coral card (3.18) | a card strangers ask about | identity; social signalling | 67% word of mouth [S] (card not isolated) | an artefact seen in public | charging for the first design |
| Instant specific notification (3.16) | merchant, logo, amount within seconds | certainty; closes the loop | alerts cut overdraft charges 5–24% (FCA OP10, OP40) | a real-world action the phone can confirm | "You have an update"; marketing in that channel |
| Freeze / Defrost | one toggle, a friendly verb, reversible | control; lowers the stakes | #1 feature in 2017 [S]; accidental freezes → add undo | a scary state the user can control | a confirm dialog on the protective direction |
| Pots + round-ups (3.12) | spare change slides into a named pot | default effect; mental accounting | ~£115m saved in a year [S] | progress as a side effect of the normal task | auto-enrolled money moves |
| Gambling block | on instantly, off after a 48 h cool-off | pre-commitment | 8% disabled [H] | a user-chosen limit | a cool-off on cancelling a subscription |
| Year in Monzo (3.15) | a Wrapped-style spending recap | reflection; identity | an Ombudsman complaint after it mocked food-delivery spend (2026) | own data, celebratory tone | judging quantity ("maybe cook?") |
| **Revolut** · spend → instant push → rates, points (FT §2) | | | | | |
| Notification in two currencies | local and home amount after each payment | certainty under uncertainty | [S] App Store copy | an uncertain moment | — |
| One-tap home widgets (3.1) | cards and favourite recipients pinned; one tap to move money | fewest taps to the habit | [S] Revolut 10 | a repeated habitual action | promos above the habit |
| Themes, wallpapers, card designer (3.18) | a chosen look; a drawn card; "approved, printing" push | IKEA effect; anticipation | [S] help centre | cheap personalisation or a made object | paywalling the first design |
| RevPoints → the next thing (3.12) | points per spend, redeemable for named rewards | goal gradient on a named goal | ~120M points redeemed in the trial [S] | a catalogue with near goals | abstract balances; silent expiry; prize draws |
| Live rate watching | rates move; users wait for a pop | variable reward | [H] community | — | **a trading loop**; any price users learn to watch |
| **Cash App** · open on a keypad → pay (FT §3) | | | | | |
| Amount-first home (3.1) | open → keypad | the task is the home | [H] walkthrough | one dominant task | — |
| $Cashtag | a public handle that travels | identity + network effect | [H] | something users share | — |
| Cash Card drawing (3.18) | draw on your card; redesign costs $5 | IKEA effect; endowment | [S] help | an ownable object | charging for the first |
| Offers (opt-in, rotating) | activate a discount before paying | variable but honest reward | [H] | real deals with real end times | fake countdowns |
| Just-in-time verification | restricted until the first send asks for ID | effort at the moment of motivation | [H]; CFPB $175m was about failure paths | any required friction | front-loading at install; no human on failure |

### Platforms and food

| Mechanic (§) | User experiences | Engine | Evidence | Fits when | Don't copy |
|---|---|---|---|---|---|
| **Apple** · Pay, Fitness rings, Wallet, Live Activities (PC §1) | | | | | |
| Pay: double-click gesture entry | side button → card → Face ID | a zero-navigation habit cue | HIG [S] | one habitual action worth a shortcut | — |
| Pay: calm checkmark (3.10) | a circle draws into a check, chime, haptic | closure; certainty | HIG's model confirmation [S] | any money success | confetti on spending |
| Fitness rings (3.12) | arcs close; laps past 100%; Pause Rings | goal gradient + binary closure | trackers raise activity (Ferguson 2022); Pause Rings watchOS 11 [S] | a daily or weekly goal the user sets | unpausable rings |
| Stand nudge at :50 | a wrist tap 10 min before the hour | a trigger the user can still act on | [O] | a deadline the user can meet | nudges after the window closed |
| Live Activities (3.8) | stages and rolling ETA on the Lock Screen and Island | glanceable transparency | ≤ 8 h, alert on essentials, end 15–30 min after [S HIG]; +23.7% retention [H, vendor] | a task minutes to hours long, with stages | promos in the island; duplicate pushes |
| Wallet pass | a loyalty card or ticket that surfaces on the Lock Screen near the place or time | context cue without opening the app | PassKit location/date relevance [S, Apple docs; not in the teardowns, verify] | a code or card used at a counter | ad-like pass updates; surfacing without consent |
| Photos Memories (3.15) | "on this day" films; hide people and dates | rediscovery (Zhang 2014) | [O] | real anniversaries in the data | no hide control; a discount on nostalgia |
| **Spotify** · play → it learns → more of "you" (PC §2) | | | | | |
| Wrapped (3.15) | a tap-through story of your year + a share card | self-disclosure reward (Tamir 2012); identity; annual ritual | 200M users on day 1, 500M+ shares [S] | ≥ a year of personal data | inflated percentiles; paywalling it |
| Discover Weekly (3.15) | a new personal mix every Monday | scheduled variable reward | [O] | content you can refresh on a rhythm | many surprise drops |
| Data-driven art (Audio Aura) | colours generated from your own listening | identity ("so me") | [S] Spotify Engineering | per-user data to map | generic art |
| "+" → green check (3.4) | the add pops into a check | optimistic acknowledgement | [O] | save actions | — |
| **Uber / Uber Eats** · upfront price → watch it come → rate (PC §3, FO §2) | | | | | |
| Car on the map (3.8) | the car glides along streets | operational transparency; labor illusion | Buell & Norton 2011 | real location data | a marker moving without events |
| Upfront price (3.9) | the fare before you commit | certainty | "an estimate, not a guarantee" [S] | any priced action | surge revealed late |
| Staged tracker + "latest arrival by" (3.8) | 5 stages with illustrations and a latest-by time | transparency; a range cuts late dissatisfaction | [S] 2019 newsroom; Jing & Qiu 2022 | staged real work | timed stages shown as live |
| Delay explained first (3.8) | a push with the reason before you notice | explained waits feel shorter (Maister) | [S] | someone who can tap the reason | a silently sliding ETA |
| Per-dish thumbs; courier rated apart (3.10) | stars for the venue, 👍/👎 per dish and for the courier | low-cost investment; fair attribution | [S] Uber legal (≥ 10 ratings over 91 days) | items worth rating | a 5-question survey |
| Uber One | membership makes delivery feel free | zero-price effect (Shampanier 2007) | ~half of bookings [S] | an aggregator with many venues | for one restaurant: churn and cancellation exposure (Grubhub FTC) |
| **Wolt** · browse → order → minute countdown (FO §1) | | | | | |
| Minute countdown hero (3.8) | one big number ticking down | known, finite waits feel shorter (Maister) | [S] App Store | an ETA from real data | an ETA that keeps slipping |
| Map only when it means something | stage text first; the map once the courier holds the food | show progress only when it happens | [S] Cannes entry | courier location | a frozen dot |
| Illustrations + warm copy (3.8) | hand-drawn characters per state | occupied time feels shorter; personality | — [O] Dribbble | a brand that can commission 3–5 pieces | stock art; endless loops |
| Quantity jump + cart bar (3.5) | the number jumps on every add | immediate feedback | [S] Wolt's motion designer (ProtoPie) | add actions | auto-added extras |
| Human support chat | chat answered by people | service recovery shapes loyalty | [S] courier page; Trustpilot waits [anecdotal] | someone who answers | bot-only dead ends |
| **Domino's** · order → named kitchen stages → "mmm!" (FO §4, §6) | | | | | |
| Named kitchen stages (3.8) | placed → make → deliver / pickup, with oven and driver-left times | labor illusion; reciprocal transparency +22.2% quality, −19.2% throughput time (Buell, Kim & Tsay 2017) | 2.5B+ orders tracked [S]; NPR found "Quality Check" is timer-driven | a staff tap or system event per stage | timed stages presented as live; a stage nobody performs |
| "mmm!" end state (3.10) | the last stage is a feeling | peak-end | [S] | any journey with an end | an upsell at the end |
| Easy Order / Zero Click (3.15) | open → the saved order, 10 s cancellable countdown | habit cue in a stable context (Wood & Neal 2007) | [S] 2016 | a repeat order | auto-submit; for a small restaurant stop at one tap |
| Tracker themes ("D.J. Slow Pans") | themed voices; a theme explains why Pan takes longer | personality; expectation setting | [S] fact sheet | a long or variable wait | — |
| 20/40/60 + Emergency Pizza (3.12) | three near rewards; a banked pizza used when you choose | small early rewards; stored reward | relaunch drew 2M new members [S]; margin −1.6 pts | real orders | silent expiry; rewards too far away |
| **Starbucks** · Stars, order ahead, pay (FO §6) | | | | | |
| Stars → tiered rewards (3.12) | stars per purchase toward rewards and tiers | goal gradient; status (Drèze & Nunes 2009) | Rewards = 58–60% of tender; 35.8M active [S] | frequent repeat purchase | tiers so wide they mean nothing; silent expiry |
| Order ahead (3.1) | order in the app, collect at the counter | the queue disappears | Mobile Order = 31–33% of transactions [S] | pickup | promising "3 minutes" nobody can meet [S, CEO] |
| Capacity slots + item cap | slots limited by capacity; a 12-item cap | an accurate promise beats a fast one | 4-min handoff target [S] | kitchen capacity data | accepting more than the kitchen can make |
| Personalised offers (Deep Brew) | offers from past orders | relevance | no published lift [H] | order history | offers that push spend |
| **Airbnb** · browse → wishlist → book → review (PC §4) | | | | | |
| Shared-element listing (3.6) | the photo grows into the hero | object constancy | [S] Airbnb engineering | image-led detail | a crossfade |
| Wishlist heart (3.4) | fill + pop; later it powers alerts | a cheap investment loads a future trigger | [O] | items users revisit | saves that never come back |
| Browse before account (3.2) | search and view with no sign-up | time-to-value | [O] | any browse | an account wall |
| Delight with a utility (2025) | check-in: open door, lights on; check-out: dark | meaning carries the motion | [S] Teo Connor | states with meaning | looping decoration |
| Search as expanding cards | Where / When / Who, one open at a time | one decision at a time | [O] | multi-input forms | — |

---

## 2. Transplant method (follow it in order)

1. **List.** Every mechanic of every app the owner named, plus the 2–3 apps §3 lists as
   most relevant to the app type. Don't stop at the north star.
2. **Fit test.** Five questions per mechanic; the verdict is *fits as-is*, *translate* or
   *drop*:
   - **Job:** does it serve what the user came to do? A mechanic that only raises opens
     is a drop.
   - **Cadence** (habit-zone gate, `engagement-retention.md`): the mechanic's native
     cadence against the product's real one. Same → as-is. Product slower → stretch the
     unit (day → week → occasion) or swap to a utility trigger (calendar, a "ready"
     push). Never a daily mechanic in a weekly product.
   - **Emotional context.** Money: confirmation, not celebration; never reward the
     frequency of spending or risk. Health: cumulative totals, streak opt-in. Food:
     appetite and ritual, never judge quantity, no alcohol as a reward. Kids and teens:
     no social obligation, no streaks, no location.
   - **Data:** what it consumes (event log, real stage events, location, social graph,
     enough similar users per cohort, a year of history). Missing → cost it or drop it.
     Rankings and cohorts stay hidden until the count is large enough to be true.
   - **Ethics:** the catalogue's "Don't copy" column, `benchmark-apps.md` §5,
     `emotional.md` gate.
3. **Translate: keep the engine, change the surface and the cadence.** Name the engine
   first, then design a surface native to the product:

   | From (app) | Engine kept | To | What changes |
   |---|---|---|---|
   | Daily streak (Duolingo) | loss aversion, identity, repair | weekly ritual streak | the user picks the day; unit = a week; 1 free freeze a month, auto-applied; a pause for holidays |
   | XP (Duolingo) | goal gradient, endowed progress | stamps toward a named reward | real actions only; 2 endowed with a reason; the next reward named and pictured |
   | Leagues (Duolingo) | small-cohort comparison, weekly reset | small local cohorts or "favourites" | rank *items* or opt-in teams of ≤ 10; Monday reset; hidden until counts are real |
   | Mascot (Duo, King Robert) | personality absorbs failure | the brand's own character or the chef | reacts in error, empty and success states, ≤ 1.5 s; plain words in money states |
   | Loot box / Lucky Drop | anticipation | a fixed, earned reveal | 3 taps; the value is known beforehand and never bought |
   | Stories (Instagram) | freshness, closure | "what's new this week" | a ring only when something is new; finite; a caught-up end |
   | Wrapped (Spotify) | self-disclosure, identity, annual ritual | a yearly recap | 5–8 cards of the user's own choices, same week every year, never spend |
   | Chest timer (Clash) | appointment | the real wait | a countdown to "ready" + one push when ready |
   | Kudos, emotes (Strava, Clash) | reciprocity | "thanks" to the people who did the work | a fixed reaction set, no free text |
   | Local Legend (Strava) | consistency status | a "regular" badge | rolling 90 days, counted in visits, never in money |
   | Card designer (Monzo, Revolut, Cash) | IKEA effect | one ownable artefact | name it, pick its icon; free |
   | Snapstreak, Friend Streak | accountability | a solo streak, or a "thanks" | never a shared streak that dies |

4. **Spec it** with `benchmark-apps.md` §2 tokens and the matching §3 rule: streak 3.14,
   reveal 3.13, progress and loyalty 3.12, return 3.15, social 3.17, identity 3.18,
   success 3.10, wait 3.8, push 3.16, errors 3.11. A spec names the screen, the copy the
   user sees, motion and haptic values with tags, the data it reads, and effort S/M/L.
5. **Metric and cheapest experiment.** One metric the mechanic should move, and the
   cheapest test that could kill it:
   - **fake door:** show the entry point, count taps, then say honestly "coming soon"
     (never take money or data);
   - **concierge:** staff do it by hand first (type the chef line, send the reminder
     manually to 20 regulars);
   - **5-user test:** tone and comprehension (personality copy, reveals);
   - **A/B or holdout** once traffic allows; hand off to `ab-testing`.
6. **Ethics check**, one line each: is any value random or paid? Does it celebrate
   spending? Does missing it shame the user or cost banked value? Is any urgency,
   scarcity, ranking or progress fake? Can the user pause, mute and leave? Would they
   thank you if they saw how it works? A "yes" to any of the first four → redesign or
   drop; a shipped one is a P1.

**Output format** (findings and `<audit>/borrow-from-apps.md`):

```
## Borrow from <app>
### <mechanic> → <our version's name>
- As-is fits? yes / translate / no: <why: cadence, context, data>
- Our version: <screen> · <what the user sees, as copy> · spec <values, benchmark-apps §> ·
  metric <one> · effort S/M/L · builds on <report IDs>
- Ethics: <one line>
- Don't copy: <the harmful version>
## Top 5 ideas to build first
| # | Idea (apps) | Builds on | Impact | Effort | Score | Metric | Cheapest test |
```
Score = impact (H 3, M 2, L 1) × ease (S 3, M 2, L 1). Ties: pull before polish, then
fewer prerequisites. Mark every invented name (rewards, tiers, characters) as an example
for the owner to choose. Don't re-propose what the report already has: build on its IDs.

---

## 3. Adaptations by app type (already translated)

| App type | Highest-value borrowed mechanics |
|---|---|
| **Food / restaurant** | 1 weekly ritual streak, diner picks the night, free monthly freeze (Duolingo + Strava) · 2 stamps with the next reward named and pictured, revealed in 3 fixed taps (Revolut + Clash; 3.12–3.13) · 3 kitchen stages from staff taps, a named end (Domino's) · 4 a "Collected" chain of ≤ 3 beats: enjoy → the stamp flies in → the next reward (Duolingo + Royal Match) · 5 "thank the kitchen" fixed reactions (Clash emotes + Strava kudos; reciprocal transparency) · 6 weekly dish favourites per branch (Leagues → items) · 7 the chef or a brand character in error and empty states (Duo, Wolt) · 8 a Wallet pass with the pickup code and the stamp card (Apple) |
| **Fintech** | 1 instant, specific notification (Monzo) · 2 progress as a side effect: round-ups into named pots (Monzo) · 3 what the points buy next (Revolut) · 4 freeze / defrost with undo (Monzo) · 5 self-protection limits, on instantly, off slowly (Monzo) · 6 a yearly recap of choices, never mocking (Wrapped → Year in Monzo) · 7 one free ownable card design (Monzo, Revolut, Cash App) · 8 a weekly money check-in with totals by default and the streak opt-in (Duolingo → Headspace). Celebrate goals the user set, never spending |
| **Booking** (tables, stays, appointments) | 1 a saved slot or wishlist heart that loads a "slot opened" alert (Airbnb + Resy Notify) · 2 the appointment as a countdown, a Wallet pass and one reminder (Clash timer → Apple) · 3 shared-element listing (Airbnb) · 4 a yearly "your visits" memory (Photos) · 5 a "regular" badge by visits in 90 days (Local Legend) · 6 browse before account (Airbnb) · 7 icons whose motion means a state (Airbnb 2025 doors) |
| **Learning / habit** | 1 a tiny qualifying unit + streak tick + a freeze from day 1 (Duolingo) · 2 commit to a goal after the first success (Duolingo) · 3 routine-anchored reminders (Headspace) · 4 weekly small cohorts (Leagues) · 5 personal bests only from the 2nd attempt (Strava) · 6 an in-session combo (Duolingo) · 7 a widget showing today's state (Duolingo) · 8 a saga map with the next 2–3 nodes (Candy Crush) |
| **Content / social** | 1 open on content (TikTok) · 2 a finite unread ring + a caught-up end (Instagram) · 3 an optimistic heart at the touch point (TikTok, Instagram) · 4 an up-next card instead of autoplay (YouTube) · 5 "on this day" with a hide control (Snapchat, Photos) · 6 counts on items, not people (Instagram) · 7 contextual variety in the like (YouTube) · 8 quiet hours on by default (Instagram teen) |
| **SaaS / tools** | 1 a count-up of "profile strength" on each setup step (Clash card upgrade) · 2 setup that visibly builds the workspace (Royal Match castle) · 3 fixed "nice work" reactions on teammates' completions (Clash emotes, Strava kudos) · 4 weekly pods of ~10 similar peers (Leagues) · 5 a weekly digest on a fixed weekday (Discover Weekly) · 6 personal bests ("fastest close") (Strava) · 7 dead ends that auto-offer the nearest path (Royal Match) · 8 a yearly team recap (Wrapped). No motion on frequent actions (Linear) |
| **Marketplace** | 1 a heart or saved search that powers alerts (Airbnb, Resy) · 2 seller consistency badges, never by volume of spend (Local Legend) · 3 counts on items ("popular near you") · 4 delivered / seen states for orders (WhatsApp, Snapchat) · 5 opt-in offers with real end times (Cash App) · 6 one-tap reorder (Domino's, Uber Eats) · 7 graded friction on risky first-time trades (Phantom, FT §4) |
| **Service marketplace** | 1 "Book Maria again" + favourites + recurring jobs (TaskRabbit) · 2 maintenance reminders from the last job's date and season (Thumbtack home profile) · 3 the job as live statuses on the way → arrived → done (Uber) · 4 blind two-sided reviews with sub-scores (Airbnb, Airtasker) · 5 hold-and-release payment with a visible auto-release timer (Fiverr, Upwork) · 6 "describe it or snap a photo" AI brief (Upwork, Thumbtack) · 7 providers: published tiers with grace periods (Superhost, Fiverr) and money-before-commit leads (MyBuilder). Details: `marketplace.md` |
