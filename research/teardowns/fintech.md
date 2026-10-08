# Fintech teardown: Revolut, Monzo, Cash App, Phantom (+ Robinhood as a cautionary case)

Research for the ux-audit skill's "experience director" direction (HANDOFF.md §1). Goal: what the most-used money apps do at each moment that people *feel*, why it works, and how to transplant it to apps that have nothing to do with money (restaurant ordering is used as the running example).

**Tags.** **[S]** company-stated (blog, help centre, press release, filing). **[O]** observed (says how). **[H]** practitioner or third-party claim. "unknown" = no public source found; numbers are never estimated.

**Method and limits (read before trusting the specs).** Sources were gathered by web search on 2026-10-07. In this session the egress proxy blocked monzo.com, phantom.com, revolut.com, cash.app, prototypr.io and YouTube, so pages were read through search-result extracts, not in full, and no teardown-video transcripts or device sessions were possible. As a result, **almost every motion, haptic and sound duration below is "unknown"**: none of these four companies publishes its animation curves or haptic patterns. The rules in the playbook give *suggested starting values* taken from platform defaults (SwiftUI spring presets, Material 3 motion tokens) and label them as such; they are not measurements of these apps. Filling the [O] gaps needs a screen recording at 60/120 fps on a device (see "Gaps" at the end).

---

## 1. Monzo

