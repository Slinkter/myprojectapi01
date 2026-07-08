/**
 * @file App.jsx
 * @description Componente raíz de la aplicación. Define el enrutamiento de páginas
 * y las envolturas básicas de carga y control de fallos (ErrorBoundary).
 */

import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ErrorBoundary } from "@/shared";
import AppProviders from "./providers/AppProviders";

/**
 * 🎓 CONCEPTO JUNIOR: Enrutamiento Declarativo (React Router)
 * React Router permite mapear rutas del navegador (ej: '/user/mojombo') a componentes específicos.
 * Usamos 'Suspense' para mostrar un componente de carga mientras se descargan dinámicamente las páginas.
 */

// Carga perezosa (lazy load) de las páginas principales para optimizar la descarga inicial
const SearchPage = lazy(() => import("@/pages/search-page/SearchPage.jsx"));
const DetailPage = lazy(() => import("@/pages/detail-page/DetailPage.jsx"));

/**
 * Componente interno para mostrar un Spinner centrado mientras cargan las vistas asíncronas.
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
 * @returns {React.JSX.Element} Estructura limpia de la aplicación envuelta en proveedores.
 */
const App = () => {
  return (
    <AppProviders>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/user/:login" element={<DetailPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </AppProviders>
  );
};

export default App;

App.displayName = "App";
