'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Contact } from '@/components/sections/Contact';
import { CTA } from '@/components/sections/CTA';
import { ChevronDown } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { PageHero } from '@/components/ui/PageHero';

export default function ContactPage() {
  const t = useTranslations('contact');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const contactFaqs = t.raw('faqs') as { q: string; a: string }[];

  return (
    <div className="bg-background min-h-dvh pb-16 relative overflow-hidden flex flex-col items-center">
      <div className="w-full relative z-10">
        <PageHero
          breadcrumbs={[{ name: tNav('contact') }]}
          label={tNav('contact')}
          title={t('heading')}
          gradientWord={t('gradientWord')}
          description={t('subheading')}
          accentColor="#540ee1"
        />
      </div>

      <div className="w-full relative z-10 -mt-12">
        <Contact hideHeader={true} />
      </div>



      <Container className="relative z-10 mb-20 sm:mb-28 ">
        <SectionHeader
          label="FAQ"
          title={t('faqTitle')}
          gradientWord={locale === 'id' ? 'Pertanyaan' : 'Questions'}
          description={t('faqSub')}
          align="center"
        />

        <div className="flex flex-col gap-4 mt-10">
          {contactFaqs &&
            contactFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl bg-card transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left text-foreground font-medium transition-colors duration-200 hover:text-primary cursor-pointer"
                  >
                    <span className="text-base sm:text-lg">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-primary' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="p-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </Container>

      <div className="w-full relative z-10">
        <CTA hidePattern={true} />
      </div>
    </div>
  );
}
