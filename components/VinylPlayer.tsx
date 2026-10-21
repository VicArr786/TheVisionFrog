"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { musicVideos } from "@/lib/musicVideos";

const N = musicVideos.length;
// record slides back into the sleeve, swaps, then slides out again
const SWAP_MS = 380;
// drag distance (px) before a press counts as a flip instead of a click
const DRAG_SLOP = 6;
const DEG_PER_PX = 0.6;

const pad = (n: number) => String(n).padStart(2, "0");

/** Music videos as records — the active cover is the sleeve and the spinning label.
    Drag sideways (or hit Show credits): the record slides into the sleeve and the
    sleeve turns over to its credits. */
export default function VinylPlayer() {
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(0);
  const [out, setOut] = useState(true);
  const [angle, setAngle] = useState(0);
  const [dragging, setDragging] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const drag = useRef<{ x: number; start: number; moved: boolean } | null>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const [moreBelow, setMoreBelow] = useState(false);

  const select = useCallback((idx: number) => {
    const next = (idx + N) % N;
    setActive(next);
    setAngle(0);
    setOut(false);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setShown(next);
      setOut(true);
    }, SWAP_MS);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") select(active + 1);
      if (e.key === "ArrowLeft") select(active - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, select]);

  // long credit lists scroll — fade the bottom edge while there's more below
  const checkMore = useCallback(() => {
    const el = backRef.current;
    if (el) setMoreBelow(el.scrollTop + el.clientHeight < el.scrollHeight - 4);
  }, []);

  useEffect(() => {
    const el = backRef.current;
    if (el) el.scrollTop = 0;
    checkMore();
    window.addEventListener("resize", checkMore);
    return () => window.removeEventListener("resize", checkMore);
  }, [shown, checkMore]);

  const flip = () => setAngle((a) => Math.round(a / 180) * 180 + 180);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    drag.current = { x: e.clientX, start: angle, moved: false };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (!d.moved) {
      if (Math.abs(dx) < DRAG_SLOP) return;
      // capture only once it's a real drag, so plain clicks still reach the links
      d.moved = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      setDragging(true);
    }
    setAngle(d.start + dx * DEG_PER_PX);
  };

  const endDrag = () => {
    const d = drag.current;
    drag.current = null;
    if (!d?.moved) return;
    setDragging(false);
    setAngle((a) => Math.round(a / 180) * 180);
    // swallow the click that follows a drag
    const block = (ev: MouseEvent) => {
      ev.preventDefault();
      ev.stopPropagation();
    };
    window.addEventListener("click", block, { capture: true, once: true });
    setTimeout(() => window.removeEventListener("click", block, { capture: true }), 0);
  };

  const video = musicVideos[shown];
  const href = `/MusicVideos/${video.slug}`;
  // past 90° the back is toward the viewer — also tracks the live angle while dragging
  const facingBack = Math.cos((angle * Math.PI) / 180) < 0;
  // the record tucks into the sleeve whenever the box is turning or showing credits
  const recordOut = out && !dragging && !facingBack;
  const credits = video.credits ?? [];

  return (
    <section className="vinyl" aria-roledescription="carousel" aria-label="Music videos">
      <div className="vinyl__main">
        <div className="vinyl__deck">
          <div
            className={`vinyl__stage${recordOut ? " vinyl__stage--out" : ""}${dragging ? " vinyl__stage--dragging" : ""}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onDragStart={(e) => e.preventDefault()}
          >
            <div
              className={`vinyl__card${facingBack ? " vinyl__card--back" : ""}`}
              style={{ transform: `rotateY(${angle}deg)` }}
            >
              <div className="vinyl__face vinyl__face--front" aria-hidden={facingBack}>
                <Link
                  href={href}
                  className="vinyl__record"
                  tabIndex={facingBack ? -1 : 0}
                  aria-label={`Open ${video.artist} — ${video.title}`}
                >
                  <span className="vinyl__disc">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="vinyl__label" src={video.thumbnail} alt="" draggable={false} />
                    <span className="vinyl__hole" />
                  </span>
                  <span className="vinyl__sheen" aria-hidden="true" />
                </Link>

                <Link href={href} className="vinyl__sleeve" tabIndex={-1} aria-hidden="true">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={video.thumbnail} alt="" draggable={false} />
                </Link>
              </div>

              <div
                ref={backRef}
                className={`vinyl__face vinyl__face--back${moreBelow ? " vinyl__face--more" : ""}`}
                aria-hidden={!facingBack}
                onScroll={checkMore}
              >
                <span className="vinyl__back-tag">Side B</span>
                <h3 className="vinyl__back-artist">{video.artist}</h3>
                <p className="vinyl__back-title">{video.title}</p>
                {credits.length ? (
                  <dl className={`vinyl__credits${credits.length > 5 ? " vinyl__credits--dense" : ""}`}>
                    {credits.map((c) => (
                      <div key={c.role} className="vinyl__credit">
                        <dt>{c.role}</dt>
                        <dd>{c.name}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="vinyl__credits-empty">Credits coming soon.</p>
                )}
              </div>
            </div>
          </div>

          <p className="vinyl__hint">
            Drag the record to flip it ·{" "}
            <button type="button" className="vinyl__flip" onClick={flip}>
              {facingBack ? "Show cover" : "Show credits"}
            </button>
          </p>
        </div>

        <div className="vinyl__info" aria-live="polite">
          <span className="vinyl__index">
            {pad(active + 1)} / {pad(N)}
          </span>
          <h2 className="vinyl__artist">{musicVideos[active].artist}</h2>
          <p className="vinyl__title">{musicVideos[active].title}</p>

          <div className="vinyl__actions">
            <a
              href={musicVideos[active].youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-primary--solid"
            >
              Watch on YouTube
            </a>
            <Link href={`/MusicVideos/${musicVideos[active].slug}`} className="btn-primary">
              View project
            </Link>
          </div>

          <div className="vinyl__arrows">
            <button type="button" className="vinyl__arrow" aria-label="Previous record" onClick={() => select(active - 1)}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <button type="button" className="vinyl__arrow" aria-label="Next record" onClick={() => select(active + 1)}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <ul className="vinyl__crate" role="list" aria-label="All records">
        {musicVideos.map((v, i) => (
          <li key={v.slug}>
            <button
              type="button"
              className={`vinyl__crate-item${i === active ? " vinyl__crate-item--active" : ""}`}
              aria-pressed={i === active}
              aria-label={`${v.artist} — ${v.title}`}
              onClick={() => select(i)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={v.thumbnail} alt="" loading="lazy" />
              <span className="vinyl__crate-artist">{v.artist}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
