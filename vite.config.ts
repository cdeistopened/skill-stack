import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  // Convert Convex cloud URL to HTTP site URL
  const convexUrl = env.VITE_CONVEX_URL || "";
  const convexSiteUrl = convexUrl.replace(".cloud", ".site");

  return {
    plugins: [react()],
    build: {
      outDir: "dist",
    },
    server: {
      proxy: {
        // Proxy RSS and sitemap to Convex HTTP endpoints in development
        "/rss.xml": {
          target: convexSiteUrl,
          changeOrigin: true,
        },
        "/rss-full.xml": {
          target: convexSiteUrl,
          changeOrigin: true,
        },
        "/sitemap.xml": {
          target: convexSiteUrl,
          changeOrigin: true,
        },
        "/api/posts": {
          target: convexSiteUrl,
          changeOrigin: true,
        },
        "/api/post": {
          target: convexSiteUrl,
          changeOrigin: true,
        },
        "/meta/post": {
          target: convexSiteUrl,
          changeOrigin: true,
        },
      },
    },
  };
});
