import type { Metadata } from "next";
import BackLink from "@/components/BackLink";
import SiteFooter from "@/components/SiteFooter";
import CampaignGallery from "@/components/CampaignGallery";
import "@/styles/pages/BapeCommercial.css";

export const metadata: Metadata = {
  title: "Taco Bell — Decades Menu — The Vision Frog Productions",
};

const BASE = "/assets/images/Commercial/TacoBell";

const images = [
  { src: `${BASE}/web/793258298_17939873535345386_3953360796027995563_n.jpg`, alt: "Taco Bell - Decades Menu" },
  { src: `${BASE}/web/793721105_17939873415345386_739159924419964849_n.jpg`, alt: "Taco Bell - Decades Menu" },
  { src: `${BASE}/web/792407079_17939873445345386_3079786022681581852_n.jpg`, alt: "Taco Bell - Decades Menu" },
  { src: `${BASE}/web/790945619_17939873403345386_342039777313723042_n.jpg`, alt: "Taco Bell - Decades Menu" },
  { src: `${BASE}/web/791960550_17939873358345386_1575354624257264098_n.jpg`, alt: "Taco Bell - Decades Menu" },
  { src: `${BASE}/web/792911015_17939873484345386_3339359280395177232_n.jpg`, alt: "Taco Bell - Decades Menu" },
  { src: `${BASE}/web/791045418_17939873475345386_2210440432279049693_n.jpg`, alt: "Taco Bell - Decades Menu" },
  { src: `${BASE}/web/791246970_17939873460345386_9136620607325295309_n.jpg`, alt: "Taco Bell - Decades Menu" },
  { src: `${BASE}/web/791820634_17939873502345386_2744470995816201737_n.jpg`, alt: "Taco Bell - Decades Menu" },
  { src: `${BASE}/web/794295146_17939873493345386_2032134919474963398_n.jpg`, alt: "Taco Bell - Decades Menu" },
];

export default function TacoBellPage() {
  return (
    <div className="vf-site bape-page">
      <BackLink href="/Commercials/Brands" fixed />

      <main className="bape-body bape-body--no-video">
        <header className="bape-header">
          <span className="bape-header__eyebrow">Commercial</span>
          <h1 className="bape-header__title">Taco Bell - Decades Menu</h1>
          <p className="bape-header__sub">A crew of friends takes over Taco Bell for the Decades Menu.</p>
        </header>

        <CampaignGallery images={images} />
      </main>

      <SiteFooter />
    </div>
  );
}
