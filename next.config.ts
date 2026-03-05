import type {NextConfig} from 'next';

const isGithubPages = process.env.GITHUB_PAGES === 'true';

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
  basePath: isGithubPages ? '/jikji' : '',
  assetPrefix: isGithubPages ? '/jikji/' : '',
  transpilePackages: ['motion'],
};

export default nextConfig;
