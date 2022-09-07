/** @type {import('next').NextConfig} */
const withImages = require("next-images");
const nextConfig = withImages({
  reactStrictMode: true,
  images: {
    loader: "akamai",
    path: '',
    domains: ['credenc-neo-bank.s3.amazonaws.com'],
  },
  trailingSlash: true,
})

module.exports = nextConfig

