# 1. Product Requirements Document (PRD) — GitExplorer

Este documento define la visión de producto, objetivos de negocio, alcance y los requisitos funcionales detallados de **GitExplorer**, sirviendo como base para el desarrollo del producto.

---

## 1. Visión del Producto

**GitExplorer** es una Single Page Application (SPA) educativa y de alto rendimiento diseñada para optimizar la exploración y análisis de perfiles de usuario y organizaciones en la red pública de GitHub. Proporciona una interfaz moderna, rápida e inmersiva que re-resuelve un problema clásico aplicando los máximos estándares de ingeniería frontend.

---

## 2. Formulación del Problema

La interfaz estándar de GitHub está orientada al trabajo colaborativo en repositorios y no a la exploración ágil de desarrolladores. Identificamos las siguientes limitaciones críticas en el flujo nativo:

| Limitación | Impacto en el Usuario |
| :--- | :--- |
| **Sin búsqueda predictiva** | Búsquedas manuales pesadas que mezclan código, repositorios y perfiles en lugar de autocompletado en tiempo real. |
| **Alta latencia de carga** | Cada navegación requiere recargas completas del navegador de 2 a 5 segundos de espera. |
| **Sin caché de datos** | Cada click a un perfil previamente visitado descarga los datos repetidamente, consumiendo cuotas de la API. |
| **Densidad visual innecesaria** | Exceso de información desordenada (issues, pull requests, logs) que dificulta ver los datos de contacto y estadísticas clave. |

**GitExplorer** soluciona esto con búsqueda fluida con debounce, caché inteligente de estado de servidor, validaciones en runtime y un dashboard Bento Grid limpio e informativo.

---

## 3. Objetivos

### Objetivo General
Construir una Single Page Application (SPA) reactiva en React 18 que permita explorar perfiles y organizaciones de GitHub de manera instantánea, con diseño coherente en temas claro/oscuro, y sirviendo de modelo de referencia en ingeniería frontend.

### Objetivos Específicos
* **OE-1 (Búsqueda Reactiva):** Búsqueda asíncrona con debounce de 500ms y caché inteligente que evite recargar datos ya consultados en los últimos 5 minutos.
* **OE-2 (Consistencia Estética):** Interfaz inmersiva (sin barra de navegación) con gradientes modernos Indigo/Slate, redondeos orgánicos y transiciones suaves de Motion v12.
* **OE-3 (Validación e Integridad):** Tipado estricto en runtime mediante esquemas Zod en todas las entradas externas de datos de la API de GitHub.

---

## 4. Alcance del Sistema (Scope)

### ✅ Incluido en la versión actual (In-Scope)
* Búsqueda en tiempo real de usuarios y organizaciones de GitHub por username.
* Filtro inteligente de resultados y manejo de estados vacíos ("Sin resultados").
* Dashboard de detalle en Bento Grid con contadores de estadísticas animados.
* Selector de tema dual (Slate Light / Midnight Dark) con persistencia local.
* Mocking local en desarrollo mediante MSW (Mock Service Worker).
* Despliegue estático automatizado en GitHub Pages.

### ❌ Excluido del alcance (Out-of-Scope)
* Autenticación de usuarios vía OAuth2 con GitHub (acceso 100% público).
* Modificación de datos en GitHub (creación de repositorios, follows, etc.).
* Almacenamiento persistente en base de datos externa propia del backend.
* Soporte 100% offline (salvo los datos estáticos del entorno de desarrollo con MSW).

---

## 5. Modelo de Negocio (CANVAS)

> **Nota:** Al ser un proyecto educativo de código abierto sin fines de lucro, el CANVAS se enfoca en el valor didáctico y el segmento de usuarios de aprendizaje.

* **Segmento de Clientes:** Desarrolladores de software junior/trainee, autodidactas y reclutadores que buscan evaluar implementaciones reales de buenas prácticas de React.
* **Propuesta de Valor:** "Aprende React moderno con patrones de arquitectura avanzada (FSD, GoF) y validación de datos profesional en un proyecto 100% documentado".
* **Canales:** Repositorio en GitHub, aplicación publicada en GitHub Pages, artículos técnicos y guías de desarrollo de soporte.
* **Estructura de Costos:** Gratuito (hospedaje estático en GitHub Pages y API pública limitada de GitHub).

---

## 6. Requisitos Funcionales (RF)

