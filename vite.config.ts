import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';
import ViteSitemap from 'vite-plugin-sitemap';
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { resolve, join, extname } from 'path';
import type { IncomingMessage, ServerResponse } from 'http';
import type { ViteDevServer } from 'vite';
import type {
  RightPanelSection,
  PersonalWebsiteSection,
  ProjectSection,
} from './src/config/site.config';

const siteConfig = JSON.parse(
  readFileSync(resolve(__dirname, './src/config/site.config.json'), 'utf-8')
);
const domain = siteConfig.site.domain;

function getDynamicRoutes() {
  const urls: string[] = [];

  if (siteConfig.rightPanel?.sections) {
    siteConfig.rightPanel.sections.forEach((section: RightPanelSection) => {
      if (
        section.type === 'personalWebsites' &&
        section.enabled &&
        (section as PersonalWebsiteSection).items
      ) {
        (section as PersonalWebsiteSection).items.forEach((item) => {
          if (item.url && !item.url.startsWith('http')) {
            urls.push(item.url);
          }
        });
      }
      if (section.type === 'projects' && section.enabled && (section as ProjectSection).items) {
        (section as ProjectSection).items.forEach((item) => {
          if (item.url && !item.url.startsWith('http')) {
            urls.push(item.url);
          }
        });
      }
    });
  }

  return urls;
}

function getUptimeKumaCspOrigin() {
  const section = siteConfig.rightPanel?.sections?.find(
    (s: RightPanelSection) => s.type === 'uptimeKuma'
  ) as { url?: string } | undefined;
  if (!section?.url) return '';
  try {
    return ` ${new URL(section.url).origin}`;
  } catch {
    return '';
  }
}

function cspPlugin() {
  return {
    name: 'csp-plugin',
    transformIndexHtml(html: string) {
      return html.replace('__UPTIME_KUMA_CSP__', getUptimeKumaCspOrigin());
    },
  };
}

function iconBundlePlugin() {
  const virtualModuleId = 'virtual:icon-bundle';
  const resolvedId = '\0' + virtualModuleId;

  const walkDir = (dir: string, files: string[] = []): string[] => {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = join(dir, entry.name);
      if (entry.isDirectory() && entry.name !== 'node_modules' && !entry.name.startsWith('.')) {
        walkDir(full, files);
      } else if (entry.isFile() && ['.vue', '.ts', '.json'].includes(extname(entry.name))) {
        files.push(full);
      }
    }
    return files;
  };

  return {
    name: 'icon-bundle',
    resolveId(id: string) {
      if (id === virtualModuleId) return resolvedId;
    },
    async load(id: string) {
      if (id !== resolvedId) return;

      const srcDir = resolve(__dirname, 'src');
      const files = walkDir(srcDir);

      const mdiSet = new Set<string>();
      const mingcuteSet = new Set<string>();
      const RE = /icon="(mdi|mingcute):([^"]+)"/g;

      for (const file of files) {
        const content = readFileSync(file, 'utf-8');
        for (const [, prefix, name] of content.matchAll(RE)) {
          (prefix === 'mdi' ? mdiSet : mingcuteSet).add(name);
        }
      }

      const { getIcons } = await import('@iconify/utils');

      let code = `import { addCollection } from '@iconify/vue';\n`;

      if (mdiSet.size > 0) {
        const mdiFull = JSON.parse(
          readFileSync(resolve(__dirname, 'node_modules/@iconify-json/mdi/icons.json'), 'utf-8')
        );
        const filtered = getIcons(mdiFull, [...mdiSet]);
        if (filtered) code += `addCollection(${JSON.stringify(filtered)});\n`;
      }

      if (mingcuteSet.size > 0) {
        const mgFull = JSON.parse(
          readFileSync(
            resolve(__dirname, 'node_modules/@iconify-json/mingcute/icons.json'),
            'utf-8'
          )
        );
        const filtered = getIcons(mgFull, [...mingcuteSet]);
        if (filtered) code += `addCollection(${JSON.stringify(filtered)});\n`;
      }

      return code;
    },
  };
}

