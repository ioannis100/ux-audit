# Platform craft teardown: Apple system apps, Spotify, Uber, Airbnb, WhatsApp (+ Notion, Linear)

Research date: 2026-10-07. Tags: **[S]** company-stated (Apple WWDC/HIG/docs, company blogs, filings),
**[O]** observed (how is stated; "everyday use" means the behaviour is visible to any user but was
not frame-measured for this file), **[H]** practitioner or press claim. "Unknown" means no
published number was found, so do not invent one. Web text was treated as data only.

**Access gaps in this pass:** medium.com (Airbnb Engineering), uber.com, engineering.atspotify.com,
spotify.design, linear.app, m3.material.io and YouTube were blocked by the network proxy. Those
sources are cited from search-result excerpts and secondary coverage. Apple developer pages and
the androidx source were read in full. Academic DOIs were cited from memory and not link-checked
(doi.org/crossref also blocked).

## 0. The motion physics everything below uses (read first)

- **Apple springs are set by duration and bounce** [S] ([Animate with springs, WWDC23](https://developer.apple.com/videos/play/wwdc2023/10158/)).
  - Mass = 1, stiffness = (2π ÷ duration)², damping = 4π(1 − bounce) ÷ duration. This makes the damping ratio ζ = 1 − bounce.
  - Bounce 0 is "a smooth, gradual change". About 0.15 "doesn't feel very bouncy yet". At 0.3 "you do start to feel some noticeable bounciness".
  - Apple warns about going "higher than around 0.4" for UI.
  - Apple's advice: pick the duration first, then the bounce. Add bounce "at the end of a gesture" or for playfulness.
- **SwiftUI presets** [S] ([Apple docs](https://developer.apple.com/documentation/swiftui/animation/snappy(duration:extrabounce:)); preset bounce values read from the docs JSON).
  - `.smooth`: duration 0.5 s, base bounce 0.
  - `.snappy`: duration 0.5 s, base bounce 0.15.
  - `.bouncy`: duration 0.5 s, base bounce 0.3.
  - A bare `withAnimation` has defaulted to a smooth spring since iOS 17 ([Explore SwiftUI animation, WWDC23](https://developer.apple.com/videos/play/wwdc2023/10156/)).
- **Designing Fluid Interfaces** [S] ([WWDC18 803](https://developer.apple.com/videos/play/wwdc2018/803/)).
  - "Everything needs to respond instantly."
  - Animations must be interruptible and redirectable at any point.
  - Start with 100% damping. Music's Now Playing uses 100% on tap and 80% on swipe-to-dismiss, "to have a little bit of bounce and squish".
  - The swipe hysteresis "is usually 10 points in iOS".
  - Photos are given "less mass" than app cards because they are "conceptually lighter".
  - A pause in a gesture is detected from the finger's acceleration spike, not from a timer.
  - A thrown object targets its *projected* endpoint, computed from release velocity and the deceleration rate. (Apple's sample uses `UIScrollView.DecelerationRate`. The exact constant is in the sample code, not in the talk.)
  - Rubber-band at edges, and give haptics and sound the same dynamics as the motion.
- **Material 3** [S] (androidx source: [MotionTokens](https://github.com/androidx/androidx/blob/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/MotionTokens.kt), [Standard](https://github.com/androidx/androidx/blob/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/StandardMotionTokens.kt), [Expressive](https://github.com/androidx/androidx/blob/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ExpressiveMotionTokens.kt)).
  - Spatial springs, Standard set (ζ / stiffness): fast 0.9/1400, default 0.9/700, slow 0.9/300.
  - Spatial springs, Expressive set: fast 0.6/800, default 0.8/380, slow 0.8/200.
  - Effects springs (opacity and color) have ζ 1 with stiffness 3800, 1600 or 800.
  - Duration tokens run from 50 ms to 1000 ms. Short1–4 are 50–200 ms, Medium1–4 are 250–400 ms, Long1–4 are 450–600 ms.
  - Emphasized easing is `cubic-bezier(0.2,0,0,1)`. Emphasized-decelerate is `(0.05,0.7,0.1,1)`. Emphasized-accelerate is `(0.3,0,0.8,0.15)`.
- **Translating between platforms (derived from the [S] formulas, not a published table).**
  - Apple `spring(duration: d, bounce: b)` ≈ Compose `spring(dampingRatio = 1 − b, stiffness = (2π/d)²)`.
  - `.snappy` at 0.5 s ≈ ζ 0.85, k ≈ 158.
  - At 0.35 s: k ≈ 322. At 0.3 s: k ≈ 439.
  - Web: Motion (`motion.dev`) accepts `{type:"spring", visualDuration, bounce}` directly. Use CSS `linear()` only with a generated spring curve.
- **Haptics** [S] ([HIG Playing haptics](https://developer.apple.com/design/human-interface-guidelines/playing-haptics)).
  - Notification types (success, warning, error) report "the outcome of a task".
  - Impact types (light, medium, heavy, rigid, soft) are for "a view snaps into place".
  - Selection is for values that change.
  - "Use system-provided haptic patterns according to their documented meanings". Match intensity and sharpness to the animation, avoid overuse, and make haptics optional.
  - Apple's own example of confirming a significant action: "people appreciate getting feedback that confirms a successful Apple Pay transaction" ([HIG Feedback](https://developer.apple.com/design/human-interface-guidelines/feedback)).
- **HIG Motion** [S] ([link](https://developer.apple.com/design/human-interface-guidelines/motion)):
  - "Aim for brevity and precision in feedback animations".
  - "Avoid adding motion to UI interactions that occur frequently".
  - "Let people cancel motion".
  - "Make motion optional".

## 1. Apple system apps and features

**Core loop.** The OS turns everyday chores (pay, move, wait, remember, check the sky) into
moments that are confirmed, glanceable and physical.

**Traction.**
- Apple reported 2.35 billion active devices on its Q1 FY25 call in January 2025 [S, as reported in press; the primary transcript was not re-fetched here].
- There is no official Apple Pay user count. Third-party estimates for 2025 range from about 624M to 803M ([Capital One Shopping](https://capitaloneshopping.com/research/apple-pay-statistics/), [ElectroIQ](https://electroiq.com/stats/apple-pay-vs-google-pay-statistics/)) [H]. Treat them as soft.

### 1a. Apple Pay

1. **Double-click to wake the wallet.**
   - What the user experiences: a double-click of the side button slides the card up from the bottom edge. A glance at Face ID authenticates. The prompt reads "Hold Near Reader".
   - Spec: the double-click is a hardware gesture that bypasses navigation [O, everyday use]. Duration and spring are unknown.
   - Mechanism: a physical, memorable gesture with zero navigation (Fitts + habit cue).
   - Evidence: no published A/B data. HIG lists "double-clicking on Apple Watch" as a payment method [S] ([HIG Apple Pay](https://developer.apple.com/design/human-interface-guidelines/apple-pay)).
   - Transplant: in a restaurant app, give the reorder its own one-gesture entry point (a long-press on the app icon, "Reorder usual"), so the habit never touches the menu.
2. **The "Done" checkmark, chime and tap.**
   - What the user experiences: a circle draws into a checkmark, with a short chime and a haptic.
   - Spec: sequence of stroke draw, then sound and haptic together [O, everyday use]. Durations unknown. Haptic type unknown. The closest public analogue is `.success`.
   - Mechanism: closure plus multisensory confirmation removes "did it go through?" doubt.
   - Evidence: HIG (above) names this as the model confirmation [S]. Tactile feedback improved touchscreen speed and accuracy in [Hoggan et al., CHI 2008](https://doi.org/10.1145/1357054.1357300).
   - Transplant: on "Order placed", draw a checkmark (stroke about 300–400 ms [H]) with a `.success` haptic. Show the pickup time on the same screen, not in a later email.
3. **The payment sheet owns progress.**
   - What the user experiences: one sheet shows the card, the total and "Pay with Face ID", then a spinner, then the checkmark.
   - Spec: HIG says "Defer to the payment sheet for progress information… additional spinners… can create confusion" [S].
   - Mechanism: a single locus of state.
   - Transplant: in checkout, keep one status element that morphs Pay → Processing → Paid. Never stack a toast on top of a spinner.
4. **Express checkout.**
   - What the user experiences: the cart jumps straight to the sheet.
   - Spec: HIG says to "Accelerate multi-item purchases with express checkout" and to "Avoid requiring account creation before purchase" [S].
   - Transplant: show the Apple Pay or Google Pay button on the cart, not after a delivery-details page. Ask for an account on the confirmation page with fields pre-filled.

**Ethical line.** Frictionless payment lowers the "pain of paying". People spend more with cards
than cash ([Prelec & Loewenstein 1998](https://doi.org/10.1287/mksc.17.1.4); [Soman 2001](https://doi.org/10.1086/319621)).
Apple's checkmark *confirms*. It does not *celebrate*, and there is no confetti on spending.
The harm-free version: a calm confirmation, an honest total that includes fees, and spend summaries.
Never put a reward animation on a money-out event (see the Robinhood confetti settlement in HANDOFF §1).

### 1b. Fitness Activity rings

1. **Ring fill and close.**
   - What the user experiences: three concentric arcs (Move, Exercise, Stand) fill clockwise. On closing, the watch taps the wrist and shows a celebratory spinning-ring animation with sparks.
   - Spec: the fill animation and haptic pattern are unknown. The celebration is [O, everyday use].
   - Design rules [S] ([HIG Activity rings](https://developer.apple.com/design/human-interface-guidelines/activity-rings)): always on black, never recolored, never decorative, one person only.
   - Mechanism: goal gradient (effort accelerates near the goal; [Kivetz et al. 2006](https://doi.org/10.1509/jmkr.43.1.39)) and closure. Jay Blahnik: numbers "continue to get bigger", but "a ring is either closed or not" [S] ([9to5Mac memo](https://9to5mac.com/2015/03/09/jay-blahnik-memo/)).
   - Evidence: wearable trackers increase physical activity in an umbrella review ([Ferguson et al. 2022, Lancet Digital Health](https://doi.org/10.1016/S2589-7500(22)00111-X)).
   - Transplant: a coffee app shows one ring that fills toward a free drink and closes with a single `.success` haptic. Don't use numbers like "7/10 stamps".
2. **Overshoot laps.**
   - What the user experiences: past 100%, the ring keeps going round. A shadowed end-cap shows the second lap [O, everyday use].
   - Mechanism: the goal is a floor, not a ceiling. Over-achievement stays visible.
   - Transplant: a loyalty ring that keeps counting after the reward unlocks ("1.4×"). It shouldn't reset to an empty state.
3. **Stand nudge at :50.**
   - What the user experiences: a wrist tap ten minutes before the hour if you have not stood [O, everyday use].
   - Mechanism: a well-timed, actionable trigger with a deadline the user can still meet.
   - Transplant: send a lunch-order nudge only when the action can still succeed ("Order by 11:40 for 12:00 pickup"). Never send it after the window closes.
4. **Competitions and sharing.** Friends see your rings, and 7-day competitions pit you against them [O, everyday use]. Mechanism: social comparison and accountability.
5. **"Close Your Rings" as a brand verb.** Apple's 2017 campaign reused the exact UI graphic [S/H] ([Cannes Lions](https://lovethework.com/work-awards/campaigns/apple-watch-series-2-close-your-rings-29598)). Transplant: make your completion state nameable ("Order's in the oven").

**Ethical line and harm-free version.** Streak pressure pushed people to exercise while sick or
injured [H] ([Macworld](https://www.macworld.com/article/3183369/ring-toss-why-the-apple-watch-activity-goals-need-an-update.html)).
watchOS 11 (September 2024) added **Pause Rings**, which keeps the streak through a pause, and
goals set per weekday [S, via [MacRumors](https://macrumors.com/2024/09/16/apple-releases-watchos-11)].
This is the reference design for an ethical streak: pausable, adjustable, never shaming.

### 1c. Dynamic Island and Live Activities

1. **The island morph.**
   - What the user experiences: the black pill stretches into a card (a ride, a timer, a delivery) and contracts back. Touches feel continuous.
   - Spec: system morph parameters unknown. Content animations in a Live Activity have "a maximum duration of two seconds" [S] ([HIG Live Activities](https://developer.apple.com/design/human-interface-guidelines/live-activities)).
   - Apple's stated goal at launch: "surface alerts and background activity in a rich and delightful way" [S, via [TechCrunch](https://techcrunch.com/2022/09/07/the-iphone-14-pro-turns-the-infamous-notch-into-a-dynamic-island)].
2. **Compact, minimal and expanded presentations** [S] ([Design dynamic Live Activities, WWDC23](https://developer.apple.com/videos/play/wwdc2023/10194/)).
   - Compact: content "snug against the sensor region".
   - Minimal: "Avoid reverting to purely just a logo".
   - Expanded: "maintain the relative placement of things between the two views".
   - The island's corner radius is 44 pt, and the Lock Screen margin is 14 pt [S].
3. **Numeric countdown.**
   - What the user experiences: the ETA digits roll.
   - Spec: "Use the numeric content transition to count up or down"; use content-replace for other elements [S]. In SwiftUI, `.contentTransition(.numericText())`.
   - Mechanism: change you can see without reading.
4. **Layout that grows with the task.**
   - Apple's rideshare example [S]: "while searching for an available driver… the layout can remain compact until the ride has been accepted and then transition in the rest".
   - HIG: "animate existing elements to their new positions rather than removing" them [S].
5. **Alert only on essentials.**
   - Alerts light the screen and play a sound. "Avoid alerting people too often", and "don't use push notifications alongside Live Activities for the same updates" [S].
   - A Live Activity should last at most 8 hours [S]. After it ends it stays on the Lock Screen for up to 4 hours. A custom dismissal of "15 to 30 minutes is adequate", for example a ride summary plus tip [S].
6. **An action inside the activity.** "The Live Activity of a rideshare app could include a button to contact the driver" [S].

- **Evidence.** One vendor claims 23.7% higher 30-day retention for apps that use Live Activities ([OneSignal](https://onesignal.com/live-activities)) [H]. This is correlational with no published method.
- **Transplant.** A restaurant app starts a Live Activity at "Order accepted" with stages Accepted → Cooking → Ready, a progress bar, and the pickup time as rolling digits. Alert only on "Ready" and end the activity 15 minutes after pickup.
- **Ethical line.** Using the island for promotions, or keeping activities alive after the task, breaks the HIG's "defined beginning and end" rule. People then switch Live Activities off in Settings for every app [S].

### 1d. Photos

1. **Tap to open, swipe down to dismiss.**
   - What the user experiences: a thumbnail grows into the full photo. Dragging down shrinks it live under the finger, and on release it flies back to its exact grid cell.
   - Spec: fully interruptible and velocity-projected. Photos are given "less mass" [S] (WWDC18). Numbers unknown.
   - Mechanism: object constancy, so you never lose your place.
   - Evidence: animated transitions improved how accurately people read changes in charts ([Heer & Robertson 2007](https://doi.org/10.1109/TVCG.2007.70539)). See also [Chang & Ungar 1993](https://doi.org/10.1145/168642.168647). Caution: animation does not always beat static frames ([Tversky et al. 2002](https://doi.org/10.1006/ijhc.2002.1017)).
2. **Pinch-zoom grid.** Continuous zoom between year, month and day densities, anchored at the pinch point [O, everyday use].
3. **Memories and Featured Photos.**
   - What the user experiences: auto-made films set to music, plus a widget that surfaces "on this day" photos [O, everyday use].
   - Mechanism: rediscovery. People underestimate how much they will enjoy rediscovering ordinary moments ([Zhang et al. 2014, Psychological Science](https://doi.org/10.1177/0956797614542274)).
   - Transplant: a food app's "A year ago you tried the truffle pasta at X". This is honest, personal and has no discount attached.
4. **Ethical line.** Resurfacing painful memories (an ex, a death). Apple lets people hide people and dates from Memories [O, Settings in everyday use]. Copy that control.

### 1e. Weather

1. **Live condition backgrounds.** Animated rain, cloud and sun behind the data match the current sky [O, everyday use]. Spec unknown. Mechanism: instant gist before reading (preattentive).
2. **Next-hour precipitation chart and alerts.** Inherited from Dark Sky, which Apple acquired in 2020 [S, widely reported]. Mechanism: a specific, actionable forecast ("Rain starting in 12 min").
3. **10-day range bars.** Each day's low–high is a bar on a shared scale, with a dot for "now" on today [O, everyday use]. Transplant: show delivery-time ranges as bars on one scale, not as text.
4. **Pull with no task.** The checking ritual (morning, before leaving). The widget answers without opening the app. Transplant: a home-screen widget showing "Your usual · 15 min · €9.40".

**Apple feel summary.**
- Transitions are springs, interruptible, and grow from their source.
- Scrolling has rubber-banding and momentum, with a 10 pt hysteresis before a swipe commits.
- Buttons highlight on touch-down and confirm on touch-up, with "an extra margin around the tap area" [S] (WWDC18).

**Onboarding to aha.**
- Apple Pay: Wallet → + → scan the card with the camera → verify with the bank → done. That is about 4–5 steps. Seconds unknown, because bank verification varies.
- Rings: pair the watch → set a Move goal → the first ring progress shows the same day.

## 2. Spotify

**Core loop.** Press play → hear something you love or newly discover → it learns → you come back for more of "you".

**Traction.** 777M MAU and 300M Premium subscribers in Q2 2026 [S] ([Form 6-K](https://www.sec.gov/Archives/edgar/data/0001639920/000114036126031044/ef20078867_ex99-1.htm)).

1. **Wrapped.**
   - What the user experiences: a full-screen, tap-through story of your year, with bold type, motion, music for each card, and a shareable final card.
   - Spec: per-card timing unknown. 2023 used native animations for data visuals and Lottie for brand visuals [S] ([Spotify Engineering](https://engineering.atspotify.com/2024/01/exploring-the-animation-landscape-of-2023-wrapped)). 2025 was built in Rive and driven by real data [S/H] ([Rive](https://framer.rive.app/blog/spotify-used-rive-for-spotify-wrapped-2025)).
   - Mechanism: self-disclosure is intrinsically rewarding ([Tamir & Mitchell 2012, PNAS](https://doi.org/10.1073/pnas.1202129109)), plus identity signalling and an annual ritual.
   - Evidence [S]: 200M engaged users in the first 24 h of 2025, versus 62 h the year before, and 500M+ shares on day one, up 41% ([TechCrunch](https://techcrunch.com/2025/12/04/spotify-says-wrapped-2025-is-its-biggest-yet-with-200m-users-in-its-first-day)).
   - Evidence [H]: downloads rose 23% in the 3 days after release in 2019 ([Fortune, Sensor Tower](https://fortune.com/2019/12/11/spotify-wrapped-playlist-app-download)) and 21% in the first week of December 2020 ([MoEngage](https://www.moengage.com/blog/spotify-wrapped-2020-app)).
   - Transplant: "Your 2026 on the menu", with 5 cards (top dish, most-ordered day, new cuisine tried, your "flavour type") and a 9:16 share card. Ship it the same week every year.
2. **Data-driven animation as identity.** Audio Aura in 2021 and Sound Town in 2023 mapped your listening to colour and to a place [S] (Spotify Engineering). Transplant: generate the share card's colours from the user's own data, so no two cards look the same.
3. **Discover Weekly and Daylist.** Weekly and intra-day refreshes give a reason to open with no task [O, everyday use]. Mechanism: a scheduled variable reward plus novelty. Transplant: a "This week's picks for you" shelf that changes every Monday morning.
4. **Like-heart / add.** Tapping the "+" turns it into a filled green check with a small scale pop [O, everyday use]. Spec unknown. Mechanism: instant optimistic acknowledgement.
5. **Mini-player to Now Playing.** The bottom bar expands into a full player and drags down to collapse. It uses the same pattern Apple Music uses with 100% and 80% damping [S, WWDC18 for Apple Music; Spotify spec unknown].
6. **Canvas.** Looping vertical video behind the track [O]. Spotify claims lifts in streams and shares (figures not re-verified in this pass).

**Feel.** The dark UI lets artwork carry the colour. Scrolling is shelves within shelves. The player is always one tap away.

**Onboarding.** Sign up, pick a few artists, and a personalised Home appears straight away [O]. Seconds unknown.

**Pull with no task.** New personalised mixes on a schedule, Wrapped as the year's peak, Blend with friends.

**Ethical line.** Wrapped is honest data about the user, which makes it legitimate. Flag autoplay
that never ends and any fake "you're in the top 0.5%" claim. The badge must be computed, not flattering.

## 3. Uber

**Core loop.** Set a destination → see an upfront price and ETA → watch the car come → ride → rate and tip.

**Traction.** 208M monthly active platform consumers and 3.9B trips in Q2 2026, up 18% year on year [S] ([8-K](https://www.sec.gov/Archives/edgar/data/0001543151/000154315126000027/uberq226earningspressrelea.htm)).

1. **Car on the map.**
   - What the user experiences: a top-down car glides along streets toward you and rotates on turns. The ETA ticks down.
   - Spec [H]: interpolation between GPS pings so the marker glides instead of jumping ([patent on probe-point smoothing](https://patents.google.com/patent/US10281291)). Assignee not confirmed. Uber's own rates are unknown.
   - Mechanism: operational transparency. Seeing the work being done raises perceived value and trust ([Buell & Norton 2011](https://doi.org/10.1287/mnsc.1110.1376); [Buell, Kim & Tsay 2017](https://doi.org/10.1287/mnsc.2015.2411)). Uncertain, unexplained waits feel longer ([Maister 1985](https://davidmaister.com/articles/the-psychology-of-waiting-lines/)).
   - Transplant: in a pickup app, show a "kitchen" track with a moving marker (Order received → Cooking → Packing → Ready). The marker eases between real state updates and never moves without a real event.
2. **Searching pulse.** Concentric pulses radiate while a driver is matched [O, everyday use]. Spec unknown. Mechanism: the system is visibly working (the labor illusion). Rule: run it only while a real search is in progress.
3. **Upfront price.** The fare is shown before you commit. Uber calls it "an estimate, not a guarantee" [S] ([Uber](https://www.uber.com/ride/how-it-works/upfront-pricing)). Mechanism: less uncertainty. Transplant: show the final total, with fees, on the menu item. Never reveal it only at checkout.
4. **Live Activity and Dynamic Island trip.** Uber published its iOS Live Activity design, including the constraint that the island is shared with other apps [S] ([Uber blog](https://www.uber.com/blog/live-activity-on-ios/), excerpt only).
5. **Lottie motion system.** Uber's small motion team ships through a shared Lottie library [S/H] ([LottieFiles case study](https://lottiefiles.com/case-studies/uber)).
6. **Trip-end rating and tip.** Asked at the peak-end, the moment the ride completes. A ride summary stays about 30 minutes (Apple's own example, [S] HIG).

**Feel.** The map is the canvas. Bottom sheets drag between detents. The UI is black and white so the car and the route stand out.

**Onboarding.** Phone number → SMS code → payment → destination. The aha is the first car moving toward you. Seconds unknown.

**Pull with no task.** Weak by design. Pull comes from Uber One savings framing and cross-sell to Eats.

**Ethical line.** Surge pricing and subscription traps. The FTC sued Uber in April 2025 over Uber One
billing and cancellation [H, widely reported; the primary complaint was not re-fetched]. The harm-free
version: show the surge before the request, and offer one-tap cancellation.

## 4. Airbnb

**Core loop.** Browse places → save to a wishlist → book → stay → review → plan the next trip.

**Traction.** 148.3M nights and seats booked in Q2 2026, up 10%. 64% of nights were booked in the app [S] ([Q2 2026 letter](https://www.sec.gov/Archives/edgar/data/0001559720/000119312526337928/d70413dex991.htm)).

1. **Shared-element listing transition.**
   - What the user experiences: the photo on a listing card grows into the detail page's hero while the rest fades in. Going back reverses it.
   - Spec: a declarative framework in which a view present in both states "performs a shared element animation", the background crossfades and the foreground slides [S] ([Motion Engineering at Scale](https://medium.com/airbnb-engineering/motion-engineering-at-scale-5ffabfc878), via excerpt).
   - Earlier open-source mechanics [S]: each shared element moves to the matched centre and scales by the width and height ratio, while the destination snapshot fades in ([native-navigation](https://github.com/airbnb/native-navigation/blob/master/docs/guides/shared-element-transitions.md)). Durations unknown.
   - Mechanism: object constancy (see Photos evidence).
   - Transplant: a dish photo in the menu grid grows into the dish detail. Use `matchedGeometryEffect` or `.navigationTransition(.zoom)` on iOS, `SharedTransitionLayout` in Compose, and `view-transition-name` on web.
2. **Wishlist heart.** The heart fills with a pop when you save [O, everyday use]. Spec unknown. Mechanism: low-cost investment that loads a future trigger (price drops, dates). Transplant: "Save dish" adds it to "Favourites" and later powers "Your favourite is back".
3. **Lottie (2017).**
   - Airbnb open-sourced After Effects → JSON rendering, so "designers can create **and ship** beautiful animations without an engineer painstakingly recreating them" [S] ([lottie-ios](https://github.com/airbnb/lottie-ios); [Android Police](https://www.androidpolice.com/2017/02/02/lottie-airbnbs-new-open-source-tool-effortlessly-creating-app-animations/)).
   - Spotify adopted it in 2022 [S].
4. **2025 dimensional icons.**
   - In the 2025 redesign the Experiences balloon "belches fire" and the Services bell "shakes as if summoning a concierge" [S] (design lead Teo Connor, [Design Week](https://www.designweek.co.uk/it-was-a-bit-nuts-teo-connor-on-designing-the-new-airbnb-app/)).
   - Connor: "the delightful moments always have a utility behind them". Check-in shows an open door with lights on, and check-out shows a dark, closed door [S].
5. **Search as expanding cards.** Where, When and Who are stacked cards. The active one expands and the others collapse into summaries [O, everyday use]. Mechanism: one decision at a time, with progress visible.
6. **Browse before account.** You can search and view listings without signing up. The account is asked for at booking [O].

**Feel.**
- Soft depth since 2025. Earlier versions were flat.
- Transitions carry continuity, scrolls are image-led, and buttons are large with high contrast.
- Animation is attached to meaning, not decoration.

**Pull with no task.** Wishlists, trip countdowns, and dreaming (category tabs).

**Ethical line.** Drip pricing. Showing the total price is the harm-free version, and US junk-fee
rules pushed the industry toward it [H]. Flag fake scarcity ("Rare find") unless it is computed.

## 5. WhatsApp

**Core loop.** A message arrives → open it → reply → see it delivered and read.

**Traction.** More than 3B monthly users, per Meta, April 2025 [S] ([allAfrica report](https://fr.allafrica.com/stories/202505060193.html)).

1. **Ticks.**
   - What the user experiences: one grey tick means sent, two grey ticks mean delivered, two blue ticks mean read.
   - Spec: state swap; animation unknown [O, everyday use].
   - Mechanism: it removes the uncertainty of the wait (Maister).
   - Evidence: blue ticks caused "quite the panic" in 2014 and an opt-out toggle followed [H] ([Social Samosa](https://www.socialsamosa.com/2014/11/whatsapp-lets-users-disable-blue-ticks)). No controlled study was found.
   - Transplant: order status as ticks. One tick when sent to the restaurant, two when the restaurant saw it, filled when cooking.
2. **"typing…"** A live presence signal from the other person [O]. Mechanism: anticipation and reciprocity.
3. **Hold to record a voice note.** Hold the mic, slide to cancel, lock upward [O, everyday use]. Mechanism: a lightweight gesture with a safe exit.
4. **Swipe to reply.** A short horizontal swipe with a light tick at the threshold [O, everyday use]. This is the hysteresis plus detent pattern from WWDC18.
5. **Contacts already present.** The phone number is the identity, so your social graph exists at minute zero [O].

**Feel.** Native, plain and fast. Motion is almost absent. Speed and reliability are the delight.

**Onboarding.** Number → SMS code → name. Your chats are there. Under a minute [H].

**Pull.** People. There is no feed and no streak, and that is the point.

**Ethical line.** Read receipts create pressure. The harm-free version is reciprocal: you can turn them
off, but then you can't see other people's [S/O]. Last-seen and online visibility are user-controlled.

## 6. SaaS craft: Linear and Notion (brief)

**Linear.**
- Core loop: capture issue → triage → ship, almost entirely from the keyboard.
- Traction: not verified in this pass. Reported as a $1.25B valuation in 2025 [H].
- **Speed as the brand.**
  - Third-party analyses attribute the speed to a local-first sync engine: optimistic writes to an in-memory store, with the server reconciling in the background [H] ([performance.dev](https://performance.dev/how-is-linear-so-fast-a-technical-breakdown.md)). The "<50 ms renders" claim is unsourced.
  - Mechanism: Nielsen's 0.1 s limit for "instant" ([NN/g](https://www.nngroup.com/articles/response-times-3-important-limits/)) and the Doherty threshold of 400 ms.
- **Cmd+K and shortcuts.** "Any action can be accessed and completed in seconds" [S] ([Linear](https://linear.app/features/level-up)). Shortcut hints sit inside tooltips and menus [O], which teaches power use as you go.
- **Quality as a principle.** "Quality is our first principle" [H, attributed to Karri Saarinen ([summary](https://www.antoinebuteau.com/lessons-from-karri-saarinen-of-linear.md))].
- Transplant: a restaurant dashboard where "Mark ready" is the R key, list actions are optimistic, and there is a ⌘K palette for "86 an item".

**Notion.**
- The "/" command gives every block type from the keyboard. The drag handle appears on hover. The blank page can become a template [O, everyday use].
- Mechanism: progressive disclosure, with power hidden one keystroke away.

**Ethical line.** Neither app depends on compulsion. Their pull is competence (Linear) and owning your own system (Notion).

## Cross-app patterns

1. **Source-anchored motion.** Things grow from where you touched them and return there: Photos, the Airbnb listing, the Spotify player, the island. Object constancy is the single most-copied pattern.
2. **Springs, not curves, for anything the finger drives.** Apple and Material both moved to springs. Start at bounce 0 (ζ 1) and add about 0.15–0.3 only at a gesture's end or for playful moments.
3. **Visible work beats a spinner.** Uber's car, Live Activity stages and WhatsApp ticks all show real progress (operational transparency). Never fake it.
4. **Confirmation, not celebration, for money.** The Apple Pay checkmark is calm. Big celebration is reserved for effort the user made (rings, Wrapped).
5. **One locus of state.** The payment sheet owns progress, the island owns the ongoing task, and a ride has one status line.
6. **Rituals on a calendar.** Wrapped yearly, Discover Weekly on Mondays, monthly ring challenges, Memories "on this day". Scheduled novelty is honest pull.
7. **Personal data as the reward.** Wrapped, Memories and rings all reward users with *themselves*.
8. **Value before account.** Airbnb browsing, WhatsApp's instant graph, Apple Pay's express checkout.
9. **Restraint on repeat actions.** HIG says to avoid motion on frequent interactions. Linear and WhatsApp have almost no motion and feel the fastest.
10. **Ethics shipped as features.** Pause Rings, read-receipt reciprocity, hiding people from Memories, total-price display.

## Transplant playbook

1. For **navigation into detail**, grow the tapped image into the hero (shared element), like Airbnb and Photos, because object constancy keeps orientation.
   - Spec: spring duration 0.35–0.5 s, bounce 0 [S presets]; reverse on back; interruptible.
   - Web: `view-transition-name` plus `document.startViewTransition()`.
   - Native: `.navigationTransition(.zoom(sourceID:in:))` or `matchedGeometryEffect`; Compose `SharedTransitionLayout` with `Modifier.sharedElement`.
   - Never: a crossfade that hides where the content came from.
2. For **payment success**, draw a checkmark with a success haptic, like Apple Pay, because multisensory closure ends doubt.
   - Spec: stroke about 300–400 ms [H], haptic at the stroke's end, sound optional and off when muted.
   - Web: SVG `stroke-dashoffset` animation; no haptic on iOS Safari.
   - Native: `.sensoryFeedback(.success, trigger:)`; Android `HapticFeedbackConstants.CONFIRM`.
   - Never: confetti or a reward for spending.
3. For **order or ride waits**, show the real stage track with a gliding marker, like Uber, because visible work cuts perceived wait.
   - Spec: move only on real events; ease between pings; ETA digits use a numeric transition.
   - Web: `requestAnimationFrame` interpolation and `font-variant-numeric: tabular-nums`.
   - Native: `.contentTransition(.numericText())`; Compose `AnimatedContent`.
   - Never: a fake progress bar or a stage that moves on a timer.
4. For **tasks with a beginning and end, lasting minutes to hours**, start a Live Activity, like Uber or a timer, because glanceable status removes app-opening.
   - Spec: ≤ 8 h [S]; animations ≤ 2 s [S]; alert only on milestones; dismiss 15–30 min after the end [S].
   - Web: none (use a pinned status bar and a Web Push for the "ready" milestone only).
   - Native: ActivityKit; Android ongoing notification (`setOngoing`) or Live Updates where available.
   - Never: ads in the island, or duplicate pushes.
5. For **daily or weekly goals**, use a single closing ring, like Fitness, because the goal gradient plus binary closure motivate.
   - Spec: fill with `.smooth` (0.5 s); on close, one `.success` haptic plus a short burst under 1 s; keep counting past 100%.
   - Web: SVG `stroke-dasharray`.
   - Native: SwiftUI `Circle().trim()`; Compose `Canvas.drawArc` with `animateFloatAsState(spring())`.
   - Never: unpausable streaks; always offer a "Pause" like watchOS 11.
6. For **yearly re-engagement**, ship a "Wrapped" of the user's own data, like Spotify, because self-disclosure is rewarding and shareable.
   - Spec: 5–10 full-screen tap-through cards and a 9:16 share card; same week every year.
   - Web: CSS scroll-snap story or tap zones.
   - Native: `TabView(.page)`; Compose `HorizontalPager`.
   - Never: inflated percentile claims, or sharing without a preview.
7. For **sent or acknowledged states**, use progressive ticks, like WhatsApp, because removing uncertainty calms the wait.
   - Spec: a state swap with a 150–200 ms crossfade (M3 Short3–4 [S]).
   - Web: CSS `opacity` transition.
   - Native: `.contentTransition(.symbolEffect(.replace))`; Compose `Crossfade`.
   - Never: read states the user can't turn off (offer reciprocity).
8. For **drag and throw gestures** (sheets, cards), project the endpoint from velocity and rubber-band at edges, like iOS, because it feels physical.
   - Spec: 10 pt hysteresis [S]; snap with spring bounce 0.15–0.2 when there is momentum [S guidance].
   - Web: Motion `drag` with `dragElastic` and `dragTransition`.
   - Native: a `DragGesture` velocity passed to the spring; Compose `AnchoredDraggable`.
   - Never: animations that block input until they finish.
9. For **saving or favoriting**, fill the icon with a small pop and a light impact, like Airbnb's heart and Spotify's "+", because a cheap investment loads a future trigger.
   - Spec: scale about 1 → 1.2 → 1 with `.snappy` [S preset; scale H]; light impact.
   - Web: `@keyframes` or Motion spring.
   - Native: `.symbolEffect(.bounce)` plus `.sensoryFeedback(.impact(weight: .light))`.
   - Never: delay the state until the server confirms (be optimistic and roll back on error).
10. For **frequent power actions**, give keyboard shortcuts and ⌘K, and make writes optimistic, like Linear, because response under 100 ms feels instant.
    - Spec: no motion on high-frequency actions [S HIG]; show the shortcut in tooltips.
    - Web: a `keydown` map and a command palette (cmdk).
    - Native: `.keyboardShortcut`; Compose `onKeyEvent`.
    - Never: a spinner on a local write.
11. For **loading**, show placeholders immediately and let people keep acting, like the HIG, because an empty screen reads as broken.
    - Spec: skeleton within 100 ms; determinate progress when the duration is known [S HIG Loading].
    - Web: CSS skeleton; Native: `.redacted(reason: .placeholder)`.
    - Never: a fake minimum loader time.
12. For **memory or rediscovery pull**, resurface the user's own past in a dated, personal way, like Photos Memories, because rediscovery is under-anticipated joy.
    - Spec: at most weekly; tap to hide that item forever.
    - Web/Native: a home card or widget (WidgetKit or Glance).
    - Never: resurface without a hide control, and never attach a discount to nostalgia.
13. For **delight icons**, animate only icons that carry meaning, like Airbnb 2025, because "delight always has a utility behind it" [S].
    - Spec: Lottie or Rive under 1 s, played once on tap.
    - Web: `lottie-web` or `@rive-app/canvas`; Native: lottie-ios / lottie-compose.
    - Never: looping decoration on a work screen.
14. For **checkout**, offer express wallet pay on the cart and ask for an account after purchase, like Apple Pay HIG guidance, because steps kill conversion.
    - Spec: wallet button visible without scrolling; the sheet owns progress [S].
    - Web: Payment Request API or Apple Pay JS; Native: PassKit, Google Pay.
    - Never: hide fees until the sheet.
15. For **choosing animation character across platforms**, map one token set, because consistency is how a brand feels.
    - Spec: iOS `.smooth`, `.snappy` or `.bouncy`. On Android, use the M3 Standard or Expressive springs, or convert with ζ = 1 − bounce and k = (2π/d)².
    - Web: Motion `visualDuration` and `bounce`.
    - Never: linear easing for movement [S, WWDC23].
16. For **reduced motion**, replace spatial motion with a crossfade and keep the haptics and the confirmation text, like the HIG requires, because motion must be optional.
    - Web: `@media (prefers-reduced-motion: reduce)`.
    - Native: `@Environment(\.accessibilityReduceMotion)`; Android `Settings.Global.ANIMATOR_DURATION_SCALE`.
    - Never: information conveyed only by motion.
