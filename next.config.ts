import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "hm.imimg.com" },
      { protocol: "https", hostname: "*.imimg.com" as any },
      { protocol: "https", hostname: "content3.imimg.com" },
    ],
  },
};

export default nextConfig;
