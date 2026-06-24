'use client';

import { useRef } from 'react';
import { useTransform, motion, useScroll, MotionValue } from 'motion/react';
import { Container } from '@/components/ui/Container';
import { RandomPattern } from '@/components/ui/RandomPattern';
import { ICON_MAP, BIG_ICON_MAP, CARD_STYLES } from '@/constants/advantages';
import { useTranslations } from 'next-intl';

interface AdvantageCardProps {
  i: number;
  title: string;
  desc: string;
  icon: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

function AdvantageCard({ i, title, desc, icon, progress, range, targetScale }: AdvantageCardProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const bigIconScale = useTransform(scrollYProgress, [0, 1], [1.6, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  const style = CARD_STYLES[i % CARD_STYLES.length];

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className={`
          relative -top-[25%] h-[350px] w-full max-w-5xl rounded-2xl backdrop-blur-2xl origin-top
          ${style.card} overflow-hidden
        `}
      >
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-10"
          style={{
            padding: '1px',
            background:
              'linear-gradient(135deg, rgba(84,14,225,0.5), rgba(171,127,235,0.15), transparent 60%)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />

        <motion.div
          className={`absolute -bottom-8 -right-8 opacity-[0.06] pointer-events-none ${style.bigIconColor}`}
          style={{ scale: bigIconScale }}
        >
          {BIG_ICON_MAP[icon]}
        </motion.div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-12 gap-6">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center ${style.iconBox}`}
          >
            <span className={style.iconColor}>{ICON_MAP[icon]}</span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-foreground tracking-tight leading-tight">
            {title}
          </h2>

          <div
            className="w-16 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(171,127,235,0.5), transparent)',
            }}
          />

          <p className="text-base text-muted-foreground leading-relaxed max-w-md">{desc}</p>
        </div>
      </motion.div>
    </div>
  );
}

export function Advantage() {
  const t = useTranslations('advantages');
  const container = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

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
    <main className="bg-background relative" ref={container}>
      <RandomPattern variant="advantage" />
      <section className="min-h-[35vh] md:min-h-[50vh] -mb-[25vh] md:mb-0 w-full grid place-content-center text-center">
        <Container className="flex flex-col items-center gap-4">
          <span
            className="text-[11px] font-medium tracking-[.15em] uppercase text-accent px-4 py-1.5 rounded-full border border-accent/25"
          >
            Our Advantage
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.1] text-foreground">
            {headingPlain}
            <span className="text-accent">{headingColored}</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-md leading-relaxed mt-2">
            {t('subheading')}
          </p>
        </Container>
      </section>

      <section id="advantage" className="w-full">
        {advantagesItems.map((item, i) => {
          const targetScale = 1 - (advantagesItems.length - i) * 0.05;
          return (
            <AdvantageCard
              key={i}
              i={i}
              title={item.title}
              desc={item.desc}
              icon={item.icon}
              progress={scrollYProgress}
              range={[i / advantagesItems.length, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </section>
    </main>
  );
}
