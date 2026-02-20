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

    const bttsSample = document.getElementById('btts-sample');
    const bttsHouseOdd = document.getElementById('btts-house-odd');
    const bttsMode = document.getElementById('btts-mode');

    // BTTS Result Elements
    const bttsAvgProb = document.getElementById('btts-avg-prob');
    const bttsLocalProb = document.getElementById('btts-local-prob');
    const bttsVisitorProb = document.getElementById('btts-visitor-prob');
    const bttsCombinedAvg = document.getElementById('btts-combined-avg');
    const bttsFairOdd = document.getElementById('btts-fair-odd');
    const bttsEdgeValue = document.getElementById('btts-edge-value');
    const bttsEvValue = document.getElementById('btts-ev-value');
    const bttsKellyStake = document.getElementById('btts-kelly-stake');
    const bttsKellyCard = document.getElementById('btts-kelly-card');

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

    let currentBttsMarket = "btts";

    const applyBttsMarketUI = () => {
        const isBtts = currentBttsMarket === "btts";
        if (bttsPanel) bttsPanel.style.display = isBtts ? "grid" : "none";
        if (ouPanel) ouPanel.style.display = isBtts ? "none" : "grid";

        if (btnBttsMode) {
            btnBttsMode.classList.toggle("active", isBtts);
            btnBttsMode.classList.toggle("winner", false); // winner is set inside calculateBtts
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
    // "btts" | "ou"

    const bttsModelContainer = document.getElementById('btts-model-container');
    const bttsFinalDisplay = document.getElementById('btts-final-display');
    const bttsSampleWarning = document.getElementById('btts-sample-warning');
    const infoModal = document.getElementById('info-modal');
    const modalBody = document.getElementById('modal-body');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    // Constants
    const DECIMAL_PLACES_PROB = 1;
    const DECIMAL_PLACES_ODD = 2;

    // Helper functions
    const getCurrencySymbol = (selectEl) => {
        const code = (selectEl && selectEl.value) ? selectEl.value : 'CLP';
        const map = { CLP: '$', USD: '$', EUR: '€', GBP: '£' };
        return map[code] || '$';
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

    // --- BTTS Logic ---
    const calculateBtts = () => {
        const localScored = clamp(toNumber(bttsLocalScored.value), 0, 100);
        const localConceded = clamp(toNumber(bttsLocalConceded.value), 0, 100);
        const visitorScored = clamp(toNumber(bttsVisitorScored.value), 0, 100);
        const visitorConceded = clamp(toNumber(bttsVisitorConceded.value), 0, 100);

        const houseOdd = toNumber(bttsHouseOdd.value, 0);
        const sampleSizeRaw = Math.round(toNumber(bttsSample.value, 10));
        const sampleSize = clamp(sampleSizeRaw, 1, 20);

        const bankroll = Math.max(0, toNumber(bankrollInput.value, 1000));
        const currency = getCurrencySymbol(currencySelect);
        const mode = (bttsMode && bttsMode.value) ? bttsMode.value : "hybrid";

        // Keep the input itself consistent with clamps
        if (bttsSample && String(bttsSample.value) !== String(sampleSize)) bttsSample.value = sampleSize;

        // Averages from manual entry (goals)
        const avgSLocal = Math.max(0, toNumber(bttsLocalAvgScored.value, 0));
        const avgCLocal = Math.max(0, toNumber(bttsLocalAvgConceded.value, 0));
        const avgSVisitor = Math.max(0, toNumber(bttsVisitorAvgScored.value, 0));
        const avgCVisitor = Math.max(0, toNumber(bttsVisitorAvgConceded.value, 0));

        // xG (simple blend)
        let lambdaHome = (avgSLocal + avgCVisitor) / 2;
        let lambdaAway = (avgSVisitor + avgCLocal) / 2;

        const rawLambdaHome = lambdaHome;
        const rawLambdaAway = lambdaAway;

        // smoothing weight: w=0.1 at N=1, w=1 at N=20
        const xgWeight = Math.min(1, 0.1 + (sampleSize - 1) * (0.9 / 19));

        // Progressive cap for extreme xG
        if (lambdaHome > 3.0) lambdaHome = 3.0 + (lambdaHome - 3.0) * xgWeight;
        if (lambdaAway > 3.0) lambdaAway = 3.0 + (lambdaAway - 3.0) * xgWeight;

        const bttsLocalXg = document.getElementById('btts-local-xg');
        const bttsVisitorXg = document.getElementById('btts-visitor-xg');
        if (bttsLocalXg) bttsLocalXg.textContent = lambdaHome.toFixed(2);
        if (bttsVisitorXg) bttsVisitorXg.textContent = lambdaAway.toFixed(2);

        // Tooltips/modals
        const xgLocalData = { title: "xG (Local)", raw: rawLambdaHome, used: lambdaHome, weight: xgWeight };
        const xgVisitorData = { title: "xG (Visita)", raw: rawLambdaAway, used: lambdaAway, weight: xgWeight };
        const btnInfoLocal = document.getElementById('info-xg-local');
        const btnInfoVisitor = document.getElementById('info-xg-visitor');
        if (btnInfoLocal) btnInfoLocal.onclick = () => showDetail(xgLocalData);
        if (btnInfoVisitor) btnInfoVisitor.onclick = () => showDetail(xgVisitorData);

        // Poisson BTTS
        const probabilityPoisson = (1 - Math.exp(-lambdaHome) - Math.exp(-lambdaAway) + Math.exp(-(lambdaHome + lambdaAway))) * 100;

        // Individual score probabilities
        const probLocal = (1 - Math.exp(-lambdaHome)) * 100;
        const probVisitor = (1 - Math.exp(-lambdaAway)) * 100;
        if (bttsLocalProb) bttsLocalProb.textContent = probLocal.toFixed(1);
        if (bttsVisitorProb) bttsVisitorProb.textContent = probVisitor.toFixed(1);

        // Empirical BTTS approximation + shrinkage
        const probPercentageRaw = (localScored * visitorScored) / 100;
        const baseline = 53;
        const k = 10;
        const w = sampleSize / (sampleSize + k);
        const adjustedEmpirical = (w * probPercentageRaw) + ((1 - w) * baseline);

        // Hybrid weight by sample size (same idea, cleaner)
        let probabilityFinal = adjustedEmpirical;
        if (mode === "model") {
            probabilityFinal = probabilityPoisson;
        } else if (mode === "empirical") {
            probabilityFinal = adjustedEmpirical;
        } else {
            // hybrid
            if (sampleSize < 8) probabilityFinal = (0.3 * probabilityPoisson) + (0.7 * adjustedEmpirical);
            else if (sampleSize <= 15) probabilityFinal = (0.5 * probabilityPoisson) + (0.5 * adjustedEmpirical);
            else probabilityFinal = (0.7 * probabilityPoisson) + (0.3 * adjustedEmpirical);
        }

        // Display model and final
        const bttsModelProb = document.getElementById('btts-model-prob');
        if (bttsModelProb) bttsModelProb.textContent = probabilityPoisson.toFixed(1);
        if (bttsAvgProb) bttsAvgProb.textContent = probabilityFinal.toFixed(1);

        // Reliability hint
        if (sampleSize < 5) {
            if (bttsSampleWarning) bttsSampleWarning.style.display = 'inline-block';
            if (bttsModelContainer) bttsModelContainer.style.opacity = '0.4';
        } else {
            if (bttsSampleWarning) bttsSampleWarning.style.display = 'none';
            if (bttsModelContainer) bttsModelContainer.style.opacity = '1';
        }

        // Combined goals (adjusted shrinkage)
        const neutralBaseline = 1.33;
        const kGoals = 10;
        const lambdaHomeAdj = (rawLambdaHome * sampleSize + neutralBaseline * kGoals) / (sampleSize + kGoals);
        const lambdaAwayAdj = (rawLambdaAway * sampleSize + neutralBaseline * kGoals) / (sampleSize + kGoals);
        const combinedAvg = lambdaHomeAdj + lambdaAwayAdj;
        if (bttsCombinedAvg) bttsCombinedAvg.textContent = combinedAvg > 0 ? combinedAvg.toFixed(2) : "---";

        const goalsData = {
            title: "Promedio Goles (Ajustado)",
            raw: rawLambdaHome + rawLambdaAway,
            used: combinedAvg,
            weight: sampleSize / (sampleSize + kGoals)
        };
        const btnInfoGoals = document.getElementById('info-goals-combined');
        if (btnInfoGoals) btnInfoGoals.onclick = () => showDetail(goalsData);


        // --- Over/Under probabilities from total goals ---
        const ouLine = clamp(toNumber(ouLineSelect ? ouLineSelect.value : 2.5, 2.5), 0.5, 6.0);
        const kLine = Math.floor(ouLine); // for x.5 lines: Under x.5 = P(Total <= x)
        const underOU = poissonCdf(kLine, combinedAvg);
        const overOU = clamp(1 - underOU, 0, 1);

        const overPct = overOU * 100;
        const underPct = underOU * 100;

        if (ouOverTitle) ouOverTitle.textContent = `Over ${ouLine.toFixed(1)}`;
        if (ouUnderTitle) ouUnderTitle.textContent = `Under ${ouLine.toFixed(1)}`;

        if (ouOverProbEl) ouOverProbEl.textContent = overPct.toFixed(1);
        if (ouUnderProbEl) ouUnderProbEl.textContent = underPct.toFixed(1);

        if (ouOverFairEl) ouOverFairEl.textContent = overOU > 0 ? (1 / overOU).toFixed(2) : "-.--";
        if (ouUnderFairEl) ouUnderFairEl.textContent = underOU > 0 ? (1 / underOU).toFixed(2) : "-.--";

        // Highlight the higher-probability side in O/U
        const ouPick = (overPct >= underPct) ? "over" : "under";
        if (ouOverContainer) ouOverContainer.classList.toggle("winner-card", ouPick === "over");
        if (ouUnderContainer) ouUnderContainer.classList.toggle("winner-card", ouPick === "under");

        if (ouPickLabel) ouPickLabel.textContent = ouPick === "over" ? `Over ${ouLine.toFixed(1)}` : `Under ${ouLine.toFixed(1)}`;

        // --- BTTS fair odd (always shown in BTTS panel) ---
        const pBtts = clamp(probabilityFinal / 100, 0, 1);
        const fairOddBtts = pBtts > 0 ? (1 / pBtts) : 0;
        if (bttsFairOdd) bttsFairOdd.textContent = pBtts > 0 ? fairOddBtts.toFixed(2) : "-.--";

        // --- Choose active market for EV/Edge/Kelly ---
        const pSelected = (currentBttsMarket === "ou")
            ? (ouPick === "over" ? overOU : underOU)
            : pBtts;

        const fairOddSelected = pSelected > 0 ? (1 / pSelected) : 0;

        // Market label (for the house odd card)
        if (bttsMarketLabel) {
            if (currentBttsMarket === "ou") bttsMarketLabel.textContent = `O/U ${ouLine.toFixed(1)} (${ouPick === "over" ? "Over" : "Under"})`;
            else bttsMarketLabel.textContent = "BTTS Sí";
        }

        // Highlight which MODE has higher probability (BTTS vs O/U pick)
        const ouPickPct = (ouPick === "over" ? overPct : underPct);
        const bttsPct = pBtts * 100;
        const modeWinner = (ouPickPct > bttsPct) ? "ou" : "btts";
        if (btnBttsMode) btnBttsMode.classList.toggle("winner", modeWinner === "btts");
        if (btnOuMode) btnOuMode.classList.toggle("winner", modeWinner === "ou");

        // --- EV/Edge + Kelly 1/4 for the ACTIVE market ---
        if (fairOddSelected > 0 && bttsEdgeValue && bttsEvValue) {
            if (houseOdd > 1) {
                const evPct = ((pSelected * houseOdd) - 1) * 100;
                const edgePct = ((houseOdd / fairOddSelected) - 1) * 100;

                bttsEdgeValue.textContent = formatSigned(edgePct, 2) + "%";
                bttsEdgeValue.style.color = edgePct > 0 ? "var(--accent-color)" : "#ef4444";

                bttsEvValue.textContent = formatSigned(evPct, 2) + "%";
                bttsEvValue.style.color = evPct > 0 ? "var(--accent-color)" : "#ef4444";

                const f = kellyFraction(pSelected, houseOdd, 0.25);
                const stakeMoney = Math.floor(bankroll * f);
                const stakePct = f * 100;

                if (bttsKellyCard) bttsKellyCard.style.display = 'flex';
                if (bttsKellyStake) {
                    if (stakePct <= 0) {
                        bttsKellyStake.textContent = "0% (No Bet)";
                        bttsKellyStake.style.color = "#ef4444";
                    } else {
                        bttsKellyStake.textContent = `${stakePct.toFixed(2)}% (${currency}${stakeMoney})`;
                        bttsKellyStake.style.color = "var(--accent-color)";
                    }
                }
            } else {
                bttsEdgeValue.textContent = "0.00%";
                bttsEvValue.textContent = "0.00%";
                if (bttsKellyCard) bttsKellyCard.style.display = 'none';
            }
        } else {
            if (bttsEdgeValue) bttsEdgeValue.textContent = "0.00%";
            if (bttsEvValue) bttsEvValue.textContent = "0.00%";
            if (bttsKellyCard) bttsKellyCard.style.display = 'none';
        }

        // Save relevant state (market + line)
        saveState();
    };


    // --- Probability Calculator Logic ---
    const calculate = () => {
        const probA = clamp(toNumber(inputA.value), 0, 100);
        const probB = clamp(toNumber(inputB.value), 0, 100);
        const houseOdd = toNumber(houseOddInput.value, 0);
        const bankroll = Math.max(0, toNumber(bankrollInput.value, 0));
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
            const edgePct = fairOdd > 0 ? ((houseOdd / fairOdd) - 1) * 100 : 0;

            edgeContainer.style.display = 'block';
            edgeDivider.style.display = 'block';
            edgeValueDisplay.textContent = formatSigned(edgePct, 2);
            edgeValueDisplay.parentElement.style.color = edgePct > 0 ? "var(--accent-color)" : "#ef4444";

            evContainer.style.display = 'block';
            evDivider.style.display = 'block';
            evValueDisplay.textContent = formatSigned(evPct, 2);
            evValueDisplay.parentElement.style.color = evPct > 0 ? "var(--accent-color)" : "#ef4444";

            // Kelly 1/4
            const f = kellyFraction(p, houseOdd, 0.25);
            const stakePct = f * 100;
            const stakeAmount = Math.floor(bankroll * f);

            kellyCard.style.display = 'flex';
            if (stakePct <= 0) {
                kellyStakeDisplay.textContent = "0% (No Bet)";
                kellyStakeDisplay.parentElement.style.color = "#ef4444";
            } else {
                kellyStakeDisplay.textContent = `${stakePct.toFixed(2)}% (${currencySymbol}${stakeAmount})`;
                kellyStakeDisplay.parentElement.style.color = "var(--accent-color)";
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
    const manualData = {
        Local: Array.from({ length: 20 }, () => ({ scored: "", conceded: "" })),
        Visitor: Array.from({ length: 20 }, () => ({ scored: "", conceded: "" }))
    };

    const matchRowsContainer = document.getElementById('match-rows');
    const manualScoredPercent = document.getElementById('manual-scored-percent');
    const manualConcededPercent = document.getElementById('manual-conceded-percent');
    const manualPlayedCount = document.getElementById('manual-played-count');

    const generateMatchRows = () => {
        if (!matchRowsContainer) return;
        matchRowsContainer.innerHTML = "";
        const isVisitor = currentManualTeam === 'Equipo Visitante';
        const teamData = manualData[isVisitor ? 'Visitor' : 'Local'];

        for (let i = 0; i < 20; i++) {
            const row = document.createElement('div');
            row.className = 'match-row';

            const eqInput = `
                <div class="match-inputs">
                    <label>Goles Eq.</label>
                    <input type="number" class="manual-in-scored" value="${teamData[i].scored}" min="0" data-index="${i}">
                </div>
            `;
            const rivInput = `
                <div class="match-inputs">
                    <label>Goles Riv.</label>
                    <input type="number" class="manual-in-conceded" value="${teamData[i].conceded}" min="0" data-index="${i}">
                </div>
            `;

            row.innerHTML = `
                <div class="match-label">P${i + 1}</div>
                ${isVisitor ? rivInput + eqInput : eqInput + rivInput}
            `;
            matchRowsContainer.appendChild(row);
        }

        matchRowsContainer.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', (e) => {
                const idx = parseInt(e.target.dataset.index);
                const type = e.target.classList.contains('manual-in-scored') ? 'scored' : 'conceded';
                teamData[idx][type] = e.target.value;
                updateManualStats();
                saveState();
            });

            input.addEventListener('keydown', (e) => {
                const idx = parseInt(e.target.dataset.index);
                const isScored = e.target.classList.contains('manual-in-scored');
                let targetInput = null;

                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (idx < 19) {
                        targetInput = matchRowsContainer.querySelector(`.manual-in-${isScored ? 'scored' : 'conceded'}[data-index="${idx + 1}"]`);
                    }
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (idx > 0) {
                        targetInput = matchRowsContainer.querySelector(`.manual-in-${isScored ? 'scored' : 'conceded'}[data-index="${idx - 1}"]`);
                    }
                } else if (e.key === 'ArrowRight') {
                    if (isScored) {
                        e.preventDefault();
                        targetInput = matchRowsContainer.querySelector(`.manual-in-conceded[data-index="${idx}"]`);
                    }
                } else if (e.key === 'ArrowLeft') {
                    if (!isScored) {
                        e.preventDefault();
                        targetInput = matchRowsContainer.querySelector(`.manual-in-scored[data-index="${idx}"]`);
                    }
                }

                if (targetInput) targetInput.focus();
            });
        });
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
                bankroll: bankrollInput ? bankrollInput.value : "1000",
                lastView: (calculatorView && calculatorView.style.display !== 'none') ? "calculator"
                    : (bttsManualView && bttsManualView.style.display !== 'none') ? "manual"
                        : (bttsView && bttsView.style.display !== 'none') ? "btts"
                            : "menu",
                bttsMode: bttsMode ? bttsMode.value : "hybrid",
                bttsMarket: currentBttsMarket,
                ouLine: ouLineSelect ? ouLineSelect.value : "2.5",
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
            if (bankrollInput && state.bankroll) bankrollInput.value = state.bankroll;

            if (bttsMode && state.bttsMode) bttsMode.value = state.bttsMode;
            if (state.bttsMarket) currentBttsMarket = state.bttsMarket;
            if (ouLineSelect && state.ouLine) ouLineSelect.value = state.ouLine;

            // Restore manual data safely
            if (state.manualData && state.manualData.Local && state.manualData.Visitor) {
                manualData.Local = state.manualData.Local.map(m => ({ scored: m.scored ?? "", conceded: m.conceded ?? "" })).slice(0, 20);
                manualData.Visitor = state.manualData.Visitor.map(m => ({ scored: m.scored ?? "", conceded: m.conceded ?? "" })).slice(0, 20);
                // Ensure length 20
                while (manualData.Local.length < 20) manualData.Local.push({ scored: "", conceded: "" });
                while (manualData.Visitor.length < 20) manualData.Visitor.push({ scored: "", conceded: "" });
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
        generateMatchRows();
        updateManualStats();
    };

    // --- Event Listeners ---
    const debouncedCalculate = debounce(calculate, 150);
    const debouncedCalculateBtts = debounce(calculateBtts, 150);

    if (btnProbability) btnProbability.addEventListener('click', () => showView(calculatorView));
    if (btnBtts) btnBtts.addEventListener('click', () => { showView(bttsView); debouncedCalculateBtts(); });
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
            debouncedCalculateBtts();
        });
    }
    if (btnOuMode) {
        btnOuMode.addEventListener('click', () => {
            currentBttsMarket = "ou";
            applyBttsMarketUI();
            saveState();
            debouncedCalculateBtts();
        });
    }
    if (ouLineSelect) {
        ouLineSelect.addEventListener('change', () => {
            saveState();
            debouncedCalculateBtts();
        });
    }


    // Clear Manual Rows with Confirmation
    if (btnClearManual) {
        let clearStage = 0, clearTimer = null;
        btnClearManual.addEventListener('click', () => {
            if (clearStage === 0) {
                clearStage = 1;
                btnClearManual.textContent = "¿Confirmar?";
                btnClearManual.classList.add('confirming');
                clearTimer = setTimeout(() => {
                    clearStage = 0;
                    btnClearManual.textContent = "Borrar Todo";
                    btnClearManual.classList.remove('confirming');
                }, 3000);
            } else {
                if (clearTimer) clearTimeout(clearTimer);
                const teamKey = currentManualTeam === 'Equipo Local' ? 'Local' : 'Visitor';
                manualData[teamKey] = Array.from({ length: 20 }, () => ({ scored: "", conceded: "" }));
                generateMatchRows();
                updateManualStats();
                saveState();
                clearStage = 0;
                btnClearManual.textContent = "Borrar Todo";
                btnClearManual.classList.remove('confirming');
            }
        });
    }

    // Calculator Listeners
    [inputA, inputB, houseOddInput].forEach(el => {
        if (el) el.addEventListener('input', debouncedCalculate);
    });

    // BTTS Listeners
    [bttsLocalScored, bttsLocalConceded, bttsVisitorScored, bttsVisitorConceded, bttsSample, bttsHouseOdd, bttsMode].forEach(el => {
        if (el) el.addEventListener('input', debouncedCalculateBtts);
    });

    // Global updates
    if (currencySelect) currencySelect.addEventListener('change', () => {
        if (calculatorView.style.display !== 'none') calculate();
        if (bttsView.style.display !== 'none') debouncedCalculateBtts();
        saveState();
    });
    if (bankrollInput) bankrollInput.addEventListener('input', () => {
        if (calculatorView.style.display !== 'none') calculate();
        if (bttsView.style.display !== 'none') debouncedCalculateBtts();
        saveState();
    });

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

    // Initial State
    loadState();
    applyBttsMarketUI();

    debouncedCalculate();
    debouncedCalculateBtts();
});
