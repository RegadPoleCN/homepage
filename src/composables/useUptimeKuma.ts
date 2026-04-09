import { ref, onMounted, onUnmounted } from 'vue';
import { siteConfig } from '../config/site.config';

export interface MonitorStatus {
  id: number;
  name: string;
  status: number; // 1: Up, 0: Down, 2: Pending/Maintenance
  msg: string;
  time: string;
  ping: number | null;
  uptime: number | null;
  history: number[];
}

export interface UptimeKumaData {
  heartbeatList: Record<string, any[]>;
  monitorList: any[];
  uptimeList: Record<string, number>;
}

export interface UptimeKumaConfig {
  url: string;
  slug: string;
}

export function useUptimeKuma(overrideConfig?: UptimeKumaConfig) {
  const monitors = ref<MonitorStatus[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);
  const lastUpdated = ref<string | null>(null);
  const overallStatus = ref<'up' | 'down' | 'partial' | 'loading'>('loading');
  const retryCount = ref(0);
  const maxRetries = 3;

  let timer: number | null = null;

  const fetchStatus = async (isRetry = false) => {
    if (isRetry) {
      retryCount.value++;
    }

    loading.value = true;
    const config = overrideConfig || (siteConfig as any).uptimeKuma;

    if (!config) {
      loading.value = false;
      error.value = '未配置 Uptime Kuma';
      return;
    }

    try {
      const { url, slug } = config;

      if (!url || !slug) {
        throw new Error('Uptime Kuma 配置不完整：缺少 URL 或 slug');
      }

      const baseUrl = url.replace(/\/+$/, '');

      const statusPageUrl = baseUrl.includes('/api/status-page')
        ? `${baseUrl}/${slug}`
        : `${baseUrl}/api/status-page/${slug}`;

      const heartbeatUrl = baseUrl.includes('/api/status-page')
        ? `${baseUrl}/heartbeat/${slug}`
        : `${baseUrl}/api/status-page/heartbeat/${slug}`;

      // eslint-disable-next-line no-undef
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const [statusRes, heartbeatRes] = await Promise.all([
        fetch(statusPageUrl, { signal: controller.signal }),
        fetch(heartbeatUrl, { signal: controller.signal }),
      ]);

      clearTimeout(timeoutId);

      if (!statusRes.ok) {
        throw new Error(`状态页请求失败：${statusRes.status} ${statusRes.statusText}`);
      }

      if (!heartbeatRes.ok) {
        throw new Error(`心跳数据请求失败：${heartbeatRes.status} ${heartbeatRes.statusText}`);
      }

      const statusData = await statusRes.json();
      const heartbeatData = await heartbeatRes.json();

      const allMonitors: any[] = [];
      if (statusData.publicGroupList) {
        statusData.publicGroupList.forEach((group: any) => {
          if (group.monitorList) {
            allMonitors.push(...group.monitorList);
          }
        });
      }

      const heartbeatList = heartbeatData.heartbeatList || {};
      const uptimeList = heartbeatData.uptimeList || {};

      const mergedMonitors: MonitorStatus[] = allMonitors.map((m: any) => {
        const heartbeats = heartbeatList[m.id] || [];
        const lastHeartbeat = heartbeats[heartbeats.length - 1];

        const uptimeKey = `${m.id}_24`;
        const uptime = uptimeList[uptimeKey] !== undefined ? uptimeList[uptimeKey] * 100 : null;
        const history = heartbeats.slice(-20).map((h: any) => h.status);

        return {
          id: m.id,
          name: m.name,
          status: lastHeartbeat ? lastHeartbeat.status : 2,
          msg: lastHeartbeat ? lastHeartbeat.msg : 'Unknown',
          time: lastHeartbeat ? lastHeartbeat.time : '',
          ping: lastHeartbeat ? lastHeartbeat.ping : null,
          uptime,
          history,
        };
      });

      monitors.value = mergedMonitors;
      lastUpdated.value = new Date().toLocaleTimeString();

      if (mergedMonitors.length > 0) {
        const upCount = mergedMonitors.filter((m) => m.status === 1).length;
        if (upCount === mergedMonitors.length) {
          overallStatus.value = 'up';
        } else if (upCount === 0) {
          overallStatus.value = 'down';
        } else {
          overallStatus.value = 'partial';
        }
      } else {
        overallStatus.value = 'loading';
      }

      error.value = null;
      retryCount.value = 0;
    } catch (err: any) {
      console.error('Uptime Kuma fetch error:', err);

      if (err.name === 'AbortError') {
        error.value = '请求超时，请检查网络连接';
      } else if (err.message?.includes('Failed to fetch')) {
        error.value = '无法连接到 Uptime Kuma 服务器，请检查 URL 是否正确';
      } else {
        error.value = err.message || '获取状态时发生未知错误';
      }

      if (isRetry && retryCount.value < maxRetries) {
        console.log(`自动重试 ${retryCount.value}/${maxRetries}`);
        setTimeout(() => fetchStatus(true), 2000 * retryCount.value);
      } else {
        overallStatus.value = 'down';
      }
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchStatus();
    // Refresh every 60 seconds
    timer = window.setInterval(fetchStatus, 60000);
  });

  onUnmounted(() => {
    if (timer) clearInterval(timer);
  });

  return {
    monitors,
    loading,
    error,
    lastUpdated,
    overallStatus,
    refresh: fetchStatus,
  };
}
