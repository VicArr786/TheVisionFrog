"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { musicVideos, type MusicVideo } from "@/lib/musicVideos";

const N = musicVideos.length;
// cover-flow cards further than this from the active one are hidden
const FLOW_RANGE = 3;
// horizontal swipe distance (px) that counts as next / previous
const SWIPE = 40;

const youtubeId = (url: string) =>
  url.match(/[?&]v=([^&]+)/)?.[1] ?? url.match(/youtu\.be\/([^?]+)/)?.[1];

const pad = (n: number) => String(n).padStart(2, "0");

const Icon = {
  prev: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M11 6v12L3 12l8-6Zm10 0v12l-8-6 8-6Z" fill="currentColor" />
    </svg>
  ),
  next: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13 6v12l8-6-8-6ZM3 6v12l8-6-8-6Z" fill="currentColor" />
    </svg>
  ),
  play: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 4.5v15l13-7.5-13-7.5Z" fill="currentColor" />
    </svg>
  ),
  stop: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
      <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2.2" fill="none" />
      <path d="m16 16 4.5 4.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  ),
  list: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  external: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

/** Music videos as a glassy desktop music player: blurred cover backdrop,
    "Continue Playing" queue, 3D cover-flow, and a search + transport bar. */
export default function GlassPlayer() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [query, setQuery] = useState("");
  const [listOpen, setListOpen] = useState(true);
  // only the outgoing + incoming backdrops are mounted — blurred full-screen
  // layers are the most expensive thing on the page
  const [bgs, setBgs] = useState<[number | null, number]>([null, 0]);
  // background clips only play when the viewer hasn't asked for reduced motion
  const [motionOk, setMotionOk] = useState(false);
  useEffect(() => {
    setMotionOk(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  const swipe = useRef<number | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const select = useCallback((idx: number) => {
    setActive((idx + N) % N);
    setPlaying(false);
  }, []);

  useEffect(() => {
    setBgs(([, cur]) => (cur === active ? [null, cur] : [cur, active]));
  }, [active]);

  // the outgoing backdrop is unmounted once the fade is done
  useEffect(() => {
    if (bgs[0] === null) return;
    const t = setTimeout(() => setBgs(([, cur]) => [null, cur]), 900);
    return () => clearTimeout(t);
  }, [bgs]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.closest("input, textarea");
      if (e.key === "Escape") {
        setPlaying(false);
        setQuery("");
        return;
      }
      if (typing) return;
      if (e.key === "ArrowRight") select(active + 1);
      else if (e.key === "ArrowLeft") select(active - 1);
      else if (e.key === "/") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, select]);

  const q = query.trim().toLowerCase();
  const results = useMemo(
    () =>
      q
        ? musicVideos
            .map((v, i) => ({ v, i }))
            .filter(({ v }) => `${v.artist} ${v.title}`.toLowerCase().includes(q))
        : [],
    [q],
  );
  const artists = useMemo(() => {
    const seen = new Map<string, { v: MusicVideo; i: number; count: number }>();
    for (const r of results) {
      const hit = seen.get(r.v.artist);
      if (hit) hit.count++;
      else seen.set(r.v.artist, { ...r, count: 1 });
    }
    return [...seen.values()];
  }, [results]);

  const pick = (i: number) => {
    select(i);
    setQuery("");
  };

  const video = musicVideos[active];
  const ytId = youtubeId(video.youtubeUrl);
  const href = `/MusicVideos/${video.slug}`;

  return (
    <section
      className={`gp${listOpen ? "" : " gp--nolist"}`}
      aria-roledescription="carousel"
      aria-label="Music videos"
      onPointerDown={(e) => {
        // click off the search panel closes it
        if (query && !(e.target as HTMLElement).closest(".gp__dock")) setQuery("");
      }}
      onClick={(e) => {
        // click off the playing video closes it
        if (playing && !(e.target as HTMLElement).closest(".gp__frame")) setPlaying(false);
      }}
    >
      <h1 className="gp__sr">Music Videos</h1>
      {/* ambient backdrop — the new cover fades in over the old one */}
      <div className="gp__bg" aria-hidden="true">
        {bgs.map((i, layer) => {
          if (i === null) return null;
          const v = musicVideos[i];
          const cls = layer ? "is-in" : "";
          return v.clip && motionOk ? (
            <video
              key={v.slug}
              className={`${cls} gp__bg-clip`}
              src={v.clip}
              poster={v.thumbnail}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={v.slug} src={v.thumbnail} alt="" className={cls} />
          );
        })}
      </div>

      {!listOpen ? (
        <button type="button" className="gp__list-toggle" onClick={() => setListOpen(true)} aria-label="Show video list">
          {Icon.list} List
        </button>
      ) : null}

      <aside className="gp__queue" aria-label="Queue" hidden={!listOpen}>
        <header className="gp__queue-head">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={video.thumbnail} alt="" />
          <div>
            <strong>Continue Playing</strong>
            <span>Up next on Vision Frog</span>
          </div>
          <button type="button" className="gp__hide" onClick={() => setListOpen(false)} aria-label="Hide video list">
            Hide
          </button>
        </header>
        <ol className="gp__queue-list">
          {musicVideos.map((v, i) => (
            <li key={v.slug}>
              <button
                type="button"
                className={`gp__track${i === active ? " is-active" : ""}`}
                // distance from the playing video — rows recede into the panel with it
                style={{ "--d": Math.min(Math.abs(i - active), 6) } as React.CSSProperties}
                aria-current={i === active}
                onClick={() => select(i)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={v.thumbnail} alt="" loading="lazy" />
                <span className="gp__track-text">
                  <span className="gp__track-title">{v.title}</span>
                  <span className="gp__track-artist">{v.artist}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
        <Link href={href} className="gp__see">
          <span>
            See project
            <small>
              {video.artist} — {video.title}
            </small>
          </span>
          <span aria-hidden="true">→</span>
        </Link>
      </aside>

      <div
        className={`gp__flow${playing ? " is-playing" : ""}`}
        onPointerDown={(e) => {
          swipe.current = e.clientX;
        }}
        onPointerUp={(e) => {
          const start = swipe.current;
          swipe.current = null;
          if (start === null || playing) return;
          const dx = e.clientX - start;
          if (Math.abs(dx) > SWIPE) select(active + (dx < 0 ? 1 : -1));
        }}
      >
        {musicVideos.map((v, i) => {
          // shortest way round the loop, so the flow wraps both directions
          let off = i - active;
          if (off > N / 2) off -= N;
          if (off < -N / 2) off += N;
          const abs = Math.abs(off);
          const isActive = off === 0;
          // far cards aren't rendered at all; one extra stays mounted (invisible) so it can slide in
          if (abs > FLOW_RANGE + 1) return null;
          return (
            <button
              key={v.slug}
              type="button"
              className={`gp__card${isActive ? " is-active" : ""}`}
              style={
                {
                  "--off": off,
                  "--abs": abs,
                  zIndex: 10 - abs,
                  opacity: abs > FLOW_RANGE ? 0 : 1,
                  pointerEvents: abs > FLOW_RANGE ? "none" : undefined,
                } as React.CSSProperties
              }
              tabIndex={abs > FLOW_RANGE ? -1 : 0}
              aria-label={isActive ? `Play ${v.artist} — ${v.title}` : `${v.artist} — ${v.title}`}
              onClick={() => (isActive ? setPlaying(true) : select(i))}
            >
              <span className="gp__card-art">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={v.thumbnail} alt="" draggable={false} />
                {isActive ? <span className="gp__card-play">{Icon.play}</span> : null}
              </span>
              <span className="gp__card-title">{v.title}</span>
              <span className="gp__card-artist">{v.artist}</span>
            </button>
          );
        })}

      </div>

      {playing && ytId ? (
        <div className="gp__modal" role="dialog" aria-modal="true" aria-label={`${video.artist} — ${video.title}`}>
          <div className="gp__frame">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`}
              title={`${video.artist} — ${video.title}`}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </div>
          <div className="gp__modal-bar gp__frame">
            <span>
              <strong>{video.title}</strong> {video.artist}
            </span>
            <Link href={href} className="gp__pill">
              See project
            </Link>
          </div>
          <button type="button" className="gp__close" aria-label="Close video">
            ×
          </button>
        </div>
      ) : null}

      <div className="gp__dock">
        {q ? (
          <div className="gp__results" role="listbox" aria-label="Search results">
            {results.length ? (
              <>
                <p className="gp__results-label">Top Results</p>
                <div className="gp__results-row">
                  {results.map(({ v, i }) => (
                    <button key={v.slug} type="button" className="gp__result" onClick={() => pick(i)}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={v.thumbnail} alt="" />
                      <span className="gp__result-title">{v.title}</span>
                      <span className="gp__result-meta">Video · {v.artist}</span>
                    </button>
                  ))}
                </div>
                <p className="gp__results-label">Artists</p>
                <div className="gp__results-row">
                  {artists.map(({ v, i, count }) => (
                    <button key={v.artist} type="button" className="gp__result gp__result--artist" onClick={() => pick(i)}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={v.thumbnail} alt="" />
                      <span className="gp__result-title">{v.artist}</span>
                      <span className="gp__result-meta">
                        Artist · {count} video{count > 1 ? "s" : ""}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <p className="gp__results-empty">Keep typing…</p>
            )}
          </div>
        ) : null}

        <div className="gp__bar">
          <label className="gp__search">
            {Icon.search}
            <input
              ref={searchRef}
              type="search"
              placeholder="Search music videos"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && results[0]) pick(results[0].i);
                if (e.key === "Escape") setQuery("");
              }}
              aria-label="Search music videos"
            />
          </label>

          <div className="gp__transport">
            <span className={`gp__rec${playing ? " is-live" : ""}`} aria-hidden="true" />
            <button type="button" aria-label="Previous video" onClick={() => select(active - 1)}>
              {Icon.prev}
            </button>
            <button
              type="button"
              className="gp__play"
              aria-label={playing ? "Stop video" : "Play video"}
              onClick={() => setPlaying((p) => !p)}
            >
              {playing ? Icon.stop : Icon.play}
            </button>
            <button type="button" aria-label="Next video" onClick={() => select(active + 1)}>
              {Icon.next}
            </button>
          </div>

          <div className="gp__now" aria-live="polite">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={video.thumbnail} alt="" />
            <div className="gp__now-text">
              <strong>{video.title}</strong>
              <span>{video.artist}</span>
              <span className="gp__progress" aria-hidden="true">
                <span style={{ width: `${((active + 1) / N) * 100}%` }} />
              </span>
            </div>
            <span className="gp__count">
              {pad(active + 1)} / {pad(N)}
            </span>
          </div>

          <div className="gp__links">
            <Link href={href} className="gp__pill">
              Project
            </Link>
            <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="gp__icon" aria-label="Watch on YouTube">
              {Icon.external}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
