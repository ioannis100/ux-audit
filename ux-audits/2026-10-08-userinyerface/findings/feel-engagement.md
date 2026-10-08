# feel-engagement — findings
Coverage: 6/6 inventory screens (Home, game chrome, steps 1–4) + 8 states (cookie banner, T&C modal, cancel-confirm modal, timer modal + locked, step-3 error modal, help widget open/queue/collapsed/reopened, captcha failure, end screen). Steps 2–4 reached by setting `ui-game.currentPageIndex` (1/2/3), confirmed each time by the card text "2 / 4", "3 / 4", "4 / 4" (I never used the old `activePageIndex` snippet; that one only moves the pips). The step 1 → 2 transition was not observed, since it needs a password. The step 2 avatar upload through the real file chooser did not fire: `FileDialog` uses a detached `<input type=file>` and puppeteer's `accept()` never triggered `change`. I set the avatar with the component's own `onAvatarComplete(<test-avatar.png data URL>)` instead. Step 3 was not submitted valid: I jumped to step 4. The captcha and end screen were completed through the real UI at both widths. Home was judged from the orchestrator's `home-1440.png` and the live `index.html` source.
Viewports/devices: headless Chrome 1440×900 (mouse, hover) and 390×844 @2x (isMobile, touch). The built-in browser pane was hidden, so all evidence comes from puppeteer. I did not test 320.
Evidence root: `evidence/feel-engagement/` (scripts `a-…mjs` to `e-…mjs` reproduce everything; logs `a-log.json`, `b-log.json`, `c-log.json`, `d-log.json`, `*-out.txt`; the source was snapshotted to `app.js`, `app.css` and `templates.txt`).

**Ethics gate result: 9 dark patterns confirmed, each with a test:** consent-before-asking cookie wall, trick question ×3, preselection ×2, visual interference, fake urgency, nagging, disguised close, fake progress, fake social proof (support queue). Each one is rated P1.

---

## F-FEEL-01 [P1] The cookie banner gives you no way to say no, and the cookies are already set before it asks
- User experiences: A red banner asks "This site uses cookies, is that a problem for you?". The big white **"Yes"** (= it is a problem) does nothing. The banner stays until you press the faint "Not really, no" (= consent). By then Google Analytics cookies have been on the device for about a second.
- Where: Game chrome → cookie banner (all steps, both widths).
- Evidence: `a-log.json`: at t=1.3 s, before any click and before the banner renders at 00:00:02, the cookies are `_ga`, `_gid`, `_gat` on `.userinyerface.com`. Clicking "Yes" leaves `cookiesIsActive: true` (`a-after-cookie-yes-1440.png`). Source: the "Yes" `<ui-button>` has no `@click` (`templates.txt` mod 21). After "Not really, no", `_ga_WV3V8CDC4C` is added. Weighting (`a-control-states-1440.json`): "Yes" is a 140×48 white-filled button with 24px text; "Not really, no" is 143×40 with a transparent background, transparent border and 16px text. At 390 the banner is 324px tall (33% of the viewport) and "Yes" runs off-screen to x=428 (`c-cookie-banner-390.png`, `innerWidth` 453).
- Why it matters: Five patterns at once: cookie wall without an equal reject, trick question (inverted polarity, so "Yes" means *no*), visual interference, a dead decline button, and consent collected after the fact. EU ePrivacy/GDPR exposure, and the very first interaction teaches the user that this product doesn't listen.
- Fix: Load GA only after an opt-in. Ask plainly: "Can we use analytics cookies?" with two equal buttons **[Accept analytics] [Reject]**, both 44px tall, same style, both working. On phones use a bottom sheet ≤ 25% of the height, and don't block the form.
- Effort: S
- Confidence: high

