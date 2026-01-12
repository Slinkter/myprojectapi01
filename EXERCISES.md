# 📝 Ejercicios Prácticos

## 🎯 Objetivo

Estos ejercicios te ayudarán a profundizar en los conceptos aprendidos y a practicar la implementación de features adicionales.

---

## 📚 Nivel Básico

### **Ejercicio 1: Agregar contador de resultados**

**Objetivo:** Mostrar cuántos usuarios se encontraron en la búsqueda

**Pasos:**
1. Crear un componente `ResultsCount.jsx`
2. Mostrar el número de usuarios encontrados
3. Agregar al `UserSearch` component

**Solución esperada:**
```javascript
const ResultsCount = ({ count }) => (
  <Typography className="text-gray-600 dark:text-gray-400">
    {count} usuarios encontrados
  </Typography>
);
```

---

### **Ejercicio 2: Botón de limpiar búsqueda**

**Objetivo:** Agregar un botón para limpiar el input de búsqueda

**Pasos:**
1. Modificar `PageHeader.jsx`
2. Agregar botón con icono de "X"
3. Al hacer click, limpiar el searchTerm

**Hint:** Ya existe un icono `MdCancel` en el código actual

---

### **Ejercicio 3: Mensaje de bienvenida**

**Objetivo:** Mostrar un mensaje cuando no hay búsqueda activa

**Pasos:**
1. Crear componente `WelcomeMessage.jsx`
2. Mostrar cuando `searchTerm === ""`
3. Incluir instrucciones de uso

---

## 🔥 Nivel Intermedio

### **Ejercicio 4: Filtro por tipo de usuario**

**Objetivo:** Permitir filtrar entre Users y Organizations

**Pasos:**
1. Agregar selector de tipo en `PageHeader`
2. Modificar `fetchUsersAPI` para incluir tipo en query
3. Actualizar Redux slice para manejar el filtro

**API Query:**
```javascript
// Para solo usuarios
`/search/users?q=${searchTerm}+type:user`

// Para solo organizaciones
`/search/users?q=${searchTerm}+type:org`
```

---

### **Ejercicio 5: Sistema de favoritos**

**Objetivo:** Permitir marcar usuarios como favoritos

**Pasos:**
1. Crear nuevo slice `favoritesSlice.js`
2. Agregar botón de favorito en `UserCard`
3. Guardar favoritos en localStorage
4. Crear página de favoritos

**Estado sugerido:**
```javascript
const initialState = {
  favorites: [], // Array de usernames
};
```

---

### **Ejercicio 6: Paginación**

**Objetivo:** Implementar paginación de resultados

**Pasos:**
1. Modificar `fetchUsersAPI` para aceptar parámetro `page`
2. Agregar botones "Anterior" y "Siguiente"
3. Actualizar Redux para manejar página actual

**API Query:**
```javascript
`/search/users?q=${searchTerm}&page=${page}&per_page=30`
```

---

## 🚀 Nivel Avanzado

### **Ejercicio 7: Infinite Scroll**

**Objetivo:** Cargar más usuarios al hacer scroll

**Pasos:**
1. Usar `useIntersectionObserver` en un elemento "sentinel"
2. Cuando el sentinel sea visible, cargar más usuarios
3. Actualizar Redux para agregar usuarios (no reemplazar)

**Hint:**
```javascript
const sentinelRef = useRef(null);
const isVisible = useIntersectionObserver(sentinelRef);

useEffect(() => {
  if (isVisible && status === 'succeeded') {
    dispatch(fetchMoreUsers(page + 1));
  }
}, [isVisible]);
```

---

### **Ejercicio 8: Caché de búsquedas**

**Objetivo:** Cachear resultados de búsquedas anteriores

**Pasos:**
1. Crear objeto de caché en Redux
2. Antes de hacer fetch, verificar si existe en caché
3. Si existe, usar datos cacheados

**Estado sugerido:**
```javascript
const initialState = {
  users: [],
  cache: {
    'octocat': [...users],
    'torvalds': [...users],
  },
};
```

