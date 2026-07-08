/**
 * @file AppProviders.jsx
 * @description Proveedor global de infraestructura técnica. Enuelve la UI con
 * los contextos de red (QueryClient) y enrutamiento (BrowserRouter).
 */

import PropTypes from "prop-types";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import { queryClient } from "@/shared";

/**
 * 🎓 CONCEPTO JUNIOR: Proveedores Técnicos de Contexto (Context Providers)
 * Este archivo contiene únicamente proveedores de datos y lógica invisible. 
 * No contiene estilos, divs contenedores ni elementos visuales. Esto garantiza que 
 * los contextos estén disponibles antes de montar cualquier layout visual o página.
 */

/**
 * Proveedor de contexto puro para la aplicación.
 * 
 * @component AppProviders
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Vistas y layouts a envolver.
 * @returns {React.JSX.Element} Estructura de proveedores.
 */
const AppProviders = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/myprojectapi01">
        {children}
      </BrowserRouter>
      {/* Herramientas de desarrollo para depurar la caché en desarrollo */}
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
    </QueryClientProvider>
  );
};

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProviders;
