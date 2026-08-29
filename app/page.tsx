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
    img: "/assets/images/music-videos/JozzyPic.png",
    gif: "/assets/images/gifs/FinalGifs/VIsionFrog-min-2.gif",
  },
  {
    label: "Commercials",
    href: "/Commercials",
    img: "/assets/images/commercials/WhatsApp Image 2025-09-23 at 14.08.49.jpeg",
    gif: "/assets/images/gifs/FinalGifs/Gif_Commercial-min.gif",
  },
  {
    label: "Narrative",
    href: "/Narrative",
    img: "/assets/images/narrative/IMG_3525.jpg",
    gif: "/assets/images/gifs/FinalGifs/Gif_.gif",
  },
  {
    label: "Portraits",
    href: "/Portraits",
    img: "/assets/images/portraits/Shakira FINALS - 4.jpg",
    gif: "/assets/images/gifs/FinalGifs/Gif_Portraits_1-min.gif",
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
          <h1 className="home-hero__title">A Full Service Film &amp; Production Company</h1>
          <p className="home-hero__tagline">Music Videos · Narrative · Commercials · Portraits</p>
          <Link href="/About" className="home-hero__cta">
            About Us
          </Link>
        </div>
      </header>

      <SiteFooter />
    </div>
  );
}
