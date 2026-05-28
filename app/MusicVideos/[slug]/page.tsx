import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BackLink from "@/components/BackLink";
import PageHeader from "@/components/PageHeader";
import SiteFooter from "@/components/SiteFooter";
import { getMusicVideo, getMusicVideoSlugs } from "@/lib/musicVideos";
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
    description: `Watch ${video.artist} — ${video.title}. Behind-the-scenes stills and credits.`,
  };
}

export default async function MusicVideoDetailPage({ params }: Props) {
  const { slug } = await params;
  const video = getMusicVideo(slug);
  if (!video) notFound();

  const hasStills = video.stills.length > 0;

  return (
    <div className="vf-site mv-detail">
      <BackLink href="/MusicVideos" fixed />

      <section
        className="mv-detail__hero"
        style={{ backgroundImage: `url('${video.thumbnail}')` }}
      >
        <div className="mv-detail__hero-overlay" />
        <div className="mv-detail__hero-content">
          <span className="mv-detail__tag">Music Video</span>
          <h1 className="mv-detail__hero-title">
            <span className="mv-detail__artist">{video.artist}</span>
            <span className="mv-detail__song">{video.title}</span>
          </h1>
          <a
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-primary--solid mv-detail__watch"
          >
            Watch on YouTube
          </a>
        </div>
      </section>

      <main className="page-shell">
        <PageHeader
          eyebrow="From the shoot"
          title="Stills & BTS"
          subtitle={
            hasStills
              ? "Frames and moments captured on set."
              : "Stills coming soon — check back after the next shoot."
          }
        />

        {hasStills ? (
          <div className="mv-detail__gallery">
            {video.stills.map((src) => (
              <figure key={src} className="mv-detail__still">
                <img src={src} alt={`${video.artist} — ${video.title} still`} loading="lazy" />
              </figure>
            ))}
          </div>
        ) : (
          <div className="mv-detail__placeholder-grid">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="mv-detail__placeholder">
                <span className="mv-detail__placeholder-icon">◇</span>
                <span>Stills coming soon</span>
              </div>
            ))}
          </div>
        )}

        <aside className="mv-detail__cta">
          <p>Full video on YouTube</p>
          <a
            href={video.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-primary--solid"
          >
            {video.artist} — {video.title}
          </a>
          <Link href="/MusicVideos" className="mv-detail__back-list">
            ← All music videos
          </Link>
        </aside>
      </main>

      <SiteFooter />
    </div>
  );
}
