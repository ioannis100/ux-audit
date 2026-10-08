# Teardown: social and feed apps (Instagram, TikTok, Snapchat, YouTube)

Research for the ux-audit "experience director" direction (see `HANDOFF.md` §1). Goal: know what the world's most-used feed apps actually do in each moment, at spec level, and how to transplant it into apps that are not social (ordering, fintech, SaaS, health).

**Tags.** **[S]** company-stated (blog, newsroom, filing, talk). **[O]** observed (says how).
**[H]** practitioner or press claim. "unknown" means no trustworthy number was found.

**Method limits for this run (read before relying on specs).** No device was available to screen-record and measure frames. `yt-dlp` was blocked by the network proxy (403), so no teardown video transcripts were pulled. `newsroom.tiktok.com`, `help.snapchat.com` and `eng.snap.com` were also blocked, so those are cited through search summaries of the pages. The web-search budget ran out before the last checks. As a result **almost no millisecond numbers for these apps are public or verifiable**: none of the four companies publishes its like-animation or swipe curves. Platform values (Apple, Material, Facebook Rebound) are given as **[S] for the platform**, never as the app's own value. A follow-up pass with a phone, a 120 fps screen recording and frame stepping would turn many "unknown" entries into [O].

---

## 1. Instagram

**Core loop:** open → Stories ring row (who posted today) → tap through stories → scroll the ranked feed or Reels → double-tap to like → post or DM back → wait for likes and replies.

