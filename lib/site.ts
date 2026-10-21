export const SITE = {
  name: "The Vision Frog",
  tagline: "The way to craft your vision.",
  copyright: "© 2026 Vision Frog LLC. All rights reserved.",
} as const;

export const SOCIAL = {
  instagram: "https://www.instagram.com/thevisionfrog/",
  youtube: "https://www.youtube.com/@TheVisionFrog",
  email: "mailto:thevisionfrog@gmail.com",
} as const;

export type NavLink = {
  href: string;
  label: string;
  /** Legacy routes that belong to this section (for active state) */
  match?: string[];
};

/** Work sections — rendered left of the divider */
export const WORK_NAV: NavLink[] = [
  { href: "/MusicVideos", label: "Music Videos" },
  { href: "/Commercials", label: "Commercials" },
  { href: "/Originals", label: "VF Originals", match: ["/Narrative", "/Visions", "/Portraits", "/Stills"] },
  { href: "/Verticals", label: "Verticals" },
];

/** Studio sections — rendered right of the divider */
export const INFO_NAV: NavLink[] = [
  { href: "/About", label: "About" },
  { href: "/Contact", label: "Contact" },
];
