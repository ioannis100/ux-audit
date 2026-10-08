# Top UI/UX research papers — what they add to the audit skill

Researched 2026-10-07. Citation counts are from OpenAlex (OA, API) and Semantic Scholar (S2)
unless marked GS (Google Scholar figure quoted in a search snippet, not verified directly).
OA undercounts ACM PACM/CSCW venues badly; where counts diverge both are given.

Selection: citation volume × enduring influence on practice × whether the finding converts
into a checkable rule or threshold. Empirical studies preferred over models and reviews.
Tags: **[S]** replicated / de-facto standard · **[H]** single study or model — report as a
suggestion, not a violation. Coverage = whether the finding is already in
`ux-audit/references/*.md`.

**Evaluated and dropped because the skill already has them in full** (no new rule):
Fredrickson & Kahneman 1993 peak-end (`emotional.md`, `usability.md`), Fitts 1954 /
MacKenzie 1992, Hick–Hyman, Miller 1956 / Cowan 2001, Miller 1968 / Nielsen response-time
limits and Core Web Vitals (`usability.md`, `accessibility-performance.md`).

---

## The ten

### 1. Heuristic evaluation of user interfaces — Nielsen & Molich, CHI 1990 [S]
OA 3,497 · GS 1,256 (stale snippet). Four experiments on four interfaces: single evaluators
found only 20–51% of the known usability problems; aggregating 3–5 evaluators pushes
coverage to roughly 75% (follow-up: Nielsen 1992). The method itself — a small set of general
principles applied by several independent evaluators — is the origin of the 10 heuristics the
skill uses.
**Audit rule:** a single-evaluator pass is a sample, not a census. Team mode must put ≥ 3
independent agents on each core journey; Solo mode must label its coverage (~1/3) in the report.
**Coverage:** heuristics yes (`usability.md`); the evaluator-coverage finding — no.

### 2. A mathematical model of the finding of usability problems — Nielsen & Landauer, INTERCHI 1993 [S]
OA 1,972 · S2 2,079 · GS 3,747. Problems found with *n* users = N(1−(1−L)^n); across their
projects the per-user discovery rate L averaged 31%, so 5 users find ≈ 85% and the curve
flattens after that — hence "test 5, fix, test 5 again". Faulkner 2003 (60 participants,
re-sampled) confirmed the 85% *average* but found the worst 5-user set caught only 55%; 10
users raised the minimum to 82% (mean 95%).
**Audit rule:** when the report recommends testing, specify 5 users per round, several rounds,
over one 15-user round; the skill's own two persona walkthroughs are n = 2 → ≈ 52% expected
coverage at L = .31, so phrase findings as "found", never "the complete list".
**Coverage:** no.

### 3. What is beautiful is usable — Tractinsky, Katz & Ikar, Interacting with Computers 2000 [S]
OA 1,376 · S2 1,345. ATM simulator, Israeli students (n = 124 in the final analysis), nine
layouts varying only in aesthetics. Perceived aesthetics and perceived usability were strongly
correlated *before* use, and the correlation survived actual use: post-use usability ratings
followed the look, not the manipulated real usability. Replications sharpen it — Tuch, Roth,
Hornbæk, Opwis & Bargas-Avila 2012 (CHB, n = 60, phone UI): the prettier version scored higher
on perceived usability but *worse* on task performance.
**Audit rule:** never infer usability from appearance, and treat a high visual score as a
reason to trust task evidence *more*: if visual craft ≥ 8/10 and a core task fails, the halo will
hide the failure from the team's own testing — raise its severity by one level.
**Coverage:** partial — one uncited "Aesthetic-usability" bullet in `usability.md`.

### 4. Attention web designers: you have 50 milliseconds — Lindgaard, Fernandes, Dudek & Brown, Behaviour & IT 2006 [S]
OA 1,036 · S2 1,055. Three studies: 50 homepages flashed for 500 ms, then 50 ms, rated 1–100
for visual appeal, twice. Ratings were highly consistent within and between participants and
between the 50 ms and 500 ms conditions — the appeal verdict is formed in ~50 ms and does not
change with longer looking. Later work (Tuch 2012, Reinecke 2013 below) shows what drives it.
**Audit rule:** the 5-second test measures comprehension, not appeal. Add a flash test:
show the first screenshot for 0.5 s (then blurred), rate appeal 1–100 next to the top
competitor's screen. Only gestalt survives 50 ms: layout balance, colour harmony, image
quality, whitespace — copy and features do not.
**Coverage:** yes for the citation (`emotional.md` visceral row); the test itself — no.

