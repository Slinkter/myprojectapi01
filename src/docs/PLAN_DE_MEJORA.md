# Plan de Mitigación de Deuda Técnica y Mejoras

Este documento detalla el plan de acción estructurado por fases para abordar las observaciones, riesgos y deudas técnicas identificadas en el **Diagnóstico Técnico**. El objetivo es elevar la calidad del código, la arquitectura y la mantenibilidad del proyecto sin interrumpir el flujo de desarrollo actual.

---

## 📅 Resumen del Plan

| Fase | Objetivo Principal | Impacto Estimado | Duración Est. |
|------|--------------------|------------------|---------------|
| **Fase 1** | **Higiene de Estilos y UI** | Alto (Mantenibilidad) | Corto Plazo |
| **Fase 2** | **Arquitectura y DX** | Medio (Escalabilidad) | Corto/Mediano |
| **Fase 3** | **Calidad y Testing** | Alto (Robustez) | Mediano Plazo |
| **Fase 4** | **Optimización y Features** | Medio (Performance) | Largo Plazo |

---

## 🚀 Fase 1: Higiene de Estilos y UI (Prioridad Alta)

**Objetivo:** Eliminar la inconsistencia de mezclar metodologías (Tailwind + BEM) y adoptar un enfoque *Utility-First* puro.

### Acciones

1.  **Auditoría de Clases BEM:**
    *   Identificar todas las clases BEM (`user-card__header`, `page-header__title`, etc.) en componentes `.jsx`.
    *   Identificar las definiciones correspondientes en `index.css`.

2.  **Migración a Tailwind CSS:**
    *   Reemplazar las reglas CSS tradicionales por sus equivalentes en clases de utilidad de Tailwind dentro de los componentes.
    *   **Ejemplo:**
        *   *Antes:* `.user-card { background: white; border-radius: 8px; }`
        *   *Después:* `<div className="bg-white rounded-lg ...">`

3.  **Limpieza de `index.css`:**
    *   Eliminar las reglas CSS obsoletas una vez migradas.
    *   Mantener en `index.css` solo las directivas de Tailwind (`@tailwind base`, etc.) y estilos globales esenciales que no se puedan manejar con utilidades.

4.  **Estandarización de Material Tailwind:**
    *   Revisar el uso de componentes de `@material-tailwind/react`.
    *   Asegurar que se personalicen mediante `className` (Tailwind) o props del tema, no con CSS externo.

**Entregable:** Un codebase libre de clases BEM y un archivo `index.css` minimalista.

---

## 🏗️ Fase 2: Arquitectura y Experiencia de Desarrollo (DX)

**Objetivo:** Mejorar la estructura del proyecto y facilitar la importación de módulos.

### Acciones

1.  **Implementación de Alias (`@/`):**
    *   Configurar `vite.config.js` para resolver el alias `@` a la carpeta `src`.
    *   Actualizar `jsconfig.json` (o crear uno) para que VS Code reconozca los alias y proporcione autocompletado.
    *   Refactorizar masivamente los imports: cambiar `../../components/` por `@/components/`.

2.  **Consolidación Feature-Based:**
    *   Evaluar mover componentes "huérfanos" de `src/components` a `src/features` si pertenecen a un dominio específico (ej. `UserCard` -> `src/features/users/components/UserCard`).
    *   Definir claramente qué permanece en `src/components` (componentes UI puros y globales) y qué va a `src/features`.

3.  **Organización de Servicios:**
    *   Centralizar llamadas a API. Asegurar que `userService.js` sea el único punto de entrada para `api.github.com`.

**Entregable:** Configuración de path aliases funcional y una estructura de carpetas más coherente con el dominio.

---

## 🛡️ Fase 3: Calidad y Testing

**Objetivo:** Introducir redes de seguridad para prevenir regresiones y errores de lógica.

### Acciones

1.  **Configuración de Test Runner:**
    *   Instalar y configurar **Vitest** (compatible con Vite) y **React Testing Library**.
    *   Configurar scripts de test en `package.json`.

2.  **Testing de Utilidades y Hooks:**
    *   Crear pruebas unitarias para `userService.js` (mockeando fetch).
    *   Probar hooks críticos como `useDebouncedSearch` y `usersSlice` logic.

3.  **Testing de Componentes Críticos:**
    *   Implementar pruebas de integración para `UserSearch` y `UserCard`. Verificar que se renderizan los datos y se manejan los estados de carga/error.

4.  **Integración Continua (CI) - Opcional:**
    *   Configurar un workflow básico de GitHub Actions para ejecutar linter y tests en cada Push.

**Entregable:** Suite de pruebas funcional cubriendo al menos el 40% del código crítico.

---

## ⚡ Fase 4: Optimización y Nuevas Features

**Objetivo:** Mejorar el rendimiento percibido y expandir la funcionalidad.

### Acciones

1.  **Auditoría de Rendimiento:**
    *   Ejecutar Lighthouse/PageSpeed Insights.
    *   Verificar el impacto real de `React.memo` y `useIntersectionObserver`. Ajustar si es necesario.

2.  **Manejo Avanzado de Errores:**
    *   Implementar "Error Boundaries" de React para capturar errores de renderizado y evitar pantalla blanca.

3.  **Feature: Detalle de Usuario:**
    *   Implementar enrutamiento (React Router) para navegar a una página de detalle `/user/:login`.
    *   Crear la nueva feature `src/features/user-detail`.

**Entregable:** Reporte de performance optimizado y plan para la v2 de la aplicación.
