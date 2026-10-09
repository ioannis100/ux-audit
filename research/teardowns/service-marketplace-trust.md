# Service marketplace teardown: trust, fairness and law (EU / Cyprus focus)

Research for the ux-audit skill. Use it when auditing a two-sided service marketplace, where clients book providers for cleaning, repairs, tutoring and similar work. The owner's first target is a local Cyprus (EU) marketplace. The file covers what the UX must show at each trust moment, which manipulation to flag, and the law and research behind each point.

**Tags.** **[LAW]** statute or regulation text, or an official summary of it. **[ENF]** a regulator decision, fine, settlement or sweep. **[PR]** peer-reviewed research (a working paper is marked "WP"). **[S]** company-stated (help centre, terms, newsroom). **[POP]** press or law-firm commentary. **Confidence:** H = read in the primary source or in several agreeing sources. M = one good secondary source, or a primary source seen only in summary. L = thin or conflicting. "Unverified" means no confirming source was found, so do not rely on it.

**Method and limits.** Gathered by web search on 2026-10-09. EUR-Lex blocked automated access with a bot challenge, which was not bypassed. As a result, the EU directive texts (Omnibus 2019/2161, UCPD, CRD) were checked through official summaries, the Irish implementing statute, the UK-retained P2B text and law-firm briefings, not the Official Journal itself. These items are marked M. DSA article texts were read through the springlex.eu mirror of OJ L 277. This file is not legal advice. A Cyprus lawyer should confirm the national position before the audit states any legal conclusion as fact.

---

## Summary (10 bullets)

1. **Ratings inflate, and fewer stars do not fix it.** Average ratings rose over time in five marketplaces, mostly because raters do not want to hurt the seller. On those platforms a 4.6 can be a warning sign [PR, H] (Filippas, Horton & Golden 2022). The audit should check whether the UX gives clients signals beyond the star average: review text, completion rate, repeat-hire rate, and "rated X of N jobs".
2. **Two-sided reviews need simultaneous reveal.** On Airbnb, hiding each side's review until both had submitted raised review rates and cut retaliation. Ratings came out lower, which means more honest [PR, H] (Fradkin, Grewal & Holtz 2021). Airbnb publishes a home review when both sides have submitted or after 14 days [S, H].
3. **Review gating and suppression are illegal on both sides of the Atlantic.** In the EU, a trader that shows reviews must say whether and how it checks that they come from real customers. Calling unchecked reviews "verified" and posting fake reviews are both blacklisted (Omnibus 2019/2161) [LAW, M]. The US FTC rule (16 CFR 465, effective 21 Oct 2024) bans fake reviews, sentiment-conditional incentives and sentiment-based suppression [LAW, H]. The UK DMCC Act made fake reviews a banned practice from 6 Apr 2025 [LAW, H]. Fashion Nova paid $4.2m for holding back sub-4-star reviews [ENF, H].
4. **Every paid placement must be labelled, and the ranking logic must be explained.** EU consumer law blacklists search results that do not disclose paid ads or payment for higher ranking (Omnibus, Annex I 11a) [LAW, M]. The P2B Regulation, Art. 5, requires the main ranking parameters, and any paid-ranking option, to be written into the terms for providers [LAW, H]. DSA Arts. 25–27 (no dark patterns, ad labels, recommender parameters) and Arts. 30–32 (trader traceability) **do not apply to micro or small platforms** (Arts. 19 and 29) unless designated VLOP [LAW, H]. A small Cyprus marketplace is still bound by the UCPD, CRD and P2B.
5. **Show the full price from the first price shown.** EU and UK law require the total price including mandatory fees. The UK CMA can fine up to 10% of global turnover and opened drip-pricing investigations in Nov 2025 [LAW/ENF, H]. EU consumer authorities made Airbnb show all mandatory fees in the displayed price in 2019 [ENF, H]. The US FTC fees rule is narrow: it covers only live-event tickets and short-term lodging (effective 12 May 2025) [LAW, H].
6. **Holding money until the job is done is the strongest trust signal, but it is regulated.** Airtasker holds funds with Stripe until the client presses "Release payment" [S, H]. Upwork protects only work done under funded milestones [S, H]. Under EU payment law, a platform that holds client money for both sides is unlikely to fall under the commercial-agent exclusion (EBA Q&A 2020_5354) [ENF, M]. Use a licensed payment provider's marketplace product, and never hold the funds yourself without checking the licensing position.
7. **Guarantees must state their limits where they are promoted.** TaskRabbit's Happiness Pledge is discretionary, up to $10,000, claims within 30 days, and "not insurance" [S, H]. A third-party "$1,000,000" claim is unverified. Checkatrade's guarantee is up to £1,000 and discretionary [S, H]. Airbnb says AirCover "is not an insurance policy" [S, H]. A badge without the limits in plain view risks being a misleading claim (UCPD Art. 6).
8. **Keeping contact on-platform protects users, and the UX should say why.** Fiverr bans moving business off-platform and gives fraud and lost dispute coverage as its reasons [S, H]. Airbnb withholds phone numbers and emails before a confirmed booking and says requests to pay outside Airbnb "may be fraudulent" [S, H]. In an RCT, more trust raised disintermediation, which offset the platform's gains past a point [PR, H] (Gu & Zhu 2021). Mask contact details before booking. After booking, allow contact with an explanation instead of a silent block.
9. **A verification badge must mean what it says.** The Commission fined X €120m (Dec 2025), partly because anyone could pay for "verified" status without real identity checks, which it found to be a deceptive design [ENF, H]. Care.com said it did not check caregivers or verify licences, and its listings showed licences that did not exist (WSJ 2019) [POP, H]. In the EU, criminal-record checks need a specific legal basis under GDPR Art. 10, so "background checked" is often not lawful to offer there [LAW, H].
10. **Newcomers face a cold-start barrier, and the design of the marketplace can cause discrimination.** Hiring inexperienced workers and giving them a public evaluation tripled their later earnings [PR, H] (Pallais 2014). Requests from Black-sounding names were accepted 16% less often on Airbnb [PR, H] (Edelman, Luca & Svirsky 2017). One positive review removed the gap [PR, H] (Cui, Li & Zhang 2020). Airbnb's own measures: showing the guest photo only after booking closed about one-fifth of the gap, and Instant Book narrowed it [S, M]. Give newcomers a fair label instead of an empty five-star scale, and hold identity cues back until after acceptance.

---

## 1. Reviews and reputation

### 1.1 What the research says

