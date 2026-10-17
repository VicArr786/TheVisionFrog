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
  { href: "/Work", label: "Branded & Music", match: ["/Commercials", "/MusicVideos"] },
  { href: "/Originals", label: "VF Originals", match: ["/Narrative"] },
  { href: "/Stills", label: "Stills", match: ["/Portraits"] },
];

/** Studio sections — rendered right of the divider */
export const INFO_NAV: NavLink[] = [
  { href: "/About", label: "About" },
  { href: "/Contact", label: "Contact" },
];

export const PORTFOLIO_LINKS = [
  { href: "/MusicVideos", label: "Music Videos", className: "MusicVideo" },
  { href: "/Narrative", label: "Narrative", className: "Narrative" },
  { href: "/Commercials", label: "Commercials", className: "Commercials" },
  { href: "/Portraits", label: "Portraits", className: "Portraits" },
] as const;
