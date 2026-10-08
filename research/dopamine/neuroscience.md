# Dopamine, reward and app micro-interactions: what the evidence actually says

Background research for the `ux-audit` skill. Researched 2026-10-08 using web search, abstracts, and full text where it was open access.

**Tags.** [PR] peer-reviewed primary study · [RV] review or meta-analysis · [BK] book by a researcher · [POP] popular press or practitioner writing.
**Confidence.** high = replicated, or settled in textbooks · medium = solid single studies, or a body of work with known caveats · low = thin, contested, or inferred.
**Verification.** "Verified" means I checked the bibliographic record and at least the abstract online. "Unverified" means I could not confirm the detail. Numbers that come only from secondary summaries are marked as such.

---

## Summary (10 bullets)

1. **Dopamine is not the "pleasure chemical."** Phasic dopamine signals a *reward prediction error* (RPE): better than expected → burst, as expected → no change, worse than expected → dip. Separately, it gives cues *incentive salience* ("wanting"). Pleasure ("liking") depends mostly on small opioid and endocannabinoid hotspots. [PR][RV] high
2. **With learning, the dopamine response moves from the reward to the cue that predicts it.** A fully predicted reward produces almost no phasic dopamine response. A reward that is identical and fully expected stops teaching the brain anything. [PR] high
3. **Uncertainty adds a separate dopamine signal.** Fiorillo et al. (2003) found a slow ramp of activity that peaks when reward probability is 50%. Variable-ratio schedules produce the most persistent responding. Slot-machine features such as near-misses and losses-disguised-as-wins recruit reward circuitry or arousal even though the player loses. [PR] high for the neural signal; medium for how this transfers to apps
4. **Repeating an identical reward causes habituation and hedonic adaptation.** Novelty itself activates the human dopaminergic midbrain. Variety, interruption, and surprise slow adaptation. [PR][RV] medium–high
5. **People speed up as they get closer to a goal (goal gradient), and a head start ("endowed progress") raises completion.** Both were shown in field studies with real customers. The Zeigarnik *memory* effect did not hold up in a 2025 meta-analysis. The tendency to *resume* unfinished tasks (Ovsiankina effect) did. [PR][RV] medium–high
6. **Competence feedback beats tangible rewards for sustained motivation.** Expected tangible rewards reduce intrinsic motivation (d ≈ −0.3 to −0.4). Informational positive feedback increases it (d ≈ +0.3). In games, felt competence and autonomy predict enjoyment and future play. [RV][PR] high
7. **Social approval activates the same striatal reward regions as money.** Many "likes" activated the nucleus accumbens (NAcc) in teenagers (fMRI, N = 32). NAcc response to reputation gains predicted Facebook use (correlational). These studies measured BOLD signal, not dopamine. [PR] medium
8. **No study has directly measured dopamine *release* while people use phones or apps.** The closest is one correlational PET study (N = 22) linking social-app use to dopamine *synthesis capacity*. "Each notification gives you a dopamine hit" is an inference from animal, gambling, and money-task research. [PR] high that direct evidence is missing
9. **Population effects of screen time on wellbeing are small.** Orben & Przybylski (2019) found technology use explains ≤0.4% of variance in adolescent wellbeing, n ≈ 355k. Whether "smartphone addiction" is a real addiction is disputed. Popular books (Lembke) and blogs (Haynes, Harvard SITN) reason from addiction and animal research to phones. [PR][RV][BK][POP] medium
10. **Timing:** feedback must follow an action closely to be credited to it. Dopamine neurons code *when* a reward arrives. Their response to a predictive cue falls off hyperbolically over delays of a few seconds. People's judgement that an action caused an effect drops sharply after about 2 s. The 100 ms "feels instant" threshold is an HCI engineering rule of thumb, not a dopamine fact. [PR][BK] medium–high

---

## 1. What dopamine actually does

### 1.1 Reward prediction error (RPE)
- Schultz, Dayan & Montague (1997) showed that midbrain dopamine neurons in monkeys fire to *unexpected* rewards. After learning, they fire to the predictive cue instead and no longer fire to the reward. They *dip* when an expected reward is omitted. The paper links this to temporal-difference learning. [PR] high. DOI 10.1126/science.275.5306.1593
- In Schultz's (2016) review, this pattern holds in humans, monkeys, and rodents. The signal scales nonlinearly with reward value, in line with economic utility. Addictive drugs "hijack" and amplify the signal. Some striatal, amygdala, and frontal neurons also carry RPEs. [RV] high. Dialogues Clin Neurosci 2016, PMID 27069377 (journal record verified; PMID unverified)
- Hollerman & Schultz (1998): dopamine neurons also respond when a reward arrives at an *unexpected time*, and dip when an expected reward does not come. They encode both "whether" and "when." [PR] high. DOI 10.1038/1124
- **Causal evidence.** Steinberg et al. (2013) optogenetically activated dopamine neurons at the moment of a reward, mimicking an RPE. This caused lasting increases in cue-driven reward seeking in rats. [PR] high. DOI 10.1038/nn.3413
- **Humans: RPE, not winnings, drives momentary happiness.** Rutledge et al. (2014) found that happiness tracked recent expectations plus prediction errors, not cumulative earnings. The model replicated online (N = 18,420), and striatal BOLD followed the same terms. [PR] high. DOI 10.1073/pnas.1407535111
- **Live debate.** Jeong et al. (2022, *Science*) argue that mesolimbic dopamine release conveys retrospective causal associations (ANCCR) rather than RPE. Later modelling work disputes this. RPE remains the dominant account but is not settled. [PR] medium. *Science* 2022 (DOI unverified)
- **Release and firing can diverge.** In rats, dopamine release in the NAcc tracked evolving reward expectation (motivation) without matching changes in VTA spiking (Mohebi et al. 2019). Dopamine serves both learning and motivation. [PR] medium–high. DOI 10.1038/s41586-019-1235-y

