import { ref, onMounted, onUnmounted } from 'vue'
import { siteConfig } from '../config/site.config'

export function useSiteStats() {
  const pageViews = ref(0)
  const runtime = ref('')
  let timer: number | null = null

  const calculateRuntime = () => {
    const start = new Date(siteConfig.footer.siteStartDate).getTime()
    const now = new Date().getTime()
    const diff = now - start

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    runtime.value = `${days} 天 ${hours} 小时 ${minutes} 分 ${seconds} 秒`
  }

  const fetchPageViews = async () => {
    // Simulated API call. In a real project, you might use Busuanzi or a backend API.
    // For this demonstration, we'll use localStorage to simulate a persistent count.
    const STORAGE_KEY = 'site-total-views'
    const currentViews = parseInt(localStorage.getItem(STORAGE_KEY) || '0')
    const newViews = currentViews + 1
    localStorage.setItem(STORAGE_KEY, newViews.toString())
    pageViews.value = newViews
  }

  onMounted(() => {
    fetchPageViews()
    calculateRuntime()
    timer = window.setInterval(calculateRuntime, 1000)
  })

  onUnmounted(() => {
    if (timer) clearInterval(timer)
  })

  return {
    pageViews,
    runtime
  }
}
