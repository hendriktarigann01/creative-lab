'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ContainerScroll } from '@/components/ui/ContainerScroll';

interface PageHeroDetailProps {
  slug: string;
  projectTitle: string;
  headline: string;
  subheadline: string;
}

export function PageHeroDetail({ slug, projectTitle, headline, subheadline }: PageHeroDetailProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Set initial theme based on html class list
    const isDark = document.documentElement.classList.contains('dark');
    const initialTheme = isDark ? 'dark' : 'light';
    setTheme(initialTheme);

    const observer = new MutationObserver(() => {
      const currentDark = document.documentElement.classList.contains('dark');
      setTheme(currentDark ? 'dark' : 'light');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const isDark = theme === 'dark';

  return (
    <div className="w-full relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[40%] h-[30%] rounded-full blur-[300px] z-0 pointer-events-none bg-primary" />

      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center text-center">
            <div
              className={cn(
                'z-20 flex items-center justify-center rounded-md md:rounded-xl transition-all duration-300 hover:scale-105 select-none p-3 mb-8',
                isDark
                  ? 'border border-neutral-300 bg-white/20'
                  : 'border-transparent bg-transparent'
              )}
            >
              <Image
                src={`/logo/${slug}.webp`}
                alt={`${projectTitle} logo`}
                width={200}
                height={64}
                className="h-12 w-auto object-contain md:h-16"
                priority
              />
            </div>

            {/* Headline */}
            <h1 className="max-w-4xl text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-tight px-2">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {headline}
              </span>
            </h1>

            {/* Subheadline */}
            <p className="max-w-2xl text-sm sm:text-base text-tertiary mt-6 leading-relaxed px-4">
              {subheadline}
            </p>

            {/* Get Consultation Button - Dynamic gradient utilizing primary and accent branding variables */}
            <div className="mt-10 mb-8 md:mb-16">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-6 py-3 hover:brightness-110 text-white rounded-full font-medium text-sm transition-all cursor-pointer bg-gradient-to-r from-primary to-accent"
              >
                <span>Get Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        }
      >
        <Image
          src={`/product/hero/${slug}.webp`}
          alt={`${projectTitle} Dashboard`}
          width={1920}
          height={1080}
          className="h-full w-full object-contain"
          priority
        />
      </ContainerScroll>
    </div>
  );
}
