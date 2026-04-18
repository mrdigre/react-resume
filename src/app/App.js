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

/* ── Design Tokens ──────────────────────────────────────── */
const T = {
  bg: "#FAFAFA",
  card: "#FFFFFF",
  cardAlt: "#F5F5F5",
  border: "#E8E8E8",
  borderHover: "#D0D0D0",
  text: "#1A1A1A",
  sub: "#444",
  muted: "#777",
  faint: "#AAA",
  green: "#3D8B5E",
  amber: "#B8922A",
  // Terminal stays dark
  termBg: "#0F0F0F",
  termCard: "#141414",
  termBorder: "#1E1E1E",
  termText: "#E0E0E0",
  termMuted: "#888",
  termFaint: "#555",
  termGreen: "#5E9E7E",
  termAmber: "#D4B64E",
};

/* ── Pixel Croc Mascot (feminine, smiling, lashes) ──────── */
function PixelMascot() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="40"
      height="40"
      style={{ imageRendering: "pixelated" }}
    >
      {/* Eyelashes — left */}
      <rect x="6" y="4" width="2" height="4" fill="#1a5a28" />
      <rect x="10" y="2" width="2" height="4" fill="#1a5a28" />
      <rect x="14" y="4" width="2" height="3" fill="#1a5a28" />
      {/* Eyelashes — right (these wink) */}
      <g className="croc-lash-r">
        <rect x="28" y="4" width="2" height="4" fill="#1a5a28" />
        <rect x="32" y="2" width="2" height="4" fill="#1a5a28" />
        <rect x="36" y="4" width="2" height="3" fill="#1a5a28" />
        <style>{`
          .croc-lash-r {
            animation: lashWink 5s ease-in-out infinite;
          }
          @keyframes lashWink {
            0%, 75%, 100% { opacity: 1; }
            80%, 90% { opacity: 0; }
          }
          .croc-eye-r {
            transform-origin: 33px 14px;
            animation: eyeWink 5s ease-in-out infinite;
          }
          @keyframes eyeWink {
            0%, 75%, 100% { transform: scaleY(1); }
            80%, 90% { transform: scaleY(0.08); }
          }
        `}</style>
      </g>
      {/* Head */}
      <rect x="4" y="7" width="36" height="4" fill="#3a9a4e" />
      <rect x="2" y="11" width="42" height="4" fill="#3a9a4e" />
      <rect x="2" y="15" width="44" height="4" fill="#3a9a4e" />
      <rect x="2" y="19" width="46" height="4" fill="#3a9a4e" />
      {/* Snout */}
      <rect x="2" y="23" width="44" height="4" fill="#2d7a38" />
      {/* Left eye — stays open */}
      <rect x="6" y="9" width="12" height="10" fill="#e8e8d0" />
      <rect x="10" y="12" width="5" height="5" fill="#2a6030" />
      <rect x="12" y="13" width="2" height="2" fill="#111" />
      {/* Right eye — winks */}
      <g className="croc-eye-r">
        <rect x="26" y="9" width="12" height="10" fill="#e8e8d0" />
        <rect x="30" y="12" width="5" height="5" fill="#2a6030" />
        <rect x="32" y="13" width="2" height="2" fill="#111" />
      </g>
      {/* Blush cheeks */}
      <rect x="4" y="19" width="4" height="2" fill="#e88a7a" opacity="0.4" />
      <rect x="38" y="19" width="4" height="2" fill="#e88a7a" opacity="0.4" />
      {/* Smile */}
      <rect x="14" y="23" width="4" height="2" fill="#1a5a28" />
      <rect x="18" y="25" width="10" height="2" fill="#1a5a28" />
      <rect x="28" y="23" width="4" height="2" fill="#1a5a28" />
      {/* Nostrils */}
      <rect x="20" y="20" width="3" height="2" fill="#1a5a28" />
      <rect x="26" y="20" width="3" height="2" fill="#1a5a28" />
      {/* Lower jaw / chin */}
      <rect x="6" y="27" width="34" height="4" fill="#2d7a38" />
      <rect x="10" y="31" width="26" height="3" fill="#2d7a38" />
      {/* Tiny crown/tiara detail */}
      <rect x="18" y="5" width="2" height="2" fill="#D4B64E" />
      <rect x="22" y="4" width="2" height="3" fill="#D4B64E" />
      <rect x="26" y="5" width="2" height="2" fill="#D4B64E" />
    </svg>
  );
}

