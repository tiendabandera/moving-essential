import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: false, // ❌ no generar source maps
    minify: "terser", // usa terser para mejor ofuscación
    terserOptions: {
      compress: {
        drop_console: true, // eliminar console.logs
        drop_debugger: true,
      },
      format: {
        comments: false, // eliminar comentarios
      },
    },
  },
});
