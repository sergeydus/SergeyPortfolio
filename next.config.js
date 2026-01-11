/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/SergeyPortfolio',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
