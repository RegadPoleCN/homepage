import { storeToRefs } from 'pinia'
import { useThemeStore } from '../stores/theme'

export function useTheme() {
  const themeStore = useThemeStore()
  const { themes, currentTheme, currentThemeKey, customBackgroundUrl, isCustomTheme } = storeToRefs(themeStore)
  const { setTheme, setCustomBackground, initTheme } = themeStore

  return {
    themes,
    currentTheme,
    currentThemeKey,
    customBackgroundUrl,
    isCustomTheme,
    setTheme,
    setCustomBackground,
    initTheme,
  }
}
