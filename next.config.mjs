/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Bypass Vercel's Image Optimization endpoint — Hobby-plan quota
    // was exhausted and /_next/image?... started returning 402 Payment
    // Required, breaking every hero on the deployed site. Source assets
    // in /public are already pre-compressed WebPs (<100 KB), so serving
    // them directly costs nothing in bandwidth or paint time.
    unoptimized: true,
    // Only picsum is allowed — the SafeImage fallback when a local file is
    // missing. Unsplash and Pexels are deliberately excluded so no stock
    // imagery can slip into the site.
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" }
    ]
  },
  experimental: {
    optimizePackageImports: ["framer-motion"]
  }
};

export default nextConfig;
