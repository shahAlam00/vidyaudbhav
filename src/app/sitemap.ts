import { MetadataRoute } from 'next';
import { getActiveColleges } from '@/lib/colleges';
import { getActiveBlogs } from '@/lib/Blogs';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://vidyaudbhav.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/colleges`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/our-counsellors`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/login`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/signup`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Dynamic college routes
  let collegeRoutes: MetadataRoute.Sitemap = [];
  if (process.env.NODE_ENV === 'production') {
    try {
      const collegesResponse = await getActiveColleges({ limit: 1000 });
      if (collegesResponse.success && collegesResponse.colleges) {
        collegeRoutes = collegesResponse.colleges.map((college: any) => ({
          url: `${BASE_URL}/colleges/${college.slug}`,
          lastModified: college.updatedAt || college.createdAt ? new Date(college.updatedAt || college.createdAt) : new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        }));
      }
    } catch (error) {
      console.error('Error fetching colleges for sitemap:', error);
    }
  }

  // Dynamic blog routes
  let blogRoutes: MetadataRoute.Sitemap = [];
  if (process.env.NODE_ENV === 'production') {
    try {
      const blogsResponse = await getActiveBlogs();
      if (blogsResponse.success && blogsResponse.blogs) {
        blogRoutes = blogsResponse.blogs.map((blog: any) => ({
          url: `${BASE_URL}/blogs/${blog.slug}`,
          lastModified: blog.updatedAt || blog.createdAt ? new Date(blog.updatedAt || blog.createdAt) : new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.6,
        }));
      }
    } catch (error) {
      console.error('Error fetching blogs for sitemap:', error);
    }
  }

  return [...staticRoutes, ...collegeRoutes, ...blogRoutes];
}