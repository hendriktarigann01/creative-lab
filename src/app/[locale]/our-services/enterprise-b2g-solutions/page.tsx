'use client';

import { useState, useEffect } from 'react';
import {
  Server,
  Shield,
  Wifi,
  Activity,
  Globe,
  BarChart3,
  Database,
  QrCode,
  Terminal,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';
import { PageHero } from '@/components/ui/PageHero';
import { JsonLd } from '@/components/ui/JsonLd';
import { getBreadcrumbSchema, getServiceSchema } from '@/lib/structured-data';
import { useParams } from 'next/navigation';

import { enterpriseData } from '@/data/services-detail';

const initialLogs = [
  '14:32:01 [INFO] Dashboard sync completed — 847 devices online',
  '14:32:03 [OK] Security scan passed — zero threats detected',
  '14:32:05 [DATA] Processing 12,847 data points from Sensor Array B',
  '14:32:08 [INFO] Auto-backup initiated — 2.4TB archived',
  '14:32:10 [OK] CDN cache refreshed across 14 edge nodes',
  '14:32:12 [DATA] Real-time analytics: 2,341 active sessions',
  '14:32:15 [INFO] Load balancer: traffic distributed across 8 instances',
  '14:32:18 [OK] SSL certificates verified — all endpoints secure',
];

const simulatedEvents = [
  '[DATA] Sensor Array C updated: temperature stable at 21.4°C',
  '[OK] Sync complete: Command Center feed active',
  '[INFO] Automated SSL audit complete: 0 vulnerabilities found',
  '[DATA] API Gateway processed 5,142 requests/sec',
  '[OK] Database replication: synced to replica region AP-Southeast-1',
  '[INFO] Memory clean completed: GC freed 412MB',
];

export default function EnterprisePage() {
  const params = useParams();
  const locale = params.locale as string;
  const data = enterpriseData[locale] || enterpriseData['en'];

  const [logs, setLogs] = useState<string[]>(initialLogs);

  useEffect(() => {
    const interval = setInterval(() => {
      const time = new Date().toTimeString().split(' ')[0];
      const randomEvent = simulatedEvents[Math.floor(Math.random() * simulatedEvents.length)];
      const newLog = `${time} ${randomEvent}`;
      setLogs((prev) => [...prev.slice(1), newLog]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (iconName: string, className: string = 'w-6 h-6') => {
    switch (iconName) {
      case 'Server':
        return <Server className={className} />;
      case 'Shield':
        return <Shield className={className} />;
      case 'Wifi':
        return <Wifi className={className} />;
      case 'Activity':
        return <Activity className={className} />;
      case 'Globe':
        return <Globe className={className} />;
      case 'BarChart3':
        return <BarChart3 className={className} />;
      case 'Database':
        return <Database className={className} />;
      case 'QrCode':
        return <QrCode className={className} />;
      default:
        return null;
    }
  };

  const breadcrumbItems = [
    { name: 'Services', path: '/our-services' },
    { name: 'Enterprise & B2G Solutions' },
  ];

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Services', item: '/our-services' },
    { name: 'Enterprise & B2G Solutions', item: '/our-services/enterprise-b2g-solutions' },
  ]);

  const serviceSchema = getServiceSchema(
    data.hero.title,
    data.hero.desc,
    'enterprise-b2g-solutions'
  );

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={serviceSchema} />

      <PageHero
        breadcrumbs={breadcrumbItems}
        label="Enterprise & B2G"
        title="Enterprise & B2G Solutions"
        gradientWord="B2G Solutions"
        description={data.hero.desc}
        accentColor="#3b82f6"
      />

      <section className="pb-16 bg-background relative overflow-hidden">
        <Container>

          {/* Interactive Live Dashboard Mock */}
          <div className="my-16 sm:my-24">
            <div className="flex flex-col gap-3 max-w-3xl mb-8 sm:mb-12">
              <Badge variant="outline">Interactive Console</Badge>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground mt-1">
                Live <span className="text-[#3b82f6]">Dashboard</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Watch our simulated enterprise monitoring system in action.
              </p>
            </div>

            {/* Metrics cards row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {data.metrics.map((metric, index) => (
                <Card
                  key={index}
                  className="p-6 text-center hover:border-[#3b82f6]/20 transition-all duration-300"
                >
                  <span className="text-3xl sm:text-4xl font-black tracking-tight text-[#3b82f6]">
                    {metric.value}
                  </span>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-2">
                    {metric.label}
                  </span>
                </Card>
              ))}
            </div>

            {/* Command Center Live Console */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              {/* Console log */}
              <div className="lg:col-span-2 rounded-2xl border border-border bg-card overflow-hidden flex flex-col h-[320px] shadow-2xl">
                <div className="px-4 py-3 bg-muted/40 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs font-bold text-muted-foreground tracking-wider uppercase">
                      MJS Command Center — Live Feed
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                      ONLINE
                    </span>
                  </div>
                </div>
                <div className="p-4 flex-1 font-mono text-xs overflow-y-auto flex flex-col gap-2 bg-background border border-border/10">
                  {logs.map((log, index) => {
                    const isOk = log.includes('[OK]');
                    const isData = log.includes('[DATA]');
                    const colorClass = isOk
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : isData
                        ? 'text-[#2563eb] dark:text-[#3b82f6]'
                        : 'text-amber-600 dark:text-amber-400';
                    return (
                      <div key={index} className="flex gap-2 leading-relaxed">
                        <span className="text-muted-foreground select-none shrink-0">&gt;</span>
                        <span className={colorClass}>{log}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status checklist */}
              <div className="flex flex-col gap-3 justify-between">
                {data.systemStatus.map((status, index) => (
                  <Card
                    key={index}
                    className="flex items-center justify-between p-5 hover:border-[#3b82f6]/20 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex items-center justify-center text-[#3b82f6]">
                        {getIcon(status.icon, 'w-5 h-5')}
                      </div>
                      <span className="text-sm font-semibold text-foreground">{status.label}</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 uppercase tracking-wider">
                      {status.status}
                    </span>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Core Capabilities */}
          <div className="my-16 sm:my-24">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground mb-10 sm:mb-14">
              Core <span className="text-[#3b82f6]">Capabilities</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.capabilities.map((cap, index) => (
                <Card
                  key={index}
                  className="p-8 hover:border-[#3b82f6]/20 transition-all duration-300 flex flex-col gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#3b82f6]/10 border border-[#3b82f6]/20 flex items-center justify-center text-[#3b82f6] mb-2">
                    {getIcon(cap.icon, 'w-6 h-6')}
                  </div>
                  <h3 className="text-xl font-bold text-foreground tracking-tight">{cap.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {cap.desc}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Page CTA */}
          <AnimateOnScroll variant="scale" className="my-16 sm:my-24  mx-auto">
            <Card className="p-8 sm:p-12 text-center relative overflow-hidden flex flex-col items-center gap-5 sm:gap-6 shadow-2xl">
              <h3 className="text-2xl sm:text-4xl font-bold text-foreground tracking-tight">
                Ready to{' '}
                <span className="text-[#3b82f6] drop-shadow-[0_2px_10px_rgba(59,130,246,0.2)]">
                  Transform?
                </span>
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground max-w-lg leading-relaxed">
                Let us build a secure, scalable platform that powers your operations.
              </p>
              <Button
                href="/#contact"
                variant="primary"
                size="lg"
                className="bg-[#3b82f6] shadow-[#3b82f6]/20 hover:bg-[#3b82f6]/95 group mt-2"
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
