"use client";

import Link from "next/link";
import BackLink from "@/components/BackLink";
import SiteFooter from "@/components/SiteFooter";
import "@/styles/pages/Hub.css";

export type HubSection = { href: string; title: string; blurb: string; img: string; loop?: string };

type HubPanelsProps = {
  title: string;
  sections: HubSection[];
  /** extra class on the page root, e.g. "originals-page" for the banner background */
  className?: string;
};

/** Split-panel landing page — one big tile per sub-section (VF Originals, Commercials) */
export default function HubPanels({ title, sections, className = "" }: HubPanelsProps) {
  return (
    <div className={`vf-site ${className}`.trim()}>
      <BackLink href="/" fixed />

      <main className="hub">
        <header className="hub__head">
          <span className="page-header__eyebrow">The Vision Frog</span>
          <h1 className="hub__title">{title}</h1>
        </header>

        <div className="hub__split" style={{ "--hub-cols": sections.length } as React.CSSProperties}>
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="hub__panel"
              onMouseEnter={(e) => e.currentTarget.querySelector("video")?.pause()}
              onMouseLeave={(e) => e.currentTarget.querySelector("video")?.play().catch(() => {})}
            >
              {s.loop ? (
                <video src={s.loop} poster={s.img} autoPlay muted loop playsInline />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={s.img} alt="" />
              )}
              <span className="hub__panel-body">
                <span className="hub__panel-title">{s.title}</span>
                <span className="hub__panel-blurb">{s.blurb}</span>
                <span className="hub__panel-cta">Explore the vision →</span>
              </span>
            </Link>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
