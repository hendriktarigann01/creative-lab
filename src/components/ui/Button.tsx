import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Link } from '@/i18n/routing';
import { cn } from '../../lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', href, children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-4xl transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

    const variants = {
      primary:
        'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90',
      secondary: 'bg-accent text-accent-foreground shadow-lg shadow-accent/20 hover:bg-accent/90',
      outline:
        'border border-border bg-transparent text-foreground hover:bg-white/5 hover:border-foreground/20',
      ghost:
        'bg-transparent text-tertiary hover:text-foreground bg-gradient-to-r from-[#540EE1]/18 via-[#540EE1]/10 to-transparent',
      link: 'bg-transparent text-primary hover:underline p-0 h-auto',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-2.5 text-base',
      lg: 'px-8 py-3.5 text-lg',
    };

    const buttonStyles = cn(baseStyles, variants[variant], sizes[size], className);

    if (href) {
      const isExternal = href.startsWith('http://') || href.startsWith('https://');
      if (isExternal) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" className={buttonStyles}>
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={buttonStyles}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={buttonStyles} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
