/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath:
    process.env.NODE_ENV === "production"
      ? "/role-picker-referring-to-party-animals"
      : "",
  reactStrictMode: true,
};

module.exports = nextConfig;
