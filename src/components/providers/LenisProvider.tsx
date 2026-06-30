'use client';

import { ReactLenis } from 'lenis/react';
import type { ReactNode } from 'react';

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const orig = console.error;
  console.error = (...args: any[]) => {
    if (typeof args[0] === 'string' && args[0].includes('Encountered a script tag')) {
      return;
    }
    orig.apply(console, args);
  };
}

export function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1.5,
        autoRaf: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
