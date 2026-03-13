<script setup lang="ts">
import UptimeCard from './UptimeCard.vue';
import SmartIcon from './SmartIcon.vue';
import { siteConfig } from '../config/site.config';
import type {
  ActivitySection,
  SkillSection,
  ProjectSection,
  PersonalWebsiteSection,
} from '../config/site.config';
import { formatRelativeTime } from '../utils/format';

const rightPanelSections = siteConfig.rightPanel.sections;

const isActivitySection = (section: any): section is ActivitySection =>
  section.type === 'activities';
const isSkillSection = (section: any): section is SkillSection => section.type === 'skills';
const isProjectSection = (section: any): section is ProjectSection => section.type === 'projects';
const isPersonalWebsiteSection = (section: any): section is PersonalWebsiteSection =>
  section.type === 'personalWebsites';

/**
 * 获取活动的相对时间描述
 * 智能识别并处理不同类型的 time 字段：
 * - 数字：视为时间戳（毫秒），自动计算相对时间
 * - ISO 日期字符串：自动计算相对时间
 * - 纯数字字符串：转换为时间戳后计算
 * - 其他字符串：作为自定义文本直接显示
 */
function getActivityTime(item: any): string {
  const timeValue = item.time;
  
  if (timeValue === undefined || timeValue === null) {
    return '';
  }
  
  // 如果是数字，认为是时间戳，自动计算相对时间
  if (typeof timeValue === 'number') {
    return formatRelativeTime(timeValue);
  }
  
  // 如果是字符串，尝试解析为日期
  if (typeof timeValue === 'string') {
    // 检查是否为 ISO 日期格式或纯数字字符串
    const isoDatePattern = /^\d{4}-\d{2}-\d{2}/;
    const timestampPattern = /^\d+$/;
    
    if (isoDatePattern.test(timeValue) || timestampPattern.test(timeValue)) {
      // 是日期格式或纯数字字符串，转换为时间戳
      const parsedTime = new Date(timeValue).getTime();
      if (!isNaN(parsedTime)) {
        return formatRelativeTime(parsedTime);
      }
    }
    
    // 否则直接返回自定义文本
    return timeValue;
  }
  
  return '';
}
</script>

<template>
  <section class="right-panel">
    <!-- 右栏区块 -->
    <template v-for="section in rightPanelSections" :key="section.type">
      <div v-if="section.enabled" class="content-card">
        <div class="card-header">
          <SmartIcon :icon="section.icon" class="header-icon" />
          <h2>{{ section.title }}</h2>
        </div>

        <!-- 个人网站列表 -->
        <div v-if="isPersonalWebsiteSection(section)" class="websites-list">
          <a
            v-for="(item, index) in section.items"
            :key="index"
            :href="item.url"
            class="website-item"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div class="website-icon">
              <SmartIcon :icon="item.icon" size="24" />
            </div>
            <div class="website-info">
              <span class="website-name">{{ item.name }}</span>
              <span v-if="item.description" class="website-desc">{{ item.description }}</span>
            </div>
            <Icon icon="mdi:chevron-right" class="website-arrow" />
          </a>
        </div>

        <!-- 活动列表 -->
        <div v-else-if="isActivitySection(section)" class="card-content">
          <div v-for="(item, index) in section.items" :key="index" class="activity-item">
            <div class="activity-icon">
              <SmartIcon :icon="item.icon" size="20" />
            </div>
            <div class="activity-info">
              <span class="activity-title">{{ item.title }}</span>
              <span class="activity-time">{{ getActivityTime(item) }}</span>
            </div>
          </div>
        </div>

        <!-- 技能网格 -->
        <div v-else-if="isSkillSection(section)" class="skills-grid">
          <div v-for="(item, index) in section.items" :key="index" class="skill-tag">
            <SmartIcon :icon="item.icon" size="18" />
            <span>{{ item.name }}</span>
          </div>
        </div>

        <!-- 项目列表 -->
        <div v-else-if="isProjectSection(section)" class="projects-list">
          <a
            v-for="(item, index) in section.items"
            :key="index"
            :href="item.url"
            class="project-item"
          >
            <div class="project-icon">
              <SmartIcon :icon="item.icon" size="24" />
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

<script lang="ts">
import { Icon } from '@iconify/vue';
</script>

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

:global([data-theme='light']) .content-card,
:global([data-theme='warm']) .content-card {
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
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: var(--primary-color);
}

.card-header h2 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-color);
}

/* 个人网站列表 */
.websites-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.website-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 10px;
  background: rgba(128, 128, 128, 0.08);
  text-decoration: none;
  transition: all 0.2s ease;
}

.website-item:hover {
  background: rgba(128, 128, 128, 0.15);
  transform: translateX(4px);
}

.website-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--accent-color);
  color: white;
  flex-shrink: 0;
}

.website-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.website-name {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-color);
}

.website-desc {
  font-size: 0.8125rem;
  color: var(--text-color);
  opacity: 0.6;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.website-arrow {
  font-size: 1.25rem;
  color: var(--text-color);
  opacity: 0.4;
  flex-shrink: 0;
}

/* 活动列表 */
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

/* 技能网格 */
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

/* 项目列表 */
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
