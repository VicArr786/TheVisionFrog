import type { Metadata } from "next";
import BackLink from "@/components/BackLink";
import VerticalsFeed from "@/components/VerticalsFeed";
import "@/styles/pages/Verticals.css";

export const metadata: Metadata = {
  title: "Verticals — The Vision Frog Productions",
};

export default function VerticalsPage() {
  return (
    <div className="vf-site verticals-page">
      <BackLink href="/" fixed />
      <h1 className="verticals-page__title">Verticals</h1>
      <VerticalsFeed />
    </div>
  );
}
