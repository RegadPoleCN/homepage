export interface SocialLink {
  key: string;
  icon: string;
  title: string;
  url: string;
  target?: string;
}

export interface Activity {
  icon: string;
  title: string;
  time: string;
}

export interface Skill {
  icon: string;
  name: string;
}

export interface Project {
  icon: string;
  name: string;
  description: string;
  url: string;
}

export interface ActivitySection {
  type: 'activities';
  enabled: boolean;
  title: string;
  icon: string;
  items: Activity[];
}

export interface SkillSection {
  type: 'skills';
  enabled: boolean;
  title: string;
  icon: string;
  items: Skill[];
}

export interface ProjectSection {
  type: 'projects';
  enabled: boolean;
  title: string;
  icon: string;
  items: Project[];
}

export type RightPanelSection = ActivitySection | SkillSection | ProjectSection;

export interface FriendLink {
  name: string;
  url: string;
  avatar?: string;
  description?: string;
}

export interface ThemePreset {
  name: string;
  key: string;
  leftBg: string;
  centerBg: string;
  rightBg: string;
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  cardBackground: string;
  accentColor: string;
  customBackground?: boolean;
}

export interface SiteConfig {
  profile: {
    name: string;
    avatar: string;
    bio: string;
    description: string | string[];
    socialLinks: SocialLink[];
  };
  friendLinks: FriendLink[];
  footer: {
    icpBeian: string;
    gonganBeian: string;
    gonganBeianCode: string;
    copyright: string;
    startYear: number;
    siteStartDate: string;
  };
  themes: ThemePreset[];
  rightPanel: {
    sections: RightPanelSection[];
  };
  uptimeKuma?: {
    url: string;
    slug: string;
  };
}

import siteConfigJson from './site.config.json';

export const siteConfig: SiteConfig = siteConfigJson as SiteConfig;
