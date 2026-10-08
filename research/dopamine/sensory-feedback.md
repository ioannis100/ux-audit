# Sensory feedback for rewarding micro-interactions: sound, haptics, motion, timing

Research for the ux-audit skill. It covers the sensory layer of reward: what a small success should look, feel and sound like, how fast, and how big. Brain science, casino mechanics and regulation are covered in sibling files (`neuroscience.md`, `casino-psychology.md`, `ethics-regulation.md`).

**Tags.** [PR] peer-reviewed · [S] platform or company stated · [O] observed (product behaviour, third-party observation) · [H] heuristic or our own derivation. "No published value" means we looked and found none. **2nd-hand** means the number comes from a summary of the paper, not the paper itself. Sources were gathered on 2026-10-08. Several ACM full texts were closed, so we read abstracts and summaries.

---

## Summary

1. **Timing is the base reward. Anything sensory that arrives late feels broken.** Touch-feedback latency targets are tactile 5–50 ms, audio 20–70 ms and visual 30–85 ms. Above about 70–100 ms (tactile/audio) or 100–150 ms (visual), perceived quality drops significantly [PR, Kaaresoja et al. 2014]. Keep the classic 0.1 s / 1 s / 10 s limits for system responses [S/PR, Nielsen; Miller 1968].
2. **Fire all channels on the same frame.** A sound may lead the picture by up to about 45 ms, or lag it by up to about 125 ms, before people notice [S, ITU-R BT.1359]. A haptic should land with the touch or the visual state change. Call `prepare()` before the event on iOS [S].
3. **Use platform haptics by meaning, not by feel.** iOS: `.success` / `.warning` / `.error` for outcomes, `.selection` for changing values, impact `light`…`heavy`/`soft`/`rigid` for collisions [S]. Android: `CONFIRM` / `REJECT` (API 30), `TOGGLE_ON/OFF`, `SEGMENT_TICK`, `GESTURE_THRESHOLD_ACTIVATE` (API 34) [S]. Never reuse a success pattern for failure [S].
4. **Haptics measurably help on touchscreens.** Tactile feedback brought touchscreen typing close to physical-keyboard performance [PR, Hoggan et al. 2008]. "Juicy" haptics raised enjoyment, appeal, immersion and meaning in a phone game [PR, Singhal & Schneider 2021]. Android's rule: buzzy haptics are worse than none, and a key-click should last 10–20 ms [S].
5. **Ship sound as an optional layer, never as the only channel.** On iOS the silent switch is expected to mute sound effects, so use the `.ambient` audio category [S]. 69% of US adults watch video with the sound off in public [H, 2nd-hand survey]. Apple: pair every success or error chime with a matching haptic and a visual [S].
6. **Sound inflates perceived reward, which is both its power and the ethics line.** Win sounds raised arousal and made 72.5% of players prefer the sound-on machine. They also made players over-count wins: 36 estimated against 28 real, compared with 33 without sound [PR, Dixon et al. 2014]. Never put a win sound on a net loss, a spend, or a bet.
7. **There is an inverted U for juiciness.** In a study with N = 3018, both no juiciness and extreme juiciness lowered play time, experience, motivation and performance compared with medium or high [PR, Kao 2020]. Embellishment raises appeal but helps competence only sometimes [PR, Hicks et al. 2019]. Players rated a juicy game higher but did worse in it [PR poster, Juul & Begy 2016].
8. **Scale the reward to the achievement, and to how often it happens.** Frequent events get the subtlest feedback, and important ones get stronger feedback [S, Android]. Avoid motion on frequent interactions, and reserve confirmation for important tasks [S, Apple HIG]. Habituation is the biological reason the 100th repetition feels like nothing [PR, Rankin et al. 2009].
9. **Reduced motion is a swap, not a removal.** Under Reduce Motion, replace x/y/z movement with fades, tighten springs (no bounce), and keep haptics, sound and the end state [S, Apple]. WCAG 2.3.3 (AAA) requires that interaction-triggered motion can be turned off. Use `prefers-reduced-motion` [S]. No more than 3 flashes per second (WCAG 2.3.1, A).
10. **Web has no haptics on iPhone.** The Vibration API has never shipped in any Safari, Firefox removed it in v129, and Chrome and Samsung on Android support it [S, caniuse]. The only iOS web workaround is the non-standard `<input type="checkbox" switch>` haptic, which is fragile [O]. Money and haptics: *lower*-intensity vibration reduced willingness to spend compared with no vibration [PR, Manshad & Brannon 2021]. (`teardowns/fintech.md` says "stronger"; that line should be corrected.)

---

## 1. Sound

