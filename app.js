/* ============================================
   SANO COMMAND CENTER — v6.0
   AI-First Mission Control
   Updated: April 11, 2026
   ============================================ */

const DATA_VERSION = '2026-04-15-v11-cc-v9-redesign';

document.addEventListener('DOMContentLoaded', () => {
    loadSavedData();
    initClock();
    initCountdown();
    renderAlertPanel();
    renderTodaysFocus();
    renderBurndownChart();
    renderOvernightReport();
    renderAgentStatusBoard();
    renderAgentSpend();
    renderWarmupBar();
    renderJasperTasks();
    renderAiTasks();
    renderAgentFeed();
    renderAgentCostBreakdown();
    renderDecisionJournal();
    renderIntelDocs();
    renderCompleted();
    renderComments();
    renderBudget();
    renderLaunchPlan();
    updateProgressStats();
    updateTabCounts();
    initKeyboardShortcuts();

    setInterval(updateClock, 1000);
    setInterval(updateCountdown, 60000);
});

/* --- Clock & Date --- */
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

/* --- Countdown --- */
function initCountdown() { updateCountdown(); }

function updateCountdown() {
    const el = document.getElementById('headerCountdown');
    const diff = SANO_DATA.launchDate - new Date();
    if (diff <= 0) {
        if (el) el.innerHTML = '<span class="cd-number">0</span><span class="cd-unit"> days</span>';
        return;
    }
    const d = Math.floor(diff / 864e5);
    const h = Math.floor((diff % 864e5) / 36e5);
    const m = Math.floor((diff % 36e5) / 6e4);
    if (el) {
        el.innerHTML = `<span class="cd-number">${d}</span><span class="cd-unit"> days</span>` +
                       `<span class="cd-sep">·</span>` +
                       `<span class="cd-number">${h}</span><span class="cd-unit"> hours</span>` +
                       `<span class="cd-sep">·</span>` +
                       `<span class="cd-number">${m}</span><span class="cd-unit"> minutes</span>`;
    }
}

/* --- Week Timeline (Feature 3: Dependencies) --- */
function renderWeekTimeline() {
    const container = document.getElementById('weekTimeline');
    if (!container) return;
    container.innerHTML = SANO_DATA.weeks.map(w => {
        const deps = w.blockedBy || [];
        const depHtml = deps.length > 0 ? `<div class="week-deps">${deps.map(d => {
            // Determine blocker status based on week status
            const weekNum = parseInt(d.match(/W(\d)/)?.[1]);
            const blockerWeek = SANO_DATA.weeks.find(wk => wk.num === weekNum);
            const bStatus = blockerWeek?.status === 'done' ? 'dep-done' : blockerWeek?.status === 'active' ? 'dep-active' : 'dep-blocked';
            return `<span class="dep-tag ${bStatus}">${d}</span>`;
        }).join('')}</div>` : '';
        return `
        <div class="week-block ${w.status}" title="${w.theme}" onclick="switchTab('launch'); setTimeout(() => scrollToLaunchWeek(${w.num}), 100)" style="cursor:pointer">
            <span class="week-num">W${w.num}</span>
            <span class="week-name">${w.name}</span>
            <span class="week-dates">${w.dates}</span>
            ${depHtml}
        </div>
    `;
    }).join('');
}

/* --- Feature 5: Alert Panel (NASA Caution & Warning) --- */
function renderAlertPanel() {
    const panel = document.getElementById('alertPanel');
    if (!panel) return;
    const active = (SANO_DATA.alerts || []).filter(a => !a.dismissed);
    if (active.length === 0) {
        panel.style.display = 'none';
        return;
    }
    panel.style.display = 'block';
    panel.innerHTML = `
        <div class="alert-inner">
            <div class="alert-header">
                <span class="alert-title">⚠️ ATTENTION REQUIRED</span>
                <span class="alert-count">${active.length} alert${active.length > 1 ? 's' : ''}</span>
            </div>
            ${active.map(a => {
                const sevCls = a.severity === 'critical' ? 'alert-critical' : 'alert-warning';
                const sevLabel = a.severity === 'critical' ? 'CRITICAL' : 'WARNING';
                return `<div class="alert-item ${sevCls}">
                    <div class="alert-item-top">
                        <span class="alert-sev-tag ${sevCls}">${sevLabel}</span>

<span class="alert-agent">${a.agent}</span>
                        <span class="alert-time">${a.timestamp}</span>
                        <button class="alert-dismiss" onclick="dismissAlert('${a.id}')">✕</button>
                    </div>
                    <div class="alert-message">${a.message}</div>
                    ${a.action ? `<div class="alert-action">Action: ${a.action}</div>` : ''}
                </div>`;
            }).join('')}
        </div>
    `;
}

function dismissAlert(id) {
    const alert = SANO_DATA.alerts.find(a => a.id === id);
    if (alert) {
        alert.dismissed = true;
        renderAlertPanel();
        saveData();
    }
}

/* --- Feature 1: Burndown Chart (SVG) --- */
function renderBurndownChart() {
    const container = document.getElementById('burndownChart');
    const bd = SANO_DATA.burndown;
    if (!container || !bd || !bd.log.length) return;

    const W = 460, H = 140, PAD = 30, PAD_R = 10, PAD_T = 20, PAD_B = 24;
    const totalTasks = bd.log[0].remaining;
    const startDate = new Date('2026-04-04');
    const endDate = new Date('2026-06-01');
    const totalDays = Math.ceil((endDate - startDate) / 86400000);

    // Scale helpers
    const x = (dayIdx) => PAD + (dayIdx / totalDays) * (W - PAD - PAD_R);
    const y = (remaining) => PAD_T + (1 - remaining / totalTasks) * (H - PAD_T - PAD_B);

    // Ideal line: straight diagonal
    const idealStart = `${x(0)},${y(totalTasks)}`;
    const idealEnd = `${x(totalDays)},${y(0)}`;

    // Actual line: from data
    const actualPoints = bd.log.map((entry, i) => {
        const entryDate = new Date(`2026-${entry.date.replace('Apr ', '04-').replace('May ', '05-').replace('Jun ', '06-')}`);
        const dayIdx = Math.ceil((entryDate - startDate) / 86400000);
        return `${x(dayIdx)},${y(entry.remaining)}`;
    }).join(' ');

    // Current status
    const latest = bd.log[bd.log.length - 1];
    const currentDay = Math.ceil((new Date() - startDate) / 86400000);
    const idealRemaining = totalTasks - (totalTasks * (currentDay / totalDays));
    const diff = latest.remaining - idealRemaining;
    const statusLabel = diff <= -2 ? 'AHEAD' : diff >= 2 ? 'BEHIND' : 'ON PACE';
    const statusCls = diff <= -2 ? 'bd-ahead' : diff >= 2 ? 'bd-behind' : 'bd-pace';
    const velocity = bd.log.length >= 2 ? (bd.log[0].remaining - latest.remaining) / (bd.log.length - 1) : 0;

    container.innerHTML = `
        <div class="burndown-inner">
            <div class="burndown-header">
                <span class="burndown-title">📉 Launch Burndown</span>
                <span class="burndown-status ${statusCls}">${statusLabel}</span>
            </div>
            <svg viewBox="0 0 ${W} ${H}" class="burndown-svg">
                <!-- Grid lines -->
                <line x1="${PAD}" y1="${PAD_T}" x2="${PAD}" y2="${H - PAD_B}" class="bd-axis"/>
                <line x1="${PAD}" y1="${H - PAD_B}" x2="${W - PAD_R}" y2="${H - PAD_B}" class="bd-axis"/>
                <!-- Y labels -->
                <text x="${PAD - 4}" y="${PAD_T + 4}" class="bd-label" text-anchor="end">${totalTasks}</text>
                <text x="${PAD - 4}" y="${y(totalTasks / 2) + 4}" class="bd-label" text-anchor="end">${Math.round(totalTasks / 2)}</text>
                <text x="${PAD - 4}" y="${H - PAD_B + 4}" class="bd-label" text-anchor="end">0</text>
                <!-- X labels -->
                <text x="${PAD}" y="${H - 6}" class="bd-label">Apr 4</text>
                <text x="${x(totalDays / 2)}" y="${H - 6}" class="bd-label" text-anchor="middle">May 3</text>
                <text x="${W - PAD_R}" y="${H - 6}" class="bd-label" text-anchor="end">Jun 1</text>
                <!-- Ideal line -->
                <line x1="${idealStart.split(',')[0]}" y1="${idealStart.split(',')[1]}" x2="${idealEnd.split(',')[0]}" y2="${idealEnd.split(',')[1]}" class="bd-ideal"/>
                <!-- Actual line -->
                <polyline points="${actualPoints}" class="bd-actual"/>
                <!-- Current dot -->
                <circle cx="${actualPoints.split(' ').pop().split(',')[0]}" cy="${actualPoints.split(' ').pop().split(',')[1]}" r="3" class="bd-dot"/>
            </svg>
            <div class="burndown-meta">
                <span>${latest.remaining} tasks left</span>
                <span>~${velocity.toFixed(1)} tasks/day avg</span>
                <span class="bd-legend-ideal">— ideal</span>

<span class="bd-legend-actual">— actual</span>
            </div>
        </div>
    `;
}

