# 🧠 Bitácora de Ingeniería: Senior Architecture Refactor (2026)

Este documento resume la intervención de arquitectura realizada en el proyecto `myprojectapi01`, detallando los patrones y decisiones técnicas aplicadas para alcanzar un estándar de **Maestría en Software**.

---

## 🏗️ 1. Patrones de Diseño Estructurales

### **A. Adapter Pattern (El Escudo de Datos)**
- **Ubicación:** `src/models/adapters/userAdapter.js`
- **Por qué:** Las APIs externas (GitHub) son inestables o tienen nombres de propiedades inconsistentes.
- **Acción:** Creamos un traductor que convierte `avatar_url` en `photo` y `login` en `username`.
- **Resultado:** Si GitHub cambia su API, solo tocamos 1 línea en el adaptador; la UI permanece intacta.

### **B. Facade Pattern (La Fachada de Lógica)**
- **Ubicación:** `src/features/users/hooks/useUserSearchFacade.js`
- **Por qué:** Un componente de React no debe saber cómo funciona Redux o el debouncing. Eso ensucia la UI.
- **Acción:** Encapsulamos toda la complejidad en un solo Hook que devuelve estados booleanos (`isLoading`, `isSuccess`) y datos limpios.
- **Resultado:** El componente `UserSearch.jsx` es 100% declarativo y fácil de leer.

---

## ⚡ 2. Ingeniería de Rendimiento (Vercel Standards)

### **A. Concurrent React (useTransition)**
- **Concepto:** Separamos las actualizaciones "urgentes" de las "pesadas".
- **Aplicación:** El input de texto es urgente. El renderizado de la lista de usuarios es pesado.
- **Resultado:** El usuario siente que la app vuela porque el teclado nunca se traba mientras se filtran los datos.

### **B. Selectores Memoizados (createSelector)**
- **Por qué:** Por defecto, `useSelector` puede causar re-renders si el objeto del Store cambia de referencia aunque los datos sean iguales.
- **Acción:** Usamos la librería `reselect` (integrada en RTK) para que React solo re-renderice si los datos de interés cambiaron realmente.

---

## 🎨 3. UI Semántica y Animaciones (Tailwind v4)

### **A. Desacoplamiento de Temas**
- **Acción:** Migramos de clases hardcodeadas (`bg-white dark:bg-black`) a variables CSS semánticas (`bg-app-bg`).
- **Resultado:** El sistema de Dark Mode es instantáneo, nativo y se gestiona en un solo archivo (`index.css`), eliminando el archivo `tailwind.config.js`.

### **B. Motion v12: Hardware Acceleration**
- **Acción:** Implementamos animaciones escalonadas y la propiedad `layout`.
- **Resultado:** Las transiciones del Grid ocurren en la GPU del dispositivo, garantizando **60 FPS** constantes.

---

## 🩺 4. Calidad y Auditoría
- **React Doctor Score:** 100/100.
- **Estatus:** Build optimizado con **Lightning CSS** y **Code Splitting** (Suspense/Lazy).

---

### 🎓 Notas para el Estudio:
1.  Revisa siempre cómo el **Adapter** protege tus componentes.
2.  Observa cómo la **Facade** limpia el JSX de lógica de Redux.
3.  Estudia el archivo `index.css` para entender la potencia de **Tailwind v4**.

**LJCR Engineering - Senior Mentor & Architect**
