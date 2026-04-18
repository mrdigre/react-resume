import React, { useState, useRef, useEffect, useCallback } from "react";
import { FiLinkedin, FiMail, FiMapPin, FiSend } from "react-icons/fi";
import emailjs from "emailjs-com";
import {
  hero,
  currentRole,
  projects,
  experience,
  terminalCommands,
  contactConfig,
} from "../content_option";
import "./App.css";

/* ── Design Tokens — improved readability ───────────────── */
const T = {
  bg: "#0A0A0A",
  card: "#0F0F0F",
  cardAlt: "#141414",
  border: "#1E1E1E",
  borderHover: "#333",
  text: "#FFFFFF",
  sub: "#D4D4D4",
  muted: "#999",
  faint: "#555",
  green: "#5E9E7E",
  amber: "#D4B64E",
};

/* ── Pixel Croc Mascot (winking, distinct from Goodneys) ── */
function PixelMascot() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 56 44"
      width="42"
      height="33"
      style={{ imageRendering: "pixelated" }}
    >
      {/* Spikes on head */}
      <rect x="14" y="0" width="4" height="4" fill="#2a7a3a" />
      <rect x="22" y="0" width="4" height="6" fill="#2a7a3a" />
      <rect x="30" y="0" width="4" height="4" fill="#2a7a3a" />
      {/* Head top */}
      <rect x="8" y="4" width="34" height="4" fill="#3a9a4e" />
      {/* Head main */}
      <rect x="4" y="8" width="42" height="4" fill="#3a9a4e" />
      <rect x="4" y="12" width="46" height="4" fill="#3a9a4e" />
      <rect x="4" y="16" width="50" height="4" fill="#3a9a4e" />
      {/* Snout */}
      <rect x="4" y="20" width="52" height="4" fill="#3a9a4e" />
      {/* Teeth */}
      <rect x="40" y="24" width="3" height="3" fill="#ddd" />
      <rect x="46" y="24" width="3" height="3" fill="#ddd" />
      {/* Jaw */}
      <rect x="8" y="24" width="44" height="4" fill="#2d7a38" />
      {/* Belly */}
      <rect x="8" y="28" width="36" height="4" fill="#2d7a38" />
      <rect x="12" y="32" width="28" height="4" fill="#2d7a38" />
      <rect x="16" y="36" width="20" height="4" fill="#2d7a38" />
      {/* Left eye — stays OPEN */}
      <rect x="8" y="8" width="14" height="10" fill="#e8e8d0" />
      <rect x="14" y="11" width="5" height="5" fill="#111" />
      <rect x="16" y="12" width="2" height="2" fill="#444" />
      {/* Right eye — WINKS */}
      <g>
        <rect x="28" y="8" width="14" height="10" fill="#e8e8d0" />
        <rect x="34" y="11" width="5" height="5" fill="#111" />
        <rect x="36" y="12" width="2" height="2" fill="#444" />
        <animateTransform
          attributeName="transform"
          type="scale"
          values="1 1;1 1;1 1;1 0.1;1 1;1 1"
          keyTimes="0;0.75;0.79;0.82;0.86;1"
          dur="4s"
          repeatCount="indefinite"
          additive="sum"
        />
        <animate
          attributeName="opacity"
          values="1;1;1;0.3;1;1"
          keyTimes="0;0.75;0.79;0.82;0.86;1"
          dur="4s"
          repeatCount="indefinite"
        />
      </g>
      {/* Nostril */}
      <rect x="48" y="17" width="3" height="3" fill="#1a5a26" />
      {/* Smirk */}
      <rect x="38" y="22" width="8" height="2" fill="#1a5a26" />
      <rect x="45" y="20" width="3" height="2" fill="#1a5a26" />
      {/* Tail */}
      <rect x="40" y="28" width="4" height="4" fill="#3a9a4e" />
      <rect x="44" y="24" width="4" height="4" fill="#3a9a4e" />
      <rect x="48" y="20" width="4" height="4" fill="#2a7a3a" />
    </svg>
  );
}

