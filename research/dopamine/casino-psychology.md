# Casino and slot-machine psychology: what to borrow, what to flag

Research for the ux-audit skill's reward and ethics guidance. Scope: how gambling products engineer reward, the evidence behind each technique, what regulators have banned, and how that maps to non-gambling apps such as food ordering and fintech. General dopamine neuroscience, app case studies, sound/haptic specs and general dark-pattern law are covered in sibling files.

**Tags.** [PR] peer-reviewed · [RV] review/meta-analysis · [BK] academic book · [REG] regulator/statute · [POP] press/practitioner. Confidence is **H**igh, **M**edium or **L**ow. `S#` points to the numbered source list at the end, which gives the URL or DOI. "Unverified" means we could not confirm the claim from a primary or reliable secondary source.

---

## Summary

1. **Slots run on a random-ratio schedule.** Each spin is independent, and payouts arrive after an unpredictable number of plays. Variable-ratio schedules produce high, steady responding and resist extinction [BK S1, H]. What players feel is shaped more by early wins and by how long losing streaks last than by the average hit rate [PR S2, M]. Uncertainty has its own dopamine signal, which peaks at 50% reward probability [PR S3, H]. So an honest "will I get it?" moment is rewarding in itself. You don't need to rig anything.
2. **Losses disguised as wins (LDWs) are the best-evidenced manipulation.** These are payouts below the stake that the machine celebrates as wins. They produce skin-conductance arousal close to real wins [PR S4, H]. Players count them as wins [PR S5, H], and celebratory sound drives the miscount [PR S6, S7, H]. Great Britain bans celebrating any return at or below the stake [REG S20, H].
3. **Near-misses act on the brain and body. Whether they make people play longer is contested.** Near-misses recruit win-related circuitry and raise the urge to play [PR S8, S9, H]. Behavioural persistence effects are mixed: one study found 33% more games played [PR S10, M], and a review plus new experiments found no effect [PR/RV S11, M]. The manipulation is showing near-misses more often than chance would, which Reid (1986) flagged and virtual-reel mapping makes possible [PR S12, S13, M].
4. **Illusion of control.** In Langer's study, people who chose their own lottery ticket priced it at $8.67, against $1.96 for an assigned ticket [PR S14, S15, H]. Reel "stop" buttons strengthen beliefs about control and increase how many games people play [PR S16, M].
5. **Speed raises intensity.** Faster games are preferred, especially by problem gamblers, and tend to produce more wagers [RV S17, M]. Great Britain's response: a 2.5 s minimum per slot cycle, 5 s for other casino games, and bans on turbo, slam-stop and autoplay [REG S20, S21, H].
6. **The "machine zone".** Heavy machine gamblers play to keep playing rather than to win, and the industry optimises for "time on device" [BK S18, H]. "Dark flow" during play correlates with problem-gambling severity and depression [PR S19, M].
7. **Casino-environment folklore is weaker than claimed.** Friedman's low-ceiling, maze-like floor is a practitioner doctrine [POP S28, M]. The idea that "no clocks or windows" was designed to make players lose track of time is unverified. Loyalty-card use is associated with higher-risk gambling, but the evidence is correlational [PR/REG S30, M].
8. **Mobile games borrow the slot toolkit.** Loot-box spending correlates with problem-gambling severity at r ≈ .26–.27 [RV S33, S34, H]. Near-misses in Candy Crush raise the urge to keep playing [PR S35, H]. Rarer loot-box rewards produce larger arousal [PR S36, M]. Spending on social-casino microtransactions predicted migration to real-money online gambling, and 26% migrated within 6 months [PR S37, M]. Regulators have acted in Belgium (2018), Japan (2012), China (2017) and Australia (2024). EU consumer authorities challenged a forced "spin the wheel" in a retail app (2024) [REG/POP S38–S42, M–H].
9. **Harm is concentrated.** In Great Britain, 2.4–2.7% of adults score PGSI 8+ (2023–2025) [REG S24, M]. Australia's Productivity Commission estimated that problem gamblers account for 22–60% of gaming-machine spending [REG S27, M]. Regulators protect young adults with a £2 slot stake cap for ages 18–24 [REG S22, H]. Among 11–17s, 27% had spent their own money on gambling in the past year [REG S25, H].
10. **The rule for apps.** Borrow the honest mechanisms: immediate feedback, anticipation that resolves truthfully, celebration in proportion to a real gain, visible progress, and transparent earned rewards. Never randomise rewards that people pay for. Never celebrate spending or a net loss. Never fake "almost". Never remove stopping cues or hide money behind tokens. Never speed up money decisions.

---

## 1. Reinforcement schedules and uncertainty