**Core loop:** tap the card → instant notification with merchant name, logo and category → open the app to see the feed and balance → move money into Pots or budgets → repeat.
**Traction [S]:** 12m+ customers, 2.4m added in FY2025, weekly active customers up from 5.4m to 6.9m, and 67% of new customers joined through word of mouth ([Monzo Year in review 2025](https://monzo.com/annual-report/2025), [Marketing Week](https://www.marketingweek.com/monzo-1bn-revenue-marketing-spend/)).

### Signature moments

**1. The hot coral card (identity object)**
- *Sees/feels:* a card so bright that strangers ask about it. The 2020 card has the coral "running through the whole card, not just the surface", and card details moved to the back [S] ([Monzo US blog](https://monzo.com/us/blog/2020/12/16/monzo-us-blog-personalized-cards-have-landed)).
- *Spec:* physical object, no motion. Monzo says factory staff wear tinted glasses because the colour is so bright [S] (same post). Origin: designer Hugo Cornejo took the colour from his coral Nike trainers to signal "alpha" status [H] ([UX Collective](https://uxdesign.cc/is-hot-coral-a-feature-or-a-liability-a-closer-look-at-the-colour-of-your-bank-card-fbd2f987d359), [Monzo Community](https://community.monzo.com/t/dont-go-coral-card/3433/12)).
- *Mechanism:* identity and social signalling; the card becomes visible word of mouth.
- *Evidence:* 67% word-of-mouth acquisition [S] (annual report above). No study isolates the card.
- *Transplant:* give a restaurant app's loyalty member one ownable artefact people see in public (a stamp-card design or a cup sleeve in the brand's one "loud" colour), and keep that colour out of every other UI so it means "member".

**2. The instant spend notification (certainty)**
- *Sees/feels:* seconds after a tap-to-pay, a push names the merchant; the feed shows the logo, map and category. Monzo's 2016 Android launch post presented per-transaction alerts and automatic categorisation with "maps, addresses and logos" as core [S] ([Monzo blog, 2016](https://monzo.com/blog/2016/09/29/android)).
- *Spec:* latency unknown (no Monzo engineering post found); push sound and haptic are the OS defaults [H]; in-app feed insertion animation unknown.
- *Mechanism:* certainty and control. The phone confirms what the hand just did, which closes the loop the card terminal leaves open.
- *Evidence:* FCA Occasional Paper 10 found text alerts or app use each cut unarranged-overdraft charges by 5–8%, and both together by 24% (via [Regulation Tomorrow summary](https://www.regulationtomorrow.com/2015/03/fca-paper-on-the-impact-of-annual-summaries-text-alerts-and-mobile-apps-on-consumer-banking-behaviour/)); just-in-time alerts cut charges 21–25% ([FCA OP40](https://fca.org.uk/publications/occasional-papers/occasional-paper-no-40-time-act-field-experiment-overdraft-alerts)); an Icelandic finance app cut NSF fees through easier information access ([Carlin, Olafsson & Pagel, *Review of Finance* 2023](https://profiles.wustl.edu/en/publications/mobile-apps-and-financial-decision-making/)).
- *Transplant:* when the kitchen accepts the order, push "Marco's has your order: 2× margherita, ready ~19:40" within seconds, with the restaurant's logo; never a generic "Order update".

**3. Freeze / Defrost (one-tap control)**
- *Sees/feels:* a toggle on the card screen labelled **Freeze** and **Defrost** [S] ([Monzo help](https://monzo.com/ie/help/getting-started/help-activate-card)); marketing shows a frozen card under a ❄️ heading ([10 magical Monzo features](https://monzo.com/blog/10-magical-monzo-features)). A community user describes the graphic as the card "frosting over" [O: user report, unconfirmed] ([Community](https://community.monzo.com/t/freezing-the-card/33783)).
- *Spec:* animation duration, easing and haptic unknown. Reversible "within seconds" [S] ([2016 post](https://monzo.com/blog/2016/09/29/android)).
- *Mechanism:* control and reversibility. The playful verb ("Defrost") lowers the stakes of a scary moment (lost card) without hiding what happened.
- *Evidence:* Monzo listed instant freeze as feature #1 in 2017 [S] ([Monzo blog](https://monzo.com/blog/2017/02/13/5-features-your-mobile-bank-account-should-have-by-now)). Counter-signal: a user froze by accident and asked for confirmation (Community thread above), so instant toggles need an undo.
- *Transplant:* "Pause my subscription meal plan" as a single toggle with a reversible verb ("Pause / Resume") and a visible state change on the plan card, plus a 5-second undo toast.

**4. Pots and round-ups (saving without effort)**
- *Sees/feels:* spare change from each card payment slides into a named Pot.
- *Spec:* unknown. Rule: round up to the nearest pound [S] ([Monzo blog](https://monzo.com/blog/how-to-save-the-spare-change-with-round-ups)).
- *Mechanism:* default effect plus mental accounting (named, separate jars).
- *Evidence:* customers saved ~£115m in one year through round-ups [S] (same post); £1m soon after "Coin Jar" launched ([Crowdfund Insider](https://www.crowdfundinsider.com/2018/05/133339-monzo-announces-coin-jar-participants-have-saved-more-than-1-million-with-the-feature/)).
- *Transplant:* a coffee app rounds each order's loyalty points up into a named "free-pastry jar" with a visible fill level, so progress happens as a side effect of the normal task.

**5. Gambling block (positive friction)**
- *Sees/feels:* one tap to turn on; turning it off needs a chat with support and a 48-hour cool-off [H] ([Scotsman](https://www.scotsman.com/lifestyle/how-fintechs-are-putting-a-block-on-problem-spending-1404877)); since 2023 users can write themselves a reminder that is shown when the cool-off starts and ends [S] ([Monzo blog](https://monzo.com/blog/weve-improved-our-gambling-block)).
- *Spec:* asymmetric friction: on = instant, off = 48 h (longer options added in 2023) [S].
- *Mechanism:* pre-commitment; protects the future self from an impulse.
- *Evidence:* 222,993 activations, only 8% disabled [H] ([Gambling Insider](https://www.gamblinginsider.com/news/9623/over-200000-customers-activate-monzo-gambling-block-since-2018-inception)).
- *Transplant:* a food app offers "late-night ordering lock" or a weekly takeaway budget that is instant to set and has a cooling-off period to lift. This builds trust that keeps people in the app.

**6. Year in Monzo (ritual, with a warning)**
- *Sees/feels:* a Spotify-Wrapped-style spending recap; users pick "nice" or "savage" tone first [H] ([Blackpool Gazette](https://www.blackpoolgazette.co.uk/business/consumer/monzo-wrapped-how-to-find-2024-year-in-review-4911556)).
- *Spec:* story-format cards; timings unknown.
- *Mechanism:* self-reflection, identity, shareability. Monzo aimed for something "customers would want to share" [S] ([Community](https://community.monzo.com/t/year-in-monzo-2024-is-here/172368)).
- *Evidence of harm:* in 2026 *The Guardian* reported a complaint to the Financial Ombudsman after a recap mocked a customer's food-delivery spending ([Freevacy summary](https://www.freevacy.com/news/the-guardian/monzo-under-fire-over-misuse-of-personal-data/7195)).
- *Transplant:* a restaurant app's "Your year at Marco's" celebrates favourites and milestones ("you tried 14 dishes"). It never judges quantity ("you ordered 212 times, maybe cook?").

**7. Customisable Home with "spotlights"**
- *Sees/feels:* a combined feed plus spotlights for balance, bills, spending and budgets; "Edit layout" reorders accounts and Pots [S] ([Monzo blog](https://monzo.com/blog/the-new-and-improved-home-screen)).
- *Spec:* motion unknown. Process: over a year of work, research with 1,000+ customers, rolled out through Labs to 8m+ people [S] ([How we built the new home screen](https://www.monzo.com/blog/how-we-built-the-new-home-screen)).
- *Mechanism:* control, glanceable state. Backlash: some users said transactions moved "an extra tap away" ([Community](https://community.monzo.com/t/get-to-know-your-new-home-screen/151912)).
- *Transplant:* the order-app home shows the live order first, then "order again", then discovery; let regulars pin their usual. Never push the core task below promos.

**8. Video-selfie KYC (consent as a ritual)**
- *Sees/feels:* ID photo, then a short video saying a scripted sentence asking for an account; alternatives exist (text on paper, sign language, AAC) [S] ([Monzo help](https://monzo.com/help/opening-an-account/why-we-ask-for-a-video-when-you-open-a-monzo-account), [Monzo blog 2019](https://monzo.com/blog/2019/08/28/take-a-video-selfie-to-sign-up-for-monzo)).
- *Mechanism:* explanation turns a compliance step into a trust signal ("why we ask").
- *Transplant:* any required friction (age check for alcohol delivery) gets a one-line "why" and an accessible alternative on the same screen.

**Feel of transitions, buttons, money moments.** Monzo's motion principles start with "Less is more": animate only with a reason, because flashy motion everywhere confuses [H] (Monzo designer Aarti D'Cruz, [Prototypr](https://blog.prototypr.io/defining-motion-principles-when-youve-never-done-it-before-ddb658f70777)). Monzo hires dedicated motion designers ([Greenhouse listing](https://job-boards.greenhouse.io/monzo/jobs/6941037)). Send / success / failure durations: unknown.
**Onboarding to "aha":** phone, ID, video selfie "in just a few minutes" [S]; the aha is the first real-time notification after the card arrives. Card delivery time: unknown.
**Pull without a task:** the feed after each payment, salary day, Pots growing, the yearly recap.
**Ethical line:** the 2025 FCA fine of £21.1m for weak onboarding and financial-crime controls (customers with "Buckingham Palace" addresses; 34,000+ high-risk customers signed up despite a restriction) shows that low-friction KYC has limits ([Banking Dive](https://www.bankingdive.com/news/monzo-fined-21-1-million--aml-flaws-fca/752597/)). The harm-free version: fast for the honest majority, with real checks behind it. The gambling block is the model of "pull plus protection".

---

## 2. Revolut

**Core loop:** spend or exchange anywhere → instant notification in local and home currency → open the app (rates, analytics, RevPoints) → hold, exchange, invest → repeat.
**Traction [S]:** 68.3m retail customers at end-2025 (+30%), 16m joined in 2025; "75+ million" later, target 100m by mid-2027 ([Revolut 2025 annual report](https://revolut.com/en-US/annual-report-2025), [Payment Expert](https://paymentexpert.com/2026/03/24/revolut-2025-annual-report/)).

### Signature moments

**1. Spend notification with currency conversion**
- *Sees:* after a card payment abroad, a push shows the local amount and the cost in the home currency [H: user report] ([Revolut Community](https://community.revolut.com/t/feature-to-set-a-reference-currency/247828)); App Store copy promises "instant spending notifications after every card payment" [S].
- *Spec:* unknown.
- *Mechanism:* certainty in an uncertain setting (foreign currency).
- *Evidence:* same alert literature as Monzo #2.
- *Transplant:* a travel-dining app shows the bill in local and home currency with the tip included, at the moment of payment.

**2. One-tap home widgets (Revolut 10)**
- *Sees:* cards and favourite recipients pinned to Home; "move money with one tap" [S] ([Revolut news, Oct 2023](https://www.revolut.com/news/revolut_launches_revolut_10_as_it_targets_primary_accounts_and_passes_35m_customers_worldwide)).
- *Spec:* unknown.
- *Mechanism:* control; fewest taps to the habitual action.
- *Transplant:* "Reorder Friday pizza" as a pinned home widget that opens straight to a pre-filled confirm sheet.

**3. Themes, wallpapers and widgets**
- *Sees:* user-chosen theme and background on Home [S] (same release).
- *Mechanism:* identity and ownership (IKEA effect).
- *Transplant:* let regulars choose the app's accent from the restaurant's palette or set a photo of "their" table.

**4. The card designer with approval**
- *Sees:* a design tool for "Customisable" cards: drawings, emoji or badges, text; a notification when the design is approved or declined; a rejection reason in the Cards tab [S] ([Revolut help](https://help.revolut.com/help/cards/card-order/physical-card/card-personalisation/can-i-personalise-my-card/), [card terms](https://www.revolut.com/en-AU/legal/personalised-and-special-edition-card-terms)).
- *Spec:* unknown.
- *Mechanism:* identity, effort justification, anticipation (approval → delivery).
- *Transplant:* a café lets members draw a mark for their reusable cup; send an "approved, printing now" push, so there is something to wait for.

**5. Selfie in an oval**
- *Sees:* the face inside an oval with live guidance; good lighting, no glasses or hats [S] ([Revolut help](https://help.revolut.com/help/sign-up/why-do-i-need-to-submit-a-selfie/)). Failure case: users stuck in the oval without capture [H] ([Community](https://community.revolut.com/t/selfie-doesnt-work/247731)).
- *Transplant:* any camera step (scan a table QR) needs a live frame, live guidance and a manual fallback after a few seconds.

**6. Watching the live rate**
- *Sees:* exchange rates that move live; users "watch it fluctuate" and exchange when the rate "pops up" [H] (Revolut Community, above).
- *Mechanism:* variable reward and anticipation.
- *Ethical flag:* this is the same loop as trading; fine for currency you need, risky when it drifts into speculation.

**7. RevPoints on spare change**
- *Sees:* points per spend, plus spare change converted into points; redeem for airline miles, stays, discounts [S] ([Revolut news](https://www.revolut.com/news/revolut_launches_revpoints_loyalty_programme_turning_daily_expenses_into_exclusive_rewards/)).
- *Evidence:* "nearly 120 million points" redeemed in the trial [S].
- *Transplant:* points that a diner can see turn into a specific thing ("3 more orders → free tiramisu"), not an abstract balance.

**Feel / money moments:** durations, easing, haptics: unknown. Revolut credits a design system that "absorbs routine decisions" for shipping many products fast [H, vendor view] ([&above](https://www.andabove.com/feed/what-revoluts-design-system-taught-us-about-shipping-fast)).
**Onboarding:** phone number, passcode, ID plus selfie; a third-party guide says the selfie step takes "under a minute" [H] ([Emma](https://emma-app.com/blog/how-do-i-open-a-bank-account-with-revolut-in-the-uk/)). The aha is the first instant notification or first fee-free exchange. Total seconds: unknown.
**Pull without a task:** rates, analytics, RevPoints, Lifestyle offers, home widgets.
**Ethical line:** trading and crypto tabs inside a spending app put speculation one tap from daily money. Scams are the other failure: Revolut ranked 7th among UK receivers of APP fraud per £1m in 2022 data [H] ([Finextra](https://www.finextra.com/blogposting/26054/future-of-payment-review--six-months-on--app-fraud)). The harm-free version: keep speculative surfaces off Home by default and put scam friction on first-time payees.

---

## 3. Cash App

**Core loop:** open to a number → type an amount → choose a $cashtag → Pay → the recipient gets a push and the money right away; Card spending and Offers fill the gaps.
**Traction:** about 58m monthly transacting actives in Sept 2025 and 8.3m primary-banking actives [S via call summaries] ([Q3 2025 summary](https://vectorshift.ai/research/companies/block/earnings/2025-q3); definition of "transacting active" in [Block 8-K](https://www.sec.gov/Archives/edgar/data/1512673/000119312525175456/d942331dex991.htm)).

### Signature moments

**1. The amount-first home**
- *Sees:* tap $, type the amount, then the recipient, then Pay and confirm [H] ([GoBankingRates walkthrough](https://www.gobankingrates.com/money/finance/how-to-set-up-cash-app/)).
- *Spec:* keypad press feedback, digit animation and haptics: unknown.
- *Mechanism:* the task is the home screen, so there is zero navigation before intent.
- *Transplant:* a single-restaurant app opens on "Your usual?" with the last order pre-filled and one big button.

**2. $Cashtag**
- *Sees:* a public handle, ≥1 letter, ≤20 characters [H] (same guide).
- *Mechanism:* identity plus a network effect (the handle travels in bios and invoices).
- *Transplant:* give each customer a shareable "table link" or group-order handle that friends can join.

**3. The Cash Card designer**
- *Sees:* pick colour, stamps or freehand drawing, a pattern tool that repeats a drawing or up to 5 stamps, and a signature; printed on the physical card; redesign costs $5 [S] ([Cash App help: personalize](https://cash.app/help/6554-personalize-cash-app-card), [re-design](https://cash.app/help/11081-re-design-a-cash-card)).
- *Feel:* basic tools, no eraser, undo reverts the last step [H] ([MoneyPantry](https://moneypantry.com/cash-app-card-designs/)).
- *Mechanism:* identity, IKEA effect, endowment.
- *Evidence:* no published study; widely shared on social [H].
- *Transplant:* a bakery's birthday-cake order flow lets people draw the message with a finger and preview it on the cake, then shows "your drawing is being piped" when in production.

**4. Offers (formerly "Boosts")**
- *Sees:* activate an instant discount before paying with the Card at a merchant; offers rotate [H] ([CreditCards.com](https://www.creditcards.com/card-advice/cash-app-boost/)).
- *Mechanism:* variable reward with a clear rule, and a reason to check back.
- *Transplant:* a rotating "today's dish" discount the user activates, with a clear end time that is real.

**5. Payment received**
- *Sees:* the recipient gets a push and the money moves right away [H] (GoBankingRates).
- *Mechanism:* social reciprocity and instant certainty for both sides.
- *Transplant:* in group ordering, each friend's "paid my share" shows up live on the host's screen.

**6. Just-in-time KYC**
- *Sees:* new accounts start "restricted"; the upgrade to verify identity is offered when you first try to pay someone [H] (GoBankingRates).
- *Mechanism:* ask for effort at the moment of motivation.
- *Transplant:* ask for phone and address only when the user first taps "Deliver", never at install.

**7. Moneybot plus a confirmation step**
- *Sees (Nov 2025 release):* an assistant that proposes actions (send money, recurring payment) and acts after confirmation [S/H] ([Cash App press](https://cash.app/press/cash-releases-see-whats-new), [Design Compass](https://designcompass.org/en/2025/12/03/cash-apps-new-design-language-and-ai-moneybot/)).
- *Mechanism:* delegation with a human checkpoint.
- *Transplant:* "Book my usual table Friday?" suggestions that always end on an explicit confirm sheet.

**8. "Releases" as a brand moment**
- *Sees:* a bundled seasonal update: 11 product updates and 150+ improvements, a brighter neon green, the Cash Sans typeface and 650+ new icons [S/H] ([Abduzeedo](https://www.abduzeedo.com/cash-apps-new-design-language-and-ai-assistant-moneybot)).
- *Mechanism:* anticipation and novelty in a utility app.
- *Transplant:* a restaurant's seasonal menu drop as an in-app "release" with a short story, not a silent menu change.

**Feel / money moments:** confirm → sending → success animation, sound, haptic: unknown (no Block design post found). Cash App's design org includes Writing, Hardware and Brand Creative disciplines [S] ([Cash App careers](https://cash.app/careers/interview-prep/ace-the-design-interview)).
**Onboarding:** phone/email → code → optional bank link → $cashtag [H]. Time: unknown. The aha is the first instant send or receive.
**Pull without a task:** incoming payments, Offers rotation, Card spend, Bitcoin and stock tabs.
**Ethical line:** the money "failure moment" is where Cash App was punished. The CFPB ordered $175m ($120m redress + $55m penalty) in Jan 2025, citing no live support agents (pushing victims to fake support sites) and inadequate fraud-dispute investigations ([CFPB](https://www.consumerfinance.gov/about-us/newsroom/cfpb-orders-operator-of-cash-app-to-pay-175-million-and-fix-its-failures-on-fraud)). Lesson: a one-tap send needs an equally clear "something went wrong" path with a human.

---

## 4. Phantom (self-custody crypto wallet)

**Core loop:** connect to an app or receive tokens → preview what will happen → sign → see the balance change → explore, swap, repeat.
**Traction:** 15m MAU and $25bn in self-custody assets at its Jan 2025 Series C [S via [The Block](https://www.theblock.co/post/335305/phantom-wallet-raises-150-million-at-3-billion-valuation)]; reports of ~20m later in 2025 [H].

### Signature moments

**1. Transaction simulation (preview before you sign)**
- *Sees:* before signing, the expected outcome is laid out (what leaves and enters the wallet), with warnings before risky actions [S] ([Phantom blog: acquires Blowfish](https://phantom.app/learn/blog/phantom-acquires-blowfish)).
- *Spec:* layout and motion unknown.
- *Mechanism:* certainty; turns an unreadable blob into a predicted consequence.
- *Evidence:* Blowfish's own numbers: 2.8m scams prevented, 1.3bn transactions scanned [S, self-reported]. Limit: chain state can change between preview and execution (TOCTOU spoofing) [H] ([Spark glossary](https://www.spark.money/glossary/transaction-simulation)).
- *Transplant:* the restaurant checkout shows the outcome, not the inputs: "You'll pay £24.50 now, the courier gets £3 tip, arrives 19:40", above the Pay button.

**2. Message simulation, severity warnings and blocking**
- *Sees:* signed messages are translated into plain outcome; real-time warnings with severity before signing; known scams blocked [S] ([Phantom blog](https://phantom.app/learn/blog/message-simulation)).
- *Mechanism:* protective friction graded by risk.
- *Transplant:* a marketplace app shows an amber note for a first-time seller and a hard block only for confirmed fraud. Don't put the same red banner on everything.

**3. Seedless onboarding**
- *Sees:* sign up with Google/Apple (or email, 2024) and a 4-digit PIN; the recovery phrase still exists but is hidden [S/H] ([Phantom docs](https://docs.phantom.com/phantom-connect), [Forklog](https://forklog.com/en/wp-json/wp/v2/posts/19195)).
- *Mechanism:* reduce the scariest step (24 words + a warning) to a familiar one.
- *Evidence:* design analysis argues Phantom rebuilt "the exact moments where people normally quit" [H] ([925 Studios](https://www.925studios.co/blog/phantom-wallet-design-breakdown)).
- *Transplant:* guest checkout first; offer an account only on the success screen ("save this order for one-tap next time?").

**4. Built-in guardrails for embedded wallets**
- *Sees:* spending limits, domain binding and risk checks; default $1,000 per app per day [S] ([Phantom docs](https://docs.phantom.com/embedded/getting-started-with-phantom-embedded-wallets)).
- *Mechanism:* safety ceiling makes exploration feel safe.
- *Transplant:* a kids' canteen app with a parent-set daily cap shown on every checkout.

**5. Clean home: balances, collectibles, activity**
- *Sees:* token balances, NFTs and recent transactions "without clutter" [H] ([GNcrypto review](https://www.gncrypto.news/news/phantom-wallet-review/)). Swap inside the wallet with a ~0.85% fee [H] (same review).
- *Mechanism:* collection and glanceable state.
- *Transplant:* a "stamps collected" shelf for dishes tried.

**6. Perps inside the wallet (cautionary)**
- *Sees:* since July 2025, long/short on 100+ markets up to 40× leverage via Hyperliquid; 0.05% builder fee per trade [S/H] ([The Defiant](https://thedefiant.io/news/defi/phantom-wallet-adds-hyperliquid-perps-exchange-volume-hits-1-6-trillion-48d90621), [DL News](https://www.dlnews.com/articles/defi/hyerliquid-perps-drive-over-1-bn-volume-to-phantom-wallets/)); ~$20m cumulative builder fees [H] ([Solana Compass](https://solanacompass.com/news/phantom-tops-hyperliquids-builder-program-with-206m-in-fees)).
- *Ethical flag:* the friendly, low-friction wallet UX now fronts a leveraged product; the same feel that builds trust lowers the guard. Not a transplant; a warning.

**Feel / money moments:** sign → pending → confirmed timings, haptics and sound: unknown. Phantom has a ghost brand mascot; no public source on its motion use.
**Onboarding:** social login + PIN; aha = first incoming token or first previewed swap. Time unknown.
**Pull without a task:** token prices, new collectibles, trending lists, airdrops.
**Ethical line:** previews and blocking are the best practice; trending lists and leverage are where the gamified-trading literature (§5) applies.

---

## 5. Robinhood (cautionary case: what regulators punished)

- **Confetti on "firsts":** first deposit, first trade, upgrades. Removed on 31 Mar 2021 and replaced by "floating geometric shapes" [S/H] ([CNBC](https://www.cnbc.com/2021/03/31/robinhood-gets-rid-of-confetti-feature-amid-scrutiny-over-gamification.html), [Bloomberg](https://www.bloomberg.com/news/articles/2021-03-31/robinhood-ditches-its-confetti-animation-following-criticism)). Confetti duration, physics and haptic: unknown.
- **Massachusetts:** the 2020 administrative complaint cited confetti, digital scratch tickets, free-stock rewards, push notifications and "most popular" lists used to "attract and manipulate" inexperienced customers. Settled Jan 2024: $7.5m fine plus changes to digital engagement practices. Robinhood denied it was "gamified" ([ThinkAdvisor](https://thinkadvisor.com/2024/01/18/robinhood-to-pay-7-5m-over-gamification-practices), [Boston Globe](https://www.bostonglobe.com/2024/01/18/business/robinhood-agrees-pay-75-million-settle-complaints-over-its-sales-practices)).
- **FINRA, June 2021:** $57m fine plus $12.6m restitution, at the time the largest FINRA sanction. Causes: false or misleading information to customers, options approvals for ineligible customers, the 2–3 Mar 2020 outages, unreported complaints ([CNBC](https://www.cnbc.com/2021/06/30/robinhood-to-pay-70-million-for-misleading-customers-and-outages-the-largest-finra-penalty-ever.html)). A *misleading number* on a money screen counts as a failure moment that can do as much harm as confetti.
- **Evidence the mechanics change behaviour:**
  - Robinhood users do more attention-induced trading; the top stocks they bought each day had −4.7% average 20-day abnormal returns ([Barber et al., *J. Finance* 2022](https://ideas.repec.org/a/bla/jfinan/v77y2022i6p3141-3190.html)).
  - Hedonic gamification (confetti, badges) raised trading volume 5.17%. About 70% of the gap was self-selection by less-literate investors ([Chapkovski, Khapko & Zoican, *Management Science* 2024](https://pubsonline.informs.org/doi/epdf/10.1287/mnsc.2022.02650)).
  - FCA experiment (9,000+ people): push notifications +11% trades, points/prize draws +12%; 18–34s took more risk ([FCA Research Note 2024](https://www.fca.org.uk/publications/research-notes/research-note-digital-engagement-practices-trading-apps-experiment)).
  - SEC 2021 request for comment defined "digital engagement practices" including streaks, badges, leaderboards and celebrations for trading ([SEC 34-92766](https://SEC.gov/rules/other/2021/34-92766.pdf)).
  - Haptics shift money behaviour too: lower-intensity vibration reduced willingness to spend compared with no vibration ([Manshad & Brannon, *J. Business Research* 2021](https://ideas.repec.org/a/eee/jbrese/v122y2021icp88-96.html)); "dark haptics" is now a research category ([arXiv 2504.08471](https://arxiv.org/pdf/2504.08471)).
- **The version without the harm:** celebrate *milestones the user chose* (savings goal reached, debt paid off, first salary in), not *risk-taking actions* (a trade, a leveraged position, a deposit). Put the celebration after settlement, not after tapping Buy. Keep "most popular" lists away from high-risk products. Every celebrated number must be true and final.

---

## Cross-app patterns

1. **Close the loop instantly and specifically.** The real-world action (tap, send) is confirmed on the phone within seconds, naming who, what and how much (Monzo, Revolut, Cash App). Evidence: FCA alert papers; Carlin et al.
2. **The task is the home screen.** Cash App's keypad, Revolut's one-tap widgets, Monzo's spotlights. Discovery comes second.
3. **Preview the outcome, not the form.** Phantom shows the consequence before signing; it is the strongest trust device in the set and transfers to any checkout.
4. **Reversible control with a friendly verb.** Freeze/Defrost; on-instant, off-slow for self-protection (gambling block).
5. **An ownable physical or visual artefact.** Coral card, Cash Card drawing, Revolut card designer, themes. Identity drives word of mouth (Monzo 67%).
6. **Effort at the moment of motivation.** Cash App's restricted account → verify on first send; Phantom's seedless start.
7. **Motion restraint in money apps.** Monzo's "less is more"; no app here publishes celebratory motion for routine payments. Celebration is for user-chosen milestones and rituals (yearly recap).
8. **Failure is the brand.** The largest fines (Cash App CFPB, Robinhood FINRA, Monzo FCA) were about failure paths, support, misleading numbers or weak checks, not about the happy path.
9. **Pull comes from the user's own data changing:** balances, Pots, points, rates, incoming payments. That is legitimate. It turns manipulative when the changing data is a speculative price paired with celebration or "popular" lists.

## Transplant playbook

Suggested values come from platform defaults and are labelled as such. They are not measurements of the apps named.

1. **For an action confirmation** (order placed, booking made), push a specific confirmation within seconds, like Monzo, because closing the loop removes uncertainty. Spec: title = merchant/venue, body = items + amount + ETA; latency target as low as the backend allows (Monzo's is unknown). Web: Push API + service worker `showNotification` with `icon` = venue logo. Native: `UNNotificationContent` with thread id per order / `NotificationCompat` with `setLargeIcon`. Never: "You have an update" or marketing in the same channel.
2. **For checkout**, show the outcome above the Pay button, like Phantom's simulation, because predicted consequences build certainty. Spec: one line each for "you pay", "they get", "arrives", with no motion on the numbers while the user reads. Web: a static summary block, `aria-live="polite"` when totals change. Native: SwiftUI `.contentTransition(.numericText())` only when a value changes / Compose `AnimatedContent` on the total. Never: hide fees until after confirm.
3. **For the send/pay button**, make the pending state honest and short, because the labor illusion helps only when work is real ([Buell & Norton 2011](https://pubsonline.informs.org/doi/references/10.1287/mnsc.1110.1376)). Spec: button turns into a spinner inside the same frame (no layout shift), disabled against double-submit; show step text ("Sending to kitchen…") if >1 s. Web: `aria-busy`, `disabled`, keep width fixed. Native: `ProgressView` inside the button / `CircularProgressIndicator` in the button. Never: fake delays or fake step lists.
4. **For payment success**, give one calm, certain confirmation, not a party, because money success should feel final, not like winning. Spec: checkmark draw + success haptic, suggested SwiftUI `.snappy` spring (platform default duration 0.5 s) [suggested]. Web: SVG `stroke-dashoffset` draw, respect `prefers-reduced-motion`. Native: `.sensoryFeedback(.success, trigger:)` / `HapticFeedbackConstants.CONFIRM` (API 30+). Never: confetti on spending or trading (Robinhood).
5. **For failure**, say what happened, whether money moved, and give a human, like the remedies the CFPB required of Cash App, because uncertainty about money is the worst state. Spec: "Not charged. Your card was declined by the bank. Try another card / Talk to us (24h)." Web: error summary with focus moved to it. Native: `.sensoryFeedback(.error)` / `HapticFeedbackConstants.REJECT`. Never: generic "Something went wrong", or pushing users to their bank.
6. **For a reversible safety control**, use a one-tap toggle with a friendly verb plus undo, like Monzo's Freeze/Defrost, because control lowers anxiety. Spec: state change visible on the object (card/plan greys or frosts), undo toast ~5 s [suggested]. Web: `role="switch"`, `aria-checked`. Native: `Toggle` + `.sensoryFeedback(.selection)` / `Switch` + `HapticFeedbackType.ToggleOn` (`ToggleOn` needs a recent Compose version). Never: a confirm dialog on the *protective* direction; add friction only to the risky direction.
7. **For self-protection limits**, make "on" instant and "off" slow, like Monzo's gambling block, because pre-commitment protects the future self and earns long-term trust. Spec: off requires a cooling-off (Monzo: 48 h) and shows the user's own note. Never: a cool-off on cancelling a subscription (that is a dark pattern, the opposite direction).
8. **For the home screen**, open on the habitual task, like Cash App's amount-first screen and Revolut widgets, because zero navigation before intent. Spec: "Your usual" card with one primary button above the fold; promos below. Web/Native: no animation on entry beyond a ≤200 ms fade [suggested, Material 3 short durations]. Never: a promo carousel before the live order.
9. **For identity**, give users one ownable artefact, like the coral card, Cash Card drawing or Revolut card designer, because self-made things are valued more (IKEA effect). Spec: finger drawing + stamps + undo, live preview on the real object, an "approved / in production" push. Web: `<canvas>` with pointer events. Native: PencilKit / Compose `Canvas` + `pointerInput`. Never: charge for the first design or bury it behind a paywall.
10. **For verification/KYC**, ask at the moment of motivation and explain why, like Cash App's restricted-account upgrade and Monzo's "why we ask for a video", because effort is accepted when the reward is next. Spec: one-line reason + accessible alternative on the same screen. Never: front-load all checks at install; never skip real checks (Monzo FCA fine).
11. **For a camera step**, guide live inside a frame, like Revolut's oval, with a fallback, because stuck capture is the top KYC drop-off [H]. Spec: live hints ("more light"), manual capture after a few seconds. Web: `getUserMedia` + overlay. Native: VisionKit / CameraX + ML Kit. Never: an endless auto-capture with no way out.
12. **For saving or progress**, make progress a side effect of the normal task, like round-ups into named Pots, because defaults beat intentions. Spec: show the jar fill after each order. Never: auto-enrol money moves the user did not opt into.
13. **For a rewards balance**, show the next concrete thing it buys, like RevPoints redemptions, because a near, named goal beats an abstract number. Spec: "3 orders to a free tiramisu" with a progress bar. Never: points that expire silently or prize draws tied to spending (FCA: draws +12% trades).
14. **For rotating offers**, let users opt in to a clear, rotating deal, like Cash App Offers, because variable but honest rewards give a reason to check back. Spec: real end time, one tap to activate. Never: fake countdowns or "only 2 left" without inventory data.
15. **For the yearly or monthly recap**, celebrate the user's choices, like Year in Monzo, because reflection and sharing build identity. Spec: story cards, share sheet on the last card. Never: mock spending ("savage" mode drew an Ombudsman complaint).
16. **For risky or irreversible actions**, add graded friction, like Phantom's severity warnings, because a uniform red banner teaches people to ignore it. Spec: neutral → amber note → hard block only on confirmed fraud; first-time payee gets one extra confirm. Never: friction on the safe path and none on the risky one.
17. **For celebration in money-adjacent flows**, celebrate goals the user set and outcomes that are final, not actions that create risk, because the confetti fine shows the line. Spec: celebration only after settlement; respect reduced motion. Never: confetti, scratch cards or leaderboards on deposits, trades, bets or leverage (Massachusetts, SEC DEPs, FCA 2024).

## Gaps (for the next pass)

- **No [O] motion, haptic or sound specs for any of the four apps.** None publishes them, and device recording and YouTube transcripts were blocked here. Next step: record each money moment (send, success, failure, freeze, card designer) at 120 fps on iOS and Android and measure frames.
- monzo.com, revolut.com, cash.app and phantom.com pages were read only through search extracts; Block's own Q3 2025 letter was not read directly (MAU figure via call summaries).
- No Cash App or Block design-blog post on the payment animation was found; no Revolut design-lead interview; no Phantom post on its transaction-preview UI or mascot motion.
- Robinhood: the widely reported Alex Kearns case (a displayed negative balance in 2020) is relevant to the "misleading number" rule but was not re-verified in this pass, so it is left out.
- The web search budget ran out before the Monzo split-bill / pay-a-friend flow and the Robinhood complaint's case examples could be checked.

