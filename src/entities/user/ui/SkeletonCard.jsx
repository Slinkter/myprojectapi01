/**
 * @file SkeletonCard.jsx
 * @description Componente Placeholder que dibuja un estado de carga (Skeleton Loader)
 * imitando la estructura de la tarjeta UserCard estándar.
 */

/**
 * 🎓 CONCEPTO JUNIOR: Skeleton Loaders vs Spinners (Feedback de Usuario)
 * Usar el típico "circulito girando" (Spinner) cuando cargas una lista de resultados crea una sensación de salto
 * desagradable cuando los datos finalmente llegan a la pantalla y de golpe toda la página cambia de forma.
 *
 * Un "Skeleton" imita con cajas grises el diseño final ANTES de que los datos lleguen. 
 * Con la clase `animate-pulse` de Tailwind logramos el efecto "respirando". Esto disminuye la 
 * "Carga Cognitiva" del usuario porque su ojo ya se preparó para la estructura que va a aparecer.
 *
 * Componente SkeletonCard.
 * Renderiza la silueta animada de una tarjeta de usuario para estados de carga asíncronos.
 *
 * @component
 * @returns {JSX.Element} Tarjeta "fantasma" que pulsa animadamente.
 * 
 * @example
 * ```tsx
 * if (isLoading) return <SkeletonCard />
 * return <UserCard />
 * ```
 */
const SkeletonCard = () => (
  <div className="h-full w-full max-w-full sm:max-w-[280px] mx-auto min-h-[190px] sm:min-h-[200px]">
    {/* Contenedor principal con animate-pulse */}
    <div className="flex flex-col h-full w-full rounded-2xl border border-border bg-surface animate-pulse">
      {/* Silueta del Avatar */}
      <div className="pt-6 pb-2 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-border/50" />
      </div>
      {/* Silueta del Texto */}
      <div className="px-5 pb-1 text-center space-y-1.5">
        <div className="w-20 h-3.5 rounded bg-border/50 mx-auto" />
        <div className="w-28 h-3 rounded bg-border/30 mx-auto" />
      </div>
      {/* Silueta del Botón Footer */}
      <div className="px-5 pb-5 pt-2 mt-auto w-full">
        <div className="w-full h-9 rounded-xl bg-border/40" />
      </div>
    </div>
  </div>
);

SkeletonCard.displayName = "SkeletonCard";

export default SkeletonCard;
