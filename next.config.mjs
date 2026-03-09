/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/my-portfolio',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
}

export default nextConfig
