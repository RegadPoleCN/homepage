import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { useStorage } from '@vueuse/core'
import { siteConfig } from '../config/site.config'

const THEME_STORAGE_KEY = 'homepage-theme'
const CUSTOM_BG_STORAGE_KEY = 'homepage-custom-bg'

export const useThemeStore = defineStore('theme', () => {
  const currentThemeKey = useStorage<string>(THEME_STORAGE_KEY, 'dark')
  const customBackgroundUrl = useStorage<string>(CUSTOM_BG_STORAGE_KEY, '')

  const themes = computed(() => siteConfig.themes)
  
  const currentTheme = computed(() => {
    return themes.value.find(t => t.key === currentThemeKey.value) || themes.value[0]
  })

  const isCustomTheme = computed(() => currentThemeKey.value === 'custom')

  const applyCustomBackground = (url: string) => {
    const root = document.documentElement
    if (url) {
      root.style.setProperty('--custom-background-image', `url(${url})`)
      root.setAttribute('data-custom-bg', 'true')
    } else {
      root.style.removeProperty('--custom-background-image')
      root.removeAttribute('data-custom-bg')
    }
  }

  const applyTheme = (themeKey: string) => {
    const theme = themes.value.find(t => t.key === themeKey)
    if (!theme) return

    const root = document.documentElement
    root.style.setProperty('--left-bg', theme.leftBg)
    root.style.setProperty('--center-bg', theme.centerBg)
    root.style.setProperty('--right-bg', theme.rightBg)
    root.style.setProperty('--primary-color', theme.primaryColor)
    root.style.setProperty('--background-color', theme.backgroundColor)
    root.style.setProperty('--text-color', theme.textColor)
    root.style.setProperty('--card-background', theme.cardBackground)
    root.style.setProperty('--accent-color', theme.accentColor)
    root.setAttribute('data-theme', themeKey)

    if (theme.customBackground) {
      applyCustomBackground(customBackgroundUrl.value)
      root.style.setProperty('--backdrop-blur', '8px')
    } else {
      root.style.removeProperty('--custom-background-image')
      root.removeAttribute('data-custom-bg')
      root.style.setProperty('--backdrop-blur', '0px')
    }
  }

  const setTheme = (themeKey: string) => {
    currentThemeKey.value = themeKey
  }

  const setCustomBackground = (url: string) => {
    customBackgroundUrl.value = url
  }

  const initTheme = () => {
    applyTheme(currentThemeKey.value)
  }

  watch(currentThemeKey, (newKey) => {
    applyTheme(newKey)
  })

  watch(customBackgroundUrl, (newUrl) => {
    if (currentThemeKey.value === 'custom') {
      applyCustomBackground(newUrl)
    }
  })

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
})
