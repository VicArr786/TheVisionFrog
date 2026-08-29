"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

export type HeroCard = {
  label: string;
  href: string;
  img: string;
  /** Optional animated loop shown when the card is front & center */
  gif?: string;
};

const AUTO_ADVANCE_MS = 5000;
const IDLE_BEFORE_RESUME_MS = 7000;

export default function HeroCarousel({ cards }: { cards: HeroCard[] }) {
  const n = cards.length;
  const [pos, setPos] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [cardW, setCardW] = useState(440);

  const trackRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const startPos = useRef(0);
  const moved = useRef(0);
  const lastInteract = useRef(0);

  // responsive card size
  useEffect(() => {
    const measure = () => {
      const w = window.innerWidth;
      setCardW(Math.min(480, Math.max(240, w * 0.6)));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const gap = cardW * 0.62;

  // signed shortest offset of card i from the current position (wraps around)
  const offsetOf = useCallback(
    (i: number) => {
      let off = (((i - pos) % n) + n) % n;
      if (off > n / 2) off -= n;
      return off;
    },
    [pos, n]
  );

  const touch = () => {
    lastInteract.current = Date.now();
  };

  // auto-advance when idle
  useEffect(() => {
    const id = setInterval(() => {
      if (Date.now() - lastInteract.current < IDLE_BEFORE_RESUME_MS) return;
      setPos((p) => Math.round(p) + 1);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    touch();
    setDragging(true);
    startX.current = e.clientX;
    startPos.current = pos;
    moved.current = 0;
    trackRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - startX.current;
    moved.current = Math.max(moved.current, Math.abs(dx));
    setPos(startPos.current - dx / gap);
  };

  const endDrag = () => {
    if (!dragging) return;
    touch();
    setDragging(false);
    setPos((p) => Math.round(p));
  };

  const step = (dir: number) => {
    touch();
    setPos((p) => Math.round(p) + dir);
  };

  const onCardClick = (e: React.MouseEvent, off: number) => {
    if (moved.current > 8) {
      e.preventDefault();
      return;
    }
    if (Math.abs(off) > 0.5) {
      e.preventDefault();
      touch();
      setPos((p) => Math.round(p + off));
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  };

  return (
    <div
      className={`hero-carousel${dragging ? " is-dragging" : ""}`}
      role="region"
      aria-label="Featured work"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <button
        type="button"
        className="hero-carousel__arrow hero-carousel__arrow--prev"
        aria-label="Previous"
        onClick={() => step(-1)}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
          <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        ref={trackRef}
        className="hero-carousel__track"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        {cards.map((card, i) => {
          const off = offsetOf(i);
          const t = Math.min(Math.abs(off), 1);
          const hidden = Math.abs(off) > Math.min(2.6, n / 2 - 0.4);
          const front = Math.abs(off) < 0.5;
          const style: React.CSSProperties = {
            width: cardW,
            height: cardW * 0.75,
            transform: `translate(-50%, -50%) translateX(${off * gap}px) translateZ(${-t * 260}px) rotateY(${-Math.max(-1, Math.min(1, off)) * 42}deg) scale(${1 - t * 0.22})`,
            opacity: hidden ? 0 : 1 - t * 0.3,
            zIndex: 100 - Math.round(Math.abs(off) * 10),
            pointerEvents: hidden ? "none" : "auto",
          };
          return (
            <Link
              key={card.href + card.label}
              href={card.href}
              className={`hero-card${front ? " is-front" : ""}`}
              style={style}
              draggable={false}
              tabIndex={front ? 0 : -1}
              aria-hidden={hidden}
              onClick={(e) => onCardClick(e, off)}
            >
              <img className="hero-card__img" src={card.img} alt={card.label} draggable={false} />
              {card.gif && Math.abs(off) < 0.6 && (
                <img className="hero-card__gif" src={card.gif} alt="" draggable={false} />
              )}
              <span className="hero-card__label">{card.label}</span>
            </Link>
          );
        })}
      </div>

      <button
        type="button"
        className="hero-carousel__arrow hero-carousel__arrow--next"
        aria-label="Next"
        onClick={() => step(1)}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
          <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
