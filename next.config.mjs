// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    dynamicIO: true,
    ppr: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '550kvdepudy74wng.public.blob.vercel-storage.com',
        port: '',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
