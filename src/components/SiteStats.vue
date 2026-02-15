<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useSiteStats } from '../composables/useSiteStats'

const { runtime } = useSiteStats()
</script>

<template>
  <div class="stats-card">
    <div id="busuanzi_container_site_pv" class="stats-item">
      <Icon icon="mdi:eye" class="stats-icon" />
      <span class="stats-label">全站访问量</span>
      <span id="busuanzi_site_pv" class="stats-value">--</span>
    </div>
    <div class="stats-item">
      <Icon icon="mdi:clock-outline" class="stats-icon" />
      <span class="stats-label">已稳定运行</span>
      <span class="stats-value">{{ runtime }}</span>
    </div>
  </div>
</template>

<style scoped>
.stats-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
}

:global([data-theme="light"]) .stats-card,
:global([data-theme="warm"]) .stats-card {
  background: var(--card-background);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.stats-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.8125rem;
}

.stats-icon {
  color: var(--primary-color);
  font-size: 1.125rem;
}

.stats-label {
  color: var(--text-color);
  opacity: 0.7;
  flex-shrink: 0;
}

.stats-value {
  color: var(--text-color);
  font-weight: 600;
  font-family: 'JetBrains Mono', monospace;
  white-space: nowrap;
  font-size: 0.75rem;
}
</style>
