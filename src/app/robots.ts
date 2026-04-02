import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vidyaudbhav.com'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/user/', '/api/', '/_next/', '/admin/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}