**Traction:** 3 billion monthly active users, announced by Zuckerberg on 24 Sep 2025 [S] ([Shacknews](https://www.shacknews.com/article/146076/instagram-3-billion-mau), [Neowin](https://www.neowin.net/news/instagram-joins-the-3-billion-monthly-active-club-alongside-facebook-and-whatsapp/)).

### Signature moments

**1. Double-tap to like.**
- *Sees/feels:* a large white heart pops over the centre of the photo and fades, while the small heart under the post fills red. No confirm, no wait.
- *Spec:* the like registers on screen before the server answers. Krieger called this "perform actions optimistically" [S] ([Krieger talk via HighScalability](https://highscalability.com/3-secrets-to-lightning-fast-mobile-design-at-instagram/)). Overshoot pop, then fade [O, everyday use, not frame-measured]. Duration, curve and haptic: unknown.
- *Mechanism:* minimal-effort feedback and variable social reward. The like count you send is the currency you hope to receive.
- *Evidence:* teen nucleus accumbens (reward) activation rose for own photos shown with many likes, and teens liked already-popular photos more ([Sherman et al. 2016, *Psych Science*](https://greenfieldlab.psych.ucla.edu/wp-content/uploads/sites/168/2025/04/sherman-et-al-2016-the-power-of-the-like-in-adolescence-effects-of-peer-influence-on-neural-and-behavioral-responses-to.pdf)). Over 1 million posts from 4,000+ users: people post more after a run of likes and less after weak feedback, which is reinforcement-learning behaviour ([Lindström et al. 2021, *Nature Comms*](https://www.nature.com/articles/s41467-020-19607-x)).
- *Transplant:* in a restaurant app, double-tap a dish photo to favourite it, with a centred heart pop and a filled icon, saved optimistically. Favourites then seed "order again".

**2. Optimistic upload ("moving bits when no one is watching").**
- *Sees/feels:* you press Share and the post is already there. The progress bar "just goes".
- *Spec:* the upload starts while the user is still writing the caption, and is deleted if they cancel [S] (Krieger; Systrom interview, same [HighScalability write-up](https://highscalability.com/3-secrets-to-lightning-fast-mobile-design-at-instagram/)).
- *Mechanism:* perceived speed. "No one wants to wait while they wait" (Krieger).
- *Transplant:* start payment-intent creation and the basket price check while the user is still on the address screen, so "Place order" confirms instantly.

**3. Stories ring and segmented progress bars.**
- *Sees/feels:* a colourful gradient ring around avatars with something new [S] ([Instagram, 2 Aug 2016](https://about.instagram.com/blog/announcements/introducing-instagram-stories)). Inside a story, one thin bar per segment fills left to right. Tap right to advance, tap left to go back, hold to pause, swipe to the next person.
- *Spec:* one grey bar per item, "much easier to see how far through the story you are" than Snapchat's clock [H] ([EFTM review, 2016](https://eftm.com/2016/08/instagram-stories-teaching-snapchat-how-to-do-it-right-30543)). The bar fill is linear in time [O, everyday use]. Photo segment duration, the cube transition between people and its timing: unknown.
- *Mechanism:* the Zeigarnik effect, plus a goal-gradient: a finite, visible stack pulls you to finish it. The ring is an "unread" cue that creates a reason to open.
- *Evidence:* no published causal study of the ring itself was found.
- *Transplant:* show today's specials and order-status updates as a ring on the restaurant's logo with segmented bars ("3 new"). Tap through, and the ring greys out when everything is seen.

**4. 24-hour expiry.**
- *Spec:* Stories disappear after 24 h, have no public likes and route replies to DMs [S] ([Instagram 2016](https://about.instagram.com/blog/announcements/introducing-instagram-stories)).
- *Mechanism:* scarcity and low stakes. Ephemeral content lowers the cost of posting, and expiry creates a reason to check daily.
- *Transplant:* a daily dish that is only on the menu today, shown as a story. Use it honestly: the item really does expire, and there is no countdown pressure on the order button.

**5. "You're all caught up."**
- *Sees/feels:* a checkmark divider: you've seen all new posts from the past two days [S] ([Instagram, 2 Jul 2018](https://about.instagram.com/blog/announcements/introducing-youre-all-caught-up-in-feed)).
- *Mechanism:* a stopping cue and closure. This is the ethical counterweight to infinite scroll.
- *Transplant:* end a "what's new" list with "You're up to date, see you after lunch" rather than backfilling it with filler.

**6. Reels: full-screen swipe with adjacent preload.**
- *Spec:* Meta keeps the reels right after the current one prepared in memory ("adjacent preload") using Media3 `PreloadManager`. This improved time to first frame. Over-aggressive preload hurt memory and scroll, so they tuned per device [S] ([Android Developers blog, Mar 2026](https://developer.android.com/blog/posts/instagram-and-facebook-deliver-instant-playback-and-boost-user-engagement-with-media3-preload-manager)).
- *Mechanism:* zero-latency novelty. Any visible wait breaks the loop.
- *Transplant:* prefetch the next two menu-category images and the dish detail of the item under the thumb, so tapping a dish never shows a spinner.

**7. Hidden like counts (a choice, not a default).**
- *Spec:* tested from 2019 "to make it a less pressurized environment". In 2021 it shipped as an opt-in setting per account and per post [S] ([BNN Bloomberg](https://www.bnnbloomberg.ca/instagram-will-let-users-hide-likes-follower-counts-are-staying-1.1608700)).
- *Evidence:* Instagram reported no major wellbeing effect, and user reaction was "split down the middle". Hiding follower counts backfired because new users browse others' follower lists to build their own network [S] (same source).
- *Transplant:* show "popular" social proof on dishes, but never publish a user's own counts (reviews written, orders placed) without asking.

**8. Teen sleep mode.** Notifications are muted 10 pm–7 am with DM auto-replies and a reminder to close the app [S] ([Teen Accounts](https://about.instagram.com/blog/announcements/instagram-teen-accounts)). *Transplant:* a quiet-hours window for marketing pushes, on by default. Order-status pushes are exempt.

### Transitions, scrolling, buttons
- Feed: ranked, effectively endless after the "caught up" divider [S]. Native momentum scrolling, with no custom physics documented. On iOS the default `UIScrollView` deceleration rate is `.normal` (0.998) [S for platform].
- Optimistic actions everywhere: like, comment and follow show instantly [S].
- Haptics: unknown for every Instagram moment; none documented.

### Onboarding to first "aha"
Sign-up, find friends or contacts, follow suggestions, then the feed. The aha is the first like from someone you know. Steps and seconds: unknown (no published funnel). Hiding follower counts hurt network building [S], which suggests the follow graph *is* the onboarding.

### Pull without a task
The Stories ring (new and unseen), activity likes, DMs, and 24 h expiry.

---

## 2. TikTok

**Core loop:** open → a video is already playing, full screen, with sound → swipe up → each swipe is a vote the ranker learns from → share to a friend or follow.

**Traction:** more than 1 billion monthly users [S] ([TikTok newsroom, 27 Sep 2021](https://newsroom.tiktok.com/1-billion-people-on-tiktok?lang=en)); the newest public company figure we found.

### Signature moments

**1. The first For You swipe (no setup).**
- *Sees/feels:* the app opens straight into a playing video. No grid, no choice, and the feed adapts within minutes.
- *Spec:* one item per screen, so every swipe-away or watch-through is an unambiguous signal [H] ([Eugene Wei, "TikTok and the Sorting Hat"](https://eugenewei.substack.com/p/tiktok-and-the-sorting-hat)). Signals reportedly include watch time, completion, replays, likes, shares, comments and follows [S via secondary summaries of TikTok's 2020 "How TikTok recommends videos #ForYou" post; the page was blocked for this run].
- *Mechanism:* no decisions, which removes choice overload. Each swipe is a variable-ratio reward (is the next one great?).
- *Evidence of strength:* TikTok's internal "habit moment" is 260 videos in the first week, reachable "in under 35 minutes", per redacted Kentucky AG filings [S, court filing] ([NPR, Oct 2024](https://www.npr.org/2024/10/11/g-s1-27676/tiktok-redacted-documents-in-teen-safety-lawsuit-revealed)).
- *Transplant:* a restaurant app opens on one full-bleed "tonight's pick for you" card. Swipe for the next pick and tap to add. Learn from skips, so the third card is better than the first.

**2. Snapped vertical paging.**
- *Feels:* a flick always lands exactly one video on, never between two.
- *Spec:* page snapping. Duration, spring and threshold: unknown. Preload of the next item is necessary for zero wait (Meta documents this for Reels [S]; TikTok's method is unpublished).
- *Transplant / web:* `scroll-snap-type: y mandatory; scroll-snap-stop: always` on a 100dvh container, with an IntersectionObserver that preloads item n+1 and n+2.

**3. Double-tap heart where you tapped.**
- *Sees:* a red heart bursts at the finger position rather than the centre, and the side-rail heart fills [O, everyday use]. Duration, the rotation of each burst and the haptic: unknown.
- *Mechanism:* direct manipulation. The reward appears where the action happened.
- *Transplant:* when a dish is added from a photo, fly a small "+1" from the tap point into the basket icon, so the cart answers where the thumb is.

**4. Sound-on by default and the spinning sound disc.**
- *Sees:* the sound disc rotates at the bottom right while audio plays. Tapping it opens every video using that sound [O]. Spec: unknown.
- *Mechanism:* remix culture and collection. A sound is a doorway to a cluster of content.
- *Transplant:* on a dish card, a "made with" chip (for example "truffle") opens every dish sharing the ingredient.

**5. Comments as a half-sheet over the still-playing video.**
- *Feels:* you never leave the content [O]. The sheet height and spring: unknown.
- *Transplant:* reviews open as a bottom sheet over the dish photo. The photo stays visible, and closing returns to the same scroll position.

**6. Teen screen-time default and break prompts.**
- *Spec:* under-18 accounts default to a 60-min daily limit, with a passcode to continue. Teens who opt out are prompted after 100 min. All users got per-day limits, scheduled notification mutes and sleep reminders [S] ([AP via KTVZ, 1 Mar 2023](https://ktvz.com/news/ap-national-business/2023/03/01/tiktok-sets-new-default-time-limits-for-minors-2/)).
- *Transplant:* any "endless" browse surface gets a soft end card after a chosen length ("Still hungry? Here are your 3 saved picks") rather than more filler.

### Transitions, scrolling, buttons
Full-screen paging, autoplay with sound, and a side action rail (like, comment, save, share) in the thumb zone [O]. Curves and haptics are unknown. Nothing is published.

### Onboarding to first "aha"
Optional interest picker, then the For You feed. The account can come later. The aha is the first eerily relevant video, typically within the first few swipes [H]. Seconds: unknown. The internal target is "habit" at 260 views in week one [S, filing].

### Pull without a task
A novelty slot machine (the next video), friends' shares in DMs, and LIVE. Paid LIVE gifts are flagged in §5.

---

## 3. Snapchat

**Core loop:** open on the camera → snap → send to friends (streak +1) → read and reply in chat → check Stories, Spotlight and the Map.

**Traction:** 493 million DAU in Q2 2026 (+5 % YoY) and about 971 million MAU [H, earnings coverage] ([Shacknews](https://www.shacknews.com/article/150235/snapchat-snap-q2-2026-earnings-beat)). US users open Snapchat "nearly 40 times per day, on average" [S] ([Snap Investor Day 2023](https://newsroom.snap.com/investor-day-2023)).

### Signature moments

**1. Opens on the camera.**
- *Sees/feels:* a live viewfinder in about one beat. The product *is* "make something".
- *Spec:* Snap measures "Time to Camera Ready", from icon tap until the camera can take a snap, including the viewfinder, preview frame and capture button. It guards against regressions with systraces [S] ([Snap Eng](https://eng.snap.com/time_to_camera_ready); page fetch blocked, known from its summary). The 2019 Android rebuild cut average open time by about 20 % in early tests and replaced a screenshot of the viewfinder with the real camera [S] ([TechCrunch](https://techcrunch.com/2019/02/05/snapchat-android-rebuild)).
- *Mechanism:* lowest-friction creation. The first screen is the core action.
- *Transplant:* define "Time to Order Ready" (tap icon → the last order can be re-placed with one tap) and land on it when the user has one usual order.

**2. Snapstreaks (fire emoji plus count) and the hourglass.**
- *Sees:* a fire emoji with the day count next to a friend's name. An hourglass appears when the streak is about to end [S, Snap support; page blocked for this run].
- *Spec:* both sides must snap each other within each ~24 h window [S, same caveat]. One free restore, then paid restores, announced on 1 Mar 2023 [S] ([Snap newsroom](https://newsroom.snap.com/keep-the-streak-with-restore)). About US$0.99 each [H, press].
- *Mechanism:* loss aversion, sunk cost, reciprocity and social obligation (two people share it).
- *Evidence / harm:* Utah's June 2025 complaint names streak tracking among features "deliberately crafted to take advantage of young users' mental and emotional susceptibility" [S, filing] ([Axios](https://www.axios.com/local/salt-lake-city/2025/06/30/utah-lawsuit-snapchat-youth-safety-children-teens)). We found no peer-reviewed causal study of Snapstreaks.
- *Transplant (safe form):* a solo "Friday pizza 4 weeks running" badge that pauses rather than breaks, with a free freeze and nothing for sale. Never a streak shared with another person that fails because one of them missed.

**3. Delivered / opened states.**
- *Sees:* a chat row shows sent, delivered and opened as distinct icon states [O]. Spec: unknown.
- *Mechanism:* reciprocity pressure. Knowing they saw it pulls a reply.
- *Transplant:* order status as one glanceable icon row (sent → kitchen saw it → cooking → on the way). The "kitchen saw it" moment is the trust beat.

**4. Snap Map with friends' avatars.**
- *Feels:* a living map of where friends are and what's happening [O].
- *Mechanism:* ambient social presence, a reason to open with no task.
- *Ethics:* Utah's suit names Map location sharing [S, filing]. Ghost mode should be the default for minors.
- *Transplant:* a "live in your area" map of orders being cooked near you, anonymised and aggregated. No individual locations.

**5. Lenses carousel under the shutter.**
- *Feels:* swipe the shutter row and your face changes instantly [O]. Latency spec: unknown.
- *Mechanism:* play and self-expression; the variable reward is "what will this one do?".
- *Transplant:* a carousel of sauces or toppings with an instant visual on the dish photo.

**6. Memories / Flashbacks.**
- *Sees:* "On this day" resurfacing of past snaps [O].
- *Mechanism:* nostalgia and identity; it gives the app a past.
- *Transplant:* "A year ago today you tried the lamb kleftiko. It's on tonight."

### Transitions, scrolling, buttons
Spatial navigation: chat is left of the camera and Stories/Discover are right, reached by swipe [O]. Snap has not published curves or haptics. Unknown.

### Onboarding to first "aha"
Sign-up, contact sync, add friends, camera. The aha is the first snap returned by a friend. Steps and seconds: unknown.

### Pull without a task
Unopened snaps, streak upkeep, Map, and friend emojis. About 40 opens a day [S] is the highest open frequency of the four apps.

---

## 4. YouTube

**Core loop:** open → home recommendations or Shorts → watch → autoplay serves the next → subscribe → notifications for new uploads.

**Traction:** Shorts averages about 200 billion daily views (Mohan, Cannes Lions, Jun 2025) [S via press]. Note that view counting changed on 31 Mar 2025 to count a view on any start ([SEJ](https://www.searchenginejournal.com/youtube-reports-200-billion-daily-views-for-shorts-format/549315/), [TheWrap](https://www.thewrap.com/youtube-shorts-200-billion-daily-views)). Over 1 billion hours a day are watched on TVs [S via press, same].

### Signature moments

**1. Shorts swipe.** The same full-screen paging pattern as TikTok, inside YouTube [O]. Spec: unknown. *Transplant:* as TikTok §2.

**2. Context-aware like animation.**
- *Sees:* a cartoon thumb that plays one of about 20 short, category-themed animations (music, sports, cooking, horror, romance…) [H] ([9to5Google, Oct 2025](https://9to5google.com/2025/10/28/every-like-button-animation-youtube/), [Android Authority](https://www.androidauthority.com/youtube-new-like-button-animations-3610768)).
- *Spec:* about 1 s each [H]. It respects the OS reduce-motion setting [H]. Curves: unknown.
- *Mechanism:* novelty inside a repeated action, plus personalisation. The response fits what you just liked.
- *Transplant:* the favourite button plays a themed micro-animation per cuisine (steam for soups, a chilli wobble for spicy) of no more than 1 s, and is static under `prefers-reduced-motion`.

**3. Autoplay next.**
- *Sees:* an end-of-video countdown into the next recommended video [O]. Countdown length: unknown.
- *Evidence of harm to agency:* in a survey of 120 US users, autoplay and recommendations mainly *undermined* sense of agency, while search and playlists *supported* it. Users with a specific intent prefer high-control UIs ([Lukoff et al., CHI 2021](https://arxiv.org/abs/2101.11778)).
- *Teen default:* autoplay is off by default for ages 13–17, and Take a Break and bedtime reminders are on by default [S] ([YouTube blog, Aug 2021](https://blog.youtube/news-and-events/new-safety-and-digital-wellbeing-options-younger-people-youtube-and-youtube-kids/)).
- *Transplant:* after checkout, suggest one next action ("add dessert for €3?") as a card the user taps. Never an auto-advancing timer that adds things.

**4. Double-tap to seek ±10 s with a ripple** [O, everyday use]. The ripple timing is unknown. *Transplant:* in any media or timeline view, double-tap the edges to step forward or back, with a ripple at the tap point.

**5. Hidden public dislike counts (Nov 2021).** The counts stay private to the creator, aimed at reducing dislike pile-ons [S; the blog link was not re-verified in this run]. *Transplant:* show negative feedback to the restaurant, never as a public tally on a dish.

**6. Subscribe → bell → notification.** Opt-in, creator-driven pull [O]. *Transplant:* "follow this restaurant's specials" is an explicit opt-in, and there are no pushes without it.

### Transitions, scrolling, buttons
The mini-player keeps the video playing while you browse [O]. YouTube Android follows Material; Material 3's emphasized easing is `cubic-bezier(0.2, 0, 0, 1)`, with durations tokenised from 50 to 1000 ms [S for platform] ([M3 motion tokens](https://m3.material.io/styles/motion/easing-and-duration/tokens-specs)). YouTube's own values are unknown.

### Onboarding to first "aha"
No account is needed. The home feed or Shorts play at once, and the aha is search answering a real need. Seconds: unknown.

### Pull without a task
Subscriptions, Shorts novelty, and autoplay chains.

---

## 5. The ethical line, and the version without the harm

Stance: habit and pull are legitimate. Flag manipulation, which here means exploiting compulsion, minors, obligation or money.

- **US state AGs v. Meta (24 Oct 2023):** 41 states and DC sued. They cite "infinite scroll" and constant notifications as addictive design, plus COPPA claims [S, filings] ([IAPP](https://iapp.org/news/a/us-states-sue-meta-over-addictive-social-media-features)).
- **LA bellwether (25 Mar 2026):** a jury found Meta and YouTube negligent in design. It awarded about $6 M, split 70/30, including punitive damages, citing infinite feeds, autoplay and notifications. Both companies plan to appeal. A New Mexico jury returned $375 M against Meta the day before ([ABC30](https://abc30.com/amp/post/los-angeles-social-media-addiction-trial-jury-finds-instagram-youtube-liable-landmark-court-case/18771272/)).
- **US states v. TikTok (Oct 2024):** the redacted Kentucky filing exposed the 260-video "habit moment" ([NPR](https://www.npr.org/2024/10/11/g-s1-27676/tiktok-redacted-documents-in-teen-safety-lawsuit-revealed)).
- **Utah v. Snap (30 Jun 2025):** names streaks, disappearing messages, filters, targeted notifications and Snap Map ([Axios](https://www.axios.com/local/salt-lake-city/2025/06/30/utah-lawsuit-snapchat-youth-safety-children-teens)). New Mexico v. Snap (Sep 2024) focuses on sextortion and safety ([NM DOJ](https://nmdoj.gov/press-release/attorney-general-raul-torrez-files-lawsuit-against-snap-inc-to-protect-children-from-sextortion-sexual-exploitation-and-other-harms/)).
- **EU DSA v. TikTok (6 Feb 2026, preliminary):** the Commission found that infinite scroll, autoplay, push notifications and the personalised recommender were not properly risk-assessed. It said core design must change (for example, disabling infinite scroll and effective screen-time breaks) and that optional controls are not enough ([Slaughter and May](https://thelens.slaughterandmay.com/post/102miei/commission-makes-preliminary-finding-that-tiktoks-addictive-design-breaches-th), [SCL](https://www.scl.org/european-commission-says-tiktoks-addictive-design-breaches-dsa/)). TikTok also withdrew "TikTok Lite Rewards" (paid-to-watch) in the EU under the DSA in 2024 [S; not re-verified in this run].
- **Inventors' regret:** Aza Raskin regrets infinite scroll ([Masters of Scale](https://mastersofscale.com/video/he-invented-infinite-scroll-and-says-he-regrets-it/)). Loren Brichter: "Pull-to-refresh is addictive" and it "could easily retire" ([Guardian, Oct 2017](https://www.theguardian.com/technology/2017/oct/05/smartphone-addiction-silicon-valley-dystopia)).
- **Research:** infinite scroll creates nested loops (an inner session loop inside an outer habit loop). Most reasons people stop come from their life context, not the app ([Rixen et al., MobileHCI 2023](https://doi.org/10.1145/3604275)). Autoplay lowers agency ([Lukoff 2021](https://arxiv.org/abs/2101.11778)).
- **Hidden likes:** a mixed, small effect. It shipped as a choice [S].

**The version without the harm**

| Harmful form | Keep the pull, drop the harm |
|---|---|
| Endless feed, no edge | Feed with a "you're all caught up" end card (Instagram 2018) |
| Autoplay chains | Up-next card the user taps; autoplay off for minors (YouTube 2021) |
| Shared streak that dies | Solo streak that pauses, a free freeze, never a paid restore |
| Night pushes | Quiet hours on by default (Instagram Teen sleep mode) |
| Public counts on people | Counts private by default; social proof shown on *items* |
| Paid randomness or gifts | No paid variable rewards; clear prices |
| Location broadcasting | Ghost mode by default; only aggregated "live near you" |

---

## 6. Cross-app patterns

1. **The first screen is the core action.** Camera (Snap), playing video (TikTok, Shorts) and the ring row (IG). Zero taps to value.
2. **One item per screen yields clean signal.** Full-screen paging makes every skip a vote, so the feed learns fast (TikTok, Shorts, Reels).
3. **Never make the user wait.** Optimistic actions, uploads that start early, and adjacent preload ([Krieger](https://highscalability.com/3-secrets-to-lightning-fast-mobile-design-at-instagram/), [Meta Media3](https://developer.android.com/blog/posts/instagram-and-facebook-deliver-instant-playback-and-boost-user-engagement-with-media3-preload-manager)).
4. **Feedback happens where the finger is.** TikTok's heart at the tap point, YouTube's seek ripple at the edge.
5. **Finite visible stacks.** Segmented progress bars and rings show "how much is left", which completion psychology rewards.
6. **Freshness cues create no-task opens.** Rings, unopened snaps, 24 h expiry, Map presence.
7. **Small novelty inside repeated actions.** YouTube's per-category like animations.
8. **Social obligation is the strongest pull and the most litigated.** Streaks and read receipts.
9. **Each harm has a sanctioned counter-pattern** already shipped by the same company: caught-up, autoplay off, sleep mode, screen-time defaults, hidden counts.
10. **None of the four publishes motion specs.** Their feel comes from speed (no waits) and snapping, more than from bespoke curves.

---

## 7. Transplant playbook

Platform values used below are **[S] for the platform**: SwiftUI `.spring` defaults and named presets (`.snappy`, `.bouncy`) from [WWDC23 "Animate with springs"](https://developer.apple.com/videos/play/wwdc2023/10158/); Material 3 emphasized easing `cubic-bezier(0.2,0,0,1)` from [M3 tokens](https://m3.material.io/styles/motion/easing-and-duration/tokens-specs); Facebook Rebound's default spring of tension 40 and friction 7 from the [Rebound launch post](https://engineering.fb.com/2013/12/10/android/under-the-hood-building-and-open-sourcing-the-rebound-animation-library-for-android/) and its source. App-specific timings are unknown unless stated, and the specs below are
**recommendations, not measurements of the apps.**

1. **For a favourite or like, do a double-tap or tap with an overlay pop and an instant fill, like Instagram, because** low-effort, optimistic feedback closes the loop and fuels reward learning (Lindström 2021). **Spec:** icon fills on frame 1; overlay scales 0→1.2→1 with a bouncy spring (about 0.35–0.45 s) then fades; light impact haptic; the server call runs in the background and rolls back with a toast on failure. **Web:** WAAPI `el.animate([{transform:'scale(0)'},{transform:'scale(1.2)'},{transform:'scale(1)'}],{duration:400,easing:'cubic-bezier(.2,0,0,1)'})`. **Native:** SwiftUI `.symbolEffect(.bounce, value: liked)` + `.sensoryFeedback(.impact(weight:.light), trigger: liked)`; Compose `animateFloatAsState(spring(Spring.DampingRatioMediumBouncy))` + `HapticFeedbackType.LongPress`. **Never:** wait for the network before filling the icon, or show the user's own like counts publicly by default.
2. **For any submit (post, order, payment), do the work before the user commits, like Instagram's early upload, because** perceived wait is what users judge. **Spec:** start the upload or validation when the last field gains focus; on Submit show success within 100 ms if the pre-work finished; cancel deletes the draft server-side. **Web:** fire `fetch` on the last field's `focus` with an `AbortController`. **Native:** a `Task` started on `.onAppear` of the final step; Compose `LaunchedEffect`. **Never:** charge or irreversibly send before the explicit commit.
3. **For a browse surface of big visual items, do one-item full-screen paging, like TikTok and Reels, because** every skip is clean preference signal (Wei) and choice overload disappears. **Spec:** hard snap one item per flick; preload n+1 and n+2; first frame under 100 ms. **Web:** `scroll-snap-type:y mandatory; scroll-snap-stop:always; height:100dvh` plus an IntersectionObserver that preloads. **Native:** SwiftUI `ScrollView` + `.scrollTargetBehavior(.paging)`; Compose `VerticalPager` with `beyondViewportPageCount = 1`. **Never:** autoplay sound on a non-media app, or remove the exit (tab bar and close stay visible).
4. **For any list longer than a session, do an explicit end card, like Instagram's "You're all caught up", because** stopping cues restore agency (Rixen 2023; EU DSA 2026). **Spec:** a checkmark divider plus one useful next action. **Web/Native:** render a sentinel item when the cursor reaches "seen". **Never:** backfill with unrelated filler to keep the scroll going.
5. **For "what's new since you left", do a ring and segmented-bar stack, like Instagram Stories, because** a visible, finite unread stack creates an open with no task (Zeigarnik). **Spec:** gradient ring on unseen; bars fill linearly per segment; tap right/left; hold to pause. **Web:** CSS `@keyframes` on `transform:scaleX()` with `animation-play-state` toggled on pointerdown. **Native:** `ProgressView` row + `TimelineView`; Compose `LinearProgressIndicator` per segment. **Never:** fake newness (a ring with nothing new).
6. **For cold start, do no-setup value then learn, like TikTok's first swipe, because** the aha must come before signup. **Spec:** first screen shows a ranked pick within 1 s; an optional interest picker; ask for an account at the first save or order. **Web/Native:** a guest session with local preferences that merge on sign-in. **Never:** force contacts or notifications before the first value.
7. **For the app's core action, make it the launch screen, like Snapchat's camera, because** zero-tap creation drives frequency (about 40 opens a day [S]). **Spec:** track a "time-to-core-ready" metric like Snap's in CI; restore the last order as one tap. **Web:** SSR the reorder card; `fetchpriority="high"` on its image. **Native:** defer non-critical SDK init until after the first frame. **Never:** a splash or interstitial ad before the core action.
8. **For progress states, show distinct delivered/seen/acting stages, like Snapchat's chat status, because** visible acknowledgement builds trust and reciprocity. **Spec:** 3–5 icon states with a light haptic on each transition. **Web:** `aria-live="polite"` text per state. **Native:** `.contentTransition(.symbolEffect(.replace))`; Compose `AnimatedContent`. **Never:** use "seen" receipts to pressure a *person* into replying.
9. **For a repeated positive action, add contextual variety, like YouTube's category like animations, because** novelty inside routine stays rewarding. **Spec:** no more than 1 s; 5–20 variants keyed to item category; static under reduce-motion. **Web:** Lottie or CSS sprites gated by `@media (prefers-reduced-motion: no-preference)`. **Native:** check `accessibilityReduceMotion`; Compose `Settings.Global.ANIMATOR_DURATION_SCALE`. **Never:** random *rewards* of real value (that is a loot box).
10. **For streaks, do a solo, pausable streak, unlike Snapchat's shared streak, because** loss aversion pulls but obligation and paid restores are litigated (Utah 2025). **Spec:** flame plus count; one free freeze a week; an expiring warning at most once, without guilt copy. **Never:** streaks between two people, paid restores, or hourglass countdowns aimed at minors.
11. **For a sequence (next video, next step), do an up-next card the user taps, not autoplay, like YouTube's teen default, because** autoplay lowers agency (Lukoff 2021) and was named in the 2026 verdict. **Spec:** the card appears at the end with no countdown. **Web/Native:** a standard card component. **Never:** auto-advance that adds items to a basket or spends money.
12. **For tap feedback in media, put it at the touch point, like TikTok's heart and YouTube's seek ripple, because** direct manipulation feels causal. **Spec:** spawn the effect at the pointer's (x, y); 300–500 ms; respect reduce-motion. **Web:** read `PointerEvent.clientX/Y` and place an absolutely positioned element. **Native:** SwiftUI `SpatialTapGesture`; Compose `detectTapGestures { offset -> }`. **Never:** cover controls the user still needs.
13. **For secondary content (reviews, comments), use a bottom sheet over the live primary, like TikTok comments, because** context is never lost. **Spec:** detents at about 50 % and full; springy drag; the primary keeps playing or showing. **Web:** `<dialog>` + `transform: translateY` driven by a pointer drag. **Native:** `.presentationDetents([.medium,.large])`; Compose `ModalBottomSheet`. **Never:** a full-page navigation that resets scroll.
14. **For reminders, use opt-in follows plus quiet hours, like YouTube's bell and Instagram's sleep mode, because** pull that the user chose keeps trust. **Spec:** marketing pushes only after an explicit follow; quiet window 22:00–07:00 on by default; transactional pushes exempt. **Never:** guilt copy, fake urgency, or pushes about streaks at night.
15. **For nostalgia pull, resurface the user's own past, like Snapchat Memories, because** identity and memory make the app *theirs*. **Spec:** at most one "on this day" card, only when there is a real anniversary. **Never:** resurface things the user deleted or hid.
16. **For social proof, put counts on items, not on people, like Instagram's hidden-likes option, because** comparison pressure on people hurts while popularity cues on items help choice. **Spec:** "popular tonight" on dishes; personal counts private by default. **Never:** public leaderboards of individual users' spending.

---

**Gaps to close in a follow-up:** no frame-measured timings (double-tap heart, Reels/TikTok snap, story bar and cube timing, YouTube autoplay countdown); no confirmed haptic types for any of the four apps; no published onboarding funnel times; TikTok's own recommender page and Snap's streak help page were read only through secondary summaries; the TikTok Lite and YouTube dislike-count sources were not re-verified in this run.
