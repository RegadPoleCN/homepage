let loaded = false;

export function loadBusuanzi(): void {
  if (loaded || typeof window === 'undefined') return;
  loaded = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://cdn.busuanzi.cc/busuanzi/3.6.9/busuanzi.min.js';
  document.head.appendChild(script);
}
