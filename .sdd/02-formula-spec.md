# Formula Spec

This is the core logic. Implement exactly as specified — the numbers are
derived (not arbitrary) and explained below so future edits don't silently
break the calibration.

## 1. Per-capita monthly economic capacity

```
per_capita_monthly = (monthly_wages + (annual_business_profit / 12)) / household_size
```

- `household_size` must be ≥ 1 (validated in the form, see `01-requirements.md`).
- This matches BPS's own methodology: Indonesia's real poverty/inequality
  statistics are based on **per-capita expenditure/income**, not household
  totals and not asset-proxy scoring. This is the same quantity BPS uses
  to compute the real national deciles reported in the press (see
  `00-overview.md` sources).
- v1 does **not** subtract `monthly_expenses` from this figure. Reasoning:
  BPS's own per-capita figure is a gross expenditure/income measure, and
  self-reported "expenses" are unreliable and easy to undercount
  deliberately (understating expenses doesn't change your decile, but
  overstating them would let users game a lower result if we subtracted).
  Expenses are collected for future use (see `06-tasks.md`) but not part
  of the v1 formula.

## 2. Decile lookup — lognormal CDF

The per-capita figure is converted to a decile (1–10) using a lognormal
distribution fitted to two real, current BPS data points:

- **Poverty line anchor**: Rp 641,443/kapita/bulan = the 8.25th percentile
  (BPS Susenas, Sept 2025 release).
- **Mean anchor**: Rp 1,066,833/month = BPS's 2025 adjusted per-capita
  expenditure mean (Rp 12,802,000/year ÷ 12).

Solving `ln(X) ~ Normal(μ, σ)` for both anchors simultaneously gives:

```
MU = 13.8265
SIGMA = 0.328
```

(Derivation: from the poverty-line anchor, `μ = ln(641443) + 1.388·σ` where
1.388 is the z-score for the 8.25th percentile. Substituting into the
mean-anchor equation `μ + σ²/2 = ln(1066833)` and solving the resulting
quadratic in σ gives σ ≈ 0.328, then μ ≈ 13.8265. Sanity check: the
resulting median, exp(μ) ≈ Rp 1,011,000, sits just below the mean as
expected for a right-skewed distribution, and the poverty line lands right
at the bottom of the Desil 1 bucket — consistent with the real 8.25%
poverty rate.)

### Resulting decile boundaries (monthly per-capita IDR)

| Desil | Lower bound | Upper bound |
|---|---|---|
| 1 | 0 | 664,000 |
| 2 | 664,000 | 767,000 |
| 3 | 767,000 | 851,000 |
| 4 | 851,000 | 931,000 |
| 5 | 931,000 | 1,011,000 |
| 6 | 1,011,000 | 1,099,000 |
| 7 | 1,099,000 | 1,201,000 |
| 8 | 1,201,000 | 1,333,000 |
| 9 | 1,333,000 | 1,539,000 |
| 10 | 1,539,000 | ∞ |

These are provided as a readable reference table, but **implement the
calculation via the CDF function below**, not a hardcoded if/else ladder —
it's more precise and makes recalibration (updating MU/SIGMA only) trivial.

### Reference implementation (JavaScript)

```javascript
const MU = 13.8265;
const SIGMA = 0.328;

// Standard normal CDF via Abramowitz-Stegun approximation of erf.
function normalCDF(z) {
  const t = 1 / (1 + 0.3275911 * Math.abs(z));
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t
             - 0.284496736) * t + 0.254829592) * t * Math.exp(-z * z);
  return 0.5 * (1 + Math.sign(z) * y);
}

function getPerCapitaMonthly({ monthlyWages, annualBusinessProfit, householdSize }) {
  const size = Math.max(1, householdSize);
  const monthly = (monthlyWages || 0) + ((annualBusinessProfit || 0) / 12);
  return Math.max(1, monthly / size); // floor at 1 to keep log() safe
}

function getDesil(perCapitaMonthly) {
  const z = (Math.log(perCapitaMonthly) - MU) / SIGMA;
  const percentile = normalCDF(z);
  return Math.min(10, Math.floor(percentile * 10) + 1);
}
```

## 3. Aset Index (separate, not part of the decile)

Shown alongside the decile as context, not folded into it — this keeps the
core number auditable and matches the "transparent weights" pitch.

```javascript
function getAsetScore({
  houseSizeM2 = 0,
  carCount = 0,
  carAvgValue = 0,
  motorCount = 0,
  motorAvgValue = 0,
  otherVehicleValue = 0,
}) {
  return (houseSizeM2 * 500_000)
       + (carCount * carAvgValue * 0.1)
       + (motorCount * motorAvgValue * 0.1)
       + (otherVehicleValue * 0.1);
}
```

- Not calibrated against a national distribution (no equivalent public BPS
  asset-value dataset to anchor it the way the decile is anchored). Display
  it as a raw IDR figure ("Aset Index: Rp X"), not a rank/percentile.
- The weights (500,000/m², 0.1× on vehicle values) are arbitrary starting
  points meant to be visible and editable, not authoritative — say so in
  the "Bagaimana ini dihitung?" UI section (see `01-requirements.md`).

## 4. Known limitations (state these in the UI, not just here)

1. Lognormal is an approximation of the real income/expenditure
   distribution — good for a 1-of-10 bucket, not for precise rupiah-level
   claims.
2. BPS releases new Susenas poverty-line and mean-expenditure figures
   twice a year (March, September). MU/SIGMA should be recalculated when
   new data drops — see `06-tasks.md`.
3. This measures *expenditure capacity*, not net worth/wealth. Someone
   with a huge house and no income scores low here despite being
   "rich" by DTSEN's asset-based logic — that's intentional (see
   `00-overview.md`), but should be explained, not hidden.
4. All inputs are self-reported and unverified. There's no mechanism (and
   deliberately no backend) to check honesty.
