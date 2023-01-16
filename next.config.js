/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    backendURL: 'http://localhost:4000'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**'
      }
    ]
  }
}

module.exports = nextConfig