---

### **Ejercicio 9: Búsqueda avanzada**

**Objetivo:** Implementar búsqueda con múltiples filtros

**Filtros a implementar:**
- Ubicación
- Número mínimo de repos
- Número mínimo de followers
- Lenguaje de programación

**API Query ejemplo:**
```javascript
`/search/users?q=${searchTerm}+location:${location}+repos:>${minRepos}`
```

---

### **Ejercicio 10: Tests Unitarios**

**Objetivo:** Agregar tests con Vitest

**Pasos:**
1. Instalar Vitest y React Testing Library
2. Crear tests para `useDebouncedSearch`
3. Crear tests para `UserCard`
4. Crear tests para `usersSlice`

**Instalación:**
```bash
pnpm add -D vitest @testing-library/react @testing-library/jest-dom
```

**Ejemplo de test:**
```javascript
import { renderHook, waitFor } from '@testing-library/react';
import { useDebouncedSearch } from './useDebouncedSearch';

test('debounces value after delay', async () => {
  const { result } = renderHook(() => useDebouncedSearch('', 300));
  
  act(() => {
    result.current[1]('test');
  });
  
  expect(result.current[0]).toBe('test'); // inputValue
  expect(result.current[2]).toBe(''); // debouncedValue
  
  await waitFor(() => {
    expect(result.current[2]).toBe('test'); // debouncedValue after delay
  }, { timeout: 400 });
});
```

---

## 🎨 Ejercicios de UI/UX

### **Ejercicio 11: Animaciones mejoradas**

**Objetivo:** Mejorar animaciones de entrada

**Tareas:**
- Agregar animación de fade-in a la lista
- Implementar animación de hover en cards
- Agregar transiciones suaves en theme toggle

---

### **Ejercicio 12: Modo compacto**

**Objetivo:** Agregar vista de lista compacta

**Pasos:**
1. Crear componente `UserListItem` (versión compacta)
2. Agregar toggle para cambiar entre grid y list
3. Guardar preferencia en localStorage

---

### **Ejercicio 13: Accesibilidad**

**Objetivo:** Mejorar accesibilidad (a11y)

**Tareas:**
- Agregar `aria-labels` apropiados
- Implementar navegación por teclado
- Asegurar contraste de colores (WCAG AA)
- Agregar `skip to content` link

---

## 🔧 Ejercicios de Optimización

### **Ejercicio 14: Service Worker**

**Objetivo:** Implementar PWA con service worker

**Pasos:**
1. Instalar `vite-plugin-pwa`
2. Configurar service worker
3. Agregar manifest.json
4. Implementar offline fallback

---

### **Ejercicio 15: Performance Monitoring**

**Objetivo:** Agregar métricas de performance

**Pasos:**
1. Implementar `web-vitals`
2. Medir LCP, FID, CLS
3. Crear dashboard de métricas
4. Optimizar basado en resultados

---

## 📊 Proyectos Completos

### **Proyecto 1: GitHub Explorer Completo**

Combina múltiples ejercicios para crear una app completa:
- ✅ Búsqueda avanzada
- ✅ Favoritos
- ✅ Infinite scroll
- ✅ Caché
- ✅ PWA
- ✅ Tests

### **Proyecto 2: Dashboard de Estadísticas**

Crea un dashboard que muestre:
- Gráficos de repos por lenguaje
- Timeline de actividad
- Comparación entre usuarios
- Estadísticas agregadas

---

## ✅ Soluciones

Las soluciones a estos ejercicios están disponibles en:
- Branch `solutions/basic` - Ejercicios 1-3
- Branch `solutions/intermediate` - Ejercicios 4-6
- Branch `solutions/advanced` - Ejercicios 7-10

---

## 🎓 Recursos de Aprendizaje

### **Documentación Oficial:**
- [React Docs](https://react.dev)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [GitHub API](https://docs.github.com/en/rest)

### **Tutoriales Recomendados:**
- React Testing Library
- Performance Optimization
- Web Accessibility

---

**¡Buena suerte con los ejercicios!** 🚀
