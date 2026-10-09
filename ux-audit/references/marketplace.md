# Service marketplaces: auditing both sides

For products where clients find and hire providers (trades, home services, freelancers, beauty,
tutoring, care): TaskRabbit, Thumbtack, Airtasker, Bark, Angi, Checkatrade, MyBuilder, Fiverr,
Upwork, Malt, Airbnb Services, Uber as the on-demand benchmark. Evidence and sources:
`research/teardowns/service-marketplace-clients.md`, `…-providers.md`, `…-trust.md`. Tags as in
`reward.md` (+ [LAW] statute, [ENF] enforcement). Phase 0 of `SKILL.md` sets up both sides.

## 1. What decides a service marketplace (the facts every rule rests on)

1. **Two models are converging.** Instant products show a price and a bookable slot up front
   (TaskRabbit, Fiverr packages, Angi fixed price, Uber); request-for-quote products collect a brief and
   wait for pros (Thumbtack, Bark, Checkatrade, Airtasker). Each is adding the other's strengths [S].
2. **Choice beats auto-matching for trust.** Angi stopped auto-matching homeowners to pros in Jan 2025
   (~40% of leads had been auto-matched); homeowner NPS turned positive for the first time, at the cost
   of lead volume [S].
3. **Instant booking helps clients and can fail providers.** Thumbtack added Instant Book in 2021 and
   removed it in Nov 2024 after pro complaints [S]; Airbnb reached 60% instant bookings by 2017 [S].
   Design both sides at once.
4. **Rejection is the costliest client moment.** Airbnb guests rejected at first were reported 51% less
   likely to book that trip [H, working paper]; request-to-book also enables discrimination (16% lower
   acceptance for Black-sounding names, Edelman, Luca & Svirsky 2017) [PR].
5. **The first price must be the total.** Fees shown only at checkout raised spending in a StubHub field
   experiment [PR]; Airbnb was made to include mandatory fees (EU CPC 2019) [ENF] and made the total its
   worldwide default in 2025 [S]; UK CMA drip-pricing investigations (2025) [ENF].
6. **Hold the money, release on confirmation, auto-release on a timer** (Airtasker, Fiverr 3 days,
   Upwork fixed-price 14 days) [S]. A platform holding client money needs a licensed payment provider
   (EBA Q&A 2020_5354) [ENF, M]. Off-platform payment weakens every guarantee.
7. **Guarantees are capped and apply only on-platform** (Thumbtack up to $1,000 money-back in 45 days;
   TaskRabbit up to $10k, discretionary, "not insurance"; Checkatrade £1,000) [S]: that is the honest
   reason to keep messaging and payment in the app.
8. **Reviews inflate** (Filippas, Horton & Golden 2022) [PR]; **blind two-sided reveal** raised review
   rates and cut retaliation (Fradkin, Grewal & Holtz 2021) [PR]. Fake reviews, sentiment-filtered
   reviews and rewards for positive reviews are illegal (US FTC 16 CFR 465 from 21 Oct 2024; EU
   Omnibus 2019/2161; UK DMCC from 6 Apr 2025) [LAW]; Fashion Nova paid $4.2m for suppressing < 4★ [ENF].
9. **Paid placement must be labelled and ranking explained** (EU Omnibus Annex I 11a; P2B Regulation
   2019/1150 Art. 5) [LAW]. DSA Arts. 25–27 and 30–32 don't apply to micro/small platforms, but consumer
   law and P2B do [LAW].
10. **"Verified" must mean what was checked.** The EU fined X €120m (Dec 2025) partly for a payable
    "verified" check [ENF]; criminal-record checks need a legal basis in the EU (GDPR Art. 10) [LAW].
11. **Newcomers need a path.** On oDesk, hiring newcomers and publishing evaluations tripled their later
    earnings (Pallais 2014) [PR]; one positive review removed Airbnb's racial acceptance gap (Cui, Li &
    Zhang 2020) [PR]. Show "New" with real checks, never an empty star bar.
12. **Providers are charged in ways that can hide money.** Pay-per-lead (Thumbtack), credits (Bark,
    expiring after 3 months, auto-bought inside the reply flow) [S], Connects (Upwork, $0.15, expire in a
    year) [S]. Token currencies change choices (Hsee et al. 2003) [PR]. FTC v HomeAdvisor (2023 order,
    up to $7.2M) bans misrepresenting lead quality [ENF].
13. **Opacity is the core provider harm** (Rosenblat & Stark 2016; Lee et al. CHI 2015; Kellogg 2020;
    Wood 2019; Rahman 2021 "invisible cage") [PR]; loss-framed log-off prompts with "keep going"
    preselected (NYT 2017) [H]. EU Platform Work Directive 2024/2831: human review of algorithmic
    decisions, a written reply within 2 weeks; transposition by 2 Dec 2026 [LAW].