### 1.1 Evidence that UI sound helps
- **Menus:** sound-enhanced menus cut subjective effort and error-recovery time significantly, and users corrected more slip-off errors [PR, Brewster & Crease 1999, *BIT* 18(3)]. The paper does not show fewer errors made.
- **Modality limits:** in touchscreen typing, audio feedback stopped helping at ambient noise ≥94 dB. Tactile feedback failed at vibration of 9.18 "g/s" (unit as printed) [PR, Hoggan et al. CHI 2009, abstract]. Implication: the haptic must carry the meaning when audio is masked, and the reverse when the user is moving.
- **Latency and perceived quality:** audio feedback is perceived as simultaneous with a press at 20–70 ms. Quality drops significantly between 70 and 100 ms [PR, Kaaresoja et al. 2014].
- **Earcons** are short non-speech sounds tied to an action or state. They need learning, so keep a few that are easy to tell apart and use each one consistently [S, Google conversation design]. Material calls them earcons and splits them into skeuomorphic sounds (e.g., a lock) and abstract ones [S, Material 2].
- No published peer-reviewed value was found for how much sound raises *perceived responsiveness* or *satisfaction* on its own in modern mobile apps.

### 1.2 Platform guidance
- **Apple HIG, Playing audio [S].** In silent mode people expect non-essential sound to stop, including sound effects and audible feedback. Pick the audio category to match:
  - `ambient`: responds to the silence switch and mixes with other audio. This is right for UI sound effects.
  - `soloAmbient`: also silenced, but stops other audio. Don't use it for UI effects.
  - `playback`: ignores the switch. Use it only for content the user started.
  - The system volume always governs output, so adjust relative levels, never the overall volume.
- **Apple HIG, Accessibility [S].** Pair success chimes and error sounds with matching haptics for people who can't hear them or have sound off. Add visual cues to audio cues. Avoid autoplay without controls.
- **Material 2 sound guidance [S]** (archived; Material 3 has no sound section that we found):
  - *Silence:* sound usually doesn't suit UIs that need privacy, users who asked not to be interrupted, or **actions performed frequently**.
  - *Decorative sound:* use it sparingly, for moments with high emotional resonance, and limit its frequency to avoid fatigue.
  - *Hero sounds:* celebrate a significant positive action, welcome, or confirm a key moment. They are infrequent and applied consistently.
  - *Hierarchy:* 1 brand → 2 hero/celebration → 3 alerts → 4 primary UX → 5 secondary UX.
  - *Motifs:* upward motion signals start or positivity, downward signals ending, repetition signals waiting.
  - *Attributes:* tonal sounds suit emotion and state changes; atonal sounds suit motion and a "haptic" feel. Use soft, muted timbres for low-priority sounds. A sharper attack feels more energetic, and a short decay feels small and fast.
  - *Repetition:* repeated sounds (typing, swiping) should vary slightly in timbre. Related states (on/off) should use mirrored motifs in the same or a complementary key.
  - *Files:* trim leading and trailing silence, because silence adds latency.
  - **Material gives no numeric duration, frequency or loudness values.**
- **Android:** `View.playSoundEffect()` plays only if the user has system sound effects on and `isSoundEffectsEnabled()` is true [S]. For custom UI sounds use `AudioAttributes.USAGE_ASSISTANCE_SONIFICATION`, the usage defined for UI sounds [S]. Whether that usage is muted by the ringer mode is not stated in the reference. Check `AudioManager.getRingerMode()` and play only in normal mode [H].
- **Web:**
  - Chrome starts an `AudioContext` created before a user gesture in a suspended state. Resume it inside the first tap [S, Chrome autoplay].
  - Safari 16.4 added "a subset of" the Audio Session API [S, WebKit]. The spec defines `navigator.audioSession.type = 'ambient'` (mixable) [S, W3C draft]. Whether `ambient` honours the iPhone silent switch is not stated anywhere we found, so test on a device.
  - WCAG 1.4.2 (A): audio that autoplays for more than 3 s needs a pause/stop control [S].

### 1.3 Why most apps ship silent
- The user expects silence: the silent switch mutes non-essential sound [S, Apple]. Material says frequent actions and private contexts shouldn't make sound [S].
- Usage data:
  - 69% of US adults (18–54, N = 5,616, April 2019) watch video with the sound off in public, and 25% even in private [H, 2nd-hand: Verizon Media/Publicis via Streaming Media].
  - In an undated YouGov poll, 27% always or usually keep the phone on silent or vibrate [H, 2nd-hand via Audacy].
- Design consequence [H]: a reward must work fully when muted. Sound is a bonus layer, which is why Duolingo and others offer a sound-effects toggle in settings [O, third-party guides].

### 1.4 Duolingo's sound (what is and isn't known)
- **No first-party Duolingo post or interview on its feedback-sound design was found.** No official durations, notes or loudness are published.
- [O, unofficial blog] The correct-answer cue is described as two sixteenth notes rising F#→A# (a major third), and the wrong-answer cue as F#→C (a tritone). This fits Material's "upward = positive" motif guidance, but treat the notes as a third-party transcription.
- [S] Duolingo animates its characters with **Rive** state machines: one runtime file, with mouth states running in parallel with body states.

