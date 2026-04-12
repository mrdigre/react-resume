import React, { useState, useRef } from "react";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiArrowUpRight,
  FiSend,
} from "react-icons/fi";
import emailjs from "emailjs-com";
import {
  hero,
  currentRole,
  projects,
  experience,
  techStack,
  contactConfig,
} from "../content_option";
import "./App.css";

/* ─────────────────────────────────────────────────────────
   Design tokens — single source of truth for colors
───────────────────────────────────────────────────────── */
const T = {
  bg:          "#070708",
  card:        "#0F0F12",
  cardAlt:     "#13131A",
  border:      "#1E1E24",
  borderHover: "#2E2E38",
  text:        "#F2F2F5",
  muted:       "#71717A",
  faint:       "#3F3F46",
  indigo:      "#6366F1",
  indigoFg:    "#818CF8",
  amber:       "#F59E0B",
  green:       "#10B981",
  greenFg:     "#34D399",
};

/* ─────────────────────────────────────────────────────────
   Reusable primitives
───────────────────────────────────────────────────────── */
function Card({ children, className = "", style = {} }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      className={`rounded-2xl p-5 h-full flex flex-col transition-all duration-300 ${className}`}
      style={{
        backgroundColor: T.card,
        border: `1px solid ${hovered ? T.borderHover : T.border}`,
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </div>
  );
}

function Label({ children }) {
  return (
    <p
      className="text-[0.6rem] font-medium uppercase tracking-[0.2em] mb-4"
      style={{ color: T.faint }}
    >
      {children}
    </p>
  );
}

function Tag({ children, accent = T.indigo }) {
  return (
    <span
      className="font-mono text-[0.68rem] px-2 py-0.5 rounded-md border whitespace-nowrap"
      style={{
        backgroundColor: accent + "18",
        borderColor: accent + "35",
        color: accent,
      }}
    >
      {children}
    </span>
  );
}

function StatusBadge({ status }) {
  const isLive = status === "live";
  const color = isLive ? T.greenFg : T.indigoFg;
  return (
    <span
      className="text-[0.65rem] px-2.5 py-1 rounded-full flex items-center gap-1.5 w-fit border font-medium"
      style={{
        backgroundColor: color + "15",
        borderColor: color + "30",
        color,
      }}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isLive ? "animate-pulse" : ""}`}
        style={{ backgroundColor: color }}
      />
      {isLive ? "Live" : "Production"}
    </span>
  );
}

function GhostButton({ href, children, icon }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium border transition-all duration-200"
      style={{
        borderColor: hovered ? T.borderHover : T.border,
        color: hovered ? T.text : T.muted,
        backgroundColor: hovered ? T.cardAlt : "transparent",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {icon}
      {children}
    </a>
  );
}

/* ─────────────────────────────────────────────────────────
   HERO CARD
───────────────────────────────────────────────────────── */
function HeroCard() {
  return (
    <Card className="gap-0 p-6 md:p-8 justify-between">
      <div>
        {hero.available && (
          <div className="flex items-center gap-2 mb-6">
            <span
              className="w-2 h-2 rounded-full animate-pulse flex-shrink-0"
              style={{ backgroundColor: T.green }}
            />
            <span className="text-xs font-medium" style={{ color: T.green }}>
              Open to new opportunities
            </span>
          </div>
        )}
        <h1
          className="text-4xl md:text-5xl xl:text-[3.25rem] font-semibold tracking-tight leading-[1.05] mb-4"
          style={{ color: T.text }}
        >
          {hero.name}
        </h1>
        <p className="text-base md:text-lg font-light mb-5" style={{ color: T.muted }}>
          {hero.role}
          <span className="mx-2" style={{ color: T.faint }}>·</span>
          <span style={{ color: T.indigoFg }}>{hero.sub}</span>
        </p>
        <p
          className="text-sm leading-[1.85] font-light max-w-xl"
          style={{ color: T.muted }}
        >
          {hero.bio}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 mt-8">
        <GhostButton href={hero.github} icon={<FiGithub size={13} />}>
          GitHub
        </GhostButton>
        <GhostButton href={hero.linkedin} icon={<FiLinkedin size={13} />}>
          LinkedIn
        </GhostButton>
        <a
          href={`mailto:${hero.email}`}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200"
          style={{ backgroundColor: T.indigo, color: "#fff" }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#4F46E5")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = T.indigo)}
        >
          <FiMail size={13} />
          Email Me
        </a>
        <span
          className="flex items-center gap-1.5 text-xs ml-1"
          style={{ color: T.faint }}
        >
          <FiMapPin size={11} />
          {hero.location}
        </span>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────────────────
   CURRENT ROLE CARD
───────────────────────────────────────────────────────── */
function RoleCard() {
  return (
    <Card className="justify-between gap-4">
      <div>
        <Label>Currently</Label>
        <p className="text-2xl font-semibold mb-1" style={{ color: T.text }}>
          {currentRole.company}
        </p>
        <p className="text-sm font-medium mb-4" style={{ color: T.indigoFg }}>
          {currentRole.title}
        </p>
        <p className="text-xs leading-[1.8] font-light" style={{ color: T.muted }}>
          {currentRole.description}
        </p>
      </div>
      <div className="space-y-1.5">
        <p className="font-mono text-xs" style={{ color: T.faint }}>
          {currentRole.period}
        </p>
        <p
          className="flex items-center gap-1.5 text-xs"
          style={{ color: T.faint }}
        >
          <FiMapPin size={10} />
          {hero.location}
        </p>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────────────────
   PROJECT CARD
───────────────────────────────────────────────────────── */
function ProjectCard({ project }) {
  return (
    <Card className="justify-between gap-5">
      <div>
        <div className="flex items-start justify-between mb-5">
          <StatusBadge status={project.status} />
          <FiArrowUpRight size={15} style={{ color: T.faint }} />
        </div>
        <h3 className="text-xl font-semibold mb-1" style={{ color: T.text }}>
          {project.name}
        </h3>
        <p
          className="text-[0.7rem] font-medium uppercase tracking-wider mb-4"
          style={{ color: project.accent }}
        >
          {project.tagline}
        </p>
        <p className="text-sm font-light leading-[1.8]" style={{ color: T.muted }}>
          {project.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <Tag key={t} accent={project.accent}>
            {t}
          </Tag>
        ))}
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────────────────
   EXPERIENCE CARD
───────────────────────────────────────────────────────── */
function ExperienceCard() {
  return (
    <Card>
      <Label>Experience</Label>
      <div className="space-y-0">
        {experience.map((item, i) => (
          <div key={i} className="flex gap-4 items-stretch">
            {/* Timeline connector */}
            <div className="flex flex-col items-center flex-shrink-0 pt-1.5">
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: item.current ? T.green : T.faint,
                  boxShadow: item.current ? `0 0 6px ${T.green}` : "none",
                }}
              />
              {i < experience.length - 1 && (
                <div
                  className="w-px flex-1 mt-1.5"
                  style={{ backgroundColor: T.border, minHeight: "24px" }}
                />
              )}
            </div>
            {/* Content */}
            <div className="pb-4 flex-1">
              <p className="text-sm font-medium leading-snug" style={{ color: T.text }}>
                {item.company}
                {item.note && (
                  <span
                    className="ml-2 text-[0.65rem] font-mono font-normal px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: T.indigo + "18",
                      color: T.indigoFg,
                    }}
                  >
                    {item.note}
                  </span>
                )}
              </p>
              <p className="text-xs font-light mt-0.5" style={{ color: T.muted }}>
                {item.role}
              </p>
              <p className="font-mono text-[0.65rem] mt-0.5" style={{ color: T.faint }}>
                {item.period}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────────────────
   STACK CARD
───────────────────────────────────────────────────────── */
function StackCard() {
  return (
    <Card>
      <Label>Stack</Label>
      <div className="space-y-4">
        {Object.entries(techStack).map(([category, items]) => (
          <div key={category}>
            <p className="text-[0.65rem] font-medium mb-2" style={{ color: T.indigoFg }}>
              {category}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {items.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────────────────
   CONTACT CARD
───────────────────────────────────────────────────────── */
function ContactCard() {
  const [formState, setFormState] = useState("idle"); // idle | sending | sent | error
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState("sending");
    emailjs
      .sendForm(
        contactConfig.YOUR_SERVICE_ID,
        contactConfig.YOUR_TEMPLATE_ID,
        e.target,
        contactConfig.YOUR_USER_ID
      )
      .then(() => {
        setFormState("sent");
        if (formRef.current) formRef.current.reset();
      })
      .catch(() => setFormState("error"));
  };

  const inputStyle = {
    backgroundColor: T.cardAlt,
    borderColor: T.border,
    color: T.text,
    width: "100%",
    fontSize: "0.8rem",
    padding: "0.6rem 0.75rem",
    borderRadius: "0.5rem",
    border: "1px solid",
    outline: "none",
    fontFamily: "inherit",
  };

  return (
    <Card className="justify-between gap-4">
      <div>
        <Label>Get in Touch</Label>
        <p className="text-xs leading-[1.8] font-light" style={{ color: T.muted }}>
          Open to SA roles, consulting engagements, and AI/automation projects.
        </p>
      </div>

      {formState === "sent" ? (
        <div
          className="flex-1 flex items-center justify-center rounded-xl p-4 text-center text-xs font-medium"
          style={{ backgroundColor: T.green + "15", color: T.greenFg }}
        >
          Sent. I'll be in touch soon.
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-2.5 flex-1">
          <input
            type="text"
            name="from_name"
            required
            placeholder="Your name"
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = T.indigo)}
            onBlur={(e) => (e.target.style.borderColor = T.border)}
          />
          <input
            type="email"
            name="user_email"
            required
            placeholder="your@email.com"
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = T.indigo)}
            onBlur={(e) => (e.target.style.borderColor = T.border)}
          />
          <textarea
            name="message"
            required
            rows={3}
            placeholder="Your message..."
            style={{ ...inputStyle, resize: "none" }}
            onFocus={(e) => (e.target.style.borderColor = T.indigo)}
            onBlur={(e) => (e.target.style.borderColor = T.border)}
          />
          <button
            type="submit"
            disabled={formState === "sending"}
            className="flex items-center justify-center gap-2 text-xs font-semibold py-2.5 rounded-lg transition-opacity disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            style={{ backgroundColor: T.indigo, color: "#fff" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#4F46E5")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = T.indigo)}
          >
            <FiSend size={12} />
            {formState === "sending" ? "Sending…" : "Send Message"}
          </button>
          {formState === "error" && (
            <p className="text-[0.7rem] text-center" style={{ color: "#F87171" }}>
              Something went wrong.{" "}
              <a
                href={`mailto:${hero.email}`}
                style={{ color: T.indigoFg }}
              >
                Email directly
              </a>
            </p>
          )}
        </form>
      )}

      <a
        href={`mailto:${hero.email}`}
        className="flex items-center gap-1.5 text-[0.65rem] transition-colors"
        style={{ color: T.faint }}
        onMouseEnter={(e) => (e.currentTarget.style.color = T.muted)}
        onMouseLeave={(e) => (e.currentTarget.style.color = T.faint)}
      >
        <FiMail size={10} />
        {hero.email}
      </a>
    </Card>
  );
}

/* ─────────────────────────────────────────────────────────
   ROOT APP — Bento Grid
───────────────────────────────────────────────────────── */
export default function App() {
  return (
    <div
      className="min-h-screen px-4 py-6 md:px-6 md:py-8"
      style={{ backgroundColor: T.bg }}
    >
      {/* Top metadata bar */}
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-4">
        <span className="font-mono text-xs" style={{ color: T.faint }}>
          mrdigre
        </span>
        <span className="font-mono text-xs" style={{ color: T.faint }}>
          {new Date().getFullYear()} · Senior SA Portfolio
        </span>
      </div>

      {/* ── Bento Grid ── */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">

        {/* Row 1: Hero (3 cols) + Role (1 col) */}
        <div className="md:col-span-2 xl:col-span-3">
          <HeroCard />
        </div>
        <div className="xl:col-span-1">
          <RoleCard />
        </div>

        {/* Row 2: Projects (2 cols each) */}
        <div className="xl:col-span-2">
          <ProjectCard project={projects[0]} />
        </div>
        <div className="xl:col-span-2">
          <ProjectCard project={projects[1]} />
        </div>

        {/* Row 3: Experience (2 cols) + Stack (1 col) + Contact (1 col) */}
        <div className="md:col-span-2 xl:col-span-2">
          <ExperienceCard />
        </div>
        <div className="xl:col-span-1">
          <StackCard />
        </div>
        <div className="xl:col-span-1">
          <ContactCard />
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto mt-6 flex items-center justify-center">
        <p className="font-mono text-[0.65rem]" style={{ color: T.faint }}>
          Built with React & Tailwind CSS
        </p>
      </div>
    </div>
  );
}
