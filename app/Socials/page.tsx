import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/layout/PageLayout";
import { SOCIAL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Social Media — VisionFrog",
};

export default function SocialsPage() {
  return (
    <PageLayout
      className="socials-page"
      backHref="/"
      header={{
        eyebrow: "Connect",
        title: "Follow Us",
        subtitle: "Stay connected with Vision Frog Productions on all platforms.",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.25rem",
          justifyContent: "center",
        }}
      >
        <Link
          href={SOCIAL.instagram}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.75rem",
            width: 200,
            padding: "1.5rem",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            background: "var(--surface)",
            textDecoration: "none",
            transition: "border-color var(--transition), transform var(--transition)",
          }}
        >
          <img src="/assets/images/social/InstaGreen.png" alt="" width={80} height={80} />
          Instagram
        </Link>
        <Link
          href={SOCIAL.youtube}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.75rem",
            width: 200,
            padding: "1.5rem",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            background: "var(--surface)",
            textDecoration: "none",
          }}
        >
          <img src="/assets/images/social/YTGreen.png" alt="" width={80} height={80} />
          YouTube
        </Link>
      </div>
    </PageLayout>
  );
}
