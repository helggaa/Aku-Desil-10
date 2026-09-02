# Aku Desil 10 ☝️🤓 — Project Overview

## What this is

A single-page web app where a user answers a short anonymous form about their
household economics and instantly gets told which **desil** (decile, 1–10)
of Indonesia's population they fall into, based on per-capita monthly
economic capacity.

## Why it exists

Indonesia's government runs an official decile system called **DTSEN**
(Data Tunggal Sosial dan Ekonomi Nasional), managed by Kemensos + BPS. It
ranks every family into Desil 1 (poorest 10%) through Desil 10 (richest
10%) using an undisclosed weighted mix of job/education, housing condition,
electricity access, and asset ownership. It's used to gate subsidies (BBM,
LPG, electricity, PKH, BPNT, etc.) and is politically controversial —
people frequently report being misclassified, and as of Aug 2026 the
government is moving to bar Desil 9–10 from subsidized fuel entirely.

This project is a transparent alternative: same 1–10 decile concept, but
built on a public, reproducible formula (see `03-formula-spec.md`) instead
of a hidden scoring algorithm, and with the privacy guarantee that DTSEN
doesn't offer — no data ever leaves the user's browser.

## Non-goals

- Not a replacement for or integration with DTSEN/Kemensos systems.
- Not collecting or claiming to affect anyone's real bansos/subsidy
  eligibility. It's an independent, unofficial, single-purpose estimator.
- Not a multi-user platform. No accounts, no login, no backend, no
  database. See `04-architecture.md` for why.

## Tone / branding

- Name: **Aku Desil 10 ☝️🤓** (keep the emoji in the page title / header —
  it's part of the joke: it reads as a flex ("I'm Desil 10") while the
  actual point is showing people an honest, transparent number instead of
  a black box).
- Should feel a bit cheeky/self-aware, not like a government form. Casual
  Indonesian/English mix is fine in copy.

## Audience

Indonesian users, mobile-first (assume most traffic is on phones), no
prior knowledge of statistics required — the result screen should explain
itself in plain language, not just show "Desil 7."

## Source of truth for numbers used in this spec

- BPS press release, poverty line & poverty rate, Sept 2025:
  Rp 641,443/kapita/bulan, 8.25% of population below it.
  https://www.bps.go.id/id/pressrelease (Susenas Sept 2025 release)
- BPS "Metode Baru" adjusted per-capita expenditure, 2025 annual figure:
  Rp 12,802,000/year (≈ Rp 1,066,833/month).
- BPS Gini ratio, national, semester 1 2026: 0.368 (for context only —
  not used directly in the fitted formula, see `03-formula-spec.md`).
- BPS decile methodology confirmation: BPS itself classifies population
  into 10 expenditure-based deciles from per-capita spending
  (https://cekbansos.kemensos.go.id/ explains DTSEN's own decile
  definition; BPS Susenas is the underlying survey for the *real*
  expenditure deciles referenced in press coverage like
  binokular.net/en/2026/08/28/sachet-economy...).

These figures should be re-verified and the formula recalibrated when BPS
releases new Susenas data (twice yearly, March and September) — see
`06-tasks.md`.
