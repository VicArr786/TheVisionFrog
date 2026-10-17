import type { Metadata } from "next";
import HubPanels, { type HubSection } from "@/components/HubPanels";

export const metadata: Metadata = {
  title: "VF Originals — The Vision Frog Productions",
};

const SECTIONS: HubSection[] = [
  {
    href: "/Narrative",
    title: "Narrative",
    blurb: "Short films and stories, written and directed in-house.",
    img: "/assets/images/narrative/web/hoopers-asylum-title.jpg",
  },
  {
    href: "/Visions",
    title: "Visions",
    blurb: "Capturing and documenting the next visionaries.",
    img: "/assets/images/narrative/IMG_3525.jpg",
    loop: "/assets/images/gifs/FinalGifs/web/VIsionFrog-min-2.mp4",
  },
  {
    href: "/Portraits",
    title: "Portraits",
    blurb: "Artist press shots, editorial portraiture, and live moments.",
    img: "/assets/images/portraits/web/Shakira FINALS - 4.jpg",
  },
];

export default function OriginalsPage() {
  return <HubPanels title="VF Originals" sections={SECTIONS} className="originals-page" />;
}
