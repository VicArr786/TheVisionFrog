export type Credit = { role: string; name: string };

export type MusicVideo = {
  slug: string;
  title: string;
  artist: string;
  youtubeUrl: string;
  thumbnail: string;
  /** BTS / stills — add paths when images are ready */
  stills: string[];
  /** shown on the back of the record — drag the vinyl to flip it */
  credits?: Credit[];
};

export const musicVideos: MusicVideo[] = [
  {
    slug: "darrow-minute-maid",
    title: "Minute Maid",
    artist: "DARROW",
    youtubeUrl: "https://www.youtube.com/watch?v=V2-So-lgoZ4",
    thumbnail: "/assets/images/music-videos/Darrow_MinuteMaid.jpg",
    stills: [],
    credits: [
      { role: "Directed + Edited by", name: "Oliver Stemmler" },
      { role: "Written by", name: "Darrow Golub" },
      { role: "Song Produced by", name: "Zoowe" },
      { role: "Engineer, Mix + Master", name: "STRNGEKID" },
      { role: "Shot + Colored by", name: "Ryan Ondo" },
      { role: "3D Animation", name: "NoxyCoxy, og_grisch, waltiks" },
      { role: "AI VFX", name: "ab0nent.mow" },
    ],
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
    credits: [
      { role: "Directed + Edited by", name: "Oliver Stemmler" },
      { role: "Creative Director", name: "Pierre York" },
      { role: "Produced by", name: "Jason Ramos, Jozzy" },
      { role: "Director of Photography", name: "Daniel Cho" },
      { role: "Cast", name: "Jozzy, Sarae Addison, Angel Ann Craig, Khadi Don, Fabe, Clarke Lauren" },
      { role: "Steadicam (A Cam) Operator", name: "Donavyn Suffel" },
      { role: "Jib Operator (B Cam)", name: "Imad Rhayem" },
      { role: "A Cam 1st AC", name: "Trevan Meador" },
      { role: "B Cam 1st AC", name: "Christy Knudson" },
      { role: "2nd AC", name: "Quynh Le" },
      { role: "Stageplay Camera Operator", name: "Taylor Kundtz" },
      { role: "Gaffer", name: "Taylor Kundtz" },
      { role: "Colorist", name: "Ryan Ondo" },
      { role: "Graphic Designer", name: "Henry Hofferth" },
      { role: "Special Thanks", name: "PJ Splash Agency" },
    ],
  },
  {
    slug: "yanov-green-mountain",
    title: "Green Mountain",
    artist: "Yanov",
    youtubeUrl: "https://www.youtube.com/watch?v=758wutLeECc",
    thumbnail: "/assets/images/music-videos/web/YanovGreenMountain.jpg",
    stills: [],
    credits: [
      { role: "Directed + Edited by", name: "Oliver Stemmler" },
      { role: "Director of Photography", name: "Kyle Silverio" },
      { role: "Colorist", name: "Daniel Nozick" },
      { role: "3D Animation", name: "@NoxyCoxy" },
      { role: "Production Assistant", name: "Vicmarys Iturvide" },
    ],
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
    credits: [
      { role: "Directed + Edited by", name: "Oliver Stemmler" },
      { role: "Cinematography", name: "Augie Voss" },
      { role: "Animation + Title Graphics", name: "Blkrip" },
      { role: "Color", name: "Daniel Nozick" },
    ],
  },
  {
    slug: "chinese-kitty-pop-shit",
    title: "Pop Shit",
    artist: "Chinese Kitty",
    youtubeUrl: "https://www.youtube.com/watch?v=XMDhAA2lZHE",
    thumbnail: "https://i.ytimg.com/vi/XMDhAA2lZHE/maxresdefault.jpg",
    stills: [],
    credits: [
      { role: "Directed + Edited by", name: "Oliver Stemmler" },
      { role: "Directors of Photography", name: "@andres.santiago.rios, @jishnuchowdhury_" },
      { role: "Gaffer", name: "@jishnuchowdhury_" },
      { role: "3D Animation + VFX", name: "@twizzy_1ni, @slxx_xdd, @22tonyyy" },
      { role: "Sound Design", name: "@mixedbyivan_" },
      { role: "Color Grading", name: "Oliver Stemmler" },
      { role: "Produced by", name: "The Vision Frog" },
    ],
  },
  {
    slug: "yanov-denim",
    title: "Denim",
    artist: "Yanov",
    youtubeUrl: "https://www.youtube.com/watch?v=pKYv2QjkXco",
    thumbnail: "https://i.ytimg.com/vi/pKYv2QjkXco/maxresdefault.jpg",
    stills: [],
    credits: [
      { role: "Directed + Edited by", name: "Oliver Stemmler" },
      { role: "Director of Photography", name: "Ryan Ondo" },
      { role: "1st AC", name: "Sol Casimiro" },
      { role: "Assistant Director", name: "Asare Nyameke" },
      { role: "Gaffer", name: "Haolong Li" },
      { role: "Grip", name: "Kevin Tang" },
      { role: "Art Director", name: "Yuyang Fang" },
      { role: "Art Assistants", name: "Alexa Yamila Ocana, Vicmarys Iturvide" },
      { role: "Model", name: "Callie Boehm" },
    ],
  },
];

export function getMusicVideo(slug: string): MusicVideo | undefined {
  return musicVideos.find((v) => v.slug === slug);
}

export function getMusicVideoSlugs(): string[] {
  return musicVideos.map((v) => v.slug);
}
