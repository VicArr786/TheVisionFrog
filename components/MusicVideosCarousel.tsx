"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { musicVideos } from "@/lib/musicVideos";

const N = musicVideos.length;
const CLONES = 3;

// extend the list: [last 3 clones] + [real slides] + [first 3 clones]
const extended = [
  ...musicVideos.slice(-CLONES),
  ...musicVideos,
  ...musicVideos.slice(0, CLONES),
];

export default function MusicVideosCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(CLONES);
  const scrollingRef = useRef(false);

  // ── helpers ────────────────────────────────────────────────────────────────

  const getSlideEls = () => {
    const track = viewportRef.current?.querySelector(".mv-carousel-track");
    return track ? (Array.from(track.children) as HTMLLIElement[]) : [];
  };

  const getCenters = useCallback(() => {
    const vp = viewportRef.current;
    const els = getSlideEls();
    if (!vp || !els.length) return [];
    const vpW = vp.clientWidth;
    const vpRect = vp.getBoundingClientRect();
    return els.map((s) => {
      const rect = s.getBoundingClientRect();
      const left = rect.left - vpRect.left + vp.scrollLeft;
      return Math.round(left - (vpW - s.clientWidth) / 2);
    });
  }, []);

  const nearestIdx = useCallback(() => {
    const vp = viewportRef.current;
    const centers = getCenters();
    if (!vp || !centers.length) return CLONES;
    const scroll = vp.scrollLeft;
    let best = CLONES;
    let bestD = Infinity;
    centers.forEach((c, i) => {
      const d = Math.abs(c - scroll);
      if (d < bestD) { bestD = d; best = i; }
    });
    return best;
  }, [getCenters]);

  const scrollTo = useCallback((idx: number, animate = true) => {
    const vp = viewportRef.current;
    const centers = getCenters();
    if (!vp || !centers.length) return;
    if (animate) {
      vp.scrollTo({ left: centers[idx], behavior: "smooth" });
    } else {
      vp.scrollLeft = centers[idx];
    }
  }, [getCenters]);

  // ── teleport after scrolling into clone zone ────────────────────────────

  const teleportIfClone = useCallback(() => {
    if (scrollingRef.current) return;
    const vp = viewportRef.current;
    const centers = getCenters();
    if (!vp || !centers.length) return;
    const idx = nearestIdx();
    if (idx < CLONES) {
      const real = idx + N;
      vp.scrollLeft = centers[real];
      setActiveIdx(real);
    } else if (idx >= CLONES + N) {
      const real = idx - N;
      vp.scrollLeft = centers[real];
      setActiveIdx(real);
    }
  }, [getCenters, nearestIdx]);

  // ── scroll tracking ────────────────────────────────────────────────────

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    let endTimer: ReturnType<typeof setTimeout>;

    const onScroll = () => {
      setActiveIdx(nearestIdx());
      clearTimeout(endTimer);
      scrollingRef.current = true;
      endTimer = setTimeout(() => {
        scrollingRef.current = false;
        teleportIfClone();
      }, 80);
    };

    // scrollend is widely supported in modern browsers
    const onScrollEnd = () => {
      scrollingRef.current = false;
      clearTimeout(endTimer);
      teleportIfClone();
    };

    vp.addEventListener("scroll", onScroll, { passive: true });
    vp.addEventListener("scrollend", onScrollEnd, { passive: true });
    return () => {
      vp.removeEventListener("scroll", onScroll);
      vp.removeEventListener("scrollend", onScrollEnd);
      clearTimeout(endTimer);
    };
  }, [nearestIdx, teleportIfClone]);

  // ── keyboard ───────────────────────────────────────────────────────────

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const cur = nearestIdx();
      if (e.key === "ArrowRight") { scrollTo(cur + 1); setActiveIdx(cur + 1); }
      if (e.key === "ArrowLeft")  { scrollTo(cur - 1); setActiveIdx(cur - 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nearestIdx, scrollTo]);

  // ── init: jump to first real slide (no animation) ──────────────────────

  useEffect(() => {
    requestAnimationFrame(() => scrollTo(CLONES, false));
  }, [scrollTo]);

  // ── arrow click ────────────────────────────────────────────────────────

  const handlePrev = () => { const c = nearestIdx(); scrollTo(c - 1); setActiveIdx(c - 1); };
  const handleNext = () => { const c = nearestIdx(); scrollTo(c + 1); setActiveIdx(c + 1); };

  return (
    <section className="mv-carousel" aria-roledescription="carousel">
      <button type="button" className="mv-carousel-arrow mv-carousel-arrow--prev" aria-label="Previous" onClick={handlePrev}>
        <svg viewBox="0 0 24 24" fill="none" width="24" height="24" aria-hidden>
          <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <div className="mv-carousel-viewport" ref={viewportRef}>
        <ul className="mv-carousel-track" role="list">
          {extended.map((video, i) => (
            <li
              key={`${video.slug}-${i}`}
              className={`mv-carousel-slide${i === activeIdx ? " mv-carousel-slide--active" : ""}`}
            >
              <Link href={`/MusicVideos/${video.slug}`} className="mv-carousel-link">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={video.thumbnail} alt={`${video.artist} — ${video.title}`} />
                <div className="mv-carousel-info">
                  <span className="mv-carousel-artist">{video.artist}</span>
                  <span className="mv-carousel-title">{video.title}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <button type="button" className="mv-carousel-arrow mv-carousel-arrow--next" aria-label="Next" onClick={handleNext}>
        <svg viewBox="0 0 24 24" fill="none" width="24" height="24" aria-hidden>
          <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </section>
  );
}
