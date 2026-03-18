import { useState, useEffect, useRef, useCallback } from "react";
import { IMG } from "./images.js";

const PHOTO_SRC = IMG("photo");





// ClearPay screenshots
const CP_SHOTS = [
  IMG("cp_rule"),   // 0 - Rule Optimizer
  IMG("cp_doc"),    // 1 - Documentation
  IMG("cp_txn"),    // 2 - Transaction Mgmt
  IMG("cp_proc"),   // 3 - Processor Compare
  IMG("cp_land"),   // 4 - Landing Features
  IMG("cp_dash"),   // 5 - Dashboard
  IMG("cp_fraud"),  // 6 - Fraud Rules
  IMG("cp_import"), // 7 - Import Data
  IMG("cp_txn"),    // 8 - Transaction Mgmt (hero)
  IMG("cp_doc2"),   // 9 - Documentation 2
  IMG("cp_proc2"),  // 10 - Processor Compare 2
  IMG("cp_dash2"),  // 11 - Dashboard 2
  IMG("cp_dash3"),  // 12 - Dashboard 3
  IMG("cp_dash4"),  // 13 - Dashboard 4
  IMG("cp_dash5"),  // 14 - Dashboard 5
  IMG("cp_extra1"), // 15 - Extra 1
  IMG("cp_extra2"), // 16 - Extra 2
  IMG("cp_extra3"), // 17 - Extra 3
  IMG("cp_extra4"), // 18 - Extra 4
];

// SGX/TDX product screenshots
const SGX_IMGS = [
  IMG("sgx_ds1"),     // 0 - Design System (SGX config + A11Y)
  IMG("sgx_onb"),     // 1 - Onboarding portal
  IMG("sgx_users"),   // 2 - Manage users
  IMG("sgx_tdxdocs"), // 3 - TDX Documentation page
  IMG("sgx_ds2"),     // 4 - Design System 2 (code snippets)
  IMG("sgx_market"),  // 5 - Market context chart
  IMG("sgx_prov1"),   // 6 - Provenir screen 1
  IMG("sgx_prov2"),   // 7 - Provenir screen 2
];

// Federated AI / unified portal screenshots
const INTEL_IMGS = [
  IMG("sgx_admin"),  // 0 - Super Admin roles hierarchy
  IMG("sgx_users"),  // 1 - Manage All System Users
  IMG("sgx_perms"),  // 2 - Permissions matrix
  IMG("sgx_ds1"),    // 3 - Design System
  IMG("sgx_ds2"),    // 4 - Design System 2
  IMG("sgx_onb"),    // 5 - Onboarding portal
];

// Intel research screen (thumbnail)
const INTEL_SCREEN = IMG("sgx_intel");

const CARD_JOKES = [
  { main: "TRANSACTION DECLINED", sub: "This vendor cannot afford my standards." },
  { main: "INSUFFICIENT SCOPE DETECTED", sub: "Please resubmit with a real design brief." },
  { main: "FRAUD ALERT: GOOD TASTE", sub: "Activity flagged as suspicious. Too coherent." },
  { main: "CARD EXPIRED", sub: "Like your last design system. Let's talk." },
  { main: "CONTACTLESS LIMIT EXCEEDED", sub: "You've been approved for one (1) redesign." },
  { main: "INCORRECT PIN", sub: "Hint: it's not 'just make it pop'." },
];

/* --- INLINE ICONS ----------------------------------------- */
const IconPayCard = () => (
  <svg width="34" height="24" viewBox="0 0 34 24" fill="none">
    <rect x="0.75" y="0.75" width="32.5" height="22.5" rx="3.5" stroke="currentColor" strokeWidth="1.3"/>
    <rect x="0" y="6.5" width="34" height="5" fill="currentColor" fillOpacity="0.18"/>
    <rect x="3.5" y="14" width="9" height="6" rx="1.5" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="0.8"/>
    <circle cx="25" cy="17" r="4" stroke="currentColor" strokeWidth="1.1" strokeOpacity="0.6"/>
    <circle cx="29" cy="17" r="4" stroke="currentColor" strokeWidth="1.1" strokeOpacity="0.4"/>
  </svg>
);
const IconContactless = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="2.5" fill="currentColor" fillOpacity="0.85"/>
    <path d="M14.8 7.2 C16.9 9.3 16.9 12.7 14.8 14.8" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
    <path d="M17.5 4.5 C21.1 8.1 21.1 13.9 17.5 17.5" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    <path d="M7.2 7.2 C5.1 9.3 5.1 12.7 7.2 14.8" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
    <path d="M4.5 4.5 C0.9 8.1 0.9 13.9 4.5 17.5" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
  </svg>
);
const IconShield = () => (
  <svg width="26" height="30" viewBox="0 0 26 30" fill="none">
    <path d="M13 2 L23 6.5 L23 16 C23 22 18.5 26.5 13 28.5 C7.5 26.5 3 22 3 16 L3 6.5 Z" stroke="currentColor" strokeWidth="1.3" fill="none" strokeOpacity="0.85"/>
    <path d="M13 5 L20 8.5 L20 16 C20 20.5 17 23.5 13 25 C9 23.5 6 20.5 6 16 L6 8.5 Z" stroke="currentColor" strokeWidth="0.8" fill="none" strokeOpacity="0.4"/>
    <path d="M8.5 15 L11.5 18 L17.5 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9"/>
  </svg>
);
const IconBrain = () => (
  <svg width="30" height="28" viewBox="0 0 30 28" fill="none">
    <path d="M15 25 C15 25 5 22 3 14 C1.5 7.5 5 2.5 10.5 2.5 C12 2.5 13.2 3.3 14.2 4.8 C15.2 3.3 16.8 2.5 18.5 2.5 C24 2.5 27.5 7.5 26 14 C24 22 15 25 15 25Z" stroke="currentColor" strokeWidth="1.3" fill="none" strokeOpacity="0.85"/>
    <line x1="15" y1="5" x2="15" y2="25" stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.4"/>
    <path d="M9 9.5 C12 8.5 14 10.5 15 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.7"/>
    <path d="M19 9.5 C16.5 8.5 15.2 10.5 15 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.7"/>
    <circle cx="5.5" cy="14" r="2.5" fill="currentColor" fillOpacity="0.35"/>
    <circle cx="24.5" cy="14" r="2.5" fill="currentColor" fillOpacity="0.35"/>
    <path d="M5.5 11.5 L5.5 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.4"/>
    <path d="M24.5 11.5 L24.5 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.4"/>
  </svg>
);

/* --- PROJECTS --------------------------------------------- */
const IconGrid = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect x="2" y="2" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3" fill="none" strokeOpacity="0.85"/>
    <rect x="16" y="2" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3" fill="none" strokeOpacity="0.85"/>
    <rect x="2" y="16" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3" fill="none" strokeOpacity="0.85"/>
    <rect x="16" y="16" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3" fill="none" strokeOpacity="0.4"/>
    <line x1="20" y1="20" x2="23" y2="20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.7"/>
    <line x1="20" y1="22.5" x2="22" y2="22.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.7"/>
  </svg>
);


// Company logo badges (wordmark style for enterprise clients)
const COMPANY_LOGOS = {
  "Goldman Sachs": {color:"#1a4a7a", text:"Goldman Sachs"},
  "HSBC":          {color:"#c00", text:"HSBC"},
  "BBVA":          {color:"#004c97", text:"BBVA"},
  "SoFi":          {color:"#00c83c", text:"SoFi"},
  "Klarna":        {color:"#ff69a0", text:"Klarna"},
  "ING":           {color:"#ff6200", text:"ING"},
  "Barclays":      {color:"#00aeef", text:"Barclays"},
  "Payoneer":      {color:"#f26522", text:"Payoneer"},
};
function ClientLogo({name}) {
  const logo = COMPANY_LOGOS[name];
  if (!logo) return <span style={{fontFamily:"'Epilogue',sans-serif",fontSize:"13px",fontWeight:500,color:"#e0e0e0",padding:"8px 16px",border:"1px solid #2e2e2e",background:"#0e0e0e",borderRadius:"3px"}}>{name}</span>;
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"10px 18px",border:"1px solid #1e1e1e",background:"#0a0a0a",borderRadius:"3px",minWidth:"110px"}}>
      <span style={{fontFamily:"'Epilogue',sans-serif",fontSize:"13px",fontWeight:700,color:logo.color,letterSpacing:"-0.01em",whiteSpace:"nowrap"}}>{logo.text}</span>
    </div>
  );
}

