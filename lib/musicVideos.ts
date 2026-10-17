export type MusicVideo = {
  slug: string;
  title: string;
  artist: string;
  youtubeUrl: string;
  thumbnail: string;
  /** BTS / stills — add paths when images are ready */
  stills: string[];
};

export const musicVideos: MusicVideo[] = [
  {
    slug: "darrow-minute-maid",
    title: "Minute Maid",
    artist: "DARROW",
    youtubeUrl: "https://www.youtube.com/watch?v=V2-So-lgoZ4",
    thumbnail: "/assets/images/music-videos/Darrow_MinuteMaid.jpg",
    stills: [],
  },
  {
    slug: "chinese-kitty-too-many",
    title: "Too Many",
    artist: "Chinese Kitty",
    youtubeUrl: "https://www.youtube.com/watch?v=Pa0yBciwe1Y",
    thumbnail: "/assets/images/music-videos/ChinseKitty_TooMany.jpg",
    stills: [],
  },
  {
    slug: "jozzy-maybe",
    title: "Maybe",
    artist: "Jozzy",
    youtubeUrl: "https://www.youtube.com/watch?v=c71jSixjWrk",
    thumbnail: "/assets/images/music-videos/web/JozzyPic.jpg",
    stills: [],
  },
  {
    slug: "yanov-green-mountain",
    title: "Green Mountain",
    artist: "Yanov",
    youtubeUrl: "https://www.youtube.com/watch?v=758wutLeECc",
    thumbnail: "/assets/images/music-videos/web/YanovGreenMountain.jpg",
    stills: [],
  },
  {
    slug: "sina-what-we-lost",
    title: "What We Lost",
    artist: "Sina",
    youtubeUrl: "https://www.youtube.com/watch?v=FMlAGVdvb1Y",
    thumbnail: "/assets/images/music-videos/web/SinaWhatWeLost.jpg",
    stills: [],
  },
  {
    slug: "beno-overthinking",
    title: "Overthinking",
    artist: "Beno",
    youtubeUrl: "https://www.youtube.com/watch?v=vF1sCTnGtxI",
    thumbnail: "/assets/images/music-videos/web/BenoOverThinking.jpg",
    stills: [],
  },
  // ── New videos: fill in title/artist/youtubeUrl, then drop the thumbnail
  //    image at the path below (public/assets/images/music-videos/) ──
  {
    slug: "Chinese Kitty - Pop Shit (Official Video)",
    title: "Pop Shit (Official Video)",
    artist: "Chinese Kitty ",
    youtubeUrl: "https://www.youtube.com/watch?v=XMDhAA2lZHE", // add YouTube link
    thumbnail: "/assets/images/music-videos/NewVideo1.jpg", // add image
    stills: [],
  },
  {
    slug: "new-video-2",
    title: "Coming Soon",
    artist: "New Video",
    youtubeUrl: "https://www.youtube.com/watch?v=pKYv2QjkXco", // add YouTube link
    thumbnail: "/assets/images/music-videos/NewVideo2.jpg", // add image
    stills: [],
  },
];

export function getMusicVideo(slug: string): MusicVideo | undefined {
  return musicVideos.find((v) => v.slug === slug);
}

export function getMusicVideoSlugs(): string[] {
  return musicVideos.map((v) => v.slug);
}
