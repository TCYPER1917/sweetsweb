import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // حل مشكلة توافقية jsdom مع خوادم Vercel السحابية
  serverExternalPackages: ["jsdom"],
};

export default nextConfig;