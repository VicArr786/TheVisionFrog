export type Campaign = {
  slug: string;
  label: string;
  count: number;
  cover: string;
};

export const campaigns: Campaign[] = [
  {
    slug: "Bape",
    label: "Fredro Starr × BAPE",
    count: 18,
    cover: "/assets/images/commercials/web/Fredro 4.jpg",
  },
  {
    slug: "BapeSpec",
    label: "BAPE × Def Jam — Spec",
    count: 9,
    cover: "/assets/images/Commercial/BAPE X DEF JAM SPEC/web/stills oliver_1.8.1.jpg",
  },
  {
    slug: "NyuV100",
    label: "NYU V100 Trailer",
    count: 4,
    cover: "/assets/images/Commercial/NYU V100 TRAILER/web/Screenshot 2026-05-29 at 13.56.52.jpg",
  },
  {
    slug: "AmVibes",
    label: "AM Vibes — “Gems” EP Trailer",
    count: 5,
    cover: "/assets/images/Commercial/AM VIBES - EP TRAILER GEMS ON YOUTUBE/web/Still 2026-05-12 002348_3.1.1.jpg",
  },
];