/* --- Overnight Report Card --- */
function renderOvernightReport() {
    const container = document.getElementById('overnightCard');
    const report = SANO_DATA.overnightReport;
    if (!container || !report || report.status === 'none') { if (container) container.style.display = 'none'; return; }

    const statusLabel = report.status === 'running' ? '⟳ RUNNING NOW' :
                        report.status === 'complete' ? '✓ COMPLETE' : '✗ ISSUES';
    const statusCls = report.status === 'running' ? 'overnight-running' :
                      report.status === 'complete' ? 'overnight-complete' : 'overnight-failed';

    const deliverableHtml = report.deliverables.map(d => {
        const icon = d.status === 'complete' ? '✓' : d.status === 'running' ? '⟳' : '◌';
        const cls = d.status === 'complete' ? 'del-done' : d.status === 'running' ? 'del-running' : 'del-queued';
        return `<span class="overnight-del ${cls}">${icon} ${d.name}</span>`;
    }).join('');

    container.innerHTML = `
        <div class="overnight-inner ${statusCls}">
            <div class="overnight-header">
                <span class="overnight-title">🌙 Overnight Agents</span>
                <span class="overnight-status">${statusLabel}</span>
            </div>
            <div class="overnight-stats">
                <span>${report.tasksCompleted}/${report.tasksTotal} tasks</span>
                <span>$${report.totalCost.toFixed(2)} spent</span>
                <span>Started ${report.startTime}</span>
            </div>
            <div class="overnight-deliverables">${deliverableHtml}</div>
        </div>
    `;
    container.style.display = 'block';
}

/* --- CEO Directive Badge --- */
function renderDirectiveBadge() {
    const el = document.getElementById('directiveBadge');
    const dir = SANO_DATA.directive;
    if (!el) return;
    if (!dir || !dir.active) {
        el.innerHTML = `<span class="dir-badge dir-none">No directive — agents will propose</span>`;
        return;
    }
    el.innerHTML = `<span class="dir-badge dir-active">📌 Tonight: ${dir.taskCount} tasks pre-approved (~$${dir.estimatedCost.toFixed(2)})</span>`;
}

/* --- Agent Spend Tracker --- */
function renderAgentSpend() {
    const spend = SANO_DATA.agentSpend;
    if (!spend) return;

    setText('agentSpendTonight', `$${spend.tonight.spent.toFixed(2)}`);
    setText('agentSpendLimit', `$${spend.tonight.spent.toFixed(2)}/$${spend.tonight.limit}`);
    setText('agentSpendMonth', `$${spend.month.spent.toFixed(2)}/$${spend.month.limit}`);

    const pct = Math.round((spend.tonight.spent / spend.tonight.limit) * 100);
    const bar = document.getElementById('agentSpendBar');
    if (bar) setTimeout(() => { bar.style.width = `${pct}%`; }, 200);
}

/* --- Warmup Bar --- */
function renderWarmupBar() {
    const m = SANO_DATA.metrics;
    if (!m) return;

    setText('warmupProgress', `Day ${m.emailWarmupDay}`);
    setText('warmupReadyDate', `~${m.emailWarmupReadyDate}`);

    const pct = Math.round((m.emailWarmupDay / m.emailWarmupTarget) * 100);
    const bar = document.getElementById('warmupBar');
    if (bar) setTimeout(() => { bar.style.width = `${pct}%`; }, 300);
}

/* --- Tab Navigation --- */
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === `tab-${tabName}`);
    });
    // Scroll to top of main
    document.querySelector('.main')?.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateTabCounts() {
    const jasperRemaining = SANO_DATA.jasperTasks.flatMap(s => s.items).filter(i => i.status !== 'done').length;
    const aiRemaining = SANO_DATA.aiTasks.flatMap(s => s.items).filter(i => i.status !== 'done' && i.status !== 'complete').length;
    const completedCount = SANO_DATA.completed.length;

    const totalActive = jasperRemaining + aiRemaining;
    setText('workTaskCount', totalActive);
    setText('completedTaskCount', completedCount);
}

/* --- Jasper Tasks Renderer --- */
function renderJasperTasks() {
    const container = document.getElementById('jasperTaskList');
    if (!container) return;

container.innerHTML = SANO_DATA.jasperTasks.map((section, si) => {
        const total = section.items.length;
        const done = section.items.filter(i => i.status === 'done').length;
        const pct = total > 0 ? Math.round((done / total) * 100) : 0;

        const items = section.items.map((item, ii) => {
            const statusCls = item.status === 'done' ? 'task-done' :
                              item.status === 'in-progress' ? 'task-active' : '';
            const icon = item.status === 'done' ? '✓' :
                         item.status === 'in-progress' ? '●' : '○';
            const dayBadge = item.day ? `<span class="day-badge">${item.day}</span>` : '';
            const timeBadge = item.time ? `<span class="time-badge-sm">${item.time}</span>` : '';

            return `<div class="task-item ${statusCls}" onclick="cycleJasperTask(${si},${ii})">
                <span class="task-icon">${icon}</span>
                <span class="task-text">${item.text}</span>
                ${dayBadge}
                ${timeBadge}
                <button class="comment-btn-sm" onclick="event.stopPropagation(); openComment('jasper-task', '${item.text.replace(/'/g, "\\'")}')" title="Note">···</button>
            </div>`;
        }).join('');

        return `
            <div class="task-section">
                <div class="task-section-header" onclick="toggleTaskSection('jasper-section-${si}')">
                    <div style="display:flex;align-items:center;gap:8px;flex:1">
                        <span class="task-section-title">${section.section}</span>
                        <span class="task-section-desc">${section.description}</span>
                    </div>
                    <div class="task-section-progress">
                        <div class="mini-progress-bar"><div class="mini-progress-fill" style="width:${pct}%"></div></div>
                        <span class="task-section-pct">${done}/${total}</span>
                    </div>
                </div>
                <div class="task-items ${si < 3 ? 'open' : ''}" id="jasper-section-${si}">${items}</div>
            </div>`;
    }).join('');
}

