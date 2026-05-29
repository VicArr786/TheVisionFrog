"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("idle");

    const form = e.currentTarget;
    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        form.reset();
        setStatus("ok");
      } else {
        setStatus("err");
      }
    } catch {
      setStatus("err");
    }
  };

  return (
    <form
      className="contact-form"
      action="https://formspree.io/f/xykkdobz"
      method="POST"
      onSubmit={onSubmit}
    >
      <div className="contact-row">
        <label>
          Name
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          Email
          <input type="email" name="email" autoComplete="email" required />
        </label>
      </div>

      <label>
        What are you reaching out about?
        <select name="topic" required defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          <option>Music Video</option>
          <option>Narrative / Short</option>
          <option>Commercial / Brand</option>
          <option>Portrait / Photo</option>
          <option>Other</option>
        </select>
      </label>

      <label>
        Message
        <textarea
          name="message"
          required
          placeholder="Give a quick overview + timeline + budget range."
        />
      </label>

      <input type="hidden" name="_subject" value="Vision Frog — New Contact Form Submission" />
      <input
        type="text"
        name="_gotcha"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      <button className="btn-primary btn-primary--solid" type="submit">
        Send
      </button>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "0.5rem 0 0" }}>
        By sending, you agree we can reply to the email provided.
      </p>

      <div
        className={`contact-status contact-status--ok${status === "ok" ? " contact-status--show" : ""}`}
      >
        Sent — we&apos;ll get back to you soon.
      </div>
      <div
        className={`contact-status contact-status--err${status === "err" ? " contact-status--show" : ""}`}
      >
        Something went wrong. Please try again, or email us directly.
      </div>
    </form>
  );
}