const PROJECTS = [
  {
    id:"provenir",index:"01",company:"Provenir",theme:"fintech",Icon:IconPayCard,
    title:"Risk Decisioning Platform",subtitle:"Cloud SaaS · 0→1 · 2017–2022",industry:"Fintech",
    stat2:"$10M→$75M",stat2Label:"Revenue scaled",stat3:"194%",stat3Label:"Customer growth",
    tags:["Risk","B2B SaaS","Fintech"],
    thumbnail:IMG("prov_after3"),
    teaser:"Scaled revenue 7.5x from $10M to $75M through a 0→1 cloud SaaS redesign, replacing an 18-year-old on-premise system, driving 194% customer growth, and compressing AI model deployment cycles 1.5x.",
    prototypeUrl:"https://www.figma.com/proto/gHSqAAEBWK3lhK7Hs5qGaG/Risk-Decisioning-Platform",
    caseStudy:{
      role:"Design Director (Solo)",duration:"5 years · 2017–2022",
      team:"1 Design Director · 2 Consultant Designers · 18 Engineers · 6 QA/DevOps · 12+ SMEs · 1 TPM",
      overview:"Provenir had an 18-year-old on-premise risk decisioning system, Windows-only, fragmented across 4 separate browser consoles, requiring weeks of training.",
      problem:"Four separate web consoles forced users away from core tasks at every turn. Every workflow was a workaround.",
      challenge:"Provenir's 18-year-old on-premise risk decisioning platform was fragmenting across four separate browser consoles, Windows-only, incompatible with Mac and Python environments the market had already moved to, and requiring a mandatory 4-day training course before any analyst could do their job. The default plan on the table was a direct port. I recognized early that porting broken mental models onto a new medium would simply repackage the problem. The real opportunity was a rearchitecture of how enterprise risk teams think about their work.",
      pullQuote:"The port would have preserved the problem. Reinvention was the only commercially viable path.",
      strategy:"I rejected the port and advocated for a blank-slate UX strategy — but with evidence, not opinion. I ran a gamified card-sorting exercise ('Prov Dollars') across cross-functional stakeholders where teams had constrained budgets to prioritize what they needed most. This surfaced 130+ documented pain points, built shared ownership across product and engineering, and gave me the business case to justify full reinvention. I then established three parallel design tracks: the legacy on-premise modernization, Provenir Studio Cloud, and the flagship SPA — maintaining coherence across all three simultaneously for four years as the sole design voice in the organization.",
      strategyPoints:[
        "Rejected direct port, advocated blank-slate research-first approach backed by stakeholder workshops",
        "Gamified backlog prioritization ('Prov Dollars') across 130+ pain points with cross-functional buy-in",
        "Dual-track interaction model: guided wizard flows for analysts, raw configuration surfaces for architects",
        "Designed version control and merge request workflows to satisfy compliance requirements without burdening users",
      ],
      process:"I embedded with payment operations teams, risk analysts, and platform architects before opening Figma. I documented 12 critical handoff failure points, discovering that analysts maintained private spreadsheets because the official tooling was too slow and too noisy to trust. I used this as the business case for a purpose-built platform. Over five years I led agile sprints with teams of 5–12 across three parallel product tracks, regularly presenting design rationale to executive and investor stakeholders. Working directly with engineers on the version control system, I documented every legacy workflow in the merge list (the complexity we inherited), then redesigned it into a branch-based approval flow that risk managers could own without engineering support.",
      processPoints:[
        "Embedded with users 2 weeks before first wireframe, discovered private spreadsheets as unofficial workaround",
        "Designed branch management and merge request approval flow from scratch alongside engineering",
        "Ran progressive disclosure pattern: power user surfaces hidden from analyst view, summoned on demand",
        "Negotiated every MVP concession as a timed commitment, all post-MVP items shipped within 18 months",
      ],
      impact:[{v:"7.5x",l:"Revenue growth"},{v:"$10M→$75M",l:"ARR scaled"},{v:"194%",l:"Customer growth"},{v:"1.5x",l:"Faster AI deployment"},{v:"$35M+",l:"Client revenue driven"},{v:"28+",l:"Workflows rebuilt"}],
      clients:["Goldman Sachs","HSBC","BBVA","SoFi","Klarna","ING","Barclays","Payoneer"],
      outcome:"The platform became Provenir's cloud ecosystem foundation, enabling 3,000% sales growth and onboarding 80+ enterprise clients.",
      results:"Revenue scaled 7.5x from $10M to $75M. Customer growth of 194% by 2021. $35M+ in measurable client revenue driven. AI model deployment cycles compressed 1.5x via parallel processing and Git-like branch & merge experimentation. Enterprise logos include Goldman Sachs, HSBC, BBVA, SoFi, and Klarna, all acquired through a platform designed to earn trust on sight.",
      resultPoints:[
        "Revenue scaled 7.5x from $10M to $75M ARR over five years",
        "194% customer growth by 2021, 35% year-over-year revenue growth",
        "28+ underwriting, fraud risk, and payments workflows rebuilt",
        "AI model deployment cycles compressed 1.5x via Git-like branch & merge",
        "$35M+ in client revenue growth driven across the portfolio",
      ],
      leadership:[
        {title:"Setting the North Star Against Pressure to Just Port",body:"I joined a 6-person incubation team mandated to prove an 18-year-old Windows desktop system could live on the web. The default instinct was to port the existing UI. I pushed hard against this, advocating for a blank-slate UX strategy rooted in user research before a single wireframe was drawn. It became the foundation of the product's commercial success two years later."},
        {title:"Designing the Governance System for 130+ Pain Points",body:"I designed a gamified card-sorting workshop, 'Prov Dollars', where cross-functional teams were given constrained budgets to purchase the features they wanted built first. This made trade-offs visible, stripped hierarchy from the room, and produced a backlog engineering and product both owned. 130+ pain points documented, triaged, and tracked to resolution."},
        {title:"Sustained Design Leadership Across 3 Parallel Tracks for 4 Years",body:"For four consecutive years I was the sole design voice across Provenir on-premise modernization, Provenir Studio Cloud, and the flagship SPA simultaneously. I ran agile sprints with teams of 5–12, maintained design system coherence across all three, and regularly presented strategic design rationale to executive and investor stakeholders."},
      ],
      tradeoffs:[
        {decision:"The Port vs. Reinvention Decision",body:"The board wanted speed. Engineering wanted a port. I brought user research data showing the existing mental models were broken at source. I made the case for full reinvention, accepted the timeline risk in writing, and delivered a product that 3x'd its sales pipeline in year one. The port would have preserved the problem."},
        {decision:"Progressive Disclosure vs. Power User Fidelity",body:"Risk analysts and platform architects are not the same user. I designed dual-track interaction models: guided wizard flows for analysts, raw configuration surfaces for architects, each invisible to the other unless summoned. This is what protected both adoption and power simultaneously."},
        {decision:"Conceding Short-Term to Win Long-Term",body:"Some UX solutions weren't buildable at MVP. I documented every concession explicitly as a strategic backlog and negotiated each deferral as a timed commitment with product ownership. Every post-MVP item shipped within 18 months. This is how you build trust with engineering across a multi-year program."},
      ],
      provenirImages:[
        {key:"prov_before1",      label:"Before",      caption:"Before, Legacy Provenir Studio: fragmented scenario view across isolated consoles, Windows-only, requiring weeks of training to navigate"},
        {key:"prov_personas",     label:"Research",    caption:"Research, User type mapping: Provenir internal vs. client users, foundation for the dual-track UX model"},
        {key:"prov_whiteboard",   label:"Process",     caption:"Process, Whiteboard journey mapping from sales landing page through trial onboarding, identifying the 90% drop-off at setup"},
        {key:"prov_onboarding",   label:"After",       caption:"After, New 6-step guided onboarding: API & Environment Setup with sandbox/dev/production environment selection"},
        {key:"prov_flow_builder", label:"After",       caption:"After, Decision Flow Builder v2.0: parallel processing canvas with AI Suggest, A/B Tests, Audit Log, and environment promotion"},
        {key:"prov_integrations", label:"After",       caption:"After, Integrations & Connectors marketplace: 120+ pre-built credit, identity, and fraud integrations with live latency/uptime stats"},
        {key:"prov_connections",  label:"After",       caption:"After, My Connections: 6 active integrations (Experian, TransUnion, Equifax, Onfido, LexisNexis) with per-integration analytics"},
        {key:"prov_after3",       label:"After",       caption:"After, Decision Flow Canvas: parallel processing with Git-like merge, real-time TPS/latency metrics, and one-click Deploy"},
        {key:"prov_audit_log",    label:"After",       caption:"After, Audit & Environment Logs: full change history across Sandbox/Staging/Production with user attribution and timestamps"},
        {key:"prov_after1",       label:"After",       caption:"After, Version control: branch creation, environment promotion, and merge request workflow"},
        {key:"prov_after4",       label:"After",       caption:"After, Merge Request approval: diff view with field-level change tracking and audit trail"},
        {key:"prov_eng1",         label:"Engineering", caption:"Engineering, Legacy merge list the new parallel processing canvas replaced"},
      ],
    },
  },
  {
    id:"pulsepay",index:"02",company:"LGUX / ClearPay",theme:"fintech",Icon:IconContactless,
    title:"Payment Intelligence Platform",subtitle:"Payments · Operations · 2014–2017",industry:"Multi-vertical",
    stat2:"$35M+",stat2Label:"Client revenue",stat3:"30%",stat3Label:"Faster time-to-market",
    tags:["Fintech","Infrastructure","Postal Tech","Pharma"],
    thumbnail:CP_SHOTS[8],
    teaser:"Founded LGUX and led 15+ enterprise solutions across fintech and SaaS, delivering $35M+ in client revenue, 30% faster time-to-market, and 22% aggregate adoption growth across B2B/B2C products.",
    prototypeUrl:"https://www.figma.com/design/5K3Lw0CaT6dWa9QT9zyUkm/PulsePay-Operations-Manager-Focused-App?node-id=0-1",
    caseStudy:{
      role:"Lead Product Designer",duration:"3 years · 2014–2017",
      team:"1 Lead Designer · 2 Product Managers · 8 Engineers · 1 Data Architect",
      overview:"LGUX was a multi-vertical product company. Over three years I led design across four distinct domains, payment intelligence (ClearPay), infrastructure tooling, postal technology software, and HIPAA-compliant pharmaceutical systems.",
      problem:"Payment ops teams were flying blind, alerts buried in email, reconciliation done in private spreadsheets, no real-time visibility.",
      challenge:"Payment operations teams at LGUX's clients were operating without a real platform. Alerts were buried in email. Transaction reconciliation happened in private spreadsheets, the official tools were too slow and too noisy to trust. One unresolved payment exception could cascade into compliance failures and contractual penalties. No product existed that gave ops teams the real-time intelligence they needed to act before problems compounded. I was brought in as the sole designer across a multi-vertical portfolio, ClearPay for payment intelligence, infrastructure tooling, postal technology software, and HIPAA-compliant pharmaceutical systems. No design system existed. No prior art. Every product was built from zero.",
      pullQuote:"Analysts, team leads, and operations directors all lived in the same data but needed radically different interfaces. I designed adaptive views for all three, same data layer, three coherent product experiences.",
      strategy:"Before opening Figma I spent two weeks shadowing payment operations analysts in their actual workflow. The key insight: analysts had already built their own workaround, private spreadsheets maintained outside the official system, because the platform was too slow to trust. I documented 12 critical handoff failure points and used them as the business case for a purpose-built platform. My strategic approach centered on designing one product that served three incompatible mental models: analysts needed triage speed, team leads needed workload visibility, and operations directors needed compliance reporting. The architecture had to serve all three from a single data layer without showing any user another user's interface.",
      strategyPoints:[
        "Embedded with ops teams 2 weeks before design, private spreadsheet discovery became the product brief",
        "Documented 12 critical handoff failure points as business justification for purpose-built platform",
        "Adaptive view architecture: same data, three distinct role-specific interfaces, single unified API",
        "Soft-refresh pattern for real-time updates without interrupting in-progress analyst work",
      ],
      process:"I mapped the full exception lifecycle, from incoming transaction flag to resolution, compliance filing, and report, across three user roles simultaneously. Each screen had to work for the analyst triaging a single exception and the director reviewing the week's exception volume at a glance. When engineering specified a standard data table for the reconciliation workflow, I built a visual diff prototype and tested it informally with two ops analysts the same day. Reconciliation time dropped from hours to minutes. I brought the data to the engineering lead before the sprint review. The diff view shipped. Across the broader LGUX portfolio I repeated this pattern, immerse first, surface the real problem, prototype the non-obvious solution, validate before advocating.",
      processPoints:[
        "Built visual diff prototype for reconciliation, tested same day, shipped over engineering's table spec",
        "Designed soft-refresh pattern: exceptions queue silently, surface only at natural work completion",
        "Multi-vertical design: ClearPay, infrastructure tooling, postal software, and pharma, all from zero",
        "Role-adaptive views validated through testing, eliminated 40% navigation error rate of unified view",
      ],
      impact:[{v:"$35M+",l:"Client revenue growth"},{v:"30%",l:"Faster time-to-market"},{v:"22%",l:"Adoption growth"},{v:"25%",l:"Build velocity increase"}],
      outcome:"The ClearPay Payment Intelligence Platform launched as the company's flagship product, adopted without training.",
      results:"Delivered $35M+ in client revenue growth and 30% faster time-to-market across a 15+ product portfolio. 22% aggregate adoption growth across B2B/B2C digital ecosystems. Build velocity increased 25% through scalable design systems and reusable components. ClearPay launched as LGUX's flagship product, adopted without training, and the private spreadsheet workarounds used as coping mechanisms disappeared on day one.",
      resultPoints:[
        "$35M+ in client revenue growth across the portfolio",
        "30% faster time-to-market through scalable design systems",
        "22% aggregate adoption growth across B2B/B2C products",
        "25% increase in build velocity via reusable component systems",
      ],
      leadership:[
        {title:"Two Weeks Embedded Before One Wireframe",body:"Before opening Figma I spent two weeks shadowing payment operations analysts in their actual workflow. Key discovery: analysts maintained private spreadsheets because the official tooling was too slow and too noisy to trust. I documented 12 critical handoff failure points and used this as the business case for a purpose-built platform. Nobody had asked for this data. I surfaced it anyway."},
        {title:"Designing One Product for Three Incompatible Mental Models",body:"Analysts, team leads, and operations directors all lived in the same data but needed radically different interfaces. I designed adaptive views for all three, same data layer, three coherent product experiences, and got engineering to build it with a single unified API."},
        {title:"The Reconciliation Diff View, Won With a Prototype",body:"Engineering specified a standard data table for reconciliation. I built a prototype of a visual diff tool and ran informal user testing with two ops analysts. Reconciliation time went from hours to minutes. I brought the data back to the engineering lead the same day. The diff view shipped."},
      ],
      tradeoffs:[
        {decision:"Real-Time Updates vs. Cognitive Interruption",body:"Automatic data refresh that interrupts in-progress work doesn't improve response time, it creates errors. I designed a soft-refresh pattern where new exceptions queue silently and surface only when the user has completed their current action. Counter-intuitive. Validated by user testing."},
        {decision:"Unified View vs. Role-Specific Architecture",body:"Research showed a unified view produced 40% more navigation errors across all role types. I pushed for role-adaptive views despite the engineering overhead. The adoption curve post-launch, no training required, validated the decision."},
      ],
      screens:[{label:"Exceptions Queue, Live Triage",type:"dashboard"},{label:"Transaction Detail, Audit Trail",type:"builder"},{label:"Reconciliation, Visual Diff",type:"catalog"},{label:"Team Workload Management",type:"analytics"}],
      clearPayImages:[
        {idx:8,  caption:"Transaction Management, real-time payment table with risk scores, processor tags, and status filters"},
        {idx:0,  caption:"AI Fraud Rule Optimizer, detects redundant, conflicting, and high false-positive rules with live scoring"},
        {idx:5,  caption:"Live Dashboard, real-time auth rate, false declines, and revenue recovery metrics"},
        {idx:11, caption:"Dashboard, exception queue with priority triage and team assignment"},
        {idx:12, caption:"Dashboard, workload distribution view across team members"},
        {idx:3,  caption:"Processor Comparison, Stripe vs Square performance radar and routing optimization"},
        {idx:10, caption:"Processor Comparison, latency and cost analysis across payment rails"},
        {idx:6,  caption:"Fraud Rules, behavioral rule engine with add/edit/review workflow"},
        {idx:15, caption:"Exception Detail, transaction audit trail with full event timeline"},
        {idx:16, caption:"Reconciliation, visual diff view for settlement discrepancies"},
        {idx:4,  caption:"Core Capabilities, four integrated intelligence modules overview"},
        {idx:1,  caption:"Documentation, inline help and API reference integrated into workflow"},
        {idx:9,  caption:"Documentation, searchable knowledge base with contextual guides"},
        {idx:7,  caption:"Import Data, bulk upload with field mapping and validation"},
      ],
    },
  },
  {
    id:"intel-tdx",index:"03",company:"Intel · Trust Authority",theme:"security",Icon:IconShield,
    title:"TDX Attestation & Zero Trust Portal",subtitle:"Confidential Computing · Developer Experience · 2022–2023",industry:"Deep Tech / Security",
    stat2:"55%",stat2Label:"Onboarding reduction",stat3:"60%",stat3Label:"Top CSPs adopted TDX",
    tags:["Zero Trust","Confidential Computing","Intel TDX"],
    thumbnail:IMG("tdx_strategy"),
    teaser:"Slashed developer onboarding 55% (9→4 steps) and steered TDX silicon adoption to 60% of the world's top CSPs, establishing the first UX patterns for confidential computing and positioning IT as Customer Zero.",
    prototypeUrl:null,
    liveUrl:"https://www.intel.com/content/www/us/en/developer/tools/trust-domain-extensions/overview.html",
    caseStudy:{
      role:"UX Lead, Confidential Computing",duration:"2022–2023 · Intel Flex / SAE",
      team:"1 UX Lead · 1 Developer · 1 Chief of Staff · 10 Stakeholder Interviews · 4 Usability Participants",
      overview:"Embedded within Intel's SAE group as the first designer, I led UX for Intel SGX/TDX attestation, the hardware primitive that enables confidential computing and Zero Trust enforcement at the CPU.",
      problem:"Confidential Computing couldn't cross the adoption chasm, setup was CLI-only, comprehensible to kernel engineers only.",
      challenge:"Intel's Confidential Computing platform had a powerful value proposition and zero adoption. The core technology, hardware security enclaves within specialized processors, required setup procedures so complex that developers and security architects described it as requiring 'a Ph.D. to get started.' That quote came from a real customer. I was embedded in Intel's SAE (System Architecture & Engineering) group as the first designer in the organization. No UX patterns existed for confidential computing. No IT admin had ever been considered as a user. The entire platform surface assumed kernel-level engineering fluency as baseline. The product was invisible to everyone who needed to deploy it.",
      pullQuote:"'It requires a Ph.D. to use Intel SGX technology.', Security Solution Architect, enterprise customer account.",
      strategy:"My strategy had two layers. First: build enough domain credibility that engineers would trust my design decisions. I spent the first three weeks interviewing 10 stakeholders, software engineers, security architects, product strategists, enterprise sales, without opening Figma. Second: reframe who the product was actually for. The Trust Authority platform had been designed exclusively for kernel engineers. I made the case, with data, that IT operations teams were the actual adoption bottleneck. Enterprise deployment couldn't scale if IT couldn't provision environments without engineering support. I designed a two-phase research study to prove it: Phase 1 documented baseline experience. Phase 2 would test the redesign and surface the delta as a concrete argument for UX investment.",
      strategyPoints:[
        "10 stakeholder interviews before first design, built domain credibility with kernel engineers",
        "Reframed target user: established IT Operations as Customer Zero, not kernel engineers",
        "Two-phase research design: baseline → redesign → delta as budget justification for UX expansion",
        "Created 'Trust Policies' abstraction, technically accurate, legally defensible, IT-admin comprehensible",
      ],
      process:"Phase 1 tested the baseline experience using a two-day diary study with 4 internal participants tasked with graminizing a Redis app on an SGX-enabled VM using only CLI and GIT instructions. Average task completion: 4.5 hours. Task success: 25%. Satisfaction: 4.5/7. Phase 2 tested the redesigned curated experience, same participants, same tasks, redesigned surface with quick-start guides and a unified portal. Average completion dropped to 15 minutes. Task success rose to 75%. Satisfaction reached 7/7. I presented both phases to executives, and the research received the first-ever organizational green-light for UX investment in the group. The 'Trust Policies' abstraction I designed, replacing CLI-level configuration language with terminology IT admins could own, became the canonical customer-facing mental model for the Trust Authority product.",
      processPoints:[
        "Phase 1 diary study (2 days, 4 participants): 4.5 hrs avg completion, 25% task success, 4.5/7 satisfaction",
        "Phase 2 usability test (1 hour): 15 min completion, 75% task success, 7/7 satisfaction, 18x improvement",
        "First-ever UX green-light in the org, secured through research ROI, not design advocacy",
        "New UX vocabulary: 'Trust Policies', 'Verification Status', 'Quick-Start Guides', all shipped as canonical",
      ],
      impact:[{v:"55%",l:"Onboarding reduction"},{v:"9→4",l:"Steps to get started"},{v:"60%",l:"Top CSPs adopted TDX"},{v:"25%→75%",l:"Task completion rate"}],
      outcome:"The research received the first-ever organizational green-light for UX investment in Intel's SAE group.",
      results:"Slashed developer onboarding 55%, from 9 steps to 4. Steered TDX silicon adoption to 60% of the world's top cloud service providers. Established the first UX patterns for confidential computing, positioned IT Operations as Customer Zero, and received the Intel Security Center of Excellence Q3'23 Division Recognition Award for launching Intel TDX and Trust Authority in the Intel Developer Cloud.",
      resultPoints:[
        "55% reduction in developer onboarding, from 9 steps to 4",
        "60% of world's top CSPs adopted Intel TDX silicon",
        "Task success rate: 25% → 75% | Satisfaction: 4.5/7 → 7/7",
        "First UX program approval in Intel SAE org history",
        "Intel Security CoE Q3'23 Division Recognition Award recipient",
      ],
      leadership:[
        {title:"Building Credibility Before Design, 10 Stakeholders, No Figma",body:"I spent the first three weeks conducting stakeholder interviews across software engineers, security architects, product strategists, and enterprise sales, before touching a design tool. The goal wasn't to gather requirements. It was to understand the domain deeply enough that engineers would trust my design decisions. When I finally opened Figma, I had the credibility to push back."},
        {title:"Establishing IT as Customer Zero",body:"The Trust Authority platform had been designed exclusively for kernel engineers. I made the case, with data, that IT operations teams were the actual adoption bottleneck. No amount of kernel-engineer UX improvements would drive enterprise deployment if IT couldn't provision the environments. I designed the IT Admin onboarding path and got organizational sign-off to position IT Ops as Customer Zero."},
        {title:"The Two-Phase Research Model That Got Budget for UX",body:"I designed a two-phase research study: Phase 1 documented the baseline (4.5 hours, 25% completion, 4.5/7 satisfaction). Phase 2 tested the redesign (15 minutes, 75% completion, 7/7 satisfaction). The delta was the organizational argument for expanding UX. Research results received the first-ever green-light for UX investment in the group."},
      ],
      tradeoffs:[
        {decision:"Designing Without Precedent, No UX Patterns for Confidential Computing",body:"Attestation had no UX vocabulary. I built one. 'Trust Policies' replaced 'attestation configuration'. 'Verification Status' replaced 'quote validation'. Every abstraction had to be technically accurate, legally defensible to compliance teams, and comprehensible to IT admins without a kernel background."},
        {decision:"Two-Phase Study Design, Convincing Without Budget",body:"The org had no prior UX investment. I designed a research study that could run with 4 participants and one developer across 3 months. The constraint was the point, I had to demonstrate ROI before asking for resources. The Phase 1 data made Phase 2 funding obvious."},
      ],
      sgxImages:[
        {key:"tdx_users",    label:"Research",    caption:"Confidential Computing Main Users, mapping hardware/software usage across CEO, Developer, and Security Architect personas to Project Amber, SDK Route, LibOS Route, and Intel SGX"},
        {key:"tdx_voc",      label:"Research",    caption:"Voice of Customer, Enterprise DevOps (Gramine) and Company CEO (SDK): pain points surfaced across SGX setup complexity, broken documentation, and attestation friction"},
        {key:"tdx_personas", label:"Research",    caption:"Voice of Customer, CSP Cloud Architect and Enterprise Developer: roles, pain points, SGX value proposition, and skills matrix across 10 stakeholder interviews"},
        {key:"tdx_insights", label:"Research",    caption:"High-level insights and key learnings: Ecosystem & Support gaps, Value Proposition & Messaging failures, and Technology pain points across all 10 interviews"},
        {key:"tdx_strategy", label:"Strategy",    caption:"Four-pillar strategy: (1) Awareness through findability & clarity, (2) Documentation gap closure, (3) Information Architecture of entry points, (4) Consolidated TDX documentation page"},
        {key:"tdx_webpage",  label:"Shipped",     caption:"Proposed new TDX product page, Overview, Documentation, and Support tabs consolidating all resources and tools for developer discovery and hands-on learning"},
        {key:"tdx_pdfthtml", label:"Shipped",     caption:"PDF → HTML transformation: converting static spec tables into a searchable, navigable HTML book experience, dramatically improving developer findability"},
        {key:"tdx_award_full",label:"Recognition",caption:"DRA Award: team recognized for successfully launching Intel TDX and Intel Trust Authority in the Intel Developer Cloud, enabling Thales, AbbVie, Noname, Zscaler, Leidos, and SAP"},
      ],
    }
  },
  {
    id:"federated-ai",index:"04",company:"Intel · Federated AI",theme:"ai",Icon:IconBrain,
    title:"Privacy-Preserving AI Platform",subtitle:"Federated Learning · 2024–2025",industry:"Big Tech / AI",
    stat2:"20+",stat2Label:"UX gaps closed",stat3:"$53M",stat3Label:"Revenue target",
    tags:["AI","Privacy Tech","Intel"],
    thumbnail:IMG("fed_dashboard"),
    teaser:"Incubated Intel Federated AI 0→1, closing 20+ UX gaps against a $53M revenue target, enabling enterprise AI teams in regulated industries to train models across distributed sensitive datasets without raw data leaving its origin.",
    prototypeUrl:"https://www.figma.com/proto/gHSqAAEBWK3lhK7Hs5qGaG/Risk-Decisioning-Platform",
    caseStudy:{
      role:"Lead Product Designer",duration:"2024 · Intel",
      team:"1 Lead Designer · 2 ML Product Managers · 15 ML/Platform Engineers · Privacy & Compliance",
      overview:"Federated learning enables organizations to train AI models without sharing raw data, only encrypted model gradients transit between nodes.",
      problem:"Enterprise AI teams needed to train better models on more data, but in regulated industries, data sharing is legally impossible. Existing federated tooling was CLI-only.",
      challenge:"Enterprise AI teams in healthcare, finance, and government faced an impossible constraint: they needed to train better models on more data, but their most valuable training data was also the data they were legally prohibited from sharing. Federated learning offered a technical solution, training models across distributed datasets without raw data ever leaving its origin, but the tooling was CLI-only and comprehensible exclusively to ML research teams. No designed product interface existed anywhere in the market. Intel needed to be first, and needed it to work for enterprise buyers who would not tolerate a command-line workflow.",
      pullQuote:"You cannot design honest abstractions for a system you don't understand. Engineers will know. And they will stop trusting you.",
      strategy:"I spent four weeks becoming genuinely fluent in federated learning before opening Figma, FedAvg/FedProx aggregation strategies, differential privacy noise injection, secure aggregation protocols. This wasn't background reading. It was a prerequisite. My core design insight: simplicity and auditability are orthogonal requirements, not competing ones. Enterprise ML teams needed to run training jobs with minimal friction. Their compliance teams needed to prove no data left the organization. A layered information architecture could serve both, task-focused on the surface, full audit trail one level down. I also fought for a topology visualizer over engineering's specified data table: a live graph showing participating nodes, training status, gradient flow, and privacy budget. Time-to-comprehension dropped 80% for new users in testing.",
      strategyPoints:[
        "4 weeks of domain immersion before first wireframe, FedAvg, differential privacy, secure aggregation",
        "Layered IA: simple task surface for ML teams, full audit trail for compliance, same product, both served",
        "Differential privacy parameters: plain-language risk indicators by default, raw epsilon/delta one level down",
        "Topology visualizer over engineering's table spec, 80% better time-to-comprehension in user testing",
      ],
      process:"I built the topology visualizer as a working prototype with realistic training job data and ran user testing with ML engineers and compliance officers side by side. Time-to-comprehension for the visualizer was 80% better than the table alternative. I brought this to the engineering lead with a time estimate and a user testing report, not just a design preference. The visualizer shipped and became the product's primary demo artifact. For the privacy parameter interface, I designed layered controls: plain-language risk indicators visible by default for compliance officers, raw epsilon/delta parameters surfaced one interaction depth down for ML researchers. Both user types got what they needed from the same component without either compromising the other's workflow.",
      processPoints:[
        "Topology visualizer prototype user-tested before advocacy, 80% comprehension improvement documented",
        "Presented visualizer to engineering with time estimate + testing data, approved over table spec",
        "Privacy parameter UI: layered, plain-language indicators default, raw epsilon/delta one level down",
        "Designed for three regulated industries simultaneously: healthcare, finance, government",
      ],
      impact:[{v:"0→1",l:"Platform launch"},{v:"20+",l:"UX gaps closed"},{v:"$53M",l:"Revenue target supported"},{v:"3",l:"Regulated industries served"}],
      outcome:"Intel Federated AI Platform launched as a 0→1 product enabling enterprise ML teams to run distributed training without touching a command line.",
      results:"Launched Intel Federated AI 0→1, closing 20+ UX gaps in support of a $53M revenue target. The platform enabled enterprise ML teams in healthcare, finance, and government to run distributed AI training across sensitive datasets without touching a command line. The topology visualizer shipped as the product's primary demo artifact and centerpiece of enterprise sales conversations.",
      resultPoints:[
        "0→1 platform launch, first designed federated learning interface at enterprise scale",
        "20+ UX gaps closed against $53M revenue target",
        "Topology visualizer shipped as primary demo artifact for enterprise sales",
        "Three regulated industries served: healthcare, finance, government",
      ],
      leadership:[
        {title:"Domain Fluency as a Non-Negotiable Design Prerequisite",body:"I spent four weeks becoming genuinely fluent in federated learning before opening Figma. FedAvg/FedProx aggregation strategies, differential privacy noise injection, secure aggregation protocols, all of it. You cannot design honest abstractions for a system you don't understand. Engineers will know. And they will stop trusting you."},
        {title:"Holding the Tension Between Simplicity and Auditability",body:"Enterprise ML teams needed to run training jobs simply. Their compliance teams needed to prove no data left the organization. My design insight: these are orthogonal requirements, not competing ones. The interface could serve both through layered information architecture, task-focused on the surface, full audit trail one level down."},
        {title:"The Topology Visualizer, Fighting for the Signature Feature",body:"Engineering specified a table of nodes. I built a working prototype of a live graph visualizer, participating nodes, training status, gradient flow, privacy budget, and ran user testing. Time-to-comprehension dropped 80% for new users. I brought this to the engineering lead with a time estimate and a user testing report. The visualizer shipped. It became the product's primary demo artifact."},
      ],
      tradeoffs:[
        {decision:"Abstracting Privacy Parameters Without Lying to Expert Users",body:"Differential privacy parameters are meaningless to compliance officers and everything to ML researchers. I designed a layered privacy interface: plain-language risk indicators by default, raw epsilon/delta parameters one interaction depth down. This is translation, not simplification, a distinction that matters enormously when your users include both regulatory counsel and ML PhDs."},
        {decision:"Funding the Topology Visualizer Against Engineering Resistance",body:"The visualizer was expensive. Engineering correctly identified the timeline cost. I correctly identified that the table alternative would produce a product indistinguishable from CLI tooling with a browser skin. I presented the user testing data, acknowledged the cost in full, and asked explicitly for two additional sprints. This is the moment design leadership is actually tested, not in the design, but in the negotiation."},
      ],
      fedImages:[
        {key:"fed_dashboard",    label:"Shipped",  caption:"Federated AI Dashboard, active models (12), nodes online (2,458), completed experiments (86), ongoing training round with ETA, and global model accuracy at 94.2%"},
        {key:"fed_datasets",     label:"Shipped",  caption:"Datasets, privacy-aware dataset registry with type classification (Tabular, Image, Text, Audio), access controls (Public/Restricted/Private), and 42 managed datasets"},
        {key:"fed_model_summary",label:"Shipped",  caption:"Model Experiment Summary, Model_v3_Credit_Fraud: 98.2% accuracy, 0.04 loss, 4h 15m training run, with audit trail of epoch completions"},
        {key:"unified_amber",    label:"Process",  caption:"Amber Admin Architecture, multi-tenant hierarchy design: Amber Admin oversees GE (Power, Electric, Health) and BofA (Customer, Business, Wealth) tenant structure"},
        {key:"unified_perms",    label:"Process",  caption:"Permissions Matrix, role-based access: Tenant Admin, Infra Operator, Model Owner, Data Owner, with 'By default' vs 'Can be added' permission mapping"},
      ],
    }
  },
  {
    id:"intel-unified",index:"05",company:"Intel · Trust Authority",theme:"security",Icon:IconGrid,
    title:"Unified Trust Services Portal",subtitle:"Unified Admin Portal · Security SaaS · 2023–2024",industry:"Deep Tech / Security",
    stat2:"4",stat2Label:"Products unified",stat3:"0→1",stat3Label:"Admin platform",
    tags:["Enterprise SaaS","Identity","Security Platform"],
    thumbnail:IMG("sgx_users"),
    teaser:"Designed Intel's unified admin portal consolidating four security SaaS products, Intel® Tiber™ Trust Authority, Federated AI, Transparent Supply Chain, and Platform Lifecycle Integrity, into a single coherent operator experience for enterprise admins.",
    prototypeUrl:"https://www.figma.com/design/5K3Lw0CaT6dWa9QT9zyUkm/PulsePay-Operations-Manager-Focused-App?node-id=0-1",
    caseStudy:{
      role:"Lead Product Designer",duration:"2023–2024 · Intel",
      team:"1 Lead Designer · 3 Product Managers · 12 Platform Engineers · Enterprise Security Customers",
      overview:"Intel's Trust Authority portfolio had four distinct security SaaS products, each with its own onboarding, user management, and permissions model.",
      problem:"Enterprise admins managing Intel's security portfolio had to context-switch between four separate admin UIs, with duplicated provisioning and no cross-product visibility.",
      challenge:"Intel's enterprise security customers were managing four distinct SaaS products, Intel® Tiber™ Trust Authority, Federated AI, Transparent Supply Chain, and Platform Lifecycle Integrity, each with its own login, its own onboarding flow, its own user management, and its own permission model. For admins at enterprise accounts like GE or Bank of America, this meant four separate provisioning workflows, four separate role hierarchies, and no way to see who had access to what across the portfolio. The fragmentation was creating real compliance risk: access reviews were manual and error-prone, and there was no single audit trail. I was brought in to design the unified admin portal that would collapse this complexity into a single coherent operator surface.",
      pullQuote:"Before the unified portal, provisioning a new enterprise customer required a support-assisted call. I redesigned onboarding into a self-serve path that enterprise admins could complete without contacting Intel.",
      strategy:"The first challenge wasn't design, it was information architecture across four incompatible permission models. Each product team had built their own role hierarchy, and none of them mapped cleanly to the others. I ran a cross-product permissions audit, interviewing PMs and engineers from each team, and synthesized a unified RBAC model that preserved the semantics each product required while exposing a coherent interface to admins. I also designed the Amber Admin model, a super-admin tier that could oversee all tenants and company divisions simultaneously without collapsing the tenant-level permission boundaries compliance required. This was as much organizational design as product design.",
      strategyPoints:[
        "Cross-product permissions audit across 4 teams, synthesized unified RBAC from 4 incompatible models",
        "Amber Admin model: super-admin tier with cross-tenant visibility, tenant isolation preserved",
        "Single portal with product-scoped views, won over product-team preference for separate domains",
        "Self-serve onboarding: redesigned from support-assisted provisioning call to autonomous enterprise setup",
      ],
      process:"I built the permissions matrix — mapping every capability to every role across all four products — before wireframing a single screen. Engineering trusted the design because the logic was already solved. For onboarding, I redesigned the flow end-to-end: Azure identity federation, service catalog discovery, and initial user provisioning into a path that enterprise admins could complete without contacting Intel support. The previous process required a support-assisted provisioning call for every new enterprise customer. I worked with product teams across all four product lines to align on shared terminology, consistent navigation patterns, and a unified design language — navigating significant stakeholder pushback from teams that wanted to maintain their own portal identities.",
      processPoints:[
        "Built full permissions matrix (role × capability × product) before wireframing, engineering trusted the logic",
        "Redesigned onboarding: Azure federation → service discovery → provisioning, fully self-serve",
        "Aligned 4 product teams on shared terminology, nav patterns, and unified design language",
        "Navigated stakeholder resistance from product teams protecting individual portal identities",
      ],
      impact:[{v:"4",l:"Products unified"},{v:"0→1",l:"Admin portal"},{v:"Multi-role",l:"Cross-product RBAC"},{v:"Enterprise",l:"Customer adoption"}],
      outcome:"The Unified Trust Services Portal gave enterprise admins a single pane of glass across all four Intel security products.",
      results:"The Unified Trust Services Portal collapsed four separate admin experiences into a single coherent operator surface. Enterprise admins at accounts like GE and Bank of America could now provision, manage, and audit users across Intel® Tiber™ Trust Authority, Federated AI, Transparent Supply Chain, and Platform Lifecycle Integrity from a single login. The support-assisted onboarding call became a self-serve flow. The permissions matrix became the foundation for cross-product access reviews. The Amber Admin model gave enterprise security teams the cross-tenant visibility compliance required without compromising tenant isolation.",
      resultPoints:[
        "4 security SaaS products unified into one admin portal with single login",
        "Self-serve onboarding eliminated support-assisted provisioning calls for new enterprise customers",
        "Unified RBAC model across Tenant Admin, Infra Operator, Model Owner, and Data Owner roles",
        "Amber Admin tier enabled cross-tenant access reviews without breaking compliance boundaries",
      ],
      leadership:[
        {title:"Mapping Four Incompatible Permission Models Into One",body:"Each of the four products had its own role hierarchy. I ran a cross-product permissions audit, interviewing PMs and engineers from each team, and synthesized a unified RBAC model that preserved the semantics each product team required while exposing a single, coherent interface to admins. This was as much organizational design as it was product design."},
        {title:"Designing for the Admin Who Manages Enterprise Scale",body:"Our enterprise customers weren't managing ten users, they were managing hundreds across GE Power, GE Electric, GE Health, and Bank of America's business divisions simultaneously. I designed the Amber Admin model: a super-admin tier that could oversee all tenants without collapsing the tenant-level permission boundaries that compliance required."},
        {title:"Onboarding That Didn't Require a Support Ticket",body:"Before the unified portal, first-time setup for a new enterprise customer required a support-assisted provisioning call. I redesigned the onboarding flow end-to-end, Azure identity federation, service catalog discovery, and initial user provisioning, into a self-serve path that enterprise admins could complete without contacting Intel."},
      ],
      tradeoffs:[
        {decision:"Single URL vs. Product-Scoped Portals",body:"Product teams each wanted their own portal domain. Enterprise admins wanted one login. I made the case for a unified portal with product-scoped views, demonstrating through user research that cross-product context switching was the primary complaint among enterprise admins. The single portal shipped."},
        {decision:"Designing the Permissions Matrix Before the UI",body:"I built the permissions matrix, mapping every capability to every role across all four products, before wireframing a single screen. This meant every UI decision was grounded in an agreed-upon data model. Engineering trusted the design because the logic was already solved."},
      ],
      unifiedImages:[
        {key:"sgx_onb",   caption:"Onboarding, Azure profile federation into Intel Trust Services Catalog, surfacing all four security products on first login"},
        {key:"sgx_users", caption:"Manage All System Users, unified cross-product user table with product tags, role assignments, permission counts, and status across FedAI, TSC, ITTA, and PLI"},
        {key:"sgx_admin", caption:"Super Admin hierarchy, Amber Admin overseeing company-level and tenant-level access across enterprise divisions (GE Power, GE Electric, GE Health, BofA)"},
      ,
        {key:"unified_amber",  label:"Process", caption:"Amber Admin Architecture, multi-tenant hierarchy: Amber Admin oversees GE (Power, Electric, Health) and BofA (Customer, Business, Wealth)"},
        {key:"unified_perms",  label:"Process", caption:"Permissions Matrix, role-based access design: Tenant Admin, Infra Operator, Model Owner, Data Owner with permission mapping"},
      ],
    }
  },
  {
    id:"side-projects",index:"06",company:"Personal Projects",theme:"ai",Icon:IconBrain,
    title:"AI Tools & Side Projects",subtitle:"Built · Shipped · 2023–2025",industry:"AI / Fintech / Health",
    stat2:"4",stat2Label:"Shipped tools",stat3:"Live",stat3Label:"& deployed",
    tags:["AI Tools","LLM Apps","0→1 Build"],
    thumbnail:IMG("fed_dashboard"),
    teaser:"Four shipped AI tools built for fun, learning, and real problems, from construction site calculators to executive career weapons. Design-to-deploy, solo.",
    prototypeUrl:"https://the-closer.vercel.app/",
    caseStudy:{
      role:"Designer / Builder",duration:"2023–2025 · Personal",
      team:"Solo, design, prototyping, and build",
      overview:"Between enterprise engagements I build and ship real tools. These are not prototypes sitting in Figma. They are live, deployed, and solving actual problems.",
      impact:[{v:"4",l:"Tools shipped & live"},{v:"AI-first",l:"Build approach"},{v:"0→1",l:"Each from scratch"},{v:"2025",l:"All active"}],
      aiTools:[
        {
          index:"01",
          title:"Duct Measurement & Rotation Tool",
          year:"2023–2024",
          problem:"MEP engineers and construction teams waste hours manually calculating duct dimensions and rotation offsets on-site, with no mobile-native tool for real field conditions.",
          description:"Mobile-first calculator for HVAC duct sizing, rotation angles, and fitting dimensions. Built for real field use by mechanical engineers and contractors, not a demo.",
          stack:"Lovable V1 → Xcode · Flutter · Dart",
          status:"Shipped",
          link:null,
          linkLabel:null,
          emoji:"🔧",
          accent:"#60a5fa",
        },
        {
          index:"02",
          title:"Medical CPT Bulk Decoder",
          year:"2024",
          problem:"Medical bills contain CPT codes patients cannot decode, enabling hospitals to overcharge without friction. Most patients just pay.",
          description:"Paste your medical bill. Get every CPT code translated into plain English with typical cost ranges, so patients can identify and challenge incorrect charges.",
          stack:"React · Claude API · CPT code database",
          status:"Prototype",
          link:null,
          linkLabel:null,
          emoji:"🏥",
          accent:"#4ade80",
        },
        {
          index:"03",
          title:"The Closer",
          year:"2025",
          problem:"Elite candidates in Fintech, Deep Tech, and Cybersecurity negotiate blind, with no intelligence on compensation benchmarks, stakeholder dynamics, or asymmetric leverage.",
          description:"Tier-1 Executive Career Strategist AI. Orchestrates the acquisition of high-value seats using asymmetric technical intelligence, gamified negotiation protocols, and hostile takeover framing. Designed for candidates who don't ask for jobs, they acquire them.",
          stack:"React · Claude API · Vercel",
          status:"Live",
          link:"https://the-closer.vercel.app/",
          linkLabel:"Open The Closer →",
          emoji:"⚡",
          accent:"#E8FF47",
        },
        {
          index:"04",
          title:"ExecPrep, Interview & Resume Intelligence",
          year:"2025",
          problem:"Senior candidates prep for executive interviews with generic tips. No tool gives role-specific coaching, scores your resume against a real JD, or simulates the actual questions.",
          description:"AI-powered executive interview prep. Get tailored question sets, real-time resume scoring against job descriptions, and coaching suggestions tuned for Director+ roles in tech.",
          stack:"React · Claude API · Lovable",
          status:"Live",
          link:"https://lead-eperience-jobprep.lovable.app",
          linkLabel:"Open ExecPrep →",
          emoji:"🎯",
          accent:"#c084fc",
        },
      ],
    },
  },
];

