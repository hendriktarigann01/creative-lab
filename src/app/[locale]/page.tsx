import type { Metadata } from 'next';
import { getOrganizationSchema, getWebSiteSchema } from '@/lib/structured-data';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { HeroFrameBackground } from '@/components/sections/HeroFrameBackground';
import { Advantage } from '@/components/sections/Advantage';
import { ProductListShowcase } from '@/components/sections/ProductListShowcase';
import { Services } from '@/components/sections/Services';
import { PortfolioShowcase } from '@/components/sections/PortfolioShowcase';
import { Workflow } from '@/components/sections/Workflow';
import { CTA } from '@/components/sections/CTA';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'en' && locale !== 'id') {
    return {};
  }
  const metadata = (await import(`@/data/${locale}/metadata.json`)).default.siteMetadata;

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    alternates: {
      canonical: metadata.siteUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: 'website',
      title: metadata.title,
      description: metadata.description,
      url: metadata.siteUrl,
      siteName: metadata.title,
      images: [
        {
          url: `${metadata.siteUrl}/favicon.svg`,
          width: 800,
          height: 600,
          alt: metadata.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      images: [`${metadata.siteUrl}/favicon.svg`],
    },
  };
}

export default function Home() {
  const organizationSchema = getOrganizationSchema();
  const websiteSchema = getWebSiteSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema).replace(/</g, '\\u003c') }}
      />

      <Navbar />

      <main className="flex-1 bg-background text-foreground relative">
        <HeroFrameBackground />
        <Hero />
        <Advantage />
        <ProductListShowcase />
        <Services />
        <Workflow /> <PortfolioShowcase />
        <CTA />
      </main>

      <Footer />
    </>
  );
}
