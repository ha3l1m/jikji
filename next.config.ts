import type {NextConfig} from 'next';

const isProd = process.env.NODE_ENV === 'production';

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
  basePath: isProd ? '/jikji' : '',
  assetPrefix: isProd ? '/jikji/' : '',
  transpilePackages: ['motion'],
};

export default nextConfig;
