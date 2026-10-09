# Classifieds teardown: trust, safety and law (EU / Cyprus focus)

Research for the ux-audit skill. Use it when auditing a general classifieds site like Bazaraki, which carries real estate, cars, jobs, goods and services, mixes private sellers with professional traders, and sells VIP/TOP placement paid from a prepaid wallet. **Read `service-marketplace-trust.md` first.** It already covers generic review law (UCPD 7(6), Annex I 23b–c, FTC 465, DMCC), P2B ranking (Art. 5), DSA basics and size exemptions, CRD 6a in outline, drip pricing, and verification badges. This file covers only what is specific to classifieds.

**Tags.** **[LAW]** statute, regulation or proposal text, or an official summary of it. **[ENF]** a regulator or court decision, fine, settlement, sweep, regulator data report or official government guidance. **[PR]** peer-reviewed research ("WP" = working or workshop paper). **[S]** company-stated (help centre, terms, newsroom), including security vendors and industry bodies reporting their own data. **[POP]** press, NGO or law-firm commentary. **Confidence:** H = read in the primary source or several agreeing sources; M = one good secondary source, or a primary source seen only in summary; L = thin or conflicting. "Unverified" means no confirming source was found.

**Method and limits.** Web search and fetch on 2026-10-09. EUR-Lex refused automated access (empty responses), so EU texts were read through mirrors, official summaries, the UK-retained text on legislation.gov.uk, and search-engine extracts of EUR-Lex. Those items are marked M. Several Commission guidance notices (UCPD, CRD and PID notices of Dec 2021) could not be opened and are cited only through commentary. This is not legal advice. A Cyprus lawyer should confirm any legal conclusion before the audit states it as fact.

---

## Summary (10 bullets)

1. **Classifieds fraud is mostly purchase and deposit fraud that moves off the platform.** UK purchase scams were 71% of authorised push-payment cases in 2025 [S/POP, M]. The FTC logged about 65,000 rental-scam reports since 2020, and about half began with a fake Facebook ad [ENF, H]. Cyprus police report the same courier-link and car-deposit patterns [POP, M]. Bazaraki itself warns about a fake "Bazaraki Delivery Service" [S, H].
2. **Phishing is industrialised.** Group-IB's Classiscam kit generates fake courier and payment pages in seconds. It earned an estimated $64.5m from 2020 to 2023 and impersonated 251 brands [S, M]. A message containing a delivery or "receive payment" link is the single most important chat pattern to intercept.
3. **The best evidence that a defence works comes from Singapore.** After enhanced seller verification, e-commerce scams on Facebook Marketplace fell 55% (Jun–Nov 2024), and total scams on Carousell later fell 36%. Scammers then bought or hijacked verified accounts [ENF, H]. Verification helps but needs account-takeover and account-renting controls with it. No published RCT of in-chat scam warnings was found. Browser research shows strong interstitials get 77–91% of users to heed them [PR, H].
4. **Hidden traders are an enforced offence, and classifieds sites are where they are caught.** Posing as a consumer is blacklisted (UCPD Annex I 22) [LAW, M]. Ireland's CCPC has twice convicted car dealers posing as "private" on DoneDeal, one with 125 ads over two years [ENF, H]. Under Kamenova (C-105/17), ad volume alone does not make someone a trader. It is a case-by-case test [ENF, M].
5. **Several EU marketplace duties may not reach a pure classifieds site.** CRD 6a, UCPD 7(4)(f) and DSA Arts. 30–32 apply to platforms that let consumers conclude *distance contracts* with traders [LAW, M]. DSA 30–32 also exempts micro and small platforms [LAW, H]. Bazaraki says it provides no payment or delivery [S, H]. That makes its status arguable, so flag it as a legal question rather than a finding.
6. **Price-reduction badges on dealer listings must use the 30-day lowest price.** This follows from PID Art. 6a and the CJEU's Aldi Süd ruling (2024) [LAW/ENF, M]. The Commission reads the PID as covering **movable goods only**, so it reaches cars and goods but not property, jobs or services [ENF, M]. A car's advertised price must include unavoidable transfer costs (Citroën Commerce, C-476/14) [ENF, M].
7. **Property ads must show the energy class, and Cyprus enforces it.** The EPBD recast requires the energy performance indicator and class in online and offline ads, *including property search portals*. Transposition was due 29 May 2026 [LAW, M]. Cyprus's Energy Service fined nine agents and developers €84,000 in 2021 for omitting it [ENF, M].
8. **Paid VIP/TOP placement must be labelled where it appears, and weak labels don't work.** Unlabelled paid ranking is blacklisted (Annex I 11a) [LAW, M]. The Dutch ACM found common "sponsored" labels hard to spot, with hardly any effect on behaviour [ENF, H]. A Danish study found a prominent, intuitive label nearly tripled awareness [ENF, M]. No enforcement case against a classifieds site for unlabelled paid ranking was found.
9. **Reviews on classifieds sites are a live enforcement target.** In 2025 Poland's UOKiK fined OLX PLN 28.4m, partly because people who only contacted a seller could rate them [ENF, H]. Bazaraki's help says review prompts follow an "interaction" with a seller [S, H]. Test whether a chat alone unlocks a review.
10. **Moderation duties apply at any size, and staleness is a misleading-ad issue.** Notice-and-action (DSA Art. 16) and a statement of reasons for every removal or restriction (Art. 17) bind all hosting services [LAW, H]. The UK ASA has ruled against portals that kept unavailable properties listed [ENF, M]. In a peer-reviewed Craigslist study, the platform removed fewer than half of the rental scams the researchers detected [PR, M].

---

## 1. Scams in classifieds

### 1.1 Main patterns