### 1.5 Ethics boundary: sound inflates reward
- **Dixon et al. 2014** [PR]: 96 slot players, two 200-spin sessions each with sound on and off.
  - Sound raised skin-conductance responses (p = .035) and self-rated arousal (p = .039).
  - 72.5% of players preferred the sound-on session.
  - Players estimated 33 wins without sound and 36 with sound, against 28 actual (p = .020).
  - Celebratory sounds on losses disguised as wins (LDWs) were tied to the overestimation.
- Rule [H]: in an app, a celebratory sound may only follow a real, net-positive outcome for the user. Never put one on spending, a deposit, a bet, or a "partial win". See `casino-psychology.md` for the regulatory ban on celebrating returns at or below the stake.

---

## 2. Haptics

### 2.1 iOS (Apple HIG "Playing haptics" + UIKit/SwiftUI) [S]
| Generator / SwiftUI | Documented meaning |
|---|---|
| `UINotificationFeedbackGenerator` `.success` / `.warning` / `.error` | the outcome of a task: completed / warning / error |
| `UIImpactFeedbackGenerator` `.light` `.medium` `.heavy` | collision of small / medium / large UI objects |
| `UIImpactFeedbackGenerator` `.rigid` `.soft` | collision of hard / flexible objects |
| `UISelectionFeedbackGenerator` | a UI element's value is changing |
| SwiftUI `.sensoryFeedback(_:trigger:)` (iOS 17+) | adds `.increase`, `.decrease`, `.start`, `.stop`, `.alignment`, `.levelChange`, `.pathComplete`, `.impact(weight:intensity:)` |
| Core Haptics `CHHapticEngine` | custom transient and continuous events with intensity and sharpness, plus synced audio |

HIG rules [S]:
- Use patterns only for their documented meaning.
- Be consistent, so the haptic and its cause are clearly linked.
- Complement the visual and the sound, and match the haptic's intensity and sharpness to the animation's.
- Avoid overuse. The best haptic is often one people don't notice but would miss.
- Prefer short haptics for discrete events.
- Make haptics optional.
- Don't disturb camera, gyroscope or microphone use.

Latency [S]: call `prepare()` *before* the event. Calling it right before triggering doesn't help. The Taptic Engine idles again after a few seconds. Third-party documentation says generator haptics fire only in the foreground and with System Haptics on [O]. Apple's current docs don't state this.

### 2.2 Android [S]
| Constant (`HapticFeedbackConstants`, via `View.performHapticFeedback`) | API | Use |
|---|---|---|
| `CONFIRM` / `REJECT` | 30 | success / failure of a user interaction (Android describes REJECT as stronger) |
| `GESTURE_START` / `GESTURE_END` | 30 | gesture begins / ends |
| `TOGGLE_ON` / `TOGGLE_OFF` | 34 | switch on / off |
| `SEGMENT_TICK` / `SEGMENT_FREQUENT_TICK` | 34 | discrete choices; the frequent variant is "very soft" |
| `GESTURE_THRESHOLD_ACTIVATE` / `_DEACTIVATE` | 34 | pull-to-refresh-style threshold crossed or uncrossed |
| `DRAG_START` | 34 | item picked up |
| `CLOCK_TICK` (21), `KEYBOARD_TAP` (8), `VIRTUAL_KEY` (5), `LONG_PRESS` (3), `CONTEXT_CLICK` (23), `TEXT_HANDLE_MOVE` (27) | — | legacy and specific uses |

- Compose: `HapticFeedbackType.Confirm`, `Reject`, `ToggleOn`, `SegmentTick` and others, added in Compose UI 1.8.0 [S].
- Custom effects: `VibrationEffect.Composition` primitives such as `PRIMITIVE_CLICK`, `TICK`, `QUICK_RISE`, `SLOW_RISE` and `QUICK_FALL` (API 30), and `THUD`, `SPIN` and `LOW_TICK` (API 31). Check support with `areAllPrimitivesSupported()` [S].
- `performHapticFeedback` needs no `VIBRATE` permission, respects the user's touch-feedback setting, and falls back automatically on weaker hardware [S].

Android design principles [S]:
- "Less is more".
- *Clear* haptics are crisp and discrete. *Rich* haptics need a fallback. *Buzzy* haptics have a ringing tail: if the choice is buzzy or nothing, choose nothing.
- A good key-click is **10–20 ms**. A 20 ms drive can ring for another **20–50 ms**, so avoid `createOneShot` and `vibrate(long)` for feedback.
- Match strength to importance and frequency: frequent events very subtle, important events stronger. Strength may build as the user nears a target.
- Co-design haptics with visuals and audio, because out-of-sync haptics feel like broken hardware.