| Claim | Tag | Conf. | Src |
|---|---|---|---|
| Ferster & Skinner (1957) mapped how schedules shape response patterns, with variable ratio (VR) as one schedule. Standard summaries: VR gives the highest, steadiest response rates and strong resistance to extinction, because the learner cannot tell when the next reward is due. | BK | H | S1 |
| The partial-reinforcement extinction effect is real but depends on how training was arranged, so it is not a universal law. | PR | M | S1b |
| Slots are technically *random-ratio*: every spin has a fixed probability. Haw (2008) argues that the number of early wins and the length of unreinforced runs matter more than the average win frequency the industry reports. | PR | M | S2 |
| Payout tables (PAR sheets) set hit frequency, payback percentage and symbol weights. Harrigan & Dixon obtained four Ontario PAR sheets through freedom-of-information requests and showed how the math produces frequent small wins, near-misses and bonus modes. | PR | H | S12 |
| Fiorillo, Tobler & Schultz (2003), working with macaques: phasic dopamine tracks reward probability. A separate sustained signal ramps up before a possible reward and is largest at p = 0.5, so uncertainty itself is coded. | PR | H | S3 |

**Implication.** A reveal with a genuinely uncertain outcome is intrinsically engaging. This is the mechanism a designer can use honestly, for example "how much did I save this month?" The harm starts when the uncertainty is attached to the user's money, or when its odds are manipulated or hidden.

## 2. Slot-machine techniques and the evidence

### 2.1 Near-misses
- **Reid 1986.** Defines a near-miss as a failure that comes close to success. In games of chance it carries no information, yet players read it as a sign their luck is turning. Lotteries and slots are built to produce near-misses more often than chance would [PR S13, H].
- **Clark et al. 2009 (*Neuron*).** Near-misses felt less pleasant than full misses but raised the desire to play. They recruited the ventral striatum and insula, the same regions as wins. The motivation effect appeared only when the participant had personal control over the gamble [PR S8, H].
- **Habib & Dixon 2010.** In 11 pathological and 11 non-pathological gamblers, near-misses activated win-related regions in the pathological group and loss-related regions in the controls. No behavioural differences were found, and the sample was small [PR S9, M].
- **Côté et al. 2003.** On a video lottery terminal, 27% near-win outcomes led to 33% more games played than a no-near-win control [PR S10, M].
- **Counter-evidence.** Pisklak, Yong & Spetch (2019/2020) reviewed the literature and ran experiments in pigeons and humans. They found no evidence that near-misses reinforce persistence [PR/RV S11, M]. **Takeaway:** the arousal and urge effects are robust. Longer play is plausible but not settled.
- **How it is engineered.** "Virtual reel mapping" weights blank stops next to jackpot symbols so jackpots show just above or below the payline. Nevada's 1989 ruling banned algorithms that create near-misses *on* the payline but allowed off-line ones produced by virtual reel mapping [PR S12b, M].

### 2.2 Losses disguised as wins (LDWs)
- **Dixon et al. 2010 (*Addiction*).** Forty novices played a multiline slot. Skin-conductance responses for LDWs matched those for wins and were larger than for losses [PR S4, H].
- **Jensen et al. 2013.** Players who saw more LDWs overestimated how many times they won, and most called LDWs "wins" when thinking aloud [PR S5, H].
- **Mechanism.** Multiline games let players bet on many lines at once, so a partial payout below the total stake still triggers win lights and sounds. Clark & Sharman note that LDWs also occur in electronic roulette [PR S7, M].

### 2.3 Celebratory sounds and lights
- **Dixon et al. 2014.** Ninety-six gamblers played with and without win sounds. Sound increased physiological and subjective arousal, most players preferred the version with sound, and they overestimated how often they won [PR S6, H].
- **Dixon et al. 2015.** Swapping the win jingle on LDWs for a negative sound made most players classify LDWs correctly as losses, and their win estimates became accurate [PR S7, H]. **This is the key design lever: sound tells people how to interpret an outcome.**
- **Loba et al. 2001.** Sensory features, meaning speed combined with sound, produced the largest differences in gamblers' reactions [PR S7b, M].
- **Regulatory consequence.** Great Britain's RTS 14F bans win-associated sounds or visuals for returns at or below the total stake. A brief neutral sound confirming the result is allowed [REG S20, H].

### 2.4 Illusion of control
- **Langer 1975.** Features borrowed from skill situations, such as choice, familiarity and involvement, make people overconfident in chance tasks. Ticket choice raised resale price from $1.96 to $8.67 [PR S14, S15, H].
- **Ladouceur & Sévigny 2005.** A VLT "stop" button made players believe timing affected outcomes, and it increased the number of games played [PR S16, M]. Later work suggests the effect is driven more by conditioning than by belief [PR S16b, L–M].
- **Clark 2009.** The near-miss urge appeared only when the player chose the gamble [PR S8, H].

### 2.5 Speed of play and event frequency
- **Harris & Griffiths 2018 review (11 studies).** Faster games got stronger preference and excitement ratings at every level of problem severity. Problem gamblers in particular were drawn to them. Behavioural evidence, mostly correlational, trends toward more wagers and longer play [RV S17, M].
- **Ladouceur & Sévigny 2006.** A high-speed group played more games and underestimated how many they had played [PR S17b, M].
- **Regulatory rules.** Slots need at least 2.5 s per cycle, and other online casino games at least 5 s (since 17 Jan 2025). Each cycle needs a fresh press, and holding a button does not count. Turbo, quick spin and slam stop are banned, and so is autoplay [REG S20, S21, H]. Victoria (Australia) requires new pokies approved from Dec 2025 to take at least 3 s per spin [REG S26, M].

