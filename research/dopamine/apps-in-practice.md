# Small rewards in real apps: what's documented

Research date: 2026-10-08. Scope: how shipped apps design small rewards ("dopamine boosts") and what is known about their effect.

**Tags:**
- **[S]** company-stated. This includes company executives quoted in press and podcasts.
- **[O]** observed directly by someone. The entry says who observed it and how.
- **[PR]** peer-reviewed.
- **[H]** practitioner claim or heuristic. Third-party teardowns and guides count here.

**Numbers:** every number is attributed to a source. If an effect was never published, the entry says "unknown". Numbers marked [S] are relative lifts the company reported. None of them came with baselines, sample sizes or p-values unless the entry says so.

**Method limits:**
- The web-search quota for this session ran out near the end. A few items could not be checked against primary sources, and they are flagged "unverified".
- Several company design blogs (Monzo, Revolut, Cash App, Things) publish nothing on their reward micro-interactions. For those apps, "unknown" is the honest answer.
- No app was installed and driven for this file. Where mechanics are described without a source, they are reported by third parties, and the entry names that source.

---

## Summary

1. **Duolingo has the best-documented reward stack, and its biggest wins were cheap.** These are company-stated results:
   - Notification red dot: +6% DAU.
   - Badges: +2.4% DAU.
   - Leaderboards: +17% learning time.
   - Streak Wager: +14% D7 retention.
   - Separating the streak from the daily goal: +3.3% D14 retention.

   The streak-extension animation alone was worth +1.7% 7-day retention for new learners [S]. [1][2][3][4][5]
2. **Making a streak easier to keep beat making it more exciting.** Requiring only one lesson, allowing freezes, and offering weekend protection all moved retention [S]. A test with an even lower bar (one exercise instead of one lesson) did not lift DAU [S, podcast summary]. [1][2][3][6]
3. **Streaks help when they're intact, and breaks are a real risk.** A peer-reviewed series of 7 studies (Silverman & Barasch 2023) found intact logged streaks raise later engagement relative to broken ones [PR]. The hit is worse when people blame themselves for the break. It is smaller when the streak can be repaired. Duolingo's freezes and Snapchat's paid restores are this "repair" lever in production. [57][3][23]
4. **Progress is shown constantly, and progress tricks work in the field.**
   - Pre-stamped loyalty cards: 34% vs 19% completion [PR]. [59]
   - Customers buy faster as they near a reward [PR]. [60]
   - Progress bars are not automatically good. Across 32 experiments, a constant-speed bar didn't reduce survey drop-off, and a slow-then-fast bar increased it [PR]. [58]
5. **Celebration is cheap to add and expensive to over-use.**
   - Robinhood's confetti became evidence in a regulator's complaint. It was removed in March 2021, and Massachusetts settled for $7.5M in 2024 [S/press]. [12][14]
   - A randomized experiment found hedonic gamification such as confetti and badges raised trading by about 5%. About 70% of the gap between gamified and plain platforms was self-selection [PR]. [15]
6. **"Juice" (rich feedback on every action) has an inverted-U curve.**
   - Medium and high juice beat both none and extreme (Kao 2020) [PR]. [65]
   - In a pre-registered study of 1,699 players (Kao et al., CHI 2024), amplified feedback lowered motivation. Feedback that depended on the player's success raised it [PR]. [66]
   - In one study, players rated the juicy version higher but performed worse (Juul & Begy 2016) [PR, poster]. [63]
7. **Removing waits before a reward is a recent pattern.** In 2025 Supercell removed Clash Royale's chest timers. A third-party summary says the timers delayed the reward for winning. Players now get instant post-battle "Lucky Drops", opened in a few taps, each tap a chance to upgrade rarity [S + H]. [26][27][28][29]
8. **Social rewards (likes, kudos, streaks with friends) act like reinforcement.**
   - On Instagram and in forum data, people post more often after receiving more likes [PR]. [20]
   - Strava users who got more kudos ran more. A kudos-vs-no-kudos comparison predicted signing up for the next race, though it wasn't a full randomized trial [PR/academic, via university press]. [33]
   - Snapstreaks are linked to problematic smartphone use in 13-year-olds, but only weakly [PR]. [22]
9. **Strong habit apps make the reward a daily minimum the user can reach and adjust.** Apple's rings track the least you should do each day, not the most, and users set their own goal [S]. Apple also published correlational data on frequent ring-closers [S]. [36][37]
10. **Across meta-analyses, gamification works modestly and depends on context.**
    - Learning effects: g = .49 cognitive, .36 motivational, .25 behavioral (Sailer & Homner 2020) [PR]. [53]
    - Results "lean positive" but are remarkably mixed across 819 studies [PR]. [52]
    - Effects fade with novelty, then partly recover with familiarity [PR]. [54]
    - Expected tangible rewards undermine free-choice intrinsic motivation (d about −0.3 to −0.4). Positive feedback raises it (d = +0.33) [PR]. [56]
    - A gamified class ended with lower intrinsic motivation [PR]. [55]

