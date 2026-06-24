'use client';

import { useState } from 'react';
import Image from 'next/image';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
}

export function LazyImage({
  src,
  alt,
  className = '',
  fill = false,
  width,
  height,
  sizes,
  priority = false,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative w-full h-full bg-slate-200/20 dark:bg-slate-800/20 overflow-hidden rounded-[inherit] ${!isLoaded ? 'animate-pulse' : ''}`}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={sizes}
        priority={priority}
        className={`transition-all duration-700 ease-out ${
          isLoaded 
            ? 'opacity-100 scale-100 blur-0' 
            : 'opacity-0 scale-[1.02] blur-md'
        } ${className}`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
