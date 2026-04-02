import SignupWrapper from '@/components/signup/SignupWrapper'
import { Metadata } from "next";
import React from 'react'

export const generateMetadata = (): Metadata => {
  return {
    title: "Join Vidya Udbhav | Start Your Career & Education Journey",
    description:
      "Create your Vidya Udbhav account to access personalized career roadmaps, college application tracking, and expert-led educational resources.",
    keywords: [
      "create career account",
      "student registration portal",
      "join education community",
      "career planning for students",
      "apply for college guidance",
      "Vidya Udbhav signup",
      "professional growth platform India",
    ],
    openGraph: {
      title: "Sign Up | Vidya Udbhav - Empowering Your Future",
      description:
        "Register today to unlock expert-curated career pathways and educational success tools.",
      url: "https://vidyaudbhav.com/signup",
      siteName: "Vidya Udbhav",
      images: [
        {
          url: "https://vidyaudbhav.com/logo.png",
          width: 1200,
          height: 630,
          alt: "Join Vidya Udbhav Career Portal",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Sign Up for Vidya Udbhav",
      description: "Start your journey toward academic and professional excellence.",
      images: ["https://vidyaudbhav.com/logo.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: "https://vidyaudbhav.com/signup",
    },
  };
};

const page = () => {
  return <SignupWrapper />;
};

export default page;