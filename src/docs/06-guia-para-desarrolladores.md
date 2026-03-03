# 06 - Guía de Operaciones para Desarrolladores (DevGuide)

## 🏁 Instalación & Contrato Operativo

Este repositorio está migrado completamente al paradigma **Zero-Config-UI** apoyándose exclusivame en **Tailwind v4** y **Clean Code**.

Para correr este proyecto:

```bash
# 1. Copiar el repositorio o abrir CWD
# 2. Instalar el ecosistema puro (FSD y Tailwind)
pnpm install

# 3. Lanzar el compilador HMR de Vite
pnpm dev

# 4. Formatear y auditar la deuda local
pnpm run lint
```

## 🏗️ Convenciones de Proyecto

### FSD (Feature-Sliced Design) Extremo

Al agregar una funcionalidad (por ejemplo, buscar organizaziones Github), no agregues reducers random en el root ni componentes regados fuera. Debes aislarlo bajo `src/features/`.

- La lógica de negocio (`thunks.js`), la UI atada (`views/`) y su contexto coexisten modularmente.
- Cualquier componente UI en `src/components/ui/` es puramente agnóstico, nativo (un `<button>`).

### 🎨 Guía de Estilos - Sistema Taildwind CSS (Obligatorio)

Este proyecto eliminó el Vendor Lock-in (Chakra, `@material-tailwind`, Bootstrap).

**Instancia y Composición `cn()`:**
Nunca construyas clases condicionales a mano (spaghetti strings). Has uso del utilitario `clsx/tailwind-merge` unificado:

```jsx
// ❌ PROHIBIDO
<div className={`bg-gray-800 ${isActive ? "text-white" : "text-gray-500"}`} />;

// ✅ OBLIGATORIO Y ESTÁNDAR
import { cn } from "@/utils/cn.js";

<div
  className={cn(
    "bg-gray-800 text-gray-500 rounded-lg p-4 transition-all",
    isActive && "text-white shadow-xl bg-accent-600",
  )}
/>;
```

**Prohibiciones Críticas CSS:**

- ❌ **NO APTO**: Estilo en línea (`<div style={{color: 'red'}}>`).
- ❌ **NO APTO**: BEM o CSS Modules (`<div className="card__header--dark">`). La filosofía de nuestro sistema es `Utility-First` escalable.
- ❌ **NO APTO**: Reinstalar envoltorios tipo Mui/Chakra en este ambiente purificado.

### Reglas de Configuración de Paths (Alias `@`)

Asegura la legibilidad impoluta.

```jsx
// ❌ MAL
import Button from "../../../components/ui/Button";

// ✅ EXCELENTE (Importación Absoluta DX)
import Button from "@/components/ui/Button";
```

### Accesibilidad por Defecto (a11y)

Cada pieza añadible debe respetar las métricas de contraste requeridas por WCAG (AAA ideal). Toda mutación del DOM tiene que asegurar Focus Rings (`focus:ring-2 focus:ring-accent-500`).