function cycleJasperTask(si, ii) {
    const item = SANO_DATA.jasperTasks[si].items[ii];
    const order = ['not-started', 'in-progress', 'done'];
    item.status = order[(order.indexOf(item.status) + 1) % 3];
    renderJasperTasks();
    updateProgressStats();
    updateTabCounts();
    saveData();
}

/* --- AI Tasks Renderer --- */
function renderAiTasks() {
    const container = document.getElementById('aiTaskList');
    if (!container) return;

    container.innerHTML = SANO_DATA.aiTasks.map((section, si) => {
        const total = section.items.length;
        const done = section.items.filter(i => i.status === 'done' || i.status === 'complete').length;
        const running = section.items.filter(i => i.status === 'running').length;
        const pct = total > 0 ? Math.round((done / total) * 100) : 0;

        const items = section.items.map((item, ii) => {
            const statusCls = item.status === 'done' || item.status === 'complete' ? 'task-done' :
                              item.status === 'running' ? 'task-running' :
                              item.status === 'queued' ? 'task-queued' :
                              item.status === 'in-progress' ? 'task-active' : '';
            const icon = (item.status === 'done' || item.status === 'complete') ? '✓' :
                         item.status === 'running' ? '⟳' :
                         item.status === 'queued' ? '◌' :
                         item.status === 'in-progress' ? '●' : '○';
            const agentBadge = item.agent ? `<span class="agent-badge">${item.agent}</span>` : '';
            const costBadge = item.cost ? `<span class="cost-badge">${item.cost}</span>` : '';

            return `<div class="task-item ${statusCls}" onclick="cycleAiTask(${si},${ii})">
                <span class="task-icon">${icon}</span>
                <span class="task-text">${item.text}</span>
                ${agentBadge}
                ${costBadge}
                <button class="comment-btn-sm" onclick="event.stopPropagation(); openComment('ai-task', '${item.text.replace(/'/g, "\\'")}')" title="Note">···</button>
            </div>`;
        }).join('');

        const runningLabel = running > 0 ? `<span class="running-badge">${running} running</span>` : '';

        return `
            <div class="task-section">

<div class="task-section-header" onclick="toggleTaskSection('ai-section-${si}')">
                    <div style="display:flex;align-items:center;gap:8px;flex:1">
                        <span class="task-section-title">${section.section}</span>
                        <span class="task-section-desc">${section.description}</span>
                        ${runningLabel}
                    </div>
                    <div class="task-section-progress">
                        <div class="mini-progress-bar"><div class="mini-progress-fill" style="width:${pct}%"></div></div>
                        <span class="task-section-pct">${done}/${total}</span>
                    </div>
                </div>
                <div class="task-items ${si < 2 ? 'open' : ''}" id="ai-section-${si}">${items}</div>
            </div>`;
    }).join('');
}

function cycleAiTask(si, ii) {
    const item = SANO_DATA.aiTasks[si].items[ii];
    const order = ['not-started', 'queued', 'running', 'done'];
    item.status = order[(order.indexOf(item.status) + 1) % order.length];
    renderAiTasks();
    updateProgressStats();
    updateTabCounts();
    saveData();
}

/* --- Toggle Task Sections --- */
function toggleTaskSection(id) {
    document.getElementById(id)?.classList.toggle('open');
}

/* --- Agent Feed --- */
function renderAgentFeed() {
    const container = document.getElementById('agentFeed');
    if (!container) return;
    if (!SANO_DATA.agentReports.length) {
        container.innerHTML = '<div class="empty-state">No agent activity yet.</div>';
        return;
    }
    container.innerHTML = SANO_DATA.agentReports.map(r => {
        const statusCls = r.status === 'complete' ? 'status-complete' :
                          r.status === 'running' ? 'status-running' : 'status-failed';
        const statusIcon = r.status === 'complete' ? '✓' :
                           r.status === 'running' ? '⟳' : '✗';
        return `
        <div class="agent-report">
            <div class="agent-report-header">
                <span class="agent-name">${r.agent} <span class="agent-status ${statusCls}">${statusIcon}</span></span>
                <span class="agent-time">${r.time}</span>
            </div>
            <div class="agent-message">${r.message}</div>
        </div>`;
    }).join('');
}

/* --- Feature 4: Decision Journal (Enhanced) --- */
let decisionFilter = 'all';
function renderDecisionJournal() {
    const container = document.getElementById('decisionLog');
    const filterContainer = document.getElementById('decisionFilter');
    if (!container) return;

    // Get unique tags
    const tags = [...new Set(SANO_DATA.decisions.map(d => d.tag).filter(Boolean))];

    // Render filter chips
    if (filterContainer) {
        filterContainer.innerHTML = `
            <button class="filter-chip ${decisionFilter === 'all' ? 'active' : ''}" onclick="filterDecisions('all')">All</button>
            ${tags.map(t => `<button class="filter-chip ${decisionFilter === t ? 'active' : ''}" onclick="filterDecisions('${t}')">${t}</button>`).join('')}
        `;
    }

    // Filter decisions
    const filtered = decisionFilter === 'all' ? SANO_DATA.decisions : SANO_DATA.decisions.filter(d => d.tag === decisionFilter);
    setText('decisionCount', `${filtered.length} decisions`);

    container.innerHTML = filtered.map((d, i) => {
        const tagCls = `dtag-${d.tag || 'other'}`;
        const hasDetail = d.reasoning || d.alternatives;
        return `
        <div class="dj-entry">
            <div class="dj-header" ${hasDetail ? `onclick="toggleDecisionDetail('dj-detail-${i}')"` : ''}>
                <span class="dj-date">${d.date}</span>
                <span class="dj-decision">${d.decision}</span>
                ${d.tag ? `<span class="dj-tag ${tagCls}">${d.tag}</span>` : ''}
                <span class="dj-impact">${d.impact}</span>
                ${hasDetail ? '<span class="dj-expand">▸</span>' : ''}
            </div>
            ${hasDetail ? `<div class="dj-detail" id="dj-detail-${i}">
                ${d.reasoning ? `<div class="dj-reasoning"><strong>Why:</strong> ${d.reasoning}</div>` : ''}
                ${d.alternatives ? `<div class="dj-alternatives"><strong>Alternatives:</strong> ${d.alternatives}</div>` : ''}
            </div>` : ''}
        </div>`;
    }).join('');
}

function filterDecisions(tag) {
    decisionFilter = tag;
    renderDecisionJournal();
}

function toggleDecisionDetail(id) {

const el = document.getElementById(id);
    if (el) {
        el.classList.toggle('open');
        const arrow = el.previousElementSibling?.querySelector('.dj-expand');
        if (arrow) arrow.textContent = el.classList.contains('open') ? '▾' : '▸';
    }
}

