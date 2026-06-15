/**
 * @file vite.config.js
 * @description Configuración principal del empaquetador Vite.
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

/**
 * 🎓 CONCEPTO JUNIOR: Variables Mágicas de Node (ES Modules)
 * En módulos modernos (import/export), las variables `__dirname` y `__filename` ya no existen por defecto 
 * como en el viejo CommonJS (`require`). 
 * Las siguientes dos líneas recrean esa funcionalidad para que Node.js sepa exactamente en qué ruta 
 * del disco duro de tu computadora vive este archivo.
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Configuración del Bundler Vite.
 * Se encarga de transformar React JSX a JS puro, inyectar Tailwind, y mapear alias de rutas.
 */
export default defineConfig(() => ({
  plugins: [react(), tailwindcss()],
  
  // base: "/myprojectapi01/" -> Es vital para Github Pages. 
  // Le dice a la app que no vive en "tusitio.com/", sino en "tusitio.com/myprojectapi01/". 
  // Si no se pone, todos los recursos (JS, CSS, imágenes) darán error 404 al publicar.
  base: "/myprojectapi01/",
  
  resolve: {
    alias: {
      // 🎓 CONCEPTO JUNIOR: Path Aliasing
      // Reemplaza `import { x } from "../../../shared/utils"` 
      // con `import { x } from "@/shared/utils"`. Evita el "infierno de los puntos" y hace fácil mover archivos.
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
  test: {
    globals: true, // Permite usar 'describe' o 'it' de Vitest sin tener que importarlos arriba
    environment: "jsdom", // Simula un navegador dentro de Node para testear componentes React
  },
}));
