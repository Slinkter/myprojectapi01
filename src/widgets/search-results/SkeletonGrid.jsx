/**
 * @file SkeletonGrid.jsx
 * @description Componente contenedor que orquesta múltiples instancias de `<SkeletonCard />`.
 * Reproduce exactamente el mismo layout CSS Grid que `<UserList />` para garantizar
 * que la transición de "Cargando" a "Resultados" sea fluida (Zero Layout Shift).
 */

import SkeletonCard from "@/entities/user/ui/SkeletonCard";
import { cn, TAILWIND_STYLE_TOKENS } from "@/shared";

/**
 * 🎓 CONCEPTO JUNIOR: Creación de Arreglos Vacíos (Array.from)
 * Dado que no tenemos datos reales mientras estamos en estado "Loading", 
 * ¿Cómo iteramos para dibujar 12 tarjetas falsas?
 * 
 * Usamos `Array.from({ length: 12 })`. Esto crea un arreglo falso de 12 posiciones vacías 
 * y luego usamos `.map` para pintar 12 componentes `<SkeletonCard />`. Es un truco muy común 
 * en React para generar repeticiones visuales rápidamente.
 *
 * Componente SkeletonGrid.
 *
 * @component
 * @returns {JSX.Element} Cuadrícula de marcadores de posición pulsantes.
 */
const SkeletonGrid = () => (
  <div className={cn(TAILWIND_STYLE_TOKENS.stack, "py-12")}>
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
      {Array.from({ length: 12 }).map((_, index) => (
        // Usamos el 'index' como key SOLO porque son skeletons fijos que no cambian de orden ni se borran individualmente.
        <SkeletonCard key={index} />
      ))}
    </div>
  </div>
);

SkeletonGrid.displayName = "SkeletonGrid";

export default SkeletonGrid;
