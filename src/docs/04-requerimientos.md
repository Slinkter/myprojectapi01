# 04 - Requerimientos Funcionales y No Funcionales

## 📊 Requerimientos Funcionales (RF)

| ID         | Área               | Descripción                                                                                                                         | Prioridad |
| ---------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------- | --------- |
| **RF-001** | Búsqueda           | El sistema DEBE buscar usuarios en base a un input libre utilizando la API de GitHub (`/search/users`).                             | Alta      |
| **RF-002** | Filtrado Asíncrono | El _fetching_ DEBE implementarse en tiempo real aplicando un debounce prudente (~300-500ms) para proteger _rate limits_.            | Alta      |
| **RF-003** | Visualización      | El grid de perfiles DEBE pintar los avatares, usernames y proveer un hipervínculo interno a un view específico.                     | Alta      |
| **RF-004** | Perfil Específico  | La ruta `/user/:login` DEBE aislar el contexto y pintar Repos, Seguidores de manera ampliada, con _link_ absoluto al GitHub origin. | Crítica   |
| **RF-005** | Fallback UX        | El sistema DEBE ofrecer _Skeletons_ ante red lenta y pantallas amigables de NotFound.                                               | Media     |
| **RF-006** | Theming            | El usuario DEBE poder alternar entre Light y Dark Mode sin perder ese estado al recargar la página.                                 | Media     |

## 🏗️ Requerimientos No Funcionales (RNF)

| ID          | Criterio (Atributos de Calidad) | Descripción y Constreñimientos Arquitectónicos (El Refactor v4)                                                                                      |
| ----------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **RNF-001** | **Performance (Lighthouse)**    | El ecosistema DEBE prescindir de UI Kits macro como `@material-tailwind` y reducirse a un bundle enano, logrando puntuaciones Lighthouse de **>95**. |
| **RNF-002** | **Accesibilidad (A11y)**        | Todos los botones nativos DEBEN contar con su atributo `aria-label`, contraste AAA entre Light/Dark y tags `<svg>` escondidos para screen readers.   |
| **RNF-003** | **DRY y Refactoring**           | No DEBEN existir estilos duplicados embebidos o redundancias `className`. DEBE regir la composición por Tailwind `@theme` y el utilitario `cn()`.    |
| **RNF-004** | **Usabilidad Móvil**            | Obligatoriedad extrema de usar layout táctico: `grid-cols-1 md:grid-cols-2`. Sin scrolls horizontales no deseados.                                   |
| **RNF-005** | **Arquitectura Cliente Pura**   | Toda persistencia del App State o "negocio" debe ser puramente efímera en Memoria (Redux) o LocalStorage. Serverless prohibido en este scope.        |

## 📐 Relación de Casos vs Requerimientos (ASCII Matrix)

1. BÚSQUEDA ---> [RF-001] [RF-002] [RNF-004]
2. PERFIL ---> [RF-004] [RNF-001]
3. THEME ---> [RF-006] [RNF-002]
