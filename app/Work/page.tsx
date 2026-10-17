import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import CampaignGrid from "@/components/CampaignGrid";
import MusicVideosCarousel from "@/components/MusicVideosCarousel";
import WorkTabs from "@/components/WorkTabs";
import "@/styles/pages/Commercials.css";
import "@/styles/pages/MusicVideos.css";
import "@/styles/pages/Work.css";

export const metadata: Metadata = {
  title: "Branded & Music — The Vision Frog Productions",
};

export default function WorkPage() {
  return (
    <PageLayout
      className="commercials-page mv-page work-page"
      backHref="/"
      header={{
        eyebrow: "Branded & Music",
        title: "Campaigns & Music Videos",
        subtitle: "Brand campaigns and official music videos for labels and artists.",
      }}
    >
      <WorkTabs
        panels={[
          { id: "commercials", label: "Commercials", content: <CampaignGrid /> },
          { id: "music-videos", label: "Music Videos", content: <MusicVideosCarousel /> },
        ]}
      />
    </PageLayout>
  );
}
