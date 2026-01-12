# Arquitectura del Proyecto

## 📋 Índice
- [Visión General](#visión-general)
- [Feature-Based Architecture](#feature-based-architecture)
- [Capas de la Aplicación](#capas-de-la-aplicación)
- [Flujo de Datos](#flujo-de-datos)
- [Patrones de Diseño](#patrones-de-diseño)

---

## 🏗️ Visión General

Este proyecto implementa una **arquitectura modular y escalable** basada en features (características), siguiendo principios de **Clean Architecture** y **Separation of Concerns**.

### **Principios Arquitectónicos**

1. **Feature-Based Organization** - Código organizado por funcionalidad
2. **Separation of Concerns** - Responsabilidades claras y separadas
3. **Single Responsibility** - Cada módulo tiene una única responsabilidad
4. **DRY (Don't Repeat Yourself)** - Reutilización de código
5. **SOLID Principles** - Diseño orientado a objetos

---

## 🎯 Feature-Based Architecture

### **¿Qué es Feature-Based Architecture?**

En lugar de organizar el código por **tipo** (components, hooks, utils), lo organizamos por **feature** (users, auth, products):

#### **❌ Organización Tradicional (por tipo)**
```
src/
├── components/
│   ├── UserCard.jsx
│   ├── UserList.jsx
│   ├── ProductCard.jsx
│   └── ProductList.jsx
├── hooks/
│   ├── useUsers.js
│   └── useProducts.js
└── services/
    ├── userService.js
    └── productService.js
```

#### **✅ Organización por Features (este proyecto)**
```
src/
├── features/
│   ├── users/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── UserSearch.jsx
│   │   └── usersSlice.js
│   └── products/
│       ├── components/
│       ├── hooks/
│       └── productsSlice.js
└── components/          # Solo componentes compartidos
    └── layout/
```

### **Ventajas de Feature-Based**

| Ventaja | Descripción |
|---------|-------------|
| **Alta Cohesión** | Todo el código relacionado está junto |
| **Bajo Acoplamiento** | Features independientes entre sí |
| **Escalabilidad** | Fácil agregar nuevas features |
| **Mantenibilidad** | Cambios aislados por feature |
| **Trabajo en Equipo** | Equipos pueden trabajar en features separadas |

---

## 📚 Capas de la Aplicación

La aplicación está dividida en **5 capas principales**:

```
┌─────────────────────────────────────┐
│     1. PRESENTATION LAYER           │  ← Components (UI)
├─────────────────────────────────────┤
│     2. BUSINESS LOGIC LAYER         │  ← Custom Hooks
├─────────────────────────────────────┤
│     3. STATE MANAGEMENT LAYER       │  ← Redux Slices
├─────────────────────────────────────┤
│     4. SERVICE LAYER                │  ← API Services
├─────────────────────────────────────┤
│     5. DATA LAYER                   │  ← External APIs
└─────────────────────────────────────┘
```

### **1. Presentation Layer (UI Components)**

**Responsabilidad:** Renderizar la interfaz de usuario

**Archivos:**
- `src/features/users/UserSearch.jsx`
- `src/features/users/components/UserCard.jsx`
- `src/components/layout/PageHeader.jsx`

**Características:**
- ✅ Solo se encargan de la presentación
- ✅ Reciben datos via props o hooks
- ✅ No contienen lógica de negocio
- ✅ Componentes puros cuando es posible

**Ejemplo:**
```javascript
// UserCard.jsx - Solo presentación
const UserCard = ({ user }) => (
  <Card>
    <img src={user.avatar_url} alt={user.login} />
    <Typography>{user.login}</Typography>
  </Card>
);
```

### **2. Business Logic Layer (Custom Hooks)**

**Responsabilidad:** Encapsular lógica reutilizable

**Archivos:**
- `src/hooks/useTheme.js`
- `src/hooks/useDebouncedSearch.js`
- `src/features/users/hooks/useUserFetching.js`

**Características:**
- ✅ Abstraen lógica compleja
- ✅ Reutilizables en múltiples componentes
- ✅ Siguen las reglas de hooks de React
- ✅ Retornan valores y funciones

**Ejemplo:**
```javascript
// useUserFetching.js - Lógica de fetching
export const useUserFetching = (searchTerm) => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector(state => state.users);
  
  useEffect(() => {
    dispatch(fetchUsers(searchTerm));
  }, [searchTerm, dispatch]);
  
  return { users, status, error };
};
```

### **3. State Management Layer (Redux)**

**Responsabilidad:** Gestionar el estado global de la aplicación

**Archivos:**
- `src/app/store.js` - Configuración del store
- `src/features/users/usersSlice.js` - Slice de usuarios

**Características:**
- ✅ Estado centralizado y predecible
- ✅ Acciones y reducers bien definidos
- ✅ Async thunks para operaciones asíncronas
- ✅ DevTools para debugging

**Ejemplo:**
```javascript
// usersSlice.js - Estado de usuarios
const usersSlice = createSlice({
  name: 'users',
  initialState: { users: [], isLoading: 'idle', error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = 'succeeded';
      });
  }
});
```

### **4. Service Layer (API Services)**

**Responsabilidad:** Comunicación con APIs externas

**Archivos:**
- `src/services/userService.js`

**Características:**
- ✅ Abstrae llamadas HTTP
- ✅ Manejo centralizado de errores
- ✅ Transformación de datos
- ✅ Configuración de headers/auth

**Ejemplo:**
```javascript
// userService.js - Servicio de API
export const fetchUsersAPI = async (searchTerm) => {
  const url = searchTerm
    ? `${API_BASE_URL}/search/users?q=${searchTerm}`
    : `${API_BASE_URL}/users`;
    
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new ApiError(`HTTP error! status: ${response.status}`, response.status);
  }
  
  return await response.json();
};
```

### **5. Data Layer (External APIs)**

**Responsabilidad:** Fuente de datos externa

**APIs utilizadas:**
- GitHub API: `https://api.github.com`
  - `/users` - Lista de usuarios
  - `/search/users?q={query}` - Búsqueda de usuarios
  - `/users/{username}` - Detalle de usuario

---

## 🔄 Flujo de Datos

### **Flujo Completo de una Búsqueda de Usuario**

```
┌──────────────┐
│   Usuario    │
│  escribe "o" │
└──────┬───────┘
       │
       ↓
┌──────────────────────────────────────┐
│ 1. PRESENTATION LAYER                │
│    PageHeader.jsx                    │
│    - Input onChange                  │
│    - setSearchTerm("o")              │
└──────┬───────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────┐
│ 2. BUSINESS LOGIC LAYER              │
│    useDebouncedSearch                │
│    - inputValue: "o" (inmediato)     │
│    - debouncedValue: "" (espera)     │
│    ... 300ms después ...             │
│    - debouncedValue: "o"             │
└──────┬───────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────┐
│ 3. BUSINESS LOGIC LAYER              │
│    useUserFetching("o")              │
│    - dispatch(fetchUsers("o"))       │
└──────┬───────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────┐
│ 4. STATE MANAGEMENT LAYER            │
│    usersSlice - fetchUsers thunk     │
│    - state.isLoading = 'loading'     │
└──────┬───────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────┐
│ 5. SERVICE LAYER                     │
│    userService.fetchUsersAPI("o")    │
│    - fetch(API_URL/search/users?q=o) │
└──────┬───────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────┐
│ 6. DATA LAYER                        │
│    GitHub API                        │
│    - Retorna JSON con usuarios       │
└──────┬───────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────┐
│ 7. STATE MANAGEMENT LAYER            │
│    usersSlice - fulfilled            │
│    - state.users = payload           │
│    - state.isLoading = 'succeeded'   │
└──────┬───────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────┐
│ 8. PRESENTATION LAYER                │
│    UserList.jsx                      │
│    - Renderiza UserCard por usuario  │
└──────────────────────────────────────┘
```

---

## 🎨 Patrones de Diseño

### **1. Container/Presentational Pattern**

Separamos componentes en dos tipos:

**Container Components (Smart):**
- Manejan lógica y estado
- Se conectan a Redux
- Usan hooks personalizados
- Ejemplo: `UserSearch.jsx`

**Presentational Components (Dumb):**
- Solo presentación
- Reciben props
- No tienen estado (o estado local mínimo)
- Ejemplo: `UserCard.jsx`

### **2. Custom Hooks Pattern**

Extraemos lógica reutilizable en hooks:

```javascript
// ✅ Bueno - Lógica en hook
const useUserFetching = (searchTerm) => {
  // Lógica compleja aquí
  return { users, status, error };
};

// ❌ Malo - Lógica en componente
const UserSearch = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  // Mucha lógica aquí...
};
```

### **3. Service Layer Pattern**

Abstraemos llamadas a API en servicios:

```javascript
// ✅ Bueno - Servicio dedicado
// userService.js
export const fetchUsersAPI = async (searchTerm) => {
  // Lógica de API
};

// ❌ Malo - Fetch directo en componente
const UserSearch = () => {
  const fetchUsers = async () => {
    const response = await fetch('...');
    // ...
  };
};
```

### **4. Compound Components Pattern**

Componentes que trabajan juntos:

```javascript
<Card>
  <CardHeader>...</CardHeader>
  <CardBody>...</CardBody>
  <CardFooter>...</CardFooter>
</Card>
```

---

## 📊 Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                    REACT APPLICATION                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐       │
│  │   Users    │  │User Detail │  │   Theme    │       │
│  │  Feature   │  │  Feature   │  │  Feature   │       │
│  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘       │
│        │               │               │               │
│        └───────────────┴───────────────┘               │
│                        │                               │
│         ┌──────────────┴──────────────┐               │
│         │                              │               │
│    ┌────▼─────┐              ┌────────▼──────┐       │
│    │  Redux   │              │ Custom Hooks  │       │
│    │  Store   │              │  (useTheme,   │       │
│    │          │              │   useDebounce)│       │
│    └────┬─────┘              └───────────────┘       │
│         │                                             │
│    ┌────▼─────────┐                                  │
│    │   Services   │                                  │
│    │ (userService)│                                  │
│    └────┬─────────┘                                  │
│         │                                             │
└─────────┼─────────────────────────────────────────────┘
          │
     ┌────▼────┐
     │ GitHub  │
     │   API   │
     └─────────┘
```

---

## 🎯 Decisiones Arquitectónicas

### **¿Por qué Feature-Based?**

1. **Escalabilidad** - Fácil agregar nuevas features sin afectar las existentes
2. **Mantenibilidad** - Cambios localizados en una feature
3. **Trabajo en equipo** - Múltiples desarrolladores en features diferentes
4. **Testing** - Tests organizados por feature

### **¿Por qué Redux Toolkit?**

1. **Boilerplate reducido** - Menos código que Redux tradicional
2. **Mejores prácticas** - Configuración por defecto optimizada
3. **DevTools** - Debugging integrado
4. **TypeScript friendly** - Excelente soporte de tipos

### **¿Por qué Custom Hooks?**

1. **Reutilización** - Lógica compartida entre componentes
2. **Separación de concerns** - UI separada de lógica
3. **Testing** - Hooks testeables independientemente
4. **Composición** - Hooks pueden usar otros hooks

---

**Siguiente:** [State Management →](./03-state-management.md)
