// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.fl.yelpcdn.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
