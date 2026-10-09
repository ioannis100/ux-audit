# Online classifieds, seller and business side: posting, paid visibility, transactions, retention, pro tools

Research for the ux-audit skill, for auditing general classifieds such as Bazaraki (Cyprus). Bazaraki serves private sellers plus dealers, estate agents, developers and employers. It earns from VIP/TOP paid placement, some paid categories, a prepaid wallet, XML feeds for businesses and display ads. The goal is to recommend concrete seller-side UX improvements and to flag manipulation.

**Tags.** **[S]** company-stated (help centre, pricing page, terms, investor report, company blog). **[O]** observed (says how). **[PR]** peer-reviewed. **[REG]** regulation, court ruling or enforcement. **[H]** practitioner, press, forum or third-party guide. **unverified** = no primary source found. Numbers are never estimated.

**Method and limits.** Gathered by web search and fetch on 2026-10-09. Several official pages returned 403 to the fetcher or did not appear in search: leboncoin.fr (CGV, help, paiement sécurisé), kleinanzeigen.de help, OLX.pl price lists, and Gumtree UK help. For those, facts come from press or forum reports and are tagged [H]. Pages read in full: Bazaraki help centre, Vinted UK price list, Gumtree for Business services page, ImmoScout24 "Premium-Platzierung 50%" page, the Rightmove 2016 Featured Property article, and the OLX "AI at OLX" page. No seller app was driven in this session, so there are **no [O] claims about live screens**. Every [O] slot in the recipe is a check the auditor must do. Prices for bumps and other paid visibility vary by category, item value and date. Treat every figure as dated, and treat third-party prices as unverified.

---

## Summary

1. **Bazaraki's documented model is standard for the category.** It has three tiers (VIP first, then Top, then free Regular), and price and duration vary by category [S]. Some categories are paid, and the help centre says the fee is shown before publishing [S]. A top-up wallet can pay for services [S]. Yoti ID verification is required in some categories [S]. Review prompts are automatic [S]. Published prices, credit expiry, auto-renewal and refund terms: **unverified** (not on the help page). Its owner, Larixon, has said only the No.1 player can make a transactional model work [H].
2. **AI listing from a photo is now table stakes, but quality and forced adoption are the risks.** eBay [S], Facebook Marketplace (March 2026) [S], leboncoin (Dec 2024, with price and delivery suggestions) [H], Kleinanzeigen [H] and OLX [S] all draft listings from photos. Vinted has no native equivalent found (unverified). The claimed gains are self-measured. OLX says posting time fell 35–55% [S], and eBay says listings per lister rose 50% in the US [S via H]. eBay sellers report a forced photo-first flow with no opt-out, and that fixing errors took longer than manual entry [H].
3. **Price suggestions from comparables are common; one peer-reviewed study shows real upside with uneven adoption.** Meta [S] and leboncoin [H] suggest prices from similar local items. Auto Trader labels every dealer advert against its own valuation, and dealers cannot opt out [S]. Airbnb's Smart Pricing raised adopters' daily revenue 8.6%, but lower adoption by Black hosts widened the overall gap [PR].
4. **Paid visibility products share one vocabulary: bump/refresh, highlight, urgent tag, top/featured slot, homepage or gallery spot, and bundles.** Leboncoin (À la une, Remontée, Urgent, packs), OLX (Odświeżenie, Wyróżnienie, Mini/Midi/Maxi), Kleinanzeigen (Hochschieben, Top, Highlight, Galerie), Gumtree (Bump, Featured, Urgent, Spotlight [S]), Vinted (Bump 3 or 7 days, Wardrobe Spotlight/Showcase [S]) and Facebook (budgeted Boost ads [H]). Prices are rarely published as a table. Vinted, Bazaraki and leboncoin show the price only at checkout or vary it by category [S].
5. **Effect claims are rarely substantiated, and the best example is footnoted.** ImmoScout24 claims "1.8x more contact requests" and footnotes the metric, comparison set and period (2017–2019) [S]. Rightmove claims Featured Property "typically" gets double the detail views, with no method shown [S]. Gumtree's business page makes no product effect claims [S]. Peer-reviewed work warns that paid prominence is partly zero-sum: an eBay paid-search experiment found near-zero average effect [PR], and marketplace A/B tests overstate effects through cannibalisation [PR].
6. **Option-versus-listing lifetime mismatch is a documented trap.** Leboncoin options do not extend the ad's life. A seller paid for a 7-day boost that ended after 4 days when the ad expired, and was not refunded [H]. Leboncoin also began charging private car sellers from the 3rd ad in 12 months (€26.90 + €79.90) without advance notice [H].
7. **The transactional pivot works where buyer protection is real and fees sit with the buyer.** Vinted charges sellers nothing; the buyer pays 3–8% + £0.30–0.80 [S]. Vinted's 2024 revenue was €813.4m and net profit €76.7m [H]. Kleinanzeigen Sicher bezahlen holds funds in escrow until receipt or 14 days, and is for private sellers only [H]. Retreats exist too: OLX de-prioritised general-goods pay-and-ship in Europe [S via H], and Facebook dropped prepaid labels for new Marketplace listings in Feb 2025, then partly reinstated them [H].
8. **Enforcement has hit exactly these mechanics.** UOKiK (Poland) ordered OLX in Feb 2024 to fix three things and refund users: "cheapest first" sorting that ignored a service fee, an illusory paid buyer-protection package, and fee disclosure [REG]. It later fined OLX PLN 28.4m over a misleading seller-rating system [REG]. EU law already bans undisclosed paid ranking (UCPD Annex I 11a) and requires ranking parameters, including paid influence, to be disclosed to business users (P2B Art 5) [REG].
9. **Pro economics run on subscriptions plus prominence tiers.** Rightmove ARPA was £1,621/month in 2025, with valuation leads gated to top packages [S]. Auto Trader ARPR was £2,854/month in FY25, built from price, product and stock levers [S]. Scout24's professional ARPU was €1,224/month (Q2 2026), with ImmoPunkte points buying placements [S]. Forcing a product too fast backfires: Auto Trader's Deal Builder roll-out led to dealer protests and higher cancellations [S][H].
10. **Seller dashboards and trust signals are thin on general classifieds.** Kleinanzeigen shows satisfaction, reply rate and reply time on profiles, but its reply rate counts only first replies, and spam drags it down [H]. Facebook added an AI seller summary in 2026 [S]. Leboncoin listings live 60 days [H], and visibility stats appear tied to Pro accounts [H]. Re-engagement through loss-framed upsells ("your ad dropped") is **not documented** for any major platform. It remains an audit check, not a known pattern.

---

## 1. Posting flow for private sellers

