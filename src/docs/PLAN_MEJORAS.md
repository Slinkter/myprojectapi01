# 📋 Plan de Mejora: Accesibilidad y Performance

> **Prioridades definidas por el usuario**
> - Accesibilidad 🟡 Media
> - Performance 🟡 Media

---

## 🎯 PARTE 1: ACCESIBILIDAD (A11Y)

### 1.1 Auditoría de componentes

| Componente | Problema | Solución |
|------------|----------|----------|
| `UserCard` | Sin descripción para lectores de pantalla | Agregar `aria-label` |
| `ThemeToggle` | Botón solo con icono | Agregar `aria-label` con estado |
| `UserSearch` | Input sin label | Agregar `aria-label` o `<label>` |
| `SkeletonGrid` | Sin indicar carga | Agregar `aria-busy` |

### 1.2 Checklist de cambios

#### UserCard.jsx
```jsx
// ANTES
<button onClick={onSelect}>

// DESPUÉS
<button 
  onClick={onSelect}
  aria-label={`Ver perfil de ${username}`}
>
```

#### ThemeToggle.jsx
```jsx
// ANTES
<button onClick={toggleTheme}>

// DESPUÉS
<button 
  onClick={toggleTheme}
  aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
  aria-pressed={theme === "dark"}
>
```

#### UserSearch.jsx
```jsx
// ANTES
<input placeholder="Buscar usuarios...">

// DESPUÉS
<input 
  placeholder="Buscar usuarios..."
  aria-label="Buscar usuarios de GitHub"
  aria-describedby="search-help"
/>
<span id="search-help" className="text-xs">
  Escribe al menos 3 caracteres para buscar
</span>
```

### 1.3 Mejoras de contraste

Revisar que los colores tengan ratio mínimo 4.5:1:

```css
/* En index.css - verificar que estos tokens tengan suficiente contraste */
--color-app-text      /* Debe ser #111111 o similar en light */
--color-app-muted     /* Debe ser #6b7280 o más oscuro */
--color-app-accent    /* Debe ser #0071e3 o más oscuro */
```

### 1.4 Keyboard navigation

Asegurar que todos los elementos interactivos sean alcanzables por teclado:

```jsx
// Todos los botones y links ya son accesibles por defecto
// Solo verificar que no haya elementos focusables ocultos
```

### 1.5 Imágenes con alt

```jsx
// UserCard.jsx
<img 
  src={photo} 
  alt={`Avatar de ${username}`}  // ✅ Descripción significativa
/>

// UserDetail.jsx  
<img 
  src={user.photo}
  alt={user.name ? `Avatar de ${user.name}` : `Avatar de ${user.username}`}
/>
```

---

## 🎯 PARTE 2: PERFORMANCE (Bundle Size)

### 2.1 Estado actual del bundle

```
dist/assets/
├── index.js        → 250 KB (compartido)
├── UserDetail.js   →  13 KB
├── UserSearch.js   →  14 KB
├── utils.js         → 225 KB (librerías)
└── index.css       →  36 KB
```

### 2.2 Plan de optimización

| Opción | Reducción | Complexity | Recomendación |
|--------|-----------|------------|---------------|
| Quitar Motion | -20 KB | Baja | ✅ Opcional |
| Quitar Zod | -15 KB | Media | ❌ No (validación necesaria) |
| Optimizar imports | -10 KB | Baja | ✅Sí hacer |
| Tree shaking | -5 KB | Baja | ✅Sí hacer |

### 2.3 Optimizaciones concretas

#### A) Revisar imports no utilizados

En los archivos, verificar que solo se importe lo necesario:

```javascript
// ❌ Importar todo
import { motion, animate } from "motion/react";

// ✅ Importar solo lo que se usa
import { motion } from "motion/react";
import { animate } from "motion";
```

#### B) Revisar imports en UserDetail.jsx

```javascript
// ANTES
import { motion, animate } from "motion/react";

// DESPUÉS - solo motion (animate no se usa)
import { motion } from "motion/react";
```

#### C) Configurar Vite para mejor tree-shaking

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          query: ['@tanstack/react-query'],
          motion: ['motion'],
          zod: ['zod'],
        },
      },
    },
  },
});
```

Esto separa las librerías en chunks independientes que se pueden cachear mejor.

### 2.4 Metric tracking

Agregar script para medir:

```bash
# Medir bundle después de cambios
pnpm build
# Ver tamaño en la salida del build
```

---

## 📋 RESUMEN DE TAREAS

### Accesibilidad (hacer primero)

- [ ] Agregar `aria-label` a UserCard
- [ ] Agregar `aria-label` y `aria-pressed` a ThemeToggle
- [ ] Agregar `aria-label` al input de UserSearch
- [ ] Verificar `alt` en todas las imágenes
- [ ] Verificar contraste de colores

### Performance (opcional)

- [ ] Revisar imports de Motion (solo lo necesario)
- [ ] Configurar manual chunks en Vite
- [ ] Medir impacto después de cambios

---

## ⏱️ Tiempo estimado

| Tarea | Tiempo |
|-------|--------|
| Accesibilidad completa | 30 minutos |
| Performance optimizado | 20 minutos |

---

## 🧪 Verificación

### Lighthouse

Ejecutar para verificar mejoras:

```bash
# En Chrome DevTools
1. F12 → Lighthouse
2. Seleccionar "Navigation"
3. Click "Analyze page load"
```

### Objetivos

| Métrica | Actual | Objetivo |
|---------|--------|----------|
| Performance | ~90 | 95+ |
| Accessibility | ~80 | 95+ |
| Best Practices | ~100 | 100 |

---

¿Procedo a implementar las mejoras de accesibilidad primero?
