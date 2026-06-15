/**
 * @file theme.js
 * @description Tokens de diseño centralizados y alias de clases CSS.
 */

/**
 * 🎓 CONCEPTO JUNIOR: Tokens de Diseño (Design Tokens)
 * Cuando tienes estilos repetitivos y complejos en Tailwind, es tentador copiar y pegar las mismas clases.
 * Centralizarlos aquí permite crear un "Lenguaje de Diseño".
 * 
 * Por convención en este proyecto, agrupamos combinaciones grandes de Tailwind en clases personalizadas 
 * mediante el archivo `index.css` (usando `@apply`), y aquí mapeamos los nombres de esas clases semánticas 
 * para usarlas en React sin riesgo a equivocarnos al escribirlas.
 *
 * Diccionario de Tokens de Estilo de Tailwind CSS.
 * 
 * @constant {Object<string, string>}
 */
export const TAILWIND_STYLE_TOKENS = {
  card: "tailwind-card",
  input: "tailwind-input",
  button: "btn-tailwind",
  badge: "badge-tailwind",
  stack: "layout-stack",
};
