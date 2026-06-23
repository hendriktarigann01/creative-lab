import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  intensity?: 'low' | 'medium' | 'high';
  border?: boolean;
}

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, intensity = 'medium', border = true, children, ...props }, ref) => {
    const blurs = {
      low: 'backdrop-blur-sm bg-black/20',
      medium: 'backdrop-blur-md bg-black/40',
      high: 'backdrop-blur-xl bg-black/60',
    };

    return (
      <div
        ref={ref}
        className={cn(
          blurs[intensity],
          border && 'border border-white/5',
          'rounded-2xl',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassPanel.displayName = 'GlassPanel';
