# Guía para Desarrolladores

## 1. Instalación y Setup

Prerrequisitos: Node.js 18+ y npm/pnpm.

```bash
# Clonar el repositorio
git clone <repo-url>

# Instalar dependencias
npm install 
# o
pnpm install

# Iniciar servidor de desarrollo
npm run dev
```

## 2. Scripts Disponibles

- `npm run dev`: Inicia el servidor local con Vite (HMR activo).
- `npm run build`: Genera la versión de producción en la carpeta `dist/`.
- `npm run preview`: Sirve localmente la build de producción para pruebas.
- `npm run lint`: Ejecuta ESLint para verificar calidad de código.

## 3. Convenciones del Proyecto

### Naming
- **Componentes:** `PascalCase.jsx` (Ej: `UserCard.jsx`).
- **Hooks:** `camelCase` con prefijo `use` (Ej: `useTheme.js`).
- **Funciones/Variables:** `camelCase` (Ej: `fetchUsersAPI`, `isLoading`).
- **Constantes:** `UPPER_SNAKE_CASE` (Ej: `API_BASE_URL`).

### Estructura de Archivos (Feature-Based)
Al crear una nueva funcionalidad, agrégala en `src/features/nombre-feature/`.
Evita agregar lógica de negocio compleja directamente en componentes de UI.

## 4. Guía de Estilos (Híbrida - Advertencia)

⚠️ **Estado Actual:** El proyecto tiene una mezcla de **Material Tailwind**, **Tailwind CSS puro** y clases **BEM** heredadas.

**Convención Recomendada (Refactor Futuro):**
Priorizar el enfoque *Utility-First* de Tailwind CSS.

- **Correcto (Tailwind):**
  ```jsx
  <div className="flex items-center justify-center p-4 bg-gray-100">
  ```

- **A evitar (BEM + Tailwind mezlado):**
  ```jsx
  <div className="user-card__header flex p-4"> 
  {/* user-card__header está definido en index.css */}
  ```

Si necesitas estilos personalizados complejos, úsalos en `index.css` con `@apply` de Tailwind, pero prefiere siempre las clases utilitarias directa o componentes de Material Tailwind.

## 5. Buenas Prácticas
1. **Compromiso con Clean Code:** Mantén funciones pequeñas y con una única responsabilidad.
2. **Imports:** (Pendiente) Se recomienda configurar alias `@/` para evitar `../../../`.
3. **Manejo de Errores:** Usa bloques `try/catch` en servicios asíncronos y maneja los errores en el UI mediante el estado de Redux.
