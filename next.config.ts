import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloud / preview browsers often hit the app via 127.0.0.1.
  // Without this, Next blocks HMR/dev assets and client hydration can stall.
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
