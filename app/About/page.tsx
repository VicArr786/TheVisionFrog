import type { Metadata } from "next";
import PageLayout from "@/components/layout/PageLayout";
import { SITE } from "@/lib/site";
import "@/styles/about.css";

export const metadata: Metadata = {
  title: "About — The Vision Frog Productions",
};

const brands = [
  { src: "/assets/images/about/DefJam.png", alt: "Def Jam" },
  { src: "/assets/images/about/KittyGang.png", alt: "Kitty Gang Music" },
  { src: "/assets/images/about/Wilson.png", alt: "Wilson" },
  { src: "/assets/images/about/Brevite transparent.png", alt: "Brevite" },
  { src: "/assets/images/about/Empire_Distribution_logo.svg.png", alt: "Empire Distribution" },
  { src: "/assets/images/about/Bape.png", alt: "Bape" },
];

export default function AboutPage() {
  return (
    <PageLayout
      className="about-page"
      backHref="/"
      header={{
        eyebrow: "About",
        title: "Oliver Stemmler",
        subtitle: SITE.tagline,
      }}
    >
      <div className="about-grid">
        <figure className="about-photo">
          <img
            src="/assets/images/about/IMG_8238 2.JPG"
            alt="Founder at work, framing a shot on set"
          />
        </figure>

        <section className="about-bio">
          <p className="lead">
            <strong>Vision Frog</strong> — the way to craft your vision.
          </p>
          <p>
            I&apos;m a senior undergraduate at NYU Tisch School of the Arts studying Film &amp; TV.
            With a multicultural background — born and raised in Spain and Germany, and now living in
            the U.S. — I&apos;ve always been drawn to storytelling, beginning with my first experiments
            in stop-motion animation with LEGO. My passion lies in crafting inspiring narratives that
            resonate across cultures and in collaborating with others to bring visionary projects to
            life.
          </p>
          <p className="about-quote">&ldquo;Take Small Steps&rdquo;</p>
        </section>
      </div>

      <section className="about-brands">
        <h2>Selected Brands</h2>
        <div className="about-brand-grid">
          {brands.map((brand) => (
            <div key={brand.src} className="about-brand-item">
              <img loading="lazy" src={brand.src} alt={brand.alt} />
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
