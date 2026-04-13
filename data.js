/* ============================================
   SANO COMMAND CENTER — Data Layer v8.0
   SOURCE OF TRUTH: brain/MASTER_STATE.md,
   docs/strategy/8-week-overview.md,
   docs/strategy/marketing-battle-plan.md
   LAST UPDATED: April 12, 2026 — AI-First Architecture, VA eliminated
   ============================================ */

const DATA_VERSION = '2026-04-12-v8-ai-first';

const SANO_DATA = {

    // ---- Launch Date ----
    launchDate: new Date('2026-06-01T08:00:00-05:00'),

    // ---- Overnight Agent Tasks ----
    overnight: {
        date: 'Apr 12',
        status: 'running',  // 'running' | 'complete' | 'idle'
        startTime: '9:00 PM',
        totalCost: 0.00,
        tasks: [
            { id: 'ot-1', name: 'Client Service Agreement', agent: 'Builder', status: 'running', estCost: 0.16 },
            { id: 'ot-2', name: 'Cold Email Sequences', agent: 'Builder', status: 'queued', estCost: 0.30 },
            { id: 'ot-3', name: 'Chris 1099 Agreement', agent: 'Builder', status: 'queued', estCost: 0.16 },
            { id: 'ot-4', name: 'Competitive Intel', agent: 'Builder', status: 'queued', estCost: 0.45 },
            { id: 'ot-5', name: 'Knowledge Base (8 articles)', agent: 'Builder', status: 'queued', estCost: 1.20 },
            { id: 'ot-6', name: 'Social Media (15 posts)', agent: 'Builder', status: 'queued', estCost: 1.03 },
        ]
    },

    // ---- Launch Burndown ----
    burndown: {
        totalTasks: 132,
        dataPoints: [
            { date: '2026-04-04', remaining: 132 },
            { date: '2026-04-05', remaining: 128 },
            { date: '2026-04-06', remaining: 124 },
            { date: '2026-04-07', remaining: 119 },
            { date: '2026-04-08', remaining: 113 },
            { date: '2026-04-09', remaining: 108 },
            { date: '2026-04-10', remaining: 108 },
            { date: '2026-04-11', remaining: 108 },
            { date: '2026-04-12', remaining: 108 },
        ]
    },

    // ---- KPI Metrics ----
    kpi: {
        agentSpend: { tonight: 0.56, tonightCap: 15, month: 1.20, monthCap: 200 },
        emailWarmup: { day: 5, readyDate: '~April 21', ghlSetup: 0, ghlTotal: 37, sops: 0 },
        budget: { remaining: 18502, burn: 552, runway: '33+', breakeven: '3 clients' },
    },

    // ---- Decision Journal ----
    decisions: [
        { id: 'dec-1', date: '2026-04-12', title: 'Website v3 locked as canonical SANO site (95% done)', category: 'product', reasoning: 'Full design overhaul: gold→electric blue, 6 AI effects removed, 23-point sales copy rewrite, full QA desktop+mobile.' },
        { id: 'dec-2', date: '2026-04-12', title: 'Growth tier tagline: "The Growth Machine"', category: 'branding', reasoning: 'More benefit-oriented than "The Automation Engine". Target market (plumbers, landscapers) responds to growth language.' },
        { id: 'dec-3', date: '2026-04-12', title: 'CRM renamed → "Business Command Center"', category: 'branding', reasoning: 'Plumbers don\'t know what CRM means. More exciting, same functionality.' },
        { id: 'dec-4', date: '2026-04-11', title: 'Agent pipeline fixed — 4 bugs resolved', category: 'engineering', reasoning: 'Explore/Plan/Execute pipeline now functional. First real builder output produced ($0.08).' },
        { id: 'dec-5', date: '2026-04-11', title: 'GHL MCP discovered (269+ tools)', category: 'strategy', reasoning: 'GHL has official Claude integration via MCP. Day 1 automation jumped from 55-65% → 75-80%.' },
        { id: 'dec-6', date: '2026-04-11', title: 'VA budget ($850/mo) eliminated', category: 'finance', reasoning: 'AI agents handle content, reports, monitoring. Scribe handles SOPs. GHL MCP handles CRM ops. Runway extended 12→33+ months.' },
        { id: 'dec-7', date: '2026-04-11', title: 'Monthly overhead: $1,544 → $552/mo (64% cut)', category: 'finance', reasoning: 'GHL $497 + Instantly $30-50 + Anthropic $5-15. Everything else free tier.' },
        { id: 'dec-8', date: '2026-04-11', title: 'Buffer eliminated — GHL Social Planner via MCP', category: 'tools', reasoning: 'Agent writes + schedules social posts directly inside GHL. Zero extra cost.' },
        { id: 'dec-9', date: '2026-04-11', title: 'Starter monthly: $197 → $249/mo', category: 'pricing', reasoning: 'CEO decision — improves per-client margins, still well below competitors.' },
        { id: 'dec-10', date: '2026-04-11', title: 'DIY GHL + AI Agent restructure approved', category: 'strategy', reasoning: 'CEO learning GHL (45 min/day) + AI agent automation. Snapshot-based delivery.' },
        { id: 'dec-11', date: '2026-04-09', title: 'Founding Member: $997 setup (5 cap)', category: 'pricing', reasoning: 'Validates model without Chris, generates pre-launch revenue. Never repeated.' },
        { id: 'dec-12', date: '2026-04-09', title: 'Month 1 target: 1-3 closes', category: 'strategy', reasoning: 'Realistic, reduces desperation. 1 Growth close covers 2 weeks of costs.' },
    ],

    // ---- Week Dependencies ----
    weekDeps: {
        2: [{ label: 'GHL Setup', status: 'blocker' }, { label: 'GHL MCP Connection', status: 'blocker' }],
        3: [{ label: 'VA Skills Test', status: 'upcoming' }],
        4: [{ label: 'Attorney Review (1099, MSA)', status: 'upcoming' }],
    },

    // ---- Alert Panel (NASA-style, hidden when clean) ----
    alerts: [],

    // ---- Agent Cost Breakdown ----
    agentCosts: {
        perAgent: [
            { agent: 'Sentinel', calls: 6, spent: 0.48, model: 'haiku' },
            { agent: 'Chief of Staff', calls: 4, spent: 0.32, model: 'haiku' },
            { agent: 'Builder', calls: 1, spent: 0.08, model: 'haiku' },
        ],
        dailySpend: [
            { date: 'Apr 6', amount: 0 },
            { date: 'Apr 7', amount: 0 },
            { date: 'Apr 8', amount: 0 },
            { date: 'Apr 9', amount: 0 },
            { date: 'Apr 10', amount: 0.72 },
            { date: 'Apr 11', amount: 0.88 },
            { date: 'Apr 12', amount: 0.56 },
        ]
    },

    // ---- Intel & Docs ----
    intelDocs: [
        { category: 'Strategy', docs: [
            { title: '8-Week Launch Overview', file: 'docs/strategy/8-week-overview.md' },
            { title: 'Marketing Battle Plan', file: 'docs/strategy/marketing-battle-plan.md' },
            { title: 'Gap-to-Strength Playbook', file: 'docs/strategy/gap-playbook.md' },
            { title: 'AI Agent Briefing', file: 'docs/strategy/ai-agent-briefing.md' },
            { title: 'Pre-Implementation Plan', file: 'docs/strategy/pre-implementation-plan.md' },
        ]},
        { category: 'Sales', docs: [
            { title: 'Sales Playbook for Chris', file: 'docs/sales/sales-playbook.md' },
            { title: 'Pitch Scripts (15s + 2min)', file: 'docs/sales/pitch-scripts.md' },
            { title: 'Objection Handling Guide', file: 'docs/sales/objections.md' },
            { title: 'Commission Calculator', file: 'docs/sales/commission-calc.md' },
        ]},
        { category: 'Outreach', docs: [
            { title: 'Mass Outreach Bible', file: 'docs/outreach/mass-outreach-bible.md' },
            { title: 'Cold Email Sequences', file: 'docs/outreach/cold-email-sequences.md' },
            { title: 'Lead Scraping Guide', file: 'docs/outreach/lead-scraping.md' },
        ]},
        { category: 'Legal', docs: [
            { title: 'Client Service Agreement (draft)', file: 'docs/legal/client-msa.md' },
            { title: 'Chris 1099 Agreement (draft)', file: 'docs/legal/chris-1099.md' },
            { title: 'CAN-SPAM Compliance', file: 'docs/legal/can-spam.md' },
        ]},
        { category: 'Product', docs: [
            { title: 'GHL Tutorial Guide', file: 'docs/product/ghl-tutorial.md' },
            { title: 'Package Proposal v1', file: 'docs/product/package-proposal.md' },
            { title: 'Pricing Tiers (locked)', file: 'docs/product/pricing.md' },
            { title: 'Tool Matrix by Tier', file: 'docs/product/tool-matrix.md' },
        ]},
        { category: 'Brain Files', docs: [
            { title: 'MASTER_STATE.md', file: 'brain/MASTER_STATE.md' },
            { title: 'DAILY_LATEST.md', file: 'brain/DAILY_LATEST.md' },
            { title: 'SANO-BRIEFING.md', file: 'SANO-BRIEFING.md' },
            { title: 'HANDOFF.md', file: 'HANDOFF.md' },
            { title: 'QUALITY-GATE.md', file: 'QUALITY-GATE.md' },
        ]},
    ],

    // ---- AI Agent Task Queue ----
    aiAgentTasks: [
        {
            section: 'Tonight (Apr 12)',
            status: 'running',
            tasks: [
                { id: 'ai-1', text: 'Draft Client Service Agreement (MSA)', agent: 'Builder', estCost: 0.16, status: 'running' },
                { id: 'ai-2', text: 'Write Cold Email Sequences (HVAC + Plumber)', agent: 'Builder', estCost: 0.30, status: 'queued' },
                { id: 'ai-3', text: 'Draft Chris 1099 Agreement', agent: 'Builder', estCost: 0.16, status: 'queued' },
                { id: 'ai-4', text: 'Competitive Intel — Houston GHL agencies', agent: 'Builder', estCost: 0.45, status: 'queued' },
                { id: 'ai-5', text: 'Knowledge Base — 8 FAQ articles', agent: 'Builder', estCost: 1.20, status: 'queued' },
                { id: 'ai-6', text: 'Social Media — 15 posts for Week 1-2', agent: 'Builder', estCost: 1.03, status: 'queued' },
            ]
        },
        {
            section: 'Queued — This Week',
            status: 'upcoming',
            tasks: [
                { id: 'ai-7', text: 'Cash flow tracker (1/2/3 close scenarios)', agent: 'Antigravity', estCost: 0, status: 'queued' },
                { id: 'ai-8', text: 'VA job posting + 10 interview Qs + rubric', agent: 'Antigravity', estCost: 0, status: 'queued' },
                { id: 'ai-9', text: 'Competitive recon — battle cards for Chris', agent: 'Builder', estCost: 0.45, status: 'queued' },
                { id: 'ai-10', text: 'GHL cheat sheet — 10 key screens', agent: 'Antigravity', estCost: 0, status: 'queued' },
                { id: 'ai-11', text: 'Testimonial question guide', agent: 'Antigravity', estCost: 0, status: 'queued' },
            ]
        },
        {
            section: 'Week 3-4',
            status: 'upcoming',
            tasks: [
                { id: 'ai-12', text: 'AI personalization batch for email opening lines', agent: 'Builder', estCost: 2.00, status: 'queued' },
                { id: 'ai-13', text: 'QA review AI-generated lines (15% hallucination)', agent: 'Auditor', estCost: 0.50, status: 'queued' },
                { id: 'ai-14', text: 'Beta outreach — personalized pitches for 3 prospects', agent: 'Builder', estCost: 0.30, status: 'queued' },
                { id: 'ai-15', text: 'Google review request sequences (Day 3 + Day 7)', agent: 'Builder', estCost: 0.16, status: 'queued' },
            ]
        },
        {
            section: 'Week 5-6',
            status: 'upcoming',
            tasks: [
                { id: 'ai-16', text: 'TT "by application only" page + SOW template', agent: 'Antigravity', estCost: 0, status: 'queued' },
                { id: 'ai-17', text: 'TAM validation — Houston business data by vertical', agent: 'Builder', estCost: 0.30, status: 'queued' },
                { id: 'ai-18', text: 'Sales material copy — leave-behind, QR page, pricing', agent: 'Builder', estCost: 0.45, status: 'queued' },
                { id: 'ai-19', text: 'Founding Member proposals (custom per prospect)', agent: 'Builder', estCost: 0.30, status: 'queued' },
                { id: 'ai-20', text: 'Chris full training packet', agent: 'Antigravity', estCost: 0, status: 'queued' },
            ]
        },
        {
            section: 'Week 7-8',
            status: 'upcoming',
            tasks: [
                { id: 'ai-21', text: 'Support knowledge base — 30 common Qs', agent: 'Builder', estCost: 1.50, status: 'queued' },
                { id: 'ai-22', text: '90-day retention sequence (6 touchpoints)', agent: 'Builder', estCost: 0.45, status: 'queued' },
                { id: 'ai-23', text: 'Client "wins report" template', agent: 'Antigravity', estCost: 0, status: 'queued' },
                { id: 'ai-24', text: 'Cash flow model — actuals vs projections', agent: 'Antigravity', estCost: 0, status: 'queued' },
            ]
        },
        {
            section: 'GHL MCP (Post-Signup)',
            status: 'blocked',
            tasks: [
                { id: 'ai-25', text: 'Import HVAC snapshot via MCP', agent: 'MCP', estCost: 0, status: 'blocked' },
                { id: 'ai-26', text: 'Build missed-call text-back workflow', agent: 'MCP', estCost: 0, status: 'blocked' },
                { id: 'ai-27', text: 'Configure automated review request system', agent: 'MCP', estCost: 0, status: 'blocked' },
                { id: 'ai-28', text: 'Set up AI chatbot', agent: 'MCP', estCost: 0, status: 'blocked' },
                { id: 'ai-29', text: 'Build online booking & scheduling', agent: 'MCP', estCost: 0, status: 'blocked' },
                { id: 'ai-30', text: 'Configure CRM pipeline + stages', agent: 'MCP', estCost: 0, status: 'blocked' },
                { id: 'ai-31', text: 'Build demo sub-account', agent: 'MCP', estCost: 0, status: 'blocked' },
                { id: 'ai-32', text: 'Schedule social posts via GHL Social Planner', agent: 'MCP', estCost: 0, status: 'blocked' },
                { id: 'ai-33', text: 'Build welcome email sequence in snapshot', agent: 'MCP', estCost: 0, status: 'blocked' },
                { id: 'ai-34', text: 'Create client onboarding intake form', agent: 'MCP', estCost: 0, status: 'blocked' },
                { id: 'ai-35', text: 'Voice agent template scripts', agent: 'MCP', estCost: 0, status: 'blocked' },
                { id: 'ai-36', text: 'Internal QA — trigger every automation', agent: 'MCP', estCost: 0, status: 'blocked' },
                { id: 'ai-37', text: 'Build client "Business Command Center" dashboard', agent: 'MCP', estCost: 0, status: 'blocked' },
            ]
        },
    ],

    // ---- Budget Tracker ($19K Runway) ----
    budget: {
        starting: 19000,
        marketingBudget: 3000,
        expenses: [
            // ✅ ACTUAL SPEND
            { id: 'exp-1', item: 'Cold email domains (4 domains — Namecheap)', amount: 41, status: 'paid', week: 0 },
            { id: 'exp-2', item: 'Instantly.ai Month 1 (Growth plan)', amount: 47, status: 'paid', week: 0 },
            { id: 'exp-3', item: 'Google Workspace (2 inboxes — trial)', amount: 0, status: 'paid', week: 0 },

            // 📅 PROJECTED — Month 1
            { id: 'exp-4', item: 'Google Workspace (paid starts ~Apr 21, 2 inboxes)', amount: 15, status: 'pending', week: 2 },
            { id: 'exp-5', item: 'LLC Registration — Texas SOS', amount: 300, status: 'pending', week: 1 },
            { id: 'exp-6', item: 'GHL SaaS Pro (Month 1)', amount: 497, status: 'pending', week: 2 },

            // 📣 MARKETING BUDGET ($3K)
            { id: 'mkt-1', item: 'Facebook geo-targeted ads (pre-launch)', amount: 800, status: 'pending', week: 3 },
            { id: 'mkt-2', item: 'EDDM postcards — design + print + postage', amount: 700, status: 'pending', week: 4 },
            { id: 'mkt-3', item: 'Leave-behinds: 500 one-pagers + 500 cards + 200 magnets', amount: 550, status: 'pending', week: 4 },
            { id: 'mkt-4', item: 'Facebook retargeting ads', amount: 300, status: 'pending', week: 5 },
            { id: 'mkt-5', item: 'Beta video/materials', amount: 100, status: 'pending', week: 4 },
            { id: 'mkt-6', item: 'Marketing reserve', amount: 550, status: 'pending', week: 8 },

            // 📅 Month 2 (Chris starts)
            { id: 'exp-13', item: 'Chris Training Week 1', amount: 1700, status: 'pending', week: 7 },
            { id: 'exp-14', item: 'Chris Training Week 2', amount: 1700, status: 'pending', week: 8 },
            { id: 'exp-15', item: 'GHL SaaS Pro (Month 2)', amount: 497, status: 'pending', week: 5 },
            { id: 'exp-17', item: 'Instantly.ai (Month 2)', amount: 47, status: 'pending', week: 5 },

            // 🔧 GAP FIXES
            { id: 'gap-2', item: 'Attorney review: 1099 + Client Service Agreement', amount: 400, status: 'pending', week: 4 },

            // 💰 FOUNDING MEMBER REVENUE
            { id: 'rev-1', item: 'Founding Member #1 ($997 setup)', amount: -997, status: 'pending', week: 5 },
            { id: 'rev-2', item: 'Founding Member #2 ($997 setup)', amount: -997, status: 'pending', week: 5 },
        ],
    },

    // ---- Jasper's Tasks (formerly "Today's Priorities") ----
    prioritiesLastUpdated: '2026-04-12T17:00:00-05:00',
    priorities: [
        // ⚡ TOP 3 TODAY
        {
            id: 'today-1', text: '🥇 TODAY #1 — Add remaining 2 domains to Google Workspace + Instantly',
            priority: 'today', done: false, timeEstimate: '1 hr',
            steps: [
                '⚠️ CRITICAL: Every day of delay = ~300 lost warmup emails before June 1',
                'Add sanooutreach.com to Google Workspace as secondary domain',
                'Add sanoleads.com to Google Workspace as secondary domain',
                'Create 1 inbox per domain: jasper@sanooutreach.com, jasper@sanoleads.com',
                'Configure DNS: SPF, DKIM, DMARC for both domains',
                'Connect both to Instantly.ai via OAuth',
                'Enable warmup on both new accounts',
            ]
        },
        {
            id: 'today-2', text: '🥈 TODAY #2 — Sign up for GHL SaaS Pro + Begin GHL Deep Dive',
            priority: 'today', done: false, timeEstimate: '1.5 hrs',
            steps: [
                'Sign up at GoHighLevel.com → SaaS Pro plan ($497/mo)',
                'Set up agency account (name, logo, timezone)',
                'Start Day 1 of deep dive: explore dashboard, settings, sub-accounts',
                'Take notes on 3 key screens — build your GHL cheat sheet',
                '⚠️ You cannot sell what you\'ve never used — this is foundational',
            ]
        },
        {
            id: 'today-3', text: '🥉 TODAY #3 — Claim Google Business Profile',
            priority: 'today', done: false, timeEstimate: '30 min',
            steps: [
                'Go to business.google.com',
                'Create profile: SANO Solutions — AI Automation for Service Businesses',
                'Category: "Business Management Consultant" or "Software Company"',
                'Service area: Houston metro + suburbs',
                'Add phone, website placeholder, hours',
                'Start verification process (phone or postcard)',
            ]
        },
        // 🔴 HIGH PRIORITY
        {
            id: 'p-new-1', text: 'Claim Google Business Profile for SANO Solutions',
            priority: 'high', done: false, timeEstimate: '1 hr',
            steps: [
                'Go to business.google.com',
                'Create profile: SANO Solutions',
                'Category: "Business Management Consultant" or "Software Company"',
                'Service area: Houston metro + suburbs',
                'Add phone, website placeholder, hours',
                'Start verification process (phone or postcard)',
                'Upload 10+ photos (tool screenshots, Houston imagery, team)',
            ]
        },
        {
            id: 'p-new-2', text: 'Create Facebook Business Page',
            priority: 'high', done: false, timeEstimate: '30 min',
            steps: [
                'Create page: SANO Solutions — AI Automation for Service Businesses',
                'Add Houston, TX service area',
                'Upload profile photo + cover image',
                'Write About section with CTA',
                'Set CTA button: "Book Now" or "Learn More"',
            ]
        },
        {
            id: 'p-new-3', text: 'Create Instagram Business Profile',
            priority: 'high', done: false, timeEstimate: '20 min',
            steps: [
                'Create @sanosolutions on Instagram',
                'Link to Facebook Business Page',
                'Add logo, bio, website link',
                'Post 1-2 initial posts so profile looks active',
            ]
        },
        {
            id: 'p-new-4', text: 'Create LinkedIn Company Page',
            priority: 'high', done: false, timeEstimate: '30 min',
            steps: [
                'Create SANO Solutions company page on LinkedIn',
                'Add description, logo, Houston location',
                'Update Jasper personal profile headline',
                'Connect with 10-15 Houston business owners',
            ]
        },
        {
            id: 'p-new-5', text: 'Add remaining 2 domains to Google Workspace + Instantly',
            priority: 'high', done: false, timeEstimate: '1 hr',
            steps: [
                'Add sanooutreach.com to Google Workspace as secondary domain',
                'Add sanoleads.com to Google Workspace as secondary domain',
                'Create 1 inbox per domain',
                'Configure DNS: SPF, DKIM, DMARC for both domains',
                'Connect both to Instantly.ai via OAuth',
                'Enable warmup on both accounts',
                '⚠️ Every day of delay costs ~300 emails of send capacity before June 1',
            ]
        },
        // 🟡 MEDIUM
        {
            id: 'p-new-6', text: 'Build simple landing page on sanosolutions.ai',
            priority: 'medium', done: false, timeEstimate: '3 hrs',
            steps: [
                'One-page site: what SANO does, "Book a Demo" button, phone number',
                '1-2 tool screenshots, Houston focus',
                'Install Facebook Pixel (30 min)',
                'Install Google Analytics 4 (30 min)',
                'Set up UTM parameters for cold email links',
            ]
        },
        {
            id: 'p-new-7', text: 'Film demo video (iPhone) — missed call text-back',
            priority: 'medium', done: false, timeEstimate: '1 hr',
            steps: [
                'Film yourself demoing missed-call text-back on your phone',
                '30-60 seconds, natural, authentic',
                'Show: phone ringing, auto-text sent, customer response',
            ]
        },
        {
            id: 'p-new-8', text: 'Schedule first 2 weeks of social media posts (M/W/F)',
            priority: 'medium', done: false, timeEstimate: '1 hr',
            steps: [
                'Monday: Quick video tip (30-60 sec)',
                'Wednesday: Screenshot or demo clip',
                'Friday: Behind-the-scenes or credibility post',
            ]
        },

        // ✅ COMPLETED
        { id: 'p1', text: 'Register 4 cold email sending domains', priority: 'done', done: true, timeEstimate: '—', steps: ['✅ Apr 6 — sanooutreach.com, sanoleads.com, sanojobs.com, sanogrowth.com — $40.63'] },
        { id: 'p2', text: 'Sign up for Instantly.ai ($47/mo)', priority: 'done', done: true, timeEstimate: '—', steps: ['✅ Apr 6 — Growth plan active'] },
        { id: 'p3', text: 'Create Google Workspace inboxes (2/4 done)', priority: 'done', done: true, timeEstimate: '—', steps: ['✅ Apr 7 — jasper@sanojobs.com + jasper2@sanogrowth.com'] },
        { id: 'p4', text: 'Configure DNS: SPF, DKIM, DMARC (2/4 domains)', priority: 'done', done: true, timeEstimate: '—', steps: ['✅ Apr 7 — sanojobs.com + sanogrowth.com verified'] },
        { id: 'p5', text: 'Connect accounts to Instantly + start warmup', priority: 'done', done: true, timeEstimate: '—', steps: ['✅ Apr 7 — 2 accounts connected, warmup ON'] },
        { id: 'p6', text: 'Marketing Battle Plan audited & integrated', priority: 'done', done: true, timeEstimate: '—', steps: ['✅ Apr 9 — Full audit, $3K budget approved.'] },
        { id: 'p7', text: 'Immersive website — Scenes 1-9 built', priority: 'done', done: true, timeEstimate: '—', steps: ['✅ Apr 8-9 — 3D storybook site, scenes 1-9 + pricing'] },
        { id: 'p8', text: 'Mass Outreach Bible — reviewed & filed', priority: 'done', done: true, timeEstimate: '—', steps: ['✅ Apr 6'] },
        { id: 'p9', text: 'Pipeline Mode configured (agent delegation)', priority: 'done', done: true, timeEstimate: '—', steps: ['✅ Apr 5 — 7 brain files deployed'] },
        { id: 'p10', text: 'Pricing finalized — Growth $347/mo', priority: 'done', done: true, timeEstimate: '—', steps: ['✅ Apr 4-5 — Full 4-tier pricing locked'] },
        { id: 'p11', text: 'Gap Playbook audited & approved (17 fixes)', priority: 'done', done: true, timeEstimate: '—', steps: ['✅ Apr 9'] },
        { id: 'p12', text: 'Website v3 locked — 95% complete', priority: 'done', done: true, timeEstimate: '—', steps: ['✅ Apr 12 — Electric blue, copy rewrite, full QA'] },
        { id: 'p13', text: 'Agent pipeline fixed — 4 bugs resolved', priority: 'done', done: true, timeEstimate: '—', steps: ['✅ Apr 11 — Builder verified, $0.08/call'] },
        { id: 'p14', text: '6-phase research sprint complete', priority: 'done', done: true, timeEstimate: '—', steps: ['✅ Apr 11 — GHL MCP discovered, AI 75-80%'] },
        { id: 'p15', text: 'Command Center v8 — 5 features built', priority: 'done', done: true, timeEstimate: '—', steps: ['✅ Apr 11 — Burndown, costs, deps, decisions, alerts'] },
        { id: 'p16', text: 'Shared Brain OS complete', priority: 'done', done: true, timeEstimate: '—', steps: ['✅ Apr 10 — OpenClaw + Antigravity share brain files'] },
        { id: 'p17', text: 'SANO Agent Harness v1.5 built', priority: 'done', done: true, timeEstimate: '—', steps: ['✅ Apr 10 — Cost guards, nightly pipeline, SQLite'] },
        { id: 'p18', text: 'launchd jobs deployed (5 plists)', priority: 'done', done: true, timeEstimate: '—', steps: ['✅ Apr 10'] },
        { id: 'p19', text: 'Nightly log bridge (sano-sync)', priority: 'done', done: true, timeEstimate: '—', steps: ['✅ Apr 11 — Auto-generates nightly-report.json'] },
        { id: 'p20', text: 'Agent Eyes — 14 visual QA scripts', priority: 'done', done: true, timeEstimate: '—', steps: ['✅ Apr 11'] },
        { id: 'p21', text: 'VA eliminated — $850/mo saved', priority: 'done', done: true, timeEstimate: '—', steps: ['✅ Apr 11 — AI replaces all VA functions'] },
        { id: 'p22', text: 'Overhead cut: $1,544 → $552/mo', priority: 'done', done: true, timeEstimate: '—', steps: ['✅ Apr 11 — 64% reduction'] },
        { id: 'p23', text: 'Starter price: $197 → $249/mo', priority: 'done', done: true, timeEstimate: '—', steps: ['✅ Apr 11'] },
        { id: 'p24', text: 'DIY GHL + AI restructure approved', priority: 'done', done: true, timeEstimate: '—', steps: ['✅ Apr 11'] },
    ],

    // ---- Agent Reports ----
    agentReports: [
        { agent: 'SANO Command (OpenClaw)', time: '11:40 PM — Apr 10', message: 'Session 3: Shared Brain OS complete — ~/.claude/CLAUDE.md + Antigravity Knowledge Item created.', file: 'brain/MASTER_STATE.md', status: 'complete' },
        { agent: 'SANO Command (OpenClaw)', time: '9:20 PM — Apr 10', message: 'Session 2: Phase 4 Deploy complete. 5 launchd jobs, @Jasper_mind_bot created, cost guards live.', file: 'sano-harness/', status: 'complete' },
        { agent: 'SANO Command (OpenClaw)', time: '6:36 PM — Apr 10', message: 'Session 1: SANO Agent Harness v1.5 built — 17 files. Cost guards, nightly pipeline, SQLite ledger.', file: 'sano-harness/', status: 'complete' },
        { agent: 'Antigravity', time: '12:15 AM — Apr 9', message: 'Gap Playbook audited: 17 weak points, 10 fixes approved, 4 red flags caught.', file: 'docs/strategy/gap-playbook.md', status: 'complete' },
        { agent: 'Antigravity', time: '11:15 PM — Apr 8', message: 'Marketing Battle Plan audited. $3K marketing boost approved. 8-week plan updated.', file: 'docs/strategy/marketing-battle-plan.md', status: 'complete' },
        { agent: 'Antigravity', time: '10:30 PM — Apr 8', message: 'Immersive website — Scenes 1-9 complete. 3D motherboard journey.', file: 'sano-website/', status: 'complete' },
    ],

    // ---- 8-Week Timeline ----
    weeks: [
        { num: 0, name: 'Pre-Launch', dates: 'Apr 4-10', theme: 'Foundation & Cold Email Infra', status: 'complete', icon: '🏛️' },
        { num: 1, name: 'Foundation', dates: 'Apr 11-17', theme: 'GHL, GBP + Social + Landing Page', status: 'active', icon: '🔧' },
        { num: 2, name: 'Build Product', dates: 'Apr 18-24', theme: 'GHL Build, FB Ads, Postcard Design', status: 'upcoming', icon: '🏗️' },
        { num: 3, name: 'Polish', dates: 'Apr 25 - May 1', theme: 'Beta Approached, EDDM, Retargeting', status: 'upcoming', icon: '🧪' },
        { num: 4, name: 'Sales Infra', dates: 'May 2-8', theme: 'Beta Client, All Marketing Running', status: 'upcoming', icon: '🎯' },
        { num: 5, name: 'Soft Launch', dates: 'May 9-15', theme: 'Chris Materials, 2nd Beta', status: 'upcoming', icon: '📦' },
        { num: 6, name: 'First Client', dates: 'May 16-22', theme: 'Chris Training, FB Tuned', status: 'upcoming', icon: '🎓' },
        { num: 7, name: 'Scale', dates: 'May 23-31', theme: 'Final QA → LAUNCH', status: 'upcoming', icon: '🚀' },
    ],

    // ---- Master Build Checklist ----
    checklist: [
        {
            section: 'Pricing & Packages', week: 'Pre-launch',
            items: [
                { id: 'pkg-1', text: '4-tier pricing structure defined', status: 'done' },
                { id: 'pkg-2', text: 'Tool matrix by tier finalized', status: 'done' },
                { id: 'pkg-3', text: 'Voice minutes / SMS credits per tier defined', status: 'done' },
                { id: 'pkg-4', text: 'Voice Unlimited add-on created ($247/mo)', status: 'done' },
                { id: 'pkg-5', text: 'Growth locked at $347/mo', status: 'done' },
                { id: 'pkg-6', text: 'Financial stress test completed', status: 'done' },
                { id: 'pkg-7', text: 'Package proposal document v1.0', status: 'done' },
                { id: 'pkg-8', text: 'Chris compensation confirmed (20% setup / 5% recurring)', status: 'done' },
            ]
        },
        {
            section: 'Cold Email Infrastructure', week: 'Week 0-1',
            items: [
                { id: 'email-1', text: 'Register 4 sending domains (~$41 total)', status: 'done' },
                { id: 'email-2', text: 'Sign up for Instantly.ai ($47/mo)', status: 'done' },
                { id: 'email-3', text: 'Create Google Workspace inboxes (2/4 domains done)', status: 'in-progress' },
                { id: 'email-4', text: 'Configure SPF, DKIM, DMARC (2/4 domains done)', status: 'in-progress' },
                { id: 'email-5', text: 'Connect accounts to Instantly via OAuth (2/4 done)', status: 'in-progress' },
                { id: 'email-6', text: 'Start warmup on connected accounts (2 warming since Apr 7)', status: 'in-progress' },
                { id: 'email-7', text: 'Add sanooutreach.com + sanoleads.com to Workspace + Instantly', status: 'not-started' },
                { id: 'email-8', text: 'Set up custom tracking domains (CNAME)', status: 'not-started' },
                { id: 'email-9', text: 'Verify DNS with MXToolbox — all 4 domains green', status: 'not-started' },
            ]
        },
        {
            section: 'Marketing — Surround Sound', week: 'Week 1-8',
            items: [
                { id: 'mkt-chk-1', text: 'Claim Google Business Profile for SANO', status: 'not-started' },
                { id: 'mkt-chk-2', text: 'Create Facebook Business Page', status: 'not-started' },
                { id: 'mkt-chk-3', text: 'Create Instagram Business Profile', status: 'not-started' },
                { id: 'mkt-chk-4', text: 'Create LinkedIn Company Page', status: 'not-started' },
                { id: 'mkt-chk-5', text: 'Build simple landing page on sanosolutions.ai', status: 'not-started' },
                { id: 'mkt-chk-6', text: 'Install Facebook Pixel on site', status: 'not-started' },
                { id: 'mkt-chk-7', text: 'Install Google Analytics 4 on site', status: 'not-started' },
                { id: 'mkt-chk-8', text: 'Film demo video (missed-call text-back)', status: 'not-started' },
                { id: 'mkt-chk-9', text: 'Launch Facebook geo-targeted ads ($20-25/day)', status: 'not-started' },
                { id: 'mkt-chk-10', text: 'Design + order EDDM postcards (1,000 pieces)', status: 'not-started' },
                { id: 'mkt-chk-11', text: 'Mail postcards to Chris Week 1 territory', status: 'not-started' },
                { id: 'mkt-chk-12', text: 'Launch retargeting ads on Facebook', status: 'not-started' },
                { id: 'mkt-chk-13', text: 'Order leave-behinds: one-pagers + cards + magnets', status: 'not-started' },
                { id: 'mkt-chk-14', text: 'Get 10+ Google reviews before June 1', status: 'not-started' },
                { id: 'mkt-chk-15', text: 'Social media posting 3x/week (M/W/F)', status: 'not-started' },
                { id: 'mkt-chk-16', text: 'Film beta customer testimonial video', status: 'not-started' },
            ]
        },
        {
            section: 'Website & Brand', week: 'Week 1-8',
            items: [
                { id: 'web-1', text: 'Brand identity finalized (logo, colors, fonts, voice)', status: 'in-progress' },
                { id: 'web-2', text: 'Website v3 — 95% complete', status: 'done' },
                { id: 'web-3', text: 'Simple landing page for credibility + tracking', status: 'not-started' },
                { id: 'web-4', text: 'Deploy site to production', status: 'not-started' },
            ]
        },
        {
            section: 'Legal & Business Foundation', week: 'Week 1-2',
            items: [
                { id: 'legal-1', text: 'Register LLC — Texas SOS ($300)', status: 'not-started' },
                { id: 'legal-2', text: 'Get EIN from IRS.gov', status: 'not-started' },
                { id: 'legal-3', text: 'Open business bank account', status: 'not-started' },
                { id: 'legal-4', text: 'MSA drafted by TX attorney ($300-500)', status: 'not-started' },
                { id: 'legal-5', text: 'CAN-SPAM compliance (address, unsubscribe)', status: 'not-started' },
            ]
        },
        {
            section: 'GHL Setup & Product Build', week: 'Week 2-4',
            items: [
                { id: 'ghl-1', text: 'Sign up for GHL SaaS Pro ($497/mo)', status: 'not-started' },
                { id: 'ghl-2', text: 'Install GHL MCP (269+ tools)', status: 'not-started' },
                { id: 'ghl-3', text: 'Build gold-standard HVAC snapshot', status: 'not-started' },
                { id: 'ghl-4', text: 'Missed Call Text-Back workflow', status: 'not-started' },
                { id: 'ghl-5', text: 'Automated Review Request system', status: 'not-started' },
                { id: 'ghl-6', text: 'AI Chatbot configured', status: 'not-started' },
                { id: 'ghl-7', text: 'Online Booking & Scheduling', status: 'not-started' },
                { id: 'ghl-8', text: 'Internal QA — trigger every automation', status: 'not-started' },
            ]
        },
        {
            section: 'Agent & Automation Infrastructure', week: 'Ongoing',
            items: [
                { id: 'agent-1', text: 'OpenClaw agent on Mac Mini', status: 'done' },
                { id: 'agent-2', text: 'Pipeline Mode configured', status: 'done' },
                { id: 'agent-3', text: '7 brain files deployed', status: 'done' },
                { id: 'agent-4', text: 'Telegram bot + daily briefings', status: 'done' },
                { id: 'agent-5', text: 'Command Center v8 live', status: 'done' },
                { id: 'agent-6', text: 'SANO Agent Harness v1.5', status: 'done' },
                { id: 'agent-7', text: '@Jasper_mind_bot + Telegram listener', status: 'done' },
                { id: 'agent-8', text: 'Shared Brain OS', status: 'done' },
                { id: 'agent-9', text: 'launchd jobs (5 plists)', status: 'done' },
                { id: 'agent-10', text: 'Agent Eyes (14 QA scripts)', status: 'done' },
                { id: 'agent-11', text: 'Nightly log bridge (sano-sync)', status: 'done' },
                { id: 'agent-12', text: 'Acceleration Analysis: 16 tasks front-loaded', status: 'done' },
            ]
        },
    ],

    // ---- Approval Queue ----
    approvals: [],

    // ---- CEO Comments ----
    comments: [],

    // ---- Key Metrics ----
    metrics: {
        coldEmailsSent: 0,
        emailOpenRate: 0,
        emailReplies: 0,
        warmLeads: 0,
        cashRemaining: 18502,
    },
};