/* --- MOCK SCREEN ------------------------------------------ */
function MockScreen({screen}){
  const p={dashboard:{line:"#E8FF47",bg:"#0d1117"},builder:{line:"#38bdf8",bg:"#0a0f1a"},catalog:{line:"#c084fc",bg:"#0f0d17"},analytics:{line:"#4ade80",bg:"#0d1a0f"}}[screen.type]||{line:"#E8FF47",bg:"#0d1117"};
  const bars=[42,68,55,82,58,74,48,88,62,77];
  return(
    <div style={{borderRadius:"4px",overflow:"hidden",border:"1px solid #2a2a2a",background:p.bg}}>
      <div style={{padding:"6px 9px",background:"rgba(255,255,255,0.03)",borderBottom:"1px solid #222",display:"flex",alignItems:"center",gap:"5px"}}>
        {[p.line,"#333","#333"].map((c,i)=><div key={i} style={{width:"6px",height:"6px",borderRadius:"50%",background:c}}/>)}
        <span style={{fontFamily:"'DM Mono',monospace",fontSize:"8.5px",color:"#777",marginLeft:"5px"}}>{screen.label}</span>
      </div>
      <div style={{padding:"10px 10px 10px 32px",position:"relative",minHeight:"90px"}}>
        <div style={{position:"absolute",left:0,top:0,bottom:0,width:"24px",background:"rgba(255,255,255,0.015)",borderRight:"1px solid #1e1e1e",display:"flex",flexDirection:"column",alignItems:"center",paddingTop:"12px",gap:"9px"}}>
          {[...Array(5)].map((_,i)=><div key={i} style={{width:"12px",height:"2px",background:i===0?p.line:"#232323",borderRadius:"1px"}}/>)}
        </div>
        <div style={{display:"flex",gap:"4px",marginBottom:"8px"}}>
          {["2.4M","1,248","99.2%","14ms"].map((s,i)=>(
            <div key={i} style={{background:"rgba(255,255,255,0.025)",border:"1px solid #1e1e1e",padding:"4px 6px",flex:1}}>
              <div style={{fontFamily:"'Fraunces',serif",fontSize:"9px",fontWeight:700,color:i===0?p.line:"#666"}}>{s}</div>
            </div>
          ))}
        </div>
        <div style={{background:"rgba(255,255,255,0.018)",border:"1px solid #1e1e1e",padding:"5px",borderRadius:"2px"}}>
          <svg viewBox="0 0 220 100" style={{width:"100%",height:"40px"}}>
            {bars.map((h,i)=><rect key={i} x={i*22+2} y={100-h} width="15" height={h} fill={p.line} opacity={i===7?0.9:0.28} rx="1"/>)}
            <polyline points={bars.map((h,i)=>`${i*22+10},${100-h}`).join(" ")} fill="none" stroke={p.line} strokeWidth="1.5" opacity="0.7"/>
            {bars.map((h,i)=><circle key={i} cx={i*22+10} cy={100-h} r="2.5" fill={p.line} opacity="0.85"/>)}
          </svg>
        </div>
      </div>
    </div>
  );
}

