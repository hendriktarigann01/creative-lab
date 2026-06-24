'use client';

import { ReactNode, useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Badge } from '@/components/ui/Badge';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';
import { useRouter } from '@/i18n/routing';
import Globe from '@/components/ui/Globe';

interface BreadcrumbItem {
  name: string;
  path?: string;
}

interface PageHeroProps {
  /** Small badge/pill label text */
  label?: string;
  /** Main heading */
  title: string;
  /** Word within title to highlight with color/gradient */
  gradientWord?: string;
  /** Subtitle paragraph */
  description?: string;
  /** Custom accent color (e.g. "#10b981"). Falls back to brand purple gradient */
  accentColor?: string;
  /** Breadcrumb items */
  breadcrumbs?: BreadcrumbItem[];
  /** Back button config (replaces breadcrumbs) */
  backButton?: { label: string; href: string };
  /** Text alignment */
  align?: 'center' | 'left';
  /** Extra content below description */
  children?: ReactNode;
  /** Additional className for the outer section */
  className?: string;
}

export function PageHero({
  label,
  title,
  gradientWord,
  description,
  accentColor,
  breadcrumbs,
  backButton,
  align = 'left',
  children,
  className,
}: PageHeroProps) {
  const router = useRouter();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const resolvedAccentColor = accentColor === '#540ee1' && !isDark ? '#ab7feb' : accentColor;

  // Build the title with highlighted word
  let titleContent: ReactNode = title;
  if (gradientWord && title.includes(gradientWord)) {
    const parts = title.split(gradientWord);
    titleContent = (
      <>
        {parts[0]}
        {resolvedAccentColor ? (
          <span
            className="drop-shadow-[0_4px_15px_rgba(0,0,0,0.15)]"
            style={{ color: resolvedAccentColor }}
          >
            {gradientWord}
          </span>
        ) : (
          <span className="bg-linear-to-r from-[#AB7FEB] to-[#540EE1] bg-clip-text text-transparent">
            {gradientWord}
          </span>
        )}
        {parts[1]}
      </>
    );
  }

  // Glow color — use accentColor or fallback to primary
  const glowColor = resolvedAccentColor;

  return (
    <section
      className={`relative overflow-hidden w-full min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-96px)] flex items-center pt-[80px] md:pt-[96px] bg-background ${className || ''}`}
    >
      <Container className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 w-full">
        {/* Content Section */}
        <div className="relative z-10 flex-none w-full h-[320px] sm:h-[360px] md:h-[420px] md:flex-1">
          <AnimateOnScroll variant="fadeIn" className="h-full flex flex-col justify-between">
            {/* Back button */}
            {backButton && (
              <div className={`w-full flex ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
                <button
                  onClick={() => router.push(backButton.href as never)}
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 mb-8 cursor-pointer group"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
                  {backButton.label}
                </button>
              </div>
            )}

            {/* Breadcrumbs */}
            {breadcrumbs && !backButton && (
              <Breadcrumb
                items={breadcrumbs}
                className={align === 'center' ? 'justify-center' : ''}
              />
            )}

            {/* Content */}
            <div
              className={`max-w-2xl flex flex-col ${
                align === 'center'
                  ? 'mx-auto text-center items-center justify-center'
                  : 'items-start text-left'
              }`}
            >
              {/* Badge */}
              {label && (
                <Badge
                  variant="primary"
                  className="mb-4"
                  style={
                    resolvedAccentColor
                      ? {
                          backgroundColor: `${resolvedAccentColor}15`,
                          borderColor: `${resolvedAccentColor}30`,
                          color: resolvedAccentColor,
                        }
                      : undefined
                  }
                >
                  {label}
                </Badge>
              )}

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground mb-6 leading-tight">
                {titleContent}
              </h1>

              {/* Description */}
              {description && (
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  {description}
                </p>
              )}

              {/* Extra content */}
              {children}
            </div>
          </AnimateOnScroll>
        </div>

        {/* Ambient glow - Mobile/Tablet only */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-[150px] sm:w-[250px] aspect-square rounded-full blur-[80px] sm:blur-[100px] pointer-events-none opacity-50 sm:opacity-30 shrink-0 block md:hidden"
          style={{ backgroundColor: glowColor }}
        />

        {/* Globe Visualization - Desktop only */}
        <Globe
          width={450}
          height={450}
          className="hidden md:block shrink-0 relative z-10"
          isDark={isDark}
          color={resolvedAccentColor || (isDark ? '#540ee1' : '#ab7feb')}
        />
      </Container>
    </section>
  );
}
