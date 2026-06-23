import { useEffect, useState, RefObject } from 'react';

export function useScrollProgress(ref: RefObject<HTMLElement | null>): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const elementHeight = rect.height;
      const elementTop = rect.top;

      // Scroll progress from 0 (top enters viewport) to 1 (bottom leaves viewport)
      // Or in case of a sticky container: progress from 0 to 1 based on how much of the container height has scrolled
      const viewportHeight = window.innerHeight;
      
      // We calculate progress based on the scroll position relative to the element
      // when element is stuck or scrolling:
      const totalScrollable = elementHeight - viewportHeight;
      if (totalScrollable <= 0) return;

      // top is negative when element starts scrolling up
      const currentScroll = -elementTop;
      const rawProgress = currentScroll / totalScrollable;
      
      // Clamp between 0 and 1
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));
      setProgress(clampedProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Run once initially

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref]);

  return progress;
}
