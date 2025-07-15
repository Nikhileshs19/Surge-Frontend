import type { NextConfig } from "next"

const redirects = async () => [
  {
    source: "/",
    destination: "/compressors/1",
    permanent: true,
  },
]

const nextConfig: NextConfig = {
  redirects,
  //
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
