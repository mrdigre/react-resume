import type { SiteContent } from "./types";

export const content: SiteContent = {
  meta: {
    title: "Manuel Digregorio — Arquitecto de Soluciones · Sistemas de IA",
    description:
      "Manuel Digregorio — Arquitecto de Soluciones en Sumsub. Diseño integraciones, arquitecturas de software y pipelines de IA que corren en producción, conectando infraestructura empresarial con software moderno.",
    jobTitle: "Arquitecto de Soluciones · Sistemas de IA",
  },

  nav: {
    chapters: [
      { id: "origin", label: "01 — ORIGEN" },
      { id: "build", label: "02 — CONSTRUIR" },
      { id: "now", label: "03 — AHORA" },
    ],
    contact: "CONTACTO",
  },

  hero: {
    name: "Manuel Digregorio",
    kicker: "ARQUITECTO DE SOLUCIONES / SISTEMAS DE IA",
    statement: "Arquitectura de sistemas para producción.",
    bio: [
      "Diseño integraciones, arquitecturas de software y pipelines de IA que corren en producción.",
      "Conecto la infraestructura empresarial existente con software moderno para resolver cuellos de botella operativos.",
    ],
    location: "Mendoza, Argentina — Remoto",
    linkedin: "https://linkedin.com/in/mrdigre",
    github: "https://github.com/mrdigre",
    email: "manudigregorio@gmail.com",
    ctaTalk: "Hablemos",
    ctaWork: "Ver el trabajo",
    linkedinLabel: "LinkedIn",
    githubLabel: "GitHub",
    alwaysBuilding: "SIEMPRE CONSTRUYENDO",
    pipelineLabel: "// CAREER_PIPELINE",
  },

  pipeline: [
    { label: "Industria", period: "2012" },
    { label: "Energía y Operaciones", period: "2015" },
    { label: "Código", period: "2022" },
    { label: "Arquitectura", period: "2024", emphasis: true },
    { label: "Empresas e IA", period: "Ahora" },
  ],

  sections: {
    origin: "Origen",
    build: "Construir",
    now: "Ahora",
  },

  originStory: {
    label: "El Recorrido",
    paragraphs: [
      {
        year: "2012",
        title: "Fundamentos Industriales",
        text: "Título en Ingeniería Industrial. Empecé gestionando proyectos, logística y operaciones en entornos industriales.",
      },
      {
        year: "2015",
        title: "Energía y Operaciones",
        text: "Pasé la siguiente etapa en los sectores de energía y manufactura (Axion Energy, Puebla Envases). Actué como el puente técnico para operaciones B2B, optimizando la eficiencia y liderando equipos como Engineering Manager.",
      },
      {
        year: "2022",
        title: "El Giro al Código",
        text: "Hice la transición al software puro. Me sumé a Mercap como desarrollador React.js.",
      },
      {
        year: "2024",
        title: "Arquitectura de Soluciones",
        text: "Arquitecto de Soluciones para una SaaS B2B global (Reprise). Empecé a diseñar integraciones técnicas a medida, conectando las necesidades del cliente con equipos de ingeniería multifuncionales, y resolviendo desafíos de implementación complejos.",
      },
      {
        year: "Ahora",
        title: "Empresas e IA",
        text: "Arquitecto de Soluciones en Sumsub, diseñando integraciones resilientes para entornos empresariales. Como builder hands-on, desarrollo agentes autónomos de IA y pipelines de datos.",
      },
    ],
  },

  agentMethod: {
    label: "Ingeniería Aplicada y Agentes de IA",
    intro:
      "Trabajar en cumplimiento normativo y verificación de identidad empresarial entrena el cerebro para pensar en arquitecturas zero-trust. Aplico esas mismas restricciones a mis proyectos personales de ingeniería. Este es el plano de cómo construyo y despliego agentes autónomos:",
    headline: "El razonamiento se encuentra con la ejecución — con un humano en el loop donde importa.",
    body: "El único patrón de IA que sobrevive en producción: un LLM evalúa el contexto, pero un script determinístico ejecuta el código. Esto no es una demo de chatbot. Es un servicio containerizado con un scheduler, una base de datos y un gate de aprobación estricto — corriendo sin supervisión hasta que llega a una decisión que solo un humano debería autorizar.",
    steps: [
      { label: "Ingerir", detail: "Trae datos operativos reales según un cronograma" },
      { label: "Razonar", detail: "El LLM evalúa contra reglas de negocio y objetivos" },
      { label: "Proponer", detail: "Una acción concreta, no una sugerencia" },
      { label: "Aprobar", detail: "Gate human-in-the-loop — Telegram, Slack, email" },
      { label: "Ejecutar", detail: "El script corre la acción aprobada, registrada y versionada" },
    ],
  },

  skillGroups: {
    label: "Stack Principal",
    groups: [
      {
        label: "Arquitectura",
        index: "01",
        items: [
          "Diseño de Sistemas Empresariales",
          "Infraestructura KYC/KYB/AML",
          "Flujos de Seguridad y Cumplimiento",
          "Estrategia de Soluciones B2B SaaS",
        ],
      },
      {
        label: "Ingeniería de Integraciones",
        index: "02",
        items: [
          "Implementaciones de API y SDK",
          "Auth, SSO y Gestión de Accesos",
          "Webhooks, REST y GraphQL",
          "Pipelines de Datos basados en Eventos",
        ],
      },
      {
        label: "Sistemas Agénticos",
        index: "03",
        items: [
          "Arquitectura de Sistemas Dirigida por LLM",
          "Orquestación de Agentes (AI SDK)",
          "Gobernanza Human-in-the-Loop",
          "Servicios Python/FastAPI Generados con IA",
        ],
      },
      {
        label: "Negocio y Operaciones",
        index: "04",
        items: [
          "Gestión de Stakeholders Técnicos",
          "Alineación de Equipos Multifuncionales",
          "Optimización de Procesos Industriales",
          "Estrategia Comercial y ROI",
        ],
      },
      {
        label: "El Stack",
        index: "05",
        items: [
          "IA (Claude 3.5 Sonnet, Gemini)",
          "Lógica (TypeScript, Node.js, React)",
          "Datos (PostgreSQL, Supabase)",
          "Infra (Docker, AWS, Vercel)",
        ],
      },
    ],
  },

  projects: {
    label: "Trabajo Seleccionado",
    githubLink: "Ver en GitHub →",
    visitSite: "Visitar sitio →",
    items: [
      {
        id: "ppc-agent",
        name: "PPC Optimization Agent",
        label: "Desarrollo Individual — Arquitectura hasta Despliegue",
        tagline: "Arquitectura y Despliegue de Agentes de IA",
        note: "Construido en 2026",
        description:
          "Agente autónomo para Amazon Ads. Ingiere datos de rendimiento de términos de búsqueda, razona contra objetivos de ACOS por campaña usando Claude 3.5 Sonnet, y propone acciones de puja y palabras clave. Cada ejecución está controlada por un flujo estricto de aprobación humana vía Telegram. Construido orquestando microservicios de Python y FastAPI generados con IA.",
        tech: ["Python", "FastAPI", "PostgreSQL", "Docker", "Claude API", "Telegram Bot API"],
        featured: true,
      },
      {
        id: "goodneys",
        name: "Goodneys LLC / Kiki & Koda",
        label: "Arquitecto Técnico",
        tagline: "Infraestructura de E-Commerce y Operaciones con IA",
        description:
          "Arquitectura técnica para una operación premium de e-commerce en Amazon US. Diseñé y desplegué dashboards internos, pipelines de inteligencia competitiva con LLM, y herramientas automatizadas de PPC. Actualmente gestiono la arquitectura de datos e integraciones de IA para la marca insignia de mascotas compostables, Kiki & Koda.",
        tech: ["Astro", "React", "Supabase", "Vercel", "Claude API", "Resend"],
        url: "https://kikikoda.com",
      },
    ],
  },

  currentRole: {
    label: "Actual",
    company: "Sumsub",
    title: "Arquitecto de Soluciones",
    period: "Abril 2025 – Presente",
    description:
      "Diseño e implemento soluciones de KYC, KYB y AML para clientes empresariales en toda América. Trabajo integrado con los equipos de ingeniería del cliente: definiendo integraciones de API, evaluando opciones de WebSDK y SDK móvil, diseñando flujos de verificación a medida, y arquitectando pipelines de eventos basados en webhooks. El puente entre ventas, producto e ingeniería de cliente — profundidad técnica en conversaciones comerciales, contexto comercial en decisiones técnicas.",
  },

  letsBuild: {
    header: "Construyamos",
    tag: "Sistemas que realmente funcionan en producción.",
    body: "Si estás lidiando con infraestructura legacy, escalando una SaaS empresarial, o buscando implementar agentes de IA que no se rompan bajo presión, hablemos. Siempre estoy abierto a discutir desafíos arquitectónicos complejos.",
  },

  contactForm: {
    name: "Nombre",
    email: "Email",
    message: "Mensaje",
    send: "Enviar",
    sending: "Enviando…",
    success: "Mensaje recibido. Te responderé pronto.",
    error: "Algo salió mal — escribime directamente por email.",
  },

  footer: {
    alwaysBuilding: "SIEMPRE CONSTRUYENDO",
  },
};
