import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import PortraitsCarousel from "@/components/PortraitsCarousel";
import "@/styles/portraits.css";

export const metadata: Metadata = {
  title: "Portraits — The Vision Frog Productions",
};

export default function PortraitsPage() {
  return (
    <PageLayout
      className="portraits-page"
      backHref="/"
      header={{
        eyebrow: "Portfolio",
        title: "Portraits",
        subtitle: "Live events, artists, and editorial moments.",
      }}
    >
      <PortraitsCarousel />
    </PageLayout>
  );
}