### 5. The role of visual complexity and prototypicality regarding first impression of websites — Tuch, Presslaber, Stöcklin, Opwis & Bargas-Avila, IJHCS 2012 [S]
OA 301. 119 real-site screenshots crossed on visual complexity (low/med/high) and
prototypicality (low/high), shown for 50, 500 or 1,000 ms. Low complexity + high
prototypicality produced the highest aesthetic ratings, and the effect was already present at
50 ms; complexity was the stronger factor. Replicated computationally by Reinecke et al. CHI
2013 (OA 310): perceived colourfulness + visual complexity + demographics explain about half
of the variance in appeal after a 500 ms exposure; both too much colour and too much
complexity hurt.
**Audit rule:** measure, don't eyeball: above the fold count distinct hues (> 1% of pixels),
distinct text sizes and bounded regions, and check layout against the category convention
(logo top-left, primary nav top, search/cart top-right, one hero + one CTA). Against 1–2
competitors, the screen that is both most complex and least conventional loses the first
impression → P2. "Innovative layout" is a cost paid at 50 ms.
**Coverage:** partial — Jakob's law and the squint test exist (`usability.md`,
`visual-design.md`); no complexity measure.

### 6. The interplay of beauty, goodness, and usability in interactive products — Hassenzahl, Human–Computer Interaction 2004 [S]
OA 1,089 (AttrakDiff, built on this model, is the most-used UX questionnaire in research).
Two studies, four MP3-player skins. Beauty was driven mainly by hedonic *identification* (what
the product says about me) and stayed stable before and after use; overall "goodness" was
driven by both pragmatic (perceived usability) and hedonic quality, and shifted with actual
usability problems after use. Fixing usability raises goodness, not beauty; hedonic quality
does not grow with exposure.
**Audit rule:** score pragmatic (task) and hedonic (stimulation + identification) separately;
one blended "UX score" hides which lever moves. Identification check: name one value the
target user wants to be seen with that the product visibly expresses — none = hedonic finding.
"It grows on you" is not a defence for a weak first impression.
**Coverage:** partial — Norman's reflective level in `emotional.md` ≈ identification; no split score.

### 7. SUS norms — Brooke 1996 (SUS: a quick and dirty usability scale) + Bangor, Kortum & Miller, IJHCI 2008 (An empirical evaluation of the SUS) [S]
Brooke OA 8,188 · GS ~30,000; Bangor OA 5,438 · S2 3,987. Bangor et al. analysed 2,324 SUS
surveys from 206 studies over ~10 years: mean ≈ 70 (median 71 across systems); < 50 is "not
acceptable", 70–85 good→excellent, > 85 excellent; a 7-point adjective item correlated r = .82
with SUS (Bangor 2009). Sauro's independent norm from ~5,000 responses / 446 studies: mean 68,
SD 12.5. UMUX-Lite (Lewis, Utesch & Maher, CHI 2013, S2 255) — two items, "capabilities meet my
requirements" and "easy to use" — regresses onto the SUS scale. Hornbæk 2006 (OA 1,131;
180 studies) found most HCI work measures satisfaction with ad-hoc questionnaires — the reason
to insist on a validated one.
**Audit rule:** if SUS data exists, benchmark it: < 68 below average, < 50 fail, ≈ 80 top
decile. If none, recommend UMUX-Lite on the post-task screen. Never present a heuristic-only
"usability score" as if it were a measured one.
**Coverage:** no.

### 8. A study on tolerable waiting time: how long are Web users willing to wait? — Nah, Behaviour & IT 2004 [H, corroborated]
OA 599 · S2 655. 70 students hit non-working links; 34 had a browser progress bar, 36 did not.
Mean wait before giving up on the first dead link: 13 s without feedback vs 38 s with it; a
third of no-feedback users quit between 5–8 s. On the *second* dead link tolerance collapsed to
4 s (no feedback) vs 17 s (feedback). Conclusion: users expect ~2 s for simple retrieval; ~15 s
is the ceiling without feedback. Galletta et al. 2004 (JAIS, n = 196, delays 0–12 s):
performance and intention losses bottom out by 4 s, attitudes by 8 s. Industry corroboration
(not peer-reviewed): Google/SOASTA 2017 — bounce probability +32% from 1 → 3 s load, +90% at
5 s; 53% of mobile visits abandoned past 3 s.
**Audit rule:** anything > 2 s shows progress; feedback roughly triples tolerance. Audit the
*second* attempt after a failure — tolerance drops ~3×, so a flaky first load is doubly costly.
**Coverage:** partial — Nielsen 0.1/1/10 s and CWV in `accessibility-performance.md`; "ops > 1 s
show progress" in `usability.md`. The feedback multiplier and post-failure collapse — no.

