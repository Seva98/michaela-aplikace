/** @type {import('next').NextConfig} */
const nextConfig = {
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
