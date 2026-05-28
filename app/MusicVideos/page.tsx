import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/layout/PageLayout";
import { musicVideos } from "@/lib/musicVideos";
import "@/styles/pages/MusicVideos.css";

export const metadata: Metadata = {
  title: "Music Videos — The Vision Frog Productions",
};

export default function MusicVideosPage() {
  return (
    <PageLayout
      className="mv-page"
      backHref="/"
      header={{
        eyebrow: "Portfolio",
        title: "Music Videos",
        subtitle: "Select a project to view stills and watch the full video.",
      }}
    >
      <section className="mv-grid">
        {musicVideos.map((video) => (
          <Link key={video.slug} href={`/MusicVideos/${video.slug}`} className="mv-card">
            <div className="mv-card__media">
              <img src={video.thumbnail} alt={`${video.artist} — ${video.title}`} />
              <span className="mv-card__play" aria-hidden>
                ▶
              </span>
            </div>
            <div className="mv-card__info">
              <span className="mv-card__artist">{video.artist}</span>
              <span className="mv-card__title">{video.title}</span>
            </div>
          </Link>
        ))}
      </section>
    </PageLayout>
  );
}
