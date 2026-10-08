# Teardown: habit and wellness apps (Duolingo, Headspace, Calm, Strava)

Research date: 2026-10-07. Purpose: give the ux-audit skill concrete, cited moments it can name as benchmarks and transplant into other app types.

**Evidence tags.** **[S]** = the company stated it (blog, help centre, filing). **[O]** = observed in a named third-party screen capture or teardown (I did not drive the apps myself in this session). **[O?]** = widely described UI behaviour that I could not re-observe or source in this session; verify on device before quoting it. **[H]** = practitioner or unofficial claim. Where no number exists, the spec says **unknown**. No durations below are invented.

**Method limits (read first).** This session's network blocked direct fetches of blog.duolingo.com, research.duolingo.com, lennysnewsletter.com, deconstructoroffun.com, Substack and YouTube (`yt-dlp` got a 403 from the proxy). Every claim therefore comes from search-engine extracts of the cited pages, not full-page reads, and the web-search budget ran out before I could cover Headspace motion, Duolingo button physics or Strava's kudos animation. Treat every **[O?]** as a lead to verify, not a fact.

---

## 1. Duolingo

**Core loop:** do one short lesson a day → get instant right/wrong feedback, XP and a streak tick → see your league rank and quests move → a personalised reminder brings you back tomorrow.

