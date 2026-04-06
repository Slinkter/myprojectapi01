# 📝 PRUEBA TÉCNICA: React Frontend Developer

> **模拟技术面试** - Simulación de entrevista técnica para React Frontend Developer
> **Nivel:** Junior → Senior
> **Duración estimada:** 3 horas (ejercicios prácticos)

---

## 📋 INSTRUCCIONES

Esta prueba evalúa conocimientos en:
1. Fundamentos React
2. Patrones de Arquitectura
3. Gestión de Estado
4. Estilos y UI
5. Optimización y Performance
6. Testing

**Formato:** 
- Sección A: Preguntas teóricas (múltiple choice + respuesta corta)
- Sección B: Ejercicios prácticos
- Sección C: Code Review

**No puedes:**
- Usar IA generativa (pero sí buscar documentación)
- Copiar código de internet
- Usar frameworks de UI externos (MUI, Chakra, etc.)

**Puedes:**
- Usar React Docs oficial
- Usar documentación de librerías del proyecto
- Buscar en MDN

---

# 🎯 SECCIÓN A: PREGUNTAS TEÓRICAS

## A1. Fundamentos React (10 puntos)

### Pregunta A1.1 (2 puntos)
**¿Cuál es la diferencia entre `useState` y `useEffect`?**

```javascript
// Ejemplo de useState
const [count, setCount] = useState(0);

// Ejemplo de useEffect
useEffect(() => {
  console.log("El contador cambió:", count);
}, [count]);
```

**Respuesta esperada:**
- `useState`: Hook para gestionar estado local mutable en componentes funcionales
- `useEffect`: Hook para ejecutar efectos secundarios (side effects) como fetch, suscripciones, manipulación del DOM

---

### Pregunta A1.2 (2 puntos)
**¿Por qué React usa Virtual DOM?**

**Respuesta esperada:**
El Virtual DOM es una representación lightweight del DOM real. Cuando cambia el estado:
1. React crea un nuevo Virtual DOM
2. Compara con el anterior (diffing)
3. Calcula los cambios mínimos necesarios
4. Aplica solo esos cambios al DOM real

Esto es mucho más eficiente que modificar todo el DOM directamente.

---

### Pregunta A1.3 (2 puntos)
**¿Qué es el prop drilling y cómo se soluciona?**

**Respuesta esperada:**
Prop drilling ocurre cuando necesitas pasar props a través de múltiples niveles de componentes que no las usan directamente.

```javascript
// ❌ Prop drilling
<App>
  <Header user={user}>
    <Nav user={user}>
      <Menu user={user}>  // ¡Finalmente lo usa aquí!
      </Menu>
    </Nav>
  </Header>
</App>
```

**Soluciones:**
- Context API
- Composición de componentes
- State management (Redux, Zustand, etc.)

---

### Pregunta A1.4 (2 puntos)
**¿Cuál es la diferencia entre `useMemo` y `useCallback`?**

**Respuesta esperada:**
| Hook | Propósito | Retorna |
|------|-----------|---------|
| `useMemo` | Memorizar valores calculados | El valor memoizado |
| `useCallback` | Memorizar funciones | La función memoizada |

```javascript
// useMemo: memoriza valor
const expensiveValue = useMemo(() => {
  return data.filter(...).map(...).sort(...);
}, [data]);

// useCallback: memoriza función
const handleClick = useCallback((id) => {
  setSelected(id);
}, []);
```

---

### Pregunta A1.5 (2 puntos)
**¿Qué son los React Server Components (RSC)?**

**Respuesta esperada:**
RSC son componentes que se renderizan en el servidor (Next.js 13+). Características:
- No requieren JavaScript en el cliente
- Pueden acceder directamente a bases de datos
- No tienen estado ni lifecycle methods
- Streaming y Suspense integrados

---

## A2. Patrones de Arquitectura (10 puntos)

### Pregunta A2.1 (3 puntos)
**Explica el patrón Feature-Sliced Design (FSD). ¿Cuándo lo usarías?**

**Respuesta esperada:**
FSD es una metodología de arquitectura que organiza código por funcionalidad de negocio:

```
src/
├── app/           # Config global
├── components/    # UI reutilizable
├── features/     # ★ Módulos de negocio
│   ├── users/
│   └── cart/
├── hooks/        # Hooks globales
└── services/     # APIs
```

