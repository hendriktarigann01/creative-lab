import { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface GradientTextProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'accent' | 'enterprise' | 'gamification' | 'interactive' | 'strategy';
}

export function GradientText({ className, variant = 'primary', ...props }: GradientTextProps) {
  const gradients = {
    primary: 'from-[#c4b5fd] to-[#7dd3fc]', // Soft accent purple to blue
    accent: 'from-[#AB7FEB] to-[#540EE1]',   // Accent to primary
    enterprise: 'from-[#60a5fa] to-[#3b82f6]', // Soft blue
    gamification: 'from-[#a78bfa] to-[#8b5cf6]', // Soft purple
    interactive: 'from-[#f472b6] to-[#ec4899]', // Soft pink
    strategy: 'from-[#34d399] to-[#10b981]',   // Soft green
  };

  return (
    <span
      className={cn(
        'bg-linear-to-r bg-clip-text text-transparent font-semibold',
        gradients[variant],
        className
      )}
      {...props}
    />
  );
}
