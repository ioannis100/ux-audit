# Teardown: games and reward loops, moved into non-game apps

**Apps:** Clash Royale (Supercell), Candy Crush Saga (King), Pokémon GO (Niantic, now Scopely), Royal Match (Dream Games).
**Why this file exists:** these four games make people open an app with no task in mind. This file pulls out the *moments* that do it and turns each one into a rule you can ship in a food-ordering, fintech or SaaS app.

**Tags.** **[S]** = stated by the company or the original author (this includes their published source code). **[O]** = observed, and the method is named. **[H]** = a practitioner or analyst claim. "unknown" = no public number exists. Nothing here was measured frame by frame.
**Research limits (read first).** In this session YouTube, GDC Vault, gamedeveloper.com, deconstructoroffun.com and supercell.com were blocked by the network proxy. So there are no talk transcripts, and every claim about those sources comes from search-result summaries of them. The one first-party motion spec (Jonasson and Purho's *Juicy Breakout* source) was read directly from [github.com/grapefrukt/juicy-breakout](https://github.com/grapefrukt/juicy-breakout). Durations for the four commercial games are therefore mostly **unknown**. Before quoting any number in a report, re-check it with screen recordings (60 fps capture, then count frames).

---

## 0. The baseline: what "juice" means, with real numbers

- **Definition.** Juice is "maximum output for minimum input": things that "wobble, squirt, bounce around, and make little cute noises" (Martin Jonasson, [Game Developer coverage of "Juice it or lose it"](https://www.gamedeveloper.com/design/video-is-your-game-juicy-enough-), Jonasson & Purho, 2012; talk video: [youtube.com/watch?v=Fy0aCDmgnxg](https://www.youtube.com/watch?v=Fy0aCDmgnxg)). Academic framing: juice is *redundant* feedback, meaning one action triggers several non-functional reactions ([Hicks et al., CHI PLAY 2019](https://doi.org/10.1145/3311350.3347171)).
- **The jelly hit, exact spec [S] (authors' source, `Block.as` → `jellyEffect`).** scaleX goes to 1.2 over **50 ms** with Quadratic.easeInOut, then springs back to 1.0 over **600 ms** with Elastic.easeOut. scaleY does the same, **delayed 50 ms**. That stagger is what turns a uniform scale into squash and stretch. Other defaults in `Settings.as`: tween-in **700 ms** with selectable Linear / Quad.easeOut / Back.easeOut / Bounce.easeOut; block destruction **2 s**; screen shake as a spring with elasticity 0.1 and power scaled by ball velocity; "freeze" (hit-stop) adjustable **0–320 ms** with 0–160 ms fade in/out; plus a paddle "face" whose eyes follow the ball. Personality counts as juice. ([repo](https://github.com/grapefrukt/juicy-breakout))
- **Hit-stop and screen shake** come from Jan Willem Nijman, "The Art of Screenshake" (2013, [video](https://www.youtube.com/watch?v=AJdEqssNZ-U)) **[H]**. In a non-game app, use hit-stop (a 30–80 ms pause before a celebration) and never use screen shake, except as a tiny shake on an error.
- **Game feel = real-time control + simulated space + polish** (Steve Swink, *[Game Feel](https://www.routledge.com/Game-Feel-A-Game-Designers-Guide-to-Virtual-Sensation/Swink/p/book/9780123743282)*, 2008) **[H]**. Swink's practical test is whether input to response feels instantaneous. He relies on the classic ~100 ms perceptual window from Card, Moran & Newell **[H]**.
- **Evidence that juice works, with a dose curve.** Kao et al. built one action RPG at four levels of juice. **Medium and high** juice beat **both none and extreme** on player experience, intrinsic motivation, play time and performance (Entertainment Computing 34, 2020; summarized in the [game-feel survey, arXiv 2011.09201](https://arxiv.org/pdf/2011.09201)). Hicks et al. found that vibrotactile "juicy haptics" (low or high) improved player experience ([CHI 2021](https://uwaterloo.ca/haptic-experience-lab/projects/juicy-haptic-design-vibrotactile-embellishments-can-improve)). Counter-evidence: Ballou, Kao, Deterding et al. (CHI 2024) found *amplified* feedback unexpectedly **reduced** motivation, and curiosity predicted enjoyment best ([Imperial repository](https://spiral.imperial.ac.uk/entities/publication/253c32f5-d124-4a23-88b5-9aaaf114608d)). **Rule: juice the moments that matter, at medium strength. Never juice everything.**

---

## 1. Clash Royale (Supercell)

**Core loop:** play a ~3-minute real-time card battle → win trophies and rewards → upgrade cards → climb the Trophy Road / arena ladder → unlock new cards → play again, with a clan for donations and chat.
**Traction:** more than **$3B** lifetime by July 2020 ([Sensor Tower](https://sensortower.com/blog/clash-royale-revenue-three-billion)) and about $4B by roughly month 92 ([Business of Apps](https://www.businessofapps.com/?p=89293)). In **July 2025** it earned **$77M gross** in one month, its best month since 2017: +50% MoM and +251% YoY, more than Brawl Stars and Clash of Clans combined (AppMagic via [PocketGamer.biz](https://www.pocketgamer.biz/is-clash-royale-having-its-brawl-stars-moment)). The comeback is credited to simpler systems and the Merge Tactics mode. Supercell's GDC lessons were "simplify, especially for returning players" and "make progression more accessible" ([GDC 2026 session listing](https://schedule.gdconf.com/session/recent-bets-outcomes-from-supercells-clash-royale/917002)).

### Signature moments

1. **Chest / Lucky reward opening (the tap-to-reveal).**
   - *Sees/hears/feels:* the player taps a container. It reacts to every tap, cards burst out one at a time with a count-up, and rarity is shown by colour and light (the legendary reveal gets its own glow and sound).
   - *Spec:* in the 2024 **Lucky Drop**, a drop took **three taps** to open, and each tap could upgrade the drop's rarity. Upgrade odds were **Common 20%, Rare 25%, Epic 30%** **[S]** ([Supercell patch notes, Lucky Drops](https://supercell.com/en/games/clashroyale/blog/release-notes/game-update-lucky-drops/), via search summary). In Oct 2025 these were replaced by **Lucky Chests** with a **pity system**, so odds improve as more are opened **[S]** ([October 2025 update](https://supercell.com/en/games/clashroyale/blog/release-notes/october-update-2025)). Per-card reveal duration, easing and haptic: **unknown**.
   - *Mechanism:* anticipation plus reward-prediction error. Dopamine neurons show sustained activity that peaks when the probability of reward is **0.5**, which is maximal uncertainty ([Fiorillo, Tobler & Schultz, Science 2003](https://doi.org/10.1126/science.1077349)). Each tap is a small "will it upgrade?" bet.
   - *Evidence:* the neuroscience above. The pity timer is Supercell's own fix for variance frustration. No public A/B data exists.
   - *Transplant:* make a guaranteed reward (a cashback amount, a loyalty voucher) a **three-tap reveal** in which each tap adds juice (a scale pop and a light haptic) but **never changes the value**. The suspense comes from the motion, not from paid odds.
2. **Timed chest slots (the pre-2024 core).** Wins earned chests that unlocked in real time (hours). Four slots meant a full queue had to be opened before more could be earned **[H]** ([Deconstructing Clash Royale, mobilefreetoplay](https://mobilefreetoplay.com/deconstructing-clash-royale/)). Supercell said at soft launch that timers made the game work for "the widest possible audience" **[S]** (reported in [Game Developer](https://gamedeveloper.com/design/breaking-down-supercell-s-next-hit-clash-royale)).
   - *Mechanism:* appointment mechanics and the Zeigarnik effect, because an unfinished timer is an open loop that pulls you back.
   - *Transplant:* "your order is being prepared" or "your report is ready at 9:00" becomes an appointment with a visible countdown and a push notification **only when it completes**. Never sell the skip.
3. **The free / crown reward for simply showing up.** A free reward on a short timer and a crown objective gave every session a goal before the first battle **[H]** ([mobilefreetoplay](https://mobilefreetoplay.com/deconstructing-clash-royale/)).
   - *Mechanism:* the session needs a reason, and an instant small win starts momentum.
   - *Transplant:* on app open, show one claimable item (a daily tip, a weekly stats card, a "your spending summary is ready" tile) that takes one tap and gives one small, satisfying response.
4. **Trophy Road / arena unlock.** A vertical road of milestones in which each arena reveals a new art theme and card pool.
   - *Spec:* **unknown**.
   - *Mechanism:* goal-gradient, since effort accelerates near a goal ([Kivetz, Urminsky & Zheng, JMR 2006](https://doi.org/10.1509/jmkr.43.1.39)), plus novelty when the arena art changes.
   - *Transplant:* make a SaaS plan or loyalty tier a road with visible *named* stops (each unlock changes something visible, such as the theme or a badge), not just a percentage bar.
5. **Card upgrade (tap Upgrade → level-up burst).** A stat count-up and an XP increment to the King Tower level.
   - *Spec:* **unknown**.
   - *Mechanism:* competence feedback (self-determination theory) plus a visible number ticking.
   - *Transplant:* when a user completes a setup step, **count the "profile strength" number up** (300–600 ms ease-out) instead of snapping it.
6. **Emotes in battle (the King's laugh, the crying face).** Taunts are fixed and pre-set, so expression stays safe.
   - *Mechanism:* social presence and play without toxicity.
   - *Transplant:* collaborative SaaS can offer fixed reaction stickers on a teammate's completion. Do not allow free-text taunting.
7. **Clan card donations.** You request a card and clanmates donate it, earning XP and gold.
   - *Mechanism:* reciprocity and a reason to check in for others.
   - *Transplant:* "a teammate needs your review" or a food app's group order where friends add items. Pull from *other people*, not from the app.
8. **The 3-minute match with overtime.** Short sessions with a hard cap and a sudden-death finale.
   - *Mechanism:* low cost to start ("just one more"), and peak-end, because overtime makes the ending the peak.
   - *Transplant:* cap onboarding or a weekly review at about 3 minutes and end on the strongest moment (the result), not on a form.

**Transitions, scrolling and buttons.** Large, chunky buttons with a pressed state (they visibly depress) and bright colour coding by action type. Exact press scale and haptic: **unknown**; to verify, record 60 fps and count frames. The balance philosophy (cards must feel distinct, not just tuned by numbers) is in Stefan Engblom's [GDC 2017 talk "Quest for the Healthy Metagame"](https://gdcvault.com/play/1024272/Quest-for-the-Healthy-Metagame).
**Onboarding to first aha:** a scripted training battle against a bot comes before any menus, so the first aha is "I placed a card and it fought for me". Steps and seconds: **unknown** (not measured this session).
**Pull with no task:** a reward is waiting (formerly a chest timer, now the daily Lucky reward), clan chat and donations, new seasons and modes, and the trophy number.
**Ethical line:** the shop used to sell chests (paid randomness). Supercell now publishes odds and added pity, which is the harm-reduced version. Transplant only the **free, deterministic** version.

---

## 2. Candy Crush Saga (King)

**Core loop:** play a short match-3 level → win and earn stars → move one node along the saga map; lose and spend a life (lives refill on a timer) → come back later or ask friends.
**Traction:** King reports that the franchise passed **$20B** lifetime ([PocketGamer.biz](https://www.pocketgamer.biz/candy-crush-celebrates-20-billion-revenue-milestone)). The Saga app alone had $3.91B by 2018 per Sensor Tower ([PocketGamer.biz](https://www.pocketgamer.biz/kings-candy-crush-saga-hits-391-billion-in-lifetime-revenues)). King had **238M MAU** across its games in Q2 2023 **[S]** (via [Business of Apps](https://www.businessofapps.com/data/candy-crush-statistics)).

### Signature moments

1. **Cascade plus voice praise ("Sweet!", "Tasty!", "Delicious!", "Divine!").** A big combo triggers a deep male voice-over and large type.
   - *Spec:* the threshold logic and durations are **unknown**.
   - *Mechanism:* variable praise. Combos come from cascades the player did not fully plan, so a lucky outcome feels like skill. Tommy Palm's GDC 2013 postmortem was titled "**Luck in the right places**": take luck out of the development process and sprinkle it "in balanced proportions throughout the map and levels" **[S]** ([Game Developer](https://gamedeveloper.com/business/video-i-candy-crush-saga-i-uses-luck-in-the-right-places)).
   - *Evidence:* juice dose-response (Kao 2020, above).
   - *Transplant:* when a user does something unusually good (paid off a card early, cleared the inbox, a fast checkout), escalate the praise copy by tier ("Nice" → "Great" → "Best week yet"). Keep it rare, or it becomes noise.
2. **"Sugar Crush" finale.** On a win, the leftover moves turn into special candies that detonate automatically and rack up bonus points.
   - *Mechanism:* peak-end rule. The last 3–5 s are the most spectacular and need no input, so this is a reward, not work.
   - *Transplant:* after a completed checkout or form, **turn leftover value into a visible bonus**. For example, unused delivery-time slack becomes "arrived 6 min early", animated as a count-up. The final screen is the peak. Never: confetti on a *money outflow* (see the Robinhood fine in §5).
3. **The near-miss loss ("so close!" plus a "+5 moves" offer).** When you fail one or two objectives short, the game says so.
   - *Evidence:* Larche, Musielak & Dixon measured skin conductance and heart rate. Candy Crush near-misses were **more arousing, more frustrating, and produced a stronger urge to keep playing** than clear losses, the same pattern as slot-machine near-misses ([J. Gambling Studies 33(2):599–615](https://uwspace.uwaterloo.ca/handle/10012/12522)). Near-misses recruit reward circuitry even though they are losses ([Clark et al., Neuron 2009](https://doi.org/10.1016/j.neuron.2008.12.031)).
   - *Transplant (benign version):* show progress honestly ("you're 1 step from finishing setup"). **Never** attach a paid offer to a near-miss moment. That is exactly the slot-machine pattern.
4. **Saga map progression with friends' faces.** A winding path of numbered nodes, with your avatar moving forward one node after a win and friends' avatars sitting at their levels.
   - *Spec:* the avatar move duration and easing are **unknown**.
   - *Mechanism:* goal-gradient, endowed progress (a pre-filled path feels started, per [Nunes & Drèze 2006](https://doi.org/10.1086/500480)) and social comparison.
   - *Transplant:* show a learning or onboarding path as a **map** in which the current node pulses and the next 2–3 are visible. Teammates' positions are optional and opt-in.
5. **Lives that refill (5 lives, regenerating over time).**
   - *Spec:* 5 lives, one regenerating about every 30 min **[H]** (community-documented; not verified this session).
   - *Mechanism:* scarcity pacing ends sessions before burnout and creates a return appointment.
   - *Transplant:* rarely appropriate outside games. The benign version is a natural daily cap ("3 new recipes unlock tomorrow"). Never block a user's *own task* behind a timer.
6. **Pre-level booster pick.** Before a level you choose boosters, which gives agency and a sense of investment before play. *Transplant:* "choose your focus for this week" before a SaaS sprint view.
7. **Daily Booster Wheel.** A free daily spin gives a random booster.
   - *Mechanism:* variable ratio reward with a daily cadence.
   - *Transplant:* only if every outcome is good and free. Prefer the "reveal of a guaranteed reward" version (Clash Royale #1).
8. **Level design rhythm.** King Berlin's Jeremy Kang frames levels around "**difficulty, rhythm, flow and hooks**", and admits designers often think a level is great when "most often it's not", so analytics decide **[S]** ([PocketGamer.biz](https://www.pocketgamer.biz/king-on-finding-the-fun-in-candy-crush)).
   - *Transplant:* alternate hard and easy tasks in onboarding or a course (sawtooth difficulty) instead of a flat or linear ramp.

**Transitions, scrolling and buttons.** Candies squash on landing and wobble when swapped. An invalid swap bounces back, which is the error state as motion, not as a dialog. *Spec:* **unknown**. The pattern matches the Juicy Breakout jelly (overshoot plus elastic settle). *Transplant:* an invalid drag or drop springs back to origin (about 250 ms spring with slight overshoot) instead of showing a toast.
**Onboarding to first aha:** level 1 is a guided swap with a hand-pointer, and the first cascade happens almost at once. Seconds: **unknown**.
**Pull with no task:** lives have refilled, a daily spin, events, friends passing you on the map, an unfinished level (Zeigarnik).
**Ethical line:** the near-miss plus a paid continue, and gold bars that hide the real-money cost. Benign version: honest progress, no paid continue at the moment of peak frustration, prices in real currency.

---

## 3. Pokémon GO (Niantic → Scopely)

**Core loop:** walk in the real world → Pokémon spawn and Pokéstops come into range → catch (throw-skill minigame) and spin stops for items → hatch eggs by distance walked → raid, trade and battle with others → fill the Pokédex.
**Traction:** more than **$6B** lifetime player spending, about $1B a year ([PocketGamer.biz](https://www.pocketgamer.biz/pokmon-go-champions-lifetime-player-spending-of-6-billion)). Over **100M** players in 2024 and about 20M weekly. Scopely bought Niantic's games business for **$3.5B** (closed May 2025) ([PocketGamer.biz](https://www.pocketgamer.biz/scopely-acquires-pokmon-go-developer-niantics-games-business-in-35bn-deal)).

### Signature moments

1. **The throw: shrinking target ring plus Nice / Great / Excellent.** A coloured ring shrinks and loops. Hitting inside it gives a text grade, and a spin gives "Curveball".
   - *Spec:* the grade depends on ring radius at hit, and the catch bonus **varies continuously** with radius **[H]** ([GamePress](https://pokemongo.gamepress.gg/node/18601)). Community multipliers conflict (Excellent around 1.85–2×, curveball around 1.7×). Niantic has not published them, so they are **unknown [S]**.
   - *Mechanism:* a skill timing loop that turns a mundane tap into mastery, with graded feedback.
   - *Transplant:* grade a skill users can improve ("Fast checkout: 14 s, Great!"). The grade is the reward, and it changes nothing else.
2. **The ball wobble (1… 2… 3… click).** The ball shakes up to three times, then a click and a star burst confirm the catch, or the Pokémon breaks out.
   - *Spec:* the number of wobbles is visible (up to 3, then the click). Durations: **unknown**.
   - *Mechanism:* staged anticipation, where each wobble is a mini-resolution, and reward uncertainty (Fiorillo 2003).
   - *Transplant:* a payment-confirmation or "submitting" state in **three paced beats** (sending → verifying → done ✓ with a success haptic). Only do this if the backend really takes that long. Never add fake delay to manufacture suspense.
3. **"Pokémon nearby" phone buzz.** A vibration pattern when something spawns near you (originally while the app was open; Adventure Sync later added background features).
   - *Spec:* haptic pattern: **unknown**.
   - *Mechanism:* an external trigger tied to the physical world; the Hook-model trigger.
   - *Transplant:* a food app buzzes **once** when the courier is 2 minutes away. Location-tied, rare and useful.
4. **Pokéstop disc spin.** You swipe the photo disc, it spins, and items pop out as bubbles you tap to collect.
   - *Mechanism:* a physical gesture plus small variable loot plus a collect-tap (a second micro-interaction that extends the reward).
   - *Transplant:* turn "claim reward" from one button into **swipe-to-spin → tap-to-collect** for loyalty stamps, so the claim becomes a gesture.
5. **Egg hatching by distance.** Eggs hatch after 2/5/7/10/12 km walked, and the hatch is a crack-crack-burst reveal.
   - *Spec:* distances **[S]** (in-game), animation timing **unknown**.
   - *Mechanism:* a delayed, effort-linked reward, which is the goal-gradient effect on a real-world behaviour.
   - *Evidence:* Pokémon GO raised walking measurably, with engaged players at **+1,473 steps a day** over about 30 days ([Althoff, White & Horvitz, JMIR 2016](https://www.jmir.org/2016/12/e315/)). The effect **faded to baseline by week 6** ([Howe et al., BMJ 2016](https://doi.org/10.1136/bmj.i6270), +955 steps in week 1). Novelty decays, so the loop needs renewal.
   - *Transplant:* a fitness or fintech "savings egg" that hatches into a visible illustrated reward when the user reaches a real behaviour target (saved €100), not when they spend.
6. **Pokédex / collection grid.** Silhouettes for unseen entries, colour for caught ones.
   - *Mechanism:* completion drive, endowed progress, identity ("I'm a collector").
   - *Transplant:* a "cuisines tried" map in a food app or a "features mastered" grid in SaaS. Show silhouettes of the next few, not of all 900.
7. **Community Day (a monthly few-hour ritual event).** A fixed slot when everyone plays at once.
   - *Mechanism:* a ritual plus synchronous social presence, which is pull with no task.
   - *Transplant:* a monthly fixed-time event (a "menu drop Friday 18:00", a "monthly money review Sunday"). The same slot every time builds a ritual.
8. **Daily first-catch / first-spin streak bonus.** The first action of the day gives a bonus, and day 7 gives a bigger one.
   - *Mechanism:* a streak with an easy daily minimum.
   - *Transplant:* a 1-action daily minimum. A missed day **resets quietly**, with no shame copy.

**Transitions, scrolling and buttons.** The map is the home screen, and every interaction is diegetic (the ball, the disc, the egg). Dennis Hwang's GDC 2017 talk covers how UX and visual choices were "shaped by our focus on real-world gaming" ([GDC Vault](https://gdcvault.com/play/1024376/-Pokemon-GO-Designing-Interactive); not transcribed, because access was blocked).
**Onboarding to first aha:** pick a starter, make your first throw, catch it, done. Easter egg: walk away from the three starters four to six times and **Pikachu** spawns ([Expert Reviews](https://www.expertreviews.co.uk/technology/gaming/how-to-get-pikachu-as-your-starter-pokemon-in-pokemon-go)). That is a secret reward for exploration, built into minute one. Seconds: **unknown**.
**Pull with no task:** "what's near me right now?", hatching eggs, friends' gifts, events, a ritual walk.
**Ethical line:** paid raid passes and incense are pay-to-access, not random. Most criticism is about safety (trespass, distraction) and decaying health effects. The benign version is what the steps data shows: reward real-world behaviour the user already wants.

---

## 4. Royal Match (Dream Games)

**Core loop:** beat a match-3 level → earn a star → spend stars on tasks that restore the king's castle area (decor meta) → finish the area, unlock the next → events (King's Cup leaderboard, team chests, win-streak gift).
**Traction:** **$1B** lifetime gross by April 2023, $2B by January 2024, **$3B** seven months later (Appfigures via [mobilegamer.biz](https://mobilegamer.biz/dream-games-royal-match-has-passed-3bn-says-appfigures/)). About **$1.4B in 2024**, +56% YoY ([Business of Apps](https://www.businessofapps.com/data/royal-match-statistics)). CVC deal at about a **$5B** valuation in 2025 ([Private Equity Wire](https://www.privateequitywire.co.uk/cvc-to-acquire-5bn-majority-stake-in-dream-games/)). Deconstructor of Fun asked "Royal Match: the new king from Turkey?" in 2021 (Taranto, cited on [Wikipedia](https://en.wikipedia.org/wiki/Royal_Match)).

### Signature moments

1. **Level win → star flies to the meta.** The earned star physically travels from the win screen to the castle-task counter.
   - *Spec:* flight duration and easing: **unknown**.
   - *Mechanism:* it makes the link between the core loop and the meta loop *visible*. Effort turns into progress you can see.
   - *Transplant:* when an order completes, **fly the earned points or stamp into the loyalty card icon** (a 400–600 ms arc along a curved path, landing with a scale-bump of about 1.15 and a light haptic). This is the most transplantable moment in the file.
2. **Castle task completion (decor restore).** You tap a task, spend stars, and the object animates into place in the area.
   - *Mechanism:* the IKEA effect / ownership plus a visual before→after.
   - *Transplant:* in SaaS, finishing setup steps visibly "builds" the workspace (the logo appears, the dashboard fills in) instead of ticking a checklist.
3. **Animated state transitions as the main language.** Analysts note that "subtle tricks communicate feedback to players without drawing attention to themselves" and that state changes are animated so players build intuition **[H]** ([Funovus](https://funovus.com/blogs/royal-match-dominates-match-3-what-can-all-designers-learn)). Animations are "short and crisp, with no wasted delay", so sessions feel faster **[H]** ([FoxData](https://foxdata.com/jp/blogs/games-redefined-match3-with-flawless-execution-and-smart-ua/)).
   - *Mechanism:* fluency. Quick feedback lowers cognitive load.
   - *Transplant:* every state change (empty → filled, locked → unlocked) is animated at 150–300 ms. No celebration should block input for more than about 1 s.
4. **Win-streak "Butler's Gift".** From level 32, consecutive wins add free boosters in three tiers, and a loss resets it **[H]** ([Medium analysis](https://medium.com/@ekinmelissezer/game-analysis-for-royal-match-and-toon-blast-9c4bff8ef48b)).
   - *Mechanism:* loss aversion on the streak plus endowed boosters that make the next win easier (a positive spiral).
   - *Transplant:* "3 on-time payments in a row → fee-free transfer" is legitimate *if* the reset is gentle and not shame-framed.
5. **Free reshuffle when you're stuck.** When no move exists, the board reshuffles for free instead of selling help **[H]** ([FoxData](https://foxdata.com/jp/blogs/games-redefined-match3-with-flawless-execution-and-smart-ua/)).
   - *Mechanism:* removes dead ends, which preserves flow.
   - *Transplant:* empty search results automatically suggest the nearest valid alternative ("no sushi open now → 3 places open in 20 min").
6. **End-of-level leftover moves become rockets.** Same pattern as Sugar Crush: leftover resources detonate into score. *Transplant:* the same as Candy Crush #2.
7. **King's Cup / team events.** A short leaderboard against peers of similar level, plus team chests.
   - *Mechanism:* bounded social comparison (a small league, not the whole world), the same idea as Duolingo leagues.
   - *Transplant:* a small opt-in cohort ("your team's weekly streak") rather than a global ranking.
8. **Character as tutorial (King Robert).** A comic, slightly incompetent king and his butler deliver the hints and the failure jokes.
   - *Mechanism:* personality turns failure into comedy instead of judgment. This is the paddle-face lesson from Juicy Breakout.
   - *Transplant:* a mascot or voice in empty and error states that laughs *with* the user. Never guilt.

**Transitions, scrolling and buttons.** Pieces fall with gravity and settle with a small bounce. Button presses are chunky. **Numbers unknown.**
**Onboarding to first aha:** you land straight in level 1, with no account and no menu. The first area task arrives within the first few levels, so the meta loop is shown early. Seconds: **unknown**.
**Pull with no task:** an unfinished castle area (Zeigarnik), an active streak, a running King's Cup, team chests.
**Ethical line:** the revenue comes from coins and boosters, not loot boxes. The pressure points are the streak-loss warning when you quit and limited-time events. Benign version: keep the streak warning factual, give one free save, never sell the save at the moment of loss.

---

## 5. The ethical line across all four

- **Belgium (2018):** the Gaming Commission treated paid loot boxes as gambling needing a licence, which no company can get, so in effect they are banned. But Leon Xiao found **82 of the top-100 grossing iPhone games** in Belgium still had them, and concluded that complete elimination "is not practically achievable" ([QMUL](https://qmul.ac.uk/law/news/2022/items/study-claims-country-wide-loot-box-ban-isnt-practically-achievable.html)).
- **Netherlands:** the KSA fined EA over FIFA packs. On **9 March 2022** the Raad van State ruled the packs were *not* a stand-alone game of chance, because they are part of a skill game ([Raad van State](https://www.raadvanstate.nl/actueel/nieuws/@130206/dwangsom-onterecht-opgelegd-loot-boxes/)).
- **FTC v. Epic (Dec 2022):** **$520M** in total, of which **$245M** is consumer redress for dark patterns. The issue was a "counterintuitive, inconsistent, and confusing button configuration" that caused charges from a single press, including while waking the game from sleep ([CBS News](https://www.cbsnews.com/news/fortnite-epic-games-ftc-520-million-fine)). **Lesson for juice: a juicy button must never be a purchase button without a confirm step.**
- **Loot boxes and harm:** in a sample of 7,422, loot-box spending was linked to problem-gambling severity ([Zendle & Cairns, PLOS ONE 2018](https://doi.org/10.1371/journal.pone.0206767)).
- **Money-adjacent celebration:** Massachusetts fined Robinhood **$7.5M** (Jan 2024) partly over confetti, digital scratch tickets and other game-like features. Robinhood had removed the confetti in 2021 ([ThinkAdvisor](https://thinkadvisor.com/2024/01/18/robinhood-to-pay-7-5m-over-gamification-practices)).
- **Gamification works, but depends on context:** in a review of the empirical studies, gamification mostly produces positive effects, which depend on context and users ([Hamari, Koivisto & Sarsa, HICSS 2014](https://doi.org/10.1109/HICSS.2014.377)).
- **Stance.** Anticipation, reveal, progress, collection, ritual and social pull are legitimate. Flag these: **paid randomness**, **near-miss plus a paid offer**, **fake timers or delays**, **shame or guilt copy on a broken streak**, **celebration of spending or trading**, and **one-tap purchases on juicy buttons**.

---

## Cross-app patterns

1. **Two loops, visibly linked.** A short core action (battle, level, catch, order) feeds a long meta (road, map, castle, Pokédex). The link is *animated*: the star flies, the avatar moves.
2. **Reveal in beats.** Tap-tap-tap (Clash), wobble-wobble-click (GO), crack-crack-burst (eggs). Three beats is the common number. Each beat gets its own motion and haptic, and the final beat gets the biggest.
3. **The end is the peak.** Sugar Crush and leftover-move rockets: the last 3–5 s are automatic spectacle (peak-end).
4. **Errors are motion, not modals.** An invalid swap springs back, and a stuck board reshuffles for free.
5. **Personality absorbs failure.** King Robert, the paddle face. Failure is funny, never shameful.
6. **Medium juice wins.** Kao 2020 found an inverted U, and Ballou 2024 found amplified feedback can backfire. Juice the 5–10 key moments, not every tap.
7. **Return triggers are real-world or social.** A courier nearby, a clanmate's request, a friend passing you, Community Day. Not "we miss you".
8. **Rituals beat random pings.** A fixed monthly or weekly slot (Community Day, season reset).
9. **Pity and transparency** are the industry's own fix for randomness. Outside games, avoid the randomness altogether.
10. **Novelty decays fast.** Pokémon GO's step effect lasted 4–6 weeks, so plan renewal (seasons, new map areas).

---

## Transplant playbook

1. **For a reward reveal**, do a **3-beat tap-to-reveal** of a *fixed* reward, like a Clash Royale Lucky Drop, because staged anticipation drives reward-prediction signals (Fiorillo 2003).
   - **Spec:** each tap: scale 1 → 1.12 (60 ms ease-out) → 1 (spring, ~400 ms, damping ~0.5), light haptic on taps 1–2, success haptic and a particle burst on tap 3. Durations are a starting point **[H]**, not taken from Supercell.
   - **Web:** `el.animate([{transform:'scale(1)'},{transform:'scale(1.12)'},{transform:'scale(1)'}],{duration:460,easing:'linear(0,1.12 13%,0.97 45%,1.01 70%,1)'})`.
   - **Native:** SwiftUI `.scaleEffect(s).animation(.spring(response:0.4,dampingFraction:0.5),value:s)` + `.sensoryFeedback(.impact(weight:.light),trigger:taps)`, then `.success`. Compose `animateFloatAsState(spring(dampingRatio=0.5f,stiffness=Spring.StiffnessMedium))` + `performHapticFeedback(HapticFeedbackConstants.CONFIRM)`.
   - **Never:** paid or variable *value*, or any purchase inside the reveal.
2. **For earned points or progress**, do a **fly-to-target** from the action to the meta counter, like Royal Match stars, because a visible effort→progress link fuels the goal gradient (Kivetz 2006).
   - **Spec:** curved path, 400–600 ms ease-in-out, target bump to 1.15 and back, light haptic on land, number count-up 300 ms.
   - **Web:** FLIP with `getBoundingClientRect` and `offset-path` / Web Animations.
   - **Native:** SwiftUI `matchedGeometryEffect` or `KeyframeAnimator`. Compose `Animatable<Offset>` along a quadratic Bézier.
   - **Never:** fly points for *spending* money ("you spent €50, +50 pts!" with confetti).
3. **For a primary button press**, do **anticipation squash plus overshoot release**, like candy swaps and Juicy Breakout, because redundant feedback raises perceived responsiveness (Hicks 2019).
   - **Spec:** press scale 0.96 at about 80 ms, release spring to 1.0 with slight overshoot; the jelly reference is +20% in 50 ms → elastic back over 600 ms, x/y staggered 50 ms **[S]** (Juicy Breakout). Use about a third of that amplitude for UI.
   - **Web:** `:active{transform:scale(.96);transition:transform 80ms}` + a spring on release via `linear()` easing.
   - **Native:** SwiftUI `ButtonStyle` with `configuration.isPressed` + `.spring(response:0.3,dampingFraction:0.6)`. Compose `Modifier.graphicsLayer{scaleX=s;scaleY=s}` with `interactionSource.collectIsPressedAsState()`.
   - **Never:** juice a purchase button without a confirm step (FTC v. Epic).
4. **For a completed flow**, end on an **automatic peak**: leftover value converted into a visible bonus, like Sugar Crush, because of peak-end.
   - **Spec:** 1.5–3 s total, skippable by tap, input unblocked after 1 s.
   - **Web:** sequenced WAAPI or `canvas-confetti` at low particle count, guarded by `prefers-reduced-motion`.
   - **Native:** `PhaseAnimator` / Compose `updateTransition`.
   - **Never:** celebrate trades, loans, bets or spending (Robinhood, $7.5M).
5. **For an invalid action**, **spring back to origin**, like a failed candy swap, because motion explains the rule without a modal.
   - **Spec:** about 250 ms spring with a small overshoot, plus a warning or error haptic.
   - **Web:** a transform transition to 0 with a `cubic-bezier(.34,1.56,.64,1)` back-ease.
   - **Native:** SwiftUI `.offset` + `.spring`, `.sensoryFeedback(.error)`. Compose `Animatable.animateTo(0f, spring())`.
   - **Never:** shake the whole screen or show shame copy.
6. **For a processing wait**, show **real stages as beats**, like the Poké Ball wobble, because staged resolution holds attention.
   - **Spec:** one beat per real backend stage, with a success haptic on the final one.
   - **Web:** stepper whose state is driven by actual events.
   - **Native:** `ProgressView` steps + `.sensoryFeedback(.success)`.
   - **Never:** fake delays to build suspense.
7. **For a long-term path**, use a **map with the current node pulsing and the next 2–3 visible**, like the Candy Crush saga map, because of endowed progress and the goal gradient (Nunes & Drèze 2006).
   - **Spec:** the node advances with a 500 ms ease-in-out move and a bump on arrival.
   - **Web:** SVG path + `offset-distance` animation.
   - **Native:** Canvas / `Path` trim animation.
   - **Never:** show the whole 1,000-node road, which makes the goal feel impossible.
8. **For collection**, use a **silhouette grid** (seen vs. unseen), like the Pokédex, because of the completion drive and identity.
   - **Spec:** a newly unlocked tile flips or colours in over about 400 ms.
   - **Web:** CSS `filter:grayscale` → 0 + scale pop.
   - **Native:** `.rotation3DEffect` / Compose `graphicsLayer{rotationY}`.
   - **Never:** make collection items purchasable at random.
9. **For a skill users repeat**, show a **grade** (Nice / Great / Excellent), like the Pokémon GO throw, because graded competence feedback builds mastery.
   - **Spec:** the grade label pops in at 200 ms with a back-ease, plus a light haptic.
   - **Web:** `el.animate([{transform:'scale(.6)',opacity:0},{transform:'scale(1)',opacity:1}],{duration:200,easing:'cubic-bezier(.34,1.56,.64,1)'})`.
   - **Native:** SwiftUI `.transition(.scale.combined(with:.opacity))` + `.sensoryFeedback(.impact(weight:.light),trigger:grade)`. Compose `AnimatedVisibility(enter=scaleIn(spring(dampingRatio=0.5f))+fadeIn())`.
   - **Never:** tie grades to money or make them public by default.
10. **For a daily return**, offer **one claimable item on open**, like Clash Royale's free or daily reward, because a session needs an instant goal.
   - **Spec:** a single tile, a one-tap claim, the reveal from rule 1.
   - **Web:** a home-screen card whose claim button uses the rule 1 reveal; the claimed state is stored server-side.
   - **Native:** SwiftUI card + `.sensoryFeedback(.success,trigger:claimed)`. Compose `Card` + `HapticFeedbackConstants.CONFIRM`.
   - **Never:** expiring "claim in 3:59!" countdowns that reset (fake urgency).
11. **For an appointment** (order prepared, report ready), show a **visible countdown plus one push when it completes**, like the old Clash chest timers, because an open loop pulls the user back (Zeigarnik).
   - **Spec:** the countdown ticks every second with tabular numerals. On completion: a scale bump, a success haptic, one push.
   - **Web:** `font-variant-numeric: tabular-nums`; a Push API notification sent from the server at completion.
   - **Native:** iOS Live Activity / Dynamic Island countdown (`Text(timerInterval:)`). Android ongoing notification with `setUsesChronometer(true)`.
   - **Never:** sell the skip, or send pings before it is ready.
12. **For a streak**, use a **low daily minimum with a free save and a quiet reset**, like the Pokémon GO first-catch and Royal Match Butler's Gift, because loss aversion motivates without needing shame.
   - **Spec:** a factual "streak: 6 days" with a flame bump on increment.
   - **Web:** CSS keyframe bump (scale 1 → 1.2 → 1, 300 ms) on the counter when it increments.
   - **Native:** SwiftUI `.contentTransition(.numericText())` + `.symbolEffect(.bounce,value:streak)`. Compose `AnimatedContent(targetState=streak)`.
   - **Never:** guilt pushes, crying mascots, or a paid streak repair at the moment of loss.
13. **For failure**, let a **character absorb it with humour**, like King Robert or the Juicy Breakout paddle face, because personality turns judgment into play.
   - **Spec:** a short illustrated reaction (≤1.5 s, skippable) plus a one-line joke and a clear retry button.
   - **Web:** Lottie / Rive animation in the empty or error state, honouring `prefers-reduced-motion`.
   - **Native:** Rive / Lottie views. SwiftUI `PhaseAnimator` for a simple bob.
   - **Never:** "You failed" headlines or near-miss upsells (Larche et al.).
14. **For social pull**, use **reciprocal requests in small groups**, like Clash Royale donations, King's Cup and team chests, because reciprocity and bounded comparison work best in small groups.
   - **Spec:** opt-in, groups of 5–30, fixed reactions.
   - **Web:** server-rendered group feed; reactions as a fixed emoji set.
   - **Native:** a reaction bar with a `.sensoryFeedback(.selection)` / `HapticFeedbackConstants.CLOCK_TICK` per pick.
   - **Never:** global leaderboards of spending.
15. **For re-engagement**, set a **fixed-time ritual event**, like Community Day, because synchronous rituals create pull with no task.
   - **Spec:** the same weekday and hour every time, announced once.
   - **Web:** calendar `.ics` add plus one reminder push. **Native:** `EventKit` add-to-calendar / Android `CalendarContract` intent, one scheduled local notification.
   - **Never:** many surprise "today only!" events.
16. **For dead ends** (no results, stuck), **auto-offer the nearest valid path for free**, like Royal Match's free reshuffle, because removing dead ends protects flow.
   - **Spec:** suggestions appear in place of the empty state within one render, with no extra tap.
   - **Web:** an empty-state component that queries relaxed filters. **Native:** the same; SwiftUI `ContentUnavailableView` with an actions slot. Compose an empty `LazyColumn` slot.
   - **Never:** a paywall at a dead end.
17. **For juice volume overall**, aim for **medium juice on 5–10 key moments**, because of the inverted U (Kao 2020; Ballou 2024).
   - **Spec:** honour `prefers-reduced-motion` / `UIAccessibility.isReduceMotionEnabled` / Android `ANIMATOR_DURATION_SCALE`. Haptics only where there is an actual outcome.
   - **Web:** `@media (prefers-reduced-motion: reduce){*{animation:none;transition:none}}` with an opacity-only fallback.
   - **Native:** SwiftUI `@Environment(\.accessibilityReduceMotion)`. Compose: read `Settings.Global.ANIMATOR_DURATION_SCALE`, or rely on the system scaling of animations.
   - **Never:** juice every tap, or use sound on by default outside games.
