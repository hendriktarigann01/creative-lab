'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useLenis } from 'lenis/react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { clamp, getSequenceStyles } from '@/lib/hero-utils';
import { useTranslations } from 'next-intl';

const lerp = (x: number, x0: number, x1: number, y0: number, y1: number) => {
  const t = (x - x0) / (x1 - x0);
  const st = t * t * (3 - 2 * t);
  return y0 + (y1 - y0) * st;
};

const getWarpedProgress = (rawP: number) => {
  if (rawP <= 0.12) return 0.0;
  if (rawP < 0.20) return lerp(rawP, 0.12, 0.20, 0.0, 0.285);
  if (rawP <= 0.38) return 0.285;
  if (rawP < 0.48) return lerp(rawP, 0.38, 0.48, 0.285, 0.55);
  if (rawP <= 0.68) return 0.55;
  if (rawP < 0.78) return lerp(rawP, 0.68, 0.78, 0.55, 0.825);
  if (rawP <= 0.92) return 0.825;
  return lerp(rawP, 0.92, 1.0, 0.825, 1.0);
};

export function Hero() {
  const tHero = useTranslations('hero');
  const tAbout = useTranslations('about');

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerMetricsRef = useRef({ top: 0, height: 0, vh: 0 });

  const heroRef = useRef<HTMLDivElement>(null);
  const seq1Ref = useRef<HTMLDivElement>(null);
  const seq2Ref = useRef<HTMLDivElement>(null);
  const seq3Ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const latestProgressRef = useRef(0);
  const snapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentStepRef = useRef(0);
  const isAnimatingRef = useRef(false);

  const updateMetrics = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    containerMetricsRef.current = {
      top: container.offsetTop,
      height: container.offsetHeight,
      vh: window.innerHeight,
    };
  }, []);

  useEffect(() => {
    updateMetrics();
    window.addEventListener('resize', updateMetrics);

    // Initialize step based on initial scroll position
    const initScroll = window.scrollY;
    const { top, height, vh } = containerMetricsRef.current;
    const range = height - vh;
    if (range > 0) {
      const progress = clamp((initScroll - top) / range, 0, 1);
      if (progress > 0.92) {
        currentStepRef.current = 4;
      } else {
        const snapTargets = [0.0, 0.29, 0.58, 0.85];
        let closestStep = 0;
        let minDiff = Math.abs(progress - snapTargets[0]);
        for (let i = 1; i < snapTargets.length; i++) {
          const diff = Math.abs(progress - snapTargets[i]);
          if (diff < minDiff) {
            minDiff = diff;
            closestStep = i;
          }
        }
        currentStepRef.current = closestStep;
      }
    }

    return () => {
      window.removeEventListener('resize', updateMetrics);
      if (snapTimeoutRef.current) {
        clearTimeout(snapTimeoutRef.current);
      }
    };
  }, [updateMetrics]);

  const applyOverlay = useCallback(
    (ref: React.RefObject<HTMLDivElement | null>, opacity: number, y: number) => {
      const el = ref.current;
      if (!el) return;
      el.style.opacity = String(opacity);
      el.style.transform = `translate3d(0, ${y}px, 0)`;
      el.style.visibility = opacity > 0.01 ? 'visible' : 'hidden';
    },
    []
  );

  useLenis(
    (lenis) => {
      const { top, height, vh } = containerMetricsRef.current;
      const range = height - vh;
      if (range <= 0) return;

      const progress = clamp((lenis.animatedScroll - top) / range, 0, 1);
      latestProgressRef.current = progress;

      const snapTargets = [0.0, 0.29, 0.58, 0.85];
      const dir = lenis.direction; // 1 (down), -1 (up), 0 (none)

      // State machine logic for scroll snapping
      if (!isAnimatingRef.current) {
        const curStep = currentStepRef.current;
        let nextStep = -1;

        if (dir === 1) {
          // Scrolling down
          if (curStep === 0 && progress > 0.02) {
            nextStep = 1;
          } else if (curStep === 1 && progress > 0.29 + 0.02) {
            nextStep = 2;
          } else if (curStep === 2 && progress > 0.58 + 0.02) {
            nextStep = 3;
          } else if (curStep === 3 && progress > 0.85 + 0.03) {
            // transition to free scroll
            currentStepRef.current = 4;
          }
        } else if (dir === -1) {
          // Scrolling up
          if (curStep === 4 && progress < 0.88) {
            nextStep = 3;
          } else if (curStep === 3 && progress < 0.85 - 0.02) {
            nextStep = 2;
          } else if (curStep === 2 && progress < 0.58 - 0.02) {
            nextStep = 1;
          } else if (curStep === 1 && progress < 0.29 - 0.02) {
            nextStep = 0;
          }
        }

        if (nextStep !== -1) {
          currentStepRef.current = nextStep;
          isAnimatingRef.current = true;
          const targetScroll = top + snapTargets[nextStep] * range;

          lenis.scrollTo(targetScroll, {
            duration: 0.8, // faster transition
            easing: (t) => 1 - Math.pow(1 - t, 3.5),
            onComplete: () => {
              isAnimatingRef.current = false;
            },
          });
        }
      }

      // Manage fallback snap back if they stop scrolling
      if (snapTimeoutRef.current) {
        clearTimeout(snapTimeoutRef.current);
      }

      if (!isAnimatingRef.current && currentStepRef.current !== 4) {
        snapTimeoutRef.current = setTimeout(() => {
          const targetScroll = top + snapTargets[currentStepRef.current] * range;
          if (Math.abs(lenis.animatedScroll - targetScroll) > 2) {
            isAnimatingRef.current = true;
            lenis.scrollTo(targetScroll, {
              duration: 0.7,
              easing: (t) => 1 - Math.pow(1 - t, 3),
              onComplete: () => {
                isAnimatingRef.current = false;
              },
            });
          }
        }, 200);
      }

      if (rafRef.current !== null) return;

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const rawP = latestProgressRef.current;
        const p = getWarpedProgress(rawP);

        const video = videoRef.current;
        if (video && video.readyState >= 2 && video.duration) {
          const targetTime = p * video.duration;
          // Avoid micro-seeks to reduce video decoding load
          if (Math.abs(video.currentTime - targetTime) > 0.03) {
            video.currentTime = targetTime;
          }
        }

        const hero = getSequenceStyles(p, -0.01, 0.0, 0.1, 0.15);
        applyOverlay(heroRef, hero.opacity, hero.y);

        const s1 = getSequenceStyles(p, 0.15, 0.22, 0.35, 0.38);
        applyOverlay(seq1Ref, s1.opacity, s1.y);

        const s2 = getSequenceStyles(p, 0.38, 0.45, 0.65, 0.68);
        applyOverlay(seq2Ref, s2.opacity, s2.y);

        const s3 = getSequenceStyles(p, 0.68, 0.75, 0.9, 0.95);
        applyOverlay(seq3Ref, s3.opacity, s3.y);
      });
    },
    [applyOverlay]
  );

  const title = tHero('title');
  const grad = tHero('gradientWord');
  const parts = title.split(grad);

  return (
    <div ref={containerRef} className="relative h-[550vh] bg-background">
      <div className="sticky top-0 h-screen w-full overflow-hidden select-none">
        <video
          ref={videoRef}
          src="/parallax/parallax.webm"
          muted
          playsInline
          autoPlay={false}
          className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover filter brightness-80"
        />
      </div>

      <div
        ref={heroRef}
        className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none"
        style={{ willChange: 'opacity, transform' }}
      >
        <Container className="flex flex-col items-center gap-6 sm:gap-8 pointer-events-auto">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white leading-[1.1] text-center select-none uppercase drop-shadow-lg">
            {parts[0]}
            <span className="bg-linear-to-r from-[#AB7FEB] to-[#540EE1] bg-clip-text text-transparent">
              {grad}
            </span>
            {parts[1]}
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl text-center">
            {tHero('description')}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <Button href="/contact" variant="primary" size="lg" className="w-full sm:w-auto">
              {tHero('ctaText')}
            </Button>
          </div>
        </Container>
      </div>

      <div
        ref={seq1Ref}
        className="fixed inset-0 z-10 flex items-center justify-center text-center px-4 pointer-events-none"
        style={{ willChange: 'opacity, transform', visibility: 'hidden' }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight text-white max-w-5xl leading-tight">
          {tAbout('seq1Plain')}{' '}
          <span className="bg-linear-to-r from-[#AB7FEB] to-[#540EE1] bg-clip-text text-transparent">
            {tAbout('seq1Gradient')}
          </span>
        </h2>
      </div>

      <div
        ref={seq2Ref}
        className="fixed inset-0 z-10 flex flex-col items-center justify-center text-center px-4 pointer-events-none"
        style={{ willChange: 'opacity, transform', visibility: 'hidden' }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight text-white max-w-5xl leading-tight">
          {tAbout('seq2Plain')}{' '}
          <span className="bg-linear-to-r from-[#AB7FEB] to-[#540EE1] bg-clip-text text-transparent">
            {tAbout('seq2Gradient')}
          </span>
        </h2>
      </div>

      <div
        ref={seq3Ref}
        id="about"
        className="fixed inset-0 z-10 flex items-center justify-center text-center px-4 pointer-events-none"
        style={{ willChange: 'opacity, transform', visibility: 'hidden' }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight text-white max-w-5xl leading-tight">
          {tAbout('seq3Plain')}{' '}
          <span className="bg-linear-to-r from-[#AB7FEB] to-[#540EE1] bg-clip-text text-transparent">
            {tAbout('seq3Gradient')}
          </span>
        </h2>
      </div>
    </div>
  );
}