| Pattern | Mechanics | Evidence |
|---|---|---|
| **Rental deposit / "pay to hold"** | A cloned or invented listing, a "landlord abroad", a deposit or viewing fee before any viewing; sometimes self-tour lockbox codes, or $1 "credit check" subscription traps | FTC Data Spotlight, 22 Dec 2025: ~65,000 reports and ~$65m lost (Jan 2020–Jun 2025), median loss $1,000. About half started with a Facebook ad and 16% on Craigslist. Ages 18–29 were 3× more likely to report losing money [ENF, H] https://www.ftc.gov/news-events/data-visualizations/data-spotlight/2025/12/rental-scams-hit-home-65-million-reported-losses |
| | | UK, Action Fraud figures obtained by FOI: reports fell from 4,982 (FY23/24) to 4,092 (FY25/26), while the average loss rose from £2,156 to £3,138 [POP, M] https://www.propertyreporter.co.uk/rental-fraud-falls-by-18-but-losses-increase.html |
| | | Generation Rent sampled 300 UK Facebook Marketplace rental ads (Oct 2023–Apr 2024). 56% were lifted from other sites, and 74% showed at least one of Meta's own warning signs [POP, M] https://www.generationrent.org/?p=9853 |
| **Fake courier / "receive payment" link (seller-side phishing)** | A "buyer" agrees fast, refuses to meet, and sends a link to a fake courier or platform page that asks for card or bank details "to receive the money" | Cyprus police, 18 Jul 2025: a camera seller was sent a fake courier link to "accept the payment" [POP, M] https://cyprus-mail.com/2025/07/18/police-issue-new-warning-for-online-fraud. A Paphos victim lost €17,000 via a phishing link [POP, L] https://en.sigmalive.com/online-scam-in-paphos-e17000-stolen-via-phishing-link |
| | | Bazaraki help: be wary of messages about a "Bazaraki Delivery Service" or payment links; it "does not provide delivery or payment services" [S, H] https://www.bazaraki.com/help/ |
| | | Kleinanzeigen (DE): scammers send lookalike "Sicher bezahlen" pages. The platform says it never contacts users by SMS or messenger about the feature [POP, M] https://www.verbraucherzentrale.nrw/wissen/digitale-welt/onlinehandel/betrug-auf-kleinanzeigenportalen-diese-maschen-sollten-sie-kennen-110389 |
| **Scam-as-a-service kits** | Telegram bots generate localised fake courier, payment and bank-login pages | Group-IB (Classiscam): 1,366 groups since 2019, estimated $64.5m (H1 2020–H1 2023), 251 brands, 79 countries. 62.2% of resources targeted Europe. Average loss $353 [S, M] https://www.group-ib.com/media-center/press-releases/classiscam-2023/ |
| **Car deposit / car abroad** | The car is "abroad" and the price includes transport; the victim pays a foreign IBAN | Limassol (reported Jun 2026): €90,000 lost on an online car offer paid to an account in a third EU country [POP, M] https://cyprus-mail.com/2026/06/09/limassol-man-loses-e90000-in-online-car-sale-scam. Cyprus 2022: €17,000 car-shipping scam [POP, M] https://cyprus-mail.com/2022/08/24/man-reports-losing-over-e17000-in-online-car-shipping-scam |
| **Overpayment / fake cheque** | The buyer "overpays" and asks for the difference back | FTC (Feb 2020): median loss near $2,000; selling items online was nearly a fifth of fake-cheque reports [ENF, M] https://ftc.gov/news-events/press-releases/2020/02/new-ftc-data-spotlight-fake-check-scams-cause-big-losses |
| **Job and task scams** | Vague "online work" offers; small early payouts, then the victim must deposit money (often crypto) to unlock earnings | FTC (Dec 2024): job-scam losses tripled 2020–23 and passed $220m in H1 2024. Task-scam reports went from 0 (2020) to about 20,000 (H1 2024) [ENF, H] https://www.ftc.gov/node/86951 |

- **Scale and concentration (research).** Honeypot ads on Craigslist drew more than 13,000 scam attempts in three months, and about 10 groups sent nearly half of them [PR, M] (Park, Jones, McCoy, Shi & Jakobsson, NDSS 2014) https://www.ndss-symposium.org/wp-content/uploads/2017/09/09_4.pdf. Among 2m Craigslist rental listings over 5 months, about 29,000 were scams. Craigslist removed fewer than half, and cloned listings stayed up more than 10 hours on average [PR, M] (Park, McCoy & Shi, Financial Cryptography 2016) https://cyber.nyu.edu/2016/02/22/understanding-craigslist-rental-scams/
- **Where UK purchase fraud starts.** In 2025 purchase scams were 71% of UK APP cases, with losses up 20% to £118.1m. 66% of all APP cases began online. UK Finance asks marketplaces to verify sellers and enforce in-platform payment [S/POP, M] https://www.crowdfundinsider.com/2026/06/285657-fraudulent-activities-and-sophisticated-scams-continue-to-pose-serious-threat-to-uk-security-as-losses-approach-1-3b/ (the original report was not read). Lloyds (Mar 2025–Mar 2026): 68% of its purchase-fraud reports began on Meta platforms. Its categories include flat deposits, vehicles and furniture [S, M] https://www.mpamag.com/uk/news/general/the-66-million-meta-fraud-problem-facing-your-clients/578038
- **Singapore scale.** 11,665 e-commerce scam cases in 2024 (+19.2%), 37.6% of them on Facebook [ENF, M] https://www.mha.gov.sg/e-commerce-marketplace-transaction-safety-ratings/
- **Europol.** No Europol report specific to classifieds or Classiscam was found (**unverified**).

### 1.2 Defences, and what evidence says about each

| Defence | Who does it | Evidence it works |
|---|---|---|
| **Seller identity verification** (government ID or eID) | Singapore OCHA E-Commerce Code designations (Carousell, Facebook Marketplace); Bazaraki requires Yoti ID checks in some categories [S, H] | **Strongest available, but before/after only.** After enhanced verification, e-commerce scams on FB Marketplace fell 55% (1 Jun–30 Nov 2024). On Carousell they fell 11% (Jun–Dec 2024), and total scams later fell 36%. Scammers then used hijacked, rented or bought Singpass-verified accounts [ENF, H] https://www.mha.gov.sg/media-room/newsroom/regulatory-safeguards-for-consumers-who-purchase-from-consumer-to-consumer-e-commerce-platforms/ ; https://www.mha.gov.sg/media-room/newsroom/assessment-of-carousell-and-meta-enhanced-verification-measures-under-the-e-commerce-code-of-the-online-criminal-harms-act/ |
| **Graded public safety rating** | Singapore Transaction Safety Ratings (1–4 ticks). Criteria: seller verification, monitoring of fraudulent behaviour, secure payment, transaction records, reporting and dispute resolution. 2025 scores: Carousell 2, FB Marketplace 1 [ENF, M] | Ratings weigh effectiveness, not just presence [ENF, M] https://www.mha.gov.sg/e-commerce-marketplace-transaction-safety-ratings/ |
| **In-platform payment / escrow** | Kleinanzeigen "Sicher bezahlen" (trustee account with a PSP), leboncoin secure payment | No published fraud-rate effect was found (**unverified**). The escrow brand becomes the phishing lure, so it must come with "we never send payment links" copy [POP, M] (source in 1.1) |
| **In-chat warnings** | Meta tests Messenger scam detection, which flags suspicious messages and offers AI review and block/report (Oct 2025) [S/POP, M] https://techcrunch.com/2025/10/21/whatsapp-and-messenger-add-new-warnings-to-help-older-people-avoid-online-scams. Vinted shows a pop-up when a user leaves through a link in a message [S, M] https://www.vinted.co.uk/help/628 | **No RCT on chat warnings found.** A Nigerian marketplace field trial with verified message codes is registered but has not reported [PR-WP, L] https://www.socialscienceregistry.org/trials/11872. Analogue: over 25m real browser warnings, users clicked through 9–23% of malware and phishing warnings, but 70.2% of Chrome's weaker SSL warnings. Design decides compliance [PR, H] (Akhawe & Felt, USENIX Security 2013) https://www.usenix.org/conference/usenixsecurity13/technical-sessions/paper/akhawe. Active warnings beat passive ones in an e-commerce scam experiment [PR-WP, L] https://www.ieee-security.org/TC/SPW2017/ConPro/papers/nochenson-conpro17.pdf |
| **Off-platform contact friction** | Meta: requests to move to phone or email early "may have ill intent" [S, H] https://www.meta.com/safety/scam-prevention/marketplace-safety/ | Rationale and limits are in `service-marketplace-trust.md` §3.3 (Gu & Zhu) |
| **Re-registration blocking, seller verification, secure-payment info** | UK Online Fraud Charter (voluntary, 30 Nov 2023; signatories include eBay and Meta) [ENF, H] | Commitments, not outcomes. No compliance assessment found https://assets.publishing.service.gov.uk/media/65688713cc1ec5000d8eef96/Online_Fraud_Charter_2023.pdf |
| **Trusted-flagger fraud channel** | Ofcom illegal-harms codes (Dec 2024) expect dedicated reporting channels for fraud-expert bodies. A 2025 draft targets large services at medium or high fraud risk [ENF, M] | UK only. Final status of the 2025 update **unverified** https://www.scl.org/ofcom-publishes-final-version-of-illegal-harms-guidance-under-online-safety-act/ |
| **"Never pay before viewing" advice** | FTC, Action Fraud, Idealista, Gumtree and Bazaraki help pages all give it [ENF/S, H] | It is advice in help pages. No evidence was found on contextual interstitials at the moment of contact (**unverified**) |

