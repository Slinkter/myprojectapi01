# State Management con Redux Toolkit

## 📋 Índice
- [Introducción](#introducción)
- [¿Por qué Redux Toolkit?](#por-qué-redux-toolkit)
- [Conceptos Fundamentales](#conceptos-fundamentales)
- [Implementación en el Proyecto](#implementación-en-el-proyecto)
- [Best Practices](#best-practices)

---

## 🎯 Introducción

Redux Toolkit es la **forma oficial y recomendada** de escribir lógica de Redux. Simplifica la configuración y reduce significativamente el boilerplate.

### **Problemas que resuelve:**

| Problema de Redux tradicional | Solución de Redux Toolkit |
|-------------------------------|---------------------------|
| Mucho boilerplate | `createSlice` genera actions y reducers |
| Configuración compleja del store | `configureStore` con defaults optimizados |
| Inmutabilidad manual | Usa Immer internamente |
| Async logic complicada | `createAsyncThunk` simplifica thunks |

---

## 🤔 ¿Por qué Redux Toolkit?

### **Ventajas:**

1. **Menos código** - Hasta 50% menos líneas de código
2. **Mejores defaults** - DevTools, middleware incluidos
3. **Inmutabilidad automática** - Immer bajo el capó
4. **TypeScript friendly** - Excelente inferencia de tipos
5. **Mantenido oficialmente** - Por el equipo de Redux

### **Comparación: Redux vs Redux Toolkit**

#### **Redux Tradicional:**
```javascript
// Action Types
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

// Action Creators
const fetchUsersRequest = () => ({ type: FETCH_USERS_REQUEST });
const fetchUsersSuccess = (users) => ({ 
  type: FETCH_USERS_SUCCESS, 
  payload: users 
});
const fetchUsersFailure = (error) => ({ 
  type: FETCH_USERS_FAILURE, 
  payload: error 
});

// Reducer
const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// Thunk
const fetchUsers = (searchTerm) => async (dispatch) => {
  dispatch(fetchUsersRequest());
  try {
    const users = await fetchUsersAPI(searchTerm);
    dispatch(fetchUsersSuccess(users));
  } catch (error) {
    dispatch(fetchUsersFailure(error.message));
  }
};
```

#### **Redux Toolkit:**
```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async Thunk
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (searchTerm) => {
    return await fetchUsersAPI(searchTerm);
  }
);

// Slice (actions + reducer)
const usersSlice = createSlice({
  name: 'users',
  initialState: { users: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
```

**Resultado:** 70% menos código, más legible y mantenible.

---

## 📚 Conceptos Fundamentales

### **1. Store**

El store es el contenedor centralizado del estado de la aplicación.

**src/app/store.js:**
```javascript
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '@/features/users/usersSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    // Agregar más reducers aquí
  },
});
```

**Características de `configureStore`:**
- ✅ Combina reducers automáticamente
- ✅ Agrega Redux DevTools Extension
- ✅ Incluye redux-thunk middleware
- ✅ Agrega checks de inmutabilidad en desarrollo

### **2. Slices**

Un slice es una colección de lógica de Redux para una feature.

**Anatomía de un Slice:**
```javascript
const usersSlice = createSlice({
  name: 'users',              // Nombre del slice
  initialState,               // Estado inicial
  reducers: {                 // Reducers síncronos
    clearUsers: (state) => {
      state.users = [];
    },
  },
  extraReducers: (builder) => { // Reducers para async thunks
    // ...
  },
});
```

### **3. Async Thunks**

Manejan operaciones asíncronas (API calls).

**Estructura:**
```javascript
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',           // Action type prefix
  async (searchTerm, thunkAPI) => {
    try {
      const users = await fetchUsersAPI(searchTerm);
      return users;             // Payload para fulfilled
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
```

**Estados generados automáticamente:**
- `fetchUsers.pending` - Cuando inicia
- `fetchUsers.fulfilled` - Cuando tiene éxito
- `fetchUsers.rejected` - Cuando falla

### **4. Selectors**

Funciones para extraer datos del estado.

**Selectors básicos:**
```javascript
// En el componente
const users = useSelector((state) => state.users.users);
const status = useSelector((state) => state.users.isLoading);
```

**Selectors con Reselect (memoizados):**
```javascript
import { createSelector } from '@reduxjs/toolkit';

export const selectAllUsers = (state) => state.users.users;

export const selectVerifiedUsers = createSelector(
  [selectAllUsers],
  (users) => users.filter(user => user.verified)
);
```

---

## 🔧 Implementación en el Proyecto

### **Estado de la Aplicación**

```javascript
{
  users: {
    users: [],              // Array de usuarios
    isLoading: 'idle',      // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,            // null | { message: string, status?: number }
  }
}
```

### **Flujo de Datos Completo**

```
┌─────────────────────────────────────────────┐
│ 1. Usuario hace búsqueda                    │
│    UserSearch.jsx                           │
└────────────────┬────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────┐
│ 2. Hook despacha acción                     │
│    useUserFetching.js                       │
│    dispatch(fetchUsers(searchTerm))         │
└────────────────┬────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────┐
│ 3. Thunk ejecuta                            │
│    fetchUsers.pending → isLoading='loading' │
└────────────────┬────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────┐
│ 4. Service hace API call                    │
│    userService.fetchUsersAPI()              │
└────────────────┬────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────┐
│ 5. Thunk completa                           │
│    fetchUsers.fulfilled → users=payload     │
└────────────────┬────────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────────┐
│ 6. Componente re-renderiza                  │
│    UserList muestra usuarios                │
└─────────────────────────────────────────────┘
```

---

## ✅ Best Practices

### **1. Estructura de Estado**

**✅ Bueno - Estado normalizado:**
```javascript
{
  users: {
    byId: {
      '1': { id: 1, name: 'John' },
      '2': { id: 2, name: 'Jane' },
    },
    allIds: [1, 2],
  }
}
```

**❌ Malo - Estado anidado:**
```javascript
{
  users: [
    { id: 1, name: 'John', posts: [...] },
    { id: 2, name: 'Jane', posts: [...] },
  ]
}
```

### **2. Naming Conventions**

```javascript
// Slice name: camelCase
name: 'users'

// Async thunk: feature/action
'users/fetchUsers'

// Selectors: select + What
selectAllUsers
selectUserById
```

### **3. Error Handling**

```javascript
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (searchTerm, { rejectWithValue }) => {
    try {
      return await fetchUsersAPI(searchTerm);
    } catch (error) {
      // Retornar error estructurado
      return rejectWithValue({
        message: error.message,
        status: error.status,
      });
    }
  }
);
```

### **4. Loading States**

Usar estados descriptivos en lugar de booleanos:

```javascript
// ✅ Bueno
isLoading: 'idle' | 'loading' | 'succeeded' | 'failed'

// ❌ Malo
isLoading: true | false
```

### **5. Inmutabilidad**

Redux Toolkit usa Immer, puedes "mutar" el estado:

```javascript
// ✅ Bueno con RTK (Immer)
.addCase(fetchUsers.fulfilled, (state, action) => {
  state.users = action.payload;
  state.isLoading = 'succeeded';
})

// ❌ Innecesario con RTK
.addCase(fetchUsers.fulfilled, (state, action) => {
  return {
    ...state,
    users: action.payload,
    isLoading: 'succeeded',
  };
})
```

---

## 🎓 Recursos

- [Redux Toolkit Docs](https://redux-toolkit.js.org)
- [Redux DevTools](https://github.com/reduxjs/redux-devtools)
- [Reselect](https://github.com/reduxjs/reselect)

---

**Siguiente:** [Custom Hooks →](./04-custom-hooks.md)
