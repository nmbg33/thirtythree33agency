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
      'gsap/ScrollTrigger': 'gsap/dist/ScrollTrigger.js',
      'gsap/SplitText': 'gsap/dist/SplitText.js',
    };

    // Handle GSAP modules
    config.module.rules.push({
      test: /\.js$/,
      include: /node_modules\/gsap/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['next/babel']
        }
      }
    });

    return config;
  },
  // Improve performance
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  }
};

export default nextConfig;
