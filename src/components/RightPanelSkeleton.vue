<script setup lang="ts">
import Skeleton from './Skeleton.vue';

defineProps<{
  sections?: number;
}>();
</script>

<template>
  <div class="right-panel-skeleton">
    <div v-for="i in sections || 3" :key="i" class="skeleton-section">
      <Skeleton variant="card" :items="3" animation="wave" />
    </div>
  </div>
</template>

<style scoped>
.right-panel-skeleton {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100%;
}

.skeleton-section {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
}

:global([data-theme='light']) .skeleton-section,
:global([data-theme='warm']) .skeleton-section {
  background: var(--card-background);
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.1),
    0 12px 32px rgba(0, 0, 0, 0.12),
    0 24px 64px rgba(0, 0, 0, 0.1);
  border: 1.5px solid rgba(0, 0, 0, 0.12);
}
</style>
