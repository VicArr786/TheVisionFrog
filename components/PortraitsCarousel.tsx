"use client";

import { useCallback, useEffect, useRef, useState } from "react";
const slides = [
  { src: "/assets/images/portraits/Shakira FINALS - 4.jpg", caption: "Shakira — Global Citizen 2025" },
  { src: "/assets/images/portraits/Shakira FINALS - 2.jpg", caption: "Shakira — Global Citizen 2025" },
  { src: "/assets/images/portraits/949d8a7f-9ebf-4336-a511-b7efa1baa68a_rw_1920.jpg", caption: "Doja Cat — Global Citizen 2024" },
  { src: "/assets/images/portraits/764fbadb-3c26-4cac-a36c-f3e0b7cc8bb1_rw_3840.JPG", caption: "Kanii — SOB's" },
  { src: "/assets/images/portraits/c335f4d0-540b-4147-88d2-5b34568e0b3e_rw_1920-2.jpg", caption: "Jozzy — In the moment" },
  { src: "/assets/images/portraits/Fredro 5.JPG", caption: "Fredro Starr × BAPE" },
];

export default function PortraitsCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null);

  const getSlideEls = () => {
    const track = viewportRef.current?.querySelector(".portraits-track");
    if (!track) return [];
    return Array.from(track.children) as HTMLLIElement[];
  };

  const slideCenters = useCallback(() => {
    const viewport = viewportRef.current;
    const slideEls = getSlideEls();
    if (!viewport || !slideEls.length) return [];
    const vpW = viewport.clientWidth;
    const vpRect = viewport.getBoundingClientRect();
    return slideEls.map((s) => {
      const rect = s.getBoundingClientRect();
      const leftInViewport = rect.left - vpRect.left + viewport.scrollLeft;
      return Math.round(leftInViewport - (vpW - s.clientWidth) / 2);
    });
  }, []);

  const nearestIndex = useCallback(() => {
    const viewport = viewportRef.current;
    const centers = slideCenters();
    if (!viewport || !centers.length) return 0;
    const scroll = viewport.scrollLeft;
    let best = 0;
    let bestDist = Infinity;
    centers.forEach((pos, i) => {
      const d = Math.abs(pos - scroll);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    return best;
  }, [slideCenters]);

  const goTo = useCallback(
    (i: number) => {
      const viewport = viewportRef.current;
      const slideEls = getSlideEls();
      const centers = slideCenters();
      if (!viewport || !centers.length) return;
      const idx = (i + slideEls.length) % slideEls.length;
      viewport.scrollTo({ left: centers[idx], behavior: "smooth" });
    },
    [slideCenters]
  );

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
      if (lightbox) {
        if (e.key === "Escape") closeLightbox();
        return;
      }
      if (e.key === "ArrowRight") goTo(nearestIndex() + 1);
      if (e.key === "ArrowLeft") goTo(nearestIndex() - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, goTo, nearestIndex]);

  useEffect(() => {
    goTo(0);
  }, [goTo]);

  return (
    <>
      <section className="portraits-carousel" aria-roledescription="carousel">
        <button
          type="button"
          className="portraits-arrow portraits-arrow--prev"
          aria-label="Previous slide"
          onClick={() => goTo(nearestIndex() - 1)}
        >
          <svg viewBox="0 0 24 24" fill="none" width="24" height="24" aria-hidden>
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="portraits-viewport" ref={viewportRef}>
          <ul className="portraits-track" role="list" aria-label="Portraits">
            {slides.map((slide) => (
              <li
                key={slide.src}
                className="portraits-slide"
                onClick={(e) => {
                  if ((e.target as HTMLElement).tagName === "IMG") {
                    openLightbox(slide.src, slide.caption);
                  } else {
                    goTo(slides.indexOf(slide));
                  }
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={slide.src} alt={slide.caption} />
                <span className="portraits-caption">{slide.caption}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className="portraits-arrow portraits-arrow--next"
          aria-label="Next slide"
          onClick={() => goTo(nearestIndex() + 1)}
        >
          <svg viewBox="0 0 24 24" fill="none" width="24" height="24" aria-hidden>
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </section>

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
