export type Credit = { role: string; name: string };

export type MusicVideo = {
  slug: string;
  title: string;
  artist: string;
  youtubeUrl: string;
  thumbnail: string;
  /** 8s muted loop played behind the player (assets/videos/music-videos/<slug>.mp4) */
  clip?: string;
  /** BTS / stills — add paths when images are ready */
  stills: string[];
  /** shown on the back of the record — drag the vinyl to flip it */
  credits?: Credit[];
};

export const musicVideos: MusicVideo[] = [
  {
    slug: "darrow-minute-maid",
    clip: "/assets/videos/music-videos/darrow-minute-maid.mp4?v=3",
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
    clip: "/assets/videos/music-videos/chinese-kitty-too-many.mp4?v=3",
    title: "Too Many",
    artist: "Chinese Kitty",
    youtubeUrl: "https://www.youtube.com/watch?v=Pa0yBciwe1Y",
    thumbnail: "/assets/images/music-videos/ChinseKitty_TooMany.jpg",
    stills: [],
  },
  {
    slug: "jozzy-maybe",
    clip: "/assets/videos/music-videos/jozzy-maybe.mp4?v=3",
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
    clip: "/assets/videos/music-videos/yanov-green-mountain.mp4?v=3",
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
    clip: "/assets/videos/music-videos/sina-what-we-lost.mp4?v=3",
    title: "What We Lost",
    artist: "Sina",
    youtubeUrl: "https://www.youtube.com/watch?v=FMlAGVdvb1Y",
    thumbnail: "/assets/images/music-videos/web/SinaWhatWeLost.jpg",
    stills: [],
  },
  {
    slug: "beno-overthinking",
    clip: "/assets/videos/music-videos/beno-overthinking.mp4?v=3",
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
    clip: "/assets/videos/music-videos/chinese-kitty-pop-shit.mp4?v=3",
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
    clip: "/assets/videos/music-videos/yanov-denim.mp4?v=3",
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
  {
    slug: "chris-dayes-graduation",
    clip: "/assets/videos/music-videos/chris-dayes-graduation.mp4?v=3",
    title: "Graduation",
    artist: "Chris Dayes",
    youtubeUrl: "https://www.youtube.com/watch?v=GFIyivpHbsE",
    thumbnail: "/assets/images/music-videos/web/chris-dayes-graduation.jpg",
    stills: [],
    credits: [
      { role: "Directed + Edited by", name: "Oliver Stemmler" },
      { role: "Shot by", name: "Jishnu Chowdhury" },
      { role: "Produced by", name: "Reterik" },
      { role: "Creative Directed by", name: "Blame Xone" },
    ],
  },
  {
    slug: "sina-money-song",
    clip: "/assets/videos/music-videos/sina-money-song.mp4?v=3",
    title: "Money Song",
    artist: "SINA ft. Twan Haywood",
    youtubeUrl: "https://www.youtube.com/watch?v=pOavQsQFnws",
    thumbnail: "/assets/images/music-videos/web/sina-money-song.jpg",
    stills: [],
    credits: [{ role: "Directed + Shot + Edited by", name: "Oliver Stemmler" }],
  },
];

export function getMusicVideo(slug: string): MusicVideo | undefined {
  return musicVideos.find((v) => v.slug === slug);
}

export function getMusicVideoSlugs(): string[] {
  return musicVideos.map((v) => v.slug);
}
