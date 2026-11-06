import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import CampaignGrid from "@/components/CampaignGrid";
import CampaignSwitch from "@/components/CampaignSwitch";
import "@/styles/pages/Commercials.css";

export const metadata: Metadata = {
  title: "Creators — The Vision Frog Productions",
};

export default function CreatorsPage() {
  return (
    <PageLayout
      className="commercials-page"
      backHref="/Campaigns"
      header={{
        eyebrow: "Campaigns",
        title: <CampaignSwitch current="creators" />,
        subtitle: "Trailers and visuals made with artists and creators.",
      }}
    >
      <CampaignGrid category="creators" />
    </PageLayout>
  );
}
