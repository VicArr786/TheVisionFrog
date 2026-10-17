// labels render in NHG Titles, which has no ×, —, & or : glyphs — use x and -
export type Campaign = {
  slug: string;
  label: string;
  count: number;
  cover: string;
};

export const campaigns: Campaign[] = [
  {
    slug: "Bape",
    label: "Def Jam x BAPE",
    count: 18,
    cover: "/assets/images/Commercial/BAPE X DEF JAM OFFICIAL CAMPAIGN/web/BapeXDefjam_Lb_Banner_1000x667_9d7e58ea-4c0e-4699-a801-493291db6690.jpg",
  },
  {
    slug: "BapeSpec",
    label: "BAPE x Def Jam - Spec",
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
    label: "AM Vibes - “Gems” EP Trailer",
    count: 5,
    cover: "/assets/images/Commercial/AM VIBES - EP TRAILER GEMS ON YOUTUBE/web/Still 2026-05-12 002348_3.1.1.jpg",
  },
];
