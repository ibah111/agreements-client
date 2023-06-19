import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
import checker from "vite-plugin-checker";
export default defineConfig({
  plugins: [
    react(),
    legacy({ targets: ["defaults"] }),
    checker({
      typescript: true,
      eslint: { lintCommand: 'eslint "src/**/*.{ts,tsx}"' },
    }),
  ],
  server: { port: 3000, host: "0.0.0.0" },
  build: { outDir: "build" },
});