---

## Per-app sections

**Column guide:** Mechanic | Trigger | Channels (V = visual, M = motion, S = sound, H = haptic) | Frequency | Known effect + source.

### Duolingo

| Mechanic | Trigger | Channels | Frequency | Known effect + source |
|---|---|---|---|---|
| Correct/incorrect answer sound + colour banner | Each answer | V, M, S (haptic on mobile is unknown) | Every exercise (~10–20 per lesson) | Effect unknown. Duolingo has published no sound-design A/B tests that this search found. |
| Character reacts to a correct answer | Correct answer | V, M | Every exercise | Each character got a unique correct-answer animation [S] [9]. Effect unknown. |
| Mid-lesson "combo" interstitial | Several correct in a row | V, M, S | 0–2 per lesson | Mid-lesson animations reward a run of correct answers [S] [9]. Combo bonus up to 5 XP [H, fan wiki] [11]. Effect unknown. |
| XP + lesson-end screen | Lesson complete | V, M, S | 1 per lesson | No isolated test found. A viral "5 more minutes" claim traces to satire and should be ignored. |
| Streak extension animation (Duo spins, flame bursts; bigger on milestone days) | First lesson of the day | V, M, S | 1 per day; escalates on milestones | +1.7% 7-day retention for brand-new learners [S] [2] |
| Streak = 1 lesson (separated from the daily XP goal) | Daily | V | Daily | D14 retention +3.3%. DAU +1%. Learners on a streak +10.5% overall and +19% for new learners. Learners on a 7+ day streak +40% [S] [1] |
| Streak as a habit predictor | — | — | — | At 7 days, learners are 2.4× more likely to return the next day [S] [1] and 3.6× more likely to finish the course [S] [2] |
| Streak scale | — | — | — | Year-end 2025: ~43M DAUs with a 7+ day streak and ~15M with a 365+ day streak. The 365+ count was ~5M at end of 2023 [S, 10-K] [7] |
| Streak Freeze (up to 2 equipped) | Missed day | V | Rare | Daily active learners +0.38% after allowing 2 freezes [S] [2] |
| Streak Wager | Offered at lesson end, paid in gems | V | Occasional | D7 retention +14%. D1 and D14 also significant [S] [3] |
| Weekend Amulet | Fridays | V | Weekly | Blog: 4% more likely to return a week later and 5% less likely to lose the streak [S] [3]. Gotthilf: D7 +2.1%, D14 +4% [S] [5]. The two reports differ. |
| Leagues / leaderboards (weekly, 10 tiers) | XP earned | V, M | Continuous; weekly result | Learning time +17%. Highly engaged learners (1h/day, 5 days/week) tripled [S, Mazal] [4] |
| Badges / achievements | Milestones | V, M | Occasional | DAU +2.4%. Friends added +116%. Store purchases +13%. An earlier badge for signing up did nothing and was killed [S] [5] |
| App-icon red dot | New content | V | Passive | DAU +6% (v1, about 20 minutes of work). v2 added +1.6% [S] [5] |
| Duo coach copy (growth-mindset messages) | In-lesson | V | Occasional | D14 retention +7.2%. Beat "you're amazing" praise copy [S] [5] |
| Push notification "Hi, it's Duo" | Sent 23.5 hours after the last session | Notification | Daily | DAU +5% [S] [5] |
| Learning path (progress always visible) | Home screen | V, M | Every session | Mazal calls it probably the most successful mechanic in Duolingo. No number given [S, via secondary summary] [4]. The 2022 launch drew user backlash [H] [68] |
| Animation on checkout/promo | Paywall | V, M | — | Company says animation lifted purchase conversion. No number given [S] [10] |

**Program-level effects:**
- 4.5× DAU in four years. CURR (current-user retention rate) rose 21%, and daily churn among best users fell more than 40% [S] [4].
- About 600 streak experiments over ~4 years, with a ~50% success rate [S, podcast summary] [6].
- Q3 2025: 50.5M DAU, +36% year over year [S] [8].

### Fintech: Robinhood, Revolut, Monzo, Cash App, Apple Pay

| App / mechanic | Trigger | Channels | Frequency | Known effect + source |
|---|---|---|---|---|
| Robinhood confetti (launched 2016) | First trade, and per trade in Massachusetts' description | V, M | Per trade | Cited by Massachusetts in a Dec 2020 complaint. Removed in Mar 2021 and replaced with "floating geometric shapes" milestone visuals. A Robinhood product director said it distracted from the app's goal [S/press] [12][13]. Settled for $7.5M in Jan 2024 [14] |
| Hedonic gamification on trading (confetti and badges) | Trade | V, M | — | +5.17% trading volume causally. About 70% of the gamified-vs-plain gap was self-selection. Users with lower financial literacy preferred gamified platforms [PR] [15] |
| Regulator view | — | — | — | The SEC's 2021 staff report asked whether celebrations make investors trade more than they otherwise would [S, regulator] [16] |
| Apple Pay confirmation (checkmark + sound + haptic) | Payment approved | V, M, S, H | Per payment | Apple's HIG reportedly uses Apple Pay as its example of haptics paired with visual and audio feedback. That came from a third-party translation, and the original text was not retrieved [S, unverified] [17]. Effect unknown. |
| Revolut number roll / card flip / payment success | Balance change, card view | V, M | Per action | No company design post or data found. Mechanics are known only from Dribbble concepts and agency blogs [H]. Effect unknown. |
| Monzo (Hot Coral card, instant spend notification, one-tap freeze) | Payment, freeze | V, notification | Per payment | No Monzo publication on animation or haptics found. Effect unknown. |
| Cash App (springy motion, 650+ 3D asset library) | Send/receive | V, M | Per payment | Third-party design analysis only [H]. Effect unknown. |

