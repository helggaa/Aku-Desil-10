# Build Tasks

Suggested order. Each task should be small enough to verify independently.

## v1 build

1. **Scaffold files** — `index.html`, `style.css`, `script.js` per
   `03-architecture.md`. Empty/skeleton is fine to start.
2. **Build the form** — all fields from `01-requirements.md`, with the
   conditional fields (business profit shown only if "punya usaha" = yes;
   vehicle value fields shown only if count > 0).
3. **Implement the formula** — `getPerCapitaMonthly`, `getDesil`,
   `normalCDF`, `getAsetScore` exactly as specified in
   `02-formula-spec.md`. Do not alter MU/SIGMA without updating the
   derivation comments.
4. **Build the result screen** — decile headline, plain-language sentence
   per decile (write 10 short variants, roughly matching tone in
   `00-overview.md`; escalate playfulness toward Desil 10 to match the
   app's name/joke), Aset Index display, and the "Bagaimana ini dihitung?"
   expandable section citing BPS per `00-overview.md` sources.
5. **Client-side validation** — per `01-requirements.md` (non-negative
   numbers, household size ≥ 1, defaults to 0 elsewhere).
6. **Mobile-first styling** — this audience is assumed mobile-majority
   (see `00-overview.md`). Test at narrow viewport widths first.
7. **Privacy self-check** — before considering this done, grep the code
   for any `fetch`, `XMLHttpRequest`, `<script src="http`, cookie, or
   `localStorage` usage and confirm none exist, per `04-privacy.md`.
8. **Deploy to GitHub Pages** — no build step needed; enable Pages on the
   repo pointing at the root or `/docs`, whichever the user prefers.

## Explicitly deferred (do not build without separate confirmation)

- Subtracting `monthly_expenses` from the formula (see
  `02-formula-spec.md` §1 for why it's collected but unused in v1).
- Any shareable result card/image export.
- Any crowdsourced/live comparison feature (would require reintroducing a
  backend — see `03-architecture.md`).
- Recalibrating MU/SIGMA — only do this against a fresh BPS Susenas
  release (March/September), and update the derivation numbers in
  `02-formula-spec.md` §2 to match, don't just swap constants silently.
