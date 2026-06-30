import metadata from '@/data/en/metadata.json';

const siteMetadata = metadata.siteMetadata;

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteMetadata.siteUrl}/#organization`,
    'name': siteMetadata.title,
    'url': siteMetadata.siteUrl,
    'logo': `${siteMetadata.siteUrl}/favicon.svg`,
    'sameAs': [
      // Add social URLs if any
    ],
    'contactPoint': [
      {
        '@type': 'ContactPoint',
        'telephone': siteMetadata.phone,
        'contactType': 'sales',
        'email': siteMetadata.email,
        'areaServed': 'ID',
        'availableLanguage': ['en', 'id'],
      },
    ],
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteMetadata.siteUrl}/#website`,
    'name': siteMetadata.title,
    'url': siteMetadata.siteUrl,
    'description': siteMetadata.description,
    'publisher': {
      '@id': `${siteMetadata.siteUrl}/#organization`,
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': `${siteMetadata.siteUrl}${item.item}`,
    })),
  };
}

export function getServiceSchema(serviceName: string, description: string, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'serviceType': 'Creative Technology & Digital Solutions',
    'provider': {
      '@type': 'Organization',
      '@id': `${siteMetadata.siteUrl}/#organization`,
      'name': siteMetadata.title,
    },
    'name': serviceName,
    'description': description,
    'url': `${siteMetadata.siteUrl}/our-services/${slug}`,
  };
}
