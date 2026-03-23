/**
 * 图标工具函数
 * 自动识别图标来源是图片链接还是图标库
 */

/**
 * 图标配置接口（与 site.config.ts 中的 IconConfig 保持一致）
 */
export interface IconConfig {
  /** 图标来源：可以是图片 URL 或 Iconify 图标（如 'mdi:github'） */
  src: string;
}

/**
 * 判断是否为有效的 URL
 */
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * 判断是否为图片链接（支持常见图片格式）
 */
export function isImageIcon(icon: string): boolean {
  if (!isValidUrl(icon)) {
    return false;
  }

  // const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico'];
  const httpsIconPrefix = ['http://', 'https://'];
  const lowerCaseIcon = icon.toLowerCase();

  // return imageExtensions.some((ext) => lowerCaseIcon.endsWith(ext));
  return httpsIconPrefix.some((prefix) => lowerCaseIcon.startsWith(prefix));
}

/**
 * 判断是否为 Iconify 图标库格式（如：mdi:github, logos:vue）
 */
export function isIconifyIcon(icon: string): boolean {
  // Iconify 格式：prefix:name，如 mdi:github
  const iconifyPattern = /^[a-z0-9-]+:[a-z0-9-]+$/i;
  return iconifyPattern.test(icon);
}

/**
 * 获取图标类型
 * @returns 'image' | 'iconify' | 'unknown'
 */
export type IconType = 'image' | 'iconify' | 'unknown';

export function getIconType(icon: string): IconType {
  if (isImageIcon(icon)) {
    return 'image';
  }

  if (isIconifyIcon(icon)) {
    return 'iconify';
  }

  return 'unknown';
}

/**
 * 渲染图标的组件 props
 */
export interface IconProps {
  icon: string;
  class?: string;
  size?: string | number;
}

/**
 * 验证图标是否有效
 */
export function validateIcon(icon: string): boolean {
  const type = getIconType(icon);
  return type !== 'unknown';
}
