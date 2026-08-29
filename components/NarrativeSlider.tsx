"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import BackLink from "@/components/BackLink";

export default function NarrativeSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const slideCount = 2;

  const goTo = useCallback((idx: number) => {
    setIndex((idx + slideCount) % slideCount);
  }, []);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    document.body.classList.add("narrative-body");
    return () => document.body.classList.remove("narrative-body");
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const dotsWrap = dotsRef.current;
    if (!track || !dotsWrap) return;

    track.style.transform = `translateX(-${index * 100}vw)`;
    dotsWrap.querySelectorAll(".dot").forEach((d, idx) => {
      d.classList.toggle("active", idx === index);
    });
  }, [index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let startX: number | null = null;
    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (startX == null) return;
      const dx = e.touches[0].clientX - startX;
      if (Math.abs(dx) > 60) {
        if (dx < 0) next();
        else prev();
        startX = null;
      }
    };
    const onTouchEnd = () => {
      startX = null;
    };

    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchmove", onTouchMove, { passive: true });
    track.addEventListener("touchend", onTouchEnd);
    return () => {
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchmove", onTouchMove);
      track.removeEventListener("touchend", onTouchEnd);
    };
  }, [next, prev]);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <>
      <BackLink href="/" fixed />
      <div className="slider" id="slider">
        <div className="track" id="track" ref={trackRef}>
          <section
            className="slide"
            style={{ backgroundImage: "url('/assets/images/banners/Banner.jpeg')" }}
          >
            <div className="content">
              <article className="card">
                <h1>Narrative</h1>
                <h2>Nowhere Near Home.</h2>
                <p>
                  <em>Written / Directed by Oliver Stemmler</em>
                </p>
                <p>
                  &ldquo;Nowhere Near Home&rdquo; tells the story of two feuding brothers who, after
                  school, are left stranded, so they decide to hitchhike home
                </p>
                <div className="stills">
                  <img src="/assets/images/narrative/2mfs.jpeg" alt="Hooper still 1" />
                  <img src="/assets/images/narrative/OliverLost.jpeg" alt="Hooper still 2" />
                  <img src="/assets/images/narrative/Shooting.jpeg" alt="Hooper still 3" />
                </div>
                <a
                  className="btn secondary"
                  href="https://www.gofundme.com/f/help-bring-olivers-nyu-thesis-film-to-life?attribution_id=sl%3A394c8e01-1291-4331-bb5a-a1f777024c55&lang=en_US&ts=1766605241&utm_campaign=man_activity_topbar&utm_content=amp17_tb&utm_medium=customer&utm_source=whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Support the Film
                </a>
              </article>
            </div>
          </section>

          {/* Hoopers Asylum — swap the banner for a film background when ready */}
          <section
            className="slide"
            style={{ backgroundImage: "url('/assets/images/banners/Banner.jpeg')" }}
          >
            <div className="content">
              <article className="card">
                <h1>Narrative</h1>
                <h2>Hoopers Asylum.</h2>
                <p>
                  <em>Written / Directed by Oliver Stemmler</em>
                </p>
                {/* Drop the image files at these paths in public/assets/images/narrative/ */}
                <div className="stills">
                  <img src="assets/images/narrative/452d1d7a-7a46-43f1-898f-e92b14b24628_rw_3840.jpg" alt="Hoopers Asylum still 1" />
                  <img src="assets/images/narrative/d18ba5c9-db9c-4fb2-83b6-b8f92bf449b7_rw_3840.jpg" alt="Hoopers Asylum still 2" />
                  <img src="assets/images/narrative/f387c407-6616-4405-8930-f15ce3aeb4f8_rw_3840.jpg" alt="Hoopers Asylum still 3" />
                </div>
                <a
                  className="btn"
                  href="https://www.youtube.com/watch?v=iPlMUPBdKpY"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch
                </a>
              </article>
            </div>
          </section>
        </div>

        <div className="nav">
          <button className="arrow" type="button" aria-label="Previous" onClick={prev}>
            &#10094;
          </button>
          <button className="arrow" type="button" aria-label="Next" onClick={next}>
            &#10095;
          </button>
        </div>

        <div className="dots" id="dots" ref={dotsRef}>
          <button
            type="button"
            className={`dot${index === 0 ? " active" : ""}`}
            aria-label="Slide 1"
            onClick={() => goTo(0)}
          />
          <button
            type="button"
            className={`dot${index === 1 ? " active" : ""}`}
            aria-label="Slide 2"
            onClick={() => goTo(1)}
          />
        </div>
      </div>
    </>
  );
}
