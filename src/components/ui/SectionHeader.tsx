import { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({
  className,
  label,
  title,
  description,
  align = 'center',
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 max-w-3xl mb-10 sm:mb-16',
        align === 'center' ? 'mx-auto text-center items-center' : 'text-left items-start',
        className
      )}
      {...props}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mt-1">
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-lg text-tertiary leading-relaxed mt-2 max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
