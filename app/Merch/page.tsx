import type { Metadata } from "next";
import NavLayout from "@/components/layout/NavLayout";
import { SOCIAL } from "@/lib/site";
import "@/styles/merch.css";

export const metadata: Metadata = {
  title: "Merch | The Vision Frog Productions",
};

const products = [
  {
    name: "VF Logo Tee (Black)",
    price: "$50",
    desc: "Classic front logo print. Heavyweight feel. Clean + loud.",
    image: "/assets/images/merch/OliverBack.jpeg",
    tags: ["Sizes: S–XL", "Color: Black", "Unisex"],
  },
  {
    name: "VF Hat",
    price: "$35",
    desc: "Embroidered frog logo.",
    image: "/assets/images/merch/Visión hay.jpg",
    tags: ["Adjustable", "Color: White/Black"],
  },
];

export default function MerchPage() {
  return (
    <NavLayout>
      <div className="merch-page merch-hero">
        <div className="merch-inner">
          <div className="merch-section-head">
            <h2>Available Now</h2>
            <p style={{ color: "var(--text-muted)", margin: 0 }}>Limited runs • DM to claim</p>
          </div>

          <div className="merch-grid">
            {products.map((product) => (
              <article key={product.name} className="merch-card">
                <div
                  className="merch-card__media"
                  style={{ backgroundImage: `url('${product.image}')` }}
                >
                  <span className="merch-card__badge">In Stock</span>
                </div>
                <div className="merch-card__body">
                  <div className="merch-card__row">
                    <p className="merch-card__name">{product.name}</p>
                    <p className="merch-card__price">{product.price}</p>
                  </div>
                  <p className="merch-card__desc">{product.desc}</p>
                  <div className="merch-card__meta">
                    {product.tags.map((tag) => (
                      <span key={tag} className="merch-card__tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={SOCIAL.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="merch-card__btn"
                  >
                    DM to Order
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        <section className="merch-orders">
          <h3>Contact / Orders</h3>
          <p>
            Proceeds help bring our thesis film to life. To buy, DM us with your item name, size,
            and shipping city.
          </p>
          <a className="merch-orders__link" href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer">
            @thevisionfrog
          </a>
        </section>
      </div>
    </NavLayout>
  );
}
