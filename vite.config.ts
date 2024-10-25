import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/getforked/",
  build: {
    outDir: "getforked",
  },
  plugins: [react()],
  server: {
    hmr: true,
  },
});