*Audit reading.* The evidence ranks verification first (measured drops, with a displacement caveat). Strong, specific, active warnings come second (indirect evidence). Escrow comes third: it is plausible but unmeasured, and it creates its own lure. Report buttons alone are weakest, given Craigslist's catch rate under 50%.

---

## 2. Professional vs private sellers

- **The blacklist.** Annex I point 22 bans a trader falsely claiming or implying that it is not acting for trade purposes, or falsely representing itself as a consumer [LAW, M] (UK CPRs mirror the same wording) https://www.economy-ni.gov.uk/news/hidden-car-trader-convicted-after-selling-vehicles-false-mileage-readings
- **Enforcement on classifieds sites.**
  - The CCPC (Ireland) got the first Irish "disguised trader" conviction (2020). A Castlebar dealer listed as "private" on DoneDeal received a 4-month suspended sentence under Consumer Protection Act 2007 ss.55–56 [ENF, H] https://www.ccpc.ie/news-and-media/news/article/2020/07/19/disguised-car-trader--receives-four-month-suspended-sentence-for-misleading-consumers
  - CCPC 2022: a Carlow dealer posted 125 DoneDeal ads as "private" over two years. Fine €1,100, plus €2,000 costs and €2,500 compensation [ENF, H] https://www.ccpc.ie/news-and-media/news/article/2022/07/03/disguised-car-trader--fined-following-ccpc-investigation
  - UK Trading Standards has prosecuted hidden car traders on Gumtree, Autotrader and Facebook. One investigation found a single Facebook user advertising 90 cars in six months [ENF, M] https://www.highland.gov.uk/news/article/2243/trading_standards_clamp_down_on_disguised_car_dealers
- **Who is a trader (CJEU Kamenova, C-105/17, 4 Oct 2018).** Eight simultaneous ads did not automatically make the seller a trader. The national court must assess case by case [ENF, M]. Commentary lists the factors discussed: whether the activity is organised, profit-seeking, frequent, and whether the goods were bought for resale. Whether the final judgment adopted all of them is **unverified** https://www.stibbe.com/publications-and-insights/does-selling-a-phone-on-an-online-marketplace-make-you-a-trader-under-the
- **Platform duties and their scope.**
  - CRD 6a and UCPD 7(4)(f) require the marketplace to say whether the seller is a trader, based on the seller's declaration, and to warn that consumer rights don't apply otherwise [LAW, M]. Details are in `service-marketplace-trust.md` §2.1.
  - The "online marketplace" definition (CRD Art. 2(17)) needs a service that **allows consumers to conclude distance contracts** [LAW, M] https://eur-lex.europa.eu/eli/dir/2011/83/2022-05-28/eng. Where buyers view a car or flat in person and contract face to face, the contract is arguably not a distance contract. National authorities treat any in-person meeting as taking a sale outside "distance" [ENF, M] https://web-prod.konsumentverket.se/en/articles/act-on-distance-contracts-and-off-premises-contracts. **Whether a classifieds site without on-platform checkout is an "online marketplace" is unverified.** No Commission text or case on it was found.
  - DSA Arts. 30–32 (trader traceability, compliance by design, right to information) cover only platforms allowing distance contracts with traders, and **exempt micro and small enterprises** (Art. 29) [LAW, H] https://www.springlex.eu/en/packages/dsa/dsa-regulation/article-29/ ; https://www.springlex.eu/en/packages/dsa/dsa-regulation/article-31/. Bazaraki's headcount and turnover are **unverified**.
  - The UCPD binds the hidden trader regardless. The platform is itself a trader toward consumers, for example when it sells VIP to private sellers, so its own practices fall under UCPD Arts. 5–7. That is an inference [LAW, M].
- **Sweeps.** No CPC sweep on hidden traders on marketplaces was found (**unverified**). A related CPC sweep of second-hand goods sellers (published 2025) found 185 of 356 online traders (52%) potentially in breach, with 40% not giving clear withdrawal-right information [ENF, M] https://therecycler.com/posts/half-of-online-resellers-mislead-buyers/
- **Limits of EU tools for C2C.** The Commission told Parliament (2026) that the UCPD does not apply to transactions solely between consumers. For non-VLOP Vinted, DSA supervision belongs to Lithuania [ENF, M] https://www.eunews.it/en/2026/04/07/eu-grapples-with-vinted-case-as-fake-made-in-china-goods-evade-controls-with-little-europe-can-do/
- **Cyprus real estate.** Estate agency needs registration and an annual licence under Law 71(I)/2010 [ENF, H] https://www.businessincyprus.gov.cy/business-sectors/real-estate-agent/. The Agents' Council reported 125 convictions for illegal brokerage in 2024 and about 400 cases filed. It says cooperating with illegal agents is a criminal offence [POP, M] https://cyprus-mail.com/2025/05/06/public-warned-over-fake-real-estate-agents-as-convictions-rise. Whether ads must carry the licence number is **unverified**.

*UX implications.* (a) At posting, ask "private or business?", with plain-language consequences. (b) Above a volume threshold (for example N active car ads or N listings per year), prompt the trader declaration and route the user to a business account. This is a proportional heuristic, not law. (c) Show a "Business" or "Private" label on the card and the ad page. (d) In real estate, show the agent's licence number and link to the Council register. (e) Never let a business account display "Private".

---

## 3. Price display rules

- **PID Art. 6a (Omnibus): announced reductions.** Any announced price reduction must show the prior price, meaning the trader's lowest price in at least the 30 days before the reduction [LAW, M]. The CJEU in Aldi Süd (C-330/23, 26 Sep 2024) held that the announced reduction must be calculated from that 30-day lowest price [ENF, M] https://www.hsfkramer.com/notes/ip/2024-posts/cjeu-confirms-that-price-reduction-claims-must-be-based-on-lowest-price-in-last-30-days
  - **Scope.** The Commission's PID guidance (Dec 2021) reads "products" as movable goods, so the PID does not apply to services [ENF, M] https://www.eurocommerce.eu/app/uploads/2022/10/2022.10.14-EuroCommerce-Recommendations-Price-Indication-Directive.pdf. For classifieds this means **cars and goods sold by dealers are in scope. Property (immovable), jobs and services are not, and neither are private sellers**, since the PID binds traders. The property exclusion is an inference from the movable-goods reading [M].
  - **Platform role.** Commentary on the Commission notice says Art. 6a targets the selling trader, not intermediaries. Poland's UOKiK says a marketplace offering a discount feature must "ensure" sellers show the 30-day price [POP, M] https://promocompliance.notion.site/Why-do-I-need-this-2cfddb47528440e489133c6c6c19d551. A platform-generated "Price dropped" badge with a strikethrough on a dealer ad is therefore a risk feature. Either compute the 30-day lowest from the platform's own price history, or show the drop only for private sellers.
