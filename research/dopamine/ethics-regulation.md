# Ethics, harms and regulation of reward-driven ("dopamine") design

Research for the ux-audit skill's pull plan and ethics gate. Compiled 2026-10-08.

**Tags:** [LAW] statute/regulation/official guidance · [ENF] enforcement, court action, settlement · [PR] peer-reviewed study · [RV] review/meta-analysis · [POP] press/practitioner/law-firm commentary.
**Confidence:** high = primary source read or several independent sources agree · medium = consistent secondary reporting, primary not read · low = single source or sources conflict.
**Rule:** anything not confirmed is written "unverified". Quotes are kept under 15 words. A preliminary finding is not a final decision, and a settlement is not an admission of liability. Treat both that way.

---

## Summary (10 bullets)

1. **Regulators now name the mechanics.** EU proceedings against TikTok (Feb 2026) and Meta (Jul 2026) name **infinite scroll, autoplay, push notifications and highly personalised recommenders** as "addictive design". These are preliminary DSA findings with no fine yet. [ENF, high]
2. **US litigation turned into design rules.** Meta's Aug 2026 settlement with state AGs (reported at up to about $17B) imposes teen defaults: a 2h daily limit, a midnight–6am block, school-hours notification mute, pause prompts, a chronological feed option and hidden like counts. [ENF, medium]
3. **Juries have found liability for addictive design.** In Mar 2026 an LA jury awarded $6M against Meta and YouTube and a Santa Fe jury imposed $375M in penalties on Meta. Both are under appeal or not final. [ENF, medium]
4. **Rewarding money actions is the clearest red line.** Massachusetts' 2024 Robinhood order bars **celebratory imagery tied to trading frequency** and features that mimic games of chance. Experiments link hedonic gamification and points to more, and noisier, trading. [ENF high; PR high]
5. **Paid random rewards are contested law.** Loot boxes are banned in Belgium (2018, weakly enforced) and for minors in Brazil (2025 law, enforcement from 2027). Australia rates them M or higher. The Dutch top court overturned EA's fine (2022). UK chose self-regulation (2022). Loot box spending correlates r≈0.26–0.27 with problem gambling. [LAW/ENF/RV]
6. **Children are a separate tier.** The EU Art. 28 DSA guidelines (Jul 2025) say **streaks, read receipts, autoplay and push notifications should be off by default for minors**. ICO Children's Code std 5 calls reward loops, continuous scroll, notifications and autoplay "sticky" features. NY (from Jan 2027) and California restrict algorithmic feeds for minors. [LAW, high]
7. **The harm evidence is real but contested.** Population associations between tech use and teen wellbeing are small (≤0.4% variance, Orben & Przybylski 2019). Haidt and Odgers dispute causation. Economists still estimate **about 31% of social media use comes from self-control problems** (Allcott et al. 2022). [PR/RV, high]
8. **Rewards help when they inform and hurt when they control.** In the Deci, Koestner & Ryan (1999) meta-analysis of 128 studies, expected tangible rewards undermine intrinsic motivation (d≈−0.28 to −0.40). Positive feedback enhances it (d≈+0.33). Gamified learning shows small-to-medium gains (g=.25–.49). [RV, high]
9. **Streaks work, and their failure state is the risk.** Intact streaks raise engagement and broken ones reduce it. The effect is weaker when users can "repair" a streak (Silverman & Barasch 2023). No peer-reviewed study of "Duolingo streak anxiety" was found: **unverified**. [PR, high; anxiety claim unverified]
10. **Audit test:** a reward is green when it celebrates the user's own chosen goal and is opt-in, forgiving and has a stopping point. It is red when it rewards spending, trading or time-on-app, is random and bought with money, uses guilt or loss framing, defaults to endless consumption, or targets minors. Deceptive.design now lists "Addictive Design" as a pattern type. [POP/LAW]

---

## 1. Regulation and enforcement touching reward design

### 1.1 European Union