### 1.2 Wanting vs liking; incentive salience
- Berridge & Robinson (1998) depleted rat striatal dopamine by up to 99%. Hedonic "liking" reactions to sweet taste were preserved, and the animals could still learn. What was lost was the *motivation* to obtain reward. The authors concluded that dopamine mediates **incentive salience**, which is separable from pleasure and from learning. [PR][RV] high. DOI 10.1016/s0165-0173(98)00019-8
- Berridge & Kringelbach (2015): "wanting" comes from a large distributed system. "Liking" comes from small hedonic hotspots in the NAcc shell, ventral pallidum, and other areas, driven by opioid, endocannabinoid, and orexin signalling. Mesolimbic dopamine "may not generate pleasure after all." [RV] high. DOI 10.1016/j.neuron.2015.02.018
- Implication: wanting and liking can come apart. People can compulsively want things they do not much enjoy, which is the basis of incentive-sensitization theory of addiction. [RV] high

### 1.3 Anticipation vs consumption
- Knutson et al. (2001), fMRI with N = 8: NAcc activity rose with *anticipated* monetary gain, but not with anticipated loss, and tracked self-reported happiness. [PR] high (widely replicated MID paradigm). DOI 10.1523/JNEUROSCI.21-16-j0002.2001
- Salimpoor et al. (2011) combined [11C]raclopride PET with fMRI during music listening. Dopamine was released during *anticipation* of a peak emotional moment (caudate) and during the peak itself (NAcc). This is one of the few *direct* human measures of dopamine release to a non-drug reward. [PR] high. DOI 10.1038/nn.2726
- Koepp et al. (1998), PET: striatal dopamine release during a video game played for money (N = 8). The size of the release correlated with performance. A "~13%" figure often quoted for this study is **unverified**. [PR] medium. DOI 10.1038/30498

### 1.4 Verdict on "dopamine = pleasure / dopamine hit"
- **Mostly a myth.** Dopamine is about prediction, learning, motivation, and salience, not pleasure. The phrase "dopamine hit" from an app is an untested metaphor (see §6). The defensible version: *a better-than-expected outcome produces a phasic dopamine signal that strengthens the behaviour and cue that preceded it, and raises "wanting" for that cue.*

---

## 2. Variable / unpredictable rewards

- **Fiorillo, Tobler & Schultz (2003).** Phasic dopamine responses scaled with reward probability, consistent with RPE. A *separate*, sustained ramp tracked uncertainty: it was largest at p = 0.5 and built up until the moment the reward could arrive. [PR] high. DOI 10.1126/science.1077349
- **Operant schedules.** Ferster & Skinner (1957) systematically described fixed and variable ratio and interval schedules in pigeons. In the textbook account, variable-ratio (VR) schedules produce high, steady responding and strong resistance to extinction. The more specific claims on extinction come from the later partial-reinforcement-extinction literature, which I did not check at the primary level. [BK] high for steady VR responding; medium for "most resistant to extinction." Appleton-Century-Crofts 1957
- **Human PET.** Zald et al. (2004) compared unpredictable (variable-ratio) and predictable monetary schedules. Predictable reward gave small dopamine increases. Unpredictable reward gave a *regionally mixed* pattern: increases in medial caudate and decreases elsewhere. Variability does not simply mean "more dopamine." [PR] medium. DOI 10.1523/JNEUROSCI.4643-03.2004
- **Near-misses.** Clark et al. (2009): near-misses felt *less* pleasant than clear losses but *increased the desire to play*. This happened only when the player had personal control over the gamble. Near-misses recruited win-related striatum and insula. [PR] high. DOI 10.1016/j.neuron.2008.12.031
- **Losses disguised as wins (LDWs).** Dixon et al. (2010): on multi-line slots, spins that pay back less than the bet but still play win animations and sounds produced skin-conductance responses as large as real wins, and larger than plain losses. N = 40 novices. [PR] high for the arousal effect. Published in *Addiction* 2010 per the publisher banner on the author PDF (volume, pages, and DOI unverified). PDF: https://uwaterloo.ca/reasoning-decision-making-lab/sites/default/files/uploads/files/DixFugetal_10c.pdf
- **Transfer to digital products.** Zendle & Cairns (2018): in 7,422 gamers, loot-box spending was associated with problem-gambling severity (η² = 0.054). This was much stronger than for other in-game spending (η² = 0.004). The study is correlational and has replicated. [PR] medium. DOI 10.1371/journal.pone.0206767
- **Takeaway.** Unpredictability amplifies attention and persistence. In gambling, though, the same mechanism drives harm. Win-like feedback on a net loss (LDWs) is a documented *deceptive* pattern. **Confidence for app transfer: low–medium.** No study shows that variable *cosmetic* rewards in a non-monetary app produce gambling-like effects.

---

