import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
  basePath: '/jikji',
  assetPrefix: '/jikji/',
  transpilePackages: ['motion'],
};

export default nextConfig;
