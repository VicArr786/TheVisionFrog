import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import MusicVideosCarousel from "@/components/MusicVideosCarousel";
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
      <MusicVideosCarousel />
    </PageLayout>
  );
}
