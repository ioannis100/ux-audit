# Micro-interactions: the states every component needs, and what to add when it's missing

The small details decide whether an app feels finished: a press that answers, a sheet that comes
from where you tapped, a number that rolls, an error that says what to do. This library is what
`interaction-detail` prescribes from. It works on **any** product: the audit doesn't ask "does it
have Duolingo's push button", it asks "which states and details does each of *this* product's
components lack", and prescribes them **in this product's identity** (its colours, radii, type and
any motion tokens it already has). Tags: [S] platform docs · [O] measured by this skill (§9) ·
[H] starting value. Timing tokens: `benchmark-apps.md` §2. Reward sizing: `reward.md` §3.

## 1. Rules for every detail

1. **Answer within 100 ms** (visual ≤ 85 ms, haptic ≤ 50 ms; `reward.md` §1.4). If the result takes
   longer, show the busy state at once.
2. **Every interactive element has its states:** rest · hover (fine pointer) · pressed · focus-visible
   · disabled (when it can be) · busy/loading · success · error. Containers add empty · loading
   (skeleton) · error · partial. A missing pressed or busy state on a primary action is a feel gap.
3. **Frequency gate:** the more often it happens, the quieter it is (tier 0–1). Celebration is for
   rare, earned moments.
4. **Motion has a source and a destination:** things grow from what was tapped and return to it.
5. **Interruptible:** a second tap, back or Escape mid-animation always wins.
6. **Transform and opacity only** for movement (no `width`, `height`, `top`, `margin` animation).
7. **Never linear for movement**; decelerate in, accelerate out; exits ≈ 70–85% of entrances.
8. **Reduced motion** swaps movement for a ≤ 150 ms fade and keeps state changes, haptics and sound.
9. **Targets:** ≥ 44×44 pt iOS, 48×48 dp Android [S]; ≥ 24×24 CSS px is the WCAG 2.5.8 floor.
10. **In the product's identity:** reuse its accent, radius, shadow and easing; a detail that looks
    borrowed is worse than none.

## 2. Actions

| Component | States to check | Detail to add when missing | Spec (web · native) |
|---|---|---|---|
| **Primary button** | rest, hover, pressed, focus-visible, disabled, busy, success, error | press feedback; busy inside the button; success tick; no double submit | press: `transform: scale(.97)` 80–100 ms ease-out, release 200 ms `cubic-bezier(.2,0,0,1)` [H], **or** a push: `translateY(2–4px)` + shadow collapse, instant (Duolingo [O]) · busy within 100 ms, same width, spinner or "Sending…"; disabled while pending · success: check 150–200 ms, then the next state · SwiftUI `ButtonStyle` on `isPressed` + `.spring(duration:0.3, bounce:0.15)`; Compose `collectIsPressedAsState()` → `graphicsLayer { scaleX = s; scaleY = s }` |
| **Icon button** | rest, hover, pressed, focus, toggled | a state layer behind the icon; an icon swap for toggles | M3 state layer opacity: hover 8%, focus 10%, pressed 10%, dragged 16% [S], radius = full; toggle: icon crossfade 150 ms (`.contentTransition(.symbolEffect(.replace))`) |
| **Text link** | rest, hover, pressed, focus, visited (where useful) | underline on hover/focus; pressed tint | 150 ms colour; never colour alone to mark a link (WCAG 1.4.1) |
| **Destructive action** | rest, confirm, done, undo | never in the primary slot; undo instead of "are you sure" where reversible | snackbar "Removed X · Undo" 4–10 s [S M2]; `REJECT` / `.warning` haptic on remove |
| **Favourite / like / save** | off, on, syncing, failed | optimistic fill on frame 1; small pop; roll back on failure | scale 1 → 1.2 → 1 over 350–450 ms, bouncy spring [H] (`benchmark-apps` §3.4); light haptic; failure toast restores the state |
| **Add to cart / add item** | rest, adding, added, max | bar bump + count roll; live total | bar 1 → 1.06 → 1 250 ms; count `tabular-nums` roll 200–300 ms; light haptic; Wolt basket stepper 27–41 ms + 335 ms count pop [O] |
| **Copy / share** | rest, copied | icon swap to a check + "Copied" | 150 ms swap, label 1.5 s; Android 13+ shows its own clipboard confirmation, so don't add a second toast [S] |

