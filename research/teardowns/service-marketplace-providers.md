# Service marketplaces, provider (supply) side: lead economics, cold start, motivation, algorithmic management

Research for the ux-audit skill, for auditing a local service marketplace where providers (tradespeople, freelancers) get leads and jobs from clients. The goal is to recommend concrete provider-side UX improvements and to flag manipulation.

**Tags.** **[S]** company-stated (help centre, pricing page, blog, terms, testimony). **[O]** observed (says how). **[PR]** peer-reviewed. **[REG]** regulation, court ruling or enforcement. **[H]** practitioner, press, advocacy group or third-party guide. **unverified** = no primary source found. Numbers are never estimated.

**Method and limits.** Gathered by web search on 2026-10-09. Many provider help centres (help.thumbtack.com, support.upwork.com, help.fiverr.com, help.bark.com) either render client-side or return 403 to the fetcher, and EUR-Lex returned an empty body. For those pages the facts below come from search-engine extracts of the official page, and the official URL is cited. Pages read in full: Airbnb Superhost help (article 829), Bark US pricing page, Airtasker US fee post, FTC HomeAdvisor case page. No provider app was driven in this session, so there are **no [O] claims about live screens**: every [O] slot in the recipe is a check the auditor must do. Lead prices, credit prices and fee percentages change often and vary by region; treat every figure as dated.

---

## Summary

1. **Pay-to-contact is the dominant model, and the fee is usually owed whether or not the job is won.** Thumbtack charges direct leads automatically when they match a pro's preferences [S]; Bark sells credits to contact a lead [S]; MyBuilder charges when the customer shortlists you [S]; Upwork charges Connects per proposal [S]. Only take-rate models (Airtasker, TaskRabbit, Fiverr, Upwork's service fee) tie cost to earned money.
2. **"Cost before commit" is the single biggest provider-side UX fairness test.** Good cases show the price on the lead before spending: Bark shows the price upfront [S], MyBuilder shows the fee on the lead before you express interest [S], Thumbtack shows the cost of an Opportunity upfront [S]. Weak cases are auto-charges, credits that hide the money price, and auctions with temporary holds (Upwork Boost) [S].
3. **Platform currencies hide money.** Bark credits (3-month expiry from purchase [S]; complaints that expiry forces low-quality spending [H]), Upwork Connects ($0.15 each, 1-year expiry [S]) and Upwork's ID-verification badge costing 35 Connects [S]. Research shows tokens shift choices (Hsee et al. 2003 "medium maximization" [PR]) and raise willingness to pay at 1:1 rates (loot-box experiment, N=753 [PR]).
4. **Shared leads plus speed metrics create a race.** Bark leads go to up to 5 pros [H, unverified officially]; Thumbtack says pros replying within 30 min are 25% more likely to be hired than those replying within 3 h [S]. Fiverr's response rate counts first replies within 24 h over 90 days, and it gates levels [S].
5. **Enforcement exists for lead misrepresentation.** The FTC's HomeAdvisor case: complaint 11 Mar 2022, final order 21 Apr 2023, up to $7.2M redress, and a ban on misrepresenting lead quality, source and conversion rates [REG]. The FTC's Sept 2022 gig-work policy statement names algorithmic pay, work allocation and firing as Section 5 concerns [REG].
6. **Tiers and badges are everywhere and mostly criteria-transparent.** Airbnb Superhost (4.8 rating, 90% response, <1% cancellation, 10 stays, quarterly review [S]), Upwork Top Rated (JSS ≥90% for 13 of 16 weeks, $1,000 12-month earnings [S]), Fiverr levels (auto-promotion within 24 h, 30-day grace before demotion [S]), Uber Pro (points over 3-month periods plus acceptance and cancellation gates [S]). Opaque ones exist: Upwork does not publish the JSS formula [S]; TaskRabbit Elite is "top 35% performance score" [S].
7. **Cold start is handled by discounts and newcomer badges, not by free visibility.** Airbnb's New Listing Promotion is a 20% guest discount on 3 bookings [S]; Upwork has Rising Talent [S]; Bark has a Starter Pack with a "Get Hired Guarantee" (credits back if no hire) [S]. Some platforms gate entry by supply: Upwork has rejected profiles because too many freelancers share the skill set [H].
8. **Loss-framed nudges are documented manipulation.** NYT (Scheiber, 2 Apr 2017) reported Uber prompts telling drivers they were close to an earnings target when they tried to log off [H]. Lyft streaks require accepting every request and never going offline [H]. Lee et al. (CHI 2015) found short accept windows plus acceptance-rate pressure made drivers accept by default [PR].
9. **Opacity is the core harm in the research.** Rosenblat & Stark 2016 (information asymmetries, soft control) [PR], Kellogg et al. 2020 (the "6 Rs" of algorithmic control) [PR], Wood et al. 2019 (the same controls give autonomy and cause overwork; N=107 interviews, 679 surveyed) [PR], and Rahman 2021 (opaque ratings form an "invisible cage") [PR]. A 2023 survey of 810 California drivers reported that 30% of those deactivated got no explanation [H].
10. **Law is catching up, and the deadline is close.** The EU Platform Work Directive (EU) 2024/2831 entered into force 1 Dec 2024, with transposition due **2 Dec 2026** [REG]. Chapter III (Arts 7–11) brings data limits, transparency, human oversight and human review, with a written reply within 2 weeks; account suspension or termination must be decided by a human; much of this covers the self-employed [REG]. The P2B Regulation (EU) 2019/1150 already requires published main ranking parameters, reasons for suspension and free complaint handling for business users (applies from 12 Jul 2020) [REG].

---

## 1. Lead and job economics, and their UX

