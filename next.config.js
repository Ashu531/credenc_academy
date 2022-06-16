/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  "plugins": [
    "inline-react-svg"
  ]
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     issuer: {
  //       test: /\.(js|ts)x?$/,
  //      // for webpack 5 use
  //      // { and: [/\.(js|ts)x?$/] }
  //     },
      
  //     use: ['@svgr/webpack'],
  //   });

  //   return config;
  // }
}

module.exports = nextConfig

