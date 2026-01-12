import { Routes, Route } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme.js";
import UserSearch from "@/features/users/UserSearch.jsx";
import UserDetail from "@/features/user-detail/UserDetail.jsx";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const App = () => {
  // Hook for managing the theme (light/dark).
  const [theme, toggleTheme] = useTheme();

  return (
    <main className="relative min-h-dvh flex flex-col items-center p-4 sm:p-6">
      <ThemeToggle toggleTheme={toggleTheme} theme={theme} />

      <Routes>
        <Route path="/" element={<UserSearch />} />
        <Route path="/user/:login" element={<UserDetail />} />
      </Routes>
    </main>
  );
};

export default App;

App.displayName = "App";