### 2.6 The machine zone, continuous play, and removing stopping cues
- **Schüll, *Addiction by Design* (2012).** Fifteen years of ethnography in Las Vegas. Heavy machine gamblers seek a trance-like "zone" and play to keep playing, not to win. The industry uses game math, ergonomics, "ambience management", player tracking and cash access to maximise "time on device" [BK S18, H].
- **Dixon et al. 2018.** Multiline games produced more positive affect. Dark flow correlated with PGSI score, more strongly on multiline games, and with depression [PR S19, M].
- **Stopping cues regulators restored:** visible session net position and elapsed time; no autoplay; no auto re-buy or top-up; no "win-back" messages; no free games offered after a player has left; withdrawals that cannot be reversed (RTS 14A/14B) [REG S20, S21, H].

### 2.7 Credits instead of money
- **Raghubir & Srivastava 2008.** Scrip (a stored-value certificate) was spent more freely than cash of the same face value. Making the act of paying more salient reduced the gap [PR S31, H].
- **Gambling-specific evidence is weaker.** Cash versus vouchers on a real slot showed only weak effects [PR S32, M]. One simulated-slot study found people bet less when each credit was worth more (unverified detail) [PR S32b, L].
- **Regulatory responses** target salience rather than tokens directly. GB requires display of net spend and time [REG S21, M]. Australia banned credit cards and digital currency for online wagering from 11 Jun 2024 [REG S43, M].