- **Total price with mandatory costs.**
  - Citroën Commerce (C-476/14, 7 Jul 2016): an advertised car price must include the buyer's mandatory manufacturer-to-dealer transfer costs (PID Art. 3) [ENF, M] https://cms.law/en/fra/publication/advertising-the-offer-and-inclusive-of-taxes-concepts. Cyprus registration and import charges are not covered by a found decision (**unverified**).
  - UOKiK charged OLX in 2022: "sort from cheapest" ordered by listing price excluding the service fee, so the comparison was misleading [ENF, M] https://antyweb.pl/olx-uokik-zarzuty-sortowanie. Italy's AGCM fined Vinted €1.5m (Nov 2022) for not clearly stating buyer commission and shipping. After a CPC dialogue, Vinted added fee information, though the Commission said displayed prices still lacked delivery charges [ENF, M] https://eunews.it/en/2024/06/18/vinted-complies-with-eu-digital-services-law-stop-misleading-ads-and-hidden-automatic-fees
  - Property agency fees: no EU rule was found requiring them in the advertised price. Who pays agents in Cyprus is **unverified**. Spain's consumer ministry opened sanction proceedings (Oct 2026) against an unnamed major portal over misleading rental ads [POP, L] https://euroweeklynews.com/2026/10/07/major-spanish-property-portal-faces-sanctions-over-rental-adverts-that-may-mislead-tenants/
- **Unit prices.** PID unit pricing applies to goods sold by quantity. No legal duty was found to show €/m² for property, so treat it as a UX recommendation, not a requirement [inference].

---

## 4. Vertical-specific ad rules

### 4.1 Property: energy performance in ads

- **EPBD 2010/31/EU Art. 12(4).** When a building with a certificate is offered for sale or rent, its energy performance indicator must be stated in ads in commercial media [LAW, M] https://www.legislation.gov.uk/uksi/2012/3118/note/data.html (national transposition note). https://www.europarl.europa.eu/RegData/etudes/BRIE/2022/698901/EPRS_BRI(2022)698901_EN.pdf
- **EPBD recast (EU) 2024/1275.** The EUR-Lex text (seen as a search extract) requires the indicator **and class** in **online and offline advertisements, including property search portal websites**, and requires Member States to run sample checks. Transposition was due 29 May 2026 [LAW, M] https://eur-lex.europa.eu/eli/dir/2024/1275/oj/eng. **The paragraph number (Art. 19 or 20) is unverified.** The recast introduces a common A–G scale, with A = zero-emission [POP, M] https://www.lexology.com/library/detail.aspx?g=65ae97e6-ac56-45b6-b14d-4c6c35f187fc
- **Cyprus.** The national law is the Regulation of the Energy Performance of Buildings Law 142(I)/2006 [ENF, M] https://build-up.ec.europa.eu/sites/default/files/Cyprus.pdf. In April 2021 the Energy Service fined nine firms €84,000 in total for omitting the energy class from property ads and not fixing them 10–11 months after notice. The fines ranged from €1,000 up to REMU's €30,000 [ENF, M] https://dom.com.cy/en/live/digest/nine-real-estate-companies-fined-in-cyprus/. A tracker lists an €8,550 cap, which conflicts with this, so the current penalty is **unverified** https://www.buildingrating.org/jurisdiction/Cyprus. Cyprus transposition of the recast is **unverified**.
- *UX implications.* For sale and rent categories, add an energy-class field (A–G, plus "certificate pending" or "exempt" with reason). Show the class on the card and ad page, and filter by it. The legal duty falls on the advertiser. The recast's express mention of portals, and Cyprus's enforcement record, make a missing field a red finding for professional advertisers.

### 4.2 Cars: fuel and CO₂ information

- **Directive 1999/94/EC** covers **new** passenger cars only. Art. 6: all promotional literature must give official fuel consumption and CO₂ data; Member States should require it in other promotional material "as appropriate" [LAW, H] https://www.legislation.gov.uk/eudr/1999/94/data.htm. Used cars are not covered.
- **Successor.** The Commission's 16 Dec 2025 proposal (2025/0420(COD)) would repeal 1999/94 and fold labelling into Regulation 2019/631, with harmonised CO₂-class labels. One tracker says it covers new and second-hand cars and online sales information [LAW-proposal, M]. As of mid-2026 it was still in Council and EP first reading [POP, M] https://climate.ec.europa.eu/eu-action/transport-decarbonisation/road-transport/car-labelling_en ; https://epthinktank.eu/2026/02/24/revision-of-co2-emission-performance-standards-for-new-light-duty-vehicles-and-vehicle-labelling-eu-legislation-in-progress/
- *UX implication.* Dealer listings for new cars should have fuel and CO₂ fields. Whether a Cyprus rule applies to online classified listings is **unverified**.

### 4.3 Jobs: discrimination and pay transparency

- **Discriminatory wording is direct discrimination without a victim.** In Feryn (C-54/07, 10 Jul 2008), an employer's public statement that it would not hire a given ethnic origin was direct discrimination in recruitment under Directive 2000/43, even with no identifiable complainant [ENF, M] https://globalfreedomofexpression.columbia.edu/cases/centrum-voor-gelijkheid-van-kansen-en-voor-racismebestrijding-v-firma-feryn-nv/. Applying it to job ads is an analogy, and commentators extend it to Directive 2000/78 grounds such as age [POP, M].
- **Cyprus.** The Ombudsman acts as Equality Body and reviews recruitment ads in both sectors. In 2015 it held that a municipal job ad favouring younger applicants was unlawful direct age discrimination [ENF, M] https://www.theioi.org/downloads/cbh94/Cyprus%20-%20Equal%20treatment%20-%20Special%20report%202017-2018-2019%20-%20EN.pdf
- **Pay Transparency Directive (EU) 2023/970, Art. 5.** Applicants must get the initial pay or pay range, in the vacancy notice or before the interview, and employers may not ask about pay history. Transposition was due 7 Jun 2026 [LAW, M]. Cyprus published a draft (Nov 2025). The process was disrupted by elections, and enactment is **unverified** as of Oct 2026 [POP, M] https://cyprus-mail.com/2026/10/06/slow-progress-on-equal-pay-rules-leaves-cyprus-employees-in-uncertainty
- *UX implications.* Add a salary or range field, promoted for business posters. Flag terms like "under 30", "female only", "Cypriots only" or "no foreigners" at posting, with an explanation. Show "Employer verified" only when it is true, since job scams are the fastest-growing FTC category (§1.1).

### 4.4 Housing: discrimination in ads and platform design

