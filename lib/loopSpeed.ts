/** Hovered loops play at this speed instead of stopping */
export const SLOW_RATE = 0.35;

/** Set the playback speed of the looping clip inside a hovered card or panel */
export function setLoopSpeed(el: HTMLElement, rate: number) {
  const video = el.querySelector("video");
  if (video) video.playbackRate = rate;
}
