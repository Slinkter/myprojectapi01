/**
 * @file index.js
 * @description Punto de entrada centralizado para los recursos del nivel 'shared'.
 * Facilita las importaciones siguiendo principios de diseño modular.
 */

/**
 * 🎓 CONCEPTO JUNIOR: Barrel Pattern (Patrón Barril)
 * Al igual que en las otras capas (entities, features), este "Barril" agrupa todas las utilidades 
 * compartidas de la aplicación (hooks, UI base, cliente de API) en un solo punto de exportación.
 * 
 * Gracias a esto, cualquier componente puede importar múltiples utilidades en una sola línea:
 * `import { cn, useTheme, ErrorBoundary } from "@/shared";`
 */

export { cn } from "./lib/utils/utils";
export { useDebouncedSearch } from "./lib/hooks/useDebouncedSearch";
export { default as useIntersectionObserver } from "./lib/hooks/useIntersectionObserver";
export { useTheme } from "./lib/hooks/useTheme";
export { default as ErrorBoundary } from "./ui/ErrorBoundary/ErrorBoundary";
export { default as ErrorDisplay } from "./ui/ErrorDisplay/ErrorDisplay";
export { default as ThemeToggle } from "./ui/ThemeToggle/ThemeToggle";
export { httpClient } from "./api/httpClient";
export { ApiError } from "./api/ApiError";
export { queryClient } from "./api/queryClient";
export { TAILWIND_STYLE_TOKENS } from "./styles/theme";
export { useMsw } from "./lib/hooks/useMsw";
export { log } from "./logger/logger";