- **Reputation inflation.** Average buyer ratings of sellers rose substantially in five marketplaces. In the one with detailed transaction data, most of the rise was inflation, not better service. The proposed mechanism is that raters avoid harming the rated party. [PR, H] Filippas, Horton & Golden, *Marketing Science* 41(4) 2022, doi 10.1287/mksc.2022.1350. https://dspace.mit.edu/handle/1721.1/144173
  - *UX implication.* A top-heavy 5-point scale soon stops telling providers apart. Audit for (a) distribution histograms, not only the mean; (b) the share of jobs that got rated; (c) private feedback to the platform that is separate from the public rating.
- **Silence as signal.** eBay's "percent positive" only counts transactions that received feedback. An "effective percent positive" that also counts silent transactions varied far more across sellers, and it predicted whether buyers came back. [PR-WP, M] Nosko & Tadelis, NBER WP 20830 (2015). https://www.nber.org/papers/w20830. The secondary summary reports a mean of 99.3% positive against about 64% EPP [POP, L]. https://www.chicagobooth.edu/review/making-bid-for-more-accurate-ebay-seller-profiles
- **Reciprocity distorts two-way feedback.** On eBay, mutual feedback occurred 64% of the time, against 49% if the two sides were independent. Lab experiments showed that changing how feedback flows (for example blind entry) reduced the distortion. [PR, M] Bolton, Greiner & Ockenfels, *Management Science* 59(2) 2013, doi 10.1287/mnsc.1120.1609. https://pubsonline.informs.org/doi/abs/10.1287/mnsc.2013.1707
- **Simultaneous reveal works.** In an Airbnb field experiment, hiding reviews until both sides had submitted raised review rates and reduced retaliatory and reciprocal reviewing, so ratings came out lower. It did not reduce adverse selection. [PR, H] Fradkin, Grewal & Holtz, *Marketing Science* 40(6) 2021, doi 10.1287/mksc.2021.1311. https://papers.ssrn.com/abstract=2939064
  - Current Airbnb rule: guest and host have 14 days after checkout. A home review is published when both have submitted or when the 14 days run out. Reviews for services and experiences publish at once. [S, H] https://www.airbnb.com/help/article/995
- **Paying for reviews adds volume but not value.** A $25 coupon for reviewing a listing with no reviews raised review rates by 53% and produced lower average ratings. Nights sold did not change. [PR, H] Fradkin & Holtz, *Marketing Science* 2023, doi 10.1287/mksc.2023.1439. https://newsroom.haas.berkeley.edu/research/study-using-airbnb-data-sheds-light-on-whether-incentivizing-customer-reviews-makes-a-difference/
- **Prompt timing.** Two field experiments with more than 300,000 consumers on Korean travel and apparel marketplaces found that reminders sent sooner than customers naturally review hurt response. Next-day reminders were especially bad for younger users. Delayed reminders improved review specificity, and timing had a "negligible" effect on ratings. Experience goods (services) need more time before the ask. [PR, M] Jung, Ryu, Han & Cho, *Journal of Marketing* 2023. https://www.ama.org/press-releases/press-release-from-the-journal-of-marketing-ask-for-customer-reviews-at-the-right-time-in-many-cases-sooner-may-not-be-better/
- **Fake reviews follow incentives.** About 16% of Yelp restaurant reviews were filtered as suspicious. Businesses with weak or recently worsened reputations were more likely to commit fraud, and businesses facing more competition received more negative fakes. [PR, H] Luca & Zervas, *Management Science* 62(12) 2016, doi 10.1287/mnsc.2015.2304. https://open.bu.edu/items/14162aac-32a6-4296-b624-9d0e26e8f98c

### 1.2 What the law says

- **EU, UCPD as amended by the Omnibus Directive 2019/2161 (applies from 28 May 2022).**
  - Art. 7(6): a trader that gives access to consumer reviews must say whether and how it ensures that they come from consumers who used or bought the product. Omitting this counts as a misleading omission. [LAW, M] Official summary in the EP procedure file https://oeil.europarl.europa.eu/oeil/en/procedure-document-summary/pdf?id=1582276. The Irish implementing text is s.46(3B) of the Consumer Protection Act 2007 https://revisedacts.lawreform.ie/eli/2007/act/19/section/46/revised/en/html
  - The disclosure should cover how reviews are collected and processed, whether all are published, and how the score is calculated. It belongs where the reviews appear, or behind a link from there. [POP, M] https://mondaq.com/dodd-frank-consumer-protection-act/1189542/the-omnibus-directive-consumer-reviews
  - Annex I 23b (blacklisted): claiming that reviews come from real users without reasonable and proportionate steps to check. Annex I 23c (blacklisted): submitting or commissioning fake reviews, or misrepresenting reviews. [LAW, M] https://www.cuatrecasas.com/en/global/art/consumer-protection-in-the-digital-single-market-directive-2019-2161
  - Enforcement sweep (Jan 2022): authorities could not confirm that 144 of 223 sites checked did enough to ensure reviews were authentic, and 176 did not say that incentivised reviews were banned. The widely reported "55%" figure is not traceable to the sweep. [ENF, H] https://www.lawsociety.ie/gazette/top-stories/2022/eu-warns-firms-over-misleading-online-consumer-reviews/
  - **Cyprus.** The main statute is the Consumer Protection Law 112(I)/2021, enforced by the Consumer Protection Service. Commentators say it reflects the Omnibus Directive [LAW/POP, M] https://www.mondaq.com/cyprus/dodd-frank-consumer-protection-act/1081792/consumer-protection-law-2021. The exact Cypriot section numbers for the review rules are **unverified**.
- **US: FTC Trade Regulation Rule on Consumer Reviews and Testimonials, 16 CFR Part 465.** Announced 14 Aug 2024, published in the Federal Register 22 Aug 2024, effective 21 Oct 2024. It bans fake or false reviews, including AI-written ones and those by people with no experience of the product. It also bans incentives conditioned on positive or particular sentiment, undisclosed insider reviews, company-controlled "independent" review sites, and suppression unless filtering criteria apply equally regardless of sentiment (s.465.7). Civil penalties are available. [LAW, H] https://www.ftc.gov/system/files/ftc_gov/pdf/r311003consumerreviewstestimonialsfinalrulefrn.pdf. Whether it has been amended or challenged since 2024 is **unverified**.
  - Precedent: **Fashion Nova** (2022) paid $4.2m. It auto-posted 4–5-star reviews and held lower ones for approval it never gave. This was the FTC's first review-suppression case. [ENF, H] https://www.ftc.gov/node/77871
