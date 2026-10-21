"use client";

import { useState } from "react";

/** Poster first, YouTube iframe only after the click — keeps the page light */
export default function FilmPlayer({
  youtubeId,
  poster,
  title,
  label = "Play film",
}: {
  youtubeId?: string;
  poster: string;
  title: string;
  label?: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing && youtubeId) {
    return (
      <div className="film-player">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="film-player" style={{ backgroundImage: `url('${poster}')` }}>
      {youtubeId ? (
        <button type="button" className="film-player__play" onClick={() => setPlaying(true)} aria-label={`Play ${title}`}>
          <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
          <span>{label}</span>
        </button>
      ) : null}
    </div>
  );
}
