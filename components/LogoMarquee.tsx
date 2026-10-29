"use client";

import { useEffect, useRef } from "react";
import { brands } from "@/lib/brands";

/** seconds to auto-scroll one full copy of the list */
const LOOP_SECONDS = 40;
const LOOP_SECONDS_REDUCED = 120;

/**
 * Endless strip of client logos — the list is rendered twice so the loop is seamless.
 * Auto-scrolls on its own; can be dragged/flung with mouse or touch, then glides back to cruising speed.
 */
export default function LogoMarquee() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let half = track.scrollWidth / 2;
    let offset = 0;
    let velocity = 0; // px/s, extra speed left over from a fling
    let hovering = false;
    let dragging = false;
    let pointerId = -1;
    let lastX = 0;
    let lastT = 0;
    let moved = 0;
    let prev = performance.now();
    let raf = 0;

    const wrap = (x: number) => (half > 0 ? ((x % half) + half) % half : 0);
    const apply = () => {
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    };

    const tick = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.1);
      prev = now;
      if (!dragging) {
        const cruise = hovering ? 0 : half / (reduced ? LOOP_SECONDS_REDUCED : LOOP_SECONDS);
        offset = wrap(offset + (cruise + velocity) * dt);
        velocity *= Math.exp(-dt * 3); // fling friction
        if (Math.abs(velocity) < 1) velocity = 0;
        apply();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      dragging = true;
      pointerId = e.pointerId;
      lastX = e.clientX;
      lastT = e.timeStamp;
      moved = 0;
      velocity = 0;
      viewport.classList.add("is-dragging");
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerId) return;
      const dx = e.clientX - lastX;
      moved += Math.abs(dx);
      // capture only once it's clearly a horizontal drag, so taps and vertical scrolls pass through
      if (moved > 4 && !viewport.hasPointerCapture(e.pointerId)) viewport.setPointerCapture(e.pointerId);
      const dt = Math.max((e.timeStamp - lastT) / 1000, 0.001);
      velocity = 0.8 * (-dx / dt) + 0.2 * velocity;
      offset = wrap(offset - dx);
      lastX = e.clientX;
      lastT = e.timeStamp;
      apply();
    };

    const onUp = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerId) return;
      dragging = false;
      // a pause before release means no fling
      if (e.timeStamp - lastT > 80) velocity = 0;
      velocity = Math.max(-4000, Math.min(4000, velocity));
      viewport.classList.remove("is-dragging");
    };

    const onEnter = () => (hovering = true);
    const onLeave = () => (hovering = false);

    const ro = new ResizeObserver(() => {
      half = track.scrollWidth / 2;
      offset = wrap(offset);
    });
    ro.observe(track);

    viewport.addEventListener("pointerdown", onDown);
    viewport.addEventListener("pointermove", onMove);
    viewport.addEventListener("pointerup", onUp);
    viewport.addEventListener("pointercancel", onUp);
    viewport.addEventListener("mouseenter", onEnter);
    viewport.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      viewport.removeEventListener("pointerdown", onDown);
      viewport.removeEventListener("pointermove", onMove);
      viewport.removeEventListener("pointerup", onUp);
      viewport.removeEventListener("pointercancel", onUp);
      viewport.removeEventListener("mouseenter", onEnter);
      viewport.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section className="logo-marquee" aria-label="Brands we've worked with">
      <p className="logo-marquee__label">Trusted by</p>
      <div className="logo-marquee__viewport" ref={viewportRef}>
        <ul className="logo-marquee__track" ref={trackRef}>
          {[...brands, ...brands].map((b, i) => (
            <li key={i} className="logo-marquee__item" aria-hidden={i >= brands.length}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.src} alt={i < brands.length ? b.alt : ""} loading="lazy" draggable={false} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