## 3. Habituation, tolerance and what keeps small rewards effective

- **Predicted rewards lose their phasic signal.** This follows directly from RPE (§1.1): once a reward is fully expected, the dopamine response shifts to the cue and the response to the reward itself flattens. [PR] high
- **Hedonic adaptation.** Frederick & Loewenstein (1999) review adaptation across noise, imprisonment, bereavement, and disability, and positive domains such as food, erotic images, wealth, and cosmetic surgery. Adaptation is widespread but not universal, and its speed varies by domain. [RV] high. In Kahneman, Diener & Schwarz (eds.) *Well-Being*, Russell Sage 1999, pp. 302–329
- **Habituation to food reward.** Epstein et al. (2009) show that repeated presentation reduces the motivated response, and that variety or a novel stimulus restores it (dishabituation). Follow-up work separates within-session effects (habituation) from between-session effects (incentive contrast). [RV] high. DOI 10.1037/a0015074
- **Novelty is a dopaminergic signal in humans.** Bunzeck & Düzel (2006), fMRI: the substantia nigra/VTA responded to *absolute* stimulus novelty more than to rarity, negative emotional value, or task relevance. Novelty also improved learning of nearby familiar items. [PR] high. Neuron 51:369–379 (PMID 16880131)
- **Interruption slows adaptation.** Nelson & Meyvis (2008) found that brief breaks made pleasant experiences more enjoyable again, yet people avoid such breaks when given the choice. [PR] medium (findings taken from a secondary summary; full text not read). JMR 45:654–664
- **Drug tolerance is not app habituation.** In addiction, chronic drug use reduces striatal D2 receptors and blunts dopamine responses (Volkow, Wise & Baler 2017). No study I found shows this kind of downregulation from ordinary app feedback. [RV] high for drugs; extrapolating it to apps is **low** confidence. DOI 10.1038/nrn.2017.130
- **What keeps small rewards effective (evidence-based):** (a) keep some element unpredictable *in a way that carries information*, such as streak milestones or new feedback copy, rather than random payouts; (b) vary the sensory form; (c) save big celebrations for real progress, so they stay "better than expected"; (d) tie feedback to competence (§4), which does not adapt like a sensory treat because the information changes each time. Items (a) to (c) are medium-confidence extrapolations from §1–3. Item (d) is supported by the SDT meta-analysis.

---

## 4. Progress and goals

- **Goal gradient (Hull 1932).** Rats ran faster as they neared the food in a maze. [PR] high (historical). *Psychological Review* 39:25–43 (DOI unverified)
- **Kivetz, Urminsky & Zheng (2006).** On a buy-10-get-1 café card, purchase intervals got shorter as customers neared the reward. A 12-stamp card with 2 "bonus" stamps already filled (same 10 purchases required) was completed faster ("illusionary goal progress"). Song-raters showed the same acceleration. After the reward, customers who had accelerated more were more likely to stay. Habituation and time trends did not explain the effect. [PR] high. JMR 43:39–58. PDF: https://business.columbia.edu/sites/default/files-efs/pubfiles/1200/goalgradient.pdf
- **Endowed progress (Nunes & Drèze 2006).** In a car-wash field experiment, a 10-stamp card with 2 stamps pre-filled was completed more often (34%) than an 8-stamp card (19%), with the same effort required. The effect depends on perceived progress, not on avoiding waste. [PR] high for the effect; the 34% and 19% figures come from secondary summaries. DOI 10.1086/500480
- **Zeigarnik / open loops.** Ghibellini & Meier (2025) meta-analysis: **no memory advantage** for unfinished tasks (the Zeigarnik effect fails), but a reliable **tendency to resume** them (the Ovsiankina effect, roughly 2/3 resumption in secondary summaries). [RV] medium–high. *Humanities & Social Sciences Communications* 12 (2025), DOI 10.1057/s41599-025-05000-w
- **Small wins / progress principle.** Amabile & Kramer analysed about 12,000 daily diary entries from 238 knowledge workers in 7 companies. Making progress on meaningful work was the strongest day-to-day booster of positive inner work life. [BK][POP] medium (diary method, not peer-reviewed as a book; numbers from secondary summaries). HBR May 2011, "The Power of Small Wins": https://hbr.org/2011/05/the-power-of-small-wins
- **Self-determination theory (SDT).** Deci, Koestner & Ryan (1999) meta-analysis of 128 experiments. Expected tangible rewards that depend on doing, completing, or performing a task *reduced* free-choice intrinsic motivation (d = −0.40, −0.36, −0.28). **Positive feedback increased it** (d = +0.33 for behaviour, +0.31 for self-reported interest). [RV] high (Cameron and Pierce dispute the size of the undermining effect). Psychol Bull 125:627–668
- **Games.** Ryan, Rigby & Przybylski (2006), 4 studies: perceived in-game competence and autonomy predicted enjoyment, preference for future play, and short-term wellbeing changes. Intuitive controls and presence related to both. Relatedness also predicted enjoyment and future play in multiplayer settings. [PR] high. DOI 10.1007/s11031-006-9051-8
- **Feedback can backfire.** Kluger & DeNisi (1996): 607 effect sizes, mean d = 0.41, but over 1/3 of feedback interventions *reduced* performance. Feedback works worse when it pulls attention to the self ("you're amazing") instead of the task. [RV] high. DOI 10.1037/0033-2909.119.2.254

