/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This disables ESLint during builds in production!
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
