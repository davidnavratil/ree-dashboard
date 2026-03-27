import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/ree-dashboard',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
