# 3. Diseño UI/UX y Sistema de Diseño (Design System) — GitExplorer

Este documento especifica la guía de estilos, variables de branding, tokens de diseño y directrices de usabilidad visual de **GitExplorer**.

---

## 1. Concepto y Aesthetics

GitExplorer sigue una línea estética inspirada en plataformas web modernas y orientadas a desarrolladores. Combina el minimalismo de interfaces estructuradas con micro-animaciones dinámicas y un tema oscuro inmersivo:
* **Estilo Bento Grid:** El dashboard de detalle organiza información heterogénea en bloques ordenados por jerarquía visual.
* **Componentes Glassmorphic:** Fondos translúcidos que dejan ver sutilmente los patrones de grilla del fondo.
* **Branding Cromático:** El tono acento es el Índigo, complementado por gradientes morados y rosados para dar un aspecto tecnológico de alta fidelidad.

---

## 2. Tipografía (Typography)

| Fuente | Familia Tipográfica | Aplicación Principal | Configuración CSS |
| :--- | :--- | :--- | :--- |
| **Cabeceras e Interfaz** | `Plus Jakarta Sans` | Botones, títulos, menús, textos descriptivos de la UI. | `var(--font-sans)` |
| **Código y Estadísticas** | `JetBrains Mono` | Nombres de perfil, números de contadores, consola. | `var(--font-mono)` |

Las fuentes están pre-conectadas y cargadas optimizadamente desde Google Fonts en la cabecera de `index.html`.

---

## 3. Paleta de Colores y Theming (Light/Dark)

El cambio de tema se realiza alternando la clase `.dark` en la etiqueta raíz `<html>` del DOM. Los colores están mapeados mediante variables CSS nativas:

```css
:root {
  --accent: #6366f1;           /* Indigo 500 */
  --accent-soft: #6366f114;    /* Indigo 500 con 8% de opacidad */
  --bg: #f8fafc;               /* Slate 50 */
  --surface: #ffffff;          /* Pure White */
  --text: #0f172a;             /* Slate 900 */
  --text-mute: #475569;        /* Slate 600 */
  --border: #e2e8f0;           /* Slate 200 */
  --dot-color: rgba(99, 102, 241, 0.05);
}

.dark {
  --accent: #818cf8;           /* Indigo 400 */
  --accent-soft: #818cf814;    /* Indigo 400 con 8% de opacidad */
  --bg: #030712;               /* Deep Black Slate */
  --surface: #0f172a;          /* Slate 900 */
  --text: #f9fafb;             /* Gray 50 */
  --text-mute: #94a3b8;        /* Slate 400 */
  --border: #1e293b;           /* Slate 800 */
  --dot-color: rgba(129, 140, 248, 0.02);
}
```

---

## 4. Tokens de Diseño (CSS Utilities)

Los tokens de estilo están centralizados como utilidades CSS (`@utility`) en `index.css` y mapeados al objeto de Javascript `TAILWIND_STYLE_TOKENS` para su uso en componentes:

### 🎴 Tarjetas (`tailwind-card`)
Aplica fondo de superficie, bordes redondeados y una sombra suave que se expande hacia abajo al hacer hover mientras cambia el borde a color de acento.
```css
@utility tailwind-card {
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.01);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### ⌨️ Entradas de Texto (`tailwind-input`)
Contenedor alineado con bordes suaves que resalta con un anillo de sombra índigo con opacidad (`ring-accent/15`) al enfocarse.
```css
@utility tailwind-input {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
}
```

### 🖱️ Botones Primarios (`btn-tailwind`)
Botón de acción con tipografía seminegrita, padding proporcional, color de fondo acento e interactividad reactiva al hacer click (`active:scale-98`).
```css
@utility btn-tailwind {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background-color: var(--accent);
  color: #ffffff;
  font-weight: 600;
  border-radius: 0.75rem;
}
```

---

## 5. Animaciones y Micro-interacciones (Motion)

La fluidez de la interfaz se logra mediante animaciones basadas en física real (muelles / springs), evitando curvas de aceleración artificiales:

* **Spring Physics estándar (Tarjetas e Inputs):**
  * `stiffness: 200` (Rigidez)
  * `damping: 15` (Amortiguación)
  * Esto genera un efecto elástico muy sutil y de rápida respuesta táctil.
* **Efecto de Cascada (Staggered Entrance):**
  * Los listados de tarjetas y elementos del Bento Grid entran con un retardo escalonado de `0.05` segundos (`staggerChildren: 0.05`) por elemento, guiando la atención del usuario.

---

## 6. Reglas de Consistencia (Do's & Don'ts)

### ✅ Permitido (Do's)
* Usar fondos de color transparente suave (`bg-accent-soft`) para destacar etiquetas y badges de estados.
* Asegurar que todo elemento interactivo tenga la clase `cursor-pointer` y soporte navegación accesible por teclado (foco y bordes legibles).
* Utilizar `AnimatePresence` con el atributo `mode="popLayout"` para evitar saltos bruscos en el rediseño del layout cuando se eliminan elementos.

### ❌ Prohibido (Don'ts)
* Evitar el uso de colores saturados planos (como verde puro o rojo puro) en cabeceras o iconos decorativos, para no confundirlos con semánticas de validación (éxito/error).
* No alterar el cursor nativo del sistema con cursores personalizados invasivos o temáticos que entorpezcan el uso ordinario del mouse en navegadores modernos.