- **US.** In Fair Housing Council v. Roommates.com (9th Cir. en banc 2008), the site lost §230 immunity for **mandatory questions and dropdown answers** about sex, family status and orientation. Free-text "Additional Comments" stayed immune [ENF, M] https://en.wikipedia.org/wiki/Fair_Housing_Council_of_San_Fernando_Valley_v._Roommates.com,_LLC. In Chicago Lawyers' Committee v. Craigslist (7th Cir. 2008), the platform was not liable for user-written "no minorities" ads [ENF, M] https://blog.ericgoldman.org/archives/2008/03/craigslist_gets.htm. *Lesson: the platform's own fields and filters are where liability attaches.*
- **Facebook.** The Mar 2019 settlement with NFHA, ACLU and others removed age, gender and ZIP targeting for housing, employment and credit ads, and Facebook paid about $5m [ENF, H] https://about.fb.com/news/2019/03/protecting-against-discrimination-in-ads. Under the DOJ settlement (27 Jun 2022), Meta paid a $115,054 civil penalty, built a "Variance Reduction System" for ad delivery, and accepted court oversight to Jun 2026 [ENF, H] https://www.justice.gov/crt/case/united-states-v-meta-platforms-inc-fka-facebook-inc-sdny
- **EU.** Directive 2000/43 covers access to goods and services available to the public, including housing. The Art. 3 reference is from general knowledge, so M. The Czech Ombudsman treated rental ads saying "no Roma or foreigners" as at least indirect discrimination [ENF, M] https://romea.cz/en/czech-republic/czech-helsinki-committee-finds-discrimination-in-real-estate-advertising/. A Barcelona fine of €90,000 on Idealista for a discriminatory listing appears in a snippet only [POP, L]. In Cyprus, Eurostat (2026) found 6% of foreign residents reporting housing discrimination, against 1.5% of locals [POP, M] https://cyprus-mail.com/2026/02/27/foreigners-report-higher-discrimination-in-cyprus-eurostat-finds
- *UX implications.* No nationality, religion or ethnicity fields or filters in rentals. Moderation keyword flags for "no foreigners" and similar terms. Bazaraki's rules already prohibit "discriminatory" content [S, H], so audit whether that rule is enforced at posting.

---

## 5. Paid placement in classifieds

- **How the leaders do it.**
  - Bazaraki: VIP ads "appear first in the category", Top ads come below VIP and above regular ads, and prices and durations vary by category. They are paid from a wallet or at posting [S, H] https://www.bazaraki.com/help/. The help page **does not describe an on-card label**, so the audit must check what the card shows.
  - Leboncoin terms: default ranking is by relevance (content, title, category, date, prior searches, seller rating). Vehicles and services sort chronologically by default. Property's paid "Vitrine" appears in a dedicated top space [S, M] https://leboncoin.fr/dc/cgv
  - Rightmove accepts only vetted agents [S, M] https://propertyindustryeye.com/scam-blamed-by-tv-on-rightmove-not-possible-says-portal/
- **Law.** Annex I 11a (blacklisted): undisclosed paid ranking in search results [LAW, M]. UCPD 7(4a) requires main ranking parameters [LAW, M]. Both are in the existing file. The DSA ad label (Art. 26) and recommender rules (Art. 27) **don't bind micro or small platforms** (Art. 19) [LAW, H].
- **Evidence on labels.**
  - ACM (NL, 2 Feb 2021): common transparency labels were not easy to spot or understand, and one tested measure "hardly had an effect" on purchases [ENF, H] https://acm.nl/en/node/20398
  - Danish DCCA (Apr 2022): a prominent, clear, intuitive disclosure nearly tripled awareness of paid results compared with a baseline label [ENF, M] https://kfst.dk/media/2w0bvx2n/clear-and-intuitive-disclosures-58.pdf
- **Enforcement on classifieds and property portals.**
  - Hungary's GVH investigated Ingatlan.com's credit-based "highlighting" packages for private advertisers (VJ/5/2022). It closed the case on 2 Feb 2023 with no infringement, finding the credit mechanics not clearly relevant to consumer decisions [ENF, H] https://gvh.hu/en/press_room/press_releases/press-releases-2023/gvh-terminates-the-procedure-against-the-operator-of-ingatlan.com
  - Amsterdam Court of Appeal (Funda, 2020, competition law): property buyers are much less guided by ranking than buyers of consumer goods [ENF, M] https://www.twobirds.com/insights/2020/netherlands/amsterdam-court-of-appeal-rules-online-platform-funda-did-not-abuse-its-dominant-position
  - Italy's AGCM fined Immobiliare.it €500k for unsubstantiated "number one" claims (not ranking) [ENF, M] https://onlinemarketplaces.com/articles/immobiliare-it-fined-e500k-over-leadership-claims-after-court-case-brought-by-rival-idealista
  - **No Annex I 11a enforcement against a classifieds site was found (unverified).**
- **Paid ads in "recommended" feeds.** No case was found. Annex I 11a speaks of search results. A paid ad blended into a recommendation feed without a label is still a hidden commercial communication risk under UCPD Art. 7(2). That is an inference [LAW, M].
- **Wallet.** Whether a prepaid wallet usable only for the platform's own services falls under the PSD2 limited-network exclusion is **unverified**. Ask the owner which licence or exclusion applies. Private sellers buying VIP are consumers, so CRD pre-contract information and price transparency apply to the VIP purchase itself [LAW, M; inference].
- *UX implications.* Put a visible "VIP" or "TOP" label with a "Paid placement" tooltip on every surface: list, grid, map pins, recommendations, push and email. Add a "How ads are ordered" link from results. In property, keep a default sort that buyers can switch, given the Funda finding that ranking matters less there.

---

## 6. Moderation, listing quality and freshness

- **DSA duties for all hosting services, whatever their size.**
  - Art. 16: an easy, electronic notice mechanism, confirmation of receipt, notice of the decision with redress, and disclosure of any automated decision-making [LAW, H] https://www.springlex.eu/en/packages/dsa/dsa-regulation/article-16/
  - Art. 17: a clear and specific statement of reasons for removal, demotion, payment restriction or suspension. It must give the facts, any automated means used, the legal or contractual ground, and redress. It is not required where contact details are unknown or for deceptive high-volume commercial content [LAW, H] https://www.springlex.eu/en/packages/dsa/dsa-regulation/article-17/
  - Art. 19 exempts micro and small platforms from Section 3 except Art. 24(3), so complaint handling (Art. 20) and SoR-database submission (Art. 24(5)) don't bind them [LAW, H] https://www.springlex.eu/en/packages/dsa/dsa-regulation/article-19/
  - Art. 18, notifying authorities of offences threatening life or safety, applies to all hosting services. It was not re-read this session [LAW, M].
- **Bazaraki's practice.** Its "Complain" button on ads offers reasons. Duplicate ads and "one ad, one product" are enforced. Ads can be rejected for misleading or incomplete info. Users are reported through support [S, H] https://www.bazaraki.com/help/. Whether notifiers get a receipt and a decision, and sellers a statement of reasons, is untested.
- **Stale and unavailable listings.**
  - ASA (UK) rulings: the Houser portal (2017) kept a property listed about two years after it left the market, and was told to remove listings no longer available. An agent (2019) was told to advertise only properties available to view. Two agents (2021) listed homes off the market since 2017 [ENF, M] https://www.asa.org.uk/rulings/houser-ltd-a17-384022.html ; https://www.mortgagesolutions.co.uk/mortgage-news/2019/10/23/agent-ordered-to-ditch-misleading-ad/
  - Bait listings: UCPD Annex I points 5–6 (bait advertising, bait and switch) [LAW, M]. Tower Hamlets Trading Standards fined a letting agency £167k for bait-and-switch room ads [ENF, M] https://localgovernmentlawyer.co.uk/regulatory-and-enforcement/406-regulatory-news/39565-2019-01-07-12-24-49
