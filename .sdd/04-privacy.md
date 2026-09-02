# Privacy Requirements

These are hard constraints, not preferences. Any implementation that
violates these should be treated as a bug, regardless of how it got
introduced (e.g. a "helpful" analytics snippet added later, a form field
that creeps toward asking for contact info, etc.).

## Rules

1. **No personally identifying data is ever collected.** No name, email,
   phone number, NIK/KTP, address, or any field that could reasonably
   identify a specific person or household. If a future feature request
   would require one of these, flag it explicitly rather than adding it
   silently — it likely conflicts with the project's core premise.
2. **No data leaves the browser.** No `fetch`/`XMLHttpRequest` calls to
   any server, no third-party analytics (Google Analytics, etc.), no
   third-party fonts/scripts that could fingerprint or track (self-host
   any fonts if needed). See `03-architecture.md` for why there's no
   backend at all.
3. **No cookies, no localStorage/sessionStorage of form data beyond the
   current session's in-memory JS state.** If "save my last result"
   becomes a desired feature later, that's an explicit, separate decision
   to make with the user — not a default to add.
4. **The "Bagaimana ini dihitung?" transparency section is a privacy
   feature, not just a UX nicety** — showing the formula openly is what
   distinguishes this from DTSEN's opaque scoring. Don't cut it for the
   sake of a shorter build.

## Rationale

The entire pitch of this project (see `00-overview.md`) is that it's the
transparent, privacy-respecting alternative to a government system people
already distrust for being opaque. Any data collection beyond what's
listed in `01-requirements.md` undermines that pitch even if well
intentioned.
