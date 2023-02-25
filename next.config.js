const basePath =
  process.env.NODE_ENV === "production"
    ? "/role-picker-referring-to-party-animals"
    : "";
const assetPrefix =
  process.env.NODE_ENV === "production"
    ? "/role-picker-referring-to-party-animals"
    : "/";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: basePath,
  assetPrefix: assetPrefix,
};

module.exports = nextConfig;
