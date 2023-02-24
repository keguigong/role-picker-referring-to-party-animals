const basePath = process.env.NODE_ENV === "production"
? "/role-picker-referring-to-party-animals"
: ""
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: basePath,
  assetPrefix: basePath,
};

module.exports = nextConfig;