### 9. Guidelines are only half of the story: accessibility problems encountered by blind users on the web — Power, Freire, Petrie & Swallow, CHI 2012 [S]
OA 328 · S2 369. 32 blind screen-reader users, 16 sites, task-based sessions, 1,383 problem
instances. Only 50.4% of the problems mapped to any WCAG 2.0 success criterion; for the covered
ones, 16.7% of sites had implemented the recommended technique and the problem persisted.
The uncovered half: unexpected content or behaviour, not being able to find content, IA that
does not match the task.
**Audit rule:** WCAG conformance is necessary, not sufficient. Every audit includes one real
screen-reader walkthrough (VoiceOver / NVDA / TalkBack) of a core journey; "could not locate X
by headings or landmarks", "result changed with no announcement" and "order of content does
not match task" are findings even with no SC to cite.
**Coverage:** no — `accessibility-performance.md` is a WCAG-criterion table plus automated checks.

### 10. Dark patterns at scale: findings from a crawl of 11K shopping websites — Mathur, Acar, Friedman, Lucherini, Mayer, Chetty & Narayanan, PACM HCI (CSCW) 2019 [S]
OA 98 (PACM poorly indexed; CSCW best paper, FPF policy award; cited in FTC and EU material).
Crawled ~53K product pages on ~11K shopping sites: 1,818 dark-pattern instances on 1,254 sites
(~11.1%), more common on more popular sites; 15 types in 7 categories (sneaking, urgency,
misdirection, social proof, scarcity, obstruction, forced action); 183 sites were outright
deceptive (e.g. countdown timers that reset on reload, fabricated low-stock); 22 third-party
vendors sell the patterns as widgets. Companions: Gray et al. CHI 2018 (OA 851 · S2 638) — five
designer strategies from 118 practitioner-reported examples: nagging, obstruction, sneaking,
interface interference, forced action — the taxonomy regulators adopted. Luguri &
Strahilevitz, J. Legal Analysis 2021 (OA 409 · S2 388) — RCT, n = 1,963: acceptance of a
dubious paid plan rose from 11.3% (control) to 25.4% (mild patterns) and 37.2% (aggressive);
aggressive patterns caused backlash, mild ones did not.
**Audit rule:** run the 15-type checklist on every pricing, checkout, consent and cancel flow
and *verify*: reload to see whether a countdown resets, compare two sessions for stock and
"X people viewing" counts, look for urgency/social-proof widgets in the network log. Mild
patterns are not lower severity — they more than double conversion without generating the
complaints that would expose them.
**Coverage:** partial — `emotional.md` ethics gate lists Brignull types; missing: activity
messages, testimonials of uncertain origin, pressured selling, the verification tests, the
third-party-widget check, and the severity rationale.

---

## Runner-ups

- **Gray, Kou, Battles, Hoggatt & Toombs, CHI 2018** — five dark-pattern strategies (above); the vocabulary to use in reports. OA 851.
- **Reinecke, Yeh, Miratrix, Mardiko, Zhao, Liu & Gajos, CHI 2013** — colourfulness + complexity metrics predict ~half of 500 ms appeal; the measurable arm of #5. OA 310.
- **Frøkjær, Hertzum & Hornbæk, CHI 2000** — effectiveness, efficiency and satisfaction are weakly or not correlated; 11 of 19 CHI studies measured only one or two. S2 769. Rule: report all three per task, never infer one from another.
- **Luguri & Strahilevitz, J. Legal Analysis 2021** — the only large RCT quantifying dark-pattern lift (11.3% → 25.4% → 37.2%). OA 409.
- **Fogg, Persuasive 2009** — Behaviour = Motivation × Ability × Trigger at the same moment. OA 2,309. A model, not a study [H]; still the cleanest check for "why would they come back".

Also evaluated, not selected: Hart & Staveland 1988 NASA-TLX (S2 14,526 — workload instrument
for high-load pro tools, rarely applicable); Moshagen & Thielsch 2010 VisAWI (≈480, source
unverified — four facets simplicity / diversity / colourfulness / craftsmanship, a good rubric
but no threshold); Card, Moran & Newell 1983 (KLM expert-time estimates; book); Bargas-Avila &
Hornbæk 2011 (Scopus 497; 66 studies — UX research is mostly short-term lab questionnaires;
no audit rule); Schrepp UEQ (another validated scale; SUS/UMUX-Lite suffice).

---

## What the skill is missing

- **`usability.md`** — new paragraph after the heuristics table, "Evaluation coverage":
  "A single evaluator finds 20–51% of problems (Nielsen & Molich 1990); 5 users find ~85% on
  average but as few as 55% (Nielsen & Landauer 1993; Faulkner 2003). Team mode: ≥ 3 independent
  agents walk each core journey. Solo mode: head the report 'single-evaluator pass, expect ~1/3
  coverage'. When recommending research: 5 users per round, iterate, not one 15-user round."
