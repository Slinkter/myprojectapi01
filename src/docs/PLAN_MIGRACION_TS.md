# 🟦 PLAN DE MIGRACIÓN: JavaScript ➔ TypeScript
> **Proyecto:** myprojectapi01  
> **Arquitectura:** Feature-Based + Adapter/Facade Pattern  
> **Objetivo:** Tipado estricto, seguridad de datos y autocompletado de élite.

---

## 📋 ESTRATEGIA GENERAL
La migración se realizará de **adentro hacia afuera** (Bottom-Up). Primero tiparemos los modelos de datos (Domain), luego los servicios e infraestructura, y finalmente los componentes de la interfaz de usuario.

---

## 🚀 FASE 1: Preparación del Entorno (Setup)

1. **Instalar Dependencias de TS:**
   ```bash
   pnpm add -D typescript @types/react @types/react-dom @types/node
   ```
2. **Inicializar TypeScript:**
   - Crear `tsconfig.json` con configuración estricta.
   - Configurar `compilerOptions.paths` para mantener el alias `@/*`.
3. **Renombrar archivos de configuración:**
   - `vite.config.js` ➔ `vite.config.ts` (ajustar imports si es necesario).

---

## 🏗️ FASE 2: Definición del Dominio (Types & Interfaces)

1. **Crear Directorio de Tipos Globales:** `src/types/`.
2. **Definir `User.ts`:**
   - Crear la interfaz `UserProfile` basada en el `userAdapter`.
   - Crear tipos para los estados de la API (User vs Organization).
3. **Definir Tipos de Respuesta de API:**
   - Tipar la respuesta cruda de la API de GitHub para que el adaptador sea 100% seguro.

---

## 🔄 FASE 3: Infraestructura y Adaptadores (The Boundaries)

1. **Migrar `src/models/adapters/userAdapter.js` ➔ `.ts`:**
   - Tipar las funciones de entrada y salida.
   - *Este es el paso más importante para evitar errores de datos.*
2. **Migrar `src/services/userService.js` ➔ `.ts`:**
   - Tipar los retornos de las Promesas: `Promise<UserProfile[]>`.
   - Tipar la clase `ApiError`.
3. **Migrar `src/app/config.js` ➔ `.ts`:**
   - Asegurar el tipado de `import.meta.env`.

---

## 🪝 FASE 4: Hooks y Facades (Business Logic)

1. **Migrar Custom Hooks:** `useDebounce`, `useTheme`, `useIntersectionObserver`.
2. **Tipar TanStack Query:**
   - Configurar `useUserQuery` y `useUserDetailQuery` con genéricos: `useQuery<UserProfile, ApiError>`.
3. **Migrar Facades:** `useUserSearchFacade.ts`.
   - Definir la interfaz de retorno del Facade para que el componente solo vea lo que necesita.

---

## 🎨 FASE 5: Componentes de UI (The Surface)

1. **Migrar Componentes `.jsx` ➔ `.tsx`:**
   - Empezar por componentes pequeños: `ThemeToggle`, `SkeletonCard`, `ErrorDisplay`.
2. **Reemplazar PropTypes:**
   - Eliminar la librería `prop-types`.
   - Usar Interfaces de TS para definir las Props.
3. **Tipar Referencias y Eventos:**
   - Usar `useRef<HTMLDivElement>(null)`.
   - Tipar eventos de formulario: `React.ChangeEvent<HTMLInputElement>`.

---

## 🧹 FASE 6: Limpieza y Modo Estricto

1. **Eliminar archivos `.js` residuales.**
2. **Activar `strict: true`** en `tsconfig.json` si no se hizo al inicio.
3. **Validación de Build:**
   - Ejecutar `tsc --noEmit` para verificar que no existan errores de tipo en todo el proyecto.

---

## 💡 CONSEJOS PRO PARA ESTE PROYECTO

- **Usa el Facade Pattern a tu favor:** Si el Facade está bien tipado, los componentes de la feature (`UserSearch.tsx`) se tiparán casi solos.
- **Evita el tipo `any`:** Especialmente en los Adapters. El objetivo de este proyecto es la precisión.
- **Motion + TS:** Asegúrate de que las props de `motion` estén correctamente integradas al migrar `UserCard` y `UserList`.

---
*Plan generado para la migración estratégica de myprojectapi01.*
