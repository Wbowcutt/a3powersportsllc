import type { NextConfig } from "next";

const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://app.cal.com https://cal.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cal.com https://*.cal.com https://app.cal.com",
  "font-src 'self' data:",
  "connect-src 'self' https://app.cal.com https://cal.com https://*.cal.com wss://*.cal.com https://api.stripe.com",
  "frame-src https://cal.com https://*.cal.com https://app.cal.com https://checkout.stripe.com https://js.stripe.com",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
