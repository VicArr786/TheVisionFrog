"use client";

import { useState } from "react";

const images = [
  { src: "/assets/images/commercials/web/Fredro 4.jpg",                               alt: "Fredro Starr × BAPE" },
  { src: "/assets/images/commercials/web/Fredro 12.jpg",                              alt: "Fredro Starr × BAPE" },
  { src: "/assets/images/commercials/web/FRedro starr 7.jpg",                         alt: "Fredro Starr × BAPE" },
  { src: "/assets/images/commercials/web/FRedro starr 8.jpg",                         alt: "Fredro Starr × BAPE" },
  { src: "/assets/images/commercials/web/FRedro starr Onyx 2.jpg",                    alt: "Fredro Starr × BAPE" },
  { src: "/assets/images/commercials/web/FRedro starr Onyx 4 nezz.jpg",               alt: "Fredro Starr × BAPE" },
  { src: "/assets/images/commercials/WhatsApp Image 2025-09-23 at 14.08.31.jpeg", alt: "Fredro Starr × BAPE" },
  { src: "/assets/images/commercials/WhatsApp Image 2025-09-23 at 14.08.49.jpeg", alt: "Fredro Starr × BAPE" },
  { src: "/assets/images/Commercial/BAPE X DEF JAM OFFICIAL CAMPAIGN/web/BapeXDefjam_Lb_Banner_1000x667_9d7e58ea-4c0e-4699-a801-493291db6690.jpg", alt: "BAPE × Def Jam campaign banner" },
  { src: "/assets/images/Commercial/BAPE X DEF JAM OFFICIAL CAMPAIGN/web/Bape_Redman_FinalAsset_airbrushed 2.jpg", alt: "Redman × BAPE" },
  { src: "/assets/images/Commercial/BAPE X DEF JAM OFFICIAL CAMPAIGN/web/Bape_Redman_FinalAsset_7_needs fix.jpg", alt: "Redman × BAPE" },
  { src: "/assets/images/Commercial/BAPE X DEF JAM OFFICIAL CAMPAIGN/web/Screenshot 2026-05-29 at 14.00.23.jpg", alt: "Redman × BAPE" },
  { src: "/assets/images/Commercial/BAPE X DEF JAM OFFICIAL CAMPAIGN/web/Bri 13.jpg", alt: "BAPE × Def Jam" },
  { src: "/assets/images/Commercial/BAPE X DEF JAM OFFICIAL CAMPAIGN/web/Bri 14.jpg", alt: "BAPE × Def Jam" },
  { src: "/assets/images/Commercial/BAPE X DEF JAM OFFICIAL CAMPAIGN/web/Baze 18.jpg", alt: "BAPE × Def Jam" },
  { src: "/assets/images/Commercial/BAPE X DEF JAM OFFICIAL CAMPAIGN/web/ID5A0543 3.jpg", alt: "BAPE × Def Jam" },
  { src: "/assets/images/Commercial/BAPE X DEF JAM OFFICIAL CAMPAIGN/web/ID5A0761 4.jpg", alt: "BAPE × Def Jam" },
  { src: "/assets/images/Commercial/BAPE X DEF JAM OFFICIAL CAMPAIGN/web/Onyx_BTS_6 2.jpg", alt: "Fredro Starr × BAPE" },
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
