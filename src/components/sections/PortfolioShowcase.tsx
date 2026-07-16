'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ShowcaseProject } from '@/types';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.06, ease: 'easeOut' as const },
  }),
};

export function PortfolioShowcase() {
  const t = useTranslations('portfolio');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const projects = (t.raw('templates') as ShowcaseProject[]) || [];

  const updateScrollState = () => {
    const container = scrollRef.current;
    if (!container) return;
    setCanScrollLeft(container.scrollLeft > 4);
    setCanScrollRight(container.scrollLeft + container.clientWidth < container.scrollWidth - 4);
  };

  useEffect(() => {
    updateScrollState();
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      container.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = container.firstElementChild
      ? (container.firstElementChild as HTMLElement).offsetWidth + 24
      : 320;
    container.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    });
  };

  const navButtonClass = (enabled: boolean) =>
    `flex h-10 w-10 items-center justify-center rounded-full text-white transition-all duration-300 cursor-pointer ${
      enabled
        ? 'bg-gradient-to-r from-primary to-accent'
        : 'cursor-not-allowed bg-navbar/40 text-white'
    }`;

  return (
    <section className="bg-background py-20 sm:py-28 relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="space-y-6">
          <div className="max-w-2xl text-center mx-auto">
            <h2 className="bg-gradient-to-r from-primary to-accent bg-clip-text text-3xl font-medium tracking-tight text-transparent sm:text-4xl">
              {t('showcaseHeading')}
            </h2>
            <p className="mt-4 text-sm text-tertiary/75 sm:text-base leading-relaxed">
              {t('showcaseSubheading')}
            </p>
          </div>

          <div className="hidden sm:flex shrink-0 w-full justify-end items-center gap-3 select-none">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous project"
              className={navButtonClass(canScrollLeft)}
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Next project"
              className={navButtonClass(canScrollRight)}
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="mt-10 flex snap-x snap-mandatory gap-4 sm:gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              className="relative w-[calc(50%-8px)] sm:w-[400px] shrink-0 snap-start overflow-hidden rounded-xl border border-border p-3 xs:p-4 sm:p-5 transition-all duration-300 group"
            >
              <div className="relative z-10 space-y-6">
                <div className="rounded-lg bg-white/5 border border-white/5 overflow-hidden flex items-center justify-center">
                  <Image
                    src={`/portfolio/thumbnails/${project.slug}.webp`}
                    alt={project.name}
                    width={400}
                    height={260}
                    className="h-full w-full object-cover aspect-video"
                    priority={i < 2}
                    loading={i >= 2 ? 'lazy' : undefined}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="min-h-10 md:min-h-auto text-sm sm:text-base font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {project.name}
                  </h3>
                  <p className="text-[10px] xs:text-xs sm:text-sm leading-relaxed text-tertiary/70 line-clamp-3 min-h-12 xs:min-h-16 lg:min-h-0 sm:line-clamp-2 sm:h-10">
                    {project.description}
                  </p>

                  {/* Wrapped inside a localized Link tag */}
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2 sm:px-5 sm:py-2.5 text-[10px] xs:text-xs font-medium text-white transition-opacity hover:opacity-90 active:scale-95 cursor-pointer text-center"
                  >
                    {t('exploreProject')}
                    <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View Scroll Buttons centered at bottom */}
        <div className="flex sm:hidden w-full justify-center items-center gap-3 mt-6 select-none">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Previous project"
            className={navButtonClass(canScrollLeft)}
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Next project"
            className={navButtonClass(canScrollRight)}
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
