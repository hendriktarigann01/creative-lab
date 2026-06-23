import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface BreadcrumbItem {
  name: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const t = useTranslations('nav');

  return (
    <nav className={cn('flex items-center gap-2 text-sm text-muted-foreground mb-6 sm:mb-8', className)} aria-label="Breadcrumb">
      <Link href="/" className="hover:text-foreground transition-colors">
        {t('home')}
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={index} className="flex items-center gap-2">
            <ChevronRight className="w-3.5 h-3.5" />
            {isLast || !item.path ? (
              <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link href={item.path} className="hover:text-foreground transition-colors">
                {item.name}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
