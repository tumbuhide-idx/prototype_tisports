import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* Core Config */
  reactCompiler: true, // Aktifkan React Compiler (Best Practice React 19)
  
  /* Images */
  images: {
    remotePatterns: [
      // Supabase Storage (ganti dengan project ID mu)
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      // Placeholder images (development only)
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  /* Vercel Analytics (optional) */
  // Uncomment jika pakai Vercel Analytics
  // experimental: {
  //   instrumentationHook: true,
  // },

  /* Redirects (optional) */
  async redirects() {
    return [
      // Example: redirect /home ke /
      // {
      //   source: '/home',
      //   destination: '/',
      //   permanent: true,
      // },
    ];
  },

  /* Headers (optional) */
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;