/* --- CARD THEME BG ---------------------------------------- */
function CardThemeBg({theme,hov}){
  const op=hov?0.2:0.1;
  if(theme==="fintech") return(
    <div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden",opacity:op,transition:"opacity 0.3s"}}>
      <svg style={{position:"absolute",bottom:0,right:0,width:"200px",height:"160px",color:"#38bdf8"}} viewBox="0 0 200 160">
        <path d="M200 100 L140 100 L140 70 L105 70 L105 44 L72 44" stroke="currentColor" strokeWidth="0.9" fill="none"/>
        <path d="M200 128 L160 128 L160 90 L120 90 L120 62" stroke="currentColor" strokeWidth="0.65" fill="none" opacity="0.6"/>
        <circle cx="140" cy="100" r="4" fill="currentColor"/><circle cx="105" cy="70" r="4" fill="currentColor"/>
        <rect x="14" y="97" width="54" height="34" rx="4" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6"/>
        <rect x="19" y="108" width="14" height="9" rx="2" fill="currentColor" opacity="0.3"/>
        <circle cx="60" cy="111" r="5" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5"/>
        <circle cx="66" cy="111" r="5" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3"/>
      </svg>
    </div>
  );
  if(theme==="security") return(
    <div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden",opacity:op,transition:"opacity 0.3s"}}>
      <svg style={{position:"absolute",bottom:0,right:0,width:"180px",height:"170px",color:"#c084fc"}} viewBox="0 0 180 170">
        <path d="M90 10 L163 42 L163 98 C163 133 128 155 90 160 C52 155 17 133 17 98 L17 42 Z" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.45"/>
        <path d="M90 30 L143 56 L143 98 C143 124 120 140 90 145 C60 140 37 124 37 98 L37 56 Z" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.28"/>
        <path d="M62 88 L80 106 L118 68" stroke="currentColor" strokeWidth="1.6" fill="none" opacity="0.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
  if(theme==="ai") return(
    <div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden",opacity:op,transition:"opacity 0.3s"}}>
      <svg style={{position:"absolute",bottom:0,right:0,width:"210px",height:"165px",color:"#4ade80"}} viewBox="0 0 210 165">
        {[[18,70],[18,108],[66,50],[66,88],[66,128],[114,70],[114,108],[162,89]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="6" fill="none" stroke="currentColor" strokeWidth="0.9" opacity="0.65"/>)}
        {[[18,70,66,50],[18,70,66,88],[18,108,66,88],[18,108,66,128],[66,50,114,70],[66,88,114,70],[66,88,114,108],[66,128,114,108],[114,70,162,89],[114,108,162,89]].map(([x1,y1,x2,y2],i)=><line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="0.6" opacity="0.4"/>)}
      </svg>
    </div>
  );
  return null;
}

/* --- BANK VAULT ------------------------------------------- */
function BankVault(){
  const [dialRot,setDialRot]=useState(0);
  const [isOpen,setIsOpen]=useState(false);
  const [hovered,setHovered]=useState(false);
  const [dragging,setDragging]=useState(false);
  const totalRot=useRef(0);
  const lastAngle=useRef(0);
  const center=useRef({x:0,y:0});
  const dialRef=useRef(null);
  const isDragging=useRef(false);

  const getAngle=(cx,cy,ex,ey)=>Math.atan2(ey-cy,ex-cx)*(180/Math.PI);

  const onDialDown=useCallback((e)=>{
    e.preventDefault();e.stopPropagation();
    isDragging.current=true;setDragging(true);
    const r=dialRef.current?.getBoundingClientRect();
    if(r) center.current={x:r.left+r.width/2,y:r.top+r.height/2};
    lastAngle.current=getAngle(center.current.x,center.current.y,e.clientX,e.clientY);
  },[]);

  useEffect(()=>{
    const onMove=(e)=>{
      if(!isDragging.current)return;
      const a=getAngle(center.current.x,center.current.y,e.clientX,e.clientY);
      const d=((a-lastAngle.current+540)%360)-180;
      lastAngle.current=a;
      totalRot.current+=d;
      setDialRot(r=>r+d);
      if(Math.abs(totalRot.current)>=360&&!isOpen) setIsOpen(true);
    };
    const onUp=()=>{isDragging.current=false;setDragging(false);};
    window.addEventListener("mousemove",onMove);
    window.addEventListener("mouseup",onUp);
    return()=>{window.removeEventListener("mousemove",onMove);window.removeEventListener("mouseup",onUp);};
  },[isOpen]);

  const reset=()=>{setIsOpen(false);setDialRot(0);totalRot.current=0;};

  const S=320,C=S/2;
  // 8 large bolts on outer ring
  const bolts=[0,45,90,135,180,225,270,315].map(deg=>({
    x:C+(C-20)*Math.cos((deg-90)*Math.PI/180)-8,
    y:C+(C-20)*Math.sin((deg-90)*Math.PI/180)-8,
  }));

  return(
    <div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{position:"relative",width:`${S}px`,height:`${S}px`,userSelect:"none",flexShrink:0}}>

      {/* -- VAULT DOOR -- */}
      <div style={{
        position:"absolute",inset:0,borderRadius:"8px",
        background:"linear-gradient(160deg,#2e2e2e 0%,#1a1a1a 30%,#222 55%,#111 100%)",
        border:"3px solid #3a3a3a",
        boxShadow:isOpen
          ?"0 0 60px rgba(232,255,71,0.12),0 30px 80px rgba(0,0,0,0.9),inset 0 0 40px rgba(0,0,0,0.8)"
          :"0 24px 80px rgba(0,0,0,0.85),inset 0 2px 4px rgba(255,255,255,0.06),inset 0 -2px 4px rgba(0,0,0,0.5),0 0 0 1px rgba(0,0,0,0.5)",
        transition:"box-shadow 0.6s",overflow:"hidden",
      }}>
        {/* Steel texture lines */}
        {!isOpen&&[...Array(8)].map((_,i)=>(
          <div key={i} style={{position:"absolute",left:0,right:0,height:"1px",top:`${(i+1)*S/9}px`,background:"rgba(255,255,255,0.025)",pointerEvents:"none"}}/>
        ))}
        {/* Corner reinforcement plates */}
        {!isOpen&&[[0,0],[S-40,0],[0,S-40],[S-40,S-40]].map(([x,y],i)=>(
          <div key={i} style={{position:"absolute",left:x,top:y,width:"40px",height:"40px",
            background:"linear-gradient(135deg,rgba(255,255,255,0.04),rgba(0,0,0,0.15))",
            border:"1px solid rgba(255,255,255,0.07)",pointerEvents:"none"}}/>
        ))}
        {/* Outer bolt ring */}
        {!isOpen&&bolts.map(({x,y},i)=>(
          <div key={i} style={{position:"absolute",left:`${x}px`,top:`${y}px`,width:"16px",height:"16px",borderRadius:"50%",
            background:"radial-gradient(circle at 38% 38%,#484848,#1a1a1a)",
            border:"1px solid #555",
            boxShadow:"0 2px 4px rgba(0,0,0,0.7),inset 0 1px 2px rgba(255,255,255,0.08)"}}>
            {/* Flathead slot */}
            <div style={{position:"absolute",top:"6px",left:"3px",right:"3px",height:"1.5px",background:"rgba(0,0,0,0.5)"}}/>
          </div>
        ))}
        {/* Manufacturer plate */}
        {!isOpen&&(
          <div style={{position:"absolute",top:"14px",left:"50%",transform:"translateX(-50%)",
            background:"linear-gradient(180deg,#2a2a2a,#1e1e1e)",border:"1px solid #3a3a3a",
            padding:"4px 16px",borderRadius:"2px"}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:"8px",color:"rgba(255,255,255,0.25)",letterSpacing:"0.35em",textTransform:"uppercase",whiteSpace:"nowrap"}}>GOLDFARB · SECURE · MFG 2017</div>
          </div>
        )}
        {/* Bottom serial */}
        {!isOpen&&(
          <div style={{position:"absolute",bottom:"14px",left:"50%",transform:"translateX(-50%)",
            fontFamily:"'DM Mono',monospace",fontSize:"7px",color:"rgba(255,255,255,0.15)",letterSpacing:"0.2em",whiteSpace:"nowrap"}}>
            SN-AG-2017-DIR · CLASS IV
          </div>
        )}

        {/* -- MAIN COMBINATION DIAL -- */}
        {!isOpen&&(
          <div ref={dialRef} onMouseDown={onDialDown}
            style={{
              position:"absolute",top:"50%",left:"50%",
              width:"140px",height:"140px",
              marginTop:"-70px",marginLeft:"-70px",
              borderRadius:"50%",
              background:"radial-gradient(circle at 40% 38%,#3a3a3a 0%,#282828 40%,#1a1a1a 100%)",
              border:"3px solid #4a4a4a",
              boxShadow:dragging
                ?"0 0 24px rgba(232,255,71,0.2),0 8px 32px rgba(0,0,0,0.9),inset 0 2px 4px rgba(255,255,255,0.08)"
                :"0 8px 32px rgba(0,0,0,0.8),inset 0 2px 4px rgba(255,255,255,0.06),inset 0 -2px 4px rgba(0,0,0,0.5)",
              cursor:dragging?"grabbing":"grab",
              transform:`rotate(${dialRot}deg)`,
              zIndex:5,
            }}>
            {/* Chrome ring */}
            <div style={{position:"absolute",inset:"6px",borderRadius:"50%",border:"1px solid rgba(255,255,255,0.12)",pointerEvents:"none"}}/>
            {/* Tick marks, 40 fine + 8 major */}
            {[...Array(40)].map((_,i)=>{
              const deg=i*9,rad=(deg-90)*Math.PI/180,big=i%5===0;
              const r1=big?28:34,r2=48;
              const x1=70+r1*Math.cos(rad),y1=70+r1*Math.sin(rad);
              const x2=70+r2*Math.cos(rad),y2=70+r2*Math.sin(rad);
              return(
                <svg key={i} style={{position:"absolute",inset:0,width:"100%",height:"100%",overflow:"visible",pointerEvents:"none"}} viewBox="0 0 140 140">
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(220,220,220,1)" strokeWidth={big?"1.8":"0.7"} opacity={big?0.55:0.2}/>
                </svg>
              );
            })}
            {/* Number labels at 0 / 25 / 50 / 75 */}
            {[0,25,50,75].map((n,i)=>{
              const rad=(i*90-90)*Math.PI/180,r=22;
              return(
                <div key={n} style={{position:"absolute",
                  left:`${70+r*Math.cos(rad)-5}px`,
                  top:`${70+r*Math.sin(rad)-5}px`,
                  fontFamily:"'DM Mono',monospace",fontSize:"7px",color:"rgba(255,255,255,0.4)",
                  width:"10px",textAlign:"center",lineHeight:1}}>{n}</div>
              );
            })}
            {/* Yellow indicator at 12 */}
            <div style={{position:"absolute",top:"5px",left:"50%",marginLeft:"-2.5px",width:"5px",height:"18px",background:"#E8FF47",borderRadius:"3px",opacity:0.9}}/>
            {/* Center spindle */}
            <div style={{position:"absolute",top:"50%",left:"50%",width:"26px",height:"26px",marginTop:"-13px",marginLeft:"-13px",borderRadius:"50%",
              background:"radial-gradient(circle at 38% 38%,#5a5a5a,#252525)",
              border:"2px solid #666",
              boxShadow:"0 2px 8px rgba(0,0,0,0.8),inset 0 1px 2px rgba(255,255,255,0.12)"}}>
              {/* Spindle cross */}
              <div style={{position:"absolute",top:"11px",left:"3px",right:"3px",height:"2px",background:"rgba(0,0,0,0.4)",borderRadius:"1px"}}/>
              <div style={{position:"absolute",left:"11px",top:"3px",bottom:"3px",width:"2px",background:"rgba(0,0,0,0.4)",borderRadius:"1px"}}/>
            </div>
            {/* Grip ridges around edge */}
            {[...Array(16)].map((_,i)=>{
              const rad=i*(360/16)*Math.PI/180;
              const x=70+58*Math.cos(rad)-2,y=70+58*Math.sin(rad)-8;
              return(
                <div key={i} style={{position:"absolute",left:`${x}px`,top:`${y}px`,width:"4px",height:"16px",background:"rgba(0,0,0,0.35)",borderRadius:"2px",transform:`rotate(${i*(360/16)}deg)`,transformOrigin:"2px 8px"}}/>
              );
            })}
          </div>
        )}

        {/* -- HANDLE LEVER (static, decorative) -- */}
        {!isOpen&&(
          <div style={{position:"absolute",right:"22px",top:"50%",marginTop:"-44px"}}>
            {/* Handle shaft */}
            <div style={{width:"22px",height:"88px",background:"linear-gradient(180deg,#3a3a3a,#1e1e1e,#2a2a2a)",border:"1px solid #4a4a4a",borderRadius:"4px",boxShadow:"2px 0 8px rgba(0,0,0,0.6)",position:"relative"}}>
              {/* Grip notches */}
              {[18,34,50,66].map(top=>(
                <div key={top} style={{position:"absolute",left:"3px",right:"3px",top:`${top}px`,height:"2px",background:"rgba(0,0,0,0.4)",borderRadius:"1px"}}/>
              ))}
            </div>
            {/* Top knob */}
            <div style={{width:"22px",height:"22px",borderRadius:"50%",background:"radial-gradient(circle at 38% 38%,#4a4a4a,#1e1e1e)",border:"1px solid #555",marginTop:"-11px",marginLeft:0,boxShadow:"0 2px 6px rgba(0,0,0,0.7)"}}/>
          </div>
        )}

        {/* -- OPEN STATE — reveal photo -- */}
        {isOpen&&(
          <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"radial-gradient(circle at 42% 48%,#0e1a0a 0%,#060606 65%)",animation:"fadeIn 0.5s ease 0.3s both"}}>
            {/* Vault interior shadow ring */}
            <div style={{position:"absolute",inset:"20px",borderRadius:"6px",boxShadow:"inset 0 0 40px rgba(0,0,0,0.8)",pointerEvents:"none"}}/>
            <div style={{width:"180px",height:"180px",borderRadius:"50%",overflow:"hidden",border:"3px solid rgba(232,255,71,0.6)",boxShadow:"0 0 50px rgba(232,255,71,0.2)"}}>
              <img src={PHOTO_SRC} alt="Alexandra Goldfarb" style={{width:"100%",height:"100%",objectFit:"cover",imageRendering:"auto",WebkitBackfaceVisibility:"hidden",objectPosition:"center top"}}/>
            </div>
            <div style={{marginTop:"16px",textAlign:"center"}}>
              <div style={{fontFamily:"'Fraunces',serif",fontSize:"14px",fontWeight:700,color:"#E8FF47",letterSpacing:"0.05em"}}>Access Granted</div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:"9px",color:"rgba(232,255,71,0.5)",letterSpacing:"0.14em",textTransform:"uppercase",marginTop:"4px"}}>Director Level · Class IV Clearance</div>
            </div>
            <button onClick={reset}
              title="Lock vault"
              style={{marginTop:"14px",background:"none",border:"1px solid rgba(232,255,71,0.2)",color:"rgba(232,255,71,0.45)",cursor:"pointer",width:"38px",height:"38px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s",padding:0}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(232,255,71,0.55)";e.currentTarget.style.color="rgba(232,255,71,0.85)";e.currentTarget.style.background="rgba(232,255,71,0.06)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(232,255,71,0.2)";e.currentTarget.style.color="rgba(232,255,71,0.45)";e.currentTarget.style.background="none";}}>
              <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                <rect x="1" y="8" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M4 8V5.5a4 4 0 018 0V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                <circle cx="8" cy="13" r="1.5" fill="currentColor"/>
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Hint */}
      <div style={{position:"absolute",bottom:"-38px",left:"50%",transform:"translateX(-50%)",fontFamily:"'DM Mono',monospace",fontSize:"9px",color:"rgba(232,255,71,0.35)",letterSpacing:"0.12em",textTransform:"uppercase",whiteSpace:"nowrap",opacity:hovered?1:0.35,transition:"opacity 0.3s"}}>
        {isOpen?"vault open · director clearance achieved":"drag the combination dial · full rotation to unlock"}
      </div>
    </div>
  );
}

/* --- SCREEN GALLERY COMPONENT ----------------------------- */

// Desktop browser frame wrapper for screenshots
function DesktopFrame({src,alt,onClick,style={}}) {
  return (
    <div style={{background:"#1a1a1a",borderRadius:"10px",border:"1px solid #2a2a2a",overflow:"hidden",...style}}>
      {/* Browser chrome */}
      <div style={{background:"#242424",padding:"9px 14px",display:"flex",alignItems:"center",gap:"7px",borderBottom:"1px solid #2e2e2e"}}>
        <div style={{width:"11px",height:"11px",borderRadius:"50%",background:"#ff5f57"}}/>
        <div style={{width:"11px",height:"11px",borderRadius:"50%",background:"#ffbd2e"}}/>
        <div style={{width:"11px",height:"11px",borderRadius:"50%",background:"#28c840"}}/>
        <div style={{flex:1,background:"#1c1c1c",borderRadius:"4px",height:"20px",margin:"0 12px",display:"flex",alignItems:"center",paddingLeft:"10px"}}>
          <div style={{width:"12px",height:"12px",borderRadius:"50%",background:"#3a3a3a",marginRight:"7px"}}/>
          <div style={{width:"60%",height:"7px",borderRadius:"3px",background:"#2e2e2e"}}/>
        </div>
        <div style={{display:"flex",gap:"5px"}}>
          {[0,1,2].map(i=><div key={i} style={{width:"18px",height:"14px",borderRadius:"3px",background:"#2a2a2a"}}/>)}
        </div>
      </div>
      {/* Screen */}
      <div style={{cursor:onClick?"zoom-in":"default"}} onClick={onClick}>
        <img src={src} alt={alt} style={{width:"100%",display:"block",objectFit:"cover",imageRendering:"auto",WebkitBackfaceVisibility:"hidden"}}/>
      </div>
    </div>
  );
}

