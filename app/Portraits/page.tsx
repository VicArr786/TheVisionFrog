import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import PortraitsCarousel from "@/components/PortraitsCarousel";
import "@/styles/pages/BapeCommercial.css"; // .bape-gallery

export const metadata: Metadata = {
  title: "Portraits — The Vision Frog Productions",
};

export default function PortraitsPage() {
  return (
    <PageLayout
      className="portraits-page"
      backHref="/Originals"
      header={{
        eyebrow: "VF Originals",
        title: "Portraits",
        subtitle: "Artist press shots, editorial portraiture, and live moments.",
      }}
    >
      <PortraitsCarousel />
    </PageLayout>
  );
}
