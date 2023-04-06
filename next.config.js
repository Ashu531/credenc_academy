/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'akamai',
    path: '..',
    domains:['credenc-neo-bank.s3.amazonaws.com']
  },
  trailingSlash: true,
  generateBuildId: async () => {
    // Return custom build ID, like the latest git commit hash
    return 'my-build-id'
  }
}

module.exports = nextConfig

