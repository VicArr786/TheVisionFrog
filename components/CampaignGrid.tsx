import Link from "next/link";
import { campaigns, type Campaign } from "@/lib/commercials";

/** Commercial campaign cards — styled by Commercials.css (.commercials-page) */
export default function CampaignGrid({ category }: { category?: Campaign["category"] }) {
  const items = category ? campaigns.filter((c) => c.category === category) : campaigns;

  return (
    <section className="campaigns-grid">
      {items.map((c) => (
        <Link
          key={c.slug}
          href={`/Commercials/${c.slug}`}
          className="campaign-card"
          style={{ backgroundImage: `url('${c.cover}')` }}
        >
          <div className="campaign-card__overlay" />
          <span className="campaign-card__cta" aria-hidden="true">
            Explore the vision <span className="campaign-card__arrow">→</span>
          </span>
          <div className="campaign-card__info">
            <span className="campaign-card__label">{c.label}</span>
            <span className="campaign-card__count">{c.count ? `${c.count} images` : "Video"}</span>
          </div>
        </Link>
      ))}
    </section>
  );
}
