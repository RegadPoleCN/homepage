<script setup lang="ts">
import Skeleton from '@/components/Skeleton.vue';

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
  background: var(--card-bg);
  border-radius: 16px;
  padding: 1.5rem;
  border: var(--card-border);
  box-shadow: var(--card-shadow);
}
</style>
