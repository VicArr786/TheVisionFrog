"use client";

import { useState } from "react";

export type CampaignImage = { src: string; alt: string };

export default function CampaignGallery({ images }: { images: CampaignImage[] }) {
  const [cols, setCols] = useState(2);

  return (
    <>
      <div className="bape-gallery-controls">
        <span className="bape-gallery-controls__label">Size</span>
        <input
          type="range"
          min={1}
          max={5}
          step={1}
          value={cols}
          onChange={(e) => setCols(Number(e.target.value))}
          className="bape-gallery-controls__slider"
          aria-label="Adjust column count"
        />
        <span className="bape-gallery-controls__val">{cols} col{cols !== 1 ? "s" : ""}</span>
      </div>

      <section className="bape-gallery" style={{ columns: cols }}>
        {images.map((img) => (
          <figure key={img.src} className="bape-gallery__item">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.src} alt={img.alt} loading="lazy" />
          </figure>
        ))}
      </section>
    </>
  );
}
