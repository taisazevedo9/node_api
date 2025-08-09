/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Ativa o modo estrito do React
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333", // URL do backend
  },
};

module.exports = nextConfig;
