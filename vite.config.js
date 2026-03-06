import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  // Si usas 'pnpm run build' (mode production), usa la ruta de GitHub
  // Si usas 'pnpm run dev' o cualquier otro, usa "/"
  // base: mode === "production" ? "/myprojectapi01/" : "/",
  base: "/myprojectapi01/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