/* --- Feature 2: Agent Cost Breakdown (Enhanced) --- */
function renderAgentCostBreakdown() {
    const container = document.getElementById('agentCostBreakdown');
    const spend = SANO_DATA.agentSpend;
    if (!container || !spend) return;

    // Per-agent table
    const agentRows = (spend.perAgent || []).map(a => `
        <div class="cost-row">
            <span class="cost-agent">${a.agent}</span>
            <span class="cost-tasks">${a.tasks} tasks</span>
            <span class="cost-amount">$${a.spent.toFixed(2)}</span>
            <span class="cost-avg">~$${a.avgPerTask.toFixed(2)}/task</span>
        </div>
    `).join('');

    // 7-day bar chart
    const history = spend.dailyHistory || [];
    const maxSpend = Math.max(...history.map(d => d.spent), 0.01);
    const bars = history.map(d => {
        const pct = (d.spent / maxSpend) * 100;
        return `<div class="cost-bar-col">
            <div class="cost-bar-value">$${d.spent.toFixed(2)}</div>
            <div class="cost-bar-track"><div class="cost-bar-fill" style="height:${pct}%"></div></div>
            <div class="cost-bar-label">${d.date.replace('Apr ', '')}</div>
        </div>`;
    }).join('');

    container.innerHTML = `
        <div class="cost-grid">
            <div class="cost-agents">
                <div class="cost-section-label">Per Agent (All Time)</div>
                ${agentRows}
                <div class="cost-row cost-total">
                    <span class="cost-agent">Total</span>
                    <span class="cost-tasks">${(spend.perAgent || []).reduce((s, a) => s + a.tasks, 0)} tasks</span>
                    <span class="cost-amount">$${(spend.perAgent || []).reduce((s, a) => s + a.spent, 0).toFixed(2)}</span>
                    <span class="cost-avg"></span>
                </div>
            </div>
            <div class="cost-chart">
                <div class="cost-section-label">Daily Spend (Last 7 Days)</div>
                <div class="cost-bars">${bars}</div>
            </div>
        </div>
    `;
}


/* --- Completed List --- */
function renderCompleted() {
    const container = document.getElementById('completedList');
    if (!container) return;
    container.innerHTML = SANO_DATA.completed.map(c => `
        <div class="completed-item">
            <span class="completed-icon">✓</span>
            <span class="completed-text">${c.text}</span>
            <span class="completed-date">${c.date}</span>
        </div>
    `).join('');
}

/* --- Progress Stats --- */
function updateProgressStats() {
    const jasperItems = SANO_DATA.jasperTasks.flatMap(s => s.items);
    const aiItems = SANO_DATA.aiTasks.flatMap(s => s.items);
    const allItems = [...jasperItems, ...aiItems];

    const total = allItems.length;
    const done = allItems.filter(i => i.status === 'done' || i.status === 'complete').length;
    const running = allItems.filter(i => i.status === 'running' || i.status === 'in-progress' || i.status === 'queued').length;
    const remaining = total - done - running;
    const completedTotal = done + SANO_DATA.completed.length;
    const grandTotal = total + SANO_DATA.completed.length;
    const pct = grandTotal > 0 ? Math.round((completedTotal / grandTotal) * 100) : 0;

    setText('overallPercent', `${pct}%`);
    setText('completedCount', completedTotal);
    setText('runningCount', running);
    setText('remainingCount', remaining);

    // GHL progress
    setText('ghlProgress', `${SANO_DATA.metrics.ghlSessionsCompleted}/${SANO_DATA.metrics.ghlSessionsTarget}`);
    setText('sopCount', SANO_DATA.metrics.sopsAutoGenerated);

    setTimeout(() => {
        const bar = document.getElementById('overallBar');
        if (bar) bar.style.width = `${pct}%`;
    }, 200);
}

/* --- Intel & Docs --- */
function renderIntelDocs() {
    const container = document.getElementById('intelList');
    if (!container || !SANO_DATA.intel) return;

    container.innerHTML = SANO_DATA.intel.map(cat => {
        const docs = cat.docs.map(d => {
            const statusCls = d.status === 'key' ? 'doc-key' :
                              d.status === 'pending' ? 'doc-pending' :
                              d.status === 'needs-update' ? 'doc-update' :

d.status === 'needed' ? 'doc-needed' :
                              d.status === 'confirmed' ? 'doc-confirmed' : 'doc-current';
            const statusLabel = d.status === 'key' ? 'KEY' :
                                d.status === 'pending' ? 'PENDING' :
                                d.status === 'needs-update' ? 'UPDATE' :
                                d.status === 'needed' ? 'NEEDED' :
                                d.status === 'confirmed' ? '✓' : '';
            const pathHtml = d.path ? `<span class="doc-path">${d.path}</span>` : '';
            return `<div class="doc-item ${statusCls}">
                <span class="doc-name">${d.name}</span>
                <span class="doc-desc">${d.desc}</span>
                ${statusLabel ? `<span class="doc-status-tag ${statusCls}">${statusLabel}</span>` : ''}
                ${pathHtml}
            </div>`;
        }).join('');

        return `
            <div class="intel-category">
                <div class="intel-cat-header" onclick="toggleIntelCat(this)">
                    <span class="intel-cat-icon">${cat.icon}</span>
                    <span class="intel-cat-name">${cat.category}</span>
                    <span class="intel-cat-count">${cat.docs.length}</span>
                </div>
                <div class="intel-cat-docs open">${docs}</div>
            </div>`;
    }).join('');
}

function toggleIntelCat(header) {
    header.nextElementSibling?.classList.toggle('open');
}

/* --- Budget --- */
function renderBudget() {
    const budget = SANO_DATA.budget;
    if (!budget) return;

    const spent = budget.expenses
        .filter(e => e.status === 'paid')
        .reduce((sum, e) => sum + e.amount, 0);

    const remaining = budget.starting - spent;
    const pctRemaining = Math.round((remaining / budget.starting) * 100);

    const amountEl = document.getElementById('budgetRemaining');
    if (amountEl) {
        amountEl.textContent = `$${remaining.toLocaleString()}`;
        amountEl.className = 'health-value budget-remaining-val';
        if (pctRemaining < 25) amountEl.classList.add('danger');
        else if (pctRemaining < 50) amountEl.classList.add('caution');
    }

    const barEl = document.getElementById('budgetBar');
    if (barEl) {
        barEl.className = 'health-bar-fill budget-bar-fill';
        if (pctRemaining < 25) barEl.classList.add('danger');
        else if (pctRemaining < 50) barEl.classList.add('caution');
        setTimeout(() => { barEl.style.width = `${pctRemaining}%`; }, 200);
    }

    setText('budgetBurn', `$${budget.monthlyBurn.preChris}/mo`);
    setText('budgetRunway', budget.runway.preChris);
}

/* --- Comment System --- */
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
    const keyHandler = (e) => {
        if (e.key === 'Escape') { closeComment(); document.removeEventListener('keydown', keyHandler); }
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { submitComment(); document.removeEventListener('keydown', keyHandler); }
    };
    document.addEventListener('keydown', keyHandler);
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
    renderComments();
    saveData();
    showToast(`Note saved: "${modal.dataset.target}"`);
}

