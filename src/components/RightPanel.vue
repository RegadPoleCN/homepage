<script setup lang="ts">
import { Icon } from '@iconify/vue'
import UptimeCard from './UptimeCard.vue'
import { siteConfig } from '../config/site.config'
import type { ActivitySection, SkillSection, ProjectSection } from '../config/site.config'

const rightPanelSections = siteConfig.rightPanel.sections

const isActivitySection = (section: any): section is ActivitySection => section.type === 'activities'
const isSkillSection = (section: any): section is SkillSection => section.type === 'skills'
const isProjectSection = (section: any): section is ProjectSection => section.type === 'projects'
</script>

<template>
  <section class="right-panel">
    <template v-for="section in rightPanelSections" :key="section.type">
      <div v-if="section.enabled" class="content-card">
        <div class="card-header">
          <Icon :icon="section.icon" class="header-icon" />
          <h2>{{ section.title }}</h2>
        </div>
        <div v-if="isActivitySection(section)" class="card-content">
          <div v-for="(item, index) in section.items" :key="index" class="activity-item">
            <div class="activity-icon">
              <Icon :icon="item.icon" />
            </div>
            <div class="activity-info">
              <span class="activity-title">{{ item.title }}</span>
              <span class="activity-time">{{ item.time }}</span>
            </div>
          </div>
        </div>
        <div v-else-if="isSkillSection(section)" class="skills-grid">
          <div v-for="(item, index) in section.items" :key="index" class="skill-tag">
            <Icon :icon="item.icon" />
            <span>{{ item.name }}</span>
          </div>
        </div>
        <div v-else-if="isProjectSection(section)" class="projects-list">
          <a v-for="(item, index) in section.items" :key="index" :href="item.url" class="project-item">
            <div class="project-icon">
              <Icon :icon="item.icon" />
            </div>
            <div class="project-info">
              <span class="project-name">{{ item.name }}</span>
              <span class="project-desc">{{ item.description }}</span>
            </div>
            <Icon icon="mdi:chevron-right" class="project-arrow" />
          </a>
        </div>
      </div>
    </template>

    <UptimeCard v-if="siteConfig.uptimeKuma" />
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
