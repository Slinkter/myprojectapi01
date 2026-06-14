import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { animate } from "motion/react";

/**
 * AnimatedCounter component.
 * Animates a numeric counter smoothly from 0 to a target value.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {number} props.value - Target numeric value to count up to.
 * @returns {JSX.Element} Animated counter span.
 */
const AnimatedCounter = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
    });
    return () => controls.stop();
  }, [value]);

  return <span>{displayValue.toLocaleString()}</span>;
};

AnimatedCounter.propTypes = {
  value: PropTypes.number.isRequired,
};

AnimatedCounter.displayName = "AnimatedCounter";

export default AnimatedCounter;
