import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['ar', 'es', 'fr', 'en'], // Arabic first for RTL support

  // Used when no locale matches
  defaultLocale: 'es'
});