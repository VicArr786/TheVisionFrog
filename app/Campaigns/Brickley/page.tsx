import type { Metadata } from "next";
import BackLink from "@/components/BackLink";
import SiteFooter from "@/components/SiteFooter";
import CampaignVideoHeader from "@/components/CampaignVideoHeader";
import "@/styles/pages/BapeCommercial.css";

export const metadata: Metadata = {
  title: "Brickley — Race to Evolve — The Vision Frog Productions",
};

const credits = [
  { role: "Directed + Produced by", name: "Seb Carrillo + Oliver Stemmler" },
  { role: "Shot + Edited by", name: "Seb Carrillo" },
  { role: "Gaffer", name: "Kevin Tang" },
];

/* stills to come: add a CampaignGallery under the header, and `count` in lib/commercials.ts */
export default function BrickleyPage() {
  return (
    <div className="vf-site bape-page">
      <BackLink href="/Campaigns/Brands" fixed />

      <CampaignVideoHeader src="/assets/videos/Campaigns/261105_Brickley_Race_To_Evolve_Insta_Cut_V3.mp4" />

      <main className="bape-body">
        <header className="bape-header">
          <span className="bape-header__eyebrow">Commercial</span>
          <h1 className="bape-header__title">Brickley - Race to Evolve</h1>
        </header>

        <dl className="bape-credits">
          {credits.map((c) => (
            <div key={c.role}>
              <dt>{c.role}</dt>
              <dd>{c.name}</dd>
            </div>
          ))}
        </dl>
      </main>

      <SiteFooter />
    </div>
  );
}
