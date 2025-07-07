import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from "vite";


export default defineConfig({
  plugins: [react(),  tailwindcss(),],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://travel-mate-41yk.onrender.com", 
        changeOrigin: true,
      },
    },
  },
});
