'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { PageHero } from '@/components/ui/PageHero';
import { LazyImage } from '@/components/ui/LazyImage';
import { useTranslations } from 'next-intl';

interface TemplateItem {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  category: string;
}

export default function PortfolioTemplatesPage() {
  const t = useTranslations('portfolio');
  const templates = (t.raw('templates') as TemplateItem[]) || [];

  return (
    <div className="bg-background min-h-dvh pb-24 relative overflow-hidden">
      <div className="absolute bottom-[20%] right-[-15%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <PageHero
        breadcrumbs={[{ name: t('breadcrumb') || 'Portfolio' }]}
        label={t('showcaseTitle')}
        title={t('heading')}
        description={t('subheading')}
        accentColor="#540ee1"
        imageFolder="portfolio"
      />

      {/* Grid of Templates */}
      <Container className="mt-10 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent  text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight">
            {t('showcaseTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 min-h-[50vh]">
          {templates.map((template) => (
            <AnimateOnScroll key={template.slug} variant="slideUp" className="h-full">
              <Card className="flex flex-col justify-between h-full border-2 border-border bg-card hover:border-primary/20 transition-all duration-300 overflow-hidden group p-0">
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden px-6 pt-6">
                  <LazyImage
                    src={`/portfolio/thumbnails/${template.slug}.webp`}
                    alt={template.name}
                    fill
                    className="object-cover w-full h-full transition-transform duration-500"
                  />
                </div>

                <div className="px-6 py-6 flex flex-col flex-1 justify-between gap-5">
                  <div>
                    <h3 className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-base sm:text-lg md:text-xl font-medium tracking-tight">
                      {template.name}
                    </h3>
                    <p className="text-tertiary text-xs sm:text-sm leading-relaxed mt-3">
                      {template.description}
                    </p>
                  </div>

                  <a
                    href={`/portfolio/${template.slug}`}
                    className="bg-gradient-to-r from-primary to-accent px-5 py-3 rounded-full w-fit inline-flex items-center text-xs sm:text-sm font-medium tracking-wide gap-1 text-white cursor-pointer"
                  >
                    {t('exploreProject')}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </div>
  );
}
