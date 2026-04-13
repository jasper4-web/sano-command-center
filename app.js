/* ============================================
   SANO COMMAND CENTER — App Logic v8.0
   Full rebuild: tabs, burndown, overnight panel,
   AI tasks, cost breakdown, decisions, alerts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    loadSavedData();
    initClock();
    initCountdown();
    renderAlerts();
    renderOvernightCard();
    renderBurndown();
    renderWeekTimeline();
    renderKPI();
    renderPriorities();
    renderAITasks();
    renderAgentFeed();
    renderCostBreakdown();
    renderDecisions();
    renderIntelDocs();
    renderCompleted();
    updateTabCounts();

    setInterval(updateClock, 1000);
    setInterval(updateCountdown, 60000);
});

/* ===================== CLOCK ===================== */
function initClock() { updateClock(); updateDateDisplay(); }

function updateClock() {
    const el = document.getElementById('currentTime');
    if (el) el.textContent = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
    });
}

function updateDateDisplay() {
    const now = new Date();
    const dateEl = document.getElementById('currentDate');
    if (dateEl) dateEl.textContent = now.toLocaleDateString('en-US', {
        weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    });
}

/* ===================== COUNTDOWN ===================== */
function initCountdown() { updateCountdown(); }

function updateCountdown() {
    const diff = SANO_DATA.launchDate - new Date();
    if (diff <= 0) { setText('countDays', '00'); setText('countHours', '00'); setText('countMins', '00'); return; }
    const d = Math.floor(diff / 864e5);
    const h = Math.floor((diff % 864e5) / 36e5);
    const m = Math.floor((diff % 36e5) / 6e4);
    setText('countDays', String(d).padStart(2, '0'));
    setText('countHours', String(h).padStart(2, '0'));
    setText('countMins', String(m).padStart(2, '0'));

    const activeWeek = SANO_DATA.weeks.find(w => w.status === 'active');
    if (activeWeek) setText('currentWeekLabel', `W${activeWeek.num} — ${activeWeek.name}`);
}

/* ===================== ALERTS ===================== */
function renderAlerts() {
    const panel = document.getElementById('alertPanel');
    if (!panel || !SANO_DATA.alerts || !SANO_DATA.alerts.length) {
        if (panel) panel.style.display = 'none';
        return;
    }
    panel.style.display = 'block';
    panel.innerHTML = SANO_DATA.alerts.map((a, i) => `
        <div class="alert-item alert-${a.severity || 'warning'}">
            <span class="alert-icon">${a.severity === 'critical' ? '🔴' : '🟡'}</span>
            <span class="alert-text">${a.message}</span>
            <button class="alert-dismiss" onclick="dismissAlert(${i})">✕</button>
        </div>
    `).join('');
}

function dismissAlert(i) {
    SANO_DATA.alerts.splice(i, 1);
    renderAlerts();
    saveData();
}

/* ===================== OVERNIGHT AGENTS ===================== */
function renderOvernightCard() {
    const ov = SANO_DATA.overnight;
    if (!ov) return;

    const statusEl = document.getElementById('overnightStatus');
    if (statusEl) {
        const statusClass = ov.status === 'running' ? 'running' : ov.status === 'complete' ? 'complete' : 'idle';
        const statusText = ov.status === 'running' ? 'RUNNING NOW' : ov.status === 'complete' ? 'COMPLETE' : 'IDLE';
        statusEl.className = `overnight-status ${statusClass}`;
        statusEl.innerHTML = `<span class="overnight-status-dot"></span><span>${statusText}</span>`;
    }

    const completed = ov.tasks.filter(t => t.status === 'complete').length;
    const metaEl = document.getElementById('overnightMeta');
    if (metaEl) metaEl.textContent = `${completed}/${ov.tasks.length} Tasks    $${ov.totalCost.toFixed(2)} spent    Started ${ov.startTime}`;

    const tasksEl = document.getElementById('overnightTasks');
    if (tasksEl) {
        tasksEl.innerHTML = ov.tasks.map(t => {
            const cls = t.status === 'running' ? 'ot-active' : t.status === 'complete' ? 'ot-done' : 'ot-queued';
            return `<span class="ot-pill ${cls}">${t.status === 'running' ? '◉ ' : ''}${t.name}</span>`;
        }).join('');
    }

    // Directive badge
    const totalEst = ov.tasks.reduce((sum, t) => sum + (t.estCost || 0), 0);
    const directiveEl = document.getElementById('heroDirective');
    if (directiveEl) {
        directiveEl.innerHTML = `<span class="directive-badge">🚀 Tonight: ${ov.tasks.length} tasks pre-approved (~$${totalEst.toFixed(2)})</span>`;
    }
}

