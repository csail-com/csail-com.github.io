import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  compiler: {
    emotion: true,
  },
};

export default nextConfig;
