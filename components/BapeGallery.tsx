"use client";

import { useState } from "react";

const images = [
  { src: "/assets/images/commercials/Fredro 4.JPG",                               alt: "Fredro Starr × BAPE" },
  { src: "/assets/images/commercials/Fredro 12.jpg",                              alt: "Fredro Starr × BAPE" },
  { src: "/assets/images/commercials/FRedro starr 7.jpg",                         alt: "Fredro Starr × BAPE" },
  { src: "/assets/images/commercials/FRedro starr 8.jpg",                         alt: "Fredro Starr × BAPE" },
  { src: "/assets/images/commercials/FRedro starr Onyx 2.jpg",                    alt: "Fredro Starr × BAPE" },
  { src: "/assets/images/commercials/FRedro starr Onyx 4 nezz.jpg",               alt: "Fredro Starr × BAPE" },
  { src: "/assets/images/commercials/WhatsApp Image 2025-09-23 at 14.08.31.jpeg", alt: "Fredro Starr × BAPE" },
  { src: "/assets/images/commercials/WhatsApp Image 2025-09-23 at 14.08.49.jpeg", alt: "Fredro Starr × BAPE" },
];

export default function BapeGallery() {
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
