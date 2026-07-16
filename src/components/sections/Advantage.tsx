'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Container } from '@/components/ui/Container';
import { ICON_MAP } from '@/constants/advantages';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { AdvantageRowProps } from '@/types';


function AdvantageRow({ index: _index, item, isActive }: AdvantageRowProps) {
  return (
    <div className="relative py-6 sm:py-3.5 transition-all duration-300">
      {/* Header: Icon + Title */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Icon */}
        <div
          className={`w-8 h-8 sm:w-10 sm:h-10 p-2 rounded-lg flex items-center justify-center border transition-all duration-300 [&_svg]:w-4 [&_svg]:h-4 sm:[&_svg]:w-5 sm:[&_svg]:h-5 ${
            isActive
              ? 'bg-primary/15 border-accent/30 text-accent'
              : 'bg-white/5 border-white/10 text-tertiary'
          }`}
        >
          {ICON_MAP[item.icon]}
        </div>

        {/* Title */}
        <h3
          className={`text-base sm:text-lg lg:text-xl font-medium tracking-tight transition-colors duration-300 ${
            isActive
              ? 'bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'
              : 'text-foreground/45'
          }`}
        >
          {item.title}
        </h3>
      </div>

      {/* Description */}
      <motion.div
        initial={false}
        animate={{
          height: isActive ? 'auto' : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="overflow-hidden"
      >
        <p className="text-xs sm:text-sm text-tertiary leading-relaxed mt-2 sm:pl-14 pl-0 max-w-xl">
          {item.desc}
        </p>
      </motion.div>

      {/* Static row border divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10" />
    </div>
  );
}

export function Advantage() {
  const t = useTranslations('advantages');
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);


  const advantagesItems = [
    { title: t('integrated.title'), desc: t('integrated.desc'), icon: 'Wrench' },
    { title: t('agile.title'), desc: t('agile.desc'), icon: 'Zap' },
    { title: t('enterprise.title'), desc: t('enterprise.desc'), icon: 'Server' },
    { title: t('compliance.title'), desc: t('compliance.desc'), icon: 'ShieldCheck' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const height = container.offsetHeight;
      const vh = window.innerHeight;

      const range = height - vh;
      if (range <= 0) return;

      const p = Math.min(1, Math.max(0, (window.scrollY - top) / range));
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const count = advantagesItems.length;
  // Calculate active index based on scroll progress
  const activeIndex = Math.min(count - 1, Math.max(0, Math.floor(progress * count)));

  return (
    <div ref={containerRef} className="relative h-[250vh] bg-background">
      {/* Sticky viewport content container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden py-4 sm:py-8">
        <Container className="flex flex-col gap-4 lg:gap-8 max-h-[95vh] justify-center">
          {/* Title Block */}
          <div className="flex flex-col gap-1 sm:gap-2 text-center max-w-3xl mx-auto shrink-0">
            <h2 className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-3xl sm:text-4xl font-medium tracking-tight leading-[1.1]">
              {t('heading')}
            </h2>
            <p className="text-tertiary/75 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mt-4">
              {t('subheading')}
            </p>
          </div>

          {/* Grid Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center overflow-hidden">
            {/* Left Column: Interactive text list */}
            <div className="lg:col-span-7 flex flex-col justify-between py-0.5 order-2 lg:order-1 h-full pr-1">
              {advantagesItems.map((item, index) => {
                const isActive = activeIndex === index;
                return <AdvantageRow key={index} index={index} item={item} isActive={isActive} />;
              })}
            </div>

            {/* Right Column: Slideshow Images */}
            <div className="lg:col-span-5 w-full order-1 lg:order-2 flex flex-col h-full min-h-[180px] sm:min-h-[260px] lg:min-h-[380px] max-h-[25vh] lg:max-h-none justify-center">
              <div className="relative flex-1 w-full h-full min-h-[180px] sm:min-h-[260px] lg:min-h-[380px] rounded-xl border border-white/10 bg-transparent overflow-hidden">
                {advantagesItems.map((item, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <div
                      key={index}
                      className="absolute inset-0 transition-opacity duration-500 ease-out"
                      style={{
                        opacity: isActive ? 1 : 0,
                        zIndex: isActive ? 10 : 0,
                        pointerEvents: isActive ? 'auto' : 'none',
                        willChange: 'opacity',
                      }}
                    >
                      <Image
                        src={`/advantage/slideshow-${index + 1}.png`}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover w-full h-full"
                        priority={true}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
