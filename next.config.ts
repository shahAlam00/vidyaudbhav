import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Unsplash (already present)
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },

      // ImageKit CDN
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
      },
    ],
  },
};

export default nextConfig;
