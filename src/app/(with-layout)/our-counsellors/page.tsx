import CounsellorCard from "@/components/counsellor/CounsellorCard";
import CounsellorWrapper from "@/components/counsellor/CounsellorWrapper";
import { getActiveCounsellors } from "@/lib/counsellor";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Our Counsellors | Expert Guidance",
    description:
      "Meet our experienced counsellors offering career guidance, and professional counselling to help you achieve clarity and success.",
    keywords: [
      "our counsellors",
      "career counsellors",
      "professional counselling",
      "career guidance experts",
      "online counselling services",
    ],
    openGraph: {
      title: "Our Counsellors | Expert Guidance",
      description:
        "Connect with certified counsellors providing personalized career and  wellness guidance.",
      url: "https://vidyaudbhav.com/our-counsellors",
      siteName: "Vidya Udbhav",
      images: [
        {
          url: "https://vidyaudbhav.com/logo.png",
          width: 1200,
          height: 630,
          alt: "Our Professional Counsellors",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Our Counsellors | Expert Guidance",
      description:
        "Explore our panel of expert counsellors for career and wellness support.",
      images: ["https://vidyaudbhav.com/logo.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: "https://vidyaudbhav.com/our-counsellors",
    }
  };
};



export default async function CounsellorsPage() {


  return (
   <CounsellorWrapper/>
  );
}
