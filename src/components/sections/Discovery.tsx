'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';

// ---------------------------------------------------------------------------
// Data — index parity decides the side (even -> left, odd -> right),
// matching the reference row order 1:1 (Discovery, Blueprint, Build, ...).
// ---------------------------------------------------------------------------

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  image: string; // /workflow/flow-1.webp ... flow-6.webp
}

const STEPS: ProcessStep[] = [
  {
    id: 'discovery',
    title: 'Discovery',
    description:
      'We analyze your business logic, audit legacy systems, and define technical requirements.',
    image: '/workflow/flow-1.webp',
  },
  {
    id: 'blueprint',
    title: 'Blueprint',
    description: 'We design the UI/UX, system architecture, and workflow blueprint.',
    image: '/workflow/flow-2.webp',
  },
  {
    id: 'build',
    title: 'Build',
    description:
      'We build in agile sprints with continuous integration and transparent progress updates.',
    image: '/workflow/flow-3.webp',
  },
  {
    id: 'test',
    title: 'Test',
    description: 'We ensure quality through QA, security testing, and user acceptance testing.',
    image: '/workflow/flow-4.webp',
  },
  {
    id: 'deploy',
    title: 'Deploy',
    description: 'We deploy seamlessly to servers, app stores, or connected devices.',
    image: '/workflow/flow-5.webp',
  },
  {
    id: 'support',
    title: 'Support',
    description: 'We provide 24/7 support, proactive monitoring, and scalable maintenance.',
    image: '/workflow/flow-6.webp',
  },
];

// how much scroll distance (in viewport heights) the section gets while pinned
const VH_PER_STEP = 0.85;

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

function StepCard({ step, active }: { step: ProcessStep; active: boolean }) {
  return (
    <div
      className={[
        'rounded-2xl border bg-white p-5 shadow-sm transition-colors duration-300',
        active ? 'border-primary ring-2 ring-primary/40' : 'border-slate-200',
      ].join(' ')}
    >
      <h3
        className={[
          'text-lg font-semibold transition-colors duration-300',
          active ? 'text-primary' : 'text-violet-600',
        ].join(' ')}
      >
        {step.title}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{step.description}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Center visual — one fixed spot, the image just swaps as the step changes
// ---------------------------------------------------------------------------

function ActiveStepVisual({ step }: { step: ProcessStep }) {
  return (
    <div className="flex h-[180px] w-[220px] items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'linear' }}
        >
          <Image
            src={step.image}
            alt={`${step.title} step illustration`}
            width={200}
            height={160}
            className="select-none"
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------

export default function DiscoverySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const idx = Math.min(STEPS.length - 1, Math.max(0, Math.floor(latest * STEPS.length)));
    setActiveIndex((prev) => (prev === idx ? prev : idx));
  });

  const activeStep = STEPS[activeIndex];

  return (
    <section
      ref={sectionRef}
      style={{ height: `${STEPS.length * VH_PER_STEP * 100}vh` }}
      className="relative min-h-screen"
    >
      <div className="bg-white px-6">
        <div className="mx-auto w-full max-w-5xl py-10">
          {/* Heading — scrolls normally, not pinned */}
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-medium sm:text-4xl">
              <span className="bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent">
                Beyond Products,
              </span>{' '}
              <span className="text-slate-900">We Deliver Complete Solutions</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
              We go beyond building products by delivering end-to-end digital solutions that help
              businesses innovate, engage users, and achieve long-term growth.
            </p>
          </div>
        </div>

        {/* This is the element that pins: h-screen, sticky to top while the section scrolls */}
        <div className="sticky top-0 mx-auto grid h-screen w-full max-w-5xl grid-cols-[1fr_220px_1fr] items-center gap-x-10 gap-y-8">
          <div
            className="row-span-full flex justify-center"
            style={{ gridColumn: 2, gridRow: `1 / ${STEPS.length + 1}` }}
          >
            <ActiveStepVisual step={activeStep} />
          </div>

          {STEPS.map((step, i) => (
            <div key={step.id} style={{ gridRow: i + 1, gridColumn: i % 2 === 0 ? 1 : 3 }}>
              <StepCard step={step} active={i === activeIndex} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
