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
    { name: tNav('product'), path: '/product' },
    { name: tNav('portfolio'), path: '/portfolio' },
    { name: tNav('contact'), path: '/contact' },
  ];

  return (
    <footer className="text-tertiary text-xs md:text-sm py-16 px-6 md:px-12 font-sans border-t border-white/5 bg-background relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-10 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="inline-block">
            <Image
              src={theme === 'light' ? '/creative-lab-2.webp' : '/creative-lab.webp'}
              alt="Creative LAB Logo"
              width={140}
              height={42}
              priority
              className="object-contain transition-transform duration-300 hover:scale-105"
            />
          </Link>
          <p className="text-sm md:text-base max-w-sm md:max-w-none text-tertiary/75">{tFooter('tagline')}</p>
        </div>

        <nav className="flex flex-col md:flex-row items-center gap-4 md:gap-x-8 md:gap-y-4">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.path as never}
              className="hover:text-primary transition-colors duration-300 py-0.5 md:py-0"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="max-w-7xl mx-auto border-t-2 border-border my-8 w-full" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center">
        {/* Mobile-only text social links separated by '|' */}
        <div className="flex sm:hidden flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-tertiary/75">
          <a
            href="https://www.instagram.com/creativelab.idn/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Instagram
          </a>
          <span className="text-tertiary/30">|</span>
          <a href="#" className="hover:text-foreground transition-colors">
            Tiktok
          </a>
          <span className="text-tertiary/30">|</span>
          <a href="#" className="hover:text-foreground transition-colors">
            Youtube
          </a>
          <span className="text-tertiary/30">|</span>
          <a href="#" className="hover:text-foreground transition-colors">
            Threads
          </a>
        </div>

        {/* Desktop-only SVG social links */}
        <div className="hidden sm:flex gap-4 md:gap-6">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/creativelab.idn/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4 md:h-5 md:w-5"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            </svg>
            <span className="hidden md:inline">Instagram</span>
          </a>

          {/* TikTok */}
          <a href="#" className="flex items-center gap-1 hover:text-foreground transition-colors">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4 md:h-5 md:w-5"
            >
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
            </svg>
            <span className="hidden md:inline">TikTok</span>
          </a>

          {/* Threads */}
          <a href="#" className="flex items-center gap-1 hover:text-foreground transition-colors">
            <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 md:h-5 md:w-5">
              <path d="M6.321 6.016c-.27-.18-1.166-.802-1.166-.802.756-1.081 1.753-1.502 3.132-1.502.975 0 1.803.327 2.394.948s.928 1.509 1.005 2.644q.492.207.905.484c1.109.745 1.719 1.86 1.719 3.137 0 2.716-2.226 5.075-6.256 5.075C4.594 16 1 13.987 1 7.994 1 2.034 4.482 0 8.044 0 9.69 0 13.55.243 15 5.036l-1.36.353C12.516 1.974 10.163 1.43 8.006 1.43c-3.565 0-5.582 2.171-5.582 6.79 0 4.143 2.254 6.343 5.63 6.343 2.777 0 4.847-1.443 4.847-3.556 0-1.438-1.208-2.127-1.27-2.127-.236 1.234-.868 3.31-3.644 3.31-1.618 0-3.013-1.118-3.013-2.582 0-2.09 1.984-2.847 3.55-2.847.586 0 1.294.04 1.663.114 0-.637-.54-1.728-1.9-1.728-1.25 0-1.566.405-1.967.868ZM8.716 8.19c-2.04 0-2.304.87-2.304 1.416 0 .878 1.043 1.168 1.6 1.168 1.02 0 2.067-.282 2.232-2.423a6.2 6.2 0 0 0-1.528-.161" />
            </svg>
            <span className="hidden md:inline">Threads</span>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/people/Creative-LAB/61590412170724/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4 md:h-5 md:w-5"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
            <span className="hidden md:inline">Facebook</span>
          </a>
        </div>

        <p className="order-first md:order-last text-tertiary/75">
          © {currentYear} Creative Lab. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