---

## 5. Social reward

- **Sherman et al. (2016)** used a simulated Instagram task. 34 adolescents aged 13–18 were recruited and 32 were analysed by fMRI. Photos with many likes vs few produced more NAcc activity, both for neutral photos and for participants' *own* photos. Participants also liked photos that already had many likes more often (conformity). Viewing risky photos lowered activity in cognitive-control regions. Caveats: small sample, like counts were set by the experimenters, a single session, and **dopamine was not measured** (BOLD only). [PR] medium. DOI 10.1177/0956797616645673. Full text: https://pmc.ncbi.nlm.nih.gov/articles/PMC5387999/
- **Sherman et al. (2018)**, N = 58: *giving* likes also engaged the striatum and VTA. [PR] medium. DOI 10.1093/scan/nsy051
- **Meshi, Morawetz & Heekeren (2013).** Left-NAcc response to reputation gains for oneself, relative to others, predicted Facebook use intensity. NAcc response to *money* did not. The design is correlational, and the authors say so. [PR] medium. DOI 10.3389/fnhum.2013.00439
- **Meshi, Tamir & Heekeren (2015)**, a review: social media use draws on systems for social cognition, self-referential thought, and social reward (ventral striatum). The field is early. [RV] medium. TiCS 19(12):771–782
- **Takeaway.** Social validation is processed as a reward, in the striatum and VTA. Visible counts also shift behaviour through conformity. Both findings come from small, mostly adolescent fMRI samples.

---

## 6. Smartphones, apps and dopamine: measured vs inferred

### 6.0 How dopamine is (and isn't) measured: read this before citing any "dopamine" claim
- **Single-unit electrophysiology (monkeys, rodents).** This records the spikes of individual identified dopamine neurons with millisecond resolution, and is where RPE comes from (Schultz). It is invasive, so essentially never used in healthy humans.
- **Fast-scan voltammetry and genetically encoded sensors (rodents).** These measure dopamine *release* in a target region in under a second (e.g., Mohebi 2019). Release can diverge from firing.
- **Optogenetics (rodents).** This causally drives dopamine neurons. It is the strongest test of what a dopamine signal *does* (Steinberg 2013).
- **PET with [11C]raclopride (humans).** Displacement of the tracer from D2 receptors indexes endogenous release. Resolution is poor in time (tens of minutes) and in space (striatal subregions), and radiation exposure limits sample sizes (often N ≈ 8–20). It is the only routine *direct* measure of release in healthy humans (Koepp 1998; Zald 2004; Salimpoor 2011).
- **PET with [18F]-DOPA (humans).** Measures dopamine *synthesis capacity*, a trait-like property, not moment-to-moment release (Westbrook 2021).
- **fMRI BOLD (humans).** Measures blood-oxygen changes. Striatal BOLD *correlates* with RPE and often with dopamine, but it is not dopamine. It also reflects glutamatergic input and other transmitters. Nearly all "likes light up the reward centre" studies are BOLD (Sherman, Meshi).
- **Pharmacology (humans).** Drugs such as L-DOPA or D2 antagonists shift dopamine tone and show what dopamine contributes to choice. These studies are not covered in this file.
- **Rule for the skill:** when a source says "releases dopamine," check which of these methods it used. If the answer is "fMRI," "survey," or "none," the accurate phrasing is "activates reward-related brain regions" or "is reinforcing," not "releases dopamine."

| Claim | Status | Evidence |
|---|---|---|
| Social feedback (likes) activates striatal reward regions | **Measured (fMRI BOLD)** | Sherman 2016/2018; Meshi 2013. Small N, lab simulations |
| Video-game play releases striatal dopamine | **Measured (PET)**, 1998, N = 8, played for money | Koepp 1998 |
| Unpredictable monetary reward alters human striatal dopamine | **Measured (PET)**, regionally mixed | Zald 2004 |
| Smartphone social-app use relates to dopamine | **Measured, correlational, not release** | Westbrook et al. 2021: [18F]-DOPA PET, N = 22. A higher share of social-app touches was associated with *lower* putamen dopamine synthesis capacity. Direction of cause unknown [PR] medium. DOI 10.1016/j.isci.2021.102497 |
| A notification or like causes a "dopamine hit" | **Inferred.** No study found measuring release during phone use | Extrapolated from RPE, gambling, and BOLD work |
| Apps cause dopamine "depletion" or receptor downregulation | **Speculative** | Taken from drug-addiction PET data (Volkow 2017); not shown for apps |
| "Dopamine detox/fasting" resets reward sensitivity | **No controlled evidence found** | Popular practice |