### 1.1 Required fields, categories, limits
- **Bazaraki:** one product or service per ad, no duplicates, correct category. No numeric posting limit is stated [S] ([help](https://www.bazaraki.com/help/)). Some categories need ID or passport verification via Yoti before posting [S] (same). Paid categories show the fee before publishing, "so you can review the charges" [S] (same).
- **Kleinanzeigen:** an undated guide reports 50 free ads per 30 days for private users and €0.95 per extra ad, with deleted ads counted. Cars and real estate allow 2 free ads per 30 days [H] ([bezahlen.net](https://www.bezahlen.net/ratgeber/ebay-kleinanzeigen-gebuehren/)). Current figures: **unverified**.
- **Leboncoin:** since early April 2025, private car and van sellers pay from the 3rd ad in a rolling 12 months: €26.90 to create plus €79.90 to publish. This was not announced (no banner, no email) [H] ([Journal de l'Automobile](https://journalauto.com/services/leboncoin-commence-a-facturer-les-particuliers/), [Clubic](https://www.clubic.com/actualite-562317-ni-vu-ni-connu-leboncoin-vous-fait-payer-plus-cher-vos-annonces-auto.html)).
- **Auto Trader UK private ads** are a paid category with a published price table: Basic 2 weeks £18.95, Standard 3 weeks £25.95, Premium 6 weeks £35.95, and "until sold" £45.95 with free rebooking every 10 weeks. Price varies by vehicle value and region, and cars under £1,000 list free for a week [S] ([advertising prices](https://www.autotrader.co.uk/cars/sell/advertising-prices), via search extract).

### 1.2 AI listing from photos (verified status)
| Platform | What it does | Status / evidence |
|---|---|---|
| eBay "magical listing" | Photo → title, description, category, item specifics, price, shipping | Announced Sept 2023 (iOS beta) [S] ([eBay Innovation](https://innovation.ebayinc.com/stories/magical-listing-tool-harnesses-the-power-of-ai-to-make-selling-on-ebay-faster-easier-and-more-accurate/)). Earlier text-only version: eBay says over 95% of users kept AI descriptions [S] (same). Photo-first flow for private sellers in the US, UK and DE in 2025 [H] ([Digital Commerce 360](https://www.digitalcommerce360.com/2025/04/15/ebay-ai-aided-tool-cut-steps-create-listings/)). UK tests halved listing steps [S via H] (same). CEO: 50% more listings per lister in the US [S via H] ([Value Added Resource, Sept 2026](https://www.valueaddedresource.net/ebay-ai-magical-listing-complaints/)) |
| Facebook Marketplace | Photo → draft listing, details, price "based on similar items in your area"; Meta AI auto-replies to availability questions | Announced 12 Mar 2026 [S] ([Meta](https://about.fb.com/news/2026/03/facebook-marketplace-new-meta-ai-tools-make-selling-faster-and-easier/)). Standalone "Seller" app, US, iOS first [H] ([TNW](https://thenextweb.com/news/meta-seller-app-facebook-marketplace-ai-listing)) |
| Leboncoin | Photo + title → description, suggested price from similar ads, delivery options; car module uses plate number (May 2025) | Dec 2024, some categories first [H] ([Clubic](https://www.clubic.com/actualite-547358-avec-un-feu-d-artifice-leboncoin-montre-son-ambition-de-rattraper-amazon-en-france-aidee-par-l-ia.html)). An executive claims AI ads are "20% more efficient" for consumer goods, metric undefined [S via H] ([Journal de l'Automobile](https://journalauto.com/services/leboncoin-adresse-lia-generative-aux-revendeurs-particuliers/)) |
| Kleinanzeigen | Photo → title, description, category; voice input on iOS; excludes vehicles, jobs, services; the user can accept fully, partly or not at all | Text stage Aug 2025, photo stage later, rolled out gradually [H] ([mobiFlip](https://www.mobiflip.de/kleinanzeigen-fuehrt-ki-gestuetzte-anzeigenerstellung-per-foto-ein/amp/)). Price suggestion: **unverified** |
| OLX | "AI Enhanced Ad Posting" from photo, voice or text; attributes and description | OLX claims posting time cut 35–55% and ad quality up to 37%, no method given. It says prices are not set by AI without voluntary user consent [S] ([AI at OLX](https://www.olxgroup.com/ai-at-olx/)). Per-country rollout: **unverified** |
| Vinted | Native photo-to-listing | **Not found.** Only third-party tools exist [H]. Vinted publishes price ranges by condition (e.g., new 60–80% of retail) and suggests checking the catalogue [S] ([help 376](https://www.vinted.co.uk/help/376)). Whether sold prices show at listing time: sources conflict, **unverified** |

- **Failure modes are documented.** eBay sellers report being forced into AI photo-first listing with no setting to turn it off. They also report wrong sizes that block completion, and corrections taking "about three times longer" [H] ([VAR](https://www.valueaddedresource.net/ebay-ai-magical-listing-complaints/)). VAR's own test misidentified a mouse pad as a ceramic plaque [H] (same).
- **Photo quality matters causally.** Airbnb listings with verified (professional) photos had 8.98% higher occupancy (DiD, 7,423 properties, 16 months) [PR] ([Zhang et al., Management Science 2022](https://pubsonline.informs.org/doi/10.1287/mnsc.2021.4175)).

### 1.3 Price suggestions
- **Comparable-based suggestions:** Meta, from similar local items [S] (above); leboncoin, from similar ads [H] (above).
- **Valuation labels on dealer stock:** Auto Trader UK rates each advert against its own valuation (make, model, age, mileage, extras; data from adverts, dealer sites and auctions). Its terms say dealers "cannot opt-out." The label is free now, but Auto Trader reserves the right to charge later [S] ([Price Indicator T&Cs](https://www.autotrader.co.uk/partners/retailer/terms-and-conditions/price-indicator)). "No analysis" shows when data is insufficient [S] ([help](https://help.autotrader.co.uk/hc/en-gb/articles/19212037724957-Why-do-I-have-a-Price-Indicator-on-my-advert)).
- **Evidence:** Airbnb Smart Pricing adopters cut nightly rates 5.7% and earned 8.6% more per day. The Black–White host revenue gap shrank 71.3% among adopters, but widened overall because Black hosts adopted less [PR] ([Zhang, Mehta, Singh, Srinivasan, Marketing Science 2021](https://pubsonline.informs.org/doi/10.1287/mksc.2021.1295)). The implication is that suggestions should be defaults, not buried opt-ins.

### 1.4 Quality meters, time-to-post, drafts, mobile
- **Listing quality meters:** OLX claims a quality gain but shows no meter [S] (above). Rightmove Plus compares a listing's detail views with "similar listings" (those likely to appear in the same searches) [S] ([Rightmove Hub](https://hub.rightmove.co.uk/how-to-make-the-most-of-featured-property/)). No general-classifieds quality meter with published validation was found: **unverified**.
- **Time-to-post:** only relative claims exist (OLX 35–55% [S], eBay "half the steps" [S via H]). No absolute, independently measured posting time was found.
- **Drafts:** eBay's bulk tool creates multiple drafts from batches of photos in Seller Hub (US, UK, DE) [H] ([search summary of eBay coverage](https://www.retaildive.com/news/ebay-ai-magical-listing-product-descriptions-listings/693185/)). Draft auto-save on classifieds apps: **unverified**, so it is an [O] check.

---

## 2. Monetisation models and their UX

### 2.1 Paid placement products
| Platform | Products | What is published about price and effect |
|---|---|---|
| **Bazaraki** | VIP (first in category), Top (below VIP), Regular (free); reactivation after expiry | Price and duration vary by category [S] ([help](https://www.bazaraki.com/help/)). A third-party tracker lists Top Ad at €4.99 (checked Mar 2026) [H, unverified] ([Subger](https://subger.com/en/gb/service/bazaraki-cy)). No effect claims found |
| **Leboncoin** | À la une, Remontée en tête, Urgent, Pack Top Visibilité; car visibility €11.90–€179.90 by duration [H] | The CGV says price depends on option and category, an option is tied to one ad and can't be transferred [H via search extract of [CGV](https://leboncoin.fr/dc/cgv); page 403]. Options do **not** extend ad life [H] ([Que Choisir forum](https://forum.quechoisir.org/post1331654.html)). Since 2025, editing no longer re-ranks the ad, so a paid Remontée is needed [H, unverified] ([Dealabs](https://www.dealabs.com/discussions/prix-excessif-leboncoin-pour-les-pro-2705311)) |
| **OLX (PL)** | Odświeżenie (refresh, auto once a day for 7 days), Wyróżnienie (highlight), homepage; Mini (3 days highlight), Midi (7 days + 3 refreshes), Maxi (30 days + 9 refreshes + 7 days homepage) | Prices vary by category and item value. Example for a PLN 499 item: PLN 3.96 / 13.21 / 38.43 [H] ([Bezprawnik](https://bezprawnik.pl/oplaty-za-ogloszenia-samochodow-na-olx/)) |
| **Kleinanzeigen** | Hochschieben, Wiederholtes Hochschieben, Top-Anzeige, Highlight, Galerie | Old guide: €3.95 for 1 day / €16.95 for 7 days / Top €24.95 for 7 days / Galerie €59.95 for 10 days [H, undated]. Another guide gives different prices [H]. Current figures **unverified**. A paid bump that did not appear in search is reported [H] ([JustAnswer](https://www.justanswer.de/elektronik/r70ly-meine-anzeige-zum-verkauf-von-skiern-ist-verschwunden.html)) |
| **Gumtree UK** | Featured (rotates in top section), Urgent tag, Homepage Spotlight (7 days), Bump (credits), website link; pay-as-you-go credit bundles (ads live 60 days) | No prices and no effect claims on the business page [S] ([Gumtree for Business](https://www.gumtree.com/info/life/gumtree-for-business/services/)) |
| **Vinted** | Bump (3 or 7 days, targeted to likely-interested members), Showcase / Wardrobe Spotlight | Price depends on duration and item price, shown at checkout [S] ([price list](https://www.vinted.co.uk/pricelist), [help 340](https://vinted.co.uk/help/340)). Views of bumped items are visible on the profile [S] (help 340). No multiplier claim found |
| **Facebook Marketplace** | Boost listing → a paid ad in feed, Marketplace and search, with total or daily budget and an end date or duration | Minimum daily spend; default local audience 18+ within 40 miles [H] ([OneShop](https://oneshop.com/blog/facebook-marketplace-boosted-listing)) |

### 2.2 Effect claims and how well they are substantiated
- **Best practice found: ImmoScout24.** Its "1.8x more contact requests" claim is footnoted with the metric (requests in the first 7 days), the comparison (showcase vs standard listings, apartments for sale, comparable region, size and €/m²), the period (Mar 2017–Mar 2019) and the source (its own data) [S] ([page](https://www.immobilienscout24.de/anbieten/gewerbliche-anbieter/inserieren/weitere-produkte/premium-platzierung-50-prozent.html)). It is still stale and self-measured.
- **Rightmove Featured Property** "typically" gets at least double the detail views of a standard listing. No method is published [S] ([Hub, 2020](https://hub.rightmove.co.uk/how-to-make-the-most-of-featured-property/)). The 2016 promotional article gives only agent testimony, such as "bet my bottom dollar" [S] ([Rightmove, 2016](https://www.rightmove.co.uk/news/?p=56239)). An earlier Rightmove figure, +21% enquiries for Premium Listing, was flagged as self-interested by a landlord site [H] ([Property118](https://www.property118.com/be-wary-of-letting-agents-pushing-rightmove-premium-listings/)).
- **Leboncoin pro, 2021:** automatic bumps would "double contacts" [S via H] ([MySweetImmo](https://www.mysweetimmo.com/2021/09/16/leboncoin-veut-faciliter-le-quotidien-des-pros-de-limmo/)). No method given.
- **Research cautions:**
  - Paid prominence partly reallocates attention rather than creating demand. eBay's brand-keyword paid search had a very small, insignificant effect on sales on average [PR] ([Blake, Nosko & Tadelis, Econometrica 2015](https://faculty.haas.berkeley.edu/stadelis/BNT_ECMA_rev.pdf)).
  - Listing-level experiments overstate effects through cannibalisation. In an Airbnb fee meta-experiment, at least 20% of the individual-randomised estimate was interference bias [PR] ([Holtz et al., Management Science](https://pubsonline.informs.org/doi/10.1287/mnsc.2020.01157)).
  - Disclosing a listing as paid can itself raise outcomes. Restaurant ads labelled "ad" shifted users toward better-rated advertisers (≈200k users, 13 cities) [PR] ([Sahni & Nair, Review of Economic Studies 2020](https://ideas.repec.org/a/oup/restud/v87y2020i3p1529-1564..html)). Honest labelling is not a revenue sacrifice.

### 2.3 Paid categories and listing fees
- **Bazaraki:** some categories are paid, and fees vary by "category, service, or options" [S] ([help](https://www.bazaraki.com/help/)). Which categories: **unverified**.
- **Leboncoin cars:** see 1.1. **OLX PL:** from 2024 businesses in Real Estate got 0 free ads; jobs, real estate, motors and services are paid categories [H] ([Bankier](https://www.bankier.pl/wiadomosc/Mniej-bezplatnych-ogloszen-na-OLX-7569466.html), [Base](https://base.com/pl-PL/blog/?p=17229)).
- **Job ads:** Indeed's switch to pay-per-application, set as the default, produced unexpected charges for small employers. Indeed dropped it on 18 Dec 2023 [H] ([SHRM](https://shrm.org/topics-tools/news/talent-acquisition/indeed-pay-per-application-pricing-ends-dec-18), [HR Dive](https://www.hrdive.com/news/indeed-kills-pay-per-application-model-what-happened/704061)).

### 2.4 Subscriptions and packages for professionals
- **Rightmove:** 2025 ARPA was £1,621/month (Agency £1,530, New Homes £2,135), with 19,272 advertisers and agency retention above 90% [S] ([FY25 RNS](https://plc.rightmove.co.uk/content/uploads/2026/02/Rightmove-RNS-27.02.26.pdf)). Top tier is Optimiser Edge; the Premium Price Guide and Opportunity Manager (AI that sorts valuation leads) are exclusive to it [S via H] ([Property Industry Eye](https://propertyindustryeye.com/rightmove-says-new-optimiser-package-going-down-well-with-agents/)). 35% of independents take Optimiser Edge [H] (same).
- **Auto Trader:** FY25 ARPR was £2,854/month, up £133. It is built from three levers: price, product (e.g., Trended Valuations, Retail Check) and stock, which was negative [S] ([FY25 results](https://data.fca.org.uk/artefacts/NSM/RNS/5672441.html)). FY26 ARPR was £2,995 [S] ([FY26 release](https://plc.autotrader.co.uk/media/usjleen0/full-year-press-release-fy26.pdf)). An annual "pricing and product event" each April drives growth [S] (FY25).
- **Scout24 (ImmoScout24):** professional ARPU was €1,224/month in Q2 2026 (+10.4%), from "upgrades into higher-value memberships, value-based pricing" and AI features paid with ImmoPoints [S] ([Scout24 IR](https://www.scout24.com/en/investor-relations/financial-news/ir-news/detail/scout24-maintains-strong-momentum-in-q2-with-20-revenue-growth-double-digit-organic-revenue-growth-and-18-adjusted-eps-growth)). Bronze, Silver and Gold memberships launched Mar 2024 [S] ([ImmoScout24](https://www.immobilienscout24.de/unternehmen/news-medien/news/default-title/immoscout24-startet-die-staerksten-mitgliedschaften-aller-zeiten/)).
- **Leboncoin immo:** four import-based packs launched Sept 2024 (Privilège, Impact +, Smart, Référence). Privilège includes an exclusive top slot, an estimation tool, call tracking, auto-bumps, seller leads and visibility credits [H] ([MySweetImmo](https://www.mysweetimmo.com/2024/09/23/pros-de-limmo-leboncoin-propose-4-nouvelles-solutions-de-diffusion-dannonces/)). Prices: **unverified**.
- **Kleinanzeigen PRO** was restructured from May 2026 into 5 verticals × Basic/Power/Premium, plus a 10-ad entry tier. Businesses get 3 free ads per category, and existing customers keep their terms until the end of 2026 [H] ([iFun](https://www.ifun.de/neuer-einstiegstarif-kleinanzeigen-de-ueberarbeitet-pro-pakete-278830/)). Prices: **unverified** (shown only as an image).
- **Idealista:** the idealista/tools CRM has lead capture, a mortgage profile, activity tracking and a unified inbox [S] ([idealista](https://www.idealista.com/news/node/849365)). Pro prices: **unverified**.

### 2.5 Prepaid wallets, credits and points
- **Bazaraki:** top up any time, then spend the balance on services or activation. If the balance is short, pay by card during posting [S] ([help](https://www.bazaraki.com/help/)). Expiry, refundability and bonus credit: **unverified**, so these are [O] checks.
- **Gumtree:** credit bundles give volume discounts and can be used to post or bump [S] ([business page](https://www.gumtree.com/info/life/gumtree-for-business/services/)). Credit expiry: **unverified**.
- **ImmoScout24 ImmoPunkte:** points book placements such as "Panorama" monthly without fixed quotas [S] ([ImmoPunkte](https://www.immobilienscout24.de/anbieten/gewerbliche-anbieter/inserieren/weitere-produkte/immopunkte.html)). Price per point and expiry: **unverified**.
- **Why it matters:** tokens shift choices toward maximising the medium rather than the outcome [PR] ([Hsee et al. 2003, "Medium Maximization", J. Consumer Research](https://doi.org/10.1086/374697)). See also `service-marketplace-providers.md` on Bark credits and Upwork Connects.

---

## 3. The transactional pivot (payment + shipping + buyer protection)

| Platform | Model | Fees and terms | Adoption / outcome |
|---|---|---|---|
| **Vinted** | All sales through the app; the buyer pays; seller fee 0 | Buyer protection 3–8% + £0.30–0.80 (UK); item verification £10, electronics £5 [S] ([price list](https://www.vinted.co.uk/pricelist)) | 2024 group revenue €813.4m (+36%), net profit €76.7m. The group includes Vinted Go (lockers) and Vinted Pay [H] ([Retail Gazette](https://www.retailgazette.co.uk/blog/2025/04/vinted-triples/)). Fee share of revenue: **unverified** |
| **Leboncoin** | Secure payment held until the item is collected; La Poste, Mondial Relay, Shop2Shop, Relais Colis | Buyer fee estimates conflict (≈5% + €0.70 vs 4–5%, min €0.99) [H, unverified] ([Margeo](https://margeoapp.com/blog/frais-leboncoin-2026-vendeur-particulier-pro)). Seller commission 0 [H] | A 2023-era executive put transactional e-commerce at about 20% of sales [H] ([MIND](https://www.mind.eu.com/retail/en/article/amandine-de-souza-leboncoin-we-add-b2b-and-aim-to-become-europes-leading-second-hand-retailer/)). Adevinta Transaction Services revenue +31% in Q1 2024 (group) [S] ([Q1 2024](https://adevinta.com/wp-content/uploads/2024/05/Q1-2024-Quarterly-report.pdf)) |
| **Kleinanzeigen** | Sicher bezahlen (escrow via OPP); Direkt kaufen (binding purchase, needs tracked DHL/Hermes) | Payout on buyer confirmation or after 14 days at the latest; cap raised to €2,000; private sellers only. Buyer fee €0.50 + 4.5% (old report) [H, unverified] ([iphone-ticker](https://www.iphone-ticker.de/direkt-kaufen-ebay-kleinanzeigen-fuehrt-neue-funktion-ein-198917/), [e-recht24](https://www.e-recht24.de/ecommerce/13270-ebay-kleinanzeigen-kaeuferschutz.html)) | Adoption: **unverified** |
| **OLX (PL)** | Przesyłka OLX + Płatności OLX; paid "Pakiet ochronny" | UOKiK found the protection illusory and the "cheapest" sort fee-blind (2024 decision, refunds ordered) [REG] ([Wiadomości Handlowe](https://www.wiadomoscihandlowe.pl/e-commerce-i-e-grocery/olx-musi-zwrocic-pieniadze-klientom-prezes-uokik-wydal-decyzje-zobowiazujaca-serwis-do-szeregu-zmian-2504259)) | Prosus: OLX de-prioritised general-goods pay-and-ship in Europe and is focusing on motors and real estate [S via H] ([OnlineMarketplaces](https://www.onlinemarketplaces.com/articles/prosus-grows-real-estate-revenue-23-but-profits-fall-at-olx-brasil/)) |
| **Facebook Marketplace** | Checkout + shipping (US) with Purchase Protection | Prepaid labels ended for new listings on 24 Feb 2025 with no explanation, then were reinstated for "select" sellers in Sept 2025 [H] ([VAR](https://valueaddedresource.net/facebook-marketplace-ends-pre-paid-shipping)). Selling fee "5%" in guides [H, unverified]. Shops (not Marketplace) checkout was phased out from June 2025 [H] ([VAR](https://www.valueaddedresource.net/meta-phases-out-native-checkout-facebook-instagram-shops/)) | Meta's Mar 2026 post again promotes shipping with prepaid labels and a tracking dashboard [S] ([Meta](https://about.fb.com/news/2026/03/facebook-marketplace-new-meta-ai-tools-make-selling-faster-and-easier/)) |
| **Auto Trader (UK)** | Deal Builder: online reservation and deal on dealer stock | Accelerated roll-out triggered a Nov 2025 dealer campaign and downgrades. Auto Trader paused auto-roll-out, added "request reservation", removed "secure the vehicle" wording and made the "Reservation in progress" flag less prominent [S] ([FY26 release](https://plc.autotrader.co.uk/media/usjleen0/full-year-press-release-fy26.pdf)), [H] ([AM Online](https://www.am-online.com/news/autotrader-to-add-reservation-request-to-deal-builder-after-retailer-backlash), [Car Dealer](https://cardealermagazine.co.uk/autotrader-profits-near-393m-but-admits-deal-builder-roll-out-hurt-numbers/324324)) | H2 FY26 revenue growth 3%, with higher cancellations hitting FY26 and FY27 [S] |

- **Effect on scams: the platform brand becomes the lure.** CERT Polska's 2024 report is said to name OLX as the most-impersonated brand (9,865 cases) [H, not verified against the primary report] ([ODO24](https://odo24.pl/wiedza/blog/cyberataki-w-polsce-przyklady)). Fake "OLX shipping/payment" pages target **sellers** and ask for card details [H] ([GSMonline](https://gsmonline.pl/artykuly/oszustwo-na-olx-nowa-metoda-wyludzania-danych)). A payment rail creates a new phishing surface, so the seller UI must say plainly that sellers never enter card details to *receive* money.
- **Bazaraki's owner on transactions:** Larixon (backed by Zubr Capital, Oct 2024) says Bazaraki has 46% top-of-mind awareness in general classifieds and 61% in cars. It argues only the No.1 player can implement a transactional model [H] ([FastForward](https://fastforward.com.cy/business/zubr-capital-launches-funding-bazarakicom)).

---

## 4. Seller management and retention

- **Lifetime and expiry:**
  - Bazaraki ads expire and can be reactivated; activation may need payment from the wallet or a card [S] ([help](https://www.bazaraki.com/help/)).
  - Leboncoin ads live 60 days, and paid options don't extend them [H] ([Que Choisir](https://forum.quechoisir.org/post1331654.html)).
  - Facebook listings can be renewed from day 7, up to 5 times per guides, and renewal keeps views and saves [H, unverified] ([Vendoo](https://blog.vendoo.co/facebook-marketplace-delete-and-relist)).
  - Gumtree business ads live 60 days [S]. Gumtree South Africa stopped auto-applying 24-hour bump-ups [S] ([Gumtree ZA](https://www.gumtree.co.za/blog/news/gumtree-seller-experience-changes-affecting-your-account)).
- **Free re-ranking vs paid bump:** on Kleinanzeigen the only free way to resurface an ad is to delete and repost it [H] ([PC-WELT](https://www.pcwelt.de/article/1189429/ebay-kleinanzeigen-einfuehrung-tipps-und-tricks.html)). Delete-and-repost destroys the ad's history (views, saves) [H] (Vendoo), so a platform that only sells re-ranking pushes sellers into duplicate spam.
- **Status controls:** Bazaraki offers edit, activate, deactivate (hide temporarily) and delete (permanent) [S]. Facebook offers Available, Pending and Sold, reversible [H]. A "reserved" state on Bazaraki: **unverified** ([O] check).
- **Stats dashboards:**
  - Vinted shows views and interactions for bumped items [S] (help 340).
  - Facebook has per-listing Insights (views, clicks, messages) [H].
  - Leboncoin visibility stats appear tied to Pro accounts [H, unverified] ([Torregrossa](https://josephtorregrossa.com/blogs/leboncoin/quel-pourcentage-prend-leboncoin-sur-une-vente-guide-complet-pour-vendeurs)).
  - Rightmove Plus shows daily detail views against previous weeks and similar listings [S] (Hub). This is the best "is it the price or the photos?" diagnostic found.
  - Gumtree Pro Console tracks ad performance, Pro only [S].
  - Bazaraki statistics: not on the help page, so **unverified**.
- **Messaging aids:** Meta AI auto-drafts and sends answers to availability questions, and the seller can preview and edit them [S] ([Meta](https://about.fb.com/news/2026/03/facebook-marketplace-new-meta-ai-tools-make-selling-faster-and-easier/)). Kleinanzeigen allows binding price offers [H] ([mobiFlip](https://www.mobiflip.de/ebay-kleinanzeigen-verbindliche-preisvorschlaege/amp/)).
- **Reviews, badges, verification:**
  - Bazaraki sends an automatic review reminder after an interaction, plus one more in-app reminder, then stops [S].
  - Kleinanzeigen's rate button appears 24 hours after first contact and stays for 30 days; ratings are deleted after 2 years [H] ([t3n](https://t3n.de/news/?p=1618661)). Its profiles show satisfaction, reply rate, reply time and followers [H] ([appgefahren](https://www.appgefahren.de/?p=281493)). The reply rate counts only first inquiries, users say spam drags it down, and there is no positive/negative ratio [H] ([GIGA](https://www.giga.de/artikel/antwortrate-bei-ebay-kleinanzeigen-was-ist-das/)).
  - Facebook shows an AI profile summary at the top of the seller profile (tenure, friends, listing history, ratings) [S].
  - **Enforcement:** UOKiK fined OLX PLN 28,420,869 because its seller-rating system misled users (Nov 2020–Jul 2024). OLX can appeal [REG] ([Telepolis](https://www.telepolis.pl/tech/uokik-mylacy-system-ocen-na-olx)).
- **Re-engagement:** no documented case of "your ad dropped to page N" loss-framed upsell pushes was found for Vinted, leboncoin, OLX or Kleinanzeigen (searched in EN, FR, DE, PL). Vinted in-app notifications cannot be turned off; only push can be managed [S] ([help 433](https://www.vinted.co.uk/help/433-how-notifications-work)). Comparable-sold nudges at re-listing: **unverified**.

---

## 5. Business and pro tools

- **Feeds and APIs:**
  - Bazaraki's site footer links "Check your XML feed" [S]. Third-party exporters (Odoo, Shopify/Mulwi) generate Bazaraki XML with rubric and district tags [H] ([Odoo app](https://apps.odoo.com/apps/modules/19.0/softg_xml_feed_generator), [Mulwi](https://mulwi.com/bazaraki-feed/)). Official schema, sync frequency and error reporting: **unverified**.
  - Leboncoin immo packs run through import software [H].
  - Vinted Pro Integrations is an API for catalogue sync and labels, taking about a month to set up with taxonomy mapping. CSV is not supported per a reseller [H] ([ChannelX](https://channelx.world/2024/10/vinted-pro-has-officially-launched-in-the-uk/), [Rebelle](https://rebelleeng.helpscoutdocs.com/article/528-are-there-ways-to-bulk-upload-on-vinted)).
  - eBay bulk AI drafts in Seller Hub [H].
- **Lead inbox and CRM:** idealista/tools has a unified inbox and lead prioritisation [S]. Rightmove Opportunity Manager ranks valuation leads, top tier only [S via H].
- **Valuation leads, the estate-agent growth engine:**
  - Rightmove Online Agent Valuation drove about 50% more unique valuation leads for partners and is its "fastest-growing product launch" [S via H] ([Negotiator](https://thenegotiator.co.uk/news/marketing-news/rightmove-revenue-up-9-as-agent-spending-rises/)). A former franchise manager says only 6 agent slots receive leads per area, sold in Optimiser [H, unverified] ([In Practise](https://inpractise.com/articles/rightmove-geico-and-adas-vitec-software-ao-ti-and-analog-mndy-evotec-sunbelt-uri-clarivate)).
  - Zoopla delivered 42% more valuation leads YoY in Feb 2026, with 5.6m homeowner subscribers tracking value [S] ([Zoopla](https://business.zoopla.co.uk/valuation-leads-up-42-in-february-2026)). Agents dispute lead quality [H] ([PIE](https://propertyindustryeye.com/zoopla-says-it-has-delivered-record-valuations-leads-to-agents/)).
  - ImmoScout24 sells owner leads regionally in quality tiers, and Premium exposés carry an owner-contact box [S].
- **Badges:** ImmoScout24 PremiumPartner seal is based on owner and seeker ratings [S] ([ImmoScout24](https://www.immobilienscout24.de/company/news-media/magazine/detail-en/premiumpartner-das-qualitaetssiegel-von-immobilienscout24/)). Bazaraki dealer/agent badges: **unverified** ([O] check).
- **Analytics and response time:** Kleinanzeigen shows reply time publicly [H]. Pro-side response-time dashboards on general classifieds: **unverified**.
- **Employers:** Indeed's pay-per-application episode (2.3) is the cautionary case: billing-model defaults surprised small employers. Bazaraki employer tools: **unverified**.
- **Change management:** Auto Trader's Deal Builder fixes are a template: advisory groups, opt-in onboarding, and clearer words ("Deal" was read as Auto Trader completing the sale) [S].

---

## 6. Green / amber / red table of seller-side mechanics

| Mechanic | Rating | Why (evidence) |
|---|---|---|
| Price of every paid option shown before commit, in money, with duration and end date | Green | Bazaraki fee-before-publish [S]; Vinted price at checkout [S]; Auto Trader's public table [S] |
| Effect claim with metric, comparison set, period and source footnoted | Green (if recent) / Amber (if stale) | ImmoScout24 footnote [S]; 2017–19 data is stale |
| Effect claim with no method ("2x views", "doubles contacts") | Amber → Red if it drives a purchase | Rightmove [S], leboncoin pro [S via H]; paid prominence partly zero-sum [PR] |
| Paid placement labelled to buyers ("VIP", "Sponsored") | Green; unlabelled is Red | UCPD Annex I 11a bans undisclosed paid ranking [REG] ([Dir. 2019/2161](https://eur-lex.europa.eu/eli/dir/2019/2161/oj)); labels can help advertisers [PR] |
| Ranking rules, including what money buys, published to business users | Green; hidden is Red | P2B Reg. Art 5(3) [REG] ([Reg. 2019/1150](https://eur-lex.europa.eu/eli/reg/2019/1150/oj)) |
| Option sold for longer than the ad has left to live | Red | Leboncoin 7-day boost cut to 4 days, no refund [H]. Fix: cap the duration, pro-rate, or auto-extend the ad |
| Category fee introduced silently at posting time | Red | Leboncoin cars Apr 2025 [H] |
| Paid bump as the only way to resurface; editing doesn't re-rank | Amber | Kleinanzeigen delete-and-repost [H]; leboncoin edit change [H, unverified] |
| Daily auto-refresh inside a bought package (fixed term, no renewal) | Green | OLX 7-day refresh once per day [H] |
| Paid promotion that auto-renews / rebills | Red unless opted in with reminders and a one-click cancel | DMCC subscription regime from Jan 2027 (UK) [REG] ([Baker McKenzie](https://connectontech.bakermckenzie.com/uk-government-accelerates-dmcca-subscription-reforms-to-january-2027/)); EU withdrawal button from 19 Jun 2026 [REG] ([Dir. 2023/2673](https://eur-lex.europa.eu/eli/dir/2023/2673/oj)) |
| Wallet balance with expiry, non-refundable, or bonus-credit rules hidden | Red; no expiry + refund on close is Green | Token effects [PR]; Bazaraki terms **unverified** |
| Points/credits instead of money at the point of purchase | Amber | ImmoPunkte [S]; medium maximisation [PR] |
| Buyer-paid protection that excludes most failure cases | Red | UOKiK OLX "illusory" package [REG] |
| "Cheapest first" sort that ignores mandatory fees | Red | UOKiK OLX [REG] |
| Seller ratings that are misleading (inflated, unexplainable) | Red | UOKiK PLN 28.4m fine [REG] |
| Reply-rate badge that counts spam and first replies only | Amber | Kleinanzeigen [H] |
| AI listing draft, editable, with opt-out | Green | Kleinanzeigen full/partial/none [H]; OLX "no price without consent" [S] |
| AI photo-first flow forced with no opt-out | Red | eBay complaints [H] |
| Price suggestion from comparables, shown as a range with the basis | Green | Meta "similar items in your area" [S]; Smart Pricing gains [PR] |
| Valuation label on seller's ad that the seller cannot see or contest | Amber | Auto Trader "cannot opt-out" [S] |
| Loss-framed upsell ("your ad dropped to page 3 — boost now") | Red if the rank claim is unverifiable or false-urgent; Amber if accurate with a free alternative | No documented case found; false urgency is a dark pattern [REG] ([CMA, Online Choice Architecture 2022](https://www.gov.uk/government/publications/online-choice-architecture-how-digital-design-can-harm-competition-and-consumers)); DSA Art 25 [REG] ([Reg. 2022/2065](https://eur-lex.europa.eu/eli/reg/2022/2065/oj)) |
| Forced roll-out of a pro feature that changes the dealer's process | Red | Auto Trader Deal Builder [S][H] |
| Pay-per-outcome billing as a silent default | Red | Indeed PPA [H] |

---

## Implications for the ux-audit skill

A seller- and business-side recipe. Each step is **audit → default redesign**. Bazaraki-specific gaps marked **unverified** above are first-pass [O] checks.

**A. Posting (private seller)**
1. Audit [O]: time from "Post ad" to live on mobile, counting taps, required fields, photo upload (multi-select, reorder, compression) and verification gates. Check that the fee is shown before the final step.
   Default: photo-first entry → AI draft of title, category, attributes and description, with every field editable and an "enter manually" path always visible. Required fields only, everything else progressive. **Evidence:** OLX 35–55% time cut [S]; eBay forced-flow backlash [H]; Kleinanzeigen accept full/partial/none [H].
2. Audit [O]: is there a price suggestion, and what is it based on?
   Default: a range ("similar items near you sold/listed for €X–€Y, n=…"). Never pre-fill a price without consent. **Evidence:** Meta [S]; OLX consent rule [S]; Smart Pricing +8.6% revenue for adopters [PR].
3. Audit [O]: is there photo guidance or a quality hint?
   Default: an inline checklist (cover shot, 4+ photos, light, defects shown) with the impact stated only if measured. **Evidence:** verified photos +8.98% occupancy [PR].
4. Audit [O]: does a draft survive leaving the app? Default: auto-save the draft and say so.

**B. Paid visibility (VIP/TOP, bumps, labels)**
5. Audit [O]: for each product, are the money price, duration, start and end date, placement and what buyers see all shown on one screen before payment? Default: a comparison card with columns Free / Top / VIP, rows *where it appears*, *for how long*, *ends on*, *price* and *what the buyer sees* (the label). **Evidence:** Bazaraki fee-before-publish [S]; P2B Art 5(3) [REG].
6. Audit: does any effect claim have a footnote? Default: either drop the claim, or show "In [category], [period], VIP ads got a median X× contacts in 7 days vs similar regular ads (own data)". Better still, show the seller their own ad's views and contacts before and after. **Evidence:** ImmoScout24 footnote model [S]; zero-sum caution [PR].
7. Audit [O]: can a promotion outlast the ad? Default: cap the promotion at the remaining ad life, or extend the ad for free to cover it, and state this at checkout. **Evidence:** leboncoin case [H].
8. Audit [O]: do VIP/TOP results carry a visible label to buyers? Default: a consistent "VIP"/"Top" chip plus a "Why am I seeing this?" link to ranking rules. **Evidence:** UCPD 11a [REG]; disclosure helped advertisers [PR].
9. Audit: is there a free way to keep a fresh ad visible (e.g., renewal on expiry, re-rank after a meaningful edit or price drop)? Default: one free renewal on expiry, with ad history preserved. **Evidence:** delete-and-repost harm [H]; Rightmove auto-feature after a price cut [S via H].

**C. Wallet and recurring charges**
10. Audit [O]: top-up amounts, bonus credit, expiry, refund on account closure, whether the balance shows in € at every spend point, and receipts. Default: the balance always shows in €; no expiry on paid money; an expiry date on promo credit only, shown next to the balance; one-tap refund request. **Evidence:** token effects [PR]; Gumtree/ImmoPunkte opacity [S].
11. Audit [O]: does any promotion or pro package renew automatically? Default: off by default; a reminder before each renewal with amount and date; a cancel button reachable in 2 taps. **Evidence:** DMCC Jan 2027 [REG]; EU withdrawal button [REG].

**D. Seller management and retention**
12. Audit [O]: my-ads list shows status (active, hidden, expired, paid-until), views, saves, contacts and days left. Default: a per-ad card with those five numbers and one next-best action. Diagnostics should be honest ("views fine, few contacts → check price vs similar"), not only "Boost". **Evidence:** Rightmove similar-listing comparison [S].
13. Audit [O]: mark as sold/reserved, and whether the sold price is asked. Default: Sold → optional price → "Sell another like this?" prefilled draft. Reserved hides the contact CTA but keeps the ad.
14. Audit [O]: notification copy for sellers. Red-flag any rank or "dropped" claim that can't be verified, and any copy where the boost is the only CTA. Default: neutral facts ("12 views this week, 0 messages") + free tips + optional paid option. **Evidence:** CMA OCA [REG]; DSA Art 25 [REG].
15. Audit [O]: review prompts (timing, frequency, two-sided?) and how ratings and reply rate are computed. Default: prompt once after a confirmed deal; publish the formula; exclude spam threads from reply rate. **Evidence:** Bazaraki 2-reminder cap [S]; Kleinanzeigen reply-rate complaints [H]; UOKiK rating fine [REG].

**E. Transactions (if Bazaraki adds pay + ship)**
16. Default: buyer-paid protection with plain-language coverage and exclusions on the item page. Fees must be included in "lowest price" sorts. Seller copy: "You never enter card details to receive money." **Evidence:** Vinted model [S]; UOKiK OLX [REG]; OLX phishing [H].

**F. Business tools (dealers, agents, developers, employers)**
17. Audit [O]: XML feed docs, validation report (rejected items and why), sync time and duplicate handling. Default: a feed health page with last sync, items OK/rejected and a fix link per error.
18. Audit [O]: a lead inbox with source, ad, response time and status. Default: a unified inbox with quick replies, call tracking (if offered) and a response-time metric visible to the business first, before it becomes a public badge. **Evidence:** idealista/tools [S]; Rightmove Opportunity Manager [S via H].
19. Audit: package pages show what each tier adds, price, term and renewal. Default: a tier table plus a "your last 30 days" ROI view (contacts per € on paid vs unpaid stock). **Evidence:** Rightmove, Auto Trader and Scout24 ARPA drivers [S].
20. Rule for any new pro feature that changes the customer's process: opt-in, then an advisory group, then the default. **Evidence:** Deal Builder [S][H]; Indeed PPA [H].

---

## Sources

**Company-stated [S]**
- Bazaraki help centre: https://www.bazaraki.com/help/
- eBay Innovation, Magical Listing: https://innovation.ebayinc.com/stories/magical-listing-tool-harnesses-the-power-of-ai-to-make-selling-on-ebay-faster-easier-and-more-accurate/
- Meta, Marketplace AI tools (12 Mar 2026): https://about.fb.com/news/2026/03/facebook-marketplace-new-meta-ai-tools-make-selling-faster-and-easier/
- OLX, AI at OLX: https://www.olxgroup.com/ai-at-olx/
- Vinted UK price list: https://www.vinted.co.uk/pricelist
- Vinted Bump help: https://vinted.co.uk/help/340
- Vinted pricing help: https://www.vinted.co.uk/help/376
- Vinted notifications: https://www.vinted.co.uk/help/433-how-notifications-work
- Gumtree for Business services: https://www.gumtree.com/info/life/gumtree-for-business/services/
- Gumtree ZA seller changes: https://www.gumtree.co.za/blog/news/gumtree-seller-experience-changes-affecting-your-account
- Auto Trader UK advertising prices: https://www.autotrader.co.uk/cars/sell/advertising-prices
- Price Indicator T&Cs: https://www.autotrader.co.uk/partners/retailer/terms-and-conditions/price-indicator
- Auto Trader help: https://help.autotrader.co.uk/hc/en-gb/articles/19212037724957-Why-do-I-have-a-Price-Indicator-on-my-advert
- Auto Trader FY25 results: https://data.fca.org.uk/artefacts/NSM/RNS/5672441.html
- Auto Trader FY26 release: https://plc.autotrader.co.uk/media/usjleen0/full-year-press-release-fy26.pdf
- Rightmove FY25 RNS: https://plc.rightmove.co.uk/content/uploads/2026/02/Rightmove-RNS-27.02.26.pdf
- Hub, Featured Property: https://hub.rightmove.co.uk/how-to-make-the-most-of-featured-property/
- Rightmove 2016 article: https://www.rightmove.co.uk/news/?p=56239
- Scout24 Q2 2026: https://www.scout24.com/en/investor-relations/financial-news/ir-news/detail/scout24-maintains-strong-momentum-in-q2-with-20-revenue-growth-double-digit-organic-revenue-growth-and-18-adjusted-eps-growth
- ImmoScout24 Premium-Platzierung 50%: https://www.immobilienscout24.de/anbieten/gewerbliche-anbieter/inserieren/weitere-produkte/premium-platzierung-50-prozent.html
- ImmoPunkte: https://www.immobilienscout24.de/anbieten/gewerbliche-anbieter/inserieren/weitere-produkte/immopunkte.html
- Memberships: https://www.immobilienscout24.de/unternehmen/news-medien/news/default-title/immoscout24-startet-die-staerksten-mitgliedschaften-aller-zeiten/
- PremiumPartner: https://www.immobilienscout24.de/company/news-media/magazine/detail-en/premiumpartner-das-qualitaetssiegel-von-immobilienscout24/
- Zoopla valuation leads: https://business.zoopla.co.uk/valuation-leads-up-42-in-february-2026
- idealista/tools: https://www.idealista.com/news/node/849365
- Adevinta Q1 2024: https://adevinta.com/wp-content/uploads/2024/05/Q1-2024-Quarterly-report.pdf

**Peer-reviewed [PR]**
- Zhang, Lee, Singh, Srinivasan (2022) Management Science, Airbnb images: https://pubsonline.informs.org/doi/10.1287/mnsc.2021.4175
- Zhang, Mehta, Singh, Srinivasan (2021) Marketing Science, Smart Pricing: https://pubsonline.informs.org/doi/10.1287/mksc.2021.1295
- Blake, Nosko, Tadelis (2015) Econometrica, paid search: https://faculty.haas.berkeley.edu/stadelis/BNT_ECMA_rev.pdf
- Holtz et al., Management Science, interference bias: https://pubsonline.informs.org/doi/10.1287/mnsc.2020.01157
- Sahni & Nair (2020) Review of Economic Studies 87(3): https://ideas.repec.org/a/oup/restud/v87y2020i3p1529-1564..html
- Hsee et al. (2003) J. Consumer Research, medium maximization: https://doi.org/10.1086/374697

**Regulation and enforcement [REG]**
- Directive (EU) 2019/2161 (Omnibus; UCPD Annex I 11a, CRD Art 6a): https://eur-lex.europa.eu/eli/dir/2019/2161/oj
- Regulation (EU) 2019/1150 (P2B, Art 5): https://eur-lex.europa.eu/eli/reg/2019/1150/oj
- Regulation (EU) 2022/2065 (DSA, Arts 25, 26, 30): https://eur-lex.europa.eu/eli/reg/2022/2065/oj
- Directive (EU) 2023/2673 (withdrawal button, from 19 Jun 2026): https://eur-lex.europa.eu/eli/dir/2023/2673/oj
- UK DMCC subscription regime, Jan 2027: https://connectontech.bakermckenzie.com/uk-government-accelerates-dmcca-subscription-reforms-to-january-2027/
- CMA, Online Choice Architecture (2022): https://www.gov.uk/government/publications/online-choice-architecture-how-digital-design-can-harm-competition-and-consumers
- UOKiK v OLX, Feb 2024 decision (press): https://www.wiadomoscihandlowe.pl/e-commerce-i-e-grocery/olx-musi-zwrocic-pieniadze-klientom-prezes-uokik-wydal-decyzje-zobowiazujaca-serwis-do-szeregu-zmian-2504259
- Rating fine (press): https://www.telepolis.pl/tech/uokik-mylacy-system-ocen-na-olx

**Practitioner, press, forum [H]**
- eBay:
  - https://www.valueaddedresource.net/ebay-ai-magical-listing-complaints/
  - https://www.digitalcommerce360.com/2025/04/15/ebay-ai-aided-tool-cut-steps-create-listings/
  - https://www.retaildive.com/news/ebay-ai-magical-listing-product-descriptions-listings/693185/
- Facebook:
  - https://thenextweb.com/news/meta-seller-app-facebook-marketplace-ai-listing
  - https://valueaddedresource.net/facebook-marketplace-ends-pre-paid-shipping
  - https://www.valueaddedresource.net/meta-phases-out-native-checkout-facebook-instagram-shops/
  - https://oneshop.com/blog/facebook-marketplace-boosted-listing
  - https://blog.vendoo.co/facebook-marketplace-delete-and-relist
- Leboncoin:
  - https://www.clubic.com/actualite-547358-avec-un-feu-d-artifice-leboncoin-montre-son-ambition-de-rattraper-amazon-en-france-aidee-par-l-ia.html
  - https://journalauto.com/services/leboncoin-adresse-lia-generative-aux-revendeurs-particuliers/
  - https://journalauto.com/services/leboncoin-commence-a-facturer-les-particuliers/
  - https://www.clubic.com/actualite-562317-ni-vu-ni-connu-leboncoin-vous-fait-payer-plus-cher-vos-annonces-auto.html
  - https://forum.quechoisir.org/post1331654.html
  - https://www.dealabs.com/discussions/prix-excessif-leboncoin-pour-les-pro-2705311
  - https://margeoapp.com/blog/frais-leboncoin-2026-vendeur-particulier-pro
  - https://www.mind.eu.com/retail/en/article/amandine-de-souza-leboncoin-we-add-b2b-and-aim-to-become-europes-leading-second-hand-retailer/
  - https://www.mysweetimmo.com/2024/09/23/pros-de-limmo-leboncoin-propose-4-nouvelles-solutions-de-diffusion-dannonces/
  - https://www.mysweetimmo.com/2021/09/16/leboncoin-veut-faciliter-le-quotidien-des-pros-de-limmo/
  - https://josephtorregrossa.com/blogs/leboncoin/quel-pourcentage-prend-leboncoin-sur-une-vente-guide-complet-pour-vendeurs
- Kleinanzeigen:
  - https://www.mobiflip.de/kleinanzeigen-fuehrt-ki-gestuetzte-anzeigenerstellung-per-foto-ein/amp/
  - https://www.bezahlen.net/ratgeber/ebay-kleinanzeigen-gebuehren/
  - https://www.ifun.de/neuer-einstiegstarif-kleinanzeigen-de-ueberarbeitet-pro-pakete-278830/
  - https://www.iphone-ticker.de/direkt-kaufen-ebay-kleinanzeigen-fuehrt-neue-funktion-ein-198917/
  - https://www.e-recht24.de/ecommerce/13270-ebay-kleinanzeigen-kaeuferschutz.html
  - https://www.giga.de/artikel/antwortrate-bei-ebay-kleinanzeigen-was-ist-das/
  - https://t3n.de/news/?p=1618661
  - https://www.appgefahren.de/?p=281493
  - https://www.pcwelt.de/article/1189429/ebay-kleinanzeigen-einfuehrung-tipps-und-tricks.html
  - https://www.mobiflip.de/ebay-kleinanzeigen-verbindliche-preisvorschlaege/amp/
  - https://www.justanswer.de/elektronik/r70ly-meine-anzeige-zum-verkauf-von-skiern-ist-verschwunden.html
- OLX / Prosus:
  - https://bezprawnik.pl/oplaty-za-ogloszenia-samochodow-na-olx/
  - https://www.bankier.pl/wiadomosc/Mniej-bezplatnych-ogloszen-na-OLX-7569466.html
  - https://base.com/pl-PL/blog/?p=17229
  - https://www.onlinemarketplaces.com/articles/prosus-grows-real-estate-revenue-23-but-profits-fall-at-olx-brasil/
  - https://odo24.pl/wiedza/blog/cyberataki-w-polsce-przyklady
  - https://gsmonline.pl/artykuly/oszustwo-na-olx-nowa-metoda-wyludzania-danych
- Vinted:
  - https://www.retailgazette.co.uk/blog/2025/04/vinted-triples/
  - https://channelx.world/2024/10/vinted-pro-has-officially-launched-in-the-uk/
  - https://rebelleeng.helpscoutdocs.com/article/528-are-there-ways-to-bulk-upload-on-vinted
- Rightmove / Zoopla / Auto Trader:
  - https://propertyindustryeye.com/rightmove-says-new-optimiser-package-going-down-well-with-agents/
  - https://thenegotiator.co.uk/news/marketing-news/rightmove-revenue-up-9-as-agent-spending-rises/
  - https://inpractise.com/articles/rightmove-geico-and-adas-vitec-software-ao-ti-and-analog-mndy-evotec-sunbelt-uri-clarivate
  - https://www.property118.com/be-wary-of-letting-agents-pushing-rightmove-premium-listings/
  - https://propertyindustryeye.com/zoopla-says-it-has-delivered-record-valuations-leads-to-agents/
  - https://www.am-online.com/news/autotrader-to-add-reservation-request-to-deal-builder-after-retailer-backlash
  - https://cardealermagazine.co.uk/autotrader-profits-near-393m-but-admits-deal-builder-roll-out-hurt-numbers/324324
- Bazaraki ecosystem:
  - https://fastforward.com.cy/business/zubr-capital-launches-funding-bazarakicom
  - https://subger.com/en/gb/service/bazaraki-cy
  - https://apps.odoo.com/apps/modules/19.0/softg_xml_feed_generator
  - https://mulwi.com/bazaraki-feed/
- Jobs:
  - https://shrm.org/topics-tools/news/talent-acquisition/indeed-pay-per-application-pricing-ends-dec-18
  - https://www.hrdive.com/news/indeed-kills-pay-per-application-model-what-happened/704061
