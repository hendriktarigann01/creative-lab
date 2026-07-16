'use client';

import { useParams, notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ProjectDetail } from '@/types';
import Diagram from '@/components/sections/Diagram';
import FeatureProduct from '@/components/sections/FeatureProduct';
import ImplementationProduct from '@/components/sections/ImplementationProduct';
import CTAProduct from '@/components/sections/CTAProduct';
import { PageHeroDetail } from '@/components/ui/PageHeroDetail';

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const categoryParam = params.category as string;
  const tDetail = useTranslations('product-detail');

  let project = null;
  try {
    project = tDetail.raw(`projects.${slug}`) as ProjectDetail;
  } catch (_e) {
    project = null;
  }

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  if (!project || categoryParam !== slugify(project.category)) {
    notFound();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const headline = (project as any).headline || project.title;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const subheadline = (project as any).subheadline || project.desc;

  return (
    <div className="bg-background min-h-dvh pb-16 relative overflow-hidden flex flex-col items-center">
      <PageHeroDetail
        slug={slug}
        projectTitle={project.title}
        headline={headline}
        subheadline={subheadline}
      />

      <FeatureProduct projectSlug={slug} />

      <ImplementationProduct data={project.implementation} />

      <Diagram projectSlug={slug} />

      {/* CTA section at bottom */}
      <div className="w-full relative z-10 mt-12">
        <CTAProduct projectSlug={slug} ctaData={project.cta} />
      </div>
    </div>
  );
}