## F-FEEL-02 [P1] Accepting the terms is a double negative, ticked against you, and the T&C popup traps you
- User experiences: The box beside "I do not accept the Terms & Conditions" is already ticked. To accept, you must *untick* it. Clicking the sentence (the natural target) opens a T&C popup you can't close. Its Accept button is greyed out until you scroll 2,159px, at 2px per mouse-wheel tick. When you finally press Accept, it **doesn't record acceptance**.
- Where: Step 1 → T&C row → T&C modal.
- Evidence: Initial `#accept-terms-conditions.checked === true` with the label "I do not accept the Terms & Conditions". The error copy is "Please do NOT forget to accept our terms and conditions" (`a-step1-next-empty-1440.png`). It stays on screen after unticking (`checked:false`, error still shown). Clicking the label text gives `termsAndConditionsVisible:true` with the checkbox unchanged. In the modal, Escape and a backdrop click leave it open, and Accept before scrolling does nothing (`a-terms-modal-1440.png`). 20 wheel ticks of deltaY 100 move 40px, so about 1,080 ticks are needed. At 390, 5 full-height finger swipes moved 0px (`c-log.json`; touch synthetic, medium confidence). The only fast route is Alt+wheel, disclosed inside the T&C as "ALT to scroll faster is cheating and not allowed." After Accept, the modal closes and the checkbox is still ticked (= not accepted). The T&C body is an unfilled template: "Welcome to [Insert company or website name]".
- Why it matters: Trick question plus preselection plus forced action, on the one legally meaningful choice in a sign-up. Users who "accept" in the modal still fail validation, which reads as a broken product.
- Fix: Unticked checkbox, positive wording: "I accept the [Terms & Conditions]". Only the underlined words open the terms, in a normal closable dialog (Esc, ×, backdrop) with native scrolling and no Accept gate. If the dialog keeps an Accept button, it ticks the box and closes. Clear the error the moment the box is ticked.
- Effort: S
- Confidence: high

## F-FEEL-03 [P1] Every action row makes leaving the flow the most prominent choice
- User experiences: On every step the big, coloured button is **Cancel**. "Next" is a small grey word or an outline. The cancel dialog asks "Are you sure you want to cancel?" and offers a red **Yes** (leave and lose everything) and a green **Cancel** (stay).
- Where: Step 1, 2, 3 action rows; the cancel-confirm modal; step 2 avatar; Home.
- Evidence: Step 1 (`a-control-states-1440.json`): Next is an `<a>`, 30×16, colour #b5bbc0 on white, `cursor:default`; Cancel is a `<button>`, 186×40, filled #0c58da; Reset is 38×16 grey. Steps 2 and 3 (`b-control-states-1440.json`): Next is stroked, white on white card edge, transparent; Cancel is solid **green** #29c566. The confirm modal (`a-confirm-modal-1440.png`) has "Yes" = red `<a href="/index.html">` and "Cancel" = green button. Step 2: "Download image" is a solid blue 154×32 button; the required "upload" is a 42×16 grey (#7f8c8d) inline link (`b-step2-arrival-1440.png`). Keyboard: 14 Tabs cycle pips 1–4 → **Cancel** → help widget → pips… "Next" and "Reset" are never reached (`a-log.json` "Tab x14"). Home: a 108px green "NO" button (the only control in the product with a hover state: `scale(1.1)`, pointer) does nothing. The real way in, "HERE", has `cursor:text` and no underline, next to a decoy underlined "click" (`index.html`, `app.css .start__link`).
- Why it matters: Visual interference and a trick question. Colour and size tell users which option is safe and forward. Here they point to the exit, and the confirm dialog uses "Cancel" to mean *don't cancel*, so autopilot clicks destroy progress.
- Fix: One primary per row: **[Continue]** solid brand blue, 44px+, on the right; "Back" as a secondary outline on the left; drop Reset, or make it a tertiary text link far from Continue. Confirm dialog: "Leave sign-up? Your answers will be lost." with **[Keep going]** (primary) and **[Leave]** (secondary or destructive red). Make "upload" the primary button: "Upload photo". Home: "Start" as the one button.
- Effort: S
- Confidence: high

