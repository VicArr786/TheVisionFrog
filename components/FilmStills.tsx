"use client";

import { useState } from "react";
import Lightbox from "@/components/Lightbox";

export default function FilmStills({ stills, title }: { stills: string[]; title: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const images = stills.map((src, i) => ({ src, alt: `${title} — still ${i + 1}` }));

  return (
    <>
      <ul className="film-stills" role="list">
        {images.map((img, i) => (
          <li key={img.src}>
            <button type="button" className="film-stills__item" aria-label={`View larger: ${img.alt}`} onClick={() => setOpen(i)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.alt} loading="lazy" />
            </button>
          </li>
        ))}
      </ul>
      <Lightbox images={images} index={open} onChange={setOpen} />
    </>
  );
}
