// next.config.mjs
import { createProxyMiddleware } from 'http-proxy-middleware';

export default {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://parcel.dolphjs.com/api/v1/:path*', // Proxy to API
      },
    ];
  },
};