14. **Repeat use for occasional needs** comes from saved pros, rebooking and the home's own calendar
    (TaskRabbit "My Taskers", Airtasker "post a similar task", recurring cleaning, Thumbtack home profile
    with seasonal prompts) [S]. No platform publishes a client repeat rate.
15. **AI writes the brief now.** Upwork's job-post generator nearly halved posting time [S]; Fiverr
    buyers who got AI recommendations converted at nearly 3× [S]; Thumbtack accepts text, photo or voice [S].

## 2. Client side: audit → default redesign, moment by moment

| Moment | Audit | Default redesign |
|---|---|---|
| **Entry and search** | real providers with a price and next availability within 2 taps of naming a task? | task-first search; cards with price or "from", rating + count, a defined badge, next free slot, measured response time; diagnostic trades: a short brief, then 3–5 pros the client picks; never sell the request to unpicked pros [S] |
| **Request form** | question count, required fields, photo prompt, quote-only allowed for diagnosis | category questions with smart defaults (size chips, date chips, address from profile); an AI "describe it or snap a photo" path; "copy last request" [S]; measure step drop-off (no public target) |
| **Price** | does the first price equal what they pay? list every fee and the screen it first appears | total including fees by default; exact price for packaged tasks; hourly with minimum + estimate; quote ranges labelled "estimate" from local data [S/PR] |
| **Choosing** | badge meanings in one tap? review count, recency, sub-scores? | badges recomputed on a schedule with plain definitions; each check named and dated; portfolio per category; response time from data; side-by-side compare for quotes [S] |
| **Booking** | instant or can the pro reject? how long "pending", what the client sees | pros set rules (hours, radius, job types, notice), clients instant-book within them; if manual: a visible SLA countdown and alternatives auto-offered on decline/timeout [S/H] |
| **Payment** | when is the card charged, who holds it, auto-release, is it said on checkout? | hold at booking, release on confirmation, auto-release after a visible window; one line on checkout: "You pay when the job's done" [S]; licensed PSP named |
| **Messaging** | first contact in-app? contacts masked until booking, and why? reply-time promise? | in-app chat, masking explained as protection ("guarantee covers in-app jobs"); "usually replies in X" measured; seen/delivered ticks [S] |
| **During the job** | does the client know when the pro comes and if they arrived? | statuses confirmed → on the way (ETA) → arrived → done; a push or Live Activity for "on the way"; optional arrival code [S Uber]; a gap most service apps leave open |
| **Completion** | who marks done? dispute before paying? timer shown? | pro marks done with photos; client confirms or flags with **equal visual weight**; auto-release countdown visible to both; tip after confirmation [S] |
| **Reviews** | when asked, blind, sub-scores, tied to a paid job? | ask at confirmation with one reminder; hidden until both submit or 14 days; 3–4 sub-scores + text; only from completed jobs [PR/S] |
| **Repeat** | one-tap "book again", favourites, recurring? | "Book Maria again" on the receipt and home; favourites; recurring jobs; maintenance reminders from the last job's date (boiler at 12 months, gutters in autumn); related next jobs [S/H] |
| **Cancellation and guarantee** | rule shown before booking and on the booking? guarantee in one line with cap and condition? | free cancellation until a stated cutoff (24 h common) [S]; pro cancellations refund fees; guarantee badge → 3 bullets: what's covered, the cap, "book and pay in-app" |
| **Dispute** | taps to open one from a booking; funds frozen; timeline stated | ≤ 2 taps, funds frozen, timeline and outcome options, escalation to ADR named [S/LAW] |

## 3. Provider side: the pass to run (needs an owner-provided provider session)

- **A. Map the money.** Every way the provider pays (lead fee, credits, subscription, commission, boost,
  ads, registration, verification, payout fee) and **when** it fires (view, contact, reply, shortlist,
  hire, payout). Is the **money** amount visible where they decide? Credits: expiry shown before
  purchase? any auto-buy? Does the UI show cost per lead, cost per won job and net per job?
- **B. Lead card.** Before spending: scope, budget/size, distance, timing, client verification and
  history, lead age, and **how many providers already got it**. Any "ready to hire" / "X% convert"
  claim needs substantiation (FTC HomeAdvisor). One-tap "report this lead" with published refund criteria.
- **C. Speed and availability.** Response metrics with their definitions and windows shown where the
  metric is; saved replies, auto first reply, a calendar that stops leads, quiet hours/vacation that
  pause the clock. Declining without penalty, or the full job shown before a scored decision.
- **D. Ranking and tiers.** A plain "how ranking works" page incl. whether payment affects position (P2B
  Art. 5); the provider's own rank drivers; tier criteria, window, cadence, grace period and demotion in
  the product; no trust badge sold; a newcomer path (and who pays for it).
