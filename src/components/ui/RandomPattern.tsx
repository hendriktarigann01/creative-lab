'use client';

import { HTMLAttributes, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface RandomPatternProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'advantage' | 'cta-contact';
}

export function RandomPattern({ className, variant = 'advantage', ...props }: RandomPatternProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={cn('absolute inset-0 pointer-events-none z-0 overflow-hidden', className)} {...props} />;
  }

  if (variant === 'advantage') {
    return (
      <div className={cn('absolute inset-0 pointer-events-none z-0 overflow-hidden', className)} {...props}>
        {/* Left Pattern */}
        <div
          className="absolute bg-[url('/pattern.png')] bg-contain bg-center bg-no-repeat top-[15%] left-[-5%]"
          style={{
            width: '700px',
            height: '700px',
            opacity: 0.6,
            maskImage: 'radial-gradient(circle at center, black 10%, transparent 60%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 10%, transparent 60%)',
          }}
        />
        {/* Right Pattern */}
        <div
          className="absolute bg-[url('/pattern.png')] bg-contain bg-center bg-no-repeat top-[50%] right-[-5%]"
          style={{
            width: '800px',
            height: '800px',
            opacity: 0.7,
            maskImage: 'radial-gradient(circle at center, black 10%, transparent 60%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 10%, transparent 60%)',
          }}
        />
      </div>
    );
  }

  if (variant === 'cta-contact') {
    return (
      <div className={cn('absolute inset-0 pointer-events-none z-0 overflow-hidden', className)} {...props}>
        {/* Centered Pattern blending across sections */}
        <div
          className="absolute bg-[url('/pattern.png')] bg-contain bg-center bg-no-repeat left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
          style={{
            width: '1000px',
            height: '1000px',
            opacity: 0.7,
            maskImage: 'radial-gradient(circle at center, black 10%, transparent 60%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 10%, transparent 60%)',
          }}
        />
      </div>
    );
  }

  return null;
}
