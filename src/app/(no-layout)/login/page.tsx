import LoginWrapper from "@/components/login/LoginWrapper";
import { Metadata } from "next";
import React from "react";

export const generateMetadata = (): Metadata => {
  return {
    title: "Vidya Udbhav Login | Student & Career Guidance Portal",
    description:
      "Login to your Vidya Udbhav account to access your student dashboard, career guidance tools, applications, and education resources.",
    keywords: [
      "vidya udbhav login",
      "student career dashboard login",
      "career guidance portal login",
      "education portal india login",
      "vidya udbhav student login",
      "career counselling dashboard",
      "academic guidance portal",
    ],
    openGraph: {
      title: "Login to Vidya Udbhav",
      description:
        "Secure login for students to access personalized career and education dashboards.",
      url: "https://vidyaudbhav.com/login",
      siteName: "Vidya Udbhav",
      images: [
        {
          url: "https://vidyaudbhav.com/logo.png",
          width: 1200,
          height: 630,
          alt: "Vidya Udbhav Login Page",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Vidya Udbhav Login",
      description:
        "Access your Vidya Udbhav student dashboard and career guidance tools.",
      images: ["https://vidyaudbhav.com/logo.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: "https://vidyaudbhav.com/login",
    },
  };
};

const page = () => {
  return <LoginWrapper />;
};

export default page;
