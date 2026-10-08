# Teardown: food ordering, delivery and table booking

Scope: Wolt, Uber Eats, Deliveroo, the Domino's Tracker, Foody (Cyprus); the repeat-order engines of
single-restaurant apps (Domino's, McDonald's, Starbucks); and table booking briefly (OpenTable, Resy, TheFork).
Written for the ux-audit skill, with a white-label single-restaurant ordering and booking app as the main
transplant target. Compiled 2026-10-07.

**Tags.** **[S]** company-stated · **[O]** observed (how is given each time) · **[H]** practitioner claim or
recommended default, not tied to the app. "unknown" means no public source was found. **Never read an [H]
value as the app's real spec.**

**Method and limits (read first).** The first draft (2026-10-07) was written from search results only. Direct fetches of first-party
pages (uber.com, careers.wolt.com, ir.dominos.com, media.dominos.com, baymard.com, protopie.io, hbs.edu)
and of YouTube were blocked by the sandbox's egress proxy, so **no frame-by-frame observation was possible**, and
most motion, haptic and sound specs below are still "unknown". Every "[O]" is second-hand: an App Store listing,
press coverage that describes screenshots, Dribbble thumbnails, a YouTube transcript (timestamp given) or a journalist's on-site test.
**Verification pass, 2026-10-08, with full web access.** All 14 claims first marked *(from memory, verify)* were checked against primary or
first-party sources. **Confirmed, now cited (11):** Maister 1985; the zero-price effect (Shampanier, Mazar & Ariely 2007); Domino's original
five tracker stages; peak-end (Kahneman et al. 1993); Domino's Zero Click (2016, 10-second countdown); Drèze & Nunes 2009; the FTC Junk
Fees Rule scope; the four EU provisions; the DC–DoorDash settlement; the StubHub effect sizes; Wood & Neal 2007. **Corrected (3):** the
table-booking flow, the booking apps' loyalty features (TheFork "off-peak discounts" dropped), and scroll-synced menu tabs (only partly
observed; the full behaviour is now [H]). No claim was deleted whole, but unsupported details inside them were cut (e.g. "about 3 taps"). The same pass also
corrected Baymard's abandonment figures (40% / 18%, not 39% / 19%) and the Uber newsroom quote, confirmed the Compose 1.8 haptics API, and
filled unknowns from first-party pages (Domino's Tracker fact sheet, Wolt and Uber Eats App Store listings, Uber newsroom and legal pages,
Wolt merchant help, Mapbox's Wolt case study), NPR Planet Money's on-site test of the Domino's Tracker (18 Sep 2026), and two YouTube
transcripts (timestamps given). Baymard's tracking-page critiques stayed behind its paywall. Motion durations and easing are still unpublished for every app.

**Why this file matters for a single-restaurant app.** Aggregators compete on choice. A single restaurant
competes on **trust in the kitchen, speed of the second order, and a reason to come back**. The restaurant
owns the most persuasive asset in the category: real kitchen progress, the thing Domino's built a brand on.

---

## 1. Wolt (Helsinki; DoorDash since 2022; in Cyprus since 2020)

**Core loop:** open → browse venues → add to cart → pay → watch a friendly minute-by-minute countdown → eat → order again.
**Traction:** about 2.5M monthly active users and a run rate above $2.5B when DoorDash agreed to buy it for about $8B in 2021
([Euronews](https://www.euronews.com/next/2021/11/10/wolt-enterprises-m-a-doordash), [Cyprus Mail](https://cyprus-mail.com/2021/11/18/doordash-to-charge-up-growth-with-8-billion-deal-for-europes-wolt)).
Wolt Cyprus launched in 2020 in Nicosia, then Limassol, Larnaca and Paphos, with Ammochostos following in 2021 ([Wolt careers](https://careers.wolt.com/en/locations/cyprus)).
Design org: 40+ product and content designers, UX writers and researchers, including **two dedicated motion designers**,
mostly working on the consumer app. Their internal design system is called "Alchemy"
([ProtoPie spotlight, 2023](https://www.protopie.io/blog/how-wolt-uses-protopie-for-product-motion-design); [job listing via search](https://careers.wolt.com/teams/product-design)).

**Signature moments**
1. **The countdown tracker.** *Sees:* one big number of minutes that ticks down, with status text and, once the food is ready, a courier map.
   *Spec:* [S] "real-time tracking, and a minute-by-minute countdown" with every order ([App Store listing, checked 2026-10-08](https://apps.apple.com/us/app/wolt-delivery-food-and-more/id943905271));
   [S] map appears after the meal is prepared ([Cannes Lions 2016 entry](https://lovethework.com/work-awards/campaigns/wolt-39547)).
   [S] on web tracking, Wolt renders periodic static map images of the courier relative to venue and customer, and traffic-aware routing raised the probability of a correct ETA "by up to 2%" ([Mapbox case study](https://www.mapbox.com/showcase/wolt)).
   [O] a 2026 tutorial video narrates the order page showing preparation status ("being prepared, packed, or ready to be picked up"), a courier map "if tracking is available", and pushes for out-for-delivery and delays ([TUTOR BASE, Jul 2026, 00:57–01:47](https://www.youtube.com/watch?v=cGSElzB1HqI); generic narration, low confidence). Transition and easing: unknown.
   *Mechanism:* "uncertain waits are longer than known, finite waits" ([Maister 1985](https://davidmaister.com/articles/the-psychology-of-waiting-lines/), in Czepiel, Solomon & Surprenant (eds.), *The Service Encounter*); operational transparency.
   *Evidence:* a single number creates a reference point. Late deliveries hurt repurchase more than equally early ones help ([LMU experiment](https://epub.ub.uni-muenchen.de/109781/)).
   *Transplant:* show "Ready in ~14 min" as the hero of the order page, driven by the kitchen's real queue, never by a fixed constant.
2. **Map only when it means something.** *Sees:* stage text while cooking; the map arrives only when the courier holds the food. *Spec:* [S] as above; animation unknown.
   *Mechanism:* show progress only when progress is actually happening, so the screen never shows a frozen dot. *Evidence:* none specific to this pattern.
   *Transplant:* a single restaurant with its own drivers shows a map only after pickup; before that it shows kitchen stages (see Domino's).
3. **Playful illustration and copy.** *Sees:* hand-drawn food and character illustrations, and warm, human copy. Wolt's Cannes entry says the app is "made for humans who eat".
   *Spec:* [O] from Wolt's [Dribbble portfolio](https://dribbble.com/wolt) thumbnails only. Motion uses Lottie ([ProtoPie](https://www.protopie.io/blog/prototyping-for-food-delivery-apps-wolt)). Durations unknown.
   *Mechanism:* the brand's personality turns dead waiting time into something mildly entertaining (Maister: occupied time feels shorter).
   *Evidence:* no published A/B result.
   *Transplant:* commission 3–5 illustrations in the restaurant's own style for the received, cooking, on-the-way and delivered states, plus one for an empty cart. Do not use stock art.
4. **A human support chat.** *Sees:* chat inside the app, answered by people. [S] "answer within a minute", but that is on the courier-facing page ([Wolt](https://explore.wolt.com/en/est/couriers/learning-center/support)).
   Customers on [Trustpilot](https://www.trustpilot.com/review/wolt.com/da?page=2) report waits of hours and partial compensation (anecdotal).
   *Mechanism:* how a service recovers from failure shapes loyalty more than its routine successes. *Transplant:* a "Problem with this order?" button on the order page that opens WhatsApp or a call to the restaurant itself.
5. **Add to cart → cart bar.** *Sees:* tapping an item opens an item sheet; after adding, a persistent bottom bar shows the count and total.
   *Spec:* [S] Wolt's "quick picker" animates the item quantity number, which jumps "every time the user adds a product to the cart"; an arrow slides in "with this very nice fluid motion from the side" to signal more categories ([ProtoPie, Jun 2023](https://www.protopie.io/blog/how-wolt-uses-protopie-for-product-motion-design)). Durations: unknown.
   *Transplant:* see playbook rule 2.
6. **Order again.** *Sees:* past venues and orders surfaced on the home screen. *Spec:* unknown (no first-party or observed source found). *Transplant:* playbook rule 9.
7. **Rating.** [S] customers rate the venue 1–10 after the order; delivery is rated separately, and a written review is optional ([Wolt merchant help](https://merchant.wolt.com/en/kaz/learning-center/how-to-improve-your-venue-rating-on-wolt)). Prompt timing and screen: unknown. *Transplant:* playbook rule 11.
8. **Pay.** [S] "credit card or Apple Pay" ([App Store](https://apps.apple.com/us/app/wolt-delivery-food-and-more/id943905271)); Google Pay on Android where available ([Wolt FAQ pages](https://wolt.com/en/svk/revuca/article/svk_article_faq)). Checkout step count: unknown.

**Feel:** Wolt has two in-house motion designers, prototypes in ProtoPie and ships Lottie animations ([ProtoPie](https://www.protopie.io/blog/how-wolt-uses-protopie-for-product-motion-design)). No durations or easing values have been published.
**Ethical flag:** a LinkedIn user reported a pre-order still showing "delivered at 11:00" at 12:05 and called the optimistic ETA a dark pattern ([post](https://lv.linkedin.com/in/aigarseglajs)). This is a single anecdote, but it shows the main risk of a countdown: **an ETA that keeps slipping undoes its own trust**.

## 2. Uber Eats

**Core loop:** open → personalised feed and offers → order → staged tracker plus courier map and countdown → rate → reorder; Uber One makes delivery feel free.
**Traction:** Uber's 2025 gross bookings were $193B across all segments, and Uber One reached 46M members, contributing nearly half of bookings ([Q4 2025 call, Fool transcript](https://fool.com/earnings/call-transcripts/2026/02/04/uber-uber-q4-2025-earnings-call-transcript/)). No Delivery-only figure was retrievable.

**Signature moments**
1. **Staged end-to-end tracker (2019 redesign).** [S] tracking now shares "the latest on your order from its confirmation and preparation through the courier's route to the restaurant, order pickup and delivery to your door", and "if your order gets delayed or canceled, we'll tell you more about what's happening and why" ([Uber newsroom, 10 Apr 2019](https://www.uber.com/us/en/newsroom/eatsredesign/)).
   [S via trade press summarising Uber's release] a "five-stage interactive tracking bar" (order confirmed → preparation → courier en route → pickup → arrival) with "animated illustrations", kitchen-status notes when waits run long, traffic notices, and a **"latest arrival by" time next to the "estimated arrival"** ([Xtalks, Apr 2019](https://xtalks.com/uber-eats-updates-app-to-create-a-more-transparent-delivery-service-1870/)).
   [O via press screenshots] separate stages for accepted, preparing and courier heading to the restaurant, then a route map and a countdown clock ([Digital Trends](https://uat4.www.digitaltrends.com/?p=2317102)).
   [O via press] Live Activities on the iOS Lock Screen and Dynamic Island since May 2023, showing "order status, ETA, driver's name and photo, and store's image" ([MacRumors, 2 May 2023](https://macrumors.com/2023/05/02/uber-eats-live-activities)). Motion spec: unknown.
   *Mechanism:* labor illusion, where visible effort raises perceived value even when it adds wait ([Buell & Norton 2011, Management Science](https://doi.org/10.1287/mnsc.1110.1376)).
   *Transplant:* a 4-step stepper (Received → Cooking → On the way / Ready → Enjoy) in which each step changes on a real staff action in the restaurant's order screen.
2. **Explaining delays.** [S] the app gives a reason when an order is late or cancelled, and you can contact the courier before pickup (same source). *Mechanism:* Maister's principle that unexplained waits feel longer than explained ones.
   *Evidence:* when delivery is late, showing a time **range** instead of a single point reduces dissatisfaction; when it is on time, the format makes no difference ([Jing & Qiu, PACIS 2022](https://aisel.aisnet.org/pacis2022/88)).
   *Transplant:* show "Ready 19:40–19:50"; if the kitchen slips, push a reason ("big table just came in, +8 min") before the customer notices.
3. **ETA accuracy as a product feature.** Uber Eats' machine-learning ETA reportedly improved accuracy by 26% ([secondary case study](https://bestpractice.ai/ai-use-cases/case-studies/consumer-retail/uber-eats-improves-estimated-time-of-delivery-information-accuracy-by-26-using-machine-learning-algorithms); unverified against Uber).
   *Transplant:* even without machine learning, set ETA = median prep time for this order size at this hour, taken from the restaurant's own last 4 weeks.
4. **Membership that removes the fee.** Uber One members drive about half of bookings ([S], above). *Mechanism:* sunk cost and "free" pricing: in experiments, cutting both prices by the same amount so that the cheaper option became free sharply increased its choice share, as if zero adds perceived benefit, not just lowers cost ([Shampanier, Mazar & Ariely 2007, *Marketing Science* 26(6)](https://people.duke.edu/~dandan/webfiles/PapersPI/Zero%20as%20a%20Special%20Price.pdf)).
   *Ethical line:* Grubhub+ "$0 delivery" while charging other fees, and hard cancellation, were core to the FTC case (section 8). *Transplant:* for one restaurant, "free delivery on your 5th order" beats a subscription.
5. **Rating and reorder** happen after delivery. [S] after each order the customer can give the restaurant **1–5 stars**, the courier an anonymous **thumbs up/down**, and individual dishes thumbs up/down, plus preset compliments or a comment; the restaurant's displayed average uses the last 91 days with at least 10 ratings ([Uber legal: ratings on Uber Eats](https://www.uber.com/ie/en/legal/ratings-and-reviews-on-uber-eats/)). Dish thumbs date from Nov 2017 ([MobileSyrup](https://mobilesyrup.com/2017/11/09/ubereats-now-recommends-dishes/)).
   [S] "it's dead simple to reorder your favorite meals with the tap of a button" ([Uber newsroom, 7 Oct 2020](https://www.uber.com/us/en/newsroom/arriving-now-the-new-uber-eats/)). Baymard keeps a benchmark of the Uber Eats tracking page ([Baymard](https://baymard.com/ecommerce-design-examples/63-order-tracking-page/11375-uber-eats); highlights are behind its paywall). Prompt timing and motion: unknown.
6. **Checkout and pay.** [O] on iPhone, Checkout slides up as a full-screen modal; on Android it pushes in from the right; the iOS checkout shows a spinner where Android shows a shimmer skeleton; the tip is chosen on the checkout screen ([Sharif Yo teardown, Oct 2021, 14:58–15:39, 17:35, 19:37](https://www.youtube.com/watch?v=O8pvLouCBvE)). [O] a tip prompt at checkout that can also be given after delivery; Apple Pay, PayPal and Venmo accepted ([CNET, Sep 2020, 05:23–05:54](https://www.youtube.com/watch?v=XzxK-jDw33I)).
   [S] Apple Pay since Apr 2019: "as simple as a glance with Face ID" ([Uber newsroom](https://www.uber.com/us/en/newsroom/bringing-apple-pay-to-uber-eats/)); **Google Pay "can't be added as a new payment method"**, only kept if already linked ([Uber help](https://help.uber.com/en/ubereats/restaurants/article/paying-with-google-pay?nodeId=d2fb8cef-2f90-42f4-ab97-3e2978a77401)). Step count: unknown.

**Feel:** [O] menu category tabs that collapse into a sticky header on scroll, tapping a tab "responsively scrolls" to that section, pill-shaped active tab on iOS vs underline on Android, item detail as a draggable sheet ([Sharif Yo teardown, 02:09–02:45, 08:51–10:44](https://www.youtube.com/watch?v=O8pvLouCBvE)). Durations and easing: unknown.

## 3. Deliveroo (DoorDash since 2 Oct 2025)

**Core loop:** browse curated restaurants → order → rider map with a refreshing ETA → eat; Plus membership for free delivery.
**Traction:** about 7M monthly active users (2024), about 176k partner sites, more than 130k riders and £2bn revenue in 2024. DoorDash bought it for about $3.9B, or 180p a share
([Business Wire](https://secure.businesswire.com/news/home/20251002060133/en/DoorDash-Completes-Acquisition-of-Deliveroo), [Verdict](https://www.verdictfoodservice.com/newsletters/doordash-finalises-deliveroo-takeover)).
Design team: about 30 product, content and kit designers. The 2016 rebrand with DesignStudio covered the app and the rider kit ([Creative Review](https://www.creativereview.co.uk/deliveroo-brand-design/)).
No Deliveroo design article on Medium about order tracking turned up in search.

**Signature moments**
1. **Rider ETA that refreshes from location.** [S] in the restaurant-side app, the rider-arrival countdown "refresh[es] every few minutes based on where the rider is" ([Deliveroo help](https://help.deliveroo.com/en/articles/2861170-a-fresh-new-look-for-the-order-management-app)).
   For the consumer tracker, Baymard has captures from 2022 and 2024 ([Baymard](https://baymard.com/ecommerce-design-examples/63-order-tracking-page/19035-deliveroo)); the motion is unknown.
   *Transplant:* show the **kitchen** a countdown to driver arrival too, because operational transparency in both directions improves the work itself (Buell, Kim & Tsay below).
2. **Teal brand as a "rider" signal.** The 2016 identity made riders a walking brand (Creative Review). *Transplant:* show the restaurant's own driver with name and photo ("Andreas is on his way") to make the delivery feel human.
3. **Two design systems unified (2017–19)** for consistency across consumer, rider and restaurant apps ([portfolio](https://guilleminot.notion.site/Deliveroo-4e5055e63bcc464a89eaf9c55334db20)). *Transplant:* white-label tenants share one component kit; only tokens (colour, font, illustrations) vary.

Further moments (cart, checkout, rating): specs unknown and no public write-up found.

## 4. The Domino's Tracker (and Domino's app)

**Core loop:** order (or let the app place your saved order) → watch your pizza move through named kitchen stages → GPS driver → "mmm!".
**Traction:** [S] launched across the US in **January 2008** after a December 2007 test, the first of its kind for a national pizza chain. It had tracked more than 1.8B orders by 2023 and more than 2.5B by March 2026
([Domino's release, Mar 2026](https://www.nasdaq.com/press-release/dominosr-updates-its-iconic-industry-first-tracker-even-better-customer-experience); [15th-birthday story](https://media.dominos.com/stories/tracker-15th-birthday/)).
In 2023 more than 85% of US retail sales came through digital channels ([Domino's IR](https://ir.dominos.com/node/23351/pdf)).

**Signature moments**
1. **Named kitchen stages.** Original five stages: Order Placed → Prep → Bake → **Quality Check** → Out for Delivery ([markhub24 summary](https://www.markhub24.com/post/domino-s-pizza-tracker-as-experience-led-marketing); Quality Check's later removal confirmed by [Restaurant Dive](https://www.restaurantdive.com/news/dominos-tracker-update-artificial-intelligence-real-time-order-status/815556/)).
   [S, co-inventor David Haubenstricker on NPR] it was built on store computers that already logged when an order came in, went into the oven and left for delivery; the first design was a sideways "thermometer" whose next segment turned red at each step ("order placed to prep to baked to boxed to delivery"), and its first big test was Super Bowl day.
   [O, NPR reporters' on-site test] a staff member pressed a button after loading the oven and the tracker showed "order in the oven"; **the move to Quality Check is timer-driven** (a conveyor oven takes a fixed time) and "Quality Check" stayed on screen while the boxed pizza waited on the shelf; "left the store", GPS tracking and "delivered" were real events
   ([NPR Planet Money, 18 Sep 2026](https://www.npr.org/2026/09/18/nx-s1-5974101/dominos-pizza-tracker-labor-illusion)).
   The 2026 redesign has **placed → make → deliver/pickup → "mmm!"**, shows the time the order went **into the oven** and the time the **driver left**, and adds a car progress bar and GPS tracking
   ([NRN](https://www.nrn.com/quick-service/domino-s-updates-its-pizza-tracker-to-provide-more-order-details), [Stock Titan](https://www.stocktitan.net/news/DPZ/domino-s-updates-its-iconic-industry-first-tracker-for-an-even-0en45el5eskk.html)); [S] "a clearer, more detailed view of each order's progress" ([Domino's Tracker fact sheet, 2026](https://biz.dominos.com/content/files/Dominos-Tracker-Fact-Sheet.pdf)).
   Motion: unknown. *Mechanism:* labor illusion and operational transparency; the oven timestamp is the "visible effort" ([Buell & Norton 2011](https://doi.org/10.1287/mnsc.1110.1376)).
   *Published effect:* Domino's has published usage, not impact: one millionth tracker user by March 2008 and 2.5B+ orders tracked ([fact sheet](https://biz.dominos.com/content/files/Dominos-Tracker-Fact-Sheet.pdf)). No Domino's-stated lift in sales, satisfaction or call volume was found. On NPR the co-inventor recalls a CEO saying nothing "moved the needle" as much, but that remark was about the internal out-the-door-time dashboards built first, not the consumer tracker. A student case study claims +23% online-ordering profit ([UCLA case PDF](http://www.econ.ucla.edu/sboard/teaching/tech/dominos.pdf)); unverified, treat as [H].
   *Evidence:* reciprocal transparency, where customers see cooks and cooks see customers, raised customer-reported quality by **22.2%** and cut throughput time by **19.2%** in food-service field experiments
   ([Buell, Kim & Tsay 2017, Management Science; WP](https://ideas.repec.org/p/hbs/wpaper/14-034.html)).
   *Transplant:* this is the most valuable single pattern for a one-kitchen app: each stage is a button on the kitchen tablet ("Started", "In oven", "Packed", "Driver left").
2. **"mmm!", a named end state.** [S] the last stage is a feeling, not a logistics status. *Mechanism:* the peak-end rule; retrospective ratings are dominated by the worst moment and the final moments, and duration matters little: most subjects chose to repeat a *longer* cold-water trial that ended slightly less painfully ([Kahneman, Fredrickson, Schreiber & Redelmeier 1993, *Psychological Science* 4(6):401–405](https://www.psychologicalscience.org/journals/psychological-science/j.1467-9280.1993.tb00589.x/)).
   *Transplant:* the final state says "Enjoy, Maria" with the restaurant's illustration and a single next step (rate the dish with one tap). No upsell here.
3. **Live Activities (iOS).** [S] 2026 update ([Nasdaq release](https://www.nasdaq.com/press-release/dominosr-updates-its-iconic-industry-first-tracker-even-better-customer-experience)); the Lock Screen shows "when the order is placed, when it is out for delivery and driver location updates" ([Restaurant Dive](https://www.restaurantdive.com/news/dominos-tracker-update-artificial-intelligence-real-time-order-status/815556/)). *Mechanism:* glanceable progress removes the urge to keep checking.
   *Transplant:* on the web, use a pinned notification for each stage change (Web Push) and keep it to 3 pushes at most per order.
4. **AI "ready time".** [S] a custom engine blends store-staff inputs with machine-learning models on DomOS (same release). *Transplant:* rule 5 (an ETA built from the restaurant's own history).
5. **Themes and personality.** [S] in October 2010 the tracker got "an auditory upgrade" and six themes, each with its own look and voice; "depending on the theme, Domino's Tracker would sing, cheer or even sweet talk the status" of the order. A 2013 "D.J. Slow Pans" theme explained, with slow jams and videos, why Pan Pizza takes longer ([Domino's Tracker fact sheet](https://biz.dominos.com/content/files/Dominos-Tracker-Fact-Sheet.pdf)). Transplant: let the tenant restaurant theme the tracker with its own illustrations and stage names, and use the "Slow Pans" idea to explain a dish that takes longer *before* the wait starts.
6. **Zero Click ordering** [S] (launched 6 Apr 2016, iOS and Android): opening the app re-places your saved "Easy Order" after a **10-second countdown** that you can stop ([Domino's release via Franchising.com](https://www.franchising.com/amp/news/20160406_zeroclick_ordering_from_dominosreg__when_one_click.html), [TechCrunch](https://techcrunch.com/2016/04/06/dominos-now-lets-you-order-pizza-just-by-launching-an-app-no-clicking-required)). It built on Easy Order (2013), which had cut ordering to five clicks. Transplant: "Your usual?" card with a one-tap reorder (rule 9). Never auto-submit without a visible cancel.

**Honesty flag:** QSR Magazine asked whether stages are real or partly time-estimated ([QSR, "Is your pizza tracker telling the truth"](https://www.qsrmagazine.com/story/is-your-pizza-tracker-telling-the-truth/)).
Guda, Dawande & Janakiraman argue that progress information sets expectations which, if missed, hurt satisfaction ([LSE Business Review](https://blogs.lse.ac.uk/businessreview/?p=43898)).
**Rule:** a stage moves only on a real event; if a stage is estimated, label it "estimated".

## 5. Foody (Cyprus; Delivery Hero since 2019)

**Core loop:** open → stores grouped by category with exclusive offers → order delivery or takeaway → Foody Pro removes the fee.
**Traction:** at acquisition, 600–750 partner restaurants and about 130k orders a month ([EU-Startups](https://www.eu-startups.com/2019/09/delivery-hero-acquires-cyprus-based-food-ordering-startup-foody/), [Silicon Canals](https://siliconcanals.com/news/food-delivery-giant-delivery-hero-acquires-cyprus-based-foody/)).
The App Store lists more than 2,100 stores and group ordering ([App Store](https://apps.apple.com/app/id1071407834)); recent press says more than 3,000.

**Signature moments and pull (what a Cypriot user is already trained on)**
1. **Foody Pro:** [S] €5.99 a month, free delivery from selected stores within 4 km, with a 30-day free trial ([Cyprus Mail, Oct 2023](https://cyprus-mail.com/2023/10/07/foodypro-the-new-monthly-subscription-service-from-foody)).
2. **Bank tie-ins:** [S] Bank of Cyprus *antamivi* points ([CBN](https://cbn.com.cy/article/2025/3/13/826103/use-bank-of-cyprus-cards-for-foody-orders-and-get-benefits-and-antamivi-points)); "Level Up with Mastercard", where order points enter a prize draw ([Cyprus Mail](https://cyprus-mail.com/2023/11/10/foody-users-can-level-up-with-mastercard-to-win-rewards)); free Pro months with fuel purchases ([Petrolina](https://www.petrolina.com.cy/en/news/fuelled-up-at-petrolina-paid-with-bank-of-cyprus-card-enjoy-1-month-of-foody-pro-for-free)).
3. **"Rubies" loyalty:** named in Foody's releases; mechanics unknown.
4. **Group order:** [S] App Store. *Transplant:* for offices in Nicosia and Limassol, a shareable cart link ("add your order by 12:30") is cheap to build and spreads the app on its own.
5. **Mega Deals / 1+1:** [S] Foody Market ([Cyprus Mail](https://cyprus-mail.com/2024/04/23/mega-deals-unique-offers-in-all-foody-market-categories)).
Tracker, cart and motion specs: unknown.
**Implication for a direct-ordering app:** Cypriots expect free delivery, deals and points. A restaurant's direct app wins on **no platform markup**: say plainly "Same menu prices as in-store · no service fee". Owned loyalty (section 6) does the rest.

---

## 6. Single-restaurant apps: how Domino's, McDonald's and Starbucks win the repeat order

| | Numbers [S] | What drives the repeat |
|---|---|---|
| **Starbucks** | 34.2M US 90-day active Rewards members (Q4 FY25), 35.8M (Q3 FY26); Mobile Order & Pay = **31%** of US company-operated transactions throughout FY25 and **33%** in Q2–Q3 FY26; Rewards members = **58–60% of tender** ([Q4 FY25 dashboard](https://s203.q4cdn.com/326826266/files/doc_financials/2025/q4/Q4-FY25-Digital-IR-Dashboard.pdf), [Q3 FY26 dashboard](https://s203.q4cdn.com/326826266/files/doc_financials/2026/q3/Q3-FY26-Digital-IR-Dashboard.pdf)) | Stars (points) toward tiered rewards, stored-value pay, order ahead, personalised offers ("Deep Brew", announced in 2019; no published lift found, [NRN](https://www.nrn.com/beverage-trends/starbucks-to-push-ai-with-new-deep-brew-initiative)) |
| **McDonald's** | ~**210M** 90-day active loyalty users and ~**$37B** in loyalty-member sales in 2025 across 70 markets; target 250M by 2027. A US customer averaged **10.5 visits** in the year before joining and **26** in the year after (CFO) ([Q4 2025 release](https://www.barchart.com/story/news/165836/mcdonald-s-reports-fourth-quarter-and-full-year-2025-results), [Yahoo](https://finance.yahoo.com/news/mcdonalds-q4-earnings-call-highlights-013915490.html)) | App-only deals, points, mobile order and curbside. Caveat: heavy users self-select into the program, so the before/after visit numbers are not causal |
| **Domino's** | Rewards: ~33M active (2023), **35.7M** (2024) ([CX Dive](https://www.customerexperiencedive.com/news/dominos-growth-loyalty-website-app-upgrades/740784)) | Sept 2023 relaunch: minimum order cut from $10 to $5, 10 points per order, rewards at 20/40/60 points instead of only "60 = pizza"; "Emergency Pizza" stored for later ([MediaPost](https://www.mediapost.com/publications/article/389087/dominos-loyalty-program-ups-rewards-vp-disses-ot.html), [Marketing Dive](https://www.marketingdive.com/news/dominos-loyalty-relaunch-emergency-pizza-draws-2-million-new-members/708531/)). Cost: company-store margins fell 1.6 points that quarter |

**Mechanisms with evidence**
- **Goal gradient:** customers buy faster as they near a reward. With a 12-stamp card that came with 2 stamps already filled, café customers completed 10 purchases faster than with a blank 10-stamp card ([Kivetz, Urminsky & Zheng 2006, JMR](https://business.columbia.edu/sites/default/files-efs/pubfiles/1200/goalgradient.pdf)).
- **Endowed progress:** at a car wash, 34% of customers completed an 8-wash card with 2 bonus stamps already applied, against 19% for a blank 8-stamp card ([Nunes & Drèze 2006, JCR 32(4)](https://coglode.com/nuggets/endowed-progress-effect)). The effect is stronger when you give a reason ("welcome bonus").
- **Small, early rewards beat one distant one:** this is why Domino's moved from "60 points = pizza" to 20/40/60 and saw more sign-ups (above). Tiers create status: adding a lower tier makes members of the tier above feel more elite, while enlarging the top tier dilutes its status ([Drèze & Nunes 2009, *JCR* 35(6):890–905](https://ideas.repec.org/a/oup/jconrs/v35y2009i6p890-905.html)).
- **Order-ahead removes the queue:** this is the real Starbucks product. **The lesson from failure:** mobile orders "overwhelm our cafes". The app promised "ready in three minutes" when "you physically can't get there in three minutes", and Starbucks then capped orders at 12 items (down from 15), cut some modifiers, began piloting an order-sequencing algorithm and capacity-based time slots, and set a 4-minute handoff target
  ([GeekWire](https://www.geekwire.com/2024/on-his-first-earnings-call-starbucks-ceo-lays-out-plan-to-bring-order-to-mobile-ordering/), [Today](https://www.today.com/today/amp/rcna191916), [Constellation](https://www.constellationr.com/blog-news/insights/starbucks-aims-4-minute-barista-customer-handoff-process-boost-cx)).
  **An accurate promised time matters more than a fast one.**
- **Personalisation:** offers based on past orders are plausible but have no published lift at Starbucks. Treat them as [H].

**Transplant for one restaurant:** (1) a stamp card with 2 stamps endowed at sign-up, a reason given, and rewards at 3/6/10 orders; (2) "Your usual" one-tap reorder; (3) pickup **time slots** limited by kitchen capacity; (4) birthday reward; (5) no subscriptions.

## 7. Table booking, briefly (OpenTable, Resy, TheFork)

- **OpenTable:** ~60k restaurants and 1.7B diners seated a year ([Booking Holdings](https://www.bookingholdings.com/?p=2205)); its network is now 70k+ ([State of the Industry](https://www.opentable.com/state-of-industry)).
  **Resy:** 4,000 restaurants and 2.6M diners a week when American Express bought it in 2019 ([NRN](https://www.nrn.com/restaurant-technology/resy-to-be-acquired-by-american-express)).
  **TheFork:** no official user figure; third parties estimate 20–27M monthly visits ([Dealroom](https://dealroom.co/companies/thefork/)).
- **Pattern:** pick date, time and party size → see the tables that are really free → tap one to book. [S] OpenTable: "Choose a date, time, and party size to see all available tables in real time. Tap the table you want and the reservation is yours - instantly!" ([OpenTable store listing](https://apps.microsoft.com/detail/9wzdncrfj0rn?hl=en-US)). Resy's Notify uses the same three inputs (party size, date, time; below). TheFork's flow was not checked against a first-party page. The order of the selectors, the chip styling and the tap and second counts are unknown.
- **Pull:** [S] OpenTable Dining Points, earned on honoured reservations and redeemable for dining rewards, and in the US for hotel discounts via KAYAK ([OpenTable press](https://press.opentable.com/news-releases/news-release-details/now-menu-opentable-dining-points-can-be-used-toward-hotel)). [S] Resy **Notify**: when a restaurant is sold out you pick party size, date and time, and get a push or email alert if a matching table opens; the alert is "not a guarantee", you must claim it fast ([Resy blog, Sep 2021](https://blog.resy.com/2021/09/notify/)). This is legitimate anticipation. [S] TheFork **Yums**: 100 Yums per honoured booking (200 at "Yums x2" restaurants), 1,000 Yums = £20 off and 2,000 = £50 off, credited 3 days after the meal, valid one year ([TheFork UK](https://www.thefork.co.uk/yums)). The earlier claim of TheFork "off-peak discounts" was not checked against a first-party page and is dropped.
- **No-shows:** reminders and a card hold or deposit for large groups. The version without harm: state the policy before the confirm button, never after.
- **Transplant:** chips for the next 6 open slots near the requested time, "Add to calendar" on the confirmation, and a reminder the day before at a time the guest chose. Never show "Only 1 table left!" unless it is computed from the live seating plan.

---

## 8. Feel across the category: transitions, scrolling, buttons

- **Menu category tabs synced with scroll.** [O] Uber Eats: the category tabs dock into a sticky header as you scroll, and tapping a tab "responsively scrolls" the menu to that section ([Sharif Yo teardown, 02:09–02:45, 09:55](https://www.youtube.com/watch?v=O8pvLouCBvE)); Uber Eats and DoorDash menus are an "infinite scroll with a navigation bar at the top" ([CNET, 04:48](https://www.youtube.com/watch?v=XzxK-jDw33I)). [S] Wolt choreographs the header on scroll, and an arrow slides in to show more categories ([ProtoPie](https://www.protopie.io/blog/how-wolt-uses-protopie-for-product-motion-design)).
  Unverified: whether scrolling the list moves the active tab in each app, and whether Deliveroo and Foody use the same bar. The recommended behaviour (tap → scroll to section; scroll → active tab follows and stays in view) is **[H]**.
  Durations: unknown for every app. **Web:** `IntersectionObserver` on section headers (rootMargin set to the sticky-header height), `scrollIntoView({behavior:'smooth', inline:'center'})` on the tab bar, and `scroll-margin-top` on sections. While a programmatic scroll is running, suppress observer updates so the highlight does not flicker through intermediate tabs.
- **Item sheet:** a bottom sheet with photo, options and a sticky "Add · €12.50" button whose price updates live as options change. That live price is what Starbucks plans to add ("real-time price changes as customers customize").
- **Cart bar:** a persistent bottom bar ("3 items · €27.40 · View cart"). On add, give a quantity bump plus a light haptic **[H]**. App specs unknown.
- **Checkout commit:** one primary "Pay €27.40" button whose label carries the **final total**. It shows a busy state, is protected against double submits, and leads to a confirmed screen.
- **Tracker:** stage changes are the only motion that matters; long idle screens should have a subtle "alive" indicator (a pulsing current stage) so the screen never looks frozen.

## 9. Onboarding to the first order

- All four aggregators let users browse before signing up; account creation comes at checkout. Step counts and seconds are unknown (no source found, including on 2026-10-08).
- **Baymard:** in its current figures (page updated 22 Sep 2025, US online shoppers, excluding "just browsing"), **40%** abandoned because extra costs were too high, **18%** because the site wanted them to create an account, **17%** because checkout was too long or complicated, and **12%** because they could not see the total up front (older editions said 48% and 26% for the first two). The average documented abandonment rate is **70.22%** across 50 studies ([Baymard, checked 2026-10-08](https://baymard.com/lists/cart-abandonment-rate)).
- **Transplant target for a restaurant app:** QR or link → menu in under 2 s → add → **guest checkout** (name, phone, address or table number) → Apple Pay / Google Pay → confirmed. That is about 4 screens and under 60 s **[H]**. Ask for an account *after* the order is confirmed: "Save your details for 1-tap reorder and get 2 stamps" (endowed progress).

## 10. What pulls users back with no task

- **Ritual timing:** food has natural daily slots (lunch, dinner) and weekly ones (the Friday pizza). A push at the user's **own** usual ordering time ("Your usual Friday margherita?") fits the ritual; a push at a random hour reads as spam. [H]
- **Progress you can see:** stamp cards and tiers (section 6), with rewards close enough to feel (goal gradient).
- **Stored rewards:** Domino's "Emergency Pizza" is a banked reward the customer chooses when to use, which gives a reason to come back without urgency.
- **Membership:** Uber One, Wolt+ and Foody Pro make every order feel free. That works for an aggregator; it is risky for one restaurant (churn, and cancellation-rule exposure).
- **Social:** group orders (Foody, Uber Eats) and a shareable cart.
- **New-dish anticipation:** "This week's special" in-app on the day it starts, not a daily push.

## 11. The ethical line

- **Drip pricing / hidden fees.** The FTC and Illinois took **Grubhub** to a $140M judgment ($25M payable) in Dec 2024 for showing a low delivery fee and then adding service and small-order fees at checkout, often more than doubling the advertised price, and for making Grubhub+ hard to cancel. The order requires all delivery costs to be disclosed up front
  ([FTC](https://www.ftc.gov/node/86989), [Crowell](https://www.crowell.com/en/insights/client-alerts/lessons-for-e-commerce-and-retail-from-the-ftc-and-illinois-ags-proposed-dollar140-million-settlement-against-grubhub)).
  The FTC's Rule on Unfair or Deceptive Fees (announced 17 Dec 2024, in force 12 May 2025) was narrowed from the all-industry proposal to **live-event tickets and short-term lodging only** ([Sidley](https://sidley.com/en/insights/newsupdates/2024/12/ftc-announces-final-junk-fees-rule-that-is-significantly-narrower-than-proposed-rule), [Barnes & Thornburg](https://btlaw.com/en/insights/alerts/2025/ftc-finalizes-junk-fees-rule-new-pricing-disclosure-requirements-take-effect-may-12-2025)), but Section 5 deception still applies to everyone else.
- **California** SB 478 requires all-in prices. SB 1524 exempts restaurants only if mandatory fees are "clearly and conspicuously" disclosed (from 1 July 2025); third-party delivery platforms are **not** exempt ([GT Law](https://www.gtlaw.com/en/insights/2024/7/california-junk-fee-bill-sb-1524-becomes-law-what-it-means-for-restaurants)).
- **UK** DMCC Act: drip pricing banned since **6 April 2025**, with fines of up to 10% of global turnover. The CMA has opened investigations into fees, misleading time-limited offers and pre-selected optional charges ([SCL](https://www.scl.org/cma-issues-final-price-transparency-guidance-and-launches-first-investigations-under-dmcc-act/), [Taylor Wessing](https://www.taylorwessing.com/de/insights-and-events/insights/2025/04/dmcca-drip-pricing)).
- **EU/Cyprus:** the Unfair Commercial Practices Directive 2005/29/EC, Annex I point 7, blacklists "falsely stating that the product will only be available for a very limited time" to force a quick decision ([Annex I text](https://www.legislation.gov.uk/eudr/2005/29/annex/I/adopted)); Consumer Rights Directive Art. 22 requires express consent for any extra payment and bans pre-ticked boxes for it ([European Parliament note](https://www.europarl.europa.eu/doceo/document/PETI-CM-697497_EN.pdf)); Price Indication Directive Art. 6a (added by the Omnibus Directive) requires a price-reduction announcement to show the lowest price of the prior 30 days ([RPC on the Commission guidance](https://www.rpclegal.com/snapshots/consumer/spring-2022/european-commission-publishes-guidance-on-price-promotions-under-the-omnibus-directive/)); DSA Art. 25 bans interfaces that deceive or manipulate, but applies only to **online platforms**, so it covers aggregators and probably not a single restaurant's own app ([Art. 25 text](https://www.springlex.eu/en/packages/dsa/dsa-regulation/article-25/)).
- **Tips:** the DC Attorney General settled with DoorDash on 24 Nov 2020 for **$2.5M** ($1.5M to workers, $750k to DC, $250k to charities) over claims that from July 2017 to September 2019 customer tips subsidised DoorDash's own payments to couriers instead of adding to them ([DC OAG](https://oag.dc.gov/release/ag-racine-reaches-25-million-agreement-doordash)).
- **Evidence that drip pricing "works", which is why it is regulated:** in a StubHub field experiment, buyers not shown fees up front spent **about 21% more** and were **14% more likely** to buy than buyers shown all-in prices; lower-quality seat choice explained at least 28% of the revenue drop under all-in pricing ([Blake, Moshary, Sweeney & Tadelis, *Marketing Science* 40(4), 2021; NBER w25186](https://www.nber.org/papers/w25186), percentages via [deceptive.design](https://deceptive.design/articles/price-salience-and-product-choice)).
- **Fake scarcity and urgency:** "3 people are looking at this", fake countdowns, and "almost sold out" not backed by real stock are all manipulation. **Fake progress** (tracker stages driven by timers but shown as live) is manipulation too.
- **Version without the harm:** all-in prices on the menu; a fee line visible in the cart from the first item; real-time stages; real stock ("Last 3 portions of today's moussaka" only when the kitchen entered 3); loyalty earned on actual orders; one-tap cancellation of any subscription. Habit itself (rituals, stamp cards, reorder) is legitimate.

---

## Cross-app patterns

1. **The wait is the product.** Every winner turns 20–40 dead minutes into a narrated show: stages, countdown, map, end state. Evidence: labor illusion, operational transparency, Maister.
2. **One hero number.** Wolt's minute countdown, Uber's clock, Domino's ready time. A range works better when delivery is late (PACIS 2022); Uber Eats has shown a "latest arrival by" time next to its estimate since 2019. Accuracy beats optimism (Starbucks' "3 minutes" mistake; the Wolt anecdote).
3. **Progress must be real.** Domino's added oven and driver-left timestamps; QSR questioned whether its stages were real, and NPR found that Domino's own Bake → Quality Check step advances on a timer, with "Quality Check" showing while the pizza sits on the shelf. Transparency backfires when a promise is missed (Guda et al.).
4. **A named, emotional end state** ("mmm!"): peak-end.
5. **Repeat beats acquisition:** McDonald's members visit 2.5× as often (self-selected); Starbucks Rewards members are about 60% of tender; Domino's 35.7M members. Small early rewards plus endowed progress.
6. **Order-ahead and capacity:** at scale, the operation (sequencing, time slots, item caps) is part of the UX.
7. **The price promise is regulated:** all-in pricing is now law in the UK and California (for menus, under conditions) and enforced by the FTC through case law.
8. **Personality is cheap and durable:** Wolt's illustrations and copy and Domino's tracker themes. Their motion is quiet, and no app publishes specs.

## Transplant playbook (single-restaurant ordering + booking)

Spec values marked [H] are recommended starting points, **not** observed app values.

1. **For the order tracker**, show named kitchen stages that change on real staff taps (Received → Cooking → In oven / Packed → Driver left / Ready → Enjoy), like the **Domino's Tracker**, because of the labor illusion and operational transparency (+22.2% perceived quality, Buell, Kim & Tsay 2017). Spec [H]: stage dot fills over 300 ms ease-out, then a 1.5 s pulse loops on the current stage, with a light haptic on each change while the app is open. Web: CSS `@keyframes` pulse, `transition: background-color 300ms ease-out`, Server-Sent Events for status. Native: SwiftUI `.animation(.spring(duration:0.35, bounce:0.15), value: stage)` + `.sensoryFeedback(.impact(weight:.light), trigger: stage)`; Compose `animateColorAsState` + `LocalHapticFeedback`. If a stage really is fixed-length (a conveyor oven, as at Domino's per NPR), advancing it on a timer is acceptable only if it reads "≈" or "estimated", and no stage label may claim an action nobody performs (Domino's showed "Quality Check" while the box sat on the shelf). Never: advance stages on timers while presenting them as live.
2. **For add-to-cart**, keep a persistent cart bar with count and **all-in** total that bumps on add, like **Wolt/Uber Eats** (Wolt's quantity number visibly jumps on every add, per its motion designer), because immediate feedback confirms the action and shows the running cost. Spec [H]: bar scales 1→1.06→1 over 250 ms with spring, count crossfades, light impact haptic. Web: Web Animations API `el.animate([{transform:'scale(1)'},{transform:'scale(1.06)'},{transform:'scale(1)'}],{duration:250,easing:'cubic-bezier(.2,.9,.3,1.2)'})`; `navigator.vibrate(10)` where supported (not iOS Safari). Native: `.scaleEffect` + `.sensoryFeedback(.impact(weight:.light))`; Compose `animateFloatAsState(spring(dampingRatio=0.5f))`. Never: auto-add sides or pre-ticked extras (EU CRD Art. 22).
3. **For the item sheet**, put the live price on the sticky button ("Add · €12.50") and update it as options change, like Starbucks' planned real-time customisation pricing, because price surprises cause abandonment (Baymard: 40% abandon over extra costs). Spec [H]: number ticks 150 ms. Web: `<dialog>` bottom sheet, `font-variant-numeric: tabular-nums`. Native: `.presentationDetents([.medium,.large])`; Compose `ModalBottomSheet`. Never: show the price without the mandatory charges.
4. **For the menu**, sync category tabs with scroll in both directions, like **Wolt/Uber Eats**, because users scan by category and need to know where they are. Spec [H]: tab underline slides 200 ms ease-out; programmatic scroll is smooth with observer updates muted until it ends. Web: `IntersectionObserver`, `scroll-margin-top`, `scrollIntoView({inline:'center'})`, `position: sticky`. Native: `ScrollViewReader` + `.scrollPosition(id:)`; Compose `LazyListState` + `ScrollableTabRow`. Never: hijack scroll speed.
5. **For the ETA**, show one hero range ("Ready 19:40–19:50") computed from the restaurant's own median prep time by hour and order size, like **Uber Eats/Domino's AI ready time** (Uber Eats pairs its estimate with a "latest arrival by" time), because intervals cut dissatisfaction when you are late (PACIS 2022) and lateness costs more than earliness helps (LMU). Spec: update only when the change is 3 min or more [H]. Web/Native: numeric text with a 200 ms crossfade (`.contentTransition(.numericText())` in SwiftUI; `AnimatedContent` in Compose). Never: a fixed optimistic constant, or "3 minutes" when the user cannot arrive in 3 minutes.
6. **For delays**, push the reason before the customer notices, like **Uber Eats'** delay explanations, because explained waits feel shorter (Maister). Spec: one push and an inline banner. Never: silently slide the ETA.
7. **For the checkout commit**, use one button labelled with the final total ("Pay €27.40"), Apple Pay / Google Pay first, guest checkout by default, like the aggregators' express pay (Wolt offers Apple Pay on iOS and Google Pay on Android; Uber Eats no longer lets users add Google Pay, so do not assume both wallets are everywhere), because forced accounts drive 18% of abandonment (Baymard). Spec [H]: busy spinner within 100 ms, button disabled until the response, success haptic. Web: Payment Request API, `aria-busy`, disable on submit. Native: `PayWithApplePayButton`; Google Pay Compose button. Never: add a fee after this button.
8. **For the confirmed moment**, show a calm, branded confirmation with the order number, the ETA range and the first stage already ticked (endowed progress), like **Domino's** "placed", because the first visible progress reduces anxiety. Spec [H]: checkmark draws over 400 ms, then a notification-success haptic. Web: SVG `stroke-dashoffset` animation. Native: `.symbolEffect(.bounce)` + `.sensoryFeedback(.success)`; Compose `HapticFeedbackType.Confirm` (added in Compose UI 1.8; [release notes](https://developer.android.com/jetpack/androidx/releases/compose-ui)). Never: confetti tied to money spent, or an upsell before the confirmation shows.
9. **For repeat orders**, put "Your usual" (last order, one tap to the confirmed review) at the top of home, like Domino's Easy Order and Uber Eats' one-tap reorder, because habits form through repetition in a stable context: once formed, the context cue triggers the response without a goal in mind ([Wood & Neal 2007, *Psychological Review* 114(4):843–863](https://dornsife.usc.edu/wendy-wood/wp-content/uploads/sites/183/2023/10/wood.neal_.2007psychrev_a_new_look_at_habits_and_the_interface_between_habits_and_goals.pdf)). Spec: a single card; tapping goes to a pre-filled checkout. Domino's Zero Click shows how far this can go (a 10-second cancellable countdown); for a small restaurant, stop at one explicit tap. Never: auto-submit without an explicit tap and a visible cancel.
10. **For loyalty**, run a stamp card with rewards at 3/6/10 orders and 2 stamps endowed at sign-up with a stated reason, like **Domino's** 20/40/60 relaunch, because of the goal gradient (Kivetz 2006) and endowed progress (34% vs 19%, Nunes & Drèze 2006). Spec [H]: on the confirmed screen, the stamp lands with 300 ms spring + light haptic. Never: points that expire silently, or rewards so far away nobody reaches them.
11. **For the delivered / picked-up moment**, end with a named feeling ("Enjoy, Maria") and one-tap dish rating, like **Domino's "mmm!"** for the end state and **Uber Eats' per-dish thumbs up/down** for the rating, because of the peak-end rule. Rate food and delivery separately, as Wolt and Uber Eats do, so a late driver does not sink the kitchen's score. Spec: one screen, one optional action; any comment field opens only after a thumbs-down. Never: a 5-question survey.
12. **For pickup and order-ahead**, sell **capacity-limited time slots** and sequence the kitchen queue, like **Starbucks'** 2025 fixes, because an accurate promise beats a fast one. Spec: grey out slots that are full. Never: accept more orders than the kitchen can make by the promised time.
13. **For push**, send at most 1 marketing push a week, timed to the user's own ordering ritual (e.g. Friday 18:30 if they ordered then twice), because the ritual is the trigger [H]. Native: `UNCalendarNotificationTrigger`; Android `WorkManager`. Web: Web Push (iOS 16.4+ only for installed PWAs). Never: guilt copy ("We miss you…, don't let your stamps go to waste!").
14. **For waiting personality**, use 3–5 illustrations in the restaurant's own style for the order states, like **Wolt**, because occupied time feels shorter. Web: Lottie / dotLottie, or CSS sprite animation. Native: Lottie iOS/Android. Respect `prefers-reduced-motion` / `accessibilityReduceMotion`. Never: endless looping animation on low-power devices.
15. **For table booking**, use party size + date + time → tappable chips of real open slots → confirm, plus "Add to calendar" and a reminder at the guest's chosen time, like **OpenTable** ("see all available tables in real time. Tap the table you want"). When a slot is full, offer a Resy-style **Notify** alert for that party size and time instead of a dead end. Spec [H]: under 30 s for a returning guest. Never: fake "1 table left", or a hidden no-show fee (state any deposit before confirm).
16. **For pricing honesty (the competitive edge against aggregators)**, state "Same prices as in the restaurant · no service fee" on the menu header, like the remedy in the **Grubhub** order, because all-in pricing builds trust and is now law in the UK (DMCC, Apr 2025) and California. Never: drip fees, a pre-selected tip, or a "was" price that is not the 30-day low (EU PID Art. 6a).

## Gaps

- **No motion, haptic or sound specs** for any app: no company has published durations or easing, and the YouTube transcripts available (2026-10-08) describe screens, not timings. A follow-up should record each app at 60 fps on a device and fill in the [O] values.
- Still unknown after the 2026-10-08 pass: Wolt's reorder ("order again") flow and its rating-prompt timing; checkout step counts for every app; Deliveroo's consumer tracker, cart and rating; Foody's tracker; whether scrolling the menu moves the active tab in each app; any Domino's-published effect of the Tracker on sales, satisfaction or calls.
- Not retrieved: Uber's design and engineering posts, Deliveroo design articles on Medium (none found), Baymard's full tracking-page critiques (paywalled), a Delivery-only gross-bookings figure for Uber Eats, Foody's Rubies mechanics, and published lift for Starbucks personalisation.
- All former *(from memory, verify)* items were checked on 2026-10-08 (see "Method and limits"); none remains unsourced.
- No randomised field study comparing a live tracker with no tracker in delivery was found (LSE and PACIS evidence is from online and lab experiments).