function renderComments() {
    const container = document.getElementById('commentFeed');
    const countEl = document.getElementById('commentCount');
    if (!container) return;
    if (countEl) countEl.textContent = SANO_DATA.comments.length;
    if (!SANO_DATA.comments.length) {
        container.innerHTML = '<div class="empty-state">No notes yet.</div>';
        return;
    }

container.innerHTML = SANO_DATA.comments.slice(0, 20).map(c => {
        const label = c.type === 'decision' ? 'DECISION' : 'NOTE';
        const cls = c.type === 'decision' ? 'comment-decision' : '';
        return `
        <div class="comment-item ${cls}">
            <div class="comment-header">
                <span>${label} — <strong>${c.target}</strong></span>
                <span class="comment-time">${c.timestamp}</span>
            </div>
            <div class="comment-text">${c.text}</div>
        </div>`;
    }).join('');
}

function copyAllComments() {
    const text = exportComments();
    navigator.clipboard.writeText(text).then(() => {
        showToast('Notes copied to clipboard');
    }).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast('Notes copied');
    });
}

function exportComments() {
    if (!SANO_DATA.comments || !SANO_DATA.comments.length) return 'No notes yet.';
    return SANO_DATA.comments.map(c => {
        const prefix = c.type === 'decision' ? 'DECISION' : 'NOTE';
        return `${prefix} | ${c.target}\n${c.text}\n(${c.timestamp})\n`;
    }).join('\n---\n\n');
}

/* --- Toast --- */
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 2500);
}

/* --- Utilities --- */
function setText(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }
function refreshDashboard() { location.reload(); }

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        el.classList.add('section-highlight');
        setTimeout(() => el.classList.remove('section-highlight'), 1500);
    }
}

function resetToDefaultData() { localStorage.removeItem(STORAGE_KEY); location.reload(); }

/* ============================================
   🗺️ LAUNCH PLAN TAB
   ============================================ */

function renderLaunchPlan() {
    const plan = SANO_DATA.launchPlan;
    if (!plan) return;

    // Overall stats
    const allTasks = plan.flatMap(w => [...w.jasperTasks, ...w.agentTasks]);
    const doneTasks = allTasks.filter(t => t.status === 'done').length;
    const totalTasks = allTasks.length;
    const overallPct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
    const activeWeek = plan.find(w => w.status === 'active') || plan[0];

    setText('launchPlanPct', `${overallPct}%`);
    setText('launchPlanBadge', `Week ${activeWeek.week} of 8 · ${overallPct}% Complete`);

    // NEXT UP card
    const nextUpContainer = document.getElementById('launchNextUp');
    if (nextUpContainer) {
        const nextTask = activeWeek.jasperTasks.find(t => t.status !== 'done') ||
                         activeWeek.agentTasks.find(t => t.status !== 'done');
        if (nextTask) {
            const isAgent = nextTask.agent ? true : false;
            const typeLabel = isAgent ? `Agent (${nextTask.agent})` : 'Jasper Task';
            nextUpContainer.innerHTML = `
                <div class="lp-next-up">
                    <span class="lp-next-label">⚡ NEXT UP</span>
                    <span class="lp-next-task">${nextTask.text}</span>
                    <span class="lp-next-meta">Week ${activeWeek.week} · ${typeLabel}</span>
                </div>`;
        } else {
            nextUpContainer.innerHTML = '';
        }
    }

    // Pill nav
    const pillNav = document.getElementById('lpPillNav');
    if (pillNav) {
        pillNav.innerHTML = plan.map(w => {
            const cls = w.status === 'active' ? 'lp-pill active' :
                        w.status === 'done' ? 'lp-pill done' : 'lp-pill';
            return `<button class="${cls}" onclick="scrollToLaunchWeek(${w.week})">W${w.week}</button>`;
        }).join('');
    }

    // Week cards
    const container = document.getElementById('launchPlanContent');
    if (!container) return;

    container.innerHTML = plan.map((w, wi) => {
        const jDone = w.jasperTasks.filter(t => t.status === 'done').length;
        const jTotal = w.jasperTasks.length;
        const jPct = jTotal > 0 ? Math.round((jDone / jTotal) * 100) : 0;

        const aDone = w.agentTasks.filter(t => t.status === 'done').length;
        const aTotal = w.agentTasks.length;
        const aPct = aTotal > 0 ? Math.round((aDone / aTotal) * 100) : 0;

        const gPassed = w.gate.filter(g => g.passed).length;
        const gTotal = w.gate.length;
        const gateAllPassed = gPassed === gTotal;

        // Pace indicator
        const pace = calcWeekPace(w);
        const paceLabel = pace === 'ahead' ? '🟢 AHEAD' :
                          pace === 'behind' ? '🔴 BEHIND' :
                          pace === 'on-pace' ? '🟡 ON PACE' : '';
        const paceCls = pace === 'ahead' ? 'lp-pace-ahead' :
                        pace === 'behind' ? 'lp-pace-behind' : 'lp-pace-onpace';

        const isExpanded = w.status === 'active';
        const statusCls = `lp-week-${w.status}`;
        const statusIcon = w.status === 'done' ? '✅' :
                           w.status === 'active' ? '●' :
                           w.status === 'blocked' ? '⚠️' : '🔒';

        // Gate warning
        const gateWarning = (w.status === 'active' && !gateAllPassed) ?
            `<div class="lp-gate-warning">⚠️ ${gTotal - gPassed} gate${gTotal - gPassed > 1 ? 's' : ''} not passed — not ready for Week ${w.week + 1}</div>` : '';

        // Jasper task rows
        const jasperHtml = w.jasperTasks.map((t, ti) => {
            const icon = t.status === 'done' ? '✓' : t.status === 'in-progress' ? '●' : '○';
            const cls = t.status === 'done' ? 'task-done' : t.status === 'in-progress' ? 'task-active' : '';
            return `<div class="task-item ${cls}" onclick="cycleLaunchTask(${wi},'jasperTasks',${ti})">
                <span class="task-icon">${icon}</span>
                <span class="task-text">${t.text}</span>
            </div>`;
        }).join('');

        // Agent task rows
        const agentHtml = w.agentTasks.map((t, ti) => {
            const icon = t.status === 'done' ? '✓' : t.status === 'in-progress' ? '●' : '○';
            const cls = t.status === 'done' ? 'task-done' : t.status === 'in-progress' ? 'task-active' : '';
            const badge = t.agent ? `<span class="agent-badge">${t.agent}</span>` : '';
            return `<div class="task-item ${cls}" onclick="cycleLaunchTask(${wi},'agentTasks',${ti})">
                <span class="task-icon">${icon}</span>
                <span class="task-text">${t.text}</span>
                ${badge}
            </div>`;
        }).join('');

        // Gate rows
        const gateHtml = w.gate.map((g, gi) => {
            const icon = g.passed ? '■' : '□';
            const cls = g.passed ? 'lp-gate-passed' : 'lp-gate-failed';
            return `<div class="lp-gate-item ${cls}" onclick="toggleLaunchGate(${wi},${gi})">
                <span class="lp-gate-icon">${icon}</span>
                <span class="lp-gate-text">${g.text}</span>
                <span class="lp-gate-status">${g.passed ? '✅' : '❌'}</span>
            </div>`;
        }).join('');

        return `
        <div class="lp-week-card ${statusCls}" id="lp-week-${w.week}">
            <div class="lp-week-header" onclick="toggleLaunchWeek(${w.week})">
                <div class="lp-week-title-row">
                    <span class="lp-week-num">${statusIcon} W${w.week}</span>
                    <span class="lp-week-name">${w.name}</span>
                    ${paceLabel ? `<span class="lp-pace ${paceCls}">${paceLabel}</span>` : ''}
                </div>
                <div class="lp-week-meta">
                    <span>${w.dates} · "${w.theme}"</span>
                    <span>Budget: $${w.budget.estimated} est${w.budget.actual > 0 ? ' / $' + w.budget.actual + ' actual' : ''}</span>
                    <span>${w.estHours.jasper} hrs Jasper · ${w.estHours.agent} hrs Agent</span>
                </div>
                <div class="lp-week-bars">
                    <div class="lp-mini-bar"><div class="lp-mini-fill" style="width:${jPct}%"></div><span>🧠 ${jDone}/${jTotal}</span></div>
                    <div class="lp-mini-bar"><div class="lp-mini-fill lp-mini-agent" style="width:${aPct}%"></div><span>🤖 ${aDone}/${aTotal}</span></div>
                    <div class="lp-mini-bar"><div class="lp-mini-fill ${gateAllPassed ? 'lp-mini-gate-pass' : 'lp-mini-gate-fail'}" style="width:${gTotal > 0 ? (gPassed/gTotal)*100 : 0}%"></div><span>🚪 ${gPassed}/${gTotal}</span></div>
                </div>
            </div>
            <div class="lp-week-body ${isExpanded ? 'open' : ''}" id="lp-body-${w.week}">
                ${gateWarning}
                <div class="lp-section-label">🧠 JASPER TASKS (${jDone}/${jTotal})</div>
                ${jasperHtml}
                <div class="lp-section-label" style="margin-top:12px">🤖 AGENT TASKS (${aDone}/${aTotal})</div>
                ${agentHtml}
                <div class="lp-section-label lp-gate-label" style="margin-top:12px">🚪 GATE (${gPassed}/${gTotal} passed)</div>
                <div class="lp-gate-section">
                    ${gateHtml}
                </div>
            </div>
        </div>`;
    }).join('');
}

