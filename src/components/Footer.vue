<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { siteConfig } from '../config/site.config'
import SiteStats from './SiteStats.vue'

const footer = siteConfig.footer

const currentYear = new Date().getFullYear()
const yearRange = computed(() => {
  if (footer.startYear === currentYear) {
    return String(currentYear)
  }
  return `${footer.startYear} - ${currentYear}`
})
</script>

<template>
  <footer class="site-footer">
    <div class="footer-content">
      <SiteStats class="mobile-stats" />
      <div class="beian-info">
        <a
          v-if="footer.icpBeian"
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
          class="beian-link"
        >
          <Icon icon="mdi:shield-check" />
          {{ footer.icpBeian }}
        </a>
        <a
          v-if="footer.gonganBeian"
          :href="`http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=${footer.gonganBeianCode}`"
          target="_blank"
          rel="noopener noreferrer"
          class="beian-link"
        >
          <Icon icon="mdi:police-badge" />
          {{ footer.gonganBeian }}
        </a>
      </div>
      <div class="copyright">
        <Icon icon="mdi:copyright" />
        <span>{{ yearRange }} {{ footer.copyright }}. All Rights Reserved.</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  padding: 0.5rem 0;
  border-top: 1px solid rgba(128, 128, 128, 0.15);
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.mobile-stats {
  display: none;
  margin-bottom: 0.5rem;
}

@media (max-width: 1024px) {
  .mobile-stats {
    display: flex;
  }
}

.beian-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.beian-link {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: var(--text-color);
  opacity: 0.6;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.beian-link:hover {
  opacity: 1;
}

.copyright {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: var(--text-color);
  opacity: 0.5;
}
</style>
