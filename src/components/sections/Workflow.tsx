'use client';

import { useRef, useState } from 'react';
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
    <div className="flex h-[400px] w-[200px] items-center justify-center relative select-none">
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

  const steps: ProcessStep[] = WORKFLOW_STEPS.map((step, index) => ({
    ...step,
    title: t(`step${index + 1}.title`),
    description: t(`step${index + 1}.desc`),
  }));

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
      <div className="bg-background px-6 py-20 sm:py-28">
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
          <div className="mx-auto grid w-full max-w-7xl grid-cols-[1fr_160px_1fr] items-center gap-x-40 relative">
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
        </div>
      </section>
    </div>
  );
}
