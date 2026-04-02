import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import BackToTop from "@/components/layout/BackToTop";
import RegisterPopup from "@/components/ui/RegisterPopup";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vidyaudbhav.com"),

  title: {
    default: "Vidya Udbhav | Top College Admissions & Career Guidance 2026",
    template: "%s | Vidya Udbhav",
  },

  description:
    "Get direct admission in top colleges, expert career counselling, and scholarship support for 2026.",

  alternates: {
    canonical: "/",
  },

  verification: {
    google: "bLbBXXsuk1UGecJPC7C4BIgblK3rkD948r7Pyu1-_A0",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://vidyaudbhav.com",
    siteName: "Vidya Udbhav",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://vidyaudbhav.com/#organization",
        name: "Vidya Udbhav",
        url: "https://vidyaudbhav.com/",
        logo: "https://vidyaudbhav.com/logo.png",
      },
      {
        "@type": "WebSite",
        "@id": "https://vidyaudbhav.com/#website",
        url: "https://vidyaudbhav.com/",
        name: "Vidya Udbhav",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://vidyaudbhav.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        <ToastContainer position="top-right" autoClose={1000} theme="light" />
        <BackToTop />
        <RegisterPopup />
        <SpeedInsights />
      </body>
    </html>
  );
}