### 2.3 Evidence
- **Hoggan, Brewster & Johnston, CHI 2008** [PR]: adding tactile feedback to a touchscreen keyboard significantly improved finger text entry, close to a physical keyboard. Better actuators improved it further. The vibration lengths used were 30 ms for key confirmation and 500 ms for errors [2nd-hand, review summary].
- **Brewster, Chohan & Brown, CHI 2007** [PR]: tactile feedback on a PDA keyboard helped in the lab. On a moving underground train only the number of errors corrected improved. Field benefits are smaller than lab benefits.
- **Singhal & Schneider, CHI 2021** [PR]: haptic embellishments on phones raised enjoyment, aesthetic appeal, immersion and meaning in a game.
- **Commerce:**
  - Haptic feedback in a retailer's app changed purchase outcomes, moderated by individual need for touch. The authors suggest letting users switch it off [PR, Racat & Plotkina 2023, *IJEC*].
  - Haptic-touch ads improved the ad experience, which raised purchase intention (n = 303 vs 359) [PR, Mulcahy & Riedel 2020, *JRCS*].
  - In payments, *lower*-intensity vibration reduced willingness to spend compared with a no-vibration control [PR, Manshad & Brannon 2021, *J. Business Research*].
- **Battery:** in a worst case over 24 h, haptics used 0.95–4.11% of battery capacity [H, vendor study by Immersion]. No independent peer-reviewed mW figure for phones was found.
- **Annoyance:** no published threshold (e.g., "max N haptics per minute"). The only guidance is qualitative: avoid overuse and test with users [S, Apple]; less is more [S, Android].

### 2.4 Web
- **Vibration API (`navigator.vibrate`)** [S, caniuse/MDN]:
  - Safari iOS and macOS: never supported.
  - Firefox: removed from desktop in v129, and not supported on Android.
  - Chrome Android and Samsung Internet: supported.
  - Unsupported devices ignore the call. Treat it as progressive enhancement only.
