# 06 - Guía de Operaciones para Desarrolladores (v3)

## 🏁 Instalación y Modo de Trabajo

Este proyecto sigue el paradigma de **Alta Fidelidad y Configuración Mínima**.

```bash
# 1. Instalar dependencias
pnpm install

# 2. Iniciar servidor de desarrollo
pnpm dev

# 3. Auditoría de código (Pre-commit recomendable)
pnpm run lint
```

## 🏗️ Convenciones de Ingeniería

### Data Fetching (Prohibido usar Thunks para API)

Para mantener la performance y el caché automático, **toda petición de datos debe pasar por TanStack Query**.

- Definir el servicio en `src/services/`.
- Aplicar el adaptador en el `queryFn`.
- Exponer el resultado a través de un facade hook en la feature correspondiente.

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
