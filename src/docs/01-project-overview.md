# GitHub Users API - Project Overview

## 📋 Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Key Concepts](#key-concepts)

---

## 🎯 Introduction

Este proyecto es una **aplicación web moderna** que consume la API de GitHub para buscar y visualizar información de usuarios. Está diseñado con un enfoque educativo, implementando las mejores prácticas de desarrollo frontend con React.

### **Propósito Educativo**

El proyecto sirve como ejemplo completo de:
- ✅ Arquitectura basada en features (Feature-Based Architecture)
- ✅ Gestión de estado con Redux Toolkit
- ✅ Custom Hooks reutilizables
- ✅ Optimizaciones de rendimiento
- ✅ Integración con APIs externas
- ✅ UI/UX profesional con Material Tailwind

---

## ✨ Features

### **Funcionalidades Principales**

1. **🔍 Búsqueda de Usuarios**
   - Búsqueda en tiempo real con debouncing (300ms)
   - Resultados instantáneos desde la API de GitHub
   - Manejo de estados de carga y errores

2. **👤 Perfil de Usuario**
   - Vista detallada de cada usuario
   - Estadísticas (repos, followers, following, gists)
   - Información de ubicación, empresa y sitio web
   - Enlace directo al perfil de GitHub

3. **🎨 Interfaz de Usuario**
   - Diseño responsive (mobile-first)
   - Modo oscuro/claro con persistencia
   - Animaciones suaves (scroll animations)
   - Skeleton loaders durante carga

4. **⚡ Optimizaciones de Rendimiento**
   - React.memo para evitar re-renders innecesarios
   - Lazy loading de imágenes
   - Intersection Observer para animaciones
   - Debouncing en búsqueda

---

## 🛠️ Tech Stack

### **Core Technologies**

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 18.3.1 | UI Library |
| **Vite** | 5.4.11 | Build Tool |
| **Redux Toolkit** | 2.5.0 | State Management |
| **React Router** | 7.1.1 | Client-side Routing |

### **UI & Styling**

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Tailwind CSS** | 3.4.17 | Utility-first CSS |
| **Material Tailwind** | 2.1.10 | Component Library |
| **React Icons** | 5.4.0 | Icon Library |

### **Development Tools**

- **ESLint** - Linting y code quality
- **PostCSS** - CSS processing
- **pnpm** - Package manager

---

## 📁 Project Structure

```
myprojectapi01/
├── src/
│   ├── app/                    # Redux store configuration
│   │   └── store.js
│   ├── components/             # Shared components
│   │   ├── layout/            # Layout components
│   │   │   ├── PageHeader.jsx
│   │   │   ├── ErrorDisplay.jsx
│   │   │   └── NotFound.jsx
│   │   └── ui/                # UI components
│   │       └── ThemeToggle.jsx
│   ├── features/              # Feature-based modules
│   │   ├── users/            # Users feature
│   │   │   ├── components/   # Feature-specific components
│   │   │   ├── hooks/        # Feature-specific hooks
│   │   │   ├── UserSearch.jsx
│   │   │   ├── usersSlice.js
│   │   │   └── index.js
│   │   └── user-detail/      # User detail feature
│   │       └── UserDetail.jsx
│   ├── hooks/                 # Global custom hooks
│   │   ├── useTheme.js
│   │   ├── useDebouncedSearch.js
│   │   └── useIntersectionObserver.js
│   ├── services/              # API services
│   │   └── userService.js
│   ├── docs/                  # Documentation
│   ├── App.jsx               # Root component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── public/                    # Static assets
├── .env                       # Environment variables
├── .env.example              # Environment template
├── vite.config.js            # Vite configuration
├── tailwind.config.cjs       # Tailwind configuration
└── package.json              # Dependencies
```

---

## 🔑 Key Concepts

### **1. Feature-Based Architecture**

El proyecto está organizado por **features** (características) en lugar de por tipo de archivo:

```
features/
  users/
    ├── components/      # Componentes específicos de users
    ├── hooks/          # Hooks específicos de users
    ├── UserSearch.jsx  # Componente principal
    ├── usersSlice.js   # Estado Redux
    └── index.js        # Barrel export
```

**Ventajas:**
- ✅ Alta cohesión - código relacionado está junto
- ✅ Fácil de escalar - agregar features es simple
- ✅ Mejor mantenibilidad - cambios aislados por feature

### **2. Redux Toolkit para State Management**

Usamos Redux Toolkit para gestionar el estado global:

- **Store único** - Single source of truth
- **Slices** - Reducers modulares por feature
- **Async Thunks** - Manejo de operaciones asíncronas
- **DevTools** - Debugging integrado

### **3. Custom Hooks**

Abstraemos lógica reutilizable en custom hooks:

- `useTheme` - Gestión de tema dark/light
- `useDebouncedSearch` - Optimización de búsqueda
- `useIntersectionObserver` - Detección de visibilidad
- `useUserFetching` - Fetching de datos de usuarios

### **4. Performance Optimizations**

Implementamos múltiples técnicas de optimización:

- **React.memo** - Evitar re-renders innecesarios
- **Debouncing** - Reducir llamadas a API
- **Lazy Loading** - Cargar imágenes bajo demanda
- **Code Splitting** - Dividir código por rutas

### **5. API Integration**

Integración con GitHub API:

- **Service Layer** - Abstracción de llamadas HTTP
- **Error Handling** - Manejo robusto de errores
- **Custom Error Class** - ApiError con status codes
- **Rate Limiting** - Soporte para tokens de autenticación

---

## 🎓 Learning Objectives

Al estudiar este proyecto, aprenderás:

1. **Arquitectura Moderna de React**
   - Feature-based organization
   - Separation of concerns
   - Clean code principles

2. **State Management Avanzado**
   - Redux Toolkit
   - Async operations
   - Normalized state

3. **Performance Optimization**
   - Memoization
   - Lazy loading
   - Debouncing/Throttling

4. **API Integration**
   - RESTful APIs
   - Error handling
   - Loading states

5. **UI/UX Best Practices**
   - Responsive design
   - Accessibility
   - User feedback

---

## 📚 Next Steps

Para profundizar en cada aspecto del proyecto:

1. [Architecture](./02-architecture.md) - Arquitectura detallada
2. [State Management](./03-state-management.md) - Redux Toolkit
3. [Custom Hooks](./04-custom-hooks.md) - Hooks personalizados
4. [Component Library](./05-component-library.md) - Componentes
5. [API Integration](./07-api-integration.md) - Integración con APIs

---

## 🚀 Quick Start

```bash
# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar desarrollo
pnpm run dev

# Build para producción
pnpm run build
```

---

**Siguiente:** [Arquitectura del Proyecto →](./02-architecture.md)
