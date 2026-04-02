import BlogWrapper from "@/components/blogs/BlogWrapper";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Blogs | Career, Education & Mental Wellness Insights",
    description:
      "Read expert blogs on career guidance, education trends, mental wellness, and personal growth curated by professional counsellors.",
    keywords: [
      "career blogs",
      "education blogs",
      "mental health blogs",
      "career guidance articles",
      "student counselling blogs",
      "professional advice blogs",
    ],
    openGraph: {
      title: "Blogs | Career, Education & Mental Wellness Insights",
      description:
        "Explore informative blogs written by experts on career development, education, and mental wellbeing.",
      url: "https://vidyaudbhav.com/blogs",
      siteName: "Vidya Udbhav",
      images: [
        {
          url: "https://vidyaudbhav.com/logo.png",
          width: 1200,
          height: 630,
          alt: "Career & Education Blogs",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Blogs | Career & Education Insights",
      description:
        "Stay informed with expert-written blogs on careers, education, and mental wellness.",
      images: ["https://vidyaudbhav.com/logo.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: "https://vidyaudbhav.com/blogs",
    },
  };
};

const page = async () => {
  return <BlogWrapper />;
};

export default page;
