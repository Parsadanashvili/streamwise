/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
  images: {
    domains: ["www.figma.com", "localhost"],
  },
};

module.exports = nextConfig;