- **UK: DMCC Act 2024.** Schedule 20, para 13 bans fake reviews and concealed-incentive reviews, publishing reviews in a misleading way, and failing to take reasonable and proportionate steps to prevent and remove fake reviews. It commenced 6 Apr 2025 with a three-month grace period. The CMA can fine up to 10% of global turnover without going to court. CMA guidance (CMA208, 4 Apr 2025) recommends a written review policy. In Jul 2025 the CMA found more than half of over 100 sites checked lacked a compliant policy. [LAW/ENF, H] https://cms.law/en/gbr/legal-updates/no-more-faux-five-stars-the-dmcc-act-bans-fake-reviews. One source places the ban in Schedule 19; CMS says Schedule 20 (L on numbering).

### 1.3 Audit rules derived

| Check | Pass | Flag (manipulation) | Basis |
|---|---|---|---|
| Review provenance note next to reviews | "Only clients who booked and paid can review. We publish all reviews except [rules]. Score = mean of last N." | No note, or "verified" with no check behind it | UCPD 7(6), Annex I 23b [LAW] |
| Who can review | Only after a completed, paid booking | Anyone can review, or the provider can invite reviewers off-platform | 23b; Luca & Zervas [PR] |
| Two-sided reveal | Blind until both submit or the window closes | One side sees the other's review before writing | Fradkin et al. 2021 [PR] |
| Prompt timing | After the service is done, with a reminder after a short delay | Prompting before completion, or the same minute | Jung et al. 2023 [PR] |
| Gating | Same review ask to every client | "Happy? Rate us. Not happy? Contact support" (sentiment routing) | FTC 465.7; Fashion Nova [ENF] |
| Incentives | None, or unconditional and labelled | Reward for 5 stars or for "positive" reviews | FTC 465.4; DMCC Sch.20 [LAW] |
| Score display | Mean + count + distribution + "N of M jobs reviewed" | Rounded-up stars, or no count | Filippas et al.; Nosko & Tadelis |
| Provider replies | Provider can reply publicly, and the client cannot be pressured | Provider can ask for edits in exchange for refunds | DMCC "misleading review info" [LAW] |

---

## 2. Ranking, paid placement and fee transparency

### 2.1 Ranking

- **P2B Regulation (EU) 2019/1150, Art. 5.** It covers online intermediation services that serve business users, meaning providers acting as traders, and has applied since 12 Jul 2020. Art. 5(1): the main ranking parameters and their relative importance must be in the terms and conditions. Art. 5(3): where ranking can be influenced "against any direct or indirect remuneration", the platform must describe that option and its effect. Art. 5(6): it need not disclose algorithms. [LAW, H] UK-retained text: https://www.legislation.gov.uk/eur/2019/1150/article/5. Commission Ranking Guidelines 2020/C 424/01 (7 Dec 2020) ask for a "user-oriented" plain-language explanation and include a section on paid ranking [ENF/POP, M] https://www.debandt.eu/fr/node/422
  - Applies only to business users. Private individuals offering services are not "business users". Whether P2B's complaint-handling duty (Art. 11) exempts small enterprises is **unverified** here.
- **Consumer side, UCPD as amended by the Omnibus.** Art. 7(4a): when consumers can search across traders, the main ranking parameters and their relative importance count as material information, in a specific section reachable from the results page [LAW, M]. Annex I 11a (blacklisted): showing search results without clearly disclosing paid advertising or payment made specifically for higher ranking [LAW, M] https://www.addleshawgoddard.com/en/insights/insights-briefings/2020/competition/the-eu-omnibus-directive--time-to-prepare-for-strengthened-consumer-laws/
- **CRD Art. 6a (added by the Omnibus).** Before the contract, an online marketplace must tell the consumer: the main ranking parameters; whether the provider is a trader, based on the provider's declaration; if not, that EU consumer rights do not apply; and how obligations are split between the platform and the provider. [LAW, M] https://www.wiggin.co.uk/app/uploads/2022/05/The-Omnibus-Directive-Is-Your-Business-Ready.pdf. This matters for a Cyprus marketplace that mixes registered businesses with private individuals offering services.
- **DSA (EU) 2022/2065.** It has applied to all intermediaries since 17 Feb 2024.
  - Art. 25: no interface designed to deceive or manipulate, or that materially impairs free and informed decisions. Art. 25(2) excludes practices already covered by the UCPD or GDPR, so for consumer marketplaces the UCPD usually governs. [LAW, H] https://www.springlex.eu/en/packages/dsa/dsa-regulation/article-25/
  - Art. 26: each ad must be labelled in real time, with the advertiser, the payer and the main targeting parameters. [LAW, H] https://www.springlex.eu/en/packages/dsa/dsa-regulation/article-26/
  - Art. 27: recommender main parameters and user options must be in the terms. [LAW, H] https://www.springlex.eu/en/packages/dsa/dsa-regulation/article-27/
  - **Art. 19 exempts micro and small enterprises from Arts. 20–28** (<50 staff and ≤€10m turnover or balance sheet, on a consolidated group basis), unless the platform is a VLOP. [LAW, H] https://www.springlex.eu/en/packages/dsa/dsa-regulation/article-19/
  - The Commission had not issued Art. 25 guidelines by Jul 2025, and none were found since [POP, M] https://www.osborneclarke.com/insights/digital-fairness-act-unpacked-dark-patterns
  - First DSA non-compliance decision: X fined €120m on 5 Dec 2025, partly for the paid "verified" checkmark as deceptive design [ENF, H] https://digital-strategy.ec.europa.eu/en/news/commission-fines-x-eu120-million-under-digital-services-act
- **Cyprus DSA enforcement.** The Cyprus Radio Television Authority was designated Digital Services Coordinator (Council of Ministers, 2 Feb 2024). The Commission referred Cyprus to the CJEU for failing to give it powers. The implementing law was adopted 11 Jul 2025. The Consumer Protection Service is among the named competent authorities. [ENF, M] https://www.cna.org.cy/en/article/8411447/cyprus-referred-to-eu-court-for-not-empowering-its-digital-services-coordinator ; https://merlin.obs.coe.int/article/10009
- **Coming:** the EU Digital Fairness Act (dark patterns, addictive design, personalisation, subscriptions) is listed for Q4 2026. Press reports point to a November proposal, possibly 18 Nov. It had **not been proposed** as of the latest source (23 Sep 2026) [POP, M] https://www.europarl.europa.eu/legislative-train/theme-protecting-our-democracy-upholding-our-values/file-digital-fairness-act

