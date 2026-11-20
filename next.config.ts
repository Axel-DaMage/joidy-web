import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Configured for Vercel deployment (serverless API routes enabled)
  images: {
    unoptimized: true,
  },
  // Guarantee the .mdx sources ship inside the /docs serverless function trace.
  outputFileTracingIncludes: {
    '/docs/\\[\\[\\.\\.\\.slug\\]\\]': ['./docs/**/*.mdx'],
  },
};

export default nextConfig;