function calcWeekPace(w) {
    if (w.status !== 'active') return '';
    const now = new Date();
    const start = new Date(w.dateStart);
    const end = new Date(w.dateEnd);
    if (now < start) return '';
    const totalDays = (end - start) / 86400000;
    const elapsed = Math.min((now - start) / 86400000, totalDays);
    const pctElapsed = elapsed / totalDays;

    const allTasks = [...w.jasperTasks, ...w.agentTasks];
    const done = allTasks.filter(t => t.status === 'done').length;
    const pctDone = allTasks.length > 0 ? done / allTasks.length : 0;

    const diff = pctDone - pctElapsed;
    if (diff > 0.1) return 'ahead';
    if (diff < -0.1) return 'behind';
    return 'on-pace';
}

function cycleLaunchTask(wi, taskType, ti) {
    const task = SANO_DATA.launchPlan[wi][taskType][ti];
    const order = ['not-started', 'in-progress', 'done'];
    task.status = order[(order.indexOf(task.status) + 1) % 3];
    renderLaunchPlan();
    saveData();
}

function toggleLaunchGate(wi, gi) {
    SANO_DATA.launchPlan[wi].gate[gi].passed = !SANO_DATA.launchPlan[wi].gate[gi].passed;
    renderLaunchPlan();
    saveData();
}

function toggleLaunchWeek(weekNum) {
    const body = document.getElementById(`lp-body-${weekNum}`);
    if (body) body.classList.toggle('open');
}

function scrollToLaunchWeek(weekNum) {
    const el = document.getElementById(`lp-week-${weekNum}`);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Expand it
        const body = document.getElementById(`lp-body-${weekNum}`);
        if (body && !body.classList.contains('open')) body.classList.add('open');
    }
}

/* ============================================
   v9: TODAY'S FOCUS CARD
   Smart ranking: pinned > blocking > time-sensitive > ROI
   ============================================ */
function computeTodaysFocus() {
    const pins = SANO_DATA.focusPins || { jasper: [], ai: [] };

    // Collect all Jasper tasks that aren't done
    const jasperAll = [];
    SANO_DATA.jasperTasks.forEach((section, si) => {
        section.items.forEach((item, ii) => {
            if (item.status !== 'done') {
                jasperAll.push({ ...item, si, ii, id: `j-${si}-${ii}` });
            }
        });
    });

    // Collect all AI tasks that aren't done/complete
    const aiAll = [];
    SANO_DATA.aiTasks.forEach((section, si) => {
        section.items.forEach((item, ii) => {
            if (item.status !== 'done' && item.status !== 'complete') {
                aiAll.push({ ...item, si, ii, id: `a-${si}-${ii}` });
            }
        });
    });

    // Scoring function
    function scoreTask(task, pinList) {
        let score = 0;
        if (pinList.includes(task.id)) score += 1000; // pinned always first
        if (task.status === 'in-progress') score += 100; // active tasks next
        if (task.status === 'running') score += 80;
        if (task.day === 'Tue' || task.day === 'Wed') score += 50; // this week
        if (task.time && parseInt(task.time) <= 20) score += 30; // quick wins
        if (task.status === 'queued') score += 10;
        return score;
    }

    jasperAll.sort((a, b) => scoreTask(b, pins.jasper) - scoreTask(a, pins.jasper));
    aiAll.sort((a, b) => scoreTask(b, pins.ai) - scoreTask(a, pins.ai));

    return {
        jasper: jasperAll.slice(0, 5),
        ai: aiAll.slice(0, 5)
    };
}

