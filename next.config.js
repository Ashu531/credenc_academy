/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: "akamai",
    path: "",
    domains: ['https://credenc-neo-bank.com']
  },
  trailingSlash: true,
 
}

module.exports = nextConfig