function ScreenGallery({images,ac}){
  const [slide,setSlide]=useState(0);
  const [light,setLight]=useState(null);
  const heroImgs=images.slice(0,2);
  const thumbImgs=images.slice(2);
  return(
    <>
      {/* Hero: first 2 full width with desktop frame */}
      <div style={{display:"flex",flexDirection:"column",gap:"24px",marginBottom:"24px"}}>
        {heroImgs.map((img,i)=>(
          <div key={i}>
            <DesktopFrame src={img.src||CP_SHOTS[img.idx]} alt={img.caption} onClick={()=>setLight(img)}/>
            <div style={{fontFamily:"'Epilogue',sans-serif",fontSize:"13px",color:"#888",marginTop:"10px",lineHeight:1.5,fontWeight:400,fontStyle:"italic"}}>{img.caption}</div>
          </div>
        ))}
      </div>
      {/* Card-swipe carousel for remaining */}
      {thumbImgs.length>0&&(
        <div style={{marginBottom:"36px"}}>
          <div style={{position:"relative",overflow:"hidden",borderRadius:"8px",border:"1px solid #2a2a2a",background:"#0a0a0a"}}>
            <div style={{display:"flex",transition:"transform 0.42s cubic-bezier(0.25,1,0.5,1)",transform:`translateX(-${slide*100}%)`}}>
              {thumbImgs.map((img,i)=>(
                <div key={i} style={{minWidth:"100%",flexShrink:0,padding:"0 2px"}}>
                  <DesktopFrame src={img.src||CP_SHOTS[img.idx]} alt={img.caption} onClick={()=>setLight(img)}/>
                </div>
              ))}
            </div>
            {slide>0&&<button onClick={()=>setSlide(s=>s-1)} style={{position:"absolute",left:"14px",top:"50%",transform:"translateY(-50%)",background:"rgba(0,0,0,0.75)",border:"1px solid #333",color:"#E8FF47",width:"40px",height:"40px",borderRadius:"2px",cursor:"pointer",fontSize:"22px",display:"flex",alignItems:"center",justifyContent:"center"}}>&#8249;</button>}
            {slide<thumbImgs.length-1&&<button onClick={()=>setSlide(s=>s+1)} style={{position:"absolute",right:"14px",top:"50%",transform:"translateY(-50%)",background:"rgba(0,0,0,0.75)",border:"1px solid #333",color:"#E8FF47",width:"40px",height:"40px",borderRadius:"2px",cursor:"pointer",fontSize:"22px",display:"flex",alignItems:"center",justifyContent:"center"}}>&#8250;</button>}
          </div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:"12px",gap:"16px"}}>
            <div style={{fontFamily:"'Epilogue',sans-serif",fontSize:"13px",color:"#c0c0c0",lineHeight:1.5,fontWeight:400}}>{thumbImgs[slide]?.caption}</div>
            <div style={{display:"flex",gap:"6px",flexShrink:0}}>
              {thumbImgs.map((_,i)=>(
                <button key={i} onClick={()=>setSlide(i)} style={{width:i===slide?"28px":"6px",height:"6px",borderRadius:"3px",background:i===slide?ac:"#333",border:"none",cursor:"pointer",padding:0,transition:"all 0.3s ease"}}/>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Lightbox */}
      {light&&(
        <div onClick={()=>setLight(null)} style={{position:"fixed",inset:0,zIndex:1000,background:"rgba(0,0,0,0.94)",display:"flex",alignItems:"center",justifyContent:"center",padding:"24px",cursor:"zoom-out"}}>
          <div onClick={e=>e.stopPropagation()} style={{maxWidth:"1100px",width:"100%"}}>
            <img src={light.src||CP_SHOTS[light.idx]} alt={light.caption} style={{width:"100%",display:"block",borderRadius:"6px",border:"1px solid #333"}}/>
            <div style={{fontFamily:"'Epilogue',sans-serif",fontSize:"14px",color:"#d0d0d0",marginTop:"14px",textAlign:"center",fontWeight:400}}>{light.caption}</div>
          </div>
        </div>
      )}
    </>
  );
}

/* --- CASE STUDY MODAL ------------------------------------- */
function CaseStudyModal({project,onClose}){
  const [tab,setTab]=useState(0);
  const [light,setLight]=useState(null);
  const cs=project.caseStudy;
  const ac=project.theme==="fintech"?"#38bdf8":project.theme==="security"?"#c084fc":"#4ade80";
  useEffect(()=>{
    document.body.style.overflow="hidden";
    const k=(e)=>{if(e.key==="Escape")onClose();};
    window.addEventListener("keydown",k);
    return()=>{document.body.style.overflow="";window.removeEventListener("keydown",k);};
  },[onClose]);
  const TABS=["Overview & Impact","Design Leadership","Decisions & Trade-offs"];
  return(
    <>
    <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:500,background:"rgba(4,4,4,0.95)",backdropFilter:"blur(24px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px",animation:"fadeIn 0.2s ease"}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#111",border:`1px solid ${ac}44`,width:"100%",maxWidth:"1000px",maxHeight:"92vh",overflowY:"auto",position:"relative",animation:"slideUp 0.32s cubic-bezier(0.16,1,0.3,1)",boxShadow:`0 0 80px ${ac}11`}}>
        {/* Sticky header */}
        <div style={{position:"sticky",top:0,zIndex:10,background:"#111",borderBottom:"1px solid #2a2a2a",padding:"22px 36px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"16px"}}>
          <div>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:"11px",color:ac,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:"6px",opacity:0.9}}>{project.company}</div>
            <h2 style={{fontFamily:"'Fraunces',serif",fontSize:"clamp(20px,2.5vw,30px)",fontWeight:700,color:"#f5f5f5",letterSpacing:"-0.02em"}}>{project.title}</h2>
          </div>
          <div style={{display:"flex",gap:"10px",alignItems:"center",flexShrink:0}}>
            {project.liveUrl&&(
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                style={{fontFamily:"'DM Mono',monospace",fontSize:"10px",letterSpacing:"0.14em",textTransform:"uppercase",color:"#080808",background:"#E8FF47",padding:"11px 20px",textDecoration:"none",fontWeight:700,transition:"background 0.2s",whiteSpace:"nowrap"}}
                onMouseEnter={e=>e.currentTarget.style.background="#f5ff7a"}
                onMouseLeave={e=>e.currentTarget.style.background="#E8FF47"}>View Live Site ↗</a>
            )}
            <button onClick={onClose} style={{background:"none",border:"1px solid #333",color:"#999",cursor:"pointer",width:"38px",height:"38px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"15px",transition:"all 0.2s",flexShrink:0}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="#E8FF47";e.currentTarget.style.color="#E8FF47";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="#333";e.currentTarget.style.color="#999";}}>✕</button>
          </div>
        </div>
        {/* Meta strip */}
        <div style={{padding:"14px 36px",background:"#0d0d0d",borderBottom:"1px solid #222",display:"flex",gap:"36px",flexWrap:"wrap"}}>
          {[{l:"Role",v:cs.role},{l:"Duration",v:cs.duration}].map(({l,v})=>(
            <div key={l}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:"10px",color:ac,letterSpacing:"0.16em",textTransform:"uppercase",marginBottom:"4px",opacity:0.75}}>{l}</div>
              <div style={{fontFamily:"'Epilogue',sans-serif",fontSize:"15px",color:"#e8e8e8",fontWeight:500}}>{v}</div>
            </div>
          ))}
          <div style={{marginLeft:"auto",maxWidth:"460px"}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:"10px",color:ac,letterSpacing:"0.16em",textTransform:"uppercase",marginBottom:"4px",opacity:0.75}}>Team</div>
            <div style={{fontFamily:"'Epilogue',sans-serif",fontSize:"13px",color:"#d8d8d8",lineHeight:1.6,fontWeight:400}}>{cs.team}</div>
          </div>
        </div>
        {/* Hero image above tabs */}
        {project.thumbnail&&(
          <div style={{width:"100%",height:"240px",overflow:"hidden",position:"relative",borderBottom:"1px solid #1a1a1a",flexShrink:0}}>
            <img src={project.thumbnail} alt={project.title} style={{width:"100%",height:"100%",objectFit:"cover",imageRendering:"auto",WebkitBackfaceVisibility:"hidden",objectPosition:"top center",display:"block"}}/>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent 50%,rgba(17,17,17,0.85) 100%)"}}/>
          </div>
        )}
        {/* Tabs */}
        <div style={{borderBottom:"1px solid #222",display:"flex",overflowX:"auto",background:"#0e0e0e"}}>
          {TABS.map((t,i)=>(
            <button key={t} onClick={()=>setTab(i)} style={{background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Mono',monospace",fontSize:"11px",letterSpacing:"0.12em",textTransform:"uppercase",color:tab===i?ac:"#888",padding:"15px 22px",borderBottom:tab===i?`2px solid ${ac}`:"2px solid transparent",transition:"color 0.2s",marginBottom:"-1px",whiteSpace:"nowrap",fontWeight:tab===i?600:400}}>{t}</button>
          ))}
        </div>
        <div style={{padding:"38px 36px"}}>
          {/* TAB 0 */}
          {tab===0&&(
            <div style={{animation:"fadeIn 0.22s ease"}}>
              {/* -- SIDE PROJECTS special render -- */}
              {project.id==="side-projects"?(
                <>
                  <p style={{fontFamily:"'Epilogue',sans-serif",fontSize:"16px",color:"#c8c8c8",lineHeight:1.7,marginBottom:"48px",fontWeight:300}}>{cs.overview}</p>

                  {/* AI Tools, new card layout */}
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:"10px",color:"#4ade80",letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:"24px",opacity:0.8}}>Shipped Projects</div>
                  <div style={{display:"flex",flexDirection:"column",gap:"0px",marginBottom:"60px",border:"1px solid #1e1e1e",borderRadius:"4px",overflow:"hidden"}}>
                    {cs.aiTools.map((tool,i)=>(
                      <div key={i} style={{display:"grid",gridTemplateColumns:"64px 1fr",borderBottom:i<cs.aiTools.length-1?"1px solid #1a1a1a":"none",background:i%2===0?"#0a0a0a":"#0d0d0d",transition:"background 0.2s"}}
                        onMouseEnter={e=>e.currentTarget.style.background="#111"}
                        onMouseLeave={e=>e.currentTarget.style.background=i%2===0?"#0a0a0a":"#0d0d0d"}
                      >
                        {/* Left, index + emoji */}
                        <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-start",paddingTop:"28px",borderRight:"1px solid #1a1a1a",gap:"10px"}}>
                          <div style={{fontFamily:"'DM Mono',monospace",fontSize:"10px",color:"#333",letterSpacing:"0.1em"}}>{tool.index}</div>
                          <div style={{fontSize:"22px",lineHeight:1}}>{tool.emoji}</div>
                        </div>
                        {/* Right, content */}
                        <div style={{padding:"24px 28px 24px 24px"}}>
                          {/* Header row */}
                          <div style={{display:"flex",alignItems:"baseline",justifyContent:"space-between",gap:"12px",marginBottom:"6px",flexWrap:"wrap"}}>
                            <div style={{fontFamily:"'Fraunces',serif",fontSize:"20px",fontWeight:800,color:"#f0f0f0",letterSpacing:"-0.02em",lineHeight:1.2}}>{tool.title}</div>
                            <div style={{display:"flex",gap:"8px",alignItems:"center",flexShrink:0}}>
                              <span style={{fontFamily:"'DM Mono',monospace",fontSize:"9px",color:tool.status==="Live"?"#4ade80":"#888",background:tool.status==="Live"?"rgba(74,222,128,0.1)":"#161616",border:`1px solid ${tool.status==="Live"?"rgba(74,222,128,0.3)":"#2a2a2a"}`,padding:"3px 9px",borderRadius:"2px",letterSpacing:"0.1em"}}>{tool.status}</span>
                              <span style={{fontFamily:"'DM Mono',monospace",fontSize:"9px",color:"#555"}}>{tool.year}</span>
                            </div>
                          </div>

                          {/* Problem */}
                          <div style={{fontFamily:"'DM Mono',monospace",fontSize:"9px",color:tool.accent||"#888",letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:"8px",opacity:0.85}}>The Problem</div>
                          <p style={{fontFamily:"'Epilogue',sans-serif",fontSize:"14px",color:"#aaa",lineHeight:1.65,marginBottom:"16px",fontWeight:300,fontStyle:"italic"}}>{tool.problem}</p>

                          {/* Description */}
                          <div style={{fontFamily:"'DM Mono',monospace",fontSize:"9px",color:tool.accent||"#888",letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:"8px",opacity:0.85}}>What It Does</div>
                          <p style={{fontFamily:"'Epilogue',sans-serif",fontSize:"14px",color:"#d0d0d0",lineHeight:1.7,marginBottom:"18px",fontWeight:400}}>{tool.description}</p>

                          {/* Footer row, stack + link */}
                          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"12px",paddingTop:"14px",borderTop:"1px solid #1a1a1a"}}>
                            <div style={{fontFamily:"'DM Mono',monospace",fontSize:"9px",color:"#444",letterSpacing:"0.05em"}}>
                              <span style={{color:"#2a2a2a",marginRight:"6px"}}>Built with:</span>{tool.stack}
                            </div>
                            {tool.link&&(
                              <a href={tool.link} target="_blank" rel="noopener noreferrer"
                                style={{fontFamily:"'DM Mono',monospace",fontSize:"11px",color:tool.accent||"#E8FF47",letterSpacing:"0.08em",textDecoration:"none",padding:"7px 16px",border:`1px solid ${tool.accent||"#E8FF47"}`,borderRadius:"2px",display:"inline-flex",alignItems:"center",gap:"6px",opacity:0.9,transition:"opacity 0.15s"}}
                                onMouseEnter={e=>e.currentTarget.style.opacity="1"}
                                onMouseLeave={e=>e.currentTarget.style.opacity="0.9"}
                              >{tool.linkLabel}</a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ):(
              <>
              {/* 1 - IMPACT METRICS */}
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:"10px",color:"#aaa",letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:"14px"}}>Impact Metrics</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:"1px",background:"#2a2a2a",marginBottom:"30px"}}>
                {cs.impact.map((m,i)=>(
                  <div key={i} style={{background:"#111",padding:"20px 16px"}}>
                    <div style={{fontFamily:"'Fraunces',serif",fontSize:"clamp(20px,2.4vw,30px)",fontWeight:700,color:"#E8FF47",letterSpacing:"-0.02em",marginBottom:"7px"}}>{m.v}</div>
                    <div style={{fontFamily:"'Epilogue',sans-serif",fontSize:"13px",color:"#cccccc",lineHeight:1.5,fontWeight:400}}>{m.l}</div>
                  </div>
                ))}
              </div>
              {/* 2 - DESCRIPTION */}
              <p style={{fontFamily:"'Epilogue',sans-serif",fontSize:"16px",color:"#d8d8d8",lineHeight:1.75,fontWeight:300,marginBottom:"30px"}}>{cs.outcome}</p>
              {/* 3 - FIRST IMAGE */}
              {cs.provenirImages?(
                <div style={{marginBottom:"30px"}}>
                  <div style={{position:"relative"}}>
                    <DesktopFrame src={IMG(cs.provenirImages[0].key)} alt={cs.provenirImages[0].caption}/>
                    <span style={{position:"absolute",top:"10px",left:"10px",background:"#E8FF47",color:"#080808",fontFamily:"'DM Mono',monospace",fontSize:"10px",fontWeight:600,letterSpacing:"0.14em",padding:"3px 8px",borderRadius:"3px",textTransform:"uppercase"}}>{cs.provenirImages[0].label}</span>
                  </div>
                  <div style={{fontFamily:"'Epilogue',sans-serif",fontSize:"13px",color:"#888",marginTop:"10px",lineHeight:1.5,fontWeight:400,letterSpacing:"0.02em"}}>{cs.provenirImages[0].caption}</div>
                </div>
              ):cs.unifiedImages?(
                <div style={{marginBottom:"30px"}}>
                  <DesktopFrame src={IMG(cs.unifiedImages[0].key)} alt={cs.unifiedImages[0].caption}/>
                  <div style={{fontFamily:"'Epilogue',sans-serif",fontSize:"13px",color:"#888",marginTop:"10px",lineHeight:1.5,fontWeight:400,letterSpacing:"0.02em"}}>{cs.unifiedImages[0].caption}</div>
                </div>
              ):cs.sgxImages?(
                <div style={{marginBottom:"30px"}}>
                  <div style={{position:"relative"}}>
                    <img src={IMG(cs.sgxImages[0].key)} alt={cs.sgxImages[0].caption} style={{width:"100%",display:"block",borderRadius:"6px",border:"1px solid #2a2a2a"}}/>
                    {cs.sgxImages[0].label&&<span style={{position:"absolute",top:"10px",left:"10px",background:"#a78bfa",color:"#0d0818",fontFamily:"'DM Mono',monospace",fontSize:"9px",fontWeight:600,letterSpacing:"0.14em",padding:"2px 7px",borderRadius:"3px",textTransform:"uppercase"}}>{cs.sgxImages[0].label}</span>}
                  </div>
                  <div style={{fontFamily:"'Epilogue',sans-serif",fontSize:"13px",color:"#888",marginTop:"10px",lineHeight:1.5,fontWeight:400,fontStyle:"italic"}}>{cs.sgxImages[0].caption}</div>
                </div>
              ):cs.fedImages?(
                <div style={{marginBottom:"30px"}}>
                  <div style={{position:"relative"}}>
                    <img src={IMG(cs.fedImages[0].key)} alt={cs.fedImages[0].caption} style={{width:"100%",display:"block",borderRadius:"6px",border:"1px solid #2a2a2a"}}/>
                    {cs.fedImages[0].label&&<span style={{position:"absolute",top:"10px",left:"10px",background:"#4ade80",color:"#030d06",fontFamily:"'DM Mono',monospace",fontSize:"9px",fontWeight:600,letterSpacing:"0.14em",padding:"2px 7px",borderRadius:"3px",textTransform:"uppercase"}}>{cs.fedImages[0].label}</span>}
                  </div>
                  <div style={{fontFamily:"'Epilogue',sans-serif",fontSize:"13px",color:"#888",marginTop:"10px",lineHeight:1.5,fontWeight:400,fontStyle:"italic"}}>{cs.fedImages[0].caption}</div>
                </div>
              ):cs.intelImages?(
                <div style={{marginBottom:"30px"}}>
                  <DesktopFrame src={INTEL_IMGS[cs.intelImages[0].idx]} alt={cs.intelImages[0].caption}/>
                  <div style={{fontFamily:"'Epilogue',sans-serif",fontSize:"13px",color:"#888",marginTop:"10px",lineHeight:1.5,fontWeight:400,letterSpacing:"0.02em"}}>{cs.intelImages[0].caption}</div>
                </div>
              ):cs.clearPayImages?(
                <div style={{marginBottom:"30px"}}>
                  <DesktopFrame src={CP_SHOTS[cs.clearPayImages[0].idx]} alt={cs.clearPayImages[0].caption}/>
                  <div style={{fontFamily:"'Epilogue',sans-serif",fontSize:"13px",color:"#888",marginTop:"10px",lineHeight:1.5,fontWeight:400,letterSpacing:"0.02em"}}>{cs.clearPayImages[0].caption}</div>
                </div>
              ):null}
              {/* 4 - NARRATIVE SECTIONS: Challenge / Strategy / Process / Results */}
              {cs.challenge&&(
                <div style={{marginBottom:"36px"}}>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:"10px",color:ac,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:"14px",opacity:0.85}}>The Challenge</div>
                  <p style={{fontFamily:"'Epilogue',sans-serif",fontSize:"15px",color:"#d8d8d8",lineHeight:1.85,fontWeight:300}}>{cs.challenge}</p>
                </div>
              )}
              {!cs.challenge&&(
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"32px",marginBottom:"30px"}}>
                  {[{l:"The Situation",v:cs.overview},{l:"The Problem",v:cs.problem}].map(({l,v})=>(
                    <div key={l}>
                      <div style={{fontFamily:"'DM Mono',monospace",fontSize:"10px",color:ac,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:"12px",opacity:0.85}}>{l}</div>
                      <p style={{fontFamily:"'Epilogue',sans-serif",fontSize:"15px",color:"#d8d8d8",lineHeight:1.85,fontWeight:300}}>{v}</p>
                    </div>
                  ))}
                </div>
              )}
              {cs.pullQuote&&(
                <div style={{borderLeft:`3px solid ${ac}`,paddingLeft:"22px",margin:"32px 0",fontFamily:"'Fraunces',serif",fontSize:"19px",fontStyle:"italic",color:"#e8e8e8",lineHeight:1.6}}>{cs.pullQuote}</div>
              )}
              {cs.strategy&&(
                <div style={{marginBottom:"36px"}}>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:"10px",color:ac,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:"14px",opacity:0.85}}>The Strategy</div>
                  <p style={{fontFamily:"'Epilogue',sans-serif",fontSize:"15px",color:"#d8d8d8",lineHeight:1.85,fontWeight:300}}>{cs.strategy}</p>
                  {cs.strategyPoints&&<ul style={{marginTop:"16px",paddingLeft:"0",listStyle:"none",display:"flex",flexDirection:"column",gap:"10px"}}>
                    {cs.strategyPoints.map((p,i)=><li key={i} style={{display:"flex",gap:"12px",alignItems:"flex-start"}}><span style={{color:ac,fontFamily:"'DM Mono',monospace",fontSize:"12px",marginTop:"3px",flexShrink:0}}>→</span><p style={{fontFamily:"'Epilogue',sans-serif",fontSize:"14px",color:"#c8c8c8",lineHeight:1.7,margin:0}}>{p}</p></li>)}
                  </ul>}
                </div>
              )}
              {cs.process&&(
                <div style={{marginBottom:"36px"}}>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:"10px",color:ac,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:"14px",opacity:0.85}}>The Process</div>
                  <p style={{fontFamily:"'Epilogue',sans-serif",fontSize:"15px",color:"#d8d8d8",lineHeight:1.85,fontWeight:300}}>{cs.process}</p>
                  {cs.processPoints&&<ul style={{marginTop:"16px",paddingLeft:"0",listStyle:"none",display:"flex",flexDirection:"column",gap:"10px"}}>
                    {cs.processPoints.map((p,i)=><li key={i} style={{display:"flex",gap:"12px",alignItems:"flex-start"}}><span style={{color:ac,fontFamily:"'DM Mono',monospace",fontSize:"12px",marginTop:"3px",flexShrink:0}}>→</span><p style={{fontFamily:"'Epilogue',sans-serif",fontSize:"14px",color:"#c8c8c8",lineHeight:1.7,margin:0}}>{p}</p></li>)}
                  </ul>}
                </div>
              )}
              {/* 5 - MORE IMAGES */}
              {cs.provenirImages&&cs.provenirImages.length>1&&(
                <>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:"11px",color:ac,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:"16px",fontWeight:600}}>Before · Process · After</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",marginBottom:"32px"}}>
                    {cs.provenirImages.slice(1).map((img,i)=>{
                      const labelColors={
                        "Before":["#ff6b6b","#1a0000"],
                        "Research":["#a78bfa","#0d0818"],
                        "Process":["#60a5fa","#000d1a"],
                        "After":["#E8FF47","#080808"],
                        "Engineering":["#fb923c","#1a0800"],
                      };
                      const [bg,fg]=labelColors[img.label]||["#555","#fff"];
                      return(
                        <div key={i} style={{cursor:"zoom-in"}} onClick={()=>setLight({src:IMG(img.key),caption:img.caption})}>
                          <div style={{position:"relative",marginBottom:"8px"}}>
                            <DesktopFrame src={IMG(img.key)} alt={img.caption}/>
                            <span style={{position:"absolute",top:"8px",left:"8px",background:bg,color:fg,fontFamily:"'DM Mono',monospace",fontSize:"9px",fontWeight:600,letterSpacing:"0.14em",padding:"2px 7px",borderRadius:"3px",textTransform:"uppercase"}}>{img.label}</span>
                          </div>
                          <div style={{fontFamily:"'Epilogue',sans-serif",fontSize:"12px",color:"#666",lineHeight:1.4}}>{img.caption}</div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
              {cs.unifiedImages&&cs.unifiedImages.length>1&&(
                <>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:"11px",color:ac,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:"16px",fontWeight:600}}>Platform Screens · Process</div>
                  {/* Screens without labels go to ScreenGallery; labeled process images get 2-col grid */}
                  {cs.unifiedImages.slice(1).some(img=>img.label)?(
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",marginBottom:"32px"}}>
                      {cs.unifiedImages.slice(1).map((img,i)=>{
                        const labelColors={"Shipped":["#E8FF47","#080808"],"Process":["#60a5fa","#000d1a"],"Research":["#a78bfa","#0d0818"]};
                        const [bg,fg]=labelColors[img.label]||["#555","#fff"];
                        const src=IMG(img.key);
                        return(
                          <div key={i} style={{cursor:"zoom-in"}} onClick={()=>setLight({src,caption:img.caption})}>
                            <div style={{position:"relative",marginBottom:"8px"}}>
                              <img src={src} alt={img.caption} style={{width:"100%",display:"block",borderRadius:"6px",border:"1px solid #2a2a2a"}}/>
                              {img.label&&<span style={{position:"absolute",top:"8px",left:"8px",background:bg,color:fg,fontFamily:"'DM Mono',monospace",fontSize:"9px",fontWeight:600,letterSpacing:"0.14em",padding:"2px 7px",borderRadius:"3px",textTransform:"uppercase"}}>{img.label}</span>}
                            </div>
                            <div style={{fontFamily:"'Epilogue',sans-serif",fontSize:"12px",color:"#666",lineHeight:1.4,fontStyle:"italic"}}>{img.caption}</div>
                          </div>
                        );
                      })}
                    </div>
                  ):(
                    <ScreenGallery images={cs.unifiedImages.slice(1).map(img=>({...img,src:IMG(img.key)}))} ac={ac}/>
                  )}
                </>
              )}
              {cs.sgxImages&&cs.sgxImages.length>1&&(
                <>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:"11px",color:ac,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:"16px",fontWeight:600}}>Research · Shipped · Recognition</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",marginBottom:"32px"}}>
                    {cs.sgxImages.slice(1).map((img,i)=>{
                      const labelColors={
                        "Research":["#a78bfa","#0d0818"],
                        "Strategy":["#60a5fa","#000d1a"],
                        "Shipped":["#E8FF47","#080808"],
                        "Recognition":["#fbbf24","#1a0f00"],
                      };
                      const [bg,fg]=labelColors[img.label]||["#555","#fff"];
                      return(
                        <div key={i} style={{cursor:"zoom-in"}} onClick={()=>setLight({src:IMG(img.key),caption:img.caption})}>
                          <div style={{position:"relative",marginBottom:"8px"}}>
                            <img src={IMG(img.key)} alt={img.caption} style={{width:"100%",display:"block",borderRadius:"6px",border:"1px solid #2a2a2a"}}/>
                            {img.label&&<span style={{position:"absolute",top:"8px",left:"8px",background:bg,color:fg,fontFamily:"'DM Mono',monospace",fontSize:"9px",fontWeight:600,letterSpacing:"0.14em",padding:"2px 7px",borderRadius:"3px",textTransform:"uppercase"}}>{img.label}</span>}
                          </div>
                          <div style={{fontFamily:"'Epilogue',sans-serif",fontSize:"12px",color:"#666",lineHeight:1.4,fontStyle:"italic"}}>{img.caption}</div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
              {cs.fedImages&&cs.fedImages.length>1&&(
                <>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:"11px",color:ac,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:"16px",fontWeight:600}}>Shipped · Process · Research</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",marginBottom:"32px"}}>
                    {cs.fedImages.slice(1).map((img,i)=>{
                      const labelColors={"Shipped":["#E8FF47","#080808"],"Process":["#60a5fa","#000d1a"],"Research":["#a78bfa","#0d0818"],"Recognition":["#fbbf24","#1a0f00"]};
                      const [bg,fg]=labelColors[img.label]||["#555","#fff"];
                      return(
                        <div key={i} style={{cursor:"zoom-in"}} onClick={()=>setLight({src:IMG(img.key),caption:img.caption})}>
                          <div style={{position:"relative",marginBottom:"8px"}}>
                            <img src={IMG(img.key)} alt={img.caption} style={{width:"100%",display:"block",borderRadius:"6px",border:"1px solid #2a2a2a"}}/>
                            {img.label&&<span style={{position:"absolute",top:"8px",left:"8px",background:bg,color:fg,fontFamily:"'DM Mono',monospace",fontSize:"9px",fontWeight:600,letterSpacing:"0.14em",padding:"2px 7px",borderRadius:"3px",textTransform:"uppercase"}}>{img.label}</span>}
                          </div>
                          <div style={{fontFamily:"'Epilogue',sans-serif",fontSize:"12px",color:"#666",lineHeight:1.4,fontStyle:"italic"}}>{img.caption}</div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
              {cs.intelImages&&cs.intelImages.length>1&&(
                <>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:"11px",color:ac,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:"16px",fontWeight:600}}>Product Screens</div>
                  <ScreenGallery images={cs.intelImages.slice(1).map(img=>({...img,src:INTEL_IMGS[img.idx]}))} ac={ac}/>
                </>
              )}
              {cs.clearPayImages&&cs.clearPayImages.length>1&&(
                <>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:"11px",color:ac,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:"16px",fontWeight:600}}>Platform Screens</div>
                  <ScreenGallery images={cs.clearPayImages.slice(1)} ac={ac}/>
                </>
              )}

              {/* AI Exploration tools built on this work */}
              {cs.sideProjects&&cs.sideProjects.length>0&&(
                <div style={{marginTop:"44px",marginBottom:"8px"}}>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:"10px",color:ac,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:"20px",opacity:0.8}}>AI Exploration — Built On This Work</div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"16px"}}>
                    {cs.sideProjects.map((sp,i)=>(
                      <div key={i} style={{background:"#0a0a0a",border:"1px solid #1e1e1e",borderLeft:`3px solid ${ac}`,padding:"22px 24px",borderRadius:"2px"}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px"}}>
                          <div style={{fontFamily:"'Fraunces',serif",fontSize:"17px",fontWeight:700,color:"#f0f0f0",letterSpacing:"-0.02em",lineHeight:1.2}}>{sp.title}</div>
                          <span style={{fontFamily:"'DM Mono',monospace",fontSize:"8px",color:"#888",background:"#161616",border:"1px solid #2a2a2a",padding:"2px 7px",borderRadius:"2px",flexShrink:0,marginLeft:"10px",marginTop:"3px"}}>{sp.year}</span>
                        </div>
                        <div style={{fontFamily:"'DM Mono',monospace",fontSize:"9px",color:ac,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:"7px",opacity:0.8}}>Problem</div>
                        <p style={{fontFamily:"'Epilogue',sans-serif",fontSize:"13px",color:"#aaa",lineHeight:1.6,fontStyle:"italic",marginBottom:"14px",fontWeight:300}}>{sp.problem}</p>
                        <div style={{fontFamily:"'DM Mono',monospace",fontSize:"9px",color:ac,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:"7px",opacity:0.8}}>What It Does</div>
                        <p style={{fontFamily:"'Epilogue',sans-serif",fontSize:"13px",color:"#c8c8c8",lineHeight:1.6,marginBottom:"14px",fontWeight:400}}>{sp.description}</p>
                        <div style={{fontFamily:"'DM Mono',monospace",fontSize:"9px",color:"#444",paddingTop:"10px",borderTop:"1px solid #1a1a1a"}}><span style={{color:"#2a2a2a",marginRight:"5px"}}>Stack:</span>{sp.stack}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6 - THE RESULTS */}
              <div style={{marginBottom:"8px"}}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:"10px",color:ac,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:"14px",opacity:0.85}}>The Results</div>
                {cs.results?(
                  <>
                    <p style={{fontFamily:"'Epilogue',sans-serif",fontSize:"15px",color:"#d8d8d8",lineHeight:1.85,fontWeight:300,marginBottom:"16px"}}>{cs.results}</p>
                    {cs.resultPoints&&<ul style={{paddingLeft:"0",listStyle:"none",display:"flex",flexDirection:"column",gap:"10px",marginBottom:"20px"}}>
                      {cs.resultPoints.map((p,i)=><li key={i} style={{display:"flex",gap:"12px",alignItems:"flex-start"}}><span style={{color:ac,fontFamily:"'DM Mono',monospace",fontSize:"12px",marginTop:"3px",flexShrink:0}}>→</span><p style={{fontFamily:"'Epilogue',sans-serif",fontSize:"14px",color:"#c8c8c8",lineHeight:1.7,margin:0}}>{p}</p></li>)}
                    </ul>}
                  </>
                ):(
                  <div style={{background:"#0c0c0c",border:"1px solid #252525",borderLeft:`3px solid ${ac}77`,padding:"22px 28px"}}>
                    <p style={{fontFamily:"'Fraunces',serif",fontSize:"17px",color:"#e0e0e0",lineHeight:1.72,fontStyle:"italic"}}>{cs.outcome}</p>
                  </div>
                )}
              </div>
              {cs.clients&&<div style={{marginTop:"28px"}}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:"10px",color:"#aaa",letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:"14px"}}>Enterprise Clients</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:"10px"}}>{cs.clients.map(c=><ClientLogo key={c} name={c}/>)}</div>
              </div>}
              </>
              )}
            </div>
          )}
          {/* TAB 1 */}
          {tab===1&&(
            <div style={{animation:"fadeIn 0.22s ease"}}>
              <p style={{fontFamily:"'Epilogue',sans-serif",fontSize:"14px",color:"#bbb",marginBottom:"34px",lineHeight:1.6,fontWeight:400}}>How I led this project — decisions made, influence exercised, outcomes owned.</p>
              {cs.leadership.map((item,i)=>(
                <div key={i} style={{display:"grid",gridTemplateColumns:"36px 1fr",gap:"22px",paddingBottom:"38px"}}>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                    <div style={{width:"36px",height:"36px",borderRadius:"50%",background:"#0e0e0e",border:`1px solid ${ac}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <span style={{fontFamily:"'DM Mono',monospace",fontSize:"10px",color:ac}}>{String(i+1).padStart(2,"0")}</span>
                    </div>
                    {i<cs.leadership.length-1&&<div style={{width:"1px",flexGrow:1,background:"#252525",marginTop:"8px"}}/>}
                  </div>
                  <div style={{paddingTop:"6px"}}>
                    <h4 style={{fontFamily:"'Fraunces',serif",fontSize:"21px",fontWeight:700,color:"#f5f5f5",letterSpacing:"-0.01em",marginBottom:"13px",lineHeight:1.25}}>{item.title}</h4>
                    <p style={{fontFamily:"'Epilogue',sans-serif",fontSize:"15px",color:"#d0d0d0",lineHeight:1.85,fontWeight:300}}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* TAB 2 */}
          {tab===2&&(
            <div style={{animation:"fadeIn 0.22s ease"}}>
              <p style={{fontFamily:"'Epilogue',sans-serif",fontSize:"14px",color:"#bbb",marginBottom:"26px",lineHeight:1.6,fontWeight:400}}>The decisions that separated good design from a good product — navigated at the director level.</p>
              {cs.tradeoffs.map((t,i)=>(
                <div key={i} style={{marginBottom:"18px",background:"#0c0c0c",border:"1px solid #272727",borderLeft:`3px solid ${ac}66`,padding:"24px 28px"}}>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:"11px",color:ac,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:"11px",opacity:0.9}}>↳ {t.decision}</div>
                  <p style={{fontFamily:"'Epilogue',sans-serif",fontSize:"15px",color:"#d0d0d0",lineHeight:1.85,fontWeight:300}}>{t.body}</p>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
    {/* Lightbox overlay for labeled-grid image zoom */}
    {light&&(
      <div onClick={()=>setLight(null)} style={{position:"fixed",inset:0,zIndex:2000,background:"rgba(0,0,0,0.96)",display:"flex",alignItems:"center",justifyContent:"center",padding:"24px",cursor:"zoom-out"}}>
        <button onClick={()=>setLight(null)} style={{position:"fixed",top:"20px",right:"24px",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.18)",color:"#fff",width:"44px",height:"44px",borderRadius:"50%",cursor:"pointer",fontSize:"22px",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2001,lineHeight:1}}>✕</button>
        <div onClick={e=>e.stopPropagation()} style={{maxWidth:"1200px",width:"100%"}}>
          <img src={light.src} alt={light.caption} style={{width:"100%",display:"block",borderRadius:"4px",boxShadow:"0 40px 100px rgba(0,0,0,0.8)",imageRendering:"crisp-edges"}}/>
          {light.caption&&<div style={{fontFamily:"'Epilogue',sans-serif",fontSize:"14px",color:"#bbb",marginTop:"16px",lineHeight:1.6,textAlign:"center"}}>{light.caption}</div>}
        </div>
      </div>
    )}
    </>
  );
}

/* --- FLINGABLE CARD --------------------------------------- */
function FlingableCard(){
  const [pos,setPos]=useState({x:0,y:0});
  const [angle,setAngle]=useState(-8);
  const [dragging,setDragging]=useState(false);
  const [flipped,setFlipped]=useState(false);
  const [jokeIdx]=useState(()=>Math.floor(Math.random()*CARD_JOKES.length));
  const joke=CARD_JOKES[jokeIdx];
  const posRef=useRef({x:0,y:0}),velRef=useRef({x:0,y:0}),angRef=useRef(-8),angVelRef=useRef(0);
  const lastPos=useRef({x:0,y:0}),lastTime=useRef(0),offset=useRef({x:0,y:0});
  const isDragging=useRef(false),raf=useRef(null),didDrag=useRef(false),mdPos=useRef({x:0,y:0});
  useEffect(()=>{
    const loop=()=>{
      if(!isDragging.current){
        velRef.current.x*=0.9;velRef.current.y*=0.9;angVelRef.current*=0.88;
        posRef.current.x+=velRef.current.x;posRef.current.y+=velRef.current.y;
        angRef.current+=angVelRef.current;
        const mx=window.innerWidth*0.32,my=window.innerHeight*0.32;
        if(Math.abs(posRef.current.x)>mx){velRef.current.x*=-0.55;posRef.current.x=Math.sign(posRef.current.x)*mx;angVelRef.current*=-0.7;}
        if(Math.abs(posRef.current.y)>my){velRef.current.y*=-0.55;posRef.current.y=Math.sign(posRef.current.y)*my;angVelRef.current*=-0.7;}
        if(Math.abs(velRef.current.x)>0.05||Math.abs(velRef.current.y)>0.05||Math.abs(angVelRef.current)>0.05){setPos({x:posRef.current.x,y:posRef.current.y});setAngle(angRef.current);}
      }
      raf.current=requestAnimationFrame(loop);
    };
    raf.current=requestAnimationFrame(loop);
    return()=>cancelAnimationFrame(raf.current);
  },[]);
  const onDown=useCallback((e)=>{
    e.preventDefault();isDragging.current=true;didDrag.current=false;setDragging(true);
    mdPos.current={x:e.clientX,y:e.clientY};
    lastPos.current={x:e.clientX,y:e.clientY};lastTime.current=performance.now();
    offset.current={x:e.clientX-posRef.current.x,y:e.clientY-posRef.current.y};
    velRef.current={x:0,y:0};angVelRef.current=0;
  },[]);
  useEffect(()=>{
    const onMove=(e)=>{
      if(!isDragging.current)return;
      if(Math.abs(e.clientX-mdPos.current.x)>4||Math.abs(e.clientY-mdPos.current.y)>4)didDrag.current=true;
      const now=performance.now(),dt=Math.max(now-lastTime.current,1);
      velRef.current={x:(e.clientX-lastPos.current.x)/dt*16,y:(e.clientY-lastPos.current.y)/dt*16};
      angVelRef.current=velRef.current.x*0.35;
      lastPos.current={x:e.clientX,y:e.clientY};lastTime.current=now;
      posRef.current={x:e.clientX-offset.current.x,y:e.clientY-offset.current.y};
      angRef.current+=angVelRef.current*0.1;
      setPos({x:posRef.current.x,y:posRef.current.y});setAngle(angRef.current);
    };
    const onUp=()=>{isDragging.current=false;setDragging(false);};
    window.addEventListener("mousemove",onMove);window.addEventListener("mouseup",onUp);
    return()=>{window.removeEventListener("mousemove",onMove);window.removeEventListener("mouseup",onUp);};
  },[]);
  return(
    <div onMouseDown={onDown} onClick={()=>{if(!didDrag.current)setFlipped(f=>!f);}}
      style={{position:"absolute",right:"clamp(36px,8vw,110px)",top:"36%",width:"258px",height:"163px",transform:`translate(${pos.x}px,${pos.y}px) rotate(${angle}deg)`,cursor:dragging?"grabbing":"grab",zIndex:10,userSelect:"none",perspective:"600px",willChange:"transform"}}>
      <div style={{width:"100%",height:"100%",position:"relative",transformStyle:"preserve-3d",transform:flipped?"rotateY(180deg)":"rotateY(0deg)",transition:dragging?"none":"transform 0.55s cubic-bezier(0.16,1,0.3,1)"}}>
        {/* FRONT */}
        <div style={{position:"absolute",inset:0,backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",borderRadius:"14px",background:"linear-gradient(135deg,#1a1a0e,#2a2612,#1e1c0a,#111008)",border:"1px solid rgba(232,255,71,0.28)",boxShadow:dragging?"0 40px 90px rgba(0,0,0,0.9),0 0 40px rgba(232,255,71,0.2)":"0 16px 50px rgba(0,0,0,0.7)",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,background:"linear-gradient(105deg,transparent 20%,rgba(232,255,71,0.04) 40%,rgba(232,255,71,0.08) 50%,rgba(232,255,71,0.04) 60%,transparent 80%)",pointerEvents:"none"}}/>
          {/* Chip */}
          <div style={{position:"absolute",top:"22px",left:"18px",width:"38px",height:"29px",background:"linear-gradient(135deg,#d4a843,#f0c842,#b8891e)",borderRadius:"5px",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gridTemplateRows:"1fr 1fr 1fr",gap:"2px",padding:"4px"}}>
            {[...Array(9)].map((_,i)=><div key={i} style={{background:"rgba(0,0,0,0.2)",borderRadius:"1px"}}/>)}
          </div>
          {/* Contactless */}
          <div style={{position:"absolute",top:"24px",right:"18px",display:"flex",gap:"2px",alignItems:"center"}}>
            {[8,12,16].map((r,i)=><div key={i} style={{width:"2px",height:`${r}px`,background:`rgba(232,255,71,${0.18+i*0.15})`,borderRadius:"2px"}}/>)}
          </div>
          {/* Photo + name */}
          <div style={{position:"absolute",bottom:"27px",left:"15px",display:"flex",alignItems:"center",gap:"11px"}}>
            <div style={{width:"44px",height:"44px",borderRadius:"50%",overflow:"hidden",border:"1.5px solid rgba(232,255,71,0.5)",flexShrink:0}}>
              <img src={PHOTO_SRC} alt="AG" style={{width:"100%",height:"100%",objectFit:"cover",imageRendering:"auto",WebkitBackfaceVisibility:"hidden",objectPosition:"center top"}}/>
            </div>
            <div>
              <div style={{fontFamily:"'Fraunces',serif",fontSize:"10.5px",fontWeight:700,color:"#E8FF47",lineHeight:1.2}}>ALEXANDRA GOLDFARB</div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:"7px",color:"rgba(232,255,71,0.45)",letterSpacing:"0.1em",textTransform:"uppercase",marginTop:"2px"}}>Director of Product Design</div>
            </div>
          </div>
          <div style={{position:"absolute",bottom:"11px",left:"15px",fontFamily:"'DM Mono',monospace",fontSize:"10px",color:"rgba(232,255,71,0.3)",letterSpacing:"0.22em"}}>•••• •••• •••• 2017</div>
          <div style={{position:"absolute",bottom:"9px",right:"15px",display:"flex"}}>
            <div style={{width:"23px",height:"23px",borderRadius:"50%",background:"rgba(232,255,71,0.5)",marginRight:"-8px"}}/>
            <div style={{width:"23px",height:"23px",borderRadius:"50%",background:"rgba(232,255,71,0.25)"}}/>
          </div>
          <div style={{position:"absolute",top:"8px",left:"50%",transform:"translateX(-50%)",fontFamily:"'DM Mono',monospace",fontSize:"7px",color:"rgba(232,255,71,0.18)",letterSpacing:"0.1em",whiteSpace:"nowrap"}}>fling · click to flip</div>
        </div>
        {/* BACK */}
        <div style={{position:"absolute",inset:0,backfaceVisibility:"hidden",WebkitBackfaceVisibility:"hidden",transform:"rotateY(180deg)",borderRadius:"14px",background:"linear-gradient(135deg,#111008,#1c1a0a,#1a1a0e)",border:"1px solid rgba(232,255,71,0.2)",overflow:"hidden"}}>
          {/* Magnetic stripe, blue metallic, narrow */}
          <div style={{position:"absolute",top:"30px",left:0,right:0,height:"32px",background:"linear-gradient(180deg,#1c2840 0%,#0e1828 50%,#1c2840 100%)",borderTop:"1px solid #263450",borderBottom:"1px solid #0a1220",opacity:0.95}}/>
          {/* Signature strip */}
          <div style={{position:"absolute",top:"78px",left:"15px",right:"15px"}}>
            <div style={{background:"#f0ead8",padding:"12px 15px",borderRadius:"3px",border:"1px solid #d4c89a"}}>
              <div style={{fontFamily:"'Fraunces',serif",fontSize:"14px",fontWeight:800,color:"#bb0000",letterSpacing:"0.04em",lineHeight:1.1,marginBottom:"5px"}}>{joke.main}</div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:"11px",color:"#444",letterSpacing:"0.06em",lineHeight:1.5,fontWeight:500}}>{joke.sub}</div>
            </div>
          </div>
          <div style={{position:"absolute",bottom:"10px",left:"15px",right:"15px",fontFamily:"'DM Mono',monospace",fontSize:"7px",color:"rgba(232,255,71,0.18)",letterSpacing:"0.07em",lineHeight:1.6}}>Valid wherever good taste is accepted. No expiry.<br/>Authorized for unlimited design authority.</div>
        </div>
      </div>
    </div>
  );
}

/* --- PROJECT CARD ----------------------------------------- */
function ProjectCard({project,idx,visible,onOpen}){
  const ref=useRef(null);
  const [tilt,setTilt]=useState({rx:0,ry:0});
  const [hov,setHov]=useState(false);
  const ac=project.theme==="fintech"?"#38bdf8":project.theme==="security"?"#c084fc":"#4ade80";
  const {Icon}=project;
  const onMove=useCallback((e)=>{
    const r=ref.current?.getBoundingClientRect();if(!r)return;
    setTilt({rx:-((e.clientY-r.top)/r.height-0.5)*10,ry:((e.clientX-r.left)/r.width-0.5)*10});
  },[]);
   return(
    <div ref={ref} onMouseMove={onMove} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>{setHov(false);setTilt({rx:0,ry:0});}}
      onClick={()=>onOpen(project)}
      style={{opacity:visible?1:0,transform:visible?"translateY(0)":"translateY(44px)",transition:`opacity 0.65s ease ${idx*0.11}s,transform 0.65s cubic-bezier(0.16,1,0.3,1) ${idx*0.11}s`,cursor:"pointer",height:"100%",display:"flex",flexDirection:"column"}}>
      <div style={{background:"#0e0e0e",border:`1px solid ${hov?ac+"55":"#1e1e1e"}`,position:"relative",overflow:"hidden",transformStyle:"preserve-3d",perspective:"900px",transform:`rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${hov?1.012:1})`,transition:hov?"transform 0.08s ease,border-color 0.28s,box-shadow 0.38s":"transform 0.55s cubic-bezier(0.16,1,0.3,1),border-color 0.28s,box-shadow 0.38s",boxShadow:hov?`0 28px 68px rgba(0,0,0,0.75),0 0 40px ${ac}09`:"0 4px 20px rgba(0,0,0,0.35)",willChange:"transform",display:"flex",flexDirection:"column",flex:1}}>
        <CardThemeBg theme={project.theme} hov={hov}/>
        {/* Shimmer top */}
        <div style={{position:"absolute",top:0,left:hov?"0%":"50%",right:hov?"0%":"50%",height:"1px",background:`linear-gradient(90deg,transparent,${ac}88,transparent)`,transition:"left 0.48s ease,right 0.48s ease"}}/>
        <div style={{position:"absolute",inset:0,pointerEvents:"none",background:hov?`radial-gradient(ellipse at ${50+tilt.ry*3}% ${50-tilt.rx*3}%,${ac}07 0%,transparent 60%)`:"none"}}/>

        {/* Thumbnail image */}
        {project.thumbnail&&(
          <div style={{width:"100%",height:"190px",overflow:"hidden",position:"relative",borderBottom:`1px solid ${hov?ac+"33":"#1a1a1a"}`,flexShrink:0}}>
            <img src={project.thumbnail} alt={project.title} style={{width:"100%",height:"100%",objectFit:"cover",imageRendering:"auto",WebkitBackfaceVisibility:"hidden",objectPosition:"top",display:"block",transition:"transform 0.55s cubic-bezier(0.16,1,0.3,1)",transform:hov?"scale(1.04)":"scale(1)"}}/>
            <div style={{position:"absolute",inset:0,background:`linear-gradient(to bottom,transparent 40%,#0e0e0e 100%)`}}/>
          </div>
        )}

        {/* Card body */}
        <div style={{padding:"28px 32px",display:"flex",flexDirection:"column",flex:1,position:"relative",zIndex:1}}>
          {/* Header row: index + ICON + tags */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"14px"}}>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:"11px",color:"rgba(232,255,71,0.45)",letterSpacing:"0.22em"}}>{project.index}</span>
              <div style={{color:ac,opacity:hov?0.9:0.55,transition:"opacity 0.3s",lineHeight:0,flexShrink:0}}>
                <Icon/>
              </div>
            </div>
            <div style={{display:"flex",gap:"5px",flexWrap:"wrap",justifyContent:"flex-end"}}>
              {project.tags.map(t=><span key={t} style={{fontFamily:"'DM Mono',monospace",fontSize:"9px",color:"#c0c0c0",letterSpacing:"0.1em",textTransform:"uppercase",padding:"3px 7px",border:"1px solid #2a2a2a",background:"rgba(10,10,10,0.9)"}}>{t}</span>)}
            </div>
          </div>

          <div style={{marginBottom:"20px"}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:"10px",color:ac,letterSpacing:"0.22em",textTransform:"uppercase",marginBottom:"7px",opacity:0.9}}>{project.company}</div>
            <h3 style={{fontFamily:"'Fraunces',serif",fontSize:"clamp(20px,2.2vw,28px)",fontWeight:700,color:"#f5f5f5",lineHeight:1.15,marginBottom:"6px",letterSpacing:"-0.02em"}}>{project.title}</h3>
            <p style={{fontFamily:"'Epilogue',sans-serif",fontSize:"12px",color:"#777",letterSpacing:"0.04em",marginBottom:"14px",fontStyle:"italic"}}>{project.subtitle}</p>
            <p style={{fontFamily:"'Epilogue',sans-serif",fontSize:"14px",color:"#b8b8b8",lineHeight:1.72,fontWeight:300}}>{project.teaser}</p>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"1px",background:"#1e1e1e",marginBottom:"20px"}}>
            {[{v:project.industry,l:"Industry"},{v:project.stat2,l:project.stat2Label},{v:project.stat3,l:project.stat3Label}].map((m,i)=>(
              <div key={i} style={{background:"rgba(10,10,10,0.95)",padding:"12px 10px"}}>
                <div style={{fontFamily:i===0?"'DM Mono',monospace":"'Fraunces',serif",fontSize:i===0?"clamp(11px,1.2vw,14px)":"clamp(13px,1.5vw,18px)",fontWeight:700,color:"#E8FF47",letterSpacing:i===0?"0.05em":"-0.02em",marginBottom:"4px"}}>{m.v}</div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:"10px",color:"#999",letterSpacing:"0.06em",textTransform:"uppercase",lineHeight:1.3}}>{m.l}</div>
              </div>
            ))}
          </div>

          {/* Spacer pushes CTA to bottom */}
          <div style={{flex:1}}/>

          {/* CTA row */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:"10px",letterSpacing:"0.16em",textTransform:"uppercase",color:hov?ac:"#555",transition:"color 0.28s"}}>
              Read Case Study →
            </span>
            {project.liveUrl&&(
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                onClick={e=>e.stopPropagation()}
                style={{fontFamily:"'DM Mono',monospace",fontSize:"9px",color:"#555",letterSpacing:"0.1em",textDecoration:"none",borderBottom:"1px solid #2a2a2a",paddingBottom:"1px",transition:"color 0.2s,border-color 0.2s"}}
                onMouseEnter={e=>{e.currentTarget.style.color="#E8FF47";e.currentTarget.style.borderColor="#E8FF47";}}
                onMouseLeave={e=>{e.currentTarget.style.color="#555";e.currentTarget.style.borderColor="#2a2a2a";}}>
                ↗ live site
              </a>
            )}
          </div>
        </div>

        {/* Corner peel */}
        <div style={{position:"absolute",bottom:0,right:0,width:hov?"62px":"32px",height:hov?"62px":"32px",clipPath:"polygon(100% 0%,100% 100%,0% 100%)",background:"linear-gradient(135deg,#2a2510,#181508,#0e0e0e)",transition:"width 0.35s cubic-bezier(0.16,1,0.3,1),height 0.35s cubic-bezier(0.16,1,0.3,1)",zIndex:5}}>
          <div style={{position:"absolute",bottom:"6px",right:"6px",width:"4px",height:"4px",borderRadius:"50%",background:"#E8FF47",opacity:hov?0.9:0.3,transition:"opacity 0.3s"}}/>
        </div>
      </div>
    </div>
  );
}


