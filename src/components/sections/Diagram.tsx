'use client';

import React, { forwardRef, useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { BarChart3, Zap, Package, Tag, LineChart, Rocket } from 'lucide-react';
import { AnimatedBeam } from '@/components/ui/AnimateBeam';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

const FeatureCard = forwardRef<
  HTMLDivElement,
  { className?: string; children: React.ReactNode }
>(({ className, children }, ref) => (
  <div
    ref={ref}
    className={cn(
      "z-10 flex select-none hover:scale-105 transition-all duration-300",
      "border border-border bg-card text-tertiary shadow-[0_4px_12px_-2px_rgba(0,0,0,0.05)]",
      // Mobile: vertical card layout, fixed height and width
      "flex-col items-center justify-center text-center p-2.5 h-16 w-[140px] rounded-md",
      // Desktop: horizontal card layout, height 14, min-w-72
      "md:flex-row md:items-center md:gap-2 md:px-4 md:h-14 md:w-auto md:min-w-72 md:rounded-xl",
      className
    )}
  >
    {children}
  </div>
));
FeatureCard.displayName = "FeatureCard";

function CustomIcon({ name, className = 'w-4.5 h-4.5' }: { name: string; className?: string }) {
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

const DEFAULT_CARDS = [
  { label: 'completeVisibility', icon: <BarChart3 className="h-4.5 w-4.5" /> },
  { label: 'fasterCheckout', icon: <Zap className="h-4.5 w-4.5" /> },
  { label: 'accurateInventory', icon: <Package className="h-4.5 w-4.5" /> },
  { label: 'betterPurchasing', icon: <Tag className="h-4.5 w-4.5" /> },
  { label: 'actionableInsights', icon: <LineChart className="h-4.5 w-4.5" /> },
  { label: 'readyToGrow', icon: <Rocket className="h-4.5 w-4.5" /> },
];

export function Diagram({ projectSlug }: { projectSlug?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const topLeftRef = useRef<HTMLDivElement>(null);
  const topRightRef = useRef<HTMLDivElement>(null);
  const midLeftRef = useRef<HTMLDivElement>(null);
  const midRightRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  const [isDark, setIsDark] = useState(false);
  const tGlobal = useTranslations('diagram');
  const tDetail = useTranslations('product-detail');

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          setIsDark(document.documentElement.classList.contains("dark"));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const beamPathColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.5)';

  const initialLogos = ['classix', 'diggit', 'jipies', 'kruu', 'pipely', 'plannr', 'sailoo'];
  const logoSrc =
    projectSlug && initialLogos.includes(projectSlug)
      ? `/logo/${projectSlug}-initial.webp`
      : '/logo/classix-initial.webp';

  let heading = tGlobal('heading');
  let description = tGlobal('description');
  let logoAlt = tGlobal('logoAlt') || "Project Logo";

  interface CardData {
    label: string;
    icon: string | React.ReactNode;
  }
  let cards: CardData[] = [];

  try {
    if (projectSlug) {
      const hasCustomDiagram = tDetail.raw(`projects.${projectSlug}.diagram`) ? true : false;
      if (hasCustomDiagram) {
        heading = tDetail(`projects.${projectSlug}.diagram.heading`);
        description = tDetail(`projects.${projectSlug}.diagram.description`);
        logoAlt = tDetail(`projects.${projectSlug}.diagram.logoAlt`) || "Project Logo";
        const rawCards = tDetail.raw(`projects.${projectSlug}.diagram.cards`) as {
          label: string;
          icon: string;
        }[];
        if (rawCards && rawCards.length === 6) {
          cards = rawCards.map((c) => ({
            label: c.label,
            icon: c.icon,
          }));
        }
      }
    }
  } catch (e) {
    // Ignore and use fallback
  }

  // Fallback if cards array was not loaded or is incomplete
  if (cards.length < 6) {
    cards = DEFAULT_CARDS.map((c) => ({
      label: tGlobal(c.label),
      icon: c.icon,
    }));
  }

  const renderIcon = (icon: string | React.ReactNode) => {
    if (typeof icon === 'string') {
      return <CustomIcon name={icon} className="h-5 w-5 sm:h-4.5 sm:w-4.5 text-primary" />;
    }
    return <div className="h-5 w-5 sm:h-4.5 sm:w-4.5 text-primary flex items-center justify-center">{icon}</div>;
  };

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 bg-background text-foreground">
      {/* Background radial gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.3),transparent_65%)]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl max-w-2xl mx-auto font-medium tracking-tight">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-medium">
            {heading}
          </span>
        </h2>
        <p className="max-w-4xl mx-auto text-sm sm:text-base text-tertiary mt-4 leading-relaxed">
          {description}
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative mx-auto mt-16 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-5 md:grid-rows-3 items-center px-6 h-[480px] md:h-[520px] w-full max-w-7xl"
      >
        {/* Row 1 - Column 2 and 4 */}
        <FeatureCard
          ref={topLeftRef}
          className="justify-center col-start-1 row-start-1 justify-self-start md:col-start-2 md:row-start-1 md:justify-self-end"
        >
          {renderIcon(cards[0].icon)}
          <span className="text-[8px] sm:text-[10px] leading-tight md:text-sm font-medium mt-1 md:mt-0">
            {cards[0].label}
          </span>
        </FeatureCard>

        <FeatureCard
          ref={topRightRef}
          className="justify-center col-start-2 row-start-1 justify-self-end md:col-start-4 md:row-start-1 md:justify-self-start"
        >
          {renderIcon(cards[1].icon)}
          <span className="text-[8px] sm:text-[10px] leading-tight md:text-sm font-medium mt-1 md:mt-0">
            {cards[1].label}
          </span>
        </FeatureCard>

        {/* Row 2 - Column 1, 3, and 5 */}
        <FeatureCard
          ref={midLeftRef}
          className="justify-center col-start-1 row-start-2 justify-self-start md:col-start-1 md:row-start-2 md:justify-self-start"
        >
          {renderIcon(cards[2].icon)}
          <span className="text-[8px] sm:text-[10px] leading-tight md:text-sm font-medium mt-1 md:mt-0">
            {cards[2].label}
          </span>
        </FeatureCard>

        {/* Center Logo Box in Column 3 / Row 4 on mobile */}
        <div
          ref={centerRef}
          className="col-span-2 row-start-4 justify-self-center mt-6 md:col-start-3 md:row-start-2 md:col-span-1 md:justify-self-center md:mt-0 z-20 mx-auto flex h-28 w-28 items-center justify-center rounded-2xl hover:scale-105 transition-all duration-300 border border-border bg-card shadow-[0_4px_12px_-2px_rgba(0, 0, 0, 0.05)]"
        >
          <div className="w-24 h-24 rounded-md md:rounded-xl p-5 bg-white dark:bg-transparent">
            <Image
              src={logoSrc}
              alt={logoAlt}
              width={64}
              height={64}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <FeatureCard
          ref={midRightRef}
          className="justify-center col-start-2 row-start-2 justify-self-end md:col-start-5 md:row-start-2 md:justify-self-end"
        >
          {renderIcon(cards[3].icon)}
          <span className="text-[8px] sm:text-[10px] leading-tight md:text-sm font-medium mt-1 md:mt-0">
            {cards[3].label}
          </span>
        </FeatureCard>

        {/* Row 3 - Column 2 and 4 */}
        <FeatureCard
          ref={bottomLeftRef}
          className="justify-center col-start-1 row-start-3 justify-self-start md:col-start-2 md:row-start-3 md:justify-self-end"
        >
          {renderIcon(cards[4].icon)}
          <span className="text-[8px] sm:text-[10px] leading-tight md:text-sm font-medium mt-1 md:mt-0">
            {cards[4].label}
          </span>
        </FeatureCard>

        <FeatureCard
          ref={bottomRightRef}
          className="justify-center col-start-2 row-start-3 justify-self-end md:col-start-4 md:row-start-3 md:justify-self-start"
        >
          {renderIcon(cards[5].icon)}
          <span className="text-[8px] sm:text-[10px] leading-tight md:text-sm font-medium mt-1 md:mt-0">
            {cards[5].label}
          </span>
        </FeatureCard>

        {/* Beams - orthogonal lines flowing simultaneously toward the center logo card */}
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={topLeftRef}
          toRef={centerRef}
          lineType="orthogonal"
          pathColor={beamPathColor}
          duration={4}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={topRightRef}
          toRef={centerRef}
          lineType="orthogonal"
          pathColor={beamPathColor}
          duration={4}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={midLeftRef}
          toRef={centerRef}
          lineType="orthogonal"
          pathColor={beamPathColor}
          duration={4}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={midRightRef}
          toRef={centerRef}
          lineType="orthogonal"
          pathColor={beamPathColor}
          duration={4}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={bottomLeftRef}
          toRef={centerRef}
          lineType="orthogonal"
          pathColor={beamPathColor}
          duration={4}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={bottomRightRef}
          toRef={centerRef}
          lineType="orthogonal"
          pathColor={beamPathColor}
          duration={4}
        />
      </div>
    </section>
  );
}

export default Diagram;
