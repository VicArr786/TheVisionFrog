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
    thumbnail: "/assets/images/music-videos/JozzyPic.png",
    stills: [],
  },
  {
    slug: "yanov-green-mountain",
    title: "Green Mountain",
    artist: "Yanov",
    youtubeUrl: "https://www.youtube.com/watch?v=758wutLeECc",
    thumbnail: "/assets/images/music-videos/YanovGreenMountain.png",
    stills: [],
  },
  {
    slug: "sina-what-we-lost",
    title: "What We Lost",
    artist: "Sina",
    youtubeUrl: "https://www.youtube.com/watch?v=FMlAGVdvb1Y",
    thumbnail: "/assets/images/music-videos/SinaWhatWeLost.png",
    stills: [],
  },
  {
    slug: "beno-overthinking",
    title: "Overthinking",
    artist: "Beno",
    youtubeUrl: "https://www.youtube.com/watch?v=vF1sCTnGtxI",
    thumbnail: "/assets/images/music-videos/BenoOverThinking.jpg",
    stills: [],
  },
];

export function getMusicVideo(slug: string): MusicVideo | undefined {
  return musicVideos.find((v) => v.slug === slug);
}

export function getMusicVideoSlugs(): string[] {
  return musicVideos.map((v) => v.slug);
}
