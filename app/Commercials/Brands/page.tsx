import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import CampaignGrid from "@/components/CampaignGrid";
import "@/styles/pages/Commercials.css";

export const metadata: Metadata = {
  title: "Commercials — The Vision Frog Productions",
};

export default function BrandsPage() {
  return (
    <PageLayout
      className="commercials-page"
      backHref="/Commercials"
      header={{
        eyebrow: "Commercials",
        title: "Brands",
        subtitle: "Brand campaigns, collaborations, and commercial shoots.",
      }}
    >
      <CampaignGrid category="commercials" />
    </PageLayout>
  );
}
