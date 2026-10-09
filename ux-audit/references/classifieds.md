# Classifieds: auditing buyers, private sellers and businesses

For general and vertical classifieds (goods, cars, property, jobs, services): Leboncoin, OLX,
Kleinanzeigen, Gumtree, Craigslist, Facebook Marketplace, Vinted; Rightmove, Zoopla, Idealista,
Zillow; AutoScout24, mobile.de, Auto Trader UK; Indeed, StepStone, LinkedIn Jobs; local leaders
such as Bazaraki. Classifieds are two-sided **plus** a business tier (dealers, agents, developers,
employers), so run the Phase 0 two-sided rule with three sides. Evidence and sources:
`research/teardowns/classifieds-buyers.md`, `…-sellers.md`, `…-trust.md` (and
`service-marketplace-trust.md` for review, ranking and DSA basics). Tags as in `reward.md`.

## 1. What decides a classifieds site (facts the rules rest on)

1. **Search starts with the vertical's main dimension** (location for property, make/model for cars,
   free text for goods, what + where for jobs); everything else sits behind Filters with a **live result
   count** ("60,829 results · Done", Rightmove) [O].
2. **Map is a full mode.** Rightmove's draw-a-search rebuild: +37% drawing [S]; Airbnb: ~80% of search
   interactions on the map, and more pins **lower** bookings (KDD 2024) [S/PR]. Property adds commute
   time to the user's own places (Rightmove "My Places") [S/O].
3. **The result card is a decision summary:** photo count, price + qualifier, 3–5 key specs, freshness or
   price change, save, and a **separate paid label** [O]. Paid ranking must be disclosed (Omnibus Annex
   I 11a) [LAW]; weak labels barely change behaviour, a prominent one nearly tripled awareness [ENF].
4. **Price context is the motors signature:** AutoScout24's five labels from 10M+ records, recomputed
   daily, not buyable; Auto Trader rates every ad against its valuation [S]. No published conversion
   effect; dealers push back on non-green labels [H]. Ship as a test, with the method shown.
5. **Listing pages answer the next question:** key-facts strip, "Ask seller" where a field is blank,
   affordability ("Can you afford it?"), history, travel times [O Rightmove]. Property ads must show the
   **energy class**, portals included (EPBD; Cyprus fined agents €84k in 2021) [LAW/ENF].
6. **Alerts are the return engine, and the buyer picks the frequency** (instant / daily / 3 days / weekly;
   count-first emails "7 new, 2 reduced") [S Rightmove; 78M+ alerts in one month, 2021]. Leaders alert
   on price drops, sold and back-on-market for saved items [S]. Freshness pays: first 25 job applicants
   up to 3× more likely hired (LinkedIn) [S]; hiding unavailable Airbnb listings cut failed booking
   attempts > 60% [H, WP].
7. **Contact is becoming a structured next step:** quick questions, viewing/test-drive requests,
   finance, reservation (Auto Trader Deal Builder doubled enquiry-to-sale in beta, then dealer pushback
   made it optional) [S/H].
8. **AI search arrives as an option that becomes visible filters** (Fotocasa pattern; Zillow,
   Rightmove beta with a Classic/AI toggle) [S/H]; no published conversion lift.
9. **Posting from a photo with AI is standard** (eBay, Facebook Marketplace, leboncoin, OLX: −35–55%
   posting time, self-measured) [S]; forced photo-first flows and AI errors annoy sellers [H]. Price
   suggestions from comparables are common (Meta, leboncoin) [S/H]; Airbnb Smart Pricing +8.6% revenue
   for adopters but widened a racial revenue gap through unequal adoption [PR].
