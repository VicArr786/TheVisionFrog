"use client";

import { useEffect, useRef, useState } from "react";

export type Brand = { src: string; alt: string };

const PER_PAGE = 6; // 3 x 2

/** Brand logos in 3x2 pages — swipe / drag sideways, or use the dots */
export default function BrandCarousel({ brands }: { brands: Brand[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const pages: Brand[][] = [];
  for (let i = 0; i < brands.length; i += PER_PAGE) pages.push(brands.slice(i, i + PER_PAGE));

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => setPage(Math.round(track.scrollLeft / track.clientWidth));
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  // mouse drag for desktop; touch already swipes natively
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let startX = 0;
    let startScroll = 0;
    let down = false;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      down = true;
      startX = e.clientX;
      startScroll = track.scrollLeft;
      track.classList.add("brand-carousel__track--dragging");
    };
    const onMove = (e: PointerEvent) => {
      if (down) track.scrollLeft = startScroll - (e.clientX - startX);
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      track.classList.remove("brand-carousel__track--dragging");
      const target = Math.round(track.scrollLeft / track.clientWidth);
      track.scrollTo({ left: target * track.clientWidth, behavior: "smooth" });
    };
    track.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      track.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (track) track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="brand-carousel">
      <div className="brand-carousel__track" ref={trackRef} onDragStart={(e) => e.preventDefault()}>
        {pages.map((group, i) => (
          <div key={i} className="about-brand-grid brand-carousel__page" aria-label={`Brands ${i + 1} of ${pages.length}`}>
            {group.map((brand) => (
              <div key={brand.src} className="about-brand-item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" src={brand.src} alt={brand.alt} draggable={false} />
              </div>
            ))}
          </div>
        ))}
      </div>

      {pages.length > 1 ? (
        <div className="brand-carousel__dots">
          {pages.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`brand-carousel__dot${i === page ? " brand-carousel__dot--active" : ""}`}
              aria-label={`Show brands page ${i + 1}`}
              aria-current={i === page}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
