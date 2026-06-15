/**
 * @file UserList.jsx
 * @description Renderiza una cuadrícula (grid) mapeando el arreglo de resultados a componentes `<ResultFactory />`.
 * Envuelve los elementos de la lista en etiquetas de animación para lograr entradas suaves tipo cascada.
 */

import React from "react";
import PropTypes from "prop-types";
import { AnimatePresence, motion } from "motion/react";
import { ResultFactory } from "@/entities/user";

// Configuración de la animación "Stagger" (Cascada) de Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    // Hace que los hijos aparezcan con un retraso de 0.05 segundos uno tras otro
    transition: { staggerChildren: 0.05 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.02, staggerDirection: -1 },
  },
};

/**
 * 🎓 CONCEPTO JUNIOR: React.memo() y Map "Key" Prop
 * 1. El `.map()` transforma nuestro arreglo de datos en un arreglo de HTML.
 *    La prop `key={userProfile.id}` es vital. Le dice a React exactamente qué caja es cuál. Si no la pones, 
 *    si se borra el primer usuario, React redibujará TODOS los usuarios en lugar de solo remover el primero (muy ineficiente).
 * 2. Al final exportamos con `export default React.memo(UserList)`.
 *    ¿Por qué? Porque pintar 30 tarjetas es costoso. `React.memo` hace que, si el padre se redibuja pero el `userList` no ha cambiado, 
 *    React reciclará el HTML viejo sin volver a calcular nada.
 *
 * Componente UserList.
 * Mapea y anima la cuadrícula visual de los resultados de búsqueda.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Object[]} props.userList - Arreglo de perfiles normalizados que se deben dibujar.
 * @returns {JSX.Element} Cuadrícula CSS (CSS Grid) mapeada.
 */
const UserList = ({ userList }) => {
  return (
    <div className="w-full py-4">
      <div className="divider mb-6" />
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-[10px] tracking-wider text-text-mute font-bold">
          {userList.length} RESULTADO{userList.length !== 1 ? "S" : ""}
        </span>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        layout
        className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6"
      >
        {/* AnimatePresence permite animar la salida (exit) de los elementos cuando son eliminados del arreglo */}
        <AnimatePresence mode="popLayout">
          {userList.map((userProfile) => (
            <motion.div
              key={userProfile.id} // Prop key vital para el reconciliador de React
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
            >
              {/* Aquí el Factory se encarga de crear el componente correcto según el tipo de entidad */}
              <ResultFactory userProfile={userProfile} variant="default" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

UserList.propTypes = {
  userList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

UserList.displayName = "UserList";

export default React.memo(UserList);
