import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import { visions } from "@/lib/visions";
import "@/styles/pages/Film.css";

export const metadata: Metadata = {
  title: "Visions — VF Originals",
};

export default function VisionsPage() {
  return (
    <PageLayout
      className="film-page"
      backHref="/Originals"
      header={{
        eyebrow: "VF Originals",
        title: "Visions",
        subtitle: "Capturing and documenting the next visionaries.",
      }}
    >
      {visions.length === 0 ? (
        <p className="film__empty">New visions are in the works — check back soon.</p>
      ) : (
        <ul className="film__more film__more--index" role="list">
          {visions.map((v) => (
            <li key={v.slug} className="film-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={v.hero} alt="" />
              <span className="film-card__meta">
                <span className="film-card__title">{v.title}</span>
                <span className="film-card__format">{v.format}</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </PageLayout>
  );
}
