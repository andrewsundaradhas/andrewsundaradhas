/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
