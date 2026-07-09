'use client';

import { useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function TemplateSlugPage() {
  const t = useTranslations('portfolio');
  const params = useParams();
  const slug = params.slug as string;

  const validSlugs = ['bsp', 'in-lite', 'leko', 'metland', 'tanta'];

  if (!validSlugs.includes(slug)) {
    notFound();
  }

  useEffect(() => {
    // Redirect the browser window directly to the clean static URL.
    // The server-side rewrite in next.config.ts will handle serving index.html.
    window.location.replace(`/portfolio/${slug}`);
  }, [slug]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      {t('redirecting') || 'Redirecting to preview...'}
    </div>
  );
}