| ID | Requisito Funcional | Prioridad |
| :--- | :--- | :---: |
| **RF-01** | El sistema debe mostrar un input en el héroe para ingresar el nombre de usuario de GitHub. | Alta |
| **RF-02** | Debe aplicar un retraso (debounce) de 500ms antes de disparar la consulta de red. | Alta |
| **RF-03** | Debe consultar el endpoint `/search/users` de la API de GitHub usando el término ingresado. | Alta |
| **RF-04** | Debe cancelar automáticamente las peticiones de red previas que sigan pendientes si el usuario cambia el input (AbortSignal). | Alta |
| **RF-05** | Debe renderizar un grid de skeletons animados (SkeletonCard) durante los estados de carga. | Alta |
| **RF-06** | Mostrará tarjetas interactivas (UserCard) con: avatar, nombre, bio y estadísticas básicas. | Alta |
| **RF-07** | Renderizará un componente de "Sin resultados" indicando el término si la búsqueda es vacía. | Alta |
| **RF-08** | Mostrará un panel de error con botón de reintento ante fallos de conexión o rate-limits de la API. | Alta |
| **RF-09** | Debe cachear consultas mediante TanStack Query (staleTime de 5min, gcTime de 10min). | Alta |
| **RF-10** | Mostrará notificaciones Toast flotantes (Sonner) detallando errores de validación de datos. | Alta |
| **RF-11** | Permitirá navegar a la vista de detalle `/user/:login` al clickear en la tarjeta de un perfil. | Alta |
| **RF-12** | Mostrará la vista de detalle en estructura Bento Grid asimétrica con estadísticas complejas. | Alta |
| **RF-13** | Los contadores de repositorios, seguidores y gists del bento deben animarse con física de spring. | Media |
| **RF-14** | Validará los datos externos con esquemas Zod antes de dejarlos entrar a los componentes. | Alta |
| **RF-15** | Integrará un interruptor de tema (luz/oscuridad) que persista el estado en localStorage. | Alta |
| **RF-16** | Detectará la preferencia del sistema operativo (`prefers-color-scheme`) al primer ingreso. | Alta |
| **RF-17** | La barra de búsqueda debe admitir el atajo `Ctrl+K` (en Windows/Linux) y `⌘K` (en macOS) para enfocar el buscador. | Media |
| **RF-18** | Diseñará componentes responsive para mobile (stack), tablet y pantallas de escritorio. | Alta |

---

## 7. Historias de Usuario (User Stories) y Criterios de Aceptación (ATDD)

### HU-01: Búsqueda predictiva con debounce
```text
COMO:     Usuario explorando perfiles de GitHub
QUIERO:   Ingresar un username y ver resultados automáticos sin recargar la página
PARA:     Encontrar desarrolladores de forma ágil y rápida.
```
* **Criterio de Aceptación 1 (Búsqueda Exitosa):**
  * **Dado** que el usuario se encuentra en la pantalla de inicio con el input vacío.
  * **Cuando** escribe `"mojombo"` y detiene la escritura por 500ms.
  * **Entonces** el sistema consulta la API de GitHub y renderiza las tarjetas de resultados correspondientes.
* **Criterio de Aceptación 2 (Búsqueda corta):**
  * **Dado** que el usuario ingresa texto en el buscador.
  * **Cuando** el texto tiene menos de 3 caracteres (ej: `"mo"`).
  * **Entonces** el sistema NO realiza ninguna petición a la API.

### HU-02: Detalle de perfil en Bento Grid
```text
COMO:     Desarrollador evaluando perfiles
QUIERO:   Navegar al perfil detallado de un usuario en un dashboard visual
PARA:     Analizar sus repositorios, ubicación y enlaces externos de un solo vistazo.
```
* **Criterio de Aceptación 1 (Contadores de Bento):**
  * **Dado** que el usuario entra al detalle `/user/mojombo` de un perfil con 66 repositorios.
  * **Cuando** renderiza la pantalla.
  * **Entonces** la barra de progreso de repositorios se llena dinámicamente y el contador numérico de repositorios se anima progresivamente de 0 a 66 en 1.2 segundos.
* **Criterio de Aceptación 2 (Retorno):**
  * **Dado** que el usuario está revisando el perfil de un desarrollador.
  * **Cuando** presiona el botón "Volver a buscar".
  * **Entonces** el enrutador navega a la ruta principal `/` y restaura el estado de búsqueda previo.
