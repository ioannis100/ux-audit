# Role: access-perf

**Mission:** find who is locked out and what is slow. Accessibility failures block real
people and carry legal risk (EU Accessibility Act, ADA); slowness quietly kills every
other metric.

**Load:** `references/accessibility-performance.md`, `references/motion.md`
(reduced-motion and perceived-performance sections).

**Do:**

1. **Keyboard-only pass** through every core journey: Tab / Shift-Tab / Enter / Space /
   Esc. Record focus visibility, order, traps, skip link, focus hidden under sticky
   chrome, modals trapping and returning focus.
2. **Semantics** (DOM / accessibility tree): real buttons and links vs clickable divs,
   labels on inputs, alt text, one h1 and a sane heading outline, landmarks, aria-live
   on async updates, accessible names containing the visible label.
   Then **walk one core journey through the accessibility tree** (`read_page` filter
   `all` with your tabId / DevTools / Playwright snapshot) as a screen-reader user
   would: findable by headings and landmarks alone, reading order = task order,
   every name meaningful out of context, result changes announced. Findings without
   a WCAG criterion still count (reference → Beyond WCAG).
3. **Contrast and targets**: use `scripts/extract-design.js` output (or run it), then
   confirm failures visually. Targets < 24px (WCAG 2.5.8) and < 44px on touch.
4. **Scaling**: 200% zoom and 320px-wide reflow (no horizontal scroll, no clipped text);
   WCAG 1.4.12 text-spacing override; native apps — largest Dynamic Type / font scale.
5. **Motion**: reduced-motion setting on (emulate `prefers-reduced-motion: reduce`) —
   does parallax/autoplay stop? Anything flashing > 3×/s? Auto-moving content > 5s
   without pause?
6. **Colour alone**: grayscale screenshot of status, errors, charts, links.
7. **Performance**: Core Web Vitals come from Lighthouse, not the browser tab (hidden
   tabs emit none): `npx -y lighthouse <url> --output=json --output-path=<audit>/evidence/access-perf/lh-<screen>.json --quiet --chrome-flags=--headless`
   (mobile is the default; add `--preset=desktop` for a second run). Read
   `audits.largest-contentful-paint`, `cumulative-layout-shift`, `interactive`,
   `total-blocking-time`. For authenticated screens use Lighthouse's `--extra-headers`
   with the test session cookie from the brief, or skip and say so. For public URLs
   also PageSpeed Insights/CrUX field data. Time-to-feedback on each core interaction
   (aim < 100ms acknowledgment, < 400ms response or a visible state). Throttle to slow
   3G: are there skeletons, layout shifts, blank screens?
8. Auth flows: paste allowed in password/OTP, no cognitive puzzles, no redundant entry.
9. **On a device** (native apps, and the real-mobile pass for websites; commands are in
   `_contract-native.md`):
   - **Screen-reader labels:**
     - Android: `a11y-report` on every core screen (`--scope WebView` for web). Report
       unlabelled clickables, duplicate labels ("Add one" ×20 with no item name) and junk
       focus stops before the main action.
     - iOS: `a11y <dev>`, or list VoiceOver under Not checked when it's unavailable.
     - P1 when a core action is unlabelled.
   - **Targets:** < 48×48 dp (Android) or 44×44 pt (iOS) on core actions or the only
     alternative path is P1.
   - **Text size:** Android `font-scale-check` 1.0 → 2.0 (`respondedPct` ≈ 0 means it
     ignores the system size: P1); iOS `ui content_size accessibility-extra-extra-extra-large`
     plus screenshots. Look for clipping, truncation and overlap. For web pages, keep the
     browser 200% check.
   - **Reduced motion:** turn it on, record the same transitions again and compare with
     `capture-video-motion`. Same segments = ignored (P2; P1 for large or parallax
     motion). On iOS websites, `probe` first.
   - **Dark mode and increase contrast:** screenshot the core screens; check contrast and
     icons that vanish.
   - **Jank:** Android `jank` on the main list, twice. Flag p95 > 32 ms or > 10% slow
     intervals as "likely janky on a mid phone", never as a measured fact.
   - **Permission prompts:** any prompt before value is a finding.

**Brutal questions to answer in your summary:** Which users can't complete the core
journey at all? What's the single biggest speed problem a user actually feels?
