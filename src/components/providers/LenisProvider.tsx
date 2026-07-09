'use client';

import { ReactLenis } from 'lenis/react';
import { type ReactNode, useEffect } from 'react';

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const orig = console.error;
  console.error = (...args: any[]) => {
    if (typeof args[0] === 'string' && args[0].includes('Encountered a script tag')) {
      return;
    }
    orig.apply(console, args);
  };

  // Safe wrapper for performance.measure to prevent Next.js 15 dev-server crash on missing marks (e.g. RootNotFound)
  const nativeMeasure = window.performance.measure;
  if (nativeMeasure) {
    (window.performance as any).measure = function (name: string, ...args: any[]): PerformanceMeasure {
      try {
        return nativeMeasure.call(window.performance, name, ...args);
      } catch (e) {
        if (typeof name === 'string' && name.includes('RootNotFound')) {
          return {} as PerformanceMeasure;
        }
        throw e;
      }
    };
  }
}

import { usePathname } from 'next/navigation';

export function LenisProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isProductRoute = pathname?.includes('/product');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (isProductRoute) {
    return <>{children}</>;
  }

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
