<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { siteConfig } from '../config/site.config'
import SiteStats from './SiteStats.vue'

const profile = siteConfig.profile

const socialLinks = computed(() => {
  const links = [
    { key: 'github', icon: 'mdi:github', title: 'GitHub', url: profile.socialLinks.github },
    { key: 'twitter', icon: 'mdi:twitter', title: 'Twitter', url: profile.socialLinks.twitter },
    { key: 'email', icon: 'mdi:email', title: 'Email', url: profile.socialLinks.email ? `mailto:${profile.socialLinks.email}` : '' },
    { key: 'weibo', icon: 'mdi:sina-weibo', title: '微博', url: profile.socialLinks.weibo },
    { key: 'zhihu', icon: 'simple-icons:zhihu', title: '知乎', url: profile.socialLinks.zhihu },
  ]
  return links.filter(link => link.url)
})
</script>

<template>
  <section class="center-panel">
    <div class="profile-card">
      <div class="avatar-wrapper">
        <img :src="profile.avatar" :alt="profile.name" class="avatar" />
      </div>
      <h1 class="name">{{ profile.name }}</h1>
      <p class="bio">{{ profile.bio }}</p>
      <div class="social-links">
        <a
          v-for="link in socialLinks"
          :key="link.key"
          :href="link.url"
          :target="link.key === 'email' ? '_self' : '_blank'"
          rel="noopener noreferrer"
          class="social-link"
          :title="link.title"
        >
          <Icon :icon="link.icon" />
        </a>
      </div>
    </div>
    <div class="description-card">
      <h2>
        <Icon icon="mdi:account-details" class="section-icon" />
        关于我
      </h2>
      <div class="description">
        <template v-if="Array.isArray(profile.description)">
          <p v-for="(line, index) in profile.description" :key="index" class="description-line">
            {{ line }}
          </p>
        </template>
        <template v-else>
          {{ profile.description }}
        </template>
      </div>
    </div>

    <SiteStats class="desktop-stats" />
  </section>
</template>

<style scoped>
.center-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  min-height: 0;
}

.profile-card {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 1.25rem;
  text-align: center;
}

:global([data-theme="light"]) .profile-card,
:global([data-theme="warm"]) .profile-card {
  background: var(--card-background);
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.1),
    0 12px 32px rgba(0, 0, 0, 0.12),
    0 24px 64px rgba(0, 0, 0, 0.1);
  border: 1.5px solid rgba(0, 0, 0, 0.12);
}

.avatar-wrapper {
  margin-bottom: 0.75rem;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--primary-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.name {
  margin: 0 0 0.25rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
}

.bio {
  margin: 0 0 0.75rem;
  font-size: 0.875rem;
  color: var(--text-color);
  opacity: 0.7;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(128, 128, 128, 0.15);
  color: var(--text-color);
  font-size: 1.125rem;
  transition: all 0.2s ease;
}

.social-link:hover {
  background: var(--primary-color);
  color: white;
  transform: translateY(-2px);
}

.description-card {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

:global([data-theme="light"]) .description-card,
:global([data-theme="warm"]) .description-card {
  background: var(--card-background);
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.1),
    0 12px 32px rgba(0, 0, 0, 0.12),
    0 24px 64px rgba(0, 0, 0, 0.1);
  border: 1.5px solid rgba(0, 0, 0, 0.12);
}

.description-card h2 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color);
}

.section-icon {
  color: var(--primary-color);
}

.description {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--text-color);
  opacity: 0.85;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  word-break: break-all;
  overflow-wrap: break-word;
  padding-right: 8px;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  transition: scrollbar-color 0.3s ease;
}

.description-line {
  margin: 0 0 0.75rem;
}

.description-line:last-child {
  margin-bottom: 0;
}

.description:hover {
  scrollbar-color: rgba(128, 128, 128, 0.3) transparent;
}

/* Custom scrollbar for Webkit */
.description::-webkit-scrollbar {
  width: 6px;
}

.description::-webkit-scrollbar-track {
  background: transparent;
}

.description::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 10px;
}

.description:hover::-webkit-scrollbar-thumb {
  background: rgba(128, 128, 128, 0.2);
}

.description::-webkit-scrollbar-thumb:hover {
  background: rgba(128, 128, 128, 0.4);
}

.desktop-stats {
  margin-top: auto;
}

@media (max-width: 1024px) {
  .desktop-stats {
    display: none;
  }

  .description {
    flex: none;
    max-height: 300px;
  }
}
</style>