/* ===================== BURNDOWN CHART ===================== */
function renderBurndown() {
    const container = document.getElementById('burndownChart');
    const statsEl = document.getElementById('burndownStats');
    const badgeEl = document.getElementById('burndownBadge');
    if (!container || !SANO_DATA.burndown) return;

    const bd = SANO_DATA.burndown;
    const startDate = new Date('2026-04-04');
    const endDate = new Date('2026-06-01');
    const totalDays = Math.ceil((endDate - startDate) / 864e5);

    const w = 460, h = 180, pad = { top: 20, right: 20, bottom: 30, left: 40 };
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top - pad.bottom;

    // Ideal line
    const idealStart = { x: pad.left, y: pad.top };
    const idealEnd = { x: pad.left + chartW, y: pad.top + chartH };

    // Actual points
    const actualPoints = bd.dataPoints.map(dp => {
        const dpDate = new Date(dp.date);
        const dayNum = Math.ceil((dpDate - startDate) / 864e5);
        const x = pad.left + (dayNum / totalDays) * chartW;
        const y = pad.top + ((bd.totalTasks - dp.remaining) / bd.totalTasks) * chartH;
        // Invert: y should be high when remaining is high
        const yActual = pad.top + (dp.remaining / bd.totalTasks) * chartH;
        return { x, y: yActual };
    });

    // Determine pace
    const latestRemaining = bd.dataPoints[bd.dataPoints.length - 1].remaining;
    const daysSoFar = bd.dataPoints.length;
    const idealRemaining = bd.totalTasks - (bd.totalTasks / totalDays) * daysSoFar;
    let paceStatus = 'ON PACE';
    let paceClass = 'pace-on';
    if (latestRemaining < idealRemaining - 3) { paceStatus = 'AHEAD'; paceClass = 'pace-ahead'; }
    else if (latestRemaining > idealRemaining + 3) { paceStatus = 'BEHIND'; paceClass = 'pace-behind'; }

    if (badgeEl) { badgeEl.textContent = paceStatus; badgeEl.className = `burndown-badge ${paceClass}`; }

    // Build SVG
    const actualPath = actualPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
    const lastPoint = actualPoints[actualPoints.length - 1];

    container.innerHTML = `
        <svg viewBox="0 0 ${w} ${h}" class="burndown-svg">
            <!-- Grid lines -->
            <line x1="${pad.left}" y1="${pad.top}" x2="${pad.left}" y2="${pad.top + chartH}" stroke="#333" stroke-width="1"/>
            <line x1="${pad.left}" y1="${pad.top + chartH}" x2="${pad.left + chartW}" y2="${pad.top + chartH}" stroke="#333" stroke-width="1"/>
            <!-- Y labels -->
            <text x="${pad.left - 8}" y="${pad.top + 5}" fill="#666" font-size="10" text-anchor="end">${bd.totalTasks}</text>
            <text x="${pad.left - 8}" y="${pad.top + chartH / 2 + 3}" fill="#666" font-size="10" text-anchor="end">${Math.round(bd.totalTasks / 2)}</text>
            <text x="${pad.left - 8}" y="${pad.top + chartH + 3}" fill="#666" font-size="10" text-anchor="end">0</text>
            <!-- X labels -->
            <text x="${pad.left}" y="${h - 5}" fill="#666" font-size="10" text-anchor="start">Apr 4</text>
            <text x="${pad.left + chartW / 2}" y="${h - 5}" fill="#666" font-size="10" text-anchor="middle">May 1</text>
            <text x="${pad.left + chartW}" y="${h - 5}" fill="#666" font-size="10" text-anchor="end">Jun 1</text>
            <!-- Ideal line (dotted) -->
            <line x1="${idealStart.x}" y1="${idealStart.y}" x2="${idealEnd.x}" y2="${idealEnd.y}" stroke="#555" stroke-width="1.5" stroke-dasharray="6,4"/>
            <!-- Actual line -->
            <path d="${actualPath}" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <!-- Current position dot -->
            <circle cx="${lastPoint.x}" cy="${lastPoint.y}" r="4" fill="#22c55e" stroke="#0a0a0a" stroke-width="2"/>
        </svg>
    `;

    // Stats
    const tasksPerDay = ((bd.totalTasks - latestRemaining) / daysSoFar).toFixed(1);
    if (statsEl) {
        statsEl.innerHTML = `
            <span>${latestRemaining} tasks left</span>
            <span>~${tasksPerDay} tasks/day avg</span>
            <span class="burndown-legend"><span class="legend-ideal"></span> ideal</span>
            <span class="burndown-legend"><span class="legend-actual"></span> actual</span>
        `;
    }
}

