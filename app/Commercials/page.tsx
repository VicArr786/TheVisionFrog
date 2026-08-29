import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/layout/PageLayout";
import "@/styles/pages/Commercials.css";

export const metadata: Metadata = {
  title: "Commercials — The Vision Frog Productions",
};

const campaigns = [
  {
    slug: "Bape",
    label: "Fredro Starr × BAPE",
    count: 8,
    cover: "/assets/images/commercials/Fredro 4.JPG",
  },
  {
    slug: "BapeSpec",
    label: "BAPE × Def Jam — Spec",
    count: 9,
    cover: "/assets/images/Commercial/BAPE X DEF JAM SPEC/web/stills oliver_1.8.1.jpg",
  },
  {
    slug: "NyuV100",
    label: "NYU V100 Trailer",
    count: 4,
    cover: "/assets/images/Commercial/NYU V100 TRAILER/web/Screenshot 2026-05-29 at 13.56.52.jpg",
  },
  {
    slug: "AmVibes",
    label: "AM Vibes — “Gems” EP Trailer",
    count: 5,
    cover: "/assets/images/Commercial/AM VIBES - EP TRAILER GEMS ON YOUTUBE/Still 2026-05-12 002348_3.1.1.JPG",
  },
];

export default function CommercialsPage() {
  return (
    <PageLayout
      className="commercials-page"
      backHref="/"
      header={{
        eyebrow: "Portfolio",
        title: "Commercials",
        subtitle: "Brand campaigns, collaborations, and commercial shoots.",
      }}
    >
      <section className="campaigns-grid">
        {campaigns.map((c) => (
          <Link
            key={c.slug}
            href={`/Commercials/${c.slug}`}
            className="campaign-card"
            style={{ backgroundImage: `url('${c.cover}')` }}
          >
            <div className="campaign-card__overlay" />
            <div className="campaign-card__info">
              <span className="campaign-card__label">{c.label}</span>
              <span className="campaign-card__count">{c.count} images</span>
            </div>
          </Link>
        ))}
      </section>
    </PageLayout>
  );
}
