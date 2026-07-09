'use client';

import { SectionHeader } from '@/components/ui/SectionHeader';
import { Container } from '@/components/ui/Container';
import { useTranslations, useLocale } from 'next-intl';
import { Card } from '@/components/ui/Card';
import { Mail, Clock } from 'lucide-react';

interface ContactProps {
  hideHeader?: boolean;
}

export function Contact({ hideHeader = false }: ContactProps) {
  const t = useTranslations('contact');
  const locale = useLocale();

  const renderSocialCard = (fullWidth = false) => (
    <div
      className={
        fullWidth
          ? 'rounded-3xl border border-border backdrop-blur-3xl overflow-hidden p-4 md:p-10 transition-all duration-500 hover:-translate-y-1 bg-card/75 w-full'
          : 'rounded-3xl border border-border backdrop-blur-3xl overflow-hidden p-4 md:p-10 transition-all duration-500 hover:-translate-y-1 bg-card/75 w-full max-w-2xl'
      }
      style={{
        boxShadow: `
        0 20px 60px rgba(84,14,225,0.08)
      `,
      }}
    >
      <div className="flex flex-wrap justify-center gap-4 md:gap-10">
        {/* Facebook */}
        <a
          href="https://www.facebook.com/people/Creative-LAB/61590412170724/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon facebook"
        >
          <div className="icon-container">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 md:h-8 md:w-8 text-foreground transition-colors duration-300"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </div>
          <span className="icon-label text-[10px] md:text-sm">Facebook</span>
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/creativelab.idn/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon instagram"
        >
          <div className="icon-container">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 md:h-8 md:w-8 text-foreground transition-colors duration-300"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </div>
          <span className="icon-label text-[10px] md:text-sm">Instagram</span>
        </a>

        {/* Threads */}
        <a href="#" className="social-icon threads">
          <div className="icon-container">
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-6 w-6 md:h-8 md:w-8 text-foreground transition-colors duration-300"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.321 6.016c-.27-.18-1.166-.802-1.166-.802.756-1.081 1.753-1.502 3.132-1.502.975 0 1.803.327 2.394.948s.928 1.509 1.005 2.644q.492.207.905.484c1.109.745 1.719 1.86 1.719 3.137 0 2.716-2.226 5.075-6.256 5.075C4.594 16 1 13.987 1 7.994 1 2.034 4.482 0 8.044 0 9.69 0 13.55.243 15 5.036l-1.36.353C12.516 1.974 10.163 1.43 8.006 1.43c-3.565 0-5.582 2.171-5.582 6.79 0 4.143 2.254 6.343 5.63 6.343 2.777 0 4.847-1.443 4.847-3.556 0-1.438-1.208-2.127-1.27-2.127-.236 1.234-.868 3.31-3.644 3.31-1.618 0-3.013-1.118-3.013-2.582 0-2.09 1.984-2.847 3.55-2.847.586 0 1.294.04 1.663.114 0-.637-.54-1.728-1.9-1.728-1.25 0-1.566.405-1.967.868ZM8.716 8.19c-2.04 0-2.304.87-2.304 1.416 0 .878 1.043 1.168 1.6 1.168 1.02 0 2.067-.282 2.232-2.423a6.2 6.2 0 0 0-1.528-.161" />
            </svg>
          </div>
          <span className="icon-label text-[10px] md:text-sm">Threads</span>
        </a>

        {/* TikTok */}
        <a href="#" className="social-icon tiktok">
          <div className="icon-container">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 md:h-8 md:w-8 text-foreground transition-colors duration-300"
            >
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
            </svg>
          </div>
          <span className="icon-label text-[10px] md:text-sm">TikTok</span>
        </a>
      </div>
    </div>
  );

  return (
    <section
      id="contact"
      className={
        hideHeader
          ? 'py-24 flex flex-col items-center justify-center font-sans w-full relative overflow-hidden'
          : 'py-24 sm:py-32 flex flex-col items-center justify-center font-sans w-full min-h-dvh relative overflow-hidden'
      }
    >
      {!hideHeader && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none" />
      )}

      <Container className="flex flex-col items-center relative z-10 w-full">
        {!hideHeader && (
          <SectionHeader
            label={t('label') || 'Contact'}
            title={t('heading')}
            description={t('subheading')}
            align="center"
          />
        )}

        {hideHeader ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
            <div className="lg:col-span-3 h-full flex flex-col justify-center">
              <Card className="p-6 border-border bg-card hover:border-primary/20 transition-all duration-300 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-medium text-tertiary uppercase tracking-widest">
                    {t('emailLabel')}
                  </h4>
                  <p className="text-base font-medium text-foreground mt-1.5 break-all">
                    hello.creativelab@mjsolution.co.id
                  </p>
                  <p className="text-xs text-tertiary mt-2">{t('emailSub')}</p>
                </div>
              </Card>
            </div>

            {/* Column 2: Social Links Card */}
            <div className="lg:col-span-6 flex justify-center w-full">{renderSocialCard(true)}</div>

            {/* Column 3: Clock Card */}
            <div className="lg:col-span-3 h-full flex flex-col justify-center">
              <Card className="p-6 border-border bg-card hover:border-primary/20 transition-all duration-300 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-medium text-tertiary uppercase tracking-widest">
                    {t('slaLabel')}
                  </h4>
                  <p className="text-base font-medium text-foreground mt-1.5">
                    {t('slaAvailabilityValue') || '24/7 Operations'}
                  </p>
                  <p className="text-xs text-tertiary mt-2">{t('slaSub')}</p>
                </div>
              </Card>
            </div>
          </div>
        ) : (
          <div className="relative w-full max-w-2xl flex justify-center">
            {renderSocialCard(false)}
          </div>
        )}
      </Container>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .social-icon {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
        }

        .icon-container {
          display: inline-flex;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          transition: all 0.3s ease;
          position: relative;
          justify-content: center;
          align-items: center;
          background: var(--muted);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border: 1px solid var(--border);
        }

        @media (max-width: 768px) {
          .icon-container {
            width: 64px;
            height: 64px;
          }
        }

        @media (max-width: 480px) {
          .icon-container {
            width: 56px;
            height: 56px;
          }
        }

        .social-icon:hover .icon-container {
          transform: translateY(-10px) scale(1.1);
        }

        .social-icon:hover .icon-label {
          opacity: 1;
          transform: translateY(5px);
        }

        .icon-label {
          margin-top: 12px;
          color: var(--foreground);
          font-weight: 500;
          opacity: 0.7;
          transition: all 0.3s ease;
        }

        .social-icon.instagram:hover .icon-container {
          background: radial-gradient(
            circle at 30% 107%,
            #fdf497 0%,
            #fdf497 5%,
            #fd5949 45%,
            #d6249f 60%,
            #285aeb 90%
          );
          box-shadow: 0 0 20px rgba(225, 48, 108, 0.6);
        }

        .social-icon.facebook:hover .icon-container {
          background: #1877f2;
          box-shadow: 0 0 20px rgba(24, 119, 242, 0.6);
        }

        .social-icon.threads:hover .icon-container {
          background: #101010;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.25);
          border-color: rgba(255, 255, 255, 0.4);
        }

        .social-icon.tiktok:hover .icon-container {
          background: #010101;
          box-shadow: -3px -3px 0px rgba(0, 242, 254, 0.8), 3px 3px 0px rgba(254, 9, 121, 0.8);
        }

        .social-icon:hover svg {
          animation: shake 0.5s;
          color: white !important;
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0) rotate(0);
          }
          20% {
            transform: translateX(-5px) rotate(-5deg);
          }
          40% {
            transform: translateX(5px) rotate(5deg);
          }
          60% {
            transform: translateX(-5px) rotate(-5deg);
          }
          80% {
            transform: translateX(5px) rotate(5deg);
          }
        }

        .icon-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 50%;
          background: radial-gradient(
            circle at center,
            rgba(255, 255, 255, 0.4) 0%,
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .social-icon:hover .icon-container::before {
          opacity: 1;
        }
      `,
        }}
      />
    </section>
  );
}
