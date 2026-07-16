'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useTranslations } from 'next-intl';
import { WORKFLOW_STEPS } from '@/constants/workflow';
import { ProcessStep } from '@/types';

const VH_PER_STEP = 0.85;

function StepCard({ step, active }: { step: ProcessStep; active: boolean }) {
  return (
    <div
      className={`rounded-xl border p-4 shadow-xs transition-all duration-300 ${
        active
          ? 'border-accent/40 bg-accent/5 ring-4 ring-accent/15 shadow-[0_0_20px_rgba(171,127,235,0.06)]'
          : 'border-white/10 bg-white/[0.02]'
      }`}
    >
      <h3
        className={`text-sm font-medium transition-colors duration-300 ${
          active
            ? 'bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'
            : 'text-tertiary/85'
        }`}
      >
        {step.title}
      </h3>
      <p className="mt-1.5 text-[11px] leading-relaxed text-tertiary/65">{step.description}</p>
    </div>
  );
}

function ActiveStepVisual({ step }: { step: ProcessStep }) {
  return (
    <div className="flex h-[600px] md:h-[400px] w-[200px] items-center justify-center relative select-none">
      <AnimatePresence mode="wait">
        <motion.div key={step.id} className="relative z-10">
          <Image
            src={step.image}
            alt={`${step.title} step illustration`}
            width={160}
            height={420}
            className="select-none"
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function Workflow() {
  const t = useTranslations('workflow');
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    const initialTheme = isDark ? 'dark' : 'light';
    const timer = setTimeout(() => {
      setTheme(initialTheme);
    }, 0);

    const observer = new MutationObserver(() => {
      const currentDark = document.documentElement.classList.contains('dark');
      setTheme(currentDark ? 'dark' : 'light');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const steps: ProcessStep[] = WORKFLOW_STEPS.map((step, index) => {
    let activeImage = '';
    if (isMobile) {
      activeImage = theme === 'dark' ? step.imageDarkMobile : step.imageLightMobile;
    } else {
      activeImage = theme === 'dark' ? step.imageDarkDesktop : step.imageLightDesktop;
    }

    return {
      id: step.id,
      title: t(`step${index + 1}.title`),
      description: t(`step${index + 1}.desc`),
      image: activeImage,
    };
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const idx = Math.min(steps.length - 1, Math.max(0, Math.floor(latest * steps.length)));
    setActiveIndex((prev) => (prev === idx ? prev : idx));
  });

  const activeStep = steps[activeIndex] ?? steps[0];

  return (
    <div className="bg-background">
      {/* Heading Block */}
      <div className="bg-background px-6 py-10 sm:py-14">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t('heading')}
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-tertiary/75">
            {t('subheading')}
          </p>
        </div>
      </div>

      {/* Pinned Scroll Section */}
      <section
        ref={sectionRef}
        style={{ height: `${steps.length * VH_PER_STEP * 100}vh` }}
        className="relative bg-background"
      >
        <div className="sticky top-0 flex min-h-screen items-center justify-center px-4 overflow-hidden">
          {/* Desktop Pinned Scroll View */}
          <div className="hidden lg:grid w-full max-w-7xl grid-cols-[1fr_160px_1fr] items-center gap-x-40 relative">
            <div
              className="row-span-full flex justify-center"
              style={{ gridColumn: 2, gridRow: `1 / ${steps.length + 1}` }}
            >
              <ActiveStepVisual step={activeStep} />
            </div>

            {steps.map((step, i) => (
              <div key={step.id} style={{ gridRow: i + 1, gridColumn: i % 2 === 0 ? 1 : 3 }}>
                <StepCard step={step} active={i === activeIndex} />
              </div>
            ))}
          </div>

          {/* Mobile Linier View (matches exact photo layout) */}
          <div className="flex lg:hidden flex-col items-center justify-center w-full max-w-md px-6">
            <ActiveStepVisual step={activeStep} />

            {/* Active Step Details */}
            <div className="text-left w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-lg sm:text-xl font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {activeStep.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-tertiary/75">
                    {activeStep.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
