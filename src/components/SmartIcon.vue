<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed } from 'vue';
import { getIconType, type IconConfig } from '../utils/icon';

const props = defineProps<{
  icon: string | IconConfig;
  class?: string;
  size?: string | number;
}>();

/**
 * 解析图标配置，返回图标字符串
 */
function parseIcon(icon: string | IconConfig): string {
  if (typeof icon === 'string') {
    return icon;
  }
  return icon.src;
}

/**
 * 获取解析后的图标字符串
 */
const iconSrc = computed(() => parseIcon(props.icon));

/**
 * 获取图标类型
 */
const iconType = computed(() => getIconType(iconSrc.value));

/**
 * 计算图标样式类名
 */
const iconClass = computed(() => {
  const baseClass = 'smart-icon';
  const typeClass = `${baseClass}-${iconType.value}`;
  const customClass = props.class || '';
  return [baseClass, typeClass, customClass].filter(Boolean).join(' ');
});
</script>

<template>
  <!-- 图片类型图标 -->
  <img
    v-if="iconType === 'image'"
    :src="iconSrc"
    :class="iconClass"
    :style="{
      width: typeof size === 'number' ? `${size}px` : size,
      height: typeof size === 'number' ? `${size}px` : size,
    }"
    alt="icon"
  />

  <!-- Iconify 图标库类型 -->
  <Icon
    v-else-if="iconType === 'iconify'"
    :icon="iconSrc"
    :class="iconClass"
    :style="{ fontSize: typeof size === 'number' ? `${size}px` : size }"
  />

  <!-- 未知类型，尝试直接渲染 -->
  <span v-else :class="iconClass">{{ iconSrc }}</span>
</template>

<style scoped>
.smart-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.smart-icon-image {
  object-fit: contain;
}

.smart-icon-iconify {
  /* Iconify 图标默认样式 */
}

.smart-icon-unknown {
  font-size: 0.75rem;
  opacity: 0.6;
}
</style>
