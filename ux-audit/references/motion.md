# Motion, micro-interactions, perceived performance, haptics

Load when the product has any animation, loading, or interactive controls (almost
always). Measure durations and easings from computed styles, not from watching.

## Micro-interaction anatomy (Saffer)

Trigger → Rules → Feedback → Loops & modes. For each key control check:
- Trigger is discoverable (looks interactive, has hover/pressed states).
- Feedback lands within **100ms** (pressed state at minimum).
- Rules are predictable — same action, same result.
- Modes are minimal; loops (repeat, decay) are intentional.

Every interactive element needs these states designed: default, hover (pointer),
pressed/active, focus-visible, disabled, loading/busy, success, error. Missing
pressed and busy states are the most common gaps.

## Durations

| Element | Duration |
|---------|----------|
| Tiny: toggles, checkboxes, fades, color/hover | 100–200ms |
| Medium: cards, menus, sheets, dropdowns | 250–350ms |
| Large: full-screen / page transitions | 300–500ms |
| Desktop/web overall | ~150–200ms (shorter than mobile) |
| Mobile overall | ~200–300ms; tablet ~+30%; wearable ~−30% |
| Material 3 tokens | short 50–200, medium 250–400, long 450–600, extra-long 700–1000ms |

- < 100ms reads as instant; > 500ms for UI feedback feels sluggish; > 1s is a flag.
- **Exits shorter than entrances** (e.g. enter 225ms, exit 195ms).
- Scale duration with distance travelled and element size.
- Repeated actions (every keystroke, every list item) need near-zero or no animation.

## Easing

- Enter → **decelerate** (ease-out). Exit → **accelerate** (ease-in). On-screen move → ease-in-out.
- `linear` only for opacity loops, progress bars, color cycling. Linear movement looks mechanical — flag it.
- M3 CSS: standard `cubic-bezier(0.2,0,0,1)`, emphasized-decelerate `(0.05,0.7,0.1,1)`,
  emphasized-accelerate `(0.3,0,0.8,0.15)`.
- **Springs**: interruptible and keep gesture velocity — preferred for anything the user
  drags or flings. Apple: `.smooth` (no bounce), `.snappy` (~0.15), `.bouncy` (~0.3).
  M3 Expressive spatial damping ~0.6–0.9. Overshoot only on spatial/playful elements;
  **never bounce opacity or color**.

## Motion must have a job

Good motion: shows where something came from/went (continuity), confirms an action,
directs attention to a change, expresses brand at a moment that matters.
Flag: animation that delays the user from acting, scroll-jacking, parallax for its own
sake, everything animating at once, the same flourish on every screen.

One orchestrated moment (first load, a success state) beats scattered effects.

## Reduced motion (non-negotiable)

- CSS must contain `@media (prefers-reduced-motion: reduce)` that swaps parallax, zoom,
  slide and autoplay for a fade or nothing. Native: respect Reduce Motion / Remove
  animations settings.
- WCAG 2.2.2 (A): auto-moving content > 5s needs pause/stop/hide.
- WCAG 2.3.1 (A): ≤ 3 flashes per second.
- 2.3.3 (AAA): motion from interactions can be disabled.

## Perceived performance & loading states

| Wait | Pattern |
|------|---------|
| < 100ms | Nothing needed — instant |
| < 400ms (Doherty) | Pressed state only; optimistic UI for likes/toggles/sends |
| 0.4–1s | Subtle inline indicator |
| 1–10s | Skeleton for page/section (matching final layout); spinner for a single element |
| > 10s | Determinate progress + time estimate + cancel; let the user leave and come back |

- [H] Delay spinners ~300ms so fast loads don't flicker; once shown, keep ≥ ~500ms.
- Skeletons must match final layout or they cause layout shift.
- Optimistic UI must roll back *visibly* on failure.
- Buttons show busy state and block double-submit while in flight.
- Design offline and slow-network states, not just loading.

## Haptics (native mobile)

Use system semantic types consistently: success/warning/error notifications;
light/medium/heavy impacts for physical metaphors; selection ticks on pickers.
Flag: haptic on every tap, haptic that contradicts the visual result, haptic as the
only feedback.

## Sound

Rare on web; in native apps, only for meaningful moments, always respects silent mode,
never autoplay with sound.

## Animation review rules (borrowed from Emil Kowalski's review-animations)

- **Gate by frequency.** Used 100+ times a day or keyboard-triggered → no animation.
  Rare or first-time moments → room for delight.
