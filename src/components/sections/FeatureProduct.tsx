'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/Container';

interface FeatureItem {
  tabLabel: string;
  tabIconName: string;
  title: string;
  description: string;
  features: { label: string; iconName: string }[];
  img?: string;
}

interface FeatureProductProps {
  projectSlug: string;
}

// Custom CSS mask-based SVG icon renderer supporting dynamic currentColor styling from Tailwind classes
function CustomIcon({ name, className = 'w-4 h-4' }: { name: string; className?: string }) {
  return (
    <span
      className={`inline-block shrink-0 ${className}`}
      style={{
        maskImage: `url(/icons/${name}.svg)`,
        WebkitMaskImage: `url(/icons/${name}.svg)`,
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
        backgroundColor: 'currentColor',
      }}
    />
  );
}

import { useTranslations } from 'next-intl';

export default function FeatureProduct({ projectSlug }: FeatureProductProps) {
  const tDetail = useTranslations('product-detail');
  const tCommon = useTranslations('featureProduct');

  let features: FeatureItem[] = [];
  try {
    features = (tDetail.raw(`projects.${projectSlug}.featuresDetail`) as FeatureItem[]) || [];
  } catch (e) {
    features = [];
  }

  const [activeTab, setActiveTab] = useState(0);

  const activeItem = features[activeTab];

  let heading = tCommon('heading');
  let description = tCommon('description');

  try {
    const hasCustomHeader = tDetail.raw(`projects.${projectSlug}.featuresHeader`) ? true : false;
    if (hasCustomHeader) {
      heading = tDetail(`projects.${projectSlug}.featuresHeader.heading`);
      description = tDetail(`projects.${projectSlug}.featuresHeader.description`);
    }
  } catch (e) {
    // Ignore and fallback
  }

  if (!features || features.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full py-16 sm:py-24 bg-background">
      <Container className="relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl max-w-2xl mx-auto font-medium tracking-tight">
            <span className="bg-gradient-to-r from-[#AB7FEB] to-[#540EE1] bg-clip-text text-transparent">
              {heading}
            </span>
          </h2>
          <p className="max-w-4xl mx-auto text-sm sm:text-base text-tertiary mt-4 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Feature Interactive Card Box */}
        <div className="w-full border border-border bg-card p-4 sm:p-8">
          {/* Scrollable Tab bar replaced with grid to auto-adjust gap and fit full width */}
          <div className="grid grid-cols-5 gap-2.5 w-full pb-4 mb-6 select-none">
            {features.map((item, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center justify-center gap-2 px-3 py-3 text-xs rounded-xl transition-all duration-300 cursor-pointer border text-center ${
                    isActive
                      ? 'bg-primary/10 border-primary text-primary'
                      : 'border-transparent text-tertiary hover:text-foreground hover:bg-muted/30'
                  }`}
                >
                  <CustomIcon name={item.tabIconName} className="w-5 h-5" />
                  <span>{item.tabLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Content Column Layout */}
          {activeItem && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-2 border-border rounded-2xl p-4 items-stretch mt-6 min-h-[380px]">
              {/* Left side details */}
              <div className="lg:col-span-6 space-y-10">
                <div className="space-y-5">
                  <motion.h3
                    key={`title-${activeTab}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-lg sm:text-xl text-foreground leading-snug tracking-tight"
                  >
                    {activeItem.title}
                  </motion.h3>
                  <motion.p
                    key={`desc-${activeTab}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="text-sm text-tertiary leading-relaxed"
                  >
                    {activeItem.description}
                  </motion.p>
                </div>

                {/* Sub features */}
                <ul className="space-y-5">
                  {activeItem.features.map((feat, idx) => (
                    <motion.li
                      key={`feat-${activeTab}-${idx}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                      className="flex items-center gap-3 text-xs sm:text-sm text-foreground"
                    >
                      <span className="w-6 h-6 rounded-lg bg-accent/10 flex justify-center items-center text-accent shrink-0">
                        <CustomIcon name={feat.iconName} className="w-3 h-3" />
                      </span>
                      <span>{feat.label}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Right side live interactive mock UI replaced with a beautiful static image matching the tab content */}
              <div className="lg:col-span-6 relative overflow-hidden rounded-xl border border-border bg-muted/40 aspect-video lg:aspect-auto min-h-[300px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`mockui-${activeTab}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full relative"
                  >
                    <Image
                      src={activeItem.img || `/product/feature/${projectSlug}-1.webp`}
                      alt={
                        tCommon('featuresAlt', { title: projectSlug }) || `${projectSlug} Features`
                      }
                      fill
                      className="object-cover object-left-top transition-transform duration-500 hover:scale-102"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
