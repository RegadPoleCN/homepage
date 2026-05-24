import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useAppScroll() {
  const leftColumnRef = ref<HTMLElement | null>(null);
  const rightColumnRef = ref<HTMLElement | null>(null);
  const leftScrollPos = ref(0);
  const rightScrollPos = ref(0);

  onMounted(() => {
    const handleLeftScroll = () => {
      leftScrollPos.value = leftColumnRef.value?.scrollTop ?? 0;
    };
    const handleRightScroll = () => {
      rightScrollPos.value = rightColumnRef.value?.scrollTop ?? 0;
    };

    if (leftColumnRef.value) {
      leftColumnRef.value.addEventListener('scroll', handleLeftScroll, { passive: true });
    }
    if (rightColumnRef.value) {
      rightColumnRef.value.addEventListener('scroll', handleRightScroll, { passive: true });
    }

    onBeforeUnmount(() => {
      if (leftColumnRef.value) {
        leftColumnRef.value.removeEventListener('scroll', handleLeftScroll);
      }
      if (rightColumnRef.value) {
        rightColumnRef.value.removeEventListener('scroll', handleRightScroll);
      }
    });
  });

  return {
    leftColumnRef,
    rightColumnRef,
    leftScrollPos,
    rightScrollPos,
  };
}
