/**
 * Aku Desil 10 ☝️🤓
 * Architecture: Modular MVC Controller
 * Privacy: 100% In-Memory Client-Side Evaluation (0 Telemetry)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. Navigation Controller (3-Phase Flow: Opening -> Form -> Results)
  // =========================================================================
  const NavigationController = (() => {
    const views = {
      opening: document.getElementById('view-opening'),
      form: document.getElementById('view-form'),
      results: document.getElementById('view-results')
    };

    function showView(viewKey) {
      Object.entries(views).forEach(([key, element]) => {
        if (!element) return;
        const isActive = key === viewKey;
        element.classList.toggle('active', isActive);
        element.classList.toggle('hidden', !isActive);
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return { showView };
  })();

  // =========================================================================
  // 2. Privacy Modal Controller (<dialog> Standard API)
  // =========================================================================
  const PrivacyModalController = (() => {
    const modal = document.getElementById('privacy-dialog');
    const btnOpenHeader = document.getElementById('btn-open-privacy-header');
    const btnOpenFooter = document.getElementById('btn-open-privacy-footer');
    const btnClose = document.getElementById('btn-close-privacy');
    const btnDismiss = document.getElementById('btn-dismiss-privacy');

    function openModal() {
      if (!modal) return;
      if (typeof modal.showModal === 'function') {
        modal.showModal();
      } else {
        modal.classList.remove('hidden');
      }
    }

    function closeModal() {
      if (!modal) return;
      if (typeof modal.close === 'function') {
        modal.close();
      } else {
        modal.classList.add('hidden');
      }
    }

    function init() {
      if (btnOpenHeader) btnOpenHeader.addEventListener('click', openModal);
      if (btnOpenFooter) btnOpenFooter.addEventListener('click', openModal);
      if (btnClose) btnClose.addEventListener('click', closeModal);
      if (btnDismiss) btnDismiss.addEventListener('click', closeModal);

      if (modal) {
        // Dismiss on backdrop click
        modal.addEventListener('click', (e) => {
          const rect = modal.getBoundingClientRect();
          const isInDialog = (
            rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
            rect.left <= e.clientX && e.clientX <= rect.left + rect.width
          );
          if (!isInDialog) closeModal();
        });
      }
    }

    return { init };
  })();

  // =========================================================================
  // 3. Mathematical & Economic Engine (World Bank & Multidimensional MPI)
  // =========================================================================
  const EconomicEngine = (() => {
    // World Bank 2021 PPP Conversion Factor for Indonesia (1 USD PPP ≈ IDR 5,420)
    const PPP_FACTOR = 5420;
    const DAYS_PER_MONTH = 30.416;

    // World Bank Aspiring Indonesia Thresholds (Multiples of National Baseline Rp 641,443)
    // Ref: World Bank "Aspiring Indonesia: Expanding the Middle Class" & PIP Datasets
    const WB_THRESHOLDS = [
      { desil: 1, maxIDR: 641443, maxPPP: 3.89, label: 'Poor (Di bawah Garis Kemiskinan)', minPercentile: 0.1, maxPercentile: 8.0 },
      { desil: 2, maxIDR: 962165, maxPPP: 5.84, label: 'Vulnerable (Rentan Miskin - 1.5x Garis Kemiskinan)', minPercentile: 8.0, maxPercentile: 23.6 },
      { desil: 3, maxIDR: 1350000, maxPPP: 8.19, label: 'Aspiring Middle Class (Garis UMIC $6.85 Bank Dunia)', minPercentile: 23.6, maxPercentile: 38.0 },
      { desil: 4, maxIDR: 1750000, maxPPP: 10.62, label: 'Aspiring Middle Class (Menuju Kelas Menengah)', minPercentile: 38.0, maxPercentile: 53.0 },
      { desil: 5, maxIDR: 2245051, maxPPP: 13.62, label: 'Aspiring Middle Class Atas (3.5x Garis Kemiskinan)', minPercentile: 53.0, maxPercentile: 68.6 },
      { desil: 6, maxIDR: 3500000, maxPPP: 21.23, label: 'Middle Class Pemula (Ambang Kelas Menengah Aman)', minPercentile: 68.6, maxPercentile: 78.0 },
      { desil: 7, maxIDR: 5200000, maxPPP: 31.54, label: 'Middle Class Inti (Kelas Menengah Mapan)', minPercentile: 78.0, maxPercentile: 84.0 },
      { desil: 8, maxIDR: 7500000, maxPPP: 45.50, label: 'Upper-Middle Class (Menengah Atas)', minPercentile: 84.0, maxPercentile: 88.0 },
      { desil: 9, maxIDR: 10904531, maxPPP: 66.15, label: 'Near Upper Class (Puncak Kelas Menengah / 17x Baseline)', minPercentile: 88.0, maxPercentile: 90.0 },
      { desil: 10, maxIDR: Infinity, maxPPP: Infinity, label: 'Upper Class Sejati Bank Dunia (> 17x Baseline)', minPercentile: 90.0, maxPercentile: 99.9 }
    ];

    function computePerCapitaMonthly({ monthlyWages = 0, annualBusinessProfit = 0, householdSize = 1 }) {
      const size = Math.max(1, householdSize);
      const monthlyTotal = (monthlyWages || 0) + ((annualBusinessProfit || 0) / 12);
      return Math.max(1, monthlyTotal / size);
    }

    function computeDailyUSDPPP(perCapitaMonthly) {
      return (perCapitaMonthly / DAYS_PER_MONTH) / PPP_FACTOR;
    }

    function evaluateMPI({
      educationLevel = 'SMA',
      chronicDisease = 'no',
      disability = 'no',
      houseOwnership = 'Milik Sendiri',
      houseSizeM2 = 36,
      householdSize = 1,
      floorType = 'Keramik/Granit',
      wallType = 'Tembok Bata',
      roofType = 'Genteng/Seng Baik',
      waterSource = 'PDAM/Sumur Bor',
      sanitationFacility = 'Septic Tank Sendiri',
      electricityPower = '1300'
    }) {
      let eduMod = 0;
      let eduTitle = 'Pendidikan Menengah';
      let eduSub = 'SMA / SMK Sederajat';
      if (educationLevel === 'SD') { eduMod = -0.08; eduTitle = 'Pendidikan Dasar'; eduSub = 'Tidak Sekolah / SD'; }
      else if (educationLevel === 'SMP') { eduMod = -0.04; eduTitle = 'Pendidikan Menengah Pertama'; eduSub = 'SMP / MTs Sederajat'; }
      else if (educationLevel === 'Diploma') { eduMod = 0.06; eduTitle = 'Pendidikan Tinggi Vokasi'; eduSub = 'Diploma (D1–D4)'; }
      else if (educationLevel === 'Sarjana') { eduMod = 0.12; eduTitle = 'Modal Manusia Tinggi'; eduSub = 'Sarjana (S1/S2/S3)'; }

      // Health & Disability Burden
      let healthBurden = 0;
      let healthTitle = 'Beban Normal';
      let healthSub = 'Keluarga sehat & mandiri';
      if (chronicDisease === 'yes' && disability === 'yes') {
        healthBurden = -0.30;
        healthTitle = 'Beban Kerentanan Berat';
        healthSub = 'Penyakit kronis & disabilitas berat';
      } else if (chronicDisease === 'yes') {
        healthBurden = -0.18;
        healthTitle = 'Beban Biaya Kronis';
        healthSub = 'Riwayat penyakit kronis/menahun';
      } else if (disability === 'yes') {
        healthBurden = -0.15;
        healthTitle = 'Beban Pendampingan';
        healthSub = 'Anggota disabilitas berat';
      }

      // Housing Quality
      let housingMod = 0;
      let isSubstandardHousing = floorType === 'Tanah/Bambu' || wallType === 'Bambu/Kayu Lapuk' || roofType === 'Rumbia/Seng Rusak';
      const spacePerCapita = Math.max(1, houseSizeM2 / Math.max(1, householdSize));

      if (isSubstandardHousing) housingMod -= 0.15;
      if (spacePerCapita < 8) housingMod -= 0.05; // Overcrowded housing penalty
      if (floorType === 'Keramik/Granit' && wallType === 'Tembok Bata' && roofType !== 'Rumbia/Seng Rusak') housingMod += 0.05;

      let housingTitle = isSubstandardHousing ? 'Rumah Tidak Layak Huni' : 'Rumah Layak Huni';
      let housingSub = `${floorType.split('/')[0]}, ${wallType.split('/')[0]} (${spacePerCapita.toFixed(1)} m²/org)`;

      // WASH (Water, Sanitation & Hygiene)
      let washMod = 0;
      let isPoorWASH = waterSource === 'Sungai/Air Hujan' || sanitationFacility === 'Tanpa Jamban';
      if (waterSource === 'Kemasan/Bermerk') washMod += 0.04;
      if (waterSource === 'Sungai/Air Hujan') washMod -= 0.12;
      if (sanitationFacility === 'Septic Tank Sendiri') washMod += 0.04;
      else if (sanitationFacility === 'Tanpa Jamban') washMod -= 0.15;

      let washTitle = isPoorWASH ? 'Sanitasi & Air Buruk' : (sanitationFacility === 'Septic Tank Sendiri' ? 'Sanitasi Aman & Layak' : 'Sanitasi Bersama/Sederhana');
      let washSub = `${sanitationFacility.split('(')[0].trim()} + ${waterSource.split('/')[0]}`;

      // Electricity
      let electricMod = 0;
      if (electricityPower === '450') electricMod = -0.08;
      else if (electricityPower === '900') electricMod = -0.02;
      else if (electricityPower === '2200') electricMod = 0.05;
      else if (electricityPower === '3500+') electricMod = 0.10;

      const totalMultidimensionalMod = eduMod + healthBurden + housingMod + washMod + electricMod;

      return {
        totalMod: totalMultidimensionalMod,
        housing: { title: housingTitle, sub: housingSub },
        wash: { title: washTitle, sub: washSub },
        education: { title: eduTitle, sub: eduSub },
        health: { title: healthTitle, sub: healthSub }
      };
    }

    function getWorldBankClass(perCapitaMonthly) {
      if (perCapitaMonthly < 641443) return { name: 'Poor (Miskin Ekstrem)', badge: 'Garis BPS / LMIC' };
      if (perCapitaMonthly < 962165) return { name: 'Vulnerable (Rentan Miskin)', badge: '1.0x – 1.5x Baseline' };
      if (perCapitaMonthly < 2245051) return { name: 'Aspiring Middle Class (Menuju Menengah)', badge: '1.5x – 3.5x Baseline' };
      if (perCapitaMonthly < 10904531) return { name: 'Middle Class (Kelas Menengah Aman)', badge: '3.5x – 17x Baseline' };
      return { name: 'Upper Class (Desil 10 Sejati)', badge: '> 17x Baseline' };
    }

    function computeDesil(perCapitaMonthly, mpiMod = 0) {
      // Adjusted Capacity incorporating Multidimensional Poverty / Welfare modifiers
      const effectivePerCapita = Math.max(1, perCapitaMonthly * (1 + mpiMod));
      const dailyPPP = computeDailyUSDPPP(effectivePerCapita);
      const wbClass = getWorldBankClass(effectivePerCapita);

      let matchedIndex = WB_THRESHOLDS.findIndex(t => effectivePerCapita <= t.maxIDR);
      if (matchedIndex === -1) matchedIndex = WB_THRESHOLDS.length - 1;

      const bracket = WB_THRESHOLDS[matchedIndex];
      const prevMax = matchedIndex === 0 ? 0 : WB_THRESHOLDS[matchedIndex - 1].maxIDR;
      
      // Interpolate exact percentile within bracket
      let fraction = 0;
      if (matchedIndex === WB_THRESHOLDS.length - 1) {
        // Logarithmic scale for top decile
        fraction = Math.min(1, Math.log(effectivePerCapita / 10904531) / Math.log(50000000 / 10904531));
      } else {
        fraction = Math.min(1, Math.max(0, (effectivePerCapita - prevMax) / (bracket.maxIDR - prevMax)));
      }

      const percentileExact = Math.min(99.9, Math.max(0.1, bracket.minPercentile + (fraction * (bracket.maxPercentile - bracket.minPercentile))));
      const rawPercentile = percentileExact / 100;
      const desil = bracket.desil;

      return {
        desil,
        decile: desil,
        percentileExact,
        rawPercentile,
        dailyPPP,
        wbClass,
        effectivePerCapita
      };
    }

    function computeAssetIndex({
      houseSizeM2 = 0,
      landSizeM2 = 0,
      livestockValue = 0,
      carCount = 0,
      carAvgValue = 0,
      motorCount = 0,
      motorAvgValue = 0,
      phoneCount = 0,
      phoneAvgValue = 0,
      laptopCount = 0,
      laptopAvgValue = 0,
      otherElectronicsValue = 0,
      goldSavingsValue = 0
    }) {
      const houseVal = houseSizeM2 * 500_000;
      const landVal = landSizeM2 * 300_000;
      const livestockVal = livestockValue * 0.5;
      const carVal = carCount * carAvgValue * 0.1;
      const motorVal = motorCount * motorAvgValue * 0.1;
      const phoneVal = phoneCount * phoneAvgValue * 0.2;
      const laptopVal = laptopCount * laptopAvgValue * 0.2;
      const electronicsVal = otherElectronicsValue * 0.2;
      const goldVal = goldSavingsValue * 0.5;

      return {
        houseVal,
        landVal,
        livestockVal,
        carVal,
        motorVal,
        phoneVal,
        laptopVal,
        electronicsVal,
        goldVal,
        total: houseVal + landVal + livestockVal + carVal + motorVal + phoneVal + laptopVal + electronicsVal + goldVal
      };
    }

    return {
      computePerCapitaMonthly,
      evaluateMPI,
      computeDesil,
      computeAssetIndex
    };
  })();

  // =========================================================================
  // 4. Form Interactions & Formatting Controller
  // =========================================================================
  const FormController = (() => {
    function formatIDR(amount) {
      const num = Math.max(0, parseFloat(amount) || 0);
      return 'Rp ' + Math.round(num).toLocaleString('id-ID');
    }

    function init() {
      // Live Previews
      const previewConfigs = [
        { inputId: 'monthlyWages', previewId: 'preview-monthlyWages', suffix: '' },
        { inputId: 'annualBusinessProfit', previewId: 'preview-annualBusinessProfit', suffix: ' / tahun' },
        { inputId: 'carAvgValue', previewId: 'preview-carAvgValue', suffix: '' },
        { inputId: 'motorAvgValue', previewId: 'preview-motorAvgValue', suffix: '' },
        { inputId: 'phoneAvgValue', previewId: 'preview-phoneAvgValue', suffix: '' },
        { inputId: 'laptopAvgValue', previewId: 'preview-laptopAvgValue', suffix: '' },
        { inputId: 'livestockValue', previewId: 'preview-livestockValue', suffix: '' },
        { inputId: 'otherElectronicsValue', previewId: 'preview-otherElectronicsValue', suffix: '' },
        { inputId: 'goldSavingsValue', previewId: 'preview-goldSavingsValue', suffix: '' }
      ];

      previewConfigs.forEach(({ inputId, previewId, suffix }) => {
        const input = document.getElementById(inputId);
        const preview = document.getElementById(previewId);
        if (!input || !preview) return;

        const update = () => {
          const val = parseFloat(input.value) || 0;
          preview.textContent = formatIDR(val) + suffix;
        };
        input._updatePreview = update;
        input.addEventListener('input', update);
        update();
      });

      // Steppers (+ and - buttons)
      document.querySelectorAll('.stepper-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const targetId = btn.getAttribute('data-target');
          const delta = parseInt(btn.getAttribute('data-delta'), 10) || 0;
          const targetInput = document.getElementById(targetId);
          if (targetInput) {
            const minVal = parseInt(targetInput.getAttribute('min'), 10) || 0;
            const maxVal = parseInt(targetInput.getAttribute('max'), 10) || 999;
            let current = parseInt(targetInput.value, 10) || 0;
            current = Math.min(maxVal, Math.max(minVal, current + delta));
            targetInput.value = current;
            targetInput.dispatchEvent(new Event('input', { bubbles: true }));
          }
        });
      });

      // Quick Chips
      document.querySelectorAll('.preset-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const targetId = chip.getAttribute('data-input');
          const val = parseFloat(chip.getAttribute('data-value')) || 0;
          const targetInput = document.getElementById(targetId);
          if (targetInput) {
            targetInput.value = val;
            targetInput.dispatchEvent(new Event('input', { bubbles: true }));
          }
        });
      });

      // Business Conditional Toggle
      const hasBusinessRadios = document.querySelectorAll('input[name="hasBusiness"]');
      const businessContainer = document.getElementById('business-profit-container');
      const annualProfitInput = document.getElementById('annualBusinessProfit');

      hasBusinessRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
          const isYes = e.target.value === 'yes';
          if (businessContainer) businessContainer.classList.toggle('hidden', !isYes);
          if (!isYes && annualProfitInput) {
            annualProfitInput.value = 0;
            if (annualProfitInput._updatePreview) annualProfitInput._updatePreview();
          }
        });
      });

      // Unit Count Triggers for Asset Valuations
      const countTriggers = [
        { countId: 'carCount', containerId: 'car-value-container', valId: 'carAvgValue' },
        { countId: 'motorCount', containerId: 'motor-value-container', valId: 'motorAvgValue' },
        { countId: 'phoneCount', containerId: 'phone-value-container', valId: 'phoneAvgValue' },
        { countId: 'laptopCount', containerId: 'laptop-value-container', valId: 'laptopAvgValue' }
      ];

      countTriggers.forEach(({ countId, containerId, valId }) => {
        const countEl = document.getElementById(countId);
        const container = document.getElementById(containerId);
        const valEl = document.getElementById(valId);
        if (!countEl || !container) return;

        countEl.addEventListener('input', () => {
          const count = parseInt(countEl.value, 10) || 0;
          const show = count > 0;
          container.classList.toggle('hidden', !show);
          if (!show && valEl) {
            valEl.value = 0;
            if (valEl._updatePreview) valEl._updatePreview();
          }
        });
      });

      // Disable mouse wheel value changes on all number inputs
      document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('wheel', (e) => {
          e.preventDefault();
        }, { passive: false });
      });

      window.addEventListener('wheel', () => {
        if (document.activeElement && document.activeElement.type === 'number') {
          document.activeElement.blur();
        }
      }, { passive: true });

      // Numeric input bounds sanitization
      document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('input', () => {
          if (input.value !== '' && parseFloat(input.value) < 0) {
            input.value = 0;
          }
        });
      });
    }

    function getFormData() {
      return {
        householdSize: parseInt(document.getElementById('householdSize')?.value, 10) || 1,
        educationLevel: document.getElementById('educationLevel')?.value || 'SMA',
        chronicDisease: document.querySelector('input[name="chronicDisease"]:checked')?.value || 'no',
        disability: document.querySelector('input[name="disability"]:checked')?.value || 'no',
        monthlyWages: parseFloat(document.getElementById('monthlyWages')?.value) || 0,
        hasBusiness: document.querySelector('input[name="hasBusiness"]:checked')?.value === 'yes',
        annualBusinessProfit: parseFloat(document.getElementById('annualBusinessProfit')?.value) || 0,
        houseOwnership: document.getElementById('houseOwnership')?.value || 'Milik Sendiri',
        houseSizeM2: parseFloat(document.getElementById('houseSizeM2')?.value) || 0,
        floorType: document.getElementById('floorType')?.value || 'Keramik/Granit',
        wallType: document.getElementById('wallType')?.value || 'Tembok Bata',
        roofType: document.getElementById('roofType')?.value || 'Genteng/Seng Baik',
        waterSource: document.getElementById('waterSource')?.value || 'PDAM/Sumur Bor',
        sanitationFacility: document.getElementById('sanitationFacility')?.value || 'Septic Tank Sendiri',
        electricityPower: document.getElementById('electricityPower')?.value || '1300',
        landSizeM2: parseFloat(document.getElementById('landSizeM2')?.value) || 0,
        livestockValue: parseFloat(document.getElementById('livestockValue')?.value) || 0,
        carCount: parseInt(document.getElementById('carCount')?.value, 10) || 0,
        carAvgValue: parseFloat(document.getElementById('carAvgValue')?.value) || 0,
        motorCount: parseInt(document.getElementById('motorCount')?.value, 10) || 0,
        motorAvgValue: parseFloat(document.getElementById('motorAvgValue')?.value) || 0,
        phoneCount: parseInt(document.getElementById('phoneCount')?.value, 10) || 0,
        phoneAvgValue: parseFloat(document.getElementById('phoneAvgValue')?.value) || 0,
        laptopCount: parseInt(document.getElementById('laptopCount')?.value, 10) || 0,
        laptopAvgValue: parseFloat(document.getElementById('laptopAvgValue')?.value) || 0,
        otherElectronicsValue: parseFloat(document.getElementById('otherElectronicsValue')?.value) || 0,
        goldSavingsValue: parseFloat(document.getElementById('goldSavingsValue')?.value) || 0
      };
    }

    return { init, formatIDR, getFormData };
  })();

  // =========================================================================
  // 5. Results Renderer & Dashboard (World Bank Standards)
  // =========================================================================
  const ResultsRenderer = (() => {
    let lastCopyPayload = '';

    const DECILE_VERDICTS = {
      1: 'Estimasi berada di Desil 1 (< Rp 641.443 / kapita / bulan). Masuk kategori Poor (Garis Kemiskinan Nasional & Standar Ekstrem Bank Dunia).',
      2: 'Estimasi berada di Desil 2 (Rp 641.443 – Rp 962.165 / kapita / bulan). Masuk kategori Vulnerable (Rentan Miskin / 1.0x – 1.5x Garis Kemiskinan).',
      3: 'Estimasi berada di Desil 3 (Rp 962.165 – Rp 1.350.000 / kapita / bulan). Masuk kategori Aspiring Middle Class Bawah (di sekitar Garis UMIC $6.85 Bank Dunia).',
      4: 'Estimasi berada di Desil 4 (Rp 1.350.000 – Rp 1.750.000 / kapita / bulan). Masuk kategori Aspiring Middle Class (Menuju Kelas Menengah).',
      5: 'Estimasi berada di Desil 5 (Rp 1.750.000 – Rp 2.245.051 / kapita / bulan). Masuk kategori Aspiring Middle Class Atas (3.5x Garis Kemiskinan).',
      6: 'Estimasi berada di Desil 6 (Rp 2.245.051 – Rp 3.500.000 / kapita / bulan). Masuk kategori Middle Class Pemula (Ambang Kelas Menengah Aman Bank Dunia).',
      7: 'Estimasi berada di Desil 7 (Rp 3.500.000 – Rp 5.200.000 / kapita / bulan). Masuk kategori Middle Class Inti (Kelas Menengah Mapan).',
      8: 'Estimasi berada di Desil 8 (Rp 5.200.000 – Rp 7.500.000 / kapita / bulan). Masuk kategori Upper-Middle Class (Kelas Menengah Atas).',
      9: 'Estimasi berada di Desil 9 (Rp 7.500.000 – Rp 10.904.531 / kapita / bulan). Masuk kategori Near Upper Class (Puncak Kelas Menengah).',
      10: '☝️🤓 Estimasi Desil 10! Berada di kategori Upper Class Sejati Bank Dunia (> Rp 10.904.531 / orang / bulan / > 17x Garis Kemiskinan).'
    };

    function render(data) {
      const {
        householdSize,
        educationLevel,
        chronicDisease,
        disability,
        monthlyWages,
        hasBusiness,
        annualBusinessProfit,
        houseOwnership,
        houseSizeM2,
        floorType,
        wallType,
        roofType,
        waterSource,
        sanitationFacility,
        electricityPower,
        landSizeM2,
        livestockValue,
        carCount,
        carAvgValue,
        motorCount,
        motorAvgValue,
        phoneCount,
        phoneAvgValue,
        laptopCount,
        laptopAvgValue,
        otherElectronicsValue,
        goldSavingsValue
      } = data;

      const effectiveProfit = hasBusiness ? annualBusinessProfit : 0;
      const perCapitaMonthly = EconomicEngine.computePerCapitaMonthly({
        monthlyWages,
        annualBusinessProfit: effectiveProfit,
        householdSize
      });
      const totalMonthlyIncome = monthlyWages + (effectiveProfit / 12);

      // Multidimensional MPI Evaluation
      const mpi = EconomicEngine.evaluateMPI({
        educationLevel,
        chronicDisease,
        disability,
        houseOwnership,
        houseSizeM2,
        householdSize,
        floorType,
        wallType,
        roofType,
        waterSource,
        sanitationFacility,
        electricityPower
      });

      const { desil, percentileExact, rawPercentile, dailyPPP, wbClass, effectivePerCapita } = EconomicEngine.computeDesil(perCapitaMonthly, mpi.totalMod);
      
      const assets = EconomicEngine.computeAssetIndex({
        houseSizeM2,
        landSizeM2,
        livestockValue,
        carCount,
        carAvgValue,
        motorCount,
        motorAvgValue,
        phoneCount,
        phoneAvgValue,
        laptopCount,
        laptopAvgValue,
        otherElectronicsValue,
        goldSavingsValue
      });

      // 1. Text & Badges
      const elPercentileLabel = document.getElementById('res-percentile-label');
      const elDecileTitle = document.getElementById('res-decile-title');
      const elDecileVerdict = document.getElementById('res-decile-verdict');
      const elPerCapita = document.getElementById('res-per-capita');
      const elTotalIncome = document.getElementById('res-total-income');
      const elHouseholdNote = document.getElementById('res-household-note');
      const elAssetTotal = document.getElementById('res-asset-total');
      const elAssetBreakdown = document.getElementById('res-asset-breakdown');

      // MPI Elements
      const elMpiHousing = document.getElementById('res-mpi-housing');
      const elMpiHousingSub = document.getElementById('res-mpi-housing-sub');
      const elMpiWash = document.getElementById('res-mpi-wash');
      const elMpiWashSub = document.getElementById('res-mpi-wash-sub');
      const elMpiEdu = document.getElementById('res-mpi-education');
      const elMpiEduSub = document.getElementById('res-mpi-education-sub');
      const elMpiHealth = document.getElementById('res-mpi-health');
      const elMpiHealthSub = document.getElementById('res-mpi-health-sub');

      if (elPercentileLabel) elPercentileLabel.textContent = `Persentil ~${percentileExact.toFixed(1)}% • ${wbClass.name}`;
      if (elDecileTitle) elDecileTitle.textContent = `Desil ${desil} ${desil === 10 ? '☝️🤓' : ''}`;
      if (elDecileVerdict) elDecileVerdict.textContent = DECILE_VERDICTS[desil] || DECILE_VERDICTS[10];
      if (elPerCapita) elPerCapita.textContent = FormController.formatIDR(effectivePerCapita) + ` (~$${dailyPPP.toFixed(2)}/hari PPP)`;
      if (elTotalIncome) elTotalIncome.textContent = FormController.formatIDR(totalMonthlyIncome);
      if (elHouseholdNote) elHouseholdNote.textContent = `dibagi ${householdSize} orang anggota keluarga`;
      if (elAssetTotal) elAssetTotal.textContent = FormController.formatIDR(assets.total);

      // Render MPI Cards
      if (elMpiHousing) elMpiHousing.textContent = mpi.housing.title;
      if (elMpiHousingSub) elMpiHousingSub.textContent = mpi.housing.sub;
      if (elMpiWash) elMpiWash.textContent = mpi.wash.title;
      if (elMpiWashSub) elMpiWashSub.textContent = mpi.wash.sub;
      if (elMpiEdu) elMpiEdu.textContent = mpi.education.title;
      if (elMpiEduSub) elMpiEduSub.textContent = mpi.education.sub;
      if (elMpiHealth) elMpiHealth.textContent = mpi.health.title;
      if (elMpiHealthSub) elMpiHealthSub.textContent = mpi.health.sub;

      // 2. SVG Bell Curve Pin Marker Positioning
      const svgUserPin = document.getElementById('svg-user-pin');
      if (svgUserPin) {
        // Map rawPercentile (0.0 -> 1.0) into SVG ViewBox X coordinate (25px -> 475px)
        const pinX = Math.min(475, Math.max(25, 25 + rawPercentile * 450));
        svgUserPin.setAttribute('transform', `translate(${pinX.toFixed(1)}, 0)`);
      }

      // 3. 10 Decile Segment Bar
      document.querySelectorAll('.d-segment').forEach(seg => {
        const dNum = parseInt(seg.getAttribute('data-d'), 10);
        seg.classList.toggle('active', dNum === desil);
      });

      // 4. Asset Line Items (Safe DOM construction - Zero innerHTML injection)
      if (elAssetBreakdown) {
        elAssetBreakdown.textContent = '';
        const items = [
          { label: `Rumah Tinggal (${houseSizeM2} m²)`, val: assets.houseVal },
          { label: `Tanah/Properti Lain (${landSizeM2} m²)`, val: assets.landVal },
          { label: 'Hewan Ternak Produktif', val: assets.livestockVal },
          { label: `Mobil (${carCount} unit)`, val: assets.carVal },
          { label: `Motor (${motorCount} unit)`, val: assets.motorVal },
          { label: `Smartphone/Tablet (${phoneCount} unit)`, val: assets.phoneVal },
          { label: `Laptop/PC (${laptopCount} unit)`, val: assets.laptopVal },
          { label: 'Elektronik Rumah Tangga', val: assets.electronicsVal },
          { label: 'Tabungan & Emas', val: assets.goldVal }
        ].filter(i => i.val > 0);

        if (items.length === 0) {
          const emptyRow = document.createElement('div');
          emptyRow.className = 'asset-row-item';
          const span = document.createElement('span');
          span.textContent = 'Tidak ada aset fisik tambahan dilaporkan.';
          const strong = document.createElement('strong');
          strong.textContent = 'Rp 0';
          emptyRow.appendChild(span);
          emptyRow.appendChild(strong);
          elAssetBreakdown.appendChild(emptyRow);
        } else {
          items.forEach(i => {
            const row = document.createElement('div');
            row.className = 'asset-row-item';
            const labelSpan = document.createElement('span');
            labelSpan.textContent = i.label;
            const valStrong = document.createElement('strong');
            valStrong.textContent = FormController.formatIDR(i.val);
            row.appendChild(labelSpan);
            row.appendChild(valStrong);
            elAssetBreakdown.appendChild(row);
          });
        }
      }

      // 5. Summary Text for Clipboard
      lastCopyPayload = `Aku Desil 10 ☝️🤓
Ringkasan Estimasi Desil Standar Bank Dunia (World Bank & MPI):
• Estimasi: Desil ${desil} (~persentil ${percentileExact.toFixed(1)}%)
• Kategori: ${wbClass.name}
• Kapasitas Per Orang: ${FormController.formatIDR(effectivePerCapita)} / bulan (~$${dailyPPP.toFixed(2)}/hari PPP)
• Evaluasi Multidimensi: ${mpi.housing.title} | ${mpi.wash.title} | ${mpi.health.title}
• Total Penghasilan RT: ${FormController.formatIDR(totalMonthlyIncome)} / bulan (${householdSize} orang)
• Aset Index: ${FormController.formatIDR(assets.total)}
(Simulasi model Bank Dunia Aspiring Indonesia & Multidimensional Poverty Index)`;
    }

    function getCopyPayload() {
      return lastCopyPayload;
    }

    return { render, getCopyPayload };
  })();

  // =========================================================================
  // 6. Application Lifecycle & Event Orchestration
  // =========================================================================
  function initApp() {
    // 1. Initialize Subsystems
    PrivacyModalController.init();
    FormController.init();

    // 2. Navigation Actions
    const btnStartCalc = document.getElementById('btn-start-calc');
    const btnBackToOpening = document.getElementById('btn-back-to-opening');
    const btnRecalculate = document.getElementById('btn-recalculate');
    const btnCopyResult = document.getElementById('btn-copy-result');
    const decileForm = document.getElementById('decile-form');
    const householdSizeInput = document.getElementById('householdSize');

    if (btnStartCalc) {
      btnStartCalc.addEventListener('click', () => {
        NavigationController.showView('form');
      });
    }

    if (btnBackToOpening) {
      btnBackToOpening.addEventListener('click', () => {
        NavigationController.showView('opening');
      });
    }

    if (btnRecalculate) {
      btnRecalculate.addEventListener('click', () => {
        NavigationController.showView('form');
        if (householdSizeInput) householdSizeInput.focus();
      });
    }

    // 3. Form Submit -> Results Transition
    if (decileForm) {
      decileForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const householdSize = parseInt(householdSizeInput?.value, 10);
        const errorHousehold = document.getElementById('error-householdSize');

        if (!householdSize || householdSize < 1) {
          if (errorHousehold) errorHousehold.classList.add('active');
          if (householdSizeInput) householdSizeInput.focus();
          return;
        } else {
          if (errorHousehold) errorHousehold.classList.remove('active');
        }

        const formData = FormController.getFormData();
        ResultsRenderer.render(formData);
        NavigationController.showView('results');
      });
    }

    // 4. Clipboard Copy Action
    if (btnCopyResult) {
      btnCopyResult.addEventListener('click', () => {
        const payload = ResultsRenderer.getCopyPayload();
        if (!payload) return;

        navigator.clipboard.writeText(payload).then(() => {
          const origText = btnCopyResult.textContent;
          btnCopyResult.textContent = '✅ Berhasil Disalin';
          setTimeout(() => {
            btnCopyResult.textContent = origText;
          }, 2000);
        }).catch(() => {
          alert('Gagal menyalin otomatis. Silakan salin ringkasan secara manual.');
        });
      });
    }
  }

  initApp();
});
