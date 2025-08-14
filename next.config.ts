import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    domains: ['cdn-icons-png.freepik.com'],
  },
   eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
