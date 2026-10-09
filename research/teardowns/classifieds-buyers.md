# Teardown: the buyer/seeker side of online classifieds

Scope: real estate (Rightmove, Zoopla, Idealista, Zillow), motors (AutoScout24, mobile.de, Auto Trader UK), general goods (Leboncoin, OLX, Kleinanzeigen,
Craigslist, Facebook Marketplace, Vinted, Gumtree) and jobs (Indeed, StepStone, LinkedIn Jobs). Written for the ux-audit skill. The owner will audit
**general and vertical classifieds such as Bazaraki (Cyprus: real estate, cars, jobs, goods, services)**. Compiled 2026-10-09.

**Tags.** **[S]** company-stated (help centre, newsroom, investor filing, app-store description written by the company, or law/regulator text) · **[O]** observed by us,
with how · **[PR]** peer-reviewed (journal or peer-reviewed conference) · **[H]** practitioner, trade press, vendor blog, or a working paper/preprint not yet
peer-reviewed (labelled "WP"). "unknown" or "unverified" means no reliable public source was found. **An [H] value is never the product's real spec.**

**Method and limits.** Web search plus direct fetches of first-party pages. Several first-party pages returned 403 (zillow.com/zestimate, zillow.com/research,
Auto Trader's price-indicator terms, Inman, am-online Deal Builder pause). For those the fact comes from a search-engine excerpt or a second-hand report and is
marked "(excerpt)". **[O] sessions (2026-10-09, desktop browser, logged out, cookies rejected):** Craigslist SF Bay search, Rightmove London and York results
plus one York listing, AutoScout24.de VW Golf results, Kleinanzeigen "fahrrad" results (read behind the consent wall), Indeed UK "nurse, London". Zillow,
Leboncoin, Idealista, Vinted, Facebook Marketplace, mobile.de and the native apps were **not** driven. Avito, Carvana and Cazoo were dropped: no solid
primary sources were found in the time available. Help-centre rules and labels change often; dates are given where known.

---

## Summary (10 bullets)

1. **Location (or make/model) first, then a few hard filters, then everything else behind "Filters" with a live result count.** Rightmove puts location + radius ("This area only" to 40 miles) + price + beds in the bar, and its filter sheet footer shows "60,829 results / Done" [O]. Kleinanzeigen and Craigslist show counts on every facet and category [O]. Craigslist even draws a price histogram with the average [O].
2. **Map search is a first-class mode, not a garnish.** Rightmove has had draw-a-search since 2010. Its 2021 relaunch reported a 37% rise in people drawing areas [S]. Zoopla and Idealista let you draw on the map, and Idealista added multi-zone search in Feb 2026 [S]. Airbnb says maps carry about 80% of search interactions. Its KDD paper found the order of map pins barely matters, but showing more pins *lowers* booking probability [S, PR].
3. **Commute time is the real-estate filter that maps can't express.** Rightmove's "My Places" shows walk/cycle/drive/transit time from every listing to the buyer's saved places [S, O]. Zoopla offers travel-time search [S].
4. **The card is a decision summary.** On the leaders it carries photo count, price + qualifier, 3–5 key specs, a freshness or price-change stamp ("Added on", "Reduced on", "Heute, 17:04", "Neu"), save and compare, and a paid-placement label ("FEATURED PROPERTY", "PREMIUM LISTING") [O]. In the EU, paid ranking must be disclosed [S, law].
5. **Price-fairness labels are the motors category's signature move.** Auto Trader UK shows Low/Great/Good/Fair/High against its own valuation [S, excerpt]. AutoScout24 uses five labels plus "no rating", built from 14 months of comparables, more than 10M records and 70+ equipment features, recomputed daily, and **not for sale** [S]. Dealers push back on non-green labels [H]. No peer-reviewed study of these labels' effect on conversion was found (**unverified**).
6. **The listing page answers the next question before it is asked.** Rightmove's York listing shows: key-facts strip, "Reduced on", "Can you afford it?", a repayment calculator, EPC, council tax, utilities/rights, sale history, broadband, schools, stations, travel time, AI question chips and private notes [O]. EU law requires the energy indicator in property adverts [S, law].
7. **Alerts are the return engine, and they come in frequencies.** Rightmove: Instantly, Daily, Every 3 days or Every 7 days. Each email states the total of new/reduced homes and shows up to 14 at random [S]. Rightmove sent 78M+ alerts in March 2021 [S]. Leaders alert on **new, reduced, back on market and sold** for saved searches *and* saved items (Zoopla, Idealista, Vinted, mobile.de, AutoScout24) [S].
8. **Freshness is worth showing because speed pays.** LinkedIn moved to alerts "within minutes" and says the first 25 applicants are up to 3× more likely to be hired [S]. On Airbnb, filtering out unavailable (stale) listings cut attempts to book unavailable listings by over 60% [H, WP].
9. **Contact is moving from "call / email" to structured next steps.** Examples: Auto Trader Deal Builder (part-ex, finance, £99 reservation) [S], Rightmove "Request details" + Mortgage in Principle [O], and Meta AI auto-drafting replies to Marketplace's prefilled "Is this still available?" (Mar 2026) [H]. Auto Trader's rollout shows the supply-side risk: a dealer backlash forced opt-in choices [H].
10. **AI search is arriving as a toggle and as ChatGPT apps, never as a replacement for filters.** Zillow NL search (2023) [S]; Rightmove "Classic / AI" toggle with a sources button and compare-up-to-5 (beta 2026) [S]; LinkedIn AI job search (2025) [H]. Zillow, Rightmove, Idealista, Leboncoin, Kleinanzeigen and StepStone all ship ChatGPT apps or plugins that hand off to their own site for contact [S, H]. No published conversion lift for any of them (**unknown**).

---

## 1. Entry and category choice

- **Query first, category second (general classifieds).** On Kleinanzeigen, a free-text query ("fahrrad") returns 885,164 results. The left rail then offers the category with counts ("Fahrräder & Zubehör (796.884)") plus attribute facets (type, condition, shipping, private vs commercial, region), each with counts [O]. Craigslist does the same across sections: "more results in for sale 10420 · housing 4109 · services 169" [O].
- **Location first (real estate).** Rightmove's bar is location → radius ("This area only", ¼ mile … 40 miles) → min/max price → min/max beds → Filters [O]. Zoopla: draw an area, type a location, or use current location [S] ([Zoopla app listing](https://apps.apple.com/gb/app/zoopla-property-search-uk/id380932800)).
- **Make/model first (motors).** AutoScout24's URL is the query (`/lst/volkswagen/golf`). Its rail starts with Make & model, More model features, Body type, First registration, Condition, Fuel [O].
- **What + where (jobs).** Indeed's chips: Pay, Remote, Distance, Easily apply, Job type, Education level, Industry, "Encouraged to apply", Date posted [O].
- **Personalised entry.** OLX describes its old homepage as freshness-ordered and identical for everyone, with frequent zero-result searches. After ML personalisation it reports >230% listing views, +450% replies and +118% deliveries [S, baseline and period not stated] ([Prosus OLX case study](https://www.prosus.com/~/media/Files/P/prosus-corp-v2/investors/ai-at-prosus-olx-case-study.pdf)).

## 2. Search and filters

**Facets and counts**
- Counts on every facet value (Kleinanzeigen) [O]. A live total in the filter sheet footer (Rightmove "60,829 results · Done") [O]. A price histogram with the average (Craigslist "avg: $71") [O].
- Craigslist toggles: search titles only, has image, posted today, hide duplicates, owner/dealer, miles from location, "use map…", condition, delivery available [O].
- Rightmove's sheet: property-type chips with icons, bathrooms, "Date added: Anytime", **"Include Under Offer, Sold STC" unchecked by default**, tenure [O].
- Keyword-within-filters: Rightmove "Add keyword" and "Prioritise properties with…" [O]. Its 2025 "AI keywords" finds features such as exposed brick or underfloor heating [S] ([PIE](https://propertyindustryeye.com/rightmove-upgrades-ai-tools-to-improve-property-search/)).

**Radius, "near me", map, draw, commute**
- Radius: Rightmove has a fixed ladder [O]. Craigslist uses "miles from location" [O]. Indeed has a Distance chip [O].
- Draw-a-search, Rightmove:
  - Launched July 2010 and billed as a portal first. Over 10,000 shapes were saved within days, and shapes can drive alerts [S] ([Property Reporter](https://www.propertyreporter.co.uk/property/rightmove-launches-draw-a-search.html)).
  - Rebuilt in March 2021: +37% people creating bespoke areas and ~250k areas drawn that year [S] ([PIE](https://propertyindustryeye.com/?p=97652)).
- Idealista: finger-draw on the map [S, app store]. Multi-zone search (Feb 2026) combines neighbourhoods, towns or provinces in one search, editable on the map, "best in the app where the map is always available" [S] ([idealista news](https://www.idealista.com/news/node/883902)).
- Commute: Rightmove "My Places" calculates walk/cycle/drive/public-transport time from each listing to the user's saved places, applied across every listing viewed [S, vendor] ([TravelTime case study](https://traveltime.com/case-study/rightmove-property-poi-search-traveltime)). Seen on a listing as "My places · Stations · Schools" with "Add an important place…" [O]. Zoopla has travel-time search by mode [S] ([app listing](https://apps.apple.com/gb/app/zoopla-property-search-uk/id380932800)).
- Map vs list evidence: Airbnb says maps are ~80% of search interactions [S] ([airbnb.tech](https://airbnb.tech/?p=653)). In the KDD 2024 paper, randomising the order of map results had negligible effect on bookings, and more pins reduced the average booking probability ("less is more"), so Airbnb filters and tiers pins [PR] ([Haldar et al., arXiv 2407.00091](https://arxiv.org/abs/2407.00091)).

**Stale listings and broadening**
- On Airbnb, availability filtering cut attempts at unavailable listings by over 60%. Without it, accepted inquiries were estimated to fall 68% and rejections to rise 140% [H, WP] ([Fradkin 2017](https://ide.mit.edu/wp-content/uploads/2017/07/SearchMatchingEfficiency.pdf)). This is the case for "Sold STC hidden by default" and auto-expiry.
- Suggesting adjacent occupations broadened what job seekers considered and raised interview invitations, mostly for narrow searchers [PR] ([Belot, Kircher & Muller 2019, REStud](https://docs.iza.org/dp10068.pdf)). This is the case for "widen your search" suggestions on thin results.

## 3. Results list

| Product | Card anatomy (observed) | Sort / paging |
|---|---|---|
| Rightmove | photo index "1/16" · label "FEATURED PROPERTY" or "PREMIUM LISTING" · price + qualifier ("Guide Price", "POA") · address · type · beds · baths · 1–2 line summary · "Added on dd/mm/yyyy" or "Reduced on dd/mm/yyyy" + agent · agent phone + "Local call rate" [O] | Highest/Lowest price, Newest/Oldest listed; London search without a sort parameter opened highest-price-first after one featured card [O]; Map view [O] |
| AutoScout24.de | Compare ("Vergleichen") · Save ("Merken") · photo count · price · **price label** ("Sehr guter Preis", "Guter Preis", "Ohne Preisbewertung") · "ab 30 € mtl." + finance calculator link · insurance compare · "Neu" and "Sehr beliebt" badges · reg. date · km · fuel · kW/PS · 8 equipment highlights · dealer + postcode · "more vehicles from this dealer" [O] | Default "Beste Ergebnisse"; 12 sorts incl. **monthly finance rate** and leasing rate; numbered pages 1…200 [O] |
| Kleinanzeigen | photo count · postcode + town · "Heute, 17:04" · title · snippet · price + "VB" (negotiable) · **old price struck through** · "Versand möglich" · "PRO" for commercial [O] | Default "Neueste"; "1 – 25 von 885.164"; "Suche speichern" [O] |
| Craigslist | photo dots (count) · title · age ("<1hr ago", then date) · neighbourhood · price [O] | list / thumb / gallery / map views; default "newest" in our session; relevance/price/condition; bell icon beside search [O] |
| Indeed UK | title · employer · location · snippet · links to salary search and company Q&A [O] | "relevance – date", default relevance [O] |

- **Paid placement must be labelled (EU).** The Omnibus Directive (2019/2161) makes undisclosed paid ranking in search results a misleading practice. Marketplaces must also explain their main ranking parameters [S, law via legal summaries] ([Addleshaw Goddard](https://www.addleshawgoddard.com/en/insights/insights-briefings/2020/competition/the-eu-omnibus-directive--time-to-prepare-for-strengthened-consumer-laws/); [CMS DE](https://cms.law/en/deu/legal-updates/online-plattformen-muessen-ranking-parameter-offenlegen)). Denmark's competition authority found that a prominent, clear disclosure nearly triples awareness of paid results [S, regulator] ([KFST](https://kfst.dk/media/2w0bvx2n/clear-and-intuitive-disclosures-58.pdf)). Cyprus is in the EU, so this applies to Bazaraki.
- **Paging.** Baymard's 2016 large-scale testing favoured "load more" + lazy loading. It found infinite scroll harmful for search results, especially on mobile [H] ([Smashing/Baymard](https://smashingmagazine.com/2016/03/pagination-infinite-scrolling-load-more-buttons)). AutoScout24 and Kleinanzeigen use numbered pages [O].
- **Position effects.** In an Expedia field experiment, rankings changed *what consumers searched*, but conditional on search did not change purchases. A utility-based ranking roughly doubled modelled consumer welfare [PR] ([Ursu 2018, Marketing Science](https://pubsonline.informs.org/doi/fpi/10.1287/mksc.2017.1072)). In classifieds, the top slots buy attention, not trust.
- **Freshness.** Rightmove alerts carry homes "added or reduced today" [S] ([help](https://customerfaq.rightmove.co.uk/support/solutions/articles/7000098933-how-the-property-alerts-work)). Kleinanzeigen stamps the time and Craigslist the age [O]. AutoScout24 badges new listings "Neu" [O].

## 4. Listing page

**Rightmove listing anatomy, top to bottom** [O, York 5-bed, 2026-10-09]:
- "See similar properties" · gallery "1 of 27" · address · "Guide Price £850,000" · **"Can you afford it?"** · "Reduced on 06/10/2026".
- Key-facts strip: type, bedrooms, bathrooms, size (sq ft *and* sq m), tenure. Then key-feature bullets and an AI "Summarise property details".
- Material information: council tax band, parking, garden and accessibility (shown as "Ask agent" when missing), EPC, "Utilities, rights & restrictions".
- AI question chips (e.g. "Where are the closest supermarkets?"). Then map, Street View, My places, Stations, Schools.
- Affordability: monthly repayment from price, deposit, rate and term, with Recalculate and a Mortgage in Principle offer that promises faster viewings.
- Renovation potential, broadband speed, property sale history, recently sold & under offer nearby, similar nearby.
- Agent block, private "Notes" ("only you can see them"), "Call agent", "Request details", and a fraud/security-centre link.

**Price indicators and valuations**
- **Auto Trader UK.**
  - Flags: Low, Great, Good, Fair and High Price against the "Autotrader Valuation", built from advert and dealer sales data and shown at Auto Trader's discretion. The £ gap is shown for the Low, Great, Fair and High flags [S, excerpt] ([terms](https://www.autotrader.co.uk/partners/retailer/terms-and-conditions/price-indicator)).
  - History: launched 2017 with great/good/low [H] ([AM](https://am-online.com/news/supplier-news/2017/05/31/consumers-now-told-if-vehicles-are-fairly-priced-on-auto-trader)). "Fair" and "High" were added in Dec 2019, when valuations drew on 1.9M+ vehicles a day [H] ([Motoring Research](https://www.motoringresearch.com/car-news/auto-trader-website-update)).
- **AutoScout24.de.**
  - Labels: very good, good, fair, elevated, high, plus "no rating" for rare cars, missing data or extreme prices.
  - Method: listings from the last 14 months, 10M+ records and 70+ equipment features, recomputed daily. Labels "cannot be bought". Condition, regional demand and re-imports are not considered [S] ([AutoScout24](https://www.autoscout24.de/promo/preisbewertung/)).
  - The label also appears on the result card [O].
- **mobile.de.** A similar 5-step scale. Dealers say a negative label makes buyers drop the car outright; mobile.de roughly doubled its attributes after talks with the ZDK dealer association [H] ([autohaus.de](https://www.autohaus.de/nachrichten/autohandel/dialog-zwischen-zdk-und-mobile-de-preisbewertung-wird-angepasst-2720800)).
- **CarGurus (US reference).** Deal ratings are based on Instant Market Value. A source reports that listings without disclosed fees get "No Rating" and that ratings now use the all-in price [H, undated] ([cardog](https://cardog.app/blog/how-cargurus-works)).
- **Zillow Zestimate.**
  - Nationwide median error ≈1.8% for on-market homes and ≈7% for off-market homes. The figures are refreshed periodically, and older articles quote 2.4% and 7.5% [S, excerpt] ([zillow.com/zestimate](https://www.zillow.com/zestimate); [The Close](https://theclose.com/how-accurate-is-zillow-zestimate/)).
  - Listing and sale outcomes respond to Zestimate changes, a human–algorithm feedback loop [H, WP] ([Fu, Jin & Liu, NBER w29880](https://www.nber.org/papers/w29880)).
  - Zestimate is more accurate in richer neighbourhoods [PR] ([Fu et al., Marketing Science](https://sites.google.com/umich.edu/yan-huang/research)).
- **Zoopla.** Estimated current value, last sold prices, and listing and sales history for any UK home. Listings also show floor plans, video tours, EPC, EV chargers, schools and stations [S] ([app listing](https://apps.apple.com/gb/app/zoopla-property-search-uk/id380932800); [help](https://help.zoopla.co.uk/hc/en-gb/articles/360018069878)).

**Media and engagement (company-stated, self-selected)**
- Zillow 3D Home tours: 81% more views and 53% more saves (2022) [S] ([Zillow](https://zillow.mediaroom.com/2022-05-12-Zillow-3D-Home-tours-now-are-automatically-shared-to-Redfin)). Interactive floor plans: 60% more views and 79% more saves [S] ([Zillow 3D](https://www.zillow.com/marketing/3d-home/)).
- Zillow Showcase (paid): 79% more views, 76% more saves and 91% more shares vs similar listings (2025). Earlier releases: 20% more likely to get an accepted offer within 14 days and ~2% higher price [S; the matching method is not published, and sellers who pay differ] ([2025](https://zillow.mediaroom.com/2025-09-30-More-than-50-brokerages-adopt-Zillow-Showcase-as-go-to-tool-for-listing-marketing-innovation); [2024](https://zillow.mediaroom.com/2024-04-16-Showcase-listings-on-Zillow-are-more-than-just-cutting-edge-featured-homes-sell-faster-and-for-more-money)).
- Zillow listing pages show time on Zillow plus views and saves over the last 30 days [H]. Zillow Research: ≥5 saves/day typically means an offer within a week; 10+/day sells above list; the median listing went pending after 15 days at 98% of list [S, excerpt] ([Zillow Research](https://www.zillow.com/research/save-shares-views/)).
- **Photos.**
  - More photos raised price at a decreasing rate; interior photos also related to time on market [PR] ([Benefield, Cain & Johnson, JREFE](https://scholarhub.vn/publication/:slug/c4ed6d5b-7066-4ca8-856d-907cf0f376f2)).
  - Airbnb-verified professional photos raised occupancy 8.98% [PR] ([Zhang et al. 2022, Management Science](https://pubsonline.informs.org/doi/fpi/10.1287/mnsc.2021.4175)).
  - Gumtree South Africa made images mandatory, expecting "up to 10% more replies" based on tests elsewhere [S via press] ([ITWeb](https://itweb.co.za/article/gumtree-sports-new-look/eDZQ58vV62jvzXy2)).
  - The "7× more visits with a photo" figure attributed to Leboncoin is **unverified**.
- **Energy labels.** EPBD 2010/31/EU Art. 12(4) requires the certificate's energy indicator in sale/rent adverts in commercial media, online included in national transpositions [S, law] ([legislation.gov.uk](https://legislation.gov.uk/eudr/2010/31/article/12/2020-01-31/data.html); [Scotland SSI](https://www.legislation.gov.uk/ssi/2008/309/body/data.html)). Whether the 2024 recast renumbered it is **unverified**.

**Seller info and trust**
- Facebook Marketplace (Mar 2026) puts a seller summary at the top of the seller page: time on Facebook, friends, listing history, item types and ratings [H] ([TechCrunch](https://techcrunch.com/2026/03/12/facebook-marketplace-now-lets-meta-ai-respond-to-buyers-messages)).
- Kleinanzeigen profiles show a response rate and response time, both computed on first inquiries over the last 30 days [H] ([giga](https://www.giga.de/artikel/antwortrate-bei-ebay-kleinanzeigen-was-ist-das/)).
- Indeed's "Responsive employer" badge depends on how many applications the employer updates (≈50%+ over 30 days; vendors give different thresholds) [H] ([Workable](https://help.workable.com/hc/en-us/articles/16965390312215-What-is-a-Responsive-Employer-Badge-on-Indeed)).
- AutoScout24 cards link to "more vehicles from this dealer" [O]. Rightmove links to "More properties from this agent" [O].

## 5. Contact

- **Phone on the card (Rightmove)**, with "Local call rate" next to it [O]. Many general classifieds put the number behind a "show number" tap instead. No public study compares revealed vs masked numbers on lead volume or quality (**unknown**).
- **Structured enquiry.** Rightmove's listing ends in "Call agent" + "Request details" [O]. Zoopla saved homes show which homes you have already enquired about [S] ([app listing](https://apps.apple.com/gb/app/zoopla-property-search-uk/id380932800)).
- **Prefilled first message.** Facebook Marketplace pre-fills "Hi, is this available?" [H] ([The Drive](https://thedrive.com/news/heres-how-facebook-marketplace-should-make-car-buying-suck-less)). Since Mar 2026, sellers can let Meta AI draft replies from the listing's description, availability, pickup location and price [H] ([TechCrunch](https://techcrunch.com/2026/03/12/facebook-marketplace-now-lets-meta-ai-respond-to-buyers-messages)).
- **Transaction-grade contact (Auto Trader Deal Builder).**
  - The buyer adds a part-exchange, gets finance quotes, picks a handover option, then reserves for £99 or requests to reserve [S] ([help](https://help.autotrader.co.uk/hc/en-gb/articles/12808692951837-How-do-I-build-a-deal)).
  - Beta: 1,000+ retailers and 40k+ reservable cars. Retailers reported twice as many enquiries converting to sales, 45% generated outside trading hours, and >80% of reserved cars converted [S via trade press] ([AM](https://www.am-online.com/news/auto-trader-expands-deal-builder-to-all-car-and-van-dealers); [Bodyshop](https://www.bodyshopmag.com/2024/news/auto-trader-unveils-deal-builder/)).
  - Deals were about 3× FY24's c.16,000 [S] ([FY25 results](https://plc.autotrader.co.uk/media/umddcnxx/full-year-press-release-fy25.pdf)).
  - Mandatory rollout drew a dealer backlash: in one poll, 96% of 243 dealers said email leads had dropped. Auto Trader moved to opt-in choices and "reservation requests" [H] ([AM](https://www.am-online.com/news/autotrader-explains-deal-builder-rollout-pause)).
- **Finance as a contact accelerator.** Rightmove pitches its Mortgage in Principle as getting "viewings faster with agents" and says the check has no impact on credit score [O]. Zillow BuyAbility is covered in section 7.
- **Buyer protection inside chat.** Kleinanzeigen "Sicher bezahlen" (buyer pays a % fee; for shipped private sales), with scam warnings never to leave the platform [H] ([giga](https://www.giga.de/artikel/ebay-kleinanzeigen-sicher-bezahlen-als-kaeuferschutz-so-funktioniert-es/)).
- **Response expectations.** Kleinanzeigen shows response rate and time [H]. LinkedIn's "Actively recruiting" tag has a disputed meaning [H] ([ScoutLogic](https://www.scoutlogicscreening.com/blog/what-does-actively-recruiting-mean-linkedin)). No leader publishes an SLA to buyers (**unknown**).

## 6. Saved items, saved searches and alerts

| Product | Save item | Save search / alert | Triggers & channels |
|---|---|---|---|
| Rightmove | yes; private notes on listing [O] | "Save Search", "Create Alert" [O] | Instantly / Daily / Every 3 days / Every 7 days; email shows total new + reduced and up to 14 random homes [S] ([help](https://faq.rightmove.co.uk/support/solutions/articles/7000048758-how-to-register-for-property-alerts); [how alerts work](https://customerfaq.rightmove.co.uk/support/solutions/articles/7000098933-how-the-property-alerts-work)) |
| Zoopla | yes, shows "still available" + "enquired" [S] | yes [S] | new listing, **reduced**, **back on market**, for saved homes *and* searches [S] ([app](https://apps.apple.com/gb/app/zoopla-property-search-uk/id380932800)) |
| Idealista | favourites + **collaborative lists** with notes [S] | named saved search with alerts | immediate push on new listing or price drop [S] ([App Store](https://apps.apple.com/es/app/idealista/id465958311)) |
| Zillow | saved homes | save search (incl. NL queries) [S] | instant or daily; 2013 cap of 15 instant emails/24h, rest batched [H, dated] ([Inman 2013](https://www.inman.com/2013/08/26/alerts-let-agents-mine-zillow-for-potential-listings/)) |
| mobile.de | "Parkplatz" (synced when logged in, device-only otherwise) | saved searches, daily updates | push when a parked car's price changes [S] ([mobile.de magazine](https://www.mobile.de/magazin/artikel/suchen-und-kaufen-41618)) |
| AutoScout24 | "Merken" [O] | Suchauftrag [S] ([page](https://www.autoscout24.de/promo-lp/suchauftrag/)) | push for price drops and changes to bookmarked cars [S, app store] |
| Vinted | favourites | **unverified** | favourite reduced, favourite sold, followed member listed new items; in-app can't be disabled; kept 7 days [S] ([help](https://www.vinted.co.uk/help/433)) |
| Kleinanzeigen / Leboncoin | yes | "Suche speichern" [O] / saved search alerts by email or push [H] | Leboncoin's "50 alerts/day" cap is **unverified** |
| LinkedIn | saved jobs | auto-saved search [S] | alerts "within minutes" (2019) [S] ([LinkedIn](https://news.linkedin.com/2019/January/linkedin-new-jobs-and-hiring-features-q4-update)) |
| Indeed / StepStone | saved jobs | job alerts, frequency editable and pausable [S] ([Indeed](https://www.indeed.com/help/job-seekers/articles/204488890-starting-stopping-and-managing-job-alerts)); Job Agent, "Express" = 1 job per notification, 1–8 per day or week [S] ([StepStone T&Cs](https://www.stepstone.at/e-recruiting/nutzungsbedingungen/)) | email / push |

- **Return visits, published data.**
  - Rightmove: 78M+ property alerts sent in March 2021 [S]. 16.8bn minutes in 2025, >80% share of portal time (Comscore; 89% in Dec 2025). Marketing CRM ~10M subscribers. App users +11% YoY [S] ([FY25 RNS](https://plc.rightmove.co.uk/content/uploads/2026/02/Rightmove-RNS-27.02.26.pdf); [FY24](https://www.investegate.co.uk/announcement/rns/rightmove--rmv/final-results/8756717)).
  - Auto Trader: >75% of minutes on UK automotive marketplaces, 81.6M visits and 557M minutes a month (FY25) [S] ([FY25](https://plc.autotrader.co.uk/media/umddcnxx/full-year-press-release-fy25.pdf)).
  - Nobody publishes the share of visits that start from an alert, or alert-user retention vs non-alert users (**unknown**).
- **Alert content design.** Rightmove's email states the *count* since the last alert and links to the full list, rather than dumping everything [S]. LinkedIn's "first 25 applicants ≈3×" claim is the stated rationale for instant job alerts [S].

## 7. Comparison, shortlists, price drops, finance

- **Compare.** AutoScout24 has a "Vergleichen" checkbox on each card [O]. Rightmove (experiment) lets users pick up to 5 properties from any results page into a table, then ask the AI to add criteria [S] ([help](https://faq.rightmove.co.uk/support/solutions/articles/7000100087-ai-search-and-ask-rightmove-)).
- **Shared shortlists.** Idealista's collaborative favourites let friends and family add notes, suggest and remove homes [S, app store]. Rightmove's notes are private [O].
- **Price-drop signals.**
  - Rightmove "Reduced on" on card and listing [O]. Kleinanzeigen strikes through the old price [O].
  - Price-drop push alerts: Zoopla, Idealista, Vinted, mobile.de, AutoScout24 [S].
  - In used cars, buyers react to price relative to an expectation anchored on the prior day's list price [PR] ([Huang & Liu, QME, via Purdue](https://business.purdue.edu/news/features/2023/used-car-pricing.php)).
  - Zillow research: sellers usually cut about a month after listing [S, excerpt].
- **Finance in the flow.**
  - AutoScout24 shows monthly finance on the card and can sort by finance rate [O].
  - Rightmove's listing calculator defaults to 10% deposit, market rate and 30 years [O].
  - Zillow BuyAbility (May 2024): the buyer enters income, credit range, debts, down payment and a comfortable monthly payment, and homes within budget get tagged while browsing. It updates with rates [S] ([Zillow](https://www.zillowgroup.com/news/our-new-tool-addresses-home-buyers-biggest-concern-affordability); [Inman](https://www.inman.com/2024/11/19/with-focus-on-mortgage-business-zillow-launches-buyability-tool/)).
  - Zoopla's affordability calculator sets a budget and then shows matching homes [S].

## 8. Mobile app vs web

- Rightmove's CEO said its Comscore share of time is higher on the app [S, excerpt of results Q&A] ([FY24 coverage](https://propertyindustryeye.com/?p=147762)). It also claims the most app downloads among UK property apps, Jul 2025–Jan 2026 [S] ([claims page](https://rightmove.co.uk/c/claims)).
- LinkedIn (2019): over half of job seekers are on mobile, so search and browsing were merged into one scrolling view and searches auto-save [S].
- App-only or app-first features: Zillow NL search launched on iOS first [S]. Idealista says multi-zone search works best in the app [S]. mobile.de price push and Leboncoin visual search (Dec 2024) are app features [S, H] ([Siècle Digital](https://siecledigital.fr/2024/12/16/leboncoin-annonce-de-nombreuses-nouveautes-et-ambitionne-de-devenir-le-leader-du-e-commerce/)).
- Web gate observed: Kleinanzeigen shows a pay-or-consent wall (ad-free "Kleinanzeigen Pur" at €1.99/month, or accept tracking) before results [O].
- Native-app UI was **not observed** in this pass.

## 9. AI search ("describe the home you want")

- **Zillow.**
  - Natural-language search, Jan 2023 (e.g. "$700K homes in Charlotte with a backyard"). NL queries can be saved as alerts [S] ([Zillow](https://zillow.mediaroom.com/2023-01-26-Zillows-new-AI-powered-natural-language-search-is-a-first-in-real-estate)).
  - Zillow app in ChatGPT, 6 Oct 2025: same ordering as zillow.com, with hand-off to Zillow to tour, contact or finance [H] ([HousingWire](https://www.housingwire.com/articles/zillow-chatgpt-launch-app-integration/)).
  - The 2023 ChatGPT plugin was pulled over fair-housing concerns [H].
- **Rightmove.** AI keywords (2025). A conversational beta with Gemini (Feb 2026) behind a **Classic / AI toggle**, results in a carousel, a "sources" button (agent listings, Google, Land Registry) and compare-up-to-5. "Ask Rightmove" now runs on listings, and a ChatGPT app has launched [S] ([help](https://faq.rightmove.co.uk/support/solutions/articles/7000100087-ai-search-and-ask-rightmove-); [Estate Agent Today](https://www.estateagenttoday.co.uk/breaking-news/2026/02/rightmove-launches-latest-phase-of-ai-powered-property-search/)). The listing we fetched showed four AI question chips [O].
- **LinkedIn.** AI job search, May–June 2025: plain-language goals instead of keywords. The pipeline was cut from nine stages, with an LLM split into retrieval and ranking [H] ([VentureBeat](https://venturebeat.com/ai/inside-linkedins-ai-overhaul-job-search-powered-by-llm-distillation)).
- **ChatGPT apps.**
  - Idealista: app in ChatGPT, with results on a map [S] ([idealista.pt](https://www.idealista.pt/news/node/74218)).
  - Leboncoin: app in ChatGPT, 89M listings, Feb 2026; messages and transactions stay on Leboncoin [H] ([Siècle Digital](https://siecledigital.fr/2026/02/09/leboncoin-arrive-dans-chatgpt/)).
  - Kleinanzeigen: ChatGPT, 58M listings, Feb 2026, plus an AI assistant inside property listings [H] ([onlinemarktplatz](https://onlinemarktplatz.de/268756/kleinanzeigen-ki/)).
  - StepStone: ChatGPT plugin, June 2023 [S] ([StepStone](https://www.stepstone.de/e-recruiting/hr-wissen/recruiting/chatgpt-plugin/)).
- **Fotocasa (Oct 2025)** turns intent into the app's own filters [H] ([Moncloa](https://www.moncloa.com/2025/10/30/fotocasa-lanza-un-buscador-de-vivienda-asistido-por-ia-unico-en-el-sector-inmobiliario-espanol-3274537/)). This is the safest pattern: AI writes filters the user can see and edit.

## 10. Published metrics at a glance

| Metric | Value | Tag |
|---|---|---|
| Rightmove share of UK portal time / minutes | >80% (Comscore; 89% Dec 2025) / 16.8bn min 2025 | [S] |
| Rightmove alerts sent | 78M+ in March 2021 | [S] |
| Rightmove draw-a-search relaunch | +37% users drawing areas; ~250k areas (2021) | [S] |
| Auto Trader share of minutes / traffic | >75% / 81.6M visits, 557M min per month (FY25) | [S] |
| Auto Trader Deal Builder | 2× enquiry-to-sale (beta), 45% out of hours, >80% reservations convert | [S] |
| AutoScout24 price label basis | 14 months, >10M records, >70 features, daily | [S] |
| Zestimate median error | ~1.8% on-market, ~7% off-market (changes over time) | [S, excerpt] |
| Zillow 3D tour / floor plan / Showcase | +81% views +53% saves / +60% views +79% saves / +79% views +76% saves | [S] (self-selected) |
| OLX personalisation | >230% listing views, +450% replies, +118% deliveries | [S] (no baseline) |
| LinkedIn early applicants | first 25 applicants up to 3× more likely to be hired | [S] |
| LinkedIn applicant count shown | +3.5% application completion; larger for women | [PR] ([Gee 2019](https://docs.iza.org/dp10372.pdf)) |
| Salary on US Indeed postings | 57.8% (Sep 2024), up from 18.4% (Feb 2020) | [S] ([Hiring Lab](https://hiringlab.indeed.com/2024/10/23/salary-transparency-growth-slows-but-momentum-continues/)) |
| StepStone salary estimate | ranges shown since Mar 2021, logged-in only; "+20% applications" figure's author unclear | [S] / [H] ([StepStone](https://stepstone.de/e-recruiting/hr-wissen/gehalt/stellenangebote-mit-gehaltsangabe)) |
| Price-label effect on conversion | **unknown** (no published A/B or study found) | — |
| Photo count vs contacts in classifieds | **unverified** company claims only; real-estate price evidence [PR] | — |

## 11. Research on ranking and consumer search

- **eBay search redesign** [PR]: a search model explains most of the redesign's effects. Narrowing choice sets can be pro-competitive, but differentiated goods are harder to rank on price alone ([Dinerstein, Einav, Levin & Sundaresan 2018, AER](https://www.aeaweb.org/doi/10.1257/aer.20171218)).
- **Rankings shift search, not choice** [PR] ([Ursu 2018](https://pubsonline.informs.org/doi/fpi/10.1287/mksc.2017.1072)).
- **Map ranking is a selection problem, not an ordering problem** [PR] ([Haldar et al. KDD 2024](https://arxiv.org/abs/2407.00091)).
- **Stale inventory and rejections destroy matches** [H, WP] ([Fradkin 2017](https://ide.mit.edu/wp-content/uploads/2017/07/SearchMatchingEfficiency.pdf)).
- **Recommendations raise fill rates where pools are thin** (+20% fills, no crowd-out) [PR] ([Horton 2017, JOLE](https://john-joseph-horton.com/papers/the-effects-of-algorithmic-labor-market-recommendations-evidence-from-a-field-experiment/)).
- **Broadening suggestions raise interviews for narrow searchers** [PR] ([Belot et al. 2019](https://docs.iza.org/dp10068.pdf)).
- **Showing competition (applicant counts) increases applications** [PR] ([Gee 2019, Management Science](https://docs.iza.org/dp10372.pdf)).
- **Algorithmic valuations feed back into prices** [H, WP] ([NBER w29880](https://www.nber.org/papers/w29880)) and **are less accurate in poorer areas** [PR].

---

## Per-product mini-teardowns

**Rightmove (UK property).**
- Search: location + radius ladder + price/beds in the bar; a filter sheet with a live count; Sold STC hidden by default; draw-a-search; keyword "prioritise" [O, S].
- Card: photo index, paid label, price qualifier, beds/baths, Added/Reduced date, agent phone [O].
- Listing: the most complete "material information" page seen, plus My Places travel times, affordability + MIP, sale history, AI chips and private notes [O].
- Alerts at four frequencies; count-first emails [S]. Weakness: alert emails pick 14 homes at random, not by relevance [S].

**Zoopla (UK property).** Draw, location or current-location entry; travel-time search; smart filters (EV charger, shared ownership) [S]. Estimates and history for *any* address, not just listings [S].
Alerts on new, reduced and back-on-market for saved homes and searches; saved homes show availability and "enquired" state [S]. Alert frequency options: **unverified**.

**Idealista (ES/PT/IT property).** Finger-draw and multi-zone map search (2026) [S]. Saved searches with instant push for new listings *and* price drops [S]. Collaborative favourite lists with notes [S]. ChatGPT app with map
results [S]. Listing anatomy **not observed** this pass.

**Zillow (US property).**
- Zestimate on every home, with a published error rate [S].
- NL search since 2023; ChatGPT app since 2025 [S, H].
- Listing shows days on Zillow, views and saves [H]. 3D tours, interactive floor plans and paid Showcase with company-stated engagement lifts [S].
- BuyAbility tags homes the user can afford [S].
- Lesson: valuations are powerful and contested (feedback loops, accuracy gaps) [H, PR].

**AutoScout24 (EU motors).**
- Make/model-first rail. The card carries a price label, monthly finance, compare, save, "Neu" and "Sehr beliebt" badges [O].
- Default sort "best results"; sorting by monthly rate; numbered pages [O].
- The price-label method is published and labels are not for sale [S].
- Push alerts for price drops on bookmarks [S].

**mobile.de (DE motors).** A price label similar to AutoScout24's, contested by dealers [H]. "Parkplatz" saves vehicles and searches, syncs when logged in, and pushes price changes [S]. Daily saved-search updates [S].

**Auto Trader UK (motors).**
- Five price flags with the £ gap to valuation [S, excerpt].
- Deal Builder moves contact into a structured deal: part-ex, finance, reserve [S]. Strong company-stated conversion, plus a dealer revolt showing that buyer-side wins need seller buy-in [S, H].
- Leading share of minutes [S].

**Leboncoin (FR general).** Saved-search alerts by email/push [H]. Visual (image) search, autocomplete and personalisation (Dec 2024) [H]. ChatGPT app, Feb 2026 [H]. Buyer UI was **not observed** (no session was attempted); help pages could not be retrieved.

**OLX (general, Prosus).** Moved from a freshness-ordered, one-size homepage to ML personalisation (Search2Vec, collaborative filtering, learning-to-rank), with large company-stated lifts [S]. A study of OLX Jobs recommendations
compared ALS, LightFM, Prod2Vec, RP3beta and SLIM, with online A/B tests via messages [H] ([emergentmind](https://www.emergentmind.com/papers/2301.07946)).

**Kleinanzeigen (DE general).** Facet counts everywhere; default sort newest; time stamps; "VB" negotiable flag; struck-through old price; shipping flag; PRO badge [O]. Response rate/time on profiles [H]. Pay-or-consent wall on web
[O]. ChatGPT app and in-listing property AI [H].

**Craigslist (US general).** Minimal but complete: cross-section counts; title-only, has-image, posted-today and hide-duplicates toggles; price histogram with average; list/thumb/gallery/map views; relative-age stamps [O].
No price guidance or seller identity [O].

**Facebook Marketplace.** Prefilled "Is this still available?" [H]. Meta AI auto-replies and an AI listing builder; a seller summary (tenure, friends, ratings); shipping with prepaid labels (Mar 2026) [H]. Listing comments and AI-suggested follow-up messages [H] ([AOL](https://www.aol.com/articles/facebook-marketplace-getting-updates-mdash-170001495.html)); a "collaborative buying"
test (Nov 2025) [H] ([etcentric](https://www.etcentric.org/?p=197395)).

**Vinted (fashion C2C).** Favourite heart → notifications when the price drops or the item sells, plus "followed members listed new items" [S]. In-app notifications cannot be switched off; push is configurable [S]. Saved-search
alerts are **unverified** from official sources.

**Gumtree (UK/AU/ZA general).** Up to 10 photos on free ads and 20 on Featured (AU) [H] ([Finder](https://finder.com.au/how-to-sell-on-gumtree)). Video "could help get more replies" [S] ([Gumtree](https://www.gumtree.com/info/safety/p/selling/how-to-post-an-ad/)).
Little primary buyer-side documentation found.

**Indeed.** Search chips include "Easily apply" (Indeed Apply) and Pay [O, H]. Salary shown on a majority of US postings [S]. Job alerts are pausable with editable frequency [S]. The Responsive-employer badge is a responsiveness signal [H].

**StepStone (DE jobs).** Estimated salary ranges on postings since 2021, visible when logged in [S]. Job Agent and "Express" (one job per notification, 1–8 per day or week) [S]. Conversational recruiting via Mya (2021) [H];
ChatGPT plugin (2023) [S].

**LinkedIn Jobs.** Instant alerts within minutes; the "first 25 applicants ≈3×" claim; auto-saved searches; salary insights for all (2019) [S]. AI job search (2025) [H]. Showing applicant counts raised applications [PR]. "Top applicant" is a Premium matching
signal, with a +10% recruiter-response claim [S] ([LinkedIn Premium](https://premium.linkedin.com/careers/top-applicant)).

---

## Patterns the winners share

1. **One primary dimension per vertical, entered first.** Location for property, make/model for motors, query for goods, what+where for jobs. Everything else goes into a sheet with a live count [O].
2. **Counts before commitment.** Facet counts, category counts and live totals tell the buyer whether a filter will empty the page [O].
3. **Map as an equal mode, with drawing and commute.** Rightmove, Zoopla, Idealista [S]. Airbnb's research says maps are about selection, not order [PR].
4. **Freshness and price movement on the card.** "Added/Reduced on", time stamps, "Neu", struck-through old price [O]. Sold or unavailable stock hidden by default [O], backed by stale-listing evidence [H, WP].
5. **Price context, neutral and not for sale.** Price labels with published methods (AutoScout24), valuations with published error (Zillow), sale history (Rightmove, Zoopla) [S, O].
6. **Material facts as a checklist, with "Ask agent" where blank.** The missing field stays visible as a gap rather than being hidden [O].
7. **Saved search = alert, with a frequency choice and count-first emails** [S].
8. **Alerts on item state changes** (reduced, sold, back on market) for saved items, not only new matches [S].
9. **Money in the flow.** Monthly payment on the card or listing, affordability tagging, finance sort [O, S].
10. **AI is optional and auditable.** A Classic/AI toggle, a sources button, a compare table, and hand-off to the platform for contact [S].

## Anti-patterns

- **Random selection in alert digests** (Rightmove picks 14 at random [S]). Relevance-ranked or "best new match first" is the obvious alternative. Its effect is **unverified**.
- **Paid labels that look like content labels.** "FEATURED PROPERTY – COMMUNAL TERRACE" fuses ad status and feature [O]. EU regulators want prominent, clear disclosure [S].
- **Sorting a city by highest price first** with no relevance option (Rightmove London in our session) [O]. A newcomer sees £40M+ homes. AutoScout24 defaults to "best results" [O].
- **Price labels without context.** A "High price" with no £ gap or method makes dealers angry and leaves buyers no wiser [H]. AutoScout24 and Auto Trader show method or gap [S].
- **Prefilled openers that carry no information.** "Is this still available?" creates repetitive seller work, which Meta now patches with AI auto-replies [H].
- **Infinite scroll for search results**, especially on mobile [H].
- **Unlabelled ranking parameters.** EU law requires the main parameters to be explained [S].
- **Consent or pay walls before the first result** (Kleinanzeigen web) [O]. These are legal under current German practice, but they add a step before value. Their effect on bounce is **unknown**.
- **Mandating transaction flows on sellers** (Auto Trader Deal Builder backlash) [H].
- **Valuation without accuracy disclosure.** Zestimate publishes its error and is still criticised. An unpublished estimate is worse [S, PR].

---

## Implications for the ux-audit skill: a buyer-side recipe for classifieds

Use per vertical. "Audit" is what to check by driving the product (desktop and mobile web, plus the app if one exists). "Default redesign" is the starting spec to propose unless the owner's data says otherwise.

1. **Entry & category**
   - Audit: can a first-time buyer get to relevant results in ≤2 inputs? Does a free-text query return cross-category counts? Is the vertical's primary dimension (location / make-model / what+where) first?
   - Default redesign: one search bar with the vertical's primary dimension; category suggestions with counts as you type; zero-result queries fall back to the nearest category with counts. Evidence: [O] Kleinanzeigen, Craigslist, Rightmove; [S] OLX on zero-result searches.
2. **Filters**
   - Audit: do facets show counts? Does the filter sheet show a live total before "Apply"? Do filters stay sticky across sessions and survive back-navigation? Is sold or reserved stock hidden by default?
   - Default redesign: bottom-sheet filters on mobile with a "Show N results" button; counts on every value; a price histogram; "Include sold/under offer" off by default; chips for applied filters. Evidence: [O] Rightmove, Kleinanzeigen, Craigslist; [H, WP] Fradkin.
3. **Location**
   - Audit: is there radius, "near me", map view and draw-an-area? For real estate, is there commute time?
   - Default redesign: radius ladder + "use my location"; map/list toggle kept in the URL; draw-to-search on map; property "My places" travel time on cards and listing. Evidence: [S] Rightmove, Zoopla, Idealista; [PR] Airbnb maps.
4. **Map**
   - Audit: how many pins render at city zoom? Do clusters or pins carry price?
   - Default redesign: price pins, capped and tiered (full pin vs mini-pin) instead of showing all. Evidence: [PR] Haldar et al.
5. **Result card**
   - Audit: does every card show photo count, price + qualifier, 3–5 vertical key specs, freshness or price change, save, and a clear paid label?
   - Default redesign, per vertical:
     - Property: price, beds/baths/m², area, "Added/Reduced on".
     - Cars: price, price label, year/km/fuel/power, monthly payment.
     - Goods: price + negotiable flag, condition, time, shipping.
     - Jobs: salary, employer, distance, posted date, "easy apply".
     - Paid label as a separate badge ("Ad" / "Promoted"), never fused with feature text.
   - Evidence: [O] Rightmove, AutoScout24, Kleinanzeigen; [S, law] Omnibus; [S, regulator] KFST.
6. **Sort & paging**
   - Audit: what is the default sort? Is it disclosed how ranking works? Infinite scroll or pages?
   - Default redesign: default "Recommended/Best match" with a one-line "How we rank" link (main parameters, paid boosts); "Newest" one tap away; "Load more" + lazy load with position restored on back. Evidence: [O] AutoScout24; [S, law]; [H] Baymard.
7. **Listing page**
   - Audit: above the fold, is there gallery count, price + qualifier, key-facts strip and primary CTA? Is there a material-facts checklist (property: energy class, area, title deed status, fees; cars: mileage, owners, service history, MOT/inspection)? Are missing values shown as "Ask seller"? Is there a map, similar listings, seller tenure/response stats and price history?
   - Default redesign: sticky contact bar; key-facts strip; checklist with "Ask seller" chips that prefill a question; price history ("Reduced on / was €X"); energy indicator on property ads (legal in EU). Evidence: [O] Rightmove; [S, law] EPBD Art 12(4); [H] Kleinanzeigen response stats.
8. **Price context**
   - Audit (cars, property): is there any market-relative price signal? Is its method stated? Can it be bought?
   - Default redesign: a 5-step label with the € gap to the estimate, a "How we calculate" sheet (comparables window, factors, update frequency), "no rating" when data are thin, and a statement that labels can't be bought. Evidence: [S] AutoScout24, Auto Trader. Conversion effect: **unknown**. Ship as an A/B test with dealer comms.
9. **Contact**
   - Audit: taps from listing to a sent message? Is the first message prefilled with something useful? Is phone reveal tracked? Are response expectations shown? Is there a scam warning in chat?
   - Default redesign: chat as primary, call as secondary; quick-question chips derived from missing fields ("Is the price negotiable?", "Can I view on Saturday?"); seller response time shown; viewing/test-drive slot request for verticals. Evidence: [O] Rightmove Call/Request details; [H] FB prefill, Kleinanzeigen stats; [S] Deal Builder.
10. **Save, shortlist, compare**
    - Audit: can a guest save? Does it sync after login? Is there compare? Are there notes or shared lists?
    - Default redesign: heart on card and listing with guest save and merge-on-login; compare tray (up to 4–5); private notes; shareable list. Evidence: [O] AutoScout24, Rightmove; [S] mobile.de, Idealista, Rightmove compare.
11. **Saved search & alerts**
    - Audit: is "Save search" offered on the results page? Can the user choose frequency (instant/daily/weekly)? Channel (push/email)? Do saved items alert on price drop, sold or back-on-market?
    - Default redesign: after the second search or first filter change, prompt "Get new matches" with instant/daily/weekly and push/email; count-first digests ("7 new, 2 reduced since yesterday") ranked by relevance; item-state alerts on favourites; "New since your last visit" divider in results. Evidence: [S] Rightmove, Zoopla, Idealista, Vinted, mobile.de, LinkedIn. Effect on return rate: **unknown**, so measure it.
12. **Finance & affordability**
    - Audit (property, cars): is there a monthly figure on card or listing, and an affordability filter?
    - Default redesign: monthly payment on the listing with editable deposit/rate/term; optional "my budget" that tags affordable results. Evidence: [O] Rightmove, AutoScout24; [S] Zillow BuyAbility, Zoopla.
13. **AI search**
    - Audit: is there natural-language search? Does it show what it understood?
    - Default redesign: an NL box that converts to visible, editable filter chips (Fotocasa pattern), saveable as an alert; a Classic/AI toggle; a sources disclosure for any generated answer. Evidence: [S] Zillow, Rightmove; [H] Fotocasa. Conversion lift: **unknown**.
14. **Mobile vs web parity**
    - Audit: do map, draw, alerts and save work on mobile web, not only in the app? Is anything gated before the first result?
    - Default redesign: parity for search, save and alerts; push only in the app, with email fallback on web. Evidence: [S] Rightmove app share, LinkedIn mobile >50%; [O] Kleinanzeigen gate.
15. **Metrics to request from the owner** (no public benchmarks, so all **unknown**): search → listing view rate, zero-result rate, filter use, map share, save rate, saved-search creation rate, alert open → visit rate, listing → contact rate, phone reveal vs chat split, seller first-response time, share of stale (sold but live) listings, and return visits by alert vs non-alert users.

**Bazaraki-specific legal checks (Cyprus = EU):** paid ranking disclosed (Omnibus) [S, law]; main ranking parameters explained [S, law]; energy indicator in property adverts (EPBD) [S, law]. Cypriot transposition details: **unverified**.

---

## Sources

Company, help and investor pages
- Rightmove: [FY25 RNS](https://plc.rightmove.co.uk/content/uploads/2026/02/Rightmove-RNS-27.02.26.pdf) · [FY24 results](https://www.investegate.co.uk/announcement/rns/rightmove--rmv/final-results/8756717) · [FY24 coverage (PIE)](https://propertyindustryeye.com/?p=147762) · [claims](https://rightmove.co.uk/c/claims) · [alerts help](https://faq.rightmove.co.uk/support/solutions/articles/7000048758-how-to-register-for-property-alerts) · [how alerts work](https://customerfaq.rightmove.co.uk/support/solutions/articles/7000098933-how-the-property-alerts-work) · [AI search help](https://faq.rightmove.co.uk/support/solutions/articles/7000100087-ai-search-and-ask-rightmove-) · [draw-a-search 2010](https://www.propertyreporter.co.uk/property/rightmove-launches-draw-a-search.html) · [draw-a-search 2021 (PIE)](https://propertyindustryeye.com/?p=97652) · [AI keywords (PIE)](https://propertyindustryeye.com/rightmove-upgrades-ai-tools-to-improve-property-search/) · [AI beta (EAT)](https://www.estateagenttoday.co.uk/breaking-news/2026/02/rightmove-launches-latest-phase-of-ai-powered-property-search/) · [TravelTime case](https://traveltime.com/case-study/rightmove-property-poi-search-traveltime)
- Zoopla: [App Store](https://apps.apple.com/gb/app/zoopla-property-search-uk/id380932800) · [help: estimates](https://help.zoopla.co.uk/hc/en-gb/articles/360018069878) · [help: account](https://help.zoopla.co.uk/hc/en-gb/articles/360005690898-How-do-I-create-a-Zoopla-account) · [journey tool (PIE)](https://propertyindustryeye.com/zoopla-adds-new-long-journey-tool-searches/)
- Idealista: [multi-zone](https://www.idealista.com/news/node/883902) · [App Store ES](https://apps.apple.com/es/app/idealista/id465958311) · [ChatGPT app](https://www.idealista.pt/news/node/74218)
- Zillow: [Zestimate](https://www.zillow.com/zestimate) · [NL search 2023](https://zillow.mediaroom.com/2023-01-26-Zillows-new-AI-powered-natural-language-search-is-a-first-in-real-estate) · [3D tours 2022](https://zillow.mediaroom.com/2022-05-12-Zillow-3D-Home-tours-now-are-automatically-shared-to-Redfin) · [3D/floor plans](https://www.zillow.com/marketing/3d-home/) · [Showcase 2024](https://zillow.mediaroom.com/2024-04-16-Showcase-listings-on-Zillow-are-more-than-just-cutting-edge-featured-homes-sell-faster-and-for-more-money) · [Showcase 2025](https://zillow.mediaroom.com/2025-09-30-More-than-50-brokerages-adopt-Zillow-Showcase-as-go-to-tool-for-listing-marketing-innovation) · [views/saves research](https://www.zillow.com/research/save-shares-views/) · [BuyAbility](https://www.zillowgroup.com/news/our-new-tool-addresses-home-buyers-biggest-concern-affordability)
- AutoScout24: [Preisbewertung](https://www.autoscout24.de/promo/preisbewertung/) · [Suchauftrag](https://www.autoscout24.de/promo-lp/suchauftrag/) · mobile.de: [Suchen und Kaufen](https://www.mobile.de/magazin/artikel/suchen-und-kaufen-41618)
- Auto Trader: [price indicator terms](https://www.autotrader.co.uk/partners/retailer/terms-and-conditions/price-indicator) · [FY25 results](https://plc.autotrader.co.uk/media/umddcnxx/full-year-press-release-fy25.pdf) · [H1 FY26](https://plc.autotrader.co.uk/media/ayhdcjt1/half-year-press-release-fy26.pdf) · [Deal Builder help](https://help.autotrader.co.uk/hc/en-gb/articles/12808692951837-How-do-I-build-a-deal) · [part-ex & finance help](https://help.autotrader.co.uk/hc/en-gb/articles/36904369612829-How-do-I-build-a-deal-with-finance-and-part-exchange)
- OLX/Prosus: [AI case study](https://www.prosus.com/~/media/Files/P/prosus-corp-v2/investors/ai-at-prosus-olx-case-study.pdf) · Vinted: [notifications](https://www.vinted.co.uk/help/433) · Gumtree: [post an ad](https://www.gumtree.com/info/safety/p/selling/how-to-post-an-ad/)
- Jobs: [LinkedIn 2019 update](https://news.linkedin.com/2019/January/linkedin-new-jobs-and-hiring-features-q4-update) · [LinkedIn Top applicant](https://premium.linkedin.com/careers/top-applicant) · [Indeed job alerts](https://www.indeed.com/help/job-seekers/articles/204488890-starting-stopping-and-managing-job-alerts) · [Hiring Lab 2024](https://hiringlab.indeed.com/2024/10/23/salary-transparency-growth-slows-but-momentum-continues/) · [StepStone salary](https://stepstone.de/e-recruiting/hr-wissen/gehalt/stellenangebote-mit-gehaltsangabe) · [StepStone T&Cs](https://www.stepstone.at/e-recruiting/nutzungsbedingungen/) · [StepStone ChatGPT](https://www.stepstone.de/e-recruiting/hr-wissen/recruiting/chatgpt-plugin/)
- Airbnb: [maps share](https://airbnb.tech/?p=653)

Law and regulators
- [EPBD 2010/31/EU Art. 12](https://legislation.gov.uk/eudr/2010/31/article/12/2020-01-31/data.html) · [Scotland SSI 2008/309](https://www.legislation.gov.uk/ssi/2008/309/body/data.html) · Omnibus summaries: [Addleshaw Goddard](https://www.addleshawgoddard.com/en/insights/insights-briefings/2020/competition/the-eu-omnibus-directive--time-to-prepare-for-strengthened-consumer-laws/) · [CMS](https://cms.law/en/deu/legal-updates/online-plattformen-muessen-ranking-parameter-offenlegen) · [KFST disclosure study](https://kfst.dk/media/2w0bvx2n/clear-and-intuitive-disclosures-58.pdf)

Research
- [PR] Dinerstein, Einav, Levin & Sundaresan (2018), Consumer price search and platform design, *AER* — [AEA](https://www.aeaweb.org/doi/10.1257/aer.20171218) · [NBER w20415](https://nber.org/papers/w20415)
- [PR] Ursu (2018), The power of rankings, *Marketing Science* — [INFORMS](https://pubsonline.informs.org/doi/fpi/10.1287/mksc.2017.1072)
- [PR] Haldar et al. (2024), Learning to rank for maps at Airbnb, *KDD* — [arXiv](https://arxiv.org/abs/2407.00091)
- [PR] Horton (2017), Algorithmic labor market recommendations, *JOLE* — [author page](https://john-joseph-horton.com/papers/the-effects-of-algorithmic-labor-market-recommendations-evidence-from-a-field-experiment/)
- [PR] Belot, Kircher & Muller (2019), Providing advice to jobseekers at low cost, *REStud* — [IZA DP10068](https://docs.iza.org/dp10068.pdf)
- [PR] Gee (2019), The more you know, *Management Science* — [IZA DP10372](https://docs.iza.org/dp10372.pdf)
- [PR] Benefield, Cain & Johnson, Photo depictions in an MLS, *JREFE* — [record](https://scholarhub.vn/publication/:slug/c4ed6d5b-7066-4ca8-856d-907cf0f376f2)
- [PR] Zhang, Lee, Singh & Srinivasan (2022), What makes a good image? Airbnb, *Management Science* — [INFORMS](https://pubsonline.informs.org/doi/fpi/10.1287/mnsc.2021.4175)
- [PR] Huang & Liu, Expectations-based reference-price effects in used cars, *QME* — [Purdue summary](https://business.purdue.edu/news/features/2023/used-car-pricing.php)
- [PR] Fu, Huang, Mehta, Singh & Srinivasan, Unequal impact of Zestimate, *Marketing Science* — [author page](https://sites.google.com/umich.edu/yan-huang/research)
- [H, WP] Fu, Jin & Liu (2022), Human–algorithm feedback loop, Zestimate — [NBER w29880](https://www.nber.org/papers/w29880)
- [H, WP] Fradkin (2017), Search, matching and marketplace design (Airbnb) — [PDF](https://ide.mit.edu/wp-content/uploads/2017/07/SearchMatchingEfficiency.pdf)
- [H] Baymard/Holst (2016), Pagination vs load more vs infinite scroll — [Smashing](https://smashingmagazine.com/2016/03/pagination-infinite-scrolling-load-more-buttons)

Trade press and third parties [H]
- Auto Trader: [AM 2017](https://am-online.com/news/supplier-news/2017/05/31/consumers-now-told-if-vehicles-are-fairly-priced-on-auto-trader) · [Motoring Research 2019](https://www.motoringresearch.com/car-news/auto-trader-website-update) · [AM Deal Builder expansion](https://www.am-online.com/news/auto-trader-expands-deal-builder-to-all-car-and-van-dealers) · [AM rollout pause](https://www.am-online.com/news/autotrader-explains-deal-builder-rollout-pause) · [Bodyshop](https://www.bodyshopmag.com/2024/news/auto-trader-unveils-deal-builder/)
- Motors other: [autohaus.de mobile.de/ZDK](https://www.autohaus.de/nachrichten/autohandel/dialog-zwischen-zdk-und-mobile-de-preisbewertung-wird-angepasst-2720800) · [cardog on CarGurus](https://cardog.app/blog/how-cargurus-works)
- Zillow: [The Close on Zestimate](https://theclose.com/how-accurate-is-zillow-zestimate/) · [HousingWire ChatGPT](https://www.housingwire.com/articles/zillow-chatgpt-launch-app-integration/) · [Inman BuyAbility](https://www.inman.com/2024/11/19/with-focus-on-mortgage-business-zillow-launches-buyability-tool/) · [Inman alerts 2013](https://www.inman.com/2013/08/26/alerts-let-agents-mine-zillow-for-potential-listings/)
- General: [TechCrunch FB Marketplace 2026](https://techcrunch.com/2026/03/12/facebook-marketplace-now-lets-meta-ai-respond-to-buyers-messages) · [The Drive FB](https://thedrive.com/news/heres-how-facebook-marketplace-should-make-car-buying-suck-less) · [AOL FB update](https://www.aol.com/articles/facebook-marketplace-getting-updates-mdash-170001495.html) · [Siècle Digital Leboncoin 2024](https://siecledigital.fr/2024/12/16/leboncoin-annonce-de-nombreuses-nouveautes-et-ambitionne-de-devenir-le-leader-du-e-commerce/) · [Siècle Digital Leboncoin ChatGPT](https://siecledigital.fr/2026/02/09/leboncoin-arrive-dans-chatgpt/) · [onlinemarktplatz Kleinanzeigen KI](https://onlinemarktplatz.de/268756/kleinanzeigen-ki/) · [giga response rate](https://www.giga.de/artikel/antwortrate-bei-ebay-kleinanzeigen-was-ist-das/) · [giga Sicher bezahlen](https://www.giga.de/artikel/ebay-kleinanzeigen-sicher-bezahlen-als-kaeuferschutz-so-funktioniert-es/) · [ITWeb Gumtree](https://itweb.co.za/article/gumtree-sports-new-look/eDZQ58vV62jvzXy2) · [Finder Gumtree](https://finder.com.au/how-to-sell-on-gumtree) · [Moncloa Fotocasa](https://www.moncloa.com/2025/10/30/fotocasa-lanza-un-buscador-de-vivienda-asistido-por-ia-unico-en-el-sector-inmobiliario-espanol-3274537/) · [OLX Jobs recsys](https://www.emergentmind.com/papers/2301.07946)
- Jobs: [VentureBeat LinkedIn AI search](https://venturebeat.com/ai/inside-linkedins-ai-overhaul-job-search-powered-by-llm-distillation) · [Workable on Indeed badge](https://help.workable.com/hc/en-us/articles/16965390312215-What-is-a-Responsive-Employer-Badge-on-Indeed) · [ScoutLogic on Actively recruiting](https://www.scoutlogicscreening.com/blog/what-does-actively-recruiting-mean-linkedin)
