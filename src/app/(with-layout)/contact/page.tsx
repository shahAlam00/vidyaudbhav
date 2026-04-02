import ContactWrapper from "@/components/contact/ContactWrapper";
import React from "react";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Contact Us | Talk to Career & Mental Health Experts",
    description:
      "Get in touch with Vidya Udbhav for career counselling, mental health support, and academic guidance. We're here to help you.",
    keywords: [
      "contact vidya udbhav",
      "career counselling contact",
      "mental health support contact",
      "student guidance help",
      "online counselling contact",
    ],
    openGraph: {
      title: "Contact Us | Talk to Career & Mental Health Experts",
      description:
        "Reach out to our expert counsellors for personalized career and mental wellness support.",
      url: "https://vidyaudbhav.com/contact",
      siteName: "Vidya Udbhav",
      images: [
        {
          url: "https://vidyaudbhav.com/logo.png",
          width: 1200,
          height: 630,
          alt: "Contact Vidya Udbhav",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Contact Us | Vidya Udbhav",
      description:
        "Have questions? Contact our counsellors for expert career and mental health guidance.",
      images: ["https://vidyaudbhav.com/logo.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: "https://vidyaudbhav.com/contact",
    }
  };
};

const page = () => {
  return (
    <>
      <ContactWrapper />
    </>
  );
};

export default page;
