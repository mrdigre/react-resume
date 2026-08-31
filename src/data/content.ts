export const hero = {
  name: "Manuel Digregorio",
  role: "Solutions Architect · Engineer · Builder",
  location: "Remote · Global",
  bio: "Systems thinker spanning industrial, enterprise, and commerce. I've run the factory, owned the P&L, led teams — and I've built systems end-to-end, including AI agents that run in production. Scroll for the full story, or drop into the terminal below.",
  linkedin: "https://linkedin.com/in/mrdigre",
  github: "https://github.com/mrdigre",
  email: "manudigregorio@gmail.com",
};

export const currentRole = {
  company: "Sumsub",
  title: "Solutions Architect",
  period: "Apr 2025 — Present",
  description:
    "Designing and implementing KYC, KYB, and AML solutions for enterprise clients across the Americas. Direct technical engagement with client engineering teams: scoping API integrations, evaluating WebSDK and mobile SDK options, designing custom verification flows, and architecting webhook-based event pipelines. Bridge between sales, product, and customer engineering — bringing technical depth to commercial conversations and commercial context to technical decisions.",
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Architecture",
    items: [
      "Systems Design & Integration",
      "KYC/KYB/AML & Compliance Infrastructure",
      "SaaS Strategy & Pre-Sales",
      "Technical Program Management",
    ],
  },
  {
    label: "Engineering",
    items: [
      "API & SDK Integration Architecture",
      "Developer-Facing Solution Design",
      "Webhooks · REST · GraphQL · Auth Flows",
      "JavaScript · React · Node.js",
    ],
  },
  {
    label: "AI & Agents",
    items: [
      "LLM Agent Architecture",
      "Anthropic Claude API Integration",
      "Human-in-the-Loop Automation",
      "FastAPI · Python Backend Development",
      "AI-Assisted Prototyping & Automation",
    ],
  },
  {
    label: "Business",
    items: [
      "P&L Management",
      "Commercial Strategy",
      "Stakeholder Management",
      "Operations & Supply Chain",
    ],
  },
  {
    label: "Stack",
    items: [
      "React · Astro · TypeScript · Node.js",
      "Python · FastAPI · SQLAlchemy · Alembic",
      "PostgreSQL · Supabase",
      "Docker · AWS · Vercel",
      "Anthropic Claude API · AI SDK",
    ],
  },
];

export type Project = {
  id: string;
  name: string;
  label: string;
  tagline: string;
  note?: string;
  description: string;
  descriptionLong: string;
  tech: string[];
  github?: string;
  url?: string;
};

export const projects: Project[] = [
  {
    id: "goodneys",
    name: "Goodneys LLC",
    label: "Co-Founder · Technical Architect",
    tagline: "E-Commerce Infrastructure + AI-Driven Operations",
    note: "Founded 2015 · Advisory role since 2020",
    description:
      "Premium e-commerce holding I co-founded in 2015. Built end-to-end: brand, product, growth, and the full tech & ops stack — internal dashboards, LLM-powered competitive intelligence, PPC tools, DTC landings. Flagship: Kiki & Koda — premium biodegradable pet essentials. Since 2020 operated day-to-day by my co-founder; I provide technical advisory on architecture.",
    descriptionLong:
      "Premium e-commerce holding on Amazon US. Built end-to-end: brand, product, growth, and the full tech & ops stack — internal dashboards, LLM-powered competitive intelligence, PPC tools, DTC landings. Flagship: Kiki & Koda — premium biodegradable pet essentials. Since 2020 operated by my co-founder; I remain involved on technical architecture and AI integrations.",
    tech: ["Astro", "React", "Supabase", "Vercel", "Claude API", "Resend"],
    url: "https://kikikoda.com",
  },
  {
    id: "ppc-agent",
    name: "PPC Optimization Agent",
    label: "Builder · Solo Project",
    tagline: "Autonomous AI Agent for Amazon Ads Optimization",
    note: "Built 2026",
    description:
      "Autonomous agent that ingests Amazon Ads search-term performance data, analyzes it against per-campaign ACOS targets using the Anthropic Claude API, and proposes bid/negative-keyword actions — every action requires human approval via Telegram before it executes.",
    descriptionLong:
      "Autonomous agent that ingests Amazon Ads search-term performance data, analyzes it with the Anthropic Claude API against per-campaign ACOS targets, and proposes bid/negative-keyword actions. Nothing executes without human approval via a Telegram bot. Runs as a containerized FastAPI service: APScheduler drives the ingestion and analysis jobs, an execution worker dispatches only approved actions, and Alembic migrations keep the Postgres schema versioned. Built solo, end-to-end architecture through deployment.",
    tech: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "Alembic",
      "Docker",
      "APScheduler",
      "Anthropic Claude API",
      "Telegram Bot API",
    ],
    github: "https://github.com/mrdigre/ppc-agent",
  },
];

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  current?: boolean;
  chapter: "tech" | "business";
};

export const experience: ExperienceItem[] = [
  {
    company: "Sumsub",
    role: "Solutions Architect",
    period: "2025 — Present",
    current: true,
    chapter: "tech",
  },
  {
    company: "Reprise",
    role: "Solutions Architect",
    period: "2024 — 2025",
    chapter: "tech",
  },
  {
    company: "Mercap",
    role: "React.js Developer",
    period: "2022 — 2023",
    chapter: "tech",
  },
  {
    company: "Goodneys LLC",
    role: "Co-Founder (Advisor since 2020)",
    period: "2015 — Present",
    current: false,
    chapter: "business",
  },
  {
    company: "Envases Los Andes",
    role: "Engineering Manager",
    period: "2020 — 2022",
    chapter: "business",
  },
  {
    company: "Axion Energy",
    role: "Sales Engineer",
    period: "2015 — 2020",
    chapter: "business",
  },
  {
    company: "Axion Energy",
    role: "Engineering Analyst",
    period: "2012 — 2015",
    chapter: "business",
  },
];