## 3. Inputs and selection

| Component | States to check | Detail to add | Spec |
|---|---|---|---|
| **Text field** | empty, focused, filled, valid, error, disabled, read-only | visible focus; label stays visible (no placeholder-as-label); error under the field, input kept | focus ring 2–3 px in the accent, 100–150 ms; validate on blur, re-validate as you type once an error shows [H, NN/g]; error text fades/slides in 150 ms; success tick only where it reassures (password rules, availability) |
| **Search** | idle, focused, typing, results, no results, error | suggestions/recents on focus; instant results; a useful no-results state | suggestions ≤ 100 ms after focus; results update debounced 150–250 ms [H]; no results offers the nearest valid path (`benchmark-apps` §3.7); clear button when filled |
| **Switch / toggle** | off, on, pressed, focus, disabled | thumb slides, track colour crossfades; immediate effect | thumb 150–200 ms (M3 short3–4) [S]; haptic `.selection` / `TOGGLE_ON`·`TOGGLE_OFF` [S]; web: a real `<input type="checkbox" role="switch">` |
| **Checkbox / radio** | unchecked, checked, indeterminate, focus, disabled, error | check draws; group error | check stroke draw 150 ms; `.selection` / `SEGMENT_TICK`; whole row is the target |
| **Segmented control / tabs** | selected, pressed, focus, disabled | indicator slides from the old tab; content follows direction | indicator 200–250 ms ease-out, follows the finger when swiping [H]; content crossfade 150 ms or slide in the tab's direction; `.selection` haptic on segmented controls |
| **Chips / filters** | off, on, pressed, count | check icon on select; result count updates | check 150 ms; result count rolls; "Clear all" appears with the first filter |
| **Stepper / quantity** | value, min, max, pressed, long-press repeat | number roll; disabled at min/max; repeat on hold | roll 150–300 ms `tabular-nums`; hold-to-repeat after ~400 ms, then faster [H]; `SEGMENT_TICK` per step |
| **Slider** | rest, dragging, focus, detents | thumb grows while dragged; value bubble; ticks at detents | thumb scale 1.2 on press; bubble fades 100 ms; `.selection`/`SEGMENT_FREQUENT_TICK` per detent |
| **Date / time picker** | open, selected, range, invalid | selected day fills; range bar grows | 150–200 ms fill; native pickers where possible |

## 4. Containers and surfaces

| Component | States to check | Detail to add | Spec |
|---|---|---|---|
| **Card / list row** | rest, hover, pressed, focus, selected, loading | pressed feedback; opens from itself | pressed state layer or `scale(.98)` 100 ms; shared element to the detail (`view-transition-name`, `matchedGeometryEffect`, `SharedTransitionLayout`) 350–500 ms bounce 0 |
| **Bottom sheet / modal** | opening, open, detents, dragging, closing | slides from the edge or grows from the trigger; drag to dismiss with velocity; backdrop | open 300 ms `cubic-bezier(.2,0,0,1)` or spring bounce 0; close 200 ms `cubic-bezier(.3,0,.8,.15)`; backdrop 200 ms in / 150 ms out; interruptible; focus moves in and returns to the trigger; detents `.presentationDetents([.medium,.large])` / `ModalBottomSheet` |
| **Menu / popover / tooltip** | closed, opening, open, item hover/pressed | grows from its anchor | scale .95 → 1 + fade 150 ms, `transform-origin` at the trigger; close 100 ms; tooltip delay 300–500 ms on hover, instant on focus [H] |
| **Toast / snackbar** | entering, visible, action, dismissing | one at a time; an action when useful; announced | in 200 ms slide + fade, out 150 ms; 4–10 s when it has an action [S M2], Android Toast 2 s / 3.5 s [S]; swipe to dismiss; `role="status"` / `aria-live="polite"` |
| **Banner / inline alert** | info, success, warning, error, dismissed | icon + text (not colour alone); dismiss | height reveal via `grid-template-rows` 0fr → 1fr 200 ms or a `transform` slide; never pushes the content the user is reading |
| **Accordion / expandable** | closed, open, focus | chevron rotates; content reveals | chevron 200 ms rotate; content `grid-template-rows` 0fr → 1fr 200–250 ms; `aria-expanded` |
| **Tab bar / bottom navigation** | selected, pressed, badge | icon fill on select; scroll-to-top on re-tap | icon swap 150 ms; badge pop 1 → 1.15 → 1 200 ms; re-tap scrolls the list to top (a convention on iOS and Android) |

