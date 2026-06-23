'use client';

import { useState, useEffect, useRef } from 'react';
import { Gamepad2, Smartphone, Share2, Trophy, Target, Play, RotateCcw } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AnimateOnScroll } from '@/components/ui/AnimateOnScroll';
import { PageHero } from '@/components/ui/PageHero';
import { JsonLd } from '@/components/ui/JsonLd';
import { getBreadcrumbSchema, getServiceSchema } from '@/lib/structured-data';
import { useParams } from 'next/navigation';

import { gamificationPageData } from '@/data/services-detail';

export default function GamificationPage() {
  const params = useParams();
  const locale = params.locale as string;
  const data = gamificationPageData[locale] || gamificationPageData['en'];

  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [targetPos, setTargetPos] = useState({ top: '50%', left: '50%' });
  const gameAreaRef = useRef<HTMLDivElement>(null);

  // Start game handler
  const startGame = () => {
    setScore(0);
    setTimeLeft(15);
    setGameState('playing');
    moveTarget();
  };

  // Move target helper
  const moveTarget = () => {
    if (!gameAreaRef.current) return;
    const area = gameAreaRef.current.getBoundingClientRect();
    const targetSize = 60; // 60px target

    // Calculate random position boundaries
    const maxX = area.width - targetSize;
    const maxY = area.height - targetSize;

    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);

    setTargetPos({
      top: `${y}px`,
      left: `${x}px`,
    });
  };

  // Target click handler
  const handleTargetClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (gameState !== 'playing') return;
    setScore((prev) => prev + 1);
    moveTarget();
  };

  // Game timer loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setTimeout(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameState('gameover');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [gameState]);

  const getIcon = (iconName: string, className: string = 'w-6 h-6') => {
    switch (iconName) {
      case 'Gamepad2':
        return <Gamepad2 className={className} />;
      case 'Smartphone':
        return <Smartphone className={className} />;
      case 'Share2':
        return <Share2 className={className} />;
      case 'Trophy':
        return <Trophy className={className} />;
      default:
        return null;
    }
  };

  const breadcrumbItems = [
    { name: 'Services', path: '/our-services' },
    { name: 'Gamification & Games' },
  ];

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Services', item: '/our-services' },
    { name: 'Gamification & Games', item: '/our-services/gamification-games' },
  ]);

  const serviceSchema = getServiceSchema(data.hero.title, data.hero.desc, 'gamification-games');

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={serviceSchema} />

      <PageHero
        breadcrumbs={breadcrumbItems}
        label="Gamification & Games"
        title="Gamification & Games"
        gradientWord="Games"
        description={data.hero.desc}
        accentColor="#8b5cf6"
      />

      <section className="pb-16 bg-background relative overflow-hidden">
        <Container>

          {/* Try It Yourself Mini Game */}
          <div className="my-16 sm:my-24">
            <div className="flex flex-col gap-3 max-w-3xl mb-8 sm:mb-12">
              <Badge variant="outline">Interactive Demo</Badge>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground mt-1">
                Try It <span className="text-[#8b5cf6]">Yourself</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Click the targets as fast as you can! This is a taste of our interactive
                capabilities.
              </p>
            </div>

            {/* Game Canvas Container */}
            <Card className="p-4 flex flex-col gap-4 overflow-hidden relative shadow-2xl">
              {/* Game HUD */}
              <div className="flex justify-between items-center bg-muted/30 border border-border px-6 py-4 rounded-xl relative z-15">
                <div className="flex items-center gap-1.5">
                  <Trophy className="w-5 h-5 text-[#8b5cf6]" />
                  <span className="text-sm font-semibold text-muted-foreground">
                    Score: <span className="text-foreground font-bold text-lg">{score}</span>
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Target className="w-5 h-5 text-[#8b5cf6]" />
                  <span className="text-sm font-semibold text-muted-foreground">
                    Time Left: <span className="text-foreground font-bold text-lg">{timeLeft}s</span>
                  </span>
                </div>
              </div>

              {/* Game Playfield */}
              <div
                ref={gameAreaRef}
                className="relative w-full h-[360px] rounded-xl border border-border bg-background flex items-center justify-center select-none overflow-hidden"
              >
                {/* Idle state overlay */}
                {gameState === 'idle' && (
                  <div className="flex flex-col items-center gap-4 text-center px-4 relative z-10 animate-fade-in">
                    <p className="text-base text-muted-foreground">Ready to test your reflexes?</p>
                    <Button
                      onClick={startGame}
                      variant="primary"
                      className="bg-[#8b5cf6] hover:bg-[#8b5cf6]/95"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Game
                    </Button>
                  </div>
                )}

                {/* Game over overlay */}
                {gameState === 'gameover' && (
                  <div className="flex flex-col items-center gap-4 text-center px-4 relative z-10 animate-fade-in">
                    <p className="text-xl font-bold text-foreground">
                      Game Over! Score: <span className="text-[#8b5cf6]">{score}</span>
                    </p>
                    <Button
                      onClick={startGame}
                      variant="outline"
                      className="hover:border-[#8b5cf6]/30 hover:text-foreground"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Play Again
                    </Button>
                  </div>
                )}

                {/* Game Target */}
                {gameState === 'playing' && (
                  <button
                    onClick={handleTargetClick}
                    className="absolute w-[60px] h-[60px] rounded-full bg-[#8b5cf6]/10 border-2 border-[#8b5cf6] flex items-center justify-center text-[#8b5cf6] hover:bg-[#8b5cf6]/20 transition-all duration-100 animate-pulse hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-[#8b5cf6]/30"
                    style={{
                      top: targetPos.top,
                      left: targetPos.left,
                    }}
                    aria-label="Click target"
                  >
                    <Target className="w-8 h-8" />
                  </button>
                )}
              </div>
            </Card>
          </div>

          {/* Core Capabilities */}
          <div className="my-16 sm:my-24">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground mb-10 sm:mb-14">
              Core <span className="text-[#8b5cf6]">Capabilities</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.capabilities.map((cap, index) => (
                <Card
                  key={index}
                  className="p-8 hover:border-[#8b5cf6]/20 transition-all duration-300 flex flex-col gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 flex items-center justify-center text-[#8b5cf6] mb-2">
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
                <span className="text-[#8b5cf6] drop-shadow-[0_2px_10px_rgba(139,92,246,0.2)]">
                  Play?
                </span>
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground max-w-lg leading-relaxed">
                Let us gamify your customer experience and drive real engagement.
              </p>
              <Button
                href="/#contact"
                variant="primary"
                size="lg"
                className="bg-[#8b5cf6] shadow-[#8b5cf6]/20 hover:bg-[#8b5cf6]/95 group mt-2"
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
