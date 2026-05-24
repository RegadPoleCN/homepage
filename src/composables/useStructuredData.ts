import { siteConfig } from '@/config/site.config';
import type { SiteConfig } from '@/config/site.config';

export function generatePersonStructuredData(config: SiteConfig = siteConfig): string {
  const { profile } = config;
  const socialUrls = profile.socialLinks
    .filter((link) => !link.url.startsWith('mailto:'))
    .map((link) => link.url);
  const description = Array.isArray(profile.description)
    ? profile.description.join(' ')
    : profile.description;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    image: profile.avatar,
    url: typeof window !== 'undefined' ? window.location.origin : '',
    sameAs: socialUrls.length > 0 ? socialUrls : undefined,
    description: description || profile.bio,
  };
  return JSON.stringify(jsonLd);
}

export function generateWebsiteStructuredData(config: SiteConfig = siteConfig): string {
  const { profile, site } = config;
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : site.domain;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.title.replace(/{name}/g, profile.name),
    url: baseUrl,
    description: Array.isArray(profile.description)
      ? profile.description.join(' ')
      : profile.description || profile.bio,
    publisher: {
      '@type': 'Person',
      name: profile.name,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
  return JSON.stringify(jsonLd);
}

export function generateBreadcrumbStructuredData(config: SiteConfig = siteConfig): string {
  const { profile, site } = config;
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : site.domain;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '首页',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: profile.name,
        item: `${baseUrl}#about`,
      },
    ],
  };
  return JSON.stringify(jsonLd);
}

export function generateAllStructuredData(config: SiteConfig = siteConfig): string[] {
  return [
    generatePersonStructuredData(config),
    generateWebsiteStructuredData(config),
    generateBreadcrumbStructuredData(config),
  ];
}
