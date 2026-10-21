import type { Metadata } from "next";
import BackLink from "@/components/BackLink";
import SiteFooter from "@/components/SiteFooter";
import CampaignGallery from "@/components/CampaignGallery";
import "@/styles/pages/BapeCommercial.css";

export const metadata: Metadata = {
  title: "Bunch of Friends — Class in Session — The Vision Frog Productions",
};

const BASE = "/assets/images/Commercial/Bunch Of friends call in session";

// 21.09.24(4) is an Instagram screenshot of (2) — left out
const images = [
  { src: `${BASE}/web/WhatsApp Image 2026-10-21 at 21.09.24(2).jpg`, alt: "Bunch of Friends - Class in Session" },
  { src: `${BASE}/web/WhatsApp Image 2026-10-21 at 21.09.24.jpg`, alt: "Bunch of Friends - Class in Session" },
  { src: `${BASE}/web/WhatsApp Image 2026-10-21 at 21.09.24(1).jpg`, alt: "Bunch of Friends - Class in Session" },
  { src: `${BASE}/web/WhatsApp Image 2026-10-21 at 21.09.24(3).jpg`, alt: "Bunch of Friends - Class in Session" },
];

export default function ClassInSessionPage() {
  return (
    <div className="vf-site bape-page">
      <BackLink href="/Commercials/Creators" fixed />

      <main className="bape-body bape-body--no-video">
        <header className="bape-header">
          <span className="bape-header__eyebrow">Creators</span>
          <h1 className="bape-header__title">Bunch of Friends - Class in Session</h1>
          <p className="bape-header__sub">Back to school with The Bunch of Friends.</p>
        </header>

        <CampaignGallery images={images} />
      </main>

      <SiteFooter />
    </div>
  );
}
