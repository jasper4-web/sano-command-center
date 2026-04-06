/* ============================================
   SANO COMMAND CENTER — v5.0
   Mission Control Logic
   ============================================ */

const DATA_VERSION = '2026-04-06-v5';

document.addEventListener('DOMContentLoaded', () => {
    loadSavedData();
    initClock();
    initCountdown();
    renderWeekTimeline();
    renderPriorities();
    renderAgentFeed();
    renderChecklist();
    renderApprovals();
    renderComments();
    renderBudget();
    updateProgressStats();

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
    const diff = SANO_DATA.launchDate - new Date();
    if (diff <= 0) {
        setText('countDays', '00');
        setText('countHours', '00');
        setText('countMins', '00');
        return;
    }
    const d = Math.floor(diff / 864e5);
    const h = Math.floor((diff % 864e5) / 36e5);
    const m = Math.floor((diff % 36e5) / 6e4);
    setText('countDays', String(d).padStart(2, '0'));
    setText('countHours', String(h).padStart(2, '0'));
    setText('countMins', String(m).padStart(2, '0'));

    // Update current week label
    const activeWeek = SANO_DATA.weeks.find(w => w.status === 'active');
    if (activeWeek) {
        setText('currentWeekLabel', `W${activeWeek.num} — ${activeWeek.name}`);
    }
}

/* --- Week Timeline --- */
function renderWeekTimeline() {
    const container = document.getElementById('weekTimeline');
    if (!container) return;
    container.innerHTML = SANO_DATA.weeks.map((w, i) => `
        <div class="week-block ${w.status}" title="${w.theme}" onclick="scrollToSection('sectionChecklist')" style="cursor:pointer">
            <span class="week-num">W${w.num}</span>
            <span class="week-name">${w.name}</span>
            <span class="week-dates">${w.dates}</span>
        </div>
    `).join('');
}

/* --- Priorities --- */
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

    const timeHeader = document.getElementById('priorityTimeEstimate');
    if (timeHeader) timeHeader.textContent = activePriorities.length > 0 ? timeStr : 'Clear';

    const updatedEl = document.getElementById('priorityUpdated');
    if (updatedEl && SANO_DATA.prioritiesLastUpdated) {
        const d = new Date(SANO_DATA.prioritiesLastUpdated);
        updatedEl.textContent = `Updated ${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} ${d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
    }

    container.innerHTML = SANO_DATA.priorities.map((p, i) => {
        const cls = p.done ? 'priority-done' : `priority-${p.priority}`;
        const tag = p.done ? 'DONE' : p.priority.toUpperCase();
        const tagCls = p.done ? '' : `tag-${p.priority}`;
        const hasSteps = p.steps && p.steps.length > 0;
        const timeTag = !p.done && p.timeEstimate ? `<span class="priority-time">${p.timeEstimate}</span>` : '';

        const stepsHtml = hasSteps ? `
            <div class="priority-steps" id="steps-${i}">
                <div class="steps-inner">
                    ${p.steps.map((step, si) => `
                        <div class="step-item ${p.done ? 'step-done' : ''}">
                            <span class="step-num">${p.done ? '✓' : (si + 1)}</span>
                            <span class="step-text">${step}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : '';

        return `
            <div class="priority-item ${cls}" id="priority-${i}">
                <div class="priority-row" onclick="expandPriority(${i})">
                    <div class="priority-checkbox" onclick="event.stopPropagation(); togglePriority(${i})"></div>
                    <span class="priority-text">${p.text}</span>
                    ${timeTag}
                    <button class="comment-btn-sm" onclick="event.stopPropagation(); openComment('priority', '${p.text.replace(/'/g, "\\'")}')" title="Add note">···</button>
                    <span class="priority-tag ${tagCls}">${tag}</span>
                    ${hasSteps && !p.done ? '<span class="priority-expand">▸</span>' : ''}
                </div>
                ${stepsHtml}
            </div>`;
    }).join('');
}

function togglePriority(i) {
    SANO_DATA.priorities[i].done = !SANO_DATA.priorities[i].done;
    if (SANO_DATA.priorities[i].done) SANO_DATA.priorities[i].priority = 'done';
    renderPriorities();
    updateProgressStats();
    saveData();
}

function expandPriority(i) {
    const p = SANO_DATA.priorities[i];
    if (p.done || !p.steps || p.steps.length === 0) return;
    const el = document.getElementById(`steps-${i}`);
    if (!el) return;
    document.querySelectorAll('.priority-steps.open').forEach(s => { if (s !== el) s.classList.remove('open'); });
    document.querySelectorAll('.priority-expand.rotated').forEach(e => e.classList.remove('rotated'));
    el.classList.toggle('open');
    const expandIcon = el.closest('.priority-item')?.querySelector('.priority-expand');
    if (expandIcon) expandIcon.classList.toggle('rotated');
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
                           r.status === 'running' ? '•••' : '✗';
        return `
        <div class="agent-report">
            <div class="agent-report-header">
                <span class="agent-name">${r.agent} <span class="agent-status ${statusCls}">${statusIcon}</span></span>
                <span class="agent-time">${r.time}</span>
            </div>
            <div class="agent-message">${r.message}</div>
            ${r.file ? `<span class="agent-file-link">${r.file}</span>` : ''}
            <button class="comment-btn-sm" onclick="openComment('agent-report', '${r.agent} report')" title="Leave feedback">···</button>
        </div>`;
    }).join('');
}

/* --- Checklist --- */
function renderChecklist() {
    const container = document.getElementById('checklistSections');
    if (!container) return;
    container.innerHTML = SANO_DATA.checklist.map((section, si) => {
        const total = section.items.length;
        const done = section.items.filter(i => i.status === 'done').length;
        const pct = total > 0 ? Math.round((done / total) * 100) : 0;
        const items = section.items.map((item, ii) => {
            const icon = item.status === 'done' ? '✓' : item.status === 'in-progress' ? '•' : '‒';
            const cls = item.status === 'done' ? 'done' : '';
            return `<div class="checklist-item ${cls}" onclick="cycleStatus(${si},${ii})">
                <span class="check-icon">${icon}</span>
                <span>${item.text}</span>
                <button class="comment-btn-sm" onclick="event.stopPropagation(); openComment('task', '${item.text.replace(/'/g, "\\'")}')" title="Comment">···</button>
            </div>`;
        }).join('');
        return `
            <div class="checklist-section">
                <div class="checklist-section-header" onclick="toggleChecklist(${si})">
                    <div style="display:flex;align-items:center;gap:6px">
                        <span class="checklist-section-title">${section.section}</span>
                        <span class="week-tag">${section.week}</span>
                    </div>
                    <div class="checklist-section-progress">
                        <div class="mini-progress-bar"><div class="mini-progress-fill" style="width:${pct}%"></div></div>
                        <span class="checklist-section-percent">${pct}%</span>
                    </div>
                </div>
                <div class="checklist-items" id="checklist-${si}">${items}</div>
            </div>`;
    }).join('');
}

function toggleChecklist(i) { document.getElementById(`checklist-${i}`)?.classList.toggle('open'); }

function cycleStatus(si, ii) {
    const item = SANO_DATA.checklist[si].items[ii];
    const order = ['not-started', 'in-progress', 'done'];
    item.status = order[(order.indexOf(item.status) + 1) % 3];
    renderChecklist();
    updateProgressStats();
    saveData();
}

/* --- Approvals --- */
function renderApprovals() {
    const container = document.getElementById('approvalList');
    const countEl = document.getElementById('approvalCount');
    if (!container) return;
    if (countEl) countEl.textContent = SANO_DATA.approvals.length;
    if (!SANO_DATA.approvals.length) {
        container.innerHTML = '<div class="empty-state">All caught up.</div>';
        return;
    }
    container.innerHTML = SANO_DATA.approvals.map((a, i) => `
        <div class="approval-item" id="approval-${i}">
            <div class="approval-title">${a.title}</div>
            <div class="approval-desc">${a.description}</div>
            <div class="approval-actions">
                <button class="btn-approve" onclick="handleApproval(${i}, 'approved')">Approve</button>
                <button class="btn-review" onclick="openComment('approval', '${a.title.replace(/'/g, "\\'")}')">Comment</button>
                <button class="btn-reject" onclick="handleApproval(${i}, 'rejected')">Reject</button>
            </div>
        </div>`).join('');
}

function handleApproval(index, decision) {
    const item = SANO_DATA.approvals[index];
    const el = document.getElementById(`approval-${index}`);
    SANO_DATA.comments.push({
        id: `decision-${Date.now()}`,
        target: item.title,
        text: `CEO Decision: ${decision.toUpperCase()}`,
        timestamp: new Date().toLocaleString(),
        type: 'decision'
    });
    if (el) { el.style.opacity = '0.3'; }
    setTimeout(() => {
        SANO_DATA.approvals.splice(index, 1);
        renderApprovals();
        renderComments();
        saveData();
    }, 600);
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

/* --- Progress Stats --- */
function updateProgressStats() {
    const allItems = SANO_DATA.checklist.flatMap(s => s.items);
    const total = allItems.length;
    const done = allItems.filter(i => i.status === 'done').length;
    const inProgress = allItems.filter(i => i.status === 'in-progress').length;
    const remaining = total - done - inProgress;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;

    setText('overallPercent', `${pct}%`);
    setText('completedTasks', done);
    setText('inProgressTasks', inProgress);
    setText('remainingTasks', remaining);
    setTimeout(() => {
        const bar = document.getElementById('overallBar');
        if (bar) bar.style.width = `${pct}%`;
    }, 200);
}

/* --- Budget Tracker (Redesigned) --- */
function renderBudget() {
    const budget = SANO_DATA.budget;
    if (!budget) return;

    const spent = budget.expenses
        .filter(e => e.status === 'paid')
        .reduce((sum, e) => sum + e.amount, 0);

    const projected = budget.expenses
        .reduce((sum, e) => sum + e.amount, 0);

    const remaining = budget.starting - spent;
    const pctRemaining = Math.round((remaining / budget.starting) * 100);

    // Burn rate: projected total / 8 weeks
    const burnRate = Math.round(projected / 8);
    // Runway: remaining / weekly burn rate
    const runwayWeeks = burnRate > 0 ? Math.round(remaining / burnRate) : 0;

    // Display
    const amountEl = document.getElementById('budgetRemaining');
    if (amountEl) {
        amountEl.textContent = `$${remaining.toLocaleString()}`;
        amountEl.className = 'health-value budget-remaining-val';
        if (pctRemaining < 25) amountEl.classList.add('danger');
        else if (pctRemaining < 50) amountEl.classList.add('caution');
    }

    // Bar color
    const barEl = document.getElementById('budgetBar');
    if (barEl) {
        barEl.className = 'health-bar-fill budget-bar-fill';
        if (pctRemaining < 25) barEl.classList.add('danger');
        else if (pctRemaining < 50) barEl.classList.add('caution');
        setTimeout(() => { barEl.style.width = `${pctRemaining}%`; }, 200);
    }

    setText('budgetSpent', `$${spent.toLocaleString()}`);
    setText('budgetProjected', `$${projected.toLocaleString()}`);
    setText('budgetBurn', `$${burnRate.toLocaleString()}/wk`);
    setText('budgetRunway', runwayWeeks > 0 ? `${runwayWeeks} wks` : '—');
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

function exportComments() {
    if (!SANO_DATA.comments || !SANO_DATA.comments.length) return 'No notes yet.';
    return SANO_DATA.comments.map(c => {
        const prefix = c.type === 'decision' ? 'DECISION' : 'NOTE';
        return `${prefix} | ${c.target}\n${c.text}\n(${c.timestamp})\n`;
    }).join('\n---\n\n');
}
