import { computed } from 'vue';
import { siteConfig } from '../config/site.config';

export function useStructuredData() {
  const personStructuredData = computed(() => {
    const { profile } = siteConfig;

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
  });

  const websiteStructuredData = computed(() => {
    const { profile, site } = siteConfig;
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
  });

  const breadcrumbStructuredData = computed(() => {
    const { profile, site } = siteConfig;
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
          item: baseUrl,
        },
      ],
    };

    return JSON.stringify(jsonLd);
  });

  const allStructuredData = computed(() => {
    return [
      personStructuredData.value,
      websiteStructuredData.value,
      breadcrumbStructuredData.value,
    ];
  });

  return {
    structuredData: personStructuredData,
    websiteStructuredData,
    breadcrumbStructuredData,
    allStructuredData,
  };
}