## 5. Loading, empty, error, success

| Moment | Detail to add | Spec |
|---|---|---|
| **Loading < 1 s** | nothing, or a subtle in-place indicator after ~400 ms | avoid flashing a spinner for fast loads (`motion.md` loading table) |
| **Loading 1–10 s** | a skeleton matching the final layout within 100 ms | shimmer 1.2–1.5 s loop [H]; crossfade to content 150–200 ms; no layout shift |
| **Loading > 10 s** | progress with steps or a percentage | determinate bar, springy steps, never linear for step jumps |
| **Pull to refresh** | threshold, haptic at threshold, done state | rubber band past the threshold; `GESTURE_THRESHOLD_ACTIVATE` / `.impact(.light)` at the threshold [S]; spinner → content, no blank |
| **Empty (first use)** | what goes here + one action | illustration in the product's style, one CTA; never a blank page |
| **Empty (no results)** | the nearest valid path | suggestions, a broader query, a reset of filters |
| **Error (inline)** | what happened + what to do; input kept | under the field or in place; `.error` / `REJECT` haptic; no screen shake |
| **Error (page / network)** | retry with a busy state; offline banner | "You're offline · Retry" with the last good content kept on screen |
| **Success** | sized by the reward ladder | `reward.md` §3 (tick → confirm → reward → celebrate; money stays calm) |
| **Numbers changing** | they roll, not jump | 200–300 ms, `tabular-nums`, `.contentTransition(.numericText())`, `AnimatedContent`; `aria-live` the final value |

## 6. Navigation and gestures

