import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import TapeShelf, { type Tape } from "@/components/TapeShelf";
import { films } from "@/lib/narrative";

export const metadata: Metadata = {
  title: "Narrative — VF Originals",
};

// label stickers, in film order
const COLORS = ["#ef3b2f", "#f5ea3b"];

const tapes: Tape[] = films.map((f, i) => ({
  slug: f.slug,
  href: `/Narrative/${f.slug}`,
  code: `VFN-${String(i + 1).padStart(2, "0")}`,
  title: f.title,
  format: f.format,
  blurb: f.logline ?? `${f.format} written and directed by Oliver Stemmler.`,
  art: f.hero,
  color: COLORS[i % COLORS.length],
  youtubeId: f.youtubeId,
  cta: f.cta,
}));

export default function NarrativePage() {
  return (
    <PageLayout
      className="tapes-page"
      backHref="/Originals"
      header={{
        eyebrow: "VF Originals",
        title: "Narrative",
        subtitle: "Short films written and directed by Oliver Stemmler.",
      }}
    >
      <TapeShelf tapes={tapes} blanks={3} />
    </PageLayout>
  );
}
