"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { musicVideos } from "@/lib/musicVideos";

const N = musicVideos.length;
// record slides back into the sleeve, swaps, then slides out again
const SWAP_MS = 380;

const pad = (n: number) => String(n).padStart(2, "0");

/** Music videos as records — the active cover is the sleeve and the spinning label */
export default function VinylPlayer() {
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(0);
  const [out, setOut] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const select = useCallback((idx: number) => {
    const next = (idx + N) % N;
    setActive(next);
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

  const video = musicVideos[shown];
  const href = `/MusicVideos/${video.slug}`;

  return (
    <section className="vinyl" aria-roledescription="carousel" aria-label="Music videos">
      <div className="vinyl__main">
        <div className={`vinyl__stage${out ? " vinyl__stage--out" : ""}`}>
          <Link href={href} className="vinyl__record" aria-label={`Open ${video.artist} — ${video.title}`}>
            <span className="vinyl__disc">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="vinyl__label" src={video.thumbnail} alt="" />
              <span className="vinyl__hole" />
            </span>
            <span className="vinyl__sheen" aria-hidden="true" />
          </Link>

          <Link href={href} className="vinyl__sleeve" tabIndex={-1} aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={video.thumbnail} alt="" />
          </Link>
        </div>

        <div className="vinyl__info" aria-live="polite">
          <span className="vinyl__index">
            {pad(active + 1)} / {pad(N)}
          </span>
          <h2 className="vinyl__artist">{musicVideos[active].artist}</h2>
          <p className="vinyl__title">{musicVideos[active].title}</p>

          <div className="vinyl__actions">
            <Link href={`/MusicVideos/${musicVideos[active].slug}`} className="btn-primary btn-primary--solid">
              View project
            </Link>
            <a
              href={musicVideos[active].youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Watch on YouTube
            </a>
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
