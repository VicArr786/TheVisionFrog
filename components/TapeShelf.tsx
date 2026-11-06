"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import TapeTV, { TapeBox, type TapeOrigin } from "@/components/TapeTV";
import "@/styles/pages/Tapes.css";

export type Tape = {
  slug: string;
  href: string;
  /** catalogue number on the label, e.g. "VFN-01" */
  code: string;
  /** rendered in NHG Titles — no &, ×, — or : */
  title: string;
  format: string;
  blurb: string;
  art: string;
  color: string;
  youtubeId?: string;
  cta?: { label: string; href: string };
};

type TapeShelfProps = {
  tapes: Tape[];
  /** blank, unclickable tapes racked behind the real ones so a short list still reads as a shelf */
  blanks?: number;
};

// px of drag that moves the rack on by one tape
const DRAG_STEP = 64;
// scroll-spy stays out of the way this long after the visitor picks a tape by hand
const QUIET_MS = 900;
const STACKED = "(max-width: 860px)";

const pad = (n: number) => String(n).padStart(2, "0");

/** Isometric VHS rack: the active tape lifts out, and clicking a tape feeds it into the TV.
    Drag or swipe to flip through; on phones the list scrolls under the rack and drives it. */
export default function TapeShelf({ tapes, blanks = 0 }: TapeShelfProps) {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState<{ tape: Tape; origin: TapeOrigin } | null>(null);
  const activeRef = useRef(0);
  const loadedRef = useRef(false);
  loadedRef.current = loaded !== null;
  const stageRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  const quietUntil = useRef(0);
  const dragged = useRef(false);

  const go = useCallback((i: number) => {
    activeRef.current = i;
    setActive(i);
  }, []);

  /** a pick made on the rack — keep the matching row in view on phones */
  const pick = useCallback(
    (i: number) => {
      go(i);
      quietUntil.current = performance.now() + QUIET_MS;
      if (window.matchMedia(STACKED).matches) {
        rowRefs.current[i]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    },
    [go]
  );

  const step = useCallback(
    (dir: 1 | -1) => {
      const next = activeRef.current + dir;
      if (next >= 0 && next < tapes.length) pick(next);
    },
    [tapes.length, pick]
  );

  /** measure the tape where it sits in the rack, so it can fly from there to the VCR */
  const play = (i: number) => {
    const stage = stageRef.current;
    const face = stage?.querySelector(`[data-tape="${i}"] .unit__face--front`);
    const scene = stage?.querySelector(".rack__scene");
    if (!stage || !face || !scene) return;
    const r = face.getBoundingClientRect();
    go(i);
    quietUntil.current = performance.now() + QUIET_MS;
    setLoaded({
      tape: tapes[i],
      origin: {
        x: r.left + r.width / 2,
        y: r.top + r.height / 2,
        fontSize: parseFloat(getComputedStyle(scene).fontSize),
      },
    });
  };

  // drag / swipe across the rack; vertical touch still scrolls the page
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let down = false;
    let startX = 0;
    let startIndex = 0;

    const onDown = (e: PointerEvent) => {
      down = true;
      dragged.current = false;
      startX = e.clientX;
      startIndex = activeRef.current;
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 8) {
        dragged.current = true;
        stage.classList.add("rack--dragging");
      }
      const next = Math.max(0, Math.min(tapes.length - 1, startIndex - Math.round(dx / DRAG_STEP)));
      if (next !== activeRef.current) pick(next);
    };
    const onUp = () => {
      down = false;
      stage.classList.remove("rack--dragging");
    };

    stage.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      stage.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [tapes.length, pick]);

  // arrow keys, same as the music video player
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (loadedRef.current || (e.key !== "ArrowLeft" && e.key !== "ArrowRight")) return;
      e.preventDefault();
      step(e.key === "ArrowRight" ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  // phones: the list scrolls under the pinned rack and picks the row it reaches
  useEffect(() => {
    const stacked = window.matchMedia(STACKED);
    let raf = 0;
    const measure = () => {
      raf = 0;
      if (!stacked.matches || performance.now() < quietUntil.current) return;
      const floor = stageRef.current?.getBoundingClientRect().bottom ?? 0;
      const line = floor + (window.innerHeight - floor) * 0.3;
      let best = activeRef.current;
      let bestDist = Infinity;
      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        const r = row.getBoundingClientRect();
        const dist = Math.abs(r.top + r.height / 2 - line);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      if (best !== activeRef.current) go(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [go]);

  const slots = tapes.length + blanks;
  const activeSlot = blanks + active;

  const slotClass = (slot: number, out = false) =>
    `rack__slot${slot === activeSlot ? " is-active" : slot > activeSlot ? " is-front" : ""}${out ? " is-out" : ""}`;
  const slotStyle = (slot: number) => ({ "--slot": slot, "--slots": slots } as React.CSSProperties);

  return (
    <div className="shelf">
      <div className="shelf__rack">
        <div
          className="rack"
          ref={stageRef}
          onClickCapture={(e) => {
            if (dragged.current) {
              e.preventDefault();
              e.stopPropagation();
              dragged.current = false;
            }
          }}
          onDragStart={(e) => e.preventDefault()}
        >
          <div className="rack__scene">
            <span className="rack__floor" aria-hidden="true" />
            {Array.from({ length: blanks }, (_, i) => (
              <div key={i} className={slotClass(i)} style={slotStyle(i)} aria-hidden="true">
                <div className="unit unit--blank">
                  <TapeBox />
                </div>
              </div>
            ))}
            {tapes.map((tape, i) => (
              <div
                key={tape.slug}
                className={slotClass(blanks + i, loaded?.tape.slug === tape.slug)}
                style={slotStyle(blanks + i)}
                data-tape={i}
              >
                {/* a real link so ctrl/cmd-click still opens the film page; the rows below are the keyboard route */}
                <Link
                  href={tape.href}
                  className="unit"
                  tabIndex={-1}
                  aria-hidden="true"
                  draggable={false}
                  style={{ "--c": tape.color } as React.CSSProperties}
                  onClick={(e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                    e.preventDefault();
                    play(i);
                  }}
                >
                  <TapeBox tape={tape} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="shelf__pager">
          <button type="button" onClick={() => step(-1)} aria-label="Previous tape" disabled={active === 0}>
            ←
          </button>
          <span aria-live="polite">
            {pad(active + 1)} / {pad(tapes.length)}
          </span>
          <button type="button" onClick={() => step(1)} aria-label="Next tape" disabled={active === tapes.length - 1}>
            →
          </button>
        </div>
      </div>

      <ol className="shelf__list" role="list">
        {tapes.map((tape, i) => (
          <li
            key={tape.slug}
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
            className={`shelf-row${i === active ? " is-active" : ""}`}
            style={{ "--c": tape.color } as React.CSSProperties}
            onMouseEnter={() => go(i)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="shelf-row__art" src={tape.art} alt="" loading="lazy" />
            <button type="button" className="shelf-row__play" onClick={() => play(i)} onFocus={() => go(i)}>
              <span className="shelf-row__head">
                <span className="shelf-row__mark" aria-hidden="true" />
                <span className="shelf-row__code">{tape.code}</span>
                <span className="shelf-row__title">{tape.title}</span>
              </span>
              <span className="shelf-row__blurb">{tape.blurb}</span>
              <span className="shelf-row__cta">▶ Play the tape</span>
            </button>
            <Link href={tape.href} className="shelf-row__page">
              Film page <span aria-hidden="true">↗</span>
            </Link>
          </li>
        ))}
      </ol>

      {loaded ? <TapeTV tape={loaded.tape} origin={loaded.origin} onClosed={() => setLoaded(null)} /> : null}
    </div>
  );
}