### 2.2 Prices, fees and drip pricing

- **EU.** CRD Art. 6(1)(e) requires the total price including taxes, or how it is calculated if it cannot be set in advance. This wording comes from general knowledge and was **not read in the OJ this session**. The Price Indication Directive 98/6 requires an unambiguous final selling price including VAT. Member States may exempt products supplied as part of a service, so for services the CRD and UCPD do most of the work. [LAW, M] https://webgate.ec.europa.eu/e-justice/599/EN/price_indication_directive_986
  - Enforcement precedent: after a 2018 CPC common position, Airbnb committed (factsheet 11 Jul 2019) to show the total price including all mandatory fees whenever properties are offered, and to distinguish professional hosts from private ones. [ENF, H] https://commission.europa.eu/live-work-travel-eu/consumer-rights-and-complaints/enforcement-consumer-protection/coordinated-actions/accommodation-booking_en
  - No CJEU judgment on drip pricing under CRD 6(1)(e) was found (**unverified**).
- **UK, DMCC Act s.230.** An invitation to purchase must include the total price with all mandatory fees. Partitioned and drip pricing are caught. Marketplaces that make invitations to purchase are responsible. Fines can reach £300k or 10% of turnover. Final CMA price-transparency guidance came out 18 Nov 2025, when the CMA opened investigations into eight firms, including StubHub and viagogo. [LAW/ENF, H] https://www.osborneclarke.com/insights/uk-cma-finalises-guidance-price-transparency-under-dmcca-and-begins-enforcement-action
- **US, FTC Rule on Unfair or Deceptive Fees (16 CFR 464).** Announced 17 Dec 2024, effective 12 May 2025. It was **narrowed to live-event tickets and short-term lodging only**. It requires the total price to be the most prominent price, with only government taxes, shipping and optional add-ons excluded. [LAW, H] https://www.govinfo.gov/content/pkg/FR-2025-01-10/html/2024-30293.htm. It does **not** cover general service marketplaces. For those, the FTC Act s.5 still applies.

### 2.3 Audit rules derived

- The first price a client sees on a provider card or quote equals what they pay, including the platform service fee and mandatory call-out fee. Variable items such as hourly or parts costs show the method ("€25/h, est. 2–3 h, total shown before you confirm").
- Every boosted result carries an "Ad" or "Sponsored" label on the card itself, and the advertiser can be identified. A tooltip alone is not enough.
- The results page has a link titled something like "How we rank providers", listing the main factors, their order of importance, and whether payment affects position.
- The provider profile shows "Registered business" or "Private individual". For a private individual it adds a one-line note that consumer-law rights against that provider differ (CRD 6a).
- The provider dashboard explains ranking factors and any paid boosts (P2B Art. 5).

---

## 3. Payments, protection and disputes

### 3.1 Patterns in market leaders

- **Airtasker Pay (escrow).** The card is charged when a Tasker is assigned. Funds are held with Stripe, or in an Airtasker trust account depending on the article, until the client taps "Release payment". Bank transfer takes 3–5 business days. During a dispute, the money stays held, and dispute resolution is free. [S, H] https://support.airtasker.com/hc/en-au/articles/205832700-How-do-I-pay-the-Tasker ; https://support.airtasker.com/hc/en-gb/articles/115010433128-Why-was-my-card-charged-when-the-task-hasn-t-started
  - *UX lesson.* The help article exists because users ask "why was I charged before the task?". The hold must be explained at the moment of the charge, with copy like "Held securely, released only when you confirm the job is done".
- **Upwork.** Fixed-price protection applies only if the milestone was funded before work started and the work was submitted via "Submit Work". Payment releases automatically if the client does not respond within 14 days (staff statement). Hourly protection requires desktop-app time tracking, a verified ID and a verified billing method. Upwork says payment "isn't guaranteed in every case". [S, M] https://support.upwork.com/hc/en-us/articles/211068288
- **TaskRabbit Happiness Pledge.** It is discretionary, "up to $10,000" for property damage, bodily injury or theft by a Tasker. The task must be booked and paid on-platform, and claims are due within 30 days. Users must first try the other party and their own insurance. TaskRabbit states it does not provide insurance. [S, H] https://support.taskrabbit.com/hc/en-us/articles/360035570011. A "$1,000,000" figure on review blogs is **unverified** and contradicts the help centre.
- **Airbnb AirCover for guests.** If the listing is significantly different from what was advertised and the host cannot fix it, Airbnb rebooks the guest somewhere comparable or refunds them. It includes a 24-hour safety line. It "is not an insurance policy". [S, H] https://www.airbnb.co.uk/aircover. The 72-hour reporting window and 30-day booking protection come from third parties and are **unverified**.
- **Checkatrade Guarantee (UK home services).** It is discretionary, up to £1,000 per approved claim, and must be raised within 6 months of completion (terms for work after 29 Jan 2026). Earlier terms differed. [S, H] https://www.checkatrade.com/guaranteed-trade-terms

### 3.2 Law that constrains the pattern

- **Holding client funds.** The EBA Q&A 2020_5354 says an e-commerce platform that receives payment for the payee is **not excluded from PSD2 by default**. The fact that receipt settles the payer's debt is not by itself a reason to exclude it. [ENF, M] https://www.eba.europa.eu/single-rule-book-qa/qna/view/publicId/2020_5354. Since PSD2, the commercial-agent exclusion applies only to an agent acting for one side, which is hard for marketplaces to meet [POP, M] https://www.cliffordchance.com/briefings/2017/11/impact_of_psd2_ononlinemarketplacesoperatin.html. The draft PSR narrows it further, and its final status is **unverified**.
  - *Audit implication.* "Pay safely in-app, released when done" is a strong pattern. Check, or ask the owner, that a licensed PSP's marketplace product holds the funds.
- **Guarantee claims are commercial claims.** Calling a discretionary pledge "guaranteed protection" without limits shown nearby risks a misleading action or omission under UCPD Arts. 6–7 [LAW, M]. This is an inference from the general clauses, not from a specific decision.
- **Disputes.** DSA Art. 20 internal complaint handling applies only to non-small platforms (Art. 19) [LAW, H]. Under P2B, providers who are business users get complaint rights. For consumers, the national ADR route applies. The EU ODR platform link duty was due to be repealed in 2025, and that repeal is **unverified** here.

### 3.3 Off-platform contact: why masking exists, and its limits

