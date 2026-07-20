'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { PRODUCT_CATEGORIES } from '@/constants/products';
import { ProjectDetailItem, ProductShowcaseProps } from '@/types';

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.06, ease: 'easeOut' as const },
  }),
};

export function ProductListShowcase({
  products: _products,
  locale: _locale,
}: ProductShowcaseProps = {}) {
  const t = useTranslations('productShowcase');
  const tCommon = useTranslations();
  const tDetail = useTranslations('product-detail');

  const [activeKey, setActiveKey] = useState(PRODUCT_CATEGORIES[PRODUCT_CATEGORIES.length - 1].key);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Load projects dynamically from product-detail.json
  const projectsMap = (tDetail.raw('projects') as Record<string, ProjectDetailItem>) || {};
  const allProjects = Object.values(projectsMap);

  const categories = PRODUCT_CATEGORIES.map((cat) => {
    // Map the English categoryName to the current localized category name using categories namespace in common.json
    const localizedCatName = tCommon(`categories.${cat.categoryName}`);
    const categoryProjects = allProjects.filter((p) => p.category === localizedCatName);

    return {
      ...cat,
      label: localizedCatName,
      projects: categoryProjects,
    };
  });

  const activeCategory = categories.find((c) => c.key === activeKey) ?? categories[0];

  const getLogoSrc = (slug: string, categoryKey: string) => {
    if (categoryKey === 'play-lab') {
      return '/logo/playlab.webp';
    }
    return `/logo/${slug}.webp`;
  };

  const getMockupSrc = (slug: string, categoryKey: string) => {
    if (categoryKey === 'play-lab' || slug === 'registr') {
      return `/product/apps/${slug}/${slug}-mockup.webp`;
    }
    return `/product/mockup/${slug}.webp`;
  };

  return (
    <section className="bg-background py-20 sm:py-28 relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-medium tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent sm:text-4xl">
            {t('heading')}
          </h2>
          <p className="mt-4 text-sm text-tertiary/75 sm:text-base leading-relaxed">
            {t('subheading')}
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-border bg-white/5 p-6 backdrop-blur-md shadow-xs sm:p-8">
          {/* Desktop Categories Selector */}
          <div className="hidden sm:flex flex-nowrap gap-2 overflow-x-auto pb-2 hide-scrollbar">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = category.key === activeKey;
              return (
                <button
                  key={category.key}
                  onClick={() => setActiveKey(category.key)}
                  className={`flex shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-primary/15 border border-accent/30 text-accent'
                      : 'bg-navbar/15 text-tertiary/60 border border-transparent hover:text-tertiary'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {category.label}
                </button>
              );
            })}
          </div>

          {/* Mobile Dropdown Category Selector */}
          <div className="relative sm:hidden w-full">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex w-full items-center justify-between gap-2 rounded-lg bg-primary/15 border border-accent/30 text-accent px-4 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                {(() => {
                  const ActiveIcon = activeCategory.icon;
                  return <ActiveIcon className="h-4 w-4 shrink-0" />;
                })()}
                <span>{activeCategory.label}</span>
              </div>
              <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 right-0 mt-2 z-30 max-h-60 overflow-y-auto rounded-lg border border-border bg-card p-1 shadow-lg"
                >
                  {categories.map((category) => {
                    const CatIcon = category.icon;
                    const isActive = category.key === activeKey;
                    return (
                      <button
                        key={category.key}
                        onClick={() => {
                          setActiveKey(category.key);
                          setIsDropdownOpen(false);
                        }}
                        className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-all duration-150 cursor-pointer ${
                          isActive
                            ? 'bg-primary/15 text-accent font-medium'
                            : 'text-tertiary/75 hover:bg-muted/30 hover:text-foreground'
                        }`}
                      >
                        <CatIcon className="h-4 w-4 shrink-0" />
                        {category.label}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.key}
              className="grid grid-cols-2 gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {activeCategory.projects.length === 0 && (
                <p className="col-span-full py-16 text-center text-sm text-tertiary/45">
                  {t('noProjects')}
                </p>
              )}

              {activeCategory.projects.map((project, i) => (
                <motion.div
                  key={project.slug}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                  className="relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white/[0.02] p-4 sm:p-5 hover:border-white/20 transition-all duration-300 group"
                >
                  {/* Subtle card bottom glow */}
                  <div className="absolute -bottom-[10%] left-0 right-0 h-1/2 rounded-full bg-primary/15 blur-3xl pointer-events-none transition-all duration-300 group-hover:bg-accent/25" />

                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-sm sm:text-base font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {project.title}
                    </h3>
                    <p className="mt-1.5 text-[10px] min-h-[50px] md:min-h-auto xs:text-xs sm:text-sm leading-relaxed text-tertiary/75 line-clamp-3">
                      {project.shortDesc}
                    </p>

                    <div className="my-3 xs:my-5 flex h-16 xs:h-20 sm:h-24 items-center justify-center rounded-xl bg-white/5 border border-white/5 overflow-hidden">
                      <Image
                        src={getMockupSrc(project.slug, activeCategory.key)}
                        alt={project.title}
                        width={240}
                        height={120}
                        className="h-full w-full object-contain p-1.5 transition-transform duration-500 group-hover:scale-103"
                        priority={true}
                      />
                    </div>

                    <button className="mt-auto flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent py-2 sm:py-2.5 text-[10px] xs:text-xs text-white transition-opacity hover:opacity-90 cursor-pointer">
                      Explore
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
