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
            src="/assets/images/about/web/IMG_8238 2.jpg"
            alt="Founder at work, framing a shot on set"
          />
        </figure>

        <section className="about-bio">
          <p className="lead">
            <strong>Vision Frog</strong> — the way to craft your vision.
          </p>
          <p>
            I&apos;m an NYU Tisch Film &amp; TV alum based in the U.S., with roots in Spain and
            Germany. Alongside a team of filmmakers, visionaries, producers, and storytellers, we
            direct and produce narrative, music, and commercial work for brands and artists shaping
            modern culture.
          </p>
          <p>
            What started with early stop-motion LEGO animation has grown into a full-service creative
            studio that handles campaign, narrative, and branded content end to end. From initial
            concept and multi-location shoots to cross-platform campaign strategy, we&apos;ve
            delivered work for major labels and global lifestyle powerhouses—including Reebok, Taco
            Bell, Anna Sui, Wilson, Bape, Def Jam, 300 Entertainment, Empire Records, Fiat, Brevité,
            RBC Records, and Kitty Gang Music.
          </p>
          <p>
            We bring visionary ideas to life through seamless collaboration, high-production
            execution, and culturally resonant storytelling. We don&apos;t just chase temporary
            virality. We build work engineered to trend today and stay in the conversation forever.
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
