# 🎨 Auditoría de Diseño y Temas (Minimalist v3)

## 1. Filosofía de Diseño: "Essentialism"

Tras el refactor v3, hemos avanzado hacia una estética de **Esencialismo Técnico**. Hemos eliminado degradados agresivos y "blobs" de fondo para centrar la atención en la información.

## 2. Sistema de Temas Semánticos (CSS v4 Pure)

El sistema se apoya en **Variables CSS Nativas** mapeadas a temas Tailwind v4. No hay configuraciones en JavaScript; todo reside en la cascada de estilos.

### Color Tokens (Minimalist Suite)

| Token CSS         | Light Value (iOS/Apple Style) | Dark Value (OLED Black)  |
| :---------------- | :---------------------------- | :----------------------- |
| `--app-bg`        | `#ffffff`                     | `#000000`                |
| `--app-surface`   | `#ffffff`                     | `#121212`                |
| `--app-text-main` | `#111111`                     | `#f5f5f7`                |
| `--app-accent`    | `#0071e3` (Industrial Blue)   | `#ffffff`                |
| `--app-border`    | `rgba(0,0,0,0.05)`            | `rgba(255,255,255,0.08)` |

---

## 3. Clases de Abstracción (Minimalist UI)

- **`.glass-card-pro`**: Versión simplificada con `backdrop-blur-sm` y bordes neutros.
- **`.btn-action`**: Botones limpios con radio de 8px (rounded-lg) y tipografía `font-medium`.
- **`.layout-stack`**: Utilidad de espaciado vertical centralizada que usa `gap` en lugar de márgenes aleatorios.

---

## 4. Tipografía y Jerarquía

Hemos unificado la experiencia visual bajo una sola familia tipográfica: **Inter**.

- **Títulos:** Inter con peso `Font-Bold` y `Tracking-tight`.
- **Cuerpo:** Inter con peso `Font-Normal`.
- **Labels:** Inter con peso `Font-Medium` y `Tracking-wide`.

---

## 5. Micro-Animaciones (Motion v12)

- **Hover:** Transiciones de color de borde sutiles y escala mínima (`scale-[1.01]`).
- **Shadows:** Se ha incorporado `shadow-sm` en las tarjetas para añadir una dimensión de profundidad minimalista.
- **Entry:** Opacidad progresiva para una carga de interfaz que no se siente agresiva.
