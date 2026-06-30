import { MetadataRoute } from 'next';
import metadata from '@/data/en/metadata.json';

const siteMetadata = metadata.siteMetadata;

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteMetadata.title,
    short_name: 'Creative LAB',
    description: siteMetadata.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#060608',
    theme_color: '#540EE1',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
