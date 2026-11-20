import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { DOCS_INDEX } from '@/lib/docs';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/docs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...DOCS_INDEX.map((doc) => ({
      url: `${SITE_URL}/docs/${doc.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
