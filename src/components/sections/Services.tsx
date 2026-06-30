'use client';

import { Code2, Gamepad2, Activity, Presentation } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Service } from '@/types';

export function Services() {
  const t = useTranslations('services');
  const servicesHeader = t.raw('servicesHeader');
  const servicesData = t.raw('servicesData') as Service[];

  const getIcon = (iconName: string, colorClass: string) => {
    const iconStyles = `w-7 h-7 ${colorClass}`;
    switch (iconName) {
      case 'Code2':
        return <Code2 className={iconStyles} />;
      case 'Gamepad2':
        return <Gamepad2 className={iconStyles} />;
      case 'Activity':
        return <Activity className={iconStyles} />;
      case 'Presentation':
        return <Presentation className={iconStyles} />;
      default:
        return null;
    }
  };

  const getAccentColorClasses = (color: string) => {
    switch (color) {
      case 'enterprise':
        return {
          text: 'text-enterprise',
          border: 'hover:border-enterprise/30',
          bg: 'bg-enterprise/5 border-enterprise/10',
          shadow: 'hover:shadow-enterprise/10',
        };
      case 'gamification':
        return {
          text: 'text-gamification',
          border: 'hover:border-gamification/30',
          bg: 'bg-gamification/5 border-gamification/10',
          shadow: 'hover:shadow-gamification/10',
        };
      case 'interactive':
        return {
          text: 'text-interactive',
          border: 'hover:border-interactive/30',
          bg: 'bg-interactive/5 border-interactive/10',
          shadow: 'hover:shadow-interactive/10',
        };
      case 'strategy':
        return {
          text: 'text-strategy',
          border: 'hover:border-strategy/30',
          bg: 'bg-strategy/5 border-strategy/10',
          shadow: 'hover:shadow-strategy/10',
        };
      default:
        return {
          text: 'text-primary',
          border: 'hover:border-primary/30',
          bg: 'bg-primary/5 border-primary/10',
          shadow: 'hover:shadow-primary/10',
        };
    }
  };

  const translatedServices = servicesData.map((service) => {
    const key = service.color;
    return {
      ...service,
      title: t(`${key}.title`),
      desc: t(`${key}.desc`),
    };
  });

  return (
    <section id="services" className="relative py-24 sm:py-32 bg-background overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-[20%] left-[-10%] w-[40%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <Container>
        <AnimateOnScroll variant="slideUp">
          <SectionHeader
            label={t('heading')}
            title={t('heading')}
            gradientWord={t('gradientWord')}
            description={t('subheading')}
          />
        </AnimateOnScroll>

        <AnimateOnScroll
          variant="staggerContainer"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {translatedServices.map((service, index) => {
            const theme = getAccentColorClasses(service.color);
            return (
              <AnimateOnScroll key={index} variant="staggerItem" className="h-full">
                <div
                  className={`relative overflow-hidden h-full rounded-2xl border border-border bg-card p-8 transition-all duration-300 flex flex-col justify-between group ${theme.border} ${theme.shadow} hover:shadow-lg hover:-translate-y-1`}
                >
                  <div>
                    {/* Icon Kiosk */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border ${theme.bg}`}
                    >
                      {getIcon(service.icon, theme.text)}
                    </div>
                    {/* Content */}
                    <h3 className="text-lg sm:text-xl font-medium text-foreground tracking-tight mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {service.desc}
                    </p>

                    {/* Features List */}
                    <ul className="flex flex-col gap-3.5 mb-8">
                      {service.features.map((feature, i) => {
                        const hasColon = feature.includes(':');
                        let titlePart = '';
                        let descPart = feature;
                        if (hasColon) {
                          const parts = feature.split(':');
                          titlePart = parts[0] + ':';
                          descPart = parts[1];
                        }

                        return (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground"
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${theme.text} bg-current`}
                            />
                            <span>
                              {titlePart && (
                                <span className="font-medium text-foreground">{titlePart}</span>
                              )}
                              {descPart}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Learn More Link */}
                  <Link
                    href={service.link as any}
                    className={`inline-flex items-center text-sm font-medium tracking-wide gap-1 w-fit group-hover:underline cursor-pointer ${theme.text}`}
                  >
                    Learn More
                  </Link>
                </div>
              </AnimateOnScroll>
            );
          })}
        </AnimateOnScroll>

        <div className="flex justify-center">
          <Button href="/our-services" variant="outline" size="lg" className="group">
            Explore All Services
          </Button>
        </div>
      </Container>
    </section>
  );
}