### 2.8 Free spins, bonus rounds, jackpots, streaks
- **Jackpots.** In a real-money experiment, bets were 20.3% higher on large deterministic jackpots and 17.8% higher on large progressive jackpots. Small jackpots had no effect [PR S29, M].
- **Free spins.** A PhD thesis found that a free-spins feature did not increase persistence (not peer-reviewed) [L S32c]. Peer-reviewed evidence on bonus-round anticipation: *unverified / not found*.
- **Hot and cold streaks.** People expect random sequences to reverse (gambler's fallacy), yet expect their own run of correct predictions to continue (hot hand), even for the same sequence [PR S44, H]. Slots exploit both: "it's due" and "I'm on a roll".
- **Bonus terms.** GB caps wagering requirements at 10× and bans mixed-product offers from 19 Jan 2026 [REG S23, M].

### 2.9 Casino environment and loyalty
- **Friedman (*Designing Casinos to Dominate the Competition*, c. 2000).** Segmented, low-ceilinged, maze-like floors packed with machines, and no central pathways, to raise the share of visitors who stop to play [POP S28, M]. The book is industry doctrine, not a study.
- **Finlay/Kanetkar (Guelph).** In lab simulations, "playground" designs (high ceilings, themed spaces) were more pleasant and restorative than Friedman-style "gaming" designs. Press reports also say playground gamblers stayed longer and bet more [POP S28b, L–M]. The original journal article was not retrieved.
- **"No clocks, no windows, to make you lose track of time".** Widely repeated. We found no peer-reviewed test of its causal effect, so this is **unverified**.
- **Loyalty cards and players' clubs.** In 6 of 7 Australian prevalence surveys, card use went with higher-risk gambling. Card users in a tracked sample were 2.28× more likely to be moderate-risk or problem gamblers. The data are correlational, and heavier players may simply join more [PR/REG S30, M]. Victoria now requires loyalty schemes to share data with its pre-commitment system [REG S26, M].
- **Personalised offers built from tracking data.** Schüll documents this practice [BK S18, H]. GB now bans offering free games to players who have left (RTS 14A) [REG S20, H].

## 3. Social casino, gacha and loot boxes

- **Loot boxes and problem gambling.** Zendle & Cairns 2018 surveyed 7,422 gamers: loot-box spending was associated with problem-gambling severity (η² = .054). Spending on non-random in-game items showed almost no association (η² = .004) [PR S33, H]. Meta-analyses: r = .26 (.37 after trim-and-fill) [RV S34, H] and r = .27 [RV S34b, H]. All of this is correlational, and the direction of cause is unknown.
- **"Predatory monetisation"** (King & Delfabbro 2018). Purchase systems that hide or defer the real cost until the player is invested [PR S45, M].
- **Mobile near-miss.** Sixty Candy Crush players: near-misses were the most frustrating outcome, more arousing than losses, and produced the strongest urge to continue [PR S35, H].
- **Rarity and arousal.** Rarer loot-box items gave larger skin-conductance responses and stronger urges to open more boxes. Arousal also rose before the reveal [PR S36, M].
- **Social casino.** In 409 social-casino players who had never gambled online, 26% had migrated to online gambling within 6 months. Microtransaction spending was the only unique predictor [PR S37, M].
- **Gacha "pity".** A guaranteed top-tier item after N failed pulls (hard pity), or rising odds as the counter climbs (soft pity), is common industry practice. It is framed as consumer protection but works as a sunk-cost anchor. Peer-reviewed evidence is thin: one 2025 RCT reports that pity systems affect spending intention, but the details are unverified [L S46].
- **Regulators.**
  - Belgium (Apr 2018) found paid loot boxes in three games to be illegal games of chance [REG/POP S38, M].
  - Japan (2012) found "kompu gacha" (collect-a-set gacha) unlawful under its premiums law, which is narrower than a full gacha ban [POP S39, M].
  - China (2017) requires disclosure of loot-box odds, but compliance is poor: only 5.5% of games show odds on the purchase page [PR S40, H].
  - Australia (from 22 Sep 2024) rates games with paid loot boxes M (advisory) and simulated gambling R18+ (legally restricted) [POP S41, M].
- **Spin-the-wheel in retail.** In Nov 2024, the EU CPC network (consumer authorities plus the European Commission) told Temu that forcing users to play a "spin the fortune wheel" to access the marketplace, while hiding the reward conditions, may breach consumer law. We found no final decision [REG/POP S42, M]. Peer-reviewed evidence on retail wheels specifically: *not found*.

## 4. Who is harmed and how much

| Fact | Tag | Conf. | Src |
|---|---|---|---|
| Great Britain, adults scoring PGSI 8+: 2.5% (2023), 2.7% (2024), 2.4% (2025). The regulator warns its method may overstate prevalence. | REG | M | S24 |
| Australia, Productivity Commission 2010: problem gamblers account for an estimated 22–60% of gaming-machine spending. It recommended a bet limit of about $1 per button push. | REG | M | S27 |
| GB young people (11–17, 2024): 27% spent their own money on gambling in the past year; 1.5% scored at the problem level (0.7% in 2023). | REG | H | S25 |
| Loot boxes and gambling-like features are linked to problem gambling in young people and in gamers generally (correlational). | RV | H | S33–S34b |
| "Dose" evidence is mostly relative, not absolute. Near-wins at 27% of outcomes gave +33% games [S10]. Large jackpots gave +17.8–20.3% bet size [S29]. LDW arousal is roughly equal to win arousal [S4]. Sound inflated win estimates [S6, S7]. No source gives a safe threshold for any technique. | PR | M | — |

**Regulator rules (verified):**
- **GB online slots (in force 31 Oct 2021).** Autoplay banned. Minimum 2.5 s per cycle. Turbo, quick spin and slam stop banned. No celebration of returns at or below the stake. Reverse withdrawals banned. Net position and session time must be displayed [REG S20, S21, H]. GB's 2023 evaluation: the share of slot sessions over 60 min fell from 7.8% to 6.9%, with no rise in staking [REG S21b, H].
- **GB extension (17 Jan 2025).** The same principles now apply to all online casino games: 5 s minimum, no multiple simultaneous games, autoplay banned for all products [REG S21, H].
- **GB stake limits.** £5 per slot spin for adults from 9 Apr 2025. £2 for ages 18–24 from 21 May 2025 [REG S22, H].
- **GB promotions (19 Jan 2026).** Wagering requirements capped at 10×. Mixed-product promotions banned [REG S23, M].
- **Victoria, Australia.** Voluntary pre-commitment (YourPlay) on all pokies since 2015. The 2025 Act requires mandatory carded play with loss and time limits, a minimum 3 s spin on new machines, and ID for payouts of $2,000 or more. The planned cut of the machine load-up limit from $1,000 to $100 has a date that is now uncertain [REG S26, M].
- **Australia, federal.** Credit cards and digital currency banned for online wagering from 11 Jun 2024 [REG S43, M].

## 5. Translation for app design

Each row gives the gambling mechanism, the honest or flagged app version, a food-ordering (Food) and fintech (Fin) example, and the evidence.

### 5a. Borrow (ethical)

| Psychology | From | Honest app version | Food | Fin | Evidence |
|---|---|---|---|---|---|
| Immediate, contingent feedback | Instant result after each spin | Confirm every action within ~100 ms, sized to its importance | "Added to basket" pulse plus haptic tick | "Transfer sent" check plus amount | S1 (contingency), S6 (sensory feedback raises arousal) |
| Anticipation before an uncertain reveal | Reel spin; loot-box pre-reveal arousal | A short build-up before a reveal **whose outcome is real and not caused by paying** | Live ETA narrowing as the courier approaches | Month-end "you saved £X" reveal | S3, S36 |
| Celebration proportional to a real gain | Win jingles | Celebrate only net-positive outcomes the user caused or earned; scale with size | Confetti on the 10th order's free meal (net gain) | Celebrate hitting a savings goal | S4–S7 (inverse: celebrating non-gains distorts perception) |
| Visible progress | Bonus meters, collect-a-set | Deterministic progress toward a disclosed goal | Stamp card "7/10 orders" | "Emergency fund 60%" bar | S2 (perceived progress drives persistence); fixed ratio is transparent |
| Earned, transparent bonus | Free spins, comps | Rewards with stated rules, earned by real value, not chance | "Free delivery after 3 orders this month" | Cashback rate shown before purchase | S23 (regulators cap opaque bonus terms) |
| Loyalty that rewards real value | Players' clubs | Rewards that don't push extra spend; data used to protect | Points for reviews or eco-packaging | Rewards for on-time bill payment | S30 (loyalty can enable harm minimisation) |
| Sense of competence | Illusion of control | Real control over real outcomes (customise, choose) | Build-your-own bowl preview | Choose a round-up rule and see its effect | S14 (choice raises value; use where choice truly matters) |
| Honest closure | GB net-position display | Session or period summaries that end the loop | "Order delivered: rate & done" | "This month: in £X, out £Y" | S20, S21 |

### 5b. Flag (amber): acceptable only with safeguards

| Pattern | Risk source | Safeguard required | Evidence |
|---|---|---|---|
| Free mystery rewards (scratch card, surprise coupon) with **no purchase required** | Variable reward; pre-reveal arousal | Disclose odds; never sell more plays; no minors; no near-miss animation | S3, S36, S40, S42 |
| Streaks or "come back" counters linked to ordering or spending | Removing stopping cues; sunk cost | Streak-freeze; never reset in a way that punishes not spending | S18, S46 |
| Points or in-app currency | Credits obscure money | Always show the money equivalent; 1:1 or round conversion; no forced leftover balances | S31, S32 |
| Big jackpot-style promos ("win a year of free food") | Jackpot size raises bets | Show real odds; no purchase needed to enter | S29 |
| Celebrations in fintech for investing or trading actions | Celebrating a stake, not an outcome | Neutral confirmation for placing a trade; celebrate only realised milestones | S20 (RTS 14F logic) |
| One-tap reorder or repeat payment | Speed reduces deliberation | Show total and recipient on the button; offer undo | S17 |
| Personalised offers from behaviour data | Player tracking | Exclude at-risk signals such as rapid repeat spend or late-night bursts | S18, S30 |
| Any of the above aimed at minors or young adults | Higher vulnerability | Off by default for under-18s; extra limits for 18–24 | S22, S25, S41 |

### 5c. Never (red): report as manipulation

| # | Technique | Gambling origin | App manifestation | Evidence / ban |
|---|---|---|---|---|
| R1 | **Near-miss engineering** | Virtual reel mapping | Promo wheel that decelerates past the top prize; "so close!" copy on random draws; showing "1 stamp away" when the user is not | S8, S10, S12b, S13, S35 |
| R2 | **Losses disguised as wins** | Multiline partial payouts with win effects | "You saved £2!" confetti on an order where fees exceed the discount; cashback "win" smaller than the fee | S4, S5, S7; banned by RTS 14F (S20) |
| R3 | **Celebrating spending** | Win effects on a stake | Fireworks on checkout, deposit, top-up, or buying crypto | RTS 14F, RTS 14A (no encouraging more spend) (S20) |
| R4 | **Variable rewards for paying** | Loot boxes, gacha | "Spend £20, spin for a prize"; mystery box you can buy | S33, S34, S38, S40, S41 |
| R5 | **Removing stopping cues** | Autoplay; machine zone | Auto-reorder without confirmation; endless "add more" flows; hiding total spend or session; offers fired when the user tries to leave | S18, S19; autoplay ban, RTS 14A (S20, S21) |
| R6 | **Obscuring money with credits** | Credits, chips | Coin bundles that don't match prices; balances shown only in points; hidden currency conversion | S31; GB net-position rule (S21); AU credit ban (S43) |
| R7 | **Speed-ups that cut deliberation on money** | Turbo, slam stop, short cycles | Skip-the-review fast lanes for trades or top-ups; countdowns on payment screens | S17; RTS 14D/E/G (S20) |
| R8 | **Fake control over chance** | Stop buttons, "pick a box" | "Tap to stop the wheel" when the server has already decided the result | S14, S16 |
| R9 | **Chase / win-back and sticky withdrawals** | Reverse withdrawals; "win it back" | "Cancel withdrawal and get 5% bonus"; cash-out takes more steps than deposit | RTS 14A/14B (S20) |
| R10 | **Forced gamification / hidden reward terms** | Mandatory casino-style games | Must spin a wheel to enter the store; wheel prize conditions hidden | EU CPC v Temu (S42) |
| R11 | **Opaque bonus conditions tied to more spend** | Wagering requirements | "£10 credit" that unlocks only after £200 of orders, buried in T&Cs | S23 (GB 10× cap) |

---

## Audit tests for red techniques

Record a screen video with timestamps and capture network traffic where possible. Report each test as pass or fail with evidence.

| # | What to look for | What to measure | Fail if |
|---|---|---|---|
| R1 | Any chance reveal (wheel, scratch, draw, mystery box) | Run ≥ 50 reveals across test accounts. Tally final positions and "almost" stops (adjacent to the top prize, or partially revealed) against each prize's segment share or stated odds. Check copy on losing outcomes. | "Almost" outcomes appear above their visual share or above chance. Losing copy implies closeness ("so close", "nearly"). |
| R2 | Every celebration event (confetti, sound, haptic burst, "You saved/won") | For each event, compute the user's net value: discounts minus added fees, reward value minus required spend. | Any celebration where net ≤ 0, or where the celebrated amount excludes the fees that cancel it. |
| R3 | Effects on money-out actions | List the effects triggered on checkout, top-up, deposit, trade or purchase. | Win-style effects (more than a brief neutral confirmation) on any action whose main effect is that the user spends or stakes money. |
| R4 | Random outcomes that are bought or unlocked by spending | Trace every randomised reward back to its trigger. | Randomness can be bought directly or via currency bought with money. Odds are undisclosed. The feature is available to minors. |
| R5 | Loop exits | Can the user reach a natural end state? Is spend/time per session or month visible? What happens on back, close or cancel? | Auto-continue or auto-reorder without fresh confirmation. No spend summary. Retention offers or bonus pop-ups shown on exit. |
| R6 | Currencies, points, credits | Count the taps and mental arithmetic needed to know the money value. Compare bundle sizes with item prices. | Money equivalent not shown next to balances. Bundles leave unusable remainders. Conversion is not round. |
| R7 | Time from intent to irreversible money action | Measure seconds and taps for deposit, trade, top-up and reorder. Check for skip, turbo or countdown features. | A review step for an irreversible money action can be skipped. Countdown timers on payment. Withdrawal is slower than deposit by a large margin. |
| R8 | Interactive elements on chance outcomes | In the network log, check whether the result arrives before the user's tap or stop. | The interaction implies influence the user does not have. |
| R9 | Withdraw, cash-out and cancel flows | Count steps out versus steps in. Check for incentives to reverse. | Bonuses offered to cancel a withdrawal or cancellation. Withdrawal can be reversed in-app (the GB rule bans this for gambling). |
| R10 | Gating | Can the core service be used without playing a game? Are the prize terms visible before play? | A game is required to proceed, or terms are only reachable after play. |
| R11 | Bonus terms | Read terms and compute the spend needed to unlock the bonus. | Required spend is more than 10× the bonus (GB gambling benchmark) or is not stated up front. |

**Severity guide.** Any red finding that touches money, minors or a vulnerable flow is P0, meaning it blocks launch. Amber findings without their safeguard are P1.

---

## Sources

- S1 Ferster & Skinner (1957) *Schedules of Reinforcement*. [BK] https://www.bfskinner.org/wp-content/uploads/2015/05/Schedules_of_Reinforcement_PDF.pdf
- S1b JEAB (2006) study on resistance to extinction and the PRE, *JEAB*. [PR] https://pmc.ncbi.nlm.nih.gov/articles/PMC1397788
- S2 Haw (2008) Random-ratio schedules of reinforcement, *J Gambling Issues* 21:56–67. [PR] doi:10.4309/jgi.2008.21.6
- S3 Fiorillo, Tobler & Schultz (2003) *Science* 299:1898–1902. [PR] doi:10.1126/science.1077349
- S4 Dixon, Harrigan, Sandhu, Collins & Fugelsang (2010) LDWs in multi-line slots, *Addiction* 105(10):1819–1824. [PR] doi:10.1111/j.1360-0443.2010.03050.x
- S5 Jensen et al. (2013) Misinterpreting "winning" in multiline slots, *Int Gambling Studies* 13(1):112–126. [PR] doi:10.1080/14459795.2012.717635
- S6 Dixon et al. (2014) The impact of sound in modern multiline video slot play, *J Gambl Stud* 30(4):913–929. [PR] doi:10.1007/s10899-013-9391-8
- S7 Dixon, Collins, Harrigan, Graydon & Fugelsang (2015) Using sound to unmask LDWs, *J Gambl Stud* (issue 1/2015). [PR] https://www.springermedicine.com/using-sound-to-unmask-losses-disguised-as-wins-in-multiline-slot/21662046
- S7b Loba, Stewart, Klein & Blackburn (2001) Manipulations of VLT features, *J Gambl Stud* 17(4). [PR] https://www.springermedizin.de/journal-of-gambling-studies-4-2001/9371454
- S8 Clark, Lawrence, Astley-Jones & Gray (2009) *Neuron* 61(3):481–490. [PR] doi:10.1016/j.neuron.2008.12.031
- S9 Habib & Dixon (2010) *JEAB* 93(3):313–328. [PR] doi:10.1901/jeab.2010.93-313
- S10 Côté, Caron, Aubert, Desrochers & Ladouceur (2003) Near wins prolong gambling on a VLT, *J Gambl Stud* (PMID 14634302; citation details medium confidence). [PR] https://read.qxmd.com/read/14634302/near-wins-prolong-gambling-on-a-video-lottery-terminal
- S11 Pisklak, Yong & Spetch (2020) The near-miss effect in slot machines: review and experimental analysis, *J Gambl Stud* 36(2):611–632. [PR/RV] doi:10.1007/s10899-019-09891-8
- S12 Harrigan & Dixon (2009) PAR sheets, probabilities and slot machine play, *J Gambling Issues* 23:81–110. [PR] https://www.stoppredatorygambling.org/wp-content/uploads/2012/12/PAR-Sheets-Probabilities-and-Slot-Machine-Play-Implications-for-Problem-and-Non-Problem-Gambling.pdf
- S12b Harrigan (2008) Slot machine structural characteristics: creating near misses using high award symbol ratios, *Int J Ment Health Addict* 6(3). [PR] https://www.springermedicine.com/slot-machine-structural-characteristics-creating-near-misses-usi/21783820
- S13 Reid (1986) The psychology of the near miss, *J Gambling Behavior* 2(1):32–39. [PR] doi:10.1007/BF01019932
- S14 Langer (1975) The illusion of control, *JPSP* 32:311–328. [PR] https://noosphere.princeton.edu/ejap/abstracts/Langer_1975.html
- S15 Clark & Wohl (2021) commentary on Langer's illusion of control. [PR] https://pmc.ncbi.nlm.nih.gov/articles/PMC9292938/
- S16 Ladouceur & Sévigny (2005) Effects of a stopping device on illusion of control and persistence, *J Gambl Stud* 21(2). [PR] doi:10.1007/s10899-005-3028-5
- S16b Chu et al. (2018) Stop buttons, *Int Gambling Studies* 18(2):310–326. [PR] https://gamblingresearch.sites.olt.ubc.ca/files/2018/08/Chu_stoppers_AAM.pdf
- S17 Harris & Griffiths (2018) Speed of play: a critical review, *J Gambl Stud* 34(2):393–412. [RV] doi:10.1007/s10899-017-9701-7
- S17b Ladouceur & Sévigny (2006) The impact of video lottery game speed on gamblers, *J Gambling Issues* 17. [PR] https://epe.bac-lac.gc.ca/100/201/300/jrn_gambling_issues/html/2006/no17/issue17/ladouceur.html
- S18 Schüll (2012) *Addiction by Design: Machine Gambling in Las Vegas*, Princeton UP. [BK] doi:10.1515/9781400834655
- S19 Dixon et al. (2018) Dark flow, depression and multiline slot play, *J Gambl Stud* 34(1):73–84. [PR] doi:10.1007/s10899-017-9695-1
- S20 UK Gambling Commission, RTS 14 Responsible product design (14A–14G; updated 12 Jan 2026). [REG] https://www.gamblingcommission.gov.uk/standards/remote-gambling-and-software-technical-standards/rts-14-responsible-product-design
- S21 UKGC RTS updates effective 17 Jan 2025 (autoplay for all products, 5 s casino, net spend/time display). [REG] https://www.gamblingcommission.gov.uk/licensees-and-businesses/guide/page/updates-to-rts-effective-17-january-2025 ; Oct 2021 slots package: https://igamingbusiness.com/casino-games/slots/gambling-commission-announces-new-online-slot-controls-including-autoplay-ban/ [POP]
- S21b UKGC (2023) Assessment of online games design changes. [REG] https://www.gamblingcommission.gov.uk/report/assessment-of-online-games-design-changes/outcomes-reduced-play-intensity
- S22 UKGC Online slots stake limit guidance (£5 from 9 Apr 2025; £2 for 18–24 from 21 May 2025). [REG] https://www.gamblingcommission.gov.uk/licensees-and-businesses/guide/online-slots-stake-limit-guidance
- S23 UKGC promotions: 10× wagering cap and mixed-product ban, 19 Jan 2026 (via law-firm summary). [POP] https://cms.law/en/gbr/legal-updates/gambling-commission-introduces-ban-on-mixed-product-promotional-offers-and-cap-on-wagering-requirements
- S24 Gambling Survey for Great Britain, years 1–3 (reported via trade press; primary report not opened). [REG/POP] https://europeangaming.eu/portal/latest-news/2026/07/16/209370/uk-gambling-commission-gsgb-2025-annual-report/
- S25 UKGC Young People and Gambling 2024. [REG] https://www.gamblingcommission.gov.uk/report/young-people-and-gambling-2024-official-statistics/ypg-2024-involvement-in-gambling-summary
- S26 Victoria, Gambling Legislation Amendment (Pre-commitment and Carded Play) Act (passed 27 May 2025). [REG] https://www.vgccc.vic.gov.au/for-community/news-and-media/industry-news/gambling-legislation-amendment-pre-commitment-and-carded-play-bill-2024 ; https://www.senetgroup.com/news-and-insights/victorian-parliament-passes-new-pre-commitment-and-carded-play-legislation-but-implementation-set-to-be-delayed
- S27 Productivity Commission (2010) *Gambling* inquiry report (figures via secondary sources). [REG] https://www.pc.gov.au/inquiries/completed/gambling-2010/report
- S28 Friedman, *Designing Casinos to Dominate the Competition* (as reported by Las Vegas Sun, 2001). [POP] https://lasvegassun.com/news/2001/feb/19/author-sets-off-a-debate-over-casino-floor-design/
- S28b Finlay/Kanetkar casino-atmosphere research (University of Guelph news). [POP] https://news.uoguelph.ca/2012/07/casinos-atmosphere-affects-gamblers-behaviour
- S29 Li et al. (2016) Jackpot structural features: rollover and goal-gradient effects, *J Gambl Stud*. [PR] doi:10.1007/s10899-015-9557-7
- S30 Delfabbro & King (2020) Loyalty program use and higher-risk gambling in Australia (Royal Commission exhibit); Gambling Research Australia (2016) role of loyalty programs. [PR/REG] https://www.gamblingresearch.org.au/publications/role-loyalty-programs-gambling
- S31 Raghubir & Srivastava (2008) Monopoly money, *J Exp Psych: Applied* 14(3):213–225. [PR] doi:10.1037/1076-898X.14.3.213
- S32 Limbrick-Oldfield et al. (2022) Cashless gambling and the pain of paying, *Addiction Research & Theory*. [PR] doi:10.1080/16066359.2021.2009465
- S32b Simulated-slot credit-value study, *Behavior and Social Issues* (details unverified). [PR] https://link.springer.com/article/10.5210/bsi.v13i1.34
- S32c The role of free spins in slot-machine gambling (thesis, Victoria University of Wellington). https://openaccess.wgtn.ac.nz/articles/thesis/The_Role_of_Free_Spins_in_Slot-machine_Gambling/17068499
- S33 Zendle & Cairns (2018) Loot boxes are linked to problem gambling, *PLOS ONE* 13(11):e0206767. [PR] doi:10.1371/journal.pone.0206767
- S34 Garea et al. (2021) Meta-analysis of loot box spending, *Int Gambling Studies*. [RV] https://figshare.utas.edu.au/articles/journal_contribution/Meta-analysis_of_the_relationship_between_problem_gambling_excessive_gaming_and_loot_box_spending/22996898
- S34b Spicer et al. (2022) Loot boxes, problem gambling and problem gaming: systematic review and meta-synthesis, *New Media & Society* 24(4):1001–1022. [RV] https://pearl.plymouth.ac.uk/handle/10026.1/17268
- S35 Larche, Musielak & Dixon (2017) The Candy Crush sweet tooth, *J Gambl Stud* 33(2):599–615. [PR] doi:10.1007/s10899-016-9633-7
- S36 Larche, Chini, Lee, Dixon & Fernandes (2021) Rare loot box rewards, *J Gambl Stud* 37(1):141–163. [PR] doi:10.1007/s10899-019-09913-5
- S37 Kim, Wohl, Salmon, Gupta & Derevensky (2015) Do social casino gamers migrate to online gambling? *J Gambl Stud* 31(4):1819–1831. [PR] doi:10.1007/s10899-014-9511-0
- S38 Belgian Gaming Commission loot-box ruling, April 2018 (press). [POP] https://pcgamer.com/belgiums-gambling-commission-rules-against-loot-boxes-in-overwatch-fifa-18-and-csgo/
- S39 Japan kompu gacha, 2012 (press). [POP] https://www.gamedeveloper.com/business/why-quot-kompu-gacha-quot-was-banned
- S40 Xiao, Henderson, Yang & Newall (2024) Suboptimal compliance with loot-box probability disclosure in China, *Behavioural Public Policy*. [PR] https://durham-repository.worktribe.com/output/1238986
- S41 Australia game classification changes, 22 Sep 2024 (press). [POP] https://www.techradar.com/gaming/new-australian-video-game-classifications-aim-to-restrict-kids-exposure-to-loot-boxes
- S42 EU CPC network action on Temu, Nov 2024 (Irish CCPC notice). [REG] https://ccpc-newsroom.prgloo.com/news/ccpc-and-eu-consumer-authorities-inform-temu-that-they-are-under-scrutiny-for-potential-breaches-of-consumer-protection-law
- S43 Interactive Gambling Amendment (Credit and Other Measures) Act 2023 (Cth), ban in force 11 Jun 2024. [REG] https://www.legislation.gov.au/C2023A00114/latest
- S44 Ayton & Fischer (2004) The hot hand fallacy and the gambler's fallacy, *Memory & Cognition* 32(8):1369–1378. [PR] https://www.causeweb.org/cause/node/6424
- S45 King & Delfabbro (2018) Predatory monetization schemes in video games, *Addiction* 113(11):1967–1969. [PR] doi:10.1111/add.14286
- S46 Gacha pity-system research (2025 RCT, *Entertainment Computing*; details unverified). [L] https://scholar.hit.edu.cn/en/publications/monetization-mechanisms-in-gacha-games-the-behavioral-triad-of-pr/
