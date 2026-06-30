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
      <div className="flex flex-wrap justify-center gap-10 md:gap-14">
        {/* Instagram */}
        <a
          href="https://instagram.com"
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
          <span className="icon-label">Instagram</span>
        </a>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon linkedin"
        >
          <div className="icon-container">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6 md:h-8 md:w-8 text-foreground transition-colors duration-300"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0h.003z"></path>
            </svg>
          </div>
          <span className="icon-label">LinkedIn</span>
        </a>

        {/* TikTok */}
        <a
          href="https://tiktok.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon tiktok"
        >
          <div className="icon-container">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 md:h-8 md:w-8 text-foreground transition-colors duration-300"
            >
              <g transform="translate(1.5, 1.5) scale(0.50)">
                <g fill="none">
                  <path
                    d="M14 15.599v-1.486A13.1 13.1 0 0 0 12.337 14C5.535 14 0 19.18 0 25.547 0 29.452 2.086 32.91 5.267 35c-2.13-2.132-3.315-4.942-3.313-7.861 0-6.276 5.377-11.394 12.046-11.54"
                    fill="#00f2ea"
                  />
                  <path
                    d="M14.327 32c2.876 0 5.221-2.273 5.328-5.107l.01-25.292h4.65A8.72 8.72 0 0 1 24.164 0h-6.35l-.011 25.293c-.106 2.832-2.453 5.105-5.328 5.105a5.329 5.329 0 0 1-2.476-.61A5.34 5.34 0 0 0 14.327 32m18.672-21.814V8.78a8.818 8.818 0 0 1-4.81-1.421A8.85 8.85 0 0 0 33 10.186"
                    fill="#00f2ea"
                  />
                  <path
                    d="M28 7.718A8.63 8.63 0 0 1 25.832 2h-1.697A8.735 8.735 0 0 0 28 7.718M12.325 20.065c-2.94.004-5.322 2.361-5.325 5.27A5.267 5.267 0 0 0 9.854 30a5.2 5.2 0 0 1-1.008-3.073c.003-2.91 2.385-5.268 5.325-5.271.55 0 1.075.09 1.572.244v-6.4a11.72 11.72 0 0 0-1.572-.114c-.092 0-.183.006-.274.007v4.916a5.286 5.286 0 0 0-1.572-.244"
                    fill="#ff004f"
                  />
                  <path
                    d="M32.153 11v4.884a15.15 15.15 0 0 1-8.813-2.811V25.84c0 6.377-5.23 11.565-11.658 11.565-2.485 0-4.789-.778-6.682-2.097A11.67 11.67 0 0 0 13.528 39c6.429 0 11.659-5.188 11.659-11.564V14.668A15.15 15.15 0 0 0 34 17.478v-6.283A8.87 8.87 0 0 1 32.153 11"
                    fill="#ff004f"
                  />
                  <path
                    d="M23.979 25.42V12.632A15.741 15.741 0 0 0 33 15.448v-4.89a9.083 9.083 0 0 1-4.912-2.82C26.016 6.431 24.586 4.358 24.132 2h-4.747l-.01 25.215c-.11 2.824-2.505 5.09-5.44 5.09-1.754-.002-3.398-.822-4.42-2.204-1.794-.913-2.919-2.716-2.92-4.682.003-2.92 2.44-5.285 5.45-5.289.56 0 1.098.09 1.608.245v-4.933C7.202 15.589 2 20.722 2 27.016c0 3.045 1.219 5.816 3.205 7.885A12.115 12.115 0 0 0 12.045 37c6.58 0 11.934-5.195 11.934-11.58"
                    fill="currentColor"
                  />
                </g>
              </g>
            </svg>
          </div>
          <span className="icon-label">TikTok</span>
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
            label="Contact"
            title={t('heading')}
            gradientWord={t('gradientWord')}
            description={t('subheading')}
            align="center"
          />
        )}

        {hideHeader ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-6xl">
            <div className="lg:col-span-3 h-full flex flex-col justify-center">
              <Card className="p-6 border-border bg-card hover:border-primary/20 transition-all duration-300 flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                    {t('emailLabel')}
                  </h4>
                  <p className="text-base font-medium text-foreground mt-1.5 break-all">
                    hello.creativelab@mjsolution.co.id
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">{t('emailSub')}</p>
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
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                    {t('slaLabel')}
                  </h4>
                  <p className="text-base font-medium text-foreground mt-1.5">
                    {locale === 'id' ? 'Operasional 24/7' : '24/7 Operations'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">{t('slaSub')}</p>
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
          box-shadow: 0 8px 24px var(--border);
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

        .social-icon.linkedin:hover .icon-container {
          background: #0077b5;
          box-shadow: 0 0 20px rgba(0, 119, 181, 0.6);
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
