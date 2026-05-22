# 03 - Guía de Desarrollo

Esta guía es todo lo que necesitas para ejecutar el proyecto en tu computadora y empezar a programar.

## Comandos Básicos

Usamos **pnpm** como nuestro gestor de paquetes (es como npm o yarn, pero más rápido). 

| Comando | Para qué sirve |
| :--- | :--- |
| `pnpm install` | Instala todas las dependencias (librerías) que necesita el proyecto. ¡Ejecuta esto la primera vez! |
| `pnpm dev` | Levanta el servidor local. Podrás ver la aplicación corriendo en tu navegador (usualmente en `http://localhost:5173`). |
| `pnpm build` | Prepara el código y lo empaqueta para subirlo a producción (lo deja listo en la carpeta `/dist`). |
| `pnpm lint` | Revisa el código buscando errores de sintaxis o malas prácticas. Úsalo siempre antes de subir tu código. |

## ¿Cómo trabajar en este proyecto?

Si eres un Junior o acabas de entrar, te recomendamos:

1. **Lee los comentarios didácticos:** Hemos dejado comentarios explicativos (JSDoc) encima de las funciones principales en los archivos `UserSearch.jsx`, `useUserSearchFacade.js` y `userAdapter.js`. Esos comentarios te explicarán *por qué* hicimos las cosas de esa manera.
2. **Modificar Estilos:** Usamos **Tailwind CSS v4**. No necesitas crear archivos `.css` separados. Usa clases de Tailwind directamente en el className de los componentes.
3. **Manejar estado y peticiones:** No uses `useEffect` y `fetch` directamente en los componentes visuales. Si necesitas datos nuevos, agrégalos en el "Facade" correspondiente y usa `TanStack Query`.

¡No tengas miedo de explorar el código! La arquitectura protege el sistema, así que si algo falla, los mensajes de error te ayudarán a entender qué pasó.
