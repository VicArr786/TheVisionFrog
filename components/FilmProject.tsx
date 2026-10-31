import Link from "next/link";
import BackLink from "@/components/BackLink";
import SiteFooter from "@/components/SiteFooter";
import FilmPlayer from "@/components/FilmPlayer";
import FilmStills from "@/components/FilmStills";
import type { Film } from "@/lib/narrative";

const pad = (n: number) => String(n).padStart(2, "0");

type Props = {
  film: Film;
  films: Film[];
  /** index route, e.g. "/Visions" */
  base: string;
  /** crumb + "More …" label, e.g. "Visions" */
  section: string;
};

/* Layout follows americanhaiku.xyz project pages:
   index bar → player → overview → team → stills → more projects */
export default function FilmProject({ film, films, base, section: sectionName }: Props) {
  const i = films.indexOf(film);
  const prev = films[(i - 1 + films.length) % films.length];
  const next = films[(i + 1) % films.length];
  let section = 0;
  const num = () => pad(++section);

  return (
    <div className="vf-site film-page" id="top">
      <BackLink href={base} fixed />

      <main className="film">
        <div className="film__bar">
          <span className="film__crumb">
            <Link href="/Originals">VF Originals</Link> / <Link href={base}>{sectionName}</Link>
          </span>
          {films.length > 1 ? (
            <span className="film__pager">
              <Link href={`${base}/${prev.slug}`} aria-label={`Previous: ${prev.title}`}>←</Link>
              <span>
                {pad(i + 1)} / {pad(films.length)}
              </span>
              <Link href={`${base}/${next.slug}`} aria-label={`Next: ${next.title}`}>→</Link>
            </span>
          ) : null}
        </div>

        <FilmPlayer youtubeId={film.youtubeId} poster={film.hero} title={film.title} />

        <header className="film__head">
          <span className="film__format">{film.format}</span>
          <h1 className="film__title">{film.title}</h1>
          {film.cta ? (
            <a href={film.cta.href} target="_blank" rel="noopener noreferrer" className="btn-primary btn-primary--solid">
              {film.cta.label}
            </a>
          ) : null}
        </header>

        {film.logline ? (
          <section className="film__section">
            <h2 className="film__label">
              <span>{num()}</span> Overview
            </h2>
            <p className="film__overview">{film.logline}</p>
          </section>
        ) : null}

        <section className="film__section">
          <h2 className="film__label">
            <span>{num()}</span> Team
          </h2>
          <dl className="film__credits">
            {film.credits.map((c) => (
              <div key={c.role} className="film__credit">
                <dt>{c.role}</dt>
                <dd>{c.name}</dd>
              </div>
            ))}
          </dl>
        </section>

        {film.stills.length ? (
          <section className="film__section">
            <h2 className="film__label">
              <span>{num()}</span> Stills
            </h2>
            <FilmStills stills={film.stills} title={film.title} />
          </section>
        ) : null}

        <section className="film__section">
          <h2 className="film__label">
            <span>{num()}</span> More {sectionName}
          </h2>
          <ul className="film__more" role="list">
            {films.map((f, idx) => (
              <li key={f.slug}>
                <Link
                  href={`${base}/${f.slug}`}
                  className={`film-card${f.slug === film.slug ? " film-card--current" : ""}`}
                  aria-current={f.slug === film.slug ? "page" : undefined}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.hero} alt="" loading="lazy" />
                  <span className="film-card__meta">
                    <span className="film-card__index">{pad(idx + 1)}</span>
                    <span className="film-card__title">{f.title}</span>
                    <span className="film-card__format">{f.slug === film.slug ? "Now viewing" : f.format}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <a href="#top" className="film__top">
          Back to top ↑
        </a>
      </main>

      <SiteFooter />
    </div>
  );
}
