import type { Metadata } from "next";
import BackLink from "@/components/BackLink";
import SiteFooter from "@/components/SiteFooter";
import CampaignGallery from "@/components/CampaignGallery";
import "@/styles/pages/BapeCommercial.css";

export const metadata: Metadata = {
  title: "AM Vibes — Gems EP Trailer — The Vision Frog Productions",
};

const BASE = "/assets/images/Commercial/AM VIBES - EP TRAILER GEMS ON YOUTUBE";

const images = [
  { src: `${BASE}/Still 2026-05-12 002348_1.10.2.JPG`, alt: "AM Vibes — Gems EP Trailer" },
  { src: `${BASE}/Still 2026-05-12 002348_1.10.3.JPG`, alt: "AM Vibes — Gems EP Trailer" },
  { src: `${BASE}/Still 2026-05-12 002348_2.4.1.JPG`, alt: "AM Vibes — Gems EP Trailer" },
  { src: `${BASE}/Still 2026-05-12 002348_3.1.1.JPG`, alt: "AM Vibes — Gems EP Trailer" },
  { src: `${BASE}/Still 2026-05-12 002348_3.1.2.JPG`, alt: "AM Vibes — Gems EP Trailer" },
];

export default function AmVibesPage() {
  return (
    <div className="vf-site bape-page">
      <BackLink href="/Commercials" fixed />

      <main className="bape-body bape-body--no-video">
        <header className="bape-header">
          <span className="bape-header__eyebrow">Commercial</span>
          <h1 className="bape-header__title">AM Vibes — &ldquo;Gems&rdquo; EP Trailer</h1>
          <p className="bape-header__sub">EP trailer for AM Vibes&apos; &ldquo;Gems&rdquo; — out on YouTube.</p>
        </header>

        <CampaignGallery images={images} />
      </main>

      <SiteFooter />
    </div>
  );
}
