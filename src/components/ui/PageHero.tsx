'use client';

import { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Badge } from '@/components/ui/Badge';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';
import { useRouter } from '@/i18n/routing';

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

  // Build the title with highlighted word
  let titleContent: ReactNode = title;
  if (gradientWord && title.includes(gradientWord)) {
    const parts = title.split(gradientWord);
    titleContent = (
      <>
        {parts[0]}
        {accentColor ? (
          <span
            className="drop-shadow-[0_4px_15px_rgba(0,0,0,0.15)]"
            style={{ color: accentColor }}
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
  const glowColor = accentColor || 'var(--primary)';

  return (
    <section
      className={`relative overflow-hidden w-full pt-8 sm:pt-12 pb-12 sm:pb-16 bg-background ${className || ''}`}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-[15%] right-[-12%] w-[40%] h-[40%] rounded-full blur-[120px] pointer-events-none opacity-[0.06]"
        style={{ backgroundColor: glowColor }}
      />

      <Container>
        <AnimateOnScroll variant="fadeIn">
          {/* Back button */}
          {backButton && (
            <button
              onClick={() => router.push(backButton.href as never)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors duration-200 mb-8 cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
              {backButton.label}
            </button>
          )}

          {/* Breadcrumbs */}
          {breadcrumbs && !backButton && <Breadcrumb items={breadcrumbs} />}

          {/* Content */}
          <div
            className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}
          >
            {/* Badge */}
            {label && (
              <Badge
                variant="primary"
                className="mb-4"
                style={
                  accentColor
                    ? {
                        backgroundColor: `${accentColor}15`,
                        borderColor: `${accentColor}30`,
                        color: accentColor,
                      }
                    : undefined
                }
              >
                {label}
              </Badge>
            )}

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground mb-6 leading-tight">
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
      </Container>
    </section>
  );
}
