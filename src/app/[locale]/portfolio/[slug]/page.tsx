'use client';

import { useParams } from 'next/navigation';
import { portfolioDetails } from '@/data/portfolio-detail';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';
import { CTA } from '@/components/sections/CTA';
import { CheckCircle2, Calendar, User, Briefcase, BarChart } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { PageHero } from '@/components/ui/PageHero';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const locale = useLocale();
  const t = useTranslations('projectDetail');

  const project = portfolioDetails[locale as keyof typeof portfolioDetails]?.[slug];

  if (!project) {
    return (
      <div className="bg-background min-h-dvh flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-3xl sm:text-4xl font-medium text-foreground mb-4">
          {t('notFoundTitle')}
        </h1>
        <p className="text-muted-foreground mb-8">{t('notFoundSub')}</p>
        <Button href="/portfolio" variant="primary">
          {t('backBtn')}
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-dvh pb-16 relative overflow-hidden flex flex-col items-center">
      <PageHero
        backButton={{ label: t('backBtn'), href: '/portfolio' }}
        label={project.category}
        title={project.title}
        description={project.desc}
        accentColor="#540ee1"
      />

      {/* Case Study Details Grid */}
      <Container className="relative z-10 my-16 sm:my-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Story & Features */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            {/* Overview */}
            <AnimateOnScroll variant="slideUp">
              <h3 className="text-base sm:text-lg md:text-xl font-medium text-foreground tracking-tight mb-4">
                {t('overview')}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {project.overview}
              </p>
            </AnimateOnScroll>

            {/* Challenge & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimateOnScroll variant="slideUp">
                <h3 className="text-sm sm:text-base font-medium text-foreground tracking-tight mb-3">
                  {t('challenge')}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.challenge}</p>
              </AnimateOnScroll>

              <AnimateOnScroll variant="slideUp">
                <h3 className="text-sm sm:text-base font-medium text-foreground tracking-tight mb-3">
                  {t('solution')}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.solution}</p>
              </AnimateOnScroll>
            </div>

            {/* Features */}
            <AnimateOnScroll variant="slideUp">
              <h3 className="text-base sm:text-lg md:text-xl font-medium text-foreground tracking-tight mb-4">
                {t('deliverables')}
              </h3>
              <ul className="flex flex-col gap-4">
                {project.features.map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </AnimateOnScroll>
          </div>

          {/* Right Column: Project Meta Sidebar */}
          <div className="lg:col-span-5 w-full">
            <AnimateOnScroll variant="slideUp">
              <Card className="p-8 border border-border backdrop-blur-3xl bg-linear-to-br from-primary/5 via-accent/3 to-card flex flex-col gap-6">
                <h3 className="text-sm sm:text-base font-medium text-foreground tracking-tight pb-4">
                  {t('detailsTitle')}
                </h3>

                <div className="flex flex-col gap-5">
                  {/* Client */}
                  <div className="flex items-start gap-3 text-sm">
                    <User className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-muted-foreground/60 uppercase text-[10px] font-medium tracking-wider">
                        {t('client')}
                      </span>
                      <span className="font-medium text-foreground mt-0.5 block">
                        {project.client}
                      </span>
                    </div>
                  </div>

                  {/* Role */}
                  <div className="flex items-start gap-3 text-sm">
                    <Briefcase className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-muted-foreground/60 uppercase text-[10px] font-medium tracking-wider">
                        {t('role')}
                      </span>
                      <span className="font-medium text-foreground mt-0.5 block">
                        {project.role}
                      </span>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="flex items-start gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-muted-foreground/60 uppercase text-[10px] font-medium tracking-wider">
                        {t('timeline')}
                      </span>
                      <span className="font-medium text-foreground mt-0.5 block">
                        {project.timeline}
                      </span>
                    </div>
                  </div>

                  {/* Impact Stat */}
                  <div className="flex items-start gap-3 text-sm">
                    <BarChart className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-muted-foreground/60 uppercase text-[10px] font-medium tracking-wider">
                        {t('impact')}
                      </span>
                      <span className="text-lg font-medium text-accent mt-0.5 block">
                        {project.stats.value} {project.stats.label}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex flex-col gap-4">
                  <span className="block text-muted-foreground/60 uppercase text-[10px] font-medium tracking-wider">
                    {t('techDeployed')}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-muted border border-border rounded-lg text-xs font-medium text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </AnimateOnScroll>
          </div>
        </div>
      </Container>

      {/* CTA section at bottom */}
      <div className="w-full relative z-10 mt-12">
        <CTA />
      </div>
    </div>
  );
}