## F-FEEL-04 [P1] The progress pips are fake: they spin through 1-2-3-4 every second
- User experiences: The four numbered circles above the card light up one after another, forever. The highlighted number almost never matches the step you're on.
- Where: Game chrome, every step.
- Evidence: Sampled every 250 ms on step 1, the highlighted pip went 3,3,3,3,4,4,4,4,1,1,1,1,2,2,2,2 while the card said "1 / 4" (`a-log.json`). Source: `activePageIndex` increments on every timer tick; the comment calls it "Used by fake pagination". The pips are `<button>`s (48×48, Tab-focusable) with no handler. They still cycle with `prefers-reduced-motion: reduce` (`d-log.json`). Step 2 screenshot: pip "4" lit while the card shows 2/4 (`b-step2-arrival-1440.png`).
- Why it matters: Fake progress is a listed dark pattern. In a multi-step form the stepper is the anxiety reducer ("how much is left?"). This one creates the opposite signal. It also fails WCAG 2.2.2 (A): auto-moving content longer than 5 s with no pause.
- Fix: A static stepper bound to `currentPageIndex`: completed steps get a check, the current one is filled, future ones are outlined. Label it "Step 2 of 4 · Profile". Make it non-interactive, or allow navigating back to completed steps only. Remove `activePageIndex`.
- Effort: S
- Confidence: high

## F-FEEL-05 [P1] "Hurry up, time is ticking!" is fake urgency, and the nag costs you the time it scolds you about
- User experiences: A clock counts up from 00:00:00. Every full minute a modal blocks the form with "Hurry up, time is ticking!" while the clock keeps running. The way out is disguised as a copyright line ("©lose 2026"), and the big green **Lock** button removes even that.
- Where: Game chrome timer → timer modal (any step).
- Evidence: The modal fired at 00:01:00 (`a-timer-modal-1440.png`). Source: `seconds % 60 === 0 → timerModalIsActive = true` (every minute, although the code comment says 30 s). Verification tests: (1) **Reload**: the timer went 00:00:11 → 00:00:02, and step 3/4 went back to 1/4 (`d-log.json`). (2) **Two concurrent sessions**: 00:00:09 vs 00:00:02, fully independent. (3) **Limit search**: the timer's only consumers are the cookie banner at 2 s, the pips and this modal. No deadline, no penalty, nothing is sent anywhere. The modal's timer keeps ticking (00:01:01 in the screenshot). The close link "©lose" is 14px #b5bbc0 with `cursor:auto`, and only 36×16 at 390 (`c-timer-modal-390.png`). Escape does nothing. "Lock" hides the close link until "Unlock" (`a-timer-modal-locked-1440.png`).
- Why it matters: Fake urgency (confirmed, not suspected: the reload and two-session tests both show there is no real limit), nagging, and a disguised close. Pressure raises errors in a form that is graded on accuracy, and the modal steals the seconds it warns about.
- Fix: For a real sign-up, remove the timer and the modal. If speed is the game, show the elapsed time as a neutral stat ("1:42 so far"), never interrupt, and put a visible ✕ plus Esc on any modal. If a nudge is wanted, make it one inline line after 3 min of inactivity: "Need a hand? Here's what's left: …".
- Effort: S
- Confidence: high

## F-FEEL-06 [P1] The help widget covers the buttons, takes 14 seconds to go away, comes back by itself, and its queue number is invented
- User experiences: A dark "How can we help?" panel sits over the bottom-right of every step. At 1440×900 it covers step 3's Next and Cancel, so clicks land in the help box. Its dismiss button ("Send to bottom") makes it shrink for 14 seconds, and 50 seconds later it pops back open. If you ask for help, you're told "Please wait, there are 425 people in line", a number made up per page load. Your message is never sent.
- Where: Help widget, all steps, both widths.
- Evidence: Step 3 at 1440 with the widget open: `elementFromPoint` at the Next centre returns `DIV.help-form__container`, and at the Cancel centre `TEXTAREA.help-form__text-area` (`c-out-part1.txt`, `c-step3-help-overlap-1440.png`). Clicking Cancel there did not open the confirm dialog (`b-log.json`). After collapsing, the same points hit the buttons and Cancel works. Collapse: height 228 → 204 → 180 … → 10px over 14 s (CSS `.help-form.is-hidden{transition:height 14s ease-out}`). It reopened by itself at **50.5 s** (`a-log.json`, `INTERVAL = 50000`). Queue: session A 475, session B 425 at the same moment; after reloading A, 426; each extra click adds 1 (499 → 500). Source: `numWaiting: Math.random()*100+400`. Network: **0 requests** after pressing Help in 3 runs (`e-help-autocorrect.mjs`).
- Why it matters: Nagging (it reopens unasked), obstruction (it physically covers the primary action), fake social proof/activity (an invented queue), and fake support (the message goes nowhere). Users who reach for help at the worst moment get lied to.
- Fix: Collapse help to a 48px "Help" pill that never overlaps form actions (reserve bottom padding equal to its height, or dock it in the header). Opening and closing take 200 ms and it stays where the user leaves it. If there's no live support, show the 3 FAQs that match the current step (e.g. "Why do I need 3 interests?"). Never show a queue that isn't real.
- Effort: M
- Confidence: high