function renderTodaysFocus() {
    const focus = computeTodaysFocus();
    const pins = SANO_DATA.focusPins || { jasper: [], ai: [] };

    // Date
    const dateEl = document.getElementById('focusDate');
    if (dateEl) {
        dateEl.textContent = new Date().toLocaleDateString('en-US', {
            weekday: 'short', month: 'short', day: 'numeric'
        });
    }

    // Jasper column
    const jasperEl = document.getElementById('focusJasper');
    if (jasperEl) {
        if (focus.jasper.length === 0) {
            jasperEl.innerHTML = '<div class="focus-complete">✅ All caught up!</div>';
        } else {
            const totalJ = SANO_DATA.jasperTasks.flatMap(s => s.items).length;
            const doneJ = SANO_DATA.jasperTasks.flatMap(s => s.items).filter(i => i.status === 'done').length;
            const pctJ = totalJ > 0 ? Math.round((doneJ / totalJ) * 100) : 0;

            const items = focus.jasper.map((item, idx) => {
                const isPinned = pins.jasper.includes(item.id);
                const tag = isPinned ? '<span class="focus-tag focus-tag-pinned">📌 PINNED</span>' :
                            item.status === 'in-progress' ? '<span class="focus-tag focus-tag-urgent">⏰ ACTIVE</span>' :
                            '<span class="focus-tag focus-tag-roi">💰 HIGH ROI</span>';
                const timeBadge = item.time ? `<span class="time-badge-sm">${item.time}</span>` : '';
                return `<div class="focus-item" onclick="cycleJasperTask(${item.si},${item.ii}); renderTodaysFocus();">
                    <span class="focus-num">${idx + 1}</span>
                    <div class="focus-checkbox"></div>
                    <span class="focus-text">${item.text}</span>
                    ${tag}
                    ${timeBadge}
                    <span class="focus-pin ${isPinned ? 'pinned' : ''}" onclick="event.stopPropagation(); toggleFocusPin('jasper','${item.id}')" title="Pin to focus">📌</span>
                </div>`;
            }).join('');

            jasperEl.innerHTML = items +
                `<div class="focus-progress">
                    <div class="focus-progress-bar"><div class="focus-progress-fill" style="width:${pctJ}%"></div></div>
                    <span class="focus-progress-text">${doneJ}/${totalJ} done</span>
                </div>`;
        }
    }

    // AI column
    const aiEl = document.getElementById('focusAI');
    if (aiEl) {
        if (focus.ai.length === 0) {
            aiEl.innerHTML = '<div class="focus-complete">✅ All caught up!</div>';
        } else {
            const totalA = SANO_DATA.aiTasks.flatMap(s => s.items).length;
            const doneA = SANO_DATA.aiTasks.flatMap(s => s.items).filter(i => i.status === 'done' || i.status === 'complete').length;
            const pctA = totalA > 0 ? Math.round((doneA / totalA) * 100) : 0;

            const items = focus.ai.map((item, idx) => {
                const isPinned = pins.ai.includes(item.id);
                const statusCls = item.status === 'running' ? 'focus-status-ready' :
                                  item.status === 'queued' ? 'focus-status-queued' : 'focus-status-queued';
                const statusText = item.status === 'running' ? 'RUNNING' :
                                   item.status === 'queued' ? 'QUEUED' :
                                   item.status === 'in-progress' ? 'ACTIVE' : 'READY';
                const tag = isPinned ? '<span class="focus-tag focus-tag-pinned">📌 PINNED</span>' :
                            '<span class="focus-tag focus-tag-unlock">🔑 AI TASK</span>';
                const agentLabel = item.agent ? `<span class="agent-badge" style="font-size:0.45rem">${item.agent}</span>` : '';
                return `<div class="focus-item">
                    <span class="focus-num">${idx + 1}</span>
                    <span class="focus-status ${statusCls}">${statusText}</span>
                    <span class="focus-text">${item.text}</span>
                    ${tag}
                    ${agentLabel}
                    <span class="focus-pin ${isPinned ? 'pinned' : ''}" onclick="event.stopPropagation(); toggleFocusPin('ai','${item.id}')" title="Pin to focus">📌</span>
                </div>`;
            }).join('');

            aiEl.innerHTML = items +
                `<div class="focus-progress">
                    <div class="focus-progress-bar"><div class="focus-progress-fill" style="width:${pctA}%"></div></div>
                    <span class="focus-progress-text">${doneA}/${totalA} done</span>
                </div>`;
        }
    }

    // Check if all focus items are done
    const allDone = focus.jasper.length === 0 && focus.ai.length === 0;
    const completeEl = document.getElementById('focusComplete');
    const columnsEl = document.querySelector('.focus-columns');
    if (completeEl && columnsEl) {
        completeEl.style.display = allDone ? 'block' : 'none';
        columnsEl.style.display = allDone ? 'none' : '';
    }
}

function toggleFocusPin(type, id) {
    const pins = SANO_DATA.focusPins[type];
    const idx = pins.indexOf(id);
    if (idx >= 0) {
        pins.splice(idx, 1);
    } else {
        pins.push(id);
    }
    renderTodaysFocus();
    saveData();
    showToast(`Focus pin ${idx >= 0 ? 'removed' : 'added'}`);
}

/* ============================================
   v9: MOMENTUM & STREAK TRACKER
   ============================================ */
function renderMomentum() {
    // Day count
    const start = new Date(SANO_DATA.projectStartDate || '2026-04-04');
    const now = new Date();
    const dayNum = Math.floor((now - start) / 86400000) + 1;
    setText('dayCount', `DAY ${dayNum}`);

    // Tasks shipped (completed count)
    const shipped = SANO_DATA.completed.length;
    setText('tasksShipped', `${shipped} shipped`);

    // Streak calculation
    const streak = calculateStreak();
    setText('streakLabel', `${streak}-day streak`);

    const streakBadge = document.getElementById('streakBadge');
    if (streakBadge) {
        streakBadge.textContent = `🔥 ${streak}`;
        streakBadge.style.display = streak > 0 ? '' : 'none';
    }
}

function calculateStreak() {
    // Simple streak: count how many consecutive days (from today backwards)
    // have at least one completion in the burndown log (remaining decreased)
    const log = SANO_DATA.burndown?.log || [];
    if (log.length < 2) return 0;

    let streak = 0;
    const freezesPerWeek = SANO_DATA.streakConfig?.freezesPerWeek || 2;
    let freezesUsed = 0;

    for (let i = log.length - 1; i > 0; i--) {
        const progress = log[i - 1].remaining - log[i].remaining;
        if (progress > 0) {
            streak++;
            freezesUsed = 0; // reset freeze counter on active day
        } else {
            // No progress — use a freeze
            freezesUsed++;
            if (freezesUsed <= freezesPerWeek) {
                streak++; // freeze day, streak continues
            } else {
                break; // streak broken
            }
        }
    }
    return streak;
}

/* ============================================
   v9: AGENT STATUS DOTS (Hero Row)
   ============================================ */
function renderAgentDots() {
    const container = document.getElementById('agentDots');
    if (!container) return;

    const agents = SANO_DATA.agentRegistry || [];
    const reports = SANO_DATA.agentReports || [];

    container.innerHTML = agents.map(agent => {
        // Find latest report for this agent
        const lastReport = reports.find(r =>
            r.agent?.toLowerCase().includes(agent.id.toLowerCase()) ||
            r.agent?.toLowerCase().includes(agent.name.toLowerCase())
        );
        
        let status = 'offline';
        let timeAgo = '';
        if (lastReport) {
            // Check if agent was active recently (within this session)
            const reportTime = lastReport.time || '';
            if (reportTime.includes('2026-04-15')) {
                status = reportTime.includes('14:') || reportTime.includes('15:') ? 'active' : 'idle';
            } else {
                status = 'idle';
            }
            timeAgo = reportTime.split(' ')[1] || '';
        }

        const dotCls = status === 'active' ? 'dot-active' : status === 'idle' ? 'dot-idle' : 'dot-offline';
        const label = agent.name.substring(0, 3).toUpperCase();

        return `<div class="hc-agent-dot">
            <span class="dot ${dotCls}"></span>
            <span>${label}</span>
        </div>`;
    }).join('');
}

/* ============================================
   v9: AGENT STATUS BOARD (Full Cards)
   ============================================ */
