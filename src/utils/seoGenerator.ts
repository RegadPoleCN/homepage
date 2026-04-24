import type { SiteConfig, Skill, SkillSection } from '../config/site.config';

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
}

const STOP_WORDS = new Set([
  'the',
  'a',
  'an',
  'and',
  'or',
  'but',
  'in',
  'on',
  'at',
  'to',
  'for',
  'of',
  'with',
  'by',
  'from',
  'is',
  'are',
  'was',
  'were',
  'be',
  'been',
  'being',
  'that',
  'this',
  'it',
  'as',
  'an',
  '的',
  '是',
  '在',
  '了',
  '和',
  '与',
  '及',
  '或',
  '等',
  '个',
  '们',
  '中',
  '上',
  '下',
  '为',
  '有',
  '对',
  '从',
  '到',
  '以',
]);

function replaceTemplate(template: string, profile: SiteConfig['profile']): string {
  return template
    .replace(/{name}/g, profile.name)
    .replace(/{bio}/g, profile.bio)
    .replace(/{occupation}/g, profile.occupation || '');
}

function cleanText(text: string): string {
  return text
    .replace(/\s+/g, ' ')
    .replace(/\s*,\s*/g, ',')
    .replace(/,\s*,/g, ',')
    .replace(/\s*\.\s*/g, '.')
    .replace(/\.{2,}/g, '.')
    .trim();
}

function smartTruncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }

  const truncated = text.slice(0, maxLength);
  const lastSentenceEnd = Math.max(
    truncated.lastIndexOf('.'),
    truncated.lastIndexOf('。'),
    truncated.lastIndexOf('!'),
    truncated.lastIndexOf('！'),
    truncated.lastIndexOf('?'),
    truncated.lastIndexOf('?')
  );

  if (lastSentenceEnd > maxLength * 0.7) {
    return truncated.slice(0, lastSentenceEnd + 1).trim();
  }

  const lastWordBreak = truncated.lastIndexOf(' ');
  if (lastWordBreak > maxLength * 0.7) {
    return truncated.slice(0, lastWordBreak).trim();
  }

  return truncated.trim() + '...';
}

export function generateTitle(config: SiteConfig): string {
  const template = config.site.title || '{name} - 个人主页';
  return replaceTemplate(template, config.profile);
}

export function generateDescription(config: SiteConfig): string {
  const { profile, rightPanel } = config;
  const parts: string[] = [];

  if (profile.bio) {
    parts.push(profile.bio);
  }

  if (profile.description) {
    if (Array.isArray(profile.description)) {
      parts.push(...profile.description);
    } else {
      parts.push(profile.description);
    }
  }

  let description = parts.join(' ');

  if (description.length < 150 && rightPanel?.sections) {
    const skillsSection = rightPanel.sections.find(
      (section): section is SkillSection => section.type === 'skills' && section.enabled
    );
    if (skillsSection && skillsSection.items.length > 0) {
      const skillNames = skillsSection.items.map((skill: Skill) => skill.name);
      const skillsText = `擅长 ${skillNames.join('、')}`;
      if (description.length + skillsText.length <= 160) {
        description += ` ${skillsText}`;
      }
    }
  }

  description = cleanText(description);

  description = smartTruncate(description, 160);

  if (description.length < 150) {
    return description;
  }

  return description;
}

export function generateKeywords(config: SiteConfig): string {
  const { profile, rightPanel } = config;
  const keywords = new Set<string>();

  if (profile.keywords) {
    profile.keywords.forEach((keyword) => {
      const cleaned = keyword.trim().toLowerCase();
      if (cleaned && !STOP_WORDS.has(cleaned)) {
        keywords.add(cleaned);
      }
    });
  }

  if (profile.name) {
    const nameWords = profile.name.split(/[\s,，,./]+/);
    nameWords.forEach((word) => {
      const cleaned = word.trim().toLowerCase();
      if (cleaned && !STOP_WORDS.has(cleaned) && cleaned.length > 1) {
        keywords.add(cleaned);
      }
    });
  }

  if (profile.occupation) {
    const occupationWords = profile.occupation.split(/[\s,，,./、]+/);
    occupationWords.forEach((word) => {
      const cleaned = word.trim().toLowerCase();
      if (cleaned && !STOP_WORDS.has(cleaned) && cleaned.length > 1) {
        keywords.add(cleaned);
      }
    });
  }

  if (rightPanel?.sections) {
    const skillsSection = rightPanel.sections.find(
      (section): section is SkillSection => section.type === 'skills' && section.enabled
    );
    if (skillsSection) {
      skillsSection.items.forEach((skill: Skill) => {
        const cleaned = skill.name?.trim().toLowerCase();
        if (cleaned && !STOP_WORDS.has(cleaned)) {
          keywords.add(cleaned);
        }
      });
    }
  }

  const keywordsArray = Array.from(keywords);

  const maxKeywords = Math.min(keywordsArray.length, 15);

  const selectedKeywords = keywordsArray.slice(0, maxKeywords);

  return selectedKeywords.join(', ');
}

export function generateSEO(config: SiteConfig): SEOData {
  return {
    title: generateTitle(config),
    description: generateDescription(config),
    keywords: generateKeywords(config),
  };
}

export function getCanonicalUrl(config: SiteConfig): string {
  return config.site.domain;
}

export function getOgImage(config: SiteConfig): string {
  if (config.seo?.ogImage) {
    return config.seo.ogImage;
  }
  return config.profile.avatar;
}

export function getTwitterImage(config: SiteConfig): string {
  if (config.seo?.twitterImage) {
    return config.seo.twitterImage;
  }
  return getOgImage(config);
}
