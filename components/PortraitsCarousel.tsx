"use client";

import { useEffect, useState } from "react";

const slides = [
  { src: "/assets/images/portraits/Shakira FINALS - 4.jpg", caption: "Shakira — Global Citizen 2025" },
  { src: "/assets/images/portraits/Shakira FINALS - 2.jpg", caption: "Shakira — Global Citizen 2025" },
  { src: "/assets/images/portraits/949d8a7f-9ebf-4336-a511-b7efa1baa68a_rw_1920.jpg", caption: "Doja Cat — Global Citizen 2024" },
  { src: "/assets/images/portraits/764fbadb-3c26-4cac-a36c-f3e0b7cc8bb1_rw_3840.JPG", caption: "Kanii — SOB's" },
  { src: "/assets/images/portraits/c335f4d0-540b-4147-88d2-5b34568e0b3e_rw_1920-2.jpg", caption: "Jozzy — In the moment" },
  { src: "/assets/images/portraits/Fredro 5.JPG", caption: "Fredro Starr × BAPE" },
];

export default function PortraitsCarousel() {
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null);

  const openLightbox = (src: string, caption: string) => {
    setLightbox({ src, caption });
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightbox(null);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox && e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <>
      <ul className="portraits-grid" role="list" aria-label="Portraits">
        {slides.map((slide) => (
          <li
            key={slide.src}
            className="portraits-grid__item"
            onClick={() => openLightbox(slide.src, slide.caption)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={slide.src} alt={slide.caption} />
            <span className="portraits-caption">{slide.caption}</span>
          </li>
        ))}
      </ul>

      <div
        className={`portraits-lightbox${lightbox ? " portraits-lightbox--open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!lightbox}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeLightbox();
        }}
      >
        {lightbox ? (
          <div className="portraits-lightbox__inner">
            <button
              type="button"
              className="portraits-lightbox__close"
              aria-label="Close"
              onClick={closeLightbox}
            >
              &times;
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightbox.src}
              alt={lightbox.caption}
              className="portraits-lightbox__img"
            />
            <p className="portraits-lightbox__caption">{lightbox.caption}</p>
          </div>
        ) : null}
      </div>
    </>
  );
}
