/**
 * @file index.js
 * @description Punto de entrada público (Public API) para la característica (feature) de Búsqueda de Usuarios.
 */

/**
 * 🎓 CONCEPTO JUNIOR: Encapsulamiento en FSD
 * En la arquitectura Feature-Sliced Design, la regla de oro es: 
 * "Nadie puede importar archivos de carpetas internas directamente". 
 * Todo el mundo que necesite usar la Búsqueda de Usuarios DEBE importar a través de este archivo `index.js`.
 */

export { default as PageHeader } from "./ui/PageHeader";
export { useUserSearchFacade } from "./model/useUserSearchFacade";
