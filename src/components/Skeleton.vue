<script setup lang="ts">
defineProps<{
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded' | 'card' | 'list' | 'grid';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
  lines?: number;
  items?: number;
}>();
</script>

<template>
  <div
    class="skeleton"
    :class="[`skeleton-${variant || 'text'}`, `skeleton-animation-${animation || 'pulse'}`]"
    :style="{
      width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
      height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
    }"
  >
    <template v-if="variant === 'card'">
      <div class="skeleton-card-header">
        <div class="skeleton skeleton-circular" style="width: 40px; height: 40px"></div>
        <div class="skeleton-card-title">
          <div class="skeleton skeleton-text" style="width: 120px; margin-bottom: 8px"></div>
          <div class="skeleton skeleton-text" style="width: 80px; height: 0.75em"></div>
        </div>
      </div>
      <div class="skeleton-card-body">
        <div v-for="i in items || 3" :key="i" class="skeleton-card-item">
          <div
            class="skeleton skeleton-rounded"
            style="width: 100%; height: 48px; margin-bottom: 8px"
          ></div>
        </div>
      </div>
    </template>

    <template v-else-if="variant === 'list'">
      <div v-for="i in items || 4" :key="i" class="skeleton-list-item">
        <div
          class="skeleton skeleton-circular"
          style="width: 40px; height: 40px; flex-shrink: 0"
        ></div>
        <div class="skeleton-list-content">
          <div class="skeleton skeleton-text" style="width: 60%; margin-bottom: 8px"></div>
          <div class="skeleton skeleton-text" style="width: 40%; height: 0.75em"></div>
        </div>
      </div>
    </template>

    <template v-else-if="variant === 'grid'">
      <div class="skeleton-grid">
        <div v-for="i in items || 6" :key="i" class="skeleton-grid-item">
          <div class="skeleton skeleton-rounded" style="width: 100%; height: 32px"></div>
        </div>
      </div>
    </template>

    <template v-else-if="lines && lines > 1">
      <div
        v-for="i in lines"
        :key="i"
        class="skeleton-line"
        :class="{ 'skeleton-line-last': i === lines }"
      ></div>
    </template>
  </div>
</template>

<style scoped>
.skeleton {
  background: linear-gradient(
    90deg,
    rgba(128, 128, 128, 0.08) 25%,
    rgba(128, 128, 128, 0.15) 50%,
    rgba(128, 128, 128, 0.08) 75%
  );
  background-size: 200% 100%;
  border-radius: 4px;
  overflow: hidden;
}

.skeleton-text {
  height: 1em;
  width: 100%;
}

.skeleton-circular {
  border-radius: 50%;
}

.skeleton-rectangular {
  border-radius: 4px;
}

.skeleton-rounded {
  border-radius: 8px;
}

.skeleton-line {
  width: 100%;
  height: 1em;
  margin-bottom: 0.5em;
  background: inherit;
  background-size: 200% 100%;
}

.skeleton-line:last-child,
.skeleton-line-last {
  margin-bottom: 0;
}

.skeleton-animation-pulse {
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}

.skeleton-animation-wave {
  animation: skeleton-wave 1.5s ease-in-out infinite;
}

.skeleton-animation-none {
  animation: none;
}

@keyframes skeleton-pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}

@keyframes skeleton-wave {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

:global([data-theme='light']) .skeleton {
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.06) 25%,
    rgba(0, 0, 0, 0.12) 50%,
    rgba(0, 0, 0, 0.06) 75%
  );
}

.skeleton-card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(128, 128, 128, 0.15);
}

.skeleton-card-title {
  flex: 1;
}

.skeleton-card-body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skeleton-card-item {
  width: 100%;
}

.skeleton-list-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background: inherit;
  border-radius: 10px;
}

.skeleton-list-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skeleton-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.skeleton-grid-item {
  min-width: 80px;
}
</style>
