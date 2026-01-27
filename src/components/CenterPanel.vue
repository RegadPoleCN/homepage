<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { siteConfig } from '../config/site.config'

const profile = siteConfig.profile
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
          v-if="profile.socialLinks.github"
          :href="profile.socialLinks.github"
          target="_blank"
          rel="noopener noreferrer"
          class="social-link"
          title="GitHub"
        >
          <Icon icon="mdi:github" />
        </a>
        <a
          v-if="profile.socialLinks.twitter"
          :href="profile.socialLinks.twitter"
          target="_blank"
          rel="noopener noreferrer"
          class="social-link"
          title="Twitter"
        >
          <Icon icon="mdi:twitter" />
        </a>
        <a
          v-if="profile.socialLinks.email"
          :href="`mailto:${profile.socialLinks.email}`"
          class="social-link"
          title="Email"
        >
          <Icon icon="mdi:email" />
        </a>
        <a
          v-if="profile.socialLinks.weibo"
          :href="profile.socialLinks.weibo"
          target="_blank"
          rel="noopener noreferrer"
          class="social-link"
          title="微博"
        >
          <Icon icon="mdi:sina-weibo" />
        </a>
        <a
          v-if="profile.socialLinks.zhihu"
          :href="profile.socialLinks.zhihu"
          target="_blank"
          rel="noopener noreferrer"
          class="social-link"
          title="知乎"
        >
          <Icon icon="simple-icons:zhihu" />
        </a>
      </div>
    </div>
    <div class="description-card">
      <h2>
        <Icon icon="mdi:account-details" class="section-icon" />
        关于我
      </h2>
      <p class="description">{{ profile.description }}</p>
    </div>
  </section>
</template>

<style scoped>
.center-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
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
}
</style>
