/* ============================================
   SANO COMMAND CENTER — Data Layer v9.0
   SOURCE OF TRUTH: brain/v2/BOOT.md + TASKS.jsonl + brain/STATE_SYNC.md
   Updated: April 24, 2026
   Architecture: AI-First (75-80% automation)
   MAJOR D-0039 RENAME: SANO Solutions → SANO Systems LLC (TX filing submitted)
   ============================================ */

const SANO_DATA = {

    // ---- Launch Date ----
    launchDate: new Date('2026-06-01T08:00:00-05:00'),
    projectStartDate: '2026-04-04',

    // ---- Agent Registry ----
    agentRegistry: [
        { id: 'antigravity', name: 'Antigravity', role: 'Co-founder AI (strategy, code, ops)', icon: '🧠' },
        { id: 'openclaw', name: 'OpenClaw', role: 'Builder agent (drafts, research, content)', icon: '🐙' },
        { id: 'sentinel', name: 'Sentinel', role: 'Monitor agent (QA, alerts, compliance)', icon: '🛡️' },
    ],

    // ---- Streak Config ----
    streakConfig: {
        freezesPerWeek: 2,  // 2 days/week you can skip without breaking streak
        freezesUsedThisWeek: 0,
        weekStartsOn: 'monday',
    },

    // ---- Today's Focus Pins (manual overrides) ----
    focusPins: {
        jasper: [],  // array of task IDs manually pinned to focus
        ai: [],      // array of task IDs manually pinned to focus
    },

    // ---- Financial Dashboard ----
    budget: {
        starting: 18912,
        monthlyBurn: {
            preChris: 552,
            withChris: 5352,
        },
        runway: {
            preChris: '33+ months',
            withChris: '3.5 months',
        },
        breakEven: '2 Starter clients ($397 × 2 = $794 > $572 burn)',
        expenses: [
            // Already paid
            { id: 'exp-1', item: 'LLC Filing — Texas SOS (SANO Systems LLC, Document #1580642670002)', amount: 308, status: 'paid', week: 0, category: 'legal', note: '$300 filing + $8.10 conv fee. Filed 2026-04-24. Awaiting approval 1-3 biz days.' },
            { id: 'exp-1b', item: 'Registered Agent — Northwest (Texas, 1-yr through 2027-04-22)', amount: 125, status: 'paid', week: 0, category: 'legal', note: 'Invoice WD6F8BWZ, paid 2026-04-22' },
            { id: 'exp-2', item: 'Domain (sanosolutions.ai — retired per D-0039)', amount: 15, status: 'paid', week: 0, category: 'infra', note: 'Will not renew; sanosystems.com TBD' },
            { id: 'exp-3', item: 'Cold email domains (4)', amount: 13, status: 'paid', week: 0, category: 'outreach' },
            { id: 'exp-4', item: 'Instantly.ai (Month 1)', amount: 47, status: 'paid', week: 0, category: 'outreach' },
            { id: 'exp-5', item: 'Google Workspace (4 inboxes)', amount: 30, status: 'paid', week: 0, category: 'outreach' },
            { id: 'exp-6', item: 'Agent API costs (testing)', amount: 5, status: 'paid', week: 0, category: 'agents' },
            // New pending per legal entity path
            { id: 'exp-6b', item: 'Domain — sanosystems.com (pending purchase)', amount: 15, status: 'pending', week: 0, category: 'infra', note: 'Cloudflare recommended. Unblocks branded email jasper@sanosystems.com.' },
            { id: 'exp-6c', item: 'Google Workspace — jasper@sanosystems.com (pending)', amount: 7.40, status: 'pending', week: 0, category: 'infra', note: 'After domain purchase' },

            // Week 1 — This week
            { id: 'exp-7', item: 'GHL SaaS Pro (Month 1)', amount: 497, status: 'paid', week: 1, category: 'platform' },
            { id: 'exp-8', item: 'HVAC Snapshot purchase', amount: 100, status: 'pending', week: 1, category: 'platform' },
            { id: 'exp-9', item: 'Agent API costs (Week 1)', amount: 5, status: 'paid', week: 1, category: 'agents' },

            // Week 2-4
            { id: 'exp-10', item: 'Attorney review (MSA + 1099)', amount: 400, status: 'pending', week: 2, category: 'legal' },
            { id: 'exp-11', item: 'Agent API costs (Weeks 2-4)', amount: 15, status: 'pending', week: 3, category: 'agents' },
            { id: 'exp-12', item: 'GHL SaaS Pro (Month 2)', amount: 497, status: 'pending', week: 5, category: 'platform' },
            { id: 'exp-13', item: 'Instantly.ai (Month 2)', amount: 47, status: 'pending', week: 5, category: 'outreach' },
            { id: 'exp-14', item: 'Misc tools/gas', amount: 100, status: 'pending', week: 4, category: 'ops' },

            // Chris (Month 2+)
            { id: 'exp-15', item: 'Chris Training Week 1', amount: 1700, status: 'pending', week: 7, category: 'team' },
            { id: 'exp-16', item: 'Chris Training Week 2', amount: 1700, status: 'pending', week: 8, category: 'team' },
        ],
    },

    // ---- Pricing (LOCKED April 15 — D-0017 + D-0019) ----
    pricing: {
        starter: { setup: 997, monthly: 397, note: 'Entry tier' },
        growth: { setup: 2497, monthly: 999 },
        scale: { setup: 4997, monthly: 1995 },
        totalTransformation: { setup: 14997, monthly: 4997, note: '6-month min, sell after case studies' },
    },

    // ---- Tech Stack (AI-First Architecture) ----
    techStack: {
        core: [
            { name: 'GoHighLevel SaaS Pro', cost: '$497/mo', role: 'CRM, automations, client sub-accounts, AI chatbot, voice AI, social planner', status: 'active' },
            { name: 'GHL MCP (Model Context Protocol)', cost: 'Free', role: '269 tools — AI controls GHL directly via API (port 8000, auto-restart)', status: 'active' },
            { name: 'Northwest Registered Agent', cost: '$125/yr', role: 'TX registered agent + business address + mail scanning (paid 2026-04-22)', status: 'active' },
            { name: 'Instantly.ai', cost: '$47/mo', role: 'Cold email sending + warmup', status: 'active' },
        ],
        free: [
            { name: 'Scribe', cost: 'Free', role: 'Auto-captures SOPs from screen clicks' },
            { name: 'Wave', cost: 'Free', role: 'Bookkeeping + invoicing' },
            { name: 'Canva', cost: 'Free', role: 'Graphics + social media design' },
            { name: 'Instant Data Scraper', cost: 'Free', role: 'Chrome extension for lead scraping' },
            { name: 'Visualping', cost: 'Free (5 pg)', role: 'Monitor competitor pricing pages' },
            { name: 'Google Alerts', cost: 'Free', role: 'Competitor name monitoring' },
            { name: 'Bookipi', cost: 'Free', role: 'Proposals + e-signatures' },
            { name: 'UptimeRobot', cost: 'Free', role: 'Website uptime monitoring' },
        ],
        agents: [
            { name: 'OpenClaw (Builder)', cost: '~$0.08/call', role: 'Overnight content, legal, research production' },
            { name: 'Antigravity (Manager)', cost: 'Included', role: 'Strategy, planning, GHL MCP control' },
            { name: 'Sentinel', cost: '~$0.02/check', role: '24/7 DNS + system health monitoring' },
            { name: 'Chief of Staff', cost: '~$0.05/plan', role: 'Nightly planning + morning briefings' },
            { name: 'Auditor', cost: '~$0.05/review', role: 'QA on all agent outputs (7/10 min bar)' },
            { name: 'AMOS Orchestrator', cost: 'On-demand', role: 'Multi-pillar marketing content brain (v4)' },
            { name: 'Content Writer / Campaign Builder / SEO Auditor / Visual Production', cost: 'On-demand', role: 'AMOS library skills (invoked by Orchestrator)' },
            { name: 'Pipeline Watchdog / Quality Manager', cost: 'On-demand', role: 'AMOS v2 — detects stuck tasks + final 1-10 quality gate' },
        ],
        mcps: [
            { name: 'GHL MCP (mastanley13)', tools: 269, status: 'active', note: 'localhost:8000, launchd auto-restart' },
            { name: 'fal.ai MCP', status: 'active', note: 'Image + video gen (Nano Banana Pro, FLUX, Kling)' },
            { name: 'HeyGen MCP', status: 'active', note: 'AI avatar video' },
            { name: 'Canva MCP', status: 'active', note: 'Branded graphics + auto brand kit' },
            { name: 'Publora MCP', status: 'active', note: 'Cross-platform scheduling (15 free posts/mo)' },
            { name: 'Firecrawl MCP', status: 'active', note: 'Competitor research + content curation' },
        ],
        skills: {
            installed_total: 102,
            breakdown: [
                { group: 'Legacy agents (11)', files: 11, source: 'SANO native' },
                { group: 'AMOS skills (7 in .agents/skills/ + 2 v2 agents)', files: 9, source: 'SANO native' },
                { group: 'marketingskills (post-prune)', files: 28, source: 'coreyhaines31' },
                { group: 'localseoskills (strategy-only)', files: 26, source: 'garrettjsmith' },
                { group: 'sickn33 curated (NEW 2026-04-24)', files: 30, source: 'sickn33/antigravity-awesome-skills v10.5.0' },
            ],
            archived: 8,
            note: '8 SaaS-irrelevant marketingskills pruned 2026-04-24 (churn-prevention, paywall-*, signup-flow-cro, onboarding-cro, form-cro, popup-cro, page-cro, aso-audit). ~3,350 lines of context noise removed.',
        },
    },

    // ---- Team ----
    team: {
        jasper: { role: 'CEO / Strategy / Sales', status: 'active' },
        antigravity: { role: 'AI Manager / GHL MCP / Research', status: 'active' },
        openClaw: { role: 'AI Worker / Overnight Production', status: 'active' },
        sentinel: { role: 'AI Monitor / Health Checks', status: 'active' },
        chris: { role: 'Head of Sales (1099 IC)', status: 'starts-june-1', comp: '$1,200/wk + 20% setup + 5% recurring' },
        // VA: ELIMINATED April 11 — $850/mo saved
    },

    // ---- Latest Session Report (Dashboard Card) ----
    overnightReport: {
        date: '2026-04-24',
        status: 'complete',
        sessionType: 'Cowork session — skills install, rename sweep, LLC filing',
        tasksTotal: 13,
        tasksCompleted: 13,
        tasksFailed: 0,
        totalCost: 0,
        startTime: '10:30 AM CT',
        deliverables: [
            { name: 'sickn33 repo researched + 30 curated skills installed at .agents/skills/sickn33/', status: 'complete', file: '.agents/skills/sickn33/README.md' },
            { name: '8 SaaS-irrelevant marketingskills archived', status: 'complete', file: '.agents/skills/_archived/marketingskills-saas-pruned-20260423/' },
            { name: 'STATE_SYNC cross-tool memory contract written', status: 'complete', file: 'brain/STATE_SYNC.md' },
            { name: 'SANO Skills Master Plan (HTML)', status: 'complete', file: 'SANO-SKILLS-MASTERPLAN.html' },
            { name: 'Antigravity handoff document', status: 'complete', file: 'ANTIGRAVITY-HANDOFF-2026-04-23.md' },
            { name: 'D-0039 rename: SANO Solutions → SANO Systems captured in brain', status: 'complete', file: 'brain/v2/IDENTITY.md' },
            { name: 'LLC filing checklist + interactive HTML', status: 'complete', file: 'LLC-FILING-CHECKLIST.html' },
            { name: 'SOSDirect account created (USER ID 1149753797)', status: 'complete', file: 'brain/v2/IDENTITY.md' },
            { name: 'Form 205 Certificate of Formation FILED (Document #1580642670002)', status: 'complete', file: 'TX SOS — awaiting approval' },
            { name: 'Northwest RA paid + address confirmed', status: 'complete', file: 'Invoice WD6F8BWZ ($125, through 2027-04-22)' },
            { name: '107-file rename sweep: SANO Solutions → SANO Systems (219 replacements)', status: 'complete', file: 'brain/DAILY_LATEST.md' },
            { name: 'Command Center source updated + committed (c31d7f1)', status: 'complete', file: 'command-center/index.html' },
            { name: 'Brain fully hydrated + DAILY_LATEST logged per STATE_SYNC', status: 'complete', file: 'brain/DAILY_LATEST.md' },
        ],
    },

    // ---- CEO Directive Status ----
    directive: {
        active: true,
        date: '2026-04-15',
        taskCount: 3,
        source: 'Antigravity session',
        approvedBy: 'CEO',
        estimatedCost: 0,
    },

    // ---- Agent Spend Tracking (ENHANCED — Feature 2) ----
    agentSpend: {
        tonight: { spent: 0.56, limit: 15.00 },
        month: { spent: 1.20, limit: 200.00 },
        perAgent: [
            { agent: 'Builder', tasks: 7, spent: 0.68, avgPerTask: 0.10 },
            { agent: 'Chief of Staff', tasks: 3, spent: 0.15, avgPerTask: 0.05 },
            { agent: 'Sentinel', tasks: 12, spent: 0.24, avgPerTask: 0.02 },
            { agent: 'Auditor', tasks: 2, spent: 0.13, avgPerTask: 0.07 },
        ],
        dailyHistory: [
            { date: 'Apr 5', spent: 0.00, tasks: 0 },
            { date: 'Apr 6', spent: 0.00, tasks: 0 },
            { date: 'Apr 7', spent: 0.08, tasks: 1 },
            { date: 'Apr 8', spent: 0.12, tasks: 2 },
            { date: 'Apr 9', spent: 0.15, tasks: 3 },
            { date: 'Apr 10', spent: 0.29, tasks: 5 },
            { date: 'Apr 11', spent: 0.56, tasks: 13 },
        ],
    },

    // ---- Agent Activity Feed ----
    agentReports: [
        {
            agent: 'Cowork (Claude)',
            time: '2:55 PM — Apr 24',
            message: '📊 COMMAND CENTER UPDATE. Rebuilt data.js to reflect 2026-04-24 state: LLC filed (Doc #1580642670002), Northwest RA paid, 30 sickn33 skills installed, 8 SaaS skills pruned, STATE_SYNC contract live, 107-file rename sweep complete, new legal entity path unblocking GHL/bank/EIN. Version bumped to v9.0.',
            status: 'complete'
        },
        {
            agent: 'Jasper',
            time: '2:42 PM — Apr 24',
            message: '🏛️ LLC FILED. SANO Systems LLC Certificate of Formation submitted to Texas SOS. Session 042426LD4703, Document #1580642670002. ~$308 charged. Awaiting TX approval email 1-3 biz days. When approval lands → EIN + Mercury + GHL all unblock.',
            status: 'complete'
        },
        {
            agent: 'Cowork (Claude)',
            time: '1:45 PM — Apr 24',
            message: '🔁 RENAME SWEEP EXECUTED. 107 files changed, 219 replacements SANO Solutions → SANO Systems. 480 historical records preserved (agent-output, state/plans, archives, backups). Command Center source renamed + pushed commit c31d7f1. Live Cloudflare dashboard now shows SANO Systems.',
            status: 'complete'
        },
        {
            agent: 'Cowork (Claude)',
            time: '12:15 PM — Apr 24',
            message: '🧠 STATE_SYNC CONTRACT DEPLOYED. Cross-tool memory loop diagnosed. New brain/STATE_SYNC.md defines hydration + write-back rules for Antigravity / Cowork / Chrome / Telegram / OpenClaw. D-0038 logged. Every tool now reads 4 files on session start, appends 1-line entry to DAILY_LATEST on meaningful work events.',
            status: 'complete'
        },
        {
            agent: 'Cowork (Claude)',
            time: '11:50 AM — Apr 24',
            message: '📦 30 SICKN33 SKILLS INSTALLED. Curated from 1,422-skill library. Groups: agent-architect (6), documents (7), essentials (4), meta (8), seo-gap (5). 8 SaaS-irrelevant marketingskills archived (~3,350 lines of context noise removed). Registered in sano-harness/config/agents.toml.',
            status: 'complete'
        },
        {
            agent: 'Cowork (Claude)',
            time: '11:05 AM — Apr 24',
            message: '📋 D-0039 LOGGED. Trademark conflict on SANO Solutions → renamed to SANO Systems. Texas name availability confirmed clear. Brandon Wayne Holland confirmed as sole member. Single-member Texas LLC structure confirmed.',
            status: 'complete'
        },
        {
            agent: 'Antigravity',
            time: '2:40 PM — Apr 15',
            message: '📋 MSA REVIEW SESSION. CEO reviewed Client Service Agreement draft. 5 review flags addressed: LLC (deferred to pre-launch), founding rate (removed from MSA), SMS/voice caps (researched — industry benchmarks applied), add-on packages (à la carte vs bundle structure proposed), early termination (kept as-is for attorney). Ready for attorney submission.',
            status: 'complete'
        },
        {
            agent: 'Antigravity',
            time: '1:30 PM — Apr 15',
            message: '🧠 v2 MEMORY SCAFFOLD INSTALLED. BOOT.md, TASKS.jsonl (34 tasks), DECISIONS.jsonl (20 decisions), CHANGELOG.jsonl, PROTOCOL.md, drift-detector.py all live in brain/v2/. Dual-read phase active. KI bundle installed in Antigravity.',
            status: 'complete'
        },
        {
            agent: 'Antigravity',
            time: '12:00 PM — Apr 15',
            message: '💰 PRICING LOCKED (D-0017 + D-0019). 4 tiers final: Starter $997+$397, Growth $2,497+$999, Scale $4,997+$1,995, Total Transformation $14,997+$4,997. All brain files, MSA, and Command Center updated.',
            status: 'complete'
        },
        {
            agent: 'OpenClaw',
            time: '11:00 AM — Apr 15',
            message: '📝 6 AGENT DRAFTS DELIVERED. MSA ✅, Chris 1099 ✅, Cold emails ✅, Competitive intel ✅, Knowledge Base (8 FAQ) ✅, Social media (15 posts + calendar) ✅. All awaiting CEO review.',
            status: 'complete'
        },
        {
            agent: 'Antigravity',
            time: '6:00 PM — Apr 14',
            message: '🎉 GHL DAY 1 COMPLETE. Jasper finished curriculum Day 1: 6 custom fields, pipeline (7 stages), Mike Thompson + Sarah Chen contacts, ProFlow Plumbing deal at Qualified ($999/mo). Day 2 (Workflow Builder) in progress.',
            status: 'complete'
        },
        {
            agent: 'Antigravity',
            time: '4:00 PM — Apr 13',
            message: '🔌 GHL MCP SERVER DEPLOYED. 215 tools on port 8000 (launchd auto-restart). API verified: contacts ✅, pipelines ✅, calendars ✅, workflows ✅, opportunities ✅.',
            status: 'complete'
        },
        {
            agent: 'Pipeline',
            time: '9:00 PM — Apr 11',
            message: '🚀 Night pipeline LAUNCHED with CEO Directive. 6 tasks queued.',
            status: 'complete'
        },
    ],

    // ======================================================
    // JASPER'S TO-DO LIST — Only things Jasper must do himself
    // ======================================================
    jasperTasks: [
        {
            section: '🔥 TODAY (Apr 24) — What got done',
            description: 'The legal entity milestone + skills install + rename sweep',
            items: [
                { id: 'j-apr24-1', text: 'SOSDirect account created (USER ID 1149753797)', status: 'complete', time: '10 min', day: 'Fri' },
                { id: 'j-apr24-2', text: 'Name availability searches run ("SANO SYSTEMS" clear)', status: 'complete', time: '5 min', day: 'Fri' },
                { id: 'j-apr24-3', text: 'Form 205 Certificate of Formation FILED — Document #1580642670002', status: 'complete', time: '30 min', day: 'Fri' },
                { id: 'j-apr24-4', text: '~$308 paid (TX $300 + $8.10 conv fee)', status: 'complete', time: '—', day: 'Fri' },
                { id: 'j-apr24-5', text: 'Cowork: 30 curated sickn33 skills installed + 8 SaaS skills pruned', status: 'complete', time: '—', day: 'Fri' },
                { id: 'j-apr24-6', text: 'Cowork: STATE_SYNC cross-tool memory contract written (D-0038)', status: 'complete', time: '—', day: 'Fri' },
                { id: 'j-apr24-7', text: 'Cowork: 107-file rename sweep SANO Solutions → SANO Systems', status: 'complete', time: '—', day: 'Fri' },
                { id: 'j-apr24-8', text: 'Command Center commit c31d7f1 pushed → live on Cloudflare', status: 'complete', time: '5 min', day: 'Fri' },
            ]
        },
        {
            section: '⏳ Next (Waiting for TX SOS Approval, 1-3 biz days)',
            description: 'These unblock as soon as the approval email lands',
            items: [
                { id: 'j-next-1', text: 'Monitor email for TX SOS approval from noreply@sos.state.tx.us', status: 'not-started', time: '—', day: 'Mon-Wed' },
                { id: 'j-next-2', text: 'Optional — track status at webservices.sos.state.tx.us/filing-status with Doc #1580642670002', status: 'not-started', time: '1 min', day: 'Mon' },
                { id: 'j-next-3', text: 'Same-day as approval — EIN via IRS.gov online (free, 15 min)', status: 'not-started', time: '15 min', day: 'TBD' },
                { id: 'j-next-4', text: 'Same-day as approval — Apply for Mercury business bank (free, 1-3 day approval)', status: 'not-started', time: '30 min', day: 'TBD' },
                { id: 'j-next-5', text: 'Register for Texas Comptroller WebFile (franchise tax, $0 due)', status: 'not-started', time: '5 min', day: 'TBD' },
                { id: 'j-next-6', text: 'Buy sanosystems.com on Cloudflare ($15/yr, time-sensitive to secure)', status: 'not-started', time: '10 min', day: 'Today optional' },
                { id: 'j-next-7', text: 'Sign up Google Workspace for jasper@sanosystems.com ($7.40/mo)', status: 'not-started', time: '15 min', day: 'After domain' },
                { id: 'j-next-8', text: 'Once Mercury card arrives → subscribe GHL SaaS Pro ($497/mo) — UNBLOCKS SNAPSHOT WORK', status: 'not-started', time: '5 min', day: 'TBD' },
                { id: 'j-next-9', text: 'Update Northwest RA account name from Sano Solutions → SANO Systems', status: 'not-started', time: '5 min', day: 'After approval' },
                { id: 'j-next-10', text: 'Set git global user.email to jasper@sanosystems.com (after Google Workspace live)', status: 'not-started', time: '1 min', day: 'After email setup' },
            ]
        },
        {
            section: '🔴 This Weekend (Apr 12-13)',
            description: 'GHL signup + tools setup',
            items: [
                { id: 'j-1', text: 'Install Scribe Chrome extension', status: 'complete', time: '2 min', day: 'Mon' },
                { id: 'j-2', text: 'Install Instant Data Scraper Chrome extension', status: 'complete', time: '2 min', day: 'Mon' },
                { id: 'j-3', text: 'Sign up Wave accounting (free)', status: 'not-started', time: '10 min', day: 'Sat' },
                { id: 'j-4', text: 'Sign up GHL SaaS Pro ($497/mo)', status: 'complete', time: '5 min', day: 'Sat' },
                { id: 'j-5', text: 'Create Private Integration Token in GHL', status: 'complete', time: '10 min', day: 'Sat' },
                { id: 'j-6', text: 'Get Location ID → send to Antigravity', status: 'complete', time: '2 min', day: 'Sat' },
                { id: 'j-7', text: 'Create sandbox sub-account: SANO-Sandbox-HVAC', status: 'not-started', time: '5 min', day: 'Sat' },
                { id: 'j-8', text: 'GHL Day 1 — Settings + Custom Fields + Pipeline + Contacts', status: 'complete', time: '2.5 hrs', day: 'Mon' },
                { id: 'j-9', text: 'Set up Visualping — monitor 5 competitor pricing pages', status: 'not-started', time: '15 min', day: 'Sat' },
                { id: 'j-10', text: 'Set up Google Alerts — 3 competitor names', status: 'not-started', time: '3 min', day: 'Sat' },
                { id: 'j-11', text: 'GHL Day 2 — Workflow Builder (Welcome + Proposal sequences)', status: 'complete', time: '3 hrs', day: 'Mon' },
                { id: 'j-12', text: 'Browse GHL Snapshot Marketplace — find HVAC/plumbing snaps', status: 'not-started', time: '45 min', day: 'Sun' },
            ]
        },
        {
            section: '🟡 Weekdays (Apr 14-18)',
            description: 'GHL learning + snapshot exploration',
            items: [
                { id: 'j-13', text: 'Purchase best HVAC snapshot (~$50-150)', status: 'not-started', time: '15 min', day: 'Mon' },
                { id: 'j-14', text: 'Deploy + explore snapshot in sandbox', status: 'not-started', time: '30 min', day: 'Mon' },
                { id: 'j-15', text: 'GHL Session #3 — CRM + Contacts (Scribe ON)', status: 'not-started', time: '45 min', day: 'Mon' },
                { id: 'j-16', text: 'GHL Session #4 — Pipelines + Opportunities (Scribe ON)', status: 'not-started', time: '45 min', day: 'Tue' },
                { id: 'j-17', text: 'Build SANO sales pipeline in GHL', status: 'not-started', time: '30 min', day: 'Tue' },
                { id: 'j-18', text: 'GHL Session #5 — Workflow Automations (Scribe ON)', status: 'not-started', time: '45 min', day: 'Wed' },
                { id: 'j-19', text: 'Test missed-call text-back workflow', status: 'not-started', time: '15 min', day: 'Wed' },
                { id: 'j-20', text: 'GHL Session #6 — AI Workflow Builder (Scribe ON)', status: 'not-started', time: '45 min', day: 'Thu' },
                { id: 'j-21', text: 'Start customizing HVAC snapshot with test data', status: 'not-started', time: '30 min', day: 'Thu' },
                { id: 'j-22', text: 'GHL Session #7 — Calendar + Booking (Scribe ON)', status: 'not-started', time: '45 min', day: 'Fri' },
                { id: 'j-23', text: 'Test appointment booking widget', status: 'not-started', time: '15 min', day: 'Fri' },
            ]
        },
        {
            section: '🟢 End of Week Reviews',
            description: 'Review agent work + legal',
            items: [
                { id: 'j-24', text: 'Review agent-drafted Client Service Agreement', status: 'in-progress', time: '20 min', day: 'Tue' },
                { id: 'j-25', text: 'Review agent-drafted Cold Email Sequences', status: 'not-started', time: '15 min', day: 'Wed' },
                { id: 'j-26', text: 'Review agent Competitive Intel Report', status: 'not-started', time: '20 min', day: 'Wed' },
                { id: 'j-27', text: 'Review agent-drafted Chris 1099 Agreement', status: 'not-started', time: '20 min', day: 'Thu' },
                { id: 'j-28', text: 'Review agent Knowledge Base articles', status: 'not-started', time: '15 min', day: 'Thu' },
                { id: 'j-29', text: 'Review agent Social Media batch', status: 'not-started', time: '15 min', day: 'Fri' },
                { id: 'j-30', text: 'Send legal drafts (MSA + 1099) to attorney', status: 'not-started', time: '15 min', day: 'Fri' },
                { id: 'j-31', text: 'WEEK 1 REVIEW — what worked? what didn\'t?', status: 'not-started', time: '30 min', day: 'Fri' },
                { id: 'j-32', text: 'Plan Week 2 agent priorities', status: 'not-started', time: '15 min', day: 'Fri' },
            ]
        },
        {
            section: '⬜ Week 2 (Apr 19-25) — Build the Product',
            description: 'Snapshot customization + onboarding form',
            items: [
                { id: 'j-40', text: 'Deploy HVAC snapshot to fresh sub-account for QA', status: 'not-started', time: '1 hr', day: '' },
                { id: 'j-41', text: 'Turn on Scribe → walk through entire HVAC snapshot', status: 'not-started', time: '1.5 hrs', day: '' },
                { id: 'j-42', text: 'Review legal agreements from attorney', status: 'not-started', time: '1 hr', day: '' },
                { id: 'j-43', text: 'Customize HVAC snapshot with fake test client', status: 'not-started', time: '2 hrs', day: '' },
                { id: 'j-44', text: 'Record kickoff call walkthrough (Scribe running)', status: 'not-started', time: '1 hr', day: '' },
                { id: 'j-45', text: 'Build client onboarding intake form in GHL', status: 'not-started', time: '1 hr', day: '' },
                { id: 'j-46', text: 'GHL Sessions #8-12 (45 min/day)', status: 'not-started', time: '3.75 hrs', day: '' },
            ]
        },
        {
            section: '⬜ Week 3 (Apr 26 - May 2) — Polish the Product',
            description: 'Golden snapshot + Conversation AI + tutorials',
            items: [
                { id: 'j-50', text: 'Snapshot HVAC sub-account → THIS IS YOUR PRODUCT', status: 'not-started', time: '30 min', day: '' },
                { id: 'j-51', text: 'Deploy snapshot to fresh account → verify clean', status: 'not-started', time: '1 hr', day: '' },
                { id: 'j-52', text: 'Set up GHL Conversation AI with knowledge base', status: 'not-started', time: '1.5 hrs', day: '' },
                { id: 'j-53', text: 'Set up GHL Reviews AI (auto-pilot)', status: 'not-started', time: '45 min', day: '' },
                { id: 'j-54', text: 'Sign up Bookipi → create proposal template', status: 'not-started', time: '30 min', day: '' },
                { id: 'j-55', text: 'Record 3 tutorial videos (Guidde/Clueso)', status: 'not-started', time: '1.5 hrs', day: '' },
                { id: 'j-56', text: 'Email warmup check (Day 25)', status: 'not-started', time: '15 min', day: '' },
                { id: 'j-57', text: 'GHL Sessions #13-17 (45 min/day)', status: 'not-started', time: '3.75 hrs', day: '' },
            ]
        },
        {
            section: '⬜ Week 4 (May 3-9) — Sales Infrastructure',
            description: 'Lead lists + pipeline + full dry-run',
            items: [
                { id: 'j-60', text: 'Review attorney feedback on legal agreements', status: 'not-started', time: '1 hr', day: '' },
                { id: 'j-61', text: 'Scrape first lead list: 50 HVAC companies Houston', status: 'not-started', time: '1 hr', day: '' },
                { id: 'j-62', text: 'Review + approve cold email sequences', status: 'not-started', time: '30 min', day: '' },
                { id: 'j-63', text: 'Load leads into Instantly + configure campaign', status: 'not-started', time: '1 hr', day: '' },
                { id: 'j-64', text: 'Claim Google Business Profile', status: 'not-started', time: '30 min', day: '' },
                { id: 'j-65', text: 'Set up tracking pipeline in GHL (SANO\'s own sales)', status: 'not-started', time: '1 hr', day: '' },
                { id: 'j-66', text: 'FULL DRY-RUN: fake client end-to-end', status: 'not-started', time: '2 hrs', day: '' },
                { id: 'j-67', text: 'GHL Sessions #18-22 (45 min/day)', status: 'not-started', time: '3.75 hrs', day: '' },
            ]
        },
        {
            section: '⬜ Week 5 (May 10-16) — Soft Launch',

description: 'Cold email live + first responses',
            items: [
                { id: 'j-70', text: 'Final warmup verification (Day 33)', status: 'not-started', time: '15 min', day: '' },
                { id: 'j-71', text: 'LAUNCH cold email campaign', status: 'not-started', time: '30 min', day: '' },
                { id: 'j-72', text: 'Post early access announcement on social', status: 'not-started', time: '30 min', day: '' },
                { id: 'j-73', text: 'Monitor replies daily (AM + PM)', status: 'not-started', time: '30 min/day', day: '' },
                { id: 'j-74', text: 'Respond to interested prospects', status: 'not-started', time: '1-3 hrs', day: '' },
                { id: 'j-75', text: 'Scrape second lead list: 50 plumbing companies', status: 'not-started', time: '1 hr', day: '' },
            ]
        },
        {
            section: '⬜ Week 6 (May 17-23) — First Client',
            description: 'Close + deliver first paying client',
            items: [
                { id: 'j-80', text: 'Conduct sales calls + send proposals', status: 'not-started', time: '2-3 hrs/prospect', day: '' },
                { id: 'j-81', text: '⭐ CLOSE FIRST CLIENT', status: 'not-started', time: '—', day: '' },
                { id: 'j-82', text: 'Deploy first real client sub-account', status: 'not-started', time: '2-4 hrs', day: '' },
                { id: 'j-83', text: 'Conduct first real kickoff call', status: 'not-started', time: '45 min', day: '' },
                { id: 'j-84', text: 'DNS + Stripe + A2P setup for client', status: 'not-started', time: '1 hr', day: '' },
            ]
        },
        {
            section: '⬜ Week 7-8 (May 24 - Jun 6) — Scale + Chris',
            description: 'Pipeline + Chris arrives',
            items: [
                { id: 'j-90', text: 'Continue sales pipeline', status: 'not-started', time: '3-5 hrs/wk', day: '' },
                { id: 'j-91', text: 'Chris Day 1 orientation + system tour', status: 'not-started', time: '4 hrs', day: '' },
                { id: 'j-92', text: 'Hand Chris sales materials', status: 'not-started', time: '1 hr', day: '' },
                { id: 'j-93', text: 'Monthly P&L review (Wave)', status: 'not-started', time: '1 hr', day: '' },
                { id: 'j-94', text: 'Set Month 2 targets with Chris', status: 'not-started', time: '1 hr', day: '' },
            ]
        },
    ],

    // ======================================================
    // AI AGENT TASKS — Things the agents handle
    // ======================================================
    aiTasks: [
        {
            section: '🔴 Tonight (Apr 11) — Running NOW',
            description: 'Pipeline executing 6 pre-approved tasks',
            items: [
                { id: 'ai-1', text: 'Draft Client Service Agreement (MSA)', status: 'complete', agent: 'Builder', cost: '$0.50' },
                { id: 'ai-2', text: 'Write Cold Email Sequences (HVAC + Plumber)', status: 'complete', agent: 'Builder', cost: '$0.50' },
                { id: 'ai-3', text: 'Draft Chris 1099 Agreement', status: 'complete', agent: 'Builder', cost: '$0.40' },
                { id: 'ai-4', text: 'Competitive Intel Report — Houston market', status: 'complete', agent: 'Builder', cost: '$0.75' },
                { id: 'ai-5', text: 'Knowledge Base articles (8 FAQ articles)', status: 'complete', agent: 'Builder', cost: '$0.40' },
                { id: 'ai-6', text: 'Social Media batch (15 posts + calendar)', status: 'complete', agent: 'Builder', cost: '$0.30' },
            ]
        },
        {
            section: '🟡 Week 1 — After GHL Connected',
            description: 'Tasks that unlock once MCP is live',
            items: [
                { id: 'ai-10', text: 'Configure GHL MCP server (clone, build, deploy)', status: 'complete', agent: 'Antigravity', cost: '$0' },
                { id: 'ai-11', text: 'Test MCP connection — 215 tools verified, full CRUD confirmed', status: 'complete', agent: 'Antigravity', cost: '$0' },
                { id: 'ai-11b', text: 'Configure Claude Desktop MCP + launchd auto-restart', status: 'complete', agent: 'Antigravity', cost: '$0' },
                { id: 'ai-11c', text: 'Create GHL learning curriculum (7-day, SANO-specific)', status: 'complete', agent: 'Antigravity', cost: '$0' },
                { id: 'ai-11d', text: 'GHL capability report + AI vs human gap analysis', status: 'complete', agent: 'Antigravity', cost: '$0' },
                { id: 'ai-12', text: 'Sentinel: monitor DNS health for email domains', status: 'in-progress', agent: 'Sentinel', cost: '~$0.10/wk' },
                { id: 'ai-13', text: 'Morning briefings via Telegram (daily)', status: 'in-progress', agent: 'Chief of Staff', cost: '~$0.05/day' },
            ]
        },
        {
            section: '⬜ Week 2 — Product Build',
            description: 'Content + templates for snapshot',

items: [
                { id: 'ai-20', text: 'Generate onboarding intake form questions', status: 'not-started', agent: 'Antigravity', cost: '$0' },
                { id: 'ai-21', text: 'Build welcome email sequence (5 emails)', status: 'not-started', agent: 'Builder', cost: '$0.30' },
                { id: 'ai-22', text: 'Draft voice agent scripts (per tier)', status: 'not-started', agent: 'Builder', cost: '$0.25' },
                { id: 'ai-23', text: 'Write early access outreach email', status: 'not-started', agent: 'Builder', cost: '$0.15' },
                { id: 'ai-24', text: 'Generate monthly report template', status: 'not-started', agent: 'Builder', cost: '$0.15' },
                { id: 'ai-25', text: 'Social media batch Week 2 (10 posts)', status: 'not-started', agent: 'Builder', cost: '$0.20' },
            ]
        },
        {
            section: '⬜ Week 3 — Polish',
            description: 'Plumber snapshot + proposal content',
            items: [
                { id: 'ai-30', text: 'Build plumber snapshot (clone + customize HVAC)', status: 'not-started', agent: 'Antigravity/MCP', cost: '$0' },
                { id: 'ai-31', text: 'Generate proposal template content', status: 'not-started', agent: 'Builder', cost: '$0.20' },
                { id: 'ai-32', text: 'Write 5 more knowledge base articles', status: 'not-started', agent: 'Builder', cost: '$0.25' },
                { id: 'ai-33', text: 'Create case study template', status: 'not-started', agent: 'Builder', cost: '$0.15' },
                { id: 'ai-34', text: 'Draft early access landing page copy', status: 'not-started', agent: 'Builder', cost: '$0.20' },
                { id: 'ai-35', text: 'Weekly business review #1', status: 'not-started', agent: 'Builder', cost: '$0.15' },
            ]
        },
        {
            section: '⬜ Week 4 — Sales Infra',
            description: 'Lead enrichment + sales materials',
            items: [
                { id: 'ai-40', text: 'Enrich 50 leads with decision-maker names + emails', status: 'not-started', agent: 'Builder', cost: '$0.50' },
                { id: 'ai-41', text: 'Generate personalized first lines for top 20 prospects', status: 'not-started', agent: 'Builder', cost: '$0.30' },
                { id: 'ai-42', text: 'Create sales deck / one-pager content', status: 'not-started', agent: 'Builder', cost: '$0.25' },
                { id: 'ai-43', text: 'Set up Sentinel to monitor GHL system health via MCP', status: 'not-started', agent: 'Antigravity', cost: '$0' },
            ]
        },
        {
            section: '⬜ Week 5-6 — Launch Support',
            description: 'Deliverability monitoring + call prep',
            items: [
                { id: 'ai-50', text: 'Monitor email deliverability metrics', status: 'not-started', agent: 'Sentinel', cost: '~$0.10/wk' },
                { id: 'ai-51', text: 'A/B test subject line analysis', status: 'not-started', agent: 'Builder', cost: '$0.20' },
                { id: 'ai-52', text: 'Generate prospect-specific call prep briefs', status: 'not-started', agent: 'Builder', cost: '$0.15/each' },
                { id: 'ai-53', text: 'Auto-create client sub-accounts via MCP', status: 'not-started', agent: 'Antigravity/MCP', cost: '$0' },
                { id: 'ai-54', text: 'Deploy snapshot + populate client data', status: 'not-started', agent: 'Antigravity/MCP', cost: '$0' },
                { id: 'ai-55', text: 'First client onboarding QA check', status: 'not-started', agent: 'Auditor', cost: '$0.10' },
            ]
        },
        {
            section: '⬜ Week 7-8 — Chris + Scale',
            description: 'Training materials + reports',
            items: [
                { id: 'ai-60', text: 'Generate Chris training curriculum', status: 'not-started', agent: 'Builder', cost: '$0.50' },
                { id: 'ai-61', text: 'Create client performance reports via MCP', status: 'not-started', agent: 'Builder/MCP', cost: '$0.20' },
                { id: 'ai-62', text: 'Generate Chris prospect lists (pre-enriched)', status: 'not-started', agent: 'Builder', cost: '$0.50' },
                { id: 'ai-63', text: 'Month 1 business metrics report', status: 'not-started', agent: 'Builder', cost: '$0.30' },
                { id: 'ai-64', text: 'All systems health audit', status: 'not-started', agent: 'Sentinel', cost: '$0.20' },
            ]
        },
    ],

    // ---- Already Completed ----
    completed: [
        // Apr 24 — today
        { text: '🏛️ SANO Systems LLC Certificate of Formation FILED to Texas SOS (Document #1580642670002, $308 paid)', date: 'Apr 24' },
        { text: '🧾 Northwest Registered Agent paid — Texas RA service through 2027-04-22 (invoice WD6F8BWZ, $125)', date: 'Apr 22' },
        { text: '📋 D-0039 logged: SANO Solutions → SANO Systems rename (trademark conflict on prior name)', date: 'Apr 24' },
        { text: '📦 30 curated sickn33 skills installed at .agents/skills/sickn33/ (agent-architect, documents, essentials, meta, seo-gap)', date: 'Apr 24' },
        { text: '🗑️ 8 SaaS-irrelevant marketingskills archived (~3,350 lines of context noise removed)', date: 'Apr 24' },
        { text: '🧠 STATE_SYNC cross-tool memory contract written — brain/STATE_SYNC.md (D-0038)', date: 'Apr 24' },
        { text: '📄 SANO Skills Master Plan + Antigravity handoff docs produced', date: 'Apr 24' },
        { text: '📄 LLC filing checklist HTML with interactive progress tracker', date: 'Apr 24' },
        { text: '🔁 107-file rename sweep: SANO Solutions → SANO Systems (219 replacements, historical records preserved)', date: 'Apr 24' },
        { text: '📊 Command Center source renamed + deployed to Cloudflare (commit c31d7f1)', date: 'Apr 24' },
        { text: '🆔 SOSDirect account provisioned (USER ID 1149753797)', date: 'Apr 24' },
        { text: '🔒 Texas name availability confirmed clear for SANO SYSTEMS', date: 'Apr 24' },
        // Apr 22 earlier
        { text: '✉️ Email warmup complete on 2 accounts (jasper@sanojobs.com, jasper@sanogrowth.com)', date: 'Apr 22' },
        // Apr 15
        { text: '4-tier pricing structure finalized', date: 'Apr 5' },
        { text: 'Chris compensation locked (20% setup / 5% recurring)', date: 'Apr 5' },
        { text: 'Pipeline Mode configured', date: 'Apr 5' },
        { text: 'Telegram bot connected', date: 'Apr 5' },
        { text: 'Cold email domains purchased (4)', date: 'Apr 7' },
        { text: 'Instantly.ai signed up ($47/mo)', date: 'Apr 7' },
        { text: 'Google Workspace inboxes created (4)', date: 'Apr 7' },
        { text: 'DNS records configured (SPF, DKIM, DMARC) — 2/4 domains', date: 'Apr 7' },
        { text: 'Email warmup started on 2 accounts', date: 'Apr 7' },
        { text: 'Mass Outreach Bible researched + filed', date: 'Apr 6' },
        { text: 'Chris training packet v1 written', date: 'Apr 4' },
        { text: 'Sales pitch scripts created', date: 'Apr 4' },
        { text: 'Command Center dashboard built', date: 'Apr 5' },
        { text: 'SANO immersive website (in development)', date: 'Apr 8-11' },
        { text: 'Agent pipeline fixed (4 bugs)', date: 'Apr 11' },
        { text: 'Builder agent verified ($0.08 test)', date: 'Apr 11' },
        { text: '6-phase research complete (Phases 0-4)', date: 'Apr 11' },
        { text: 'VA eliminated — $850/mo saved', date: 'Apr 11' },
        { text: 'MASTER_STATE.md fully updated', date: 'Apr 11' },
        { text: 'AI-first 8-week master plan created', date: 'Apr 11' },
        { text: 'CEO Directive system built into pipeline', date: 'Apr 11' },
        { text: 'Overnight agent dynamic proposal system designed', date: 'Apr 11' },
        { text: 'GHL SaaS Pro purchased + account configured', date: 'Apr 13' },
        { text: 'GHL Private Integration Token + Location ID connected', date: 'Apr 13' },
        { text: 'GHL MCP server deployed (215 tools, port 8000, launchd auto-restart)', date: 'Apr 13' },
        { text: 'Claude Desktop MCP wired to GHL', date: 'Apr 13' },
        { text: 'GHL API full read/write verified (12-step integration test)', date: 'Apr 13' },
        { text: 'GHL capability report + AI vs Human gap analysis', date: 'Apr 13' },
        { text: '7-day GHL learning curriculum (SANO-specific) created', date: 'Apr 13' },
        { text: 'GHL Day 1: 6 custom fields, pipeline (7 stages), 8 contacts, 6 deals', date: 'Apr 14' },
        { text: 'GHL Day 2: Workflow Builder (Welcome + Proposal sequences)', date: 'Apr 14' },
        { text: 'Scribe Chrome extension installed — auto-SOP capture ready', date: 'Apr 14' },
        { text: 'Instant Data Scraper installed — lead scraping ready', date: 'Apr 14' },
        { text: '8-Week Launch Plan tracker built into Command Center', date: 'Apr 14' },
        { text: 'GHL mechanic custom fields created (Vehicle Info, License Plate, etc.)', date: 'Apr 14' },
        { text: 'Beta test contact: Marcus Rodriguez — Rodriguez Auto Repair', date: 'Apr 14' },
        { text: 'GHL API access reference documented — all tokens, IDs, capabilities saved', date: 'Apr 14' },
        { text: 'GHL "SANO Full Access" Private Integration created (141/141 scopes)', date: 'Apr 14' },
        // Apr 15 — today
        { text: '💰 Pricing LOCKED at 4 tiers: Starter/Growth/Scale/TT (D-0017, D-0019)', date: 'Apr 15' },
        { text: '🧠 v2 Memory Scaffold installed (BOOT + TASKS + DECISIONS + CHANGELOG)', date: 'Apr 15' },
        { text: '📄 MSA draft — CEO review session (5 flags addressed)', date: 'Apr 15' },
        { text: '📄 Chris 1099 Agreement draft completed by agent', date: 'Apr 15' },
        { text: '📧 Cold email sequence v1 drafted (5 emails)', date: 'Apr 15' },
        { text: '🔬 Competitive intel Sprint 01 report complete', date: 'Apr 15' },
        { text: '📚 Knowledge Base FAQ v1 drafted (8 articles)', date: 'Apr 15' },
        { text: '📱 Social media batch v1 drafted (15 posts + calendar)', date: 'Apr 15' },
        { text: '💬 SMS/Voice cap research — industry benchmarks established', date: 'Apr 15' },
        { text: '📊 Command Center data synced to v2 brain source of truth', date: 'Apr 15' },
        { text: 'Antigravity Knowledge Item (sano-v2-protocol) installed', date: 'Apr 15' },
        { text: 'Cross-agent write safety protocol added (D-0020)', date: 'Apr 15' },
    ],

    // ---- Approvals Queue ----
    approvals: [],

    // ---- CEO Comments ----
    comments: [],

    // ======================================================
    // 🗺️ 8-WEEK LAUNCH PLAN — Strategic Tracker
    // Source: docs/strategy/master-launch-plan.md
    // ======================================================
    launchPlan: [
        {
            week: 1, name: 'FOUNDATION', theme: 'Get the Engine Running',
            dates: 'Apr 12-18', dateStart: '2026-04-12', dateEnd: '2026-04-18',
            status: 'complete',
            budget: { estimated: 547, actual: 502 },
            estHours: { jasper: '8-10', agent: '6-8' },
            jasperTasks: [
                { id: 'lp-j-1-1', text: 'Sign up for GHL SaaS Pro ($497/mo)', status: 'done' },
                { id: 'lp-j-1-2', text: 'Create Private Integration Token', status: 'done' },
                { id: 'lp-j-1-3', text: 'Get Location ID', status: 'done' },
                { id: 'lp-j-1-4', text: 'GHL Day 1: Settings + Custom Fields + Pipeline + Contacts', status: 'done' },
                { id: 'lp-j-1-5', text: 'GHL Day 2: Workflow Builder', status: 'done' },
                { id: 'lp-j-1-6', text: 'GHL Day 3: SMS/Email Deliverability', status: 'not-started' },
                { id: 'lp-j-1-7', text: 'GHL Day 4: Calendar + Booking', status: 'not-started' },
                { id: 'lp-j-1-8', text: 'GHL Day 5: Conversation AI + Reviews AI', status: 'not-started' },
                { id: 'lp-j-1-9', text: 'GHL Day 6: Voice AI + Social Planner', status: 'not-started' },
                { id: 'lp-j-1-10', text: 'GHL Day 7: Snapshot Creation + Full Test', status: 'not-started' },
                { id: 'lp-j-1-11', text: 'Install Scribe + Data Scraper + Wave + Google Alerts', status: 'in-progress' },
                { id: 'lp-j-1-12', text: 'Browse GHL Snapshot Marketplace', status: 'not-started' },
            ],
            agentTasks: [
                { id: 'lp-a-1-1', text: 'Configure GHL MCP server (215 tools)', agent: 'Antigravity', status: 'done' },
                { id: 'lp-a-1-2', text: 'Test MCP — full CRUD verified', agent: 'Antigravity', status: 'done' },
                { id: 'lp-a-1-3', text: 'Claude Desktop MCP + launchd', agent: 'Antigravity', status: 'done' },
                { id: 'lp-a-1-4', text: 'GHL capability report + gap analysis', agent: 'Antigravity', status: 'done' },
                { id: 'lp-a-1-5', text: '7-day GHL curriculum created', agent: 'Antigravity', status: 'done' },
                { id: 'lp-a-1-6', text: 'Competitive intel — Houston agencies', agent: 'Builder', status: 'done' },
                { id: 'lp-a-1-7', text: 'Draft Client Service Agreement v1', agent: 'Builder', status: 'done' },
                { id: 'lp-a-1-8', text: 'Cold email sequence v1 (5 emails)', agent: 'Builder', status: 'done' },
                { id: 'lp-a-1-9', text: '15 social media posts + calendar', agent: 'Builder', status: 'done' },
                { id: 'lp-a-1-10', text: 'Draft Chris 1099 Agreement', agent: 'Builder', status: 'done' },
                { id: 'lp-a-1-11', text: 'Knowledge Base FAQ (8 articles)', agent: 'Builder', status: 'done' },
                { id: 'lp-a-1-12', text: 'Install v2 memory scaffold', agent: 'Antigravity', status: 'done' },
                { id: 'lp-a-1-13', text: 'SMS/Voice cap industry research', agent: 'Antigravity', status: 'done' },
            ],
            gate: [
                { id: 'lp-g-1-1', text: 'GHL SaaS Pro active', passed: true },
                { id: 'lp-g-1-2', text: 'MCP connected and verified (215 tools)', passed: true },
                { id: 'lp-g-1-3', text: 'Scribe + Data Scraper installed', passed: true },
                { id: 'lp-g-1-4', text: 'GHL 7-day curriculum complete', passed: false },
                { id: 'lp-g-1-5', text: 'Cold email sequence v1 drafted', passed: true },
                { id: 'lp-g-1-6', text: 'Client Service Agreement v1 drafted + CEO review started', passed: true },
                { id: 'lp-g-1-7', text: 'Competitive intel report complete', passed: true },
                { id: 'lp-g-1-8', text: 'Chris 1099 Agreement v1 drafted', passed: true },
                { id: 'lp-g-1-9', text: 'Wave accounting set up', passed: false },
                { id: 'lp-g-1-10', text: 'v2 memory system installed + dual-read active', passed: true },
                { id: 'lp-g-1-11', text: 'Knowledge Base FAQ drafted (8 articles)', passed: true },
            ]
        },
        {
            week: 2, name: 'BUILD THE PRODUCT + LEGAL FOUNDATION', theme: 'Build Once, Deploy Forever',
            dates: 'Apr 19-25', dateStart: '2026-04-19', dateEnd: '2026-04-25',
            status: 'active',
            budget: { estimated: 1190, actual: 433 },
            note: 'Rename sprint (D-0039) + LLC filing + skills install consumed Week 2. Snapshot work shifts to Week 3 post TX SOS approval.',
            estHours: { jasper: '10-12', agent: '8-10' },
            jasperTasks: [
                { id: 'lp-j-2-0a', text: 'Trademark search on "SANO Solutions" — conflict found', status: 'done' },
                { id: 'lp-j-2-0b', text: 'Trademark + TX name cleared for "SANO Systems"', status: 'done' },
                { id: 'lp-j-2-0c', text: 'Northwest Registered Agent paid ($125)', status: 'done' },
                { id: 'lp-j-2-0d', text: 'SOSDirect account + Form 205 filed ($308)', status: 'done' },
                { id: 'lp-j-2-0e', text: 'Wait for TX SOS approval email (1-3 biz days)', status: 'in-progress' },
                { id: 'lp-j-2-0f', text: 'EIN from IRS — once LLC approved', status: 'blocked' },
                { id: 'lp-j-2-0g', text: 'Mercury business bank — once EIN issued', status: 'blocked' },
                { id: 'lp-j-2-0h', text: 'Buy sanosystems.com domain', status: 'not-started' },
                { id: 'lp-j-2-1', text: 'Purchase best HVAC snapshot ($50-150)', status: 'not-started', note: 'Blocked on GHL SaaS Pro subscription, which is blocked on Mercury card' },
                { id: 'lp-j-2-2', text: 'Deploy snapshot to sandbox sub-account', status: 'not-started' },
                { id: 'lp-j-2-3', text: 'Scribe ON → Walk through entire HVAC snapshot', status: 'not-started' },
                { id: 'lp-j-2-4', text: 'Review agent-drafted legal agreements', status: 'not-started' },
                { id: 'lp-j-2-5', text: 'Send legal drafts to TX attorney ($300-500)', status: 'not-started', note: 'Can go once LLC filed (done) — attorney wants to see LLC name on MSA' },
                { id: 'lp-j-2-6', text: 'Customize HVAC snapshot: brand test (fake client)', status: 'not-started' },
                { id: 'lp-j-2-7', text: 'Record kickoff call walkthrough (Scribe running)', status: 'not-started' },
                { id: 'lp-j-2-8', text: 'Build client onboarding intake form in GHL', status: 'not-started' },
                { id: 'lp-j-2-9', text: 'GHL advanced practice (2 hrs/day)', status: 'not-started' },
            ],
            agentTasks: [
                { id: 'lp-a-2-1', text: 'Generate onboarding intake form questions', agent: 'Antigravity', status: 'not-started' },
                { id: 'lp-a-2-2', text: 'Build welcome email sequence (5 emails)', agent: 'Builder', status: 'not-started' },
                { id: 'lp-a-2-3', text: 'Create 5 knowledge base FAQ articles', agent: 'Builder', status: 'not-started' },
                { id: 'lp-a-2-4', text: 'Draft voice agent scripts (per tier)', agent: 'Builder', status: 'not-started' },
                { id: 'lp-a-2-5', text: 'Write early access outreach email', agent: 'Builder', status: 'not-started' },
                { id: 'lp-a-2-6', text: 'Generate monthly report template', agent: 'Builder', status: 'not-started' },
                { id: 'lp-a-2-7', text: 'Social media batch week 2 (10 posts)', agent: 'Builder', status: 'not-started' },
            ],
            gate: [
                { id: 'lp-g-2-0a', text: 'Business name legally cleared (trademark + TX availability)', passed: true },
                { id: 'lp-g-2-0b', text: 'Registered Agent contracted (Northwest, Texas)', passed: true },
                { id: 'lp-g-2-0c', text: 'LLC Certificate of Formation filed with TX SOS', passed: true },
                { id: 'lp-g-2-0d', text: 'LLC approval received (stamped Certificate)', passed: false, note: 'Pending TX SOS review 1-3 biz days' },
                { id: 'lp-g-2-0e', text: 'EIN obtained from IRS', passed: false, note: 'Blocked on LLC approval' },
                { id: 'lp-g-2-0f', text: 'Business bank account opened', passed: false, note: 'Blocked on EIN' },
                { id: 'lp-g-2-0g', text: 'Domain sanosystems.com secured', passed: false },
                { id: 'lp-g-2-1', text: 'HVAC snapshot deployed and tested', passed: false, note: 'Deferred to Week 3 — blocked on GHL Pro activation' },
                { id: 'lp-g-2-2', text: 'All automations verified firing', passed: false },
                { id: 'lp-g-2-3', text: 'Onboarding intake form live', passed: false },
                { id: 'lp-g-2-4', text: 'Welcome email sequence loaded', passed: false },
                { id: 'lp-g-2-5', text: 'Legal drafts sent to attorney', passed: false },
                { id: 'lp-g-2-6', text: '7-day GHL curriculum fully complete', passed: false },
            ]
        },
        {
            week: 3, name: 'POLISH THE PRODUCT', theme: 'Make It Bulletproof',
            dates: 'Apr 26 - May 2', dateStart: '2026-04-26', dateEnd: '2026-05-02',
            status: 'locked',
            budget: { estimated: 200, actual: 0 },
            estHours: { jasper: '8-10', agent: '6-8' },
            jasperTasks: [
                { id: 'lp-j-3-1', text: 'Snapshot HVAC sub-account → Gold Standard product', status: 'not-started' },
                { id: 'lp-j-3-2', text: 'Deploy snapshot to fresh account → verify clean', status: 'not-started' },
                { id: 'lp-j-3-3', text: 'Set up GHL Conversation AI with knowledge base', status: 'not-started' },
                { id: 'lp-j-3-4', text: 'Set up GHL Reviews AI (auto-pilot)', status: 'not-started' },
                { id: 'lp-j-3-5', text: 'Record 3 tutorial videos (Guidde/Clueso)', status: 'not-started' },
                { id: 'lp-j-3-6', text: 'Email warmup check (Day 25)', status: 'not-started' },
                { id: 'lp-j-3-7', text: 'GHL advanced: workflows + automations (1 hr/day)', status: 'not-started' },
            ],
            agentTasks: [
                { id: 'lp-a-3-1', text: 'Build plumber snapshot (clone + customize)', agent: 'Antigravity', status: 'not-started' },
                { id: 'lp-a-3-2', text: 'Generate AI proposal template content', agent: 'Builder', status: 'not-started' },
                { id: 'lp-a-3-3', text: 'Write 5 more knowledge base articles', agent: 'Builder', status: 'not-started' },
                { id: 'lp-a-3-4', text: 'Create case study template', agent: 'Builder', status: 'not-started' },
                { id: 'lp-a-3-5', text: 'Social media batch week 3', agent: 'Builder', status: 'not-started' },
                { id: 'lp-a-3-6', text: 'Draft early access landing page copy', agent: 'Builder', status: 'not-started' },
                { id: 'lp-a-3-7', text: 'Weekly business review #1', agent: 'Builder', status: 'not-started' },
            ],
            gate: [
                { id: 'lp-g-3-1', text: 'Gold-standard snapshot finalized and tested', passed: false },
                { id: 'lp-g-3-2', text: 'Plumber snapshot v1 ready', passed: false },
                { id: 'lp-g-3-3', text: 'Conversation AI trained and responding', passed: false },
                { id: 'lp-g-3-4', text: 'Reviews AI in auto-pilot mode', passed: false },
                { id: 'lp-g-3-5', text: '3 tutorial videos recorded', passed: false },
                { id: 'lp-g-3-6', text: 'Knowledge base: 10+ articles', passed: false },
            ]
        },
        {
            week: 4, name: 'SALES INFRASTRUCTURE', theme: 'Build the Pipeline',
            dates: 'May 3-9', dateStart: '2026-05-03', dateEnd: '2026-05-09',
            status: 'locked',
            budget: { estimated: 500, actual: 0 },
            estHours: { jasper: '8-10', agent: '5-7' },
            jasperTasks: [
                { id: 'lp-j-4-1', text: 'Review attorney feedback on legal agreements', status: 'not-started' },
                { id: 'lp-j-4-2', text: 'Scrape first lead list: 50 HVAC companies Houston', status: 'not-started' },
                { id: 'lp-j-4-3', text: 'Review + approve cold email sequences', status: 'not-started' },
                { id: 'lp-j-4-4', text: 'Load leads into Instantly + configure campaign', status: 'not-started' },
                { id: 'lp-j-4-5', text: 'Claim Google Business Profile', status: 'not-started' },
                { id: 'lp-j-4-6', text: 'Set up SANO sales pipeline in GHL', status: 'not-started' },
                { id: 'lp-j-4-7', text: 'FULL DRY-RUN: fake client end-to-end', status: 'not-started' },
                { id: 'lp-j-4-8', text: 'GHL advanced: snapshots + reporting (1 hr/day)', status: 'not-started' },
            ],
            agentTasks: [
                { id: 'lp-a-4-1', text: 'Enrich 50 leads with decision-maker info', agent: 'Builder', status: 'not-started' },
                { id: 'lp-a-4-2', text: 'Generate personalized first lines (top 20)', agent: 'Builder', status: 'not-started' },
                { id: 'lp-a-4-3', text: 'Create SANO sales deck / one-pager', agent: 'Builder', status: 'not-started' },
                { id: 'lp-a-4-4', text: 'Social media batch week 4', agent: 'Builder', status: 'not-started' },
                { id: 'lp-a-4-5', text: 'Weekly business review #2', agent: 'Builder', status: 'not-started' },
                { id: 'lp-a-4-6', text: 'Set up Sentinel GHL health monitoring via MCP', agent: 'Antigravity', status: 'not-started' },
            ],
            gate: [
                { id: 'lp-g-4-1', text: 'Legal agreements finalized by attorney', passed: false },
                { id: 'lp-g-4-2', text: 'Lead list scraped, enriched, loaded into Instantly', passed: false },
                { id: 'lp-g-4-3', text: 'Cold email campaign configured (not sent yet)', passed: false },
                { id: 'lp-g-4-4', text: 'Full end-to-end dry-run passed', passed: false },
                { id: 'lp-g-4-5', text: 'Google Business Profile claimed', passed: false },
                { id: 'lp-g-4-6', text: 'Overnight agents producing content nightly', passed: false },
            ]
        },
        {
            week: 5, name: 'SOFT LAUNCH', theme: 'First Shots Fired',
            dates: 'May 10-16', dateStart: '2026-05-10', dateEnd: '2026-05-16',
            status: 'locked',
            budget: { estimated: 100, actual: 0 },
            estHours: { jasper: '10-14', agent: '5-7' },
            jasperTasks: [
                { id: 'lp-j-5-1', text: 'Final warmup verification (Day 33)', status: 'not-started' },
                { id: 'lp-j-5-2', text: 'LAUNCH cold email campaign (15-25/day/account)', status: 'not-started' },
                { id: 'lp-j-5-3', text: 'Post early access announcement on social', status: 'not-started' },
                { id: 'lp-j-5-4', text: 'Monitor replies daily (AM + PM)', status: 'not-started' },
                { id: 'lp-j-5-5', text: 'Respond to interested prospects (book calls)', status: 'not-started' },
                { id: 'lp-j-5-6', text: 'Conduct discovery/sales calls', status: 'not-started' },
                { id: 'lp-j-5-7', text: 'Scrape second lead list: 50 plumbing companies', status: 'not-started' },
                { id: 'lp-j-5-8', text: 'Week 1 cold email performance review', status: 'not-started' },
            ],
            agentTasks: [
                { id: 'lp-a-5-1', text: 'Monitor email deliverability metrics', agent: 'Sentinel', status: 'not-started' },
                { id: 'lp-a-5-2', text: 'A/B test subject line analysis', agent: 'Builder', status: 'not-started' },
                { id: 'lp-a-5-3', text: 'Draft follow-up sequences for warm replies', agent: 'Builder', status: 'not-started' },
                { id: 'lp-a-5-4', text: 'Generate prospect-specific call prep briefs', agent: 'Builder', status: 'not-started' },
                { id: 'lp-a-5-5', text: 'Social media batch week 5', agent: 'Builder', status: 'not-started' },
                { id: 'lp-a-5-6', text: 'Weekly business review #3', agent: 'Builder', status: 'not-started' },
            ],
            gate: [
                { id: 'lp-g-5-1', text: 'Cold email live and sending', passed: false },
                { id: 'lp-g-5-2', text: 'Deliverability > 95%', passed: false },
                { id: 'lp-g-5-3', text: 'First replies received and responded to', passed: false },
                { id: 'lp-g-5-4', text: 'At least 1 discovery call booked', passed: false },
                { id: 'lp-g-5-5', text: 'Second lead list ready', passed: false },
            ]
        },
        {
            week: 6, name: 'FIRST CLIENT SPRINT', theme: 'Land and Deliver',
            dates: 'May 17-23', dateStart: '2026-05-17', dateEnd: '2026-05-23',
            status: 'locked',
            budget: { estimated: 0, actual: 0 },
            estHours: { jasper: '10-15', agent: '5-7' },
            jasperTasks: [
                { id: 'lp-j-6-1', text: 'Conduct sales calls + send proposals', status: 'not-started' },
                { id: 'lp-j-6-2', text: '⭐ CLOSE FIRST CLIENT', status: 'not-started' },
                { id: 'lp-j-6-3', text: 'Deploy first real client sub-account', status: 'not-started' },
                { id: 'lp-j-6-4', text: 'Conduct first real kickoff call', status: 'not-started' },
                { id: 'lp-j-6-5', text: 'DNS + Stripe + A2P setup for client', status: 'not-started' },
                { id: 'lp-j-6-6', text: 'Create first client performance dashboard', status: 'not-started' },
            ],
            agentTasks: [
                { id: 'lp-a-6-1', text: 'Generate proposal for each qualified prospect', agent: 'Builder', status: 'not-started' },
                { id: 'lp-a-6-2', text: 'Auto-create sub-account via MCP after close', agent: 'Antigravity', status: 'not-started' },
                { id: 'lp-a-6-3', text: 'Deploy snapshot + populate client data', agent: 'Antigravity', status: 'not-started' },
                { id: 'lp-a-6-4', text: 'Post-kickoff: send summary + next steps email', agent: 'Builder', status: 'not-started' },
                { id: 'lp-a-6-5', text: 'Social media batch week 6', agent: 'Builder', status: 'not-started' },
                { id: 'lp-a-6-6', text: 'First client onboarding QA check', agent: 'Auditor', status: 'not-started' },
            ],
            gate: [
                { id: 'lp-g-6-1', text: 'First paying client closed ($997 setup + $397/mo)', passed: false },
                { id: 'lp-g-6-2', text: 'Client sub-account live and operational', passed: false },
                { id: 'lp-g-6-3', text: 'Kickoff call completed', passed: false },
                { id: 'lp-g-6-4', text: 'All automations verified on real client', passed: false },
                { id: 'lp-g-6-5', text: 'Client has access to their system', passed: false },
            ]
        },
        {
            week: 7, name: 'SCALE THE PIPELINE', theme: 'Compound the System',
            dates: 'May 24-30', dateStart: '2026-05-24', dateEnd: '2026-05-30',
            status: 'locked',
            budget: { estimated: 1700, actual: 0 },
            estHours: { jasper: '10-12', agent: '5-7' },
            jasperTasks: [
                { id: 'lp-j-7-1', text: 'Continue sales calls + proposals', status: 'not-started' },
                { id: 'lp-j-7-2', text: 'Onboard any new clients closed', status: 'not-started' },
                { id: 'lp-j-7-3', text: 'Check in with Client #1 (proactive success)', status: 'not-started' },
                { id: 'lp-j-7-4', text: 'Begin Chris Simon training prep materials', status: 'not-started' },
                { id: 'lp-j-7-5', text: 'Scrape lead list #3 (new niche or geography)', status: 'not-started' },
            ],
            agentTasks: [
                { id: 'lp-a-7-1', text: 'Generate Chris training curriculum', agent: 'Builder', status: 'not-started' },
                { id: 'lp-a-7-2', text: 'Client #1 first week performance report', agent: 'Builder', status: 'not-started' },
                { id: 'lp-a-7-3', text: 'Expand cold email to list #3', agent: 'Builder', status: 'not-started' },
                { id: 'lp-a-7-4', text: 'Social media batch week 7', agent: 'Builder', status: 'not-started' },
                { id: 'lp-a-7-5', text: 'Weekly business review #5', agent: 'Builder', status: 'not-started' },
                { id: 'lp-a-7-6', text: 'Case study draft (if Client #1 showing results)', agent: 'Builder', status: 'not-started' },
            ],
            gate: [
                { id: 'lp-g-7-1', text: 'Chris training materials prepared', passed: false },
                { id: 'lp-g-7-2', text: 'Client #1 still active and satisfied', passed: false },
                { id: 'lp-g-7-3', text: '2+ lead lists loaded into Instantly', passed: false },
                { id: 'lp-g-7-4', text: 'Cold email sending at full volume', passed: false },
            ]
        },
        {
            week: 8, name: 'LAUNCH READY', theme: 'Chris Arrives. The Machine is Running.',
            dates: 'May 31 - Jun 6', dateStart: '2026-05-31', dateEnd: '2026-06-06',
            status: 'locked',
            budget: { estimated: 1700, actual: 0 },
            estHours: { jasper: '12-15', agent: '3-5' },
            jasperTasks: [
                { id: 'lp-j-8-1', text: 'Chris Day 1 (June 1): Orientation + system tour', status: 'not-started' },
                { id: 'lp-j-8-2', text: 'Hand Chris sales deck, proposals, battle cards', status: 'not-started' },
                { id: 'lp-j-8-3', text: 'Review all agent outputs from 8 weeks', status: 'not-started' },
                { id: 'lp-j-8-4', text: 'Monthly financial review (Wave P&L)', status: 'not-started' },
                { id: 'lp-j-8-5', text: 'Set Month 2 targets with Chris', status: 'not-started' },
            ],
            agentTasks: [
                { id: 'lp-a-8-1', text: 'Generate Chris prospect lists (pre-enriched)', agent: 'Builder', status: 'not-started' },
                { id: 'lp-a-8-2', text: 'Create Chris daily talking points', agent: 'Builder', status: 'not-started' },
                { id: 'lp-a-8-3', text: 'Month 1 business metrics report', agent: 'Builder', status: 'not-started' },
                { id: 'lp-a-8-4', text: 'Social media batch week 8', agent: 'Builder', status: 'not-started' },
                { id: 'lp-a-8-5', text: 'All systems health audit', agent: 'Sentinel', status: 'not-started' },
            ],
            gate: [
                { id: 'lp-g-8-1', text: 'Chris trained and selling', passed: false },
                { id: 'lp-g-8-2', text: '1-3 paying clients live', passed: false },
                { id: 'lp-g-8-3', text: 'Overnight agent pipeline running nightly', passed: false },
                { id: 'lp-g-8-4', text: 'Knowledge base: 15+ articles', passed: false },
                { id: 'lp-g-8-5', text: 'Cold email: 3+ active campaigns', passed: false },
                { id: 'lp-g-8-6', text: 'All legal agreements signed', passed: false },
                { id: 'lp-g-8-7', text: 'Financial systems active (Wave tracking)', passed: false },
            ]
        },
    ],

    // ---- Intel & Docs Reference ----
    intel: [
        {
            category: 'Strategy',
            icon: '🎯',
            docs: [
                { name: 'Master Launch Plan', desc: 'THE PLAN — AI-first 8-week launch calendar', path: 'docs/strategy/master-launch-plan.md', status: 'current' },
                { name: 'Pre-Implementation Plan', desc: 'GHL Day 1 playbook + dependency map', path: 'docs/strategy/pre-implementation-plan.md', status: 'current' },
                { name: 'Business Model & Vision', desc: 'Core value prop and positioning', path: 'docs/strategy/business-model-and-vision.md', status: 'current' },
                { name: 'Growth Roadmap', desc: 'Milestones and trajectory', path: 'docs/strategy/growth-roadmap.md', status: 'current' },
                { name: 'Week 1 Deep Dive', desc: 'Day-by-day execution plan for this week', path: 'docs/strategy/week1-deep-dive.md', status: 'current' },
            ]
        },
        {
            category: 'Research',
            icon: '🔬',
            docs: [
                { name: 'AI Integration Deep Dive', desc: '22 functions mapped to AI — 75-80% Day 1 automation', path: 'docs/research/04-ai-integration-deep-dive.md', status: 'key' },
                { name: 'GHL Deep Dive', desc: 'API, MCP (269+ tools), snapshots, learning curve', path: 'docs/research/02-ghl-deep-dive.md', status: 'current' },
                { name: 'Full Scope Report', desc: 'Free tools, validation, revenue projections', path: 'docs/research/03-full-scope-report.md', status: 'current' },
                { name: 'Agent Audit', desc: 'Pipeline bugs found + fixed, architecture verified', path: 'docs/research/01-agent-audit.md', status: 'current' },
                { name: 'Discovery Synthesis', desc: 'CEO answers to 68 discovery questions', path: 'docs/research/00-discovery-synthesis.md', status: 'current' },
                { name: 'SMS/Voice Cap Research', desc: 'Industry benchmarks for GHL agency pricing (Twilio costs, caps per tier)', path: 'msa_review.md', status: 'current' },
            ]
        },
        {
            category: 'Sales & Outreach',
            icon: '📞',
            docs: [
                { name: 'Mass Outreach Bible', desc: 'Infrastructure, compliance, sequences, 90-day plan', path: 'docs/outreach/mass-outreach-bible.md', status: 'key' },
                { name: 'Email Infrastructure Guide', desc: 'DNS setup, warmup status, remaining steps', path: 'docs/outreach/email-infrastructure-setup-guide.md', status: 'current' },
                { name: 'Package Proposal v1', desc: 'Full proposal with tool matrix + stress test (needs pricing update)', path: 'docs/sales/package-proposal-v1.md', status: 'needs-update' },
                { name: 'Compensation Structure', desc: 'Chris: $1,200/wk + 20% setup + 5% recurring', path: 'docs/sales/compensation-structure.md', status: 'current' },
                { name: 'Sales Playbook', desc: 'Pitch scripts, demo flow (needs pricing update)', path: 'docs/sales/sales-playbook.md', status: 'needs-update' },
            ]
        },
        {
            category: 'Legal',
            icon: '⚖️',
            docs: [
                { name: 'Liability & Contracts', desc: 'MSA scope, compliance requirements', path: 'docs/legal/liability-and-contracts.md', status: 'current' },
                { name: 'Client Service Agreement (MSA)', desc: 'CEO review in progress — 5 flags addressed, ready for attorney', path: 'agent-output/legal/client-service-agreement-draft.md', status: 'key' },
                { name: 'Chris 1099 Agreement', desc: 'AI draft complete — awaiting CEO review', path: 'agent-output/legal/chris-1099-agreement-draft.md', status: 'pending' },
            ]
        },
        {
            category: 'Agent Outputs (6 drafts — CEO review)',
            icon: '🤖',
            docs: [
                { name: 'Cold Email Sequences', desc: 'HVAC — 5 emails, needs CEO review', path: 'agent-output/email/cold-sequence-v1.md', status: 'pending' },
                { name: 'Competitive Intel', desc: 'Sprint 01 — Houston agency pricing teardown', path: 'agent-output/research/sprint-01-market-intelligence-2026-04-06.md', status: 'current' },
                { name: 'Knowledge Base FAQ', desc: '8 FAQ articles for client support', path: 'agent-output/training/knowledge-base-faq-v1.md', status: 'pending' },
                { name: 'Social Media Batch', desc: '15 posts + 3-week calendar', path: 'agent-output/drafts/social-media-batch-v1.md', status: 'pending' },
            ]
        },
        {
            category: 'Brain (v2 Memory System)',
            icon: '🧠',
            docs: [
                { name: 'BOOT.md', desc: 'Session entry file — auto-regenerated each session', path: 'brain/v2/BOOT.md', status: 'current' },
                { name: 'IDENTITY.md', desc: 'Stable brand, pricing, team — canonical', path: 'brain/v2/IDENTITY.md', status: 'key' },
                { name: 'NOW.md', desc: 'This week snapshot (~400 words, rewritten Mon)', path: 'brain/v2/NOW.md', status: 'current' },
                { name: 'TASKS.jsonl', desc: '34 tasks tracked — machine-readable ledger', path: 'brain/v2/TASKS.jsonl', status: 'current' },
                { name: 'DECISIONS.jsonl', desc: '20 decisions logged — append-only', path: 'brain/v2/DECISIONS.jsonl', status: 'current' },
                { name: 'PROTOCOL.md', desc: 'Operating manual for all agents', path: 'brain/v2/PROTOCOL.md', status: 'key' },
            ]
        },
        {
            category: 'Key Contacts',
            icon: '👥',
            docs: [
                { name: 'Chris Simon', desc: 'Head of Sales — starts June 1, 2026', path: null, status: 'confirmed' },
                { name: 'TX Attorney', desc: 'TBD — needed for MSA + 1099 review ($300-500)', path: null, status: 'needed' },
                { name: 'GHL Support', desc: 'support.gohighlevel.com — active', path: null, status: 'confirmed' },
            ]
        },
    ],

    // ---- Key Metrics ----
    metrics: {
        coldEmailsSent: 0,
        emailWarmupDay: 8,
        emailWarmupTarget: 14,
        emailWarmupReadyDate: 'April 21',
        emailOpenRate: 0,
        emailReplies: 0,
        leadsInPipeline: 6,
        discoveryCalls: 0,
        proposalsSent: 1,
        clientsClosed: 0,
        mrr: 0,
        ghlSessionsCompleted: 2,
        ghlSessionsTarget: 7,
        ghlCustomFields: 11,
        ghlContacts: 4,
        ghlDeals: 6,
        ghlWorkflowsBuilt: 4,
        ghlWorkflowsTarget: 5,
        ghlMcpTools: 215,
        sopsAutoGenerated: 0,
        agentTasksCompleted: 49,
        kbArticles: 8,
        agentDraftsComplete: 6,
        agentDraftsReviewed: 1,
        v2TasksTotal: 34,
        v2TasksDone: 4,
        v2TasksInProgress: 2,
        v2DecisionsLogged: 20,
        weekGatesPassedTotal: 8,
        weekGatesTotal: 9,
    },

    // ---- 8-Week Timeline (Updated + Dependencies — Feature 3) ----
    weeks: [
        { num: 0, name: 'Pre-Launch', dates: 'Apr 4-10', theme: 'Foundation + Cold Email Infra', status: 'done', blockedBy: [] },
        { num: 1, name: 'Foundation', dates: 'Apr 12-18', theme: 'GHL + MCP + Agent Pipeline', status: 'active', blockedBy: [], blocks: ['W2 Build Product', 'W4 Sales Infra'] },
        { num: 2, name: 'Build Product', dates: 'Apr 19-25', theme: 'Build Once, Deploy Forever', status: 'upcoming', blockedBy: ['W1 GHL Setup', 'W1 MCP Connection'] },
        { num: 3, name: 'Polish', dates: 'Apr 26 - May 2', theme: 'Make It Bulletproof', status: 'upcoming', blockedBy: ['W2 HVAC Snapshot'] },
        { num: 4, name: 'Sales Infra', dates: 'May 3-9', theme: 'Build the Pipeline', status: 'upcoming', blockedBy: ['W1 GHL Setup', 'W3 Golden Snapshot', 'W0 Email Warmup (Day 14)'] },
        { num: 5, name: 'Soft Launch', dates: 'May 10-16', theme: 'First Shots Fired', status: 'upcoming', blockedBy: ['W4 Lead Lists', 'W4 Legal Approved'] },
        { num: 6, name: 'First Client', dates: 'May 17-23', theme: 'Land and Deliver', status: 'upcoming', blockedBy: ['W5 Cold Emails Live'] },
        { num: 7, name: 'Scale', dates: 'May 24-31', theme: 'Scale the Pipeline', status: 'upcoming', blockedBy: ['W6 First Client Delivered'] },
        { num: 8, name: 'LAUNCH', dates: 'Jun 1+', theme: 'Chris Arrives. Machine Running.', status: 'upcoming', blockedBy: ['W7 Sales Pipeline Active'] },
    ],

    // ---- Decision Journal (ENHANCED — Feature 4, synced with DECISIONS.jsonl) ----
    decisions: [
        { date: 'Apr 15', decision: 'Cross-agent write safety added to PROTOCOL.md (D-0020)', impact: 'Prevents conflicts between Antigravity + OpenClaw on TASKS.jsonl', tag: 'infra', reasoning: 'Multiple agents editing TASKS.jsonl could overwrite each other. CHANGELOG.jsonl as tiebreaker + mandatory logging on every status change prevents drift.', alternatives: 'File locking → rejected: not practical across different agent runtimes.' },
        { date: 'Apr 15', decision: 'Total Transformation tier reinstated at $14,997+$4,997 (D-0019)', impact: '4-tier pricing ladder restored', tag: 'pricing', reasoning: 'Removing the top tier left no aspirational option. TT positioned as "sell after case studies" — not actively marketed but available for high-value clients.', alternatives: 'Keep at 3 tiers → rejected: loses revenue ceiling for enterprise-adjacent clients.' },
        { date: 'Apr 15', decision: 'Pricing LOCKED at 4 tiers — Starter/Growth/Scale/TT (D-0017)', impact: 'Final pricing — no more changes', tag: 'pricing', reasoning: 'Simpler 3-tier core ladder (Starter $997+$397, Growth $2,497+$999, Scale $4,997+$1,995) with TT as premium anchor. Supersedes all prior pricing decisions.', alternatives: 'More tiers → rejected: confuses Chris, slows sales. Fewer tiers → rejected: leaves money on table.' },
        { date: 'Apr 15', decision: 'v2 Memory Scaffold adopted (D-0001)', impact: 'Eliminates agent context drift', tag: 'infra', reasoning: 'MASTER_STATE.md doing too many jobs, DAILY_LATEST.md overwritten every session, no machine-readable task ledger. v2 splits into IDENTITY + NOW + BOOT + TASKS.jsonl + DECISIONS.jsonl + CHANGELOG.jsonl.', alternatives: 'Keep legacy single-file brain → rejected: proven to cause drift across 10+ sessions.' },
        { date: 'Apr 11', decision: 'VA eliminated — AI agents replace all functions', impact: '$850/mo saved permanently', tag: 'team', reasoning: '6-phase research showed AI agents (OpenClaw + Antigravity + Sentinel) can handle 100% of planned VA tasks.', alternatives: 'Keep VA at $850/mo as backup → rejected: no unique value VA provides that agents can\'t.' },
        { date: 'Apr 11', decision: 'GHL MCP adopted — Claude controls GHL directly', impact: '215 tools, zero manual clicking', tag: 'tools', reasoning: 'GHL MCP integration lets Claude create contacts, manage pipelines, send messages, build workflows — all via API.', alternatives: 'Manual GHL only → rejected: 10x slower. Zapier bridge → rejected: adds cost + complexity.' },
        { date: 'Apr 11', decision: 'Buffer eliminated — GHL Social Planner via MCP', impact: '$0 vs $15/mo', tag: 'tools', reasoning: 'GHL has built-in social media planner. Agents can schedule posts via MCP.', alternatives: 'Keep Buffer free tier → rejected: limited, another login.' },
        { date: 'Apr 11', decision: 'Scribe adopted — auto-SOP generation', impact: 'Learning = documentation (free)', tag: 'tools', reasoning: 'Scribe auto-captures clicking workflows as documented SOPs.', alternatives: 'Manual SOP writing → rejected: 3x slower.' },
        { date: 'Apr 11', decision: 'Overnight agents: dynamic proposals, not fixed schedule', impact: 'Higher ROI per night', tag: 'agents', reasoning: 'Dynamic proposals let agents assess current priorities, suggest highest-impact work, and get CEO approval before executing.', alternatives: 'Cron-based fixed schedule → rejected: rigid, wastes API tokens.' },
        { date: 'Apr 9', decision: 'Marketing budget: $3K pre-launch (deferred to post-revenue)', impact: 'Cash preserved', tag: 'marketing', reasoning: 'With $18.9K runway and no revenue, cold email is near-zero cost. Defer paid ads until setup fee revenue covers them.', alternatives: 'Spend $3K now on Facebook ads → rejected: no product to sell yet.' },
        { date: 'Apr 9', decision: '$997 early-access setup pricing (SUPERSEDED by D-0017)', impact: 'Validated model without Chris', tag: 'pricing', reasoning: 'Originally set discounted setup fee for first 5 clients. Superseded by v2 pricing lock — Starter is now $997+$397 as standard pricing.', alternatives: 'Full price from Day 1 → rejected at time: harder to close without case studies.' },
        { date: 'Apr 9', decision: 'AI drafts + real attorney review ($300-500)', impact: 'Legal costs reduced 60-70%', tag: 'legal', reasoning: 'AI can draft 90% of MSA and 1099 agreements. Attorney reviews and finalizes.', alternatives: 'DIY legal → rejected: too risky. Full attorney draft → rejected: $1.5-3K.' },
        { date: 'Apr 7', decision: '4 sending domains purchased for cold email', impact: '$40.63 total', tag: 'outreach', reasoning: 'Multiple domains distribute sending reputation risk.', alternatives: '1 domain → rejected: single point of failure.' },
        { date: 'Apr 4', decision: 'Chris compensation: $1,200/wk + 20% setup + 5% recurring', impact: 'Aligned incentives', tag: 'team', reasoning: 'Base covers living expenses. Setup commission rewards closing. Recurring commission rewards retention.', alternatives: '100% commission → rejected: too risky for Chris.' },
    ],

    // ---- Alerts / What Broke Panel (Feature 5) ----
    alerts: [
        // EMPTY = clean dashboard. Agents add entries here when things fail.
        // Structure: { id, timestamp, agent, severity ('critical'|'warning'), message, action, dismissed: false }
        // Example:
        // { id: 'alert-1', timestamp: '2026-04-12 06:30', agent: 'Sentinel', severity: 'warning', message: 'DNS check failed on sanogrowth.com — DKIM record missing', action: 'Verify DKIM record in Google Workspace admin', dismissed: false },
    ],

    // ---- Burndown Log (Feature 1) ----
    burndown: {
        projectStart: '2026-04-04',
        launchDate: '2026-06-01',
        // Daily snapshot: date → remaining tasks (jasper + ai + completed backlog)
        // Total pool = jasperTasks + aiTasks + completed = ~132 items
        log: [
            { date: 'Apr 4', remaining: 132 },
            { date: 'Apr 5', remaining: 127 },
            { date: 'Apr 6', remaining: 125 },
            { date: 'Apr 7', remaining: 121 },
            { date: 'Apr 8', remaining: 119 },
            { date: 'Apr 9', remaining: 116 },
            { date: 'Apr 10', remaining: 113 },
            { date: 'Apr 11', remaining: 108 },
            { date: 'Apr 12', remaining: 105 },
            { date: 'Apr 13', remaining: 96 },
            { date: 'Apr 14', remaining: 88 },
            { date: 'Apr 15', remaining: 78 },
        ],
    },

    prioritiesLastUpdated: '2026-04-15T14:43:00-05:00',
};

