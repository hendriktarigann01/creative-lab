'use client';

import { useEffect, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import { ChevronsDown } from 'lucide-react';

/**
 * Helper to calculate opacity and Y translation for each slide index based on progress p [0..1]
 * - index = 0: Slide Utama
 * - index = 1..3: Scroll Sequences
 */
function getSlideState(p: number, index: number) {
  const start = index * 0.25;
  const end = (index + 1) * 0.25;

  const fadeInStart = start;
  const fadeInEnd = start + 0.05;

  const fadeOutStart = end - 0.05;
  const fadeOutEnd = end;

  let opacity = 0;
  let y = 0;

  if (p >= start && p <= end) {
    if (p < fadeInEnd && index > 0) {
      // Fade in phase: fade up muncul
      const ratio = (p - fadeInStart) / (fadeInEnd - fadeInStart);
      opacity = ratio;
      y = 30 * (1 - ratio);
    } else if (p > fadeOutStart && index < 3) {
      // Fade out phase: fade down hilang
      const ratio = (p - fadeOutStart) / (fadeOutEnd - fadeOutStart);
      opacity = 1 - ratio;
      y = 30 * ratio;
    } else if (index === 3 && p > fadeOutStart) {
      // Final slide fade-out completely as we transition to Advantage
      const ratio = Math.min(1, (p - fadeOutStart) / (fadeOutEnd - fadeOutStart));
      opacity = 1 - ratio;
      y = 30 * ratio;
    } else {
      // Fully visible phase
      opacity = 1;
      y = 0;
    }
  } else if (index === 0 && p < start) {
    // Before slide 1 starts
    opacity = 1;
    y = 0;
  } else {
    // Outside active range
    opacity = 0;
    y = index > 0 ? 30 : 0;
  }

  return { opacity, y };
}

export function Hero() {
  const tHero = useTranslations('hero');
  const tAbout = useTranslations('about');

  const [scrollY, setScrollY] = useState(0);
  const [h, setH] = useState(800);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setH(window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Calculate overall scroll progress p [0..1] across the 500vh track
  const maxScroll = h * 5;
  const p = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;

  // Calculate translation & opacity for the main wrapper when scrolling past the Hero track (starts at 4 * h)
  const offset = Math.max(0, scrollY - 4 * h);
  const wrapperY = -offset;
  const wrapperOpacity = Math.max(0, 1 - offset / h);
  const isVisible = scrollY < 5 * h;

  const slide0 = getSlideState(p, 0);
  const slide1 = getSlideState(p, 1);
  const slide2 = getSlideState(p, 2);
  const slide3 = getSlideState(p, 3);

  const title = tHero('title');
  const grad = tHero('gradientWord');
  const parts = title.split(grad);

  return (
    <section id="hero-track" className="relative h-[500vh] w-full bg-transparent">
      {/* Fixed Container — z-10 ensures it sits on top of the z-0 canvas sequence */}
      <div
        style={{
          opacity: wrapperOpacity,
          transform: `translateY(${wrapperY}px)`,
          visibility: isVisible ? 'visible' : 'hidden',
          willChange: 'opacity, transform, visibility',
        }}
        className="fixed inset-0 w-full h-screen overflow-hidden pointer-events-none z-10"
        suppressHydrationWarning
      >
        {/* ── SLIDE 1: Main Hero ─────────────────────────────────── */}
        <div
          style={{
            opacity: slide0.opacity,
            transform: `translateY(${slide0.y}px)`,
            visibility: slide0.opacity > 0.01 ? 'visible' : 'hidden',
            willChange: 'opacity, transform, visibility',
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-auto"
        >
          <Container className="flex flex-col items-center gap-6 sm:gap-8 text-center mt-16">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white leading-[1.1] select-none uppercase drop-shadow-lg">
              {parts[0]}
              <span className="bg-linear-to-r from-[#AB7FEB] to-[#540EE1] bg-clip-text text-transparent">
                {grad}
              </span>
              {parts[1]}
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl">
              {tHero('description')}
            </p>

            {/* Scroll indicator */}
            <div className="flex justify-center animate-bounce mt-10">
              <ChevronsDown size={44} className="text-white/60" />
            </div>
          </Container>
        </div>

        {/* ── SLIDE 2: Sequence 1 ─────────────────────────────────── */}
        <div
          style={{
            opacity: slide1.opacity,
            transform: `translateY(${slide1.y}px)`,
            visibility: slide1.opacity > 0.01 ? 'visible' : 'hidden',
            willChange: 'opacity, transform, visibility',
          }}
          className="absolute inset-0 flex items-center justify-center text-center px-4 pointer-events-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight text-white max-w-5xl leading-tight">
            {tAbout('seq1Plain')}{' '}
            <span className="bg-linear-to-r from-[#AB7FEB] to-[#540EE1] bg-clip-text text-transparent">
              {tAbout('seq1Gradient')}
            </span>
          </h2>
        </div>

        {/* ── SLIDE 3: Sequence 2 ─────────────────────────────────── */}
        <div
          style={{
            opacity: slide2.opacity,
            transform: `translateY(${slide2.y}px)`,
            visibility: slide2.opacity > 0.01 ? 'visible' : 'hidden',
            willChange: 'opacity, transform, visibility',
          }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-auto"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight text-white max-w-5xl leading-tight">
            {tAbout('seq2Plain')}{' '}
            <span className="bg-linear-to-r from-[#AB7FEB] to-[#540EE1] bg-clip-text text-transparent">
              {tAbout('seq2Gradient')}
            </span>
          </h2>
        </div>

        {/* ── SLIDE 4: Sequence 3 ─────────────────────────────────── */}
        <div
          style={{
            opacity: slide3.opacity,
            transform: `translateY(${slide3.y}px)`,
            visibility: slide3.opacity > 0.01 ? 'visible' : 'hidden',
            willChange: 'opacity, transform, visibility',
          }}
          className="absolute inset-0 flex items-center justify-center text-center px-4 pointer-events-auto"
          id="about"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight text-white max-w-5xl leading-tight">
            {tAbout('seq3Plain')}{' '}
            <span className="bg-linear-to-r from-[#AB7FEB] to-[#540EE1] bg-clip-text text-transparent">
              {tAbout('seq3Gradient')}
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
}