- **Fraud.** Fiverr gives fraud and scams, privacy breaches and limited recourse as its reasons. It says fraudulent users try to lure people off-platform because there "transactions aren't protected". [S, H] https://help.fiverr.com/hc/en-us/articles/38728907371665
- **Disintermediation.** In an RCT on a freelance marketplace, more trust raised the chance of high-quality hires. Past a threshold it also raised fee-avoiding disintermediation, which offset the revenue gains. [PR, H] Gu & Zhu, *Management Science* 67(2) 2021, doi 10.1287/mnsc.2020.3583. https://ideas.repec.org/a/inm/ormnsc/v67y2021i2p794-807.html
- **Airbnb practice.** No email or phone is shared before a confirmed reservation, "for your safety and privacy". In some US bookings, real numbers in messages are replaced with temporary ones. Requests to pay outside Airbnb "may be fraudulent", and wire transfers and PDF invoices are listed as red flags. [S, H] https://www.airbnb.com/help/article/3764 ; https://www.airbnb.com/help/article/199
- **Airtasker.** Contact details are banned in public comments. They may be shared privately once an offer is accepted or the Tasker assigned, and the wording varies by page. [S, H] https://www.airtasker.com/uk/community-guidelines-poster
- **Balance with user rights.** Scanning private messages to detect contact details is processing personal data. It needs a GDPR legal basis and transparency, and DSA terms must describe content moderation (Art. 14) [LAW, M]. Silent deletion with no explanation is an audit flag. Inline notices such as "We hide numbers until you book, so you keep payment protection" are a pass. After booking, users should be able to coordinate access to the home.

---

## 4. Identity and safety

### 4.1 Verification

- **TaskRabbit.** All Taskers must pass identity verification through Persona and Checkr, with an ID photo and selfie, usually within 5 minutes. In the UK there is a right-to-work check with selfie matching. [S, H] https://support.taskrabbit.com/hc/en-us/articles/115005156463-Identity-Verification-Process
- **Checkatrade** says it runs up to 12 checks, including photo ID, trading address, company and directorship history, adverse media and credit. Where trades require qualifications, it asks for proof such as Gas Safe or NICEIC, plus public liability insurance. [S, M] https://www.checkatrade.com/blog/trust/. Independent commentary warns that directory vetting does not replace checking statutory registers [POP, M] https://elec.training/news/can-customers-trust-trade-directories-to-find-a-trusted-tradesperson/
- **Thumbtack** tells customers to verify occupational licences and insurance themselves [S, M] https://www.thumbtack.com/safety. That is an honest pattern: it does not claim checks it does not run.
- **Care.com (cautionary).** The WSJ (2019) reported that it did not background-check caregivers or verify licences, and that hundreds of day-care centres listed as licensed did not appear to be. Care.com then changed its checks and removed listings. [POP, H] https://jezebel.com/care-com-removes-tens-of-thousands-of-unverified-daycar-1833715141. California prosecutors alleged it overstated what its background checks searched, settling for $1m in penalties and restitution; the date is **unverified** [ENF, M]. Separately, the FTC settlement of Aug 2024 ($8.5m) covered inflated job and earnings claims and a hard-to-cancel flow, not background checks [ENF, H] https://edition.cnn.com/2024/08/26/business/care-com-ftc-settlement
- **EU legality of criminal checks.** Under GDPR Art. 10, criminal-offence data may be processed only under official authority or where EU or Member State law authorises it with safeguards [LAW, H] https://gdpr-text.com/en/read/article-10/. Spain's AEPD treated a demand for a "no criminal record" certificate as Art. 10 processing (Amazon case) [ENF, M] https://www.sterlingcheck.com/blog/2022/04/gdpr-and-the-processing-of-criminal-conviction-data-across-europe. Any Cyprus law authorising platform criminal checks is **unverified**.
- **DSA Art. 30 (trader traceability).** Covered platforms must collect name, address, phone, email, ID copy, payment account, trade registry number and a self-certification. They must make best efforts to check reliability and suspend traders who do not correct their data. Small and micro platforms are exempt (Art. 29). [LAW, H] https://www.ccpc.ie/enforcement-and-regulation/digital/the-digital-services-act ; https://www.springlex.eu/en/packages/dsa/dsa-regulation/article-29/
- **Platform Work Directive (EU) 2024/2831.** Transposition deadline is 2 Dec 2026. It creates an employment presumption where the platform controls the work, and limits algorithmic management and the data a platform may process about workers. [LAW, H] https://www.lexisnexis.com/en-gb/legal/guidance/the-eu-platform-work-directive. How it applies to a "lead marketplace", as opposed to a platform that assigns tasks, needs legal review.

### 4.2 Safety features for in-person and in-home work

- Uber's Safety Toolkit offers trusted contacts and trip sharing, RideCheck anomaly detection, an optional 4-digit PIN to start a trip, in-app emergency calls with location, and discreet in-trip reporting. [S, H] https://www.uber.com/au/en/ride/safety/
- Airbnb runs a 24-hour safety line with trained agents [S, H] https://www.airbnb.co.uk/aircover
- Airtasker advises keeping talks in private messaging so any issue is documented in writing, and sending trade licence copies before trade tasks [S, H] https://support.airtasker.com/hc/en-gb/articles/202402894
- *Transplant for home services.* Show the provider's photo, verified name and ID tick on the booking-confirmed screen. Add a "Share job details with a trusted contact" button, an arrival PIN or check-in, an in-app emergency and report button during the job window, and a post-job safety question that is separate from the public rating.

### 4.3 Typical scams and UX defences

- **Fake leads** that charge providers. Thumbtack pros report bursts of identical leads with fake numbers. Thumbtack says it verifies phone numbers and accepts reports. [S/POP, L] https://community.thumbtack.com/discussion/1187/dramatic-increase-in-fraudulent-leads-provided-by-thumbtack. The FTC's HomeAdvisor final order (2023) required up to $7.2m in redress for misrepresenting lead quality and source to providers [ENF, H] https://www.ftc.gov/node/80302
- **Pay-outside and advance-fee or phishing requests.** Airbnb flags wire transfers and PDF invoices [S, H]. Thumbtack tells pros to report a "customer" who asks for bank details without reason [S, H] https://www.thumbtack.com/pro-safety/
- **Task and job scams by text.** The FTC recorded $470m in reported text-scam losses in 2024. One fast-growing type was the "task scam", where victims are asked to pay to unlock earnings. [ENF, H] https://www.ftc.gov/system/files/ftc_gov/pdf/spotlight-top-text-scams.pdf
- **UX defences to check.** Inline warning chips in chat when a message contains IBAN, phone, "WhatsApp", "transfer" or a link. Payment possible only through the platform checkout. Payout-detail changes need re-authentication. A "Report this message" button sits in every thread. Lead charges are refundable for leads that prove invalid, with a stated rule.