/* --- PEEL SECTION ----------------------------------------- */
function PeelSection({children,onPeel,style={},id}){
  const [hov,setHov]=useState(false);
  const [clk,setClk]=useState(false);
  const sz=clk?80:hov?62:42;
  const go=()=>{setClk(true);setTimeout(()=>{setClk(false);onPeel?.();},480);};
  return(
    <section id={id} style={{position:"relative",overflow:"hidden",...style}}>
      {children}
      <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>{setHov(false);setClk(false);}} onClick={go}
        style={{position:"absolute",bottom:0,right:0,width:`${sz}px`,height:`${sz}px`,cursor:"pointer",zIndex:20,transition:"width 0.35s cubic-bezier(0.16,1,0.3,1),height 0.35s cubic-bezier(0.16,1,0.3,1)"}}>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,#262010,#181508,#0d0d0d)",clipPath:"polygon(100% 0%,100% 100%,0% 100%)",boxShadow:hov?"-8px -8px 22px rgba(0,0,0,0.85)":"-3px -3px 8px rgba(0,0,0,0.4)"}}>
          <div style={{position:"absolute",bottom:"6px",right:"6px",fontFamily:"'DM Mono',monospace",fontSize:"8px",color:"#E8FF47",opacity:hov?0.7:0.2}}>↓</div>
        </div>
      </div>
    </section>
  );
}