- **Critical voices.** Orben & Przybylski (2019) ran a specification-curve analysis on 3 datasets (n ≈ 355k). The association between technology use and adolescent wellbeing was negative but small, explaining at most 0.4% of variance, comparable to eating potatoes. [PR] high. DOI 10.1038/s41562-018-0506-1. Orben (2020) reviewed 23 meta-analyses: small effects of unclear direction, and "screen time" is too vague a construct. [RV] medium. *Soc Psychiatry Psychiatr Epidemiol* 2020 (DOI unverified). Panova & Carbonell (2018): evidence does not support calling heavy smartphone use an "addiction"; "problematic use" fits better. [RV] medium. DOI 10.1556/2006.7.2018.49
- **Proponents.** Lembke, *Dopamine Nation* (Dutton 2021). Lembke is a Stanford addiction psychiatrist. Her "pleasure–pain balance" metaphor draws on opponent-process theory and addiction-clinic experience and is applied to phones by analogy. [BK] low as neuroscience of apps; medium as clinical observation. Haynes (2018), Harvard SITN blog, "Dopamine, Smartphones & You": a clear RPE and variable-reward explainer that cites **no direct dopamine measurement during phone use**. Its claims rest on animal RPE work, Skinner schedules, gambling research, and a TV interview about Instagram withholding likes. [POP] low–medium. https://sites.harvard.edu/sitn/2018/05/01/dopamine-smartphones-battle-time/
- **Precise statement.** It is *established* that (a) unexpected rewards produce phasic dopamine in animals and in direct human PET and drug studies, and (b) social approval activates human striatal BOLD. It is *extrapolated* that specific app events release meaningful amounts of dopamine, or that app use changes dopamine function in a way that causes harm.

---

## 7. Timing: how fast feedback must follow an action

- **Dopamine timing.** RPE signals are time-locked to *when* reward is expected (Hollerman & Schultz 1998). In monkeys, dopamine cue responses fell **hyperbolically** as reward delays grew over a few seconds. Responses to the delayed reward itself grew, reflecting temporal uncertainty (Kobayashi & Schultz 2008). [PR] high. DOI 10.1523/JNEUROSCI.1600-08.2008. Human ventral striatum showed similar discounting over delays of 4–13.5 s (Gregorios-Pippas, Tobler & Schultz 2009, J Neurophysiol). [PR] medium
- **Delay discounting.** People discount delayed rewards hyperbolically. Ventral striatum, mPFC, and PCC track the discounted value (Kable & Glimcher 2007). [PR] high. DOI 10.1038/nn2007
- **Causal attribution.** In Shanks, Pearson & Dickinson (1989), people's ratings of how strongly an action caused an outcome dropped as the delay between them grew. Later authors summarise the finding as people failing to detect causation beyond about **2 s**. Buehner & May (2003) showed that delay hurts less when people *expect* a delay. [PR] medium–high. QJEP 41B (pages from memory, unverified); Buehner & May QJEP 56(5):865–890
- **Intentional binding.** People perceive their voluntary action and its effect as closer together in time than they really are. This "binding" was tested at delays of 250, 450 and 650 ms and was strongest at the short delays (Haggard, Clark & Kalogeras 2002; delay values come from later reviews). Feedback within a few hundred ms is felt as *caused by me*. [PR] medium (the measure is debated). DOI 10.1038/nn827
- **~100 ms "instant."** The Model Human Processor (Card, Moran & Newell 1983) puts the perceptual cycle at about 100 ms (range 50–200). Nielsen popularised the 0.1 s / 1 s / 10 s thresholds. Miller (1968) argued for response times under about 2 s, but attributing the 0.1 s figure to Miller is **unverified**. [BK][POP] medium as engineering heuristics; not dopamine findings.
- **Animal operant data.** In the delayed-reinforcement literature, learning degrades steeply with seconds of unsignalled delay. A signal that bridges the gap (a "conditioned reinforcer") restores much of it. This is textbook learning theory; I did not re-verify a specific primary source here. [BK] medium.
- **What is *not* established:** no study I found ties a specific millisecond threshold for UI feedback to dopamine. The ~100 ms figure is perceptual. The ~2 s figure is about judging causation. The dopamine data are in seconds and depend on expectation.

- **Design reading.** Reward feedback should start ≤100 ms after the action so it feels caused by it. Within about 1 s it still holds attention. After about 2 s with no anticipatory cue, the reward is weakly linked to the action. A visible progress cue (spinner, rolling number) turns an unavoidable delay into *expected* delay, which helps causal attribution (Buehner & May).

**Numbers at a glance (from all sections; see each section for the source and caveats):**

| Number | What it is | Source | Confidence |
|---|---|---|---|
| ≈0 phasic response | Dopamine response to a fully predicted reward | Schultz 1997/2016 | high |
| p = 0.5 | Reward probability at which the uncertainty ramp peaks | Fiorillo 2003 | high |
| up to 99% | Dopamine depletion that left "liking" intact | Berridge & Robinson 1998 | high |
| 18,420 | Online replication sample: happiness tracks RPE, not earnings | Rutledge 2014 | high |
| 34% vs 19% | Card completion with 2 free stamps vs none (same effort) | Nunes & Drèze 2006 (secondary figures) | medium |
| d = −0.40 / +0.33 | Engagement-contingent tangible reward vs positive feedback on free-choice motivation | Deci et al. 1999 | high |
| >1/3 | Share of feedback interventions that *lowered* performance | Kluger & DeNisi 1996 | high |
| N = 32 | Teens in the "power of the like" fMRI analysis | Sherman 2016 | high |
| N = 22 | Only PET study linking phone social activity to dopamine (synthesis, not release) | Westbrook 2021 | high |
| ≤0.4% | Variance in adolescent wellbeing explained by technology use | Orben & Przybylski 2019 | high |
| η² = 0.054 | Loot-box spending vs problem-gambling severity | Zendle & Cairns 2018 | medium |
| ~100 ms | Perceptual "instant" (HCI heuristic) | Card, Moran & Newell 1983 | medium |
| ~2 s | Delay beyond which unsignalled action→outcome causation is poorly detected | Shanks et al. 1989 via Buehner & May 2003 | medium |
| 4–13.5 s | Delays over which human striatal reward-cue responses discount | Gregorios-Pippas 2009 | medium |

