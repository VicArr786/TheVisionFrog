"use client";

import { useEffect, useState } from "react";

const FADE_MS = 700;
const FAILSAFE_MS = 3000;

export default function LoadingScreen() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    let fadeTimer: ReturnType<typeof setTimeout>;

    const finish = () => {
      setHidden(true);
      fadeTimer = setTimeout(() => setRemoved(true), FADE_MS);
    };

    // wait for the brand fonts only — waiting for window "load" held the
    // overlay until every image on the page had downloaded
    let done = false;
    const finishOnce = () => {
      if (done) return;
      done = true;
      finish();
    };

    document.fonts.ready.then(finishOnce);
    const failsafe = setTimeout(finishOnce, FAILSAFE_MS);

    return () => {
      done = true;
      clearTimeout(failsafe);
      clearTimeout(fadeTimer);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      className={`vf-loading${hidden ? " vf-loading--hidden" : ""}`}
      role="status"
      aria-live="polite"
      aria-hidden={hidden}
    >
      <p className="vf-loading__text">Loading</p>
    </div>
  );
}
