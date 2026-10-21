"use client";

import { useEffect, useRef, useState } from "react";

interface YTPlayer {
  mute(): void;
  unMute(): void;
  setVolume(n: number): void;
  playVideo(): void;
}

declare global {
  interface Window {
    YT: {
      Player: new (
        el: string | HTMLElement,
        options: {
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: { onReady?: (e: { target: YTPlayer }) => void };
        }
      ) => YTPlayer;
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function BapeVideoHeader() {
  const [muted, setMuted] = useState(true);
  const playerRef = useRef<YTPlayer | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = () => {
      new window.YT.Player("yt-bape-player", {
        videoId: "BN9bn9N3Auk", // update with the Bape commercial video ID
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: "BN9bn9N3Auk",
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
        },
        events: {
          onReady: (e) => {
            playerRef.current = e.target;
            e.target.playVideo();
          },
        },
      });
    };

    if (window.YT?.Player) {
      init();
    } else {
      window.onYouTubeIframeAPIReady = init;
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
    }
  }, []);

  const toggleMute = () => {
    const p = playerRef.current;
    if (!p) return;
    if (muted) {
      p.unMute();
      p.setVolume(80);
    } else {
      p.mute();
    }
    setMuted((m) => !m);
  };

  const goFullscreen = () => {
    wrapRef.current?.requestFullscreen?.();
  };

  return (
    <div className="bape-video-wrap" ref={wrapRef}>
      <div id="yt-bape-player" className="bape-video-yt" />
      <div className="bape-video-controls">
        <button
          type="button"
          className="bape-video-btn"
          onClick={toggleMute}
          aria-label={muted ? "Unmute video" : "Mute video"}
        >
          {muted ? (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
              <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
              <path d="M11 5L6 9H2v6h4l5 4V5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
        <button
          type="button"
          className="bape-video-btn"
          onClick={goFullscreen}
          aria-label="Fullscreen"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
