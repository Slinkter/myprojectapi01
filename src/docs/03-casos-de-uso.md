# 03 - Casos de Uso

Este documento aborda las interacciones macro del usuario dentro del ecosistema del cliente SPA, desligándose de lógicas backend (ausentes en el proyecto).

## 🧑‍💻 Actores

- **Usuario Invitado (Guest):** Único actor del ecosistema, interactúa sin necesidades de autenticación ya que el frontend consume APIs JWT-less y Open endpoints de Github.

## 🗂️ Casos de Uso Principales

### 1. Búsqueda Activa de Perfiles (Feedback Instantáneo)

**Descripción:** El usuario interactúa con la barra de búsqueda en el *PageHeader* para obtener resultados asíncronos en tiempo real.
**Flujo Principal:**
1. User ingresa "LJCR" en el input de búsqueda.
2. El input aplica un **debounce** inteligente para reducir el ruido en la red (~300ms).
3. TanStack Query activa el estado `loading`.
4. El frontend consulta `api.github.com/search/users?q=LJCR`.
4. **Respuesta Positiva:** Se dispara un **Sonner Toast** sutil confirmando la recuperación de datos. El grid se hidrata aplicando un **staggered entrance** (Motion v12) donde cada `UserCard` aparece secuencialmente.
5. **Sin Resultados:** Se notifica al usuario vía Toast y se muestra un estado *Empty* minimalista.

### 2. Navegación Inmersiva (Fluid Transitions)

**Descripción:** Transición suave desde un resultado en la grilla hacia la vista detallada del perfil (/user/LJCR).
**Flujo Principal:**
1. User pulsa "Ver Perfil".
2. **Motion Layout:** El avatar del usuario utiliza un `layoutId` para "viajar" visualmente desde la tarjeta hacia su posición en el header del detalle, manteniendo la continuidad cognitiva.
3. `<Link>` redirige por `react-router-dom` v7 sin recarga de página.
4. El componente `UserDetail` monta sus sub-secciones (Repos, Seguidores) con un efecto de fundido (`opacity: 0` -> `opacity: 1`) coordinado para una sensación de fluidez nativa.

### 3. Persistencia de Identidad Visual (Adaptive Theming)

**Descripción:** Personalización del esquema de color (Light/Dark) con persistencia garantizada.
**Flujo Principal:**
1. User pulsa el `ThemeToggle` (animado con Motion para un giro fluido del icono).
2. El hook `useTheme` inyecta la clase en el `<html>` y actualiza el `localStorage`.
3. Los **CSS Variables** reaccionan instantáneamente (transición de 300ms aplicada en el `body`) para suavizar el cambio de luminancia.

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
