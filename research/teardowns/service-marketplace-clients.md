# Teardown: the client side of service marketplaces

Scope: TaskRabbit, Thumbtack, Airtasker, Bark, Angi (HomeAdvisor), Fiverr, Upwork, Airbnb Services/Experiences, Uber (as the
on-demand benchmark) and European examples (Checkatrade and MyBuilder UK, Malt FR, Treatwell). Written for the ux-audit skill.
The owner will audit a **local service marketplace** where customers find and hire tradespeople and freelancers. Compiled 2026-10-09.

**Tags.** **[S]** company-stated (help centre, newsroom, filing, shareholder letter) · **[O]** observed, with how · **[PR]** peer-reviewed ·
**[H]** practitioner or third-party claim, trade press, vendor blog, or a working paper/preprint that is not yet peer-reviewed (labelled "WP").
"unknown" or "unverified" means no reliable public source was found. **An [H] value is never the product's real spec.**

**Method and limits.** Built from web search plus direct fetches of first-party pages. Some first-party pages could not be fetched:
TaskRabbit's Happiness Pledge returned 404, Airtasker help returned 403, and thumbtack.com/guarantee plus two Thumbtack posts came back empty.
For those pages, the facts come from search-engine excerpts of the same page and are marked "(excerpt)". Two PDFs could not be parsed (Fradkin &
Holtz's NIM summary and the MIT IDE brief), so their numbers are second-hand. No app was driven. Every [O] is press or forum
observation, not our own session. Help-centre rules change often, and the dates are given where known.

---

## Summary (10 bullets)

1. **Two families, and the leaders are converging on the middle.** "Instant" marketplaces (TaskRabbit, Fiverr packages, Upwork Project Catalog, Angi fixed
   price, Airbnb Services, Uber) show a price and a bookable slot up front. "Request-for-quotes" marketplaces (Thumbtack, Bark, Checkatrade, MyBuilder, Airtasker)
   collect a brief and wait for pros. Both families now add the other's strengths: AI scoping on top of instant listings, pre-set prices and calendars on top of RFQ [S, see per-moment].
2. **Letting the customer choose beats auto-matching for trust.** In January 2025 Angi stopped auto-matching homeowners to pros (about 40% of leads a year earlier). It reported core
   homeowner NPS turning positive for the first time, while network lead volume fell sharply [S, Angi Q1 2025 letter and call].
3. **Instant booking is great for customers, but it can fail on the supply side.** Thumbtack launched Instant Book in 2021 and reported higher customer repeat and retention.
   It removed it in November 2024 because it "wasn't working as intended for pros" [S]. Airbnb reached 60% of bookings via Instant Book by 2017 [S].
4. **Rejection is the costliest friction in request-based flows.** On Airbnb, guests rejected at first were reported 51% less likely to book that trip [H, WP summary]. Request-to-book also opens a door to
   discrimination: in a field experiment, requests from guests with Black-sounding names were about 16% less likely to be accepted [PR].
5. **Hold the money, release it on confirmation, auto-release on a timer.** Airtasker, Fiverr, Upwork and Malt hold funds, then release them when the client approves or after a window passes
   (3 days at Fiverr, 14 days for Upwork fixed-price) [S]. TaskRabbit charges after the task is invoiced [S]. Bark, Checkatrade and MyBuilder leave payment off-platform, which weakens guarantees.
6. **Guarantees are bounded and conditional on staying on-platform.** Examples: Thumbtack money-back up to $1,000 within 45 days [S, excerpt], TaskRabbit up to $10,000 at its discretion [S, excerpt], and Checkatrade £1,000 for 12 months
   [S]. Each requires the job to be booked, contacted or paid through the platform. That is the honest reason to keep messaging and payment in-app.
7. **Show the total price early.** Airbnb made the all-fees-in total the default worldwide in 2025 [S]. Uber says riders request more when they see an exact fare instead of a range [S]. In a
   StubHub field experiment, hiding fees until checkout raised spending, which is why regulators now treat late fees as a dark pattern [PR].
8. **Hide both sides' reviews until both have submitted.** Airbnb's experiment found more reviews, fewer retaliatory 1-star ratings, and more candid text [PR]. Fiverr and
   Airtasker use the same rule with 14-day windows [S]. Ratings still inflate over time on every platform studied [PR], so give the reviewer sub-scores and written prompts, not stars alone.
9. **Repeat use for occasional services runs on saved pros and the home's own calendar.** The tools are favourites ("My Taskers") [S], "post a similar task" [S], recurring cleaning [S], and Thumbtack's home profile with
   seasonal, weather-based suggestions [S]. No platform publishes a client repeat rate. Thumbtack and TaskRabbit give only qualitative claims, so repeat behaviour is unverified.
10. **AI scoping now writes the brief.** Upwork says its job-post generator cut posting time nearly in half and now drafts most new job posts [S]. With Fiverr's Neo, about a third of buyers given recommendations sent a brief,
    converting at nearly 3× the marketplace average [S, earnings call]. Thumbtack (2026) accepts text, photo or voice [S, excerpt]. Airtasker and Thumbtack run inside ChatGPT [S].

---

## 1. Discovery and search: by task or by provider; instant results or quotes

- **TaskRabbit, task first and instant.** The client picks a task category and an address, then sees a list of Taskers with upfront hourly rates. The list filters by date,
  time and price, and each profile shows skills, rate and category-specific reviews [S] ([how it works](https://www.taskrabbit.com/how-it-works); [hire a Tasker](https://support.taskrabbit.com/hc/articles/210861763)).
- **Thumbtack, task first then matched.** The customer answers a few questions about the job and location and then sees matched pros with prices, ratings and filters [H]
  ([Everlance](https://www.everlance.com/gig-work/thumbtack)). Ranking is ML-driven: logistic regression from 2019, later a Deep Cross Network ensemble. In 2020 the team
  found that offline metric gains often did not carry over into A/B wins [S] ([Thumbtack eng](https://blog.thumbtack.com/evolution-of-search-ranking-at-thumbtack-42d0ed8df9a5)).
  A randomisation programme measured position bias, the tendency to contact top-ranked pros more [H, preprint] ([arXiv 2206.11720](https://arxiv.org/abs/2206.11720)). One Make Week experiment let customers filter pros by keywords found in reviews [S]
  ([Thumbtack eng](https://blog.thumbtack.com/how-experiments-guide-growth-at-thumbtack-e0fbf95f06e3)).
- **Instant Match (Thumbtack, launched 2017).** Pros set price, services, availability and travel range in advance, so quotes go out without manual work [S]
  ([Pro Center](https://pro-center.thumbtack.com/?p=22421); launch year from [Contrary](https://research.contrary.com/report/thumbtack) [H]).
- **Angi, by both routes.** Customers can book fixed-price services and pick a time, and Angi sends a pro. They can also request quotes or browse pros [S]
  ([Angi how it works](https://www.angi.com/how-it-works); [2023 app listing, archived](https://webcf.waybackmachine.org/web/20230605061656/https://app.adjust.com/xhvvin)).
  Since January 2025 a pro gets a lead only when the homeowner picks that pro from a list ("homeowner choice") [S] ([Q1 2025 call](https://www.insidermonkey.com/blog/angi-inc-nasdaqangi-q1-2025-earnings-call-transcript-1527881/)).
- **Fiverr and Upwork, provider-as-product.** Fiverr gigs carry up to three packages (Basic, Standard, Premium) [S] ([Fiverr help](https://help.fiverr.com/hc/en-us/articles/360010559138)).
  Upwork's Project Catalog (beta 2020) sells pre-scoped fixed-price projects in tiers and has a side-by-side "Compare tiers" chart [S]
  ([Upwork help](https://support.upwork.com/hc/en-us/articles/4407886651283-How-to-purchase-a-project-in-Project-Catalog)).
- **Airbnb Services (May 2025).** It launched with 10 categories in 260 cities: chefs, photography, massage, spa, training, hair, makeup, nails, prepared meals and catering. Services are bookable instantly, and many have
  an entry offering under $50. No stay is needed [S] ([Airbnb news](https://news.airbnb.com/en-au/2025-may-release-now-you-can-airbnb-more-than-an-airbnb/)).
- **Uber (benchmark).** There is no search. One destination produces one price and one ETA [S] ([Uber upfront fares](https://www.uber.com/en-AU/blog/upfront-fares-anz)).
- **What the evidence says about search.** Algorithmic recruiting recommendations raised fill rates for technical jobs by about 20% on oDesk/Upwork, with no crowd-out. The effect was largest where few applicants would
  otherwise apply [PR] ([Horton 2017, JOLE](https://john-joseph-horton.com/papers/the-effects-of-algorithmic-labor-market-recommendations-evidence-from-a-field-experiment/)).
  On Airbnb, availability tracking and filtering mattered a great deal. Without them, accepted inquiries were estimated to fall 68% and rejections to rise 140% [H, WP; author was an Airbnb employee]
  ([Fradkin 2017](https://ide.mit.edu/wp-content/uploads/2017/07/SearchMatchingEfficiency.pdf)).

**Compared.** For **commodity, time-boxed tasks** (assembly, mounting, cleaning, moving help), the leaders show **real people with real prices and real availability on the first results
screen** (TaskRabbit, Airbnb Services). For **diagnostic jobs** (roof leak, HVAC, renovation), they still collect a brief, but they cap and curate the responses (Checkatrade: up to 3) and let the customer
choose (Angi 2025).

## 2. The request / job-post form

- **Airtasker.** The form asks for a description of exactly what is needed, photos where useful, a specific date and time, and a budget. Tasks that only ask for a quote are not supported, and Airtasker may review lowball budgets [S].
  "Post a similar task" (web) or "Copy task" (app) reuses an earlier post [S] ([Airtasker help](https://support.airtasker.com/hc/en-us/articles/202427844-How-do-I-post-a-task)).
- **TaskRabbit.** The form takes the address (a start and end address for moves), then the task size and details. For cleaning, size is chosen up front. Suggested details include supplies, parking and time or budget limits. For moves, the Tasker's vehicle type is visible before booking [S]
  ([hire a Tasker](https://support.taskrabbit.com/hc/articles/210861763); [moving](https://www.taskrabbit.com/blog/fundamentals-help-moving-full-service-help-moving)). Bookings can be made up to 14 days ahead [S].
- **Bark.** The customer searches for a service and fills in "tell us what you need", then confirms their phone number by SMS before quotes flow [S, fetched] ([Bark](https://www.bark.com/en/gb/how-it-works/)).
- **MyBuilder.** Posting is free. A team reviews each job before it goes live and may phone the poster for missing detail [S, archived] ([MyBuilder 2024](https://webcf.waybackmachine.org/web/20240226165639/https://www.mybuilder.com/how-it-works)).
- **AI scoping.**
  - Upwork's job-post generator cut time to post "nearly in half" [S] ([Upwork IR](https://investors.upwork.com/static-files/e4a256ad-8d31-4683-a02f-878f76f9b076), excerpt). Its OpenAI case study claims an 80% time cut, a different metric [S] ([OpenAI](https://openai.com/pa-IN/index/upwork/)).
    By mid-2025, Uma drafted a majority of new client job posts and lifted successful high-value matches by 8% [S] ([Upwork release](https://investors.upwork.com/news-releases/news-release-details/upwork-evolves-uma-ai-ai-work-agent-advances-human-ai)).
  - Fiverr's Neo (2023) interviews the buyer and builds a brief. Nearly a third of buyers who got Neo recommendations sent a brief, and they converted at nearly 3× the average [S, Q1 2024 call]
    ([MarketBeat transcript](https://www.marketbeat.com/earnings/reports/2024-5-9-fiverr-international-ltd-stock)).
  - Thumbtack's April 2026 AI experience scopes from text, photos or voice [S, excerpt] ([Thumbtack](https://www.thumbtack.com/guide/content/a-first-look-at-our-new-ai-powered-experience)).
  - Airtasker runs inside ChatGPT, filling details and budget, comparing offers and booking, with payment kept on Airtasker [S] ([Airtasker blog](https://www.airtasker.com/au/blog/airtasker-launches-chatgpt-plugin/)).
- **Form length.** No platform publishes its question count or a completion-rate curve, so this is **unknown**. Treat "fewest questions that let a pro price the job" as [H].

## 3. Price display

| Model | Who | What the client sees, and when |
|---|---|---|
| Hourly, upfront rate | TaskRabbit | Each Tasker's hourly rate appears in results. One-hour minimum, then 15-minute increments [S] ([rates policy](https://support.taskrabbit.com/hc/en-us/articles/35682300983181-Tasker-Rates-Minimum-Hours-Policy)). A Service Fee and a Trust & Support fee are added. In CA and MA only a Service Fee appears [S] ([fee](https://support.taskrabbit.com/hc/articles/204940570)). Current percentages: **unverified** |
| Fixed package | Fiverr, Upwork Catalog, Angi fixed price, Airbnb Services | Price per tier. Fiverr adds a buyer service fee at checkout, reported as 5.5% plus $2.50 under $50 [H] ([hireinsouth](https://hireinsouth.com/post/fiverr-pricing)) |
| Customer-set budget, then offers | Airtasker | The customer posts a budget, then Taskers make offers. A connection fee (renamed from booking fee, Aug 2023) ranges A$2.90–34.90 or £1.90–29.90 [S] ([Airtasker](https://www.airtasker.com/blog/uk/cancellation-policy-update/)) |
| Quotes or estimates | Thumbtack, Bark, Checkatrade, MyBuilder | Pro estimates on profiles (Thumbtack), or quotes after the request. Free for customers, because pros pay per lead [S] ([Thumbtack App Store reply](https://apps.apple.com/app/852703300)) |
| Exact upfront fare | Uber | One number before request, recalculated only when the rider changes the trip [S] ([Uber](https://www.uber.com/en-AU/blog/upfront-fares-anz)) |
| Total incl. fees | Airbnb | Default worldwide since 2025. Piloted in 2019, offered as a toggle in 2022, and used by about 17M guests while still a toggle [S] ([Airbnb](https://news.airbnb.com/total-price-display-is-now-standard-globally)) |
| Marketplace fee | Upwork | The client pays a marketplace fee on every payment plus a contract-initiation fee (reported as 3–5% and $0.99–14.99, changed May 2025) [H] ([goLance](https://golance.com/blogs/upwork-fees-explained-2026)) |

- **Evidence.** In StubHub's 50/50 field test, showing fees up front reduced purchases and pushed buyers to cheaper seats. The quality shift accounted for at least 28% of the revenue drop [PR]
  ([Blake et al., NBER w25186 / Marketing Science 2021](https://www.nber.org/papers/w25186)). Secondary write-ups put back-end-fee spending at about 21% higher [H]. Uber reports that riders request more
  with an exact fare than with a range [S] ([Uber](https://www.uber.com/en-AU/blog/upfront-fares-anz)).

## 4. Choosing: profiles, reviews, badges, response time, portfolio, availability

- **TaskRabbit.** Elite badge goes to the top 35% per metro and skill in the US (the UK article says 15%), from submitted invoices ÷ task invitations. Since 2026, client cancellations no longer count against it [S]
  ([Elite](https://support.taskrabbit.com/hc/articles/17958442241933); [2026 update](https://www.taskrabbit.com/blog/taskrabbit-2026-tasker-update-built-from-your-feedback/)). Every Tasker passes ID and criminal background checks [S].
- **Thumbtack.** Top Pro goes to roughly 4% of pros, chosen twice a year on hires, reviews and problem handling [S, Pro Center excerpt]. Reviews sit at the top of the profile [S]
  ([profile 101](https://pro-center.thumbtack.com/stories/profile-101)). Response time is measured 8am–8pm local over a rolling 3 months [S, community moderator]
  ([community](https://community.thumbtack.com/discussion/1898/response-time-front-desk)).
- **Airtasker.**
  - Badges: ID Verified (adds a live biometric face scan from Oct 2024), Police Check, and a "payment method" badge. The payment-method badge only means a method was added, not verified [S]
    ([badges](https://support.airtasker.com/hc/en-au/articles/115010428848)).
  - Completion rate counts the last 20 tasks and excludes cancellations caused by customers (Jul 2025) [S] ([feature hub](https://www.airtasker.com/blog/the-feature-hub-july-2025/)).
  - The help article tells clients to read the offer comment, bio, portfolio, badges, completion rate and reviews, and says there is no obligation to accept [S]
    ([choose](https://support.airtasker.com/hc/en-us/articles/200956050-How-do-I-choose-the-right-Tasker-for-my-task)).
- **Upwork.** Badges are assigned by Upwork, never self-added, and rechecked every two weeks [S] ([badges](https://www.upwork.com/resources/talent-badges-explained); [help](https://support.upwork.com/hc/en-us/articles/211063568-Top-Rated-and-Rising-Talent)).
  - Rising Talent is for strong new freelancers.
  - Top Rated is the top 10%, with Job Success Score ≥90% in 13 of the last 16 weeks.
  - Top Rated Plus is the top 3%.
  - Expert-Vetted is the top 1%.
- **Malt.** Super Malter goes to about 3.6% of regularly active freelancers [S]. A profile with at least 3 recommendations is said to triple contact chances [S, unverified]
  ([Super Malter](https://help.malt.com/hc/en-150/articles/29580493918738-The-Super-Malter-Program); [reviews](https://help.malt.com/hc/en-150/articles/29792237913618-How-do-reviews-and-recommendations-work)).
- **Checkatrade.** Up to 12 checks per member. Profiles show verified reviews, vetting, certifications and years trading. About 45,000 reviews a month are screened for fakes [S]
  ([Checkatrade trust](https://www.checkatrade.com/blog/trust/)).
- **Airbnb Services.**
  - At launch, hosts averaged 10 years' experience. They must pass ID verification and submit licences [S].
  - The help-centre minimum is 2 years' experience, at least 5 photos, and at least 15 portfolio photos for photographers [S] ([Airbnb help](https://www.airbnb.com/help/article/3901)).
- **Evidence on what reviews mean.** Average ratings rose substantially over time on five marketplaces, and much of the rise was inflation rather than better service. When feedback became public, ratings
  inflated [PR] ([Filippas, Horton & Golden 2022](https://john-joseph-horton.com/papers/reputation-inflation/)). So **a 4.9 says little; counts, recency, sub-scores and text say more** [H].

## 5. Booking and scheduling

- **TaskRabbit.** The client picks a Tasker, a day and a time from that Tasker's availability, then taps "Confirm and chat". The booking is final only when the Tasker schedules it in chat [S]
  ([hire](https://support.taskrabbit.com/hc/articles/210861763)). Recurring cleaning auto-schedules 3 future visits at the chosen frequency [S]
  ([recurring](https://support.taskrabbit.com/hc/en-us/articles/360034967812-How-Do-I-Book-a-Recurring-Cleaning-Task)).
- **Thumbtack Instant Book (Feb 2021 to Nov 2024).**
  - Pros published calendars, and customers booked an open slot. There were two variants: jobs, and on-site estimates or service calls [S]
    ([press](https://press.thumbtack.com/announcements/thumbtack-launches-instant-book-to-make-hiring-pros-even-easier/)).
  - Thumbtack reported higher customer repeat and retention, and pros "more than twice as likely" to get reviews [S, no numbers].
  - It was removed on 4 Nov 2024 after pro complaints. The replacement being tested lets pros discuss details, schedule and price before booking [S, fetched]
    ([community](https://community.thumbtack.com/discussion/1613/your-feedback-in-action-we-re-removing-all-instant-bookings)).
- **Airbnb Instant Book.** 60% of bookings and about 40% of listings by mid-2017 [S] ([Skift](https://skift.com/2017/06/14/airbnb-ramps-up-push-to-get-more-hosts-to-choose-instant-booking/)).
  Edelman, Luca & Svirsky recommended more instant booking to reduce discrimination [PR] ([AEJ Applied 2017](https://dash.harvard.edu/bitstream/handle/1/33045458/edelman,luca,svirsky_racial-discrimination-in-the-sharing-economy.pdf?sequence=1)).
  Airbnb later relaxed Instant Book eligibility and estimated 5M more people could use it [S] ([Fortune 2022](https://fortune.com/2022/12/15/airbnb-discrimination-study-finds-evidence-of-racial-bias)).
- **Treatwell.** Customers book a salon slot and choose to pay online or at the venue. Pay-at-venue forms no binding contract with Treatwell [S]
  ([Treatwell T&Cs](https://www.treatwell.de/en/info/booking-terms-and-conditions/); [Salonized](https://help.salonized.com/en/articles/6731219-verandert-de-treatwell-integratie-iets-aan-mijn-salonized-ervaring)).
  One reviewer reports last-minute cancellations when a venue never confirmed [H] ([Capterra](https://www.capterra.co.uk/software/181827/treatwell)).
- **Fiverr and Upwork Catalog.** The delivery clock starts when the buyer submits requirements, not at purchase. On Upwork, missing mandatory requirements for 48h cancels the order with a full refund [S]
  ([Fiverr](https://help.fiverr.com/hc/en-us/articles/37332473202065); [Upwork](https://support.upwork.com/hc/en-us/articles/4407886651283-How-to-purchase-a-project-in-Project-Catalog)).

## 6. Payment: hold, charge timing and fee disclosure

- **TaskRabbit.** Payment is in-app by card after the task, with no cash, and the tip is optional [S] ([how it works](https://www.taskrabbit.com/how-it-works)).
  The Tasker invoices hours worked. The fee lines appear on the receipt [S]. One review reports a one-hour deposit at booking, which TaskRabbit's own pages do not confirm, so it is **unverified** [H] ([Clark](https://clark.com/save-money/taskrabbit-review/)).
- **Airtasker.** When an offer is accepted, the card is charged and the money is held in escrow (Stripe, per one regional article). The Tasker requests payment, the customer releases it, and the payout takes 3–5 business days.
  Money stays held during a dispute [S, excerpt] ([get paid](https://support.airtasker.com/hc/en-au/articles/360024521771-How-do-I-get-paid-after-completing-a-Task); [card charged](https://support.airtasker.com/hc/en-au/articles/115010433128-Why-was-my-card-charged-before-the-start-of-the-task)).
- **Upwork fixed-price.** Each milestone is funded into escrow. The client has 14 days to approve or request changes, then funds release automatically [S] ([milestones](https://support.upwork.com/hc/en-us/articles/44564821903763-Understanding-milestones-on-fixed-price-contracts)).
- **Upwork hourly.** Billing comes from the Work Diary. A client can dispute within 5 days after the billing period, and segments that are manual, idle or missing a memo are excluded from protection [S]
  ([dispute](https://support.upwork.com/hc/en-us/articles/211068588-Client-Disputed-My-Hours); [process](https://www.upwork.com/resources/upwork-dispute-process)).
- **Malt.** The quote must be created and approved on-platform. Prepaid funds sit with a payment operator until the client validates the project. Time-based projects bill monthly from an activity report the client approves [S]
  ([Malt billing](https://help.malt.com/hc/en-150/articles/29540886429586-How-do-billing-and-payments-work-on-Malt)).
- **Angi fixed price.** The customer pays upfront at a set price [S, archived listing]. **Checkatrade** offers optional Checkatrade Pay, which is required for guarantee cover in Scotland [S]
  ([terms](https://www.checkatrade.com/guaranteed-trade-terms)). **Bark, MyBuilder:** payment happens off-platform [S/H].

## 7. Messaging, response time and contact masking

- **Bark.** Pros receive the customer's details only after sending a quote [S, fetched] ([Bark](https://www.bark.com/en/gb/how-it-works/)).
- **MyBuilder.** Contact details are exchanged only when the customer shortlists a pro. Hiring one notifies the others that the job is gone [S, archived] ([FAQ](https://webcf.waybackmachine.org/web/20210116085837/https://www.mybuilder.com/help/faq-finding-builders)).
- **Airtasker.** Questions go in public comments, where contact details, business names and links are banned [S] ([choose](https://support.airtasker.com/hc/en-us/articles/200956050-How-do-I-choose-the-right-Tasker-for-my-task)).
- **Airbnb.** Emails, phone numbers and outside links are hidden in messages until the booking is confirmed. Some hosts report masked numbers being tested in the US [H]
  ([strspecialist](https://strspecialist.com/how-to-send-number-on-airbnb); [community](https://community.withairbnb.com/t5/Help/Telephone-number-on-listing-page/m-p/426949)).
- **Checkatrade and Thumbtack.** The first contact must go through the platform for the guarantee to apply [S] ([Checkatrade terms](https://www.checkatrade.com/guaranteed-trade-terms); Thumbtack guarantee, excerpt).
- **TaskRabbit.** The chat thread is where details and arrival time are confirmed [S]. Whether phone numbers are masked is **unverified**.
- **Response speed.** Thumbtack's Pro Rewards defines response rate as the share of leads answered within 1 hour, with 65% and 75% thresholds for the higher tiers [S, community post]
  ([community](https://community.thumbtack.com/discussion/comment/711)). Across 2,241 US firms, many web leads waited more than a day for a reply, and firms answering within an hour were far likelier to qualify the lead
  [H, HBR 2011; the exact multipliers come from vendor-linked studies] ([Oldroyd et al.](https://scholarsarchive.byu.edu/facpub/9711)).
- **Read receipts.** No platform documents them for clients, so this is **unknown**.

## 8. During the job: tracking, status, check-in

- **Uber is the gold standard.**
  - Live Activities on the iOS lock screen and Dynamic Island show ETA, car, plate and status [O, press] ([Engadget](https://www.engadget.com/uber-ride-tracker-iphone-lock-screen-060908235.html)).
  - An optional 4-digit PIN confirms the right driver before the trip starts (US and Canada, Jan 2020) [S/O press] ([WAFB](https://www.wafb.com/2020/01/07/uber-now-offering-pin-code-safety-feature-all-riders)).
- **Service marketplaces mostly have no live status.** TaskRabbit relies on chat for the arrival time [S]. Fiverr shows order statuses (In progress, Delivered, In Revision, Complete) [S]
  ([Fiverr](https://help.fiverr.com/hc/en-us/articles/37332473202065)). Upwork shows the Work Diary for hourly work [S]. A Tasker "on my way" or check-in status at TaskRabbit or Thumbtack is **unverified** (not found in public docs).

## 9. Completion and release of payment

- **Fiverr.** The buyer has 3 days to accept or request revisions, and can extend the review by up to 5 days. The order auto-completes after 3 days (14 for shipped gigs) [S] ([Fiverr](https://help.fiverr.com/hc/en-us/articles/37332473202065)).
- **Upwork.** Approval is due within 14 days, then funds release automatically [S]. **Airtasker:** the Tasker requests payment and the customer releases it [S]. **Malt:** the client validates [S].
- **TaskRabbit.** The Tasker submits an invoice of hours and agreed expenses, the client is charged, and the client can tip afterwards [S]
  ([TaskRabbit blog](https://www.taskrabbit.com/blog/how-pricing-works-on-taskrabbit-and-what-it-means-for-your-earnings/)).

## 10. Reviews

- **Two-sided, blind until both submit.**
  - **Airtasker:** 14 days from release. Reviews go public when both are in or when the window ends. Sub-ratings cover Communication, Punctuality, Eye for Detail and Efficiency [S]
    ([how reviews work](https://support.airtasker.com/hc/en-au/articles/227072627-How-do-reviews-work); [leave a review](https://support.airtasker.com/hc/en-us/articles/115010267547-My-task-is-done-How-do-I-leave-a-review)).
  - **Fiverr:** 14 days, or 30 in some tech and marketing categories. Reviews are hidden until both submit or the window closes. Clients get a 20-minute edit grace period [S]
    ([Fiverr reviews](https://help.fiverr.com/hc/en-us/articles/37552617231761-Reviews-and-ratings-for-clients)).
  - **Uber:** both sides rate 1–5. A rating below 5 asks why. Ratings are anonymous averages, and a driver's is the mean of the last 500 [S] ([Uber help](https://help.uber.com/h/bfea011b-3fde-4647-8b4a-5cc1bbc37899)).
- **One-sided, tied to a verified job.** MyBuilder feedback is linked to the posted job, cannot be anonymous, and allows a tradesperson reply [S, archived]. Malt clients rate 1–5 with a comment only after completion, and cancelled projects get no review.
  Malt also allows off-platform "recommendations" that carry less ranking weight [S] ([Malt](https://help.malt.com/hc/en-150/articles/29792237913618-How-do-reviews-and-recommendations-work)).
  Upwork Catalog rates six attributes: skills, quality, availability, deadlines, communication and cooperation [S].
- **Evidence.**
  - In Airbnb's 2014 simultaneous-reveal experiment, reviewing rose, retaliation fell and ratings were slightly lower, but adverse selection did not improve [PR]
    ([Fradkin, Grewal & Holtz, Marketing Science 2021](https://pubsonline.informs.org/doi/10.1287/mksc.2021.1311)).
  - The authors' summary reports negative text up 12% (guests) and 17% (hosts), and guests' 1-star ratings of hosts down 31% [H, practitioner summary of PR paper]
    ([NIM](https://www.nim.org/fileadmin/PUBLIC/12_NIM_MIR_Issues/MIR_Die_Reputation_Economy/MIR_Die_Reputation_Economy_EN/holtz_fradkin_vol_12_no_2_eng.pdf)).
  - Incentivised first reviews on Airbnb: see [arXiv 2112.09783](https://arxiv.org/pdf/2112.09783) ("More reviews may not help") [H, preprint; not read in full].

## 11. Repeat booking

- **TaskRabbit.** A heart on a past Tasker saves them to "My Taskers / Favorites" for rebooking in any category [S]
  ([favorite](https://support.taskrabbit.com/hc/en-ca/articles/360035493892); [blog 2019, upd. 2024](https://www.taskrabbit.com/blog/how-to-make-the-most-of-the-favoriting-feature)).
  TaskRabbit cites "tens of thousands" of ongoing relationships but publishes no rate [S]. It once charged a lower 15% fee on repeat clients, then dropped it [H] ([Fast Company 2016](https://www.fastcompany.com/3065993/taskrabbit-workers-fee-increase)).
  It also runs a Tasker-side repeat-client incentive [S] ([T&Cs](https://support.taskrabbit.com/hc/en-us/articles/37036204004493-Top-Tasker-Repeat-Client-Incentive-Terms-and-Conditions)).
- **Airtasker.** "Post a similar task" or "Copy task" [S]. **Upwork:** the contract-initiation fee applies even when rehiring the same freelancer [H] — a small tax on repeat use.
- **Thumbtack home care.**
  - The Setter acquisition (Dec 2020) led to seasonal plans tailored to the home and location, with one-click pro booking, plus a $49/yr specialist membership (May 2022; current status **unverified**) [S]
    ([press 2022](https://press.thumbtack.com/announcements/thumbtack-debuts-first-ever-home-care-experience-to-partner-with-homeowners-in-the-continuous-care-of-their-largest-asset)).
  - The April 2024 "One App for Your Home" added a home profile, AI seasonal and weather-based suggestions, and 15+ goal guides such as babyproofing or preparing to sell [S]
    ([BusinessWire](https://www.businesswire.com/news/home/20240402253139/en/One-App-for-Your-Home-Introducing-a-New-Thumbtack-for-a-New-Generation-of-Homeowners)).
- **Fiverr.** Spend per buyer was $342 in 2025, up 13.3%. Buyers spending over $500 made up 66% of marketplace revenue, while annual active buyers have been declining [S]
  ([20-F FY2025](https://www.sec.gov/Archives/edgar/data/0001762301/000117891326000858/zk2634486.htm)). The value is concentrated in repeat high spenders, not in one-off buyers.
- **Published client repeat rates for local services: none found** (TaskRabbit, Thumbtack, Angi, Bark, Checkatrade). Angi's 10-K gives service requests, not repeat homeowners.

## 12. Cancellations, disputes and guarantees

| Product | Client cancellation | Guarantee | Conditions |
|---|---|---|---|
| TaskRabbit | Free with ≥24h notice. A later cancellation may cost a fee (reported as 1 hour of the rate [H]) [S] | Happiness Pledge, up to $10,000 at discretion. Covers property damage, bodily injury and theft. Not insurance (terms updated Dec 2023) [S, excerpt] ([Pledge](https://support.taskrabbit.com/hc/articles/360035570011)) | Booked and paid on-platform. Many exclusions [H] ([NBC LA](https://www.nbclosangeles.com/news/local/taskrabbits-happiness-pledge-may-not-make-you-so-happy-attorney-says/3178625/?amp=1)) |
| Thumbtack | n/a (customer and pro agree) | Money-back up to $1,000 (notify within 45 days). Property damage up to $100,000 (within 14 days) [S, excerpt] ([guarantee](https://thumbtack.com/guarantee)) | Hired via Thumbtack before work began, within 30 days of the request |
| Airtasker | Task amount refunded. The connection fee may be kept. If the Tasker cancels, the fee returns as credit [S] ([policy](https://support.airtasker.com/hc/en-gb/articles/23416253011865-What-is-the-Cancellation-policy-for-Customers)) | Free dispute resolution, with funds held in escrow [S] | Repeat cancellers may be suspended |
| Angi | — | Happiness Guarantee: project up to the purchase price plus limited damage cover. Caps changed between snapshots ($10k → $2.5k for pre-priced, $50k other) [S, archived 2021–22] ([archive](https://webcf.waybackmachine.org/web/20220927044100/https://www.angi.com/happiness-guarantee.htm)) | Book and pay with Angi. Current terms **unverified** |
| Upwork | — | Fixed-price: escrow plus dispute. Hourly: Payment Protection via the Work Diary [S] | Disputes within the windows above |
| Airbnb Services | Free until 24h before (some hosts choose 3 days). Refund within 10 business days [S] ([Airbnb](https://www.airbnb.com/help/article/1593)) | Refund policy if the service differs materially from the listing [S] | Local time of the listing |
| Checkatrade | — | £1,000 per claim, 12 months, workmanship only [S] ([terms](https://www.checkatrade.com/guaranteed-trade-terms)) | First contact via the platform, or pay via Checkatrade Pay. A customer reports a deposit loss was not covered [H] ([Trustpilot](https://au.trustpilot.com/review/www.checkatrade.com?page=6)) |
| Malt | — | AXA professional liability cover [S] | On-platform quote |

---

## Per-product mini-teardowns

**TaskRabbit (IKEA-owned).** Task → address → list of Taskers with hourly rate, reviews and availability → pick a slot → "Confirm and chat" → Tasker confirms in chat →
invoice of hours after the job → card charged → tip and review → heart the Tasker into "My Taskers". **Strengths:** instant, human results; price per person; a 24h free-cancel rule;
favourites; auto-scheduled recurring cleaning [S]. **Weak spots:** fees are separate lines whose current percentages are hard to find [S]; the final cost is open-ended because hours are billed [S];
the Pledge is discretionary with many exclusions [H].

**Thumbtack.** A few questions → matched pros with estimates, reviews and Top Pro badges → contact one or several → chat → hire. **Strengths:** ML ranking with position-bias
correction [S/H]; home profile with seasonal plans as the repeat engine [S]; AI scoping by text, photo or voice (2026) [S]. **Weak spots:** pros pay per lead, so customers can get several calls; Instant Book was
withdrawn for supply-side reasons [S]; customers are often unclear that pros pay for contact (forum complaints, [H]).

**Airtasker.** Post task (description, photos, date, budget) → public Q&A plus offers → compare offer comment, badges and completion rate → accept (card charged into escrow, plus connection fee) →
Tasker requests payment → customer releases → two-way blind reviews with 4 sub-scores. **Strengths:** escrow; honest badge definitions; reusable posts; ChatGPT integration [S].
**Weak spots:** the offer list puts many prices in front of the client, and a quote-only task isn't allowed, so the customer must guess a budget [S].

**Bark.** Describe the need → SMS verification → pros pay credits to unlock you → quotes arrive by email, phone and Bark messenger → off-platform hire and payment → review. **Strengths:** low effort for the
customer; contact shared only after a quote [S]. **Weak spots:** no payment, escrow or customer guarantee found; reviewers say pros aren't vetted [H]; the lead-sale model rewards speed over fit [H].

**Angi (HomeAdvisor).** Two routes: fixed-price "book now" with a dispatched pro, or request quotes from pros the homeowner picks. **Strengths:** the 2025 move to homeowner choice turned core NPS positive
[S]; upfront pricing built on project cost data [S]. **Weak spots:** a history of auto-matched lead selling, and an FTC order with $7.2M in refunds (2023) over claims to pros about lead quality [S/press]
([SEJ](https://www.searchenginejournal.com/homeadvisor-penalized-by-ftc-for-alleged-false-claims-about-leads/486906/)).

**Fiverr.** Search gigs → compare up to 3 packages → checkout (service fee added) → submit requirements (the clock starts) → status timeline → delivery → 3-day accept, revise or extend → auto-complete →
blind two-way review. **Strengths:** e-commerce clarity; explicit states and timers; Neo brief builder [S]. **Weak spots:** the fee appears at checkout [H]; annual active buyers are declining [S].

**Upwork.** Post a job (AI-drafted) or buy a Catalog tier → proposals with badges and JSS → contract → escrowed milestones or a tracked-hours diary → 14-day review or 5-day dispute window.
**Strengths:** the strongest documented payment protection; recommendations proven to raise hiring [PR]. **Weak spots:** a fee stack (marketplace fee plus initiation fee, even on rehire) [H];
heavy for small jobs.

**Airbnb Services and Experiences.** Browse services near you or at your stay → vetted host page (qualifications, offerings, price) → book instantly → 24h free cancellation → review.
**Strengths:** instant booking by default; total-price display; vetting and portfolio rules [S]. **Weak spots:** the category is new, and no performance data has been published.

**Uber (benchmark).** Destination → exact price → match → live map and lock-screen ETA → PIN → auto-pay → rate and tip. The bar for status visibility and price certainty that service apps rarely meet.

**Europe.** **Checkatrade** sends the brief to up to 3 trades and backs workmanship with a £1k, 12-month guarantee tied to on-platform contact [S]. **MyBuilder** reviews each job by hand, lets tradespeople
"express interest", has the customer shortlist (which exchanges contacts), and notifies the others on hire. It says it turned away more than ⅓ of applicants [S, archived]. **Malt** uses an
on-platform quote, prepaid escrow and client validation, with Super Malter for about 3.6% [S]. **Treatwell** uses a salon calendar with pay-online or pay-at-venue [S].

---

## Patterns the winners share

1. **Every pro has a price and a time.** Even request-for-quote products pre-load the pro's price, availability and travel range (Thumbtack Instant Match), or replace the brief with packages (Fiverr, Upwork Catalog, Angi) [S].
2. **The customer chooses; the platform curates.** Fewer, better options rather than a flood: Checkatrade up to 3, Angi homeowner choice, MyBuilder shortlist [S].
3. **Money is held by the platform and released on a visible clock.** Funds sit in escrow, the client approves, and a timer auto-releases them (Fiverr 3d, Upwork 14d) [S].
4. **One explicit state machine for the order.** Requirements → in progress → delivered → revision → complete, each with a timer the client can see (Fiverr, Upwork) [S].
5. **Badges defined by the platform and recomputed often.** Upwork every 2 weeks, Airtasker completion rate over the last 20 tasks, TaskRabbit per metro and skill [S].
6. **Blind, time-boxed, two-sided reviews with sub-scores** (Airtasker, Fiverr; Airbnb's evidence) [S/PR].
7. **Guarantees that pay for staying on-platform.** Cover applies only to jobs contacted, booked or paid in-app (Thumbtack, Checkatrade, TaskRabbit, Angi) [S].
8. **Repeat use is anchored to a person or a home, not to the app.** Favourites, copy-task, recurring schedules, home profiles and seasonal plans [S].

## Mistakes and anti-patterns

- **Auto-matching and lead selling against the customer's will.** Angi dropped it after homeowner NPS sat negative [S]. HomeAdvisor's FTC case concerned lead-quality claims made to pros [S/press].
- **Forcing instant booking on unwilling supply.** Thumbtack withdrew Instant Book after pro pushback [S]. The fix is pro-controlled availability rules, not a removal of instant booking for customers [H].
- **Fees revealed late.** StubHub evidence [PR], the FTC and EU moves, and Airbnb's correction [S]. TaskRabbit fees as receipt lines are a softer version of the same problem [S].
- **Misleading trust signals.** Airtasker's own help warns that the "payment method" badge doesn't mean verified [S]. Any badge whose meaning a customer can't learn in one tap is an anti-pattern [H].
- **Guarantee small print that misses the real fear.** Checkatrade's covers workmanship, not deposits [S/H]. TaskRabbit's is discretionary and excludes many cases [H].
- **Requests that can be rejected.** Requests can be rejected at a large cost (51% less likely to book [H, WP]), and they enable discrimination (16% gap [PR]).
- **Taxing the repeat.** Upwork charges a new contract fee on rehire [H]. TaskRabbit removed its repeat-client fee discount [H].
- **Unverified reviews.** Feedback should be tied to a real job. MyBuilder, Malt and Fiverr all do this [S].
- **Star-only ratings.** Inflation makes 4.8–5.0 meaningless without sub-scores and text [PR].

---

## Implications for the ux-audit skill: a moment-by-moment recipe

Use this on a local service marketplace. For each moment: **audit** = what to check by driving the product; **redesign** = the default fix.

1. **Entry and search.**
   - Audit: can a customer see real providers, with a price and next availability, within 2 taps of naming a task? [S: TaskRabbit, Airbnb Services]
   - Redesign: offer a task-first search with a provider list. Each card shows price (or "from"), rating with count, a top badge, next free slot and response time [S/H].
   - For diagnostic trades (leaks, electrics), use a short brief first and then show a curated list of no more than 3–5 pros the customer picks from [S: Checkatrade, Angi]. Never sell the request to unpicked pros [S: Angi].
2. **Request form.**
   - Audit: count the questions and the required fields. Check that photos are optional but prompted, and that a quote-only post is possible for complex jobs [S: Airtasker forbids it; H: allow it for diagnosis].
   - Redesign: ask category-specific questions with smart defaults (size S/M/L, date chips, address from profile) [S: TaskRabbit]. Offer an AI "describe it or snap a photo" scoping path [S: Thumbtack 2026, Upwork, Fiverr]. Add "copy last request" [S: Airtasker].
   - Form length targets: **unknown**. Measure step drop-off.
3. **Price.**
   - Audit: does the first price the customer sees equal what they pay? List every fee and the screen where it first appears [PR: StubHub; S: Airbnb].
   - Redesign: show the total including fees by default. Use an exact price for packaged tasks [S: Uber, Fiverr]. For hourly work, show an hourly total with a minimum and an estimate [S: TaskRabbit minimum]. For quotes, show a range from local job data, labelled as an estimate [S: Angi pricing data; H].
4. **Choosing.**
   - Audit: can a customer learn what each badge means in one tap? Are review counts and recency visible? Are sub-scores shown?
   - Redesign: use platform-assigned badges recomputed on a schedule [S: Upwork, TaskRabbit]; ID and background-check badges with plain definitions [S: Airtasker]; portfolio photos required per category [S: Airbnb Services]; response time from measured data [S: Thumbtack]; and a side-by-side compare for quotes and tiers [S: Upwork Catalog].
5. **Booking.**
   - Audit: is the slot confirmed instantly, or can the pro still reject it? How long is "pending", and what does the customer see meanwhile?
   - Redesign: let pros set rules (hours, radius, job types, minimum notice), then instant-book within those rules [S/H: Thumbtack lesson; PR: Edelman].
   - If confirmation is manual, show a countdown SLA and auto-offer alternatives on decline or timeout [H; rejection cost from Fradkin, H/WP].
6. **Payment.**
   - Audit: when is the card charged, who holds the money, and is release automatic? Is that stated on the checkout screen?
   - Redesign: authorise or hold at booking, release on customer confirmation, and auto-release after a visible window (3–14 days) [S: Fiverr, Upwork, Airtasker]. Write one line on checkout: "You pay when the job's done" [S: TaskRabbit-style; H wording].
7. **Messaging.**
   - Audit: is first contact in-app? Are phone and email masked until booking? Is there a response-time promise?
   - Redesign: chat in-app with masked contacts until booked [S: Bark, MyBuilder; H: Airbnb]. Show "usually replies in X", with X measured in waking hours [S: Thumbtack]. Nudge pros to reply within 1 hour [S/H: Thumbtack tiers; HBR 2011].
   - Explain the masking as protection ("guarantee applies to in-app jobs") [S: Checkatrade, Thumbtack].
8. **During the job.**
   - Audit: does the customer know when the pro is coming and whether they arrived?
   - Redesign: add explicit statuses (confirmed → on the way, with ETA → arrived/started → done), a lock-screen live activity or push for "on the way", and an optional arrival code [S: Uber Live Activities, PIN]. For remote work, show the status timeline [S: Fiverr].
   - Service-app precedent for live status is **unverified**, so treat this as a gap the client can win.
9. **Completion.**
   - Audit: who marks the job done? Can the customer dispute it before paying? Is there an auto-release timer, and is it shown?
   - Redesign: the pro marks done and adds photos; the customer confirms or flags a problem; payment auto-releases after N days, with a countdown visible to both sides [S: Fiverr, Upwork, Airtasker]. Place the tip after confirmation [S: TaskRabbit].
10. **Reviews.**
    - Audit: when is the review asked for, is it blind and two-sided, are there sub-scores, and is it tied to a real job?
    - Redesign: ask at confirmation. Keep reviews hidden until both submit or 14 days pass [PR: Airbnb; S: Airtasker, Fiverr]. Use 3–4 sub-scores (punctuality, quality, communication, tidiness) plus text [S: Airtasker]. Accept reviews only from paid jobs [S: Malt, MyBuilder].
11. **Repeat.**
    - Audit: is there a one-tap "book again" with the same pro, a favourites list, and recurring scheduling?
    - Redesign: offer "Book [name] again" on the receipt and in the home tab, plus favourites [S: TaskRabbit]; recurring jobs [S: TaskRabbit cleaning]; a home or asset profile that drives seasonal maintenance reminders with the past pro pre-selected [S: Thumbtack home care]; and never a fee penalty on rehire [H].
    - Pull mechanisms for occasional needs, ranked by fit [H]: (a) a saved pro plus rebook, (b) maintenance reminders tied to the date of the last job (boiler service at 12 months, gutters in autumn), (c) seasonal and weather prompts [S: Thumbtack], (d) a post-job "what's next" for related categories [S: TaskRabbit UK category data].
    - Ethics gate: no fake urgency, and reminders only for real maintenance cycles.
12. **Cancellations and guarantee.**
    - Audit: is the cancellation rule shown before booking and again on the booking screen? Is the guarantee written in one plain line with its cap and its condition?
    - Redesign: free cancellation until a stated cutoff (24h is the common norm [S: TaskRabbit, Airbnb Services]); pro cancellations refund fees as cash or credit [S: Airtasker]; a guarantee badge on checkout linking to 3 bullets: what's covered, the cap, and "book and pay in-app" [S: Thumbtack, Checkatrade, Angi].
13. **Metrics to request from the owner** (none have public benchmarks, so treat all as **unknown**): request → first response time, request → hire rate, share of jobs instantly booked, pro decline rate,
    fee-disclosure screen, review rate within 14 days, 90- and 365-day repeat rate, and favourite → rebook rate.

---

## Sources

Product, help and company pages
- TaskRabbit: [how it works](https://www.taskrabbit.com/how-it-works) · [hire a Tasker](https://support.taskrabbit.com/hc/articles/210861763) · [recurring cleaning](https://support.taskrabbit.com/hc/en-us/articles/360034967812-How-Do-I-Book-a-Recurring-Cleaning-Task) · [rates/minimums](https://support.taskrabbit.com/hc/en-us/articles/35682300983181-Tasker-Rates-Minimum-Hours-Policy) · [Trust & Support fee](https://support.taskrabbit.com/hc/articles/204940570) · [Service fee](https://support.taskrabbit.com/hc/en-us/articles/204411610-What-s-the-Taskrabbit-Service-Fee-) · [Happiness Pledge](https://support.taskrabbit.com/hc/articles/360035570011) · [Elite](https://support.taskrabbit.com/hc/articles/17958442241933) · [2026 Tasker update](https://www.taskrabbit.com/blog/taskrabbit-2026-tasker-update-built-from-your-feedback/) · [favourites](https://support.taskrabbit.com/hc/en-ca/articles/360035493892) · [favouriting blog](https://www.taskrabbit.com/blog/how-to-make-the-most-of-the-favoriting-feature) · [pricing blog](https://www.taskrabbit.com/blog/how-pricing-works-on-taskrabbit-and-what-it-means-for-your-earnings/) · [moving](https://www.taskrabbit.com/blog/fundamentals-help-moving-full-service-help-moving) · [repeat-client incentive](https://support.taskrabbit.com/hc/en-us/articles/37036204004493-Top-Tasker-Repeat-Client-Incentive-Terms-and-Conditions)
- Thumbtack: [search ranking](https://blog.thumbtack.com/evolution-of-search-ranking-at-thumbtack-42d0ed8df9a5) · [experiments](https://blog.thumbtack.com/how-experiments-guide-growth-at-thumbtack-e0fbf95f06e3) · [Instant Match](https://pro-center.thumbtack.com/?p=22421) · [Instant Book press 2021](https://press.thumbtack.com/announcements/thumbtack-launches-instant-book-to-make-hiring-pros-even-easier/) · [Instant Book removal 2024](https://community.thumbtack.com/discussion/1613/your-feedback-in-action-we-re-removing-all-instant-bookings) · [guarantee](https://thumbtack.com/guarantee) · [home care 2022](https://press.thumbtack.com/announcements/thumbtack-debuts-first-ever-home-care-experience-to-partner-with-homeowners-in-the-continuous-care-of-their-largest-asset) · [One App 2024](https://www.businesswire.com/news/home/20240402253139/en/One-App-for-Your-Home-Introducing-a-New-Thumbtack-for-a-New-Generation-of-Homeowners) · [AI 2026](https://www.thumbtack.com/guide/content/a-first-look-at-our-new-ai-powered-experience) · [ChatGPT 2025](https://www.businesswire.com/news/home/20251006760229/en) · [profile 101](https://pro-center.thumbtack.com/stories/profile-101) · [response time thread](https://community.thumbtack.com/discussion/1898/response-time-front-desk) · [Pro Rewards thread](https://community.thumbtack.com/discussion/comment/711) · [App Store](https://apps.apple.com/app/852703300)
- Airtasker: [post a task](https://support.airtasker.com/hc/en-us/articles/202427844-How-do-I-post-a-task) · [choose a Tasker](https://support.airtasker.com/hc/en-us/articles/200956050-How-do-I-choose-the-right-Tasker-for-my-task) · [badges](https://support.airtasker.com/hc/en-au/articles/115010428848) · [feature hub Jul 2025](https://www.airtasker.com/blog/the-feature-hub-july-2025/) · [get paid](https://support.airtasker.com/hc/en-au/articles/360024521771-How-do-I-get-paid-after-completing-a-Task) · [card charged](https://support.airtasker.com/hc/en-au/articles/115010433128-Why-was-my-card-charged-before-the-start-of-the-task) · [cancellation update](https://www.airtasker.com/blog/uk/cancellation-policy-update/) · [customer cancellation](https://support.airtasker.com/hc/en-gb/articles/23416253011865-What-is-the-Cancellation-policy-for-Customers) · [reviews](https://support.airtasker.com/hc/en-au/articles/227072627-How-do-reviews-work) · [leave review](https://support.airtasker.com/hc/en-us/articles/115010267547-My-task-is-done-How-do-I-leave-a-review) · [ChatGPT](https://www.airtasker.com/au/blog/airtasker-launches-chatgpt-plugin/)
- Bark: [how it works](https://www.bark.com/en/gb/how-it-works/) · [third-party summary](https://websiteplanet.com/freelance-websites/bark)
- Angi: [how it works](https://www.angi.com/how-it-works) · [Happiness Guarantee 2022 archive](https://webcf.waybackmachine.org/web/20220927044100/https://www.angi.com/happiness-guarantee.htm) · [app listing 2023 archive](https://webcf.waybackmachine.org/web/20230605061656/https://app.adjust.com/xhvvin) · [Q1 2025 release](https://www.sec.gov/Archives/edgar/data/0001705110/000170511025000041/q12025earningsrelease.htm) · [Q1 2025 call](https://www.insidermonkey.com/blog/angi-inc-nasdaqangi-q1-2025-earnings-call-transcript-1527881/) · [10-K FY2025](https://www.sec.gov/Archives/edgar/data/1705110/000170511026000011/angi-20251231.htm) · [FTC/HomeAdvisor (SEJ)](https://www.searchenginejournal.com/homeadvisor-penalized-by-ftc-for-alleged-false-claims-about-leads/486906/)
- Fiverr: [packages](https://help.fiverr.com/hc/en-us/articles/360010559138) · [order statuses](https://help.fiverr.com/hc/en-us/articles/37332473202065) · [reviews](https://help.fiverr.com/hc/en-us/articles/37552617231761-Reviews-and-ratings-for-clients) · [20-F FY2025](https://www.sec.gov/Archives/edgar/data/0001762301/000117891326000858/zk2634486.htm) · [Q1 2024 call](https://www.marketbeat.com/earnings/reports/2024-5-9-fiverr-international-ltd-stock) · [fee summary (third party)](https://hireinsouth.com/post/fiverr-pricing)
- Upwork: [milestones](https://support.upwork.com/hc/en-us/articles/44564821903763-Understanding-milestones-on-fixed-price-contracts) · [hourly disputes](https://support.upwork.com/hc/en-us/articles/211068588-Client-Disputed-My-Hours) · [dispute process](https://www.upwork.com/resources/upwork-dispute-process) · [badges](https://www.upwork.com/resources/talent-badges-explained) · [Top Rated](https://support.upwork.com/hc/en-us/articles/211063568-Top-Rated-and-Rising-Talent) · [Project Catalog](https://support.upwork.com/hc/en-us/articles/4407886651283-How-to-purchase-a-project-in-Project-Catalog) · [IR letter](https://investors.upwork.com/static-files/e4a256ad-8d31-4683-a02f-878f76f9b076) · [Uma release](https://investors.upwork.com/news-releases/news-release-details/upwork-evolves-uma-ai-ai-work-agent-advances-human-ai) · [OpenAI case](https://openai.com/pa-IN/index/upwork/) · [fees (third party)](https://golance.com/blogs/upwork-fees-explained-2026)
- Airbnb: [Services launch](https://news.airbnb.com/en-au/2025-may-release-now-you-can-airbnb-more-than-an-airbnb/) · [services standards](https://www.airbnb.com/help/article/3901) · [services cancellation](https://www.airbnb.com/help/article/1593) · [total price](https://news.airbnb.com/total-price-display-is-now-standard-globally) · [Instant Book 2017 (Skift)](https://skift.com/2017/06/14/airbnb-ramps-up-push-to-get-more-hosts-to-choose-instant-booking/) · [bias report (Fortune)](https://fortune.com/2022/12/15/airbnb-discrimination-study-finds-evidence-of-racial-bias) · [contact masking (third party)](https://strspecialist.com/how-to-send-number-on-airbnb)
- Uber: [upfront fares](https://www.uber.com/en-AU/blog/upfront-fares-anz) · [ratings](https://help.uber.com/h/bfea011b-3fde-4647-8b4a-5cc1bbc37899) · [Live Activities (Engadget)](https://www.engadget.com/uber-ride-tracker-iphone-lock-screen-060908235.html) · [PIN (WAFB)](https://www.wafb.com/2020/01/07/uber-now-offering-pin-code-safety-feature-all-riders)
- Europe: [Checkatrade guarantee terms](https://www.checkatrade.com/guaranteed-trade-terms) · [Checkatrade trust](https://www.checkatrade.com/blog/trust/) · [MyBuilder 2024](https://webcf.waybackmachine.org/web/20240226165639/https://www.mybuilder.com/how-it-works) · [MyBuilder FAQ](https://webcf.waybackmachine.org/web/20210116085837/https://www.mybuilder.com/help/faq-finding-builders) · [Malt billing](https://help.malt.com/hc/en-150/articles/29540886429586-How-do-billing-and-payments-work-on-Malt) · [Malt reviews](https://help.malt.com/hc/en-150/articles/29792237913618-How-do-reviews-and-recommendations-work) · [Super Malter](https://help.malt.com/hc/en-150/articles/29580493918738-The-Super-Malter-Program) · [Treatwell T&Cs](https://www.treatwell.de/en/info/booking-terms-and-conditions/) · [Salonized on Treatwell](https://help.salonized.com/en/articles/6731219-verandert-de-treatwell-integratie-iets-aan-mijn-salonized-ervaring)

Research
- [PR] Fradkin, Grewal & Holtz (2021), Reciprocity and unveiling in two-sided reputation systems, *Marketing Science* — [INFORMS](https://pubsonline.informs.org/doi/10.1287/mksc.2021.1311) · [SSRN](https://papers.ssrn.com/abstract=2939064) · practitioner summary [NIM](https://www.nim.org/fileadmin/PUBLIC/12_NIM_MIR_Issues/MIR_Die_Reputation_Economy/MIR_Die_Reputation_Economy_EN/holtz_fradkin_vol_12_no_2_eng.pdf)
- [PR] Filippas, Horton & Golden (2022), Reputation inflation, *Marketing Science* — [author page](https://john-joseph-horton.com/papers/reputation-inflation/)
- [PR] Horton (2017), Effects of algorithmic labor market recommendations, *J. Labor Economics* — [author page](https://john-joseph-horton.com/papers/the-effects-of-algorithmic-labor-market-recommendations-evidence-from-a-field-experiment/)
- [PR] Edelman, Luca & Svirsky (2017), Racial discrimination in the sharing economy, *AEJ: Applied* — [PDF](https://dash.harvard.edu/bitstream/handle/1/33045458/edelman,luca,svirsky_racial-discrimination-in-the-sharing-economy.pdf?sequence=1)
- [PR] Blake, Moshary, Sweeney & Tadelis (2021), Price salience and product choice, *Marketing Science* — [NBER w25186](https://www.nber.org/papers/w25186)
- [H, WP] Fradkin (2017), Search, matching and the role of digital marketplace design — [PDF](https://ide.mit.edu/wp-content/uploads/2017/07/SearchMatchingEfficiency.pdf) · [IDE brief](https://ide.mit.edu/wp-content/uploads/2017/07/IDE-Research-Brief_0717.pdf)
- [H, preprint] Demsyn-Jones (2022), Position bias in a marketplace search engine (Thumbtack) — [arXiv 2206.11720](https://arxiv.org/abs/2206.11720) · [H, preprint] Incentivised first reviews on Airbnb — [arXiv 2112.09783](https://arxiv.org/pdf/2112.09783)
- [H] Oldroyd, McElheran & Elkington (2011), The short life of online sales leads, *HBR* — [record](https://scholarsarchive.byu.edu/facpub/9711)
- [H] Contrary Research on Thumbtack — [report](https://research.contrary.com/report/thumbtack) · Everlance — [Thumbtack guide](https://www.everlance.com/gig-work/thumbtack) · Clark — [TaskRabbit review](https://clark.com/save-money/taskrabbit-review/) · NBC LA — [Pledge](https://www.nbclosangeles.com/news/local/taskrabbits-happiness-pledge-may-not-make-you-so-happy-attorney-says/3178625/?amp=1) · Fast Company — [TaskRabbit fees 2016](https://www.fastcompany.com/3065993/taskrabbit-workers-fee-increase)
