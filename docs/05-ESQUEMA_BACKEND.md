# 5. Esquema de Integración y Backend Mocks — GitExplorer

Este documento detalla la integración con la API REST de GitHub, las estructuras de datos (Zod Schemas), la capa de adaptación y la simulación de red con **Mock Service Worker (MSW)**.

---

## 1. Integración con GitHub API v3

El sistema se conecta de forma directa al servidor externo público de GitHub. Todos los endpoints consumidos se acceden mediante peticiones HTTP `GET` asíncronas con cabeceras JSON estándar:

| Funcionalidad | Endpoint en Producción | Estructura de Respuesta |
| :--- | :--- | :--- |
| **Búsqueda General** | `https://api.github.com/search/users?q={search}` | Colección paginada: `{ total_count: number, items: RawGitHubUser[] }` |
| **Lista Inicial (Fallback)** | `https://api.github.com/users` | Array de usuarios: `RawGitHubUser[]` |
| **Detalle de Perfil** | `https://api.github.com/users/{username}` | Objeto detallado: `RawGitHubUserDetail` |

---

## 2. Esquema de Validación de Datos (Zod Schema)

Toda respuesta proveniente de los endpoints de GitHub se parsea de forma estricta a nivel de infraestructura para evitar errores silenciosos debidos a cambios en la API. El esquema en [schema.js](../src/entities/user/model/schema.js) está definido como:

```javascript
import { z } from "zod";

export const GitHubUserSchema = z.object({
  id: z.number(),
  login: z.string(),
  avatar_url: z.string().url(),
  html_url: z.string().url(),
  type: z.string().default("User"),
  name: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
  public_repos: z.number().optional().default(0),
  followers: z.number().optional().default(0),
  following: z.number().optional().default(0),
  public_gists: z.number().optional().default(0),
  location: z.string().nullable().optional(),
  blog: z.string().nullable().optional(),
});
```

* Los campos de detalle (como `public_repos` o `bio`) se definen con `.optional().default()` o `.nullable()` para asegurar la compatibilidad con las respuestas simplificadas de la lista de búsqueda general, que no retorna todos estos atributos en su payload primario.

---

## 3. Capa de Adaptación de Datos (Adapter Layer)

El adaptador [adapter.js](../src/entities/user/model/adapter.js) aísla por completo el código de la UI del modelo del servidor:

```javascript
export const userAdapter = (rawUser) => {
  // Dispara el validador Zod. Lanza ZodError si hay discrepancia de tipo
  const data = GitHubUserSchema.parse(rawUser);

  // Retorna el modelo interno unificado 'UserProfile'
  return {
    id: data.id,
    username: data.login,
    name: data.name || data.login,
    photo: data.avatar_url,
    profileUrl: data.html_url,
    type: data.type,
    bio: data.bio || "",
    repos: data.public_repos,
    followers: data.followers,
    following: data.following,
    gists: data.public_gists,
    location: data.location || "",
    website: data.blog || "",
    origin: "github",
  };
};
```

---

## 4. Servidor de Simulación Local (MSW)

En el entorno de desarrollo (`pnpm dev`), se activa **Mock Service Worker** para interceptar peticiones de red evitando la cuota límite (Rate Limit) de la API anónima de GitHub.

### Inicialización en main.jsx
El worker se levanta de forma asíncrona previo a la creación del DOM de React:
```javascript
async function enableMocking() {
  if (import.meta.env.MODE !== "development") return;
  const { worker } = await import("@/shared/mocks/browser");
  return worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
    },
  });
}
```

### Handlers de Red (`handlers.js`)
El archivo [handlers.js](../src/shared/mocks/handlers.js) contiene un array de 10 desarrolladores locales (`mojombo`, `microsoft`, `vercel`, `slinkter`, etc.) y simula la lógica del buscador filtrando el array local y respondiendo con objetos estructurados idénticos a los de GitHub:

* **Simulación de búsqueda (`GET /search/users`):**
  ```javascript
  http.get("https://api.github.com/search/users", ({ request }) => {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get("q")?.toLowerCase() || "";
    const filtered = mockUsers.filter(u => 
      u.login.toLowerCase().includes(searchTerm) || 
      u.name?.toLowerCase().includes(searchTerm)
    );
    return HttpResponse.json({ total_count: filtered.length, items: filtered });
  })
  ```
* **Simulación de detalle (`GET /users/:login`):**
  ```javascript
  http.get("https://api.github.com/users/:login", ({ params }) => {
    const user = mockUsers.find(u => u.login.toLowerCase() === params.login.toLowerCase());
    return user ? HttpResponse.json(user) : new HttpResponse(null, { status: 404 });
  })
  ```
