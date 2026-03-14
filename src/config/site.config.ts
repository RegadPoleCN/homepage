/**
 * 图标配置接口
 * 支持自动识别图片链接或 Iconify 图标库
 */
export interface IconConfig {
  /** 图标来源：可以是图片 URL 或 Iconify 图标（如 'mdi:github'） */
  src: string;
}

export interface SocialLink {
  key: string;
  /** 支持字符串（向后兼容）或 IconConfig 对象 */
  icon: string | IconConfig;
  title: string;
  url: string;
  target?: string;
}

export interface Activity {
  /** 支持字符串（向后兼容）或 IconConfig 对象 */
  icon: string | IconConfig;
  title: string;
  /** 
   * 时间配置：智能识别类型
   * - 数字：视为时间戳（毫秒），自动计算相对时间
   * - ISO 日期字符串：自动计算相对时间
   * - 其他字符串：作为自定义文本直接显示
   * @example 1702800000000 (时间戳)
   * @example "2024-12-10T10:00:00Z" (ISO 日期)
   * @example "上周" (自定义文本)
   */
  time?: string | number;
}

export interface Skill {
  /** 支持字符串（向后兼容）或 IconConfig 对象 */
  icon: string | IconConfig;
  name: string;
}

export interface Project {
  /** 支持字符串（向后兼容）或 IconConfig 对象 */
  icon: string | IconConfig;
  name: string;
  description: string;
  url: string;
}

export interface ActivitySection {
  type: 'activities';
  enabled: boolean;
  title: string;
  /** 支持字符串（向后兼容）或 IconConfig 对象 */
  icon: string | IconConfig;
  items: Activity[];
}

export interface SkillSection {
  type: 'skills';
  enabled: boolean;
  title: string;
  /** 支持字符串（向后兼容）或 IconConfig 对象 */
  icon: string | IconConfig;
  items: Skill[];
}

export interface ProjectSection {
  type: 'projects';
  enabled: boolean;
  title: string;
  /** 支持字符串（向后兼容）或 IconConfig 对象 */
  icon: string | IconConfig;
  items: Project[];
}

export interface FriendLink {
  name: string;
  url: string;
  avatar?: string;
  description?: string;
}

export interface PersonalWebsiteItem {
  /** 网站名称 */
  name: string;
  /** 网站 URL */
  url: string;
  /** 网站图标（支持图片链接或 Iconify 图标） */
  icon: string | IconConfig;
  /** 描述（可选） */
  description?: string;
}

export interface PersonalWebsiteSection {
  type: 'personalWebsites';
  enabled: boolean;
  title: string;
  /** 支持字符串（向后兼容）或 IconConfig 对象 */
  icon: string | IconConfig;
  items: PersonalWebsiteItem[];
}

export interface UptimeKumaSection {
  type: 'uptimeKuma';
  enabled: boolean;
  title: string;
  /** 支持字符串（向后兼容）或 IconConfig 对象 */
  icon: string | IconConfig;
  /** Uptime Kuma 状态页 URL */
  url: string;
  /** Uptime Kuma 状态页 slug */
  slug: string;
}

export type RightPanelSection =
  | ActivitySection
  | SkillSection
  | ProjectSection
  | PersonalWebsiteSection
  | UptimeKumaSection;

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
    /** 是否启用卡片顺序配置 */
    enableOrderConfig?: boolean;
    sections: RightPanelSection[];
  };
}

import siteConfigJson from './site.config.json';

export const siteConfig: SiteConfig = siteConfigJson as SiteConfig;
