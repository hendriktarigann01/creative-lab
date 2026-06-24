'use client';

import { useState } from 'react';
import { Portfolio } from '@/components/sections/Portfolio';
import { portfolioDetails } from '@/data/portfolio-detail';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';
import { ExternalLink, Filter } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { PageHero } from '@/components/ui/PageHero';
import { LazyImage } from '@/components/ui/LazyImage';

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const t = useTranslations('portfolio');
  const locale = useLocale();

  // Get localized portfolio data list dynamically
  const localizedPortfolio = Object.values(portfolioDetails[locale] || portfolioDetails['en']);

  // Localize filter "All" depending on the locale
  const allLabel = locale === 'id' ? 'Semua' : 'All';
  const displayFilter = activeFilter === 'All' ? allLabel : activeFilter;

  // Categories list (English key fallback, but displayed filter list translated where available)
  const categories = [
    'All',
    ...Array.from(new Set(localizedPortfolio.map((item) => item.category))),
  ];

  const filteredProjects =
    activeFilter === 'All'
      ? localizedPortfolio
      : localizedPortfolio.filter((item) => item.category === activeFilter);

  return (
    <div className="bg-background min-h-dvh pb-24 relative overflow-hidden">
      <div className="absolute bottom-[20%] right-[-15%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <PageHero
        breadcrumbs={[{ name: 'Portfolio' }]}
        label="Portfolio"
        title={t('heading')}
        gradientWord={t('gradientWord')}
        description={t('subheading')}
        accentColor="#540ee1"
      />

      {/* Main Interactive Carousel */}
      <Portfolio hideHeader={true} />

      {/* Extended Filterable Grid Section */}
      <Container className="relative z-10 mt-16 sm:mt-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-foreground tracking-tight flex items-center">
              {t('showcaseTitle')}
            </h2>
          </div>

          {/* Dropdown for mobile view */}
          <div className="relative flex md:hidden w-full sm:w-auto">
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="w-full bg-card border border-border rounded-xl px-4 py-2.5 text-sm font-medium text-foreground cursor-pointer focus:outline-none focus:border-primary appearance-none pr-10"
            >
              {categories.map((category) => {
                const displayCatName = category === 'All' ? allLabel : category;
                return (
                  <option key={category} value={category}>
                    {displayCatName}
                  </option>
                );
              })}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
              <Filter className="w-4 h-4" />
            </div>
          </div>

          {/* Buttons for desktop/tablet view */}
          <div className="hidden md:flex flex-wrap gap-2">
            {categories.map((category) => {
              const displayCatName = category === 'All' ? allLabel : category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`
                    px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 border cursor-pointer
                    ${
                      activeFilter === category
                        ? 'bg-primary border-primary text-primary-foreground'
                        : 'bg-muted border-border text-muted-foreground hover:text-foreground hover:border-border/80'
                    }
                  `}
                >
                  {displayCatName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <AnimateOnScroll key={project.title} variant="slideUp" className="h-full">
              <Card className="flex flex-col justify-between h-full border-border bg-card hover:border-primary/20 transition-all duration-300 overflow-hidden group p-0">
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  <LazyImage
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Category Tag */}
                  <span className="absolute top-4 left-4 bg-card/75 backdrop-blur-md border border-border px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-medium text-foreground">
                    {project.category}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1 justify-between gap-5">
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-medium text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-2.5">
                      {project.desc}
                    </p>
                  </div>

                  <div>
                    {/* Tech List - sourced directly from project.technologies */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 bg-muted rounded-md text-[10px] font-medium text-muted-foreground border border-border/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/portfolio/${project.slug}` as any}
                      className="inline-flex items-center text-xs sm:text-sm font-medium tracking-wide gap-1 text-primary hover:underline group/link cursor-pointer mt-auto"
                    >
                      {t('exploreProject')}
                      <ExternalLink className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>
      </Container>
    </div>
  );
}
