import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://aptly.co';
  
  const routes = [
    '',
    '/about',
    '/courses',
    '/study-app',
    '/services',
    '/insights',
    '/faq',
    '/careers',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly' as const,
    priority: route === '' ? 1 : route === '/study-app' || route === '/courses' ? 0.9 : 0.8,
  }));
}