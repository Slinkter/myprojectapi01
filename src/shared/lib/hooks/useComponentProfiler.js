/**
 * @file useComponentProfiler.js
 * @description Hook de React personalizado para medir el rendimiento de renderizado y montaje de componentes.
 * Registra de manera educativa el ciclo de vida y los tiempos de ejecución de la interfaz de usuario.
 */

import { useEffect, useRef } from "react";
import { log } from "@/shared/logger/logger";

/**
 * 🎓 CONCEPTO JUNIOR: Medición de Rendimiento con Hooks (useEffect vs Render)
 * En React, cuando una función componente se ejecuta, calcula el nuevo Virtual DOM. 
 * Sin embargo, el navegador no pinta la pantalla de inmediato en ese momento.
 * El hook `useEffect` se ejecuta DESPUÉS de que React ha realizado los cambios en el DOM real
 * y el navegador ha pintado la interfaz en pantalla (Fase de Commit).
 * 
 * Al guardar la hora de inicio al inicio de la función del componente y restar esa hora
 * dentro de un `useEffect`, podemos calcular de forma precisa cuántos milisegundos le tomó
 * a React procesar, renderizar y pintar ese componente específico.
 */

/**
 * Hook personalizado para perfilar el rendimiento de renderizado de componentes.
 * 
 * @hook
 * @param {string} componentName - El nombre descriptivo del componente para el reporte.
 * @param {string} stepInfo - El paso en el flujo de 9 pasos (ej. "🖥️ [PASO 3A: SearchPage]").
 * @example
 * useComponentProfiler("SearchPage", "🖥️ [PASO 3A: SearchPage]");
 */
export const useComponentProfiler = (componentName, stepInfo) => {
  // Guardamos el número de renderizados usando un Ref para que no cause re-renders al incrementarse.
  const renderCount = useRef(0);
  renderCount.current += 1;

  const startTime = performance.now();

  // Logueamos cuando se empieza a ejecutar la función componente
  log.flow(`${stepInfo} - Ejecutando cuerpo del componente (Render #${renderCount.current})...`);

  useEffect(() => {
    const duration = performance.now() - startTime;
    log.flow(
      `${stepInfo} - [RENDIMIENTO] Render/Montaje #${renderCount.current} completado en ${duration.toFixed(2)}ms`
    );
  });
};
