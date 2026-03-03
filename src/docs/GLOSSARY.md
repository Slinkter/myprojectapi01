# 📖 GLOSSARY (Glosario Técnico Especializado)

## Arquitectura y Patrones

- **FSD (Feature-Sliced Design):** Metodología moderna que busca estructurar el código React separando módulos funcionales (`features`) aislados, desensamblando el clásico modelo atado u horizontal, otorgando máxima cohesión.
- **Container Pattern (Smart/Dumb):** Un componente Inteligente (Container) que gestiona el estado, hooks y peticiones, inyectando exclusivamente propiedas pasivas a componentes Tontos (Presenters).

## Estilos y Accesibilidad

- **Tailwind v4 (Utility-First):** Sistema CSS sin "framework". Funcional por utilidades y dependencias como `clsx/tailwind-merge` para combinar o borrar redundancias `className` al inyectar lógicas.
- **Tree-Shaking UI / Vendor Lock-in Depuration:** Limpieza profunda de librerías esclavas UI (como Bootstrap, Chakra o Material UI). Tailwind CSS nativo fuerza a re-construir la agilidad en la capa `<html/tags>`.
- **A11Y (Accesibilidad WCAG):** Principio universal que rige a un proyecto inclusivo e indexable, como lo es asignar Roles ARIA y Contrastes exigidos.

## Flujos y Rendimiento

- **Cliente Puro (Pure Client SPA):** Una arquitectura desvinculada del stack Backend. Toda orquestación Async viene vía protocolo Request/Fetch contra una API Remota expuesta (_Serverless como Firebase u otro motor Middleware Omitidos Intencionalmente_).
- **Debounce:** Patrón limitador de taza de ejecución. Frena re-rendering o llamadas a servidor hasta que el input deje de sufrir modificaciones durante el delay programado.

## Ingeniería de Software General

- **DRY (Don't Repeat Yourself):** Eliminar duplicación por reuso y abstracciones útiles, previniendo código de repetición ("WET" code).
- **SRP (Single Responsibility Principle):** Un bloque (módulo o slice de diseño) que está construido sobre la premisa de hacer su misión bien absteniéndose de sobre-arquitecturas.
