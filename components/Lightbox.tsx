"use client";

import { useEffect } from "react";
import "@/styles/lightbox.css";

export type LightboxImage = { src: string; alt: string };

type LightboxProps = {
  images: LightboxImage[];
  /** index of the open image, or null when closed */
  index: number | null;
  onChange: (index: number | null) => void;
};

/** Full-screen image viewer — Esc closes, ←/→ step through the set */
export default function Lightbox({ images, index, onChange }: LightboxProps) {
  const open = index !== null;
  const count = images.length;

  useEffect(() => {
    if (!open) return;
    const step = (d: number) => onChange(((index ?? 0) + d + count) % count);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, index, count, onChange]);

  if (!open) return null;
  const img = images[index];

  return (
    <div
      className="vf-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={img.alt}
      onClick={(e) => {
        if (e.target === e.currentTarget) onChange(null);
      }}
    >
      <button type="button" className="vf-lightbox__close" aria-label="Close" onClick={() => onChange(null)}>
        &times;
      </button>

      {count > 1 ? (
        <button
          type="button"
          className="vf-lightbox__nav vf-lightbox__nav--prev"
          aria-label="Previous image"
          onClick={() => onChange((index - 1 + count) % count)}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      ) : null}

      <figure className="vf-lightbox__figure">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img key={img.src} src={img.src} alt={img.alt} className="vf-lightbox__img" />
        <figcaption className="vf-lightbox__caption">
          {index + 1} / {count}
        </figcaption>
      </figure>

      {count > 1 ? (
        <button
          type="button"
          className="vf-lightbox__nav vf-lightbox__nav--next"
          aria-label="Next image"
          onClick={() => onChange((index + 1) % count)}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      ) : null}
    </div>
  );
}
