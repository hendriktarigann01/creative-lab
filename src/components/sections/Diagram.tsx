"use client";

import React, { forwardRef, useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  BarChart3,
  Zap,
  Package,
  Tag,
  LineChart,
  Rocket,
} from "lucide-react";
import { AnimatedBeam } from "@/components/ui/AnimateBeam";
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';

// Card kecil (feature box) - styled exactly like the white cards in the photo
const FeatureCard = forwardRef<
  HTMLDivElement,
  { className?: string; children: React.ReactNode; isDark?: boolean }
>((({ className, children, isDark }, ref) => (
  <div
    ref={ref}
    className={cn(
      "z-10 flex h-11 items-center gap-2 rounded-xl px-4 select-none hover:scale-105 transition-all duration-300",
      className
    )}
    style={{
      border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e5e7eb",
      background: isDark ? "rgba(10,10,10,0.85)" : "#ffffff",
      boxShadow: "0 4px 12px -2px rgba(0, 0, 0, 0.05)",
    }}
  >
    {children}
  </div>
)));
FeatureCard.displayName = "FeatureCard";

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
  const t = useTranslations('diagram');

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const beamPathColor = isDark ? "rgba(255,255,255,0.15)" : "#e5e7eb";

  const initialLogos = ['classix', 'diggit', 'jipies', 'kruu', 'pipely', 'plannr', 'sailoo'];
  const logoSrc = projectSlug && initialLogos.includes(projectSlug)
    ? `/logo/${projectSlug}-initial.webp`
    : '/logo/classix-initial.webp';

  return (
    <section className="relative overflow-hidden py-24 text-white border-t border-white/5">
      {/* Background radial gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.30),transparent_65%)]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          <span className="bg-gradient-to-r from-violet-400 to-violet-700 bg-clip-text text-transparent">
            {t('heading')}
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-neutral-400">
          {t('description')}
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative mx-auto mt-16 grid h-[520px] w-full max-w-6xl grid-cols-5 grid-rows-3 items-center px-6"
      >
        {/* Row 1 - Column 2 and 4 */}
        <FeatureCard ref={topLeftRef} isDark={isDark} className="justify-center text-tertiary col-start-2 row-start-1 justify-self-end">
          <BarChart3 className="h-4.5 w-4.5" />
          <span className="text-sm font-medium">{t('completeVisibility')}</span>
        </FeatureCard>

        <FeatureCard ref={topRightRef} isDark={isDark} className="justify-center text-tertiary col-start-4 row-start-1 justify-self-start">
          <Zap className="h-4.5 w-4.5" />
          <span className="text-sm font-medium">{t('fasterCheckout')}</span>
        </FeatureCard>

        {/* Row 2 - Column 1, 3, and 5 */}
        <FeatureCard ref={midLeftRef} isDark={isDark} className="justify-center text-tertiary col-start-1 row-start-2 justify-self-start">
          <Package className="h-4.5 w-4.5" />
          <span className="text-sm font-medium">{t('accurateInventory')}</span>
        </FeatureCard>

        {/* Center Logo Box in Column 3 */}
        <div
          ref={centerRef}
          className="col-start-3 row-start-2 z-20 mx-auto flex h-28 w-28 items-center justify-center rounded-2xl hover:scale-105 transition-all duration-300"
          style={{
            border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid #e5e7eb",
            background: isDark ? "rgba(10,10,10,0.85)" : "#ffffff",
            boxShadow: "0 4px 12px -2px rgba(0, 0, 0, 0.05)",
          }}
        >
          <div
            className="w-24 h-24 rounded-xl p-2"
            style={{ background: isDark ? "transparent" : "#ffffff" }}
          >
            <Image
              src={logoSrc}
              alt={t('logoAlt') || "Project Logo"}
              width={64}
              height={64}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <FeatureCard ref={midRightRef} isDark={isDark} className="justify-center text-tertiary col-start-5 row-start-2 justify-self-end">
          <Tag className="h-4.5 w-4.5" />
          <span className="text-sm font-medium">{t('betterPurchasing')}</span>
        </FeatureCard>

        {/* Row 3 - Column 2 and 4 */}
        <FeatureCard ref={bottomLeftRef} isDark={isDark} className="justify-center text-tertiary col-start-2 row-start-3 justify-self-end">
          <LineChart className="h-4.5 w-4.5" />
          <span className="text-sm font-medium">{t('actionableInsights')}</span>
        </FeatureCard>

        <FeatureCard ref={bottomRightRef} isDark={isDark} className="justify-center text-tertiary col-start-4 row-start-3 justify-self-start">
          <Rocket className="h-4.5 w-4.5" />
          <span className="text-sm font-medium">{t('readyToGrow')}</span>
        </FeatureCard>

        {/* Beams - orthogonal lines flowing simultaneously toward the center logo card */}
        <AnimatedBeam containerRef={containerRef} fromRef={topLeftRef}     toRef={centerRef} lineType="orthogonal" pathColor={beamPathColor} duration={4} />
        <AnimatedBeam containerRef={containerRef} fromRef={topRightRef}    toRef={centerRef} lineType="orthogonal" pathColor={beamPathColor} duration={4} />
        <AnimatedBeam containerRef={containerRef} fromRef={midLeftRef}     toRef={centerRef} lineType="orthogonal" pathColor={beamPathColor} duration={4} />
        <AnimatedBeam containerRef={containerRef} fromRef={midRightRef}    toRef={centerRef} lineType="orthogonal" pathColor={beamPathColor} duration={4} />
        <AnimatedBeam containerRef={containerRef} fromRef={bottomLeftRef}  toRef={centerRef} lineType="orthogonal" pathColor={beamPathColor} duration={4} />
        <AnimatedBeam containerRef={containerRef} fromRef={bottomRightRef} toRef={centerRef} lineType="orthogonal" pathColor={beamPathColor} duration={4} />
      </div>
    </section>
  );
}

export default Diagram;
