# first-timer — findings
Persona "Jordan": first visit, phone, mildly distracted, leaves when it stops paying off.

Coverage: 25/25 screens of journey 1 that a first-timer reaches. That is landing, /register, 11 /welcome screens, lesson 1 (16 challenges of the select, assist and match types; no listening, word-bank or typing challenge came up in lesson 1), the 8-screen post-lesson chain, the profile prompt and /learn. Journey 3: /learn, the path-node popover, /leaderboard, /quests, /shop, a return visit in a new tab of the same context, and quitting the first lesson. 5 full guest runs: A (dark theme, 2 deliberate mistakes), L (light, no mistakes), B (different quiz answers), C (quit at the first challenge) and a lesson-complete timing run. Babbel landing: view only.
Not reached: lessons 2–3 (journey 2 is not in my scope); the hearts-intro modal (it did not appear after my 2 mistakes in run A, although the orchestrator's run shows it, so it is probably a variant); out-of-hearts; the placement test past its first question; the real browser notification prompt (headless shows none; `requestPermission` was logged); a real next-day return (multi-day is out of scope); desktop.
Viewports/devices: 390×844 @2x, touch, puppeteer headless Chrome (`launch()` from the brief). Theme: headless inherits macOS dark mode. Files named `*-light-*`, `L-*`, `C-01…C-17`, `complete-light-*` and `primer-light-*` were forced to `prefers-color-scheme: light`. `A-*`, `B-*` and `C-18…C-29` are dark. The landing page and /register render light either way. Timings are at bot pace, with the script's fixed 1.8–2.5 s waits per screen, so they are floors, not human times.
Evidence: `evidence/first-timer/` (scripts `landing.mjs`, `landing2.mjs`, `journey.mjs`, `complete.mjs`, `primer.mjs`; logs `journeyA.log`, `journeyL.log`, `journeyB.log`, `journeyC.log`).

## F-FIRST-TIMER-01 [P2] The best moment of day 0 is buried under seven more screens of meters, a forced streak pledge and a sign-up ask
- User experiences: "Lesson Complete!" lands well. Then the newcomer has to tap through a Score unlock, a Score explainer, a streak flame, a streak-goal pledge, "All Daily Quests complete!", "You earned 5 gems!" and "Time to create a profile!" before reaching the path. The streak-goal screen has no skip: "I CAN DO IT!" is the only control and it stays disabled until you pick 7, 14, 30 or 50 days. Nowhere in the chain does it say what you learned. Six Spanish words (gato, perro, agua, leche, mamá, papá) never appear. The screen shows "TOTAL XP 15 / AMAZING 100%" instead.
- Where: J1 → end of /lesson → 8 screens → /learn.
- Evidence: `L-44`…`L-51`, `L-63-end.png` (light); `A-50`…`A-58` (dark). `journeyL.log` buttons on the streak-goal screen: `I CAN DO IT! [player-next]` only. `A-54` shows it disabled before a pick and `A-55` after a pick, with the bubble "You'll be 2x more likely to complete the course!". Lesson-complete stats in `complete-light-+0ms.png` … `+5000ms.png`: two stat cards, no word list.
- Why it matters: peak-end (emotional.md). One designed peak, then a clean end with one next step. Here the peak is followed by 7 more "peaks", so none of them stands out. The last thing before the path is an account ask. The forced pledge is a commitment demanded on minute 3 of a relationship, with no "Not now".
- Fix: shorten it to two screens. (1) Lesson complete: XP, accuracy and **"6 new words"** chips you can tap to hear, with the streak flame "1" inline and "Daily goal reached" as a line on the same card. (2) Path. Move the streak-goal pledge to day 3 with a visible "Not now". Move the Score intro to the end of unit 1. Keep the profile ask, after the path has loaded, as a bottom sheet with LATER.
- Effort: M
- Confidence: high on the sequence (4 runs, same order; only the streak copy varies). Medium on cost: a funnel A/B on chain length would settle it.

## F-FIRST-TIMER-02 [P2] The streak screen warns "your streak will reset if you don't practice tomorrow" while the guest already holds 2 equipped Streak Freezes
- User experiences: after one lesson the flame screen says "But your streak will reset if you don't practice tomorrow. Watch out!" (other runs: "skipping a day resets it!", "Practice each day so your streak won't reset!"). That is untrue for this user. /shop shows "Streak Freeze … 2 / 2 EQUIPPED". The user is never told this during the flow.
- Where: J1 → post-lesson → streak screen; J3 → /shop.
- Evidence: `L-46-lesson-interstitial.png`. `journeyL.log` at 177 s: /shop text "Streak Freeze allows your streak to remain in place for one full day of inactivity. 2 / 2 EQUIPPED". In the first (dark) run, before any lesson, /shop read "0 / 2", so the freezes are granted with lesson 1. Three copy variants appeared across runs A, L and the first run.
- Why it matters: day 0 is when the relationship is set. Loss framing that the product's own state contradicts is fear used as the motivator (emotional.md, ethics gate: obligation mechanics, judgment item → P2). When the user later finds the freezes, the warning reads as manipulation.
- Fix: make it true and positive: "Day 1! Come back tomorrow to make it 2. Busy day? You've got 2 Streak Freezes 🧊🧊". Show the freezes on this screen.
- Effort: S
- Confidence: medium. A guest's freeze might not protect the streak. A two-day guest run with a missed day would settle it, but that is out of scope.

## F-FIRST-TIMER-03 [P2] Quit the first lesson and Duolingo asks "How much Spanish do you know?" again, 20 seconds after you answered it
- User experiences: I answered "I'm new to Spanish" in onboarding, opened lesson 1, got cold feet and tapped X. With no confirmation, I landed on /learn under a modal that asks the same proficiency question again (5 options, CONTINUE disabled). Opening duolingo.com later in a new tab shows the same modal over the path. As a newcomer: "Did it lose everything I told it?"
- Where: J1 → /lesson first challenge → `quit-button` → /learn (and J3 return).
- Evidence: `C-15-lesson-first.png` → `C-16-quit-dialog.png` → `C-return-visit.png` (light; `journeyC.log`). Same result on the "Find my level" path: quitting the placement test gives `C-29-quit-dialog.png` (dark). The first dark run, which closed during lesson 1, also showed it on return (that run's log is overwritten; C reproduces it). 3/3 runs.
- Why it matters: recognition over recall and "nothing the user must re-enter" (usability.md, cognitive load). This also hits the most fragile user: someone who quit once. Their return visit opens on a quiz instead of "Lesson 1 · START".
- Fix: reuse the stored `proficiency`. After a quit with zero completed lessons, land on the path with the node popover open: "Order at a café · Lesson 1 of 3 · START". If re-placing is intended after a placement-test quit, say so: "Want to try placement again, or start from scratch?"
- Effort: S
- Confidence: high (reproduced 3 times, both paths).

## F-FIRST-TIMER-04 [P2] Eleven screens before the first Spanish word; four of them are slides and two of the answers change nothing you can see
- User experiences: after picking Spanish: "Hi there! I'm Duo!" → "Let's get this party started!" → how did you hear (9 options; the list scrolls, "Other" is below the fold) → why learning → level → "Here's what you can achieve!" → daily goal → notifications → start point → "It can be hard to stay motivated…" → "…so Duolingo is designed to be fun like a game!" → lesson. That is 11 CONTINUE taps, 5 choices and 1 permission request. The first and last two screens are speech bubbles with only a CONTINUE button. "Prepare for travel / 5 min" (run A) and "Boost my career / 15 min" (run B) produce the identical "Here's what you can achieve!" screen: "Converse with confidence / Build a large vocabulary / Develop a learning habit". The level answer does change things ("Since you know some Spanish…" and the placement path).
- Where: J1 → /welcome.
- Evidence: `L-03`…`L-15` (light), `A-03`…`A-15` (dark), `B-10-welcome.png`. The courseOverview text is identical in `journeyA.log` and `journeyB.log`. Timing (`journeyL.log`): GET STARTED at 6.8 s, first challenge at ≈56 s, so **≈50 s at bot pace**. That includes ~3 s of headless /welcome render and ~30 s of script waits. A human reading every bubble is likely 70–90 s, past the < 60 s target.
- Why it matters: onboarding paradox (engagement-retention.md). Length is justified only if it visibly personalizes the first screen. Here, reason and goal don't, and how-did-you-hear is marketing attribution the user pays for. Value-prop slides belong on one screen, not four.
- Fix: put "Hi! I'm Duo" in the /register header and drop the party screen. Drop the "hard to stay motivated / fun like a game" pair; that is 2 taps between choosing "Start from scratch" and starting. Move how-did-you-hear to after lesson 1 (one optional tap). Make courseOverview reflect the reason: "For travel: order food, ask directions, check in". Target 6 screens to the first word.
- Effort: M
- Confidence: medium. The learning reason might shape later units; run B stopped at the placement test, so its path wasn't seen.

## F-FIRST-TIMER-05 [P2] A notification permission ask arrives before you've learned a single word, through a fake browser dialog whose buttons are real
- User experiences: screen 8 of onboarding shows "I'll remind you to practice so it becomes a habit!" above a drawn copy of a Chrome prompt ("www.duolingo.com wants to · Show notifications · BLOCK / ALLOW") and an arrow pointing up. The drawn ALLOW is a live `<button>`. Tapping it fires the real `Notification.requestPermission`, and so does the only exit, CONTINUE. The user is asked twice (the drawing, then the browser) before any value. At 390 px the drawing overflows: it spans -2…392 px and the document is 406 px wide in a 390 px viewport.
- Where: J1 → /welcome?welcomeStep=notificationPrimer.
- Evidence: `primer-light-390.png`, `primer-light-390-after-mock-allow.png`. `primer.mjs` output: `mock ALLOW element: {"tag":"BUTTON",…}`, `perm calls ["?welcomeStep=notificationPrimer"]`, `docScrollWidth: 406`, ALLOW `right: 392`. `journeyL.log`: requestPermission is logged when CONTINUE is tapped at this step. Dark version: `A-11-welcome.png`.
- Why it matters: "defer permission prompts until value has been shown" (content-and-forms.md, engagement-retention.md). A reminder is worth something only after there is a streak to protect. A refused prompt is close to permanent on web, so asking early burns the one shot at the day-2 trigger. Not checked: on Chrome Android the real prompt sits at the bottom, so the up arrow probably points at nothing (real device is out of scope).
- Fix: move the primer to just after the streak-1 screen: "Want a nudge tomorrow at 19:00 to keep day 2?" with [Remind me] / [Not now]. Call `requestPermission` only on [Remind me]. Draw the mock inside `max-width: calc(100vw - 32px)`.
- Effort: S
- Confidence: high on placement and double ask; medium on cost (real-device prompt UI not checked).

## F-FIRST-TIMER-06 [P2] On the path, the tabs are bare icons and the top bar is four unlabeled numbers; by the end of lesson 1 a newcomer has met nine meters
- User experiences: /learn shows "🇪🇸 1 · 🔥 1 · 💎 505 · ❤ 5" with no words, and a bottom bar of 5 icons with no labels: house, shield, chest, storefront, avatar. I couldn't tell which "1" was which, why I had 505 gems after earning 5, or that the shield is Leaderboards and the chest is Quests until I tapped them. Count of meters seen by the end of lesson 1: XP, combo, accuracy, Spanish Score, streak, streak goal, daily quest, gems, hearts.
- Where: J3 → /learn top bar and tab bar; all interior screens.
- Evidence: `L-64-learn.png`, `L-interior-leaderboard.png`, `A-interior-quests.png`. The tab names exist only as accessible names (`Learn`, `Leaderboards`, `Quests`, `Shop`, `Profile` → `/learn?sign-up`; `journeyL.log` LEARN DOM). Before lesson 1 the guest already had 500 gems (`journeyA` first run: "0 500 5").
- Why it matters: no unexplained icons; tab labels at 10–12 px are the standard (usability.md, mobile tab bar). Trunk test (below) fails "main sections". Unexplained counters are recall work on a screen a newcomer sees daily.
- Fix: add labels under the tab icons (11–12 px, one line). On the first /learn visit, show one tooltip per counter, tap to step: "Streak: days in a row", "Gems: spend in Shop", "Hearts: mistakes left". Hold back Spanish Score and gems until lesson 3.
- Effort: S (labels), M (tooltips)
- Confidence: high for the observation, medium for the cost (a 5-user tab-identification test would settle it).

## F-FIRST-TIMER-07 [P3] The first thing on the landing page is a cookie banner over GET STARTED
- User experiences: the 390×844 first view shows the owl, the headline cut mid-line, and the "Duo loves cookies" banner covering the bottom 37%. The element under GET STARTED's centre is the banner's "Cookie Policy" link.
- Where: J1 → landing, first load.
- Evidence: `duo-landing-390-light-fold.png`; `landing2.mjs`: `getStarted.top 712`, `elAtGetStarted: "Cookie Policy"`. After REJECT ALL: `duo-landing-390-light-fold-noconsent.png`.
- Why it matters: the 5-second test starts with a chore. The cost is one tap, and REJECT ALL has the same weight as ACCEPT (good, see Strengths).
- Fix: dock the banner as a ≤ 180 px bottom sheet below the CTAs, or show it after the first tap (as /register does: the banner did not reappear there).
- Effort: S
- Confidence: high

## F-FIRST-TIMER-08 [P3] The landing fold says "most fun" but not "free", and shows no proof; both are one swipe down
- User experiences: above the fold: "The most fun way to learn languages, chess, and more!" and an illustration. "free. fun. effective." starts at y = 940 px, just under the 844 fold. The learner counts that would convince me ("Spanish 42M learners") appear only on /register. Babbel's fold carries proof ("Over 25 million subscriptions sold!").
- Where: J1 → landing hero.
- Evidence: `landing2.mjs` section list (H1@462, H2 "free. fun. effective."@940); `duo-landing-390-light-seg1.png`; `babbel-landing-390-light-fold-noconsent.png`.
- Why it matters: Krug's "why here and not elsewhere" (landing-pages.md). Free is the strongest reason to pick Duolingo over Babbel, and "most fun" is puffery without proof. The CTA is still unmistakable, so the cost is small.
- Fix: subhead under the H1: "Free · 5 minutes a day · 42M people learning Spanish".
- Effort: S
- Confidence: medium (copy test needed)

## F-FIRST-TIMER-09 [P3] Back on the path, the node you just played still says "START"
- User experiences: after lesson 1 the first node's bubble reads "START", the same as before I played it. Only a tap reveals "Order at a café · Lesson 2 of 3 · START +10 XP". For a moment I thought my lesson hadn't counted.
- Where: J3 → /learn → first path node.
- Evidence: `L-64-learn.png` (bubble "START", ring ⅓ filled) vs `L-66-learn-node-tapped.png`.
- Fix: bubble "LESSON 2 / 3" or "CONTINUE" once the node has progress.
- Effort: S
- Confidence: high

## Strengths (only real ones, max 3, one line each)
- Every lesson tap is answered instantly: the result banner appears 13–46 ms after CHECK and the feedback sound 27–63 ms after (16 challenges, `journeyA.log`/`journeyL.log`). Wrong answers say "Correct solution: perro" calmly, in red, without blame (`A-19-ch1-feedback.png`).
- Real guest-first value: a full lesson, streak and quests with zero account. Sign-up is asked once, after the lesson, and LATER works in one tap with no confirmshaming (`L-63-end.png`).
- The cookie banner gives REJECT ALL the same size and colour as ACCEPT. Babbel offers a filled "Accept all" and a text-link "Manage settings" (`babbel-landing-390-light-fold.png`).

## 5-second test (landing, 390×844, light)
- What is it: a cartoon language-learning app (owl, "learn languages, chess, and more"). **Who for:** anyone, casual. **What to do first:** GET STARTED, a big green button with nothing competing. Clear within 5 s once the cookie banner is gone. With the banner, the CTA is hidden (F-07).
- **Flash test** (0.5 s look, then blurred; `duo-landing-390-light-blur-noconsent.png` vs `babbel-landing-390-light-blur-noconsent.png`, consent layers dismissed or hidden): **Duolingo 74 / Babbel 77.** Duolingo has one unmistakable focal point (green bar) and a cheerful colour cluster, but ~40% of the fold is empty white (the logo-to-illustration and headline-to-CTA gaps). Babbel has warm photographic texture, a strong serif headline and visible structure, and reads as more "grown-up premium". As actually first seen, with banners: Duolingo 66, Babbel 55 (Babbel's consent card covers ~60% of the fold).
- **Krug's five questions:** What is this? Yes (language app). What can I do? Start learning (yes). What do they have? "languages, chess, and more", which is vague, though the course grid comes one tap later. Why here? Only "most fun" (F-08). Where do I start? GET STARTED (yes).
- **Trunk test** on /learn and /leaderboard (`L-64-learn.png`, `L-interior-leaderboard.png`). Site ID: ✗ (no logo or wordmark on either; /leaderboard has no top bar at all). Page name: ~ (unit banner on /learn; "Unlock Leaderboards!" heading). Main sections: ✗ (icon-only tabs, F-06). You are here: ✓ (active tab boxed and tinted). Local nav: n/a. Search: n/a for an app. **2 of 4 applicable.**

## Onboarding count (landing → first felt value)
- Screens: landing, /register and 11 /welcome screens = 13 before the first challenge. Taps: GET STARTED, Spanish, 11 CONTINUE, 5 choices = 18 minimum.
- Decisions: course, how-heard, reason, level, daily goal, notifications, start point = 7.
- Permission prompts: 1 (notifications), plus its drawn copy. Inputs typed: 0.
- First felt value: the first "Amazing!" on "Which one of these is 'cat'?" at ≈57 s bot time (`journeyL.log`), likely 75–100 s for a human.
- Quiz-change test: level changes the next screen ("Since you know some Spanish…" plus placement). Reason and daily goal change nothing visible on the following screens (F-04).

## Words on the path (flagged)
- "Let's get this party started!" and "Hi there! I'm Duo!" are separate screens with only CONTINUE: words with no job.
- "You unlocked your Duolingo Spanish Score! 1" then "Your Score connects course progress to real-life skills": an internal metric explained in abstract terms; I re-read it and still didn't know what it's for.
- "I CAN DO IT!" as the only button on a commitment screen: a pledge disguised as a button label (F-01).
- "You'll be 2x more likely to complete the course!": an unsourced claim at a commitment ask.
- "Brawl Stars" in how-did-you-hear, with a pencil icon: odd, but harmless.
- "JUMP HERE?" on later path units: playful but ambiguous (jump = skip ahead via a test?). It is a link to `/lesson/unit/2/test`, and the label doesn't say "test".
- "LATER" on the profile prompt is good: it names the real action.

## Emotional journey map (run L, light; A for the mistake path)
1. Landing → mildly annoyed: a cookie banner before anything else. Then cheerful: one obvious button.
2. /register → confident, curious: 42 cards, learner counts reassure ("42M learners"). "Chess?" for a second.
3. Hi there / party started → impatient: two taps of nothing.
4. How did you hear → bored: this is for them, not me.
5. Why / level / goal → engaged: feels like it's tailoring something.
6. "Here's what you can achieve!" → flat: generic, and it ignores "travel".
7. Notifications → **anxiety spike**: a permission ask (twice, drawn and real) before I've learned anything.
8. Start point → confident: "Start from scratch" is plainly worded.
9. Motivation slides → impatient: "just let me start".
10. First challenge "cat → gato" → **best moment**: picture cards, instant chime, "Amazing!". I'm doing Spanish within a minute or so.
11. Deliberate mistake → mildly stung but OK: the red banner shows the answer and a heart goes 5 → 4 (`A-19`). No blame.
12. "Cool! 5 in a row!" → proud.
13. Lesson Complete! (XP 15, 100%) → proud; the peak.
14. Score unlock + explainer → confused: what's a Score?
15. Streak 1 + "will reset if you don't practice tomorrow. Watch out!" → **worst moment**: from proud to warned in two taps, and the warning isn't even true (F-02).
16. Streak goal with no skip → pressured: "I CAN DO IT!" or close the tab.
17. Quests complete / 5 gems → numb: more meters.
18. "Time to create a profile!" → mild pressure; LATER is easy.
19. **End:** /learn path, "START" on the node I just did, four unlabeled numbers → unsure what's next or what I achieved.

## Trust check at first glance
- An email? Yes. The look is polished and consistent, and learner counts on /register, a real lesson before any ask, and an equal-weight Reject on cookies all build credibility.
- A card? Not asked anywhere on the path, so nothing undermines it. What would: the gem economy (500 free gems before lesson 1, "GET FOR: 350" hearts in /shop) reads as a game currency, which is a mild wariness signal.

## Day-2 test
- What is waiting: the path node holds "Lesson 2 of 3" (only visible after a tap). Daily Quests "refresh every day" (there is a timer). Leaderboards unlock after "2 more lessons", a real open loop. Streak 1 with 2 hidden freezes. Returning in a new tab of the same browser goes straight to /learn with state intact (`L-return-visit.png`).
- The trigger is weak. With no account there is no email. A push needs the permission that was burned before value (F-05), and nothing on /learn says "come back tomorrow for X". Motivation: medium (an open loop). Ability: high (one tap). Trigger: low.
- If I quit during lesson 1, day 2 opens on a repeat quiz (F-03).
- Not verifiable here: whether the path or home changes on an actual next day (multi-day is out of scope).

## Empty, error and loading states hit
- Lesson loading: "LOADING..." plus a fun fact ("We teach endangered languages, including Navajo and Hawaiian"). It teaches and is fine.
- Wrong answer: shows the correct solution, no blame. Good.
- Locked leaderboard: "Unlock Leaderboards! Complete 2 more lessons to start competing" with START A LESSON. Explains why it's empty, names a goal and gives one CTA. Good.
- Quests: "More quests unlock soon" in a lock card, with no "when". Slightly vague.
- Background only, not user-visible: `GET /users/undefined/streak-goal-current` and `…/streak-goal-next-options` return 404 on every run before the guest exists, and a 403 for the guest later. Nothing broke on screen; logged for the verifier.

## Hesitations
H-01 | landing → first view | read the page and tap GET STARTED | cookie banner covers the CTA and cuts the headline; had to tap REJECT ALL first | 2–3 s | duo-landing-390-light-fold.png
H-02 | /register → course grid | scan for languages | "Chess" sits third, between French and English; brief double-take | 1 s | A-02-register.png
H-03 | /welcome → "Hi there! I'm Duo!" | expected a question or a choice | only CONTINUE | 1–2 s | L-03-welcome.png
H-04 | /welcome → "Let's get this party started!" | same | only CONTINUE again | 1–2 s | L-04-welcome.png
H-05 | /welcome → how did you hear | find my answer | 9 options, list scrolls; "Other" below the fold | 3 s | L-05-welcome.png
H-06 | /welcome → "Here's what you can achieve!" | expected travel content (I picked travel) | generic three bullets, the same for every answer | 2 s | A-09-welcome.png, B-10-welcome.png
H-07 | /welcome → notification primer | tap the drawn ALLOW/BLOCK or CONTINUE? | the drawn ALLOW is a real button and fires the browser prompt; CONTINUE fires it too | 3–4 s | primer-light-390.png
H-08 | /welcome → motivation slides ×2 | expected the lesson after "Start from scratch" | two more speech bubbles | 2–3 s | L-14/L-15 (choosePath step)
H-09 | lesson → match pairs | tap "water" then "agua"? | worked as expected; pair fades | 0 s | A-24-ch4-match.png
H-10 | post-lesson → Spanish Score | understand what "1" means | abstract copy; still unclear | 3 s | L-44, L-45
H-11 | post-lesson → streak goal | skip it | no skip; button disabled until a pick | 4 s | L-47-lesson-interstitial.png
H-12 | /learn → top bar | read 1 / 1 / 505 / 5 | four unlabeled numbers; unsure which "1" is the streak | 3 s | L-64-learn.png
H-13 | /learn → bottom tabs | find Leaderboards | icon-only; guessed the shield | 3 s | L-64-learn.png
H-14 | /learn → first node | expected "lesson 2" or "continue" | "START" on a node I'd played; tap revealed "Lesson 2 of 3" | 2 s | L-64 vs L-66
H-15 | lesson 1 → quit (X) → /learn | expected the path | asked "How much Spanish do you know?" again | 3–5 s | C-15, C-16, C-return-visit.png

## Sign-up prompt log (scoping requirement)
- Appears once in J1: after lesson complete, as the 8th post-lesson screen ("Time to create a profile! Create a profile to save your progress and continue learning for free."), full screen.
- Pushiness: low to moderate. A filled blue CREATE A PROFILE over an outlined LATER with grey text. LATER is one tap and goes straight to /learn with no confirm and no shaming.
- Elsewhere: the Profile tab routes to `/learn?sign-up`. No other sign-up interruptions in J1 or J3. Never tapped; no email or password typed.

## Brutal questions
- **At which second would a newcomer quit?** Not before the lesson: the onboarding is long but light, and the lesson grabs at the first chime (≈57 s bot time). The real exit is ≈12 s after "Lesson Complete!", at the streak-goal screen. It comes right after a loss warning, and the only way forward is to pledge "I CAN DO IT!". A distracted user closes the tab there, after the value and before the path, so they never see what's waiting.
- **What did the product fail to make you feel?** Competence. I learned six Spanish words and was never shown them. I was shown XP, accuracy, a Score, a streak, gems and quests. Day 0 ends with being scored and warned instead of "I can say cat, dog, water in Spanish".

## Interaction log (run L unless noted; bot pace)
- 0.0 s goto duolingo.com → 5.5 s landing painted (light) → REJECT ALL (0.3 s).
- GET STARTED → course grid visible in 38–62 ms (SPA; 5 runs).
- Spanish → first /welcome screen 2.5–6.3 s (headless /welcome render; brief caveat).
- 11 /welcome screens: CONTINUE was enabled ≤ 0.6 s after each screen appeared (the poll floor); CONTINUE stays disabled until a choice on the 5 question screens.
- notificationPrimer CONTINUE → `Notification.requestPermission` logged (t ≈ 39 s); drawn ALLOW tap → requestPermission logged (`primer.mjs`).
- ≈54 s /lesson: "LOADING…" plus a fun fact for < 1 s → first challenge.
- CHECK → result banner 13–22 ms (select), 36–46 ms (assist); feedback mp3 +27–63 ms; match pairs auto-advance ~1.6 s.
- Run A: 2 deliberate wrong answers → red banner with the correct solution, hearts 5 → 4 → 3; no hearts-intro modal in this run.
- Interstitials: "Cool! 5 in a row!" (A) and "Outstanding! 10 in a row!" (L).
- Lesson complete → stats final at +0 ms when shot (`complete-light-*`, XP 15 / 100%) → 7 further screens → LATER → /learn.
- /learn → node tap → popover "Lesson 2 of 3 · START +10 XP".
- New tab → duolingo.com → redirected to /learn, state kept (streak 1, gems 505).
- /leaderboard locked (2 more lessons); /quests 10/10 done with a timer; /shop shows Streak Freeze 2/2 EQUIPPED.
- Run C: first challenge → X → /learn plus proficiency modal (no quit confirmation).
