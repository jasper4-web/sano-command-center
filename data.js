/* ============================================
   SANO COMMAND CENTER — Data Layer v2.0
   SOURCE OF TRUTH: 08-critical-assessment.md,
   09-final-execution-plan.md, 15-8-week-overview.md,
   21-package-proposal-v1.md
   ============================================ */

const SANO_DATA = {

    // ---- Launch Date ----
    launchDate: new Date('2026-06-01T08:00:00-05:00'),

    // ---- Budget Tracker ($19K Runway) ----
    budget: {
        starting: 19000,
        // Spending log — each entry is an actual or projected expense
        expenses: [
            // Projected Month 1 (Weeks 0-4)
            { id: 'exp-1', item: 'Instantly.ai (Month 1)', amount: 47, status: 'pending', week: 0 },
            { id: 'exp-2', item: 'Cold email domains (2-3)', amount: 30, status: 'pending', week: 0 },
            { id: 'exp-3', item: 'LLC Registration — Texas SOS', amount: 300, status: 'pending', week: 1 },
            { id: 'exp-4', item: 'Domain (sanosolutions.com)', amount: 15, status: 'pending', week: 1 },
            { id: 'exp-5', item: 'Professional email setup', amount: 7, status: 'pending', week: 1 },
            { id: 'exp-6', item: 'GHL SaaS Pro (Month 1)', amount: 497, status: 'pending', week: 1 },
            { id: 'exp-7', item: 'GHL Snapshots (2 industries)', amount: 200, status: 'pending', week: 1 },
            { id: 'exp-8', item: 'VA Hire (Month 1)', amount: 850, status: 'pending', week: 2 },
            { id: 'exp-9', item: 'GHL usage (test accounts)', amount: 50, status: 'pending', week: 3 },
            { id: 'exp-10', item: 'Misc (tools, gas, coffee)', amount: 100, status: 'pending', week: 3 },
            // Month 2 (Chris starts)
            { id: 'exp-11', item: 'Chris Training Week 1', amount: 1700, status: 'pending', week: 6 },
            { id: 'exp-12', item: 'Chris Training Week 2', amount: 1700, status: 'pending', week: 7 },
            { id: 'exp-13', item: 'GHL SaaS Pro (Month 2)', amount: 497, status: 'pending', week: 5 },
            { id: 'exp-14', item: 'VA (Month 2)', amount: 850, status: 'pending', week: 5 },
            { id: 'exp-15', item: 'Instantly.ai (Month 2)', amount: 47, status: 'pending', week: 5 },
        ],
    },

    // ---- Today's Priorities ----
    // RULE: Only items that can be completed in a 2-3 hour session.
    // Overestimate time. Updated at end of each work session.
    // lastUpdated tracks when priorities were last refreshed.
    prioritiesLastUpdated: '2026-04-05T23:00:00-05:00',
    priorities: [
        {
            id: 'p1', text: 'Sign up for Instantly.ai ($47/mo Growth plan)',
            priority: 'critical', done: false, timeEstimate: '20 min',
            steps: [
                'Go to instantly.ai → Click "Start Free Trial" or "Get Started"',
                'Select the Growth plan ($47/mo) — this gives 5,000 emails/mo',
                'Create account with your business email (use personal for now)',
                'Enter payment info (credit card)',
                'Bookmark your Instantly dashboard — you\'ll be back here daily',
            ]
        },
        {
            id: 'p2', text: 'Buy 2-3 cold email sending domains (~$30)',
            priority: 'critical', done: false, timeEstimate: '20 min',
            steps: [
                'Go to Namecheap.com or Porkbun.com',
                'Search for variations: sanosolutionsmail.com, getsano.com, sanogrowth.com',
                'Buy 2-3 domains ($10-15 each) — DON\'T use your main brand domain',
                'These are "burner" sending domains to protect your main domain reputation',
                'Save the domain login credentials somewhere secure',
            ]
        },
        {
            id: 'p3', text: 'Set up email accounts on new domains',
            priority: 'high', done: false, timeEstimate: '30 min',
            steps: [
                'Option A: Zoho Mail (free for 1 user per domain) — zoho.com/mail',
                'Option B: Google Workspace ($7/mo per user) — more credible',
                'Create 1-2 mailboxes per domain: jasper@, hello@, or team@',
                'Connect each domain to Zoho/Google (they walk you through DNS)',
                'Send a test email from each new address to make sure it works',
            ]
        },
        {
            id: 'p4', text: 'Configure DNS records (SPF, DKIM, DMARC)',
            priority: 'high', done: false, timeEstimate: '30 min',
            steps: [
                'Log into your domain registrar (Namecheap/Porkbun) → DNS settings',
                'Add SPF record: TXT record provided by Zoho/Google',
                'Add DKIM record: TXT record provided by Zoho/Google',
                'Add DMARC record: v=DMARC1; p=none; (basic - can tighten later)',
                'Verify all 3 records are green in Zoho/Google admin panel',
                '⚠️ DNS can take up to 24-48 hours to fully propagate',
            ]
        },
        {
            id: 'p5', text: 'Start email warmup in Instantly',
            priority: 'high', done: false, timeEstimate: '15 min',
            steps: [
                'In Instantly dashboard → "Email Accounts" → "Add Account"',
                'Connect each email address via SMTP/IMAP (Instantly guides you)',
                'Turn ON warmup for every connected account',
                'Set warmup speed to "Slow" (recommended for new domains)',
                '✅ Warmup runs automatically for 14 days — no action needed after this',
            ]
        },
        {
            id: 'p6', text: 'Review Scout lead list — approve top 10 for Chris',
            priority: 'medium', done: false, timeEstimate: '20 min',
            steps: [
                'Open agents/scout/master-lead-list.md in the SANO folder',
                'Scan the 39 leads — focus on Score 6+ businesses',
                'Pick top 10 that have: no website, bad reviews, or clearly outdated',
                'Star/mark the ones Chris should call first on Day 1',
                'Leave a comment on the Command Center with your picks',
            ]
        },
        // Completed items from tonight
        {
            id: 'p7', text: 'Configure Pipeline Mode (agent delegation system)',
            priority: 'done', done: true, timeEstimate: '—',
            steps: ['✅ Completed Apr 5 — 7 brain files configured, Pipeline Mode active']
        },
        {
            id: 'p8', text: 'Fix Telegram bot + connect 3 daily cron jobs',
            priority: 'done', done: true, timeEstimate: '—',
            steps: ['✅ Completed Apr 5 — Token regenerated, 8AM/2PM/8PM briefings scheduled']
        },
        {
            id: 'p9', text: 'Upgrade FlowVoice dictation (smart formatting)',
            priority: 'done', done: true, timeEstimate: '—',
            steps: ['✅ Completed Apr 5 — Gemini 2.5 Flash, list formatting, voice commands']
        },
        {
            id: 'p10', text: 'Finalize Growth tier pricing at $347/mo',
            priority: 'done', done: true, timeEstimate: '—',
            steps: ['✅ Completed — Locked in pricing structure']
        },
        {
            id: 'p11', text: 'Complete package proposal v1.0',
            priority: 'done', done: true, timeEstimate: '—',
            steps: ['✅ Completed — Full proposal doc finalized']
        },
    ],

    // ---- Agent Overnight Reports ----
    agentReports: [
        {
            agent: '⚙️ Overseer',
            time: '10:08 PM — Apr 5',
            message: 'Pipeline Mode activated. 7 brain files deployed (SOUL, IDENTITY, BOOTSTRAP, USER, HEARTBEAT, TOOLS, AGENTS). Hierarchical delegation pattern live. QA gate via Agent Zero enabled.',
            file: null,
            status: 'complete'
        },
        {
            agent: '🔍 Scout',
            time: '10:16 PM — Apr 4',
            message: 'Completed Houston lead scrape: 39 leads across 3 verticals (Plumbing, HVAC, Auto Repair). Top prospect: Auto Best Houston Inc (Score 7/10 — no website, 127 reviews). Full hot list ready for Chris.',
            file: 'agents/scout/master-lead-list.md',
            status: 'complete'
        },
        {
            agent: '📚 Professor',
            time: '10:22 PM — Apr 4',
            message: 'Completed Chris Sales Training Packet — 1,163 lines, 10 sections + 5 appendices. Includes word-for-word pitches, objection scripts, demo guide, commission calculator, and Houston market intel.',
            file: 'agents/professor/chris-training-packet-full.md',
            status: 'complete'
        },
        {
            agent: '📊 Analyst',
            time: '12:02 PM — Apr 5',
            message: 'Financial model re-launched. Building 3-scenario projection (Conservative / Moderate / Aggressive) with cash flow through Month 12.',
            file: null,
            status: 'running'
        },
    ],

    // ---- Master 8-Week Build Checklist ----
    // Pulled directly from 09-final-execution-plan.md & 15-8-week-overview.md
    checklist: [
        {
            section: '📦 Pricing & Packages',
            week: 'Pre-launch',
            items: [
                { id: 'pkg-1', text: '4-tier pricing structure defined', status: 'done' },
                { id: 'pkg-2', text: 'Tool matrix by tier finalized', status: 'done' },
                { id: 'pkg-3', text: 'Voice minutes / SMS credits per tier defined', status: 'done' },
                { id: 'pkg-4', text: 'Voice Unlimited add-on created ($247/mo)', status: 'done' },
                { id: 'pkg-5', text: 'Growth locked at $347/mo', status: 'done' },
                { id: 'pkg-6', text: 'Financial stress test completed', status: 'done' },
                { id: 'pkg-7', text: 'Package proposal document v1.0', status: 'done' },
                { id: 'pkg-8', text: 'Chris compensation structure confirmed (20% setup / 5% recurring)', status: 'done' },
            ]
        },
        {
            section: '🤖 Agent & Automation Infrastructure',
            week: 'Week 0-1',
            items: [
                { id: 'agent-1', text: 'OpenClaw agent installed on Mac Mini', status: 'done' },
                { id: 'agent-2', text: 'Pipeline Mode configured (Manager → Specialist → QA)', status: 'done' },
                { id: 'agent-3', text: '7 brain files deployed (SOUL, BOOTSTRAP, IDENTITY, etc.)', status: 'done' },
                { id: 'agent-4', text: 'Connect Telegram bot + 3x daily auto-briefings', status: 'done' },
                { id: 'agent-5', text: 'Command Center dashboard live', status: 'done' },
                { id: 'agent-6', text: 'FlowVoice dictation upgraded (Gemini 2.5 Flash)', status: 'done' },
                { id: 'agent-7', text: 'Test full pipeline: Telegram → Decompose → Delegate → QA', status: 'not-started' },
                { id: 'agent-8', text: 'Configure Brave Search API for live web research', status: 'not-started' },
                { id: 'agent-9', text: 'CrewAI setup (Python env + parallel agents) — Week 3-4', status: 'not-started' },
                { id: 'agent-10', text: 'n8n workflow orchestration (optional, after CrewAI eval)', status: 'not-started' },
            ]
        },
        {
            section: '📧 Cold Email System (Instantly.ai)',
            week: 'Week 0-1',
            items: [
                { id: 'email-1', text: 'Sign up for Instantly.ai ($47/mo Growth plan)', status: 'not-started' },
                { id: 'email-2', text: 'Buy 2-3 cold email sending domains (~$10-15 each)', status: 'not-started' },
                { id: 'email-3', text: 'Set up email accounts on domains (Google Workspace or Zoho)', status: 'not-started' },
                { id: 'email-4', text: 'Configure DNS records (SPF, DKIM, DMARC)', status: 'not-started' },
                { id: 'email-5', text: 'Start Instantly warmup (14-day automated process)', status: 'not-started' },
                { id: 'email-6', text: 'Write 3-email cold sequence (Hook / Value / Breakup)', status: 'not-started' },
                { id: 'email-7', text: 'Build lead list: 500+ Houston service businesses', status: 'in-progress' },
                { id: 'email-8', text: 'Import lead list into Instantly', status: 'not-started' },
                { id: 'email-9', text: 'Launch test sends (50-100 emails)', status: 'not-started' },
                { id: 'email-10', text: '🚀 Full campaign launch (200-500/day)', status: 'not-started' },
            ]
        },
        {
            section: '🏛️ Legal & Business Foundation',
            week: 'Week 1',
            items: [
                { id: 'legal-1', text: 'Register LLC — Texas SOS online ($300)', status: 'not-started' },
                { id: 'legal-2', text: 'Get EIN from IRS.gov (free, 5 minutes)', status: 'not-started' },
                { id: 'legal-3', text: 'Open business bank account (Chase/Mercury/Relay)', status: 'not-started' },
                { id: 'legal-4', text: 'Secure domain (sanosolutions.com or similar)', status: 'not-started' },
                { id: 'legal-5', text: 'Set up professional email (Google Workspace/Zoho)', status: 'not-started' },
                { id: 'legal-6', text: 'Get business phone number (via GHL)', status: 'not-started' },
                { id: 'legal-7', text: 'MSA (Master Services Agreement) drafted', status: 'not-started' },
                { id: 'legal-8', text: 'Terms of Service written', status: 'not-started' },
                { id: 'legal-9', text: 'TCPA compliance language added', status: 'not-started' },
                { id: 'legal-10', text: 'AI liability disclaimers', status: 'not-started' },
            ]
        },
        {
            section: '🔧 GHL Setup & Product Build',
            week: 'Week 1-3',
            items: [
                { id: 'ghl-1', text: 'Sign up for GHL SaaS Pro ($497/mo)', status: 'not-started' },
                { id: 'ghl-2', text: 'Browse GHL Snapshot marketplace — identify 2-3 industry snapshots', status: 'not-started' },
                { id: 'ghl-3', text: 'Purchase 2 snapshots (plumbing/HVAC + landscaping) ~$200', status: 'not-started' },
                { id: 'ghl-4', text: 'Import first snapshot into GHL', status: 'not-started' },
                { id: 'ghl-5', text: 'VA customizes Snapshot #1 (plumbing/HVAC) — branding, flows, triggers', status: 'not-started' },
                { id: 'ghl-6', text: 'VA customizes Snapshot #2 (landscaping) — branding, flows, triggers', status: 'not-started' },
                { id: 'ghl-7', text: 'VA builds demo sub-account (what Chris shows on his phone)', status: 'not-started' },
                { id: 'ghl-8', text: 'Missed Call Text-Back workflow built', status: 'not-started' },
                { id: 'ghl-9', text: 'Automated Review Request system built', status: 'not-started' },
                { id: 'ghl-10', text: 'AI Chatbot (website) configured', status: 'not-started' },
                { id: 'ghl-11', text: 'Online Booking & Scheduling set up', status: 'not-started' },
                { id: 'ghl-12', text: 'Automated Follow-Up Sequences built', status: 'not-started' },
                { id: 'ghl-13', text: 'CRM Pipeline stages defined', status: 'not-started' },
                { id: 'ghl-14', text: 'Internal QA — trigger every automation as if you\'re a customer', status: 'not-started' },
            ]
        },
        {
            section: '👷 VA Hiring & Onboarding',
            week: 'Week 1-2',
            items: [
                { id: 'va-1', text: 'Write VA job description: "GHL Expert — 20 hrs/week — $850/mo"', status: 'not-started' },
                { id: 'va-2', text: 'Post VA job on OnlineJobs.ph + Upwork', status: 'not-started' },
                { id: 'va-3', text: 'Screen first batch of applicants', status: 'not-started' },
                { id: 'va-4', text: 'Schedule top 3 for video interviews', status: 'not-started' },
                { id: 'va-5', text: 'Hire VA — send offer, set expectations, onboard same day', status: 'not-started' },
                { id: 'va-6', text: 'VA tours GHL account, reviews imported snapshots', status: 'not-started' },
                { id: 'va-7', text: 'VA begins customizing snapshots', status: 'not-started' },
            ]
        },
        {
            section: '🧪 Testing & Beta Client',
            week: 'Week 3-5',
            items: [
                { id: 'beta-1', text: 'Contact beta prospect (mechanic) — pitch free setup', status: 'not-started' },
                { id: 'beta-2', text: 'VA builds beta client sub-account', status: 'not-started' },
                { id: 'beta-3', text: 'Beta client goes live — real customer data flowing', status: 'not-started' },
                { id: 'beta-4', text: 'Monitor beta for 1 week — document issues', status: 'not-started' },
                { id: 'beta-5', text: 'Refine automation based on beta learnings', status: 'not-started' },
                { id: 'beta-6', text: 'VA polishes demo account based on beta data', status: 'not-started' },
                { id: 'beta-7', text: 'Go/No-Go decision: Is the product ready?', status: 'not-started' },
            ]
        },
        {
            section: '👔 Sales Materials & Chris Training',
            week: 'Week 2-7',
            items: [
                { id: 'sales-1', text: 'Chris training packet v1 written', status: 'done' },
                { id: 'sales-2', text: 'Sales pitch scripts (15-second + 2-minute)', status: 'done' },
                { id: 'sales-3', text: 'Objection handling guide (10 responses)', status: 'done' },
                { id: 'sales-4', text: 'Live demo walkthrough guide', status: 'done' },
                { id: 'sales-5', text: 'Commission calculator with scenarios', status: 'done' },
                { id: 'sales-6', text: 'Sample proposal email template', status: 'done' },
                { id: 'sales-7', text: 'One-page leave-behind PDF for Chris\'s visits', status: 'not-started' },
                { id: 'sales-8', text: 'Pitch deck / visual sales presentation', status: 'not-started' },
                { id: 'sales-9', text: 'Chris training Week 1: Product walkthrough + GHL tour + role-play', status: 'not-started' },
                { id: 'sales-10', text: 'Chris training Week 2: Demo practice + supervised beta demo', status: 'not-started' },
                { id: 'sales-11', text: 'Territory planning: Map Chris\'s first 2 weeks of routes', status: 'not-started' },
                { id: 'sales-12', text: 'Chris first ride-along day (CEO accompanies)', status: 'not-started' },
                { id: 'sales-13', text: 'Chris goes solo — 10-15 businesses/day', status: 'not-started' },
            ]
        },
        {
            section: '🌐 Website & Brand',
            week: 'Week 4-8',
            items: [
                { id: 'web-1', text: 'Brand identity finalized (logo, colors, fonts, voice guide)', status: 'not-started' },
                { id: 'web-2', text: 'Website wireframe / design mockup', status: 'not-started' },
                { id: 'web-3', text: 'Homepage built (dark, premium, interactive)', status: 'not-started' },
                { id: 'web-4', text: 'Pricing page with tier comparison', status: 'not-started' },
                { id: 'web-5', text: 'About / Team page', status: 'not-started' },
                { id: 'web-6', text: 'Contact / Book a Demo page', status: 'not-started' },
                { id: 'web-7', text: 'Domain purchased & DNS configured', status: 'not-started' },
                { id: 'web-8', text: 'Deployed to production (Vercel/Cloudflare)', status: 'not-started' },
            ]
        },
        {
            section: '📊 Operations & Finance',
            week: 'Ongoing',
            items: [
                { id: 'ops-1', text: 'Financial model — 3 scenarios (Conservative/Moderate/Aggressive)', status: 'in-progress' },
                { id: 'ops-2', text: 'Cash flow projection through Month 6', status: 'not-started' },
                { id: 'ops-3', text: 'Weekly expense tracker active', status: 'not-started' },
                { id: 'ops-4', text: 'Client onboarding SOP documented', status: 'not-started' },
                { id: 'ops-5', text: 'Client offboarding SOP documented', status: 'not-started' },
                { id: 'ops-6', text: 'VA hiring plan for scale (1 VA per 5 clients)', status: 'not-started' },
                { id: 'ops-7', text: 'Monthly reporting template created', status: 'not-started' },
            ]
        },
    ],

    // ---- Approval Queue ----
    approvals: [
        {
            id: 'appr-1',
            title: 'Scout Lead List — Top 10 Calls for Chris',
            description: 'Review the priority list of 10 Houston businesses. Score range: 3-7. Includes phone numbers, ratings, and gap analysis. Approve to add to Chris\'s Day 1 call sheet.',
            file: 'agents/scout/master-lead-list.md',
            created: '2026-04-05'
        },
        {
            id: 'appr-2',
            title: 'Agent Consolidation: 11 → 5',
            description: 'Retire Pulse, Analyst, Postman, Sentinel, Scribe, Agent Zero. Keep: Foreman, Scout, Professor, Architect, Overseer. Retired agent functions get folded into n8n workflows.',
            file: null,
            created: '2026-04-05'
        },
    ],

    // ---- CEO Comments (saved by buttons, read by agents) ----
    comments: [],

    // ---- Key Metrics (Week 1 tracking) ----
    metrics: {
        coldEmailsSent: 0,
        emailOpenRate: 0,
        emailReplies: 0,
        warmLeads: 0,
        businessesVisited: 0,
        demosGiven: 0,
        proposalsSent: 0,
        clientsClosed: 0,
        cashRemaining: 19000,
    },

    // ---- 8-Week Timeline ----
    weeks: [
        { num: 0, name: 'Pre-Launch Sprint', dates: 'Apr 4-10', theme: '🏛️ Foundation & Cold Email Setup', status: 'active' },
        { num: 1, name: 'Foundation', dates: 'Apr 11-17', theme: '🔧 GHL Setup & VA Hiring', status: 'upcoming' },
        { num: 2, name: 'Product Build', dates: 'Apr 18-24', theme: '🏗️ VA Building + Snapshots', status: 'upcoming' },
        { num: 3, name: 'Testing & QA', dates: 'Apr 25 - May 1', theme: '🧪 Internal Testing + Beta Client', status: 'upcoming' },
        { num: 4, name: 'Beta & Polish', dates: 'May 2-8', theme: '🎯 Beta Live + Cold Email Full', status: 'upcoming' },
        { num: 5, name: 'Sales Materials', dates: 'May 9-15', theme: '📦 Sales Kit + Chris Prep', status: 'upcoming' },
        { num: 6, name: 'Chris Training', dates: 'May 16-22', theme: '🎓 Hands-on Training Week', status: 'upcoming' },
        { num: 7, name: 'Soft Launch', dates: 'May 23-31', theme: '🚀 Final QA + LAUNCH', status: 'upcoming' },
    ],
};

// ---- Persistence Layer ----
// Save/load from localStorage so data persists between browser sessions
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

            // VERSION CHECK: If data.js was updated (version bumped), 
            // discard stale priorities/checklist but keep user comments
            const savedVersion = parsed._dataVersion || '';
            const currentVersion = typeof DATA_VERSION !== 'undefined' ? DATA_VERSION : '';

            if (savedVersion !== currentVersion) {
                console.log('📦 Data version changed — loading fresh priorities & checklist');
                // Only restore user-generated data (comments, approvals)
                if (parsed.comments) SANO_DATA.comments = parsed.comments;
                // Don't restore priorities or checklist — use fresh data.js values
                // Save the new version
                saveData();
                return;
            }

            // Same version — safe to restore everything
            if (parsed.priorities) SANO_DATA.priorities = parsed.priorities;
            if (parsed.approvals) SANO_DATA.approvals = parsed.approvals;
            if (parsed.comments) SANO_DATA.comments = parsed.comments;
            if (parsed.metrics) SANO_DATA.metrics = parsed.metrics;
            // Merge checklist status (keep structure, update statuses)
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
