import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import CampaignGrid from "@/components/CampaignGrid";
import "@/styles/pages/Commercials.css";

export const metadata: Metadata = {
  title: "Creators — The Vision Frog Productions",
};

export default function CreatorsPage() {
  return (
    <PageLayout
      className="commercials-page"
      backHref="/Commercials"
      header={{
        eyebrow: "Commercials",
        title: "Creators",
        subtitle: "Trailers and visuals made with artists and creators.",
      }}
    >
      <CampaignGrid category="creators" />
    </PageLayout>
  );
}
