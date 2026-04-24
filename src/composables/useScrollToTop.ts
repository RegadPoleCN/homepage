import { ref } from 'vue';

/**
 * Custom smooth scroll algorithm: easeInOutQuart
 */
const easeInOutQuart = (t: number): number => {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
};

export function useScrollToTop() {
  const isLaunching = ref(false);

  const scrollToTop = (scrollableElements?: HTMLElement[]) => {
    const duration = 600;

    const windowNeedsScroll = window.scrollY > 0;
    const elementsNeedScroll = scrollableElements?.some((el) => el.scrollTop > 0) ?? false;

    if (isLaunching.value || (!windowNeedsScroll && !elementsNeedScroll)) return;
    isLaunching.value = true;

    const windowStartPos = window.scrollY;
    const elementStartPositions =
      scrollableElements
        ?.map((el) => ({ el, startPos: el.scrollTop }))
        .filter((p) => p.startPos > 0) ?? [];

    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutQuart(progress);

      if (windowStartPos > 0) {
        window.scrollTo(0, windowStartPos * (1 - ease));
      }

      for (const { el, startPos } of elementStartPositions) {
        el.scrollTo({ top: startPos * (1 - ease) });
      }

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        setTimeout(() => {
          isLaunching.value = false;
        }, 600);
      }
    };

    requestAnimationFrame(animation);
  };

  return {
    isLaunching,
    scrollToTop,
  };
}