**Open questions relevant to the skill (no good evidence either way):**
- Does a micro-animation (confetti, ding) in a non-monetary app produce a measurable dopamine RPE in humans? Untested.
- How fast does an *identical* UI celebration habituate across days? There are no app-specific longitudinal data. Duolingo and others run A/B tests but do not publish neural data.
- Do variable *cosmetic* rewards (random celebration variants) raise long-term engagement compared with fixed ones without harming wellbeing? No peer-reviewed RCT found.
- Are teenagers more susceptible to social-count features than adults? This is suggested by Sherman's and Meshi's samples, but there are no direct comparisons in apps.

---

## Myths vs facts

| Myth | Fact | Confidence |
|---|---|---|
| Dopamine is the pleasure chemical | Dopamine drives wanting, prediction error, and motivation. Pleasure mainly depends on opioid and other hotspots; dopamine-depleted rats still "like" sugar. | high |
| Every like or notification gives you a "dopamine hit" | Never directly measured during phone use. Likes raise striatal BOLD in small fMRI studies. | high (that it is unmeasured) |
| More rewards = more dopamine | A fully predicted reward gives about zero phasic response. Only better-than-expected outcomes produce a burst. | high |
| Random rewards always mean more dopamine | Uncertainty adds a ramping signal (monkeys). Human PET shows a regionally mixed pattern, not a simple rise. | medium |
| Apps "fry" or deplete your dopamine like drugs | Receptor downregulation is documented for drugs, not for ordinary app use. The one PET phone study is correlational, N = 22. | medium |
| Screen time is wrecking teen wellbeing | Population association is ≤0.4% of variance, and the direction of cause is unclear. | medium–high |
| Smartphone addiction is a clinical addiction | Disputed. Reviewers favour "problematic use." | medium |
| Unfinished tasks are remembered better (Zeigarnik) | Fails meta-analysis. The *resumption* tendency (Ovsiankina) holds. | medium–high |
| Any reward boosts motivation | Expected tangible rewards undermine intrinsic motivation. Informational positive feedback enhances it. | high |
| Praise always helps | Over 1/3 of feedback interventions reduce performance, especially self-focused praise. | high |
| A "dopamine detox" resets you | No controlled trials found. | medium |
| 100 ms is a dopamine threshold | It is a perceptual and HCI heuristic. Dopamine timing data are in seconds and depend on expectation. | medium |

---

## What this means for app design

Each principle cites the section it rests on.

1. **Reward the *better-than-expected*, not the routine.** Keep the biggest celebration (Duolingo-style ding plus burst) for outcomes the user could not fully predict: a streak milestone, a personal best, a first-time success. Routine confirmations should be light. *Rests on: RPE §1.1, habituation §3.* Confidence: high (mechanism) / medium (UI transfer).
2. **Start feedback within ~100 ms of the action, and finish the main beat within ~1 s.** If a result takes longer, show an immediate acknowledgement plus an anticipatory cue (a rolling balance, a filling bar). *Rests on: timing §7, anticipation §1.3.* Confidence: medium–high.
3. **Design the anticipation as well as the payoff.** A brief build-up, such as Revolut's balance roll or a progress fill, uses the "wanting" and anticipation phase, which is where dopamine is actually active. *Rests on: §1.2–1.3 (Knutson; Salimpoor).* Confidence: medium.
4. **Make feedback informational and about competence, not just decorative.** Say *what* improved ("3 in a row", "20% faster than last week"). Avoid generic self-praise. *Rests on: SDT meta-analysis and Kluger & DeNisi §4.* Confidence: high.
5. **Show progress toward a near goal, and give an honest head start.** Use visible bars and checklists. Pre-fill steps the user has genuinely completed, such as account creation counted as step 1 of 5. Highlight "almost there." *Rests on: goal gradient and endowed progress §4.* Confidence: high. Never invent progress the user did not make.
6. **Use "resume where you left off," not artificial open loops.** Make unfinished work easy to pick back up. Do not count on unfinished items being remembered. *Rests on: Ovsiankina vs Zeigarnik meta-analysis §4.* Confidence: medium–high.
7. **Vary the form, keep the meaning stable.** Rotate feedback copy, animation variants, and occasional surprise flourishes so the reward does not habituate. The signal should stay truthful: a success always looks like a success. *Rests on: novelty §3 (Bunzeck & Düzel), habituation §3.* Confidence: medium.
8. **Never celebrate a loss.** No win animation or sound on net-negative outcomes such as failed payments, partial refunds, or lost streaks dressed up as wins. *Rests on: LDWs, near-misses §2.* Confidence: high (documented deceptive mechanism). Ethics gate: fail.
9. **Treat random reward schedules as a red flag, not a growth tactic.** Use variable *surprise delight* that is free and non-monetary. Avoid variable *payouts* tied to spending, especially loot-box-like mechanics. *Rests on: VR schedules, Zendle & Cairns §2.* Confidence: medium.
10. **Social reward: favour giving and receiving specific recognition over public counts.** Like counts drive conformity, especially in teenagers, and both giving and receiving likes engage reward circuitry. Consider private or specific acknowledgement. *Rests on: Sherman 2016/2018, Meshi §5.* Confidence: medium.
11. **Don't justify design with "dopamine hits."** In audit reports, describe effects behaviourally ("raises repeat completion", "feels caused by the tap"), not neurochemically. *Rests on: §6.* Confidence: high.
12. **Respect interruption.** Breaks restore enjoyment, so do not chain endless reward loops. Natural stopping points such as "Done for today" help the next session feel fresh. *Rests on: Nelson & Meyvis §3.* Confidence: medium.