/* ===================== WEEK TIMELINE ===================== */
function renderWeekTimeline() {
    const container = document.getElementById('weekTimeline');
    if (!container) return;
    container.innerHTML = SANO_DATA.weeks.map(w => {
        const deps = SANO_DATA.weekDeps[w.num] || [];
        const depsHtml = deps.map(d => {
            const cls = d.status === 'done' ? 'dep-done' : d.status === 'blocker' ? 'dep-blocker' : 'dep-upcoming';
            return `<span class="dep-tag ${cls}">${d.label}</span>`;
        }).join('');
        return `
            <div class="week-block ${w.status}" title="${w.theme}">
                <span class="week-icon">${w.icon || ''}</span>
                <span class="week-num">W${w.num}</span>
                <span class="week-name">${w.name}</span>
                <span class="week-dates">${w.dates}</span>
                ${depsHtml ? `<div class="week-deps">${depsHtml}</div>` : ''}
            </div>`;
    }).join('');
}

/* ===================== KPI STRIP ===================== */
function renderKPI() {
    const allItems = SANO_DATA.checklist.flatMap(s => s.items);
    const total = allItems.length;
    const done = allItems.filter(i => i.status === 'done').length;
    const active = allItems.filter(i => i.status === 'in-progress').length;
    const left = total - done - active;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;

    setText('kpiReadiness', `${pct}%`);
    setText('kpiDone', done);
    setText('kpiActive', active);
    setText('kpiLeft', left);

    const kpi = SANO_DATA.kpi;
    setText('kpiBudget', `$${kpi.budget.remaining.toLocaleString()}`);
    setText('kpiBurn', `$${kpi.budget.burn}/mo`);
    setText('kpiRunway', `${kpi.budget.runway} months`);
    setText('kpiBreakeven', kpi.budget.breakeven);

    setText('kpiAgentSpend', `$${kpi.agentSpend.tonight.toFixed(2)}`);
    setText('kpiAgentTonight', `$${kpi.agentSpend.tonight.toFixed(2)}/$${kpi.agentSpend.tonightCap}`);
    setText('kpiAgentMonth', `$${kpi.agentSpend.month.toFixed(2)}/$${kpi.agentSpend.monthCap}`);

    setText('kpiWarmupDay', `Day ${kpi.emailWarmup.day}`);
    setText('kpiWarmupReady', kpi.emailWarmup.readyDate);
    setText('kpiGHL', `${kpi.emailWarmup.ghlSetup}/${kpi.emailWarmup.ghlTotal}`);
    setText('kpiSOPs', kpi.emailWarmup.sops);
}

/* ===================== TAB NAVIGATION ===================== */
function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`[data-tab="${tab}"]`)?.classList.add('active');
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.getElementById(`panel-${tab}`)?.classList.add('active');
}

function updateTabCounts() {
    const jasperCount = SANO_DATA.priorities.filter(p => !p.done).length;
    const aiCount = SANO_DATA.aiAgentTasks.reduce((sum, s) => sum + s.tasks.length, 0);
    const completedCount = SANO_DATA.priorities.filter(p => p.done).length;
    setText('tabCountJasper', jasperCount);
    setText('tabCountAI', aiCount);
    setText('tabCountCompleted', completedCount);
}

