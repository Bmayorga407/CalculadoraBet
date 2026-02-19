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
        if (!selectEl) return '$';
        const match = selectEl.options[selectEl.selectedIndex].text.match(/\((.*?)\)/);
        return match ? match[1] : '$';
    };

    // --- BTTS Logic ---
    const calculateBtts = () => {
        const localScored = parseFloat(bttsLocalScored.value) || 0;
        const localConceded = parseFloat(bttsLocalConceded.value) || 0;
        const visitorScored = parseFloat(bttsVisitorScored.value) || 0;
        const visitorConceded = parseFloat(bttsVisitorConceded.value) || 0;
        const houseOdd = parseFloat(bttsHouseOdd.value) || 0;
        const sampleSize = parseInt(bttsSample.value) || 10;
        const bankroll = parseFloat(bankrollInput.value) || 1000;
        const currency = getCurrencySymbol(currencySelect);

        // NEW: Poisson-based probability source
        // P(BTTS) = P(Local scores) * P(Visitor scores)
        const avgSLocal = parseFloat(bttsLocalAvgScored.value) || 0;
        const avgCLocal = parseFloat(bttsLocalAvgConceded.value) || 0;
        const avgSVisitor = parseFloat(bttsVisitorAvgScored.value) || 0;
        const avgCVisitor = parseFloat(bttsVisitorAvgConceded.value) || 0;

        // ISOLATED CALCULATIONS: Home and Away use distinct parameters
        let lambdaHome = (avgSLocal + avgCVisitor) / 2;
        let lambdaAway = (avgSVisitor + avgCLocal) / 2;

        const rawLambdaHome = lambdaHome;
        const rawLambdaAway = lambdaAway;

        // DYNAMIC SMOOTHING WEIGHT (w): w=0.1 at N=1, w=1.0 at N=20
        const xgWeight = Math.min(1, 0.1 + (sampleSize - 1) * (0.9 / 19));

        // PROGRESSIVE CAP: Apply smoothing for xG_raw > 3.0 (Dynamic based on N)
        if (lambdaHome > 3.0) {
            lambdaHome = 3.0 + (lambdaHome - 3.0) * xgWeight;
        }
        if (lambdaAway > 3.0) {
            lambdaAway = 3.0 + (lambdaAway - 3.0) * xgWeight;
        }

        const bttsLocalXg = document.getElementById('btts-local-xg');
        const bttsVisitorXg = document.getElementById('btts-visitor-xg');
        if (bttsLocalXg) bttsLocalXg.textContent = lambdaHome.toFixed(2);
        if (bttsVisitorXg) bttsVisitorXg.textContent = lambdaAway.toFixed(2);

        // Store data for tooltips/modals
        const xgLocalData = { title: "xG (Local)", raw: rawLambdaHome, used: lambdaHome, weight: xgWeight };
        const xgVisitorData = { title: "xG (Visita)", raw: rawLambdaAway, used: lambdaAway, weight: xgWeight };

        document.getElementById('info-xg-local').onclick = () => showDetail(xgLocalData);
        document.getElementById('info-xg-visitor').onclick = () => showDetail(xgVisitorData);

        const probabilityPoisson = (1 - Math.exp(-lambdaHome) - Math.exp(-lambdaAway) + Math.exp(-(lambdaHome + lambdaAway))) * 100;

        // Individual probabilities (Prob % boxes)
        const probLocal = (1 - Math.exp(-lambdaHome)) * 100;
        const probVisitor = (1 - Math.exp(-lambdaAway)) * 100;

        const bttsLocalProb = document.getElementById('btts-local-prob');
        const bttsVisitorProb = document.getElementById('btts-visitor-prob');
        if (bttsLocalProb) bttsLocalProb.textContent = probLocal.toFixed(1);
        if (bttsVisitorProb) bttsVisitorProb.textContent = probVisitor.toFixed(1);

        // HYBRID MODEL: Poisson + Empirical Percentage with shrinkage
        const probPercentage = (localScored * visitorScored) / 100;
        const baseline = 53;
        const k = 10;
        const w = sampleSize / (sampleSize + k);
        const adjustedEmpirical = (w * probPercentage) + ((1 - w) * baseline);

        let probability;
        if (sampleSize < 8) {
            probability = (0.3 * probabilityPoisson) + (0.7 * adjustedEmpirical);
        } else if (sampleSize <= 15) {
            probability = (0.5 * probabilityPoisson) + (0.5 * adjustedEmpirical);
        } else {
            probability = (0.7 * probabilityPoisson) + (0.3 * adjustedEmpirical);
        }

        // Display both values
        const bttsModelProb = document.getElementById('btts-model-prob');
        if (bttsModelProb) {
            bttsModelProb.textContent = probabilityPoisson.toFixed(1);
            bttsModelProb.parentElement.title = "Probabilidad pura basada en promedio de goles (Poisson).";
        }

        bttsAvgProb.textContent = probability.toFixed(1);
        if (bttsFinalDisplay) {
            bttsFinalDisplay.title = "Probabilidad combinada (Modelo + Porcentaje Real) ajustada por muestra.";
        }

        // Reliability UI feedback (n < 5)
        if (sampleSize < 5) {
            if (bttsSampleWarning) bttsSampleWarning.style.display = 'inline-block';
            if (bttsModelContainer) bttsModelContainer.style.opacity = '0.4';
        } else {
            if (bttsSampleWarning) bttsSampleWarning.style.display = 'none';
            if (bttsModelContainer) bttsModelContainer.style.opacity = '1';
        }

        // Calculate Adjusted Average goals (Neutral Shrinkage per team)
        const neutralBaseline = 1.33; // ~2.66 total
        const kGoals = 10;
        const lambdaHomeAdj = (rawLambdaHome * sampleSize + neutralBaseline * kGoals) / (sampleSize + kGoals);
        const lambdaAwayAdj = (rawLambdaAway * sampleSize + neutralBaseline * kGoals) / (sampleSize + kGoals);
        const combinedAvg = lambdaHomeAdj + lambdaAwayAdj;

        if (bttsCombinedAvg) {
            bttsCombinedAvg.textContent = combinedAvg > 0 ? combinedAvg.toFixed(2) : "---";
        }

        const goalsData = {
            title: "Promedio Goles (Ajustado)",
            raw: rawLambdaHome + rawLambdaAway,
            used: combinedAvg,
            weight: sampleSize / (sampleSize + kGoals)
        };
        document.getElementById('info-goals-combined').onclick = () => showDetail(goalsData);

        if (probability > 0) {
            const fairOdd = (100 / probability);
            bttsFairOdd.textContent = fairOdd.toFixed(2);

            if (houseOdd > 0) {
                const evValue = (probability / 100 * houseOdd) - 1;
                const edgePercentage = evValue * 100;

                bttsEdgeValue.textContent = (edgePercentage > 0 ? "+" : "") + edgePercentage.toFixed(2) + "%";
                bttsEdgeValue.style.color = edgePercentage > 0 ? "var(--accent-color)" : "#ef4444";

                bttsEvValue.textContent = (edgePercentage > 0 ? "+" : "") + edgePercentage.toFixed(2) + "%";
                bttsEvValue.style.color = edgePercentage > 0 ? "var(--accent-color)" : "#ef4444";

                const monetaryEV = evValue * bankroll;

                // Staking Logic
                let stakeUnit = 0;
                if (edgePercentage >= 0) {
                    if (edgePercentage < 3) stakeUnit = 0;
                    else if (edgePercentage < 6) stakeUnit = 1;
                    else if (edgePercentage < 9) stakeUnit = 2;
                    else if (edgePercentage < 12) stakeUnit = 3;
                    else if (edgePercentage < 15) stakeUnit = 4;
                    else if (edgePercentage <= 20) stakeUnit = 5;
                    else stakeUnit = 0; // Precaución
                }

                const stakeAmount = Math.floor(bankroll * (stakeUnit / 100));

                if (bttsKellyCard) bttsKellyCard.style.display = 'flex';

                if (edgePercentage < 0) {
                    bttsKellyStake.textContent = "Stake 0 (No Bet)";
                    bttsKellyStake.style.color = "#ef4444";
                } else if (edgePercentage > 20) {
                    bttsKellyStake.textContent = "Edge > 20% (Revisar)";
                    bttsKellyStake.style.color = "#ef4444";
                } else if (stakeUnit === 0) {
                    bttsKellyStake.textContent = "Stake 0 (Low Edge)";
                    bttsKellyStake.style.color = "#ef4444";
                } else {
                    bttsKellyStake.textContent = `Stake ${stakeUnit}/5 (${currency}${stakeAmount})`;
                    bttsKellyStake.style.color = "var(--accent-color)";
                }
            } else {
                bttsEdgeValue.textContent = "0.00";
                bttsEvValue.textContent = "0.00";
                if (bttsKellyCard) bttsKellyCard.style.display = 'none';
            }
        } else {
            bttsFairOdd.textContent = "-.--";
            bttsEdgeValue.textContent = "0.00";
            bttsEvValue.textContent = "0.00";
            if (bttsKellyCard) bttsKellyCard.style.display = 'none';
        }
    };

    // --- Probability Calculator Logic ---
    const calculate = () => {
        const probA = parseFloat(inputA.value) || 0;
        const probB = parseFloat(inputB.value) || 0;
        const houseOdd = parseFloat(houseOddInput.value) || 0;
        const bankroll = parseFloat(bankrollInput.value) || 0;
        const currencySymbol = getCurrencySymbol(currencySelect);

        // Adjusted probability: Simple average of inputs
        const p_adj = ((probA + probB) / 2) / 100;
        displayAverage.textContent = (p_adj * 100).toFixed(1) + '%';

        // NEW: Always calculate and show Fair Odd if we have a probability
        const fairOdd = p_adj > 0 ? (1 / p_adj) : 0;
        singleOddDisplay.textContent = fairOdd > 0 ? fairOdd.toFixed(2) : '-.--';

        if (houseOdd > 0) {
            summaryHouseOdd.textContent = houseOdd.toFixed(2);

            const p_base = 1 / houseOdd;
            displayHouseProb.textContent = (p_base * 100).toFixed(1) + '%';

            const evValue = (p_adj * houseOdd) - 1;
            const evPercentage = evValue * 100;

            edgeContainer.style.display = 'block';
            edgeDivider.style.display = 'block';
            edgeValueDisplay.textContent = evPercentage.toFixed(2);
            edgeValueDisplay.parentElement.style.color = evPercentage > 0 ? "var(--accent-color)" : "#ef4444";

            evContainer.style.display = 'block';
            evDivider.style.display = 'block';
            evValueDisplay.textContent = evPercentage.toFixed(2);
            evValueDisplay.parentElement.style.color = evPercentage > 0 ? "var(--accent-color)" : "#ef4444";

            // Staking Logic
            let stakeUnit = 0;
            if (evPercentage >= 0) {
                if (evPercentage < 3) stakeUnit = 0;
                else if (evPercentage < 6) stakeUnit = 1;
                else if (evPercentage < 9) stakeUnit = 2;
                else if (evPercentage < 12) stakeUnit = 3;
                else if (evPercentage < 15) stakeUnit = 4;
                else if (evPercentage <= 20) stakeUnit = 5;
            }

            const stakeAmount = Math.floor(bankroll * (stakeUnit / 100));
            kellyCard.style.display = 'flex';

            if (evPercentage < 0) {
                kellyStakeDisplay.textContent = "Stake 0 (No Bet)";
                kellyStakeDisplay.parentElement.style.color = "#ef4444";
            } else if (evPercentage > 20) {
                kellyStakeDisplay.textContent = "Precaución: Edge > 20%";
                kellyStakeDisplay.parentElement.style.color = "#ef4444";
            } else if (stakeUnit === 0) {
                kellyStakeDisplay.textContent = "Stake 0 (Low Edge)";
                kellyStakeDisplay.parentElement.style.color = "#ef4444";
            } else {
                kellyStakeDisplay.textContent = `Stake ${stakeUnit}/5 (${currencySymbol}${stakeAmount})`;
                kellyStakeDisplay.parentElement.style.color = "var(--accent-color)";
            }
        } else {
            summaryHouseOdd.textContent = '-.--';
            displayHouseProb.textContent = '0.0%';
            // singleOddDisplay.textContent = '-.--'; // Do not clear Fair Odd here
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
        calculateBtts();
    };

    // --- Navigation ---
    const showView = (view) => {
        [mainMenu, calculatorView, bttsView, bttsManualView].forEach(v => {
            if (v) v.style.display = 'none';
        });
        if (view) view.style.display = 'block';
    };

    const showManualEntry = (team) => {
        currentManualTeam = team;
        showView(bttsManualView);
        if (manualTeamName) manualTeamName.textContent = team;
        generateMatchRows();
        updateManualStats();
    };

    // --- Event Listeners ---
    if (btnProbability) btnProbability.addEventListener('click', () => showView(calculatorView));
    if (btnBtts) btnBtts.addEventListener('click', () => { showView(bttsView); calculateBtts(); });
    if (btnBack) btnBack.addEventListener('click', () => showView(mainMenu));
    if (btnBackBtts) btnBackBtts.addEventListener('click', () => showView(mainMenu));
    if (btnBackManual) btnBackManual.addEventListener('click', () => showView(bttsView));
    if (btnManualLocal) btnManualLocal.addEventListener('click', () => showManualEntry('Equipo Local'));
    if (btnManualVisitor) btnManualVisitor.addEventListener('click', () => showManualEntry('Equipo Visitante'));

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
                clearStage = 0;
                btnClearManual.textContent = "Borrar Todo";
                btnClearManual.classList.remove('confirming');
            }
        });
    }

    // Calculator Listeners
    [inputA, inputB, houseOddInput].forEach(el => {
        if (el) el.addEventListener('input', calculate);
    });

    // BTTS Listeners
    [bttsLocalScored, bttsLocalConceded, bttsVisitorScored, bttsVisitorConceded, bttsSample, bttsHouseOdd].forEach(el => {
        if (el) el.addEventListener('input', calculateBtts);
    });

    // Global updates
    if (currencySelect) currencySelect.addEventListener('change', () => {
        if (calculatorView.style.display !== 'none') calculate();
        if (bttsView.style.display !== 'none') calculateBtts();
    });
    if (bankrollInput) bankrollInput.addEventListener('input', () => {
        if (calculatorView.style.display !== 'none') calculate();
        if (bttsView.style.display !== 'none') calculateBtts();
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

    // Initial State
    calculate();
    calculateBtts();
});
