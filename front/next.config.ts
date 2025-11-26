import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rwyetnkhzgyxneonyzeg.supabase.co',
        pathname: '/storage/v1/object/public/images/**'
      }
    ]
  }
};

export default nextConfig;
