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
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-medium">
            <span className="bg-gradient-to-r from-[#AB7FEB] to-[#540EE1] bg-clip-text text-transparent">
              {sectionTitle}
            </span>
          </h2>
          <p className="text-sm md:text-base text-tertiary max-w-xs md:max-w-xl leading-relaxed">
            {sectionDesc}
          </p>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block bg-card border border-border rounded-2xl p-10 shadow-sm">
          <div className="grid grid-cols-2 gap-16">
            {/* Left: Nav + Industry List */}
            <div className="flex gap-5 h-full items-center">
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
                      className="mb-1 p-4 bg-card rounded-lg cursor-pointer border border-border"
                      style={{ boxShadow: '0px 4px 50px rgba(175, 175, 175, 0.1)' }}
                    >
                      <div className="flex items-start gap-3">
                        {!isActive && (
                          <div className="w-5 h-5 text-primary flex items-center justify-center shrink-0">
                            <Plus className="w-full h-full" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-medium text-muted-Nforeground mb-2">
                            {industry.title}
                          </h3>
                          <AnimatePresence initial={false}>
                            {isActive && (
                              <motion.div
                                key={`content-${idx}`}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                className="overflow-hidden"
                              >
                                <p className="text-tertiary text-sm mb-3">
                                  {industry.desc}
                                </p>
                              </motion.div>
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
                <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-muted">
                  <Image
                    src={industries[0]?.img || ''}
                    alt={industries[0]?.title || ''}
                    fill
                    className={getImgClass(0)}
                    priority={true}
                  />
                </div>
                <div className="relative w-full h-80 rounded-2xl overflow-hidden bg-muted">
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
                <div className="relative w-full h-80 rounded-2xl overflow-hidden bg-muted">
                  <Image
                    src={industries[2]?.img || ''}
                    alt={industries[2]?.title || ''}
                    fill
                    className={getImgClass(2)}
                    priority={true}
                  />
                </div>
                <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-muted">
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
        <div className="md:hidden flex flex-col gap-6">
          {/* Tab pills */}
          <div
            className="flex gap-2 overflow-x-auto pb-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {industries.map((industry, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  'px-4 py-1.5 rounded-full whitespace-nowrap text-xs font-medium transition-all duration-200 shrink-0',
                  activeIndex === idx ? 'bg-primary text-white' : 'bg-muted text-tertiary'
                )}
              >
                {industry.title}
              </button>
            ))}
          </div>

          {/* Active industry text */}
          <AnimatePresence mode="wait">
            <motion.p
              key={activeIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="text-sm text-muted-Nforeground leading-relaxed"
            >
              <span className="font-medium">{industries[activeIndex].title},</span>{' '}
              {industries[activeIndex].desc}
            </motion.p>
          </AnimatePresence>

          {/* Active image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full h-56 rounded-2xl overflow-hidden bg-muted"
            >
              <Image
                src={industries[activeIndex]?.img || ''}
                alt={industries[activeIndex].title}
                fill
                className="object-cover"
                priority={true}
              />
            </motion.div>
          </AnimatePresence>

          {/* Dot indicator */}
          <div className="flex justify-center gap-2">
            {industries.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300',
                  activeIndex === idx ? 'w-6 bg-primary' : 'w-1.5 bg-border'
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
