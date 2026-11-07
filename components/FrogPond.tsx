"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "@/styles/pages/FrogPond.css";

export type PondItem = {
  slug: string;
  href: string;
  title: string;
  format: string;
  /** still shown on the card the frog holds up */
  hero: string;
  /** played, muted, on the sky when the frog projects it */
  youtubeId?: string;
};

// at least this many frogs on the lake; the spares are dim until a new vision moves in
const MIN_PADS = 3;
const DIVE_MS = 650;

type Dive = { rect: DOMRect; hero: string; href: string };

/** what's on the sky: the screen's box and both eyes, in px relative to the pond */
type Show = {
  item: PondItem;
  screen: { x: number; y: number; w: number; h: number };
  eyes: { x: number; y: number }[];
};

// wait this long on a frog before it starts projecting, so sweeping past doesn't flash the sky
const PROJECT_DELAY = 180;
// share of the scene below the horizon in the lake photo (see .pond__photo in FrogPond.css)
const LAKE = 0.35;

const pad = (n: number) => String(n).padStart(2, "0");

/** Night on a real lake under the Milky Way, and the Vision Frog on the water for each vision, its still
    and title on a card above it. Hover and its eyes project the film onto the sky; click to dive in. */
export default function FrogPond({ items, intro }: { items: PondItem[]; intro?: React.ReactNode }) {
  const router = useRouter();
  const pondRef = useRef<HTMLDivElement>(null);
  const diveRef = useRef<HTMLDivElement>(null);
  const [dive, setDive] = useState<Dive | null>(null);
  const [show, setShow] = useState<Show | null>(null);
  const showTimer = useRef(0);

  /** aim the frog's eyes at a screen in the middle of the sky */
  const project = (frog: HTMLElement, item: PondItem) => {
    window.clearTimeout(showTimer.current);
    showTimer.current = window.setTimeout(() => {
      const pond = pondRef.current;
      if (!pond) return;
      const p = pond.getBoundingClientRect();
      const eyes = Array.from(frog.querySelectorAll(".frog-art__eye")).map((el) => {
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2 - p.left, y: r.top + r.height / 2 - p.top };
      });
      if (eyes.length < 2) return;
      // centred in the sky, above the lake
      const sky = p.height * (1 - LAKE);
      const w = Math.min(p.width * 0.6, 860, ((sky - 90) * 16) / 9);
      const h = (w * 9) / 16;
      const x = (p.width - w) / 2;
      const y = Math.max((sky - h) / 2 - 10, 16);
      setShow({ item, screen: { x, y, w, h }, eyes });
    }, PROJECT_DELAY);
  };

  const stopProjecting = () => {
    window.clearTimeout(showTimer.current);
    setShow(null);
  };

  useEffect(() => () => window.clearTimeout(showTimer.current), []);

  const sleepers = Math.max(0, MIN_PADS - items.length);

  // the card grows from where it is to fill the screen, then we're on the film page
  useEffect(() => {
    const el = diveRef.current;
    if (!dive || !el) return;
    const { rect } = dive;
    const anim = el.animate(
      [
        { top: `${rect.top}px`, left: `${rect.left}px`, width: `${rect.width}px`, height: `${rect.height}px`, borderRadius: "0.4rem" },
        { top: "0px", left: "0px", width: `${innerWidth}px`, height: `${innerHeight}px`, borderRadius: "0" },
      ],
      { duration: DIVE_MS, easing: "cubic-bezier(0.7, 0, 0.25, 1)", fill: "both" }
    );
    anim.onfinish = () => router.push(dive.href);
  }, [dive, router]);

  const open = (e: React.MouseEvent<HTMLAnchorElement>, item: PondItem) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0 || dive) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    e.preventDefault();
    const img = e.currentTarget.querySelector(".frog-card__img");
    if (!img) return;
    setDive({ rect: img.getBoundingClientRect(), hero: item.hero, href: item.href });
  };

  return (
    <div className={`pond${show ? " is-projecting" : ""}`} ref={pondRef}>
      {/* real photo: "Starry night sky over a calm lake" by Stephen Crane, Unsplash License (free for commercial
          use, no attribution required) — https://unsplash.com/photos/Wq_P3SEpqH0 */}
      <div className="pond__photo" aria-hidden="true" />

      <header className="pond__intro">
        {intro}
        <p className="pond__hint">Hover a frog to watch it on the sky. Tap to dive in.</p>
      </header>

      <ul className="pond__line" role="list">
        {items.map((item, i) => (
          <li key={item.slug} className="pond__spot" style={{ "--bob": `${i * -1.1}s` } as React.CSSProperties}>
            <Link
              href={item.href}
              className="frog-sit frog-sit--vision"
              aria-label={`${item.title}, ${item.format}. Open the vision`}
              onClick={(e) => open(e, item)}
              onPointerEnter={(e) => {
                router.prefetch(item.href);
                if (e.pointerType !== "touch") project(e.currentTarget, item);
              }}
              onPointerLeave={stopProjecting}
              onFocus={(e) => project(e.currentTarget, item)}
              onBlur={stopProjecting}
            >
              <span className="frog-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="frog-card__img" src={item.hero} alt="" draggable={false} />
                <span className="frog-card__label">
                  <span className="frog-card__title">{item.title}</span>
                  <span className="frog-card__meta">
                    {item.format} · {pad(i + 1)}
                  </span>
                </span>
              </span>
              <FrogArt lamps />
              <LilyPad />
            </Link>
          </li>
        ))}
        {Array.from({ length: sleepers }, (_, i) => (
          <li
            key={`z${i}`}
            className="pond__spot pond__spot--sleepy"
            aria-hidden="true"
            style={{ "--bob": `${(items.length + i) * -1.1}s` } as React.CSSProperties}
          >
            <span className="frog-sit frog-sit--sleepy">
              <FrogArt />
              <LilyPad />
              <span className="frog-sit__soon">Coming soon</span>
            </span>
          </li>
        ))}
      </ul>

      {show ? <Projection show={show} /> : null}

      {dive ? <div className="pond__dive" ref={diveRef} style={{ backgroundImage: `url('${dive.hero}')` }} aria-hidden="true" /> : null}
    </div>
  );
}

