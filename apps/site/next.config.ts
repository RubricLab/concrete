import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@concrete/ui', '@concrete/tokens'],
};

export default nextConfig;
