import type { Metadata } from "next";
import BackLink from "@/components/BackLink";
import SiteFooter from "@/components/SiteFooter";
import CampaignVideoHeader from "@/components/CampaignVideoHeader";
import CampaignGallery from "@/components/CampaignGallery";
import "@/styles/pages/BapeCommercial.css";

export const metadata: Metadata = {
  title: "Reebok x NBA Draft '26 — The Vision Frog Productions",
};

const BASE = "/assets/images/Commercial/REEBOK X NBA DRAFT 26";

const images = [
  { src: `${BASE}/web/still_4.jpg`, alt: "Reebok x NBA Draft '26" },
  { src: `${BASE}/web/still_14.jpg`, alt: "Reebok x NBA Draft '26" },
  { src: `${BASE}/web/still_26.jpg`, alt: "Reebok x NBA Draft '26" },
  { src: `${BASE}/web/still_38.jpg`, alt: "Reebok x NBA Draft '26" },
];

export default function ReebokDraftPage() {
  return (
    <div className="vf-site bape-page">
      <BackLink href="/Commercials/Brands" fixed />

      <CampaignVideoHeader src={`${BASE}/web/reebok_draft.mp4`} vertical />

      <main className="bape-body">
        <header className="bape-header">
          <span className="bape-header__eyebrow">Commercial</span>
          <h1 className="bape-header__title">Reebok x NBA Draft &apos;26</h1>
          <p className="bape-header__sub">
            Draft night recap following NBA draftee Darius Acuff Jr. Shot and edited by Oliver Stemmler.
          </p>
        </header>

        <CampaignGallery images={images} />
      </main>

      <SiteFooter />
    </div>
  );
}
