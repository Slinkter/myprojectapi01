/**
 * @file AnimatedCounter.jsx
 * @description Componente visual que anima un contador numérico desde 0 hasta el valor final.
 */

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { animate } from "motion/react";

/**
 * 🎓 CONCEPTO JUNIOR: Animación Basada en Estado (State-driven Animation)
 * A diferencia del CSS puro (`transition`), aquí estamos animando números, no píxeles.
 * Usamos la función `animate` de framer motion que llama a `setDisplayValue` en cada 
 * fotograma (frame) que calcula.
 *
 * `useEffect` se encarga de crear la animación cada vez que la prop `value` cambia.
 * Y lo más importante: devuelve `controls.stop()` en la función de limpieza (Cleanup Function) 
 * para detener la animación si el componente desaparece antes de que termine de contar, evitando fugas de memoria.
 *
 * Componente AnimatedCounter.
 * Anima un contador numérico de manera suave.
 *
 * @component
 * @param {Object} props - Propiedades inyectadas al componente.
 * @param {number} props.value - El valor objetivo final hasta el que debe contar.
 * @returns {JSX.Element} Etiqueta `span` con el contador renderizado.
 */
const AnimatedCounter = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // Inicia la animación desde 0 hasta 'value' en 1.2 segundos
    const controls = animate(0, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
    });
    
    // Función de limpieza
    return () => controls.stop();
  }, [value]);

  // toLocaleString() le pone las comas a los miles (ej: 1,000,000 en vez de 1000000)
  return <span>{displayValue.toLocaleString()}</span>;
};

AnimatedCounter.propTypes = {
  value: PropTypes.number.isRequired,
};

AnimatedCounter.displayName = "AnimatedCounter";

export default AnimatedCounter;
