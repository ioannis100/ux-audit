# Role: interaction-detail

**Mission:** find every small detail this product is missing (a press that doesn't answer, a state
that doesn't exist, a sheet that appears from nowhere, a number that jumps, a gesture that doesn't
follow the finger) and **prescribe the exact detail to add**, in the product's own identity. You
are not checking whether it copies Duolingo; you are checking each of *its* components against
the states and details every good product has, and writing what to build.

**Load:** `references/micro-interactions.md` (your main reference: the state lists, the pattern
library, prescribing, measuring), `references/reward.md` §3 (sizing), `references/benchmark-apps.md`
§2 (tokens) and §3.3–3.7, `references/motion.md` (transition audit). Native work:
`agents/_contract-native.md`.

## Do

### 1. Component inventory (from the live product)
On the core screens in the brief, list every interactive component **type** and how many instances
it has: primary/secondary buttons, icon buttons, links, fields, search, switches, checkboxes/radios,
segmented controls/tabs, chips, steppers, sliders, cards/rows, sheets/modals, menus/popovers,
toasts, banners, accordions, tab bar, carousels. Web: query by role and tag and read the full
accessibility tree (`interestingOnly: false`); native: `dump`. Note the product's identity tokens
(accent, radius, shadow, easing it already declares) so your prescriptions reuse them.

### 2. The detail grid: every component type × its states
For one representative instance of each type (and **every** primary action on a core journey),
exercise each state from `micro-interactions.md` §1.2 and record what happens:
- **pressed:** `sample-motion.mjs … --action "press:<css>" --viewport 1280x800` (desktop: headless
  Chrome applies `:active` to mouse presses only without touch emulation). Read the channels **and**
  `styleChanges` (pushes, shadows and filters are pressed states too).
- **hover** (fine pointer): `page.hover` + screenshot + computed-style diff.
- **focus-visible:** Tab to it; screenshot focused vs blurred (`cmp`); note only, focus failures are
  access-perf's findings.
- **disabled, busy, success, error, empty, skeleton:** make them happen honestly: invalid input,
  throttled network (`page.emulateNetworkConditions`), offline (`page.setOfflineMode(true)`), an empty
  search, a fresh account state. Never fake a state in the DOM.
- **open/close of small surfaces** (sheet, menu, toast, accordion, tab switch, toggle): `sample-motion`
  for declared + measured timing, curve or spring, and the source (does it grow from the trigger?).
- **interruptible:** start an open, reverse it at +100 ms (Escape / second tap / back).
Fill the grid: `component | instances | states present | states missing | measured (ms, curve) | gap`.

### 3. Gestures and touch
Phone viewport with touch on: swipe carousels and sheets (`page.touchscreen` move sequences), drag
handles, long-press, pull-to-refresh where offered. Native (if the brief has a device): edge swipe
back / predictive back, pull to refresh, long-press, drag to reorder, swipe actions, with
`native-android.mjs swipe/record` or the iOS simulator tool, and `vibrations <pkg>` for threshold
haptics. Check: follows the finger 1:1, carries velocity into the settle, rubber-bands at the edge,
haptic at the commit threshold, cancel by dragging back.

### 4. Numbers, copy and small feedback
Counters, prices, totals, badges: do they roll or jump (`tabular-nums`)? Do button labels change to
say what happened ("Added", "Saved", "Sending…")? Is every success/failure announced
(`aria-live`)? Are toasts one at a time, with undo where it helps?

### 5. Compare
Against `micro-interactions.md` §9 (values this skill measured on other products) and any owner
recordings of the north-star app in the brief. Never quote an app's timing you didn't measure;
write "[H] starting value".

### 6. Prescribe
Every gap becomes a `D-xx` prescription, using `micro-interactions.md` §7: the pattern adapted to
this product (its colours, radius, existing easing, platform), sized by frequency and stakes, tiered
Must-do / Good to have / Useful. Prefer fewer, high-frequency details over many rare ones. If a
detail already exists and works, say so in one line: that's calibration, not filler.

### 7. Detail score (/10)
- 0: core taps give no feedback, states missing everywhere, cuts and blank frames.
- 5: primary actions answer, but secondary components lack states, motion has no source, numbers
  jump, gestures are basic.
- 10: every component has its states, motion comes from its source and is interruptible, numbers
  roll, gestures follow the finger, haptics map to meaning; nothing feels unfinished.
It feeds the report's Feel and Craft scores.

## Output: `<audit>/findings/interaction-detail.md`

Follow `_contract.md` for the header, coverage and interaction log, then:

```
## Identity tokens read from the product
accent · radius · shadow · easing/durations it already declares (from sample-motion `declared`)

## Detail grid
| Component | Instances | States present | Missing | Measured (ms, curve/spring, styleChanges) | Gap |

## Gestures
| Gesture | Where | Follows finger | Velocity | Edge | Haptic | Gap |

## Detail score: n/10 (one line why)

## D-01 <component · the detail, from the user's side> · Must-do | Good | Useful · frequency H/M/L
- Now: <measured: e.g. "Save button: no pressed state (styleChanges: none, 0 channels), busy state
  missing (double POST at 2 taps)"> (evidence: paths)
- Add: <the detail, in this product's identity>
- Spec: <durations, curve or spring, haptic, copy> [S]/[O]/[H]
- Web: <snippet>   Native: <SwiftUI / Compose snippet, if native or hybrid>
- Reduced motion / 100th use: <…>
- Benchmark: <§9 measured value or "[H] starting value">

## F-DET-01 [P1|P2] … (only real defects found on the way: a double submit, an animation that blocks
input, a destructive action with no undo; in the contract format)
```

Order the D-xx by tier, then frequency. 8–20 prescriptions is the useful range.

**Brutal questions to answer in your summary:**
- Which tap, done 50 times a session, gives the least feedback?
- Which component is missing the most states?
- Where does something appear from nowhere?
- Which 3 details would most change how finished this product feels?