## F-FEEL-07 [P1] The help box rewrites your words, and turns "this" into "shit"
- User experiences: I typed "I cannot finish this form please help " into the help box. As I typed, it became "I caesaropapism frondescence **shit** formivorous please help ".
- Where: Help widget textarea.
- Evidence: 3/3 runs replaced "this" with "shit" and randomly swapped other words (`e-help-autocorrect.mjs` output, `e-help-autocorrect-1440.png`). Source: `autoCorrectDictionary = {'this': ['shit'], …}` and a 70% chance per word on every space.
- Why it matters: Profanity inserted into the user's own message, in the support channel, at a moment of frustration. It is a trust breaker and could be reputational if screenshotted. Nobody signs up to a service that puts swear words in their mouth.
- Fix: Delete the autocorrect. A support textarea is plain input: native spellcheck, no rewriting.
- Effort: S
- Confidence: high

## F-FEEL-08 [P1] All 20 interests come pre-ticked and the task is "choose exactly 3"
- User experiences: Step 2 says "Choose 3 interests" and every box is already ticked, including the boxes labelled "Select all" and "Unselect all". You must untick 17 (or find "Unselect all" inside the list) before you can choose.
- Where: Step 2 → interests list.
- Evidence: On arrival, checked 21/21 (`b-log.json`, `b-step2-arrival-1440.png`). Next with the defaults gives "Please choose 3 interests." Clicking the "Unselect all" checkbox clears all of them. Then 3 picks → valid.
- Why it matters: Preselection, the opposite of the instruction. It costs the user up to 17 extra actions plus a failed submit.
- Fix: Nothing preselected. A live counter "2 of 3 chosen" beside the heading. Disable further boxes at 3 (or allow a 4th with "You can pick 3"). Remove Select all / Unselect all from the list.
- Effort: S
- Confidence: high

## F-FEEL-09 [P1] No control ever reacts: no hover, pressed or focus state on any button, checkbox or dropdown
- User experiences: Nothing changes when you hover over, press or tab to any control. The cursor stays an arrow over buttons. Keyboard focus is invisible.
- Where: All steps and modals, 1440 and 390.
- Evidence: 18 controls measured for default → hover (400 ms) → pressed (mousedown 120 ms) → focus. The diff is **empty for all 18** (`a-control-states-1440.json`, `b-control-states-1440.json`). Controls: cookie Yes/No, step-1 Next/Cancel/Reset, T&C box, email input, extension dropdown, pip, help ×3, step-2 Next/Cancel/Download/upload/interest box, step-3 Next/Cancel/gender toggle, Validate. At 390, a finger held down for 150 ms changed nothing on the cookie button or Cancel (`c-log.json`). `app.css` sets `.button{cursor:default;outline:0}` and `.input{outline:0}`, and has no `:hover`, `:active` or `:focus-visible` rule except the Home "NO" button and country-flag hover. Disabled: only T&C Accept (opacity .5, still a live `<button>` with no `disabled` attribute). Busy: none. A 12-bar spinner animates forever on the avatar placeholder before any upload (`b-step2-arrival-1440.png`), which is a busy state with nothing busy. Gender toggle: clicking "Male" while Male is selected switches to Female (`b-log.json`: Male* → Female* → Male*).
- Why it matters: WCAG 2.4.7 Focus Visible (AA) fails. Without pressed feedback within 100 ms, users double-click or doubt their click registered, and the fake spinner says "wait" when the app is waiting on *them*.
- Fix: Tokens for every control: hover = background 8% darker + `cursor:pointer`; pressed = `transform:scale(.98)` + 12% darker, 80 ms; `:focus-visible{outline:2px solid #fff;outline-offset:2px}` (on white cards, `#0c58da`); disabled = `disabled` attribute + 40% opacity + `cursor:not-allowed`. Show the spinner only while `FileReader` is loading. Toggle segments select themselves (`@click="select('left')"`), never flip.
- Effort: M
- Confidence: high

