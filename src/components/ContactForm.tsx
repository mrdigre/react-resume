import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { contactConfig } from "../data/contactConfig";
import type { ContactFormLabels } from "../i18n/types";

interface Props {
  labels: ContactFormLabels;
}

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

export default function ContactForm({ labels }: Props) {
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
        {labels.success}
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-2.5">
      <input type="text" name="from_name" required placeholder={labels.name} aria-label={labels.name} style={inputStyle} />
      <input type="email" name="user_email" required placeholder={labels.email} aria-label={labels.email} style={inputStyle} />
      <textarea
        name="message"
        required
        rows={3}
        placeholder={labels.message}
        aria-label={labels.message}
        style={{ ...inputStyle, resize: "none" }}
      />
      <button
        type="submit"
        disabled={formState === "sending"}
        className="flex items-center justify-center gap-2 font-mono text-xs font-medium py-2.5 transition-all disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed mt-1"
        style={{ backgroundColor: "var(--accent)", color: "var(--bg-panel)" }}
      >
        {formState === "sending" ? labels.sending : labels.send}
      </button>
      {formState === "error" && (
        <p className="text-xs" style={{ color: "#e88" }}>
          {labels.error}
        </p>
      )}
    </form>
  );
}