### Social: Instagram, TikTok, Snapchat

| App / mechanic | Trigger | Channels | Frequency | Known effect + source |
|---|---|---|---|---|
| Likes (Instagram) | Others' actions | V, notification | Variable | Teens' reward circuitry (nucleus accumbens) was more active when viewing photos with many likes, and they were more likely to like those photos (Sherman et al. 2016, fMRI). Sample and details are from secondary sources [PR via secondary] [19] |
| Likes as reinforcement | Others' actions | — | Variable | Posting timing in 1M+ posts from 4,000+ users fits a reward-learning model. People post sooner after more likes. A follow-up experiment (n=176) showed the effect is causal [PR] [20] |
| Hidden like counts (tests 2019–21, opt-in 2021) | — | — | — | Instagram said the tests showed no particular change in well-being and split user opinion. No data was published [S/press] [18] |
| Pull-to-refresh (Brichter, Tweetie 2009) | Pull gesture | M, V | Every check | Criticised for resembling a slot-machine lever [H] [21]. Its inventor has reportedly called it addictive and said he regrets the downsides. That came via Longreads quoting the Guardian [S, secondary] [21] |
| TikTok For You feed (variable content per swipe) | Swipe | V, M, S | Seconds | No peer-reviewed study isolates the variable-reward schedule. Surveys link short-video features to addiction through enjoyment and withdrawal (n=382) [PR, cross-sectional] [24] |
| Snapstreaks | Mutual daily snaps | V (fire emoji, count) | Daily | n=2,483 Belgian early adolescents. Girls streak more. Streaking correlates with problematic smartphone use, and FOMO and self-control correlate only weakly [PR] [22]. 2023: first restore free, then $0.99 per restore, with user backlash [S/press] [23] |

### Games: Candy Crush, Clash Royale, Royal Match

| App / mechanic | Trigger | Channels | Frequency | Known effect + source |
|---|---|---|---|---|
| Candy Crush cascade + voice praise + end-of-level celebration | Match, combo, level win | V, M, S | Every move; escalates with combos | No King data found on the celebration. A GDC talk on Candy Crush audio exists, but its content was not retrieved |
| Candy Crush near-miss on failed levels | Narrow loss | V | Per failed level | Near-misses raised heart rate, frustration and the urge to keep playing more than clear losses (n=60) [PR] [25] |
| Clash Royale chests: timers, slots, tap-to-reveal | Battle win | V, M, S | Per win, with a wait | Experiment Jan 2025 (King Tower levels 1–9). Supercell said new players' expectations may differ from those at launch [S] [26]. Mar 2025: chest timers and slots removed, replaced by instant post-battle Lucky Drops. RoyaleAPI's summary says the timers delayed enjoying a win [H summarising S] [27] |
| Lucky Drop (tap-to-upgrade reveal) | Daily tasks (2024), then post-battle (2025) | V, M, S | Per battle | 3 taps, each a 20–30% chance to upgrade rarity [S] [28]. Version 2.0 switched to 1–5 stars with bonus spins [H] [29]. Retention effect unknown. |
| Clan Chest removed (2018) | — | — | — | Supercell cited "feature fatigue" and UI clutter [S] [30] |
| Royal Match board feedback + fast level flow | Every move | V, M, S | Every move | Passed Candy Crush in revenue and downloads in July 2023 [S/market data] [31]. Polish credited only in teardowns [H] [32]. No causal data. |

### Fitness and habit: Strava, Apple Fitness, Headspace, Fitbit-style trials

