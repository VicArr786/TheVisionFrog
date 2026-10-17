import type { Metadata } from "next";
import Link from "next/link";
import BackLink from "@/components/BackLink";
import SiteFooter from "@/components/SiteFooter";
import "@/styles/pages/Originals.css";

export const metadata: Metadata = {
  title: "VF Originals — The Vision Frog Productions",
};

const SECTIONS: { href: string; title: string; blurb: string; img: string; loop?: string }[] = [
  {
    href: "/Narrative",
    title: "Narrative",
    blurb: "Short films and stories, written and directed in-house.",
    img: "/assets/images/narrative/web/hoopers-asylum-title.jpg",
  },
  {
    href: "/Visions",
    title: "Visions",
    blurb: "Experimental and visual pieces.",
    img: "/assets/images/narrative/IMG_3525.jpg",
    loop: "/assets/images/gifs/FinalGifs/web/VIsionFrog-min-2.mp4",
  },
];

export default function OriginalsPage() {
  return (
    <div className="vf-site originals-page">
      <BackLink href="/" fixed />

      <main className="originals">
        <header className="originals__head">
          <span className="page-header__eyebrow">The Vision Frog</span>
          <h1 className="originals__title">VF Originals</h1>
        </header>

        <div className="originals__split">
          {SECTIONS.map((s) => (
            <Link key={s.href} href={s.href} className="originals__panel">
              {s.loop ? (
                <video src={s.loop} poster={s.img} autoPlay muted loop playsInline />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={s.img} alt="" />
              )}
              <span className="originals__panel-body">
                <span className="originals__panel-title">{s.title}</span>
                <span className="originals__panel-blurb">{s.blurb}</span>
                <span className="originals__panel-cta">Explore the vision →</span>
              </span>
            </Link>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
