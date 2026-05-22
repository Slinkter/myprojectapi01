import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "sonner";
import { useTheme } from "@/application/hooks/useTheme.js";
import ErrorBoundary from "@/presentation/components/common/ErrorBoundary";
import SkeletonGrid from "@/presentation/features/users/components/SkeletonGrid";

const UserSearch = lazy(() => import("@/presentation/features/users/UserSearch.jsx"));
const UserDetail = lazy(() => import("@/presentation/features/user-detail/UserDetail.jsx"));

const App = () => {
  const [theme] = useTheme();

  return (
    <div className="w-full min-h-screen bg-bg-primary flex flex-col items-center">
      <Toaster position="top-center" theme={theme} expand={false} richColors />

      <div className="w-full max-w-screen-xl px-6 md:px-12 py-8 pb-24 flex-1 relative">
        <ErrorBoundary>
          <Suspense fallback={<SkeletonGrid />}>
            <Routes>
              <Route path="/" element={<UserSearch />} />
              <Route path="/user/:login" element={<UserDetail />} />
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