- UI motion stays < 300ms with ease-out. Ease-in on an entering element feels laggy.
- Never animate from `scale(0)` — start at `scale(0.95)` + opacity 0.
- Popovers/menus scale from their trigger's origin (`transform-origin`), not center.
- Animations must be interruptible (a second click mid-animation must not queue or jump).
- Animate only `transform` and `opacity` (GPU); animating `width/height/top/left` janks.
- Fix order: **delete it → reduce it → fix easing → fix origin → make interruptible**.
- Report motion findings as one table: `Element | Before | After | Why`.

## Gabe additions: reward moments, thinking states, screens as a movie

- **Frequency gate, nuanced**: habit actions done ~once a day (check-in, log) deserve a
  small acknowledgment (bounce/glow/sparkle ≤ 300ms); full ceremony only at milestones.
- **Opt-in reveals** (pack, chest, recap, payout): anticipation 0.5–2s, tap-to-advance,
  one item at a time, rare items get distinct motion; light haptic per reveal, success
  haptic on the big one; sound optional and silent-mode aware; reduced motion → instant
  reveal with a static highlight. See engagement-retention.md → Reward moments.
- **Live "thinking" feedback**: long AI/processing waits use motion that reacts to the
  real system state (streaming text, voice-reactive dots, pulses on input) — closes the
  action→reaction loop (Perplexity). Never fake progress.
- **Tactile data**: charts and cards that respond to drag (scrubbed value, glow,
  selection haptic) turn data into something felt (Revolut). Flag static charts where
  the data *is* the product.
- **UI as a movie**: audit transitions between core screens as a sequence, not only each
  state. Hard cuts between related screens in a consumer app = P3 missed opportunity.
- **Tab switch** [H]: pressed feedback < 100ms, active indicator slides to the new tab,
  content cross-fades or slides 200–300ms. A hard snap = flag.
- **Busy-button swap**: label exits, "Loading…"/spinner enters, inside a fixed-size
  button (no width jump), ~200–300ms ease-out.
- **Hover reveals**: grow a clip/mask or fade opacity rather than moving content;
  nested controls keep their own hover states. Hover states must keep text ≥ 4.5:1.
- **Physics and multi-channel confirmation**: rubber-band overscroll, momentum, sound +
  haptic on key commits (pay, capture, passcode) — the UI feels like an object.
- **Change interaction models gradually** with a persistent visual cue (Apple's home
  indicator replaced the button over years, no tutorial).

## Transitions and motion audit

Run this for every core screen change and every key in-screen state change. Screenshots
at fixed offsets miss hard cuts, blank gaps, jank and easing. Use a recording instead.

### Capture
`node <skill>/scripts/capture-motion.mjs spec.json` from the audit folder (header of the
script has the spec format; one fresh context per capture; `alsoReduced: true` repeats
each capture under `prefers-reduced-motion: reduce`). Per capture you get
`<name>-filmstrip.png` (10 frames, +ms labels, red = cut frame) and `<name>.json`.
**Always look at the filmstrip before quoting a number** (`FRAMES=1` dumps every frame).
The JSON says what changed, the strip says what the user saw. Frame timing varies
±50 ms between runs: capture twice before quoting a borderline value.

### Reading the JSON
| Field | Meaning | Watch for |
|---|---|---|
| `firstChangeMs` | first visible pixel change after pointer-down | > 100 ms: no pressed state; the tap feels ignored |
| `segments[]` | bursts of change separated by > 120 ms of stillness | 2+ segments for one route change = exit, gap, enter (a loading hole) |
| `settledMs` / `motionMs` | end of the last burst / time from first change to settled | over budget (below); includes late data and image pop-in, so check the strip |
| `cuts[]`, `hardCut` | one frame carries ≥ 70% of the change across ±150 ms | `hardCut: true` (> 25% of screen) between related screens |
| `blank[]`, `blankMs` | frames that are a near-uniform colour | any blank frame between two screens = a flash; > 100 ms is a P2 feel gap |
| `segments[].easing`, `profile` | progress (mean pixel distance to the end frame) at 10…100% of the burst | `linear-ish` on movement; `ease-in` on an entrance. Reliable for fades and crossfades; textured slides saturate early, so prefer `animations[].easing` when present |
| `segments[].fps`, `stallsMs`, `longFrames` | frames delivered while moving; rAF gaps > 50 ms | fps < 30 or long frames during motion = jank. Desktop Chrome is faster than a phone: rerun with `"cpu": 4` before calling something smooth |
| `animations[]` | every CSS transition, CSS animation and WAAPI animation that started | `layoutProps: true` (animating width/height/top/margin); 2+ animations on the same element and property = double animation; the same entrance on 20 list items = no stagger cap |

Motion with no `animations[]` entry is JS-driven (rAF style writes, scroll). Read the
source for its timing.