**Traction:** 47.7M DAU (+40% YoY), 128.3M MAU and 10.9M paid subscribers in Q2 2025 ([Q2 2025 shareholder letter, SEC](https://www.sec.gov/Archives/edgar/data/1562088/000156208825000165/q2fy25duolingo6-30x25share.htm)). It passed 50M DAU in Q3 2025 ([Q3 2025 press release](https://www.sec.gov/Archives/edgar/data/1562088/000162828025049514/q3fy25duolingo9-30x25press.htm)). "Nearly 8 million" learners hold a 365+ day streak ([Duolingo blog](https://blog.duolingo.com/streak-celebration-parties/)); more than 10M was reported in Feb 2026 ([PocketGamer.biz](https://www.pocketgamer.biz/more-than-10-million-duolingo-users-have-a-365-day-streak)).

### Signature moments

**D1. Streak extended (the daily payoff)**
- *Sees/hears/feels:* after the last lesson screen, Duo and the day count appear, then "Duo spins in the air and bursts into an orange flame" and the number ticks up ([desirabilitylab teardown](https://desirabilitylab.com/backfill/backfill-2023-154-duolingo-streak-design)) [O]. The flame icon grows and changes colour as the count rises, and it upgrades at 30 days [O] (same source).
- *Spec:* sequence: character → count → spin → flame burst → number increments [O]. Duration, easing and haptic: **unknown**. An unofficial design-system write-up claims "Duo jumps on streak milestones (480 ms ease-out spring)" and "blinks every 4–6 s" ([open-design.ai](https://open-design.ai/plugins/design-system-duolingo/)) [H, unverified]. Duolingo says the characters are built in Rive state machines ([Duolingo blog: Building character](https://blog.duolingo.com/building-character/)) [S]. Rive says the move gave a 15x file-size reduction ([Rive](https://rive.app/blog/rive-as-a-lottie-alternative)) [vendor claim].
- *Mechanism:* goal completion plus the streak as a logged identity. The streak is a goal in itself, and loss aversion grows with its length. Duolingo's own framing: going from 2 to 3 days is +50%, 200 to 201 is +0.5%, so long streaks run on loss aversion ([Duolingo blog: how the streak builds habit](https://blog.duolingo.com/how-duolingo-streak-builds-habit)) [S].
- *Evidence:* the new streak animations raised new learners' D7 retention by +1.7% ([same post](https://blog.duolingo.com/how-duolingo-streak-builds-habit)) [S]. Learners on a 7-day streak are 2.4x likelier to come back the next day ([Improving the streak](https://blog.duolingo.com/improving-the-streak)) [S]. Intact logged streaks increase repeat behaviour versus broken ones across 7 studies ([Silverman & Barasch 2023, JCR](https://udspace.udel.edu/items/42ce576b-8e1f-429a-8541-e29e48dbcfbb)).
- *Transplant:* a budgeting app shows a "days under budget" counter that animates +1 on a dedicated screen after the evening check-in. A B2B dashboard can do "weeks with zero overdue invoices". The tick gets its own moment; don't hide it in a toast.

**D2. Milestone "power-up" (7, 30, 365…)**
- *Sees:* on milestone days Duo is "physically changed", treated "like power-ups in a video game". Duolingo moved away from flame-only metaphors because "keeping the flame alive" isn't universal across cultures ([Duolingo blog: streak milestone design](https://blog.duolingo.com/streak-milestone-design-animation)) [S]. There is a celebration screen at 7 days ([desirabilitylab](https://desirabilitylab.com/backfill/backfill-2023-154-duolingo-streak-design)) [O], and a 365 screen with mascot, flame and confetti [O] (same source).
- *Spec:* **unknown** (no durations published).
- *Mechanism:* variable intensity on a fixed schedule. Peaks are rarer and bigger than the daily tick, which keeps the daily tick from feeling stale (peak-end).
- *Evidence:* the +1.7% D7 result above covers the redesigned streak animations as a set [S].
- *Transplant:* a fitness-class booking app escalates the post-booking moment at the 10th, 25th and 50th class with a different hero illustration. Ordinary bookings keep a quiet check.

**D3. Commitment choice right after the first streak day**
- *Sees:* right after day 1 the learner picks a streak goal (e.g. 7/14/30 days). The CTA "Commit to my goal" beat "Continue" ([Lenny's podcast summary](https://www.recall.it/summary/lennys-podcast/behind-the-product-duolingo-streaks-or-jackson-shuttleworth-group-pm-retention-team)) [S via secondhand summary]. A secondhand write-up says the chosen value wasn't even used elsewhere, yet choosing built commitment ([Lazyweb](https://experiments.lazyweb.com/research/duolingo-streak-goals-retention)) [H].
- *Spec:* **unknown**.
- *Mechanism:* public or self commitment and consistency. An implementation intention is formed at peak motivation.
- *Evidence:* the retention team ran 600+ streak experiments in four years ([recall.it summary](https://videohighlight.com/v/_CCwoQZH5hI)) [S, secondhand].
- *Transplant:* after a user's first saved invoice, ask "How many invoices this week?" with 3 chips and a "Commit" button. Show that goal on the home screen.

**D4. Streak Freeze, Earn-back and slack**
- *Sees:* a freeze item can be equipped. A missed day consumes it and the streak survives.
- *Spec:* **unknown** (motion). Rules [S]: letting learners equip up to two freezes raised daily active learners by +0.38% ([Improving the streak](https://blog.duolingo.com/improving-the-streak)).
- *Mechanism:* slack prevents the "what-the-hell" abandonment after a break. Silverman & Barasch found the drop after a broken streak is weaker when the streak can be "repaired" ([JCR 2023](https://www.colorado.edu/business/faculty-research/2023/04/19/or-track-how-broken-streaks-affect-consumer-decisions)).
- *Evidence:* the +0.38% [S]. A 21% churn reduction circulates online with no primary source, so don't quote it ([see check](https://medium.com/@salamprem49/duolingo-streak-system-detailed-breakdown-design-flow-886f591c953f)).
- *Transplant:* any streak you add ships with a grace mechanic on day 1. A meal-planning app gives one "rest day" per week automatically and never sells it.

**D5. Separating the streak from the daily XP goal**
- *Change:* the streak used to require hitting the XP goal. Duolingo made one lesson enough [S].
- *Evidence:* D14 retention +3.3% (relative), daily active learners +1%, and +10.5% of daily learners on a streak within 20 days ([Improving the streak](https://blog.duolingo.com/improving-the-streak)) [S].
- *Mechanism:* make the minimum viable action tiny (Fogg's "ability" lever). The habit is "show up", not "perform".
- *Transplant:* a journaling app counts one sentence as "a day". The 500-word goal stays separate and optional.

**D6. Right/wrong feedback inside a lesson**
- *Sees/hears:* a bottom sheet reports correct or incorrect, and correct-answer runs trigger a combo popup ("N in a row", XP, multiplier, "Claim XP") ([Lazyweb flow capture](https://www.lazyweb.com/canvas/flows/duolingo/start-lesson)) [O]. The wrong-answer sound is described as a falling tone, "discouraging enough… but not so harsh that it induces anxiety" ([Out of Scope newsletter](https://out-of-scope-product.beehiiv.com/p/duolingo-has-it-venmo-has-it-even-slack-has-it-your-product-doesn-t)) [H]. Each in-lesson character "has a unique animation that plays when a learner answers correctly" ([Building character](https://blog.duolingo.com/building-character/)) [S].
- *Spec:* sheet slide timing, sound pitch and haptic type are **unknown**. Duolingo's motion principles include "every animation should have a rhythm" and that motion should "match its purpose" (same blog family) [S].
- *Mechanism:* immediate feedback, and a "combo" for a run of correct answers. The combo works as an in-session micro-streak with a rising stake.
- *Evidence:* gamification of learning has a small to medium positive effect (cognitive g = 0.49, motivational g = 0.36, behavioural g = 0.25) ([Sailer & Homner 2020](https://link.springer.com/article/10.1007/s10648-019-09498-w)).
- *Transplant:* a form-heavy onboarding (KYC, tax) gives each valid field a green tick plus a soft rising tone. After 5 fields in a row with no errors, it shows "5 clean in a row".

**D7. Lesson complete → reward chain**
- *Sees:* "Lesson complete!" with a large mascot and confetti ([Lazyweb](https://www.lazyweb.com/canvas/flows/duolingo/start-lesson)) [O]. It is followed by stat cards and then the streak, quest and league screens [O?].
- *Spec:* **unknown**.
- *Mechanism:* peak-end rule. The session ends on its highest point, and progress toward several goals at once (goal-gradient: [Kivetz, Urminsky & Zheng 2006](https://doi.org/10.1509/jmkr.43.1.39)) gives several reasons to come back.
- *Transplant:* after a support agent closes a ticket, show a 1-screen recap: "Resolved · 4 min · 3rd today, 2 to your daily goal". Never chain more than 3 screens before the user can leave.

**D8. Leagues (weekly leaderboard)**
- *Rules [S]:* tested from 2018, now 10 leagues ending in Diamond. Learners are grouped weekly with people of similar study habits and time zone ([Duolingo blog: Leagues](https://blog.duolingo.com/duolingo-leagues-leaderboards/)). A third-party breakdown says cohorts are ~30 people [H] ([DoF](https://duolingo.deconstructoroffun.com/mechanics/leagues)).
- *Evidence:* the iOS Leaderboards test raised both lessons started and lessons completed, and shipped to everyone ([Improving Duolingo one experiment at a time](https://blog.duolingo.com/improving-duolingo-one-experiment-at-a-time)) [S]. The "+17% learning time" figure is unsourced [H].
- *Mechanism:* local social comparison with a weekly reset (a fresh start each Monday: [Dai, Milkman & Riis 2014](https://doi.org/10.1287/mnsc.2014.1901)). Small cohorts make rank #1 feel reachable.
- *Transplant:* a sales CRM ranks reps in weekly pods of ~10 peers with similar quotas instead of a company-wide board.

**D9. Friend Streak**
- *Rules [S]:* a shared streak with up to 5 friends, where both must do a lesson daily ([Duolingo blog: Friend Streak](https://blog.duolingo.com/friend-streak/)).
- *Evidence:* learners with ≥1 Friend Streak are 22% more likely to complete their daily lesson ([Product lessons: Friend Streak](https://blog.duolingo.com/product-lessons-friend-streak/)) [S].
- *Mechanism:* mutual accountability. A missed day lets a friend down, which is stronger than letting yourself down.
- *Transplant:* a habit tracker for couples, or a language-exchange app, lets two people share a "both checked in" streak. Use positive nudges only ("Sam's done, your turn").
- *Ethics flag:* this is the exact mechanic in the 2026 Snapchat streak suits (see Ethics).

**D10. Personalised reminders and the widget**
- *Rules [S]:* reminders are chosen by a "sleeping, recovering" bandit that favours templates the user hasn't seen recently and only uses eligible ones (e.g. streak-at-risk). Result: +0.5% total DAU and +2% new-user retention ([Yancey & Settles, KDD 2020](https://research.duolingo.com/papers/yancey.kdd20.pdf)). The iOS widget launched July 2022 and shows whether today's streak is done. Installs "rose sharply" after an in-app animated explainer, and widget users retained better even after controlling for commitment ([Duolingo blog: widget](https://blog.duolingo.com/widget-feature)) [S]. After long inactivity the app sends "These reminders don't seem to be working. We'll stop sending them for now." ([Medium essay](https://debugger.medium.com/duolingo-needs-to-chill-8f1832745ca0)) [O].
- *Mechanism:* novelty (habituation to repeated copy), timing near the user's own habitual time, and an ambient cue on the home screen.
- *Transplant:* a pharmacy refill app rotates ~10 reminder templates, never repeats one within 7 days, and sends at the hour the user last opened. When the user doesn't respond, it backs off and says so.

### Transitions, scrolling, buttons
- Buttons: chunky, rounded, with a darker bottom edge that compresses on press so it reads as a physical key [O?]. Duolingo's art direction is "minimalism and playfulness" built on a defined shape language ([Duolingo blog: shape language](https://blog.duolingo.com/shape-language-duolingos-art-style/)) [S]. Press depth, duration and haptic: **unknown**.
- In-lesson: no scrolling. One exercise per screen, a top progress bar, and the feedback sheet slides from the bottom [O?]. The home "path" scrolls vertically with the next node highlighted [O?].
- Motion principles [S]: timing, humour and charm create delight. Every animation has a rhythm, and motion matches its purpose (Duolingo design blog, via [search extract](https://blog.duolingo.com/building-character/)).

### Onboarding to first "aha"
Choose a language → a few motivation and level questions → **first lesson before sign-up**. Account prompts arrive after lessons as dismissible nudges and become gates later ([Appcues GoodUX](https://goodux.appcues.com/blog/duolingo-user-onboarding)) [O]. "Aha" = finishing the first lesson and seeing your first XP and streak day. Steps and seconds: **unknown** (no timed capture found; a "within 10 seconds" claim on LinkedIn is unsourced [H]).

### Pull without a task
Streak at risk (widget + reminder), league position before the weekly cut-off, Friend Streak partners, daily quests and chests, and Year in Review (shared percentile ranking increased sharing: [Duolingo blog](https://blog.duolingo.com/year-in-review-behind-the-scenes)) [S]. Brand meme culture ("Duo is dead", Feb 2025: 142M views on X, #ripduo used 45k+ times ([Meltwater](https://www.meltwater.com/en/blog/duolingo-dead-mascot-campaign))) keeps the owl top of mind off-app.

### Ethical line
- *Criticism:* guilt-tinged owl notifications and streak anxiety ([The Independent via AOL](https://www.aol.com/m-duolingo-addict-language-app-063000890.html)). Dark-pattern critique: "excessive notifications and emotionally charged visuals" (Castro & Valença 2025, summarised at [deceptive.design](https://deceptive.design/articles/teaching-or-manipulating-on-the-adoption-of-bright-and-deceptive-patterns-by-duolingo)). The 2025 Energy system costs energy even on correct answers, gives bonus energy "at a randomized rate", and lets you buy energy with gems. Free users dislike it ([Android Authority](https://www.androidauthority.com/quitting-duolingo-energy-system-3599842/), [Fandom wiki](https://duolingo.fandom.com/wiki/Energy)). The "Duo is dead" post joked "we can automatically sign you up for Duolingo Max in his memory" ([Meltwater](https://www.meltwater.com/en/blog/duolingo-dead-mascot-campaign)).
- *Flags for the skill:* **guilt push** (sad-owl copy), **paid randomness adjacency** (random bonus energy in a resource you can buy), **pay-to-protect streak** (gems for freezes/repair). Duolingo's own counter-pattern is good: reminders stop when ignored, and freezes reduce loss.
- *Harm-free version:* free grace days, a "pause streak" for holidays, warm rather than sad copy, randomness never tied to purchasable currency, and a reminder budget that self-limits.

---

## 2. Headspace

**Core loop:** open Today → one tap on a short guided session sized to the time of day → a calm completion screen and stats/run streak → time-of-day nudges.

**Traction:** 168M sessions started in 2025 ([Headspace 2025 year in review](https://www.headspace.com/articles/headspace-2025-year-in-review)) [S]. The subscriber count isn't disclosed. ~2.8M subscribers per [Business of Apps](https://businessofapps.com/?p=60411) (undated estimate); mobile store revenue $47M (2024) and $39M (2025) per an AppMagic-based tracker (excludes B2B) ([udonis](https://www.blog.udonis.co/statistics/headspace)). 2023 Apple Design Award, Social Impact ([Spectrum Equity](https://spectrumequity.com/news/headspace-recieves-2023-apple-design-award)).

### Signature moments

**H1. Illustrated characters as the emotional register**
- *Sees:* soft, ambiguous blob characters; "every colour, shape and line was intentional"; the "Mind Man" visualises the inside of the mind ([Raw Studio recap of Headspace "Design for Change" talk](https://raw.studio/blog/how-headspace-designs-for-mindfulness/)) [S, secondhand]. Over 150 characters across 80 minutes of bespoke animation were made with Nexus Studios ([Nexus case study](https://nexusstudios.com/work/headspace-case-study/)) [S].
- *Spec:* **unknown**.
- *Mechanism:* lowering threat. Friendly, non-human, non-gendered figures make an intimidating practice feel approachable (Headspace says animation "has proven a successful way of both bringing people to meditation and encouraging those who do practice to stay the course": [Creative Review](https://www.creativereview.co.uk/meeting-minds-headspace-nexus-mindful-storytelling/)) [S].
- *Evidence:* qualitative only [S]. No published A/B result found.
- *Transplant:* a debt-collection or medical-results app explains bad news with one soft illustrated character instead of red alert banners.

**H2. Onboarding cut to the bone**
- *Change [S, secondhand]:* the old onboarding (with an instructional video) lost 38% between start and finish. The team made intro screens easy to exit and replaced the video with GIFs. Users who got past week 2 were 5x likelier to convert to paid, so week 2 became the success metric ([Raw Studio](https://raw.studio/blog/how-headspace-designs-for-mindfulness/)).
- *Mechanism:* time-to-value. Every pre-value screen is a leak.
- *Transplant:* a payroll SaaS sets "week-2 active" as the onboarding north-star and deletes any explainer that can't beat a 3-frame looping GIF.

**H3. Routine-anchored scheduling**
- *Sees:* asked *when* to meditate, users get options tied to existing routines ("after I wake up") rather than clock times ([Appcues GoodUX](https://goodux.appcues.com/blog/headspaces-mindful-onboarding-sequence)) [O].
- *Mechanism:* habit stacking and implementation intentions ("if X then Y"; meta-analysis d≈0.65, Gollwitzer & Sheeran 2006, *Advances in Experimental Social Psychology* 38).
- *Transplant:* a medication or language app asks "When will you do this?" with chips "with morning coffee / on the commute / before bed", then schedules the reminder for that slot.

**H4. Today tab: one tap, sized to the moment**
- *Sees:* the team removed separate meditate/focus/move/sleep tabs and focused on Today. It gives "one-tap access to activities of varying lengths for morning, afternoon, and night" ([Apple "Behind the Design" via search](https://cur.at/UjZvbxT?m=web)) [S]. Sessions as short as one minute exist ([TechCrunch 2017](https://techcrunch.com/2017/06/15/new-headspace)) [S].
- *Mechanism:* choice-overload reduction plus a context cue (time of day picks the content).
- *Transplant:* a recipe app's home is "Tonight: 3 picks under 30 min", rotating by time of day, instead of a catalogue.

**H5. Breathing animation**
- *Sees:* an expanding and contracting shape paces the breath [O?].
- *Spec:* a third-party reconstruction describes a circle that expands while shifting cool blue to warm orange, ease-in-out, a 2 s hold, an exhale longer than the inhale, and a 12 s cycle ([blakecrosley.com guide](https://blakecrosley.com/guides/design/headspace)) [H, not official].
- *Mechanism:* entrainment. Slow, visible rhythm leads the body.
- *Transplant:* a checkout "processing payment" wait uses one slow, ease-in-out pulse instead of a spinner, so the wait feels calmer.

**H6. Stats and Run Streak, user-toggleable**
- *Sees:* profile Stats sit at the top, followed by Run Streak, "which can be toggled on and off" ([Headspace help](https://help.headspace.com/hc/en-us/articles/6096184071323-Updated-Profile)) [S]. Reviewers say the streak counter motivates more than content ([desirabilitylab](https://desirabilitylab.com/backfill/backfill-2024-363-headspace-meditation-app)) [O]. Critics say a reset to zero after a gap feels punitive, while total minutes are kept ([Prototypr](https://blog.prototypr.io/headspace-design-the-missing-ingredient-279ad88609fc)) [H].
- *Mechanism:* a progress log, with an opt-out that respects users for whom streaks raise anxiety.
- *Transplant:* any wellness or mental-health product shows cumulative totals by default and makes the consecutive streak opt-in.

**H7. Trust-first paywall timeline**
- *Sees:* the paywall shows a visual timeline: when the trial ends, when a reminder is sent, and when the first charge happens ([screensdesign capture](https://screensdesign.com/apps/headspace-meditation-sleep/)) [O]. It appears around 0:54–1:04 of the capture [O].
- *Mechanism:* reducing purchase anxiety, and honesty as conversion.
- *Transplant:* any free trial shows a 3-dot timeline "Today / Day 5 reminder / Day 7 charge" and sends that reminder.

### Transitions, scrolling, buttons
Soft, rounded, low-contrast; illustration-led transitions [O?]. Durations, easing and haptics: **unknown** (no first-party motion spec found in this session).

### Onboarding to first "aha"
Experience question → suggested session length → "what brought you here" → routine-anchored time ([Appcues](https://goodux.appcues.com/blog/headspaces-mindful-onboarding-sequence)) [O]. One capture lists 17 steps including an AI-companion intro and a therapy upsell ([Lazyweb](https://lazyweb.com/canvas/flows/headspace/onboarding)) [O]. "Aha" = completing the first short guided session. Seconds: **unknown**. The paywall arrives ~1 min into a capture [O].

### Pull without a task
Time-of-day Today feed, sleep content at night, run streak, and routine-anchored reminders.

### Ethical line
Users complain about annual renewals charged without warning, and Headspace's terms require arbitration with a class-action waiver ([conductatlas](https://conductatlas.com/platform/headspace/headspace-terms-and-conditions/auto-renewal-subscription), [unstar review analysis](https://unstar.app/blog/calm-headspace-insight-timer-balance-ten-percent-happier-meditation-apps-ranked-2026)) [H]. Streak guilt is a risk in a mental-health context. *Harm-free:* the paywall timeline (H7) plus a real reminder email, a toggleable streak, and in-app cancellation within 2 taps.

---

## 3. Calm

**Core loop:** open → immediate ambient nature scene and sound → Daily Calm, a Sleep Story or Breathe → mindful-days tally → bedtime return.

**Traction:** "over 150 million downloads and 2.5M 5-star reviews" ([Calm](https://calm.com/blog/about)) [S]. 2024 revenue estimates conflict ($596M vs $390M; no official disclosure) ([screensdesign](https://screensdesign.com/showcase/calm), [lazyweb](https://app.lazyweb.com/company/calm)) [H]. McConaughey's Sleep Story "Wonder" passed 11M plays by 2020–21 ([Hollywood Reporter](https://www.hollywoodreporter.com/rambling-reporter/matthew-mcconaugheys-calm-app-story-gets-more-streams-in-pandemic-times)) [S].

### Signature moments

**C1. "Take a deep breath" first screen**
- *Sees:* a plain "take a deep breath" instruction over a calm gradient before anything else ([screensdesign](https://screensdesign.com/apps/calm/)) [O]. It then moves to goal questions, a personalised home and one tooltip ([business-model teardown](https://zhowcdn01-endpoint01-domain01.localdev.cdn.azure.cn/blog/calm-app-business-model-lessons-for-builders)) [O].
- *Spec:* **unknown**.
- *Mechanism:* the product's core value is delivered in the first second (a state change before any ask). It sets the emotional register.
- *Transplant:* a tax-filing app opens its first session with "Let's do this in 10 minutes. You can save at any step" plus a slow fade-in, before the first field.

**C2. Ambient scene as the home screen**
- *Sees/hears:* the home is a full-bleed nature scene with looping sound, and users pick from 30+ scenes (2017 count) ([eSchool News](https://www.eschoolnews.com/2017/07/24/app-week-enhancing-classroom-calm/)) [O]. Soundscapes loop for hours "without any discernible repeat point" ([review](https://theforestscout.com/33971/in-our-opinion/a-review-of-calm-app-grounding-and-reflective)) [O].
- *Spec:* **unknown**.
- *Mechanism:* sensory priming. Opening the app is itself the reward, even with no task (pull without a goal).
- *Transplant:* a focus or notes app offers an optional ambient background (rain, café) that starts on open and is remembered per user.

**C3. Breathe Bubble**
- *Spec [S]:* pace is chosen as 4, 6 or 8 breaths per minute. The timer runs from 1 min to "Endless". Guidance and scene volumes are separate. Haptics can be toggled (iOS in Settings, Android "Vibrations" in-session) ([Calm support](https://support.calm.com/hc/en-us/articles/360000069973-Breathing-Exercises)). The inhale/exhale split is **unknown**.
- *Mechanism:* paced breathing with a haptic channel, so it works eyes-closed.
- *Transplant:* a wearable or wallet "panic button" offers a 1-minute haptic-paced breathe at 6 bpm, eyes-free.

**C4. Sleep Stories (celebrity voice, plotless)**
- *Hears:* slow narration by known voices (McConaughey, Stephen Fry, Harry Styles) with deliberately plotless content ([AOL/AP](https://www.aol.com/welcome-adult-bedtime-story-era-205700092.html)) [S].
- *Mechanism:* ritual plus parasocial comfort. A nightly trigger (bedtime) exists without any notification.
- *Evidence:* Sleep Stories were the most-used component among subscribers, and higher use was associated with better perceived sleep (Huberty et al. 2020 survey, associational) [via search extract]. An 8-week Calm RCT (n=1,029, waitlist control) improved insomnia and mood (Huberty et al. 2021, *General Hospital Psychiatry*). No RCT isolates Sleep Stories ([summary](https://mattressmiracle.ca/blogs/mattress-miracle-blog/best-meditation-app)) [H].
- *Transplant:* a kids' reading app ships a "wind-down" mode: dim UI, no animations, auto-advance and sleep timer.

**C5. Daily Calm + mindful days**
- *Sees:* a fresh daily session and a mindful-days or streak tally [O?].
- *Evidence:* an 8-week Calm RCT in stressed students (n=109 randomised, 88 analysed) lowered stress and raised mindfulness and self-compassion versus waitlist, held at 12 weeks ([Huberty et al. 2019, JMIR mHealth](https://mhealth.jmir.org/2019/6/e14273/)). In a 269-student course study, daily and intermittent use both showed gains ([Clarke & Draper 2020](https://pmc.ncbi.nlm.nih.gov/articles/PMC6928287)).
- *Ethics:* a Calm community manager reported users "obsessed" with streaks, some turning them off because breaking a long one "really harm[s] their mental health" ([Substack](https://caitlinmccoll.substack.com/p/streaks-yay-or-nay)) [H].
- *Transplant:* a daily-content product (news briefing, devotional) uses "new today" freshness as the pull. It shows *total days* rather than consecutive days.

**C6. Mood check-in → "For Your Mood"**
- *Sees:* "How are you feeling?" feeds recommendations ([business-model teardown](https://zhowcdn01-endpoint01-domain01.localdev.cdn.azure.cn/blog/calm-app-business-model-lessons-for-builders)) [O].
- *Mechanism:* self-disclosure → personalisation → perceived relevance.
- *Transplant:* a fitness app asks "Energy today?" (3 faces) and swaps the planned workout for a lighter one.

### Transitions, scrolling, buttons
Slow fades over full-bleed imagery and soft sound beds [O?]. Durations, easing and haptics outside Breathe: **unknown**.

### Onboarding to first "aha"
Breath prompt → goals and experience questions → personalised home → guided tooltip ([teardown](https://zhowcdn01-endpoint01-domain01.localdev.cdn.azure.cn/blog/calm-app-business-model-lessons-for-builders)) [O]. The same source claims the reminder prompt worked better *after* a first completed session [H]. Seconds: **unknown**.

### Pull without a task
Bedtime ritual (Sleep Stories), ambient scene on open, Daily Calm novelty.

### Ethical line
Users report annual renewals with no warning email, and cancellation buried in menus. The terms carry arbitration and a class-action waiver ([conductatlas](https://conductatlas.com/platform/calm/calm-terms-of-service/auto-renewal-subscription), [terms.law](https://terms.law/ToS-Watchdog/mental-health-apps/calm/)) [H]. No settlement was found. Streak guilt in a mental-health app (C5). *Harm-free:* a renewal reminder 3–7 days before charge (Headspace H7 pattern), cumulative tallies, and no streak-loss pushes.

---

## 4. Strava

**Core loop:** record (or auto-sync) a workout → a map, splits and achievements appear → friends give kudos and comments → you see friends' activities and segments → you go again.

**Traction:** 180M+ users in 185+ countries, and 14B kudos given in the 2025 report period (Sep 2024–Aug 2025), +20% YoY ([BikeRadar](https://www.bikeradar.com/news/strava-year-in-sport-2025)) [S]. ~50M MAU in 2025 (Sensor Tower estimate) ([forge](https://forgeglobal.com/insights/strava-upcoming-ipo-news/)) [H]. Confidential S-1 filed Feb 2026; no public filing found ([the5krunner](https://the5krunner.com/2026/01/09/strava-ipo-filing-3-billion-valuation-analysis/)).

### Signature moments

**S1. Kudos**
- *Sees/feels:* a one-tap thumbs-up on a friend's activity, "lower friction than comments" ([blakecrosley guide](https://blakecrosley.com/guides/design/strava)) [H]. Any haptic or animation spec: **unknown** (the guide's "haptic pulse" is an illustrative mockup, not shipped behaviour).
- *Mechanism:* social recognition of *effort*, not outcome. It's cheap to give, and receiving it feels like a reward.
- *Evidence:* exercise is socially contagious. Friends' extra km cause about +0.3 km more running (1.1M runners, weather instrument; [Aral & Nicolaides 2017, Nature Comms](https://ideas.repec.org/a/nat/natcom/v8y2017i1d10.1038_ncomms14753.html)). Runners in 5 Dutch clubs who received more kudos ran more (Radboud study, reported by [Canadian Running](https://runningmagazine.ca/?p=91520); correlational, paper not verified). Kudos both motivate and create performance pressure ([Hallgren et al. 2026](https://idrottsforum.org/hallgrenetal260512/)).
- *Transplant:* a code-review tool adds a one-tap "nice work" on merged PRs that notifies the author. It's distinct from approval and never counted on a leaderboard.

**S2. Post-activity achievements (PR medals, trophies, crowns)**
- *Rules [S]:* a crown for KOM/QOM/CR (fastest ever), trophies for top 10 overall, and medals for personal top 3. Runners also get best-effort medals at 400 m, ½ mi, 1 k, 1 mi, 5 k, 10 k, half and full marathon. Personal segment medals only start on the 2nd attempt ([Strava support](https://support.strava.com/hc/en-us/articles/216917137-Achievement-Awards-Glossary)).
- *Spec:* the celebration UI (animation, sound) is **unknown** (not found).
- *Mechanism:* competence feedback on personal bests. Self-comparison is safer than ranking against others. Unearned medals on a first attempt are suppressed, so medals mean improvement.
- *Transplant:* a writing app awards "fastest 1,000 words" and "longest focus session" personal bests, only once there is a prior attempt to beat.

**S3. Local Legend (consistency beats speed)**
- *Rules [S]:* the athlete with the most efforts on a segment in a rolling 90 days earns a laurel. It launched mid-2020 "measuring consistency and commitment… rather than speed" ([Android Central](https://www.androidcentral.com/strava-announces-local-legends-new-way-compete-segments)).
- *Mechanism:* opens status to non-elite users, and a rolling window gives a fresh start and a reason to repeat.
- *Transplant:* a neighbourhood food app crowns a "regular" at a restaurant (most orders in 90 days) with a small badge on their profile, not money.

**S4. Weekly streak**
- *Rules [S]:* at least one activity of 60 s or more per Monday–Sunday week. All activity types and privacy levels count. A late upload can restore a missed week. Banners show at weeks 2–5 and milestones 10, 15, 25, 1 y, 2 y, 3 y, with "no feature available to disable these notifications" ([Strava support](https://support.strava.com/hc/en-us/articles/36553427481997-Streaks-on-Strava)).
- *Mechanism:* a weekly cadence is far more forgiving than daily, and backfill acts as built-in repair (Silverman & Barasch: repair weakens the broken-streak drop).
- *Transplant:* for any low-frequency behaviour (budget review, plant care, newsletters) the streak unit is the week, not the day.

**S5. Year in Sport**
- *Sees:* an in-app scene-by-scene recap with per-scene sharing to Instagram and TikTok ([Strava support](https://support.strava.com/en-us/articles/15401959-your-year-in-sport)) [S]. It went subscription-only in Dec 2025 ([Ars Technica via tagteam](https://tagteam.harvard.edu/hub_feeds/3415/feed_items/17132945/about)).
- *Mechanism:* identity ("I'm a runner"), social display, and annual anticipation.
- *Transplant:* any product with a year of user data ships a December recap with one shareable card per insight. Keep it free, because it is acquisition.

**S6. Flyby (replay who you crossed paths with)**
- *Sees:* an animated replay of your activity with others you passed ([marathons.com](https://www.marathons.com/en/tips/strava-s-almost-secret-features-even-your-triathlete-friends-don-t-know-about_zxeg)) [O].
- *Mechanism:* serendipitous social discovery.
- *Ethics:* a reader was greeted by name by a stranger who found her via Flyby ([Total Women's Cycling](https://totalwomenscycling.com/news/reader-story-followed-home-with-strava-flybys)). Privacy defaults are disputed [H].
- *Transplant:* only with explicit opt-in. A conference app shows "people you met in sessions" only for mutual opt-ins.

### Transitions, scrolling, buttons
A large orange Record button and a map-first activity card in the feed [O?]. Kudos is a single-tap state toggle [H]. Motion and haptics: **unknown**.

### Onboarding to first "aha"
Choose sport → location permission explained in context → privacy education (hide start/end points) → find friends (step 17 of 22 in one capture) ([screensdesign](https://screensdesign.com/articles/strava-onboarding-design/), [Lazyweb](https://lazyweb.com/canvas/flows/strava/onboarding)) [O]. Likely "aha" (inference, unsourced): first saved activity on a map, then the first kudos received. Seconds: **unknown**.

### Pull without a task
The friends feed (kudos to give), kudos notifications, segment crowns lost to others, Local Legend windows, weekly streak and Year in Sport.

### Ethical line
- 2018 global heatmap exposed military bases. Strava then limited street-level detail to logged-in users and monthly refreshes ([Engadget](https://www.engadget.com/2018/03/13/after-exposing-secret-military-bases-strava-restricts-data-visi/)).
- Kim Flint died in 2010 chasing a lost KOM. The family's negligence suit was dismissed on assumption of risk ([road.cc](https://cdn.road.cc/content/news/84948-judge-dismisses-lawsuit-against-strava-relating-death-rider-trying-recapture-kom)). This is the "lost crown" notification as a risk vector.
- Taking free features away: segment leaderboards were paywalled in 2020 ([BikeRadar](https://www.bikeradar.com/news/strava-leaderboards-routes-subscription/)) and Year in Sport in 2025. The Garmin patent suit (filed then dropped in 21 days, Oct 2025) ([BikeRadar](https://www.bikeradar.com/news/strava-drops-lawsuit-against-garmin-21-days-after-filing-it)).
- Streak banners can't be turned off [S].
- *Harm-free:* "You lost a crown" never pushes to someone on a downhill or road segment. Opt-in location-sharing features. Every celebratory banner can be muted. Don't paywall something users already rely on.

---

## Cross-app patterns

1. **Tiny minimum action, separate stretch goal.** Duolingo's "one lesson keeps the streak" (+3.3% D14 [S]), Strava's 60-second activity per week, Headspace's 1-minute sessions. The habit unit is "show up".
2. **Streak with built-in slack.** Freezes (Duolingo), backfill (Strava), toggle-off (Headspace). Research: repair weakens the motivational crash after a break ([Silverman & Barasch 2023](https://udspace.udel.edu/items/42ce576b-8e1f-429a-8541-e29e48dbcfbb)).
3. **Cadence matches the behaviour.** Daily for 5-minute learning, weekly for workouts, nightly ritual for sleep.
4. **The payoff gets its own screen**, with rare bigger peaks (milestones, PRs, Local Legend) layered on the daily tick.
5. **Effort-based social recognition beats outcome ranking** for most users: kudos, Friend Streak (+22% [S]), Local Legend. Leaderboards work when cohorts are small and reset weekly.
6. **First value before any ask.** Lesson before sign-up (Duolingo), breath before anything (Calm), short session before the paywall (Headspace).
7. **Notifications are personalised, rotate and back off** (Duolingo bandit +0.5% DAU [S]; "we'll stop sending them").
8. **An ambient presence outside the app:** widgets (Duolingo), bedtime ritual (Calm), annual recap (Strava, Duolingo).
9. **Character or atmosphere carries the emotion**, not chrome: Duo, Headspace's blobs, Calm's scenes.
10. **Wellness apps soften what learning apps sharpen.** Same mechanics, but cumulative totals, opt-in streaks and no loss copy.

---

## Transplant playbook

1. **For a daily habit unit**, make the minimum qualifying action one tiny step, like Duolingo's "one lesson keeps the streak", because a lower ability barrier converts intent into action. Spec: the qualifying action must take ≤1 screen. Keep the stretch goal separate. Web: count the day server-side on the first qualifying event; show the streak chip immediately with `aria-live="polite"`. Native: increment in the same transaction as the action; update the widget (`WidgetCenter.shared.reloadAllTimelines()` / Glance `updateAll`). Never: tie the streak to a quota the user can fail on a bad day.

2. **For a streak tick**, give it a dedicated full-screen moment after the task, like Duolingo's streak-extended screen, because a logged intact streak becomes a goal in itself (JCR 2023). Spec: sequence count → +1 increment → icon change. App durations are unknown, so start from Apple's documented non-bouncy spring `duration 0.5` and tune ([WWDC23 Animate with springs](https://developer.apple.com/videos/play/wwdc2023/10158/)), with a success haptic on the increment. Web: CSS `@keyframes` scale 1→1.15→1 on the number plus a `transform` counter roll; `prefers-reduced-motion` → instant swap. Native: SwiftUI `.contentTransition(.numericText())` + `.sensoryFeedback(.success, trigger: streak)`; Compose `AnimatedContent` + `view.performHapticFeedback(HapticFeedbackConstants.CONFIRM)`. Never: put the tick in a dismiss-on-tap toast, or play it when nothing was earned.

3. **For streak protection**, ship grace on day 1, like Duolingo's freezes or Strava's backfill, because repairable streaks avoid the "what-the-hell" drop-off. Spec: ≥1 free grace unit per week, auto-applied, with a "Your streak was protected" message. Web/Native: server-side rule; show a shield icon on the protected day. Never: sell streak protection for real money, or let a grace unit be the only way back.

4. **For milestone peaks**, escalate on a fixed ladder (7, 30, 100, 365) with a visually *transformed* mascot or hero, like Duolingo's "power-up" milestones, because rare, bigger peaks keep the daily tick from habituating. Spec: daily = small; milestone = full-screen + share card; durations **unknown** for Duolingo. Use `.spring(duration: 0.6, bounce: 0.2)` (Apple's example) as a starting value. Web: a Rive or Lottie file with state inputs; `canvas-confetti` ≤1 s. Native: Rive runtime state machine, or `PhaseAnimator`; Compose `rememberInfiniteTransition` off, one-shot `Animatable`. Never: celebrate spending, trading or deposits (Robinhood's confetti contributed to a $7.5M Massachusetts settlement in 2024: [V&E](https://velaw.com/insights/game-over-robinhood-pays-7-5-million-to-resolve-gamification-securities-violations)).

5. **For commitment**, ask the user to pick a short goal right after their first success, like Duolingo's streak-goal screen with "Commit to my goal", because commitment at peak motivation raises follow-through. Spec: 3 chips (e.g. 7/14/30), one primary CTA worded as a commitment. Web: a radio group styled as chips. Native: SwiftUI `Picker(.segmented)`; Compose `SegmentedButton`. Never: pre-select the hardest goal or shame a later miss against it.

6. **For in-task feedback**, answer every action instantly with a rising sound, colour and haptic for success and a gentle falling tone for errors, like Duolingo's answer sheet, because immediate feedback is the strongest learning lever (Sailer & Homner). Spec: feedback must start on the same frame as validation; sound optional and mutable; light impact haptic on success, none or soft on error. Web: Web Audio short tones; the `navigator.vibrate(10)` progressive enhancement is Android-only. Native: `UIImpactFeedbackGenerator(style: .light)` / `.sensoryFeedback(.impact(weight: .light))`; Compose `HapticFeedbackType.TextHandleMove` or View `CLOCK_TICK`. Never: harsh buzzers, red full-screen flashes, or haptics on every keystroke.

7. **For runs of correct actions**, show an in-session combo ("5 in a row") like Duolingo, because a micro-streak raises the stakes inside a session. Spec: appears at thresholds only (e.g. 5, 10), auto-dismisses, no blocking modal. Web: a badge on the progress bar with a CSS scale-in. Native: overlay with `.transition(.scale.combined(with: .opacity))`. Never: make the combo reset feel like punishment.

8. **For session end**, end on the peak with ≤3 recap facts and progress toward the *next* goal, like Duolingo's lesson-complete chain or Strava's achievements, because peak-end and goal-gradient drive return. Spec: max 3 screens, each skippable; numbers count up. Web: `requestAnimationFrame` count-up with `Intl.NumberFormat`. Native: `.contentTransition(.numericText())`; Compose `animateIntAsState`. Never: chain upsells between reward screens.

9. **For social pull**, make effort recognition one tap, like Strava's kudos, because exercise and effort are socially contagious (Aral & Nicolaides 2017). Spec: optimistic UI, filled state instantly, light haptic, recipient notified in batches. Web: `button[aria-pressed]` toggle with CSS transform. Native: `.sensoryFeedback(.impact(weight: .light), trigger: liked)`; Compose `IconToggleButton`. Never: show public "zero kudos" counts or rank users by kudos received.

10. **For competition**, use small, similar, weekly cohorts with a reset, like Duolingo Leagues, because reachable ranks and fresh starts motivate (Dai, Milkman & Riis 2014). Spec: cohort ≈ 10–30 with similar activity level; promotion and demotion zones clearly marked; resets Monday local time. Web/Native: server-side bucketing; a list with a sticky "you" row. Never: global leaderboards for novices, or loss notifications for safety-sensitive activities (the Strava KOM case).

11. **For consistency status**, reward frequency over performance, like Strava's Local Legend, because it opens status to non-elite users and a rolling window invites repetition. Spec: a rolling 90-day count, a visible "N more to take it" line. Never: tie the status to purchase volume.

12. **For reminders**, rotate templates, send near the user's habitual time, and back off when ignored, like Duolingo's bandit and its "we'll stop sending them", because novelty fights habituation (+0.5% DAU, +2% new-user retention [S]). Spec: ≥8 templates, no repeat within 7 days, at most 1/day, stop after N ignored and say so. Web: Push API with server-side scheduling. Native: `UNCalendarNotificationTrigger` / `WorkManager`. Never: sad-mascot guilt copy, "last chance!" fake urgency, or notifications that can't be muted (Strava's streak banners).

13. **For first-run**, deliver the core value before any account or paywall, like Duolingo's first lesson or Calm's breath, because time-to-value predicts activation (Headspace lost 38% in a long onboarding [S, secondhand]). Spec: value in the first screen or two; sign-up only after the first success. Web: an anonymous session upgraded to an account. Native: Sign in with Apple / Credential Manager after the first success. Never: a mandatory explainer video or a 17-step quiz before value.

14. **For scheduling a habit**, anchor it to an existing routine, like Headspace ("after I wake up"), because implementation intentions have a medium-to-large effect on goal attainment (d≈0.65, Gollwitzer & Sheeran 2006). Spec: 3–4 routine chips map to default times the user can edit. Web: chips → `<input type="time">` prefilled. Native: chips → `DatePicker(.hourAndMinute)`. Never: default to a time the user didn't choose.

15. **For calm or waiting states**, pace the wait with one slow breathing shape instead of a spinner, like Calm's Breathe Bubble (4/6/8 breaths/min [S]), because rhythm lowers arousal. Spec: 6 bpm = a 10 s cycle, ease-in-out, optional haptic per phase. Web: `@keyframes breathe {0%,100%{transform:scale(.9)}50%{transform:scale(1.1)}}` at `10s ease-in-out infinite`. Native: `withAnimation(.easeInOut(duration: 5).repeatForever(autoreverses: true))`; Compose `infiniteRepeatable(tween(5000, easing = FastOutSlowInEasing), RepeatMode.Reverse)`. Never: use it to mask a wait that should be fixed.

16. **For ambient pull**, put a live status on the home screen, like Duolingo's streak widget (installs and retention up [S]), because an ambient cue triggers the habit without a push. Spec: the widget shows done/not-done today, with one tap to the task. Native: WidgetKit / Glance; Live Activity for in-progress sessions. Web: PWA badge `navigator.setAppBadge()`. Never: show a guilt image on the widget.

17. **For the annual recap**, give one shareable card per insight including a comparative percentile, like Duolingo Year in Review (percentile increased sharing [S]) and Strava Year in Sport, because identity and social display spread the product. Spec: 6–10 vertical cards, each 9:16 exportable. Web: a `<canvas>` render to PNG + Web Share API. Native: `ImageRenderer` + `ShareLink`; Compose `GraphicsLayer.toImageBitmap()`. Never: paywall a recap users already had for free.

18. **For streaks in sensitive domains** (mental health, money, kids), show cumulative totals by default and make the consecutive streak opt-in, like Headspace's toggleable Run Streak, because streak loss can harm vulnerable users (Calm community manager report) and streak pressure is now litigated (2026 Snapchat suits: [Cybernews](https://cybernews.com/news/snapchat-streaks-addiction/), [DutchNews](https://www.dutchnews.nl/2026/09/snapchat-sued-over-addictive-design-in-mass-claim/)). Never: Friend Streaks for minors, streak loss pushes, or randomised rewards in a currency users can buy.

19. **For trials**, show a 3-point timeline (today / reminder / charge) and actually send the reminder, like Headspace's paywall, because honesty lowers purchase anxiety and avoids auto-renewal complaints. Never: annual auto-renew without a pre-charge email, or cancellation hidden more than 2 levels deep.
