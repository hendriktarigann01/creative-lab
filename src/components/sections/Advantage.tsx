'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Container } from '@/components/ui/Container';
import { ICON_MAP } from '@/constants/advantages';
import { useTranslations } from 'next-intl';
import {
  HoverSlider,
  TextStaggerHover,
  HoverSliderImageWrap,
  HoverSliderImage,
  useHoverSliderContext,
} from '@/components/ui/Slideshow';

interface AutoPlayProps {
  count: number;
  isHovered: boolean;
}

function AutoPlaySlider({ count, isHovered }: AutoPlayProps) {
  const { activeSlide, changeSlide } = useHoverSliderContext();

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      changeSlide((activeSlide + 1) % count);
    }, 4500);
    return () => clearInterval(interval);
  }, [activeSlide, changeSlide, count, isHovered]);

  return null;
}

interface AdvantageRowProps {
  index: number;
  item: { title: string; desc: string; icon: string };
  isHovered: boolean;
  setHoveredIndex: (index: number | null) => void;
}

function AdvantageRow({ index, item, isHovered, setHoveredIndex }: AdvantageRowProps) {
  const { activeSlide, changeSlide } = useHoverSliderContext();
  const isActive = activeSlide === index;

  return (
    <div
      className="relative pt-5 pb-6 group cursor-pointer"
      onMouseEnter={() => {
        setHoveredIndex(index);
        changeSlide(index);
      }}
      onMouseLeave={() => setHoveredIndex(null)}
      onClick={() => {
        setHoveredIndex(index);
        changeSlide(index);
      }}
    >
      {/* Header: Icon + Title */}
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 [&_svg]:w-6 [&_svg]:h-6 ${
            isActive
              ? 'bg-accent/15 border-accent/30 text-accent shadow-lg shadow-accent/10'
              : 'bg-white/5 border-white/10 text-muted-foreground group-hover:border-white/20'
          }`}
        >
          {ICON_MAP[item.icon]}
        </div>

        {/* Title with stagger hover effect */}
        <TextStaggerHover
          text={item.title}
          index={index}
          className={`text-xl sm:text-2xl font-medium tracking-tight transition-colors duration-300 ${
            isActive ? 'text-foreground font-semibold' : 'text-foreground/50'
          }`}
        />
      </div>

      {/* Description (collapsible with height animation) */}
      <motion.div
        initial={false}
        animate={{
          height: isActive ? 'auto' : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="overflow-hidden"
      >
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-3 sm:pl-16 pl-0 max-w-xl">
          {item.desc}
        </p>
      </motion.div>

      {/* Loading Bar as bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: isActive ? '100%' : '0%' }}
          transition={{
            duration: isActive ? (isHovered ? 0.35 : 4.5) : 0,
            ease: isActive && !isHovered ? 'linear' : 'easeInOut',
          }}
          className="h-full bg-accent"
        />
      </div>
    </div>
  );
}

export function Advantage() {
  const t = useTranslations('advantages');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const headingPlain = t('headingPlain');
  const headingColored = t('headingColored');

  const advantagesItems = [
    { title: t('cpu.title'), desc: t('cpu.desc'), icon: 'Cpu' },
    { title: t('shield.title'), desc: t('shield.desc'), icon: 'ShieldCheck' },
    { title: t('wrench.title'), desc: t('wrench.desc'), icon: 'Wrench' },
    { title: t('zap.title'), desc: t('zap.desc'), icon: 'Zap' },
    { title: t('server.title'), desc: t('server.desc'), icon: 'Server' },
    { title: t('clock.title'), desc: t('clock.desc'), icon: 'Clock' },
  ];

  return (
    <main className="bg-background relative py-12 sm:py-20 overflow-hidden">
      <Container className="flex flex-col gap-16">
        {/* Title Block */}
        <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto">
          <span
            className="self-center text-[11px] font-medium tracking-[.15em] uppercase text-accent px-4 py-1.5 rounded-full border border-accent/25"
          >
            Our Advantage
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.1] text-foreground">
            {headingPlain}
            <span className="text-accent">{headingColored}</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto leading-relaxed mt-2">
            {t('subheading')}
          </p>
        </div>

        {/* Hover Slider Grid */}
        <HoverSlider className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          <AutoPlaySlider count={advantagesItems.length} isHovered={hoveredIndex !== null} />

          {/* Left Column: Interactive text list */}
          <div className="lg:col-span-7 flex flex-col justify-between py-2 order-2 lg:order-1 h-full">
            {advantagesItems.map((item, index) => (
              <AdvantageRow
                key={index}
                index={index}
                item={item}
                isHovered={hoveredIndex !== null}
                setHoveredIndex={setHoveredIndex}
              />
            ))}
          </div>

          {/* Right Column: Slideshow Images */}
          <div className="lg:col-span-5 w-full order-1 lg:order-2 flex flex-col h-full min-h-[300px] lg:min-h-full">
            <HoverSliderImageWrap className="relative flex-1 w-full h-full min-h-[300px] lg:min-h-full rounded-2xl border border-white/10 bg-transparent overflow-hidden shadow-2xl shadow-accent/5">
              {advantagesItems.map((item, index) => (
                <HoverSliderImage
                  key={index}
                  index={index}
                  imageUrl={`/advantage/slideshow-${index + 1}.png`}
                  src={`/advantage/slideshow-${index + 1}.png`}
                  alt={item.title}
                  className="object-cover w-full h-full absolute inset-0"
                />
              ))}
            </HoverSliderImageWrap>
          </div>
        </HoverSlider>
      </Container>
    </main>
  );
}
