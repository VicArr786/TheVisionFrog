import type { Metadata } from "next";
import BackLink from "@/components/BackLink";
import SiteFooter from "@/components/SiteFooter";
import CampaignGallery from "@/components/CampaignGallery";
import CampaignYouTubeHeader from "@/components/CampaignYouTubeHeader";
import "@/styles/pages/BapeCommercial.css";

export const metadata: Metadata = {
  title: "AM Vibes — Gems EP Trailer — The Vision Frog Productions",
};

const BASE = "/assets/images/Commercial/AM VIBES - EP TRAILER GEMS ON YOUTUBE";

const images = [
  { src: `${BASE}/web/Still 2026-05-12 002348_1.10.2.jpg`, alt: "AM Vibes — Gems EP Trailer" },
  { src: `${BASE}/web/Still 2026-05-12 002348_1.10.3.jpg`, alt: "AM Vibes — Gems EP Trailer" },
  { src: `${BASE}/web/Still 2026-05-12 002348_2.4.1.jpg`, alt: "AM Vibes — Gems EP Trailer" },
  { src: `${BASE}/web/Still 2026-05-12 002348_3.1.1.jpg`, alt: "AM Vibes — Gems EP Trailer" },
  { src: `${BASE}/web/Still 2026-05-12 002348_3.1.2.jpg`, alt: "AM Vibes — Gems EP Trailer" },
];

export default function AmVibesPage() {
  return (
    <div className="vf-site bape-page">
      <BackLink href="/Commercials" fixed />

      <CampaignYouTubeHeader videoId="NFflMSXJ7Zg" playerId="yt-amvibes-player" />

      <main className="bape-body">
        <header className="bape-header">
          <span className="bape-header__eyebrow">Commercial</span>
          <h1 className="bape-header__title">AM Vibes - &ldquo;Gems&rdquo; EP Trailer</h1>
          <p className="bape-header__sub">EP trailer for AM Vibes&apos; &ldquo;Gems&rdquo; — out on YouTube.</p>
        </header>

        <CampaignGallery images={images} />
      </main>

      <SiteFooter />
    </div>
  );
}
