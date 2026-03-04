# 🎨 Auditoría de Diseño y Temas (Tailwind v4)

## 1. Filosofía de Diseño: "The Artifact"
Buscamos una estética **Senior & Refined**: brutalmente minimalista con acentos de marca potentes.

## 2. Sistema de Temas Semánticos (CSS v4 Pure)

Hemos abandonado la configuración en JS (`tailwind.config.js`) en favor de **Variables CSS Nativas**. El cambio de tema es 100% manejado por la cascada de CSS.

### Tokens de Marca (v4 Directives)
- **Primary/Brand:** Indigo (`--color-brand-600`) para acentos.
- **Grayscale:** Slate/Navy para superficies y texto.

### Mapeo Semántico (Dark/Light Protocol)

| Token CSS | Light Value | Dark Value |
| :--- | :--- | :--- |
| `--color-app-bg` | `#f8fafc` | `#020617` |
| `--color-app-surface` | `#ffffff` | `#0f172a` |
| `--color-app-text` | `#0f172a` | `#f8fafc` |
| `--color-app-accent` | `#4f46e5` | `#818cf8` |

---

## 3. Clases de Abstracción (DRY Cleaner)

Hemos extraído patrones repetitivos para garantizar consistencia visual:

- **`.glass-card`**: Tarjeta con efecto de transparencia, bordes definidos y sombras premium.
- **`.btn-primary`**: Botón táctil con feedback interactivo y soporte nativo de dark mode.
- **`.artifact-container`**: Contenedor maestro con padding seguro para dispositivos móviles.

---

## 4. Animaciones Cinematográficas (Motion v12)

- **Grid Staggering:** Las tarjetas de usuario entran una a una con un retraso escalonado de `0.05s`.
- **Hardware Acceleration:** Uso de la propiedad `layout` para animaciones fluidas de reorganización de grid a 60 FPS.
- **Micro-Interactions:** Escalado sutil (`0.98`) al presionar botones para feedback táctil instantáneo.
