import { MetadataRoute } from 'next';
import { siteMetadata } from '../data/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/our-services',
    '/our-services/enterprise-b2g-solutions',
    '/our-services/gamification-games',
    '/our-services/interactive-experiences',
    '/our-services/digital-strategy',
  ];

  return routes.map((route) => ({
    url: `${siteMetadata.siteUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
