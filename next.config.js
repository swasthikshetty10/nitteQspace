/** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */
const nextConfig = {

  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ['src'],
    ignoreDuringBuilds: true,
  },
  //Uncoment to add domain whitelist
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },]
  },

  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
