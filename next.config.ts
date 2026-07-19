import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Configured for Vercel deployment (serverless API routes enabled)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;