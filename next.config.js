/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   env: {
//     backendURL: 'http://localhost:4000'
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'http',
//         hostname: '**'
//       }
//     ]
//   }
// }
const nextConfig = {
  reactStrictMode: true,
  env: {
    backendURL: 'https://www.hepyshop.bernatto.xyz'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  }
}

module.exports = nextConfig
