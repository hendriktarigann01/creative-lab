'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight, X, SlidersHorizontal } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { ProjectDetail } from '@/types';
import { cn } from '@/lib/utils';

interface ProductShowcaseProps {
  products: ProjectDetail[];
  locale: string;
}

const CATEGORIES_ORDER = [
  'All',
  'Business Operations',
  'Workforce & Human Capital',
  'Industry Solutions',
  'Smart CMS',
  'Event & Registration',
  'Play Lab',
];

export function ProductShowcase({ products }: ProductShowcaseProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const t = useTranslations('product');
  const tCat = useTranslations('categories');

  // Filter available categories based on existing products
  const categories = CATEGORIES_ORDER.filter(
    (cat) => cat === 'All' || products.some((p) => p.category === cat || p.category === tCat(cat))
  );

  // Filter products by active category selection
  const filteredProjects = products.filter((project) => {
    if (activeFilter === 'All') return true;
    return project.category === activeFilter || project.category === tCat(activeFilter);
  });

  return (
    <>
      <div className="relative z-10 min-h-screen mt-16 sm:mt-24">
        {filteredProjects.map((project, index) => {
          const isPlayLab = project.category === 'Play Lab';
          const logoSlug =
            project.slug === 'spin-wheel' ? 'playlab' : isPlayLab ? 'playlab' : project.slug;
          const subtitleText = project.subtitle || '';

          return (
            <section
              key={project.slug}
              className="h-screen w-full snap-center snap-always bg-transparent flex items-center justify-center relative overflow-hidden"
            >
              <Container className="w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center justify-between w-full">
                  {/* Left Column: Info Panel */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full gap-6">
                    {/* Top: Logo & Category badge */}
                    <div className="flex flex-col gap-5">
                      <div className="h-16 flex items-center">
                        <Image
                          src={`/logo/${logoSlug}.webp`}
                          alt={`${project.title} Logo`}
                          width={360}
                          height={110}
                          className="h-10 sm:h-16 w-auto object-contain select-none"
                        />
                      </div>
                      <div>
                        <span className="inline-flex px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold tracking-wide uppercase select-none">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Bottom: Subtitle, Title, Desc & Action Button */}
                    <div className="flex flex-col gap-4">
                      <div className="space-y-3">
                        <span className="text-xs sm:text-sm font-medium bg-linear-to-r from-[#AB7FEB] to-[#540EE1] bg-clip-text text-transparent tracking-wider uppercase block select-none">
                          {subtitleText}
                        </span>
                        <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight bg-linear-to-r from-[#AB7FEB] to-[#540EE1] bg-clip-text text-transparent select-none">
                          {project.title}
                        </h3>
                        <p className="text-sm sm:text-base text-tertiary leading-relaxed mt-2 select-none">
                          {project.desc}
                        </p>
                      </div>
                      <div className="pt-2">
                        <Link
                          href={`/product/${project.category
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/(^-|-$)+/g, '')}/${project.slug}`}
                          className="inline-flex items-center gap-2 px-6 py-3 hover:brightness-110 text-white rounded-full font-medium text-sm transition-all cursor-pointer bg-gradient-to-r from-primary to-accent"
                        >
                          <span>
                            {t('explore')} {project.title}
                          </span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Stacked Mockup Images */}
                  <div className="lg:col-span-7 flex flex-col gap-4 lg:gap-5 w-full">
                    {/* Top Mockup */}
                    <div className="relative aspect-square w-full rounded-2xl ml-auto overflow-hidden border border-border bg-card transition-all duration-300 group max-w-[160px] sm:max-w-[220px] lg:max-w-[320px]">
                      <Image
                        src={`/product/apps/${project.slug}/${project.slug}-mockup.webp`}
                        alt={`${project.title} Mockup`}
                        fill
                        className="object-cover object-left-top transition-transform duration-500 select-none"
                        priority={index === 0}
                      />
                    </div>
                    {/* Bottom Case Study */}
                    <div className="relative aspect-square w-full rounded-2xl ml-auto overflow-hidden border border-border bg-card transition-all duration-300 group max-w-[160px] sm:max-w-[220px] lg:max-w-[320px]">
                      <Image
                        src={`/product/apps/${project.slug}/${project.slug}-case.webp`}
                        alt={`${project.title} Case study`}
                        fill
                        className="object-cover object-center transition-transform duration-500 select-none"
                      />
                    </div>
                  </div>
                </div>
              </Container>
            </section>
          );
        })}
      </div>

      {/* Floating Filter Button & Popup Overlay */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-background/30 backdrop-blur-xs z-40 transition-opacity duration-300"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="mb-4 mr-0 w-[280px] bg-card/95 backdrop-blur-md border border-border p-6 flex flex-col gap-1.5 rounded-tr-[50px] rounded-bl-[50px] rounded-tl-lg rounded-br-lg"
            >
              {categories.map((category) => {
                const displayCatName = tCat(category);
                const isActive = activeFilter === category;

                return (
                  <button
                    key={category}
                    onClick={() => {
                      setActiveFilter(category);
                      setIsFilterOpen(false);
                    }}
                    className={cn(
                      'w-full text-center px-4 py-2.5 rounded-2xl text-sm transition-all cursor-pointer font-medium border border-transparent',
                      isActive
                        ? 'bg-primary/10 border-primary/20 text-primary font-semibold'
                        : 'text-foreground hover:bg-muted/50 hover:text-foreground'
                    )}
                  >
                    {displayCatName}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
          aria-label="Filter products"
        >
          {isFilterOpen ? <X className="w-6 h-6" /> : <SlidersHorizontal className="w-6 h-6" />}
        </button>
      </div>
    </>
  );
}
