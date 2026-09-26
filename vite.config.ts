import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/v1": {
        target: "http://localhost:8787",
        changeOrigin: true,
      },
    },
  },
});