---

## 5. Cold start, fairness and discrimination

### 5.1 New providers against incumbents

- Firms under-hire newcomers because the information a first hire produces is a public good. On oDesk, randomly hiring inexperienced workers and giving them public evaluations improved their later employment and earnings, which tripled in one group. [PR, H] Pallais, *AER* 104(11) 2014. https://www.nber.org/papers/w18917
- Fully transparent ratings create a "demand cliff" toward top-rated incumbents. In theory, censoring very high ratings encourages entry, with an about 7% consumer welfare gain in a Yelp calibration. [PR, M] Vellodi, *Theoretical Economics* 21 (2026). https://www.econometricsociety.org/publications/theoretical-economics/browse/2026/07/01/Ratings-design-and-barriers-to-entry/file/thec70026.pdf
- *UX implications.* (a) A "New on [platform]" label with the verification ticks the newcomer does have, never an empty 0-star bar or a fake score. (b) Rotate a small, labelled share of exposure to vetted newcomers. If payment is not involved, it is not an ad, but say it is a "new provider" slot. (c) Get the first review from a real job fast: guaranteed first-job protection, or a discounted intro offer disclosed as such. **Never seed with fake or commissioned reviews** (Annex I 23c).

### 5.2 Discrimination

- On Airbnb, identical requests from guests with distinctively African-American names were accepted about 16% less often. The gap held across host race, gender and price, and was concentrated among hosts with no prior Black guests. The authors proposed hiding names and photos and expanding instant book. [PR, H] Edelman, Luca & Svirsky, *AEJ: Applied* 9(2) 2017. https://benedelman.org/?p=54
- In a second set of field experiments with 1,801 hosts, the gap was 19.2 percentage points. One positive review on the guest's profile made acceptance rates statistically indistinguishable. Self-descriptions did not help. [PR, H] Cui, Li & Zhang, *Management Science* 66(3) 2020. https://ideas.repec.org/a/inm/ormnsc/v66y2020i3p1071-1094.html
- Airbnb's own measurement (Project Lighthouse, 2021 data, 750k requests): booking success was 91.4% for guests perceived as Black and 94.1% for those perceived as white. Showing the photo only after acceptance closed about one-fifth of the gap. Instant Book reduced disparities, but first-time users without reviews often failed host criteria for it, so Airbnb loosened them. [S, M] https://news.airbnb.com/sixyearADupdate/
- In 2018 Airbnb moved guest photos to after booking [POP, M] https://www.lawyerscommittee.org/?p=7534. A 2019 Oregon settlement showed initials only until a booking is confirmed [POP, M] https://travelnoire.com/airbnb-hide-guests-names-photos-oregon-bookings
- *Service-marketplace mapping.* Here both sides can discriminate. Providers choose clients by name or neighbourhood, and clients choose providers by photo or name. Audit (a) what the provider sees before accepting a request: show the job, area and price, and hold the name and photo until after acceptance; (b) whether instant-book or auto-accept exists; (c) whether acceptance rates are monitored by area or neighbourhood. The Platform Work Directive bars inferring racial or ethnic origin from worker data [LAW, H] (source in 4.1).

---

## 6. Trust audit checklist for a service marketplace

### 6.1 Moment by moment

| Moment | Verify in the UX | Basis |
|---|---|---|
| **Search / results** | "Ad" or "Sponsored" label on every paid card; "How we rank" link from results; total or "from" price including mandatory fees; filters don't hide cheaper options by default | Omnibus Annex I 11a, UCPD 7(4a) [LAW]; P2B Art. 5 [LAW]; DMCC s.230; Airbnb CPC [ENF] |
| **Provider profile** | Trader or private-individual status; which checks were done (ID, licence, insurance), each with a date, and no generic "Verified"; rating mean + count + distribution; "New provider" label rather than 0 stars; review-provenance note | CRD 6a [LAW]; X €120m [ENF]; UCPD 7(6) [LAW]; Filippas et al. [PR] |
| **Quote / request** | What's included, estimate method, call-out fee, cancellation terms before the client commits; provider sees job details before client identity | CRD 6(1)(e) [LAW, M]; Edelman et al. [PR] |
| **Booking** | Full total, fee breakdown, refund and cancellation rules, guarantee limits linked in plain words; no pre-ticked add-ons; no fake urgency ("3 people viewing") | UCPD Arts. 6–7, Annex I (false scarcity) [LAW, M]; DSA 25 if not small [LAW] |
| **Payment** | Pay in-app only; copy says "held until you confirm"; licensed PSP named; receipt with the provider's identity | EBA Q&A [ENF]; Airtasker [S] |
| **Messaging** | Contact masked pre-booking with an explanation; scam-pattern warnings; report button; no silent deletion | Fiverr, Airbnb [S]; Gu & Zhu [PR]; GDPR transparency [LAW] |
| **On the job** | Arrival check-in or PIN, share-job-with-contact, emergency and report button in the job window | Uber, Airbnb [S] |
| **Completion** | Explicit "Confirm job done / Report a problem" with equal visual weight; auto-release timer shown with its date | Upwork 14-day [S]; Airtasker [S] |
| **Review** | Asked after completion with a delayed reminder; double-blind; same ask for everyone; no reward tied to sentiment; private safety feedback separate | Fradkin et al., Jung et al. [PR]; FTC 465 [LAW]; DMCC Sch.20 [LAW] |
| **Dispute** | Reachable in ≤2 taps from the booking; funds frozen during a dispute; timeline and outcome options stated; escalation to ADR named | Airtasker [S]; P2B complaints [LAW]; national ADR [LAW, M] |

### 6.2 Green / amber / red trust practices

