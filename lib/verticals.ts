export type Vertical = {
  slug: string;
  title: string;
  client: string;
  /** 9:16 mp4 in public/assets — without one the reel falls back to Instagram's embed player */
  src?: string;
  poster?: string;
  /** 16:9 source — letterboxed in the 9:16 frame instead of cropped */
  landscape?: boolean;
  /** Instagram reel permalink, shown as "View on Instagram" */
  instagram?: string;
};

const ig = (id: string) => `https://www.instagram.com/reel/${id}/`;

/** Reel downloaded to assets/images/verticals/web/<id>.mp4 (+ .jpg poster) */
const reel = (id: string, client: string, title: string, extra?: Partial<Vertical>): Vertical => ({
  slug: id,
  title,
  client,
  src: `/assets/images/verticals/web/${id}.mp4`,
  poster: `/assets/images/verticals/web/${id}.jpg`,
  instagram: ig(id),
  ...extra,
});

/** Reel id from an Instagram permalink, for the embed fallback */
export const igReelId = (url: string) => url.match(/\/reel\/([^/?]+)/)?.[1];

// labels render in NHG Titles, which has no ×, —, & or : glyphs — use x and -
// Reels without `src` fall back to Instagram's embed player
export const verticals: Vertical[] = [
  {
    slug: "reebok-nba-draft-26",
    title: "NBA Draft '26",
    client: "Reebok",
    src: "/assets/images/Commercial/REEBOK X NBA DRAFT 26/web/reebok_draft.mp4",
    poster: "/assets/images/Commercial/REEBOK X NBA DRAFT 26/web/still_4.jpg",
  },
  reel("Dec-3iANGs-", "Sidetalk", "We Outside x ASAP Ferg"),
  reel("Dd4WIcnPhCx", "Beno", "6 Train Tonight"),
  reel("DU05RPtkQVM", "NYU Program Board", "V100 Concert Promo", { landscape: true }),
  reel("DXpKONhD4N7", "Homecoming x Nike", "Air Max Plus Takeover"),
  reel("DYxKIFWxbnQ", "The Vision Frog", "Artists Take Notes"),
  reel("DZN5Njzo-Yh", "Kumar", "The Kumar Method"),
  reel("DHtflOqgpcR", "Def Jam Cafe x Alpha Industries", "PJ Splash"),
  reel("DHezvemSTEV", "Def Jam x Alpha Industries", "Def Jam Cafe Activation"),
  reel("DS2gYkJDX5s", "The Vision Frog", "NYU Thesis Film"),
];
