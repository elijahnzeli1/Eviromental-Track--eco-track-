/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ['framer-motion'],
    webpack: (config) => {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "fs": false,
        "net": false,
        "tls": false,
      };
      return config;
    },
  }
  
  module.exports = nextConfig