| Practice | Green (do) | Amber (fix) | Red (manipulation or legal risk) |
|---|---|---|---|
| Review collection | Only after paid completion, blind reveal | Open window but no blind reveal | Anyone can review; provider-supplied reviews; seeded fakes (Annex I 23c, FTC 465.2, DMCC) |
| Review moderation | Published rules, applied regardless of sentiment | Rules exist but not linked from reviews | Holding or deleting negatives (Fashion Nova; FTC 465.7) |
| Review incentives | None | Unconditional, labelled incentive | Reward for 5 stars or positive text |
| Rating display | Mean + count + distribution + share of jobs rated | Mean + count | Rounded-up stars, no count, "4.9" with 3 reviews shown as top-rated |
| Paid placement | Labelled on the card + "How we rank" page | Labelled only in a tooltip or the terms | Unlabelled boosts (Annex I 11a) |
| Price | Total including mandatory fees from first view | Fee shown at step 2 with a notice | Service fee first shown at checkout (DMCC s.230; Airbnb CPC) |
| Payment | Licensed PSP holds funds until confirmation | Charge on completion only (no hold) | Off-platform payment encouraged, or the platform holds funds without licence clarity (EBA) |
| Guarantee | Named limits, exclusions and deadline beside the badge | Limits one click away | "Fully protected" or "insured" without limits; numbers that contradict the terms |
| Verification | Each check named and dated; honest "not checked" states | Generic "Verified" with a definition page | "Verified" or "background-checked" not backed by checks (X €120m; Care.com) |
| Contact masking | Pre-booking masking with reason; allowed after booking | Masking without explanation | Silent message deletion; masking used to block legitimate post-booking contact |
| Newcomers | "New" label + verification + protected first jobs | No newcomer support | Fake or seed reviews; inflated "jobs done" counts |
| Discrimination | Identity cues after acceptance; instant-book option; gap monitoring | Photos shown pre-acceptance, no monitoring | Filters or acceptance by name, photo or area with no oversight |
| Urgency and scarcity | Real availability only | Vague "popular" badges | Fake timers, fake "X people booking" (UCPD Annex I, DSA 25) |

### 6.3 Applicability shortcut for a Cyprus marketplace

- **Always applies:** UCPD + Omnibus via the Consumer Protection Law 112(I)/2021 (reviews, paid ranking, ranking disclosure, total price), the CRD including Art. 6a, GDPR, and P2B toward providers that are businesses. **Unverified in Cypriot text**; the EU baseline is described above.
- **Applies only if not a micro or small enterprise, or if designated VLOP:** DSA Arts. 20–28 (complaints, dark patterns Art. 25, ads Art. 26, recommender Art. 27) and Arts. 30–32 (trader traceability, compliance by design, right to information). Basic DSA duties (Arts. 11–18, e.g. terms, notice and action) apply regardless of size [LAW, H].
- **Watch:** Platform Work Directive transposition (2 Dec 2026), the PSR or PSD3 final text, and the Digital Fairness Act proposal (expected Q4 2026).

### 6.4 Red-line tests the auditor can run in a session

Each test is a few minutes of driving the product. A failure is a finding with the legal or research basis above attached.

1. **Fee test.** Note the first price shown for a provider. Go to final confirmation without adding extras. Any increase other than an optional extra the user picked is a drip-pricing finding.
2. **Sponsored test.** Compare result order logged in and logged out, and against the "How we rank" page. If a card is boosted and carries no label, it is red.
3. **Review provenance test.** Look for the review-policy note within one tap of the reviews. Check that review entry is offered only after a completed booking.
4. **Gating test.** Finish a job and answer the satisfaction pre-question both ways, using test accounts on staging. If "unhappy" routes to support while "happy" routes to a public review, it is red.
5. **Blind-reveal test.** As the provider, try to read the client's review before submitting your own.
6. **Badge test.** For each badge ("Verified", "Pro", "Top rated", "Insured"), find its definition. Check that it matches what was actually checked, and when.
7. **Guarantee test.** Compare the numbers and limits in the marketing badge with the terms page. Any mismatch is red.
8. **Off-platform test.** Send a phone number in chat before and after booking. Record what happens and whether the user is told why.
9. **Scam-pattern test.** Send "please pay by bank transfer to IBAN …" in chat. Check for a warning, a report option, or nothing.
10. **Dispute test.** From a completed booking, count the taps to open a dispute. Check that the screen says the funds are frozen and gives the deadline.
11. **Newcomer test.** View a provider with zero reviews. Pass if it shows "New" with real verification ticks. Flag if it shows an empty star bar or invented numbers.
12. **Identity-cue test.** As a provider, check what client data (name, photo, address) is visible before accepting a request.

---

## Unverified or open items (do not state as fact in an audit)

