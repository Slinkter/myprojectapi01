# 05 - Arquitectura de Flujo de Datos y Algoritmos

## 🌊 Flujo de Datos (ASCII Sequence Diagram)

```text
Usuario      Input      Debounce      Redux      Adapter      API (GitHub)
  │            │           │            │           │            │
  │── (escribe)▶           │            │           │            │
  │            │── (wait) ─▶            │           │            │
  │            │           │──(fetch)──▶│           │            │
  │            │           │            │──(Abort prev)─────────▶│
  │            │           │            │           │            │
  │            │           │            │──(request)────────────▶│
  │            │           │            │           │            │
  │            │           │            │◀──(raw response)───────│
  │            │           │            │           │            │
  │            │           │            │◀──(Adapted data)───────│
  │            │           │            │           │            │
  │◀──(Render Data)────────│            │           │            │
```

## ⏱️ Algoritmos Clave

### 1. Algoritmo de Debouncing (Control de Frecuencia)
**Ubicación:** `useDebouncedSearch.js`
*   **Funcionamiento:** Cada tecla reinicia un `setTimeout`. Solo cuando el usuario para de escribir (ej. 300ms), se actualiza el valor que dispara la búsqueda.
*   **Eficiencia:** $O(1)$ por pulsación, ahorrando hasta un 90% de llamadas innecesarias a la API.

### 2. Algoritmo de Reconciliación (Fiber)
**Ubicación:** Interno de React
*   **Funcionamiento:** Diferenciación (Diffing) heurística de $O(n)$ entre árboles virtuales. Mapea cambios mínimos al DOM real usando `keys`.

### 3. Algoritmo de Intersección (AABB)
**Ubicación:** `useIntersectionObserver.js` y `UserCard.jsx`
*   **Funcionamiento:** Comprueba colisión entre el Viewport y el elemento. Si hay intersección, renderiza; si no, mantiene un placeholder ligero.
*   **Performance:** Reduce el costo de renderizado fuera de pantalla (Virtualización Lite).

### 4. Algoritmo de Cancelación de Tareas (AbortController)
**Ubicación:** `useUserFetching.js` y `userService.js`
*   **Funcionamiento:** Previene **Race Conditions**. Si una nueva petición "B" inicia antes de que "A" termine, la petición "A" es abortada por el navegador.

## 🌳 Grafo de Árbol de Invocaciones (Props Tree)

```text
<App> (Inyecta Redux Store + Rutas)
  │
  ├─ <ThemeToggle> --------- (Lee/Escribe LocalStorage: "DarkMode")
  │
  ├─ <UserSearch> ---------- (Facade: useUserSearchFacade)
  │   │
  │   ├─ <PageHeader> ------ (isSearching / handleSearch)
  │   │
  │   └─ <ResultFactory> --- (Fábrica de Tarjetas: Decide User vs Org)
  │       │
  │       └─ <UserCard> ---- (Compound Component: Avatar, Header, Footer)
  │
  └─ <UserDetail> ---------- (Carga asíncrona vía React.lazy)
```
