/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'akamai',
    path:'..',
    domains:['credenc-neo-bank.s3.amazonaws.com']
  },
  trailingSlash: true
}

module.exports = nextConfig

