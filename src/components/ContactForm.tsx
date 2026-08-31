import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { contactConfig } from "../data/content";

const inputStyle: React.CSSProperties = {
  backgroundColor: "#F5F5F5",
  border: "1px solid #E8E8E8",
  color: "#1A1A1A",
  width: "100%",
  fontSize: "0.85rem",
  padding: "0.6rem 0.8rem",
  borderRadius: "0.5rem",
  outline: "none",
  fontFamily: "inherit",
  transition: "border-color 0.2s",
};

export default function ContactForm() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
        className="flex-1 flex items-center justify-center rounded-lg p-4 text-center text-sm"
        style={{ border: "1px solid #E8E8E8", color: "#444" }}
      >
        Message received.
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-2.5 flex-1">
      <input type="text" name="from_name" required placeholder="Name" style={inputStyle} />
      <input type="email" name="user_email" required placeholder="Email" style={inputStyle} />
      <textarea name="message" required rows={3} placeholder="Message" style={{ ...inputStyle, resize: "none" }} />
      <button
        type="submit"
        disabled={formState === "sending"}
        className="flex items-center justify-center gap-2 text-sm font-medium py-2.5 rounded-lg transition-all disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed mt-1"
        style={{ backgroundColor: "#1A1A1A", color: "#FFFFFF" }}
      >
        {formState === "sending" ? "Sending…" : "Send"}
      </button>
      {formState === "error" && (
        <p className="text-xs text-red-500">Something went wrong — email me directly instead.</p>
      )}
    </form>
  );
}
