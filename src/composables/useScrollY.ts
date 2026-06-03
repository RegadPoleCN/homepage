import { ref, onMounted, onUnmounted } from 'vue';

export function useScrollY() {
  const y = ref(window.scrollY);
  const handler = () => {
    y.value = window.scrollY;
  };
  onMounted(() => window.addEventListener('scroll', handler, { passive: true }));
  onUnmounted(() => window.removeEventListener('scroll', handler));
  return y;
}
