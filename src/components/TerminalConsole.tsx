import { useCallback, useEffect, useRef, useState } from "react";
import { experience, projects, terminalCommands } from "../data/content";

type HistoryItem =
  | { type: "system"; text: string }
  | { type: "input"; text: string }
  | { type: "output"; text: string }
  | { type: "error"; text: string };

const QUICK_COMMANDS = ["about", "skills", "impact", "career", "projects", "origin", "contact"];

function buildCareerOutput(): string {
  const techJobs = experience.filter((e) => e.chapter === "tech");
  const bizJobs = experience.filter((e) => e.chapter === "business");
  return `> Career Timeline

  TECH & ARCHITECTURE
${techJobs.map((e) => `  ${e.current ? "●" : "○"} ${e.period.padEnd(18)} ${e.role} @ ${e.company}`).join("\n")}

  BUSINESS & OPERATIONS
${bizJobs.map((e) => `  ${e.current ? "●" : "○"} ${e.period.padEnd(18)} ${e.role} @ ${e.company}`).join("\n")}

  Two paths. One person. That's the edge.`;
}

function buildProjectsOutput(): string {
  return projects
    .map((p) => {
      const noteLine = p.note ? `\n  ${p.note}` : "";
      return `> ${p.name}
  ${p.label}
  ${p.tagline}${noteLine}

  ${p.descriptionLong}

  Stack: ${p.tech.join(" · ")}`;
    })
    .join("\n\n");
}

export default function TerminalConsole() {
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: "system", text: "Welcome. Type 'help' for commands, or use the Quick Commands to explore." },
    { type: "input", text: "about" },
    { type: "output", text: terminalCommands.about },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    let lastInputIdx = -1;
    for (let i = history.length - 1; i >= 0; i--) {
      if (history[i].type === "input") {
        lastInputIdx = i;
        break;
      }
    }
    const el = lastInputIdx >= 0 ? itemRefs.current[lastInputIdx] : null;
    if (el) {
      const elTop = el.getBoundingClientRect().top;
      const cTop = container.getBoundingClientRect().top;
      container.scrollTop += elTop - cTop - 12;
    } else {
      container.scrollTop = container.scrollHeight;
    }
  }, [history]);

  const processCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase().replace(/^\/+/, "");

    if (trimmed === "clear") {
      setHistory([{ type: "system", text: "Terminal cleared." }]);
      return;
    }

    if (trimmed === "career") {
      setHistory((h) => [...h, { type: "input", text: cmd }, { type: "output", text: buildCareerOutput() }]);
      return;
    }

    if (trimmed === "projects") {
      setHistory((h) => [...h, { type: "input", text: cmd }, { type: "output", text: buildProjectsOutput() }]);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    processCommand(input);
    setInput("");
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
      <div className="xl:col-span-3">
        <div
          className="rounded-xl overflow-hidden flex flex-col shadow-lg"
          style={{ backgroundColor: "#0F0F0F", border: "1px solid #1E1E1E", height: "580px" }}
        >
          <div
            className="flex items-center gap-2 px-4 py-2.5 flex-shrink-0"
            style={{ borderBottom: "1px solid #1E1E1E", backgroundColor: "#141414" }}
          >
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#ff5f57" }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#febc2e" }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#28c840" }} />
            </div>
            <span className="font-mono text-xs ml-2" style={{ color: "#555" }}>
              manu@portfolio ~ %
            </span>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-5 font-mono text-sm leading-relaxed"
            style={{ color: "#E0E0E0", overscrollBehavior: "contain" }}
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((item, i) => (
              <div key={i} ref={(el) => (itemRefs.current[i] = el)} className="mb-3">
                {item.type === "input" && (
                  <div>
                    <span style={{ color: "#5E9E7E" }}>➜ </span>
                    <span style={{ color: "#D4B64E" }}>{item.text}</span>
                  </div>
                )}
                {item.type === "output" && (
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed" style={{ color: "#E0E0E0" }}>
                    {item.text}
                  </pre>
                )}
                {item.type === "system" && <div style={{ color: "#888" }}>{item.text}</div>}
                {item.type === "error" && <div style={{ color: "#e05050" }}>{item.text}</div>}
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center px-5 py-3 flex-shrink-0"
            style={{ borderTop: "1px solid #1E1E1E" }}
          >
            <span className="font-mono text-sm mr-2" style={{ color: "#5E9E7E" }}>
              ➜
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none font-mono text-sm"
              style={{ color: "#fff", caretColor: "#D4B64E" }}
              placeholder="type a command..."
            />
          </form>
        </div>
      </div>

      <div className="xl:col-span-1">
        <div className="rounded-xl p-6 h-full flex flex-col gap-4 bg-white border border-[#E8E8E8]">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#AAA]">Quick commands</p>
          <div className="flex flex-wrap gap-2">
            {QUICK_COMMANDS.map((cmd) => (
              <button
                key={cmd}
                onClick={() => processCommand(cmd)}
                className="font-mono text-xs px-3 py-2 rounded-lg border transition-all duration-200 cursor-pointer border-[#E8E8E8] text-[#444] bg-white hover:border-[#B8922A] hover:text-[#B8922A]"
              >
                /{cmd}
              </button>
            ))}
          </div>
          <div className="mt-auto pt-4 border-t border-[#E8E8E8]">
            <p className="text-xs leading-relaxed text-[#AAA]">
              Type commands in the terminal or click the buttons above. Try{" "}
              <span style={{ color: "#B8922A", fontFamily: "monospace" }}>/origin</span> for the full story.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