**Beneficios:**
- Aislamiento entre features
- Escalabilidad
- Cada feature es independiente y testeable

---

### Pregunta A2.2 (3 puntos)
**¿Qué es el Patrón Adapter? Implementa un ejemplo.**

**Respuesta esperada:**
El Patrón Adapter convierte datos de un formato a otro:

```javascript
// API externa
const githubUser = { 
  login: "octocat", 
  avatar_url: "...",
  public_repos: 158 
};

// Adapter al modelo interno
const userAdapter = (githubUser) => ({
  username: githubUser.login,
  photo: githubUser.avatar_url,
  repos: githubUser.public_repos,
});
```

**¿Por qué usarlo?** Para proteger la UI de cambios en APIs externas.

---

### Pregunta A2.3 (4 puntos)
**¿Cuál es la diferencia entre Control y Uncontrolled components?**

**Respuesta esperada:**

| Característica | Controlado | No Controlado |
|----------------|------------|---------------|
| Estado | En React (useState) | En el DOM (ref) |
| Valor | Actualizado por setState | Actualizado por el usuario directamente |
| Validación | Fácil (onChange) | Difícil (defaultValue) |

```javascript
// Componente Controlado
const Controlled = () => {
  const [value, setValue] = useState("");
  return <input value={value} onChange={e => setValue(e.target.value)} />;
};

// Componente No Controlado
const Uncontrolled = () => {
  const ref = useRef(null);
  const handleClick = () => console.log(ref.current.value);
  return <input ref={ref} defaultValue=" inicial" />;
};
```

---

## A3. Gestión de Estado (10 puntos)

### Pregunta A3.1 (3 puntos)
**¿Cuándo usarías TanStack Query vs Redux vs Context?**

**Respuesta esperada:**

| Herramienta | Cuándo usarla | Ejemplo |
|-------------|---------------|---------|
| **TanStack Query** | Datos de servidor (APIs) | Usuarios, posts, productos |
| **Redux/Zustand** | Estado global complejo | Carrito de compras, auth |
| **Context** | Datos pequeños que no cambian mucho | Tema, idioma, usuario actual |
| **useState** | Estado local de un componente | Formularios, modales |

---

### Pregunta A3.2 (3 puntos)
**¿Qué es el patrón Stale-While-Revalidate?**

**Respuesta esperada:**
Estrategia de caché que:
1. Sirve datos stale (antiguos) inmediatamente al usuario
2.后台 obtiene datos frescos del servidor
3. Actualiza el caché con los nuevos datos

**Beneficio:** Percepción de velocidad instantánea.

---

### Pregunta A3.3 (4 puntos)
**¿Cómo manejarías un estado complejo con múltiples entidades relacionadas?**

**Respuesta esperada:**
Ejemplo: Carrito de compras con productos

```javascript
// Estructura normalizada
const state = {
  entities: {
    products: {
      byId: {
        "1": { id: "1", name: " Laptop", price: 999 },
        "2": { id: "2", name: "Mouse", price: 29 },
      },
      allIds: ["1", "2"]
    },
    cart: {
      items: ["1", "2"],  // IDs de productos
      quantity: { "1": 1, "2": 2 }
    }
  }
};
```

**Beneficios:**
- Sin duplicación de datos
- Actualizaciones O(1)
- Fácil normalización/denormalización

---

## A4. Estilos y UI (10 puntos)

### Pregunta A4.1 (3 puntos)
**¿Cuál es la diferencia entre CSS Modules, Styled Components y Tailwind CSS?**

**Respuesta esperada:**

| Metodología | Enfoque | Pros | Contras |
|-------------|---------|------|---------|
| **CSS Modules** | CSS con scoping | Simple, CSS nativo | Limitado |
| **Styled Components** | CSS-in-JS | Dynamic props | Bundle size |
| **Tailwind** | Utility classes | Rápido, consistente | Classes feas |

---

### Pregunta A4.2 (3 puntos)
**¿Cómo implementarías un Theme Switcher (light/dark)?**

**Respuesta esperada:**

```javascript
// 1. CSS Variables
:root {
  --bg: #ffffff;
  --text: #000000;
}

.dark {
  --bg: #000000;
  --text: #ffffff;
}

// 2. Hook
const useTheme = () => {
  const [theme, setTheme] = useState(() => 
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, toggle: () => setTheme(t => t === "light" ? "dark" : "light") };
};
```

