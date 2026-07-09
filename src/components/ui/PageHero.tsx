'use client';

import { ReactNode, useState, useEffect } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';

interface BreadcrumbItem {
  name: string;
  path?: string;
}

interface PageHeroProps {
  label?: string;
  title: string;
  description?: string;
  accentColor?: string;
  breadcrumbs?: BreadcrumbItem[];
  backButton?: { label: string; href: string };
  align?: 'center' | 'left';
  children?: ReactNode;
  className?: string;
  imageFolder?: 'product' | 'portfolio' | 'service';
}

export function PageHero({
  label,
  title,
  description,
  accentColor,
  children,
  className,
  imageFolder = 'product',
}: PageHeroProps) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const update = () => setIsDark(document.documentElement.classList.contains('dark'));
    update();

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const heroImage = isDark
    ? `/${imageFolder}/hero/hero-dark.webp`
    : `/${imageFolder}/hero/hero-light.webp`;

  const isFullScreen = className?.includes('h-screen');

  return (
    <section className={`relative w-full bg-background overflow-hidden ${isFullScreen ? 'h-screen flex items-center' : ''} ${className || ''}`}>
      <div className={`mx-auto gap-10 w-full max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between ${isFullScreen ? 'mt-12' : 'min-h-[70vh] md:min-h-[80vh]'}`}>
        {/* Left — text content */}
        <AnimateOnScroll
          variant="fadeIn"
          className={`flex-1 flex flex-col justify-center gap-6 max-w-xl ${isFullScreen ? '' : 'py-16 md:py-24'}`}
        >
          {/* Badge */}
          {label && (
            <Badge variant="primary" className="self-start">
              {label}
            </Badge>
          )}

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight leading-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p className="text-sm md:text-base text-tertiary leading-relaxed max-w-xl">
              {description}
            </p>
          )}

          {/* Extra content (e.g. CTA buttons) */}
          {children}
        </AnimateOnScroll>

        {/* Right — hero image */}
        <div className="hidden md:flex flex-1 items-center justify-center relative h-[450px] lg:h-[550px] w-full self-center">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.30)_0%,rgba(124,58,237,0.15)_40%,transparent_70%)]" />
          <div className="relative w-full h-full max-h-[500px]">
            <Image
              src={heroImage}
              alt="Hero illustration"
              fill
              className="object-contain object-bottom"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
