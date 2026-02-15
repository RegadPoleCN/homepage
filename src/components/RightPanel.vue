<script setup lang="ts">
import { Icon } from '@iconify/vue'
import UptimeCard from './UptimeCard.vue'
import { siteConfig } from '../config/site.config'
</script>

<template>
  <section class="right-panel">
    <div class="content-card">
      <div class="card-header">
        <Icon icon="mdi:post-outline" class="header-icon" />
        <h2>最新动态</h2>
      </div>
      <div class="card-content">
        <div class="activity-item">
          <div class="activity-icon">
            <Icon icon="mdi:code-braces" />
          </div>
          <div class="activity-info">
            <span class="activity-title">开始了一个新项目</span>
            <span class="activity-time">2 天前</span>
          </div>
        </div>
        <div class="activity-item">
          <div class="activity-icon">
            <Icon icon="mdi:book-open-page-variant" />
          </div>
          <div class="activity-info">
            <span class="activity-title">发布了一篇博客文章</span>
            <span class="activity-time">1 周前</span>
          </div>
        </div>
        <div class="activity-item">
          <div class="activity-icon">
            <Icon icon="mdi:star" />
          </div>
          <div class="activity-info">
            <span class="activity-title">收获了 100 个 Star</span>
            <span class="activity-time">2 周前</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Uptime Kuma Card (Conditional) -->
    <UptimeCard v-if="siteConfig.uptimeKuma" />

    <div class="content-card">
      <div class="card-header">
        <Icon icon="mdi:lightbulb-on" class="header-icon" />
        <h2>技能专长</h2>
      </div>
      <div class="skills-grid">
        <div class="skill-tag">
          <Icon icon="logos:vue" />
          <span>Vue.js</span>
        </div>
        <div class="skill-tag">
          <Icon icon="logos:typescript-icon" />
          <span>TypeScript</span>
        </div>
        <div class="skill-tag">
          <Icon icon="logos:react" />
          <span>React</span>
        </div>
        <div class="skill-tag">
          <Icon icon="logos:nodejs-icon" />
          <span>Node.js</span>
        </div>
        <div class="skill-tag">
          <Icon icon="logos:python" />
          <span>Python</span>
        </div>
        <div class="skill-tag">
          <Icon icon="logos:docker-icon" />
          <span>Docker</span>
        </div>
      </div>
    </div>

    <div class="content-card">
      <div class="card-header">
        <Icon icon="mdi:folder-multiple" class="header-icon" />
        <h2>精选项目</h2>
      </div>
      <div class="projects-list">
        <a href="#" class="project-item">
          <div class="project-icon">
            <Icon icon="mdi:github" />
          </div>
          <div class="project-info">
            <span class="project-name">项目名称 1</span>
            <span class="project-desc">这是一个很棒的开源项目描述</span>
          </div>
          <Icon icon="mdi:chevron-right" class="project-arrow" />
        </a>
        <a href="#" class="project-item">
          <div class="project-icon">
            <Icon icon="mdi:github" />
          </div>
          <div class="project-info">
            <span class="project-name">项目名称 2</span>
            <span class="project-desc">另一个精彩项目的简短介绍</span>
          </div>
          <Icon icon="mdi:chevron-right" class="project-arrow" />
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.right-panel {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100%;
}

.content-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
}

:global([data-theme="light"]) .content-card,
:global([data-theme="warm"]) .content-card {
  background: var(--card-background);
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.1),
    0 12px 32px rgba(0, 0, 0, 0.12),
    0 24px 64px rgba(0, 0, 0, 0.1);
  border: 1.5px solid rgba(0, 0, 0, 0.12);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(128, 128, 128, 0.2);
}

.header-icon {
  font-size: 1.25rem;
  color: var(--primary-color);
}

.card-header h2 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-color);
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 10px;
  background: rgba(128, 128, 128, 0.08);
  transition: background 0.2s ease;
}

.activity-item:hover {
  background: rgba(128, 128, 128, 0.15);
}

.activity-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--primary-color);
  color: white;
  font-size: 1.125rem;
  flex-shrink: 0;
}

.activity-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.activity-title {
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text-color);
}

.activity-time {
  font-size: 0.8125rem;
  color: var(--text-color);
  opacity: 0.6;
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.skill-tag {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background: rgba(128, 128, 128, 0.1);
  font-size: 0.875rem;
  color: var(--text-color);
  transition: all 0.2s ease;
}

.skill-tag:hover {
  background: var(--primary-color);
  color: white;
  transform: translateY(-2px);
}

.projects-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.project-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 12px;
  background: rgba(128, 128, 128, 0.08);
  text-decoration: none;
  transition: all 0.2s ease;
}

.project-item:hover {
  background: rgba(128, 128, 128, 0.15);
  transform: translateX(4px);
}

.project-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: var(--accent-color);
  color: white;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.project-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.project-name {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-color);
}

.project-desc {
  font-size: 0.8125rem;
  color: var(--text-color);
  opacity: 0.6;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.project-arrow {
  font-size: 1.25rem;
  color: var(--text-color);
  opacity: 0.4;
  flex-shrink: 0;
}
</style>
