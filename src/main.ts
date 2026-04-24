import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from './App.vue';
import { initSentry } from './utils/sentry';
import { siteConfig } from './config/site.config';
import { generateSEO, getOgImage, getTwitterImage } from './utils/seoGenerator';
import { useStructuredData } from './composables/useStructuredData';

const app = createApp(App);
const pinia = createPinia();

initSentry(app);

const isDev = import.meta.env.DEV;

app.config.errorHandler = (err, instance, info) => {
  if (isDev) {
    console.error('[Vue Error Captured]:', {
      error: err,
      componentInstance: instance,
      errorSource: info,
    });
  } else {
    if (import.meta.env.VITE_SENTRY_DSN) {
      import('@sentry/vue').then((Sentry) => {
        Sentry.captureException(err, {
          extra: {
            instance,
            info,
          },
        });
      });
    }
  }
};

function updateMetaTags() {
  const seo = generateSEO(siteConfig);
  const baseUrl = window.location.origin;

  document.title = seo.title;

  const setMetaContent = (selector: string, content: string) => {
    const element = document.querySelector(selector);
    if (element) {
      element.setAttribute('content', content);
    }
  };

  const setLinkHref = (selector: string, href: string) => {
    const element = document.querySelector(selector);
    if (element) {
      element.setAttribute('href', href);
    }
  };

  setMetaContent('meta[name="description"]', seo.description);
  setMetaContent('meta[name="keywords"]', seo.keywords);
  setMetaContent('meta[name="author"]', siteConfig.profile.name);

  setMetaContent('meta[property="og:title"]', seo.title);
  setMetaContent('meta[property="og:description"]', seo.description);
  setMetaContent('meta[property="og:image"]', getOgImage(siteConfig));
  setMetaContent('meta[property="og:url"]', baseUrl);

  setMetaContent('meta[name="twitter:title"]', seo.title);
  setMetaContent('meta[name="twitter:description"]', seo.description);
  setMetaContent('meta[name="twitter:image"]', getTwitterImage(siteConfig));

  setLinkHref('link[rel="canonical"]', baseUrl);

  // 添加结构化数据（多个 JSON-LD 类型）
  const { allStructuredData } = useStructuredData();

  const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
  existingScripts.forEach((script) => script.remove());

  allStructuredData.value.forEach((jsonData, index) => {
    const jsonLdScript = document.createElement('script');
    jsonLdScript.setAttribute('type', 'application/ld+json');
    jsonLdScript.id = `structured-data-${index}`;
    jsonLdScript.textContent = jsonData;
    document.head.appendChild(jsonLdScript);
  });
}

updateMetaTags();

app.use(pinia);
app.mount('#app');
