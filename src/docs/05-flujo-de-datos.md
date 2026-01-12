# Flujo de Datos y Estado

## 1. Arquitectura de Estado
Este proyecto utiliza una **arquitectura cliente pura** sin backend propio.
El estado es gestionado de manera híbrida:
- **Global:** Redux Toolkit (`usersSlice`) para datos de dominio (Usuarios, Status API).
- **Local:** `useState` para inputs, interactividad efímera y lógica de UI.
- **Persistente:** `localStorage` para preferencias de usuario (Tema).

**No aplica:**
- ❌ Integración con Firebase/Supabase
- ❌ Base de datos remota propia

## 2. Diagrama de Flujo de Datos (Data Flow)

El siguiente diagrama detalla cómo viaja la información desde la interacción del usuario hasta la actualización de la UI.

```mermaid
sequenceDiagram
    actor Usuario
    participant Input as Componente UI (Search)
    participant Hook as useDebouncedSearch
    participant Thunk as Redux Thunk (fetchUsers)
    participant Service as UserService
    participant API as GitHub API
    participant Store as Redux Store
    participant List as Componente UI (UserList)

    Note over Usuario, Input: Interacción Inicial
    Usuario->>Input: Escribe "luis"
    Input->>Hook: Actualiza estado local
    Hook-->>Hook: Espera 300ms (Debounce)

    Note over Hook, API: Lógica de Negocio
    Hook->>Thunk: Despacha acción con "luis"
    Thunk->>Service: Llama fetchUsersAPI("luis")
    Service->>API: GET /search/users?q=luis
    API-->>Service: JSON { items: [...] }
    Service-->>Thunk: Retorna Array de Usuarios

    Note over Thunk, List: Actualización de Estado y UI
    Thunk->>Store: Dispatch FULFILLED (payload: users)
    Store-->>Store: Actualiza state.users.list
    Store-->>List: Selector notifica cambio
    List->>List: Re-renderiza con nuevos datos
```

## 3. Modelo de Datos (Store)

El *Slice* de usuarios (`usersSlice`) mantiene la siguiente estructura:

```javascript
{
  users: [
    {
      id: 123,
      login: "usuario",
      avatar_url: "https://...",
      html_url: "https://..."
    },
    // ... más usuarios
  ],
  status: "idle" | "loading" | "succeeded" | "failed",
  error: null | { message: string, status: number }
}
```