export const terminalCommands: Record<string, string> = {
  help: `Available commands:
  about     — who I am
  skills    — what I bring to the table
  impact    — numbers, scale, outcomes
  career    — the full timeline
  projects  — things I've built
  contact   — get in touch
  origin    — the 386 story
  clear     — clear terminal`,

  about: `> Manuel Digregorio
  Industrial Engineer · Solutions Architect.
  Based in Mendoza, Argentina.

  I've managed factories, run commercial territories,
  led P&L for manufacturing companies, written code,
  and designed enterprise SaaS architectures. Lately,
  that includes building autonomous AI agents.

  The common thread? Systems thinking.
  Whether it's a supply chain, a microservice mesh,
  or an LLM agent loop, I design systems that work
  under pressure.

  Currently: Solutions Architect at Sumsub — building trust
  and compliance infrastructure at global scale.`,

  skills: `> Core Competencies

  ARCHITECTURE
  ├── Systems Design & Integration
  ├── KYC/KYB/AML & Compliance Infrastructure
  ├── SaaS Strategy & Pre-Sales
  └── Technical Program Management

  ENGINEERING
  ├── API & SDK Integration Architecture
  ├── Developer-Facing Solution Design
  ├── Technical Scoping & Implementation Guidance
  ├── JavaScript · React · Node.js
  └── Webhooks · REST · GraphQL · Auth Flows

  AI & AGENTS
  ├── LLM Agent Architecture
  ├── Anthropic Claude API Integration
  ├── Human-in-the-Loop Automation
  ├── FastAPI · Python Backend Development
  └── AI-Assisted Prototyping & Automation

  BUSINESS
  ├── P&L Management
  ├── Commercial Strategy
  ├── Stakeholder Management
  └── Operations & Supply Chain

  STACK
  ├── React · Astro · TypeScript · Node.js
  ├── Python · FastAPI · SQLAlchemy · Alembic
  ├── PostgreSQL · Supabase · REST/GraphQL
  ├── Docker · AWS · Vercel
  └── Anthropic Claude API · AI SDK`,

  impact: `> Impact & Scale

  COMPANIES BUILT
  ├── Goodneys LLC — Co-Founder, founded 2015
  │   Built brand, product, ops and full tech stack from scratch.
  │   Flagship: Kiki & Koda (Amazon US + kikikoda.com).
  │   Since 2020 operated by my co-founder; I remain
  │   involved as technical advisor on architecture decisions.
  └── Multiple DTC brand launches and iterations

  TEAMS & P&L
  ├── Envases Los Andes — Engineering Manager
  │   250-person company · 15 direct reports
  │   Full administrative team under my lead
  └── Axion Energy — Sales & Engineering
      Led Esso → Axion rebranding across Mendoza,
      San Juan, San Luis and Neuquén: contract
      negotiation + engineering works supervision
      + B2B commercial territory

  TECH AT SCALE
  ├── Sumsub — Solutions Architect
  │   Compliance infrastructure across the Americas
  │   (LATAM + US + Canada enterprise accounts).
  │   Direct technical engagement with client engineering
  │   teams on a weekly basis: scoping API integrations,
  │   evaluating WebSDK and mobile SDK options, designing
  │   custom KYC/KYB verification flows, and architecting
  │   webhook-based event pipelines.
  │   The bridge between sales, product, and customer eng.
  ├── PPC Optimization Agent — autonomous LLM agent, solo build
  │   FastAPI + Postgres + Anthropic Claude API, human-in-the-loop
  │   approval via Telegram, containerized and deployed
  ├── AI-powered ops: LLM pipelines, agent workflows
  ├── End-to-end systems: React · Node · Python · Supabase
  └── LLM-powered competitive intelligence:
      thousands of competitor reviews analyzed for Kiki & Koda

  Full stack — the real kind.
  From P&L to pull request.
  From factory floor to cloud.
  Every layer, owned first-hand.`,

  origin: `> The Origin Story

  1992 — First computer: an IBM 386.
         DOS prompt. Diskettes. Prince of Persia.
         Barbarian. Grand Prix. The magic of commands.

  1998 — Age 12. Bought an HTML book.
         Built a website on Angelfire.
         Tasted the power of creating something
         from nothing but text.

  Then life happened. Engineering school.
  Industrial plants. Energy sector. Business ops.
  A decade in the "real world."

  But the pull of building never left.

  2022 — Career change. Back to code.
         Developer → Solutions Architect.
         Not starting over — coming home.

  The long way around wasn't a detour.
  It was the training ground that makes me
  different from every other SA in the room.

  Now, I build the systems I used to manage —
  including the AI agents that run them.`,

  contact: `> Get in touch

  Email:    manudigregorio@gmail.com
  LinkedIn: linkedin.com/in/mrdigre
  GitHub:   github.com/mrdigre

  Got a problem worth solving?
  Drop a line — always open to good conversations.`,
};

export const contactConfig = {
  email: "manudigregorio@gmail.com",
  YOUR_SERVICE_ID: "service_nlkn16m",
  YOUR_TEMPLATE_ID: "template_lxyf2rc",
  YOUR_USER_ID: "nAQnsxU_Xy5GejOWd",
};
