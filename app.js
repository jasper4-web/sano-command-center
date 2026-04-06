/* ============================================
   SANO COMMAND CENTER — Application Logic v2.0
   Features: Comments, Active Approvals, Export,
   Persistence, Week Timeline
   ============================================ */

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
    const todayEl = document.getElementById('todayDate');
    if (dateEl) dateEl.textContent = now.toLocaleDateString('en-US', {
        weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    });
    if (todayEl) todayEl.textContent = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/* --- Countdown --- */
function initCountdown() { updateCountdown(); }

function updateCountdown() {
    const diff = SANO_DATA.launchDate - new Date();
    if (diff <= 0) {
        document.getElementById('countDays').textContent = '🚀';
        document.getElementById('countHours').textContent = 'LIVE';
        document.getElementById('countMins').textContent = '!';
        return;
    }
    const d = Math.floor(diff / 864e5);
    const h = Math.floor((diff % 864e5) / 36e5);
    const m = Math.floor((diff % 36e5) / 6e4);
    setText('countDays', String(d).padStart(2, '0'));
    setText('countHours', String(h).padStart(2, '0'));
    setText('countMins', String(m).padStart(2, '0'));
}

/* --- Week Timeline --- */
function renderWeekTimeline() {
    const container = document.getElementById('weekTimeline');
    if (!container) return;
    container.innerHTML = SANO_DATA.weeks.map((w, i) => `
        <div class="week-block ${w.status}" title="${w.theme}" onclick="scrollToWeek(${i})" style="cursor:pointer">
            <span class="week-num">W${w.num}</span>
            <span class="week-name">${w.name}</span>
            <span class="week-dates">${w.dates}</span>
        </div>
    `).join('');
}

function scrollToWeek(weekIndex) {
    // Scroll to the checklist section and highlight the matching week
    const checklistCard = document.querySelector('.card-checklist');
    if (checklistCard) {
        checklistCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Open the relevant checklist section if it maps to one
        const sections = document.querySelectorAll('.checklist-items');
        // Try to find a section by its week range
        setTimeout(() => {
            const sectionEl = document.getElementById(`checklist-${Math.min(weekIndex, sections.length - 1)}`);
            if (sectionEl && !sectionEl.classList.contains('open')) {
                sectionEl.classList.add('open');
            }
        }, 500);
    }
}

