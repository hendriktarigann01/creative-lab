import type { Metadata } from 'next';
import Script from 'next/script';
import { siteMetadata } from '@/data/metadata';
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

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  alternates: {
    canonical: siteMetadata.siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [
      {
        url: `${siteMetadata.siteUrl}/favicon.svg`,
        width: 800,
        height: 600,
        alt: siteMetadata.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [`${siteMetadata.siteUrl}/favicon.svg`],
  },
};

export default function Home() {
  const organizationSchema = getOrganizationSchema();
  const websiteSchema = getWebSiteSchema();

  return (
    <>
      {/* Structured Data injection */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
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
