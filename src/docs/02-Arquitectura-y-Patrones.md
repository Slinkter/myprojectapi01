# 02 - Arquitectura y Patrones Explicados

Este proyecto utiliza una arquitectura llamada **Feature-Sliced Design (FSD)** adaptada. Suena complicado, pero en realidad significa que organizamos las carpetas por "Funcionalidad" (Features) en lugar de por el "Tipo" de archivo.

En lugar de tener una carpeta gigante de `components` y otra de `hooks`, tenemos una carpeta `features/users` que contiene *todo* lo relacionado con la búsqueda de usuarios (sus componentes, sus hooks, etc.). Esto hace que sea más fácil saber dónde cambiar las cosas.

## Los 3 Conceptos Clave (Explicados simple)

Para que el proyecto sea "a prueba de balas", usamos 3 conceptos o patrones principales:

### 1. El Patrón Adapter (Adaptador) y Zod
**Problema:** La API de GitHub nos devuelve mucha información, mucha basura que no necesitamos, y a veces los nombres de los campos cambian (por ejemplo, nos da `avatar_url` pero en nuestra app preferiríamos llamarlo `photo`). 
**Solución:** Creamos una función (el *Adapter*) que funciona como un enchufe adaptador de viaje. Toma los datos crudos de GitHub, verifica que sean correctos usando una librería llamada **Zod** (para asegurarnos de que no nos manden un número donde esperamos texto), y los transforma en un formato limpio y estándar para nuestros componentes. 

*Mira el archivo: `src/models/adapters/userAdapter.js`*

### 2. TanStack Query (El jefe de las peticiones)
**Problema:** Hacer peticiones a la API (fetch) manualmente es difícil porque tienes que manejar el `isLoading`, el `error`, y volver a pedir datos si fallan.
**Solución:** Usamos TanStack Query (`useQuery`). Le decimos "ve y busca esto" y él se encarga de decirnos si está cargando, si hubo error, o darnos los datos. Además, guarda en caché los resultados para no pedir lo mismo dos veces a internet.

*Mira el archivo: `src/features/users/hooks/useUserQuery.js`*

### 3. El Patrón Facade (Fachada)
**Problema:** Si metemos toda la lógica de buscar (el delay/debounce al escribir) y la lógica de pedir datos (TanStack Query) dentro de nuestro componente visual `UserSearch.jsx`, el archivo tendría 200 líneas y sería imposible de leer. 
**Solución:** Creamos un "Hook Fachada" (`useUserSearchFacade.js`). Este hook se come toda la complejidad (las variables, el debounce, las peticiones) y simplemente le entrega al componente visual un paquete limpio con cosas como `users` (los datos), `isLoading` (si está cargando) y `searchTerm` (lo que se escribió). Así, el componente visual solo se preocupa de *dibujar* la pantalla.

*Mira el archivo: `src/features/users/hooks/useUserSearchFacade.js`*