| App / mechanic | Trigger | Channels | Frequency | Known effect + source |
|---|---|---|---|---|
| Strava kudos | Others' taps | V, notification | Per activity | Volume: 9.6B kudos in 2021 [S, CEO] [34] and 14B in 2025 (secondary, non-English source) [34]. Radboud (Franken) found runners who receive more kudos run more often. Bekhuis & Tolsma compared athletes who got kudos with those who didn't, and kudos predicted entering the next event [academic, via university press] [33]. Interviews show kudos both motivate and add performance pressure [PR, qualitative] [35] |
| Strava PR / segment trophies | Personal best | V | Occasional | Effect unknown (none published) |
| Apple Activity rings | Move/Exercise/Stand goals | V, M, H, notification | Continuous; closing is daily | The design targets the daily minimum and lets users set goals. Blahnik: hundreds of interfaces were tried [S] [36]. Apple Heart & Movement Study: frequent ring-closers were 48% less likely to report poor sleep and 57% less likely to report high stress. This is correlational [S] [37] |
| Ring-close "fireworks" animation | Ring completed | V, M, H | Up to 3 per day | Users report the animation is sometimes suppressed by other notifications [O, Apple forum users] [38]. Effect unknown. |
| Awards / limited-edition challenges | Monthly, holidays | V, M | Monthly | Effect unknown. |
| Headspace run streak (hideable) | Daily session | V | Daily | Users can hide the streak to reduce the anxiety of failing it [O, Built for Mars teardown] [39]. Effect unknown. |
| Points and levels on Fitbit-style trackers (BE FIT, STEP UP RCTs) | Step goals | V | Daily | BE FIT (n=200): step goals hit 53% vs 32% for controls, persisting 12 weeks after the game ended. STEP UP (n=602): all three game arms beat control. Only the competition arm stayed above control afterwards [PR] [40] |

### Food, retail and loyalty

| App / mechanic | Trigger | Channels | Frequency | Known effect + source |
|---|---|---|---|---|
| Starbucks Stars (2 per $1; interactive star display, 2016) | Purchase | V, M | Per purchase | Rewards members spend about 58–60% of US company-operated tender. 35.8M 90-day active members in Q3 FY26 [S] [41]. No data on the animation itself. |
| Domino's Pizza Tracker (Jan 2008) | Order stage changes | V, M | ~5 stages per order | Stated rationale was to show customers they are being taken care of [S] [42]. No causal satisfaction data. A related lab finding: visible effort raises perceived value, and people can prefer a slower service that shows its work (Buell & Norton 2011, 5 experiments) [PR] [43] |
| McDonald's app loyalty | Purchase | V | Per purchase | ~210M 90-day active loyalty users and ~$37B loyalty sales in 2025, per trade press [S via press] [44]. No micro-interaction data. |
| Wolt motion system | Add item, wait, navigate | V, M | Per action | Motion principles are communication, navigation and personality. Examples: the item counter animates under the finger, and loaders make waits feel shorter. Delight comes from clarity, not celebration [S] [45]. Live courier map since at least 2016 [S] [45] |
| Uber Eats tracker (2019 redesign) | Order stages | V, M | 5 stages per order | Five-stage bar with animations at each step and a countdown [S/press] [46]. Effect unknown. |

### Productivity

| App / mechanic | Trigger | Channels | Frequency | Known effect + source |
|---|---|---|---|---|
| Todoist Karma | Tasks done; daily/weekly goal streaks | V | Per task; daily | 8 levels up to "Enlightened" at 50,000 points, getting harder to earn as you rise. Vacation mode and days off protect streaks. Support restores broken streaks at most 3 times [S] [47]. Effect unknown. |
| Asana celebration creatures (unicorn, plus narwhal, phoenix and yeti in 2016) | Task complete | V, M | "Occasional", i.e. random | The yeti appears only on old, hard tasks [S] [48]. Controlled by a "show occasional celebrations" setting, with the creatures under a separate "Extra delight" setting. Users ask on the forum how to turn them off [S/O forum] [48]. Effect unknown. |
| Clear (Realmac, 2012) swipe-to-complete + sounds | Swipe | M, S | Per task | Optional sound packs in 2014 ($0.99 on iOS) [S/press] [49]. Effect unknown. |
| Things 3 completion animation | Checkbox | V, M | Per task | Animations reworked in v3 [press] [50]. No source on a completion sound was found, so it is unknown. |

---

## Cross-app patterns

1. **The core action gets a tiny reward every time. Big celebrations stay rare.**
   - Duolingo rewards every answer with a sound, a colour and a character reaction. It celebrates a combo a few times per lesson, the lesson once, the streak once a day, and milestones rarely [S] [2][9].
   - Candy Crush and Royal Match give feedback on every move and a celebration only per level.
   - Apple gives up to three ring closes a day and an award monthly.
   - Pattern: the more often a reward fires, the smaller it is.
2. **Escalation is planned in advance.** Duolingo's streak animation is bigger on milestone days [S] [2]. Asana hides its rarest creature behind the hardest tasks [S] [48]. Clash Royale's Lucky Drop lets each tap upgrade the reward, so the reveal itself escalates [S] [28].
3. **Progress is always visible and never starts at zero.**
   - Visible progress: Duolingo's path, Apple's rings, Starbucks' star balance, and stage trackers at Domino's, Uber Eats and Wolt.
   - Field evidence: an artificial head start raised completion from 19% to 34% [PR] [59], and effort speeds up near the goal [PR] [60].
   - The catch: a bar that moves slowly early on increases abandonment [PR] [58].
