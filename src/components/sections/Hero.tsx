'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useLenis } from 'lenis/react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { clamp, getSequenceStyles } from '@/lib/hero-utils';
import { useTranslations } from 'next-intl';

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

  const progressContainerRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const targetProgressRef = useRef(0);
  const currentTimeRef = useRef(0.5);
  const initializedRef = useRef(false);

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

    const initScroll = window.scrollY;
    const { top, height, vh } = containerMetricsRef.current;
    const range = height - vh;
    if (range > 0) {
      const progress = clamp((initScroll - top) / range, 0, 1);
      targetProgressRef.current = progress;
    }

    return () => {
      window.removeEventListener('resize', updateMetrics);
    };
  }, [updateMetrics]);

  useEffect(() => {
    let frameId: number;

    const updateVideo = () => {
      const video = videoRef.current;
      if (!video) {
        frameId = requestAnimationFrame(updateVideo);
        return;
      }

      const duration = video.duration;
      if (!duration || isNaN(duration) || video.readyState < 2) {
        frameId = requestAnimationFrame(updateVideo);
        return;
      }

      if (!initializedRef.current) {
        currentTimeRef.current = targetProgressRef.current * duration;
        initializedRef.current = true;
      }

      const targetTime = targetProgressRef.current * duration;
      const diff = targetTime - currentTimeRef.current;

      if (Math.abs(diff) > 0.005) {
        currentTimeRef.current += diff * 0.08;
        if (!video.seeking) {
          video.currentTime = Math.max(0, currentTimeRef.current);
        }
      }

      const smoothP = currentTimeRef.current / duration;

      const hero = getSequenceStyles(smoothP, -0.01, 0.0, 0.1, 0.15);
      applyOverlay(heroRef, hero.opacity, hero.y);

      const s1 = getSequenceStyles(smoothP, 0.15, 0.22, 0.35, 0.38);
      applyOverlay(seq1Ref, s1.opacity, s1.y);

      const s2 = getSequenceStyles(smoothP, 0.38, 0.45, 0.65, 0.68);
      applyOverlay(seq2Ref, s2.opacity, s2.y);

      const s3 = getSequenceStyles(smoothP, 0.68, 0.75, 0.9, 0.95);
      applyOverlay(seq3Ref, s3.opacity, s3.y);

      const percentage = Math.min(100, Math.max(0, Math.round(smoothP * 100)));

      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${smoothP})`;
      }
      if (progressTextRef.current) {
        progressTextRef.current.textContent = `${percentage}%`;
      }
      if (progressContainerRef.current) {
        const isVisible = smoothP < 0.99;
        progressContainerRef.current.style.opacity = isVisible ? '1' : '0';
        progressContainerRef.current.style.visibility = isVisible ? 'visible' : 'hidden';
      }

      frameId = requestAnimationFrame(updateVideo);
    };

    frameId = requestAnimationFrame(updateVideo);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [applyOverlay]);

  useLenis((lenis) => {
    const { top, height, vh } = containerMetricsRef.current;
    const range = height - vh;
    if (range <= 0) return;

    const progress = clamp((lenis.animatedScroll - top) / range, 0, 1);
    targetProgressRef.current = progress;
  }, []);

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

      {/* Loading Bar */}
      <div
        ref={progressContainerRef}
        className="fixed bottom-0 left-0 z-50 w-full flex flex-col items-end gap-1 pointer-events-none transition-all duration-300 ease-out"
        style={{ opacity: 0, visibility: 'hidden', willChange: 'opacity, visibility' }}
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
    </div>
  );
}
