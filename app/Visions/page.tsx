import type { Metadata } from "next";
import Link from "next/link";
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
        title: (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="visions-logo" src="/assets/images/Visions/web/visions-logo-white.png" alt="Visions" />
        ),
        subtitle: "Capturing and documenting the next visionaries.",
      }}
    >
      {visions.length === 0 ? (
        <p className="film__empty">New visions are in the works — check back soon.</p>
      ) : (
        <ul className="film__more film__more--index" role="list">
          {visions.map((v, idx) => (
            <li key={v.slug}>
              <Link href={`/Visions/${v.slug}`} className="film-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={v.hero} alt="" />
                <span className="film-card__cta" aria-hidden="true">
                  Explore the vision →
                </span>
                <span className="film-card__meta">
                  <span className="film-card__index">{String(idx + 1).padStart(2, "0")}</span>
                  <span className="film-card__title">{v.title}</span>
                  <span className="film-card__format">{v.format}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </PageLayout>
  );
}
