import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import CampaignGrid from "@/components/CampaignGrid";
import "@/styles/pages/Commercials.css";

export const metadata: Metadata = {
  title: "Commercials — The Vision Frog Productions",
};

export default function CommercialsPage() {
  return (
    <PageLayout
      className="commercials-page"
      backHref="/"
      header={{
        eyebrow: "Branded",
        title: "Commercials",
        subtitle: "Brand campaigns, collaborations, and commercial shoots.",
      }}
    >
      <CampaignGrid />
    </PageLayout>
  );
}
