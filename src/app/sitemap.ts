import { MetadataRoute } from 'next';
import { getAllSlugs } from '@/lib/blog/mdx';
import { routing } from '@/i18n/routing';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://asociacionanae.org';

// Static pages configuration with priorities
// Priority: 1.0 = Most important, 0.5 = Less important
// Pages with lower priority (privacy, cookies) are still included but ranked lower
const staticPages = [
  { path: '', priority: 1.0, changeFrequency: 'daily' as const }, // Homepage - Most important
  { path: '/about', priority: 0.9, changeFrequency: 'monthly' as const }, // About - Very important
  { path: '/about/gallery', priority: 0.8, changeFrequency: 'weekly' as const }, // Gallery - Important
  { path: '/blog', priority: 0.9, changeFrequency: 'daily' as const }, // Blog listing - Very important
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const }, // Contact - Important
  { path: '/faq', priority: 0.7, changeFrequency: 'monthly' as const }, // FAQ - Useful
  { path: '/privacy', priority: 0.5, changeFrequency: 'yearly' as const }, // Privacy - Legal requirement
  { path: '/cookies', priority: 0.5, changeFrequency: 'yearly' as const }, // Cookies - Legal requirement
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = routing.locales;
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Get current date for lastModified
  const currentDate = new Date();

  // Add static pages for each locale
  for (const locale of locales) {
    for (const page of staticPages) {
      sitemapEntries.push({
        url: `${SITE_URL}/${locale}${page.path}`,
        lastModified: currentDate,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((loc) => [`${loc}`, `${SITE_URL}/${loc}${page.path}`])
          ),
        },
      });
    }

    // Add blog posts for each locale
    try {
      const slugs = await getAllSlugs(locale);
      for (const slug of slugs) {
        const encodedSlug = encodeURIComponent(slug);
        sitemapEntries.push({
          url: `${SITE_URL}/${locale}/blog/${encodedSlug}`,
          lastModified: currentDate,
          changeFrequency: 'monthly',
          priority: 0.7,
          alternates: {
            languages: Object.fromEntries(
              locales.map((loc) => {
                // Check if this blog post exists in other locales
                // For now, we'll include all locales, but you could filter
                return [`${loc}`, `${SITE_URL}/${loc}/blog/${encodedSlug}`];
              })
            ),
          },
        });
      }
    } catch (error) {
      // If blog directory doesn't exist or there's an error, continue
      console.warn('Error fetching blog slugs:', error);
    }
  }

  return sitemapEntries;
}

