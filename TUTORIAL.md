# 🎓 Tutorial Completo: Construye una App de GitHub Users desde Cero

## 📋 Índice
- [Introducción](#introducción)
- [Fase 1: Setup del Proyecto](#fase-1-setup-del-proyecto)
- [Fase 2: Estructura Básica](#fase-2-estructura-básica)
- [Fase 3: State Management con Redux](#fase-3-state-management-con-redux)
- [Fase 4: Integración con API](#fase-4-integración-con-api)
- [Fase 5: Componentes UI](#fase-5-componentes-ui)
- [Fase 6: Features Avanzadas](#fase-6-features-avanzadas)
- [Fase 7: Optimización](#fase-7-optimización)
- [Fase 8: Deployment](#fase-8-deployment)

---

## 🎯 Introducción

### **¿Qué vamos a construir?**

Una aplicación web moderna que:
- 🔍 Busca usuarios de GitHub en tiempo real
- 👤 Muestra perfiles detallados
- 🎨 Tiene modo oscuro/claro
- ⚡ Está optimizada para rendimiento
- 📱 Es completamente responsive

### **¿Qué aprenderás?**

- ✅ React 18 con hooks modernos
- ✅ Redux Toolkit para state management
- ✅ Integración con APIs RESTful
- ✅ Custom hooks reutilizables
- ✅ Optimizaciones de rendimiento
- ✅ Tailwind CSS y Material Tailwind
- ✅ Feature-based architecture

### **Requisitos Previos**

- Node.js 18+ instalado
- Conocimientos básicos de React
- Familiaridad con JavaScript ES6+
- Editor de código (VS Code recomendado)

---

## 🚀 Fase 1: Setup del Proyecto

### **Paso 1.1: Crear el proyecto con Vite**

```bash
# Crear proyecto con Vite
pnpm create vite myprojectapi01 --template react

# Navegar al directorio
cd myprojectapi01

# Instalar dependencias
pnpm install
```

**¿Por qué Vite?**
- ⚡ Extremadamente rápido (HMR instantáneo)
- 🎯 Configuración mínima
- 📦 Build optimizado con Rollup
- 🔧 Soporte nativo de ES modules

### **Paso 1.2: Instalar dependencias principales**

```bash
# State Management
pnpm add @reduxjs/toolkit react-redux

# Routing
pnpm add react-router-dom

# UI Libraries
pnpm add @material-tailwind/react
pnpm add react-icons

# PropTypes for validation
pnpm add prop-types

# Styling
pnpm add -D tailwindcss postcss autoprefixer
pnpm add -D @tailwindcss/typography
npx tailwindcss init -p
```

### **Paso 1.3: Configurar Tailwind CSS**

**tailwind.config.cjs:**
```javascript
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Outfit", "sans-serif"],
      },
      colors: {
        // Custom Premium Palette
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6", // Blue 500
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        secondary: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6", // Main Secondary
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
        dark: {
          bg: "#0f172a", // Slate 900
          surface: "#1e293b", // Slate 800
          text: "#f8fafc", // Slate 50
        },
      },
      keyframes: {
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "skeleton-loading": "fade-in-up 0.5s ease-out forwards",
        "not-foundName": "fade-in 0.5s ease-in-out forwards",
        "scale-in": "scaleIn 0.3s ease-out",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
});
```

**src/index.css:**
```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Outfit:wght@400;500;700&display=swap");
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply transition-colors duration-300 ease-in-out;
  }

  body {
    @apply font-sans bg-gray-50 text-gray-900 dark:bg-dark-bg dark:text-dark-text;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply font-heading tracking-tight;
  }
}
```

**📚 Explicación de la configuración:**

1. **Google Fonts** - Importamos Inter (sans) y Outfit (heading)
2. **Custom Colors** - Paleta premium con primary, secondary y dark
3. **Animations** - fade-in-up, fade-in, scale-in para transiciones suaves
4. **Typography Plugin** - Para estilos de texto mejorados
5. **Base Layer** - Transiciones globales y estilos de fuentes

### **Paso 1.4: Configurar alias de rutas**

**vite.config.js:**
```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  base: "https://Slinkter.github.io/myprojectapi01",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

**📚 Nota importante:**
- `fileURLToPath` y `__dirname` son necesarios para ES modules
- `base` usa la URL completa de GitHub Pages para deployment

**jsconfig.json:**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### **Paso 1.5: Configurar variables de entorno**

**.env:**
```env
VITE_GITHUB_API_URL=https://api.github.com
VITE_APP_BASENAME=/myprojectapi01
```

**.env.example:**
```env
VITE_GITHUB_API_URL=https://api.github.com
VITE_APP_BASENAME=/myprojectapi01
# VITE_GITHUB_TOKEN=your_token_here
```

### **✅ Checkpoint 1**

Verifica que todo funciona:
```bash
pnpm run dev
```

Deberías ver la app de Vite por defecto en `http://localhost:5173`

---

## 🏗️ Fase 2: Estructura Básica

### **Paso 2.1: Crear estructura de carpetas**

```bash
mkdir -p src/{app,components/{layout,ui},features/{users/{components,hooks},user-detail},hooks,services,docs}
```

**Estructura resultante:**
```
src/
├── app/                 # Redux store
├── components/          # Componentes compartidos
│   ├── layout/         # Layout components
│   └── ui/             # UI components
├── features/           # Features de la app
│   ├── users/         # Feature de usuarios
│   │   ├── components/
│   │   └── hooks/
│   └── user-detail/   # Feature de detalle
├── hooks/             # Custom hooks globales
├── services/          # API services
└── docs/              # Documentación
```

### **Paso 2.2: Configurar Redux Store**

**src/app/store.js:**
```javascript
/**
 * @file Redux Store Configuration
 * @description Centralized Redux store with all reducers
 */

import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "@/features/users/usersSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
```

### **Paso 2.3: Configurar el punto de entrada**

**src/main.jsx:**
```javascript
/**
 * @file Application Entry Point
 * @description Sets up React root with Redux and Router
 */

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter basename="/myprojectapi01">
      <App />
    </BrowserRouter>
  </Provider>
);
```

### **Paso 2.4: Crear App component básico**

**src/App.jsx:**
```javascript
/**
 * @file Main Application Component
 * @description Root component with routing
 */

import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Routes>
        <Route path="/" element={<div>Home - Users Search</div>} />
        <Route path="/user/:login" element={<div>User Detail</div>} />
      </Routes>
    </main>
  );
};

export default App;
```

### **✅ Checkpoint 2**

Verifica que Redux y Router están configurados:
```bash
pnpm run dev
```

---

## 🔄 Fase 3: State Management con Redux

### **Paso 3.1: Crear el Users Slice**

**src/features/users/usersSlice.js:**
```javascript
/**
 * @file Users Redux Slice
 * @description Manages users state with async thunks
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsersAPI } from "@/services/userService";

// Async thunk para fetch users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (searchTerm = "", { rejectWithValue }) => {
    try {
      const users = await fetchUsersAPI(searchTerm);
      return users;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.status,
      });
    }
  }
);

// Initial state
const initialState = {
  users: [],
  isLoading: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = "loading";
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = "failed";
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
```

**📚 Conceptos Clave:**

1. **createAsyncThunk** - Maneja operaciones asíncronas automáticamente
2. **createSlice** - Crea reducer y actions en uno
3. **extraReducers** - Maneja actions de thunks
4. **Estado de carga** - 'idle', 'loading', 'succeeded', 'failed'

### **✅ Ejercicio 3.1**

**Tarea:** Agrega un selector para obtener solo los usuarios que están "verified"

```javascript
// Hint: Usa createSelector de reselect
export const selectVerifiedUsers = createSelector(
  [(state) => state.users.users],
  (users) => users.filter(user => user.verified)
);
```

---

## 🌐 Fase 4: Integración con API

### **Paso 4.1: Crear el Service Layer**

**src/services/userService.js:**
```javascript
/**
 * @file User Service
 * @description GitHub API integration
 */

const API_BASE_URL = import.meta.env.VITE_GITHUB_API_URL;

// Custom Error Class
class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

/**
 * Fetch users from GitHub API
 * @param {string} searchTerm - Search query
 * @returns {Promise<Array>} Users array
 */
export const fetchUsersAPI = async (searchTerm = "") => {
  const url = searchTerm
    ? `${API_BASE_URL}/search/users?q=${encodeURIComponent(searchTerm)}`
    : `${API_BASE_URL}/users`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new ApiError(
        `HTTP error! status: ${response.status}`,
        response.status
      );
    }

    const data = await response.json();
    return searchTerm ? data.items : data;
  } catch (error) {
    console.error("Service: Failed to fetch users:", error);
    throw error;
  }
};
```

**📚 Conceptos Clave:**

1. **Service Layer** - Abstrae la lógica de API
2. **Custom Error** - Errores tipados con status
3. **Environment Variables** - Configuración flexible
4. **Error Handling** - Try/catch robusto

### **✅ Ejercicio 4.1**

**Tarea:** Agrega soporte para GitHub token en headers

```javascript
// Hint: Usa VITE_GITHUB_TOKEN del .env
const headers = import.meta.env.VITE_GITHUB_TOKEN 
  ? { Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}` }
  : {};

const response = await fetch(url, { headers });
```

---

## 🎨 Fase 5: Componentes UI

### **Paso 5.1: Crear Custom Hook para Debouncing**

**src/hooks/useDebouncedSearch.js:**
```javascript
/**
 * @file Debounced Search Hook
 * @description Optimizes search input with debouncing
 */

import { useState, useEffect } from "react";

export const useDebouncedSearch = (initialValue, delay) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, delay]);

  return [inputValue, setInputValue, debouncedValue];
};
```

**📚 ¿Por qué Debouncing?**

Sin debouncing:
```
Usuario escribe: "o" "c" "t" "o" "c" "a" "t"
API calls:        7 requests (uno por letra)
```

Con debouncing (300ms):
```
Usuario escribe: "o" "c" "t" "o" "c" "a" "t"
API calls:        1 request (después de terminar)
```

### **Paso 5.2: Crear componente UserCard**

**src/features/users/components/UserCard.jsx:**
```javascript
/**
 * @file User Card Component
 * @description Displays user information in a card
 */

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";

const UserCard = React.memo(({ user }) => {
  return (
    <Card className="w-full max-w-xs">
      <CardBody className="text-center">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="h-32 w-32 rounded-full mx-auto mb-4"
          loading="lazy"
        />
        <Typography variant="h5">{user.login}</Typography>
      </CardBody>
      <CardFooter>
        <Link to={`/user/${user.login}`}>
          <Button fullWidth>Ver Detalles</Button>
        </Link>
      </CardFooter>
    </Card>
  );
});

UserCard.displayName = "UserCard";

UserCard.propTypes = {
  user: PropTypes.shape({
    avatar_url: PropTypes.string,
    login: PropTypes.string,
    html_url: PropTypes.string,
  }).isRequired,
};

export default UserCard;
```

**📚 Optimizaciones:**
- `React.memo` - Evita re-renders innecesarios
- `loading="lazy"` - Lazy loading de imágenes
- `PropTypes` - Validación de props

### **✅ Ejercicio 5.1**

**Tarea:** Agrega animación de entrada con Intersection Observer

```javascript
// Hint: Usa useIntersectionObserver hook
const cardRef = useRef(null);
const isVisible = useIntersectionObserver(cardRef, { threshold: 0.1 });

const animationClass = isVisible
  ? "animate-scale-in opacity-100"
  : "opacity-0";
```

---

## ⚡ Fase 6: Features Avanzadas

### **Paso 6.1: Implementar Theme Toggle**

**src/hooks/useTheme.js:**
```javascript
/**
 * @file Theme Hook
 * @description Manages dark/light theme with localStorage
 */

import { useState, useEffect } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // 1. Check localStorage
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    
    // 2. Check system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return [theme, toggleTheme];
};
```

**📚 Conceptos:**
- **localStorage** - Persistencia de preferencias
- **matchMedia** - Detección de preferencias del sistema
- **useEffect** - Sincronización con DOM

### **Paso 6.2: Crear componente ThemeToggle**

**src/components/ui/ThemeToggle.jsx:**
```javascript
/**
 * @file Theme Toggle Component
 * @description Button to switch between themes
 */

import { IconButton } from "@material-tailwind/react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <div className="fixed top-6 right-6 z-50">
      <IconButton
        onClick={toggleTheme}
        className={theme === "dark" ? "bg-slate-800" : "bg-white"}
      >
        {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
      </IconButton>
    </div>
  );
};
```

---

## 🚀 Fase 7: Optimización

### **Paso 7.1: Implementar Skeleton Loaders**

**src/features/users/components/SkeletonCard.jsx:**
```javascript
/**
 * @file Skeleton Card Component
 * @description Loading placeholder
 */

import { Card, CardBody, CardFooter } from "@material-tailwind/react";

const SkeletonCard = () => (
  <Card className="w-full max-w-xs animate-pulse">
    <CardBody className="text-center">
      <div className="h-32 w-32 rounded-full bg-gray-300 mx-auto mb-4"></div>
      <div className="h-6 w-3/4 bg-gray-300 rounded mx-auto"></div>
    </CardBody>
    <CardFooter>
      <div className="h-12 w-full bg-gray-300 rounded"></div>
    </CardFooter>
  </Card>
);

export default SkeletonCard;
```

### **Paso 7.2: Code Splitting con React.lazy**

```javascript
// Lazy load de componentes pesados
const UserDetail = React.lazy(() => import("@/features/user-detail/UserDetail"));

// En el routing
<Suspense fallback={<Spinner />}>
  <Route path="/user/:login" element={<UserDetail />} />
</Suspense>
```

---

## 🌍 Fase 8: Deployment

### **Paso 8.1: Build para producción**

```bash
pnpm run build
```

### **Paso 8.2: Deploy a GitHub Pages**

**package.json:**
```json
{
  "scripts": {
    "predeploy": "pnpm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

```bash
pnpm add -D gh-pages
pnpm run deploy
```

---

## 🎯 Ejercicios Finales

### **Ejercicio 1: Paginación**
Implementa paginación infinita con Intersection Observer

### **Ejercicio 2: Filtros**
Agrega filtros por tipo de usuario (User, Organization)

### **Ejercicio 3: Favoritos**
Implementa sistema de favoritos con localStorage

### **Ejercicio 4: Tests**
Agrega tests con Vitest y React Testing Library

---

## 📚 Recursos Adicionales

- [React Docs](https://react.dev)
- [Redux Toolkit Docs](https://redux-toolkit.js.org)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [GitHub API Docs](https://docs.github.com/en/rest)

---

## ✅ Checklist Final

- [ ] Proyecto configurado con Vite
- [ ] Redux Toolkit implementado
- [ ] API integration funcionando
- [ ] Componentes UI creados
- [ ] Theme toggle implementado
- [ ] Optimizaciones aplicadas
- [ ] Build de producción exitoso
- [ ] Deploy a GitHub Pages

---

## 📎 Apéndice: Componentes Completos

Esta sección contiene el código completo de todos los componentes del proyecto para referencia.

### **A.1: UserList Component**

**src/features/users/components/UserList.jsx:**
```javascript
import UserCard from "./UserCard";
import PropTypes from "prop-types";

const UserList = ({ users }) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 w-full max-w-screen-2xl p-4">
      {users.map((user, index) => (
        <li
          key={user.id}
          className="animate-skeleton-loading flex justify-center"
          style={{
            animationDelay: `${index * 150}ms`,
            animationFillMode: "backwards",
          }}
        >
          <UserCard user={user} />
        </li>
      ))}
    </ul>
  );
};

UserList.propTypes = {
  users: PropTypes.array.isRequired,
};

export default UserList;
```

**📚 Características:**
- Grid responsive con 1-4 columnas
- Animaciones escalonadas (150ms entre cards)
- Usa `animationFillMode: "backwards"` para evitar flash

---

### **A.2: SkeletonGrid Component**

**src/features/users/components/SkeletonGrid.jsx:**
```javascript
import SkeletonCard from "./SkeletonCard";

const SKELETON_COUNT = 30;

const SkeletonGrid = () => (
  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 w-full max-w-screen-2xl p-4">
    {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
      <li
        key={index}
        className="animate-skeleton-loading flex justify-center"
        style={{
          animationDelay: `${index * 150}ms`,
          animationFillMode: "backwards",
        }}
      >
        <SkeletonCard />
      </li>
    ))}
  </ul>
);

export default SkeletonGrid;
```

**📚 Características:**
- Muestra 30 skeleton cards
- Misma estructura de grid que UserList
- Animaciones idénticas para transición suave

---

### **A.3: PageHeader Component**

**src/components/layout/PageHeader.jsx:**
```javascript
import PropTypes from "prop-types";
import { Typography, Input, Spinner } from "@material-tailwind/react";
import { MdCancel } from "react-icons/md";

const PageHeader = ({ searchTerm, handleSearch, isSearching }) => (
  <header className="flex flex-col w-full max-w-screen-2xl my-8 items-center px-4">
    <div className="w-full max-w-3xl mb-4 text-center text-green-500 dark:text-green-300">
      <Typography variant="h1" color="inherit">
        API - Github Users
      </Typography>
    </div>

    <div className="w-full max-w-md mx-auto">
      <Input
        key="search-input"
        className="text-gray-900 dark:text-gray-50 !border !border-gray-500 bg-white dark:bg-gray-800 shadow-sm shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10 dark:focus:!border-white dark:focus:!border-t-white dark:focus:ring-white/10"
        labelProps={{
          className: "hidden",
        }}
        label={isSearching ? "Cargando datos..." : "Buscar usuario..."}
        type="text"
        color="black"
        placeholder={isSearching ? "Cargando datos..." : "Buscar usuario..."}
        value={searchTerm}
        onChange={handleSearch}
        icon={
          isSearching ? (
            <Spinner className="h-5 w-5" />
          ) : searchTerm ? (
            <MdCancel
              className="h-5 w-5 cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-gray-50"
              onClick={() => handleSearch({ target: { value: "" } })}
            />
          ) : null
        }
      />
    </div>
  </header>
);

PageHeader.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  isSearching: PropTypes.bool.isRequired,
};

export default PageHeader;
```

**📚 Características:**
- Input controlado con Material Tailwind
- Spinner durante búsqueda
- Botón de limpiar (X) cuando hay texto
- Estilos para dark mode

---

### **A.4: ErrorDisplay Component**

**src/components/layout/ErrorDisplay.jsx:**
```javascript
import { Typography, Button } from "@material-tailwind/react";
import PropTypes from "prop-types";

const ErrorDisplay = ({ message, onRetry }) => (
  <div className="min-h-dvh flex flex-col justify-center items-center text-center p-8 gap-4">
    <Typography variant="h3" className="text-center text-3xl text-red-500">
      {message}
    </Typography>
    <Button color="blue" onClick={onRetry} className="mt-4">
      Reintentar
    </Button>
  </div>
);

ErrorDisplay.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default ErrorDisplay;
```

**📚 Uso:**
```javascript
{status === 'failed' && (
  <ErrorDisplay 
    message={error?.message || "Error al cargar usuarios"} 
    onRetry={() => dispatch(fetchUsers(searchTerm))}
  />
)}
```

---

### **A.5: NotFound Component**

**src/components/layout/NotFound.jsx:**
```javascript
import { Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";

const NotFound = ({ searchTerm }) => (
  <div className="animate-not-foundName flex items-center justify-center text-center p-8 mt-10">
    <Typography
      variant="h3"
      className="text-3xl text-slate-900 dark:text-dark-text"
    >
      No se encontraron usuarios con &quot;{searchTerm}&quot;.
    </Typography>
  </div>
);

NotFound.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};

export default NotFound;
```

**📚 Uso:**
```javascript
{status === 'succeeded' && users.length === 0 && searchTerm && (
  <NotFound searchTerm={searchTerm} />
)}
```

---

### **A.6: UserDetail Component (Completo)**

**src/features/user-detail/UserDetail.jsx:**
```javascript
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import {
  FaArrowLeft,
  FaGithub,
  FaMapMarkerAlt,
  FaLink,
  FaUsers,
  FaBook,
} from "react-icons/fa";

const UserDetail = () => {
  const { login } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.github.com/users/${login}`);

        if (!response.ok) {
          throw new Error(`Error ${response.status}: Usuario no encontrado`);
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetail();
  }, [login]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner className="h-12 w-12" color="green" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl">
        <Link to="/" className="inline-block mb-6">
          <Button
            variant="text"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-200"
          >
            <FaArrowLeft /> Volver a la búsqueda
          </Button>
        </Link>
        <Card className="p-8 bg-red-50 dark:bg-red-900/20">
          <Typography
            variant="h4"
            className="text-red-600 dark:text-red-400 text-center"
          >
            {error}
          </Typography>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl animate-fade-in-up">
      <Link to="/" className="inline-block mb-6">
        <Button
          variant="text"
          className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <FaArrowLeft /> Volver a la búsqueda
        </Button>
      </Link>

      <Card className="w-full bg-white dark:bg-gray-800 shadow-xl overflow-hidden">
        <CardHeader
          floated={false}
          shadow={false}
          className="bg-gradient-to-r from-green-500 to-green-700 dark:from-green-600 dark:to-green-800 m-0 p-8"
        >
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="h-32 w-32 md:h-40 md:w-40 rounded-full overflow-hidden shadow-2xl shrink-0 border-4 border-white dark:border-gray-700">
              <img
                src={user.avatar_url}
                alt={user.login}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col text-center md:text-left text-white">
              <Typography
                variant="h2"
                className="text-3xl md:text-4xl font-bold mb-2"
              >
                {user.name || user.login}
              </Typography>
              <Typography className="text-green-100 font-medium mb-1">
                @{user.login}
              </Typography>
              {user.bio && (
                <Typography className="text-green-50 mt-3 max-w-2xl">
                  {user.bio}
                </Typography>
              )}
            </div>
          </div>
        </CardHeader>

        <CardBody className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center">
              <FaBook className="mx-auto mb-2 text-2xl text-blue-500" />
              <Typography
                variant="h4"
                className="text-gray-900 dark:text-gray-50 font-bold"
              >
                {user.public_repos}
              </Typography>
              <Typography className="text-sm text-gray-600 dark:text-gray-400">
                Repositorios
              </Typography>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center">
              <FaUsers className="mx-auto mb-2 text-2xl text-green-500" />
              <Typography
                variant="h4"
                className="text-gray-900 dark:text-gray-50 font-bold"
              >
                {user.followers}
              </Typography>
              <Typography className="text-sm text-gray-600 dark:text-gray-400">
                Seguidores
              </Typography>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center">
              <FaUsers className="mx-auto mb-2 text-2xl text-purple-500" />
              <Typography
                variant="h4"
                className="text-gray-900 dark:text-gray-50 font-bold"
              >
                {user.following}
              </Typography>
              <Typography className="text-sm text-gray-600 dark:text-gray-400">
                Siguiendo
              </Typography>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg text-center">
              <FaBook className="mx-auto mb-2 text-2xl text-amber-500" />
              <Typography
                variant="h4"
                className="text-gray-900 dark:text-gray-50 font-bold"
              >
                {user.public_gists}
              </Typography>
              <Typography className="text-sm text-gray-600 dark:text-gray-400">
                Gists
              </Typography>
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-3 mb-6">
            {user.company && (
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <FaUsers className="text-gray-500 dark:text-gray-400" />
                <Typography>{user.company}</Typography>
              </div>
            )}

            {user.location && (
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <FaMapMarkerAlt className="text-gray-500 dark:text-gray-400" />
                <Typography>{user.location}</Typography>
              </div>
            )}

            {user.blog && (
              <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <FaLink className="text-gray-500 dark:text-gray-400" />
                <a
                  href={
                    user.blog.startsWith("http")
                      ? user.blog
                      : `https://${user.blog}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {user.blog}
                </a>
              </div>
            )}
          </div>

          {/* Action Button */}
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button
              size="lg"
              className="flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 w-full"
            >
              <FaGithub size={20} /> Ver Perfil Completo en GitHub
            </Button>
          </a>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserDetail;
```

**📚 Características:**
- Fetch directo de API (no usa Redux)
- Estados de loading, error y success
- Grid de estadísticas responsive
- Información condicional (company, location, blog)
- Gradiente en header
- Botón de regreso

---

### **A.7: UserSearch Component (Integración Completa)**

**src/features/users/UserSearch.jsx:**
```javascript
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";
import { useUserFetching } from "./hooks/useUserFetching";
import PageHeader from "@/components/layout/PageHeader";
import ErrorDisplay from "@/components/layout/ErrorDisplay";
import NotFound from "@/components/layout/NotFound";
import UserList from "./components/UserList";
import SkeletonGrid from "./components/SkeletonGrid";

const UserSearch = () => {
  const [searchTerm, setSearchTerm, debouncedSearchTerm] = useDebouncedSearch("", 300);
  const { users, status, error } = useUserFetching(debouncedSearchTerm);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const renderContent = () => {
    if (status === "loading") {
      return <SkeletonGrid />;
    }

    if (status === "failed") {
      return (
        <ErrorDisplay
          message={error?.message || "Error al cargar usuarios"}
          onRetry={() => window.location.reload()}
        />
      );
    }

    if (status === "succeeded" && users.length === 0 && debouncedSearchTerm) {
      return <NotFound searchTerm={debouncedSearchTerm} />;
    }

    if (status === "succeeded" && users.length > 0) {
      return <UserList users={users} />;
    }

    return null;
  };

  return (
    <div className="flex flex-col items-center">
      <PageHeader
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        isSearching={status === "loading"}
      />
      {renderContent()}
    </div>
  );
};

export default UserSearch;
```

**📚 Flujo completo:**
1. Usuario escribe → `searchTerm` actualiza inmediatamente
2. Después de 300ms → `debouncedSearchTerm` actualiza
3. `useUserFetching` detecta cambio y hace fetch
4. `renderContent()` muestra el estado apropiado

---

**¡Felicidades! Has completado el tutorial completo.** 🎉
