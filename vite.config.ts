import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';
import ViteSitemap from 'vite-plugin-sitemap';
import { resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';

const siteConfig = JSON.parse(
  readFileSync(resolve(__dirname, './src/config/site.config.json'), 'utf-8')
);
const domain = siteConfig.site.domain;

function getDynamicRoutes() {
  const urls: string[] = [];

  if (siteConfig.rightPanel?.sections) {
    siteConfig.rightPanel.sections.forEach((section: any) => {
      if (section.type === 'personalWebsites' && section.enabled && section.items) {
        section.items.forEach((item: any) => {
          if (item.url && !item.url.startsWith('http')) {
            urls.push(item.url);
          }
        });
      }
      if (section.type === 'projects' && section.enabled && section.items) {
        section.items.forEach((item: any) => {
          if (item.url && !item.url.startsWith('http')) {
            urls.push(item.url);
          }
        });
      }
    });
  }

  return urls;
}

function robotsTxtPlugin() {
  return {
    name: 'robots-txt-plugin',
    writeBundle() {
      const robotsContent = `# robots.txt for homepage
# https://www.robotstxt.org/

User-agent: *
Allow: /

# Sitemap location
Sitemap: ${domain}/sitemap.xml

# Crawl-delay for polite crawling (optional)
Crawl-delay: 1

# Disallow common paths that shouldn't be indexed
Disallow: /admin/
Disallow: /private/
Disallow: /tmp/
Disallow: /assets/
`;
      writeFileSync(resolve(__dirname, 'dist/robots.txt'), robotsContent);
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    robotsTxtPlugin(),
    ViteSitemap({
      hostname: domain,
      dynamicRoutes: getDynamicRoutes(),
      changefreq: 'weekly',
      priority: 0.5,
      lastmod: new Date(),
      outDir: 'dist',
      generateRobotsTxt: false,
    }),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifest: {
        name: 'Homepage',
        short_name: 'Homepage',
        description: '个人主页',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: './',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
          {
            urlPattern: /\.(?:js|css)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'pinia'],
          iconify: ['@iconify/vue'],
          vueuse: ['@vueuse/core'],
        },
      },
    },
  },
  server: {
    port: 5173,
    strictPort: false,
  },
});
