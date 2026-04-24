import { onMounted } from 'vue';
import { onCLS, onFCP, onLCP, onTTFB, onINP } from 'web-vitals';
import type { Metric } from 'web-vitals';

interface PerformanceMetrics {
  cls: number | null;
  fcp: number | null;
  lcp: number | null;
  ttfb: number | null;
  inp: number | null;
}

const metrics: PerformanceMetrics = {
  cls: null,
  fcp: null,
  lcp: null,
  ttfb: null,
  inp: null,
};

const reportMetric = (metric: Metric) => {
  const metricName = metric.name.toLowerCase();

  switch (metricName) {
    case 'cls':
      metrics.cls = metric.value;
      break;
    case 'fcp':
      metrics.fcp = metric.value;
      break;
    case 'lcp':
      metrics.lcp = metric.value;
      break;
    case 'ttfb':
      metrics.ttfb = metric.value;
      break;
    case 'inp':
      metrics.inp = metric.value;
      break;
  }

  if (import.meta.env.DEV) {
    const metricLabel = getMetricLabel(metricName);
    const rating = getRating(metricName, metric.value);

    console.log(
      `%c[Web Vitals] ${metricLabel}: ${metric.value.toFixed(2)} (${rating})`,
      `color: ${getRatingColor(rating)}; font-weight: bold;`
    );
  }
};

const getMetricLabel = (name: string): string => {
  const labels: Record<string, string> = {
    cls: 'Cumulative Layout Shift',
    fid: 'First Input Delay',
    fcp: 'First Contentful Paint',
    lcp: 'Largest Contentful Paint',
    ttfb: 'Time to First Byte',
    inp: 'Interaction to Next Paint',
  };
  return labels[name] || name;
};

const getRatingColor = (rating: string): string => {
  switch (rating) {
    case 'good':
      return '#22c55e';
    case 'needs-improvement':
      return '#f59e0b';
    case 'poor':
      return '#ef4444';
    default:
      return '#6b7280';
  }
};

const getRating = (metricName: string, value: number): string => {
  const thresholds: Record<string, { good: number; poor: number }> = {
    cls: { good: 0.1, poor: 0.25 },
    fid: { good: 100, poor: 300 },
    fcp: { good: 1800, poor: 3000 },
    lcp: { good: 2500, poor: 4000 },
    ttfb: { good: 800, poor: 1800 },
    inp: { good: 200, poor: 500 },
  };

  const threshold = thresholds[metricName];
  if (!threshold) return 'unknown';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
};

export function usePerformanceMonitor() {
  onMounted(() => {
    try {
      onCLS(reportMetric);
      onFCP(reportMetric);
      onLCP(reportMetric);
      onTTFB(reportMetric);
      onINP(reportMetric);

      if (import.meta.env.DEV) {
        console.log(
          '%c[Performance Monitor] Web Vitals monitoring started',
          'color: #3b82f6; font-weight: bold;'
        );

        setTimeout(() => {
          console.table({
            'Core Web Vitals': {
              LCP: metrics.lcp ? `${metrics.lcp.toFixed(0)}ms` : 'pending',
              INP: metrics.inp ? `${metrics.inp.toFixed(0)}ms` : 'pending',
              CLS: metrics.cls !== null ? metrics.cls.toFixed(3) : 'pending',
            },
            'Other Metrics': {
              FCP: metrics.fcp ? `${metrics.fcp.toFixed(0)}ms` : 'pending',
              TTFB: metrics.ttfb ? `${metrics.ttfb.toFixed(0)}ms` : 'pending',
            },
          });
        }, 5000);
      }
    } catch (error) {
      console.warn('[Performance Monitor] Failed to initialize:', error);
    }
  });

  return {
    metrics,
  };
}
