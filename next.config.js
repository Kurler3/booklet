/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    PROD_BASE_URL: process.env.PROD_BASE_URL,
  }
}

module.exports = nextConfig
