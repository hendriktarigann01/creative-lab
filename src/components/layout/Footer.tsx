'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export function Footer() {
  const tNav = useTranslations('nav');
  const tFooter = useTranslations('footer');
  const [currentYear, setCurrentYear] = useState<number>(2026);

  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());

    const isDark = document.documentElement.classList.contains('dark');
    const initialTheme = isDark ? 'dark' : 'light';
    const timer = setTimeout(() => {
      setTheme(initialTheme);
    }, 0);

    const observer = new MutationObserver(() => {
      const currentDark = document.documentElement.classList.contains('dark');
      setTheme(currentDark ? 'dark' : 'light');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const navLinks = [
    { name: tNav('home'), path: '/' },
    { name: tNav('services'), path: '/our-services' },
    { name: tNav('portfolio'), path: '/portfolio' },
    { name: tNav('contact'), path: '/contact' },
  ];

  return (
    <footer className="text-muted-foreground py-16 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        <div className="flex flex-col gap-2">
          <Link href="/" className="inline-block">
            <Image
              src={theme === 'light' ? '/creative-lab-2.png' : '/creative-lab.png'}
              alt="Creative LAB Logo"
              width={140}
              height={42}
              priority
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          <p className="text-sm md:text-base text-muted-foreground font-light tracking-wide">
            {tFooter('tagline')}
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm md:text-base text-foreground/90">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.path as never}
              className="hover:text-primary transition-colors duration-300 font-medium"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 flex justify-center text-xs md:text-sm text-muted-foreground/60">
        <p>
          © {currentYear} CreativeLAB. {tFooter('copyright')}
        </p>
      </div>
    </footer>
  );
}
