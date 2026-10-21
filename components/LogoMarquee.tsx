import { brands } from "@/lib/brands";

/** Endless strip of client logos — the list is rendered twice so the CSS loop is seamless */
export default function LogoMarquee() {
  return (
    <section className="logo-marquee" aria-label="Brands we've worked with">
      <p className="logo-marquee__label">Trusted by</p>
      <div className="logo-marquee__viewport">
        <ul className="logo-marquee__track">
          {[...brands, ...brands].map((b, i) => (
            <li key={i} className="logo-marquee__item" aria-hidden={i >= brands.length}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.src} alt={i < brands.length ? b.alt : ""} loading="lazy" draggable={false} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
