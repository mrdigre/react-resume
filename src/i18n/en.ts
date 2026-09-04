import type { SiteContent } from "./types";

export const content: SiteContent = {
  meta: {
    title: "Manuel Digregorio — Solutions Architect · AI Systems",
    description:
      "Manuel Digregorio — Solutions Architect at Sumsub. I design integrations, software architectures, and AI pipelines that run in production, connecting enterprise infrastructure with modern software.",
    jobTitle: "Solutions Architect · AI Systems",
  },

  nav: {
    chapters: [
      { id: "origin", label: "01 — ORIGIN" },
      { id: "build", label: "02 — BUILD" },
      { id: "now", label: "03 — NOW" },
    ],
    contact: "CONTACT",
  },

  hero: {
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
    ctaTalk: "Let's talk",
    ctaWork: "View the work",
    linkedinLabel: "LinkedIn",
    githubLabel: "GitHub",
    alwaysBuilding: "ALWAYS BUILDING",
    pipelineLabel: "// CAREER_PIPELINE",
  },

  pipeline: [
    { label: "Industry", period: "2012" },
    { label: "Energy & Ops", period: "2015" },
    { label: "Code", period: "2022" },
    { label: "Architecture", period: "2024", emphasis: true },
    { label: "Enterprise & AI", period: "Now" },
  ],

  sections: {
    origin: "Origin",
    build: "Build",
    now: "Now",
  },

  originStory: {
    label: "The Journey",
    paragraphs: [
      {
        year: "2012",
        title: "Industrial Foundations",
        text: "Degree in Industrial Engineering. Started managing projects, logistics, and operations across industrial environments.",
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
  },

  agentMethod: {
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
  },

  skillGroups: {
    label: "Core Stack",
    groups: [
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
    ],
  },

  projects: {
    label: "Selected Work",
    githubLink: "View on GitHub →",
    visitSite: "Visit site →",
    items: [
      {
        id: "ppc-agent",
        name: "PPC Optimization Agent",
        label: "Solo Build — Architecture Through Deployment",
        tagline: "AI Agent Architecture & Deployment",
        note: "Built 2026",
        description:
          "Autonomous agent for Amazon Ads. Ingests search-term performance data, reasons against per-campaign ACOS targets using Claude 3.5 Sonnet, and proposes bid/keyword actions. Every execution is gated by a strict human approval flow via Telegram. Built by orchestrating AI-generated Python and FastAPI microservices.",
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
        tech: ["Astro", "React", "Supabase", "Vercel", "Claude API", "Resend"],
        url: "https://kikikoda.com",
      },
    ],
  },

  currentRole: {
    label: "Current",
    company: "Sumsub",
    title: "Solutions Architect",
    period: "April 2025 – Present",
    description:
      "Designing and implementing KYC, KYB, and AML solutions for enterprise clients across the Americas. Embedded directly with client engineering teams: scoping API integrations, evaluating WebSDK and mobile SDK options, designing custom verification flows, and architecting webhook-based event pipelines. The bridge between sales, product, and customer engineering — technical depth in commercial conversations, commercial context in technical decisions.",
  },

  letsBuild: {
    header: "Let's Build",
    tag: "Systems that actually work in production.",
    body: "If you are dealing with legacy infrastructure, scaling an enterprise SaaS, or looking to implement AI agents that don't break under pressure, we should talk. I am always open to discussing complex architectural challenges.",
  },

  contactForm: {
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send",
    sending: "Sending…",
    success: "Message received. I'll get back to you soon.",
    error: "Something went wrong — email me directly instead.",
  },

  footer: {
    alwaysBuilding: "ALWAYS BUILDING",
  },
};