---

### Pregunta A4.3 (4 puntos)
**¿Cómo harías un componente Accordion accesible?**

**Respuesta esperada:**

```jsx
const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <button
            aria-expanded={openIndex === index}
            aria-controls={`panel-${index}`}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            {item.title}
          </button>
          <div
            id={`panel-${index}`}
            role="region"
            aria-hidden={openIndex !== index}
            hidden={openIndex !== index}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
};
```

**Puntos clave:**
- `aria-expanded`: Indica estado
- `aria-controls`: Relaciona botón con panel
- `role="region"`: Define región
- `aria-hidden`: Oculta de lectores de pantalla

---

## A5. Performance (10 puntos)

### Pregunta A5.1 (3 puntos)
**¿Cómo medirías el rendimiento de tu aplicación React?**

**Respuesta esperada:**

1. **React DevTools Profiler**
   - Grabar interacciones
   - Identificar componentes lentos

2. **Lighthouse**
   - Performance score
   - Core Web Vitals (LCP, FID, CLS)

3. **Console**
   - `performance.now()` para medir tiempos

4. **Bundle analyzer**
   - `webpack-bundle-analyzer` o Vite analyzer

---

### Pregunta A5.2 (3 puntos)
**¿Qué es React.memo y cuándo lo usarías?**

**Respuesta esperada:**
`React.memo` memoriza un componente y evita re-render si sus props no cambian.

```javascript
// ❌ Sin memo - re-renderiza cada vez que App re-renderiza
const UserCard = ({ user }) => <div>{user.name}</div>;

// ✅ Con memo - solo re-renderiza si user cambia
const UserCard = React.memo(({ user }) => <div>{user.name}</div>);

// ✅ Con comparación custom
const UserCard = React.memo(({ user }) => (
  <div>{user.name}</div>
), (prevProps, nextProps) => prevProps.user.id === nextProps.user.id);
```

**Usa cuando:**
- Componente renderiza frecuentemente
- Props cambian pocas veces
- Renderizado es costoso

---

### Pregunta A5.3 (4 puntos)
**Lista 5 técnicas de optimización en React**

**Respuesta esperada:**

1. **Memoización**
   - `React.memo` para componentes
   - `useMemo` para valores
   - `useCallback` para funciones

2. **Code Splitting**
   - `React.lazy()` para components
   - `React.Suspense` para loading

3. **Virtualización**
   - `react-window` o `react-virtualized` para listas largas

4. **Debouncing/Throttling**
   - Evitar demasiadas llamadas a APIs onInput

5. **Optimización de imágenes**
   - Lazy loading
   - WebP
   - srcset

---

# 🎯 SECCIÓN B: EJERCICIOS PRÁCTICOS

## B1. Ejericio: Construir un Buscador de Usuarios (30 puntos)

### Requisitos:
- Input de búsqueda con debounce (300ms)
- Mostrar resultados en grid
- Loading skeleton mientras carga
- Manejo de errores
- Cacheo con TanStack Query
- Theme toggle light/dark

### Estructura esperada:

```jsx
// Tu código aquí
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

const UserSearch = () => {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");

  // Debounce implementation
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Query con TanStack
  const { data, isLoading, error } = useQuery({
    queryKey: ["users", debounced],
    queryFn: () => fetchUsers(debounced),
    enabled: debounced.length >= 3,
  });

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      {/* Render users or loading or error */}
    </div>
  );
};
```

---

## B2. Ejercicio: Code Review (20 puntos)

### Revisa este código y encuentra TODOS los problemas:

```jsx
import { useState, useEffect } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/users").then(res => {
      setUsers(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};
```

### Problemas a encontrar (mínimo 8):

1. **⚠️ Sin manejo de errores** - No hay try/catch
2. **⚠️ useEffect sin cleanup** - Memory leak si el componente desmonta
3. **⚠️ Estado inicial incorrecto** - Should be `[]` not `undefined`
4. **⚠️ Falta key prop validation** - `user.id` podría ser undefined
5. **⚠️ useEffect vacío** - Se ejecuta en cada render después del primero
6. **⚠️ No hay loading reset** - Si hay error, loading queda false
7. **⚠️ Falta abortar petición** - Memory leak en navegación
8. **⚠️ No hay tipo de usuario** - user.name podría no existir

