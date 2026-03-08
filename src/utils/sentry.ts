import * as Sentry from '@sentry/vue'
import type { App } from 'vue'

export function initSentry(app: App) {
  const isDev = import.meta.env.DEV
  const dsn = import.meta.env.VITE_SENTRY_DSN

  if (!isDev && dsn) {
    Sentry.init({
      app,
      dsn,
      environment: import.meta.env.MODE,
      tracesSampleRate: 1.0,
    })
  }
}