10. **Paid visibility shares one vocabulary** (bump, highlight, urgent, top/VIP slot, gallery, bundles);
    "X× more views" claims rarely state a method (ImmoScout24's footnoted "1.8× contacts" is the model)
    [S]; paid prominence partly just moves attention between sellers [PR]. A promotion can outlast its ad
    (leboncoin, no refund) [H].
11. **Regulators act on classifieds mechanics:** Poland's UOKiK made OLX change a cheapest-first sort that
    ignored a fee and an illusory paid protection, then fined it PLN 28.4m over a rating system that let
    people who only chatted rate sellers [ENF]. Hidden traders posing as private are blacklisted (UCPD
    Annex I 22; Irish convictions on DoneDeal) [LAW/ENF]. Dealer price cuts need the 30-day lowest price
    (PID 6a; goods incl. cars, not property/jobs) [LAW, M].
12. **Fraud is mostly purchase and deposit fraud that leaves the platform:** 71% of UK APP fraud cases are
    purchase scams [POP]; ~65,000 FTC rental-scam reports since 2020 [ENF]; Classiscam phishing kits
    impersonated 251 brands [S]; Cyprus police report fake courier links and car deposits [POP].
    Enhanced seller verification cut Facebook Marketplace scams 55% in Singapore (scammers moved to
    hijacked verified accounts) [ENF]. No trial of in-chat warnings exists; strong browser warnings are
    heeded 77–91% [PR].
13. **The transactional pivot works when the buyer pays the fee and protection is real** (Vinted: no
    seller fee, €76.7m profit 2024) [S/H]; OLX, Facebook and Auto Trader partly retreated [H].
14. **Business revenue is subscriptions + prominence tiers** (Rightmove £1,621 per advertiser/month,
    Auto Trader £2,854 per retailer/month, Scout24 €1,224) [S]; new pro features that change the
    customer's process go opt-in first (Deal Builder lesson) [S/H].

## 2. Buyers: audit → default redesign

| Moment | Audit | Default redesign |
|---|---|---|
| Entry and category | relevant results in ≤ 2 inputs? the vertical's main dimension first? zero-result fallback? | one search bar with the main dimension; category suggestions with counts as you type; zero results → nearest category with counts |
| Filters | counts on facets? live "Show N results"? sticky across sessions and back? sold/reserved hidden by default? | mobile bottom-sheet filters with "Show N results", counts on every value, price histogram, applied-filter chips |
| Location and map | radius, near me, map, draw-an-area; commute time for property; pin count at city zoom | radius ladder + "use my location"; map/list toggle kept in the URL; draw-to-search; price pins capped and tiered; "My places" travel times |
| Result card | photo count, price + qualifier, 3–5 key specs, freshness/price change, save, a separate paid label | per vertical (property: price, beds, m², area, "Added/Reduced on"; cars: price, label, year/km/fuel, monthly; goods: price, condition, shipping; jobs: salary, employer, distance, posted) + "Ad/Promoted" chip |
| Sort and paging | default sort; "how we rank" link; position kept on back | "Recommended" with a one-line ranking explainer (incl. paid boosts); "Newest" one tap away; load-more with position restored |
| Listing page | gallery count, price, key facts and CTA above the fold; missing fields; history; seller stats | sticky contact bar; key-facts strip; "Ask seller" chips that prefill a question; price history; energy class (property); similar listings |
| Price context | any market-relative signal, its method, buyable? | 5-step label with the € gap, "How we calculate", "no rating" when data is thin, never buyable; ship as an A/B with dealer comms |
| Contact | taps to a sent message; useful prefill; response expectations; scam note | chat primary, call secondary; question chips from missing fields; seller response time; viewing/test-drive request; "never pay before viewing" at the contact step |
| Save, shortlist, compare | guest save + merge on login; compare; notes; share | heart on card and listing (optimistic fill); compare tray of 4–5; private notes; shareable list |
| Saved search and alerts | "Save search" on results; frequency and channel choice; item alerts | prompt "Get new matches" after the 2nd search or 1st filter change; instant/daily/weekly × push/email; count-first digests; price-drop / sold / back-on-market alerts; "New since your last visit" divider |
| Finance | monthly figure; budget filter | editable monthly payment; optional "my budget" tag |
| AI search | NL search? shows what it understood? | NL → visible, editable filter chips, saveable as an alert; Classic/AI toggle; sources for generated answers |
| Mobile parity | map, draw, alerts, save on mobile web; nothing gated before results | parity; push in the app, email fallback on web |

## 3. Private sellers and businesses: the pass to run (needs owner-provided sessions)

- **A. Posting.** Time and taps from "Post ad" to live on mobile; required fields; photo upload
  (multi-select, reorder); fee shown before the last step. Default: photo-first with an AI draft where
  **every field stays editable** and "enter manually" is always visible; only required fields up front;
  auto-saved drafts; a price **range** from comparables with n ("similar near you: €X–€Y, 23 ads"),
  never pre-filled without consent; a photo checklist (impact claimed only if measured).
- **B. Paid visibility (VIP/TOP, bumps).** One screen before payment with Free / Top / VIP columns:
  where it appears, for how long, ends on, € price, what buyers see (the label). Effect claims footnoted
  with category, period and method, or dropped; better, the seller's own before/after views and
  contacts. A promotion never outlasts the ad (cap it or extend the ad free). One free renewal on
  expiry; re-rank after a real price drop.
- **C. Wallet and renewals.** Balance in € at every spend point; no expiry on paid money (promo credit
  expiry shown beside the balance); refund path; receipts. Auto-renewal off by default, a reminder before
  each renewal, cancel in 2 taps (EU withdrawal button from 19 Jun 2026; UK DMCC subscriptions 2027).
- **D. Management and retention.** Per-ad card: status, paid-until, views, saves, contacts, days left,
  and one honest next action ("views fine, few messages → check price vs similar"), not only "Boost".
  Sold → optional price → "Sell another like this?"; Reserved hides contact and keeps the ad. Seller
  notifications state facts; any "your ad dropped" or rank claim must be true and the boost never the
  only option. Reviews only after a confirmed deal; the rating and reply-rate formulas published.
- **E. Business tools.** XML/API feed health page (last sync, items OK/rejected, a fix link per error);
  a lead inbox (source, ad, response time, status, quick replies); tier tables with price, term,
  renewal, and a "your last 30 days" view (contacts per € on paid vs unpaid stock). New pro features:
  opt-in → advisory group → default.
- **F. Transactions** (if the site adds pay + ship): buyer-paid protection with plain coverage and
  exclusions; fees included in "lowest price" sorts; "You never enter card details to receive money".

## 4. Red-line tests (classifieds, C1–C12; run with test accounts, screenshot each)

| # | Test | Red |
|---|---|---|
| C1 | Send "pay deposit to IBAN…", "contact me on WhatsApp +357…", "courier will collect, enter your card to receive payment" | nothing happens (pass: an inline warning naming the risk + one-tap report, no silent deletion) |
| C2 | Send a lookalike "<brand>-delivery" URL (harmless test domain) | rendered as a normal link (pass: flagged/interstitial; "we never send payment or delivery links") |
| C3 | Contact a rental and a car ad | advice only in the help centre (pass: "Never pay before viewing" at the contact step) |
| C4 | Post in a high-risk category (cars, rentals) | phone only, or "Verified" with no stated meaning (pass: ID/eID tiered by risk, badge names the checks) |
| C5 | Find a "private" account with many similar car or property ads | private label on dealer-like accounts, no trader declaration (UCPD Annex I 22) |
| C6 | Find VIP/TOP ads in list, grid, map, recommendations and the app | paid position without a label anywhere, or a tooltip only |
| C7 | A dealer car ad with a reduction; sort by price | strike price not the 30-day lowest; "+ costs" in small print; sort ignores mandatory costs |
| C8 | Post a property ad as a business | no energy-class field |
| C9 | Draft a rental "no foreigners" and a job "women under 30" | published unflagged, or a protected-attribute filter exists |
| C10 | Chat with a seller without buying | chat alone unlocks a rating (UOKiK–OLX) |
| C11 | Report a test ad; remove another as a moderator would | no receipt or decision; silent removal (DSA Arts. 16–17 apply at any size) |
| C12 | Sample 20 rental ads, contact 5 | months-old ads, repeated "no longer available", duplicates accepted (pass: dates, auto-expiry, Reserved/Sold, duplicate blocking) |

Severity: a fail on C1–C3, C6, C7, C10 or C12 is a Trust finding (P1 when money or safety is at stake);
legal applicability that depends on the site's status (e.g. DSA 30–32, CRD 6a for a site without
checkout, the small-platform exemption) is reported as **a legal question**, never as a finding.

