"use client";

import { useEffect, useRef } from "react";
import type { Brand } from "@/lib/brands";

// px per frame of the idle drift
const DRIFT = 0.35;
// pause the drift this long after the visitor drags or swipes
const RESUME_MS = 2500;

/** Brand logos as an endless two-row strip — drifts on its own, drag or swipe to scroll,
    and the next column always peeks in from the edge. The set is rendered three times
    and the scroll position is wrapped back into the middle copy, so it never runs out. */
export default function BrandCarousel({ brands }: { brands: Brand[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);

  // two logos per column; an odd count is doubled so every copy starts on the top row
  const base = brands.length % 2 ? [...brands, ...brands] : brands;
  const columns: Brand[][] = [];
  for (let i = 0; i < base.length; i += 2) columns.push(base.slice(i, i + 2));

  useEffect(() => {
    const track = trackRef.current;
    const set = setRef.current;
    if (!track || !set) return;

    const setWidth = () => set.offsetWidth;
    const wrap = () => {
      const w = setWidth();
      if (track.scrollLeft < w * 0.5) track.scrollLeft += w;
      else if (track.scrollLeft > w * 1.5) track.scrollLeft -= w;
    };
    track.scrollLeft = setWidth();

    let pos = track.scrollLeft;
    let idleUntil = 0;
    let hovering = false;
    let down = false;
    let startX = 0;
    let startScroll = 0;
    let raf = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tick = () => {
      if (!reduced && !down && !hovering && performance.now() > idleUntil) {
        // keep a float so sub-pixel drift accumulates (scrollLeft rounds)
        pos += DRIFT;
        track.scrollLeft = pos;
        wrap();
      }
      pos = Math.abs(track.scrollLeft - pos) > 1 ? track.scrollLeft : pos;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onScroll = () => wrap();
    const onEnter = () => (hovering = true);
    const onLeave = () => (hovering = false);
    const onTouch = () => (idleUntil = performance.now() + RESUME_MS);

    // mouse drag for desktop; touch already swipes natively
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      down = true;
      startX = e.clientX;
      startScroll = track.scrollLeft;
      track.classList.add("brand-carousel__track--dragging");
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      track.scrollLeft = startScroll - (e.clientX - startX);
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      idleUntil = performance.now() + RESUME_MS;
      track.classList.remove("brand-carousel__track--dragging");
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("pointerenter", onEnter);
    track.addEventListener("pointerleave", onLeave);
    track.addEventListener("touchstart", onTouch, { passive: true });
    track.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("pointerenter", onEnter);
      track.removeEventListener("pointerleave", onLeave);
      track.removeEventListener("touchstart", onTouch);
      track.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div className="brand-carousel">
      <div className="brand-carousel__track" ref={trackRef} onDragStart={(e) => e.preventDefault()}>
        {[0, 1, 2].map((copy) => (
          <div key={copy} className="brand-carousel__set" ref={copy === 0 ? setRef : undefined} aria-hidden={copy !== 1}>
            {columns.map((col, c) => (
              <div key={c} className="brand-carousel__col">
                {col.map((brand, r) => (
                  <div key={r} className="about-brand-item">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      loading="lazy"
                      src={brand.src}
                      alt={copy === 1 ? brand.alt : ""}
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
