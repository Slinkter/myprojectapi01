/**
 * @file Debug Logger Utility
 * @description High-fidelity logging with CSS styling and ASCII art for render tracking.
 */

const STYLES = {
  render: 'background: #222; color: #bada55; font-weight: bold; padding: 2px 5px; border-radius: 3px;',
  state: 'background: #1a365d; color: #bee3f8; padding: 2px 5px;',
  effect: 'background: #2d3748; color: #cbd5e0; padding: 2px 5px; font-style: italic;',
  redux: 'background: #44337a; color: #e9d8fd; padding: 2px 5px; font-weight: bold;',
  error: 'background: #742a2a; color: #fff; padding: 2px 5px; font-weight: bold;',
  separator: 'color: #718096; font-weight: light;'
};

const FLOW_ART = {
  fetch: `
    ┌─────────────┐
    │  API FETCH  │──▶──▶──▶──▶
    └─────────────┘
  `,
  success: `
    ┌─────────────┐
    │   SUCCESS   │──✔──✔──✔──
    └─────────────┘
  `,
  loading: `
    ┌─────────────┐
    │  LOADING... │──⏳──⏳──⏳──
    └─────────────┘
  `
};

export const log = {
  render: (name, count) => {
    console.log("%c------------------------------------------------", STYLES.separator);
    console.log(`%c[RENDER ${count}] ${name}`, STYLES.render);
  },
  
  state: (name, data) => {
    console.log(`%c[STATE] ${name}:`, STYLES.state, data);
  },

  flow: (type) => {
    if (FLOW_ART[type]) {
      console.log(`%c${FLOW_ART[type]}`, 'color: #48bb78; font-family: monospace;');
    }
  },

  redux: (msg, data) => {
    console.log(`%c[REDUX] ${msg}`, STYLES.redux, data || '');
  },

  effect: (msg) => {
    console.log(`%c[EFFECT] ${msg}`, STYLES.effect);
  }
};
