/**
 * @file logger.js
 * @description Sleek, brand-aligned logging utility for development diagnostics.
 * Uses console grouping and compact formats to prevent browser console clutter.
 */

const STYLES = {
  brand: "color: #6366f1; font-weight: bold;", // Indigo
  fetch: "color: #a855f7; font-weight: bold;", // Purple
  success: "color: #10b981; font-weight: bold;", // Emerald
  state: "color: #38bdf8; font-weight: bold;", // Sky
  effect: "color: #64748b; font-style: italic;", // Slate
  error: "background: #ef4444; color: #fff; padding: 2px 6px; border-radius: 4px; font-weight: bold;", // Red
};

export const log = {
  /**
   * Log component render count.
   * @param {string} name - Component name.
   * @param {number} count - Current render count.
   */
  render: (name, count) => {
    console.log(`%c🔄 [RENDER ${count}] ${name}`, STYLES.effect);
  },

  /**
   * Log state changes inside an expandable console group.
   * @param {string} name - Name of the state variable.
   * @param {*} data - State value.
   */
  state: (name, data) => {
    console.groupCollapsed(`%c📦 [STATE] ${name}`, STYLES.state);
    console.log(data);
    console.groupEnd();
  },

  /**
   * Log data flow events (such as request/response states).
   * @param {string} msg - Message or pre-defined event key (fetch, success).
   */
  flow: (msg) => {
    if (msg === "fetch") {
      console.log("%c⚡ [API FETCH] ──▶ Sending request...", STYLES.fetch);
    } else if (msg === "success") {
      console.log("%c✨ [API SUCCESS] ──✔ Response received", STYLES.success);
    } else {
      console.log(`%c🔹 [FLOW] ${msg}`, STYLES.brand);
    }
  },

  /**
   * Log system/routing actions and errors.
   * @param {string} msg - Message description.
   * @param {*} [data] - Optional metadata to log inside an expandable group.
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
   * Log side-effects execution.
   * @param {string} msg - Action description.
   */
  effect: (msg) => {
    console.log(`%c⚙️ [EFFECT] ${msg}`, STYLES.effect);
  },
};

