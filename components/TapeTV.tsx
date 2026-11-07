"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Tape } from "@/components/TapeShelf";

/** where the tape was in the rack when it was clicked */
export type TapeOrigin = { x: number; y: number; fontSize: number };

type Phase = "insert" | "static" | "play" | "eject";

// tape size in em — matches the --w / --h in Tapes.css
const TAPE_W = 24;
const TAPE_H = 13.4;
const STATIC_MS = 600;

// the camera, and matching values on .tv-stage: looking down at the VCR from above its slot
const PERSPECTIVE = 1500;
const CAMERA_Y = 0.28;
// the tape starts this far in front of the TV so it never cuts through the set, shrunk to look the same size
const START_Z = 240;
// how far past the door the tape rests
const SEATED_Z = 14;

const FLIGHT = { duration: 1700, fill: "both" } as const;

/** rack camera angle at the start of the flight, tipped flat with the spine facing you by the end */
const pose = (x: number, y: number, z: number, a: number, b: number, c: number, s: number) =>
  `translate3d(${x}px, ${y}px, ${z}px) rotateX(${a}deg) rotateZ(${b}deg) rotateX(${c}deg) scale3d(${s}, ${s}, ${s})`;

/** Modal TV + VCR. The clicked tape tips flat, the VCR door swings in and the tape slides through
    the slot, the set warms up through static, then the film plays. Eject runs it all backwards. */
export default function TapeTV({
  tape,
  origin,
  onClosed,
}: {
  tape: Tape;
  origin: TapeOrigin;
  onClosed: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("insert");
  const phaseRef = useRef<Phase>("insert");
  const sceneRef = useRef<HTMLDivElement>(null);
  const mouthRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLSpanElement>(null);
  const flyRef = useRef<HTMLDivElement>(null);
  const ejectRef = useRef<HTMLButtonElement>(null);
  const animsRef = useRef<Animation[]>([]);
  const timerRef = useRef(0);

  const show = (next: Phase) => {
    phaseRef.current = next;
    setPhase(next);
  };

  useLayoutEffect(() => {
    const mouth = mouthRef.current;
    const flap = flapRef.current;
    const fly = flyRef.current;
    if (!mouth || !flap || !fly) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timing = { ...FLIGHT, duration: reduced ? 1 : FLIGHT.duration };
    const m = mouth.getBoundingClientRect();
    const w = TAPE_W * origin.fontSize;
    const h = TAPE_H * origin.fontSize;
    const s = (m.width - 10) / w;
    const x = m.left + m.width / 2 - w / 2;
    const y = m.top + m.height / 2 - h / 2;
    const depth = (h * s) / 2;

    // undo the perspective at START_Z so the tape appears exactly where it sat in the rack
    const k = (PERSPECTIVE - START_Z) / PERSPECTIVE;
    const camX = window.innerWidth / 2;
    const camY = window.innerHeight * CAMERA_Y;
    const fromX = camX + (origin.x - camX) * k - w / 2;
    const fromY = camY + (origin.y - camY) * k - h / 2;

    const anims = [
      fly.animate(
        [
          { offset: 0, transform: pose(fromX, fromY, START_Z, 58, -36, -82, k), easing: "cubic-bezier(0.5, 0, 0.2, 1)" },
          { offset: 0.52, transform: pose(x, y, depth + 40, 0, 0, -90, s) },
          { offset: 0.62, transform: pose(x, y, depth + 40, 0, 0, -90, s), easing: "cubic-bezier(0.45, 0, 0.3, 1)" },
          { offset: 1, transform: pose(x, y, -depth - SEATED_Z, 0, 0, -90, s) },
        ],
        timing
      ),
      flap.animate(
        [
          { offset: 0, transform: "translateZ(-0.2rem) rotateX(0deg)" },
          { offset: 0.56, transform: "translateZ(-0.2rem) rotateX(0deg)", easing: "ease-out" },
          { offset: 0.64, transform: "translateZ(-0.2rem) rotateX(-82deg)" },
          { offset: 0.93, transform: "translateZ(-0.2rem) rotateX(-82deg)", easing: "ease-in" },
          { offset: 1, transform: "translateZ(-0.2rem) rotateX(0deg)" },
        ],
        timing
      ),
    ];
    animsRef.current = anims;
    anims[0].onfinish = () => {
      show("static");
      timerRef.current = window.setTimeout(() => show("play"), reduced ? 0 : STATIC_MS);
    };
    return () => {
      window.clearTimeout(timerRef.current);
      anims.forEach((a) => a.cancel());
    };
  }, [origin]);

  const close = useCallback(() => {
    if (phaseRef.current === "eject") return;
    window.clearTimeout(timerRef.current);
    show("eject");
    const [fly] = animsRef.current;
    if (!fly || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onClosed();
      return;
    }
    fly.onfinish = onClosed;
    animsRef.current.forEach((a) => a.reverse());
  }, [onClosed]);

  // freeze the page behind the set, take focus, give it back on the way out
  useEffect(() => {
    const before = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ejectRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      before?.focus?.({ preventScroll: true });
    };
  }, [close]);

  const running = phase === "play" || phase === "static";

  return (
    <div
      className={`tv-room tv-room--${phase}`}
      role="dialog"
      aria-modal="true"
      aria-label={`Now playing ${tape.title}`}
      onClick={(e) => {
        if (e.target === sceneRef.current) close();
      }}
    >
      <div className="tv-room__dim" />

      <div className="tv-stage" style={{ perspective: PERSPECTIVE, perspectiveOrigin: `50% ${CAMERA_Y * 100}%` }}>
        <div className="tv-scene" ref={sceneRef}>
          <div className="tv">
            <div className="tv__set tv-fade">
              <div className="tv__bezel">
              <div className="tv__screen">
                {phase === "play" ? (
                  tape.youtubeId ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${tape.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                      title={tape.title}
                      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                      allowFullScreen
                    />
                  ) : (
                    <div className="tv__card" style={{ backgroundImage: `url('${tape.art}')` }}>
                      <span className="tv__card-title">{tape.title}</span>
                      <span className="tv__card-note">{tape.format} - not on tape yet</span>
                      {tape.cta ? (
                        <a href={tape.cta.href} target="_blank" rel="noopener noreferrer" className="btn-primary btn-primary--solid">
                          {tape.cta.label}
                        </a>
                      ) : null}
                    </div>
                  )
                ) : null}
                <span className="tv__static" aria-hidden="true" />
                <span className="tv__glass" aria-hidden="true" />
              </div>
              </div>

              <div className="tv__strip" aria-hidden="true">
                <span className="tv__badge">Vision Frog</span>
                <span className="tv__grill" />
                <span className="tv__controls">
                  <span className="tv__ch">
                    <span className="tv__ch-label">Ch</span>
                    <i />
                    <i />
                    <span className="tv__ch-label">Vol</span>
                    <i />
                    <i />
                  </span>
                  <span className={`tv__led${running ? " is-on" : ""}`} />
                  <span className="tv__power">
                    <i />
                    Power
                  </span>
                </span>
              </div>
            </div>

            <div className="tv__vcr">
              <div className="tv__plate tv__plate--left tv-fade">
                <span className="tv__display" aria-hidden="true">
                  <small>{running ? "PLAY" : "STOP"}</small>
                  {running ? tape.code : "12:00"}
                </span>
              </div>
              <div className="tv__plate tv__plate--top tv-fade">
                <span className="tv__brand" aria-hidden="true">
                  <b>VF</b> Video Cassette Recorder
                </span>
              </div>
              <div className="tv__mouth" ref={mouthRef} aria-hidden="true">
                <span className="tv__throat tv-fade" />
                <span className="tv__flap tv-fade" ref={flapRef}>
                  Video Cassette
                </span>
              </div>
              <div className="tv__plate tv__plate--bottom tv-fade" />
              <div className="tv__plate tv__plate--right tv-fade">
                <span className="tv__keys" aria-hidden="true">
                  {["Rew", "Play", "FF"].map((k) => (
                    <span key={k} className={`tv__key${k === "Play" && running ? " is-on" : ""}`}>
                      <i />
                      {k}
                    </span>
                  ))}
                </span>
                <button type="button" className="tv__eject" onClick={close} ref={ejectRef}>
                  ⏏ Eject
                </button>
              </div>
            </div>

            <div className="tv__meta tv-fade">
              <span className="tv__title">{tape.title}</span>
              <Link href={tape.href} className="tv__page">
                Film page <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          <div
            className="tape-fly is-active"
            ref={flyRef}
            aria-hidden="true"
            style={{ "--c": tape.color, fontSize: origin.fontSize } as React.CSSProperties}
          >
            <TapeBox tape={tape} />
          </div>
        </div>
      </div>
    </div>
  );
}

