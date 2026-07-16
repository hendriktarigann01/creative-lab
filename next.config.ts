import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/600x400',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/portfolio/:slug',
        destination: '/portfolio/:slug/index.html',
      },
    ];
  },
};

export default withNextIntl(nextConfig);
