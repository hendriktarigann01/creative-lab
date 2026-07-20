'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

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
      className={cn("inline-block shrink-0", className)}
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-medium">
              {heading}
            </span>
          </h2>
          <p className="max-w-4xl mx-auto text-sm sm:text-base text-tertiary mt-4 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Feature Interactive Card Box */}
        <div className="w-full border border-border rounded-md md:rounded-xl bg-card p-4">
          {/* Mobile Dropdown Tab Selector */}
          <div className="relative sm:hidden w-full mb-6">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex w-full items-center justify-between gap-2.5 rounded-md border border-primary bg-primary/10 px-4 py-3.5 text-sm font-medium transition-all duration-200 cursor-pointer text-primary"
            >
              <div className="flex items-center gap-2">
                <CustomIcon name={activeItem.tabIconName} className="w-5 h-5" />
                <span>{activeItem.tabLabel}</span>
              </div>
              <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform duration-200", isDropdownOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 right-0 mt-2 z-30 max-h-60 overflow-y-auto rounded-md border border-border bg-card p-1.5 shadow-lg"
                >
                  {features.map((item, idx) => {
                    const isActive = activeTab === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setActiveTab(idx);
                          setIsDropdownOpen(false);
                        }}
                        className={cn(
                          "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition-all duration-150 cursor-pointer",
                          isActive
                            ? "bg-primary/15 text-primary font-medium"
                            : "text-tertiary/75 hover:bg-muted/30 hover:text-foreground"
                        )}
                      >
                        <CustomIcon name={item.tabIconName} className="w-4 h-4" />
                        <span>{item.tabLabel}</span>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Tab Selector Grid */}
          <div className="hidden sm:grid grid-cols-5 gap-2.5 w-full mb-4 select-none">
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border border-border rounded-md md:rounded-xl p-6 items-stretch min-h-[380px]">
              {/* Left side details */}
              <div className="lg:col-span-6 space-y-10 order-2 lg:order-1">
                <div className="space-y-5">
                  <motion.h3
                    key={`title-${activeTab}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-lg sm:text-xl text-foreground leading-snug tracking-tight font-medium"
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

              {/* Right side mockup image */}
              <div className="lg:col-span-6 relative overflow-hidden rounded-md md:rounded-xl bg-muted/40 aspect-[2280/1760] w-full self-center order-1 lg:order-2">
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
                      className="object-contain transition-transform duration-500 hover:scale-102"
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
