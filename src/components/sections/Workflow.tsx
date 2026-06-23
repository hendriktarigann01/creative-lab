'use client';

import { Search, Map, Code, TestTube, Rocket, HeartHandshake } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';
// import { RandomPattern } from '@/components/ui/RandomPattern';
import { useTranslations } from 'next-intl';

export function Workflow() {
  const t = useTranslations('workflow');

  const getIcon = (iconName: string) => {
    const iconStyles = 'w-5 h-5 text-white';
    switch (iconName) {
      case 'Search':
        return <Search className={iconStyles} />;
      case 'Map':
        return <Map className={iconStyles} />;
      case 'Code':
        return <Code className={iconStyles} />;
      case 'TestTube':
        return <TestTube className={iconStyles} />;
      case 'Rocket':
        return <Rocket className={iconStyles} />;
      case 'HeartHandshake':
        return <HeartHandshake className={iconStyles} />;
      default:
        return null;
    }
  };

  const translatedSteps = [
    { step: '01', title: t('step1.title'), desc: t('step1.desc'), icon: 'Search' },
    { step: '02', title: t('step2.title'), desc: t('step2.desc'), icon: 'Map' },
    { step: '03', title: t('step3.title'), desc: t('step3.desc'), icon: 'Code' },
    { step: '04', title: t('step4.title'), desc: t('step4.desc'), icon: 'TestTube' },
    { step: '05', title: t('step5.title'), desc: t('step5.desc'), icon: 'Rocket' },
    { step: '06', title: t('step6.title'), desc: t('step6.desc'), icon: 'HeartHandshake' },
  ];

  return (
    <section id="workflow" className="relative py-24 sm:py-32 bg-background overflow-hidden">
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[60%] h-[40%] rounded-full bg-[#ec4899]/3 blur-[140px] pointer-events-none" />

      <Container>
        <AnimateOnScroll variant="slideUp">
          <SectionHeader
            label={t('heading')}
            title={t('heading')}
            gradientWord={t('gradientWord')}
            description={t('subheading')}
          />
        </AnimateOnScroll>

        {/* Stepper Container */}
        <div className="relative mt-8 sm:mt-16">
          {/* Connecting Line - Desktop Only */}
          <div className="hidden lg:block absolute top-7 left-[8.33%] right-[8.33%] h-0.5 bg-linear-to-r from-[#AB7FEB] to-[#540EE1] opacity-35 z-0" />

          {/* Stepper Grid */}
          <AnimateOnScroll
            variant="staggerContainer"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10"
          >
            {translatedSteps.map((step, index) => (
              <AnimateOnScroll
                key={index}
                variant="staggerItem"
                className="flex flex-col items-center text-center h-full"
              >
                {/* Step Circle & Number Badge */}
                <div className="relative flex items-center justify-center mb-6">
                  {/* Connecting Line - Mobile Only */}
                  {index < translatedSteps.length - 1 && (
                    <div className="lg:hidden absolute bottom-[-32px] left-1/2 -translate-x-1/2 w-0.5 h-8 bg-linear-to-b from-[#AB7FEB] to-[#540EE1] opacity-35 z-0" />
                  )}

                  {/* Icon */}
                  <div className="w-14 h-14 p-4 rounded-2xl bg-linear-to-r from-[#AB7FEB] to-[#540EE1] flex items-center justify-center shadow-md shadow-gamification/20 relative z-10">
                    {getIcon(step.icon)}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-foreground tracking-tight mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px] sm:max-w-[260px] lg:max-w-none">
                  {step.desc}
                </p>
              </AnimateOnScroll>
            ))}
          </AnimateOnScroll>
        </div>
      </Container>
    </section>
  );
}