4. **The goal is set at a floor the user can reach.** Duolingo cut the streak to one lesson [S] [1], and Apple rings target the minimum [S] [36]. When Duolingo cut the bar further, to one exercise, DAU didn't rise. Too easy captures only the least engaged users [S, podcast summary] [6].
5. **Loss protection is built in.** Duolingo has freezes, the weekend amulet and the wager. Snapchat has restores, Todoist has vacation mode and capped restores, and Headspace lets users hide the streak. This lines up with the research: a break hurts most when people blame themselves, and less when the streak can be repaired [PR] [57].
6. **Waiting is either removed or turned into a show.** Supercell removed chest timers [27]. Trackers fill unavoidable waits with visible progress [42][46]. Wolt treats loaders as a way to make waits feel shorter [45]. Buell & Norton found visible effort can outweigh speed [43].
7. **Social proof is one of the biggest rewards.** Strava kudos and Instagram likes are among the most strongly evidenced levers [PR] [20][33]. Duolingo's leaderboards (+17% learning time) and badges (+116% friends added) are partly social too [S] [4][5].
8. **Copy and tone count as a reward channel.** "Hi, it's Duo" added 5% DAU, and growth-mindset coaching beat plain praise (+7.2% D14) [S] [5]. This matches Deci et al.: informational positive feedback raises intrinsic motivation [PR] [56].
9. **Teams that publish numbers run small A/B tests.** Duolingo requires a ≥1% lift to ship and runs 3 arms at most [S] [5]. None of the "delight" apps (Monzo, Revolut, Cash App, Things, Asana) published effect data. For them, delight is a craft claim, not a measured one.
10. **The winners hold back on finance and high-stakes actions.** Robinhood's confetti on trades drew a regulator's complaint [12][14]. Apple Pay keeps confirmation to a checkmark, a tone and a single haptic (per the third-party HIG translation) [17]. The SEC's question was whether celebration makes people trade more than they otherwise would [16].

---

## The evidence on gamification

### What works (meta-level)

- **Hamari, Koivisto & Sarsa 2014** (HICSS literature review) [PR] [51]: gamification provides positive effects. The effects depend heavily on context and on the users. The commonly cited count of 24 studies wasn't verified here.
- **Koivisto & Hamari 2019** (IJIM, N = 819 studies) [PR] [52]: results lean positive, but the number of mixed results is "remarkable". The most common elements are points, badges and leaderboards. The field lacks consistent models.
- **Sailer & Homner 2020** (Educational Psychology Review) [PR] [53]: small but significant effects.
  - Cognitive: g = .49 (k = 19).
  - Motivational: g = .36 (k = 16).
  - Behavioral: g = .25 (k = 9).
  - Only the cognitive effect held up in high-rigor studies.
- **Physical activity RCTs** (BE FIT, STEP UP) [PR] [40]: points, levels and social design raise steps. Competition was the design whose effect lasted after the game ended. Small design changes alter effectiveness.

### Streaks and progress

- **Silverman & Barasch 2023** (JCR, 7 studies) [PR] [57]: intact logged streaks raise later engagement compared with broken ones. People treat keeping the streak as a goal in itself. The effect grows when people blame themselves for the break, and repairs weaken it.
- **Duolingo** [S] [1][2][3]: on Duolingo's data, the effective levers were a lower bar (one lesson), protection (freezes, amulet) and commitment (wager). The animation by itself added only a small lift.
- **Villar, Callegaro & Yang 2013** (32 experiments) [PR] [58]:
  - A constant progress indicator didn't reduce drop-off.
  - Fast-then-slow indicators reduced drop-off. Slow-then-fast indicators increased it.
  - Where a small incentive was promised, a constant indicator increased drop-off.
- **Nunes & Drèze 2006** [PR] [59]: car-wash cards with 2 of 10 stamps pre-filled were completed 34% of the time, against 19% for a blank 8-stamp card.
- **Kivetz, Urminsky & Zheng 2006** [PR] [60]: café customers buy faster as they near the free coffee. Effort resets after the reward, and the people who sped up most were the most likely to re-engage quickly.

### Game feel and "juice"

- **Swink, *Game Feel* (2009, CRC Press)** [H] [61]: describes feel as a hidden design language that creates a sense of involvement.
- **Jonasson & Purho, "Juice it or lose it"** (Nordic Game 2012, later GDC Europe) [H] [62]: built live on a Breakout clone. The added juice included tweening, squash-and-stretch, particles, sound and screen shake. Their claim is that the same mechanics with juice feel more fun and more professional.
- **Juul & Begy 2016** (FDG/DiGRA poster) [PR] [63]: players rated the juicy version higher but performed worse in it.
- **Hicks et al. 2019** (IEEE CoG, "Understanding the Effects of Gamification and Juiciness on Players") [PR] [64]: the abstract couldn't be retrieved. Hicks's thesis describes the effects of juiciness as nuanced and dependent on implementation and context.
- **Kao 2020** (Entertainment Computing 34) [PR] [65]: four juice levels (none, medium, high, extreme). Medium and high outperformed none and extreme on all measures.
- **Kao, Ballou, Gerling, Breitsohl & Deterding, CHI 2024** (pre-registered, n = 1,699) [PR] [66]:
  - Curiosity was the strongest predictor of enjoyment and the only predictor of playtime.
  - Feedback that depended on the player's success raised all three motives (effectance, competence and curiosity).
  - Amplified feedback lowered them, possibly by weakening players' sense of agency.
