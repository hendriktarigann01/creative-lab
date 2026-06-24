'use client';

import { Route, Palette, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';
import { JsonLd } from '@/components/ui/JsonLd';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';
import { getBreadcrumbSchema, getServiceSchema } from '@/lib/structured-data';
import { useParams } from 'next/navigation';

import { digitalStrategyPageData } from '@/data/services-detail';

export default function DigitalStrategyPage() {
  const params = useParams();
  const locale = params.locale as string;
  const data = digitalStrategyPageData[locale] || digitalStrategyPageData['en'];
  const getIcon = (iconName: string, className: string = 'w-6 h-6') => {
    switch (iconName) {
      case 'Route':
        return <Route className={className} />;
      case 'Palette':
        return <Palette className={className} />;
      default:
        return null;
    }
  };

  const breadcrumbItems = [
    { name: 'Services', path: '/our-services' },
    { name: 'Digital Strategy' },
  ];

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Services', item: '/our-services' },
    { name: 'Digital Strategy', item: '/our-services/digital-strategy' },
  ]);

  const serviceSchema = getServiceSchema(data.hero.title, data.hero.desc, 'digital-strategy');

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={serviceSchema} />

      <PageHero
        breadcrumbs={breadcrumbItems}
        label="Digital Strategy"
        title="Digital Strategy"
        gradientWord="Strategy"
        description={data.hero.desc}
        accentColor="#10b981"
      />

      <section className="pb-16 bg-background relative overflow-hidden">
        <Container>
          {/* Transformation Roadmap Timeline */}
          <div className="my-16 sm:my-24 relative">
            <div className="flex flex-col gap-3 max-w-3xl mb-12 sm:mb-16 text-center mx-auto items-center">
              <h2 className="text-xl sm:text-2xl md:text-4xl font-medium tracking-tight text-foreground mt-1">
                Transformation <span className="text-[#10b981]">Roadmap</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
                Scroll through our proven 6-phase methodology.
              </p>
            </div>

            <div className="flex flex-col gap-10">
              {data.roadmap.map((phase, index) => {
                const isLeft = phase.position === 'left';
                return (
                  <AnimateOnScroll
                    key={index}
                    variant={isLeft ? 'fadeIn' : 'slideUp'}
                    className={`flex flex-col md:flex-row items-start gap-6 relative ${
                      isLeft ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Connecting line to the next step */}
                    {index < data.roadmap.length - 1 && (
                      <div
                        className="absolute top-[24px] left-[15px] md:left-1/2 w-0.5 bg-linear-to-b from-[#10b981] to-[#10b981]/20 opacity-35 z-0 md:-translate-x-1/2"
                        style={{ height: 'calc(100% + 40px)' }}
                      />
                    )}
                    {/* Glowing Node */}
                    <div className="absolute left-[-1px] md:left-1/2 top-2.5 w-8.5 h-8.5 rounded-full bg-card border-2 border-[#10b981] flex items-center justify-center md:-translate-x-1/2 z-10 shadow-lg shadow-black/10 dark:shadow-black/80">
                      <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                    </div>

                    {/* Timeline Content card */}
                    <div className="w-full md:w-[calc(50%-2rem)] ml-8 md:ml-0">
                      <Card className="p-6 hover:border-[#10b981]/25 transition-all duration-300">
                        <span className="text-xs font-medium text-[#10b981] tracking-widest uppercase">
                          {phase.phase}
                        </span>
                        <h4 className="text-base sm:text-lg md:text-xl font-medium text-foreground mt-1.5 mb-2">
                          {phase.title}
                        </h4>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {phase.desc}
                        </p>
                      </Card>
                    </div>
                  </AnimateOnScroll>
                );
              })}
            </div>
          </div>

          {/* Core Capabilities */}
          <div className="my-16 sm:my-24">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-medium tracking-tight text-foreground mb-10 sm:mb-14">
              Core <span className="text-[#10b981]">Capabilities</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
              {data.capabilities.map((cap, index) => (
                <Card
                  key={index}
                  className="p-8 hover:border-[#10b981]/20 transition-all duration-300 flex flex-col gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center text-[#10b981] mb-2">
                    {getIcon(cap.icon, 'w-6 h-6')}
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium text-foreground tracking-tight">
                    {cap.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {cap.desc}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Page CTA */}
          <AnimateOnScroll variant="scale" className="my-16 sm:my-24  mx-auto">
            <Card className="p-8 sm:p-12 text-center relative overflow-hidden flex flex-col items-center gap-5 sm:gap-6">
              <h3 className="text-xl sm:text-2xl md:text-4xl font-medium text-foreground tracking-tight">
                Ready to{' '}
                <span className="text-[#10b981] drop-shadow-[0_2px_10px_rgba(16,185,129,0.2)]">
                  Transform?
                </span>
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground max-w-lg leading-relaxed">
                Let us guide your organization through a seamless digital transformation.
              </p>
              <Button
                href="/#contact"
                variant="primary"
                size="lg"
                className="bg-[#10b981] shadow-[#10b981]/20 hover:bg-[#10b981]/95 group mt-2"
              >
                Start a Project
              </Button>
            </Card>
          </AnimateOnScroll>
        </Container>
      </section>
    </>
  );
}