| # | Claim | Tag | Conf. | Source |
|---|---|---|---|---|
| 1.1a | DSA Art. 25(1) bars online platforms from designing interfaces that deceive, manipulate or materially impair free and informed decisions. Art. 25(2) excludes practices already covered by the UCPD and GDPR. Addictive design at VLOPs is pursued mainly under systemic-risk duties (Arts. 34–35) and minors' protection (Art. 28). | LAW | high | https://eur-lex.europa.eu/eli/reg/2022/2065/oj |
| 1.1b | **TikTok, 6 Feb 2026:** the Commission preliminarily found TikTok's addictive design in breach of the DSA. It named infinite scroll, autoplay, push notifications and the personalised recommender. It said TikTok ignored signals such as minors' night-time use and app-open frequency, and found screen-time tools easy to dismiss. Suggested remedies: phase out infinite scroll, add effective screen-time breaks (including at night), and adapt the recommender. Proceedings opened 19 Feb 2024. A fine of up to 6% of turnover is possible if confirmed. No final decision was found as of Oct 2026. | ENF | high | https://digital-strategy.ec.europa.eu/en/news/commission-preliminarily-finds-tiktoks-addictive-design-breach-digital-services-act ; https://ec.europa.eu/commission/presscorner/detail/en/ip_26_312 |
| 1.1c | **Meta (Instagram/Facebook), 10 Jul 2026:** a preliminary finding of a DSA breach for addictive design covering the same feature set. The Commission found teen time-management tools dismissible and parental controls burdensome, and said Meta ignored data on minors' night-time use. Proceedings opened 16 May 2024. No final decision was found. | ENF | high | https://digital-strategy.ec.europa.eu/en/news/commission-preliminarily-finds-addictive-design-instagram-and-facebook-breach-digital-services-act ; https://ec.europa.eu/commission/presscorner/detail/en/ip_26_1579 |
| 1.1d | Separate preliminary findings exist for TikTok (minors' account safety) and Meta (under-13s, Apr 2026). These are distinct from the addictive-design cases. | ENF | medium | https://ec.europa.eu/commission/presscorner/detail/en/ip_26_1679 ; https://digital-strategy.ec.europa.eu/en/news/commission-preliminarily-finds-meta-breach-digital-services-act-failing-prevent-minors-under-13 |
| 1.1e | **Art. 28 minors guidelines, 14 Jul 2025:** non-binding, but used as a compliance benchmark. They recommend disabling by default features that drive excessive use, **naming streaks, read receipts and autoplay**. Push notifications are also reported in that list. Micro and small enterprises are excluded. Whether the final text names loot boxes and virtual currencies (the draft §6.6 did) is **unverified**. | LAW | high (streaks); unverified (loot-box wording) | https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-protection-minors ; https://www.algoodbody.com/insights-publications/protection-of-minors-on-online-platforms-european-commission-adopts-article-281-dsa-guidelines |
| 1.1f | **CPC Network key principles on in-game virtual currencies (Mar 2025):** non-binding readings of EU consumer law. They cover clear real-money pricing, no hidden costs, no pressure to buy currency, the right of withdrawal, and attention to children's vulnerability. | LAW (soft) | medium | https://commission.europa.eu/news/european-commission-hosts-stakeholders-talks-application-cpc-networks-key-principles-games-virtual-2025-06-03_en |
| 1.1g | **Digital Fairness Act:** not yet proposed. The consultation ran 17 Jul–24 Oct 2025, and a proposal is expected late 2026 (Q3/Q4 per different sources). Its announced scope covers dark patterns, addictive design and unfair personalisation. No adoption was found as of early Sep 2026, so any adoption since then is **unverified**. | LAW (pending) | medium | https://www.europarl.europa.eu/legislative-train/theme-protecting-our-democracy-upholding-our-values/file-digital-fairness-act ; https://www.eesc.europa.eu/en/our-work/opinions-information-reports/opinions/digital-fairness-act |

### 1.2 United Kingdom

| # | Claim | Tag | Conf. | Source |
|---|---|---|---|---|
| 1.2a | ICO Age Appropriate Design Code **std 13 (Nudge techniques)** covers privacy and data choices, not engagement. It bars nudging children toward giving more data or weaker privacy, and **encourages pro-wellbeing nudges** such as break prompts and pause-and-save. | LAW (statutory code) | high | https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services/13-nudge-techniques/ |
| 1.2b | ICO **std 5 (Detrimental use of data)** lists engagement-extending strategies: reward loops, continuous scrolling, notifications and autoplay. It says data-driven features that make it hard for children to disengage likely breach fairness. Its guidance: present "continue" neutrally without implying loss, make continuing an active choice, offer pause without losing progress, and take a precautionary approach. | LAW (statutory code) | high | https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services/5-detrimental-use-of-data/ |
| 1.2c | The ICO's Children's Code impact assessment cites game tactics such as in-game currency that hides real cost, inducements to spend, time-limited reward removal and loss aversion as harms. This comes via search summary; the PDF was not read in full. | LAW (impact assessment) | medium | https://ico.org.uk/media2/about-the-ico/documents/2617988/aadc-impact-assessment-v1_3.pdf |
| 1.2d | CMA discussion paper *Online Choice Architecture* (CMA155, Apr 2022) gives a taxonomy of harmful practices and notes that some design, such as reduced friction and relevant prominence, can help consumers. It was followed by the CMA–ICO joint paper *Harmful design in digital markets* (Aug 2023). | LAW (regulator paper) | high | https://www.gov.uk/government/publications/online-choice-architecture-how-digital-design-can-harm-competition-and-consumers |
| 1.2e | Under the DMCC Act 2024, the CMA has been able to fine directly for consumer-law breaches since 6 Apr 2025, up to 10% of global turnover or £300k, whichever is higher. This raises the stakes for dark patterns in the UK. | LAW | high | https://www.pinsentmasons.com/out-law/analysis/dmcc-act-overhauls-uk-consumer-law-enforcement |
| 1.2f | Loot boxes: the DCMS response (Jul 2022) declined to bring them under the Gambling Act and chose **industry-led measures** instead. It expects paid loot boxes to be unavailable to under-18s unless a parent enables them, plus spending controls and transparency. It acknowledged an association with gambling harm. | LAW (policy) | high | https://www.gov.uk/government/consultations/loot-boxes-in-video-games-call-for-evidence/outcome/government-response-to-the-call-for-evidence-on-loot-boxes-in-video-games |

### 1.3 United States: federal

| # | Claim | Tag | Conf. | Source |
|---|---|---|---|---|
| 1.3a | FTC staff report *Bringing Dark Patterns to Light* (Sep 2022) defines dark patterns as design that tricks or manipulates users into choices they would not otherwise make. It catalogues types and flags kids' in-app purchases. | LAW (staff report) | high | https://www.ftc.gov/reports/bringing-dark-patterns-light |
| 1.3b | **Epic Games (Fortnite):** announced Dec 2022 and finalised 14 Mar 2023. $245M in refunds for "dark patterns" that caused unwanted purchases (e.g., one-press charges, purchases while waking the game). Plus a separate $275M COPPA penalty, for $520M total. About $200M had been refunded by Jun 2025. | ENF | high | https://www.ftc.gov/news-events/news/press-releases/2023/03/ftc-finalizes-order-requiring-fortnite-maker-epic-games-pay-245-million-tricking-users-making ; https://www.ftc.gov/news-events/news/press-releases/2022/12/fortnite-video-game-maker-epic-games-pay-more-half-billion-dollars-over-ftc-allegations |
| 1.3c | **Amazon Prime (Sep 2025):** $2.5B ($1B civil penalty plus $1.5B refunds) over dark-pattern enrolment and cancellation, under ROSCA and the FTC Act. | ENF | high | https://www.ftc.gov/news-events/news/press-releases/2025/09/ftc-secures-historic-25-billion-settlement-against-amazon |
| 1.3d | SEC: a 2021 request for comment on "digital engagement practices" listed streaks, points, badges, leaderboards, prizes and trade celebrations. The follow-on predictive data analytics rule (2023) was **withdrawn in Jun 2025**. No federal gamification rule is in force. | LAW (withdrawn) | high | https://www.paulhastings.com/insights/client-alerts/sec-withdraws-14-pending-rule-proposals ; https://burr.com/securities-litigation/sec-requests-comments-on-gamification |
| 1.3e | KOSA: S.1748 cleared Senate Commerce on 5 Aug 2026. The House passed the broader KIDS Act (H.R. 7757) on 29 Jun 2026 without a duty of care. **Not law** as of mid-Aug 2026. Later status is **unverified**. | LAW (pending) | medium | https://congressionaldigest.com/issue/kids-online-safety-act/what-congress-is-doing-on-kids-online-safety/ |
| 1.3f | US Surgeon General Advisory (May 2023): evidence cannot show social media is sufficiently safe for youth. It cites up to 95% of teens using social media and over a third "almost constantly". | LAW (advisory) | high | https://www.hhs.gov/sites/default/files/sg-youth-mental-health-social-media-advisory.pdf |

### 1.4 United States: state actions and litigation

| # | Claim | Tag | Conf. | Source |
|---|---|---|---|---|
| 1.4a | **24 Oct 2023:** 33 states sued Meta in federal court (N.D. Cal.), alleging addictive features (algorithms, alerts, infinite scroll, likes, filters) plus COPPA violations. Eight more AGs and DC filed in state courts. | ENF | high | https://www.nbcnews.com/tech/tech-news/meta-sued-33-state-ags-addictive-features-targeting-kids-rcna121927 |
| 1.4b | **Meta multistate settlement, 26 Aug 2026:** reached about a week into trial before Judge Gonzalez Rogers (MDL 3047). Reported at up to about $17B over 10 years, with about $5.3B contingent on TikTok, YouTube and Snap adopting similar safeguards. Teen defaults that only a parent can loosen: 2h cumulative daily limit, midnight–6am block, weekday school-hours push mute, "productive pause" prompts at 60/90 min, a non-personalised feed prompted every 90 days, hidden like counts, and cosmetic-surgery filters blocked. Meta admits no wrongdoing. Sources conflict on the number of states (27–51), the exact total ($16.7–18B) and approval timing. MLex and Mealey's report a final judgment entered the same day. | ENF | medium | https://www.pearlcohen.com/meta-settles-with-attorneys-general-for-up-to-17-billion-agrees-to-design-changes/ ; https://www.mlex.com/mlex/amp/articles/2518312 ; https://cobbcountycourier.com/2026/08/changes-to-facebook-and-instagram-are-key-part-of-metas-17b-settlement-with-the-states-over-harm-to-teens/ |
| 1.4c | **LA Superior Court (state coordinated proceedings), 25 Mar 2026:** a jury found Meta and YouTube liable for negligence and failure to warn over addictive design. Award: $3M compensatory plus $3M punitive (Meta $2.1M, YouTube $0.9M). Post-trial status is **unverified**. | ENF | medium | https://www.mealeys.com/mealeys/articles/2458206 |
| 1.4d | **New Mexico v. Meta, 24 Mar 2026:** a Santa Fe jury imposed $375M in civil penalties under the Unfair Practices Act (37,500 violations × $5,000). Meta said it would appeal. A reported Aug 2026 abatement order of $567M is medium confidence. A second NM verdict (25 Sep 2026, 43.9M violations, penalty to be set by the judge) comes from a single source and is low confidence. | ENF | medium / low | https://www.kanw.org/new-mexico-news/2026-03-25/santa-fe-jury-awards-new-mexico-375m-in-meta-child-exploitation-case ; https://www.ibtimes.co.uk/emerging-markets-lack-ai-data-centre-infrastructure-1822147 |
| 1.4e | **School district MDL bellwethers:** the first (a Kentucky district) settled with Meta, Snap, TikTok and YouTube before a June 2026 trial. The next bellwethers (Tucson, Charleston) are scheduled for 2027. | ENF | medium | https://www.seegerweiss.com/news/first-social-media-addiction-mdl-bellwether-trial-settlement/ |
| 1.4f | **Massachusetts v. Robinhood:** complaint filed 2020, consent order 18 Jan 2024, $7.5M fine. For Massachusetts accounts, Robinhood must stop **celebratory imagery tied to trading frequency**, push notifications highlighting lists, and features that mimic games of chance, and must hire an independent consultant. The order recites the confetti, digital scratch tickets and free-stock rewards. Robinhood neither admitted nor denied, and had already removed the confetti in 2021. | ENF | high | https://www.sec.state.ma.us/divisions/news/enforcement-news.htm ; https://www.wealthmanagement.com/regulation-compliance/robinhood-pays-75m-settle-massachusetts-gamification-charge |
| 1.4g | **California SB 976** bars "addictive feeds" for minors without parental consent. On 9 Sep 2025 the Ninth Circuit let the feed provision stand at the preliminary-injunction stage but blocked the like-count provision. En banc review was denied in Nov 2025. Age assurance is due from Jan 2027. Merits litigation continues. | LAW / ENF | medium | https://epic.org/ninth-circuit-rejects-netchoices-attack-on-californias-addictive-feed-regulation/ ; https://en.wikipedia.org/wiki/NetChoice_v._Bonta |
| 1.4h | **New York SAFE for Kids Act:** the AG adopted final rules on 28 Jul 2026, effective 25 Jan 2027. No algorithmic feed for minors without age assurance or parental consent, and no feed notifications to minors from 12am to 6am. | LAW | high | https://www.insideprivacy.com/childrens-privacy/new-york-publishes-final-safe-for-kids-act-rules/ ; https://www.nysenate.gov/newsroom/press-releases/2026/andrew-gounardes/sen-gounardes-new-safe-kids-rules-create-safer |

### 1.5 Loot boxes and gaming limits elsewhere

| # | Claim | Tag | Conf. | Source |
|---|---|---|---|---|
| 1.5a | **Belgium (2018):** the Gaming Commission classed paid loot boxes as gambling. Xiao (2022) found 82% of the top-grossing iPhone games still had them, so enforcement is weak. | ENF / PR | high | https://rr.peercommunityin.org/articles/rec?id=264 |
| 1.5b | **Netherlands:** the Raad van State (9 Mar 2022, ECLI:NL:RVS:2022:690) overturned the KSA's penalty on EA. It held that FIFA packs are part of a skill game and not a standalone game of chance. | ENF | high | https://www.raadvanstate.nl/uitspraken/@130150/202005769-1-a3/ |
| 1.5c | **Brazil (Lei 15.211/2025, "ECA Digital"):** Art. 20 bans loot boxes in games aimed at or likely to be accessed by minors. ANPD fines start Jan 2027. Blizzard and Epic changed their Brazil monetisation. Fine amounts are **unverified**. | LAW | medium | https://www.demarest.com.br/en/eca-digital-nova-lei-de-protecao-de-criancas-e-adolescentes-no-ambiente-digital/ |
| 1.5d | **Australia (from 22 Sep 2024):** games with paid loot boxes are rated M or higher, and simulated gambling is rated R18+. Applies to new classifications. | LAW | medium | https://www.pocketgamer.biz/australia-sets-new-rules-for-video-games-with-gambling-like-content |
| 1.5e | **China (NPPA, 30 Aug 2021):** minors may play online games only 8–9pm on Fri, Sat, Sun and public holidays, with real-name verification. | LAW | high | https://www.sixthtone.com/news/1008398 |

---

## 2. Evidence: harm vs benefit

### 2.1 Problematic smartphone and social media use

| # | Finding | Tag | Conf. | Source |
|---|---|---|---|---|
| 2.1a | Orben & Przybylski (2019, *Nat Hum Behav*, n≈355k): the association between tech use and teen wellbeing is negative but small, explaining **at most 0.4%** of variance. The authors note that glasses-wearing showed a larger association in one dataset. Correlational. | PR | high | https://doi.org/10.1038/s41562-018-0506-1 |
| 2.1b | Allcott, Gentzkow & Song (2022, *AER*): an RCT with about 2,000 adults. Temporary incentives to cut use had persistent effects (habit), and self-set limits cut use. Model estimate: **self-control problems cause 31% of social media use.** | PR | high | https://ideas.repec.org/a/aea/aecrev/v112y2022i7p2424-63.html |
| 2.1c | Lindström et al. (2021, *Nat Commun*): over 1M posts from more than 4,000 users. Posting follows reinforcement-learning dynamics in response to likes, and an experiment (n=176) confirmed that social reward causally shapes posting. | PR | high | https://doi.org/10.1038/s41467-020-19607-x |
| 2.1d | Haidt's *The Anxious Generation* (2024) argues smartphones and social media are a major cause of the teen mental-health decline. Odgers' review in *Nature* (2024) says the "rewiring" and epidemic claims aren't supported by science and rest on correlational data. Haidt has acknowledged being "ahead of the science" (per Thorp). The debate is open. | POP / RV | high (that the debate exists) | https://www.nature.com/articles/d41586-024-00902-2 ; https://holdenthorp.substack.com/p/more-on-the-muddled-science-on-teens |
| 2.1e | Ferguson (2024) meta-analysis of 27 experiments: pooled d≈0.09, no reliable benefit from reducing social media. A reanalysis (Thrul et al.) found benefits that depend on intervention length. Rausch & Haidt allege coding errors. Contested. | RV | medium | https://www.afterbabel.com/p/fundamental-flaws-part-3 ; https://scholar.usuhs.edu/en/publications/social-media-reduction-or-abstinence-interventions-are-providing-/ |

### 2.2 Gamification in finance

| # | Finding | Tag | Conf. | Source |
|---|---|---|---|---|
| 2.2a | Chapkovski, Khapko & Zoican (2024, *Management Science*), randomized experiment: lower-literacy traders prefer **confetti and badge** platforms. Hedonic gamification raises volume about 5% (roughly 30% of the gap; self-selection is about 70%). Users who prefer it trade more noisily. Trend notifications reinforce mistakes for those with wrong beliefs. | PR | high | https://doi.org/10.1287/mnsc.2022.02650 |
| 2.2b | Kalda, Loos, Previtero & Hackethal (NBER w28363): within-investor data shows smartphone trades skew to riskier, lottery-type assets with lower Sharpe ratios. This is about the device, **not** gamification specifically. | PR (working paper) | high | https://ideas.repec.org/p/nbr/nberwo/28363.html |
| 2.2c | Ontario Securities Commission (Staff Notice 11-796, Nov 2022), RCT with n=2,430: points of trivial value led to **39% more trades**. | ENF (regulator study) | medium | https://www.advisor.ca/industry-news/industry/worthless-rewards-drive-trading-activity-osc-study/ |
| 2.2d | A later OSC study ("Gamification Revisited") found game-like features **can** be used for good, with a modest 3.5–4.5% rise in portfolio diversification. Reward design is not inherently harmful; the direction depends on what is rewarded. | ENF (regulator study) | medium | https://www.osc.ca/en/news-events/news/osc-publishes-gamification-research-and-launches-new-trading-simulation-tool-investor-education |

### 2.3 Streaks, variable rewards, loot boxes

| # | Finding | Tag | Conf. | Source |
|---|---|---|---|---|
| 2.3a | Silverman & Barasch (2023, *JCR*, 7 studies): logs that highlight intact streaks raise future engagement more than logs showing broken streaks. The effect depends on how the log represents behaviour, not on actual behaviour. It is amplified when users blame themselves for the break and **weakened when the streak can be repaired**. | PR | high | https://doi.org/10.1093/jcr/ucac029 |
| 2.3b | No peer-reviewed study measuring "streak anxiety" on Duolingo was found. Duolingo's own blog says broken streaks can be very discouraging and reports internal tests (Streak Freeze, Wager). These are company data, not independent. "Streak anxiety" as a measured clinical effect is **unverified**. | POP | medium | https://blog.duolingo.com/how-duolingo-streak-builds-habit |
| 2.3c | Spicer et al. (2022, *New Media & Society*): across studies, loot box engagement correlates with problem gambling at mean r=0.27 and with problem gaming at r=0.40 (only 6 surveys). Causality is unresolved. Garea et al. meta-analysis: r=0.26 with gambling symptoms. | RV | high | https://researchportal.plymouth.ac.uk/en/publications/loot-boxes-problem-gambling-and-problem-video-gaming-a-systematic/ ; https://figshare.utas.edu.au/articles/journal_contribution/Meta-analysis_of_the_relationship_between_problem_gambling_excessive_gaming_and_loot_box_spending/22996898 |

### 2.4 Children and teens

| # | Finding | Tag | Conf. | Source |
|---|---|---|---|---|
| 2.4a | Maza et al. (2023, *JAMA Pediatrics*, n=169, age 12, 3-year fMRI): habitual social-media checkers showed diverging trajectories in neural sensitivity to anticipated social reward. Observational, not causal. | PR | high | https://doi.org/10.1001/jamapediatrics.2022.4924 |
| 2.4b | Deci et al. (1999): tangible rewards undermine intrinsic motivation **more for children** than for college students, and verbal rewards enhance it less for children. | RV | high | https://doi.org/10.1037/0033-2909.125.6.627 |

### 2.5 Benefits

| # | Finding | Tag | Conf. | Source |
|---|---|---|---|---|
| 2.5a | Sailer & Homner (2020) meta-analysis of gamified learning: cognitive g=.49 (robust in rigorous studies), motivational g=.36, behavioural g=.25 (less robust). Social interaction and game fiction help. | RV | high | https://doi.org/10.1007/s10648-019-09498-w |
| 2.5b | Positive feedback **enhances** intrinsic motivation (free choice d=+0.33, interest d=+0.31). | RV | high | https://doi.org/10.1037/0033-2909.125.6.627 |

---

## 3. Frameworks for ethical engagement

| # | Framework | What an auditor takes from it | Tag | Conf. | Source |
|---|---|---|---|---|---|
| 3a | **Self-determination theory and cognitive evaluation theory** (Deci, Koestner & Ryan 1999; 128 studies) | Rewards perceived as *controlling* (expected, tangible, contingent on doing the task) undermine intrinsic motivation, with engagement-contingent d=−0.40, completion d=−0.36, performance d=−0.28. *Informational* feedback supports competence. This is the overjustification effect. Eisenberger, Pierce & Cameron dispute its generality. | RV | high | https://doi.org/10.1037/0033-2909.125.6.627 ; https://selfdeterminationtheory.org/research/cognitive-evaluation-theory |
| 3b | **Time Well Spent / Center for Humane Technology** | Origin is Tristan Harris's 2013 Google deck on respecting attention. The goal is to compete on helping people live by their values, not on time spent. Movement, not law. | POP | medium | https://www.humanetech.com/ |
| 3c | **Nir Eyal, *Hooked* (2014): Manipulation Matrix** | Two questions: would you use it yourself, and does it materially improve users' lives? The quadrants are Facilitator, Peddler, Entertainer and Dealer. Eyal concedes the Hook model can be a "recipe for manipulation". | POP | medium | (Eyal blog URL unverified) ; https://www.impactplus.com/blog/nir-eyal-manipulation-matrix |
| 3d | **Critiques of Hooked** | The test is self-assessed by the party that profits, with no outside review and no measure of user harm. Hari (*Stolen Focus*) and Axbom criticise it as a playbook. In this audit, use it only as a pre-filter and never as the gate. | POP | medium | https://www.shortform.com/blog/?p=16071 |
| 3e | **Fogg, persuasive technology** | The Fogg Behavior Model (motivation × ability × prompt) is descriptive and value-neutral. Berdichevsky & Neuenschwander (1999, *CACM*) add a "golden rule" for persuaders: don't persuade users toward outcomes you would not consent to yourself. | PR | medium | https://doi.org/10.1145/301353.301410 |
| 3f | **Gray et al. 2018 (CHI)**, dark patterns taxonomy from 118 practitioner examples | Five strategies: **nagging, obstruction, sneaking, interface interference, forced action**. Candy Crush's wait/ask/pay on lives is cited as forced action. | PR | high | https://doi.org/10.1145/3173574.3174108 |
| 3g | **Mathur et al. 2019 (CSCW)**, dark patterns at scale | About 53K product pages on about 11K shopping sites. 1,818 instances across 15 types; 183 sites were deceptive; 22 third parties sell dark patterns "turnkey". More popular sites were more likely to use them. | PR | high | https://doi.org/10.1145/3359183 |
| 3h | **Brignull, deceptive.design** | Current types include confirmshaming, nagging, fake urgency, fake scarcity, hard to cancel, **Addictive Design** and **Currency Confusion** (18 listed). | POP | high | https://www.deceptive.design/types |
| 3i | **Value-sensitive design** (Friedman et al.) | Identify direct and indirect stakeholders and their values (autonomy, wellbeing), and investigate them conceptually, empirically and technically before shipping. Gives a method for the ethics gate. | PR | medium | https://mitpress.mit.edu/9780262039536/value-sensitive-design/ |
| 3j | **CMA online choice architecture** | Not all choice architecture is harmful. Harm comes from exploiting bias against the user's interest. Ties ethics to consumer law. | LAW | high | https://www.gov.uk/government/publications/online-choice-architecture-how-digital-design-can-harm-competition-and-consumers |

**Synthesis for the skill.** SDT gives the mechanism: informational rewards are fine and controlling ones are not. Gray, Mathur and Brignull give the vocabulary of prohibited patterns. The 2024–2026 enforcement gives the concrete red list: infinite scroll, autoplay, engagement push, personalised feeds for minors, celebrating trades, and paid random rewards.

---

## 4. Practical lines a design auditor can apply

Each line is tied to at least one source above. "Minor" means under 18 unless the law says otherwise.

1. **Reward the user's own goal, not your metric.** Celebrate finishing a lesson, task or save. Never celebrate trade count, spend, session length or opens. Basis: MA Robinhood order (1.4f), Chapkovski (2.2a), OSC points (2.2c), Deci (3a).
2. **No reward on a money action.** Treat confetti, badges or points for buying, trading, betting, depositing or topping up currency as red. A neutral confirmation is fine. Basis: 1.4f, 2.2a, 2.2c, Epic (1.3b), CPC principles (1.1f).
3. **No paid randomness.** Red: random rewards purchasable with money or premium currency. For minors this is illegal in Brazil and gambling in Belgium. Basis: 1.5a–d, 2.3c, UK expectation (1.2f).
4. **Show real-money prices** wherever premium currency appears, and never use currency to blur cost. Basis: 1.1f, Brignull "Currency Confusion" (3h), ICO impact assessment (1.2c).
5. **Streaks must forgive.** Allowed (amber) for adults only with a repair or freeze option, no guilt copy, and no loss-framed push. Off by default for minors. Basis: Silverman & Barasch (2.3a), DSA Art. 28 guidelines (1.1e), ICO std 5 (1.2b), confirmshaming (3h).
6. **Build a stopping point into every feed.** Infinite scroll plus autoplay with no end state is red for minors and amber for adults. Recommend "all caught up" states, pause prompts and an active choice to continue. Basis: 1.1b, 1.1c, Meta settlement (1.4b), ICO std 5.
7. **Push notifications serve the user's goal and respect quiet hours.** Never send engagement-bait notifications. For minors: no feed notifications 12–6am in NY, and school-hours mute under the Meta settlement. Basis: 1.4h, 1.4b, 1.1b.
8. **Minors get the strict tier by default:** no streaks or autoplay by default, no algorithmic feed without consent (NY/CA), hidden social counts, and break prompts. Basis: 1.1e, 1.2b, 1.4b, 1.4g–h.
9. **Wellbeing tools must actually work.** Regulators rejected time-limit tools that were "easy to dismiss". Recommend friction proportional to the risk. Basis: 1.1b, 1.1c.
10. **Sounds, haptics and celebrations are opt-out or opt-in, and short.** Respect reduce-motion and mute settings. Basis: autonomy (3a), ICO's "active choice" principle (1.2b). There is no specific law; this is a best-practice inference.
11. **Prefer informational over tangible or contingent rewards,** especially for children. Use progress, mastery and feedback, not prizes for showing up. Basis: Deci (2.4b, 3a), Sailer & Homner (2.5a).
12. **Run the "would they endorse it on reflection?" test,** not just Eyal's self-test. Ask whether the user, seeing exactly how the mechanic works, would want it. Basis: Allcott et al. (2.1b, users' long-run preferences), Berdichevsky (3e), critique of Eyal (3d).