/* ===================== JASPER'S PRIORITIES ===================== */
function renderPriorities() {
    const container = document.getElementById('priorityList');
    if (!container) return;

    const activePriorities = SANO_DATA.priorities.filter(p => !p.done);
    const totalMinutes = activePriorities.reduce((sum, p) => {
        const match = p.timeEstimate?.match(/(\d+)/);
        return sum + (match ? parseInt(match[1]) : 0);
    }, 0);
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    const timeStr = hours > 0 ? `~${hours}h ${mins}m` : `~${mins}m`;

    setText('priorityTimeEstimate', activePriorities.length > 0 ? timeStr : 'Clear');

    const updatedEl = document.getElementById('priorityUpdated');
    if (updatedEl && SANO_DATA.prioritiesLastUpdated) {
        const d = new Date(SANO_DATA.prioritiesLastUpdated);
        updatedEl.textContent = `Updated ${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} ${d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
    }

    container.innerHTML = activePriorities.map((p, i) => {
        const origIndex = SANO_DATA.priorities.indexOf(p);
        const cls = `priority-${p.priority}`;
        const tag = p.priority.toUpperCase();
        const tagCls = `tag-${p.priority}`;
        const hasSteps = p.steps && p.steps.length > 0;
        const timeTag = p.timeEstimate ? `<span class="priority-time">${p.timeEstimate}</span>` : '';

        const stepsHtml = hasSteps ? `
            <div class="priority-steps" id="steps-${origIndex}">
                <div class="steps-inner">
                    ${p.steps.map((step, si) => `
                        <div class="step-item">
                            <span class="step-num">${si + 1}</span>
                            <span class="step-text">${step}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : '';

        return `
            <div class="priority-item ${cls}" id="priority-${origIndex}">
                <div class="priority-row" onclick="expandPriority(${origIndex})">
                    <div class="priority-checkbox" onclick="event.stopPropagation(); togglePriority(${origIndex})"></div>
                    <span class="priority-text">${p.text}</span>
                    ${timeTag}
                    <span class="priority-tag ${tagCls}">${tag}</span>
                    ${hasSteps ? '<span class="priority-expand">▸</span>' : ''}
                </div>
                ${stepsHtml}
            </div>`;
    }).join('');
}

function togglePriority(i) {
    SANO_DATA.priorities[i].done = !SANO_DATA.priorities[i].done;
    if (SANO_DATA.priorities[i].done) SANO_DATA.priorities[i].priority = 'done';
    renderPriorities();
    renderCompleted();
    updateTabCounts();
    saveData();
}

function expandPriority(i) {
    const p = SANO_DATA.priorities[i];
    if (p.done || !p.steps || p.steps.length === 0) return;
    const el = document.getElementById(`steps-${i}`);
    if (!el) return;
    document.querySelectorAll('.priority-steps.open').forEach(s => { if (s !== el) s.classList.remove('open'); });
    el.classList.toggle('open');
    const expandIcon = el.closest('.priority-item')?.querySelector('.priority-expand');
    if (expandIcon) expandIcon.classList.toggle('rotated');
}

/* ===================== AI AGENT TASKS ===================== */
function renderAITasks() {
    const container = document.getElementById('aiTaskList');
    if (!container) return;

    container.innerHTML = SANO_DATA.aiAgentTasks.map((section, si) => {
        const sectionStatus = section.status;
        const statusBadge = sectionStatus === 'running' ? '<span class="ai-section-badge running">Running</span>' :
                           sectionStatus === 'blocked' ? '<span class="ai-section-badge blocked">Blocked</span>' : '';
        const completedCount = section.tasks.filter(t => t.status === 'complete').length;

        const tasksHtml = section.tasks.map((t, ti) => {
            const statusCls = t.status === 'running' ? 'ai-running' : t.status === 'complete' ? 'ai-complete' :
                             t.status === 'blocked' ? 'ai-blocked' : 'ai-queued';
            const statusIcon = t.status === 'running' ? '◉' : t.status === 'complete' ? '✓' :
                              t.status === 'blocked' ? '🔒' : '○';
            const costTag = t.estCost > 0 ? `<span class="ai-cost">$${t.estCost.toFixed(2)}</span>` : '';
            return `
                <div class="ai-task-item ${statusCls}" onclick="cycleAITask(${si}, ${ti})">
                    <span class="ai-task-status">${statusIcon}</span>
                    <span class="ai-task-text">${t.text}</span>
                    <span class="ai-agent-tag">${t.agent}</span>
                    ${costTag}
                </div>`;
        }).join('');

        return `
            <div class="ai-section">
                <div class="ai-section-header" onclick="toggleAISection(${si})">
                    <span class="ai-section-title">${section.section}</span>
                    ${statusBadge}
                    <span class="ai-section-count">${completedCount}/${section.tasks.length}</span>
                </div>
                <div class="ai-section-tasks" id="ai-section-${si}">${tasksHtml}</div>
            </div>`;
    }).join('');
}

function toggleAISection(si) {
    document.getElementById(`ai-section-${si}`)?.classList.toggle('collapsed');
}

function cycleAITask(si, ti) {
    const task = SANO_DATA.aiAgentTasks[si].tasks[ti];
    const order = ['queued', 'running', 'complete'];
    if (task.status === 'blocked') return;
    task.status = order[(order.indexOf(task.status) + 1) % order.length];
    renderAITasks();
    updateTabCounts();
    saveData();
}

/* ===================== COST BREAKDOWN ===================== */
function renderCostBreakdown() {
    const container = document.getElementById('costBreakdown');
    if (!container || !SANO_DATA.agentCosts) return;

    const ac = SANO_DATA.agentCosts;
    const tableRows = ac.perAgent.map(a => `
        <tr>
            <td>${a.agent}</td>
            <td>${a.calls}</td>
            <td>$${a.spent.toFixed(2)}</td>
            <td>${a.model}</td>
        </tr>
    `).join('');

    const totalSpent = ac.perAgent.reduce((s, a) => s + a.spent, 0);
    const totalCalls = ac.perAgent.reduce((s, a) => s + a.calls, 0);

    container.innerHTML = `
        <h3>Agent Cost Breakdown</h3>
        <table class="cost-table">
            <thead><tr><th>Agent</th><th>Calls</th><th>Spent</th><th>Model</th></tr></thead>
            <tbody>${tableRows}</tbody>
            <tfoot><tr><td><strong>Total</strong></td><td><strong>${totalCalls}</strong></td><td><strong>$${totalSpent.toFixed(2)}</strong></td><td></td></tr></tfoot>
        </table>
    `;

    // 7-day bar chart
    const chartContainer = document.getElementById('spendChartCard');
    if (chartContainer && ac.dailySpend) {
        const maxSpend = Math.max(...ac.dailySpend.map(d => d.amount), 1);
        const bars = ac.dailySpend.map(d => {
            const heightPct = (d.amount / maxSpend) * 100;
            return `
                <div class="spend-bar-col">
                    <div class="spend-bar" style="height: ${Math.max(heightPct, 2)}%"></div>
                    <span class="spend-bar-label">${d.date.replace('Apr ', '')}</span>
                    <span class="spend-bar-value">$${d.amount.toFixed(2)}</span>
                </div>`;
        }).join('');
        chartContainer.innerHTML = `<h3>7-Day Agent Spend</h3><div class="spend-bars">${bars}</div>`;
    }
}

/* ===================== DECISION JOURNAL ===================== */
function renderDecisions() {
    const container = document.getElementById('decisionList');
    const filtersEl = document.getElementById('decisionFilters');
    if (!container || !SANO_DATA.decisions) return;

    // Get unique categories
    const categories = [...new Set(SANO_DATA.decisions.map(d => d.category))];
    if (filtersEl) {
        filtersEl.innerHTML = `<button class="decision-chip active" onclick="filterDecisions('all')">All</button>` +
            categories.map(c => `<button class="decision-chip" onclick="filterDecisions('${c}')">${c}</button>`).join('');
    }

    renderDecisionEntries('all');
}

function filterDecisions(category) {
    document.querySelectorAll('.decision-chip').forEach(c => c.classList.remove('active'));
    event.target.classList.add('active');
    renderDecisionEntries(category);
}

function renderDecisionEntries(category) {
    const container = document.getElementById('decisionList');
    if (!container) return;
    const filtered = category === 'all' ? SANO_DATA.decisions : SANO_DATA.decisions.filter(d => d.category === category);
    container.innerHTML = filtered.map((d, i) => `
        <div class="decision-entry" onclick="this.classList.toggle('expanded')">
            <div class="decision-row">
                <span class="decision-date">${d.date}</span>
                <span class="decision-title">${d.title}</span>
                <span class="decision-cat">${d.category}</span>
            </div>
            <div class="decision-reasoning">${d.reasoning}</div>
        </div>
    `).join('');
}

/* ===================== AGENT FEED ===================== */
function renderAgentFeed() {
    const container = document.getElementById('agentFeed');
    if (!container) return;
    if (!SANO_DATA.agentReports.length) {
        container.innerHTML = '<div class="empty-state">No agent activity yet.</div>';
        return;
    }
    container.innerHTML = SANO_DATA.agentReports.map(r => {
        const statusCls = r.status === 'complete' ? 'status-complete' : r.status === 'running' ? 'status-running' : 'status-failed';
        const statusIcon = r.status === 'complete' ? '✓' : r.status === 'running' ? '•••' : '✗';
        return `
        <div class="agent-report">
            <div class="agent-report-header">
                <span class="agent-name">${r.agent} <span class="agent-status ${statusCls}">${statusIcon}</span></span>
                <span class="agent-time">${r.time}</span>
            </div>
            <div class="agent-message">${r.message}</div>
            ${r.file ? `<span class="agent-file-link">${r.file}</span>` : ''}
        </div>`;
    }).join('');
}

/* ===================== INTEL & DOCS ===================== */
function renderIntelDocs() {
    const container = document.getElementById('intelList');
    if (!container || !SANO_DATA.intelDocs) return;
    container.innerHTML = SANO_DATA.intelDocs.map((cat, ci) => {
        const docs = cat.docs.map(d => `
            <div class="intel-doc">
                <span class="intel-doc-title">${d.title}</span>
                <span class="intel-doc-file">${d.file}</span>
            </div>
        `).join('');
        return `
            <div class="intel-category">
                <div class="intel-cat-header" onclick="document.getElementById('intel-${ci}').classList.toggle('collapsed')">
                    <span>${cat.category}</span>
                    <span class="intel-count">${cat.docs.length}</span>
                </div>
                <div class="intel-docs" id="intel-${ci}">${docs}</div>
            </div>`;
    }).join('');
}

/* ===================== COMPLETED ===================== */
function renderCompleted() {
    const container = document.getElementById('completedList');
    if (!container) return;
    const completedItems = SANO_DATA.priorities.filter(p => p.done);
    container.innerHTML = completedItems.map(p => `
        <div class="completed-item">
            <span class="completed-check">✓</span>
            <span class="completed-text">${p.text}</span>
            ${p.steps && p.steps[0] ? `<span class="completed-date">${p.steps[0].replace('✅ ', '')}</span>` : ''}
        </div>
    `).join('');
}

/* ===================== COMMENT SYSTEM ===================== */
function openComment(type, target) {
    const modal = document.getElementById('commentModal');
    const input = document.getElementById('commentInput');
    const label = document.getElementById('commentTarget');
    if (!modal) return;
    label.textContent = target;
    modal.dataset.type = type;
    modal.dataset.target = target;
    input.value = '';
    modal.classList.add('open');
    input.focus();
}

function closeComment() { document.getElementById('commentModal')?.classList.remove('open'); }

function submitComment() {
    const modal = document.getElementById('commentModal');
    const input = document.getElementById('commentInput');
    if (!input.value.trim()) return;
    SANO_DATA.comments.unshift({
        id: `comment-${Date.now()}`,
        target: modal.dataset.target,
        type: modal.dataset.type,
        text: input.value.trim(),
        timestamp: new Date().toLocaleString(),
    });
    closeComment();
    saveData();
    showToast(`Note saved`);
}

/* ===================== UTILITIES ===================== */
function setText(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }
function refreshDashboard() { location.reload(); }
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 2500);
}