| Gesture / moment | Detail to add | Spec |
|---|---|---|
| **Forward / back navigation** | a direction and a source, never a blank frame | slide 16–24 px + fade 250–300 ms forward, reverse on back; `@view-transition { navigation: auto }` on the web |
| **Edge swipe back (iOS) / predictive back (Android 14+)** | the gesture follows the finger and previews the destination | never disable the system back gesture; Android: opt in to predictive back animations [S] |
| **Drag to reorder** | lift, room-making, settle | lift scale 1.03 + raised shadow 150 ms; others move 200 ms; drop settles with a spring bounce 0.15; `DRAG_START` / `.impact(.medium)` [S] |
| **Swipe actions on rows** | reveal, threshold, commit, undo | the action icon scales in with the drag; haptic at the commit threshold; full swipe commits with undo |
| **Carousel / paging** | follows the finger; momentum; snap | `scroll-snap-type: x mandatory`; dots/progress update on settle; never autoplay without a pause (WCAG 2.2.2) |
| **Long press** | a visible "something is about to happen" | scale .97 over the hold, then the menu grows from the item; `.impact(.medium)` on open |
| **Scroll details** | sticky headers that settle, scroll-linked shadow, scroll-to-top | header gains a 1 px divider or shadow once content scrolls under it; title collapses into the bar; never hijack scroll speed |
| **Keyboard** | the field and the primary action stay visible | web: `<meta name="viewport" content="…, interactive-widget=resizes-content">` [S] or `visualViewport`; native: `UIKeyboardLayoutGuide`, `imePadding()`; correct `inputmode`/`enterkeyhint`/`autocomplete` |
| **Hover (desktop)** | every clickable answers | 150 ms colour or elevation; `cursor: pointer`; nothing important hover-only (touch can't hover) |

## 7. Prescribing (how a gap becomes a recommendation)

1. **Find the gap:** a state missing in the grid, a measured timing outside §1, a cut where a source
   exists, an animation that blocks input, a gesture that doesn't follow the finger.
2. **Pick the pattern** from §2–§6 and **adapt it to the product**: its accent and radius, its
   existing easing (read `declared` from `sample-motion.mjs`), its platform (web/iOS/Android).
3. **Size it** by frequency and stakes (§1.3, `reward.md` §3).
4. **Tier it:** Must-do when a primary action has no pressed/busy state, a core tap answers > 100 ms
   with nothing, a blank frame or cut breaks a core transition, an animation blocks input, or a
   destructive action has no undo · Good to have for missing source-anchored motion, number rolls,
   sheet physics, haptic mapping · Useful for polish (hover, tooltip delays, badge pops).
5. **Write it** as `D-xx`: component · gap (measured) · detail · spec · web + native snippet ·
   reduced motion · 100th use · benchmark ([O] where measured).

## 8. Measuring details

- `node <skill>/scripts/sample-motion.mjs <url> --target <css> --action <css>|press:<css>|js:…` (or
  `sampleOnPage(page, …)` on a live page): declared CSS/WAAPI timing + measured duration, curve or
  spring (damping ratio, bounce, response) per channel, and `styleChanges` (filter, shadow, colour,
  border on the element and its `::before`/`::after`). Measure **press states at a desktop viewport**:
  headless Chrome doesn't apply `:active` to mouse presses under touch emulation.
- `capture-motion.mjs` for whole-screen transitions (cuts, blank frames, first change).
- Native: `native-android.mjs record` → `capture-video-motion.mjs`; `vibrations <pkg>` for haptics.
- The owner's 120 fps phone recordings of the north-star app go through `capture-video-motion.mjs`;
  add the results to §9 with the date.

## 9. Observed values (measured by this skill, not quoted)

| App · surface · date | Detail | Value | Method |
|---|---|---|---|
| Duolingo web · 2026-10-09 | "Get started" press | instant (one frame, +18 ms): `translateY(4px)`, `filter: brightness(1.1)`, the `::before` 4 px bottom shadow removed (+34 ms); no transition declared | `sample-motion.mjs`, desktop 1280×800 |
| Duolingo web · 2026-10-08 | CHECK → answer colour / sound | 27–29 ms / 14–15 ms | n = 21 and 30 |
| Wolt web · 2026-10-09 | basket stepper + | 27–41 ms; count pop 335 ms; total overshoot 225 ms | verifier, n ≥ 8 |
| Wolt web · 2026-10-09 | Add to order → bar text | press 32–42 ms; bar 463 ms | verifier |
| Wolt web · 2026-10-09 | item card → modal | cold 613–966 ms (median ~720), warm 140–193 ms; Escape at +100 ms ignored | verifier, n = 8 |
| Wolt web · 2026-10-09 | item modal −/+ (real `<button>`) | press `scale` 1 → 0.8 in 50 ms; the menu's dish "+" (`div role=button`) shows no pressed state on touch | `sample-motion.mjs` (interaction-detail trial; not yet verified) |
| Wolt web · 2026-10-09 | item modal close / Add to order | leaves in one frame (no exit) after ~430 ms of client time | interaction-detail trial; not yet verified |
| Wolt Android · 2026-10-09 | small "+" add buttons | a `performHapticFeedback` CLICK (~120 ms prebaked); none on Add to order, steppers or the unlock | `dumpsys vibrator_manager` |
