export const SITE = {
  name: "The Vision Frog",
  tagline: "The way to craft your vision.",
  copyright: "© 2025 Vision Frog LLC. All rights reserved.",
} as const;

export const SOCIAL = {
  instagram: "https://www.instagram.com/thevisionfrog/",
  youtube: "https://www.youtube.com/@TheVisionFrog",
  email: "mailto:thevisionfrog@gmail.com",
} as const;

export type NavLink = {
  href: string;
  label: string;
  /** In-page anchor on home */
  anchor?: boolean;
};

export const MAIN_NAV: NavLink[] = [
  { href: "/#work", label: "Projects", anchor: true },
  { href: "/About", label: "About" },
  { href: "/Merch", label: "Merch" },
  { href: "/Contact", label: "Contact" },
];

export const PORTFOLIO_LINKS = [
  { href: "/MusicVideos", label: "Music Videos", className: "MusicVideo" },
  { href: "/Narrative", label: "Narrative", className: "Narrative" },
  { href: "/Commercials", label: "Commercials", className: "Commercials" },
  { href: "/Portraits", label: "Portraits", className: "Portraits" },
] as const;
