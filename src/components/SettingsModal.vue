<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useTheme } from '../composables/useTheme'

defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const { themes, currentThemeKey, customBackgroundUrl, isCustomTheme, setTheme, setCustomBackground } = useTheme()

const handleThemeSelect = (themeKey: string) => {
  setTheme(themeKey)
}

const handleBackgroundUrlChange = (e: Event) => {
  const url = (e.target as HTMLInputElement).value
  setCustomBackground(url)
}

const handleOverlayClick = (e: MouseEvent) => {
  if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
    emit('close')
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="modal-overlay" @click="handleOverlayClick">
        <div class="modal-content">
          <div class="modal-header">
            <h2>
              <Icon icon="mdi:cog" class="header-icon" />
              设置
            </h2>
            <button class="close-btn" @click="emit('close')">
              <Icon icon="mdi:close" />
            </button>
          </div>
          <div class="modal-body">
            <div class="settings-section">
              <h3>
                <Icon icon="mdi:palette" />
                主题色调
              </h3>
              <div class="theme-grid">
                <button
                  v-for="theme in themes"
                  :key="theme.key"
                  class="theme-option"
                  :class="{ active: currentThemeKey === theme.key }"
                  @click="handleThemeSelect(theme.key)"
                  :title="theme.name"
                >
                  <div
                    class="theme-preview"
                    :style="{
                      background: `linear-gradient(135deg, ${theme.backgroundColor} 0%, ${theme.cardBackground} 50%, ${theme.primaryColor} 100%)`
                    }"
                  >
                    <Icon v-if="theme.key === 'custom'" icon="mdi:image-edit-outline" class="custom-theme-icon" />
                    <Icon v-if="currentThemeKey === theme.key" icon="mdi:check" class="check-icon" />
                  </div>
                </button>
              </div>
              <div v-if="isCustomTheme" class="custom-bg-input">
                <input
                  type="text"
                  :value="customBackgroundUrl"
                  @input="handleBackgroundUrlChange"
                  placeholder="输入背景图片链接"
                  class="bg-url-input"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 1000;
}

.modal-content {
  background: var(--card-background);
  border-radius: 20px;
  width: 90%;
  max-width: 480px;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(var(--backdrop-blur, 0px));
  -webkit-backdrop-filter: blur(var(--backdrop-blur, 0px));
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(128, 128, 128, 0.15);
}

.modal-header h2 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
}

.header-icon {
  color: var(--primary-color);
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 10px;
  background: rgba(128, 128, 128, 0.1);
  color: var(--text-color);
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: rgba(128, 128, 128, 0.2);
}

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  max-height: calc(80vh - 70px);
}

.settings-section h3 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-color);
  opacity: 0.8;
}

.theme-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.theme-option {
  display: flex;
  align-items: center;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
}

.theme-preview {
  position: relative;
  width: 42px;
  height: 42px;
  border-radius: 10px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid transparent;
}

.theme-option:hover .theme-preview {
  transform: scale(1.05);
}

.theme-option.active .theme-preview {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px var(--primary-color);
}

.check-icon {
  font-size: 1.25rem;
  color: white;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  position: absolute;
}

.custom-theme-icon {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
}

.custom-bg-input {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(128, 128, 128, 0.15);
}

.bg-url-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid rgba(128, 128, 128, 0.2);
  border-radius: 10px;
  background: rgba(128, 128, 128, 0.05);
  color: var(--text-color);
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.bg-url-input:focus {
  outline: none;
  border-color: var(--primary-color);
  background: rgba(128, 128, 128, 0.08);
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.9);
  opacity: 0;
}
</style>
