# Accessibility and performance

Load for every audit. Accessibility failures are severity ≥ 3 by default — they block
real people and carry legal risk (EU Accessibility Act enforced since June 2025; ADA
suits cite WCAG 2.1/2.2 AA).

## Accessibility essentials

| Check | Threshold | Detect by |
|-------|-----------|-----------|
| Touch targets | iOS 44×44pt; Android 48×48dp + ~8dp gap; WCAG 2.5.8 (AA) ≥ 24×24 CSS px | Measured hit area incl. padding (extract script) |
| Focus visible (2.4.7 AA) | Every focusable element shows a visible indicator | Tab through; grep `outline: none`/`outline: 0` without `:focus-visible` |
| Focus not obscured (2.4.11 AA) | Sticky headers/footers/cookie banners never cover the focused element | Tab through with sticky chrome present |
| Focus appearance (2.4.13 AAA) | ≥ 2px perimeter, 3:1 change | Screenshot |
| Keyboard (2.1.1, 2.1.2, 2.4.3) | Everything operable, no traps, logical order, skip link | Full Tab / Shift-Tab / Enter / Space / Esc pass |
| Modals | Trap focus while open, return focus on close, Esc closes | Interaction |
| Semantics (4.1.2) | Real `<button>`/`<a>`, not `<div onclick>`; one h1; logical heading outline; landmarks | Code / DOM |
| Alt text (1.1.1) | Meaningful alt; decorative `alt=""` | DOM — missing on 53% of top pages |
| Labels (1.3.1, 3.3.2) | Programmatic labels on every input | DOM — missing on 51% of top pages |
| Label in name (2.5.3) | Accessible name contains the visible label | DOM |
| Live updates | `aria-live` on async status, toasts, errors | DOM |
| Text scaling | Survives 200% zoom (1.4.4) and WCAG 1.4.12 spacing overrides; native: largest Dynamic Type / 200% font scale without truncation | Interaction |
| Reflow (1.4.10) | No horizontal scroll at 320 CSS px | Resize |
| Dragging (2.5.7 AA) | Single-pointer alternative to every drag | Interaction |
| Redundant entry (3.3.7 A) | Never ask for the same info twice in a flow | Walk the flow |
| Accessible auth (3.3.8 AA) | Allow paste and password managers; no cognitive puzzles | Try pasting into password/OTP |
| Color alone (1.4.1) | Second cue for every color-coded meaning | Grayscale screenshot |

## Beyond WCAG — walk the accessibility tree

WCAG 2.0 covered only 50.4% of 1,383 problems met by 32 blind users; 16.7% of sites
had the recommended technique and still failed (Power et al. 2012). Conformance is the
floor, not the audit. Every audit walks one core journey through the **accessibility
tree** — built-in browser `read_page` (filter `all`), Chrome DevTools Accessibility
pane, or Playwright `page.accessibility.snapshot()` — and a real VoiceOver / NVDA /
TalkBack pass when available. Findings without a success criterion still count:

- Can the task be found by headings and landmarks alone? Headings describe sections;
  `main`, `nav`, `form`, `search` present.
- Does the tree's reading order match the task order and the visual order?
- Does every control's accessible name say what it does out of context ("Delete
  invoice 4021", not "Delete" × 12; "Read more" × 8 = finding)?
- Are async result changes announced (`aria-live`, or focus moved to the result)?
- Are icon-only controls named, decorative images hidden, custom widgets (tabs, menus,
  sliders) exposed with role, state and a keyboard model?

## Performance as UX

Core Web Vitals (p75 field data):

| Metric | Good | Poor |
|--------|------|------|
| LCP | ≤ 2.5s | > 4.0s |
| INP | ≤ 200ms | > 500ms |
| CLS | ≤ 0.1 | > 0.25 |

Response-time limits (Nielsen): 0.1s instant · 1s flow unbroken · 10s attention limit.
Users expect ~2s for simple retrieval (Nah 2004). Any wait > 2s shows progress: with
feedback users waited 38s vs 13s without, and a third quit at 5–8s with none. After one
failed load tolerance drops ~3× (13 → 4s) — audit the retry path. Bounce probability
+32% from 1 → 3s load (Google/SOASTA 2017; industry, not peer-reviewed).

Checks:
- Hero image preloaded, sized (`width`/`height` or `aspect-ratio`) — no layout shift.
- No late-injected banners, fonts or ads pushing content.
- Long tasks > 50ms on interaction (DevTools Performance) → poor INP.
- Render-blocking scripts; > ~3 third-party tag managers.
- Field data: PageSpeed Insights / CrUX when the site is public. Lab: Lighthouse.
- Native apps: cold start time, scroll jank (dropped frames), time from tap to response.

Detection without tooling: `performance.getEntriesByType('navigation')`,
`PerformanceObserver` for `largest-contentful-paint` and `layout-shift` — the extract
script reports what it can see.
