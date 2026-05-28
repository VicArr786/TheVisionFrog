import type { Metadata } from "next";
import BackLink from "@/components/BackLink";
import SiteFooter from "@/components/SiteFooter";
import BapeVideoHeader from "@/components/BapeVideoHeader";
import "@/styles/pages/BapeCommercial.css";

export const metadata: Metadata = {
  title: "Fredro Starr × BAPE — The Vision Frog Productions",
};

const images = [
  { src: "/assets/images/commercials/Fredro 4.JPG",                              alt: "Fredro Starr × BAPE" },
  { src: "/assets/images/commercials/Fredro 12.jpg",                             alt: "Fredro Starr × BAPE" },
  { src: "/assets/images/commercials/FRedro starr 7.jpg",                        alt: "Fredro Starr × BAPE" },
  { src: "/assets/images/commercials/FRedro starr 8.jpg",                        alt: "Fredro Starr × BAPE" },
  { src: "/assets/images/commercials/FRedro starr Onyx 2.jpg",                   alt: "Fredro Starr × BAPE" },
  { src: "/assets/images/commercials/FRedro starr Onyx 4 nezz.jpg",              alt: "Fredro Starr × BAPE" },
  { src: "/assets/images/commercials/WhatsApp Image 2025-09-23 at 14.08.31.jpeg", alt: "Fredro Starr × BAPE" },
  { src: "/assets/images/commercials/WhatsApp Image 2025-09-23 at 14.08.49.jpeg", alt: "Fredro Starr × BAPE" },
];

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

        <section className="bape-gallery">
          {images.map((img) => (
            <figure key={img.src} className="bape-gallery__item">
              <img src={img.src} alt={img.alt} loading="lazy" />
            </figure>
          ))}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
