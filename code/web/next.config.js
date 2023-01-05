/** @type {import('next').NextConfig} */
const { withPlausibleProxy } = require('next-plausible')
const path = require('path')

const nextConfig = withPlausibleProxy()({
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
})

module.exports = nextConfig
