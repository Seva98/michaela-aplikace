// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    dynamicIO: true,
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ej0tkojpfooka52y.public.blob.vercel-storage.com',
        port: '',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
