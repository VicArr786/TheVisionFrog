"use client";

import { useState } from "react";
import Lightbox from "@/components/Lightbox";

/** `thumb` is a smaller copy shown in the grid; the lightbox always opens `src` */
export type CampaignImage = { src: string; alt: string; thumb?: string };

type CampaignGalleryProps = {
  images: CampaignImage[];
  initialCols?: number;
  maxCols?: number;
  /** lightbox wraps from the last image back to the first */
  loop?: boolean;
};

export default function CampaignGallery({ images, initialCols = 2, maxCols = 5, loop = true }: CampaignGalleryProps) {
  const [cols, setCols] = useState(initialCols);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <div className="bape-gallery-controls">
        <span className="bape-gallery-controls__label">Size</span>
        <input
          type="range"
          min={1}
          max={maxCols}
          step={1}
          value={cols}
          onChange={(e) => setCols(Number(e.target.value))}
          className="bape-gallery-controls__slider"
          aria-label="Adjust column count"
        />
        <span className="bape-gallery-controls__val">{cols} col{cols !== 1 ? "s" : ""}</span>
      </div>

      <section className="bape-gallery" style={{ columns: cols }}>
        {images.map((img, i) => (
          <figure key={img.src} className="bape-gallery__item">
            <button
              type="button"
              className="bape-gallery__open"
              aria-label={`View larger: ${img.alt}`}
              onClick={() => setOpen(i)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.thumb ?? img.src} alt={img.alt} loading="lazy" />
            </button>
          </figure>
        ))}
      </section>

      <Lightbox images={images} index={open} onChange={setOpen} loop={loop} />
    </>
  );
}
