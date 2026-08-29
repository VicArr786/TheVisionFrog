import type { Metadata } from "next";
import BackLink from "@/components/BackLink";
import SiteFooter from "@/components/SiteFooter";
import CampaignVideoHeader from "@/components/CampaignVideoHeader";
import CampaignGallery from "@/components/CampaignGallery";
import "@/styles/pages/BapeCommercial.css";

export const metadata: Metadata = {
  title: "NYU V100 Trailer — The Vision Frog Productions",
};

const BASE = "/assets/images/Commercial/NYU V100 TRAILER";

const images = [
  { src: `${BASE}/web/Screenshot 2026-05-29 at 13.56.52.jpg`, alt: "NYU V100 Trailer" },
  { src: `${BASE}/web/Screenshot 2026-05-29 at 13.57.10.jpg`, alt: "NYU V100 Trailer" },
  { src: `${BASE}/web/Screenshot 2026-05-29 at 13.57.26.jpg`, alt: "NYU V100 Trailer" },
  { src: `${BASE}/web/Screenshot 2026-05-29 at 13.58.21.jpg`, alt: "NYU V100 Trailer" },
];

export default function NyuV100Page() {
  return (
    <div className="vf-site bape-page">
      <BackLink href="/Commercials" fixed />

      <CampaignVideoHeader src={`${BASE}/v100_trailer_web.mp4`} />

      <main className="bape-body">
        <header className="bape-header">
          <span className="bape-header__eyebrow">Commercial</span>
          <h1 className="bape-header__title">NYU V100 Trailer</h1>
          <p className="bape-header__sub">Official trailer produced for NYU&apos;s V100.</p>
        </header>

        <CampaignGallery images={images} />
      </main>

      <SiteFooter />
    </div>
  );
}
