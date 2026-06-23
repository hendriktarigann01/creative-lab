'use client';

import { useState, useRef, MouseEvent, TouchEvent } from 'react';
import { MapPin, Glasses, Monitor, Cpu, Search, Navigation, Eye, Camera, X } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';
import { PageHero } from '@/components/ui/PageHero';
import { JsonLd } from '@/components/ui/JsonLd';
import { getBreadcrumbSchema, getServiceSchema } from '@/lib/structured-data';
import { useParams } from 'next/navigation';

import { interactivePageData } from '@/data/services-detail';

export default function InteractivePage() {
  const params = useParams();
  const locale = params.locale as string;
  const data = interactivePageData[locale] || interactivePageData['en'];

  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [posX, setPosX] = useState(0); // background panning position
  const isDragging = useRef(false);
  const startX = useRef(0);

  // Panorama drag start
  const handleDragStart = (clientX: number) => {
    isDragging.current = true;
    startX.current = clientX - posX;
  };

  // Panorama dragging
  const handleDragMove = (clientX: number) => {
    if (!isDragging.current) return;
    const diff = clientX - startX.current;
    // Limit panning boundary
    const clamped = Math.max(-400, Math.min(400, diff));
    setPosX(clamped);
  };

  // Panorama drag stop
  const handleDragEnd = () => {
    isDragging.current = false;
  };

  const handleMouseDown = (e: MouseEvent) => {
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 1) {
      handleDragStart(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length === 1) {
      handleDragMove(e.touches[0].clientX);
    }
  };

  const getIcon = (iconName: string, className: string = 'w-6 h-6') => {
    switch (iconName) {
      case 'Search':
        return <Search className={className} />;
      case 'Eye':
        return <Eye className={className} />;
      case 'Camera':
        return <Camera className={className} />;
      case 'MapPin':
        return <MapPin className={className} />;
      case 'Glasses':
        return <Glasses className={className} />;
      case 'Monitor':
        return <Monitor className={className} />;
      case 'Cpu':
        return <Cpu className={className} />;
      default:
        return null;
    }
  };

  const breadcrumbItems = [
    { name: 'Services', path: '/our-services' },
    { name: 'Interactive Experiences' },
  ];

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Services', item: '/our-services' },
    { name: 'Interactive Experiences', item: '/our-services/interactive-experiences' },
  ]);

  const serviceSchema = getServiceSchema(
    data.hero.title,
    data.hero.desc,
    'interactive-experiences'
  );

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={serviceSchema} />

      <PageHero
        breadcrumbs={breadcrumbItems}
        label="Interactive Experiences"
        title="Interactive Experiences"
        gradientWord="Experiences"
        description={data.hero.desc}
        accentColor="#ec4899"
      />

      <section className="pb-16 bg-background relative overflow-hidden">
        <Container>

          {/* 360° Space Simulated Section */}
          <div className="my-16 sm:my-24">
            <div className="flex flex-col gap-3 max-w-3xl mb-8 sm:mb-12">
              <Badge variant="outline">Interactive 360 Space</Badge>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground mt-1">
                Experience a <span className="text-[#ec4899]">True 360° Space</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Click and drag in any direction (up, down, left, right) to look around. Tap the
                hotspots to explore interactive features.
              </p>
            </div>

            {/* 360 Panorama Viewport */}
            <Card className="border-border bg-background p-0 overflow-hidden relative h-[440px] shadow-2xl flex flex-col justify-end select-none cursor-grab active:cursor-grabbing">
              {/* Drag Hint */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/60 border border-border text-xs font-semibold text-foreground pointer-events-none backdrop-blur-sm">
                <Navigation className="w-3.5 h-3.5 rotate-45 text-[#ec4899]" />
                Drag to Look Around
              </div>

              {/* Panorama Panning Area */}
              <div
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleDragEnd}
                className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-200 ease-out flex items-center justify-center"
                style={{
                  backgroundImage: `url('https://picsum.photos/seed/creative-lab-360/2048/1024')`,
                  width: '240%',
                  transform: `translateX(${posX}px)`,
                }}
              >
                {/* Hotspot 1: Wayfinding */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveHotspot(1);
                  }}
                  className="absolute left-[30%] top-[45%] w-8 h-8 rounded-full bg-[#ec4899] border-2 border-white flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform animate-bounce cursor-pointer shadow-lg shadow-[#ec4899]/50"
                  aria-label="Wayfinding Hotspot"
                >
                  <Search className="w-4 h-4" />
                </button>

                {/* Hotspot 2: AR Activation */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveHotspot(2);
                  }}
                  className="absolute left-[50%] top-[40%] w-8 h-8 rounded-full bg-[#ec4899] border-2 border-white flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform animate-bounce cursor-pointer shadow-lg shadow-[#ec4899]/50"
                  aria-label="AR Hotspot"
                >
                  <Eye className="w-4 h-4" />
                </button>

                {/* Hotspot 3: 360 Camera */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveHotspot(3);
                  }}
                  className="absolute left-[70%] top-[50%] w-8 h-8 rounded-full bg-[#ec4899] border-2 border-white flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-transform animate-bounce cursor-pointer shadow-lg shadow-[#ec4899]/50"
                  aria-label="360 Camera Hotspot"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              {/* Hotspot Info Modal Overlay */}
              {activeHotspot !== null && (
                <div className="absolute inset-x-4 bottom-4 z-30 p-5 rounded-xl bg-card/90 border border-border backdrop-blur-md shadow-2xl flex flex-col gap-2 max-w-sm animate-slide-up">
                  <button
                    onClick={() => setActiveHotspot(null)}
                    className="absolute top-3 right-3 p-1 rounded-full text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    aria-label="Close details"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  {(() => {
                    const spot = data.hotspots.find((h) => h.id === activeHotspot);
                    if (!spot) return null;
                    return (
                      <>
                        <div className="flex items-center gap-2">
                          <div className="text-[#ec4899]">{getIcon(spot.icon, 'w-4 h-4')}</div>
                          <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">
                            {spot.title}
                          </h4>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {spot.desc}
                        </p>
                      </>
                    );
                  })()}
                </div>
              )}
            </Card>
          </div>

          {/* Real-World Use Cases */}
          <div className="my-16 sm:my-24">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground mb-10 sm:mb-14 text-center">
              Real-World <span className="text-[#ec4899]">Applications</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.useCases.map((useCase, index) => (
                <Card
                  key={index}
                  className="p-8 text-center hover:border-[#ec4899]/20 transition-all duration-300 flex flex-col items-center gap-4"
                >
                  <span className="text-4xl filter drop-shadow-[0_4px_10px_rgba(236,72,153,0.15)] mb-2">
                    {useCase.icon}
                  </span>
                  <h3 className="text-xl font-bold text-foreground tracking-tight">{useCase.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{useCase.desc}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Core Capabilities */}
          <div className="my-16 sm:my-24">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground mb-10 sm:mb-14">
              Core <span className="text-[#ec4899]">Capabilities</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.capabilities.map((cap, index) => (
                <Card
                  key={index}
                  className="p-8 hover:border-[#ec4899]/20 transition-all duration-300 flex flex-col gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#ec4899]/10 border border-[#ec4899]/20 flex items-center justify-center text-[#ec4899] mb-2">
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
                <span className="text-[#ec4899] drop-shadow-[0_2px_10px_rgba(236,72,153,0.2)]">
                  Immerse?
                </span>
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground max-w-lg leading-relaxed">
                Let us build an interactive experience that transforms your space.
              </p>
              <Button
                href="/#contact"
                variant="primary"
                size="lg"
                className="bg-[#ec4899] shadow-[#ec4899]/20 hover:bg-[#ec4899]/95 group mt-2"
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
