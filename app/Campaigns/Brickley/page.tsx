import type { Metadata } from "next";
import BackLink from "@/components/BackLink";
import SiteFooter from "@/components/SiteFooter";
import CampaignVideoHeader from "@/components/CampaignVideoHeader";
import CampaignGallery from "@/components/CampaignGallery";
import Redirect from "@/components/Redirect";
import { campaigns } from "@/lib/commercials";
import "@/styles/pages/BapeCommercial.css";

export const metadata: Metadata = {
  title: "Chris Brickley x Puma — Race to Evolve — The Vision Frog Productions",
  robots: { index: false },
};

const credits = [
  { role: "Directed + Produced by", name: "Seb Carrillo + Oliver Stemmler" },
  { role: "Shot + Edited by", name: "Seb Carrillo" },
  { role: "Gaffer", name: "Kevin Tang" },
];

const BASE = "/assets/images/commercials/Brikley/web";
const ALT = "Chris Brickley x Puma - Race to Evolve";

// Screenshot_2026-11-07_at_15-12-23_261o.png is a duplicate of 15-12-23 — left out
const images = [
  "Screenshot_2026-11-07_at_15-12-37_261105_Brickley_Race_To_Evolv",
  "Screenshot_2026-11-07_at_15-12-23",
  "Screenshot_2026-11-07_at_15-12-47_261105_Brickley_Rac",
  "Screenshot_2026-11-07_at_15-13-59_261105_Brickley_Race_To__Race_To_Evolve_Insta_Cut_V3.mp4_-_Frame.io",
  "Screenshot_2026-11-07_at_15-13-17_261105",
  "Screenshot_2026-11-07_at_o",
  "Screenshot_2026-11-07",
  "Screenshot_2026-11-07_at_15-14-06_05_Brickley_Race_To_Evolve_Insta_Cut_V3.mp4_-_Frame.io",
  "Screenshot_2026-11-07_at_15-14-12_2_-_Frame.io",
  "Screenshot_2026-11-07_at_15-1",
  "Screenshot_2026-11-ickley_Race_To_Evolve_Insta_Cut_V3.mp4_-_Frame.io",
].map((name) => ({ src: `${BASE}/${name}.jpg`, alt: ALT }));

export default function BrickleyPage() {
  if (campaigns.find((c) => c.slug === "Brickley")?.hidden) return <Redirect to="/Campaigns/Brands" />;

  return (
    <div className="vf-site bape-page">
      <BackLink href="/Campaigns/Brands" fixed />

      <CampaignVideoHeader src="/assets/videos/Campaigns/261105_Brickley_Race_To_Evolve_Insta_Cut_V3.mp4" />

      <main className="bape-body">
        <header className="bape-header">
          <span className="bape-header__eyebrow">Commercial</span>
          <h1 className="bape-header__title">Chris Brickley x Puma - Race to Evolve</h1>
        </header>

        <dl className="bape-credits">
          {credits.map((c) => (
            <div key={c.role}>
              <dt>{c.role}</dt>
              <dd>{c.name}</dd>
            </div>
          ))}
        </dl>

        <CampaignGallery images={images} />
      </main>

      <SiteFooter />
    </div>
  );
}
