import Link from "next/link";
import { campaigns } from "@/lib/commercials";

/** Commercial campaign cards — styled by Commercials.css (.commercials-page) */
export default function CampaignGrid() {
  return (
    <section className="campaigns-grid">
      {campaigns.map((c) => (
        <Link
          key={c.slug}
          href={`/Commercials/${c.slug}`}
          className="campaign-card"
          style={{ backgroundImage: `url('${c.cover}')` }}
        >
          <div className="campaign-card__overlay" />
          <div className="campaign-card__info">
            <span className="campaign-card__label">{c.label}</span>
            <span className="campaign-card__count">{c.count} images</span>
          </div>
        </Link>
      ))}
    </section>
  );
}
