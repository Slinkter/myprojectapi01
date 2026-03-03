# 03 - Casos de Uso

Este documento aborda las interacciones macro del usuario dentro del ecosistema del cliente SPA, desligándose de lógicas backend (ausentes en el proyecto).

## 🧑‍💻 Actores

- **Usuario Invitado (Guest):** Único actor del ecosistema, interactúa sin necesidades de autenticación ya que el frontend consume APIs JWT-less y Open endpoints de Github.

## 🗂️ Casos de Uso Principales

### 1. Búsqueda Activa de Perfiles

**Descripción:** El usuario ingresa un alias, nombre parcial o cuenta de Github en el _PageHeader_ y en tiempo real recupera las correspondencias.
**Flujo Principal:**
User tipea "LJCR". Redux activa flag `loading: true`. El input se de-bouncea. Frontend ataca a `api.github.com/search/users?q=LJCR`. Redux parsea el Payload. UI hidrata las `UserCard`.

### 2. Exploración de Detalles Extensos

**Descripción:** De un resultado en la grilla principal, el usuario transita hacia una vista inmersiva completa (/user/LJCR).
**Flujo Principal:**
User pulsa "Ver Perfil". `<Link>` redirige por react-router evitando recarga de motor. El componente `UserDetail` se monta, dispara Effect para buscar la URI del usuario exacto y pinta Repositorios, Seguidores, y Biografía extra.

### 3. Persistencia de Visualización (Theming)

**Descripción:** Modificar el esquema visual general preservándolo al recargar.
**Flujo Principal:**
User pulsa `ThemeToggle`. El Hook altera la var `"dark"` del HTML classlist y sincroniza `localStorage.setItem('theme', 'dark')`.

## 📐 Diagrama de Casos de Uso (Mermaid)

```mermaid
usecaseDiagram
    actor Usuario Invitado as User

    package "Client SPA Frontend" {
        usecase "Buscar Usuarios de GitHub" as UC1
        usecase "Refrescar Theming de UI" as UC2
        usecase "Acceder a Ficha Técnica Profunda" as UC3
        usecase "Manejar Error 404/Empty" as UC4

        User --> UC1
        User --> UC2
        User --> UC3
        UC1 ..> UC4 : <<includes>>
    }
```
