<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { siteConfig } from '../config/site.config';

const friendLinks = siteConfig.friendLinks;

const defaultAvatar = 'https://ui-avatars.com/api/?background=0D8ABC&color=fff&size=64';

function handleImageError(event: Event) {
  const target = event.target;
  if (target && 'src' in target && target.src !== defaultAvatar) {
    target.src = defaultAvatar;
  }
}
</script>

<template>
  <aside class="left-sidebar" aria-label="友情链接区域">
    <div class="sidebar-content">
      <div class="sidebar-header">
        <Icon icon="mdi:link-variant" class="header-icon" aria-hidden="true" />
        <h3>友情链接</h3>
      </div>
      <nav class="friend-links" aria-label="友情链接列表">
        <a
          v-for="link in friendLinks"
          :key="link.url"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="friend-link"
          :aria-label="`访问${link.name}的网站${link.description ? ' - ' + link.description : ''}`"
        >
          <img
            v-if="link.avatar"
            :src="link.avatar"
            :alt="link.name"
            class="friend-avatar"
            loading="lazy"
            @error="handleImageError"
          />
          <div class="friend-info">
            <span class="friend-name">{{ link.name }}</span>
            <span v-if="link.description" class="friend-desc">{{ link.description }}</span>
          </div>
        </a>
      </nav>
    </div>
  </aside>
</template>

<style scoped>
.left-sidebar {
  height: 100%;
}

.sidebar-content {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem;
}

:global([data-theme='light']) .sidebar-content,
:global([data-theme='warm']) .sidebar-content {
  background: var(--card-background);
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.1),
    0 12px 32px rgba(0, 0, 0, 0.12),
    0 24px 64px rgba(0, 0, 0, 0.1);
  border: 1.5px solid rgba(0, 0, 0, 0.12);
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(128, 128, 128, 0.2);
}

.header-icon {
  font-size: 1.125rem;
  color: var(--primary-color);
}

.sidebar-header h3 {
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-color);
}

.friend-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.friend-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
  background: rgba(128, 128, 128, 0.08);
  min-height: 44px;
}

.friend-link:hover {
  background: rgba(128, 128, 128, 0.18);
  transform: translateX(4px);
}

.friend-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.friend-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.friend-name {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.friend-desc {
  font-size: 0.6875rem;
  color: var(--text-color);
  opacity: 0.6;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
