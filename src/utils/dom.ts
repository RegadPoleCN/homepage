const DEFAULT_AVATAR = 'https://ui-avatars.com/api/?background=0D8ABC&color=fff&size=128';
const DEFAULT_ICON =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ccc"%3E%3Crect width="24" height="24" rx="4"/%3E%3C/svg%3E';

export { DEFAULT_AVATAR, DEFAULT_ICON };

export function handleImageError(event: Event, fallbackSrc: string = DEFAULT_AVATAR): void {
  const target = event.target;
  if (target && 'src' in target && target.src !== fallbackSrc) {
    target.src = fallbackSrc;
  }
}