/* --- SKILLS SECTION --------------------------------------- */
function SkillsSection(){
  const [vis,setVis]=useState(false);
  const ref=useRef(null);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setVis(true);},{threshold:0.05});
    if(ref.current)obs.observe(ref.current);
    return()=>obs.disconnect();
  },[]);
  const groups=[
    {label:"Design & Product Leadership",items:["Design Systems","UX Operations","Product Strategy","User Research","0→1 Platform Design","Information Architecture","Prototyping","Service Design","IT-as-a-Product","Platform Thinking"]},
    {label:"Technical",items:["AI/LLMs & Agents","GenAI & RAG Systems","Confidential Computing","REST APIs & SDKs","Figma & FigJam","Git/GitHub","AWS, GCP, Azure","Microservices","Claude Code / Cursor","Salesforce"]},
    {label:"Business & GTM Strategy",items:["P&L Ownership","Revenue Modeling","Go-to-Market Strategy","OKRs & KPIs","ARR/MRR Tracking","Stakeholder Alignment","Executive Storytelling","Data Analytics Platforms","GenAI Enablement","Organizational Change"]},
    {label:"Domain Expertise",items:["Enterprise SaaS","Fintech & Payments","AI & ML Infrastructure","Cybersecurity","Developer Experience","Confidential Computing","Cloud Platforms","Regulated Industries","Identity & Access Systems","SOC 2 / WCAG"]},
  ];
  const certs=[
    {name:"Oracle Cloud Infrastructure AI Foundations Professional",year:"2025"},
    {name:"Strategy Leader, Intel Corporation",year:"2024"},
    {name:"Product Assurance & Security Yellow Belt",year:"2023"},
    {name:"HCI / Human Computer Interaction, IDF",year:"2020"},
  ];
  return(
    <section ref={ref} id="skills-section" style={{padding:"96px 52px",borderTop:"1px solid #161616",background:"#080808"}}>
      <div style={{maxWidth:"1160px",margin:"0 auto"}}>
        <div style={{marginBottom:"52px",paddingBottom:"20px",borderBottom:"1px solid #1c1c1c"}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:"10px",color:"#E8FF47",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:"12px",opacity:0.7}}>Skills & Expertise</div>
          <h2 style={{fontFamily:"'Fraunces',serif",fontSize:"clamp(28px,4vw,50px)",fontWeight:700,color:"#f0f0f0",letterSpacing:"-0.03em",lineHeight:1}}>Comprehensive toolkit for<br/><em style={{color:"#E8FF47",fontStyle:"italic"}}>enterprise-scale products.</em></h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"2px",background:"#1a1a1a",marginBottom:"2px"}}>
          {groups.map((g,i)=>(
            <div key={g.label} style={{background:"#0c0c0c",padding:"38px",opacity:vis?1:0,transform:vis?"none":"translateY(24px)",transition:`opacity 0.6s ease ${i*0.1}s,transform 0.6s ease ${i*0.1}s`}}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:"10px",color:"#E8FF47",letterSpacing:"0.16em",textTransform:"uppercase",marginBottom:"20px",opacity:0.8}}>{g.label}</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:"7px"}}>
                {g.items.map(item=>(
                  <span key={item} style={{fontFamily:"'Epilogue',sans-serif",fontSize:"13px",fontWeight:500,color:"#e0e0e0",padding:"5px 12px",border:"1px solid #2a2a2a",background:"#111"}}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{background:"#0c0c0c",border:"1px solid #1a1a1a",padding:"38px",opacity:vis?1:0,transition:"opacity 0.6s ease 0.4s"}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:"10px",color:"#E8FF47",letterSpacing:"0.16em",textTransform:"uppercase",marginBottom:"22px",opacity:0.8}}>Certifications</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"13px"}}>
            {/* Oracle badge featured */}
            {IMG("oracle_cert")&&(
              <div style={{gridColumn:"1/-1",display:"flex",alignItems:"center",gap:"20px",background:"#0a0a0a",border:"1px solid #1e1e1e",borderLeft:"3px solid #E8FF47",padding:"16px 20px",borderRadius:"3px",marginBottom:"4px"}}>
                <img src={IMG("oracle_cert")} alt="Oracle OCI AI Foundations" style={{width:"72px",height:"72px",objectFit:"contain",flexShrink:0}}/>
                <div>
                  <div style={{fontFamily:"'Epilogue',sans-serif",fontSize:"14px",color:"#f0f0f0",fontWeight:500}}>Oracle Cloud Infrastructure AI Foundations Professional</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:"10px",color:"#E8FF47",marginTop:"4px"}}>Oracle · 2025 · Expires Oct 2027</div>
                </div>
              </div>
            )}
            {certs.filter(c=>!c.badgeKey).map(c=>(
              <div key={c.name} style={{display:"flex",alignItems:"baseline",gap:"11px"}}>
                <div style={{width:"4px",height:"4px",borderRadius:"50%",background:"#E8FF47",opacity:0.55,flexShrink:0,marginTop:"6px"}}/>
                <span style={{fontFamily:"'Epilogue',sans-serif",fontSize:"14px",color:"#d8d8d8",fontWeight:400}}>{c.name} <span style={{fontFamily:"'DM Mono',monospace",fontSize:"10px",color:"#666"}}>({c.year})</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- LINKEDIN / THOUGHT LEADERSHIP ----------------------- */
function ThoughtLeadershipSection(){
  const [vis,setVis]=useState(false);
  const ref=useRef(null);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setVis(true);},{threshold:0.05});
    if(ref.current)obs.observe(ref.current);
    return()=>obs.disconnect();
  },[]);
  const posts=[
    {tag:"Product Leadership",date:"Feb 2026",title:"Why design leaders need to speak revenue, not just usability",body:"After driving $1.5B+ in aggregate revenue impact across fintech and deep tech, I've learned that the most powerful design argument is never 'users prefer this.' It's 'this directly affects conversion, retention, and ARR.' Here's how I changed my framing."},
    {tag:"Experience Design & AI",date:"Jan 2026",title:"Federated learning isn't just a technical architecture, it's a design philosophy",body:"When I led Intel's privacy-preserving AI platform, the hardest problem wasn't the interface. It was designing for trust in a system where users couldn't see what was happening. That's an experience design problem first."},
    {tag:"Service Design",date:"Dec 2025",title:"The spreadsheet workaround is always a product failure",body:"In my research for ClearPay, every analyst had a private spreadsheet. The analysts had built their own workaround because the official product had failed them. Your users' workarounds are your next roadmap."},
    {tag:"Team Building",date:"Nov 2025",title:"What 6 years managing design teams taught me about trust",body:"The biggest mistake I see design managers make: over-indexing on craft reviews and under-investing in context. Your team doesn't need you to critique every mockup. They need you to tell them why the product matters."},
  ];
  return(
    <section ref={ref} id="thought-leadership" style={{padding:"96px 52px",borderTop:"1px solid #161616",background:"#070707"}}>
      <div style={{maxWidth:"1160px",margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"48px",paddingBottom:"20px",borderBottom:"1px solid #1c1c1c",flexWrap:"wrap",gap:"16px"}}>
          <div>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:"10px",color:"#E8FF47",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:"12px",opacity:0.7}}>Publications & Thought Leadership</div>
            <h2 style={{fontFamily:"'Fraunces',serif",fontSize:"clamp(24px,3.5vw,44px)",fontWeight:700,color:"#f0f0f0",letterSpacing:"-0.03em",lineHeight:1}}>Insights on product leadership,<br/><em style={{color:"#E8FF47",fontStyle:"italic"}}>AI & enterprise design.</em></h2>
          </div>
          <a href="https://www.linkedin.com/in/alexandragoldfarb" target="_blank" rel="noopener noreferrer"
            style={{fontFamily:"'DM Mono',monospace",fontSize:"10px",color:"#555",letterSpacing:"0.14em",textTransform:"uppercase",textDecoration:"none",borderBottom:"1px solid #2a2a2a",paddingBottom:"2px",transition:"color 0.2s,border-color 0.2s",flexShrink:0}}
            onMouseEnter={e=>{e.currentTarget.style.color="#E8FF47";e.currentTarget.style.borderColor="#E8FF47";}}
            onMouseLeave={e=>{e.currentTarget.style.color="#555";e.currentTarget.style.borderColor="#2a2a2a";}}>
            View on LinkedIn ↗
          </a>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"2px",background:"#1a1a1a"}}>
          {posts.map((p,i)=>(
            <div key={i} style={{background:"#0c0c0c",padding:"34px",opacity:vis?1:0,transform:vis?"none":"translateY(24px)",transition:`opacity 0.6s ease ${i*0.1}s,transform 0.6s ease ${i*0.1}s`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"14px"}}>
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:"9px",color:"#E8FF47",letterSpacing:"0.12em",textTransform:"uppercase",opacity:0.7,padding:"3px 8px",border:"1px solid rgba(232,255,71,0.2)"}}>{p.tag}</span>
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:"9px",color:"#444",letterSpacing:"0.08em"}}>{p.date}</span>
              </div>
              <h4 style={{fontFamily:"'Fraunces',serif",fontSize:"17px",fontWeight:700,color:"#f0f0f0",letterSpacing:"-0.01em",marginBottom:"11px",lineHeight:1.3}}>{p.title}</h4>
              <p style={{fontFamily:"'Epilogue',sans-serif",fontSize:"14px",color:"#c0c0c0",lineHeight:1.78,fontWeight:300}}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- LEADERSHIP / TESTIMONIALS ---------------------------- */
function LeadershipSection(){
  const [vis,setVis]=useState(false);
  const ref=useRef(null);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setVis(true);},{threshold:0.05});
    if(ref.current)obs.observe(ref.current);
    return()=>obs.disconnect();
  },[]);
  const principles=[
    {num:"01",title:"Design as a Business Function",body:"I sit at the intersection of design craft and business strategy. At Provenir, I connected UX decisions directly to sales velocity, the platform's 3,000% sales growth was a consequence of designing for enterprise buyer trust, not just end-user usability."},
    {num:"02",title:"Research as Organizational Change",body:"At Intel, I wasn't hired to design an interface, I was hired to introduce UX culture into an organization that had never had a designer. I did that through research: 10 stakeholder interviews, two-phase usability studies, and executive presentations that turned data into strategic mandates."},
    {num:"03",title:"0→1 as a Discipline",body:"Four of my major products were built from nothing, no prior art, no design system, no UX playbook. I've built them all from scratch, and I know which decisions matter on day one vs. which can wait."},
    {num:"04",title:"Earning Trust Across Every Function",body:"I've worked with 130+ SMEs, 50+ engineers, and executive stakeholders across Intel, Provenir, and enterprise financial services. Understand their constraints deeply before proposing anything. Let the work speak louder than the process."},
  ];
  const testimonials=[
    {q:"Alex brought cross-industry thought leadership that directly shaped our product vision and enabled the successful launch of a new Confidential Computing attestation product, always anchoring decisions in customer experience.",attr:"Laura Martinez",role:"Security Marketing, NVIDIA",type:"Cross-functional Partner"},
    {q:"Alex transformed a complex legacy enterprise platform by conceptualizing customer needs, redefining the experience end-to-end, and driving the creation of an entirely new cloud product adopted across the organization.",attr:"Roy Roque",role:"DevOps Lead, Provenir",type:"Engineering Partner"},
    {q:"Alex identified critical product gaps, aligned cross-functional teams, and guided us toward a more intuitive, effective, and customer-centric product, elevating both quality and team execution.",attr:"Tim O'Connell",role:"Director of Cloud Development",type:"Leadership Partner"},
    {q:"Alex really leads by tuning in and bringing the voice of the customer as a critical part of Product Development process… her outside-the-box thinking had a significant impact on our technology strategy.",attr:"Shira Ben Cohen",role:"Sr. Experience Researcher",type:"Research Partner"},
    {q:"Alexandra is one of those rare designers who understands the business at the same level she understands the user. She doesn't just advocate for design, she advocates for outcomes, and she always backs it up with data.",attr:"Lior Shif",role:"VP Product, Provenir",type:"Product Leadership"},
    {q:"Working with Alex was genuinely transformative for our team. She has a rare ability to absorb complex technical systems quickly and translate them into design decisions that engineers actually trust. She elevated the whole organization.",attr:"James Nguyen",role:"Senior Software Engineer, Intel",type:"Engineering Partner"},
    {q:"Alex has a natural executive presence and the strategic credibility to match. She operates at the CTO level, not just the design level. I watched her shift the product direction of an entire division with a single research presentation.",attr:"Rachel Kim",role:"Director of Strategy, Intel",type:"Executive Stakeholder"},
    {q:"Alex is what a design director should be in a technical organization: fluent enough to earn engineers' trust, strategic enough to influence product roadmap, and human enough to build a culture people want to be part of.",attr:"Priya Dhawan",role:"Principal Product Manager, Intel",type:"Cross-functional Partner"},
  ];
  return(
    <section id="leadership-section" ref={ref} style={{padding:"96px 52px",borderTop:"1px solid #161616",background:"#070707"}}>
      <div style={{maxWidth:"1160px",margin:"0 auto"}}>
        <div style={{marginBottom:"56px",paddingBottom:"20px",borderBottom:"1px solid #1c1c1c"}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:"10px",color:"#E8FF47",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:"12px",opacity:0.7}}>Leadership Philosophy</div>
          <h2 style={{fontFamily:"'Fraunces',serif",fontSize:"clamp(30px,4.5vw,56px)",fontWeight:700,color:"#f0f0f0",letterSpacing:"-0.03em",lineHeight:1,marginBottom:"16px"}}>How I lead<br/><em style={{color:"#E8FF47",fontStyle:"italic"}}>through design.</em></h2>
          <p style={{fontFamily:"'Epilogue',sans-serif",fontSize:"16px",color:"#c8c8c8",maxWidth:"560px",lineHeight:1.75,fontWeight:300}}>The best design leaders don't just make beautiful things — they change how organizations think about their users, their products, and their business.</p>
        </div>
        {/* Principles grid */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"1px",background:"#1a1a1a",marginBottom:"1px"}}>
          {principles.map((p,i)=>(
            <div key={p.num} style={{background:"#0b0b0b",padding:"42px",opacity:vis?1:0,transform:vis?"none":"translateY(32px)",transition:`opacity 0.65s ease ${i*0.12}s,transform 0.65s ease ${i*0.12}s`}}>
              <div style={{fontFamily:"'Fraunces',serif",fontSize:"44px",fontWeight:700,color:"rgba(232,255,71,0.07)",letterSpacing:"-0.02em",lineHeight:1,marginBottom:"16px"}}>{p.num}</div>
              <h4 style={{fontFamily:"'Fraunces',serif",fontSize:"21px",fontWeight:700,color:"#f0f0f0",letterSpacing:"-0.01em",marginBottom:"14px",lineHeight:1.25}}>{p.title}</h4>
              <p style={{fontFamily:"'Epilogue',sans-serif",fontSize:"15px",color:"#c8c8c8",lineHeight:1.82,fontWeight:300}}>{p.body}</p>
            </div>
          ))}
        </div>
        {/* Testimonials 2x2 */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"1px",background:"#1a1a1a"}}>
          {testimonials.map(({q,attr,role,type},i)=>(
            <div key={i} style={{background:"#0b0b0b",padding:"38px",opacity:vis?1:0,transform:vis?"none":"translateY(20px)",transition:`opacity 0.6s ease ${0.5+i*0.1}s,transform 0.6s ease ${0.5+i*0.1}s`}}>
              <div style={{height:"22px",marginBottom:"14px"}}>{/* spacer */}</div>
              <p style={{fontFamily:"'Fraunces',serif",fontSize:"clamp(14px,1.5vw,17px)",color:"#dedede",lineHeight:1.72,fontStyle:"italic",fontWeight:400,marginBottom:"16px"}}>"{q}"</p>
              <div>
                <div style={{fontFamily:"'Epilogue',sans-serif",fontSize:"15px",color:"#E8FF47",fontWeight:600,marginBottom:"3px"}}>{attr}</div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:"11px",color:"#c0c0c0",letterSpacing:"0.06em",fontWeight:400}}>{role}</div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:"9px",color:"#555",letterSpacing:"0.1em",textTransform:"uppercase",marginTop:"3px"}}>{type}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- MAIN ------------------------------------------------- */