## 5. Posting-form fields by category (checked in C4, C5, C7, C8, C9)

All: Private/Business toggle (business → company name, registration no.), posted and updated dates.
Property: energy class A–G or pending/exempt, agent licence no., total monthly cost incl. mandatory
charges. Rentals: viewing availability, no nationality/religion/family-status fields. Cars (dealer):
price incl. mandatory transfer/prep costs, the prior-30-day price if a reduction is shown. Jobs:
employer name and verification, pay or range (EU Pay Transparency Directive; Cyprus status
unverified), no age/sex/nationality requirements. Goods (dealer): prior-30-day price, trader identity.

## 6. Pull, per side

- **Buyers in an active hunt (daily for weeks):** saved searches with instant alerts, "new since your
  last visit", price-drop and back-on-market alerts, shortlist + compare + notes, a hunt view (viewings,
  shortlisted, notes). After the hunt: nothing aggressive; a "how's the new car/flat" moment is enough.
- **Casual browsers (weekly):** a fixed weekly digest per saved search, freshness first.
- **Private sellers (per listing):** the ad's journey (live → first view → first message), honest
  stats, sold → "sell another like this".
- **Businesses (daily):** lead inbox, response-time feedback, feed health, contacts-per-€ view.

## 7. Black tier for classifieds (pass `black-ux.md` §2) and never

Passing when true and gated: "12 people saved this today" (real count, off in rentals during housing
stress if the owner chooses); "Price dropped €1,000 · 3 others watching" (true); seller nudges with
facts and the € price ("Your ad has 40 views and no messages; TOP for €X shows it above regular ads
until <date>"); a "new listing" first-hours badge with a real timestamp.
**Never:** unlabelled paid positions or paid ads blended into "Recommended"; arbitrary strike prices;
"verified" without checks; reviews unlocked by a chat; fake views, saves or urgency; "your ad dropped"
claims that aren't true; wallet money that expires or hides euros; promotions that outlast the ad or
auto-renew silently; protected-attribute fields or filters in rentals and jobs.

## 8. Output additions

Scorecard per side (buyers, private sellers, businesses) then overall; for multi-category sites, audit
2–3 categories by traffic (Team, scoped) and say which. Metrics to request (no public benchmarks):
search → listing view, zero-result rate, filter and map use, save rate, saved-search creation,
alert open → visit, listing → contact, phone vs chat split, seller first-response time, stale-listing
share, posting time and abandonment, paid-promotion uptake and repeat purchase, refund requests.
