import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import { SOCIAL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work In Progress — The Vision Frog",
};

export default function WorkInProgressPage() {
  return (
    <PageLayout
      backHref="/"
      header={{
        eyebrow: "Coming soon",
        title: "Work In Progress",
        subtitle: "Reach out for bookings, collaborations, or inquiries.",
      }}
    >
      <div
        className="contact-card"
        style={{
          maxWidth: 560,
          margin: "0 auto",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-md)",
          padding: "1.5rem",
        }}
      >
        <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: 2 }}>
          <li>
            Email:{" "}
            <a href={SOCIAL.email} style={{ color: "var(--accent-soft)" }}>
              thevisionfrog@gmail.com
            </a>
          </li>
          <li>
            Instagram:{" "}
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--accent-soft)" }}
            >
              @thevisionfrog
            </a>
          </li>
        </ul>
      </div>
    </PageLayout>
  );
}
