# Duolingo web: summary (calibration run, 2026-10-08)

## Do these first
1. **Accessibility basics** (P1 × 6, all S–M): visible `:focus-visible` ring; a `role="status"` live
   region for right/wrong; readable XP and streak; dark-theme button labels (#131f24) in light theme;
   allow pinch-zoom; name the quit X, back arrow and hearts.
2. **Cut the first reward chain from 9 taps to 4 beats**, skippable, showing the 6 words learned (M-02).
3. **Day-1 streak: say "your 2 free Streak Freezes have you covered"** instead of "Watch out!" (M-03).
4. **Honest quit sheet:** neutral owl, two equal buttons (M-05).
5. **Gems name what they buy** ("505 = 2 Streak Freezes · Equip") with a rolling header count (Revolut).

## Verdict
In-lesson feel is benchmark-grade (colour 27–29 ms, sound 14–15 ms after CHECK, 0 blank frames in 73
transitions, 25–30 rewarded beats per perfect lesson, no upsells). The losses are around the lesson:
11 onboarding screens, a 9-tap first chain, a warning streak screen, a crying quit sheet, and six real
accessibility failures.

## Scorecard
**Overall 7.1/10** · Clarity 7 · Feel 8 · Pull 8 · Trust 7 · Craft 8 · health: Usability 7 ·
Accessibility 4 · Performance 6 · Content 7. Heuristic expert scores, not measured usability.

## Red lines
Pass: R2, R5, R6 (guest web), R9, R11 (guest web). Two P2s under R12 (quit-sheet tears; inaccurate
streak warning), not red. No paid randomness, no celebrated spending, no hidden money.

## Calibration notes for the skill
**Did the skill score a world-class app high without inventing problems?** Yes.
- Overall 7.1 against the anchors' "most real products score 3–5"; Feel, Pull and Craft 8, each with
  measured evidence; Accessibility 4 from six P1s that all survived 5 fresh verification runs.
- 0 P0. Verifiers made 0 outright rejections of whole findings, but caught: 1 false sub-claim (progress
  bar), 2 measurement errors (match-pair latency, combo sound), 1 wrong premise (freezes), 1 misapplied
  red line (R10), 1 severity over-call (crying owl P1 → P2) and 3 wrong fix values.

**Skill fixes this run exposed:**
1. The rig inherits macOS dark mode: the contract must force `prefers-color-scheme` and test both themes.
2. `lib/motion-analysis.mjs` detects change on grayscale luma only, so light-green-on-white reads as no
   change (the rejected 90 ms): compare colour, not brightness.
3. Sound attribution: a sound counts for an action only if it fires before the next action (the combo
   "sound" was the next prompt).
4. R12 severity rule: an emotional appeal on an exit is P2 when the stated loss is true and proportionate,
   the decline label is neutral and the exit is ≤ 2 taps; P1 when the loss is false or inflated, the
   decline shames, or it stands in front of money, cancelling or data.
5. R10 wording: forced gamification means the core service is gated behind a game; a missing skip on a
   pledge after value is a usability P2.
6. Accessibility: read the full tree (puppeteer `accessibility.snapshot({interestingOnly:false})`) before
   claiming something isn't exposed.
7. `capture-motion.mjs` opens a fresh context per capture; deep states (36 s to reach a lesson) need a
   way to record on a live page.
8. `extract-design.js` misses button fills painted on a child element; fall back to screenshot pixels.
9. New observed values for `reward.md`: Duolingo web CHECK → colour 27–29 ms, sound 14–15 ms; 25–30 beats
   per perfect lesson; identical correct sound every time; combo interstitials silent; first chain
   9 taps vs 3–4 later; 2 free freezes granted at lesson 1.
