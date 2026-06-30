/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [40, 75, 100],
    // Dev: cho phép ảnh từ localhost / IP LAN (khi test port hoặc nguồn local)
    dangerouslyAllowLocalIP: true,
    // Cho phép SVG từ bất kỳ domain nào (icon, logo CDN, v.v.)
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Cho phép ảnh từ mọi domain (CDN, Unsplash, Wikimedia, v.v.)
    remotePatterns: [
      { protocol: "https", hostname: "**", pathname: "/**" },
      { protocol: "http", hostname: "**", pathname: "/**" },
    ],
  },
};

export default nextConfig;