- **Cloned and duplicate listings.** Cloned rentals are the main fake-listing vector (FTC, Generation Rent, Park et al., §1.1). Reverse-image and duplicate-text detection across accounts is the obvious control. No study measuring its effect was found (**unverified**).
- **Ratings on classifieds sites (classifieds-specific enforcement).** UOKiK fined OLX PLN 28,420,869 (12 Jun 2025, not final). People who only asked a question or viewed contact details could rate sellers. Buyers could rate only their latest purchase. The score weighted positives more heavily [ENF, H] https://uokik.gov.pl/en/mylacy-system-ocen-na-olxpl-decyzja-prezesa-uokik. OLX's fix restricts ratings to buyers who received a parcel through OLX shipping, with a plain mean and visible individual ratings [ENF, H]. Bazaraki prompts a review "after you interact with a seller" [S, H], which is exactly the pattern UOKiK sanctioned if interaction means a chat.
- **Verified listings.** No "verified listing" badge was confirmed on Rightmove, Zoopla or Idealista. Rightmove relies on agent-only listing, and Idealista on red-flag guidance [S, M] https://www.idealista.com/ayuda/articulos/how-can-i-spot-fake-listings/?lang=en. Any "Verified" label must state what was checked (see the X €120m case in the existing file).
- *UX implications.* Show "Posted" and "Updated" dates on cards. Auto-expire listings, with a one-tap "Still available" renewal for the seller. Let the seller mark "Reserved" or "Sold or let". Hide sold items from search. Rate-limit reposting of identical content. Give a "Report: no longer available" reason. Have a seller-facing removal screen carrying the Art. 17 reasons.

---

## 7. Classifieds trust audit

### 7.1 Red-line tests (run in one session with test accounts; screenshot each)

| # | Test | Pass | Red | Basis |
|---|---|---|---|---|
| C1 | **Scam-phrase chat test.** From a buyer test account, send "pay deposit to IBAN CY..", "contact me on WhatsApp +357..", "I'll send courier to collect, enter card to receive payment" | Inline warning naming the risk, a one-tap report, and no silent deletion | Nothing happens | FTC rental, Cyprus police, Classiscam [ENF/S]; Akhawe & Felt [PR] |
| C2 | **Lookalike link test.** Send a fake "<brand>-delivery" URL (a harmless test domain) | Link flagged or interstitial shown. The platform says it never sends payment or delivery links | Rendered as a normal clickable link | Bazaraki help [S]; Kleinanzeigen [POP]; Vinted pop-up [S] |
| C3 | **Pay-before-viewing test.** Open a rental ad and a car ad and press contact or call | A contextual "Never pay before viewing" note at the contact step, in rentals and cars | Advice only in the help centre | FTC 2025 [ENF]; Action Fraud [POP] |
| C4 | **Seller-identity test.** Post in a high-risk category (cars, rentals) and note which checks are forced | Phone plus ID or eID in high-risk categories; the badge says what was checked; re-verification on new device or payout change | Phone only, or a "Verified" badge with no stated meaning | Singapore −55% [ENF]; account-hijack caveat [ENF] |
| C5 | **Hidden-trader test.** Find an account labelled "private" with many similar car or property ads | Trader declaration prompted at volume; "Business" label; agent licence number shown for property | "Private" label on dealer-like accounts; no declaration flow | Annex I 22 [LAW]; CCPC DoneDeal [ENF]; Kamenova [ENF] |
| C6 | **Paid-label test.** Locate VIP and TOP ads in list, grid, map, recommendations and the app | Visible label on every surface, plus a "how ads are ordered" link | Paid position with no label, or a tooltip only | Annex I 11a [LAW]; ACM, DCCA [ENF] |
| C7 | **Price test.** Find a dealer car ad showing a reduction, then sort by price | Strike price = lowest in the prior 30 days; advertised price includes mandatory transfer or prep costs; sort compares like with like | Platform "price dropped" badge built on any old price; "+ costs" in small print | PID 6a, Aldi Süd, Citroën [LAW/ENF]; UOKiK–OLX [ENF] |
| C8 | **Energy-class test.** Post a sale or rent property ad as a business | Energy class field required or prompted, and shown on card and ad | No field at all | EPBD recast [LAW]; Cyprus €84k fines [ENF] |
| C9 | **Discrimination test.** Draft a rental "no foreigners" and a job "women under 30" | Flagged at posting with an explanation; no protected-attribute fields or filters | Published unflagged, or a nationality filter exists | Feryn [ENF]; Roommates.com [ENF]; Equality Body [ENF] |
| C10 | **Review-provenance test.** Chat with a seller without buying, then check whether a review prompt appears | Review only after a confirmed transaction or meeting the seller confirmed, with the rule shown next to reviews | Chat alone unlocks a rating | UOKiK–OLX PLN 28.4m [ENF]; UCPD 7(6) [LAW] |
| C11 | **Notice-and-action test.** Report a test ad as a scam, then remove another test ad as a moderator would | Notifier gets a receipt and a decision with redress; the seller gets a statement of reasons | No acknowledgement; silent removal | DSA Arts. 16–17 [LAW] |
| C12 | **Freshness test.** Sample 20 rental ads and contact 5 | Posted and updated dates shown; auto-expiry; "Reserved" and "Sold" states; duplicate repost blocked | Listings months old; repeated "no longer available" replies; duplicates accepted | ASA Houser [ENF]; Annex I 5–6 [LAW]; Craigslist study [PR] |

### 7.2 Green / amber / red

| Practice | Green | Amber | Red |
|---|---|---|---|
| Chat safety | Pattern warnings (IBAN, links, off-platform, "courier"), link interstitial, report in thread | Static safety banner in every chat | No warnings; links rendered raw |
| Payment | In-app payment through a licensed PSP, with "we never send payment links" copy | No payment, but clear "never pay before viewing" at contact | Platform-branded "delivery or payment" services that are not real, or a wallet whose licence status is unclear |
| Seller identity | Risk-tiered ID or eID, a badge that names the checks, takeover controls | Phone verification only | "Verified" with no checks behind it |
| Trader status | Declaration plus Business/Private label, licence number for agents | Self-label only | Business accounts shown as private; no field |
| Paid placement | Label on every surface plus a ranking explainer | Label in list only | Unlabelled VIP or TOP, or paid ads blended into recommendations |
| Price claims | 30-day lowest strike price, totals incl. mandatory costs, sort on comparable totals | Totals correct, no reduction feature | Arbitrary strike prices; "+ fees" excluded from sort |
| Property ads | Energy class shown and filterable, agent licence shown | Field optional | No field; ads published without class |
| Job ads | Salary field, discriminatory-term flags, employer verification for paid posters | Free text only | Job ads with age, sex or nationality filters; unverified "work from home" offers promoted |
| Reviews | Only after a confirmed transaction, plain mean, all ratings visible | Interaction-based but disclosed | Chat-only reviews; weighted or hidden ratings (UOKiK–OLX) |
| Moderation | Art. 16 receipt and decision, Art. 17 reasons, appeal | Report button with no feedback | Silent removals; no way to report illegal ads |
| Freshness | Dates, expiry, Reserved/Sold, duplicate blocking | Expiry only | Stale or cloned ads stay live; bait listings |

### 7.3 Applicability shortcut for a Cyprus classifieds site

- **Applies at any size.**
  - UCPD with Omnibus, through Cyprus Law 112(I)/2021: Annex I 11a (paid ranking), Annex I 22 (posing as consumer, binding the trader), Annex I 5–6 (bait), and Art. 7(6) (review provenance).
  - PID Art. 6a for dealer price reductions on goods.
  - EPBD ad rule (Law 142(I)/2006, plus the recast once transposed).
  - Equal-treatment law for job and housing ads.
  - DSA Arts. 11–18 (contact points, terms, notice-and-action, statement of reasons, crime notification).
  - GDPR for chat scanning (see `service-marketplace-trust.md` §3.3).