---

## Green / amber / red: reward patterns

| Pattern | Rating | Reason | Source(s) |
|---|---|---|---|
| Celebration on completing a user-chosen goal (lesson, workout, task, save) | **Green** | Informational and competence-supporting. Positive feedback raises intrinsic motivation. | Deci et al. 1999 (2.5b); Sailer & Homner 2020 (2.5a) |
| Progress visualisation of the user's own progress (rings, bars, mastery levels) | **Green** | Informational and not tied to spending. Intact-progress logs raise engagement. | Deci 1999 (3a); Silverman & Barasch 2023 (2.3a) |
| Opt-in or easy-to-mute sound and haptics, short duration, respects reduce-motion | **Green** | Preserves autonomy and control. | SDT (3a); ICO std 5 active choice (1.2b). Inference, no specific law |
| "You're all caught up" end state, natural stopping points, pause-and-save | **Green** | Regulators ask for exactly this. | Commission TikTok findings (1.1b); ICO std 13/5 (1.2a–b); Meta settlement pauses (1.4b) |
| Surprise-and-delight that is free and cosmetic (random free sticker on completion) | **Amber** | Variable reward drives reward-learning loops. Fine if rare, free and not the core loop. Red for minors if it is used to extend sessions. | Lindström 2021 (2.1c); ICO std 5 "reward loops" (1.2b) |
| Streaks for adults, with freeze or repair, no guilt copy | **Amber** | Effective, but the broken state demotivates and repair softens it. | Silverman & Barasch 2023 (2.3a); Duolingo blog (2.3b) |
| Badges, points, leaderboards in learning or fitness | **Amber** | Small-to-medium benefits, but controlling if tangible and expected. Competition plus collaboration works best. | Sailer & Homner (2.5a); Deci (3a) |
| Engagement push notifications (re-engagement, "your friends are…") | **Amber → Red for minors at night** | Named in DSA findings. Night and school-hour limits for minors. | 1.1b, 1.1c; NY SAFE (1.4h); Meta settlement (1.4b) |
| Visible like or reaction counts | **Amber** (adults) / **Red-leaning** (minors) | Hidden by default for teens under the Meta settlement. The CA like-count mandate was blocked on 1st Amendment grounds, so this is not legally required in CA. | 1.4b; 1.4g |
| Personalised infinite feed plus autoplay (adults) | **Amber** | At the centre of the DSA addictive-design cases. Needs stopping cues and a working break tool. | 1.1b; 1.1c |
| Personalised or algorithmic feed, autoplay or streaks **default-on for minors** | **Red** | The DSA Art. 28 guidelines say off by default. NY and CA require consent for minors' algorithmic feeds. ICO std 5. | 1.1e; 1.4g; 1.4h; 1.2b |
| Loss-framed streak guilt ("you'll lose everything", sad mascot nags, shame copy) | **Red** | Confirmshaming and nagging. The ICO says not to imply that stopping loses out. | Brignull (3h); Gray 2018 nagging (3f); ICO std 5 (1.2b) |
| Rewards for engagement contingent on time or opens (daily login bonus for showing up) | **Red** (minors) / **Amber** (adults) | Engagement-contingent rewards undermine motivation the most (d=−0.40). ICO cites in-game advantages for extended play. | Deci 1999 (3a); ICO std 5 (1.2b) |
| Confetti, badges or points for trading, betting or spending | **Red** | The Robinhood order bars celebratory imagery tied to trading frequency. Points led to 39% more trades. Gamification attracts lower-literacy users. | MA Robinhood 2024 (1.4f); OSC (2.2c); Chapkovski 2024 (2.2a) |
| Lottery or scratch-card mechanics in finance apps; "most popular" push lists | **Red** | Expressly barred in the Robinhood order (MA accounts). | 1.4f |
| Paid loot boxes or gacha (random reward for money or premium currency) | **Red** | Gambling in Belgium; banned for minors in Brazil; M+ in Australia; correlates with problem gambling. | 1.5a–d; Spicer 2022 (2.3c); UK 2022 (1.2f) |
| Premium currency that hides the real price; time-limited offers to children | **Red** | CPC principles; ICO impact assessment; Brignull "Currency Confusion", fake urgency. | 1.1f; 1.2c; 3h |
| Purchase flows where a single tap or confusable button triggers a charge | **Red** | Epic: $245M in refunds. | 1.3b |
| Making it hard to leave, cancel or turn off (obstruction around rewards or subscriptions) | **Red** | Amazon: $2.5B. Obstruction is in the Gray taxonomy. | 1.3c; 3f |
| Dismissible "wellbeing" tools offered as cover for addictive defaults | **Red** | The Commission rejected easy-to-dismiss time tools at both TikTok and Meta. | 1.1b; 1.1c |

