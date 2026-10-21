import type { Metadata } from "next";
import Link from "next/link";
import SiteChrome from "@/components/layout/SiteChrome";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import HeroCarousel, { type HeroCard } from "@/components/HeroCarousel";
import "@/styles/home.css";

export const metadata: Metadata = {
  title: "The Vision Frog Productions",
};

const HERO_CARDS: HeroCard[] = [
  {
    label: "Music Videos",
    href: "/MusicVideos",
    img: "/assets/images/music-videos/web/JozzyPic.jpg",
    loop: "/assets/images/gifs/FinalGifs/web/VIsionFrog-min-2.mp4",
  },
  {
    label: "Commercials",
    href: "/Commercials",
    img: "/assets/images/commercials/WhatsApp Image 2025-09-23 at 14.08.49.jpeg",
    loop: "/assets/images/gifs/FinalGifs/web/Gif_Commercial-min.mp4",
  },
  {
    label: "VF Originals",
    href: "/Originals",
    img: "/assets/images/narrative/IMG_3525.jpg",
    loop: "/assets/images/gifs/FinalGifs/web/Gif_.mp4",
  },
  {
    label: "Portraits",
    href: "/Portraits",
    img: "/assets/images/portraits/web/Shakira FINALS - 4.jpg",
    loop: "/assets/images/gifs/FinalGifs/web/Gif_Portraits_1-min.mp4",
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
          <p className="home-hero__tagline">Music Videos · Commercials · VF Originals · Verticals</p>
          <Link href="/About" className="home-hero__cta">
            About Us
          </Link>
        </div>
      </header>

      <SiteFooter />
    </div>
  );
}
