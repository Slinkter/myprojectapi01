/**
 * @file App.jsx
 * @description Shell principal de la aplicación.
 * Orquesta la estructura global del Virtual DOM envolviendo el árbol bajo los proveedores (Providers)
 * necesarios para la red (TanStack Query), ruteo (React Router DOM) y temas CSS.
 */

import { lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import {
  useTheme,
  ErrorBoundary,
  ThemeToggle,
  queryClient,
  useMsw,
  log,
} from "@/shared";

/**
 * 🎓 CONCEPTO JUNIOR: Lazy Loading (Carga Perezosa) con React.lazy
 * Si importamos todas las páginas arriba usando `import X from ...`, el usuario descargará 
 * un archivo JS gigante (bundle) al entrar, aunque solo visite la portada.
 * 
 * `React.lazy` le dice a Webpack/Vite: "No descargues el código de DetailPage o SearchPage
 * hasta que el usuario intente navegar a esas URL". Esto hace que la carga inicial sea ultrarrápida.
 */
const SearchPage = lazy(() => import("@/pages/search-page/SearchPage.jsx"));
const DetailPage = lazy(() => import("@/pages/detail-page/DetailPage.jsx"));

/**
 * Componente raíz de la aplicación. Configura proveedores de contexto y enrutamiento global.
 *
 * @component
 * @returns {JSX.Element|null} El armazón de la aplicación (Shell), o null si el entorno de red aún se está configurando.
 */
const App = () => {
  log.flow(
    "📦 [PASO 2: App Shell] Renderizando providers globales (QueryClient, Router, Theme) e inicializando MSW...",
  );
  
  // Extraemos el tema actual ('light' | 'dark') del hook global para aplicarlo al Toaster (Notificaciones)
  const [theme, toggleTheme] = useTheme();

  // 🎓 CONCEPTO JUNIOR: Renderizado Bloqueante Controlado
  // MSW necesita interceptar la red ANTES de que cualquier componente haga un fetch.
  // Al retornar 'null' temporalmente, pausamos el ciclo de vida de React hasta que el Service Worker esté 100% activo.
  const isMswReady = useMsw();
  if (!isMswReady) return null;

  return (
    // QueryClientProvider: Inyecta el caché y la lógica de TanStack Query a toda la app
    <QueryClientProvider client={queryClient}>
      {/* BrowserRouter: Inyecta el historial del navegador para que funcionen los <Link> y <Route> */}
      <BrowserRouter basename="/myprojectapi01">
        <div className="w-full min-h-screen bg-bg bg-grid-pattern flex flex-col items-center relative">
          
          <div className="absolute top-6 right-6 sm:top-8 sm:right-12 z-50">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>

          <Toaster
            position="bottom-left"
            theme={theme}
            expand={false}
            richColors
          />

          <div className="w-full max-w-7xl px-6 md:px-12 py-8 pb-24 flex-1 relative">
            {/* 
                🎓 CONCEPTO JUNIOR: Composición de Componentes
                ErrorBoundary no pinta nada visual propio, es un componente "Envoltorio" (Wrapper).
                Si cualquier Route que esté adentro lanza un error catastrófico (JavaScript explota),
                este Boundary "atrapa" el error y pinta un mensaje en vez de que toda la pantalla se quede en blanco.
            */}
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<SearchPage />} />
                <Route path="/user/:login" element={<DetailPage />} />
                
                {/* Fallback de ruta: Si alguien entra a una URL que no existe, forzamos redirección al inicio */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </ErrorBoundary>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

App.displayName = "App";
