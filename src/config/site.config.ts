export interface FriendLink {
  name: string
  url: string
  avatar?: string
  description?: string
}

export interface ThemePreset {
  name: string
  key: string
  leftBg: string
  centerBg: string
  rightBg: string
  primaryColor: string
  backgroundColor: string
  textColor: string
  cardBackground: string
  accentColor: string
  customBackground?: boolean
}

export interface SiteConfig {
  profile: {
    name: string
    avatar: string
    bio: string
    description: string
    socialLinks: {
      github?: string
      twitter?: string
      email?: string
      weibo?: string
      zhihu?: string
    }
  }
  friendLinks: FriendLink[]
  footer: {
    icpBeian: string
    gonganBeian: string
    gonganBeianCode: string
    copyright: string
    startYear: number
  }
  themes: ThemePreset[]
}

import siteConfigJson from './site.config.json'

export const siteConfig: SiteConfig = siteConfigJson as SiteConfig
