import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const staticPages = [
    '',
    '/marketplace',
    '/drops',
    '/pricing',
    '/signin',
    '/dashboard',
    '/developers',
    '/support',
  ]
  const images = Array.from({ length: 12 }).map((_, i) => `/image/${i + 1}`)
  const all = [...staticPages, ...images]
  const now = new Date()
  return all.map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: p.startsWith('/image/') ? 0.6 : 0.8,
  }))
}
