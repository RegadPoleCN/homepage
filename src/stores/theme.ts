import { defineStore } from 'pinia';
import { computed, watch } from 'vue';
import { useStorage } from '@vueuse/core';
import { siteConfig } from '@/config/site.config';

const THEME_STORAGE_KEY = 'homepage-theme';
const THEME_USER_SET = 'homepage-theme-user-set';
const CUSTOM_BG_STORAGE_KEY = 'homepage-custom-bg';

export const useThemeStore = defineStore('theme', () => {
  const currentThemeKey = useStorage<string>(THEME_STORAGE_KEY, 'dark');
  const customBackgroundUrl = useStorage<string>(CUSTOM_BG_STORAGE_KEY, '');
  const userHasSet = useStorage<boolean>(THEME_USER_SET, false);

  let mediaQueryRef: MediaQueryList | null = null;
  let mediaQueryHandler: ((e: MediaQueryListEvent) => void) | null = null;

  const themes = computed(() => siteConfig.themes);

  const currentTheme = computed(() => {
    return themes.value.find((t) => t.key === currentThemeKey.value) || themes.value[0];
  });

  const isCustomTheme = computed(() => currentThemeKey.value === 'custom');

  const applyCustomBackground = (url: string) => {
    const root = document.documentElement;
    if (url) {
      root.style.setProperty('--custom-background-image', `url(${url})`);
      root.setAttribute('data-custom-bg', 'true');
    } else {
      root.style.removeProperty('--custom-background-image');
      root.removeAttribute('data-custom-bg');
    }
  };

  const applyTheme = (themeKey: string) => {
    const theme = themes.value.find((t) => t.key === themeKey);
    if (!theme) return;

    const root = document.documentElement;
    root.style.setProperty('--left-bg', theme.leftBg);
    root.style.setProperty('--center-bg', theme.centerBg);
    root.style.setProperty('--right-bg', theme.rightBg);
    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--background-color', theme.backgroundColor);
    root.style.setProperty('--text-color', theme.textColor);
    root.style.setProperty('--card-background', theme.cardBackground);
    root.style.setProperty('--accent-color', theme.accentColor);
    root.setAttribute('data-theme', themeKey);

    if (theme.customBackground) {
      applyCustomBackground(customBackgroundUrl.value);
      root.style.setProperty('--backdrop-blur', '8px');
    } else {
      root.style.removeProperty('--custom-background-image');
      root.removeAttribute('data-custom-bg');
      root.style.setProperty('--backdrop-blur', '0px');
    }
  };

  const setTheme = (themeKey: string) => {
    userHasSet.value = true;
    currentThemeKey.value = themeKey;
  };

  const setCustomBackground = (url: string) => {
    customBackgroundUrl.value = url;
  };

  const initTheme = () => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQueryRef = mediaQuery;

    if (!userHasSet.value) {
      const prefersDark = mediaQuery.matches;
      currentThemeKey.value = prefersDark ? 'dark' : 'light';

      mediaQueryHandler = (e: MediaQueryListEvent) => {
        if (!userHasSet.value) {
          currentThemeKey.value = e.matches ? 'dark' : 'light';
        }
      };
      mediaQuery.addEventListener('change', mediaQueryHandler);
    }
    applyTheme(currentThemeKey.value);
  };

  const cleanupMediaListener = () => {
    if (mediaQueryRef && mediaQueryHandler) {
      mediaQueryRef.removeEventListener('change', mediaQueryHandler);
      mediaQueryRef = null;
      mediaQueryHandler = null;
    }
  };

  watch(currentThemeKey, (newKey) => {
    applyTheme(newKey);
  });

  watch(customBackgroundUrl, (newUrl) => {
    if (currentThemeKey.value === 'custom') {
      applyCustomBackground(newUrl);
    }
  });

  return {
    themes,
    currentTheme,
    currentThemeKey,
    customBackgroundUrl,
    isCustomTheme,
    setTheme,
    setCustomBackground,
    initTheme,
    cleanupMediaListener,
  };
});
