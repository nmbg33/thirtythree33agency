/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons']
  },
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com']
  },
  webpack: (config) => {
    // GSAP configuration
    config.resolve.alias = {
      ...config.resolve.alias,
      'gsap/dist/gsap': 'gsap/dist/gsap.js',
    };
    return config;
  }
};

module.exports = nextConfig;
