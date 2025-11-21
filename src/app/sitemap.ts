import { MetadataRoute } from 'next';
import { locales } from '@/lib/metadata';
import { getAllSlugs } from '@/lib/blog';
import { getPathname } from '@/i18n/navigation';
import fs from 'fs';
import path from 'path';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://asociacionanae.org';

/**
 * Recursively find all page.tsx files in a directory
 * Returns the routes relative to [locale] directory
 */
function findPages(dir: string, basePath: string = ''): string[] {
  const routes: string[] = [];
  
  if (!fs.existsSync(dir)) {
    return routes;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const routePath = basePath ? `${basePath}/${entry.name}` : `/${entry.name}`;

    if (entry.isDirectory()) {
      // Skip dynamic route folders like [slug]
      if (entry.name.startsWith('[') && entry.name.endsWith(']')) {
        continue;
      }
      
      // Recursively search in subdirectories
      const subRoutes = findPages(fullPath, routePath);
      routes.push(...subRoutes);
    } else if (entry.name === 'page.tsx') {
      // Found a page, add the route
      routes.push(basePath || '');
    }
  }

  return routes;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap: MetadataRoute.Sitemap = [];
  const localeDir = path.join(process.cwd(), 'src', 'app', '[locale]');

  // Find all static pages
  const staticRoutes = findPages(localeDir);

  // Add static routes for each locale using next-intl's getPathname
  for (const route of staticRoutes) {
    for (const locale of locales) {
      const pathname = await getPathname({ locale, href: route || '/' });
      sitemap.push({
        url: `${SITE_URL}${pathname}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
      });
    }
  }

  // Add dynamic blog routes for each locale
  for (const locale of locales) {
    const blogSlugs = await getAllSlugs(locale);
    for (const slug of blogSlugs) {
      const pathname = await getPathname({ 
        locale, 
        href: `/blog/${slug}` 
      });
      sitemap.push({
        url: `${SITE_URL}${pathname}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  }

  return sitemap;
}
