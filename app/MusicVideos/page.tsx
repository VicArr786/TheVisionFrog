import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import VinylPlayer from "@/components/VinylPlayer";
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
        eyebrow: "Music",
        title: "Music Videos",
        subtitle: "Pick a record to spin it — open the project for stills and the full video.",
      }}
    >
      <VinylPlayer />
    </PageLayout>
  );
}