- **E. Motivation ethics gate.** Gain-framed, opt-in, achievable goals with a visible count are fine;
  loss-framed log-off prompts, preselected "keep going", streaks that forbid declining, expiring rewards
  are red. Lead pushes show price and competitor count, with a daily cap.
- **F. Due process.** Warnings, restrictions, deactivation: reason in-app, request review, evidence
  upload, named human review, stated reply time (EU PWD: 2 weeks). Providers see reviews before they
  affect rank and can respond or report retaliation.

Treat a red in A, B, E or F as a **Trust** defect on the supply side, as severe as a broken checkout on
the demand side: providers who feel tricked leave or game the system (Rahman 2021; Lee 2015) [PR].

## 4. Red-line tests (marketplace, M1–M12; add to `reward.md` §7)

| # | Test (a few minutes of driving) | Fail = | Basis |
|---|---|---|---|
| M1 | **Fee:** first price shown → final confirmation without extras | any increase not chosen by the user (drip pricing) | Omnibus/CRD [LAW]; Airbnb CPC [ENF]; StubHub [PR] |
| M2 | **Sponsored:** result order vs "how we rank"; boosted cards | a boosted card without a label; no ranking explanation | Omnibus Annex I 11a, P2B Art. 5 [LAW] |
| M3 | **Review provenance:** policy within one tap; review only after a completed booking | reviews from non-customers; no provenance note | Omnibus 7(6) [LAW]; FTC 465 [LAW] |
| M4 | **Gating:** answer the satisfaction pre-question both ways (test accounts) | unhappy → support, happy → public review | FTC 465.7; Fashion Nova [ENF] |
| M5 | **Blind reveal:** as one side, try to read the other's review first | visible before you submit | Fradkin et al. [PR] |
| M6 | **Badge:** each "Verified / Pro / Top / Insured" → its definition and date | a badge not backed by the check, or sold | X €120m [ENF]; Care.com [POP] |
| M7 | **Guarantee:** badge numbers vs terms | any mismatch; "fully protected" without limits | consumer law [LAW] |
| M8 | **Off-platform:** send a phone number in chat before and after booking | silent deletion; no reason given; blocked after booking | Gu & Zhu 2021 [PR]; transparency |
| M9 | **Scam pattern:** send "pay by bank transfer to IBAN …" | no warning, no report option | trust & safety practice [S] |
| M10 | **Dispute:** taps from a completed booking; funds frozen; deadline | > 2 taps or no freeze/deadline | Airtasker [S]; P2B complaints [LAW] |
| M11 | **Provider money:** money value beside credits; expiry; auto-buy; shared-lead count | credits without money value; expiring paid credits; auto-buy inside reply; shared lead without count | Hsee 2003 [PR]; Bark [S]; reward.md R6 |
| M12 | **Provider pressure:** declines, log-off prompts, deactivation | penalised blind declines; loss-framed "keep going" preselected; deactivation without reason or human review | Lee 2015 [PR]; NYT 2017 [H]; EU PWD [LAW] |

Identity cues: check what client data (name, photo, address) a provider sees **before** accepting;
hide identity until acceptance where possible (discrimination research above).

## 5. Pull, per side

- **Clients (occasional):** saved pro + rebook, maintenance reminders tied to the last job's date,
  seasonal/weather prompts, related next jobs, a home or asset profile. No streaks. Reminders only for
  real maintenance cycles.
- **Providers (daily):** lead quality and money clarity first; then mastery: published tiers with grace
  periods (Airbnb Superhost, Fiverr), earnings that roll, a "what moves your rank" panel, saved replies.
  Gain-framed, opt-in goals only.

## 6. Black tier for marketplaces (pass `black-ux.md` §2; examples)

Passing when true and gated: "2 pros are reviewing your request" (live count); "Maria has 2 slots left
this week" (real calendar); "Your request closes in 24 h unless you choose a pro" (a real expiry with
an easy extend); a local provider ranking with published criteria and opt-out; a gain-framed provider
goal ("3 more 5★ jobs to Top Pro") with a grace period.
**Never:** fake viewer counts or timers; fees first shown at checkout; unlabelled paid ranking; review
gating, seeded or rewarded reviews; a "verified" badge for sale; selling a request to pros the client
didn't pick; credits that hide money or expire to force spending; auto-buying credits inside a reply;
loss-framed log-off prompts; penalties for declining jobs whose details were hidden.

## 7. Output additions

- **Scorecard per side:** the experience scores for clients and for providers, then the overall (the
  provider side under "Not checked" if no session was given).
- **Metrics to request from the owner** (no public benchmarks exist): request → first response time,
  request → hire rate, share instantly booked, provider decline rate, review rate within 14 days,
  90/365-day client repeat rate, favourite → rebook rate, provider cost per won job, provider 90-day
  retention.