function robotsTxtPlugin() {
  const robotsContent = `# robots.txt for homepage
# https://www.robotstxt.org/
# Last updated: ${new Date().toISOString().split('T')[0]}

# 允许所有搜索引擎抓取
User-agent: *
Allow: /

# Sitemap location
Sitemap: ${domain}/sitemap.xml

# Crawl-delay for polite crawling (秒)
Crawl-delay: 1

# 禁止抓取的路径（常见的不应被索引的路径）
Disallow: /admin/
Disallow: /private/
Disallow: /tmp/
Disallow: /.git/
Disallow: /node_modules/

# 允许抓取静态资源（CSS、JS、图片等）
Allow: /assets/*.css$
Allow: /assets/*.js$
Allow: /assets/*.png$
Allow: /assets/*.jpg$
Allow: /assets/*.svg$
Allow: /assets/*.woff2$

# 针对特定爬虫的特殊规则
# Googlebot
User-agent: Googlebot
Allow: /
Crawl-delay: 1

# Bingbot
User-agent: Bingbot
Allow: /
Crawl-delay: 1

# Baiduspider (百度蜘蛛)
User-agent: Baiduspider
Allow: /
Crawl-delay: 10

# 禁止恶意爬虫
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: MJ12bot
Disallow: /
`;

  return {
    name: 'robots-txt-plugin',
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/robots.txt', (_req: IncomingMessage, res: ServerResponse) => {
        res.setHeader('Content-Type', 'text/plain');
        res.end(robotsContent);
      });
    },
    writeBundle() {
      writeFileSync(resolve(__dirname, 'dist/robots.txt'), robotsContent);
    },
  };
}

function seoInjectPlugin() {
  const replaceTemplate = (template: string, profile: typeof siteConfig.profile) =>
    template
      .replace(/{name}/g, profile.name)
      .replace(/{bio}/g, profile.bio)
      .replace(/{occupation}/g, profile.occupation || '');

  const title = replaceTemplate(siteConfig.site.title || '{name} - 个人主页', siteConfig.profile);

  const parts: string[] = [];
  if (siteConfig.profile.bio) parts.push(siteConfig.profile.bio);
  if (siteConfig.profile.description) {
    if (Array.isArray(siteConfig.profile.description))
      parts.push(...siteConfig.profile.description);
    else parts.push(siteConfig.profile.description);
  }
  let description = parts.join(' ').replace(/\s+/g, ' ').trim();
  if (description.length > 160) description = description.slice(0, 157).trim() + '...';

  const keywordsSet = new Set<string>();
  if (siteConfig.profile.keywords)
    siteConfig.profile.keywords.forEach((k: string) => keywordsSet.add(k.trim().toLowerCase()));
  if (siteConfig.profile.name)
    siteConfig.profile.name.split(/[\s,，]+/).forEach((w: string) => {
      const c = w.trim().toLowerCase();
      if (c.length > 1) keywordsSet.add(c);
    });
  if (siteConfig.profile.occupation)
    siteConfig.profile.occupation.split(/[\s,，、]+/).forEach((w: string) => {
      const c = w.trim().toLowerCase();
      if (c.length > 1) keywordsSet.add(c);
    });
  const skillsSection = siteConfig.rightPanel?.sections?.find(
    (s: any) => s.type === 'skills' && s.enabled
  ) as any;
  if (skillsSection?.items)
    skillsSection.items.forEach((skill: any) => {
      const c = skill.name?.trim().toLowerCase();
      if (c) keywordsSet.add(c);
    });
  const keywords = Array.from(keywordsSet).slice(0, 15).join(', ');

  const author = siteConfig.profile.name;
  const ogImage = siteConfig.seo?.ogImage || siteConfig.profile.avatar;
  const canonicalUrl = siteConfig.site.domain;

  return {
    name: 'seo-inject-plugin',
    transformIndexHtml(html: string) {
      return html
        .replace(/__SEO_TITLE__/g, title)
        .replace(/__SEO_DESCRIPTION__/g, description)
        .replace(/__SEO_KEYWORDS__/g, keywords)
        .replace(/__SEO_AUTHOR__/g, author)
        .replace(/__SEO_OG_IMAGE__/g, ogImage)
        .replace(/__SEO_TWITTER_IMAGE__/g, ogImage)
        .replace(/__SEO_CANONICAL__/g, canonicalUrl)
        .replace(/__SEO_HREFLANG_URL__/g, canonicalUrl);
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    seoInjectPlugin(),
    robotsTxtPlugin(),
    cspPlugin(),
    iconBundlePlugin(),
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