/* ── Terminal Component ─────────────────────────────────── */
function Terminal() {
  const [history, setHistory] = useState([
    { type: "system", text: "Welcome. Type 'help' or use the quick commands." },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

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

  useEffect(() => {
    window._terminalProcess = processCommand;
  }, [processCommand]);

  return (
    <div
      className="rounded-xl overflow-hidden flex flex-col shadow-lg"
      style={{ backgroundColor: T.termBg, border: `1px solid ${T.termBorder}`, height: "460px" }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 flex-shrink-0"
        style={{ borderBottom: `1px solid ${T.termBorder}`, backgroundColor: T.termCard }}>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#ff5f57" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#febc2e" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#28c840" }} />
        </div>
        <span className="font-mono text-xs ml-2" style={{ color: T.termFaint }}>
          manu@portfolio ~ %
        </span>
      </div>

      {/* Output — scrolls internally */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-5 font-mono text-sm leading-relaxed"
        style={{ color: T.termText, overscrollBehavior: "contain" }}
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item, i) => (
          <div key={i} className="mb-3">
            {item.type === "input" && (
              <div>
                <span style={{ color: T.termGreen }}>➜ </span>
                <span style={{ color: T.termAmber }}>{item.text}</span>
              </div>
            )}
            {item.type === "output" && (
              <pre className="whitespace-pre-wrap text-sm leading-relaxed" style={{ color: T.termText }}>
                {item.text}
              </pre>
            )}
            {item.type === "system" && (
              <div style={{ color: T.termMuted }}>{item.text}</div>
            )}
            {item.type === "error" && (
              <div style={{ color: "#e05050" }}>{item.text}</div>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex items-center px-5 py-3 flex-shrink-0"
        style={{ borderTop: `1px solid ${T.termBorder}` }}>
        <span className="font-mono text-sm mr-2" style={{ color: T.termGreen }}>➜</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none font-mono text-sm"
          style={{ color: "#fff", caretColor: T.termAmber }}
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
          className="font-mono text-xs px-3 py-2 rounded-lg border transition-all duration-200 cursor-pointer"
          style={{ borderColor: T.border, color: T.sub, backgroundColor: T.card }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = T.amber;
            e.currentTarget.style.color = T.amber;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = T.border;
            e.currentTarget.style.color = T.sub;
          }}
        >
          /{cmd}
        </button>
      ))}
    </div>
  );
}

/* ── Card ────────────────────────────────────────────────── */
function Card({ children, className = "" }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`rounded-xl p-6 h-full flex flex-col transition-all duration-300 ${className}`}
      style={{
        backgroundColor: T.card,
        border: `1px solid ${hovered ? T.borderHover : T.border}`,
        boxShadow: hovered ? "0 2px 12px rgba(0,0,0,0.04)" : "none",
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
    <p className="font-mono text-xs uppercase tracking-[0.16em] mb-4" style={{ color: T.faint }}>
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
          <div key={i} className="flex gap-3">
            <div className="flex flex-col items-center flex-shrink-0 pt-[5px]">
              <div className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.current ? T.green : T.faint }} />
              {i < experience.length - 1 && (
                <div className="w-px flex-1 mt-1.5" style={{ backgroundColor: T.border, minHeight: "22px" }} />
              )}
            </div>
            <div className="pb-3 flex-1 min-w-0">
              <p className="text-sm font-semibold leading-snug" style={{ color: item.current ? T.text : T.sub }}>
                {item.company}
              </p>
              <p className="text-xs mt-0.5" style={{ color: T.muted }}>
                {item.role}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="font-mono text-[0.65rem]" style={{ color: T.faint }}>{item.period}</p>
                <span className="font-mono text-[0.55rem] px-1.5 py-0.5 rounded"
                  style={{
                    backgroundColor: item.chapter === "tech" ? "rgba(61,139,94,0.08)" : "rgba(184,146,42,0.08)",
                    color: item.chapter === "tech" ? T.green : T.amber,
                    border: `1px solid ${item.chapter === "tech" ? "rgba(61,139,94,0.2)" : "rgba(184,146,42,0.2)"}`,
                  }}>
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
      .then(() => { setFormState("sent"); if (formRef.current) formRef.current.reset(); })
      .catch(() => setFormState("error"));
  };

  const inputStyle = {
    backgroundColor: T.cardAlt,
    border: `1px solid ${T.border}`,
    color: T.text,
    width: "100%",
    fontSize: "0.85rem",
    padding: "0.6rem 0.8rem",
    borderRadius: "0.5rem",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.2s",
  };

  return (
    <Card className="justify-between gap-0">
      <div>
        <SectionLabel>Say hi</SectionLabel>
        <p className="text-sm leading-[1.8] mb-5" style={{ color: T.muted }}>
          I write about systems, architecture, and building things.
        </p>
      </div>
      {formState === "sent" ? (
        <div className="flex-1 flex items-center justify-center rounded-lg p-4 text-center text-sm"
          style={{ border: `1px solid ${T.border}`, color: T.sub }}>
          Message received.
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-2.5 flex-1">
          <input type="text" name="from_name" required placeholder="Name" style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = T.green)}
            onBlur={(e) => (e.target.style.borderColor = T.border)} />
          <input type="email" name="user_email" required placeholder="Email" style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = T.green)}
            onBlur={(e) => (e.target.style.borderColor = T.border)} />
          <textarea name="message" required rows={3} placeholder="Message" style={{ ...inputStyle, resize: "none" }}
            onFocus={(e) => (e.target.style.borderColor = T.green)}
            onBlur={(e) => (e.target.style.borderColor = T.border)} />
          <button type="submit" disabled={formState === "sending"}
            className="flex items-center justify-center gap-2 text-sm font-medium py-2.5 rounded-lg transition-all disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed mt-1"
            style={{ backgroundColor: T.text, color: T.card }}>
            <FiSend size={12} />
            {formState === "sending" ? "Sending…" : "Send"}
          </button>
        </form>
      )}
      <div className="mt-4 pt-4 flex items-center gap-5" style={{ borderTop: `1px solid ${T.border}` }}>
        <a href={`mailto:${hero.email}`} className="flex items-center gap-1.5 text-xs transition-colors"
          style={{ color: T.faint }}
          onMouseEnter={(e) => (e.currentTarget.style.color = T.text)}
          onMouseLeave={(e) => (e.currentTarget.style.color = T.faint)}>
          <FiMail size={12} /> {hero.email}
        </a>
        <a href={hero.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs transition-colors"
          style={{ color: T.faint }}
          onMouseEnter={(e) => (e.currentTarget.style.color = T.text)}
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
    <div className="min-h-screen px-4 py-8 md:px-8 md:py-10" style={{ backgroundColor: T.bg }}>
      {/* Top bar */}
      <div className="max-w-5xl mx-auto flex items-center justify-between mb-8 pb-5"
        style={{ borderBottom: `1px solid ${T.border}` }}>
        <div className="flex items-center gap-4">
          <PixelMascot />
          <div>
            <h1 className="text-xl font-bold" style={{ color: T.text }}>{hero.name}</h1>
            <p className="text-sm mt-0.5" style={{ color: T.muted }}>{hero.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href={hero.linkedin} target="_blank" rel="noreferrer"
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all"
            style={{ borderColor: T.border, color: T.sub }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = T.text; e.currentTarget.style.color = T.text; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.sub; }}>
            <FiLinkedin size={12} /> LinkedIn
          </a>
          <span className="flex items-center gap-1.5 text-xs" style={{ color: T.faint }}>
            <FiMapPin size={11} /> {hero.location}
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Bio */}
        <p className="text-base leading-[1.9] mb-8 max-w-3xl" style={{ color: T.sub }}>
          {hero.bio}
        </p>

        {/* Terminal + Quick Commands */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 mb-4">
          <div className="xl:col-span-3">
            <Terminal />
          </div>
          <div className="xl:col-span-1">
            <Card className="gap-4">
              <SectionLabel>Quick commands</SectionLabel>
              <QuickCommands />
              <div className="mt-auto pt-4" style={{ borderTop: `1px solid ${T.border}` }}>
                <p className="text-xs leading-relaxed" style={{ color: T.faint }}>
                  Type commands in the terminal or click the buttons above. Try <span style={{ color: T.amber, fontFamily: "monospace" }}>/origin</span> for the full story.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Cards row */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Current Role */}
          <Card className="justify-between gap-0">
            <div>
              <SectionLabel>Current</SectionLabel>
              <p className="text-lg font-bold leading-tight mb-1" style={{ color: T.text }}>
                {currentRole.company}
              </p>
              <p className="text-sm mb-3" style={{ color: T.sub }}>
                {currentRole.title}
              </p>
              <p className="text-sm leading-[1.8]" style={{ color: T.muted }}>
                {currentRole.description}
              </p>
            </div>
            <p className="font-mono text-xs mt-4" style={{ color: T.faint }}>
              {currentRole.period}
            </p>
          </Card>

          {/* Project */}
          <Card className="justify-between gap-0">
            <div>
              <div className="flex items-start justify-between mb-4">
                <SectionLabel>Personal Project</SectionLabel>
                <span className="font-mono text-[0.65rem] uppercase" style={{ color: T.green }}>● Active</span>
              </div>
              <h3 className="text-lg font-bold mb-1 leading-snug" style={{ color: T.text }}>
                {projects[0].name}
              </h3>
              <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: T.muted }}>
                {projects[0].tagline}
              </p>
              <p className="text-sm leading-[1.8]" style={{ color: T.muted }}>
                {projects[0].description}
              </p>
            </div>
            <div className="w-full h-px my-4" style={{ backgroundColor: T.border }} />
            <div className="flex flex-wrap gap-1.5">
              {projects[0].tech.map((t) => (
                <span key={t} className="font-mono text-[0.65rem] px-2 py-0.5 rounded border"
                  style={{ borderColor: T.border, color: T.faint, backgroundColor: T.cardAlt }}>
                  {t}
                </span>
              ))}
            </div>
          </Card>

          {/* Experience */}
          <ExperienceCard />

          {/* Contact */}
          <ContactCard />
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-5xl mx-auto mt-8 pt-5 flex items-center justify-center"
        style={{ borderTop: `1px solid ${T.border}` }}>
        <p className="font-mono text-xs" style={{ color: T.faint }}>
          Manuel Di Gregorio · {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