### 1.1 Thumbtack (pay per lead, US)
- **Model:** free to join, pay per lead, no commission on the job [H] ([Housecall Pro](https://www.housecallpro.com/resources/what-is-thumbtack-how-it-works/)). Thumbtack does not publish lead prices; pro-reported ranges run from about $10 to over $100 [H] (same source; [ServiceMag](https://servicemag.org/software/thumbtack)). Official price list: **unverified**.
- **Direct leads:** when a customer reaches out from search and the job matches the pro's job preferences, the pro auto-pays for the lead [S] ([help: pay for leads](https://help.thumbtack.com/article/pay-for-leads), via search extract). A moderator says the charge happens as soon as the customer picks the pro, and the pro then has to win the job [S] ([community](https://community.thumbtack.com/discussion/1014/direct-leads)).
- **Opportunities:** customers who contacted other pros and have not hired yet. The cost is shown upfront, the pro is charged only if they reach out **and** the customer replies, and Opportunities do not count toward the budget [S] ([help: Opportunities](https://help.thumbtack.com/article/opportunities)). Pros report charges on Opportunities where the customer barely engaged (e.g. $65.35) [H] ([community](https://community.thumbtack.com/discussion/1750/unfair-lead-charge-lack-of-support-where-is-management)).
- **Spend controls:** a lead price per job type ("exact lead prices": you pay the price you set unless discounted) plus a weekly budget that is never exceeded [S] (moderator posts, [community](https://community.thumbtack.com/discussion/comment/6493/); [help: set lead prices](https://help.thumbtack.com/article/set-lead-prices)). A pro asked for a per-lead cap; staff replied that something similar was being worked on (undated) [S] ([community](https://community.thumbtack.com/discussion/comment/1399)).
- **Instant Match:** Thumbtack's pro centre says pros are charged only when a matched customer contacts them, matched on services, zip codes and calendar availability [S] (pro-center.thumbtack.com, via search extract; the domain did not resolve for direct fetch). A third-party guide describes a charge on match [H]. The current wording is **unverified**.
- **Refunds:** leads that violate the Terms of Use qualify (quoted by pros) [S via community]. Pros report frequent denials [H] ([community](https://community.thumbtack.com/discussion/1732/thumbtack-s-refund-policy-is-a-lie)).
- **Response speed:** "pros who respond within thirty minutes are 25% more likely to get hired" than those taking three hours [S] ([Thumbtack 2025 Pro Summit](https://www.thumbtack.com/guide/content/3-takeaways-from-the-2025-pro-summit)). Whether that is relative or absolute: **unverified**.
- **Incentives that raise spend:** a free-leads promotion for raising the weekly budget for 2 weeks without pausing [S] ([community](https://community.thumbtack.com/discussion/778/free-leads-promotion)), and referral lead credit up to $100 ($50 outside high-demand markets) [S] ([help](https://help.thumbtack.com/article/pro-referral-program)).

### 1.2 Bark (credits to contact, UK/US/AU)
- **Model:** leads are free to view, and the pro pays only to contact. "No commission, no hidden fees"; each lead carries a one-off fee, and follow-up messages are free [S] ([Bark US pricing](https://www.bark.com/en/us/sellers/pricing/), read in full).
- **Price shown before spend:** the credit cost is set per lead and shown upfront. It depends on service, job value and local supply and demand [S] (same page).
- **Credit price:** reported as £1.80 + VAT (UK list), $2.20–$2.35 (US) [H] ([whito](https://whito.co.uk/trades/tools/bark-cost-uk/), [softwarefinder](https://softwarefinder.com/customer-service-software/bark-com)). Official per-credit price: **unverified** (shown only inside the account).
- **Expiry:** "All Credits are valid for 3 months from the date of purchase" [S] (pricing page). Reviewers say this applies to credits bought from 1 Nov 2025 and pushes them to buy weaker leads to avoid losing credits [H] ([G2](https://g2.com/products/bark-com/reviews?page=10)). The previous expiry period: **unverified**.
- **Auto top-up:** in a Trustpilot reply, Bark says that if a pro has too few credits for a lead, the system buys the **smallest credit pack** so the pro can contact it [S] ([Trustpilot](https://ie.trustpilot.com/review/bark.com?page=3)). This is a purchase triggered inside the respond flow: audit it.
- **Guarantee:** new pros who win no business with their first credit pack get all credits back [S] (pricing page; [Starter Pack help](https://help.bark.com/hc/en-us/articles/27901101296412-What-is-the-Starter-Pack)). The refund is in credits, not cash [H].
- **Elite Pro (subscription):** 2 free leads per week, limited to leads with no responses after 48 h (resets Monday), plus 20% off credit packs [S] ([help: Elite Pro](https://help.bark.com/hc/en-gb/articles/13177418184476-Elite-Pro), via extract). Price: **unverified**.
- **Competition per lead:** up to 5 pros per request [H] ([GTM directory](https://thegtmdirectory.com/tools/bark)). Official confirmation: **unverified**.

### 1.3 Angi / HomeAdvisor and the FTC action
- **FTC case (Docket 1923106) [REG]** ([FTC case page](https://www.ftc.gov/legal-library/browse/cases-proceedings/1923106-homeadvisor-matter)): administrative complaint 11 Mar 2022; proposed consent order 23 Jan 2023; final Decision and Order 21 Apr 2023 (some coverage says 20 Apr).
- **Allegations:** since at least July 2014, false or unsubstantiated claims about lead quality, characteristics, source and conversion rates, including that leads were people ready to hire who had asked HomeAdvisor directly; plus agents calling the paid mHelpDesk add-on "free" [REG] ([Subscription Insider](https://www.subscriptioninsider.com/topics/regulation-and-compliance/ftc-finalizes-order-against-homeadvisor-for-deceptive-marketing), [Search Engine Journal](https://www.searchenginejournal.com/homeadvisor-penalized-by-ftc-for-alleged-false-claims-about-leads/486906/)).
- **Remedy:** up to $7.2M redress and a ban on misrepresenting leads [REG]. HomeAdvisor denied wrongdoing [S].
- **Current Angi pricing:** annual fee about $288–$300, $15–$85 per lead, leads shared with 3–8 pros, and a January 2025 "homeowner choice" change [H] ([Phonely](https://www.phonely.ai/blog/is-angi-leads-worth-it--what-contractors-really-need-to-know), [Podium](https://podium.com/article/is-angi-worth-it-for-contractors)). All **unverified** from Angi.
- **Lesson for audits:** claims about lead intent ("ready to hire"), lead source and close rate are regulated speech in the US. Any such claim in the UI needs substantiation.

### 1.4 Upwork (Connects, Boost, fees)
- **Connects:** $0.15 each, sold in bundles of 10 or a custom amount [S] ([Upwork: get more Connects](https://www.upwork.com/resources/how-to-get-more-connects)). Unused Connects roll over monthly and expire after one year [S] ([help: balance rollover](https://support.upwork.com/hc/en-us/articles/42460461019155-Connects-balance-rollover-and-history)). Connects per proposal vary by job; Upwork has adjusted the per-job range to match demand [S] (community manager, [Upwork community](https://community.upwork.com/t5/Support-Forum/Marketplace-Updates-Boosted-Proposals-and-Connects/m-p/1271430)). Typical per-job cost: **unverified**.
- **Boosted proposals (auction):** an extra Connects bid on top of the base cost. You pay if you finish in the top 4 bidders or the client interacts while you are boosted. Connects are held, refunded at auction close, then re-charged to winners [S] ([help: Boost](https://support.upwork.com/hc/en-us/articles/4406395531795-Boost-your-proposal), [help: Boost charges](https://support.upwork.com/hc/en-us/articles/40444950584083-When-and-what-will-I-be-charged-Boosted-Proposals)). Charge, refund, charge again is confusing by design or by accident.
- **ID verification badge:** freelancers can choose to verify identity and display the badge **for 35 Connects** [S] (help centre via extract, [support.upwork.com](https://support.upwork.com/hc/en-us/articles/360001176427)). Trust signals sold for platform currency are a pay-to-play red flag.
- **Service fee:** reportedly moved from a flat 10% to a variable 0–15% per contract (around May 2025), shown at proposal time and locked per contract; Upwork does not disclose the weighting [H] ([Snipework](https://snipework.com/answers/upwork-dynamic-fees-explained), [ElevatePay](https://www.elevatepay.co/blog/upwork-freelancer-service-fee)). Official date and rules: **unverified**.
- **Lead-quality signals shown to freelancers:** payment verified, hire rate, total spent, average hourly rate paid, proposal count, and client feedback in "Client's recent history" [S] (2021 staff reply, [community](https://community.upwork.com/t5/Freelancers/Public-rating-of-clients-Client-Success/m-p/1378660)) and [H] ([AiProposer](https://aiproposer.com/guides/upwork-strategy/upwork-client-signals)). This is the best-documented lead-quality panel in the set.

### 1.5 Fiverr (seller pays commission; Fiverr Ads)
- **Fiverr Ads (Promoted Gigs):** cost per click; you pay the minimum needed to beat the next bid; impressions and video hovers are not charged; the bid formula weighs conversion rate, revenue per click, competition and ROAS [S] ([help: Fiverr Ads](https://help.fiverr.com/hc/en-us/articles/360017729338-Fiverr-Ads)). Fiverr Ads unlock at Level 2 [S] ([help: Achieving levels](https://help.fiverr.com/hc/en-us/articles/360010560118-Achieving-levels)).
- **Response rate:** the share of first replies to new messages sent within 24 h, over the last 90 days (e.g. 9 of 10 = 90%) [S] ([help: response time and rate](https://help.fiverr.com/hc/en-us/articles/360011451678)). A guide says spam first messages count too [H] ([fiverrtutorials](https://fiverrtutorials.com/fiverr-order-management/fiverr-response-rate-guide)).

### 1.6 Airtasker (offers; tiered take rate)
- **Tasker fee:** tiered, from 20% down to 11.9% (US, effective 21 May 2024), based on earnings over the previous 30 days at assignment; the offer amount counts toward the tier [S] ([Airtasker US blog](https://www.airtasker.com/us/blog/new-fee-structure/), read in full). Airtasker replies in 2026 cite 12.5–20% [S] (Trustpilot replies via extract). Per-market range: **unverified**.
- **Customer Connection Fee:** 15.95% in AU (min AUD 4.90, cap AUD 49.95); 17.40% in UK (min £2.49, cap £24.90) [S] ([help: Connection Fee](https://support.airtasker.com/hc/en-au/articles/360031769372)).
- **Model note:** the provider pays only on assignment, so cost follows earning.

### 1.7 TaskRabbit (Taskers set rates)
- **Rates and availability:** Taskers set a rate per service, set weekly availability and opt in to same-day jobs [S] ([Become a Tasker](https://www.taskrabbit.com/become-a-tasker)).
- **Registration fee:** one-time and non-refundable, $25, charged on successful registration; paying it "doesn't guarantee you'll become a Tasker" [S] ([help](https://support.taskrabbit.com/hc/en-ca/articles/360032936511-What-s-the-Registration-Fee)). Applies "in applicable cities" [S].
- **Who pays the service fee:** TaskRabbit says fees are charged to clients [S] (help via extract). Third parties conflict [H]. **Unverified** across markets.

### 1.8 UK: Checkatrade and MyBuilder
- **Checkatrade:** choose trade, postcodes and yearly lead volume, then pay a fixed monthly fee [S] ([join.checkatrade.com](https://join.checkatrade.com)). Most memberships run a fixed 12-month term and normally cannot be cancelled mid-term [S, via extract]. Price levels and lead sharing (3–5 trades) [H]: **unverified**.
- **MyBuilder:** expressing interest is free; the fee is due only when the customer shortlists you (contact details exchanged). The fee is "clearly visible on the lead" before you express interest [S] (archived [help: finding work](https://webcf.waybackmachine.org/web/20231004000209/https://www.mybuilder.com/help/faq-finding-work)). The 2023 range was £3.50–£45 [S, archived]; current range **unverified**. Refunds only for listed cases (dead number, duplicate shortlist) [S].
- **Why MyBuilder matters:** of all the lead models found, this is the closest to pay-on-mutual-interest, because the customer has to opt in before the provider pays.

---

## 2. Provider onboarding and cold start

- **Verification:**
  - Thumbtack: identity verification if asked, and a background check that is optional in some categories and earns a badge [H] ([Everlance](https://www.everlance.com/gig-guides/thumbtack-requirements)).
  - Upwork: government ID, location proof for US-only jobs, and a short video call or photo match [S] (help via extract).
  - Checkatrade: insurance, qualifications (e.g. Gas Safe) and a background check [H] ([electriciancourses4u](https://dev.electriciancourses4u.co.uk/useful-resources/find-the-right-trusted-tradesmen-scheme-for-you/)).
  - TaskRabbit: $25 registration with no guarantee of approval [S].
- **Supply gating:** Upwork rejection emails have cited "many freelancers with a similar skillset" [H] ([community](https://community.upwork.com/t5/New-to-Upwork/Rejected-Profile/m-p/493363)). Upwork staff say profile review can take up to 48 h [S, community]. Good practice: say why, and what would change the outcome.
- **First-two-weeks guide:** Thumbtack runs a structured new-pro guide: how the platform works, choosing jobs, managing leads and money, first reply [S] ([help](https://help.thumbtack.com/article/new-pro-guide-1)). It warns that matching leads are charged automatically [S].
- **Newcomer visibility mechanisms:**
  - Upwork Rising Talent: needs a 100% complete profile showing pre-Upwork experience, positive early results, current availability, and activity in the last 90 days or a join within the last 30 days [S] ([help: Top Rated and Rising Talent](https://support.upwork.com/hc/en-us/articles/211063568-Top-Rated-and-Rising-Talent)).
  - Airbnb New Listing Promotion: an optional 20% guest discount on the next 3 bookings for listings with under 3 bookings. Airbnb reports listings published in 2025 with it saw "more than 70% more bookings" in 3 months [S, self-reported] ([Airbnb](https://www.airbnb.com/e/new-listing-promotion?locale=en)). The **provider funds** the newcomer boost.
  - Bark Starter Pack: credits for about 10 contacts, the Get Hired Guarantee and a free Elite Pro trial [S].
  - Fiverr: new sellers start at Level 0 / "New"; 4 gig slots versus 10 at Level 1 [S] (Achieving levels). A newcomer ranking boost: **unverified** (none documented).
- **Probation and decay:** Fiverr gives a 30-day grace period before demotion [S]. Upwork Top Rated requires a first project completed more than 90 days ago [S]. Airbnb counts a 12-month window and needs no full year to qualify [S].

---

## 3. Retention and motivation mechanics

### 3.1 Tiers and badges (criteria as published)
| Program | Criteria [S] | Cadence | Source |
|---|---|---|---|
| Airbnb Superhost | ≥10 stays (or 3 totalling ≥100 nights); reply to 90% within 24 h; <1% cancellations (valid-reason exceptions); ≥4.8 overall rating; declining requests does not hurt | Quarterly (1 Jan/Apr/Jul/Oct), 12-month lookback | [Airbnb help 829](https://www.airbnb.com/help/article/829) (read in full) |
| Upwork Top Rated | JSS ≥90%; first project >90 days ago; Rising Talent or JSS ≥90% for 13 of last 16 weeks; 100% profile; ≥$1,000 12-month earnings; good standing; active in last 90 days | Rolling | [Upwork help](https://support.upwork.com/hc/en-us/articles/211063568-Top-Rated-and-Rising-Talent) |
| Upwork JSS | Formula not published; highest of 24-/12-/6-month and "trending" scores shown; below 79% "may find it difficult" to win work | Every 2 weeks or daily (Upwork sources conflict) | [help](https://support.upwork.com/hc/en-us/articles/211068358), [community](https://community.upwork.com/t5/Announcements/How-Job-Success-Score-is-Calculated/m-p/906255) |
| Fiverr levels | Level 1: 5 orders, 3 clients, $400+, success score 5+, 80% response, 4.4+ rating. Auto-promotion within 24 h; Top Rated needs a manual review; 30-day grace before demotion | Periodic | [fiverr.com/levels (br)](https://br.fiverr.com/levels), [help](https://help.fiverr.com/hc/en-us/articles/360010560118-Achieving-levels) |
| Fiverr Level 2 / Top Rated | 20 orders, 10 clients, $2,000, score 7+, 4.6+, 90% / 40 orders, 20 clients, $10,000, score 9+, 4.7+ [H] | — | [SellerOS](https://sellerosforfiverr.com/guides/fiverr-seller-levels); **unverified** officially |
| Uber Pro | Blue, Gold, Platinum, Diamond; points plus acceptance rate (last 100 exclusive requests), cancellation rate (last 100 accepted), rating, CMT driving score; thresholds set per city in-app | 3-month periods | [Uber Pro terms](https://www.uber.com/us/en/legal/uber-pro-program-terms/) |
| TaskRabbit Elite | Performance score in top 35% (undated) | — | [TaskRabbit blog](https://www.taskrabbit.com/blog/tasker-roundup-6-updates-you-dont-want-to-miss/) |
| Thumbtack Top Pro | (2018) hired ≥10 times, ≥4.8 rating, ≥5 reviews in 12 months; classes chosen Jan and Jul | Twice yearly | pro-center.thumbtack.com via extract; current criteria **unverified** |

- **Level-gated tools:** Fiverr gates Subscriptions and Fiverr Ads to Level 2 and Early Payout to Top Rated [S]. Bark Elite Pro gives free leads plus a discount [S]. Thumbtack Pro Rewards tiers reportedly need 65% (Gold) or 75% (Platinum) one-hour response rates, measured 8 am to 8 pm [S, community].
- **Uber Pro acceptance benchmarks:** a reported 85% acceptance and 4% cancellation for higher tiers; a cancellation rate above 10% removes rewards immediately [S via extract] ([Uber Pro](https://www.uber.com/us/en/pro/terms/)). City variance: unverified.

### 3.2 Response and acceptance metrics
- **Response metrics are timers that run on the provider's life:** Airbnb 24 h, Fiverr 24 h over 90 days, Thumbtack 30-minute advantage, Thumbtack Pro Rewards one hour.
- **Tooling that makes the timers bearable:**
  - Fiverr quick responses: up to 100 saved templates with a {username} token, plus an auto-reply that fires only on a client's first message [S] ([help](https://help.fiverr.com/hc/en-us/articles/10092069817617-Quick-responses-and-auto-replies)).
  - Thumbtack Quick Replies and "Front Desk", which auto-responds in about 2 minutes on average [S, staff in community].
  - Thumbtack's performance page compares a pro's response time with the local average (e.g. 21 min) [S, staff].
- **Acceptance-rate gates push drivers to accept by default:** Lee et al. found that short accept windows plus pressure to keep acceptance high made drivers accept unless a ride was obviously bad [PR] ([CHI 2015](https://pages.ischool.utexas.edu/hai-files/files/publications/30/2015-CHI_algorithmic_management.pdf)).

### 3.3 Earnings, payouts and transparency
- **Uber Upfront Fares:** expanded across the US in July 2022, showing estimated fare plus pickup and drop-off before accepting, with Trip Radar listing nearby requests [S/H] ([Uber](https://www.uber.com/blog/2022-upfront-fares), [Axios](https://www.axios.com/2022/07/29/uber-expands-trip-transparency-for-drivers)). Before this, drivers often accepted blind [H].
- **Instant payout fees:** Lyft Express Pay reportedly $0.50 → $0.85 → $1.25 → $1.75 over time; Uber reportedly $0.85 on regular debit cards and free on its own card [H] ([Rideshare Guy](https://therideshareguy.com/all-the-ways-rideshare-drivers-can-get-paid-instantly/)). All current values **unverified**.
- **Steering effect:** free fast payout only on the platform's own card is worth noting as steering.
- **Earnings claims are regulated:** in January 2017, Uber paid $20M to settle FTC charges over driver-earnings claims; the FTC said fewer than 10% of drivers in NY and SF hit the advertised incomes [REG] (via [NBC Bay Area](https://www.nbcbayarea.com/news/local/uber-to-pay-20-million-in-lawsuit-over-duping-drivers/23129/)).

### 3.4 Quests, streaks and goals
- **Uber Quest:** e.g. "$100 for 30 trips over 3 days"; opt in before the period; progress shown under Opportunities; offered when Uber expects demand [S] ([Uber promotions](https://www.uber.com/us/en/drive/promotions/), [How Quest works](https://www.uber.com/us/en/blog/how-quest-works/)). This is gain-framed and opt-in, with a clear count.
- **Lyft streaks:** a bonus for N consecutive rides; you must accept every request, can't go offline, miss or cancel [H] ([Rideshare Guy](https://therideshareguy.com/lyft-streak-bonuses-and-uber-consecutive-trip-boost/)). This removes the right to decline.
- **NYT 2017 (Noam Scheiber, 2 Apr 2017) [H]:**
  - It reported Uber experimenting with "video game techniques, graphics and noncash rewards of little value."
  - It described log-off prompts saying the driver was close to an earnings target, with "keep driving" preselected.
  - It described forward dispatch: the next ride assigned before the current one ends.
  - Uber said forward dispatch cuts wait times.
  - Sources: [Business & Human Rights summary](https://www.business-humanrights.org/en/how-uber-uses-psychological-tricks-to-push-its-drivers’-buttons), [Complex](https://www.complex.com/life/2017/04/uber-5-tricks-keep-drivers-on-road). Full text not read: **paywalled**.

### 3.5 Reviews of providers, deactivation and appeals
- **Uber's Review Center (2024):** an in-app reason for deactivation, a Request Review button, and uploads of video or photos; every appeal is reviewed by a person [S] ([Uber: fairness in the driver seat](https://www.uber.com/us/en/blog/fairness-in-the-driver-seat/)). Uber testified that 95% of disputed deactivations are resolved within 72 h [S, NYC Council testimony, Sep 2024] ([citymeetings.nyc](https://citymeetings.nyc/city-council/2024-09-27-1000-am-committee-on-transportation-and-infrastructure/chapter/testimony-by-josh-gold-senior-director-of-public-policy-communications-at-uber-on-driver-deactivation-policies)). Uber said it would stop counting suspected-false refund complaints in ratings [H] ([TechCrunch](https://techcrunch.com/?p=2627807)). Uber also admits some accounts are deactivated automatically, for example when documents expire [S, via Capital & Main].
- **"Fired by an App" (Asian Law Caucus and Rideshare Drivers United, Feb 2023; 810 CA drivers) [H, advocacy survey]:**
  - 30% of deactivated drivers got no explanation; 42% were told it was customer complaints.
  - 69% of drivers of colour versus 57% of white drivers reported deactivation.
  - Sources: [report PDF](https://cdn.craft.cloud/5cd1c590-65ba-4ad2-a52c-b55e67f8f04b/assets/media/Fired-by-an-App-February-2023.pdf), [NBC](https://www.nbcnews.com/news/asian-america/uber-lyft-drivers-california-say-ve-spontaneously-fired-apps-report-fi-rcna73262).
  - The headline deactivation rate (two-thirds vs 40%) conflicts across sources: **unverified**.
- **Amsterdam Court of Appeal, 4 Apr 2023 (ECLI:NL:GHAMS:2023:804) [REG]:**
  - It found that Uber and Ola processes (assigning rides, pricing, ratings, fraud scores, deactivation) can be automated decisions under GDPR Art. 22.
  - It called Uber's human review little more than "a purely symbolic act."
  - Sources: [Fieldfisher](https://www.fieldfisher.com/en/insights/amsterdam-court-of-appeal-rules-in-favour-of-uber-and-ola-cabs-drivers), [Fountain Court](https://fountaincourt.uk/2023/04/amsterdam-court-upholds-appeal-in-algorithmic-decision-making-test-case-drivers-v-uber-and-ola/).
  - The final remedy for reinstatement: **unverified**.
- **Two-sided reviews:** Upwork lets freelancers rate clients, and that feedback shows on the client's future job posts [S, 2021 staff].

---

## 4. Algorithmic management and harms (research and regulation)

### 4.1 Peer-reviewed core
- **Lee, Kusbit, Metsky & Dabbish (CHI 2015)**, "Working with Machines" [PR] ([PDF](https://pages.ischool.utexas.edu/hai-files/files/publications/30/2015-CHI_algorithmic_management.pdf), [ACM](https://dl.acm.org/doi/10.1145/2702123.2702548)):
  - Sample: 21 drivers and 12 passengers interviewed, 128 forum posts and 132 official blog posts.
  - It coined "algorithmic management."
  - More than half of the drivers ignored surge information, and "don't chase the surge" was standard forum advice.
  - Opacity bred ambivalence and distrust. Knowledgeable drivers built workarounds; others declined more.
- **Rosenblat & Stark (IJoC 2016)**, "Algorithmic Labor and Information Asymmetries" [PR] ([IJoC](https://ijoc.org/index.php/ijoc/article/view/4892)):
  - Method: a 9-month study of Uber driver forums (Dec 2014 to Sep 2015).
  - Finding: Uber exerts indirect "soft control" through information and power asymmetries, dynamic pricing and gamified engagement, while presenting drivers as entrepreneurs.
- **Kellogg, Valentine & Christin (Academy of Management Annals 2020)**, "Algorithms at Work" [PR] ([NSF PAR](https://par.nsf.gov/servlets/purl/10195395)):
  - The "6 Rs" of algorithmic control, an audit-ready taxonomy: direct (restrict, recommend), evaluate (record, rate), discipline (replace, reward).
  - Worker resistance is named "algoactivism."
- **Wood, Graham, Lehdonvirta & Hjorth (Work, Employment and Society 2019)**, "Good Gig, Bad Gig" [PR] ([PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC6380453/)):
  - Sample: 107 interviews in six countries and 679 surveyed remote workers.
  - Finding: the same algorithmic control gives flexibility and autonomy, and also low pay, isolation, overwork, sleep loss and exhaustion.
- **Rahman (ASQ 2021)**, "The Invisible Cage" [PR] ([Kellogg](https://www.kellogg.northwestern.edu/faculty/research/detail/2021/the-invisible-cage-workers-reactivity-to-opaque-algorithmic-evaluations)):
  - On an Upwork-like platform, an opaque rating algorithm made success criteria unpredictable.
  - Freelancers either experimented or pulled back, depending on how dependent they were and whether their score had dropped.
- **Dubal (Columbia Law Review 2023)**, "On Algorithmic Wage Discrimination" [PR, law review] ([PDF](https://columbialawreview.org/wp-content/uploads/2023/11/Dubal-On_Algorithmic_Wage_discrimination.pdf)): personalised, variable pay per worker imports price discrimination into labour.
- **Hsee et al. (JCR 2003)**, "Medium Maximization" [PR] ([RePEc](https://ideas.repec.org/a/oup/jconrs/v30y2003i1p1-14.html)): an intermediate token such as points can create illusions of advantage, certainty or linearity that change choices. This is the mechanism behind credit and Connects concerns. The paper does not test credits directly.
- **Virtual currency and willingness to pay:** an experiment with 753 UK participants found higher willingness to pay in 1:1 virtual currency than in pounds [PR] (Experimental Economics, 2026, per search summary). Full citation **unverified**.

### 4.2 Regulation and enforcement
- **EU Platform Work Directive (EU) 2024/2831 [REG]:**
  - Dates: signed 23 Oct 2024, published in the OJ 11 Nov 2024, in force 1 Dec 2024, transposition by 2 Dec 2026 ([EUR-Lex PDF](https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32024L2831), [EUR-Lex summary](https://eur-lex.europa.eu/EN/legal-content/summary/working-conditions-in-platform-work.html)).
  - Chapter III "Algorithmic management":
    - Art 7 bans processing emotional or psychological state, private conversations and some biometrics.
    - Art 8 requires a DPIA that seeks workers' views.
    - Art 9 requires transparency about automated monitoring and decision systems.
    - Art 10 requires human oversight with power to override, plus an evaluation at least every 2 years.
    - Art 11 gives a right to an explanation, a contact person, and review with a written, reasoned reply within 2 weeks. Decisions to restrict, suspend or terminate an account must be taken by a human.
  - Commentary reads Arts 7–11 as covering "persons performing platform work," including the self-employed ([Countouris & De Stefano 2025](https://journals.sagepub.com/doi/10.1177/20319525251375028); [legalcode.md](https://legalcode.md/blog/algorithm-allocate-work-rate-performance-set-pay-deactivate-worker-explanation-human)).
  - One secondary source says Art 11 review does not apply to P2B "business users." **Unverified**; check the article text, which was not read in full here.
- **P2B Regulation (EU) 2019/1150, applies from 12 Jul 2020 [REG]:**
  - Art 4: a statement of reasons for restricting or suspending a business user, and 30 days' notice for termination (with exceptions).
  - Art 5: publish the main ranking parameters in plain language, including whether paying influences ranking.
  - Art 11: a free, easily accessible internal complaint system, with reporting.
  - Sources: [CCPC](https://ccpc.ie/business/?p=38274), [BDK](https://bdkadvokati.com/p2b-regulation-has-teeth-french-and-italian-regulators-show).
  - Relevance: sole-trader providers selling to consumers are "business users."
- **FTC (US) [REG]:**
  - HomeAdvisor order (2023, §1.3).
  - Uber earnings settlement (2017).
  - Gig-work policy statement, Sept 2022, covering:
    - earnings claims and undisclosed costs;
    - algorithms that decide hiring, firing, pay, work availability and evaluation;
    - one-sided contract terms.
  - Sources: [Morgan Lewis](https://www.morganlewis.com/pubs/2022/09/federal-trade-commission-focuses-on-gig-work), [Venable](https://www.venable.com/insights/blogs/2022/09/new-ftc-policy-statement-agency-continues-to-ramp). Primary text not read.
- **Fairwork principles (Oxford Internet Institute) [H, academic action-research]:**
  - Five principles: Fair Pay (net of costs, on time), Fair Conditions, Fair Contracts (clear, with notice of changes), Fair Management (documented due process), Fair Representation.
  - Scored out of 10 per platform per year ([fair.work](https://fair.work/en/fw/principles/)).
  - A ready-made external rubric.

### 4.3 Harm patterns distilled (each traced to sources above)
1. **Pay-to-play visibility:** Fiverr Ads at Level 2+ (CPC); Upwork Boost auction; Upwork's ID badge for 35 Connects; Angi Ads with a monthly minimum [H]; Checkatrade Sponsored Listings [H].
2. **Currencies that obscure cost:** Bark credits; Upwork Connects; expiry that forces spending (Bark 3 months, Connects 1 year).
3. **Charged before value:** Thumbtack auto-charges direct leads; shared leads (Bark up to 5 [H], Angi 3–8 [H]); lead-quality claims (FTC HomeAdvisor).
4. **Opaque scores that gate income:** Upwork JSS formula not published; TaskRabbit Elite by percentile; Uber Pro thresholds per city in-app only.
5. **Loss-framed and no-decline incentives:** earnings-target log-off prompts (NYT); Lyft streaks; acceptance-rate gates (Lee 2015; Uber Pro).
6. **Unexplained deactivation:** "Fired by an App" survey; Amsterdam 2023 ruling; Uber's own admission of some automatic deactivations.

---

## 5. What a provider-side audit should check and recommend

- **Lead quality signals, before payment:**
  - Show verified contact, the customer's hiring history (Upwork's hire rate, total spent and payment-verified signals are the model), job size or budget, timeline, how many pros are already competing, and how old the lead is.
  - Never claim intent ("ready to hire") or close rates without substantiation (FTC HomeAdvisor).
- **Cost before commit:**
  - Show the money price, not only credits, on the lead card before the action.
  - Show who has paid already ("2 of 5 slots taken").
  - Name the exact trigger (on contact, on reply, on shortlist).
  - MyBuilder's "visible on the lead" plus pay-on-shortlist is the best pattern found.
  - Thumbtack Opportunities (cost upfront, charge only if the customer replies) is the second best.
- **Spend controls:** a per-lead price cap and a weekly budget (Thumbtack). An auto top-up that is off by default and never fires inside the respond flow (contrast Bark's buy-the-smallest-pack behaviour).
- **Refund path:** published criteria (invalid number, out-of-area, duplicate) and a one-tap report from the lead.
- **Response tooling:** saved replies with tokens (Fiverr allows 100), auto first reply (Fiverr, Thumbtack Front Desk), an availability calendar that suppresses leads when the provider is booked (TaskRabbit weekly availability; Instant Match uses the calendar), and quiet hours that pause response-rate clocks (Thumbtack Pro Rewards counts only 8 am to 8 pm).
- **Earnings clarity:** fee shown at offer time and locked per contract (Airtasker tier preview; Upwork reportedly locks the fee per contract); net-after-fees per job; payout timing and the instant-payout fee shown before the tap; a cost-per-won-job metric (lead spend divided by jobs won).
- **Fair and explainable ranking:** the main ranking parameters published in plain language, with paid placement labelled (P2B Art 5). A personal "why am I ranked here / what moves it" panel answers Rahman's "invisible cage."
- **Appeals:** a reason for any restriction, a request-review button, evidence upload, a human decision, and a time-bound reply. Uber's Review Center is the pattern; the EU PWD's 2-week written reply sets the bar.
- **Good motivation versus manipulative motivation:**
  - Good: published criteria, grace periods (Fiverr 30 days), mastery and reputation badges (Superhost, Top Rated), gain-framed opt-in goals with a visible count (Uber Quest), declining without penalty (Airbnb says declining doesn't hurt Superhost).
  - Manipulative: loss-framed log-off prompts, no-decline streaks, acceptance-rate penalties for declining bad jobs, expiring paid currency, pay-to-verify badges, opaque percentile tiers.

---

## Provider-side mechanics: green / amber / red

| Mechanic | Rating | Reason | Source |
|---|---|---|---|
| Fee shown on the lead before any action, charge only after customer opts in (shortlist) | 🟢 Green | Cost before commit; pay tied to mutual interest | MyBuilder [S] |
| Cost shown upfront; charged only if customer replies; doesn't eat budget | 🟢 Green | Spend tied to engagement | Thumbtack Opportunities [S] |
| Weekly budget hard cap + per-job lead price | 🟢 Green | Predictable spend | Thumbtack [S] |
| Take rate only on earned money, tier preview at offer time | 🟢 Green | Cost follows income | Airtasker [S] |
| Published tier criteria + quarterly cadence + "declining doesn't hurt" | 🟢 Green | Transparent mastery goal, no forced acceptance | Airbnb Superhost [S] |
| Grace period before demotion; auto-promotion within 24 h | 🟢 Green | Predictable, forgiving | Fiverr [S] |
| Fare and destination shown before accept | 🟢 Green | Informed accept/decline | Uber Upfront Fares [S] |
| Saved replies / auto first reply | 🟢 Green | Meets speed metrics without being chained to phone | Fiverr, Thumbtack [S] |
| In-app deactivation reason + human review + evidence upload | 🟢 Green | Explainable, contestable | Uber Review Center [S]; EU PWD Art 11 [REG] |
| Client-quality panel (payment verified, hire rate, spend, proposals count) | 🟢 Green | Lead quality signals before spend | Upwork [S] |
| Opt-in, gain-framed quest with visible count | 🟡 Amber | Fine if achievable and not loss-framed; can extend hours | Uber Quest [S]; Wood 2019 [PR] |
| Newcomer boost funded by provider's own discount | 🟡 Amber | Helps cold start but costs the newcomer | Airbnb New Listing Promotion [S] |
| Response-rate timers (24 h / 30 min advantage) | 🟡 Amber | Legit quality signal; harmful without quiet hours and tooling | Fiverr, Airbnb, Thumbtack [S] |
| Paid placement (CPC ads, boosts) clearly labelled | 🟡 Amber | Legal if disclosed (P2B Art 5); still pay-to-play | Fiverr Ads, Upwork Boost [S] |
| Opaque score with published inputs but no formula (JSS) | 🟡 Amber | Partial transparency; "invisible cage" risk | Upwork [S]; Rahman 2021 [PR] |
| Credit guarantee for first pack (credits, not cash) | 🟡 Amber | De-risks start; locks value in platform currency | Bark [S] |
| Auto-charge on match/contact for direct leads | 🟡 Amber | Cost known in settings, not per lead at the moment of charge | Thumbtack [S] |
| Auction with hold → refund → re-charge | 🟡 Amber | Confusing money movement | Upwork Boost [S] |
| Lead-quality or intent claims without evidence | 🔴 Red | Deceptive; enforced against | FTC v. HomeAdvisor [REG] |
| Paid currency that expires (esp. short windows) | 🔴 Red | Forces spend on weak leads; hides money price | Bark 3 months [S]; reviews [H]; Hsee 2003 [PR] |
| Auto-buying a credit pack inside the respond flow | 🔴 Red | Purchase triggered by a different intent | Bark reply [S] |
| Trust badge sold for platform currency | 🔴 Red | Pay-to-verify confuses safety with spend | Upwork ID badge for 35 Connects [S] |
| Loss-framed earnings-target prompt on log-off, "keep going" preselected | 🔴 Red | Exploits goal-gradient and loss aversion | NYT 2017 [H] |
| Streak that forbids declining or going offline | 🔴 Red | Removes choice; pushes unsafe/unprofitable work | Lyft streaks [H]; Lee 2015 [PR] |
| Acceptance-rate penalties when job details are hidden | 🔴 Red | Blind accept under threat | Lee 2015 [PR]; Uber pre-2022 [H] |
| Deactivation without reason or human review | 🔴 Red | Unfair; unlawful in EU from Dec 2026 transposition | Fired by an App [H]; Amsterdam 2023 [REG]; EU PWD [REG] |
| Selling the same lead to many pros without showing the count | 🔴 Red | Hidden competition inflates perceived value | Bark/Angi reports [H] |

---

## Implications for the ux-audit skill: a provider-side audit recipe

Run this as a separate pass when the product has a supply side. The auditor needs a provider test account (from the project's seed or fixtures, or created on a local dev host) and at least one test lead. Every check is **[O]**: record the screen, the step and what was shown.

**A. Map the money (15 min)**
1. List every way the provider pays: lead fee, credits, subscription, commission, boost, ads, registration, verification, payout fee. For each, note **when** the charge fires (view, contact, reply, shortlist, hire, payout).
2. For each charge, ask: is the **money** amount (not just credits) visible on the screen where the provider decides? Fail = red.
3. Credits: is there an expiry? Where is it shown before purchase? Does any flow buy credits automatically? Fail = red.
4. Compute and check whether the UI shows: cost per lead, cost per won job, net earnings per job after all fees.

**B. Lead card inspection**
5. Before spending, does the lead show: job scope, budget or size, location or distance, timing, customer verification (phone, payment), customer history, **number of providers already contacted or paid**, and lead age? Missing competitor count on a paid shared lead = red.
6. Copy check: any "ready to hire," "high intent," "X% of leads convert" or similar claim. Flag for substantiation (FTC HomeAdvisor).
7. Refund: is there a one-tap "report this lead" with published criteria?

**C. Speed and availability**
8. Which response metrics exist (rate, time, acceptance)? Are their definitions and windows shown where the metric is shown?
9. Are there saved replies with variables, an auto first reply, an availability calendar that stops leads, and quiet hours or vacation mode that pause clocks? Missing tooling while a speed metric gates rank or tier = amber.
10. Can the provider decline without penalty? If declining hurts a score, is the full job shown before the decision? If not = red.

**D. Ranking and tiers**
11. Is there a plain-language page with the main ranking parameters, including whether payment affects position (P2B Art 5)? Is paid placement labelled to clients?
12. Does the provider see **their own** rank drivers and what would move them?
13. Tiers and badges: are criteria, window, review cadence, grace period and demotion rules published in-product? Are any trust badges (verified, background-checked) sold? Selling them = red.
14. Newcomers: what is the first-job path? Is there a newcomer visibility mechanism, and who pays for it?

**E. Motivation ethics gate (reuse the skill's red-line tests)**
15. Goals: gain-framed, opt-in, achievable, with a visible count = OK. Loss-framed log-off prompts, preselected "keep going," streaks that forbid declining, expiring rewards = red.
16. Notifications: do lead pushes show price and competitor count, or only "New job near you!"? Is there a nightly or daily cap?

**F. Due process**
17. For warnings, restrictions and deactivation: is there a reason in-app, a request-review control, evidence upload, a named human review and a stated reply time? Benchmark: 2-week written reply (EU PWD Art 11), Uber Review Center.
18. Does the provider see client reviews before they affect rank? Can they respond or report retaliatory reviews? Does the platform discount suspected-fraud complaints (Uber 2024)?
19. EU-facing products: flag a compliance check against PWD Chapter III (in force through national law from 2 Dec 2026) and P2B Arts 4, 5 and 11.

**G. Recommendations to output (pick what applies)**
- "Show £/$ on the lead card next to credits; show the competitor count; charge only on customer reply or shortlist."
- "Make the cost-per-won-job and net-per-job cards the first thing on the provider dashboard."
- "Add saved replies, an auto first reply, a calendar and quiet hours; pause the response clock outside working hours."
- "Publish the ranking factors and add a personal 'what moves your rank' panel; label boosts."
- "Replace loss-framed prompts with opt-in, gain-framed goals; never penalise declines when details were hidden."
- "Add a reason, review and evidence-upload flow for any restriction, with a stated reply time."
- "Remove expiry on purchased credits, or show the expiry at purchase and remind before it lapses; never auto-buy inside a respond flow."

**Scoring hint for the report:** treat any red in A, B, F or E as a **trust** defect for the supply side, at the same severity as a broken checkout on the demand side. Providers who feel tricked leave or game the system (Rahman 2021; Lee 2015).

---

## Sources

**Company-stated [S]**
- Thumbtack help (via search extracts): [pay for leads](https://help.thumbtack.com/article/pay-for-leads), [Opportunities](https://help.thumbtack.com/article/opportunities), [new pro guide](https://help.thumbtack.com/article/new-pro-guide-1), [set lead prices](https://help.thumbtack.com/article/set-lead-prices), [referral](https://help.thumbtack.com/article/pro-referral-program); [2025 Pro Summit](https://www.thumbtack.com/guide/content/3-takeaways-from-the-2025-pro-summit); community staff posts: [direct leads](https://community.thumbtack.com/discussion/1014/direct-leads), [weekly budget](https://community.thumbtack.com/discussion/comment/6493/), [free leads promo](https://community.thumbtack.com/discussion/778/free-leads-promotion).
- Bark: [US pricing](https://www.bark.com/en/us/sellers/pricing/), [Elite Pro help](https://help.bark.com/hc/en-gb/articles/13177418184476-Elite-Pro), [Starter Pack help](https://help.bark.com/hc/en-us/articles/27901101296412-What-is-the-Starter-Pack), [Trustpilot replies](https://ie.trustpilot.com/review/bark.com?page=3).
- Upwork: [get more Connects](https://www.upwork.com/resources/how-to-get-more-connects), [Connects rollover](https://support.upwork.com/hc/en-us/articles/42460461019155-Connects-balance-rollover-and-history), [Boost](https://support.upwork.com/hc/en-us/articles/4406395531795-Boost-your-proposal), [Boost charges](https://support.upwork.com/hc/en-us/articles/40444950584083-When-and-what-will-I-be-charged-Boosted-Proposals), [Top Rated and Rising Talent](https://support.upwork.com/hc/en-us/articles/211063568-Top-Rated-and-Rising-Talent), [JSS](https://support.upwork.com/hc/en-us/articles/211068358), [JSS announcement](https://community.upwork.com/t5/Announcements/How-Job-Success-Score-is-Calculated/m-p/906255), [identity verification](https://support.upwork.com/hc/en-us/articles/360001176427).
- Fiverr: [levels](https://br.fiverr.com/levels), [achieving levels](https://help.fiverr.com/hc/en-us/articles/360010560118-Achieving-levels), [response rate](https://help.fiverr.com/hc/en-us/articles/360011451678), [Fiverr Ads](https://help.fiverr.com/hc/en-us/articles/360017729338-Fiverr-Ads), [quick responses](https://help.fiverr.com/hc/en-us/articles/10092069817617-Quick-responses-and-auto-replies).
- Airtasker: [US fee structure](https://www.airtasker.com/us/blog/new-fee-structure/), [Connection Fee](https://support.airtasker.com/hc/en-au/articles/360031769372).
- TaskRabbit: [registration fee](https://support.taskrabbit.com/hc/en-ca/articles/360032936511-What-s-the-Registration-Fee), [become a Tasker](https://www.taskrabbit.com/become-a-tasker), [Elite update](https://www.taskrabbit.com/blog/tasker-roundup-6-updates-you-dont-want-to-miss/).
- Airbnb: [Superhost](https://www.airbnb.com/help/article/829), [New Listing Promotion](https://www.airbnb.com/e/new-listing-promotion?locale=en).
- Uber: [Uber Pro terms](https://www.uber.com/us/en/legal/uber-pro-program-terms/), [Pro terms page](https://www.uber.com/us/en/pro/terms/), [promotions](https://www.uber.com/us/en/drive/promotions/), [How Quest works](https://www.uber.com/us/en/blog/how-quest-works/), [Upfront fares 2022](https://www.uber.com/blog/2022-upfront-fares), [fairness in the driver seat](https://www.uber.com/us/en/blog/fairness-in-the-driver-seat/), [deactivation principles](https://www.uber.com/en-US/blog/deactivations-principles/), [NYC Council testimony](https://citymeetings.nyc/city-council/2024-09-27-1000-am-committee-on-transportation-and-infrastructure/chapter/testimony-by-josh-gold-senior-director-of-public-policy-communications-at-uber-on-driver-deactivation-policies).
- UK trades: [Checkatrade join](https://join.checkatrade.com), [MyBuilder help (archived 2023)](https://webcf.waybackmachine.org/web/20231004000209/https://www.mybuilder.com/help/faq-finding-work).

**Peer-reviewed [PR]**
- Lee, Kusbit, Metsky, Dabbish (2015) CHI: [PDF](https://pages.ischool.utexas.edu/hai-files/files/publications/30/2015-CHI_algorithmic_management.pdf), [ACM](https://dl.acm.org/doi/10.1145/2702123.2702548).
- Rosenblat & Stark (2016) IJoC 10: [article](https://ijoc.org/index.php/ijoc/article/view/4892).
- Kellogg, Valentine, Christin (2020) AoM Annals 14(1): [NSF PAR](https://par.nsf.gov/servlets/purl/10195395).
- Wood, Graham, Lehdonvirta, Hjorth (2019) WES 33(1): [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC6380453/).
- Rahman (2021) ASQ 66(4): [Kellogg](https://www.kellogg.northwestern.edu/faculty/research/detail/2021/the-invisible-cage-workers-reactivity-to-opaque-algorithmic-evaluations).
- Dubal (2023) Columbia Law Review: [PDF](https://columbialawreview.org/wp-content/uploads/2023/11/Dubal-On_Algorithmic_Wage_discrimination.pdf).
- Hsee et al. (2003) JCR 30(1): [RePEc](https://ideas.repec.org/a/oup/jconrs/v30y2003i1p1-14.html).
- Countouris & De Stefano (2025) on PWD scope: [SAGE](https://journals.sagepub.com/doi/10.1177/20319525251375028).

**Regulation / enforcement [REG]**
- FTC HomeAdvisor: [case page](https://www.ftc.gov/legal-library/browse/cases-proceedings/1923106-homeadvisor-matter), [Subscription Insider](https://www.subscriptioninsider.com/topics/regulation-and-compliance/ftc-finalizes-order-against-homeadvisor-for-deceptive-marketing).
- FTC gig-work policy statement 2022: [Morgan Lewis](https://www.morganlewis.com/pubs/2022/09/federal-trade-commission-focuses-on-gig-work).
- FTC Uber 2017: [NBC Bay Area](https://www.nbcbayarea.com/news/local/uber-to-pay-20-million-in-lawsuit-over-duping-drivers/23129/).
- EU PWD 2024/2831: [EUR-Lex PDF](https://eur-lex.europa.eu/legal-content/EN/TXT/PDF/?uri=CELEX:32024L2831), [EUR-Lex summary](https://eur-lex.europa.eu/EN/legal-content/summary/working-conditions-in-platform-work.html), [legalcode.md](https://legalcode.md/blog/algorithm-allocate-work-rate-performance-set-pay-deactivate-worker-explanation-human).
- P2B Regulation 2019/1150: [CCPC](https://ccpc.ie/business/?p=38274), [BDK Advokati](https://bdkadvokati.com/p2b-regulation-has-teeth-french-and-italian-regulators-show).
- Amsterdam Court of Appeal 2023: [Fieldfisher](https://www.fieldfisher.com/en/insights/amsterdam-court-of-appeal-rules-in-favour-of-uber-and-ola-cabs-drivers), [Fountain Court](https://fountaincourt.uk/2023/04/amsterdam-court-upholds-appeal-in-algorithmic-decision-making-test-case-drivers-v-uber-and-ola/).

**Practitioner / press / advocacy [H]**
- NYT 2017 summaries: [BHRRC](https://www.business-humanrights.org/en/how-uber-uses-psychological-tricks-to-push-its-drivers’-buttons), [Complex](https://www.complex.com/life/2017/04/uber-5-tricks-keep-drivers-on-road).
- Fired by an App (2023): [PDF](https://cdn.craft.cloud/5cd1c590-65ba-4ad2-a52c-b55e67f8f04b/assets/media/Fired-by-an-App-February-2023.pdf), [NBC](https://www.nbcnews.com/news/asian-america/uber-lyft-drivers-california-say-ve-spontaneously-fired-apps-report-fi-rcna73262).
- Fairwork: [principles](https://fair.work/en/fw/principles/).
- Lead-cost and fee guides: [Housecall Pro](https://www.housecallpro.com/resources/what-is-thumbtack-how-it-works/), [ServiceMag](https://servicemag.org/software/thumbtack), [whito Bark](https://whito.co.uk/trades/tools/bark-cost-uk/), [GTM directory Bark](https://thegtmdirectory.com/tools/bark), [G2 Bark](https://g2.com/products/bark-com/reviews?page=10), [Phonely Angi](https://www.phonely.ai/blog/is-angi-leads-worth-it--what-contractors-really-need-to-know), [Podium Angi](https://podium.com/article/is-angi-worth-it-for-contractors), [Snipework Upwork fees](https://snipework.com/answers/upwork-dynamic-fees-explained), [SellerOS Fiverr](https://sellerosforfiverr.com/guides/fiverr-seller-levels), [Rideshare Guy instant pay](https://therideshareguy.com/all-the-ways-rideshare-drivers-can-get-paid-instantly/), [Rideshare Guy streaks](https://therideshareguy.com/lyft-streak-bonuses-and-uber-consecutive-trip-boost/), [Axios Upfront Fares](https://www.axios.com/2022/07/29/uber-expands-trip-transparency-for-drivers), [TechCrunch Uber 2024](https://techcrunch.com/?p=2627807), [Everlance Thumbtack](https://www.everlance.com/gig-guides/thumbtack-requirements), [AiProposer client signals](https://aiproposer.com/guides/upwork-strategy/upwork-client-signals), [Upwork community rejection](https://community.upwork.com/t5/New-to-Upwork/Rejected-Profile/m-p/493363).
