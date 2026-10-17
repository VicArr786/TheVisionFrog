import type { Metadata } from "next";
import NarrativeSlider from "@/components/NarrativeSlider";
import "@/styles/pages/Narrative.css";

export const metadata: Metadata = {
  title: "VF Originals — The Vision Frog Productions",
};

export default function OriginalsPage() {
  return <NarrativeSlider />;
}
