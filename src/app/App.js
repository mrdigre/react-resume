import React, { useState, useRef } from "react";
import {
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiSend,
} from "react-icons/fi";
import emailjs from "emailjs-com";
import {
  hero,
  currentRole,
  projects,
  experience,
  competencies,
  contactConfig,
} from "../content_option";
import "./App.css";

/* ─────────────────────────────────────────────────────────
   Design tokens — Executive Dark
   Monochrome. No accent colors. Typography does the work.
───────────────────────────────────────────────────────── */
const T = {
  bg:          "#0A0A0A",
  card:        "#0F0F0F",
  cardAlt:     "#111111",
  border:      "#1C1C1C",
  borderHover: "#282828",
  text:        "#FFFFFF",
  sub:         "#D4D4D4",
  muted:       "#737373",
  faint:       "#3A3A3A",
};

/* ─────────────────────────────────────────────────────────
   Primitives
───────────────────────────────────────────────────────── */
function Card({ children, className = "" }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      className={`rounded-xl p-5 h-full flex flex-col transition-colors duration-300 ${className}`}
      style={{
        backgroundColor: T.card,
        border: `1px solid ${hovered ? T.borderHover : T.border}`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <p
      className="font-mono text-[0.58rem] uppercase tracking-[0.22em] mb-5"
      style={{ color: T.faint }}
    >
      {children}
    </p>
  );
}

function Divider() {
  return <div className="w-full h-px my-5" style={{ backgroundColor: T.border }} />;
}

/* ─────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────── */
function HeroCard() {
  return (
    <Card className="justify-between gap-0 p-6 md:p-8">
      <div>
        <h1
          className="text-4xl md:text-5xl xl:text-[3rem] font-semibold tracking-tight leading-[1.05] mb-3"
          style={{ color: T.text }}
        >
          {hero.name}
        </h1>
        <p
          className="text-sm md:text-base font-light mb-6 tracking-wide"
          style={{ color: T.sub }}
        >
          {hero.role}
        </p>
        <p
          className="text-sm leading-[1.9] font-light max-w-xl"
          style={{ color: T.muted }}
        >
          {hero.bio}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-8">
        <a
          href={hero.linkedin}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium border transition-all duration-200"
          style={{ borderColor: T.borderHover, color: T.sub }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = T.muted;
            e.currentTarget.style.color = T.text;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = T.borderHover;
            e.currentTarget.style.color = T.sub;
          }}
        >
          <FiLinkedin size={13} />
          LinkedIn
        </a>
        <span
          className="flex items-center gap-1.5 text-xs"
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
   CURRENT ROLE
───────────────────────────────────────────────────────── */
function RoleCard() {
  return (
    <Card className="justify-between gap-0">
      <div>
        <SectionLabel>Current</SectionLabel>
        <p
          className="text-xl font-semibold leading-tight mb-1"
          style={{ color: T.text }}
        >
          {currentRole.company}
        </p>
        <p
          className="text-xs font-medium mb-5 tracking-wide"
          style={{ color: T.sub }}
        >
          {currentRole.title}
        </p>
        <p
          className="text-xs leading-[1.85] font-light"
          style={{ color: T.muted }}
        >
          {currentRole.description}
        </p>
      </div>
      <div className="mt-5 space-y-1">
        <p className="font-mono text-[0.65rem]" style={{ color: T.faint }}>
          {currentRole.period}
        </p>
        <p className="flex items-center gap-1.5 text-[0.65rem]" style={{ color: T.faint }}>
          <FiMapPin size={10} />
          {hero.location}
        </p>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────────────────
   ARCHITECTURE & R&D PROJECTS
───────────────────────────────────────────────────────── */
function ProjectCard({ project }) {
  return (
    <Card className="justify-between gap-0">
      <div>
        <div className="flex items-start justify-between mb-5">
          <span
            className="font-mono text-[0.58rem] uppercase tracking-[0.22em]"
            style={{ color: T.faint }}
          >
            R&D
          </span>
          <span
            className="font-mono text-[0.58rem] uppercase tracking-[0.15em]"
            style={{ color: T.faint }}
          >
            {project.label}
          </span>
        </div>
        <h3
          className="text-lg font-semibold mb-1 leading-snug"
          style={{ color: T.text }}
        >
          {project.name}
        </h3>
        <p
          className="text-[0.68rem] font-medium uppercase tracking-wider mb-4"
          style={{ color: T.muted }}
        >
          {project.tagline}
        </p>
        <p
          className="text-xs font-light leading-[1.85]"
          style={{ color: T.muted }}
        >
          {project.description}
        </p>
      </div>
      <Divider />
      <div className="flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <span
            key={t}
            className="font-mono text-[0.65rem] px-2 py-0.5 rounded border"
            style={{
              borderColor: T.border,
              color: T.faint,
              backgroundColor: T.cardAlt,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────────────────
   EXPERIENCE
───────────────────────────────────────────────────────── */
function ExperienceCard() {
  return (
    <Card>
      <SectionLabel>Experience</SectionLabel>
      <div>
        {experience.map((item, i) => (
          <div key={i} className="flex gap-4">
            {/* Timeline */}
            <div className="flex flex-col items-center flex-shrink-0 pt-[5px]">
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: item.current ? T.sub : T.faint,
                }}
              />
              {i < experience.length - 1 && (
                <div
                  className="w-px flex-1 mt-1.5"
                  style={{ backgroundColor: T.border, minHeight: "22px" }}
                />
              )}
            </div>
            {/* Text */}
            <div className="pb-4 flex-1 min-w-0">
              <p
                className="text-sm font-medium leading-snug"
                style={{ color: item.current ? T.text : T.sub }}
              >
                {item.company}
              </p>
              <p
                className="text-xs font-light mt-0.5"
                style={{ color: T.muted }}
              >
                {item.role}
              </p>
              <p
                className="font-mono text-[0.62rem] mt-0.5"
                style={{ color: T.faint }}
              >
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
   COMPETENCIES
───────────────────────────────────────────────────────── */
function CompetenciesCard() {
  return (
    <Card>
      <SectionLabel>Competencies</SectionLabel>
      <ul className="space-y-2.5">
        {competencies.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <span
              className="mt-[6px] w-1 h-1 rounded-full flex-shrink-0"
              style={{ backgroundColor: T.faint }}
            />
            <span
              className="text-xs font-light leading-snug"
              style={{ color: T.sub }}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* ─────────────────────────────────────────────────────────
   CONTACT
───────────────────────────────────────────────────────── */
function ContactCard() {
  const [formState, setFormState] = useState("idle");
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
    border: `1px solid ${T.border}`,
    color: T.text,
    width: "100%",
    fontSize: "0.75rem",
    padding: "0.55rem 0.7rem",
    borderRadius: "0.375rem",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  };

  return (
    <Card className="justify-between gap-0">
      <div>
        <SectionLabel>Contact</SectionLabel>
        <p
          className="text-xs font-light leading-[1.8] mb-5"
          style={{ color: T.muted }}
        >
          Available for strategic consulting and architectural advisory engagements.
        </p>
      </div>

      {formState === "sent" ? (
        <div
          className="flex-1 flex items-center justify-center rounded-lg p-4 text-center text-xs"
          style={{ border: `1px solid ${T.border}`, color: T.sub }}
        >
          Message received.
        </div>
      ) : (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 flex-1"
        >
          <input
            type="text"
            name="from_name"
            required
            placeholder="Name"
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = T.muted)}
            onBlur={(e) => (e.target.style.borderColor = T.border)}
          />
          <input
            type="email"
            name="user_email"
            required
            placeholder="Email"
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = T.muted)}
            onBlur={(e) => (e.target.style.borderColor = T.border)}
          />
          <textarea
            name="message"
            required
            rows={3}
            placeholder="Message"
            style={{ ...inputStyle, resize: "none" }}
            onFocus={(e) => (e.target.style.borderColor = T.muted)}
            onBlur={(e) => (e.target.style.borderColor = T.border)}
          />
          <button
            type="submit"
            disabled={formState === "sending"}
            className="flex items-center justify-center gap-2 text-xs font-medium py-2 rounded-md transition-opacity disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed mt-1"
            style={{ backgroundColor: T.borderHover, color: T.sub }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = T.faint;
              e.currentTarget.style.color = T.text;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = T.borderHover;
              e.currentTarget.style.color = T.sub;
            }}
          >
            <FiSend size={11} />
            {formState === "sending" ? "Sending…" : "Send"}
          </button>
          {formState === "error" && (
            <p className="text-[0.65rem] text-center" style={{ color: T.muted }}>
              Could not send.{" "}
              <a href={`mailto:${hero.email}`} style={{ color: T.sub }}>
                Email directly
              </a>
            </p>
          )}
        </form>
      )}

      <div className="mt-4 pt-4" style={{ borderTop: `1px solid ${T.border}` }}>
        <a
          href={`mailto:${hero.email}`}
          className="flex items-center gap-1.5 text-[0.62rem] transition-colors"
          style={{ color: T.faint }}
          onMouseEnter={(e) => (e.currentTarget.style.color = T.muted)}
          onMouseLeave={(e) => (e.currentTarget.style.color = T.faint)}
        >
          <FiMail size={10} />
          {hero.email}
        </a>
      </div>
    </Card>
  );
}

/* ─────────────────────────────────────────────────────────
   ROOT — Bento Grid
───────────────────────────────────────────────────────── */
export default function App() {
  return (
    <div
      className="min-h-screen px-4 py-6 md:px-6 md:py-8"
      style={{ backgroundColor: T.bg }}
    >
      {/* Top bar */}
      <div
        className="max-w-6xl mx-auto flex items-center justify-between mb-5 pb-4"
        style={{ borderBottom: `1px solid ${T.border}` }}
      >
        <span className="font-mono text-[0.65rem]" style={{ color: T.faint }}>
          manudigregorio@gmail.com
        </span>
        <span className="font-mono text-[0.65rem]" style={{ color: T.faint }}>
          {hero.location}
        </span>
      </div>

      {/* Bento Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2.5">

        {/* Row 1 */}
        <div className="md:col-span-2 xl:col-span-3">
          <HeroCard />
        </div>
        <div className="xl:col-span-1">
          <RoleCard />
        </div>

        {/* Row 2 — R&D Projects */}
        <div className="xl:col-span-2">
          <ProjectCard project={projects[0]} />
        </div>
        <div className="xl:col-span-2">
          <ProjectCard project={projects[1]} />
        </div>

        {/* Row 3 */}
        <div className="md:col-span-2 xl:col-span-2">
          <ExperienceCard />
        </div>
        <div className="xl:col-span-1">
          <CompetenciesCard />
        </div>
        <div className="xl:col-span-1">
          <ContactCard />
        </div>
      </div>

      {/* Footer */}
      <div
        className="max-w-6xl mx-auto mt-5 pt-4 flex items-center justify-center"
        style={{ borderTop: `1px solid ${T.border}` }}
      >
        <p className="font-mono text-[0.58rem]" style={{ color: T.faint }}>
          Manuel Di Gregorio · {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
