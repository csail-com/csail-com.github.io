import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  devIndicators: false,
  compiler: {
    emotion: true,
  },

  images: {
    unoptimized: true,
    domains: [
      "imagedelivery.net",
      "res.cloudinary.com",
      "pub-2e63a72027b44c8182fd5b5ffdcf2a69.r2.dev",
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [428, 600, 768, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  webpack: (config, { isServer }) => {
    // 클라이언트 빌드에서 서버 전용 모듈을 제외
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        child_process: false,
        net: false,
        tls: false,
        sharp: false,
      };
    }

    return config;
  },

  async headers() {
    return [
      {
        // Matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
} as NextConfig;

const pwaConfig = {
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  publicExcludes: ["!favicons/**/*"],
};

export default withPWA(pwaConfig)(nextConfig);
