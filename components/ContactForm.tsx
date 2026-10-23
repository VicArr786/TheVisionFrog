"use client";

import { FormEvent, useState } from "react";

const TOPICS = ["Music Video", "Narrative / Short", "Commercial / Brand", "Portrait / Photo", "Other"];

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

      <fieldset className="contact-topics">
        <legend>What are you reaching out about?</legend>
        <div className="contact-topics__opts">
          {TOPICS.map((t) => (
            <label key={t} className="contact-topic">
              <input type="radio" name="topic" value={t} required />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </fieldset>

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

      <div className="contact-submit">
        <button className="btn-primary btn-primary--solid" type="submit">
          Send
        </button>
        <p>By sending, you agree we can reply to the email provided.</p>
      </div>

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
