<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import { siteConfig } from '@/config/site.config';
import SiteStats from '@/components/SiteStats.vue';

const scrollToSection = (className: string) => {
  const element = document.querySelector(`.${className}`);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const footer = siteConfig.footer;

const currentYear = new Date().getFullYear();
const yearRange = computed(() => {
  if (footer.startYear === currentYear) {
    return String(currentYear);
  }
  return `${footer.startYear} - ${currentYear}`;
});
</script>

<template>
  <footer class="site-footer" role="contentinfo">
    <div class="footer-content">
      <SiteStats class="mobile-stats" />
      <nav class="mobile-nav" aria-label="快速导航">
        <a href="#" class="mobile-nav-link" @click.prevent="scrollToSection('center-column')">
          <Icon icon="mdi:account" aria-hidden="true" />
          <span>个人资料</span>
        </a>
        <a
          v-if="footer.icpBeian"
          href="#"
          class="mobile-nav-link"
          @click.prevent="scrollToSection('right-column')"
        >
          <Icon icon="mdi:information" aria-hidden="true" />
          <span>备案信息</span>
        </a>
      </nav>
      <div class="beian-info">
        <a
          v-if="footer.icpBeian"
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
          class="beian-link"
          :aria-label="`ICP备案号：${footer.icpBeian}`"
        >
          <Icon icon="mdi:shield-check" aria-hidden="true" />
          {{ footer.icpBeian }}
        </a>
        <a
          v-if="footer.gonganBeian"
          :href="`http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=${footer.gonganBeianCode}`"
          target="_blank"
          rel="noopener noreferrer"
          class="beian-link"
          :aria-label="`公安备案号：${footer.gonganBeian}`"
        >
          <Icon icon="mdi:police-badge" aria-hidden="true" />
          {{ footer.gonganBeian }}
        </a>
      </div>
      <div class="copyright">
        <Icon icon="mdi:copyright" aria-hidden="true" />
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

.mobile-nav {
  display: none;
  justify-content: center;
  gap: 1.5rem;
  padding: 0.5rem 0;
}

@media (max-width: 1024px) {
  .mobile-nav {
    display: flex;
  }
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8125rem;
  color: var(--text-color);
  opacity: 0.7;
  text-decoration: none;
  padding: 0.5rem;
  min-height: 44px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.mobile-nav-link:hover {
  opacity: 1;
  background: rgba(128, 128, 128, 0.1);
}
</style>
