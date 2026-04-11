/* ============================================
   SANO COMMAND CENTER — Data Layer v6.0
   SOURCE OF TRUTH: brain/MASTER_STATE.md,
   docs/strategy/marketing-battle-plan.md,
   docs/strategy/gap-playbook.md,
   docs/strategy/8-week-overview.md,
   docs/outreach/mass-outreach-bible.md
   LAST UPDATED: April 11, 2026 (Week 1 Start — Harness + Brain OS complete)
   ============================================ */

const DATA_VERSION = 'v6.0';

const SANO_DATA = {

    // ---- Launch Date ----
    launchDate: new Date('2026-06-01T08:00:00-05:00'),

    // ---- Budget Tracker ($19K Runway + $3K Marketing) ----
    budget: {
        starting: 19000,
        marketingBudget: 3000, // One-time launch boost approved Apr 9
        // Spending log — each entry is an actual or projected expense
        expenses: [
            // ✅ ACTUAL SPEND (Completed)
            { id: 'exp-1', item: 'Cold email domains (4 domains — Namecheap)', amount: 41, status: 'paid', week: 0 },
            { id: 'exp-2', item: 'Instantly.ai Month 1 (Growth plan)', amount: 47, status: 'paid', week: 0 },
            { id: 'exp-3', item: 'Google Workspace (2 inboxes — Business Starter trial)', amount: 0, status: 'paid', week: 0 },

            // 📅 PROJECTED — Month 1 (Weeks 1-4)
            { id: 'exp-4', item: 'Google Workspace (paid starts ~Apr 21, 2 inboxes)', amount: 15, status: 'pending', week: 2 },
            { id: 'exp-5', item: 'LLC Registration — Texas SOS', amount: 300, status: 'pending', week: 1 },
            { id: 'exp-6', item: 'GHL SaaS Pro (Month 1)', amount: 497, status: 'pending', week: 2 },
            { id: 'exp-7', item: 'GHL Snapshots (2 industries)', amount: 200, status: 'pending', week: 2 },
            { id: 'exp-8', item: 'VA Hire (Month 1)', amount: 850, status: 'pending', week: 3 },
            { id: 'exp-9', item: 'Lead scraping — Outscraper (15-20K records)', amount: 60, status: 'pending', week: 3 },
            { id: 'exp-10', item: 'Email verification (Hunter.io)', amount: 100, status: 'pending', week: 3 },
            { id: 'exp-11', item: 'GHL usage (test accounts)', amount: 50, status: 'pending', week: 4 },
            { id: 'exp-12', item: 'Misc (tools, gas, coffee)', amount: 100, status: 'pending', week: 4 },

            // 📣 MARKETING BUDGET ($3K one-time — Approved Apr 9)
            { id: 'mkt-1', item: 'Facebook geo-targeted ads (pre-launch)', amount: 800, status: 'pending', week: 3 },
            { id: 'mkt-2', item: 'EDDM postcards — design + print + postage', amount: 700, status: 'pending', week: 4 },
            { id: 'mkt-3', item: 'Leave-behinds: 500 one-pagers + 500 cards + 200 magnets', amount: 550, status: 'pending', week: 4 },
            { id: 'mkt-4', item: 'Facebook retargeting ads', amount: 300, status: 'pending', week: 5 },
            { id: 'mkt-5', item: 'Beta video/materials', amount: 100, status: 'pending', week: 4 },
            { id: 'mkt-6', item: 'Marketing reserve', amount: 550, status: 'pending', week: 8 },

            // 📅 PROJECTED — Month 2 (Weeks 5-8, Chris starts)
            { id: 'exp-13', item: 'Chris Training Week 1', amount: 1700, status: 'pending', week: 7 },
            { id: 'exp-14', item: 'Chris Training Week 2', amount: 1700, status: 'pending', week: 8 },
            { id: 'exp-15', item: 'GHL SaaS Pro (Month 2)', amount: 497, status: 'pending', week: 5 },
            { id: 'exp-16', item: 'VA (Month 2)', amount: 850, status: 'pending', week: 5 },
            { id: 'exp-17', item: 'Instantly.ai (Month 2)', amount: 47, status: 'pending', week: 5 },
            { id: 'exp-18', item: 'Cold email infra Month 2 (G Workspace + verify)', amount: 80, status: 'pending', week: 5 },

            // 🔧 GAP PLAYBOOK FIXES (Approved Apr 9)
            { id: 'gap-1', item: 'VA skills test (3 candidates × $50)', amount: 150, status: 'pending', week: 3 },
            { id: 'gap-2', item: 'Attorney review: 1099 + Client Service Agreement', amount: 400, status: 'pending', week: 4 },
            { id: 'gap-3', item: 'Leave-behind printing (500 copies)', amount: 100, status: 'pending', week: 5 },

            // 💰 FOUNDING MEMBER REVENUE (Pre-launch)
            { id: 'rev-1', item: 'Founding Member #1 ($997 setup)', amount: -997, status: 'pending', week: 5 },
            { id: 'rev-2', item: 'Founding Member #2 ($997 setup)', amount: -997, status: 'pending', week: 5 },
        ],
    },

    // ---- Today's Priorities ----
    prioritiesLastUpdated: '2026-04-11T10:45:00-05:00',
    priorities: [
        // ⚡ TOP 3 TODAY — April 11 (Week 1 Starts)
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
            id: 'today-2', text: '🥈 TODAY #2 — Sign up for GHL SaaS Pro + Begin Day 1 of GHL Deep Dive',
            priority: 'today', done: false, timeEstimate: '1.5 hrs',
            steps: [
                'Sign up at GoHighLevel.com → SaaS Pro plan ($497/mo)',
                'Set up agency account (name, logo, timezone)',
                'Start Day 1 of 10-day deep dive: explore dashboard, settings, sub-accounts',
                'Take notes on 3 key screens — build your GHL cheat sheet',
                '⚠️ You cannot sell what you\'ve never used — this is foundational',
            ]
        },
        {
            id: 'today-3', text: '🥉 TODAY #3 — Claim Google Business Profile for SANO Solutions',
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
        // 🔴 HIGH PRIORITY — Do This Week
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
                'Update Jasper personal profile: "Helping Houston Contractors Book 12+ Jobs/Month"',
                'Connect with 10-15 Houston business owners',
            ]
        },
        {
            id: 'p-new-5', text: 'Add remaining 2 domains to Google Workspace + Instantly',
            priority: 'high', done: false, timeEstimate: '1 hr',
            steps: [
                'Add sanooutreach.com to Google Workspace as secondary domain',
                'Add sanoleads.com to Google Workspace as secondary domain',
                'Create 1 inbox per domain: jasper@sanooutreach.com, jasper@sanoleads.com',
                'Configure DNS: SPF, DKIM, DMARC for both domains',
                'Connect both to Instantly.ai via OAuth',
                'Enable warmup on both accounts',
                '⚠️ Every day of delay costs ~300 emails of send capacity before June 1',
            ]
        },
        // 🟡 MEDIUM — This/Next Week
        {
            id: 'p-new-6', text: 'Build simple landing page on sanosolutions.ai',
            priority: 'medium', done: false, timeEstimate: '3 hrs',
            steps: [
                'One-page site: what SANO does, "Book a Demo" button, phone number',
                '1-2 tool screenshots, Houston focus',
                'Install Facebook Pixel (30 min)',
                'Install Google Analytics 4 (30 min)',
                'Set up UTM parameters for cold email links',
                'Does NOT need to be elaborate — for validation + tracking only',
                'Immersive 3D site continues as separate premium build',
            ]
        },
        {
            id: 'p-new-7', text: 'Film demo video (iPhone) — missed call text-back',
            priority: 'medium', done: false, timeEstimate: '1 hr',
            steps: [
                'Film yourself demoing missed-call text-back on your phone',
                '30-60 seconds, natural, authentic (not polished)',
                'Show: phone ringing, auto-text sent, customer response',
                'This video feeds: Facebook ads, website, one-pagers, Chris pitch',
            ]
        },
        {
            id: 'p-new-8', text: 'Schedule first 2 weeks of social media posts (M/W/F)',
            priority: 'medium', done: false, timeEstimate: '1 hr',
            steps: [
                'Monday: Quick video tip (30-60 sec, on phone)',
                'Wednesday: Screenshot or demo clip',
                'Friday: Behind-the-scenes or credibility post',
                'Schedule via Buffer or Meta Business Suite',
            ]
        },

        // ✅ COMPLETED ITEMS
        {
            id: 'p1', text: 'Register 4 cold email sending domains',
            priority: 'done', done: true, timeEstimate: '—',
            steps: ['✅ Apr 6 — sanooutreach.com, sanoleads.com, sanojobs.com, sanogrowth.com — $40.63']
        },
        {
            id: 'p2', text: 'Sign up for Instantly.ai ($47/mo)',
            priority: 'done', done: true, timeEstimate: '—',
            steps: ['✅ Apr 6 — Growth plan active']
        },
        {
            id: 'p3', text: 'Create Google Workspace inboxes (2/4 done)',
            priority: 'done', done: true, timeEstimate: '—',
            steps: ['✅ Apr 7 — jasper@sanojobs.com + jasper2@sanogrowth.com on Business Starter trial']
        },
        {
            id: 'p4', text: 'Configure DNS: SPF, DKIM, DMARC (2/4 domains)',
            priority: 'done', done: true, timeEstimate: '—',
            steps: ['✅ Apr 7 — sanojobs.com + sanogrowth.com fully verified, all records clean']
        },
        {
            id: 'p5', text: 'Connect accounts to Instantly + start warmup',
            priority: 'done', done: true, timeEstimate: '—',
            steps: ['✅ Apr 7 — 2 accounts connected via OAuth, warmup ON (20/day, 30% reply rate, weekdays)']
        },
        {
            id: 'p6', text: 'Marketing Battle Plan audited & integrated',
            priority: 'done', done: true, timeEstimate: '—',
            steps: ['✅ Apr 9 — Full audit complete. MASTER_STATE, 8-week plan, sales playbook updated. $3K budget approved.']
        },
        {
            id: 'p7', text: 'Immersive website — Scenes 1-9 built',
            priority: 'done', done: true, timeEstimate: '—',
            steps: ['✅ Apr 8-9 — 3D storybook site with motherboard journey, scenes 1-9 complete including pricing chips']
        },
        {
            id: 'p8', text: 'Mass Outreach Bible — reviewed & filed',
            priority: 'done', done: true, timeEstimate: '—',
            steps: ['✅ Apr 6 — 30-mass-outreach-bible.md created, reconciled with master reference']
        },
        {
            id: 'p9', text: 'Pipeline Mode configured (agent delegation)',
            priority: 'done', done: true, timeEstimate: '—',
            steps: ['✅ Apr 5 — 7 brain files deployed, Pipeline Mode active']
        },
        {
            id: 'p10', text: 'Pricing finalized — Growth $347/mo',
            priority: 'done', done: true, timeEstimate: '—',
            steps: ['✅ Apr 4-5 — Full 4-tier pricing locked, stress tested, compensation confirmed']
        },
        {
            id: 'p11', text: 'Gap Playbook audited & approved (17 weak points)',
            priority: 'done', done: true, timeEstimate: '—',
            steps: ['✅ Apr 9 — 10 fixes integrated, 6 deferred to Month 2+. Founding Member $997, Month 1 target 1-3 closes, attorney review $300-500, VA skills test approved.']
        },
    ],

    // ---- Agent Overnight Reports ----
    agentReports: [
        {
            agent: 'SANO Command (OpenClaw)',
            time: '11:40 PM — Apr 10',
            message: 'Session 3: Shared Brain OS complete — ~/.claude/CLAUDE.md + Antigravity Knowledge Item created. Both tools auto-load same brain files. SOUL.md upgraded: "Do Not Be a Chatbot" section, Task Intake Protocol (depth tiers + scope cards), Harness Bridge (approve/cancel/read plans via file touch). Plan approval bug fixed (quoting), timeout raised 30m→2hrs, smart auto-approve added. System Audit: 19 checks, 17 ✅ 1 fixed. Acceleration Analysis: 16 tasks front-loadable, ~40 hrs CEO time savings, 2-2.5 week buffer. Task Queue system designed.',
            file: 'brain/MASTER_STATE.md',
            status: 'complete'
        },
        {
            agent: 'SANO Command (OpenClaw)',
            time: '9:20 PM — Apr 10',
            message: 'Session 2: Phase 4 Deploy complete. Archived old plists, created 5 new launchd jobs: com.sano.chief.night (10:30 PM), com.sano.chief.brief (6:30 AM), com.sano.sentinel (every 2h), com.sano.telegram.listen (always-on), com.sano.memory.compress (6 AM). Created @Jasper_mind_bot (dedicated SANO bot). OpenClaw overhaul: cost guards, quality gate, model routing table, SANO-BRIEFING.md, QUALITY-GATE.md, HANDOFF.md. System live: OpenClaw PID 7021, Telegram listener PID 6745, cost $0.16/$15 cap.',
            file: 'sano-harness/',
            status: 'complete'
        },
        {
            agent: 'SANO Command (OpenClaw)',
            time: '6:36 PM — Apr 10',
            message: 'Session 1: SANO Agent Harness v1.5 built — 17 files total. Cost guards ($15/night, $200/mo, $5/task), nightly pipeline (bin/sano-plan), 4 agent prompts, Telegram bot, memory management, cost dashboard, SQLite ledger. Live test: Sentinel DNS check — sanojobs.com MX ✅ SPF ✅ DMARC ⚠️. Total cost: $0.16. Anthropic credits: $25 added.',
            file: 'sano-harness/',
            status: 'complete'
        },
        {
            agent: 'Antigravity',
            time: '12:15 AM — Apr 9',
            message: 'Gap-to-Strength Playbook audited: 17 weak points analyzed, 10 fixes approved, 4 red flags caught (locked price change blocked, legal review upgraded to non-optional, $750 pricing changed to $997 Founding Member, workload trimmed from 45 to 37 hrs). Updated MASTER_STATE, 8-week plan, sales playbook, command center. Month 1 target revised to 1-3 closes.',
            file: 'docs/strategy/gap-playbook.md',
            status: 'complete'
        },
        {
            agent: 'Antigravity',
            time: '11:15 PM — Apr 8',
            message: 'Marketing Battle Plan audited against 7 existing strategy docs. 5 CEO decisions locked: $3K one-time marketing boost, flexible timeline, 3 beta clients, 5-email sequence confirmed. Updated MASTER_STATE, rebuilt 8-week overview with marketing layer, updated sales playbook with surround sound briefing for Chris. Created permanent marketing-battle-plan.md reference.',
            file: 'docs/strategy/marketing-battle-plan.md',
            status: 'complete'
        },
        {
            agent: 'Antigravity',
            time: '10:30 PM — Apr 8',
            message: 'Immersive website build — Scenes 1-9 complete. 3D motherboard journey with scroll-driven animations, particle systems, RAM corridor, bottleneck mechanic, CPU demo zone, and pricing chips with monthly/annual toggle. Running on localhost:4321.',
            file: 'sano-website/',
            status: 'complete'
        },
        {
            agent: 'Antigravity',
            time: '9:00 PM — Apr 7',
            message: 'Cold Email Infrastructure finalized. Connected sanojobs.com and sanogrowth.com to Instantly.ai via OAuth. Warmup active on both inboxes. DNS fully verified.',
            file: null,
            status: 'complete'
        },
        {
            agent: 'Antigravity',
            time: '5:00 PM — Apr 6',
            message: 'Mass Outreach Bible reviewed, reconciled, and filed. Key decisions: Instantly.ai at $47/mo, 5-email sequence, Jasper runs outreach until Chris starts. Budget: $140/mo infrastructure.',
            file: 'docs/outreach/mass-outreach-bible.md',
            status: 'complete'
        },
        {
            agent: 'Overseer',
            time: '10:08 PM — Apr 5',
            message: 'Pipeline Mode activated. 7 brain files deployed. Hierarchical delegation pattern live.',
            file: null,
            status: 'complete'
        },
    ],

    // ---- Master Build Checklist ----
    checklist: [
        {
            section: 'Pricing & Packages',
            week: 'Pre-launch',
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
            section: 'Cold Email Infrastructure',
            week: 'Week 0-1',
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
            section: '🆕 Marketing — Surround Sound Strategy',
            week: 'Week 1-8',
            items: [
                { id: 'mkt-chk-1', text: 'Claim Google Business Profile for SANO', status: 'not-started' },
                { id: 'mkt-chk-2', text: 'Create Facebook Business Page', status: 'not-started' },
                { id: 'mkt-chk-3', text: 'Create Instagram Business Profile', status: 'not-started' },
                { id: 'mkt-chk-4', text: 'Create LinkedIn Company Page', status: 'not-started' },
                { id: 'mkt-chk-5', text: 'Build simple landing page on sanosolutions.ai', status: 'not-started' },
                { id: 'mkt-chk-6', text: 'Install Facebook Pixel on site', status: 'not-started' },
                { id: 'mkt-chk-7', text: 'Install Google Analytics 4 on site', status: 'not-started' },
                { id: 'mkt-chk-8', text: 'Film demo video (missed-call text-back on iPhone)', status: 'not-started' },
                { id: 'mkt-chk-9', text: 'Launch Facebook geo-targeted ads ($20-25/day)', status: 'not-started' },
                { id: 'mkt-chk-10', text: 'Design + order EDDM postcards (1,000 pieces)', status: 'not-started' },
                { id: 'mkt-chk-11', text: 'Mail postcards to Chris Week 1 territory', status: 'not-started' },
                { id: 'mkt-chk-12', text: 'Launch retargeting ads on Facebook', status: 'not-started' },
                { id: 'mkt-chk-13', text: 'Order leave-behinds: one-pagers + cards + magnets', status: 'not-started' },
                { id: 'mkt-chk-14', text: 'Get 10+ Google reviews before June 1', status: 'not-started' },
                { id: 'mkt-chk-15', text: 'Social media posting 3x/week (M/W/F rhythm)', status: 'not-started' },
                { id: 'mkt-chk-16', text: 'Film beta customer testimonial video', status: 'not-started' },
            ]
        },
        {
            section: 'Website & Brand',
            week: 'Week 1-8',
            items: [
                { id: 'web-1', text: 'Brand identity finalized (logo, colors, fonts, voice)', status: 'in-progress' },
                { id: 'web-2', text: 'Immersive 3D website — Scenes 1-9 complete', status: 'done' },
                { id: 'web-3', text: 'Immersive 3D website — Scenes 10-11 (remaining)', status: 'in-progress' },
                { id: 'web-4', text: 'Simple landing page for credibility + tracking', status: 'not-started' },
                { id: 'web-5', text: 'Deploy immersive site to production', status: 'not-started' },
                { id: 'web-6', text: 'Deploy landing page to production', status: 'not-started' },
            ]
        },
        {
            section: 'Lead Scraping & List Building',
            week: 'Week 2-4',
            items: [
                { id: 'leads-1', text: 'Scrape 15-20K Houston businesses via Outscraper ($45-60)', status: 'not-started' },
                { id: 'leads-2', text: 'Verify emails via Hunter.io — target 8-10K valid', status: 'not-started' },
                { id: 'leads-3', text: 'Find emails for businesses without public email', status: 'not-started' },
                { id: 'leads-4', text: 'Create master email list in Google Sheets', status: 'not-started' },
                { id: 'leads-5', text: 'AI personalization batch for opening lines', status: 'not-started' },
                { id: 'leads-6', text: 'QA review AI-generated lines (15% hallucination rate)', status: 'not-started' },
            ]
        },
        {
            section: 'Email Sequences & Campaign',
            week: 'Week 3-6',
            items: [
                { id: 'seq-1', text: 'Write 5-email sequence (Audit → Angle → Proof → Scarcity → Soft Close)', status: 'not-started' },
                { id: 'seq-2', text: 'Write A/B test variations for each email', status: 'not-started' },
                { id: 'seq-3', text: 'Create compliant footer (address, unsubscribe, disclosure)', status: 'not-started' },
                { id: 'seq-4', text: 'Build audit call booking page + calendar link', status: 'not-started' },
                { id: 'seq-5', text: 'Launch test campaign — 50-100 emails', status: 'not-started' },
                { id: 'seq-6', text: 'Scale to 200-500 emails/day after optimization', status: 'not-started' },
            ]
        },
        {
            section: 'Legal & Business Foundation',
            week: 'Week 1-2',
            items: [
                { id: 'legal-1', text: 'Register LLC — Texas SOS ($300)', status: 'not-started' },
                { id: 'legal-2', text: 'Get EIN from IRS.gov', status: 'not-started' },
                { id: 'legal-3', text: 'Open business bank account', status: 'not-started' },
                { id: 'legal-4', text: 'MSA drafted by TX attorney ($1,500-2,500)', status: 'not-started' },
                { id: 'legal-5', text: 'CAN-SPAM compliance (address, unsubscribe)', status: 'not-started' },
                { id: 'legal-6', text: 'TCPA compliance — NO cold SMS', status: 'not-started' },
            ]
        },
        {
            section: 'GHL Setup & Product Build',
            week: 'Week 2-4',
            items: [
                { id: 'ghl-1', text: 'Sign up for GHL SaaS Pro ($497/mo)', status: 'not-started' },
                { id: 'ghl-2', text: 'Purchase 2 snapshots (plumbing/HVAC + landscaping)', status: 'not-started' },
                { id: 'ghl-3', text: 'VA customizes Snapshot #1 (plumbing/HVAC)', status: 'not-started' },
                { id: 'ghl-4', text: 'VA customizes Snapshot #2 (landscaping)', status: 'not-started' },
                { id: 'ghl-5', text: 'VA builds demo sub-account', status: 'not-started' },
                { id: 'ghl-6', text: 'Missed Call Text-Back workflow built', status: 'not-started' },
                { id: 'ghl-7', text: 'Automated Review Request system built', status: 'not-started' },
                { id: 'ghl-8', text: 'AI Chatbot configured', status: 'not-started' },
                { id: 'ghl-9', text: 'Online Booking & Scheduling set up', status: 'not-started' },
                { id: 'ghl-10', text: 'Internal QA — trigger every automation', status: 'not-started' },
            ]
        },
        {
            section: 'VA Hiring & Onboarding',
            week: 'Week 2-3',
            items: [
                { id: 'va-1', text: 'Write VA job description', status: 'not-started' },
                { id: 'va-2', text: 'Post VA job on OnlineJobs.ph + Upwork', status: 'not-started' },
                { id: 'va-3', text: 'Screen applicants + video interviews', status: 'not-started' },
                { id: 'va-4', text: 'Hire VA — onboard same day', status: 'not-started' },
                { id: 'va-5', text: 'VA tours GHL + begins customizing snapshots', status: 'not-started' },
            ]
        },
        {
            section: 'Beta Clients & Social Proof',
            week: 'Week 4-6',
            items: [
                { id: 'beta-1', text: 'Beta #1 (mechanic) — pitch free setup', status: 'not-started' },
                { id: 'beta-2', text: 'Beta #1 goes live — real data flowing', status: 'not-started' },
                { id: 'beta-3', text: 'Film Beta #1 testimonial video (iPhone, in shop)', status: 'not-started' },
                { id: 'beta-4', text: 'Beta #1 leaves Google review on SANO GBP', status: 'not-started' },
                { id: 'beta-5', text: 'Beta #2 — identify from cold email replies or networking', status: 'not-started' },
                { id: 'beta-6', text: 'Beta #3 — different industry for cross-niche proof', status: 'not-started' },
                { id: 'beta-7', text: 'Document before/after data from beta clients', status: 'not-started' },
                { id: 'beta-8', text: 'Expand free beta program post-first-sale to new industries', status: 'not-started' },
            ]
        },
        {
            section: 'Sales Materials & Chris Training',
            week: 'Week 5-8',
            items: [
                { id: 'sales-1', text: 'Chris training packet v1 written', status: 'done' },
                { id: 'sales-2', text: 'Sales pitch scripts (15-second + 2-minute)', status: 'done' },
                { id: 'sales-3', text: 'Objection handling guide (10 responses)', status: 'done' },
                { id: 'sales-4', text: 'Live demo walkthrough guide', status: 'done' },
                { id: 'sales-5', text: 'Commission calculator with scenarios', status: 'done' },
                { id: 'sales-6', text: 'Sales playbook updated with surround sound briefing', status: 'done' },
                { id: 'sales-7', text: 'One-page leave-behind PDF designed + printed', status: 'not-started' },
                { id: 'sales-8', text: 'Business cards printed (500)', status: 'not-started' },
                { id: 'sales-9', text: 'Branded fridge magnets (200)', status: 'not-started' },
                { id: 'sales-10', text: 'Chris training Week 1: Product + GHL + role-play', status: 'not-started' },
                { id: 'sales-11', text: 'Chris training Week 2: Field practice + ride-along', status: 'not-started' },
                { id: 'sales-12', text: 'Territory planning: Map Chris first 2 weeks of routes', status: 'not-started' },
                { id: 'sales-13', text: 'Warm leads compiled for Chris Day 1 lead sheet', status: 'not-started' },
            ]
        },
        {
            section: 'Agent & Automation Infrastructure',
            week: 'Ongoing',
            items: [
                { id: 'agent-1', text: 'OpenClaw agent installed on Mac Mini', status: 'done' },
                { id: 'agent-2', text: 'Pipeline Mode configured (Manager → Specialist → QA)', status: 'done' },
                { id: 'agent-3', text: '7 brain files deployed', status: 'done' },
                { id: 'agent-4', text: 'Telegram bot + 3x daily auto-briefings', status: 'done' },
                { id: 'agent-5', text: 'Command Center dashboard live', status: 'done' },
                { id: 'agent-6', text: 'Mass Outreach Bible researched & filed', status: 'done' },
                { id: 'agent-7', text: 'Marketing Battle Plan audited & integrated', status: 'done' },
                { id: 'agent-8', text: 'Gap Playbook audited & integrated (17 fixes)', status: 'done' },
                { id: 'agent-9', text: 'SANO Agent Harness v1.5 built (cost guards, nightly pipeline, SQLite ledger)', status: 'done' },
                { id: 'agent-10', text: 'Dedicated @Jasper_mind_bot created + Telegram listener live', status: 'done' },
                { id: 'agent-11', text: 'Shared Brain OS: ~/.claude/CLAUDE.md + Antigravity Knowledge Item', status: 'done' },
                { id: 'agent-12', text: 'launchd jobs deployed (5 plists: night briefing, morning, sentinel, listener, memory compress)', status: 'done' },
                { id: 'agent-13', text: 'SANO-BRIEFING.md + HANDOFF.md + QUALITY-GATE.md created', status: 'done' },
                { id: 'agent-14', text: 'Acceleration Analysis: 16 tasks front-loaded, ~40 hrs saved', status: 'done' },
            ]
        },
        {
            section: '🔧 Gap Fixes — Strength Building',
            week: 'Week 2-7',
            items: [
                { id: 'gap-chk-1', text: 'GHL deep dive: 10 days × 1 hr hands-on (AI tutor)', status: 'not-started' },
                { id: 'gap-chk-2', text: 'GHL cheat sheet: 10 key screens documented', status: 'not-started' },
                { id: 'gap-chk-3', text: 'AI builds cash flow tracker (1/2/3 close scenarios)', status: 'not-started' },
                { id: 'gap-chk-4', text: 'AI writes VA job posting + 10 interview Qs + rubric', status: 'not-started' },
                { id: 'gap-chk-5', text: 'VA skills test: build Growth package in 48 hrs ($150)', status: 'not-started' },
                { id: 'gap-chk-6', text: 'AI competitive recon: Houston GHL agency brief + battle cards', status: 'not-started' },
                { id: 'gap-chk-7', text: 'AI drafts Chris 1099 agreement', status: 'not-started' },
                { id: 'gap-chk-8', text: 'AI drafts Client Service Agreement + terms summary', status: 'not-started' },
                { id: 'gap-chk-9', text: 'Attorney reviews 1099 + MSA ($300-500)', status: 'not-started' },
                { id: 'gap-chk-10', text: 'Beta testimonial question guide created', status: 'not-started' },
                { id: 'gap-chk-11', text: 'TT "by application only" page drafted', status: 'not-started' },
                { id: 'gap-chk-12', text: 'Founding Member sales: 2-4 clients at $997 each', status: 'not-started' },
                { id: 'gap-chk-13', text: 'AI drafts Chris full training packet', status: 'not-started' },
                { id: 'gap-chk-14', text: 'Support knowledge base (30 common Qs)', status: 'not-started' },
                { id: 'gap-chk-15', text: '90-day client retention sequence built', status: 'not-started' },
                { id: 'gap-chk-16', text: 'Client "wins report" template created', status: 'not-started' },
            ]
        },
    ],

    // ---- Approval Queue ----
    approvals: [
        {
            id: 'appr-1',
            title: 'Scout Lead List — Top 10 Calls for Chris',
            description: 'Review the priority list of 10 Houston businesses. Score range: 3-7. Approve to add to Chris\'s Day 1 call sheet.',
            file: 'agents/scout/master-lead-list.md',
            created: '2026-04-05'
        },
    ],

    // ---- CEO Comments ----
    comments: [],

    // ---- Key Metrics ----
    metrics: {
        coldEmailsSent: 0,
        emailOpenRate: 0,
        emailReplies: 0,
        warmLeads: 0,
        businessesVisited: 0,
        demosGiven: 0,
        proposalsSent: 0,
        clientsClosed: 0,
        cashRemaining: 18912, // $19,000 - $41 (domains) - $47 (Instantly) | Updated Apr 11
        // Marketing metrics (new)
        facebookImpressions: 0,
        facebookClicks: 0,
        websiteVisitors: 0,
        googleReviews: 0,
        retargetingAudience: 0,
        postcardsMailed: 0,
        socialFollowers: 0,
    },

    // ---- 8-Week Timeline ----
    weeks: [
        { num: 0, name: 'Pre-Launch Sprint', dates: 'Apr 4-10', theme: 'Foundation & Cold Email Infra', status: 'complete' },
        { num: 1, name: 'Foundation + Marketing Setup', dates: 'Apr 11-17', theme: 'GHL, VA Hiring, GBP + Social Profiles + Landing Page', status: 'active' },
        { num: 2, name: 'Product Build + Ads Launch', dates: 'Apr 18-24', theme: 'VA Building, FB Ads Live, Postcard Design', status: 'upcoming' },
        { num: 3, name: 'QA + Direct Mail + Retargeting', dates: 'Apr 25 - May 1', theme: 'Beta Approached, EDDM Mailed, Retargeting Live', status: 'upcoming' },
        { num: 4, name: 'Beta Live + All Channels', dates: 'May 2-8', theme: 'Beta Client, All Marketing Running', status: 'upcoming' },
        { num: 5, name: 'Sales Kit Assembly', dates: 'May 9-15', theme: 'Chris Materials, 2nd Beta, Testimonials', status: 'upcoming' },
        { num: 6, name: 'Chris Training', dates: 'May 16-22', theme: 'Hands-on Training, FB Ads Tuned to Route', status: 'upcoming' },
        { num: 7, name: 'Launch', dates: 'May 23-31', theme: 'Final QA → Chris in Field June 1', status: 'upcoming' },
    ],
};

// ---- Persistence Layer ----
const STORAGE_KEY = 'sano_command_center';

function saveData() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            _dataVersion: typeof DATA_VERSION !== 'undefined' ? DATA_VERSION : '',
            priorities: SANO_DATA.priorities,
            approvals: SANO_DATA.approvals,
            comments: SANO_DATA.comments,
            checklist: SANO_DATA.checklist,
            metrics: SANO_DATA.metrics,
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
                console.log('📦 Data version changed — loading fresh priorities & checklist');
                if (parsed.comments) SANO_DATA.comments = parsed.comments;
                saveData();
                return;
            }

            if (parsed.priorities) SANO_DATA.priorities = parsed.priorities;
            if (parsed.approvals) SANO_DATA.approvals = parsed.approvals;
            if (parsed.comments) SANO_DATA.comments = parsed.comments;
            if (parsed.metrics) SANO_DATA.metrics = parsed.metrics;
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
