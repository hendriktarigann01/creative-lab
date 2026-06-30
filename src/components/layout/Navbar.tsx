'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Toggle } from '@/components/ui/Toggle';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname, Link } from '@/i18n/routing';
import { localeNames, localeFlags, type Locale } from '@/i18n/config';

export function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Set initial theme
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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
      setScrolled(currentScrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const switchLocale = (next: Locale) => {
    router.replace(pathname, { locale: next });
    setLangOpen(false);
  };

  const navItems = [
    { name: t('home'), path: '/' },
    { name: t('services'), path: '/our-services' },
    { name: t('portfolio'), path: '/portfolio' },
    { name: t('contact'), path: '/contact' },
  ];

  const locales = Object.keys(localeNames) as Locale[];

  return (
    <header
      className={cn(
        'fixed left-0 right-0 z-50 transition-all top-4 md:top-6 duration-300 mx-auto max-w-7xl px-4 md:px-0',
        visible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0 pointer-events-none'
      )}
    >
      <div
        className={cn(
          'w-full transition-all rounded-4xl py-2 px-6 duration-300 border backdrop-blur-sm bg-background/10 border-border shadow-lg shadow-black/5'
        )}
      >
        <Container className="flex items-center justify-between p-0">
          <Link href="/" className="flex items-center group cursor-pointer shrink-0">
            <Image
              src={theme === 'light' ? '/creative-lab-2.webp' : '/creative-lab.webp'}
              alt="Creative LAB Logo"
              width={140}
              height={42}
              priority
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path as never}
                  className={cn(
                    'relative text-sm font-medium tracking-wide transition-all duration-500 px-2 py-2 block overflow-hidden group',
                    isActive ? 'text-primary font-medium' : 'text-muted-foreground'
                  )}
                >
                  {item.name}

                  <span
                    className={cn(
                      'absolute bottom-0 left-0 h-[2px] bg-primary transition-all duration-500 ease-out',
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Toggle />
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-1.5 transition-colors cursor-pointer"
              >
                <Image
                  src={localeFlags[locale]}
                  alt={locale}
                  width={18}
                  height={18}
                  className="rounded-full object-cover"
                />
                {locale.toUpperCase()}
                <ChevronDown size={13} />
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-2 w-32 rounded-xl border border-border bg-card/90 backdrop-blur-md overflow-hidden z-50">
                  {locales.map((l) => (
                    <button
                      key={l}
                      onClick={() => switchLocale(l)}
                      className={cn(
                        'flex items-center gap-2 w-full px-3 py-2.5 text-sm transition-colors text-left cursor-pointer',
                        locale === l
                          ? 'text-primary font-medium'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      )}
                    >
                      <Image
                        src={localeFlags[l]}
                        alt={l}
                        width={16}
                        height={16}
                        className="rounded-full object-cover"
                      />
                      {localeNames[l]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button
              href="/contact"
              variant="outline"
              size="sm"
              className="rounded-full hover:border-primary hover:text-primary bg-primary/5"
            >
              {t('getStarted')}
            </Button>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-muted-foreground hover:text-foreground transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </Container>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-4 top-[80px] bg-card/95 backdrop-blur-lg border border-border rounded-2xl p-6 shadow-xl flex flex-col gap-6 z-40 transition-all duration-300">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path as never}
                  onClick={handleLinkClick}
                  className={cn(
                    'text-lg font-medium tracking-wide py-2 px-4 rounded-xl transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex gap-3 justify-center items-center py-2">
            <Toggle className="w-9 h-9" />
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => {
                  switchLocale(l);
                  handleLinkClick();
                }}
                className={cn(
                  'flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md border transition-all duration-200 cursor-pointer',
                  locale === l
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border text-muted-foreground hover:border-primary/50 hover:text-primary'
                )}
              >
                <Image
                  src={localeFlags[l]}
                  alt={l}
                  width={16}
                  height={16}
                  className="rounded-full object-cover"
                />
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="pt-2">
            <Button
              href="/contact"
              onClick={handleLinkClick}
              variant="primary"
              className="w-full rounded-full"
            >
              {t('getStarted')}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
