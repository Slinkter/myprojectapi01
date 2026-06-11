import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "sonner";
import { useTheme, ErrorBoundary, ThemeToggle } from "@/shared";
import { SkeletonGrid } from "@/widgets/search-results";

const SearchPage = lazy(() => import("@/pages/search-page/SearchPage.jsx"));
const DetailPage = lazy(() => import("@/pages/detail-page/DetailPage.jsx"));

const App = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <div className="w-full min-h-screen bg-bg flex flex-col items-center relative">
      {/* Floating Theme Toggle (Apple style) */}
      <div className="absolute top-6 right-6 sm:top-8 sm:right-12 z-50">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>

      <Toaster position="top-center" theme={theme} expand={false} richColors />

      <div className="w-full max-w-screen-xl px-6 md:px-12 py-8 pb-24 flex-1 relative">
        <ErrorBoundary>
          <Suspense fallback={<SkeletonGrid />}>
            <Routes>
              <Route path="/" element={<SearchPage />} />
              <Route path="/user/:login" element={<DetailPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default App;

App.displayName = "App";
