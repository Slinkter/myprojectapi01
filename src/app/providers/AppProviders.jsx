/**
 * @file AppProviders.jsx
 * @description Proveedor global de la aplicación (App Shell Provider). Enuelve la UI
 * con los contextos de red (TanStack Query), enrutamiento (BrowserRouter), temas y toasters.
 */

import PropTypes from "prop-types";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { useTheme, ThemeToggle, queryClient } from "@/shared";

/**
 * 🎓 CONCEPTO JUNIOR: Composición de Proveedores (Providers Composition)
 * En lugar de contaminar el componente raíz 'App.jsx' con configuraciones técnicas de red,
 * enrutamiento y depuración, agrupamos todos los proveedores globales en un solo archivo.
 * Esto mantiene la UI limpia y cumple con el principio de Responsabilidad Única (SOLID).
 */

/**
 * Proveedor global de la infraestructura técnica de la aplicación.
 * Configura QueryClient, React Router, Toasters y el contenedor estético del layout principal.
 * 
 * @component AppProviders
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Nodos hijos o vistas a renderizar dentro del contexto.
 * @returns {React.JSX.Element} Estructura de proveedores y layout base.
 */
const AppProviders = ({ children }) => {
  const [theme, toggleTheme] = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/myprojectapi01">
        <div className="w-full min-h-screen bg-bg bg-grid-pattern flex flex-col items-center relative transition-colors duration-300">
          
          {/* Selector de tema absolutamente posicionado */}
          <div className="absolute top-6 right-6 sm:top-8 sm:right-12 z-50">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>

          {/* Contenedor principal de páginas */}
          <div className="w-full max-w-7xl px-6 md:px-12 py-8 pb-24 flex-1 relative">
            {children}
          </div>

          {/* Gestor de notificaciones flotantes toast */}
          <Toaster
            position="bottom-left"
            theme={theme}
            expand={false}
            richColors
          />
        </div>
      </BrowserRouter>
      {/* Herramientas de depuración de TanStack Query en desarrollo */}
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
    </QueryClientProvider>
  );
};

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProviders;
