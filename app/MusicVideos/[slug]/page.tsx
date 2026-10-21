import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BackLink from "@/components/BackLink";
import SiteFooter from "@/components/SiteFooter";
import FilmPlayer from "@/components/FilmPlayer";
import { getMusicVideo, getMusicVideoSlugs, musicVideos } from "@/lib/musicVideos";
import "@/styles/pages/Film.css"; // .film-player
import "@/styles/pages/MusicVideoDetail.css";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getMusicVideoSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const video = getMusicVideo(slug);
  if (!video) return { title: "Music Video — The Vision Frog" };
  return {
    title: `${video.artist} — ${video.title} | The Vision Frog`,
    description: `Watch ${video.artist} — ${video.title}, directed by Oliver Stemmler. Credits and stills.`,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");
const youtubeId = (url: string) => url.match(/[?&]v=([^&]+)/)?.[1] ?? url.match(/youtu\.be\/([^?]+)/)?.[1];

/* hero → player → credits → stills (only when there are some) → prev / next */
export default async function MusicVideoDetailPage({ params }: Props) {
  const { slug } = await params;
  const video = getMusicVideo(slug);
  if (!video) notFound();

  const i = musicVideos.indexOf(video);
  const prev = musicVideos[(i - 1 + musicVideos.length) % musicVideos.length];
  const next = musicVideos[(i + 1) % musicVideos.length];
  const credits = video.credits ?? [];

  return (
    <div className="vf-site mv-detail">
      <BackLink href="/MusicVideos" fixed />

      <section className="mv-detail__hero" style={{ backgroundImage: `url('${video.thumbnail}')` }}>
        <div className="mv-detail__hero-overlay" />
        <div className="mv-detail__hero-content">
          <span className="mv-detail__tag">
            Music Video · {pad(i + 1)} / {pad(musicVideos.length)}
          </span>
          <h1 className="mv-detail__hero-title">
            <span className="mv-detail__artist">{video.artist}</span>
            <span className="mv-detail__song">{video.title}</span>
          </h1>
        </div>
      </section>

      <main className="mv-detail__body">
        <FilmPlayer
          youtubeId={youtubeId(video.youtubeUrl)}
          poster={video.thumbnail}
          title={`${video.artist} — ${video.title}`}
          label="Play video"
        />
        <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="mv-detail__yt">
          Watch on YouTube ↗
        </a>

        {credits.length ? (
          <section className="mv-detail__section">
            <h2 className="mv-detail__section-title">Credits</h2>
            <dl className="mv-detail__credits">
              {credits.map((c) => (
                <div key={c.role} className="mv-detail__credit">
                  <dt>{c.role}</dt>
                  <dd>{c.name}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        {video.stills.length ? (
          <section className="mv-detail__section">
            {/* display font has no & glyph */}
            <h2 className="mv-detail__section-title">Stills + BTS</h2>
            <div className="mv-detail__gallery">
              {video.stills.map((src) => (
                <figure key={src} className="mv-detail__still">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`${video.artist} — ${video.title} still`} loading="lazy" />
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        <nav className="mv-detail__pager" aria-label="More music videos">
          <Link href={`/MusicVideos/${prev.slug}`} className="mv-detail__pager-link">
            <span className="mv-detail__pager-dir">← Previous</span>
            <span className="mv-detail__pager-name">{prev.artist}</span>
            <span className="mv-detail__pager-song">{prev.title}</span>
          </Link>
          <Link href="/MusicVideos" className="mv-detail__pager-all">
            All music videos
          </Link>
          <Link href={`/MusicVideos/${next.slug}`} className="mv-detail__pager-link mv-detail__pager-link--next">
            <span className="mv-detail__pager-dir">Next →</span>
            <span className="mv-detail__pager-name">{next.artist}</span>
            <span className="mv-detail__pager-song">{next.title}</span>
          </Link>
        </nav>
      </main>

      <SiteFooter />
    </div>
  );
}
