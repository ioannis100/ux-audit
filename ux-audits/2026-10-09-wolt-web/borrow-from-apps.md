# Borrow & adapt — Wolt web (experience-director, short version)

Scope set by the orchestrator: Uber Eats and Apple, kept short. Mechanics come from
`references/app-mechanics.md` (PC §1, PC §3, FO §2). None of them was recorded live in this run;
the specs are starting values [H] unless tagged [S].

## Borrow from Uber Eats
### Upfront price → an "all-in" bar and an honest offer line
- As-is fits? **Translate.** Wolt's bar already shows the total. What's missing is the certainty the
  offer gives: the €5 never shows in any total, and its terms say "select at checkout".
- Our version: venue bar and basket · "€14.50 · €5 off unlocked, applied at checkout (new customers)"
  · spec in M-02 · metric: offer redemption rate and checkout starts · effort S · builds on M-02, F-EXP-04.
- Ethics: state eligibility in the same line; never show "unlocked" to someone who isn't eligible.
- Don't copy: fees or service charges revealed only after the commit button.

### Staged tracker + "latest arrival by" → not reachable as a guest
- As-is fits? Yes for signed-in orders (Wolt has its own countdown hero). Not audited: tracking is
  behind sign-in.

### Per-dish thumbs → "your usual" for guests
- As-is fits? **Translate.** Guests can't rate. The engine kept is a low-cost investment that loads a
  future trigger. Our version: the guest basket already persists per venue ("Continue order?"), so
  surface it on the city page as "Your basket at Delulu · 1 item · €10.50 → Continue" (P-01).
  Metric: basket recovery rate · effort S.
- Don't copy: auto-adding the previous order or pre-ticking extras.

### Uber One → Wolt+ placement
- As-is fits? Wolt already gates it well for guests: just a "Wolt+" filter chip in the Restaurants
  list, no banners (`walk3-results.json`). Keep it that way. Show the Wolt+ saving only on the
  checkout line, where it is true for this basket.
- Don't copy: membership upsells between the add and the basket.

## Borrow from Apple
### Calm money check → "order sent" (not reached, spec only)
- Our version: after Place order, a circle-to-check stroke of 300–400 ms [H], `.success` haptic in the
  apps, then the order number and the ETA range with the first stage ticked (benchmark §3.10). No
  confetti. Metric: post-order anxiety tickets ("did my order go through?").

### Shared-element zoom (Photos, App Store cards) → card → venue and card → item
- Our version: M-01 / M-03 (`view-transition-name` on the card image and the hero, 0.35–0.45 s spring,
  bounce 0) · metric: menu-browse depth and time to first add · effort M.
- Don't copy: decorative zooms on frequent actions (the steppers are already right without them).

### Wallet pass → an order pass (native apps only)
- Out of scope for web. Note it for the native team: ETA and pickup code on the Lock Screen.

## Top 5 ideas to build first
| # | Idea (apps) | Builds on | Impact | Effort | Score | Metric | Cheapest test |
|---|---|---|---|---|---|---|---|
| 1 | "€5 off unlocked" beat + all-in line (Uber Eats upfront price + Apple calm check) | M-02, F-EXP-04 | H | S | 9 | offer redemption, checkout starts | A/B on the offer pill copy |
| 2 | Resume basket card on the city page (Uber Eats cart badge / Domino's "your usual") | P-01 | H | S | 9 | basket recovery | 2-week holdout |
| 3 | Pressed state + kept screen + shared element on card → venue / item (Apple) | M-01, M-03 | M | M | 4 | time to first add, bounce on venue | 5-user test on the strips |
| 4 | Sign-in as a sheet over the basket, titled with the order (Apple Pay express / guest-first) | M-04 | H | M | 6 | wall → signed-in conversion | A/B wall vs sheet |
| 5 | Local-only favourites for guests, merged on sign-in (Airbnb wishlist) | P-02 | M | M | 4 | return visits by guests | fake door: count heart taps |
