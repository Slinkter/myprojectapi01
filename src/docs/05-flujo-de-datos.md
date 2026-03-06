# 🔄 Flujo de Datos y Estado (Senior Protocol v3)

## 1. Single Source of Truth

La aplicación divide su estado en dos categorías críticas:

- **Server State:** Gestionado por **TanStack Query (React Query)**. Es el único responsable de la sincronización con la API de GitHub.
- **UI/Global State:** Gestionado por hooks personalizados (`useTheme`) o Redux (para configuraciones globales persistentes).

## 2. El Ciclo de Datos (React Query Flow)

1.  **Activación:** El usuario escribe en el buscador. El `useUserSearchFacade` detecta el cambio.
2.  **Debouncing:** El hook `useDebouncedSearch` espera 500ms antes de actualizar el `debouncedSearchTerm`.
3.  **Evaluación de Caché:** React Query verifica si ya existen datos para esa `queryKey: ["users", searchTerm]`.
4.  **Fetching (si es necesario):** Se dispara la petición a la API de GitHub a través del `userService`.
5.  **Normalización:** Los datos crudos pasan por el **userAdapter** antes de ser inyectados en la caché de React Query.
6.  **Sincronización:** Los componentes suscritos (`UserList`) se re-renderizan automáticamente con los nuevos datos.
7.  **Renderizado:** La UI aplica el diseño minimalista y animaciones suaves de entrada.

---

## 3. Optimización de Performance (Senior Standards)

### Caché Persistente (`staleTime`)

Hemos configurado un `staleTime` de 5 minutos. Esto significa que si el usuario busca "octocat", navega al detalle y luego vuelve a buscar "octocat", los datos aparecerán instantáneamente sin peticiones de red.

### Abort Signals Automáticos

React Query provee un `signal` a la función de fetch. Si el usuario sigue escribiendo y cambia el término de búsqueda, la petición anterior de red se **aborta automáticamente**, ahorrando ancho de banda y evitando condiciones de carrera (Race Conditions).

### Minimalismo en el DOM

El uso de `content-visibility: auto` y un número reducido de nodos por tarjeta garantiza que el scroll sea fluido incluso con cientos de resultados.

---

## 4. Estructura del Caché (React Query)

```javascript
queryCache: {
  ["users", ""]: [ ...adaptados ],
  ["users", "octocat"]: [ ...adaptados ],
  ["user", "octocat"]: { ...perfil_adaptado }
}
```