---

## Unverified or open items

- Final DSA decisions or fines in the TikTok and Meta addictive-design cases: none found (still preliminary as of Oct 2026).
- Digital Fairness Act proposal adoption: not found as of early Sep 2026. Expected late 2026.
- Whether the final DSA Art. 28 guidelines text names loot boxes and virtual currencies: seen only in the draft §6.6.
- Meta multistate settlement: the exact number of states, the total amount and the approval timing conflict across sources. The Florida withdrawal comes from a single source.
- Second New Mexico verdict (Sep 2026): a single source.
- LA JCCP verdict post-trial status and appeal: not found.
- KOSA status after mid-Aug 2026.
- Brazil ECA Digital fine amounts (R$50M reported): not checked against the statute.
- "Streak anxiety" as a measured, peer-reviewed effect: no study found.
- Exact Manipulation Matrix wording: drawn from secondary summaries; the book was not checked.

---

## Sources

**Law, regulators, official guidance**
- DSA, Regulation (EU) 2022/2065: https://eur-lex.europa.eu/eli/reg/2022/2065/oj
- Commission, TikTok addictive design (6 Feb 2026): https://digital-strategy.ec.europa.eu/en/news/commission-preliminarily-finds-tiktoks-addictive-design-breach-digital-services-act ; https://ec.europa.eu/commission/presscorner/detail/en/ip_26_312
- Commission, Meta addictive design (10 Jul 2026): https://digital-strategy.ec.europa.eu/en/news/commission-preliminarily-finds-addictive-design-instagram-and-facebook-breach-digital-services-act ; https://ec.europa.eu/commission/presscorner/detail/en/ip_26_1579
- Commission, Art. 28 minors guidelines (14 Jul 2025): https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-protection-minors
- CPC virtual currency principles: https://commission.europa.eu/news/european-commission-hosts-stakeholders-talks-application-cpc-networks-key-principles-games-virtual-2025-06-03_en
- EP Legislative Train, DFA: https://www.europarl.europa.eu/legislative-train/theme-protecting-our-democracy-upholding-our-values/file-digital-fairness-act
- ICO Children's Code std 13: https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services/13-nudge-techniques/
- ICO Children's Code std 5: https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/childrens-information/childrens-code-guidance-and-resources/age-appropriate-design-a-code-of-practice-for-online-services/5-detrimental-use-of-data/
- CMA Online Choice Architecture: https://www.gov.uk/government/publications/online-choice-architecture-how-digital-design-can-harm-competition-and-consumers
- DCMS loot box response (2022): https://www.gov.uk/government/consultations/loot-boxes-in-video-games-call-for-evidence/outcome/government-response-to-the-call-for-evidence-on-loot-boxes-in-video-games
- FTC, Bringing Dark Patterns to Light: https://www.ftc.gov/reports/bringing-dark-patterns-light
- FTC, Epic Games: https://www.ftc.gov/news-events/news/press-releases/2023/03/ftc-finalizes-order-requiring-fortnite-maker-epic-games-pay-245-million-tricking-users-making
- FTC, Amazon Prime: https://www.ftc.gov/news-events/news/press-releases/2025/09/ftc-secures-historic-25-billion-settlement-against-amazon
- US Surgeon General Advisory (2023): https://www.hhs.gov/sites/default/files/sg-youth-mental-health-social-media-advisory.pdf
- Massachusetts Securities Division enforcement news: https://www.sec.state.ma.us/divisions/news/enforcement-news.htm
- Raad van State, EA/KSA: https://www.raadvanstate.nl/uitspraken/@130150/202005769-1-a3/
- NY Senate, SAFE for Kids rules: https://www.nysenate.gov/newsroom/press-releases/2026/andrew-gounardes/sen-gounardes-new-safe-kids-rules-create-safer
- OSC gamification research: https://www.osc.ca/en/news-events/news/osc-publishes-gamification-research-and-launches-new-trading-simulation-tool-investor-education

