import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "example.com",       // domain gambar yang kamu pakai
      "localhost",         // kalau API kamu di localhost
      "192.168.56.1",      // kalau pakai IP lokal
      "your-api-domain.com" // ganti sesuai domain API kamu
    ],
  },
};

export default nextConfig;