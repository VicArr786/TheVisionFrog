import type { Metadata } from "next";
import NarrativeSlider from "@/components/NarrativeSlider";
import "@/styles/pages/Narrative.css";

export const metadata: Metadata = {
  title: "Narrative — VisionFrog",
};

export default function NarrativePage() {
  return <NarrativeSlider />;
}