- **iOS Safari workaround** [O]: toggling a non-standard `<input type="checkbox" switch>` plays a system haptic. Libraries such as `ios-haptics` click a hidden one. The version is disputed: a WebKit bug says Safari 18.0, and a library says 17.4. WebKit bug 285120 (resolved) restricts it to real user activation. It is fragile and undocumented, so never make it load-bearing.
- **Suggested web pulse** [H, derived from Android's 10–20 ms key-click guidance]: `navigator.vibrate(15)` for confirm. For reject, use two short pulses (e.g., `[15, 60, 15]`) rather than a long buzz. No standard defines these values.

---

## 3. Motion as reward

### 3.1 Evidence on "juicy" feedback
- **Hicks et al., CHI PLAY 2019** [PR]: two studies (n = 40, n = 32, including Quake 3). Visual embellishments raised visual appeal in every game. They affected competence only in specific circumstances.
- **Juul & Begy, FDG/DiGRA 2016** [PR poster]: the same game with minimal or juicy feedback. Players rated the juicy version higher but **performed worse** in it.
- **Kao 2020, *Entertainment Computing* 34** [PR]: N = 3018, an action RPG at four levels (none, medium, high, extreme). Both *none* and *extreme* significantly lowered play time, player experience, intrinsic motivation and performance compared with medium and high.
- Takeaway [H]: aim for medium. Embellishment must not cover the information the user needs next. Celebration should never stand between the user and the next action. Apple: let people cancel motion, and don't make them wait for an animation, especially one they will see repeatedly [S].

### 3.2 Usable motion values
| Thing | Value | Tag |
|---|---|---|
| Material 3 durations | short1–4 = 50/100/150/200 ms; medium1–4 = 250/300/350/400; long1–4 = 450/500/550/600; extra-long1–4 = 700/800/900/1000 | [S] |
| M3 easing | emphasized / standard `cubic-bezier(0.2,0,0,1)`; emphasized-decelerate `(0.05,0.7,0.1,1)`; emphasized-accelerate `(0.3,0,0.8,0.15)` | [S] |
| M3 springs, standard scheme | default spatial damping 0.9 / stiffness 700; fast spatial 0.9 / 1400; slow spatial 0.9 / 300; effects damping 1.0 / stiffness 1600 | [S] |
| M3 springs, expressive scheme | default spatial 0.8 / 380; fast spatial 0.6 / 800; slow spatial 0.8 / 200 (bouncier, for reward moments) | [S] |
| SwiftUI springs | `.spring`, `.snappy` and `.bouncy` default `duration: 0.5`; bounce range −1…1; Apple cautions that bounce above about 0.4 looks exaggerated for UI | [S] |
| SwiftUI preset bounce | exact base bounce of `.snappy` and `.bouncy` is not documented in the API reference (commonly quoted as about 0.15 and 0.3) | [H] |
| Number roll | `.contentTransition(.numericText(value:))` iOS 17 (`countsDown:` variant iOS 16); Compose `AnimatedContent`; web: rAF tween. No published duration | [S]/[H] |
| UI animation length | most UI animation 100–400 ms; simple feedback about 100 ms; 500 ms starts to drag | [H, NN/g] |
| Confetti (canvas-confetti defaults) | particleCount 50, spread 45°, startVelocity 45, decay 0.9, gravity 1, ticks 200; `disableForReducedMotion` defaults to **false**, so set it to true | [S, library] |
| Checkmark draw | SVG `stroke-dashoffset` over about 300–400 ms (no published Apple Pay value) | [H] |
| Rive / Lottie | Duolingo uses Rive state machines [S]; Airbnb's Lottie renders After Effects JSON [S]. No performance thresholds were found | [S] |

### 3.3 When celebration helps vs annoys
- **Helps:** a rare, earned, final outcome, such as finishing a lesson, a streak milestone, or a goal the user set [H, from Material hero sounds and Apple's "significant action"].
- **Annoys or harms:**
  - frequent interactions [S, Apple and Material];
  - anything the user must wait through [S, Apple];
  - money going out. Robinhood removed its confetti in March 2021 under gamification scrutiny [S/H, CNBC; see `teardowns/fintech.md`].
- **Flash safety:** never more than 3 flashes in any 1 s period (WCAG 2.3.1, Level A) [S]. Rapid colour-flash confetti risks this. Apple also warns that fast-moving or blinking effects can cause dizziness or seizures [S].

### 3.4 Reduced motion
- **WCAG 2.3.3 Animation from Interactions (AAA)** [S]: interaction-triggered motion must be possible to turn off, unless it is essential. Techniques: CSS `@media (prefers-reduced-motion: reduce)` (C39), the JS `matchMedia` query (SCR40), or an in-app setting.
- **Apple, under Reduce Motion** [S]: tighten springs to reduce bounce, track gestures directly, and replace x/y/z transitions with fades. Read it from `UIAccessibility.isReduceMotionEnabled` or SwiftUI `@Environment(\.accessibilityReduceMotion)`.
- **Android:** `ValueAnimator.areAnimatorsEnabled()` (API 26) returns false when the user sets the animator duration scale to 0 or Battery Saver disables animations [S].
- **The reduced version keeps the reward** [H]: the end state (check, filled bar, new number), the haptic and the sound stay. Movement becomes an opacity crossfade of ≤150 ms (M3 short3). Confetti becomes a static badge or glyph that fades in.

---

## 4. Timing thresholds

### 4.1 Response limits
- **0.1 s** feels instant. **1 s** keeps the flow of thought. **10 s** is the attention limit, beyond which a progress indicator is needed [S/H, Nielsen, citing Miller 1968 and Card, Robertson & Mackinlay 1991 [PR]].
- In the Model Human Processor, the perceptual processor cycle is about **100 ms (range 50–200)** [PR, Card, Moran & Newell 1983, via Wikipedia summary]. Events inside one cycle tend to fuse into one percept, which is why staggered "multi-beat" rewards need gaps of more than 100 ms to read as separate beats [H].

### 4.2 Touch latency perception
| Finding | Value | Tag |
|---|---|---|
| Commercial touchscreen latency is perceptible | 50–200 ms typical | [PR, Ng et al. UIST 2012, via arXiv 2408.02525] |
| Detection in dragging (direct touch) | as low as about 6 ms | [PR, Ng et al. 2012, **2nd-hand via patent**] |
| Dragging performance degrades | above about 25 ms | [PR, Jota et al. CHI 2013, via arXiv summary] |
| Tapping latency not perceived | below about 24 ms | [PR, Jota et al. 2013, **2nd-hand via patent**] |
| JND, direct touch | tap 69 ms, drag 11 ms | [PR, Deber et al. CHI 2015, 2nd-hand via arXiv] |
| JND, indirect (touchpad) | tap 96 ms, drag 55 ms | [PR, Deber et al. 2015, 2nd-hand] |
| A latency *improvement* that is noticeable | as small as 8.3 ms | [PR, Deber et al. 2015, 2nd-hand] |

### 4.3 Feedback simultaneity on a virtual button (the key table for specs)
**Kaaresoja, Brewster & Lantz 2014, *ACM TAP* 11(2)** [PR]. Touch-to-feedback delay was varied from 0 to 300 ms.

| Modality | Point of subjective simultaneity | Recommended latency (75% threshold) | Quality drops significantly |
|---|---|---|---|
| Tactile | 5 ms | **5–50 ms** | between 70 and 100 ms |
| Audio | 19 ms | **20–70 ms** | between 70 and 100 ms |
| Visual | 32 ms | **30–85 ms** | between 100 and 150 ms |

At 300 ms, every modality was rated worse than at any other delay.

### 4.4 Cross-modal synchrony
- **Audio–visual** [S, ITU-R BT.1359]:
  - Detectability: sound early by +45 ms, or late by −125 ms.
  - Acceptability: +90 / −185 ms.
  - People are more sensitive to sound arriving *early*.
- **Visual–haptic, fingertip:** in mid-air and tabletop setups, a 50% detection threshold of about 100–110 ms [PR, Nagano et al. 2024 and work cited there]. We found no touchscreen-specific study of the full text.
- **Audio–tactile, virtual buttons:** tolerance of about 179 ms with audio first and about 451 ms with haptic first [PR, 2023 Zenodo-deposited study, **search-summary only**].
- **Practical rule** [H]: trigger haptic, sound and visual state change in the same frame or event handler. If audio has an output buffer delay, start the sound first by up to about 20–40 ms, well inside the +45 ms detectability limit. Never let the haptic trail the visual by more than about 50 ms.

---

## 5. Intensity scaling and the 100th-use problem

### 5.1 What the platforms say [S]
- **Android:** match strength to importance and frequency. Very frequent events (scroll, text handle) are very subtle, and important events (submit, refresh) are stronger. Feedback may build up toward a target.
- **Apple:** match haptic intensity and sharpness to the animation. Avoid overuse. Reserve completion confirmation for important tasks, because people expect success and mainly need to know about failure. Avoid motion on frequent interactions.
- **Material:** sound hierarchy runs brand > hero > alerts > primary UX > secondary UX. Hero sounds are *infrequent*. Decorative sound has a limited frequency, and repeated sounds vary slightly.

### 5.2 Why repetition kills reward
- Habituation is the decline in response to a repeated stimulus. A novel stimulus can restore the response (dishabituation), and the response recovers after a pause (spontaneous recovery) [PR, Rankin et al. 2009, updating Thompson & Spencer 1966]. Kao's finding that extreme juiciness hurts experience is consistent with this [PR].
- **No published value** exists for how many repetitions it takes before a micro-celebration stops registering or starts to annoy. Measure it in-product: tap-through speed on celebration screens, and whether users turn the sound or haptics toggle off [H].

### 5.3 Escalation ladder (our synthesis) [H, built from the [S] rules above]
| Tier | When | Visual | Haptic | Sound |
|---|---|---|---|---|
| 0 Acknowledge | every tap | press state ≤100 ms | none, or system default on controls | none |
| 1 Confirm | routine success (saved, item added) | check or colour change 150–250 ms | iOS `.success` or impact `.light`; Android `CONFIRM` | none by default |
| 2 Reward | earned step (correct answer, set done) | fill or spring 300–500 ms + small accent | `.success` / `CONFIRM` | short rising 2-note earcon (optional) |
| 3 Celebrate | session or goal complete | full-screen moment ≤1–2 s, skippable | `.success` + optional Core Haptics rise | hero sound |
| 4 Milestone | rare (streak 7/30/100, first-ever) | tier 3 + unique art or copy | custom pattern used *only* here | unique hero sound |

- **Variation without randomness:** rotate copy and art within a tier, and keep the haptic and sound meaning fixed (Apple's consistency rule). Never make the size of a reward random when it is tied to money (see `casino-psychology.md`).

---

## Spec table

Durations marked [H] are our suggested starting values, picked from platform tokens. They are not measurements of any named app.

| Reward type | Visual / motion spec | Haptic iOS | Haptic Android | Sound | Web fallback | Reduced-motion version | Tags |
|---|---|---|---|---|---|---|---|
| Tap acknowledge | pressed state shown ≤30–85 ms after touch; scale/opacity 100 ms (M3 short2), `cubic-bezier(0.2,0,0,1)` | none (system controls add their own) | none, or `VIRTUAL_KEY` | none | CSS `:active`; no vibrate | same (opacity only) | [PR] Kaaresoja; [S] M3; [H] |
| Toggle / selection change | thumb slide 150–200 ms (short3–4) | `UISelectionFeedbackGenerator` / `.sensoryFeedback(.selection)` | `TOGGLE_ON` / `TOGGLE_OFF` (API 34); `SEGMENT_TICK` for steps | none | `<input type=checkbox switch>` gives the native iOS haptic [O]; `vibrate(10)` on Android Chrome | instant state change + fade | [S] Apple, Android; [O] |
| Correct answer / step success | colour fill + check, 200–300 ms; spring M3 expressive fast spatial (0.6/800) or SwiftUI `.snappy` | `.success` (`UINotificationFeedbackGenerator`) | `CONFIRM` (API 30) / Compose `Confirm` | optional short rising 2-note earcon, `.ambient` category; Duolingo's is reported as a rising major third [O] | `vibrate(15)` [H]; Web Audio after first gesture | colour + check crossfade ≤150 ms; keep haptic and sound | [S]; [O]; [H] |
| Error / reject | no punishment animation; inline message; optional horizontal shake, no published value, keep ≤300 ms [H] | `.error` | `REJECT` (API 30) | optional soft falling or dissonant 2-note cue; never louder than success | `vibrate([15,60,15])` [H] | no shake; colour + icon + text | [S]; [H] |
| Task / payment success (Apple Pay-style) | circle → checkmark stroke draw about 300–400 ms, then hold; calm, no confetti | `.success` | `CONFIRM` | short confirm chime if any (Apple Pay plays one [O]) | SVG `stroke-dashoffset`; `vibrate(15)` | static check fades in ≤150 ms | [S] HIG Feedback; [O]; [H] |
| Progress fill (bar / ring) | width or arc via spring (SwiftUI `.smooth` 0.5 s, or M3 standard default spatial 0.9/700); never linear | per discrete step `.selection` (sparingly); at completion `.success` | `SEGMENT_TICK` per step; `CONFIRM` at completion | none per step; tier-2 earcon at completion | CSS transition `width` 300–500 ms `cubic-bezier(0.2,0,0,1)` | jump to the new value + brief highlight | [S]; [H] |
| Value change / balance roll | digit roll: `.contentTransition(.numericText(value:))` (iOS 17) / Compose `AnimatedContent`; tween 300–600 ms ease-out (M3 medium–long), no published value | none, or `.impact(.light)` at the end | none, or `CONFIRM` at the end | none | rAF tween + `aria-live="polite"` with the final value only | final number shown immediately | [S] API; [H] duration |
| Session / goal complete | full-screen moment ≤1–2 s, skippable; confetti (canvas-confetti defaults 50 particles, spread 45, velocity 45, decay 0.9, gravity 1) | `.success`; optional Core Haptics rising pattern | `CONFIRM`, or Composition `QUICK_RISE`→`CLICK` (API 30, check `areAllPrimitivesSupported`) | hero sound, optional, respects silent mode | canvas-confetti with `disableForReducedMotion: true` | static badge/illustration fade; keep haptic and sound | [S]; [PR] Kao; [H] |
| Rare milestone (streak 7/30/100, first-ever) | tier above + unique art; ≤3 flashes per second | a custom Core Haptics pattern reserved for milestones only | custom Composition reserved for milestones | unique hero sound | as above | as above | [S] WCAG 2.3.1, Apple consistency; [H] |
| Never | celebration on spend, deposit, bet or a net loss | — | — | no win sound on losses (Dixon) | — | — | [PR] Dixon 2014; [S/H] Robinhood |

---

## Sources

**Platform and standards [S]**
- Apple HIG, Playing haptics: https://developer.apple.com/design/human-interface-guidelines/playing-haptics
- Apple HIG, Playing audio: https://developer.apple.com/design/human-interface-guidelines/playing-audio
- Apple HIG, Motion: https://developer.apple.com/design/human-interface-guidelines/motion
- Apple HIG, Feedback: https://developer.apple.com/design/human-interface-guidelines/feedback
- Apple HIG, Accessibility: https://developer.apple.com/design/human-interface-guidelines/accessibility
- UIFeedbackGenerator `prepare()`: https://developer.apple.com/documentation/uikit/uifeedbackgenerator/prepare()
- SwiftUI SensoryFeedback: https://developer.apple.com/documentation/swiftui/sensoryfeedback
- SwiftUI spring: https://developer.apple.com/documentation/swiftui/animation/spring(duration:bounce:blendduration:)
- WWDC23 "Animate with springs" (bounce caution above about 0.4): https://developer.apple.com/videos/play/wwdc2023/10158/
- SwiftUI numericText: https://developer.apple.com/documentation/swiftui/contenttransition/numerictext(value:)
- Core Haptics: https://developer.apple.com/documentation/corehaptics
- Android haptics design principles: https://developer.android.com/develop/ui/views/haptics/haptics-principles
- Android add haptic feedback: https://developer.android.com/develop/ui/views/haptics/haptic-feedback
- HapticFeedbackConstants: https://developer.android.com/reference/android/view/HapticFeedbackConstants
- Compose HapticFeedbackType: https://developer.android.com/reference/kotlin/androidx/compose/ui/hapticfeedback/HapticFeedbackType
- VibrationEffect.Composition: https://developer.android.com/reference/android/os/VibrationEffect.Composition
- View.playSoundEffect: https://developer.android.com/reference/android/view/View#playSoundEffect(int)
- AudioAttributes: https://developer.android.com/reference/android/media/AudioAttributes
- ValueAnimator.areAnimatorsEnabled: https://developer.android.com/reference/android/animation/ValueAnimator#areAnimatorsEnabled()
- Material 3 motion tokens: https://github.com/material-components/material-web/blob/main/tokens/versions/v0_192/_md-sys-motion.scss
- M3 spring tokens: https://github.com/androidx/androidx/blob/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ExpressiveMotionTokens.kt and `StandardMotionTokens.kt` (same folder)
- Material 2 sound: https://m2.material.io/design/sound/applying-sound-to-ui.html, …/sound-attributes.html, …/sound-choreography.html
- Google earcons: https://developers.google.com/assistant/conversation-design/earcons
- caniuse Vibration: https://caniuse.com/vibration · MDN Vibration API: https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API
- WebKit bug 285120 (switch haptic and user activation): https://bugs.webkit.org/show_bug.cgi?id=285120
- WebKit Safari 16.4 features: https://webkit.org/blog/13966/webkit-features-in-safari-16-4/ · Audio Session draft: https://w3c.github.io/audio-session/
- Chrome autoplay policy: https://developer.chrome.com/blog/autoplay
- WCAG 2.3.3: https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html · 2.3.1: https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html · 1.4.2: https://www.w3.org/WAI/WCAG22/Understanding/audio-control.html
- MDN prefers-reduced-motion: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
- ITU-R BT.1359: https://www.itu.int/rec/R-REC-BT.1359/
- canvas-confetti README: https://github.com/catdad/canvas-confetti · Lottie: https://github.com/airbnb/lottie-ios
- Duolingo, character visemes with Rive: https://blog.duolingo.com/world-character-visemes

**Peer-reviewed [PR]**
- Dixon et al. 2014, *J Gambling Studies* 30(4): https://pmc.ncbi.nlm.nih.gov/articles/PMC4225056/
- Hoggan, Brewster & Johnston 2008, CHI: https://doi.org/10.1145/1357054.1357300
- Hoggan et al. 2009, "Audio or tactile feedback: which modality when?", CHI: https://doi.org/10.1145/1518701.1519045
- Brewster, Chohan & Brown 2007, CHI: https://course.khoury.northeastern.edu/csg170/ssl/brewster07-pda-tactilefeedback.pdf
- Brewster & Crease 1999, *BIT*: https://eprints.gla.ac.uk/3238
- Kaaresoja, Brewster & Lantz 2014, *ACM TAP*: https://eprints.gla.ac.uk/104653 (DOI 10.1145/2611387)
- Ng et al. 2012, UIST: https://doi.org/10.1145/2380116.2380174 · Jota et al. 2013, CHI: https://doi.org/10.1145/2470654.2481317 · Deber et al. 2015, CHI: https://doi.org/10.1145/2702123.2702300
- Summary of the three above: https://arxiv.org/html/2408.02525 · patent summary (Ng 6 ms, Jota 24 ms): https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/10592050
- Nagano et al. 2024 (mid-air visual–haptic delay): https://arxiv.org/pdf/2408.06552 · audio–tactile virtual buttons 2023: https://zenodo.org/record/7554917
- Hicks et al. 2019, CHI PLAY: https://doi.org/10.1145/3311350.3347171
- Kao 2020, *Entertainment Computing*: https://doi.org/10.1016/j.entcom.2020.100359
- Juul & Begy 2016, FDG/DiGRA: https://adk.elsevierpure.com/en/publications/good-feedback-for-bad-players-a-preliminary-study-of-juicy-interf
- Singhal & Schneider 2021, CHI: https://doi.org/10.1145/3411764.3445463
- Rankin et al. 2009, *Neurobiol. Learn. Mem.*: https://doi.org/10.1016/j.nlm.2008.09.012
- Manshad & Brannon 2021, *J. Business Research*: https://doi.org/10.1016/j.jbusres.2020.08.049
- Racat & Plotkina 2023, *IJEC*: https://www.ijec-web.org/?p=3367 · Mulcahy & Riedel 2020, *JRCS*: https://ideas.repec.org/a/eee/joreco/v54y2020ics0969698918302261.html
- Miller 1968; Card, Robertson & Mackinlay 1991 (via NN/g): https://www.nngroup.com/articles/response-times-3-important-limits/ · Card, Moran & Newell 1983 (via): https://en.wikipedia.org/wiki/Human_processor_model

**Heuristic / observed / secondary [H] [O]**
- NN/g animation duration: https://www.nngroup.com/articles/animation-duration/
- Verizon Media/Publicis 2019 via Streaming Media: https://www.streamingmedia.com/Articles/News/Online-Video-News/80-of-Video-Caption-Users-Arent-Hearing-Impaired-Finds-Verizon-131860.aspx
- YouGov poll via Audacy: https://www.audacy.com/y98/latest/putting-your-phone-on-mute
- Immersion battery study (vendor): https://www.immersion.com/wp-content/uploads/2020/04/haptic-technologies-consume-minimal-power-in-smart-phones.pdf
- Duolingo sound notes (unofficial blog): https://www.losdoggies.com/archives/8816 · https://www.losdoggies.com/archives/8842
- Duolingo sound-effects toggle (third-party guide): https://duolingoguides.com/how-to-turn-off-sound-effects-on-duolingo/
- iOS web haptics workaround: https://github.com/ionic-team/ionic-framework/issues/29942 · https://npmjs.com/package/ios-haptics
- Robinhood confetti removal: https://www.cnbc.com/2021/03/31/robinhood-gets-rid-of-confetti-feature-amid-scrutiny-over-gamification.html

**Gaps.** No first-party spec exists for Duolingo, Revolut or Apple Pay durations, haptics or sound. Getting them needs a 120 fps device recording plus audio capture. Our web-search budget ran out before we could confirm the Safari `switch`-haptic version and whether the `ambient` audio session honours the silent switch, so both still need checking.
