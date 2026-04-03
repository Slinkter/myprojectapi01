# 🎨 Auditoría de Diseño y Temas (Tailwind v4)

## 1. Filosofía de Diseño: "The Artifact"
Buscamos una estética **Senior & Refined**: brutalmente minimalista con acentos de marca potentes. El sistema se basa en la "Apple-esque" Essentialism, priorizando el espacio negativo, tipografías nítidas y micro-interacciones de alta fidelidad.

## 2. Sistema de Temas Semánticos (CSS v4 Pure)

Hemos abandonado la configuración en JS (`tailwind.config.js`) en favor de **Variables CSS Nativas**. El cambio de tema es 100% manejado por la cascada de CSS, optimizando el rendimiento de renderizado.

### Tokens de Marca (v4 Directives)
- **Primary/Brand:** Blue/Indigo (`--color-primary`) para acentos.
- **Grayscale:** Slate de alta fidelidad para superficies y texto.

### Mapeo Semántico (Dark/Light Protocol)

| Token CSS | Light Value (Industrial) | Dark Value (Deep Space) |
| :--- | :--- | :--- |
| `--color-app-bg` | `#ffffff` | `#000000` |
| `--color-app-surface` | `#ffffff` | `#121212` |
| `--color-app-card` | `rgba(255, 255, 255, 0.5)` | `rgba(18, 18, 18, 0.4)` |
| `--color-app-text` | `#111111` | `#f5f5f7` |
| `--color-app-accent` | `#0071e3` | `#ffffff` |
| `--color-app-border` | `rgba(0, 0, 0, 0.05)` | `rgba(255, 255, 255, 0.08)` |

---

## 3. Arquitectura de Componentes y Variantes

### 🗂️ Card Variants (High-Fidelity)
Hemos implementado un sistema de variantes para `UserCard` que permite adaptar la densidad visual según el contexto:

- **Glass (Bento-style):** Basado en `backdrop-blur-xl` y `border-app-glass-border`. Ideal para layouts modernos con profundidad.
- **Minimal (Vercel-inspired):** Sin bordes pesados, usa acentos en el borde izquierdo (`border-l-2`) y cambios de fondo sutiles. Optimizado para listas densas.
- **Accent-Glow:** Utiliza sombras dinámicas basadas en la variable `--color-app-accent` para crear un efecto de "aura" en hover.
- **Default:** Borde estándar con elevación sutil para máxima legibilidad.

### 📐 Consistencia de Iconografía (Lucide-React)
Se ha estandarizado el uso de **Lucide-React** como set primario de iconos. 
- **Directriz:** Todos los iconos deben usar `stroke-width={1.5}` o `{2}` para mantener el "visual weight" coherente con la tipografía Inter.
- **Implementación:** Reemplazo de sets heterogéneos para garantizar que cada glifo comparta el mismo lenguaje geométrico.

---

## 4. Animaciones Cinematográficas (Motion v12)

- **Grid Staggering:** Las tarjetas de usuario entran una a una con un retraso escalonado de `0.05s`.
- **Layout Transitions:** Uso de `layoutId` de Motion para transiciones fluidas de elementos compartidos (ej. Avatares) entre vistas.
- **Haptic Feedback Simulation:** Escalado sutil (`0.95`) en acciones `active` para proporcionar una sensación de respuesta física "premium".

---

## 5. Feedback y Notificaciones (Sonner)
Implementación de **Sonner** para un sistema de toasts no obstructivo. 
- **Aesthetic:** Estilo minimalista sincronizado con el tema (`theme="system"`).
- **UX:** Ubicación en la esquina inferior derecha para evitar bloqueos visuales del contenido principal.
