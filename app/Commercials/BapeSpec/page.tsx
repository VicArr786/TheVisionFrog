import type { Metadata } from "next";
import BackLink from "@/components/BackLink";
import SiteFooter from "@/components/SiteFooter";
import CampaignGallery from "@/components/CampaignGallery";
import CampaignYouTubeHeader from "@/components/CampaignYouTubeHeader";
import "@/styles/pages/BapeCommercial.css";

export const metadata: Metadata = {
  title: "BAPE × Def Jam Spec — The Vision Frog Productions",
};

const BASE = "/assets/images/Commercial/BAPE X DEF JAM SPEC";

const images = [
  { src: `${BASE}/web/stills oliver_1.5.1.jpg`, alt: "BAPE × Def Jam Spec" },
  { src: `${BASE}/web/stills oliver_1.8.1.jpg`, alt: "BAPE × Def Jam Spec" },
  { src: `${BASE}/web/stills oliver_1.10.1.jpg`, alt: "BAPE × Def Jam Spec" },
  { src: `${BASE}/web/stills oliver_1.13.1 2.jpg`, alt: "BAPE × Def Jam Spec" },
  { src: `${BASE}/web/stills oliver_1.17.1.jpg`, alt: "BAPE × Def Jam Spec" },
  { src: `${BASE}/web/stills oliver_1.31.1.jpg`, alt: "BAPE × Def Jam Spec" },
  { src: `${BASE}/web/stills oliver_1.37.1.jpg`, alt: "BAPE × Def Jam Spec" },
  { src: `${BASE}/web/stills oliver_1.37.2.jpg`, alt: "BAPE × Def Jam Spec" },
  { src: `${BASE}/web/stills oliver_1.40.1 2.jpg`, alt: "BAPE × Def Jam Spec" },
];

export default function BapeSpecPage() {
  return (
    <div className="vf-site bape-page">
      <BackLink href="/Commercials" fixed />

      <CampaignYouTubeHeader videoId="BN9bn9N3Auk" playerId="yt-bapespec-player" />

      <main className="bape-body">
        <header className="bape-header">
          <span className="bape-header__eyebrow">Commercial</span>
          <h1 className="bape-header__title">BAPE × Def Jam — Spec</h1>
          <p className="bape-header__sub">Spec commercial for BAPE × Def Jam.</p>
        </header>

        <CampaignGallery images={images} />
      </main>

      <SiteFooter />
    </div>
  );
}