- **Applies only if the site enables distance contracts with traders:** CRD 6a, UCPD 7(4)(f), and DSA 30–32. DSA 30–32 also requires that the platform is not micro or small, or is a VLOP. Status is arguable, so the audit should recommend the UX anyway (trader label, trader declaration) as low-cost risk reduction, and say the legal duty is unconfirmed.
- **Applies only if not micro or small:** DSA Arts. 20–28 (internal complaints, ad labels Art. 26, recommender transparency Art. 27, SoR database). Annex I 11a still requires paid-ranking disclosure at any size.
- **Watch:**
  - Pay Transparency Directive enactment in Cyprus (salary in job ads).
  - EPBD recast transposition (energy class on portals).
  - Car-labelling regulation (2025/0420(COD)), possibly reaching online and second-hand listings.
  - Digital Fairness Act proposal (expected Q4 2026; see existing file).

### 7.4 Posting-flow field checklist by category

| Category | Fields the posting form should have | Why |
|---|---|---|
| All | Private or Business toggle (business → company name, registration no.); photos de-duplicated; posted and updated dates | Annex I 22; CCPC; freshness |
| Property sale/rent | Energy class A–G or "pending/exempt"; agent licence no. (if business); total monthly cost incl. mandatory charges; €/m² (convenience) | EPBD; Law 71(I)/2010; total-price principle |
| Rentals | Viewing availability; no nationality, religion or family-status fields | FTC rental tactics; Roommates.com; 2000/43 |
| Cars (dealer) | Price incl. mandatory transfer or prep costs; fuel and CO₂ for new cars; prior-30-day price if a reduction is shown | Citroën; 1999/94 Art. 6; PID 6a |
| Jobs | Employer name and verification state; pay or range; no age, sex or nationality requirements without stated legal basis | Directive 2023/970 Art. 5; Feryn; FTC job scams |
| Goods (dealer) | Prior-30-day price for reductions; trader identity | PID 6a; Annex I 22 |
| Services | Business or private status; licence or qualification where regulated | CRD 6a (if applicable); existing file §4.1 |

---

## Unverified items (do not state as fact)

- Whether a classifieds site with no on-platform checkout is an "online marketplace" (CRD 2(17)), and therefore bound by CRD 6a, UCPD 7(4)(f) and DSA 30–32. No guidance or case found.
- Bazaraki's size for the DSA micro or small exemption. Whether its VIP and TOP cards carry labels. Whether its wallet uses a PSD2 exclusion or a licence.
- The paragraph number of the EPBD recast advertising rule (Art. 19 or 20), Cyprus transposition of the recast, and the current Cyprus penalty cap (€8,550 vs fines up to €30,000).
- Cyprus transposition of the car-labelling directive for online ads; the final text of the 2025/0420(COD) proposal.
- Whether Kamenova's final judgment adopted the AG's factors (organisation, profit, frequency).
- The Commission PID notice wording on intermediaries and on immovable property (seen only through commentary).
- Whether Cyprus estate-agent ads must carry the licence number; who pays agency fees in Cyprus.
- Any Europol report on classifieds or Classiscam; any CPC sweep on hidden traders; any Annex I 11a case against a classifieds site.
- Any RCT or measured effect of in-chat scam warnings, link scanning or escrow on fraud rates in classifieds.
- Cyprus enactment of the Pay Transparency Directive. Any Cyprus Equality Body decision on rental ads.
- UK Finance 2025 figures were read in secondary coverage only. The Barcelona €90,000 Idealista fine appears in one snippet only. The Ofcom 2025 fraud-code update's final status is unknown.
- A Spanish portal sanction case (Oct 2026): the portal and the alleged practice are unnamed.

---

## Sources

Law and official texts
- DSA Arts. 16, 17, 19, 29, 31 (OJ L 277 mirror): https://www.springlex.eu/en/packages/dsa/dsa-regulation/article-16/ (and /article-17/, /article-19/, /article-29/, /article-31/)
- CRD consolidated (Art. 2(17)): https://eur-lex.europa.eu/eli/dir/2011/83/2022-05-28/eng
- EPBD recast 2024/1275: https://eur-lex.europa.eu/eli/dir/2024/1275/oj/eng · EPRS EPBD briefing: https://www.europarl.europa.eu/RegData/etudes/BRIE/2022/698901/EPRS_BRI(2022)698901_EN.pdf · NI EPBD ad rule note: https://www.legislation.gov.uk/uksi/2012/3118/note/data.html
- Directive 1999/94/EC: https://www.legislation.gov.uk/eudr/1999/94/data.htm · car labelling review: https://climate.ec.europa.eu/eu-action/transport-decarbonisation/road-transport/car-labelling_en · EPRS 2026: https://epthinktank.eu/2026/02/24/revision-of-co2-emission-performance-standards-for-new-light-duty-vehicles-and-vehicle-labelling-eu-legislation-in-progress/
- UK Online Fraud Charter 2023: https://assets.publishing.service.gov.uk/media/65688713cc1ec5000d8eef96/Online_Fraud_Charter_2023.pdf
- Cyprus estate agents licensing: https://www.businessincyprus.gov.cy/business-sectors/real-estate-agent/ · Cyprus EPBD transposition: https://build-up.ec.europa.eu/sites/default/files/Cyprus.pdf
- Swedish Consumer Agency on distance contracts: https://web-prod.konsumentverket.se/en/articles/act-on-distance-contracts-and-off-premises-contracts

Enforcement and regulator data
- FTC rental scams 2025: https://www.ftc.gov/news-events/data-visualizations/data-spotlight/2025/12/rental-scams-hit-home-65-million-reported-losses · fake cheques 2020: https://ftc.gov/news-events/press-releases/2020/02/new-ftc-data-spotlight-fake-check-scams-cause-big-losses · job scams 2024: https://www.ftc.gov/node/86951
- Singapore MHA: https://www.mha.gov.sg/media-room/newsroom/regulatory-safeguards-for-consumers-who-purchase-from-consumer-to-consumer-e-commerce-platforms/ · https://www.mha.gov.sg/media-room/newsroom/assessment-of-carousell-and-meta-enhanced-verification-measures-under-the-e-commerce-code-of-the-online-criminal-harms-act/ · https://www.mha.gov.sg/e-commerce-marketplace-transaction-safety-ratings/
- CCPC disguised traders: https://www.ccpc.ie/news-and-media/news/article/2020/07/19/disguised-car-trader--receives-four-month-suspended-sentence-for-misleading-consumers · https://www.ccpc.ie/news-and-media/news/article/2022/07/03/disguised-car-trader--fined-following-ccpc-investigation
- UK hidden car traders: https://www.economy-ni.gov.uk/news/hidden-car-trader-convicted-after-selling-vehicles-false-mileage-readings · https://www.highland.gov.uk/news/article/2243/trading_standards_clamp_down_on_disguised_car_dealers
- UOKiK–OLX ratings 2025: https://uokik.gov.pl/en/mylacy-system-ocen-na-olxpl-decyzja-prezesa-uokik · UOKiK–OLX charges 2023: https://uokik.gov.pl/en/opinions-are-not-equal
- ACM sponsored ranking: https://acm.nl/en/node/20398 · DCCA disclosures: https://kfst.dk/media/2w0bvx2n/clear-and-intuitive-disclosures-58.pdf · GVH Ingatlan.com: https://gvh.hu/en/press_room/press_releases/press-releases-2023/gvh-terminates-the-procedure-against-the-operator-of-ingatlan.com
- Cyprus Energy Service fines: https://dom.com.cy/en/live/digest/nine-real-estate-companies-fined-in-cyprus/
- DOJ v. Meta: https://www.justice.gov/crt/case/united-states-v-meta-platforms-inc-fka-facebook-inc-sdny · Facebook 2019: https://about.fb.com/news/2019/03/protecting-against-discrimination-in-ads
- ASA Houser: https://www.asa.org.uk/rulings/houser-ltd-a17-384022.html · Tower Hamlets bait-and-switch: https://localgovernmentlawyer.co.uk/regulatory-and-enforcement/406-regulatory-news/39565-2019-01-07-12-24-49
- Cyprus Equality Body report: https://www.theioi.org/downloads/cbh94/Cyprus%20-%20Equal%20treatment%20-%20Special%20report%202017-2018-2019%20-%20EN.pdf
- Ofcom illegal harms (via SCL): https://www.scl.org/ofcom-publishes-final-version-of-illegal-harms-guidance-under-online-safety-act/

