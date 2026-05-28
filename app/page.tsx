import type { Metadata } from "next";
import Link from "next/link";
import SiteChrome from "@/components/layout/SiteChrome";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import HomeBannerVideo from "@/components/HomeBannerVideo";
import { PORTFOLIO_LINKS } from "@/lib/site";
import "@/styles/home.css";

export const metadata: Metadata = {
  title: "The Vision Frog Productions",
};

export default function HomePage() {
  return (
    <div className="vf-site home-page">
      <SiteChrome />
      <SiteNav />

      <header className="home-banner">
        <div className="home-banner__content">
          <p className="home-banner__eyebrow">Productions</p>
          <h1 className="home-banner__title">The Vision Frog</h1>
          <p className="home-banner__tagline">Film · Music Videos · Commercials · Portraits</p>
        </div>
        <HomeBannerVideo />
        <a href="#work" className="home-scroll" aria-label="Scroll to projects">
          ⌄
        </a>
      </header>

      <main id="work" className="home-work">
        <div className="home-tiles">
          {PORTFOLIO_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`home-tile ${item.className}`}
              data-label={item.label}
              aria-label={item.label}
            >
              <span className="home-tile__sr">{item.label}</span>
            </Link>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
