'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MoveUp, MoveDown, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProjectImplementation, ImplementationProductProps } from '@/types';

export default function ImplementationProduct({ data }: ImplementationProductProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!data) return null;

  const { industries, sectionTitle, sectionDesc } = data;
  const total = industries.length;

  const handlePrevious = () => setActiveIndex((prev) => (prev > 0 ? prev - 1 : total - 1));
  const handleNext = () => setActiveIndex((prev) => (prev < total - 1 ? prev + 1 : 0));

  const getImgClass = (idx: number) =>
    cn(
      'absolute inset-0 w-full h-full object-cover rounded-2xl transition-all duration-500',
      activeIndex !== idx ? 'grayscale opacity-40' : 'grayscale-0 opacity-100'
    );

  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-6 bg-background">
      <div className="mx-auto max-w-7xl">
        {/* Section Header - two column layout */}
        <div className="text-center px-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl max-w-2xl mx-auto font-medium tracking-tight">
            <span className="bg-gradient-to-r from-[#AB7FEB] to-[#540EE1] bg-clip-text text-transparent">
              {sectionTitle}
            </span>
          </h2>
          <p className="max-w-4xl mx-auto text-sm sm:text-base text-tertiary mt-4 leading-relaxed">
            {sectionDesc}
          </p>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block bg-card border border-border rounded-2xl p-10">
          <div className="grid grid-cols-2 gap-16">
            {/* Left: Nav + Industry List */}
            <div className="flex gap-10 h-full items-center">
              {/* Arrow Buttons */}
              <div className="flex flex-col items-center justify-start gap-4 pt-2 shrink-0">
                <button
                  onClick={handlePrevious}
                  disabled={activeIndex === 0}
                  className={cn(
                    'w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200',
                    activeIndex === 0
                      ? 'bg-primary/10 text-primary/30 cursor-not-allowed'
                      : 'bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer'
                  )}
                >
                  <MoveUp size={16} />
                </button>
                <button
                  onClick={handleNext}
                  disabled={activeIndex === total - 1}
                  className={cn(
                    'w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200',
                    activeIndex === total - 1
                      ? 'bg-primary/10 text-primary/30 cursor-not-allowed'
                      : 'bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer'
                  )}
                >
                  <MoveDown size={16} />
                </button>
              </div>

              {/* Industry List */}
              <div className="flex-1 flex flex-col gap-3">
                {industries.map((industry, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className="mb-1 p-6 bg-card rounded-lg cursor-pointer border border-border"
                      style={{ boxShadow: '0px 4px 50px rgba(175, 175, 175, 0.1)' }}
                    >
                      <div className="flex items-start gap-3">
                        {!isActive && (
                          <div className="w-5 h-5 text-primary flex items-center justify-center shrink-0">
                            <Plus className="w-full h-full" />
                          </div>
                        )}
                        <div className="text-sm flex-1">
                          <AnimatePresence initial={false}>
                            {isActive ? (
                              <motion.div
                                key={`content-${idx}`}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                className="overflow-hidden"
                              >
                                <p className="text-tertiary">
                                  <span className="font-medium">{industry.title},</span>{' '}
                                  {industry.desc}
                                </p>
                              </motion.div>
                            ) : (
                              <h3 className="font-medium text-tertiary">{industry.title}</h3>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: 2-column Image Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Left column: image 0 (pendek) + image 1 (tinggi) */}
              <div className="flex flex-col gap-4">
                <div className="relative w-full h-56 rounded-md md:rounded-xl overflow-hidden bg-muted">
                  <Image
                    src={industries[0]?.img || ''}
                    alt={industries[0]?.title || ''}
                    fill
                    className={getImgClass(0)}
                    priority={true}
                  />
                </div>
                <div className="relative w-full h-80 rounded-md md:rounded-xl overflow-hidden bg-muted">
                  <Image
                    src={industries[1]?.img || ''}
                    alt={industries[1]?.title || ''}
                    fill
                    className={getImgClass(1)}
                    priority={true}
                  />
                </div>
              </div>

              {/* Right column: image 2 (tinggi) + image 3 (pendek) */}
              <div className="flex flex-col gap-4">
                <div className="relative w-full h-80 rounded-md md:rounded-xl overflow-hidden bg-muted">
                  <Image
                    src={industries[2]?.img || ''}
                    alt={industries[2]?.title || ''}
                    fill
                    className={getImgClass(2)}
                    priority={true}
                  />
                </div>
                <div className="relative w-full h-56 rounded-md md:rounded-xl overflow-hidden bg-muted">
                  <Image
                    src={industries[3]?.img || ''}
                    alt={industries[3]?.title || ''}
                    fill
                    className={getImgClass(3)}
                    priority={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden flex flex-col gap-4">
          {/* Accordion list */}
          <div className="flex flex-col gap-2">
            {industries.map((industry, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className="p-4 bg-card rounded-md sm:rounded-xl border border-border cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    {!isActive && (
                      <div className="w-4 h-4 text-primary flex items-center justify-center shrink-0 mt-0.5">
                        <Plus className="w-full h-full" />
                      </div>
                    )}
                    <div className="text-sm flex-1">
                      <AnimatePresence initial={false}>
                        {isActive ? (
                          <motion.p
                            key={`mob-content-${idx}`}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            className="overflow-hidden text-tertiary"
                          >
                            <span className="font-medium">{industry.title},</span> {industry.desc}
                          </motion.p>
                        ) : (
                          <h3 className="font-medium text-tertiary">{industry.title}</h3>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 2×2 image grid — same staggered heights as desktop */}
          <div className="grid grid-cols-2 gap-3 mt-2">
            {/* Left column: short + tall */}
            <div className="flex flex-col gap-3">
              <div className="relative w-full h-36 rounded-md overflow-hidden bg-muted">
                <Image
                  src={industries[0]?.img || ''}
                  alt={industries[0]?.title || ''}
                  fill
                  className={getImgClass(0)}
                />
              </div>
              <div className="relative w-full h-48 rounded-md overflow-hidden bg-muted">
                <Image
                  src={industries[1]?.img || ''}
                  alt={industries[1]?.title || ''}
                  fill
                  className={getImgClass(1)}
                />
              </div>
            </div>
            {/* Right column: tall + short */}
            <div className="flex flex-col gap-3">
              <div className="relative w-full h-48 rounded-md overflow-hidden bg-muted">
                <Image
                  src={industries[2]?.img || ''}
                  alt={industries[2]?.title || ''}
                  fill
                  className={getImgClass(2)}
                />
              </div>
              <div className="relative w-full h-36 rounded-md overflow-hidden bg-muted">
                <Image
                  src={industries[3]?.img || ''}
                  alt={industries[3]?.title || ''}
                  fill
                  className={getImgClass(3)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
