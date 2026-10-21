import type { Metadata } from "next";
import BackLink from "@/components/BackLink";
import SiteFooter from "@/components/SiteFooter";
import CampaignGallery from "@/components/CampaignGallery";
import CampaignYouTubeHeader from "@/components/CampaignYouTubeHeader";
import "@/styles/pages/BapeCommercial.css";

export const metadata: Metadata = {
  title: "Hyperoptimized Engineer 2026 — The Vision Frog Productions",
};

const BASE = "/assets/images/Commercial/HYPEROPTIMIZED ENGINEER 2026";

const images = [
  { src: `${BASE}/web/WhatsApp Image 2026-10-21 at 21.18.39.jpg`, alt: "Hyperoptimized Engineer 2026" },
  { src: `${BASE}/web/WhatsApp Image 2026-10-21 at 21.18.39(1).jpg`, alt: "Hyperoptimized Engineer 2026" },
  { src: `${BASE}/web/WhatsApp Image 2026-10-21 at 21.18.39(2).jpg`, alt: "Hyperoptimized Engineer 2026" },
  { src: `${BASE}/web/WhatsApp Image 2026-10-21 at 21.18.39(3).jpg`, alt: "Hyperoptimized Engineer 2026" },
  { src: `${BASE}/web/WhatsApp Image 2026-10-21 at 21.18.39(4).jpg`, alt: "Hyperoptimized Engineer 2026" },
  { src: `${BASE}/web/WhatsApp Image 2026-10-21 at 21.18.39(5).jpg`, alt: "Hyperoptimized Engineer 2026" },
  { src: `${BASE}/web/WhatsApp Image 2026-10-21 at 21.18.39(6).jpg`, alt: "Hyperoptimized Engineer 2026" },
  { src: `${BASE}/web/WhatsApp Image 2026-10-21 at 21.18.40.jpg`, alt: "Hyperoptimized Engineer 2026" },
  { src: `${BASE}/web/WhatsApp Image 2026-10-21 at 21.18.47.jpg`, alt: "Hyperoptimized Engineer 2026" },
];

export default function HyperoptimizedEngineerPage() {
  return (
    <div className="vf-site bape-page">
      <BackLink href="/Commercials/Creators" fixed />

      <CampaignYouTubeHeader videoId="MhEL9cvLxQE" playerId="yt-hyperoptimized-player" />

      <main className="bape-body">
        <header className="bape-header">
          <span className="bape-header__eyebrow">Creators</span>
          <h1 className="bape-header__title">Hyperoptimized Engineer 2026</h1>
          <p className="bape-header__sub">Produced for Kai Lentit — out on YouTube.</p>
        </header>

        <CampaignGallery images={images} />
      </main>

      <SiteFooter />
    </div>
  );
}
