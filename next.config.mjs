// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.theparcel.com.ng/api/v1/:path*', // Proxy to API
      },
    ];
  },
  images: {
    domains: ["images.unsplash.com"], // 👈 add allowed image domains here
  },
};

export default nextConfig;