## F-FEEL-10 [P1] The final step fails silently: a wrong captcha just swaps the puzzle, and errors elsewhere are colour-inverted or one at a time
- User experiences: On the last step you press Validate. The instruction changes from "Select all light pictures" to "Select all pictures with a bow" and your ticks disappear, with no message. Earlier, unmet password rules are shown in success-green, email errors turn the field borders *brand blue*, and step 3 tells you about one missing field per submit.
- Where: Step 4 Validate; step 1 errors; step 3 error modal.
- Evidence: `b-log.json`: Validate with nothing ticked gives a new title, `anyErrorText:false`, still 4/4. Every gallery's 16 images are all matches ("select all X" where all are X; `want` = indexes 0–15 in 3 galleries). The checkbox rows sit *above* image rows with no grouping. Step 1 empty submit (`a-step1-next-empty-1440.png`): rules coloured rgb(41,197,102) (green) and email borders rgb(12,88,218). Step 3 empty submit gives a modal "Please fill in all fields correctly: Invalid first name" and nothing else. Source: `// Only show one error`. Success copy for a valid password: "Your password is not unsafe".
- Why it matters: Peak-end. The last step is where the memory of the whole flow is set, and it is the least forgiving moment in it. Error recovery that doesn't say what's wrong drives abandonment at the highest-effort point.
- Fix: Captcha: keep the same puzzle and say "Not quite. 2 pictures still match 'bow'." Put each checkbox *on* its image (tap the image to select). Errors: red #d0021b + icon + inline text under each field, all at once, focus moved to the first. Rules turn into green ticks only when met. Success copy: "Strong password ✓".
- Effort: M
- Confidence: high

## F-FEEL-11 [P1] Motion has no reduced-motion path and three things move forever
- User experiences: Pips that cycle, a spinner that never stops, and an end-screen GIF that loops all keep moving, even when the OS asks for less motion. A panel takes 14 s to slide away.
- Where: Chrome, step 2, end screen, help widget.
- Evidence: `prefers-reduced-motion: reduce` emulated: `matches:true`, no reduced-motion query in any stylesheet (`anyRMQuery:false`), help collapse still `height 14s ease-out`, pips still cycling (`d-log.json`). The table below lists all motion.
- Why it matters: WCAG 2.2.2 (A) for content that moves for more than 5 s with no pause. Vestibular users get no relief.
- Fix: See the table. Add `@media (prefers-reduced-motion: reduce){*{animation:none!important;transition-duration:0s!important}}` and swap the GIF for a static frame plus a play button.
- Effort: S
- Confidence: high

### Motion audit — Element | Before | After | Why
| Element | Before (measured) | After | Why |
|---|---|---|---|
| Help widget "Send to bottom" | `height` 14 s ease-out, 228 → 10px (sampled 1/s) | Delete, or collapse to a pill with `transform:translateY` 200 ms ease-in | Animating layout; 70× too long; blocks the buttons underneath for 14 s |
| Help widget auto-reopen | Snaps back to 228px at 50.5 s, unasked | Delete | Nagging; motion without a user trigger |
| Progress pips | Cycle every 1 s forever; bg/colour 200 ms ease-out | Static; 150 ms colour change only when the real step changes | Fake progress; WCAG 2.2.2 |
| Avatar spinner | 12 bars, 1.2 s linear, infinite, before any upload | Show only while reading the file; ≥ 500 ms min once shown | Fake busy state |
| Dropdown list (email ext., title, country, date) | Open `max-height`+opacity 300 ms (measured 0 → 150px in ~320 ms); close 500 ms | Open 180 ms ease-out with `transform:scaleY(.96→1)`+opacity from the trigger origin; close 120 ms ease-in | Exit longer than entrance; animates layout (`max-height`) |
| Checkbox tick | opacity 250 ms | 100 ms, or none | Repeated 17–20× on step 2 and 16× on step 4: frequency gate |
| Country flag | `filter: grayscale` 500 ms on hover | 150 ms | Hover feedback > 200 ms feels sluggish |
| Home "NO" button | `scale(1.1)` 200 ms ease-out on hover | Move this hover to the real Start action; scale 1.03 | The only hover in the product sits on a decoy |
| Modals (cookie, T&C, confirm, timer, error) | Hard cut in and out; overlay instant | 150 ms fade + `scale(.98→1)`; exit 120 ms | No continuity; modals feel like crashes |
| Step change 1→2→3→4 | Hard swap of the card (`v-if`), page stays scrolled | Card cross-fade/slide 250 ms ease-out + scroll to card top; stepper fills | "UI as a movie": no sense of forward motion |
| End screen | Hard cut; looping GIF, no pause | One 600 ms orchestrated reveal (time counts to final, card rises); GIF static with play | Single designed peak; WCAG 2.2.2 |
| Prefers-reduced-motion | Not handled anywhere | Global reduce rule as in F-11 | Non-negotiable |

