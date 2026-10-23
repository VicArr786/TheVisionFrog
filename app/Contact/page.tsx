import type { Metadata } from "next";
import NavLayout from "@/components/layout/NavLayout";
import ContactForm from "@/components/ContactForm";
import { SOCIAL } from "@/lib/site";
import "@/styles/contact.css";

export const metadata: Metadata = {
  title: "Contact — The Vision Frog Productions",
};

const direct = [
  { label: "Email", value: "thevisionfrog@gmail.com", href: SOCIAL.email },
  { label: "Instagram", value: "@thevisionfrog", href: SOCIAL.instagram, external: true },
  { label: "YouTube", value: "@TheVisionFrog", href: SOCIAL.youtube, external: true },
];

/* hero → form beside direct links, styled like the project pages */
export default function ContactPage() {
  return (
    <NavLayout
      banner={
        <header className="contact-hero">
          <div className="contact-hero__overlay" />
          <div className="contact-hero__content">
            <span className="contact-hero__tag">Contact</span>
            <h1 className="contact-hero__title">Start a project</h1>
            <p className="contact-hero__sub">
              Tell us what you&apos;re building. We&apos;ll get back to you as soon as possible.
            </p>
          </div>
        </header>
      }
    >
      <div className="contact-page">
        <section className="contact-section contact-section--form">
          <h2 className="contact-section__title">Send a message</h2>
          <ContactForm />
        </section>

        <aside className="contact-section">
          <h2 className="contact-section__title">Direct</h2>
          <ul className="contact-direct" role="list">
            {direct.map((d) => (
              <li key={d.label}>
                <a
                  className="contact-direct__row"
                  href={d.href}
                  {...(d.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <span className="contact-direct__label">{d.label}</span>
                  <span className="contact-direct__value">
                    {d.value} <span aria-hidden="true">↗</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </NavLayout>
  );
}