// ---- Persistence Layer ----
const STORAGE_KEY = 'sano_command_center_v6';

function saveData() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            _dataVersion: typeof DATA_VERSION !== 'undefined' ? DATA_VERSION : '',
            jasperTasks: SANO_DATA.jasperTasks,
            aiTasks: SANO_DATA.aiTasks,
            launchPlan: SANO_DATA.launchPlan,
            approvals: SANO_DATA.approvals,
            comments: SANO_DATA.comments,
            metrics: SANO_DATA.metrics,
            focusPins: SANO_DATA.focusPins,
            streakConfig: SANO_DATA.streakConfig,
            savedAt: new Date().toISOString()
        }));
    } catch (e) {
        console.warn('Failed to save data:', e);
    }
}

function loadSavedData() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            const savedVersion = parsed._dataVersion || '';
            const currentVersion = typeof DATA_VERSION !== 'undefined' ? DATA_VERSION : '';

            if (savedVersion !== currentVersion) {
                console.log('📦 Data version changed — loading fresh data');
                if (parsed.comments) SANO_DATA.comments = parsed.comments;
                saveData();
                return;
            }

            if (parsed.comments) SANO_DATA.comments = parsed.comments;
            if (parsed.metrics) SANO_DATA.metrics = parsed.metrics;
            // Restore task statuses
            if (parsed.jasperTasks) {
                parsed.jasperTasks.forEach((section, si) => {
                    if (SANO_DATA.jasperTasks[si]) {
                        section.items.forEach((item, ii) => {
                            if (SANO_DATA.jasperTasks[si].items[ii]) {
                                SANO_DATA.jasperTasks[si].items[ii].status = item.status;
                            }
                        });
                    }
                });
            }
            if (parsed.aiTasks) {
                parsed.aiTasks.forEach((section, si) => {
                    if (SANO_DATA.aiTasks[si]) {
                        section.items.forEach((item, ii) => {
                            if (SANO_DATA.aiTasks[si].items[ii]) {
                                SANO_DATA.aiTasks[si].items[ii].status = item.status;
                            }
                        });
                    }
                });

}
            // Restore launch plan statuses
            if (parsed.launchPlan) {
                parsed.launchPlan.forEach((week, wi) => {
                    if (SANO_DATA.launchPlan[wi]) {
                        if (week.jasperTasks) week.jasperTasks.forEach((t, ti) => {
                            if (SANO_DATA.launchPlan[wi].jasperTasks[ti]) SANO_DATA.launchPlan[wi].jasperTasks[ti].status = t.status;
                        });
                        if (week.agentTasks) week.agentTasks.forEach((t, ti) => {
                            if (SANO_DATA.launchPlan[wi].agentTasks[ti]) SANO_DATA.launchPlan[wi].agentTasks[ti].status = t.status;
                        });
                        if (week.gate) week.gate.forEach((g, gi) => {
                            if (SANO_DATA.launchPlan[wi].gate[gi]) SANO_DATA.launchPlan[wi].gate[gi].passed = g.passed;
                        });
                    }
                });
            }
            console.log('📦 Loaded saved data from', parsed.savedAt);
        }
    } catch (e) {
        console.warn('Failed to load saved data:', e);
    }
}