// ---- Persistence Layer ----
const STORAGE_KEY = 'sano_command_center';

function saveData() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            _dataVersion: DATA_VERSION,
            priorities: SANO_DATA.priorities,
            aiAgentTasks: SANO_DATA.aiAgentTasks,
            approvals: SANO_DATA.approvals,
            comments: SANO_DATA.comments,
            checklist: SANO_DATA.checklist,
            metrics: SANO_DATA.metrics,
            overnight: SANO_DATA.overnight,
            alerts: SANO_DATA.alerts,
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
            if (savedVersion !== DATA_VERSION) {
                console.log('📦 Data version changed — loading fresh data');
                if (parsed.comments) SANO_DATA.comments = parsed.comments;
                saveData();
                return;
            }
            if (parsed.priorities) SANO_DATA.priorities = parsed.priorities;
            if (parsed.aiAgentTasks) SANO_DATA.aiAgentTasks = parsed.aiAgentTasks;
            if (parsed.approvals) SANO_DATA.approvals = parsed.approvals;
            if (parsed.comments) SANO_DATA.comments = parsed.comments;
            if (parsed.metrics) SANO_DATA.metrics = parsed.metrics;
            if (parsed.overnight) SANO_DATA.overnight = parsed.overnight;
            if (parsed.alerts) SANO_DATA.alerts = parsed.alerts;
            if (parsed.checklist) {
                parsed.checklist.forEach((savedSection, si) => {
                    if (SANO_DATA.checklist[si]) {
                        savedSection.items.forEach((savedItem, ii) => {
                            if (SANO_DATA.checklist[si].items[ii]) {
                                SANO_DATA.checklist[si].items[ii].status = savedItem.status;
                            }
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
