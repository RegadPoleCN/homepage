<script setup lang="ts">
defineProps<{
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
  lines?: number;
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
    <template v-if="lines && lines > 1">
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
</style>