- **`usability.md`** — replace the "Aesthetic-usability" bullet with:
  "**Aesthetic-usability** — perceived usability follows the look even after use (Tractinsky
  2000); prettier versions score higher on perceived usability and *worse* on task time (Tuch
  et al. 2012). Judge by task success. If visual craft ≥ 8/10 and a core task fails, raise that
  finding one severity level — the halo hides it from the team's own testing."
- **`usability.md`** — add to Laws of UX:
  "**Three measures, not one** — effectiveness, efficiency and satisfaction are weakly or not
  correlated (Frøkjær, Hertzum & Hornbæk 2000). Every task finding reports completion, time
  and the user's rating separately; never infer one from another."
- **`emotional.md`** — under the Visceral row, add the test:
  "Flash test: show the first screenshot 0.5 s, then blurred; rate appeal 1–100 beside the top
  competitor's. The verdict forms in ~50 ms and is stable (Lindgaard 2006); only gestalt
  counts — balance, colour harmony, image quality, whitespace."
- **`visual-design.md`** — new row in the layout table, "Visual complexity (first impression)":
  "Above the fold count distinct hues (> 1% of pixels), distinct text sizes, bounded regions;
  check layout against category convention (logo top-left, nav top, search/cart top-right, one
  hero + one CTA). Low complexity + conventional layout wins at 50 ms (Tuch 2012); complexity
  + colourfulness explain ~half of appeal (Reinecke 2013). Most complex *and* least
  conventional of the compared screens = P2. Rubric for the direction score: VisAWI facets —
  simplicity, diversity, colourfulness, craftsmanship (Moshagen & Thielsch 2010)."
- **`emotional.md`** — scoring table, new row "Pragmatic vs hedonic":
  "Score task quality and hedonic quality (stimulation, identification) separately
  (Hassenzahl 2004). Identification check: name one value the target user wants to be seen
  with that the product visibly expresses; none = finding. Hedonic ratings don't rise with use
  — 'it grows on you' is not a defence."
- **`usability.md`** (or SKILL.md Phase 0 "real user evidence") — new section "Measured usability":
  "If SUS data exists: mean 68 (Sauro, ~5,000 responses) / ≈ 70 (Bangor et al. 2008, 2,324
  surveys); < 50 not acceptable; ≈ 80 top decile. If none, recommend UMUX-Lite (2 items:
  'capabilities meet my requirements', 'easy to use'; Lewis et al. 2013) on the post-task
  screen. Never present a heuristic score as a measured usability score."
- **`accessibility-performance.md`** — after the response-time line:
  "Users expect ~2 s for simple retrieval (Nah 2004). Any wait > 2 s shows progress: with
  feedback users waited 38 s vs 13 s without, and a third quit at 5–8 s with no feedback.
  After one failed load tolerance drops ~3× (13 → 4 s) — audit the retry path. Industry: bounce
  probability +32% from 1 → 3 s load (Google/SOASTA 2017, not peer-reviewed)."
- **`accessibility-performance.md`** — new subsection "Beyond WCAG":
  "WCAG 2.0 covered only 50.4% of 1,383 problems met by 32 blind users; 16.7% of sites had the
  recommended technique and still failed (Power et al. 2012). Every audit: one screen-reader
  walkthrough (VoiceOver / NVDA / TalkBack) of a core journey. Findings without an SC still
  count: can't find content by headings/landmarks, unannounced result changes, reading order
  that doesn't match the task."
- **`emotional.md`** — ethics gate, add types and tests:
  "- **Activity messages** — fake 'X people viewing / bought'. - **Testimonials of uncertain
  origin**. - **Pressured selling** — pricier option preselected or pushed on the path.
  Verify, don't assume: reload — does the countdown reset? Compare two sessions — do stock and
  viewer counts change honestly? Check the network log for urgency/social-proof widgets (22
  vendors sell them turnkey; ~11% of 11K shops ran them, more on popular sites — Mathur 2019).
  Mild patterns are not lower severity: in a 1,963-person RCT they more than doubled acceptance
  of a dubious paid plan (11.3% → 25.4%) with no backlash; aggressive ones reached 37.2%
  (Luguri & Strahilevitz 2021)."
- **`engagement-retention.md`** — under "What pulls them into session 2?":
  "Check all three at the same moment (Fogg 2009 [H]): motivation (a result or value waiting),
  ability (one tap to it), trigger (notification, ritual time, open loop). A trigger with
  nothing waiting is nagging, not retention."
