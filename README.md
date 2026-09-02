# Aku Desil 10 ☝️🤓

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Website-orange?style=flat&logo=googlechrome&logoColor=white)](https://helggaa.github.io/Aku-Desil-10/)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg)](LICENSE)
[![Vanilla JS](https://img.shields.io/badge/Stack-Vanilla%20JS%20%7C%20HTML5%20%7C%20CSS-blue.svg)](index.html)
[![Privacy](https://img.shields.io/badge/Privacy-100%25%20In--Browser%20(Zero%20Telemetry)-emerald.svg)](SECURITY.md)

🌐 **Akses Langsung Aplikasi (Live Demo):** [https://helggaa.github.io/Aku-Desil-10/](https://helggaa.github.io/Aku-Desil-10/)

> **📌 Penafian Resmi (Disclaimer):**  
> Aplikasi ini adalah alat **simulasi & estimasi statistik mandiri** berbasis standar Bank Dunia (*World Bank*) dan Indikator Kemiskinan Multidimensi (*Multidimensional Poverty Index - MPI*) untuk tujuan edukasi dan literasi data publik. Aplikasi ini **tidak berafiliasi dengan lembaga pemerintah mana pun** (Kemensos, BPS, DTSEN, dll.) dan tidak dapat digunakan sebagai dasar penetapan maupun pencabutan program bantuan sosial atau subsidi resmi.

---

## 📸 Antarmuka Aplikasi

<div align="center">
  <img src="assets/preview-landing.png" alt="Tampilan Halaman Pembuka Aku Desil 10" width="700">
  <p><em>Halaman Pembuka (Opening View)</em></p>
  
  <br>
  
  <img src="assets/preview-form.png" alt="Tampilan Formulir Pengisian Data Ekonomi" width="700">
  <p><em>Halaman Formulir Input Data Ekonomi & 5 Dimensi Multidimensi (Form View)</em></p>
</div>

---

## 🌟 Latar Belakang & Masalah Standar Kemiskinan

Banyak warga masyarakat bingung mengapa pendapatan yang pas-pasan (misal Rp 2–3 juta di perkotaan) kerap diklaim oleh sistem algoritma tertutup pemerintah (*proxy-means testing*) sebagai **"Desil 10 / 10% Terkaya"**. 

Hal ini terjadi karena **Garis Kemiskinan Nasional (BPS)** dipatok sangat rendah (hanya sekitar **Rp 641.443 / orang / bulan** atau ~Rp 21.000 / hari). Akibat baseline yang sangat rendah ini, seseorang dengan pengeluaran > Rp 1.540.000 / kapita sudah langsung terdorong ke Desil 10 nasional, padahal daya belinya masih rentan dan mungkin menanggung beban sakit kronis atau hunian substandar.

**Aku Desil 10** mengintegrasikan **Standar Bank Dunia (*World Bank*) & Evaluasi Multidimensi (MPI)**:
- Menggunakan metodologi resmi Bank Dunia (*Aspiring Indonesia: Expanding the Middle Class* & *World Bank PIP*).
- Menghitung daya beli riil dalam **USD PPP (Purchasing Power Parity)** per hari ($1\text{ USD PPP} \approx \text{Rp } 5.420$).
- Memperhitungkan **5 Pilar Kesejahteraan Multidimensi**: Pendidikan, Kualitas Hunian, Sanitasi & Air Bersih (WASH), Beban Penyakit Kronis/Disabilitas, serta Kapasitas Daya Listrik & Aset/Ternak.

---

## 📋 5 Pilar Evaluasi Multidimensi (MPI)

1. **Tingkat Pendidikan**: Melihat jenjang pendidikan tertinggi anggota keluarga (Tidak Sekolah/SD, SMP, SMA/SMK, Diploma, hingga Sarjana S1/S2/S3) sebagai modal manusia (*Human Capital*).
2. **Kondisi & Kualitas Tempat Tinggal**: Mengukur luas lantai per kapita ($\text{m}^2/\text{orang}$), jenis lantai (keramik vs tanah), dinding (bata vs bambu), atap (genteng vs rumbia), dan status kepemilikan.
3. **Akses Sanitasi & Air Minum (WASH)**: Sumber air minum aman (kemasan/PDAM vs sungai) dan fasilitas jamban leher angsa dengan tangki septik.
4. **Kesehatan & Disabilitas**: Memperhitungkan beban pengeluaran rutin akibat riwayat penyakit kronis/menahun (gagal ginjal, jantung, kanker, diabetes, stroke) dan kebutuhan pendampingan disabilitas berat.
5. **Kapasitas Daya & Aset Produktif**: Kapasitas daya listrik PLN (450 VA bersubsidi s/d $\ge 3.500\text{ VA}$), kendaraan bermotor, perangkat elektronik, hewan ternak (sapi/kambing/unggas), lahan produktif, dan simpanan emas/tabungan.

---

## 📐 Metodologi & Kalibrasi Standar Bank Dunia

### 1. Kapasitas Ekonomi & Penyesuaian Multidimensi
$$\text{Kapasitas Moneter Per Kapita} = \frac{\text{Gaji Bulanan} + \left(\frac{\text{Laba Usaha Tahunan}}{12}\right)}{\text{Jumlah Anggota Keluarga}}$$

$$\text{Kapasitas Efektif} = \text{Kapasitas Moneter} \times (1 + \Delta_{\text{Pendidikan}} + \Delta_{\text{Hunian}} + \Delta_{\text{Sanitasi}} + \Delta_{\text{Listrik}} - \Delta_{\text{Beban Kesehatan}})$$

$$\text{Kapasitas Harian (USD PPP)} = \frac{\text{Kapasitas Efektif}}{30,416 \times 5.420}$$

### 2. Lima Kelas Ekonomi Bank Dunia (*World Bank Aspiring Indonesia*)

| Kelompok Ekonomi Bank Dunia | Kelipatan Garis BPS | Pengeluaran / Kapita / Bulan | Persentase Populasi Indonesia |
|---|---|---|---|
| **1. Poor (Miskin Ekstrem)** | $< 1.0\times$ | $< \text{Rp } 641.443$ | ~8.0% |
| **2. Vulnerable (Rentan Miskin)** | $1.0 - 1.5\times$ | $\text{Rp } 641.443 - \text{Rp } 962.165$ | ~15.6% |
| **3. Aspiring Middle Class (Menuju Menengah)** | $1.5 - 3.5\times$ | $\text{Rp } 962.165 - \text{Rp } 2.245.051$ | **45% (115 Juta Jiwa)** |
| **4. Middle Class Sejati (Aman Finansial)** | $3.5 - 17\times$ | $\text{Rp } 2.245.051 - \text{Rp } 10.904.531$ | ~20% |
| **5. Upper Class (Desil 10 Sejati)** | $> 17\times$ | **$> \text{Rp } 10.904.531$** | **~10% Teratas** |

### 3. Batas 10 Desil Standar Bank Dunia (IDR/Bulan/Kapita)
| Desil | Rentang Rupiah / Bulan | Setara USD PPP / Hari | Kategori Standar Bank Dunia |
|---|---|---|---|
| **Desil 1** | $< \text{Rp } 641.443$ | $< \$3.89$ | Poor (Garis Kemiskinan Nasional & LMIC) |
| **Desil 2** | $\text{Rp } 641.443 - \text{Rp } 962.165$ | $\$3.89 - \$5.84$ | Vulnerable (Rentan Miskin / 1.5x Garis BPS) |
| **Desil 3** | $\text{Rp } 962.165 - \text{Rp } 1.350.000$ | $\$5.84 - \$8.19$ | Aspiring Middle Class (Garis UMIC $6.85 Bank Dunia) |
| **Desil 4** | $\text{Rp } 1.350.000 - \text{Rp } 1.750.000$ | $\$8.19 - \$10.62$ | Aspiring Middle Class (Menuju Kelas Menengah) |
| **Desil 5** | $\text{Rp } 1.750.000 - \text{Rp } 2.245.051$ | $\$10.62 - \$13.62$ | Aspiring Middle Class Atas (3.5x Garis BPS) |
| **Desil 6** | $\text{Rp } 2.245.051 - \text{Rp } 3.500.000$ | $\$13.62 - \$21.23$ | Middle Class Pemula (Ambang Kelas Menengah Aman) |
| **Desil 7** | $\text{Rp } 3.500.000 - \text{Rp } 5.200.000$ | $\$21.23 - \$31.54$ | Middle Class Inti (Kelas Menengah Mapan) |
| **Desil 8** | $\text{Rp } 5.200.000 - \text{Rp } 7.500.000$ | $\$31.54 - \$45.50$ | Upper-Middle Class (Menengah Atas) |
| **Desil 9** | $\text{Rp } 7.500.000 - \text{Rp } 10.904.531$ | $\$45.50 - \$66.15$ | Near Upper Class (Puncak Kelas Menengah / 17x BPS) |
| **Desil 10 ☝️🤓** | **$> \text{Rp } 10.904.531$** | **$> \$66.15$** | **Upper Class Sejati Bank Dunia (> 17x BPS)** |

### 4. Formula Pembobotan Aset Index
$$\begin{aligned}
\text{Aset Index} = & \;(\text{Luas Rumah} \times 500.000) + (\text{Luas Lahan Lain} \times 300.000) + (\text{Nilai Ternak} \times 0.5) \\
& + (\text{Mobil} \times \text{Nilai Mobil} \times 0.1) + (\text{Motor} \times \text{Nilai Motor} \times 0.1) \\
& + (\text{HP} \times \text{Nilai HP} \times 0.2) + (\text{Laptop} \times \text{Nilai Laptop} \times 0.2) + (\text{Elektronik} \times 0.2) \\
& + (\text{Emas \& Tabungan} \times 0.5)
\end{aligned}$$

---

## 🚀 Cara Menjalankan

### A. Buka Langsung (Lokal)
Cukup buka file `index.html` di browser modern apa pun (*Chrome, Firefox, Safari, Edge*). Tidak memerlukan instalasi atau backend.

### B. Akses GitHub Pages
Website aktif dan dapat langsung dibuka di:  
👉 **[https://helggaa.github.io/Aku-Desil-10/](https://helggaa.github.io/Aku-Desil-10/)**

---

## 📜 Lisensi
Didistribusikan di bawah Lisensi [MIT](LICENSE). Dibuat untuk transparansi publik dan edukasi literasi ekonomi Indonesia.
