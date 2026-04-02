import BlogDetailsWrapper from "@/components/blog details/BlogDetailsWrapper";
import { getBlogBySlug } from "@/lib/Blogs";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    blogSlug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { blogSlug } = await params;
  const res = await getBlogBySlug(blogSlug);
  const blog = res?.blog;

  if (!blog) {
    return {
      title: 'Blog Not Found',
      description: 'The requested blog post could not be found.'
    };
  }

  const seo = blog.seo || {};
  const baseUrl =  'https://www.vidyaudbhav.com';
  const canonicalUrl = `${baseUrl}/blogs/${blogSlug}`;

  return {
    title: seo.metaTitle || blog.title,
    description: seo.metaDescription || blog.excerpt,
    keywords: seo.keywords?.join(', ') || blog.tags?.join(', '),
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: seo.metaTitle || blog.title,
      description: seo.metaDescription || blog.excerpt,
      url: canonicalUrl,
      type: 'article',
      images: blog.image?.url ? [{
        url: blog.image.url,
        width: 1200,
        height: 630,
        alt: blog.image.alt || blog.title
      }] : [],
      publishedTime: blog.publishedAt,
      authors: [blog.author?.name || 'Vidya Udbhav']
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.metaTitle || blog.title,
      description: seo.metaDescription || blog.excerpt,
      images: blog.image?.url ? [blog.image.url] : []
    },
    robots: {
      index: true,
      follow: true
    },
  
  };
}

const page = async ({ params }: PageProps) => {
  const { blogSlug } = await params;
  const res = await getBlogBySlug(blogSlug);
  
  if (!res?.blog) {
    notFound();
  }

  return <BlogDetailsWrapper blog={res.blog} />;
};

export default page;
