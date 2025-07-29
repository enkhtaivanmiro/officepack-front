import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['mn', 'en'],
  localePrefix: 'as-needed',
  defaultLocale: 'mn',
  localeDetection: false,
  localeCookie: true,
});