function renderAgentStatusBoard() {
    const container = document.getElementById('agentStatusBoard');
    if (!container) return;

    const agents = SANO_DATA.agentRegistry || [];
    const reports = SANO_DATA.agentReports || [];
    const spend = SANO_DATA.agentSpend || {};

    container.innerHTML = agents.map(agent => {
        const lastReport = reports.find(r =>
            r.agent?.toLowerCase().includes(agent.name.toLowerCase())
        );

        let status = 'offline';
        let statusLabel = 'Not Deployed';
        let cardClass = '';
        let lastAction = '—';
        let lastTime = '—';
        let taskCount = 0;
        let todayCost = '$0.00';

        if (lastReport) {
            const reportDate = lastReport.time || '';
            if (reportDate.includes('2026-04-15')) {
                status = 'active';
                statusLabel = '🟢 Active';
                cardClass = 'agent-active';
            } else {
                status = 'idle';
                statusLabel = '💤 Idle';
                cardClass = 'agent-idle';
            }
            lastAction = lastReport.summary || lastReport.items?.[0] || '—';
            if (lastAction.length > 60) lastAction = lastAction.substring(0, 57) + '...';
            lastTime = lastReport.time || '—';
            taskCount = lastReport.items?.length || 0;
        }

        // Get cost from agentSpend history
        const history = spend.history || [];
        const todayEntry = history.find(h => h.date === 'Apr 15');
        if (todayEntry) {
            const agentCost = todayEntry.agents?.find(a =>
                a.name?.toLowerCase().includes(agent.name.toLowerCase())
            );
            if (agentCost) todayCost = agentCost.cost || '$0.00';
        }

        const statusCls = status === 'active' ? 'agent-status-active' :
                          status === 'idle' ? 'agent-status-idle' : 'agent-status-offline';

        return `<div class="agent-card ${cardClass}">
            <div class="agent-card-header">
                <span class="agent-card-icon">${agent.icon}</span>
                <span class="agent-card-name">${agent.name}</span>
                <span class="agent-card-status ${statusCls}">${statusLabel}</span>
            </div>
            <div class="agent-card-role">${agent.role}</div>
            <div class="agent-card-stats">
                <span>Tasks: <strong>${taskCount}</strong></span>
                <span>Cost today: <strong>${todayCost}</strong></span>
            </div>
            <div class="agent-card-last">${lastAction}</div>
        </div>`;
    }).join('');
}

/* ============================================
   v9: COMMAND PALETTE (Cmd+K)
   ============================================ */
let cmdkActiveIndex = 0;
let cmdkResults = [];

function openCommandPalette() {
    const overlay = document.getElementById('cmdkOverlay');
    if (!overlay) return;
    overlay.classList.add('open');
    const input = document.getElementById('cmdkInput');
    if (input) {
        input.value = '';
        input.focus();
        renderCommandResults('');
    }
}

function closeCommandPalette() {
    const overlay = document.getElementById('cmdkOverlay');
    if (overlay) overlay.classList.remove('open');
}

function buildCommandList() {
    const commands = [];

    // Navigation
    commands.push({ icon: '📋', text: 'Go to Work', action: () => switchTab('work'), group: 'Navigate', shortcut: '1' });
    commands.push({ icon: '📊', text: 'Go to Activity', action: () => switchTab('activity'), group: 'Navigate', shortcut: '2' });
    commands.push({ icon: '🚀', text: 'Go to Launch Plan', action: () => switchTab('launch'), group: 'Navigate', shortcut: '3' });
    commands.push({ icon: '📚', text: 'Go to Reference', action: () => switchTab('reference'), group: 'Navigate', shortcut: '4' });

    // Actions
    commands.push({ icon: '↻', text: 'Refresh Dashboard', action: () => refreshDashboard(), group: 'Actions', shortcut: 'R' });
    commands.push({ icon: '📝', text: 'Add a Note', action: () => { closeCommandPalette(); openComment('general', 'Quick Note'); }, group: 'Actions' });
    commands.push({ icon: '?', text: 'Keyboard Shortcuts', action: () => { closeCommandPalette(); document.getElementById('shortcutsOverlay').style.display = 'grid'; }, group: 'Actions', shortcut: '?' });

    // Jasper Tasks (searchable)
    SANO_DATA.jasperTasks.forEach((section, si) => {
        section.items.forEach((item, ii) => {
            if (item.status !== 'done') {
                commands.push({
                    icon: '☐', text: `Complete: ${item.text}`,
                    action: () => { cycleJasperTask(si, ii); renderTodaysFocus(); closeCommandPalette(); showToast('Task updated'); },
                    group: 'Tasks'
                });
            }
        });
    });

    // Decisions (searchable)
    SANO_DATA.decisions.forEach(d => {
        commands.push({ icon: '📓', text: d.decision, action: () => { switchTab('activity'); closeCommandPalette(); }, group: 'Decisions' });
    });

    return commands;
}

function renderCommandResults(query) {
    const container = document.getElementById('cmdkResults');
    if (!container) return;

    const allCommands = buildCommandList();
    const q = query.toLowerCase().trim();

    cmdkResults = q
        ? allCommands.filter(c => c.text.toLowerCase().includes(q) || c.group.toLowerCase().includes(q))
        : allCommands.slice(0, 12); // show top 12 when empty

    cmdkActiveIndex = 0;

    if (cmdkResults.length === 0) {
        container.innerHTML = '<div class="cmdk-empty">No results found</div>';
        return;
    }

    // Group results
    let html = '';
    let lastGroup = '';
    cmdkResults.forEach((r, i) => {
        if (r.group !== lastGroup) {
            html += `<div class="cmdk-result-group">${r.group}</div>`;
            lastGroup = r.group;
        }
        const shortcut = r.shortcut ? `<span class="cmdk-result-shortcut">${r.shortcut}</span>` : '';
        html += `<div class="cmdk-result ${i === 0 ? 'active' : ''}" data-idx="${i}"
                     onclick="executeCmdkResult(${i})"
                     onmouseenter="setCmdkActive(${i})">
            <span class="cmdk-result-icon">${r.icon}</span>
            <span class="cmdk-result-text">${r.text}</span>
            ${shortcut}
        </div>`;
    });
    container.innerHTML = html;
}

function setCmdkActive(idx) {
    cmdkActiveIndex = idx;
    document.querySelectorAll('.cmdk-result').forEach((el, i) => {
        el.classList.toggle('active', parseInt(el.dataset.idx) === idx);
    });
}

function executeCmdkResult(idx) {
    const result = cmdkResults[idx];
    if (result && result.action) {
        result.action();
        closeCommandPalette();
    }
}

/* ============================================
   v9: KEYBOARD SHORTCUTS
   ============================================ */
function initKeyboardShortcuts() {
    document.addEventListener('keydown', e => {
        // Don't capture when typing in input/textarea
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            // Handle Cmd+K even in inputs
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                openCommandPalette();
            }
            // Handle Escape in command palette input
            if (e.key === 'Escape') {
                closeCommandPalette();
                document.getElementById('shortcutsOverlay').style.display = 'none';
            }
            // Handle arrow keys in command palette
            if (document.getElementById('cmdkOverlay')?.classList.contains('open')) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setCmdkActive(Math.min(cmdkActiveIndex + 1, cmdkResults.length - 1));
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setCmdkActive(Math.max(cmdkActiveIndex - 1, 0));
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    executeCmdkResult(cmdkActiveIndex);
                }
            }
            return;
        }

        // Cmd+K / Ctrl+K
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            openCommandPalette();
            return;
        }

        // Tab shortcuts
        if (e.key === '1') switchTab('work');
        if (e.key === '2') switchTab('activity');
        if (e.key === '3') switchTab('launch');
        if (e.key === '4') switchTab('reference');
        if (e.key === 'r' || e.key === 'R') refreshDashboard();
        if (e.key === '?') document.getElementById('shortcutsOverlay').style.display = 'grid';
        if (e.key === 'Escape') {
            closeCommandPalette();
            document.getElementById('shortcutsOverlay').style.display = 'none';
        }
    });

    // Command palette input listener
    const cmdkInput = document.getElementById('cmdkInput');
    if (cmdkInput) {
        cmdkInput.addEventListener('input', e => {
            renderCommandResults(e.target.value);
        });
    }
}



