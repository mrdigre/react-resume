export type PipelineStage = {
  label: string;
  period: string;
  emphasis?: boolean;
};

export type SkillGroup = {
  label: string;
  index: string;
  items: string[];
};

export type AgentStep = {
  label: string;
  detail: string;
};

export type Project = {
  id: string;
  name: string;
  label: string;
  tagline: string;
  note?: string;
  description: string;
  tech: string[];
  github?: string;
  url?: string;
  featured?: boolean;
};

export type OriginParagraph = {
  year: string;
  title: string;
  text: string;
};

export type NavChapter = {
  id: string;
  label: string;
};

export type ContactFormLabels = {
  name: string;
  email: string;
  message: string;
  send: string;
  sending: string;
  success: string;
  error: string;
};

export type SiteContent = {
  meta: {
    title: string;
    description: string;
    jobTitle: string;
  };
  nav: {
    chapters: NavChapter[];
    contact: string;
  };
  hero: {
    name: string;
    kicker: string;
    statement: string;
    bio: string[];
    location: string;
    linkedin: string;
    github: string;
    email: string;
    ctaTalk: string;
    ctaWork: string;
    linkedinLabel: string;
    githubLabel: string;
    alwaysBuilding: string;
    pipelineLabel: string;
  };
  pipeline: PipelineStage[];
  sections: {
    origin: string;
    build: string;
    now: string;
  };
  originStory: {
    label: string;
    paragraphs: OriginParagraph[];
  };
  agentMethod: {
    label: string;
    intro: string;
    headline: string;
    body: string;
    steps: AgentStep[];
  };
  skillGroups: {
    label: string;
    groups: SkillGroup[];
  };
  projects: {
    label: string;
    githubLink: string;
    visitSite: string;
    items: Project[];
  };
  currentRole: {
    label: string;
    company: string;
    title: string;
    period: string;
    description: string;
  };
  letsBuild: {
    header: string;
    tag: string;
    body: string;
  };
  contactForm: ContactFormLabels;
  footer: {
    alwaysBuilding: string;
  };
};
