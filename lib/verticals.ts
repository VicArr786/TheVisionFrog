export type Vertical = {
  slug: string;
  title: string;
  client: string;
  /** 9:16 mp4 in public/assets — run scripts/optimize-media.mjs first */
  src: string;
  poster?: string;
  /** Instagram reel permalink, shown as "View on Instagram" */
  instagram?: string;
};

// Placeholder loops — swap in the real 9:16 reels (src) and their Instagram links
export const verticals: Vertical[] = [
  {
    slug: "vision-frog",
    title: "The Vision Frog",
    client: "VF Originals",
    src: "/assets/images/gifs/FinalGifs/web/VIsionFrog-min-2.mp4",
  },
  {
    slug: "commercial",
    title: "Commercial Reel",
    client: "Branded",
    src: "/assets/images/gifs/FinalGifs/web/Gif_Commercial-min.mp4",
  },
  {
    slug: "portraits",
    title: "Portraits Reel",
    client: "Stills",
    src: "/assets/images/gifs/FinalGifs/web/Gif_Portraits_1-min.mp4",
  },
  {
    slug: "narrative",
    title: "Narrative Reel",
    client: "VF Originals",
    src: "/assets/images/gifs/FinalGifs/web/Gif_.mp4",
  },
];
