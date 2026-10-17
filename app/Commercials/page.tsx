import type { Metadata } from "next";
import HubPanels, { type HubSection } from "@/components/HubPanels";

export const metadata: Metadata = {
  title: "Commercials — The Vision Frog Productions",
};

const SECTIONS: HubSection[] = [
  {
    href: "/Commercials/Brands",
    title: "Commercials",
    blurb: "Brand campaigns and collaborations.",
    img: "/assets/images/Commercial/BAPE X DEF JAM OFFICIAL CAMPAIGN/web/BapeXDefjam_Lb_Banner_1000x667_9d7e58ea-4c0e-4699-a801-493291db6690.jpg",
  },
  {
    href: "/Commercials/Creators",
    title: "Creators",
    blurb: "Trailers and visuals made with artists and creators.",
    img: "/assets/images/Commercial/AM VIBES - EP TRAILER GEMS ON YOUTUBE/web/Still 2026-05-12 002348_3.1.1.jpg",
  },
];

export default function CommercialsPage() {
  return <HubPanels title="Commercials" sections={SECTIONS} />;
}
