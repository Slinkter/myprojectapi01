/**
 * @file index.js
 * @description Punto de entrada público (Public API) para la característica de Detalle de Usuario.
 */

/**
 * 🎓 CONCEPTO JUNIOR: Public API de un Módulo
 * Aunque esta carpeta tenga mucha lógica interna (queries, utilidades), solo exportamos 
 * el Facade (`useUserDetailFacade`). 
 * De esta forma ocultamos la complejidad y obligamos a que el resto de la app solo se 
 * comunique con nuestra Feature usando las "puertas delanteras" permitidas.
 */

export { useUserDetailFacade } from "./model/useUserDetailFacade";
