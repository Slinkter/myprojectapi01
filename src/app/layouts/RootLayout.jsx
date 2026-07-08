/**
 * @file RootLayout.jsx
 * @description Layout visual principal (App Shell Layout). Provee el contenedor estético,
 * la grilla de fondo, la barra superior con el selector de tema y la configuración de toasts.
 */

import PropTypes from "prop-types";
import { Toaster } from "sonner";
import { useTheme, ThemeToggle } from "@/shared";

/**
 * 🎓 CONCEPTO JUNIOR: Separación de Incumbencias (Separation of Concerns)
 * Es una buena práctica separar los Providers (que inyectan datos o lógica invisible de red/rutas) 
 * de los Layouts (que definen el esqueleto visual de la página: fondos, cabeceras fijas y barras laterales).
 * Esto hace que el código sea mucho más fácil de reutilizar y depurar.
 */

/**
 * Contenedor visual base de la aplicación.
 * 
 * @component RootLayout
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Páginas o rutas activas a renderizar dentro de la grilla.
 * @returns {React.JSX.Element} Estructura HTML del layout global.
 * 
 * @example
 * ```tsx
 * <RootLayout>
 *   <SearchPage />
 * </RootLayout>
 * ```
 */
const RootLayout = ({ children }) => {
  const [theme, toggleTheme] = useTheme();

  return (
    <div className="w-full min-h-screen bg-bg bg-grid-pattern flex flex-col items-center relative transition-colors duration-300">
      
      {/* Selector de tema absolutamente posicionado en la parte superior derecha */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-12 z-50">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>

      {/* Contenedor principal de páginas con ancho máximo */}
      <div className="w-full max-w-7xl px-6 md:px-12 py-8 pb-24 flex-1 relative">
        {children}
      </div>

      {/* Notificaciones Toast flotantes configuradas con el tema activo */}
      <Toaster
        position="bottom-left"
        theme={theme}
        expand={false}
        richColors
      />
    </div>
  );
};

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RootLayout;