Courts (via commentary)
- Kamenova C-105/17: https://www.stibbe.com/publications-and-insights/does-selling-a-phone-on-an-online-marketplace-make-you-a-trader-under-the
- Aldi Süd C-330/23: https://www.hsfkramer.com/notes/ip/2024-posts/cjeu-confirms-that-price-reduction-claims-must-be-based-on-lowest-price-in-last-30-days
- Citroën Commerce C-476/14: https://cms.law/en/fra/publication/advertising-the-offer-and-inclusive-of-taxes-concepts
- Feryn C-54/07: https://globalfreedomofexpression.columbia.edu/cases/centrum-voor-gelijkheid-van-kansen-en-voor-racismebestrijding-v-firma-feryn-nv/
- Roommates.com: https://en.wikipedia.org/wiki/Fair_Housing_Council_of_San_Fernando_Valley_v._Roommates.com,_LLC · Craigslist: https://blog.ericgoldman.org/archives/2008/03/craigslist_gets.htm · Funda: https://www.twobirds.com/insights/2020/netherlands/amsterdam-court-of-appeal-rules-online-platform-funda-did-not-abuse-its-dominant-position

Peer-reviewed research
- Park et al., Scambaiter, NDSS 2014: https://www.ndss-symposium.org/wp-content/uploads/2017/09/09_4.pdf
- Park, McCoy & Shi, Craigslist rental scams, FC 2016: https://cyber.nyu.edu/2016/02/22/understanding-craigslist-rental-scams/
- Akhawe & Felt, Alice in Warningland, USENIX Security 2013: https://www.usenix.org/conference/usenixsecurity13/technical-sessions/paper/akhawe
- Active vs passive scam interventions (ConPro 2017, WP): https://www.ieee-security.org/TC/SPW2017/ConPro/papers/nochenson-conpro17.pdf · Nigeria trial registry: https://www.socialscienceregistry.org/trials/11872

Company-stated
- Bazaraki help: https://www.bazaraki.com/help/ · Leboncoin terms: https://leboncoin.fr/dc/cgv · Vinted help: https://www.vinted.co.uk/help/628 · Meta Marketplace safety: https://www.meta.com/safety/scam-prevention/marketplace-safety/ · Idealista: https://www.idealista.com/ayuda/articulos/how-can-i-spot-fake-listings/?lang=en
- Group-IB Classiscam 2023: https://www.group-ib.com/media-center/press-releases/classiscam-2023/
- Lloyds via MPA: https://www.mpamag.com/uk/news/general/the-66-million-meta-fraud-problem-facing-your-clients/578038

Press and commentary
- Cyprus Mail (police warnings, car scams, estate agents, pay transparency, Eurostat): https://cyprus-mail.com/2025/07/18/police-issue-new-warning-for-online-fraud · https://cyprus-mail.com/2026/06/09/limassol-man-loses-e90000-in-online-car-sale-scam · https://cyprus-mail.com/2022/08/24/man-reports-losing-over-e17000-in-online-car-shipping-scam · https://cyprus-mail.com/2025/05/06/public-warned-over-fake-real-estate-agents-as-convictions-rise · https://cyprus-mail.com/2026/10/06/slow-progress-on-equal-pay-rules-leaves-cyprus-employees-in-uncertainty · https://cyprus-mail.com/2026/02/27/foreigners-report-higher-discrimination-in-cyprus-eurostat-finds
- Sigmalive Paphos phishing: https://en.sigmalive.com/online-scam-in-paphos-e17000-stolen-via-phishing-link
- UK Finance 2025 data (secondary): https://www.crowdfundinsider.com/2026/06/285657-fraudulent-activities-and-sophisticated-scams-continue-to-pose-serious-threat-to-uk-security-as-losses-approach-1-3b/
- Action Fraud FOI rental data: https://www.propertyreporter.co.uk/rental-fraud-falls-by-18-but-losses-increase.html · Generation Rent: https://www.generationrent.org/?p=9853
- Verbraucherzentrale NRW on Kleinanzeigen: https://www.verbraucherzentrale.nrw/wissen/digitale-welt/onlinehandel/betrug-auf-kleinanzeigenportalen-diese-maschen-sollten-sie-kennen-110389
- Meta Messenger warnings (TechCrunch): https://techcrunch.com/2025/10/21/whatsapp-and-messenger-add-new-warnings-to-help-older-people-avoid-online-scams
- UOKiK–OLX sorting charges (antyweb): https://antyweb.pl/olx-uokik-zarzuty-sortowanie · Vinted CPC/AGCM (Eunews): https://eunews.it/en/2024/06/18/vinted-complies-with-eu-digital-services-law-stop-misleading-ads-and-hidden-automatic-fees · Vinted 2026: https://www.eunews.it/en/2026/04/07/eu-grapples-with-vinted-case-as-fake-made-in-china-goods-evade-controls-with-little-europe-can-do/
- PID guidance commentary: https://www.eurocommerce.eu/app/uploads/2022/10/2022.10.14-EuroCommerce-Recommendations-Price-Indication-Directive.pdf · https://promocompliance.notion.site/Why-do-I-need-this-2cfddb47528440e489133c6c6c19d551
- Second-hand sweep: https://therecycler.com/posts/half-of-online-resellers-mislead-buyers/ · Immobiliare.it fine: https://onlinemarketplaces.com/articles/immobiliare-it-fined-e500k-over-leadership-claims-after-court-case-brought-by-rival-idealista
- Czech rental ad discrimination: https://romea.cz/en/czech-republic/czech-helsinki-committee-finds-discrimination-in-real-estate-advertising/ · Spain portal case: https://euroweeklynews.com/2026/10/07/major-spanish-property-portal-faces-sanctions-over-rental-adverts-that-may-mislead-tenants/
- EPBD A–G scale (Lexology): https://www.lexology.com/library/detail.aspx?g=65ae97e6-ac56-45b6-b14d-4c6c35f187fc · Cyprus penalty tracker: https://www.buildingrating.org/jurisdiction/Cyprus
- Rightmove vetting: https://propertyindustryeye.com/scam-blamed-by-tv-on-rightmove-not-possible-says-portal/ · ASA 2019 agent: https://www.mortgagesolutions.co.uk/mortgage-news/2019/10/23/agent-ordered-to-ditch-misleading-ad/
