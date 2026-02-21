document.addEventListener('DOMContentLoaded', () => {
    // Navigation Elements
    const mainMenu = document.getElementById('main-menu');
    const calculatorView = document.getElementById('calculator-view');
    const bttsView = document.getElementById('btts-view');
    const bttsManualView = document.getElementById('btts-manual-view');

    const btnProbability = document.getElementById('btn-probability');
    const btnBtts = document.getElementById('btn-btts');
    const btnBack = document.getElementById('btn-back');
    const btnBackBtts = document.getElementById('btn-back-btts');
    const btnBackManual = document.getElementById('btn-back-manual');

    const btnManualLocal = document.getElementById('btn-manual-local');
    const btnManualVisitor = document.getElementById('btn-manual-visitor');
    const btnClearManual = document.getElementById('btn-clear-manual');
    const btnClearBtts = document.getElementById('btn-clear-btts');
    const manualTeamName = document.getElementById('manual-team-name');

    // Probability Calculator Elements
    const inputA = document.getElementById('prob-a');
    const inputB = document.getElementById('prob-b');
    const displayAverage = document.getElementById('avg-prob');
    const displayHouseProb = document.getElementById('house-prob');
    const houseOddInput = document.getElementById('house-odd');
    const singleOddDisplay = document.getElementById('single-odd');
    const edgeContainer = document.getElementById('edge-container');
    const edgeDivider = document.getElementById('edge-divider');
    const edgeValueDisplay = document.getElementById('edge-value');
    const evContainer = document.getElementById('ev-container');
    const evDivider = document.getElementById('ev-divider');
    const evValueDisplay = document.getElementById('ev-value');
    const summaryHouseOdd = document.getElementById('summary-house-odd');
    const currencySelect = document.getElementById('global-currency');
    const bankrollInput = document.getElementById('global-bankroll');
    const bankrollResetBtn = document.getElementById('btn-reset-bankroll');
    const kellyCard = document.getElementById('kelly-card');
    const kellyStakeDisplay = document.getElementById('kelly-stake');

    // BTTS Elements
    const bttsLocalScored = document.getElementById('btts-local-scored');
    const bttsLocalConceded = document.getElementById('btts-local-conceded');
    const bttsLocalAvgScored = document.getElementById('btts-local-avg-scored');
    const bttsLocalAvgConceded = document.getElementById('btts-local-avg-conceded');

    const bttsVisitorScored = document.getElementById('btts-visitor-scored');
    const bttsVisitorConceded = document.getElementById('btts-visitor-conceded');
    const bttsVisitorAvgScored = document.getElementById('btts-visitor-avg-scored');
    const bttsVisitorAvgConceded = document.getElementById('btts-visitor-avg-conceded');

    const bttsLocalXg = document.getElementById('btts-local-xg');
    const bttsVisitorXg = document.getElementById('btts-visitor-xg');

    const bttsSample = document.getElementById('btts-sample');
    const bttsHouseOdd = document.getElementById('btts-house-odd');
    const bttsMode = document.getElementById('btts-mode');

    // BTTS Result Elements
    const bttsLocalProb = document.getElementById('btts-local-prob');
    const bttsVisitorProb = document.getElementById('btts-visitor-prob');
    const bttsCombinedAvg = document.getElementById('btts-combined-avg');
    const bttsFairOdd = document.getElementById('btts-fair-odd');
    const bttsEdgeValue = document.getElementById('btts-edge-value');
    const bttsEvValue = document.getElementById('btts-ev-value');
    const bttsKellyStake = document.getElementById('btts-kelly-stake');
    const bttsKellyCard = document.getElementById('btts-kelly-card');

    const bttsYesContainer = document.getElementById('btts-yes-container');
    const bttsNoContainer = document.getElementById('btts-no-container');
    const bttsYesProbEl = document.getElementById('btts-yes-prob');
    const bttsNoProbEl = document.getElementById('btts-no-prob');
    const bttsYesFairEl = document.getElementById('btts-yes-fair');
    const bttsNoFairEl = document.getElementById('btts-no-fair');
    const sampleBadge = document.getElementById('sample-quality-badge');

    // BTTS / O-U Toggle Elements
    const btnBttsMode = document.getElementById('btn-btts-mode');
    const btnOuMode = document.getElementById('btn-ou-mode');
    const bttsPanel = document.getElementById('btts-panel-btts');
    const ouPanel = document.getElementById('btts-panel-ou');
    const ouLineSelect = document.getElementById('ou-line');
    const ouOverProbEl = document.getElementById('ou-over-prob');
    const ouUnderProbEl = document.getElementById('ou-under-prob');
    const ouOverFairEl = document.getElementById('ou-over-fair');
    const ouUnderFairEl = document.getElementById('ou-under-fair');
    const ouOverTitle = document.getElementById('ou-over-title');
    const ouUnderTitle = document.getElementById('ou-under-title');
    const ouPickHint = document.getElementById('ou-pick-hint');
    const ouPickLabel = document.getElementById('ou-pick-label');
    const ouOverContainer = document.getElementById('ou-over-container');
    const ouUnderContainer = document.getElementById('ou-under-container');
    const bttsMarketLabel = document.getElementById('btts-market-label');

    // New Enhancement Elements
    const proModeToggleProb = document.getElementById('pro-mode-toggle-prob');
    const proModeToggleBtts = document.getElementById('pro-mode-toggle-btts');
    const btnShowHistory = document.getElementById('btn-show-history');
    const historyModal = document.getElementById('history-modal');
    const historyCloseBtn = document.getElementById('history-close-btn');
    const historyListContainer = document.getElementById('history-list-container');
    const historyTabBtns = document.querySelectorAll('.history-tabs .tab-btn');

    // Value Badges (Prob Calc)
    const probBadgeContainer = document.getElementById('prob-value-badge-container');
    const probBadge = document.getElementById('prob-value-badge');
    const probExplanation = document.getElementById('prob-value-explanation');

    // Value Badges (BTTS Calc)
    const bttsBadgeContainer = document.getElementById('btts-value-badge-container');
    const bttsBadge = document.getElementById('btts-value-badge');
    const bttsExplanation = document.getElementById('btts-value-explanation');

    // Pro Mode Sections
    const proSectionProb = document.getElementById('pro-sensitivity-prob');
    const proSectionBtts = document.getElementById('pro-sensitivity-btts');

    // Sensitivity Elements
    const sensProbDown = document.getElementById('sens-prob-down');
    const sensProbUp = document.getElementById('sens-prob-up');
    const sensProbReading = document.getElementById('sens-prob-reading');

    const sensBttsDown = document.getElementById('sens-btts-down');
    const sensBttsUp = document.getElementById('sens-btts-up');
    const sensBttsReading = document.getElementById('sens-btts-reading');


    const applyBttsMarketUI = () => {
        const isBtts = currentBttsMarket === "btts";
        if (bttsPanel) bttsPanel.style.display = isBtts ? "grid" : "none";
        if (ouPanel) ouPanel.style.display = isBtts ? "none" : "grid";

        // Support both old toggle-btn and new seg-option classes
        if (btnBttsMode) {
            btnBttsMode.classList.toggle("active", isBtts);
            btnBttsMode.classList.toggle("winner", false);
            btnBttsMode.setAttribute("aria-selected", isBtts ? "true" : "false");
        }
        if (btnOuMode) {
            btnOuMode.classList.toggle("active", !isBtts);
            btnOuMode.classList.toggle("winner", false);
            btnOuMode.setAttribute("aria-selected", !isBtts ? "true" : "false");
        }

        // Label pill in EV/Edge section
        if (bttsMarketLabel) bttsMarketLabel.textContent = isBtts ? "BTTS" : "O/U";
    };

    // --- Hero Block Updater ---
    const updateHero = (pick, probPct, fairOdd) => {
        const heroPick = document.getElementById('hero-pick');
        const heroProb = document.getElementById('hero-prob');
        const heroFair = document.getElementById('hero-fair');
        if (!heroPick || !heroProb || !heroFair) return;
        if (probPct <= 0) {
            heroPick.textContent = '\u2014 \u2014';
            heroProb.textContent = '\u2014';
            heroFair.textContent = '\u2014';
            heroProb.style.color = 'var(--text-secondary)';
        } else {
            heroPick.textContent = pick;
            heroProb.textContent = probPct.toFixed(1) + '%';
            heroFair.textContent = fairOdd > 0 ? fairOdd.toFixed(2) : '-.--';
            heroProb.style.color = '';
        }
    };
    // "btts" | "ou"

    const infoModal = document.getElementById('info-modal');
    const modalBody = document.getElementById('modal-body');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    // State
    let currentBttsMarket = "btts";
    let proModeProb = false;
    let proModeBtts = false;
    let history = JSON.parse(localStorage.getItem('bet_history') || '[]');
    let favorites = JSON.parse(localStorage.getItem('bet_favs') || '[]');
    let activeTab = 'recent';

    // Constants
    const DECIMAL_PLACES_PROB = 1;
    const DECIMAL_PLACES_ODD = 2;

    // Helper functions
    const getCurrencySymbol = (selectEl) => {
        const code = (selectEl && selectEl.value) ? selectEl.value : 'CLP';
        const map = { CLP: '$', USD: '$', EUR: '€', GBP: '£' };
        return map[code] || '$';
    };

    // Bankroll formatting helpers
    const parseBankroll = (str) => {
        if (!str) return 0;
        const cleaned = String(str).replace(/\./g, '').replace(/,/g, '');
        const n = Number(cleaned);
        return Number.isFinite(n) ? n : 0;
    };

    const formatBankroll = (num) => {
        if (!Number.isFinite(num) || num < 0) num = 0;
        return Math.round(num).toLocaleString('es-CL');
    };

    const clamp = (num, min, max) => Math.min(max, Math.max(min, num));

    const toNumber = (value, fallback = 0) => {
        const n = Number(value);
        return Number.isFinite(n) ? n : fallback;
    };

    const debounce = (fn, delay = 150) => {
        let t = null;
        return (...args) => {
            if (t) clearTimeout(t);
            t = setTimeout(() => fn(...args), delay);
        };
    };

    // Kelly fraction for decimal odds
    // Full Kelly: f* = (b*p - q) / b, where b = odds - 1, q = 1-p
    const kellyFraction = (p, odds, fraction = 0.25) => {
        if (!(p > 0 && p < 1) || !(odds > 1)) return 0;
        const b = odds - 1;
        const q = 1 - p;
        const full = (b * p - q) / b;
        const scaled = full * fraction;
        return clamp(scaled, 0, 1);
    };

    const saveToHistory = (data) => {
        const id = Date.now();
        const newItem = { id, ...data, timestamp: new Date().toLocaleString(), favorite: false };
        history.unshift(newItem);
        if (history.length > 10) history.pop();
        localStorage.setItem('bet_history', JSON.stringify(history));
    };

    const toggleFavorite = (id) => {
        const hItem = history.find(i => i.id === id);
        const fIndex = favorites.findIndex(i => i.id === id);

        if (fIndex > -1) {
            favorites.splice(fIndex, 1);
            if (hItem) hItem.favorite = false;
        } else {
            const item = hItem || favorites.find(i => i.id === id);
            if (item) {
                const favItem = { ...item, favorite: true };
                favorites.unshift(favItem);
                if (hItem) hItem.favorite = true;
            }
        }
        localStorage.setItem('bet_favs', JSON.stringify(favorites));
        localStorage.setItem('bet_history', JSON.stringify(history));
        renderHistory();
    };

    let activeHistoryType = 'prob'; // 'prob' or 'btts'

    const renderHistory = () => {
        let list = activeTab === 'recent' ? history : favorites;

        // Filter by the active calculator type
        if (activeHistoryType) {
            list = list.filter(item => item.type === activeHistoryType);
        }

        historyListContainer.innerHTML = '';

        if (list.length === 0) {
            historyListContainer.innerHTML = `<p style="text-align:center; padding: 20px; color: var(--text-secondary);">No hay registros aún.</p>`;
            return;
        }

        list.forEach(item => {
            const div = document.createElement('div');
            div.className = 'history-item';
            // Colored value badge for history
            let hBadgeClass = 'badge-none';
            let hBadgeText = '❌ Sin valor';
            if (item.ev > 5) { hBadgeClass = 'badge-positive'; hBadgeText = '✅ Valor'; }
            else if (item.ev > 0) { hBadgeClass = 'badge-low'; hBadgeText = '⚠️ Bajo'; }
            div.innerHTML = `
                <div class="history-item-header">
                    <div class="history-title-row">
                        <span class="history-item-title">${item.market} - ${item.timestamp}</span>
                        <span class="history-value-tag ${hBadgeClass}">${hBadgeText}</span>
                    </div>
                    <button class="history-fav-btn ${item.favorite ? 'active' : ''}" onclick="window.toggleFav(${item.id})">
                        ${item.favorite ? '⭐' : '☆'}
                    </button>
                </div>
                <div class="history-item-body">
                    <div class="history-stat"><span class="label">Prob</span><span class="value">${item.prob.toFixed(1)}%</span></div>
                    <div class="history-stat"><span class="label">Cuota</span><span class="value">${item.odd.toFixed(2)}</span></div>
                    <div class="history-stat"><span class="label">EV</span><span class="value" style="color: ${item.ev > 0 ? 'var(--accent-color)' : '#ef4444'}">${item.ev.toFixed(2)}%</span></div>
                </div>
                <button class="history-load-btn" onclick="window.loadItem(${item.id})">Usar de nuevo</button>
            `;
            historyListContainer.appendChild(div);
        });
    };

    // Expose these to global for onclick
    window.toggleFav = toggleFavorite;
    window.loadItem = (id) => {
        const list = activeTab === 'recent' ? history : favorites;
        const item = list.find(i => i.id === id);
        if (!item) return;

        if (item.type === 'prob') {
            inputA.value = item.valA || 0;
            inputB.value = item.valB || 0;
            houseOddInput.value = item.odd;
            btnProbability.click();
            debouncedCalculate();
        } else {
            // btts/ou
            currentBttsMarket = item.marketType || 'btts';
            bttsLocalScored.value = item.lS || 0;
            bttsLocalConceded.value = item.lC || 0;
            bttsVisitorScored.value = item.vS || 0;
            bttsVisitorConceded.value = item.vC || 0;
            bttsHouseOdd.value = item.odd;
            btnBtts.click();
            applyBttsMarketUI();
            debouncedCalculateBtts();
        }
        historyModal.style.display = 'none';
    };

    const updateValueTag = (evPct, probPct, houseOdd, badgeObj, explanationObj, containerObj) => {
        if (!houseOdd || houseOdd <= 1 || probPct <= 0) {
            if (containerObj) containerObj.style.display = 'none';
            return;
        }

        if (containerObj) containerObj.style.display = 'flex';

        let status = "";
        let badgeClass = "";
        let explanation = "";

        if (evPct > 5) {
            status = "✅ Valor positivo";
            badgeClass = "badge-positive";
            explanation = `La cuota tiene un buen margen a tu favor (EV: ${evPct.toFixed(2)}%).`;
        } else if (evPct > 0) {
            status = "⚠️ Margen bajo";
            badgeClass = "badge-low";
            explanation = `Hay valor, pero el margen de error es estrecho (EV: ${evPct.toFixed(2)}%).`;
        } else {
            status = "❌ Sin valor";
            badgeClass = "badge-none";
            explanation = `La cuota ofrecida no compensa el riesgo estimado (EV: ${evPct.toFixed(2)}%).`;
        }

        if (badgeObj) {
            badgeObj.textContent = status;
            badgeObj.className = "value-badge " + badgeClass;
        }
        if (explanationObj) explanationObj.textContent = explanation;
    };

    const updateProSensitivity = (probPct, houseOdd, downEl, upEl, readingEl, sectionEl, prefix = 'prob', customPenalty = 0.05) => {
        const isPro = prefix === 'prob' ? proModeProb : proModeBtts;
        if (!isPro) {
            if (sectionEl) sectionEl.style.display = 'none';
            return;
        }
        if (sectionEl) sectionEl.style.display = 'block';

        const p = probPct / 100;
        const pDown = clamp(p - customPenalty, 0.01, 0.99);
        const pUp = clamp(p + customPenalty, 0.01, 0.99);
        const oddDown = Math.max(1.01, houseOdd - 0.05);
        const oddUp = houseOdd + 0.05;

        const evNow = houseOdd > 0 ? (p * houseOdd - 1) * 100 : 0;
        const evDown = houseOdd > 0 ? (pDown * houseOdd - 1) * 100 : 0;
        const evUp = houseOdd > 0 ? (pUp * houseOdd - 1) * 100 : 0;
        const evOddDown = oddDown > 1 ? (p * oddDown - 1) * 100 : 0;
        const evOddUp = oddUp > 1 ? (p * oddUp - 1) * 100 : 0;

        // --- DOM Elements ---
        const badgeEl = document.getElementById(`${prefix}-robustness-badge`);
        const marginEl = document.getElementById(`${prefix}-error-margin`);
        const stakeUnitsEl = document.getElementById(`${prefix}-stake-units`);
        const kellyBaseEl = document.getElementById(`${prefix}-kelly-base`);
        const kellyConsEl = document.getElementById(`${prefix}-kelly-cons`);
        const verdictCard = document.getElementById(`${prefix}-verdict-card`);
        const verdictIcon = document.getElementById(`${prefix}-verdict-icon`);
        const verdictTitle = document.getElementById(`${prefix}-verdict-title`);
        const verdictReason = document.getElementById(`${prefix}-verdict-reason`);
        const evSingle = document.getElementById(`${prefix}-ev-money-single`);
        const evHundred = document.getElementById(`${prefix}-ev-money-hundred`);
        const sensOddDownEl = document.getElementById(`sens-odd-${prefix === 'btts' ? 'btts-' : ''}down`);
        const sensOddUpEl = document.getElementById(`sens-odd-${prefix === 'btts' ? 'btts-' : ''}up`);

        // Get global currency and bankroll
        const currSelect = document.getElementById('global-currency');
        const currBase = getCurrencySymbol(currSelect);
        const globalBankrollStr = (document.getElementById('global-bankroll')?.value || "1000").replace(/\./g, '').replace(/,/g, '.');
        const bankroll = parseFloat(globalBankrollStr) || 1000;

        // 1. Robustness
        if (badgeEl) {
            if (evNow <= 0 || houseOdd <= 1) {
                badgeEl.textContent = "No Apostar";
                badgeEl.className = "robust-badge robust-red";
            } else if (evDown <= 0) {
                badgeEl.textContent = "Frágil";
                badgeEl.className = "robust-badge robust-yellow";
            } else {
                badgeEl.textContent = "Robusto";
                badgeEl.className = "robust-badge robust-green";
            }
        }

        // 2. Error Margin
        if (marginEl) {
            if (houseOdd > 1) {
                const pBreakEven = 1 / houseOdd;
                const margin = (p - pBreakEven) * 100;
                marginEl.textContent = margin > 0 ? `+${margin.toFixed(1)}%` : `${margin.toFixed(1)}%`;
                marginEl.style.color = margin > 0 ? "var(--accent-color)" : "#ef4444";
            } else {
                marginEl.textContent = "--";
                marginEl.style.color = "inherit";
            }
        }

        // 3. Stakes & Units mapping
        let units = 0;
        let pKellyBase = 0;
        let pKellyCons = 0;

        if (houseOdd > 1) {
            const b = houseOdd - 1;
            pKellyBase = clamp((((p * houseOdd) - 1) / b / 4) * 100, 0, 100);
            pKellyCons = clamp((((pDown * houseOdd) - 1) / b / 4) * 100, 0, 100);

            // Standard units: floor of conservative Kelly (1u = 1% bankroll)
            units = clamp(Math.floor(pKellyCons), 0, 5);
        }

        if (stakeUnitsEl) {
            stakeUnitsEl.textContent = units;
            stakeUnitsEl.style.color = units > 0 ? "var(--accent-color)" : "#ef4444";
        }

        // Money reference based on INTEGER UNITS (1u = 1% bankroll)
        const moneyRefEl = document.getElementById(`${prefix}-stake-money-ref`);
        if (moneyRefEl) {
            if (units > 0 && houseOdd > 1) {
                // Calculation: bankroll * units%
                const moneyStakeRefRaw = bankroll * (units / 100);
                const moneyStakeRef = Math.round(moneyStakeRefRaw / 10) * 10;
                moneyRefEl.textContent = `(≈ ${currBase}${moneyStakeRef})`;
            } else {
                moneyRefEl.textContent = "";
            }
        }

        if (kellyBaseEl) kellyBaseEl.textContent = `Base: ${pKellyBase.toFixed(1)}%`;
        if (kellyConsEl) kellyConsEl.textContent = `Cons: ${pKellyCons.toFixed(1)}%`;

        // 4. EV Monetario y Proyección (Based on integer units)
        if (evSingle && evHundred) {
            if (units > 0 && houseOdd > 1) {
                // Stake is exactly units * 1% bankroll
                const moneyStakeRaw = bankroll * (units / 100);
                const moneyStake = Math.round(moneyStakeRaw / 10) * 10;
                const moneyEv = moneyStake * (evNow / 100);

                evSingle.textContent = `${currBase}${moneyEv.toFixed(2)}`;
                evHundred.textContent = `${currBase}${(moneyEv * 100).toFixed(2)}`;
                evSingle.style.color = "var(--accent-color)";
                evHundred.style.color = "var(--accent-color)";
            } else {
                evSingle.textContent = `${currBase}0.00`;
                evHundred.textContent = `${currBase}0.00`;
                evSingle.style.color = "var(--text-secondary)";
                evHundred.style.color = "var(--text-secondary)";
            }
        }

        // 5. Veredicto Final Actionable
        if (verdictCard) {
            verdictCard.className = "verdict-card"; // Reset
            if (houseOdd <= 1 || units === 0 || evNow <= 0) {
                verdictCard.classList.add("verdict-no-bet");
                if (verdictIcon) verdictIcon.textContent = "❌";
                if (verdictTitle) { verdictTitle.textContent = "No apostar"; verdictTitle.style.color = "#ef4444"; }
                if (verdictReason) verdictReason.textContent = "Expectativa negativa o el riesgo conservador es inviable.";
            } else if (evDown <= 0) {
                verdictCard.classList.add("verdict-reduce");
                if (verdictIcon) verdictIcon.textContent = "⚠️";
                if (verdictTitle) { verdictTitle.textContent = "Apostar con stake reducido"; verdictTitle.style.color = "#f59e0b"; }
                if (verdictReason) verdictReason.textContent = "Valor positivo pero frágil si tu cálculo de prob falla en un 5%.";
            } else {
                verdictCard.classList.add("verdict-bet");
                if (verdictIcon) verdictIcon.textContent = "✅";
                if (verdictTitle) { verdictTitle.textContent = "Apostar"; verdictTitle.style.color = "#4ade80"; }
                if (verdictReason) verdictReason.textContent = "Cálculo robusto. El valor se mantiene en escenarios adversos.";
            }
        }

        // 6. Sensitivity Visuals
        if (downEl) {
            downEl.textContent = formatSigned(evDown, 2) + "%";
            downEl.style.color = evDown > 0 ? "var(--accent-color)" : "#ef4444";
        }
        if (upEl) {
            upEl.textContent = formatSigned(evUp, 2) + "%";
            upEl.style.color = evUp > 0 ? "var(--accent-color)" : "#ef4444";
        }
        if (sensOddDownEl) {
            sensOddDownEl.textContent = formatSigned(evOddDown, 2) + "%";
            sensOddDownEl.style.color = evOddDown > 0 ? "var(--accent-color)" : "#ef4444";
        }
        if (sensOddUpEl) {
            sensOddUpEl.textContent = formatSigned(evOddUp, 2) + "%";
            sensOddUpEl.style.color = evOddUp > 0 ? "var(--accent-color)" : "#ef4444";
        }

    };

    const formatSigned = (n, decimals = 2) => {
        if (!Number.isFinite(n)) return "0.00";
        const sign = n > 0 ? "+" : "";
        return sign + n.toFixed(decimals);
    };

    const poissonCdf = (k, lambda) => {
        // P(X <= k) for Poisson(lambda)
        if (!Number.isFinite(lambda) || lambda < 0) return 0;
        if (!Number.isFinite(k) || k < 0) return 0;
        let sum = 0;
        let term = Math.exp(-lambda); // i=0
        sum += term;
        for (let i = 1; i <= k; i++) {
            term *= lambda / i;
            sum += term;
        }
        return clamp(sum, 0, 1);
    };

    const calculateOverProbability = (lambdaHome, lambdaAway, line) => {
        const totalLambda = lambdaHome + lambdaAway;
        if (line % 0.5 === 0) {
            // Standard lines (0.5, 1.0, 1.5...)
            const k = Math.floor(line);
            return 1 - poissonCdf(k, totalLambda);
        } else {
            // Asian lines (0.25, 0.75)
            // Example 2.25 is average of 2.0 and 2.5
            const lineLower = line - 0.25;
            const lineUpper = line + 0.25;
            const pLower = 1 - poissonCdf(Math.floor(lineLower), totalLambda);
            const pUpper = 1 - poissonCdf(Math.floor(lineUpper), totalLambda);
            return (pLower + pUpper) / 2;
        }
    };

    // --- BTTS Logic ---
    const calculateBtts = () => {
        const localScored = clamp(toNumber(bttsLocalScored.value), 0, 100);
        const localConceded = clamp(toNumber(bttsLocalConceded.value), 0, 100);
        const visitorScored = clamp(toNumber(bttsVisitorScored.value), 0, 100);
        const visitorConceded = clamp(toNumber(bttsVisitorConceded.value), 0, 100);

        const houseOdd = toNumber(bttsHouseOdd.value, 0);
        const sampleSizeRaw = Math.round(toNumber(bttsSample.value, 10));
        const sampleSize = clamp(sampleSizeRaw, 1, 20);

        const bankroll = Math.max(0, parseBankroll(bankrollInput.value));
        const currency = getCurrencySymbol(currencySelect);
        const mode = (bttsMode && bttsMode.value) ? bttsMode.value : "hybrid";

        if (bttsSample && String(bttsSample.value) !== String(sampleSize)) bttsSample.value = sampleSize;

        const avgSLocal = Math.max(0, toNumber(bttsLocalAvgScored.value, 0));
        const avgCLocal = Math.max(0, toNumber(bttsLocalAvgConceded.value, 0));
        const avgSVisitor = Math.max(0, toNumber(bttsVisitorAvgScored.value, 0));
        const avgCVisitor = Math.max(0, toNumber(bttsVisitorAvgConceded.value, 0));

        let lambdaHome = (avgSLocal + avgCVisitor) / 2;
        let lambdaAway = (avgSVisitor + avgCLocal) / 2;

        const rawLambdaHome = lambdaHome;
        const rawLambdaAway = lambdaAway;

        const xgWeight = Math.min(1, 0.1 + (sampleSize - 1) * (0.9 / 19));

        if (lambdaHome > 3.0) lambdaHome = 3.0 + (lambdaHome - 3.0) * xgWeight;
        if (lambdaAway > 3.0) lambdaAway = 3.0 + (lambdaAway - 3.0) * xgWeight;

        if (bttsLocalXg) bttsLocalXg.textContent = lambdaHome.toFixed(2);
        if (bttsVisitorXg) bttsVisitorXg.textContent = lambdaAway.toFixed(2);

        const probabilityPoisson = (1 - Math.exp(-lambdaHome) - Math.exp(-lambdaAway) + Math.exp(-(lambdaHome + lambdaAway))) * 100;

        const probLocal = (1 - Math.exp(-lambdaHome)) * 100;
        const probVisitor = (1 - Math.exp(-lambdaAway)) * 100;
        if (bttsLocalProb) bttsLocalProb.textContent = probLocal.toFixed(1);
        if (bttsVisitorProb) bttsVisitorProb.textContent = probVisitor.toFixed(1);

        const probPercentageRaw = (localScored * visitorScored) / 100;
        const baseline = 53;
        const k = 10;
        const w = sampleSize / (sampleSize + k);
        const adjustedEmpirical = (w * probPercentageRaw) + ((1 - w) * baseline);

        let probabilityFinal = adjustedEmpirical;
        if (mode === "model") {
            probabilityFinal = probabilityPoisson;
        } else if (mode === "empirical") {
            probabilityFinal = adjustedEmpirical;
        } else {
            if (sampleSize < 8) probabilityFinal = (0.3 * probabilityPoisson) + (0.7 * adjustedEmpirical);
            else if (sampleSize <= 15) probabilityFinal = (0.5 * probabilityPoisson) + (0.5 * adjustedEmpirical);
            else probabilityFinal = (0.7 * probabilityPoisson) + (0.3 * adjustedEmpirical);
        }

        // --- BTTS Sí/No Dual Logic ---
        const probYes = probabilityFinal;
        const probNo = 100 - probYes;
        const fairYes = probYes > 0 ? (100 / probYes) : 0;
        const fairNo = probNo > 0 ? (100 / probNo) : 0;

        const bttsYesProbEl = document.getElementById('btts-yes-prob');
        const bttsNoProbEl = document.getElementById('btts-no-prob');
        const bttsYesFairEl = document.getElementById('btts-yes-fair');
        const bttsNoFairEl = document.getElementById('btts-no-fair');

        if (bttsYesProbEl) bttsYesProbEl.textContent = probYes.toFixed(1);
        if (bttsNoProbEl) bttsNoProbEl.textContent = probNo.toFixed(1);
        if (bttsYesFairEl) bttsYesFairEl.textContent = fairYes > 0 ? fairYes.toFixed(2) : '-.--';
        if (bttsNoFairEl) bttsNoFairEl.textContent = fairNo > 0 ? fairNo.toFixed(2) : '-.--';

        // Highlight BTTS winner
        if (bttsYesContainer) bttsYesContainer.classList.toggle("winner-card", probYes >= probNo);
        if (bttsNoContainer) bttsNoContainer.classList.toggle("winner-card", probNo > probYes);

        // --- Sample Quality Indicator ---
        const sampleBadge = document.getElementById('sample-quality-badge');
        let sampleStrength = "decent";
        if (sampleSize < 5) sampleStrength = "low";
        else if (sampleSize <= 10) sampleStrength = "medium";

        if (sampleBadge) {
            sampleBadge.style.display = 'inline-block';
            if (sampleStrength === "low") {
                sampleBadge.textContent = "Muestra Baja";
                sampleBadge.className = "robust-badge badge-sample-low";
            } else if (sampleStrength === "medium") {
                sampleBadge.textContent = "Muestra Media";
                sampleBadge.className = "robust-badge badge-sample-medium";
            } else {
                sampleBadge.textContent = "Muestra Decente";
                sampleBadge.className = "robust-badge badge-sample-decent";
            }
        }

        const neutralBaseline = 1.33;
        const kGoals = 10;
        const lambdaHomeAdj = (rawLambdaHome * sampleSize + neutralBaseline * kGoals) / (sampleSize + kGoals);
        const lambdaAwayAdj = (rawLambdaAway * sampleSize + neutralBaseline * kGoals) / (sampleSize + kGoals);
        const combinedAvg = lambdaHomeAdj + lambdaAwayAdj;
        if (bttsCombinedAvg) bttsCombinedAvg.textContent = combinedAvg > 0 ? combinedAvg.toFixed(2) : "---";

        // --- O/U probabilities ---
        const ouLine = clamp(toNumber(ouLineSelect ? ouLineSelect.value : 2.5, 2.5), 0.5, 6.0);
        const kLine = Math.floor(ouLine);
        const underOU = poissonCdf(kLine, combinedAvg);
        const overOU = clamp(1 - underOU, 0, 1);
        const overPct = overOU * 100;
        const underPct = underOU * 100;

        const lineLabel = ouLine % 0.5 === 0 ? ouLine.toFixed(1) : ouLine.toFixed(2);
        if (ouOverTitle) ouOverTitle.textContent = `Over ${lineLabel}`;
        if (ouUnderTitle) ouUnderTitle.textContent = `Under ${lineLabel}`;
        if (ouOverProbEl) ouOverProbEl.textContent = overPct.toFixed(1);
        if (ouUnderProbEl) ouUnderProbEl.textContent = underPct.toFixed(1);
        if (ouOverFairEl) ouOverFairEl.textContent = overOU > 0 ? (1 / overOU).toFixed(2) : "-.--";
        if (ouUnderFairEl) ouUnderFairEl.textContent = underOU > 0 ? (1 / underOU).toFixed(2) : "-.--";

        const ouPick = (overPct >= underPct) ? "over" : "under";
        if (ouOverContainer) ouOverContainer.classList.toggle("winner-card", ouPick === "over");
        if (ouUnderContainer) ouUnderContainer.classList.toggle("winner-card", ouPick === "under");
        if (ouPickLabel) ouPickLabel.textContent = ouPick === "over" ? `Over ${lineLabel}` : `Under ${lineLabel}`;

        // --- O/U Optimal Line Scanner ---
        const linesToScan = [1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0, 3.25, 3.5];
        let bestLine = 2.5;
        let bestScore = -999;
        let bestType = "Over";

        linesToScan.forEach(l => {
            const pOver = calculateOverProbability(lambdaHomeAdj, lambdaAwayAdj, l) * 100;
            const pUnder = 100 - pOver;
            const scoreOver = pOver > 48 && pOver < 62 ? pOver : pOver * 0.4;
            const scoreUnder = pUnder > 48 && pUnder < 62 ? pUnder : pUnder * 0.4;
            if (scoreOver > bestScore) { bestScore = scoreOver; bestLine = l; bestType = "Over"; }
            if (scoreUnder > bestScore) { bestScore = scoreUnder; bestLine = l; bestType = "Under"; }
        });
        const bestLineLabel = bestLine % 0.5 === 0 ? bestLine.toFixed(1) : bestLine.toFixed(2);
        const optLineValue = document.getElementById('ou-optimal-line-value');
        if (optLineValue) optLineValue.textContent = `${bestType} ${bestLineLabel}`;

        // --- Market Choice & Pro Analysis ---
        let pSelected = 0;
        let pickLabel = "";
        if (currentBttsMarket === "ou") {
            const isOver = ouPick === "over";
            pSelected = isOver ? overPct : underPct;
            pickLabel = isOver ? `Over ${ouLine.toFixed(1)}` : `Under ${ouLine.toFixed(1)}`;
        } else {
            pSelected = probYes;
            pickLabel = probYes >= 50 ? "BTTS Sí" : "BTTS No";
        }

        const fairOddSelected = pSelected > 0 ? (100 / pSelected) : 0;
        updateHero(pickLabel, pSelected, fairOddSelected);

        // Edge and EV calculations
        if (houseOdd > 1) {
            const evPct = ((pSelected / 100) * houseOdd - 1) * 100;
            const displayedFairOdd = parseFloat(fairOddSelected.toFixed(2));
            const edgePct = displayedFairOdd > 0 ? (houseOdd - displayedFairOdd) : 0;

            if (bttsEdgeValue) {
                bttsEdgeValue.textContent = formatSigned(edgePct, 2);
                bttsEdgeValue.parentElement.style.color = edgePct > 0 ? "var(--accent-color)" : (edgePct < 0 ? "#ef4444" : "var(--text-primary)");
            }
            if (bttsEvValue) {
                bttsEvValue.textContent = formatSigned(evPct, 2);
                bttsEvValue.parentElement.style.color = evPct > 0 ? "var(--accent-color)" : "#ef4444";
            }

            // Value Badge Analysis for BTTS
            updateValueTag(evPct, pSelected, houseOdd, bttsBadge, bttsExplanation, bttsBadgeContainer);
        } else {
            if (bttsEdgeValue) bttsEdgeValue.textContent = "0.00";
            if (bttsEvValue) bttsEvValue.textContent = "0.00";
            if (bttsBadgeContainer) bttsBadgeContainer.style.display = 'none';
        }

        updateProSensitivity(pSelected, houseOdd, sensBttsDown, sensBttsUp, sensBttsReading, proSectionBtts, 'btts', penalty);

        // Kelly / Stake
        if (houseOdd > 1 && bttsKellyCard) {
            bttsKellyCard.style.display = 'flex';
            const p = pSelected / 100;
            const pDown = clamp(p - penalty, 0.01, 0.99);
            const b = houseOdd - 1;
            const pKellyCons = clamp((((pDown * houseOdd) - 1) / b / 4) * 100, 0, 100);
            const units = clamp(Math.floor(pKellyCons), 0, 5);
            const stakeMoneyRounded = Math.round((bankroll * units / 100) / 10) * 10;

            if (bttsKellyStake) {
                if (units === 0) {
                    bttsKellyStake.textContent = "0.00% (Referencia)";
                    bttsKellyStake.style.color = "var(--text-secondary)";
                } else {
                    bttsKellyStake.textContent = `${units}u (${currency}${stakeMoneyRounded})`;
                    bttsKellyStake.style.color = "var(--accent-color)";
                }
            }
        } else if (bttsKellyCard) {
            bttsKellyCard.style.display = 'none';
        }

        saveState();
    };


    // --- Probability Calculator Logic ---
    const calculate = () => {
        const probA = clamp(toNumber(inputA.value), 0, 100);
        const probB = clamp(toNumber(inputB.value), 0, 100);
        const houseOdd = toNumber(houseOddInput.value, 0);
        const bankroll = Math.max(0, parseBankroll(bankrollInput.value));
        const currencySymbol = getCurrencySymbol(currencySelect);

        // Average probability
        const p = clamp(((probA + probB) / 2) / 100, 0, 1);
        displayAverage.textContent = (p * 100).toFixed(1) + '%';

        // Fair odd
        const fairOdd = p > 0 ? (1 / p) : 0;
        singleOddDisplay.textContent = fairOdd > 0 ? fairOdd.toFixed(2) : '-.--';

        if (houseOdd > 1) {
            summaryHouseOdd.textContent = houseOdd.toFixed(2);

            const p_house = 1 / houseOdd;
            displayHouseProb.textContent = (p_house * 100).toFixed(1) + '%';

            // EV and Edge (different things)
            const evPct = ((p * houseOdd) - 1) * 100;
            const displayedFairOdd = parseFloat(fairOdd.toFixed(2));
            const edgePct = displayedFairOdd > 0 ? (houseOdd - displayedFairOdd) : 0;

            edgeContainer.style.display = 'block';
            edgeDivider.style.display = 'block';
            edgeValueDisplay.textContent = formatSigned(edgePct, 2);
            edgeValueDisplay.parentElement.style.color = edgePct > 0 ? "var(--accent-color)" : (edgePct < 0 ? "#ef4444" : "var(--text-primary)");

            evContainer.style.display = 'block';
            evDivider.style.display = 'block';
            evValueDisplay.textContent = formatSigned(evPct, 2);
            evValueDisplay.parentElement.style.color = evPct > 0 ? "var(--accent-color)" : "#ef4444";

            // Value Badge & Pro Sensitivity
            updateValueTag(evPct, p * 100, houseOdd, probBadge, probExplanation, probBadgeContainer);
            updateProSensitivity(p * 100, houseOdd, sensProbDown, sensProbUp, sensProbReading, proSectionProb, 'prob');

            // Kelly 1/4
            const f = kellyFraction(p, houseOdd, 0.25);
            const stakePct = f * 100;

            // Units mapping (1u = 1% bankroll)
            let units = clamp(Math.floor(stakePct), 0, 5);
            const stakeAmountRounded = Math.round((bankroll * units / 100) / 10) * 10;

            kellyCard.style.display = 'flex';
            if (units === 0) {
                kellyStakeDisplay.textContent = "0.00% (Referencia)";
                kellyStakeDisplay.parentElement.style.color = "var(--text-secondary)";
            } else {
                kellyStakeDisplay.textContent = `${units}u (${currencySymbol}${stakeAmountRounded})`;
                kellyStakeDisplay.parentElement.style.color = "var(--accent-color)";
                // Small percentage detail hidden
                const kellyPctEl = document.getElementById('kelly-pct');
                if (kellyPctEl) kellyPctEl.style.display = 'none';
            }
        } else {
            summaryHouseOdd.textContent = '-.--';
            displayHouseProb.textContent = '0.0%';
            edgeContainer.style.display = 'none';
            evContainer.style.display = 'none';
            kellyCard.style.display = 'none';
        }
    };

    // --- Ingreso de Partidos Logic ---
    let currentManualTeam = "";
    const MAX_MANUAL_ROWS = 20;
    const DEFAULT_ROWS = 5;
    let visibleRows = DEFAULT_ROWS;

    const manualData = {
        Local: Array.from({ length: MAX_MANUAL_ROWS }, () => ({ scored: "", conceded: "" })),
        Visitor: Array.from({ length: MAX_MANUAL_ROWS }, () => ({ scored: "", conceded: "" }))
    };

    const matchRowsContainer = document.getElementById('match-rows');
    const manualScoredPercent = document.getElementById('manual-scored-percent');
    const manualConcededPercent = document.getElementById('manual-conceded-percent');
    const manualPlayedCount = document.getElementById('manual-played-count');
    const btnAddRow = document.getElementById('btn-add-row');
    const pasteArea = document.getElementById('paste-area');
    const pasteFeedback = document.getElementById('paste-feedback');

    // Parse a score string: accepts "2-1", "2:1", "2 1"
    const parseScore = (str) => {
        if (!str || !str.trim()) return null;
        const s = str.trim();
        const m = s.match(/^(\d+)(?:[-:\s])(\d+)$/);
        if (!m) return null;
        return { scored: parseInt(m[1], 10), conceded: parseInt(m[2], 10) };
    };

    // Show feedback message in the paste area
    const showPasteFeedback = (msg, type) => {
        if (!pasteFeedback) return;
        pasteFeedback.textContent = msg;
        pasteFeedback.className = 'paste-feedback ' + (type || 'success');
        pasteFeedback.style.display = 'block';
        clearTimeout(pasteFeedback._timer);
        pasteFeedback._timer = setTimeout(() => {
            pasteFeedback.style.display = 'none';
        }, 4000);
    };

    // Update the add-row button state
    const updateAddRowBtn = () => {
        if (!btnAddRow) return;
        btnAddRow.disabled = visibleRows >= MAX_MANUAL_ROWS;
        btnAddRow.textContent = visibleRows >= MAX_MANUAL_ROWS
            ? `M\u00e1x. ${MAX_MANUAL_ROWS} partidos`
            : `+ Agregar partido (${visibleRows}/${MAX_MANUAL_ROWS})`;
    };

    const generateMatchRows = (focusIndex = -1) => {
        if (!matchRowsContainer) return;
        matchRowsContainer.innerHTML = "";
        const isVisitor = currentManualTeam === 'Equipo Visitante';
        const teamData = manualData[isVisitor ? 'Visitor' : 'Local'];

        for (let i = 0; i < visibleRows; i++) {
            const s = teamData[i].scored;
            const c = teamData[i].conceded;
            const hasData = s !== "" || c !== "";
            const displayVal = hasData ? `${s === '' ? '?' : s}-${c === '' ? '?' : c}` : '';

            const row = document.createElement('div');
            row.className = 'match-row';
            row.innerHTML = `
                <div class="match-label">P${i + 1}</div>
                <div class="score-field-wrapper">
                    <input
                        type="text"
                        class="score-input"
                        placeholder="2-1"
                        value="${displayVal}"
                        data-index="${i}"
                        autocomplete="off"
                        inputmode="numeric"
                    >
                    <span class="score-preview${hasData ? ' filled' : ''}" id="score-prev-${i}">
                        ${hasData ? (isVisitor ? `${c}-${s}` : `${s}-${c}`) : ''}
                    </span>
                </div>
            `;
            matchRowsContainer.appendChild(row);
        }

        // Attach events
        matchRowsContainer.querySelectorAll('.score-input').forEach(input => {
            const idx = parseInt(input.dataset.index);
            const isVisitorTeam = currentManualTeam === 'Equipo Visitante';
            const teamKey = isVisitorTeam ? 'Visitor' : 'Local';

            input.addEventListener('input', () => {
                const raw = input.value.trim();
                const parsed = parseScore(raw);
                input.classList.toggle('invalid', raw !== '' && !parsed);

                if (parsed) {
                    manualData[teamKey][idx].scored = parsed.scored;
                    manualData[teamKey][idx].conceded = parsed.conceded;
                    const prev = document.getElementById(`score-prev-${idx}`);
                    if (prev) {
                        prev.textContent = isVisitorTeam ? `${parsed.conceded}-${parsed.scored}` : `${parsed.scored}-${parsed.conceded}`;
                        prev.className = 'score-preview filled';
                    }
                } else if (raw === '') {
                    manualData[teamKey][idx].scored = '';
                    manualData[teamKey][idx].conceded = '';
                    const prev = document.getElementById(`score-prev-${idx}`);
                    if (prev) { prev.textContent = ''; prev.className = 'score-preview'; }
                }
                updateManualStats();
                saveState();
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const raw = input.value.trim();
                    const parsed = parseScore(raw);
                    if (parsed) {
                        // Advance to next row
                        const nextIdx = idx + 1;
                        if (nextIdx < visibleRows) {
                            const next = matchRowsContainer.querySelector(`.score-input[data-index="${nextIdx}"]`);
                            if (next) { next.focus(); next.select(); }
                        } else if (visibleRows < MAX_MANUAL_ROWS) {
                            // Auto-add a row
                            visibleRows++;
                            generateMatchRows(visibleRows - 1);
                            updateAddRowBtn();
                        }
                    }
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const next = matchRowsContainer.querySelector(`.score-input[data-index="${idx + 1}"]`);
                    if (next) { next.focus(); next.select(); }
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prev = matchRowsContainer.querySelector(`.score-input[data-index="${idx - 1}"]`);
                    if (prev) { prev.focus(); prev.select(); }
                }
            });
        });

        // Focus requested row
        if (focusIndex >= 0) {
            const target = matchRowsContainer.querySelector(`.score-input[data-index="${focusIndex}"]`);
            if (target) { target.focus(); target.select(); }
        }

        updateAddRowBtn();
    };

    const updateManualStats = () => {
        const teamData = manualData[currentManualTeam === 'Equipo Local' ? 'Local' : 'Visitor'];
        let played = 0, scoredGames = 0, concededGames = 0, totalScored = 0, totalConceded = 0;

        teamData.forEach(match => {
            if (match.scored !== "" || match.conceded !== "") {
                played++;
                const s = parseInt(match.scored) || 0;
                const c = parseInt(match.conceded) || 0;
                if (s > 0) scoredGames++;
                if (c > 0) concededGames++;
                totalScored += s;
                totalConceded += c;
            }
        });

        const sPercent = played > 0 ? (scoredGames / played) * 100 : 0;
        const cPercent = played > 0 ? (concededGames / played) * 100 : 0;
        const avgS = played > 0 ? totalScored / played : 0;
        const avgC = played > 0 ? totalConceded / played : 0;

        if (manualScoredPercent) manualScoredPercent.textContent = `${sPercent.toFixed(0)}%`;
        if (manualConcededPercent) manualConcededPercent.textContent = `${cPercent.toFixed(0)}%`;
        if (manualPlayedCount) manualPlayedCount.textContent = played;

        if (currentManualTeam === 'Equipo Local') {
            bttsLocalScored.value = sPercent.toFixed(0);
            bttsLocalConceded.value = cPercent.toFixed(0);
            bttsLocalAvgScored.value = avgS.toFixed(1);
            bttsLocalAvgConceded.value = avgC.toFixed(1);
        } else {
            bttsVisitorScored.value = sPercent.toFixed(0);
            bttsVisitorConceded.value = cPercent.toFixed(0);
            bttsVisitorAvgScored.value = avgS.toFixed(1);
            bttsVisitorAvgConceded.value = avgC.toFixed(1);
        }
        bttsSample.value = played > 0 ? played : 10;
        saveState();
        debouncedCalculateBtts();
    };


    // --- Persistencia (localStorage) ---
    const STORAGE_KEY = "betcalc_state_v1";

    const saveState = () => {
        try {
            const state = {
                currency: currencySelect ? currencySelect.value : "CLP",
                bankroll: bankrollInput ? parseBankroll(bankrollInput.value) : 1000,
                lastView: (calculatorView && calculatorView.style.display !== 'none') ? "calculator"
                    : (bttsManualView && bttsManualView.style.display !== 'none') ? "manual"
                        : (bttsView && bttsView.style.display !== 'none') ? "btts"
                            : "menu",
                bttsMode: bttsMode ? bttsMode.value : "hybrid",
                bttsMarket: currentBttsMarket,
                ouLine: ouLineSelect ? ouLineSelect.value : "2.5",
                proModeProb,
                proModeBtts,
                manualData
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (_) { /* silencio, como tus bugs */ }
    };

    const loadState = () => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            const state = JSON.parse(raw);

            if (currencySelect && state.currency) currencySelect.value = state.currency;
            if (bankrollInput && state.bankroll != null) bankrollInput.value = formatBankroll(Number(state.bankroll) || 1000);

            if (bttsMode && state.bttsMode) bttsMode.value = state.bttsMode;
            if (state.bttsMarket) currentBttsMarket = state.bttsMarket;
            if (ouLineSelect && state.ouLine) ouLineSelect.value = state.ouLine;

            if (state.proModeProb !== undefined) {
                proModeProb = state.proModeProb;
                if (proModeToggleProb) proModeToggleProb.checked = proModeProb;
            }
            if (state.proModeBtts !== undefined) {
                proModeBtts = state.proModeBtts;
                if (proModeToggleBtts) proModeToggleBtts.checked = proModeBtts;
            }

            // Restore manual data safely
            if (state.manualData && state.manualData.Local && state.manualData.Visitor) {
                manualData.Local = state.manualData.Local.map(m => ({ scored: m.scored ?? "", conceded: m.conceded ?? "" })).slice(0, MAX_MANUAL_ROWS);
                manualData.Visitor = state.manualData.Visitor.map(m => ({ scored: m.scored ?? "", conceded: m.conceded ?? "" })).slice(0, MAX_MANUAL_ROWS);
                // Ensure length MAX_MANUAL_ROWS
                while (manualData.Local.length < MAX_MANUAL_ROWS) manualData.Local.push({ scored: "", conceded: "" });
                while (manualData.Visitor.length < MAX_MANUAL_ROWS) manualData.Visitor.push({ scored: "", conceded: "" });
            }

            // Apply stats to inputs (without opening manual view)
            const syncFromManualToInputs = () => {
                const calcStats = (arr) => {
                    let played = 0, scoredGames = 0, concededGames = 0, totalScored = 0, totalConceded = 0;
                    arr.forEach(match => {
                        if (match.scored !== "" || match.conceded !== "") {
                            played++;
                            const s = parseInt(match.scored) || 0;
                            const c = parseInt(match.conceded) || 0;
                            if (s > 0) scoredGames++;
                            if (c > 0) concededGames++;
                            totalScored += s;
                            totalConceded += c;
                        }
                    });
                    return {
                        played,
                        sPercent: played ? (scoredGames / played) * 100 : 0,
                        cPercent: played ? (concededGames / played) * 100 : 0,
                        avgS: played ? (totalScored / played) : 0,
                        avgC: played ? (totalConceded / played) : 0
                    };
                };

                const local = calcStats(manualData.Local);
                const visitor = calcStats(manualData.Visitor);

                if (bttsLocalScored) bttsLocalScored.value = local.sPercent.toFixed(0);
                if (bttsLocalConceded) bttsLocalConceded.value = local.cPercent.toFixed(0);
                if (bttsLocalAvgScored) bttsLocalAvgScored.value = local.avgS.toFixed(1);
                if (bttsLocalAvgConceded) bttsLocalAvgConceded.value = local.avgC.toFixed(1);

                if (bttsVisitorScored) bttsVisitorScored.value = visitor.sPercent.toFixed(0);
                if (bttsVisitorConceded) bttsVisitorConceded.value = visitor.cPercent.toFixed(0);
                if (bttsVisitorAvgScored) bttsVisitorAvgScored.value = visitor.avgS.toFixed(1);
                if (bttsVisitorAvgConceded) bttsVisitorAvgConceded.value = visitor.avgC.toFixed(1);

                const defaultSample = clamp(Math.max(local.played, visitor.played, 10), 1, 20);
                if (bttsSample) bttsSample.value = defaultSample;
            };

            syncFromManualToInputs();
            applyBttsMarketUI();
            debouncedCalculateBtts();

            // Restore view
            if (state.lastView === "calculator") showView(calculatorView);
            else if (state.lastView === "manual") showView(bttsManualView);
            else if (state.lastView === "btts") showView(bttsView);
            else showView(mainMenu);

        } catch (_) { /* no-op */ }
    };
    // --- Navigation ---
    const showView = (view) => {
        [mainMenu, calculatorView, bttsView, bttsManualView].forEach(v => {
            if (v) v.style.display = 'none';
        });
        if (view) view.style.display = 'block';
        saveState();
    };

    const showManualEntry = (team) => {
        currentManualTeam = team;
        showView(bttsManualView);
        if (manualTeamName) manualTeamName.textContent = team;
        // Restore visible rows: at least as many as have data, but minimum DEFAULT_ROWS
        const teamKey = team === 'Equipo Local' ? 'Local' : 'Visitor';
        const dataCount = manualData[teamKey].filter(m => m.scored !== '' || m.conceded !== '').length;
        visibleRows = Math.max(dataCount, DEFAULT_ROWS);
        if (pasteArea) pasteArea.value = '';
        if (pasteFeedback) pasteFeedback.style.display = 'none';
        generateMatchRows();
        updateManualStats();
    };

    // --- Event Listeners ---
    const debouncedCalculate = debounce(() => {
        calculate();
        // Auto-save significant calculations
        const p = clamp(((toNumber(inputA.value) + toNumber(inputB.value)) / 2) / 100, 0, 1);
        const odd = toNumber(houseOddInput.value, 0);
        if (odd > 1 && p > 0) {
            const ev = ((p * odd) - 1) * 100;
            saveToHistory({
                type: 'prob', market: 'Probabilidades', prob: p * 100, odd, ev,
                valA: inputA.value, valB: inputB.value
            });
        }
    }, 2000); // 2s delay for auto-save

    const debouncedCalculateBtts = debounce(() => {
        calculateBtts();
        // Auto-save significant calculations
        const odd = toNumber(bttsHouseOdd.value, 0);
        const valFinal = parseFloat(bttsAvgProb.textContent) || 0;
        if (odd > 1 && valFinal > 0) {
            const ev = ((valFinal / 100) * odd - 1) * 100;
            saveToHistory({
                type: 'btts', market: currentBttsMarket.toUpperCase(), marketType: currentBttsMarket,
                prob: valFinal, odd, ev,
                lS: bttsLocalScored.value, lC: bttsLocalConceded.value,
                vS: bttsVisitorScored.value, vC: bttsVisitorConceded.value
            });
        }
    }, 2000); // 2s delay for auto-save

    // Initial simple debounced for live updates (no save)
    const liveUpdateProb = debounce(calculate, 150);
    const liveUpdateBtts = debounce(calculateBtts, 150);

    if (btnProbability) btnProbability.addEventListener('click', () => showView(calculatorView));
    if (btnBtts) btnBtts.addEventListener('click', () => { showView(bttsView); calculateBtts(); debouncedCalculateBtts(); });
    if (btnBack) btnBack.addEventListener('click', () => showView(mainMenu));
    if (btnBackBtts) btnBackBtts.addEventListener('click', () => showView(mainMenu));
    if (btnBackManual) btnBackManual.addEventListener('click', () => showView(bttsView));
    if (btnManualLocal) btnManualLocal.addEventListener('click', () => showManualEntry('Equipo Local'));
    if (btnManualVisitor) btnManualVisitor.addEventListener('click', () => showManualEntry('Equipo Visitante'));

    // BTTS / O-U mode toggles
    if (btnBttsMode) {
        btnBttsMode.addEventListener('click', () => {
            currentBttsMarket = "btts";
            applyBttsMarketUI();
            saveState();
            calculateBtts();
            debouncedCalculateBtts();
        });
    }
    if (btnOuMode) {
        btnOuMode.addEventListener('click', () => {
            currentBttsMarket = "ou";
            applyBttsMarketUI();
            saveState();
            calculateBtts();
            debouncedCalculateBtts();
        });
    }
    if (ouLineSelect) {
        ouLineSelect.addEventListener('change', () => {
            saveState();
            calculateBtts();
            debouncedCalculateBtts();
        });
    }


    // Clear All BTTS Form with Confirmation (Main BTTS View)
    if (btnClearBtts) {
        let bttsClearStage = 0, bttsClearTimer = null;
        btnClearBtts.addEventListener('click', () => {
            if (bttsClearStage === 0) {
                bttsClearStage = 1;
                btnClearBtts.textContent = "¿Confirmar?";
                btnClearBtts.classList.add('confirming');
                bttsClearTimer = setTimeout(() => {
                    bttsClearStage = 0;
                    btnClearBtts.textContent = "Borrar Datos";
                    btnClearBtts.classList.remove('confirming');
                }, 3000);
            } else {
                if (bttsClearTimer) clearTimeout(bttsClearTimer);

                // Reset all manual data arrays to empty slots
                manualData['Local'] = Array.from({ length: MAX_MANUAL_ROWS }, () => ({ scored: "", conceded: "" }));
                manualData['Visitor'] = Array.from({ length: MAX_MANUAL_ROWS }, () => ({ scored: "", conceded: "" }));

                // Clear the BTTS inputs visually (and in state)
                const zeroInputs = [bttsLocalScored, bttsLocalConceded, bttsVisitorScored, bttsVisitorConceded];
                const zeroDecimals = [bttsLocalAvgScored, bttsLocalAvgConceded, bttsVisitorAvgScored, bttsVisitorAvgConceded];

                zeroInputs.forEach(i => { if (i) i.value = "0"; });
                zeroDecimals.forEach(i => { if (i) i.value = "0.0"; });
                if (bttsSample) bttsSample.value = "10";

                // Apply calculations right away to reflect empty state
                saveState();
                calculateBtts();
                debouncedCalculateBtts();

                bttsClearStage = 0;
                btnClearBtts.textContent = "Borrar Datos";
                btnClearBtts.classList.remove('confirming');
            }
        });
    }

    // Clear Manual Rows with Confirmation (Inside detail view)
    if (btnClearManual) {
        let clearStage = 0, clearTimer = null;
        btnClearManual.addEventListener('click', () => {
            if (clearStage === 0) {
                clearStage = 1;
                btnClearManual.textContent = "\u00bfConfirmar?";
                btnClearManual.classList.add('confirming');
                clearTimer = setTimeout(() => {
                    clearStage = 0;
                    btnClearManual.textContent = "Borrar Todo";
                    btnClearManual.classList.remove('confirming');
                }, 3000);
            } else {
                if (clearTimer) clearTimeout(clearTimer);
                const teamKey = currentManualTeam === 'Equipo Local' ? 'Local' : 'Visitor';
                manualData[teamKey] = Array.from({ length: MAX_MANUAL_ROWS }, () => ({ scored: "", conceded: "" }));
                visibleRows = DEFAULT_ROWS;
                if (pasteArea) pasteArea.value = '';
                if (pasteFeedback) pasteFeedback.style.display = 'none';
                generateMatchRows();
                updateManualStats();
                saveState();
                clearStage = 0;
                btnClearManual.textContent = "Borrar Todo";
                btnClearManual.classList.remove('confirming');
            }
        });
    }

    // Add Row Button
    if (btnAddRow) {
        btnAddRow.addEventListener('click', () => {
            if (visibleRows < MAX_MANUAL_ROWS) {
                visibleRows++;
                generateMatchRows(visibleRows - 1);
                updateAddRowBtn();
            }
        });
    }

    // Paste Area: bulk score entry
    if (pasteArea) {
        pasteArea.addEventListener('input', () => {
            const lines = pasteArea.value.split('\n').map(l => l.trim()).filter(Boolean);
            if (lines.length === 0) return;

            const parsed = lines.map(parseScore);
            const valid = parsed.filter(Boolean);
            if (valid.length === 0) {
                showPasteFeedback('No se encontraron marcadores v\u00e1lidos. Usa: 2-1 \u00b7 2:1 \u00b7 2 1', 'warning');
                return;
            }

            const teamKey = currentManualTeam === 'Equipo Local' ? 'Local' : 'Visitor';
            let truncated = false;

            if (valid.length > MAX_MANUAL_ROWS) {
                truncated = true;
            }

            const toInsert = valid.slice(0, MAX_MANUAL_ROWS);
            // Reset and fill
            manualData[teamKey] = Array.from({ length: MAX_MANUAL_ROWS }, () => ({ scored: "", conceded: "" }));
            toInsert.forEach((p, i) => {
                manualData[teamKey][i].scored = p.scored;
                manualData[teamKey][i].conceded = p.conceded;
            });

            // Expand visible rows to at least what was pasted
            visibleRows = Math.min(Math.max(toInsert.length, DEFAULT_ROWS), MAX_MANUAL_ROWS);
            generateMatchRows();
            updateManualStats();
            saveState();

            if (truncated) {
                showPasteFeedback(`Se tomaron los primeros ${MAX_MANUAL_ROWS} partidos (hab\u00eda ${valid.length}).`, 'warning');
            } else {
                showPasteFeedback(`${toInsert.length} partido${toInsert.length !== 1 ? 's' : ''} cargado${toInsert.length !== 1 ? 's' : ''} correctamente.`, 'success');
            }
        });
    }

    // Calculator Listeners
    [inputA, inputB, houseOddInput].forEach(el => {
        if (el) el.addEventListener('input', () => {
            liveUpdateProb();
            debouncedCalculate(); // This one saves
        });
    });

    // BTTS Listeners
    [bttsLocalScored, bttsLocalConceded, bttsVisitorScored, bttsVisitorConceded, bttsSample, bttsHouseOdd, bttsMode].forEach(el => {
        if (el) el.addEventListener('input', () => {
            liveUpdateBtts();
            debouncedCalculateBtts(); // This one saves
        });
    });

    // Global updates
    if (currencySelect) currencySelect.addEventListener('change', () => {
        if (calculatorView.style.display !== 'none') calculate();
        if (bttsView.style.display !== 'none') debouncedCalculateBtts();
        saveState();
    });
    if (bankrollInput) {
        bankrollInput.addEventListener('input', () => {
            if (calculatorView.style.display !== 'none') calculate();
            if (bttsView.style.display !== 'none') debouncedCalculateBtts();
            saveState();
        });
        bankrollInput.addEventListener('blur', () => {
            const raw = parseBankroll(bankrollInput.value);
            bankrollInput.value = formatBankroll(raw || 1000);
        });
    }
    if (bankrollResetBtn) {
        bankrollResetBtn.addEventListener('click', () => {
            if (bankrollInput) bankrollInput.value = formatBankroll(1000);
            if (calculatorView.style.display !== 'none') calculate();
            if (bttsView.style.display !== 'none') debouncedCalculateBtts();
            saveState();
        });
    }

    // Modal Helpers
    const showDetail = (data) => {
        if (!infoModal || !modalBody) return;
        modalBody.innerHTML = `
            <h3>${data.title}</h3>
            <div class="modal-item">
                <span class="label">RAW (Real)</span>
                <span class="value">${data.raw.toFixed(2)}</span>
            </div>
            <div class="modal-item">
                <span class="label">USED (Ajustado)</span>
                <span class="value">${data.used.toFixed(2)}</span>
            </div>
             <div class="modal-item">
                <span class="label">Peso aplicado (w)</span>
                <span class="value">${data.weight.toFixed(2)}</span>
            </div>
        `;
        infoModal.style.display = 'flex';
    };

    const closeModal = () => {
        if (infoModal) infoModal.style.display = 'none';
    };

    if (modalCloseBtn) modalCloseBtn.onclick = closeModal;
    window.onclick = (event) => {
        if (event.target === infoModal) closeModal();
    };

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    window.addEventListener('beforeunload', saveState);

    // Enhancement Listeners
    if (proModeToggleProb) {
        proModeToggleProb.addEventListener('change', (e) => {
            proModeProb = e.target.checked;
            calculate();
        });
    }

    if (proModeToggleBtts) {
        proModeToggleBtts.addEventListener('change', (e) => {
            proModeBtts = e.target.checked;
            calculateBtts();
        });
    }

    const btnShowHistoryBtts = document.getElementById('btn-show-history-btts');

    if (btnShowHistory) {
        btnShowHistory.addEventListener('click', () => {
            activeHistoryType = 'prob';
            renderHistory();
            if (historyModal) historyModal.style.display = 'flex';
        });
    }

    if (btnShowHistoryBtts) {
        btnShowHistoryBtts.addEventListener('click', () => {
            activeHistoryType = 'btts';
            renderHistory();
            if (historyModal) historyModal.style.display = 'flex';
        });
    }

    if (historyCloseBtn) historyCloseBtn.onclick = () => {
        if (historyModal) historyModal.style.display = 'none';
    };

    historyTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            historyTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeTab = btn.dataset.tab;
            renderHistory();
        });
    });

    // Initial State
    loadState();
    applyBttsMarketUI();

    debouncedCalculate();
    debouncedCalculateBtts();
});
