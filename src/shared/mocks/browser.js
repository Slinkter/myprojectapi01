/**
 * @file browser.js
 * @description Inicializador del Service Worker para MSW (Mock Service Worker).
 */

import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

/**
 * 🎓 CONCEPTO JUNIOR: Spread Operator (...)
 * El método `setupWorker` espera que le pasemos argumentos separados por coma: `setupWorker(handler1, handler2, handler3)`.
 * Como nosotros tenemos los handlers guardados en un Array (`handlers`), usamos `...handlers` para 
 * "esparcir" el arreglo y que JavaScript meta cada elemento automáticamente como un argumento individual.
 * 
 * Instancia del Worker encargada de instalarse en el navegador y vigilar la red.
 *
 * @type {import('msw/browser').SetupWorker}
 */
export const worker = setupWorker(...handlers);
