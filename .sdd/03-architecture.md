# Architecture

## Stack

- **Plain HTML + CSS + vanilla JavaScript.** No framework, no build step,
  no bundler, no npm dependencies required. This is a deliberate choice —
  the app is one form and one calculation, a framework would be
  overengineering.
- **Hosting: GitHub Pages**, free tier, static files only.
- **No backend. No database. No API calls of any kind.**

## Why no backend

This was an explicit design decision, not an oversight:

1. The headline "Desil" number doesn't need live/shared data — it's
   computed from a formula calibrated once (offline, by a human, from
   published BPS statistics) and baked into the JS as constants
   (`MU`/`SIGMA` in `02-formula-spec.md`). Nothing about computing it
   requires a server round-trip.
2. Going backend-less is a *stronger* privacy story than "we store your
   data but promise not to identify you" — the honest claim becomes "we
   never receive your data at all," which is verifiable by anyone reading
   the source (it's a static site, view-source shows everything).
3. Simpler to build, zero hosting cost beyond GitHub Pages, zero attack
   surface, nothing to maintain.

## File structure (suggested)

```
/
├── index.html          # landing + form + result, single page
├── style.css
├── script.js            # form handling + formula (02-formula-spec.md) + render result
└── README.md            # public-facing, not this .sdd folder
```

A single-page approach (show/hide sections with JS, no routing) is
sufficient — there's no need for multiple HTML files or a router.

## Explicitly out of scope for v1 (do not build unless asked)

- Any backend service (Firebase, Supabase, custom API, etc.)
- Any live/crowdsourced "compare against other users" feature — this was
  considered and intentionally dropped in favor of the backend-less
  approach. If revisited later, it's a separate future feature, not part
  of this build.
- Accounts, login, sessions, cookies, analytics/tracking scripts.
- A CI/build pipeline — GitHub Pages can serve the raw files directly with
  no build step.
