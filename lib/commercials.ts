// labels render in NHG Titles, which has no ×, —, & or : glyphs — use x and -
export type Campaign = {
  slug: string;
  label: string;
  /** gallery size; omit for video-only pages */
  count?: number;
  cover: string;
  /** which /Commercials page lists it: Brands or Creators */
  category: "commercials" | "creators";
};

export const campaigns: Campaign[] = [
  {
    slug: "Bape",
    label: "Def Jam x BAPE",
    count: 18,
    cover: "/assets/images/Commercial/BAPE X DEF JAM OFFICIAL CAMPAIGN/web/BapeXDefjam_Lb_Banner_1000x667_9d7e58ea-4c0e-4699-a801-493291db6690.jpg",
    category: "commercials",
  },
  {
    slug: "BapeSpec",
    label: "BAPE x Def Jam - Spec",
    count: 9,
    cover: "/assets/images/Commercial/BAPE X DEF JAM SPEC/web/stills oliver_1.8.1.jpg",
    category: "commercials",
  },
  {
    slug: "NyuV100",
    label: "NYU V100 Trailer",
    count: 4,
    cover: "/assets/images/Commercial/NYU V100 TRAILER/web/Screenshot 2026-05-29 at 13.56.52.jpg",
    category: "commercials",
  },
  {
    slug: "ReebokDraft",
    label: "Reebok x NBA Draft '26",
    count: 9,
    cover: "/assets/images/Commercial/REEBOK X NBA DRAFT 26/web/WhatsApp Image 2026-10-21 at 21.09.50(2).jpg",
    category: "commercials",
  },
  {
    slug: "TacoBell",
    label: "Taco Bell - Decades Menu",
    count: 10,
    cover: "/assets/images/Commercial/TacoBell/web/793258298_17939873535345386_3953360796027995563_n.jpg",
    category: "commercials",
  },
  {
    slug: "AmVibes",
    label: "AM Vibes - “Gems” EP Trailer",
    count: 4,
    cover: "/assets/images/Commercial/AM VIBES - EP TRAILER GEMS ON YOUTUBE/web/Still 2026-05-12 002348_3.1.1.jpg",
    category: "creators",
  },
  {
    slug: "HyperoptimizedEngineer",
    label: "Hyperoptimized Engineer 2026",
    count: 9,
    cover: "/assets/images/Commercial/HYPEROPTIMIZED ENGINEER 2026/web/cover.jpg",
    category: "creators",
  },
  {
    slug: "ClassInSession",
    label: "Bunch of Friends - Class in Session",
    count: 4,
    cover: "/assets/images/Commercial/Bunch Of friends call in session/web/WhatsApp Image 2026-10-21 at 21.09.24(2).jpg",
    category: "creators",
  },
];
