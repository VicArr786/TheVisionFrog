"use client";

import { useEffect, useRef, useState } from "react";
import PageLoader from "@/components/PageLoader";

/** Full-bleed looping video header for a local mp4 — same chrome as BapeVideoHeader */
export default function CampaignVideoHeader({
  src,
  vertical,
}: {
  src: string;
  /** 9:16 footage — taller header, letterboxed instead of cropped */
  vertical?: boolean;
}) {
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // the video may finish loading before hydration attaches onLoadedData
  useEffect(() => {
    if ((videoRef.current?.readyState ?? 0) >= 2) setReady(true);
  }, []);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const goFullscreen = () => {
    wrapRef.current?.requestFullscreen?.();
  };

  return (
    <div className={`bape-video-wrap${vertical ? " bape-video-wrap--vertical" : ""}`} ref={wrapRef}>
      <PageLoader ready={ready} />
      <video
        ref={videoRef}
        className="bape-video-local"
        src={src}
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setReady(true)}
        onError={() => setReady(true)}
      />
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
