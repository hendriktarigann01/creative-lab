import { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'primary' | 'accent';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const baseStyles =
    'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full tracking-wide uppercase border';

  const variants = {
    default: 'bg-white/5 border-white/10 text-tertiary',
    outline: 'bg-transparent border-border text-tertiary',
    primary: 'bg-badge/10 border-badge/20 text-badge px-8 py-5',
    accent: 'bg-accent/10 border-accent/20 text-accent-foreground',
  };

  return <span className={cn(baseStyles, variants[variant], className)} {...props} />;
}
