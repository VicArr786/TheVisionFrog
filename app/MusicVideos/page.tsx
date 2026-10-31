import type { Metadata } from "next";
import BackLink from "@/components/BackLink";
import GlassPlayer from "@/components/GlassPlayer";
import "@/styles/pages/GlassPlayer.css";

export const metadata: Metadata = {
  title: "Music Videos — The Vision Frog Productions",
};

/** Full-screen glass player — covers the whole page, no header or footer */
export default function MusicVideosPage() {
  return (
    <div className="vf-site mv-page">
      <BackLink href="/" fixed />
      <GlassPlayer />
    </div>
  );
}
