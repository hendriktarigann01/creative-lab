export function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

export function getSequenceStyles(
  progress: number,
  fadeInStart: number,
  fadeInEnd: number,
  fadeOutStart: number,
  fadeOutEnd: number
) {
  let opacity = 0;
  let y = 40;

  if (progress <= fadeInStart) {
    opacity = 0;
    y = 40;
  } else if (progress <= fadeInEnd) {
    const t = (progress - fadeInStart) / (fadeInEnd - fadeInStart);
    opacity = t;
    y = 40 * (1 - t);
  } else if (progress <= fadeOutStart) {
    opacity = 1;
    y = 0;
  } else if (progress <= fadeOutEnd) {
    const t = (progress - fadeOutStart) / (fadeOutEnd - fadeOutStart);
    opacity = 1 - t;
    y = -40 * t;
  } else {
    opacity = 0;
    y = -40;
  }

  return { opacity, y };
}
