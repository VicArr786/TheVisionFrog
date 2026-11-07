import type { Metadata } from "next";
import Link from "next/link";
import SiteChrome from "@/components/layout/SiteChrome";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import HeroCarousel, { type HeroCard } from "@/components/HeroCarousel";
import LogoMarquee from "@/components/LogoMarquee";
import "@/styles/home.css";

export const metadata: Metadata = {
  title: "The Vision Frog Productions",
};

const HERO_CARDS: HeroCard[] = [
  {
    label: "Music Videos",
    href: "/MusicVideos",
    img: "/assets/videos/home/music-videos.jpg",
    loop: "/assets/videos/home/music-videos.mp4",
  },
  {
    label: "Campaigns",
    href: "/Campaigns",
    img: "/assets/videos/home/campaigns.jpg?v=3",
    loop: "/assets/videos/home/campaigns.mp4?v=3",
  },
  {
    label: "VF Originals",
    href: "/Originals",
    img: "/assets/videos/home/vf-originals.jpg",
    loop: "/assets/videos/home/vf-originals.mp4",
  },
  {
    label: "Verticals",
    href: "/Verticals",
    img: "/assets/videos/home/verticals.jpg",
    loop: "/assets/videos/home/verticals.mp4",
  },
];

export default function HomePage() {
  return (
    <div className="vf-site home-page">
      <SiteChrome />
      <SiteNav />

      <header id="work" className="home-hero">
        <HeroCarousel cards={HERO_CARDS} />

        <div className="home-hero__text">
          <p className="home-hero__eyebrow">The Vision Frog</p>
          <h1 className="home-hero__title">A Full Service Film and Production Company</h1>
          <p className="home-hero__tagline">Music Videos · Campaigns · VF Originals · Verticals</p>
          <Link href="/About" className="home-hero__cta">
            About Us
          </Link>
        </div>

        <LogoMarquee />
      </header>

      <SiteFooter />
    </div>
  );
}
