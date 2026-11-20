import type { NextConfig } from 'next';

const isDev = process.env.NODE_ENV === 'development';

// 'unsafe-inline' is required for Next.js hydration/streaming inline scripts
// (self.__next_f.push chunks) since there is no per-request nonce pipeline.
// 'unsafe-eval' is only needed in development, where React uses eval for
// server-side stack reconstruction. External origins allowed:
// - va.vercel-scripts.com: Vercel Analytics / Speed Insights script fallback
//   when not served through the same-origin /_vercel/* proxy paths.
// - vitals.vercel-insights.com: Speed Insights vitals beacon endpoint.
// - fonts.googleapis.com: stylesheet @import'ed in globals.css (Fira Code).
// - fonts.gstatic.com: font files served by Google Fonts.
// - avatars.githubusercontent.com: GitHub user avatars in the Roadmap section.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${
    isDev ? " 'unsafe-eval'" : ''
  } va.vercel-scripts.com vitals.vercel-insights.com`,
  "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
  "font-src 'self' fonts.gstatic.com data:",
  "img-src 'self' data: avatars.githubusercontent.com",
  "connect-src 'self' vitals.vercel-insights.com va.vercel-scripts.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: contentSecurityPolicy,
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

const nextConfig: NextConfig = {
  // Configured for Vercel deployment (serverless API routes enabled)
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  // Guarantee the .mdx sources ship inside the /docs serverless function trace.
  outputFileTracingIncludes: {
    '/docs/\\[\\[\\.\\.\\.slug\\]\\]': ['./docs/**/*.mdx'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
