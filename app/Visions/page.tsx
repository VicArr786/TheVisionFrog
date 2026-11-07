import type { Metadata } from "next";
import BackLink from "@/components/BackLink";
import FrogPond from "@/components/FrogPond";
import { visions } from "@/lib/visions";
import "@/styles/pages/Film.css";

export const metadata: Metadata = {
  title: "Visions — VF Originals",
};

/** Full-screen night lake, a frog holding up each vision — no header or footer, like Music Videos */
export default function VisionsPage() {
  return (
    <div className="vf-site visions-page">
      <BackLink href="/Originals" fixed />
      <FrogPond
        intro={
          <>
            <span className="pond__eyebrow">VF Originals</span>
            <h1 className="pond__title">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="visions-logo" src="/assets/images/Visions/web/visions-logo-white.png" alt="Visions" />
            </h1>
            <p className="pond__sub">Capturing and documenting the next visionaries.</p>
          </>
        }
        items={visions.map((v) => ({
          slug: v.slug,
          href: `/Visions/${v.slug}`,
          title: v.title,
          format: v.format,
          hero: v.hero,
          youtubeId: v.youtubeId,
        }))}
      />
    </div>
  );
}
