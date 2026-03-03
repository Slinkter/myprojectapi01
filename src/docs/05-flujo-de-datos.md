# 05 - Arquitectura de Flujo de Datos

## 🌊 Arquitectura de Estado

Este proyecto utiliza una **Arquitectura Cliente Pura**. El estado es alojado cien por ciento de manera local o cliente mediante:

- **Redux Toolkit**: Concentración del App State macro, inyectado mediante Provider a toda la jerarquía de UI.
- **LocalStorage**: Memoria precaria de corto alcance para preferencias frígidas (Theming Light/Dark).

**No aplica:**

- ❌ Bases de datos remotas.
- ❌ Firebase/Supabase (Serverless auth/functions).
- ❌ Mutación asincróna (Solo se lee - _GET_ Data de Github, no POST).

## ⏱️ Diagrama de Secuencia Asíncrona (Mermaid)

```mermaid
sequenceDiagram
    autonumber
    actor U as Usuario (UI)
    participant C as Componente (React DOM)
    participant R as Redux Thunk
    participant S as Slice Reducer
    participant A as GitHub API

    U->>C: Introduce "Alex" en Header
    C-->>R: Dispatch (fetchUsers("Alex"))
    R->>S: loading = true (Pending Action)
    S-->>C: Props Update (Render Skeletons)
    R->>A: GET /search/users?q=Alex
    A-->>R: Return JSON Promise (Array de Profiles)

    alt Si API 200 OK
        R->>S: Action Fulfilled (Payload = Array)
        S-->>C: state.data Update (Render UserCards)
    else Si Rate Limit API / Error 404
        R->>S: Action Rejected
        S-->>C: state.error Update (Render NotFound)
    end
```

## 🌳 Grafo de Árbol de Invocaciones (Props Tree) - ASCII Art

El Flujo de datos asienta las responsabilidades usando el patrón funcional React clásico. Un contenedor inteligente habla con el store, las piezas tontas solo mapean las _Props_.

```text
<App> (Inyecta Redux Store + Rutas)
  │
  ├─ <ThemeToggle> --------- (Lee y Escribe Context/Local Storage: "DarkMode")
  │
  ├─ <Home (Search View)> -- (Suscripto a state.users.data)
  │   │
  │   ├─ <PageHeader> ------ (Recibe handleSearch() / Devuelve eventOnChange)
  │   │
  │   └─ <UserCard> x N ---- (Componente Tonto. Recibe `user={avatar, login}` puramente visual Tailwind v4)
  │
  └─ <UserDetail> ---------- (Recibe route Param /user/:login)
      │
      └─ Fetch Effect ------ (Busca Independientemente en API)
```
