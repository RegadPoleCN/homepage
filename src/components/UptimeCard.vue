<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useUptimeKuma } from '../composables/useUptimeKuma'
import { siteConfig } from '../config/site.config'

const { monitors, loading, overallStatus, error, lastUpdated, refresh } = useUptimeKuma()

const getStatusColor = (status: number) => {
  switch (status) {
    case 1: return '#22c55e' // Up
    case 0: return '#ef4444' // Down
    default: return '#94a3b8' // Unknown/Pending
  }
}

const getOverallStatusText = () => {
  if (loading.value && !monitors.value.length) return '正在加载服务状态...'
  if (error.value && !monitors.value.length) return '无法获取服务状态'
  
  switch (overallStatus.value) {
    case 'up': return '所有系统正常运行'
    case 'partial': return '部分服务运行异常'
    case 'down': return '所有服务均不可用'
    default: return '状态未知'
  }
}

const getOverallStatusIcon = () => {
  if (loading.value && !monitors.value.length) return 'mdi:loading'
  if (error.value && !monitors.value.length) return 'mdi:alert-circle-outline'
  
  switch (overallStatus.value) {
    case 'up': return 'mdi:check-circle-outline'
    case 'partial': return 'mdi:alert-outline'
    case 'down': return 'mdi:close-circle-outline'
    default: return 'mdi:help-circle-outline'
  }
}
</script>

<template>
  <div v-if="siteConfig.uptimeKuma" class="content-card uptime-card">
    <div class="card-header">
      <div class="header-left">
        <Icon icon="mdi:server-network" class="header-icon" />
        <h2>服务状态</h2>
      </div>
      <button 
        class="refresh-btn" 
        :class="{ 'loading': loading }" 
        @click="refresh" 
        :disabled="loading"
        title="手动刷新"
      >
        <Icon icon="mdi:refresh" />
      </button>
    </div>

    <div class="status-summary" v-if="!loading || monitors.length">
      <div class="status-badge" :class="overallStatus">
        <Icon :icon="getOverallStatusIcon()" :class="{ 'spin': loading && !monitors.length }" />
        <span>{{ getOverallStatusText() }}</span>
      </div>
      <span v-if="lastUpdated" class="last-updated">更新于 {{ lastUpdated }}</span>
    </div>

    <div class="card-content">
      <div v-if="loading && !monitors.length" class="loading-state">
        <div class="skeleton-list">
          <div v-for="i in 3" :key="i" class="skeleton-item"></div>
        </div>
      </div>
      
      <div v-else-if="error && !monitors.length" class="error-state">
        <div class="error-content">
          <Icon icon="mdi:alert-rhombus-outline" class="error-icon" />
          <p>{{ error }}</p>
          <button class="retry-btn" @click="refresh">
            <Icon icon="mdi:reload" />
            重试
          </button>
        </div>
      </div>

      <div v-else-if="monitors.length" class="monitor-grid">
        <div 
          v-for="monitor in monitors" 
          :key="monitor.id" 
          class="monitor-card-item"
        >
          <div class="monitor-card-header">
            <div 
              class="status-dot" 
              :class="{ 'pulse': monitor.status === 1 }"
              :style="{ backgroundColor: getStatusColor(monitor.status) }"
            ></div>
            <span class="monitor-name" :title="monitor.name">{{ monitor.name }}</span>
            <span v-if="monitor.uptime !== null" class="monitor-uptime" title="24小时在线率">
              {{ monitor.uptime.toFixed(1) }}%
            </span>
          </div>
          
          <!-- Heartbeat History Bar -->
          <div v-if="monitor.history && monitor.history.length" class="monitor-history-bar">
            <div 
              v-for="(hStatus, hIndex) in monitor.history" 
              :key="hIndex"
              class="history-block"
              :style="{ backgroundColor: getStatusColor(hStatus) }"
              :title="hStatus === 1 ? '在线' : '离线'"
            ></div>
          </div>

          <div class="monitor-card-footer">
            <div class="status-text" :style="{ color: getStatusColor(monitor.status) }">
              {{ monitor.status === 1 ? '在线' : monitor.status === 0 ? '离线' : '待定' }}
            </div>
            <span v-if="monitor.ping !== null" class="monitor-ping">{{ monitor.ping }}ms</span>
          </div>
        </div>
      </div>

      <div v-else class="empty-state">
        <Icon icon="mdi:server-off" class="empty-icon" />
        <p>未发现监控项</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.uptime-card {
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.refresh-btn {
  background: none;
  border: none;
  color: var(--text-color);
  opacity: 0.5;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.refresh-btn:hover {
  opacity: 1;
  background: rgba(128, 128, 128, 0.1);
}

.refresh-btn.loading {
  animation: spin 1s linear infinite;
  opacity: 1;
  color: var(--primary-color);
}

.status-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.25rem;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  padding: 0.25rem 0.6rem;
  border-radius: 20px;
  font-weight: 600;
}

.status-badge.up {
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
}

.status-badge.partial {
  background: rgba(245, 158, 11, 0.15);
  color: #f59e0b;
}

.status-badge.down {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
}

.last-updated {
  font-size: 0.7rem;
  color: var(--text-color);
  opacity: 0.4;
}

.loading-state {
  padding: 0.5rem 0;
}

.skeleton-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.skeleton-item {
  height: 36px;
  background: linear-gradient(90deg, 
    rgba(128, 128, 128, 0.05) 25%, 
    rgba(128, 128, 128, 0.1) 50%, 
    rgba(128, 128, 128, 0.05) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 10px;
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.error-state {
  padding: 1.5rem 0;
  text-align: center;
}

.error-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.error-icon {
  font-size: 2.5rem;
  color: #ef4444;
  opacity: 0.8;
}

.error-state p {
  margin: 0;
  font-size: 0.875rem;
  color: var(--text-color);
  opacity: 0.7;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  color: var(--text-color);
  opacity: 0.5;
  gap: 0.75rem;
}

.empty-icon {
  font-size: 2.5rem;
}

.empty-state p {
  margin: 0;
  font-size: 0.875rem;
}

.retry-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 1rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.retry-btn:hover {
  filter: brightness(1.1);
  transform: translateY(-1px);
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.monitor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 0.75rem;
}

.monitor-card-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 12px;
  background: rgba(128, 128, 128, 0.05);
  border: 1px solid rgba(128, 128, 128, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(4px);
}

.monitor-card-item:hover {
  background: rgba(128, 128, 128, 0.1);
  transform: translateY(-2px);
  border-color: rgba(128, 128, 128, 0.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.monitor-card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  position: relative;
}

.status-dot.pulse::after {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  background: inherit;
  opacity: 0.4;
  animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse-ring {
  0% { transform: scale(1); opacity: 0.4; }
  100% { transform: scale(2.5); opacity: 0; }
}

.monitor-name {
  font-size: 0.8125rem;
  color: var(--text-color);
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.monitor-uptime {
  font-size: 0.7rem;
  font-weight: 600;
  opacity: 0.8;
  color: var(--primary-color);
  font-family: 'JetBrains Mono', monospace;
}

.monitor-history-bar {
  display: flex;
  gap: 2px;
  height: 12px;
  align-items: center;
}

.history-block {
  flex: 1;
  height: 100%;
  border-radius: 1px;
  opacity: 0.8;
  transition: transform 0.2s ease;
}

.history-block:hover {
  transform: scaleY(1.3);
  opacity: 1;
}

.monitor-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;
}

.status-text {
  font-weight: 500;
  opacity: 0.9;
}

.monitor-ping {
  color: var(--text-color);
  opacity: 0.5;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
}
</style>
