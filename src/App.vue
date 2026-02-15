<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useWindowScroll } from '@vueuse/core'
import LeftSidebar from './components/LeftSidebar.vue'
import CenterPanel from './components/CenterPanel.vue'
import RightPanel from './components/RightPanel.vue'
import Footer from './components/Footer.vue'
import SettingsModal from './components/SettingsModal.vue'
import { useThemeStore } from './stores/theme'
import { useScrollToTop } from './composables/useScrollToTop'

const themeStore = useThemeStore()
const { y } = useWindowScroll()
const { isLaunching, scrollToTop } = useScrollToTop()

const showSettings = ref(false)
const showBackToTop = computed(() => y.value > 500)

onMounted(() => {
  themeStore.initTheme()
})
</script>

<template>
  <div class="app-container">
    <!-- Fixed Settings Button at root level -->
    <button class="settings-btn" @click="showSettings = true" title="设置">
      <Icon icon="mdi:cog" />
    </button>

    <main class="main-layout">
      <aside class="left-column">
        <LeftSidebar />
      </aside>
      <div class="center-column">
        <CenterPanel />
        <Footer class="desktop-footer" />
      </div>
      <aside class="right-column">
        <RightPanel />
      </aside>
    </main>

    <Footer class="mobile-footer" />

    <!-- Back to Top Button with internal animation -->
    <button 
      class="back-to-top-btn" 
      :class="{ 'visible': showBackToTop, 'launching': isLaunching }"
      @click="scrollToTop" 
      title="回到顶部"
    >
      <div class="rocket-wrapper">
        <Icon icon="mdi:rocket-launch" class="rocket-icon" />
      </div>
    </button>

    <SettingsModal :visible="showSettings" @close="showSettings = false" />
  </div>
</template>

<style scoped>
.app-container {
  height: 100vh;
  overflow: hidden;
}

.settings-btn {
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 12px;
  background: var(--card-background);
  color: var(--text-color);
  font-size: 1.4rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.settings-btn:hover {
  transform: rotate(90deg) scale(1.1);
  background: var(--primary-color);
  color: white;
  box-shadow: 0 0 20px var(--primary-color);
}

.back-to-top-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 56px;
  height: 56px;
  border: none;
  border-radius: 16px;
  background: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  transform: scale(0);
  opacity: 0;
  z-index: 900;
  overflow: hidden;
}

.rocket-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.rocket-icon {
  font-size: 1.8rem;
}

.back-to-top-btn.visible {
  transform: scale(1);
  opacity: 1;
}

.back-to-top-btn.launching .rocket-wrapper {
  animation: rocket-launch 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes rocket-launch {
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  30% {
    transform: translateY(10px) scale(1.1);
  }
  100% {
    transform: translateY(-80px) scale(0.8);
    opacity: 0;
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }
  50% {
    box-shadow: 0 8px 32px var(--primary-color);
    transform: scale(1.05);
  }
  100% {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }
}

.back-to-top-btn.visible:not(.launching) {
  animation: pulse 3s infinite;
}

.back-to-top-btn:hover {
  transform: scale(1.1) translateY(-5px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
  background: var(--accent-color);
}

.back-to-top-btn:active {
  transform: scale(0.95);
}

.main-layout {
  display: grid;
  grid-template-columns: 260px 380px 1fr;
  height: 100vh;
}

.left-column {
  background: var(--left-bg);
  padding: 1.5rem 1rem;
  height: 100vh;
  overflow-y: auto;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 1;
  backdrop-filter: blur(var(--backdrop-blur, 0px));
  -webkit-backdrop-filter: blur(var(--backdrop-blur, 0px));
}

.center-column {
  background: var(--center-bg);
  padding: 1.5rem 1.5rem 0.75rem;
  height: 100vh;
  overflow-y: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(var(--backdrop-blur, 0px));
  -webkit-backdrop-filter: blur(var(--backdrop-blur, 0px));
}

.right-column {
  background: var(--right-bg);
  padding: 1.5rem 1rem;
  height: 100vh;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 1;
  overflow-y: auto;
  backdrop-filter: blur(var(--backdrop-blur, 0px));
  -webkit-backdrop-filter: blur(var(--backdrop-blur, 0px));
}

.desktop-footer {
  margin-top: auto;
  flex-shrink: 0;
  padding: 0.5rem 0 1rem;
}

.mobile-footer {
  display: none;
}

@media (max-width: 1024px) {
  .app-container {
    height: auto;
    overflow-x: hidden;
  }

  .settings-btn {
    top: 1rem;
    right: 1rem;
    width: 44px;
    height: 44px;
    font-size: 1.2rem;
    z-index: 1000;
  }

  .main-layout {
    grid-template-columns: 1fr;
    height: auto;
  }

  .left-column,
  .center-column,
  .right-column {
    height: auto;
    overflow-y: visible;
    overflow-x: hidden;
    box-shadow: none;
  }

  .center-column {
    order: 1;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .right-column {
    order: 2;
  }

  .left-column {
    order: 3;
  }

  .desktop-footer {
    display: none;
  }

  .mobile-footer {
    display: block;
    background: var(--card-background);
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
  .settings-btn {
    top: 0.75rem;
    right: 0.75rem;
    width: 40px;
    height: 40px;
  }

  .back-to-top-btn {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 48px;
    height: 48px;
  }
  
  .rocket-icon {
    font-size: 1.5rem;
  }

  .left-column,
  .center-column,
  .right-column {
    padding: 1.5rem 1rem;
  }
}

/* Hide back to top on desktop */
@media (min-width: 1025px) {
  .back-to-top-btn {
    display: none;
  }
}
</style>
