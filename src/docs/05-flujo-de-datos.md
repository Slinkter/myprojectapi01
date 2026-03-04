# 🔄 Flujo de Datos y Estado (Senior Protocol)

## 1. Single Source of Truth
El estado de la aplicación reside en el **Redux Store**, organizado mediante **Slices** de Redux Toolkit.

## 2. El Ciclo de Datos (Master's Level Flow)

1.  **Activación:** El usuario escribe en el buscador. El `useUserSearchFacade` detecta el cambio (con debouncing).
2.  **Transición:** Se usa `useTransition` de React para mantener el input fluido mientras se procesa la búsqueda.
3.  **Acción:** Se dispara el Thunk `fetchUsers`.
4.  **Normalización:** El thunk recibe datos crudos, los pasa por el **Adaptador** y guarda solo el modelo estandarizado en el Store.
5.  **Derivación (Selectors):** Los componentes no leen el Store directamente; usan `createSelector` para derivar estados como `selectIsUsersEmpty`.
6.  **Renderizado:** La UI recibe los datos refinados y los anima mediante **Motion v12**.

---

## 3. Optimización de Performance (Vercel Standards)

### Selectores Memoizados (`reselect`)
Hemos implementado selectores que evitan que un componente se re-renderice si la parte del estado que consume no ha cambiado.

```javascript
// Ejemplo de Selector Senior
export const selectIsUsersEmpty = createSelector(
  [selectAllUsers, selectUsersStatus],
  (users, status) => status === "succeeded" && users.length === 0
);
```

### Abort Signals
Cada petición HTTP está atada a un `AbortController`. Si el usuario cambia la búsqueda antes de que termine la petición anterior, esta se cancela automáticamente para liberar ancho de banda.

---

## 4. Estructura del Store

```javascript
store: {
  users: {
    users: Array<UserProfile>, // Modelos adaptados
    isLoading: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: { message: string, status?: number }
  }
}
```
