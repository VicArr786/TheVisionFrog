"use client";

import { useEffect, useRef, useState } from "react";
import { SOCIAL } from "@/lib/site";
import { verticals } from "@/lib/verticals";

const pad = (n: number) => String(n).padStart(2, "0");

/** Instagram-reels style feed — one 9:16 video per screen, snap scrolling, plays the one in view */
export default function VerticalsFeed() {
  const feedRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [current, setCurrent] = useState(0);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const feed = feedRef.current;
    if (!feed) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.idx);
          const video = videoRefs.current[idx];
          if (!video) return;
          if (entry.isIntersecting) {
            setCurrent(idx);
            setPaused(false);
            video.currentTime = 0;
            video.play().catch(() => setPaused(true));
          } else {
            video.pause();
          }
        });
      },
      { root: feed, threshold: 0.6 }
    );
    feed.querySelectorAll<HTMLElement>(".reel").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((v) => {
      if (v) v.muted = muted;
    });
  }, [muted]);

  const go = (idx: number) => {
    const feed = feedRef.current;
    if (!feed || idx < 0 || idx >= verticals.length) return;
    feed.scrollTo({ top: idx * feed.clientHeight, behavior: "smooth" });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") { e.preventDefault(); go(current + 1); }
      if (e.key === "ArrowUp") { e.preventDefault(); go(current - 1); }
      if (e.key === "m") setMuted((m) => !m);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current]);

  const togglePlay = (idx: number) => {
    const v = videoRefs.current[idx];
    if (!v) return;
    if (v.paused) {
      v.play();
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  };

  return (
    <div className="verticals-feed" ref={feedRef}>
      {verticals.map((reel, i) => (
        <section key={reel.slug} className="reel" data-idx={i} aria-label={`${reel.client} — ${reel.title}`}>
          <div className="reel__frame">
            <video
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              className="reel__video"
              src={reel.src}
              poster={reel.poster}
              muted
              loop
              playsInline
              preload={i < 2 ? "auto" : "metadata"}
              onClick={() => togglePlay(i)}
            />

            {paused && current === i ? (
              <span className="reel__paused" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            ) : null}

            <div className="reel__info">
              <span className="reel__client">{reel.client}</span>
              <h2 className="reel__title">{reel.title}</h2>
              <a
                className="reel__ig"
                href={reel.instagram ?? SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Instagram →
              </a>
            </div>

            <div className="reel__rail">
              <button
                type="button"
                className="reel__btn"
                aria-label={muted ? "Unmute" : "Mute"}
                onClick={() => setMuted((m) => !m)}
              >
                {muted ? (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                )}
              </button>
              <span className="reel__count">
                {pad(i + 1)}
                <br />
                {pad(verticals.length)}
              </span>
            </div>
          </div>
        </section>
      ))}

      <div className="verticals-nav">
        <button type="button" className="reel__btn" aria-label="Previous" disabled={current === 0} onClick={() => go(current - 1)}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
            <path d="M6 15l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button
          type="button"
          className="reel__btn"
          aria-label="Next"
          disabled={current === verticals.length - 1}
          onClick={() => go(current + 1)}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
