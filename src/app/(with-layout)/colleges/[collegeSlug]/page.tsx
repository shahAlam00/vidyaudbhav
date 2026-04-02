import CollegeDetailsWrapper from "@/components/college/CollegeDetailsWrapper";
import { getCollegesBySlug } from "@/lib/colleges";
import { Metadata } from "next";
import React from "react";

type Props = {
  params: { collegeSlug: string };
};

// --- DYNAMIC METADATA GENERATION ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { collegeSlug } = await params;
  const { college } = await getCollegesBySlug(collegeSlug);

  if (!college) {
    return {
      title: "College Not Found",
    };
  }

  const title = college.seo?.title || college.name;
  const description = college.seo?.description || college.overview.description;
  const keywords = college.seo?.keywords || [];

  return {
    title: title,
    description: description,
    keywords: keywords.join(", "),
    openGraph: {
      title: title,
      description: description,
      url: `https://vidyaudbhav.com/colleges/${college.slug}`, // Replace with your domain
      siteName: "Vidya Udbhav",
      images: [
        {
          url: college.coverImage, // Main social image
          width: 1200,
          height: 630,
          alt: college.name,
        },
        {
          url: college.logo, // Secondary image
          width: 400,
          height: 400,
          alt: `${college.shortName} Logo`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [college.coverImage],
    },
    alternates: {
      canonical: `https://vidyaudbhav.com/colleges/${college.slug}`,
    },
  };
}

// --- PAGE COMPONENT ---
const page = async ({ params }: Props) => {
  const { collegeSlug } = await params;
  const { college } = await getCollegesBySlug(collegeSlug);

  if (!college) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">College not found</h1>
      </div>
    );
  }

  return <CollegeDetailsWrapper college={college} />;
};

export default page;