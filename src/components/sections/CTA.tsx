'use client';

import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useTranslations } from 'next-intl';

interface CTAProps {
  hidePattern?: boolean;
}

export function CTA({ hidePattern: _hidePattern }: CTAProps = {}) {
  const t = useTranslations('cta');

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <Container className="relative z-10">
        <div className=" mx-auto text-center flex flex-col items-center gap-6 sm:gap-8">
          <AnimateOnScroll variant="slideUp">
            <SectionHeader
              label={t('label') || 'CTA'}
              title={t('heading')}
              description={t('description')}
              align="center"
              className="mb-0 sm:mb-0 "
            />
          </AnimateOnScroll>

          <AnimateOnScroll variant="slideUp" className="mt-4">
            <Button href="/contact" variant="primary" size="md" className="group">
              {t('ctaText')}
            </Button>
          </AnimateOnScroll>
        </div>
      </Container>
    </section>
  );
}
