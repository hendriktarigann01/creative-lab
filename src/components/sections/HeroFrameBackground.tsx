'use client';

import { useEffect, useRef, useCallback } from 'react';

const TOTAL_FRAMES = 100;
const PRELOAD_COUNT = 20;

export function HeroFrameBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    Array(TOTAL_FRAMES).fill(null)
  );
  const loadedRef = useRef(0);
  const rafRef = useRef<number>(0);

  const progressContainerRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  /** Build URL for each frame */
  const getUrl = (n: number) =>
    `/frame-creativelab-parallax/frame_${String(n).padStart(6, '0')}.webp`;

  /** Draw loaded frame to canvas with CSS cover-like fit */
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const scale = Math.max(cw / iw, ch / ih);
    const w = iw * scale;
    const h = ih * scale;
    const x = (cw - w) / 2;
    const y = (ch - h) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, x, y, w, h);
  }, []);

  /** Load a single frame and return a promise */
  const loadFrame = useCallback((index: number): Promise<void> => {
    return new Promise((resolve) => {
      if (imagesRef.current[index]?.complete) {
        resolve();
        return;
      }
      const img = new Image();
      img.src = getUrl(index);
      img.onload = img.onerror = () => {
        imagesRef.current[index] = img;
        loadedRef.current += 1;
        resolve();
      };
      imagesRef.current[index] = img;
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // ── Scroll → frame mapping ────────────────────────────────────
    let targetFrame = 0;
    let currentFrame = 0;
    let opacity = 1;

    // ── Resize canvas to fit window ────────────────────────────────
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const frameIndex = Math.round(currentFrame);
      drawFrame(frameIndex);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const h = window.innerHeight;
      const maxScroll = h * 5;
      const p = Math.min(1, Math.max(0, scrollY / maxScroll));

      targetFrame = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(p * (TOTAL_FRAMES - 1))
      );

      if (scrollY > 4 * h) {
        opacity = Math.max(0, 1 - (scrollY - 4 * h) / (0.6 * h));
      } else {
        opacity = 1;
      }
    };

    // ── rAF loop — smooth lerp ────────────────────────────────────
    const updateCanvas = () => {
      const diff = targetFrame - currentFrame;

      if (Math.abs(diff) > 0.01) {
        currentFrame += diff * 0.08;
        const frameIndex = Math.round(currentFrame);
        if (frameIndex >= 0 && frameIndex < TOTAL_FRAMES) {
          drawFrame(frameIndex);
        }
      }

      if (container) {
        container.style.opacity = opacity.toFixed(3);
        container.style.visibility = opacity > 0.01 ? 'visible' : 'hidden';
      }

      // Update Loading Bar at the bottom
      const smoothP = currentFrame / (TOTAL_FRAMES - 1);
      const percentage = Math.min(100, Math.max(0, Math.round(smoothP * 100)));

      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${smoothP})`;
      }
      if (progressTextRef.current) {
        progressTextRef.current.textContent = `${percentage}%`;
      }
      if (progressContainerRef.current) {
        const scrollY = window.scrollY;
        const h = window.innerHeight;
        const isPastHero = scrollY >= 4.8 * h || smoothP >= 0.98;
        progressContainerRef.current.style.opacity = isPastHero ? '0' : '1';
        progressContainerRef.current.style.visibility = isPastHero ? 'hidden' : 'visible';
      }

      rafRef.current = requestAnimationFrame(updateCanvas);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    // ── Preload initial frames and start loop ─────────────────────
    const preload = async () => {
      const promises: Promise<void>[] = [];
      for (let i = 0; i < PRELOAD_COUNT; i++) {
        promises.push(loadFrame(i));
      }
      await Promise.all(promises);
      drawFrame(0);

      rafRef.current = requestAnimationFrame(updateCanvas);

      // Lazy load remaining frames in background
      let i = PRELOAD_COUNT;
      const idleLoad = () => {
        if (i < TOTAL_FRAMES) {
          const batch = 5;
          for (let b = 0; b < batch && i < TOTAL_FRAMES; b++, i++) {
            loadFrame(i);
          }
          if (typeof requestIdleCallback !== 'undefined') {
            requestIdleCallback(idleLoad, { timeout: 200 });
          } else {
            setTimeout(idleLoad, 32);
          }
        }
      };
      if (typeof requestIdleCallback !== 'undefined') {
        requestIdleCallback(idleLoad, { timeout: 200 });
      } else {
        setTimeout(idleLoad, 500);
      }
    };

    preload();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame, loadFrame]);

  return (
    <>
      {/* ── Canvas background — fixed ── */}
      <div
        ref={containerRef}
        className="fixed inset-0 z-0 pointer-events-none w-full h-full overflow-hidden bg-black"
        suppressHydrationWarning
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full filter brightness-80"
          aria-hidden="true"
        />
      </div>

      {/* Loading Bar */}
      <div
        ref={progressContainerRef}
        className="fixed bottom-0 left-0 z-50 w-full flex flex-col items-end gap-1 pointer-events-none transition-all duration-300 ease-out"
        style={{ opacity: 0, visibility: 'hidden', willChange: 'opacity, visibility' }}
        suppressHydrationWarning
      >
        <span
          ref={progressTextRef}
          className="text-xs font-light tracking-wider text-white mr-2 opacity-80 select-none"
        >
          0%
        </span>

        <div className="w-full h-1.5 bg-[#ab7feb]/20 backdrop-blur-sm">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-[#540ee1] to-[#ab7feb] shadow-[0_0_8px_rgba(171,127,235,0.5)] origin-left w-full"
            style={{ transform: 'scaleX(0)', willChange: 'transform' }}
          />
        </div>
      </div>
    </>
  );
}
