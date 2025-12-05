import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    testTimeout: 10000,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      exclude: [
        "node_modules/",
        "src/setupTests.ts",
        "src/__tests__/",
        "**/*.stories.tsx",
        "**/dist/**",
      ],
    },
    css: true,
    include: [
      "src/__tests__/**/*.{test,spec}.?(c|m)[jt]s?(x)",
      "src/**/__tests__/**/*.{test,spec}.?(c|m)[jt]s?(x)",
    ],
    exclude: ["node_modules", "dist", ".idea", ".git", ".cache"],
  },
});
