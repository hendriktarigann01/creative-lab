'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';
import { ProjectCTA } from '@/types';
import { useTranslations } from 'next-intl';

interface CTAProductProps {
  projectSlug: string;
  ctaData?: ProjectCTA;
}

export default function CTAProduct({ projectSlug, ctaData }: CTAProductProps) {
  const t = useTranslations('projectDetail');
  if (!ctaData) return null;

  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-6 bg-background">
      <div className="mx-auto max-w-7xl relative rounded-md md:rounded-xl border border-border overflow-hidden pt-6 md:pt-12 px-12 sm:px-16 md:px-20 flex flex-col items-center">
        {/* Background radial gradient */}
        <div className="pointer-events-none absolute bottom-[20%] left-1/2 -translate-x-1/2 translate-y-1/2 w-[120%] h-[140%] z-0 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.30)_0%,rgba(124,58,237,0.15)_40%,transparent_70%)]" />

        <div className="relative z-10 w-full flex flex-col items-center">
          {/* Title */}
          <AnimateOnScroll>
            <h2 className="text-center text-2xl sm:text-3xl md:text-4xl max-w-2xl mx-auto font-medium tracking-tight">
              <span className="bg-gradient-to-r from-[#AB7FEB] to-[#540EE1] bg-clip-text text-transparent">
                {ctaData.title}
              </span>
            </h2>
          </AnimateOnScroll>
          {/* Subtitle */}
          <AnimateOnScroll className="delay-100">
            <p className="max-w-2xl mx-auto px-4 text-center text-xs sm:text-base text-tertiary mt-4 leading-relaxed">
              {ctaData.subtitle}
            </p>
          </AnimateOnScroll>
          {/* Button */}
          <AnimateOnScroll className="mt-8 delay-200">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              className="bg-linear-to-r from-[#AB7FEB] to-[#540EE1] group rounded-full font-medium"
            >
              <span className="text-sm font-light">
                {t('getConsultation') || 'Get Consultation'}
              </span>
              <span className="inline-block transition-transform group-hover:translate-x-1 duration-150 ml-1">
                →
              </span>
            </Button>
          </AnimateOnScroll>
          {/* Dashboard Mockup */}
          <div className="w-full mt-12 md:mt-16 delay-300">
            <div className="w-full overflow-hidden">
              <Image
                src={`/product/cta/${projectSlug}.webp`}
                alt={
                  t('dashboardPreview', { title: projectSlug }) ||
                  `${projectSlug} Dashboard Preview`
                }
                width={1920}
                height={1080}
                className="w-full h-auto shadow-[0_0_0_4px_rgba(255,255,255,0.6)]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
