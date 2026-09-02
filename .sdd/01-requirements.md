# Requirements

## User flow

1. Landing screen: short explanation of what the site does + why (see
   `00-overview.md`), a "Mulai" / "Start" button.
2. Form screen: fields below, single page or short multi-step, no
   account/login.
3. Result screen: shows Desil (1–10) headline, the plain-language
   explanation, and the separate Aset Index (see `03-formula-spec.md`).
   Also show the methodology briefly + link/expand to full sources.
4. No data is sent anywhere. No "submit" to a server. The button labeled
   "Lihat Hasil" / "See Result" just runs the JS calculation in-browser.

## Form fields

All fields required unless noted. Keep the form short — this is the
product's whole value prop (fast, no friction, no signup).

| Field | Type | Notes |
|---|---|---|
| Pekerjaan (occupation) | select | Options: Pelajar/Mahasiswa (student), Tidak bekerja (not working), Karyawan/Pegawai (employee), Wiraswasta (business owner), Lainnya (other). Purely contextual/display — does not feed the decile formula directly, wages/profit do. |
| Jumlah anggota keluarga (household size) | number | **Required for the formula** — used as the per-capita divisor. Minimum 1. |
| Gaji bulanan (monthly wages) | number (IDR) | Default 0 if none. |
| Punya usaha? (has a business) | boolean | If yes, show next field. |
| Keuntungan bersih usaha (net business profit) | number (IDR) | Ask for **annual** figure, then divide by 12 in code — clearer for users who think in annual terms (harvest cycles, seasonal business, etc.). Label the field clearly as "per tahun" (per year). Default 0 if no business. |
| Pengeluaran bulanan (monthly expenses) | number (IDR) | Collected for context/display, not subtracted from income in the v1 formula — see `03-formula-spec.md` note on why. |
| Luas rumah (house size, m²) | number | For Aset Index. 0 if renting/no house. |
| Jumlah mobil (car count) | number | For Aset Index. |
| Nilai rata-rata mobil (avg car value, IDR) | number | Only shown if car count > 0. |
| Jumlah motor (motorcycle count) | number | For Aset Index. |
| Nilai rata-rata motor (avg motorcycle value, IDR) | number | Only shown if motor count > 0. |
| Kendaraan lain (other vehicles, value IDR) | number | Optional, default 0. |

## Validation rules

- All numeric fields: non-negative, default to 0 if left blank (except
  household size, which must be ≥ 1 — never 0, since it's a divisor).
- No field collects name, email, NIK, phone number, address, or any other
  identifying data. This is a hard requirement, not a nice-to-have — see
  `05-privacy-security.md`.
- Client-side validation only (no server to validate against).

## Result screen requirements

- Show the Desil number (1–10) prominently.
- One-sentence plain-language explanation of what that means (e.g. "Kamu
  berada di 10% teratas secara ekonomi di Indonesia" for Desil 10).
- Show the Aset Index as a separate number, clearly labeled as *not*
  affecting the Desil number — it's supplementary context.
- Include a collapsible/expandable "Bagaimana ini dihitung?" (How is this
  calculated?) section that shows the actual formula and cites BPS as the
  source — this transparency is the whole differentiator from DTSEN, don't
  skip it or bury it.
- No sharing/export feature required for v1 (could be a nice-to-have
  later — e.g. a shareable image card — but not required).
