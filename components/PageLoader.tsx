"use client";

import { useEffect, useState } from "react";

const FADE_MS = 700;
// fast or cached loads never see the overlay
const SHOW_AFTER_MS = 350;
// never trap anyone behind it on a slow connection
const FAILSAFE_MS = 8000;

/** Per-page loading overlay (same look as LoadingScreen) for pages whose main
    media can lag — shown only if `ready` hasn't flipped within SHOW_AFTER_MS */
export default function PageLoader({ ready }: { ready: boolean }) {
  const [visible, setVisible] = useState(false);
  const [gaveUp, setGaveUp] = useState(false);
  const [removed, setRemoved] = useState(false);
  const done = ready || gaveUp;

  useEffect(() => {
    const show = setTimeout(() => setVisible(true), SHOW_AFTER_MS);
    const failsafe = setTimeout(() => setGaveUp(true), FAILSAFE_MS);
    return () => {
      clearTimeout(show);
      clearTimeout(failsafe);
    };
  }, []);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setRemoved(true), FADE_MS);
    return () => clearTimeout(t);
  }, [done]);

  if (removed || !visible) return null;

  return (
    <div
      className={`vf-loading${done ? " vf-loading--hidden" : ""}`}
      role="status"
      aria-live="polite"
      aria-hidden={done}
    >
      <p className="vf-loading__text">Loading</p>
    </div>
  );
}