**Peer-reviewed / reviews**
- Orben & Przybylski 2019: https://doi.org/10.1038/s41562-018-0506-1
- Allcott, Gentzkow & Song 2022: https://ideas.repec.org/a/aea/aecrev/v112y2022i7p2424-63.html
- Lindström et al. 2021: https://doi.org/10.1038/s41467-020-19607-x
- Odgers 2024 (Nature review): https://www.nature.com/articles/d41586-024-00902-2
- Chapkovski, Khapko & Zoican 2024: https://doi.org/10.1287/mnsc.2022.02650
- Kalda et al. (NBER w28363): https://ideas.repec.org/p/nbr/nberwo/28363.html
- Silverman & Barasch 2023: https://doi.org/10.1093/jcr/ucac029
- Spicer et al. 2022: https://researchportal.plymouth.ac.uk/en/publications/loot-boxes-problem-gambling-and-problem-video-gaming-a-systematic/
- Garea et al. (loot box meta-analysis): https://figshare.utas.edu.au/articles/journal_contribution/Meta-analysis_of_the_relationship_between_problem_gambling_excessive_gaming_and_loot_box_spending/22996898
- Xiao 2022 (Belgium): https://rr.peercommunityin.org/articles/rec?id=264
- Maza et al. 2023: https://doi.org/10.1001/jamapediatrics.2022.4924
- Deci, Koestner & Ryan 1999: https://doi.org/10.1037/0033-2909.125.6.627
- Sailer & Homner 2020: https://doi.org/10.1007/s10648-019-09498-w
- Gray et al. 2018: https://doi.org/10.1145/3173574.3174108
- Mathur et al. 2019: https://doi.org/10.1145/3359183
- Berdichevsky & Neuenschwander 1999: https://doi.org/10.1145/301353.301410

