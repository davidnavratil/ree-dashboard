import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/analyses/ree-dashboard',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