- Exact Official Journal wording of Omnibus 2019/2161: UCPD Arts. 7(4a) and 7(6), Annex I 11a, 23a–c, CRD Art. 6a, and the penalty clause (commonly summarised as fines of at least 4% of turnover, or €2m where turnover data is unavailable). EUR-Lex was blocked by a bot challenge, so these come from official summaries and law-firm briefings.
- The Cyprus Consumer Protection Law 112(I)/2021 section numbers that implement the review and ranking rules.
- CRD Art. 6(1)(e) exact wording, and any CJEU drip-pricing judgment.
- Whether the P2B complaint-handling duty (Art. 11) exempts small enterprises.
- Whether the FTC reviews rule (16 CFR 465) has been amended or challenged since Oct 2024.
- Whether the DMCC fake-reviews ban is in Schedule 20 or 19. CMS says Schedule 20, para 13.
- The status of the EU ODR-platform repeal, and of the PSR/PSD3 commercial-agent exclusion.
- Any Cyprus law authorising criminal-record checks of platform workers.
- TaskRabbit "$1,000,000" coverage (contradicted by the help centre's $10,000). Airbnb's AirCover 72-hour and 30-day windows (third-party only).
- The date of the California Care.com background-check settlement.
- The original 2020 Project Lighthouse figures. The numbers above are from Airbnb's later update using 2021 data.

---

## Sources

Law and official texts
- FTC Consumer Reviews and Testimonials Rule, FR notice (2024): https://www.ftc.gov/system/files/ftc_gov/pdf/r311003consumerreviewstestimonialsfinalrulefrn.pdf
- FTC Unfair or Deceptive Fees Rule, Federal Register 10 Jan 2025: https://www.govinfo.gov/content/pkg/FR-2025-01-10/html/2024-30293.htm
- P2B Regulation Art. 5 (UK-retained text): https://www.legislation.gov.uk/eur/2019/1150/article/5
- DSA Arts. 19, 25, 26, 27, 29 (OJ L 277 mirror): https://www.springlex.eu/en/packages/dsa/dsa-regulation/article-25/ (and /article-19/, /article-26/, /article-27/, /article-29/)
- CCPC (Ireland) DSA marketplace obligations: https://www.ccpc.ie/enforcement-and-regulation/digital/the-digital-services-act
- Irish Consumer Protection Act 2007 s.46 (Omnibus review rule): https://revisedacts.lawreform.ie/eli/2007/act/19/section/46/revised/en/html
- EP procedure summary (Omnibus): https://oeil.europarl.europa.eu/oeil/en/procedure-document-summary/pdf?id=1582276
- Price Indication Directive summary: https://webgate.ec.europa.eu/e-justice/599/EN/price_indication_directive_986
- GDPR Art. 10: https://gdpr-text.com/en/read/article-10/
- EBA Q&A 2020_5354: https://www.eba.europa.eu/single-rule-book-qa/qna/view/publicId/2020_5354
- EP Legislative Train, Digital Fairness Act: https://www.europarl.europa.eu/legislative-train/theme-protecting-our-democracy-upholding-our-values/file-digital-fairness-act

Enforcement
- FTC Fashion Nova: https://www.ftc.gov/node/77871 · FTC HomeAdvisor: https://www.ftc.gov/node/80302 · FTC text scams 2024: https://www.ftc.gov/system/files/ftc_gov/pdf/spotlight-top-text-scams.pdf
- Commission fines X €120m: https://digital-strategy.ec.europa.eu/en/news/commission-fines-x-eu120-million-under-digital-services-act
- CPC Airbnb coordinated action: https://commission.europa.eu/live-work-travel-eu/consumer-rights-and-complaints/enforcement-consumer-protection/coordinated-actions/accommodation-booking_en
- EU review sweep 2022: https://www.lawsociety.ie/gazette/top-stories/2022/eu-warns-firms-over-misleading-online-consumer-reviews/
- Cyprus DSC referral: https://www.cna.org.cy/en/article/8411447/cyprus-referred-to-eu-court-for-not-empowering-its-digital-services-coordinator · https://merlin.obs.coe.int/article/10009
- Care.com FTC 2024: https://edition.cnn.com/2024/08/26/business/care-com-ftc-settlement
- AliExpress / Temu DSA: https://www.lewissilkin.com/insights/2026/07/24/european-commission-fines-aliexpress-a-record-550-million-for-breaching-digital-102ndgq

Peer-reviewed research
- Filippas, Horton & Golden 2022: https://dspace.mit.edu/handle/1721.1/144173
- Fradkin, Grewal & Holtz 2021: https://papers.ssrn.com/abstract=2939064
- Fradkin & Holtz 2023: https://newsroom.haas.berkeley.edu/research/study-using-airbnb-data-sheds-light-on-whether-incentivizing-customer-reviews-makes-a-difference/
- Bolton, Greiner & Ockenfels 2013: https://pubsonline.informs.org/doi/abs/10.1287/mnsc.2013.1707
- Luca & Zervas 2016: https://open.bu.edu/items/14162aac-32a6-4296-b624-9d0e26e8f98c
- Nosko & Tadelis 2015 (WP): https://www.nber.org/papers/w20830
- Jung, Ryu, Han & Cho 2023: https://www.ama.org/press-releases/press-release-from-the-journal-of-marketing-ask-for-customer-reviews-at-the-right-time-in-many-cases-sooner-may-not-be-better/
- Gu & Zhu 2021: https://ideas.repec.org/a/inm/ormnsc/v67y2021i2p794-807.html
- Pallais 2014: https://www.nber.org/papers/w18917
- Vellodi 2026: https://www.econometricsociety.org/publications/theoretical-economics/browse/2026/07/01/Ratings-design-and-barriers-to-entry/file/thec70026.pdf
- Edelman, Luca & Svirsky 2017: https://benedelman.org/?p=54
- Cui, Li & Zhang 2020: https://ideas.repec.org/a/inm/ormnsc/v66y2020i3p1071-1094.html

Company-stated
- Airbnb reviews: https://www.airbnb.com/help/article/995 · contact pre-booking: https://www.airbnb.com/help/article/3764 · paying outside: https://www.airbnb.com/help/article/199 · AirCover: https://www.airbnb.co.uk/aircover · anti-discrimination update: https://news.airbnb.com/sixyearADupdate/
- TaskRabbit Happiness Pledge: https://support.taskrabbit.com/hc/en-us/articles/360035570011 · ID verification: https://support.taskrabbit.com/hc/en-us/articles/115005156463-Identity-Verification-Process
- Airtasker payments: https://support.airtasker.com/hc/en-au/articles/205832700-How-do-I-pay-the-Tasker · guidelines: https://www.airtasker.com/uk/community-guidelines-poster
- Upwork protection: https://support.upwork.com/hc/en-us/articles/211068288
- Fiverr off-platform policy: https://help.fiverr.com/hc/en-us/articles/38728907371665
- Checkatrade guarantee: https://www.checkatrade.com/guaranteed-trade-terms · vetting: https://www.checkatrade.com/blog/trust/
- Thumbtack safety: https://www.thumbtack.com/safety · https://www.thumbtack.com/pro-safety/
- Uber safety: https://www.uber.com/au/en/ride/safety/

Press and commentary
- CMS on DMCC fake reviews: https://cms.law/en/gbr/legal-updates/no-more-faux-five-stars-the-dmcc-act-bans-fake-reviews
- Osborne Clarke on CMA price guidance: https://www.osborneclarke.com/insights/uk-cma-finalises-guidance-price-transparency-under-dmcca-and-begins-enforcement-action
- Mondaq, Cyprus Consumer Protection Law 2021: https://www.mondaq.com/cyprus/dodd-frank-consumer-protection-act/1081792/consumer-protection-law-2021
- Cuatrecasas / Addleshaw Goddard / Wiggin on Omnibus: https://www.cuatrecasas.com/en/global/art/consumer-protection-in-the-digital-single-market-directive-2019-2161 · https://www.addleshawgoddard.com/en/insights/insights-briefings/2020/competition/the-eu-omnibus-directive--time-to-prepare-for-strengthened-consumer-laws/ · https://www.wiggin.co.uk/app/uploads/2022/05/The-Omnibus-Directive-Is-Your-Business-Ready.pdf
- Clifford Chance on PSD2 and marketplaces: https://www.cliffordchance.com/briefings/2017/11/impact_of_psd2_ononlinemarketplacesoperatin.html
- Care.com (WSJ follow-up): https://jezebel.com/care-com-removes-tens-of-thousands-of-unverified-daycar-1833715141
- Platform Work Directive: https://www.lexisnexis.com/en-gb/legal/guidance/the-eu-platform-work-directive
