/// <reference types="vitest" />

import { defineConfig } from "vite";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    exclude: ["build/**", "**/node_modules/**"],
    coverage: {
      provider: "c8",
    },
  },
});
