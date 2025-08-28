import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "picsum.photos" },
      { hostname: "placeholder.pics" },
      { hostname: "cdn.dummyjson.com" },
      { hostname: "futuramaapi.com" },
      { hostname: "raw.githubusercontent.com" },
    ],
  },
};

export default nextConfig;
