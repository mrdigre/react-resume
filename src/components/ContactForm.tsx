import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { contactConfig } from "../data/content";

const inputStyle: React.CSSProperties = {
  backgroundColor: "var(--bg-panel)",
  border: "1px solid var(--border)",
  color: "var(--fg)",
  width: "100%",
  fontSize: "0.85rem",
  fontFamily: "var(--font-mono)",
  padding: "0.6rem 0.8rem",
  outline: "none",
  transition: "border-color 0.2s",
};

export default function ContactForm() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("sending");
    emailjs
      .sendForm(
        contactConfig.YOUR_SERVICE_ID,
        contactConfig.YOUR_TEMPLATE_ID,
        e.currentTarget,
        contactConfig.YOUR_USER_ID
      )
      .then(() => {
        setFormState("sent");
        formRef.current?.reset();
      })
      .catch(() => setFormState("error"));
  };

  if (formState === "sent") {
    return (
      <div
        className="flex items-center justify-center p-4 text-center text-sm font-mono"
        style={{ border: "1px solid var(--border)", color: "var(--fg-muted)" }}
      >
        Message received. I'll get back to you soon.
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-2.5">
      <input type="text" name="from_name" required placeholder="Name" aria-label="Name" style={inputStyle} />
      <input type="email" name="user_email" required placeholder="Email" aria-label="Email" style={inputStyle} />
      <textarea
        name="message"
        required
        rows={3}
        placeholder="Message"
        aria-label="Message"
        style={{ ...inputStyle, resize: "none" }}
      />
      <button
        type="submit"
        disabled={formState === "sending"}
        className="flex items-center justify-center gap-2 font-mono text-xs font-medium py-2.5 transition-all disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed mt-1"
        style={{ backgroundColor: "var(--accent)", color: "var(--bg-panel)" }}
      >
        {formState === "sending" ? "Sending…" : "Send"}
      </button>
      {formState === "error" && (
        <p className="text-xs" style={{ color: "#e88" }}>
          Something went wrong — email me directly instead.
        </p>
      )}
    </form>
  );
}
