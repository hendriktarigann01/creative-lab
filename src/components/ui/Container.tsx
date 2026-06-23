import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  clean?: boolean;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, clean = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          !clean && 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
          className
        )}
        {...props}
      />
    );
  }
);

Container.displayName = 'Container';