/** front plus the edges visible from the rack, and the shell you see once it's tipped flat */
export function TapeBox({ tape }: { tape?: Tape }) {
  return (
    <span className="unit__box">
      <span className="unit__face unit__face--front">
        <TapeFront tape={tape} />
      </span>
      <span className="unit__face unit__face--back">
        <span className="tape tape--shell">
          <TapeWell />
        </span>
      </span>
      <span className="unit__face unit__face--left" />
      <span className="unit__face unit__face--right" />
      <span className="unit__face unit__face--top">
        <span className="tape__spine">
          <span>{tape?.title ?? "Blank"}</span>
          <span>{tape?.code ?? "VF"}</span>
        </span>
      </span>
    </span>
  );
}

function TapeWell() {
  return (
    <span className="tape__well">
      <span className="tape__screw" />
      <span className="tape__window">
        <span className="tape__reel" />
        <span className="tape__ribbon" />
        <span className="tape__reel tape__reel--take" />
      </span>
      <span className="tape__screw" />
    </span>
  );
}

function TapeFront({ tape }: { tape?: Tape }) {
  return (
    <span className="tape">
      <span className="tape__label">
        {tape ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={tape.art} alt="" draggable={false} />
            <span className="tape__text">
              <span className="tape__brand">The Vision Frog</span>
              <span className="tape__title">{tape.title}</span>
              <span className="tape__sub">{tape.format}</span>
            </span>
          </>
        ) : (
          <span className="tape__ruled" />
        )}
      </span>
      <TapeWell />
      <span className="tape__osd" aria-hidden="true">
        <span>▶ PLAY</span>
        <span>SP</span>
      </span>
    </span>
  );
}
