# 01 - Guía del Proyecto (Visión General)

## ¿Qué es este proyecto?

Este proyecto es una aplicación web (Single Page Application o SPA) hecha en React para buscar y explorar perfiles de usuarios de GitHub. 

Aunque la funcionalidad (buscar usuarios) parece sencilla, el objetivo real de este proyecto es ser un **modelo de buenas prácticas** de ingeniería de software. Está estructurado como lo haría un equipo "Senior", pero en esta guía te lo explicamos para que cualquier desarrollador Junior pueda entenderlo y aprender de él.

## Casos de Uso Principales

1. **Buscar Usuarios:** Un usuario escribe un nombre en el buscador. La app espera a que deje de escribir (debounce) y hace una petición a la API de GitHub.
2. **Visualizar Resultados:** Se muestra una cuadrícula con las tarjetas de los usuarios encontrados (con su foto y nombre).
3. **Manejo de Errores:** Si la API falla o se excede el límite de consultas, se le avisa al usuario con una notificación (Toast) y un mensaje amigable.
4. **Estados de Carga:** Mientras se buscan los datos, se muestran esqueletos animados (Skeletons) para que el usuario sepa que la app está trabajando.

## Requerimientos Clave que Cumple la App

*   **Rendimiento:** Usa `TanStack Query` para cachear (guardar en memoria) los resultados. Si buscas el mismo usuario dos veces, la segunda vez será instantáneo.
*   **Seguridad de Datos:** Usa `Zod` para validar que la API de GitHub nos devuelve exactamente lo que esperamos antes de usar los datos en nuestros componentes.
*   **Trazabilidad Educativa:** Implementa un **Logger de 9 Pasos** en consola que permite seguir el flujo de datos desde el Mounting hasta el Adapter, ideal para aprender el ciclo de vida de React.
*   **Documentación Maestro-Aprendiz:** El 100% del código incluye **JSDoc Universal** con secciones **🎓 CONCEPTO JUNIOR**, explicando la teoría detrás de cada bloque de código.
*   **Escalabilidad:** Usa patrones como `Adapter` y `Facade` (explicados en el documento 02) para que el código sea fácil de cambiar en el futuro sin romper otras partes.
*   **Estética Bento Grid & Tailwind**: Diseño de alta densidad de información basado en el estilo Bento para los dashboards de usuario, inspirado en la identidad visual de tailwindcss.com.
*   **Animaciones de Alta Fidelidad y Cursor Pokéball**: Entrada en cascada organizada mediante resortes físicos de Motion, micro-pulsos al enfocar la búsqueda, y un cursor Pokéball interactivo que se abre en hover.