/* --- Priorities --- */
function renderPriorities() {
    const container = document.getElementById('priorityList');
    if (!container) return;
    container.innerHTML = SANO_DATA.priorities.map((p, i) => {
        const cls = p.done ? 'priority-done' : `priority-${p.priority}`;
        const tag = p.done ? '✓ DONE' : p.priority.toUpperCase();
        const tagCls = p.done ? '' : `tag-${p.priority}`;
        return `
            <div class="priority-item ${cls}" id="priority-${i}">
                <div class="priority-checkbox" onclick="togglePriority(${i})"></div>
                <span class="priority-text">${p.text}</span>
                <button class="comment-btn-sm" onclick="openComment('priority', '${p.text}')" title="Add comment">💬</button>
                <span class="priority-tag ${tagCls}">${tag}</span>
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

/* --- Agent Feed --- */
function renderAgentFeed() {
    const container = document.getElementById('agentFeed');
    if (!container) return;
    if (!SANO_DATA.agentReports.length) {
        container.innerHTML = '<div class="empty-state"><span class="empty-icon">🌙</span>No agent activity yet.</div>';
        return;
    }
    container.innerHTML = SANO_DATA.agentReports.map(r => {
        const statusCls = r.status === 'complete' ? 'status-complete' :
                          r.status === 'running' ? 'status-running' : 'status-failed';
        const statusIcon = r.status === 'complete' ? '✅' :
                           r.status === 'running' ? '🔄' : '❌';
        return `
        <div class="agent-report">
            <div class="agent-report-header">
                <span class="agent-name">${r.agent} <span class="agent-status ${statusCls}">${statusIcon}</span></span>
                <span class="agent-time">${r.time}</span>
            </div>
            <div class="agent-message">${r.message}</div>
            ${r.file ? `<a class="agent-file-link" href="#">📄 ${r.file}</a>` : ''}
            <button class="comment-btn-sm" onclick="openComment('agent-report', '${r.agent} report')" title="Leave feedback">💬 Comment</button>
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
            const icon = item.status === 'done' ? '✅' : item.status === 'in-progress' ? '🔄' : '⬜';
            const cls = item.status === 'done' ? 'done' : '';
            return `<div class="checklist-item ${cls}" onclick="cycleStatus(${si},${ii})">
                <span class="check-icon">${icon}</span>
                <span>${item.text}</span>
                <button class="comment-btn-sm" onclick="event.stopPropagation(); openComment('task', '${item.text.replace(/'/g, "\\'")}')" title="Comment">💬</button>
            </div>`;
        }).join('');
        return `
            <div class="checklist-section">
                <div class="checklist-section-header" onclick="toggleChecklist(${si})">
                    <div style="display:flex;align-items:center;gap:8px">
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

function toggleChecklist(i) {
    document.getElementById(`checklist-${i}`)?.classList.toggle('open');
}

function cycleStatus(si, ii) {
    const item = SANO_DATA.checklist[si].items[ii];
    const order = ['not-started', 'in-progress', 'done'];
    const next = order[(order.indexOf(item.status) + 1) % 3];
    item.status = next;
    renderChecklist();
    updateProgressStats();
    saveData();
}

/* --- Approvals (ACTIVE) --- */
function renderApprovals() {
    const container = document.getElementById('approvalList');
    const countEl = document.getElementById('approvalCount');
    if (!container) return;
    if (countEl) countEl.textContent = SANO_DATA.approvals.length;
    if (!SANO_DATA.approvals.length) {
        container.innerHTML = '<div class="empty-state"><span class="empty-icon">✨</span>All caught up!</div>';
        return;
    }
    container.innerHTML = SANO_DATA.approvals.map((a, i) => `
        <div class="approval-item" id="approval-${i}">
            <div class="approval-title">${a.title}</div>
            <div class="approval-desc">${a.description}</div>
            <div class="approval-actions">
                <button class="btn btn-approve" onclick="handleApproval(${i}, 'approved')">✓ Approve</button>
                <button class="btn btn-review" onclick="openComment('approval', '${a.title.replace(/'/g, "\\'")}')">💬 Comment</button>
                <button class="btn btn-reject" onclick="handleApproval(${i}, 'rejected')">✕ Reject</button>
            </div>
        </div>`).join('');
}

function handleApproval(index, decision) {
    const item = SANO_DATA.approvals[index];
    const el = document.getElementById(`approval-${index}`);

    // Record the decision
    const record = {
        title: item.title,
        decision: decision,
        timestamp: new Date().toISOString(),
        file: item.file
    };

    // Save to comments as a decision record
    SANO_DATA.comments.push({
        id: `decision-${Date.now()}`,
        target: item.title,
        text: `CEO Decision: ${decision.toUpperCase()}`,
        timestamp: new Date().toLocaleString(),
        type: 'decision'
    });

    // Visual feedback
    if (el) {
        el.style.borderLeftColor = decision === 'approved' ? 'var(--accent-green)' : 'var(--accent-red)';
        el.style.opacity = '0.4';
        el.querySelector('.approval-title').textContent += ` — ${decision.toUpperCase()}`;
    }

    setTimeout(() => {
        SANO_DATA.approvals.splice(index, 1);
        renderApprovals();
        renderComments();
        saveData();
    }, 800);
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

    // Keyboard support
    const keyHandler = function(e) {
        if (e.key === 'Escape') {
            closeComment();
            document.removeEventListener('keydown', keyHandler);
        }
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
            submitComment();
            document.removeEventListener('keydown', keyHandler);
        }
    };
    document.addEventListener('keydown', keyHandler);
}

function closeComment() {
    document.getElementById('commentModal')?.classList.remove('open');
}

function submitComment() {
    const modal = document.getElementById('commentModal');
    const input = document.getElementById('commentInput');
    if (!input.value.trim()) return;

    const comment = {
        id: `comment-${Date.now()}`,
        target: modal.dataset.target,
        type: modal.dataset.type,
        text: input.value.trim(),
        timestamp: new Date().toLocaleString(),
    };

    SANO_DATA.comments.unshift(comment);
    closeComment();
    renderComments();
    saveData();

    // Show confirmation
    showToast(`Comment saved on "${modal.dataset.target}"`);
}

function renderComments() {
    const container = document.getElementById('commentFeed');
    const countEl = document.getElementById('commentCount');
    if (!container) return;
    if (countEl) countEl.textContent = SANO_DATA.comments.length;

    if (!SANO_DATA.comments.length) {
        container.innerHTML = '<div class="empty-state"><span class="empty-icon">📝</span>No comments yet. Click 💬 on any item to leave a note.</div>';
        return;
    }

    container.innerHTML = SANO_DATA.comments.slice(0, 20).map(c => {
        const icon = c.type === 'decision' ? '⚖️' : '💬';
        const cls = c.type === 'decision' ? 'comment-decision' : '';
        return `
        <div class="comment-item ${cls}">
            <div class="comment-header">
                <span>${icon} <strong>${c.target}</strong></span>
                <span class="comment-time">${c.timestamp}</span>
            </div>
            <div class="comment-text">${c.text}</div>
        </div>`;
    }).join('');
}

function copyAllComments() {
    const text = exportComments();
    navigator.clipboard.writeText(text).then(() => {
        showToast('Comments copied to clipboard!');
    }).catch(() => {
        // Fallback
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast('Comments copied!');
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
    }, 300);
}

/* --- Budget Tracker --- */
function renderBudget() {
    const budget = SANO_DATA.budget;
    if (!budget) return;

    const spent = budget.expenses
        .filter(e => e.status === 'paid')
        .reduce((sum, e) => sum + e.amount, 0);

    const projected = budget.expenses
        .filter(e => e.status === 'pending')
        .reduce((sum, e) => sum + e.amount, 0);

    const remaining = budget.starting - spent;
    const pctRemaining = Math.round((remaining / budget.starting) * 100);

    // Update display
    const amountEl = document.getElementById('budgetRemaining');
    if (amountEl) {
        amountEl.textContent = `$${remaining.toLocaleString()}`;
        amountEl.className = 'budget-amount';
        if (pctRemaining < 25) amountEl.classList.add('danger');
        else if (pctRemaining < 50) amountEl.classList.add('caution');
    }

    setText('budgetSpent', `$${spent.toLocaleString()}`);
    setText('budgetProjected', `$${projected.toLocaleString()}`);

    setTimeout(() => {
        const bar = document.getElementById('budgetBar');
        if (bar) bar.style.width = `${pctRemaining}%`;
    }, 300);
}

/* --- Toast Notifications --- */
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

/* --- Utility --- */
function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
}

function refreshDashboard() { location.reload(); }

function toggleSection(section) {
    // Scroll to and highlight the relevant section
    const sectionMap = {
        'agents': '.card-agents',
        'checklist': '.card-checklist',
        'approvals': '.card-approvals',
        'comments': '.card-comments'
    };
    const target = document.querySelector(sectionMap[section]);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.classList.add('section-highlight');
        setTimeout(() => target.classList.remove('section-highlight'), 2000);
    }
}

// Clear stale QA data on first load if needed
function resetToDefaultData() {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
}
