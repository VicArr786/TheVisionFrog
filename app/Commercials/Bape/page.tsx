import type { Metadata } from "next";
import BackLink from "@/components/BackLink";
import SiteFooter from "@/components/SiteFooter";
import BapeVideoHeader from "@/components/BapeVideoHeader";
import BapeGallery from "@/components/BapeGallery";
import "@/styles/pages/BapeCommercial.css";

export const metadata: Metadata = {
  title: "Fredro Starr × BAPE — The Vision Frog Productions",
};

export default function BapePage() {
  return (
    <div className="vf-site bape-page">
      <BackLink href="/Commercials" fixed />

      <BapeVideoHeader />

      <main className="bape-body">
        <header className="bape-header">
          <span className="bape-header__eyebrow">Commercial</span>
          <h1 className="bape-header__title">Fredro Starr × BAPE</h1>
          <p className="bape-header__sub">Shot for BAPE featuring Fredro Starr.</p>
        </header>

        <BapeGallery />
      </main>

      <SiteFooter />
    </div>
  );
}
