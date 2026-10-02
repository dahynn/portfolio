import type { NextConfig } from 'next';

const nextConfig: NextConfig = process.env.PORTFOLIO_PAGES === 'true'
  ? { output: 'export', trailingSlash: true }
  : {};

export default nextConfig;