export default function Portfolio(){
  const [loaded,setLoaded]=useState(false);
  const [scrollY,setScrollY]=useState(0);
  const [workVisible,setWorkVisible]=useState(false);
  const [activeCase,setActiveCase]=useState(null);
  const [crumpling,setCrumpling]=useState(false);
  const [imagesReady,setImagesReady]=useState(true); // Images loaded at build time
  const workRef=useRef(null);

  useEffect(()=>{
    const t=setTimeout(()=>setLoaded(true),80);
    const onScroll=()=>setScrollY(window.scrollY);
    window.addEventListener("scroll",onScroll,{passive:true});
    // Images loaded at build time via import
    return()=>{clearTimeout(t);window.removeEventListener("scroll",onScroll);};
  },[]);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setWorkVisible(true);},{threshold:0.04});
    if(workRef.current)obs.observe(workRef.current);
    return()=>obs.disconnect();
  },[]);

  const scrollTo=(id)=>{
    setCrumpling(true);
    setTimeout(()=>{document.getElementById(id)?.scrollIntoView({behavior:"smooth"});setCrumpling(false);},500);
  };
  const navTo=(e,id)=>{e.preventDefault();document.getElementById(id)?.scrollIntoView({behavior:"smooth",block:"start"});};

  return(
    <div style={{background:"#080808",minHeight:"100vh",color:"#f0f0f0",overflowX:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,400;1,9..144,700&family=Epilogue:wght@300;400;500;600&family=DM+Mono:wght@300;400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        ::selection{background:#E8FF47;color:#080808;}
        ::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-track{background:#080808;}::-webkit-scrollbar-thumb{background:#E8FF47;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}
        @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
        @keyframes slideUp{from{opacity:0;transform:translateY(32px);}to{opacity:1;transform:translateY(0);}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        @keyframes crumpleAway{0%{transform:scale(1) rotate(0);opacity:1;}45%{transform:scale(0.94) rotate(-1.5deg) skewX(-2deg);opacity:0.85;}100%{transform:scale(0.06) rotate(20deg) translate(130%,90%);opacity:0;}}
      `}</style>

      {crumpling&&(
        <div style={{position:"fixed",inset:0,zIndex:300,pointerEvents:"none",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,background:"#0e0e0e",transformOrigin:"bottom right",animation:"crumpleAway 0.72s cubic-bezier(0.4,0,0.2,1) forwards"}}/>
        </div>
      )}
      {activeCase&&<CaseStudyModal project={activeCase} onClose={()=>setActiveCase(null)}/>}

      {/* -- NAV -- */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:50,padding:"20px 52px",display:"flex",justifyContent:"space-between",alignItems:"center",background:scrollY>50?"rgba(8,8,8,0.96)":"transparent",borderBottom:scrollY>50?"1px solid #1c1c1c":"1px solid transparent",backdropFilter:scrollY>50?"blur(16px)":"none",transition:"background 0.4s,border-color 0.4s"}}>
        <a href="#hero" onClick={e=>navTo(e,"hero")} style={{fontFamily:"'Fraunces',serif",fontWeight:700,fontSize:"18px",color:"#f0f0f0",letterSpacing:"-0.03em",opacity:loaded?1:0,transition:"opacity 0.7s",textDecoration:"none"}}>AG<span style={{color:"#E8FF47"}}>.</span></a>
        <div style={{display:"flex",gap:"30px",alignItems:"center"}}>
          {[["Work","work"],["Leadership","leadership-section"],["Skills","skills-section"],["About","about-section"],["Contact","contact-section"]].map(([lbl,id],i)=>(
            <a key={lbl} href={`#${id}`} onClick={e=>navTo(e,id)}
              style={{fontFamily:"'DM Mono',monospace",fontSize:"10px",color:"#888",textDecoration:"none",letterSpacing:"0.14em",textTransform:"uppercase",opacity:loaded?1:0,transition:`opacity 0.6s ease ${0.1+i*0.06}s,color 0.2s`,cursor:"pointer"}}
              onMouseEnter={e=>e.currentTarget.style.color="#E8FF47"} onMouseLeave={e=>e.currentTarget.style.color="#888"}
            >{lbl}</a>
          ))}
        </div>
      </nav>

      {/* -- HERO -- */}
      <PeelSection id="hero" onPeel={()=>scrollTo("vault-section")} style={{minHeight:"100vh",padding:"130px 52px 80px",display:"flex",flexDirection:"column",justifyContent:"center",position:"relative"}}>
        <div style={{position:"absolute",inset:0,pointerEvents:"none",backgroundImage:"linear-gradient(90deg,rgba(232,255,71,0.018) 1px,transparent 1px)",backgroundSize:"80px 100%"}}/>
        <div style={{position:"absolute",bottom:"5%",right:"8%",width:"500px",height:"500px",background:"radial-gradient(circle,rgba(232,255,71,0.05) 0%,transparent 68%)",pointerEvents:"none",transform:`translateY(${scrollY*0.1}px)`}}/>

        <div style={{maxWidth:"840px",position:"relative",zIndex:2}}>
          {/* Industry badges, top of hero */}
          <div style={{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"44px",animation:loaded?"fadeUp 0.7s ease 0.05s both":"none"}}>
            {[
              {label:"Fintech & Payments", icon:"💳"},
              {label:"Confidential Computing", icon:"🔒"},
              {label:"Federated AI", icon:"🧠"},
              {label:"Risk & Compliance", icon:"⚖️"},
              {label:"Hardware Experience Strategy", icon:"🔬"},
              {label:"CLI & Developer Experience", icon:"⌨️"},
            ].map(({label,icon})=>(
              <div key={label} style={{display:"inline-flex",alignItems:"center",gap:"7px",padding:"6px 13px",border:"1px solid #282828",background:"rgba(232,255,71,0.02)"}}>
                <span style={{fontSize:"12px",lineHeight:1}}>{icon}</span>
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:"9px",color:"#aaa",letterSpacing:"0.12em",textTransform:"uppercase"}}>{label}</span>
              </div>
            ))}
          </div>

          {/* Photo + name */}
          <div style={{display:"flex",alignItems:"center",gap:"36px",marginBottom:"28px",animation:loaded?"fadeUp 0.85s cubic-bezier(0.16,1,0.3,1) 0.1s both":"none"}}>
            <div style={{width:"172px",height:"172px",borderRadius:"50%",overflow:"hidden",border:"3px solid rgba(232,255,71,0.45)",flexShrink:0,boxShadow:"0 0 60px rgba(232,255,71,0.15),0 20px 60px rgba(0,0,0,0.6)"}}>
              <img src={PHOTO_SRC} alt="Alexandra Goldfarb" style={{width:"100%",height:"100%",objectFit:"cover",imageRendering:"auto",WebkitBackfaceVisibility:"hidden",objectPosition:"center top"}}/>
            </div>
            <h1 style={{fontFamily:"'Fraunces',serif",fontSize:"clamp(48px,8vw,104px)",fontWeight:800,lineHeight:0.92,letterSpacing:"-0.04em",color:"#f5f5f5"}}>
              Alexandra<br/><em style={{color:"#E8FF47",fontStyle:"italic",fontWeight:700}}>Goldfarb</em>
            </h1>
          </div>

          <p style={{fontFamily:"'Epilogue',sans-serif",fontSize:"clamp(15px,1.7vw,19px)",color:"#c8c8c8",lineHeight:1.65,maxWidth:"500px",marginBottom:"44px",fontWeight:300,animation:loaded?"fadeUp 0.85s cubic-bezier(0.16,1,0.3,1) 0.18s both":"none"}}>
            Director of Product Design specializing in{" "}
            <span style={{color:"#f0f0f0",fontWeight:500}}>AI-driven enterprise platforms</span>{" "}across fintech, security, and developer experience.{" "}
            <span style={{color:"#f0f0f0",fontWeight:500}}>11 years · $1.5B+ revenue impact · 0→1 to scale.</span>
          </p>

          {/* HERO STAT */}
          <div style={{animation:loaded?"fadeUp 0.85s cubic-bezier(0.16,1,0.3,1) 0.26s both":"none",marginBottom:"40px"}}>
            <div style={{display:"inline-flex",alignItems:"baseline",gap:"18px",padding:"16px 0",background:"none",border:"none"}}>
              <span style={{fontFamily:"'Fraunces',serif",fontSize:"clamp(38px,5vw,60px)",fontWeight:800,color:"#E8FF47",letterSpacing:"-0.04em",lineHeight:1}}>$1.5B+</span>
              <span style={{fontFamily:"'Epilogue',sans-serif",fontSize:"clamp(14px,1.5vw,17px)",color:"#c8c8c8",fontWeight:400,maxWidth:"260px",lineHeight:1.4}}>Career revenue impact · Fintech, Security & AI Infrastructure</span>
            </div>
          </div>

          {/* Stats grid */}
          <div style={{animation:loaded?"fadeUp 0.85s cubic-bezier(0.16,1,0.3,1) 0.34s both":"none"}}>
            {/* Primary: 11 Years, big and dominant */}
            <div style={{display:"flex",alignItems:"baseline",gap:"16px",marginBottom:"20px",paddingBottom:"20px",borderBottom:"1px solid #1e1e1e"}}>
              <span style={{fontFamily:"'Fraunces',serif",fontSize:"clamp(44px,5.5vw,72px)",fontWeight:800,color:"#E8FF47",letterSpacing:"-0.05em",lineHeight:0.9}}>11</span>
              <div>
                <div style={{fontFamily:"'Fraunces',serif",fontSize:"clamp(18px,2vw,24px)",fontWeight:600,color:"#f0f0f0",letterSpacing:"-0.02em",lineHeight:1}}>Years Experience</div>
                <div style={{fontFamily:"'Epilogue',sans-serif",fontSize:"13px",color:"#888",fontWeight:300,marginTop:"4px"}}>Fintech · Deep Tech · Hardware-Aware Product Design</div>
              </div>
            </div>
            {/* Secondary breakdown row */}
            <div style={{display:"flex",flexWrap:"wrap",gap:"0",marginBottom:"14px"}}>
              {[{n:"5",l:"yrs Fintech"},{n:"3",l:"yrs Deep / Big Tech"},{n:"6",l:"yrs Managing Teams"}].map(({n,l},i,arr)=>(
                <div key={n} style={{paddingRight:"24px",marginRight:"24px",borderRight:i<arr.length-1?"1px solid #1e1e1e":"none",marginBottom:"6px"}}>
                  <span style={{fontFamily:"'Fraunces',serif",fontSize:"clamp(20px,2.2vw,28px)",fontWeight:700,color:"#E8FF47",letterSpacing:"-0.03em"}}>{n} </span>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:"9px",color:"#999",letterSpacing:"0.08em",textTransform:"uppercase"}}>{l}</span>
                </div>
              ))}
            </div>
            {/* Tertiary: products */}
            <div style={{display:"flex",gap:"0",flexWrap:"wrap"}}>
              {[{n:"28+",l:"Products Built"},{n:"6",l:"Enterprise B2B Shipped"}].map(({n,l},i,arr)=>(
                <div key={n} style={{paddingRight:"24px",marginRight:"24px",borderRight:i<arr.length-1?"1px solid #1a1a1a":"none",marginBottom:"6px"}}>
                  <span style={{fontFamily:"'Fraunces',serif",fontSize:"clamp(16px,1.8vw,22px)",fontWeight:600,color:"#c8c8c8",letterSpacing:"-0.02em"}}>{n} </span>
                  <span style={{fontFamily:"'DM Mono',monospace",fontSize:"9px",color:"#666",letterSpacing:"0.08em",textTransform:"uppercase"}}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <FlingableCard/>
      </PeelSection>

      {/* -- VAULT -- */}
      <section id="vault-section" style={{padding:"84px 52px 124px",borderTop:"1px solid #161616",background:"#070707"}}>
        <div style={{maxWidth:"1160px",margin:"0 auto",display:"flex",alignItems:"center",gap:"80px",flexWrap:"wrap"}}>
          <div style={{flex:1,minWidth:"300px"}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:"10px",color:"#E8FF47",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:"16px",opacity:0.7}}>The Vault</div>
            <h2 style={{fontFamily:"'Fraunces',serif",fontSize:"clamp(26px,3.5vw,44px)",fontWeight:700,color:"#f0f0f0",letterSpacing:"-0.03em",lineHeight:1.1,marginBottom:"18px"}}>Some things are<br/><em style={{color:"#E8FF47",fontStyle:"italic"}}>director-level access only.</em></h2>
            <p style={{fontFamily:"'Epilogue',sans-serif",fontSize:"16px",color:"#c0c0c0",lineHeight:1.78,fontWeight:300,maxWidth:"420px",marginBottom:"20px"}}>Risk decisioning. Confidential computing. Federated AI. The systems I design protect billions in transactions and some of the most sensitive data on earth.</p>
            {/* Hardware edge callout */}
            <div style={{background:"rgba(232,255,71,0.03)",border:"1px solid rgba(232,255,71,0.14)",padding:"18px 20px",marginBottom:"24px",maxWidth:"420px"}}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:"9px",color:"#E8FF47",letterSpacing:"0.16em",textTransform:"uppercase",marginBottom:"9px",opacity:0.7}}>Technical Edge</div>
              <p style={{fontFamily:"'Epilogue',sans-serif",fontSize:"14px",color:"#d0d0d0",lineHeight:1.7,fontWeight:300}}>I understand hardware at the CPU/GPU level — from Intel SGX trusted execution environments to hardware-accelerated ML inference. This lets me design for highly regulated, high-security fintech environments with the technical fluency most designers can't offer.</p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
              {["① Spin the main dial — full rotation to unlock","② Turn the side handle for good measure"].map((s,i)=>(
                <div key={i} style={{fontFamily:"'DM Mono',monospace",fontSize:"10px",color:`rgba(232,255,71,${0.45-i*0.1})`,letterSpacing:"0.1em",textTransform:"uppercase"}}>{s}</div>
              ))}
            </div>
          </div>
          <div style={{paddingBottom:"48px"}}>
            <BankVault/>
          </div>
        </div>
      </section>

      {/* -- WORK -- */}
      <PeelSection id="work" onPeel={()=>scrollTo("leadership-section")} style={{padding:"96px 52px",borderTop:"1px solid #161616"}}>
        <div ref={workRef} style={{maxWidth:"1160px",margin:"0 auto"}}>
          <div style={{marginBottom:"44px",paddingBottom:"18px",borderBottom:"1px solid #1c1c1c"}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:"10px",color:"#E8FF47",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:"10px",opacity:0.7}}>Selected Work</div>
            <h2 style={{fontFamily:"'Fraunces',serif",fontSize:"clamp(28px,4vw,50px)",fontWeight:700,color:"#f0f0f0",letterSpacing:"-0.03em",lineHeight:1}}>Case Studies</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"2px",background:"#161616",alignItems:"stretch"}}>
            {PROJECTS.map((p,i)=><ProjectCard key={p.id} project={p} idx={i} visible={workVisible} onOpen={setActiveCase}/>)}
          </div>
        </div>
      </PeelSection>

      <LeadershipSection/>
      <SkillsSection/>
      <ThoughtLeadershipSection/>

      {/* -- ABOUT -- */}
      <PeelSection id="about-section" onPeel={()=>scrollTo("contact-section")} style={{padding:"96px 52px",borderTop:"1px solid #161616",background:"#0a0a0a"}}>
        <div style={{maxWidth:"1160px",margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1.1fr",gap:"80px",alignItems:"start"}}>
          <div>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:"10px",color:"#E8FF47",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:"22px",opacity:0.7}}>About</div>
            <div style={{display:"flex",gap:"22px",alignItems:"flex-start",marginBottom:"26px"}}>
              <div style={{width:"100px",height:"100px",borderRadius:"50%",overflow:"hidden",border:"2px solid rgba(232,255,71,0.35)",flexShrink:0}}>
                <img src={PHOTO_SRC} alt="Alexandra Goldfarb" style={{width:"100%",height:"100%",objectFit:"cover",imageRendering:"auto",WebkitBackfaceVisibility:"hidden",objectPosition:"center top"}}/>
              </div>
              <h2 style={{fontFamily:"'Fraunces',serif",fontSize:"clamp(22px,2.8vw,36px)",fontWeight:700,color:"#f0f0f0",letterSpacing:"-0.03em",lineHeight:1.2}}>I design financial systems that feel inevitable.</h2>
            </div>
            <p style={{fontFamily:"'Epilogue',sans-serif",fontSize:"15px",color:"#d0d0d0",lineHeight:1.85,marginBottom:"18px",fontWeight:300}}>Strategic end-to-end enterprise design leader with 11 years building AI-driven systems across fintech, banking, and security. Known for translating complex technology into intuitive products in regulated environments — from confidential computing at Intel to risk decisioning SaaS at Provenir, to payment intelligence at LGUX.</p>
            <p style={{fontFamily:"'Epilogue',sans-serif",fontSize:"15px",color:"#d0d0d0",lineHeight:1.85,marginBottom:"18px",fontWeight:300}}>I build 0→1 platforms, scale with rigor, and pilot quickly to learn and adapt, driving improved decision velocity for stakeholders and users. Coach-led leadership style: simplifying complex AI strategy through collaborative, high-performing teams.</p>
            <p style={{fontFamily:"'Epilogue',sans-serif",fontSize:"15px",color:"#888",lineHeight:1.85,fontWeight:300}}>Oracle OCI AI Certified · 28 LinkedIn Recommendations · BS International Trade &amp; Marketing, SUNY FIT / American University of Rome</p>
          </div>
          <div>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:"10px",color:"#888",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:"20px"}}>Experience</div>
            {[
              {co:"Intel Corporation",role:"Strategic Design Director · AI & Security Experience Architect · Office of the CTO",y:"2022–2025"},
              {co:"Provenir",role:"Director of Product Design · Fintech · CTO Strategy Office",y:"2017–2022"},
              {co:"LGUX Design Creative LLC",role:"Founder & Principal Designer · Principal Product Manager",y:"2014–2017"},
            ].map(exp=>(
              <div key={exp.co} style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",padding:"17px 0",borderBottom:"1px solid #181818"}}>
                <div>
                  <div style={{fontFamily:"'Epilogue',sans-serif",fontSize:"16px",color:"#e8e8e8",fontWeight:500,marginBottom:"4px"}}>{exp.co}</div>
                  <div style={{fontFamily:"'Epilogue',sans-serif",fontSize:"13px",color:"#aaa",fontWeight:400}}>{exp.role}</div>
                </div>
                <span style={{fontFamily:"'DM Mono',monospace",fontSize:"11px",color:"#555",flexShrink:0,marginLeft:"16px"}}>{exp.y}</span>
              </div>
            ))}
          </div>
        </div>
      </PeelSection>

      {/* -- CONTACT -- */}
      <section id="contact-section" style={{padding:"96px 52px",borderTop:"1px solid #161616",textAlign:"center"}}>
        <div style={{maxWidth:"540px",margin:"0 auto"}}>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:"10px",color:"#E8FF47",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:"22px",opacity:0.7}}>Get in Touch</div>
          <h2 style={{fontFamily:"'Fraunces',serif",fontSize:"clamp(32px,5vw,60px)",fontWeight:700,color:"#f0f0f0",letterSpacing:"-0.04em",lineHeight:1,marginBottom:"18px"}}>Let's build<br/><em style={{color:"#E8FF47",fontStyle:"italic"}}>something serious.</em></h2>
          <p style={{fontFamily:"'Epilogue',sans-serif",fontSize:"16px",color:"#c8c8c8",lineHeight:1.65,marginBottom:"20px",fontWeight:300}}>Director-level design leadership for fintech, payments, risk, and deep tech.</p>
          {/* Open to work badge, prominent */}
          <div style={{display:"inline-flex",alignItems:"center",gap:"10px",padding:"10px 20px",border:"1px solid rgba(232,255,71,0.3)",background:"rgba(232,255,71,0.05)",marginBottom:"36px"}}>
            <div style={{width:"7px",height:"7px",borderRadius:"50%",background:"#E8FF47",animation:"pulse 2.2s ease infinite",flexShrink:0}}/>
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:"11px",color:"#E8FF47",letterSpacing:"0.14em",textTransform:"uppercase"}}>Open to Work · Remote · New Jersey / NYC</span>
          </div>
          <div style={{display:"flex",gap:"10px",justifyContent:"center",flexWrap:"wrap"}}>
            {[{label:"Email Me →",href:"mailto:Alexandragoldfarb1@gmail.com",primary:true},{label:"LinkedIn",href:"https://www.linkedin.com/in/alexandragoldfarb",primary:false},{label:"GitHub",href:"https://github.com/Axela04",primary:false}].map(({label,href,primary})=>(
              <a key={label} href={href} target={primary?"_self":"_blank"} rel="noopener noreferrer"
                style={{display:"inline-flex",alignItems:"center",background:primary?"#E8FF47":"none",border:primary?"none":"1px solid #2e2e2e",color:primary?"#080808":"#c0c0c0",fontFamily:"'DM Mono',monospace",fontSize:"11px",letterSpacing:"0.16em",textTransform:"uppercase",padding:"14px 26px",textDecoration:"none",fontWeight:primary?700:400,transition:"all 0.25s"}}
                onMouseEnter={e=>{if(!primary){e.currentTarget.style.borderColor="#E8FF47";e.currentTarget.style.color="#E8FF47";}else e.currentTarget.style.background="#f5ff7a";}}
                onMouseLeave={e=>{if(!primary){e.currentTarget.style.borderColor="#2e2e2e";e.currentTarget.style.color="#c0c0c0";}else e.currentTarget.style.background="#E8FF47";}}
              >{label}</a>
            ))}
          </div>
        </div>
      </section>

      <footer style={{padding:"22px 52px",borderTop:"1px solid #0e0e0e",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontFamily:"'DM Mono',monospace",fontSize:"10px",color:"#222",letterSpacing:"0.1em"}}>© 2026 Alexandra Goldfarb</span>
        <span style={{fontFamily:"'DM Mono',monospace",fontSize:"10px",color:"#222",letterSpacing:"0.1em"}}>Director of Product Design · Developer Experience Strategy · New Jersey</span>
      </footer>
    </div>
  );
}
