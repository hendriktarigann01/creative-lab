import { MetadataRoute } from 'next';
import metadata from '@/data/en/metadata.json';

const siteMetadata = metadata.siteMetadata;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/'],
    },
    sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
  };
}
