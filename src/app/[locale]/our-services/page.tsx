'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import {
  Code2,
  Gamepad2,
  Activity,
  Presentation,
  ChevronDown,
  CheckCircle2,
  Search,
  Map,
  Code,
  TestTube,
  Rocket,
  HeartHandshake,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';
import { getBreadcrumbSchema } from '@/lib/structured-data';
import { PageHero } from '@/components/ui/PageHero';
import { JsonLd } from '@/components/ui/JsonLd';
import { useTranslations } from 'next-intl';

import { servicesOverviewHeader, servicesOverviewAccordion } from '@/data/services-detail';

export default function ServicesOverviewPage() {
  const params = useParams();
  const locale = params.locale as string;
  const header = servicesOverviewHeader[locale] || servicesOverviewHeader['en'];
  const accordion = servicesOverviewAccordion[locale] || servicesOverviewAccordion['en'];
  const tWorkflow = useTranslations('workflow');

  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const translatedSteps = [
    { step: '01', title: tWorkflow('step1.title'), desc: tWorkflow('step1.desc'), icon: 'Search' },
    { step: '02', title: tWorkflow('step2.title'), desc: tWorkflow('step2.desc'), icon: 'Map' },
    { step: '03', title: tWorkflow('step3.title'), desc: tWorkflow('step3.desc'), icon: 'Code' },
    {
      step: '04',
      title: tWorkflow('step4.title'),
      desc: tWorkflow('step4.desc'),
      icon: 'TestTube',
    },
    { step: '05', title: tWorkflow('step5.title'), desc: tWorkflow('step5.desc'), icon: 'Rocket' },
    {
      step: '06',
      title: tWorkflow('step6.title'),
      desc: tWorkflow('step6.desc'),
      icon: 'HeartHandshake',
    },
  ];

  const getIcon = (iconName: string, className: string = 'w-6 h-6') => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className={className} />;
      case 'Gamepad2':
        return <Gamepad2 className={className} />;
      case 'Activity':
        return <Activity className={className} />;
      case 'Presentation':
        return <Presentation className={className} />;
      case 'Search':
        return <Search className={className} />;
      case 'Map':
        return <Map className={className} />;
      case 'Code':
        return <Code className={className} />;
      case 'TestTube':
        return <TestTube className={className} />;
      case 'Rocket':
        return <Rocket className={className} />;
      case 'HeartHandshake':
        return <HeartHandshake className={className} />;
      default:
        return null;
    }
  };

  const getSlugIcon = (slug: string, className: string = 'w-6 h-6') => {
    switch (slug) {
      case 'enterprise-b2g-solutions':
        return <Code2 className={className} />;
      case 'gamification-games':
        return <Gamepad2 className={className} />;
      case 'interactive-experiences':
        return <Activity className={className} />;
      case 'digital-strategy':
        return <Presentation className={className} />;
      default:
        return null;
    }
  };

  const breadcrumbItems = [{ name: 'Services' }];
  const breadcrumbSchema = getBreadcrumbSchema([{ name: 'Services', item: '/our-services' }]);

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />

      <PageHero
        breadcrumbs={breadcrumbItems}
        label="Our Services"
        title={header.heading}
        gradientWord={header.gradientWord}
        description={header.subheading}
      />

      <section className="pb-16 bg-background relative overflow-hidden">
        <Container>
          <div className="my-20 sm:my-28 relative">
            <h3 className="text-2xl sm:text-3xl font-bold text-center text-foreground mb-16 tracking-tight">
              Our{' '}
              <span className="bg-linear-to-r from-[#AB7FEB] to-[#540EE1] bg-clip-text text-transparent">
                Workflow
              </span>{' '}
              Roadmap
            </h3>

            <div className="flex flex-col gap-12 relative">
              {translatedSteps.map((step, index) => {
                const isEven = index % 2 === 0;
                return (
                  <AnimateOnScroll
                    key={index}
                    variant={isEven ? 'fadeIn' : 'slideUp'}
                    className={`flex flex-col sm:flex-row items-start gap-6 relative ${
                      isEven ? 'sm:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Connecting line to the next step */}
                    {index < translatedSteps.length - 1 && (
                      <div
                        className="absolute top-[24px] left-[16px] sm:left-1/2 w-0.5 bg-linear-to-b from-[#AB7FEB] to-[#540EE1] opacity-35 z-0 sm:-translate-x-1/2"
                        style={{ height: 'calc(100% + 48px)' }}
                      />
                    )}
                    <div className="absolute left-[-2px] sm:left-1/2 top-1.5 w-9 h-9 rounded-full bg-card border-2 border-primary flex items-center justify-center sm:-translate-x-1/2 z-10">
                      {getIcon(step.icon, 'w-4 h-4 text-accent')}
                    </div>

                    <div className="w-full sm:w-[calc(50%-2rem)] ml-8 sm:ml-0">
                      <Card className="p-6 border-2 border-primary dark:border-border bg-card transition-all duration-300">
                        <span className="text-xs font-bold text-accent tracking-widest uppercase">
                          Step {step.step}
                        </span>
                        <h4 className="text-xl font-bold text-foreground tracking-tight mt-1.5 mb-2">
                          {step.title}
                        </h4>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {step.desc}
                        </p>
                      </Card>
                    </div>
                  </AnimateOnScroll>
                );
              })}
            </div>
          </div>

          <div className="my-20 sm:my-28">
            <SectionHeader
              label="Explore Details"
              title="Explore In Detail"
              gradientWord="Detail"
              description="Review our specific technology capability highlights and stats across each specialized area."
            />

            <div className="flex flex-col gap-4 mx-auto">
              {accordion.map((service, index) => {
                const isOpen = openAccordion === index;
                return (
                  <div
                    key={index}
                    className="overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300"
                  >
                    <button
                      onClick={() => setOpenAccordion(isOpen ? null : index)}
                      className="w-full px-6 py-5 sm:py-6 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors focus:outline-none cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center border"
                          style={{
                            borderColor: `${service.color}30`,
                            backgroundColor: `${service.color}10`,
                            color: service.color,
                          }}
                        >
                          {getSlugIcon(service.slug, 'w-5 h-5')}
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
                          {service.title}
                        </h3>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-foreground' : ''
                        }`}
                      />
                    </button>

                    <div
                      className={`transition-all duration-500 ease-in-out ${
                        isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-6 pb-6 sm:pb-8 pt-2 border-t border-border grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                        <div className="md:col-span-8 flex flex-col gap-6">
                          <div>
                            <p
                              className="text-xs font-semibold uppercase tracking-wider mb-1"
                              style={{ color: service.color }}
                            >
                              {service.tagline}
                            </p>
                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-2">
                              {service.description}
                            </p>
                          </div>

                          <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">
                              Capabilities Highlights
                            </h4>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {service.highlights.map((highlight, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground"
                                >
                                  <CheckCircle2
                                    className="w-4 h-4 shrink-0"
                                    style={{ color: service.color }}
                                  />
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <Link
                            href={`/our-services/${service.slug}`}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-wide hover:underline mt-2 w-fit cursor-pointer"
                            style={{ color: service.color }}
                          >
                            Explore Full Page
                          </Link>
                        </div>

                        <div className="md:col-span-4 p-6 rounded-xl bg-muted/30 border border-border text-center flex flex-col justify-center h-full mt-4 md:mt-0">
                          <span
                            className="text-4xl sm:text-5xl font-black tracking-tight"
                            style={{ color: service.color }}
                          >
                            {service.stat}
                          </span>
                          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-2">
                            {service.statLabel}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <AnimateOnScroll variant="scale" className="my-20 sm:my-28  mx-auto">
            <Card className="p-8 sm:p-12 text-center border border-border bg-card relative overflow-hidden flex flex-col items-center gap-5 sm:gap-6 shadow-2xl">
              <div className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
              <div className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

              <h3 className="text-2xl sm:text-4xl font-bold text-foreground tracking-tight">
                Not sure which service{' '}
                <span className="bg-linear-to-r from-[#AB7FEB] to-[#540EE1] bg-clip-text text-transparent">
                  fits?
                </span>
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground max-w-lg leading-relaxed">
                Talk to our team and we&apos;ll map the perfect solution for your needs.
              </p>
              <Button href="/#contact" variant="primary" size="lg" className="group mt-2">
                Get a Free Consultation
              </Button>
            </Card>
          </AnimateOnScroll>
        </Container>
      </section>
    </>
  );
}
