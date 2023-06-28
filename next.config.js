/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "stream-wise-bucket.s3.eu-central-1.amazonaws.com",
        pathname: "/**",
      },
    ],
    domains: ["www.figma.com"],
  },
};

module.exports = nextConfig;
