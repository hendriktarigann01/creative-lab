'use client';

import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { RandomPattern } from '@/components/ui/RandomPattern';
import { useTranslations } from 'next-intl';

export function CTA({ hidePattern = false }: { hidePattern?: boolean }) {
  const t = useTranslations('cta');

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {!hidePattern && <RandomPattern variant="cta-contact" />}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-primary/10 blur-[100px] sm:blur-[140px] mix-blend-screen pointer-events-none animate-pulse duration-5000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] rounded-full bg-accent/10 blur-[80px] sm:blur-[100px] mix-blend-screen pointer-events-none" />

      <Container className="relative z-10">
        <div className=" mx-auto text-center flex flex-col items-center gap-6 sm:gap-8">
          <AnimateOnScroll variant="slideUp">
            <SectionHeader
              label="CTA"
              title={t('heading')}
              gradientWord={t('gradientWord')}
              description={t('description')}
              align="center"
              className="mb-0 sm:mb-0 "
            />
          </AnimateOnScroll>

          <AnimateOnScroll variant="slideUp" className="mt-4">
            <Button href="/contact" variant="primary" size="lg" className="group">
              {t('ctaText')}
            </Button>
          </AnimateOnScroll>
        </div>
      </Container>
    </section>
  );
}
