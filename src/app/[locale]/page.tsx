import type { Metadata } from 'next';
import { getOrganizationSchema, getWebSiteSchema } from '@/lib/structured-data';

// Layout components
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

// Section components
import { Hero } from '@/components/sections/Hero';
import { Advantage } from '@/components/sections/Advantage';
import { Services } from '@/components/sections/Services';
import { Workflow } from '@/components/sections/Workflow';
import { Portfolio } from '@/components/sections/Portfolio';
import { Contact } from '@/components/sections/Contact';
import { CTA } from '@/components/sections/CTA';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
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
      {/* Structured Data injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema).replace(/</g, '\\u003c') }}
      />

      {/* Global Header */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-1 bg-background text-foreground">
        <Hero />
        <Advantage />
        <Services />
        <Workflow />
        <Portfolio />
        <CTA />
        <Contact />
      </main>

      {/* Global Footer */}
      <Footer />
    </>
  );
}
