import { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'primary' | 'accent';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const baseStyles =
    'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full tracking-wide uppercase border';

  const variants = {
    default: 'bg-white/5 border-white/10 text-muted-foreground',
    outline: 'bg-transparent border-border text-muted-foreground',
    primary: 'bg-primary/10 border-primary/20 text-accent',
    accent: 'bg-accent/10 border-accent/20 text-accent-foreground',
  };

  return <span className={cn(baseStyles, variants[variant], className)} {...props} />;
}