---

## B3. Ejercicio: Optimización (20 puntos)

### Dado este código lento, optimízalo:

```jsx
// Código original - LENTO
const ProductList = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input onChange={e => setSearchTerm(e.target.value)} />
      <table>
        {filtered.map(p => (
          <ProductRow key={p.id} product={p} />
        ))}
      </table>
    </div>
  );
};

const ProductRow = ({ product }) => (
  <tr>
    <td>{product.name}</td>
    <td>{product.price}</td>
    <td>{product.description}</td>
    <td>{product.category}</td>
  </tr>
);
```

### Solución esperada:

```jsx
// Optimizado
import { useState, useMemo } from "react";
import { React.memo } from "react";

const ProductRow = React.memo(({ product }) => (
  <tr>
    <td>{product.name}</td>
    <td>{product.price}</td>
    <td>{product.description}</td>
    <td>{product.category}</td>
  </tr>
));

const ProductList = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => 
    products.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [products, searchTerm]
  );

  return (
    <div>
      <input onChange={e => setSearchTerm(e.target.value)} />
      <table>
        {filtered.map(p => (
          <ProductRow key={p.id} product={p} />
        ))}
      </table>
    </div>
  );
};
```

---

# 🎯 SECCIÓN C: SISTEMA DE EVALUACIÓN

## Puntuación Total: 100 puntos

| Sección | Puntos | Peso |
|---------|--------|------|
| A: Teoría | 50 | 50% |
| B: Práctica | 50 | 50% |

### Grading Scale:

| Puntuación | Nivel |
|------------|-------|
| 90-100 | Senior 🔥 |
| 75-89 | Mid-High 💪 |
| 60-74 | Mid ⚠️ |
| 40-59 | Junior 📚 |
| 0-39 | Necesita estudio 📖 |

---

## ✅ RESPUESTAS SECCIÓN A

### A1.1
- useState: gestión de estado local mutable
- useEffect: ejecución de side effects

### A1.2
Virtual DOM permite diffing eficiente, evitando re-renders completos del DOM real.

### A1.3
Pasar props a través de múltiples niveles. Solución: Context, composición, state management.

### A1.4
- useMemo: memoriza valores
- useCallback: memoriza funciones

### A1.5
Componentes que renderizan en servidor, sin JS del lado del cliente.

### A2.1
Arquitectura por features/funcionalidades de negocio, no por tipo de archivo.

### A2.2
Patrón que traduce datos de formato externo a formato interno.

### A2.3
- Controlado: estado en React
- No-controlado: estado en DOM

### A3.1
- TanStack Query: datos de servidor
- Redux: estado global complejo
- Context: datos pequeños globales
- useState: estado local

### A3.2
Estrategia de caché que sirve datos stale mientras refetch en background.

### A3.3
Normalización: almacenar entidades por ID, no objetos anidados.

### A4.1
- CSS Modules: CSS con scoping
- Styled Components: CSS-in-JS
- Tailwind: utility classes

### A4.2
CSS variables + useEffect para togglear clase en HTML root.

### A4.3
ARIA attributes: aria-expanded, aria-controls, role="region", aria-hidden.

### A5.1
React DevTools Profiler, Lighthouse, console timing, bundle analyzer.

### A5.2
React.memo memoiza componentes evitando re-renders si props no cambian.

### A5.3
1. Memoización, 2. Code splitting, 3. Virtualización, 4. Debounce, 5. Optimización imágenes.

---

## 📚 RECURSOS DE ESTUDIO

### Documentación Oficial
- [React Docs](https://react.dev)
- [TanStack Query](https://tanstack.com/query)
- [Tailwind CSS](https://tailwindcss.com)

### Libros Recomendados
- "Learning React" por Alex Banks
- "Effective JavaScript" por David Herman
- "You Don't Know JS" por Kyle Simpson

### Proyectos para Practicar
1. Clone de Twitter (timeline, tweets, likes)
2. Dashboard de analytics (gráficos, filtros)
3. Chat real-time (WebSockets)
4. E-commerce (carrito, checkout)

---

> **Fin de la Prueba Técnica**
> Esta evaluación simula una entrevista real de React.
> Practica regularmente y repasa los conceptos que fallaste.
