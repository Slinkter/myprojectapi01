# 🐣 Guía FSD: ¡Arquitectura Explicada Nivel Pollito! 🐥

¡Bienvenido! Si estás dando tus primeros pasos en la programación o en la arquitectura de software, no te asustes por los nombres raros. Esta guía fue hecha para que entiendas **Feature-Sliced Design (FSD)** de manera visual, simple y con manzanas.

---

## 🎂 1. La Analogía del Pastel de Bodas

FSD organiza tu código en **6 pisos (capas)**. La regla más importante de este pastel es la **Gravedad**:
* Puedes bajar a buscar cosas a los pisos inferiores.
* **NUNCA** puedes subir a buscar cosas a los pisos superiores.

```text
       ┌───────────────┐
       │      app      │  🚀 Piso 6: El pegamento (Rutas, Providers)
       └───────┬───────┘
               ▼
       ┌───────────────┐
       │     pages     │  📄 Piso 5: Las pantallas completas
       └───────┬───────┘
               ▼
       ┌───────────────┐
       │    widgets    │  🧱 Piso 4: Orquestadores grandes autónomos
       └───────┬───────┘
               ▼
       ┌───────────────┐
       │   features    │  ⚙️ Piso 3: Acciones e interacciones del usuario
       └───────┬───────┘
               ▼
       ┌───────────────┐
       │   entities    │  🛡️ Piso 2: Conceptos de negocio (Usuario, Card)
       └───────┬───────┘
               ▼
       ┌───────────────┐
       │    shared     │  🔌 Piso 1: Herramientas genéricas (Cliente HTTP)
       └───────────────┘
```

---

## 🗺️ 2. Mapa del Flujo de Importaciones (Mermaid)

Este diagrama muestra cómo se permite importar código entre las diferentes capas. Nota cómo las flechas van exclusivamente hacia abajo:

```mermaid
graph TD
    App[app / Piso 6] --> Pages[pages / Piso 5]
    App --> Shared[shared / Piso 1]
    
    Pages --> Widgets[widgets / Piso 4]
    Pages --> Shared
    
    Widgets --> Features[features / Piso 3]
    Widgets --> Entities[entities / Piso 2]
    Widgets --> Shared
    
    Features --> Entities
    Features --> Shared
    
    Entities --> Shared
    
    style App fill:#f9f,stroke:#333,stroke-width:2px
    style Pages fill:#bbf,stroke:#333,stroke-width:2px
    style Widgets fill:#dfd,stroke:#333,stroke-width:2px
    style Features fill:#fdd,stroke:#333,stroke-width:2px
    style Entities fill:#ffb,stroke:#333,stroke-width:2px
    style Shared fill:#eee,stroke:#333,stroke-width:2px
```

---

## 🌊 3. El Camino que recorren los Datos (Pipeline)

Cuando buscas un usuario en la UI, los datos viajan a través de las capas de la siguiente manera:

```mermaid
sequenceDiagram
    autonumber
    actor Usuario
    participant UI as Componente (UI)
    participant Facade as Fachada (Features)
    participant Hook as useQuery (Entities)
    participant Adapter as Adapter + Zod (Entities)
    participant API as GitHub API (Shared/Red)

    Usuario->>UI: "Escribe término de búsqueda"
    UI->>Facade: "Llama setSearchTerm('mojombo')"
    Note over Facade: Espera 500ms (Debounce)
    Facade->>Hook: "Llama useUserQuery('mojombo')"
    Hook->>API: "Realiza petición HTTP"
    API-->>Adapter: "Devuelve datos crudos de GitHub"
    Note over Adapter: Valida con Zod y traduce variables
    Adapter-->>Hook: "Devuelve objeto normalizado"
    Hook-->>Facade: "Entrega estado listo (data, isLoading)"
    Facade-->>UI: "Expone variables booleanas simplificadas"
    UI-->>Usuario: "Muestra la tarjeta UserCard con efecto Glass"
```

---

## 🏠 4. Vista Isometrica del Proyecto (ASCII Art)

Imagínalo como carpetas físicas organizadas en estantes tridimensionales:

```text
                      
                      ┌───────────────────────────────┐
                     /              app              /  Piso 6 (Rutas y App.jsx)
                    /───────────────────────────────/ │
                   ┌───────────────────────────────┐  │
                  /             pages             / ──┼  Piso 5 (SearchPage.jsx)
                 /───────────────────────────────/ │  │
                ┌───────────────────────────────┐  │  │
               /            widgets            / ──┼──┼  Piso 4 (SearchResults.jsx)
              /───────────────────────────────/ │  │  │
             ┌───────────────────────────────┐  │  │  │
            /           features            / ──┼──┼──┼  Piso 3 (useUserSearchFacade.js)
           /───────────────────────────────/ │  │  │  │
          ┌───────────────────────────────┐  │  │  │  │
         /           entities            / ──┼──┼──┼──┼  Piso 2 (userAdapter.js, UserCard.jsx)
        /───────────────────────────────/ │  │  │  │  │
       ┌───────────────────────────────┐  │  │  │  │  │
      /            shared             / ──┴──┴──┴──┴──┘  Piso 1 (httpClient.js, useTheme.js)
     /───────────────────────────────/
     
```

---

## 💡 5. Las 3 Reglas de Oro del Buen Programador FSD

1. **La regla de la frontera:** Nunca importes un archivo interno directamente (ej: `import X from '@/entities/user/ui/UserCard'`). Siempre importa desde el index principal del slice (ej: `import { UserCard } from '@/entities/user'`).
2. **La regla de la flecha única:** Si estás escribiendo código en `entities`, no puedes importar nada que esté en `features`, `widgets`, `pages` ni `app`.
3. **No repitas lógica (DRY):** Las herramientas que uses en más de dos lugares del pastel de bodas van en la base: la capa `shared`.

---

## 📡 6. El Detective de Código: ¡El Logger de 9 Pasos! 🔍

Para saber qué está pasando en cada piso de nuestro pastel, hemos contratado a un "detective" (el **logger**). Si abres la consola de tu navegador (F12), verás cómo el detective te cuenta el viaje de los datos paso a paso:

1. **Paso 1:** ¡Poniendo los cimientos! (Mounting)
2. **Paso 2:** Armando el armazón de la casa. (Shell)
3. **Paso 3:** Entrando a una habitación. (Pages)
4. **Paso 4:** Encendiendo la televisión. (Widgets)
5. **Paso 5:** Eligiendo qué película ver. (Factory)
6. **Paso 6:** El control remoto inteligente. (Facade)
7. **Paso 7:** Buscando la señal de cable. (Query Hook)
8. **Paso 8:** La antena recibiendo la señal. (Service)
9. **Paso 9:** Decodificando la imagen para que se vea bien. (Adapter)

¡Si sigues estos números en la consola, nunca te perderás en el código! 🚀