---

## Sources

- Berridge KC, Robinson TE (1998). What is the role of dopamine in reward…? *Brain Res Rev* 28:309–369. https://doi.org/10.1016/s0165-0173(98)00019-8 [PR/RV]
- Berridge KC, Kringelbach ML (2015). Pleasure systems in the brain. *Neuron* 86:646–664. https://doi.org/10.1016/j.neuron.2015.02.018 [RV]
- Buehner MJ, May J (2003). Rethinking temporal contiguity and the judgement of causality. *QJEP* 56(5):865–890. https://researchportal.plymouth.ac.uk/en/publications/rethinking-temporal-contiguity-and-the-judgement-of-causality-eff/ [PR]
- Bunzeck N, Düzel E (2006). Absolute coding of stimulus novelty in the human SN/VTA. *Neuron* 51:369–379. https://pubmed.ncbi.nlm.nih.gov/16880131/ [PR]
- Card SK, Moran TP, Newell A (1983). *The Psychology of Human-Computer Interaction.* Erlbaum. [BK] (100 ms figure via course notes: https://cs.calvin.edu/courses/cs/300hci/24fa/assets/readings/human_abilities/)
- Clark L, Lawrence AJ, Astley-Jones F, Gray N (2009). Gambling near-misses… *Neuron* 61:481–490. https://pmc.ncbi.nlm.nih.gov/articles/PMC2658737/ [PR]
- Deci EL, Koestner R, Ryan RM (1999). Meta-analytic review… extrinsic rewards on intrinsic motivation. *Psychol Bull* 125:627–668. https://home.ubalt.edu/ntygmitc/642/Articles%20syllabus/Deci%20Koestner%20Ryan%20meta%20IM%20psy%20bull%2099.pdf [RV]
- Dixon MJ, Harrigan KA, Sandhu R, Collins K, Fugelsang JA (2010). Losses disguised as wins in modern multi-line video slot machines. *Addiction* (vol/pages/DOI unverified). https://uwaterloo.ca/reasoning-decision-making-lab/sites/default/files/uploads/files/DixFugetal_10c.pdf [PR]
- Epstein LH, Temple JL, Roemmich JN, Bouton ME (2009). Habituation as a determinant of human food intake. *Psychol Rev* 116:384–407. https://doi.org/10.1037/a0015074 [RV]
- Ferster CB, Skinner BF (1957). *Schedules of Reinforcement.* Appleton-Century-Crofts. https://search.worldcat.org/oclc/4596140 [BK]
- Fiorillo CD, Tobler PN, Schultz W (2003). Discrete coding of reward probability and uncertainty by dopamine neurons. *Science* 299:1898–1902. https://doi.org/10.1126/science.1077349 [PR]
- Frederick S, Loewenstein G (1999). Hedonic adaptation. In *Well-Being* (Kahneman, Diener, Schwarz eds.), Russell Sage, 302–329. https://stafforini.com/works/frederick-1999-hedonic-adaptation/ [RV]
- Ghibellini R, Meier B (2025). Zeigarnik/Ovsiankina meta-analysis. *Humanit Soc Sci Commun* 12. https://doi.org/10.1057/s41599-025-05000-w [RV]
- Gregorios-Pippas L, Tobler PN, Schultz W (2009). Short-term temporal discounting of reward value in human ventral striatum. *J Neurophysiol.* https://www.pdn.cam.ac.uk/system/files/documents/2009-lucy-jnp-discount.pdf [PR]
- Haggard P, Clark S, Kalogeras J (2002). Voluntary action and conscious awareness. *Nat Neurosci* 5(4) (pages unverified). https://doi.org/10.1038/nn827 [PR]
- Haynes T (2018). Dopamine, Smartphones & You. Harvard SITN blog. https://sites.harvard.edu/sitn/2018/05/01/dopamine-smartphones-battle-time/ [POP]
- Hollerman JR, Schultz W (1998). Dopamine neurons report an error in the temporal prediction of reward. *Nat Neurosci* 1:304–309. https://doi.org/10.1038/1124 [PR]
- Hull CL (1932). The goal gradient hypothesis and maze learning. *Psychol Rev* 39:25–43 (DOI unverified). [PR]
- Jeong H, …, Namboodiri VMK (2022). Mesolimbic dopamine release conveys causal associations. *Science* (DOI unverified). https://paperguide.ai/papers/00a4048c-1b97-44d5-acad-d5e2cd81b06f-mesolimbic-dopamine-release-conveys-causal-associations [PR]
- Kable JW, Glimcher PW (2007). Neural correlates of subjective value during intertemporal choice. *Nat Neurosci* 10:1625–1633. https://doi.org/10.1038/nn2007 [PR]
- Kivetz R, Urminsky O, Zheng Y (2006). The goal-gradient hypothesis resurrected. *J Mark Res* 43:39–58. https://business.columbia.edu/sites/default/files-efs/pubfiles/1200/goalgradient.pdf [PR]
- Kluger AN, DeNisi A (1996). Effects of feedback interventions on performance. *Psychol Bull* 119:254–284. https://doi.org/10.1037/0033-2909.119.2.254 [RV]
- Knutson B, Adams CM, Fong GW, Hommer D (2001). Anticipation of increasing monetary reward selectively recruits NAcc. *J Neurosci* 21:RC159. https://doi.org/10.1523/JNEUROSCI.21-16-j0002.2001 [PR]
- Kobayashi S, Schultz W (2008). Influence of reward delays on responses of dopamine neurons. *J Neurosci* 28:7837–7846. https://doi.org/10.1523/JNEUROSCI.1600-08.2008 [PR]
- Koepp MJ et al. (1998). Evidence for striatal dopamine release during a video game. *Nature* 393:266–268. https://doi.org/10.1038/30498 [PR]
- Lembke A (2021). *Dopamine Nation.* Dutton. https://annalembke.com/ [BK]
- Meshi D, Morawetz C, Heekeren HR (2013). NAcc response to gains in reputation… predicts social media use. *Front Hum Neurosci* 7:439. https://doi.org/10.3389/fnhum.2013.00439 [PR]
- Meshi D, Tamir DI, Heekeren HR (2015). The emerging neuroscience of social media. *TiCS* 19:771–782. https://hrcc.cas.msu.edu/throwback-thursdays/emerging-neuroscience.pdf [RV]
- Mohebi A et al. (2019). Dissociable dopamine dynamics for learning and motivation. *Nature* 570:65–70. https://doi.org/10.1038/s41586-019-1235-y [PR]
- Nelson LD, Meyvis T (2008). Interrupted consumption. *J Mark Res* 45:654–664. https://www.stern.nyu.edu/faculty/bio/tom-meyvis [PR]
- Nunes JC, Drèze X (2006). The endowed progress effect. *J Consum Res* 32:504–512. https://doi.org/10.1086/500480 [PR]
- Orben A, Przybylski AK (2019). Adolescent well-being and digital technology use. *Nat Hum Behav* 3:173–182. https://doi.org/10.1038/s41562-018-0506-1 [PR]
- Orben A (2020). Teenagers, screens and social media: a narrative review of reviews and key studies. *Soc Psychiatry Psychiatr Epidemiol* (DOI unverified). https://digitalwellbeing.org/kill-screentime-new-study-on-teens-screens-and-social-media/ [RV]
- Panova T, Carbonell X (2018). Is smartphone addiction really an addiction? *J Behav Addict* 7:252–259. https://pmc.ncbi.nlm.nih.gov/articles/PMC6174603/ [RV]
- Rutledge RB, Skandali N, Dayan P, Dolan RJ (2014). Momentary subjective well-being. *PNAS* 111:12252–12257. https://doi.org/10.1073/pnas.1407535111 [PR]
- Ryan RM, Rigby CS, Przybylski A (2006). The motivational pull of video games. *Motiv Emot* 30:347–363. https://doi.org/10.1007/s11031-006-9051-8 [PR]
- Salimpoor VN et al. (2011). Anatomically distinct dopamine release during anticipation and experience of peak emotion to music. *Nat Neurosci* 14:257–262. https://doi.org/10.1038/nn.2726 [PR]
- Schultz W, Dayan P, Montague PR (1997). A neural substrate of prediction and reward. *Science* 275:1593–1599. https://doi.org/10.1126/science.275.5306.1593 [PR]
- Schultz W (2016). Dopamine reward prediction error coding. *Dialogues Clin Neurosci* 18:23–32 (pages unverified). https://www.deepdyve.com/lp/doc/tdVR4EofCG [RV]
- Shanks DR, Pearson SM, Dickinson A (1989). Temporal contiguity and the judgement of causality by human subjects. *QJEP* 41B (details unverified; cited via Buehner & May 2003). [PR]
- Sherman LE, Payton AA, Hernandez LM, Greenfield PM, Dapretto M (2016). The power of the like in adolescence. *Psychol Sci* 27:1027–1035. https://pmc.ncbi.nlm.nih.gov/articles/PMC5387999/ [PR]
- Sherman LE, Hernandez LM, Greenfield PM, Dapretto M (2018). What the brain "Likes". *SCAN.* https://doi.org/10.1093/scan/nsy051 [PR]
- Steinberg EE et al. (2013). A causal link between prediction errors, dopamine neurons and learning. *Nat Neurosci* 16:966–973. https://doi.org/10.1038/nn.3413 [PR]
- Volkow ND, Wise RA, Baler R (2017). The dopamine motive system. *Nat Rev Neurosci* 18:741–752. https://doi.org/10.1038/nrn.2017.130 [RV]
- Westbrook A et al. (2021). Striatal dopamine synthesis capacity reflects smartphone social activity. *iScience* 24:102497. https://pmc.ncbi.nlm.nih.gov/articles/PMC8170001/ [PR]
- Zald DH et al. (2004). Dopamine transmission in the human striatum during monetary reward tasks. *J Neurosci* 24:4105–4112. https://doi.org/10.1523/JNEUROSCI.4643-03.2004 [PR]
- Zendle D, Cairns P (2018). Video game loot boxes are linked to problem gambling. *PLOS ONE* 13:e0206767. https://doi.org/10.1371/journal.pone.0206767 [PR]