- **Singhal & Schneider, CHI 2021** [PR] [67]: juicy haptic "embellishments" can improve enjoyment, aesthetic appeal, immersion and meaning.

### What backfires

- **Overjustification** (Deci, Koestner & Ryan 1999, 128 studies) [PR] [56]: expected, tangible rewards undermine free-choice intrinsic motivation. The effect is d ≈ −0.28 to −0.40 depending on how the reward is earned, and stronger for children. Positive informational feedback does the opposite: d = +0.33 on free choice and +0.31 on interest.
- **Classroom badges and leaderboards** (Hanus & Fox 2015, 16 weeks) [PR] [55]: the gamified class ended with lower motivation, satisfaction and empowerment. Intrinsic motivation mediated its lower exam scores.
- **Novelty wear-off** [PR] [54]: in Rodrigues et al. 2022 (N = 756, 14 weeks), the effect fell after about 4 weeks and partly recovered between weeks 6 and 10. Supercell's "feature fatigue" reason for removing the Clan Chest is the same effect in industry [S] [30].
- **Celebrating risky or financial actions** [PR][S] [15][12][14]: hedonic gamification raised trading volume by about 5%. Users with lower financial literacy preferred gamified platforms. Regulators treat it as a conduct risk.
- **Too much juice** [PR] [65][66][63]: extreme or amplified feedback reduced competence or curiosity, or hurt performance.
- **Streak anxiety and social obligation** [PR][O] [22][35][39]: Snapstreaks are linked to problematic use in early teens, kudos bring performance pressure, and Headspace added a hide option. Paid streak repair (Snapchat restores at $0.99) drew backlash [23].
- **Near-miss design** [PR] [25]: near-misses raise arousal, frustration and the urge to keep playing. Treat this as a dark pattern, not a reward.

### Implications for the ux-audit skill

These are inferences from the evidence above.

- Give every core action a small reward tied to success, using sound, motion and haptics.
- Keep big celebrations for real milestones, and make them escalate.
- Make progress visible, and front-load it.
- Set daily goals at a minimum the user can reach and can change.
- Always offer a way to protect or repair a streak.
- Never celebrate financial, health-risk or irreversible actions.
- Make heavy celebrations opt-out and hideable (Asana, Headspace).
- Prefer informational praise ("you got 9/10 — your past-tense is improving") over prize-style rewards.
- Assume novelty wear-off after about 4 weeks, and plan variety.

---

## Sources

