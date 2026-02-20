import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // Tell Turbopack that the workspace root is the intrinsic/ directory,
    // not the parent folder (suppresses multiple-lockfile warning).
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
