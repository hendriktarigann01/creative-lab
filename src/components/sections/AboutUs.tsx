'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { aboutData } from '@/data/about';
import { useTranslations } from 'next-intl';

export function AboutUs() {
  const t = useTranslations('about');
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(containerRef);

  // Divide the progress into three parts for transition:
  // Sequence 1: visible from 0 to 0.35, fades out between 0.30 and 0.35
  // Sequence 2: fades in between 0.30 and 0.35, visible from 0.35 to 0.70, fades out between 0.65 and 0.70
  // Sequence 3: fades in between 0.65 and 0.70, visible from 0.70 to 1.0

  const getOpacity = (seq: number) => {
    if (seq === 1) {
      if (progress < 0.3) return 1;
      if (progress >= 0.3 && progress <= 0.35) return (0.35 - progress) / 0.05;
      return 0;
    }
    if (seq === 2) {
      if (progress < 0.3) return 0;
      if (progress >= 0.3 && progress < 0.35) return (progress - 0.3) / 0.05;
      if (progress >= 0.35 && progress < 0.65) return 1;
      if (progress >= 0.65 && progress <= 0.7) return (0.7 - progress) / 0.05;
      return 0;
    }
    if (seq === 3) {
      if (progress < 0.65) return 0;
      if (progress >= 0.65 && progress < 0.7) return (progress - 0.65) / 0.05;
      return 1;
    }
    return 0;
  };

  const getTranslationY = (seq: number) => {
    const opacity = getOpacity(seq);
    return (1 - opacity) * 30; // Slide up effect when entering
  };

  return (
    <section ref={containerRef} id="about" className="relative h-[300vh] bg-background">
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Sequence 1 */}
        <div
          className="absolute inset-0 flex items-center justify-center px-4 transition-all duration-300 pointer-events-none"
          style={{
            opacity: getOpacity(1),
            transform: `translateY(${getTranslationY(1)}px)`,
            display: progress > 0.38 ? 'none' : 'flex',
          }}
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-center tracking-tight text-foreground max-w-5xl leading-tight">
            {t('seq1Plain')}{' '}
            <span className="bg-linear-to-r from-[#AB7FEB] to-[#540EE1] bg-clip-text text-transparent">
              {t('seq1Gradient')}
            </span>
          </h2>
        </div>

        {/* Sequence 2 */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center transition-all duration-300 pointer-events-none"
          style={{
            opacity: getOpacity(2),
            transform: `translateY(${getTranslationY(2)}px)`,
            display: progress < 0.28 || progress > 0.73 ? 'none' : 'flex',
          }}
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-foreground max-w-5xl leading-tight">
            {t('seq2Plain')}{' '}
            <span className="bg-linear-to-r from-[#AB7FEB] to-[#540EE1] bg-clip-text text-transparent">
              {t('seq2Gradient')}
            </span>
          </h2>
          <p className="text-lg sm:text-2xl text-muted-foreground mt-6 max-w-2xl font-light leading-relaxed">
            {t('seq2Sub')}
          </p>
        </div>

        {/* Sequence 3: Image Reveal */}
        <div
          className="absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-300"
          style={{
            opacity: getOpacity(3),
            display: progress < 0.62 ? 'none' : 'block',
          }}
        >
          <div className="relative w-full h-full">
            <Image
              src={aboutData.sequence3.imageUrl}
              alt={aboutData.sequence3.imageAlt}
              fill
              className="object-cover brightness-40"
              sizes="100vw"
              priority
            />
            {/* Dark vignette overlay */}
            <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_20%,#000000_100%]" />

            <div className="absolute inset-0 flex items-center justify-center px-4">
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-foreground max-w-5xl leading-tight">
                {t('seq3Plain')}{' '}
                <span className="bg-linear-to-r from-[#AB7FEB] to-[#540EE1] bg-clip-text text-transparent">
                  {t('seq3Gradient')}
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
