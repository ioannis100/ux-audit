# Black UX: the persuasion top apps use, explained so the owner can choose

Some of the strongest retention mechanics in the best apps lean on loss aversion, guilt,
social pressure or chance. Many designers and regulators call them "black" or "dark" UX.
They often work. This file lets the audit **name them, say honestly why they are contested,
and recommend them only where they also serve the user's own goal**, so the owner decides
with full information. Evidence: `research/dopamine/` (`apps-in-practice.md`,
`casino-psychology.md`, `ethics-regulation.md`, `neuroscience.md`). Tags as in `reward.md`.

## 1. What makes a technique "black"

It works **through** a bias rather than by making the product better: loss aversion (people
weigh a loss about twice an equal gain; Kahneman & Tversky 1979, λ ≈ 2.25 in Tversky & Kahneman
1992) [PR], guilt, social comparison,
sunk cost, uncertainty (the dopamine anticipation signal peaks at a 50% chance; Fiorillo
2003) [PR]. The same lever helps a learner keep a habit they want and pushes someone into
time or money they'll regret. That is why it is contested, not because it fails.

## 2. The gate: a black technique is recommended only if all five hold

1. **The user's goal:** it pushes toward something the user came for (learning, saving,
   training, eating the meal they ordered), never toward time-in-app, spend or data for its
   own sake.
2. **True:** every loss, deadline, count and comparison it states is accurate.
3. **Easy out:** one tap to snooze, hide or turn it off, without penalty copy.
4. **Not for the vulnerable:** off for minors and anywhere children plausibly use the app;
   never in gambling, trading, credit or health-risk flows.
5. **Measured with guardrails:** it ships as an A/B test with a harm metric next to the win
   metric (opt-outs, notification disables, uninstalls, complaints, refunds, session length
   past the goal).

A technique that fails 1–4 is not recommended; one the product already uses that fails 2 or
4 is a finding (§5).

## 3. Catalogue (recommend from here, adapted to the product)

| Technique | Who does it | Why it works | Evidence it works | Why it's black (who it hurts) | Legal / regulator risk | Use only if · safeguards |
|---|---|---|---|---|---|---|
| **Loss-framed streak reminder** ("Your 12-day streak ends tonight") | Duolingo, Snapchat | loss aversion; intact streaks raise later engagement | broken streaks lower engagement, less when repairable (Silverman & Barasch 2023) [PR]; Duolingo streak levers [S] | anxiety; obligation over enjoyment; Snapstreaks linked to problematic use in early teens (weakly) [PR] | DSA guidelines: streaks off by default for minors [REG] | the habit is the user's goal · true count · freeze/repair visible in the same message · max one reminder a day · quiet hours |
| **Guilt-tinged mascot voice** ("These reminders don't seem to be working…") | Duolingo (Duo) | emotional attachment to a character; personal tone | "Hi, it's Duo" notification +5% DAU [S] | guilt as a lever; the exit feels like letting someone down | confirmshaming listed by FTC/Brignull; DSA Art. 25 manipulative design [REG] | playful, never shaming the decline · stops after the user dismisses twice · never on cancel, money or deletion |
| **Streak wager / commitment bet** (stake in-app currency on keeping a streak) | Duolingo | precommitment + loss aversion | Streak Wager +14% D7 retention [S] | a gamble on your own behaviour; pressure | low if the stake is free currency; red if real money or bought currency | stake is earned, never bought · odds = the user's own effort · no minors |
| **Leagues with demotion zones** | Duolingo, Clash Royale | social comparison + loss of rank | leaderboards +17% learning time [S]; competition effects outlasted the game in activity RCTs [PR] | stress for low performers; can lower motivation in classrooms (Hanus & Fox 2015) [PR] | low | small cohorts of similar level · opt out of leagues · no public shaming of the last place |
| **Free mystery reward / tap-to-reveal with chance** | Clash Royale Lucky Drop (each tap 20–30% upgrade chance [S]), Candy Crush | uncertainty drives anticipation | anticipation signal peaks at 50% (Fiorillo 2003) [PR] | the slot-machine mechanism; habituates people to chance | red if paid or for minors (Belgium, Brazil) [REG]; loot-box spend r ≈ .26 with problem gambling [PR] | free and earned only · odds shown · no purchase anywhere in the reveal · no near-miss animation |
| **Near-goal pressure** ("1 order from a free dish", "2 lessons to day 7") | Starbucks stars, Domino's, Duolingo | goal gradient; endowed progress | 34% vs 19% completion with 2 free stamps (Nunes & Drèze 2006); speed-up near the reward (Kivetz 2006) [PR] | can pull an extra purchase the user didn't plan | low when the goal is real; R11 if conditions are hidden | true distance · terms up front · never "almost" on a chance draw (R1) |
| **Sunk-cost display** ("Don't lose your 120-day streak") | Duolingo, Snapchat | people protect accumulated investment | intact-streak effect (Silverman & Barasch 2023) [PR] | keeps people out of obligation after the goal is met | ICO: don't imply stopping loses out (children) [REG] | adults only · show protection (freeze) beside it · let users hide the counter (Headspace) |
| **Social pressure** ("Maria practised today", "3 friends ordered here") | Duolingo friends, Strava, Snapchat | reciprocity, comparison, belonging | runners with more kudos ran more [PR, via university]; likes activate reward regions (Sherman 2016) [PR] | performance anxiety; comparison harm, stronger in teens | named in DSA findings for feeds; hidden like counts for teens (Meta settlement) [REG/ENF] | opt-in, real friends only, never fabricated, no counts for minors |
| **True deadline / limited-time event** | Duolingo XP Ramp, Clash events | scarcity, urgency | (effect sizes for apps unpublished) | rushes decisions | **fake** urgency is illegal (EU Omnibus, FTC) [REG] | the deadline is real and the same for everyone · never on payment screens (R7) |
| **Default-on reminders** | most habit apps | defaults stick (Johnson & Goldstein 2003, organ donation) [PR] | Duolingo red-dot +6% DAU [S] | the user didn't choose it | GDPR/ePrivacy for marketing pushes; DSA findings on pushes [REG] | functional reminders only (not marketing) · one-tap off in the first reminder · quiet hours · never for minors at night |
| **Autoplay next / continuous flow with an end** | Netflix, TikTok, Duolingo "keep going" | removes the stopping decision | DSA preliminary findings name it as addictive design [REG] | the machine-zone mechanism (Schüll 2012) [BK] | high for minors; amber for adults | a visible end state ("Done for today") · a real pause · never infinite |

