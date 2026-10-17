import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import PortraitsCarousel from "@/components/PortraitsCarousel";
import "@/styles/portraits.css";

export const metadata: Metadata = {
  title: "Stills — The Vision Frog Productions",
};

export default function StillsPage() {
  return (
    <PageLayout
      className="portraits-page"
      backHref="/"
      header={{
        eyebrow: "Stills",
        title: "Portraits",
        subtitle: "Artist press shots, editorial portraiture, and live moments.",
      }}
    >
      <PortraitsCarousel />
    </PageLayout>
  );
}
