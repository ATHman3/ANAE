import { MetadataRoute } from 'next';
import { locales } from '@/lib/metadata';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://asociacionanae.org';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/contact',
    '/events',
    '/news',
    '/blog',
    '/faq',
    '/privacy',
    '/cookies',
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // Add main routes for each locale
  routes.forEach((route) => {
    locales.forEach((locale) => {
      sitemap.push({
        url: `${SITE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
      });
    });
  });

  return sitemap;
}
