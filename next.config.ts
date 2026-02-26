import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://ecommerce.routemisr.com/*/**")],
    unoptimized: true,
  },
};

export default withBundleAnalyzer(nextConfig);
