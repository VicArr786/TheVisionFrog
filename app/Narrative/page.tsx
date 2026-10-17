import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/layout/PageLayout";
import { films } from "@/lib/narrative";
import "@/styles/pages/Film.css";

export const metadata: Metadata = {
  title: "Narrative — VF Originals",
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function NarrativePage() {
  return (
    <PageLayout
      className="film-page"
      backHref="/Originals"
      header={{
        eyebrow: "VF Originals",
        title: "Narrative",
        subtitle: "Short films written and directed by Oliver Stemmler.",
      }}
    >
      <ul className="film__more film__more--index" role="list">
        {films.map((f, idx) => (
          <li key={f.slug}>
            <Link href={`/Narrative/${f.slug}`} className="film-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.hero} alt="" />
              <span className="film-card__cta" aria-hidden="true">
                Explore the vision →
              </span>
              <span className="film-card__meta">
                <span className="film-card__index">{pad(idx + 1)}</span>
                <span className="film-card__title">{f.title}</span>
                <span className="film-card__format">{f.format}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </PageLayout>
  );
}
