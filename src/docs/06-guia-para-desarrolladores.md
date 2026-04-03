# 06 - Guía de Operaciones para Desarrolladores (v3)

## 🏁 Instalación y Modo de Trabajo

Este proyecto sigue el paradigma de **Alta Fidelidad y Configuración Mínima**.

```bash
# 1. Instalar dependencias
pnpm install

# 2. Iniciar servidor de desarrollo
# MSW se activará automáticamente en modo 'development'
pnpm dev

# 3. Auditoría de código (Pre-commit recomendable)
pnpm run lint
```

## 🛠️ Offline-First con MSW

Para garantizar un desarrollo fluido e independiente, utilizamos **Mock Service Worker (MSW)**.

- **Intercepción:** MSW registra un Service Worker en el navegador (ver `public/mockServiceWorker.js`) que intercepta las peticiones salientes a la API de GitHub.
- **Configuración:** La activación ocurre en `src/main.jsx` solo cuando `import.meta.env.MODE === 'development'`.
- **Modificación:** Para añadir o cambiar respuestas simuladas, edita `src/mocks/handlers.js`. Esto permite probar estados de carga infinita, errores 404 o 500 sin tocar el código de la feature.

## 🛡️ Validación de Datos con Zod

La integridad de los datos es sagrada. Cada vez que crees una nueva feature que consuma datos externos:

1.  **Define el Schema:** Crea un archivo en `src/models/types/` (ej. `project.js`) usando `z.object({...})`.
2.  **Valida en el Adaptador:** En `src/models/adapters/`, usa `schema.parse(rawData)` antes de retornar el objeto transformado.
3.  **Beneficio:** Si la API cambia inesperadamente, la aplicación fallará con un error descriptivo en la consola en lugar de propagar valores `undefined` que causan crashes silenciosos.

## 🏗️ Convenciones de Ingeniería

### Data Fetching (Prohibido usar Thunks para API)

Para mantener la performance y el caché automático, **toda petición de datos debe pasar por TanStack Query**.

- Definir el servicio en `src/services/`.
- Aplicar el adaptador y la validación Zod en el `queryFn`.
- Exponer el resultado a través de un facade hook en la feature correspondiente.

### 🧩 Composición de Clases (Tailwind)

Para evitar conflictos de especificidad y manejar estados condicionales limpiamente, usa la utilidad `cn`:

```javascript
import { cn } from "@/lib/utils";

const MyComponent = ({ className, active }) => (
  <div className={cn(
    "p-4 rounded-lg bg-app-surface", // Clases base
    active && "ring-2 ring-primary", // Condicional
    className                        // Sobreescritura externa
  )}>
    ...
  </div>
);
```

### 🎨 Guía de Diseño Minimalista (v3)

- **Cero Clases Hardcodeadas:** Usa los tokens semánticos del tema (`text-app-text`, `bg-app-surface`).
- **Espaciado:** No uses márgenes (`m-`, `mt-`) para separar elementos hermanos. Usa `gap` dentro de contenedores `flex` o `grid`.
- **Tipografía:** Todo es **Inter**. Usa `font-bold` para títulos, `font-medium` para navegación y `font-normal` para contenido.

### 🧩 Patrón Facade

Ningún componente de UI debe importar `useQuery` o hooks de bajo nivel directamente.

- Todo debe pasar por un archivo `Facade` que exponga estados limpios (`isLoading`, `isSuccess`, `users`).

---

## 🚀 Despliegue (GitHub Pages)

El proyecto está configurado para despliegue automático en GitHub Pages.

- **Base URL:** `/myprojectapi01/` (configurado en `vite.config.js` y `main.jsx`).

### Scripts de despliegue:

```bash
pnpm run deploy
```
