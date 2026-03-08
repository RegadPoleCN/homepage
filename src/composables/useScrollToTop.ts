import { ref } from 'vue'

/**
 * Custom smooth scroll algorithm: easeInOutQuart
 */
const easeInOutQuart = (t: number): number => {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2
}

export function useScrollToTop() {
  const isLaunching = ref(false)

  const scrollToTop = () => {
    const duration = 600
    if (isLaunching.value || window.scrollY === 0) return
    isLaunching.value = true

    const startPosition = window.scrollY
    let startTime: number | null = null

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / duration, 1)
      const ease = easeInOutQuart(progress)
      
      window.scrollTo(0, startPosition * (1 - ease))

      if (timeElapsed < duration) {
        requestAnimationFrame(animation)
      } else {
        // Reset launch state after a delay to allow rocket to reset its position
        setTimeout(() => {
          isLaunching.value = false
        }, 600)
      }
    }

    requestAnimationFrame(animation)
  }

  return {
    isLaunching,
    scrollToTop
  }
}
