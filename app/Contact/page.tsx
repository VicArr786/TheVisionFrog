import type { Metadata } from "next";
import NavLayout from "@/components/layout/NavLayout";
import ContactForm from "@/components/ContactForm";
import { SOCIAL } from "@/lib/site";
import "@/styles/contact.css";

export const metadata: Metadata = {
  title: "Contact — The Vision Frog Productions",
};

export default function ContactPage() {
  return (
    <NavLayout
      banner={
        <header className="vf-banner">
          <div className="vf-banner__inner">
            <h1 className="vf-banner__title">Contact</h1>
            <p className="vf-banner__sub">
              Tell us what you&apos;re building. We&apos;ll get back to you as soon as possible.
            </p>
          </div>
        </header>
      }
    >
      <div className="contact-page">
        <div className="contact-grid">
          <section className="contact-card">
            <h2>Send a message</h2>
            <ContactForm />
          </section>

          <aside className="contact-card">
            <h2>Direct</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>
              Prefer email or DM? Use these:
            </p>
            <div style={{ display: "grid", gap: "0.75rem" }}>
              <div className="contact-pill">
                <small>Email</small>
                <a href={SOCIAL.email}>thevisionfrog@gmail.com</a>
              </div>
              <div className="contact-pill">
                <small>Instagram</small>
                <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer">
                  @thevisionfrog
                </a>
              </div>
              <div className="contact-pill">
                <small>YouTube</small>
                <a href={SOCIAL.youtube} target="_blank" rel="noopener noreferrer">
                  @TheVisionFrog
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </NavLayout>
  );
}
