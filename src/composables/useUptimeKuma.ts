import { ref, onMounted, onUnmounted } from 'vue'
import { siteConfig } from '../config/site.config'

export interface MonitorStatus {
  id: number
  name: string
  status: number // 1: Up, 0: Down, 2: Pending/Maintenance
  msg: string
  time: string
  ping: number | null
  uptime: number | null
  history: number[]
}

export interface UptimeKumaData {
  heartbeatList: Record<string, any[]>
  monitorList: any[]
  uptimeList: Record<string, number>
}

export function useUptimeKuma() {
  const monitors = ref<MonitorStatus[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)
  const lastUpdated = ref<string | null>(null)
  const overallStatus = ref<'up' | 'down' | 'partial' | 'loading'>('loading')
  
  let timer: number | null = null

  const fetchStatus = async () => {
    loading.value = true
    if (!siteConfig.uptimeKuma) {
      loading.value = false
      return
    }

    try {
      const { url, slug } = siteConfig.uptimeKuma
      const baseUrl = url.replace(/\/+$/, '')
      
      // 1. Fetch Status Page Config (Monitor List)
      const statusPageUrl = baseUrl.includes('/api/status-page')
        ? `${baseUrl}/${slug}`
        : `${baseUrl}/api/status-page/${slug}`
      
      // 2. Fetch Heartbeat Data (Status, Ping, Uptime, History)
      const heartbeatUrl = baseUrl.includes('/api/status-page')
        ? `${baseUrl}/heartbeat/${slug}`
        : `${baseUrl}/api/status-page/heartbeat/${slug}`

      console.log('[UptimeKuma] Fetching from:', { statusPageUrl, heartbeatUrl })
      
      const [statusRes, heartbeatRes] = await Promise.all([
        fetch(statusPageUrl),
        fetch(heartbeatUrl)
      ])

      if (!statusRes.ok || !heartbeatRes.ok) {
        throw new Error(`请求失败: Status(${statusRes.status}) Heartbeat(${heartbeatRes.status})`)
      }

      const statusData = await statusRes.json()
      const heartbeatData = await heartbeatRes.json()
      
      console.log('[UptimeKuma] Raw data received:', { statusData, heartbeatData })

      // 3. Extract all monitors from publicGroupList
      const allMonitors: any[] = []
      if (statusData.publicGroupList) {
        statusData.publicGroupList.forEach((group: any) => {
          if (group.monitorList) {
            allMonitors.push(...group.monitorList)
          }
        })
      }

      const heartbeatList = heartbeatData.heartbeatList || {}
      const uptimeList = heartbeatData.uptimeList || {}
      
      // 4. Merge data
      const mergedMonitors: MonitorStatus[] = allMonitors.map((m: any) => {
        const heartbeats = heartbeatList[m.id] || []
        const lastHeartbeat = heartbeats[heartbeats.length - 1]
        
        const uptimeKey = `${m.id}_24`
        const uptime = uptimeList[uptimeKey] !== undefined ? uptimeList[uptimeKey] * 100 : null
        const history = heartbeats.slice(-20).map((h: any) => h.status)
        
        return {
          id: m.id,
          name: m.name,
          status: lastHeartbeat ? lastHeartbeat.status : 2,
          msg: lastHeartbeat ? lastHeartbeat.msg : 'Unknown',
          time: lastHeartbeat ? lastHeartbeat.time : '',
          ping: lastHeartbeat ? lastHeartbeat.ping : null,
          uptime,
          history
        }
      })

      monitors.value = mergedMonitors
      lastUpdated.value = new Date().toLocaleTimeString()
      
      // Determine overall status
      if (mergedMonitors.length > 0) {
        const upCount = mergedMonitors.filter(m => m.status === 1).length
        if (upCount === mergedMonitors.length) {
          overallStatus.value = 'up'
        } else if (upCount === 0) {
          overallStatus.value = 'down'
        } else {
          overallStatus.value = 'partial'
        }
      } else {
        overallStatus.value = 'loading'
      }
      
      error.value = null
    } catch (err: any) {
      console.error('Uptime Kuma fetch error:', err)
      error.value = err.message || '获取状态时发生未知错误'
      overallStatus.value = 'down'
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchStatus()
    // Refresh every 60 seconds
    timer = window.setInterval(fetchStatus, 60000)
  })

  onUnmounted(() => {
    if (timer) clearInterval(timer)
  })

  return {
    monitors,
    loading,
    error,
    lastUpdated,
    overallStatus,
    refresh: fetchStatus
  }
}