### Thresholds
| Moment | Budget |
|---|---|
| Feedback on press | < 100 ms (`firstChangeMs`) |
| UI motion (toggle, chip, stepper, sheet) | 150–350 ms |
| Page/route transition | 250–500 ms, with no blank frame |
| Exit vs entrance | exit ≈ 70–85% of the entrance (e.g. 200 / 250 ms) |
| Data-dependent content after a route change | skeleton within 100 ms, crossfade to content ≤ 200 ms |
| Easing | ease-out or spring for entrances, ease-in for exits, never linear on movement |
| Frame pacing | no long frame > 50 ms while something moves |

### What to flag
- **Hard cut:** `hardCut` with a strip that jumps from one screen to the next. Between
  related screens in a consumer app it is a feel gap (score 2–3). Fix: shared element or
  crossfade.
- **Scroll jump:** a `cuts[]` entry inside a scroll (tab → section, smooth scroll) means
  the page moved more than half a screen in one frame. The eye loses its place. Fix:
  a shorter distance (jump close to the target, then animate the last ~600 px), or
  `scroll-behavior: auto` with a section heading highlight.
- **Blank or flash gap:** `blank[]` frames between exit and entrance (route-level
  `Suspense`, lazy chunks, `AnimatePresence mode="wait"`, a full reload). It reads as
  "the app restarted". Fix: keep the old screen until the new one can paint, then
  transition. Prefetch the route chunk on press.
- **Double animation:** the page wrapper fades and every card also fades or slides in.
  Two segments for one action, or many `animations[]` with the same start. Keep one.
- **Layout-property animation:** `layoutProps: true`. Replace it with `transform`/`opacity`,
  or a FLIP measured once.
- **Non-interruptible motion:** capture `[open, wait 100, close]` as the action. If the
  close waits for the open to finish, or the sheet jumps, it isn't interruptible.
  Springs and View Transitions can be retargeted, CSS keyframes can't.
- **Unanchored motion:** the new surface fades or slides in from a screen edge
  unrelated to what was tapped. Compare the first moving frames with the tap point.
- **Enter = exit:** identical durations both ways, or the exit slower than the entrance.
- **Reduced motion ignored:** the `-reduced` run moves the same (same segments, same
  `animations[]`). Under reduce, spatial motion becomes a ≤ 150 ms crossfade or nothing.

### Transition matrix (one row per transition)
`From → to | trigger | first change | settled | hard cut | blank | anchored | easing (measured / CSS) | interruptible | reduced motion | score /10 | benchmark §`

Score with the moment scale in `agents/experience-director.md`, against the matching
`benchmark-apps.md` section: detail and sheets §3.6, tabs and lists §3.7, add to cart
§3.5, waits §3.8, checkout §3.9, success §3.10, errors §3.11. Values come from §2.

### Enhancement patterns (cite the section, don't restate it)
- **Shared element into detail:** View Transitions (`view-transition-name` on the card
  image and the sheet/detail hero, `document.startViewTransition`), spring
  0.35–0.5 s. See `benchmark-apps.md` §3.6. Same-document SPA: wrap the router update.
  Cross-document MPA: `@view-transition { navigation: auto; }`.
- **Route change without a hole:** keep the outgoing screen until the incoming one can
  paint (`startViewTransition` around a router navigation that has loaded its data).
  Then crossfade 200–250 ms, or slide 12–24 px plus fade for forward/back. Never blank.
  ```css
  ::view-transition-old(root) { animation: 180ms cubic-bezier(.4,0,1,1) both fade-out; }
  ::view-transition-new(root) { animation: 260ms cubic-bezier(.2,0,0,1) both fade-in; }
  @media (prefers-reduced-motion: reduce) { ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) { animation-duration: 1ms; } }
  ```
- **Sheets with detents:** `<dialog>` + `translateY` spring, drag to dismiss with
  velocity, detents ~50% / full. Exit is shorter than enter. §3.6; native
  `.presentationDetents`.
- **List stagger with a cap:** only the first 6–8 visible items stagger, 30–40 ms apart,
  total ≤ 300 ms. Items below the fold appear with no motion. Never on every visit to
  the same list (§3.7, law 7).
- **Number roll:** totals, counts and ETAs roll with `tabular-nums` over 200–300 ms. §2
  (numbers row), §3.5 (cart bar bump), §3.8 (ETA).
- **Skeleton → content crossfade:** a skeleton matching the layout within 100 ms, then
  a 150–200 ms opacity crossfade. Never a spinner-to-content pop. §3.7.
- **Press → result continuity:** the pressed element is the origin of the next surface
  (`transform-origin` at the tap point, or the shared element above). §3.3, law 3.
- **Native equivalents:** `.navigationTransition(.zoom(sourceID:in:))`,
  `matchedGeometryEffect`, `.contentTransition(.numericText())`; Compose
  `SharedTransitionLayout`, `AnimatedContent`. Tokens: §2.
