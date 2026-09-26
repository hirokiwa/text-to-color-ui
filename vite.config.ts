import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: path.resolve(process.cwd(), "index.html"),
      },
    },
  },
  plugins: [
    {
      name: "duplicate-pages",
      closeBundle: () => {
        fs.copyFileSync(
          path.resolve(process.cwd(), "dist/index.html"),
          path.resolve(process.cwd(), "dist/mock.html"),
        );
      },
    },
  ],
});
