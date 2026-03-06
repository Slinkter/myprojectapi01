# 📔 EL LIBRO DE LA ARQUITECTURA: Tutorial Paso a Paso (v3)

Bienvenido a la guía definitiva de `myprojectapi01`. Este libro te llevará desde los conceptos básicos hasta los patrones de diseño más avanzados utilizados en el desarrollo de software moderno con React y TanStack Query.

---

## 📗 Capítulo 1: El Sistema de Debugging "Elite"

Antes de construir, debemos ver qué ocurre. Implementamos un sistema de logueo de alto nivel en `src/app/logger.js`.

- **Render Tracking:** Usamos `useRef` para contar y etiquetar cada renderizado en la consola.
- **Visual Flow:** Agregamos ASCII Art para visualizar estados asíncronos (`API FETCH`, `LOADING`, `SUCCESS`).
- **Estilos CSS:** Los logs están diferenciados por colores según su tipo (Estado, Redux, Efecto).

---

## 📘 Capítulo 2: El Patrón de Fachada (Facade) y TanStack Query

¿Por qué `UserSearch.jsx` es tan corto? Porque usamos una **Fachada** (`useUserSearchFacade.js`) potenciada por **TanStack Query**.

1.  **El Problema:** Manejar estados de carga, errores y caché manualmente en Redux con Thunks es verboso y propenso a errores.
2.  **La Solución:** TanStack Query gestiona el estado del servidor. La Fachada orquesta el debouncing y entrega una API limpia: `{ users, status, isLoading, isSuccess }`.
3.  **Resultado:** Implementamos caché automático por 5 minutos y cancelación automática de peticiones (Abort Signals).

---

## 📙 Capítulo 3: El Patrón Adapter y la Inmutabilidad de Modelo

Aprendimos que las APIs externas (GitHub) son traicioneras; pueden cambiar sus nombres de campo en cualquier momento.

- **Adapter Pattern:** Implementamos `userAdapter.js`. Transformamos `avatar_url` de GitHub en `photo` de nuestra App.
- **Seguridad:** Si GitHub cambia su API, solo tocamos el Adapter. ¡Esto es **Arquitectura Limpia**!

---

## 📓 Capítulo 4: Componentes Compuestos (Compound Components)

Refactorizamos el `UserCard.jsx` para darle poder al programador que lo usa.

- **Estructura:** `<UserCard.Avatar />`, `<UserCard.Header />`, `<UserCard.Footer />`.

---

## 📒 Capítulo 5: Resiliencia y Performance Minimalista

En el capítulo final, blindamos la aplicación bajo el estándar **Minimalist v3**.

- **ErrorBoundary:** Una red de seguridad que atrapa errores de renderizado.
- **Suspense & Lazy:** La aplicación descarga las rutas solo cuando el usuario navega a ellas.
- **IntersectionObserver:** Las tarjetas solo se animan y procesan cuando entran en el viewport, optimizando el uso de la GPU.
- **Caché de Datos:** Gracias a React Query, la navegación de regreso es instantánea (0ms de carga).

---

### 🎓 Epílogo: El Estándar Profesional

Este proyecto demuestra cómo aplicar **Ingeniería de Software** para crear aplicaciones mantenibles, resilientes y con una estética de alta gama.
