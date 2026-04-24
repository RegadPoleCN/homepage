<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  size?: 'small' | 'medium' | 'large';
  text?: string;
}>();

const spinnerClass = computed(() => `spinner-${props.size || 'medium'}`);
</script>

<template>
  <div class="loading-spinner" :class="spinnerClass">
    <div class="spinner"></div>
    <p v-if="text" class="loading-text">{{ text }}</p>
  </div>
</template>

<style scoped>
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
}

.spinner-small {
  padding: 1rem;
}

.spinner-small .spinner {
  width: 24px;
  height: 24px;
  border-width: 2px;
}

.spinner-medium .spinner {
  width: 40px;
  height: 40px;
  border-width: 3px;
}

.spinner-large {
  padding: 3rem;
}

.spinner-large .spinner {
  width: 56px;
  height: 56px;
  border-width: 4px;
}

.spinner {
  border: 3px solid rgba(128, 128, 128, 0.15);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-text {
  margin: 0;
  font-size: 0.875rem;
  color: var(--text-color);
  opacity: 0.6;
}
</style>