1. Duolingo blog, "Improving the streak": https://blog.duolingo.com/improving-the-streak
2. Duolingo blog, "How the Duolingo streak builds habit": https://blog.duolingo.com/how-duolingo-streak-builds-habit
3. Duolingo blog, "How streaks keep learners committed" (Streak Wager, Weekend Amulet): https://blog.duolingo.com/how-streaks-keep-duolingo-learners-committed-to-their-language-goals
4. Jorge Mazal (former Duolingo CPO), "How Duolingo reignited user growth", Lenny's Newsletter: https://lennysnewsletter.com/p/how-duolingo-reignited-user-growth
5. First Round Review, Gina Gotthilf (Duolingo VP Growth) on A/B testing: https://review.firstround.com/the-tenets-of-a-b-testing-from-duolingos-master-growth-hacker
6. Lenny's Podcast, Jackson Shuttleworth, "Behind the product: Duolingo streaks" (summary; transcript not read): https://www.recall.it/summary/lennys-podcast/behind-the-product-duolingo-streaks-or-jackson-shuttleworth-group-pm-retention-team
7. Duolingo Form 10-K FY2025: https://www.sec.gov/Archives/edgar/data/1562088/000162828026012494/duol-20251231.htm
8. Duolingo Q3 2025 shareholder letter: https://www.sec.gov/Archives/edgar/data/1562088/000162828025049514/q3fy25duolingo9-30x25share.htm
9. Duolingo blog, "Building character": https://blog.duolingo.com/building-character/
10. Bloomberg Línea, Duolingo acquires Gunner: https://www.bloomberglinea.com/english/duolingo-acquires-gunner-animation-studio-to-enhance-user-engagement/
11. Duolingo fan wiki, XP: https://duolingo.fandom.com/wiki/XP
12. Banking Dive, Robinhood axes confetti: https://www.bankingdive.com/news/robinhood-axes-its-signature-celebratory-confetti-displays/597647/
13. NBC Boston/CNBC, Robinhood gets rid of confetti: https://www.nbcboston.com/news/business/money-report/robinhood-gets-rid-of-confetti-feature-amid-scrutiny-over-gamification-of-investing/2343214/
14. Insurance Journal, Robinhood settles Massachusetts case for $7.5M: https://amp.insurancejournal.com/news/east/2024/01/19/756246.htm
15. Chapkovski, Khapko & Zoican, "Trading Gamification and Investor Behavior", Management Science (DOI 10.1287/mnsc.2022.02650): https://pubsonline.informs.org/doi/epdf/10.1287/mnsc.2022.02650
16. Jurist, SEC staff report on gamification of trading apps (2021): https://www.jurist.org/news/2021/10/sec-releases-report-on-gamification-of-trading-apps
17. Apple HIG, Playing haptics (Apple Pay example via third-party translation; original text not retrieved): https://developer.apple.com/design/human-interface-guidelines/playing-haptics
18. TechCrunch, Instagram tests hiding likes in the US: https://techcrunch.com/2019/11/08/instagram-hide-likes-us/embed/ ; Social Media Today: https://www.socialmediatoday.com/news/instagram-will-begin-hiding-total-like-counts-for-us-users-from-next-week/566994/
19. Sherman et al. 2016 (secondary write-up): https://allpsych.com/instagram-likes-activate-reward-regions-of-teen-brain/ ; Sherman et al. 2018, Child Development: https://pmc.ncbi.nlm.nih.gov/articles/PMC5730501
20. Lindström et al. 2021, Nature Communications: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7910435/
21. Wikipedia, Pull-to-refresh: https://en.wikipedia.org/wiki/Pull-to-refresh ; Longreads (quoting the Guardian, 2017): https://longreads.com/2017/10/10/immature-architects/
22. van Essen & Van Ouytsel 2023, Telematics and Informatics Reports: https://doaj.org/article/7e7e45c958c74b29ba203607b6f4a840
23. Social Media Today, Snapchat streak restore: https://www.socialmediatoday.com/news/snapchat-will-now-enable-users-to-restore-snap-streaks/644032/ ; PiunikaWeb, backlash: https://piunikaweb.com/2023/05/15/snapchat-charging-users-to-restore-streaks-met-with-backlash/
24. Tian, Bi & Chen 2023, Information Technology & People: https://www.emerald.com/insight/content/doi/10.1108/itp-04-2020-0186/full/pdf
25. Larche, Musielak & Dixon, Candy Crush near-misses, Journal of Gambling Studies: https://pmc.ncbi.nlm.nih.gov/articles/PMC5445157/
26. Supercell, Chest experiment for King Tower levels 1–9: https://supercell.com/en/games/clashroyale/blog/news/chest-experiment-king-tower-levels-1-9
27. RoyaleAPI, "RIP Chests" Q1 2025 update (page returned 403; content via search snippet): https://royaleapi.com/blog/rip-chests-2025-q1-update
28. Supercell, Lucky Drops release notes: https://supercell.com/en/games/clashroyale/blog/release-notes/game-update-lucky-drops/
29. RoyaleAPI, Lucky Drop 2.0: https://royaleapi.com/blog/2024-q3-update
30. Supercell, "We're removing the Clan Chest": https://supercell.com/en/games/clashroyale/blog/news/were-removing-the-clan-chest-find-out-why
31. Mobidictum, Royal Match tops Candy Crush: https://mobidictum.com/royal-match-tops-candy-crush-since-july-2023/
32. Medium, Royal Match game analysis (individual teardown): https://medium.com/@ekinmelissezer/game-analysis-for-royal-match-and-toon-blast-9c4bff8ef48b
33. Vox (Radboud University), kudos studies: https://www.voxweb.nl/en/what-kudos-can-do-for-your-motivation-and-sports-pleasure
34. Running Magazine, Strava 2021 Year in Sport: https://runningmagazine.ca/?p=83015 ; Tinhte, Strava Year in Sport 2025 (secondary): https://tinhte.vn/thread/strava-year-in-sport-2025-xu-huong-van-dong-toan-cau.4080592/
35. Hallgren, Rønne & Wagner (Copenhagen), review on Idrottsforum: https://idrottsforum.org/hallgrenetal260512/
36. Engadget, Apple Watch Activity design: https://www.engadget.com/2015-03-10-apple-watch-activity-design.html ; 9to5Mac, Blahnik memo: https://9to5mac.com/2015/03/09/jay-blahnik-memo/ ; MobiHealthNews: https://mobihealthnews.com/node/143137
37. FoneArena, Global Close Your Rings Day and Heart & Movement findings: https://www.fonearena.com/blog/451263/apple-global-close-your-rings-day-april-24.html
38. Apple Community, "Activity rings fireworks": https://discussions.apple.com/thread/252009834
39. Built for Mars, Hiding your Headspace streaks: https://builtformars.com/ux-bites/hiding-your-headspace-streaks ; Headspace Help: https://help.headspace.com/hc/en-us/articles/6096184071323-Updated-Profile
40. BE FIT trial (Patel et al. 2017): https://pmc.ncbi.nlm.nih.gov/articles/PMC5710273 ; STEP UP trial (Patel et al. 2019): https://pmc.ncbi.nlm.nih.gov/articles/PMC6735420
41. Starbucks Q3 FY26 Digital IR Dashboard: https://s203.q4cdn.com/326826266/files/doc_financials/2026/q3/Q3-FY26-Digital-IR-Dashboard.pdf ; TechCrunch 2016 app redesign: https://techcrunch.com/2016/04/12/starbucks-rolls-out-a-more-personalized-mobile-app-along-with-a-revamped-rewards-program
42. Domino's, Tracker 15th birthday: https://media.dominos.com/stories/tracker-15th-birthday/ ; State News 2008: https://statenews.com/article/2008/02/feature_tracks_pizza_orders ; NPR Planet Money (fetch timed out; content via search snippet): https://www.npr.org/transcripts/nx-s1-5974101
43. Buell & Norton 2011, "The Labor Illusion", Management Science: https://ideas.repec.org/a/inm/ormnsc/v57y2011i9p1564-1579.html
44. Restaurant Dive, McDonald's loyalty: https://www.restaurantdive.com/news/mcdonalds-loyalty-recapture-traffic-accelerating-the-arches/739741/
45. ProtoPie, How Wolt does product motion design: https://www.protopie.io/blog/how-wolt-uses-protopie-for-product-motion-design ; Cannes Lions, Wolt: https://lovethework.com/work-awards/campaigns/wolt-39547
46. Mobile Marketing Magazine, Uber Eats tracking redesign (2019): https://mobilemarketingmagazine.com/uber-eats-enhances-order-tracking-as-part-of-redesign/
47. Todoist Help, Introduction to Karma: https://todoist.com/help/articles/introduction-to-karma-OgWkWy
48. Asana, "New celebrations: Meet the yeti": https://asana.com/inside-asana/new-celebrations-meet-the-yeti ; Asana Forum: https://forum.asana.com/t/option-to-remove-unicorn-and-monsters-etc/27462
49. The Next Web, Clear sound packs (2014): https://thenextweb.com/news/simple-list-app-clear-finally-supports-reminders
50. MacG, Things 3 review: https://www.macg.co/logiciels/2017/05/things-passe-enfin-la-troisieme-98456
51. Hamari, Koivisto & Sarsa 2014: https://research.aalto.fi/fi/publications/does-gamification-work-a-literature-review-of-empirical-studies-o/
52. Koivisto & Hamari 2019, IJIM: https://ideas.repec.org/a/eee/ininma/v45y2019icp191-210.html
53. Sailer & Homner 2020: https://opus.bibliothek.uni-augsburg.de/opus4/frontdoor/index/index/docId/109056
54. Rodrigues et al. 2022, novelty and familiarization effects: https://www.universityxp.com/research/2022/10/3/gamification-suffers-from-the-novelty-effect-but-benefits-from-the-familiarization-effect-findings-from-a-longitudinal-study
55. Hanus & Fox 2015, Computers & Education (author page): https://osu.academia.edu/MichaelHanus
56. Deci, Koestner & Ryan 1999, Psychological Bulletin: https://home.ubalt.edu/ntygmitc/642/Articles%20syllabus/Deci%20Koestner%20Ryan%20meta%20IM%20psy%20bull%2099.pdf
57. Silverman & Barasch 2023, JCR: https://www.colorado.edu/business/faculty-research/2023/04/19/or-track-how-broken-streaks-affect-consumer-decisions
58. Villar, Callegaro & Yang 2013: https://research.google/pubs/where-am-i-a-meta-analysis-of-experiments-on-the-effects-of-progress-indicators-for-web-surveys/
59. Nunes & Drèze 2006, JCR: https://ideas.repec.org/a/oup/jconrs/v32y2006i4p504-512.html
60. Kivetz, Urminsky & Zheng 2006, JMR: https://business.columbia.edu/sites/default/files-efs/pubfiles/1200/goalgradient.pdf
61. Swink, *Game Feel* (CRC Press): https://www.routledge.com/Game-Feel-A-Game-Designers-Guide-to-Virtual-Sensation/Swink/p/book/9780123743282
62. Game Developer, "Is your game juicy enough?" (Jonasson & Purho): https://www.gamedeveloper.com/design/video-is-your-game-juicy-enough-
63. Juul & Begy 2016: https://adk.elsevierpure.com/en/publications/good-feedback-for-bad-players-a-preliminary-study-of-juicy-interf
64. Hicks et al. 2019, IEEE CoG (DOI 10.1109/CIG.2019.8848105): https://bibsonomy.org/bibtex/283161ba9a53cb0aa35a39700494205e
65. Kao 2020, Entertainment Computing (via Improbable Research): https://improbable.com/tag/rpg/
66. Kao et al. 2024, CHI: https://spiral.imperial.ac.uk/entities/publication/253c32f5-d124-4a23-88b5-9aaaf114608d
67. Singhal & Schneider 2021, CHI, juicy haptics: https://uwspace.uwaterloo.ca/items/739bca60-4670-4ea7-bc4d-c1ddd2242b26/full
68. Duolingo blog, new home-screen path (2022): https://blog.duolingo.com/new-duolingo-home-screen-design
