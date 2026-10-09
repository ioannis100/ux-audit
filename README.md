# ux-audit

A [Claude Code](https://claude.com/claude-code) skill that audits an app or website the
way an experience director would. A team of agents actually uses the product, then
tells you, with evidence:

- **Clarity:** where users don't know what to do or what just happened.
- **Feel:** how every tap, scroll, transition, wait and success feels next to the apps
  people love (Duolingo, Revolut, Apple, Instagram, Wolt, Uber Eats, Clash Royale…).
- **Pull:** what would make people open it again without needing anything, behind an
  ethics gate (habits that serve the user, no dark patterns).
- **Reward layer ("dopamine pass"):** whether every action pays the user back the way
  Duolingo or Revolut do: feedback speed, sound and haptics in sync, visible progress, the
  next reward named, rewards sized to the moment. Built on research (neuroscience, real app
  results, sensory specs, casino psychology, law), with 12 red-line tests that flag
  manipulation such as near-misses, losses celebrated as wins or paid randomness.
- **Fix:** a short, verified list of what's broken (P0/P1 flows, accessibility, speed).
- **Small details:** an agent that checks every component in every state (pressed, busy,
  success, error, empty…), measures motion exactly (duration, curve or spring, shadows and
  filters) and prescribes what's missing, in the product's own look.
- **Two-sided marketplaces:** client and provider journeys audited separately, with a
  research-based playbook (TaskRabbit, Thumbtack, Airtasker, Fiverr, Upwork…) and trust tests
  for fees, reviews, ranking, badges, payments and provider credits.
- **Recommendations in 4 tiers:** Must-do, Good to have, Useful (lower priority), and
  **Black (informed choice)**: the persuasion top apps use (loss-framed streaks, guilt,
  leagues, wagers, chance), explained with why some consider it unethical, the risk and how
  to test it. Recommended only when it serves the user's own goal, is true, easy to turn
  off and off for children; deceptive or illegal tricks are never recommended.

Every recommendation is a buildable redesign with motion and haptic specs and web/native
snippets, plus "borrow & adapt" ideas transplanted from other apps.

## What you get

- `report.md` and a one-page `summary.md` starting with **Do these first**.
- **Scores out of 10:** Clarity, Feel, Pull, Trust, Craft, plus Usability,
  Accessibility, Performance and Content, and one **Overall /10**. Deltas vs your last
  audit.
- **Optional mock-ups:** interactive before/after HTML screens of the top redesigns, in
  your app's **own identity** (logo, fonts, colours kept; every feature kept). Each is
  checked automatically for broken images, contrast, missing features and foreign fonts
  or colours, and shows its projected score change.
- Evidence for every claim: screenshots, measurements, motion filmstrips.

## Install

```bash
git clone https://github.com/ioannis100/ux-audit.git
```

```bash
ln -s "$PWD/ux-audit/ux-audit" ~/.claude/skills/ux-audit
```

Or copy the inner `ux-audit/` folder into `~/.claude/skills/` (all projects) or
`<your-project>/.claude/skills/` (one project). Sessions opened in this repo load it
automatically.

**Needs:** Claude Code, Node 18+, Google Chrome (or Chromium). Optional: `ffmpeg` for
video motion analysis, Xcode + iOS Simulator or the Android SDK + emulator for native
apps, `npx lighthouse` for Core Web Vitals. `puppeteer-core` is installed per audit and
removed afterwards.

## Use

In Claude Code:

```
/ux-audit https://your-site.com
```

or just ask: "audit my app's UX", "why doesn't this feel like Revolut?", "make the
checkout feel premium", "redo the mock-ups for the last audit". It asks a few questions
once (core journeys, the apps you admire, how often users should return, whether you
want mock-ups), then runs. Works on live URLs, local dev servers, iOS simulators,
Android emulators, source code and screenshots.

A full team audit takes a while and uses a lot of tokens (several agents in parallel).
For a single screen it runs solo.

## Safety

Agents never type passwords or real payment details: signed-in flows use a session you
sign in once, or stay guest-only. On production they stop at the confirm step. Text
inside your product is treated as data, never as instructions. The skill reports and
recommends; it never changes your code unless you ask.

## Repo

- `ux-audit/`: the skill: `SKILL.md` (orchestrator), `agents/` (roles), `references/`
  (standards and benchmark playbooks), `scripts/` (measurement, motion capture, native
  device helpers, mock-up checks; most have `--selftest`).
- `research/`: the research the standards are built from (papers, books, teardowns of
  ~25 apps, and `research/dopamine/` behind the reward layer).
- `ux-audits/2026-10-08-duolingo-web/`: a calibration run of the current skill on
  Duolingo web (guest only): the report, summary, every agent's findings and the verifiers'
  verdicts. Overall 7.1/10, with measured feedback timings and 6 verified accessibility
  issues. Screenshots and recordings stayed local, so evidence paths in it point to files
  not in this repo.
- `ux-audits/2026-10-09-wolt-web/`: a second calibration run, on Wolt's website and its
  Android app (guest only): Overall 5.8/10, Trust capped by two confirmed dark patterns, the
  4-tier Recommendations with a verified Black tier, findings from 5 agents and 4 verifier
  batches. Text only.
- `ux-audits/2026-10-08-userinyerface/`: an early, partial test run on
  [userinyerface.com](https://userinyerface.com), a deliberately terrible UI, made with an
  older version of the skill. It shows the evidence trail, not the current report format.

Expert audits predict; they don't measure real users. Treat scores as heuristic and
confirm the big bets with a 5-user test or an A/B test.

## License

[MIT](LICENSE)