## F-FEEL-12 [P2] One reload, or one press of Cancel on step 2, wipes everything
- User experiences: Reloading on step 3 drops you to step 1 with the clock reset and the cookie banner back. Pressing the big green Cancel on step 2 sends you back to an empty step 1 with no confirmation, and your three interests are lost.
- Where: Any step; step 2 Cancel.
- Evidence: Reload: 3/4 → 1/4, 00:00:11 → 00:00:02, `cookiesIsActive:true`; localStorage and sessionStorage are empty (`d-log.json`). Step 2: 3 picked → Cancel → `step 0`, `confirm:false` → back on step 2, 21/21 ticked again (`b-log.json`). Steps 1 and 3 Cancel open the confirm dialog; step 2's goes straight out (inconsistent). Browser Back then Forward did keep step 2 (bfcache), which is fine.
- Why it matters: Losing entered data is the strongest negative peak a form can produce.
- Fix: Persist answers per step in `sessionStorage` (never the password). "Back" keeps state. Use the same confirm-with-consequence on every exit ("Leave sign-up? Your answers will be lost").
- Effort: S
- Confidence: high

## F-FEEL-13 [P2] The ending is a dancing GIF and a dead end
- User experiences: After Validate the form vanishes. You get "YOU ARE AWESOME! A true interface legend.", a looping Carlton dance GIF and a frozen clock. Nothing tells you whether 0:31 is good, nothing to share, no restart, no "your account is ready", and not one link or button.
- Where: End screen.
- Evidence: `b-end-screen-1440.png`, `c3-end-screen-390.png`. Visible links/buttons: `[]`. The timer stops (00:00:31, unchanged 3 s later). Help and pips are removed. The GIF is borrowed pop-culture footage, not brand art. At 390 the GIF fills the fold below the headline.
- Why it matters: Peak-end: the end is a receipt dressed as a party. It's not tied to anything the user made, has no afterglow and no next step. For a real sign-up there's no confirmation of the account created ("check your inbox"), which leaves people unsure whether it worked.
- Fix: See Engagement opportunity 1. Minimum: "You're in. Account created for t…@example.com" + **[Go to my profile]** + a secondary "Share your time".
- Effort: M
- Confidence: high

---

## Emotional journey (judged as a real sign-up)
| Step | Feeling | Why |
|---|---|---|
| Home | Confused → tricked | Big green "NO" does nothing; the real link "HERE" has a text cursor |
| Game load, 0–2 s | Pressured | A clock starts before you've read anything; the pips flash |
| Cookie banner | Cornered | "Yes" (= problem) is dead; only consent closes it; GA already set |
| Step 1 email + password | Disoriented | Email split into 3 fields + an extension list containing ".jpg"; 5 rules shown green while unmet |
| Step 1 T&C | **Trapped (worst moment)** | Double negative, pre-ticked; the label opens an unclosable 2,159px wall where Accept doesn't accept |
| Minute 1 timer modal | Scolded | "Hurry up" blocks the form while the clock runs; close disguised as "©lose" |
| Help widget | Mocked | Covers buttons, invents a 400+ queue, writes "shit" into your plea |
| Step 2 profile | Annoyed | Untick 17 of 20 to "choose 3"; Download is the big button, upload is a grey word |
| Step 3 details | Ground down | One error per submit; gender toggle flips; the help panel sits on Next/Cancel |
| Step 4 captcha | Defeated | Wrong answer silently swaps the puzzle |
| End | Brief relief, then nothing | GIF, frozen time, no next step |

