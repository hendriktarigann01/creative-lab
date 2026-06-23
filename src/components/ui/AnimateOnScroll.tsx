'use client';

import { ReactNode } from 'react';
import { motion, Variants } from 'motion/react';

interface AnimateOnScrollProps {
  children: ReactNode;
  variant?: 'fadeIn' | 'slideUp' | 'scale' | 'staggerContainer' | 'staggerItem';
  duration?: number;
  delay?: number;
  className?: string;
}

export function AnimateOnScroll({
  children,
  variant = 'fadeIn',
  duration = 0.5,
  delay = 0,
  className,
}: AnimateOnScrollProps) {
  const animations: Record<string, Variants> = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration, delay, ease: 'easeOut' } },
    },
    slideUp: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration, delay, ease: 'easeOut' } },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1, transition: { duration, delay, ease: 'easeOut' } },
    },
    staggerContainer: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.1,
          delayChildren: delay,
        },
      },
    },
    staggerItem: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    },
  };

  const isContainer = variant === 'staggerContainer';

  if (isContainer) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={animations[variant]}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={animations[variant]}
      className={className}
    >
      {children}
    </motion.div>
  );
}
