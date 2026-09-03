export const hero = {
  name: "Manuel Digregorio",
  kicker: "SOLUTIONS ARCHITECT / AI SYSTEMS",
  statement: "Architecting systems for production.",
  bio: [
    "I design integrations, software architectures, and AI pipelines that run in production.",
    "I connect existing enterprise infrastructure with modern software to solve operational bottlenecks.",
  ],
  location: "Mendoza, Argentina — Remote",
  linkedin: "https://linkedin.com/in/mrdigre",
  github: "https://github.com/mrdigre",
  email: "manudigregorio@gmail.com",
};

export const pipeline = [
  { label: "Industry", period: "2012" },
  { label: "Energy & Ops", period: "2015" },
  { label: "Code", period: "2022" },
  { label: "Architecture", period: "2024", emphasis: true },
  { label: "Enterprise & AI", period: "Now" },
];

export const currentRole = {
  company: "Sumsub",
  title: "Solutions Architect",
  period: "April 2025 – Present",
  description:
    "Designing and implementing KYC, KYB, and AML solutions for enterprise clients across the Americas. Embedded directly with client engineering teams: scoping API integrations, evaluating WebSDK and mobile SDK options, designing custom verification flows, and architecting webhook-based event pipelines. The bridge between sales, product, and customer engineering — technical depth in commercial conversations, commercial context in technical decisions.",
};

export type SkillGroup = {
  label: string;
  index: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Architecture",
    index: "01",
    items: [
      "Enterprise Systems Design",
      "KYC/KYB/AML Infrastructure",
      "Security & Compliance Workflows",
      "B2B SaaS Solution Strategy",
    ],
  },
  {
    label: "Integration Engineering",
    index: "02",
    items: [
      "API & SDK Implementations",
      "Auth, SSO & Access Management",
      "Webhooks, REST & GraphQL",
      "Event-Driven Data Pipelines",
    ],
  },
  {
    label: "Agentic Systems",
    index: "03",
    items: [
      "LLM-Directed System Architecture",
      "Agent Orchestration (AI SDK)",
      "Human-in-the-Loop Governance",
      "AI-Generated Python/FastAPI Services",
    ],
  },
  {
    label: "Business & Ops",
    index: "04",
    items: [
      "Technical Stakeholder Management",
      "Cross-Functional Team Alignment",
      "Industrial Process Optimization",
      "Commercial Strategy & ROI",
    ],
  },
  {
    label: "The Stack",
    index: "05",
    items: [
      "AI (Claude 3.5 Sonnet, Gemini)",
      "Logic (TypeScript, Node.js, React)",
      "Data (PostgreSQL, Supabase)",
      "Infra (Docker, AWS, Vercel)",
    ],
  },
];

export const agentMethod = {
  label: "Applied Engineering & AI Agents",
  intro:
    "Working in enterprise compliance and identity verification wires your brain for zero-trust architectures. I apply those exact same constraints to my personal engineering projects. Here is the blueprint of how I build and deploy autonomous agents:",
  headline: "Reasoning meets execution — with a human in the loop where it matters.",
  body: "The only AI pattern that survives in production: an LLM evaluates the context, but a deterministic script executes the code. This isn't a chatbot demo. It's a containerized service with a scheduler, a database, and a strict approval gate — running unattended until it reaches a decision only a human should authorize.",
  steps: [
    { label: "Ingest", detail: "Pull real operational data on a schedule" },
    { label: "Reason", detail: "LLM evaluates against business rules & targets" },
    { label: "Propose", detail: "Concrete action, not a suggestion" },
    { label: "Approve", detail: "Human-in-the-loop gate — Telegram, Slack, email" },
    { label: "Execute", detail: "Script runs the approved action, logged & versioned" },
  ],
};

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
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "ppc-agent",
    name: "PPC Optimization Agent",
    label: "Solo Build — Architecture Through Deployment",
    tagline: "AI Agent Architecture & Deployment",
    note: "Built 2026",
    description:
      "Autonomous agent for Amazon Ads. Ingests search-term performance data, reasons against per-campaign ACOS targets using Claude 3.5 Sonnet, and proposes bid/keyword actions. Every execution is gated by a strict human approval flow via Telegram. Built by orchestrating AI-generated Python and FastAPI microservices.",
    descriptionLong:
      "Autonomous agent for Amazon Ads. Ingests search-term performance data, reasons against per-campaign ACOS targets using Claude 3.5 Sonnet, and proposes bid/keyword actions. Every execution is gated by a strict human approval flow via Telegram. Built by orchestrating AI-generated Python and FastAPI microservices, running as containerized services with scheduled ingestion and versioned Postgres migrations.",
    tech: ["Python", "FastAPI", "PostgreSQL", "Docker", "Claude API", "Telegram Bot API"],
    featured: true,
  },
  {
    id: "goodneys",
    name: "Goodneys LLC / Kiki & Koda",
    label: "Technical Architect",
    tagline: "E-Commerce Infrastructure & AI Operations",
    description:
      "Technical architecture for a premium Amazon US e-commerce operation. Designed and deployed internal dashboards, LLM-powered competitive intelligence pipelines, and automated PPC tooling. Currently managing the data architecture and AI integrations for the flagship compostable pet brand, Kiki & Koda.",
    descriptionLong:
      "Technical architecture for a premium Amazon US e-commerce operation. Designed and deployed internal dashboards, LLM-powered competitive intelligence pipelines, and automated PPC tooling. Currently managing the data architecture and AI integrations for the flagship compostable pet brand, Kiki & Koda.",
    tech: ["Astro", "React", "Supabase", "Vercel", "Claude API", "Resend"],
    url: "https://kikikoda.com",
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
    role: "Technical Architect (Advisory since 2020)",
    period: "2015 — Present",
    chapter: "tech",
  },
  {
    company: "Puebla Envases",
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

export const letsBuild = {
  header: "Let's Build",
  tag: "Systems that actually work in production.",
  body: "If you are dealing with legacy infrastructure, scaling an enterprise SaaS, or looking to implement AI agents that don't break under pressure, we should talk. I am always open to discussing complex architectural challenges.",
};

export const originStory = {
  label: "The Journey",
  paragraphs: [
    {
      year: "2012",
      title: "Industrial Foundations",
      text: "Degree in Industrial Engineering. Started managing projects, logistics, and operations across industrial environments. Learned firsthand how complex physical systems scale, break, and operate under pressure.",
    },
    {
      year: "2015",
      title: "Energy & Operations",
      text: "Spent the next phase in the energy and manufacturing sectors (Axion Energy, Puebla Envases). Acted as the technical bridge for B2B operations, optimizing efficiency and eventually leading teams as Engineering Manager.",
    },
    {
      year: "2022",
      title: "The Code Pivot",
      text: "Transitioned to pure software. Joined Mercap as a React.js Developer.",
    },
    {
      year: "2024",
      title: "Solutions Architecture",
      text: "Solutions Architect for global B2B SaaS (Reprise). Began architecting tailored technical integrations, bridging client needs with cross-functional engineering teams, and solving hard implementation challenges.",
    },
    {
      year: "Now",
      title: "Enterprise & AI",
      text: "Solutions Architect at Sumsub, designing resilient integrations for enterprise environments. As a hands-on builder, I engineer autonomous AI agents and data pipelines.",
    },
  ],
};

export const contactConfig = {
  email: "manudigregorio@gmail.com",
  YOUR_SERVICE_ID: "service_nlkn16m",
  YOUR_TEMPLATE_ID: "template_lxyf2rc",
  YOUR_USER_ID: "nAQnsxU_Xy5GejOWd",
};