**Press / practitioner / law-firm**
- Meta settlement terms: https://www.pearlcohen.com/meta-settles-with-attorneys-general-for-up-to-17-billion-agrees-to-design-changes/ ; https://www.mlex.com/mlex/amp/articles/2518312 ; https://cobbcountycourier.com/2026/08/changes-to-facebook-and-instagram-are-key-part-of-metas-17b-settlement-with-the-states-over-harm-to-teens/
- LA verdict: https://www.mealeys.com/mealeys/articles/2458206
- NM verdict: https://www.kanw.org/new-mexico-news/2026-03-25/santa-fe-jury-awards-new-mexico-375m-in-meta-child-exploitation-case
- 2023 AG suit: https://www.nbcnews.com/tech/tech-news/meta-sued-33-state-ags-addictive-features-targeting-kids-rcna121927
- MDL school bellwether: https://www.seegerweiss.com/news/first-social-media-addiction-mdl-bellwether-trial-settlement/
- Robinhood: https://www.wealthmanagement.com/regulation-compliance/robinhood-pays-75m-settle-massachusetts-gamification-charge
- SB 976: https://epic.org/ninth-circuit-rejects-netchoices-attack-on-californias-addictive-feed-regulation/
- NY SAFE: https://www.insideprivacy.com/childrens-privacy/new-york-publishes-final-safe-for-kids-act-rules/
- Brazil ECA Digital: https://www.demarest.com.br/en/eca-digital-nova-lei-de-protecao-de-criancas-e-adolescentes-no-ambiente-digital/
- Australia classification: https://www.pocketgamer.biz/australia-sets-new-rules-for-video-games-with-gambling-like-content
- China NPPA: https://www.sixthtone.com/news/1008398
- DMCC Act: https://www.pinsentmasons.com/out-law/analysis/dmcc-act-overhauls-uk-consumer-law-enforcement
- SEC withdrawal: https://www.paulhastings.com/insights/client-alerts/sec-withdraws-14-pending-rule-proposals
- KOSA: https://congressionaldigest.com/issue/kids-online-safety-act/what-congress-is-doing-on-kids-online-safety/
- Deceptive design types: https://www.deceptive.design/types
- Manipulation Matrix: (Eyal blog URL unverified) ; https://www.impactplus.com/blog/nir-eyal-manipulation-matrix
- Duolingo streak blog: https://blog.duolingo.com/how-duolingo-streak-builds-habit
- Ferguson debate: https://www.afterbabel.com/p/fundamental-flaws-part-3
- Haidt/Odgers debate: https://holdenthorp.substack.com/p/more-on-the-muddled-science-on-teens
- Center for Humane Technology: https://www.humanetech.com/
