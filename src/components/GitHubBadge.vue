<script setup lang="ts">
import { Icon } from '@iconify/vue';

const githubUrl = 'https://github.com/RegadPoleCN/homepage';
</script>

<template>
  <a
    :href="githubUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="github-badge"
    title="View on GitHub"
  >
    <Icon icon="mingcute:github-fill" class="github-icon" />
  </a>
</template>

<style scoped>
.github-badge {
  position: absolute;
  margin: -20px;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  z-index: 999;
  background: color-mix(in srgb, var(--primary-color) 65%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  clip-path: polygon(0 0, 100% 0, 0 100%);
  border-radius: 16px 0 0 0;
  transition: all 0.2s ease;
}

.github-icon {
  font-size: 32px;
  transform: rotate(-45deg) translate(-1px, -12px) scale(1.1);
  transition: transform 0.2s ease;
  color: var(--center-bg);
}

.github-badge:hover {
  background: color-mix(in srgb, var(--accent-color) 75%, transparent);
}

.github-badge:hover .github-icon {
  transform: rotate(-45deg) translate(-1px, -12px) scale(1.16);
}

@media (max-width: 768px) {
  .github-badge {
    width: 50px;
    height: 50px;
  }

  .github-icon {
    font-size: 26px;
  }
}
</style>
