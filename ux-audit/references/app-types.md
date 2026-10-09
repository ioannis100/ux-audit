# App types: classify, compare with the category, borrow across categories

Two different jobs, both required in every audit:
1. **Match the category.** Users spend most of their time in other apps and expect yours to work
   the same way (Jakob's law) [H, NN/g]. The category leaders set the baseline: search, checkout,
   booking, feed, player. Deviating there costs clarity.
2. **Differentiate across categories.** The ideas that make a product feel special usually come from
   another category that solved the same *moment* better: a delivery tracker in a hiring app, a streak
   in a savings app, a reveal in a loyalty card. That's where `app-mechanics.md`'s transplant method
   applies.

## 1. Classify (Phase 1, written into the brief)

```
Primary type: <row from §2>       Secondary type(s): <if hybrid, e.g. booking + marketplace>
Traits: two-sided? · money moves? · habit (cadence)? · content/feed? · regulated (health, finance,
kids, gambling)? · B2B/internal? · local/physical service?
Category leaders (same kind, 2–3): <from §2, or the owner's competitors>
Cross-category donors (3–5): <from §3, chosen by this product's deciding moments>
References this pulls in: <classifieds.md if listings by private + business sellers ·
marketplace.md if two-sided services · reward.md money tier if money moves ·
minors rules (reward.md §7) if children plausibly use it · black-ux gate tighter if regulated>
```
Infer it from the live product, not the owner's pitch; when hybrid, audit each part against its own
row. Say the classification and its reasons in the verdict.

## 2. App types: what to recognise, who leads, which moments decide it

Leaders are the names users compare with (brand recognition, not a claim about any specific feature;
verify any feature you cite on the live app or in `research/teardowns/`). "Teardown" = sourced
research exists in this skill.

| Type | Recognise by | Category leaders | Moments that decide it | Teardown |
|---|---|---|---|---|
| Food delivery / restaurant | menu, basket, delivery/pickup | Wolt, Uber Eats, Deliveroo, Domino's | browse → item sheet → basket → checkout → live tracker → reorder | food-ordering |
| Grocery / quick commerce | catalogue, slots, substitutions | Instacart, Getir-style apps, supermarket apps | search, substitutions, slot choice, basket edits, reorder | partial (food) |
| E-commerce / retail | catalogue, PDP, cart | Amazon, Zalando, ASOS, Shopify stores | search and filters, product page, size/fit, cart, checkout, returns | — |
| Travel / stays | dates, guests, listings | Airbnb, Booking.com | search with dates, listing, price total, booking, trip timeline | platform-craft (Airbnb) |
| Mobility / ride-hailing | pickup, driver, ETA | Uber, Bolt, Lyft | request, matching wait, live map, arrival, payment, rating | platform-craft (Uber) |
| Service marketplace | tasks, pros, quotes | TaskRabbit, Thumbtack, Airtasker, Fiverr, Upwork | request, quotes, choose, book, job status, complete, review, rebook | service-marketplace-* |
| Booking / appointments | slots, calendar, providers | Treatwell, OpenTable, Resy, Calendly | slot picking, confirmation, reminder, reschedule, no-show | food-ordering (booking) |
| Fintech / banking / payments | balance, transfers, cards | Revolut, Monzo, Cash App, Apple Wallet | home balance, send money, confirmation, card controls, spend feed | fintech |
| Investing / crypto | portfolio, orders | Robinhood, Trading 212, Coinbase | portfolio view, order ticket, confirmation, risk friction | fintech (+ R3/R7 red lines) |
| Insurance | quote, policy, claim | Lemonade-style apps, incumbents' apps | quote form, plan compare, claim filing, claim status | — |
| Health / telemedicine | symptoms, clinicians, records | NHS App, Doctolib, Zocdoc | booking, intake form, visit, results, prescriptions, privacy | — |
| Fitness / wellness / habit | workouts, rings, streaks | Strava, Apple Fitness, Headspace, Calm | first session, daily goal, progress, streak forgiveness, recap | habit-wellness |
| Learning / education | lessons, progress | Duolingo, Khan Academy, Coursera | first lesson, feedback per answer, progress path, review | habit-wellness (+ Duolingo run) |
| Social / feed | posts, followers, likes | Instagram, TikTok, BeReal, X | feed, post creation, reactions, notifications, stopping cues | social-feed |
| Messaging / community | chats, groups | WhatsApp, Discord, Slack | send, delivered/read states, notifications, search history | social-feed (partial) |
| Dating | profiles, matching | Hinge, Bumble, Tinder | profile building, discovery, match moment, first message, safety | — |
| Streaming / media | catalogue, player | Netflix, Spotify, YouTube | home rows, continue watching, player controls, recommendations, downloads | — |
| News / publishing | articles, paywall | NYT, BBC, Medium | reading, saving, paywall timing, notifications | — |
| Games | levels, rewards, store | Clash Royale, Candy Crush, Royal Match | FTUE, core loop feedback, rewards, progression, store (red lines) | games-reward |
| Productivity / SaaS / tools | docs, tasks, projects | Linear, Notion, Figma, Things | create, edit, keyboard flow, collaboration, sync, empty states | platform-craft (partial) |
| B2B dashboard / admin / internal | tables, filters, roles | Stripe Dashboard, Linear, Shopify admin | data density, filters, bulk actions, errors, permissions | — |
| Jobs / recruiting | listings, CVs, applications | LinkedIn, Indeed, StepStone, Upwork (freelance) | search, job detail (salary), apply, status after applying, alerts within minutes | classifieds-* (jobs), service-marketplace (Upwork) |
| Real estate portal | listings, map, enquiries, agents | Rightmove, Zoopla, Idealista, Zillow | map + draw search, commute time, listing facts (energy class), affordability, saved searches, enquiry | classifieds-* |
| Motors classifieds | make/model, km, dealers | AutoScout24, mobile.de, Auto Trader UK | make/model search, price label, listing facts, finance, test-drive/reservation | classifieds-* |
| General classifieds (multi-category) | many categories, private + business sellers, paid boosts | Leboncoin, OLX, Kleinanzeigen, Gumtree, Craigslist, Facebook Marketplace, Vinted | search + filters with counts, card, contact and scam safety, posting from a photo, VIP/TOP, alerts | classifieds-* |
| Events / ticketing | events, seats, tickets | Dice, Ticketmaster, Eventbrite | discovery, seat/price choice, all-in price, wallet ticket, entry | — (FTC fee rule applies) |
| Smart home / IoT / companion app | devices, pairing | Apple Home, Google Home, Sonos | pairing, device state, controls, automations, failure recovery | — |
| Marketing / landing page | hero, CTA, sections | Stripe, Linear, Apple product pages | 5-second clarity, proof, CTA, scroll restraint, form | landing-pages.md |
| Government / utilities / civic | forms, accounts, payments | GOV.UK, NHS App, utility portals | eligibility, long forms, document upload, status, payments | — |

Rows without a teardown are classification and leader names only: the auditor walks the leaders'
same moments where reachable and cites what it observes ([O]), or uses `benchmark-apps.md` §3 rules.

## 3. Cross-category donors by moment (where the creative ideas come from)

Pick this product's 5–8 deciding moments, then look **outside its category** for the app that does
each moment best. The playbook (`benchmark-apps.md` §3) holds the specs; `app-mechanics.md` the
mechanics.

| Moment (any product) | Strong donors from other categories |
|---|---|
| First value before an account | Airbnb (browse), Duolingo (a lesson before sign-up), Wolt app (guest checkout summary) |
| Onboarding that personalises | Duolingo (goal + level), Headspace (intent), Spotify (taste picks) |
| Waiting for something real | Domino's tracker, Uber (live map), Apple order status, WhatsApp ticks |
| Searching and filtering | Airbnb (expanding Where/When/Who), Linear (⌘K), Spotify (instant results) |
| Choosing between options | Apple (compare), Upwork Catalog tiers, Booking-style totals |
| Money confirmation | Apple Pay (calm check + haptic), Revolut (number roll), Monzo (instant spend push) |
| Progress toward a goal | Apple rings, Duolingo path, Starbucks stars, LinkedIn-style profile strength |
| Reward and celebration | Duolingo (lesson end), Clash Royale (fixed reveal), Strava (PRs, kudos) |
| Coming back with no task | Duolingo (streak + freeze), Spotify (Discover Weekly slot), Photos (memories), Thumbtack (home maintenance) |
| Social proof and reputation | Strava kudos, Airbnb blind reviews, Superhost-style published tiers |
| Recovery from errors | Candy Crush (spring-back), Cash App remedies, Royal Match (free reshuffle) |
| Repeat purchase / rebooking | Domino's "your usual", Uber Eats reorder, TaskRabbit "book again" |
| Empty states | Slack/Headspace style: one action + personality in the brand's voice |
| Small details | Duolingo push button, Wolt steppers, Apple sheets (`micro-interactions.md` §9) |

## 4. The creative method (experience-director step 4b)

1. **Same category first:** for each deciding moment, what do the 2–3 category leaders do that users
   will expect here? Gaps are clarity findings (Jakob's law), not inspiration.
2. **Then across categories:** for each of the top 3–5 moments, take **at least two donors from other
   categories** (§3) and translate each with the transplant method (keep the mechanism, change the
   surface and cadence; `app-mechanics.md` §2).
3. **Three strengths per idea:** *safe* (a small adaptation inside today's UI), *adapted* (the
   mechanism rebuilt for this product), *bold* (the version that would make people talk about it). The
   bold one still passes the ethics gate; a persuasive one goes through the Black gate.
4. **Fit test** each: the job, the cadence (habit-zone gate), the emotional context, the data the
   product really has, the cost to build.
5. **Rank** by impact × ease; keep the top 5. Label each **same-category** or **cross-category
   (donor: app, its category)**, so the owner sees both what the market expects and what would set
   the product apart.
