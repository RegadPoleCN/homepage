import { ref, watch, onUnmounted, type Ref } from 'vue';

export function useFocusTrap(containerRef: Ref<HTMLElement | null>, isActive: Ref<boolean>) {
  const previousActiveElement = ref<HTMLElement | null>(null);

  const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ];

    return Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors.join(','))).filter(
      (el) =>
        !el.hasAttribute('disabled') &&
        el.offsetParent !== null &&
        getComputedStyle(el).visibility !== 'hidden' &&
        getComputedStyle(el).display !== 'none'
    );
  };

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab' || !containerRef.value || !isActive.value) return;

    const focusableElements = getFocusableElements(containerRef.value);
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (!firstElement || !lastElement) return;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }
  };

  const activate = () => {
    previousActiveElement.value = document.activeElement as HTMLElement;

    if (containerRef.value) {
      const focusableElements = getFocusableElements(containerRef.value);
      const firstFocusable = focusableElements[0];
      if (firstFocusable) {
        firstFocusable?.focus();
      } else {
        containerRef.value?.focus();
      }
    }

    document.addEventListener('keydown', handleTabKey as EventListener);
  };

  const deactivate = () => {
    document.removeEventListener('keydown', handleTabKey as EventListener);

    if (previousActiveElement.value && typeof previousActiveElement.value.focus === 'function') {
      previousActiveElement.value.focus();
    }

    previousActiveElement.value = null;
  };

  watch(isActive, (newValue, oldValue) => {
    if (newValue && !oldValue) {
      activate();
    } else if (!newValue && oldValue) {
      deactivate();
    }
  });

  onUnmounted(() => {
    deactivate();
  });

  return {
    activate,
    deactivate,
  };
}
