/**
 * @file App.jsx
 * @description Componente raíz de la aplicación. Orquesta la composición de
 * proveedores de contexto, el layout de diseño y la configuración del enrutador de páginas.
 */

import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ErrorBoundary } from "@/shared";
import AppProviders from "./providers/AppProviders";
import RootLayout from "./layouts/RootLayout";

/**
 * 🎓 CONCEPTO JUNIOR: Arquitectura de Composición
 * Al separar los proveedores técnicos (AppProviders) del contenedor visual (RootLayout),
 * logramos una estructura modular de capas limpia. Si mañana cambias el diseño estético de la app,
 * solo editas RootLayout sin tocar la lógica de red o enrutamiento.
 */

// Carga perezosa de páginas principales
const SearchPage = lazy(() => import("@/pages/search-page/SearchPage.jsx"));
const DetailPage = lazy(() => import("@/pages/detail-page/DetailPage.jsx"));

/**
 * Componente interno para mostrar un Spinner centrado mientras cargan las vistas.
 * 
 * @component PageLoader
 * @returns {React.JSX.Element} Spinner de carga.
 */
const PageLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

/**
 * Componente raíz de la aplicación React.
 * 
 * @component App
 * @returns {React.JSX.Element} Composición del árbol de la aplicación.
 */
const App = () => {
  return (
    <AppProviders>
      <RootLayout>
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<SearchPage />} />
              <Route path="/user/:login" element={<DetailPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </RootLayout>
    </AppProviders>
  );
};

export default App;

App.displayName = "App";