- **Peak:** negative only, at the T&C modal (step 1). Nothing softens it.
- **End:** undesigned: no confirmation, no context for the time, no action.
- **Anxiety spikes with no reducer:** consent (cookies), legal terms, personal data (step 3: no reason given for why it's needed), errors (silent or inverted).
- **Goodwill ledger:** drainers 11 (dead decline, pre-consent tracking, double negative, forced T&C read, fake urgency, fake progress, fake queue, profanity, preselection, silent captcha reset, data loss on reload/Cancel). Fillers 0. Net strongly negative.

## Emotional score anchors (0–4)
| Dimension | Score | Evidence |
|---|---|---|
| First impression (visceral) | 2 | Clean, confident blue + Poppins logo; then a full-width pure-red #ff0000 banner and a #b5bbc0 grey "Next" make it read as broken within 3 s |
| Feel in use (behavioral) | 0 | No pressed/hover/focus on 18/18 controls; widget eats clicks; gender toggle flips |
| Anxiety handling | 0 | Consent, T&C and errors all increase anxiety (F-01, 02, 10) |
| Peak & end | 0 | Worst moment unaddressed; end is a GIF with no next step |
| Personality coherence | 1 | Tongue-in-cheek voice is consistent, but it mocks the user exactly at error, consent and help, where tone should go calm; colour semantics inverted (green = cancel, red = confirm-leave) |
| Reward moments | 1 | One celebration, no anticipation, no afterglow, not share-ready |
| Ethical engagement | 0 | 9 confirmed dark patterns |

**Three words:** trapped, mocked, rushed. **Screenshot-worthy moment:** none that flatters the product. The one people *would* screenshot is the help box turning "this" into "shit", which spreads as a complaint, not a recommendation.

## Engagement and retention
- **Hook trace:** sign-up is a one-time action. External trigger (link) → internal trigger (wanting the service) → action (form) → reward (**blank**: no account and no value shown at the end) → investment (profile and avatar entered but **never shown back**). The loop doesn't close at reward. The missing link is a visible payoff at the end that uses what the user just entered.
- **Habit-zone gate:** fails by design (annual-frequency task). Streaks, paywalls, leaderboards, in-app currency: **N/A**. None present, and none should be added to a sign-up flow.
- **Win map:** the only win is the end screen; no share, rating or next-step ask is attached to it.

**Delight thesis:** Finishing sign-up should feel like being handed your new profile, built from what you just told us, not like escaping a maze.
(Walter's hierarchy: all of it comes *after* F-01 to F-12. Delight on top of these flows would make things worse.)

**Engagement opportunities**
1. **End screen → "Your profile is ready" card** (completion engine). Show the uploaded avatar, the 3 chosen interests as chips, the account email, and the completion time as a neutral stat. Then **[Go to my profile]** (primary) and **[Share]** (secondary). Metric: activation (first profile view after sign-up) and the share rate of the end card. Reduced motion: card appears instantly, no count-up. 100th use: irrelevant (seen once per account), so the ceremony can be full-size once.
2. **Real stepper with named steps and check marks** (completion engine, Zeigarnik). "Account ✓ · Profile ✓ · Details · Verify", filling as each step validates, with "about 1 min left". Metric: step-to-step completion and drop-off at step 3 (the longest). Reduced motion: state change without the 150 ms fill. 100th use: the same quiet affordance, no flourish.
3. **Live profile preview on step 2–3** (investment + anticipation). A small card beside the form fills in as you add the avatar, interests and first name ("Hi, Test 👋 · Ponies · Polo · Dough"). This is the same card revealed on the end screen. Metric: step-2 completion rate and time-on-step. Reduced motion: text updates only. 100th use: N/A (one-time), and it doubles as a check that what you entered is right.

## Strengths
- The logo lockup (layered "UI" mark + Poppins wordmark) is distinctive and well-built. It's the one surface that looks premium.
- Inputs are a consistent 40px tall with 4px radius, a coherent base to apply proper states to.
- Browser Back/Forward keeps the current step (bfcache).

## Interaction log
| # | Action | Result | Time |
|---|---|---|---|
| 1 | Cold load `/game.html` @1440 (fresh context) | `load` in 1.1 s; `_ga _gid _gat` already set | t=1.3 s |
| 2 | Wait | Cookie banner at 00:00:02 | 2.6 s |
| 3 | Sample pips 16×/250 ms | Highlighted 3→4→1→2, card "1 / 4" | 4 s |
| 4 | Hover/press/focus on 11 step-1 + chrome controls | No style change on any | ~13 s |
| 5 | Click cookie "Yes" | Nothing; banner stays | 0.8 s |
| 6 | Click "Not really, no" | Banner gone; `_ga_WV3V8CDC4C` added | 0.8 s |
| 7 | Tab ×14 | Pips 1–4 → Cancel → help ▲ → textarea → Send → body → loop; Next never reached; no focus ring | — |
| 8 | Open email-extension dropdown | 0 → 150px in ~320 ms | 0.6 s |
| 9 | Next with everything empty (password untouched) | T&C error; email borders blue; rules stay green | 0.6 s |
| 10 | Click T&C checkbox box | Unticked; error still shown | 0.4 s |
| 11 | Click T&C label text | Unclosable modal; Esc/backdrop/Accept do nothing | 1 s |
| 12 | 20 wheel ticks | 40px of 2,159px | 1.5 s |
| 13 | Alt+wheel ×400 → Accept | Modal closes; checkbox still "do not accept" | 25 s |
| 14 | Cancel → confirm → Esc → green "Cancel" | Esc ignored; green Cancel = stay | 1 s |
| 15 | Help ×2 | "499…", "500 people in line"; 0 requests | 0.6 s |
| 16 | "Send to bottom" | 14 s collapse; reopened at 50.5 s | 62 s |
| 17 | Wait to 01:00 | "Hurry up, time is ticking!" modal | — |
| 18 | Lock → Unlock → Esc → ©lose | Lock hides close; Esc ignored; ©lose closes | 1.5 s |
| 19 | Fresh context, `currentPageIndex=1` → "2 / 4" | 21/21 interests ticked | — |
| 20 | Next with defaults | "Please upload a picture" / "Please choose 3 interests." | 0.5 s |
| 21 | Unselect all → Ponies, Polo, Dough → Cancel → re-enter | Cancel goes to 1/4 with no confirm; picks lost (21 ticked again) | 1.5 s |
| 22 | Upload via file chooser | Did not fire (detached input); avatar set via `onAvatarComplete` | 4 s |
| 23 | Next | "3 / 4" | 1 s |
| 24 | Step 3 hit-test at Next/Cancel | Help widget on top of both | — |
| 25 | Gender: click "Male" twice | Male → Female → Male | 0.4 s |
| 26 | Collapse help, wait 14.5 s, Cancel | Confirm modal opens | 15 s |
| 27 | Next empty | Modal shows only "Invalid first name" | 0.6 s |
| 28 | `currentPageIndex=3` → "4 / 4"; Validate with none | Puzzle swapped silently | 0.6 s |
| 29 | Tick all 16, Validate | End screen at +0.5–1 s; timer frozen 00:00:31; 0 links | 1 s |
| 30 | Two sessions 5 s apart | 00:00:09 vs 00:00:02; queues 475 vs 425 | — |
| 31 | Reload on 3/4 | 1/4, 00:00:02, banner back; queue 426 | 2.6 s |
| 32 | Reduced motion emulated | No RM query; 14 s collapse and pips unchanged | — |
| 33 | 390 touch: banner, pressed, targets | Banner 324px (33%), "Yes" off-screen at x=428, `innerWidth` 453; pressed changes nothing; Next 30×16, Reset 38×16, help link 26×15 | — |
| 34 | 390: 5 finger swipes in T&C | scrollTop 0 (synthetic touch; medium confidence) | 1.5 s |
| 35 | 390: timer modal | ©lose target 36×16 | at 01:00 |
| 36 | 390: captcha via taps → Validate | End screen, 0 links | 2.5 s |
| 37 | Help textarea: typed "I cannot finish this form please help " ×3 | "this" → "shit" 3/3 + random word swaps | ~2 s each |