## 4. Never recommended (illegal or deceptive), explained for awareness

Shown in the black section as "how other apps do it, and why we won't", never as advice:
fake urgency or scarcity (countdowns that reset, "only 2 left" that isn't true), fake social
proof, hidden or drip-priced fees, losses celebrated as wins (R2), celebrating spending or
trading (R3; Massachusetts v Robinhood, $7.5M), paid random rewards (R4), near-miss
engineering (R1), credits that hide money (R6), speed-ups on money decisions (R7), sticky
cancellation (R9; FTC v Amazon $2.5B), forced games before the service (R10), hidden bonus
conditions (R11), shaming the decline button, anything aimed at minors. Tests: `reward.md` §7.

## 5. When the audited product already uses one

- Passes the §2 gate (true, easy out, user's goal): **not a finding**. Say it works and why;
  a mature product's choice is often an A/B-test winner.
- Inaccurate (a streak "will reset" while a freeze is equipped): P2 content finding; the fix
  keeps the lever and makes it true.
- Fails the gate on money, minors or deception: the ethics gate applies (P1, or P0 per
  `reward.md` §7).
- Conflicts with this playbook but looks deliberate in a mature product: recommend **a test**,
  not removal ("A/B: accurate loss framing vs current; measure D1 return and opt-outs").

## 6. Report format (the Black tier of the Recommendations section)

Open with 2–3 sentences: what black UX is, that some people consider these techniques
unethical, that top apps use them, and that each is listed so the owner can choose
knowingly. Then per item:

```
B-01 <technique, in this product's words>
- What top apps do: <app + mechanic>
- For this product: <the concrete version, screen, copy, spec>
- Why it works: <psychology> · evidence <tag>
- Why it's black: <who it can hurt, how>
- Risk: <law / regulator / reputation>
- Gate: user's goal ✓ · true ✓ · easy out ✓ · not for the vulnerable ✓ · guardrail metric <name>
- Test: <A/B design, win metric, harm metric> · confidence <high/medium/low>
```
Then the "never recommended" list from §4 that is relevant to this product, one line each.
