/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_PROD_BASE_URL: process.env.NEXT_PUBLIC_PROD_BASE_URL,
  },
  headers: async () => {
    return [
      {
        source: '/api/graphql',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'POST, GET, OPTIONS, HEAD'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
