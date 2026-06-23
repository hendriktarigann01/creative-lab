import { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  title: string;
  gradientWord?: string;
  description?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({
  className,
  label,
  title,
  gradientWord,
  description,
  align = 'center',
  ...props
}: SectionHeaderProps) {
  // Split title if gradientWord is present to inject styling
  let titleContent = <>{title}</>;

  if (gradientWord && title.includes(gradientWord)) {
    const parts = title.split(gradientWord);
    titleContent = (
      <>
        {parts[0]}
        <span className="bg-linear-to-r from-[#AB7FEB] to-[#540EE1] bg-clip-text text-transparent">
          {gradientWord}
        </span>
        {parts[1]}
      </>
    );
  }

  return (
    <div
      className={cn(
        'flex flex-col gap-3 max-w-3xl mb-12 sm:mb-16',
        align === 'center' ? 'mx-auto text-center items-center' : 'text-left items-start',
        className
      )}
      {...props}
    >
      {label && (
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent px-3 py-1 rounded-full border border-accent/25 bg-accent/5 mb-1 select-none">
          {label}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mt-1">
        {titleContent}
      </h2>
      {description && (
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mt-2 max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
