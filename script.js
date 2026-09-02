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
  // 3. Mathematical & Economic Engine (BPS Susenas Standard)
  // =========================================================================
  const EconomicEngine = (() => {
    const BPS_MU = 13.8265;
    const BPS_SIGMA = 0.328;

    /**
     * Standard Normal Cumulative Distribution Function (Abramowitz & Stegun 7.1.26)
     */
    function normalCDF(z) {
      const t = 1 / (1 + 0.3275911 * Math.abs(z));
      const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t
                 - 0.284496736) * t + 0.254829592) * t * Math.exp(-z * z);
      return 0.5 * (1 + Math.sign(z) * y);
    }

    function computePerCapitaMonthly({ monthlyWages = 0, annualBusinessProfit = 0, householdSize = 1 }) {
      const size = Math.max(1, householdSize);
      const monthlyTotal = (monthlyWages || 0) + ((annualBusinessProfit || 0) / 12);
      return Math.max(1, monthlyTotal / size);
    }

    function computeDesil(perCapitaMonthly) {
      const safePerCapita = Math.max(1, perCapitaMonthly || 1);
      const z = (Math.log(safePerCapita) - BPS_MU) / BPS_SIGMA;
      const percentile = normalCDF(z);
      const desil = Math.min(10, Math.max(1, Math.floor(percentile * 10) + 1));
      const percentileExact = Math.min(99.9, Math.max(0.1, percentile * 100));

      return {
        desil,
        decile: desil,
        percentileExact,
        rawPercentile: percentile
      };
    }

    function computeAssetIndex({
      houseSizeM2 = 0,
      landSizeM2 = 0,
      carCount = 0,
      carAvgValue = 0,
      motorCount = 0,
      motorAvgValue = 0,
      otherVehicleValue = 0,
      phoneCount = 0,
      phoneAvgValue = 0,
      laptopCount = 0,
      laptopAvgValue = 0,
      otherElectronicsValue = 0,
      goldSavingsValue = 0
    }) {
      const houseVal = houseSizeM2 * 500_000;
      const landVal = landSizeM2 * 300_000;
      const carVal = carCount * carAvgValue * 0.1;
      const motorVal = motorCount * motorAvgValue * 0.1;
      const otherVehVal = otherVehicleValue * 0.1;
      const phoneVal = phoneCount * phoneAvgValue * 0.2;
      const laptopVal = laptopCount * laptopAvgValue * 0.2;
      const electronicsVal = otherElectronicsValue * 0.2;
      const goldVal = goldSavingsValue * 0.5;

      return {
        houseVal,
        landVal,
        carVal,
        motorVal,
        otherVehVal,
        phoneVal,
        laptopVal,
        electronicsVal,
        goldVal,
        total: houseVal + landVal + carVal + motorVal + otherVehVal + phoneVal + laptopVal + electronicsVal + goldVal
      };
    }

    return {
      computePerCapitaMonthly,
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
        { inputId: 'monthlyExpenses', previewId: 'preview-monthlyExpenses', suffix: '' },
        { inputId: 'carAvgValue', previewId: 'preview-carAvgValue', suffix: '' },
        { inputId: 'motorAvgValue', previewId: 'preview-motorAvgValue', suffix: '' },
        { inputId: 'otherVehicleValue', previewId: 'preview-otherVehicleValue', suffix: '' },
        { inputId: 'phoneAvgValue', previewId: 'preview-phoneAvgValue', suffix: '' },
        { inputId: 'laptopAvgValue', previewId: 'preview-laptopAvgValue', suffix: '' },
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

      // Quick Salary Chips
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

      // Disable mouse wheel value changes on all number inputs (prevents accidental increment/decrement during page scrolling)
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
        monthlyWages: parseFloat(document.getElementById('monthlyWages')?.value) || 0,
        hasBusiness: document.querySelector('input[name="hasBusiness"]:checked')?.value === 'yes',
        annualBusinessProfit: parseFloat(document.getElementById('annualBusinessProfit')?.value) || 0,
        houseSizeM2: parseFloat(document.getElementById('houseSizeM2')?.value) || 0,
        landSizeM2: parseFloat(document.getElementById('landSizeM2')?.value) || 0,
        carCount: parseInt(document.getElementById('carCount')?.value, 10) || 0,
        carAvgValue: parseFloat(document.getElementById('carAvgValue')?.value) || 0,
        motorCount: parseInt(document.getElementById('motorCount')?.value, 10) || 0,
        motorAvgValue: parseFloat(document.getElementById('motorAvgValue')?.value) || 0,
        otherVehicleValue: parseFloat(document.getElementById('otherVehicleValue')?.value) || 0,
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
  // 5. Results Renderer & Dashboard
  // =========================================================================
  const ResultsRenderer = (() => {
    let lastCopyPayload = '';

    const DECILE_VERDICTS = {
      1: 'Estimasi berada di kelompok 10% terbawah (< Rp 664.000 / kapita / bulan) di bawah ambang rata-rata garis kemiskinan BPS.',
      2: 'Estimasi berada di rentang pengeluaran Rp 664.000 – Rp 767.000 per orang per bulan (20% terbawah nasional).',
      3: 'Estimasi berada di rentang pengeluaran Rp 767.000 – Rp 851.000 per orang per bulan (30% terbawah nasional).',
      4: 'Estimasi berada di rentang pengeluaran Rp 851.000 – Rp 931.000 per orang per bulan (kelompok menengah-bawah).',
      5: 'Estimasi berada tepat di titik tengah (median 50%) pengeluaran nasional (Rp 931.000 – Rp 1.011.000 per orang per bulan).',
      6: 'Estimasi berada di rentang pengeluaran Rp 1.011.000 – Rp 1.099.000 per orang per bulan (kelompok menengah).',
      7: 'Estimasi berada di rentang pengeluaran Rp 1.099.000 – Rp 1.201.000 per orang per bulan (kelompok menengah atas).',
      8: 'Estimasi berada di rentang pengeluaran Rp 1.201.000 – Rp 1.333.000 per orang per bulan (20% teratas nasional).',
      9: 'Estimasi berada di rentang pengeluaran Rp 1.333.000 – Rp 1.539.000 per orang per bulan (10%–20% teratas nasional).',
      10: '☝️🤓 Estimasi Desil 10! Berada di perkiraan 10% teratas pengeluaran per kapita nasional (> Rp 1.539.000 / orang / bulan) berdasarkan kurva Susenas.'
    };

    function render(data) {
      const {
        householdSize,
        monthlyWages,
        hasBusiness,
        annualBusinessProfit,
        houseSizeM2,
        landSizeM2,
        carCount,
        carAvgValue,
        motorCount,
        motorAvgValue,
        otherVehicleValue,
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
      const { desil, percentileExact, rawPercentile } = EconomicEngine.computeDesil(perCapitaMonthly);
      const assets = EconomicEngine.computeAssetIndex({
        houseSizeM2,
        landSizeM2,
        carCount,
        carAvgValue,
        motorCount,
        motorAvgValue,
        otherVehicleValue,
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

      if (elPercentileLabel) elPercentileLabel.textContent = `Persentil ~${percentileExact.toFixed(1)}% Nasional`;
      if (elDecileTitle) elDecileTitle.textContent = `Desil ${desil} ${desil === 10 ? '☝️🤓' : ''}`;
      if (elDecileVerdict) elDecileVerdict.textContent = DECILE_VERDICTS[desil] || DECILE_VERDICTS[10];
      if (elPerCapita) elPerCapita.textContent = FormController.formatIDR(perCapitaMonthly);
      if (elTotalIncome) elTotalIncome.textContent = FormController.formatIDR(totalMonthlyIncome);
      if (elHouseholdNote) elHouseholdNote.textContent = `dibagi ${householdSize} orang anggota keluarga`;
      if (elAssetTotal) elAssetTotal.textContent = FormController.formatIDR(assets.total);

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
          { label: `Mobil (${carCount} unit)`, val: assets.carVal },
          { label: `Motor (${motorCount} unit)`, val: assets.motorVal },
          { label: 'Kendaraan Lain', val: assets.otherVehVal },
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
Ringkasan Estimasi Desil Pengeluaran:
• Estimasi: Desil ${desil} (~persentil ${percentileExact.toFixed(1)}%)
• Kapasitas Per Orang: ${FormController.formatIDR(perCapitaMonthly)} / bulan
• Total Penghasilan RT: ${FormController.formatIDR(totalMonthlyIncome)} / bulan (${householdSize} orang)
• Aset Index: ${FormController.formatIDR(assets.total)}
(Simulasi model statistik per kapita mandiri)`;
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
