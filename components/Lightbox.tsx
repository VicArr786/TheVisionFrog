"use client";

import { useEffect } from "react";
import "@/styles/lightbox.css";

export type LightboxImage = { src: string; alt: string };

type LightboxProps = {
  images: LightboxImage[];
  /** index of the open image, or null when closed */
  index: number | null;
  onChange: (index: number | null) => void;
  /** wrap from the last image to the first (and back); false stops at the ends */
  loop?: boolean;
};

/** Full-screen image viewer — Esc closes, ←/→ step through the set */
export default function Lightbox({ images, index, onChange, loop = true }: LightboxProps) {
  const open = index !== null;
  const count = images.length;
  const go = (i: number) => {
    if (loop) onChange((i + count) % count);
    else if (i >= 0 && i < count) onChange(i);
  };

  useEffect(() => {
    if (!open) return;
    const step = (d: number) => go((index ?? 0) + d);
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
  }, [open, index, count, loop, onChange]);

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
          disabled={!loop && index === 0}
          onClick={() => go(index - 1)}
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
          disabled={!loop && index === count - 1}
          onClick={() => go(index + 1)}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      ) : null}
    </div>
  );
}
