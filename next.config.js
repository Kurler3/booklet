/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_PROD_BASE_URL: "https://rainbow-malasada-f9d172.netlify.app",
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
            value: "POST, GET, PUT, PATCH, DELETE, OPTIONS, HEAD"
          },
          // {
          //   key: 'Content-Type',
          //   value: 'application/json'
          // }
        ]
      }
    ]
  }
}

module.exports = nextConfig
