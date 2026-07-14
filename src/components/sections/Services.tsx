'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { SERVICE_ASSETS } from '@/constants/services';
import { ServiceItem } from '@/types';

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const },
  }),
};

export function Services() {
  const t = useTranslations('services');
  const [activeIndex, setActiveIndex] = useState(0);

  const servicesData = (t.raw('servicesData') as ServiceItem[]) || [];

  const services = servicesData.map((item) => ({
    ...item,
    asset: SERVICE_ASSETS[item.slug] || '/service/enterprise.webp',
  }));

  const activeService = services[activeIndex] ?? services[0];

  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-medium tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent sm:text-4xl">
            {t('showcaseHeading')}
          </h2>
          <p className="mt-4 text-sm text-tertiary/75 sm:text-base leading-relaxed">
            {t('showcaseSubheading')}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          {/* Left Column: Interactive Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {services.map((item, i) => (
              <motion.div
                key={item.slug}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
                onMouseEnter={() => setActiveIndex(i)}
                className={`cursor-pointer bg-card rounded-xl p-5 border transition-all duration-300 select-none ${
                  i === activeIndex
                    ? 'border-border  ring-5 ring-primary/15'
                    : 'border-border  hover:border-white/20'
                }`}
              >
                <h3 className="min-h-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-base font-medium">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-tertiary/70">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Dynamic Asset Preview */}
          <div className="relative mx-auto flex h-[320px] w-full max-w-md items-center justify-center sm:h-[400px]">
            {/* Ambient Purple background glow */}
            <div className="absolute inset-0 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.asset}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="relative z-10 h-full w-full"
              >
                <Image
                  src={activeService.asset}
                  alt={activeService.title}
                  width={480}
                  height={480}
                  className="h-full w-full object-contain"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
