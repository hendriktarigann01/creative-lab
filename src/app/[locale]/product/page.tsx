'use client';

import { useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { PageHero } from '@/components/ui/PageHero';
import { ProductShowcase } from '@/components/sections/ProductShowcase';
import { Footer } from '@/components/layout/Footer';
import { ProjectDetail } from '@/types';

export default function ProductPage() {
  const t = useTranslations('product');
  const tDetail = useTranslations('product-detail');
  const locale = useLocale();

  // Load and sanitize product list (exclude static Landing Pages)
  const projectsMap = tDetail.raw('projects') as Record<string, ProjectDetail>;
  const products = Object.values(projectsMap).filter((item) => item.category !== 'Landing Page');

  // Scope CSS scroll-snap to this page only. We toggle the classes on the
  // actual document scroller (<html>) instead of a global <style> override,
  // so it self-cleans on unmount and never leaks into other routes.
  // Deliberately NOT pairing this with `scroll-behavior: smooth` — combining
  // smooth-scroll easing with `scroll-snap-type: mandatory` + `snap-always`
  // makes the two animation systems fight each other, which is what caused
  // the stutter/overshoot ("glitch") on snap.
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    html.classList.add('snap-y', 'snap-mandatory');
    body.classList.add('snap-y', 'snap-mandatory');
    return () => {
      html.classList.remove('snap-y', 'snap-mandatory');
      body.classList.remove('snap-y', 'snap-mandatory');
    };
  }, []);

  return (
    <div data-lenis-prevent className="w-full bg-background min-h-dvh pb-24 relative">
      <div className="absolute bottom-[20%] right-0 w-[25%] h-[40%] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <PageHero
        breadcrumbs={[{ name: t('breadcrumb') || 'Product' }]}
        label={t('label') || 'Product'}
        title={t('heading')}
        description={t('subheading')}
        accentColor="#540ee1"
        className="h-screen snap-center snap-always mt-[-96px]"
      />

      {/* Product List Showcase Component */}
      <ProductShowcase products={products} locale={locale} />

      {/* Footer wrapped in scroll-snap section */}
      <div className="snap-center snap-always w-full">
        <Footer />
      </div>
    </div>
  );
}