/** two cones of light from the frog's eyes up to a flickering screen on the sky, film playing on it */
function Projection({ show }: { show: Show }) {
  const { item, screen: s, eyes } = show;
  // each cone: the eye, then the screen corners that make the outline as seen from below
  const cone = (e: { x: number; y: number }) =>
    [
      [e.x, e.y],
      [s.x + s.w, s.y + s.h],
      [s.x + s.w, s.y],
      [s.x, s.y],
      [s.x, s.y + s.h],
    ]
      .map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`)
      .join(" ");
  const mid = { x: (eyes[0].x + eyes[1].x) / 2, y: (eyes[0].y + eyes[1].y) / 2 };
  const src = item.youtubeId
    ? `https://www.youtube-nocookie.com/embed/${item.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${item.youtubeId}&modestbranding=1&playsinline=1&rel=0&disablekb=1&iv_load_policy=3`
    : null;

  return (
    <div className="projection" aria-hidden="true">
      <svg className="projection__beams" width="100%" height="100%">
        <defs>
          <linearGradient
            id="beam"
            gradientUnits="userSpaceOnUse"
            x1={mid.x}
            y1={mid.y}
            x2={s.x + s.w / 2}
            y2={s.y + s.h / 2}
          >
            <stop offset="0" stopColor="#fff6c8" stopOpacity="0.55" />
            <stop offset="0.6" stopColor="#c9d8ff" stopOpacity="0.12" />
            <stop offset="1" stopColor="#c9d8ff" stopOpacity="0.05" />
          </linearGradient>
          <filter id="beam-soft">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        {eyes.map((e, i) => (
          <polygon key={i} points={cone(e)} fill="url(#beam)" filter="url(#beam-soft)" />
        ))}
      </svg>

      <div className="projection__screen" style={{ left: s.x, top: s.y, width: s.w, height: s.h }}>
        {src ? <iframe src={src} title="" tabIndex={-1} allow="autoplay; encrypted-media" /> : null}
        {/* the still covers the film while YouTube loads and shows its start-up chrome, then fades away */}
        <span
          className={`projection__still${src ? " projection__still--cover" : ""}`}
          style={{ backgroundImage: `url('${item.hero}')` }}
        />
        <span className="projection__grain" />
      </div>
      <div className="projection__caption" style={{ left: s.x, top: s.y + s.h + 12, width: s.w }}>
        <span>Now showing</span>
        <b>{item.title}</b>
      </div>
    </div>
  );
}

const FROG = "/assets/images/Visions/web/vision-frog.png";
// cut from "pink lotus flower on water" by Photo Mania on Unsplash (Unsplash License: free, commercial use OK,
// no attribution required) — https://unsplash.com/photos/pink-lotus-flower-on-water-OOh6bdr5od4
const PAD = "/assets/images/Visions/web/lily-pad.png";

/** The Vision Frog logo itself, sitting on a real lily pad. Its eyes carry lamps that light up when it projects. */
function FrogArt({ lamps = false }: { lamps?: boolean }) {
  return (
    <span className="frog-art" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={FROG} alt="" draggable={false} />
      {lamps ? (
        <>
          <span className="frog-art__eye frog-art__eye--left" />
          <span className="frog-art__eye frog-art__eye--right" />
        </>
      ) : null}
    </span>
  );
}

/** the lily pad, with its reflection on the still water */
function LilyPad() {
  return (
    <span className="lily-pad" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={PAD} alt="" draggable={false} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="lily-pad__reflection" src={PAD} alt="" draggable={false} />
    </span>
  );
}
