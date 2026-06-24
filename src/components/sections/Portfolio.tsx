'use client';

import { portfolioDetails } from '@/data/portfolio-detail';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Container } from '@/components/ui/Container';
import { usePortfolioCarousel } from '@/hooks/usePortfolioCarousel';
import { ARROW_CLASSES } from '@/constants/portfolio';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { LazyImage } from '@/components/ui/LazyImage';

interface PortfolioProps {
  hideHeader?: boolean;
}

export function Portfolio({ hideHeader = false }: PortfolioProps) {
  const t = useTranslations('portfolio');
  const locale = useLocale();

  const projects = Object.values(
    portfolioDetails[locale as keyof typeof portfolioDetails] || portfolioDetails['en']
  );
  const cards = projects.map((project) => ({
    imgUrl: project.image,
    alt: project.title,
    linkUrl: `/portfolio/${project.slug}`,
  }));

  const { centerIndex, containerRef, setAutoplayActive, cycle, needsPagination } =
    usePortfolioCarousel(cards.length);

  const chevron = (direction: 'left' | 'right') => (
    <svg
      className="relative z-[2] w-4 h-4 md:w-5 md:h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points={direction === 'left' ? '15 18 9 12 15 6' : '9 18 15 12 9 6'} />
    </svg>
  );

  return (
    <section
      id="portfolio"
      className={`relative z-20 overflow-hidden ${hideHeader ? 'py-8' : 'py-24'}`}
    >
      <Container className="flex flex-col items-center">
        {!hideHeader && (
          <SectionHeader
            label={t('heading')}
            title={t('heading')}
            gradientWord={t('gradientWord')}
            description={t('subheading')}
            align="center"
          />
        )}

        <div className="flex items-center justify-center w-full">
          <div
            ref={containerRef}
            onMouseEnter={() => setAutoplayActive(false)}
            onMouseLeave={() => setAutoplayActive(true)}
            className="fan-layout flex relative justify-center items-center w-full md:max-w-[80rem]"
          >
            {cards.map((card, index) => {
              const image = (
                <div className="relative w-full h-full overflow-hidden bg-card rounded-lg md:rounded-3xl">
                  <LazyImage
                    src={card.imgUrl}
                    alt={card.alt || `Card ${index}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center z-10 transition-transform duration-500 hover:scale-105"
                  />
                  {/* Label overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20 flex justify-center items-end h-1/2 pointer-events-none">
                    <span className="text-white font-medium text-sm sm:text-xl md:text-2xl drop-shadow-md text-center">
                      {card.alt}
                    </span>
                  </div>
                </div>
              );
              return card.linkUrl ? (
                <Link
                  key={index}
                  href={card.linkUrl as never}
                  className="fan-card h-3/4 block cursor-pointer"
                >
                  {image}
                </Link>
              ) : (
                <div key={index} className="fan-card">
                  {image}
                </div>
              );
            })}
          </div>
        </div>

        {needsPagination && (
          <div className="flex items-center justify-center gap-4 mt-4 md:mt-6 z-30">
            <button
              className={`${ARROW_CLASSES} w-8 h-8 md:w-10 md:h-10`}
              onClick={() => cycle('left')}
              aria-label="Previous"
            >
              {chevron('left')}
            </button>

            <button
              className={`${ARROW_CLASSES} w-8 h-8 md:w-10 md:h-10`}
              onClick={() => cycle('right')}
              aria-label="Next"
            >
              {chevron('right')}
            </button>
          </div>
        )}
      </Container>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          .fan-layout {
            position: relative;
            width: 100%;
            height: 30rem;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .fan-card {
          position: absolute;
          width: 28rem;
          height: 20rem;
          border-radius: 1.5rem;
          overflow: hidden;
          will-change: transform, opacity;
        }

        @media (max-width: 1024px) {
          .fan-layout {
            height: 18rem;
          }

          .fan-card {
            width: 16rem;
            height: 11rem;
          }
        }

        @media (max-width: 768px) {
          .fan-layout {
            height: 15rem;
          }

          .fan-card {
            width: 13rem;
            height: 9rem;
          }
        }

        @media (max-width: 640px) {
          .fan-layout {
            height: 13rem;
          }

          .fan-card {
            width: 11rem;
            height: 7.5rem;
          }
        }

        @media (max-width: 480px) {
          .fan-layout {
            height: 11rem;
          }

          .fan-card {
            width: 9rem;
            height: 6rem;
          }
        }
        `,
        }}
      />
    </section>
  );
}
