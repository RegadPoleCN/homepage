import { computed } from 'vue';
import { siteConfig } from '../config/site.config';

export function useStructuredData() {
  const structuredData = computed(() => {
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

  return {
    structuredData,
  };
}
