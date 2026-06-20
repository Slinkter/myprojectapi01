/**
 * @file logger.js
 * @description Utilidad centralizada para imprimir mensajes en la consola del navegador.
 * Mejora la legibilidad del modo desarrollo añadiendo colores y grupos colapsables.
 */

/**
 * 🎓 CONCEPTO JUNIOR: Diccionarios (Objetos como Configuración)
 * En lugar de escribir el código de los colores ('color: #6366f1;...') cada vez que hacemos un console.log,
 * los guardamos en un objeto literal (`STYLES`). Esto hace que si un día queremos cambiar el color "brand", 
 * solo modificamos una línea de código en lugar de cien.
 */
const STYLES = {
  brand: "color: #6366f1; font-weight: bold;", // Indigo
  fetch: "color: #a855f7; font-weight: bold;", // Purple
  success: "color: #10b981; font-weight: bold;", // Emerald
  state: "color: #38bdf8; font-weight: bold;", // Sky
  effect: "color: #64748b; font-style: italic;", // Slate
  error:
    "background: #ef4444; color: #fff; padding: 2px 6px; border-radius: 4px; font-weight: bold;", // Red
  time: "color: #eab308; font-weight: bold; font-family: monospace;", // Amber/Yellow for timings
};

// Guardamos el momento exacto en que se carga la utilidad
const initTime = performance.now();
let lastFlowTime = performance.now();

// Mapa para temporizadores personalizados (como console.time)
const activeTimers = new Map();

/**
 * 🎓 CONCEPTO JUNIOR: Patrón Singleton / Namespacing
 * En vez de exportar 5 funciones diferentes (`logRender`, `logState`, etc.), exportamos un único objeto `log`
 * que contiene esas funciones. Así, al usarlo en otro archivo, el código se lee de forma muy clara: `log.flow("...")`.
 * 
 * Además, tener un "logger" personalizado nos da poder total: si mañana pasamos a Producción, 
 * podemos vaciar estas funciones aquí mismo y automáticamente todos los console.log del proyecto dejarán de imprimirse,
 * protegiendo los datos de la app.
 */
export const log = {
  /**
   * Muestra cuántas veces se ha renderizado un componente React en pantalla.
   * @param {string} name - Nombre del componente.
   * @param {number} count - Número de veces que se ha renderizado.
   */
  render: (name, count) => {
    // El %c le dice a la consola del navegador que le aplique estilos CSS al texto siguiente.
    console.log(`%c🔄 [RENDER ${count}] ${name}`, STYLES.effect);
  },

  /**
   * Imprime un valor de estado dentro de una caja colapsada para no ensuciar la consola.
   * 
   * 🎓 CONCEPTO JUNIOR: console.groupCollapsed
   * A diferencia de console.log, esto crea un contenedor en la consola que se puede abrir haciendo clic.
   * 
   * @param {string} name - Nombre descriptivo del estado.
   * @param {*} data - El valor complejo a inspeccionar (arreglo, objeto, etc).
   */
  state: (name, data) => {
    console.groupCollapsed(`%c📦 [STATE] ${name}`, STYLES.state);
    console.log(data);
    console.groupEnd(); // Cierra el contenedor actual
  },

  /**
   * Registra eventos rápidos de paso a paso (Network requests, promesas).
   * @param {string} msg - Texto o palabra clave que determina el mensaje a imprimir.
   */
  flow: (msg) => {
    const now = performance.now();
    const elapsed = now - initTime;
    const delta = now - lastFlowTime;
    lastFlowTime = now;

    const prefix = `%c[T+${elapsed.toFixed(1)}ms | Δ+${delta.toFixed(1)}ms]`;

    if (msg === "fetch") {
      console.log(`${prefix} %c⚡ [API FETCH] ──▶ Enviando petición...`, STYLES.time, STYLES.fetch);
    } else if (msg === "success") {
      console.log(`${prefix} %c✨ [API SUCCESS] ──✔ Respuesta recibida`, STYLES.time, STYLES.success);
    } else {
      console.log(`${prefix} %c🔹 [FLOW] ${msg}`, STYLES.time, STYLES.brand);
    }
  },

  /**
   * Inicia un temporizador con un nombre específico.
   * @param {string} label - Identificador único del temporizador.
   */
  time: (label) => {
    activeTimers.set(label, performance.now());
  },

  /**
   * Detiene el temporizador y muestra el tiempo transcurrido en consola.
   * @param {string} label - Identificador único del temporizador.
   * @param {string} [msg] - Mensaje personalizado adicional.
   */
  timeEnd: (label, msg = "") => {
    const startTime = activeTimers.get(label);
    if (startTime === undefined) {
      console.warn(`[LOGGER] No se encontró el temporizador activo para la etiqueta: "${label}"`);
      return;
    }
    const duration = performance.now() - startTime;
    activeTimers.delete(label);

    const now = performance.now();
    const elapsed = now - initTime;
    const prefix = `%c[T+${elapsed.toFixed(1)}ms]`;

    console.log(
      `${prefix} %c⏱️ [TIMER] ${label}: ${duration.toFixed(2)}ms ${msg ? `(${msg})` : ""}`,
      STYLES.time,
      STYLES.time
    );
    return duration;
  },

  /**
   * Imprime mensajes críticos de sistemas o errores complejos.
   * @param {string} msg - El título del mensaje de error o sistema.
   * @param {*} [data] - Datos opcionales. Si se envían, se abrirá un contenedor colapsable.
   */
  redux: (msg, data) => {
    if (data) {
      console.groupCollapsed(`%c🛡️ [SYSTEM] ${msg}`, STYLES.error);
      console.log(data);
      console.groupEnd();
    } else {
      console.log(`%c🛡️ [SYSTEM] ${msg}`, STYLES.error);
    }
  },

  /**
   * Indica cuándo se dispara un useEffect o un efecto secundario asíncrono.
   * @param {string} msg - Texto descriptivo del efecto.
   */
  effect: (msg) => {
    console.log(`%c⚙️ [EFFECT] ${msg}`, STYLES.effect);
  },
};