/* ── Terminal Component ─────────────────────────────────── */
function Terminal() {
  const [history, setHistory] = useState([
    { type: "system", text: "Welcome. Type 'help' for available commands, or click a button below." },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll WITHIN the terminal output only, not the page
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const processCommand = useCallback((cmd) => {
    const trimmed = cmd.trim().toLowerCase();

    if (trimmed === "clear") {
      setHistory([{ type: "system", text: "Terminal cleared." }]);
      return;
    }

    if (trimmed === "career") {
      const techJobs = experience.filter((e) => e.chapter === "tech");
      const bizJobs = experience.filter((e) => e.chapter === "business");
      const output = `> Career Timeline

  TECH & ARCHITECTURE
${techJobs.map((e) => `  ${e.current ? "●" : "○"} ${e.period.padEnd(18)} ${e.role} @ ${e.company}`).join("\n")}

  BUSINESS & OPERATIONS
${bizJobs.map((e) => `  ${e.current ? "●" : "○"} ${e.period.padEnd(18)} ${e.role} @ ${e.company}`).join("\n")}

  Two paths. One person. That's the edge.`;
      setHistory((h) => [...h, { type: "input", text: cmd }, { type: "output", text: output }]);
      return;
    }

    if (trimmed === "projects") {
      const output = projects
        .map(
          (p) => `> ${p.name}
  ${p.label}
  ${p.tagline}

  ${p.description}

  Stack: ${p.tech.join(" · ")}`
        )
        .join("\n\n");
      setHistory((h) => [...h, { type: "input", text: cmd }, { type: "output", text: output }]);
      return;
    }

    const response = terminalCommands[trimmed];
    if (response) {
      setHistory((h) => [...h, { type: "input", text: cmd }, { type: "output", text: response }]);
    } else {
      setHistory((h) => [
        ...h,
        { type: "input", text: cmd },
        { type: "error", text: `Command not found: '${trimmed}'. Type 'help' for available commands.` },
      ]);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    processCommand(input);
    setInput("");
  };

  // Expose processCommand for quick buttons
  useEffect(() => {
    window._terminalProcess = processCommand;
  }, [processCommand]);

  return (
    <div
      className="rounded-xl overflow-hidden flex flex-col"
      style={{ backgroundColor: T.card, border: `1px solid ${T.border}`, height: "480px" }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderBottom: `1px solid ${T.border}`, backgroundColor: T.cardAlt }}
      >
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#ff5f57" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#febc2e" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#28c840" }} />
        </div>
        <span className="font-mono text-[0.7rem] ml-2" style={{ color: T.faint }}>
          manu@portfolio ~ %
        </span>
      </div>

      {/* Output area — scrolls internally only */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-5 font-mono text-sm leading-relaxed"
        style={{ color: T.sub }}
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item, i) => (
          <div key={i} className="mb-3">
            {item.type === "input" && (
              <div>
                <span style={{ color: T.green }}>➜ </span>
                <span style={{ color: T.amber }}>{item.text}</span>
              </div>
            )}
            {item.type === "output" && (
              <pre className="whitespace-pre-wrap text-sm leading-relaxed" style={{ color: T.sub }}>
                {item.text}
              </pre>
            )}
            {item.type === "system" && (
              <div style={{ color: T.muted }}>{item.text}</div>
            )}
            {item.type === "error" && (
              <div style={{ color: "#e05050" }}>{item.text}</div>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex items-center px-5 py-3" style={{ borderTop: `1px solid ${T.border}` }}>
        <span className="font-mono text-sm mr-2" style={{ color: T.green }}>➜</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none font-mono text-sm"
          style={{ color: T.text, caretColor: T.amber }}
          placeholder="type a command..."
          autoFocus
        />
      </form>
    </div>
  );
}

/* ── Quick Command Buttons ──────────────────────────────── */
function QuickCommands() {
  const cmds = ["about", "skills", "career", "projects", "origin", "contact"];
  return (
    <div className="flex flex-wrap gap-2">
      {cmds.map((cmd) => (
        <button
          key={cmd}
          onClick={() => window._terminalProcess && window._terminalProcess(cmd)}
          className="font-mono text-xs px-3 py-2 rounded-md border transition-all duration-200 cursor-pointer"
          style={{ borderColor: T.border, color: T.muted, backgroundColor: T.cardAlt }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = T.amber;
            e.currentTarget.style.color = T.amber;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = T.border;
            e.currentTarget.style.color = T.muted;
          }}
        >
          /{cmd}
        </button>
      ))}
    </div>
  );
}

/* ── Card Components ────────────────────────────────────── */
function Card({ children, className = "" }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`rounded-xl p-6 h-full flex flex-col transition-colors duration-300 ${className}`}
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
    <p className="font-mono text-xs uppercase tracking-[0.18em] mb-5" style={{ color: T.faint }}>
      {children}
    </p>
  );
}

/* ── Experience Card ────────────────────────────────────── */
function ExperienceCard() {
  return (
    <Card>
      <SectionLabel>Experience</SectionLabel>
      <div>
        {experience.map((item, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center flex-shrink-0 pt-[5px]">
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.current ? T.green : T.faint }}
              />
              {i < experience.length - 1 && (
                <div className="w-px flex-1 mt-1.5" style={{ backgroundColor: T.border, minHeight: "24px" }} />
              )}
            </div>
            <div className="pb-4 flex-1 min-w-0">
              <p className="text-sm font-medium leading-snug" style={{ color: item.current ? T.text : T.sub }}>
                {item.company}
              </p>
              <p className="text-xs font-light mt-1" style={{ color: T.muted }}>
                {item.role}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <p className="font-mono text-xs" style={{ color: T.faint }}>
                  {item.period}
                </p>
                <span
                  className="font-mono text-[0.6rem] px-1.5 py-0.5 rounded"
                  style={{
                    backgroundColor: item.chapter === "tech" ? "rgba(94,158,126,0.12)" : "rgba(212,182,78,0.12)",
                    color: item.chapter === "tech" ? T.green : T.amber,
                    border: `1px solid ${item.chapter === "tech" ? "rgba(94,158,126,0.25)" : "rgba(212,182,78,0.25)"}`,
                  }}
                >
                  {item.chapter === "tech" ? "TECH" : "BIZ"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ── Contact Card ───────────────────────────────────────── */
function ContactCard() {
  const [formState, setFormState] = useState("idle");
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState("sending");
    emailjs
      .sendForm(contactConfig.YOUR_SERVICE_ID, contactConfig.YOUR_TEMPLATE_ID, e.target, contactConfig.YOUR_USER_ID)
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
    fontSize: "0.85rem",
    padding: "0.6rem 0.8rem",
    borderRadius: "0.375rem",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  };

  return (
    <Card className="justify-between gap-0">
      <div>
        <SectionLabel>Say hi</SectionLabel>
        <p className="text-sm font-light leading-[1.8] mb-5" style={{ color: T.muted }}>
          I write about systems, architecture, and building things.
        </p>
      </div>

      {formState === "sent" ? (
        <div
          className="flex-1 flex items-center justify-center rounded-lg p-4 text-center text-sm"
          style={{ border: `1px solid ${T.border}`, color: T.sub }}
        >
          Message received.
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-2.5 flex-1">
          <input type="text" name="from_name" required placeholder="Name" style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = T.muted)}
            onBlur={(e) => (e.target.style.borderColor = T.border)} />
          <input type="email" name="user_email" required placeholder="Email" style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = T.muted)}
            onBlur={(e) => (e.target.style.borderColor = T.border)} />
          <textarea name="message" required rows={3} placeholder="Message" style={{ ...inputStyle, resize: "none" }}
            onFocus={(e) => (e.target.style.borderColor = T.muted)}
            onBlur={(e) => (e.target.style.borderColor = T.border)} />
          <button type="submit" disabled={formState === "sending"}
            className="flex items-center justify-center gap-2 text-xs font-medium py-2.5 rounded-md transition-opacity disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed mt-1"
            style={{ backgroundColor: T.borderHover, color: T.sub }}>
            <FiSend size={12} />
            {formState === "sending" ? "Sending…" : "Send"}
          </button>
        </form>
      )}

      <div className="mt-4 pt-4 flex items-center gap-5" style={{ borderTop: `1px solid ${T.border}` }}>
        <a href={`mailto:${hero.email}`} className="flex items-center gap-1.5 text-xs transition-colors" style={{ color: T.faint }}
          onMouseEnter={(e) => (e.currentTarget.style.color = T.muted)}
          onMouseLeave={(e) => (e.currentTarget.style.color = T.faint)}>
          <FiMail size={12} /> {hero.email}
        </a>
        <a href={hero.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs transition-colors" style={{ color: T.faint }}
          onMouseEnter={(e) => (e.currentTarget.style.color = T.muted)}
          onMouseLeave={(e) => (e.currentTarget.style.color = T.faint)}>
          <FiLinkedin size={12} /> LinkedIn
        </a>
      </div>
    </Card>
  );
}

/* ── Main App ───────────────────────────────────────────── */
export default function App() {
  return (
    <div className="min-h-screen px-4 py-6 md:px-6 md:py-8" style={{ backgroundColor: T.bg }}>
      {/* Top bar */}
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-6 pb-4"
        style={{ borderBottom: `1px solid ${T.border}` }}>
        <div className="flex items-center gap-3">
          <PixelMascot />
          <div>
            <span className="text-base font-semibold" style={{ color: T.text }}>{hero.name}</span>
            <span className="font-mono text-xs ml-3" style={{ color: T.faint }}>{hero.role}</span>
          </div>
        </div>
        <span className="flex items-center gap-1.5 font-mono text-xs" style={{ color: T.faint }}>
          <FiMapPin size={11} /> {hero.location}
        </span>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">

        {/* Terminal */}
        <div className="md:col-span-2 xl:col-span-3">
          <Terminal />
        </div>

        {/* Quick commands + role */}
        <div className="xl:col-span-1 flex flex-col gap-3">
          <Card className="gap-3">
            <SectionLabel>Quick commands</SectionLabel>
            <QuickCommands />
          </Card>
          <Card className="flex-1 justify-between gap-0">
            <div>
              <SectionLabel>Current</SectionLabel>
              <p className="text-xl font-semibold leading-tight mb-1" style={{ color: T.text }}>
                {currentRole.company}
              </p>
              <p className="text-sm font-medium mb-4 tracking-wide" style={{ color: T.sub }}>
                {currentRole.title}
              </p>
              <p className="text-sm leading-[1.85] font-light" style={{ color: T.muted }}>
                {currentRole.description}
              </p>
            </div>
            <p className="font-mono text-xs mt-4" style={{ color: T.faint }}>
              {currentRole.period}
            </p>
          </Card>
        </div>

        {/* Project */}
        <div className="xl:col-span-2">
          <Card className="justify-between gap-0">
            <div>
              <div className="flex items-start justify-between mb-5">
                <span className="font-mono text-xs uppercase tracking-[0.18em]" style={{ color: T.faint }}>
                  Personal Project
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.12em]" style={{ color: T.green }}>
                  ● Active
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-1 leading-snug" style={{ color: T.text }}>
                {projects[0].name}
              </h3>
              <p className="text-xs font-medium uppercase tracking-wider mb-4" style={{ color: T.muted }}>
                {projects[0].tagline}
              </p>
              <p className="text-sm font-light leading-[1.85]" style={{ color: T.muted }}>
                {projects[0].description}
              </p>
            </div>
            <div className="w-full h-px my-5" style={{ backgroundColor: T.border }} />
            <div className="flex flex-wrap gap-2">
              {projects[0].tech.map((t) => (
                <span key={t} className="font-mono text-xs px-2.5 py-1 rounded border"
                  style={{ borderColor: T.border, color: T.faint, backgroundColor: T.cardAlt }}>
                  {t}
                </span>
              ))}
            </div>
          </Card>
        </div>

        {/* Experience + Contact */}
        <div className="xl:col-span-1">
          <ExperienceCard />
        </div>
        <div className="xl:col-span-1">
          <ContactCard />
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto mt-6 pt-4 flex items-center justify-center"
        style={{ borderTop: `1px solid ${T.border}` }}>
        <p className="font-mono text-xs" style={{ color: T.faint }}>
          Manuel Di Gregorio · {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
